from django.urls import path
from .views import PostListCreate, PostCreate, CommentListCreate, CommentCreate

urlpatterns = [
    path('postList/', PostListCreate.as_view(), name='post-list-create'),
    path('posts/create/', PostCreate.as_view(), name='post-create'),
    path('commentList/<str:post_id>/', CommentListCreate.as_view(), name='comment-list-create'),
    path('comment/create/<str:post_id>/', CommentCreate.as_view(), name='comment-create')
]