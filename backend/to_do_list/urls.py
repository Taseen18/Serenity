# urls.py in your Django app

from django.urls import path
from .views import TaskListCreate

urlpatterns = [
    path('tasks/', TaskListCreate.as_view(), name='task-list-create'),
]
