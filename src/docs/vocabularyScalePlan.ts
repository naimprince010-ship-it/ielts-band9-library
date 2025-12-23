/**
 * IELTS Band 9 Vocabulary Scale Plan
 * 
 * Target: 6,000-8,000 usable words via structured lesson packs
 * This roadmap defines the vocabulary coverage needed for Band 9 preparation.
 * 
 * Used for:
 * - Internal planning and content creation
 * - Progress tracking UI ("You've covered X% of Band 9 vocab")
 * - Admin dashboard metrics
 */

export interface VocabularyCategory {
  id: string;
  name: string;
  description: string;
  targetLessons: number;
  currentLessons: number;
  wordsPerLesson: number;
  totalTargetWords: number;
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'complete';
}

export interface VocabularyScalePlan {
  totalTargetWords: number;
  totalTargetLessons: number;
  currentTotalLessons: number;
  currentTotalWords: number;
  categories: VocabularyCategory[];
}

// Vocabulary Scale Plan Configuration
export const VOCABULARY_SCALE_PLAN: VocabularyScalePlan = {
  totalTargetWords: 7000, // Target: 6,000-8,000 usable words
  totalTargetLessons: 280, // ~25 words per lesson average
  currentTotalLessons: 16,
  currentTotalWords: 400, // 16 lessons × ~25 words

  categories: [
    // ============================================
    // TOPIC-BASED VOCABULARY PACKS (High Priority)
    // ============================================
    {
      id: 'topic-education',
      name: 'Education & Learning',
      description: 'Academic vocabulary, learning processes, educational systems',
      targetLessons: 8,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 200,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'topic-environment',
      name: 'Environment & Climate',
      description: 'Environmental issues, climate change, sustainability',
      targetLessons: 8,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 200,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'topic-technology',
      name: 'Technology & Innovation',
      description: 'Digital transformation, AI, social media, cybersecurity',
      targetLessons: 8,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 200,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'topic-health',
      name: 'Health & Wellbeing',
      description: 'Medical vocabulary, healthcare systems, lifestyle, fitness',
      targetLessons: 8,
      currentLessons: 2,
      wordsPerLesson: 25,
      totalTargetWords: 200,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'topic-economy',
      name: 'Economy & Business',
      description: 'Economic systems, trade, finance, employment',
      targetLessons: 8,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 200,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'topic-society',
      name: 'Society & Culture',
      description: 'Social issues, community, cultural diversity, traditions',
      targetLessons: 8,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 200,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'topic-government',
      name: 'Government & Law',
      description: 'Politics, public policy, legislation, governance',
      targetLessons: 6,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 150,
      priority: 'medium',
      status: 'in_progress'
    },
    {
      id: 'topic-media',
      name: 'Media & Communication',
      description: 'Journalism, social media, digital communication',
      targetLessons: 6,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 150,
      priority: 'medium',
      status: 'in_progress'
    },
    {
      id: 'topic-science',
      name: 'Science & Research',
      description: 'Scientific methodology, research vocabulary, discoveries',
      targetLessons: 6,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 150,
      priority: 'medium',
      status: 'in_progress'
    },
    {
      id: 'topic-work',
      name: 'Work & Career',
      description: 'Employment, career development, workplace issues',
      targetLessons: 6,
      currentLessons: 1,
      wordsPerLesson: 25,
      totalTargetWords: 150,
      priority: 'medium',
      status: 'in_progress'
    },
    {
      id: 'topic-travel',
      name: 'Travel & Tourism',
      description: 'Travel vocabulary, tourism, cultural experiences',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 25,
      totalTargetWords: 100,
      priority: 'low',
      status: 'not_started'
    },
    {
      id: 'topic-arts',
      name: 'Arts & Entertainment',
      description: 'Art, music, literature, entertainment industry',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 25,
      totalTargetWords: 100,
      priority: 'low',
      status: 'not_started'
    },
    {
      id: 'topic-sports',
      name: 'Sports & Recreation',
      description: 'Sports vocabulary, fitness activities, leisure',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 25,
      totalTargetWords: 100,
      priority: 'low',
      status: 'not_started'
    },
    {
      id: 'topic-food',
      name: 'Food & Agriculture',
      description: 'Food production, agriculture, nutrition, cuisine',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 25,
      totalTargetWords: 100,
      priority: 'low',
      status: 'not_started'
    },
    {
      id: 'topic-housing',
      name: 'Housing & Urban Development',
      description: 'Housing, architecture, urban planning, infrastructure',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 25,
      totalTargetWords: 100,
      priority: 'low',
      status: 'not_started'
    },

    // ============================================
    // ACADEMIC COLLOCATIONS (High Priority)
    // ============================================
    {
      id: 'colloc-verb-noun',
      name: 'Verb + Noun Collocations',
      description: 'conduct research, implement policies, draw conclusions',
      targetLessons: 10,
      currentLessons: 1,
      wordsPerLesson: 30,
      totalTargetWords: 300,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'colloc-adj-noun',
      name: 'Adjective + Noun Collocations',
      description: 'significant impact, compelling evidence, crucial factor',
      targetLessons: 10,
      currentLessons: 1,
      wordsPerLesson: 30,
      totalTargetWords: 300,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'colloc-noun-prep',
      name: 'Noun + Preposition Collocations',
      description: 'access to, impact on, solution to, reason for',
      targetLessons: 8,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 240,
      priority: 'high',
      status: 'not_started'
    },
    {
      id: 'colloc-adv-adj',
      name: 'Adverb + Adjective Collocations',
      description: 'highly significant, increasingly important, widely accepted',
      targetLessons: 6,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 180,
      priority: 'medium',
      status: 'not_started'
    },
    {
      id: 'colloc-verb-adv',
      name: 'Verb + Adverb Collocations',
      description: 'strongly believe, significantly increase, rapidly develop',
      targetLessons: 6,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 180,
      priority: 'medium',
      status: 'not_started'
    },

    // ============================================
    // SPEAKING-FRIENDLY VOCABULARY (High Priority)
    // ============================================
    {
      id: 'speaking-opinions',
      name: 'Opinion Expressions',
      description: 'From my perspective, I would argue that, It seems to me',
      targetLessons: 4,
      currentLessons: 1,
      wordsPerLesson: 30,
      totalTargetWords: 120,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'speaking-agree-disagree',
      name: 'Agree/Disagree Phrases',
      description: 'I see your point but, That\'s a valid observation',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 120,
      priority: 'high',
      status: 'not_started'
    },
    {
      id: 'speaking-reasons',
      name: 'Giving Reasons',
      description: 'The main reason is, This is primarily because',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 120,
      priority: 'high',
      status: 'not_started'
    },
    {
      id: 'speaking-compare',
      name: 'Comparing & Contrasting',
      description: 'On the one hand, In contrast, Similarly',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 120,
      priority: 'high',
      status: 'not_started'
    },
    {
      id: 'speaking-speculate',
      name: 'Speculating',
      description: 'It\'s likely that, There\'s a possibility, I would imagine',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 120,
      priority: 'medium',
      status: 'not_started'
    },
    {
      id: 'speaking-examples',
      name: 'Giving Examples',
      description: 'For instance, To illustrate, A case in point',
      targetLessons: 4,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 120,
      priority: 'medium',
      status: 'not_started'
    },

    // ============================================
    // BAND UPGRADE PACKS (High Priority)
    // ============================================
    {
      id: 'upgrade-5to6',
      name: 'Band 5 to 6 Upgrade',
      description: 'Basic to intermediate vocabulary transitions',
      targetLessons: 6,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 180,
      priority: 'medium',
      status: 'not_started'
    },
    {
      id: 'upgrade-6to7',
      name: 'Band 6 to 7 Upgrade',
      description: 'Intermediate to upper-intermediate vocabulary',
      targetLessons: 8,
      currentLessons: 1,
      wordsPerLesson: 30,
      totalTargetWords: 240,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'upgrade-7to8',
      name: 'Band 7 to 8 Upgrade',
      description: 'Upper-intermediate to advanced precision vocabulary',
      targetLessons: 8,
      currentLessons: 1,
      wordsPerLesson: 30,
      totalTargetWords: 240,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'upgrade-8to9',
      name: 'Band 8 to 9 Precision',
      description: 'Advanced to native-like precision and nuance',
      targetLessons: 6,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 180,
      priority: 'high',
      status: 'not_started'
    },

    // ============================================
    // WORD FAMILIES & WORD FORMATION (Medium Priority)
    // ============================================
    {
      id: 'word-families',
      name: 'Word Families',
      description: 'educate/education/educational/educator',
      targetLessons: 10,
      currentLessons: 0,
      wordsPerLesson: 25,
      totalTargetWords: 250,
      priority: 'medium',
      status: 'not_started'
    },
    {
      id: 'prefixes-suffixes',
      name: 'Prefixes & Suffixes',
      description: 'un-, dis-, -tion, -ment, -able',
      targetLessons: 6,
      currentLessons: 0,
      wordsPerLesson: 30,
      totalTargetWords: 180,
      priority: 'medium',
      status: 'not_started'
    },

    // ============================================
    // ACADEMIC WORD LIST (AWL) (Medium Priority)
    // ============================================
    {
      id: 'awl-sublists',
      name: 'Academic Word List (AWL)',
      description: 'Coxhead\'s 570 most frequent academic words',
      targetLessons: 20,
      currentLessons: 0,
      wordsPerLesson: 28,
      totalTargetWords: 570,
      priority: 'medium',
      status: 'not_started'
    },

    // ============================================
    // PHRASAL VERBS & IDIOMS (Medium Priority)
    // ============================================
    {
      id: 'phrasal-verbs',
      name: 'Academic Phrasal Verbs',
      description: 'carry out, bring about, set up, point out',
      targetLessons: 8,
      currentLessons: 0,
      wordsPerLesson: 25,
      totalTargetWords: 200,
      priority: 'medium',
      status: 'not_started'
    },
    {
      id: 'idioms-expressions',
      name: 'Academic Idioms & Expressions',
      description: 'at the end of the day, by and large, in the long run',
      targetLessons: 6,
      currentLessons: 0,
      wordsPerLesson: 25,
      totalTargetWords: 150,
      priority: 'low',
      status: 'not_started'
    },

    // ============================================
    // LINKING WORDS & DISCOURSE MARKERS (High Priority)
    // ============================================
    {
      id: 'linking-addition',
      name: 'Addition & Emphasis',
      description: 'Furthermore, Moreover, Additionally, Indeed',
      targetLessons: 3,
      currentLessons: 0,
      wordsPerLesson: 20,
      totalTargetWords: 60,
      priority: 'high',
      status: 'not_started'
    },
    {
      id: 'linking-contrast',
      name: 'Contrast & Concession',
      description: 'However, Nevertheless, Although, Despite',
      targetLessons: 3,
      currentLessons: 0,
      wordsPerLesson: 20,
      totalTargetWords: 60,
      priority: 'high',
      status: 'not_started'
    },
    {
      id: 'linking-cause-effect',
      name: 'Cause & Effect',
      description: 'Therefore, Consequently, As a result, Due to',
      targetLessons: 3,
      currentLessons: 0,
      wordsPerLesson: 20,
      totalTargetWords: 60,
      priority: 'high',
      status: 'not_started'
    },
    {
      id: 'linking-sequence',
      name: 'Sequence & Summary',
      description: 'Firstly, Subsequently, Finally, In conclusion',
      targetLessons: 3,
      currentLessons: 0,
      wordsPerLesson: 20,
      totalTargetWords: 60,
      priority: 'high',
      status: 'not_started'
    }
  ]
};

// Helper functions for progress calculation
export const calculateCategoryProgress = (category: VocabularyCategory): number => {
  return Math.round((category.currentLessons / category.targetLessons) * 100);
};

export const calculateOverallProgress = (): number => {
  const plan = VOCABULARY_SCALE_PLAN;
  return Math.round((plan.currentTotalLessons / plan.totalTargetLessons) * 100);
};

export const calculateWordsCovered = (): number => {
  return VOCABULARY_SCALE_PLAN.categories.reduce((total, cat) => {
    return total + (cat.currentLessons * cat.wordsPerLesson);
  }, 0);
};

export const getHighPriorityCategories = (): VocabularyCategory[] => {
  return VOCABULARY_SCALE_PLAN.categories.filter(cat => cat.priority === 'high');
};

export const getIncompleteCategories = (): VocabularyCategory[] => {
  return VOCABULARY_SCALE_PLAN.categories.filter(cat => cat.status !== 'complete');
};

export const getCategoryById = (id: string): VocabularyCategory | undefined => {
  return VOCABULARY_SCALE_PLAN.categories.find(cat => cat.id === id);
};

// Summary statistics
export const getVocabularySummary = () => {
  const plan = VOCABULARY_SCALE_PLAN;
  const wordsCovered = calculateWordsCovered();
  
  return {
    targetWords: plan.totalTargetWords,
    currentWords: wordsCovered,
    progressPercent: Math.round((wordsCovered / plan.totalTargetWords) * 100),
    targetLessons: plan.totalTargetLessons,
    currentLessons: plan.currentTotalLessons,
    lessonsProgressPercent: calculateOverallProgress(),
    categoriesTotal: plan.categories.length,
    categoriesStarted: plan.categories.filter(c => c.status !== 'not_started').length,
    categoriesComplete: plan.categories.filter(c => c.status === 'complete').length,
    highPriorityRemaining: plan.categories.filter(c => c.priority === 'high' && c.status !== 'complete').length
  };
};

/**
 * VOCABULARY SCALE PLAN SUMMARY
 * =============================
 * 
 * Target: 7,000 usable words (Band 9 range: 6,000-8,000)
 * Target Lessons: ~280 lessons
 * Current: 16 lessons (~400 words)
 * Progress: ~6%
 * 
 * BREAKDOWN BY CATEGORY TYPE:
 * 
 * 1. Topic-Based Vocabulary (15 topics)
 *    - Target: 92 lessons, 2,300 words
 *    - Current: 11 lessons
 *    - Topics: Education, Environment, Technology, Health, Economy,
 *              Society, Government, Media, Science, Work, Travel,
 *              Arts, Sports, Food, Housing
 * 
 * 2. Academic Collocations (5 types)
 *    - Target: 40 lessons, 1,200 words
 *    - Current: 2 lessons
 *    - Types: Verb+Noun, Adj+Noun, Noun+Prep, Adv+Adj, Verb+Adv
 * 
 * 3. Speaking-Friendly Vocabulary (6 categories)
 *    - Target: 24 lessons, 720 words
 *    - Current: 1 lesson
 *    - Categories: Opinions, Agree/Disagree, Reasons, Compare,
 *                  Speculate, Examples
 * 
 * 4. Band Upgrade Packs (4 levels)
 *    - Target: 28 lessons, 840 words
 *    - Current: 2 lessons
 *    - Levels: 5→6, 6→7, 7→8, 8→9
 * 
 * 5. Word Families & Formation (2 categories)
 *    - Target: 16 lessons, 430 words
 *    - Current: 0 lessons
 * 
 * 6. Academic Word List (AWL)
 *    - Target: 20 lessons, 570 words
 *    - Current: 0 lessons
 * 
 * 7. Phrasal Verbs & Idioms (2 categories)
 *    - Target: 14 lessons, 350 words
 *    - Current: 0 lessons
 * 
 * 8. Linking Words & Discourse Markers (4 categories)
 *    - Target: 12 lessons, 240 words
 *    - Current: 0 lessons
 * 
 * PRIORITY ORDER FOR CONTENT CREATION:
 * 1. High Priority Topics (Education, Environment, Technology, Health, Economy, Society)
 * 2. Academic Collocations (Verb+Noun, Adj+Noun, Noun+Prep)
 * 3. Band Upgrade Packs (6→7, 7→8, 8→9)
 * 4. Speaking Vocabulary (Opinions, Agree/Disagree, Reasons, Compare)
 * 5. Linking Words (All 4 categories)
 * 6. Medium Priority Topics (Government, Media, Science, Work)
 * 7. AWL Sublists
 * 8. Word Families
 * 9. Low Priority Topics (Travel, Arts, Sports, Food, Housing)
 * 10. Phrasal Verbs & Idioms
 */
