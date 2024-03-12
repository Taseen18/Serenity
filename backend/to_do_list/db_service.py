# db_service.py
from supabase import create_client, Client
from django.conf import settings

def get_supabase_client() -> Client:
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY
    return create_client(url, key)

def fetch_user_tasks(user_uuid):
    client = get_supabase_client()  # Ensure you have this function set up to create a Supabase client
    data = client.table('to_do_list_tasks').select('title, description').eq('user_id', user_uuid).execute()
    return data
