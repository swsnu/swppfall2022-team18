'''
urls.py
'''
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/signin/', views.signin, name='user/signin/'),
    path('user/signup/', views.signup, name='user/signup/'),
    path('user/signout/', views.signout, name='user/signout/'),
    path('closet/', views.closet, name='closet/'),
    path('closet/<int:cloth_id>/', views.closet_item, name='closet/cloth_id/'),
    path('user/token/', views.token, name='user/token/')
]
