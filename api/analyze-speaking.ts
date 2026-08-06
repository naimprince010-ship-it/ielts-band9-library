import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface AnalyzeSpeakingRequest {
  questions?: string[];
  typedResponse?: string;
  clipCount?: number;
  totalRecordedSeconds?: number;
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function cleanJsonResponse(response: string): string {
  const trimmed = response.trim();
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) return trimmed.slice(firstBrace, lastBrace + 1);
  return trimmed.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
}

function buildPrompt(body: AnalyzeSpeakingRequest): string {
  const typedResponse = body.typedResponse?.trim() || '';
  const words = wordCount(typedResponse);
  const questions = Array.isArray(body.questions) && body.questions.length > 0
    ? body.questions.join('\n- ')
    : 'No specific speaking questions provided.';

  return `
You are a strict but constructive IELTS Speaking examiner. Evaluate the candidate's speaking transcript. The transcript may come from typed responses, recorded-audio transcription, or both.

Return ONLY valid JSON with this exact shape:
{
  "estimatedBand": 6.5,
  "summary": "2-3 sentence overall assessment.",
  "criteria": [
    { "name": "Fluency and Coherence", "band": 6.5, "feedback": "Specific feedback." },
    { "name": "Lexical Resource", "band": 6.5, "feedback": "Specific feedback." },
    { "name": "Grammatical Range and Accuracy", "band": 6.5, "feedback": "Specific feedback." },
    { "name": "Pronunciation", "band": 6.0, "feedback": "Give cautious pronunciation-related feedback only when the transcript provides evidence such as hesitations or repeated repairs; otherwise state the limitation." }
  ],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "partNotes": ["Part 1 advice", "Part 2 advice", "Part 3 advice"],
  "actionPlan": ["next action 1", "next action 2", "next action 3"]
}

Scoring rules:
- Use IELTS public speaking band descriptors in spirit.
- Be realistic and use 0.5 increments.
- Do not claim to hear pronunciation unless acoustic evidence was provided. This request provides transcript text, not raw audio features.
- Penalize very short answers. Typed response length is ${words} words.
- The student recorded ${body.clipCount ?? 0} clips totaling about ${body.totalRecordedSeconds ?? 0} seconds. If the response includes transcript text, treat it as the student's spoken content.
- Keep feedback concise, concrete, and student-friendly.

Speaking questions:
- ${questions}

Candidate typed response:
${typedResponse || 'No typed response provided.'}
`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!checkRateLimit(req, res, LIMITS.heavy, 'analyze-speaking')) return;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({
      success: false,
      error: 'OPENAI_API_KEY is not configured.',
      hint: 'Add OPENAI_API_KEY in Vercel environment variables.',
    });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}') as AnalyzeSpeakingRequest
      : (req.body || {}) as AnalyzeSpeakingRequest;

    const typedResponse = body.typedResponse?.trim() ?? '';
    const clipCount = Number(body.clipCount || 0);

    if (wordCount(typedResponse) < 20 && clipCount === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please type enough speaking text or record at least one clip before requesting AI feedback.',
      });
    }

    if (wordCount(typedResponse) < 20) {
      return res.status(400).json({
        success: false,
        error: 'Audio clips are saved locally for playback, but AI speaking feedback needs typed responses until transcription is added.',
      });
    }

    const MAX_CHARS = 6000;
    if (typedResponse.length > MAX_CHARS) {
      return res.status(400).json({ success: false, error: 'Response text is too long. Please keep your speaking response under 6000 characters.' });
    }

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
            content: 'You are an IELTS Speaking examiner. Return valid JSON only.',
          },
          {
            role: 'user',
            content: buildPrompt({ ...body, typedResponse }),
          },
        ],
        temperature: 0.25,
        max_tokens: 1600,
        response_format: { type: 'json_object' },
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      let message = `OpenAI API error: ${response.status}`;
      try {
        const parsed = JSON.parse(responseText);
        message = parsed.error?.message || message;
      } catch {
        message = responseText.slice(0, 200) || message;
      }
      return res.status(500).json({ success: false, error: message });
    }

    const data = JSON.parse(responseText);
    const content = data.choices?.[0]?.message?.content;
    if (!content) return res.status(500).json({ success: false, error: 'AI returned an empty response.' });

    const feedback = JSON.parse(cleanJsonResponse(content));
    return res.status(200).json({ success: true, feedback });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to analyze speaking.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
