from django.db import models
from django.apps import apps

class Channel(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()
    rules = models.TextField()
    owner = models.OneToOneField('api.Account', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='channels/images', blank=True)

    def __str__(self):
        return self.name
