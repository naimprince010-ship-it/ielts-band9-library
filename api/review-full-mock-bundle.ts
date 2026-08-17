import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { cleanEnv } from './_env.js';
import { getStaffCaller } from './_staffAuth.js';

const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const caller = await getStaffCaller(req, res);
  if (!caller) return;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return res.status(500).json({ error: 'Server authentication is not configured' });

  let body: Record<string, unknown> = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  const bundleId = typeof body.bundleId === 'string' ? body.bundleId : '';
  const action = body.action === 'publish' || body.action === 'reject' ? body.action : '';
  if (!UUID.test(bundleId) || !action) return res.status(400).json({ error: 'Invalid bundle review request' });

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  const { error } = await admin.rpc('review_full_mock_bundle', {
    target_bundle_id: bundleId,
    target_action: action,
    target_reviewer_id: caller.id,
  });
  if (error) return res.status(400).json({ error: error.message || 'Bundle review failed' });
  return res.status(200).json({ success: true });
}
