# authentication.py in your Django app
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import authentication, exceptions
import jwt
import logging

logger = logging.getLogger(__name__)

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = authentication.get_authorization_header(request).decode('utf-8')
        if not auth_header or not auth_header.startswith('Bearer '):
            logger.debug("No JWT token found in request headers")
            return None

        token = auth_header.split(' ')[1]
        try:
            payload = jwt.decode(token, settings.SUPABASE_SECRET_KEY, algorithms=['HS256'], audience='authenticated')
            user_id = payload['sub']  # Assuming 'sub' is used as the unique identifier

            user, created = User.objects.get_or_create(username=user_id, defaults={'first_name': 'SupabaseUser'})
            if created:
                logger.debug(f"Created new user {user.username}")
                print("\nuser created")
            else:
                logger.debug(f"User {user.username} authenticated")
                print("\nuser authenticated")

            return (user, token)

        except jwt.ExpiredSignatureError:
            logger.warning("JWT token expired")
            raise exceptions.AuthenticationFailed('Token expired, login again')
        except jwt.InvalidTokenError:
            logger.warning("Invalid JWT token")
            raise exceptions.AuthenticationFailed('Invalid token')
        except Exception as e:
            logger.error(f"Unexpected error in JWT authentication: {str(e)}")
            raise exceptions.AuthenticationFailed('Unexpected error during authentication')
