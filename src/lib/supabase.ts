import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Only create the client if Supabase is configured
// This allows the app to run in demo mode without Supabase
export const supabase = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;
