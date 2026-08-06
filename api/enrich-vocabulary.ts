import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

interface VocabularyWord {
  id: string;
  word: string;
  definition: string | null;
}

interface EnrichmentData {
  bangla_meaning: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  word_family: string[];
  example_sentence: string;
}

interface EnrichVocabularyRequest {
  batchSize?: number;
}

const ENRICHMENT_PROMPT = (words: VocabularyWord[]) => `
You are a vocabulary enrichment assistant for IELTS preparation. For each of the following English words, provide:
1. bangla_meaning: The Bengali/Bangla translation and meaning (include multiple meanings if applicable)
2. synonyms: ALL possible English synonyms - provide as many as you know (as an array). Include formal, informal, and academic synonyms.
3. antonyms: ALL possible English antonyms - provide as many as you know (as an array, empty if no clear antonyms exist)
4. collocations: ALL common word combinations/collocations you know (as an array)
5. word_family: ALL related words from the same family - noun, verb, adjective, adverb forms (as an array)
6. example_sentence: One clear example sentence using the word in an IELTS-appropriate context

Words to enrich: ${words.map(w => w.word).join(', ')}

IMPORTANT: For synonyms and antonyms, provide ALL that you know, not just a few. The more comprehensive, the better.

Respond with a JSON object where keys are the words and values contain the enrichment data.
Example format:
{
  "word1": {
    "bangla_meaning": "বাংলা অর্থ (একাধিক অর্থ থাকলে সব দিন)",
    "synonyms": ["syn1", "syn2", "syn3", "syn4", "syn5", "...all synonyms"],
    "antonyms": ["ant1", "ant2", "ant3", "...all antonyms"],
    "collocations": ["word1 + noun", "verb + word1", "...all collocations"],
    "word_family": ["word1 (noun)", "word1ly (adverb)", "...all forms"],
    "example_sentence": "Example sentence using word1."
  }
}

Only respond with valid JSON, no additional text.`;

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
          content: 'You are a vocabulary enrichment assistant. Always respond with valid JSON only, no markdown formatting.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 8000,
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

  if (!checkRateLimit(req, res, LIMITS.batch, 'enrich-vocabulary')) return;

  try {
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.error('Supabase credentials not configured');
      return res.status(500).json({ error: 'Supabase credentials not configured' });
    }

    const body = req.body as Partial<EnrichVocabularyRequest>;
    const batchSize = Math.min(body.batchSize || 15, 20);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Get counts
    const { count: totalCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });

    const { count: enrichedCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true })
      .eq('is_enriched', true);

    // Fetch unenriched words
    const { data: words, error: fetchError } = await supabase
      .from('vocabulary')
      .select('id, word, definition')
      .eq('is_enriched', false)
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
        message: 'All words are already enriched!',
        enriched: 0,
        totalWords: totalCount || 0,
        enrichedWords: enrichedCount || 0,
        remainingWords: 0,
        words: []
      });
    }

    console.log(`Enriching ${words.length} words: ${words.map(w => w.word).join(', ')}`);

    // Call OpenAI to enrich words
    const prompt = ENRICHMENT_PROMPT(words);
    const rawResponse = await callOpenAI(prompt);
    const cleanedResponse = cleanJsonResponse(rawResponse);

    let enrichmentData: Record<string, EnrichmentData>;
    try {
      enrichmentData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        rawResponse: cleanedResponse.substring(0, 500)
      });
    }

    // Update each word in the database
    const enrichedWords: string[] = [];
    const errors: string[] = [];

    for (const word of words) {
      const wordData = enrichmentData[word.word] || enrichmentData[word.word.toLowerCase()];
      
      if (wordData) {
        const { error: updateError } = await supabase
          .from('vocabulary')
          .update({
            bangla_meaning: wordData.bangla_meaning || '',
            synonyms: Array.isArray(wordData.synonyms) ? wordData.synonyms : [],
            antonyms: Array.isArray(wordData.antonyms) ? wordData.antonyms : [],
            collocations: Array.isArray(wordData.collocations) ? wordData.collocations : [],
            word_family: Array.isArray(wordData.word_family) ? wordData.word_family : [],
            example_sentence: wordData.example_sentence || '',
            is_enriched: true,
            enriched_at: new Date().toISOString(),
          })
          .eq('id', word.id);

        if (updateError) {
          errors.push(`${word.word}: ${updateError.message}`);
        } else {
          enrichedWords.push(word.word);
        }
      } else {
        errors.push(`${word.word}: No enrichment data received`);
      }
    }

    // Get updated counts
    const { count: newEnrichedCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true })
      .eq('is_enriched', true);

    const remaining = (totalCount || 0) - (newEnrichedCount || 0);

    return res.status(200).json({
      success: true,
      enriched: enrichedWords.length,
      totalWords: totalCount || 0,
      enrichedWords: newEnrichedCount || 0,
      remainingWords: remaining,
      words: enrichedWords,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Vocabulary Enrichment Error:', error);
    return res.status(500).json({ 
      error: 'Failed to enrich vocabulary',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

