import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.https://lommheijitxadhghqqww.supabase.co
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvbW1oZWlqaXR4YWRoZ2hxcXd3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTU2NjA2OCwiZXhwIjoyMDkxMTQyMDY4fQ.MJPQhy4jdNx8zDzGshl0y0p8qMScbkd9CbG0DY4iWX4

export const supabase = createClient(supabaseUrl, supabaseAnonKey)