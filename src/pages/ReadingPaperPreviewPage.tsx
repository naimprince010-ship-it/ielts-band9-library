import { useMemo, useState } from 'react';
import { FullMockReadingPaper, type ReadingPaperPassage, type ReadingPaperQuestion } from '@/components/test/FullMockReadingPaper';
import { FULL_MOCK_FALLBACK_TESTS } from '@/data/fullMockFallback';

function buildPreviewPassages(): ReadingPaperPassage[] {
  const source = FULL_MOCK_FALLBACK_TESTS.reading.test_data.passages as ReadingPaperPassage[];
  return source.map((passage, passageIndex) => {
    const questions = (passage.questions ?? []).map((question, localIndex): ReadingPaperQuestion => {
      const number = question.questionNumber ?? passageIndex * 13 + localIndex + 1;
      if (passageIndex === 0 && localIndex < 3) return { ...question, type: 'true-false-not-given', options: ['TRUE', 'FALSE', 'NOT GIVEN'] };
      if (passageIndex === 0 && localIndex >= 3 && localIndex < 6) return { ...question, type: 'matching-headings', options: ['Early development', 'Public response', 'Modern challenges', 'Future planning'] };
      if (passageIndex === 0 && localIndex >= 6 && localIndex < 9) {
        return {
          ...question,
          type: 'summary-completion',
          groupId: 'preview-summary',
          summaryData: localIndex === 6 ? `Complete the summary: planners first considered [Q${number}], then measured [Q${number + 1}], before recommending [Q${number + 2}].` : undefined,
        };
      }
      if (passageIndex === 1 && localIndex < 3) {
        return {
          ...question,
          type: 'table-completion',
          groupId: 'preview-table',
          tableData: localIndex === 0 ? {
            headers: ['Period', 'Key development', 'Effect'],
            rows: [
              { cells: ['Early stage', `[Q${number}]`, 'Local participation'] },
              { cells: ['Later stage', `[Q${number + 1}]`, `[Q${number + 2}]`] },
            ],
          } : undefined,
        };
      }
      if (passageIndex === 1 && localIndex >= 3 && localIndex < 6) return { ...question, type: 'yes-no-not-given', options: ['YES', 'NO', 'NOT GIVEN'] };
      if (passageIndex === 2 && localIndex < 4) return { ...question, type: 'matching-information', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'] };
      return { ...question, type: localIndex % 2 ? 'short-answer' : 'mcq' };
    });
    return {
      ...passage,
      paragraphs: passage.paragraphs ?? [
        { label: 'A', content: passage.textContent },
        { label: 'B', content: 'Researchers compared historical records with modern survey data to identify long-term changes.' },
        { label: 'C', content: 'The findings suggest that careful planning and regular community feedback produce the strongest outcomes.' },
      ],
      questions,
    };
  });
}

export default function ReadingPaperPreviewPage() {
  const passages = useMemo(buildPreviewPassages, []);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activePassage, setActivePassage] = useState(0);
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  return <FullMockReadingPaper
    passages={passages}
    answers={answers}
    activePassage={activePassage}
    setActivePassage={setActivePassage}
    setAnswer={(key, value) => setAnswers(previous => ({ ...previous, [key]: value }))}
    flaggedQuestions={flags}
    toggleFlag={(key) => setFlags(previous => ({ ...previous, [key]: !previous[key] }))}
    timeDisplay="59:57"
    timeWarning={false}
    savedIndicator={false}
    onSubmit={() => undefined}
  />;
}
