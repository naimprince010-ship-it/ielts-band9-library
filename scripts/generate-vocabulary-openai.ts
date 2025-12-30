import { createClient, SupabaseClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

interface GeneratedWord {
  word: string;
  definition: string;
  part_of_speech: string;
  topic: string;
  difficulty_level: string;
}

const WORDS_PER_REQUEST = 50;
const DELAY_BETWEEN_REQUESTS_MS = 2000;

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

async function getExistingWords(supabase: SupabaseClient): Promise<Set<string>> {
  const existingWords = new Set<string>();
  let offset = 0;
  const limit = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('vocabulary')
      .select('word')
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Failed to fetch existing words: ${error.message}`);
    }

    if (!data || data.length === 0) {
      break;
    }

    for (const row of data) {
      existingWords.add(row.word.toLowerCase());
    }

    offset += limit;
  }

  return existingWords;
}

async function generateVocabularyWithOpenAI(
  openai: OpenAI,
  existingWords: Set<string>,
  topic: string,
  count: number
): Promise<GeneratedWord[]> {
  const existingWordsList = Array.from(existingWords).slice(0, 500).join(', ');

  const prompt = `You are an IELTS vocabulary expert. Generate ${count} advanced English vocabulary words suitable for IELTS Band 7-9 preparation.

Topic/Category: ${topic}

Requirements:
1. Words should be academically appropriate and commonly used in IELTS reading/writing
2. Include a mix of nouns, verbs, adjectives, and adverbs
3. Words should be at CEFR B2-C2 level (intermediate to advanced)
4. Provide clear, concise definitions
5. DO NOT include any of these words that already exist in our database: ${existingWordsList}...

For each word, provide:
- word: The English word (lowercase)
- definition: A clear, concise definition (1-2 sentences)
- part_of_speech: noun, verb, adjective, adverb, or phrase
- topic: The specific topic category (e.g., ${topic})
- difficulty_level: "intermediate", "advanced", or "expert"

Respond with a JSON array of objects. Only respond with valid JSON, no additional text.

Example format:
[
  {
    "word": "ameliorate",
    "definition": "To make something bad or unsatisfactory better; to improve conditions",
    "part_of_speech": "verb",
    "topic": "Academic Writing",
    "difficulty_level": "advanced"
  }
]`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are an IELTS vocabulary expert. Always respond with valid JSON arrays only.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();

  try {
    const parsed = JSON.parse(cleanedContent);
    if (!Array.isArray(parsed)) {
      throw new Error('Response is not an array');
    }

    // Filter out words that already exist
    const newWords = parsed.filter(
      (w: GeneratedWord) => !existingWords.has(w.word.toLowerCase())
    );

    return newWords;
  } catch (parseError) {
    console.error('Failed to parse OpenAI response:', parseError);
    console.error('Raw response:', cleanedContent.substring(0, 500));
    return [];
  }
}

async function insertWords(
  supabase: SupabaseClient,
  words: GeneratedWord[]
): Promise<number> {
  if (words.length === 0) return 0;

  const { error } = await supabase
    .from('vocabulary')
    .upsert(
      words.map((w) => ({
        word: w.word.toLowerCase(),
        definition: w.definition,
        part_of_speech: w.part_of_speech,
        topic: w.topic,
        difficulty_level: w.difficulty_level,
        is_enriched: false,
      })),
      { onConflict: 'word' }
    );

  if (error) {
    console.error('Error inserting words:', error.message);
    return 0;
  }

  return words.length;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getCurrentWordCount(supabase: SupabaseClient): Promise<number> {
  const { count, error } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Failed to get word count: ${error.message}`);
  }

  return count || 0;
}

const TOPICS = [
  'Academic Writing',
  'Scientific Research',
  'Business & Economics',
  'Technology & Innovation',
  'Environment & Sustainability',
  'Health & Medicine',
  'Education & Learning',
  'Social Issues',
  'Politics & Government',
  'Arts & Culture',
  'Psychology & Behavior',
  'Law & Justice',
  'Media & Communication',
  'Urban Development',
  'Philosophy & Ethics',
  'History & Civilization',
  'Sports & Recreation',
  'Travel & Tourism',
  'Food & Nutrition',
  'Architecture & Design',
];

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Generator (OpenAI)');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  const openai = getOpenAIClient();

  const TARGET_WORD_COUNT = 7000;
  let currentCount = await getCurrentWordCount(supabase);
  console.log(`Current word count: ${currentCount}`);
  console.log(`Target word count: ${TARGET_WORD_COUNT}`);
  console.log(`Words needed: ${TARGET_WORD_COUNT - currentCount}`);
  console.log('');

  if (currentCount >= TARGET_WORD_COUNT) {
    console.log('Target already reached! No more words needed.');
    return;
  }

  // Get existing words to avoid duplicates
  console.log('Fetching existing words to avoid duplicates...');
  const existingWords = await getExistingWords(supabase);
  console.log(`Found ${existingWords.size} existing words`);
  console.log('');

  let totalGenerated = 0;
  let topicIndex = 0;
  let requestCount = 0;

  while (currentCount < TARGET_WORD_COUNT) {
    const topic = TOPICS[topicIndex % TOPICS.length];
    const wordsNeeded = Math.min(WORDS_PER_REQUEST, TARGET_WORD_COUNT - currentCount);

    requestCount++;
    console.log(`\n--- Request ${requestCount} ---`);
    console.log(`Topic: ${topic}`);
    console.log(`Requesting ${wordsNeeded} words...`);

    try {
      const generatedWords = await generateVocabularyWithOpenAI(
        openai,
        existingWords,
        topic,
        wordsNeeded
      );

      if (generatedWords.length > 0) {
        const inserted = await insertWords(supabase, generatedWords);
        totalGenerated += inserted;

        // Add new words to existing set
        for (const word of generatedWords) {
          existingWords.add(word.word.toLowerCase());
        }

        console.log(`Generated: ${generatedWords.length} words`);
        console.log(`Inserted: ${inserted} words`);
        console.log(`Sample words: ${generatedWords.slice(0, 5).map((w) => w.word).join(', ')}`);
      } else {
        console.log('No new words generated in this request');
      }

      currentCount = await getCurrentWordCount(supabase);
      console.log(`Current total: ${currentCount}/${TARGET_WORD_COUNT}`);

    } catch (error) {
      console.error(`Error in request ${requestCount}:`, error);
    }

    topicIndex++;

    if (currentCount < TARGET_WORD_COUNT) {
      console.log(`Waiting ${DELAY_BETWEEN_REQUESTS_MS}ms before next request...`);
      await sleep(DELAY_BETWEEN_REQUESTS_MS);
    }

    // Safety limit to prevent infinite loops
    if (requestCount >= 100) {
      console.log('\nReached maximum request limit (100). Stopping.');
      break;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('GENERATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Total words generated: ${totalGenerated}`);
  console.log(`Final word count: ${currentCount}`);
  console.log(`Target: ${TARGET_WORD_COUNT}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
