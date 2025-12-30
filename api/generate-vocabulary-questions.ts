import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  part_of_speech: string;
  topic: string;
  difficulty_level: string;
  bangla_meaning?: string;
  synonyms?: string[];
  example_sentence?: string;
}

interface GenerateQuestionsRequest {
  wordIds?: string[];
  topic?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  count?: number;
  questionTypes?: ('fill-blank' | 'definition-match' | 'synonym-match')[];
}

interface GeneratedQuestion {
  id: string;
  type: 'fill-blank' | 'definition-match' | 'synonym-match';
  questionText: string;
  correctAnswer: string;
  acceptedAnswers: string[];
  options?: string[];
  hint?: string;
  explanation?: string;
  vocabularyWordId: string;
  vocabularyWord: string;
}

/**
 * API endpoint to generate fill-in-the-blank and other vocabulary-based questions.
 * Uses vocabulary words from the database and optionally AI to create natural sentences.
 * 
 * Request Body:
 * - wordIds: Array of specific vocabulary word IDs to use
 * - topic: Filter words by topic if wordIds not provided
 * - difficulty: Filter words by difficulty if wordIds not provided
 * - count: Number of questions to generate (default: 10, max: 50)
 * - questionTypes: Types of questions to generate (default: ['fill-blank'])
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

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ 
      error: 'Supabase credentials not configured',
      success: false 
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const body = req.body as GenerateQuestionsRequest;
    
    const count = Math.min(body.count || 10, 50);
    const questionTypes = body.questionTypes || ['fill-blank'];

    let words: VocabularyWord[] = [];

    if (body.wordIds && body.wordIds.length > 0) {
      // Fetch specific words by IDs
      const { data, error } = await supabase
        .from('vocabulary')
        .select('*')
        .in('id', body.wordIds);

      if (error) throw error;
      words = data || [];
    } else {
      // Fetch random words based on filters
      let query = supabase
        .from('vocabulary')
        .select('*')
        .not('definition', 'is', null);

      if (body.topic) {
        query = query.ilike('topic', `%${body.topic}%`);
      }

      if (body.difficulty) {
        query = query.eq('difficulty_level', body.difficulty);
      }

      // Fetch more words than needed for randomization
      const { data, error } = await query.limit(count * 3);

      if (error) throw error;

      // Shuffle and take the requested count
      words = (data || []).sort(() => Math.random() - 0.5).slice(0, count);
    }

    if (words.length === 0) {
      return res.status(200).json({
        success: true,
        questions: [],
        message: 'No vocabulary words found matching the criteria'
      });
    }

    // Generate questions from the words
    const questions: GeneratedQuestion[] = [];

    for (const word of words) {
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      if (questionType === 'fill-blank') {
        const question = await generateFillBlankQuestion(word, words, OPENAI_API_KEY);
        if (question) questions.push(question);
      } else if (questionType === 'definition-match') {
        const question = generateDefinitionMatchQuestion(word, words);
        if (question) questions.push(question);
      } else if (questionType === 'synonym-match') {
        const question = generateSynonymMatchQuestion(word, words);
        if (question) questions.push(question);
      }
    }

    return res.status(200).json({
      success: true,
      questions,
      totalWords: words.length,
      generatedCount: questions.length
    });

  } catch (error) {
    console.error('Generate Vocabulary Questions Error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate questions',
      details: error instanceof Error ? error.message : 'Unknown error',
      success: false
    });
  }
}

/**
 * Generate a fill-in-the-blank question using the vocabulary word.
 * Uses the example sentence if available, otherwise creates one using AI or template.
 */
async function generateFillBlankQuestion(
  word: VocabularyWord, 
  allWords: VocabularyWord[],
  openaiKey?: string
): Promise<GeneratedQuestion | null> {
  const questionId = `vocab-q-${word.id}-${Date.now()}`;
  
  // Build accepted answers including synonyms
  const acceptedAnswers = [word.word.toLowerCase()];
  if (word.synonyms && word.synonyms.length > 0) {
    acceptedAnswers.push(...word.synonyms.map(s => s.toLowerCase()));
  }

  // If we have an example sentence, use it
  if (word.example_sentence) {
    const sentence = word.example_sentence;
    // Replace the word with a blank (case-insensitive)
    const regex = new RegExp(`\\b${word.word}\\b`, 'gi');
    const questionText = sentence.replace(regex, '_____');
    
    // Only use if the word was actually in the sentence
    if (questionText !== sentence) {
      return {
        id: questionId,
        type: 'fill-blank',
        questionText,
        correctAnswer: word.word,
        acceptedAnswers,
        hint: word.bangla_meaning || word.definition,
        explanation: `The correct answer is "${word.word}". ${word.definition}`,
        vocabularyWordId: word.id,
        vocabularyWord: word.word
      };
    }
  }

  // Try to generate a sentence using AI if available
  if (openaiKey) {
    try {
      const generatedSentence = await generateSentenceWithAI(word, openaiKey);
      if (generatedSentence) {
        return {
          id: questionId,
          type: 'fill-blank',
          questionText: generatedSentence.replace(new RegExp(`\\b${word.word}\\b`, 'gi'), '_____'),
          correctAnswer: word.word,
          acceptedAnswers,
          hint: word.bangla_meaning || word.definition,
          explanation: `The correct answer is "${word.word}". ${word.definition}`,
          vocabularyWordId: word.id,
          vocabularyWord: word.word
        };
      }
    } catch (error) {
      console.error('AI sentence generation failed:', error);
    }
  }

  // Fallback: Use definition-based template
  const templates = [
    `The word that means "${word.definition}" is _____.`,
    `Complete the sentence: A word meaning "${word.definition}" is _____.`,
    `Fill in the blank with the correct word (${word.part_of_speech}): _____ - ${word.definition}`,
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];

  return {
    id: questionId,
    type: 'fill-blank',
    questionText: template,
    correctAnswer: word.word,
    acceptedAnswers,
    hint: word.bangla_meaning,
    explanation: `The correct answer is "${word.word}".`,
    vocabularyWordId: word.id,
    vocabularyWord: word.word
  };
}

/**
 * Generate a definition matching question (MCQ style)
 */
function generateDefinitionMatchQuestion(
  word: VocabularyWord,
  allWords: VocabularyWord[]
): GeneratedQuestion | null {
  const questionId = `vocab-q-${word.id}-${Date.now()}`;
  
  // Get 3 other random words for wrong options
  const otherWords = allWords
    .filter(w => w.id !== word.id && w.definition)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (otherWords.length < 3) {
    return null; // Not enough words for MCQ
  }

  const options = [word.word, ...otherWords.map(w => w.word)].sort(() => Math.random() - 0.5);

  return {
    id: questionId,
    type: 'definition-match',
    questionText: `Which word means: "${word.definition}"?`,
    correctAnswer: word.word,
    acceptedAnswers: [word.word.toLowerCase()],
    options,
    hint: word.bangla_meaning,
    explanation: `The correct answer is "${word.word}". ${word.definition}`,
    vocabularyWordId: word.id,
    vocabularyWord: word.word
  };
}

/**
 * Generate a synonym matching question
 */
function generateSynonymMatchQuestion(
  word: VocabularyWord,
  allWords: VocabularyWord[]
): GeneratedQuestion | null {
  if (!word.synonyms || word.synonyms.length === 0) {
    return null; // No synonyms available
  }

  const questionId = `vocab-q-${word.id}-${Date.now()}`;
  const correctSynonym = word.synonyms[Math.floor(Math.random() * word.synonyms.length)];

  // Get 3 other random words for wrong options
  const otherWords = allWords
    .filter(w => w.id !== word.id && !word.synonyms?.includes(w.word))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (otherWords.length < 3) {
    return null; // Not enough words for MCQ
  }

  const options = [correctSynonym, ...otherWords.map(w => w.word)].sort(() => Math.random() - 0.5);

  return {
    id: questionId,
    type: 'synonym-match',
    questionText: `Which word is a synonym of "${word.word}"?`,
    correctAnswer: correctSynonym,
    acceptedAnswers: word.synonyms.map(s => s.toLowerCase()),
    options,
    hint: word.definition,
    explanation: `"${correctSynonym}" is a synonym of "${word.word}". Other synonyms include: ${word.synonyms.join(', ')}`,
    vocabularyWordId: word.id,
    vocabularyWord: word.word
  };
}

/**
 * Generate a natural sentence using OpenAI
 */
async function generateSentenceWithAI(word: VocabularyWord, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an IELTS vocabulary expert. Generate a single natural, academic sentence using the given word. The sentence should be suitable for IELTS reading/listening practice.'
          },
          {
            role: 'user',
            content: `Generate one sentence using the word "${word.word}" (${word.part_of_speech}). Definition: ${word.definition}. Return ONLY the sentence, nothing else.`
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}
