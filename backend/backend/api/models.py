from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers
from channel.models import Channel


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True, upload_to='users/images')
    user_followings = models.ManyToManyField('self', blank=True, null=True, related_name='follwers')
    channel_followings = models.ManyToManyField(Channel, blank=True, null=True)

    def __str__(self):
        return self.user.get_full_name()


class Post(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField()
    image = models.ImageField(blank=True, null=True, upload_to='posts/images')
    video = models.FileField(blank=True, null=True, upload_to='posts/videos')
    creator_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    creator = GenericForeignKey('creator_type', 'object_id')

    def __str__(self):
        return self.title


class Comment(models.Model):
    text = models.TextField()
    Post = models.OneToOneField(Post, on_delete=models.CASCADE)
    User = models.OneToOneField(Account, on_delete=models.CASCADE)

class Message(models.Model):
    user = models.ForeignKey(Account, models.CASCADE)
    text = models.TextField()



