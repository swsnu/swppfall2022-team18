'''
urls.py
'''
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/signin/', views.signin, name='user/signin/'),
    path('user/signup/', views.signup, name='user/signup/'),
    path('user/signout/', views.signout, name='user/signout/'),
    path('user/info/', views.userinfo, name='user/info/'),
    path('closet/', views.closet, name='closet/'),
    path('closet/<int:cloth_id>/', views.closet_item, name='closet/cloth_id/'),
    path('user/token/', views.token, name='user/token/'),
    path('outfit/', views.outfit_list, name='outfit/'),
    path('outfit/<int:outfit_id>/', views.outfit, name='outfit/get_outfit/'),
    path('outfit/samplecloth/<int:samplecloth_id>/', views.sample_cloth, name='outfit/get_samplecloth/'),
    path('outfit/today/', views.today_outfit, name='outfit/today/')
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
