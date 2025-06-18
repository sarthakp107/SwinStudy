import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://abqfvrrqqaihqrcjxdzv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANNON_KEY as string
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase