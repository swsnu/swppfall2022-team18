""" module import """
from rest_framework import serializers
from .models import SampleCloth, UserCloth, Outfit


class SampleClothSerializer(serializers.ModelSerializer):
    """ serializer for samplecloth model """
    image = serializers.ImageField(use_url=True)
    class Meta:
        """ Meta """
        model = SampleCloth
        fields = '__all__'
        
class OutfitSerializer(serializers.ModelSerializer):
    """ serializer for outfit model """
    image = serializers.ImageField(use_url=True)
    class Meta:
        """ Meta """
        model = Outfit
        fields = '__all__'
        
class UserClothSerializer(serializers.ModelSerializer):
    """ serializer for usercloth model """
    image = serializers.ImageField(use_url=True)
    class Meta:
        """ Meta """
        model = UserCloth
        fields = ['id','name','image','type','color','pattern','dates']
