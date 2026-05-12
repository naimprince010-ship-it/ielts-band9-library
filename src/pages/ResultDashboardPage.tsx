import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Clock,
  RotateCcw,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  FileCheck2,
  Sparkles,
  Target,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  calculateOverallBand, 
  formatBandScore, 
  getBandScoreColor,
  getBandScoreLevel
} from '@/utils/scoring';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface ModuleResult {
  moduleName: string;
  moduleType: 'reading' | 'listening' | 'writing' | 'speaking';
  bandScore: number | null;
  rawScore?: number;
  totalQuestions?: number;
  percentage?: number;
  status: 'completed' | 'pending' | 'not-started';
  timeTaken?: number;
  completedAt?: number;
}

interface TestSession {
  testId: string;
  testTitle: string;
  startedAt: number;
  modules: ModuleResult[];
}

interface FullMockAttempt {
  id: string;
  overall_band: number;
  listening_band: number | null;
  reading_band: number | null;
  writing_band: number | null;
  speaking_band: number | null;
  completed_at: string;
  review_data?: unknown;
  writing_feedback?: unknown;
  speaking_feedback?: unknown;
}

const STORAGE_KEYS = {
  reading: 'reading_test_session',
  listening: 'listening_test_session',
  writing: 'writing_test_session',
  speaking: 'speaking_test_session'
};

const MODULE_ICONS = {
  reading: BookOpen,
  listening: Headphones,
  writing: PenTool,
  speaking: Mic
};

const MODULE_COLORS = {
  reading: 'bg-blue-500',
  listening: 'bg-purple-500',
  writing: 'bg-amber-500',
  speaking: 'bg-emerald-500'
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

const bandTextClass = (band: number | null | undefined): string => {
  if (band == null) return 'text-gray-400';
  if (band >= 8) return 'text-emerald-600';
  if (band >= 7) return 'text-blue-600';
  if (band >= 6) return 'text-amber-600';
  return 'text-rose-600';
};

const formatShortDate = (value: string): string =>
  new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

const hasSavedPayload = (value: unknown): boolean => {
  if (!value) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0;
  return true;
};

interface TrendPoint {
  name: string;
  date: string;
  overall: number;
}

function BandTrendChart({ data }: { data: TrendPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-lg bg-slate-50 text-sm text-slate-500">
        Complete more mocks to see your score trend.
      </div>
    );
  }

  const width = 720;
  const height = 280;
  const padding = { top: 18, right: 24, bottom: 42, left: 38 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const points = data.map((item, index) => {
    const x = padding.left + (data.length === 1 ? innerWidth / 2 : (index / (data.length - 1)) * innerWidth);
    const y = padding.top + innerHeight - (Math.min(9, Math.max(0, item.overall)) / 9) * innerHeight;
    return { ...item, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <div className="h-72 w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" role="img" aria-label="Overall band trend">
        {[0, 3, 5, 6, 7, 8, 9].map((tick) => {
          const y = padding.top + innerHeight - (tick / 9) * innerHeight;
          return (
            <g key={tick}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="12" fill="#64748b">{tick}</text>
            </g>
          );
        })}
        <path d={path} fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={`${point.name}-${point.date}`}>
            <circle cx={point.x} cy={point.y} r="5" fill="#4f46e5" stroke="#fff" strokeWidth="3" />
            <text x={point.x} y={height - 22} textAnchor="middle" fontSize="12" fill="#64748b">{point.name}</text>
            <text x={point.x} y={Math.max(16, point.y - 12)} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b">
              {formatBandScore(point.overall)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function ResultDashboardPage() {
  const { user } = useAuth();
  const [testSession, setTestSession] = useState<TestSession | null>(null);
  const [fullMockAttempts, setFullMockAttempts] = useState<FullMockAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(5);

  const loadFullMockAttempts = useCallback(async () => {
    if (!user || !isSupabaseConfigured() || !supabase) {
      setFullMockAttempts([]);
      return;
    }

    try {
      let { data, error } = await supabase
        .from('mock_test_results')
        .select('id, overall_band, listening_band, reading_band, writing_band, speaking_band, completed_at, review_data, writing_feedback, speaking_feedback')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(50);

      if (error && /review_data|writing_feedback|speaking_feedback|column/i.test(error.message || '')) {
        const legacy = await supabase
          .from('mock_test_results')
          .select('id, overall_band, listening_band, reading_band, writing_band, speaking_band, completed_at')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(50);
        data = legacy.data;
        error = legacy.error;
      }

      if (error) throw error;
      setFullMockAttempts((data || []) as FullMockAttempt[]);
    } catch (err) {
      console.error('Failed to load full mock attempts:', err);
      setFullMockAttempts([]);
    }
  }, [user]);

  const loadAllResults = useCallback(async () => {
    setLoading(true);
    await loadFullMockAttempts();
    
    const modules: ModuleResult[] = [];
    let earliestStart = Date.now();

    // Load Reading results
    const readingSession = localStorage.getItem(STORAGE_KEYS.reading);
    if (readingSession) {
      try {
        const session = JSON.parse(readingSession);
        if (session.isSubmitted) {
          const answers = Object.values(session.answers || {}) as { answer?: string; isCorrect?: boolean }[];
          const correctCount = answers.filter((a) => a.isCorrect).length;
          
          modules.push({
            moduleName: 'Reading',
            moduleType: 'reading',
            bandScore: session.bandScore || null,
            rawScore: correctCount,
            totalQuestions: 40,
            percentage: session.score || 0,
            status: 'completed',
            timeTaken: session.timeTaken,
            completedAt: session.submittedAt
          });
          
          if (session.startedAt < earliestStart) {
            earliestStart = session.startedAt;
          }
        }
      } catch (e) {
        console.error('Failed to load reading session:', e);
      }
    }

    // Load Listening results
    const listeningSession = localStorage.getItem(STORAGE_KEYS.listening);
    if (listeningSession) {
      try {
        const session = JSON.parse(listeningSession);
        if (session.isSubmitted) {
          const answers = Object.values(session.answers || {}) as { answer?: string; isCorrect?: boolean }[];
          const correctCount = answers.filter((a) => a.isCorrect).length;
          
          modules.push({
            moduleName: 'Listening',
            moduleType: 'listening',
            bandScore: session.bandScore || null,
            rawScore: correctCount,
            totalQuestions: 40,
            percentage: session.score || 0,
            status: 'completed',
            timeTaken: session.timeTaken,
            completedAt: session.submittedAt
          });
          
          if (session.startedAt < earliestStart) {
            earliestStart = session.startedAt;
          }
        }
      } catch (e) {
        console.error('Failed to load listening session:', e);
      }
    }

    // Load Writing results (subjective - pending evaluation)
    const writingSession = localStorage.getItem(STORAGE_KEYS.writing);
    if (writingSession) {
      try {
        const session = JSON.parse(writingSession);
        if (session.isSubmitted) {
          modules.push({
            moduleName: 'Writing',
            moduleType: 'writing',
            bandScore: null,
            status: 'pending',
            timeTaken: session.timeTaken,
            completedAt: session.submittedAt
          });
          
          if (session.startedAt < earliestStart) {
            earliestStart = session.startedAt;
          }
        }
      } catch (e) {
        console.error('Failed to load writing session:', e);
      }
    }

    // Load Speaking results (subjective - pending evaluation)
    const speakingSession = localStorage.getItem(STORAGE_KEYS.speaking);
    if (speakingSession) {
      try {
        const session = JSON.parse(speakingSession);
        if (session.isSubmitted) {
          modules.push({
            moduleName: 'Speaking',
            moduleType: 'speaking',
            bandScore: null,
            status: 'pending',
            completedAt: session.submittedAt
          });
          
          if (session.startedAt < earliestStart) {
            earliestStart = session.startedAt;
          }
        }
      } catch (e) {
        console.error('Failed to load speaking session:', e);
      }
    }

    // Add not-started modules
    const moduleTypes: Array<'reading' | 'listening' | 'writing' | 'speaking'> = ['reading', 'listening', 'writing', 'speaking'];
    const moduleNames = { reading: 'Reading', listening: 'Listening', writing: 'Writing', speaking: 'Speaking' };
    
    for (const type of moduleTypes) {
      if (!modules.find(m => m.moduleType === type)) {
        modules.push({
          moduleName: moduleNames[type],
          moduleType: type,
          bandScore: null,
          status: 'not-started'
        });
      }
    }

    // Sort modules in IELTS order
    const order = ['listening', 'reading', 'writing', 'speaking'];
    modules.sort((a, b) => order.indexOf(a.moduleType) - order.indexOf(b.moduleType));

    if (modules.some(m => m.status !== 'not-started')) {
      setTestSession({
        testId: 'combined-test',
        testTitle: 'IELTS Practice Test',
        startedAt: earliestStart,
        modules
      });
    }

    setLoading(false);
  }, [loadFullMockAttempts]);

  useEffect(() => {
    loadAllResults();
  }, [loadAllResults]);

  const handleClearAll = () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    setTestSession(null);
  };

  // Calculate overall band score from completed objective modules
  const getOverallBandScore = (): number | null => {
    if (!testSession) return null;
    
    const completedScores: { [key: string]: number } = {};
    
    for (const module of testSession.modules) {
      if (module.status === 'completed' && module.bandScore !== null) {
        completedScores[module.moduleType] = module.bandScore;
      }
    }
    
    if (Object.keys(completedScores).length === 0) return null;
    
    return calculateOverallBand(completedScores);
  };

  const overallBand = getOverallBandScore();
  const completedModules = testSession?.modules.filter(m => m.status === 'completed').length || 0;
  const pendingModules = testSession?.modules.filter(m => m.status === 'pending').length || 0;
  const latestFullMock = fullMockAttempts[0];
  const orderedFullMocks = [...fullMockAttempts].reverse();
  const trendData = orderedFullMocks.map((attempt, index) => ({
    name: `A${index + 1}`,
    date: formatShortDate(attempt.completed_at),
    overall: Number(attempt.overall_band || 0),
    listening: attempt.listening_band ?? null,
    reading: attempt.reading_band ?? null,
    writing: attempt.writing_band ?? null,
    speaking: attempt.speaking_band ?? null,
  }));
  const bestFullMock = fullMockAttempts.reduce<FullMockAttempt | null>((best, attempt) => {
    if (!best) return attempt;
    return Number(attempt.overall_band) > Number(best.overall_band) ? attempt : best;
  }, null);
  const averageOverall = fullMockAttempts.length
    ? fullMockAttempts.reduce((sum, attempt) => sum + Number(attempt.overall_band || 0), 0) / fullMockAttempts.length
    : null;
  const previousFullMock = fullMockAttempts[1];
  const latestDelta = latestFullMock && previousFullMock
    ? Number(latestFullMock.overall_band) - Number(previousFullMock.overall_band)
    : null;
  const sectionScores = latestFullMock ? [
    { label: 'Listening', value: latestFullMock.listening_band, icon: Headphones, color: 'bg-purple-500' },
    { label: 'Reading', value: latestFullMock.reading_band, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Writing', value: latestFullMock.writing_band, icon: PenTool, color: 'bg-amber-500' },
    { label: 'Speaking', value: latestFullMock.speaking_band, icon: Mic, color: 'bg-emerald-500' },
  ] : [];
  const validSectionScores = sectionScores.filter(section => section.value != null);
  const weakestSection = validSectionScores.reduce<typeof validSectionScores[number] | null>((weakest, section) => {
    if (!weakest) return section;
    return Number(section.value) < Number(weakest.value) ? section : weakest;
  }, null);
  const strongestSection = validSectionScores.reduce<typeof validSectionScores[number] | null>((strongest, section) => {
    if (!strongest) return section;
    return Number(section.value) > Number(strongest.value) ? section : strongest;
  }, null);
  const targetBand = latestFullMock && Number(latestFullMock.overall_band) >= 7 ? 8 : 7;
  const targetGap = latestFullMock ? Math.max(0, targetBand - Number(latestFullMock.overall_band || 0)) : null;
  const visibleHistory = fullMockAttempts.slice(0, visibleHistoryCount);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (fullMockAttempts.length === 0 && (!testSession || testSession.modules.every(m => m.status === 'not-started'))) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Test Results</h2>
            <p className="text-gray-600 mb-6">
              You haven't completed any IELTS practice tests yet. Start a test to see your results here.
            </p>
            <div className="space-y-3">
              <Link to="/reading-test" className="block">
                <Button className="w-full gap-2">
                  <BookOpen className="h-4 w-4" />
                  Start Reading Test
                </Button>
              </Link>
              <Link to="/listening-test" className="block">
                <Button variant="outline" className="w-full gap-2">
                  <Headphones className="h-4 w-4" />
                  Start Listening Test
                </Button>
              </Link>
              <Link to="/full-mock-test" className="block">
                <Button variant="outline" className="w-full gap-2">
                  <Award className="h-4 w-4" />
                  Start Full Mock Test
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Full Mock Analytics</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950">Result Dashboard</h1>
            <p className="mt-1 text-slate-600">Track your IELTS mock performance, review readiness, and section gaps.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="gap-2"
              title="Clears only unfinished local single-module practice sessions. Saved full mock attempts stay in your account."
            >
              <RotateCcw className="h-4 w-4" />
              Clear Local
            </Button>
            <Link to="/full-mock-test">
              <Button variant="outline" className="gap-2">
                <Award className="h-4 w-4" />
                New Mock
              </Button>
            </Link>
            <Link to="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>

        {latestFullMock && (
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card className="border-indigo-100 bg-indigo-600 text-white md:col-span-1">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-indigo-100">Latest Overall</p>
                  <Award className="h-5 w-5 text-indigo-100" />
                </div>
                <div className="mt-4 text-5xl font-bold">{formatBandScore(Number(latestFullMock.overall_band))}</div>
                <p className="mt-2 text-sm text-indigo-100">{formatShortDate(latestFullMock.completed_at)} attempt</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-500">Best Score</p>
                  <Target className="h-5 w-5 text-emerald-500" />
                </div>
                <div className={`mt-4 text-4xl font-bold ${bandTextClass(bestFullMock?.overall_band)}`}>
                  {bestFullMock ? formatBandScore(Number(bestFullMock.overall_band)) : '--'}
                </div>
                <p className="mt-2 text-sm text-slate-500">{bestFullMock ? formatShortDate(bestFullMock.completed_at) : 'No best yet'}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-500">Average</p>
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
                <div className={`mt-4 text-4xl font-bold ${bandTextClass(averageOverall)}`}>
                  {averageOverall != null ? formatBandScore(averageOverall) : '--'}
                </div>
                <p className="mt-2 text-sm text-slate-500">{fullMockAttempts.length} saved attempts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-500">Last Change</p>
                  <TrendingUp className="h-5 w-5 text-violet-500" />
                </div>
                <div className={`mt-4 text-4xl font-bold ${latestDelta == null ? 'text-slate-400' : latestDelta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {latestDelta == null ? '--' : `${latestDelta >= 0 ? '+' : ''}${latestDelta.toFixed(1)}`}
                </div>
                <p className="mt-2 text-sm text-slate-500">Compared with previous</p>
              </CardContent>
            </Card>
          </div>
        )}

        {latestFullMock && (
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
            <Card className="overflow-hidden border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Band Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BandTrendChart data={trendData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileCheck2 className="h-5 w-5 text-emerald-600" />
                  Latest Section Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sectionScores.map((section) => {
                  const Icon = section.icon;
                  const value = Number(section.value || 0);
                  return (
                    <div key={section.label} className="rounded-lg border border-slate-200 bg-white p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${section.color} bg-opacity-10`}>
                            <Icon className={`h-4 w-4 ${section.color.replace('bg-', 'text-')}`} />
                          </span>
                          <span className="font-semibold text-slate-800">{section.label}</span>
                        </div>
                        <span className={`text-xl font-bold ${bandTextClass(section.value)}`}>
                          {section.value != null ? formatBandScore(value) : '--'}
                        </span>
                      </div>
                      <Progress value={(value / 9) * 100} className="h-2" />
                    </div>
                  );
                })}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Badge variant={hasSavedPayload(latestFullMock.review_data) ? 'default' : 'outline'} className="justify-center gap-1 py-2">
                    <FileCheck2 className="h-3 w-3" />
                    {hasSavedPayload(latestFullMock.review_data) ? 'Review saved' : 'No review'}
                  </Badge>
                  <Badge variant={hasSavedPayload(latestFullMock.writing_feedback) || hasSavedPayload(latestFullMock.speaking_feedback) ? 'default' : 'outline'} className="justify-center gap-1 py-2">
                    <Sparkles className="h-3 w-3" />
                    {hasSavedPayload(latestFullMock.writing_feedback) || hasSavedPayload(latestFullMock.speaking_feedback) ? 'AI feedback' : 'No feedback'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {latestFullMock && (
          <Card className="mb-8 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                Action Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-rose-100 bg-rose-50 p-4">
                  <p className="text-sm font-semibold text-rose-700">Priority Skill</p>
                  <p className="mt-2 text-2xl font-bold text-rose-900">{weakestSection?.label || 'Not enough data'}</p>
                  <p className="mt-1 text-sm text-rose-700">
                    {weakestSection ? `Band ${formatBandScore(Number(weakestSection.value))}. Put your next practice block here.` : 'Complete all sections to get a weakness signal.'}
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-700">Strongest Skill</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-900">{strongestSection?.label || 'Not enough data'}</p>
                  <p className="mt-1 text-sm text-emerald-700">
                    {strongestSection ? `Band ${formatBandScore(Number(strongestSection.value))}. Keep this stable while lifting weaker sections.` : 'More scored sections will unlock this.'}
                  </p>
                </div>
                <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                  <p className="text-sm font-semibold text-indigo-700">Next Target</p>
                  <p className="mt-2 text-2xl font-bold text-indigo-900">Band {targetBand}.0</p>
                  <p className="mt-1 text-sm text-indigo-700">
                    {targetGap === 0 ? 'You reached this target. Push the next band boundary.' : `${targetGap?.toFixed(1)} band point gap from latest overall.`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {fullMockAttempts.length > 1 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Full Mock History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {visibleHistory.map((attempt, index) => (
                  <Link key={attempt.id} to={`/results/${attempt.id}`} className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition hover:bg-indigo-50">
                    <div>
                      <p className="font-semibold text-gray-900">Attempt {fullMockAttempts.length - index}</p>
                      <p className="text-sm text-gray-500">{new Date(attempt.completed_at).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getBandScoreColor(Number(attempt.overall_band))}>
                        Overall {formatBandScore(Number(attempt.overall_band))}
                      </Badge>
                      {index === 0 && <Badge variant="outline">Latest</Badge>}
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>
              {visibleHistoryCount < fullMockAttempts.length && (
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => setVisibleHistoryCount((count) => Math.min(count + 5, fullMockAttempts.length))}
                >
                  Show more attempts
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Overall Score Card */}
        {testSession && (
        <div className="mb-4 mt-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Local Practice Snapshot</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Single Module Results</h2>
        </div>
        )}

        {/* Overall Score Card */}
        {testSession && (
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Overall Band Score */}
              <div className="text-center">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Overall Band Score</div>
                {overallBand !== null ? (
                  <>
                    <div className={`text-6xl font-bold mb-2 ${getBandScoreColor(overallBand).split(' ')[0]}`}>
                      {formatBandScore(overallBand)}
                    </div>
                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getBandScoreColor(overallBand)}`}>
                      {getBandScoreLevel(overallBand)} User
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-6xl font-bold text-gray-300 mb-2">--</div>
                    <div className="text-sm text-gray-500">Complete tests to see score</div>
                  </>
                )}
              </div>

              {/* Progress */}
              <div className="text-center">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">Test Progress</div>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">{completedModules}</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">{pendingModules}</div>
                    <div className="text-xs text-gray-500">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-400">{4 - completedModules - pendingModules}</div>
                    <div className="text-xs text-gray-500">Not Started</div>
                  </div>
                </div>
                <Progress value={(completedModules + pendingModules) * 25} className="h-2" />
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Objective Modules</span>
                  </div>
                  <Badge variant="secondary">
                    {testSession.modules.filter(m => ['reading', 'listening'].includes(m.moduleType) && m.status === 'completed').length}/2
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Subjective Modules</span>
                  </div>
                  <Badge variant="outline" className="text-amber-600 border-amber-300">
                    {pendingModules} Pending Review
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Module Cards */}
        {testSession && (
        <div className="grid md:grid-cols-2 gap-6">
          {testSession.modules.map((module) => {
            const Icon = MODULE_ICONS[module.moduleType];
            const colorClass = MODULE_COLORS[module.moduleType];
            
            return (
              <Card key={module.moduleType} className={`overflow-hidden ${module.status === 'not-started' ? 'opacity-60' : ''}`}>
                <div className={`h-2 ${colorClass}`} />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colorClass} bg-opacity-10 flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${colorClass.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.moduleName}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {module.moduleType === 'reading' || module.moduleType === 'listening' 
                            ? 'Objective Assessment' 
                            : 'Subjective Assessment'}
                        </p>
                      </div>
                    </div>
                    {module.status === 'completed' && (
                      <Badge className="bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {module.status === 'pending' && (
                      <Badge className="bg-amber-100 text-amber-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending Review
                      </Badge>
                    )}
                    {module.status === 'not-started' && (
                      <Badge variant="outline" className="text-gray-500">
                        Not Started
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {module.status === 'completed' && module.bandScore !== null && (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className={`text-2xl font-bold ${getBandScoreColor(module.bandScore).split(' ')[0]}`}>
                          {formatBandScore(module.bandScore)}
                        </div>
                        <div className="text-xs text-gray-500">Band Score</div>
                      </div>
                      {module.rawScore !== undefined && (
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-700">
                            {module.rawScore}/{module.totalQuestions}
                          </div>
                          <div className="text-xs text-gray-500">Raw Score</div>
                        </div>
                      )}
                      {module.percentage !== undefined && (
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-700">
                            {module.percentage.toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500">Accuracy</div>
                        </div>
                      )}
                    </div>
                  )}

                  {module.status === 'pending' && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800">Pending Evaluation</p>
                          <p className="text-sm text-amber-700 mt-1">
                            Your {module.moduleName.toLowerCase()} responses have been submitted and are awaiting evaluation by an examiner.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {module.status === 'not-started' && (
                    <div className="p-4 bg-gray-50 rounded-lg mb-4">
                      <p className="text-sm text-gray-600 text-center">
                        You haven't taken this test yet.
                      </p>
                    </div>
                  )}

                  {module.timeTaken && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      Time taken: {formatTime(module.timeTaken)}
                    </div>
                  )}

                  <div className="mt-4">
                    {module.status === 'completed' && (
                      <Link to={`/${module.moduleType}-test`}>
                        <Button variant="outline" className="w-full gap-2">
                          <RotateCcw className="h-4 w-4" />
                          Retake Test
                        </Button>
                      </Link>
                    )}
                    {module.status === 'not-started' && (
                      <Link to={`/${module.moduleType}-test`}>
                        <Button className="w-full gap-2">
                          <Icon className="h-4 w-4" />
                          Start Test
                        </Button>
                      </Link>
                    )}
                    {module.status === 'pending' && (
                      <Button variant="outline" className="w-full" disabled>
                        <Clock className="h-4 w-4 mr-2" />
                        Awaiting Results
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        )}

        {/* Band Score Legend */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              IELTS Band Score Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { band: 9, level: 'Expert', desc: 'Full command of the language' },
                { band: 8, level: 'Very Good', desc: 'Fully operational command' },
                { band: 7, level: 'Good', desc: 'Operational command with occasional inaccuracies' },
                { band: 6, level: 'Competent', desc: 'Generally effective command' },
                { band: 5, level: 'Modest', desc: 'Partial command of the language' }
              ].map(({ band, level, desc }) => (
                <div key={band} className={`p-3 rounded-lg ${getBandScoreColor(band)}`}>
                  <div className="text-2xl font-bold">{band}.0</div>
                  <div className="font-medium">{level}</div>
                  <div className="text-xs opacity-75 mt-1">{desc}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
