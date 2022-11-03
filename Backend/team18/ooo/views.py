'''
views of ooo
'''
import json
import ast
from json.decoder import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import UserCloth, SampleCloth, Closet, LabelSet

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
        
        user = User.objects.create_user(username=username, password=password)
        
        closet = Closet(user=user)
        closet.save()

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
def closet(request):
    '''
    closet : get or create user's closet items
    '''
    user = User.objects.get(id=request.user.id)
    user_closet = Closet.objects.get(user=user)

    if request.method == 'GET':
        closet_item_list = [closet_item for closet_item in UserCloth.objects.filter(closet=user_closet).values()]
        return JsonResponse(closet_item_list, safe=False)
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())

            name = req_data['name']
            image_id = req_data['image_id']
            closet = user_closet
            type = req_data['type']
            color = req_data['color']
            pattern = req_data['pattern']

            label_set_obj, _ = LabelSet.objects.get_or_create(
                type=type, color=color, pattern=pattern
            )
            label_set = label_set_obj

        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        closet_item = UserCloth(
            name=name,
            image_id=image_id,
            closet=closet,
            type=type,
            color=color,
            pattern=pattern,
            label_set=label_set,
            # dates - created as default value []
        )
        closet_item.save()
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

@ensure_csrf_cookie
def closet_item(request, cloth_id):
    '''
    closet_item : get, edit or delete user's closet item / post date a user wore the cloth
    '''
    # user = User.objects.get(id=request.user.id)
    # user_closet = Closet.objects.get(user=user)
    target_item_obj = UserCloth.objects.get(id=cloth_id)
    dates_history = ast.literal_eval(target_item_obj.dates)

    if request.method == 'GET':        
        target_item_dict = UserCloth.objects.filter(id=cloth_id).values()[0]
        return JsonResponse(target_item_dict)

    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            dates = req_data['dates']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        dates_history.append(dates)
        target_item_obj.dates = json.dumps(dates_history)

        target_item_obj.save()

        return HttpResponse(status=204)

    elif request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())

            name = req_data['name']
            image_id = req_data['image_id']
            type = req_data['type']
            color = req_data['color']
            pattern = req_data['pattern']

            label_set_obj, _ = LabelSet.objects.get_or_create(
                type=type, color=color, pattern=pattern
            )
            label_set = label_set_obj
            old_date = req_data['old_date']
            new_date = req_data['new_date']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        target_item_obj.name = name
        target_item_obj.image_id = image_id
        target_item_obj.type = type
        target_item_obj.color = color
        target_item_obj.pattern = pattern
        target_item_obj.label_set = label_set

        if old_date in dates_history:
            old_date_idx = dates_history.index(old_date)
            dates_history[old_date_idx] = new_date
        else:
            dates_history.append(new_date)
        target_item_obj.dates = json.dumps(dates_history)

        target_item_obj.save()

        response_dict = {
            "id": target_item_obj.id,
            "name": target_item_obj.name,
            "image_id": target_item_obj.image_id,
            "type": target_item_obj.type,
            "color": target_item_obj.color,
            "pattern": target_item_obj.pattern,
            "dates": target_item_obj.dates,
        }
        return JsonResponse(response_dict, status=200)

    elif request.method == 'DELETE':
        try:
            target_item_obj.delete()
            return HttpResponse(status=200)
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

@ensure_csrf_cookie
def token(request):
    '''
    get csrf token
    '''
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'], status=405)

#outfit part start
#outfit part end
