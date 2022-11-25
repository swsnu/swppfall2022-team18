from rest_framework import serializers
from .models import SampleCloth, UserCloth, Outfit


class SampleClothSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = SampleCloth
        fields = '__all__'
        
class OutfitSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Outfit
        fields = '__all__'
        
#class UserClothSerializer(serializers.ModelSerializer):
#    image = serializers.ImageField(use_url=True)
#    
#    class Meta:
#        model = UserCloth
#        fields = all