import type { ListeningTest, ReadingTest, SpeakingTest, WritingTest } from '@/types';
import type { ValidationIssue } from '@/lib/ieltsMockValidation';
import {
  validateListeningTest,
  validateReadingTest,
  validateSpeakingTest,
  validateWritingTest,
} from '@/lib/ieltsMockValidation';

export type QualityModuleType = 'reading' | 'listening' | 'writing' | 'speaking';
export type QualityTestData = ReadingTest | ListeningTest | WritingTest | SpeakingTest;

export interface ExistingQualityTest {
  id: string;
  module_type: QualityModuleType;
  test_data: QualityTestData;
}

export interface DuplicateMatch {
  testId: string;
  moduleType: QualityModuleType;
  documentSimilarity: number;
  questionOverlap: number;
}

export interface ModuleQualityReport {
  moduleType: QualityModuleType;
  score: number;
  issues: ValidationIssue[];
  duplicateMatch: DuplicateMatch | null;
}

export interface BundleQualityReport {
  score: number;
  passed: boolean;
  blockingReasons: string[];
  modules: ModuleQualityReport[];
}

export const MINIMUM_PUBLISH_QUALITY_SCORE = 85;

function normalize(value: unknown): string {
  return String(value ?? '')
    .toLowerCase()
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shingles(value: string, size = 3): Set<string> {
  const words = normalize(value).split(' ').filter(Boolean);
  if (words.length < size) return new Set(words);
  return new Set(words.slice(0, words.length - size + 1).map((_, index) => words.slice(index, index + size).join(' ')));
}

export function textSimilarity(left: string, right: string): number {
  const a = shingles(left);
  const b = shingles(right);
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  a.forEach(value => { if (b.has(value)) intersection += 1; });
  return intersection / (a.size + b.size - intersection);
}

function questionTexts(moduleType: QualityModuleType, data: QualityTestData): string[] {
  if (moduleType === 'reading') {
    return (data as ReadingTest).passages.flatMap(passage => passage.questions.map(question => normalize(question.questionText)));
  }
  if (moduleType === 'listening') {
    return (data as ListeningTest).sections.flatMap(section => section.questions.map(question => normalize(question.questionText)));
  }
  if (moduleType === 'writing') {
    return (data as WritingTest).tasks.map(task => normalize(task.prompt));
  }
  return (data as SpeakingTest).parts.flatMap(part => [
    ...(part.questions || []).map(question => normalize(question.text)),
    normalize(part.cueCard?.topic),
    ...(part.cueCard?.bulletPoints || []).map(normalize),
  ]).filter(Boolean);
}

function sourceDocuments(moduleType: QualityModuleType, data: QualityTestData): string[] {
  if (moduleType === 'reading') return (data as ReadingTest).passages.map(passage => normalize(passage.textContent));
  if (moduleType === 'listening') return (data as ListeningTest).sections.map(section => normalize(section.transcript));
  if (moduleType === 'writing') return (data as WritingTest).tasks.map(task => normalize(task.prompt));
  return questionTexts(moduleType, data);
}

function setOverlap(left: string[], right: string[]): number {
  const a = new Set(left.filter(Boolean));
  const b = new Set(right.filter(Boolean));
  if (a.size === 0 || b.size === 0) return 0;
  let overlap = 0;
  a.forEach(value => { if (b.has(value)) overlap += 1; });
  return overlap / Math.min(a.size, b.size);
}

export function findDuplicateMatch(
  moduleType: QualityModuleType,
  candidate: QualityTestData,
  existingTests: ExistingQualityTest[],
): DuplicateMatch | null {
  const candidateDocuments = sourceDocuments(moduleType, candidate);
  const candidateQuestions = questionTexts(moduleType, candidate);
  let best: DuplicateMatch | null = null;

  existingTests.filter(test => test.module_type === moduleType).forEach(test => {
    const existingDocuments = sourceDocuments(moduleType, test.test_data);
    const documentSimilarity = candidateDocuments.reduce((highest, candidateDocument) => Math.max(
      highest,
      ...existingDocuments.map(existingDocument => textSimilarity(candidateDocument, existingDocument)),
    ), 0);
    const questionOverlap = setOverlap(candidateQuestions, questionTexts(moduleType, test.test_data));
    const match = { testId: test.id, moduleType, documentSimilarity, questionOverlap };
    if (!best || Math.max(match.documentSimilarity, match.questionOverlap) > Math.max(best.documentSimilarity, best.questionOverlap)) {
      best = match;
    }
  });

  return best && (best.documentSimilarity >= 0.82 || best.questionOverlap >= 0.6) ? best : null;
}

function validate(moduleType: QualityModuleType, data: QualityTestData): ValidationIssue[] {
  if (moduleType === 'reading') return validateReadingTest(data as ReadingTest);
  if (moduleType === 'listening') return validateListeningTest(data as ListeningTest);
  if (moduleType === 'writing') return validateWritingTest(data as WritingTest);
  return validateSpeakingTest(data as SpeakingTest);
}

export function assessFullMockBundle(
  modules: Record<QualityModuleType, QualityTestData>,
  existingTests: ExistingQualityTest[],
): BundleQualityReport {
  const moduleTypes: QualityModuleType[] = ['listening', 'reading', 'writing', 'speaking'];
  const reports = moduleTypes.map(moduleType => {
    const issues = validate(moduleType, modules[moduleType]);
    const duplicateMatch = findDuplicateMatch(moduleType, modules[moduleType], existingTests);
    const errors = issues.filter(issue => issue.severity === 'error').length;
    const warnings = issues.filter(issue => issue.severity === 'warning').length;
    const duplicatePenalty = duplicateMatch
      ? Math.round(20 + 20 * Math.max(duplicateMatch.documentSimilarity, duplicateMatch.questionOverlap))
      : 0;
    return {
      moduleType,
      score: Math.max(0, 100 - errors * 15 - warnings * 4 - duplicatePenalty),
      issues,
      duplicateMatch,
    } satisfies ModuleQualityReport;
  });

  const score = Math.round(reports.reduce((sum, report) => sum + report.score, 0) / reports.length);
  const blockingReasons = reports.flatMap(report => [
    ...report.issues.filter(issue => issue.severity === 'error').map(issue => `${report.moduleType}: ${issue.message}`),
    ...(report.duplicateMatch ? [`${report.moduleType}: probable duplicate of test ${report.duplicateMatch.testId}`] : []),
  ]);
  if (score < MINIMUM_PUBLISH_QUALITY_SCORE) blockingReasons.push(`Quality score ${score}% is below ${MINIMUM_PUBLISH_QUALITY_SCORE}%.`);

  return { score, passed: blockingReasons.length === 0, blockingReasons, modules: reports };
}
