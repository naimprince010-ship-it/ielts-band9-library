import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Trophy,
  Target,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface Exercise {
  id: string;
  question: string;
  type: 'fill-blank' | 'multiple-choice' | 'error-correction';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

interface GrammarTopic {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  tips: string[];
}

const GRAMMAR_EXERCISES: GrammarTopic[] = [
  {
    id: 'conditionals',
    title: 'Conditional Sentences',
    description: 'Master all four types of conditionals for IELTS Writing and Speaking',
    difficulty: 'intermediate',
    tips: [
      'Zero conditional: general truths (If + present, present)',
      'First conditional: real future (If + present, will + verb)',
      'Second conditional: unreal present (If + past, would + verb)',
      'Third conditional: unreal past (If + had + pp, would have + pp)',
      'Never use "would" in the if-clause!'
    ],
    exercises: [
      {
        id: 'cond-1',
        question: 'If the government _____ more in education, literacy rates would improve.',
        type: 'fill-blank',
        correctAnswer: 'invested',
        explanation: 'Second conditional requires past simple in the if-clause. "invested" is the past form of "invest".',
        hint: 'This is a hypothetical situation (second conditional)'
      },
      {
        id: 'cond-2',
        question: 'Which sentence is grammatically correct?',
        type: 'multiple-choice',
        options: [
          'If I would have more time, I would study harder.',
          'If I had more time, I would study harder.',
          'If I will have more time, I would study harder.',
          'If I have more time, I would study harder.'
        ],
        correctAnswer: 'If I had more time, I would study harder.',
        explanation: 'Second conditional uses "If + past simple, would + infinitive". Never use "would" in the if-clause.'
      },
      {
        id: 'cond-3',
        question: 'If water _____ 100 degrees Celsius, it boils.',
        type: 'fill-blank',
        correctAnswer: 'reaches',
        explanation: 'Zero conditional for scientific facts uses present simple in both clauses.',
        hint: 'This is a scientific fact (zero conditional)'
      },
      {
        id: 'cond-4',
        question: 'Find the error: "If they would have studied harder, they would have passed the exam."',
        type: 'error-correction',
        correctAnswer: 'If they had studied harder, they would have passed the exam.',
        explanation: 'Third conditional uses "If + past perfect, would have + past participle". Never use "would have" in the if-clause.'
      },
      {
        id: 'cond-5',
        question: '_____ the economy improve, unemployment rates will decrease.',
        type: 'multiple-choice',
        options: ['Should', 'Would', 'If would', 'Unless'],
        correctAnswer: 'Should',
        explanation: '"Should" can replace "If" in formal first conditionals with inversion: "Should the economy improve" = "If the economy improves".'
      },
      {
        id: 'cond-6',
        question: 'If I _____ you, I would accept the job offer.',
        type: 'fill-blank',
        correctAnswer: 'were',
        explanation: 'In second conditional, use "were" for all subjects (I, he, she, it) in formal English.',
        hint: 'Use the subjunctive form'
      },
      {
        id: 'cond-7',
        question: 'Had I known about the deadline, I _____ submitted earlier.',
        type: 'fill-blank',
        correctAnswer: 'would have',
        explanation: 'This is an inverted third conditional. "Had I known" = "If I had known", so the result clause needs "would have + past participle".'
      },
      {
        id: 'cond-8',
        question: 'Which is the correct first conditional?',
        type: 'multiple-choice',
        options: [
          'If it will rain tomorrow, we will stay home.',
          'If it rains tomorrow, we will stay home.',
          'If it rained tomorrow, we will stay home.',
          'If it rains tomorrow, we would stay home.'
        ],
        correctAnswer: 'If it rains tomorrow, we will stay home.',
        explanation: 'First conditional: If + present simple, will + infinitive. Don\'t use "will" in the if-clause.'
      }
    ]
  },
  {
    id: 'passive-voice',
    title: 'Passive Voice',
    description: 'Learn when and how to use passive constructions effectively',
    difficulty: 'intermediate',
    tips: [
      'Form: be + past participle',
      'Use passive when the action is more important than the doer',
      'Common in academic writing and formal reports',
      'Avoid overusing passive - mix with active voice',
      'Perfect passive: have/has been + past participle'
    ],
    exercises: [
      {
        id: 'pass-1',
        question: 'The new policy _____ by the government last month.',
        type: 'fill-blank',
        correctAnswer: 'was implemented',
        explanation: 'Past simple passive: was/were + past participle. "Implemented" is the past participle of "implement".'
      },
      {
        id: 'pass-2',
        question: 'Which sentence is in passive voice?',
        type: 'multiple-choice',
        options: [
          'The committee made a decision.',
          'A decision was made by the committee.',
          'The committee is making a decision.',
          'The committee will make a decision.'
        ],
        correctAnswer: 'A decision was made by the committee.',
        explanation: 'Passive voice: subject receives the action. "A decision was made" - the decision receives the action of making.'
      },
      {
        id: 'pass-3',
        question: 'The report _____ by the end of this week.',
        type: 'fill-blank',
        correctAnswer: 'will be completed',
        explanation: 'Future passive: will be + past participle.',
        hint: 'Future tense passive'
      },
      {
        id: 'pass-4',
        question: 'Convert to passive: "Scientists have discovered a new species."',
        type: 'error-correction',
        correctAnswer: 'A new species has been discovered by scientists.',
        explanation: 'Present perfect passive: has/have been + past participle.'
      },
      {
        id: 'pass-5',
        question: 'The building _____ for two years now.',
        type: 'multiple-choice',
        options: [
          'is being constructed',
          'has been being constructed',
          'has been constructed',
          'was being constructed'
        ],
        correctAnswer: 'has been being constructed',
        explanation: 'Present perfect continuous passive: has/have been being + past participle. Used for ongoing actions that started in the past.'
      },
      {
        id: 'pass-6',
        question: 'It _____ that the economy will recover next year.',
        type: 'fill-blank',
        correctAnswer: 'is believed',
        explanation: 'Impersonal passive with "It": "It is believed/thought/said that..." Very common in academic writing.',
        hint: 'Impersonal passive structure'
      }
    ]
  },
  {
    id: 'relative-clauses',
    title: 'Relative Clauses',
    description: 'Master defining and non-defining relative clauses',
    difficulty: 'intermediate',
    tips: [
      'Defining clauses: essential information, no commas',
      'Non-defining clauses: extra information, use commas',
      'Who/that for people, which/that for things',
      'Whose for possession',
      'Where for places, when for times'
    ],
    exercises: [
      {
        id: 'rel-1',
        question: 'The students _____ passed the exam will receive certificates.',
        type: 'fill-blank',
        correctAnswer: 'who',
        explanation: '"Who" is used for people in relative clauses. This is a defining clause (essential information).',
        hint: 'Relative pronoun for people'
      },
      {
        id: 'rel-2',
        question: 'Which sentence uses commas correctly?',
        type: 'multiple-choice',
        options: [
          'My brother, who lives in London, is a doctor.',
          'My brother who lives in London is a doctor.',
          'Both are correct depending on context.',
          'Neither is correct.'
        ],
        correctAnswer: 'Both are correct depending on context.',
        explanation: 'With commas = non-defining (I have one brother, extra info). Without commas = defining (I have multiple brothers, specifying which one).'
      },
      {
        id: 'rel-3',
        question: 'The company _____ products are sold worldwide is based in Japan.',
        type: 'fill-blank',
        correctAnswer: 'whose',
        explanation: '"Whose" shows possession in relative clauses. "The company\'s products" becomes "whose products".'
      },
      {
        id: 'rel-4',
        question: 'This is the restaurant _____ we had dinner last week.',
        type: 'fill-blank',
        correctAnswer: 'where',
        explanation: '"Where" is used for places in relative clauses.',
        hint: 'Relative pronoun for places'
      },
      {
        id: 'rel-5',
        question: 'Find the error: "The book which I bought it yesterday is very interesting."',
        type: 'error-correction',
        correctAnswer: 'The book which I bought yesterday is very interesting.',
        explanation: 'Don\'t repeat the object pronoun ("it") when using a relative pronoun. "Which" already refers to "the book".'
      },
      {
        id: 'rel-6',
        question: 'Climate change, _____ effects are becoming more visible, requires urgent action.',
        type: 'multiple-choice',
        options: ['which', 'whose', 'that', 'what'],
        correctAnswer: 'whose',
        explanation: '"Whose" shows possession. "Climate change\'s effects" becomes "whose effects". Note: this is a non-defining clause (commas).'
      }
    ]
  },
  {
    id: 'articles',
    title: 'Articles (A, An, The)',
    description: 'Perfect your use of definite and indefinite articles',
    difficulty: 'beginner',
    tips: [
      'A/An: first mention, non-specific, one of many',
      'The: specific, already mentioned, unique items',
      'No article: general plurals, uncountable nouns (general)',
      'The + superlatives: the best, the most important',
      'Geographic rules: the UK, the USA, but France, Japan'
    ],
    exercises: [
      {
        id: 'art-1',
        question: '_____ education is essential for economic development.',
        type: 'fill-blank',
        correctAnswer: 'no article',
        explanation: 'No article before uncountable nouns when speaking generally. "Education" here means education in general.',
        hint: 'General statement about education'
      },
      {
        id: 'art-2',
        question: 'Which is correct?',
        type: 'multiple-choice',
        options: [
          'The life is beautiful.',
          'Life is beautiful.',
          'A life is beautiful.',
          'An life is beautiful.'
        ],
        correctAnswer: 'Life is beautiful.',
        explanation: 'No article for abstract nouns used in a general sense. "Life" here means life in general.'
      },
      {
        id: 'art-3',
        question: 'She is _____ best student in the class.',
        type: 'fill-blank',
        correctAnswer: 'the',
        explanation: 'Use "the" with superlatives (best, most, least, etc.).'
      },
      {
        id: 'art-4',
        question: 'I saw _____ interesting documentary about _____ climate change.',
        type: 'multiple-choice',
        options: [
          'an, the',
          'a, the',
          'an, no article',
          'the, a'
        ],
        correctAnswer: 'an, no article',
        explanation: '"An" before vowel sounds (interesting). No article before "climate change" when used generally.'
      },
      {
        id: 'art-5',
        question: '_____ United Kingdom has left _____ European Union.',
        type: 'fill-blank',
        correctAnswer: 'The, the',
        explanation: 'Use "the" with countries that include words like Kingdom, Republic, States, Union.',
        hint: 'Both need "the"'
      },
      {
        id: 'art-6',
        question: 'Find the error: "The happiness is more important than the money."',
        type: 'error-correction',
        correctAnswer: 'Happiness is more important than money.',
        explanation: 'No article for abstract nouns (happiness, money) when speaking generally.'
      }
    ]
  },
  {
    id: 'tenses',
    title: 'Verb Tenses',
    description: 'Master all 12 English tenses for accurate expression',
    difficulty: 'intermediate',
    tips: [
      'Present perfect: past action with present relevance',
      'Past simple: completed past action with specific time',
      'Present perfect continuous: action started in past, still continuing',
      'Future perfect: action completed before a future time',
      'Past perfect: action before another past action'
    ],
    exercises: [
      {
        id: 'tense-1',
        question: 'I _____ in this city for ten years.',
        type: 'fill-blank',
        correctAnswer: 'have lived',
        explanation: 'Present perfect for actions that started in the past and continue to the present. "For ten years" indicates duration.',
        hint: 'Action started in past, continues now'
      },
      {
        id: 'tense-2',
        question: 'Which tense is correct?',
        type: 'multiple-choice',
        options: [
          'I have seen that movie yesterday.',
          'I saw that movie yesterday.',
          'I had seen that movie yesterday.',
          'I was seeing that movie yesterday.'
        ],
        correctAnswer: 'I saw that movie yesterday.',
        explanation: 'Past simple with specific past time markers (yesterday, last week, in 2020). Don\'t use present perfect with specific past times.'
      },
      {
        id: 'tense-3',
        question: 'By next year, she _____ her degree.',
        type: 'fill-blank',
        correctAnswer: 'will have completed',
        explanation: 'Future perfect: will have + past participle. Used for actions completed before a future time.',
        hint: 'Future perfect tense'
      },
      {
        id: 'tense-4',
        question: 'When I arrived, the meeting _____.',
        type: 'multiple-choice',
        options: [
          'already started',
          'has already started',
          'had already started',
          'was already starting'
        ],
        correctAnswer: 'had already started',
        explanation: 'Past perfect for an action that happened before another past action. The meeting started before I arrived.'
      },
      {
        id: 'tense-5',
        question: 'She _____ on this project since January.',
        type: 'fill-blank',
        correctAnswer: 'has been working',
        explanation: 'Present perfect continuous: has/have been + -ing. For actions that started in the past and are still ongoing.',
        hint: 'Continuous action from past to present'
      },
      {
        id: 'tense-6',
        question: 'Find the error: "I am living here since 2015."',
        type: 'error-correction',
        correctAnswer: 'I have been living here since 2015.',
        explanation: 'Use present perfect continuous (not present continuous) with "since" or "for" to show duration from past to present.'
      }
    ]
  },
  {
    id: 'reported-speech',
    title: 'Reported Speech',
    description: 'Transform direct speech to indirect speech accurately',
    difficulty: 'advanced',
    tips: [
      'Backshift tenses: present → past, past → past perfect',
      'Change pronouns and time expressions',
      'Say vs Tell: say (no object), tell (+ object)',
      'Questions: if/whether for yes/no, wh- word for wh- questions',
      'Commands: told + object + to infinitive'
    ],
    exercises: [
      {
        id: 'rep-1',
        question: 'She said, "I am tired." → She said that she _____ tired.',
        type: 'fill-blank',
        correctAnswer: 'was',
        explanation: 'Backshift: present simple "am" becomes past simple "was" in reported speech.'
      },
      {
        id: 'rep-2',
        question: 'Which is correct?',
        type: 'multiple-choice',
        options: [
          'He told that he would come.',
          'He said me that he would come.',
          'He told me that he would come.',
          'He said to me he would come.'
        ],
        correctAnswer: 'He told me that he would come.',
        explanation: '"Tell" requires an object (told me/him/her). "Say" doesn\'t take a direct object (said that...).'
      },
      {
        id: 'rep-3',
        question: '"Where do you live?" → She asked me where I _____.',
        type: 'fill-blank',
        correctAnswer: 'lived',
        explanation: 'In reported questions, use statement word order (not question order) and backshift the tense.',
        hint: 'Backshift and statement order'
      },
      {
        id: 'rep-4',
        question: '"Don\'t be late!" → She told me _____ late.',
        type: 'fill-blank',
        correctAnswer: 'not to be',
        explanation: 'Reported commands: told + object + (not) to + infinitive.',
        hint: 'Negative command'
      },
      {
        id: 'rep-5',
        question: '"Have you finished?" → She asked if I _____.',
        type: 'multiple-choice',
        options: [
          'have finished',
          'had finished',
          'finished',
          'was finishing'
        ],
        correctAnswer: 'had finished',
        explanation: 'Yes/no questions use "if/whether". Backshift: present perfect "have finished" → past perfect "had finished".'
      },
      {
        id: 'rep-6',
        question: 'Find the error: "He asked me where did I work."',
        type: 'error-correction',
        correctAnswer: 'He asked me where I worked.',
        explanation: 'In reported questions, use statement word order (subject + verb), not question word order.'
      }
    ]
  },
  {
    id: 'modals',
    title: 'Modal Verbs',
    description: 'Express possibility, obligation, and advice with modals',
    difficulty: 'intermediate',
    tips: [
      'Must: strong obligation, logical deduction',
      'Should/Ought to: advice, recommendation',
      'Could/Might/May: possibility',
      'Can/Could: ability, permission',
      'Would: hypothetical, polite requests'
    ],
    exercises: [
      {
        id: 'mod-1',
        question: 'You _____ wear a seatbelt. It\'s the law.',
        type: 'fill-blank',
        correctAnswer: 'must',
        explanation: '"Must" expresses strong obligation, especially for rules and laws.',
        hint: 'Strong obligation'
      },
      {
        id: 'mod-2',
        question: 'Which expresses advice?',
        type: 'multiple-choice',
        options: [
          'You must see a doctor.',
          'You should see a doctor.',
          'You can see a doctor.',
          'You will see a doctor.'
        ],
        correctAnswer: 'You should see a doctor.',
        explanation: '"Should" expresses advice or recommendation. "Must" is stronger (obligation).'
      },
      {
        id: 'mod-3',
        question: 'She _____ be at home. Her car is in the driveway.',
        type: 'fill-blank',
        correctAnswer: 'must',
        explanation: '"Must" for logical deduction based on evidence. The car being there suggests she\'s home.',
        hint: 'Logical deduction'
      },
      {
        id: 'mod-4',
        question: 'He _____ speak three languages when he was young.',
        type: 'fill-blank',
        correctAnswer: 'could',
        explanation: '"Could" expresses past ability. "Can" is for present ability.',
        hint: 'Past ability'
      },
      {
        id: 'mod-5',
        question: 'Which is most polite?',
        type: 'multiple-choice',
        options: [
          'Can you help me?',
          'Could you help me?',
          'Would you mind helping me?',
          'Help me!'
        ],
        correctAnswer: 'Would you mind helping me?',
        explanation: '"Would you mind + -ing" is the most polite form for requests.'
      },
      {
        id: 'mod-6',
        question: 'Find the error: "You must to study harder."',
        type: 'error-correction',
        correctAnswer: 'You must study harder.',
        explanation: 'Modal verbs are followed by the base form of the verb (infinitive without "to").'
      }
    ]
  },
  {
    id: 'comparatives-superlatives',
    title: 'Comparatives & Superlatives',
    description: 'Compare things accurately using correct forms',
    difficulty: 'beginner',
    tips: [
      'Short adjectives: -er/-est (bigger, biggest)',
      'Long adjectives: more/most (more beautiful, most beautiful)',
      'Irregular: good-better-best, bad-worse-worst',
      'As...as for equal comparison',
      'The more...the more for parallel increase'
    ],
    exercises: [
      {
        id: 'comp-1',
        question: 'This is _____ book I have ever read.',
        type: 'fill-blank',
        correctAnswer: 'the best',
        explanation: 'Superlative form of "good" is "best". Use "the" before superlatives.',
        hint: 'Superlative of "good"'
      },
      {
        id: 'comp-2',
        question: 'Which is correct?',
        type: 'multiple-choice',
        options: [
          'She is more intelligent than him.',
          'She is more intelligent than he.',
          'She is more intelligent than he is.',
          'All are acceptable.'
        ],
        correctAnswer: 'All are acceptable.',
        explanation: 'All forms are grammatically acceptable. "Than he is" is most formal, "than him" is most common in speech.'
      },
      {
        id: 'comp-3',
        question: 'The situation is getting _____ and _____.',
        type: 'fill-blank',
        correctAnswer: 'worse, worse',
        explanation: '"Worse and worse" shows continuous deterioration. "Worse" is the comparative of "bad".',
        hint: 'Comparative of "bad"'
      },
      {
        id: 'comp-4',
        question: '_____ you study, _____ you will learn.',
        type: 'fill-blank',
        correctAnswer: 'The more, the more',
        explanation: '"The more...the more" structure shows parallel increase.',
        hint: 'Parallel comparison structure'
      },
      {
        id: 'comp-5',
        question: 'Find the error: "This is the most easiest question."',
        type: 'error-correction',
        correctAnswer: 'This is the easiest question.',
        explanation: 'Don\'t use "most" with -est endings. "Easy" → "easiest" (not "most easiest").'
      },
      {
        id: 'comp-6',
        question: 'She is not _____ tall _____ her brother.',
        type: 'multiple-choice',
        options: [
          'so, as',
          'as, as',
          'Both are correct',
          'Neither is correct'
        ],
        correctAnswer: 'Both are correct',
        explanation: 'Both "not so...as" and "not as...as" are correct for negative equal comparisons.'
      }
    ]
  }
];

const STORAGE_KEY = 'grammar_exercise_progress';

function getStoredProgress(): Record<string, { completed: boolean; score: number; total: number }> {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveProgress(topicId: string, score: number, total: number) {
  const progress = getStoredProgress();
  progress[topicId] = { completed: true, score, total };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export default function GrammarExercisesPage() {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState<Record<string, { completed: boolean; score: number; total: number }>>(getStoredProgress());
  const [stage, setStage] = useState<'select' | 'practice' | 'results'>('select');

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const startPractice = (topic: GrammarTopic) => {
    setSelectedTopic(topic);
    setCurrentExercise(0);
    setScore(0);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setStage('practice');
  };

  const checkAnswer = () => {
    if (!selectedTopic) return;
    const exercise = selectedTopic.exercises[currentExercise];
    const correct = userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setShowResult(true);
  };

  const nextExercise = () => {
    if (!selectedTopic) return;
    if (currentExercise < selectedTopic.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
    } else {
      saveProgress(selectedTopic.id, score + (isCorrect ? 0 : 0), selectedTopic.exercises.length);
      setProgress(getStoredProgress());
      setStage('results');
    }
  };

  const resetPractice = () => {
    setSelectedTopic(null);
    setCurrentExercise(0);
    setScore(0);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setStage('select');
  };

  const getTotalProgress = () => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    return Math.round((completed / GRAMMAR_EXERCISES.length) * 100);
  };

  const getTotalScore = () => {
    const scores = Object.values(progress);
    if (scores.length === 0) return 0;
    const totalScore = scores.reduce((acc, p) => acc + p.score, 0);
    const totalQuestions = scores.reduce((acc, p) => acc + p.total, 0);
    return totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
  };

  if (stage === 'results' && selectedTopic) {
    const percentage = Math.round((score / selectedTopic.exercises.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Practice Complete!</CardTitle>
              <CardDescription>{selectedTopic.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-purple-600">{percentage}%</div>
              <p className="text-gray-600">
                You got {score} out of {selectedTopic.exercises.length} correct
              </p>
              <Progress value={percentage} className="h-3" />
              
              <div className="bg-purple-50 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-purple-800 mb-2">Key Tips to Remember:</h4>
                <ul className="space-y-1 text-sm text-purple-700">
                  {selectedTopic.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => startPractice(selectedTopic)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={resetPractice}>
                  Choose Another Topic
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (stage === 'practice' && selectedTopic) {
    const exercise = selectedTopic.exercises[currentExercise];
    const progressPercent = ((currentExercise + 1) / selectedTopic.exercises.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Button variant="ghost" onClick={resetPractice}>
                ← Back to Topics
              </Button>
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                {currentExercise + 1} / {selectedTopic.exercises.length}
              </Badge>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={
                  selectedTopic.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  selectedTopic.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }>
                  {selectedTopic.difficulty}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Target className="h-4 w-4" />
                  Score: {score}
                </div>
              </div>
              <CardTitle className="text-xl mt-4">{selectedTopic.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-lg font-medium mb-4">{exercise.question}</p>
                
                {exercise.type === 'multiple-choice' && exercise.options && (
                  <div className="space-y-2">
                    {exercise.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => !showResult && setUserAnswer(option)}
                        disabled={showResult}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          userAnswer === option
                            ? showResult
                              ? option === exercise.correctAnswer
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-purple-500 bg-purple-50'
                            : showResult && option === exercise.correctAnswer
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {(exercise.type === 'fill-blank' || exercise.type === 'error-correction') && (
                  <div>
                    <Input
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder={exercise.type === 'error-correction' ? 'Write the corrected sentence...' : 'Type your answer...'}
                      disabled={showResult}
                      className="text-lg"
                      onKeyDown={(e) => e.key === 'Enter' && !showResult && userAnswer && checkAnswer()}
                    />
                    {exercise.hint && !showResult && (
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-sm text-purple-600 mt-2 hover:underline"
                      >
                        {showHint ? 'Hide hint' : 'Show hint'}
                      </button>
                    )}
                    {showHint && exercise.hint && (
                      <p className="text-sm text-purple-600 mt-2 bg-purple-50 p-2 rounded">
                        💡 {exercise.hint}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {showResult && (
                <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="font-semibold text-red-800">Not quite right</span>
                      </>
                    )}
                  </div>
                  {!isCorrect && (
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Correct answer:</strong> {exercise.correctAnswer}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">{exercise.explanation}</p>
                </div>
              )}

              <div className="flex justify-end gap-4">
                {!showResult ? (
                  <Button onClick={checkAnswer} disabled={!userAnswer}>
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={nextExercise}>
                    {currentExercise < selectedTopic.exercises.length - 1 ? (
                      <>
                        Next Question
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        See Results
                        <Trophy className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-10 w-10" />
            <h1 className="text-3xl font-bold">Grammar Exercises</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            Interactive fill-in-the-blank exercises for each grammar topic. Practice makes perfect!
          </p>
          
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{GRAMMAR_EXERCISES.length}</div>
              <div className="text-sm opacity-80">Topics</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{getTotalProgress()}%</div>
              <div className="text-sm opacity-80">Complete</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{getTotalScore()}%</div>
              <div className="text-sm opacity-80">Avg Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GRAMMAR_EXERCISES.map((topic) => {
            const topicProgress = progress[topic.id];
            return (
              <Card 
                key={topic.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => startPractice(topic)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={
                      topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      topic.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }>
                      {topic.difficulty}
                    </Badge>
                    {topicProgress?.completed && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        {Math.round((topicProgress.score / topicProgress.total) * 100)}%
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                    {topic.title}
                  </CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{topic.exercises.length} exercises</span>
                    <span className="flex items-center gap-1 text-purple-600 group-hover:translate-x-1 transition-transform">
                      Start Practice
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Want to learn the grammar rules first?</p>
          <Link to="/grammar">
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Grammar Lessons
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
