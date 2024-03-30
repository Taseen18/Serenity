from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import Message
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        
        await self.accept()
        print("webhook accepted")

        recent_messages = await fetch_recent_messages(self.room_name)
        for message in recent_messages:
            await self.send_chat_message(message)


    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket (not used here but included for completeness)
    async def receive(self, text_data):
        pass

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message']
        }))

    # Method to send chat messages to WebSocket
    async def send_chat_message(self, message):
        # Directly send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

@sync_to_async
def fetch_recent_messages(room_name, limit=10):
    print("Connecting to room:", room_name)
    messages = Message.objects.filter(chat_id=room_name).order_by('sent_at')[:limit]
    recent_messages = [{
        "content": message.content,
        "sender": message.sender.username,
        "receiver": message.receiver.username,
        "sent_at": message.sent_at.strftime("%Y-%m-%d %H:%M:%S")
    } for message in messages]
    print("Fetched messages:", recent_messages)  # Debug print
    return recent_messages

