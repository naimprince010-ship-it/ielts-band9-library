import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { sanitizeHtml } from '@/lib/sanitize';
import { WritingTask1Renderer } from '@/components/test/WritingTask1Renderer';
import type { WritingTask } from '@/types';

interface Props {
  task1?: WritingTask;
  task2?: WritingTask;
  answers: Record<string, string>;
  setAnswer: (key: 'w_task1' | 'w_task2', value: string) => void;
  timeDisplay: string;
  timeWarning: boolean;
  savedIndicator: boolean;
  pauseTimer?: () => void;
  startTimer?: () => void;
  onSubmit: () => void;
  /** Keeps the single-test draft separate from a Full Mock attempt. */
  storagePrefix?: string;
}

function text(value: unknown, fallback = ''): string {
  if (value == null) return fallback;
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    for (const key of ['text', 'prompt', 'title', 'value', 'label']) {
      const candidate = (value as Record<string, unknown>)[key];
      if (candidate != null) return text(candidate, fallback);
    }
  }
  return fallback;
}

function wordCount(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
}

function hasTask1Visual(task?: WritingTask): boolean {
  return !!(task && (task.imageUrl || task.chartData || task.tableData || task.processData || task.mapData));
}

export function FullMockWritingPaper({ task1, task2, answers, setAnswer, timeDisplay, timeWarning, savedIndicator, pauseTimer, startTimer, onSubmit, storagePrefix = 'fullMockWriting' }: Props) {
  const startedKey = `${storagePrefix}Started`;
  const activeTaskKey = `${storagePrefix}ActiveTask`;
  const [started, setStarted] = useState(() => sessionStorage.getItem(startedKey) === '1');
  const [activeTask, setActiveTask] = useState<0 | 1>(() => sessionStorage.getItem(activeTaskKey) === '1' ? 1 : 0);
  const responses = [answers.w_task1 ?? '', answers.w_task2 ?? ''];
  const counts = responses.map(wordCount);
  const minimums = [150, 250];
  const task = activeTask === 0 ? task1 : task2;
  const key = activeTask === 0 ? 'w_task1' : 'w_task2';
  const minimum = minimums[activeTask];
  const count = counts[activeTask];
  const prompt = text(task?.prompt, activeTask === 0
    ? 'Summarise the visual information by selecting and reporting the main features, and make comparisons where relevant.'
    : 'Write an essay in response to the statement. Discuss the relevant views and give your own opinion.');

  useEffect(() => {
    sessionStorage.setItem(activeTaskKey, String(activeTask));
  }, [activeTask, activeTaskKey]);

  useEffect(() => {
    if (!started) pauseTimer?.();
  }, [pauseTimer, started]);

  const beginTest = () => {
    sessionStorage.setItem(startedKey, '1');
    setStarted(true);
    startTimer?.();
  };

  const requestSubmit = () => {
    const missing = counts.map((value, index) => Math.max(0, minimums[index] - value));
    const message = missing.some(Boolean)
      ? `Task 1 needs ${missing[0]} more words and Task 2 needs ${missing[1]} more words. Submit Writing anyway?`
      : 'Submit the Writing section for evaluation?';
    if (window.confirm(message)) {
      sessionStorage.removeItem(activeTaskKey);
      sessionStorage.removeItem(startedKey);
      onSubmit();
    }
  };

  if (!started) return <div className="writing-paper-cover-screen">
    <section className="writing-paper-cover">
      <p className="writing-paper-cover-eyebrow">Practice Paper · Writing</p>
      <h1>IELTS Writing<br />Mock Test</h1>
      <p className="writing-paper-cover-subtitle">Complete Task 1 and Task 2 under timed conditions. After submission, the AI examiner will assess your work using the IELTS Writing band criteria.</p>
      <div className="writing-paper-cover-meta">
        <div><strong>02</strong><span>Tasks</span></div>
        <div><strong>150/250</strong><span>Minimum words</span></div>
        <div><strong>60:00</strong><span>Time</span></div>
      </div>
      <ul>
        <li>Allow about 20 minutes for Task 1 (at least 150 words) and 40 minutes for Task 2 (at least 250 words).</li>
        <li>You will be assessed on Task Achievement/Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy.</li>
        <li>Your Writing band weights Task 2 twice as heavily as Task 1.</li>
        <li>An internet connection is required for AI evaluation.</li>
      </ul>
      <button type="button" onClick={beginTest}>Start Writing →</button>
      <small>Continue the full mock test under timed exam conditions.</small>
    </section>
  </div>;

  return <div className="writing-paper-shell">
    <header className="writing-paper-topbar">
      <div className="writing-paper-brand"><span /> IELTS Writing — Mock</div>
      <nav className="writing-paper-tabs" aria-label="Writing tasks">
        {[0, 1].map(index => <button type="button" key={index} className={activeTask === index ? 'active' : ''} onClick={() => setActiveTask(index as 0 | 1)}>Task {index + 1}</button>)}
      </nav>
      <div className="writing-paper-timer"><small>Time left</small><strong className={timeWarning ? 'warning' : ''}>{timeDisplay}</strong></div>
      <button type="button" className="writing-paper-submit" onClick={requestSubmit}>Submit section</button>
    </header>

    <div className="writing-paper-layout">
      <aside className="writing-paper-sidebar">
        <h2>Writing progress</h2>
        {[0, 1].map(index => {
          const reached = counts[index] >= minimums[index];
          return <button type="button" className={`writing-paper-track ${activeTask === index ? 'current' : ''}`} onClick={() => setActiveTask(index as 0 | 1)} key={index}>
            <span><b>Task {index + 1}</b><em>{counts[index]} / {minimums[index]}</em></span>
            <small>{index === 0 ? 'Chart or graph report' : 'Essay response'}</small>
            <i><span className={reached ? 'complete' : ''} style={{ width: `${Math.min(100, counts[index] / minimums[index] * 100)}%` }} /></i>
          </button>;
        })}
        <p>Recommended timing:<br />Task 1 → 20 minutes<br />Task 2 → 40 minutes</p>
      </aside>

      <main className="writing-paper-main">
        <div className="writing-paper-task-head">
          <h1>Task {activeTask + 1}</h1>
          <span>{activeTask === 0 ? 'Report Writing · 150+ words recommended' : 'Essay · 250+ words recommended'}</span>
        </div>

        <section className="writing-paper-prompt">
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(prompt).replace(/\n/g, '<br>') }} />
          {activeTask === 0 && hasTask1Visual(task1) && <div className="writing-paper-visual"><WritingTask1Renderer task={task1!} compact /></div>}
          {activeTask === 0 && !hasTask1Visual(task1) && <div className="writing-paper-no-visual"><AlertCircle /> Task 1 visual unavailable</div>}
        </section>

        <textarea value={responses[activeTask]} onChange={event => setAnswer(key, event.target.value)} placeholder="Write your response here…" aria-label={`Task ${activeTask + 1} response`} />
        <div className="writing-paper-word-live">
          <span>Word count: <b className={count >= minimum ? 'ok' : 'low'}>{count}</b> / {minimum} minimum</span>
          <span>{savedIndicator ? <><CheckCircle /> Saved</> : count >= minimum ? '✓ Minimum reached' : `${minimum - count} more words needed`}</span>
        </div>

        <nav className="writing-paper-nav">
          <button type="button" disabled={activeTask === 0} onClick={() => setActiveTask(0)}>← Task 1</button>
          {activeTask === 0
            ? <button type="button" onClick={() => setActiveTask(1)}>Task 2 →</button>
            : <button type="button" className="submit-action" onClick={requestSubmit}>Submit section →</button>}
        </nav>
      </main>
    </div>
  </div>;
}
