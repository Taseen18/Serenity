from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone  # Import timezone

class Posts(models.Model):
    post_id = models.CharField(max_length=255, unique=True)
    post_title = models.TextField()
    post_content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='postList')
    likes = models.IntegerField(default=0) 
    posted_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title