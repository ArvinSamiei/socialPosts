from rest_framework import serializers
from api.serializers import AccountSerializer
from django.apps import apps


class ChannelSerializer(serializers.ModelSerializer):
    owner = AccountSerializer(many=False)
    image_url = serializers.SerializerMethodField('get_image_url')

    def get_image_url(self, obj):
        return obj.image.url
    class Meta:
        model = apps.get_model('channel.Channel')
        fields = ('id', 'name', 'description', 'rules', 'owner', 'image_url')
