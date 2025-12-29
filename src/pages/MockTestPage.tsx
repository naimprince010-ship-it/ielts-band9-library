import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  AlertCircle
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  listening: {
    name: 'Listening',
    icon: Headphones,
    duration: 30,
    description: 'Audio sections with comprehension questions',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-600'
  },
  writing: {
    name: 'Writing',
    icon: PenTool,
    duration: 60,
    description: 'Task 1 and Task 2 essay writing',
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
    textColor: 'text-green-600'
  },
  speaking: {
    name: 'Speaking',
    icon: Mic,
    duration: 15,
    description: 'Part 1, 2, and 3 interview simulation',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-100',
    textColor: 'text-orange-600'
  }
};

export default function MockTestPage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<ModuleType>('reading');

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
      setTests(data || []);
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
        return readingTest.passages?.reduce((sum, p) => sum + (p.questions?.length || 0), 0) || 0;
      }
      case 'listening': {
        const listeningTest = test.test_data as ListeningTest;
        return listeningTest.sections?.reduce((sum, s) => sum + (s.questions?.length || 0), 0) || 0;
      }
      case 'writing': {
        const writingTest = test.test_data as WritingTest;
        return writingTest.tasks?.length || 2;
      }
      case 'speaking': {
        const speakingTest = test.test_data as SpeakingTest;
        return speakingTest.parts?.reduce((sum, p) => sum + (p.questions?.length || 0), 0) || 0;
      }
      default:
        return 0;
    }
  };

  const renderTestCard = (test: MockTest) => {
    const moduleInfo = MODULE_INFO[test.module_type];
    const Icon = moduleInfo.icon;
    const questionCount = getQuestionCount(test);

    return (
      <Card key={test.id} className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full ${moduleInfo.lightColor} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${moduleInfo.textColor}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{test.title}</CardTitle>
                <CardDescription className="text-sm">
                  {moduleInfo.name} Test
                </CardDescription>
              </div>
            </div>
            {test.is_premium && (
              <Badge className="bg-amber-100 text-amber-800 gap-1">
                <Crown className="h-3 w-3" />
                Premium
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {moduleInfo.duration} min
            </span>
            <span>{questionCount} questions</span>
          </div>
          <Button 
            onClick={() => handleStartTest(test)}
            className={`w-full ${moduleInfo.color} hover:opacity-90`}
          >
            <Play className="h-4 w-4 mr-2" />
            Start Test
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderModuleTab = (moduleType: ModuleType) => {
    const moduleTests = getTestsByModule(moduleType);
    const moduleInfo = MODULE_INFO[moduleType];

    if (moduleTests.length === 0) {
      return (
        <div className="text-center py-12">
          <moduleInfo.icon className={`h-16 w-16 ${moduleInfo.textColor} mx-auto mb-4 opacity-50`} />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No {moduleInfo.name} Tests Available</h3>
          <p className="text-gray-500">Check back later for new tests!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {moduleTests.map(renderTestCard)}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <span className="ml-3 text-gray-600">Loading mock tests...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Card className="border-2 border-purple-100 mb-8">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">IELTS Mock Tests</CardTitle>
            <CardDescription>
              Practice with full-length timed tests to simulate the real exam experience
            </CardDescription>
          </CardHeader>
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {tests.length === 0 && !error ? (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No Mock Tests Available Yet</h3>
              <p className="text-gray-500 mb-4">
                Mock tests are being prepared. Check back soon!
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ModuleType)}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {(Object.keys(MODULE_INFO) as ModuleType[]).map((moduleType) => {
                const info = MODULE_INFO[moduleType];
                const Icon = info.icon;
                const count = getTestsByModule(moduleType).length;
                return (
                  <TabsTrigger 
                    key={moduleType} 
                    value={moduleType}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{info.name}</span>
                    {count > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                        {count}
                      </Badge>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {(Object.keys(MODULE_INFO) as ModuleType[]).map((moduleType) => (
              <TabsContent key={moduleType} value={moduleType}>
                {renderModuleTab(moduleType)}
              </TabsContent>
            ))}
          </Tabs>
        )}

        <Card className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Ready for the Real Test?</h3>
                <p className="text-purple-100">
                  Complete mock tests to track your progress and get your estimated band score
                </p>
              </div>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/results')}
                className="whitespace-nowrap"
              >
                View Results
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
