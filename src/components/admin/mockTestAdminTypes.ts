import type {
  ListeningTest,
  ReadingTest,
  SpeakingTest,
  WritingTest,
} from '@/types';

export type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking';

export interface MockTest {
  id: string;
  title: string;
  module_type: ModuleType;
  test_data: ReadingTest | ListeningTest | WritingTest | SpeakingTest;
  is_published: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface FullMockBundle {
  id: string;
  title: string;
  theme: string;
  difficulty: 'easy' | 'medium' | 'hard';
  listening_test_id: string;
  reading_test_id: string;
  writing_test_id: string;
  speaking_test_id: string;
  review_status: 'draft' | 'in_review' | 'approved' | 'rejected';
  quality_score: number | null;
  is_published: boolean;
  created_at: string;
}

export interface AIGenerationRun {
  id: string;
  topic: string;
  difficulty: string;
  provider: string;
  status: 'succeeded' | 'failed' | 'blocked_duplicate' | 'blocked_quality';
  quality_score: number | null;
  error_message: string;
  created_at: string;
}

export interface QuestionReview {
  id: string;
  bundle_id: string;
  mock_test_id: string;
  module_type: ModuleType;
  question_key: string;
  question_text_snapshot: string;
  status: 'pending' | 'approved' | 'rejected';
  review_notes: string;
}
