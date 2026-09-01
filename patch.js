const fs = require("fs");

const path = "src/data/deepVocabularyLessons.ts";
let content = fs.readFileSync(path, "utf8");

const accents = [
  {
    // indigo
    border: "border-indigo-200",
    surface: "bg-indigo-50/70",
    badge: "bg-indigo-100 text-indigo-700",
    heading: "text-indigo-700",
    ring: "ring-indigo-100",
    dot: "bg-blue-600",
  },
  {
    // violet
    border: "border-violet-200",
    surface: "bg-violet-50/70",
    badge: "bg-violet-100 text-violet-700",
    heading: "text-violet-700",
    ring: "ring-violet-100",
    dot: "bg-violet-600",
  },
  {
    // amber
    border: "border-amber-200",
    surface: "bg-amber-50/80",
    badge: "bg-amber-100 text-amber-800",
    heading: "text-amber-800",
    ring: "ring-amber-100",
    dot: "bg-amber-500",
  },
  {
    // emerald
    border: "border-emerald-200",
    surface: "bg-emerald-50/60",
    badge: "bg-emerald-100 text-emerald-800",
    heading: "text-emerald-800",
    ring: "ring-emerald-100",
    dot: "bg-emerald-600",
  },
];

const lessonsToPatch = [
  "health-wellbeing-medical-vocabulary",
  "lifestyle-fitness-vocabulary",
  "economic-systems-global-trade",
  "social-issues-community",
  "employment-career-development",
  "government-public-policy",
  "media-digital-communication",
  "academic-collocations-verb-noun",
  "opinion-expressions-speaking",
  "band-6-to-7-vocabulary-upgrade",
  "band-7-to-8-precision-vocabulary",
  "science-research-vocabulary",
  "academic-collocations-adjective-noun",
  "education-systems-school-life",
];

// Instead of parsing the whole file as an AST (which is complex in JS without a library),
// we can do regex replacements for the specific missing fields.

// Add lessonBadgeLabel, sidebarLessonLabel, deepLessonProgress after the lesson key
lessonsToPatch.forEach((lesson, index) => {
  const lessonNumber = (index + 8).toString().padStart(2, "0");
  const badgeLabel = `Vocabulary · Lesson ${lessonNumber}`;
  const sidebarLabel = `Lesson ${lessonNumber}`;
  const progress = 38 + index * 2;

  const keyPattern = new RegExp(`'${lesson}': \\{\\s+words: \\[`, "g");
  content = content.replace(
    keyPattern,
    `'${lesson}': {\n    lessonBadgeLabel: '${badgeLabel}',\n    sidebarLessonLabel: '${sidebarLabel}',\n    deepLessonProgress: ${progress},\n    words: [`,
  );
});

// For each word, add 'why' and 'accent' if they don't exist
// This regex looks for mistake: { wrong: ..., right: ... }, and adds why and accent after it.
const mistakePattern =
  /mistake:\s*\{\s*wrong:\s*['"`](.*?)['"`],\s*right:\s*['"`](.*?)['"`],?\s*\},/g;

let wordIndex = 0;
content = content.replace(mistakePattern, (match, wrong, right) => {
  const accent = accents[wordIndex % 4];
  const whyText =
    "This is an essential academic term that enhances lexical resource.";

  const replacement = `${match}
        why: '${whyText}',
        accent: {
          border: '${accent.border}',
          surface: '${accent.surface}',
          badge: '${accent.badge}',
          heading: '${accent.heading}',
          ring: '${accent.ring}',
          dot: '${accent.dot}',
        },`;

  wordIndex++;
  return replacement;
});

fs.writeFileSync(path, content);
console.log("Patch complete.");
