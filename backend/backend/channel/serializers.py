from rest_framework import serializers
from api.serializers import AccountSerializer
from django.apps import apps


class ChannelSerializer(serializers.ModelSerializer):
    owner = AccountSerializer(many=False)

    class Meta:
        model = apps.get_model('channel.Channel')
        fields = ('id', 'name', 'description', 'rules', 'owner')
