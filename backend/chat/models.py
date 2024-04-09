from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    chat = models.ForeignKey('Chat', related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    sender = models.ForeignKey(User, related_name='sender_id', on_delete=models.CASCADE, to_field='username')
    receiver = models.ForeignKey(User, related_name='receiver_id', on_delete=models.CASCADE, to_field='username')
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['sent_at']

class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(User, related_name='employee_id', on_delete=models.CASCADE, to_field='username')
    mhp = models.ForeignKey(User, related_name='mhp_id', on_delete=models.CASCADE, to_field='username')
    last_message_at = models.DateTimeField(auto_now=False)