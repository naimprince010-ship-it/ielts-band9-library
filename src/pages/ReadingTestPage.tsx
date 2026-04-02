import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Send,
  RotateCcw,
  Home,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  ReadingTest,
  ReadingQuestion,
  ReadingTestSession,
  UserAnswer,
  QuestionStatus,
  ReadingTestResult
} from '@/types';
import {
  gradeObjectiveTest,
  formatBandScore,
  getBandScoreColor,
  getBandScoreLevel
} from '@/utils/scoring';

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
// localStorage Keys
// ============================================
const STORAGE_KEY = 'reading_test_session';

// ============================================
// Helper Functions
// ============================================
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getStatusColor = (status: QuestionStatus): string => {
  switch (status) {
    case 'unseen':
      return 'bg-gray-200 text-gray-600 hover:bg-gray-300';
    case 'seen':
      return 'bg-gray-300 text-gray-700 hover:bg-gray-400';
    case 'answered':
      return 'bg-emerald-500 text-white hover:bg-emerald-600';
    case 'flagged':
      return 'bg-amber-400 text-amber-900 hover:bg-amber-500';
    default:
      return 'bg-gray-200 text-gray-600';
  }
};


// ============================================
// Main Component
// ============================================
export default function ReadingTestPage() {
  const location = useLocation();
  const stateData = location.state as { testData?: ReadingTest; testId?: string; testTitle?: string } | null;
  const hasValidData = stateData?.testData && Array.isArray(stateData.testData.passages) && stateData.testData.passages.length > 0;
  const [test] = useState<ReadingTest>(hasValidData ? (stateData!.testData as ReadingTest) : SAMPLE_READING_TEST);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(test.timeLimit);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<ReadingTestResult | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [startedAt] = useState<number>(Date.now());
  const [showPassage, setShowPassage] = useState(true);

  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const passagePaneRef = useRef<HTMLDivElement>(null);
  const questionPaneRef = useRef<HTMLDivElement>(null);

  const currentPassage = Array.isArray(test?.passages) ? (test!.passages[currentPassageIndex] || test!.passages[0]) : undefined;
  const allQuestions = Array.isArray(test?.passages) ? test!.passages.flatMap(p => p?.questions || []) : [];

  // ============================================
  // Load session from localStorage on mount
  // ============================================
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const session: ReadingTestSession = JSON.parse(savedSession);
        if (session.testId === test.id && !session.isSubmitted) {
          setAnswers(session.answers);
          setTimeRemaining(session.timeRemaining);
          setCurrentPassageIndex(session.currentPassage - 1);
        }
      } catch (e) {
        console.error('Failed to load session:', e);
      }
    }
  }, [test.id]);

  // ============================================
  // Save session to localStorage on every change
  // ============================================
  const saveSession = useCallback(() => {
    if (isSubmitted) return;

    const session: ReadingTestSession = {
      testId: test.id,
      startedAt,
      timeRemaining,
      answers,
      currentPassage: currentPassageIndex + 1,
      currentQuestion: 1,
      isSubmitted: false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [test.id, startedAt, timeRemaining, answers, currentPassageIndex, isSubmitted]);

  useEffect(() => {
    saveSession();
  }, [saveSession]);

  // ============================================
  // Timer countdown
  // ============================================
  useEffect(() => {
    if (isSubmitted || timeRemaining <= 0) return;

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
  }, [isSubmitted]);

  // ============================================
  // Handle answer change
  // ============================================
  const handleAnswerChange = (questionId: string, questionNumber: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        questionNumber,
        answer: value,
        status: value ? 'answered' : 'seen',
        answeredAt: Date.now()
      }
    }));
  };

  // ============================================
  // Toggle flag for review
  // ============================================
  const toggleFlag = (questionId: string, questionNumber: number) => {
    setAnswers(prev => {
      const current = prev[questionId];
      const newStatus: QuestionStatus = current?.status === 'flagged'
        ? (current.answer ? 'answered' : 'seen')
        : 'flagged';

      return {
        ...prev,
        [questionId]: {
          questionId,
          questionNumber,
          answer: current?.answer || '',
          status: newStatus,
          answeredAt: Date.now()
        }
      };
    });
  };

  // ============================================
  // Get question status
  // ============================================
  const getQuestionStatus = (questionId: string): QuestionStatus => {
    return answers[questionId]?.status || 'unseen';
  };

  // ============================================
  // Scroll to question
  // ============================================
  const scrollToQuestion = (questionNumber: number) => {
    const question = allQuestions.find(q => q.questionNumber === questionNumber);
    if (!question) return;

    // Find which passage this question belongs to
    const passageIndex = (test?.passages || []).findIndex(p =>
      p?.questionRange && questionNumber >= p.questionRange.start && questionNumber <= p.questionRange.end
    );

    if (passageIndex !== currentPassageIndex) {
      setCurrentPassageIndex(passageIndex);
    }

    // Scroll to question after a short delay to allow passage change
    setTimeout(() => {
      const ref = questionRefs.current[questionNumber];
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    // Mark as seen if unseen
    if (!answers[question.id]) {
      setAnswers(prev => ({
        ...prev,
        [question.id]: {
          questionId: question.id,
          questionNumber,
          answer: '',
          status: 'seen',
          answeredAt: Date.now()
        }
      }));
    }
  };

  // ============================================
  // Submit test
  // ============================================
  const handleSubmit = () => {
    const timeTaken = test.timeLimit - timeRemaining;

    // Use the new grading utility for proper IELTS band score calculation
    const gradingResult = gradeObjectiveTest(
      answers,
      allQuestions.map(q => ({
        id: q.id,
        questionNumber: q.questionNumber,
        correctAnswer: q.correctAnswer,
        acceptedAnswers: q.acceptedAnswers
      })),
      'reading'
    );

    const testResult: ReadingTestResult = {
      testId: test.id,
      totalQuestions: gradingResult.totalQuestions,
      correctAnswers: gradingResult.correctAnswers,
      incorrectAnswers: gradingResult.incorrectAnswers,
      unanswered: gradingResult.unanswered,
      score: gradingResult.percentage,
      bandScore: gradingResult.bandScore,
      timeTaken,
      answers: gradingResult.gradedAnswers.map(ga => ({
        questionNumber: ga.questionNumber,
        userAnswer: ga.userAnswer,
        correctAnswer: ga.correctAnswer,
        isCorrect: ga.isCorrect
      }))
    };

    setResult(testResult);
    setIsSubmitted(true);
    setShowConfirmSubmit(false);

    // Update localStorage with submitted status
    const session: ReadingTestSession = {
      testId: test.id,
      startedAt,
      timeRemaining,
      answers,
      currentPassage: currentPassageIndex + 1,
      currentQuestion: 1,
      isSubmitted: true,
      submittedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  };

  // ============================================
  // Reset test
  // ============================================
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setTimeRemaining(test.timeLimit);
    setCurrentPassageIndex(0);
    setIsSubmitted(false);
    setResult(null);
  };

  // ============================================
  // Render Question Input
  // ============================================
  const renderQuestionInput = (question: ReadingQuestion) => {
    const currentAnswer = answers[question.id]?.answer || '';

    switch (question.type) {
      case 'mcq':
      case 'true-false-not-given':
      case 'yes-no-not-given':
      case 'matching-headings':
        return (
          <RadioGroup
            value={currentAnswer}
            onValueChange={(value) => handleAnswerChange(question.id, question.questionNumber, value)}
            className="space-y-2"
            disabled={isSubmitted}
          >
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
                <Label
                  htmlFor={`${question.id}-${idx}`}
                  className={`cursor-pointer ${isSubmitted && option === question.correctAnswer
                    ? 'text-green-600 font-medium'
                    : isSubmitted && currentAnswer === option && option !== question.correctAnswer
                      ? 'text-red-600 line-through'
                      : ''
                    }`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'fill-blank':
      case 'sentence-completion':
      case 'short-answer':
        return (
          <div className="space-y-2">
            <Input
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(question.id, question.questionNumber, e.target.value)}
              placeholder="Type your answer..."
              disabled={isSubmitted}
              className={`max-w-md ${isSubmitted
                ? (question.acceptedAnswers?.includes(currentAnswer) || currentAnswer.toLowerCase() === question.correctAnswer.toLowerCase())
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : ''
                }`}
            />
            {isSubmitted && (
              <p className="text-sm text-green-600">
                Correct answer: {question.correctAnswer}
              </p>
            )}
          </div>
        );

      default:
        return (
          <Input
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(question.id, question.questionNumber, e.target.value)}
            placeholder="Type your answer..."
            disabled={isSubmitted}
          />
        );
    }
  };

  // ============================================
  // Results Screen
  // ============================================
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
                  <div className="text-3xl font-bold text-amber-600">{result.correctAnswers}/40</div>
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

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Answer Review</h2>
              <div className="space-y-4">
                {result.answers.map((answer) => (
                  <div
                    key={answer.questionNumber}
                    className={`p-4 rounded-lg border ${answer.isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                      }`}
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
                          Your answer: <span className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
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

  // ============================================
  // Main Test Interface
  // ============================================
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
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
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

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Submit Test?</h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to submit? You have answered {Object.values(answers).filter(a => a.answer).length} out of {allQuestions.length} questions.
              </p>
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

      {/* Split Screen Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane - Passage */}
        <div
          ref={passagePaneRef}
          className={`${showPassage ? 'w-1/2' : 'w-0'} transition-all duration-300 border-r bg-white overflow-y-auto`}
        >
          <div className="p-6">
            {/* Passage Navigation */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {test.passages.map((_, idx) => (
                  <Button
                    key={idx}
                    variant={idx === currentPassageIndex ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPassageIndex(idx)}
                  >
                    Passage {idx + 1}
                  </Button>
                ))}
              </div>
              <Badge variant="secondary">
                Questions {currentPassage?.questionRange?.start || 1}-{currentPassage?.questionRange?.end || currentPassage?.questions?.length || 0}
              </Badge>
            </div>

            {/* Passage Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentPassage?.title || 'Passage'}</h2>

            {/* Passage Content */}
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentPassage?.textContent || '' }}
            />
          </div>
        </div>

        {/* Toggle Passage Button (Mobile) */}
        <button
          onClick={() => setShowPassage(!showPassage)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-indigo-600 text-white p-2 rounded-r-lg shadow-lg md:hidden"
        >
          {showPassage ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>

        {/* Right Pane - Questions */}
        <div
          ref={questionPaneRef}
          className={`${showPassage ? 'w-1/2' : 'w-full'} transition-all duration-300 bg-gray-50 overflow-y-auto`}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Questions {currentPassage?.questionRange?.start || 1}-{currentPassage?.questionRange?.end || currentPassage?.questions?.length || 0}
            </h3>

            <div className="space-y-6">
              {currentPassage?.questions?.map((question) => (
                <div
                  key={question.id}
                  ref={(el) => { questionRefs.current[question.questionNumber] = el; }}
                  className="bg-white rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStatusColor(getQuestionStatus(question.id))
                        }`}>
                        {question.questionNumber}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {question.type.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFlag(question.id, question.questionNumber)}
                      className={getQuestionStatus(question.id) === 'flagged' ? 'text-amber-600' : 'text-gray-400'}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-gray-800 mb-4">{question.questionText}</p>

                  {question.passageRef && (
                    <p className="text-sm text-indigo-600 mb-3">Reference: {question.passageRef}</p>
                  )}

                  {renderQuestionInput(question)}
                </div>
              ))}
            </div>

            {/* Passage Navigation at Bottom */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPassageIndex(prev => Math.max(0, prev - 1))}
                disabled={currentPassageIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous Passage
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPassageIndex(prev => Math.min(test.passages.length - 1, prev + 1))}
                disabled={currentPassageIndex === test.passages.length - 1}
                className="gap-2"
              >
                Next Passage
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Palette (Footer) */}
      <footer className="bg-white border-t shadow-lg px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-gray-200"></span> Unseen
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-emerald-500"></span> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-amber-400"></span> Flagged
            </span>
          </div>

          <div className="flex flex-wrap gap-1 justify-center max-w-2xl">
            {allQuestions.map((question) => (
              <button
                key={question.questionNumber}
                onClick={() => scrollToQuestion(question.questionNumber)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${getStatusColor(getQuestionStatus(question.id))
                  }`}
              >
                {question.questionNumber}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            {Object.values(answers).filter(a => a.answer).length} / {allQuestions.length} answered
          </div>
        </div>
      </footer>
    </div>
  );
}
