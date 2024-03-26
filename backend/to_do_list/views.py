# views.py
from django.http import JsonResponse
import json
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .db_service import fetch_user_tasks, mark_as_complete
from .models import Task
from django.contrib.auth.models import User

class TaskListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_uuid = request.user.username

        try:
            response = fetch_user_tasks(user_uuid)
            tasks = []

            if response.data:
                for task_data in response.data:
                    user, _ = User.objects.get_or_create(username=task_data['user_id'])

                    task, created = Task.objects.update_or_create(
                        task_id = task_data['task_id'],
                        defaults={
                            'title': task_data['title'],
                            'created_at': task_data['created_at'],
                            'description': task_data['description'],
                            'user': user,
                            'completed': task_data['completed'],
                        }
                    )

                    tasks.append({
                        'task_id': task.task_id,
                        'title': task.title,
                        'description': task.description,
                        'completed': task.completed,
                    })

            print(len(tasks), "tasks found")
            
            return JsonResponse({'tasks': tasks}, safe=False)
        
        except Exception as e:
            print("Error syncing tasks")
            print(e)
            return JsonResponse({'error': 'Failed to fetch and sync tasks.'}, status=500)


class TaskUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, task_id):
        error = mark_as_complete(task_id)

        if error:
            return Response({'error': error}, status=400)
        
        task = get_object_or_404(Task, task_id=task_id)
        task.completed = True
        task.save()

        return Response({'success': 'Task marked as complete.'})

