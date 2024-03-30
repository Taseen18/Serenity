from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import Message, Chat
from django.db.models import Q
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.room_name = self.scope['url_route'].get('kwargs', {}).get('room_name')
        
        if self.room_name:
            self.room_group_name = f'chat_{self.room_name}'
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
        else:
            self.chat_group_name = f'user_{self.user.id}_chats'
            await self.channel_layer.group_add(
                self.chat_group_name,
                self.channel_name
            )

        
        await self.accept()
        print("WebSocket accepted")

        recent_messages = await fetch_recent_messages(self.room_name)
        for message in recent_messages:
            await self.send_chat_message(message)


    async def disconnect(self, close_code):
        # Conditionally leave the appropriate group
        if self.room_name:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
        else:
            await self.channel_layer.group_discard(
                self.chat_group_name,
                self.channel_name
            )

    # Receive message from WebSocket (not used here but included for completeness)
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')

        if message_type == 'fetch_chats':
            await self.fetch_and_send_chats()

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

    async def chat_update(self, event):
        # Handle incoming chat update messages
        # For simplicity, we're just directly forwarding the update
        await self.send(text_data=json.dumps({
            'type': 'chat_update',
            'data': event['data']
        }))

    async def fetch_and_send_chats(self):
        # Fetch chat list for the user and send it
        chats = await get_user_chats(self.user.id)
        await self.send(text_data=json.dumps({
            'type': 'chat_list',
            'chats': chats
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

@sync_to_async
def get_user_chats(user_id):
    chats = Chat.objects.filter(
        Q(employee_id=user_id) | Q(mhp_id=user_id)
    ).order_by('-last_message_at')

    recent_chats = [{
        'chat_id': chat.id,
        'last_message_at': chat.last_message_at.strftime("%Y-%m-%d %H:%M:%S"),
        'employee_id': chat.employee_id,
        'mhp_id': chat.mhp_id,
    } for chat in chats]
    print("Fetched chats:", recent_chats)
    return recent_chats
