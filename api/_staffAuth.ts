import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { cleanEnv } from './_env.js';

const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

export interface StaffCaller {
  id: string;
}

export async function getStaffCaller(req: VercelRequest, res: VercelResponse): Promise<StaffCaller | null> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    res.status(500).json({ error: 'Server authentication is not configured' });
    return null;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' });
    return null;
  }

  try {
    const token = authHeader.slice('Bearer '.length).trim();
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
    if (authError || !user) {
      res.status(401).json({ error: 'Invalid or expired session' });
      return null;
    }

    const { data: caller, error: callerError } = await adminClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (callerError || !caller || !['admin', 'instructor'].includes(caller.role)) {
      res.status(403).json({ error: 'Staff access required' });
      return null;
    }

    return { id: user.id };
  } catch (error) {
    console.error('Staff authentication setup failed:', error);
    const detail = error instanceof Error ? error.message : 'Unknown authentication setup error';
    res.status(500).json({
      error: 'Server authentication is unavailable',
      ...(process.env.VERCEL_ENV === 'production' ? {} : { detail }),
    });
    return null;
  }
}

export async function requireStaff(req: VercelRequest, res: VercelResponse): Promise<boolean> {
  return Boolean(await getStaffCaller(req, res));
}
