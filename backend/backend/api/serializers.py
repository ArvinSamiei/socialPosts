from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Post, Account, Message
from django.apps import apps
from generic_relations.relations import GenericRelatedField


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'get_full_name', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    image_url = serializers.SerializerMethodField('get_image_url')

    def get_image_url(self, obj):
        return obj.image.url

    def create(self, validated_data):
        print(validated_data)
        user = UserSerializer().create(dict(**validated_data['user']))
        account = Account.objects.create(user=user)
        return account

    class Meta:
        model = Account
        fields = ('id', 'user', 'image_url')


class CreatorRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Post):
            serializer = PostSerializer2(value)
        elif isinstance(value, Account):
            serializer = AccountSerializer(value)
        else:
            raise Exception('Unexpected type of tagged object')

        return serializer.data


class PostSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'image', 'video')


class PostSerializer(serializers.ModelSerializer):
    creator = GenericRelatedField({
        Post: PostSerializer2(),
        Account: AccountSerializer()
    })
    image_url = serializers.SerializerMethodField('get_image_url')
    video_url = serializers.SerializerMethodField('get_video_url')

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        else:
            return None

    def get_video_url(self, obj):
        if obj.video:
            return obj.video.url
        else:
            return None

    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'image_url', 'video_url', 'creator')


class MessageSerializer(serializers.ModelSerializer):
    user = AccountSerializer(many=False)

    class Meta:
        model = Message
        fields = ('id', 'user', 'text')
