from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Message
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@receiver(post_save, sender=Message)
def send_message_update(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        room_group_name = f'chat_{instance.chat_id}'

        # Prepare the message content
        message_content = {
            'type': 'chat_message',  # This should match the method name in your consumer
            'message': {
                'content': instance.content,
                'sender': instance.sender.username,
                "receiver": instance.receiver.username,
                'sent_at': instance.sent_at.strftime("%Y-%m-%d %H:%M:%S")  # Format datetime as string
            }
        }

        # Send message to room group
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            message_content
        )

