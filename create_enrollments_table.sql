-- 1. Create the user_courses table for course enrollments
CREATE TABLE IF NOT EXISTS public.user_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0, -- percent of course completed
  access_status TEXT CHECK (access_status IN ('active', 'revoked', 'expired')) DEFAULT 'active' NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, course_id) -- Prevents duplicate enrollments for the same course
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Users can view their own enrollments
DROP POLICY IF EXISTS "Users can view own course enrollments" ON public.user_courses;
CREATE POLICY "Users can view own course enrollments" 
ON public.user_courses 
FOR SELECT 
USING (auth.uid() = user_id);

-- Admins can view and manage all enrollments
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON public.user_courses;
CREATE POLICY "Admins can manage all enrollments" 
ON public.user_courses 
FOR ALL 
USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- 4. Create an Automation (Trigger Function) to automatically enroll on payment approval
CREATE OR REPLACE FUNCTION public.enroll_user_on_payment_approval() 
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the payment was just approved and it is for a course
  IF NEW.status = 'approved' AND OLD.status != 'approved' AND NEW.package_type = 'course' AND NEW.course_id IS NOT NULL THEN
    
    -- Insert the user into the user_courses table
    INSERT INTO public.user_courses (user_id, course_id, access_status)
    VALUES (NEW.user_id, NEW.course_id, 'active')
    ON CONFLICT (user_id, course_id) DO NOTHING; -- Prevents error if they are already enrolled
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Attach the Trigger to the payment_requests table
DROP TRIGGER IF EXISTS trg_approve_payment_enroll_user ON public.payment_requests;
CREATE TRIGGER trg_approve_payment_enroll_user
  AFTER UPDATE OF status ON public.payment_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.enroll_user_on_payment_approval();

-- 6. Add an updated_at trigger for user_courses
DROP TRIGGER IF EXISTS update_user_courses_modtime ON public.user_courses;
CREATE TRIGGER update_user_courses_modtime
BEFORE UPDATE ON public.user_courses
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
