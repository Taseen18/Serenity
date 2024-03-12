# authentication.py in your Django app
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
            user, created = User.objects.get_or_create(username=user_id, defaults={'first_name': 'SupabaseUser'})
            if created:
                print("\nuser created")
            else:
                print("\nuser authenticated")

            return (user, token)

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token expired, login again')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except Exception as e:
            raise exceptions.AuthenticationFailed('Unexpected error during authentication', e)
