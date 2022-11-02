'''
urls.py
'''
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/signin/', views.signin, name='user/signin/'),
    path('user/signup/', views.signup, name='user/signup/'),
    path('user/logout/', views.signout, name='user/logout/'),
    path('user/token/', views.token, name='user/token/')
]
