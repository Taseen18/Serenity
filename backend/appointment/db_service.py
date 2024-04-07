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
        print("User MHP.")
        return "mhp"
    else:
        print("User is employee.")
        return "employee"
    
def get_mhps():
    client = get_supabase_client()
    response = client.table('mhp').select('*').execute()
    print(response)
    return response