export type LessonType = 'vocabulary' | 'grammar' | 'writing' | 'speaking' | 'reading' | 'listening';
export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';
export type UserRole = 'user' | 'admin' | 'instructor';
export type SubscriptionStatus = 'free' | 'premium';

export type PackageType = 'monthly' | 'yearly';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription_status: SubscriptionStatus;
  package_type?: PackageType;
  premium_until?: string;
  target_band?: number;
  exam_date?: string;
  weak_skill?: 'listening' | 'reading' | 'writing' | 'speaking' | 'not_sure';
  daily_study_minutes?: number;
  onboarding_completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface GrammarFormItem {
  name: string;
  tags: string[];
  definition: string;
  comparison: {
    standard: string;
    band8: string;
  };
}

export interface LessonContent {
  title: string;
  targetLevel: string;
  whatYouWillLearn: string[];
  coreExplanation: string;
  examples: { sentence: string; explanation: string }[];
  commonMistakes: { mistake: string; correction: string; explanation: string }[];
  miniPractice: { question: string; options?: string[]; type: 'fill-blank' | 'multiple-choice' | 'rewrite' }[];
  answerKey: string[];
  quickRecap: string;
  collocations?: string[];
  synonyms?: { word: string; synonyms: string[] }[];
  speakingLines?: string[];
  grammarForm?: string;
  grammarFormItems?: GrammarFormItem[];
  grammarUse?: string;
  sentenceUpgrade?: { basic: string; upgraded: string }[];
  /** Rich, reviewable vocabulary workspace content generated from the admin panel. */
  deepVocabulary?: import('@/data/deepVocabularyLessons').DeepVocabularyLessonData;
  /** Marks a complete AI-generated grammar draft that requires staff review. */
  deepGrammar?: boolean;
  /** Versioned, validated study-material blueprint rendered without lesson-specific JSX. */
  studyBlueprint?: import('@/lib/lessonBlueprint').StudyLessonBlueprint;
  /** Isolated Listening Studio data. It is mirrored to listening_lesson_data for publish readiness. */
  listeningData?: import('@/modules/listening/listeningLesson').ListeningLessonData;
  /** Isolated Reading Studio data. It is mirrored to reading_lesson_data for publish readiness. */
  readingData?: import('@/modules/reading/readingLesson').ReadingLessonData;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  type: LessonType;
  level: LessonLevel;
  topic: string;
  description: string;
  content: LessonContent;
  is_premium: boolean;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  estimated_time?: number; // in minutes
  recommended_order?: number; // for band upgrade packs
  courseId?: string; // Optional: Link to a specific Course
  moduleName?: string; // Optional: Name of the module within that course
  videoUrl?: string; // Optional YouTube, Vimeo, or direct video URL
  blueprint_version?: number;
  content_status?: 'legacy' | 'draft' | 'in_review' | 'approved' | 'published' | 'archived';
  quality_report?: Record<string, unknown>;
}

export type LessonProgress = 'not_started' | 'completed';

export interface UserLessonProgress {
  lesson_id: string;
  status: LessonProgress;
  completed_at?: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  lesson_id: string;
  created_at: string;
  lesson?: Lesson;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface LessonTag {
  lesson_id: string;
  tag_id: string;
}

// ============================================
// Natural Approach Grammar Learning Types
// ============================================

// Annotation kinds for pattern highlighting
export type AnnotationKind = 'pattern' | 'chunk' | 'error' | 'verb' | 'noun' | 'adjective';

// Color mapping for different annotation types
export const ANNOTATION_COLORS: Record<AnnotationKind, { bg: string; text: string; border: string }> = {
  pattern: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  chunk: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  error: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  verb: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  noun: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  adjective: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
};

// Annotation for highlighting patterns in story text
export interface Annotation {
  start: number;        // Character offset start
  end: number;          // Character offset end
  kind: AnnotationKind; // Type of annotation for color coding
  label: string;        // Human-readable label (e.g., "past tense verb")
  targetId: string;     // Unique ID for exercise reference
  tooltip?: string;     // Optional tooltip explanation
}

// Story context with text and audio support
export interface StoryContext {
  id: string;
  title: string;        // Story title
  text: string;         // The story/paragraph text
  annotations: Annotation[];  // Highlighted patterns
  audioUrl?: string;    // Optional audio URL for listening
  speaker?: string;     // Optional speaker name for dialogues
}

// Recast example for common mistakes
export interface RecastExample {
  commonWrong: string;  // Common incorrect form (e.g., "I goed")
  recast: string;       // Gentle correction (e.g., "Almost! Native speakers say: 'I went'")
  explanation?: string; // Optional brief explanation
}

// Natural Approach exercise types
export type NaturalExerciseType = 'pattern-recognition' | 'fill-blank' | 'recast-practice' | 'chunk-completion' | 'mcq';
export type NaturalInteractionType = 'select-highlight' | 'mcq' | 'short-answer' | 'drag-drop';

// Natural Approach exercise
export interface NaturalExercise {
  id: string;
  type: NaturalExerciseType;
  contextId: string;              // References which story context
  prompt: string;                 // Question/instruction text
  interaction: NaturalInteractionType;
  correctTargets?: string[];      // References annotation targetIds (for pattern-recognition)
  correctAnswer?: string;         // For fill-blank and short-answer
  acceptedAnswers?: string[];     // Alternative correct answers (synonyms, chunks)
  options?: string[];             // For MCQ
  recastExamples?: RecastExample[]; // Gentle corrections for common mistakes
  chunks?: string[];              // Collocations to accept as single units
  hint?: string;                  // Optional hint
  successMessage?: string;        // Custom success message
}

// Feedback status for recasting flow
export type FeedbackStatus = 'correct' | 'recast' | 'hint' | 'reveal';

// Feedback object for recasting
export interface NaturalFeedback {
  status: FeedbackStatus;
  message: string;        // Friendly message
  recast?: string;        // The corrected form
  explanation?: string;   // Brief explanation
  nextAction: string;     // CTA label (e.g., "Try again", "Continue")
}

// Complete Natural Approach Lesson
export interface NaturalLesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: LessonLevel;
  topic: string;                  // Grammar topic (e.g., "Past Tense")
  targetPattern: string;          // Main pattern being taught
  contexts: StoryContext[];       // Story contexts with annotations
  exercises: NaturalExercise[];   // Pattern recognition and practice exercises
  chunks?: string[];              // Key collocations for this lesson
  quickRecap?: string;            // Brief summary (shown at end)
  is_premium: boolean;
  estimated_time?: number;        // in minutes
}

// ============================================
// Reading Module Types (IELTS Style Mock Test)
// ============================================

// Question types for Reading Module
export type ReadingQuestionType = 
  | 'mcq'                    // Multiple Choice Question
  | 'fill-blank'             // Fill in the blank
  | 'true-false-not-given'   // True/False/Not Given
  | 'yes-no-not-given'       // Yes/No/Not Given
  | 'matching-headings'      // Match headings to paragraphs
  | 'matching-information'   // Match information to paragraphs
  | 'matching-features'      // Match features/names to statements
  | 'sentence-completion'    // Complete sentences
  | 'summary-completion'     // Complete a summary (grouped blank)
  | 'table-completion'       // Complete a table
  | 'diagram-labeling'       // Label a diagram
  | 'short-answer';          // Short answer questions

// Table structure for table-completion questions
export interface TableRow {
  cells: string[];
}

export interface TableData {
  headers: string[];
  rows: TableRow[];
}

// Question status for palette display
export type QuestionStatus = 'unseen' | 'seen' | 'answered' | 'flagged';

// Individual Reading Question
export interface ReadingQuestion {
  id: string;
  questionNumber: number;        // 1-40 for IELTS
  type: ReadingQuestionType;
  questionText: string;          // The question prompt
  options?: string[];            // For MCQ, True/False, etc.
  correctAnswer: string;         // The correct answer
  acceptedAnswers?: string[];    // Alternative correct answers
  passageRef?: string;           // Reference to specific paragraph (e.g., "Paragraph A")
  hint?: string;                 // Optional hint
  explanation?: string;          // Explanation for the answer
  // Fields for structured grouped questions (Table/Summary completion)
  groupId?: string;              // Identifier to group related questions together
  tableData?: TableData;         // Structured table data (usually included only in the first question of a group)
  summaryData?: string;          // Structured summary text with placeholders (usually included only in the first question of a group)
}

// Reading Passage
export interface ReadingPassage {
  id: string;
  passageNumber: number;         // 1, 2, or 3 for IELTS
  title: string;                 // Passage title
  textContent: string;           // The full passage text (can include HTML for paragraphs)
  paragraphs?: {                 // Optional structured paragraphs
    label: string;               // A, B, C, etc.
    content: string;
  }[];
  questions: ReadingQuestion[];  // Questions for this passage
  questionRange: {               // Question number range (e.g., 1-13)
    start: number;
    end: number;
  };
}

// Complete Reading Test
export interface ReadingTest {
  id: string;
  title: string;                 // Test title (e.g., "Academic Reading Test 1")
  testType: 'academic' | 'general';
  totalQuestions: number;        // Usually 40 for IELTS
  timeLimit: number;             // Time in seconds (3600 for 60 minutes)
  passages: ReadingPassage[];    // 3 passages for IELTS
  instructions?: string;         // Test instructions
  is_premium: boolean;
  created_at?: string;
}

// User's answer for a question
export interface UserAnswer {
  questionId: string;
  questionNumber: number;
  answer: string;
  status: QuestionStatus;
  answeredAt?: number;           // Timestamp
}

// Test session state (for localStorage persistence)
export interface ReadingTestSession {
  testId: string;
  startedAt: number;             // Timestamp when test started
  timeRemaining: number;         // Remaining time in seconds
  answers: Record<string, UserAnswer>;  // questionId -> UserAnswer
  currentPassage: number;        // Current passage being viewed (1, 2, or 3)
  currentQuestion: number;       // Current question number (1-40)
  isSubmitted: boolean;
  submittedAt?: number;
}

// Test result after submission
export interface ReadingTestResult {
  testId: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  score: number;                 // Percentage
  bandScore?: number;            // IELTS band score (1-9)
  timeTaken: number;             // Time taken in seconds
  answers: {
    questionNumber: number;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

// ============================================
// Writing Module Types (IELTS Style Mock Test)
// ============================================

// Writing task type
export type WritingTaskType = 'task1' | 'task2';

// Writing test type (Academic vs General)
export type WritingTestType = 'academic' | 'general';

// Chart dataset for Writing Task 1 programmatic charts
export interface WritingChartDataset {
  label: string;
  data: number[];
  type?: 'line' | 'bar';
  borderColor?: string;
  backgroundColor?: string;
}

// Structured chart data for Writing Task 1 Academic (rendered via Chart.js)
export interface WritingChartData {
  type: 'line' | 'bar' | 'pie' | 'combo';   // pie: datasets[0].data = values, labels = slice names
  title: string;                 // Chart title shown above the chart
  description?: string;          // Axis/chart description
  labels: string[];              // X-axis labels (line/bar) OR slice names (pie)
  unit?: string;                 // Y-axis unit, e.g. "%", "million tonnes"
  yMin?: number;                 // Optional Y-axis minimum (line/bar only)
  yMax?: number;                 // Optional Y-axis maximum (line/bar only)
  datasets: WritingChartDataset[];
}

// Structured table data for Writing Task 1
export interface WritingTableData {
  type: 'table';
  title: string;
  description?: string;
  unit?: string;                 // e.g. "million tonnes", "%"
  source?: string;               // Optional data source
  headers: string[];             // Column headers
  rows: string[][];              // Data rows (string for flexibility)
}

// Single step in a process diagram
export interface WritingProcessStep {
  label: string;                 // Short step name
  description?: string;          // Optional longer description
  shape?: 'oval' | 'rect' | 'diamond'; // Start/End=oval, Process=rect, Decision=diamond
}

// Process / flowchart diagram for Writing Task 1
export interface WritingProcessData {
  type: 'process';
  title: string;
  description?: string;
  isCircular?: boolean;          // True for cyclic processes (e.g. water cycle)
  steps: WritingProcessStep[];
}

// A single zone/area in a map plan
export interface WritingMapZone {
  label: string;                 // Zone name (e.g. "Park", "School")
  row: number;                   // 1-indexed grid row
  col: number;                   // 1-indexed grid col
  rowSpan?: number;              // Number of rows to span (default 1)
  colSpan?: number;              // Number of cols to span (default 1)
  color?: string;                // Background colour (hex or tailwind-compatible)
  description?: string;          // Optional detail
}

// A single plan (before OR after) in a map visual
export interface WritingMapPlan {
  label?: string;                // e.g. "1990 (Before)" / "2024 (After)"
  zones: WritingMapZone[];
}

// Map / town plan for Writing Task 1
export interface WritingMapData {
  type: 'map';
  title: string;
  description?: string;
  plans: WritingMapPlan[];       // 1 plan = single map; 2 plans = before/after
}

// Individual Writing Task
export interface WritingTask {
  id: string;
  taskNumber: 1 | 2;
  taskType: WritingTaskType;
  title: string;                 // Task title (e.g., "Task 1: Report Writing")
  prompt: string;                // The question/prompt text (can include HTML)
  imageUrl?: string;             // Optional image URL (legacy / fallback)
  // Task 1 visual — only ONE of these should be set at a time:
  chartData?: WritingChartData;   // Line / Bar / Pie chart
  tableData?: WritingTableData;   // Data table
  processData?: WritingProcessData; // Process / flowchart diagram
  mapData?: WritingMapData;       // Map / town plan
  minWords: number;              // Minimum word count (150 for Task 1, 250 for Task 2)
  recommendedTime: number;       // Recommended time in minutes (20 for Task 1, 40 for Task 2)
  tips?: string[];               // Optional writing tips
  sampleAnswer?: string;         // Optional sample answer (shown after submission)
}

// Complete Writing Test
export interface WritingTest {
  id: string;
  title: string;                 // Test title (e.g., "Academic Writing Test 1")
  testType: WritingTestType;
  timeLimit: number;             // Total time in seconds (3600 for 60 minutes)
  tasks: [WritingTask, WritingTask]; // Always 2 tasks
  instructions?: string;         // Test instructions
  is_premium: boolean;
  created_at?: string;
}

// User's writing response for a task
export interface WritingResponse {
  taskId: string;
  taskNumber: 1 | 2;
  content: string;               // The written text
  wordCount: number;             // Current word count
  lastUpdatedAt: number;         // Timestamp of last edit
}

// Writing test session state (for localStorage persistence)
export interface WritingTestSession {
  testId: string;
  startedAt: number;             // Timestamp when test started
  timeRemaining: number;         // Remaining time in seconds
  responses: {
    task1: WritingResponse;
    task2: WritingResponse;
  };
  currentTask: WritingTaskType;  // Currently active task tab
  isSubmitted: boolean;
  submittedAt?: number;
}

// Writing test result after submission
export interface WritingTestResult {
  testId: string;
  timeTaken: number;             // Time taken in seconds
  responses: {
    taskNumber: 1 | 2;
    content: string;
    wordCount: number;
    meetsMinWords: boolean;
  }[];
}

// ============================================
// Listening Module Types (IELTS Style Mock Test)
// ============================================

// Question types for Listening Module (similar to Reading but fewer types)
export type ListeningQuestionType = 
  | 'mcq'                    // Multiple Choice Question
  | 'fill-blank'             // Fill in the blank (form/note completion)
  | 'matching'               // Match items
  | 'map-labeling'           // Label a map/plan
  | 'table-completion'       // Complete a table
  | 'summary-completion'     // Complete a summary block
  | 'sentence-completion'    // Complete sentences
  | 'short-answer';          // Short answer questions

// Listening Section (4 sections in IELTS)
export interface ListeningSection {
  id: string;
  sectionNumber: number;         // 1, 2, 3, or 4
  title: string;                 // Section title (e.g., "Section 1: Conversation")
  description?: string;          // Brief description of the audio context
  transcript?: string;           // Transcript of the audio for this section (used for TTS generation)
  sectionAudioUrl?: string;      // Individual audio URL generated per section via TTS (when present, player uses per-section mode)
  audioStartTime: number;        // When this section starts in the audio (seconds) — used in single-audio-file mode
  audioEndTime: number;          // When this section ends in the audio (seconds) — used in single-audio-file mode
  questions: ListeningQuestion[];
  questionRange: {
    start: number;
    end: number;
  };
}

// Individual Listening Question
export interface ListeningQuestion {
  id: string;
  questionNumber: number;        // 1-40 for IELTS
  type: ListeningQuestionType;
  questionText: string;          // The question prompt
  options?: string[];            // For MCQ
  correctAnswer: string;         // The correct answer
  acceptedAnswers?: string[];    // Alternative correct answers
  hint?: string;                 // Optional hint
  explanation?: string;          // Explanation for the answer
  wordLimit?: number;            // Max words for fill-blank (e.g., "NO MORE THAN TWO WORDS")
  // Fields for structured grouped questions (Table/Summary completion)
  groupId?: string;              // Identifier to group related questions together
  tableData?: TableData;         // Structured table data (usually included only in the first question of a group)
  summaryData?: string;          // Structured summary text with placeholders (usually included only in the first question of a group)
}

// Complete Listening Test
export interface ListeningTest {
  id: string;
  title: string;                 // Test title (e.g., "Listening Test 1")
  totalQuestions: number;        // Usually 40 for IELTS
  audioUrl: string;              // URL to the audio file
  audioDuration: number;         // Total audio duration in seconds
  transferTime: number;          // Time to review answers after audio (600 for 10 min, 120 for 2 min)
  sections: ListeningSection[];  // 4 sections for IELTS
  instructions?: string;         // Test instructions
  is_premium: boolean;
  created_at?: string;
}

// Audio player state
export type AudioState = 'not-started' | 'test-sound' | 'playing' | 'finished' | 'transfer-time';

// Listening test session state (for localStorage persistence)
export interface ListeningTestSession {
  testId: string;
  startedAt: number;             // Timestamp when test started
  audioState: AudioState;        // Current audio state
  audioCurrentTime: number;      // Current position in audio (seconds)
  transferTimeRemaining: number; // Remaining transfer time in seconds
  answers: Record<string, UserAnswer>;  // questionId -> UserAnswer
  currentSection: number;        // Current section being viewed (1-4)
  playedAudioIds?: string[];     // Recordings already started; IELTS audio must not be replayed after refresh
  isSubmitted: boolean;
  submittedAt?: number;
}

// Listening test result after submission
export interface ListeningTestResult {
  testId: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  score: number;                 // Percentage
  bandScore?: number;            // IELTS band score (1-9)
  answers: {
    questionNumber: number;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

// ============================================
// Speaking Module Types (IELTS Style Mock Test)
// ============================================

// Speaking test part type
export type SpeakingPartType = 'part1' | 'part2' | 'part3';

// Speaking question for Part 1 and Part 3
export interface SpeakingQuestion {
  id: string;
  questionNumber: number;
  text: string;                  // The question text
  audioUrl?: string;             // Optional audio of examiner asking question
  thinkTime: number;             // Think time in seconds (3-5 for Part 1/3)
  recordTime: number;            // Recording time in seconds
}

// Cue Card for Part 2
export interface SpeakingCueCard {
  id: string;
  topic: string;                 // Main topic
  bulletPoints: string[];        // Points to cover
  prepTime: number;              // Preparation time in seconds (60)
  recordTime: number;            // Recording time in seconds (120)
}

// Speaking Part (Part 1, 2, or 3)
export interface SpeakingPart {
  id: string;
  partNumber: 1 | 2 | 3;
  partType: SpeakingPartType;
  title: string;                 // e.g., "Introduction & Interview"
  instructions: string;
  questions?: SpeakingQuestion[]; // For Part 1 and Part 3
  cueCard?: SpeakingCueCard;     // For Part 2 only
}

// Complete Speaking Test
export interface SpeakingTest {
  id: string;
  title: string;                 // Test title
  parts: [SpeakingPart, SpeakingPart, SpeakingPart]; // Always 3 parts
  instructions?: string;         // General test instructions
  is_premium: boolean;
  created_at?: string;
}

// Recording state for a single question/cue card
export interface SpeakingRecording {
  questionId: string;
  partNumber: 1 | 2 | 3;
  audioBlob?: Blob;              // The recorded audio
  audioUrl?: string;             // Object URL for playback
  duration: number;              // Actual recording duration in seconds
  uploadStatus: 'pending' | 'uploading' | 'uploaded' | 'failed';
  uploadedUrl?: string;          // URL after upload
}

// Speaking test session state
export interface SpeakingTestSession {
  testId: string;
  startedAt: number;             // Timestamp when test started
  currentPart: SpeakingPartType;
  currentQuestionIndex: number;
  phase: 'system-check' | 'instructions' | 'think' | 'prep' | 'recording' | 'between' | 'completed';
  recordings: SpeakingRecording[];
  isSubmitted: boolean;
  submittedAt?: number;
}

// Speaking test result after submission
export interface SpeakingTestResult {
  testId: string;
  timeTaken: number;             // Total time taken in seconds
  recordings: {
    partNumber: 1 | 2 | 3;
    questionId: string;
    duration: number;
    uploadedUrl?: string;
  }[];
}
// ============================================
// Course Module Types
// ============================================

export type CourseType = 'live' | 'recorded' | 'hybrid';

export interface CurriculumLesson {
  title: string;
  lessonId?: string; // Optional link to a Lesson object
}

export interface CurriculumModule {
  module: string;
  lessons: (string | CurriculumLesson)[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  nextBatch: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string;
  type: CourseType;
  features: string[];
  isPopular?: boolean;
  accentColor: string;
  bgGradient: string;
  curriculum?: CurriculumModule[];
  created_at?: string;
  updated_at?: string;
}
