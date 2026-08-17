import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle, CheckCircle2, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ReadingTest,
  ReadingQuestion,
  ReadingTestResult,
} from '@/types';
import {
  gradeObjectiveTest,
  formatBandScore,
  getBandScoreColor,
  getBandScoreLevel,
} from '@/utils/scoring';
import { FullMockReadingPaper } from '@/components/test/FullMockReadingPaper';
import type { ReadingPaperPassage } from '@/components/test/FullMockReadingPaper';
import { useExamTimer, formatTimerDisplay } from '@/hooks/useExamTimer';
import { useNavConfig } from '@/contexts/NavContext';

// ============================================
// Sample Reading Test Data
// ============================================
const SAMPLE_READING_TEST: ReadingTest = {
  id: 'reading-test-1',
  title: 'Academic Reading Test 1',
  testType: 'academic',
  totalQuestions: 13,
  timeLimit: 1200, // 20 minutes for demo (normally 3600 for 60 min)
  is_premium: false,
  instructions: 'Read the passage carefully and answer questions 1-13.',
  passages: [
    {
      id: 'passage-1',
      passageNumber: 1,
      title: 'The History of Coffee',
      textContent: `
        <p class="mb-4"><strong>A</strong> Coffee is one of the most popular beverages in the world, consumed by millions of people every day. The history of coffee dates back centuries, with its origins traced to the ancient coffee forests on the Ethiopian plateau. According to legend, a goat herder named Kaldi first discovered the potential of these beloved beans when he noticed that his goats became so energetic after eating berries from a certain tree that they did not want to sleep at night.</p>
        
        <p class="mb-4"><strong>B</strong> Kaldi reported his findings to the abbot of the local monastery, who made a drink with the berries and found that it kept him alert through the long hours of evening prayer. The abbot shared his discovery with the other monks at the monastery, and knowledge of the energizing berries began to spread. As word moved east and coffee reached the Arabian Peninsula, it began a journey which would bring these beans across the globe.</p>
        
        <p class="mb-4"><strong>C</strong> Coffee cultivation and trade began on the Arabian Peninsula. By the 15th century, coffee was being grown in the Yemeni district of Arabia and by the 16th century it was known in Persia, Egypt, Syria, and Turkey. Coffee was not only enjoyed in homes, but also in the many public coffee houses — called qahveh khaneh — which began to appear in cities across the Near East. The popularity of the coffee houses was unequaled and people frequented them for all kinds of social activity.</p>
        
        <p class="mb-4"><strong>D</strong> European travelers to the Near East brought back stories of an unusual dark black beverage. By the 17th century, coffee had made its way to Europe and was becoming popular across the continent. Some people reacted to this new beverage with suspicion or fear, calling it the "bitter invention of Satan." The local clergy condemned coffee when it came to Venice in 1615. The controversy was so great that Pope Clement VIII was asked to intervene. He decided to taste the beverage for himself before making a decision, and found the drink so satisfying that he gave it papal approval.</p>
        
        <p class="mb-4"><strong>E</strong> Despite such controversy, coffee houses were quickly becoming centers of social activity and communication in the major cities of England, Austria, France, Germany and Holland. In England, "penny universities" sprang up, so called because for the price of a penny one could purchase a cup of coffee and engage in stimulating conversation. Coffee began to replace the common breakfast drink beverages of the time — beer and wine. Those who drank coffee instead of alcohol began the day alert and energized, and not surprisingly, the quality of their work was greatly improved.</p>
        
        <p class="mb-4"><strong>F</strong> In the mid-1600s, coffee was brought to New Amsterdam, later called New York. Though coffee houses rapidly began to appear, tea continued to be the favored drink in the New World until 1773, when the colonists revolted against a heavy tax on tea imposed by King George III. The revolt, known as the Boston Tea Party, would forever change the American drinking preference to coffee. Today, coffee is grown in many countries around the world, from the Americas to Africa to Asia, and remains one of the world's most traded commodities.</p>
      `,
      paragraphs: [
        { label: 'A', content: 'Coffee origins in Ethiopia, legend of Kaldi the goat herder' },
        { label: 'B', content: 'Discovery shared with monastery, spread to Arabian Peninsula' },
        { label: 'C', content: 'Coffee cultivation in Arabia, coffee houses in Near East' },
        { label: 'D', content: 'Coffee reaches Europe, initial suspicion and papal approval' },
        { label: 'E', content: 'Coffee houses as social centers, replacing beer and wine' },
        { label: 'F', content: 'Coffee in America, Boston Tea Party changes preferences' }
      ],
      questionRange: { start: 1, end: 13 },
      questions: [
        {
          id: 'q1',
          questionNumber: 1,
          type: 'true-false-not-given',
          questionText: 'Coffee was first discovered in Yemen.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'The passage states coffee originated in Ethiopia, not Yemen.',
          passageRef: 'Paragraph A'
        },
        {
          id: 'q2',
          questionNumber: 2,
          type: 'true-false-not-given',
          questionText: 'Kaldi was a farmer who grew coffee beans.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'Kaldi was a goat herder, not a farmer.',
          passageRef: 'Paragraph A'
        },
        {
          id: 'q3',
          questionNumber: 3,
          type: 'true-false-not-given',
          questionText: 'The monastery where coffee was first used as a drink was in Ethiopia.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'NOT GIVEN',
          explanation: 'The passage does not specify the location of the monastery.',
          passageRef: 'Paragraph B'
        },
        {
          id: 'q4',
          questionNumber: 4,
          type: 'true-false-not-given',
          questionText: 'Coffee houses in the Near East were only used for drinking coffee.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'People frequented them for all kinds of social activity.',
          passageRef: 'Paragraph C'
        },
        {
          id: 'q5',
          questionNumber: 5,
          type: 'true-false-not-given',
          questionText: 'Pope Clement VIII banned coffee in Europe.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'The Pope gave coffee papal approval after tasting it.',
          passageRef: 'Paragraph D'
        },
        {
          id: 'q6',
          questionNumber: 6,
          type: 'mcq',
          questionText: 'According to the passage, who first discovered coffee?',
          options: ['A monk', 'A goat herder named Kaldi', 'Pope Clement VIII', 'Arabian traders'],
          correctAnswer: 'A goat herder named Kaldi',
          passageRef: 'Paragraph A'
        },
        {
          id: 'q7',
          questionNumber: 7,
          type: 'mcq',
          questionText: 'What were English coffee houses called?',
          options: ['Qahveh khaneh', 'Penny universities', 'Social clubs', 'Tea houses'],
          correctAnswer: 'Penny universities',
          passageRef: 'Paragraph E'
        },
        {
          id: 'q8',
          questionNumber: 8,
          type: 'mcq',
          questionText: 'What event changed American drinking preferences from tea to coffee?',
          options: ['The Civil War', 'The Boston Tea Party', 'The arrival of coffee in New York', 'Pope Clement\'s approval'],
          correctAnswer: 'The Boston Tea Party',
          passageRef: 'Paragraph F'
        },
        {
          id: 'q9',
          questionNumber: 9,
          type: 'fill-blank',
          questionText: 'Coffee cultivation began on the _____ Peninsula.',
          correctAnswer: 'Arabian',
          acceptedAnswers: ['Arabian', 'arabian', 'ARABIAN'],
          passageRef: 'Paragraph C'
        },
        {
          id: 'q10',
          questionNumber: 10,
          type: 'fill-blank',
          questionText: 'Some Europeans called coffee the "bitter invention of _____".',
          correctAnswer: 'Satan',
          acceptedAnswers: ['Satan', 'satan', 'SATAN'],
          passageRef: 'Paragraph D'
        },
        {
          id: 'q11',
          questionNumber: 11,
          type: 'matching-headings',
          questionText: 'Which paragraph describes the spread of coffee to Europe?',
          options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
          correctAnswer: 'Paragraph D',
          passageRef: 'Paragraph D'
        },
        {
          id: 'q12',
          questionNumber: 12,
          type: 'matching-headings',
          questionText: 'Which paragraph mentions the effect of coffee on work quality?',
          options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
          correctAnswer: 'Paragraph E',
          passageRef: 'Paragraph E'
        },
        {
          id: 'q13',
          questionNumber: 13,
          type: 'short-answer',
          questionText: 'What drink did coffee replace as the common breakfast beverage in England?',
          correctAnswer: 'beer and wine',
          acceptedAnswers: ['beer and wine', 'beer', 'wine', 'Beer and wine', 'Beer', 'Wine'],
          passageRef: 'Paragraph E'
        }
      ]
    }
  ]
};

// ============================================
// localStorage Key
// ============================================
const STORAGE_KEY = 'reading_test_session';

// ============================================
// Helper
// ============================================
const formatTime = (seconds: number): string => formatTimerDisplay(seconds);

const getStatusColor = (correct: boolean | null): string => {
  if (correct === null) return 'bg-gray-100 border-gray-200';
  return correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
};


// ============================================
// Main Component
// ============================================
// Normalize DB data → ReadingTest shape
function normalizeReadingTest(
  rawData: Record<string, unknown>,
  testId?: string,
  testTitle?: string
): ReadingTest {
  // rawData may come from mock_tests.test_data (has passages[])
  // or may already be a full ReadingTest object
  const passages: ReadingTest['passages'] = [];

  const rawPassages = Array.isArray(rawData?.passages)
    ? (rawData.passages as Record<string, unknown>[])
    : [];

  let questionCounter = 1;

  rawPassages.forEach((p, passageIdx) => {
    const rawQuestions: Record<string, unknown>[] = Array.isArray(p?.questions)
      ? (p.questions as Record<string, unknown>[])
      : [];

    const normalizedQuestions: ReadingQuestion[] = rawQuestions.map((q) => {
      const qid = (q.id as string) || `p${passageIdx + 1}_q${questionCounter}`;
      const qNum = (q.questionNumber as number) || questionCounter;
      questionCounter++;
      return {
        id: qid,
        questionNumber: qNum,
        type: (q.type as ReadingQuestion['type']) || 'mcq',
        questionText: (q.questionText as string) || '',
        options: Array.isArray(q.options) ? (q.options as string[]) : undefined,
        correctAnswer: (q.correctAnswer as string) || '',
        acceptedAnswers: Array.isArray(q.acceptedAnswers)
          ? (q.acceptedAnswers as string[])
          : undefined,
        explanation: (q.explanation as string) || undefined,
        passageRef: (q.passageRef as string) || undefined,
        // Pass-through for grouped/table question types used by FullMockReadingPaper
        groupId: (q.groupId as string) || undefined,
        summaryData: (q.summaryData as string) || undefined,
        tableData: q.tableData as ReadingQuestion['tableData'] | undefined,
      };
    });

    const qStart = normalizedQuestions[0]?.questionNumber || 1;
    const qEnd = normalizedQuestions[normalizedQuestions.length - 1]?.questionNumber || qStart;

    passages.push({
      id: (p.id as string) || `passage-${passageIdx + 1}`,
      passageNumber: passageIdx + 1,
      title: (p.title as string) || `Passage ${passageIdx + 1}`,
      textContent: (p.textContent as string) || (p.content as string) || '',
      paragraphs: Array.isArray(p.paragraphs)
        ? (p.paragraphs as { label: string; content: string }[])
        : [],
      questionRange: { start: qStart, end: qEnd },
      questions: normalizedQuestions,
    });
  });

  const totalQuestions = passages.reduce((s, p) => s + p.questions.length, 0);

  return {
    id: testId || (rawData?.id as string) || 'db-reading-test',
    title: testTitle || (rawData?.title as string) || 'IELTS Reading Test',
    testType: ((rawData?.testType as string) || 'academic') as 'academic' | 'general',
    totalQuestions: totalQuestions || 40,
    timeLimit: (rawData?.timeLimit as number) || 3600,
    is_premium: (rawData?.is_premium as boolean) || false,
    instructions: (rawData?.instructions as string) || 'Read the passage carefully and answer all questions.',
    passages,
  };
}

export default function ReadingTestPage() {
  const location = useLocation();
  const stateData = location.state as { testData?: Record<string, unknown>; testId?: string; testTitle?: string } | null;

  // Build the test object — normalize DB format or fall back to sample
  const hasDbData =
    stateData?.testData &&
    typeof stateData.testData === 'object' &&
    Array.isArray((stateData.testData as Record<string, unknown>).passages) &&
    ((stateData.testData as Record<string, unknown>).passages as unknown[]).length > 0;

  const [test] = useState<ReadingTest>(
    hasDbData
      ? normalizeReadingTest(stateData!.testData as Record<string, unknown>, stateData?.testId, stateData?.testTitle)
      : SAMPLE_READING_TEST,
  );

  // Flat ordered question list — used to map r_N ↔ question ID at grade time.
  const allQuestions = test.passages.flatMap(p => p.questions ?? []);

  // Convert ReadingTest passages → ReadingPaperPassage[] for FullMockReadingPaper.
  const passages: ReadingPaperPassage[] = test.passages.map(p => ({
    title: p.title,
    textContent: p.textContent,
    paragraphs: p.paragraphs,
    questions: (p.questions ?? []).map(q => ({
      id: q.id,
      questionNumber: q.questionNumber,
      type: q.type,
      questionText: q.questionText,
      options: q.options,
      groupId: q.groupId,
      summaryData: q.summaryData,
      tableData: q.tableData,
    })),
  }));

  // ── Exam state ──────────────────────────────────────────────────────────────
  // Load any saved session once on mount (single localStorage read).
  const [initialSession] = useState<{
    answers?: Record<string, string>;
    timeRemaining?: number;
    activePassage?: number;
    flaggedQuestions?: Record<string, boolean>;
  } | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw) as { testId?: string; answers?: Record<string, string>; timeRemaining?: number; activePassage?: number; flaggedQuestions?: Record<string, boolean> };
      return s.testId === test.id ? s : null;
    } catch { return null; }
  });

  // Answers keyed by r_N (global question index) — matches FullMockReadingPaper.
  const [answers, setAnswers] = useState<Record<string, string>>(initialSession?.answers ?? {});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>(initialSession?.flaggedQuestions ?? {});
  const [activePassage, setActivePassage] = useState(initialSession?.activePassage ?? 0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<ReadingTestResult | null>(null);
  const [savedIndicator, setSavedIndicator] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Timer ─────────────────────────────────────────────────────────────────
  // onExpire ref lets us call handleSubmit after it is defined below.
  const onExpireRef = useRef<(() => void) | null>(null);
  const timer = useExamTimer({
    initialSeconds: initialSession?.timeRemaining ?? test.timeLimit,
    onExpire: () => onExpireRef.current?.(),
  });

  // ── Session persistence ───────────────────────────────────────────────────
  // Refs let each effect read the latest version of the other's values
  // without including them as dependencies — which would collapse both effects
  // into the same trigger cadence and re-introduce the throttle-suppression bug.
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const activePassageRef = useRef(activePassage);
  activePassageRef.current = activePassage;
  const flaggedQuestionsRef = useRef(flaggedQuestions);
  flaggedQuestionsRef.current = flaggedQuestions;
  const timerSecondsRef = useRef(timer.seconds);
  timerSecondsRef.current = timer.seconds;

  // Single timestamp ref shared by both effects.  When Effect 1 writes on an
  // answer/flag/passage change it stamps this ref, so Effect 2 correctly waits
  // the full 10 s before issuing its own timer-driven write.
  const lastSaveRef = useRef(0);

  // Effect 1 — IMMEDIATE: fires whenever the student changes an answer,
  // switches passage, or toggles a flag.  Never throttled.  Reads the current
  // timer seconds from a ref so it captures the right remaining time without
  // re-running every second.
  useEffect(() => {
    if (isSubmitted) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          testId: test.id,
          answers,
          timeRemaining: timerSecondsRef.current,
          activePassage,
          flaggedQuestions,
        }),
      );
      lastSaveRef.current = Date.now();
    } catch { /* storage quota */ }
  }, [answers, activePassage, flaggedQuestions, isSubmitted, test.id]);

  // Effect 2 — THROTTLED: fires every second with the timer but only writes
  // every ~10 s.  Uses the same lastSaveRef that Effect 1 updates, so an
  // immediate user-state save resets the window and prevents a double-write.
  useEffect(() => {
    if (isSubmitted) return;
    const now = Date.now();
    if (lastSaveRef.current !== 0 && now - lastSaveRef.current < 10_000) return;
    lastSaveRef.current = now;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          testId: test.id,
          answers: answersRef.current,
          timeRemaining: timer.seconds,
          activePassage: activePassageRef.current,
          flaggedQuestions: flaggedQuestionsRef.current,
        }),
      );
    } catch { /* storage quota */ }
  }, [timer.seconds, isSubmitted, test.id]);

  // ── Answer and flag handlers ──────────────────────────────────────────────
  const setAnswer = useCallback((key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    setSavedIndicator(true);
    savedTimerRef.current = setTimeout(() => setSavedIndicator(false), 2000);
  }, []);

  const toggleFlag = useCallback((key: string) => {
    setFlaggedQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    timer.stop();
    localStorage.removeItem(STORAGE_KEY);

    // Convert r_N answers → question-ID keyed map for gradeObjectiveTest.
    const answersById: Record<string, { answer: string }> = {};
    allQuestions.forEach((q, idx) => {
      answersById[q.id] = { answer: answers[`r_${idx}`] ?? '' };
    });

    const gradingResult = gradeObjectiveTest(
      answersById,
      allQuestions.map(q => ({
        id: q.id,
        questionNumber: q.questionNumber,
        correctAnswer: q.correctAnswer,
        acceptedAnswers: q.acceptedAnswers,
      })),
      'reading',
    );

    setResult({
      testId: test.id,
      totalQuestions: gradingResult.totalQuestions,
      correctAnswers: gradingResult.correctAnswers,
      incorrectAnswers: gradingResult.incorrectAnswers,
      unanswered: gradingResult.unanswered,
      score: gradingResult.percentage,
      bandScore: gradingResult.bandScore,
      timeTaken: test.timeLimit - timer.seconds,
      answers: gradingResult.gradedAnswers.map(ga => ({
        questionNumber: ga.questionNumber,
        userAnswer: ga.userAnswer,
        correctAnswer: ga.correctAnswer,
        isCorrect: ga.isCorrect,
      })),
    });
    setIsSubmitted(true);
  }, [allQuestions, answers, test.id, test.timeLimit, timer]);

  // Keep ref current so the timer's onExpire always calls the latest version.
  onExpireRef.current = handleSubmit;

  // ── Nav context / exit guard ──────────────────────────────────────────────
  // mode: 'exam' here matches what the route already sets via
  // <Layout mode="exam">, so this isn't changing anything about the visible
  // chrome — Navbar/Footer/MobileNav are already hidden. What this call
  // actually does: publishes onExitAttempt so Layout's useNavExitGuard can
  // catch the browser Back button and tab close/refresh while the test is
  // still in progress. Once submitted, there's nothing left to lose, so the
  // guard steps aside.
  const handleExitAttempt = useCallback(() => {
    if (isSubmitted) return true;
    return window.confirm('Leave the Reading test? Your progress on this section will be lost.');
  }, [isSubmitted]);

  useNavConfig({ mode: 'exam', title: test.title, onExitAttempt: handleExitAttempt });

  // ── Results screen ────────────────────────────────────────────────────────
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

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-600">{result.correctAnswers}</div>
                  <div className="text-sm text-emerald-700">Correct</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">{result.incorrectAnswers}</div>
                  <div className="text-sm text-red-700">Incorrect</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-gray-600">{result.unanswered}</div>
                  <div className="text-sm text-gray-700">Unanswered</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600">{result.correctAnswers}/{result.totalQuestions}</div>
                  <div className="text-sm text-amber-700">Raw Score</div>
                </div>
                <div className={`rounded-lg p-4 text-center ${getBandScoreColor(result.bandScore ?? 0)}`}>
                  <div className="text-3xl font-bold">{formatBandScore(result.bandScore ?? 0)}</div>
                  <div className="text-sm">Band Score</div>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className={`text-5xl font-bold mb-2 ${getBandScoreColor(result.bandScore ?? 0).split(' ')[0]}`}>
                  {formatBandScore(result.bandScore ?? 0)}
                </div>
                <div className="text-xl text-gray-700 mb-2">
                  {getBandScoreLevel(result.bandScore ?? 0)} User
                </div>
                <div className="text-gray-600">
                  {result.score.toFixed(1)}% accuracy | Time taken: {formatTime(result.timeTaken)}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => {
                    localStorage.removeItem(STORAGE_KEY);
                    setAnswers({});
                    setFlaggedQuestions({});
                    setActivePassage(0);
                    setIsSubmitted(false);
                    setResult(null);
                    timer.reset();
                    timer.start();
                  }}
                  variant="outline"
                  className="gap-2"
                >
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

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Answer Review</h2>
              <div className="space-y-4">
                {result.answers.map(answer => (
                  <div
                    key={answer.questionNumber}
                    className={`p-4 rounded-lg border ${getStatusColor(answer.isCorrect)}`}
                  >
                    <div className="flex items-start gap-3">
                      {answer.isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">Question {answer.questionNumber}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Your answer:{' '}
                          <span className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                            {answer.userAnswer || '(No answer)'}
                          </span>
                        </div>
                        {!answer.isCorrect && (
                          <div className="text-sm text-green-700 mt-1">
                            Correct answer: {answer.correctAnswer}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ── Exam interface (delegated entirely to FullMockReadingPaper) ───────────
  return (
    <FullMockReadingPaper
      passages={passages}
      answers={answers}
      activePassage={activePassage}
      setActivePassage={setActivePassage}
      setAnswer={setAnswer}
      flaggedQuestions={flaggedQuestions}
      toggleFlag={toggleFlag}
      timeDisplay={timer.display}
      timeWarning={timer.warning}
      savedIndicator={savedIndicator}
      onSubmit={handleSubmit}
    />
  );
}
