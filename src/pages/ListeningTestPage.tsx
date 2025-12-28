import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Volume2, 
  VolumeX,
  Flag, 
  AlertCircle,
  CheckCircle2,
  Send,
  RotateCcw,
  Home,
  Headphones,
  Play,
  Clock,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ListeningTest, 
  ListeningQuestion,
  ListeningTestSession,
  UserAnswer,
  QuestionStatus,
  ListeningTestResult,
  AudioState
} from '@/types';
import { 
  gradeObjectiveTest, 
  formatBandScore, 
  getBandScoreColor,
  getBandScoreLevel
} from '@/utils/scoring';

// ============================================
// Sample Listening Test Data
// ============================================
const SAMPLE_LISTENING_TEST: ListeningTest = {
  id: 'listening-test-1',
  title: 'Listening Test 1',
  totalQuestions: 16,
  audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Demo audio
  audioDuration: 120, // 2 minutes for demo (normally ~30 min)
  transferTime: 120, // 2 minutes for computer-delivered test
  is_premium: false,
  instructions: 'Listen to the audio and answer questions 1-16. You will hear the recording ONCE only.',
  sections: [
    {
      id: 'section-1',
      sectionNumber: 1,
      title: 'Section 1: Conversation',
      description: 'A conversation between two people about booking a hotel room.',
      audioStartTime: 0,
      audioEndTime: 30,
      questionRange: { start: 1, end: 4 },
      questions: [
        {
          id: 'lq1',
          questionNumber: 1,
          type: 'fill-blank',
          questionText: 'The guest wants to book a room for _____ nights.',
          correctAnswer: 'three',
          acceptedAnswers: ['three', '3', 'Three'],
          wordLimit: 1
        },
        {
          id: 'lq2',
          questionNumber: 2,
          type: 'mcq',
          questionText: 'What type of room does the guest prefer?',
          options: ['Single room', 'Double room', 'Suite', 'Family room'],
          correctAnswer: 'Double room'
        },
        {
          id: 'lq3',
          questionNumber: 3,
          type: 'fill-blank',
          questionText: 'The total cost of the stay is $_____ .',
          correctAnswer: '450',
          acceptedAnswers: ['450', '450.00'],
          wordLimit: 1
        },
        {
          id: 'lq4',
          questionNumber: 4,
          type: 'mcq',
          questionText: 'What is included in the room rate?',
          options: ['Breakfast only', 'Dinner only', 'Breakfast and dinner', 'No meals'],
          correctAnswer: 'Breakfast only'
        }
      ]
    },
    {
      id: 'section-2',
      sectionNumber: 2,
      title: 'Section 2: Monologue',
      description: 'A tour guide giving information about a museum.',
      audioStartTime: 30,
      audioEndTime: 60,
      questionRange: { start: 5, end: 8 },
      questions: [
        {
          id: 'lq5',
          questionNumber: 5,
          type: 'mcq',
          questionText: 'When was the museum established?',
          options: ['1850', '1920', '1965', '2001'],
          correctAnswer: '1920'
        },
        {
          id: 'lq6',
          questionNumber: 6,
          type: 'fill-blank',
          questionText: 'The museum has _____ permanent exhibitions.',
          correctAnswer: 'five',
          acceptedAnswers: ['five', '5', 'Five'],
          wordLimit: 1
        },
        {
          id: 'lq7',
          questionNumber: 7,
          type: 'mcq',
          questionText: 'What is the most popular exhibit?',
          options: ['Ancient artifacts', 'Modern art', 'Natural history', 'Space exploration'],
          correctAnswer: 'Ancient artifacts'
        },
        {
          id: 'lq8',
          questionNumber: 8,
          type: 'fill-blank',
          questionText: 'The museum is open from _____ am to 6 pm.',
          correctAnswer: '9',
          acceptedAnswers: ['9', 'nine', 'Nine'],
          wordLimit: 1
        }
      ]
    },
    {
      id: 'section-3',
      sectionNumber: 3,
      title: 'Section 3: Discussion',
      description: 'A discussion between students about a research project.',
      audioStartTime: 60,
      audioEndTime: 90,
      questionRange: { start: 9, end: 12 },
      questions: [
        {
          id: 'lq9',
          questionNumber: 9,
          type: 'mcq',
          questionText: 'What is the main topic of the research project?',
          options: ['Climate change', 'Urban development', 'Education reform', 'Healthcare systems'],
          correctAnswer: 'Climate change'
        },
        {
          id: 'lq10',
          questionNumber: 10,
          type: 'fill-blank',
          questionText: 'The deadline for the project is _____ .',
          correctAnswer: 'Friday',
          acceptedAnswers: ['Friday', 'friday', 'FRIDAY'],
          wordLimit: 1
        },
        {
          id: 'lq11',
          questionNumber: 11,
          type: 'mcq',
          questionText: 'How many sources do they need to cite?',
          options: ['At least 5', 'At least 10', 'At least 15', 'At least 20'],
          correctAnswer: 'At least 10'
        },
        {
          id: 'lq12',
          questionNumber: 12,
          type: 'fill-blank',
          questionText: 'They will meet in the _____ to work together.',
          correctAnswer: 'library',
          acceptedAnswers: ['library', 'Library', 'LIBRARY'],
          wordLimit: 1
        }
      ]
    },
    {
      id: 'section-4',
      sectionNumber: 4,
      title: 'Section 4: Lecture',
      description: 'A university lecture on renewable energy.',
      audioStartTime: 90,
      audioEndTime: 120,
      questionRange: { start: 13, end: 16 },
      questions: [
        {
          id: 'lq13',
          questionNumber: 13,
          type: 'mcq',
          questionText: 'What percentage of global energy comes from renewable sources?',
          options: ['10%', '20%', '30%', '40%'],
          correctAnswer: '20%'
        },
        {
          id: 'lq14',
          questionNumber: 14,
          type: 'fill-blank',
          questionText: 'Solar energy has grown by _____ percent in the last decade.',
          correctAnswer: '300',
          acceptedAnswers: ['300', 'three hundred'],
          wordLimit: 2
        },
        {
          id: 'lq15',
          questionNumber: 15,
          type: 'mcq',
          questionText: 'Which country leads in wind energy production?',
          options: ['USA', 'China', 'Germany', 'India'],
          correctAnswer: 'China'
        },
        {
          id: 'lq16',
          questionNumber: 16,
          type: 'fill-blank',
          questionText: 'The lecturer predicts renewable energy will dominate by _____ .',
          correctAnswer: '2050',
          acceptedAnswers: ['2050', 'twenty fifty'],
          wordLimit: 2
        }
      ]
    }
  ]
};

// ============================================
// localStorage Keys
// ============================================
const STORAGE_KEY = 'listening_test_session';

// ============================================
// Helper Functions
// ============================================
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
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
export default function ListeningTestPage() {
  const [test] = useState<ListeningTest>(SAMPLE_LISTENING_TEST);
  const [audioState, setAudioState] = useState<AudioState>('not-started');
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [transferTimeRemaining, setTransferTimeRemaining] = useState(test.transferTime);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<ListeningTestResult | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const allQuestions = test.sections.flatMap(s => s.questions);

  // ============================================
  // Load session from localStorage on mount
  // ============================================
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const session: ListeningTestSession = JSON.parse(savedSession);
        if (session.testId === test.id && !session.isSubmitted) {
          setAnswers(session.answers);
          setAudioState(session.audioState);
          setTransferTimeRemaining(session.transferTimeRemaining);
          setStartedAt(session.startedAt);
          
          // If audio was playing, we can't resume it (IELTS rule - no replay)
          // So we move to transfer time if audio was in progress
          if (session.audioState === 'playing') {
            setAudioState('transfer-time');
          }
        }
      } catch (e) {
        console.error('Failed to load session:', e);
      }
    }
  }, [test.id, test.transferTime]);

  // ============================================
  // Save session to localStorage on every change
  // ============================================
  const saveSession = useCallback(() => {
    if (isSubmitted) return;
    
    const session: ListeningTestSession = {
      testId: test.id,
      startedAt: startedAt || Date.now(),
      audioState,
      audioCurrentTime,
      transferTimeRemaining,
      answers,
      currentSection: 1,
      isSubmitted: false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [test.id, startedAt, audioState, audioCurrentTime, transferTimeRemaining, answers, isSubmitted]);

  useEffect(() => {
    saveSession();
  }, [saveSession]);

  // ============================================
  // Transfer time countdown
  // ============================================
  useEffect(() => {
    if (audioState !== 'transfer-time' || isSubmitted) return;

    const timer = setInterval(() => {
      setTransferTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [audioState, isSubmitted]);

  // ============================================
  // Audio event handlers
  // ============================================
  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = () => {
    setAudioState('transfer-time');
  };

  // ============================================
  // Start test after sound check
  // ============================================
  const handleStartTest = () => {
    setAudioState('playing');
    setStartedAt(Date.now());
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // ============================================
  // Test sound check
  // ============================================
  const handleTestSound = () => {
    setAudioState('test-sound');
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      // Play for 3 seconds then pause
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 3000);
    }
  };

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
    const ref = questionRefs.current[questionNumber];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Mark as seen if unseen
    const question = allQuestions.find(q => q.questionNumber === questionNumber);
    if (question && !answers[question.id]) {
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
    // Use the new grading utility for proper IELTS band score calculation
    const gradingResult = gradeObjectiveTest(
      answers,
      allQuestions.map(q => ({
        id: q.id,
        questionNumber: q.questionNumber,
        correctAnswer: q.correctAnswer,
        acceptedAnswers: q.acceptedAnswers
      })),
      'listening'
    );

    const testResult: ListeningTestResult = {
      testId: test.id,
      totalQuestions: gradingResult.totalQuestions,
      correctAnswers: gradingResult.correctAnswers,
      incorrectAnswers: gradingResult.incorrectAnswers,
      unanswered: gradingResult.unanswered,
      score: gradingResult.percentage,
      bandScore: gradingResult.bandScore,
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

    // Stop audio if still playing
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Update localStorage with submitted status
    const session: ListeningTestSession = {
      testId: test.id,
      startedAt: startedAt || Date.now(),
      audioState: 'finished',
      audioCurrentTime,
      transferTimeRemaining,
      answers,
      currentSection: 1,
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
    setAudioState('not-started');
    setAudioCurrentTime(0);
    setTransferTimeRemaining(test.transferTime);
    setStartedAt(null);
    setIsSubmitted(false);
    setResult(null);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // ============================================
  // Toggle mute
  // ============================================
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // ============================================
  // Render Question Input
  // ============================================
  const renderQuestionInput = (question: ListeningQuestion) => {
    const currentAnswer = answers[question.id]?.answer || '';

    switch (question.type) {
      case 'mcq':
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
                  className={`cursor-pointer ${
                    isSubmitted && option === question.correctAnswer 
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
              placeholder={question.wordLimit ? `No more than ${question.wordLimit} word(s)` : 'Type your answer...'}
              disabled={isSubmitted}
              className={`max-w-md ${
                isSubmitted 
                  ? (question.acceptedAnswers?.some(a => a.toLowerCase() === currentAnswer.toLowerCase()) || 
                     currentAnswer.toLowerCase() === question.correctAnswer.toLowerCase())
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
                  {result.score.toFixed(1)}% accuracy
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
                    className={`p-4 rounded-lg border ${
                      answer.isCorrect 
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
  // Pre-Test Screen (Sound Check)
  // ============================================
  if (audioState === 'not-started' || audioState === 'test-sound') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-10 w-10 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{test.title}</h1>
              <p className="text-gray-600">IELTS Listening Practice</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-amber-800 mb-2">Important Instructions:</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>- You will hear the recording ONCE only</li>
                <li>- You cannot pause or replay the audio</li>
                <li>- Answer questions while listening</li>
                <li>- You will have {test.transferTime / 60} minutes to review after audio ends</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Test your sound</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleTestSound}
                  className="gap-2"
                >
                  <Play className="h-4 w-4" />
                  Play Sample
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Audio Duration</span>
                </div>
                <Badge variant="secondary">{formatTime(test.audioDuration)}</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Questions</span>
                </div>
                <Badge variant="secondary">{test.totalQuestions} questions</Badge>
              </div>
            </div>

            <Button 
              onClick={handleStartTest}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 gap-2"
              size="lg"
            >
              <Play className="h-5 w-5" />
              Start Listening Test
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Make sure your headphones are connected and volume is set properly.
            </p>
          </CardContent>
        </Card>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={test.audioUrl}
          onTimeUpdate={handleAudioTimeUpdate}
          onEnded={handleAudioEnded}
          preload="auto"
        />
      </div>
    );
  }

  // ============================================
  // Main Test Interface
  // ============================================
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Fixed Header */}
      <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            <Home className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">{test.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Audio Progress / Transfer Time */}
          {audioState === 'playing' && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 rounded-lg">
                <Headphones className="h-4 w-4 text-indigo-600 animate-pulse" />
                <span className="text-sm font-medium text-indigo-700">
                  {formatTime(audioCurrentTime)} / {formatTime(test.audioDuration)}
                </span>
              </div>
              <Progress 
                value={(audioCurrentTime / test.audioDuration) * 100} 
                className="w-32 h-2"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="p-2"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-gray-500" />
                ) : (
                  <Volume2 className="h-4 w-4 text-indigo-600" />
                )}
              </Button>
            </div>
          )}

          {audioState === 'transfer-time' && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${
              transferTimeRemaining < 60 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
            }`}>
              <Clock className="h-5 w-5" />
              <span>Transfer Time: {formatTime(transferTimeRemaining)}</span>
            </div>
          )}
          
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

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={test.audioUrl}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Submit Test?</h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to submit? You have answered {Object.values(answers).filter(a => a.answer).length} out of {allQuestions.length} questions.
              </p>
              {audioState === 'playing' && (
                <p className="text-amber-600 text-sm mb-4">
                  Warning: The audio is still playing. Submitting now will end your test early.
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

      {/* Questions - All Sections on One Scrollable Page */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {test.sections.map((section) => (
            <div key={section.id} className="space-y-4">
              {/* Section Header */}
              <div className="bg-indigo-600 text-white rounded-lg p-4">
                <h2 className="text-xl font-bold">{section.title}</h2>
                {section.description && (
                  <p className="text-indigo-100 text-sm mt-1">{section.description}</p>
                )}
                <Badge className="mt-2 bg-indigo-500">
                  Questions {section.questionRange.start}-{section.questionRange.end}
                </Badge>
              </div>

              {/* Section Questions */}
              <div className="space-y-4">
                {section.questions.map((question) => (
                  <Card
                    key={question.id}
                    ref={(el) => { questionRefs.current[question.questionNumber] = el; }}
                    className="shadow-sm"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            getStatusColor(getQuestionStatus(question.id))
                          }`}>
                            {question.questionNumber}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {question.type.replace(/-/g, ' ')}
                          </Badge>
                          {question.wordLimit && (
                            <Badge variant="secondary" className="text-xs">
                              Max {question.wordLimit} word(s)
                            </Badge>
                          )}
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

                      {renderQuestionInput(question)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
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
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  getStatusColor(getQuestionStatus(question.id))
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
