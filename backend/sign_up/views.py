from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Consider a more secure custom permission
def sync_user(request):
    User = get_user_model()
    user_data = request.data

    # Check if the user already exists
    if not User.objects.filter(username=user_data['uuid']).exists():
        user = User.objects.create_user(
            username=user_data['uuid'],  # Using UUID as username for uniqueness
            email=user_data['email'],
            # Set other fields or handle them as needed
        )
        return JsonResponse({'message': 'User synchronized successfully.'}, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse({'message': 'User already exists.'}, status=status.HTTP_200_OK)
