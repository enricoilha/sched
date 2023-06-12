import { createClient } from "@supabase/supabase-js"

const supabase_url = "https://vdldkxvzzfhazsaeneha.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbGRreHZ6emZoYXpzYWVuZWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1NDM2NjQsImV4cCI6MTk5NDExOTY2NH0.tGVlKyCHcMTBps7OU1OjWW68DutxIeBZyleiv8Muus8"

const supabase = createClient(supabase_url, supabase_key)

export { supabase }