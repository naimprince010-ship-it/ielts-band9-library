import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { readNextPath, trackFunnelEvent } from '@/lib/funnel';
import { 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Brain,
  BookOpen,
  GraduationCap,
  Trophy,
  Sparkles
} from 'lucide-react';

interface DiagnosticQuestion {
  id: string;
  category: 'vocabulary' | 'grammar' | 'reading';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // Vocabulary - Easy
  {
    id: 'v1',
    category: 'vocabulary',
    difficulty: 'easy',
    question: 'Choose the correct synonym for "important":',
    options: ['trivial', 'significant', 'minor', 'small'],
    correctAnswer: 1,
    explanation: '"Significant" means important or notable.'
  },
  {
    id: 'v2',
    category: 'vocabulary',
    difficulty: 'easy',
    question: 'The word "abundant" means:',
    options: ['scarce', 'limited', 'plentiful', 'rare'],
    correctAnswer: 2,
    explanation: '"Abundant" means existing in large quantities; plentiful.'
  },
  // Vocabulary - Medium
  {
    id: 'v3',
    category: 'vocabulary',
    difficulty: 'medium',
    question: 'Choose the best word to complete: "The government implemented _____ measures to reduce pollution."',
    options: ['stringent', 'lenient', 'casual', 'random'],
    correctAnswer: 0,
    explanation: '"Stringent" means strict or severe, appropriate for pollution control measures.'
  },
  {
    id: 'v4',
    category: 'vocabulary',
    difficulty: 'medium',
    question: '"Ubiquitous" is closest in meaning to:',
    options: ['rare', 'everywhere', 'unique', 'ancient'],
    correctAnswer: 1,
    explanation: '"Ubiquitous" means present, appearing, or found everywhere.'
  },
  // Vocabulary - Hard
  {
    id: 'v5',
    category: 'vocabulary',
    difficulty: 'hard',
    question: 'The word "ephemeral" describes something that is:',
    options: ['permanent', 'short-lived', 'expensive', 'mysterious'],
    correctAnswer: 1,
    explanation: '"Ephemeral" means lasting for a very short time.'
  },
  {
    id: 'v6',
    category: 'vocabulary',
    difficulty: 'hard',
    question: 'Choose the correct collocation: "The research _____ significant findings."',
    options: ['made', 'did', 'yielded', 'gave'],
    correctAnswer: 2,
    explanation: '"Yielded" is the correct academic collocation with "findings".'
  },
  // Grammar - Easy
  {
    id: 'g1',
    category: 'grammar',
    difficulty: 'easy',
    question: 'Choose the correct form: "She _____ to the gym every day."',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 1,
    explanation: 'Third person singular requires "goes" in present simple.'
  },
  {
    id: 'g2',
    category: 'grammar',
    difficulty: 'easy',
    question: 'Select the correct sentence:',
    options: [
      'He don\'t like coffee.',
      'He doesn\'t likes coffee.',
      'He doesn\'t like coffee.',
      'He not like coffee.'
    ],
    correctAnswer: 2,
    explanation: '"Doesn\'t" is followed by the base form of the verb.'
  },
  // Grammar - Medium
  {
    id: 'g3',
    category: 'grammar',
    difficulty: 'medium',
    question: 'Choose the correct form: "If I _____ rich, I would travel the world."',
    options: ['am', 'was', 'were', 'be'],
    correctAnswer: 2,
    explanation: 'Second conditional uses "were" for all subjects (subjunctive mood).'
  },
  {
    id: 'g4',
    category: 'grammar',
    difficulty: 'medium',
    question: 'Select the correct passive form: "The report _____ by the committee yesterday."',
    options: ['was written', 'is written', 'has written', 'wrote'],
    correctAnswer: 0,
    explanation: 'Past passive requires "was/were + past participle".'
  },
  // Grammar - Hard
  {
    id: 'g5',
    category: 'grammar',
    difficulty: 'hard',
    question: 'Choose the correct form: "Had I known about the meeting, I _____ attended."',
    options: ['would', 'would have', 'will have', 'had'],
    correctAnswer: 1,
    explanation: 'Third conditional with inversion requires "would have + past participle".'
  },
  {
    id: 'g6',
    category: 'grammar',
    difficulty: 'hard',
    question: 'Select the grammatically correct sentence:',
    options: [
      'The number of students have increased.',
      'The number of students has increased.',
      'A number of students has increased.',
      'The numbers of students has increased.'
    ],
    correctAnswer: 1,
    explanation: '"The number of" takes a singular verb; "A number of" takes plural.'
  },
  // Reading Comprehension - Easy
  {
    id: 'r1',
    category: 'reading',
    difficulty: 'easy',
    question: '"The experiment was successful, yielding positive results." What does this sentence tell us?',
    options: [
      'The experiment failed',
      'The experiment produced good outcomes',
      'The experiment was cancelled',
      'The results were negative'
    ],
    correctAnswer: 1,
    explanation: '"Successful" and "positive results" indicate good outcomes.'
  },
  // Reading Comprehension - Medium
  {
    id: 'r2',
    category: 'reading',
    difficulty: 'medium',
    question: '"Despite initial setbacks, the project ultimately achieved its objectives." The word "despite" indicates:',
    options: [
      'Because of the setbacks',
      'In addition to setbacks',
      'In contrast to setbacks',
      'Without any setbacks'
    ],
    correctAnswer: 2,
    explanation: '"Despite" shows contrast - success happened even though there were problems.'
  },
  // Reading Comprehension - Hard
  {
    id: 'r3',
    category: 'reading',
    difficulty: 'hard',
    question: '"The correlation between education and income is well-documented, though causation remains debated." This suggests:',
    options: [
      'Education definitely causes higher income',
      'There is a relationship, but the cause is unclear',
      'Income causes better education',
      'There is no relationship between them'
    ],
    correctAnswer: 1,
    explanation: 'The sentence distinguishes correlation (relationship) from causation (cause-effect).'
  },
];

interface StudyPlanItem {
  week: number;
  day: number;
  type: 'vocabulary' | 'grammar' | 'quiz' | 'review';
  title: string;
  description: string;
  link: string;
  duration: string;
}

function generateStudyPlan(
  vocabScore: number,
  grammarScore: number,
  readingScore: number,
  targetBand: number
): StudyPlanItem[] {
  const plan: StudyPlanItem[] = [];
  const weakAreas: string[] = [];
  
  if (vocabScore < 60) weakAreas.push('vocabulary');
  if (grammarScore < 60) weakAreas.push('grammar');
  if (readingScore < 60) weakAreas.push('reading');
  
  const weeks = targetBand >= 8 ? 4 : targetBand >= 7 ? 3 : 2;
  
  for (let week = 1; week <= weeks; week++) {
    for (let day = 1; day <= 7; day++) {
      const dayNum = (week - 1) * 7 + day;
      
      if (day <= 2) {
        plan.push({
          week,
          day,
          type: 'vocabulary',
          title: `Vocabulary: ${getVocabTopic(dayNum)}`,
          description: weakAreas.includes('vocabulary') 
            ? 'Focus on building core vocabulary' 
            : 'Expand advanced vocabulary',
          link: '/vocabulary',
          duration: '30 min'
        });
      } else if (day <= 4) {
        plan.push({
          week,
          day,
          type: 'grammar',
          title: `Grammar: ${getGrammarTopic(dayNum)}`,
          description: weakAreas.includes('grammar')
            ? 'Master essential grammar structures'
            : 'Refine complex grammar usage',
          link: '/grammar',
          duration: '25 min'
        });
      } else if (day === 5) {
        plan.push({
          week,
          day,
          type: 'quiz',
          title: 'Practice Quiz',
          description: 'Test your knowledge from this week',
          link: '/quiz',
          duration: '20 min'
        });
      } else if (day === 6) {
        plan.push({
          week,
          day,
          type: 'review',
          title: 'Review & Flashcards',
          description: 'Review mistakes and practice flashcards',
          link: '/flashcards',
          duration: '25 min'
        });
      } else {
        plan.push({
          week,
          day,
          type: 'review',
          title: 'Rest & Light Review',
          description: 'Light review of the week\'s material',
          link: '/vocabulary',
          duration: '15 min'
        });
      }
    }
  }
  
  return plan;
}

function getVocabTopic(dayNum: number): string {
  const topics = [
    'Education & Learning', 'Environment & Nature', 'Technology & Innovation',
    'Health & Wellbeing', 'Society & Culture', 'Economy & Business',
    'Government & Politics', 'Science & Research', 'Media & Communication',
    'Travel & Tourism', 'Work & Career', 'Arts & Entertainment',
    'Academic Collocations', 'Speaking Phrases', 'Band Upgrade Words'
  ];
  return topics[(dayNum - 1) % topics.length];
}

function getGrammarTopic(dayNum: number): string {
  const topics = [
    'Verb Tenses', 'Conditionals', 'Passive Voice', 'Relative Clauses',
    'Articles & Determiners', 'Modal Verbs', 'Reported Speech',
    'Comparatives & Superlatives', 'Complex Sentences', 'Punctuation'
  ];
  return topics[(dayNum - 1) % topics.length];
}

function calculateBandScore(vocabScore: number, grammarScore: number, readingScore: number): number {
  const avgScore = (vocabScore + grammarScore + readingScore) / 3;
  
  if (avgScore >= 90) return 9;
  if (avgScore >= 80) return 8;
  if (avgScore >= 70) return 7;
  if (avgScore >= 60) return 6.5;
  if (avgScore >= 50) return 6;
  if (avgScore >= 40) return 5.5;
  return 5;
}

export default function DiagnosticTestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { updateUserPreferences, userPreferences } = useProgress();
  const destination = readNextPath(location.search, '/dashboard?welcome=1');
  const isOnboarding = new URLSearchParams(location.search).get('onboarding') === '1';
  
  const [stage, setStage] = useState<'intro' | 'test' | 'results' | 'plan'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [targetBand, setTargetBand] = useState(userPreferences.targetBand || 7);
  const [studyPlan, setStudyPlan] = useState<StudyPlanItem[]>([]);
  const [savingPlan, setSavingPlan] = useState(false);
  const [saveError, setSaveError] = useState('');
  
  const [scores, setScores] = useState({
    vocabulary: 0,
    grammar: 0,
    reading: 0,
    overall: 0,
    estimatedBand: 0
  });

  useEffect(() => {
    if (stage === 'test' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [stage, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    setStage('test');
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(15 * 60);
  };

  const handleAnswer = (optionIndex: number) => {
    const question = DIAGNOSTIC_QUESTIONS[currentQuestion];
    setAnswers(prev => ({ ...prev, [question.id]: optionIndex }));
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = useCallback(() => {
    const vocabQuestions = DIAGNOSTIC_QUESTIONS.filter(q => q.category === 'vocabulary');
    const grammarQuestions = DIAGNOSTIC_QUESTIONS.filter(q => q.category === 'grammar');
    const readingQuestions = DIAGNOSTIC_QUESTIONS.filter(q => q.category === 'reading');
    
    const vocabCorrect = vocabQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
    const grammarCorrect = grammarQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
    const readingCorrect = readingQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
    
    const vocabScore = Math.round((vocabCorrect / vocabQuestions.length) * 100);
    const grammarScore = Math.round((grammarCorrect / grammarQuestions.length) * 100);
    const readingScore = Math.round((readingCorrect / readingQuestions.length) * 100);
    const overallScore = Math.round((vocabScore + grammarScore + readingScore) / 3);
    const estimatedBand = calculateBandScore(vocabScore, grammarScore, readingScore);
    
    setScores({
      vocabulary: vocabScore,
      grammar: grammarScore,
      reading: readingScore,
      overall: overallScore,
      estimatedBand
    });
    
    setStage('results');
  }, [answers]);

  const generatePlan = async () => {
    setSavingPlan(true);
    setSaveError('');
    const plan = generateStudyPlan(scores.vocabulary, scores.grammar, scores.reading, targetBand);
    setStudyPlan(plan);
    
    const focusAreas: string[] = [];
    if (scores.vocabulary < 70) focusAreas.push('vocabulary');
    if (scores.grammar < 70) focusAreas.push('grammar');
    if (focusAreas.length === 0) focusAreas.push('vocabulary', 'grammar');
    
    await updateUserPreferences({
      targetBand,
      focusAreas,
      dailyGoalQuestions: targetBand >= 8 ? 15 : 10
    });

    if (user && supabase) {
      const { error: attemptError } = await supabase.from('diagnostic_attempts').insert({
        user_id: user.id,
        vocabulary_score: scores.vocabulary,
        grammar_score: scores.grammar,
        reading_score: scores.reading,
        overall_score: scores.overall,
        estimated_band: scores.estimatedBand,
        target_band: targetBand,
        answers,
      });
      if (attemptError) {
        setSaveError('Your plan was created, but the diagnostic result could not be saved. Please try again.');
        setSavingPlan(false);
        return;
      }
      if (isOnboarding) {
        const { error: profileError } = await supabase
          .from('users')
          .update({ target_band: targetBand, onboarding_completed_at: new Date().toISOString() })
          .eq('id', user.id);
        if (profileError) {
          setSaveError('Your result was saved, but onboarding could not be completed. Please try again.');
          setSavingPlan(false);
          return;
        }
      }
    }

    trackFunnelEvent('diagnostic_completed', {
      estimatedBand: scores.estimatedBand,
      targetBand,
      overallScore: scores.overall,
      onboarding: isOnboarding,
    });
    
    setStage('plan');
    setSavingPlan(false);
  };

  const recommendedStart = [
    { score: scores.vocabulary, label: 'Start vocabulary practice', link: '/vocabulary' },
    { score: scores.grammar, label: 'Start grammar practice', link: '/grammar' },
    { score: scores.reading, label: 'Start reading practice', link: '/reading-practice' },
  ].sort((a, b) => a.score - b.score)[0];

  const question = DIAGNOSTIC_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / DIAGNOSTIC_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {stage === 'intro' && (
          <Card className="border-2 border-indigo-100">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
              <CardTitle className="text-2xl">IELTS Diagnostic Test</CardTitle>
              <CardDescription className="text-base">
                Discover your current level and get a personalized study plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">15 Questions</p>
                    <p className="text-sm text-gray-600">Vocab, Grammar, Reading</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <Clock className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium">15 Minutes</p>
                    <p className="text-sm text-gray-600">Timed assessment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium">Band Estimate</p>
                    <p className="text-sm text-gray-600">Know your level</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 mb-2">What you'll get:</h3>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Estimated IELTS band score
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Breakdown by skill area (Vocabulary, Grammar, Reading)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Personalized 2-4 week study plan
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Daily lesson recommendations
                  </li>
                </ul>
              </div>
              
              <Button onClick={startTest} className="w-full" size="lg">
                Start Diagnostic Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        )}

        {stage === 'test' && question && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={
                  question.category === 'vocabulary' ? 'default' :
                  question.category === 'grammar' ? 'secondary' : 'outline'
                }>
                  {question.category}
                </Badge>
                <Badge variant="outline">{question.difficulty}</Badge>
              </div>
              <div className="flex items-center gap-2 text-lg font-medium">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className={timeLeft < 60 ? 'text-red-600' : ''}>{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 text-center">
              Question {currentQuestion + 1} of {DIAGNOSTIC_QUESTIONS.length}
            </p>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-6">{question.question}</h2>
                
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = answers[question.id] === index;
                    const isCorrect = index === question.correctAnswer;
                    const showResult = showExplanation && isSelected;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !showExplanation && handleAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          showExplanation
                            ? isCorrect
                              ? 'border-green-500 bg-green-50'
                              : isSelected
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200'
                            : isSelected
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && (
                            isCorrect 
                              ? <CheckCircle2 className="h-5 w-5 text-green-600" />
                              : <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          {showExplanation && !isSelected && isCorrect && (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {showExplanation && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {showExplanation && (
              <Button onClick={nextQuestion} className="w-full" size="lg">
                {currentQuestion < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        )}

        {stage === 'results' && (
          <div className="space-y-6">
            <Card className="border-2 border-indigo-100">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl">Your Results</CardTitle>
                <CardDescription>Based on your diagnostic test performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Estimated Band Score</p>
                  <p className="text-5xl font-bold text-indigo-600">{scores.estimatedBand}</p>
                  <p className="text-sm text-gray-500 mt-2">Overall Score: {scores.overall}%</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Vocabulary</span>
                      <span className="text-lg font-bold text-blue-600">{scores.vocabulary}%</span>
                    </div>
                    <Progress value={scores.vocabulary} className="h-2" />
                    <p className="text-xs text-gray-500 mt-2">
                      {scores.vocabulary >= 70 ? 'Strong' : scores.vocabulary >= 50 ? 'Needs work' : 'Focus area'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Grammar</span>
                      <span className="text-lg font-bold text-green-600">{scores.grammar}%</span>
                    </div>
                    <Progress value={scores.grammar} className="h-2" />
                    <p className="text-xs text-gray-500 mt-2">
                      {scores.grammar >= 70 ? 'Strong' : scores.grammar >= 50 ? 'Needs work' : 'Focus area'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Reading</span>
                      <span className="text-lg font-bold text-purple-600">{scores.reading}%</span>
                    </div>
                    <Progress value={scores.reading} className="h-2" />
                    <p className="text-xs text-gray-500 mt-2">
                      {scores.reading >= 70 ? 'Strong' : scores.reading >= 50 ? 'Needs work' : 'Focus area'}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Set Your Target Band Score</h3>
                  <div className="flex gap-2 flex-wrap">
                    {[6, 6.5, 7, 7.5, 8, 8.5, 9].map(band => (
                      <Button
                        key={band}
                        variant={targetBand === band ? 'default' : 'outline'}
                        onClick={() => setTargetBand(band)}
                        className="min-w-[60px]"
                      >
                        {band}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {targetBand > scores.estimatedBand 
                      ? `You need to improve by ${(targetBand - scores.estimatedBand).toFixed(1)} bands`
                      : 'Great! You\'re already at or above your target'}
                  </p>
                </div>
                
                {saveError && <p role="alert" className="text-sm text-red-600">{saveError}</p>}
                <Button onClick={generatePlan} disabled={savingPlan} className="w-full" size="lg">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {savingPlan ? 'Saving your results...' : 'Generate My Study Plan'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {stage === 'plan' && (
          <div className="space-y-6">
            <Card className="border-2 border-green-100">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Your Personalized Study Plan</CardTitle>
                <CardDescription>
                  {Math.ceil(studyPlan.length / 7)}-week plan to reach Band {targetBand}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{studyPlan.filter(i => i.type === 'vocabulary').length}</p>
                    <p className="text-sm text-gray-600">Vocab Sessions</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{studyPlan.filter(i => i.type === 'grammar').length}</p>
                    <p className="text-sm text-gray-600">Grammar Sessions</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{studyPlan.filter(i => i.type === 'quiz').length}</p>
                    <p className="text-sm text-gray-600">Practice Quizzes</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">{studyPlan.filter(i => i.type === 'review').length}</p>
                    <p className="text-sm text-gray-600">Review Sessions</p>
                  </div>
                </div>
                
                {Array.from({ length: Math.ceil(studyPlan.length / 7) }, (_, weekIndex) => (
                  <div key={weekIndex} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 font-medium">
                      Week {weekIndex + 1}
                    </div>
                    <div className="divide-y">
                      {studyPlan
                        .filter(item => item.week === weekIndex + 1)
                        .map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                item.type === 'vocabulary' ? 'bg-blue-100 text-blue-600' :
                                item.type === 'grammar' ? 'bg-green-100 text-green-600' :
                                item.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                                'bg-amber-100 text-amber-600'
                              }`}>
                                {item.type === 'vocabulary' ? <BookOpen className="h-5 w-5" /> :
                                 item.type === 'grammar' ? <GraduationCap className="h-5 w-5" /> :
                                 item.type === 'quiz' ? <Target className="h-5 w-5" /> :
                                 <Brain className="h-5 w-5" />}
                              </div>
                              <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500">{item.duration}</span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(item.link)}
                              >
                                Start
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => navigate(destination, { replace: true })} className="flex-1">
                    Go to dashboard
                  </Button>
                  <Button onClick={() => navigate(recommendedStart.link)} className="flex-1">
                    {recommendedStart.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
