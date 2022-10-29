from django.test import TestCase, Client
import json
from .models import User

# Create your tests here.
class signinUserCase(TestCase):
    def setUp(self):
        User.objects.create(username='test', password='1234')
        User.objects.create(username='test2', password='1234')
    
    
    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/ooo/user/signup/', json.dumps({'body':'{"username": "chris", "password": "chris"}'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/ooo/user/token/')
        self.assertEqual(response.status_code, 204)
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.get('/api/ooo/user/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405) 
        
        response = client.post('/api/ooo/user/signup/', json.dumps({'body':'{"username": "chris", "password": "chris"}'}),
                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)                       

    def test_signin_and_out(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/ooo/user/signup/', json.dumps({'body':'{"username": "chris", "password": "chris"}'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 201)
        
        response = client.post('/api/ooo/user/signin/',  json.dumps({'body':'{"username": "wrongname", "password": "wrongpw"}'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.get('/api/ooo/user/signin/')
        self.assertEqual(response.status_code, 405)  # Pass csrf protection

        response = client.post('/api/ooo/user/signin/',  json.dumps({'body':'{"username": "chris", "password": "chris"}'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.get('api/ooo/user/logout/')
        self.assertEqual(response.status_code, 204)

        # response = client.put('/api/signout/', json.dumps({'username': 'testuser1', 'password': 'testpw1'}),
        #                       content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        # self.assertEqual(response.status_code, 405)

        response = client.get('api/ooo/user/logout/')
        self.assertEqual(response.status_code, 401)