import { useMemo, useState } from 'react';
import { FullMockWritingPaper } from '@/components/test/FullMockWritingPaper';
import { FULL_MOCK_FALLBACK_TESTS } from '@/data/fullMockFallback';
import type { WritingTask } from '@/types';

export default function WritingPaperPreviewPage() {
  if (new URLSearchParams(window.location.search).get('screen') === 'test') {
    sessionStorage.setItem('fullMockWritingStarted', '1');
  }
  const tasks = useMemo(() => FULL_MOCK_FALLBACK_TESTS.writing.test_data.tasks as WritingTask[], []);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  return <FullMockWritingPaper
    task1={tasks[0]}
    task2={tasks[1]}
    answers={answers}
    setAnswer={(key, value) => setAnswers(previous => ({ ...previous, [key]: value }))}
    timeDisplay="59:57"
    timeWarning={false}
    savedIndicator={false}
    pauseTimer={() => undefined}
    startTimer={() => undefined}
    onSubmit={() => undefined}
  />;
}
