export type DeepVocabularyAccent = {
  border: string;
  surface: string;
  badge: string;
  heading: string;
  ring: string;
  dot: string;
};

export type DeepVocabularyWord = {
  word: string;
  part: string;
  grammarRole: string;
  meaning: string;
  instant: string;
  clue: string;
  pattern: string;
  example: string;
  phrase: string;
  warning: string;
  useCases: string[];
  mistake: {
    wrong: string;
    right: string;
  };
  why: string;
  accent: DeepVocabularyAccent;
  whenToUse?: string;
  commonPattern?: string;
  ieltsExample?: string;
  confusionWarning?: string;
};

export type DeepVocabularyDecisionRule = {
  cue: string;
  answer: string;
  tone: string;
};

export type DeepVocabularyCheck = {
  prompt: string;
  options: string[];
  correct: string;
  explanation: string;
};

export type DeepVocabularyModelSegment = {
  text: string;
  highlightClass?: string;
};

export type DeepVocabularyBubble = {
  label: string;
  className: string;
};

export type DeepVocabularyLessonData = {
  lessonNumber?: string;
  title?: string;
  subtitle?: string;
  level?: string;
  estimatedTime?: string;
  categoryLabel?: string;
  lessonBadgeLabel: string;
  sidebarLessonLabel: string;
  deepLessonProgress: number;
  learningOutcomes?: string[];
  words: DeepVocabularyWord[];
  quickDecisionRules: DeepVocabularyDecisionRule[];
  checks: DeepVocabularyCheck[];
  memoryTip: {
    title: string;
    text: string;
  };
  contrastTip: {
    title: string;
    text: string;
  };
  applyPrompt: string;
  applyHint: string;
  modelAnswer: string;
  modelAnswerSegments: DeepVocabularyModelSegment[];
  modelBreakdown: { term: string; text: string }[];
  heroWordBubbles: DeepVocabularyBubble[];
  practiceCards?: {
    title: string;
    subtitle: string;
    tone: string;
  }[];
};

export const deepVocabularyLessons: Record<string, DeepVocabularyLessonData> = {
  'influence-impact-vocabulary': {
    lessonBadgeLabel: 'Vocabulary · Lesson 07',
    sidebarLessonLabel: 'Lesson 07',
    deepLessonProgress: 38,
    words: [
      {
        word: 'influence',
        part: 'noun / verb',
        grammarRole: 'Noun or verb',
        meaning: 'the power to shape an opinion, decision, behaviour, or result',
        instant: 'shapes behaviour or decisions',
        clue: 'Use it when the change is gradual, indirect, or comes from a person, idea, media, culture, or policy.',
        pattern: 'influence on + noun / influence + object',
        example: 'Social media has a powerful influence on the way teenagers form opinions.',
        phrase: 'have a strong influence on',
        warning: 'Do not confuse it with impact when the result is indirect rather than strong and immediate.',
        useCases: ['media', 'policy', 'family', 'culture'],
        mistake: {
          wrong: "Social media has an influence people's decisions.",
          right: "Social media has an influence on people's decisions.",
        },
        why: 'It describes something shaping a decision over time, not necessarily producing an instant result.',
        accent: {
          border: 'border-indigo-200',
          surface: 'bg-indigo-50/70',
          badge: 'bg-indigo-100 text-indigo-700',
          heading: 'text-indigo-700',
          ring: 'ring-indigo-100',
          dot: 'bg-blue-600',
        },
      },
      {
        word: 'impact',
        part: 'noun / verb',
        grammarRole: 'Noun or verb',
        meaning: 'a strong, important, or clearly noticeable effect',
        instant: 'a strong noticeable result',
        clue: 'Use it when you want to emphasise the size or seriousness of the result.',
        pattern: 'impact on + noun / have an impact on',
        example: 'Tourism can have a significant impact on employment in coastal towns.',
        phrase: 'have a significant impact on',
        warning: 'Do not confuse it with influence when the outcome is strong and obvious, not gradual.',
        useCases: ['economy', 'education', 'health', 'environment'],
        mistake: {
          wrong: 'The policy made a big impact to public health.',
          right: 'The policy had a significant impact on public health.',
        },
        why: 'It highlights the importance or size of the result, especially in academic arguments.',
        accent: {
          border: 'border-violet-200',
          surface: 'bg-violet-50/70',
          badge: 'bg-violet-100 text-violet-700',
          heading: 'text-violet-700',
          ring: 'ring-violet-100',
          dot: 'bg-violet-600',
        },
      },
      {
        word: 'affect',
        part: 'verb',
        grammarRole: 'Verb',
        meaning: 'to cause a change in something',
        instant: 'causes change to something',
        clue: 'Use it before the thing that changes. If you need an action word, affect is usually the answer.',
        pattern: 'affect + object',
        example: 'Rising transport costs affect low-income families most severely.',
        phrase: 'adversely affect',
        warning: 'Do not confuse it with effect here because affect is usually the action, not the result.',
        useCases: ['costs', 'health', 'students', 'families'],
        mistake: {
          wrong: 'Pollution effects public health.',
          right: 'Pollution affects public health.',
        },
        why: 'It works as the action verb: one thing changes another thing.',
        accent: {
          border: 'border-amber-200',
          surface: 'bg-amber-50/80',
          badge: 'bg-amber-100 text-amber-800',
          heading: 'text-amber-800',
          ring: 'ring-amber-100',
          dot: 'bg-amber-500',
        },
      },
      {
        word: 'effect',
        part: 'noun',
        grammarRole: 'Noun',
        meaning: 'the result caused by an action, event, or decision',
        instant: 'the result of a change',
        clue: 'Use it when you are naming the result, not the action that causes it.',
        pattern: 'the effect of + noun / an effect on + noun',
        example: 'One effect of remote work is a reduction in daily commuting.',
        phrase: 'the long-term effect of',
        warning: 'Do not confuse it with affect when you need the result itself rather than the action.',
        useCases: ['long-term result', 'side effect', 'positive effect', 'negative effect'],
        mistake: {
          wrong: 'The new rule had a positive affect on attendance.',
          right: 'The new rule had a positive effect on attendance.',
        },
        why: 'It names the outcome, so it is usually a noun in IELTS sentences.',
        accent: {
          border: 'border-emerald-200',
          surface: 'bg-emerald-50/70',
          badge: 'bg-emerald-100 text-emerald-700',
          heading: 'text-emerald-700',
          ring: 'ring-emerald-100',
          dot: 'bg-emerald-600',
        },
      },
    ],
    quickDecisionRules: [
      {
        cue: 'Need a verb before an object?',
        answer: 'Use affect.',
        tone: 'border-amber-200 bg-amber-50/80 text-amber-950',
      },
      {
        cue: 'Talking about a result?',
        answer: 'Use effect.',
        tone: 'border-emerald-200 bg-emerald-50/70 text-emerald-950',
      },
      {
        cue: 'Talking about a strong result?',
        answer: 'Use impact.',
        tone: 'border-violet-200 bg-violet-50/70 text-violet-950',
      },
      {
        cue: 'Talking about indirect power or change?',
        answer: 'Use influence.',
        tone: 'border-indigo-200 bg-indigo-50/70 text-indigo-950',
      },
    ],
    checks: [
      {
        prompt: 'Social media can ______ how young people form opinions.',
        options: ['effect', 'affect', 'impact'],
        correct: 'affect',
        explanation: 'A verb is needed before "how young people form opinions". Affect means to cause a change.',
      },
      {
        prompt: 'The policy had a ______ on public health.',
        options: ['significant impact', 'significantly affect', 'strongly influence'],
        correct: 'significant impact',
        explanation: 'The article "a" needs a noun phrase. "A significant impact" is a natural IELTS collocation.',
      },
      {
        prompt: 'Which sentence focuses on the final result, rather than the cause?',
        options: [
          "Parents influence children's reading habits.",
          'The effect of the campaign was a higher recycling rate.',
          'The new law affected small businesses.',
        ],
        correct: 'The effect of the campaign was a higher recycling rate.',
        explanation: 'Effect names the result. Influence and affect describe the force or action that creates change.',
      },
    ],
    memoryTip: {
      title: 'Quick memory trick',
      text: '**Affect** = action, usually a verb. **Effect** = end result, usually a noun.',
    },
    contrastTip: {
      title: 'Influence vs impact',
      text: '**Influence** shapes something gradually. **Impact** sounds stronger and more noticeable.',
    },
    applyPrompt: 'Explain how tourism changes a local community.',
    applyHint: 'Aim to use: **significant impact on**, **affect**, or **influence**.',
    modelAnswer:
      'Tourism can have a significant impact on local communities by creating employment, although it may also affect housing costs and influence traditional lifestyles.',
    modelAnswerSegments: [
      { text: 'Tourism can have a significant ' },
      { text: 'impact', highlightClass: 'rounded bg-violet-100 px-1 text-violet-900' },
      { text: ' on local communities by creating employment, although it may also ' },
      { text: 'affect', highlightClass: 'rounded bg-amber-100 px-1 text-amber-900' },
      { text: ' housing costs and ' },
      { text: 'influence', highlightClass: 'rounded bg-indigo-100 px-1 text-indigo-900' },
      { text: ' traditional lifestyles.' },
    ],
    modelBreakdown: [
      {
        term: 'impact',
        text: 'strong result on the community.',
      },
      {
        term: 'affect',
        text: 'verb before the thing that changes.',
      },
      {
        term: 'influence',
        text: 'gradual effect on culture/lifestyle.',
      },
    ],
    heroWordBubbles: [
      { label: 'influence', className: 'absolute left-3 top-5 z-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-blue-100' },
      { label: 'impact', className: 'absolute right-4 top-8 z-10 rounded-lg bg-violet-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-violet-100' },
      { label: 'affect', className: 'absolute bottom-8 left-9 z-10 rounded-lg bg-amber-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-amber-100' },
      { label: 'effect', className: 'absolute bottom-11 right-7 z-10 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-emerald-100' },
    ],
  },
  'quality-standards-vocabulary': {
    lessonNumber: '08',
    title: 'Quality & Standards Vocabulary',
    subtitle: 'Use benchmark language with precise singular/plural control in IELTS arguments.',
    level: 'Band 6.5 - 8.0',
    estimatedTime: '10-12 min',
    categoryLabel: 'Vocabulary Precision',
    lessonBadgeLabel: 'Vocabulary · Lesson 08',
    sidebarLessonLabel: 'Lesson 08',
    deepLessonProgress: 34,
    learningOutcomes: [
      'Distinguish quality from formal standards in academic arguments',
      'Use criterion and criteria with accurate singular/plural grammar',
      'Apply benchmark language in Task 2 policy and education topics',
    ],
    words: [
      {
        word: 'quality',
        part: 'noun',
        grammarRole: 'Noun',
        meaning: 'the degree of excellence of a product, service, or process',
        instant: 'overall level of excellence',
        clue: 'Use it when you evaluate how good something is in general.',
        whenToUse: 'Use for broad judgments of service, teaching, or product excellence.',
        pattern: 'high quality / quality of + noun',
        commonPattern: 'high quality / quality of + noun',
        example: 'Customers are more likely to stay loyal when a company consistently delivers high quality service.',
        ieltsExample: 'Customers are more likely to stay loyal when a company consistently delivers high quality service.',
        phrase: 'maintain high quality',
        warning: 'Do not use it when you are talking about a specific rule or requirement. Use standard in that case.',
        confusionWarning: 'Do not use it when you are talking about a specific rule or requirement. Use standard in that case.',
        useCases: ['products', 'services', 'education', 'healthcare'],
        mistake: {
          wrong: 'The company must improve its standards of product qualitys.',
          right: 'The company must improve its product quality standards.',
        },
        why: 'It is the broad concept examiners expect when you discuss consumer satisfaction and performance.',
        accent: {
          border: 'border-indigo-200',
          surface: 'bg-indigo-50/70',
          badge: 'bg-indigo-100 text-indigo-700',
          heading: 'text-indigo-700',
          ring: 'ring-indigo-100',
          dot: 'bg-indigo-600',
        },
      },
      {
        word: 'standard',
        part: 'noun',
        grammarRole: 'Noun',
        meaning: 'an accepted level, rule, or benchmark that something should meet',
        instant: 'required benchmark',
        clue: 'Use it when a policy, school, factory, or profession must meet a required level.',
        whenToUse: 'Use when discussing compliance, regulation, or minimum accepted performance.',
        pattern: 'meet standards / set a standard for',
        commonPattern: 'meet standards / set a standard for',
        example: 'Government inspections ensure that private hospitals meet national safety standards.',
        ieltsExample: 'Government inspections ensure that private hospitals meet national safety standards.',
        phrase: 'meet minimum standards',
        warning: 'Do not use standard as a direct synonym for quality in every sentence. Standard often means requirement, not overall excellence.',
        confusionWarning: 'Do not use standard as a direct synonym for quality in every sentence. Standard often means requirement, not overall excellence.',
        useCases: ['regulation', 'safety', 'assessment', 'compliance'],
        mistake: {
          wrong: 'The restaurant has very quality standards.',
          right: 'The restaurant has very high standards.',
        },
        why: 'It signals control and accountability, which fits Task 2 arguments about policy and regulation.',
        accent: {
          border: 'border-violet-200',
          surface: 'bg-violet-50/70',
          badge: 'bg-violet-100 text-violet-700',
          heading: 'text-violet-700',
          ring: 'ring-violet-100',
          dot: 'bg-violet-600',
        },
      },
      {
        word: 'criteria',
        part: 'noun (plural)',
        grammarRole: 'Plural noun',
        meaning: 'the standards or principles used to judge or decide something',
        instant: 'judging points (plural)',
        clue: 'Use it when you list multiple points for assessment, selection, or scoring.',
        whenToUse: 'Use when several conditions are used to evaluate people, plans, or outcomes.',
        pattern: 'selection criteria / criteria for + noun',
        commonPattern: 'selection criteria / criteria for + noun',
        example: 'Universities should publish clear admission criteria for international applicants.',
        ieltsExample: 'Universities should publish clear admission criteria for international applicants.',
        phrase: 'meet the evaluation criteria',
        warning: 'Do not write "criterias". Criteria is already plural.',
        confusionWarning: 'Do not write "criterias". Criteria is already plural.',
        useCases: ['admissions', 'assessment', 'recruitment', 'evaluation'],
        mistake: {
          wrong: 'The main criterias for promotion are unclear.',
          right: 'The main criteria for promotion are unclear.',
        },
        why: 'This is common in Task 2 arguments about fairness, selection, and policy transparency.',
        accent: {
          border: 'border-amber-200',
          surface: 'bg-amber-50/80',
          badge: 'bg-amber-100 text-amber-800',
          heading: 'text-amber-800',
          ring: 'ring-amber-100',
          dot: 'bg-amber-500',
        },
      },
      {
        word: 'criterion',
        part: 'noun (singular)',
        grammarRole: 'Singular noun',
        meaning: 'a single standard or rule used for judgment',
        instant: 'one judging point',
        clue: 'Use it when you refer to one specific standard in a sentence.',
        whenToUse: 'Use when naming one exact condition in a rubric or decision process.',
        pattern: 'a key criterion for + noun / criterion in + noun',
        commonPattern: 'a key criterion for + noun / criterion in + noun',
        example: 'Cost should not be the only criterion in decisions about public healthcare funding.',
        ieltsExample: 'Cost should not be the only criterion in decisions about public healthcare funding.',
        phrase: 'a key criterion for success',
        warning: 'Do not use criterion when you mean multiple standards. Use criteria for plural.',
        confusionWarning: 'Do not use criterion when you mean multiple standards. Use criteria for plural.',
        useCases: ['policy decisions', 'marking rubrics', 'funding', 'quality checks'],
        mistake: {
          wrong: 'The interview criteria is communication skill.',
          right: 'The interview criterion is communication skill.',
        },
        why: 'Accurate singular-plural control helps Band 7+ grammar and lexical precision.',
        accent: {
          border: 'border-emerald-200',
          surface: 'bg-emerald-50/70',
          badge: 'bg-emerald-100 text-emerald-700',
          heading: 'text-emerald-700',
          ring: 'ring-emerald-100',
          dot: 'bg-emerald-600',
        },
      },
    ],
    quickDecisionRules: [
      {
        cue: 'Need a broad judgment about how good something is?',
        answer: 'Use quality.',
        tone: 'border-indigo-200 bg-indigo-50/70 text-indigo-950',
      },
      {
        cue: 'Talking about required rules or benchmarks?',
        answer: 'Use standard.',
        tone: 'border-violet-200 bg-violet-50/70 text-violet-950',
      },
      {
        cue: 'Talking about several judging points?',
        answer: 'Use criteria (plural).',
        tone: 'border-amber-200 bg-amber-50/80 text-amber-950',
      },
      {
        cue: 'Talking about one judging point?',
        answer: 'Use criterion (singular).',
        tone: 'border-emerald-200 bg-emerald-50/70 text-emerald-950',
      },
    ],
    checks: [
      {
        prompt: 'The scholarship panel uses five ______ when evaluating applications.',
        options: ['criterion', 'criteria', 'standard'],
        correct: 'criteria',
        explanation: 'Five means plural, so criteria is correct.',
      },
      {
        prompt: 'Academic performance should be one ______ for selecting class representatives.',
        options: ['criterion', 'criteria', 'qualities'],
        correct: 'criterion',
        explanation: 'One requires singular, so criterion is correct.',
      },
      {
        prompt: 'Which sentence correctly contrasts overall excellence and required benchmark?',
        options: [
          'The school has high quality, but it still fails to meet national standards.',
          'The school has high standards, but it still fails to meet national quality.',
          'The school has high criterion, but it still fails the criteria.',
        ],
        correct: 'The school has high quality, but it still fails to meet national standards.',
        explanation: 'Quality describes overall excellence, while standards are official requirements to meet.',
      },
    ],
    memoryTip: {
      title: 'Quick memory trick',
      text: '**Criterion** = one point. **Criteria** = many points.',
    },
    contrastTip: {
      title: 'Quality/standard and criterion/criteria',
      text: '**Quality** measures excellence, **standard** sets the benchmark, **criterion** is singular, and **criteria** is plural.',
    },
    applyPrompt: 'Explain how a university can make fair admission decisions while maintaining educational quality.',
    applyHint: 'Aim to use: **quality**, **standards**, **criterion**, and **criteria** accurately.',
    modelAnswer:
      'Universities should protect academic quality by applying transparent standards and using clear admission criteria, while ensuring that each criterion is relevant to student success.',
    modelAnswerSegments: [
      { text: 'Universities should protect academic ' },
      { text: 'quality', highlightClass: 'rounded bg-indigo-100 px-1 text-indigo-900' },
      { text: ' by applying transparent ' },
      { text: 'standards', highlightClass: 'rounded bg-violet-100 px-1 text-violet-900' },
      { text: ' and using clear admission ' },
      { text: 'criteria', highlightClass: 'rounded bg-amber-100 px-1 text-amber-900' },
      { text: ', while ensuring that each ' },
      { text: 'criterion', highlightClass: 'rounded bg-emerald-100 px-1 text-emerald-900' },
      { text: ' is relevant to student success' },
      { text: '.' },
    ],
    modelBreakdown: [
      {
        term: 'quality',
        text: 'evaluates overall excellence of education.',
      },
      {
        term: 'standards',
        text: 'signals formal benchmarks institutions must meet.',
      },
      {
        term: 'criterion / criteria',
        text: 'shows accurate singular-plural control in formal assessment language.',
      },
    ],
    heroWordBubbles: [
      { label: 'quality', className: 'absolute left-3 top-5 z-10 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-indigo-100' },
      { label: 'standard', className: 'absolute right-4 top-8 z-10 rounded-lg bg-violet-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-violet-100' },
      { label: 'criteria', className: 'absolute bottom-8 left-9 z-10 rounded-lg bg-amber-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-amber-100' },
      { label: 'criterion', className: 'absolute bottom-11 right-7 z-10 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-emerald-100' },
    ],
    practiceCards: [
      { title: 'Rubric Builder', subtitle: 'Write 3 fair criteria for a school scholarship.', tone: 'text-blue-600 bg-blue-50' },
      { title: 'Policy Filter', subtitle: 'Pick one key criterion and justify it in one sentence.', tone: 'text-violet-600 bg-violet-50' },
      { title: 'Error Hunt', subtitle: 'Fix criterion/criteria agreement mistakes.', tone: 'text-orange-600 bg-orange-50' },
      { title: 'Task 2 Upgrade', subtitle: 'Replace vague words with standards language.', tone: 'text-emerald-600 bg-emerald-50' },
      { title: 'Speaking Drill', subtitle: 'Use all 4 words in a Part 3 answer.', tone: 'text-indigo-600 bg-indigo-50' },
    ],
  },
  'cause-effect-vocabulary': {
    lessonNumber: '09',
    title: 'Cause & Effect Vocabulary',
    subtitle: 'Choose precise words for reason and result in Writing Task 2 and Speaking Part 3.',
    level: 'Band 6.5 - 8.0',
    estimatedTime: '10-12 min',
    categoryLabel: 'Argument Logic',
    lessonBadgeLabel: 'Vocabulary · Lesson 09',
    sidebarLessonLabel: 'Lesson 09',
    deepLessonProgress: 32,
    learningOutcomes: [
      'Separate reason words from result words with confidence',
      'Use stronger academic alternatives to because/result',
      'Build clearer cause-effect chains in IELTS essays',
    ],
    words: [
      {
        word: 'cause',
        part: 'noun / verb',
        grammarRole: 'Noun or verb',
        instant: 'the source of a problem or change',
        meaning: 'the reason something happens, or to make something happen',
        clue: 'Use it when you focus on what creates the problem in the first place.',
        whenToUse: 'Best for introducing the origin of an issue in policy or social topics.',
        pattern: 'the main cause of + noun / cause + object',
        commonPattern: 'the main cause of + noun / cause + object',
        example: 'Excessive screen time is a major cause of reduced concentration among teenagers.',
        ieltsExample: 'Excessive screen time is a major cause of reduced concentration among teenagers.',
        phrase: 'the root cause of',
        warning: 'Do not confuse cause with effect. Cause comes first.',
        confusionWarning: 'Do not confuse cause with effect. Cause comes first.',
        useCases: ['education', 'health', 'technology', 'society'],
        mistake: {
          wrong: 'Unemployment is an effect of poor policy and a cause from crime.',
          right: 'Unemployment is an effect of poor policy and a cause of crime.',
        },
        why: 'It helps organize essay logic clearly from origin to consequence.',
        accent: {
          border: 'border-indigo-200',
          surface: 'bg-indigo-50/70',
          badge: 'bg-indigo-100 text-indigo-700',
          heading: 'text-indigo-700',
          ring: 'ring-indigo-100',
          dot: 'bg-indigo-600',
        },
      },
      {
        word: 'factor',
        part: 'noun',
        grammarRole: 'Noun',
        instant: 'one contributing reason among several',
        meaning: 'an element that helps produce a result, often as part of a combination',
        clue: 'Use it when one issue has multiple reasons, not one single cause.',
        whenToUse: 'Useful when discussing complex topics like crime, obesity, or inequality.',
        pattern: 'a key factor in + noun / factors contributing to + noun',
        commonPattern: 'a key factor in + noun / factors contributing to + noun',
        example: 'High housing costs are a key factor in delayed family formation.',
        ieltsExample: 'High housing costs are a key factor in delayed family formation.',
        phrase: 'a contributing factor',
        warning: 'Do not use factor if you are clearly naming one direct root cause.',
        confusionWarning: 'Do not use factor if you are clearly naming one direct root cause.',
        useCases: ['economy', 'demographics', 'urban issues', 'public health'],
        mistake: {
          wrong: 'The main factor of air pollution is cars.',
          right: 'The main factor in urban air pollution is heavy traffic.',
        },
        why: 'It signals mature reasoning by acknowledging multiple influences.',
        accent: {
          border: 'border-violet-200',
          surface: 'bg-violet-50/70',
          badge: 'bg-violet-100 text-violet-700',
          heading: 'text-violet-700',
          ring: 'ring-violet-100',
          dot: 'bg-violet-600',
        },
      },
      {
        word: 'impact',
        part: 'noun / verb',
        grammarRole: 'Noun or verb',
        instant: 'a strong noticeable result',
        meaning: 'a significant and often measurable effect',
        clue: 'Use it when you want to emphasize how strong the result is.',
        whenToUse: 'Great for discussing social, economic, or environmental consequences.',
        pattern: 'have a significant impact on + noun',
        commonPattern: 'have a significant impact on + noun',
        example: 'Poor public transport has a significant impact on low-income workers.',
        ieltsExample: 'Poor public transport has a significant impact on low-income workers.',
        phrase: 'a significant impact on',
        warning: 'Do not overuse it for small or neutral outcomes.',
        confusionWarning: 'Do not overuse it for small or neutral outcomes.',
        useCases: ['transport', 'employment', 'education', 'climate'],
        mistake: {
          wrong: 'The new app has impact to students.',
          right: 'The new app has a positive impact on students.',
        },
        why: 'It strengthens argument quality by showing scale of effect.',
        accent: {
          border: 'border-amber-200',
          surface: 'bg-amber-50/80',
          badge: 'bg-amber-100 text-amber-800',
          heading: 'text-amber-800',
          ring: 'ring-amber-100',
          dot: 'bg-amber-500',
        },
      },
      {
        word: 'consequence',
        part: 'noun',
        grammarRole: 'Noun',
        instant: 'a result, often negative',
        meaning: 'the outcome that follows from an action or situation',
        clue: 'Use it when discussing results, especially long-term or serious outcomes.',
        whenToUse: 'Useful for policy warnings and discussing social costs over time.',
        pattern: 'the consequence of + noun / a consequence for + noun',
        commonPattern: 'the consequence of + noun / a consequence for + noun',
        example: 'One consequence of excessive tourism is rising rent in city centres.',
        ieltsExample: 'One consequence of excessive tourism is rising rent in city centres.',
        phrase: 'negative consequences for',
        warning: 'Do not use consequence when the result is clearly positive unless you specify it.',
        confusionWarning: 'Do not use consequence when the result is clearly positive unless you specify it.',
        useCases: ['housing', 'tourism', 'public policy', 'health'],
        mistake: {
          wrong: 'There are many consequence to this trend.',
          right: 'There are many consequences to this trend.',
        },
        why: 'It helps writers present downstream effects in a clear chain.',
        accent: {
          border: 'border-emerald-200',
          surface: 'bg-emerald-50/70',
          badge: 'bg-emerald-100 text-emerald-700',
          heading: 'text-emerald-700',
          ring: 'ring-emerald-100',
          dot: 'bg-emerald-600',
        },
      },
    ],
    quickDecisionRules: [
      { cue: 'Naming where a problem starts?', answer: 'Use cause.', tone: 'border-indigo-200 bg-indigo-50/70 text-indigo-950' },
      { cue: 'One reason among many?', answer: 'Use factor.', tone: 'border-violet-200 bg-violet-50/70 text-violet-950' },
      { cue: 'Need a strong measurable result?', answer: 'Use impact.', tone: 'border-amber-200 bg-amber-50/80 text-amber-950' },
      { cue: 'Need a follow-up outcome, often negative?', answer: 'Use consequence.', tone: 'border-emerald-200 bg-emerald-50/70 text-emerald-950' },
    ],
    checks: [
      {
        prompt: 'Limited parental involvement is a major ______ of weak reading habits in children.',
        options: ['impact', 'cause', 'consequence'],
        correct: 'cause',
        explanation: 'The sentence asks for the origin of the problem, so cause is correct.',
      },
      {
        prompt: 'Heavy traffic and poor urban planning are key ______ contributing to air pollution.',
        options: ['factors', 'consequences', 'impacts'],
        correct: 'factors',
        explanation: 'Several contributing reasons require factors (plural).',
      },
      {
        prompt: 'Which option best describes a strong result on people or systems?',
        options: ['cause', 'impact', 'factor'],
        correct: 'impact',
        explanation: 'Impact highlights intensity and visibility of a result.',
      },
    ],
    memoryTip: {
      title: 'Quick memory trick',
      text: '**Cause/factor** explain why. **Impact/consequence** explain what happens next.',
    },
    contrastTip: {
      title: 'Direct vs contributing reasons',
      text: '**Cause** often sounds direct; **factor** is one part of a bigger reason set.',
    },
    applyPrompt: 'Explain why young adults are leaving rural areas and what happens to those communities afterward.',
    applyHint: 'Use at least one reason word (**cause** or **factor**) and one result word (**impact** or **consequence**).',
    modelAnswer:
      'A key cause of youth migration is limited local employment, while inadequate transport is another contributing factor; as a result, this trend has a serious impact on rural economies and long-term consequences for community cohesion.',
    modelAnswerSegments: [
      { text: 'A key ' },
      { text: 'cause', highlightClass: 'rounded bg-indigo-100 px-1 text-indigo-900' },
      { text: ' of youth migration is limited local employment, while inadequate transport is another contributing ' },
      { text: 'factor', highlightClass: 'rounded bg-violet-100 px-1 text-violet-900' },
      { text: '; as a result, this trend has a serious ' },
      { text: 'impact', highlightClass: 'rounded bg-amber-100 px-1 text-amber-900' },
      { text: ' on rural economies and long-term ' },
      { text: 'consequences', highlightClass: 'rounded bg-emerald-100 px-1 text-emerald-900' },
      { text: ' for community cohesion.' },
    ],
    modelBreakdown: [
      { term: 'cause', text: 'names the root reason.' },
      { term: 'factor', text: 'adds another contributing reason.' },
      { term: 'impact / consequences', text: 'show immediate and longer-term results.' },
    ],
    heroWordBubbles: [
      { label: 'cause', className: 'absolute left-3 top-5 z-10 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-indigo-100' },
      { label: 'factor', className: 'absolute right-4 top-8 z-10 rounded-lg bg-violet-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-violet-100' },
      { label: 'impact', className: 'absolute bottom-8 left-9 z-10 rounded-lg bg-amber-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-amber-100' },
      { label: 'consequence', className: 'absolute bottom-11 right-7 z-10 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-emerald-100' },
    ],
    practiceCards: [
      { title: 'Reason Sort', subtitle: 'Separate direct causes from contributing factors.', tone: 'text-blue-600 bg-blue-50' },
      { title: 'Impact Scale', subtitle: 'Rank impacts by strength: minor to severe.', tone: 'text-violet-600 bg-violet-50' },
      { title: 'Consequence Chain', subtitle: 'Write short-term and long-term consequences.', tone: 'text-orange-600 bg-orange-50' },
      { title: 'Task 2 Linker', subtitle: 'Connect cause and effect with clear sentence logic.', tone: 'text-emerald-600 bg-emerald-50' },
      { title: 'Speaking Drill', subtitle: 'Answer a Part 3 why/what-happens question.', tone: 'text-indigo-600 bg-indigo-50' },
    ],
  },
  'comparison-vocabulary': {
    lessonNumber: '10',
    title: 'Comparison Vocabulary',
    subtitle: 'Compare ideas with precision and avoid repetitive basic language.',
    level: 'Band 6.5 - 8.0',
    estimatedTime: '10-12 min',
    categoryLabel: 'Coherence & Lexical Precision',
    lessonBadgeLabel: 'Vocabulary · Lesson 10',
    sidebarLessonLabel: 'Lesson 10',
    deepLessonProgress: 30,
    learningOutcomes: [
      'Distinguish similarity language from difference language',
      'Use formal comparison verbs for Task 1 and Task 2',
      'Avoid repetitive use of simple words like same and different',
    ],
    words: [
      {
        word: 'similar',
        part: 'adjective',
        grammarRole: 'Adjective',
        instant: 'alike but not identical',
        meaning: 'having features that are close in nature or pattern',
        clue: 'Use it when two trends or ideas are mostly alike but still have differences.',
        whenToUse: 'Useful for Task 1 graph trends and Task 2 balanced comparisons.',
        pattern: 'similar to + noun',
        commonPattern: 'similar to + noun',
        example: 'Public and private schools face similar challenges in teacher retention.',
        ieltsExample: 'Public and private schools face similar challenges in teacher retention.',
        phrase: 'broadly similar to',
        warning: 'Do not use similar as if it means exactly the same.',
        confusionWarning: 'Do not use similar as if it means exactly the same.',
        useCases: ['education', 'graphs', 'policies', 'social trends'],
        mistake: {
          wrong: 'The two figures are similar equal.',
          right: 'The two figures are broadly similar.',
        },
        why: 'It prevents overclaiming and keeps analysis accurate.',
        accent: {
          border: 'border-indigo-200',
          surface: 'bg-indigo-50/70',
          badge: 'bg-indigo-100 text-indigo-700',
          heading: 'text-indigo-700',
          ring: 'ring-indigo-100',
          dot: 'bg-indigo-600',
        },
      },
      {
        word: 'comparable',
        part: 'adjective',
        grammarRole: 'Adjective',
        instant: 'close enough to compare fairly',
        meaning: 'similar in scale or type so that meaningful comparison is possible',
        clue: 'Use it when comparing data sets, systems, or outcomes on equivalent grounds.',
        whenToUse: 'Strong for Task 1 and formal Task 2 argument comparisons.',
        pattern: 'comparable to + noun / be comparable in + noun',
        commonPattern: 'comparable to + noun / be comparable in + noun',
        example: 'Rural internet access is now comparable to urban coverage in several regions.',
        ieltsExample: 'Rural internet access is now comparable to urban coverage in several regions.',
        phrase: 'largely comparable to',
        warning: 'Do not use it if the two items are fundamentally different in scale or context.',
        confusionWarning: 'Do not use it if the two items are fundamentally different in scale or context.',
        useCases: ['statistics', 'policy outcomes', 'economic data', 'technology adoption'],
        mistake: {
          wrong: 'The two countries are comparable different.',
          right: 'The two countries are not directly comparable due to population size.',
        },
        why: 'It signals analytical maturity when evaluating fairness of comparisons.',
        accent: {
          border: 'border-violet-200',
          surface: 'bg-violet-50/70',
          badge: 'bg-violet-100 text-violet-700',
          heading: 'text-violet-700',
          ring: 'ring-violet-100',
          dot: 'bg-violet-600',
        },
      },
      {
        word: 'contrast',
        part: 'noun / verb',
        grammarRole: 'Noun or verb',
        instant: 'clear difference',
        meaning: 'a noticeable distinction between two or more things',
        clue: 'Use it when differences are important to your argument, not just minor variation.',
        whenToUse: 'Best for highlighting opposing outcomes in policy and social discussion.',
        pattern: 'in contrast to + noun / contrast with + noun',
        commonPattern: 'in contrast to + noun / contrast with + noun',
        example: 'In contrast to large cities, smaller towns often offer lower living costs.',
        ieltsExample: 'In contrast to large cities, smaller towns often offer lower living costs.',
        phrase: 'a sharp contrast between',
        warning: 'Do not confuse it with compare, which can include both similarities and differences.',
        confusionWarning: 'Do not confuse it with compare, which can include both similarities and differences.',
        useCases: ['urban-rural', 'education models', 'income groups', 'lifestyles'],
        mistake: {
          wrong: 'The two trends contrast similar patterns.',
          right: 'The two trends show similar patterns despite differences in scale.',
        },
        why: 'It gives clear argumentative structure when showing oppositions.',
        accent: {
          border: 'border-amber-200',
          surface: 'bg-amber-50/80',
          badge: 'bg-amber-100 text-amber-800',
          heading: 'text-amber-800',
          ring: 'ring-amber-100',
          dot: 'bg-amber-500',
        },
      },
      {
        word: 'outperform',
        part: 'verb',
        grammarRole: 'Verb',
        instant: 'do better than another option',
        meaning: 'to achieve stronger results than someone or something else',
        clue: 'Use it when one group or method clearly performs better than another.',
        whenToUse: 'Excellent for data commentary and evidence-based recommendations.',
        pattern: 'outperform + object / outperform in + noun',
        commonPattern: 'outperform + object / outperform in + noun',
        example: 'Students who follow weekly revision plans consistently outperform those who cram before exams.',
        ieltsExample: 'Students who follow weekly revision plans consistently outperform those who cram before exams.',
        phrase: 'consistently outperform',
        warning: 'Avoid using it without evidence or a clear comparison baseline.',
        confusionWarning: 'Avoid using it without evidence or a clear comparison baseline.',
        useCases: ['education outcomes', 'business', 'health programs', 'technology'],
        mistake: {
          wrong: 'This policy outperforms than the old one.',
          right: 'This policy outperforms the old one in reducing dropout rates.',
        },
        why: 'It produces precise, high-band comparative evaluation.',
        accent: {
          border: 'border-emerald-200',
          surface: 'bg-emerald-50/70',
          badge: 'bg-emerald-100 text-emerald-700',
          heading: 'text-emerald-700',
          ring: 'ring-emerald-100',
          dot: 'bg-emerald-600',
        },
      },
    ],
    quickDecisionRules: [
      { cue: 'Almost alike, but not identical?', answer: 'Use similar.', tone: 'border-indigo-200 bg-indigo-50/70 text-indigo-950' },
      { cue: 'Fairly equivalent for analysis?', answer: 'Use comparable.', tone: 'border-violet-200 bg-violet-50/70 text-violet-950' },
      { cue: 'Need to stress clear differences?', answer: 'Use contrast.', tone: 'border-amber-200 bg-amber-50/80 text-amber-950' },
      { cue: 'One option clearly does better?', answer: 'Use outperform.', tone: 'border-emerald-200 bg-emerald-50/70 text-emerald-950' },
    ],
    checks: [
      {
        prompt: 'The two proposals are broadly ______ in cost, but they differ in long-term sustainability.',
        options: ['contrasting', 'comparable', 'outperforming'],
        correct: 'comparable',
        explanation: 'Comparable fits because the sentence compares similar scale in one dimension (cost).',
      },
      {
        prompt: 'In ______ to urban hospitals, rural clinics often face staff shortages.',
        options: ['similar', 'contrast', 'outperform'],
        correct: 'contrast',
        explanation: 'The fixed expression is in contrast to.',
      },
      {
        prompt: 'Which sentence shows clear superior performance?',
        options: [
          'Both systems are similar in structure.',
          'The revised syllabus outperforms the previous one in exam results.',
          'The trends are comparable over time.',
        ],
        correct: 'The revised syllabus outperforms the previous one in exam results.',
        explanation: 'Outperforms directly expresses stronger measurable results.',
      },
    ],
    memoryTip: {
      title: 'Quick memory trick',
      text: '**Similar/comparable** = likeness. **Contrast/outperform** = difference or superiority.',
    },
    contrastTip: {
      title: 'General vs performance comparison',
      text: '**Contrast** shows difference in features; **outperform** shows better outcomes.',
    },
    applyPrompt: 'Compare online and classroom learning for IELTS candidates and decide which approach produces better long-term results.',
    applyHint: 'Use one similarity word (**similar** or **comparable**) and one superiority/difference word (**contrast** or **outperform**).',
    modelAnswer:
      'Although online and classroom formats are comparable in content coverage, classroom programs often outperform purely self-paced courses in speaking development; in contrast, online options may offer greater scheduling flexibility.',
    modelAnswerSegments: [
      { text: 'Although online and classroom formats are ' },
      { text: 'comparable', highlightClass: 'rounded bg-violet-100 px-1 text-violet-900' },
      { text: ' in content coverage, classroom programs often ' },
      { text: 'outperform', highlightClass: 'rounded bg-emerald-100 px-1 text-emerald-900' },
      { text: ' purely self-paced courses in speaking development; in ' },
      { text: 'contrast', highlightClass: 'rounded bg-amber-100 px-1 text-amber-900' },
      { text: ', online options may offer greater scheduling flexibility.' },
    ],
    modelBreakdown: [
      { term: 'comparable', text: 'establishes fair basis for comparison.' },
      { term: 'outperform', text: 'states clearer better-than result.' },
      { term: 'contrast', text: 'signals the opposite advantage in another area.' },
    ],
    heroWordBubbles: [
      { label: 'similar', className: 'absolute left-3 top-5 z-10 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-indigo-100' },
      { label: 'comparable', className: 'absolute right-4 top-8 z-10 rounded-lg bg-violet-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-violet-100' },
      { label: 'contrast', className: 'absolute bottom-8 left-9 z-10 rounded-lg bg-amber-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-amber-100' },
      { label: 'outperform', className: 'absolute bottom-11 right-7 z-10 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-emerald-100' },
    ],
    practiceCards: [
      { title: 'Compare/Contrast Drill', subtitle: 'Turn 3 basic comparisons into formal IELTS lines.', tone: 'text-blue-600 bg-blue-50' },
      { title: 'Data Language', subtitle: 'Pick similar vs comparable for graph sentences.', tone: 'text-violet-600 bg-violet-50' },
      { title: 'Result Focus', subtitle: 'Use outperform with a clear evidence phrase.', tone: 'text-orange-600 bg-orange-50' },
      { title: 'Task 2 Balance', subtitle: 'Write one concession and one contrast sentence.', tone: 'text-emerald-600 bg-emerald-50' },
      { title: 'Speaking Part 3', subtitle: 'Give a 20-second comparison answer with 2 target words.', tone: 'text-indigo-600 bg-indigo-50' },
    ],
  },
  'academic-collocations-verb-noun': {
    lessonNumber: '11',
    title: 'Academic Collocations: Verb + Noun',
    subtitle: 'Replace basic verb choices with natural academic collocations for higher lexical precision.',
    level: 'Band 7.0 - 9.0',
    estimatedTime: '10-12 min',
    categoryLabel: 'Academic Collocations',
    lessonBadgeLabel: 'Vocabulary · Lesson 11',
    sidebarLessonLabel: 'Lesson 11',
    deepLessonProgress: 29,
    learningOutcomes: [
      'Use high-frequency verb+noun collocations naturally in IELTS Writing',
      'Avoid literal translations and awkward verb choices',
      'Apply collocations in policy, society, and education arguments',
    ],
    words: [
      {
        word: 'make progress',
        part: 'verb + noun collocation',
        grammarRole: 'Collocation',
        instant: 'move forward in development',
        meaning: 'to improve gradually toward a target',
        clue: 'Use it when progress is continuous but not fully complete.',
        whenToUse: 'Best for education reform, language learning, and long-term policy outcomes.',
        pattern: 'make progress in + noun / make progress toward + noun',
        commonPattern: 'make progress in + noun / make progress toward + noun',
        example: 'Several districts have made progress in reducing school dropout rates.',
        ieltsExample: 'Several districts have made progress in reducing school dropout rates.',
        phrase: 'make steady progress',
        warning: 'Do not replace it with "do progress" or "take progress".',
        confusionWarning: 'Do not replace it with "do progress" or "take progress".',
        useCases: ['education', 'public policy', 'health initiatives', 'technology adoption'],
        mistake: {
          wrong: 'The country did progress in public transport.',
          right: 'The country made progress in public transport.',
        },
        why: 'It sounds natural and immediately improves lexical resource.',
        accent: {
          border: 'border-indigo-200',
          surface: 'bg-indigo-50/70',
          badge: 'bg-indigo-100 text-indigo-700',
          heading: 'text-indigo-700',
          ring: 'ring-indigo-100',
          dot: 'bg-indigo-600',
        },
      },
      {
        word: 'address concerns',
        part: 'verb + noun collocation',
        grammarRole: 'Collocation',
        instant: 'respond to worries directly',
        meaning: 'to deal with worries or objections in a practical way',
        clue: 'Use it when governments, schools, or organizations respond to public worries.',
        whenToUse: 'Strong for essays about policy trust, healthcare, safety, and social issues.',
        pattern: 'address concerns about + noun',
        commonPattern: 'address concerns about + noun',
        example: 'Authorities must address concerns about air quality near schools.',
        ieltsExample: 'Authorities must address concerns about air quality near schools.',
        phrase: 'urgently address concerns',
        warning: 'Avoid "solve concerns" or "fix concerns" in formal IELTS writing.',
        confusionWarning: 'Avoid "solve concerns" or "fix concerns" in formal IELTS writing.',
        useCases: ['environment', 'public health', 'transport', 'education'],
        mistake: {
          wrong: 'The council solved citizens\' concerns about noise.',
          right: 'The council addressed citizens\' concerns about noise.',
        },
        why: 'It gives a professional, policy-oriented tone examiners expect at Band 8.',
        accent: {
          border: 'border-violet-200',
          surface: 'bg-violet-50/70',
          badge: 'bg-violet-100 text-violet-700',
          heading: 'text-violet-700',
          ring: 'ring-violet-100',
          dot: 'bg-violet-600',
        },
      },
      {
        word: 'pose a challenge',
        part: 'verb + noun collocation',
        grammarRole: 'Collocation',
        instant: 'create difficulty for progress',
        meaning: 'to create a serious difficulty that needs careful response',
        clue: 'Use it when a trend or condition makes policy goals harder to reach.',
        whenToUse: 'Useful in climate, urbanization, healthcare, and economic pressure topics.',
        pattern: 'pose a challenge to + noun',
        commonPattern: 'pose a challenge to + noun',
        example: 'Rapid urban growth poses a challenge to affordable housing provision.',
        ieltsExample: 'Rapid urban growth poses a challenge to affordable housing provision.',
        phrase: 'pose a major challenge',
        warning: 'Do not use "give a challenge" in academic discussion.',
        confusionWarning: 'Do not use "give a challenge" in academic discussion.',
        useCases: ['housing', 'infrastructure', 'labor market', 'education systems'],
        mistake: {
          wrong: 'Population growth gives a challenge to transport planning.',
          right: 'Population growth poses a challenge to transport planning.',
        },
        why: 'It adds precise argumentative framing for problems and constraints.',
        accent: {
          border: 'border-amber-200',
          surface: 'bg-amber-50/80',
          badge: 'bg-amber-100 text-amber-800',
          heading: 'text-amber-800',
          ring: 'ring-amber-100',
          dot: 'bg-amber-500',
        },
      },
      {
        word: 'achieve goals',
        part: 'verb + noun collocation',
        grammarRole: 'Collocation',
        instant: 'successfully reach targets',
        meaning: 'to successfully reach planned objectives',
        clue: 'Use it for final outcomes after strategy or sustained effort.',
        whenToUse: 'Effective for personal development, educational policy, and sustainable development arguments.',
        pattern: 'achieve goals through + noun',
        commonPattern: 'achieve goals through + noun',
        example: 'Communities can achieve long-term goals through consistent investment in teacher training.',
        ieltsExample: 'Communities can achieve long-term goals through consistent investment in teacher training.',
        phrase: 'achieve long-term goals',
        warning: 'Avoid weak alternatives like "get goals" in formal writing.',
        confusionWarning: 'Avoid weak alternatives like "get goals" in formal writing.',
        useCases: ['education', 'career', 'public policy', 'development planning'],
        mistake: {
          wrong: 'The policy helped get its goals quickly.',
          right: 'The policy helped achieve its goals efficiently.',
        },
        why: 'It closes argument chains with a strong outcomes-focused collocation.',
        accent: {
          border: 'border-emerald-200',
          surface: 'bg-emerald-50/70',
          badge: 'bg-emerald-100 text-emerald-700',
          heading: 'text-emerald-700',
          ring: 'ring-emerald-100',
          dot: 'bg-emerald-600',
        },
      },
    ],
    quickDecisionRules: [
      { cue: 'Showing gradual improvement?', answer: 'Use make progress.', tone: 'border-indigo-200 bg-indigo-50/70 text-indigo-950' },
      { cue: 'Responding to public worries?', answer: 'Use address concerns.', tone: 'border-violet-200 bg-violet-50/70 text-violet-950' },
      { cue: 'Naming a serious obstacle?', answer: 'Use pose a challenge.', tone: 'border-amber-200 bg-amber-50/80 text-amber-950' },
      { cue: 'Showing successful final outcomes?', answer: 'Use achieve goals.', tone: 'border-emerald-200 bg-emerald-50/70 text-emerald-950' },
    ],
    checks: [
      {
        prompt: 'Local governments must ______ about road safety before launching smart traffic systems.',
        options: ['address concerns', 'make progress', 'pose a challenge'],
        correct: 'address concerns',
        explanation: 'The sentence is about responding to worries, so address concerns is correct.',
      },
      {
        prompt: 'Frequent teacher turnover can ______ to school improvement plans.',
        options: ['pose a challenge', 'achieve goals', 'address concerns'],
        correct: 'pose a challenge',
        explanation: 'The phrase describes creating difficulty for progress.',
      },
      {
        prompt: 'Which collocation best fits successful completion of planned targets?',
        options: ['achieve goals', 'pose a challenge', 'address concerns'],
        correct: 'achieve goals',
        explanation: 'Achieve goals directly expresses reaching intended targets.',
      },
    ],
    memoryTip: {
      title: 'Quick memory trick',
      text: '**Progress/concerns/challenges/goals** pair with specific verbs. Learn the chunk, not only the single word.',
    },
    contrastTip: {
      title: 'Problem vs outcome collocations',
      text: '**Address concerns** and **pose a challenge** describe problems; **make progress** and **achieve goals** describe advancement.',
    },
    applyPrompt: 'Explain how a city can improve public transport while responding to budget pressure and commuter complaints.',
    applyHint: 'Use at least two collocations from this lesson, including one challenge collocation and one outcome collocation.',
    modelAnswer:
      'City officials should address residents\' concerns about reliability while expanding bus lanes, since funding limits pose a challenge to rapid upgrades; however, with phased investment they can make steady progress and eventually achieve long-term mobility goals.',
    modelAnswerSegments: [
      { text: 'City officials should ' },
      { text: 'address residents\' concerns', highlightClass: 'rounded bg-violet-100 px-1 text-violet-900' },
      { text: ' about reliability while expanding bus lanes, since funding limits ' },
      { text: 'pose a challenge', highlightClass: 'rounded bg-amber-100 px-1 text-amber-900' },
      { text: ' to rapid upgrades; however, with phased investment they can ' },
      { text: 'make steady progress', highlightClass: 'rounded bg-indigo-100 px-1 text-indigo-900' },
      { text: ' and eventually ' },
      { text: 'achieve long-term goals', highlightClass: 'rounded bg-emerald-100 px-1 text-emerald-900' },
      { text: '.' },
    ],
    modelBreakdown: [
      { term: 'address concerns', text: 'responds to stakeholder worries.' },
      { term: 'pose a challenge', text: 'introduces a structural obstacle.' },
      { term: 'make progress / achieve goals', text: 'shows short-term movement and final success.' },
    ],
    heroWordBubbles: [
      { label: 'make progress', className: 'absolute left-3 top-5 z-10 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-indigo-100' },
      { label: 'address concerns', className: 'absolute right-4 top-8 z-10 rounded-lg bg-violet-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-violet-100' },
      { label: 'pose a challenge', className: 'absolute bottom-8 left-9 z-10 rounded-lg bg-amber-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-amber-100' },
      { label: 'achieve goals', className: 'absolute bottom-11 right-7 z-10 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-emerald-100' },
    ],
    practiceCards: [
      { title: 'Collocation Switch', subtitle: 'Replace weak verb choices with academic collocations.', tone: 'text-blue-600 bg-blue-50' },
      { title: 'Policy Writing', subtitle: 'Use one challenge + one outcome collocation in 2 sentences.', tone: 'text-violet-600 bg-violet-50' },
      { title: 'Error Hunt', subtitle: 'Fix unnatural chunks like do progress and give challenge.', tone: 'text-orange-600 bg-orange-50' },
      { title: 'Task 2 Drill', subtitle: 'Build a cause-solution paragraph with 3 target collocations.', tone: 'text-emerald-600 bg-emerald-50' },
      { title: 'Speaking Upgrade', subtitle: 'Give a Part 3 answer using at least two lesson chunks.', tone: 'text-indigo-600 bg-indigo-50' },
    ],
  },
  'band-7-to-8-precision-vocabulary': {
    lessonNumber: '12',
    title: 'Band 7 to 8 Precision Vocabulary',
    subtitle: 'Select nuanced intensity words accurately to sound precise and academic.',
    level: 'Band 7.0 - 8.5',
    estimatedTime: '10-12 min',
    categoryLabel: 'Band Upgrade Precision',
    lessonBadgeLabel: 'Vocabulary · Lesson 12',
    sidebarLessonLabel: 'Lesson 12',
    deepLessonProgress: 31,
    learningOutcomes: [
      'Choose intensity words based on scale, not habit',
      'Avoid vague repetition like very big/very important',
      'Write more precise and credible evaluations in IELTS tasks',
    ],
    words: [
      {
        word: 'significant',
        part: 'adjective',
        grammarRole: 'Adjective',
        instant: 'important and clearly noticeable',
        meaning: 'large enough to matter or deserve attention',
        clue: 'Use it for meaningful change or impact, especially with evidence.',
        whenToUse: 'Best for data trends, policy effects, and social outcomes in Task 1/2.',
        pattern: 'a significant increase / play a significant role',
        commonPattern: 'a significant increase / play a significant role',
        example: 'Online tutoring has had a significant impact on exam preparation habits.',
        ieltsExample: 'Online tutoring has had a significant impact on exam preparation habits.',
        phrase: 'a significant impact on',
        warning: 'Do not use it for tiny changes; pair it with evidence or clear scale.',
        confusionWarning: 'Do not use it for tiny changes; pair it with evidence or clear scale.',
        useCases: ['data trends', 'education policy', 'economy', 'public health'],
        mistake: {
          wrong: 'There was a significant rise from 100 to 101.',
          right: 'There was only a marginal rise from 100 to 101.',
        },
        why: 'It is a core high-band replacement for vague adjectives like big/important.',
        accent: {
          border: 'border-indigo-200',
          surface: 'bg-indigo-50/70',
          badge: 'bg-indigo-100 text-indigo-700',
          heading: 'text-indigo-700',
          ring: 'ring-indigo-100',
          dot: 'bg-indigo-600',
        },
      },
      {
        word: 'substantial',
        part: 'adjective',
        grammarRole: 'Adjective',
        instant: 'large in amount or degree',
        meaning: 'considerably large, often measurable in quantity',
        clue: 'Use it when the amount is clearly large, especially with numbers or resources.',
        whenToUse: 'Strong for finance, infrastructure, and quantified growth/decline contexts.',
        pattern: 'substantial investment / substantial reduction',
        commonPattern: 'substantial investment / substantial reduction',
        example: 'The city requires substantial investment to modernize public transport.',
        ieltsExample: 'The city requires substantial investment to modernize public transport.',
        phrase: 'substantial evidence',
        warning: 'Avoid using substantial for abstract minor effects where scale is unclear.',
        confusionWarning: 'Avoid using substantial for abstract minor effects where scale is unclear.',
        useCases: ['funding', 'resources', 'infrastructure', 'economic measures'],
        mistake: {
          wrong: 'The proposal has a substantial advantage of being simple.',
          right: 'The proposal has a significant advantage of being simple.',
        },
        why: 'It improves precision when describing size and quantity.',
        accent: {
          border: 'border-violet-200',
          surface: 'bg-violet-50/70',
          badge: 'bg-violet-100 text-violet-700',
          heading: 'text-violet-700',
          ring: 'ring-violet-100',
          dot: 'bg-violet-600',
        },
      },
      {
        word: 'marginal',
        part: 'adjective',
        grammarRole: 'Adjective',
        instant: 'small or limited in effect',
        meaning: 'very slight in amount, importance, or impact',
        clue: 'Use it to show that change exists but remains minor.',
        whenToUse: 'Ideal for Task 1 trend description and careful evaluation in Task 2.',
        pattern: 'a marginal increase / marginal improvement',
        commonPattern: 'a marginal increase / marginal improvement',
        example: 'Despite policy changes, only marginal improvements were observed in rural literacy rates.',
        ieltsExample: 'Despite policy changes, only marginal improvements were observed in rural literacy rates.',
        phrase: 'a marginal change in',
        warning: 'Do not confuse it with major; marginal signals a limited shift.',
        confusionWarning: 'Do not confuse it with major; marginal signals a limited shift.',
        useCases: ['statistics', 'education outcomes', 'health indicators', 'employment rates'],
        mistake: {
          wrong: 'There was a marginal drop of 40 percent.',
          right: 'There was a substantial drop of 40 percent.',
        },
        why: 'It prevents overstatement and makes analysis more credible.',
        accent: {
          border: 'border-amber-200',
          surface: 'bg-amber-50/80',
          badge: 'bg-amber-100 text-amber-800',
          heading: 'text-amber-800',
          ring: 'ring-amber-100',
          dot: 'bg-amber-500',
        },
      },
      {
        word: 'considerable',
        part: 'adjective',
        grammarRole: 'Adjective',
        instant: 'quite large and noteworthy',
        meaning: 'rather large in size, amount, or importance',
        clue: 'Use it for notable scale that is strong but often slightly less forceful than substantial.',
        whenToUse: 'Useful for mixed qualitative/quantitative statements in essays.',
        pattern: 'considerable pressure / considerable number of + noun',
        commonPattern: 'considerable pressure / considerable number of + noun',
        example: 'Many graduates face considerable pressure to secure stable employment quickly.',
        ieltsExample: 'Many graduates face considerable pressure to secure stable employment quickly.',
        phrase: 'a considerable amount of',
        warning: 'Do not overuse it with trivial issues where impact is clearly small.',
        confusionWarning: 'Do not overuse it with trivial issues where impact is clearly small.',
        useCases: ['social issues', 'labor market', 'education costs', 'urban pressure'],
        mistake: {
          wrong: 'There was a considerable change from 50 to 51.',
          right: 'There was a marginal change from 50 to 51.',
        },
        why: 'It adds nuanced control over intensity, a key Band 8 trait.',
        accent: {
          border: 'border-emerald-200',
          surface: 'bg-emerald-50/70',
          badge: 'bg-emerald-100 text-emerald-700',
          heading: 'text-emerald-700',
          ring: 'ring-emerald-100',
          dot: 'bg-emerald-600',
        },
      },
    ],
    quickDecisionRules: [
      { cue: 'Important and clearly noticeable effect?', answer: 'Use significant.', tone: 'border-indigo-200 bg-indigo-50/70 text-indigo-950' },
      { cue: 'Large measurable amount or quantity?', answer: 'Use substantial.', tone: 'border-violet-200 bg-violet-50/70 text-violet-950' },
      { cue: 'Very small or limited change?', answer: 'Use marginal.', tone: 'border-amber-200 bg-amber-50/80 text-amber-950' },
      { cue: 'Notably large but mixed/qualitative context?', answer: 'Use considerable.', tone: 'border-emerald-200 bg-emerald-50/70 text-emerald-950' },
    ],
    checks: [
      {
        prompt: 'From 45% to 46% is usually described as a ______ increase.',
        options: ['marginal', 'substantial', 'considerable'],
        correct: 'marginal',
        explanation: 'A one-point movement is slight, so marginal is most accurate.',
      },
      {
        prompt: 'The project needs ______ funding to expand services nationwide.',
        options: ['substantial', 'marginal', 'slight'],
        correct: 'substantial',
        explanation: 'Substantial is best for large measurable resource needs.',
      },
      {
        prompt: 'Which sentence best fits a clearly important policy effect?',
        options: [
          'The reform had a significant impact on school attendance.',
          'The reform had a marginal impact on school attendance despite a 25% rise.',
          'The reform had a tiny considerable impact on school attendance.',
        ],
        correct: 'The reform had a significant impact on school attendance.',
        explanation: 'Significant matches clearly important and evidenced impact.',
      },
    ],
    memoryTip: {
      title: 'Quick memory trick',
      text: '**Marginal** = small. **Significant/considerable/substantial** = bigger, with **substantial** often most quantitative.',
    },
    contrastTip: {
      title: 'Scale-aware word choice',
      text: 'Match adjective strength to data size; overstatement lowers precision and can hurt your band.',
    },
    applyPrompt: 'Describe changes in public transport usage over five years and explain which changes are truly important.',
    applyHint: 'Use one small-change word and at least two strong-change words with evidence.',
    modelAnswer:
      'Although bus use rose only marginally in the first year, later reforms produced considerable growth, and by year five there was a substantial increase overall with a significant impact on commuting patterns.',
    modelAnswerSegments: [
      { text: 'Although bus use rose only ' },
      { text: 'marginally', highlightClass: 'rounded bg-amber-100 px-1 text-amber-900' },
      { text: ' in the first year, later reforms produced ' },
      { text: 'considerable', highlightClass: 'rounded bg-emerald-100 px-1 text-emerald-900' },
      { text: ' growth, and by year five there was a ' },
      { text: 'substantial', highlightClass: 'rounded bg-violet-100 px-1 text-violet-900' },
      { text: ' increase overall with a ' },
      { text: 'significant', highlightClass: 'rounded bg-indigo-100 px-1 text-indigo-900' },
      { text: ' impact on commuting patterns.' },
    ],
    modelBreakdown: [
      { term: 'marginal(ly)', text: 'captures a minor early shift accurately.' },
      { term: 'considerable / substantial', text: 'show larger later-stage scale with stronger wording.' },
      { term: 'significant impact', text: 'evaluates why the change matters, not only its size.' },
    ],
    heroWordBubbles: [
      { label: 'significant', className: 'absolute left-3 top-5 z-10 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-indigo-100' },
      { label: 'substantial', className: 'absolute right-4 top-8 z-10 rounded-lg bg-violet-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-violet-100' },
      { label: 'marginal', className: 'absolute bottom-8 left-9 z-10 rounded-lg bg-amber-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-amber-100' },
      { label: 'considerable', className: 'absolute bottom-11 right-7 z-10 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-emerald-100' },
    ],
    practiceCards: [
      { title: 'Scale Match', subtitle: 'Choose the adjective that fits each numeric change.', tone: 'text-blue-600 bg-blue-50' },
      { title: 'Task 1 Upgrade', subtitle: 'Rewrite weak trend lines with precise intensity words.', tone: 'text-violet-600 bg-violet-50' },
      { title: 'Overstatement Fix', subtitle: 'Downgrade exaggerated adjectives to accurate ones.', tone: 'text-orange-600 bg-orange-50' },
      { title: 'Task 2 Precision', subtitle: 'Justify claims with significant vs marginal wording.', tone: 'text-emerald-600 bg-emerald-50' },
      { title: 'Speaking Accuracy', subtitle: 'Give a Part 3 response using 3 scale words correctly.', tone: 'text-indigo-600 bg-indigo-50' },
    ],
  },
};

export const deepVocabularyLessonSlugs = Object.keys(deepVocabularyLessons);

export function getDeepVocabularyLessonData(slug: string) {
  return deepVocabularyLessons[slug];
}

export function hasDeepVocabularyLesson(slug: string): slug is keyof typeof deepVocabularyLessons {
  return slug in deepVocabularyLessons;
}
