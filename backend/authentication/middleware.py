from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import User
from django.conf import settings
import jwt

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope['query_string'].decode())
        token = query_string.get('token', [None])[0]

        if not token:
            print("No JWT token found in WebSocket query parameters")
            return await super().__call__(scope, receive, send)
        
        scope['user'] = await self.get_user_from_token(token)

        return await super().__call__(scope, receive, send)


    @database_sync_to_async
    def get_user_from_token(self, token):
        try:
            payload = jwt.decode(token, settings.SUPABASE_SECRET_KEY, algorithms=['HS256'], audience='authenticated')
            user_id = payload['sub']

            user = User.objects.get(username=user_id)
            return user
        except User.DoesNotExist:
            print("User does not exist")
            return None
        except jwt.ExpiredSignatureError:
            print("Token expired, login again")
            return None
        except jwt.InvalidTokenError:
            print('Invalid Token')
            return None
        except Exception as e:
            print(f'Unexpected error during authentication: {e}')
            return None
