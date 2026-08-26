import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { requireStaff } from './_staffAuth.js';

const GEMINI_API_KEY = cleanEnv(process.env.GEMINI_API_KEY);
const OPENAI_API_KEY = cleanEnv(process.env.OPENAI_API_KEY);

const promptFor = (topic: string, level: string) => `You are a senior IELTS grammar curriculum designer. Create one complete premium grammar lesson about "${topic}" for ${level} learners.

Return ONLY valid JSON with this exact shape:
{
  "title": "...",
  "description": "...",
  "content": {
    "title": "...",
    "targetLevel": "...",
    "whatYouWillLearn": ["...", "...", "..."],
    "coreExplanation": "...",
    "grammarForm": "...",
    "grammarFormItems": [{
      "name": "...", "tags": ["..."], "definition": "...",
      "comparison": { "standard": "...", "band8": "..." }
    }],
    "grammarUse": "...",
    "examples": [{ "sentence": "...", "explanation": "..." }],
    "commonMistakes": [{ "mistake": "...", "correction": "...", "explanation": "..." }],
    "sentenceUpgrade": [{ "basic": "...", "upgraded": "..." }],
    "miniPractice": [{ "question": "...", "options": ["...", "...", "..."], "type": "multiple-choice" }],
    "answerKey": ["..."],
    "quickRecap": "..."
  }
}

Requirements:
- Teach the grammar accurately in plain, learner-friendly English.
- Include 3-5 learning outcomes, at least 2 grammar form items, 6 examples, 4 common mistakes, 4 sentence upgrades and 6 practice questions.
- Use realistic IELTS Writing and Speaking contexts without promising a band score.
- Each multiple-choice answer must exactly match one option. answerKey must have one answer per practice question in the same order.
- grammarForm must show usable structures; grammarUse must explain when and why to use them.
- The "band8" comparison is an advanced rewrite example, not a score guarantee.
- Do not use markdown or add commentary outside the JSON.`;

async function generateWithGemini(prompt: string): Promise<unknown> {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: 'You create accurate IELTS grammar lessons and return valid JSON only.' }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.35, maxOutputTokens: 10000, responseMimeType: 'application/json' },
    }),
  });
  if (!response.ok) throw new Error(`Gemini request failed with status ${response.status}`);
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
        { role: 'system', content: 'You create accurate IELTS grammar lessons and return valid JSON only.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.35,
      max_tokens: 10000,
    }),
  });
  if (!response.ok) throw new Error(`OpenAI request failed with status ${response.status}`);
  const payload = await response.json();
  return JSON.parse(payload.choices?.[0]?.message?.content || '{}');
}

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidDeepGrammarLesson(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object') return false;
  const lesson = value as Record<string, unknown>;
  const content = lesson.content as Record<string, unknown> | undefined;
  if (!isString(lesson.title) || !isString(lesson.description) || !content) return false;

  const practice = content.miniPractice as Record<string, unknown>[] | undefined;
  const answers = content.answerKey as unknown[] | undefined;
  const validPractice = Array.isArray(practice) && practice.length >= 6 && practice.every((item) =>
    isString(item.question)
    && item.type === 'multiple-choice'
    && Array.isArray(item.options)
    && item.options.length >= 3,
  );

  return isString(content.title)
    && isString(content.targetLevel)
    && isString(content.coreExplanation)
    && isString(content.grammarForm)
    && isString(content.grammarUse)
    && isString(content.quickRecap)
    && Array.isArray(content.whatYouWillLearn) && content.whatYouWillLearn.length >= 3
    && Array.isArray(content.grammarFormItems) && content.grammarFormItems.length >= 2
    && Array.isArray(content.examples) && content.examples.length >= 6
    && Array.isArray(content.commonMistakes) && content.commonMistakes.length >= 4
    && Array.isArray(content.sentenceUpgrade) && content.sentenceUpgrade.length >= 4
    && validPractice
    && Array.isArray(answers) && answers.length === practice.length
    && practice.every((item, index) => (item.options as unknown[]).includes(answers[index]));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!(await requireStaff(req, res))) return;
  if (!checkRateLimit(req, res, LIMITS.medium, 'generate-deep-grammar-lesson')) return;
  if (!GEMINI_API_KEY && !OPENAI_API_KEY) return res.status(500).json({ error: 'No AI provider is configured' });

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
        generated = await generateWithOpenAI(prompt);
      }
    } else {
      generated = await generateWithOpenAI(prompt);
    }
    if (!isValidDeepGrammarLesson(generated)) {
      return res.status(502).json({ error: 'AI returned an incomplete grammar lesson. Please generate again.' });
    }
    return res.status(200).json(generated);
  } catch (error) {
    console.error('Deep grammar generation error:', error);
    return res.status(500).json({ error: 'Failed to generate deep grammar lesson' });
  }
}
