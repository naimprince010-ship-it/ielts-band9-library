import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface AnalyzeWritingRequest {
  task1Prompt?: string;
  task2Prompt?: string;
  task1Response?: string;
  task2Response?: string;
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

function buildPrompt(body: AnalyzeWritingRequest): string {
  const task1Words = wordCount(body.task1Response ?? '');
  const task2Words = wordCount(body.task2Response ?? '');

  return `
You are a strict but constructive IELTS Writing examiner. Evaluate this full IELTS Writing submission.

Return ONLY valid JSON with this exact shape:
{
  "estimatedBand": 6.5,
  "summary": "2-3 sentence overall assessment.",
  "criteria": [
    { "name": "Task Achievement / Task Response", "band": 6.5, "feedback": "Specific feedback." },
    { "name": "Coherence and Cohesion", "band": 6.5, "feedback": "Specific feedback." },
    { "name": "Lexical Resource", "band": 6.5, "feedback": "Specific feedback." },
    { "name": "Grammatical Range and Accuracy", "band": 6.5, "feedback": "Specific feedback." }
  ],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "task1Notes": "Focused Task 1 advice.",
  "task2Notes": "Focused Task 2 advice.",
  "actionPlan": ["next action 1", "next action 2", "next action 3"]
}

Scoring rules:
- Use IELTS public band descriptors in spirit.
- Penalize under-length responses: Task 1 is ${task1Words} words, Task 2 is ${task2Words} words.
- Do not be overly generous. Give a realistic estimated band in 0.5 increments.
- Mention concrete issues from the submitted text.
- Keep all text concise and student-friendly.

Task 1 prompt:
${body.task1Prompt || 'No prompt provided'}

Task 1 response:
${body.task1Response || 'No response provided'}

Task 2 prompt:
${body.task2Prompt || 'No prompt provided'}

Task 2 response:
${body.task2Response || 'No response provided'}
`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!checkRateLimit(req, res, LIMITS.heavy, 'analyze-writing')) return;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({
      success: false,
      error: 'OPENAI_API_KEY is not configured.',
      hint: 'Add OPENAI_API_KEY in Vercel environment variables.',
    });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}') as AnalyzeWritingRequest
      : (req.body || {}) as AnalyzeWritingRequest;

    const task1Response = body.task1Response?.trim() ?? '';
    const task2Response = body.task2Response?.trim() ?? '';

    if (wordCount(task1Response) < 20 && wordCount(task2Response) < 20) {
      return res.status(400).json({ success: false, error: 'Please write enough text before requesting AI feedback.' });
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
            content: 'You are an IELTS Writing examiner. Return valid JSON only.',
          },
          {
            role: 'user',
            content: buildPrompt({ ...body, task1Response, task2Response }),
          },
        ],
        temperature: 0.25,
        max_tokens: 1800,
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
      error: 'Failed to analyze writing.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
