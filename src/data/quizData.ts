export interface QuizQuestion {
  id: string;
  sentence: string;
  blank: string;
  answer: string;
  hint?: string;
  explanation?: string;
  category: 'vocabulary' | 'grammar' | 'writing' | 'speaking';
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: 'vocabulary' | 'grammar' | 'writing' | 'speaking';
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimit: number;
  questions: QuizQuestion[];
  is_premium: boolean;
}

export const QUIZZES: Quiz[] = [
  {
    id: 'vocab-collocations-1',
    title: 'Academic Collocations Quiz',
    description: 'Test your knowledge of common academic collocations used in IELTS.',
    category: 'vocabulary',
    topic: 'Academic Collocations',
    difficulty: 'intermediate',
    timeLimit: 300,
    is_premium: false,
    questions: [
      {
        id: 'vc1-1',
        sentence: 'The research team conducted a _____ study on climate change.',
        blank: '_____',
        answer: 'comprehensive',
        hint: 'Means thorough and complete',
        explanation: '"Comprehensive study" is a common academic collocation meaning a thorough, complete study.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-2',
        sentence: 'Scientists have _____ evidence that global warming is accelerating.',
        blank: '_____',
        answer: 'compelling',
        hint: 'Means convincing or persuasive',
        explanation: '"Compelling evidence" means evidence that is convincing and hard to argue against.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-3',
        sentence: 'The government needs to _____ measures to reduce pollution.',
        blank: '_____',
        answer: 'implement',
        hint: 'Means to put into action',
        explanation: '"Implement measures" is a formal way to say "put measures into action".',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-4',
        sentence: 'There has been a _____ increase in online learning since 2020.',
        blank: '_____',
        answer: 'significant',
        hint: 'Means large or important',
        explanation: '"Significant increase" describes a notable, meaningful rise in something.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-5',
        sentence: 'The study _____ light on the causes of youth unemployment.',
        blank: '_____',
        answer: 'sheds',
        hint: 'Part of the phrase "_____ light on"',
        explanation: '"Sheds light on" means to clarify or explain something.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-6',
        sentence: 'Education plays a _____ role in economic development.',
        blank: '_____',
        answer: 'crucial',
        hint: 'Means very important',
        explanation: '"Crucial role" emphasizes the vital importance of something.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-7',
        sentence: 'The report _____ concerns about data privacy.',
        blank: '_____',
        answer: 'raises',
        hint: 'Means to bring up or highlight',
        explanation: '"Raises concerns" means to bring attention to worries or problems.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-8',
        sentence: 'We need to _____ a balance between work and personal life.',
        blank: '_____',
        answer: 'strike',
        hint: 'Part of the phrase "_____ a balance"',
        explanation: '"Strike a balance" means to find a good compromise between two things.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-9',
        sentence: 'The findings have _____ implications for future research.',
        blank: '_____',
        answer: 'profound',
        hint: 'Means deep or significant',
        explanation: '"Profound implications" means very significant or far-reaching effects.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      },
      {
        id: 'vc1-10',
        sentence: 'Technology has _____ transformed the way we communicate.',
        blank: '_____',
        answer: 'fundamentally',
        hint: 'Means at the most basic level',
        explanation: '"Fundamentally transformed" means changed at the most basic, essential level.',
        category: 'vocabulary',
        topic: 'Academic Collocations',
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'grammar-tenses-1',
    title: 'Verb Tenses Quiz',
    description: 'Test your understanding of English verb tenses commonly tested in IELTS.',
    category: 'grammar',
    topic: 'Verb Tenses',
    difficulty: 'intermediate',
    timeLimit: 300,
    is_premium: false,
    questions: [
      {
        id: 'gt1-1',
        sentence: 'By the time I arrived, the meeting _____ already started.',
        blank: '_____',
        answer: 'had',
        hint: 'Past perfect tense',
        explanation: 'Past perfect (had + past participle) is used for an action completed before another past action.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-2',
        sentence: 'She _____ working on this project for three months now.',
        blank: '_____',
        answer: 'has been',
        hint: 'Present perfect continuous',
        explanation: 'Present perfect continuous (has/have been + -ing) shows an action that started in the past and continues to the present.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-3',
        sentence: 'If I _____ more time, I would travel around the world.',
        blank: '_____',
        answer: 'had',
        hint: 'Second conditional',
        explanation: 'Second conditional uses past simple in the if-clause for hypothetical present/future situations.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-4',
        sentence: 'The report _____ published next week.',
        blank: '_____',
        answer: 'will be',
        hint: 'Future passive',
        explanation: 'Future passive (will be + past participle) is used for future actions in passive voice.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-5',
        sentence: 'I wish I _____ studied harder when I was younger.',
        blank: '_____',
        answer: 'had',
        hint: 'Wish + past perfect for past regrets',
        explanation: 'Wish + past perfect expresses regret about something in the past.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-6',
        sentence: 'By next year, they _____ completed the construction.',
        blank: '_____',
        answer: 'will have',
        hint: 'Future perfect',
        explanation: 'Future perfect (will have + past participle) describes an action that will be completed before a specific future time.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-7',
        sentence: 'The number of students _____ increased significantly since 2010.',
        blank: '_____',
        answer: 'has',
        hint: 'Present perfect for changes over time',
        explanation: 'Present perfect is used to describe changes that have happened over a period of time up to now.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-8',
        sentence: 'While I _____ studying, my phone rang.',
        blank: '_____',
        answer: 'was',
        hint: 'Past continuous for interrupted action',
        explanation: 'Past continuous describes an ongoing action that was interrupted by another action.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-9',
        sentence: 'It is essential that he _____ on time.',
        blank: '_____',
        answer: 'arrive',
        hint: 'Subjunctive mood (base form)',
        explanation: 'After "it is essential that", we use the subjunctive (base form of verb).',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      },
      {
        id: 'gt1-10',
        sentence: 'The data _____ collected over a period of five years.',
        blank: '_____',
        answer: 'was',
        hint: 'Past passive',
        explanation: 'Past passive (was/were + past participle) describes completed past actions in passive voice.',
        category: 'grammar',
        topic: 'Verb Tenses',
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'writing-task2-phrases-1',
    title: 'Task 2 Essay Phrases Quiz',
    description: 'Test your knowledge of useful phrases for IELTS Writing Task 2 essays.',
    category: 'writing',
    topic: 'Task 2 Phrases',
    difficulty: 'intermediate',
    timeLimit: 300,
    is_premium: true,
    questions: [
      {
        id: 'wt1-1',
        sentence: 'In my _____, technology has more benefits than drawbacks.',
        blank: '_____',
        answer: 'opinion',
        hint: 'Common phrase for expressing views',
        explanation: '"In my opinion" is a standard phrase for introducing your viewpoint.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-2',
        sentence: 'On the one _____, remote work offers flexibility.',
        blank: '_____',
        answer: 'hand',
        hint: 'Part of a contrast phrase',
        explanation: '"On the one hand... on the other hand" is used to present two contrasting viewpoints.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-3',
        sentence: 'Taking everything into _____, I believe education is the key to success.',
        blank: '_____',
        answer: 'consideration',
        hint: 'Conclusion phrase',
        explanation: '"Taking everything into consideration" is a formal way to introduce your conclusion.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-4',
        sentence: 'It is widely _____ that exercise improves mental health.',
        blank: '_____',
        answer: 'acknowledged',
        hint: 'Means generally accepted',
        explanation: '"It is widely acknowledged that" introduces a commonly accepted fact.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-5',
        sentence: 'From my point of _____, governments should invest more in education.',
        blank: '_____',
        answer: 'view',
        hint: 'Another way to say "in my opinion"',
        explanation: '"From my point of view" is a formal alternative to "in my opinion".',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-6',
        sentence: 'There are several _____ why people choose to live in cities.',
        blank: '_____',
        answer: 'reasons',
        hint: 'Explains causes',
        explanation: '"There are several reasons why" introduces multiple causes or explanations.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-7',
        sentence: 'In _____, the advantages outweigh the disadvantages.',
        blank: '_____',
        answer: 'conclusion',
        hint: 'Final paragraph starter',
        explanation: '"In conclusion" signals the final paragraph of your essay.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-8',
        sentence: 'This essay will _____ both sides of the argument.',
        blank: '_____',
        answer: 'discuss',
        hint: 'Introduction phrase for discussion essays',
        explanation: '"This essay will discuss" is a clear way to state your essay\'s purpose.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-9',
        sentence: 'A _____ example of this is the rise of social media.',
        blank: '_____',
        answer: 'prime',
        hint: 'Means excellent or perfect',
        explanation: '"A prime example" means an excellent or perfect example.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'wt1-10',
        sentence: 'To _____ up, I firmly believe that education should be free.',
        blank: '_____',
        answer: 'sum',
        hint: 'Conclusion phrase',
        explanation: '"To sum up" is a common way to introduce your conclusion.',
        category: 'writing',
        topic: 'Task 2 Phrases',
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'speaking-fluency-1',
    title: 'Speaking Fluency Phrases Quiz',
    description: 'Test your knowledge of natural phrases for IELTS Speaking.',
    category: 'speaking',
    topic: 'Fluency Phrases',
    difficulty: 'intermediate',
    timeLimit: 300,
    is_premium: true,
    questions: [
      {
        id: 'sf1-1',
        sentence: 'Well, to be _____, I haven\'t really thought about that before.',
        blank: '_____',
        answer: 'honest',
        hint: 'Common filler phrase',
        explanation: '"To be honest" is a natural way to introduce your genuine opinion.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-2',
        sentence: 'I\'m quite _____ photography, actually.',
        blank: '_____',
        answer: 'into',
        hint: 'Means interested in',
        explanation: '"I\'m quite into" is a natural way to express interest in a hobby.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-3',
        sentence: 'It really _____ on the situation.',
        blank: '_____',
        answer: 'depends',
        hint: 'Shows flexibility in thinking',
        explanation: '"It depends on" shows you can consider different perspectives.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-4',
        sentence: 'I\'d _____ I\'m more of a morning person.',
        blank: '_____',
        answer: 'say',
        hint: 'Softens your statement',
        explanation: '"I\'d say" is a natural way to express your opinion without being too direct.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-5',
        sentence: 'The _____ is, I\'ve never really enjoyed cooking.',
        blank: '_____',
        answer: 'thing',
        hint: 'Common phrase to introduce a point',
        explanation: '"The thing is" is a natural way to introduce an explanation or point.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-6',
        sentence: 'I have a soft _____ for Italian food.',
        blank: '_____',
        answer: 'spot',
        hint: 'Means a special liking for',
        explanation: '"Have a soft spot for" means to have a special fondness for something.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-7',
        sentence: 'That\'s a good _____, let me think about it.',
        blank: '_____',
        answer: 'question',
        hint: 'Buying time to think',
        explanation: '"That\'s a good question" gives you time to think while sounding natural.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-8',
        sentence: 'I\'ve been _____ on learning guitar recently.',
        blank: '_____',
        answer: 'hooked',
        hint: 'Means very interested or addicted',
        explanation: '"Hooked on" means very interested in or addicted to something.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-9',
        sentence: 'Looking _____, I wish I had studied abroad.',
        blank: '_____',
        answer: 'back',
        hint: 'Reflecting on the past',
        explanation: '"Looking back" is used when reflecting on past experiences.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      },
      {
        id: 'sf1-10',
        sentence: 'I suppose you could _____ that technology has changed everything.',
        blank: '_____',
        answer: 'say',
        hint: 'Introducing a general statement',
        explanation: '"You could say" is a natural way to introduce a general observation.',
        category: 'speaking',
        topic: 'Fluency Phrases',
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'vocab-synonyms-1',
    title: 'Band 9 Synonyms Quiz',
    description: 'Replace common words with Band 9 alternatives.',
    category: 'vocabulary',
    topic: 'Synonyms',
    difficulty: 'advanced',
    timeLimit: 300,
    is_premium: true,
    questions: [
      {
        id: 'vs1-1',
        sentence: 'The government should _____ stricter environmental laws. (implement)',
        blank: '_____',
        answer: 'enforce',
        hint: 'Band 9 alternative to "implement"',
        explanation: '"Enforce" is a sophisticated alternative to "implement" when talking about laws.',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-2',
        sentence: 'Climate change is a _____ issue facing humanity. (serious)',
        blank: '_____',
        answer: 'pressing',
        hint: 'Band 9 alternative to "serious"',
        explanation: '"Pressing" means urgent and requiring immediate attention.',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-3',
        sentence: 'The research _____ important findings. (showed)',
        blank: '_____',
        answer: 'revealed',
        hint: 'Band 9 alternative to "showed"',
        explanation: '"Revealed" is more sophisticated than "showed" in academic writing.',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-4',
        sentence: 'Technology has _____ transformed education. (completely)',
        blank: '_____',
        answer: 'fundamentally',
        hint: 'Band 9 alternative to "completely"',
        explanation: '"Fundamentally" means at the most basic level, more sophisticated than "completely".',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-5',
        sentence: 'There has been a _____ rise in unemployment. (big)',
        blank: '_____',
        answer: 'substantial',
        hint: 'Band 9 alternative to "big"',
        explanation: '"Substantial" is a more academic way to describe a large increase.',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-6',
        sentence: 'The benefits _____ the drawbacks. (are more than)',
        blank: '_____',
        answer: 'outweigh',
        hint: 'Band 9 alternative to "are more than"',
        explanation: '"Outweigh" is the standard academic term for comparing advantages and disadvantages.',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-7',
        sentence: 'This _____ a significant challenge. (is)',
        blank: '_____',
        answer: 'poses',
        hint: 'Band 9 alternative to "is" with challenges',
        explanation: '"Poses a challenge" is more sophisticated than "is a challenge".',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-8',
        sentence: 'The study _____ several key factors. (looked at)',
        blank: '_____',
        answer: 'examined',
        hint: 'Band 9 alternative to "looked at"',
        explanation: '"Examined" is more academic than "looked at" in research contexts.',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-9',
        sentence: 'Pollution _____ serious health problems. (causes)',
        blank: '_____',
        answer: 'triggers',
        hint: 'Band 9 alternative to "causes"',
        explanation: '"Triggers" suggests a more immediate cause-effect relationship.',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      },
      {
        id: 'vs1-10',
        sentence: 'The economy has _____ significantly. (grown)',
        blank: '_____',
        answer: 'expanded',
        hint: 'Band 9 alternative to "grown"',
        explanation: '"Expanded" is more sophisticated than "grown" for economic contexts.',
        category: 'vocabulary',
        topic: 'Synonyms',
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'grammar-articles-1',
    title: 'Articles Quiz (A, An, The)',
    description: 'Master the use of articles in English - a common IELTS challenge.',
    category: 'grammar',
    topic: 'Articles',
    difficulty: 'beginner',
    timeLimit: 240,
    is_premium: false,
    questions: [
      {
        id: 'ga1-1',
        sentence: '_____ education is important for everyone.',
        blank: '_____',
        answer: 'no article',
        hint: 'General concept, no article needed',
        explanation: 'When talking about education in general, no article is used.',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-2',
        sentence: 'I read _____ interesting article about climate change.',
        blank: '_____',
        answer: 'an',
        hint: 'Before a vowel sound',
        explanation: '"An" is used before words starting with a vowel sound.',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-3',
        sentence: '_____ United States is a large country.',
        blank: '_____',
        answer: 'The',
        hint: 'Specific country name with "United"',
        explanation: '"The" is used with country names that include "United", "Republic", etc.',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-4',
        sentence: 'She is _____ university student.',
        blank: '_____',
        answer: 'a',
        hint: '"University" starts with a consonant sound /j/',
        explanation: '"A" is used because "university" starts with a consonant sound /juː/.',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-5',
        sentence: '_____ sun rises in the east.',
        blank: '_____',
        answer: 'The',
        hint: 'Unique thing in the world',
        explanation: '"The" is used for unique things (the sun, the moon, the earth).',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-6',
        sentence: 'I had _____ breakfast at 8 AM.',
        blank: '_____',
        answer: 'no article',
        hint: 'Meals generally don\'t need articles',
        explanation: 'Meals (breakfast, lunch, dinner) typically don\'t use articles.',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-7',
        sentence: 'He plays _____ piano very well.',
        blank: '_____',
        answer: 'the',
        hint: 'Musical instruments use "the"',
        explanation: '"The" is used with musical instruments (play the piano, the guitar).',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-8',
        sentence: 'I need _____ hour to finish this task.',
        blank: '_____',
        answer: 'an',
        hint: '"Hour" starts with a vowel sound',
        explanation: '"An" is used because "hour" starts with a vowel sound /aʊ/.',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-9',
        sentence: '_____ water is essential for life.',
        blank: '_____',
        answer: 'no article',
        hint: 'Uncountable noun in general sense',
        explanation: 'Uncountable nouns used in a general sense don\'t need articles.',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      },
      {
        id: 'ga1-10',
        sentence: 'This is _____ best restaurant in town.',
        blank: '_____',
        answer: 'the',
        hint: 'Superlative adjective',
        explanation: '"The" is always used with superlative adjectives (the best, the most).',
        category: 'grammar',
        topic: 'Articles',
        difficulty: 'beginner'
      }
    ]
  }
];

export const getQuizzesByCategory = (category: string): Quiz[] => {
  if (category === 'all') return QUIZZES;
  return QUIZZES.filter(quiz => quiz.category === category);
};

export const getQuizById = (id: string): Quiz | undefined => {
  return QUIZZES.find(quiz => quiz.id === id);
};

export const getQuizzesByDifficulty = (difficulty: string): Quiz[] => {
  if (difficulty === 'all') return QUIZZES;
  return QUIZZES.filter(quiz => quiz.difficulty === difficulty);
};
