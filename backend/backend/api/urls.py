from django.urls import path, include
from rest_framework import routers
from .views import AccountViewSet, PostViewSet

router = routers.DefaultRouter()
router.register('users', AccountViewSet)
router.register('posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls))
]
