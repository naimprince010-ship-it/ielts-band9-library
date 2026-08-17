import { AlertCircle, CheckCircle, Flag, Pause, Play, Volume2 } from 'lucide-react';
import { sanitizeHtml } from '@/lib/sanitize';

type TableCell = { type?: string; value?: unknown } | string | number;
type TableRow = TableCell[] | { cells?: TableCell[] };

export interface ListeningPaperQuestion {
  id?: string;
  questionNumber?: number;
  type?: string;
  questionText?: unknown;
  options?: unknown[];
  groupId?: string;
  summaryData?: string;
  tableData?: { headers?: unknown[]; rows?: TableRow[] };
}

export interface ListeningPaperSection {
  sectionNumber?: number;
  title?: string;
  questions?: ListeningPaperQuestion[];
  transcript?: string;
  sectionAudioUrl?: string;
}

interface Props {
  sections: ListeningPaperSection[];
  answers: Record<string, string>;
  activeSection: number;
  setActiveSection: (index: number) => void;
  setAnswer: (key: string, value: string) => void;
  flaggedQuestions: Record<string, boolean>;
  toggleFlag: (key: string) => void;
  playedAudioIds: Set<string>;
  playingAudioId: string | null;
  playSectionAudio: (section: ListeningPaperSection, index: number) => void;
  /** A single recording serves every section, so its one-play state is shared. */
  usesGlobalAudio?: boolean;
  audioMessage?: string;
  audioSupported: boolean;
  timeDisplay: string;
  timeWarning: boolean;
  savedIndicator: boolean;
  onSubmit: () => void;
}

function text(value: unknown, fallback = ''): string {
  if (value == null) return fallback;
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    for (const key of ['text', 'label', 'value', 'title']) {
      const candidate = (value as Record<string, unknown>)[key];
      if (candidate != null) return text(candidate, fallback);
    }
  }
  return fallback;
}

export function FullMockListeningPaper({
  sections,
  answers,
  activeSection,
  setActiveSection,
  setAnswer,
  flaggedQuestions,
  toggleFlag,
  playedAudioIds,
  playingAudioId,
  playSectionAudio,
  usesGlobalAudio = false,
  audioMessage,
  audioSupported,
  timeDisplay,
  timeWarning,
  savedIndicator,
  onSubmit,
}: Props) {
  const section = sections[activeSection];
  const sectionStart = sections.slice(0, activeSection).reduce((sum, item) => sum + (item.questions?.length ?? 0), 0);
  const totalQuestions = sections.reduce((sum, item) => sum + (item.questions?.length ?? 0), 0);
  const answeredCount = Array.from({ length: totalQuestions }, (_unused, index) => answers[`l_${index}`]).filter(value => value?.trim()).length;
  const requestSubmit = () => {
    const unanswered = Math.max(totalQuestions - answeredCount, 0);
    const message = unanswered
      ? `You still have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. Submit Listening anyway?`
      : 'Submit the Listening section?';
    if (window.confirm(message)) onSubmit();
  };
  const audioId = usesGlobalAudio ? 'global' : `section-${section?.sectionNumber ?? activeSection + 1}`;
  const isPlaying = playingAudioId === audioId;
  const wasPlayed = playedAudioIds.has(audioId);

  const goToQuestion = (sectionIndex: number, questionIndex: number) => {
    setActiveSection(sectionIndex);
    requestAnimationFrame(() => document.getElementById(`l_${questionIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };

  const questionKey = (target: ListeningPaperQuestion, fallbackIndex: number) => {
    const localIndex = section.questions?.indexOf(target) ?? -1;
    return `l_${sectionStart + (localIndex >= 0 ? localIndex : fallbackIndex)}`;
  };

  const renderCompletionText = (content: string, groupQuestions: ListeningPaperQuestion[]) =>
    content.split(/(\[Q?\d+\])/g).map((part, partIndex) => {
      const match = part.match(/^\[Q?(\d+)\]$/);
      if (!match) return <span key={partIndex} dangerouslySetInnerHTML={{ __html: sanitizeHtml(part) }} />;

      const number = Number(match[1]);
      const target = groupQuestions.find((item) => item.questionNumber === number);
      if (!target) return <span key={partIndex}>{part}</span>;
      const fallbackIndex = section.questions?.indexOf(target) ?? 0;
      const key = questionKey(target, fallbackIndex);
      return (
        <span key={`${key}-${partIndex}`} className="listening-paper-inline-answer">
          <span>{number}</span>
          <input id={key} value={answers[key] ?? ''} onChange={(event) => setAnswer(key, event.target.value)} aria-label={`Answer question ${number}`} />
          <button type="button" onClick={() => toggleFlag(key)} className={flaggedQuestions[key] ? 'flagged' : ''} aria-label={`Flag question ${number}`}><Flag /></button>
        </span>
      );
    });

  if (!section) {
    return <div className="listening-paper-empty"><AlertCircle /> Listening content is unavailable.</div>;
  }

  return (
    <div className="listening-paper-shell">
      <header className="listening-paper-topbar">
        <div className="listening-paper-brand"><span /> IELTS Listening — Mock</div>
        <div className="listening-paper-timer"><small>Time left</small><strong className={timeWarning ? 'warning' : ''}>{timeDisplay}</strong></div>
        <button type="button" onClick={requestSubmit}>Submit section</button>
      </header>

      <div className="listening-paper-layout">
        <aside className="listening-paper-sidebar" aria-label="Listening answer sheet">
          <h2>Answer sheet</h2>
          {sections.map((item, sectionIndex) => {
            const start = sections.slice(0, sectionIndex).reduce((sum, previous) => sum + (previous.questions?.length ?? 0), 0);
            const questions = item.questions ?? [];
            return (
              <section key={sectionIndex} className="listening-paper-omr-group">
                <div><strong>Section {sectionIndex + 1}</strong><span>{start + 1}–{start + questions.length}</span></div>
                <div className="listening-paper-omr-grid">
                  {questions.map((_question, localIndex) => {
                    const globalIndex = start + localIndex;
                    const key = `l_${globalIndex}`;
                    return (
                      <button type="button" key={key} onClick={() => goToQuestion(sectionIndex, globalIndex)}
                        className={`${answers[key]?.trim() ? 'answered' : ''} ${activeSection === sectionIndex ? 'current' : ''} ${flaggedQuestions[key] ? 'flagged' : ''}`}>
                        {globalIndex + 1}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
          <div className="listening-paper-progress"><span>Answered</span><strong>{answeredCount} / {totalQuestions}</strong></div>
        </aside>

        <main className="listening-paper-main">
          {!audioSupported && <div className="listening-paper-alert"><AlertCircle /> Audio is not supported in this browser.</div>}

          <div className="listening-paper-section-heading">
            <div><h1>{text(section.title, `Section ${activeSection + 1}`)}</h1><span>Questions {sectionStart + 1}–{sectionStart + (section.questions?.length ?? 0)}</span></div>
            {savedIndicator && <small><CheckCircle /> Saved</small>}
          </div>
          <p className="listening-paper-instruction">Listen carefully and answer all questions in this section. The recording can be played once only.</p>

          <div className="listening-paper-audio">
            <button type="button" disabled={wasPlayed && !isPlaying} onClick={() => playSectionAudio(section, activeSection)} aria-label={isPlaying ? 'Stop audio' : 'Play section audio'}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <div className={`listening-paper-wave ${isPlaying ? 'playing' : ''}`}>{Array.from({ length: 28 }, (_unused, index) => <span key={index} />)}</div>
            <div><Volume2 /><span>{isPlaying ? 'Audio playing…' : wasPlayed ? 'Completed' : 'Click to start'}</span></div>
          </div>
          {audioMessage && <p className="listening-paper-audio-message">{audioMessage}</p>}

          <div className="listening-paper-questions">
            {(() => {
              const processedGroups = new Set<string>();
              return (section.questions ?? []).map((question, localIndex) => {
              const globalIndex = sectionStart + localIndex;
              const number = globalIndex + 1;
              const key = `l_${globalIndex}`;
              const options = Array.isArray(question.options) ? question.options : [];
              if (question.groupId) {
                if (processedGroups.has(question.groupId)) return null;
                processedGroups.add(question.groupId);
                const groupQuestions = (section.questions ?? []).filter((item) => item.groupId === question.groupId);
                const master = groupQuestions.find((item) => item.tableData || item.summaryData) ?? question;
                const numbers = groupQuestions.map((item) => item.questionNumber).filter((item): item is number => typeof item === 'number');
                const range = numbers.length > 0 ? `${Math.min(...numbers)}–${Math.max(...numbers)}` : String(number);
                return (
                  <article key={question.groupId} className="listening-paper-question listening-paper-group-question">
                    <div className="listening-paper-question-number">{range}</div>
                    <div className="listening-paper-question-body">
                      <div className="listening-paper-question-title"><p>{text(master.questionText, `Questions ${range}`)}</p></div>
                      {master.tableData ? (
                        <div className="listening-paper-table-wrap"><table>
                          {master.tableData.headers && <thead><tr>{master.tableData.headers.map((heading, index) => <th key={index}>{text(heading)}</th>)}</tr></thead>}
                          <tbody>{(master.tableData.rows ?? []).map((row, rowIndex) => <tr key={rowIndex}>{(Array.isArray(row) ? row : row.cells ?? []).map((cell, cellIndex) => {
                            const content = text(typeof cell === 'object' && !Array.isArray(cell) ? cell.value : cell);
                            return <td key={cellIndex}>{renderCompletionText(content, groupQuestions)}</td>;
                          })}</tr>)}</tbody>
                        </table></div>
                      ) : master.summaryData ? (
                        <div className="listening-paper-summary">{renderCompletionText(master.summaryData, groupQuestions)}</div>
                      ) : null}
                    </div>
                  </article>
                );
              }
              return (
                <article key={key} id={key} className="listening-paper-question">
                  <div className="listening-paper-question-number">{number}</div>
                  <div className="listening-paper-question-body">
                    <div className="listening-paper-question-title">
                      <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(text(question.questionText, `Question ${number}`)) }} />
                      <button type="button" onClick={() => toggleFlag(key)} className={flaggedQuestions[key] ? 'flagged' : ''} aria-label={`Flag question ${number}`}><Flag /></button>
                    </div>
                    {question.tableData ? (
                      <div className="listening-paper-table-wrap"><table>
                        {question.tableData.headers && <thead><tr>{question.tableData.headers.map((heading, index) => <th key={index}>{text(heading)}</th>)}</tr></thead>}
                        <tbody>{(question.tableData.rows ?? []).map((row, rowIndex) => <tr key={rowIndex}>{(Array.isArray(row) ? row : row.cells ?? []).map((cell, cellIndex) => <td key={cellIndex}>{typeof cell === 'object' && !Array.isArray(cell) && cell.type !== 'text' ? <input value={answers[key] ?? ''} onChange={event => setAnswer(key, event.target.value)} /> : text(typeof cell === 'object' && !Array.isArray(cell) ? cell.value : cell)}</td>)}</tr>)}</tbody>
                      </table></div>
                    ) : options.length > 0 ? (
                      <div className="listening-paper-options">{options.map((option, optionIndex) => {
                        const optionText = text(option, `Option ${optionIndex + 1}`);
                        return <label key={optionIndex}><input type="radio" name={key} checked={answers[key] === optionText} onChange={() => setAnswer(key, optionText)} /><b>{String.fromCharCode(65 + optionIndex)}.</b><span>{optionText}</span></label>;
                      })}</div>
                    ) : (
                      <input className="listening-paper-text-answer" value={answers[key] ?? ''} onChange={event => setAnswer(key, event.target.value)} placeholder="Type your answer" />
                    )}
                  </div>
                </article>
              );
              });
            })()}
          </div>

          <nav className="listening-paper-section-nav">
            <button type="button" disabled={activeSection === 0} onClick={() => { setActiveSection(activeSection - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>← Previous section</button>
            {activeSection === sections.length - 1
              ? <button type="button" className="submit-action" onClick={requestSubmit}>Submit section →</button>
              : <button type="button" onClick={() => { setActiveSection(activeSection + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Next section →</button>}
          </nav>
        </main>
      </div>
    </div>
  );
}
