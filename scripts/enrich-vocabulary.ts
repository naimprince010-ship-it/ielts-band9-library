import { createClient, SupabaseClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

interface VocabularyWord {
  id: string;
  word: string;
  definition: string | null;
  part_of_speech: string | null;
  topic: string | null;
  difficulty_level: string | null;
  is_enriched: boolean;
}

interface EnrichmentData {
  bangla_meaning: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  word_family: string[];
  example_sentence: string;
}

const BATCH_SIZE = 15;
const DELAY_BETWEEN_BATCHES_MS = 3000;

function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OpenAI API key. Set OPENAI_API_KEY environment variable.');
  }

  return new OpenAI({ apiKey });
}

async function enrichWordsWithOpenAI(
  openai: OpenAI,
  words: VocabularyWord[]
): Promise<Map<string, EnrichmentData>> {
  const wordList = words.map((w) => w.word).join(', ');

  const prompt = `You are a vocabulary enrichment assistant for IELTS preparation. For each of the following English words, provide:
1. bangla_meaning: The Bengali/Bangla translation and meaning
2. synonyms: 3-5 English synonyms (as an array)
3. antonyms: 2-3 English antonyms if applicable (as an array, empty if no clear antonyms)
4. collocations: 3-5 common word combinations/collocations (as an array)
5. word_family: Related words from the same family - noun, verb, adjective, adverb forms (as an array)
6. example_sentence: One clear example sentence using the word in an IELTS-appropriate context

Words to enrich: ${wordList}

Respond with a JSON object where keys are the words and values contain the enrichment data.
Example format:
{
  "word1": {
    "bangla_meaning": "বাংলা অর্থ",
    "synonyms": ["syn1", "syn2", "syn3"],
    "antonyms": ["ant1", "ant2"],
    "collocations": ["word1 + noun", "verb + word1"],
    "word_family": ["word1 (noun)", "word1ly (adverb)"],
    "example_sentence": "Example sentence using word1."
  }
}

Only respond with valid JSON, no additional text.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a vocabulary enrichment assistant. Always respond with valid JSON only.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
  const enrichmentMap = new Map<string, EnrichmentData>();

  try {
    const parsed = JSON.parse(cleanedContent);
    for (const word of words) {
      const wordData = parsed[word.word] || parsed[word.word.toLowerCase()];
      if (wordData) {
        enrichmentMap.set(word.id, {
          bangla_meaning: wordData.bangla_meaning || '',
          synonyms: Array.isArray(wordData.synonyms) ? wordData.synonyms : [],
          antonyms: Array.isArray(wordData.antonyms) ? wordData.antonyms : [],
          collocations: Array.isArray(wordData.collocations) ? wordData.collocations : [],
          word_family: Array.isArray(wordData.word_family) ? wordData.word_family : [],
          example_sentence: wordData.example_sentence || '',
        });
      }
    }
  } catch (parseError) {
    console.error('Failed to parse OpenAI response:', parseError);
    console.error('Raw response:', cleanedContent);
    throw new Error('Failed to parse OpenAI response as JSON');
  }

  return enrichmentMap;
}

async function updateVocabularyInDatabase(
  supabase: SupabaseClient,
  wordId: string,
  enrichment: EnrichmentData
): Promise<void> {
  const { error } = await supabase
    .from('vocabulary')
    .update({
      bangla_meaning: enrichment.bangla_meaning,
      synonyms: enrichment.synonyms,
      antonyms: enrichment.antonyms,
      collocations: enrichment.collocations,
      word_family: enrichment.word_family,
      example_sentence: enrichment.example_sentence,
      is_enriched: true,
      enriched_at: new Date().toISOString(),
    })
    .eq('id', wordId);

  if (error) {
    throw new Error(`Failed to update word ${wordId}: ${error.message}`);
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUnenrichedWords(
  supabase: SupabaseClient,
  limit: number
): Promise<VocabularyWord[]> {
  const { data, error } = await supabase
    .from('vocabulary')
    .select('id, word, definition, part_of_speech, topic, difficulty_level, is_enriched')
    .eq('is_enriched', false)
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch words: ${error.message}`);
  }

  return data || [];
}

async function getTotalWordCount(supabase: SupabaseClient): Promise<{ total: number; enriched: number }> {
  const { count: total, error: totalError } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true });

  if (totalError) {
    throw new Error(`Failed to get total count: ${totalError.message}`);
  }

  const { count: enriched, error: enrichedError } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true })
    .eq('is_enriched', true);

  if (enrichedError) {
    throw new Error(`Failed to get enriched count: ${enrichedError.message}`);
  }

  return { total: total || 0, enriched: enriched || 0 };
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Enrichment Script');
  console.log('='.repeat(60));
  console.log(`Batch size: ${BATCH_SIZE} words`);
  console.log(`Delay between batches: ${DELAY_BETWEEN_BATCHES_MS}ms`);
  console.log('');

  const supabase = getSupabaseClient();
  const openai = getOpenAIClient();

  const { total, enriched } = await getTotalWordCount(supabase);
  console.log(`Total words in database: ${total}`);
  console.log(`Already enriched: ${enriched}`);
  console.log(`Remaining to enrich: ${total - enriched}`);
  console.log('');

  let processedCount = 0;
  let errorCount = 0;
  let batchNumber = 0;

  while (true) {
    const words = await fetchUnenrichedWords(supabase, BATCH_SIZE);

    if (words.length === 0) {
      console.log('\nNo more words to enrich. Process complete!');
      break;
    }

    batchNumber++;
    console.log(`\n--- Batch ${batchNumber} ---`);
    console.log(`Processing ${words.length} words: ${words.map((w) => w.word).join(', ')}`);

    try {
      const enrichmentMap = await enrichWordsWithOpenAI(openai, words);

      for (const word of words) {
        const enrichment = enrichmentMap.get(word.id);
        if (enrichment) {
          try {
            await updateVocabularyInDatabase(supabase, word.id, enrichment);
            processedCount++;
            console.log(`  [OK] ${word.word}`);
          } catch (updateError) {
            errorCount++;
            console.error(`  [ERROR] ${word.word}: ${updateError}`);
          }
        } else {
          errorCount++;
          console.error(`  [SKIP] ${word.word}: No enrichment data received`);
        }
      }
    } catch (batchError) {
      errorCount += words.length;
      console.error(`  [BATCH ERROR] ${batchError}`);
    }

    console.log(`Progress: ${processedCount} enriched, ${errorCount} errors`);

    if (words.length === BATCH_SIZE) {
      console.log(`Waiting ${DELAY_BETWEEN_BATCHES_MS}ms before next batch...`);
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('ENRICHMENT COMPLETE');
  console.log('='.repeat(60));
  console.log(`Total processed: ${processedCount}`);
  console.log(`Total errors: ${errorCount}`);

  const finalCounts = await getTotalWordCount(supabase);
  console.log(`Final enriched count: ${finalCounts.enriched}/${finalCounts.total}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
