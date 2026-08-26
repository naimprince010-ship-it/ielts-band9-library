import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { requireStaff } from './_staffAuth.js';

const GEMINI_API_KEY = cleanEnv(process.env.GEMINI_API_KEY);
const OPENAI_API_KEY = cleanEnv(process.env.OPENAI_API_KEY);
const WORD_ACCENTS = [
  { border: 'border-indigo-200', surface: 'bg-indigo-50/70', badge: 'bg-indigo-100 text-indigo-700', heading: 'text-indigo-700', ring: 'ring-indigo-100', dot: 'bg-indigo-600' },
  { border: 'border-violet-200', surface: 'bg-violet-50/70', badge: 'bg-violet-100 text-violet-700', heading: 'text-violet-700', ring: 'ring-violet-100', dot: 'bg-violet-600' },
  { border: 'border-amber-200', surface: 'bg-amber-50/80', badge: 'bg-amber-100 text-amber-800', heading: 'text-amber-800', ring: 'ring-amber-100', dot: 'bg-amber-500' },
  { border: 'border-emerald-200', surface: 'bg-emerald-50/70', badge: 'bg-emerald-100 text-emerald-700', heading: 'text-emerald-700', ring: 'ring-emerald-100', dot: 'bg-emerald-600' },
];

const promptFor = (topic: string, level: string) => `You are a senior IELTS curriculum designer. Create one premium deep vocabulary lesson about "${topic}" for ${level} learners.

Return ONLY a valid JSON object with this exact top-level shape:
{
  "title": "...",
  "description": "...",
  "targetLevel": "...",
  "whatYouWillLearn": ["...", "...", "..."],
  "deepVocabulary": {
    "lessonBadgeLabel": "Vocabulary · Draft",
    "sidebarLessonLabel": "New lesson",
    "deepLessonProgress": 0,
    "estimatedTime": "10–15 min",
    "categoryLabel": "Vocabulary Precision",
    "learningOutcomes": ["...", "...", "..."],
    "words": [{
      "word": "...", "part": "...", "grammarRole": "...", "meaning": "...",
      "instant": "...", "clue": "...", "pattern": "...", "example": "...",
      "phrase": "...", "warning": "...", "useCases": ["...", "..."],
      "mistake": {"wrong": "...", "right": "..."}, "why": "...",
      "whenToUse": "...", "commonPattern": "...", "ieltsExample": "...",
      "confusionWarning": "..."
    }],
    "quickDecisionRules": [{"cue": "...", "answer": "...", "tone": "..."}],
    "checks": [{"prompt": "...", "options": ["...", "...", "..."], "correct": "...", "explanation": "..."}],
    "memoryTip": {"title": "...", "text": "..."},
    "contrastTip": {"title": "...", "text": "..."},
    "applyPrompt": "...", "applyHint": "...", "modelAnswer": "...",
    "modelAnswerSegments": [{"text": "..."}],
    "modelBreakdown": [{"term": "...", "text": "..."}],
    "heroWordBubbles": [{"label": "...", "className": "bg-indigo-100 text-indigo-700"}],
    "practiceCards": [{"title": "...", "subtitle": "...", "tone": "indigo"}]
  }
}

Requirements:
- Exactly 4 closely related, genuinely useful IELTS words or phrases.
- Every field must be factually accurate, natural, and learner-friendly.
- Include at least 4 decision rules, 4 checks, and 4 model breakdown items.
- The correct answer must exactly match one option in each check.
- Examples must suit IELTS Writing or Speaking and must not promise a band score.
- Do not include accent/color objects inside words; the UI supplies them.
- Do not use markdown or commentary outside the JSON.`;

async function generateWithGemini(prompt: string): Promise<unknown> {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: 'You create accurate IELTS lessons and return valid JSON only.' }],
      },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.45,
        maxOutputTokens: 10000,
        responseMimeType: 'application/json',
      },
    }),
  });
  if (!response.ok) {
    console.error('Deep vocabulary Gemini error:', response.status);
    throw new Error(`Gemini request failed with status ${response.status}`);
  }
  const payload = await response.json();
  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text || '')
    .join('') || '';
  return JSON.parse(text);
}

async function generateWithOpenAI(prompt: string): Promise<unknown> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You create accurate IELTS lessons and return valid JSON only.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.45,
      max_tokens: 10000,
    }),
  });
  if (!response.ok) {
    console.error('Deep vocabulary OpenAI error:', response.status);
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }
  const payload = await response.json();
  return JSON.parse(payload.choices?.[0]?.message?.content || '{}');
}

function isValidDeepLesson(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object') return false;
  const lesson = value as Record<string, unknown>;
  const deep = lesson.deepVocabulary as Record<string, unknown> | undefined;
  return typeof lesson.title === 'string'
    && typeof lesson.description === 'string'
    && Array.isArray(lesson.whatYouWillLearn)
    && !!deep
    && Array.isArray(deep.words)
    && deep.words.length === 4
    && Array.isArray(deep.checks)
    && deep.checks.length >= 4;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!(await requireStaff(req, res))) return;
  if (!checkRateLimit(req, res, LIMITS.medium, 'generate-deep-vocabulary-lesson')) return;
  if (!GEMINI_API_KEY && !OPENAI_API_KEY) {
    return res.status(500).json({ error: 'No AI provider is configured' });
  }

  const topic = typeof req.body?.topic === 'string' ? req.body.topic.trim() : '';
  const level = typeof req.body?.level === 'string' ? req.body.level.trim() : 'intermediate';
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  try {
    const prompt = promptFor(topic, level);
    let generated: unknown;
    if (GEMINI_API_KEY) {
      try {
        generated = await generateWithGemini(prompt);
      } catch (geminiError) {
        if (!OPENAI_API_KEY) throw geminiError;
        console.warn(
          'Gemini generation failed; trying OpenAI fallback:',
          geminiError instanceof Error ? geminiError.message : 'unknown error',
        );
        generated = await generateWithOpenAI(prompt);
      }
    } else {
      generated = await generateWithOpenAI(prompt);
    }
    if (!isValidDeepLesson(generated)) {
      return res.status(502).json({ error: 'AI returned an incomplete lesson. Please generate again.' });
    }
    const deep = generated.deepVocabulary as Record<string, unknown>;
    deep.words = (deep.words as Record<string, unknown>[]).map((word, index) => ({
      ...word,
      accent: WORD_ACCENTS[index % WORD_ACCENTS.length],
    }));
    return res.status(200).json(generated);
  } catch (error) {
    console.error('Deep vocabulary generation error:', error);
    return res.status(500).json({ error: 'Failed to generate deep vocabulary lesson' });
  }
}
