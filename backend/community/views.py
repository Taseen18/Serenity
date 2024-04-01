from django.http import JsonResponse
import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .db_GetPostData import fetch_post #HERE DO FUNCTIONS IG.
from .models import Posts
from django.contrib.auth.models import User

#def post(request):
 #   all_posts = Posts.objects.all
  #  return render(request, '../../web/src/components/post.js')

class TaskListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_uuid = request.user.username

        try:
            response = fetch_post()
            postList = []

            if response.data:
                for post_data in response.data:
                    user, _ = User.objects.get_or_create(username=post_data['post_id'])
                    post = Posts.objects.update_or_create(
                        post_id = post_data['post_id'],
                        defaults={
                            'post_title': post_data['post_title'],
                            'posted_at': post_data['posted_at'],
                            'post_content': post_data['post_content'],
                            'likes':post_data['likes'],
                            'user': user,
                        }
                    )

                    postList.append({
                        'post_id': post.post_id,
                        'post_title': post.post_title,
                        'post_content': post.post_content,
                        'likes': post.likes,
                        'posted_at': post.posted_at
                    })

            print(len(postList), "tasks found")
            
            return JsonResponse({'tasks': postList}, safe=False)
        
        except Exception as e:
            print("Error syncing tasks")
            print(e)
            return JsonResponse({'error': 'Failed to fetch and sync tasks.'}, status=500)