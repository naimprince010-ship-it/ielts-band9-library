-- SQL to create tables for Progress Dashboard, Reading Practice, and Mock Test
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. User Activity Tracking Table
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  lessons_completed INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  minutes_studied INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 2. Reading Passages Table (Admin can manage these)
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

-- 3. Reading Questions Table
CREATE TABLE IF NOT EXISTS reading_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  passage_id UUID REFERENCES reading_passages(id) ON DELETE CASCADE,
  question_type TEXT CHECK (question_type IN ('multiple_choice', 'true_false', 'fill_blank', 'matching')) DEFAULT 'multiple_choice',
  question TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User Reading Attempts Table
CREATE TABLE IF NOT EXISTS reading_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  passage_id UUID REFERENCES reading_passages(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken INTEGER,
  answers JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Mock Test Results Table
CREATE TABLE IF NOT EXISTS mock_test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sections JSONB NOT NULL,
  total_score NUMERIC(3,1),
  band_estimate TEXT,
  time_taken INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

-- Enable Row Level Security
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_activity
CREATE POLICY "Users can view own activity" ON user_activity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity" ON user_activity FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own activity" ON user_activity FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for reading_passages (public read, admin write)
CREATE POLICY "Anyone can view published passages" ON reading_passages FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage passages" ON reading_passages FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for reading_questions
CREATE POLICY "Anyone can view questions for published passages" ON reading_questions FOR SELECT USING (
  EXISTS (SELECT 1 FROM reading_passages WHERE id = passage_id AND is_published = true)
);
CREATE POLICY "Admins can manage questions" ON reading_questions FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for reading_attempts
CREATE POLICY "Users can view own attempts" ON reading_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON reading_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for mock_test_results
CREATE POLICY "Users can view own results" ON mock_test_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own results" ON mock_test_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin can view all data
CREATE POLICY "Admins can view all activity" ON user_activity FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can view all attempts" ON reading_attempts FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can view all results" ON mock_test_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can view all achievements" ON user_achievements FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Insert sample reading passages (admin can add more later)
INSERT INTO reading_passages (title, content, difficulty, topic, time_limit, is_published) VALUES
(
  'The Impact of Technology on Education',
  'The integration of technology into education has transformed the way students learn and teachers instruct. Digital tools have made information more accessible than ever before, allowing students to access vast libraries of knowledge from their devices. Online learning platforms have emerged as powerful alternatives to traditional classroom settings, offering flexibility and personalized learning experiences.

However, this technological revolution in education comes with its challenges. The digital divide remains a significant concern, as not all students have equal access to technology and internet connectivity. Additionally, there are ongoing debates about screen time and its effects on young learners'' cognitive development and social skills.

Despite these challenges, educational technology continues to evolve. Artificial intelligence is being integrated into learning systems to provide adaptive learning experiences that cater to individual student needs. Virtual and augmented reality technologies are creating immersive learning environments that were previously impossible. These innovations suggest that the future of education will be increasingly intertwined with technological advancement.

The role of teachers is also evolving in this digital age. Rather than being the sole source of information, educators are becoming facilitators of learning, guiding students through the vast landscape of available resources. This shift requires new skills and approaches to pedagogy, emphasizing critical thinking and digital literacy alongside traditional academic subjects.',
  'medium',
  'Education',
  20,
  true
),
(
  'Climate Change and Global Food Security',
  'Climate change poses one of the most significant threats to global food security in the 21st century. Rising temperatures, changing precipitation patterns, and increased frequency of extreme weather events are already affecting agricultural productivity worldwide. Scientists predict that these impacts will intensify in the coming decades, potentially threatening the food supply for billions of people.

The agricultural sector is particularly vulnerable to climate variability. Crops have specific temperature and water requirements, and even small changes in climate conditions can significantly affect yields. Heat waves can damage crops during critical growth stages, while droughts reduce water availability for irrigation. Conversely, excessive rainfall can lead to flooding and soil erosion, destroying crops and degrading farmland.

Developing countries face the greatest risks from climate-related food insecurity. Many of these nations rely heavily on rain-fed agriculture and lack the resources to implement adaptive measures. Small-scale farmers, who produce a significant portion of the world''s food, are especially vulnerable as they often lack access to climate information, improved seeds, and financial resources to cope with crop failures.

Addressing these challenges requires a multi-faceted approach. Agricultural practices must adapt to changing conditions through the development of drought-resistant crop varieties, improved irrigation systems, and sustainable farming techniques. International cooperation is essential to support vulnerable communities and ensure that climate adaptation measures reach those who need them most.',
  'hard',
  'Environment',
  25,
  true
),
(
  'The Psychology of Decision Making',
  'Every day, humans make thousands of decisions, from simple choices like what to eat for breakfast to complex ones involving career changes or financial investments. Understanding how we make decisions has been a central focus of psychological research for decades.

Traditional economic theory assumed that humans are rational decision-makers who carefully weigh costs and benefits before choosing. However, behavioral economists and psychologists have demonstrated that human decision-making is often influenced by cognitive biases and emotional factors that lead to seemingly irrational choices.

One of the most well-known cognitive biases is confirmation bias, the tendency to seek out information that confirms our existing beliefs while ignoring contradictory evidence. This bias affects everything from political opinions to medical diagnoses and can lead to poor decision-making in both personal and professional contexts.

Another important concept is loss aversion, discovered by psychologists Daniel Kahneman and Amos Tversky. Their research showed that people feel the pain of losing something more intensely than the pleasure of gaining something of equal value. This explains why people often make conservative choices to avoid potential losses, even when taking risks might lead to better outcomes.

The environment in which decisions are made also plays a crucial role. Research has shown that factors such as time pressure, stress, and information overload can significantly impair decision quality. Conversely, creating structured decision-making processes and allowing adequate time for reflection can improve outcomes.',
  'easy',
  'Psychology',
  15,
  true
);

-- Insert sample questions for each passage
-- Questions for "The Impact of Technology on Education"
INSERT INTO reading_questions (passage_id, question_type, question, options, correct_answer, explanation, order_index)
SELECT id, 'multiple_choice', 
  'What is described as a significant concern regarding technology in education?',
  '["Equal access to technology", "The digital divide", "Too many online platforms", "Teacher resistance"]'::jsonb,
  'The digital divide',
  'The passage mentions that "The digital divide remains a significant concern, as not all students have equal access to technology and internet connectivity."',
  1
FROM reading_passages WHERE title = 'The Impact of Technology on Education';

INSERT INTO reading_questions (passage_id, question_type, question, options, correct_answer, explanation, order_index)
SELECT id, 'multiple_choice',
  'According to the passage, how is the role of teachers changing?',
  '["They are becoming less important", "They are becoming facilitators of learning", "They are focusing only on technology", "They are leaving the profession"]'::jsonb,
  'They are becoming facilitators of learning',
  'The passage states that "educators are becoming facilitators of learning, guiding students through the vast landscape of available resources."',
  2
FROM reading_passages WHERE title = 'The Impact of Technology on Education';

INSERT INTO reading_questions (passage_id, question_type, question, options, correct_answer, explanation, order_index)
SELECT id, 'true_false',
  'Artificial intelligence is being used to provide personalized learning experiences.',
  '["True", "False", "Not Given"]'::jsonb,
  'True',
  'The passage mentions that "Artificial intelligence is being integrated into learning systems to provide adaptive learning experiences that cater to individual student needs."',
  3
FROM reading_passages WHERE title = 'The Impact of Technology on Education';

-- Questions for "Climate Change and Global Food Security"
INSERT INTO reading_questions (passage_id, question_type, question, options, correct_answer, explanation, order_index)
SELECT id, 'multiple_choice',
  'Which group is described as most vulnerable to climate-related food insecurity?',
  '["Developed countries", "Large corporations", "Small-scale farmers in developing countries", "Urban populations"]'::jsonb,
  'Small-scale farmers in developing countries',
  'The passage states that developing countries and small-scale farmers face the greatest risks.',
  1
FROM reading_passages WHERE title = 'Climate Change and Global Food Security';

INSERT INTO reading_questions (passage_id, question_type, question, options, correct_answer, explanation, order_index)
SELECT id, 'multiple_choice',
  'What approach does the passage suggest for addressing food security challenges?',
  '["Focus only on technology", "A multi-faceted approach", "Reduce farming activities", "Ignore climate change"]'::jsonb,
  'A multi-faceted approach',
  'The passage explicitly states that "Addressing these challenges requires a multi-faceted approach."',
  2
FROM reading_passages WHERE title = 'Climate Change and Global Food Security';

-- Questions for "The Psychology of Decision Making"
INSERT INTO reading_questions (passage_id, question_type, question, options, correct_answer, explanation, order_index)
SELECT id, 'multiple_choice',
  'What did traditional economic theory assume about human decision-making?',
  '["Humans are emotional decision-makers", "Humans are rational decision-makers", "Humans cannot make decisions", "Humans always make poor decisions"]'::jsonb,
  'Humans are rational decision-makers',
  'The passage states that "Traditional economic theory assumed that humans are rational decision-makers who carefully weigh costs and benefits before choosing."',
  1
FROM reading_passages WHERE title = 'The Psychology of Decision Making';

INSERT INTO reading_questions (passage_id, question_type, question, options, correct_answer, explanation, order_index)
SELECT id, 'multiple_choice',
  'What is confirmation bias?',
  '["Seeking information that confirms existing beliefs", "Making quick decisions", "Avoiding all decisions", "Trusting experts completely"]'::jsonb,
  'Seeking information that confirms existing beliefs',
  'The passage defines confirmation bias as "the tendency to seek out information that confirms our existing beliefs while ignoring contradictory evidence."',
  2
FROM reading_passages WHERE title = 'The Psychology of Decision Making';

INSERT INTO reading_questions (passage_id, question_type, question, options, correct_answer, explanation, order_index)
SELECT id, 'multiple_choice',
  'Who discovered the concept of loss aversion?',
  '["Albert Einstein", "Daniel Kahneman and Amos Tversky", "Sigmund Freud", "Charles Darwin"]'::jsonb,
  'Daniel Kahneman and Amos Tversky',
  'The passage mentions that loss aversion was "discovered by psychologists Daniel Kahneman and Amos Tversky."',
  3
FROM reading_passages WHERE title = 'The Psychology of Decision Making';

-- =====================================================
-- DAILY STUDY PLAN & STREAK TABLES
-- =====================================================

-- 7. Daily Plans Table (one plan per user per day)
CREATE TABLE IF NOT EXISTS daily_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_date DATE NOT NULL,
  status TEXT CHECK (status IN ('active', 'completed', 'skipped')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, plan_date)
);

-- 8. Daily Plan Items Table
CREATE TABLE IF NOT EXISTS daily_plan_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID REFERENCES daily_plans(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('vocab_review', 'grammar_exercise', 'reading', 'speaking', 'writing', 'quiz')) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target JSONB,
  recommended_minutes INTEGER DEFAULT 5,
  completed_at TIMESTAMP WITH TIME ZONE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. User Streaks Table
CREATE TABLE IF NOT EXISTS user_streaks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_completed_date DATE,
  total_days_studied INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE daily_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for daily_plans
CREATE POLICY "Users can view own plans" ON daily_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans" ON daily_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plans" ON daily_plans FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for daily_plan_items
CREATE POLICY "Users can view own plan items" ON daily_plan_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM daily_plans WHERE id = plan_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert own plan items" ON daily_plan_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM daily_plans WHERE id = plan_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own plan items" ON daily_plan_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM daily_plans WHERE id = plan_id AND user_id = auth.uid())
);

-- RLS Policies for user_streaks
CREATE POLICY "Users can view own streaks" ON user_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON user_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON user_streaks FOR UPDATE USING (auth.uid() = user_id);

-- Admin policies for new tables
CREATE POLICY "Admins can view all plans" ON daily_plans FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can view all plan items" ON daily_plan_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can view all streaks" ON user_streaks FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- =====================================================
-- SPACED REPETITION SYSTEM (SRS) TABLES
-- =====================================================

-- 10. SRS Items Table (tracks each item's SRS state)
CREATE TABLE IF NOT EXISTS srs_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('vocab', 'grammar', 'quiz_mistake', 'custom')),
  content_id TEXT NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  hint TEXT,
  category TEXT,
  level INTEGER DEFAULT 0 CHECK (level >= 0 AND level <= 5),
  due_date DATE NOT NULL DEFAULT CURRENT_DATE,
  ease_factor NUMERIC(3,2) DEFAULT 2.50,
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  suspended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_type, content_id)
);

-- 11. SRS Reviews Table (tracks review history)
CREATE TABLE IF NOT EXISTS srs_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  srs_item_id UUID REFERENCES srs_items(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  quality INTEGER CHECK (quality >= 0 AND quality <= 5),
  prev_level INTEGER,
  next_level INTEGER,
  prev_interval INTEGER,
  next_interval INTEGER
);

-- Enable RLS for SRS tables
ALTER TABLE srs_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE srs_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for srs_items
CREATE POLICY "Users can view own SRS items" ON srs_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own SRS items" ON srs_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own SRS items" ON srs_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own SRS items" ON srs_items FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for srs_reviews
CREATE POLICY "Users can view own SRS reviews" ON srs_reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own SRS reviews" ON srs_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies for SRS tables
CREATE POLICY "Admins can view all SRS items" ON srs_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can view all SRS reviews" ON srs_reviews FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Index for efficient due card queries
CREATE INDEX IF NOT EXISTS idx_srs_items_due ON srs_items(user_id, due_date) WHERE suspended = false;
