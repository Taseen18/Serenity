from django.http import JsonResponse
import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .db_GetPostData import fetch_post, fetch_comments, add_post
from .models import Posts
from django.contrib.auth.models import User

#def post(request):
 #   all_posts = Posts.objects.all
  #  return render(request, '../../web/src/components/post.js')

class PostListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_uuid = request.user.username
        
        try:
            response = fetch_post()
            postList = []

            if response.data:
                for post_data in response.data:
                    user, _ = User.objects.get_or_create(username=post_data['poster_name'])
                    post, created = Posts.objects.update_or_create(
                        post_id = post_data['post_id'],
                        defaults={
                            'post_title': post_data['post_title'],
                            'posted_at': post_data['posted_at'],
                            'post_content': post_data['post_content'],
                            'likes': post_data['likes'],
                            'user': user
                        }
                    )

                    postList.append({
                        'post_id': post.post_id,
                        'post_title': post.post_title,
                        'post_content': post.post_content,
                        'likes': post.likes,
                        'posted_at': post.posted_at,
                        'poster_name': user.first_name
                    })

            print(len(postList), "posts found")
            
            return JsonResponse({'posts': postList}, safe=False)
        
        except Exception as e:
            print("Error syncing posts")
            print(e)
            return JsonResponse({'error': 'Failed to fetch and sync posts.'}, status=500)

class CommentListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        post_id = request.GET.get('post_id', None)

        try:
            if post_id is not None:
                response = fetch_comments(post_id)
                comments = []
                if response.data:
                    for comment in response.data:
                        comment.append({
                            'comment_id': comment['comment_id'],
                            'commented_at': comment['commented_at'],
                            'post_id': comment['post_id'],
                            'user_id': comment['user_id'],
                            'parent_comment_id': comment['parent_comment_id'],
                            'content': comment['content']
                        })
                    print(len(comments), "comments found")
                return JsonResponse({'comments': comments}, safe=False)

        except Exception as e:
            print("Error fethcing comments")
            print(e)
            return JsonResponse({'error': 'Failed to fetch comments'}, status=500)
        
        
class PostCreate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        username = request.user.username
        title = request.data.get('title')
        content = request.data.get('content', '')
        if not title:
            return Response({'error': 'Title is required.'}, status=400)
        
        user = User.objects.get(username=username)
        error_message = add_post(title, content, user.username)
        if error_message:
            return Response({'error': error_message}, status=500)
        
        print("post added successfully")
        return Response({'success': 'post created successfully.'})