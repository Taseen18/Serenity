from django.urls import path
from .views import TaskListCreate, TaskUpdate, TaskCreate

urlpatterns = [
    path('tasks/', TaskListCreate.as_view(), name='task-list-create'),
    path('tasks/update/<str:task_id>/', TaskUpdate.as_view(), name='task-update'),
    path('tasks/create/', TaskCreate.as_view(), name='task-create'),
]