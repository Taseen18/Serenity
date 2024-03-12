from django.urls import path
from .views import sync_user

urlpatterns = [
    path('sync-user/', sync_user, name='sync-user'),
]
