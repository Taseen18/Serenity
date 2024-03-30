from supabase import create_client, Client
from django.conf import settings

def get_supabase_client() -> Client:
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY
    return create_client(url, key)

def check_user_type(user_id):
    client = get_supabase_client()
    # Attempt to fetch the user from the 'mhp' table
    response = client.table('mhp').select('*').eq('mhp_id', user_id).execute()
    print(response)

    if response.data:
        print("User found as a MHP.")
        return "mhp"
    else:
        print("User not found as MHP, marked as employee.")
        return "employee"

def fetch_chats(user_id):
    client = get_supabase_client()
    user_type = check_user_type(user_id)

    if user_type == "employee":
        response = client.table('chats').select('*').eq('user_id', user_id).execute()
        return response
    elif user_type == "mhp":
        response = client.table('chats').select('*').eq('mhp_id', user_id).execute()
        return response
    else:
        response = client.table('chats').select('*').eq('user_id', user_id).execute()
        print("user type unknown")
        return response
    return None

def fetch_messages(chat_id):
    client = get_supabase_client()

    response = client.table('messages').select('*').eq('chat_id', chat_id).execute()
    return response