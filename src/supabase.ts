import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://phwsyfxtecwyqjypctlo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBod3N5Znh0ZWN3eXFqeXBjdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNjEyNjAsImV4cCI6MjA5MDkzNzI2MH0.Ex_rQg9CuJDceEl-2lHbZTX00hV-XnoZBvC87Wk23aI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
