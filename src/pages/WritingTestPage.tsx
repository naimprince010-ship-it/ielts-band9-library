import { useState, useEffect, useCallback, useRef } from 'react';
import { sanitizeHtml } from '@/lib/sanitize';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useNavConfig } from '@/contexts/NavContext';
import {
  Clock,
  FileText,
  Send,
  RotateCcw,
  Home,
  PenTool,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  WritingTest,
  WritingTestSession,
  WritingResponse,
  WritingTestResult,
  WritingTaskType
} from '@/types';
import { WritingTask1Renderer, writingTask1RendererWouldShow } from '@/components/test/WritingTask1Renderer';
import { FullMockWritingPaper } from '@/components/test/FullMockWritingPaper';
import {
  normalizeWritingTestFromDb,
  findWritingTask1,
  findWritingTask2,
  WRITING_MOCK_ROW_ID_KEY,
} from '@/lib/writingVisualNormalize';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';


// ============================================
// Sample Writing Test Data
// ============================================
const SAMPLE_WRITING_TEST: WritingTest = {
  id: 'writing-test-1',
  title: 'Academic Writing Test 1',
  testType: 'academic',
  timeLimit: 3600, // 60 minutes
  is_premium: false,
  instructions: 'Complete both tasks. You should spend about 20 minutes on Task 1 and about 40 minutes on Task 2.',
  tasks: [
    {
      id: 'task1',
      taskNumber: 1,
      taskType: 'task1',
      title: 'Task 1: Report Writing',
      prompt: `
        <p class="mb-4">The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.</p>
        <p class="mb-4"><strong>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</strong></p>
        <p class="text-gray-600">Write at least 150 words.</p>
      `,
      imageUrl: 'https://ielts-up.com/images/writing/housing-chart.png',
      minWords: 150,
      recommendedTime: 20,
      tips: [
        'Describe the overall trend first',
        'Compare the two categories',
        'Include specific data points',
        'Use a variety of vocabulary to describe changes'
      ],
      sampleAnswer: `The bar chart illustrates the proportion of households living in owned versus rented accommodation in England and Wales over a period of nearly a century, from 1918 to 2011.

Overall, there was a dramatic shift from rented to owned housing over this period. In 1918, the vast majority of households (approximately 77%) lived in rented accommodation, while only about 23% owned their homes.

This pattern began to change significantly after World War II. By 1971, the two categories had reached near parity, with owned accommodation rising to around 51% and rented falling to 49%. The trend continued, and by 2001, owned housing had peaked at approximately 69%, while rented accommodation had declined to about 31%.

However, the most recent data from 2011 shows a slight reversal, with owned accommodation decreasing marginally to 64% and rented accommodation increasing to 36%. This suggests a potential shift in housing trends in the early 21st century.`
    },
    {
      id: 'task2',
      taskNumber: 2,
      taskType: 'task2',
      title: 'Task 2: Essay Writing',
      prompt: `
        <p class="mb-4"><strong>Some people believe that universities should focus on providing academic skills, while others think they should prepare students for employment.</strong></p>
        <p class="mb-4"><strong>Discuss both views and give your own opinion.</strong></p>
        <p class="text-gray-600">Write at least 250 words.</p>
      `,
      minWords: 250,
      recommendedTime: 40,
      tips: [
        'Plan your essay structure before writing',
        'Include an introduction, body paragraphs, and conclusion',
        'Present both sides of the argument',
        'Clearly state your own opinion',
        'Use linking words and phrases',
        'Support your points with examples'
      ],
      sampleAnswer: `The purpose of university education has been a subject of ongoing debate. While some argue that universities should primarily focus on imparting academic knowledge, others contend that preparing students for the workforce should be the main priority. This essay will examine both perspectives before presenting my own view.

Those who advocate for academic-focused education believe that universities are institutions of higher learning, not vocational training centers. They argue that developing critical thinking, research skills, and deep subject knowledge creates well-rounded individuals who can adapt to various career paths. Furthermore, academic rigor ensures that graduates can contribute to advancing knowledge in their fields through research and innovation.

On the other hand, proponents of employment-oriented education point to the practical realities of the modern job market. With rising tuition costs and student debt, many argue that universities have a responsibility to ensure graduates can secure meaningful employment. They suggest that incorporating internships, practical projects, and industry partnerships makes education more relevant and valuable.

In my opinion, the ideal approach lies in striking a balance between these two perspectives. Universities should maintain their commitment to academic excellence while also incorporating practical elements that enhance employability. This can be achieved through curricula that combine theoretical foundations with real-world applications, guest lectures from industry professionals, and opportunities for work experience.

In conclusion, rather than viewing academic and vocational education as mutually exclusive, universities should aim to provide both, preparing students to be knowledgeable, adaptable, and employment-ready graduates.`
    }
  ]
};

// ============================================
// localStorage Keys
// ============================================
const STORAGE_KEY = 'writing_test_session';
const writingPaperStartedKey = (testId: string) => `singleWriting:${testId}:Started`;

// ============================================
// Helper Functions
// ============================================
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const countWords = (text: string): number => {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// ============================================
// Main Component
// ============================================
export default function WritingTestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stateData = location.state as { testData?: WritingTest; testId?: string; testTitle?: string } | null;
  const raw = stateData?.testData;
  const hasValidData = raw && Array.isArray(raw.tasks) && raw.tasks.length >= 2;
  const embeddedMockRowId =
    raw && typeof raw === 'object' && WRITING_MOCK_ROW_ID_KEY in raw
      ? String((raw as Record<string, unknown>)[WRITING_MOCK_ROW_ID_KEY] ?? '').trim() || undefined
      : undefined;
  const remoteMockTestId =
    stateData?.testId || searchParams.get('testId') || embeddedMockRowId || undefined;
  /** Bare /writing-test (no DB id, no nav state) would wrongly show the built-in sample — send users to pick a published mock. */
  const needsMockSelection = !hasValidData && !remoteMockTestId;

  const [test, setTest] = useState<WritingTest>(() =>
    hasValidData ? normalizeWritingTestFromDb(raw) : SAMPLE_WRITING_TEST
  );
  const [currentTask, setCurrentTask] = useState<WritingTaskType>('task1');
  const [timeRemaining, setTimeRemaining] = useState(test.timeLimit);
  const [responses, setResponses] = useState<{
    task1: WritingResponse;
    task2: WritingResponse;
  }>(() => {
    const t = hasValidData && raw ? normalizeWritingTestFromDb(raw) : SAMPLE_WRITING_TEST;
    const t1 = findWritingTask1(t) ?? t.tasks[0];
    const t2 = findWritingTask2(t) ?? t.tasks[1];
    return {
      task1: {
        taskId: t1.id,
        taskNumber: 1,
        content: '',
        wordCount: 0,
        lastUpdatedAt: Date.now(),
      },
      task2: {
        taskId: t2.id,
        taskNumber: 2,
        content: '',
        wordCount: 0,
        lastUpdatedAt: Date.now(),
      },
    };
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<WritingTestResult | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [startedAt] = useState<number>(Date.now());
  const [pasteAttempted, setPasteAttempted] = useState(false);
  const [testLoadError, setTestLoadError] = useState<string | null>(null);
  const [timerRunning, setTimerRunning] = useState(() => sessionStorage.getItem(writingPaperStartedKey(test.id)) === '1');
  const [savedIndicator, setSavedIndicator] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const skipInitialSessionSaveRef = useRef(true);

  useEffect(() => {
    if (!needsMockSelection) return;
    navigate('/mock-test?module=writing', { replace: true });
  }, [needsMockSelection, navigate]);

  // If ?testId= was stripped (e.g. www redirect) but we still have row id in state payload, restore it for refresh/share.
  useEffect(() => {
    if (!remoteMockTestId || needsMockSelection) return;
    if (searchParams.get('testId') === remoteMockTestId) return;
    navigate(
      { pathname: '/writing-test', search: `?testId=${encodeURIComponent(remoteMockTestId)}` },
      { replace: true, state: location.state }
    );
  }, [remoteMockTestId, needsMockSelection, searchParams, navigate, location.state]);

  const task1 = findWritingTask1(test) ?? test.tasks[0];
  const task2 = findWritingTask2(test) ?? test.tasks[1];
  const currentTaskData = currentTask === 'task1' ? task1 : task2;
  const currentResponse = currentTask === 'task1' ? responses.task1 : responses.task2;

  // Refresh full test_data from Supabase so Task 1 table/chart is never missing due to slim navigation state or cache.
  useEffect(() => {
    if (needsMockSelection) return;
    if (!remoteMockTestId || !isSupabaseConfigured() || !supabase) return;
    let cancelled = false;
    setTestLoadError(null);
    (async () => {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('title, module_type, test_data, is_published')
        .eq('id', remoteMockTestId)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        const msg = error.message || 'Unknown error';
        console.warn('[WritingTestPage] mock_tests refresh failed:', msg);
        setTestLoadError(`Could not load test from server: ${msg}. Check Supabase RLS (anon SELECT on published mock_tests).`);
        return;
      }
      if (!data) {
        setTestLoadError(
          'This mock test was not found or is not visible (unpublished or wrong link). In Admin, ensure the writing test is Published and run fix_mock_tests_rls.sql if saves fail.'
        );
        return;
      }
      if (!data.is_published) {
        setTestLoadError('This mock test is not published yet — students only see published tests.');
        return;
      }
      if (data.module_type !== 'writing' || data.test_data == null) {
        setTestLoadError('Wrong test type or empty test data in the database.');
        return;
      }
      const normalized = normalizeWritingTestFromDb(data.test_data) as WritingTest;
      /* ---- DEBUG (safe to deploy) ---- */
      const dbTask1Raw = (data.test_data as Record<string, unknown>)?.tasks;
      const t1raw = Array.isArray(dbTask1Raw)
        ? (dbTask1Raw as unknown[])[0]
        : (data.test_data as Record<string, unknown>)?.task1;
      console.group('[WritingTestPage] Supabase DB snapshot');
      console.log('raw test_data keys:', Object.keys(data.test_data as object ?? {}));
      console.log('raw task1:', t1raw);
      const nt1 = normalized.tasks?.[0];
      console.log('normalized task1 visual keys: chartData=%o tableData=%o processData=%o mapData=%o imageUrl=%o',
        nt1?.chartData, nt1?.tableData, nt1?.processData, nt1?.mapData, nt1?.imageUrl);
      console.groupEnd();
      /* ---- end DEBUG ---- */
      if (!normalized.tasks || normalized.tasks.length < 2) {
        setTestLoadError('Writing test data has fewer than 2 tasks in the database — re-save from Admin.');
        return;
      }
      const merged: WritingTest = {
        ...normalized,
        title: typeof data.title === 'string' && data.title.trim() ? data.title : normalized.title,
      };
      setTest(merged);
      setTimeRemaining((prev) => merged.timeLimit ?? prev);
      const t1 = findWritingTask1(merged) ?? merged.tasks[0];
      const t2 = findWritingTask2(merged) ?? merged.tasks[1];
      setResponses((prev) => ({
        task1: { ...prev.task1, taskId: t1.id },
        task2: { ...prev.task2, taskId: t2.id },
      }));
      setTestLoadError(null);
    })();
    return () => {
      cancelled = true;
    };
  }, [remoteMockTestId, needsMockSelection]);

  // ============================================
  // Load session from localStorage on mount
  // ============================================
  useEffect(() => {
    if (needsMockSelection) return;
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const session: WritingTestSession = JSON.parse(savedSession);
        if (session.testId === test.id && !session.isSubmitted) {
          setResponses(session.responses);
          setTimeRemaining(session.timeRemaining);
          setCurrentTask(session.currentTask);
        }
      } catch (e) {
        console.error('Failed to load session:', e);
      }
    }
  }, [test.id, needsMockSelection]);

  // ============================================
  // Save session to localStorage on every change
  // ============================================
  const saveSession = useCallback(() => {
    if (needsMockSelection || isSubmitted) return;

    const session: WritingTestSession = {
      testId: test.id,
      startedAt,
      timeRemaining,
      responses,
      currentTask,
      isSubmitted: false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [test.id, startedAt, timeRemaining, responses, currentTask, isSubmitted, needsMockSelection]);

  useEffect(() => {
    if (needsMockSelection) return;
    if (skipInitialSessionSaveRef.current) {
      skipInitialSessionSaveRef.current = false;
      return;
    }
    saveSession();
  }, [saveSession, needsMockSelection]);

  // ============================================
  // Timer countdown
  // ============================================
  useEffect(() => {
    if (needsMockSelection || isSubmitted || !timerRunning || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, needsMockSelection, timerRunning]);

  useEffect(() => {
    if (!responses.task1.content && !responses.task2.content) return;
    setSavedIndicator(true);
    const timeout = setTimeout(() => setSavedIndicator(false), 1500);
    return () => clearTimeout(timeout);
  }, [responses]);

  // ============================================
  // Handle text change with word count
  // ============================================
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const wordCount = countWords(newContent);

    setResponses(prev => ({
      ...prev,
      [currentTask]: {
        ...prev[currentTask],
        content: newContent,
        wordCount,
        lastUpdatedAt: Date.now()
      }
    }));
  };

  // ============================================
  // Handle paste prevention
  // ============================================
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setPasteAttempted(true);
    setTimeout(() => setPasteAttempted(false), 3000);
  };

  // ============================================
  // Submit test
  // ============================================
  const handleSubmit = () => {
    const timeTaken = test.timeLimit - timeRemaining;

    const testResult: WritingTestResult = {
      testId: test.id,
      timeTaken,
      responses: [
        {
          taskNumber: 1,
          content: responses.task1.content,
          wordCount: responses.task1.wordCount,
          meetsMinWords: responses.task1.wordCount >= task1.minWords
        },
        {
          taskNumber: 2,
          content: responses.task2.content,
          wordCount: responses.task2.wordCount,
          meetsMinWords: responses.task2.wordCount >= task2.minWords
        }
      ]
    };

    setResult(testResult);
    setIsSubmitted(true);
    setShowConfirmSubmit(false);

    // Update localStorage with submitted status
    const session: WritingTestSession = {
      testId: test.id,
      startedAt,
      timeRemaining,
      responses,
      currentTask,
      isSubmitted: true,
      submittedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  };

  // ============================================
  // Reset test
  // ============================================
  const handleReset = () => {
    const t1 = findWritingTask1(test) ?? test.tasks[0];
    const t2 = findWritingTask2(test) ?? test.tasks[1];
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(writingPaperStartedKey(test.id));
    sessionStorage.removeItem(`singleWriting:${test.id}:ActiveTask`);
    setResponses({
      task1: {
        taskId: t1.id,
        taskNumber: 1,
        content: '',
        wordCount: 0,
        lastUpdatedAt: Date.now()
      },
      task2: {
        taskId: t2.id,
        taskNumber: 2,
        content: '',
        wordCount: 0,
        lastUpdatedAt: Date.now()
      }
    });
    setTimeRemaining(test.timeLimit);
    setCurrentTask('task1');
    setIsSubmitted(false);
    setResult(null);
    setTimerRunning(false);
  };

  // ============================================
  // Get word count color
  // ============================================
  const getWordCountColor = (wordCount: number, minWords: number): string => {
    if (wordCount >= minWords) {
      return 'text-green-600 bg-green-50 border-green-200';
    } else if (wordCount >= minWords * 0.7) {
      return 'text-amber-600 bg-amber-50 border-amber-200';
    }
    return 'text-red-600 bg-red-50 border-red-200';
  };

  // ── Nav context / exit guard ──────────────────────────────────────────────
  // mode: 'exam' matches what the route already sets via <Layout mode="exam">
  // — Navbar/Footer/MobileNav are already hidden, this doesn't change the
  // visible chrome. What it adds: Layout's useNavExitGuard now catches the
  // browser Back button and tab close/refresh while the test is in progress.
  const handleExitAttempt = useCallback(() => {
    if (isSubmitted || needsMockSelection) return true;
    return window.confirm('Leave the Writing test? Your progress on this section will be lost.');
  }, [isSubmitted, needsMockSelection]);

  useNavConfig({ mode: 'exam', title: test.title, onExitAttempt: handleExitAttempt });

  // ============================================
  // Results Screen
  // ============================================
  if (needsMockSelection) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50 text-gray-600">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
        <p className="text-sm">Taking you to Writing mock tests…</p>
      </div>
    );
  }

  if (isSubmitted && result) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h1>
                <p className="text-gray-600">{test.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className={`rounded-lg p-4 text-center border ${result.responses[0].meetsMinWords
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                  }`}>
                  <div className="text-2xl font-bold">
                    {result.responses[0].wordCount} words
                  </div>
                  <div className="text-sm">Task 1 (min: {task1.minWords})</div>
                  {result.responses[0].meetsMinWords ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto mt-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600 mx-auto mt-2" />
                  )}
                </div>
                <div className={`rounded-lg p-4 text-center border ${result.responses[1].meetsMinWords
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                  }`}>
                  <div className="text-2xl font-bold">
                    {result.responses[1].wordCount} words
                  </div>
                  <div className="text-sm">Task 2 (min: {task2.minWords})</div>
                  {result.responses[1].meetsMinWords ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto mt-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600 mx-auto mt-2" />
                  )}
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-gray-600">
                  Time taken: {formatTime(result.timeTaken)}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={handleReset} variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Link to="/">
                  <Button className="gap-2">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Show responses and sample answers */}
          {test.tasks.map((task, idx) => (
            <Card key={task.id} className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">{task.title}</h2>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Your Response:</h3>
                  <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-gray-800">
                    {result.responses[idx].content || '(No response)'}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Word count: {result.responses[idx].wordCount} / {task.minWords} minimum
                  </div>
                </div>

                {task.sampleAnswer && (
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">Sample Answer:</h3>
                    <div className="bg-green-50 rounded-lg p-4 whitespace-pre-wrap text-gray-800 border border-green-200">
                      {task.sampleAnswer}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // Main Test Interface
  // ============================================
  const writingAnswers = {
    w_task1: responses.task1.content,
    w_task2: responses.task2.content,
  };

  const setWritingAnswer = (key: 'w_task1' | 'w_task2', value: string) => {
    const responseKey = key === 'w_task1' ? 'task1' : 'task2';
    setResponses(previous => ({
      ...previous,
      [responseKey]: {
        ...previous[responseKey],
        content: value,
        wordCount: countWords(value),
        lastUpdatedAt: Date.now(),
      },
    }));
  };

  return (
    <FullMockWritingPaper
      task1={task1}
      task2={task2}
      answers={writingAnswers}
      setAnswer={setWritingAnswer}
      timeDisplay={formatTime(timeRemaining)}
      timeWarning={timeRemaining <= 300}
      savedIndicator={savedIndicator}
      pauseTimer={() => setTimerRunning(false)}
      startTimer={() => setTimerRunning(true)}
      onSubmit={handleSubmit}
      storagePrefix={`singleWriting:${test.id}:`}
    />
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Fixed Header */}
      <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            <Home className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">{test.title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${timeRemaining < 600 ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
            }`}>
            <Clock className="h-5 w-5" />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Submit Button */}
          <Button
            onClick={() => setShowConfirmSubmit(true)}
            className="bg-indigo-600 hover:bg-indigo-700 gap-2"
          >
            <Send className="h-4 w-4" />
            Submit Test
          </Button>
        </div>
      </header>

      {testLoadError && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 text-sm text-rose-900 shrink-0">
          <strong className="font-semibold">Could not sync test: </strong>
          {testLoadError}
        </div>
      )}

      {/* Task Tabs */}
      <div className="bg-white border-b px-4 py-2">
        <Tabs value={currentTask} onValueChange={(v) => setCurrentTask(v as WritingTaskType)}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="task1" className="gap-2">
              <FileText className="h-4 w-4" />
              Task 1
              <Badge variant={responses.task1.wordCount >= task1.minWords ? 'default' : 'secondary'} className="ml-1">
                {responses.task1.wordCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="task2" className="gap-2">
              <PenTool className="h-4 w-4" />
              Task 2
              <Badge variant={responses.task2.wordCount >= task2.minWords ? 'default' : 'secondary'} className="ml-1">
                {responses.task2.wordCount}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Submit Test?</h2>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600">
                  Task 1: {responses.task1.wordCount} words
                  {responses.task1.wordCount < task1.minWords && (
                    <span className="text-red-600"> (below minimum)</span>
                  )}
                </p>
                <p className="text-gray-600">
                  Task 2: {responses.task2.wordCount} words
                  {responses.task2.wordCount < task2.minWords && (
                    <span className="text-red-600"> (below minimum)</span>
                  )}
                </p>
              </div>
              {(responses.task1.wordCount < task1.minWords || responses.task2.wordCount < task2.minWords) && (
                <p className="text-amber-600 text-sm mb-4">
                  Warning: One or more tasks are below the minimum word count.
                </p>
              )}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowConfirmSubmit(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Paste Warning Toast */}
      {pasteAttempted && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Pasting is disabled in exam mode
        </div>
      )}

      {/* Split Screen Layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Pane - Question/Prompt */}
        <div className="w-1/2 min-w-0 border-r bg-white overflow-y-auto overflow-x-hidden">
          <div className="p-6 min-w-0">
            {/* Task Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{currentTaskData.title}</h2>
              <Badge variant="outline">
                {currentTaskData.recommendedTime} minutes recommended
              </Badge>
            </div>

            {/* Task Prompt */}
            <div
              className="prose prose-lg max-w-none text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(currentTaskData.prompt) }}
            />

            {/* Task 1 tab: show Task 1 visual (avoid missing table when taskNumber is string/wrong from DB) */}
            {currentTask === 'task1' && (
              <div className="mb-6 min-w-0 space-y-4">
                <div className="min-w-0">
                  <WritingTask1Renderer task={task1} />
                </div>
                {test.testType === 'academic' && !writingTask1RendererWouldShow(task1) && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                    <p className="font-semibold text-amber-900">No chart or table is showing for Task 1</p>
                    <p className="mt-1 text-amber-800">
                      Either this test has no table/chart data saved yet, or a broken empty chart is blocking the table.
                      In <strong>Admin → Manage Mock Tests</strong>, edit this writing test, use <strong>Remove all visuals</strong>{' '}
                      then add a table (or Generate Visual), <strong>Save</strong>, and start again from the mock list.
                      If it still fails, hard-refresh (Ctrl+F5) or clear this site&apos;s cache — an old app version can hide
                      the table.
                    </p>
                    {!remoteMockTestId && (
                      <p className="mt-2 text-xs text-amber-900/90">
                        Your URL has no <code className="rounded bg-amber-100/80 px-1">?testId=</code> — open the test from{' '}
                        <strong>IELTS Mock Tests → Writing → Start</strong> so the app can load the latest data from Supabase.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Writing Tips */}
            {currentTaskData.tips && currentTaskData.tips.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                  <Info className="h-4 w-4" />
                  Writing Tips
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  {currentTaskData.tips.map((tip, idx) => (
                    <li key={idx}>• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane - Text Editor */}
        <div className="w-1/2 min-w-0 bg-gray-50 flex flex-col">
          <div className="flex-1 p-4">
            <textarea
              ref={textareaRef}
              value={currentResponse.content}
              onChange={handleTextChange}
              onPaste={handlePaste}
              placeholder={`Start writing your ${currentTask === 'task1' ? 'report' : 'essay'} here...`}
              className="w-full h-full p-4 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 leading-relaxed"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
            />
          </div>

          {/* Word Counter Footer */}
          <div className="bg-white border-t px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1.5 rounded-lg border font-medium ${getWordCountColor(currentResponse.wordCount, currentTaskData.minWords)
                }`}>
                {currentResponse.wordCount} / {currentTaskData.minWords} words
              </div>
              {currentResponse.wordCount >= currentTaskData.minWords ? (
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Minimum reached
                </span>
              ) : (
                <span className="text-gray-500 text-sm">
                  {currentTaskData.minWords - currentResponse.wordCount} more words needed
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Auto-saved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
