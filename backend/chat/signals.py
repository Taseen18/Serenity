from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Message, Chat
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.utils import timezone

@receiver(post_save, sender=Message)
def send_message_update(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        room_group_name = f'chat_{instance.chat_id}'
            
        message_content = {
            'type': 'chat_message',  # This should match the method name in your consumer
            'message': {
                'chat_id': instance.chat_id,
                'message_id': instance.message_id,
                'content': instance.content,
                'sender': instance.sender.username,
                'receiver': instance.receiver.username,
                'sent_at': instance.sent_at.strftime("%Y-%m-%d %H:%M:%S"),
                'sent_by': "send_message_update"
            }
        }

        # Send message to room group
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            message_content
        )

        #send_chat_update2(instance.chat_id, instance.sent_at)
            

def send_chat_update2(chat_id, last_message_at):
    # Fetch the updated chat details or list of chats as per your requirement
    # For simplicity, let's assume we're just notifying about the chat_id being updated
    channel_layer = get_channel_layer()
    user_group_name = f'chat_{chat_id}'

    chat_content = {
        'type': 'chat_update',  # Ensure your consumer handles this type
        'data': {
            'last_message_at': last_message_at
        }
    }

    async_to_sync(channel_layer.group_send)(
        user_group_name,
        chat_content
    )

@receiver(post_save, sender=Chat)
@receiver(post_delete, sender=Chat)  # If you want to handle deletions
def send_chat_update(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    group_name = "chats_group"  # This could be a general group name if broadcasting to all users

    chat_content = {
        'type': 'chat_update',  # Corresponds to the method in the consumer
        'chat': {
            'id': instance.chat_id,
            'last_updated_at': instance.last_message_at.strftime("%Y-%m-%d %H:%M:%S"),
            'employee_id': instance.employee_id,
            'mhp_id': instance.mhp_id,
        }
    }

    async_to_sync(channel_layer.group_send)(
        group_name,
        chat_content
    )