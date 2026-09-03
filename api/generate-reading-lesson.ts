import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { requireStaff } from './_staffAuth.js';
import { studyLessonBlueprintSchema } from '../src/lib/lessonBlueprint.js';
import { readingLessonDataSchema, type ReadingLessonData } from '../src/modules/reading/readingLesson.js';

const GEMINI_API_KEY = cleanEnv(process.env.GEMINI_API_KEY);
const OPENAI_API_KEY = cleanEnv(process.env.OPENAI_API_KEY);

const promptFor = (topic: string, level: string) => `You are an IELTS Reading curriculum designer. Create one original ${level} Academic Reading skill lesson about "${topic}".

Return ONLY valid JSON exactly shaped as:
{
  "title": "Professional Reading lesson title",
  "description": "One precise sentence",
  "targetLevel": "Band range",
  "readingData": {
    "schemaVersion": 1,
    "passageFormat": "academic",
    "passageTitle": "Original passage title",
    "passageContent": "Full original passage",
    "paragraphs": [{ "label": "A", "content": "Paragraph text" }],
    "questionGroups": [{ "id": "group-1", "type": "multiple_choice", "instructions": "Choose the correct letter", "strategy": { "focus": ["main_idea"], "steps": ["Read the question first", "Locate evidence before answering"], "suggestedSeconds": 180 }, "questions": [{ "id": "q-1", "prompt": "Question", "options": ["A", "B", "C"], "acceptedAnswers": ["A"], "explanation": "Reason with paragraph evidence", "paragraphRefs": ["A"] }] }],
    "quality": { "passageReviewed": false, "questionsReviewed": false, "answersChecked": false, "copyrightConfirmed": false, "skillAlignmentReviewed": false, "difficultyReviewed": false }
  }
}

For readingData: write an original 600-750 word passage split into 5-7 labelled paragraphs A-G. passageContent must be the paragraphs joined in order. Create exactly 2-3 distinct question groups and 8-12 questions total. Every group must include a strategy object with learner-facing focus, two actionable steps, and a realistic suggestedSeconds time limit. Every question needs an answer, paragraphRefs, and an explanation that names the evidence paragraph.

Topic alignment is mandatory. If the topic contains “skimming”, create a timed main-idea / heading task that teaches reading headings, first sentences and topic sentences without reading every detail. If the topic contains “scanning”, create a separate timed detail-location task that teaches keyword prediction, synonym matching and locating a specific detail. For a topic containing both, include BOTH skills in separate groups. Do not make the heading options repeat the paragraph wording or make answers obvious. Use plausible distractors. Do not copy IELTS/Cambridge passages, claim official content, promise scores, or use unverified citations. Keep all quality flags false for human review. Return JSON only.`;

function validateSkillLesson(topic: string, reading: ReadingLessonData): string | null {
  const questionCount = reading.questionGroups.reduce((total, group) => total + group.questions.length, 0);
  const wordCount = reading.paragraphs.flatMap((paragraph) => paragraph.content.split(/\s+/)).filter(Boolean).length;
  if (reading.questionGroups.length < 2 || questionCount < 8 || wordCount < 550) return 'The generated lesson does not yet meet the minimum Reading practice standard.';
  if (reading.questionGroups.some((group) => !group.strategy || group.strategy.steps.length < 2 || group.questions.some((question) => !question.paragraphRefs?.length))) return 'The generated lesson is missing strategy instructions or paragraph evidence references.';
  const loweredTopic = topic.toLowerCase();
  const focuses = new Set(reading.questionGroups.flatMap((group) => group.strategy?.focus || []));
  if (loweredTopic.includes('skimm') && !focuses.has('skimming')) return 'The generated lesson does not include a skimming practice task.';
  if (loweredTopic.includes('scann') && !focuses.has('scanning')) return 'The generated lesson does not include a scanning practice task.';
  return null;
}

function createReadingBlueprint(topic: string, level: string, reading: ReadingLessonData) {
  const firstQuestion = reading.questionGroups[0]?.questions[0];
  const firstParagraph = reading.paragraphs[0];
  const lastParagraph = reading.paragraphs.at(-1);
  const labels = reading.paragraphs.map((paragraph) => paragraph.label).join(', ');
  const strategySteps = reading.questionGroups.flatMap((group) => group.strategy?.steps || []).slice(0, 4);
  const guidedItems = reading.questionGroups
    .flatMap((group) => group.questions)
    .slice(0, 2)
    .map((question) => ({ prompt: question.prompt, modelAnswer: question.acceptedAnswers[0], explanation: question.explanation }));
  while (guidedItems.length < 2) {
    guidedItems.push({
      prompt: `Find the key idea in paragraph ${firstParagraph?.label || 'A'}.`,
      modelAnswer: firstParagraph?.content || 'Refer to the passage.',
      explanation: 'Use the paragraph’s main idea as evidence before choosing an answer.',
    });
  }

  return {
    schemaVersion: 1 as const,
    objective: `Use ${topic} reading strategies to locate evidence and answer questions accurately.`,
    outcome: `Complete the ${reading.passageFormat === 'academic' ? 'Academic' : 'General Training'} passage questions with evidence-based answers.`,
    estimatedMinutes: 30,
    sourceNotes: ['Original AI-assisted practice material. Human review required before publishing.'],
    sections: [
      { id: 'concept', type: 'concept' as const, title: 'Reading strategy', summary: `Learn how to approach ${topic} at ${level} level.`, points: strategySteps.length >= 2 ? strategySteps.slice(0, 2) : ['Read the instructions before scanning the passage.', `Use paragraph labels (${labels}) to organise your evidence.`] },
      { id: 'worked-example', type: 'worked-example' as const, title: 'Worked example', prompt: firstQuestion?.prompt || 'Identify the key information in the passage.', weakAnswer: 'Choose an answer without locating evidence.', strongAnswer: `Locate the relevant detail in paragraph ${firstParagraph?.label || 'A'} and check it against the question wording.`, breakdown: ['Underline the key words in the question.', 'Confirm the answer with the exact passage evidence.'] },
      { id: 'phrase-bank', type: 'phrase-bank' as const, title: 'Useful reading language', groups: [{ label: 'Instructions', items: ['according to the passage', 'the writer states that'] }, { label: 'Evidence', items: ['the relevant paragraph', 'the supporting detail'] }] },
      { id: 'guided-practice', type: 'guided-practice' as const, title: 'Guided practice', instructions: 'Answer each question, then use the explanation to check your reasoning.', items: guidedItems },
      { id: 'self-check', type: 'self-check' as const, title: 'Self-check', criteria: ['I read every instruction carefully.', 'I found evidence before choosing an answer.', 'I checked that my answer matches the required format.'] },
      { id: 'assignment', type: 'assignment' as const, title: 'Independent task', task: `Complete the remaining questions for “${reading.passageTitle}”.`, deliverable: `Submit answers with a paragraph reference from ${lastParagraph?.label || 'the passage'} or another relevant paragraph.`, successCriteria: ['Every answer is completed.', 'Each answer is supported by passage evidence.', 'I review explanations for any incorrect answer.'] },
    ],
  };
}

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
    const readingData = readingLessonDataSchema.safeParse(generated.readingData);
    if (!readingData.success || typeof generated.title !== 'string' || typeof generated.description !== 'string') return res.status(502).json({ error: 'AI returned an incomplete Reading lesson draft', issues: { readingData: readingData.success ? [] : readingData.error.issues } });
    const qualityIssue = validateSkillLesson(topic, readingData.data);
    if (qualityIssue) return res.status(502).json({ error: qualityIssue });
    const blueprint = studyLessonBlueprintSchema.parse(createReadingBlueprint(topic, level, readingData.data));
    return res.status(200).json({ ...generated, studyBlueprint: blueprint, readingData: readingData.data });
  } catch (error) {
    console.error('Reading lesson generation error:', error);
    const detail = error instanceof Error ? error.message : 'Unknown generation error';
    const configurationMessage = detail.includes('OpenAI request failed with status 429')
      ? 'AI generation is unavailable because the configured OpenAI account has no available credits. Add API credits or configure a valid Gemini API key.'
      : detail.includes('Gemini request failed with status 400')
        ? 'AI generation is unavailable because the configured Gemini API key is invalid. Replace it with a valid server-side key.'
        : 'Failed to generate the Reading lesson';
    return res.status(500).json({
      error: configurationMessage,
      ...(process.env.VERCEL_ENV === 'production' ? {} : { detail }),
    });
  }
}
