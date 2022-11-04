from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Closet, UserCloth, LabelSet, SampleCloth, Outfit


# admin.site.register(User, UserAdmin)
# Register your models here.

admin.site.register(Closet)
admin.site.register(UserCloth)
admin.site.register(LabelSet)
admin.site.register(SampleCloth)
admin.site.register(Outfit)