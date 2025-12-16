import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug: Log whether credentials are loaded (safe - doesn't expose actual values)
console.log('Supabase URL loaded:', !!supabaseUrl, supabaseUrl ? `(${supabaseUrl.substring(0, 30)}...)` : '(missing)')
console.log('Supabase Key loaded:', !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'SUPABASE CREDENTIALS MISSING!\n' +
    'For local dev: Create .env.local with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY\n' +
    'For Netlify: Add these as environment variables in Site Settings → Environment Variables'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      storage: localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)
