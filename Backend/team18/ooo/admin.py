from django.contrib import admin
from django.contrib.admin.views.main import ChangeList
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Closet, UserCloth, LabelSet, SampleCloth, Outfit


# admin.site.register(User, UserAdmin)
# Register your models here.

# class SampleClothChangeList(ChangeList):
#     def __init__(self, request, model, list_display,
#         list_display_links, list_filter, date_hierarchy,
#         search_fields, list_select_related, list_per_page,
#         list_max_show_all, list_editable, model_admin):
#         self.list_display = ['action_checkbox', 'name', 'outfit']
#         self.list_display_links = ['name']
#         self.list_editable = ['outfit']

# class SampleClothAdmin(admin.ModelAdmin):
#     def get_changelist(self, request, **kwargs):
#         return SampleClothChangeList
    
#     def get_changelist_form(self, request, **kwargs):
#         return SampleClothChangeListForm

admin.site.register(Closet)
admin.site.register(UserCloth)
admin.site.register(LabelSet)
admin.site.register(Outfit)
admin.site.register(SampleCloth)