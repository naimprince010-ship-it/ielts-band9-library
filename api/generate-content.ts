import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking';
type AIProvider = 'openai' | 'gemini';

interface GenerateRequest {
  moduleType: ModuleType;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  testType?: 'academic' | 'general';
  provider?: AIProvider;
}

const READING_PROMPT = (topic: string, difficulty: string, testType: string) => `
You are an IELTS exam content creator. Generate a complete IELTS ${testType} reading passage with questions.

Topic: ${topic}
Difficulty: ${difficulty}

Generate a JSON response with this exact structure:
{
  "passage": {
    "title": "Passage title",
    "textContent": "Full passage text with multiple paragraphs. Use <p class='mb-4'><strong>A</strong> ... </p> format for paragraphs with labels A, B, C, etc.",
    "paragraphs": [
      { "label": "A", "content": "Brief summary of paragraph A" },
      { "label": "B", "content": "Brief summary of paragraph B" }
    ]
  },
  "questions": [
    {
      "type": "true-false-not-given",
      "questionText": "Question text here",
      "options": ["TRUE", "FALSE", "NOT GIVEN"],
      "correctAnswer": "TRUE",
      "explanation": "Brief explanation",
      "passageRef": "Paragraph A"
    },
    {
      "type": "mcq",
      "questionText": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "passageRef": "Paragraph B"
    },
    {
      "type": "fill-blank",
      "questionText": "The answer is _____.",
      "correctAnswer": "answer",
      "acceptedAnswers": ["answer", "Answer", "ANSWER"],
      "passageRef": "Paragraph C"
    }
  ]
}

Generate 10-13 questions with a mix of:
- 3-4 True/False/Not Given questions
- 3-4 Multiple Choice questions
- 3-4 Fill in the Blank questions
- 1-2 Matching Headings or Short Answer questions

The passage should be 600-800 words, academic in style, and factually accurate.
Return ONLY valid JSON, no markdown or explanation.
`;

const LISTENING_PROMPT = (topic: string, difficulty: string) => `
You are an IELTS exam content creator. Generate a complete IELTS listening test with transcript and sections.

Topic: ${topic}
Difficulty: ${difficulty}

Generate a JSON response with this exact structure:
{
  "transcript": "Full transcript of what would be spoken in the audio. Include speaker labels like 'Speaker 1:', 'Speaker 2:' for conversations. This should be 400-500 words covering all sections.",
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Section 1: Conversation about booking a hotel",
      "questions": [
        {
          "type": "fill-blank",
          "questionText": "The guest wants to book for _____ nights.",
          "correctAnswer": "three",
          "acceptedAnswers": ["three", "3", "Three"]
        },
        {
          "type": "mcq",
          "questionText": "What type of room does the guest prefer?",
          "options": ["Single room", "Double room", "Suite", "Family room"],
          "correctAnswer": "Double room"
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Section 2: Monologue about local attractions",
      "questions": [
        {
          "type": "fill-blank",
          "questionText": "The museum opens at _____ am.",
          "correctAnswer": "nine",
          "acceptedAnswers": ["nine", "9", "Nine"]
        }
      ]
    }
  ]
}

Generate 2 sections with a total of 8-10 questions with a mix of:
- 4-5 Fill in the Blank questions
- 3-4 Multiple Choice questions
- 1-2 Matching questions

The transcript should be 400-500 words, natural conversational style.
Return ONLY valid JSON, no markdown or explanation.
`;

const WRITING_PROMPT = (topic: string, testType: string) => `
You are an IELTS exam content creator. Generate IELTS ${testType} writing prompts for Task 1 and Task 2.

Topic theme: ${topic}

Generate a JSON response with this exact structure:
{
  "task1": {
    "title": "Task 1: ${testType === 'academic' ? 'Report Writing' : 'Letter Writing'}",
    "prompt": "<p class='mb-4'>Description of the task...</p><p class='mb-4'><strong>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</strong></p><p class='text-gray-600'>Write at least 150 words.</p>",
    "tips": [
      "Tip 1 for this task",
      "Tip 2 for this task",
      "Tip 3 for this task"
    ],
    "sampleAnswer": "A complete sample answer of 150-180 words demonstrating band 8-9 level writing."
  },
  "task2": {
    "title": "Task 2: Essay Writing",
    "prompt": "<p class='mb-4'><strong>Essay question statement here.</strong></p><p class='mb-4'><strong>Discuss both views and give your own opinion.</strong></p><p class='text-gray-600'>Write at least 250 words.</p>",
    "tips": [
      "Tip 1 for essay writing",
      "Tip 2 for essay writing",
      "Tip 3 for essay writing"
    ],
    "sampleAnswer": "A complete sample answer of 280-320 words demonstrating band 8-9 level writing with clear structure: introduction, body paragraphs, and conclusion."
  }
}

For Academic Task 1: Create a data description task (chart, graph, table, or process diagram description).
For General Task 1: Create a letter writing task (formal, semi-formal, or informal).
For Task 2: Create a discussion/opinion essay on a relevant topic.

Return ONLY valid JSON, no markdown or explanation.
`;

const SPEAKING_PROMPT = (topic: string, difficulty: string) => `
You are an IELTS exam content creator. Generate a complete IELTS speaking test with all 3 parts.

Topic theme: ${topic}
Difficulty: ${difficulty}

Generate a JSON response with this exact structure:
{
  "part1": {
    "title": "Part 1: Introduction & Interview",
    "instructions": "In this part, the examiner will ask you general questions about yourself and familiar topics.",
    "questions": [
      {
        "text": "Question 1 about the topic",
        "thinkTime": 3,
        "recordTime": 30
      },
      {
        "text": "Question 2 about the topic",
        "thinkTime": 3,
        "recordTime": 30
      },
      {
        "text": "Question 3 about the topic",
        "thinkTime": 3,
        "recordTime": 45
      },
      {
        "text": "Question 4 about the topic",
        "thinkTime": 3,
        "recordTime": 45
      }
    ]
  },
  "part2": {
    "title": "Part 2: Individual Long Turn",
    "instructions": "You will be given a topic card. You have 1 minute to prepare, then speak for 1-2 minutes.",
    "cueCard": {
      "topic": "Describe [something related to the topic]",
      "bulletPoints": [
        "What it is",
        "When/where you experienced it",
        "Why it is important to you",
        "And explain how it affected you"
      ],
      "prepTime": 60,
      "recordTime": 120
    }
  },
  "part3": {
    "title": "Part 3: Two-way Discussion",
    "instructions": "The examiner will ask you more abstract questions related to the Part 2 topic.",
    "questions": [
      {
        "text": "Abstract question 1 related to the topic",
        "thinkTime": 5,
        "recordTime": 60
      },
      {
        "text": "Abstract question 2 related to the topic",
        "thinkTime": 5,
        "recordTime": 60
      },
      {
        "text": "Abstract question 3 related to the topic",
        "thinkTime": 5,
        "recordTime": 60
      }
    ]
  }
}

Part 1 questions should be simple, personal questions.
Part 2 cue card should be a "Describe..." task with 4 bullet points.
Part 3 questions should be more abstract and analytical.

Return ONLY valid JSON, no markdown or explanation.
`;

async function callOpenAI(prompt: string): Promise<string> {
  // Try gpt-4o-mini first (faster and cheaper), fallback to gpt-3.5-turbo
  const models = ['gpt-4o-mini', 'gpt-3.5-turbo'];
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      console.log(`Trying OpenAI model: ${model}`);
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert IELTS exam content creator. Always respond with valid JSON only, no markdown formatting or explanations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = `OpenAI API error: ${response.status}`;
        try {
          const errorData = JSON.parse(responseText);
          console.error(`OpenAI API Error (${model}):`, errorData);
          errorMessage = errorData.error?.message || errorMessage;
        } catch {
          console.error(`OpenAI API Error (${model}):`, responseText.substring(0, 200));
        }
        lastError = new Error(errorMessage);
        continue; // Try next model
      }

      const data = JSON.parse(responseText);
      console.log(`Successfully used model: ${model}`);
      return data.choices[0].message.content;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Unknown error');
      console.error(`Error with model ${model}:`, lastError.message);
    }
  }

  throw lastError || new Error('All OpenAI models failed');
}

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an expert IELTS exam content creator. Always respond with valid JSON only, no markdown formatting or explanations.\n\n${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
          responseMimeType: 'application/json'
        }
      }),
    }
  );

  const responseText = await response.text();

  if (!response.ok) {
    let errorMessage = `Gemini API error: ${response.status}`;
    try {
      const errorData = JSON.parse(responseText);
      console.error('Gemini API Error:', errorData);
      errorMessage = `Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`;
    } catch {
      console.error('Gemini API Error (non-JSON):', responseText.substring(0, 200));
      errorMessage = `Gemini API error: ${response.status} - ${responseText.substring(0, 100) || 'Unknown error'}`;
    }
    throw new Error(errorMessage);
  }

  let data;
  try {
    data = JSON.parse(responseText);
  } catch {
    console.error('Gemini returned non-JSON response:', responseText.substring(0, 200));
    throw new Error('Gemini API returned an invalid response');
  }

  if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
    console.error('Unexpected Gemini response structure:', data);
    throw new Error('Invalid response structure from Gemini');
  }

  return data.candidates[0].content.parts[0].text;
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
  // Always return JSON
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!req.body) {
      console.error('Request body is empty or undefined');
      return res.status(400).json({ error: 'Request body is required' });
    }

    const body = req.body as Partial<GenerateRequest>;
    const moduleType = body.moduleType;
    const topic = body.topic || 'general knowledge';
    const difficulty = body.difficulty || 'medium';
    const testType = body.testType || 'academic';
    const provider = body.provider || 'openai';

    if (provider === 'openai' && !OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return res.status(500).json({ error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' });
    }

    if (provider === 'gemini' && !GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return res.status(500).json({ error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.' });
    }

    if (!moduleType || !['reading', 'listening', 'writing', 'speaking'].includes(moduleType)) {
      return res.status(400).json({ error: 'Invalid module type' });
    }

    console.log(`Generating ${moduleType} content with ${provider}, topic: ${topic}, difficulty: ${difficulty}`);
    let prompt: string;

    switch (moduleType) {
      case 'reading':
        prompt = READING_PROMPT(topic, difficulty, testType);
        break;
      case 'listening':
        prompt = LISTENING_PROMPT(topic, difficulty);
        break;
      case 'writing':
        prompt = WRITING_PROMPT(topic, testType);
        break;
      case 'speaking':
        prompt = SPEAKING_PROMPT(topic, difficulty);
        break;
      default:
        return res.status(400).json({ error: 'Invalid module type' });
    }

    const rawResponse = provider === 'gemini'
      ? await callGemini(prompt)
      : await callOpenAI(prompt);
    const cleanedResponse = cleanJsonResponse(rawResponse);

    let parsedContent;
    try {
      parsedContent = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', rawResponse);
      return res.status(500).json({
        error: 'Failed to parse AI response',
        rawResponse: cleanedResponse.substring(0, 500)
      });
    }

    return res.status(200).json({
      success: true,
      moduleType,
      content: parsedContent
    });

  } catch (error) {
    console.error('Content Generation Error:', error);
    // Ensure we always return valid JSON even on errors
    return res.status(500).json({ 
      success: false,
      error: 'Failed to generate content',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
