export interface CurriculumLesson {
  title: string;
  lessonId?: string;
}

export interface CurriculumModule {
  module: string;
  lessons: (string | CurriculumLesson)[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  nextBatch: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string;
  type: 'live' | 'recorded' | 'hybrid';
  features: string[];
  isPopular?: boolean;
  accentColor: string;
  bgGradient: string;
  curriculum?: CurriculumModule[];
}

export const COURSES: Course[] = [
  {
    id: 'ielts-masterclass',
    title: 'IELTS Band 8+ Masterclass',
    description: 'Our most comprehensive program covering all 4 modules (Reading, Writing, Listening, Speaking) with personal feedback.',
    instructor: 'Arefin Shovo',
    nextBatch: 'April 15, 2026',
    price: 5500,
    originalPrice: 8000,
    duration: '3 Months',
    level: 'Any',
    type: 'live',
    isPopular: true,
    accentColor: 'indigo',
    bgGradient: 'from-blue-500 to-indigo-600',
    features: [
      '24 Interactive Live Classes',
      'Daily Practice Materials',
      'Personalized Writing Feedback',
      '1-on-1 Speaking Mock Tests',
      'Life-time Access to Recorded Classes'
    ],
    curriculum: [
      {
        module: "Module 1: Speaking Mastery (6 Classes)",
        lessons: [
          { title: "Class 01: Part 1 Fluency & Confidence Building", lessonId: "speaking-part1-fluency-confidence" },
          { title: "Class 02: Expanding Answers with Cohesive Devices", lessonId: "speaking-class2-expansion-techniques" },
          { title: "Class 03: Part 2 Cue-Card Storytelling Method (Group A)", lessonId: "speaking-class3-cuecard-storytelling" },
          { title: "Class 04: Part 2 Cue-Card Storytelling Method (Group B)", lessonId: "speaking-class4-part2-logic" },
          { title: "Class 05: Part 3 Analytical & Abstract Question Handling", lessonId: "speaking-class5-part3-analysis" },
          { title: "Class 06: Pronunciation, Intonation & Final Speaking Mocks", lessonId: "speaking-class6-mocks-delivery" }
        ]
      },
      {
        module: "Module 2: Writing Task 1 & 2 Excellence (8 Classes)",
        lessons: [
          { title: "Class 07: Task 1 Academic - Data Analysis & Report Writing", lessonId: "writing-class7-task1-academic" },
          { title: "Class 08: Task 1 General - Letter Writing Tone & Purpose", lessonId: "writing-class8-task1-general" },
          { title: "Class 09: Task 2 Essay Structures (Agree/Disagree & Discussion)", lessonId: "writing-class9-task2-essay-logic" },
          { title: "Class 10: Task 2 Essay Structures (Problem/Solution & Direct)", lessonId: "writing-class10-task2-problem-solution" },
          { title: "Class 11: Cohesion & Coherence: Linking Ideas Like a Pro", lessonId: "writing-class11-cohesion-coherence" },
          { title: "Class 12: Advanced Vocabulary & Collocations for Writing", lessonId: "writing-class12-vocabulary-collocations" },
          { title: "Class 13: Grammatical Range & Accuracy for Band 8+", lessonId: "writing-class13-grammatical-range" },
          { title: "Class 14: Full Essay Live Review & Personal Feedback", lessonId: "writing-class14-essay-review" }
        ]
      },
      {
        module: "Module 3: Reading Speed & Strategy (5 Classes)",
        lessons: [
          { title: "Class 15: Skimming & Scanning: The FOUNDATION", lessonId: "reading-class15-skimming-scanning" },
          { title: "Class 16: Solving True/False/Not Given & Yes/No/Not Given", lessonId: "reading-class16-tfng" },
          { title: "Class 17: Heading Matching & Summary Completion Secrets", lessonId: "reading-class17-headings-summary" },
          { title: "Class 18: Keyword Mapping & Eliminate Distractors", lessonId: "reading-class18-keyword-mapping" },
          { title: "Class 19: Full Passage Solve - Time Management Under Pressure", lessonId: "reading-class19-full-passage" }
        ]
      },
      {
        module: "Module 4: Listening Precision (5 Classes)",
        lessons: [
          { title: "Class 20: Avoiding Common Traps (Names, Numbers, Spellings)", lessonId: "listening-class20-avoiding-traps" },
          { title: "Class 21: Section 1 & 2: Form & Note Completion Mastery", lessonId: "listening-class21-section1-2" },
          { title: "Class 22: Section 3: Multiple Choice & Matching in Dialogues", lessonId: "listening-class22-section3" },
          { title: "Class 23: Section 4: Academic Lecture Completion Techniques", lessonId: "listening-class23-section4" },
          { title: "Class 24: Final Full Mock Listening & Strategy Wrap-up", lessonId: "listening-class24-mock-wrapup" }
        ]
      }
    ]
  },
  {
    id: 'writing-intensive',
    title: 'Writing Task 1 & 2 Intensive',
    description: 'Master Task 1 and Task 2 with advanced templates and weekly scoring. Focus on high-band grammar & vocabulary.',
    instructor: 'Sharmin Alam',
    nextBatch: 'April 10, 2026',
    price: 2500,
    originalPrice: 3500,
    duration: '1 Month',
    level: 'Intermediate+',
    type: 'live',
    accentColor: 'rose',
    bgGradient: 'from-rose-500 to-pink-600',
    features: [
      '12 Special Writing Sessions',
      'Band 8+ Grammar Templates',
      'Daily Homework Tasks',
      'Weekly Essay Feedback',
      'IELTS Writing Handbook'
    ]
  },
  {
    id: 'speaking-club',
    title: 'IELTS Speaking Confidence Club',
    description: 'Overcome your speaking fear. Daily 30-minute practice sessions with peers and expert feedback.',
    instructor: 'James Rodger',
    nextBatch: 'Ongoing',
    price: 1500,
    originalPrice: 2000,
    duration: '1 Month',
    level: 'Any',
    type: 'live',
    accentColor: 'amber',
    bgGradient: 'from-amber-400 to-orange-500',
    features: [
      'Daily 1-on-1 Practice',
      'Cue-card Strategy Lessons',
      'Pronunciation Workshops',
      'Idioms and Phrasal Verbs',
      'Weekly Speaking Mocks'
    ]
  },
  {
    id: 'reading-listening-suite',
    title: 'Rapid Reading & Listening Suite',
    description: 'Speed up your reading and sharpen your ears. Focused practice on tricky question types and keywords.',
    instructor: 'Sifat Hasan',
    nextBatch: 'Self-paced',
    price: 1200,
    originalPrice: 1800,
    duration: 'Lifetime',
    level: 'Any',
    type: 'recorded',
    accentColor: 'emerald',
    bgGradient: 'from-emerald-400 to-teal-600',
    features: [
      '50+ High-quality Mock Tests',
      'Strategy Video Explanations',
      'Vocabulary for Reading',
      'Keyword Mapping Techniques',
      'Instant Result Tracking'
    ]
  }
];
