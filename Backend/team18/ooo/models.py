'''
ooo model
'''

import json
from django.db import models
from django.contrib.auth.models import User
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

class LabelSet(models.Model):
    '''
    LabelSet : Interface of UserCloth and SampleCloth
           to find pair of (UserCloth, SampleCloth) easily
    '''
    type = models.CharField(max_length=100, blank=False)
    color = models.CharField(max_length=100, blank=False)
    pattern = models.CharField(max_length=100, blank=False)


class Closet(models.Model):
    '''
    Closet
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class UserCloth(models.Model):
    '''
    UserCloth : cloth object that user post
    '''
    name = models.CharField(max_length=100, blank=True)
    img = models.ImageField(blank=False, upload_to ='images/')
    closet = models.ForeignKey(
        Closet,
        on_delete=models.CASCADE,
        related_name='user_cloth',
        blank=False
    )
    type = models.CharField(max_length=100, blank=False)
    color = models.CharField(max_length=100, blank=False)
    pattern = models.CharField(max_length=100, blank=False)

    label_set = models.ForeignKey(
        LabelSet,
        on_delete=models.CASCADE,
        null=False,
        related_name='user_cloth'
    )
    dates = models.TextField(default=json.dumps("[]"))
    image = ImageSpecField(source = 'img', processors=[ResizeToFill(120,60)])

class Outfit(models.Model):
    '''
    Outfit object
    '''
    outfit_info = models.CharField(max_length=200, blank=True)
    popularity = models.IntegerField(blank=False)
    img = models.ImageField(blank=False, upload_to='./images')
    purchase_link = models.CharField(max_length=500, blank=False)
    cloth_list = models.TextField(default=json.dumps("[]"))
    image = ImageSpecField(source='img', processors=[ResizeToFill(120.60)])
    
class SampleCloth(models.Model):
    '''
    SampleCloth : clothes that are included in Outfit
    '''
    name = models.CharField(max_length=100, blank=True)
    img = models.ImageField(blank=False, upload_to='./images')
    purchase_link = models.CharField(max_length=500, blank=False)
    outfit = models.ForeignKey(
        Outfit,
        on_delete=models.CASCADE,
        related_name='sample_cloth',
        blank=False
    )
    type = models.CharField(max_length=100, blank=False)
    color = models.CharField(max_length=100, blank=False)
    pattern = models.CharField(max_length=100, blank=False)

    label_set = models.ForeignKey(
        LabelSet,
        on_delete=models.CASCADE,
        null=False,
        related_name='sample_cloth'
    )
    image = ImageSpecField(source='img', processors=[ResizeToFill(120.60)])