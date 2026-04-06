-- SQL to create courses table and allow admin management
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor TEXT NOT NULL,
  next_batch TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  type TEXT CHECK (type IN ('live', 'recorded', 'hybrid')) DEFAULT 'live',
  features TEXT[] DEFAULT '{}',
  is_popular BOOLEAN DEFAULT false,
  accent_color TEXT DEFAULT 'indigo',
  bg_gradient TEXT DEFAULT 'from-blue-500 to-indigo-600',
  curriculum JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses (public read, admin write)
CREATE POLICY "Anyone can view courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Admins can manage courses" ON courses FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Insert initial courses data from src/data/courses.ts
INSERT INTO courses (id, title, description, instructor, next_batch, price, original_price, duration, level, type, features, is_popular, accent_color, bg_gradient, curriculum) VALUES
('ielts-masterclass', 'IELTS Band 8+ Masterclass', 'Our most comprehensive program covering all 4 modules (Reading, Writing, Listening, Speaking) with personal feedback.', 'Arefin Shovo', 'April 15, 2026', 5500, 8000, '3 Months', 'Any', 'live', ARRAY['24 Interactive Live Classes', 'Daily Practice Materials', 'Personalized Writing Feedback', '1-on-1 Speaking Mock Tests', 'Life-time Access to Recorded Classes'], true, 'indigo', 'from-blue-500 to-indigo-600', '[{"module": "Module 1: Speaking Mastery (6 Classes)", "lessons": ["Class 1: Part 1 Fluency & Confidence Building", "Class 2: Expanding Answers with Cohesive Devices", "Class 3: Part 2 Cue-Card Storytelling Method (Group A)", "Class 4: Part 2 Cue-Card Storytelling Method (Group B)", "Class 5: Part 3 Analytical & Abstract Question Handling", "Class 6: Pronunciation, Intonation & Final Speaking Mocks"]}, {"module": "Module 2: Writing Task 1 & 2 Excellence (8 Classes)", "lessons": ["Class 7: Task 1 Academic - Data Analysis & Report Writing", "Class 8: Task 1 General - Letter Writing Tone & Purpose", "Class 9: Task 2 Essay Structures (Agree/Disagree & Discussion)", "Class 10: Task 2 Essay Structures (Problem/Solution & Direct)", "Class 11: Cohesion & Coherence: Linking Ideas Like a Pro", "Class 12: Advanced Vocabulary & Collocations for Writing", "Class 13: Grammatical Range & Accuracy for Band 8+", "Class 14: Full Essay Live Review & Personal Feedback"]}, {"module": "Module 3: Reading Speed & Strategy (5 Classes)", "lessons": ["Class 15: Skimming & Scanning: The FOUNDATION", "Class 16: Solving True/False/Not Given & Yes/No/Not Given", "Class 17: Heading Matching & Summary Completion Secrets", "Class 18: Keyword Mapping & Eliminate Distractors", "Class 19: Full Passage Solve - Time Management Under Pressure"]}, {"module": "Module 4: Listening Precision (5 Classes)", "lessons": ["Class 20: Avoiding Common Traps (Names, Numbers, Spellings)", "Class 21: Section 1 & 2: Form & Note Completion Mastery", "Class 22: Section 3: Multiple Choice & Matching in Dialogues", "Class 23: Section 4: Academic Lecture Completion Techniques", "Class 24: Final Full Mock Listening & Strategy Wrap-up"]}]'::jsonb),
('writing-intensive', 'Writing Task 1 & 2 Intensive', 'Master Task 1 and Task 2 with advanced templates and weekly scoring. Focus on high-band grammar & vocabulary.', 'Sharmin Alam', 'April 10, 2026', 2500, 3500, '1 Month', 'Intermediate+', 'live', ARRAY['12 Special Writing Sessions', 'Band 8+ Grammar Templates', 'Daily Homework Tasks', 'Weekly Essay Feedback', 'IELTS Writing Handbook'], false, 'rose', 'from-rose-500 to-pink-600', '[]'::jsonb),
('speaking-club', 'IELTS Speaking Confidence Club', 'Overcome your speaking fear. Daily 30-minute practice sessions with peers and expert feedback.', 'James Rodger', 'Ongoing', 1500, 2000, '1 Month', 'Any', 'live', ARRAY['Daily 1-on-1 Practice', 'Cue-card Strategy Lessons', 'Pronunciation Workshops', 'Idioms and Phrasal Verbs', 'Weekly Speaking Mocks'], false, 'amber', 'from-amber-400 to-orange-500', '[]'::jsonb),
('reading-listening-suite', 'Rapid Reading & Listening Suite', 'Speed up your reading and sharpen your ears. Focused practice on tricky question types and keywords.', 'Sifat Hasan', 'Self-paced', 1200, 1800, 'Lifetime', 'Any', 'recorded', ARRAY['50+ High-quality Mock Tests', 'Strategy Video Explanations', 'Vocabulary for Reading', 'Keyword Mapping Techniques', 'Instant Result Tracking'], false, 'emerald', 'from-emerald-400 to-teal-600', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;
