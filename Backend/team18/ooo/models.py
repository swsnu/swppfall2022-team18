'''
ooo model
'''
import re
import os
from django.core.files import File
from django.db import models
from django.contrib.auth.models import User
from downloader import download


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
    image_link = models.CharField(max_length=1000, blank=False)
    #추후에 usercloth image 처리 방법에 따라서 달라질 듯
    image = models.ImageField(upload_to= 'userimages/', blank=True,default='')
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
    dates = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        # ImageField에 파일이 없고, url이 존재하는 경우에만 실행
        if self.image_link and not self.image:

            if self.image_link:
                # temp_file = BytesIO()
                # temp_file.write(self.image_link)
                # temp_file.seek(0)
                temp_file = self.image_link
                file_name = '{user}/{name}'.format(
                    user = self.closet.user.id,
                    name = self.image_link
                )
                self.image.save(file_name, File(temp_file))
                
        super().save()


class Outfit(models.Model):
    '''
    Outfit object
    '''
    outfit_name = models.CharField(max_length=500, default = "") #codi_name
    outfit_info = models.CharField(max_length=500) #explain
    popularity = models.IntegerField(blank=False) #rank
    image = models.ImageField(upload_to= 'images/', blank=True,default='') #codi_image
    image_link = models.CharField(max_length=500, blank=False)
    purchase_link = models.CharField(max_length=500, blank=False) #codi_link
    
    def save(self, *args, **kwargs):
    # ImageField에 파일이 없고, url이 존재하는 경우에만 실행
        # super().save()
        if self.image_link and not self.image:
            if self.image_link:
                file_name = '{name}.jpg'.format(
                    name = re.sub(r'[^0-9]', '', self.image_link)[0:-1]
                )
                if os.path.isfile('./media/images/' + file_name):
                    with open('./media/images/' + file_name, 'rb') as file:
                        my_image = File(file)
                        self.image.save(file_name, my_image)
                else:
                    temp_file = download(self.image_link)
                    self.image.save(file_name, File(temp_file))
                super().save()
            else:
                super().save()
        else:
            super().save()

        
            
class SampleCloth(models.Model):
    '''
    SampleCloth : clothes that are included in Outfit
    '''
    name = models.CharField(max_length=100, blank=True) #cloth_name
    image = models.ImageField(upload_to= 'images/', blank=True, default='') #cloth_image
    image_link = models.CharField(max_length=500, blank=False)
    purchase_link = models.CharField(max_length=500, blank=False) #cloth_link
    outfit = models.ManyToManyField(
        Outfit,
        related_name='sample_cloth',
    ) #codi_data.csv 에서 cloth_links에 포함되어있는 outfit 추가
    type = models.CharField(max_length=100, blank=False) #cloth_type
    color = models.CharField(max_length=100, blank=False) #cloth_color
    pattern = models.CharField(max_length=100, blank=False) #cloth_pattern

    label_set = models.ForeignKey(
        LabelSet,
        on_delete=models.CASCADE,
        null=False,
        related_name='sample_cloth'
    )
    def save(self, *args, **kwargs):
    # ImageField에 파일이 없고, url이 존재하는 경우에만 실행
        if self.image_link and not self.image:
            if self.image_link:
                file_name = '{name}.jpg'.format(
                    name = re.sub(r'[^0-9]', '', self.image_link)[0:-1]
                )
                if os.path.isfile('./media/images/' + file_name):
                    with open('./media/images/' + file_name, 'rb') as file:
                        my_image = File(file)
                        self.image.save(file_name, my_image)
                else:
                    temp_file = download(self.image_link)
                    self.image.save(file_name, File(temp_file))
                    
                super().save()
            else:
                super().save()
