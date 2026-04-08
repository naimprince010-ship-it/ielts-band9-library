import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit';

export default function handler(req: VercelRequest, res: VercelResponse) {
  checkRateLimit(req, res, LIMITS.light, 'healthz');
  return res.status(200).json({ ok: true, ts: Date.now() });
}
