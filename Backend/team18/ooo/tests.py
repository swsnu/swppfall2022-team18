from django.test import TestCase, Client
import json
from .models import User

# Create your tests here.
class LoginUserCase(TestCase):
    def setUp(self):
        User.objects.create(username='test', password='1234')
        User.objects.create(username='test2', password='1234')
    
    
    def test_login_user(self):
        client = Client()
        response = client.post('/api/ooo/user/login/', {'id': 'test', 'password': '1234'})
        print(response)
        self.assertEqual(response.status_code, 200)
        
    # def test_login_get(self):
    #     client = Client()
    #     response = client.get('/api/ooo/user/login/')
    #     self.assertEqual(response.status_code, 200)
