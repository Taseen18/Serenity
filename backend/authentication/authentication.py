from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import authentication, exceptions
import jwt

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = authentication.get_authorization_header(request).decode('utf-8')
        if not auth_header or not auth_header.startswith('Bearer '):
            print("No JWT token found in request headers")
            return None

        token = auth_header.split(' ')[1]
        try:
            payload = jwt.decode(token, settings.SUPABASE_SECRET_KEY, algorithms=['HS256'], audience='authenticated')
            user_id = payload['sub']
            email = payload.get('email', '')
            first_name = payload.get('user_metadata', {}).get('first_name', '')
            last_name = payload.get('user_metadata', {}).get('last_name', '')

            # Check if the user exists and update/create accordingly
            user, created = User.objects.get_or_create(username=user_id, defaults={
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            })
            
            # If the user was not created (i.e., it already exists), update its details
            if not created:
                user.first_name = first_name
                user.last_name = last_name
                user.email = email
                user.save()

            if created:
                print("\nNew user authenticated and created")
            else:
                print("User authenticated")

            return (user, token)

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token expired, login again')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Unexpected error during authentication: {e}')
