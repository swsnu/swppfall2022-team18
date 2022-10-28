from django.test import TestCase, Client
import json
from django.contrib.auth.models import User

class BlogTestCase(TestCase):

    # def setUp(self):
    #     client = Client(enforce_csrf_checks=False)
    #     client.post('/api/signup/', json.dumps({'username': 'testuser1', 'password': 'testpw1'}),
    #                             content_type='application/json')

    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.get('/api/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405) 
        
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)                       

    def test_signin_and_out(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/signup/', json.dumps({'username': 'testuser1', 'password': 'testpw1'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 201)   

        response = client.post('/api/signin/',  json.dumps({'username': 'wrongname', 'password': 'wrongpassword'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.get('/api/signin/')
        self.assertEqual(response.status_code, 405)  # Pass csrf protection

        response = client.post('/api/signin/',  json.dumps({'username': 'testuser1', 'password': 'testpw1'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)

        # response = client.put('/api/signout/', json.dumps({'username': 'testuser1', 'password': 'testpw1'}),
        #                       content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        # self.assertEqual(response.status_code, 405)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 401)
