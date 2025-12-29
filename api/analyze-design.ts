import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface AnalyzeRequest {
  image: {
    data: string;
    mimeType: string;
  };
  pageName?: string;
}

const DESIGN_AUDIT_PROMPT = `You are a Senior UI/UX Designer specializing in EdTech platforms and modern web design. Analyze this screenshot of an IELTS learning platform.

Provide a detailed UI/UX audit with the following structure:

1. **Overall Assessment** (2-3 sentences about the current design)

2. **5 Specific CSS/Tailwind Improvements**
For each improvement, provide:
- Issue: What's wrong
- Solution: How to fix it
- Tailwind Classes: Exact classes to use

3. **Color & Typography Suggestions**
- Current issues with colors/fonts
- Recommended changes with specific values

4. **Spacing & Layout Issues**
- Problems with padding, margins, or layout
- Specific Tailwind spacing classes to use

5. **Accessibility Concerns**
- Any accessibility issues spotted
- How to fix them

6. **Quick Wins** (3 easy changes that would make the biggest impact)

Format your response as JSON with this structure:
{
  "overallAssessment": "string",
  "improvements": [
    {
      "issue": "string",
      "solution": "string",
      "tailwindClasses": "string",
      "priority": "high" | "medium" | "low"
    }
  ],
  "colorTypography": {
    "issues": ["string"],
    "recommendations": ["string"]
  },
  "spacingLayout": {
    "issues": ["string"],
    "recommendations": ["string"]
  },
  "accessibility": {
    "issues": ["string"],
    "fixes": ["string"]
  },
  "quickWins": [
    {
      "change": "string",
      "impact": "string",
      "implementation": "string"
    }
  ]
}

Return ONLY valid JSON, no markdown or explanation.`;

async function callGeminiVision(imageData: string, mimeType: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                text: DESIGN_AUDIT_PROMPT
              },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: imageData
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4000,
          responseMimeType: 'application/json'
        }
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Gemini Vision API Error:', errorData);
    throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ 
      error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.' 
    });
  }

  const { image, pageName } = req.body as AnalyzeRequest;

  if (!image || !image.data || !image.mimeType) {
    return res.status(400).json({ error: 'Image data is required' });
  }

  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
  if (!allowedMimeTypes.includes(image.mimeType)) {
    return res.status(400).json({ 
      error: `Invalid image type. Allowed types: ${allowedMimeTypes.join(', ')}` 
    });
  }

  const base64Size = (image.data.length * 3) / 4;
  const maxSize = 4 * 1024 * 1024;
  if (base64Size > maxSize) {
    return res.status(400).json({ 
      error: 'Image too large. Please upload an image smaller than 4MB.' 
    });
  }

  try {
    console.log(`Analyzing design for page: ${pageName || 'Unknown'}`);
    
    const rawResponse = await callGeminiVision(image.data, image.mimeType);
    const cleanedResponse = cleanJsonResponse(rawResponse);
    
    let parsedContent;
    try {
      parsedContent = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', rawResponse.substring(0, 500));
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        rawResponse: cleanedResponse.substring(0, 1000)
      });
    }

    return res.status(200).json({
      success: true,
      pageName: pageName || 'Unknown Page',
      analysis: parsedContent,
      analyzedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Design Analysis Error:', error);
    return res.status(500).json({ 
      error: 'Failed to analyze design',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
