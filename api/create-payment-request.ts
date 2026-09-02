import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { calculateDiscountedPrice } from '../src/lib/pricing.js';

const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
const DEFAULT_MONTHLY_PRICE = 299;
const DEFAULT_YEARLY_PRICE = 2499;

type PackageType = 'monthly' | 'yearly' | 'course';

interface RequestBody {
  packageType?: PackageType;
  courseId?: string | null;
  transactionId?: string;
  senderNumber?: string;
  offer?: string | null;
  returnPath?: string | null;
  attribution?: Record<string, unknown> | null;
  couponCode?: string | null;
}

const safeText = (value: unknown, max = 120): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
};

const safeInternalPath = (value: unknown): string => {
  const path = safeText(value, 500);
  return path && path.startsWith('/') && !path.startsWith('//') ? path : '/dashboard';
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkRateLimit(req, res, { max: 8, windowSec: 60, label: 'create-payment-request' }, 'create-payment-request')) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return res.status(500).json({ error: 'Payment server is not configured' });

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Authentication required' });

  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const token = authHeader.slice('Bearer '.length).trim();
  const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !user?.email) return res.status(401).json({ error: 'Invalid or expired session' });

  // A payment request must always have a matching application profile.  This
  // deliberately uses only the verified Auth id/email, never user metadata.
  const { error: profileError } = await adminClient
    .from('users')
    .upsert({ id: user.id, email: user.email, role: 'user' }, { onConflict: 'id', ignoreDuplicates: true });
  if (profileError) {
    console.error('Payment profile recovery failed:', profileError.code, profileError.message);
    return res.status(500).json({ error: 'Could not prepare your account for payment verification' });
  }

  const body = (req.body || {}) as RequestBody;
  const packageType = body.packageType;
  const transactionId = safeText(body.transactionId, 12)?.toUpperCase() || '';
  const senderNumber = safeText(body.senderNumber, 11) || '';
  if (!packageType || !['monthly', 'yearly', 'course'].includes(packageType)) {
    return res.status(400).json({ error: 'Invalid package' });
  }
  if (!/^[A-Z0-9]{8,12}$/.test(transactionId)) return res.status(400).json({ error: 'Invalid bKash Transaction ID' });
  if (!/^01[3-9]\d{8}$/.test(senderNumber)) return res.status(400).json({ error: 'Invalid bKash sender number' });

  let amount = 0;
  let packageName = '';
  let courseId: string | null = null;

  if (packageType === 'course') {
    courseId = safeText(body.courseId, 100);
    if (!courseId) return res.status(400).json({ error: 'Course is required' });
    const { data: course, error: courseError } = await adminClient
      .from('courses')
      .select('id, title, price')
      .eq('id', courseId)
      .single();
    if (courseError || !course || Number(course.price) <= 0) return res.status(400).json({ error: 'Course is unavailable' });
    amount = Number(course.price);
    packageName = course.title;
  } else {
    const { data: settings } = await adminClient
      .from('site_settings')
      .select('monthly_price, yearly_price')
      .maybeSingle();
    amount = packageType === 'yearly'
      ? Number(settings?.yearly_price || DEFAULT_YEARLY_PRICE)
      : Number(settings?.monthly_price || DEFAULT_MONTHLY_PRICE);
    packageName = packageType === 'yearly' ? 'Premium Yearly' : 'Premium Monthly';
  }

  const discount = calculateDiscountedPrice(amount, body.couponCode);
  if (!discount.isValidCoupon) return res.status(400).json({ error: 'Invalid coupon code' });

  const rawAttribution = body.attribution && typeof body.attribution === 'object' ? body.attribution : {};
  const attribution = Object.fromEntries(
    Object.entries(rawAttribution)
      .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value))
      .slice(0, 20)
      .map(([key, value]) => [key.slice(0, 60), typeof value === 'string' ? value.slice(0, 250) : value]),
  );

  const { data: request, error: insertError } = await adminClient
    .from('payment_requests')
    .insert({
      user_id: user.id,
      user_email: user.email,
      package_type: packageType,
      package_name: packageName,
      course_id: courseId,
      amount: discount.finalAmount,
      base_amount: discount.baseAmount,
      discount_amount: discount.discountAmount,
      coupon_code: discount.couponCode,
      transaction_id: transactionId,
      sender_number: senderNumber,
      status: 'pending',
      campaign_attribution: attribution,
      offer: safeText(body.offer, 120),
      return_path: safeInternalPath(body.returnPath),
    })
    .select('id, amount, package_name, status')
    .single();

  if (insertError) {
    if (insertError.code === '23505') return res.status(409).json({ error: 'This Transaction ID has already been submitted' });
    console.error('Payment request insert failed:', insertError.code, insertError.message);
    return res.status(500).json({ error: 'Could not submit payment for verification' });
  }

  return res.status(201).json({ success: true, request });
}
