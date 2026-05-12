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
  CheckCircle2
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

export default function ResultDashboardPage() {
  const { user } = useAuth();
  const [testSession, setTestSession] = useState<TestSession | null>(null);
  const [fullMockAttempts, setFullMockAttempts] = useState<FullMockAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFullMockAttempts = useCallback(async () => {
    if (!user || !isSupabaseConfigured() || !supabase) {
      setFullMockAttempts([]);
      return;
    }

    try {
      let { data, error } = await supabase
        .from('mock_test_results')
        .select('id, overall_band, listening_band, reading_band, writing_band, speaking_band, completed_at, review_data, writing_feedback')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(10);

      if (error && /review_data|writing_feedback|column/i.test(error.message || '')) {
        const legacy = await supabase
          .from('mock_test_results')
          .select('id, overall_band, listening_band, reading_band, writing_band, speaking_band, completed_at')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(10);
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Result Dashboard</h1>
            <p className="text-gray-600 mt-1">Your IELTS Practice Test Results</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClearAll} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Clear Local
            </Button>
            <Link to="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Overall Score Card */}
        {latestFullMock && (
          <Card className="mb-8 overflow-hidden border-indigo-100 shadow-lg">
            <div className="h-2 bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500" />
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                      <Award className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Latest Full Mock Test</h2>
                      <p className="text-sm text-gray-500">
                        Completed {new Date(latestFullMock.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 max-w-2xl">
                    This score comes from the complete four-module mock test and is the most reliable dashboard signal.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Overall', value: latestFullMock.overall_band, accent: true },
                    { label: 'Listening', value: latestFullMock.listening_band },
                    { label: 'Reading', value: latestFullMock.reading_band },
                    { label: 'Writing', value: latestFullMock.writing_band },
                    { label: 'Speaking', value: latestFullMock.speaking_band },
                  ].map(item => (
                    <div key={item.label} className={`text-center rounded-lg p-4 ${item.accent ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-900'}`}>
                      <div className="text-xs uppercase tracking-wide opacity-75 mb-1">{item.label}</div>
                      <div className="text-3xl font-bold">{item.value !== null ? formatBandScore(Number(item.value)) : '--'}</div>
                    </div>
                  ))}
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
                {fullMockAttempts.slice(0, 5).map((attempt, index) => (
                  <div key={attempt.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                      <p className="font-semibold text-gray-900">Attempt {fullMockAttempts.length - index}</p>
                      <p className="text-sm text-gray-500">{new Date(attempt.completed_at).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getBandScoreColor(Number(attempt.overall_band))}>
                        Overall {formatBandScore(Number(attempt.overall_band))}
                      </Badge>
                      {index === 0 && <Badge variant="outline">Latest</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
