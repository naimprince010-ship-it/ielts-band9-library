import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { requireStaff } from './_staffAuth.js';
import { studyLessonBlueprintSchema } from '../src/lib/lessonBlueprint.js';
import { readingLessonDataSchema } from '../src/modules/reading/readingLesson.js';

const GEMINI_API_KEY = cleanEnv(process.env.GEMINI_API_KEY);
const OPENAI_API_KEY = cleanEnv(process.env.OPENAI_API_KEY);

const promptFor = (topic: string, level: string) => `You are an IELTS Reading curriculum designer. Create one original ${level} Academic Reading skill lesson about "${topic}".

Return ONLY valid JSON exactly shaped as:
{
  "title": "Professional Reading lesson title",
  "description": "One precise sentence",
  "targetLevel": "Band range",
  "studyBlueprint": { "schemaVersion": 1, "objective": "Measurable objective", "outcome": "Demonstrable outcome", "estimatedMinutes": 30, "sourceNotes": ["Original practice material"], "sections": [] },
  "readingData": {
    "schemaVersion": 1,
    "passageFormat": "academic",
    "passageTitle": "Original passage title",
    "passageContent": "Full original passage",
    "paragraphs": [{ "label": "A", "content": "Paragraph text" }],
    "questionGroups": [{ "id": "group-1", "type": "multiple_choice", "instructions": "Choose the correct letter", "questions": [{ "id": "q-1", "prompt": "Question", "options": ["A", "B", "C"], "acceptedAnswers": ["A"], "explanation": "Reason" }] }],
    "quality": { "passageReviewed": false, "questionsReviewed": false, "answersChecked": false, "copyrightConfirmed": false }
  }
}

For studyBlueprint use this exact order: concept, worked-example, phrase-bank, guided-practice, self-check, assignment. Do not use speaking-drill.
For readingData: write an original 550-750 word passage split into 5-7 labelled paragraphs A-G. passageContent must be the paragraphs joined in order. Use 2-3 questionGroups and at least 5 questions total. Permitted question types: multiple_choice, true_false_not_given, yes_no_not_given, matching_headings, matching_information, matching_features, summary_completion, sentence_completion, short_answer. Every question needs an answer and explanation. Do not copy IELTS/Cambridge passages, claim official content, promise scores, or use unverified citations. Keep all quality flags false for human review. Return JSON only.`;

async function generate(prompt: string) {
  if (GEMINI_API_KEY) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: 'Return accurate original IELTS Reading lesson JSON only.' }] }, contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 6500, responseMimeType: 'application/json' } }),
      signal: AbortSignal.timeout(50_000),
    });
    if (response.ok) {
      const payload = await response.json();
      return JSON.parse(payload.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('') || '{}');
    }
    if (!OPENAI_API_KEY) throw new Error(`Gemini request failed with status ${response.status}`);
  }
  if (!OPENAI_API_KEY) throw new Error('No AI provider is configured');
  const response = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` }, body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: 'Return accurate original IELTS Reading lesson JSON only.' }, { role: 'user', content: prompt }], response_format: { type: 'json_object' }, temperature: 0.2, max_tokens: 6500 }), signal: AbortSignal.timeout(50_000) });
  if (!response.ok) throw new Error(`OpenAI request failed with status ${response.status}`);
  const payload = await response.json();
  return JSON.parse(payload.choices?.[0]?.message?.content || '{}');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!(await requireStaff(req, res))) return;
  if (!checkRateLimit(req, res, LIMITS.medium, 'generate-reading-lesson')) return;
  const topic = typeof req.body?.topic === 'string' ? req.body.topic.trim() : '';
  const level = typeof req.body?.level === 'string' ? req.body.level.trim() : 'intermediate';
  if (!topic) return res.status(400).json({ error: 'Lesson topic is required' });
  try {
    const generated = await generate(promptFor(topic, level));
    const blueprint = studyLessonBlueprintSchema.safeParse(generated.studyBlueprint);
    const readingData = readingLessonDataSchema.safeParse(generated.readingData);
    if (!blueprint.success || !readingData.success || typeof generated.title !== 'string' || typeof generated.description !== 'string') return res.status(502).json({ error: 'AI returned an incomplete Reading lesson draft', issues: { studyBlueprint: blueprint.success ? [] : blueprint.error.issues, readingData: readingData.success ? [] : readingData.error.issues } });
    return res.status(200).json({ ...generated, studyBlueprint: blueprint.data, readingData: readingData.data });
  } catch (error) {
    console.error('Reading lesson generation error:', error);
    const detail = error instanceof Error ? error.message : 'Unknown generation error';
    return res.status(500).json({
      error: 'Failed to generate the Reading lesson',
      ...(process.env.VERCEL_ENV === 'production' ? {} : { detail }),
    });
  }
}
