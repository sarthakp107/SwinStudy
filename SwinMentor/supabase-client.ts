
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://abqfvrrqqaihqrcjxdzv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicWZ2cnJxcWFpaHFyY2p4ZHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MzY3MjksImV4cCI6MjA1NjExMjcyOX0.zd8ZB2EsnSZqNABzWMiN-cVyWODnkedWQ-bL_hmZihY"
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANNON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);