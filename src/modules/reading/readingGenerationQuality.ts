import type { ReadingLessonData } from './readingLesson';

export interface ReadingGenerationQualityReport {
  passed: boolean;
  blockingReasons: string[];
}

const normalise = (value: string) => value.replace(/\s+/g, ' ').trim().toLowerCase();

const wordsIn = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

export function assessReadingGenerationQuality(topic: string, reading: ReadingLessonData): ReadingGenerationQualityReport {
  const blockingReasons: string[] = [];
  const labels = reading.paragraphs.map((paragraph) => paragraph.label);
  const labelSet = new Set(labels);
  const questions = reading.questionGroups.flatMap((group) => group.questions);
  const wordCount = reading.paragraphs.reduce((total, paragraph) => total + wordsIn(paragraph.content), 0);
  const reconstructedPassage = normalise(reading.paragraphs.map((paragraph) => paragraph.content).join('\n'));

  if (reading.questionGroups.length < 2 || reading.questionGroups.length > 3) {
    blockingReasons.push('Use 2–3 distinct question groups so the learner practises more than one task.');
  }
  if (questions.length < 8 || questions.length > 12) {
    blockingReasons.push('Include 8–12 total questions for a complete Reading practice lesson.');
  }
  if (wordCount < 600 || wordCount > 850) {
    blockingReasons.push('The passage must contain 600–850 words across its labelled paragraphs.');
  }
  if (labels.length < 5 || labels.length > 7 || labelSet.size !== labels.length) {
    blockingReasons.push('Use 5–7 unique labelled paragraphs (A–G).');
  }
  if (normalise(reading.passageContent) !== reconstructedPassage) {
    blockingReasons.push('Passage content must match the labelled paragraphs in the same order.');
  }

  for (const group of reading.questionGroups) {
    if (!group.strategy || group.strategy.steps.length < 2 || group.strategy.focus.length === 0) {
      blockingReasons.push(`Question group “${group.id}” needs a learner-facing focus and at least two strategy steps.`);
    }
    if (group.questions.length < 3) {
      blockingReasons.push(`Question group “${group.id}” needs at least three questions for meaningful practice.`);
    }
  }

  for (const question of questions) {
    const references = question.paragraphRefs ?? [];
    if (!references.length || references.some((reference) => !labelSet.has(reference))) {
      blockingReasons.push(`Question “${question.id}” needs valid paragraph evidence references.`);
    }
    if (!question.explanation.trim() || !/paragraph\s+[A-G]\b/i.test(question.explanation)) {
      blockingReasons.push(`Question “${question.id}” needs an explanation that identifies its evidence paragraph.`);
    }
  }

  const loweredTopic = topic.toLowerCase();
  const skimmingGroups = reading.questionGroups.filter((group) => group.strategy?.focus.includes('skimming'));
  const scanningGroups = reading.questionGroups.filter((group) => group.strategy?.focus.includes('scanning'));
  if (loweredTopic.includes('skimm') && (!skimmingGroups.length || skimmingGroups.every((group) => group.questions.length < 3))) {
    blockingReasons.push('A skimming topic needs a dedicated 3+ question skimming task.');
  }
  if (loweredTopic.includes('scann') && (!scanningGroups.length || scanningGroups.every((group) => group.questions.length < 3))) {
    blockingReasons.push('A scanning topic needs a dedicated 3+ question scanning task.');
  }
  if (loweredTopic.includes('skimm') && loweredTopic.includes('scann') && skimmingGroups.some((group) => scanningGroups.includes(group))) {
    blockingReasons.push('Skimming and scanning must be practised in separate question groups.');
  }

  return { passed: blockingReasons.length === 0, blockingReasons: [...new Set(blockingReasons)] };
}
