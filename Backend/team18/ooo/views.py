'''
views of ooo
'''
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse
from django.http.response import HttpResponseNotAllowed
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.models import User
# from .models import UserCloth, SampleCloth, Closet, LabelSet

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
        User.objects.create_user(username=username, password=password)
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
#outfit part end
