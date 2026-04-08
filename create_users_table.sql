-- 0. Drop the old table to ensure the new one takes effect properly without type conflicts
DROP TABLE IF EXISTS public.users CASCADE;

-- 1. Create the public.users table (Using TEXT with CHECK constraints instead of ENUM to avoid type mismatch errors)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  role TEXT CHECK (role IN ('user', 'admin', 'instructor')) DEFAULT 'user' NOT NULL,
  subscription_status TEXT CHECK (subscription_status IN ('free', 'premium')) DEFAULT 'free' NOT NULL,
  premium_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2b. Admin check must not query public.users inside a policy on public.users (infinite recursion).
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND (
      EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role IN ('admin', 'instructor')
      )
      OR EXISTS (
        SELECT 1
        FROM unnest(ARRAY[
          'naimprince010@gmail.com'
        ]::text[]) AS allowlisted(raw_email)
        WHERE lower(trim(COALESCE(
          NULLIF(auth.jwt() ->> 'email', ''),
          (SELECT au.email FROM auth.users au WHERE au.id = auth.uid()),
          ''
        ))) = lower(trim(allowlisted.raw_email))
      )
    );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;

-- 3. RLS Policies
-- Users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id);

-- Admins can view all users
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users" 
ON public.users 
FOR SELECT 
USING (public.is_admin());

-- Admins can update all users
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
CREATE POLICY "Admins can update all users" 
ON public.users 
FOR UPDATE 
USING (public.is_admin());

-- 4. Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, subscription_status)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    'user',
    'free'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create a trigger that calls the function whenever a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Add an updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_modtime ON public.users;
CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
