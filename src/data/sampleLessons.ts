import { Lesson } from '@/types';

export const SAMPLE_LESSONS: Lesson[] = [
  {
    id: 'vocab-1',
    title: 'Academic Vocabulary: Education & Learning',
    slug: 'academic-vocabulary-education-learning',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Education',
    description: 'Master essential academic vocabulary related to education, learning processes, and academic achievement for IELTS Band 7+.',
    is_premium: false,
    is_published: true,
    view_count: 1250,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    content: {
      title: 'Academic Vocabulary: Education & Learning',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Use 15 high-frequency academic words related to education',
        'Form natural collocations with education vocabulary',
        'Apply these words in IELTS Writing Task 2 and Speaking Part 3'
      ],
      coreExplanation: `Education vocabulary is crucial for IELTS as it appears frequently in Reading passages, Writing Task 2 topics, and Speaking Part 3 discussions. This lesson focuses on words that demonstrate academic sophistication while remaining natural in context.

The key to using academic vocabulary effectively is understanding not just the meaning, but also the collocations (words that naturally go together) and the register (formal vs informal usage). Band 7+ candidates consistently use these words accurately and appropriately.`,
      examples: [
        { sentence: 'The curriculum should be revised to include more practical skills.', explanation: '"Curriculum" refers to the subjects and content taught in a school or course.' },
        { sentence: 'Students need to acquire critical thinking skills early in their education.', explanation: '"Acquire" is more formal than "get" or "learn" and shows academic register.' },
        { sentence: 'The pedagogy employed by modern teachers emphasizes student participation.', explanation: '"Pedagogy" means teaching methods - a sophisticated alternative to "teaching style".' },
        { sentence: 'Academic achievement is often measured through standardized testing.', explanation: '"Achievement" collocates naturally with "academic" for formal writing.' },
        { sentence: 'The institution implemented new assessment criteria last semester.', explanation: '"Implement" means to put into action - stronger than "start" or "begin".' },
        { sentence: 'Rote learning has been criticized for hindering creative development.', explanation: '"Rote learning" means memorization without understanding.' },
        { sentence: 'The scholarship program aims to foster academic excellence.', explanation: '"Foster" means to encourage development - commonly used in education contexts.' },
        { sentence: 'Students must demonstrate proficiency in English before graduation.', explanation: '"Proficiency" indicates a high level of skill or competence.' },
        { sentence: 'The seminar provided valuable insights into research methodology.', explanation: '"Methodology" refers to the system of methods used in a field of study.' },
        { sentence: 'Collaborative learning enhances student engagement and retention.', explanation: '"Retention" means the ability to remember information over time.' }
      ],
      commonMistakes: [
        { mistake: 'The education system needs to be reformed.', correction: 'The education system needs to undergo reform / be reformed.', explanation: 'While grammatically correct, "undergo reform" sounds more natural in academic writing.' },
        { mistake: 'Students should learn knowledge.', correction: 'Students should acquire/gain knowledge.', explanation: '"Learn" doesn\'t collocate well with "knowledge" - use "acquire" or "gain" instead.' },
        { mistake: 'The school made a new curriculum.', correction: 'The school developed/designed a new curriculum.', explanation: '"Make" is too informal - use "develop" or "design" for academic contexts.' },
        { mistake: 'Education is very important for success.', correction: 'Education plays a crucial/vital role in achieving success.', explanation: 'Avoid "very important" - use more sophisticated expressions.' },
        { mistake: 'Teachers should teach students good.', correction: 'Teachers should educate students effectively.', explanation: 'Use "educate" instead of "teach" for variety, and "effectively" instead of "good".' }
      ],
      miniPractice: [
        { question: 'The university _____ a new policy to improve student welfare.', type: 'fill-blank' },
        { question: 'Which word best completes: "Students need to _____ critical thinking skills"?', options: ['acquire', 'make', 'do', 'have'], type: 'multiple-choice' },
        { question: 'Rewrite: "Learning by heart is not good for creativity."', type: 'rewrite' },
        { question: 'The _____ focuses on practical skills rather than theoretical knowledge.', type: 'fill-blank' },
        { question: 'Which collocation is correct?', options: ['academic achievement', 'academic success', 'Both are correct', 'Neither is correct'], type: 'multiple-choice' }
      ],
      answerKey: [
        'implemented',
        'acquire',
        'Rote learning hinders creative development. / Memorization without understanding impedes creativity.',
        'curriculum',
        'Both are correct'
      ],
      quickRecap: 'Today you learned 15 academic words for education topics. Remember: "acquire" not "learn" knowledge, "implement" not "make" policies, and "curriculum" for course content. Use these in your next Writing Task 2 about education!',
      collocations: [
        'academic achievement', 'acquire knowledge', 'implement policies', 'foster development',
        'demonstrate proficiency', 'undergo reform', 'enhance engagement', 'critical thinking skills'
      ],
      synonyms: [
        { word: 'learn', synonyms: ['acquire', 'gain', 'obtain', 'develop'] },
        { word: 'important', synonyms: ['crucial', 'vital', 'essential', 'significant'] },
        { word: 'improve', synonyms: ['enhance', 'develop', 'strengthen', 'advance'] }
      ],
      speakingLines: [
        'In my opinion, the education system should place greater emphasis on practical skills.',
        'I believe that fostering creativity is just as important as academic achievement.',
        'From my perspective, the curriculum needs to be updated to reflect modern needs.'
      ]
    }
  },
  {
    id: 'vocab-2',
    title: 'Environment & Climate Change Vocabulary',
    slug: 'environment-climate-change-vocabulary',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Environment',
    description: 'Advanced vocabulary for discussing environmental issues, climate change, and sustainability in IELTS.',
    is_premium: true,
    is_published: true,
    view_count: 890,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
    content: {
      title: 'Environment & Climate Change Vocabulary',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 20 advanced environmental terms for Band 8+ writing',
        'Use precise scientific vocabulary naturally in essays',
        'Discuss climate solutions with sophisticated language'
      ],
      coreExplanation: `Environmental topics are among the most common in IELTS Writing Task 2 and Speaking Part 3. To achieve Band 7+, you need vocabulary that goes beyond basic words like "pollution" and "global warming."

This lesson introduces precise, academic vocabulary that demonstrates your ability to discuss complex environmental issues. The key is using these words accurately - examiners can tell when candidates use sophisticated words incorrectly.`,
      examples: [
        { sentence: 'Carbon emissions must be drastically reduced to mitigate climate change.', explanation: '"Mitigate" means to make less severe - perfect for discussing solutions.' },
        { sentence: 'Deforestation contributes significantly to biodiversity loss.', explanation: '"Biodiversity" refers to the variety of plant and animal life.' },
        { sentence: 'Sustainable development balances economic growth with environmental protection.', explanation: '"Sustainable" means able to continue without depleting resources.' },
        { sentence: 'The ecosystem has been severely degraded by industrial pollution.', explanation: '"Degraded" means reduced in quality - stronger than "damaged".' },
        { sentence: 'Renewable energy sources are essential for reducing our carbon footprint.', explanation: '"Carbon footprint" refers to total greenhouse gas emissions.' },
        { sentence: 'Conservation efforts have helped endangered species recover.', explanation: '"Conservation" means protecting natural resources and wildlife.' },
        { sentence: 'The government implemented stringent regulations on industrial waste.', explanation: '"Stringent" means strict - shows sophisticated vocabulary.' },
        { sentence: 'Climate change poses an existential threat to coastal communities.', explanation: '"Existential threat" means a threat to existence itself.' },
        { sentence: 'Transitioning to a circular economy could reduce waste significantly.', explanation: '"Circular economy" is an economic system aimed at eliminating waste.' },
        { sentence: 'The proliferation of single-use plastics has exacerbated ocean pollution.', explanation: '"Proliferation" means rapid increase; "exacerbated" means made worse.' }
      ],
      commonMistakes: [
        { mistake: 'The environment is being destroyed.', correction: 'The environment is being degraded/depleted.', explanation: '"Destroyed" is too absolute - "degraded" or "depleted" are more precise.' },
        { mistake: 'We need to stop pollution.', correction: 'We need to curb/reduce/mitigate pollution.', explanation: '"Stop" is unrealistic - use "curb", "reduce", or "mitigate" instead.' },
        { mistake: 'Global warming is a big problem.', correction: 'Climate change poses a significant/grave threat.', explanation: 'Avoid "big problem" - use more sophisticated expressions.' },
        { mistake: 'Animals are dying because of pollution.', correction: 'Wildlife populations are declining due to environmental degradation.', explanation: 'Use "wildlife populations" and "declining" for academic register.' },
        { mistake: 'We should use green energy.', correction: 'We should transition to renewable/sustainable energy sources.', explanation: '"Green energy" is informal - use "renewable" or "sustainable" energy.' }
      ],
      miniPractice: [
        { question: 'Governments must take urgent action to _____ the effects of climate change.', type: 'fill-blank' },
        { question: 'Which word means "able to be maintained without depleting resources"?', options: ['sustainable', 'renewable', 'recyclable', 'biodegradable'], type: 'multiple-choice' },
        { question: 'Rewrite: "Cutting down trees is bad for animals."', type: 'rewrite' },
        { question: 'The _____ of plastic waste in oceans threatens marine ecosystems.', type: 'fill-blank' },
        { question: 'Which collocation is most natural?', options: ['carbon footprint', 'carbon mark', 'carbon trace', 'carbon sign'], type: 'multiple-choice' }
      ],
      answerKey: [
        'mitigate',
        'sustainable',
        'Deforestation poses a significant threat to biodiversity. / The destruction of forests adversely affects wildlife habitats.',
        'proliferation / accumulation',
        'carbon footprint'
      ],
      quickRecap: 'You\'ve learned advanced environmental vocabulary including "mitigate", "sustainable", "biodiversity", and "proliferation". Remember to use these precisely - "mitigate" for reducing severity, "sustainable" for long-term viability. Practice using these in your next environment essay!',
      collocations: [
        'carbon emissions', 'biodiversity loss', 'sustainable development', 'renewable energy',
        'carbon footprint', 'environmental degradation', 'climate change mitigation', 'ecological balance'
      ],
      synonyms: [
        { word: 'pollution', synonyms: ['contamination', 'degradation', 'emissions'] },
        { word: 'destroy', synonyms: ['degrade', 'deplete', 'devastate', 'ravage'] },
        { word: 'protect', synonyms: ['conserve', 'preserve', 'safeguard', 'sustain'] }
      ],
      speakingLines: [
        'I firmly believe that transitioning to renewable energy is essential for our future.',
        'From an environmental perspective, sustainable practices should be prioritized.',
        'The evidence suggests that climate change poses an existential threat to many species.'
      ]
    }
  },
  {
    id: 'grammar-1',
    title: 'Mastering Conditional Sentences',
    slug: 'mastering-conditional-sentences',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Conditionals',
    description: 'Learn all four types of conditional sentences and how to use them effectively in IELTS Writing and Speaking.',
    is_premium: false,
    is_published: true,
    view_count: 2100,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
    content: {
      title: 'Mastering Conditional Sentences',
      targetLevel: 'Band 6.0 - 7.5',
      whatYouWillLearn: [
        'Understand and use all four conditional types correctly',
        'Avoid common conditional errors that lower your band score',
        'Apply conditionals naturally in IELTS Writing Task 2 and Speaking'
      ],
      coreExplanation: `Conditional sentences are essential for IELTS as they allow you to discuss possibilities, hypothetical situations, and cause-effect relationships. Mastering conditionals demonstrates grammatical range and accuracy.

**Zero Conditional** (general truths): If/When + present simple, present simple
**First Conditional** (real future possibility): If + present simple, will + infinitive
**Second Conditional** (unreal present/future): If + past simple, would + infinitive
**Third Conditional** (unreal past): If + past perfect, would have + past participle

The key to Band 7+ is using these accurately AND knowing when to use each type.`,
      examples: [
        { sentence: 'If water reaches 100°C, it boils. (Zero)', explanation: 'Zero conditional for scientific facts and general truths.' },
        { sentence: 'If the government invests in education, literacy rates will improve. (First)', explanation: 'First conditional for real, possible future outcomes.' },
        { sentence: 'If I were the president, I would prioritize healthcare reform. (Second)', explanation: 'Second conditional for hypothetical present situations. Note: "were" not "was".' },
        { sentence: 'If they had implemented the policy earlier, the crisis could have been avoided. (Third)', explanation: 'Third conditional for hypothetical past situations.' },
        { sentence: 'Unless action is taken immediately, the situation will deteriorate. (First)', explanation: '"Unless" means "if not" - commonly used in formal writing.' },
        { sentence: 'Were the government to increase funding, schools would benefit significantly. (Second - formal)', explanation: 'Inverted conditional without "if" - very formal and impressive.' },
        { sentence: 'Had I known about the deadline, I would have submitted earlier. (Third - formal)', explanation: 'Inverted third conditional - shows advanced grammar.' },
        { sentence: 'Provided that resources are available, the project will succeed. (First)', explanation: '"Provided that" is a formal alternative to "if".' },
        { sentence: 'If people were more environmentally conscious, pollution would decrease. (Second)', explanation: 'Second conditional for unlikely but possible scenarios.' },
        { sentence: 'Should you require any assistance, please do not hesitate to ask. (First - formal)', explanation: 'Inverted first conditional - very formal register.' }
      ],
      commonMistakes: [
        { mistake: 'If I would have more time, I would study harder.', correction: 'If I had more time, I would study harder.', explanation: 'Don\'t use "would" in the if-clause of second conditionals.' },
        { mistake: 'If I was rich, I would travel the world.', correction: 'If I were rich, I would travel the world.', explanation: 'Use "were" (not "was") for all subjects in second conditional.' },
        { mistake: 'If they would have studied, they would have passed.', correction: 'If they had studied, they would have passed.', explanation: 'Don\'t use "would have" in the if-clause of third conditionals.' },
        { mistake: 'If the weather will be good, we will go out.', correction: 'If the weather is good, we will go out.', explanation: 'Use present simple (not "will") in the if-clause of first conditionals.' },
        { mistake: 'Unless you will not hurry, you will be late.', correction: 'Unless you hurry, you will be late.', explanation: '"Unless" already means "if not" - don\'t add another negative.' }
      ],
      miniPractice: [
        { question: 'If the government _____ (invest) more in renewable energy, carbon emissions would decrease.', type: 'fill-blank' },
        { question: 'Which sentence is correct?', options: ['If I was you, I would accept the offer.', 'If I were you, I would accept the offer.', 'If I would be you, I would accept the offer.', 'If I am you, I would accept the offer.'], type: 'multiple-choice' },
        { question: 'Rewrite using inversion: "If I had known about the problem, I would have helped."', type: 'rewrite' },
        { question: 'If water _____ (freeze), it expands.', type: 'fill-blank' },
        { question: 'Complete: "_____ the economy improve, unemployment will fall."', options: ['Should', 'Would', 'If would', 'Unless'], type: 'multiple-choice' }
      ],
      answerKey: [
        'invested',
        'If I were you, I would accept the offer.',
        'Had I known about the problem, I would have helped.',
        'freezes',
        'Should'
      ],
      quickRecap: 'Remember: Zero (facts), First (real future), Second (unreal present - use "were"), Third (unreal past - "had + pp"). Never use "would" in the if-clause! For formal writing, try inverted conditionals: "Were the government to...", "Had they known..."',
      grammarForm: `**Zero:** If/When + present simple, present simple
**First:** If + present simple, will/can/may + infinitive
**Second:** If + past simple, would/could/might + infinitive
**Third:** If + past perfect, would/could/might + have + past participle
**Mixed:** If + past perfect, would + infinitive (past condition, present result)`,
      grammarUse: `**Zero:** Scientific facts, general truths, habits
**First:** Real possibilities, likely future events, warnings
**Second:** Hypothetical/unlikely situations, advice, wishes
**Third:** Regrets, criticism, hypothetical past events
**Formal alternatives:** Unless, provided that, as long as, on condition that`,
      sentenceUpgrade: [
        { basic: 'If the government helps, things will improve.', upgraded: 'Were the government to provide adequate support, the situation would improve significantly.' },
        { basic: 'If I knew the answer, I would tell you.', upgraded: 'Had I been aware of the solution, I would certainly have informed you.' },
        { basic: 'If you study hard, you will pass.', upgraded: 'Provided that you dedicate sufficient time to preparation, success is virtually guaranteed.' }
      ]
    }
  },
  {
    id: 'grammar-2',
    title: 'Perfect Tenses for Band 7+',
    slug: 'perfect-tenses-band-7-plus',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Tenses',
    description: 'Master present perfect, past perfect, and future perfect tenses to demonstrate grammatical range in IELTS.',
    is_premium: false,
    is_published: true,
    view_count: 1850,
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T10:00:00Z',
    content: {
      title: 'Perfect Tenses for Band 7+',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Use present perfect vs past simple correctly',
        'Apply past perfect for sequencing events',
        'Demonstrate grammatical range with future perfect'
      ],
      coreExplanation: `Perfect tenses connect different time periods and show the relationship between events. Using them correctly is essential for Band 7+ as they demonstrate sophisticated time reference.

**Present Perfect** connects past to present - for experiences, recent events, and ongoing situations.
**Past Perfect** shows which past event happened first - crucial for narratives and explanations.
**Future Perfect** describes actions completed before a future point - shows advanced grammar.

The key difference from simple tenses: perfect tenses emphasize the RELEVANCE or COMPLETION of an action, not just when it happened.`,
      examples: [
        { sentence: 'Technology has transformed the way we communicate.', explanation: 'Present perfect for a past action with present relevance.' },
        { sentence: 'The number of internet users has increased dramatically since 2000.', explanation: 'Present perfect with "since" for a change from past to now.' },
        { sentence: 'By the time the government acted, the damage had already been done.', explanation: 'Past perfect shows the damage happened BEFORE the government acted.' },
        { sentence: 'Researchers had been studying the phenomenon for years before they made a breakthrough.', explanation: 'Past perfect continuous for duration before another past event.' },
        { sentence: 'By 2050, renewable energy will have replaced fossil fuels in many countries.', explanation: 'Future perfect for completion before a future time.' },
        { sentence: 'This is the most significant development that has occurred in recent years.', explanation: 'Present perfect in superlative structures.' },
        { sentence: 'Once the policy has been implemented, we will see improvements.', explanation: 'Present perfect in time clauses referring to future.' },
        { sentence: 'The situation has been deteriorating for the past decade.', explanation: 'Present perfect continuous for ongoing situations.' },
        { sentence: 'Had the warning been heeded, the disaster could have been prevented.', explanation: 'Past perfect in third conditional (formal inversion).' },
        { sentence: 'By next year, I will have been studying English for ten years.', explanation: 'Future perfect continuous for duration up to a future point.' }
      ],
      commonMistakes: [
        { mistake: 'I have seen him yesterday.', correction: 'I saw him yesterday.', explanation: 'Don\'t use present perfect with specific past time (yesterday, last week, in 2020).' },
        { mistake: 'The population increased significantly since 1990.', correction: 'The population has increased significantly since 1990.', explanation: 'Use present perfect with "since" when the situation continues to now.' },
        { mistake: 'When I arrived, everyone left.', correction: 'When I arrived, everyone had left.', explanation: 'Use past perfect to show which action happened first.' },
        { mistake: 'I have been to Paris last summer.', correction: 'I went to Paris last summer.', explanation: 'Specific past time requires past simple, not present perfect.' },
        { mistake: 'By tomorrow, I finish the project.', correction: 'By tomorrow, I will have finished the project.', explanation: 'Use future perfect for actions completed before a future time.' }
      ],
      miniPractice: [
        { question: 'The government _____ (implement) several reforms since 2015.', type: 'fill-blank' },
        { question: 'Which is correct for a graph description?', options: ['The figure rose dramatically in 2010.', 'The figure has risen dramatically in 2010.', 'The figure had risen dramatically in 2010.', 'The figure will have risen dramatically in 2010.'], type: 'multiple-choice' },
        { question: 'Rewrite: "First the economy collapsed. Then the government intervened."', type: 'rewrite' },
        { question: 'By the end of this century, sea levels _____ (rise) significantly.', type: 'fill-blank' },
        { question: 'Which sentence shows correct present perfect usage?', options: ['I have visited London in 2019.', 'I have visited London three times.', 'I have visited London yesterday.', 'I have visited London last month.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'has implemented',
        'The figure rose dramatically in 2010.',
        'By the time the government intervened, the economy had already collapsed.',
        'will have risen',
        'I have visited London three times.'
      ],
      quickRecap: 'Present perfect = past + present connection (no specific time). Past perfect = earlier past before later past. Future perfect = completed before future time. Never use present perfect with yesterday/last week/in 2020!',
      grammarForm: `**Present Perfect:** have/has + past participle
**Present Perfect Continuous:** have/has + been + -ing
**Past Perfect:** had + past participle
**Past Perfect Continuous:** had + been + -ing
**Future Perfect:** will + have + past participle
**Future Perfect Continuous:** will + have + been + -ing`,
      grammarUse: `**Present Perfect:** experiences, recent events, changes over time, unfinished situations
**Past Perfect:** sequencing past events, reported speech, third conditional
**Future Perfect:** predictions about completion, formal writing about future achievements
**Time markers:** since, for, already, yet, just, by (the time), before, after`,
      sentenceUpgrade: [
        { basic: 'Many things changed in the last decade.', upgraded: 'Numerous significant changes have occurred over the past decade.' },
        { basic: 'The company grew before it faced problems.', upgraded: 'The company had experienced substantial growth before it encountered financial difficulties.' },
        { basic: 'We will finish the project next month.', upgraded: 'By the end of next month, we will have completed the entire project.' }
      ]
    }
  },
  {
    id: 'grammar-3',
    title: 'Passive Voice for Academic Writing',
    slug: 'passive-voice-academic-writing',
    type: 'grammar',
    level: 'advanced',
    topic: 'Passive Voice',
    description: 'Learn when and how to use passive voice effectively in IELTS Writing Task 1 and Task 2.',
    is_premium: true,
    is_published: true,
    view_count: 1420,
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
    content: {
      title: 'Passive Voice for Academic Writing',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Form passive constructions in all tenses correctly',
        'Know when passive voice is more appropriate than active',
        'Use passive voice naturally in Task 1 process descriptions'
      ],
      coreExplanation: `Passive voice is essential for academic writing and IELTS Task 1 process descriptions. It shifts focus from the doer to the action or result, which is often more appropriate in formal contexts.

**When to use passive:**
- The doer is unknown, unimportant, or obvious
- To emphasize the action or result
- In scientific/academic writing for objectivity
- In process descriptions (Task 1)

**When to avoid passive:**
- When it makes sentences unnecessarily complex
- When the doer is important information
- In informal contexts

Band 7+ candidates use passive strategically, not excessively.`,
      examples: [
        { sentence: 'The data was collected through online surveys.', explanation: 'Passive appropriate - the method matters more than who collected it.' },
        { sentence: 'It is widely believed that education is the key to success.', explanation: '"It is believed/argued/suggested" - impersonal passive for general views.' },
        { sentence: 'The raw materials are first processed and then transported to the factory.', explanation: 'Process description - focus on what happens, not who does it.' },
        { sentence: 'Significant improvements have been made in recent years.', explanation: 'Present perfect passive - emphasizes the improvements, not who made them.' },
        { sentence: 'The issue must be addressed urgently by policymakers.', explanation: 'Modal passive - "must be + past participle".' },
        { sentence: 'Having been thoroughly analyzed, the results were published.', explanation: 'Perfect participle passive - shows sequence in formal writing.' },
        { sentence: 'The proposal is being considered by the committee.', explanation: 'Present continuous passive for ongoing actions.' },
        { sentence: 'It can be argued that technology has both benefits and drawbacks.', explanation: 'Hedging with passive - shows academic caution.' },
        { sentence: 'The finished products are packaged and distributed worldwide.', explanation: 'Process description with multiple passive verbs.' },
        { sentence: 'Unless immediate action is taken, the situation will worsen.', explanation: 'Passive in conditional clauses.' }
      ],
      commonMistakes: [
        { mistake: 'The essay was written by me.', correction: 'I wrote the essay.', explanation: 'Don\'t use passive when "by me/us" sounds awkward - use active instead.' },
        { mistake: 'It was happened in 2020.', correction: 'It happened in 2020.', explanation: '"Happen" is intransitive - it cannot be made passive.' },
        { mistake: 'The problem was solved by them quickly.', correction: 'The problem was quickly solved. / They quickly solved the problem.', explanation: 'Avoid "by them" - either omit the agent or use active voice.' },
        { mistake: 'The data is collected and then it is analyzed.', correction: 'The data is collected and then analyzed.', explanation: 'Don\'t repeat the subject - use parallel structure.' },
        { mistake: 'Many people are believed that...', correction: 'It is believed that... / Many people believe that...', explanation: '"It is believed" is impersonal - people aren\'t "believed".' }
      ],
      miniPractice: [
        { question: 'The raw materials _____ (transport) to the processing plant.', type: 'fill-blank' },
        { question: 'Which passive construction is correct?', options: ['It is suggested that changes are needed.', 'It is suggested that changes is needed.', 'Changes is suggested to be needed.', 'It suggests that changes are needed.'], type: 'multiple-choice' },
        { question: 'Rewrite in passive: "Scientists have discovered a new species."', type: 'rewrite' },
        { question: 'The issue _____ (must/address) before the deadline.', type: 'fill-blank' },
        { question: 'Which sentence should NOT be passive?', options: ['The experiment was conducted carefully.', 'The report was written by me.', 'The results were published last month.', 'The data was analyzed using software.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'are transported',
        'It is suggested that changes are needed.',
        'A new species has been discovered (by scientists).',
        'must be addressed',
        'The report was written by me.'
      ],
      quickRecap: 'Use passive when the doer is unknown/unimportant, for process descriptions, and for academic objectivity. Avoid passive with "by me/us" - switch to active. Remember: "It is believed/argued/suggested that..." for impersonal statements.',
      grammarForm: `**Present Simple:** am/is/are + past participle
**Past Simple:** was/were + past participle
**Present Perfect:** have/has + been + past participle
**Past Perfect:** had + been + past participle
**Future:** will + be + past participle
**Modal:** modal + be + past participle
**Continuous:** am/is/are/was/were + being + past participle`,
      grammarUse: `**Task 1 Process:** Describe steps without mentioning people
**Task 2:** For objectivity, hedging, and formal register
**Impersonal constructions:** It is believed/argued/suggested/claimed that...
**Reporting:** The study was conducted... The results were analyzed...
**Emphasis:** When the action/result is more important than the doer`,
      sentenceUpgrade: [
        { basic: 'People believe that education is important.', upgraded: 'It is widely believed that education plays a crucial role in personal development.' },
        { basic: 'They process the materials and send them to factories.', upgraded: 'The materials are processed and subsequently dispatched to manufacturing facilities.' },
        { basic: 'Someone should solve this problem.', upgraded: 'This issue must be addressed as a matter of urgency.' }
      ]
    }
  },
  {
    id: 'vocab-3',
    title: 'Technology & Innovation Vocabulary',
    slug: 'technology-innovation-vocabulary',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Technology',
    description: 'Essential vocabulary for discussing technology, digital transformation, and innovation in IELTS.',
    is_premium: false,
    is_published: true,
    view_count: 1680,
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z',
    content: {
      title: 'Technology & Innovation Vocabulary',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Use 15 key technology terms accurately in IELTS',
        'Discuss digital transformation with appropriate vocabulary',
        'Express balanced views on technology in Writing and Speaking'
      ],
      coreExplanation: `Technology is one of the most frequent IELTS topics, appearing in Reading, Writing Task 2, and Speaking Part 3. To score Band 7+, you need vocabulary that allows you to discuss both benefits and drawbacks of technological advancement.

This lesson focuses on words that help you express nuanced views - not just "technology is good/bad" but sophisticated analysis of its impact on society, work, and daily life.`,
      examples: [
        { sentence: 'Digital transformation has revolutionized the way businesses operate.', explanation: '"Revolutionized" shows dramatic change - stronger than "changed".' },
        { sentence: 'Automation threatens to displace workers in traditional industries.', explanation: '"Displace" means to force out of position - precise vocabulary for job loss.' },
        { sentence: 'The proliferation of smartphones has enhanced global connectivity.', explanation: '"Proliferation" means rapid spread; "connectivity" for being connected.' },
        { sentence: 'Artificial intelligence has the potential to streamline many processes.', explanation: '"Streamline" means to make more efficient.' },
        { sentence: 'Social media platforms have transformed interpersonal communication.', explanation: '"Interpersonal" relates to relationships between people.' },
        { sentence: 'The digital divide remains a significant barrier to equal opportunity.', explanation: '"Digital divide" is the gap between those with/without technology access.' },
        { sentence: 'Technological innovation drives economic growth and competitiveness.', explanation: '"Innovation" emphasizes newness and improvement.' },
        { sentence: 'Privacy concerns have emerged as a major drawback of digital services.', explanation: '"Privacy concerns" - a key phrase for discussing technology negatives.' },
        { sentence: 'The integration of technology in education has yielded mixed results.', explanation: '"Integration" means combining; "yielded" means produced.' },
        { sentence: 'Cybersecurity threats pose significant risks to organizations.', explanation: '"Cybersecurity" relates to protecting digital systems from attacks.' }
      ],
      commonMistakes: [
        { mistake: 'Technology makes our life easy.', correction: 'Technology facilitates/simplifies daily life.', explanation: '"Makes easy" is informal - use "facilitates" or "simplifies".' },
        { mistake: 'People are addicted to their phones.', correction: 'People have become increasingly dependent on their devices.', explanation: '"Addicted" is too strong/informal - "dependent" is more academic.' },
        { mistake: 'Technology is developing very fast.', correction: 'Technology is advancing/evolving rapidly.', explanation: '"Developing fast" is basic - use "advancing" or "evolving rapidly".' },
        { mistake: 'The internet changed everything.', correction: 'The internet has transformed virtually every aspect of modern life.', explanation: 'Be specific and use present perfect for ongoing relevance.' },
        { mistake: 'New technology is good for business.', correction: 'Technological innovation enhances business efficiency and competitiveness.', explanation: 'Avoid "good for" - explain HOW it benefits.' }
      ],
      miniPractice: [
        { question: 'The _____ of artificial intelligence could transform the healthcare industry.', type: 'fill-blank' },
        { question: 'Which word best describes the gap between those with and without technology access?', options: ['digital divide', 'technology gap', 'internet difference', 'tech separation'], type: 'multiple-choice' },
        { question: 'Rewrite: "Robots will take people\'s jobs."', type: 'rewrite' },
        { question: 'Social media has _____ the way people communicate globally.', type: 'fill-blank' },
        { question: 'Which collocation is most natural?', options: ['technological innovation', 'technology innovation', 'technologic innovation', 'technical innovation'], type: 'multiple-choice' }
      ],
      answerKey: [
        'integration / adoption / implementation',
        'digital divide',
        'Automation/Robotics threatens to displace workers in various industries.',
        'transformed / revolutionized',
        'technological innovation'
      ],
      quickRecap: 'Key terms: "digital transformation", "automation", "proliferation", "streamline", "digital divide", "cybersecurity". Remember: "facilitates" not "makes easy", "advancing rapidly" not "developing fast". Use these to discuss technology\'s impact sophisticatedly!',
      collocations: [
        'digital transformation', 'technological innovation', 'artificial intelligence',
        'digital divide', 'privacy concerns', 'cybersecurity threats', 'global connectivity'
      ],
      synonyms: [
        { word: 'change', synonyms: ['transform', 'revolutionize', 'reshape', 'alter'] },
        { word: 'fast', synonyms: ['rapidly', 'exponentially', 'at an unprecedented rate'] },
        { word: 'use', synonyms: ['utilize', 'employ', 'leverage', 'harness'] }
      ],
      speakingLines: [
        'Technology has undoubtedly transformed the way we live and work.',
        'While technology offers numerous benefits, we must also consider its drawbacks.',
        'I believe the digital divide remains a significant challenge in many developing countries.'
      ]
    }
  }
];

export const GRAMMAR_TOPICS = [
  'Conditionals',
  'Tenses',
  'Passive Voice',
  'Relative Clauses',
  'Articles',
  'Modals',
  'Reported Speech',
  'Comparatives & Superlatives',
  'Subject-Verb Agreement',
  'Gerunds & Infinitives'
];

export const VOCABULARY_TOPICS = [
  'Education',
  'Environment',
  'Technology',
  'Health',
  'Society',
  'Economy',
  'Culture',
  'Travel',
  'Work',
  'Media'
];
