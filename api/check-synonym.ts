import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';

const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

interface CheckSynonymRequest {
  correctAnswer: string;
  userAnswer: string;
}

interface CheckSynonymResponse {
  isMatch: boolean;
  matchType: 'exact' | 'synonym' | 'none';
  matchedWord?: string;
}

/**
 * API endpoint to check if a user's answer matches the correct answer
 * either directly or via synonym lookup from the vocabulary database.
 * 
 * Flow:
 * 1. Direct check: userAnswer === correctAnswer
 * 2. Synonym lookup: Query vocabulary table for correctAnswer, check if userAnswer is in synonyms array
 * 3. Reverse lookup: Query vocabulary table for userAnswer, check if correctAnswer is in synonyms array
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!checkRateLimit(req, res, LIMITS.light, 'check-synonym')) return;

  try {
    const body = req.body as Partial<CheckSynonymRequest>;
    
    if (!body.correctAnswer || !body.userAnswer) {
      return res.status(400).json({ 
        error: 'Missing required fields: correctAnswer and userAnswer' 
      });
    }

    const correctAnswer = body.correctAnswer.trim().toLowerCase();
    const userAnswer = body.userAnswer.trim().toLowerCase();

    // Step 1: Direct match check
    if (userAnswer === correctAnswer) {
      return res.status(200).json({
        isMatch: true,
        matchType: 'exact',
        matchedWord: correctAnswer
      } as CheckSynonymResponse);
    }

    // If Supabase is not configured, return no match (fallback to direct comparison only)
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.warn('Supabase credentials not configured - synonym lookup disabled');
      return res.status(200).json({
        isMatch: false,
        matchType: 'none'
      } as CheckSynonymResponse);
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Step 2: Look up correctAnswer in vocabulary table and check if userAnswer is a synonym
    const { data: correctWordData, error: correctWordError } = await supabase
      .from('vocabulary')
      .select('word, synonyms')
      .ilike('word', correctAnswer)
      .limit(1)
      .single();

    if (!correctWordError && correctWordData?.synonyms) {
      const synonyms = correctWordData.synonyms as string[];
      const normalizedSynonyms = synonyms.map(s => s.toLowerCase().trim());
      
      if (normalizedSynonyms.includes(userAnswer)) {
        return res.status(200).json({
          isMatch: true,
          matchType: 'synonym',
          matchedWord: correctWordData.word
        } as CheckSynonymResponse);
      }
    }

    // Step 3: Reverse lookup - check if userAnswer is in vocabulary and correctAnswer is its synonym
    const { data: userWordData, error: userWordError } = await supabase
      .from('vocabulary')
      .select('word, synonyms')
      .ilike('word', userAnswer)
      .limit(1)
      .single();

    if (!userWordError && userWordData?.synonyms) {
      const synonyms = userWordData.synonyms as string[];
      const normalizedSynonyms = synonyms.map(s => s.toLowerCase().trim());
      
      if (normalizedSynonyms.includes(correctAnswer)) {
        return res.status(200).json({
          isMatch: true,
          matchType: 'synonym',
          matchedWord: userWordData.word
        } as CheckSynonymResponse);
      }
    }

    // Step 4: Check if userAnswer appears in ANY word's synonyms array that also contains correctAnswer
    // This handles cases where both words are synonyms of a common word
    const { data: relatedWords } = await supabase
      .from('vocabulary')
      .select('word, synonyms')
      .contains('synonyms', [correctAnswer]);

    if (relatedWords && relatedWords.length > 0) {
      for (const wordData of relatedWords) {
        const synonyms = wordData.synonyms as string[];
        const normalizedSynonyms = synonyms.map(s => s.toLowerCase().trim());
        
        if (normalizedSynonyms.includes(userAnswer)) {
          return res.status(200).json({
            isMatch: true,
            matchType: 'synonym',
            matchedWord: wordData.word
          } as CheckSynonymResponse);
        }
      }
    }

    // No match found
    return res.status(200).json({
      isMatch: false,
      matchType: 'none'
    } as CheckSynonymResponse);

  } catch (error) {
    console.error('Check Synonym Error:', error);
    return res.status(500).json({ 
      error: 'Failed to check synonym',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

