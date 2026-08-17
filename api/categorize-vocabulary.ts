import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { requireStaff } from './_staffAuth.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

type FunctionalCategory = 'OPINION' | 'EMOTION' | 'TRANSACTIONAL' | 'SOCIAL' | 'DESCRIPTIVE' | 'ACADEMIC';

interface VocabularyWord {
  id: string;
  word: string;
  definition: string | null;
  part_of_speech: string | null;
}

interface CategorizeRequest {
  batchSize?: number;
}

const CATEGORIZATION_PROMPT = (words: VocabularyWord[]) => `
You are a vocabulary categorization assistant for IELTS Speaking preparation. Categorize each word into ONE of these functional categories:

1. OPINION - Words used to express views, arguments, beliefs (e.g., argue, believe, agree, disagree, consider, maintain, assert)
2. EMOTION - Words expressing feelings or emotional states (e.g., happy, sad, furious, anxious, delighted, frustrated)
3. TRANSACTIONAL - Words related to transactions, commerce, exchanges (e.g., buy, cost, borrow, lend, purchase, afford)
4. SOCIAL - Words for social interactions (e.g., greet, apologize, thank, introduce, congratulate, invite)
5. DESCRIPTIVE - Words that describe qualities, characteristics, manner (e.g., beautiful, large, quickly, enormous, gradually)
6. ACADEMIC - Words commonly used in academic/formal writing (e.g., analyze, hypothesize, evaluate, synthesize, demonstrate)

Words to categorize:
${words.map(w => `- "${w.word}" (${w.part_of_speech || 'unknown'}): ${w.definition || 'no definition'}`).join('\n')}

IMPORTANT RULES:
- Each word must be assigned exactly ONE category
- Choose the MOST appropriate category based on primary usage
- For words with multiple uses, choose based on IELTS Speaking context
- Verbs expressing opinions go to OPINION
- Adjectives describing emotions go to EMOTION
- Adjectives/adverbs describing things go to DESCRIPTIVE
- Formal/academic verbs go to ACADEMIC

Respond with a JSON object where keys are the words and values are the category.
Example format:
{
  "argue": "OPINION",
  "happy": "EMOTION",
  "purchase": "TRANSACTIONAL",
  "apologize": "SOCIAL",
  "beautiful": "DESCRIPTIVE",
  "analyze": "ACADEMIC"
}

Only respond with valid JSON, no additional text.`;

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 8000,
        }
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Gemini API Error:', errorData);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
    throw new Error('Invalid response from Gemini API');
  }
  
  return data.candidates[0].content.parts[0].text;
}

function cleanJsonResponse(response: string): string {
  let cleaned = response.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

function isValidCategory(category: string): category is FunctionalCategory {
  return ['OPINION', 'EMOTION', 'TRANSACTIONAL', 'SOCIAL', 'DESCRIPTIVE', 'ACADEMIC'].includes(category);
}

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

  if (!(await requireStaff(req, res))) return;

  if (!checkRateLimit(req, res, LIMITS.batch, 'categorize-vocabulary')) return;

  try {
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return res.status(500).json({ error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.' });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.error('Supabase credentials not configured');
      return res.status(500).json({ error: 'Supabase credentials not configured' });
    }

    const body = req.body as Partial<CategorizeRequest>;
    const batchSize = Math.min(body.batchSize || 30, 50);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Get counts
    const { count: totalCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });

    const { count: categorizedCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true })
      .not('functional_category', 'is', null);

    // Fetch uncategorized words
    const { data: words, error: fetchError } = await supabase
      .from('vocabulary')
      .select('id, word, definition, part_of_speech')
      .is('functional_category', null)
      .limit(batchSize);

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return res.status(500).json({ 
        error: 'Failed to fetch words from database',
        details: fetchError.message
      });
    }

    if (!words || words.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'All words are already categorized!',
        categorized: 0,
        totalWords: totalCount || 0,
        categorizedWords: categorizedCount || 0,
        remainingWords: 0,
        words: [],
        categoryCounts: await getCategoryCounts(supabase)
      });
    }

    console.log(`Categorizing ${words.length} words: ${words.map(w => w.word).join(', ')}`);

    // Call Gemini to categorize words
    const prompt = CATEGORIZATION_PROMPT(words);
    const rawResponse = await callGemini(prompt);
    const cleanedResponse = cleanJsonResponse(rawResponse);

    let categorizationData: Record<string, string>;
    try {
      categorizationData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        rawResponse: cleanedResponse.substring(0, 500)
      });
    }

    // Update each word in the database
    const categorizedWords: Array<{ word: string; category: string }> = [];
    const errors: string[] = [];

    for (const word of words) {
      const category = categorizationData[word.word] || categorizationData[word.word.toLowerCase()];
      
      if (category && isValidCategory(category)) {
        const { error: updateError } = await supabase
          .from('vocabulary')
          .update({
            functional_category: category,
          })
          .eq('id', word.id);

        if (updateError) {
          errors.push(`${word.word}: ${updateError.message}`);
        } else {
          categorizedWords.push({ word: word.word, category });
        }
      } else {
        errors.push(`${word.word}: Invalid or missing category "${category}"`);
      }
    }

    // Get updated counts
    const { count: newCategorizedCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true })
      .not('functional_category', 'is', null);

    const remaining = (totalCount || 0) - (newCategorizedCount || 0);

    return res.status(200).json({
      success: true,
      categorized: categorizedWords.length,
      totalWords: totalCount || 0,
      categorizedWords: newCategorizedCount || 0,
      remainingWords: remaining,
      words: categorizedWords,
      categoryCounts: await getCategoryCounts(supabase),
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Vocabulary Categorization Error:', error);
    return res.status(500).json({ 
      error: 'Failed to categorize vocabulary',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function getCategoryCounts(supabase: any) {
  const categories = ['OPINION', 'EMOTION', 'TRANSACTIONAL', 'SOCIAL', 'DESCRIPTIVE', 'ACADEMIC'];
  const counts: Record<string, number> = {};

  for (const category of categories) {
    const { count } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true })
      .eq('functional_category', category);
    counts[category] = count || 0;
  }

  return counts;
}

