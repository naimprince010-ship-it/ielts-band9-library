export type LessonType = 'vocabulary' | 'grammar';
export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';
export type UserRole = 'user' | 'admin';
export type SubscriptionStatus = 'free' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription_status: SubscriptionStatus;
  created_at: string;
  updated_at: string;
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
