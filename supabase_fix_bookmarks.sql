-- 1. First, make sure the existing 'lessons' table has all the required columns
ALTER TABLE IF EXISTS lessons 
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS content JSONB;

-- 2. Just in case 'lessons' doesn't exist at all, we create it.
CREATE TABLE IF NOT EXISTS lessons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE NOT NULL,
    topic TEXT,
    type TEXT,
    level TEXT,
    is_premium BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    content JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Create the bookmarks table with a foreign key to lessons
CREATE TABLE IF NOT EXISTS bookmarks (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, lesson_id)
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- 5. Clean up old policies to avoid duplicates
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON lessons;
DROP POLICY IF EXISTS "Users can insert their own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can view their own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can delete their own bookmarks" ON bookmarks;

-- 6. Setup Security Policies
-- Everyone can read published lessons
CREATE POLICY "Lessons are viewable by everyone" 
    ON lessons FOR SELECT USING (is_published = true);

-- Users can only manage their own bookmarks
CREATE POLICY "Users can insert their own bookmarks" 
    ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own bookmarks" 
    ON bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" 
    ON bookmarks FOR DELETE USING (auth.uid() = user_id);
