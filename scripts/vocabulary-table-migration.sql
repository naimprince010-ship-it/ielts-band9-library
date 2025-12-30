-- SQL Migration: Add vocabulary table with enrichment columns
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Create vocabulary table for storing individual words with enrichment data
CREATE TABLE IF NOT EXISTS vocabulary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  word TEXT NOT NULL UNIQUE,
  definition TEXT,
  part_of_speech TEXT,
  topic TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  
  -- Enrichment columns (populated by OpenAI API)
  bangla_meaning TEXT,
  synonyms TEXT[],
  antonyms TEXT[],
  collocations TEXT[],
  word_family TEXT[],
  example_sentence TEXT,
  
  -- Metadata
  is_enriched BOOLEAN DEFAULT false,
  enriched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_vocabulary_word ON vocabulary(word);
CREATE INDEX IF NOT EXISTS idx_vocabulary_topic ON vocabulary(topic);
CREATE INDEX IF NOT EXISTS idx_vocabulary_is_enriched ON vocabulary(is_enriched);

-- Enable Row Level Security
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vocabulary (public read, admin write)
CREATE POLICY "Anyone can view vocabulary" ON vocabulary FOR SELECT USING (true);
CREATE POLICY "Admins can manage vocabulary" ON vocabulary FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_vocabulary_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS vocabulary_updated_at ON vocabulary;
CREATE TRIGGER vocabulary_updated_at
  BEFORE UPDATE ON vocabulary
  FOR EACH ROW
  EXECUTE FUNCTION update_vocabulary_updated_at();

-- Add columns to existing vocabulary table if it already exists (alternative migration)
-- Uncomment and run these if the table already exists:
/*
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS bangla_meaning TEXT;
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS synonyms TEXT[];
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS antonyms TEXT[];
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS collocations TEXT[];
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS word_family TEXT[];
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS example_sentence TEXT;
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS is_enriched BOOLEAN DEFAULT false;
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS enriched_at TIMESTAMP WITH TIME ZONE;
*/
