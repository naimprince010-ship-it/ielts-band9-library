import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkRateLimit, LIMITS } from "./_rateLimit.js";
import { cleanEnv } from "./_env.js";
import { requireStaff } from "./_staffAuth.js";
import { studyLessonBlueprintSchema } from "../src/lib/lessonBlueprint.js";

const GEMINI_API_KEY = cleanEnv(process.env.GEMINI_API_KEY);
const OPENAI_API_KEY = cleanEnv(process.env.OPENAI_API_KEY);

const promptFor = (
  type: string,
  topic: string,
  level: string,
) => `You are a senior IELTS curriculum designer and assessment-literate teacher. Create one complete ${type} study lesson about "${topic}" for ${level} learners.

Return ONLY valid JSON with this exact top-level structure:
{
  "title": "Professional lesson title",
  "description": "One precise sentence",
  "targetLevel": "Band range",
  "studyBlueprint": {
    "schemaVersion": 1,
    "objective": "Measurable lesson objective",
    "outcome": "What the learner can demonstrably do after the lesson",
    "estimatedMinutes": 45,
    "sourceNotes": ["Accurate assessment or curriculum basis"],
    "sections": []
  }
}

The sections array must contain, in a logical teaching order:
1. concept: {id,type,title,summary,points[at least 3]}
2. worked-example: {id,type,title,prompt,weakAnswer,strongAnswer,breakdown[at least 3]}
3. phrase-bank: {id,type,title,groups:[{label,items[at least 2]}]}
4. guided-practice: {id,type,title,instructions,items:[{prompt,modelAnswer,explanation}]}; at least 3 items
5. speaking-drill: {id,type,title,instructions,preparationSeconds,responseSeconds,questions[at least 3]}
6. self-check: {id,type,title,criteria[at least 4]}
7. assignment: {id,type,title,task,deliverable,successCriteria[at least 3]}

Quality rules:
- Teach a transferable skill, not motivational filler.
- Never invent official IELTS rules, scoring shortcuts, statistics, or guaranteed bands.
- State limitations carefully and use the four official Speaking criteria only when relevant.
- Worked examples must explain why the improved response is better.
- Practice must make the learner produce language, not only recognise answers.
- Use plain professional English. Do not use markdown. Do not include commentary outside JSON.`;

async function withGemini(prompt: string) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: "Return accurate, complete IELTS study lessons as valid JSON only.",
            },
          ],
        },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.25,
          maxOutputTokens: 14000,
          responseMimeType: "application/json",
        },
      }),
    },
  );
  if (!response.ok)
    throw new Error(`Gemini request failed with status ${response.status}`);
  const payload = await response.json();
  const text =
    payload.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("") || "";
  return JSON.parse(text);
}

async function withOpenAI(prompt: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Return accurate, complete IELTS study lessons as valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.25,
      max_tokens: 14000,
    }),
  });
  if (!response.ok)
    throw new Error(`OpenAI request failed with status ${response.status}`);
  const payload = await response.json();
  return JSON.parse(payload.choices?.[0]?.message?.content || "{}");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  if (!(await requireStaff(req, res))) return;
  if (!checkRateLimit(req, res, LIMITS.medium, "generate-study-lesson")) return;
  if (!GEMINI_API_KEY && !OPENAI_API_KEY)
    return res.status(500).json({ error: "No AI provider is configured" });

  const type = typeof req.body?.type === "string" ? req.body.type.trim() : "";
  const topic =
    typeof req.body?.topic === "string" ? req.body.topic.trim() : "";
  const level =
    typeof req.body?.level === "string"
      ? req.body.level.trim()
      : "intermediate";
  if (!type || !topic)
    return res
      .status(400)
      .json({ error: "Lesson type and topic are required" });

  try {
    const prompt = promptFor(type, topic, level);
    let generated: Record<string, unknown>;
    if (GEMINI_API_KEY) {
      try {
        generated = await withGemini(prompt);
      } catch (error) {
        if (!OPENAI_API_KEY) throw error;
        generated = await withOpenAI(prompt);
      }
    } else generated = await withOpenAI(prompt);

    const blueprint = studyLessonBlueprintSchema.safeParse(
      generated.studyBlueprint,
    );
    if (
      !blueprint.success ||
      typeof generated.title !== "string" ||
      typeof generated.description !== "string"
    ) {
      return res
        .status(502)
        .json({
          error: "AI returned an incomplete lesson blueprint",
          issues: blueprint.success ? [] : blueprint.error.issues,
        });
    }
    return res
      .status(200)
      .json({ ...generated, studyBlueprint: blueprint.data });
  } catch (error) {
    console.error("Study lesson generation error:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate the study lesson" });
  }
}
