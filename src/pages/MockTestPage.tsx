import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Target,
  BookOpen,
  PenTool,
  Mic,
  Headphones,
  Play,
  Award,
  ArrowRight,
  Crown,
  Loader2,
  AlertCircle,
  CheckCircle,
  FileText,
  BarChart3
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { normalizeMockTestRow } from '@/lib/writingVisualNormalize';
import {
  ReadingTest,
  ListeningTest,
  WritingTest,
  SpeakingTest
} from '@/types';

type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking';

interface MockTest {
  id: string;
  title: string;
  module_type: ModuleType;
  test_data: ReadingTest | ListeningTest | WritingTest | SpeakingTest;
  is_published: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

const MODULE_INFO = {
  reading: {
    name: 'Reading',
    icon: BookOpen,
    duration: 60,
    description: 'Academic reading passages with various question types',
    gradient: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    iconBg: 'bg-blue-500',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400'
  },
  listening: {
    name: 'Listening',
    icon: Headphones,
    duration: 30,
    description: 'Audio sections with comprehension questions',
    gradient: 'from-violet-500 to-violet-600',
    bgLight: 'bg-violet-50',
    iconBg: 'bg-violet-500',
    textColor: 'text-violet-600',
    borderColor: 'border-violet-200',
    hoverBorder: 'hover:border-violet-400'
  },
  writing: {
    name: 'Writing',
    icon: PenTool,
    duration: 60,
    description: 'Task 1 and Task 2 essay writing practice',
    gradient: 'from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
    iconBg: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400'
  },
  speaking: {
    name: 'Speaking',
    icon: Mic,
    duration: 15,
    description: 'Part 1, 2, and 3 interview simulation',
    gradient: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-50',
    iconBg: 'bg-orange-500',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400'
  }
};

export default function MockTestPage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeModule, setActiveModule] = useState<ModuleType>('reading');

  useEffect(() => {
    fetchPublishedTests();
  }, []);

  const fetchPublishedTests = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTests((data || []).map((row) => normalizeMockTestRow(row as MockTest)));
    } catch (err) {
      console.error('Error fetching mock tests:', err);
      setError('Failed to load mock tests');
    } finally {
      setLoading(false);
    }
  };

  const getTestsByModule = (moduleType: ModuleType) => {
    return tests.filter(test => test.module_type === moduleType);
  };

  const handleStartTest = (test: MockTest) => {
    const routeMap: Record<ModuleType, string> = {
      reading: '/reading-test',
      listening: '/listening-test',
      writing: '/writing-test',
      speaking: '/speaking-test'
    };

    navigate(routeMap[test.module_type], {
      state: {
        testData: test.test_data,
        testId: test.id,
        testTitle: test.title
      }
    });
  };

  const getQuestionCount = (test: MockTest): number => {
    switch (test.module_type) {
      case 'reading': {
        const readingTest = test.test_data as ReadingTest;
        return (Array.isArray(readingTest?.passages) ? readingTest.passages : []).reduce((sum, p) => sum + (p?.questions?.length || 0), 0) || 40;
      }
      case 'listening': {
        const listeningTest = test.test_data as ListeningTest;
        return (Array.isArray(listeningTest?.sections) ? listeningTest.sections : []).reduce((sum, s) => sum + (s?.questions?.length || 0), 0) || 40;
      }
      case 'writing': {
        const writingTest = test.test_data as WritingTest;
        return Array.isArray(writingTest?.tasks) ? writingTest.tasks.length : 2;
      }
      case 'speaking': {
        const speakingTest = test.test_data as SpeakingTest;
        return (Array.isArray(speakingTest?.parts) ? speakingTest.parts : []).reduce((sum, p) => sum + (p?.questions?.length || 0), 0) || 12;
      }
      default:
        return 0;
    }
  };

  const moduleTests = getTestsByModule(activeModule);
  const activeInfo = MODULE_INFO[activeModule];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
            <p className="text-muted-foreground font-medium">Loading mock tests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-accent/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Target className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Exam Simulation</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              IELTS Mock Tests
            </h1>
            <p className="text-lg text-white/70 mb-6 max-w-xl mx-auto">
              Practice with full-length timed tests to simulate the real exam experience and track your progress
            </p>
            <button
              onClick={() => navigate('/full-mock-test')}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-accent/30 transition-all hover:scale-105 mb-4"
            >
              <Target className="h-5 w-5" />
              🎯 Take Full Mock Test (All 4 Sections)
            </button>
            <p className="text-white/50 text-sm">or choose a module below for targeted practice</p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{tests.length}</div>
                <div className="text-sm text-white/60">Available Tests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">4</div>
                <div className="text-sm text-white/60">Test Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">Real</div>
                <div className="text-sm text-white/60">Exam Format</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Module Selector */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Select Module</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.keys(MODULE_INFO) as ModuleType[]).map((moduleType) => {
              const info = MODULE_INFO[moduleType];
              const Icon = info.icon;
              const count = getTestsByModule(moduleType).length;
              const isActive = activeModule === moduleType;

              return (
                <button
                  key={moduleType}
                  onClick={() => setActiveModule(moduleType)}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-300 text-left group ${isActive
                      ? `${info.bgLight} ${info.borderColor} shadow-lg`
                      : 'bg-card border-border hover:border-muted-foreground/30'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl ${isActive ? info.iconBg : 'bg-muted'} flex items-center justify-center mb-4 transition-all group-hover:scale-105`}>
                    <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 className={`font-bold mb-1 ${isActive ? info.textColor : 'text-foreground'}`}>
                    {info.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{info.duration} min</p>

                  {count > 0 && (
                    <Badge className={`absolute top-4 right-4 ${isActive ? info.iconBg : 'bg-muted text-muted-foreground'} text-white`}>
                      {count}
                    </Badge>
                  )}

                  {isActive && (
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 ${info.iconBg} rounded-t-full`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Module Description */}
        <div className={`${activeInfo.bgLight} rounded-2xl p-6 mb-8 border ${activeInfo.borderColor}`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${activeInfo.iconBg} flex items-center justify-center flex-shrink-0`}>
              <activeInfo.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${activeInfo.textColor} mb-1`}>{activeInfo.name} Tests</h3>
              <p className="text-muted-foreground">{activeInfo.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {activeInfo.duration} minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  {activeModule === 'writing' ? '2 tasks' : '40 questions'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        {moduleTests.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="py-16 text-center">
              <div className={`w-20 h-20 ${activeInfo.bgLight} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <activeInfo.icon className={`h-10 w-10 ${activeInfo.textColor} opacity-50`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                No {activeInfo.name} Tests Available
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We are preparing {activeInfo.name.toLowerCase()} mock tests. Check back soon for new content!
              </p>
              <Button variant="outline" onClick={() => navigate('/library')}>
                Explore Learning Materials
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moduleTests.map((test) => {
              const info = MODULE_INFO[test.module_type];
              const Icon = info.icon;
              const questionCount = getQuestionCount(test);

              return (
                <Card
                  key={test.id}
                  className={`group overflow-hidden border-2 ${info.borderColor} ${info.hoverBorder} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  {/* Card Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${info.gradient}`} />

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${info.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 ${info.textColor}`} />
                      </div>
                      {test.is_premium && (
                        <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white gap-1 shadow-sm">
                          <Crown className="h-3 w-3" />
                          Premium
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {test.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {info.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Target className="h-4 w-4" />
                        {questionCount} {test.module_type === 'writing' ? 'tasks' : 'questions'}
                      </span>
                    </div>

                    <Button
                      onClick={() => handleStartTest(test)}
                      className={`w-full bg-gradient-to-r ${info.gradient} hover:opacity-90 text-white shadow-lg group-hover:shadow-xl transition-all`}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Test
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-muted/50 border-0">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Timed Practice</h3>
              <p className="text-sm text-muted-foreground">
                Real exam timing to build your time management skills
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-0">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed feedback and band score estimates
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-0">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor improvement across all test modules
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-foreground text-white overflow-hidden">
          <CardContent className="p-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Ready for the Real Test?</h3>
                  <p className="text-white/70">
                    Complete mock tests to track your progress and get your estimated band score
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate('/results')}
                className="whitespace-nowrap bg-white text-foreground hover:bg-white/90"
              >
                View Your Results
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
