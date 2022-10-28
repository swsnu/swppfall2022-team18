from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed

import json
from .token import *


from .models import User

# Create your views here.

def index(request):
    return HttpResponse("Hello, world")


@ensure_csrf_cookie
def login(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body.decode())
            id = body['id']
            password = body['password']
        except (KeyError, json.JSONDecodeError) as e:
            print(e)
            return HttpResponseBadRequest()
        if User.objects.filter('username' == id).exists :
            userObj = User.objects.get('username' == id)
            if userObj.password == password:
                payload_value = id
                payload = {
                    "subject": payload_value
                }
                access_token = generate_token(payload, "access")
                refresh_token = generate_token(payload, "refresh")
                data = {
                    "results": {
                        "access_token": access_token,
                        "refresh_token": refresh_token
                    }
                }
                return HttpResponse(data = data, status=200)
            else: return HttpResponse('', status= 201)
            # else: return HttpResponseBadRequest()
        else:
            return HttpResponse('', status= 202)
            # return HttpResponseBadRequest()
    elif request.method == 'GET':
        users = User.objects.all()
        return HttpResponse(data = users, status=200)
    else:
        return HttpResponseNotAllowed(['POST'])

