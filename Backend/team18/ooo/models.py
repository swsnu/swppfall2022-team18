from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class ClothType(models.Model):
  name = models.CharField(max_length=50, blank=False)

class ClothColor(models.Model):
  name = models.CharField(max_length=50, blank=False)

class ClothPattern(models.Model):
  name = models.CharField(max_length=50, blank=False)

class ClothPosition(models.Model):
  name = models.CharField(max_length=50, blank=False)

class UserCloth(models.Model):
  name = models.CharField(max_length=100, blank=True)
  image_id = models.IntegerField(blank=False)
  type = models.ForeignKey(
    ClothType,
    on_delete = models.CASCADE
  )
  color =  models.ForeignKey(
    ClothColor,
    on_delete = models.CASCADE
  )
  pattern =  models.ForeignKey(
    ClothPattern,
    on_delete = models.CASCADE
  )

  position = models.ForeignKey(
    ClothPosition,
    on_delete = models.CASCADE
  )

class Closet(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  clothes = ArrayField(
    models.ForeignKey(UserCloth, on_delete=models.CASCADE),
    default=list
  )

class SampleCloth(models.Model):
  name = models.CharField(max_length=100, blank=True)
  image_id = models.IntegerField(blank=False)
  purchase_link = models.CharField(max_length=500, blank=False)
  type = models.ForeignKey(
    ClothType,
    on_delete = models.CASCADE
  )
  color =  models.ForeignKey(
    ClothColor,
    on_delete = models.CASCADE
  )
  pattern =  models.ForeignKey(
    ClothPattern,
    on_delete = models.CASCADE
  )
  position = models.ForeignKey(
    ClothPosition,
    on_delete = models.CASCADE
  )

class Outfit(models.Model):
  outfit_info = models.CharField(max_length=200, blank=True)
  popularity = models.IntegerField(black=False)
  image_id = models.IntegerField(blank=False)
  purchase_link = models.CharField(max_length=500, blank=False)

  top_cloth = models.ForeignKey(
    SampleCloth,
    on_delete = models.CASCADE,
    blank=False
  )
  bottom_cloth = models.ForeignKey(
    SampleCloth,
    on_delete = models.CASCADE,
    blank=False
  )
  outer_cloth = models.ForeignKey(
    SampleCloth,
    on_delete = models.CASCADE,
    blank=True
  )


