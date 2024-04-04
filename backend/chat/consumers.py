from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import Message, Chat
from django.db.models import Q
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from django.utils import timezone

class MessageConsumer(AsyncWebsocketConsumer):
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
        print("WebSocket closed for chat", self.room_name)

    # Receive message from WebSocket (not used here but included for completeness)
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        content = text_data_json.get('content')
        chat_id = text_data_json.get('chat_id')

        if content and chat_id:
            sender = self.scope["user"]
            if sender:
                if sender.username == text_data_json.get('sender'):
                    message_saved = await self.create_message(chat_id, content, sender)
                    '''
                    if message_saved:
                        await self.channel_layer.group_send(
                            self.room_group_name,
                            {
                                'type': 'chat_message',
                                'message': {
                                    'content': content,
                                    'sender': sender.username,
                                    'chat_id': chat_id,
                                    'type': 'newMessage'
                                }
                            }
                        )
                    '''
                else:
                    print("ERROR - sender mismatch")
            else:
                print("ERROR - User not authenticated")
                return

    @database_sync_to_async
    def create_message(self, chat_id, content, sender):
        try:
            chat = Chat.objects.get(chat_id=chat_id)
            if sender.username == chat.employee.username:
                receiver = chat.mhp
            elif sender.username == chat.mhp.username:
                receiver = chat.employee
            else:
                print("User not in chat")
                return False
            
            new_message = Message.objects.create(
                content=content,
                sender=sender,
                receiver=receiver,
                chat=chat
            )
            chat.last_message_at = timezone.now()
            chat.save()

            return True

        except Chat.DoesNotExist:
            print("Chat does not exist")
            return False
        except Chat.DoesNotExist:
            print("User does not exist")
            return False
        except Exception as e:
            print("Error creating message", e)
            return False

    async def chat_message(self, event):
        message = event['message']

        if str(message['chat_id']) == self.room_name:
            await self.send(text_data=json.dumps({
                'message': message
            }))
        else:
            print("User received message from other chat")
        

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

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.user_group_name = f'user_{self.user.username}_chats'
        print("username: ", self.user.username)

        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )
        
        await self.accept()
        print("Chat WebSocket Accepted")

        await self.fetch_and_send_chats()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.user_group_name,
            self.channel_name
        )
        print("Chats WebSocket Closed")

    async def receive(self, text_data):
        pass

    async def chat_update(self, event):
        # Handle incoming chat update messages
        # For simplicity, we're just directly forwarding the update
        await self.send(text_data=json.dumps({
            'type': 'chat_update',
            'data': event['data']
        }))

    async def fetch_and_send_chats(self):
        chats = await get_user_chats(self.user.username)
        await self.send(text_data=json.dumps({
            'type': 'chat_list',
            'chats': chats
        }))

@sync_to_async
def fetch_recent_messages(room_name, limit=50):
    print("Connecting to room:", room_name)
    messages = Message.objects.filter(chat_id=room_name).order_by('sent_at')[:limit]
    recent_messages = [{
        "message_id": message.message_id,
        "content": message.content,
        "sender": message.sender.username,
        "receiver": message.receiver.username,
        "sent_at": message.sent_at.strftime("%Y-%m-%d %H:%M:%S"),
        "sent_by": "fetch_recent_messages"
    } for message in messages]
    print(len(recent_messages), "messages found")
    if len(recent_messages) >= 50:
        print("CAUTION: Message fetch limit reached")
    return recent_messages

@sync_to_async
def get_user_chats(user_id):
    chats = Chat.objects.filter(
        Q(employee_id=user_id) | Q(mhp_id=user_id)
    ).order_by('-last_message_at')

    recent_chats = []
    for chat in chats:
        chat_with = None
        if user_id == chat.employee.username:
            chat_with = chat.mhp
        elif user_id == chat.mhp.username:
            chat_with = chat.employee
        else:
            print("User not found in chat")
                
        if chat_with:

            chat_data = {
                'chat_id': chat.chat_id,
                'last_message_at': chat.last_message_at.strftime("%Y-%m-%d %H:%M:%S"),
                'employee_id': chat.employee_id,
                'mhp_id': chat.mhp_id,
                'me_id': user_id,
                'chat_with_id': chat_with.username,
                'chat_with_first_name': chat_with.first_name,
                'chat_with_last_name': chat_with.last_name
            }
            recent_chats.append(chat_data)
    print(len(recent_chats), "chats found")
    return recent_chats
