import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Trophy,
  Target,
  ChevronRight,
  Clock,
  Award,
  Flame,
  AlertCircle
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
  ieltsContext?: string;
  writingTask?: {
    prompt: string;
    targetStructure: string;
    exampleSentence: string;
  };
}

const GRAMMAR_EXERCISES: GrammarTopic[] = [
  {
    id: 'conditionals',
    title: 'Conditional Sentences',
    description: 'Master all four types of conditionals for IELTS Writing and Speaking',
    difficulty: 'intermediate',
    ieltsContext: 'In IELTS Writing Task 2, conditionals are essential for discussing hypothetical situations, consequences, and solutions. For example: "If governments invested more in renewable energy, carbon emissions would decrease significantly." This demonstrates your ability to express complex ideas about cause and effect.',
    writingTask: {
      prompt: 'Write 2-3 sentences about education using conditionals. Discuss what would happen if governments increased funding for schools.',
      targetStructure: 'Use at least one second conditional (If + past, would + verb)',
      exampleSentence: 'If the government allocated more resources to education, students would have access to better facilities and qualified teachers.'
    },
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
      ieltsContext: 'Passive voice is frequently used in IELTS Writing Task 1 to describe processes and data objectively. For example: "The raw materials are transported to the factory, where they are processed and packaged." It helps maintain an impersonal, academic tone.',
      writingTask: {
        prompt: 'Write 2-3 sentences describing how a product is manufactured or a process works, using passive voice.',
        targetStructure: 'Use at least two passive constructions (be + past participle)',
        exampleSentence: 'The components are assembled in the factory, and the finished products are then shipped to retailers worldwide.'
      },
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
      ieltsContext: 'Relative clauses help you write more sophisticated sentences in IELTS Writing. Instead of short, choppy sentences, you can combine ideas: "The policy, which was introduced last year, has significantly reduced pollution levels." This demonstrates grammatical range and accuracy.',
      writingTask: {
        prompt: 'Write 2-3 sentences about technology using relative clauses. Combine information about a device or innovation.',
        targetStructure: 'Use at least one defining and one non-defining relative clause',
        exampleSentence: 'Smartphones, which have become essential in modern life, enable people who live in remote areas to access information instantly.'
      },
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
      ieltsContext: 'Article errors are among the most common mistakes in IELTS Writing. Correct usage shows grammatical accuracy: "Education plays a vital role in society" (general) vs "The education system in my country needs reform" (specific). Mastering articles can significantly improve your band score.',
      writingTask: {
        prompt: 'Write 2-3 sentences about the environment, paying careful attention to article usage with general and specific nouns.',
        targetStructure: 'Use a mix of definite (the), indefinite (a/an), and zero articles correctly',
        exampleSentence: 'Pollution is a major problem in cities. The air quality in urban areas has deteriorated significantly over the past decade.'
      },
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
      ieltsContext: 'Accurate tense usage is crucial in IELTS Writing Task 1 for describing trends and in Task 2 for discussing past, present, and future situations. For example: "The number of students has increased significantly since 2010" shows present perfect for trends continuing to now.',
      writingTask: {
        prompt: 'Write 2-3 sentences describing changes in your city over the past decade, using appropriate tenses.',
        targetStructure: 'Use present perfect for changes with present relevance and past simple for completed changes',
        exampleSentence: 'The population has grown rapidly since 2010. Many new buildings were constructed last year, and development is still ongoing.'
      },
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
      ieltsContext: 'Reported speech is essential in IELTS Speaking Part 2 when describing conversations and in Writing when citing sources or opinions. For example: "Experts claim that climate change poses a significant threat" demonstrates academic reporting style.',
      writingTask: {
        prompt: 'Write 2-3 sentences reporting what experts or researchers have said about a social issue (health, education, or environment).',
        targetStructure: 'Use reporting verbs (claim, argue, suggest, state) with appropriate tense backshift',
        exampleSentence: 'Researchers have argued that regular exercise reduces the risk of heart disease. They also suggested that a balanced diet was equally important.'
      },
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
      ieltsContext: 'Modal verbs are essential in IELTS Writing Task 2 for expressing opinions, giving recommendations, and discussing possibilities. For example: "Governments should invest more in public transport" shows recommendation, while "This could lead to environmental benefits" shows possibility.',
      writingTask: {
        prompt: 'Write 2-3 sentences giving recommendations about how to improve public health, using modal verbs.',
        targetStructure: 'Use should/must for recommendations and could/might for possibilities',
        exampleSentence: 'Governments should implement stricter regulations on junk food advertising. This could significantly reduce obesity rates among children.'
      },
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
      ieltsContext: 'Comparatives and superlatives are crucial in IELTS Writing Task 1 for comparing data and in Task 2 for making arguments. For example: "Urban areas have significantly higher pollution levels than rural regions" or "The most effective solution would be to invest in renewable energy."',
      writingTask: {
        prompt: 'Write 2-3 sentences comparing two countries or cities in terms of development, population, or quality of life.',
        targetStructure: 'Use at least one comparative and one superlative form',
        exampleSentence: 'Japan has a higher life expectancy than most Western countries. It is one of the most developed nations in Asia, with better healthcare facilities than its neighbors.'
      },
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
const MISTAKES_KEY = 'grammar_mistakes';
const MASTERY_KEY = 'grammar_mastery';

interface MistakeRecord {
  topicId: string;
  exerciseId: string;
  wrongCount: number;
  lastWrongAt: string;
  lastAnswer: string;
  dueAt: string;
  consecutiveCorrect: number;
}

interface MasteryLevel {
  topicId: string;
  level: 'bronze' | 'silver' | 'gold' | 'none';
  totalAttempts: number;
  totalCorrect: number;
  streak: number;
  lastPracticed: string;
}

function getStoredProgress(): Record<string, { completed: boolean; score: number; total: number }> {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveProgress(topicId: string, score: number, total: number) {
  const progress = getStoredProgress();
  progress[topicId] = { completed: true, score, total };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getMistakes(): MistakeRecord[] {
  const stored = localStorage.getItem(MISTAKES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveMistake(topicId: string, exerciseId: string, userAnswer: string) {
  const mistakes = getMistakes();
  const existingIndex = mistakes.findIndex(m => m.topicId === topicId && m.exerciseId === exerciseId);
  const now = new Date().toISOString();
  const dueAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  
  if (existingIndex >= 0) {
    mistakes[existingIndex].wrongCount += 1;
    mistakes[existingIndex].lastWrongAt = now;
    mistakes[existingIndex].lastAnswer = userAnswer;
    mistakes[existingIndex].dueAt = dueAt;
    mistakes[existingIndex].consecutiveCorrect = 0;
  } else {
    mistakes.push({
      topicId,
      exerciseId,
      wrongCount: 1,
      lastWrongAt: now,
      lastAnswer: userAnswer,
      dueAt,
      consecutiveCorrect: 0
    });
  }
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
}

function markMistakeCorrect(topicId: string, exerciseId: string) {
  const mistakes = getMistakes();
  const existingIndex = mistakes.findIndex(m => m.topicId === topicId && m.exerciseId === exerciseId);
  
  if (existingIndex >= 0) {
    const mistake = mistakes[existingIndex];
    mistake.consecutiveCorrect += 1;
    
    const intervals = [1, 3, 7, 14, 30];
    const intervalIndex = Math.min(mistake.consecutiveCorrect - 1, intervals.length - 1);
    const daysUntilNext = intervals[intervalIndex];
    mistake.dueAt = new Date(Date.now() + daysUntilNext * 24 * 60 * 60 * 1000).toISOString();
    
    if (mistake.consecutiveCorrect >= 5) {
      mistakes.splice(existingIndex, 1);
    }
    
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
  }
}

function getDueMistakes(): MistakeRecord[] {
  const mistakes = getMistakes();
  const now = new Date().toISOString();
  return mistakes.filter(m => m.dueAt <= now);
}

function getMastery(): Record<string, MasteryLevel> {
  const stored = localStorage.getItem(MASTERY_KEY);
  return stored ? JSON.parse(stored) : {};
}

function updateMastery(topicId: string, correct: number, total: number) {
  const mastery = getMastery();
  const now = new Date().toISOString();
  
  if (!mastery[topicId]) {
    mastery[topicId] = {
      topicId,
      level: 'none',
      totalAttempts: 0,
      totalCorrect: 0,
      streak: 0,
      lastPracticed: now
    };
  }
  
  const m = mastery[topicId];
  m.totalAttempts += total;
  m.totalCorrect += correct;
  m.lastPracticed = now;
  
  const percentage = (correct / total) * 100;
  if (percentage >= 80) {
    m.streak += 1;
  } else {
    m.streak = 0;
  }
  
  const overallPercentage = (m.totalCorrect / m.totalAttempts) * 100;
  if (overallPercentage >= 90 && m.streak >= 3) {
    m.level = 'gold';
  } else if (overallPercentage >= 75 && m.streak >= 2) {
    m.level = 'silver';
  } else if (overallPercentage >= 60 && m.streak >= 1) {
    m.level = 'bronze';
  }
  
  localStorage.setItem(MASTERY_KEY, JSON.stringify(mastery));
  return m;
}

export default function GrammarExercisesPage() {
  const [searchParams] = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState<Record<string, { completed: boolean; score: number; total: number }>>(getStoredProgress());
  const [stage, setStage] = useState<'select' | 'practice' | 'results' | 'review'>('select');
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(getMistakes());
  const [dueMistakes, setDueMistakes] = useState<MistakeRecord[]>(getDueMistakes());
  const [mastery, setMastery] = useState<Record<string, MasteryLevel>>(getMastery());
  const [reviewExercises, setReviewExercises] = useState<Array<{ topic: GrammarTopic; exercise: Exercise; mistake: MistakeRecord }>>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewScore, setReviewScore] = useState(0);

  useEffect(() => {
    setProgress(getStoredProgress());
    setMistakes(getMistakes());
    setDueMistakes(getDueMistakes());
    setMastery(getMastery());
    
    const topicParam = searchParams.get('topic');
    if (topicParam && stage === 'select') {
      const topic = GRAMMAR_EXERCISES.find(t => t.id === topicParam);
      if (topic) {
        startPractice(topic);
      }
    }
  }, [searchParams]);

  const startPractice = (topic: GrammarTopic) => {
    setSelectedTopic(topic);
    setCurrentExercise(0);
    setScore(0);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setStage('practice');
  };

  const startReview = () => {
    const due = getDueMistakes();
    const exercises: Array<{ topic: GrammarTopic; exercise: Exercise; mistake: MistakeRecord }> = [];
    
    due.forEach(mistake => {
      const topic = GRAMMAR_EXERCISES.find(t => t.id === mistake.topicId);
      if (topic) {
        const exercise = topic.exercises.find(e => e.id === mistake.exerciseId);
        if (exercise) {
          exercises.push({ topic, exercise, mistake });
        }
      }
    });
    
    if (exercises.length > 0) {
      setReviewExercises(exercises);
      setCurrentReviewIndex(0);
      setReviewScore(0);
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
      setStage('review');
    }
  };

  // Helper function to check if user answer matches any accepted answer (supports synonyms with "/" delimiter)
  const isAnswerCorrect = (userAnswer: string, correctAnswer: string): boolean => {
    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrectAnswer = correctAnswer.toLowerCase().trim();
    
    // Special handling for "no article"
    if (normalizedCorrectAnswer === 'no article') {
      const noArticleAliases = ['', '-', 'none', 'nothing', 'no article', 'no-article', 'blank', 'empty'];
      return noArticleAliases.includes(normalizedUserAnswer);
    }
    
    // Check if correctAnswer contains synonyms (separated by "/")
    if (normalizedCorrectAnswer.includes('/')) {
      const acceptedAnswers = normalizedCorrectAnswer.split('/').map(a => a.trim());
      return acceptedAnswers.some(accepted => normalizedUserAnswer === accepted);
    }
    
    // Standard exact match
    return normalizedUserAnswer === normalizedCorrectAnswer;
  };

  const checkAnswer = () => {
    if (!selectedTopic) return;
    const exercise = selectedTopic.exercises[currentExercise];
    
    const correct = isAnswerCorrect(userAnswer, exercise.correctAnswer);
    
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
      markMistakeCorrect(selectedTopic.id, exercise.id);
    } else {
      saveMistake(selectedTopic.id, exercise.id, userAnswer);
    }
    setShowResult(true);
    setMistakes(getMistakes());
    setDueMistakes(getDueMistakes());
  };

  const checkReviewAnswer = () => {
    if (reviewExercises.length === 0) return;
    const { topic, exercise } = reviewExercises[currentReviewIndex];
    
    const correct = isAnswerCorrect(userAnswer, exercise.correctAnswer);
    
    setIsCorrect(correct);
    if (correct) {
      setReviewScore(reviewScore + 1);
      markMistakeCorrect(topic.id, exercise.id);
    } else {
      saveMistake(topic.id, exercise.id, userAnswer);
    }
    setShowResult(true);
    setMistakes(getMistakes());
    setDueMistakes(getDueMistakes());
  };

  const nextReviewExercise = () => {
    if (currentReviewIndex < reviewExercises.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
    } else {
      setStage('select');
      setDueMistakes(getDueMistakes());
    }
  };

  const nextExercise = () => {
    if (!selectedTopic) return;
    if (currentExercise < selectedTopic.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
    } else {
      saveProgress(selectedTopic.id, score, selectedTopic.exercises.length);
      updateMastery(selectedTopic.id, score, selectedTopic.exercises.length);
      setProgress(getStoredProgress());
      setMastery(getMastery());
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
    setDueMistakes(getDueMistakes());
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

                            {selectedTopic.ieltsContext && (
                              <div className="bg-blue-50 rounded-lg p-4 text-left border border-blue-200">
                                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                  <BookOpen className="h-4 w-4" />
                                  IELTS Context
                                </h4>
                                <p className="text-sm text-blue-700">{selectedTopic.ieltsContext}</p>
                              </div>
                            )}

                            {selectedTopic.writingTask && (
                              <div className="bg-green-50 rounded-lg p-4 text-left border border-green-200">
                                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Practice Writing Task
                                </h4>
                                <p className="text-sm text-green-700 mb-3">{selectedTopic.writingTask.prompt}</p>
                                <div className="bg-white rounded p-3 border border-green-200">
                                  <p className="text-xs text-green-600 font-medium mb-1">Target Structure:</p>
                                  <p className="text-sm text-gray-700 mb-2">{selectedTopic.writingTask.targetStructure}</p>
                                  <p className="text-xs text-green-600 font-medium mb-1">Example:</p>
                                  <p className="text-sm text-gray-600 italic">"{selectedTopic.writingTask.exampleSentence}"</p>
                                </div>
                              </div>
                            )}

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

    if (stage === 'review' && reviewExercises.length > 0) {
      const { topic, exercise } = reviewExercises[currentReviewIndex];
      const progressPercent = ((currentReviewIndex + 1) / reviewExercises.length) * 100;

      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Button variant="ghost" onClick={resetPractice}>
                  ← Back to Topics
                </Button>
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  <Clock className="h-3 w-3 mr-1" />
                  Review {currentReviewIndex + 1} / {reviewExercises.length}
                </Badge>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-orange-100 text-orange-800">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Review Mode
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Target className="h-4 w-4" />
                    Score: {reviewScore}
                  </div>
                </div>
                <CardTitle className="text-xl mt-4">{topic.title}</CardTitle>
                <CardDescription>Previously missed question - let's try again!</CardDescription>
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
                                : 'border-orange-500 bg-orange-50'
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
                        onKeyDown={(e) => e.key === 'Enter' && !showResult && userAnswer && checkReviewAnswer()}
                      />
                      {exercise.hint && !showResult && (
                        <button
                          onClick={() => setShowHint(!showHint)}
                          className="text-sm text-orange-600 mt-2 hover:underline"
                        >
                          {showHint ? 'Hide hint' : 'Show hint'}
                        </button>
                      )}
                      {showHint && exercise.hint && (
                        <p className="text-sm text-orange-600 mt-2 bg-orange-50 p-2 rounded">
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
                          <span className="font-semibold text-green-800">Correct! Great improvement!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-600" />
                          <span className="font-semibold text-red-800">Not quite - we'll review this again</span>
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
                    <Button onClick={checkReviewAnswer} disabled={!userAnswer} className="bg-orange-600 hover:bg-orange-700">
                      Check Answer
                    </Button>
                  ) : (
                    <Button onClick={nextReviewExercise} className="bg-orange-600 hover:bg-orange-700">
                      {currentReviewIndex < reviewExercises.length - 1 ? (
                        <>
                          Next Review
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Finish Review
                          <CheckCircle2 className="h-4 w-4 ml-2" />
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
                      placeholder={exercise.type === 'error-correction' ? 'Write the corrected sentence...' : exercise.correctAnswer.toLowerCase() === 'no article' ? 'Type your answer or leave blank for no article...' : 'Type your answer...'}
                      disabled={showResult}
                      className="text-lg"
                      onKeyDown={(e) => e.key === 'Enter' && !showResult && (userAnswer || exercise.correctAnswer.toLowerCase() === 'no article') && checkAnswer()}
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
                  <Button onClick={checkAnswer} disabled={!userAnswer && exercise.correctAnswer.toLowerCase() !== 'no article'}>
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

    const getMasteryIcon = (level: string) => {
      switch (level) {
        case 'gold': return <Award className="h-4 w-4 text-yellow-500" />;
        case 'silver': return <Award className="h-4 w-4 text-gray-400" />;
        case 'bronze': return <Award className="h-4 w-4 text-orange-600" />;
        default: return null;
      }
    };

    const getMasteryColor = (level: string) => {
      switch (level) {
        case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
        case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-300';
        default: return '';
      }
    };

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
          
            <div className="mt-6 grid grid-cols-4 gap-4 max-w-xl">
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
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{dueMistakes.length}</div>
                <div className="text-sm opacity-80">Due Review</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {dueMistakes.length > 0 && (
            <Card className="mb-8 border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-800">Daily Review Ready!</h3>
                      <p className="text-sm text-orange-600">
                        You have {dueMistakes.length} question{dueMistakes.length > 1 ? 's' : ''} to review from previous mistakes
                      </p>
                    </div>
                  </div>
                  <Button onClick={startReview} className="bg-orange-600 hover:bg-orange-700">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Start Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {mistakes.length > 0 && dueMistakes.length === 0 && (
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">All caught up!</h3>
                    <p className="text-sm text-green-600">
                      No reviews due right now. Keep practicing to build your skills!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GRAMMAR_EXERCISES.map((topic) => {
              const topicProgress = progress[topic.id];
              const topicMastery = mastery[topic.id];
              const topicMistakeCount = mistakes.filter(m => m.topicId === topic.id).length;
            
              return (
                <Card 
                  key={topic.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => startPractice(topic)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={
                          topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          topic.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }>
                          {topic.difficulty}
                        </Badge>
                        {topicMastery && topicMastery.level !== 'none' && (
                          <Badge className={`${getMasteryColor(topicMastery.level)} border`}>
                            {getMasteryIcon(topicMastery.level)}
                            <span className="ml-1 capitalize">{topicMastery.level}</span>
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {topicMistakeCount > 0 && (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {topicMistakeCount}
                          </Badge>
                        )}
                        {topicProgress?.completed && (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            {Math.round((topicProgress.score / topicProgress.total) * 100)}%
                          </div>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                      {topic.title}
                    </CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>{topic.exercises.length} exercises</span>
                        {topicMastery && topicMastery.streak > 0 && (
                          <span className="flex items-center gap-1 text-orange-500">
                            <Flame className="h-3 w-3" />
                            {topicMastery.streak}
                          </span>
                        )}
                      </div>
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
