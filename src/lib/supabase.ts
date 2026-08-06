import { createClient } from '@supabase/supabase-js';

const CANONICAL_SUPABASE_URL = 'https://fjzqtzqflsqjevrurgbm.supabase.co';
const CANONICAL_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_iMlIYFK8PPf4o6s-wjN79w_VWL-bFRG';
const LEGACY_SUPABASE_PROJECT_REF = 'yzeiloqctrgpzuzkciiv';

const cleanEnv = (value: string | undefined) => (value ?? '').replace(/^\uFEFF/, '').trim();
const envSupabaseUrl = cleanEnv(import.meta.env.VITE_SUPABASE_URL);
const envSupabaseAnonKey = cleanEnv(import.meta.env.VITE_SUPABASE_ANON_KEY);
const shouldUseCanonicalProject =
  !envSupabaseUrl || envSupabaseUrl.includes(LEGACY_SUPABASE_PROJECT_REF);

const supabaseUrl = shouldUseCanonicalProject ? CANONICAL_SUPABASE_URL : envSupabaseUrl;
const supabaseAnonKey = shouldUseCanonicalProject
  ? CANONICAL_SUPABASE_PUBLISHABLE_KEY
  : envSupabaseAnonKey;

export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Use <any> to prevent strict type checking errors on missing tables/columns
// since we don't have a complete generated database.types.ts
export const supabase = isSupabaseConfigured()
  ? createClient<any>(supabaseUrl, supabaseAnonKey)
  : null;
