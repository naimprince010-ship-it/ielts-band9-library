-- Add functional_category column to vocabulary table
-- This column categorizes words for Speaking Module filtering

-- Add the functional_category column
ALTER TABLE vocabulary 
ADD COLUMN IF NOT EXISTS functional_category TEXT;

-- Add a check constraint for valid categories
ALTER TABLE vocabulary 
ADD CONSTRAINT valid_functional_category 
CHECK (functional_category IS NULL OR functional_category IN (
  'OPINION',
  'EMOTION', 
  'TRANSACTIONAL',
  'SOCIAL',
  'DESCRIPTIVE',
  'ACADEMIC'
));

-- Create an index for faster filtering by category
CREATE INDEX IF NOT EXISTS idx_vocabulary_functional_category 
ON vocabulary(functional_category);

-- Comment on the column for documentation
COMMENT ON COLUMN vocabulary.functional_category IS 'Functional category for Speaking Module: OPINION, EMOTION, TRANSACTIONAL, SOCIAL, DESCRIPTIVE, ACADEMIC';
