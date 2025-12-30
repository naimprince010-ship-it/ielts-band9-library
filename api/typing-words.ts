import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.error('Supabase credentials not configured');
      return res.status(500).json({ error: 'Supabase credentials not configured' });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { count: totalCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });

    if (!totalCount || totalCount === 0) {
      return res.status(200).json({
        success: true,
        words: [],
        message: 'No vocabulary words available'
      });
    }

    const batchSize = 200;
    const maxOffset = Math.max(0, totalCount - batchSize);
    const randomOffset = Math.floor(Math.random() * (maxOffset + 1));

    const { data: wordsData, error: fetchError } = await supabase
      .from('vocabulary')
      .select('word')
      .range(randomOffset, randomOffset + batchSize - 1);

    if (fetchError) {
      console.error('Error fetching words:', fetchError);
      return res.status(500).json({ 
        error: 'Failed to fetch words',
        details: fetchError.message
      });
    }

    if (!wordsData || wordsData.length === 0) {
      return res.status(200).json({
        success: true,
        words: [],
        message: 'No vocabulary words available'
      });
    }

    const shuffledWords = shuffleArray(wordsData.map(w => w.word));
    const selectedWords = shuffledWords.slice(0, 50);

    return res.status(200).json({
      success: true,
      words: selectedWords,
      totalAvailable: totalCount
    });

  } catch (error) {
    console.error('Typing Words API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch typing words',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
