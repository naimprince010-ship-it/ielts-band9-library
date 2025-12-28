// ============================================
// IELTS Scoring Utilities
// ============================================

// Module types for scoring
export type ScoringModuleType = 'reading' | 'listening';

// ============================================
// Answer Normalization
// ============================================

/**
 * Normalizes an answer for comparison
 * - Trims whitespace
 * - Converts to lowercase
 * - Removes extra spaces
 */
export const normalizeAnswer = (answer: string): string => {
  if (!answer) return '';
  return answer
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
};

/**
 * Compares user answer with correct answer(s)
 * Supports multiple accepted answers
 */
export const checkAnswer = (
  userAnswer: string,
  correctAnswer: string,
  acceptedAnswers?: string[]
): boolean => {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  
  // Check against primary correct answer
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Check against alternative accepted answers
  if (acceptedAnswers && acceptedAnswers.length > 0) {
    return acceptedAnswers.some(
      accepted => normalizeAnswer(accepted) === normalizedUser
    );
  }
  
  return false;
};

// ============================================
// IELTS Band Score Conversion Tables
// Based on official IELTS scoring guidelines
// ============================================

// Reading Band Score Table (Academic)
// Raw Score (out of 40) -> Band Score
const READING_BAND_TABLE: { min: number; max: number; band: number }[] = [
  { min: 39, max: 40, band: 9.0 },
  { min: 37, max: 38, band: 8.5 },
  { min: 35, max: 36, band: 8.0 },
  { min: 33, max: 34, band: 7.5 },
  { min: 30, max: 32, band: 7.0 },
  { min: 27, max: 29, band: 6.5 },
  { min: 23, max: 26, band: 6.0 },
  { min: 19, max: 22, band: 5.5 },
  { min: 15, max: 18, band: 5.0 },
  { min: 13, max: 14, band: 4.5 },
  { min: 10, max: 12, band: 4.0 },
  { min: 8, max: 9, band: 3.5 },
  { min: 6, max: 7, band: 3.0 },
  { min: 4, max: 5, band: 2.5 },
  { min: 2, max: 3, band: 2.0 },
  { min: 1, max: 1, band: 1.0 },
  { min: 0, max: 0, band: 0.0 },
];

// Listening Band Score Table
// Raw Score (out of 40) -> Band Score
const LISTENING_BAND_TABLE: { min: number; max: number; band: number }[] = [
  { min: 39, max: 40, band: 9.0 },
  { min: 37, max: 38, band: 8.5 },
  { min: 35, max: 36, band: 8.0 },
  { min: 32, max: 34, band: 7.5 },
  { min: 30, max: 31, band: 7.0 },
  { min: 26, max: 29, band: 6.5 },
  { min: 23, max: 25, band: 6.0 },
  { min: 18, max: 22, band: 5.5 },
  { min: 16, max: 17, band: 5.0 },
  { min: 13, max: 15, band: 4.5 },
  { min: 11, max: 12, band: 4.0 },
  { min: 8, max: 10, band: 3.5 },
  { min: 6, max: 7, band: 3.0 },
  { min: 4, max: 5, band: 2.5 },
  { min: 2, max: 3, band: 2.0 },
  { min: 1, max: 1, band: 1.0 },
  { min: 0, max: 0, band: 0.0 },
];

/**
 * Calculates IELTS band score from raw score
 * @param rawScore - Number of correct answers (0-40)
 * @param moduleType - 'reading' or 'listening'
 * @returns Band score (0-9 in 0.5 increments)
 */
export const calculateBandScore = (
  rawScore: number,
  moduleType: ScoringModuleType
): number => {
  // Clamp raw score to valid range
  const clampedScore = Math.max(0, Math.min(40, Math.round(rawScore)));
  
  const bandTable = moduleType === 'reading' 
    ? READING_BAND_TABLE 
    : LISTENING_BAND_TABLE;
  
  for (const entry of bandTable) {
    if (clampedScore >= entry.min && clampedScore <= entry.max) {
      return entry.band;
    }
  }
  
  return 0; // Fallback
};

/**
 * Calculates overall IELTS band score from individual module scores
 * Rounds to nearest 0.5
 * @param scores - Object with module band scores
 * @returns Overall band score rounded to nearest 0.5
 */
export const calculateOverallBand = (scores: {
  listening?: number;
  reading?: number;
  writing?: number;
  speaking?: number;
}): number => {
  const validScores = Object.values(scores).filter(
    (score): score is number => score !== undefined && score !== null
  );
  
  if (validScores.length === 0) return 0;
  
  const average = validScores.reduce((sum, score) => sum + score, 0) / validScores.length;
  
  // Round to nearest 0.5
  return Math.round(average * 2) / 2;
};

// ============================================
// Grading Functions
// ============================================

export interface GradedAnswer {
  questionNumber: number;
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  acceptedAnswers?: string[];
}

export interface GradingResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  rawScore: number;
  percentage: number;
  bandScore: number;
  gradedAnswers: GradedAnswer[];
}

/**
 * Grades a set of answers for Reading or Listening module
 */
export const gradeObjectiveTest = (
  userAnswers: Record<string, { answer: string }>,
  questions: Array<{
    id: string;
    questionNumber: number;
    correctAnswer: string;
    acceptedAnswers?: string[];
  }>,
  moduleType: ScoringModuleType
): GradingResult => {
  const gradedAnswers: GradedAnswer[] = [];
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  
  for (const question of questions) {
    const userAnswerObj = userAnswers[question.id];
    const userAnswer = userAnswerObj?.answer || '';
    
    if (!userAnswer.trim()) {
      unansweredCount++;
      gradedAnswers.push({
        questionNumber: question.questionNumber,
        questionId: question.id,
        userAnswer: '',
        correctAnswer: question.correctAnswer,
        isCorrect: false,
        acceptedAnswers: question.acceptedAnswers,
      });
    } else {
      const isCorrect = checkAnswer(
        userAnswer,
        question.correctAnswer,
        question.acceptedAnswers
      );
      
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }
      
      gradedAnswers.push({
        questionNumber: question.questionNumber,
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        acceptedAnswers: question.acceptedAnswers,
      });
    }
  }
  
  const totalQuestions = questions.length;
  const rawScore = correctCount;
  const percentage = totalQuestions > 0 
    ? Math.round((correctCount / totalQuestions) * 100) 
    : 0;
  const bandScore = calculateBandScore(rawScore, moduleType);
  
  return {
    totalQuestions,
    correctAnswers: correctCount,
    incorrectAnswers: incorrectCount,
    unanswered: unansweredCount,
    rawScore,
    percentage,
    bandScore,
    gradedAnswers: gradedAnswers.sort((a, b) => a.questionNumber - b.questionNumber),
  };
};

// ============================================
// Band Score Display Helpers
// ============================================

/**
 * Formats band score for display (e.g., 7.0, 7.5)
 */
export const formatBandScore = (band: number): string => {
  return band.toFixed(1);
};

/**
 * Gets color class based on band score
 */
export const getBandScoreColor = (band: number): string => {
  if (band >= 8.0) return 'text-green-600 bg-green-50';
  if (band >= 7.0) return 'text-blue-600 bg-blue-50';
  if (band >= 6.0) return 'text-indigo-600 bg-indigo-50';
  if (band >= 5.0) return 'text-amber-600 bg-amber-50';
  return 'text-red-600 bg-red-50';
};

/**
 * Gets performance level description based on band score
 */
export const getBandScoreLevel = (band: number): string => {
  if (band >= 9.0) return 'Expert';
  if (band >= 8.0) return 'Very Good';
  if (band >= 7.0) return 'Good';
  if (band >= 6.0) return 'Competent';
  if (band >= 5.0) return 'Modest';
  if (band >= 4.0) return 'Limited';
  return 'Extremely Limited';
};
