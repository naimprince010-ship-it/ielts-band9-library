import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Headphones, BookOpen, PenTool, Mic, ChevronRight,
  CheckCircle, AlertCircle, Award, Play, RotateCcw,
  Loader2, Target, Crown, Timer, Check, Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

type Phase = 'intro' | 'listening' | 'reading' | 'writing' | 'speaking' | 'results';
type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking';

export interface TableCell {
  type: 'text' | 'input';
  value?: string; // used if type='text'
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

function bandFromScore(correct: number, total: number): number {
  const pct = total > 0 ? correct / total : 0;
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

// ─── Timer hook ───
function useTimer(initial: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(initial);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setRunning(true);
  }, []);

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

export function FullMockTestPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('intro');
  const [tests, setTests] = useState<Partial<Record<ModuleType, MockTest>>>({});
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [playedAudios, setPlayedAudios] = useState<Set<string>>(new Set());

  // Auto-save: load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('mockTestAnswers_v1');
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved answers');
      }
    }
  }, []);

  // Auto-save: write to local storage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('mockTestAnswers_v1', JSON.stringify(answers));
    }
  }, [answers]);

  // Stop audio when changing phases or unmounting
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingAudioId(null);
  }, [phase]);

  // Async helper: waits for voices to load if not yet available
  const getVoicesAsync = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise(resolve => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) { resolve(voices); return; }
      const handler = () => { resolve(window.speechSynthesis.getVoices()); };
      window.speechSynthesis.addEventListener('voiceschanged', handler, { once: true });
      // Fallback timeout after 2s
      setTimeout(() => resolve(window.speechSynthesis.getVoices()), 2000);
    });
  };

  const toggleAudio = async (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support text-to-speech.');
      return;
    }

    if (playedAudios.has(id)) {
      alert('Audio in the real exam can only be played once.');
      return;
    }

    window.speechSynthesis.cancel();

    if (playingAudioId === id) {
      // Allow stopping (though normally not allowed, we keep it for accessibility if TTS runs amok)
      // Actually strictly No-Stop for real exam feeling, so we don't allow toggle-off if it's playing.
      // But we prevent playing AGAIN once it's ended.
      return;
    }

    setPlayingAudioId(id);
    const utterance = new SpeechSynthesisUtterance(text);

    // Wait for voices to be ready, then pick a UK/US English voice
    const voices = await getVoicesAsync();
    const preferred =
      voices.find(v => v.lang === 'en-GB') ||
      voices.find(v => v.lang.startsWith('en-GB')) ||
      voices.find(v => v.lang.startsWith('en-US')) ||
      voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;
    utterance.rate = 0.92;   // Slightly slower for comprehension
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Mark as played so user can't play it again
    setPlayedAudios(prev => new Set(prev).add(id));

    utterance.onend = () => setPlayingAudioId(null);
    utterance.onerror = () => setPlayingAudioId(null);

    window.speechSynthesis.speak(utterance);
  };
  const [scores, setScores] = useState<SectionScores>({ listening: null, reading: null, writing: null, speaking: null });
  const [sectionIndex, setSectionIndex] = useState(0);

  const currentSection = SECTIONS[sectionIndex];

  // Use refs so handleTimeUp can always call the latest submitSection
  const submitSectionRef = useRef<() => void>(() => {});
  const startTimerRef = useRef<(() => void) | null>(null);
  const resetTimerRef = useRef<((val: number) => void) | null>(null);

  const handleTimeUp = useCallback(() => submitSectionRef.current(), []);
  const { remaining, start: startTimer, reset: resetTimer } = useTimer(
    currentSection?.duration ?? 1800,
    handleTimeUp
  );

  // Keep refs up to date
  useEffect(() => { startTimerRef.current = startTimer; }, [startTimer]);
  useEffect(() => { resetTimerRef.current = resetTimer; }, [resetTimer]);

  // fetch one test per module
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
      } catch (err) {
        console.error('FullMockTestPage fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const startSection = (idx: number) => {
    setSectionIndex(idx);
    setAnswers({});
    setPhase(SECTIONS[idx].phase);
    resetTimerRef.current?.(SECTIONS[idx].duration);
    setTimeout(() => startTimerRef.current?.(), 100);
  };

  const submitSection = useCallback((_timeUp = false) => {
    const sec = SECTIONS[sectionIndex];
    const test = tests[sec.module];
    let band = 5.0;

    if (test) {
      const td = test.test_data as Record<string, unknown>;

      if (sec.module === 'reading') {
        const passages = td.passages as Array<{ questions: Question[] }>;
        const qs = passages?.flatMap(p => p.questions) ?? [];
        const correct = qs.filter((q, i) => (answers[`r_${i}`] ?? '').trim().toLowerCase() === q.correctAnswer.toLowerCase()).length;
        band = bandFromScore(correct, qs.length);
      } else if (sec.module === 'listening') {
        const sections = td.sections as Array<{ questions: Question[] }>;
        const qs = sections?.flatMap(s => s.questions) ?? [];
        const correct = qs.filter((q, i) => (answers[`l_${i}`] ?? '').trim().toLowerCase() === q.correctAnswer.toLowerCase()).length;
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

    setScores(prev => ({ ...prev, [sec.module]: band }));

    const next = sectionIndex + 1;
    if (next < SECTIONS.length) {
      setPhase('intro');
      setSectionIndex(next);
    } else {
      setPhase('results');
    }
  }, [sectionIndex, tests, answers]);

  // Keep submitSectionRef in sync so handleTimeUp always calls latest version
  useEffect(() => { submitSectionRef.current = submitSection; }, [submitSection]);

  // ─── INTRO SCREEN ───────────────────────────────────────────────
  if (phase === 'intro' || loading) {
    const isFirstSection = SECTIONS.every(s => scores[s.module] === null);
    const nextSection = SECTIONS[sectionIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-amber-400 text-amber-900 mb-4 px-4 py-1.5 text-sm font-bold">
              <Crown className="h-4 w-4 mr-1" /> Full IELTS Mock Exam
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Complete Mock Test
            </h1>
            <p className="text-indigo-300 text-lg max-w-xl mx-auto">
              Simulate the real IELTS exam experience — all 4 sections, timed, in sequence.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
            </div>
          ) : (
            <>
              {/* Section Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {SECTIONS.map((s, idx) => {
                  const done = scores[s.module] !== null;
                  const next = idx === sectionIndex;
                  return (
                    <div key={s.phase} className={`rounded-2xl p-5 border transition-all ${done ? 'bg-green-500/20 border-green-400/40' : next ? 'bg-white/10 border-white/30 ring-2 ring-indigo-400' : 'bg-white/5 border-white/10'}`}>
                      <div className={`w-10 h-10 rounded-xl ${done ? 'bg-green-500' : s.bg} flex items-center justify-center mb-3`}>
                        {done ? <Check className="h-5 w-5 text-white" /> : <span className="text-white">{s.icon}</span>}
                      </div>
                      <h3 className="font-bold text-sm mb-1">{s.label}</h3>
                      <p className="text-xs text-indigo-300">{Math.floor(s.duration / 60)} min</p>
                      {done && <p className="text-xs text-green-400 font-bold mt-1">Band {scores[s.module]}</p>}
                      {next && !done && <Badge className="mt-1 bg-indigo-500 text-white text-xs">Next</Badge>}
                    </div>
                  );
                })}
              </div>

              {/* Progress */}
              {!isFirstSection && (
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-indigo-300 mb-2">
                    <span>Progress</span>
                    <span>{SECTIONS.filter(s => scores[s.module] !== null).length} / 4 sections done</span>
                  </div>
                  <Progress value={(SECTIONS.filter(s => scores[s.module] !== null).length / 4) * 100} className="h-2" />
                </div>
              )}

              {/* Info */}
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: <Timer className="h-5 w-5 text-indigo-400" />, label: 'Total Time', value: '2 hrs 45 min' },
                  { icon: <Target className="h-5 w-5 text-indigo-400" />, label: 'Sections', value: '4 modules' },
                  { icon: <Award className="h-5 w-5 text-indigo-400" />, label: 'Result', value: 'Band Score' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                    {item.icon}
                    <div>
                      <p className="text-xs text-indigo-400">{item.label}</p>
                      <p className="font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* No tests warning */}
              {!tests[nextSection.module] && (
                <div className="bg-amber-500/20 border border-amber-400/40 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold text-amber-300">No {nextSection.label} test available</p>
                    <p className="text-amber-400/80">Add tests from Admin → Mock Test Content first.</p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => startSection(sectionIndex)}
                  disabled={!tests[nextSection.module]}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white text-base font-bold px-8 py-6 rounded-2xl shadow-xl shadow-indigo-500/30 gap-2"
                >
                  <Play className="h-5 w-5" />
                  {isFirstSection ? 'Start Full Mock Test' : `Continue: ${nextSection.label} Section`}
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/mock-test')}
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-2xl text-base font-bold">
                  Module Practice Instead
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── RESULTS ────────────────────────────────────────────────────
  if (phase === 'results') {
    const overall = overallBand(scores);
    const bandColor = overall >= 7 ? 'text-green-400' : overall >= 5.5 ? 'text-yellow-400' : 'text-red-400';

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-400/40">
              <Award className="h-12 w-12 text-amber-900" />
            </div>
            <h1 className="text-4xl font-black mb-2">Test Complete!</h1>
            <p className="text-indigo-300">Here's your estimated IELTS band score</p>
          </div>

          {/* Overall Band */}
          <div className="bg-white/10 backdrop-blur rounded-3xl p-10 text-center mb-8 border border-white/20">
            <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mb-2">Overall Band Score</p>
            <p className={`text-8xl font-black ${bandColor} mb-4`}>{overall.toFixed(1)}</p>
            <p className="text-indigo-300">
              {overall >= 8 ? '🌟 Expert User — Excellent!' : overall >= 7 ? '✅ Good User — Great job!' : overall >= 6 ? '📚 Competent User — Keep practicing!' : '💪 Modest User — More practice needed'}
            </p>
          </div>

          {/* Section Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {SECTIONS.map(s => {
              const band = scores[s.module];
              const bc = band && band >= 7 ? 'text-green-400' : band && band >= 5.5 ? 'text-yellow-400' : 'text-red-400';
              return (
                <div key={s.phase} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                      <span className="text-white">{s.icon}</span>
                    </div>
                    <span className="font-bold text-sm">{s.label}</span>
                  </div>
                  <p className={`text-4xl font-black ${bc}`}>{band?.toFixed(1) ?? '—'}</p>
                  <p className="text-xs text-indigo-400 mt-1">Band Score</p>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => { 
                setPhase('intro'); 
                setSectionIndex(0); 
                setScores({ listening: null, reading: null, writing: null, speaking: null }); 
                setAnswers({}); 
                setPlayedAudios(new Set());
                localStorage.removeItem('mockTestAnswers_v1');
              }}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-6 rounded-2xl gap-2">
              <RotateCcw className="h-5 w-5" /> Retake Test
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/mock-test')}
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-2xl font-bold">
              Module Practice
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

  // Extract question keys for bottom navigation
  let navKeys: string[] = [];
  const TOTAL_QUESTIONS_TARGET = 40;

  if (phase === 'listening') {
    const sections = (td?.sections as Array<{questions: any[]}>) ?? [];
    let i = 0;
    sections.forEach(s => {
      if (Array.isArray(s.questions)) s.questions.forEach(() => navKeys.push(`l_${i++}`));
    });
  } else if (phase === 'reading') {
    const passages = (td?.passages as Array<{questions: any[]}>) ?? (td?.passage ? [td.passage] : []);
    let i = 0;
    passages.forEach(p => {
      if (Array.isArray(p.questions)) p.questions.forEach(() => navKeys.push(`r_${i++}`));
    });
  }

  const scrollToQuestion = (key: string) => {
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-indigo-400', 'rounded-lg', 'transition-all', 'duration-500');
      setTimeout(() => el.classList.remove('ring-2', 'ring-indigo-400'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-foreground text-white px-4 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${currentSection.bg} rounded-lg flex items-center justify-center`}>
            {currentSection.icon}
          </div>
          <div>
            <p className="text-xs text-white/60 font-medium">Section {sectionIndex + 1} of 4</p>
            <p className="font-bold text-sm">{currentSection.label} Test</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Section steps */}
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((_s, i) => (
              <div key={i} className={`flex items-center gap-1`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < sectionIndex ? 'bg-green-500 text-white' : i === sectionIndex ? 'bg-white text-foreground' : 'bg-white/20 text-white/60'}`}>
                  {i < sectionIndex ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                {i < 3 && <div className={`w-8 h-0.5 ${i < sectionIndex ? 'bg-green-500' : 'bg-white/20'}`} />}
              </div>
            ))}
          </div>
          <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeColor}`}>
            <Clock className="h-4 w-4" />
            {formatTime(remaining)}
          </div>
        </div>
        
        {/* We moved the Submit button to the bottom nav or kept it here, but removing it from top right to rely on bottom nav */}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!test ? (
          <Card className="border-dashed border-2 mt-8">
            <CardContent className="py-16 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No {currentSection.label} Test Available</h3>
              <p className="text-muted-foreground mb-6">Add a test from Admin → Mock Test Content first.</p>
              <Button onClick={() => submitSection()}>Skip to Next Section</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* ─── LISTENING ─── */}
            {phase === 'listening' && (() => {
              const sections = (td?.sections as Array<{ sectionNumber: number; title: string; questions: Question[], transcript?: string }>) ?? [];
              const globalTranscript = typeof td?.transcript === 'string' ? td.transcript : '';
              let qIdx = 0;
              return (
                <div className="space-y-6">
                  <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-violet-600" />
                    <div>
                      <p className="font-semibold text-violet-800">Listening Section</p>
                      <p className="text-sm text-violet-600">In a real exam you'd hear audio. Read the transcript below and answer the questions.</p>
                    </div>
                  </div>
                  {globalTranscript && (
                    <Card className="border-violet-200 shadow-sm"><CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold flex items-center gap-2"><Headphones className="h-5 w-5 text-violet-600" /> Audio Transcript</h3>
                        <Button 
                          size="sm" 
                          disabled={playedAudios.has('global') && playingAudioId !== 'global'}
                          className={(playedAudios.has('global') && playingAudioId !== 'global') ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700'}
                          onClick={() => toggleAudio('global', globalTranscript)}
                        >
                          {playingAudioId === 'global' ? <><Volume2 className="h-4 w-4 mr-2 animate-pulse" /> Playing Audio...</> : <><Play className="h-4 w-4 mr-2" /> Play Audio (Once)</>}
                        </Button>
                      </div>
                      {/* Transcript text strictly hidden during real test */}
                      <div className="hidden">
                         <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{globalTranscript}</p>
                      </div>
                    </CardContent></Card>
                  )}
                  {Array.isArray(sections) && sections.map((sec) => (
                    <div key={sec.sectionNumber} className="space-y-4">
                      {sec.transcript && (
                        <Card className="bg-violet-50/50 border-violet-200"><CardContent className="p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold flex items-center gap-2 text-violet-800"><Volume2 className="h-5 w-5" /> Transcript for {sec.title || `Section ${sec.sectionNumber}`}</h3>
                            <Button 
                              size="sm" 
                              disabled={playedAudios.has(`sec-${sec.sectionNumber}`) && playingAudioId !== `sec-${sec.sectionNumber}`}
                              className={(playedAudios.has(`sec-${sec.sectionNumber}`) && playingAudioId !== `sec-${sec.sectionNumber}`) ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700 text-white'}
                              onClick={() => toggleAudio(`sec-${sec.sectionNumber}`, sec.transcript || '')}
                            >
                              {playingAudioId === `sec-${sec.sectionNumber}` ? <><Volume2 className="h-4 w-4 mr-2 animate-pulse" /> Playing Audio...</> : <><Play className="h-4 w-4 mr-2" /> Play Audio (Once)</>}
                            </Button>
                          </div>
                          {/* Transcript text strictly hidden during real test */}
                          <div className="hidden">
                            <p className="text-sm text-violet-900/80 leading-relaxed whitespace-pre-line">{sec.transcript}</p>
                          </div>
                        </CardContent></Card>
                      )}
                      <Card>
                      <CardHeader><CardTitle className="text-base">{sec.title}</CardTitle></CardHeader>
                      <CardContent className="space-y-5">
                        {Array.isArray(sec.questions) && sec.questions.map((q) => {
                          const key = `l_${qIdx++}`;
                          return (
                            <div key={key} id={key} className="p-2 -mx-2">
                              <p className="font-medium mb-3 text-sm flex items-start gap-2">
                                <span className="bg-foreground text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">
                                  {qIdx}
                                </span>
                                <span className="pt-0.5">{q.questionText}</span>
                              </p>

                              {q.tableData ? (
                                <div className="overflow-x-auto border rounded-xl my-4 bg-white/50">
                                  <table className="w-full text-sm text-left">
                                    {q.tableData.headers && (
                                      <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                        <tr>
                                          {q.tableData.headers.map((h, i) => <th key={i} className="px-4 py-3 border-b">{h}</th>)}
                                        </tr>
                                      </thead>
                                    )}
                                    <tbody>
                                      {q.tableData.rows.map((row, ri) => (
                                        <tr key={ri} className="border-b last:border-b-0 hover:bg-muted/30">
                                          {row.map((cell, ci) => (
                                            <td key={ci} className="px-4 py-3 align-middle font-medium">
                                              {cell.type === 'text' ? (
                                                <span>{cell.value}</span>
                                              ) : (
                                                <input type="text" placeholder="Your answer..."
                                                  value={answers[key] ?? ''}
                                                  onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                                  className="w-full min-w-[120px] bg-background border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all outline-none"
                                                />
                                              )}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : Array.isArray(q.options) && q.options.length > 0 ? (
                                <div className="space-y-2">
                                  {q.options.map((opt) => (
                                    <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${answers[key] === opt ? 'border-violet-400 bg-violet-50' : 'border-border hover:border-violet-300'}`}>
                                      <input type="radio" name={key} value={opt} checked={answers[key] === opt} onChange={() => setAnswers(prev => ({ ...prev, [key]: opt }))} className="accent-violet-600" />
                                      <span className="text-sm">{opt}</span>
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <input type="text" placeholder="Type your answer..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
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

            {/* ─── READING ─── */}
            {phase === 'reading' && (() => {
              const passages = (td?.passages as Array<{ title: string; textContent: string; questions: Question[] }>) ?? [];
              let qIdx = 0;
              return (
                <div className="space-y-6">
                  {Array.isArray(passages) && passages.map((passage, pi) => (
                    <div key={pi} className="space-y-4">
                      <Card><CardContent className="p-5">
                        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" /> {passage.title}
                        </h2>
                        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                          {passage.textContent}
                        </div>
                      </CardContent></Card>
                      <Card><CardHeader><CardTitle className="text-base">Questions</CardTitle></CardHeader>
                        <CardContent className="space-y-5">
                          {Array.isArray(passage.questions) && passage.questions.map((q) => {
                            const key = `r_${qIdx++}`;
                            return (
                              <div key={key} id={key} className="p-2 -mx-2">
                                <p className="font-medium mb-3 text-sm flex items-start gap-2">
                                   <span className="bg-foreground text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">
                                     {qIdx}
                                   </span> 
                                   <span className="pt-0.5">{q.questionText}</span>
                                </p>
                                
                                {q.tableData ? (
                                  <div className="overflow-x-auto border rounded-xl my-4 bg-white/50">
                                    <table className="w-full text-sm text-left">
                                      {q.tableData.headers && (
                                        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                          <tr>
                                            {q.tableData.headers.map((h, i) => <th key={i} className="px-4 py-3 border-b">{h}</th>)}
                                          </tr>
                                        </thead>
                                      )}
                                      <tbody>
                                        {q.tableData.rows.map((row, ri) => (
                                          <tr key={ri} className="border-b last:border-b-0 hover:bg-muted/30">
                                            {row.map((cell, ci) => (
                                              <td key={ci} className="px-4 py-3 align-middle font-medium">
                                                {cell.type === 'text' ? (
                                                  <span>{cell.value}</span>
                                                ) : (
                                                  <input type="text" placeholder="Your answer..." 
                                                    value={answers[key] ?? ''} 
                                                    onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                                    className="w-full min-w-[120px] bg-background border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all outline-none" 
                                                  />
                                                )}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : Array.isArray(q.options) && q.options.length > 0 ? (
                                  <div className="space-y-2">
                                    {q.options.map((opt) => (
                                      <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${answers[key] === opt ? 'border-blue-400 bg-blue-50' : 'border-border hover:border-blue-300'}`}>
                                        <input type="radio" name={key} value={opt} checked={answers[key] === opt} onChange={() => setAnswers(prev => ({ ...prev, [key]: opt }))} className="accent-blue-600" />
                                        <span className="text-sm">{opt}</span>
                                      </label>
                                    ))}
                                  </div>
                                ) : (
                                  <input type="text" placeholder="Type your answer..." value={answers[key] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
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

            {/* ─── WRITING ─── */}
            {phase === 'writing' && (() => {
              const task1 = td?.task1 as { title: string; prompt: string } | undefined;
              const task2 = td?.task2 as { title: string; prompt: string } | undefined;
              return (
                <div className="space-y-6">
                  {task1 && (
                    <Card>
                      <CardHeader><CardTitle className="text-base flex items-center gap-2"><PenTool className="h-4 w-4 text-emerald-600" />{task1.title}</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800" dangerouslySetInnerHTML={{ __html: task1.prompt }} />
                        <Textarea placeholder="Write your Task 1 response here... (minimum 150 words)" rows={10}
                          value={answers['w_task1'] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, w_task1: e.target.value }))} />
                        <p className="text-xs text-muted-foreground">
                          Words: <strong>{(answers['w_task1'] ?? '').split(/\s+/).filter(Boolean).length}</strong> / minimum 150
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  {task2 && (
                    <Card>
                      <CardHeader><CardTitle className="text-base flex items-center gap-2"><PenTool className="h-4 w-4 text-emerald-600" />{task2.title}</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800" dangerouslySetInnerHTML={{ __html: task2.prompt }} />
                        <Textarea placeholder="Write your Task 2 essay here... (minimum 250 words)" rows={14}
                          value={answers['w_task2'] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, w_task2: e.target.value }))} />
                        <p className="text-xs text-muted-foreground">
                          Words: <strong>{(answers['w_task2'] ?? '').split(/\s+/).filter(Boolean).length}</strong> / minimum 250
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })()}

            {/* ─── SPEAKING ─── */}
            {phase === 'speaking' && (() => {
              const part1 = td?.part1 as { title: string; instructions: string; questions: Array<{ text: string }> } | undefined;
              const part2 = td?.part2 as { title: string; cueCard: { topic: string; bulletPoints: string[] } } | undefined;
              const part3 = td?.part3 as { title: string; questions: Array<{ text: string }> } | undefined;
              return (
                <div className="space-y-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
                    <Mic className="h-5 w-5 text-orange-600" />
                    <p className="text-sm text-orange-800">In a real exam you'd speak aloud. Write your answers below to practice and get an estimate.</p>
                  </div>
    {[part1, part2 ? { title: part2.title, questions: [{ text: `Cue Card: ${part2.cueCard.topic}\n• ${part2.cueCard.bulletPoints.join('\n• ')}` }] } : undefined, part3].filter(Boolean).map((part, pi) => (
                    <Card key={pi}>
                      <CardHeader><CardTitle className="text-base">{(part as { title: string }).title}</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        {Array.isArray((part as { questions: Array<{ text: string }> }).questions) && (part as { questions: Array<{ text: string }> }).questions.map((q, qi) => (
                          <div key={qi} className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                            <p className="text-sm font-medium text-orange-900 whitespace-pre-line">{q.text}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                  <Card>
                    <CardHeader><CardTitle className="text-base">Your Written Responses</CardTitle></CardHeader>
                    <CardContent>
                      <Textarea placeholder="Write your speaking responses here (answer all parts)..." rows={12}
                        value={answers['sp_answers'] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, sp_answers: e.target.value }))} />
                      <p className="text-xs text-muted-foreground mt-2">
                        Words: <strong>{(answers['sp_answers'] ?? '').split(/\s+/).filter(Boolean).length}</strong>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </>
        )}

        {/* Navigation bottom pad to ensure content isn't hidden behind the sticky bar */}
      </div>

      {navKeys.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 flex items-center justify-between">
          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-2 min-w-max px-2">
              {navKeys.map((key, i) => (
                <button 
                  key={key} 
                  onClick={() => scrollToQuestion(key)}
                  className={`w-10 h-10 rounded-md border flex items-center justify-center font-medium text-sm transition-colors ${
                    answers[key] 
                      ? 'bg-foreground text-white border-foreground' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="pl-4 flex-shrink-0 flex items-center gap-3">
             <div className="text-sm text-muted-foreground mr-4 hidden md:block">
               {navKeys.filter(k => !!answers[k]).length} of {TOTAL_QUESTIONS_TARGET} Answered
             </div>
             <Button size="default" variant="outline" onClick={() => submitSection()} className="border-foreground text-foreground">
               Review & Submit <ChevronRight className="h-4 w-4 ml-1" />
             </Button>
          </div>
        </div>
      )}

      {/* For writing/speaking where there's no grid, show a simpler submit bar */}
      {navKeys.length === 0 && test && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50 flex justify-end">
          <Button size="lg" onClick={() => submitSection()}
            className={`${currentSection.bg} text-white hover:opacity-90 font-bold px-8 rounded-xl shadow-lg`}>
            {sectionIndex < SECTIONS.length - 1 ? (
              <><CheckCircle className="h-5 w-5 mr-2" /> Continue to Next Section</>
            ) : (
              <><Award className="h-5 w-5 mr-2" /> Finish Test</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
