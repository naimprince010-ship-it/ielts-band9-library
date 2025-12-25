import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  RotateCcw,
  Target,
  Flame,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface ReadingPassage {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  passage: string;
  timeLimit: number;
  questions: {
    id: string;
    type: 'multiple-choice' | 'true-false-not-given' | 'fill-blank' | 'matching';
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

const READING_PASSAGES: ReadingPassage[] = [
  {
    id: '1',
    title: 'The Impact of Technology on Education',
    difficulty: 'medium',
    topic: 'Education',
    timeLimit: 20,
    passage: `The integration of technology into education has fundamentally transformed how students learn and teachers instruct. Over the past two decades, classrooms have evolved from traditional chalk-and-board setups to interactive digital environments equipped with smart boards, tablets, and high-speed internet connectivity.

One of the most significant changes has been the rise of online learning platforms. These platforms offer unprecedented access to educational resources, allowing students from remote areas to access the same quality of education as those in urban centers. Massive Open Online Courses (MOOCs) have democratized education, enabling millions of learners worldwide to study subjects ranging from computer science to philosophy at prestigious universities.

However, the digital transformation of education is not without challenges. The digital divide remains a pressing concern, with students from lower-income families often lacking access to necessary devices and reliable internet connections. Additionally, there are concerns about screen time and its effects on young learners' attention spans and social development.

Research conducted by the University of Cambridge found that students who used educational technology showed a 15% improvement in test scores compared to those who relied solely on traditional methods. However, the same study noted that the effectiveness of technology depends heavily on how it is implemented and the quality of teacher training.

The COVID-19 pandemic accelerated the adoption of educational technology, forcing institutions worldwide to rapidly transition to online learning. This unprecedented shift revealed both the potential and limitations of digital education. While technology enabled continuity of learning during lockdowns, it also highlighted the importance of face-to-face interaction in the educational process.

Looking ahead, experts predict that the future of education will be hybrid, combining the best aspects of traditional and digital learning. Artificial intelligence and adaptive learning systems are expected to play an increasingly important role, personalizing education to meet individual student needs and learning styles.`,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'According to the passage, what has been one of the most significant changes in education?',
        options: [
          'The use of chalk and boards',
          'The rise of online learning platforms',
          'The decrease in student enrollment',
          'The reduction in teacher salaries'
        ],
        correctAnswer: 'The rise of online learning platforms',
        explanation: 'The passage states "One of the most significant changes has been the rise of online learning platforms."'
      },
      {
        id: 'q2',
        type: 'true-false-not-given',
        question: 'MOOCs have made education more accessible to people worldwide.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'True',
        explanation: 'The passage mentions that MOOCs "have democratized education, enabling millions of learners worldwide to study subjects."'
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'What percentage improvement in test scores was found in students using educational technology?',
        options: ['10%', '15%', '20%', '25%'],
        correctAnswer: '15%',
        explanation: 'The passage states "students who used educational technology showed a 15% improvement in test scores."'
      },
      {
        id: 'q4',
        type: 'true-false-not-given',
        question: 'The digital divide only affects students in developing countries.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'Not Given',
        explanation: 'The passage mentions the digital divide affects "students from lower-income families" but does not specify whether this is limited to developing countries.'
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question: 'What do experts predict about the future of education?',
        options: [
          'It will be entirely online',
          'It will return to traditional methods',
          'It will be hybrid',
          'It will be replaced by AI'
        ],
        correctAnswer: 'It will be hybrid',
        explanation: 'The passage states "experts predict that the future of education will be hybrid, combining the best aspects of traditional and digital learning."'
      }
    ]
  },
  {
    id: '2',
    title: 'Climate Change and Global Food Security',
    difficulty: 'hard',
    topic: 'Environment',
    timeLimit: 25,
    passage: `Climate change poses one of the most significant threats to global food security in the 21st century. Rising temperatures, changing precipitation patterns, and increased frequency of extreme weather events are already affecting agricultural productivity worldwide, with potentially devastating consequences for food production and distribution.

Agricultural systems are particularly vulnerable to climate variability. Crops have specific temperature and water requirements, and even small changes in climate conditions can significantly impact yields. The Intergovernmental Panel on Climate Change (IPCC) estimates that global crop yields could decline by up to 25% by 2050 if current trends continue, with the most severe impacts felt in tropical and subtropical regions.

The effects of climate change on food security extend beyond crop production. Livestock farming is also affected, as heat stress reduces animal productivity and increases mortality rates. Fisheries face challenges from ocean warming and acidification, which alter marine ecosystems and fish migration patterns. These combined effects threaten the livelihoods of millions of people who depend on agriculture and fishing for their income.

Water scarcity is emerging as a critical factor in the climate-food nexus. Agriculture accounts for approximately 70% of global freshwater withdrawals, and climate change is exacerbating water stress in many regions. Droughts are becoming more frequent and severe, while changing rainfall patterns make water availability increasingly unpredictable.

Adaptation strategies are essential for building resilient food systems. These include developing drought-resistant crop varieties, improving irrigation efficiency, diversifying agricultural practices, and implementing early warning systems for extreme weather events. Some regions are also exploring vertical farming and controlled environment agriculture as ways to reduce climate vulnerability.

International cooperation is crucial for addressing the global dimensions of climate change and food security. The Paris Agreement and the United Nations Sustainable Development Goals provide frameworks for collective action, but implementation remains challenging. Developing countries, which are often most vulnerable to climate impacts, require significant support for adaptation and mitigation efforts.`,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'According to the IPCC, by how much could global crop yields decline by 2050?',
        options: ['Up to 10%', 'Up to 15%', 'Up to 25%', 'Up to 35%'],
        correctAnswer: 'Up to 25%',
        explanation: 'The passage states "global crop yields could decline by up to 25% by 2050."'
      },
      {
        id: 'q2',
        type: 'true-false-not-given',
        question: 'Livestock farming is unaffected by climate change.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'False',
        explanation: 'The passage clearly states that "Livestock farming is also affected, as heat stress reduces animal productivity and increases mortality rates."'
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'What percentage of global freshwater withdrawals does agriculture account for?',
        options: ['50%', '60%', '70%', '80%'],
        correctAnswer: '70%',
        explanation: 'The passage states "Agriculture accounts for approximately 70% of global freshwater withdrawals."'
      },
      {
        id: 'q4',
        type: 'true-false-not-given',
        question: 'Vertical farming is mentioned as a potential adaptation strategy.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'True',
        explanation: 'The passage mentions "vertical farming and controlled environment agriculture as ways to reduce climate vulnerability."'
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question: 'Which regions will be most severely impacted by declining crop yields?',
        options: [
          'Temperate regions',
          'Polar regions',
          'Tropical and subtropical regions',
          'Mediterranean regions'
        ],
        correctAnswer: 'Tropical and subtropical regions',
        explanation: 'The passage states "the most severe impacts felt in tropical and subtropical regions."'
      }
    ]
  },
  {
    id: '3',
    title: 'The Psychology of Decision Making',
    difficulty: 'easy',
    topic: 'Psychology',
    timeLimit: 15,
    passage: `Every day, humans make thousands of decisions, from simple choices like what to eat for breakfast to complex ones involving career changes or financial investments. Understanding how we make decisions has been a central focus of psychological research for decades.

Traditional economic theory assumed that humans are rational decision-makers who carefully weigh costs and benefits before choosing. However, behavioral economists and psychologists have demonstrated that human decision-making is often influenced by cognitive biases and emotional factors that lead to seemingly irrational choices.

One of the most well-known cognitive biases is confirmation bias, the tendency to seek out information that confirms our existing beliefs while ignoring contradictory evidence. This bias affects everything from political opinions to medical diagnoses and can lead to poor decision-making in both personal and professional contexts.

Another important concept is loss aversion, discovered by psychologists Daniel Kahneman and Amos Tversky. Their research showed that people feel the pain of losing something more intensely than the pleasure of gaining something of equal value. This explains why people often make conservative choices to avoid potential losses, even when taking risks might lead to better outcomes.

The environment in which decisions are made also plays a crucial role. Research has shown that factors such as time pressure, stress, and information overload can significantly impair decision quality. Conversely, creating structured decision-making processes and allowing adequate time for reflection can improve outcomes.

Understanding these psychological factors has practical applications in many fields, from marketing and public policy to healthcare and education. By recognizing our cognitive limitations and biases, we can develop strategies to make better decisions in our daily lives.`,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What did traditional economic theory assume about human decision-making?',
        options: [
          'Humans are emotional decision-makers',
          'Humans are rational decision-makers',
          'Humans cannot make decisions',
          'Humans always make poor decisions'
        ],
        correctAnswer: 'Humans are rational decision-makers',
        explanation: 'The passage states "Traditional economic theory assumed that humans are rational decision-makers."'
      },
      {
        id: 'q2',
        type: 'true-false-not-given',
        question: 'Confirmation bias only affects political opinions.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'False',
        explanation: 'The passage states that confirmation bias "affects everything from political opinions to medical diagnoses."'
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Who discovered the concept of loss aversion?',
        options: [
          'Sigmund Freud',
          'B.F. Skinner',
          'Daniel Kahneman and Amos Tversky',
          'Carl Jung'
        ],
        correctAnswer: 'Daniel Kahneman and Amos Tversky',
        explanation: 'The passage states "loss aversion, discovered by psychologists Daniel Kahneman and Amos Tversky."'
      },
      {
        id: 'q4',
        type: 'true-false-not-given',
        question: 'Time pressure can improve decision quality.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'False',
        explanation: 'The passage states that "time pressure, stress, and information overload can significantly impair decision quality."'
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question: 'According to loss aversion, how do people feel about losses compared to gains?',
        options: [
          'Losses and gains feel equally important',
          'Gains feel more important than losses',
          'Losses feel more painful than equivalent gains feel pleasurable',
          'People do not care about losses'
        ],
        correctAnswer: 'Losses feel more painful than equivalent gains feel pleasurable',
        explanation: 'The passage states "people feel the pain of losing something more intensely than the pleasure of gaining something of equal value."'
      }
    ]
  }
];

const STORAGE_KEY = 'ielts_reading_practice';

interface PracticeHistory {
  passageId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
}

function getPracticeHistory(): PracticeHistory[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function savePracticeSession(session: PracticeHistory) {
  const history = getPracticeHistory();
  history.unshift(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
}

export default function ReadingPracticePage() {
  const [passages, setPassages] = useState<ReadingPassage[]>(READING_PASSAGES);
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);
  const [stage, setStage] = useState<'select' | 'reading' | 'questions' | 'results'>('select');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPassage, setShowPassage] = useState(true);
  const [practiceCount, setPracticeCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchPassages();
    const history = getPracticeHistory();
    const today = new Date().toDateString();
    const todayCount = history.filter(h => new Date(h.completedAt).toDateString() === today).length;
    setPracticeCount(todayCount);
  }, []);

    const fetchPassages = async () => {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: passageData, error: passageError } = await supabase
            .from('reading_passages')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

          if (!passageError && passageData && passageData.length > 0) {
            const passagesWithQuestions = await Promise.all(
              passageData.map(async (p) => {
                const { data: questions } = await supabase!
                  .from('reading_questions')
                  .select('*')
                  .eq('passage_id', p.id)
                  .order('order_index', { ascending: true });

              return {
                id: p.id,
                title: p.title,
                difficulty: p.difficulty as 'easy' | 'medium' | 'hard',
                topic: p.topic,
                passage: p.content,
                timeLimit: p.time_limit,
                questions: (questions || []).map((q: { id: string; question_type: string; question: string; options: string[] | null; correct_answer: string; explanation: string | null }) => ({
                  id: q.id,
                  type: q.question_type as 'multiple-choice' | 'true-false-not-given' | 'fill-blank' | 'matching',
                  question: q.question,
                  options: q.options || [],
                  correctAnswer: q.correct_answer,
                  explanation: q.explanation || ''
                }))
              };
            })
          );
          setPassages(passagesWithQuestions);
        }
          } catch (err) {
            console.error('Error fetching passages:', err);
          }
        }
      };

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const startPractice = (passage: ReadingPassage) => {
    setSelectedPassage(passage);
    setTimeLeft(passage.timeLimit * 60);
    setIsTimerRunning(true);
    setStage('reading');
    setAnswers({});
    setCurrentQuestion(0);
    setShowPassage(true);
  };

  const goToQuestions = () => {
    setStage('questions');
  };

  const selectAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const submitAnswers = () => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (selectedPassage) {
      const correct = selectedPassage.questions.filter(q => answers[q.id] === q.correctAnswer).length;
      savePracticeSession({
        passageId: selectedPassage.id,
        score: correct,
        totalQuestions: selectedPassage.questions.length,
        timeSpent: selectedPassage.timeLimit * 60 - timeLeft,
        completedAt: new Date().toISOString()
      });
      setPracticeCount(prev => prev + 1);
    }
    
    setStage('results');
  };

  const resetPractice = () => {
    setSelectedPassage(null);
    setStage('select');
    setAnswers({});
    setCurrentQuestion(0);
    setTimeLeft(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScore = () => {
    if (!selectedPassage) return { correct: 0, total: 0, percentage: 0 };
    const correct = selectedPassage.questions.filter(q => answers[q.id] === q.correctAnswer).length;
    return {
      correct,
      total: selectedPassage.questions.length,
      percentage: Math.round((correct / selectedPassage.questions.length) * 100)
    };
  };

  const getBandScore = (percentage: number) => {
    if (percentage >= 90) return { band: '8.0-9.0', color: 'text-green-600' };
    if (percentage >= 75) return { band: '7.0-7.5', color: 'text-green-600' };
    if (percentage >= 60) return { band: '6.0-6.5', color: 'text-blue-600' };
    if (percentage >= 45) return { band: '5.0-5.5', color: 'text-amber-600' };
    return { band: 'Below 5.0', color: 'text-red-600' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {stage === 'select' && (
          <div className="space-y-6">
            <Card className="border-2 border-blue-100">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Reading Practice</CardTitle>
                <CardDescription>
                  Practice IELTS Reading with timed passages and questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Flame className="h-5 w-5" />
                    <span className="font-medium">{practiceCount} passages completed today</span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-4">Select a Passage</h3>
                <div className="space-y-4">
                  {passages.map((passage) => (
                    <div
                      key={passage.id}
                      onClick={() => startPractice(passage)}
                      className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={
                              passage.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                              passage.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {passage.difficulty}
                            </Badge>
                            <Badge variant="outline">{passage.topic}</Badge>
                          </div>
                          <h4 className="font-medium text-lg">{passage.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {passage.timeLimit} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              {passage.questions.length} questions
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {(stage === 'reading' || stage === 'questions') && selectedPassage && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={resetPractice}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Exit
                </Button>
                <h2 className="font-semibold">{selectedPassage.title}</h2>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft < 60 ? 'bg-red-100 text-red-800' : 
                timeLeft < 300 ? 'bg-amber-100 text-amber-800' : 
                'bg-green-100 text-green-800'
              }`}>
                <Clock className="h-5 w-5" />
                <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(showPassage || stage === 'reading') && (
                <Card className="lg:max-h-[70vh] overflow-y-auto">
                  <CardHeader>
                    <CardTitle className="text-lg">Reading Passage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      {selectedPassage.passage.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {stage === 'reading' && (
                <Card className="flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Read the Passage</h3>
                    <p className="text-gray-600 mb-6">
                      Take your time to read and understand the passage before answering questions.
                    </p>
                    <Button onClick={goToQuestions} size="lg">
                      Start Questions
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {stage === 'questions' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Question {currentQuestion + 1} of {selectedPassage.questions.length}
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPassage(!showPassage)}
                        className="lg:hidden"
                      >
                        {showPassage ? 'Hide' : 'Show'} Passage
                      </Button>
                    </div>
                    <Progress 
                      value={(currentQuestion + 1) / selectedPassage.questions.length * 100} 
                      className="h-2"
                    />
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Badge className="mb-2">
                        {selectedPassage.questions[currentQuestion].type.replace('-', ' ')}
                      </Badge>
                      <p className="text-lg font-medium">
                        {selectedPassage.questions[currentQuestion].question}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {selectedPassage.questions[currentQuestion].options?.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectAnswer(selectedPassage.questions[currentQuestion].id, option)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            answers[selectedPassage.questions[currentQuestion].id] === option
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                          {option}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestion === 0}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>

                      {currentQuestion < selectedPassage.questions.length - 1 ? (
                        <Button
                          onClick={() => setCurrentQuestion(prev => prev + 1)}
                          disabled={!answers[selectedPassage.questions[currentQuestion].id]}
                        >
                          Next
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={submitAnswers}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={Object.keys(answers).length < selectedPassage.questions.length}
                        >
                          Submit Answers
                          <CheckCircle2 className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      {selectedPassage.questions.map((q, idx) => (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestion(idx)}
                          className={`w-8 h-8 rounded-full text-sm font-medium ${
                            currentQuestion === idx
                              ? 'bg-blue-600 text-white'
                              : answers[q.id]
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {stage === 'results' && selectedPassage && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                getScore().percentage >= 60 ? 'bg-green-100' : 'bg-amber-100'
              }`}>
                {getScore().percentage >= 60 ? (
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                ) : (
                  <Target className="h-10 w-10 text-amber-600" />
                )}
              </div>
              <CardTitle className="text-2xl">Practice Complete!</CardTitle>
              <CardDescription>{selectedPassage.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-blue-600">{getScore().correct}/{getScore().total}</p>
                  <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-green-600">{getScore().percentage}%</p>
                  <p className="text-sm text-gray-600">Score</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className={`text-2xl font-bold ${getBandScore(getScore().percentage).color}`}>
                    {getBandScore(getScore().percentage).band}
                  </p>
                  <p className="text-sm text-gray-600">Est. Band</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Review Answers</h3>
                {selectedPassage.questions.map((q, idx) => {
                  const isCorrect = answers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className={`p-4 rounded-lg border ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">Q{idx + 1}: {q.question}</p>
                          <p className="text-sm mt-1">
                            Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              {answers[q.id] || 'Not answered'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-700">
                              Correct answer: {q.correctAnswer}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 mt-2 italic">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button onClick={resetPractice} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Another
                </Button>
                <Button onClick={() => startPractice(selectedPassage)} className="flex-1">
                  Retry This Passage
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
