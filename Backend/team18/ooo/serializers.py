from rest_framework import serializers
from .models import SampleCloth, UserCloth, Outfit


class SampleClothSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
<<<<<<< HEAD

    class Meta:
        model = SampleCloth
        fields = '__all__'

class OutfitSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Outfit
        fields = '__all__'


class UserClothSerializer(serializers.ModelSerializer):
   image = serializers.ImageField(use_url=True)

   class Meta:
       model = UserCloth
       fields = '__all__'
=======
    
    class Meta:
        model = SampleCloth
        fields = '__all__'
        
class OutfitSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Outfit
        fields = '__all__'
        
class UserClothSerializer(serializers.ModelSerializer):
   image = serializers.ImageField(use_url=True)
   
   class Meta:
       model = UserCloth
       fields = '__all__'
>>>>>>> 52d81d7bc53c59cfd01cabf2381a1ec441a19884
