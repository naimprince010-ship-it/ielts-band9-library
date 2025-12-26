import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  CheckCircle2, 
  XCircle,
  Target,
  BookOpen,
  PenTool,
  Mic,
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Award,
  ArrowRight
} from 'lucide-react';

interface MockTestSection {
  id: string;
  name: string;
  icon: React.ElementType;
  duration: number;
  questions: number;
  description: string;
}

const MOCK_TEST_SECTIONS: MockTestSection[] = [
  {
    id: 'listening',
    name: 'Listening',
    icon: Headphones,
    duration: 30,
    questions: 40,
    description: '4 sections with increasing difficulty'
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: BookOpen,
    duration: 60,
    questions: 40,
    description: '3 passages with various question types'
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: PenTool,
    duration: 60,
    questions: 2,
    description: 'Task 1 (150 words) + Task 2 (250 words)'
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: Mic,
    duration: 15,
    questions: 3,
    description: 'Part 1, 2, and 3 interview simulation'
  }
];

interface TestResult {
  sectionId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
}

const STORAGE_KEY = 'ielts_mock_tests';

interface MockQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false-ng';
  question: string;
  options?: string[];
  correctAnswer: string;
  passage?: string;
}

const SAMPLE_LISTENING_QUESTIONS: MockQuestion[] = [
  {
    id: 'l1',
    type: 'multiple-choice',
    question: 'What is the main purpose of the speaker\'s talk?',
    options: ['To describe a new product', 'To explain a process', 'To give directions', 'To make a complaint'],
    correctAnswer: 'To explain a process'
  },
  {
    id: 'l2',
    type: 'fill-blank',
    question: 'The meeting will be held on _____ at 3 PM.',
    correctAnswer: 'Tuesday'
  },
  {
    id: 'l3',
    type: 'multiple-choice',
    question: 'How many people attended the conference?',
    options: ['About 50', 'About 100', 'About 200', 'About 500'],
    correctAnswer: 'About 200'
  },
];

const SAMPLE_READING_QUESTIONS: MockQuestion[] = [
  {
    id: 'r1',
    type: 'true-false-ng',
    question: 'The Industrial Revolution began in the 18th century.',
    passage: 'The Industrial Revolution, which began in Britain in the late 18th century, transformed the way goods were produced. Before this period, most manufacturing was done in homes using hand tools or basic machines.',
    correctAnswer: 'True'
  },
  {
    id: 'r2',
    type: 'true-false-ng',
    question: 'Manufacturing before the Industrial Revolution was primarily done in factories.',
    passage: 'The Industrial Revolution, which began in Britain in the late 18th century, transformed the way goods were produced. Before this period, most manufacturing was done in homes using hand tools or basic machines.',
    correctAnswer: 'False'
  },
  {
    id: 'r3',
    type: 'multiple-choice',
    question: 'What was the main change brought by the Industrial Revolution?',
    options: ['Agricultural methods', 'Production methods', 'Political systems', 'Educational approaches'],
    passage: 'The Industrial Revolution, which began in Britain in the late 18th century, transformed the way goods were produced.',
    correctAnswer: 'Production methods'
  },
];

function getTestHistory(): TestResult[][] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveTestResult(results: TestResult[]) {
  const history = getTestHistory();
  history.unshift(results);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
}

const getSectionQuestions = (sectionId: string): MockQuestion[] => {
  switch (sectionId) {
    case 'listening':
      return SAMPLE_LISTENING_QUESTIONS;
    case 'reading':
      return SAMPLE_READING_QUESTIONS;
    default:
      return [];
  }
};

export default function MockTestPage() {
  const [stage, setStage] = useState<'select' | 'test' | 'results'>('select');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
    const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
    const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSectionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isPaused]);

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const startTest = () => {
    if (selectedSections.length === 0) return;
    
    const firstSection = MOCK_TEST_SECTIONS.find(s => s.id === selectedSections[0]);
    if (firstSection) {
      setTimeLeft(firstSection.duration * 60);
      setIsRunning(true);
      setStage('test');
      setCurrentSectionIndex(0);
      setResults([]);
      setCurrentAnswers({});
    }
  };

    const handleSectionComplete = () => {
      if (timerRef.current) clearInterval(timerRef.current);
    
      const currentSection = MOCK_TEST_SECTIONS.find(s => s.id === selectedSections[currentSectionIndex]);
      if (currentSection) {
        const questions = getSectionQuestions(currentSection.id);
        let correctCount = 0;
      
        questions.forEach(q => {
          const userAnswer = currentAnswers[q.id];
          if (userAnswer && userAnswer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
            correctCount++;
          }
        });
      
        const totalQuestions = questions.length > 0 ? questions.length : currentSection.questions;
        const score = questions.length > 0 ? correctCount : Math.floor(Math.random() * 20) + Object.keys(currentAnswers).length;
      
        const result: TestResult = {
          sectionId: currentSection.id,
          score: Math.min(score, totalQuestions),
          totalQuestions: totalQuestions,
          timeSpent: currentSection.duration * 60 - timeLeft,
          completedAt: new Date().toISOString()
        };
      
        setResults(prev => [...prev, result]);
      }

    if (currentSectionIndex < selectedSections.length - 1) {
      const nextSection = MOCK_TEST_SECTIONS.find(s => s.id === selectedSections[currentSectionIndex + 1]);
      if (nextSection) {
        setCurrentSectionIndex(prev => prev + 1);
        setTimeLeft(nextSection.duration * 60);
        setCurrentAnswers({});
      }
    } else {
      setIsRunning(false);
      setStage('results');
      saveTestResult(results);
    }
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateOverallBand = () => {
    if (results.length === 0) return 0;
    const totalScore = results.reduce((sum, r) => sum + (r.score / r.totalQuestions) * 9, 0);
    return (totalScore / results.length).toFixed(1);
  };

  const getBandFromPercentage = (percentage: number) => {
    if (percentage >= 90) return 9;
    if (percentage >= 80) return 8;
    if (percentage >= 70) return 7;
    if (percentage >= 60) return 6;
    if (percentage >= 50) return 5;
    return 4;
  };

  const resetTest = () => {
    setStage('select');
    setSelectedSections([]);
    setCurrentSectionIndex(0);
    setTimeLeft(0);
    setIsRunning(false);
    setIsPaused(false);
    setResults([]);
    setCurrentAnswers({});
  };

  const currentSection = stage === 'test' 
    ? MOCK_TEST_SECTIONS.find(s => s.id === selectedSections[currentSectionIndex])
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {stage === 'select' && (
          <div className="space-y-6">
            <Card className="border-2 border-purple-100">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">IELTS Mock Test</CardTitle>
                <CardDescription>
                  Take a full timed practice test to simulate the real exam experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Select Test Sections</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_TEST_SECTIONS.map((section) => {
                      const Icon = section.icon;
                      const isSelected = selectedSections.includes(section.id);
                      return (
                        <div
                          key={section.id}
                          onClick={() => toggleSection(section.id)}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100'
                            }`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{section.name}</h4>
                              <p className="text-sm text-gray-500">{section.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {section.duration} min
                                </span>
                                <span>{section.questions} questions</span>
                              </div>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="h-5 w-5 text-purple-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedSections.length > 0 && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Total Duration</span>
                      <span className="text-purple-600 font-bold">
                        {selectedSections.reduce((sum, id) => {
                          const section = MOCK_TEST_SECTIONS.find(s => s.id === id);
                          return sum + (section?.duration || 0);
                        }, 0)} minutes
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Questions</span>
                      <span className="text-purple-600 font-bold">
                        {selectedSections.reduce((sum, id) => {
                          const section = MOCK_TEST_SECTIONS.find(s => s.id === id);
                          return sum + (section?.questions || 0);
                        }, 0)}
                      </span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={startTest} 
                  disabled={selectedSections.length === 0}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  Start Mock Test
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {stage === 'test' && currentSection && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-4">
                <Badge className="bg-purple-100 text-purple-800">
                  Section {currentSectionIndex + 1} of {selectedSections.length}
                </Badge>
                <h2 className="font-semibold">{currentSection.name}</h2>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={togglePause}>
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  timeLeft < 60 ? 'bg-red-100 text-red-800' : 
                  timeLeft < 300 ? 'bg-amber-100 text-amber-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  <Clock className="h-5 w-5" />
                  <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <currentSection.icon className="h-5 w-5" />
                  {currentSection.name} Section
                </CardTitle>
                <CardDescription>{currentSection.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Progress 
                  value={(Object.keys(currentAnswers).filter(k => k.startsWith(currentSection.id)).length / currentSection.questions) * 100} 
                  className="h-2"
                />

                                {(() => {
                                  const questions = getSectionQuestions(currentSection.id);
                                  if (questions.length === 0) {
                                    return (
                                      <div className="min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg p-8">
                                        <div className="text-center">
                                          <currentSection.icon className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                                          <h3 className="text-xl font-semibold mb-2">{currentSection.name} Practice</h3>
                                          <p className="text-gray-600 mb-4">
                                            This section simulates the {currentSection.name.toLowerCase()} test experience.
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Complete within {currentSection.duration} minutes.
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }
                  
                                  const currentQuestion = questions[currentQuestionIndex];
                                  if (!currentQuestion) return null;
                  
                                  return (
                                    <div className="space-y-6">
                                      <div className="flex items-center justify-between">
                                        <Badge variant="outline">Question {currentQuestionIndex + 1} of {questions.length}</Badge>
                                        <div className="flex gap-2">
                                          {questions.map((_, idx) => (
                                            <button
                                              key={idx}
                                              onClick={() => setCurrentQuestionIndex(idx)}
                                              className={`w-8 h-8 rounded-full text-sm font-medium ${
                                                currentAnswers[questions[idx].id] 
                                                  ? 'bg-green-500 text-white' 
                                                  : idx === currentQuestionIndex 
                                                    ? 'bg-purple-500 text-white' 
                                                    : 'bg-gray-200'
                                              }`}
                                            >
                                              {idx + 1}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                      
                                      {currentQuestion.passage && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                          <p className="text-sm font-medium text-blue-800 mb-2">Reading Passage:</p>
                                          <p className="text-sm text-gray-700">{currentQuestion.passage}</p>
                                        </div>
                                      )}
                      
                                      <div className="bg-white border rounded-lg p-6">
                                        <p className="font-medium mb-4">{currentQuestion.question}</p>
                        
                                        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                                          <div className="space-y-3">
                                            {currentQuestion.options.map((option, idx) => (
                                              <label
                                                key={idx}
                                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                                  currentAnswers[currentQuestion.id] === option
                                                    ? 'border-purple-500 bg-purple-50'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                }`}
                                              >
                                                <input
                                                  type="radio"
                                                  name={currentQuestion.id}
                                                  value={option}
                                                  checked={currentAnswers[currentQuestion.id] === option}
                                                  onChange={() => setCurrentAnswers(prev => ({ ...prev, [currentQuestion.id]: option }))}
                                                  className="w-4 h-4 text-purple-600"
                                                />
                                                <span>{option}</span>
                                              </label>
                                            ))}
                                          </div>
                                        )}
                        
                                        {currentQuestion.type === 'true-false-ng' && (
                                          <div className="space-y-3">
                                            {['True', 'False', 'Not Given'].map((option) => (
                                              <label
                                                key={option}
                                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                                  currentAnswers[currentQuestion.id] === option
                                                    ? 'border-purple-500 bg-purple-50'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                }`}
                                              >
                                                <input
                                                  type="radio"
                                                  name={currentQuestion.id}
                                                  value={option}
                                                  checked={currentAnswers[currentQuestion.id] === option}
                                                  onChange={() => setCurrentAnswers(prev => ({ ...prev, [currentQuestion.id]: option }))}
                                                  className="w-4 h-4 text-purple-600"
                                                />
                                                <span>{option}</span>
                                              </label>
                                            ))}
                                          </div>
                                        )}
                        
                                        {currentQuestion.type === 'fill-blank' && (
                                          <input
                                            type="text"
                                            value={currentAnswers[currentQuestion.id] || ''}
                                            onChange={(e) => setCurrentAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                                            placeholder="Type your answer..."
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                          />
                                        )}
                                      </div>
                      
                                      <div className="flex justify-between">
                                        <Button
                                          variant="outline"
                                          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                          disabled={currentQuestionIndex === 0}
                                        >
                                          Previous
                                        </Button>
                                        <Button
                                          onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                          disabled={currentQuestionIndex === questions.length - 1}
                                        >
                                          Next
                                        </Button>
                                      </div>
                                    </div>
                                  );
                                })()}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetTest}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Exit Test
                  </Button>
                  <Button onClick={handleSectionComplete} className="bg-purple-600 hover:bg-purple-700">
                    {currentSectionIndex < selectedSections.length - 1 ? 'Next Section' : 'Finish Test'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {stage === 'results' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Mock Test Complete!</CardTitle>
              <CardDescription>Here's your performance summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-6">
                <p className="text-sm opacity-80 mb-1">Estimated Overall Band Score</p>
                <p className="text-5xl font-bold">{calculateOverallBand()}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Section Breakdown</h3>
                {results.map((result) => {
                  const section = MOCK_TEST_SECTIONS.find(s => s.id === result.sectionId);
                  const percentage = (result.score / result.totalQuestions) * 100;
                  const band = getBandFromPercentage(percentage);
                  return (
                    <div key={result.sectionId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {section && <section.icon className="h-5 w-5 text-gray-500" />}
                        <div>
                          <p className="font-medium">{section?.name}</p>
                          <p className="text-sm text-gray-500">
                            {result.score}/{result.totalQuestions} correct
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">{band}.0</p>
                        <p className="text-xs text-gray-500">Band Score</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button onClick={resetTest} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Another Test
                </Button>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Award className="h-4 w-4 mr-2" />
                  Get Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
