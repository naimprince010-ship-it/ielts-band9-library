import type {
  ListeningQuestion,
  ListeningTest,
  ReadingQuestion,
  ReadingTest,
  SpeakingTest,
  WritingChartData,
  WritingTask,
  WritingTest,
} from '@/types';
import { writingTask1RendererWouldShow } from '@/components/test/WritingTask1Renderer';

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  severity: ValidationSeverity;
  path: string;
  message: string;
}

const READING_TYPES = new Set([
  'mcq',
  'fill-blank',
  'true-false-not-given',
  'yes-no-not-given',
  'matching-headings',
  'matching-information',
  'matching-features',
  'sentence-completion',
  'summary-completion',
  'diagram-labeling',
  'short-answer',
]);

const LISTENING_TYPES = new Set([
  'mcq',
  'fill-blank',
  'matching',
  'map-labeling',
  'table-completion',
  'summary-completion',
  'sentence-completion',
  'short-answer',
]);

function issue(severity: ValidationSeverity, path: string, message: string): ValidationIssue {
  return { severity, path, message };
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCount(value: string): number {
  return stripHtml(value).split(/\s+/).filter(Boolean).length;
}

function canonicalQuestionType(type: string | undefined): string {
  const normalized = (type ?? '').toLowerCase().replace(/[\s_]/g, '-');
  if (normalized === 'multiple-choice' || normalized === 'multiple-choice-question') return 'mcq';
  return normalized;
}

function validateGroupedQuestions(
  questions: Array<ReadingQuestion | ListeningQuestion>,
  path: string,
  issues: ValidationIssue[],
) {
  const groups = new Map<string, Array<ReadingQuestion | ListeningQuestion>>();
  questions.forEach((q) => {
    if (!q.groupId) return;
    groups.set(q.groupId, [...(groups.get(q.groupId) || []), q]);
  });

  groups.forEach((groupQuestions, groupId) => {
    const master = groupQuestions.find(q => q.tableData || q.summaryData);
    if (!master) {
      issues.push(issue('error', `${path}.${groupId}`, 'Grouped questions need one master question with tableData or summaryData.'));
      return;
    }

    if (master.tableData) {
      const table = master.tableData;
      if (!Array.isArray(table.headers) || table.headers.length === 0) {
        issues.push(issue('error', `${path}.${groupId}.tableData.headers`, 'Table-completion group is missing headers.'));
      }
      if (!Array.isArray(table.rows) || table.rows.length === 0) {
        issues.push(issue('error', `${path}.${groupId}.tableData.rows`, 'Table-completion group is missing rows.'));
      }
      const serialized = JSON.stringify(table);
      groupQuestions.forEach((q) => {
        if (!serialized.includes(`[Q${q.questionNumber}]`) && !serialized.includes(`[${q.questionNumber}]`)) {
          issues.push(issue('warning', `${path}.Q${q.questionNumber}`, 'Grouped table does not contain this question placeholder.'));
        }
      });
    }

    if (master.summaryData) {
      groupQuestions.forEach((q) => {
        if (!master.summaryData?.includes(`[Q${q.questionNumber}]`) && !master.summaryData?.includes(`[${q.questionNumber}]`)) {
          issues.push(issue('warning', `${path}.Q${q.questionNumber}`, 'Grouped summary does not contain this question placeholder.'));
        }
      });
    }
  });
}

function validateQuestion(
  q: ReadingQuestion | ListeningQuestion,
  path: string,
  validTypes: Set<string>,
  issues: ValidationIssue[],
) {
  const canonicalType = canonicalQuestionType(q.type);
  if (!q.questionText?.trim()) issues.push(issue('error', `${path}.questionText`, 'Question text is missing.'));
  if (!q.correctAnswer?.trim()) issues.push(issue('error', `${path}.correctAnswer`, 'Correct answer is missing.'));
  if (!validTypes.has(canonicalType)) issues.push(issue('error', `${path}.type`, `Unsupported question type: ${q.type || 'blank'}.`));
  if (canonicalType === 'mcq' && (!Array.isArray(q.options) || q.options.length < 3)) {
    issues.push(issue('error', `${path}.options`, 'MCQ needs at least 3 answer options.'));
  }
  if ((canonicalType === 'table-completion' || canonicalType === 'summary-completion') && !q.groupId) {
    issues.push(issue('warning', `${path}.groupId`, 'Completion question should use groupId so frontend can render it as a group.'));
  }
}

export function validateReadingTest(test: ReadingTest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const passages = Array.isArray(test.passages) ? test.passages : [];
  if (passages.length !== 3) issues.push(issue('error', 'reading.passages', 'Reading test must have exactly 3 passages.'));

  let questionCount = 0;
  passages.forEach((passage, pIndex) => {
    const path = `reading.passages[${pIndex}]`;
    const questions = Array.isArray(passage.questions) ? passage.questions : [];
    questionCount += questions.length;
    if (!passage.title?.trim()) issues.push(issue('error', `${path}.title`, 'Passage title is missing.'));
    if (wordCount(passage.textContent || '') < 500) {
      issues.push(issue('warning', `${path}.textContent`, 'Passage looks short for IELTS Academic Reading.'));
    }
    questions.forEach((q, qIndex) => validateQuestion(q, `${path}.questions[${qIndex}]`, READING_TYPES, issues));
    validateGroupedQuestions(questions, `${path}.groups`, issues);
  });

  if (questionCount !== 40) issues.push(issue('error', 'reading.totalQuestions', `Reading test must have exactly 40 questions, found ${questionCount}.`));
  return issues;
}

export function validateListeningTest(test: ListeningTest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const sections = Array.isArray(test.sections) ? test.sections : [];
  if (sections.length !== 4) issues.push(issue('error', 'listening.sections', 'Listening test must have exactly 4 sections.'));

  let questionCount = 0;
  sections.forEach((section, sIndex) => {
    const path = `listening.sections[${sIndex}]`;
    const questions = Array.isArray(section.questions) ? section.questions : [];
    questionCount += questions.length;
    if (questions.length !== 10) issues.push(issue('error', `${path}.questions`, `Each listening section needs exactly 10 questions, found ${questions.length}.`));
    if (!section.transcript?.trim()) issues.push(issue('warning', `${path}.transcript`, 'Section transcript is missing, so TTS/audio cannot be generated.'));
    questions.forEach((q, qIndex) => validateQuestion(q, `${path}.questions[${qIndex}]`, LISTENING_TYPES, issues));
    validateGroupedQuestions(questions, `${path}.groups`, issues);
  });

  if (questionCount !== 40) issues.push(issue('error', 'listening.totalQuestions', `Listening test must have exactly 40 questions, found ${questionCount}.`));
  return issues;
}

function validateChart(chart: WritingChartData | undefined, issues: ValidationIssue[]) {
  if (!chart) return;
  if (!['line', 'bar', 'pie', 'combo'].includes(chart.type)) {
    issues.push(issue('error', 'writing.task1.chartData.type', 'Chart type must be line, bar, pie, or combo.'));
  }
  if (!Array.isArray(chart.labels) || chart.labels.length === 0) {
    issues.push(issue('error', 'writing.task1.chartData.labels', 'Chart labels are missing.'));
  }
  if (!Array.isArray(chart.datasets) || chart.datasets.length === 0) {
    issues.push(issue('error', 'writing.task1.chartData.datasets', 'Chart datasets are missing.'));
  }
  chart.datasets?.forEach((dataset, index) => {
    if (Array.isArray(chart.labels) && Array.isArray(dataset.data) && dataset.data.length !== chart.labels.length) {
      issues.push(issue('error', `writing.task1.chartData.datasets[${index}]`, 'Dataset length must match labels length.'));
    }
    if (chart.type === 'combo' && dataset.type && !['line', 'bar'].includes(dataset.type)) {
      issues.push(issue('error', `writing.task1.chartData.datasets[${index}].type`, 'Combo chart datasets must be line or bar.'));
    }
  });
}

export function validateWritingTest(test: WritingTest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const tasks = Array.isArray(test.tasks) ? test.tasks : [];
  if (tasks.length !== 2) issues.push(issue('error', 'writing.tasks', 'Writing test must have exactly 2 tasks.'));

  const task1 = tasks.find(t => t.taskNumber === 1) as WritingTask | undefined;
  const task2 = tasks.find(t => t.taskNumber === 2) as WritingTask | undefined;

  if (!task1?.prompt?.trim()) issues.push(issue('error', 'writing.task1.prompt', 'Task 1 prompt is missing.'));
  if (!task2?.prompt?.trim()) issues.push(issue('error', 'writing.task2.prompt', 'Task 2 prompt is missing.'));
  if (test.testType === 'academic' && !writingTask1RendererWouldShow(task1)) {
    issues.push(issue('error', 'writing.task1.visual', 'Academic Task 1 needs a renderable chart, table, process, map, combo chart, or image.'));
  }
  validateChart(task1?.chartData, issues);
  if (task1?.sampleAnswer && wordCount(task1.sampleAnswer) < 140) {
    issues.push(issue('warning', 'writing.task1.sampleAnswer', 'Task 1 sample answer looks shorter than IELTS minimum.'));
  }
  if (task2?.sampleAnswer && wordCount(task2.sampleAnswer) < 240) {
    issues.push(issue('warning', 'writing.task2.sampleAnswer', 'Task 2 sample answer looks shorter than IELTS minimum.'));
  }
  return issues;
}

export function validateSpeakingTest(test: SpeakingTest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const parts = Array.isArray(test.parts) ? test.parts : [];
  if (parts.length !== 3) issues.push(issue('error', 'speaking.parts', 'Speaking test must have exactly 3 parts.'));
  const part1 = parts.find(p => p.partNumber === 1);
  const part2 = parts.find(p => p.partNumber === 2);
  const part3 = parts.find(p => p.partNumber === 3);
  if (!part1 || !Array.isArray(part1.questions) || part1.questions.length < 4) issues.push(issue('error', 'speaking.part1.questions', 'Part 1 needs at least 4 questions.'));
  if (!part2?.cueCard?.topic?.trim() || !Array.isArray(part2.cueCard.bulletPoints) || part2.cueCard.bulletPoints.length < 4) {
    issues.push(issue('error', 'speaking.part2.cueCard', 'Part 2 needs a cue card with topic and 4 bullet points.'));
  }
  if (!part3 || !Array.isArray(part3.questions) || part3.questions.length < 3) issues.push(issue('error', 'speaking.part3.questions', 'Part 3 needs at least 3 abstract questions.'));
  return issues;
}

export function hasBlockingIssues(issues: ValidationIssue[]): boolean {
  return issues.some(i => i.severity === 'error');
}

export function formatValidationIssues(issues: ValidationIssue[]): string {
  return issues.map(i => `${i.severity.toUpperCase()}: ${i.path} - ${i.message}`).join('\n');
}
