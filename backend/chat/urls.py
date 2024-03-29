from django.urls import path
from .views import GetChats

urlpatterns = [
    path('getChats/', GetChats.as_view(), name='get-chats'),
]