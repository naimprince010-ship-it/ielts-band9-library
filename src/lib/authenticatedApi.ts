import { supabase } from '@/lib/supabase';

export async function authenticatedJsonHeaders(): Promise<Record<string, string>> {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session?.access_token) {
    throw new Error('Your admin session has expired. Please sign in again.');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.access_token}`,
  };
}
