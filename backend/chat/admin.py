from django.contrib import admin
from .models import Message, Chat

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('message_id', 'content', 'sender', 'receiver', 'sent_at', 'chat_id')
    search_fields = ('content', 'sender__username')

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('chat_id', 'last_message_at', 'employee', 'mhp')