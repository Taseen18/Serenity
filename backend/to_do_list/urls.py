# urls.py in your Django app

from django.urls import path
from .views import TaskListCreate, TaskUpdate

urlpatterns = [
    path('tasks/', TaskListCreate.as_view(), name='task-list-create'),
    path('tasks/update/<str:task_id>/', TaskUpdate.as_view(), name='task-update'),
]