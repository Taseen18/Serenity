from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone  # Import timezone

class Task(models.Model):
    task_id = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)  # Set default to the current time

    def __str__(self):
        return self.title


