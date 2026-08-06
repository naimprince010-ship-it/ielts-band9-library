import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Flag, Highlighter } from 'lucide-react';
import { sanitizeHtml } from '@/lib/sanitize';

type TableCell = { type?: string; value?: unknown } | string | number;
type TableRow = TableCell[] | { cells?: TableCell[] };

export interface ReadingPaperQuestion {
  id?: string;
  questionNumber?: number;
  type?: string;
  questionText?: unknown;
  options?: unknown[];
  groupId?: string;
  summaryData?: string;
  tableData?: { headers?: unknown[]; rows?: TableRow[] };
}

export interface ReadingPaperPassage {
  title?: unknown;
  textContent?: unknown;
  paragraphs?: { label?: unknown; content?: unknown }[];
  questions?: ReadingPaperQuestion[];
}

interface Props {
  passages: ReadingPaperPassage[];
  answers: Record<string, string>;
  activePassage: number;
  setActivePassage: (index: number) => void;
  setAnswer: (key: string, value: string) => void;
  flaggedQuestions: Record<string, boolean>;
  toggleFlag: (key: string) => void;
  timeDisplay: string;
  timeWarning: boolean;
  savedIndicator: boolean;
  onSubmit: () => void;
}

function displayText(value: unknown, fallback = ''): string {
  if (value == null) return fallback;
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    for (const key of ['text', 'label', 'value', 'title']) {
      const candidate = (value as Record<string, unknown>)[key];
      if (candidate != null) return displayText(candidate, fallback);
    }
  }
  return fallback;
}

function canonicalQuestionType(value: unknown): string {
  return displayText(value).toLowerCase().replace(/[\s_]/g, '-');
}

export function FullMockReadingPaper({
  passages,
  answers,
  activePassage,
  setActivePassage,
  setAnswer,
  flaggedQuestions,
  toggleFlag,
  timeDisplay,
  timeWarning,
  savedIndicator,
  onSubmit,
}: Props) {
  const passage = passages[activePassage];
  const highlightStorageKey = `readingPaperHighlights:${passages.map((item) => `${displayText(item.title)}:${displayText(item.textContent).length}`).join('|')}`;
  const passageRef = useRef<HTMLDivElement>(null);
  const passagePaneRef = useRef<HTMLElement>(null);
  const questionsPaneRef = useRef<HTMLElement>(null);
  const mobileScrollRef = useRef({ passage: 0, questions: 0 });
  const [mobileView, setMobileView] = useState<'passage' | 'questions'>('passage');
  const [highlightedHtml, setHighlightedHtml] = useState<Record<number, string>>(() => {
    try {
      return JSON.parse(sessionStorage.getItem(highlightStorageKey) ?? '{}') as Record<number, string>;
    } catch {
      return {};
    }
  });
  const passageStart = passages.slice(0, activePassage).reduce((sum, item) => sum + (item.questions?.length ?? 0), 0);
  const totalQuestions = passages.reduce((sum, item) => sum + (item.questions?.length ?? 0), 0);
  const answeredCount = Array.from({ length: totalQuestions }, (_, index) => answers[`r_${index}`]?.trim()).filter(Boolean).length;

  useEffect(() => {
    try {
      sessionStorage.setItem(highlightStorageKey, JSON.stringify(highlightedHtml));
    } catch {
      // Highlight persistence is optional when browser storage is unavailable.
    }
  }, [highlightStorageKey, highlightedHtml]);

  const passageRange = (index: number) => {
    const start = passages.slice(0, index).reduce((sum, item) => sum + (item.questions?.length ?? 0), 0) + 1;
    return { start, end: start + (passages[index]?.questions?.length ?? 0) - 1 };
  };

  const goToQuestion = (passageIndex: number, globalIndex: number) => {
    setActivePassage(passageIndex);
    mobileScrollRef.current.passage = window.scrollY;
    setMobileView('questions');
    requestAnimationFrame(() => document.getElementById(`r_${globalIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };

  const switchMobileView = (view: 'passage' | 'questions') => {
    if (view === mobileView) return;
    mobileScrollRef.current[mobileView] = window.scrollY;
    setMobileView(view);
    requestAnimationFrame(() => window.scrollTo({ top: mobileScrollRef.current[view], behavior: 'auto' }));
  };

  const changePassage = (index: number) => {
    setActivePassage(index);
    requestAnimationFrame(() => {
      passagePaneRef.current?.scrollTo({ top: 0 });
      questionsPaneRef.current?.scrollTo({ top: 0 });
    });
  };

  const captureHighlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !passageRef.current || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (!passageRef.current.contains(range.commonAncestorContainer)) return;
    const walker = document.createTreeWalker(passageRef.current, NodeFilter.SHOW_TEXT);
    const selectedNodes: Text[] = [];
    let current = walker.nextNode();
    while (current) {
      if (current.textContent?.trim() && range.intersectsNode(current)) selectedNodes.push(current as Text);
      current = walker.nextNode();
    }
    selectedNodes.reverse().forEach((node) => {
      const start = node === range.startContainer ? range.startOffset : 0;
      const end = node === range.endContainer ? range.endOffset : node.length;
      if (start >= end || node.parentElement?.closest('mark')) return;
      const fragmentRange = document.createRange();
      fragmentRange.setStart(node, start);
      fragmentRange.setEnd(node, end);
      const mark = document.createElement('mark');
      fragmentRange.surroundContents(mark);
    });
    setHighlightedHtml(previous => ({ ...previous, [activePassage]: passageRef.current?.innerHTML ?? '' }));
    selection.removeAllRanges();
  };

  const clearHighlights = () => {
    if (!passageRef.current) return;
    passageRef.current.querySelectorAll('mark').forEach(mark => mark.replaceWith(...Array.from(mark.childNodes)));
    passageRef.current.normalize();
    setHighlightedHtml(previous => ({ ...previous, [activePassage]: passageRef.current?.innerHTML ?? '' }));
  };

  const captureTouchHighlight = () => {
    // Mobile browsers finalize native text selection immediately after touchend.
    window.setTimeout(captureHighlight, 0);
  };

  const questionKey = (target: ReadingPaperQuestion, fallbackIndex: number) => {
    const localIndex = passage.questions?.indexOf(target) ?? -1;
    return `r_${passageStart + (localIndex >= 0 ? localIndex : fallbackIndex)}`;
  };

  const renderCompletionText = (content: string, groupQuestions: ReadingPaperQuestion[]) =>
    content.split(/(\[Q?\d+\])/g).map((part, partIndex) => {
      const match = part.match(/^\[Q?(\d+)\]$/);
      if (!match) return <span key={partIndex} dangerouslySetInnerHTML={{ __html: sanitizeHtml(part) }} />;

      const number = Number(match[1]);
      const target = groupQuestions.find((item) => item.questionNumber === number);
      if (!target) return <span key={partIndex}>{part}</span>;
      const fallbackIndex = passage.questions?.indexOf(target) ?? 0;
      const key = questionKey(target, fallbackIndex);
      return (
        <span key={`${key}-${partIndex}`} id={key} className="reading-paper-inline-answer">
          <span>{number}</span>
          <input value={answers[key] ?? ''} onChange={(event) => setAnswer(key, event.target.value)} aria-label={`Answer question ${number}`} />
          <button type="button" onClick={() => toggleFlag(key)} className={flaggedQuestions[key] ? 'flagged' : ''} aria-label={`Flag question ${number}`}><Flag /></button>
        </span>
      );
    });

  if (!passage) return <div className="reading-paper-empty">Reading content is unavailable.</div>;
  const range = passageRange(activePassage);
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);
  const requestSubmit = () => {
    const message = unansweredCount > 0
      ? `You still have ${unansweredCount} unanswered question${unansweredCount === 1 ? '' : 's'}. Submit Reading anyway?`
      : 'Submit the Reading section?';
    if (window.confirm(message)) {
      sessionStorage.removeItem(highlightStorageKey);
      onSubmit();
    }
  };

  return (
    <div className="reading-paper-shell">
      <header className="reading-paper-topbar">
        <div className="reading-paper-brand"><span /> IELTS Reading — Mock</div>
        <nav className="reading-paper-tabs" aria-label="Reading passages">
          {passages.map((_item, index) => <button type="button" key={index} className={index === activePassage ? 'active' : ''} onClick={() => changePassage(index)}>Passage {index + 1}</button>)}
        </nav>
        <div className="reading-paper-timer"><small>Time left</small><strong className={timeWarning ? 'warning' : ''}>{timeDisplay}</strong></div>
        <button type="button" className="reading-paper-submit" onClick={requestSubmit}>Submit section</button>
      </header>

      <div className="reading-paper-layout">
        <aside className="reading-paper-sidebar">
          <h2>Answer sheet</h2>
          <span className="reading-paper-sidebar-swipe" aria-hidden="true">Swipe →</span>
          {passages.map((item, passageIndex) => {
            const itemRange = passageRange(passageIndex);
            return <section className="reading-paper-omr-group" key={passageIndex}>
              <div><strong>Passage {passageIndex + 1}</strong><span>{itemRange.start}–{itemRange.end}</span></div>
              <div className="reading-paper-omr-grid">{(item.questions ?? []).map((_question, localIndex) => {
                const globalIndex = itemRange.start - 1 + localIndex;
                const key = `r_${globalIndex}`;
                return <button type="button" key={key} onClick={() => goToQuestion(passageIndex, globalIndex)} className={`${answers[key]?.trim() ? 'answered' : ''} ${activePassage === passageIndex ? 'current' : ''} ${flaggedQuestions[key] ? 'flagged' : ''}`}>{globalIndex + 1}</button>;
              })}</div>
            </section>;
          })}
          <div className="reading-paper-progress"><span>Answered</span><strong>{answeredCount} / {totalQuestions}</strong></div>
        </aside>

        <main className="reading-paper-split">
          <div className="reading-paper-mobile-toggle"><button className={mobileView === 'passage' ? 'active' : ''} onClick={() => switchMobileView('passage')}>Passage</button><button className={mobileView === 'questions' ? 'active' : ''} onClick={() => switchMobileView('questions')}>Questions</button></div>
          <section ref={passagePaneRef} className={`reading-paper-passage ${mobileView === 'questions' ? 'mobile-hidden' : ''}`}>
            <div className="reading-paper-passage-head"><h1>{displayText(passage.title, `Reading Passage ${activePassage + 1}`)}</h1><span>Passage {activePassage + 1} of {passages.length}</span></div>
            <div className="reading-paper-highlight-hint"><span><Highlighter /> Select text to highlight</span><button type="button" onClick={clearHighlights}>Clear highlights</button></div>
            <div ref={passageRef} className="reading-paper-passage-text" onMouseUp={captureHighlight} onTouchEnd={captureTouchHighlight}>
              {highlightedHtml[activePassage]
                ? <div dangerouslySetInnerHTML={{ __html: highlightedHtml[activePassage] }} />
                : passage.paragraphs?.length
                  ? passage.paragraphs.map((paragraph, index) => <p key={index}><b className="reading-paper-paragraph-label">{displayText(paragraph.label)}</b><span dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayText(paragraph.content)) }} /></p>)
                  : <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayText(passage.textContent)) }} />}
            </div>
          </section>

          <section ref={questionsPaneRef} className={`reading-paper-questions ${mobileView === 'passage' ? 'mobile-hidden' : ''}`}>
            <div className="reading-paper-question-head"><div><small>Passage {activePassage + 1}</small><h2>Questions {range.start}–{range.end}</h2></div>{savedIndicator && <span><CheckCircle /> Saved</span>}</div>
            <p className="reading-paper-instruction">Read the passage and answer all questions. Choose the correct option or type your answer where required.</p>
            <div className="reading-paper-question-list">{(() => {
              const processedGroups = new Set<string>();
              return (passage.questions ?? []).map((question, localIndex) => {
              const globalIndex = passageStart + localIndex;
              const number = globalIndex + 1;
              const key = `r_${globalIndex}`;
              const options = Array.isArray(question.options) ? question.options : [];
              const questionType = canonicalQuestionType(question.type);
              const usesMatchingSelect = questionType.startsWith('matching-');
              if (question.groupId) {
                if (processedGroups.has(question.groupId)) return null;
                processedGroups.add(question.groupId);
                const groupQuestions = (passage.questions ?? []).filter((item) => item.groupId === question.groupId);
                const master = groupQuestions.find((item) => item.tableData || item.summaryData) ?? question;
                const numbers = groupQuestions.map((item) => item.questionNumber).filter((item): item is number => typeof item === 'number');
                const groupRange = numbers.length ? `${Math.min(...numbers)}–${Math.max(...numbers)}` : String(number);
                return <article className="reading-paper-question reading-paper-group-question" key={question.groupId}>
                  <div className="reading-paper-question-number reading-paper-group-number">{groupRange}</div>
                  <div className="reading-paper-question-body">
                    <div className="reading-paper-question-title"><p dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayText(master.questionText, `Questions ${groupRange}`)) }} /></div>
                    {master.tableData ? <div className="reading-paper-table"><table>
                      {master.tableData.headers && <thead><tr>{master.tableData.headers.map((heading, index) => <th key={index}>{displayText(heading)}</th>)}</tr></thead>}
                      <tbody>{(master.tableData.rows ?? []).map((row, rowIndex) => <tr key={rowIndex}>{(Array.isArray(row) ? row : row.cells ?? []).map((cell, cellIndex) => {
                        const content = displayText(typeof cell === 'object' && !Array.isArray(cell) ? cell.value : cell);
                        return <td key={cellIndex}>{renderCompletionText(content, groupQuestions)}</td>;
                      })}</tr>)}</tbody>
                    </table></div> : master.summaryData ? <div className="reading-paper-summary">{renderCompletionText(master.summaryData, groupQuestions)}</div> : null}
                  </div>
                </article>;
              }
              return <article className="reading-paper-question" id={key} key={key}>
                <div className="reading-paper-question-number">{number}</div>
                <div className="reading-paper-question-body">
                  <div className="reading-paper-question-title"><p dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayText(question.questionText, `Question ${number}`)) }} /><button type="button" className={flaggedQuestions[key] ? 'flagged' : ''} onClick={() => toggleFlag(key)} aria-label={`Flag question ${number}`}><Flag /></button></div>
                  {question.tableData ? <div className="reading-paper-table"><table>{question.tableData.headers && <thead><tr>{question.tableData.headers.map((heading, index) => <th key={index}>{displayText(heading)}</th>)}</tr></thead>}<tbody>{(question.tableData.rows ?? []).map((row, rowIndex) => <tr key={rowIndex}>{(Array.isArray(row) ? row : row.cells ?? []).map((cell, cellIndex) => <td key={cellIndex}>{typeof cell === 'object' && !Array.isArray(cell) && cell.type !== 'text' ? <input value={answers[key] ?? ''} onChange={event => setAnswer(key, event.target.value)} /> : displayText(typeof cell === 'object' && !Array.isArray(cell) ? cell.value : cell)}</td>)}</tr>)}</tbody></table></div>
                  : options.length > 0 && usesMatchingSelect ? <select className="reading-paper-match-select" value={answers[key] ?? ''} onChange={event => setAnswer(key, event.target.value)} aria-label={`Answer question ${number}`}><option value="">Select an answer</option>{options.map((option, optionIndex) => { const optionText = displayText(option, `Option ${optionIndex + 1}`); return <option value={optionText} key={optionIndex}>{String.fromCharCode(65 + optionIndex)}. {optionText}</option>; })}</select>
                  : options.length > 0 ? <div className={`reading-paper-options ${/true|false|not given|yes|no/i.test(options.map(displayText).join(' ')) ? 'inline' : ''}`}>{options.map((option, optionIndex) => { const optionText = displayText(option, `Option ${optionIndex + 1}`); return <label key={optionIndex}><input type="radio" name={key} checked={answers[key] === optionText} onChange={() => setAnswer(key, optionText)} /><b>{String.fromCharCode(65 + optionIndex)}.</b><span>{optionText}</span></label>; })}</div>
                  : <input className="reading-paper-text-answer" value={answers[key] ?? ''} onChange={event => setAnswer(key, event.target.value)} placeholder="Type your answer" />}
                </div>
              </article>;
              });
            })()}</div>
            <nav className="reading-paper-nav"><button type="button" disabled={activePassage === 0} onClick={() => changePassage(activePassage - 1)}>← Previous passage</button>{activePassage === passages.length - 1 ? <button type="button" className="submit-action" onClick={requestSubmit}>Submit section →</button> : <button type="button" onClick={() => changePassage(activePassage + 1)}>Next passage →</button>}</nav>
          </section>
        </main>
      </div>
    </div>
  );
}
