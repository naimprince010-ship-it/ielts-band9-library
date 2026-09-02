import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { requireStaff } from './_staffAuth.js';
import { studyLessonBlueprintSchema } from '../src/lib/lessonBlueprint.js';
import { listeningLessonDataSchema } from '../src/modules/listening/listeningLesson.js';

const GEMINI_API_KEY = cleanEnv(process.env.GEMINI_API_KEY);
const OPENAI_API_KEY = cleanEnv(process.env.OPENAI_API_KEY);

const promptFor = (topic: string, level: string) => `You are an IELTS Listening curriculum designer. Create one evidence-aware ${level} Listening skill lesson about "${topic}".

Return ONLY valid JSON in exactly this shape:
{
  "title": "Professional Listening lesson title",
  "description": "One precise sentence",
  "targetLevel": "Band range",
  "studyBlueprint": {
    "schemaVersion": 1,
    "objective": "Measurable objective",
    "outcome": "Demonstrable learner outcome",
    "estimatedMinutes": 30,
    "sourceNotes": ["Curriculum basis"],
    "sections": []
  },
  "listeningData": {
    "schemaVersion": 1,
    "lessonFormat": "skill_lesson",
    "sectionNumber": null,
    "sectionType": "note_completion",
    "audio": { "status": "browser_tts" },
    "transcript": { "status": "draft", "cues": [] },
    "questions": [],
    "quality": { "contentReviewed": false, "transcriptChecked": false, "answersChecked": false }
  }
}

For studyBlueprint, use this exact pedagogical order: concept, worked-example, phrase-bank, guided-practice, self-check, assignment. Do NOT use speaking-drill.
For listeningData:
- Use one legitimate IELTS Listening question type: form_completion, note_completion, multiple_choice, matching, map_labelling, sentence_completion, or short_answer.
- transcript.cues must have at least 3 short, chronological cues. Each cue needs startSeconds, endSeconds, optional speaker and text. Do not claim that this is a real IELTS test recording.
- questions must have at least 3 items. Every item needs id, type, prompt, acceptedAnswers, and explanation. Options are required for multiple_choice and matching.
- audio.status must be browser_tts and no audio URL should be invented. Browser TTS reads the reviewed transcript; a human may replace it with recorded audio later.
- quality values must all remain false; a human reviewer completes them.

Quality rules:
- Teach prediction, attention control, answer-format checking and error prevention; do not invent official rules or guaranteed scores.
- Use original practice material, not copied test content.
- Keep language accurate, natural and appropriate for IELTS preparation.
- Return JSON only, without markdown or commentary.`;

async function withGemini(prompt: string) {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: 'Return accurate, complete IELTS Listening lesson JSON only.' }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 7000, responseMimeType: 'application/json' },
    }),
  });
  if (!response.ok) throw new Error(`Gemini request failed with status ${response.status}`);
  const payload = await response.json();
  const text = payload.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('') || '';
  return JSON.parse(text);
}

async function withOpenAI(prompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Return accurate, complete IELTS Listening lesson JSON only.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
      max_tokens: 14000,
    }),
  });
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
  if (!checkRateLimit(req, res, LIMITS.medium, 'generate-listening-lesson')) return;
  if (!GEMINI_API_KEY && !OPENAI_API_KEY) return res.status(500).json({ error: 'No AI provider is configured' });

  const topic = typeof req.body?.topic === 'string' ? req.body.topic.trim() : '';
  const level = typeof req.body?.level === 'string' ? req.body.level.trim() : 'intermediate';
  if (!topic) return res.status(400).json({ error: 'Lesson topic is required' });

  try {
    const prompt = promptFor(topic, level);
    let generated: Record<string, unknown>;
    if (GEMINI_API_KEY) {
      try { generated = await withGemini(prompt); }
      catch (error) { if (!OPENAI_API_KEY) throw error; generated = await withOpenAI(prompt); }
    } else generated = await withOpenAI(prompt);

    const blueprint = studyLessonBlueprintSchema.safeParse(generated.studyBlueprint);
    const listeningData = listeningLessonDataSchema.safeParse(generated.listeningData);
    if (!blueprint.success || !listeningData.success || typeof generated.title !== 'string' || typeof generated.description !== 'string') {
      return res.status(502).json({
        error: 'AI returned an incomplete Listening lesson draft',
        issues: {
          studyBlueprint: blueprint.success ? [] : blueprint.error.issues,
          listeningData: listeningData.success ? [] : listeningData.error.issues,
        },
      });
    }
    return res.status(200).json({ ...generated, studyBlueprint: blueprint.data, listeningData: listeningData.data });
  } catch (error) {
    console.error('Listening lesson generation error:', error);
    return res.status(500).json({ error: 'Failed to generate the Listening lesson' });
  }
}
