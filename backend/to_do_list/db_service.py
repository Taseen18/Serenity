# db_service.py
from supabase import create_client, Client
from django.conf import settings

def get_supabase_client() -> Client:
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY
    return create_client(url, key)

def fetch_user_tasks(user_uuid):
    client = get_supabase_client()  # Ensure you have this function set up to create a Supabase client
    data, error = client.table('to_do_list_tasks').select('*').eq('user_id', user_uuid).execute()
    
    if error:
        print(f"Error fetching tasks: {error}")
        return []
    return data
