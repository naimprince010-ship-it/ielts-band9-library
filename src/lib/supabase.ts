import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Use <any> to prevent strict type checking errors on missing tables/columns
// since we don't have a complete generated database.types.ts
export const supabase = isSupabaseConfigured()
  ? createClient<any>(supabaseUrl, supabaseAnonKey)
  : null;
