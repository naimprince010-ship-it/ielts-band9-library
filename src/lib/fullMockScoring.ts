export interface ObjectiveQuestion {
  questionText?: unknown;
  options?: unknown[];
  correctAnswer?: unknown;
  acceptedAnswers?: unknown[];
  explanation?: string;
}

export interface ObjectiveReviewItem {
  questionNumber: number;
  questionText: string;
  userAnswer: string;
  acceptedAnswers: string[];
  correct: boolean;
  explanation?: string;
}

export interface ObjectiveReview {
  correct: number;
  total: number;
  items: ObjectiveReviewItem[];
}

export function objectiveDisplayText(value: unknown, fallback = ''): string {
  if (value == null) return fallback;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(item => objectiveDisplayText(item)).filter(Boolean).join(', ') || fallback;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    for (const key of ['text', 'questionText', 'value', 'label', 'title', 'answer', 'content', 'prompt']) {
      const text = objectiveDisplayText(record[key]);
      if (text) return text;
    }
  }
  return fallback;
}

export function normalizeObjectiveAnswer(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[.,!?;:()[\]{}"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandChoiceAnswer(value: unknown, options: unknown[] = []): unknown {
  const raw = String(value ?? '').trim();
  if (!/^[a-z]$/i.test(raw)) return value;
  const index = raw.toUpperCase().charCodeAt(0) - 65;
  return index >= 0 && index < options.length ? objectiveDisplayText(options[index], raw) : value;
}

export function getObjectiveAcceptedAnswers(question: ObjectiveQuestion): string[] {
  const sources = [question.correctAnswer, ...(question.acceptedAnswers ?? [])];
  const answers = sources.flatMap(source => Array.isArray(source)
    ? source
    : String(source ?? '').split(/\s*(?:\/|\||;|,|\bor\b)\s*/i));
  return [...new Set(answers
    .flatMap(answer => [answer, expandChoiceAnswer(answer, question.options)])
    .map(normalizeObjectiveAnswer)
    .filter(Boolean))];
}

export function isObjectiveAnswerCorrect(userAnswer: string, question: ObjectiveQuestion): boolean {
  const normalizedCandidates = [userAnswer, expandChoiceAnswer(userAnswer, question.options)]
    .map(normalizeObjectiveAnswer)
    .filter(Boolean);
  if (!normalizedCandidates.length) return false;
  const accepted = getObjectiveAcceptedAnswers(question);
  return normalizedCandidates.some(candidate => accepted.includes(candidate));
}

export function buildObjectiveReview(
  questions: ObjectiveQuestion[],
  answers: Record<string, string>,
  keyPrefix: 'l' | 'r',
): ObjectiveReview {
  const items = questions.map((question, index) => {
    const userAnswer = answers[`${keyPrefix}_${index}`] ?? '';
    return {
      questionNumber: index + 1,
      questionText: objectiveDisplayText(question.questionText, `Question ${index + 1}`),
      userAnswer,
      acceptedAnswers: getObjectiveAcceptedAnswers(question),
      correct: isObjectiveAnswerCorrect(userAnswer, question),
      explanation: question.explanation,
    };
  });
  return { correct: items.filter(item => item.correct).length, total: items.length, items };
}
