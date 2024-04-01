from django.urls import path
from .views import PostListCreate

urlpatterns = [
    path('postList/', PostListCreate.as_view(), name='post-list-create'),
]