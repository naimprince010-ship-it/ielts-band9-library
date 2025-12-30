import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface FetchVocabularyRequest {
  topic?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  limit?: number;
  offset?: number;
  enrichedOnly?: boolean;
  random?: boolean;
}

interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  part_of_speech: string;
  topic: string;
  difficulty_level: string;
  bangla_meaning?: string;
  synonyms?: string[];
  antonyms?: string[];
  collocations?: string[];
  word_family?: string[];
  example_sentence?: string;
  is_enriched: boolean;
}

interface FetchVocabularyResponse {
  success: boolean;
  words: VocabularyWord[];
  total: number;
  topics: string[];
}

/**
 * API endpoint to fetch vocabulary words from the database with optional filters.
 * Used by the Mock Test Management to generate vocabulary-based questions.
 * 
 * Query Parameters:
 * - topic: Filter by topic (e.g., "Education", "Environment")
 * - difficulty: Filter by difficulty level ("beginner", "intermediate", "advanced")
 * - limit: Number of words to return (default: 50, max: 200)
 * - offset: Pagination offset (default: 0)
 * - enrichedOnly: Only return words that have been enriched with synonyms, etc. (default: false)
 * - random: Return random words instead of ordered (default: false)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ 
      error: 'Supabase credentials not configured',
      success: false 
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    // Get parameters from query string (GET) or body (POST)
    const params: FetchVocabularyRequest = req.method === 'GET' 
      ? {
          topic: req.query.topic as string,
          difficulty: req.query.difficulty as 'beginner' | 'intermediate' | 'advanced',
          limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
          offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
          enrichedOnly: req.query.enrichedOnly === 'true',
          random: req.query.random === 'true'
        }
      : req.body as FetchVocabularyRequest;

    const limit = Math.min(params.limit || 50, 200);
    const offset = params.offset || 0;

    // First, get all unique topics for the filter dropdown
    const { data: topicsData } = await supabase
      .from('vocabulary')
      .select('topic')
      .not('topic', 'is', null);

    const uniqueTopics = [...new Set((topicsData || []).map(t => t.topic).filter(Boolean))];

    // Build the main query
    let query = supabase
      .from('vocabulary')
      .select('*', { count: 'exact' });

    // Apply filters
    if (params.topic) {
      query = query.ilike('topic', `%${params.topic}%`);
    }

    if (params.difficulty) {
      query = query.eq('difficulty_level', params.difficulty);
    }

    if (params.enrichedOnly) {
      query = query.eq('is_enriched', true);
    }

    // Get total count before pagination
    const { count: totalCount } = await query;

    // Apply ordering and pagination
    if (params.random) {
      // For random selection, we'll fetch more and shuffle
      const { data: allWords, error: fetchError } = await query
        .limit(Math.min(limit * 3, 500));

      if (fetchError) throw fetchError;

      // Shuffle and take the requested limit
      const shuffled = (allWords || []).sort(() => Math.random() - 0.5);
      const words = shuffled.slice(0, limit);

      return res.status(200).json({
        success: true,
        words,
        total: totalCount || 0,
        topics: uniqueTopics
      } as FetchVocabularyResponse);
    } else {
      // Regular ordered query with pagination
      const { data: words, error: fetchError } = await query
        .order('word', { ascending: true })
        .range(offset, offset + limit - 1);

      if (fetchError) throw fetchError;

      return res.status(200).json({
        success: true,
        words: words || [],
        total: totalCount || 0,
        topics: uniqueTopics
      } as FetchVocabularyResponse);
    }

  } catch (error) {
    console.error('Fetch Vocabulary Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch vocabulary',
      details: error instanceof Error ? error.message : 'Unknown error',
      success: false
    });
  }
}
