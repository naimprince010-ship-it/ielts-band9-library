import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking';

interface SuggestTopicsRequest {
  moduleType: ModuleType;
  testType?: 'academic' | 'general';
  count?: number;
}

const TOPIC_PROMPT = (moduleType: ModuleType, testType: string, count: number) => `
You are an IELTS test content expert. Suggest ${count} diverse and engaging topics for an IELTS ${moduleType.toUpperCase()} ${testType} test.

Requirements:
- Topics should be appropriate for ${testType === 'academic' ? 'academic/university-level' : 'general training'} IELTS
- Include a mix of categories: Science & Technology, Environment, Society, Health, Education, Business, Culture, History
- Topics should be current, relevant, and interesting for international test-takers
- Avoid controversial political or religious topics
- Each topic should be specific enough to generate focused content

For ${moduleType.toUpperCase()} module specifically:
${moduleType === 'reading' ? '- Topics should work well for 800-1000 word academic passages\n- Include topics that allow for complex arguments and multiple perspectives' : ''}
${moduleType === 'listening' ? '- Topics should work for conversations, lectures, and discussions\n- Include everyday situations and academic contexts' : ''}
${moduleType === 'writing' ? '- Topics should allow for Task 1 (data/process description) and Task 2 (essay)\n- Include topics that allow for opinion, discussion, and problem-solution essays' : ''}
${moduleType === 'speaking' ? '- Topics should allow for personal experiences and opinions\n- Include topics for Part 1 (familiar topics), Part 2 (cue card), and Part 3 (discussion)' : ''}

Respond with a JSON array of topic objects:
[
  {
    "topic": "The Impact of Artificial Intelligence on Employment",
    "category": "Technology",
    "difficulty": "medium"
  }
]

Only respond with valid JSON, no additional text.`;

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2000 }
      })
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `Status ${response.status}`;
    throw new Error(`Gemini API error: ${errorMessage}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callOpenAI(prompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an IELTS test content expert. Always respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `Status ${response.status}`;
    throw new Error(`OpenAI API error: ${errorMessage}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

function cleanJsonResponse(response: string): string {
  let cleaned = response.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!checkRateLimit(req, res, LIMITS.light, 'suggest-topics')) return;

  try {
    const body = req.body as Partial<SuggestTopicsRequest>;
    const moduleType = body.moduleType || 'reading';
    const testType = body.testType || 'academic';
    const count = Math.min(body.count || 8, 15);

    const prompt = TOPIC_PROMPT(moduleType, testType, count);
    
    let rawResponse: string;
    
    if (OPENAI_API_KEY) {
      rawResponse = await callOpenAI(prompt);
    } else if (GEMINI_API_KEY) {
      rawResponse = await callGemini(prompt);
    } else {
      return res.status(500).json({ 
        error: 'No AI API key configured. Please add OPENAI_API_KEY to your Vercel environment variables.' 
      });
    }

    const cleanedResponse = cleanJsonResponse(rawResponse);
    
    let topics;
    try {
      topics = JSON.parse(cleanedResponse);
    } catch {
      console.error('Failed to parse AI response:', cleanedResponse.substring(0, 200));
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    return res.status(200).json({
      success: true,
      topics: Array.isArray(topics) ? topics : [],
      moduleType,
      testType
    });

  } catch (error) {
    console.error('Topic Suggestion Error:', error);
    return res.status(500).json({
      error: 'Failed to suggest topics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
