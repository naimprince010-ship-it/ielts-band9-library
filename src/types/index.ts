export type LessonType = 'vocabulary' | 'grammar' | 'writing' | 'speaking';
export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';
export type UserRole = 'user' | 'admin';
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
