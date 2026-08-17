import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';
import { requireStaff } from './_staffAuth.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

interface TopicCount {
  topic: string;
  count: number;
}

interface RecommendationResponse {
  recommendedTopic: string;
  rationale: string;
  isCustomTopic: boolean;
  topicCounts: TopicCount[];
  missingTopics: string[];
  totalWords: number;
}

const EXPECTED_IELTS_TOPICS = [
  'Academic Writing',
  'Scientific Research',
  'Business & Economics',
  'Technology & Innovation',
  'Environment & Sustainability',
  'Health & Medicine',
  'Education & Learning',
  'Social Issues',
  'Politics & Government',
  'Arts & Culture',
  'Psychology & Behavior',
  'Law & Justice',
  'Media & Communication',
  'Urban Development',
  'Philosophy & Ethics',
  'History & Civilization',
  'Sports & Recreation',
  'Travel & Tourism',
  'Food & Nutrition',
  'Architecture & Design',
];

const RECOMMENDATION_PROMPT = (topicCounts: TopicCount[], missingTopics: string[], totalWords: number) => `
You are an IELTS vocabulary expert. Analyze the current vocabulary database coverage and recommend the best topic to add more words.

Current Database Status:
- Total words: ${totalWords}
- Target: 7000 words
- Words needed: ${7000 - totalWords}

Topic Coverage (words per topic):
${topicCounts.map(t => `- ${t.topic}: ${t.count} words`).join('\n')}

Missing Topics (0 words):
${missingTopics.length > 0 ? missingTopics.map(t => `- ${t}`).join('\n') : 'None - all topics have some coverage'}

Based on this analysis, recommend ONE topic that should be prioritized for adding more vocabulary words. Consider:
1. Topics with very low coverage compared to others
2. Topics that are most important for IELTS Band 7-9 preparation
3. Missing topics that are essential for academic English

Respond with a JSON object:
{
  "recommendedTopic": "Topic Name",
  "rationale": "Brief explanation in 1-2 sentences why this topic should be prioritized",
  "suggestCustomTopic": false,
  "customTopicSuggestion": null
}

If you think a completely new topic (not in the list) would be valuable for IELTS preparation, set suggestCustomTopic to true and provide the topic name in customTopicSuggestion.

Return ONLY valid JSON, no markdown or explanation.
`;

async function callOpenAI(prompt: string): Promise<string> {
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
          content: 'You are an IELTS vocabulary expert. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('OpenAI API Error:', errorData);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!(await requireStaff(req, res))) return;

  if (!checkRateLimit(req, res, LIMITS.light, 'recommend-topic')) return;

  try {
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.error('Supabase credentials not configured');
      return res.status(500).json({ error: 'Supabase credentials not configured' });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Get all words with their topics
    const { data: words, error: fetchError } = await supabase
      .from('vocabulary')
      .select('topic');

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return res.status(500).json({ error: 'Failed to fetch vocabulary data' });
    }

    const totalWords = words?.length || 0;

    // Count words per topic
    const topicCountMap = new Map<string, number>();
    for (const word of words || []) {
      const topic = word.topic || 'Unknown';
      topicCountMap.set(topic, (topicCountMap.get(topic) || 0) + 1);
    }

    // Convert to array and sort by count
    const topicCounts: TopicCount[] = Array.from(topicCountMap.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count);

    // Find missing topics
    const existingTopics = new Set(topicCountMap.keys());
    const missingTopics = EXPECTED_IELTS_TOPICS.filter(t => !existingTopics.has(t));

    // If there are missing topics, recommend the first one without calling OpenAI
    if (missingTopics.length > 0) {
      const response: RecommendationResponse = {
        recommendedTopic: missingTopics[0],
        rationale: `This topic has no vocabulary words yet. Adding words for "${missingTopics[0]}" will improve IELTS topic coverage.`,
        isCustomTopic: false,
        topicCounts,
        missingTopics,
        totalWords,
      };
      return res.status(200).json(response);
    }

    // Find the topic with lowest count
    const lowestCountTopic = topicCounts[topicCounts.length - 1];
    
    // If the lowest topic has significantly fewer words, recommend it without OpenAI
    const averageCount = totalWords / topicCounts.length;
    if (lowestCountTopic && lowestCountTopic.count < averageCount * 0.5) {
      const response: RecommendationResponse = {
        recommendedTopic: lowestCountTopic.topic,
        rationale: `This topic has only ${lowestCountTopic.count} words, which is below average (${Math.round(averageCount)} words per topic). Adding more words will balance the vocabulary coverage.`,
        isCustomTopic: false,
        topicCounts,
        missingTopics,
        totalWords,
      };
      return res.status(200).json(response);
    }

    // Use OpenAI for more nuanced recommendation
    console.log('Calling OpenAI for topic recommendation...');
    const prompt = RECOMMENDATION_PROMPT(topicCounts, missingTopics, totalWords);
    const rawResponse = await callOpenAI(prompt);
    const cleanedResponse = cleanJsonResponse(rawResponse);

    let aiRecommendation;
    try {
      aiRecommendation = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      // Fallback to lowest count topic
      const response: RecommendationResponse = {
        recommendedTopic: lowestCountTopic?.topic || EXPECTED_IELTS_TOPICS[0],
        rationale: 'AI recommendation unavailable. Selecting topic with lowest word count.',
        isCustomTopic: false,
        topicCounts,
        missingTopics,
        totalWords,
      };
      return res.status(200).json(response);
    }

    const response: RecommendationResponse = {
      recommendedTopic: aiRecommendation.suggestCustomTopic 
        ? aiRecommendation.customTopicSuggestion 
        : aiRecommendation.recommendedTopic,
      rationale: aiRecommendation.rationale,
      isCustomTopic: aiRecommendation.suggestCustomTopic || false,
      topicCounts,
      missingTopics,
      totalWords,
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Topic Recommendation Error:', error);
    return res.status(500).json({ 
      error: 'Failed to get topic recommendation',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

