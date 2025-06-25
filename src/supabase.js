import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmrtbgyiydbtdqjqoqoc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnRiZ3lpeWRidGRxanFvcW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNzcwNjAsImV4cCI6MjA2NTk1MzA2MH0.gBIypdttooh9O4qaaHqlFZ-hnbYjcEC2exUqkUhBRdY-anon-key'
export const supabase = createClient(supabaseUrl, supabaseKey)