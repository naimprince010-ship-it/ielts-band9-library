import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { validateStudyLessonBlueprint } from "../src/lib/lessonBlueprint.ts";

type LessonSpec = {
  slug: string;
  title: string;
  topic: string;
  level: "beginner" | "intermediate" | "advanced";
  description: string;
};

const SPEAKING_LESSONS: LessonSpec[] = [
  {
    slug: "speaking-class2-expansion-techniques",
    title: "Speaking Part 1: Extending Answers Clearly",
    topic:
      "Extending relevant IELTS Speaking Part 1 answers with a reason, detail, or example",
    level: "intermediate",
    description:
      "Build clear, natural Part 1 answers by developing one relevant idea with support.",
  },
  {
    slug: "speaking-class3-cuecard-storytelling",
    title: "Speaking Part 2: Planning and Story Structure",
    topic:
      "Using the one-minute IELTS Speaking Part 2 preparation time to plan a coherent 1–2 minute cue-card response",
    level: "intermediate",
    description:
      "Plan a clear cue-card response and deliver it with a logical beginning, development, and ending.",
  },
  {
    slug: "speaking-class4-part2-logic",
    title: "Speaking Part 2: Developing Details and Timing",
    topic:
      "Developing specific details and controlling timing in an IELTS Speaking Part 2 cue-card response",
    level: "intermediate",
    description:
      "Develop a cue-card response with specific detail, sequencing, and a controlled ending.",
  },
  {
    slug: "speaking-class5-part3-analysis",
    title: "Speaking Part 3: Developing Analytical Answers",
    topic:
      "Developing analytical IELTS Speaking Part 3 answers through claims, reasons, comparisons, and examples",
    level: "advanced",
    description:
      "Develop and justify clear ideas in an extended Part 3 discussion.",
  },
  {
    slug: "speaking-class6-mocks-delivery",
    title: "Speaking: Pronunciation, Delivery and Mock Reflection",
    topic:
      "Improving intelligibility, word stress, sentence stress, intonation, and self-review for IELTS Speaking",
    level: "advanced",
    description:
      "Use a focused delivery checklist to make spoken answers easier to follow and review.",
  },
];

function loadEnv(path: string) {
  try {
    for (const line of readFileSync(path, "utf8")
      .replace(/\uFEFF/g, "")
      .split(/\r?\n/)) {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
    }
  } catch {
    /* optional local environment file */
  }
}

function cleanEnv(value: string | undefined) {
  return (value || "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/(?:\uFEFF|\\uFEFF)/g, "");
}

function promptFor(spec: LessonSpec) {
  return `You are a senior IELTS curriculum designer and assessment-literate teacher. Create one complete IELTS Speaking study lesson.

Locked lesson title: "${spec.title}"
Topic: "${spec.topic}"
Learner level: ${spec.level}

Return ONLY valid JSON in this exact structure:
{
  "title": "${spec.title}",
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

The sections array must contain this exact teaching sequence and stay concise enough for a 45-minute lesson:
1. concept: id, type, title, summary, points (at least 2)
2. worked-example: id, type, title, prompt, weakAnswer, strongAnswer, breakdown (at least 3)
3. phrase-bank: id, type, title, groups with label and at least 2 items
4. guided-practice: id, type, title, instructions, at least 2 items with prompt, modelAnswer, explanation
5. speaking-drill: id, type, title, instructions, preparationSeconds, responseSeconds, at least 3 questions
6. self-check: id, type, title, at least 3 criteria
7. assignment: id, type, title, task, deliverable, at least 3 successCriteria

Accuracy rules:
- Teach a transferable skill with learner production; do not write motivational filler.
- IELTS Speaking has three parts. Part 2 has one minute to prepare and 1–2 minutes to speak. Do not invent any other official timing or scoring rule.
- Only use these official Speaking criteria when relevant: fluency and coherence, lexical resource, grammatical range and accuracy, pronunciation.
- No guaranteed band scores, shortcuts, fake statistics, or claims that eye contact/body language is assessed.
- Worked examples must explain why the improved response is better, without calling it a Band 9 answer.
- Use plain professional English. Do not use markdown. Do not add commentary outside the JSON.`;
}

async function generateWithGemini(apiKey: string, prompt: string) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: "Return accurate, complete IELTS Speaking study lessons as valid JSON only.",
            },
          ],
        },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 4000,
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

async function generateWithOpenAI(apiKey: string, prompt: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Return accurate, complete IELTS Speaking study lessons as valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_tokens: 14000,
    }),
  });
  if (!response.ok)
    throw new Error(`OpenAI request failed with status ${response.status}`);
  const payload = await response.json();
  return JSON.parse(payload.choices?.[0]?.message?.content || "{}");
}

async function main() {
  if (process.env.E2E_ENV_FILE) loadEnv(process.env.E2E_ENV_FILE);
  loadEnv(".env.local");
  loadEnv(".env.development.local");

  const geminiKey = cleanEnv(process.env.GEMINI_API_KEY);
  const openAIKey = cleanEnv(process.env.OPENAI_API_KEY);
  const url = cleanEnv(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  );
  const serviceRoleKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const apply = process.argv.includes("--apply");
  const onlySlug = process.argv
    .find((arg) => arg.startsWith("--only="))
    ?.slice("--only=".length);

  if (!geminiKey && !openAIKey)
    throw new Error("GEMINI_API_KEY or OPENAI_API_KEY is required");
  if (apply && (!url || !serviceRoleKey))
    throw new Error(
      "Supabase URL and service role key are required with --apply",
    );

  const lessons = onlySlug
    ? SPEAKING_LESSONS.filter((lesson) => lesson.slug === onlySlug)
    : SPEAKING_LESSONS;
  if (!lessons.length)
    throw new Error("No matching Speaking lesson specification was found");

  const supabase = apply
    ? createClient(url, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : undefined;
  const result: {
    slug: string;
    title: string;
    sections: number;
    action: "validated" | "saved-for-review";
  }[] = [];

  for (const spec of lessons) {
    const prompt = promptFor(spec);
    let generated: Record<string, unknown>;
    try {
      generated = geminiKey
        ? await generateWithGemini(geminiKey, prompt)
        : await generateWithOpenAI(openAIKey, prompt);
    } catch (geminiError) {
      if (!openAIKey) throw geminiError;
      generated = await generateWithOpenAI(openAIKey, prompt);
    }
    const blueprint = validateStudyLessonBlueprint(generated.studyBlueprint);
    if (!blueprint.success)
      throw new Error(
        `${spec.slug}: generated blueprint failed validation: ${blueprint.error.message}`,
      );
    if (
      typeof generated.description !== "string" ||
      !generated.description.trim()
    )
      throw new Error(`${spec.slug}: AI response omitted the description`);

    if (supabase) {
      const { data: existing, error: lookupError } = await supabase
        .from("lessons")
        .select("id")
        .eq("slug", spec.slug)
        .maybeSingle();
      if (lookupError)
        throw new Error(`${spec.slug}: lookup failed: ${lookupError.message}`);

      const content = {
        title: spec.title,
        targetLevel:
          typeof generated.targetLevel === "string"
            ? generated.targetLevel
            : spec.level,
        whatYouWillLearn: [blueprint.data.objective, blueprint.data.outcome],
        coreExplanation: "",
        examples: [],
        commonMistakes: [],
        miniPractice: [],
        answerKey: [],
        quickRecap: blueprint.data.outcome,
        studyBlueprint: blueprint.data,
      };
      const row = {
        ...(existing?.id ? { id: existing.id } : {}),
        title: spec.title,
        slug: spec.slug,
        type: "speaking",
        level: spec.level,
        topic: spec.topic,
        description: generated.description.trim(),
        content,
        is_premium: true,
        is_published: false,
        blueprint_version: blueprint.data.schemaVersion,
        content_status: "in_review",
        quality_report: {
          schemaValid: true,
          generatedBy: "gemini-2.5-flash",
          curriculumBaseline: "2026-09-01",
          humanReviewComplete: false,
          requiredReview: [
            "IELTS accuracy",
            "model answer quality",
            "practice answer keys",
            "student-facing wording",
          ],
        },
        updated_at: new Date().toISOString(),
      };
      const { error: saveError } = await supabase
        .from("lessons")
        .upsert(row, { onConflict: "slug" });
      if (saveError)
        throw new Error(
          `${spec.slug}: draft save failed: ${saveError.message}`,
        );
    }

    result.push({
      slug: spec.slug,
      title: spec.title,
      sections: blueprint.data.sections.length,
      action: supabase ? "saved-for-review" : "validated",
    });
  }

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
