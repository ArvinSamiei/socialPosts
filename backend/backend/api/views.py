from rest_framework import viewsets
from .serializers import PostSerializer, AccountSerializer, UserSerializer
from .models import Post, Account
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from django.db.models import Q
from django.contrib.contenttypes.models import ContentType
from rest_framework import viewsets, status
from rest_framework.response import Response
from channel.models import Channel


class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    authentication_classes = (TokenAuthentication,)

    @action(detail=False, methods=['GET'])
    def currentUser(self, request, pk=None):
        usere = request.user
        user = Account.objects.get(user=usere.id)
        serializer = AccountSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def followingUsers(self, request, pk=None):
        usere = request.user
        user = Account.objects.get(user=usere.id)
        users = user.user_followings
        serializer = AccountSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def followingChannels(self, request, pk=None):
        usere = request.user
        user = Account.objects.get(user=usere.id)
        channels = user.channel_followings
        serializer = AccountSerializer(channels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['PUT'])
    def uploadImage(self, request, pk=None):
        usere = request.user
        user = Account.objects.get(user=usere.id)
        user.image = request.data['image']
        user.save()
        return Response({'message': 'Your Image Updated'}, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['GET'])
    def followings(self, request, pk=None):
        usere = request.user
        print(usere.id)
        user = Account.objects.get(user=usere.id)
        posts = Post.objects.filter(Q(creator_type=ContentType.objects.get_for_model(Channel).id,
                                      object_id__in=user.channel_followings.values('pk')) | Q(
            creator_type=ContentType.objects.get_for_model(Account).id,
            object_id__in=user.user_followings.values('pk')))
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = [AllowAny, ]
