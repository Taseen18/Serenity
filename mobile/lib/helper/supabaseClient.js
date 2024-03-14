import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://yltkxqmckodbklfqdecl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdGt4cW1ja29kYmtsZnFkZWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyMTcxNDQsImV4cCI6MjAyNTc5MzE0NH0.JpLvL5h1zlAHpa1t8X3GatWcVZycZy6AxoSYscORETU';

export const supabase = createClient(supabaseUrl, supabaseKey);