# views.py
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .db_service import fetch_user_tasks

class TaskListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # With the updated authentication process, `request.user` should be set
        # Assuming that you have mapped `request.user` to your Supabase users
        # And assuming that your Supabase users' unique identifier (e.g., sub) is stored in a way that is accessible here
        # For this example, let's assume you store the Supabase UUID in your Django user model's username field
        
        # Retrieve the Supabase UUID from the Django user model's username field
        user_uuid = request.user.username

        # Fetch tasks from Supabase using the user's UUID
        tasks = fetch_user_tasks(user_uuid)
        
        # Return the tasks as a JSON response
        return JsonResponse({'tasks': tasks}, safe=False)

