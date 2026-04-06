-- SQL to create payment_requests table and allow verification workflow
CREATE TABLE IF NOT EXISTS public.payment_requests (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email     TEXT NOT NULL,
  package_type   TEXT NOT NULL,
  package_name   TEXT NOT NULL,
  course_id      TEXT, -- Optional: ID of the course if package_type is 'course'
  amount         INTEGER NOT NULL,
  transaction_id TEXT UNIQUE NOT NULL,
  sender_number  TEXT NOT NULL,
  status         TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  verified_at    TIMESTAMPTZ,
  verified_by    TEXT, -- Email of the admin who verified
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payment_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payment_requests 
-- Users can view their own requests
CREATE POLICY "Users can view own payment requests" ON payment_requests FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own requests
CREATE POLICY "Users can insert own payment requests" ON payment_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view and manage all requests
CREATE POLICY "Admins can manage all payment requests" ON payment_requests FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Index for transaction ID and status
CREATE INDEX IF NOT EXISTS idx_payment_requests_trx_id ON payment_requests (transaction_id);
CREATE INDEX IF NOT EXISTS idx_payment_requests_status ON payment_requests (status);
CREATE INDEX IF NOT EXISTS idx_payment_requests_user_id ON payment_requests (user_id);

COMMENT ON TABLE public.payment_requests IS 'Stores bKash payment verification requests for manual admin approval';
