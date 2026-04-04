import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Headphones, BookOpen, PenTool, Mic, ChevronRight,
  CheckCircle, AlertCircle, Award, Play, RotateCcw,
  Loader2, Target, Crown, Timer, Check, Volume2,
  Shield, Zap, Wifi, Lock, ArrowRight, Square, MicOff, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

type Phase = 'intro' | 'listening' | 'reading' | 'writing' | 'speaking' | 'results';
type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking';

export interface TableCell {
  type: 'text' | 'input';
  value?: string;
}

interface Question {
  id?: string;
  type: string;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  tableData?: {
    headers?: string[];
    rows: TableCell[][];
  };
}

interface MockTest {
  id: string;
  title: string;
  module_type: ModuleType;
  test_data: Record<string, unknown>;
}

interface SectionScores {
  listening: number | null;
  reading: number | null;
  writing: number | null;
  speaking: number | null;
}

const SECTIONS: { phase: Phase; module: ModuleType; label: string; duration: number; icon: React.ReactNode; color: string; bg: string }[] = [
  { phase: 'listening', module: 'listening', label: 'Listening', duration: 30 * 60, icon: <Headphones className="h-5 w-5" />, color: 'text-violet-600', bg: 'bg-violet-500' },
  { phase: 'reading',   module: 'reading',   label: 'Reading',   duration: 60 * 60, icon: <BookOpen className="h-5 w-5" />,   color: 'text-blue-600',   bg: 'bg-blue-500'   },
  { phase: 'writing',   module: 'writing',   label: 'Writing',   duration: 60 * 60, icon: <PenTool className="h-5 w-5" />,   color: 'text-emerald-600', bg: 'bg-emerald-500' },
  { phase: 'speaking',  module: 'speaking',  label: 'Speaking',  duration: 15 * 60, icon: <Mic className="h-5 w-5" />,       color: 'text-orange-600', bg: 'bg-orange-500'  },
];

const testModules = [
  {
    id: 'listening',
    name: 'Listening',
    icon: Headphones,
    duration: '30 min',
    questions: '40 questions',
    description: 'Four recorded sections with native speakers',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: BookOpen,
    duration: '60 min',
    questions: '40 questions',
    description: 'Three reading passages with various question types',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: PenTool,
    duration: '60 min',
    questions: '2 tasks',
    description: 'Task 1: Report/Letter, Task 2: Essay',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: Mic,
    duration: '11-14 min',
    questions: '3 parts',
    description: 'Face-to-face interview simulation',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
  }
];

const preTestChecklist = [
  { id: 1, icon: Headphones, label: 'Headphones connected', description: 'Required for Listening section' },
  { id: 2, icon: Volume2, label: 'Audio working properly', description: 'Test your speakers/headphones' },
  { id: 3, icon: Wifi, label: 'Stable internet connection', description: 'Avoid interruptions during test' },
  { id: 4, icon: Timer, label: '3+ hours available', description: 'Complete test without rushing' },
];

function bandFromScore(correct: number, total: number): number {
  if (total === 0) return 4.0;
  const pct = correct / total;
  if (pct >= 0.97) return 9.0;
  if (pct >= 0.93) return 8.5;
  if (pct >= 0.87) return 8.0;
  if (pct >= 0.80) return 7.5;
  if (pct >= 0.73) return 7.0;
  if (pct >= 0.67) return 6.5;
  if (pct >= 0.60) return 6.0;
  if (pct >= 0.53) return 5.5;
  if (pct >= 0.47) return 5.0;
  if (pct >= 0.40) return 4.5;
  return 4.0;
}

function overallBand(scores: SectionScores): number {
  const vals = [scores.listening, scores.reading, scores.writing, scores.speaking].filter(v => v !== null) as number[];
  if (vals.length === 0) return 0;
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.round(avg * 2) / 2;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function useTimer(initial: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(initial);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => setRunning(true), []);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) { clearInterval(ref.current!); onExpire(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current!);
  }, [running, onExpire]);

  const reset = useCallback((val: number) => {
    clearInterval(ref.current!);
    setRunning(false);
    setRemaining(val);
  }, []);

  return { remaining, start, reset };
}

// ─── Session persistence helpers ──────────────────────────────────────────
const SESSION_KEY = 'mockTestSession_v1';

interface TestSession {
  phase: Phase;
  sectionIndex: number;
  scores: SectionScores;
  playedAudios: string[];
  timerRemaining: number;
  savedAt: number;
}

function loadSession(): TestSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as TestSession;
    // Discard stale sessions older than 4 hours
    if (Date.now() - session.savedAt > 4 * 60 * 60 * 1000) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch { return null; }
}

function saveSession(session: Partial<TestSession>) {
  try {
    const existing = loadSession() ?? {} as TestSession;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...existing, ...session, savedAt: Date.now() }));
  } catch { /* sessionStorage might be blocked in private mode */ }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('mockTestAnswers_v1');
}

export default function FullMockTestPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [resultSaved, setResultSaved] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const saveResultToDb = async (finalScores: SectionScores) => {
    if (!user || !supabase || !isSupabaseConfigured()) return;
    setResultSaved('saving');
    try {
      const overall = overallBand(finalScores);
      const { error } = await supabase.from('mock_test_results').insert({
        user_id: user.id,
        overall_band: overall,
        listening_band: finalScores.listening,
        reading_band: finalScores.reading,
        writing_band: finalScores.writing,
        speaking_band: finalScores.speaking,
        completed_at: new Date().toISOString(),
      });
      if (error) {
        console.error('Failed to save result:', error);
        setResultSaved('error');
      } else {
        setResultSaved('saved');
      }
    } catch (err) {
      console.error('Error saving result:', err);
      setResultSaved('error');
    }
  };

  // Restore from session on first render
  const savedSession = loadSession();

  const [phase, setPhaseRaw] = useState<Phase>(savedSession?.phase ?? 'intro');
  const [tests, setTests] = useState<Partial<Record<ModuleType, MockTest>>>({});
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [playedAudios, setPlayedAudios] = useState<Set<string>>(
    new Set(savedSession?.playedAudios ?? [])
  );
  const [audioSupported, setAudioSupported] = useState(true);
  const cachedVoicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const iosResumeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Voice Recording state (Speaking section) ───────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingLabel, setRecordingLabel] = useState('');
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordedClips, setRecordedClips] = useState<Array<{
    id: string; url: string; duration: number; label: string; size: number;
  }>>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup recording resources when phase changes
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      recordedClips.forEach(clip => URL.revokeObjectURL(clip.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const startRecording = async (label: string) => {
    setRecordingError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setRecordingError('Microphone access is not supported in this browser. Please use Chrome, Firefox, or Edge.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      // Pick best supported MIME type
      const mimeType = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
        ''
      ].find(t => !t || MediaRecorder.isTypeSupported(t)) ?? '';

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const duration = recordingSeconds;
        setRecordedClips(prev => [...prev, {
          id: `clip-${Date.now()}`,
          url,
          duration,
          label,
          size: blob.size
        }]);
        setIsRecording(false);
        setRecordingSeconds(0);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.onerror = () => {
        setRecordingError('Recording failed. Please try again.');
        setIsRecording(false);
        setRecordingSeconds(0);
        stream.getTracks().forEach(t => t.stop());
      };

      setRecordingLabel(label);
      setIsRecording(true);
      setRecordingSeconds(0);
      recorder.start(100);

      // Timer
      let secs = 0;
      recordingTimerRef.current = setInterval(() => {
        secs++;
        setRecordingSeconds(secs);
        // Auto-stop after 3 minutes per clip
        if (secs >= 180) stopRecording();
      }, 1000);

    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setRecordingError('Microphone permission denied. Please allow microphone access in your browser settings and try again.');
      } else {
        setRecordingError(`Could not access microphone: ${err.message}`);
      }
    }
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) { clearInterval(recordingTimerRef.current); recordingTimerRef.current = null; }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const deleteClip = (id: string) => {
    setRecordedClips(prev => {
      const clip = prev.find(c => c.id === id);
      if (clip) URL.revokeObjectURL(clip.url);
      return prev.filter(c => c.id !== id);
    });
  };

  const formatRecordingTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Wrap setPhase to auto-persist
  const setPhase = (p: Phase) => {
    setPhaseRaw(p);
    saveSession({ phase: p });
  };

  // Landing page specific state
  const [selectedMode, setSelectedMode] = useState<'practice' | 'exam'>('exam');
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheckItem = (id: number) => {
    setCheckedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const allChecked = checkedItems.length === preTestChecklist.length;

  // Restore answers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mockTestAnswers_v1');
    if (saved) {
      try { setAnswers(JSON.parse(saved)); } catch (e) { console.error('Failed to load saved answers'); }
    }
  }, []);

  // Persist answers whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('mockTestAnswers_v1', JSON.stringify(answers));
    }
  }, [answers]);

  // ─── AUDIO SYSTEM (Mobile-resilient) ────────────────────────────────────────
  // Strategy: split long transcripts into ≤40-word chunks played sequentially
  // via onend callbacks. This avoids iOS Safari's ~15s TTS cutoff bug and the
  // cancel()+speak() race condition on Android Chrome.

  // Chunk queue stored in a ref so sequential callbacks don't close over stale state.
  const chunkQueueRef = useRef<string[]>([]);
  const activeAudioIdRef = useRef<string | null>(null);

  // Split text into sentence-aware chunks of ≤MAX_WORDS words
  const chunkText = (text: string, maxWords = 40): string[] => {
    // Split on sentence boundaries first
    const sentences = text
      .replace(/\s+/g, ' ')
      .trim()
      .split(/(?<=[.!?])\s+/);
    const chunks: string[] = [];
    let current = '';
    for (const sentence of sentences) {
      const combined = current ? `${current} ${sentence}` : sentence;
      if (combined.split(' ').length > maxWords && current) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current = combined;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks.length > 0 ? chunks : [text];
  };

  // Build and play one utterance; on end, play the next chunk
  const speakChunk = (chunk: string, voiceObj: SpeechSynthesisVoice | null) => {
    if (!chunk || activeAudioIdRef.current === null) return;
    const utt = new SpeechSynthesisUtterance(chunk);
    utt.rate  = 0.9;
    utt.pitch = 1.0;
    utt.volume = 1.0;
    utt.lang  = 'en-GB'; // fallback lang — saves Android Chrome when voices[] is empty
    if (voiceObj) utt.voice = voiceObj;

    utt.onend = () => {
      const next = chunkQueueRef.current.shift();
      if (next && activeAudioIdRef.current !== null) {
        speakChunk(next, voiceObj);
      } else {
        // All chunks done
        activeAudioIdRef.current = null;
        setPlayingAudioId(null);
        stopIosResumePing();
      }
    };
    utt.onerror = (e) => {
      // 'interrupted' means we cancelled intentionally — ignore
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.error('SpeechSynthesis chunk error:', e.error);
      activeAudioIdRef.current = null;
      chunkQueueRef.current = [];
      setPlayingAudioId(null);
      stopIosResumePing();
    };

    window.speechSynthesis.speak(utt);
  };

  // Pre-load voices on mount (ensures voices are cached before first user tap)
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setAudioSupported(false);
      return;
    }
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) cachedVoicesRef.current = v;
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    const t1 = setTimeout(loadVoices, 300);
    const t2 = setTimeout(loadVoices, 1000); // extra retry for slow mobile browsers
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Cancel audio when navigating between phases
  useEffect(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    stopIosResumePing();
    activeAudioIdRef.current = null;
    chunkQueueRef.current = [];
    setPlayingAudioId(null);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // iOS Safari pauses speechSynthesis after ~15s — periodic resume keeps it alive
  const startIosResumePing = () => {
    if (iosResumeIntervalRef.current) clearInterval(iosResumeIntervalRef.current);
    iosResumeIntervalRef.current = setInterval(() => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    }, 5000); // 5s ping (tighter than before to be safe on iOS)
  };

  const stopIosResumePing = () => {
    if (iosResumeIntervalRef.current) {
      clearInterval(iosResumeIntervalRef.current);
      iosResumeIntervalRef.current = null;
    }
  };

  // ── toggleAudio ────────────────────────────────────────────────────────────
  // MUST be called synchronously from an onClick to satisfy mobile user-gesture
  // requirements. No await, no setTimeout before the first speak().
  const toggleAudio = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support audio playback. Please use Chrome, Safari, or Edge.');
      return;
    }
    if (playedAudios.has(id) && playingAudioId !== id) {
      alert('In the real IELTS exam, audio plays only once. This section has already been played.');
      return;
    }

    // ── Stop whatever is currently playing ──────────────────────────────────
    window.speechSynthesis.cancel(); // clears the browser's internal queue
    stopIosResumePing();
    chunkQueueRef.current = [];

    if (playingAudioId === id) {
      // User tapped the same button again → stop
      activeAudioIdRef.current = null;
      setPlayingAudioId(null);
      return;
    }

    // ── Resolve voice (synchronous — no await allowed) ───────────────────────
    const voices = cachedVoicesRef.current;
    const preferred =
      voices.find(v => v.lang === 'en-GB') ||
      voices.find(v => v.lang.startsWith('en-GB')) ||
      voices.find(v => v.lang === 'en-US') ||
      voices.find(v => v.lang.startsWith('en-US')) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0] ||
      null;

    // ── Split into chunks and enqueue all but the first ─────────────────────
    const chunks = chunkText(text);
    const [firstChunk, ...rest] = chunks;
    chunkQueueRef.current = rest;

    activeAudioIdRef.current = id;
    setPlayingAudioId(id);
    setPlayedAudios(prev => new Set(prev).add(id));
    startIosResumePing();

    // ── speak() called synchronously in click handler — user-gesture OK ──────
    speakChunk(firstChunk, preferred);
  };

  const [scores, setScoresRaw] = useState<SectionScores>(
    savedSession?.scores ?? { listening: null, reading: null, writing: null, speaking: null }
  );
  const [sectionIndex, setSectionIndexRaw] = useState(
    savedSession?.sectionIndex ?? 0
  );
  // Saved timer value — used once on mount to restore remaining time
  const restoredTimerRef = useRef<number | null>(savedSession?.timerRemaining ?? null);

  // Wrap setters to auto-persist session
  const setScores = (updater: SectionScores | ((prev: SectionScores) => SectionScores)) => {
    setScoresRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveSession({ scores: next });
      return next;
    });
  };

  const setSectionIndex = (idx: number) => {
    setSectionIndexRaw(idx);
    saveSession({ sectionIndex: idx });
  };

  // Persist playedAudios whenever it changes
  useEffect(() => {
    saveSession({ playedAudios: Array.from(playedAudios) });
  }, [playedAudios]);

  const currentSection = SECTIONS[sectionIndex];
  const submitSectionRef = useRef<() => void>(() => {});
  const startTimerRef = useRef<(() => void) | null>(null);
  const resetTimerRef = useRef<((val: number) => void) | null>(null);

  const handleTimeUp = useCallback(() => submitSectionRef.current(), []);

  // Restore timer from session if available, otherwise use section default
  const initialTimerValue = restoredTimerRef.current ?? (currentSection?.duration ?? 1800);
  const { remaining, start: startTimer, reset: resetTimer } = useTimer(initialTimerValue, handleTimeUp);

  // Persist remaining time every 10 seconds to avoid excessive writes
  const lastTimerSaveRef = useRef(0);
  useEffect(() => {
    const now = Date.now();
    if (now - lastTimerSaveRef.current > 10000) {
      lastTimerSaveRef.current = now;
      saveSession({ timerRemaining: remaining });
    }
  }, [remaining]);

  // On mount: if we restored an in-progress session, auto-start the timer
  const sessionRestoredRef = useRef(false);
  useEffect(() => {
    if (!sessionRestoredRef.current && savedSession && savedSession.phase !== 'intro' && savedSession.phase !== 'results') {
      sessionRestoredRef.current = true;
      // Small delay to let useTimer initialize
      setTimeout(() => startTimerRef.current?.(), 200);
    }
  }, []);

  useEffect(() => { startTimerRef.current = startTimer; }, [startTimer]);
  useEffect(() => { resetTimerRef.current = resetTimer; }, [resetTimer]);

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) { setLoading(false); return; }
    const fetch = async () => {
      try {
        const result: Partial<Record<ModuleType, MockTest>> = {};
        for (const s of SECTIONS) {
          const { data } = await supabase!
            .from('mock_tests')
            .select('*')
            .eq('module_type', s.module)
            .eq('is_published', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          if (data) result[s.module] = data as MockTest;
        }
        setTests(result);
      } catch (err) { console.error('FullMockTestPage fetch error:', err); } finally { setLoading(false); }
    };
    fetch();
  }, []);

  const startSection = (idx: number) => {
    setSectionIndex(idx);
    setAnswers({});
    setPhase(SECTIONS[idx].phase);
    restoredTimerRef.current = null; // Clear restored timer — use fresh duration
    resetTimerRef.current?.(SECTIONS[idx].duration);
    saveSession({ timerRemaining: SECTIONS[idx].duration, sectionIndex: idx, phase: SECTIONS[idx].phase });
    setTimeout(() => startTimerRef.current?.(), 100);
  };

  const submitSection = useCallback((_timeUp = false) => {
    const sec = SECTIONS[sectionIndex];
    const test = tests[sec.module];
    console.log('Submitting section:', sec.module, 'Test data available:', !!test);
    
    let band = 5.0;

    try {
      if (test && test.test_data) {
        const td = test.test_data as any;

        if (sec.module === 'reading') {
          const passages = Array.isArray(td.passages) ? td.passages : (td.passage ? [td.passage] : []);
          const qs = passages.flatMap((p: any) => p.questions || []);
          console.log(`Scoring Reading: ${qs.length} questions found`);
          const correct = qs.filter((q: any, i: number) => {
            const userAnswer = (answers[`r_${i}`] ?? '').trim().toLowerCase();
            const correctAnswer = (q.correctAnswer || '').trim().toLowerCase();
            return userAnswer && correctAnswer && userAnswer === correctAnswer;
          }).length;
          band = bandFromScore(correct, qs.length);
        } else if (sec.module === 'listening') {
          const sections = Array.isArray(td.sections) ? td.sections : [];
          const qs = sections.flatMap((s: any) => s.questions || []);
          console.log(`Scoring Listening: ${qs.length} questions found`);
          const correct = qs.filter((q: any, i: number) => {
            const userAnswer = (answers[`l_${i}`] ?? '').trim().toLowerCase();
            const correctAnswer = (q.correctAnswer || '').trim().toLowerCase();
            return userAnswer && correctAnswer && userAnswer === correctAnswer;
          }).length;
          band = bandFromScore(correct, qs.length);
        } else if (sec.module === 'writing') {
          const task1 = (answers['w_task1'] ?? '').split(/\s+/).filter(Boolean).length;
          const task2 = (answers['w_task2'] ?? '').split(/\s+/).filter(Boolean).length;
          const total = task1 + task2;
          band = total >= 600 ? 7.5 : total >= 450 ? 7.0 : total >= 350 ? 6.5 : total >= 250 ? 6.0 : total >= 150 ? 5.5 : 5.0;
        } else if (sec.module === 'speaking') {
          const words = (answers['sp_answers'] ?? '').split(/\s+/).filter(Boolean).length;
          band = words >= 300 ? 7.0 : words >= 200 ? 6.5 : words >= 100 ? 6.0 : 5.5;
        }
      }
    } catch (err) { console.error('Error calculating score:', err); }

    const finalScores = { ...scores, [sec.module]: band };
    setScores(finalScores);

    const next = sectionIndex + 1;
    if (next < SECTIONS.length) {
      setPhase('intro');
      setSectionIndex(next);
    } else {
      setPhase('results');
      clearSession(); // Test complete — wipe session
      saveResultToDb(finalScores); // 💾 Save to Supabase
    }
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sectionIndex, tests, answers]);

  useEffect(() => { submitSectionRef.current = submitSection; }, [submitSection]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
      </div>
    );
  }

  // ─── INTRO / LANDING SCREEN ───────────────────────────────────────────────
  if (phase === 'intro') {
    const isFirstSection = SECTIONS.every(s => scores[s.module] === null);
    
    if (!isFirstSection) { // Mid-test intro screen
      const nextSection = SECTIONS[sectionIndex];
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-center">
          <div className="container mx-auto px-4 py-12 max-w-lg">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${nextSection.bg} flex items-center justify-center mx-auto mb-4`}>
                   {nextSection.icon}
                </div>
                <CardTitle className="text-2xl font-bold">Ready for {nextSection.label}?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                  <span className="text-indigo-300">Section</span>
                  <span className="font-bold">{sectionIndex + 1} of 4</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                  <span className="text-indigo-300">Duration</span>
                  <span className="font-bold">{Math.floor(nextSection.duration / 60)} minutes</span>
                </div>
                <Button 
                  className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-6 rounded-xl font-bold text-lg"
                  onClick={() => startSection(sectionIndex)}
                >
                  Start {nextSection.label} Section
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    // Main landing page intro
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-accent/20" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-4 py-1.5 font-bold uppercase tracking-wider">
                Complete IELTS Simulation
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                Full Mock Test
              </h1>
              <p className="text-lg md:text-xl text-background/70 mb-8 max-w-2xl mx-auto font-medium">
                Experience a complete IELTS examination simulation with all four modules. 
                Test yourself under real exam conditions and get your predicted band score.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10">
                {[
                  { label: 'Total Duration', value: '2h 45m', color: 'text-accent' },
                  { label: 'Modules', value: '4', color: 'text-background' },
                  { label: 'Questions', value: '120+', color: 'text-background' },
                  { label: 'Band Scale', value: '9.0', color: 'text-background' },
                ].map((stat, i) => (
                  <div key={i} className="text-center group transition-transform hover:scale-105">
                    <div className={`text-3xl md:text-4xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-background/60 font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Test Modules Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Test Modules</h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground text-lg font-medium">Complete all four modules in sequence just like the real exam</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testModules.map((module, index) => (
              <Card key={module.id} className="group relative overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                  module.id === 'listening' ? 'from-blue-500 to-blue-600' :
                  module.id === 'reading' ? 'from-emerald-500 to-emerald-600' :
                  module.id === 'writing' ? 'from-amber-500 to-amber-600' :
                  'from-purple-500 to-purple-600'
                }`} />
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${module.bgColor} group-hover:scale-110 transition-transform`}>
                      <module.icon className={`h-8 w-8 ${module.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs font-bold uppercase tracking-widest">Step {index + 1}</Badge>
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-3">{module.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 font-medium leading-relaxed">{module.description}</p>
                  <div className="flex items-center gap-4 text-sm font-bold">
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-4 w-4" /><span>{module.duration}</span></div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Target className="h-4 w-4" /><span>{module.questions}</span></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Test Mode & Checklist Sidebar Wrapper */}
        <div className="bg-muted/30 py-20 px-4">
           <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
              {/* Left Column: Mode Selection */}
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-black text-foreground mb-4">Choose Test Mode</h2>
                  <p className="text-muted-foreground font-medium">Select a mode that fits your preparation stage</p>
                </div>
                <div className="space-y-6">
                  {/* Exam Mode */}
                  <div className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all ${selectedMode === 'exam' ? 'border-accent bg-accent/5 ring-4 ring-accent/10' : 'border-border bg-background'}`} onClick={() => setSelectedMode('exam')}>
                    <div className="flex gap-4">
                      <div className={`p-4 rounded-2xl ${selectedMode === 'exam' ? 'bg-accent/20' : 'bg-muted'}`}><Shield className={`h-8 w-8 ${selectedMode === 'exam' ? 'text-accent' : 'text-muted-foreground'}`} /></div>
                      <div>
                        <div className="flex items-center gap-2 mb-1"><h3 className="text-xl font-bold">Exam Mode</h3><Badge className="bg-accent text-accent-foreground text-[10px] font-black uppercase">Official</Badge></div>
                        <p className="text-sm text-muted-foreground mb-4">Timed, uninterrupted simulation</p>
                        <ul className="space-y-2 text-xs font-bold">
                          <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-accent" /> Strict time limits</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-accent" /> No pausing allowed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Practice Mode */}
                  <div className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all ${selectedMode === 'practice' ? 'border-emerald-500 bg-emerald-500/5 ring-4 ring-emerald-500/10' : 'border-border bg-background'}`} onClick={() => setSelectedMode('practice')}>
                    <div className="flex gap-4">
                      <div className={`p-4 rounded-2xl ${selectedMode === 'practice' ? 'bg-emerald-500/20' : 'bg-muted'}`}><Zap className={`h-8 w-8 ${selectedMode === 'practice' ? 'text-emerald-500' : 'text-muted-foreground'}`} /></div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">Practice Mode</h3>
                        <p className="text-sm text-muted-foreground mb-4">Flexible learning environment</p>
                        <ul className="space-y-2 text-xs font-bold">
                          <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Pause anytime</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> View hints & tips</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Pre-Test Checklist */}
              <div className="space-y-8">
                 <div className="bg-background p-8 rounded-[40px] border-2 border-border shadow-xl">
                   <h3 className="text-2xl font-black mb-6">Pre-Test Checklist</h3>
                   <div className="space-y-4 mb-8">
                     {preTestChecklist.map((item) => (
                       <div key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${checkedItems.includes(item.id) ? 'bg-accent/10' : 'bg-muted/50 hover:bg-muted'}`} onClick={() => toggleCheckItem(item.id)}>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${checkedItems.includes(item.id) ? 'bg-accent border-accent' : 'border-muted-foreground/30'}`}>
                           {checkedItems.includes(item.id) && <Check className="h-4 w-4 text-white" />}
                         </div>
                         <div className="flex-1"><div className="font-bold text-sm">{item.label}</div><div className="text-[10px] text-muted-foreground">{item.description}</div></div>
                       </div>
                     ))}
                   </div>
                   <div className="space-y-3">
                     <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground"><span>Ready Status</span><span>{checkedItems.length}/{preTestChecklist.length} Ready</span></div>
                     <Progress value={(checkedItems.length / preTestChecklist.length) * 100} className="h-3 rounded-full" />
                   </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Final CTA */}
        <section className="bg-foreground text-background py-24 text-center">
          <div className="max-w-4xl mx-auto px-4">
             <div className="bg-accent h-16 w-16 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 transition-transform hover:rotate-12"><Award className="h-8 w-8 text-white" /></div>
             <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Conquer IELTS?</h2>
             <p className="text-background/70 text-lg mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
               Your full mock test begins with the Listening module. Ensure you have 3 hours of uninterrupted time for a realistic prediction.
             </p>
             {user ? (
               <Button 
                size="lg" 
                onClick={() => startSection(0)} 
                disabled={!allChecked} 
                className="bg-accent hover:bg-accent/90 text-white font-black text-xl px-12 py-8 rounded-[40px] shadow-2xl shadow-accent/40 group gap-4 scale-110"
               >
                 <Play className="h-6 w-6 fill-current" /> START FULL EXAM <ChevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
               </Button>
             ) : (
               <Button size="lg" onClick={() => navigate('/login')} className="bg-accent hover:bg-accent/90 text-white font-black text-xl px-12 py-8 rounded-[40px] gap-4">
                 <Lock className="h-6 w-6" /> SIGN IN TO START
               </Button>
             )}
             {!allChecked && user && <p className="mt-8 text-accent font-bold animate-pulse text-sm">Please complete the checklist to unlock the test</p>}
          </div>
        </section>
      </div>
    );
  }

  // ─── RESULTS ────────────────────────────────────────────────────
  if (phase === 'results') {
    const overall = overallBand(scores);
    const bandColor = overall >= 7 ? 'text-green-400' : overall >= 5.5 ? 'text-yellow-400' : 'text-red-400';

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-20 max-w-3xl">
          <div className="text-center mb-16">
            <div className="w-28 h-28 bg-amber-400 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-400/40 rotate-12">
              <Award className="h-14 w-14 text-amber-900" />
            </div>
            <h1 className="text-5xl font-black mb-4 tracking-tight">Test Complete!</h1>
            <p className="text-indigo-300 text-lg font-medium">Your global IELTS performance report</p>
            {/* Save status indicator */}
            {resultSaved === 'saving' && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
                <span className="text-indigo-300">Saving your result...</span>
              </div>
            )}
            {resultSaved === 'saved' && (
              <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1.5 text-sm font-semibold">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Result saved to your profile</span>
              </div>
            )}
            {resultSaved === 'error' && (
              <div className="mt-4 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 text-sm font-semibold">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <span className="text-red-400">Could not save — please screenshot your score</span>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-[50px] p-12 text-center mb-12 border border-white/20 shadow-3xl">
            <p className="text-indigo-300 text-sm font-black uppercase tracking-[0.3em] mb-4">Overall Predicted Band</p>
            <p className={`text-9xl font-black ${bandColor} mb-6 tracking-tighter`}>{overall.toFixed(1)}</p>
            <div className="h-2 w-24 bg-white/20 mx-auto rounded-full mb-6" />
            <p className="text-xl font-bold text-white/90">
              {overall >= 8 ? 'Expert User — Phenomenal!' : overall >= 7 ? 'Good User — Great potential!' : overall >= 6 ? 'Competent User — Solid foundation!' : 'Modest User — Let\'s work on improvement'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            {SECTIONS.map(s => {
              const band = scores[s.module];
              const bc = band && band >= 7 ? 'text-green-400' : band && band >= 5.5 ? 'text-yellow-400' : 'text-red-400';
              return (
                <div key={s.phase} className="bg-white/5 rounded-3xl p-8 border border-white/10 transition-transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-white`}>{s.icon}</div>
                    <span className="font-black text-sm uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className={`text-5xl font-black ${bc}`}>{band?.toFixed(1) ?? '—'}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" onClick={() => { 
                clearSession(); // Wipe persisted session for a clean retake
                setPhase('intro'); 
                setSectionIndex(0); 
                setScores({ listening: null, reading: null, writing: null, speaking: null }); 
                setAnswers({}); 
                setPlayedAudios(new Set());
              }}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-black px-12 py-8 rounded-[30px] shadow-2xl shadow-indigo-500/40 gap-4"
            >
              <RotateCcw className="h-6 w-6" /> RETAKE FULL EXAM
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/mock-test')}
              className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white px-12 py-8 rounded-[30px] font-black"
            >
              MODULE PRACTICE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ─── SECTION CONTENT ────────────────────────────────────────────
  const test = tests[currentSection.module];
  const td = test?.test_data as Record<string, unknown> | undefined;
  const timeColor = remaining < 300 ? 'text-red-400' : remaining < 600 ? 'text-yellow-400' : 'text-green-400';

  let navKeys: string[] = [];

  if (phase === 'listening') {
    const sections = (td?.sections as Array<{questions: any[]}>) ?? [];
    let i = 0;
    sections.forEach(s => { if (Array.isArray(s.questions)) s.questions.forEach(() => navKeys.push(`l_${i++}`)); });
  } else if (phase === 'reading') {
    const passages = Array.isArray(td?.passages) ? td.passages : (td?.passage ? [td.passage] : []);
    let i = 0;
    passages.forEach((p: any) => { if (Array.isArray(p.questions)) p.questions.forEach(() => navKeys.push(`r_${i++}`)); });
  }

  const scrollToQuestion = (key: string) => {
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-indigo-400', 'rounded-2xl', 'transition-all', 'duration-500');
      setTimeout(() => el.classList.remove('ring-4', 'ring-indigo-400'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-[88px] pb-40">
      <div className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-lg text-white px-6 py-4 flex items-center justify-between shadow-2xl border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 ${currentSection.bg} rounded-xl flex items-center justify-center shadow-lg shadow-black/20`}>{currentSection.icon}</div>
          <div>
            <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em] mb-0.5">Section {sectionIndex + 1} of 4</p>
            <p className="font-black text-lg leading-tight">{currentSection.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden md:flex items-center gap-2">
             {SECTIONS.map((_s, i) => (
                <div key={i} className={`h-1.5 w-12 rounded-full transition-all ${i < sectionIndex ? 'bg-green-500' : i === sectionIndex ? 'bg-accent' : 'bg-white/10'}`} />
             ))}
           </div>
           <div className={`flex items-center gap-3 font-mono font-black text-2xl py-2 px-6 rounded-2xl bg-white/5 border border-white/10 ${timeColor}`}>
            <Clock className="h-6 w-6" />
            {formatTime(remaining)}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {!test ? (
          <Card className="border-dashed border-4 border-muted py-32 text-center rounded-[40px]">
            <div className="bg-muted w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"><AlertCircle className="h-10 w-10 text-muted-foreground" /></div>
            <h3 className="text-2xl font-black mb-3">No {currentSection.label} Test Available</h3>
            <p className="text-muted-foreground mb-8 font-medium">Please contact admin to add mock test content.</p>
            <Button onClick={() => submitSection()} size="lg" className="rounded-full px-12">SKIP SECTION <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Card>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {phase === 'listening' && (() => {
              const sections = (td?.sections as Array<{ sectionNumber: number; title: string; questions: Question[], transcript?: string }>) ?? [];
              const globalTranscript = typeof td?.transcript === 'string' ? td.transcript : '';
              let qIdx = 0;
              return (
                <div className="space-y-12">
                  {/* Audio availability notice for unsupported browsers */}
                  {!audioSupported && (
                    <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-amber-800">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm font-bold">Text-to-speech is not supported in this browser. Please use Chrome, Safari, or Edge for audio playback.</p>
                    </div>
                  )}
                  {/* Global transcript audio player */}
                   {globalTranscript && (
                    <Card className="border-violet-100 shadow-xl rounded-[30px] overflow-hidden">
                      <div className="bg-violet-600 p-6 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3"><Headphones className="h-6 w-6" /><h3 className="font-black uppercase tracking-wider">Audio Interface</h3></div>
                        <Button 
                          type="button"
                          size="lg" 
                          disabled={!audioSupported || (playedAudios.has('global') && playingAudioId !== 'global')}
                          className={`rounded-full font-black px-8 ${
                            !audioSupported ? 'bg-white/20 text-white/40 cursor-not-allowed' :
                            playedAudios.has('global') && playingAudioId !== 'global' ? 'bg-white/20 text-white/40' :
                            playingAudioId === 'global' ? 'bg-amber-400 text-amber-900 hover:bg-amber-300' :
                            'bg-white text-violet-700 hover:bg-white/90 shadow-xl'
                          }`}
                          onClick={() => toggleAudio('global', globalTranscript)}
                        >
                          {playingAudioId === 'global'
                            ? <><Volume2 className="h-5 w-5 mr-2 animate-pulse" /> PLAYING — CLICK TO STOP</>
                            : playedAudios.has('global')
                            ? <><Volume2 className="h-5 w-5 mr-2 opacity-40" /> PLAYED (EXAM: ONCE ONLY)</>
                            : <><Play className="h-5 w-5 mr-2" /> PLAY AUDIO</>
                          }
                        </Button>
                      </div>
                      <CardContent className="p-8 text-center bg-violet-50/50">
                         <div className="max-w-md mx-auto">
                           <div className={`w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4 ${playingAudioId === 'global' ? 'animate-pulse' : ''}`}><Volume2 className="h-8 w-8 text-violet-600" /></div>
                           <p className="text-sm font-bold text-violet-800">
                             {playingAudioId === 'global'
                               ? 'Audio is playing. Answer questions as you listen.'
                               : 'Recording will play once only. Answer questions as you listen. Text transcript is hidden for exam integrity.'}
                           </p>
                         </div>
                      </CardContent>
                    </Card>
                  )}
                  {sections.map((sec) => {
                    const sectionAudioId = `section_${sec.sectionNumber}`;
                    const sectionTranscript = typeof sec.transcript === 'string' ? sec.transcript : '';
                    return (
                    <div key={sec.sectionNumber} className="space-y-6">
                      <div className="flex items-center justify-between gap-3 px-4">
                        <div className="flex items-center gap-3"><div className="h-1 w-12 bg-violet-500 rounded-full" /><h4 className="font-black text-violet-600 uppercase tracking-widest text-sm">{sec.title || `Part ${sec.sectionNumber}`}</h4></div>
                        {/* Per-section audio button (when no global transcript) */}
                        {sectionTranscript && !globalTranscript && (
                          <Button
                            type="button"
                            size="sm"
                            disabled={!audioSupported || (playedAudios.has(sectionAudioId) && playingAudioId !== sectionAudioId)}
                            className={`rounded-full font-black px-6 ${
                              !audioSupported ? 'bg-violet-200 text-violet-400 cursor-not-allowed' :
                              playedAudios.has(sectionAudioId) && playingAudioId !== sectionAudioId ? 'bg-violet-200 text-violet-400' :
                              playingAudioId === sectionAudioId ? 'bg-amber-500 text-white' :
                              'bg-violet-600 text-white hover:bg-violet-700 shadow-lg'
                            }`}
                            onClick={() => toggleAudio(sectionAudioId, sectionTranscript)}
                          >
                            {playingAudioId === sectionAudioId
                              ? <><Volume2 className="h-4 w-4 mr-1.5 animate-pulse" /> PLAYING</>
                              : <><Play className="h-4 w-4 mr-1.5" /> PLAY SECTION AUDIO</>
                            }
                          </Button>
                        )}
                      </div>
                      <Card className="rounded-[40px] shadow-2xl border-none shadow-black/5 overflow-hidden">
                      <CardContent className="p-10 space-y-10">
                        {Array.isArray(sec.questions) && sec.questions.map((q) => {
                          const key = `l_${qIdx++}`;
                          return (
                            <div key={key} id={key} className="p-6 rounded-3xl bg-muted/30 hover:bg-muted transition-colors border-2 border-transparent hover:border-violet-100">
                              <div className="flex items-start gap-4 mb-6"><span className="bg-foreground text-white rounded-2xl w-10 h-10 flex items-center justify-center flex-shrink-0 font-black text-lg">{qIdx}</span><p className="font-bold text-lg pt-1 leading-relaxed">{q.questionText}</p></div>
                              {q.tableData ? (
                                <div className="overflow-x-auto border-2 border-border/50 rounded-[30px] my-6 bg-white overflow-hidden">
                                  <table className="w-full text-sm text-left">
                                    {q.tableData.headers && <thead className="bg-muted text-foreground font-black uppercase text-[10px] tracking-widest"><tr>{q.tableData.headers.map((h, i) => <th key={i} className="px-6 py-4 border-b">{h}</th>)}</tr></thead>}
                                    <tbody>
                                      {q.tableData.rows.map((row, ri) => (
                                        <tr key={ri} className="border-b last:border-b-0 hover:bg-muted/10 transition-colors">
                                          {row.map((cell, ci) => (
                                            <td key={ci} className="px-6 py-5 align-middle font-bold text-muted-foreground transition-all">
                                              {cell.type === 'text' ? (<span>{cell.value}</span>) : (
                                                <input type="text" placeholder="Answer..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                                  className="w-full bg-muted/50 border-2 border-transparent rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-violet-400/20 focus:border-violet-400 focus:bg-white transition-all outline-none font-black text-foreground" />
                                              )}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : Array.isArray(q.options) && q.options.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-4">
                                  {q.options.map((opt) => (
                                    <label key={opt} className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${answers[key] === opt ? 'border-violet-500 bg-violet-600 text-white shadow-xl translate-y-[-2px]' : 'border-border bg-white hover:border-violet-300'}`}>
                                      <input type="radio" name={key} value={opt} checked={answers[key] === opt} onChange={() => setAnswers(prev => ({ ...prev, [key]: opt }))} className="hidden" />
                                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${answers[key] === opt ? 'bg-white border-white' : 'border-muted-foreground/30'}`}>{answers[key] === opt && <div className="w-2.5 h-2.5 bg-violet-600 rounded-full" />}</div>
                                      <span className="font-bold">{opt}</span>
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <input type="text" placeholder="Type your answer..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                  className="w-full border-2 border-border/50 rounded-2xl px-6 py-4 font-black focus:outline-none focus:ring-8 focus:ring-violet-400/10 focus:border-violet-400 transition-all" />
                              )}
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                    </div>
                    );
                  })}
                </div>
              );
            })()}

            {phase === 'reading' && (() => {
              const passages = Array.isArray(td?.passages) ? td.passages : (td?.passage ? [td.passage] : []);
              let qIdx = 0;
              return (
                <div className="space-y-16">
                  {passages.map((passage: any, pi: number) => (
                    <div key={pi} className="space-y-8">
                       <div className="flex items-center gap-4 px-4"><div className="h-1.5 w-16 bg-blue-500 rounded-full" /><h4 className="font-black text-blue-600 uppercase tracking-[0.2em] text-sm">Passage {pi + 1}</h4></div>
                      <Card className="rounded-[50px] shadow-3xl border-none overflow-hidden bg-white">
                        <div className="bg-slate-50 p-10 border-b border-slate-100">
                           <h2 className="text-3xl font-black mb-6 flex items-center gap-4 text-slate-800"><BookOpen className="h-8 w-8 text-blue-500" /> {passage.title}</h2>
                           <div className="prose prose-lg max-w-none text-slate-600 leading-[1.8] font-medium whitespace-pre-line text-lg" dangerouslySetInnerHTML={{ __html: passage.textContent }} />
                        </div>
                        <CardContent className="p-12 space-y-12">
                           <h3 className="text-2xl font-black uppercase tracking-widest text-slate-400">Questions</h3>
                           {Array.isArray(passage.questions) && passage.questions.map((q: any) => {
                             const key = `r_${qIdx++}`;
                             return (
                               <div key={key} id={key} className="p-8 rounded-[40px] bg-slate-50/50 hover:bg-white transition-all border-2 border-transparent hover:border-blue-100 hover:shadow-2xl">
                                 <div className="flex items-start gap-4 mb-8"><span className="bg-slate-800 text-white rounded-3xl w-12 h-12 flex items-center justify-center flex-shrink-0 font-black text-xl shadow-xl">{qIdx}</span><p className="font-bold text-xl pt-1 leading-relaxed text-slate-800">{q.questionText}</p></div>
                                 {q.tableData ? (
                                   <div className="overflow-x-auto border-4 border-slate-100 rounded-[35px] my-8 bg-white overflow-hidden shadow-inner">
                                     <table className="w-full text-sm text-left">
                                       {q.tableData.headers && <thead className="bg-slate-800 text-white font-black uppercase text-[10px] tracking-widest"><tr>{q.tableData.headers.map((h: any, i: number) => <th key={i} className="px-8 py-6">{h}</th>)}</tr></thead>}
                                       <tbody>
                                         {q.tableData.rows.map((row: any, ri: number) => (
                                           <tr key={ri} className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                                             {row.map((cell: any, ci: number) => (
                                               <td key={ci} className="px-8 py-6 align-middle font-bold text-slate-600">
                                                 {cell.type === 'text' ? (<span>{cell.value}</span>) : (
                                                   <input type="text" placeholder="..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                                     className="w-full bg-slate-100 border-2 border-transparent rounded-2xl px-6 py-4 focus:ring-8 focus:ring-blue-400/20 focus:border-blue-400 focus:bg-white transition-all outline-none font-black text-slate-800" />
                                                 )}
                                               </td>
                                             ))}
                                           </tr>
                                         ))}
                                       </tbody>
                                     </table>
                                   </div>
                                 ) : Array.isArray(q.options) && q.options.length > 0 ? (
                                   <div className="grid md:grid-cols-2 gap-6">
                                     {q.options.map((opt: any) => (
                                       <label key={opt} className={`flex items-center gap-5 p-7 rounded-[30px] border-2 cursor-pointer transition-all ${answers[key] === opt ? 'border-blue-500 bg-blue-600 text-white shadow-2xl scale-[1.02]' : 'border-slate-200 bg-white hover:border-blue-300'}`}>
                                         <input type="radio" name={key} value={opt} checked={answers[key] === opt} onChange={() => setAnswers(prev => ({ ...prev, [key]: opt }))} className="hidden" />
                                         <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${answers[key] === opt ? 'bg-white border-white shadow-inner' : 'border-slate-300'}`}>{answers[key] === opt && <div className="w-3 h-3 bg-blue-600 rounded-full" />}</div>
                                         <span className="font-black text-lg">{opt}</span>
                                       </label>
                                     ))}
                                   </div>
                                 ) : (
                                   <input type="text" placeholder="Type your answer here..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                     className="w-full border-2 border-slate-200 rounded-[30px] px-8 py-6 font-black text-xl focus:outline-none focus:ring-[15px] focus:ring-blue-400/10 focus:border-blue-400 transition-all shadow-sm" />
                                 )}
                               </div>
                             );
                           })}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              );
            })()}

            {phase === 'writing' && (() => {
              // Writing test_data is stored as { tasks: [WritingTask, WritingTask] }
              // Each WritingTask has: { title, prompt, imageUrl, minWords, recommendedTime }
              const tasks = (td?.tasks as Array<{ title: string; prompt: string; imageUrl?: string; minWords?: number; recommendedTime?: number }>) ?? [];
              const task1 = tasks[0];
              const task2 = tasks[1];
              return (
                <div className="space-y-12">
                   <div className="bg-emerald-600 text-white p-10 rounded-[40px] shadow-2xl flex items-center gap-6"><div className="p-4 bg-white/20 rounded-3xl"><PenTool className="h-10 w-10" /></div><div><h2 className="text-3xl font-black mb-1">Writing Assessment</h2><p className="text-emerald-100 font-medium">Complete both tasks. Your word count is tracked automatically.</p></div></div>
                  {/* Task 1 */}
                  <Card className="rounded-[40px] shadow-3xl overflow-hidden border-none">
                    <CardHeader className="bg-emerald-50 p-10 border-b border-emerald-100">
                      <CardTitle className="text-2xl font-black text-emerald-900">Task 1 — {task1?.title ?? 'Report / Letter (min. 150 words)'}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                      {/* Task prompt */}
                      <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-8 text-lg font-medium text-emerald-900/80 leading-relaxed">
                        {task1?.prompt
                          ? <span dangerouslySetInnerHTML={{ __html: task1.prompt }} />
                          : <><p className="font-black mb-2">Describe the visual information below:</p><p>The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p><p className="mt-3 text-sm text-emerald-700 font-bold">Write at least 150 words. Spend about 20 minutes on this task.</p></>
                        }
                      </div>

                      {/* Chart / Graph image — REQUIRED for IELTS Academic Task 1 */}
                      {task1?.imageUrl ? (
                        <div className="rounded-3xl overflow-hidden border-2 border-emerald-200 bg-white shadow-xl">
                          <div className="bg-emerald-700 text-white px-6 py-3 flex items-center gap-2">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            <span className="font-black uppercase tracking-widest text-sm">Chart / Graph</span>
                          </div>
                          <div className="p-4 bg-slate-50">
                            <img
                              src={task1.imageUrl}
                              alt="Writing Task 1 Chart"
                              className="w-full max-h-[500px] object-contain rounded-2xl mx-auto"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div className="hidden flex-col items-center justify-center p-12 text-center gap-3 text-amber-700">
                              <AlertCircle className="h-10 w-10 text-amber-500" />
                              <p className="font-bold">Chart image could not be loaded.</p>
                              <p className="text-sm text-muted-foreground">URL: {task1.imageUrl}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-amber-800">
                          <AlertCircle className="h-6 w-6 flex-shrink-0 text-amber-500" />
                          <div>
                            <p className="font-black text-sm">No chart image provided</p>
                            <p className="text-xs text-amber-700 mt-0.5">An admin needs to add a chart/graph image URL for this Task 1 in the Admin Panel → Mock Test Management.</p>
                          </div>
                        </div>
                      )}

                      <Textarea placeholder="Begin typing your Task 1 response here... (min. 150 words)" className="min-h-[400px] rounded-[30px] border-2 border-emerald-100 p-8 text-lg font-bold focus:ring-[12px] focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        value={answers['w_task1'] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, w_task1: e.target.value }))} />
                      <div className="flex items-center justify-between px-4">
                        <p className="text-sm font-black uppercase tracking-widest text-emerald-400">Word Count</p>
                        <Badge className={`px-6 py-2 rounded-full font-black text-white ${(answers['w_task1'] ?? '').split(/\s+/).filter(Boolean).length >= 150 ? 'bg-emerald-600' : 'bg-amber-500'}`}>{(answers['w_task1'] ?? '').split(/\s+/).filter(Boolean).length} / 150 Words</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Task 2 */}
                  <Card className="rounded-[40px] shadow-3xl overflow-hidden border-none">
                    <CardHeader className="bg-emerald-50 p-10 border-b border-emerald-100">
                      <CardTitle className="text-2xl font-black text-emerald-900">Task 2 — {task2?.title ?? 'Essay (min. 250 words)'}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                      <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-8 text-lg font-medium text-emerald-900/80 leading-relaxed">
                        {task2?.prompt
                          ? <span dangerouslySetInnerHTML={{ __html: task2.prompt }} />
                          : <><p className="font-black mb-2">Write an essay in response to the argument below:</p><p>Some people believe that university education should be free for all students, while others argue that students should pay for their own tuition. Discuss both views and give your own opinion.</p><p className="mt-3 text-sm text-emerald-700 font-bold">Write at least 250 words. Spend about 40 minutes on this task.</p></>
                        }
                      </div>
                      <Textarea placeholder="Begin typing your Task 2 essay here... (min. 250 words)" className="min-h-[600px] rounded-[30px] border-2 border-emerald-100 p-8 text-lg font-bold focus:ring-[12px] focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        value={answers['w_task2'] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, w_task2: e.target.value }))} />
                      <div className="flex items-center justify-between px-4">
                        <p className="text-sm font-black uppercase tracking-widest text-emerald-400">Word Count</p>
                        <Badge className={`px-6 py-2 rounded-full font-black text-white ${(answers['w_task2'] ?? '').split(/\s+/).filter(Boolean).length >= 250 ? 'bg-emerald-600' : 'bg-amber-500'}`}>{(answers['w_task2'] ?? '').split(/\s+/).filter(Boolean).length} / 250 Words</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}


            {phase === 'speaking' && (() => {
              // Speaking data may be stored as parts[] or part1/part2/part3 directly
              const parts = (td?.parts as Array<{ title: string; partType?: string;
                questions?: Array<{ text: string }>;
                cueCard?: { topic: string; bulletPoints: string[] };
              }>) ?? [];

              // Build display parts — handle both formats
              const displayParts: Array<{ label: string; questions: string[] }> = parts.length > 0
                ? parts.map(p => ({
                    label: p.title,
                    questions: p.cueCard
                      ? [`Cue Card: ${p.cueCard.topic}\n\u2022 ${p.cueCard.bulletPoints.join('\n\u2022 ')}`]
                      : (p.questions ?? []).map(q => q.text)
                  }))
                : [
                    { label: 'Part 1 — Introduction & Interview', questions: ['Tell me about yourself.', 'What do you do in your free time?'] },
                    { label: 'Part 2 — Individual Long Turn', questions: ['You will be given a cue card with a topic. Speak for 1–2 minutes.'] },
                    { label: 'Part 3 — Two-way Discussion', questions: ['Follow-up questions related to your Part 2 topic will be asked.'] }
                  ];

              return (
                <div className="space-y-10">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-10 rounded-[40px] shadow-2xl flex items-center gap-6">
                    <div className={`p-4 bg-white/20 rounded-[25px] ${isRecording ? 'animate-pulse' : ''}`}><Mic className="h-10 w-10" /></div>
                    <div>
                      <h2 className="text-3xl font-black mb-1">Speaking Simulation</h2>
                      <p className="text-orange-100 font-medium">Read each question aloud, then record your response. Multiple clips allowed.</p>
                    </div>
                    {recordedClips.length > 0 && (
                      <div className="ml-auto bg-white/20 rounded-2xl px-5 py-3 text-center">
                        <p className="text-2xl font-black">{recordedClips.length}</p>
                        <p className="text-xs text-orange-200 font-bold uppercase tracking-widest">Clips</p>
                      </div>
                    )}
                  </div>

                  {/* Microphone permission error */}
                  {recordingError && (
                    <div className="flex items-start gap-3 bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-red-800">
                      <MicOff className="h-6 w-6 flex-shrink-0 mt-0.5 text-red-500" />
                      <div>
                        <p className="font-black text-sm">Recording Error</p>
                        <p className="text-xs mt-0.5">{recordingError}</p>
                      </div>
                      <button onClick={() => setRecordingError(null)} className="ml-auto text-red-400 hover:text-red-600 font-black text-lg leading-none">×</button>
                    </div>
                  )}

                  {/* Active Recording Banner */}
                  {isRecording && (
                    <div className="bg-red-600 text-white rounded-[30px] p-6 flex items-center justify-between shadow-2xl shadow-red-500/40 animate-in slide-in-from-top-4 duration-300">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                          <div className="absolute inset-0 w-4 h-4 bg-white rounded-full animate-ping opacity-50" />
                        </div>
                        <div>
                          <p className="font-black text-lg">REC — {recordingLabel}</p>
                          <p className="text-red-200 text-sm font-bold">Max 3 minutes per clip</p>
                        </div>
                        {/* Waveform animation */}
                        <div className="hidden sm:flex items-end gap-0.5 h-8">
                          {Array.from({length: 12}).map((_, i) => (
                            <div key={i}
                              className="w-1.5 bg-white/70 rounded-full animate-pulse"
                              style={{ height: `${20 + Math.sin(i * 0.8) * 12}px`, animationDelay: `${i * 80}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-black text-3xl">{formatRecordingTime(recordingSeconds)}</span>
                        <Button
                          type="button"
                          onClick={stopRecording}
                          className="bg-white text-red-600 hover:bg-red-50 font-black rounded-2xl px-6 py-3 gap-2 shadow-xl"
                        >
                          <Square className="h-5 w-5 fill-current" /> STOP
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Part Questions + Record per part */}
                  {displayParts.map((part, pi) => (
                    <Card key={pi} className="rounded-[35px] shadow-xl border-none overflow-hidden">
                      <CardHeader className="bg-orange-50 px-10 py-7 border-b border-orange-100 flex flex-row items-center justify-between gap-4">
                        <CardTitle className="text-xl font-black text-orange-900">{part.label}</CardTitle>
                        <Button
                          type="button"
                          disabled={isRecording}
                          onClick={() => !isRecording && startRecording(part.label)}
                          className={`rounded-2xl font-black px-6 gap-2 flex-shrink-0 ${
                            isRecording
                              ? 'bg-orange-200 text-orange-400 cursor-not-allowed'
                              : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30'
                          }`}
                        >
                          <Mic className="h-4 w-4" />
                          {isRecording ? 'Recording...' : 'Record Response'}
                        </Button>
                      </CardHeader>
                      <CardContent className="p-10 space-y-5">
                        {part.questions.map((q, qi) => (
                          <div key={qi} className="bg-orange-50/50 border-2 border-orange-100 rounded-[25px] p-7 text-lg font-bold text-orange-900 leading-relaxed whitespace-pre-line">
                            {q}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}

                  {/* Recorded Clips Playback */}
                  {recordedClips.length > 0 && (
                    <Card className="rounded-[35px] shadow-xl border-none overflow-hidden">
                      <CardHeader className="bg-slate-800 text-white px-10 py-7">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-black flex items-center gap-3">
                            <Volume2 className="h-6 w-6 text-orange-400" />
                            Your Recordings ({recordedClips.length} clip{recordedClips.length > 1 ? 's' : ''})
                          </CardTitle>
                          <Badge className="bg-green-500 text-white font-black px-4 py-1.5 rounded-full">
                            <CheckCircle className="h-4 w-4 mr-1.5 inline" />{recordedClips.length} Saved
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8 space-y-4">
                        {recordedClips.map((clip, ci) => (
                          <div key={clip.id} className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 hover:border-orange-200 transition-colors">
                            <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <span className="font-black text-orange-600 text-sm">{ci + 1}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-sm text-slate-800 truncate">{clip.label}</p>
                              <p className="text-xs text-slate-400 font-bold">{formatRecordingTime(clip.duration)} &bull; {(clip.size / 1024).toFixed(0)} KB</p>
                              <audio
                                src={clip.url}
                                controls
                                className="w-full h-9 mt-2"
                                style={{ minWidth: '180px' }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => deleteClip(clip.id)}
                              className="p-2.5 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
                              title="Delete clip"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Fallback text area */}
                  <Card className="rounded-[35px] shadow-xl border-none overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-100">
                      <CardTitle className="text-xl font-black text-slate-700">Optional: Type Your Responses</CardTitle>
                      <p className="text-muted-foreground text-sm font-medium mt-1">No mic available? Type your answers here for automated grading instead.</p>
                    </CardHeader>
                    <CardContent className="p-8">
                      <Textarea
                        placeholder="Type all your speaking responses here..."
                        rows={10}
                        className="rounded-[25px] border-2 border-slate-200 p-7 text-lg font-bold focus:ring-[10px] focus:ring-orange-500/10 focus:border-orange-400 transition-all"
                        value={answers['sp_answers'] ?? ''}
                        onChange={e => setAnswers(prev => ({ ...prev, sp_answers: e.target.value }))}
                      />
                      {(answers['sp_answers'] ?? '').length > 0 && (
                        <div className="flex justify-end mt-4">
                          <Badge className="bg-orange-600 text-white px-6 py-2 rounded-full font-black">
                            {(answers['sp_answers'] ?? '').split(/\s+/).filter(Boolean).length} Words
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {navKeys.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-border p-6 shadow-[0_-10px_50px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between">
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 min-w-max px-4">
              {navKeys.map((key, i) => (
                <button key={key} onClick={() => scrollToQuestion(key)}
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black text-lg transition-all active:scale-90 ${answers[key] ? 'bg-slate-800 text-white border-slate-800 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="pl-8 flex-shrink-0 flex items-center gap-8">
             <div className="text-sm font-black uppercase tracking-widest text-slate-400 hidden xl:block">
               <span className="text-slate-800">{navKeys.filter(k => !!answers[k]).length}</span> / {navKeys.length} Completed
             </div>
             <Button size="lg" variant="outline" onClick={() => submitSection()} className="border-4 border-slate-800 text-slate-800 font-black rounded-2xl px-8 hover:bg-slate-800 hover:text-white transition-all shadow-xl">
               SUBMIT SECTION <ChevronRight className="h-6 w-6 ml-2" />
             </Button>
          </div>
        </div>
      )}

      {navKeys.length === 0 && test && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-border p-8 shadow-[0_-10px_50px_rgba(0,0,0,0.1)] z-50 flex justify-center">
          <Button size="lg" onClick={() => submitSection()}
            className={`min-w-[320px] ${currentSection.bg} text-white hover:opacity-90 font-black text-2xl py-10 rounded-[40px] shadow-2xl shadow-indigo-500/30 scale-110 active:scale-100 transition-all`}>
            {sectionIndex < SECTIONS.length - 1 ? (
              <><CheckCircle className="h-8 w-8 mr-4" /> CONTINUE TO NEXT SECTION</>
            ) : (
              <><Award className="h-8 w-8 mr-4" /> FINISH & SEE RESULTS</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
