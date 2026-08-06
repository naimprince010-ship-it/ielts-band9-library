import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Mic, Square, Trash2, Volume2 } from 'lucide-react';

export interface SpeakingPaperQuestion { text?: string; questionText?: string; recordTime?: number }
export interface SpeakingPaperPart {
  title?: string;
  instructions?: string;
  questions?: SpeakingPaperQuestion[];
  cueCard?: { topic?: string; bulletPoints?: string[]; prepTime?: number; recordTime?: number };
}
export interface SpeakingPaperClip {
  id: string; url: string; duration: number; label: string; size: number;
  uploadStatus: 'local' | 'uploading' | 'uploaded' | 'error';
}

interface Props {
  parts: SpeakingPaperPart[];
  typedResponse: string;
  setTypedResponse: (value: string) => void;
  clips: SpeakingPaperClip[];
  isRecording: boolean;
  recordingSeconds: number;
  recordingError: string | null;
  timeDisplay: string;
  timeWarning: boolean;
  savedIndicator: boolean;
  startRecording: (label: string) => void;
  stopRecording: () => void;
  deleteClip: (id: string) => void;
  onSubmit: () => void;
}

type ResponseMap = Record<string, string>;
interface SpeechResultEventLike { resultIndex: number; results: ArrayLike<{ 0: { transcript: string }; isFinal?: boolean }> }
interface SpeechRecognitionLike {
  continuous: boolean; interimResults: boolean; lang: string;
  onresult: ((event: SpeechResultEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void; stop: () => void;
}
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;
const textOf = (q: SpeakingPaperQuestion, fallback: string) => q.text || q.questionText || fallback;
const clock = (seconds: number) => `${Math.floor(Math.max(seconds, 0) / 60).toString().padStart(2, '0')}:${(Math.max(seconds, 0) % 60).toString().padStart(2, '0')}`;

export function FullMockSpeakingPaper({ parts, typedResponse, setTypedResponse, clips, isRecording, recordingSeconds, recordingError, timeDisplay, timeWarning, savedIndicator, startRecording, stopRecording, deleteClip, onSubmit }: Props) {
  const [partIndex, setPartIndex] = useState(() => Number(sessionStorage.getItem('fullMockSpeakingPart') || 0));
  const [responses, setResponses] = useState<ResponseMap>(() => typedResponse ? { legacy: typedResponse } : {});
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [prepLeft, setPrepLeft] = useState<number | null>(null);
  const prepInterval = useRef<number | null>(null);
  const speechRef = useRef<SpeechRecognitionLike | null>(null);
  const safePartIndex = Math.min(Math.max(partIndex, 0), Math.max(parts.length - 1, 0));
  const part = parts[safePartIndex];

  const tasks = useMemo(() => parts.flatMap((item, pIndex) => item.cueCard
    ? [{ key: `p${pIndex + 1}-cue`, part: pIndex, label: 'Cue Card', question: item.cueCard?.topic || 'Cue card topic' }]
    : (item.questions || []).map((question, qIndex) => ({ key: `p${pIndex + 1}-q${qIndex + 1}`, part: pIndex, label: `Question ${qIndex + 1}`, question: textOf(question, `Question ${qIndex + 1}`) }))), [parts]);
  const partTasks = tasks.filter(task => task.part === safePartIndex);
  const completed = tasks.filter(task => Boolean(responses[task.key]?.trim()) || clips.some(clip => clip.label === task.key)).length;
  const requestSubmit = () => {
    const incomplete = Math.max(tasks.length - completed, 0);
    const message = incomplete
      ? `You still have ${incomplete} incomplete speaking prompt${incomplete === 1 ? '' : 's'}. Submit the full mock test anyway?`
      : 'Submit the full mock test for evaluation?';
    if (window.confirm(message)) onSubmit();
  };

  useEffect(() => { sessionStorage.setItem('fullMockSpeakingPart', String(safePartIndex)); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [safePartIndex]);
  useEffect(() => () => {
    if (prepInterval.current) window.clearInterval(prepInterval.current);
    speechRef.current?.stop();
  }, []);
  useEffect(() => {
    if (!isRecording) {
      speechRef.current?.stop();
      speechRef.current = null;
      setActiveKey(null);
    }
    if (isRecording && activeKey) {
      const task = tasks.find(item => item.key === activeKey);
      const sourcePart = task ? parts[task.part] : undefined;
      const max = sourcePart?.cueCard?.recordTime || sourcePart?.questions?.find((_, index) => `p${task!.part + 1}-q${index + 1}` === activeKey)?.recordTime || (task?.part === 0 ? 45 : 60);
      if (recordingSeconds >= max) stopRecording();
    }
  }, [activeKey, isRecording, parts, recordingSeconds, stopRecording, tasks]);

  const updateResponse = (key: string, value: string) => {
    const next = { ...responses, legacy: undefined, [key]: value } as ResponseMap;
    delete next.legacy;
    setResponses(next);
    setTypedResponse(tasks.map(task => `${task.label}: ${task.question}\n${next[task.key] || ''}`).join('\n\n'));
  };
  const beginRecording = (key: string) => {
    if (isRecording && activeKey === key) return stopRecording();
    if (isRecording) return;
    setActiveKey(key);
    startRecording(key);
    const speechWindow = window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor };
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (Recognition) {
      const recognition = new Recognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-GB';
      let finalText = responses[key] || '';
      recognition.onresult = event => {
        let interim = '';
        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          const result = event.results[index];
          if (result.isFinal) finalText = `${finalText} ${result[0].transcript}`.trim();
          else interim += result[0].transcript;
        }
        updateResponse(key, `${finalText}${interim ? ` ${interim}` : ''}`.trim());
      };
      speechRef.current = recognition;
      try { recognition.start(); } catch { speechRef.current = null; }
    }
  };
  const beginPrep = () => {
    if (prepInterval.current) window.clearInterval(prepInterval.current);
    setPrepLeft(part?.cueCard?.prepTime || 60);
    prepInterval.current = window.setInterval(() => setPrepLeft(value => {
      if (value === null || value <= 1) {
        if (prepInterval.current) window.clearInterval(prepInterval.current);
        prepInterval.current = null;
        return 0;
      }
      return value - 1;
    }), 1000);
  };

  const renderRecorder = (key: string, seconds: number) => {
    const active = isRecording && activeKey === key;
    const remaining = active ? Math.max(seconds - recordingSeconds, 0) : seconds;
    return <>
      <div className="speaking-paper__mic-row">
        <button type="button" aria-label={active ? 'Stop recording' : 'Start recording'} className={`speaking-paper__mic-button ${active ? 'recording' : ''}`} onClick={() => beginRecording(key)} disabled={isRecording && !active}>
          {active ? <Square size={17} fill="currentColor" /> : <Mic size={18} />}
        </button>
        <span className={remaining <= 10 && active ? 'warning' : ''}>{clock(remaining)}</span>
        <small>{active ? 'Recording—stop when you finish' : `Maximum ${seconds} seconds`}</small>
      </div>
      <textarea className="speaking-paper__transcript" value={responses[key] || ''} onChange={event => updateResponse(key, event.target.value)} placeholder="Your transcript will appear here, or you can type your response…" />
    </>;
  };

  return <div className="speaking-paper">
    <header className="speaking-paper__header">
      <div className="speaking-paper__brand"><span />IELTS Speaking — Mock</div>
      <nav className="speaking-paper__tabs" aria-label="Speaking parts">
        {parts.map((_, index) => <button key={index} type="button" disabled={isRecording} className={index === safePartIndex ? 'active' : ''} onClick={() => setPartIndex(index)}>Part {index + 1}</button>)}
      </nav>
      <div className={`speaking-paper__timer ${timeWarning ? 'warning' : ''}`}><small>Time left</small><strong>{timeDisplay}</strong></div>
      <button type="button" className="speaking-paper__submit" disabled={isRecording} onClick={requestSubmit}>Submit full mock test</button>
    </header>

    <div className="speaking-paper__layout">
      <aside className="speaking-paper__sidebar">
        <h3>Response progress</h3>
        {parts.map((item, pIndex) => <div className="speaking-paper__track-group" key={pIndex}>
          <b>Part {pIndex + 1}</b>
          {tasks.filter(task => task.part === pIndex).map(task => {
            const done = Boolean(responses[task.key]?.trim()) || clips.some(clip => clip.label === task.key);
            return <button type="button" key={task.key} onClick={() => !isRecording && setPartIndex(pIndex)}><span className={done ? 'done' : ''}>{done && <Check size={11}/>}</span>{task.label}</button>;
          })}
        </div>)}
        <div className="speaking-paper__progress-line"><span>Completed</span><strong>{completed} / {tasks.length}</strong></div>
        <div className="speaking-paper__saved">{savedIndicator ? 'Responses saved' : 'Saving responses…'}</div>
      </aside>

      <main className="speaking-paper__main">
        <div className="speaking-paper__part-head"><h1>Part {safePartIndex + 1}</h1><span>{safePartIndex === 0 ? 'Introduction & Interview' : safePartIndex === 1 ? 'Individual Long Turn' : 'Two-way Discussion'}</span></div>
        <p className="speaking-paper__instructions">{part?.instructions || 'Answer naturally and speak clearly into your microphone.'}</p>
        {recordingError && <div className="speaking-paper__error"><b>Microphone unavailable</b><span>{recordingError}</span></div>}

        {part?.cueCard ? <>
          <article className="speaking-paper__cue-card"><h2>{part.cueCard.topic || 'Cue card topic'}</h2><p>You should say:</p><ul>{(part.cueCard.bulletPoints || []).map((point, index) => <li key={index}>{point}</li>)}</ul></article>
          <section className="speaking-paper__prep"><p>Preparation time</p><strong>{clock(prepLeft ?? (part.cueCard.prepTime || 60))}</strong><button type="button" onClick={beginPrep} disabled={isRecording || (prepLeft !== null && prepLeft > 0)}>{prepLeft === 0 ? 'Preparation complete' : prepLeft === null ? 'Start preparation' : 'Preparing…'}</button></section>
          <article className="speaking-paper__question-card"><div className="speaking-paper__qnum">YOUR RESPONSE</div>{renderRecorder(partTasks[0]?.key || 'p2-cue', part.cueCard.recordTime || 120)}</article>
        </> : partTasks.map((task, index) => <article className="speaking-paper__question-card" key={task.key}>
          <div className="speaking-paper__qnum">QUESTION {index + 1}</div>
          <h2>{task.question}</h2>
          {renderRecorder(task.key, part?.questions?.[index]?.recordTime || (safePartIndex === 0 ? 45 : 60))}
        </article>)}

        {clips.length > 0 && <section className="speaking-paper__clips"><h3><Volume2 size={17}/> Your recordings ({clips.length})</h3>{clips.map(clip => <div key={clip.id}><div><b>{clip.label}</b><audio controls src={clip.url}/></div><button type="button" aria-label="Delete recording" onClick={() => deleteClip(clip.id)}><Trash2 size={17}/></button></div>)}</section>}

        <footer className="speaking-paper__nav">
          <button type="button" disabled={safePartIndex === 0 || isRecording} onClick={() => setPartIndex(safePartIndex - 1)}>← Part {Math.max(safePartIndex, 1)}</button>
          {safePartIndex === parts.length - 1 ? <button type="button" className="submit-action" disabled={isRecording} onClick={requestSubmit}>Submit full mock test →</button> : <button type="button" disabled={isRecording} onClick={() => setPartIndex(safePartIndex + 1)}>Part {safePartIndex + 2} →</button>}
        </footer>
      </main>
    </div>
  </div>;
}
