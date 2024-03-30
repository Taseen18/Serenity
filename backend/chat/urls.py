from django.urls import path
from .views import GetChats, GetMessages

urlpatterns = [
    path('getChats/', GetChats.as_view(), name='get-chats'),
    path('getMessages/', GetMessages.as_view(), name='get-messages'),
]