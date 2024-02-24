import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://yltkxqmckodbklfqdecl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdGt4cW1ja29kYmtsZnFkZWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3MDk1NTksImV4cCI6MjAyNDI4NTU1OX0.77MOOTyj3eMz6ltrPrdyfgbUFHZPaBy64Ewccf66vWg';

export const supabase = createClient(supabaseUrl, supabaseKey);