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


def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        User.objects.create_user(username=username, password=password)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'], status=405)

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'], status=405)

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse('Unauthorized', status=401)
    else:
        return HttpResponseNotAllowed(['GET'], status=405)

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'], status=405)

#outfit part start



#outfit part end


