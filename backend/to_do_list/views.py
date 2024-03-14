# views.py
from django.http import JsonResponse
import json
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .db_service import fetch_user_tasks

class TaskListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_uuid = request.user.username

        try:
            response = fetch_user_tasks(user_uuid)
            print(response)

            if response.data:
                tasks = response.data
            else:
                tasks = []

            return JsonResponse({'tasks': tasks}, safe=False)

        except Exception as e:
            print(f"Error fetching tasks: {e}")
            return JsonResponse({'error': 'Failed to fetch tasks.'}, status=500)

