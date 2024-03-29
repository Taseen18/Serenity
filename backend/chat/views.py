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
                pass

        except:
            pass