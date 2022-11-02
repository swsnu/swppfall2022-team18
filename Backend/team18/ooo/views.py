from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
import json
from .token import *
from .models import *

def index(request):
    return HttpResponse("Hello, world")

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        body_data = body['body']
        print(body)
        data = json.loads(body_data)
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])
    

def signup(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        body_data = body['body']
        print(body)
        data = json.loads(body_data)
        username = data['username']
        password = data['password']
        User.objects.create_user(username=username, password=password)
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(['POST'])


def logout(request):
    if request.method == 'GET':
        # body = json.loads(request.body.decode('utf-8'))
        # body_data = body['body']
        # print(body)
        # data = json.loads(body_data)
        # username = data['username']
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(request, status=204)
    else:
        return HttpResponseNotAllowed(["GET"])


#outfit part start



#outfit part end


