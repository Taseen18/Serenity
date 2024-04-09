from supabase import create_client, Client
from django.conf import settings
from django.utils import timezone
def get_supabase_client() -> Client:
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY
    return create_client(url, key)

def fetch_post():
    client = get_supabase_client()
    data = client.table('posts').select('*').execute()
    print(data)
    return data



def add_post(post_title, post_content, user_id):
    client = get_supabase_client()
    error_message = None
    response = client.table('posts').insert({
        'post_title': post_title,
        'post_content': post_content,
        'poster_name': user_id,
        'likes': 0,
        'posted_at': timezone.now().isoformat()
        
    }).execute()

    if not response.data:
        error_message = "Failed to create post in supabase."
        if hasattr(response, 'error') and response.error:
            error_message = response.error.message


def fetch_comments(post_id):
    client = get_supabase_client()
    data = client.table('comments').select('*').eq('post_id', post_id).execute()
    return data


def add_comment(PostContent, user_id, post_id):
    client = get_supabase_client()
    error_message = None
    response = client.table('comments').insert({
        'PostContent': PostContent,
        'user_id': user_id,
        'post_id':post_id,
        'commented_at': timezone.now().isoformat()

    }).execute()

    if not response.data:
        error_message = "Failed to create post in supabase."
        if hasattr(response, 'error') and response.error:
            error_message = response.error.message
    return error_message 
