from .serializers import ChannelSerializer
from .models import Channel
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from api.models import Account
from rest_framework import viewsets, status

class ChannelViewSet(viewsets.ModelViewSet):
    serializer_class = ChannelSerializer
    queryset = Channel.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=['PUT'])
    def uploadImage(self, request, pk=None):
        channel = Channel.objects.get(pk=pk)
        channel.image = request.data['image']
        channel.save()
        return Response({'message': 'Your Image Updated'}, status=status.HTTP_200_OK)
