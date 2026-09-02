import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit } from './_rateLimit.js';
import { cleanEnv } from './_env.js';

const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkRateLimit(req, res, { max: 30, windowSec: 60, label: 'approve-payment' }, 'approve-payment')) return;

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

  // Older payment requests can predate profile creation. Recover only from the
  // verified Auth account; do not derive authorization data from user metadata.
  const { data: paymentUserResult, error: paymentUserError } = await adminClient.auth.admin.getUserById(payment.user_id);
  const paymentUser = paymentUserResult?.user;
  if (paymentUserError || !paymentUser?.email) {
    return res.status(409).json({ error: 'The payment user account is unavailable' });
  }
  const { error: profileRecoveryError } = await adminClient
    .from('users')
    .upsert({ id: payment.user_id, email: paymentUser.email, role: 'user' }, { onConflict: 'id', ignoreDuplicates: true });
  if (profileRecoveryError) {
    console.error('Payment approval profile recovery failed:', profileRecoveryError.code, profileRecoveryError.message);
    return res.status(500).json({ error: 'Could not recover the payment user profile' });
  }

  // The database trigger grants subscription/course access atomically with this
  // status transition. Returning the row also proves this request won the race.
  const { data: approvedPayment, error: approveErr } = await adminClient
    .from('payment_requests')
    .update({
      status: 'approved',
      processed_at: new Date().toISOString(),
      processed_by: user.id,
    })
    .eq('id', paymentId)
    .eq('status', 'pending')
    .select('id, package_type')
    .maybeSingle();

  if (approveErr) {
    return res.status(500).json({ error: 'Failed to approve payment' });
  }
  if (!approvedPayment) {
    return res.status(409).json({ error: 'Payment is no longer pending' });
  }

  let premiumUntil: string | null = null;
  if (approvedPayment.package_type !== 'course') {
    const { data: profile, error: profileError } = await adminClient
      .from('users')
      .select('premium_until')
      .eq('id', payment.user_id)
      .single();
    if (profileError) {
      return res.status(500).json({ error: 'Payment approved, but access status could not be loaded' });
    }
    premiumUntil = profile.premium_until;
  }

  return res.status(200).json({ success: true, premiumUntil });
}

