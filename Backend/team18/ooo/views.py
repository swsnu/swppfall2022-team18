from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed
import json

from requests import JSONDecodeError
from .models import User

# Create your views here.

def index(request):
    return HttpResponse("Hello, world")


@ensure_csrf_cookie
def login(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            id = json.loads(body)['id']
            password = json.loads(body)['password']
        except (KeyError, JSONDecodeError) as e:
            print(e)
            return HttpResponseBadRequest()
        if User.objects.filter('username' == id).exists :
            userObj = User.objects.get('username' == id)
            if userObj.password == password:
                return HttpResponse("success", status=204)
            else: return HttpResponseBadRequest()
        else:
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['POST'])

