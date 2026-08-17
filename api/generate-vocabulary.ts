import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { requireStaff } from './_staffAuth.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

interface GeneratedWord {
  word: string;
  definition: string;
  part_of_speech: string;
  topic: string;
  difficulty_level: string;
}

interface GenerateVocabularyRequest {
  topic: string;
  count: number;
  difficulty?: 'intermediate' | 'advanced' | 'expert';
}

const VOCABULARY_PROMPT = (topic: string, count: number, difficulty: string, existingWords: string[]) => `
You are an IELTS vocabulary expert. Generate ${count} advanced English vocabulary words suitable for IELTS Band 7-9 preparation.

Topic/Category: ${topic}
Difficulty Level: ${difficulty}

Requirements:
1. Words should be academically appropriate and commonly used in IELTS reading/writing
2. Include a mix of nouns, verbs, adjectives, and adverbs
3. Words should be at CEFR B2-C2 level (intermediate to advanced)
4. Provide clear, concise definitions
5. DO NOT include any of these words that already exist: ${existingWords.slice(0, 200).join(', ')}

For each word, provide:
- word: The English word (lowercase, single word or common phrase)
- definition: A clear, concise definition (1-2 sentences)
- part_of_speech: noun, verb, adjective, adverb, or phrase
- topic: "${topic}"
- difficulty_level: "${difficulty}"

Respond with a JSON array of objects. Only respond with valid JSON, no additional text.

Example format:
[
  {
    "word": "ameliorate",
    "definition": "To make something bad or unsatisfactory better; to improve conditions",
    "part_of_speech": "verb",
    "topic": "${topic}",
    "difficulty_level": "${difficulty}"
  }
]
`;

async function callOpenAI(prompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an IELTS vocabulary expert. Always respond with valid JSON arrays only, no markdown formatting or explanations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('OpenAI API Error:', errorData);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
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

  if (!checkRateLimit(req, res, LIMITS.medium, 'generate-vocabulary')) return;

  try {
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.error('Supabase credentials not configured');
      return res.status(500).json({ error: 'Supabase credentials not configured' });
    }

    const body = req.body as Partial<GenerateVocabularyRequest>;
    const topic = body.topic || 'Academic Writing';
    const count = Math.min(body.count || 50, 100);
    const difficulty = body.difficulty || 'advanced';

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: existingData } = await supabase
      .from('vocabulary')
      .select('word')
      .limit(500);

    const existingWords = existingData?.map(w => w.word.toLowerCase()) || [];

    console.log(`Generating ${count} vocabulary words for topic: ${topic}`);

    const prompt = VOCABULARY_PROMPT(topic, count, difficulty, existingWords);
    const rawResponse = await callOpenAI(prompt);
    const cleanedResponse = cleanJsonResponse(rawResponse);

    let generatedWords: GeneratedWord[];
    try {
      generatedWords = JSON.parse(cleanedResponse);
      if (!Array.isArray(generatedWords)) {
        throw new Error('Response is not an array');
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        rawResponse: cleanedResponse.substring(0, 500)
      });
    }

    const newWords = generatedWords.filter(
      w => !existingWords.includes(w.word.toLowerCase())
    );

    if (newWords.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No new unique words generated',
        generated: 0,
        inserted: 0,
        words: []
      });
    }

    const { error: insertError } = await supabase
      .from('vocabulary')
      .upsert(
        newWords.map(w => ({
          word: w.word.toLowerCase(),
          definition: w.definition,
          part_of_speech: w.part_of_speech,
          topic: w.topic,
          difficulty_level: w.difficulty_level,
          is_enriched: false,
        })),
        { onConflict: 'word' }
      );

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ 
        error: 'Failed to insert words into database',
        details: insertError.message
      });
    }

    const { count: totalCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });

    return res.status(200).json({
      success: true,
      generated: generatedWords.length,
      inserted: newWords.length,
      totalWords: totalCount,
      words: newWords.map(w => ({
        word: w.word,
        definition: w.definition,
        part_of_speech: w.part_of_speech
      }))
    });

  } catch (error) {
    console.error('Vocabulary Generation Error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate vocabulary',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

