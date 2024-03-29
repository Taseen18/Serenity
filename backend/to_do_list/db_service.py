# db_service.py
from supabase import create_client, Client
from django.conf import settings

def get_supabase_client() -> Client:
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY
    return create_client(url, key)

def fetch_user_tasks(user_id):
    client = get_supabase_client()
    data = client.table('to_do_list_tasks').select('*').eq('user_id', user_id).eq('completed', False).execute()
    return data

def mark_as_complete(task_id):
    client = get_supabase_client()
    error_message = None

    response = client.table('to_do_list_tasks').update({'completed': True}).eq('task_id', task_id).execute()

    # Check for errors in the response. Adjust this according to the actual structure of the response object
    if not response.data:
        error_message = "Failed to update task in Supabase."
        if hasattr(response, 'error') and response.error:
            error_message = response.error.message
        return error_message
    
    return None  # No errors, return None

def add_task(title, description, user_id):
    client = get_supabase_client()
    error_message = None
    response = client.table('to_do_list_tasks').insert({
        'title': title,
        'description': description,
        'user_id': user_id,
        'completed': False
    }).execute()

    if not response.data:
        error_message = "Failed to create task in supabase."
        if hasattr(response, 'error') and response.error:
            error_message = response.error.message
        return error_message