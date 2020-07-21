from django.urls import path, include
from rest_framework import routers
from .views import AccountViewSet, PostViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('accounts', AccountViewSet)
router.register('posts', PostViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls))
]
