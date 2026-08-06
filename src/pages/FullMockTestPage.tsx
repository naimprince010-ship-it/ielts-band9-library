import { useState, useEffect, useCallback, useRef } from 'react';
import { unlockIOSAudio, toBlobUrl, createNativeAudioElement, getAudioContext } from '@/lib/iosAudio';
import { sanitizeHtml } from '@/lib/sanitize';
import { calculateBandScore } from '@/utils/scoring';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Headphones, BookOpen, PenTool, Mic, ChevronRight,
  CheckCircle, AlertCircle, Award, Play, RotateCcw,
  Loader2, Target, Crown, Timer, Check, Volume2,
  Shield, Zap, Wifi, Lock, ArrowRight, Square, MicOff, Trash2,
  Sparkles, Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { normalizeMockTestRow, normalizeWritingTestFromDb, findWritingTask1 } from '@/lib/writingVisualNormalize';
import { isUsableFullMockTest } from '@/lib/fullMockReadiness';
import { buildObjectiveReview } from '@/lib/fullMockScoring';
import { WritingTask1Renderer } from '@/components/test/WritingTask1Renderer';
import { FullMockListeningPaper, type ListeningPaperSection } from '@/components/test/FullMockListeningPaper';
import { FullMockReadingPaper, type ReadingPaperPassage } from '@/components/test/FullMockReadingPaper';
import { FullMockWritingPaper } from '@/components/test/FullMockWritingPaper';
import { FullMockSpeakingPaper, type SpeakingPaperPart } from '@/components/test/FullMockSpeakingPaper';
import { FULL_MOCK_FALLBACK_TESTS } from '@/data/fullMockFallback';
import type { WritingTask } from '@/types';

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
  acceptedAnswers?: string[];
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

interface FullMockBundleRow {
  id: string;
  listening_test_id: string;
  reading_test_id: string;
  writing_test_id: string;
  speaking_test_id: string;
  created_at: string;
}

interface SectionScores {
  listening: number | null;
  reading: number | null;
  writing: number | null;
  speaking: number | null;
}

interface ReviewItem {
  questionNumber: number;
  questionText: string;
  userAnswer: string;
  acceptedAnswers: string[];
  correct: boolean;
  explanation?: string;
}

interface SectionReview {
  correct: number;
  total: number;
  items: ReviewItem[];
}

type ReviewData = Partial<Record<ModuleType, SectionReview>>;

interface WritingSubmission {
  task1Prompt: string;
  task2Prompt: string;
  task1Response: string;
  task2Response: string;
}

interface WritingFeedbackCriterion {
  name: string;
  band: number;
  feedback: string;
}

interface WritingFeedback {
  estimatedBand: number;
  summary: string;
  criteria: WritingFeedbackCriterion[];
  strengths: string[];
  improvements: string[];
  task1Notes: string;
  task2Notes: string;
  actionPlan: string[];
}

interface SpeakingSubmission {
  questions: string[];
  typedResponse: string;
  clipCount: number;
  totalRecordedSeconds: number;
}

interface SpeakingFeedbackCriterion {
  name: string;
  band: number;
  feedback: string;
}

interface SpeakingFeedback {
  estimatedBand: number;
  summary: string;
  criteria: SpeakingFeedbackCriterion[];
  strengths: string[];
  improvements: string[];
  partNotes: string[];
  actionPlan: string[];
}

interface RecordedClip {
  id: string;
  url: string;
  duration: number;
  label: string;
  size: number;
  mimeType: string;
  blob?: Blob;
  uploadStatus: 'local' | 'uploading' | 'uploaded' | 'error';
  uploadedUrl?: string;
  transcript?: string;
  transcriptStatus: 'idle' | 'transcribing' | 'ready' | 'error';
  transcriptError?: string;
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

/**
 * Convert raw correct count to IELTS band using official lookup tables.
 * Falls back to a percentage approximation for non-standard question counts.
 */
function bandFromScore(
  correct: number,
  total: number,
  moduleType?: 'reading' | 'listening',
): number {
  if (total === 0) return 4.0;
  // Use official IELTS raw-score tables when the module type is known
  if (moduleType === 'reading' || moduleType === 'listening') {
    // Normalise to 40-question equivalent for non-standard test lengths
    const raw40 = total === 40 ? correct : Math.round((correct / total) * 40);
    return calculateBandScore(raw40, moduleType);
  }
  // Generic percentage fallback (writing/speaking rough estimate path)
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

function sectionAudioKey(sectionNumber?: number): string {
  return `section-${sectionNumber ?? 'unknown'}`;
}

type ListeningSectionView = {
  sectionNumber?: number;
  title?: string;
  questions?: Question[];
  transcript?: string;
  sectionAudioUrl?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function normalizeListeningSections(testData: Record<string, unknown> | undefined): ListeningSectionView[] {
  if (!testData) return [];

  const rawSections = testData.sections;
  const candidates = Array.isArray(rawSections)
    ? rawSections
    : isRecord(rawSections)
      ? Object.values(rawSections)
      : [];

  const sections = candidates
    .filter(isRecord)
    .map((section, index) => {
      const questions = Array.isArray(section.questions) ? (section.questions as Question[]) : [];
      return {
        sectionNumber: typeof section.sectionNumber === 'number' ? section.sectionNumber : index + 1,
        title: typeof section.title === 'string' ? section.title : `Section ${index + 1}`,
        questions,
        transcript: typeof section.transcript === 'string' ? section.transcript : '',
        sectionAudioUrl: typeof section.sectionAudioUrl === 'string' ? section.sectionAudioUrl : '',
      };
    });

  if (sections.length > 0) return sections;

  if (Array.isArray(testData.questions)) {
    return [{
      sectionNumber: 1,
      title: typeof testData.title === 'string' ? testData.title : 'Section 1',
      questions: testData.questions as Question[],
      transcript: typeof testData.transcript === 'string' ? testData.transcript : '',
      sectionAudioUrl: typeof testData.sectionAudioUrl === 'string' ? testData.sectionAudioUrl : '',
    }];
  }

  return [];
}

function getFallbackMockTest(module: ModuleType): MockTest {
  return FULL_MOCK_FALLBACK_TESTS[module] as MockTest;
}

function displayText(value: unknown, fallback = ''): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(item => displayText(item)).filter(Boolean).join(', ') || fallback;
  if (isRecord(value)) {
    for (const key of ['text', 'questionText', 'value', 'label', 'title', 'answer', 'content', 'prompt']) {
      const text = displayText(value[key]);
      if (text) return text;
    }
  }
  return fallback;
}

function bandFromWritingWordCounts(task1: number, task2: number): number {
  if (task1 === 0 && task2 === 0) return 0;
  if (task1 < 120 || task2 < 200) return 4.5;
  const total = task1 + task2;
  return total >= 600 ? 7.5 : total >= 450 ? 7.0 : total >= 350 ? 6.5 : total >= 250 ? 6.0 : 5.0;
}

function bandFromSpeakingResponse(words: number, clips: number): number {
  if (words === 0 && clips === 0) return 0;
  const recordingCredit = Math.min(clips, 3) * 45;
  const responseSize = words + recordingCredit;
  return responseSize >= 300 ? 7.0 : responseSize >= 200 ? 6.5 : responseSize >= 100 ? 6.0 : 5.0;
}

function extractWritingTasks(testData: Record<string, unknown> | undefined) {
  const wData = normalizeWritingTestFromDb(testData);
  const task1 = findWritingTask1(wData);
  const task2 =
    wData.tasks?.find(
      (t) =>
        t.taskType === 'task2' ||
        (t as Record<string, unknown>).task_type === 'task2' ||
        t.taskNumber === 2
    ) ?? wData.tasks?.[1];

  return { task1, task2, wData };
}

function extractSpeakingQuestions(testData: Record<string, unknown> | undefined): string[] {
  const parts = Array.isArray(testData?.parts) ? testData.parts as Array<{
    title?: string;
    questions?: Array<{ text?: string }>;
    cueCard?: { topic?: string; bulletPoints?: string[] };
  }> : [];

  return parts.flatMap((part) => {
    const prefix = part.title ? `${part.title}: ` : '';
    if (part.cueCard) {
      const bullets = Array.isArray(part.cueCard.bulletPoints) ? part.cueCard.bulletPoints.join('; ') : '';
      return [`${prefix}${part.cueCard.topic || 'Cue card'}${bullets ? ` (${bullets})` : ''}`];
    }
    return (part.questions || []).map(question => `${prefix}${question.text || ''}`.trim()).filter(Boolean);
  });
}

function useTimer(initial: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(initial);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);

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

  return { remaining, running, start, pause, reset };
}

// ─── Session persistence helpers ──────────────────────────────────────────
const SESSION_KEY = 'mockTestSession_v1';

interface TestSession {
  phase: Phase;
  sectionIndex: number;
  scores: SectionScores;
  reviewData: ReviewData;
  writingSubmission: WritingSubmission | null;
  writingFeedback: WritingFeedback | null;
  speakingSubmission: SpeakingSubmission | null;
  speakingFeedback: SpeakingFeedback | null;
  selectedMode: 'practice' | 'exam';
  bundleId?: string | null;
  tests?: Partial<Record<ModuleType, MockTest>>;
  playedAudios: string[];
  timerRemaining: number;
  activeReadingPassage?: number;
  activeListeningSection?: number;
  flaggedQuestions?: Record<string, boolean>;
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
    // Full mock payloads can exceed the browser's sessionStorage quota. Keep
    // only lightweight progress and reload module data by bundleId on resume.
    const { tests: _existingTests, ...existingProgress } = existing;
    const { tests: _nextTests, ...nextProgress } = session;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...existingProgress, ...nextProgress, savedAt: Date.now() }));
  } catch { /* sessionStorage might be blocked in private mode */ }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  Object.keys(sessionStorage).filter(key => key.startsWith('readingPaperHighlights:')).forEach(key => sessionStorage.removeItem(key));
  sessionStorage.removeItem('fullMockWritingActiveTask');
  sessionStorage.removeItem('fullMockWritingStarted');
  sessionStorage.removeItem('fullMockSpeakingPart');
  localStorage.removeItem('mockTestAnswers_v1');
}

export default function FullMockTestPage() {
  const legacyListeningEnabled = false;
  const legacyReadingEnabled = false;
  const legacyWritingEnabled = false;
  const legacySpeakingEnabled = false;
  const navigate = useNavigate();
  const { user, isPremium, isAdmin } = useAuth();

  const [resultSaved, setResultSaved] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const savedResultIdRef = useRef<string | null>(null);

  const saveResultToDb = useCallback(async (
    finalScores: SectionScores,
    usedTests: Partial<Record<ModuleType, MockTest>>,
    finalReviewData: ReviewData,
    finalWritingFeedback: WritingFeedback | null,
    finalSpeakingFeedback: SpeakingFeedback | null
  ) => {
    if (!user || !supabase || !isSupabaseConfigured()) {
      setResultSaved('idle');
      return;
    }
    setResultSaved('saving');
    try {
      const overall = overallBand(finalScores);
      const insertData = {
        user_id: user.id,
        overall_band: overall,
        listening_band: finalScores.listening,
        reading_band: finalScores.reading,
        writing_band: finalScores.writing,
        speaking_band: finalScores.speaking,
        completed_at: new Date().toISOString(),
        // Track which specific tests were used so we can avoid repeats next time
        listening_test_id: usedTests.listening?.id ?? null,
        reading_test_id:   usedTests.reading?.id   ?? null,
        writing_test_id:   usedTests.writing?.id   ?? null,
        speaking_test_id:  usedTests.speaking?.id  ?? null,
        full_mock_bundle_id: selectedBundleId,
        review_data: finalReviewData,
        writing_feedback: finalWritingFeedback,
        speaking_feedback: finalSpeakingFeedback,
        // Legacy production schemas require a non-null section summary. Keep
        // this alongside the dedicated band columns for backward compatibility.
        sections: SECTIONS.map(section => ({
          module: section.module,
          label: section.label,
          band: finalScores[section.module],
        })),
      };
      // Helper: only retry when PostgREST/Postgres reports an *unknown* column.
      // Deliberately narrow so NOT NULL violations like
      // "null value in column "sections" violates not-null constraint"
      // do NOT trigger a retry (they would fail on every attempt anyway).
      const isMissingColumnError = (e: { code?: string; message?: string } | null): boolean => {
        if (!e) return false;
        // PostgREST "relationship/column not found" codes
        if (e.code === 'PGRST204' || e.code === 'PGRST200') return true;
        const msg = e.message || '';
        return (
          /column .+ does not exist/i.test(msg) ||
          /could not find .+ column/i.test(msg)
        );
      };

      // Attempt 1 — canonical schema: all fields including review_data, writing_feedback,
      // speaking_feedback; legacy schemas keep sections for the NOT NULL constraint.
      let { data: savedResult, error } = await supabase
        .from('mock_test_results')
        .insert(insertData)
        .select('id')
        .single();

      // Attempt 2 — old schema without review_data / writing_feedback / speaking_feedback
      // but with sections (sections may be NOT NULL on legacy production tables).
      if (isMissingColumnError(error)) {
        const legacyInsertData: Record<string, unknown> = { ...insertData };
        delete legacyInsertData.review_data;
        delete legacyInsertData.writing_feedback;
        delete legacyInsertData.speaking_feedback;
        const r2 = await supabase
          .from('mock_test_results')
          .insert(legacyInsertData)
          .select('id')
          .single();
        savedResult = r2.data;
        error = r2.error;

        // Attempt 3 — canonical migration schema (no sections column):
        // preserve review_data / writing_feedback / speaking_feedback, drop sections only.
        if (isMissingColumnError(r2.error)) {
          const withoutSectionsData: Record<string, unknown> = { ...insertData };
          delete withoutSectionsData.sections;
          const r3 = await supabase
            .from('mock_test_results')
            .insert(withoutSectionsData)
            .select('id')
            .single();
          savedResult = r3.data;
          error = r3.error;

          // Attempt 4 — partial/old schema: neither sections nor JSON feedback columns.
          if (isMissingColumnError(r3.error)) {
            const minimalData: Record<string, unknown> = { ...legacyInsertData };
            delete minimalData.sections;
            const r4 = await supabase
              .from('mock_test_results')
              .insert(minimalData)
              .select('id')
              .single();
            savedResult = r4.data;
            error = r4.error;
          }
        }
      }

      if (error) {
        console.error('Failed to save result:', error);
        setResultSaved('error');
      } else {
        savedResultIdRef.current = savedResult?.id ?? null;
        setResultSaved('saved');
      }
    } catch (err) {
      console.error('Error saving result:', err);
      setResultSaved('error');
    }
  }, [selectedBundleId, user]);

  // Restore from session on first render
  const savedSession = loadSession();
  const savedSessionRef = useRef(savedSession);

  const [phase, setPhaseRaw] = useState<Phase>(savedSession?.phase ?? 'intro');
  const [tests, setTestsRaw] = useState<Partial<Record<ModuleType, MockTest>>>(savedSession?.tests ?? {});
  const [reviewData, setReviewDataRaw] = useState<ReviewData>(savedSession?.reviewData ?? {});
  const [writingSubmission, setWritingSubmissionRaw] = useState<WritingSubmission | null>(savedSession?.writingSubmission ?? null);
  const [writingFeedback, setWritingFeedbackRaw] = useState<WritingFeedback | null>(savedSession?.writingFeedback ?? null);
  const [speakingSubmission, setSpeakingSubmissionRaw] = useState<SpeakingSubmission | null>(savedSession?.speakingSubmission ?? null);
  const [speakingFeedback, setSpeakingFeedbackRaw] = useState<SpeakingFeedback | null>(savedSession?.speakingFeedback ?? null);
  const [writingFeedbackStatus, setWritingFeedbackStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    savedSession?.writingFeedback ? 'ready' : 'idle'
  );
  const [writingFeedbackError, setWritingFeedbackError] = useState('');
  const [speakingFeedbackStatus, setSpeakingFeedbackStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    savedSession?.speakingFeedback ? 'ready' : 'idle'
  );
  const [speakingFeedbackError, setSpeakingFeedbackError] = useState('');
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeReadingPassage, setActiveReadingPassage] = useState(savedSession?.activeReadingPassage ?? 0);
  const [activeListeningSection, setActiveListeningSection] = useState(savedSession?.activeListeningSection ?? 0);
  const [readingMobileView, setReadingMobileView] = useState<'passage' | 'questions'>('passage');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [playedAudios, setPlayedAudios] = useState<Set<string>>(
    new Set(savedSession?.playedAudios ?? [])
  );
  const [audioSupported, setAudioSupported] = useState(true);
  const cachedVoicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // ── Audio pre-download state (iOS: download before starting listening) ────
  const [audioPreloading, setAudioPreloading] = useState(false);
  const [audioPreloadProgress, setAudioPreloadProgress] = useState({ done: 0, total: 0 });
  const [audioPreloadStatus, setAudioPreloadStatus] = useState<'idle' | 'loading' | 'ready' | 'partial' | 'failed'>('idle');
  const [audioPreloadMessage, setAudioPreloadMessage] = useState('');
  const [audioPlaybackStatus, setAudioPlaybackStatus] = useState<Record<string, {
    source: 'blob' | 'direct' | 'tts';
    status: 'ready' | 'playing' | 'ended' | 'fallback' | 'error';
    message: string;
    controlsUrl?: string;
  }>>({});
  const iosResumeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── WakeLock: keep screen on during listening phase ───────────────────────
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (phase !== 'listening') {
      wakeLockRef.current?.release().catch(() => {});
      wakeLockRef.current = null;
      return;
    }
    const acquire = () => {
      if ('wakeLock' in navigator && !wakeLockRef.current) {
        (navigator.wakeLock as WakeLock).request('screen')
          .then(lock => {
            wakeLockRef.current = lock;
            lock.addEventListener('release', () => { wakeLockRef.current = null; });
          })
          .catch(() => {});
      }
    };
    acquire();

    // Re-acquire + resume AudioContext when user returns from lock-screen
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      acquire();
      // Resume AudioContext so audio continues after screen unlock
      getAudioContext()?.resume().catch(() => {});
      // If real audio was playing and got paused, restart it
      const audio = realAudioRef.current;
      if (audio && audio.paused && !audio.ended) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      wakeLockRef.current?.release().catch(() => {});
      wakeLockRef.current = null;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'reading') return;
    const passages = Array.from(document.querySelectorAll<HTMLElement>('[data-reading-passage-index]'));
    if (passages.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const index = Number(visible?.target.getAttribute('data-reading-passage-index'));
        if (Number.isFinite(index)) setActiveReadingPassage(index);
      },
      { rootMargin: '-120px 0px -45% 0px', threshold: [0.15, 0.35, 0.6] },
    );

    passages.forEach(passage => observer.observe(passage));
    return () => observer.disconnect();
  }, [phase, tests.reading]);

  // ─── Real audio player (for pre-generated MP3 sectionAudioUrl) ──────────
  const [realAudioPlaying, setRealAudioPlaying] = useState<string | null>(null);
  const realAudioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * Pre-fetched blob URL cache: sectionAudioId → blob URL
   * Populated when the listening phase starts so play() can be called
   * synchronously (iOS requires play() in the same call-stack as the tap).
   */
  const prefetchedBlobs = useRef<Map<string, string>>(new Map());

  // Pre-fetch all section audio as blob URLs when the listening phase begins
  useEffect(() => {
    if (phase !== 'listening') return;
    const td = tests.listening?.test_data as Record<string, unknown> | undefined;
    if (!td) return;
    const sections = normalizeListeningSections(td);
    sections.forEach((section) => {
      if (!section.sectionAudioUrl) return;
      const id = sectionAudioKey(section.sectionNumber);
      if (prefetchedBlobs.current.has(id)) return;
      toBlobUrl(section.sectionAudioUrl).then(blobUrl => {
        prefetchedBlobs.current.set(id, blobUrl);
      }).catch(() => { /* will fall back to direct URL */ });
    });
    // Also handle global audio URL
    const globalUrl = td.audioUrl as string | undefined;
    if (globalUrl && !prefetchedBlobs.current.has('global')) {
      toBlobUrl(globalUrl).then(blobUrl => {
        prefetchedBlobs.current.set('global', blobUrl);
      }).catch(() => {});
    }
  }, [phase, tests.listening]);

  const playRealAudio = (id: string, url: string, fallbackTranscript?: string) => {
    // ① Unlock iOS audio session synchronously inside click handler
    unlockIOSAudio();

    // Second tap on same button → stop
    if (realAudioPlaying === id) {
      realAudioRef.current?.pause();
      realAudioRef.current = null;
      setRealAudioPlaying(null);
      return;
    }

    // Stop any currently playing real audio
    if (realAudioRef.current) {
      realAudioRef.current.pause();
      realAudioRef.current = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    stopIosResumePing();
    setPlayingAudioId(null);

    // Already played check (exam integrity — only once)
    if (playedAudios.has(id)) {
      alert('In the real IELTS exam, audio plays only once. This section has already been played.');
      return;
    }

    const playUrl = prefetchedBlobs.current.get(id) ?? url;
    const source = prefetchedBlobs.current.has(id) ? 'blob' : 'direct';

    const handleFail = () => {
      realAudioRef.current = null;
      setRealAudioPlaying(null);
      setPlayedAudios(prev => { const s = new Set(prev); s.delete(id); return s; });
      setAudioPlaybackStatus(prev => ({
        ...prev,
        [id]: {
          source: fallbackTranscript ? 'tts' : 'direct',
          status: fallbackTranscript ? 'fallback' : 'error',
          message: fallbackTranscript
            ? 'Real audio failed. Use the native audio controls below, or transcript audio fallback will start.'
            : 'Audio failed to play automatically. Try the native audio controls below.',
          controlsUrl: playUrl,
        },
      }));
      if (fallbackTranscript) toggleAudio(id, fallbackTranscript, true);
    };

    // ② Use pre-fetched blob URL if ready — otherwise direct URL.
    //    Either way, play() is called synchronously here.
    const audio = createNativeAudioElement(playUrl, source === 'blob' ? 'auto' : 'metadata');

    audio.onplaying = () => {
      setPlayedAudios(prev => new Set(prev).add(id));
      setAudioPlaybackStatus(prev => ({
        ...prev,
        [id]: {
          source,
          status: 'playing',
          message: source === 'blob' ? 'Playing downloaded audio with native iPhone-safe playback.' : 'Playing direct native audio stream.',
          controlsUrl: playUrl,
        },
      }));
    };

    audio.onended = () => {
      realAudioRef.current = null;
      setRealAudioPlaying(null);
      setAudioPlaybackStatus(prev => ({
        ...prev,
        [id]: {
          source,
          status: 'ended',
          message: 'Audio completed.',
          controlsUrl: playUrl,
        },
      }));
    };
    audio.onerror = () => {
      console.error('Real audio error, falling back to TTS');
      handleFail();
    };

    realAudioRef.current = audio;
    setRealAudioPlaying(id);
    setAudioPlaybackStatus(prev => ({
      ...prev,
      [id]: {
        source,
        status: 'ready',
        message: source === 'blob' ? 'Downloaded audio is ready for native playback.' : 'Using native direct audio stream.',
        controlsUrl: playUrl,
      },
    }));

    // ③ Synchronous play() — iOS allows this because unlockIOSAudio()
    //    already ran in this same click handler call-stack.
    audio.play().catch(err => {
      console.error('audio.play() failed:', err);
      handleFail();
    });
  };

  // Stop real audio when navigating away from listening phase
  useEffect(() => {
    if (realAudioRef.current) {
      realAudioRef.current.pause();
      realAudioRef.current = null;
    }
    setRealAudioPlaying(null);
  }, [phase]);

  // ─── Voice Recording state (Speaking section) ───────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingLabel, setRecordingLabel] = useState('');
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordedClips, setRecordedClips] = useState<RecordedClip[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingStartedAtRef = useRef<number>(0);

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

  const blobToBase64 = (blob: Blob): Promise<string> => (
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || '');
        resolve(result.includes(',') ? result.split(',')[1] : result);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    })
  );

  const uploadSpeakingClip = async (clipId: string, blob: Blob, mimeType: string) => {
    if (!user || !supabase || !isSupabaseConfigured()) return;
    setRecordedClips(prev => prev.map(clip => (
      clip.id === clipId ? { ...clip, uploadStatus: 'uploading' } : clip
    )));

    try {
      const extension = mimeType.includes('mp4') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm';
      const path = `${user.id}/full-mock/${Date.now()}-${clipId}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from('speaking-recordings')
        .upload(path, blob, { contentType: mimeType, upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('speaking-recordings')
        .getPublicUrl(path);

      setRecordedClips(prev => prev.map(clip => (
        clip.id === clipId
          ? { ...clip, uploadStatus: 'uploaded', uploadedUrl: data.publicUrl }
          : clip
      )));
    } catch (err) {
      console.error('Speaking clip upload failed:', err);
      setRecordedClips(prev => prev.map(clip => (
        clip.id === clipId ? { ...clip, uploadStatus: 'error' } : clip
      )));
    }
  };

  const transcribeSpeakingClip = async (clip: RecordedClip): Promise<string> => {
    if (clip.transcript) return clip.transcript;
    if (!clip.blob && !clip.uploadedUrl) {
      throw new Error('Recording is only available in this browser session. Please record again to transcribe.');
    }

    setRecordedClips(prev => prev.map(item => (
      item.id === clip.id ? { ...item, transcriptStatus: 'transcribing', transcriptError: undefined } : item
    )));

    try {
      const payload = clip.blob
        ? {
            audioBase64: await blobToBase64(clip.blob),
            mimeType: clip.mimeType,
            fileName: `${clip.id}.${clip.mimeType.includes('mp4') ? 'm4a' : clip.mimeType.includes('ogg') ? 'ogg' : 'webm'}`,
          }
        : {
            audioUrl: clip.uploadedUrl,
            mimeType: clip.mimeType,
          };

      const response = await fetch('/api/transcribe-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to transcribe recording.');
      }

      const transcript = String(data.transcript || '').trim();
      setRecordedClips(prev => prev.map(item => (
        item.id === clip.id ? { ...item, transcript, transcriptStatus: 'ready' } : item
      )));
      return transcript;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to transcribe recording.';
      setRecordedClips(prev => prev.map(item => (
        item.id === clip.id ? { ...item, transcriptStatus: 'error', transcriptError: message } : item
      )));
      throw err;
    }
  };

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
        const duration = Math.max(recordingSeconds, Math.round((Date.now() - recordingStartedAtRef.current) / 1000));
        const clipId = `clip-${Date.now()}`;
        const clip: RecordedClip = {
          id: clipId,
          url,
          duration,
          label,
          size: blob.size,
          mimeType: mimeType || 'audio/webm',
          blob,
          uploadStatus: 'local',
          transcriptStatus: 'idle',
        };
        setRecordedClips(prev => [...prev, clip]);
        uploadSpeakingClip(clipId, blob, mimeType || 'audio/webm');
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
      recordingStartedAtRef.current = Date.now();
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

  const [isSavedIndicator, setIsSavedIndicator] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>(savedSession?.flaggedQuestions ?? {});
  const toggleFlag = (key: string) => setFlaggedQuestions(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    saveSession({ activeReadingPassage, activeListeningSection, flaggedQuestions });
  }, [activeReadingPassage, activeListeningSection, flaggedQuestions]);

  // Persist answers whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('mockTestAnswers_v1', JSON.stringify(answers));
      setIsSavedIndicator(true);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => setIsSavedIndicator(false), 2000);
    }
  }, [answers]);

  // Prevent accidental reload/close during active test
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (phase !== 'intro' && phase !== 'results') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [phase]);

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
        const completedId = activeAudioIdRef.current;
        activeAudioIdRef.current = null;
        setPlayingAudioId(null);
        if (completedId) {
          setAudioPlaybackStatus(prev => ({
            ...prev,
            [completedId]: {
              source: 'tts',
              status: 'ended',
              message: 'Transcript audio completed.',
            },
          }));
        }
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
  }, [phase]);  

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
  const toggleAudio = (id: string, text: string, fromFallback = false) => {
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
    setAudioPlaybackStatus(prev => ({
      ...prev,
      [id]: {
        source: 'tts',
        status: fromFallback ? 'fallback' : 'playing',
        message: fromFallback ? 'Playing transcript audio fallback.' : 'Playing generated transcript audio.',
      },
    }));
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
  const [selectedMode, setSelectedModeRaw] = useState<'practice' | 'exam'>(savedSession?.selectedMode ?? 'exam');

  // Wrap setters to auto-persist session
  const setTests = (next: Partial<Record<ModuleType, MockTest>>) => {
    setTestsRaw(next);
  };

  const setScores = (updater: SectionScores | ((prev: SectionScores) => SectionScores)) => {
    setScoresRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveSession({ scores: next });
      return next;
    });
  };

  const setReviewData = (updater: ReviewData | ((prev: ReviewData) => ReviewData)) => {
    setReviewDataRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveSession({ reviewData: next });
      return next;
    });
  };

  const setWritingSubmission = (submission: WritingSubmission | null) => {
    setWritingSubmissionRaw(submission);
    saveSession({ writingSubmission: submission });
  };

  const setWritingFeedback = (feedback: WritingFeedback | null) => {
    setWritingFeedbackRaw(feedback);
    saveSession({ writingFeedback: feedback });
  };

  const setSpeakingSubmission = (submission: SpeakingSubmission | null) => {
    setSpeakingSubmissionRaw(submission);
    saveSession({ speakingSubmission: submission });
  };

  const setSpeakingFeedback = (feedback: SpeakingFeedback | null) => {
    setSpeakingFeedbackRaw(feedback);
    saveSession({ speakingFeedback: feedback });
  };

  const setSectionIndex = (idx: number) => {
    setSectionIndexRaw(idx);
    saveSession({ sectionIndex: idx });
  };

  const setSelectedMode = (mode: 'practice' | 'exam') => {
    setSelectedModeRaw(mode);
    saveSession({ selectedMode: mode });
  };

  // Persist playedAudios whenever it changes
  useEffect(() => {
    saveSession({ playedAudios: Array.from(playedAudios) });
  }, [playedAudios]);

  const currentSection = SECTIONS[sectionIndex];
  const submitSectionRef = useRef<() => void>(() => {});
  const startTimerRef = useRef<(() => void) | null>(null);
  const resetTimerRef = useRef<((val: number) => void) | null>(null);

  useEffect(() => {
    if (loading || phase === 'intro' || phase === 'results' || !currentSection) return;
    const currentTest = tests[currentSection.module];
    if (!currentTest || isUsableFullMockTest(currentTest, currentSection.module)) return;

    const nextTests = {
      ...tests,
      [currentSection.module]: getFallbackMockTest(currentSection.module),
    };
    setTests(nextTests);
    setAnswers({});
    if (currentSection.module === 'listening') {
      setPlayedAudios(new Set());
      setAudioPlaybackStatus({});
    }
  }, [currentSection, loading, phase, tests]);

  const handleTimeUp = useCallback(() => submitSectionRef.current(), []);

  // Restore timer from session if available, otherwise use section default
  const initialTimerValue = restoredTimerRef.current ?? (currentSection?.duration ?? 1800);
  const { remaining, running: timerRunning, start: startTimer, pause: pauseTimer, reset: resetTimer } = useTimer(initialTimerValue, handleTimeUp);

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
    const initialSession = savedSessionRef.current;
    if (!sessionRestoredRef.current && initialSession && initialSession.phase !== 'intro' && initialSession.phase !== 'results') {
      sessionRestoredRef.current = true;
      // Small delay to let useTimer initialize
      setTimeout(() => startTimerRef.current?.(), 200);
    }
  }, []);

  useEffect(() => { startTimerRef.current = startTimer; }, [startTimer]);
  useEffect(() => { resetTimerRef.current = resetTimer; }, [resetTimer]);

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('[FullMockTest] Supabase not configured — using fallback sample data');
      setUsingFallback(true);
      setTests({
        listening: getFallbackMockTest('listening'),
        reading: getFallbackMockTest('reading'),
        writing: getFallbackMockTest('writing'),
        speaking: getFallbackMockTest('speaking'),
      });
      setLoading(false);
      return;
    }

    const fetchTests = async () => {
      try {
        const initialSession = savedSessionRef.current;
        if (initialSession?.tests && initialSession.phase !== 'intro' && initialSession.phase !== 'results') {
          const restoredModule = SECTIONS[initialSession.sectionIndex]?.module;
          const restoredTest = restoredModule ? initialSession.tests[restoredModule] : undefined;
          if (restoredModule && isUsableFullMockTest(restoredTest, restoredModule)) {
            setSelectedBundleId(initialSession.bundleId ?? null);
            setTestsRaw(initialSession.tests);
            return;
          }

          // Older sessions may contain incomplete/oversized test payloads.
          // Keep their lightweight progress and reload the same bundle below.
        }

        // ── 1. Fetch user's already-attempted test IDs per module ────────────
        // Prefer one reviewed/published bundle so all four modules belong together.
        const { data: publishedBundles, error: bundleError } = await supabase!
          .from('full_mock_bundles')
          .select('id, listening_test_id, reading_test_id, writing_test_id, speaking_test_id, created_at')
          .eq('is_published', true)
          .eq('review_status', 'approved')
          .order('created_at', { ascending: false });

        if (bundleError && !/full_mock_bundles|does not exist/i.test(bundleError.message || '')) {
          throw bundleError;
        }

        if (publishedBundles?.length) {
          let attemptedBundleIds = new Set<string>();
          if (user) {
            const { data: bundleHistory } = await supabase!
              .from('mock_test_results')
              .select('full_mock_bundle_id')
              .eq('user_id', user.id)
              .not('full_mock_bundle_id', 'is', null)
              .order('completed_at', { ascending: false })
              .limit(20);
            attemptedBundleIds = new Set(
              (bundleHistory || []).map(row => row.full_mock_bundle_id).filter(Boolean) as string[],
            );
          }

          const resumeBundleId = initialSession?.phase !== 'intro' && initialSession?.phase !== 'results'
            ? initialSession.bundleId
            : null;
          const orderedBundles = [
            ...publishedBundles.filter(bundle => bundle.id === resumeBundleId),
            ...publishedBundles.filter(bundle => bundle.id !== resumeBundleId && !attemptedBundleIds.has(bundle.id)),
            ...publishedBundles.filter(bundle => bundle.id !== resumeBundleId && attemptedBundleIds.has(bundle.id)).reverse(),
          ] as FullMockBundleRow[];

          for (const bundle of orderedBundles) {
            const expectedIds: Record<ModuleType, string> = {
              listening: bundle.listening_test_id,
              reading: bundle.reading_test_id,
              writing: bundle.writing_test_id,
              speaking: bundle.speaking_test_id,
            };
            const { data: bundleTests, error: bundleTestsError } = await supabase!
              .from('mock_tests')
              .select('*')
              .in('id', Object.values(expectedIds))
              .eq('is_published', true);
            if (bundleTestsError) throw bundleTestsError;

            const bundledResult: Partial<Record<ModuleType, MockTest>> = {};
            for (const module of Object.keys(expectedIds) as ModuleType[]) {
              const row = (bundleTests || []).find(test => test.id === expectedIds[module]);
              if (!row) continue;
              const normalized = normalizeMockTestRow(row as MockTest);
              if (normalized.module_type === module && isUsableFullMockTest(normalized as MockTest, module)) {
                bundledResult[module] = normalized as MockTest;
              }
            }

            if (Object.keys(bundledResult).length === 4) {
              setSelectedBundleId(bundle.id);
              saveSession({ bundleId: bundle.id });
              setUsingFallback(false);
              setTests(bundledResult);
              return;
            }
          }
        }

        // Legacy fallback for published module tests that predate bundles.
        setSelectedBundleId(null);
        saveSession({ bundleId: null });
        const attemptedIds: Partial<Record<ModuleType, Set<string>>> = {};
        if (user) {
          const { data: history } = await supabase!
            .from('mock_test_results')
            .select('listening_test_id, reading_test_id, writing_test_id, speaking_test_id')
            .eq('user_id', user.id)
            .order('completed_at', { ascending: false })
            .limit(20);

          if (history) {
            const cols: Record<ModuleType, string> = {
              listening: 'listening_test_id',
              reading:   'reading_test_id',
              writing:   'writing_test_id',
              speaking:  'speaking_test_id',
            };
            for (const mod of Object.keys(cols) as ModuleType[]) {
              attemptedIds[mod] = new Set(
                history.map((r: Record<string, string | null>) => r[cols[mod]]).filter(Boolean) as string[]
              );
            }
          }
        }

        // ── 2. For each module, pick the best unused test ────────────────────
        const result: Partial<Record<ModuleType, MockTest>> = {};

        for (const s of SECTIONS) {
          const { data: allTests, error: testsError } = await supabase!
            .from('mock_tests')
            .select('*')
            .eq('module_type', s.module)
            .eq('is_published', true)
            .order('created_at', { ascending: false });

          if (testsError) throw testsError;

          const usableTests = (allTests || [])
            .map(t => normalizeMockTestRow(t as MockTest))
            .filter(t => isUsableFullMockTest(t as MockTest, s.module));

          const tried = attemptedIds[s.module] ?? new Set<string>();

          // Prefer a test the user hasn't seen; fall back to least-recently-used
          const isFallback = usableTests.length === 0;
          if (isFallback) {
            console.warn(`[FullMockTest] No published ${s.module} test found — using fallback sample data`);
            setUsingFallback(true);
          }
          const candidates = isFallback ? [getFallbackMockTest(s.module)] : usableTests;
          const fresh = candidates.find(t => !tried.has(t.id));
          const chosen = fresh ?? candidates[candidates.length - 1]; // oldest if all tried

          result[s.module] = chosen as MockTest;
        }

        setTests(result);
      } catch (err) {
        console.error('FullMockTestPage fetch error:', err);
        setUsingFallback(true);
        setTests({
          listening: getFallbackMockTest('listening'),
          reading: getFallbackMockTest('reading'),
          writing: getFallbackMockTest('writing'),
          speaking: getFallbackMockTest('speaking'),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [user]);

  /**
   * Pre-download all listening section audio as blob URLs.
   * Shows progress and proceeds with streaming fallback if download fails.
   * Runs with a 45-second hard timeout so the exam is never blocked.
   */
  const preloadListeningAudio = async (): Promise<void> => {
    const td = tests.listening?.test_data as Record<string, unknown> | undefined;
    if (!td) return;

    const sections = normalizeListeningSections(td);
    const globalUrl = td.audioUrl as string | undefined;

    const targets: { id: string; url: string }[] = [];
    sections.forEach(s => {
      if (s.sectionAudioUrl) targets.push({ id: sectionAudioKey(s.sectionNumber), url: s.sectionAudioUrl });
    });
    if (globalUrl) targets.push({ id: 'global', url: globalUrl });

    // Nothing to preload
    if (targets.length === 0) {
      setAudioPreloadStatus('idle');
      setAudioPreloadMessage('No real audio files were found. Transcript audio fallback will be available.');
      return;
    }

    setAudioPreloading(true);
    setAudioPreloadStatus('loading');
    setAudioPreloadMessage('Preparing listening audio for reliable playback.');
    setAudioPreloadProgress({ done: 0, total: targets.length });

    // Hard timeout — never block the user for more than 45 s
    const deadline = Date.now() + 45_000;

    for (let i = 0; i < targets.length; i++) {
      if (Date.now() > deadline) break;
      const { id, url } = targets[i];
      if (!prefetchedBlobs.current.has(id)) {
        try {
          const blobUrl = await toBlobUrl(url);
          if (blobUrl === url) throw new Error('Blob download unavailable');
          prefetchedBlobs.current.set(id, blobUrl);
        } catch {
          // Network error — streaming fallback will handle it
        }
      }
      setAudioPreloadProgress({ done: i + 1, total: targets.length });
    }

    setAudioPreloading(false);
    const readyCount = targets.filter(target => prefetchedBlobs.current.has(target.id)).length;
    if (readyCount === targets.length) {
      setAudioPreloadStatus('ready');
      setAudioPreloadMessage('All listening audio downloaded for stable playback.');
    } else if (readyCount > 0) {
      setAudioPreloadStatus('partial');
      setAudioPreloadMessage(`${readyCount}/${targets.length} audio files downloaded. Remaining files will stream or use transcript fallback.`);
    } else {
      setAudioPreloadStatus('failed');
      setAudioPreloadMessage('Audio download was not available. The test will use direct streaming or transcript fallback.');
    }
  };

  const startSection = (idx: number) => {
    setSectionIndex(idx);
    setAnswers({});
    setFlaggedQuestions({});
    localStorage.removeItem('mockTestAnswers_v1');
    setActiveReadingPassage(0);
    setActiveListeningSection(0);
    setPhase(SECTIONS[idx].phase);
    restoredTimerRef.current = null; // Clear restored timer — use fresh duration
    resetTimerRef.current?.(SECTIONS[idx].duration);
    saveSession({ timerRemaining: SECTIONS[idx].duration, sectionIndex: idx, phase: SECTIONS[idx].phase, selectedMode });
    setTimeout(() => startTimerRef.current?.(), 100);
  };

  /** Start section, but pre-download listening audio first if section is listening. */
  const startSectionWithPreload = async (idx: number) => {
    if (SECTIONS[idx].phase === 'listening') {
      await preloadListeningAudio();
    }
    startSection(idx);
  };

  const submitSection = useCallback(() => {
    const sec = SECTIONS[sectionIndex];
    const test = tests[sec.module];
    console.log('Submitting section:', sec.module, 'Test data available:', !!test);
    
    let band: number | null = null;
    let sectionReview: SectionReview | null = null;

    try {
      if (test && test.test_data) {
        const td = test.test_data as any;

        if (sec.module === 'reading') {
          const passages = Array.isArray(td.passages) ? td.passages : (td.passage ? [td.passage] : []);
          const qs = passages.flatMap((p: any) => p.questions || []);
          console.log(`Scoring Reading: ${qs.length} questions found`);
          sectionReview = buildObjectiveReview(qs, answers, 'r');
          band = sectionReview.total > 0 ? bandFromScore(sectionReview.correct, sectionReview.total, 'reading') : null;
        } else if (sec.module === 'listening') {
          const sections = normalizeListeningSections(td);
          const qs = sections.flatMap((s: any) => s.questions || []);
          console.log(`Scoring Listening: ${qs.length} questions found`);
          sectionReview = buildObjectiveReview(qs, answers, 'l');
          band = sectionReview.total > 0 ? bandFromScore(sectionReview.correct, sectionReview.total, 'listening') : null;
        } else if (sec.module === 'writing') {
          const task1 = (answers['w_task1'] ?? '').split(/\s+/).filter(Boolean).length;
          const task2 = (answers['w_task2'] ?? '').split(/\s+/).filter(Boolean).length;
          const { task1: task1Data, task2: task2Data } = extractWritingTasks(td);
          setWritingSubmission({
            task1Prompt: task1Data?.prompt ?? '',
            task2Prompt: task2Data?.prompt ?? '',
            task1Response: answers['w_task1'] ?? '',
            task2Response: answers['w_task2'] ?? '',
          });
          setWritingFeedback(null);
          setWritingFeedbackStatus('idle');
          setWritingFeedbackError('');
          band = bandFromWritingWordCounts(task1, task2);
        } else if (sec.module === 'speaking') {
          const words = (answers['sp_answers'] ?? '').split(/\s+/).filter(Boolean).length;
          const clipSeconds = recordedClips.reduce((sum, clip) => sum + clip.duration, 0);
          const clipTranscripts = recordedClips.map(clip => clip.transcript).filter(Boolean).join('\n\n');
          setSpeakingSubmission({
            questions: extractSpeakingQuestions(td),
            typedResponse: [answers['sp_answers'] ?? '', clipTranscripts].filter(Boolean).join('\n\n'),
            clipCount: recordedClips.length,
            totalRecordedSeconds: clipSeconds,
          });
          setSpeakingFeedback(null);
          setSpeakingFeedbackStatus('idle');
          setSpeakingFeedbackError('');
          band = bandFromSpeakingResponse(words, recordedClips.length);
        }
      }
    } catch (err) { console.error('Error calculating score:', err); }

    const finalScores = { ...scores, [sec.module]: band };
    const finalReviewData = sectionReview ? { ...reviewData, [sec.module]: sectionReview } : reviewData;
    if (sectionReview) setReviewData(finalReviewData);
    setScores(finalScores);

    const next = sectionIndex + 1;
    if (next < SECTIONS.length) {
      setPhase('intro');
      setSectionIndex(next);
    } else {
      setPhase('results');
      clearSession(); // Test complete — wipe session
      saveResultToDb(finalScores, tests, finalReviewData, writingFeedback, speakingFeedback);
    }
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sectionIndex, tests, answers, scores, recordedClips, saveResultToDb, reviewData, writingFeedback, speakingFeedback]);

  useEffect(() => { submitSectionRef.current = submitSection; }, [submitSection]);

  const requestWritingFeedback = async () => {
    if (!writingSubmission) {
      setWritingFeedbackStatus('error');
      setWritingFeedbackError('No writing submission found for this attempt.');
      return;
    }

    setWritingFeedbackStatus('loading');
    setWritingFeedbackError('');

    try {
      const response = await fetch('/api/analyze-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(writingSubmission),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to generate writing feedback.');
      }

      const feedback = data.feedback as WritingFeedback;
      setWritingFeedback(feedback);
      setWritingFeedbackStatus('ready');

      if (user && supabase && isSupabaseConfigured()) {
        try {
          let resultId = savedResultIdRef.current;
          if (!resultId) {
            const latest = await supabase
              .from('mock_test_results')
              .select('id')
              .eq('user_id', user.id)
              .order('completed_at', { ascending: false })
              .limit(1)
              .maybeSingle();
            resultId = latest.data?.id ?? null;
            savedResultIdRef.current = resultId;
          }

          if (resultId) {
            const { error: updateError } = await supabase
              .from('mock_test_results')
              .update({ writing_feedback: feedback })
              .eq('id', resultId)
              .eq('user_id', user.id);

            if (updateError && !/writing_feedback|column/i.test(updateError.message || '')) {
              console.error('Failed to persist writing feedback:', updateError);
            }
          }
        } catch (persistError) {
          console.error('Error persisting writing feedback:', persistError);
        }
      }
    } catch (err) {
      setWritingFeedbackStatus('error');
      setWritingFeedbackError(err instanceof Error ? err.message : 'Failed to generate writing feedback.');
    }
  };

  const requestSpeakingFeedback = async () => {
    if (!speakingSubmission) {
      setSpeakingFeedbackStatus('error');
      setSpeakingFeedbackError('No speaking submission found for this attempt.');
      return;
    }

    setSpeakingFeedbackStatus('loading');
    setSpeakingFeedbackError('');

    try {
      let transcriptText = '';
      const clipsToTranscribe = recordedClips.filter(clip => !clip.transcript);
      if (clipsToTranscribe.length > 0) {
        const transcripts = await Promise.all(
          clipsToTranscribe.map(clip => transcribeSpeakingClip(clip).catch((err) => {
            console.error('Speaking transcription failed:', err);
            return '';
          }))
        );
        transcriptText = transcripts.filter(Boolean).join('\n\n');
      }

      const existingTranscripts = recordedClips
        .map(clip => clip.transcript)
        .filter(Boolean)
        .join('\n\n');
      const typedResponse = [
        speakingSubmission.typedResponse,
        existingTranscripts,
        transcriptText,
      ].filter(Boolean).join('\n\n').trim();
      const submissionForAnalysis: SpeakingSubmission = {
        ...speakingSubmission,
        typedResponse,
      };
      setSpeakingSubmission(submissionForAnalysis);

      const response = await fetch('/api/analyze-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionForAnalysis),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to generate speaking feedback.');
      }

      const feedback = data.feedback as SpeakingFeedback;
      setSpeakingFeedback(feedback);
      setSpeakingFeedbackStatus('ready');

      if (user && supabase && isSupabaseConfigured()) {
        try {
          let resultId = savedResultIdRef.current;
          if (!resultId) {
            const latest = await supabase
              .from('mock_test_results')
              .select('id')
              .eq('user_id', user.id)
              .order('completed_at', { ascending: false })
              .limit(1)
              .maybeSingle();
            resultId = latest.data?.id ?? null;
            savedResultIdRef.current = resultId;
          }

          if (resultId) {
            const { error: updateError } = await supabase
              .from('mock_test_results')
              .update({ speaking_feedback: feedback })
              .eq('id', resultId)
              .eq('user_id', user.id);

            if (updateError && !/speaking_feedback|column/i.test(updateError.message || '')) {
              console.error('Failed to persist speaking feedback:', updateError);
            }
          }
        } catch (persistError) {
          console.error('Error persisting speaking feedback:', persistError);
        }
      }
    } catch (err) {
      setSpeakingFeedbackStatus('error');
      setSpeakingFeedbackError(err instanceof Error ? err.message : 'Failed to generate speaking feedback.');
    }
  };

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
        <div className="full-mock-paper min-h-screen flex items-center justify-center animate-in fade-in duration-500">
          <div className="container mx-auto px-4 py-12 max-w-lg">
            <Card className="exam-transition-card rounded-none border-[#c7cbd8] bg-[#f8f8f5] text-[#182644]">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${nextSection.bg} flex items-center justify-center mx-auto mb-4`}>
                   {nextSection.icon}
                </div>
                <CardTitle className="text-2xl font-bold">Ready for {nextSection.label}?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                  <span className="text-[#3c4a6b]">Section</span>
                  <span className="font-bold">{sectionIndex + 1} of 4</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                  <span className="text-[#3c4a6b]">Duration</span>
                  <span className="font-bold">{Math.floor(nextSection.duration / 60)} minutes</span>
                </div>
                <Button 
                  className="w-full rounded-none bg-[#182644] py-6 text-lg font-semibold text-white hover:bg-[#0f1930]"
                  onClick={() => startSectionWithPreload(sectionIndex)}
                  disabled={audioPreloading}
                >
                  {audioPreloading
                    ? <span className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" />Preparing Audio…</span>
                    : `Start ${nextSection.label} Section`}
                </Button>
                {audioPreloading && audioPreloadProgress.total > 0 && (
                  <div className="space-y-1">
                    <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-[#d98e2b] rounded-full transition-all duration-300"
                        style={{ width: `${Math.round((audioPreloadProgress.done / audioPreloadProgress.total) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#3c4a6b] text-center">
                      Audio {audioPreloadProgress.done}/{audioPreloadProgress.total} downloaded
                    </p>
                  </div>
                )}
                {audioPreloadMessage && (
                  <p className={`text-xs text-center font-bold ${
                    audioPreloadStatus === 'ready' ? 'text-emerald-300' :
                    audioPreloadStatus === 'partial' ? 'text-amber-300' :
                    audioPreloadStatus === 'failed' ? 'text-red-600' : 'text-[#3c4a6b]'
                  }`}>
                    {audioPreloadMessage}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    // Main landing page intro
    const paperIntro = true;
    if (paperIntro) {
      return (
        <div className="full-mock-paper min-h-screen flex items-center justify-center px-4 py-10">
          <main className="exam-start-cover w-full max-w-3xl bg-[#f8f8f5] border border-[#c7cbd8] p-6 sm:p-10 md:p-12">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#d98e2b]">Official practice paper · Full mock</div>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#182644] sm:text-5xl">IELTS Full Mock Test</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#3c4a6b] sm:text-base">
              Complete Listening, Reading, Writing and Speaking in sequence under timed exam conditions.
            </p>

            <div className="mt-8 grid grid-cols-2 border border-[#c7cbd8] bg-[#c7cbd8] sm:grid-cols-4 gap-px">
              {[
                ['04', 'Modules'], ['2h 45m', 'Duration'], ['80', 'Objective Qs'], ['9.0', 'Band scale'],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#f8f8f5] px-4 py-4">
                  <div className="font-mono text-xl font-semibold text-[#182644]">{value}</div>
                  <div className="mt-1 text-xs text-[#3c4a6b]">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]">
              <div>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#3c4a6b]">Test order</h2>
                <ol className="mt-3 border-t-2 border-[#182644]">
                  {testModules.map((module, index) => (
                    <li key={module.id} className="flex items-center gap-4 border-b border-[#c7cbd8] py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#182644] font-mono text-xs font-semibold text-white">{index + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#182644]">{module.name}</p>
                        <p className="text-xs text-[#3c4a6b]">{module.duration} · {module.questions}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#3c4a6b]">Pre-test check</h2>
                <div className="mt-3 space-y-2">
                  {preTestChecklist.map((item) => (
                    <button key={item.id} type="button" onClick={() => toggleCheckItem(item.id)}
                      className={`flex w-full items-center gap-3 border px-3 py-3 text-left text-sm transition-colors ${checkedItems.includes(item.id) ? 'border-[#2f7d5d] bg-[#dceee5]' : 'border-[#c7cbd8] bg-white hover:border-[#3c4a6b]'}`}>
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${checkedItems.includes(item.id) ? 'border-[#2f7d5d] bg-[#2f7d5d] text-white' : 'border-[#c7cbd8]'}`}>
                        {checkedItems.includes(item.id) && <Check className="h-3 w-3" />}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-dashed border-[#c7cbd8] pt-6">
              {user && isPremium ? (
                <Button onClick={() => startSectionWithPreload(0)} disabled={!allChecked || audioPreloading}
                  className="w-full rounded-none bg-[#182644] py-7 text-base font-semibold text-white hover:bg-[#0f1930]">
                  {audioPreloading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Preparing audio…</> : <><Play className="mr-2 h-5 w-5" /> Start full mock test</>}
                </Button>
              ) : user ? (
                <Button onClick={() => navigate('/pricing')} className="w-full rounded-none bg-[#d98e2b] py-7 text-base font-semibold text-[#182644]">Upgrade to start</Button>
              ) : (
                <Button onClick={() => navigate('/login')} className="w-full rounded-none bg-[#182644] py-7 text-base font-semibold text-white">Sign in to start</Button>
              )}
              <p className="mt-3 text-center text-xs text-[#3c4a6b]">Use headphones. Listening recordings can be played once only.</p>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="full-mock-paper full-mock-intro min-h-screen animate-in fade-in duration-500">
        {/* Hero Section */}
        <section className="exam-cover relative overflow-hidden">
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
                          <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Pause or resume timer</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Flexible section pacing</li>
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
             {user && isPremium ? (
               <div className="flex flex-col items-center gap-4">
                 <Button 
                  size="lg" 
                  onClick={() => startSectionWithPreload(0)} 
                  disabled={!allChecked || audioPreloading}
                  className="bg-accent hover:bg-accent/90 text-white font-black text-xl px-12 py-8 rounded-[40px] shadow-2xl shadow-accent/40 group gap-4 scale-110"
                 >
                   {audioPreloading
                     ? <><Loader2 className="h-6 w-6 animate-spin" /> Preparing Audio…</>
                     : <><Play className="h-6 w-6 fill-current" /> START FULL EXAM <ChevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" /></>}
                 </Button>
                  {audioPreloading && audioPreloadProgress.total > 0 && (
                    <div className="w-72 space-y-2">
                     <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                       <div
                         className="h-full bg-accent rounded-full transition-all duration-300"
                         style={{ width: `${Math.round((audioPreloadProgress.done / audioPreloadProgress.total) * 100)}%` }}
                       />
                     </div>
                     <p className="text-sm text-background/60 font-medium text-center">
                       Downloading audio {audioPreloadProgress.done}/{audioPreloadProgress.total} for offline playback…
                     </p>
                    </div>
                  )}
                  {audioPreloadMessage && (
                    <p className={`max-w-sm text-center text-sm font-bold ${
                      audioPreloadStatus === 'ready' ? 'text-emerald-300' :
                      audioPreloadStatus === 'partial' ? 'text-amber-300' :
                      audioPreloadStatus === 'failed' ? 'text-red-300' : 'text-background/60'
                    }`}>
                      {audioPreloadMessage}
                    </p>
                  )}
                </div>
             ) : user && !isPremium ? (
               <Button size="lg" onClick={() => navigate('/pricing')} className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xl px-12 py-8 rounded-[40px] gap-4">
                 <Crown className="h-6 w-6" /> UPGRADE TO PRO
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
      <div className="full-mock-paper exam-results min-h-screen animate-in fade-in duration-500">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#d98e2b] rounded-full flex items-center justify-center mx-auto mb-5">
              <Award className="h-8 w-8 text-[#182644]" />
            </div>
            <h1 className="font-serif text-4xl font-semibold mb-2 tracking-tight text-[#182644]">Test complete</h1>
            <p className="text-[#3c4a6b] text-base font-medium">Your IELTS performance report</p>
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

          <div className="exam-result-hero p-10 text-center mb-8">
            <p className="text-indigo-300 text-sm font-black uppercase tracking-[0.3em] mb-4">Overall Predicted Band</p>
            <p className={`text-9xl font-black ${bandColor} mb-6 tracking-tighter`}>{overall.toFixed(1)}</p>
            <div className="h-2 w-24 bg-white/20 mx-auto rounded-full mb-6" />
            <p className="text-xl font-bold text-white/90">
              {overall >= 8 ? 'Expert User — Phenomenal!' : overall >= 7 ? 'Good User — Great potential!' : overall >= 6 ? 'Competent User — Solid foundation!' : 'Modest User — Let\'s work on improvement'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px mb-10 border border-[#c7cbd8] bg-[#c7cbd8]">
            {SECTIONS.map(s => {
              const band = scores[s.module];
              const bc = band && band >= 7 ? 'text-green-400' : band && band >= 5.5 ? 'text-yellow-400' : 'text-red-400';
              const review = reviewData[s.module];
              return (
                <div key={s.phase} className="exam-result-module bg-[#f8f8f5] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-white`}>{s.icon}</div>
                    <span className="font-black text-sm uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className={`text-5xl font-black ${bc}`}>{band?.toFixed(1) ?? '—'}</p>
                  {review && (
                    <p className="mt-3 text-xs font-black uppercase tracking-widest text-white/50">
                      {review.correct}/{review.total} correct
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {(reviewData.listening || reviewData.reading) && (
            <div className="mb-12 space-y-8">
              <div className="text-center">
                <p className="text-indigo-300 text-sm font-black uppercase tracking-[0.3em] mb-3">Answer Review</p>
                <h2 className="text-3xl font-black">Objective Module Breakdown</h2>
              </div>

              {(['listening', 'reading'] as ModuleType[]).map(module => {
                const review = reviewData[module];
                if (!review) return null;
                const section = SECTIONS.find(s => s.module === module);
                const wrongCount = review.total - review.correct;

                return (
                  <div key={module} className="exam-report-section overflow-hidden">
                    <div className="px-8 py-6 bg-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl ${section?.bg ?? 'bg-indigo-500'} flex items-center justify-center`}>
                          {section?.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-black capitalize">{module}</h3>
                          <p className="text-sm text-white/55 font-bold">{review.correct} correct, {wrongCount} needs review</p>
                        </div>
                      </div>
                      <Badge className="bg-white text-slate-900 rounded-full px-5 py-2 font-black">
                        Raw {review.correct}/{review.total}
                      </Badge>
                    </div>

                    <div className="p-5 sm:p-8 space-y-4 max-h-[520px] overflow-y-auto">
                      {review.items.map(item => (
                        <div
                          key={`${module}-${item.questionNumber}`}
                          className={`rounded-3xl border p-5 ${
                            item.correct
                              ? 'bg-emerald-500/10 border-emerald-400/25'
                              : 'bg-red-500/10 border-red-400/25'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 font-black ${
                              item.correct ? 'bg-emerald-400 text-emerald-950' : 'bg-red-400 text-red-950'
                            }`}>
                              {item.questionNumber}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-white/90 leading-relaxed">{displayText(item.questionText, `Question ${item.questionNumber}`)}</p>
                              <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm">
                                <div className="rounded-2xl bg-black/15 p-4">
                                  <p className="text-white/45 font-black uppercase tracking-widest text-[10px] mb-1">Your Answer</p>
                                  <p className="font-bold text-white">{item.userAnswer.trim() || 'Not answered'}</p>
                                </div>
                                <div className="rounded-2xl bg-black/15 p-4">
                                  <p className="text-white/45 font-black uppercase tracking-widest text-[10px] mb-1">Accepted Answer</p>
                                  <p className="font-bold text-white">{item.acceptedAnswers.join(' / ') || 'Not provided'}</p>
                                </div>
                              </div>
                              {item.explanation && (
                                <p className="mt-4 text-sm text-white/65 font-medium leading-relaxed">{item.explanation}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {writingSubmission && (
            <div className="exam-report-section mb-12 overflow-hidden">
              <div className="px-8 py-6 bg-white/5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">AI Writing Feedback</h2>
                    <p className="text-sm text-white/55 font-bold">
                      Rubric-based review for Task 1 and Task 2
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={requestWritingFeedback}
                  disabled={writingFeedbackStatus === 'loading'}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black px-7 py-6 gap-2"
                >
                  {writingFeedbackStatus === 'loading'
                    ? <><Loader2 className="h-5 w-5 animate-spin" /> ANALYZING</>
                    : writingFeedback
                    ? <><Sparkles className="h-5 w-5" /> REGENERATE FEEDBACK</>
                    : <><Sparkles className="h-5 w-5" /> GENERATE FEEDBACK</>}
                </Button>
              </div>

              <div className="p-6 sm:p-8">
                {writingFeedbackStatus === 'error' && (
                  <div className="mb-6 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-red-100 font-bold">
                    {writingFeedbackError}
                  </div>
                )}

                {!writingFeedback && writingFeedbackStatus !== 'loading' && (
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="rounded-3xl bg-black/15 p-5">
                      <p className="text-white/45 font-black uppercase tracking-widest text-[10px] mb-2">Task 1</p>
                      <p className="text-white font-bold">{writingSubmission.task1Response.trim().split(/\s+/).filter(Boolean).length} words ready for review</p>
                    </div>
                    <div className="rounded-3xl bg-black/15 p-5">
                      <p className="text-white/45 font-black uppercase tracking-widest text-[10px] mb-2">Task 2</p>
                      <p className="text-white font-bold">{writingSubmission.task2Response.trim().split(/\s+/).filter(Boolean).length} words ready for review</p>
                    </div>
                  </div>
                )}

                {writingFeedback && (
                  <div className="space-y-7">
                    <div className="rounded-[30px] bg-emerald-500/15 border border-emerald-400/25 p-7">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                          <p className="text-emerald-200 text-xs font-black uppercase tracking-[0.25em] mb-2">Estimated Writing Band</p>
                          <p className="text-6xl font-black text-emerald-300">{Number(writingFeedback.estimatedBand).toFixed(1)}</p>
                        </div>
                        <Badge className="bg-emerald-300 text-emerald-950 rounded-full px-5 py-2 font-black">
                          AI Estimate
                        </Badge>
                      </div>
                      <p className="text-white/80 font-medium leading-relaxed">{writingFeedback.summary}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {writingFeedback.criteria.map((criterion) => (
                        <div key={criterion.name} className="rounded-3xl bg-black/15 border border-white/10 p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="font-black text-white">{criterion.name}</h3>
                            <Badge className="bg-white text-slate-900 rounded-full font-black">
                              {Number(criterion.band).toFixed(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/65 font-medium leading-relaxed">{criterion.feedback}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-4">
                      {[
                        { title: 'Strengths', items: writingFeedback.strengths, tone: 'text-emerald-200' },
                        { title: 'Improve Next', items: writingFeedback.improvements, tone: 'text-amber-200' },
                        { title: 'Action Plan', items: writingFeedback.actionPlan, tone: 'text-indigo-200' },
                      ].map(section => (
                        <div key={section.title} className="rounded-3xl bg-black/15 border border-white/10 p-5">
                          <h3 className={`font-black mb-4 ${section.tone}`}>{section.title}</h3>
                          <ul className="space-y-3">
                            {section.items.map((item, index) => (
                              <li key={index} className="text-sm text-white/70 font-medium leading-relaxed flex gap-3">
                                <span className="text-white/35 font-black">{index + 1}</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="rounded-3xl bg-black/15 border border-white/10 p-5">
                        <h3 className="font-black text-emerald-200 mb-3">Task 1 Notes</h3>
                        <p className="text-sm text-white/70 font-medium leading-relaxed">{writingFeedback.task1Notes}</p>
                      </div>
                      <div className="rounded-3xl bg-black/15 border border-white/10 p-5">
                        <h3 className="font-black text-emerald-200 mb-3">Task 2 Notes</h3>
                        <p className="text-sm text-white/70 font-medium leading-relaxed">{writingFeedback.task2Notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {speakingSubmission && (
            <div className="exam-report-section mb-12 overflow-hidden">
              <div className="px-8 py-6 bg-white/5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">AI Speaking Feedback</h2>
                    <p className="text-sm text-white/55 font-bold">
                      Transcript-style review for your typed speaking response
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={requestSpeakingFeedback}
                  disabled={speakingFeedbackStatus === 'loading'}
                  className="bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black px-7 py-6 gap-2"
                >
                  {speakingFeedbackStatus === 'loading'
                    ? <><Loader2 className="h-5 w-5 animate-spin" /> ANALYZING</>
                    : speakingFeedback
                    ? <><Sparkles className="h-5 w-5" /> REGENERATE FEEDBACK</>
                    : <><Sparkles className="h-5 w-5" /> GENERATE FEEDBACK</>}
                </Button>
              </div>

              <div className="p-6 sm:p-8">
                {speakingFeedbackStatus === 'error' && (
                  <div className="mb-6 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-red-100 font-bold">
                    {speakingFeedbackError}
                  </div>
                )}

                {!speakingFeedback && speakingFeedbackStatus !== 'loading' && (
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="rounded-3xl bg-black/15 p-5">
                      <p className="text-white/45 font-black uppercase tracking-widest text-[10px] mb-2">Typed Response</p>
                      <p className="text-white font-bold">{speakingSubmission.typedResponse.trim().split(/\s+/).filter(Boolean).length} words</p>
                    </div>
                    <div className="rounded-3xl bg-black/15 p-5">
                      <p className="text-white/45 font-black uppercase tracking-widest text-[10px] mb-2">Recordings</p>
                      <p className="text-white font-bold">{speakingSubmission.clipCount} clips</p>
                    </div>
                    <div className="rounded-3xl bg-black/15 p-5">
                      <p className="text-white/45 font-black uppercase tracking-widest text-[10px] mb-2">Duration</p>
                      <p className="text-white font-bold">{Math.round(speakingSubmission.totalRecordedSeconds)} seconds</p>
                    </div>
                  </div>
                )}

                {speakingFeedback && (
                  <div className="space-y-7">
                    <div className="rounded-[30px] bg-orange-500/15 border border-orange-400/25 p-7">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                          <p className="text-orange-200 text-xs font-black uppercase tracking-[0.25em] mb-2">Estimated Speaking Band</p>
                          <p className="text-6xl font-black text-orange-300">{Number(speakingFeedback.estimatedBand).toFixed(1)}</p>
                        </div>
                        <Badge className="bg-orange-300 text-orange-950 rounded-full px-5 py-2 font-black">
                          AI Estimate
                        </Badge>
                      </div>
                      <p className="text-white/80 font-medium leading-relaxed">{speakingFeedback.summary}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {speakingFeedback.criteria.map((criterion) => (
                        <div key={criterion.name} className="rounded-3xl bg-black/15 border border-white/10 p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="font-black text-white">{criterion.name}</h3>
                            <Badge className="bg-white text-slate-900 rounded-full font-black">
                              {Number(criterion.band).toFixed(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/65 font-medium leading-relaxed">{criterion.feedback}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-4">
                      {[
                        { title: 'Strengths', items: speakingFeedback.strengths, tone: 'text-emerald-200' },
                        { title: 'Improve Next', items: speakingFeedback.improvements, tone: 'text-amber-200' },
                        { title: 'Action Plan', items: speakingFeedback.actionPlan, tone: 'text-indigo-200' },
                      ].map(section => (
                        <div key={section.title} className="rounded-3xl bg-black/15 border border-white/10 p-5">
                          <h3 className={`font-black mb-4 ${section.tone}`}>{section.title}</h3>
                          <ul className="space-y-3">
                            {section.items.map((item, index) => (
                              <li key={index} className="text-sm text-white/70 font-medium leading-relaxed flex gap-3">
                                <span className="text-white/35 font-black">{index + 1}</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {speakingFeedback.partNotes.length > 0 && (
                      <div className="rounded-3xl bg-black/15 border border-white/10 p-5">
                        <h3 className="font-black text-orange-200 mb-4">Part Notes</h3>
                        <ul className="space-y-3">
                          {speakingFeedback.partNotes.map((item, index) => (
                            <li key={index} className="text-sm text-white/70 font-medium leading-relaxed flex gap-3">
                              <span className="text-white/35 font-black">{index + 1}</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" onClick={() => { 
                clearSession(); // Wipe persisted session for a clean retake
                setPhase('intro'); 
                setSectionIndex(0); 
                setScores({ listening: null, reading: null, writing: null, speaking: null }); 
                setReviewData({});
                setWritingSubmission(null);
                setWritingFeedback(null);
                setWritingFeedbackStatus('idle');
                setWritingFeedbackError('');
                setSpeakingSubmission(null);
                setSpeakingFeedback(null);
                setSpeakingFeedbackStatus('idle');
                setSpeakingFeedbackError('');
                recordedClips.forEach(clip => URL.revokeObjectURL(clip.url));
                setRecordedClips([]);
                setAnswers({}); 
                setPlayedAudios(new Set());
              }}
              className="rounded-none bg-[#d98e2b] px-12 py-8 font-black text-[#182644] shadow-xl hover:bg-[#c67f21] gap-4"
            >
              <RotateCcw className="h-6 w-6" /> RETAKE FULL EXAM
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/mock-test')}
              className="rounded-none border-white/40 bg-transparent px-12 py-8 font-black text-white hover:bg-white hover:text-[#182644]"
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
  const timeColor = remaining < 300 ? 'text-red-600 animate-pulse' : remaining < 600 ? 'text-amber-600' : 'text-emerald-600';

  const navKeys: string[] = [];
  const readingPassageNav: Array<{
    id: string;
    index: number;
    label: string;
    range: string;
    firstQuestionKey: string;
    startIndex: number;
    endIndex: number;
    answered: number;
    total: number;
  }> = [];

  if (phase === 'listening') {
    const sections = normalizeListeningSections(td);
    let i = 0;
    sections.forEach(s => {
      const questions = Array.isArray(s.questions) ? s.questions : [];
      questions.forEach(() => navKeys.push(`l_${i++}`));
    });
  } else if (phase === 'reading') {
    const passages = Array.isArray(td?.passages) ? td.passages : (td?.passage ? [td.passage] : []);
    let i = 0;
    passages.forEach((p: any, passageIndex: number) => {
      const questions = Array.isArray(p.questions) ? p.questions : [];
      const start = i + 1;
      questions.forEach(() => navKeys.push(`r_${i++}`));
      if (questions.length > 0) {
        const questionKeys = Array.from({ length: questions.length }, (_unused, offset) => `r_${start - 1 + offset}`);
        readingPassageNav.push({
          id: `reading-passage-${passageIndex + 1}`,
          index: passageIndex,
          label: `Passage ${passageIndex + 1}`,
          range: `Q${start}-Q${i}`,
          firstQuestionKey: `r_${start - 1}`,
          startIndex: start - 1,
          endIndex: i - 1,
          answered: questionKeys.filter(key => !!answers[key]).length,
          total: questions.length,
        });
      }
    });
  }

  const scrollToQuestion = (key: string) => {
    if (phase === 'listening') {
      const questionIndex = Number(key.split('_')[1]);
      setActiveListeningSection(Math.max(0, Math.min(3, Math.floor(questionIndex / 10))));
      setTimeout(() => {
        const target = document.getElementById(key);
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
      return;
    }
    if (phase === 'reading') {
      const questionIndex = Number(key.split('_')[1]);
      const passage = readingPassageNav.find(item => questionIndex >= item.startIndex && questionIndex <= item.endIndex);
      if (passage) setActiveReadingPassage(passage.index);
      setReadingMobileView('questions');
    }
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-indigo-400', 'rounded-2xl', 'transition-all', 'duration-500');
      setTimeout(() => el.classList.remove('ring-4', 'ring-indigo-400'), 2000);
    }
  };

  const scrollToPassage = (item: typeof readingPassageNav[number]) => {
    setActiveReadingPassage(item.index);
    setReadingMobileView('passage');
    const el = document.getElementById(item.id) ?? document.getElementById(item.firstQuestionKey);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('ring-4', 'ring-blue-300', 'rounded-2xl', 'transition-all', 'duration-500');
      setTimeout(() => el.classList.remove('ring-4', 'ring-blue-300'), 1600);
    }
  };

  const objectiveSectionMissingQuestions = !!test && (phase === 'listening' || phase === 'reading') && navKeys.length === 0;
  const pageContainerClass =
    phase === 'reading' || phase === 'listening'
      ? 'py-6 max-w-[1280px]'
      : phase === 'writing'
      ? 'py-6 sm:py-8 max-w-[1280px]'
      : 'py-12 max-w-4xl';

  return (
    <div className={`full-mock-paper phase-${phase} min-h-screen pt-[76px] pb-40`}>
      {/* Admin warning when using fallback data */}
      {usingFallback && isAdmin && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-white text-center py-2 px-4 text-xs font-black uppercase tracking-wider">
          ⚠ Sample data is active because no published test was found. Check Admin Panel → Manage Mock Tests.
        </div>
      )}
      <div className={`exam-topbar fixed ${usingFallback && isAdmin ? 'top-8' : 'top-0'} left-0 right-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300`}>
        <div className="flex items-center gap-4">
          <div className="exam-section-mark w-9 h-9 flex items-center justify-center">{currentSection.icon}</div>
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-0.5">Section {sectionIndex + 1} of 4</p>
            <div className="flex items-center gap-2">
              <p className="exam-title font-semibold text-lg leading-tight">IELTS {currentSection.label}</p>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 transition-all duration-500 ${isSavedIndicator ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95 pointer-events-none'}`}>
                <CheckCircle className="w-3 h-3" /> Saved
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden md:flex items-center gap-2">
             {SECTIONS.map((_s, i) => (
                <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${i < sectionIndex ? 'bg-[#2f7d5d]' : i === sectionIndex ? 'bg-[#d98e2b] scale-105' : 'bg-slate-200'}`} />
             ))}
           </div>
           {selectedMode === 'practice' && (
             <Button
               type="button"
               size="sm"
               variant="outline"
               onClick={() => timerRunning ? pauseTimer() : startTimer()}
               className="hidden sm:inline-flex border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-black shadow-sm transition-all"
             >
               {timerRunning ? 'PAUSE' : 'RESUME'}
             </Button>
           )}
           <div className={`exam-timer flex items-center gap-2 font-mono font-semibold text-xl py-2 px-4 transition-colors duration-300 ${timeColor}`}>
            <Clock className="h-6 w-6" />
            {formatTime(remaining)}
          </div>
          <Button type="button" onClick={() => submitSection()} className="exam-top-submit hidden rounded-none bg-[#d98e2b] px-5 font-semibold text-[#182644] hover:bg-[#c67f21] sm:inline-flex">
            Submit section
          </Button>
        </div>
      </div>

      <div className={`exam-workspace w-full mx-auto px-3 sm:px-6 ${pageContainerClass}`}>
        {!test ? (
          <Card className="border-dashed border-4 border-muted py-32 text-center rounded-[40px]">
            <div className="bg-muted w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"><AlertCircle className="h-10 w-10 text-muted-foreground" /></div>
            <h3 className="text-2xl font-black mb-3">No {currentSection.label} Test Available</h3>
            <p className="text-muted-foreground mb-8 font-medium">Please contact admin to add mock test content.</p>
            <Button onClick={() => submitSection()} size="lg" className="rounded-full px-12">SKIP SECTION <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Card>
        ) : (
          <div key={phase}>
            {phase === 'listening' && (() => {
              const paperSections = normalizeListeningSections(td) as ListeningPaperSection[];
              const activePaperSection = paperSections[activeListeningSection];
              const activePaperAudioId = sectionAudioKey(activePaperSection?.sectionNumber);
              return (
                <FullMockListeningPaper
                  sections={paperSections}
                  answers={answers}
                  activeSection={activeListeningSection}
                  setActiveSection={setActiveListeningSection}
                  setAnswer={(key, value) => setAnswers(prev => ({ ...prev, [key]: value }))}
                  flaggedQuestions={flaggedQuestions}
                  toggleFlag={toggleFlag}
                  playedAudioIds={playedAudios}
                  playingAudioId={realAudioPlaying ?? playingAudioId}
                  playSectionAudio={(section, index) => {
                    const id = sectionAudioKey(section.sectionNumber ?? index + 1);
                    const transcript = section.transcript ?? '';
                    if (section.sectionAudioUrl) playRealAudio(id, section.sectionAudioUrl, transcript);
                    else toggleAudio(id, transcript);
                  }}
                  audioMessage={audioPlaybackStatus[activePaperAudioId]?.message}
                  audioSupported={audioSupported}
                  timeDisplay={formatTime(remaining)}
                  timeWarning={remaining < 300}
                  savedIndicator={isSavedIndicator}
                  onSubmit={() => submitSection()}
                />
              );
            })()}

            {phase === 'listening' && legacyListeningEnabled && (() => {
              const sections = normalizeListeningSections(td);
              const globalTranscript = typeof td?.transcript === 'string' ? td.transcript : '';
              const rawGlobalAudioUrl = typeof (td as any)?.audioUrl === 'string' ? (td as any).audioUrl as string : '';
              // If any section has its own audio URL, use per-section mode and ignore the global audioUrl.
              // The global audioUrl is only meaningful when there is a single monolithic recording for all sections.
              const hasPerSectionAudio = sections.some(s => s.sectionAudioUrl);
              const globalAudioUrl = hasPerSectionAudio ? '' : rawGlobalAudioUrl;
              let qIdx = 0;
              return (
                <div className="exam-listening space-y-10">
                  {sections.length === 0 && (
                    <Card className="rounded-[34px] border-2 border-amber-200 bg-amber-50 shadow-xl">
                      <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
                        <AlertCircle className="h-12 w-12 text-amber-600" />
                        <div>
                          <h3 className="text-2xl font-black text-amber-900">Listening questions are missing</h3>
                          <p className="mt-2 max-w-2xl text-sm font-semibold text-amber-800">
                            This mock test loaded, but its listening content is not in the expected IELTS section format. Please choose another listening mock or regenerate this one from the admin panel.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {/* Audio availability notice for unsupported browsers */}
                  {!audioSupported && (
                    <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-amber-800">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm font-bold">Text-to-speech is not supported in this browser. Please use Chrome, Safari, or Edge for audio playback.</p>
                    </div>
                  )}
                  {/* Global audio player — only shown when there is ONE recording for all sections */}
                  {(globalAudioUrl || (!hasPerSectionAudio && globalTranscript)) && (
                    <Card className="exam-audio-card sticky top-[76px] z-30 overflow-hidden lg:top-24 animate-in fade-in duration-500">
                      <div className="bg-violet-600 p-4 sm:p-5 flex flex-col gap-4 text-white sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3"><Headphones className="h-6 w-6" /><h3 className="font-black uppercase tracking-wider">Audio Interface</h3></div>
                        <Button
                          type="button"
                          size="lg"
                          disabled={playedAudios.has('global') && realAudioPlaying !== 'global' && playingAudioId !== 'global'}
                          className={`w-full rounded-2xl font-black px-6 sm:w-auto ${
                            playedAudios.has('global') && realAudioPlaying !== 'global' && playingAudioId !== 'global' ? 'bg-white/20 text-white/40' :
                            (realAudioPlaying === 'global' || playingAudioId === 'global') ? 'bg-amber-400 text-amber-900 hover:bg-amber-300' :
                            'bg-white text-violet-700 hover:bg-white/90 shadow-xl'
                          }`}
                          onClick={() => globalAudioUrl
                            ? playRealAudio('global', globalAudioUrl, globalTranscript)
                            : toggleAudio('global', globalTranscript)
                          }
                        >
                          {(realAudioPlaying === 'global' || playingAudioId === 'global')
                            ? <><Volume2 className="h-5 w-5 mr-2 animate-pulse" /> PLAYING — CLICK TO STOP</>
                            : playedAudios.has('global')
                            ? <><Volume2 className="h-5 w-5 mr-2 opacity-40" /> PLAYED (EXAM: ONCE ONLY)</>
                            : <><Play className="h-5 w-5 mr-2" /> PLAY AUDIO</>
                          }
                        </Button>
                      </div>
                      <CardContent className="p-5 text-center bg-violet-50/50">
                        <div className="max-w-md mx-auto">
                          <div className={`w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-3 ${(realAudioPlaying === 'global' || playingAudioId === 'global') ? 'animate-pulse' : ''}`}>
                            <Volume2 className="h-6 w-6 text-violet-600" />
                          </div>
                          <p className="text-sm font-bold text-violet-800">
                            {(realAudioPlaying === 'global' || playingAudioId === 'global')
                              ? 'Audio is playing. Answer questions as you listen.'
                              : 'Recording will play once only. Answer questions as you listen.'}
                          </p>
                          {audioPlaybackStatus.global?.message && (
                            <p className={`mt-3 text-xs font-bold ${
                              audioPlaybackStatus.global.status === 'error' ? 'text-red-600' :
                              audioPlaybackStatus.global.status === 'fallback' ? 'text-amber-600' :
                              audioPlaybackStatus.global.status === 'ended' ? 'text-emerald-600' : 'text-violet-600'
                            }`}>
                              {displayText(audioPlaybackStatus.global.message)}
                            </p>
                          )}
                          {audioPlaybackStatus.global?.controlsUrl && audioPlaybackStatus.global.status !== 'ended' && (
                            <audio
                              src={audioPlaybackStatus.global.controlsUrl}
                              controls
                              preload="metadata"
                              playsInline
                              onPlay={() => setPlayedAudios(prev => new Set(prev).add('global'))}
                              className="mt-4 w-full"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {sections.map((sec, listeningSectionIndex) => {
                    const sectionAudioId = sectionAudioKey(sec.sectionNumber);
                    const sectionTranscript = typeof sec.transcript === 'string' ? sec.transcript : '';
                    const sectionUrl = sec.sectionAudioUrl ?? '';
                    const hasAudio = !!(sectionUrl || sectionTranscript);
                    const isPlayingThis = realAudioPlaying === sectionAudioId || playingAudioId === sectionAudioId;
                    const wasPlayed = playedAudios.has(sectionAudioId);
                    const sectionPlaybackStatus = audioPlaybackStatus[sectionAudioId];
                    const sectionQuestions = Array.isArray(sec.questions) ? sec.questions : [];
                    const sectionStartNumber = qIdx + 1;
                    const sectionEndNumber = sectionStartNumber + Math.max(sectionQuestions.length - 1, 0);
                    const answeredInSection = sectionQuestions.reduce((count, _question, index) => {
                      const key = `l_${sectionStartNumber - 1 + index}`;
                      return answers[key]?.trim() ? count + 1 : count;
                    }, 0);
                    return (
                    <div
                      key={sec.sectionNumber}
                      id={`listening-section-${sec.sectionNumber}`}
                      className={`exam-section-grid relative min-h-[calc(100vh-11rem)] gap-5 scroll-mt-28 lg:grid-cols-[260px_minmax(420px,1fr)] lg:items-start ${listeningSectionIndex === activeListeningSection ? 'grid' : 'hidden'}`}
                    >
                      <Card className="exam-section-brief sticky top-[76px] z-30 self-start lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto animate-in fade-in duration-500">
                        <CardContent className="space-y-4 p-4 sm:p-5">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="h-1 w-10 flex-shrink-0 bg-violet-500 rounded-full" />
                            <h4 className="truncate font-black text-violet-600 uppercase tracking-widest text-sm">{displayText(sec.title, `Part ${sec.sectionNumber}`)}</h4>
                          </div>
                          <Badge variant="outline" className="rounded-full">{answeredInSection}/{sectionQuestions.length}</Badge>
                        </div>
                        <div className="rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-violet-500">Audio scope</p>
                          <p className="mt-1 text-sm font-black text-violet-950">
                            Questions {sectionStartNumber}-{sectionEndNumber}
                          </p>
                        </div>
                        {/* Per-section audio — prefers real MP3, falls back to TTS.
                            Show whenever section has its own audio/transcript and there is no single global audio. */}
                        {hasAudio && !globalAudioUrl && (
                          <Button
                            type="button"
                            size="sm"
                            disabled={wasPlayed && !isPlayingThis}
                            className={`w-full rounded-xl font-black ${
                              wasPlayed && !isPlayingThis ? 'bg-violet-200 text-violet-400' :
                              isPlayingThis ? 'bg-amber-500 text-white' :
                              'bg-violet-600 text-white hover:bg-violet-700 shadow-lg'
                            }`}
                            onClick={() => sectionUrl
                              ? playRealAudio(sectionAudioId, sectionUrl, sectionTranscript)
                              : toggleAudio(sectionAudioId, sectionTranscript)
                            }
                          >
                            {isPlayingThis
                              ? <><Volume2 className="h-4 w-4 mr-1.5 animate-pulse" /> PLAYING</>
                              : wasPlayed
                              ? <><Volume2 className="h-4 w-4 mr-1.5 opacity-50" /> PLAYED</>
                              : <><Play className="h-4 w-4 mr-1.5" /> PLAY SECTION AUDIO</>
                            }
                          </Button>
                        )}
                      </div>
                      {sectionPlaybackStatus?.message && (
                        <p className={`text-xs font-bold ${
                          sectionPlaybackStatus.status === 'error' ? 'text-red-600' :
                          sectionPlaybackStatus.status === 'fallback' ? 'text-amber-600' :
                          sectionPlaybackStatus.status === 'ended' ? 'text-emerald-600' : 'text-violet-600'
                        }`}>
                          {displayText(sectionPlaybackStatus.message)}
                        </p>
                      )}
                      {sectionPlaybackStatus?.controlsUrl && sectionPlaybackStatus.status !== 'ended' && (
                        <div>
                          <audio
                            src={sectionPlaybackStatus.controlsUrl}
                            controls
                            preload="metadata"
                            playsInline
                            onPlay={() => setPlayedAudios(prev => new Set(prev).add(sectionAudioId))}
                            className="w-full"
                          />
                        </div>
                      )}
                      <div className="exam-local-question-grid grid grid-cols-5 gap-1">
                        {sectionQuestions.map((_question, index) => {
                          const number = sectionStartNumber + index;
                          const key = `l_${number - 1}`;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => document.getElementById(key)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                              className={`h-8 rounded-lg text-xs font-black transition-all ${
                                answers[key]?.trim() ? 'bg-violet-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-violet-50 hover:text-violet-700'
                              }`}
                            >
                              {number}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-2 border-t border-[#c7cbd8] pt-4">
                        <Button type="button" variant="outline" disabled={listeningSectionIndex === 0}
                          onClick={() => { setActiveListeningSection(Math.max(0, listeningSectionIndex - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="flex-1 rounded-none border-[#182644] text-[#182644]">Previous</Button>
                        <Button type="button" disabled={listeningSectionIndex === sections.length - 1}
                          onClick={() => { setActiveListeningSection(Math.min(sections.length - 1, listeningSectionIndex + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="flex-1 rounded-none bg-[#182644] text-white">Next section</Button>
                      </div>
                        </CardContent>
                      </Card>
                      <Card className="exam-question-sheet overflow-hidden animate-in fade-in duration-500">
                      <CardContent className="p-4 sm:p-8 space-y-6">
                        {Array.isArray(sec.questions) && sec.questions.map((q) => {
                          const key = `l_${qIdx++}`;
                          return (
                            <div key={key} id={key} className="exam-question-card scroll-mt-28 p-5 sm:p-6 transition-colors duration-200">
                              <div className="flex items-start gap-4 mb-5">
                                <span className="exam-question-number w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">{qIdx}</span>
                                <p className="font-bold text-base sm:text-lg pt-1.5 leading-relaxed text-slate-800 flex-1">{displayText(q.questionText, `Question ${qIdx}`)}</p>
                                <button type="button" onClick={() => toggleFlag(key)} className={`flex-shrink-0 p-2 rounded-xl transition-all ${flaggedQuestions[key] ? 'bg-amber-100 text-amber-600 shadow-inner' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`} title={flaggedQuestions[key] ? "Remove Flag" : "Flag for review"}>
                                  <Flag className={`h-5 w-5 ${flaggedQuestions[key] ? 'fill-current' : ''}`} />
                                </button>
                              </div>
                              {q.tableData ? (
                                <div className="overflow-x-auto border-2 border-slate-100 rounded-2xl my-4 bg-white overflow-hidden shadow-inner">
                                  <table className="w-full text-sm text-left">
                                    {q.tableData.headers && <thead className="bg-slate-800 text-white font-black uppercase text-[10px] tracking-widest"><tr>{q.tableData.headers.map((h: any, i: number) => <th key={i} className="px-5 py-4">{displayText(h, `Column ${i + 1}`)}</th>)}</tr></thead>}
                                    <tbody>
                                      {q.tableData.rows.map((row: any, ri: number) => (
                                        <tr key={ri} className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                                          {(Array.isArray(row) ? row : row.cells || []).map((cell: any, ci: number) => (
                                            <td key={ci} className="px-5 py-4 align-middle font-bold text-slate-600">
                                              {cell.type === 'text' ? (<span>{displayText(cell.value)}</span>) : (
                                                <input type="text" placeholder="..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                                  className="w-full bg-slate-100 border-2 border-transparent rounded-2xl px-4 py-3 focus:ring-8 focus:ring-violet-400/20 focus:border-violet-400 focus:bg-white transition-all outline-none font-black text-slate-800" />
                                              )}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : q.options && q.options.length > 0 ? (
                                <div className="space-y-3 mt-4">
                                  {q.options.map((opt, optionIndex) => {
                                    const optionText = displayText(opt, `Option ${optionIndex + 1}`);
                                    return (
                                    <label key={`${key}-${optionIndex}-${optionText}`} className={`flex min-h-[56px] items-center gap-4 p-4 rounded-[20px] border-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${answers[key] === optionText ? 'border-violet-500 bg-violet-600 text-white shadow-lg scale-[1.01]' : 'border-slate-100 bg-slate-50 hover:border-violet-300 hover:bg-white'}`}>
                                      <input type="radio" name={key} value={optionText} checked={answers[key] === optionText} onChange={() => setAnswers(prev => ({ ...prev, [key]: optionText }))} className="hidden" />
                                      <div className={`w-6 h-6 rounded-full border-2 flex flex-shrink-0 items-center justify-center transition-all ${answers[key] === optionText ? 'bg-white border-white' : 'border-slate-300 bg-white'}`}>{answers[key] === optionText && <div className="w-2.5 h-2.5 bg-violet-600 rounded-full" />}</div>
                                      <span className="text-sm sm:text-base font-bold leading-snug">{optionText}</span>
                                    </label>
                                  );})}
                                </div>
                              ) : (
                                <input type="text" placeholder="Type your answer..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                  className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-black focus:outline-none focus:ring-8 focus:ring-violet-400/10 focus:border-violet-400 transition-all" />
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
              const paperPassages = (Array.isArray(td?.passages) ? td.passages : (td?.passage ? [td.passage] : [])) as ReadingPaperPassage[];
              return (
                <FullMockReadingPaper
                  passages={paperPassages}
                  answers={answers}
                  activePassage={activeReadingPassage}
                  setActivePassage={setActiveReadingPassage}
                  setAnswer={(key, value) => setAnswers(previous => ({ ...previous, [key]: value }))}
                  flaggedQuestions={flaggedQuestions}
                  toggleFlag={toggleFlag}
                  timeDisplay={formatTime(remaining)}
                  timeWarning={remaining < 300}
                  savedIndicator={isSavedIndicator}
                  onSubmit={() => submitSection()}
                />
              );
            })()}

            {phase === 'reading' && legacyReadingEnabled && (() => {
              const passages = Array.isArray(td?.passages) ? td.passages : (td?.passage ? [td.passage] : []);
              let qIdx = 0;
              return (
                <div className="exam-reading space-y-8">
                  {passages.map((passage: any, pi: number) => (
                    <div
                      key={pi}
                      id={`reading-passage-${pi + 1}`}
                      data-reading-passage-index={pi}
                      className={`space-y-6 scroll-mt-28 ${pi === activeReadingPassage ? 'block' : 'hidden'}`}
                    >
                      <div className="flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                        <div className="h-1.5 w-16 bg-blue-500 rounded-full" />
                        <h4 className="font-black text-blue-600 uppercase tracking-[0.2em] text-sm">Passage {pi + 1}</h4>
                        </div>
                        <div className="flex rounded-2xl border-2 border-blue-100 bg-blue-50 p-1 lg:hidden">
                          {(['passage', 'questions'] as const).map(view => (
                            <button
                              key={view}
                              type="button"
                              onClick={() => setReadingMobileView(view)}
                              className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                                readingMobileView === view ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-700'
                              }`}
                            >
                              {view}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-start">
                        <Card className={`exam-reading-passage lg:sticky lg:top-24 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto ${readingMobileView === 'questions' ? 'hidden lg:block' : ''} animate-in fade-in duration-500`}>
                          <div className="bg-slate-50 p-6 sm:p-8 border-b border-slate-100">
                            <h2 className="text-2xl font-black mb-5 flex items-center gap-3 text-slate-800">
                              <BookOpen className="h-7 w-7 text-blue-500 flex-shrink-0" />
                              {displayText(passage.title, `Passage ${pi + 1}`)}
                            </h2>
                            <div className="prose prose-base max-w-none text-slate-600 leading-[1.85] font-medium whitespace-pre-line" dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayText(passage.textContent)) }} />
                          </div>
                        </Card>
                        <Card className={`exam-reading-questions lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto ${readingMobileView === 'passage' ? 'hidden lg:block' : ''} animate-in fade-in duration-500`}>
                          <CardContent className="p-0">
                           <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
                             <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-500">Passage {pi + 1}</p>
                             <div className="mt-1 flex items-center justify-between gap-4">
                               <h3 className="text-lg font-black uppercase tracking-widest text-slate-500">Questions {readingPassageNav[pi]?.range}</h3>
                               <Badge className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                                 {readingPassageNav[pi]?.answered ?? 0}/{readingPassageNav[pi]?.total ?? 0}
                               </Badge>
                             </div>
                           </div>
                           <div className="space-y-8 p-6 sm:p-8">
                           {Array.isArray(passage.questions) && passage.questions.map((q: any) => {
                             const key = `r_${qIdx++}`;
                             return (
                               <div key={key} id={key} className="exam-question-card p-5 sm:p-6 transition-colors duration-200 scroll-mt-28">
                                 <div className="flex items-start gap-4 mb-5">
                                   <span className="exam-question-number w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">{qIdx}</span>
                                   <p className="font-bold text-base sm:text-lg pt-1.5 leading-relaxed text-slate-800 flex-1">{displayText(q.questionText, `Question ${qIdx}`)}</p>
                                   <button type="button" onClick={() => toggleFlag(key)} className={`flex-shrink-0 p-2 rounded-xl transition-all ${flaggedQuestions[key] ? 'bg-amber-100 text-amber-600 shadow-inner' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`} title={flaggedQuestions[key] ? "Remove Flag" : "Flag for review"}>
                                     <Flag className={`h-5 w-5 ${flaggedQuestions[key] ? 'fill-current' : ''}`} />
                                   </button>
                                 </div>
                                 {q.tableData ? (
                                   <div className="overflow-x-auto border-2 border-slate-100 rounded-[24px] my-4 bg-white overflow-hidden shadow-inner">
                                     <table className="w-full text-sm text-left">
                                       {q.tableData.headers && <thead className="bg-slate-800 text-white font-black uppercase text-[10px] tracking-widest"><tr>{q.tableData.headers.map((h: any, i: number) => <th key={i} className="px-5 py-4">{displayText(h, `Column ${i + 1}`)}</th>)}</tr></thead>}
                                       <tbody>
                                         {q.tableData.rows.map((row: any, ri: number) => (
                                           <tr key={ri} className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                                             {(Array.isArray(row) ? row : row.cells || []).map((cell: any, ci: number) => (
                                               <td key={ci} className="px-5 py-4 align-middle font-bold text-slate-600">
                                                 {cell.type === 'text' ? (<span>{displayText(cell.value)}</span>) : (
                                                   <input type="text" placeholder="..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                                     className="w-full bg-slate-100 border-2 border-transparent rounded-2xl px-4 py-3 focus:ring-8 focus:ring-blue-400/20 focus:border-blue-400 focus:bg-white transition-all outline-none font-black text-slate-800" />
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
                                     {q.options.map((opt: any, optionIndex: number) => {
                                       const optionText = displayText(opt, `Option ${optionIndex + 1}`);
                                       return (
                                       <label key={`${key}-${optionIndex}-${optionText}`} className={`flex min-h-[56px] items-center gap-4 p-5 rounded-[20px] border-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${answers[key] === optionText ? 'border-blue-500 bg-blue-600 text-white shadow-2xl scale-[1.01]' : 'border-slate-100 bg-slate-50 hover:border-blue-300 hover:bg-white'}`}>
                                         <input type="radio" name={key} value={optionText} checked={answers[key] === optionText} onChange={() => setAnswers(prev => ({ ...prev, [key]: optionText }))} className="hidden" />
                                         <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${answers[key] === optionText ? 'bg-white border-white shadow-inner' : 'border-slate-300 bg-white'}`}>{answers[key] === optionText && <div className="w-3 h-3 bg-blue-600 rounded-full" />}</div>
                                         <span className="text-sm sm:text-base font-bold leading-snug">{optionText}</span>
                                       </label>
                                     );})}
                                   </div>
                                 ) : (
                                   <input type="text" placeholder="Type your answer here..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                     className="w-full bg-slate-50 border-2 border-slate-200 rounded-[24px] px-6 py-5 font-black text-lg focus:outline-none focus:ring-8 focus:ring-blue-400/20 focus:border-blue-400 focus:bg-white transition-all duration-300 text-slate-800 shadow-sm" />
                                 )}
                               </div>
                             );
                           })}
                           </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="flex justify-between gap-3 border-t border-[#c7cbd8] pt-4">
                        <Button type="button" variant="outline" disabled={pi === 0} onClick={() => setActiveReadingPassage(Math.max(0, pi - 1))} className="rounded-none border-[#182644]">Previous passage</Button>
                        <Button type="button" disabled={pi === passages.length - 1} onClick={() => setActiveReadingPassage(Math.min(passages.length - 1, pi + 1))} className="rounded-none bg-[#182644] text-white">Next passage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {phase === 'writing' && (() => {
              const writingData = normalizeWritingTestFromDb(td);
              const writingTask1 = findWritingTask1(writingData);
              const writingTask2 = writingData.tasks?.find(
                task => task.taskType === 'task2' || (task as Record<string, unknown>).task_type === 'task2' || task.taskNumber === 2,
              ) ?? writingData.tasks?.[1];
              return <FullMockWritingPaper
                task1={writingTask1 as WritingTask | undefined}
                task2={writingTask2 as WritingTask | undefined}
                answers={answers}
                setAnswer={(key, value) => setAnswers(previous => ({ ...previous, [key]: value }))}
                timeDisplay={formatTime(remaining)}
                timeWarning={remaining < 300}
                savedIndicator={isSavedIndicator}
                pauseTimer={pauseTimer}
                startTimer={startTimer}
                onSubmit={() => submitSection()}
              />;
            })()}

            {phase === 'writing' && legacyWritingEnabled && (() => {
              const wData = normalizeWritingTestFromDb(td);
              const task1 = findWritingTask1(wData);
              const task2 =
                wData.tasks?.find(
                  (t) =>
                    t.taskType === 'task2' ||
                    (t as Record<string, unknown>).task_type === 'task2' ||
                    t.taskNumber === 2
                ) ?? wData.tasks?.[1];
              const t1Visual =
                task1 &&
                (task1.imageUrl ||
                  task1.chartData ||
                  task1.tableData ||
                  task1.processData ||
                  task1.mapData);
              const task1Title = displayText(task1?.title, 'Report / Letter (min. 150 words)').replace(/^Task\s*1\s*[:—-]\s*/i, '');
              const task2Title = displayText(task2?.title, 'Essay (min. 250 words)').replace(/^Task\s*2\s*[:—-]\s*/i, '');
              return (
                <div className="exam-writing space-y-8">
                   <div className="exam-module-banner flex items-center gap-4 px-5 py-4 sm:px-6"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d98e2b]"><PenTool className="h-5 w-5" /></div><div><h2 className="font-serif text-xl font-semibold leading-tight">Writing Assessment</h2><p className="text-xs text-[#3c4a6b] font-medium">Complete both tasks. Word count is tracked automatically.</p></div></div>
                  {/* Task 1 */}
                  <Card className="exam-writing-task overflow-hidden animate-in fade-in duration-500">
                    <CardHeader className="bg-emerald-50/80 backdrop-blur p-6 sm:p-8 lg:p-10 border-b border-emerald-100/50">
                      <CardTitle className="text-xl lg:text-2xl font-black text-emerald-900">Task 1 — {task1Title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                      <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.95fr)_minmax(360px,1.05fr)] xl:grid-cols-[minmax(360px,0.95fr)_minmax(520px,1.05fr)] 2xl:grid-cols-[minmax(420px,0.9fr)_minmax(620px,1.1fr)] lg:items-start">
                        <div className="space-y-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-12rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:rounded-[28px] lg:pb-3 lg:pr-3 [scrollbar-gutter:stable]">
                      {/* Task prompt */}
                      <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-6 text-base font-medium text-emerald-900/80 leading-relaxed">
                        {task1?.prompt
                          ? <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayText(task1.prompt)) }} />
                          : <><p className="font-black mb-2">Describe the visual information below:</p><p>The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p><p className="mt-3 text-sm text-emerald-700 font-bold">Write at least 150 words. Spend about 20 minutes on this task.</p></>
                        }
                      </div>

                      {/* Task 1: chart / table / process / map / image URL */}
                      {t1Visual && task1 ? (
                        <div className="rounded-3xl overflow-hidden border-2 border-emerald-200 bg-white shadow-xl">
                          <div className="bg-emerald-700 text-white px-6 py-3 flex items-center gap-2">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            <span className="font-black uppercase tracking-widest text-sm">Task 1 visual</span>
                          </div>
                          <div className="p-4 bg-slate-50">
                            <WritingTask1Renderer task={task1 as WritingTask} />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-amber-800">
                          <AlertCircle className="h-6 w-6 flex-shrink-0 text-amber-500" />
                          <div>
                            <p className="font-black text-sm">No Task 1 visual provided</p>
                            <p className="text-xs text-amber-700 mt-0.5">Add a table, chart, or image for Task 1 in Admin → Manage Mock Tests.</p>
                          </div>
                        </div>
                      )}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-4 px-2">
                            <p className="text-sm font-black uppercase tracking-widest text-emerald-500">Task 1 Response</p>
                            <Badge className={`px-5 py-2 rounded-full font-black text-white shadow-md transition-colors duration-500 ${(answers['w_task1'] ?? '').split(/\s+/).filter(Boolean).length >= 150 ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-amber-500 shadow-amber-500/30'}`}>{(answers['w_task1'] ?? '').split(/\s+/).filter(Boolean).length} / 150 Words</Badge>
                          </div>
                      <Textarea placeholder="Begin typing your Task 1 response here... (min. 150 words)" className="min-h-[440px] lg:min-h-[560px] xl:min-h-[calc(100vh-22rem)] rounded-[26px] lg:rounded-[30px] border-2 border-emerald-100 bg-emerald-50/30 p-6 sm:p-8 text-base sm:text-lg font-medium leading-[1.85] text-slate-700 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white shadow-inner transition-all duration-300"
                        value={answers['w_task1'] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, w_task1: e.target.value }))} />
                          <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-black uppercase tracking-widest text-emerald-500">
                            <span>{answers['w_task1'] ? 'Task 1 response saved' : 'Task 1 response not started'}</span>
                            <span className={(answers['w_task1'] ?? '').split(/\s+/).filter(Boolean).length >= 150 ? 'text-emerald-600' : 'text-amber-600'}>
                              Minimum 150 words
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Task 2 */}
                  <Card className="exam-writing-task overflow-hidden animate-in fade-in duration-500">
                    <CardHeader className="bg-emerald-50/80 backdrop-blur p-6 sm:p-8 lg:p-10 border-b border-emerald-100/50">
                      <CardTitle className="text-xl lg:text-2xl font-black text-emerald-900">Task 2 — {task2Title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                      <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.95fr)_minmax(360px,1.05fr)] xl:grid-cols-[minmax(360px,0.95fr)_minmax(520px,1.05fr)] 2xl:grid-cols-[minmax(420px,0.9fr)_minmax(620px,1.1fr)] lg:items-start">
                        <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-12rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:rounded-[28px] lg:pb-3 lg:pr-3 [scrollbar-gutter:stable]">
                      <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-6 text-base font-medium text-emerald-900/80 leading-relaxed">
                        {task2?.prompt
                          ? <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayText(task2.prompt)) }} />
                          : <><p className="font-black mb-2">Write an essay in response to the argument below:</p><p>Some people believe that university education should be free for all students, while others argue that students should pay for their own tuition. Discuss both views and give your own opinion.</p><p className="mt-3 text-sm text-emerald-700 font-bold">Write at least 250 words. Spend about 40 minutes on this task.</p></>
                        }
                      </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-4 px-2">
                            <p className="text-sm font-black uppercase tracking-widest text-emerald-500">Task 2 Response</p>
                            <Badge className={`px-5 py-2 rounded-full font-black text-white shadow-md transition-colors duration-500 ${(answers['w_task2'] ?? '').split(/\s+/).filter(Boolean).length >= 250 ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-amber-500 shadow-amber-500/30'}`}>{(answers['w_task2'] ?? '').split(/\s+/).filter(Boolean).length} / 250 Words</Badge>
                          </div>
                      <Textarea placeholder="Begin typing your Task 2 essay here... (min. 250 words)" className="min-h-[520px] lg:min-h-[700px] xl:min-h-[calc(100vh-18rem)] rounded-[26px] lg:rounded-[30px] border-2 border-emerald-100 bg-emerald-50/30 p-6 sm:p-8 text-base sm:text-lg font-medium leading-[1.85] text-slate-700 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white shadow-inner transition-all duration-300"
                        value={answers['w_task2'] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, w_task2: e.target.value }))} />
                          <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-black uppercase tracking-widest text-emerald-500">
                            <span>{answers['w_task2'] ? 'Task 2 response saved' : 'Task 2 response not started'}</span>
                            <span className={(answers['w_task2'] ?? '').split(/\s+/).filter(Boolean).length >= 250 ? 'text-emerald-600' : 'text-amber-600'}>
                              Minimum 250 words
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}


            {phase === 'speaking' && (() => {
              const speakingParts = (Array.isArray(td?.parts) ? td.parts : []) as SpeakingPaperPart[];
              return <FullMockSpeakingPaper
                parts={speakingParts}
                typedResponse={answers.sp_answers ?? ''}
                setTypedResponse={(value) => setAnswers(previous => ({ ...previous, sp_answers: value }))}
                clips={recordedClips}
                isRecording={isRecording}
                recordingSeconds={recordingSeconds}
                recordingError={recordingError}
                timeDisplay={formatTime(remaining)}
                timeWarning={remaining < 120}
                savedIndicator={isSavedIndicator}
                startRecording={startRecording}
                stopRecording={stopRecording}
                deleteClip={deleteClip}
                onSubmit={() => submitSection()}
              />;
            })()}

            {phase === 'speaking' && legacySpeakingEnabled && (() => {
              // Speaking data may be stored as parts[] or part1/part2/part3 directly
              const parts = (td?.parts as Array<{ title: string; partType?: string;
                questions?: Array<{ text: string }>;
                cueCard?: { topic: string; bulletPoints: string[] };
              }>) ?? [];

              // Build display parts — handle both formats
              const displayParts: Array<{ label: string; questions: string[] }> = parts.length > 0
                ? parts.map(p => ({
                    label: displayText(p.title, 'Speaking Part'),
                    questions: p.cueCard
                      ? [`Cue Card: ${displayText(p.cueCard.topic, 'Cue card')}\n\u2022 ${(Array.isArray(p.cueCard.bulletPoints) ? p.cueCard.bulletPoints : []).map(point => displayText(point)).filter(Boolean).join('\n\u2022 ')}`]
                      : (p.questions ?? []).map(q => displayText(q.text)).filter(Boolean)
                  }))
                : [
                    { label: 'Part 1 — Introduction & Interview', questions: ['Tell me about yourself.', 'What do you do in your free time?'] },
                    { label: 'Part 2 — Individual Long Turn', questions: ['You will be given a cue card with a topic. Speak for 1–2 minutes.'] },
                    { label: 'Part 3 — Two-way Discussion', questions: ['Follow-up questions related to your Part 2 topic will be asked.'] }
                  ];

              return (
                <div className="exam-speaking space-y-8">
                  {/* Header */}
                  <div className="exam-module-banner p-6 sm:p-8 flex items-center gap-5 relative overflow-hidden animate-in fade-in duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <div className={`p-4 bg-white/20 rounded-[25px] relative z-10 ${isRecording ? 'animate-pulse' : ''}`}><Mic className="h-10 w-10" /></div>
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
                        {/* Waveform animation (Upgraded CSS-only) */}
                        <div className="hidden sm:flex items-center gap-1.5 h-10 px-4">
                          {Array.from({length: 20}).map((_, i) => {
                            // Deterministic pseudo-randomness based on index for fluid visuals
                            const h = 16 + Math.sin(i * 1.3) * 10 + Math.cos(i * 0.7) * 6;
                            const delay = (i * 0.1).toFixed(2);
                            const duration = (0.6 + (i % 4) * 0.15).toFixed(2);
                            return (
                              <div key={i}
                                className="w-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                                style={{ 
                                  height: `${h}px`, 
                                  animationDelay: `${delay}s`,
                                  animationDuration: `${duration}s`
                                }}
                              />
                            );
                          })}
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
                    <Card key={pi} className="exam-speaking-part overflow-hidden animate-in fade-in duration-500">
                      <CardHeader className="bg-orange-50/80 backdrop-blur px-8 sm:px-10 py-6 sm:py-7 border-b border-orange-100/50 flex flex-row items-center justify-between gap-4">
                        <CardTitle className="text-xl font-black text-orange-900">{displayText(part.label, `Part ${pi + 1}`)}</CardTitle>
                        <Button
                          type="button"
                          disabled={isRecording}
                          onClick={() => !isRecording && startRecording(part.label)}
                          className={`rounded-2xl font-black px-6 gap-2 flex-shrink-0 transition-all duration-300 ${
                            isRecording
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-70'
                              : 'bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5 text-white shadow-lg shadow-orange-500/30'
                          }`}
                        >
                          <Mic className={`h-4 w-4 ${isRecording ? 'opacity-50' : ''}`} />
                          {isRecording ? 'Recording...' : 'Record Response'}
                        </Button>
                      </CardHeader>
                      <CardContent className="p-6 sm:p-10 space-y-5">
                        {part.questions.map((q, qi) => (
                          <div key={qi} className="bg-orange-50/40 border border-orange-100/50 rounded-[24px] p-6 sm:p-8 text-lg font-bold text-slate-800 leading-[1.8] whitespace-pre-line shadow-sm hover:shadow-md hover:bg-white transition-all duration-300">
                            {displayText(q, `Question ${qi + 1}`)}
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
                          <div key={clip.id} className="flex flex-col gap-4 p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 hover:border-orange-200 transition-colors sm:flex-row sm:items-center">
                            <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <span className="font-black text-orange-600 text-sm">{ci + 1}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-sm text-slate-800 truncate">{clip.label}</p>
                              <p className="text-xs text-slate-400 font-bold">
                                {formatRecordingTime(clip.duration)} &bull; {(clip.size / 1024).toFixed(0)} KB &bull; {
                                  clip.uploadStatus === 'uploaded' ? 'Uploaded' :
                                  clip.uploadStatus === 'uploading' ? 'Uploading...' :
                                  clip.uploadStatus === 'error' ? 'Upload failed, local only' : 'Local'
                                }
                              </p>
                              <audio
                                src={clip.url}
                                controls
                                className="w-full h-9 mt-2"
                                style={{ minWidth: '180px' }}
                              />
                              {clip.transcript && (
                                <p className="mt-3 rounded-2xl bg-white p-3 text-xs font-medium text-slate-600">
                                  {clip.transcript}
                                </p>
                              )}
                              {clip.transcriptStatus === 'error' && (
                                <p className="mt-2 text-xs font-bold text-red-500">{clip.transcriptError}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={clip.transcriptStatus === 'transcribing'}
                                onClick={() => transcribeSpeakingClip(clip).catch(() => undefined)}
                                className="rounded-2xl font-black"
                              >
                                {clip.transcriptStatus === 'transcribing'
                                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Transcribing</>
                                  : clip.transcript
                                  ? 'Transcript Ready'
                                  : 'Transcribe'}
                              </Button>
                              <button
                                type="button"
                                onClick={() => deleteClip(clip.id)}
                                className="p-2.5 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
                                title="Delete clip"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
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
        <div className="exam-answer-sheet fixed bottom-0 left-0 right-0 p-3 z-50 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          {phase === 'reading' && readingPassageNav.length > 0 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-1 lg:max-w-[360px]">
              {readingPassageNav.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToPassage(item)}
                  className={`flex-shrink-0 rounded-2xl border-2 px-4 py-2 text-left font-black transition-all ${
                    activeReadingPassage === item.index
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                      : 'border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  <span className="block text-xs uppercase tracking-widest">{item.label}</span>
                  <span className={`block text-[11px] ${activeReadingPassage === item.index ? 'text-blue-100' : 'text-blue-500'}`}>
                    {item.range} | {item.answered}/{item.total}
                  </span>
                </button>
              ))}
            </div>
          )}
          <div className="exam-omr flex-1 overflow-x-auto no-scrollbar">
            {phase === 'listening' && <h2 className="exam-omr-title">Answer sheet</h2>}
            {phase === 'listening' ? (
              <div className="exam-omr-groups">
                {Array.from({ length: 4 }, (_unused, sectionNumber) => {
                  const sectionKeys = navKeys.slice(sectionNumber * 10, sectionNumber * 10 + 10);
                  return (
                    <section key={sectionNumber} className="exam-omr-group">
                      <div className="exam-omr-group-label"><span>Section {sectionNumber + 1}</span><span>{sectionNumber * 10 + 1}–{sectionNumber * 10 + sectionKeys.length}</span></div>
                      <div className="exam-omr-grid">
                        {sectionKeys.map((key, offset) => {
                          const number = sectionNumber * 10 + offset + 1;
                          return (
                            <button key={key} onClick={() => scrollToQuestion(key)} aria-label={`Go to question ${number}`}
                              className={`exam-answer-bubble relative h-9 w-9 flex items-center justify-center font-semibold text-xs transition-all active:scale-90 ${activeListeningSection === sectionNumber ? 'current-section' : ''} ${flaggedQuestions[key] ? 'flagged' : answers[key] ? 'answered' : ''}`}>
                              {number}
                              {flaggedQuestions[key] && <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#d98e2b] border border-white" />}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-3 min-w-max px-4">
                {navKeys.map((key, i) => (
                  <button key={key} onClick={() => scrollToQuestion(key)} aria-label={`Go to question ${i + 1}`}
                    className={`exam-answer-bubble relative h-10 w-10 flex items-center justify-center font-semibold text-xs transition-all active:scale-90 ${flaggedQuestions[key] ? 'flagged' : answers[key] ? 'answered' : ''}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-shrink-0 flex items-center gap-4 lg:pl-6">
             <div className="text-sm font-black uppercase tracking-widest text-slate-400 hidden xl:block">
               <span className="text-slate-800">{navKeys.filter(k => !!answers[k]).length}</span> / {navKeys.length} Completed
             </div>
             <Button size="lg" variant="outline" onClick={() => submitSection()} className="border-4 border-slate-800 text-slate-800 font-black rounded-2xl px-5 py-5 hover:bg-slate-800 hover:text-white transition-all shadow-xl sm:px-7">
               SUBMIT SECTION <ChevronRight className="h-6 w-6 ml-2" />
             </Button>
          </div>
        </div>
      )}

      {navKeys.length === 0 && test && !objectiveSectionMissingQuestions && phase !== 'writing' && phase !== 'speaking' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-border p-3 sm:p-4 shadow-[0_-10px_50px_rgba(0,0,0,0.1)] z-50 flex justify-center lg:justify-end">
          <Button size="lg" onClick={() => submitSection()}
            className={`w-full max-w-[420px] ${currentSection.bg} text-white hover:opacity-90 font-black text-base sm:text-lg py-6 rounded-2xl shadow-xl active:scale-95 transition-all lg:w-auto lg:px-8`}>
            {sectionIndex < SECTIONS.length - 1 ? (
              <><CheckCircle className="h-5 w-5 mr-3" /> CONTINUE TO NEXT SECTION</>
            ) : (
              <><Award className="h-5 w-5 mr-3" /> FINISH & SEE RESULTS</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

