import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { jsonrepair } from 'jsonrepair';

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
  passageNumber?: number; // 1, 2, or 3 for reading
  sectionNumber?: number; // 1, 2, 3, or 4 for listening
  taskNumber?: number;    // 1 or 2 for writing
  partNumber?: number;    // 1, 2, or 3 for speaking
}

const WRITING_TASK_PROMPT = (topic: string, testType: string, taskNumber: number) => `
You are an IELTS exam content creator. Generate Task ${taskNumber} for an IELTS ${testType} writing test.

Topic theme: ${topic}

Generate a JSON response with this exact structure:
{
  "taskNumber": ${taskNumber},
  "title": "Task ${taskNumber}: ${taskNumber === 1 ? (testType === 'academic' ? 'Report Writing' : 'Letter Writing') : 'Essay Writing'}",
  "prompt": "<p class='mb-4'>Task prompt here...</p><p class='mb-4'><strong>Instruction in bold.</strong></p><p class='text-gray-600'>Write at least ${taskNumber === 1 ? '150' : '250'} words.</p>",
  "tips": [
    "Tip 1",
    "Tip 2",
    "Tip 3"
  ],
  "sampleAnswer": "A complete sample answer demonstrating band 8-9 level writing."
}

Requirements:
- Task 1 Academic: Chart, graph, table, or process.
- Task 1 General: Formal/Informal letter.
- Task 2: Opinion/Discussion essay.
Return ONLY valid JSON.
`;

const SPEAKING_PART_PROMPT = (topic: string, difficulty: string, partNumber: number) => `
You are an IELTS exam content creator. Generate Part ${partNumber} for an IELTS speaking test.

Topic theme: ${topic}
Difficulty: ${difficulty}

Generate a JSON response with this exact structure:
${partNumber === 1 ? `
{
  "partNumber": 1,
  "title": "Part 1: Introduction & Interview",
  "instructions": "Examiner asks general questions about familiar topics.",
  "questions": [
    { "text": "Question 1", "thinkTime": 3, "recordTime": 30 },
    { "text": "Question 2", "thinkTime": 3, "recordTime": 30 },
    { "text": "Question 3", "thinkTime": 3, "recordTime": 45 },
    { "text": "Question 4", "thinkTime": 3, "recordTime": 45 }
  ]
}` : partNumber === 2 ? `
{
  "partNumber": 2,
  "title": "Part 2: Individual Long Turn",
  "instructions": "You have 1 minute to prepare, then speak for 1-2 minutes.",
  "cueCard": {
    "topic": "Describe [topic related task]",
    "bulletPoints": ["Point 1", "Point 2", "Point 3", "Point 4"],
    "prepTime": 60,
    "recordTime": 120
  }
}` : `
{
  "partNumber": 3,
  "title": "Part 3: Two-way Discussion",
  "instructions": "Abstract questions related to Part 2.",
  "questions": [
    { "text": "Abstract Question 1", "thinkTime": 5, "recordTime": 60 },
    { "text": "Abstract Question 2", "thinkTime": 5, "recordTime": 60 },
    { "text": "Abstract Question 3", "thinkTime": 5, "recordTime": 60 }
  ]
}`}

Return ONLY valid JSON.
`;

const LISTENING_SECTION_PROMPT = (topic: string, difficulty: string, testType: string, sectionNumber: number) => `
You are an IELTS exam content creator. Generate Section ${sectionNumber} for an IELTS listening test.

Topic Theme: ${topic}
Difficulty: ${difficulty}

Generate a JSON response with this exact structure:
{
  "sectionNumber": ${sectionNumber},
  "title": "Section ${sectionNumber} Title",
  "transcript": "Full audio transcript for Section ${sectionNumber}. Use <p class='mb-4'> format.",
  "questions": [
    {
      "questionNumber": ${((sectionNumber - 1) * 10) + 1},
      "type": "multiple-choice",
      "questionText": "A specific question about the audio content?",
      "options": ["A. Option one", "B. Option two", "C. Option three"],
      "correctAnswer": "A. Option one",
      "explanation": "Brief explanation"
    },
    {
      "questionNumber": ${((sectionNumber - 1) * 10) + 2},
      "type": "table-completion",
      "groupId": "table-1",
      "questionText": "Complete the booking details table.",
      "tableData": { "headers": ["Customer Name", "Date", "Event"], "rows": [{ "cells": ["John Smith", "[Q${((sectionNumber - 1) * 10) + 2}]", "[Q${((sectionNumber - 1) * 10) + 3}]"] }] },
      "correctAnswer": "12th May"
    },
    {
      "questionNumber": ${((sectionNumber - 1) * 10) + 3},
      "type": "table-completion",
      "groupId": "table-1",
      "questionText": "Event type: ___",
      "correctAnswer": "Concert"
    }
  ]
}

Question Count: Generate exactly 10 questions for this section (Questions ${((sectionNumber - 1) * 10) + 1} to ${sectionNumber * 10}).

CRITICAL RULES FOR questionText:
- Every question MUST have a UNIQUE, SPECIFIC questionText — NEVER repeat the same text across questions.
- For MCQ/True-False: write the full question sentence ending with "?".
- For table-completion FIRST question (with tableData): write a brief title like "Complete the table about [subject]."
- For table-completion SUBSEQUENT questions (same groupId, no tableData): write the column label and blank, e.g. "Date of arrival: ___" or "Payment method: ___".
- For summary-completion FIRST question (with summaryData): write "Complete the summary about [subject]."
- For summary-completion SUBSEQUENT questions: copy the exact sentence fragment from summaryData that contains their [Q<n>] placeholder, replacing [Q<n>] with ___, e.g. "The first step involves ___."
- For fill-blank: write a complete sentence with ___ marking the blank, e.g. "The factory produces ___ tonnes per year."

IMPORTANT: If using table-completion or summary-completion, use the "groupId" field to group them. The first question MUST include "tableData" (structured headers and rows with cells containing [Q<number>] placeholders) or "summaryData" (a string with [Q<number>] placeholders).
Return ONLY valid JSON.
`;

const READING_PASSAGE_PROMPT = (topic: string, difficulty: string, testType: string, passageNumber: number) => `
You are an IELTS exam content creator. Generate Passage ${passageNumber} for an IELTS ${testType} reading test.

Topic Theme: ${topic}
Difficulty: ${difficulty}

Generate a JSON response with this exact structure:
{
  "passageNumber": ${passageNumber},
  "title": "Title for Passage ${passageNumber}",
  "textContent": "Full passage text (700-800 words) with multiple paragraphs. Use <p class='mb-4'><strong>A</strong> ... </p> format.",
  "questions": [
    {
      "type": "true-false-not-given",
      "questionText": "A specific factual statement from the passage that students must verify.",
      "options": ["TRUE", "FALSE", "NOT GIVEN"],
      "correctAnswer": "TRUE",
      "explanation": "Brief explanation of why this is TRUE/FALSE/NOT GIVEN"
    },
    {
      "type": "summary-completion",
      "groupId": "summary-1",
      "questionText": "Complete the summary about coffee's origins.",
      "summaryData": "Coffee was first discovered in [Q2] by a goat herder. He took it to a [Q3] where they prepared a drink.",
      "correctAnswer": "Ethiopia"
    },
    {
      "type": "summary-completion",
      "groupId": "summary-1",
      "questionText": "He took it to a ___ where they prepared a drink.",
      "correctAnswer": "monastery"
    }
  ]
}

Question Count Requirements:
- If Passage 1 or 2: Generate exactly 13 questions.
- If Passage 3: Generate exactly 14 questions.

Mix question types: mcq, true-false-not-given, matching-headings, fill-blank, table-completion, summary-completion.

CRITICAL RULES FOR questionText:
- Every question MUST have a UNIQUE, SPECIFIC questionText — NEVER repeat the same text across questions.
- For true-false-not-given: write a complete factual statement to evaluate, e.g. "Scientists discovered coffee in the 9th century."
- For mcq: write a clear question ending with "?", e.g. "What is the main reason coffee became popular in Europe?"
- For matching-headings: write "Match the paragraph heading: [paragraph letter/number]" e.g. "Choose the correct heading for Paragraph B."
- For fill-blank: write a sentence from the passage with ___ for the missing word, e.g. "The researchers found ___ species of birds in the region."
- For table-completion FIRST question (with tableData): write a brief title like "Complete the table about [subject]."
- For table-completion SUBSEQUENT questions (same groupId, no tableData): write the column label and blank, e.g. "Year of discovery: ___" or "Country of origin: ___".
- For summary-completion FIRST question (with summaryData): write "Complete the summary about [subject]."
- For summary-completion SUBSEQUENT questions: copy the exact sentence fragment from summaryData containing their [Q<n>] placeholder, replacing [Q<n>] with ___, e.g. "The substance is produced in ___."

IMPORTANT: If using table-completion or summary-completion, use "groupId" to group them. The first question MUST include "tableData" or "summaryData".
Return ONLY valid JSON.
`;

const READING_PROMPT = (topic: string, difficulty: string, testType: string) => `
You are an IELTS exam content creator. Generate a full IELTS ${testType} reading test.

Topic: ${topic}
Difficulty: ${difficulty}

Return ONLY raw valid JSON (no markdown, no code fences, no extra text).
The JSON must match this schema precisely:

{
  "passages": [
    {
      "passageNumber": 1,
      "title": "<title of passage 1>",
      "textContent": "<full passage 1 text in HTML, 700-900 words, each paragraph in <p class='mb-4'>...</p> tags>",
      "questions": [
        { "type": "true-false-not-given", "questionText": "<statement>", "options": ["TRUE", "FALSE", "NOT GIVEN"], "correctAnswer": "TRUE", "explanation": "<reason>" },
        { "type": "mcq", "questionText": "<question>?", "options": ["A", "B", "C", "D"], "correctAnswer": "A", "explanation": "<reason>" },
        { "type": "summary-completion", "groupId": "summary-1", "questionText": "Complete the summary below.", "summaryData": "The process begins with [Q3]. Then it moves to [Q4].", "correctAnswer": "washing" },
        { "type": "summary-completion", "groupId": "summary-1", "questionText": "Complete the summary below.", "correctAnswer": "drying" }
      ]
    },
    {
      "passageNumber": 2,
      "title": "<title of passage 2>",
      "textContent": "<full passage 2 text in HTML, 700-900 words>",
      "questions": []
    },
    {
      "passageNumber": 3,
      "title": "<title of passage 3>",
      "textContent": "<full passage 3 text in HTML, 700-900 words>",
      "questions": []
    }
  ]
}

RULES:
- Replace ALL angle-bracket placeholders above with real, generated content
- Passage 1: exactly 13 questions
- Passage 2: exactly 13 questions  
- Passage 3: exactly 14 questions
- Total: exactly 40 questions
- Mix types: true-false-not-given, mcq, fill-blank, summary-completion, table-completion
- For table-completion or summary-completion, use "groupId" to group them. The first question MUST include "tableData" (headers and rows with cells containing [Q<number>] placeholders) or "summaryData" (a string with [Q<number>] placeholders).
- Questions must be based on the actual passage content.

CRITICAL RULES FOR questionText — every question MUST have a UNIQUE, SPECIFIC questionText:
- true-false-not-given: a complete factual statement to verify, e.g. "The author argues that technology has improved education."
- mcq: a clear question ending with "?", e.g. "According to paragraph C, what caused the decline?"
- fill-blank: a sentence with ___ for the blank, e.g. "The process requires ___ degrees of heat."
- table-completion FIRST (has tableData): short title, e.g. "Complete the table about research findings."
- table-completion SUBSEQUENT (same groupId, no tableData): column-label + blank, e.g. "Year published: ___"
- summary-completion FIRST (has summaryData): short title, e.g. "Complete the summary about the experiment."
- summary-completion SUBSEQUENT: the exact sentence fragment from summaryData for that blank, with [Q<n>] replaced by ___, e.g. "The samples were collected from ___."

Output ONLY the JSON object, nothing else.
`;

const LISTENING_PROMPT = (topic: string, difficulty: string) => `
You are an IELTS exam content creator. Generate a full IELTS listening test with exactly 4 sections and exactly 40 questions total (10 per section).

Topic: ${topic}
Difficulty: ${difficulty}

Return ONLY raw valid JSON (no markdown, no code fences, no extra text).
Use REAL NAMES for speakers (e.g. 'Alice:', 'John:', 'Professor Smith:') - NEVER use 'Speaker 1:' or 'Speaker 2:'.

The JSON must match this schema precisely:

{
  "transcript": "<combined transcript of all 4 parts, 1500-2000 words>",
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Part 1: <actual title>",
      "transcript": "<transcript text for Part 1 only>",
      "questions": [
        { "type": "table-completion", "groupId": "table-1", "questionText": "Complete the table below.", "tableData": { "headers": ["Name"], "rows": [{ "cells": ["[Q1]"] }] }, "correctAnswer": "John" },
        { "type": "mcq", "questionText": "<question>?", "options": ["A", "B", "C", "D"], "correctAnswer": "A" }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Part 2: <actual title>",
      "transcript": "<transcript text for Part 2 only>",
      "questions": []
    },
    {
      "sectionNumber": 3,
      "title": "Part 3: <actual title>",
      "transcript": "<transcript text for Part 3 only>",
      "questions": []
    },
    {
      "sectionNumber": 4,
      "title": "Part 4: <actual title>",
      "transcript": "<transcript text for Part 4 only>",
      "questions": []
    }
  ]
}

RULES:
- Replace ALL angle-bracket placeholders with real generated content
- Part 1: Conversation (social context, e.g. booking, registration) — exactly 10 questions
- Part 2: Monologue (local facility or service) — exactly 10 questions
- Part 3: Academic conversation (students discussing assignment) — exactly 10 questions
- Part 4: Academic lecture — exactly 10 questions
- Total: exactly 40 questions
- Mix types: table-completion, summary-completion, mcq, fill-blank
- For table-completion or summary-completion, use "groupId" to group them. The first question MUST include "tableData" (headers and rows with cells containing [Q<number>] placeholders) or "summaryData" (a string with [Q<number>] placeholders).

CRITICAL RULES FOR questionText — every question MUST have a UNIQUE, SPECIFIC questionText:
- mcq: a complete question ending with "?", e.g. "Why does the speaker recommend this option?"
- fill-blank: sentence with ___ marking the blank, e.g. "The tour departs at ___ each morning."
- table-completion FIRST (has tableData): brief title, e.g. "Complete the registration form."
- table-completion SUBSEQUENT (same groupId, no tableData): the specific column label + blank, e.g. "Phone number: ___" or "Departure date: ___"
- summary-completion FIRST (has summaryData): brief title, e.g. "Complete the notes about the lecture."
- summary-completion SUBSEQUENT: exact sentence fragment from summaryData for that blank, replacing [Q<n>] with ___, e.g. "The main cause is ___."

Output ONLY the JSON object, nothing else
`;

const WRITING_PROMPT = (topic: string, testType: string) => `
You are an IELTS exam content creator. Generate IELTS ${testType} writing prompts for Task 1 and Task 2.

Topic theme: ${topic}

${testType === 'academic' ? `For Academic Task 1, choose the MOST APPROPRIATE visual type for "${topic}" from these 5 options:
1. "line" chart (chartData) — for trends over time (years/decades)
2. "bar" chart (chartData) — for comparing quantities across categories
3. "pie" chart (chartData) — for proportions/percentages of a whole
4. "table" (tableData) — for detailed multi-row/column data comparisons
5. "process" (processData) — for stages of production, manufacturing, or natural cycles
6. "map" (mapData) — for how a location changes over time (before/after town/building plans)

Return task1 with EXACTLY ONE visual field (chartData, tableData, processData, OR mapData).

JSON schema for each visual type:

chartData (line/bar/pie):
{
  "type": "line",
  "title": "Internet Usage in 5 Countries (2000–2020)",
  "description": "Percentage (%) of population",
  "labels": ["2000", "2005", "2010", "2015", "2020"],
  "unit": "%", "yMin": 0, "yMax": 100,
  "datasets": [
    { "label": "UK", "data": [30, 52, 70, 84, 92] },
    { "label": "India", "data": [2, 5, 18, 38, 65] }
  ]
}
For pie: datasets has ONE entry, data[] = values for each label[], labels[] = slice names.

tableData:
{
  "type": "table",
  "title": "Average Household Expenditure by Category (2000–2020)",
  "unit": "%",
  "headers": ["Category", "2000", "2010", "2020"],
  "rows": [
    ["Food", "35", "28", "22"],
    ["Housing", "20", "25", "30"],
    ["Transport", "15", "17", "19"]
  ]
}

processData:
{
  "type": "process",
  "title": "The Process of Coffee Production",
  "isCircular": false,
  "steps": [
    { "label": "Cherries Harvested", "shape": "oval", "description": "Ripe cherries picked by hand" },
    { "label": "Pulping", "shape": "rect", "description": "Skin and pulp removed" },
    { "label": "Fermentation", "shape": "rect", "description": "48–72 hours in water" },
    { "label": "Drying", "shape": "rect" },
    { "label": "Roasting", "shape": "rect" },
    { "label": "Packaging & Export", "shape": "oval" }
  ]
}
shape: "oval"=Start/End, "rect"=Process step, "diamond"=Decision. Use "isCircular": true for cyclic processes (e.g. water cycle).

mapData:
{
  "type": "map",
  "title": "Changes to Greenfield Town (1990 and 2020)",
  "description": "The maps show how the town developed over 30 years.",
  "plans": [
    {
      "label": "1990 (Before)",
      "zones": [
        { "label": "Park", "row": 1, "col": 1, "color": "#86efac" },
        { "label": "Farm", "row": 1, "col": 2, "color": "#fde68a" },
        { "label": "Houses", "row": 2, "col": 1, "color": "#fda4af" },
        { "label": "River", "row": 3, "col": 1, "colSpan": 2, "color": "#93c5fd" }
      ]
    },
    {
      "label": "2020 (After)",
      "zones": [
        { "label": "Car Park", "row": 1, "col": 1, "color": "#e2e8f0" },
        { "label": "Mall", "row": 1, "col": 2, "color": "#fdba74" },
        { "label": "Hotel", "row": 2, "col": 1, "color": "#fbbf24" },
        { "label": "Office", "row": 2, "col": 2, "color": "#93c5fd" },
        { "label": "River", "row": 3, "col": 1, "colSpan": 2, "color": "#93c5fd" }
      ]
    }
  ]
}
Map zones: row/col are 1-indexed grid positions. Use rowSpan/colSpan for zones spanning multiple cells.

Now generate a JSON response with this EXACT structure:
{
  "task1": {
    "title": "Task 1: Report Writing",
    "prompt": "<p class='mb-4'>The [chart/table/diagram/map] below shows [description].</p><p class='mb-4'><strong>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</strong></p><p class='text-gray-600'>Write at least 150 words.</p>",
    "<chartData OR tableData OR processData OR mapData>": { ... },
    "tips": ["Tip 1","Tip 2","Tip 3"],
    "sampleAnswer": "A complete sample answer of 160-200 words at band 8-9 level."
  },
  "task2": {
    "title": "Task 2: Essay Writing",
    "prompt": "<p class='mb-4'><strong>Essay question statement.</strong></p><p class='mb-4'><strong>Discuss both views and give your own opinion.</strong></p><p class='text-gray-600'>Write at least 250 words.</p>",
    "tips": ["Tip 1","Tip 2","Tip 3"],
    "sampleAnswer": "A complete sample answer of 280-320 words."
  }
}

RULES:
- Include ONLY ONE of: chartData, tableData, processData, mapData in task1
- Do NOT include chartData in task2
- For the prompt text, describe the visual accurately
- Return ONLY valid JSON, no markdown or explanation.` : `For General Training Task 1, create a letter writing task (no chart needed).

Generate a JSON response with this EXACT structure:
{
  "task1": {
    "title": "Task 1: Letter Writing",
    "prompt": "<p class='mb-4'>[Letter scenario]</p><p class='mb-4'><strong>In your letter:</strong></p><ul class='list-disc pl-5 mb-4 text-gray-700'><li>[Point 1]</li><li>[Point 2]</li><li>[Point 3]</li></ul><p class='text-gray-600'>Write at least 150 words.</p>",
    "tips": ["Tip 1","Tip 2","Tip 3"],
    "sampleAnswer": "A complete sample answer of 160-200 words."
  },
  "task2": {
    "title": "Task 2: Essay Writing",
    "prompt": "<p class='mb-4'><strong>Essay question.</strong></p><p class='mb-4'><strong>Discuss both views and give your own opinion.</strong></p><p class='text-gray-600'>Write at least 250 words.</p>",
    "tips": ["Tip 1","Tip 2","Tip 3"],
    "sampleAnswer": "A complete sample answer of 280-320 words."
  }
}
Return ONLY valid JSON, no markdown or explanation.`}
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
          max_tokens: 8000,
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
          maxOutputTokens: 8000,
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

  // Find the first '{' and last '}' to extract only the JSON object
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  } else {
    // Fallback to basic stripping if braces aren't clear
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
  }

  return cleaned.trim();
}

function parseAiJson(rawResponse: string): unknown {
  const cleanedResponse = cleanJsonResponse(rawResponse);
  try {
    return JSON.parse(cleanedResponse);
  } catch (firstError) {
    try {
      return JSON.parse(jsonrepair(cleanedResponse));
    } catch (repairError) {
      console.error('JSON Parse Error:', firstError);
      console.error('JSON Repair Error:', repairError);
      console.error('Raw response:', rawResponse);
      throw new Error('Failed to parse AI response');
    }
  }
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

  if (!checkRateLimit(req, res, LIMITS.heavy, 'generate-content')) return;

  try {
    // Explicit body parsing fallback
    let body: Partial<GenerateRequest> = {};
    if (req.body && typeof req.body === 'object') {
      body = req.body as Partial<GenerateRequest>;
    } else if (req.body && typeof req.body === 'string') {
      try { body = JSON.parse(req.body); } catch { body = {}; }
    }

    const moduleType = body.moduleType;
    const topic = body.topic || 'general knowledge';
    const difficulty = body.difficulty || 'medium';
    const testType = body.testType || 'academic';
    const requestedProvider = body.provider || 'openai';
    const passageNumber = body.passageNumber;
    const sectionNumber = body.sectionNumber;
    const taskNumber = body.taskNumber;
    const partNumber = body.partNumber;

    // Auto-select available provider
    let provider = requestedProvider;
    if (requestedProvider === 'openai' && !OPENAI_API_KEY) {
      if (GEMINI_API_KEY) {
        console.log('OPENAI_API_KEY not found, falling back to Gemini');
        provider = 'gemini';
      } else {
        return res.status(500).json({ 
          error: 'No AI API key configured. Please add OPENAI_API_KEY or GEMINI_API_KEY to Vercel environment variables.',
          hint: 'Go to Vercel Dashboard → Settings → Environment Variables'
        });
      }
    }

    if (requestedProvider === 'gemini' && !GEMINI_API_KEY) {
      if (OPENAI_API_KEY) {
        console.log('GEMINI_API_KEY not found, falling back to OpenAI');
        provider = 'openai';
      } else {
        return res.status(500).json({ 
          error: 'No AI API key configured. Please add OPENAI_API_KEY or GEMINI_API_KEY to Vercel environment variables.',
          hint: 'Go to Vercel Dashboard → Settings → Environment Variables'
        });
      }
    }

    if (!moduleType || !['reading', 'listening', 'writing', 'speaking'].includes(moduleType)) {
      return res.status(400).json({ error: 'Invalid module type' });
    }

    console.log(`Generating ${moduleType} content with ${provider}, topic: ${topic}, difficulty: ${difficulty}${passageNumber ? `, passage: ${passageNumber}` : ''}${sectionNumber ? `, section: ${sectionNumber}` : ''}${taskNumber ? `, task: ${taskNumber}` : ''}${partNumber ? `, part: ${partNumber}` : ''}`);
    let prompt: string;

    switch (moduleType) {
      case 'reading':
        prompt = passageNumber 
          ? READING_PASSAGE_PROMPT(topic, difficulty, testType, passageNumber)
          : READING_PROMPT(topic, difficulty, testType);
        break;
      case 'listening':
        prompt = sectionNumber 
          ? LISTENING_SECTION_PROMPT(topic, difficulty, testType, sectionNumber)
          : LISTENING_PROMPT(topic, difficulty);
        break;
      case 'writing':
        prompt = taskNumber
          ? WRITING_TASK_PROMPT(topic, testType, taskNumber)
          : WRITING_PROMPT(topic, testType);
        break;
      case 'speaking':
        prompt = partNumber
          ? SPEAKING_PART_PROMPT(topic, difficulty, partNumber)
          : SPEAKING_PROMPT(topic, difficulty);
        break;
      default:
        return res.status(400).json({ error: 'Invalid module type' });
    }

    const rawResponse = provider === 'gemini'
      ? await callGemini(prompt)
      : await callOpenAI(prompt);
    let parsedContent;
    try {
      parsedContent = parseAiJson(rawResponse);
    } catch {
      return res.status(500).json({
        error: 'Failed to parse AI response',
        rawResponse: cleanJsonResponse(rawResponse).substring(0, 500)
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

