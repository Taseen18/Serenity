from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/chat/', consumers.ChatConsumer.as_asgi()),
    path('ws/chat/<str:room_name>/', consumers.MessageConsumer.as_asgi()),
]
