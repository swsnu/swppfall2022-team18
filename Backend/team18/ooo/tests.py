from django.test import TestCase, Client
import json
from .models import User, Closet, UserCloth, LabelSet, SampleCloth, Outfit

# Create your tests here.
class signinUserCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username='testuser1', password='1234')
        user2 = User.objects.create_user(username='testuser2', password='1234')
        closet1 = Closet.objects.create(user=user1)
        closet2 = Closet.objects.create(user=user2)

        labelset_1 = LabelSet.objects.create(type='test_type_1', color='test_color_1', pattern='test_pattern_1')        
        labelset_2 = LabelSet.objects.create(type='test_type_2', color='test_color_2', pattern='test_pattern_2') 
        labelset_3 = LabelSet.objects.create(type='test_type_3', color='test_color_3', pattern='test_pattern_3')         
        labelset_4 = LabelSet.objects.create(type='test_type_4', color='test_color_4', pattern='test_pattern_4')         
        # labelset_5 = LabelSet.objects.create(type='test_type_5', color='test_color_5', pattern='test_pattern_5')         
        
        #usercloth is user2's clothes
        #usercloth-labelset pair = (1,1) (2,2) (3,3) (4,3) (5,4)
        #sample-labelset pair = (1,1) (2,2) (3,4) )(4,4 (5,5)
        #outfit-sample set = (1: 1,2) (2: 3,4,5) (3: 2,4)
        UserCloth.objects.create(
            image_link = "image_link_1",
            closet = closet2,
            type = "test_type_1",
            color = 'test_color_1',
            pattern = 'test_pattern_1',
            label_set = labelset_1
        )
        UserCloth.objects.create(
            image_link = "image_link_2",
            closet = closet2,
            type = "test_type_2",
            color = 'test_color_2',
            pattern = 'test_pattern_2',
            label_set = labelset_2
        )
        UserCloth.objects.create(
            image_link = "image_link_3",
            closet = closet2,
            type = "test_type_3",
            color = 'test_color_3',
            pattern = 'test_pattern_3',
            label_set = labelset_3
        )
        UserCloth.objects.create(
            image_link = "image_link_4",
            closet = closet2,
            type = "test_type_3",
            color = 'test_color_3',
            pattern = 'test_pattern_3',
            label_set = labelset_3
        )
        UserCloth.objects.create(
            image_link = "image_link_5",
            closet = closet2,
            type = "test_type_4",
            color = 'test_color_4',
            pattern = 'test_pattern_4',
            label_set = labelset_4
        )

        outfit1 = Outfit.objects.create(
            popularity = 100,
            image_link = "outfit_image_link_1",
            purchase_link = "purchase link 1"
        )

        outfit2 = Outfit.objects.create(
            popularity = 200,
            image_link = "outfit_image_link_2",
            purchase_link = "purchase link 2"
        )

        outfit3 = Outfit.objects.create(
            popularity = 300,
            image_link = "outfit_image_link_3",
            purchase_link = "purchase link 3"
        )
        
        samplecloth1 = SampleCloth.objects.create(
            image_link = "sample_image_link_1",
            purchase_link = "cloth purchase link 1",
            type = "test_type_1",
            color = 'test_color_1',
            pattern = 'test_pattern_1',
            label_set = labelset_1
        )
        samplecloth1.outfit.set([outfit1])

        samplecloth2 = SampleCloth.objects.create(
            image_link = "sample_image_link_2",
            purchase_link = "cloth purchase link 2",
            type = "test_type_2",
            color = 'test_color_2',
            pattern = 'test_pattern_2',
            label_set = labelset_2
        )
        samplecloth2.outfit.set([outfit1])

        samplecloth3 = SampleCloth.objects.create(
            image_link = "sample_image_link_3",
            purchase_link = "cloth purchase link 3",
            type = "test_type_4",
            color = 'test_color_4',
            pattern = 'test_pattern_4',
            label_set = labelset_4
        )  
        samplecloth3.outfit.set([outfit2])

        samplecloth4 = SampleCloth.objects.create(
            image_link = "sample_image_link_4",
            purchase_link = "cloth purchase link 4",
            type = "test_type_4",
            color = 'test_color_4',
            pattern = 'test_pattern_4',
            label_set = labelset_4
        ) 
        samplecloth4.outfit.set([outfit2])

        samplecloth5 = SampleCloth.objects.create(
            image_link = "sample_image_link_5",
            purchase_link = "cloth purchase link 5",
            type = "test_type_5",
            color = 'test_color_5',
            pattern = 'test_pattern_5',
            label_set = labelset_4
        )  
        samplecloth5.outfit.set([outfit2])

        samplecloth6 = SampleCloth.objects.create(
            image_link = "sample_image_link_6",
            purchase_link = "cloth purchase link 2",
            type = "test_type_2",
            color = 'test_color_2',
            pattern = 'test_pattern_2',
            label_set = labelset_2
        ) 
        samplecloth6.outfit.set([outfit3])

        samplecloth7 = SampleCloth.objects.create(
            image_link = "sample_image_link_7",
            purchase_link = "cloth purchase link 4",
            type = "test_type_4",
            color = 'test_color_4',
            pattern = 'test_pattern_4',
            label_set = labelset_4
        ) 
        samplecloth7.outfit.set([outfit3])

    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/ooo/user/signup/',
                               json.dumps({"body":{"username": "chris", "password": "chris"}}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403) 

        response = client.get('/api/ooo/user/token/')
        self.assertEqual(response.status_code, 204)
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.get('/api/ooo/user/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405) 
        
        response = client.post('/api/ooo/user/signup/', json.dumps({"body":{"username": "chris", "password": "chris"}}),
                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)                       

    def test_signin_and_out(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/ooo/user/signin/',  json.dumps({"body":{'username': 'wrongname', 'password': 'wrongpassword'}}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.get('/api/ooo/user/signin/')
        self.assertEqual(response.status_code, 405) 

        response = client.post('/api/ooo/user/signin/',  json.dumps({"body":{'username': 'testuser1', 'password': '1234'}}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/ooo/user/signout/')
        self.assertEqual(response.status_code, 204)

        response = client.put('/api/ooo/user/signout/', json.dumps({"body":{'username': 'testuser1', 'password': 'testpw1'}}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/ooo/user/signout/')
        self.assertEqual(response.status_code, 401)

    def test_closet(self):
        client = Client(enforce_csrf_checks=False)
        #before login
        response = client.get('/api/ooo/closet/')
        self.assertEqual(response.status_code, 401)

        response = client.post(
            '/api/ooo/closet/',
            json.dumps({
                'name': 'name1',
                'image_link': "image_link_1",
                'type': 'type1',
                'color': 'color1',
                'pattern': 'pattern1'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)

        response = client.put('/api/ooo/outfit/')
        self.assertEqual(response.status_code, 405)

        #after login
        response = client.post('/api/ooo/user/signin/',  json.dumps({"body":{'username': 'testuser2', 'password': '1234'}}),
                    content_type='application/json')
        self.assertEqual(response.status_code, 204)

        #get closet
        response = client.get(
            '/api/ooo/closet/'
        )
        self.assertEqual(response.status_code, 200)

        #test post

        #bad request
        response = client.post(
            '/api/ooo/closet/',
            json.dumps({
                'name': 'name1',
                'color': 'color1',
                'pattern': 'pattern1'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)

        #using labelset
        response = client.post(
            '/api/ooo/closet/',
            json.dumps({
                'name': 'name1',
                'image_link': "image_link_1",
                'type': 'test_type_1',
                'color': 'test_color_1',
                'pattern': 'test_pattern_1'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        #try to using labelset but failed
        response = client.post(
            '/api/ooo/closet/',
            json.dumps({
                'name': 'name1',
                'image_link': "image_link_1",
                'type': 'test_type_1',
                'color': 'test_color_1',
                'pattern': 'test_pattern_3'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_closet_item(self):
        client = Client(enforce_csrf_checks=False)
        #before login
        response = client.get('/api/ooo/closet/1/')
        self.assertEqual(response.status_code, 401)

        response = client.post(
            '/api/ooo/closet/1/',
            json.dumps({
                'dates': '2022-08-17',
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)

        response = client.put(
            '/api/ooo/closet/1/',
             json.dumps({
                'name': 'name1',
                'image_link': "image_link_1",
                'type': 'type1',
                'color': 'color1',
                'pattern': 'pattern1'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)

        response = client.delete('/api/ooo/closet/1/')
        self.assertEqual(response.status_code, 401)

        #after login
        response = client.post('/api/ooo/user/signin/', json.dumps({"body":{'username': 'testuser2', 'password': '1234'}}),
                    content_type='application/json')
        self.assertEqual(response.status_code, 204)

        #get closet
        response = client.get(
            '/api/ooo/closet/1/'
        )
        self.assertEqual(response.status_code, 200)

        #get usercloth 10 (doesn't exsit)
        response = client.get('/api/ooo/closet/10/')
        self.assertEqual(response.status_code, 404)
    
        #test post
        response = client.post(
            '/api/ooo/closet/1/',
            json.dumps({
                'dates': '2022-08-17'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        #test put

        response = client.put(
            '/api/ooo/closet/1/',
            json.dumps({
                'name': 'name1',
                'image_link': "image_link_1",
                'type': 'type1',
                'color': 'color1',
                'pattern': 'pattern1',
                'old_date': '2021-01-01',
                'new_date': '2022-01-01'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        #using labelset
        response = client.put(
            '/api/ooo/closet/1/',
            json.dumps({
                'name': 'name1',
                'image_link': "image_link_1",
                'type': 'test_type_1',
                'color': 'test_color_1',
                'pattern': 'test_pattern_1',
                'old_date': '2021-01-01',
                'new_date': '2022-01-01'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        # test delete

        response = client.delete('/api/ooo/closet/1/')
        self.assertEqual(response.status_code, 200)

        #delete usercloth 10 (doesn't exsit)
        response = client.delete('/api/ooo/closet/10/')
        self.assertEqual(response.status_code, 404)


    def test_outfit_list(self):
        client = Client(enforce_csrf_checks=False)
        #before login
        response = client.get('/api/ooo/outfit/')
        self.assertEqual(response.status_code, 401)

        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': 'type1',
                'color': 'color1',
                'pattern': 'pattern1',
                'userHave': 'False',
                'recommend': 'False'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)

        response = client.put('/api/ooo/outfit/')
        self.assertEqual(response.status_code, 405)

        #after login
        response = client.post('/api/ooo/user/signin/',  json.dumps({"body":{'username': 'testuser2', 'password': '1234'}}),
                    content_type='application/json')
        self.assertEqual(response.status_code, 204)

        #get outfit list with cursor:0, pageSize:10
        response = client.get(
            '/api/ooo/outfit/?cursor=0&pageSize=1'
        )
        self.assertEqual(response.status_code, 200)

        response = client.get(
            '/api/ooo/outfit/?cursor=0&pageSize=3'
        )
        self.assertEqual(response.status_code, 200)

        #test post

        #bad request
        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': 'type1',
                'userHave': 'False',
                'recommend': 'False'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)

        #using labelset
        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': "test_type_1",
                'color': 'test_color_1',
                'pattern':'test_pattern_1',
                'userHave': 'False',
                'recommend': 'False'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        #try to using labelset but failed
        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': "test_type_1",
                'color': 'test_color_1',
                'pattern':'test_pattern_3',
                'userHave': 'False',
                'recommend': 'False'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        #using recommend filter
        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': "test_type_2",
                'color': 'test_color_2',
                'pattern':'test_pattern_2',
                'userHave': 'False',
                'recommend': 'True'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': "test_type_1",
                'color': 'test_color_1',
                'pattern':'test_pattern_3',
                'userHave': 'True',
                'recommend': 'False'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': "test_type_3",
                'color': 'test_color_3',
                'pattern':'test_pattern_3',
                'userHave': 'False',
                'recommend': 'True'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        # print(response.content)

        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': '',
                'color': 'color1',
                'pattern': '',
                'userHave': 'False',
                'recommend': 'True'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        #using userHave filter
        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': "test_type_2",
                'color': 'test_color_2',
                'pattern':'test_pattern_2',
                'userHave': 'True',
                'recommend': 'False'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

        response = client.post(
            '/api/ooo/outfit/?cursor=0&pageSize=2',
            json.dumps({
                'type': '',
                'color': '',
                'pattern': 'test_pattern_1',
                'userHave': 'True',
                'recommend': 'False'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_outfit(self):
        client = Client(enforce_csrf_checks=False)
        #before login
        response = client.get('/api/ooo/outfit/1/')
        self.assertEqual(response.status_code, 401)

        response = client.put('/api/ooo/outfit/1/')
        self.assertEqual(response.status_code, 405)

        #after login
        response = client.post('/api/ooo/user/signin/', json.dumps({"body":{'username': 'testuser2', 'password': '1234'}}),
                    content_type='application/json')
        self.assertEqual(response.status_code, 204)

        #get outfit 1
        response = client.get('/api/ooo/outfit/1/')
        self.assertEqual(response.status_code, 200)

        #get outfit 10 (doesn't exist)
        response = client.get('/api/ooo/outfit/10/')
        self.assertEqual(response.status_code, 404)


    def test_sample_cloth(self):
        client = Client(enforce_csrf_checks=False)
        #before login
        response = client.get('/api/ooo/outfit/samplecloth/1/')
        self.assertEqual(response.status_code, 401)

        response = client.put('/api/ooo/outfit/samplecloth/1/')
        self.assertEqual(response.status_code, 405)

        #after login
        response = client.post('/api/ooo/user/signin/',  json.dumps({"body":{'username': 'testuser2', 'password': '1234'}}),
                    content_type='application/json')
        self.assertEqual(response.status_code, 204)
        
        #get samplecloth 1
        response = client.get('/api/ooo/outfit/samplecloth/1/')
        self.assertEqual(response.status_code, 200)

        #get samplecloth 3 (doen't have matching usercloth)
        response = client.get('/api/ooo/outfit/samplecloth/3/')
        self.assertEqual(response.status_code, 200)

        #get samplecloth 10 (doesn't exsit)
        response = client.get('/api/ooo/outfit/samplecloth/10/')
        self.assertEqual(response.status_code, 404)
    
    def test_today_outfit(self):
        client = Client(enforce_csrf_checks=False)
        #before login
        response = client.get('/api/ooo/outfit/today/')
        self.assertEqual(response.status_code, 401)

        response = client.put('/api/ooo/outfit/today/')
        self.assertEqual(response.status_code, 405)

        #after login
        response = client.post('/api/ooo/user/signin/', json.dumps({"body":{'username': 'testuser2', 'password': '1234'}}),
                    content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/ooo/outfit/today/')
        self.assertEqual(response.status_code, 200)   
        print(response.content)

        #get out usercloth 5 (label_set=4) from the candidate of making recommend outfit
        response = client.post(
            '/api/ooo/closet/5/',
            json.dumps({
                'dates': '2022-11-20'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)  

        response = client.get('/api/ooo/outfit/today/')
        self.assertEqual(response.status_code, 200) 
        print(response.content)
        
