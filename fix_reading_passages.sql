-- Fix: Create reading_passages table and set correct RLS policies
-- Run this in Supabase Dashboard → SQL Editor → New Query

-- Step 1: Create table if not exists
CREATE TABLE IF NOT EXISTS reading_passages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  topic TEXT NOT NULL,
  time_limit INTEGER DEFAULT 20,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Enable RLS
ALTER TABLE reading_passages ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop old policies (if any)
DROP POLICY IF EXISTS "Anyone can view published passages" ON reading_passages;
DROP POLICY IF EXISTS "Admins can manage passages" ON reading_passages;
DROP POLICY IF EXISTS "Admins can insert passages" ON reading_passages;
DROP POLICY IF EXISTS "Admins can update passages" ON reading_passages;
DROP POLICY IF EXISTS "Admins can delete passages" ON reading_passages;

-- Step 4: Create correct policies
-- Public can read published passages
CREATE POLICY "Anyone can view published passages"
  ON reading_passages FOR SELECT
  USING (is_published = true);

-- Admin can read ALL passages (including drafts)
CREATE POLICY "Admins can select all passages"
  ON reading_passages FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can INSERT
CREATE POLICY "Admins can insert passages"
  ON reading_passages FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can UPDATE
CREATE POLICY "Admins can update passages"
  ON reading_passages FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can DELETE
CREATE POLICY "Admins can delete passages"
  ON reading_passages FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Step 5: Verify your user has admin role
-- (run this separately to check)
-- SELECT id, email, role FROM users WHERE role = 'admin';
