'''
views of ooo
'''
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse
from django.http.response import HttpResponseNotAllowed, HttpResponseNotFound
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Outfit, SampleCloth, UserCloth, Closet, LabelSet

def index():
    '''
    test
    '''
    return HttpResponse("Hello, world")


def signup(request):
    '''
    signup : django default user
    '''
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        new_user = User.objects.create_user(username=username, password=password)
        Closet.objects.create(user=new_user)
        return HttpResponse(status=201)
    return HttpResponseNotAllowed(['POST'], status=405)

def signin(request):
    '''
    signin : django default user
    '''
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)

        return HttpResponse(status=401)
    return HttpResponseNotAllowed(['POST'], status=405)

def signout(request):
    '''
    signout : django default user
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        return HttpResponse('Unauthorized', status=401)
    return HttpResponseNotAllowed(['GET'], status=405)

@ensure_csrf_cookie
def token(request):
    '''
    get csrf token
    '''
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'], status=405)

#outfit part start
def outfit_list(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        cursor = int(request.GET.get('cursor', '99999999999999').replace('/',''))
        page_size = int(request.GET.get('pageSize', '12').replace('/',''))

        #it should be change to use filter()
        #frontend must give filters in request body or params
        all_outfits = list(Outfit.objects.all().order_by("-popularity"))
        outfits_count = len(all_outfits)
        response_outfit_range = min(outfits_count, cursor + page_size + 2)

        outfit_list = all_outfits[cursor:response_outfit_range]

        is_last = False

        if len(outfit_list) != page_size + 1:
            is_last = True
        
        if not is_last:
            outfit_list.pop()
            newCursor = cursor + page_size
        else:
            newCursor = 0
        
        json_outfit_list = []
        for outfit in outfit_list:
            json_outfit = {
                "id" : outfit.id,
                "outfit_info": outfit.outfit_info,
                "popularity" : outfit.popularity,
                "image_id": outfit.image_id,
                "putchase_link": outfit.purchase_link
            }
            json_outfit_list.append(json_outfit)

        content = {
            'isLast': is_last,
            'cursor': newCursor,
            'outfits': json_outfit_list
        }
        return JsonResponse(content, status=200)
    return HttpResponseNotAllowed(['GET'], status=405)

def outfit(request, outfit_id):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        try:
            outfit = Outfit.objects.get(id=outfit_id)
        except Outfit.DoesNotExist:
            return HttpResponseNotFound()

        sample_cloth_list = SampleCloth.objects.filter(outfit=outfit)

        json_outfit = {
            "id" : outfit.id,   
            "outfit_info": outfit.outfit_info,
            "popularity" : outfit.popularity,
            "image_id": outfit.image_id,
            "putchase_link": outfit.purchase_link
        }

        json_samplecloth_list = []
        for samplecloth in sample_cloth_list:
            json_samplecloth = {
                "id": samplecloth.id,
                "name": samplecloth.name,
                "image_id": samplecloth.image_id,
                "purchase_link": samplecloth.purchase_link,
                "outfit": samplecloth.outfit.id,
                "type": samplecloth.type,
                "color": samplecloth.color,
                "pattern": samplecloth.pattern
            }
            json_samplecloth_list.append(json_samplecloth)

        content = {
            'outfit': json_outfit,
            "sampleclothes": json_samplecloth_list
        }
        return JsonResponse(content, status=200)

    return HttpResponseNotAllowed(['GET'], status=405)


def sample_cloth(request, samplecloth_id):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)
        try:
            samplecloth = SampleCloth.objects.get(id=samplecloth_id)
        except SampleCloth.DoesNotExist:
            return HttpResponseNotFound()

        user_closet = Closet.objects.get(user=request.user)
        try:
            usercloth = UserCloth.objects.get(Q(closet=user_closet) & Q(label_set=samplecloth.label_set))
            json_usercloth = {
                "id": usercloth.id,
                "image_id": usercloth.image_id,
                "type": usercloth.type,
                "color": usercloth.color,
                "pattern": usercloth.pattern,
                "user" : usercloth.closet.user.id,
                "dates" : usercloth.dates
            }
        except UserCloth.DoesNotExist:
            json_usercloth = {}
        
        json_samplecloth = {
                "id": samplecloth.id,
                "name": samplecloth.name,
                "image_id": samplecloth.image_id,
                "purchase_link": samplecloth.purchase_link,
                "outfit": samplecloth.outfit.id,
                "type": samplecloth.type,
                "color": samplecloth.color,
                "pattern": samplecloth.pattern
            }
        
        content = {
            "usercloth": json_usercloth,
            "samplecloth": json_samplecloth
        }
        return JsonResponse(content, status=200)

    return HttpResponseNotAllowed(['GET'], status=405)

def today_outfit(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        closet = Closet.objects.get(user=request.user)
        usercloth_list = list(UserCloth.objects.filter(closet=closet))

        labelset_list = []
        for usercloth in usercloth_list:
            labelset_list.append(usercloth.label_set)
        
        labelset_list = list(set(labelset_list))

        samplecloth_list = []
        for labelset in labelset_list:
            sampleclothes = list(SampleCloth.objects.filter(label_set=labelset))
            samplecloth_list = samplecloth_list + sampleclothes

        outfit_list = []
        for samplecloth in samplecloth_list:
            outfit_list.append(samplecloth.outfit)

        outfit_list = list(set(outfit_list))
        outfit_list = sorted(outfit_list, key=lambda outfit: outfit.popularity, reverse=True)

        recommend = []
        for outfit in outfit_list:
            outfit_cloth_list = list(outfit.sample_cloth.all())

            can_recommend = True
            for cloth in outfit_cloth_list:
                if not cloth in samplecloth_list:
                    can_recommend = False
            if can_recommend:
                recommend.append(outfit)
                break
        
        json_outfit = {
            "id" : recommend[0].id,   
            "outfit_info": recommend[0].outfit_info,
            "popularity" : recommend[0].popularity,
            "image_id": recommend[0].image_id,
            "putchase_link": recommend[0].purchase_link
        }

        return JsonResponse(json_outfit, status=200)
            
    return HttpResponseNotAllowed(['GET'], status=405)


#outfit part end
