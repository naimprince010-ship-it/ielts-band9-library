import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit } from './_rateLimit.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const rl = checkRateLimit(req, { max: 30, windowSec: 60, label: 'approve-payment' });
  if (!rl.allowed) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];

  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Verify caller's JWT and load their DB role
  const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { data: callerRow, error: callerErr } = await adminClient
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (callerErr || !callerRow || !['admin', 'instructor'].includes(callerRow.role)) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { paymentId } = req.body as { paymentId?: string };
  if (!paymentId || typeof paymentId !== 'string' || paymentId.length > 64) {
    return res.status(400).json({ error: 'Invalid paymentId' });
  }

  // Load the pending payment
  const { data: payment, error: fetchErr } = await adminClient
    .from('payment_requests')
    .select('id, user_id, package_type, amount, status')
    .eq('id', paymentId)
    .single();

  if (fetchErr || !payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  if (payment.status !== 'pending') {
    return res.status(409).json({ error: `Payment already ${payment.status}` });
  }

  // Calculate premium expiry from DB-side time (not client-provided)
  let premiumUntil: string | null = null;
  if (payment.package_type === 'yearly') {
    premiumUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  } else if (payment.package_type === 'monthly') {
    premiumUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }

  // Mark payment approved — eq on status prevents double-approval race
  const { error: approveErr } = await adminClient
    .from('payment_requests')
    .update({
      status: 'approved',
      processed_at: new Date().toISOString(),
      processed_by: user.id,
    })
    .eq('id', paymentId)
    .eq('status', 'pending');

  if (approveErr) {
    return res.status(500).json({ error: 'Failed to approve payment' });
  }

  // Activate premium for subscription packages
  if (payment.package_type !== 'course' && premiumUntil) {
    const { error: userErr } = await adminClient
      .from('users')
      .update({
        subscription_status: 'premium',
        premium_until: premiumUntil,
        package_type: payment.package_type,
      })
      .eq('id', payment.user_id);

    if (userErr) {
      // Roll back the approval so admin can retry
      await adminClient
        .from('payment_requests')
        .update({ status: 'pending', processed_at: null, processed_by: null })
        .eq('id', paymentId);
      return res.status(500).json({ error: 'Failed to activate premium — payment rolled back' });
    }
  }

  return res.status(200).json({ success: true, premiumUntil });
}

