from supabase import create_client, Client
from django.conf import settings

def get_supabase_client() -> Client:
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY
    return create_client(url, key)

def check_user_type(user_id):
    client = get_supabase_client()
    response = client.table('mhp').select('*').eq('mhp_id', user_id).execute()

    if response.get('error') is not None:
        print("An error occurred checking the user type.", response['error'])
        return None
    
    if not response.data:
        print("User was not found in mhp table.")
        #should check users table in the future
        return "employee"
    else:
        return "mhp"

def fetch_chats(user_id):
    client = get_supabase_client()
    user_type = check_user_type(user_id)

    if user_type == "employee":
        response = client.table('chats').select('*').eq('user_id', user_id).execute()



def fetch_messages():
    pass