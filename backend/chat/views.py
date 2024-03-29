from django.http import JsonResponse
import json
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .db_service import fetch_chats, fetch_messages
from django.contrib.auth.models import User

class GetChats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.username

        try:
            response = fetch_chats(user_id)
            chats = []

            if response.data:
                for chat in response.data:
                    chats.append({
                        'chat_id': chat['chat_id'],
                        'created_at': chat['created_at'],
                        'user_id': chat['user_id'],
                        'mhp_id': chat['mhp_id'],
                    })
            
            print(len(chats), "chats found")
            return JsonResponse({'chats': chats}, safe=False)

        except Exception as e:
            print("Error fetching chats")
            print(e)
            return JsonResponse({'error': 'Failed to fetch chats'}, status=500)