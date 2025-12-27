import { Lesson } from '@/types';

export const NEW_GRAMMAR_LESSONS: Lesson[] = [
  {
    id: 'grammar-3',
    title: 'Passive Voice Mastery',
    slug: 'passive-voice-mastery',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Passive Voice',
    description: 'Learn when and how to use passive voice effectively in IELTS Writing and Speaking.',
    is_premium: true,
    is_published: true,
    view_count: 1650,
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-14T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Passive Voice Mastery',
      targetLevel: 'Band 6.0 - 7.5',
      whatYouWillLearn: [
        'Understand when passive voice is appropriate in academic writing',
        'Form passive structures correctly in all tenses',
        'Use passive voice to improve cohesion and formality'
      ],
      coreExplanation: `Passive voice is essential for IELTS Writing Task 1 (processes, maps) and Task 2 (formal academic style). It shifts focus from the doer to the action or result.

**Active:** The government implemented the policy.
**Passive:** The policy was implemented (by the government).

Use passive when:
- The doer is unknown, unimportant, or obvious
- You want to emphasize the action/result
- Writing formally about processes or scientific facts
- Describing graphs, charts, and trends

Overusing passive can make writing unclear, but strategic use demonstrates grammatical range.`,
      examples: [
        { sentence: 'The data was collected over a six-month period.', explanation: 'Passive for Task 1 - who collected it is not important.' },
        { sentence: 'Renewable energy sources are being adopted by many countries.', explanation: 'Present continuous passive for ongoing trends.' },
        { sentence: 'The policy had been criticized before it was implemented.', explanation: 'Past perfect passive for sequencing events.' },
        { sentence: 'It is widely believed that education improves social mobility.', explanation: 'Impersonal passive - very formal and academic.' },
        { sentence: 'The issue should be addressed immediately.', explanation: 'Modal passive for recommendations.' },
        { sentence: 'Steps must be taken to reduce carbon emissions.', explanation: 'Modal passive for necessity - common in Task 2.' },
        { sentence: 'The building will be completed by next year.', explanation: 'Future passive with time reference.' },
        { sentence: 'It has been suggested that remote work increases productivity.', explanation: 'Present perfect passive for reporting ideas.' },
        { sentence: 'The problem cannot be ignored any longer.', explanation: 'Negative modal passive for emphasis.' },
        { sentence: 'Measures are expected to be introduced in the coming months.', explanation: 'Passive infinitive after "expected".' }
      ],
      commonMistakes: [
        { mistake: 'The house was built by workers in 2020.', correction: 'The house was built in 2020.', explanation: 'Omit obvious or unimportant agents ("by workers").' },
        { mistake: 'The problem is solving by the government.', correction: 'The problem is being solved by the government.', explanation: 'Use "being + past participle" for continuous passive.' },
        { mistake: 'The data were analyzed and conclusions were drawn.', correction: 'The data was analyzed and conclusions were drawn.', explanation: '"Data" can be singular in modern English (though "were" is also acceptable).' },
        { mistake: 'It is believed by many people that...', correction: 'It is widely believed that...', explanation: 'Use adverbs (widely, generally, commonly) instead of "by many people".' },
        { mistake: 'The policy should be implement immediately.', correction: 'The policy should be implemented immediately.', explanation: 'Use past participle after modal + be.' }
      ],
      miniPractice: [
        { question: 'Rewrite in passive: "The government introduced new regulations last year."', type: 'rewrite' },
        { question: 'The issue _____ (discuss) at the next meeting.', type: 'fill-blank' },
        { question: 'Which is more appropriate for Task 1?', options: ['Researchers conducted the study in 2020.', 'The study was conducted in 2020.', 'They conducted the study in 2020.', 'Someone conducted the study in 2020.'], type: 'multiple-choice' },
        { question: 'Complete: "It _____ (suggest) that climate change poses significant risks."', type: 'fill-blank' },
        { question: 'Rewrite formally: "People widely accept that education is important."', type: 'rewrite' }
      ],
      answerKey: [
        'New regulations were introduced (by the government) last year.',
        'will be discussed',
        'The study was conducted in 2020.',
        'is suggested / has been suggested',
        'It is widely accepted that education is important.'
      ],
      quickRecap: 'Use passive to emphasize actions over doers, especially in Task 1 and formal Task 2. Form: be + past participle. Common in: processes, trends, recommendations, reporting ideas. Avoid overuse!',
      grammarForm: `**Simple:** am/is/are/was/were + past participle
**Continuous:** am/is/are/was/were + being + past participle
**Perfect:** have/has/had + been + past participle
**Modal:** modal + be + past participle
**Infinitive:** to be + past participle`,
      grammarUse: `**When to use:**
- Describing processes and procedures
- Reporting research and data
- Making recommendations (should be done)
- Formal academic writing
- When the agent is unknown or unimportant

**When to avoid:**
- When the doer is important
- In personal narratives
- When it makes sentences unclear`,
      sentenceUpgrade: [
        { basic: 'People use smartphones everywhere.', upgraded: 'Smartphones are used extensively across all demographics.' },
        { basic: 'The government should solve this problem.', upgraded: 'This issue should be addressed through comprehensive policy reform.' },
        { basic: 'Many experts think that technology helps education.', upgraded: 'It is widely acknowledged that technology enhances educational outcomes.' }
      ]
    }
  },
  {
    id: 'grammar-4',
    title: 'Relative Clauses for Complex Sentences',
    slug: 'relative-clauses-complex-sentences',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Relative Clauses',
    description: 'Master defining and non-defining relative clauses to create sophisticated sentences.',
    is_premium: true,
    is_published: true,
    view_count: 1420,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z',
    estimated_time: 22,
    content: {
      title: 'Relative Clauses for Complex Sentences',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Distinguish between defining and non-defining relative clauses',
        'Use relative pronouns correctly (who, which, that, whose, where)',
        'Create complex sentences that demonstrate grammatical range'
      ],
      coreExplanation: `Relative clauses add information about nouns and create complex sentences - essential for Band 7+.

**Defining clauses** (no commas): identify which person/thing we mean
- "Students who study regularly achieve better results."

**Non-defining clauses** (with commas): add extra information
- "Online learning, which has become increasingly popular, offers flexibility."

Key differences:
- Defining: essential information, no commas, can use "that"
- Non-defining: extra information, commas required, cannot use "that"`,
      examples: [
        { sentence: 'People who live in urban areas have better access to healthcare.', explanation: 'Defining clause - specifies which people.' },
        { sentence: 'The internet, which was invented in the 20th century, has transformed communication.', explanation: 'Non-defining clause - adds extra information about the internet.' },
        { sentence: 'Countries that invest in education tend to have stronger economies.', explanation: 'Defining clause with "that" - identifies which countries.' },
        { sentence: 'The policy, which was introduced last year, has been controversial.', explanation: 'Non-defining clause - the policy is already identified.' },
        { sentence: 'Students whose parents are involved in their education perform better.', explanation: '"Whose" shows possession - defining clause.' },
        { sentence: 'The city where I grew up has changed dramatically.', explanation: '"Where" for places - defining clause.' },
        { sentence: 'Technology, which many consider essential, can also be problematic.', explanation: 'Non-defining clause with embedded opinion.' },
        { sentence: 'The reasons why people migrate are complex and varied.', explanation: '"Why" for reasons - defining clause.' },
        { sentence: 'Renewable energy, which is becoming more affordable, offers a sustainable solution.', explanation: 'Non-defining clause with present continuous.' },
        { sentence: 'Those who fail to adapt will struggle in the modern economy.', explanation: 'Defining clause with "those" - very formal.' }
      ],
      commonMistakes: [
        { mistake: 'The internet, that has changed our lives, is essential.', correction: 'The internet, which has changed our lives, is essential.', explanation: 'Cannot use "that" in non-defining clauses.' },
        { mistake: 'People which live in cities face pollution.', correction: 'People who live in cities face pollution.', explanation: 'Use "who" for people, not "which".' },
        { mistake: 'The policy which was introduced last year, has failed.', correction: 'The policy which was introduced last year has failed.', explanation: 'Defining clauses don\'t use commas.' },
        { mistake: 'Students, who study hard, succeed.', correction: 'Students who study hard succeed.', explanation: 'This is defining (which students?) - no commas.' },
        { mistake: 'The city, where I live, is polluted.', correction: 'The city where I live is polluted.', explanation: 'Defining clause - no commas needed.' }
      ],
      miniPractice: [
        { question: 'Combine: "The government introduced a policy. The policy was controversial." (non-defining)', type: 'rewrite' },
        { question: 'People _____ work from home report higher satisfaction.', options: ['who', 'which', ', who', ', which'], type: 'multiple-choice' },
        { question: 'Add commas if needed: "Technology which is advancing rapidly creates new opportunities."', type: 'rewrite' },
        { question: 'Complete: "The reasons _____ people choose online education are varied."', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['Students, that study hard, succeed.', 'Students who study hard succeed.', 'Students, who study hard succeed.', 'Students which study hard succeed.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'The government introduced a policy, which was controversial.',
        'who',
        'Technology, which is advancing rapidly, creates new opportunities.',
        'why',
        'Students who study hard succeed.'
      ],
      quickRecap: 'Defining clauses (no commas) identify which one. Non-defining clauses (commas) add extra info. Use who/that for people, which/that for things, whose for possession, where for places. Never use "that" in non-defining clauses!',
      grammarForm: `**Relative pronouns:**
- who/that (people)
- which/that (things)
- whose (possession)
- where (places)
- when (time)
- why (reason)

**Defining:** no commas, can use "that"
**Non-defining:** commas required, cannot use "that"`,
      grammarUse: `**Defining clauses:**
- Essential information
- Identifies which person/thing
- No commas
- Common in arguments and explanations

**Non-defining clauses:**
- Extra information
- Could be removed
- Commas required
- Adds sophistication to writing`,
      sentenceUpgrade: [
        { basic: 'Technology is important. It helps education.', upgraded: 'Technology, which has revolutionized numerous sectors, plays a crucial role in modern education.' },
        { basic: 'People live in cities. They face pollution.', upgraded: 'Individuals who reside in urban areas are frequently exposed to higher levels of pollution.' },
        { basic: 'The policy was introduced. It failed.', upgraded: 'The policy, which was introduced with considerable optimism, ultimately failed to achieve its objectives.' }
      ]
    }
  },
  {
    id: 'grammar-5',
    title: 'Articles: A, An, The, and Zero Article',
    slug: 'articles-a-an-the-zero',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Articles',
    description: 'Master the complex rules of English articles to avoid common errors.',
    is_premium: false,
    is_published: true,
    view_count: 2200,
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
    estimated_time: 20,
    content: {
      title: 'Articles: A, An, The, and Zero Article',
      targetLevel: 'Band 6.0 - 7.5',
      whatYouWillLearn: [
        'Understand when to use a/an, the, or no article',
        'Avoid common article errors that lower band scores',
        'Apply article rules correctly in IELTS Writing'
      ],
      coreExplanation: `Articles are one of the most challenging aspects of English grammar. Even advanced learners make mistakes that can lower their band score.

**A/An** (indefinite): first mention, one of many, general
**The** (definite): specific, already mentioned, unique
**Zero article**: plural/uncountable general statements, proper nouns

Key principle: Ask yourself - is this specific (the) or general (a/an/zero)?

Mastering articles demonstrates attention to detail and grammatical accuracy.`,
      examples: [
        { sentence: 'Education is essential for social development.', explanation: 'Zero article for uncountable noun in general statement.' },
        { sentence: 'The education system in Finland is highly regarded.', explanation: '"The" for specific system.' },
        { sentence: 'A university degree can improve career prospects.', explanation: '"A" for one of many degrees - general.' },
        { sentence: 'The government should invest in renewable energy.', explanation: '"The" for specific government (context makes it clear).' },
        { sentence: 'Technology has transformed the way we communicate.', explanation: 'Zero article for technology in general; "the way" is specific.' },
        { sentence: 'The internet has revolutionized information access.', explanation: '"The" for unique things (only one internet).' },
        { sentence: 'Children need a balanced diet for healthy development.', explanation: '"A" for one type of diet; zero article for "children" in general.' },
        { sentence: 'The environment is facing unprecedented challenges.', explanation: '"The" for unique environment (Earth\'s environment).' },
        { sentence: 'Research shows that exercise improves mental health.', explanation: 'Zero article for uncountable nouns in general statements.' },
        { sentence: 'An effective solution requires cooperation between nations.', explanation: '"An" for one of many possible solutions.' }
      ],
      commonMistakes: [
        { mistake: 'The education is important.', correction: 'Education is important.', explanation: 'No article for uncountable nouns in general statements.' },
        { mistake: 'Government should take action.', correction: 'The government should take action.', explanation: 'Use "the" for specific government (usually clear from context).' },
        { mistake: 'The technology has changed our lives.', correction: 'Technology has changed our lives.', explanation: 'No article for technology in general.' },
        { mistake: 'Internet is essential nowadays.', correction: 'The internet is essential nowadays.', explanation: 'Use "the" for unique inventions/systems.' },
        { mistake: 'A people need clean water.', correction: 'People need clean water.', explanation: 'No article for plural nouns in general statements.' }
      ],
      miniPractice: [
        { question: '_____ climate change is _____ serious threat to _____ future generations.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['The education is essential.', 'Education is essential.', 'An education is essential.', 'A education is essential.'], type: 'multiple-choice' },
        { question: 'Complete: "_____ government should invest in _____ renewable energy."', type: 'fill-blank' },
        { question: 'Add articles where needed: "Technology has transformed way we work."', type: 'rewrite' },
        { question: 'Which is correct?', options: ['The internet is useful tool.', 'Internet is useful tool.', 'The internet is a useful tool.', 'Internet is a useful tool.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Climate change is a serious threat to future generations. (zero, a, zero)',
        'Education is essential.',
        'The government should invest in renewable energy. (the, zero)',
        'Technology has transformed the way we work.',
        'The internet is a useful tool.'
      ],
      quickRecap: 'Use a/an for first mention or one of many. Use "the" for specific or unique things. Use zero article for general plural/uncountable nouns. Common errors: adding "the" to general statements, omitting "the" before government/internet/environment.',
      grammarForm: `**A/An:**
- Singular countable nouns (first mention)
- One of many
- Jobs, nationalities

**The:**
- Second mention
- Unique things (the sun, the internet)
- Specific (the government, the environment)
- Superlatives (the best)

**Zero article:**
- Plural/uncountable general statements
- Most proper nouns
- Meals, sports, academic subjects`,
      grammarUse: `**Common patterns:**
- The government/environment/internet/economy
- Zero article: education/technology/society/health (general)
- A/an: a solution/an issue/a challenge
- The: the solution (specific)

**IELTS-specific:**
- Task 1: "The graph shows..." (specific graph)
- Task 2: "Education is important" (general)`,
      sentenceUpgrade: [
        { basic: 'Technology is important for education.', upgraded: 'Technology plays a crucial role in modern education, particularly in the context of distance learning.' },
        { basic: 'Government should help poor people.', upgraded: 'The government should provide assistance to those living in poverty.' },
        { basic: 'Environment is facing problems.', upgraded: 'The environment is confronting unprecedented challenges that require immediate action.' }
      ]
    }
  },
  {
    id: 'grammar-6',
    title: 'Modal Verbs for Academic Writing',
    slug: 'modal-verbs-academic-writing',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Modals',
    description: 'Use modal verbs to express possibility, necessity, and recommendations in IELTS Writing.',
    is_premium: true,
    is_published: true,
    view_count: 1580,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
    estimated_time: 23,
    content: {
      title: 'Modal Verbs for Academic Writing',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Use modals to express different degrees of certainty',
        'Make recommendations and suggestions appropriately',
        'Demonstrate nuanced language in Task 2 essays'
      ],
      coreExplanation: `Modal verbs (can, could, may, might, must, should, would) are essential for expressing:
- Possibility and probability
- Necessity and obligation
- Recommendations and suggestions
- Hypothetical situations

Using a range of modals demonstrates grammatical sophistication and allows you to express ideas with appropriate certainty.

**Certainty scale:**
- Must/will (very certain)
- Should/ought to (probable)
- May/might/could (possible)
- Can't (impossible)

Strategic use of modals shows critical thinking and balanced argumentation.`,
      examples: [
        { sentence: 'Governments should invest more in renewable energy.', explanation: '"Should" for recommendations - most common in Task 2.' },
        { sentence: 'This approach could lead to significant improvements.', explanation: '"Could" for possibility - shows cautious language.' },
        { sentence: 'The policy may have unintended consequences.', explanation: '"May" for possibility - acknowledges uncertainty.' },
        { sentence: 'Citizens must take responsibility for environmental protection.', explanation: '"Must" for strong necessity/obligation.' },
        { sentence: 'Technology might not be the complete solution.', explanation: '"Might not" for possibility of negative outcome.' },
        { sentence: 'The government ought to prioritize education funding.', explanation: '"Ought to" - formal alternative to "should".' },
        { sentence: 'This measure would reduce carbon emissions significantly.', explanation: '"Would" for hypothetical results.' },
        { sentence: 'The data suggests that the trend will continue.', explanation: '"Will" for strong prediction based on evidence.' },
        { sentence: 'Individuals cannot solve this problem alone.', explanation: '"Cannot" for impossibility - strong statement.' },
        { sentence: 'Authorities should have acted sooner.', explanation: '"Should have" for past criticism/regret.' }
      ],
      commonMistakes: [
        { mistake: 'The government must to take action.', correction: 'The government must take action.', explanation: 'Don\'t use "to" after modals.' },
        { mistake: 'People should to recycle more.', correction: 'People should recycle more.', explanation: 'Modal + base verb (no "to").' },
        { mistake: 'This can leads to problems.', correction: 'This can lead to problems.', explanation: 'Modal + base verb (no -s).' },
        { mistake: 'The policy maybe effective.', correction: 'The policy may be effective.', explanation: '"May be" (two words) not "maybe".' },
        { mistake: 'We must to consider all options.', correction: 'We must consider all options.', explanation: 'No "to" after modal verbs.' }
      ],
      miniPractice: [
        { question: 'Governments _____ (should/must) invest in public transportation.', type: 'fill-blank' },
        { question: 'Which shows appropriate certainty?', options: ['This will definitely solve all problems.', 'This could potentially address some issues.', 'This must solve everything.', 'This can solves problems.'], type: 'multiple-choice' },
        { question: 'Rewrite with a modal: "It is necessary for individuals to reduce consumption."', type: 'rewrite' },
        { question: 'The policy _____ (may/must) have negative effects.', type: 'fill-blank' },
        { question: 'Which is grammatically correct?', options: ['People should to recycle.', 'People should recycle.', 'People should recycling.', 'People should recycled.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'should (recommendation) or must (strong necessity)',
        'This could potentially address some issues.',
        'Individuals must/should reduce consumption.',
        'may (possibility) or might (less certain)',
        'People should recycle.'
      ],
      quickRecap: 'Modals express certainty, possibility, necessity, and recommendations. Form: modal + base verb (no "to", no -s). Use "should" for recommendations, "could/may/might" for possibility, "must" for necessity. Vary your modals for Band 7+!',
      grammarForm: `**Structure:** modal + base verb

**Common modals:**
- can/could (ability, possibility)
- may/might (possibility)
- must (necessity, strong certainty)
- should/ought to (recommendation, probability)
- will/would (future, hypothetical)

**Past modals:** modal + have + past participle
- should have, could have, might have`,
      grammarUse: `**Task 2 functions:**
- Recommendations: should, ought to, must
- Possibility: may, might, could
- Certainty: must, will, cannot
- Hypothetical: would, could

**Certainty levels:**
- High: must, will, cannot
- Medium: should, ought to
- Low: may, might, could`,
      sentenceUpgrade: [
        { basic: 'The government needs to act.', upgraded: 'The government should implement comprehensive measures to address this issue.' },
        { basic: 'This will cause problems.', upgraded: 'This approach could potentially lead to unforeseen complications.' },
        { basic: 'People need to change.', upgraded: 'Individuals must fundamentally alter their consumption patterns if meaningful progress is to be achieved.' }
      ]
    }
  },
  {
    id: 'grammar-7',
    title: 'Reported Speech for Academic Writing',
    slug: 'reported-speech-academic-writing',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Reported Speech',
    description: 'Master reported speech to cite sources and report ideas in IELTS Writing.',
    is_premium: true,
    is_published: true,
    view_count: 1320,
    created_at: '2024-01-22T10:00:00Z',
    updated_at: '2024-01-22T10:00:00Z',
    estimated_time: 24,
    content: {
      title: 'Reported Speech for Academic Writing',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Transform direct speech into reported speech correctly',
        'Use reporting verbs to cite ideas and opinions',
        'Apply backshift rules and time/place changes'
      ],
      coreExplanation: `Reported speech (indirect speech) is essential for:
- Citing experts and research
- Reporting opinions and claims
- Paraphrasing ideas in Task 2

**Basic transformation:**
Direct: "I will implement the policy," the minister said.
Reported: The minister said (that) he would implement the policy.

**Key changes:**
- Tense backshift (will → would, can → could)
- Pronoun changes (I → he/she)
- Time/place changes (now → then, here → there)

Using varied reporting verbs (claim, suggest, argue, maintain) demonstrates lexical range.`,
      examples: [
        { sentence: 'Experts claim that climate change poses an existential threat.', explanation: 'Reporting verb "claim" + that-clause.' },
        { sentence: 'Research suggests that exercise improves mental health.', explanation: 'Impersonal reporting - very academic.' },
        { sentence: 'The minister stated that the government would introduce reforms.', explanation: 'Tense backshift: will → would.' },
        { sentence: 'Critics argue that the policy has been ineffective.', explanation: 'Reporting verb "argue" for opposing views.' },
        { sentence: 'It is widely believed that education reduces inequality.', explanation: 'Impersonal passive reporting - very formal.' },
        { sentence: 'Economists maintain that free trade benefits all nations.', explanation: '"Maintain" for strongly held positions.' },
        { sentence: 'Studies have shown that technology enhances learning outcomes.', explanation: 'Present perfect for recent research.' },
        { sentence: 'The report indicated that poverty levels had decreased.', explanation: 'Past perfect for earlier past event.' },
        { sentence: 'Analysts predict that renewable energy will dominate by 2050.', explanation: 'Future reporting - no backshift needed.' },
        { sentence: 'It has been suggested that remote work increases productivity.', explanation: 'Passive reporting for general claims.' }
      ],
      commonMistakes: [
        { mistake: 'He said that he will come tomorrow.', correction: 'He said that he would come the next day.', explanation: 'Backshift "will" to "would" and "tomorrow" to "the next day".' },
        { mistake: 'The expert claimed that technology is important.', correction: 'The expert claimed that technology was important.', explanation: 'Backshift present to past (unless still true now).' },
        { mistake: 'She told that she was tired.', correction: 'She said that she was tired.', explanation: '"Tell" needs an object: "told me that..." Use "said that".' },
        { mistake: 'Research shows that exercise improve health.', correction: 'Research shows that exercise improves health.', explanation: 'Subject-verb agreement in reported clause.' },
        { mistake: 'He asked me where was I going.', correction: 'He asked me where I was going.', explanation: 'Use statement word order in reported questions.' }
      ],
      miniPractice: [
        { question: 'Report: "The policy will reduce emissions," the minister said.', type: 'rewrite' },
        { question: 'Experts _____ (claim/claims) that education improves social mobility.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['He said he will come.', 'He said he would come.', 'He said he comes.', 'He said he come.'], type: 'multiple-choice' },
        { question: 'Report: "Where do you live?" she asked me.', type: 'rewrite' },
        { question: 'Complete: "It _____ (believe) that technology enhances learning."', type: 'fill-blank' }
      ],
      answerKey: [
        'The minister said (that) the policy would reduce emissions.',
        'claim',
        'He said he would come.',
        'She asked me where I lived.',
        'is believed'
      ],
      quickRecap: 'Reported speech: backshift tenses (will→would, can→could), change pronouns and time words. Use reporting verbs: claim, suggest, argue, maintain. Impersonal reporting (It is believed that...) is very formal. "Say that" vs "tell someone that".',
      grammarForm: `**Tense backshift:**
- present → past
- will → would
- can → could
- may → might
- past → past perfect

**Time/place changes:**
- now → then
- today → that day
- tomorrow → the next day
- here → there

**Reporting verbs:**
- say, tell, claim, argue, suggest, maintain, state, indicate, predict`,
      grammarUse: `**Academic reporting:**
- Research shows/suggests/indicates that...
- Experts claim/argue/maintain that...
- It is believed/thought/suggested that...
- Studies have shown/demonstrated that...

**Questions:**
- He asked (me) if/whether...
- She wanted to know where/when/why...

**Commands:**
- He told me to...
- She advised me to...`,
      sentenceUpgrade: [
        { basic: 'People say technology is important.', upgraded: 'It is widely acknowledged that technology plays a crucial role in modern society.' },
        { basic: 'The expert said education helps.', upgraded: 'The expert maintained that education significantly enhances social mobility and economic prospects.' },
        { basic: 'Research shows this works.', upgraded: 'Recent studies have demonstrated that this approach yields substantial improvements in outcomes.' }
      ]
    }
  },
  {
    id: 'grammar-8',
    title: 'Comparatives and Superlatives',
    slug: 'comparatives-superlatives',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Comparatives & Superlatives',
    description: 'Master comparison structures for describing trends and making arguments.',
    is_premium: true,
    is_published: true,
    view_count: 1750,
    created_at: '2024-01-24T10:00:00Z',
    updated_at: '2024-01-24T10:00:00Z',
    estimated_time: 21,
    content: {
      title: 'Comparatives and Superlatives',
      targetLevel: 'Band 6.0 - 7.5',
      whatYouWillLearn: [
        'Form and use comparative and superlative structures correctly',
        'Use advanced comparison patterns for Band 7+',
        'Describe trends and make comparisons in Task 1 and Task 2'
      ],
      coreExplanation: `Comparatives and superlatives are essential for:
- Task 1: comparing data, describing trends
- Task 2: making arguments, weighing options

**Basic forms:**
- Short adjectives: -er/-est (bigger, biggest)
- Long adjectives: more/most (more important, most significant)
- Irregular: better/best, worse/worst, more/most, less/least

**Advanced patterns:**
- The more..., the more... (correlation)
- As...as (equality)
- Not as...as (inequality)
- Far/much/significantly + comparative (emphasis)

Using varied comparison structures demonstrates grammatical range.`,
      examples: [
        { sentence: 'Urban areas are more densely populated than rural regions.', explanation: 'Basic comparative with "than".' },
        { sentence: 'Education is one of the most important factors in social development.', explanation: 'Superlative with "one of the".' },
        { sentence: 'The more technology advances, the more dependent we become.', explanation: 'The...the pattern shows correlation.' },
        { sentence: 'Online learning is not as effective as traditional classroom instruction.', explanation: '"Not as...as" for inequality comparison.' },
        { sentence: 'Renewable energy is becoming increasingly affordable.', explanation: 'Increasingly + adjective for gradual change.' },
        { sentence: 'The situation is far worse than previously anticipated.', explanation: '"Far" emphasizes the degree of comparison.' },
        { sentence: 'This approach is significantly more cost-effective than alternatives.', explanation: 'Adverb + comparative for emphasis.' },
        { sentence: 'The less we consume, the better for the environment.', explanation: 'The less...the better pattern.' },
        { sentence: 'Technology is advancing at an ever-faster rate.', explanation: 'Ever + comparative for continuous increase.' },
        { sentence: 'This is by far the most pressing issue facing society.', explanation: '"By far" emphasizes superlative.' }
      ],
      commonMistakes: [
        { mistake: 'Technology is more better than before.', correction: 'Technology is better than before.', explanation: 'Don\'t use "more" with irregular comparatives.' },
        { mistake: 'This is the most best solution.', correction: 'This is the best solution.', explanation: 'Don\'t use "most" with irregular superlatives.' },
        { mistake: 'Education is more important than health.', correction: 'Education is more important than health.', explanation: 'Use "than" (not "that" or "then") after comparatives.' },
        { mistake: 'The situation is getting more worse.', correction: 'The situation is getting worse.', explanation: '"Worse" is already comparative - don\'t add "more".' },
        { mistake: 'This is one of the most important factor.', correction: 'This is one of the most important factors.', explanation: 'Use plural after "one of the most".' }
      ],
      miniPractice: [
        { question: 'Complete: "The _____ (high) the education level, the _____ (good) the employment prospects."', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['This is more better.', 'This is better.', 'This is more good.', 'This is gooder.'], type: 'multiple-choice' },
        { question: 'Rewrite: "Technology is important. Education is important too." (use as...as)', type: 'rewrite' },
        { question: 'Complete: "Renewable energy is becoming _____ (affordable)."', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['One of the most important factor', 'One of the most important factors', 'One of the more important factor', 'One of most important factors'], type: 'multiple-choice' }
      ],
      answerKey: [
        'The higher the education level, the better the employment prospects.',
        'This is better.',
        'Technology is as important as education. / Education is as important as technology.',
        'increasingly affordable / more affordable',
        'One of the most important factors'
      ],
      quickRecap: 'Short adjectives: -er/-est. Long adjectives: more/most. Irregular: better/best, worse/worst. Advanced: the more...the more, as...as, not as...as. Emphasize with far/much/significantly. Remember: "one of the most + plural"!',
      grammarForm: `**Comparatives:**
- Short: adjective + -er + than
- Long: more + adjective + than
- Irregular: better, worse, more, less

**Superlatives:**
- Short: the + adjective + -est
- Long: the most + adjective
- Irregular: the best, the worst

**Patterns:**
- The more..., the more...
- As...as / not as...as
- Much/far/significantly + comparative`,
      grammarUse: `**Task 1 uses:**
- Comparing data points
- Describing trends
- Highlighting extremes

**Task 2 uses:**
- Weighing options
- Making arguments
- Showing relationships

**Emphasis:**
- far/much/significantly more
- by far the most
- increasingly/progressively more`,
      sentenceUpgrade: [
        { basic: 'Technology is good. Education is good too.', upgraded: 'While technology is important, education is arguably even more crucial for long-term development.' },
        { basic: 'This problem is big.', upgraded: 'This represents one of the most significant challenges confronting modern society.' },
        { basic: 'Things are getting bad.', upgraded: 'The situation is deteriorating at an increasingly alarming rate.' }
      ]
    }
  },
  {
    id: 'grammar-9',
    title: 'Subject-Verb Agreement',
    slug: 'subject-verb-agreement',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Subject-Verb Agreement',
    description: 'Avoid common agreement errors that can lower your band score.',
    is_premium: false,
    is_published: true,
    view_count: 1920,
    created_at: '2024-01-26T10:00:00Z',
    updated_at: '2024-01-26T10:00:00Z',
    estimated_time: 19,
    content: {
      title: 'Subject-Verb Agreement',
      targetLevel: 'Band 6.0 - 7.0',
      whatYouWillLearn: [
        'Identify the true subject in complex sentences',
        'Apply agreement rules with tricky subjects',
        'Avoid common agreement errors in IELTS Writing'
      ],
      coreExplanation: `Subject-verb agreement errors are common and can significantly lower your band score. The basic rule is simple: singular subjects take singular verbs, plural subjects take plural verbs.

**Challenges:**
- Subjects separated from verbs
- Collective nouns
- Indefinite pronouns (everyone, each, etc.)
- There is/are constructions
- Subjects with "of" phrases

**Key principle:** Identify the TRUE subject (ignore prepositional phrases and other modifiers).

Example: "The impact of these policies IS significant."
(Subject is "impact" - singular, not "policies")`,
      examples: [
        { sentence: 'The number of students has increased significantly.', explanation: '"The number" is singular (not "students").' },
        { sentence: 'A number of students have expressed concerns.', explanation: '"A number of" is treated as plural.' },
        { sentence: 'Each of the proposals has merit.', explanation: '"Each" is always singular.' },
        { sentence: 'The government, along with several NGOs, is addressing the issue.', explanation: 'Subject is "government" - ignore "along with" phrase.' },
        { sentence: 'There are several factors that contribute to this problem.', explanation: '"There are" agrees with "factors" (plural).' },
        { sentence: 'Everyone in the affected areas needs assistance.', explanation: '"Everyone" is singular.' },
        { sentence: 'The data shows a clear trend.', explanation: '"Data" can be singular in modern English.' },
        { sentence: 'Neither the government nor the opposition has a solution.', explanation: 'Verb agrees with nearest subject ("opposition").' },
        { sentence: 'The majority of citizens support the policy.', explanation: '"Majority of" takes plural when referring to people.' },
        { sentence: 'One of the most important factors is education.', explanation: 'Subject is "one" (singular), not "factors".' }
      ],
      commonMistakes: [
        { mistake: 'The number of problems are increasing.', correction: 'The number of problems is increasing.', explanation: '"The number" is singular.' },
        { mistake: 'Each of the students have a laptop.', correction: 'Each of the students has a laptop.', explanation: '"Each" is always singular.' },
        { mistake: 'There is many reasons for this.', correction: 'There are many reasons for this.', explanation: 'Verb agrees with "reasons" (plural).' },
        { mistake: 'The government, as well as citizens, are responsible.', correction: 'The government, as well as citizens, is responsible.', explanation: 'Subject is "government" - ignore "as well as" phrase.' },
        { mistake: 'Everyone have their own opinion.', correction: 'Everyone has their own opinion.', explanation: '"Everyone" is singular (though "their" is acceptable).' }
      ],
      miniPractice: [
        { question: 'The impact of these policies _____ (is/are) significant.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['Each of the solutions have merit.', 'Each of the solutions has merit.', 'Each of the solution has merit.', 'Each of the solution have merit.'], type: 'multiple-choice' },
        { question: 'Complete: "There _____ (is/are) several factors to consider."', type: 'fill-blank' },
        { question: 'The number of participants _____ (has/have) doubled.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['Everyone are concerned.', 'Everyone is concerned.', 'Everyone were concerned.', 'Everyone be concerned.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'is',
        'Each of the solutions has merit.',
        'are',
        'has',
        'Everyone is concerned.'
      ],
      quickRecap: 'Find the TRUE subject - ignore prepositional phrases. "The number" = singular, "a number of" = plural. "Each/everyone/everybody" = singular. "There is/are" agrees with what follows. Neither...nor: verb agrees with nearest subject.',
      grammarForm: `**Basic rule:** Singular subject + singular verb, Plural subject + plural verb

**Tricky patterns:**
- The number of + plural noun + singular verb
- A number of + plural noun + plural verb
- Each/every/everyone/everybody + singular verb
- Neither...nor: verb agrees with nearest subject
- Subject + prepositional phrase: ignore the phrase`,
      grammarUse: `**Common IELTS patterns:**
- The number of X has/is...
- There is/are...
- Each of the X has...
- One of the most important X is...
- The majority of X (singular/plural depending on context)

**Collective nouns:**
- government, committee, team (usually singular in formal writing)
- people, police (always plural)`,
      sentenceUpgrade: [
        { basic: 'Many problems exist.', upgraded: 'A multitude of complex challenges confronts modern society.' },
        { basic: 'The government and citizens are responsible.', upgraded: 'The government, in conjunction with individual citizens, bears responsibility for addressing this issue.' },
        { basic: 'Each person has a role.', upgraded: 'Each individual, regardless of their circumstances, has a crucial role to play in effecting change.' }
      ]
    }
  },
  {
    id: 'grammar-10',
    title: 'Gerunds and Infinitives',
    slug: 'gerunds-infinitives',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Gerunds & Infinitives',
    description: 'Master when to use -ing forms vs to-infinitives after verbs.',
    is_premium: true,
    is_published: true,
    view_count: 1450,
    created_at: '2024-01-28T10:00:00Z',
    updated_at: '2024-01-28T10:00:00Z',
    estimated_time: 22,
    content: {
      title: 'Gerunds and Infinitives',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Know which verbs take gerunds, infinitives, or both',
        'Use gerunds and infinitives correctly in different contexts',
        'Avoid common errors that lower band scores'
      ],
      coreExplanation: `Choosing between gerunds (-ing) and infinitives (to + verb) is challenging because there's no single rule. You must learn patterns.

**Gerund only:** enjoy, avoid, consider, suggest, finish, mind
- "I enjoy reading." (NOT "to read")

**Infinitive only:** want, decide, plan, hope, agree, refuse
- "I want to study." (NOT "studying")

**Both (same meaning):** like, love, hate, prefer, begin, start
- "I like reading/to read."

**Both (different meaning):** stop, remember, forget, try
- "I stopped smoking." (quit)
- "I stopped to smoke." (paused in order to smoke)

Mastering these patterns demonstrates grammatical accuracy.`,
      examples: [
        { sentence: 'The government should consider implementing stricter regulations.', explanation: '"Consider" + gerund.' },
        { sentence: 'Many people have decided to adopt more sustainable lifestyles.', explanation: '"Decide" + infinitive.' },
        { sentence: 'Experts suggest investing in renewable energy infrastructure.', explanation: '"Suggest" + gerund (NOT "to invest").' },
        { sentence: 'Citizens need to take responsibility for environmental protection.', explanation: '"Need" + infinitive.' },
        { sentence: 'Authorities must avoid making hasty decisions.', explanation: '"Avoid" + gerund.' },
        { sentence: 'The policy aims to reduce carbon emissions by 50%.', explanation: '"Aim" + infinitive.' },
        { sentence: 'Researchers recommend conducting further studies.', explanation: '"Recommend" + gerund.' },
        { sentence: 'I stopped eating meat to reduce my carbon footprint.', explanation: '"Stop" + gerund = quit; infinitive = purpose.' },
        { sentence: 'Remember to submit your application before the deadline.', explanation: '"Remember" + infinitive = don\'t forget to do.' },
        { sentence: 'I remember visiting that museum as a child.', explanation: '"Remember" + gerund = recall doing.' }
      ],
      commonMistakes: [
        { mistake: 'I enjoy to read books.', correction: 'I enjoy reading books.', explanation: '"Enjoy" takes gerund, not infinitive.' },
        { mistake: 'I want studying abroad.', correction: 'I want to study abroad.', explanation: '"Want" takes infinitive, not gerund.' },
        { mistake: 'I suggest to implement this policy.', correction: 'I suggest implementing this policy.', explanation: '"Suggest" takes gerund, not infinitive.' },
        { mistake: 'I avoid to make mistakes.', correction: 'I avoid making mistakes.', explanation: '"Avoid" takes gerund, not infinitive.' },
        { mistake: 'I decided studying medicine.', correction: 'I decided to study medicine.', explanation: '"Decide" takes infinitive, not gerund.' }
      ],
      miniPractice: [
        { question: 'The government should consider _____ (implement) stricter regulations.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['I want studying.', 'I want to study.', 'I want study.', 'I wanting to study.'], type: 'multiple-choice' },
        { question: 'Complete: "Experts suggest _____ (invest) in education."', type: 'fill-blank' },
        { question: 'I stopped _____ (smoke) five years ago. (quit smoking)', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['I enjoy to travel.', 'I enjoy traveling.', 'I enjoy travel.', 'I enjoying to travel.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'implementing',
        'I want to study.',
        'investing',
        'smoking',
        'I enjoy traveling.'
      ],
      quickRecap: 'Gerund only: enjoy, avoid, consider, suggest, finish. Infinitive only: want, decide, plan, hope, agree. Both (same): like, love, hate, prefer. Both (different): stop, remember, forget, try. Learn the patterns!',
      grammarForm: `**Gerund (-ing):**
- After certain verbs: enjoy, avoid, consider, suggest, finish, mind, practice, risk
- After prepositions: interested in, good at, responsible for
- As subject: "Smoking is harmful."

**Infinitive (to + verb):**
- After certain verbs: want, decide, plan, hope, agree, refuse, promise, manage
- After adjectives: happy to, difficult to, important to
- To express purpose: "I study to improve."

**Both:** like, love, hate, prefer, begin, start, continue`,
      grammarUse: `**IELTS-specific patterns:**
- Suggest/recommend + gerund
- Consider + gerund
- Want/need/plan/decide + infinitive
- Avoid/finish + gerund
- Aim/tend/fail + infinitive

**Meaning changes:**
- stop + gerund (quit)
- stop + infinitive (pause to do)
- remember + gerund (recall)
- remember + infinitive (don't forget)
- try + gerund (experiment)
- try + infinitive (attempt)`,
      sentenceUpgrade: [
        { basic: 'People should think about using less energy.', upgraded: 'Individuals should seriously consider reducing their energy consumption through sustainable practices.' },
        { basic: 'The government wants to help the environment.', upgraded: 'The government aims to implement comprehensive environmental protection measures.' },
        { basic: 'We must not make the same mistakes.', upgraded: 'Authorities must avoid repeating the errors that characterized previous policy initiatives.' }
      ]
    }
  },
  {
    id: 'grammar-11',
    title: 'Noun Clauses for Complex Ideas',
    slug: 'noun-clauses-complex-ideas',
    type: 'grammar',
    level: 'advanced',
    topic: 'Noun Clauses',
    description: 'Use noun clauses to express complex ideas and opinions in IELTS Writing.',
    is_premium: true,
    is_published: true,
    view_count: 1180,
    created_at: '2024-01-30T10:00:00Z',
    updated_at: '2024-01-30T10:00:00Z',
    estimated_time: 24,
    content: {
      title: 'Noun Clauses for Complex Ideas',
      targetLevel: 'Band 7.0 - 8.0',
      whatYouWillLearn: [
        'Form and use that-clauses, wh-clauses, and if/whether clauses',
        'Express opinions and report ideas using noun clauses',
        'Create sophisticated sentences for Band 7+ writing'
      ],
      coreExplanation: `Noun clauses function as nouns in sentences and are essential for expressing complex ideas in academic writing.

**Types of noun clauses:**
- That-clauses: "I believe that education is essential."
- Wh-clauses: "What concerns me is the lack of funding."
- If/whether clauses: "Whether this will succeed remains uncertain."

**Common patterns:**
- It is + adjective + that... (It is evident that...)
- The fact that... (The fact that pollution is increasing...)
- What + verb... as subject (What matters most is...)

Using noun clauses demonstrates grammatical sophistication and allows you to express nuanced ideas.`,
      examples: [
        { sentence: 'It is widely acknowledged that education improves social mobility.', explanation: 'It + adjective + that-clause - very formal.' },
        { sentence: 'What concerns many experts is the rapid pace of climate change.', explanation: 'Wh-clause as subject - sophisticated structure.' },
        { sentence: 'The fact that technology is advancing rapidly creates both opportunities and challenges.', explanation: '"The fact that" introduces a noun clause.' },
        { sentence: 'Whether the policy will succeed remains to be seen.', explanation: 'Whether-clause as subject - expresses uncertainty.' },
        { sentence: 'I firmly believe that governments should prioritize environmental protection.', explanation: 'That-clause after opinion verb.' },
        { sentence: 'What we need is a comprehensive approach to this problem.', explanation: 'Wh-clause emphasizes the solution.' },
        { sentence: 'It is essential that immediate action be taken.', explanation: 'Subjunctive in formal that-clause.' },
        { sentence: 'How we address this issue will determine our future.', explanation: 'How-clause as subject.' },
        { sentence: 'The question is whether we can afford to wait.', explanation: 'Whether-clause as complement.' },
        { sentence: 'That technology has transformed communication is undeniable.', explanation: 'That-clause as subject - very formal.' }
      ],
      commonMistakes: [
        { mistake: 'What I think is that education is important.', correction: 'I think that education is important. / What I believe is that education is important.', explanation: 'Avoid redundancy - "What I think" already implies opinion.' },
        { mistake: 'The fact is that technology is important.', correction: 'The fact that technology is important cannot be denied.', explanation: '"The fact is that" is weak - use "the fact that" as subject.' },
        { mistake: 'I believe education is important.', correction: 'I believe that education is important.', explanation: 'Include "that" in formal writing for clarity.' },
        { mistake: 'What is important is education.', correction: 'What is important is the quality of education.', explanation: 'Be specific after wh-clause subjects.' },
        { mistake: 'If the policy will work is uncertain.', correction: 'Whether the policy will work is uncertain.', explanation: 'Use "whether" (not "if") as subject.' }
      ],
      miniPractice: [
        { question: 'Complete: "It is evident _____ climate change poses serious risks."', type: 'fill-blank' },
        { question: 'Which is more formal?', options: ['I think education is important.', 'I believe that education is important.', 'Education is important I think.', 'Important is education.'], type: 'multiple-choice' },
        { question: 'Rewrite: "Technology is advancing. This creates challenges." (use "The fact that")', type: 'rewrite' },
        { question: 'Complete: "_____ concerns experts is the lack of funding."', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['If this will work is uncertain.', 'Whether this will work is uncertain.', 'That this will work is uncertain.', 'What this will work is uncertain.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'that',
        'I believe that education is important.',
        'The fact that technology is advancing creates challenges.',
        'What',
        'Whether this will work is uncertain.'
      ],
      quickRecap: 'Noun clauses: that-clauses (opinions, facts), wh-clauses (emphasis), whether-clauses (uncertainty). Use "It is + adjective + that" for formal statements. "The fact that" introduces established facts. "What + verb" as subject creates emphasis.',
      grammarForm: `**That-clauses:**
- I believe/think/argue that...
- It is evident/clear/important that...
- The fact that...

**Wh-clauses:**
- What + verb... (as subject)
- How/why/when/where + clause

**Whether/if clauses:**
- Whether... (as subject - formal)
- If/whether... (after verbs)`,
      grammarUse: `**IELTS applications:**
- Expressing opinions: I believe that...
- Reporting views: It is argued that...
- Emphasizing: What matters is...
- Uncertainty: Whether this will succeed...
- Facts: The fact that...

**Formal patterns:**
- It is essential that + subjunctive
- It is widely believed that...
- What is needed is...`,
      sentenceUpgrade: [
        { basic: 'I think education is important.', upgraded: 'I firmly believe that education plays a crucial role in social and economic development.' },
        { basic: 'Technology is changing. This is a problem.', upgraded: 'The fact that technology is evolving at an unprecedented rate presents both opportunities and challenges.' },
        { basic: 'We need better policies.', upgraded: 'What is urgently required is the implementation of comprehensive, evidence-based policies.' }
      ]
    }
  },
  {
    id: 'grammar-12',
    title: 'Adverbial Clauses for Cohesion',
    slug: 'adverbial-clauses-cohesion',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Adverbial Clauses',
    description: 'Use adverbial clauses to show time, reason, contrast, and condition.',
    is_premium: true,
    is_published: true,
    view_count: 1350,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
    estimated_time: 23,
    content: {
      title: 'Adverbial Clauses for Cohesion',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Use adverbial clauses to show relationships between ideas',
        'Master conjunctions for time, reason, contrast, and condition',
        'Improve cohesion and coherence in IELTS Writing'
      ],
      coreExplanation: `Adverbial clauses modify verbs and show relationships between ideas. They're essential for cohesion in IELTS Writing.

**Types:**
- Time: when, while, before, after, as soon as, until
- Reason: because, since, as
- Contrast: although, even though, while, whereas
- Condition: if, unless, provided that
- Purpose: so that, in order that
- Result: so...that, such...that

**Position:** Can come before or after the main clause.
- "Although technology has benefits, it also has drawbacks."
- "Technology has drawbacks, although it also has benefits."

Using varied adverbial clauses demonstrates grammatical range.`,
      examples: [
        { sentence: 'Although technology has many benefits, it also poses significant challenges.', explanation: 'Contrast clause at the beginning - common in Task 2.' },
        { sentence: 'While some argue that globalization is beneficial, others disagree.', explanation: '"While" for contrast between views.' },
        { sentence: 'Since the industrial revolution, pollution levels have increased dramatically.', explanation: '"Since" for time reference.' },
        { sentence: 'Unless immediate action is taken, the situation will deteriorate.', explanation: '"Unless" for negative condition.' },
        { sentence: 'Whereas urban areas have better infrastructure, rural regions often lack basic services.', explanation: '"Whereas" for formal contrast.' },
        { sentence: 'As technology advances, new ethical questions emerge.', explanation: '"As" for simultaneous events.' },
        { sentence: 'Even though the policy was well-intentioned, it failed to achieve its objectives.', explanation: '"Even though" for strong contrast.' },
        { sentence: 'Provided that resources are allocated efficiently, the project will succeed.', explanation: '"Provided that" for formal condition.' },
        { sentence: 'The problem is so severe that immediate intervention is required.', explanation: '"So...that" for result.' },
        { sentence: 'Before implementing any policy, governments should consult stakeholders.', explanation: '"Before" for time sequence.' }
      ],
      commonMistakes: [
        { mistake: 'Although technology is useful, but it has problems.', correction: 'Although technology is useful, it has problems.', explanation: 'Don\'t use "but" after "although" - it\'s redundant.' },
        { mistake: 'Because of technology is advancing, jobs are changing.', correction: 'Because technology is advancing, jobs are changing.', explanation: '"Because of" + noun, "Because" + clause.' },
        { mistake: 'Despite technology is useful, it has drawbacks.', correction: 'Despite being useful, technology has drawbacks. / Although technology is useful, it has drawbacks.', explanation: '"Despite" + noun/gerund, "Although" + clause.' },
        { mistake: 'Even technology is useful, it has problems.', correction: 'Even though technology is useful, it has problems.', explanation: 'Use "even though" (not just "even") for contrast.' },
        { mistake: 'While on the other hand, some disagree.', correction: 'On the other hand, some disagree. / While some agree, others disagree.', explanation: 'Don\'t combine "while" with "on the other hand".' }
      ],
      miniPractice: [
        { question: 'Complete: "_____ technology has benefits, it also has drawbacks." (contrast)', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['Although it is useful, but it has problems.', 'Although it is useful, it has problems.', 'Although it is useful, however it has problems.', 'Although it is useful, yet it has problems.'], type: 'multiple-choice' },
        { question: 'Combine: "Technology is advancing. Jobs are changing." (use "As")', type: 'rewrite' },
        { question: 'Complete: "_____ immediate action is taken, the problem will worsen."', type: 'fill-blank' },
        { question: 'Which shows correct contrast?', options: ['Despite the policy is good, it failed.', 'Although the policy was good, it failed.', 'Even the policy was good, it failed.', 'While the policy was good, but it failed.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Although / Even though / While',
        'Although it is useful, it has problems.',
        'As technology advances, jobs are changing.',
        'Unless',
        'Although the policy was good, it failed.'
      ],
      quickRecap: 'Adverbial clauses show time, reason, contrast, condition, purpose, result. Don\'t use "but" after "although". "Despite/In spite of" + noun/gerund, "Although" + clause. "Unless" = "if not". Vary your conjunctions for Band 7+!',
      grammarForm: `**Time:** when, while, before, after, as, since, until, as soon as
**Reason:** because, since, as
**Contrast:** although, even though, while, whereas
**Condition:** if, unless, provided that, as long as
**Purpose:** so that, in order that
**Result:** so...that, such...that

**Position:** Beginning or end of sentence
- Beginning: comma after clause
- End: usually no comma`,
      grammarUse: `**IELTS Task 2 patterns:**
- Although X, Y (balanced argument)
- While some argue X, others believe Y
- Unless action is taken, consequences will follow
- Whereas X has benefits, Y has drawbacks

**Cohesion tips:**
- Use varied conjunctions
- Don't overuse "because"
- "While" and "whereas" for sophisticated contrast`,
      sentenceUpgrade: [
        { basic: 'Technology is useful. It has problems.', upgraded: 'Although technology offers numerous benefits, it also presents significant challenges that must be addressed.' },
        { basic: 'Some people agree. Others disagree.', upgraded: 'While some individuals support this view, others maintain that alternative approaches would be more effective.' },
        { basic: 'We must act now. The problem will get worse.', upgraded: 'Unless immediate and decisive action is taken, the situation will inevitably deteriorate further.' }
      ]
    }
  },
  {
    id: 'grammar-13',
    title: 'Participle Clauses for Conciseness',
    slug: 'participle-clauses-conciseness',
    type: 'grammar',
    level: 'advanced',
    topic: 'Participle Clauses',
    description: 'Use participle clauses to create sophisticated, concise sentences.',
    is_premium: true,
    is_published: true,
    view_count: 980,
    created_at: '2024-02-03T10:00:00Z',
    updated_at: '2024-02-03T10:00:00Z',
    estimated_time: 26,
    content: {
      title: 'Participle Clauses for Conciseness',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Form present and past participle clauses correctly',
        'Use participle clauses to reduce wordiness',
        'Create sophisticated sentences for Band 8+ writing'
      ],
      coreExplanation: `Participle clauses replace longer relative or adverbial clauses, making your writing more concise and sophisticated.

**Present participle (-ing):** active meaning
- "Students studying abroad gain valuable experience."
- (= Students who study abroad...)

**Past participle (-ed/irregular):** passive meaning
- "Policies implemented without consultation often fail."
- (= Policies which are implemented...)

**Perfect participle (having + past participle):** completed action
- "Having considered all options, the committee made a decision."
- (= After the committee had considered...)

Participle clauses are a hallmark of Band 8+ writing.`,
      examples: [
        { sentence: 'Facing increasing pressure, governments are implementing stricter regulations.', explanation: 'Present participle for reason/circumstance.' },
        { sentence: 'Policies designed to reduce emissions have had mixed results.', explanation: 'Past participle replacing "which were designed".' },
        { sentence: 'Having analyzed the data, researchers concluded that the trend would continue.', explanation: 'Perfect participle for completed prior action.' },
        { sentence: 'Countries investing in education tend to have stronger economies.', explanation: 'Present participle replacing "which invest".' },
        { sentence: 'When properly implemented, such measures can be highly effective.', explanation: 'Past participle with "when" for condition.' },
        { sentence: 'Not knowing the consequences, many people continue harmful practices.', explanation: 'Negative present participle for reason.' },
        { sentence: 'Based on current trends, experts predict significant changes.', explanation: 'Past participle for basis/source.' },
        { sentence: 'Having been neglected for decades, the infrastructure requires urgent attention.', explanation: 'Perfect passive participle.' },
        { sentence: 'Considering the evidence, it is clear that action is needed.', explanation: 'Present participle for "if we consider".' },
        { sentence: 'Seen from this perspective, the problem appears more complex.', explanation: 'Past participle for viewpoint.' }
      ],
      commonMistakes: [
        { mistake: 'Walking down the street, the building collapsed.', correction: 'Walking down the street, I saw the building collapse.', explanation: 'Dangling participle - subject must be the same in both clauses.' },
        { mistake: 'Having finished the work, the report was submitted.', correction: 'Having finished the work, we submitted the report.', explanation: 'The subject of "having finished" must be the same as the main clause subject.' },
        { mistake: 'Considering that the evidence, action is needed.', correction: 'Considering the evidence, action is needed.', explanation: 'Don\'t use "that" after participle.' },
        { mistake: 'Being that technology is important, we should invest.', correction: 'Given that technology is important, we should invest.', explanation: '"Being that" is non-standard - use "Given that" or "Since".' },
        { mistake: 'The policy implementing last year has failed.', correction: 'The policy implemented last year has failed.', explanation: 'Use past participle for passive meaning.' }
      ],
      miniPractice: [
        { question: 'Rewrite: "Because they face increasing pressure, governments are acting."', type: 'rewrite' },
        { question: 'Which is correct?', options: ['Walking to school, the rain started.', 'Walking to school, I got caught in the rain.', 'Walking to school, it started raining.', 'Walking to school, rain was falling.'], type: 'multiple-choice' },
        { question: 'Complete: "_____ (consider) all factors, the decision was made."', type: 'fill-blank' },
        { question: 'Rewrite: "Policies which were introduced hastily often fail."', type: 'rewrite' },
        { question: 'Which shows correct participle use?', options: ['Having analyzed the data, the conclusion was reached.', 'Having analyzed the data, researchers reached a conclusion.', 'Having analyzed the data, a conclusion was reached.', 'Having analyzed the data, it was concluded.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Facing increasing pressure, governments are acting.',
        'Walking to school, I got caught in the rain.',
        'Having considered / Considering',
        'Policies introduced hastily often fail.',
        'Having analyzed the data, researchers reached a conclusion.'
      ],
      quickRecap: 'Present participle (-ing) = active. Past participle (-ed) = passive. Perfect participle (having + pp) = completed action. IMPORTANT: The subject of the participle must be the same as the main clause subject (avoid dangling participles)!',
      grammarForm: `**Present participle (-ing):**
- Active meaning
- Replaces: who/which + active verb
- "Students studying..." = "Students who study..."

**Past participle (-ed/irregular):**
- Passive meaning
- Replaces: who/which + passive verb
- "Policies implemented..." = "Policies which were implemented..."

**Perfect participle (having + pp):**
- Completed prior action
- "Having considered..." = "After considering..."`,
      grammarUse: `**Functions:**
- Reason: Facing pressure, they acted.
- Time: Having finished, we left.
- Condition: Properly implemented, it works.
- Description: Countries investing in X...

**IELTS applications:**
- Concise academic writing
- Sophisticated sentence structures
- Band 8+ indicator

**Warning:** Avoid dangling participles!`,
      sentenceUpgrade: [
        { basic: 'Because they face challenges, governments are changing policies.', upgraded: 'Facing unprecedented challenges, governments are fundamentally reassessing their policy approaches.' },
        { basic: 'The policy was introduced last year. It has failed.', upgraded: 'The policy introduced last year has failed to achieve its intended objectives.' },
        { basic: 'After they analyzed the data, researchers made conclusions.', upgraded: 'Having thoroughly analyzed the available data, researchers drew several significant conclusions.' }
      ]
    }
  },
  {
    id: 'grammar-14',
    title: 'Inversion for Emphasis',
    slug: 'inversion-emphasis',
    type: 'grammar',
    level: 'advanced',
    topic: 'Inversion',
    description: 'Use inverted structures to add emphasis and sophistication to your writing.',
    is_premium: true,
    is_published: true,
    view_count: 890,
    created_at: '2024-02-05T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Inversion for Emphasis',
      targetLevel: 'Band 7.5 - 9.0',
      whatYouWillLearn: [
        'Use negative adverb inversion for emphasis',
        'Apply conditional inversion in formal writing',
        'Create sophisticated sentences that impress examiners'
      ],
      coreExplanation: `Inversion (putting the verb before the subject) creates emphasis and formality. It's a hallmark of Band 8+ writing.

**Negative adverb inversion:**
- "Never have I seen such devastation."
- "Not only does technology help, but it also creates problems."

**Conditional inversion:**
- "Were the government to act, the situation would improve."
- "Had they invested earlier, the outcome would have been different."

**Other inversions:**
- "Only by working together can we solve this problem."
- "So severe is the problem that immediate action is required."

Use sparingly - one or two per essay is impressive; overuse seems unnatural.`,
      examples: [
        { sentence: 'Not only does technology enhance productivity, but it also creates new opportunities.', explanation: 'Not only...but also with inversion - very impressive.' },
        { sentence: 'Never before has the world faced such a complex challenge.', explanation: 'Negative adverb inversion for emphasis.' },
        { sentence: 'Were the government to implement these measures, significant improvements would follow.', explanation: 'Conditional inversion - very formal.' },
        { sentence: 'Only by addressing the root causes can we hope to solve this problem.', explanation: '"Only by" + inversion for emphasis.' },
        { sentence: 'Had policymakers acted sooner, the crisis could have been averted.', explanation: 'Third conditional inversion.' },
        { sentence: 'Rarely do we see such unanimous agreement among experts.', explanation: 'Negative adverb inversion.' },
        { sentence: 'So significant is this issue that it demands immediate attention.', explanation: '"So + adjective" inversion for emphasis.' },
        { sentence: 'Under no circumstances should this policy be abandoned.', explanation: 'Negative phrase inversion.' },
        { sentence: 'Not until recently did researchers understand the full implications.', explanation: '"Not until" inversion.' },
        { sentence: 'Little did they realize the consequences of their actions.', explanation: '"Little" inversion for emphasis.' }
      ],
      commonMistakes: [
        { mistake: 'Not only technology helps, but it also creates problems.', correction: 'Not only does technology help, but it also creates problems.', explanation: 'Inversion required after "Not only".' },
        { mistake: 'Never I have seen such a problem.', correction: 'Never have I seen such a problem.', explanation: 'Auxiliary verb comes before subject in inversion.' },
        { mistake: 'Only by working together we can solve this.', correction: 'Only by working together can we solve this.', explanation: 'Inversion required after "Only by".' },
        { mistake: 'Were the government acts, things would improve.', correction: 'Were the government to act, things would improve.', explanation: 'Use "were + to + infinitive" in conditional inversion.' },
        { mistake: 'So the problem is severe that action is needed.', correction: 'So severe is the problem that action is needed.', explanation: 'Adjective comes after "so" in inversion.' }
      ],
      miniPractice: [
        { question: 'Rewrite with inversion: "Technology not only helps but also creates problems."', type: 'rewrite' },
        { question: 'Which is correct?', options: ['Never I have seen this.', 'Never have I seen this.', 'Never I saw this.', 'Never did I have seen this.'], type: 'multiple-choice' },
        { question: 'Complete: "_____ the government to act, the situation would improve."', type: 'fill-blank' },
        { question: 'Rewrite: "We can solve this problem only by working together."', type: 'rewrite' },
        { question: 'Which shows correct inversion?', options: ['So severe the problem is that action is needed.', 'So severe is the problem that action is needed.', 'So is severe the problem that action is needed.', 'So the problem severe is that action is needed.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Not only does technology help, but it also creates problems.',
        'Never have I seen this.',
        'Were',
        'Only by working together can we solve this problem.',
        'So severe is the problem that action is needed.'
      ],
      quickRecap: 'Inversion = verb before subject for emphasis. Use after: never, rarely, not only, only by, under no circumstances, so + adjective. Conditional inversion: Were + subject + to + infinitive. Use sparingly (1-2 per essay) for maximum impact!',
      grammarForm: `**Negative adverb inversion:**
- Never/Rarely/Seldom + auxiliary + subject + verb
- Not only + auxiliary + subject + verb, but also...
- Under no circumstances + auxiliary + subject + verb

**Conditional inversion:**
- Were + subject + to + infinitive (2nd conditional)
- Had + subject + past participle (3rd conditional)
- Should + subject + verb (1st conditional - formal)

**Other patterns:**
- Only by + gerund + auxiliary + subject + verb
- So + adjective + auxiliary + subject + that...`,
      grammarUse: `**When to use:**
- For emphasis on key points
- In formal academic writing
- To impress examiners (Band 8+)

**How often:**
- 1-2 times per essay maximum
- Don't overuse - seems unnatural

**Best contexts:**
- Opening sentences
- Key arguments
- Conclusions`,
      sentenceUpgrade: [
        { basic: 'Technology helps and creates problems.', upgraded: 'Not only does technology enhance our capabilities, but it also introduces unprecedented challenges.' },
        { basic: 'If the government acted, things would improve.', upgraded: 'Were the government to implement comprehensive reforms, significant improvements would inevitably follow.' },
        { basic: 'We have never seen such a problem.', upgraded: 'Never before has humanity confronted a challenge of such magnitude and complexity.' }
      ]
    }
  },
  {
    id: 'grammar-15',
    title: 'Cleft Sentences for Emphasis',
    slug: 'cleft-sentences-emphasis',
    type: 'grammar',
    level: 'advanced',
    topic: 'Cleft Sentences',
    description: 'Use cleft sentences to highlight specific information in your writing.',
    is_premium: true,
    is_published: true,
    view_count: 920,
    created_at: '2024-02-07T10:00:00Z',
    updated_at: '2024-02-07T10:00:00Z',
    estimated_time: 22,
    content: {
      title: 'Cleft Sentences for Emphasis',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Form it-cleft and what-cleft sentences correctly',
        'Use cleft sentences to emphasize specific information',
        'Add sophistication to your IELTS Writing'
      ],
      coreExplanation: `Cleft sentences "split" a simple sentence to emphasize one part. They're excellent for highlighting key information.

**It-cleft:** "It is/was + emphasized element + that/who..."
- Normal: "Education drives economic growth."
- Cleft: "It is education that drives economic growth."

**What-cleft:** "What + clause + is/was..."
- Normal: "We need better policies."
- Cleft: "What we need is better policies."

**All-cleft:** "All + clause + is/was..."
- "All that is required is commitment."

Cleft sentences are particularly useful in Task 2 for emphasizing your main argument.`,
      examples: [
        { sentence: 'It is education that holds the key to social mobility.', explanation: 'It-cleft emphasizes "education".' },
        { sentence: 'What concerns many experts is the rapid pace of change.', explanation: 'What-cleft emphasizes the concern.' },
        { sentence: 'It was not until the 20th century that women gained voting rights.', explanation: 'It-cleft with time emphasis.' },
        { sentence: 'What we need is a comprehensive approach to this problem.', explanation: 'What-cleft emphasizes the solution.' },
        { sentence: 'It is the government that bears primary responsibility.', explanation: 'It-cleft emphasizes responsibility.' },
        { sentence: 'What makes this issue particularly challenging is its complexity.', explanation: 'What-cleft explains difficulty.' },
        { sentence: 'All that is required is political will and commitment.', explanation: 'All-cleft minimizes requirements.' },
        { sentence: 'It was only after the crisis that reforms were introduced.', explanation: 'It-cleft emphasizes timing.' },
        { sentence: 'What distinguishes successful countries is their investment in education.', explanation: 'What-cleft highlights key factor.' },
        { sentence: 'It is through cooperation that we can address global challenges.', explanation: 'It-cleft emphasizes method.' }
      ],
      commonMistakes: [
        { mistake: 'It is education what drives growth.', correction: 'It is education that drives growth.', explanation: 'Use "that" (not "what") in it-cleft sentences.' },
        { mistake: 'What we need are better policies.', correction: 'What we need is better policies.', explanation: 'Verb agrees with "what" (singular), not the complement.' },
        { mistake: 'It is the government who is responsible.', correction: 'It is the government that is responsible.', explanation: 'Use "that" for organizations (or "who" for people).' },
        { mistake: 'What is needed are more resources.', correction: 'What is needed is more resources.', explanation: 'Singular verb after "what" clause.' },
        { mistake: 'It was education which helped.', correction: 'It was education that helped.', explanation: 'Prefer "that" over "which" in cleft sentences.' }
      ],
      miniPractice: [
        { question: 'Rewrite as it-cleft: "Education drives economic growth." (emphasize education)', type: 'rewrite' },
        { question: 'Which is correct?', options: ['It is education what matters.', 'It is education that matters.', 'It is education which matters.', 'It is education who matters.'], type: 'multiple-choice' },
        { question: 'Complete: "_____ we need is a comprehensive solution."', type: 'fill-blank' },
        { question: 'Rewrite as what-cleft: "The lack of funding concerns experts."', type: 'rewrite' },
        { question: 'Which is correct?', options: ['What we need are more resources.', 'What we need is more resources.', 'What we needs is more resources.', 'What we need be more resources.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'It is education that drives economic growth.',
        'It is education that matters.',
        'What',
        'What concerns experts is the lack of funding.',
        'What we need is more resources.'
      ],
      quickRecap: 'It-cleft: "It is X that..." emphasizes X. What-cleft: "What + clause + is..." emphasizes the whole idea. Use "that" (not "what") in it-clefts. Verb after "what" is usually singular. Great for emphasizing main arguments in Task 2!',
      grammarForm: `**It-cleft:**
- It is/was + noun/pronoun + that/who + clause
- It is education that matters.
- It was the government that acted.

**What-cleft:**
- What + clause + is/was + complement
- What we need is action.
- What concerns me is the cost.

**All-cleft:**
- All (that) + clause + is/was + complement
- All we need is commitment.`,
      grammarUse: `**Functions:**
- Emphasize key information
- Highlight main arguments
- Create contrast
- Add sophistication

**IELTS applications:**
- Thesis statements: "It is education that..."
- Topic sentences: "What this suggests is..."
- Conclusions: "What is clear is that..."

**Tips:**
- Use 1-2 per essay
- Great for introductions and conclusions`,
      sentenceUpgrade: [
        { basic: 'Education is important for development.', upgraded: 'It is education that serves as the cornerstone of sustainable social and economic development.' },
        { basic: 'We need better policies.', upgraded: 'What is urgently required is the implementation of comprehensive, evidence-based policies.' },
        { basic: 'The government should act.', upgraded: 'It is the government that bears the primary responsibility for addressing this pressing issue.' }
      ]
    }
  },
  {
    id: 'grammar-16',
    title: 'Parallel Structure',
    slug: 'parallel-structure',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Parallel Structure',
    description: 'Use parallel structure to create balanced, clear sentences.',
    is_premium: true,
    is_published: true,
    view_count: 1280,
    created_at: '2024-02-09T10:00:00Z',
    updated_at: '2024-02-09T10:00:00Z',
    estimated_time: 20,
    content: {
      title: 'Parallel Structure',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Identify and correct parallelism errors',
        'Create balanced lists and comparisons',
        'Improve clarity and flow in your writing'
      ],
      coreExplanation: `Parallel structure means using the same grammatical form for similar ideas. It creates balance, clarity, and rhythm.

**Basic rule:** Items in a list or comparison should have the same form.

**Wrong:** "I like reading, to write, and swimming."
**Right:** "I like reading, writing, and swimming."

**Common patterns requiring parallelism:**
- Lists (A, B, and C)
- Comparisons (more X than Y)
- Correlative conjunctions (not only...but also, either...or)

Parallelism errors are common and can lower your band score.`,
      examples: [
        { sentence: 'The policy aims to reduce emissions, promote sustainability, and encourage innovation.', explanation: 'Parallel infinitives (to reduce, promote, encourage).' },
        { sentence: 'Education improves not only economic prospects but also social mobility.', explanation: 'Parallel noun phrases after correlatives.' },
        { sentence: 'The government should focus on investing in infrastructure, training workers, and supporting businesses.', explanation: 'Parallel gerunds.' },
        { sentence: 'Technology has made communication faster, cheaper, and more accessible.', explanation: 'Parallel adjectives.' },
        { sentence: 'Citizens have a responsibility both to obey laws and to participate in democracy.', explanation: 'Parallel infinitives after "both...and".' },
        { sentence: 'The problem is neither simple nor easily solved.', explanation: 'Parallel adjectives after "neither...nor".' },
        { sentence: 'Success requires hard work, dedication, and perseverance.', explanation: 'Parallel nouns in a list.' },
        { sentence: 'The study examined how technology affects learning and whether it improves outcomes.', explanation: 'Parallel noun clauses.' },
        { sentence: 'Either the government must act or the situation will deteriorate.', explanation: 'Parallel clauses after "either...or".' },
        { sentence: 'The benefits include reduced costs, improved efficiency, and enhanced quality.', explanation: 'Parallel noun phrases (adjective + noun).' }
      ],
      commonMistakes: [
        { mistake: 'I like reading, to write, and swimming.', correction: 'I like reading, writing, and swimming.', explanation: 'Use same form: all gerunds.' },
        { mistake: 'The policy aims to reduce emissions and promoting sustainability.', correction: 'The policy aims to reduce emissions and promote sustainability.', explanation: 'Parallel infinitives after "aims to".' },
        { mistake: 'Technology is not only useful but also it creates problems.', correction: 'Technology is not only useful but also problematic.', explanation: 'Parallel adjectives after correlatives.' },
        { mistake: 'The government should invest in education, healthcare, and to improve infrastructure.', correction: 'The government should invest in education, healthcare, and infrastructure.', explanation: 'Parallel nouns in a list.' },
        { mistake: 'Success requires working hard and dedication.', correction: 'Success requires hard work and dedication.', explanation: 'Parallel nouns (or: working hard and being dedicated).' }
      ],
      miniPractice: [
        { question: 'Correct: "The policy aims to reduce costs, improving efficiency, and enhance quality."', type: 'rewrite' },
        { question: 'Which is parallel?', options: ['I like reading, writing, and to swim.', 'I like reading, writing, and swimming.', 'I like to read, writing, and swimming.', 'I like reading, to write, and swimming.'], type: 'multiple-choice' },
        { question: 'Complete: "Technology is not only useful but also _____."', type: 'fill-blank' },
        { question: 'Correct: "Success requires hard work, being dedicated, and perseverance."', type: 'rewrite' },
        { question: 'Which is correct?', options: ['Either act now or the situation deteriorates.', 'Either act now or the situation will deteriorate.', 'Either acting now or the situation will deteriorate.', 'Either to act now or the situation will deteriorate.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'The policy aims to reduce costs, improve efficiency, and enhance quality.',
        'I like reading, writing, and swimming.',
        'accessible / affordable / problematic (any adjective)',
        'Success requires hard work, dedication, and perseverance.',
        'Either act now or the situation will deteriorate.'
      ],
      quickRecap: 'Parallel structure = same grammatical form for similar ideas. Lists: all nouns, all gerunds, or all infinitives. Correlatives (not only...but also, either...or): same form after each part. Check your lists and comparisons for parallelism!',
      grammarForm: `**Lists:**
- Nouns: A, B, and C
- Verbs: to A, B, and C (or: A, B, and C)
- Adjectives: A, B, and C
- Gerunds: Aing, Bing, and Cing

**Correlatives:**
- not only A but also B (same form)
- either A or B (same form)
- both A and B (same form)
- neither A nor B (same form)`,
      grammarUse: `**Check parallelism in:**
- Lists of three or more items
- Comparisons (more X than Y)
- Correlative conjunctions
- Paired ideas

**IELTS applications:**
- Task 2 body paragraphs (listing reasons)
- Conclusions (summarizing points)
- Comparisons between options`,
      sentenceUpgrade: [
        { basic: 'The government should invest in education, healthcare, and improving infrastructure.', upgraded: 'The government should invest in education, healthcare, and infrastructure development.' },
        { basic: 'Technology helps communication and to work efficiently.', upgraded: 'Technology facilitates both effective communication and efficient work practices.' },
        { basic: 'Success needs hard work, being dedicated, and you must persevere.', upgraded: 'Success demands hard work, unwavering dedication, and persistent perseverance.' }
      ]
    }
  },
  {
    id: 'grammar-17',
    title: 'Hedging Language for Academic Writing',
    slug: 'hedging-language-academic',
    type: 'grammar',
    level: 'advanced',
    topic: 'Hedging',
    description: 'Use hedging to express ideas with appropriate caution and nuance.',
    is_premium: true,
    is_published: true,
    view_count: 1150,
    created_at: '2024-02-11T10:00:00Z',
    updated_at: '2024-02-11T10:00:00Z',
    estimated_time: 21,
    content: {
      title: 'Hedging Language for Academic Writing',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Use hedging to express appropriate certainty levels',
        'Avoid overgeneralization in academic writing',
        'Demonstrate critical thinking through nuanced language'
      ],
      coreExplanation: `Hedging is using cautious language to avoid absolute statements. It's essential in academic writing because it:
- Shows critical thinking
- Acknowledges limitations
- Avoids overgeneralization
- Sounds more academic

**Hedging devices:**
- Modal verbs: may, might, could, would
- Adverbs: perhaps, possibly, probably, generally
- Verbs: seem, appear, tend, suggest
- Phrases: it is possible that, there is evidence that

**Too strong:** "Technology causes unemployment."
**Hedged:** "Technology may contribute to unemployment in certain sectors."

Band 7+ writing requires appropriate hedging.`,
      examples: [
        { sentence: 'This approach could potentially lead to significant improvements.', explanation: 'Modal + adverb for double hedging.' },
        { sentence: 'Research suggests that exercise may improve mental health.', explanation: '"Suggests" + "may" for cautious claim.' },
        { sentence: 'It appears that technology is transforming the workplace.', explanation: '"Appears" for tentative observation.' },
        { sentence: 'There is some evidence to suggest that this policy has been effective.', explanation: 'Hedged evidence claim.' },
        { sentence: 'In many cases, education tends to improve employment prospects.', explanation: '"In many cases" + "tends to" for limitation.' },
        { sentence: 'It is possible that climate change will have severe consequences.', explanation: '"It is possible that" for possibility.' },
        { sentence: 'This phenomenon is arguably one of the most significant challenges.', explanation: '"Arguably" for debatable claim.' },
        { sentence: 'The data would seem to indicate a positive correlation.', explanation: '"Would seem to" for tentative conclusion.' },
        { sentence: 'To some extent, technology has contributed to social isolation.', explanation: '"To some extent" for partial claim.' },
        { sentence: 'It could be argued that governments should intervene more actively.', explanation: '"It could be argued" for presenting a view.' }
      ],
      commonMistakes: [
        { mistake: 'Technology always causes problems.', correction: 'Technology can sometimes cause problems.', explanation: 'Avoid absolutes like "always" - hedge with "can sometimes".' },
        { mistake: 'Everyone agrees that education is important.', correction: 'It is widely acknowledged that education is important.', explanation: 'Avoid "everyone" - use "widely acknowledged".' },
        { mistake: 'This will definitely solve the problem.', correction: 'This could potentially help address the problem.', explanation: 'Avoid "definitely" - hedge with "could potentially".' },
        { mistake: 'All experts believe that...', correction: 'Many experts believe that... / It is generally accepted that...', explanation: 'Avoid "all" - use "many" or impersonal structures.' },
        { mistake: 'The evidence proves that...', correction: 'The evidence suggests that... / The evidence indicates that...', explanation: '"Proves" is too strong - use "suggests" or "indicates".' }
      ],
      miniPractice: [
        { question: 'Hedge: "Technology causes unemployment."', type: 'rewrite' },
        { question: 'Which is appropriately hedged?', options: ['Everyone knows this is true.', 'This is definitely the best solution.', 'This approach could potentially be effective.', 'All evidence proves this.'], type: 'multiple-choice' },
        { question: 'Complete: "Research _____ (suggest) that exercise improves health."', type: 'fill-blank' },
        { question: 'Hedge: "Education always leads to better jobs."', type: 'rewrite' },
        { question: 'Which is too strong?', options: ['This may help.', 'This could contribute.', 'This will definitely solve everything.', 'This tends to improve outcomes.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Technology may contribute to unemployment in certain sectors. / Technology could potentially lead to job displacement.',
        'This approach could potentially be effective.',
        'suggests',
        'Education tends to improve employment prospects. / Education often leads to better job opportunities.',
        'This will definitely solve everything.'
      ],
      quickRecap: 'Hedging = cautious language. Use: may/might/could, perhaps/possibly, seems/appears/tends, it is possible that. Avoid: always/never, everyone/no one, definitely/certainly, proves. Hedging shows critical thinking and is essential for Band 7+!',
      grammarForm: `**Modal verbs:** may, might, could, would
**Adverbs:** perhaps, possibly, probably, generally, often, sometimes
**Verbs:** seem, appear, tend, suggest, indicate
**Phrases:**
- It is possible/likely that...
- There is evidence to suggest...
- It could be argued that...
- To some extent...
- In many/some cases...`,
      grammarUse: `**When to hedge:**
- Making generalizations
- Reporting research findings
- Expressing opinions
- Making predictions
- Discussing causes and effects

**Avoid:**
- always, never, all, none
- definitely, certainly, obviously
- proves, everyone knows

**Balance:**
- Don't over-hedge (sounds weak)
- Don't under-hedge (sounds arrogant)`,
      sentenceUpgrade: [
        { basic: 'Technology causes social problems.', upgraded: 'Technology may contribute to certain social challenges, particularly in terms of interpersonal communication.' },
        { basic: 'Everyone agrees education is important.', upgraded: 'It is widely acknowledged that education plays a crucial role in personal and societal development.' },
        { basic: 'This will solve the problem.', upgraded: 'This approach could potentially help address some aspects of the problem.' }
      ]
    }
  },
  {
    id: 'grammar-18',
    title: 'Cohesive Devices and Linking Words',
    slug: 'cohesive-devices-linking-words',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Cohesion',
    description: 'Master linking words to improve coherence and cohesion in your writing.',
    is_premium: false,
    is_published: true,
    view_count: 2100,
    created_at: '2024-02-13T10:00:00Z',
    updated_at: '2024-02-13T10:00:00Z',
    estimated_time: 22,
    content: {
      title: 'Cohesive Devices and Linking Words',
      targetLevel: 'Band 6.0 - 7.5',
      whatYouWillLearn: [
        'Use a variety of linking words appropriately',
        'Connect ideas within and between paragraphs',
        'Avoid overusing basic connectors'
      ],
      coreExplanation: `Cohesive devices connect ideas and improve the flow of your writing. They're essential for the Coherence and Cohesion criterion.

**Categories:**
- Addition: furthermore, moreover, in addition
- Contrast: however, nevertheless, on the other hand
- Cause/Effect: therefore, consequently, as a result
- Example: for instance, for example, such as
- Sequence: firstly, subsequently, finally
- Conclusion: in conclusion, to sum up, overall

**Key principle:** Use varied connectors appropriately. Don't overuse "firstly, secondly, thirdly" or "however."

Natural cohesion through pronouns and synonyms is also important.`,
      examples: [
        { sentence: 'Technology has many benefits. However, it also poses significant challenges.', explanation: '"However" for contrast between sentences.' },
        { sentence: 'Furthermore, education plays a crucial role in economic development.', explanation: '"Furthermore" adds another point.' },
        { sentence: 'As a result, many governments have implemented stricter regulations.', explanation: '"As a result" shows consequence.' },
        { sentence: 'For instance, renewable energy sources such as solar and wind are becoming more affordable.', explanation: '"For instance" introduces example.' },
        { sentence: 'Nevertheless, some argue that the benefits outweigh the drawbacks.', explanation: '"Nevertheless" for strong contrast.' },
        { sentence: 'Consequently, unemployment rates have increased in certain sectors.', explanation: '"Consequently" shows result.' },
        { sentence: 'In addition to economic benefits, this approach offers environmental advantages.', explanation: '"In addition to" adds related point.' },
        { sentence: 'On the other hand, critics argue that the policy has been ineffective.', explanation: '"On the other hand" for opposing view.' },
        { sentence: 'To illustrate this point, consider the case of Finland.', explanation: '"To illustrate" introduces specific example.' },
        { sentence: 'Overall, the evidence suggests that the benefits outweigh the costs.', explanation: '"Overall" for summary/conclusion.' }
      ],
      commonMistakes: [
        { mistake: 'Technology is useful. But, it has problems.', correction: 'Technology is useful. However, it has problems.', explanation: 'Don\'t start sentences with "But" in formal writing - use "However".' },
        { mistake: 'Firstly... Secondly... Thirdly... Fourthly... Fifthly...', correction: 'Firstly... Furthermore... In addition... Moreover... Finally...', explanation: 'Vary your connectors - don\'t just use numbers.' },
        { mistake: 'However, on the other hand, some disagree.', correction: 'On the other hand, some disagree.', explanation: 'Don\'t combine similar connectors.' },
        { mistake: 'For example, such as technology and education.', correction: 'For example, technology and education are important. / ...such as technology and education.', explanation: '"For example" needs a complete sentence; "such as" introduces a list.' },
        { mistake: 'In conclusion, to sum up, the evidence shows...', correction: 'In conclusion, the evidence shows...', explanation: 'Don\'t use multiple conclusion markers together.' }
      ],
      miniPractice: [
        { question: 'Complete: "Technology has benefits. _____, it also has drawbacks."', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['But, some disagree.', 'However, some disagree.', 'However but some disagree.', 'But however some disagree.'], type: 'multiple-choice' },
        { question: 'Add a connector: "Education improves employment. _____, it enhances social mobility."', type: 'fill-blank' },
        { question: 'Complete: "_____, the evidence suggests that action is needed."', type: 'fill-blank' },
        { question: 'Which shows correct use?', options: ['For example, such as cars and buses.', 'For example, cars and buses are common.', 'Such as, for example, cars.', 'For example such as cars.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'However / Nevertheless / On the other hand',
        'However, some disagree.',
        'Furthermore / Moreover / In addition / Additionally',
        'Overall / In conclusion / To sum up',
        'For example, cars and buses are common.'
      ],
      quickRecap: 'Use varied connectors: addition (furthermore, moreover), contrast (however, nevertheless), cause/effect (therefore, consequently), example (for instance). Don\'t overuse "firstly, secondly" or combine similar connectors. Natural cohesion through pronouns and synonyms is also important!',
      grammarForm: `**Addition:** furthermore, moreover, in addition, additionally, also
**Contrast:** however, nevertheless, nonetheless, on the other hand, conversely
**Cause/Effect:** therefore, consequently, as a result, thus, hence
**Example:** for instance, for example, such as, namely
**Sequence:** firstly, subsequently, then, finally, ultimately
**Conclusion:** in conclusion, to sum up, overall, in summary`,
      grammarUse: `**Sentence position:**
- Beginning: However, ... (comma after)
- Middle: ..., however, ... (commas around)
- End: ..., however. (comma before)

**Paragraph cohesion:**
- Topic sentences
- Pronouns (this, these, it)
- Synonyms and paraphrasing
- Logical connectors

**Avoid:**
- Overusing the same connector
- Starting every sentence with a connector
- Combining similar connectors`,
      sentenceUpgrade: [
        { basic: 'Technology is good. But it has problems.', upgraded: 'While technology offers numerous advantages, it nevertheless presents certain challenges that must be addressed.' },
        { basic: 'Firstly... Secondly... Thirdly...', upgraded: 'Initially... Furthermore... In addition to this...' },
        { basic: 'So, the government should act.', upgraded: 'Consequently, it is imperative that the government takes decisive action.' }
      ]
    }
  },
  {
    id: 'grammar-19',
    title: 'Subjunctive Mood',
    slug: 'subjunctive-mood',
    type: 'grammar',
    level: 'advanced',
    topic: 'Subjunctive',
    description: 'Use the subjunctive mood for formal suggestions and hypothetical situations.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z',
    estimated_time: 23,
    content: {
      title: 'Subjunctive Mood',
      targetLevel: 'Band 7.5 - 9.0',
      whatYouWillLearn: [
        'Understand when to use the subjunctive mood',
        'Form subjunctive structures correctly',
        'Add formality and sophistication to your writing'
      ],
      coreExplanation: `The subjunctive mood is used for suggestions, demands, and hypothetical situations. It's a marker of formal, sophisticated English.

**Present subjunctive:** base form of verb (no -s for third person)
- "It is essential that the government act immediately."
- "I suggest that he be removed from the committee."

**Past subjunctive:** "were" for all subjects
- "If I were the president, I would prioritize education."
- "I wish the situation were different."

**Common triggers:**
- It is essential/important/vital/necessary that...
- I suggest/recommend/propose that...
- If I were... / I wish I were...

The subjunctive is rare in everyday English but common in formal writing.`,
      examples: [
        { sentence: 'It is essential that immediate action be taken.', explanation: 'Present subjunctive after "essential that".' },
        { sentence: 'The committee recommended that the policy be revised.', explanation: 'Subjunctive after "recommended that".' },
        { sentence: 'If I were in charge, I would implement stricter regulations.', explanation: 'Past subjunctive "were" in conditional.' },
        { sentence: 'It is vital that every citizen participate in the democratic process.', explanation: 'Subjunctive "participate" (not "participates").' },
        { sentence: 'I suggest that the government invest more in renewable energy.', explanation: 'Subjunctive after "suggest that".' },
        { sentence: 'Were the situation to change, we would reconsider our position.', explanation: 'Inverted subjunctive conditional.' },
        { sentence: 'It is imperative that this issue be addressed without delay.', explanation: 'Subjunctive after "imperative that".' },
        { sentence: 'I wish the government were more proactive on this issue.', explanation: 'Subjunctive "were" after "wish".' },
        { sentence: 'The proposal demands that all parties agree to the terms.', explanation: 'Subjunctive after "demands that".' },
        { sentence: 'As if the problem were not serious enough, new challenges have emerged.', explanation: 'Subjunctive after "as if".' }
      ],
      commonMistakes: [
        { mistake: 'It is essential that the government acts immediately.', correction: 'It is essential that the government act immediately.', explanation: 'Use base form (act) not third person (acts) in subjunctive.' },
        { mistake: 'I suggest that he goes to the meeting.', correction: 'I suggest that he go to the meeting.', explanation: 'Subjunctive uses base form after "suggest that".' },
        { mistake: 'If I was rich, I would travel.', correction: 'If I were rich, I would travel.', explanation: 'Use "were" (not "was") in hypothetical conditionals.' },
        { mistake: 'It is important that everyone are involved.', correction: 'It is important that everyone be involved.', explanation: 'Use "be" (base form) in subjunctive.' },
        { mistake: 'I wish I was there.', correction: 'I wish I were there.', explanation: 'Use "were" after "wish" for hypothetical situations.' }
      ],
      miniPractice: [
        { question: 'Complete: "It is essential that the government _____ (act) immediately."', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['If I was you, I would accept.', 'If I were you, I would accept.', 'If I am you, I would accept.', 'If I be you, I would accept.'], type: 'multiple-choice' },
        { question: 'Complete: "I suggest that he _____ (be) removed from the committee."', type: 'fill-blank' },
        { question: 'Correct: "It is vital that every student attends the session."', type: 'rewrite' },
        { question: 'Which shows correct subjunctive?', options: ['I wish I was there.', 'I wish I were there.', 'I wish I am there.', 'I wish I be there.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'act',
        'If I were you, I would accept.',
        'be',
        'It is vital that every student attend the session.',
        'I wish I were there.'
      ],
      quickRecap: 'Present subjunctive: base form after "essential/important/vital that", "suggest/recommend that". Past subjunctive: "were" for all subjects in hypotheticals ("If I were", "I wish I were"). Subjunctive shows formal, sophisticated English!',
      grammarForm: `**Present subjunctive:**
- Base form (no -s, no -ed)
- "that he go" (not "goes")
- "that it be" (not "is")

**Past subjunctive:**
- "were" for all subjects
- "If I/he/she/it were..."
- "I wish I/he/she/it were..."

**Triggers:**
- It is essential/important/vital/necessary that...
- suggest/recommend/propose/demand that...
- If + were (hypothetical)
- wish + were`,
      grammarUse: `**When to use:**
- Formal recommendations
- Demands and requirements
- Hypothetical situations
- Wishes about unreal situations

**IELTS applications:**
- Task 2 recommendations
- Formal suggestions
- Hypothetical arguments

**Note:** Subjunctive is more common in American English and formal writing. In informal British English, "should + verb" is often used instead.`,
      sentenceUpgrade: [
        { basic: 'The government should act now.', upgraded: 'It is imperative that the government act decisively and without delay.' },
        { basic: 'If I was the leader, I would change things.', upgraded: 'Were I in a position of leadership, I would implement comprehensive reforms.' },
        { basic: 'I think everyone should participate.', upgraded: 'It is essential that every stakeholder participate actively in this process.' }
      ]
    }
  },
  {
    id: 'grammar-20',
    title: 'Ellipsis and Substitution',
    slug: 'ellipsis-substitution',
    type: 'grammar',
    level: 'advanced',
    topic: 'Ellipsis',
    description: 'Use ellipsis and substitution to avoid repetition and improve flow.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-02-17T10:00:00Z',
    updated_at: '2024-02-17T10:00:00Z',
    estimated_time: 20,
    content: {
      title: 'Ellipsis and Substitution',
      targetLevel: 'Band 7.0 - 8.0',
      whatYouWillLearn: [
        'Use ellipsis to avoid unnecessary repetition',
        'Apply substitution with do, so, one, etc.',
        'Create more natural, flowing prose'
      ],
      coreExplanation: `Ellipsis (omitting words) and substitution (replacing words) help avoid repetition and create natural flow.

**Ellipsis:** Omitting words that are understood
- "Some countries have acted, others have not [acted]."
- "I wanted to help but couldn't [help]."

**Substitution:** Replacing words with substitutes
- "do/does/did" for verbs: "Technology helps, and education does too."
- "so" for clauses: "I believe so."
- "one/ones" for nouns: "This approach is better than the previous one."

These techniques are essential for natural, sophisticated writing.`,
      examples: [
        { sentence: 'Some countries have implemented reforms, while others have not.', explanation: 'Ellipsis: "have not [implemented reforms]".' },
        { sentence: 'Technology has transformed communication, and it will continue to do so.', explanation: '"Do so" substitutes for "transform communication".' },
        { sentence: 'The new policy is more effective than the previous one.', explanation: '"One" substitutes for "policy".' },
        { sentence: 'I wanted to attend the conference but was unable to.', explanation: 'Ellipsis: "unable to [attend]".' },
        { sentence: 'Education improves employment prospects, and training does too.', explanation: '"Does too" substitutes for "improves employment prospects".' },
        { sentence: 'Will the policy succeed? I believe so.', explanation: '"So" substitutes for "that the policy will succeed".' },
        { sentence: 'Some experts support the proposal; others do not.', explanation: '"Do not" substitutes for "do not support the proposal".' },
        { sentence: 'The government should act, and it appears willing to.', explanation: 'Ellipsis: "willing to [act]".' },
        { sentence: 'This solution is better than any we have considered before.', explanation: 'Ellipsis: "any [solution] we have considered".' },
        { sentence: 'Technology can help, but only if properly implemented.', explanation: 'Ellipsis: "if [it is] properly implemented".' }
      ],
      commonMistakes: [
        { mistake: 'Technology helps, and education helps too.', correction: 'Technology helps, and education does too.', explanation: 'Use "does" to avoid repeating "helps".' },
        { mistake: 'The new policy is better than the old policy.', correction: 'The new policy is better than the old one.', explanation: 'Use "one" to avoid repeating "policy".' },
        { mistake: 'I think that the policy will succeed. I believe that the policy will succeed.', correction: 'I think the policy will succeed. I believe so too.', explanation: 'Use "so" to avoid repeating the clause.' },
        { mistake: 'Some agree and some do not agree.', correction: 'Some agree and some do not.', explanation: 'Ellipsis: omit "agree" after "do not".' },
        { mistake: 'Will it work? I hope it will work.', correction: 'Will it work? I hope so.', explanation: 'Use "so" instead of repeating the clause.' }
      ],
      miniPractice: [
        { question: 'Improve: "Technology helps, and education helps too."', type: 'rewrite' },
        { question: 'Which avoids repetition correctly?', options: ['The new plan is better than the old plan.', 'The new plan is better than the old one.', 'The new plan is better than the old it.', 'The new plan is better than old.'], type: 'multiple-choice' },
        { question: 'Complete: "Will the policy succeed? I believe _____."', type: 'fill-blank' },
        { question: 'Improve: "Some countries have acted, and some countries have not acted."', type: 'rewrite' },
        { question: 'Which is correct?', options: ['I wanted to help but I could not help.', 'I wanted to help but could not.', 'I wanted to help but could not to.', 'I wanted to help but not could.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Technology helps, and education does too.',
        'The new plan is better than the old one.',
        'so',
        'Some countries have acted, and some have not. / Some countries have acted, while others have not.',
        'I wanted to help but could not.'
      ],
      quickRecap: 'Ellipsis: omit repeated words that are understood. Substitution: use "do/does/did" for verbs, "so" for clauses, "one/ones" for nouns. These techniques avoid repetition and create natural, sophisticated prose.',
      grammarForm: `**Ellipsis patterns:**
- Verb ellipsis: "Some have, others have not."
- Infinitive ellipsis: "I wanted to but couldn't."
- Clause ellipsis: "If necessary, [we will act]."

**Substitution patterns:**
- do/does/did: "Technology helps, education does too."
- so: "I believe so." / "I hope so."
- one/ones: "the new one" / "the better ones"
- not: "I hope not." / "I think not."`,
      grammarUse: `**When to use:**
- Avoiding repetition
- Creating natural flow
- Comparing and contrasting
- Responding to questions

**IELTS applications:**
- Comparing options in Task 2
- Avoiding repetitive language
- Creating sophisticated prose

**Tip:** Don't overuse - some repetition is natural and can add emphasis.`,
      sentenceUpgrade: [
        { basic: 'Technology has benefits, and education has benefits too.', upgraded: 'Technology has significant benefits, and education does too.' },
        { basic: 'The new approach is better than the old approach.', upgraded: 'The new approach is considerably more effective than the previous one.' },
        { basic: 'Some countries have acted. Some countries have not acted.', upgraded: 'While some countries have taken decisive action, others have not.' }
      ]
    }
  },
  {
    id: 'grammar-21',
    title: 'Future Forms and Predictions',
    slug: 'future-forms-predictions',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Future Forms',
    description: 'Master different future forms to express predictions, plans, and possibilities.',
    is_premium: true,
    is_published: true,
    view_count: 1380,
    created_at: '2024-02-19T10:00:00Z',
    updated_at: '2024-02-19T10:00:00Z',
    estimated_time: 22,
    content: {
      title: 'Future Forms and Predictions',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Choose the correct future form for different contexts',
        'Express predictions with appropriate certainty',
        'Use future forms effectively in Task 1 and Task 2'
      ],
      coreExplanation: `English has multiple ways to express the future, each with different nuances.

**Will:** predictions, decisions, promises
- "Technology will transform the workplace."

**Going to:** plans, intentions, evidence-based predictions
- "The government is going to introduce new regulations."

**Present continuous:** fixed arrangements
- "The conference is starting next Monday."

**Present simple:** timetables, schedules
- "The deadline is next Friday."

**Future continuous:** actions in progress at a future time
- "By 2030, many people will be working remotely."

**Future perfect:** completed before a future time
- "By 2050, renewable energy will have replaced fossil fuels."

Choosing the right form shows grammatical sophistication.`,
      examples: [
        { sentence: 'Technology will continue to transform the way we work.', explanation: '"Will" for general prediction.' },
        { sentence: 'The government is going to implement stricter regulations.', explanation: '"Going to" for planned action.' },
        { sentence: 'By 2050, the global population will have reached 10 billion.', explanation: 'Future perfect for completion before future time.' },
        { sentence: 'In the coming decades, many industries will be undergoing significant changes.', explanation: 'Future continuous for ongoing future process.' },
        { sentence: 'The policy is likely to have far-reaching consequences.', explanation: '"Is likely to" for probable outcome.' },
        { sentence: 'Experts predict that sea levels will rise significantly.', explanation: '"Will" for expert predictions.' },
        { sentence: 'The conference is taking place next month.', explanation: 'Present continuous for fixed arrangement.' },
        { sentence: 'By the end of this century, many species will have become extinct.', explanation: 'Future perfect for completed future event.' },
        { sentence: 'This trend is set to continue in the foreseeable future.', explanation: '"Is set to" for expected continuation.' },
        { sentence: 'The situation is bound to improve once the reforms take effect.', explanation: '"Is bound to" for certain outcome.' }
      ],
      commonMistakes: [
        { mistake: 'I will go to the meeting tomorrow. (fixed plan)', correction: 'I am going to the meeting tomorrow.', explanation: 'Use present continuous for fixed arrangements.' },
        { mistake: 'By 2050, the population will reach 10 billion.', correction: 'By 2050, the population will have reached 10 billion.', explanation: 'Use future perfect for completion before a future time.' },
        { mistake: 'The train will leave at 9 AM.', correction: 'The train leaves at 9 AM.', explanation: 'Use present simple for timetables and schedules.' },
        { mistake: 'I think it will to rain tomorrow.', correction: 'I think it will rain tomorrow.', explanation: 'No "to" after "will".' },
        { mistake: 'By next year, I will study here for five years.', correction: 'By next year, I will have been studying here for five years.', explanation: 'Use future perfect continuous for duration up to a future point.' }
      ],
      miniPractice: [
        { question: 'By 2050, renewable energy _____ (replace) fossil fuels in many countries.', type: 'fill-blank' },
        { question: 'Which is correct for a fixed arrangement?', options: ['I will meet them tomorrow.', 'I am meeting them tomorrow.', 'I meet them tomorrow.', 'I going to meet them tomorrow.'], type: 'multiple-choice' },
        { question: 'Complete: "Experts predict that the trend _____ (continue)."', type: 'fill-blank' },
        { question: 'The conference _____ (start) at 9 AM. (timetable)', type: 'fill-blank' },
        { question: 'Which shows future perfect?', options: ['Technology will change.', 'Technology will have changed.', 'Technology is changing.', 'Technology changes.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'will have replaced',
        'I am meeting them tomorrow.',
        'will continue',
        'starts',
        'Technology will have changed.'
      ],
      quickRecap: 'Will = predictions, decisions. Going to = plans, evidence-based predictions. Present continuous = fixed arrangements. Present simple = timetables. Future perfect = completed before future time. Choose the form that matches your meaning!',
      grammarForm: `**Will:** will + base verb
**Going to:** am/is/are + going to + base verb
**Present continuous:** am/is/are + -ing
**Present simple:** base verb / -s
**Future continuous:** will + be + -ing
**Future perfect:** will + have + past participle
**Future perfect continuous:** will + have + been + -ing`,
      grammarUse: `**IELTS applications:**
- Task 1: Predictions about trends
- Task 2: Discussing future consequences

**Certainty expressions:**
- Certain: will, is bound to, is certain to
- Probable: is likely to, will probably
- Possible: may, might, could

**Time expressions:**
- By 2050, by the end of the century
- In the coming years/decades
- In the foreseeable future`,
      sentenceUpgrade: [
        { basic: 'Technology will change things.', upgraded: 'Technology will fundamentally transform the way we live and work in the coming decades.' },
        { basic: 'The population will grow.', upgraded: 'By the middle of this century, the global population will have exceeded 9 billion.' },
        { basic: 'Things will get better.', upgraded: 'The situation is likely to improve significantly once comprehensive reforms have been implemented.' }
      ]
    }
  },
  {
    id: 'grammar-22',
    title: 'Causative Structures',
    slug: 'causative-structures',
    type: 'grammar',
    level: 'advanced',
    topic: 'Causatives',
    description: 'Use causative structures to describe actions done by others.',
    is_premium: true,
    is_published: true,
    view_count: 850,
    created_at: '2024-02-21T10:00:00Z',
    updated_at: '2024-02-21T10:00:00Z',
    estimated_time: 21,
    content: {
      title: 'Causative Structures',
      targetLevel: 'Band 7.0 - 8.0',
      whatYouWillLearn: [
        'Use have/get something done correctly',
        'Express cause and effect with make, let, help',
        'Apply causative structures in formal writing'
      ],
      coreExplanation: `Causative structures describe actions done by others or causing someone to do something.

**Have/Get something done:** someone else does the action for you
- "The government had the policy reviewed by experts."
- "We need to get this problem addressed."

**Make + object + infinitive:** force/cause someone to do
- "The crisis made governments reconsider their policies."

**Let + object + infinitive:** allow someone to do
- "The policy lets citizens participate in decision-making."

**Help + object + (to) infinitive:** assist someone to do
- "Technology helps people (to) communicate more effectively."

These structures are useful for discussing policies, processes, and cause-effect relationships.`,
      examples: [
        { sentence: 'The government had the proposal reviewed by independent experts.', explanation: 'Have + object + past participle (someone else did the reviewing).' },
        { sentence: 'We need to get this issue addressed as soon as possible.', explanation: 'Get + object + past participle (arrange for action).' },
        { sentence: 'The economic crisis made many companies reconsider their strategies.', explanation: 'Make + object + infinitive (caused them to reconsider).' },
        { sentence: 'The new regulations let businesses operate more freely.', explanation: 'Let + object + infinitive (allow).' },
        { sentence: 'Technology has helped millions of people access education.', explanation: 'Help + object + infinitive (assist).' },
        { sentence: 'The policy will have significant changes implemented by 2025.', explanation: 'Future causative with "have".' },
        { sentence: 'Citizens should get their voices heard through democratic processes.', explanation: 'Get + object + past participle (ensure action happens).' },
        { sentence: 'The evidence made researchers question their assumptions.', explanation: 'Make + object + infinitive (caused questioning).' },
        { sentence: 'The government is having new infrastructure built across the country.', explanation: 'Present continuous causative.' },
        { sentence: 'Effective policies help communities develop sustainably.', explanation: 'Help + object + infinitive (facilitate).' }
      ],
      commonMistakes: [
        { mistake: 'I had my car to repair.', correction: 'I had my car repaired.', explanation: 'Use past participle (not infinitive) after have + object.' },
        { mistake: 'The crisis made governments to reconsider.', correction: 'The crisis made governments reconsider.', explanation: 'No "to" after make + object.' },
        { mistake: 'The policy lets citizens to participate.', correction: 'The policy lets citizens participate.', explanation: 'No "to" after let + object.' },
        { mistake: 'I got my essay to check.', correction: 'I got my essay checked.', explanation: 'Use past participle after get + object.' },
        { mistake: 'Technology helps people communicating.', correction: 'Technology helps people communicate / to communicate.', explanation: 'Use infinitive (with or without "to") after help + object.' }
      ],
      miniPractice: [
        { question: 'The government had the policy _____ (review) by experts.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['The crisis made them to change.', 'The crisis made them change.', 'The crisis made them changing.', 'The crisis made them changed.'], type: 'multiple-choice' },
        { question: 'Complete: "We need to get this problem _____ (address)."', type: 'fill-blank' },
        { question: 'The new law lets citizens _____ (vote) online.', type: 'fill-blank' },
        { question: 'Which shows correct causative?', options: ['I had my car to repair.', 'I had my car repaired.', 'I had my car repairing.', 'I had repaired my car.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'reviewed',
        'The crisis made them change.',
        'addressed',
        'vote',
        'I had my car repaired.'
      ],
      quickRecap: 'Have/get + object + past participle (someone else does it). Make + object + infinitive (cause/force). Let + object + infinitive (allow). Help + object + (to) infinitive (assist). No "to" after make and let!',
      grammarForm: `**Have something done:**
- have + object + past participle
- "I had my essay checked."

**Get something done:**
- get + object + past participle
- "I got my essay checked."

**Make someone do:**
- make + object + base infinitive
- "The crisis made them change."

**Let someone do:**
- let + object + base infinitive
- "The policy lets them participate."

**Help someone do:**
- help + object + (to) infinitive
- "Technology helps people communicate."`,
      grammarUse: `**IELTS applications:**
- Discussing policies and their effects
- Describing processes
- Cause-effect relationships

**Formal alternatives:**
- "have something done" is more formal than "get something done"
- Passive causatives for impersonal style

**Common contexts:**
- Government actions
- Policy implementation
- Social changes`,
      sentenceUpgrade: [
        { basic: 'The government changed the policy.', upgraded: 'The government had the policy comprehensively revised by a panel of independent experts.' },
        { basic: 'The crisis forced companies to change.', upgraded: 'The economic crisis made numerous organizations fundamentally reconsider their operational strategies.' },
        { basic: 'Technology helps people learn.', upgraded: 'Digital technology has helped millions of individuals access educational resources that were previously unavailable.' }
      ]
    }
  },
  {
    id: 'grammar-23',
    title: 'Emphasis with Do/Does/Did',
    slug: 'emphasis-do-does-did',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Emphatic Do',
    description: 'Use emphatic do/does/did to add emphasis and contrast in your writing.',
    is_premium: true,
    is_published: true,
    view_count: 920,
    created_at: '2024-02-23T10:00:00Z',
    updated_at: '2024-02-23T10:00:00Z',
    estimated_time: 18,
    content: {
      title: 'Emphasis with Do/Does/Did',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Use emphatic do/does/did to strengthen statements',
        'Add emphasis for contrast and persuasion',
        'Apply emphatic structures in Task 2 essays'
      ],
      coreExplanation: `Emphatic do/does/did adds emphasis to affirmative statements, often for contrast or persuasion.

**Normal:** "The government takes action."
**Emphatic:** "The government does take action."

**Uses:**
- Contrast: "While critics argue X, the evidence does suggest Y."
- Persuasion: "This approach does offer significant benefits."
- Concession: "Although problems exist, progress does occur."
- Correction: "Contrary to popular belief, technology does improve lives."

Emphatic do is particularly useful in Task 2 for:
- Acknowledging opposing views while maintaining your position
- Strengthening key arguments
- Adding nuance to your writing`,
      examples: [
        { sentence: 'While some argue that technology is harmful, it does offer significant benefits.', explanation: 'Emphatic "does" for contrast with opposing view.' },
        { sentence: 'The evidence does suggest that education improves social mobility.', explanation: 'Emphatic "does" strengthens the claim.' },
        { sentence: 'Although challenges exist, progress does occur over time.', explanation: 'Emphatic "does" for concession.' },
        { sentence: 'Contrary to popular belief, renewable energy does provide reliable power.', explanation: 'Emphatic "does" for correction.' },
        { sentence: 'The policy did achieve some of its objectives, despite criticism.', explanation: 'Emphatic "did" for past emphasis.' },
        { sentence: 'Governments do have a responsibility to protect the environment.', explanation: 'Emphatic "do" for strong assertion.' },
        { sentence: 'This approach does require significant investment, but the returns are substantial.', explanation: 'Emphatic "does" acknowledges a point while maintaining position.' },
        { sentence: 'Research does indicate a correlation between education and income.', explanation: 'Emphatic "does" strengthens evidence claim.' },
        { sentence: 'While not perfect, the system does function effectively.', explanation: 'Emphatic "does" for qualified support.' },
        { sentence: 'The data did reveal some unexpected patterns.', explanation: 'Emphatic "did" for past discovery.' }
      ],
      commonMistakes: [
        { mistake: 'The government does takes action.', correction: 'The government does take action.', explanation: 'Use base form after emphatic do/does/did.' },
        { mistake: 'Technology does is important.', correction: 'Technology is important. / Technology does matter.', explanation: 'Don\'t use emphatic do with "be" - use it with action verbs.' },
        { mistake: 'I do am convinced.', correction: 'I am convinced. / I do believe this.', explanation: 'Emphatic do doesn\'t work with "be".' },
        { mistake: 'The policy does worked well.', correction: 'The policy did work well.', explanation: 'Use "did" (not "does") for past tense.' },
        { mistake: 'They does agree with this.', correction: 'They do agree with this.', explanation: 'Use "do" with plural subjects, "does" with singular.' }
      ],
      miniPractice: [
        { question: 'Add emphasis: "While critics disagree, the evidence suggests this is true."', type: 'rewrite' },
        { question: 'Which is correct?', options: ['Technology does is important.', 'Technology does matter.', 'Technology does matters.', 'Technology do matter.'], type: 'multiple-choice' },
        { question: 'Complete: "Although challenges exist, progress _____ (do) occur."', type: 'fill-blank' },
        { question: 'Add emphasis: "The policy achieved its goals." (past)', type: 'rewrite' },
        { question: 'Which shows correct emphatic use?', options: ['I do am sure.', 'I do believe this.', 'I does believe this.', 'I do believes this.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'While critics disagree, the evidence does suggest this is true.',
        'Technology does matter.',
        'does',
        'The policy did achieve its goals.',
        'I do believe this.'
      ],
      quickRecap: 'Emphatic do/does/did adds emphasis to affirmative statements. Use for contrast, persuasion, concession, and correction. Form: do/does/did + base verb. Don\'t use with "be". Great for Task 2 balanced arguments!',
      grammarForm: `**Present:**
- I/you/we/they + do + base verb
- he/she/it + does + base verb

**Past:**
- did + base verb (all subjects)

**Note:** Cannot use with "be" verb
- Wrong: "It does is important."
- Right: "It is important." / "It does matter."`,
      grammarUse: `**Functions:**
- Contrast: "While X, Y does..."
- Persuasion: "This does offer..."
- Concession: "Although X, Y does..."
- Correction: "Contrary to belief, X does..."

**IELTS applications:**
- Balanced arguments in Task 2
- Acknowledging opposing views
- Strengthening your position
- Adding nuance`,
      sentenceUpgrade: [
        { basic: 'Technology has benefits despite problems.', upgraded: 'While technology presents certain challenges, it does offer substantial benefits that cannot be overlooked.' },
        { basic: 'The policy worked, despite criticism.', upgraded: 'Despite widespread criticism, the policy did achieve several of its primary objectives.' },
        { basic: 'Education helps people get jobs.', upgraded: 'The evidence does suggest that education significantly enhances employment prospects.' }
      ]
    }
  },
  {
    id: 'grammar-24',
    title: 'Prepositions in Academic Writing',
    slug: 'prepositions-academic-writing',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Prepositions',
    description: 'Master common preposition patterns and collocations for academic writing.',
    is_premium: true,
    is_published: true,
    view_count: 1450,
    created_at: '2024-02-25T10:00:00Z',
    updated_at: '2024-02-25T10:00:00Z',
    estimated_time: 23,
    content: {
      title: 'Prepositions in Academic Writing',
      targetLevel: 'Band 6.0 - 7.5',
      whatYouWillLearn: [
        'Use correct prepositions with common academic verbs and nouns',
        'Avoid common preposition errors',
        'Apply preposition collocations in IELTS Writing'
      ],
      coreExplanation: `Preposition errors are common and can lower your band score. Many prepositions must be learned as collocations.

**Common patterns:**
- Verb + preposition: depend on, result in, lead to
- Adjective + preposition: responsible for, different from, similar to
- Noun + preposition: impact on, access to, increase in

**Key principle:** Learn prepositions as part of phrases, not in isolation.

**Common errors:**
- "depend of" → "depend on"
- "different than" → "different from"
- "impact to" → "impact on"

Correct preposition use demonstrates grammatical accuracy.`,
      examples: [
        { sentence: 'The success of the policy depends on effective implementation.', explanation: '"Depend on" - not "depend of".' },
        { sentence: 'Technology has had a significant impact on modern society.', explanation: '"Impact on" - not "impact to".' },
        { sentence: 'This approach is different from traditional methods.', explanation: '"Different from" - not "different than/to".' },
        { sentence: 'The increase in population has led to housing shortages.', explanation: '"Increase in" and "lead to".' },
        { sentence: 'Citizens should have access to quality education.', explanation: '"Access to" - not "access of".' },
        { sentence: 'The government is responsible for protecting the environment.', explanation: '"Responsible for" - not "responsible of".' },
        { sentence: 'There is a correlation between education and income.', explanation: '"Correlation between" - not "correlation of".' },
        { sentence: 'The policy resulted in significant improvements.', explanation: '"Result in" - not "result to".' },
        { sentence: 'This is similar to the approach used in other countries.', explanation: '"Similar to" - not "similar with".' },
        { sentence: 'The demand for renewable energy is increasing.', explanation: '"Demand for" - not "demand of".' }
      ],
      commonMistakes: [
        { mistake: 'The success depends of many factors.', correction: 'The success depends on many factors.', explanation: '"Depend on" not "depend of".' },
        { mistake: 'Technology has an impact to society.', correction: 'Technology has an impact on society.', explanation: '"Impact on" not "impact to".' },
        { mistake: 'This is different than the previous approach.', correction: 'This is different from the previous approach.', explanation: '"Different from" in formal writing.' },
        { mistake: 'The increase of prices is concerning.', correction: 'The increase in prices is concerning.', explanation: '"Increase in" not "increase of".' },
        { mistake: 'People need access of education.', correction: 'People need access to education.', explanation: '"Access to" not "access of".' }
      ],
      miniPractice: [
        { question: 'The success of the policy depends _____ implementation.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['impact to society', 'impact on society', 'impact of society', 'impact for society'], type: 'multiple-choice' },
        { question: 'Complete: "This approach is different _____ traditional methods."', type: 'fill-blank' },
        { question: 'The increase _____ population has caused problems.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['responsible of', 'responsible for', 'responsible to', 'responsible with'], type: 'multiple-choice' }
      ],
      answerKey: [
        'on',
        'impact on society',
        'from',
        'in',
        'responsible for'
      ],
      quickRecap: 'Learn prepositions as collocations: depend ON, impact ON, different FROM, increase IN, access TO, responsible FOR, result IN, lead TO, similar TO, demand FOR. Preposition errors are common - memorize the correct patterns!',
      grammarForm: `**Verb + preposition:**
- depend on, rely on
- result in, lead to
- contribute to, respond to
- consist of, approve of
- focus on, concentrate on

**Adjective + preposition:**
- responsible for, famous for
- different from, separate from
- similar to, related to
- aware of, capable of
- interested in, involved in

**Noun + preposition:**
- impact on, effect on
- access to, approach to
- increase in, decrease in
- demand for, need for
- correlation between`,
      grammarUse: `**IELTS-specific patterns:**
- "The impact of X on Y"
- "The relationship between X and Y"
- "Access to education/healthcare"
- "Responsible for + noun/-ing"
- "Different from + noun"

**Common in Task 2:**
- "This depends on..."
- "This leads to..."
- "This results in..."
- "This is similar to..."`,
      sentenceUpgrade: [
        { basic: 'Technology affects society.', upgraded: 'Technology has had a profound impact on virtually every aspect of modern society.' },
        { basic: 'Success needs good implementation.', upgraded: 'The success of any policy depends fundamentally on effective implementation.' },
        { basic: 'This is not like the old way.', upgraded: 'This approach is markedly different from traditional methodologies.' }
      ]
    }
  },
  {
    id: 'grammar-25',
    title: 'Quantifiers and Determiners',
    slug: 'quantifiers-determiners',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Quantifiers',
    description: 'Use quantifiers correctly to express amounts and proportions.',
    is_premium: true,
    is_published: true,
    view_count: 1120,
    created_at: '2024-02-27T10:00:00Z',
    updated_at: '2024-02-27T10:00:00Z',
    estimated_time: 20,
    content: {
      title: 'Quantifiers and Determiners',
      targetLevel: 'Band 6.0 - 7.5',
      whatYouWillLearn: [
        'Choose correct quantifiers for countable and uncountable nouns',
        'Express proportions accurately in Task 1',
        'Avoid common quantifier errors'
      ],
      coreExplanation: `Quantifiers express amounts and must match the noun type (countable/uncountable).

**Countable only:** many, few, a few, several, a number of
**Uncountable only:** much, little, a little, a great deal of
**Both:** some, any, a lot of, plenty of, most, all

**Key distinctions:**
- "Few" (negative) vs "a few" (positive)
- "Little" (negative) vs "a little" (positive)
- "The number of" (singular) vs "a number of" (plural)

**Task 1 specific:**
- "The majority of..."
- "A significant proportion of..."
- "A minority of..."

Correct quantifier use is essential for Task 1 accuracy.`,
      examples: [
        { sentence: 'Many countries have implemented environmental policies.', explanation: '"Many" with countable plural noun.' },
        { sentence: 'There is little evidence to support this claim.', explanation: '"Little" with uncountable noun (negative meaning).' },
        { sentence: 'A significant number of students prefer online learning.', explanation: '"A number of" + plural verb.' },
        { sentence: 'The majority of respondents supported the proposal.', explanation: '"The majority of" for large proportion.' },
        { sentence: 'Few people realize the severity of the problem.', explanation: '"Few" (negative) - not many people.' },
        { sentence: 'A few changes could make a significant difference.', explanation: '"A few" (positive) - some changes.' },
        { sentence: 'Much research has been conducted on this topic.', explanation: '"Much" with uncountable noun.' },
        { sentence: 'A great deal of attention has been paid to this issue.', explanation: '"A great deal of" with uncountable noun.' },
        { sentence: 'Several factors contribute to this phenomenon.', explanation: '"Several" with countable plural.' },
        { sentence: 'The number of internet users has increased dramatically.', explanation: '"The number of" + singular verb.' }
      ],
      commonMistakes: [
        { mistake: 'Many informations are available.', correction: 'Much information is available.', explanation: '"Information" is uncountable - use "much".' },
        { mistake: 'There are less people now.', correction: 'There are fewer people now.', explanation: '"Fewer" for countable, "less" for uncountable.' },
        { mistake: 'A number of students has complained.', correction: 'A number of students have complained.', explanation: '"A number of" takes plural verb.' },
        { mistake: 'The number of problems are increasing.', correction: 'The number of problems is increasing.', explanation: '"The number of" takes singular verb.' },
        { mistake: 'Few of money was spent.', correction: 'Little money was spent.', explanation: '"Little" for uncountable, "few" for countable.' }
      ],
      miniPractice: [
        { question: '_____ (Many/Much) research has been conducted on this topic.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['less people', 'fewer people', 'few of people', 'little people'], type: 'multiple-choice' },
        { question: 'A number of students _____ (has/have) expressed concerns.', type: 'fill-blank' },
        { question: 'The number of participants _____ (has/have) doubled.', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['many informations', 'much information', 'many information', 'a lot informations'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Much',
        'fewer people',
        'have',
        'has',
        'much information'
      ],
      quickRecap: 'Countable: many, few, a few, several, a number of (plural verb). Uncountable: much, little, a little, a great deal of. "The number of" = singular verb. "A number of" = plural verb. "Fewer" for countable, "less" for uncountable.',
      grammarForm: `**Countable only:**
- many, few, a few
- several, a number of
- fewer (comparative)

**Uncountable only:**
- much, little, a little
- a great deal of, a large amount of
- less (comparative)

**Both:**
- some, any, no
- a lot of, lots of, plenty of
- most, all, enough`,
      grammarUse: `**Task 1 expressions:**
- The majority of / A minority of
- A significant/small proportion of
- A considerable/substantial number of
- Approximately half of
- Nearly/Almost all

**Agreement:**
- "The number of X" + singular verb
- "A number of X" + plural verb
- "The majority of X" + usually plural verb`,
      sentenceUpgrade: [
        { basic: 'Many people think this.', upgraded: 'A significant proportion of the population holds this view.' },
        { basic: 'Not much research exists.', upgraded: 'Relatively little research has been conducted in this area.' },
        { basic: 'Some countries have acted.', upgraded: 'A number of countries have implemented comprehensive measures.' }
      ]
    }
  },
  {
    id: 'grammar-26',
    title: 'Word Order and Sentence Structure',
    slug: 'word-order-sentence-structure',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Word Order',
    description: 'Master English word order rules for clear, accurate sentences.',
    is_premium: true,
    is_published: true,
    view_count: 1280,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
    estimated_time: 21,
    content: {
      title: 'Word Order and Sentence Structure',
      targetLevel: 'Band 6.0 - 7.5',
      whatYouWillLearn: [
        'Apply correct English word order in complex sentences',
        'Position adverbs and adjectives correctly',
        'Avoid word order errors that affect clarity'
      ],
      coreExplanation: `English has relatively fixed word order compared to many languages. Errors can cause confusion and lower your band score.

**Basic order:** Subject + Verb + Object + Adverb (SVOA)
- "The government (S) implemented (V) the policy (O) successfully (A)."

**Adjective order:** Opinion-Size-Age-Shape-Color-Origin-Material-Purpose + Noun
- "A significant new environmental policy"

**Adverb positions:**
- Frequency adverbs: before main verb, after "be"
- Manner adverbs: usually at end
- Time/place: usually at end (place before time)

**Indirect questions:** statement word order
- "I wonder what the solution is." (NOT "what is the solution")`,
      examples: [
        { sentence: 'The government has recently implemented new environmental regulations.', explanation: 'Frequency adverb "recently" before main verb.' },
        { sentence: 'Technology is increasingly being used in education.', explanation: 'Adverb "increasingly" before main verb in passive.' },
        { sentence: 'I wonder what the best approach would be.', explanation: 'Statement word order in indirect question.' },
        { sentence: 'The policy was implemented successfully in several countries.', explanation: 'Manner adverb at end, place before manner.' },
        { sentence: 'A comprehensive new government policy has been announced.', explanation: 'Adjective order: opinion + age + origin + noun.' },
        { sentence: 'The situation has significantly improved over the past decade.', explanation: 'Degree adverb before main verb.' },
        { sentence: 'People often underestimate the importance of education.', explanation: 'Frequency adverb before main verb.' },
        { sentence: 'The report clearly demonstrates the need for reform.', explanation: 'Manner adverb before verb for emphasis.' },
        { sentence: 'We need to consider carefully what steps should be taken.', explanation: 'Adverb after verb, statement order in noun clause.' },
        { sentence: 'The problem is particularly acute in developing countries.', explanation: 'Degree adverb before adjective.' }
      ],
      commonMistakes: [
        { mistake: 'I wonder what is the solution.', correction: 'I wonder what the solution is.', explanation: 'Use statement word order in indirect questions.' },
        { mistake: 'The government implemented successfully the policy.', correction: 'The government successfully implemented the policy. / The government implemented the policy successfully.', explanation: 'Don\'t split verb and object with adverb.' },
        { mistake: 'He explained me the problem.', correction: 'He explained the problem to me.', explanation: '"Explain" needs "to" before indirect object.' },
        { mistake: 'I want to know where is he going.', correction: 'I want to know where he is going.', explanation: 'Statement word order in indirect questions.' },
        { mistake: 'A policy environmental new', correction: 'A new environmental policy', explanation: 'Adjectives before noun in correct order.' }
      ],
      miniPractice: [
        { question: 'Correct: "I wonder what is the best solution."', type: 'rewrite' },
        { question: 'Which is correct?', options: ['The government implemented successfully the policy.', 'The government successfully implemented the policy.', 'The government the policy successfully implemented.', 'Successfully the government implemented the policy.'], type: 'multiple-choice' },
        { question: 'Correct: "He explained me the situation."', type: 'rewrite' },
        { question: 'Put in order: "policy / environmental / new / comprehensive / a"', type: 'rewrite' },
        { question: 'Which is correct?', options: ['I want to know where is he.', 'I want to know where he is.', 'I want to know where is he going.', 'I want to know he is where.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'I wonder what the best solution is.',
        'The government successfully implemented the policy.',
        'He explained the situation to me.',
        'a comprehensive new environmental policy',
        'I want to know where he is.'
      ],
      quickRecap: 'Basic order: Subject-Verb-Object-Adverb. Indirect questions use statement order. Frequency adverbs before main verb. Don\'t split verb and object. Adjective order: opinion-size-age-shape-color-origin-material-purpose.',
      grammarForm: `**Basic sentence order:**
- Subject + Verb + Object + Adverb
- Subject + Verb + Indirect Object + Direct Object

**Adverb positions:**
- Frequency: before main verb, after "be"
- Manner: usually at end
- Degree: before adjective/adverb
- Time/Place: at end (place before time)

**Indirect questions:**
- Statement word order
- "I wonder what it is." (NOT "what is it")`,
      grammarUse: `**Common patterns:**
- "I wonder/know/understand + wh-word + statement order"
- "Could you tell me + wh-word + statement order"
- Adverb + verb (for emphasis)
- Verb + adverb (neutral)

**Adjective order (OSASCOMP):**
- Opinion, Size, Age, Shape, Color, Origin, Material, Purpose`,
      sentenceUpgrade: [
        { basic: 'I want to know what is the answer.', upgraded: 'I would like to understand what the most effective solution might be.' },
        { basic: 'The government made quickly a decision.', upgraded: 'The government swiftly reached a decision regarding the proposed reforms.' },
        { basic: 'A policy new environmental', upgraded: 'A comprehensive new environmental policy has been introduced.' }
      ]
    }
  },
  {
    id: 'grammar-27',
    title: 'Concession and Contrast Structures',
    slug: 'concession-contrast-structures',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Concession',
    description: 'Master structures for acknowledging opposing views and showing contrast.',
    is_premium: true,
    is_published: true,
    view_count: 1350,
    created_at: '2024-03-03T10:00:00Z',
    updated_at: '2024-03-03T10:00:00Z',
    estimated_time: 22,
    content: {
      title: 'Concession and Contrast Structures',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Use concession structures to acknowledge opposing views',
        'Show contrast effectively in balanced arguments',
        'Apply these structures in Task 2 essays'
      ],
      coreExplanation: `Concession structures acknowledge a point while maintaining your position. They're essential for balanced Task 2 essays.

**Concession (acknowledging a point):**
- Although/Even though + clause
- Despite/In spite of + noun/-ing
- While/Whilst + clause
- Admittedly, ... However, ...

**Contrast (showing difference):**
- However, Nevertheless, Nonetheless
- On the other hand, In contrast
- Whereas, While

**Key principle:** Concession shows you've considered both sides, which demonstrates critical thinking.

Using varied concession structures shows grammatical range.`,
      examples: [
        { sentence: 'Although technology has many benefits, it also poses significant challenges.', explanation: '"Although" + clause for concession.' },
        { sentence: 'Despite the high costs, the policy has been largely successful.', explanation: '"Despite" + noun for concession.' },
        { sentence: 'While some argue that globalization is harmful, others see it as beneficial.', explanation: '"While" for contrasting views.' },
        { sentence: 'Admittedly, there are drawbacks. However, the benefits outweigh them.', explanation: '"Admittedly" acknowledges a point.' },
        { sentence: 'In spite of facing numerous obstacles, the project succeeded.', explanation: '"In spite of" + -ing for concession.' },
        { sentence: 'The policy has been effective. Nevertheless, improvements are needed.', explanation: '"Nevertheless" for contrast after acknowledgment.' },
        { sentence: 'Even though the evidence is limited, the trend is clear.', explanation: '"Even though" for strong concession.' },
        { sentence: 'Whereas urban areas have good infrastructure, rural regions often lack basic services.', explanation: '"Whereas" for formal contrast.' },
        { sentence: 'Granted, the approach has limitations. Nonetheless, it offers a viable solution.', explanation: '"Granted" + "Nonetheless" for concession-contrast.' },
        { sentence: 'Much as I appreciate the argument, I cannot agree with the conclusion.', explanation: '"Much as" for formal concession.' }
      ],
      commonMistakes: [
        { mistake: 'Although technology is useful, but it has problems.', correction: 'Although technology is useful, it has problems.', explanation: 'Don\'t use "but" after "although".' },
        { mistake: 'Despite technology is useful, it has problems.', correction: 'Despite being useful, technology has problems.', explanation: '"Despite" + noun/-ing, not clause.' },
        { mistake: 'In spite of the costs are high, the policy succeeded.', correction: 'In spite of the high costs, the policy succeeded.', explanation: '"In spite of" + noun, not clause.' },
        { mistake: 'However the policy failed, it had some benefits.', correction: 'Although the policy failed, it had some benefits apply.', explanation: '"However" is an adverb, not a conjunction.' },
        { mistake: 'While on the other hand, some disagree.', correction: 'On the other hand, some disagree.', explanation: 'Don\'t combine "while" with "on the other hand".' }
      ],
      miniPractice: [
        { question: 'Complete: "_____ the high costs, the project was successful."', type: 'fill-blank' },
        { question: 'Which is correct?', options: ['Although it is useful, but it has problems.', 'Although it is useful, it has problems.', 'Although it is useful, however it has problems.', 'Although it is useful, yet it has problems.'], type: 'multiple-choice' },
        { question: 'Correct: "Despite the policy is expensive, it works."', type: 'rewrite' },
        { question: 'Complete: "_____, there are drawbacks. _____, the benefits outweigh them."', type: 'fill-blank' },
        { question: 'Which shows correct concession?', options: ['Despite being expensive, the policy works.', 'Despite is expensive, the policy works.', 'Despite the policy expensive, it works.', 'Despite that expensive, the policy works.'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Despite / In spite of',
        'Although it is useful, it has problems.',
        'Despite being expensive, the policy works. / Despite the expense, the policy works.',
        'Admittedly / However (or similar pairs)',
        'Despite being expensive, the policy works.'
      ],
      quickRecap: 'Although/Even though/While + clause. Despite/In spite of + noun/-ing (NOT clause). Don\'t use "but" after "although". Use concession to show balanced thinking in Task 2. Vary your structures for Band 7+!',
      grammarForm: `**Concession conjunctions (+ clause):**
- Although, Even though, Though
- While, Whilst
- Much as

**Concession prepositions (+ noun/-ing):**
- Despite, In spite of
- Notwithstanding (very formal)

**Concession adverbs:**
- Admittedly, Granted, Certainly
- However, Nevertheless, Nonetheless

**Contrast:**
- However, Nevertheless, Nonetheless
- On the other hand, In contrast
- Whereas, While`,
      grammarUse: `**Task 2 patterns:**
- "Although X, Y" (balanced view)
- "Despite X, Y" (acknowledging limitation)
- "Admittedly, X. However, Y" (concession then position)
- "While some argue X, others believe Y" (contrasting views)

**Showing critical thinking:**
- Acknowledge opposing views
- Show you've considered both sides
- Maintain your position clearly`,
      sentenceUpgrade: [
        { basic: 'Technology is useful but has problems.', upgraded: 'Although technology offers numerous advantages, it nevertheless presents certain challenges that must be addressed.' },
        { basic: 'The policy is expensive but works.', upgraded: 'Despite the substantial financial investment required, the policy has proven remarkably effective.' },
        { basic: 'Some agree, some disagree.', upgraded: 'While proponents argue that this approach is beneficial, critics maintain that alternative solutions would be more effective.' }
      ]
    }
  },
  {
    id: 'grammar-28',
    title: 'Band 6 to 7 Grammar Upgrade',
    slug: 'band-6-to-7-grammar-upgrade',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Band Upgrade',
    description: 'Upgrade your grammar from Band 6 to Band 7 with key improvements.',
    is_premium: true,
    is_published: true,
    view_count: 2100,
    created_at: '2024-03-05T10:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
    estimated_time: 25,
    recommended_order: 1,
    content: {
      title: 'Band 6 to 7 Grammar Upgrade',
      targetLevel: 'Band 6.0 → 7.0',
      whatYouWillLearn: [
        'Identify common Band 6 grammar patterns',
        'Transform simple sentences into complex structures',
        'Apply key upgrades for Band 7'
      ],
      coreExplanation: `Band 6 writing often uses correct but simple grammar. Band 7 requires a wider range of complex structures used accurately.

**Key upgrades:**
1. Simple → Complex sentences (relative clauses, adverbial clauses)
2. Active → Passive voice (where appropriate)
3. Basic modals → Varied modals with hedging
4. Simple connectors → Sophisticated linking
5. Basic tenses → Perfect tenses and conditionals

**Band 6 pattern:** "Technology is important. It helps people communicate."
**Band 7 upgrade:** "Technology, which has revolutionized communication, plays an increasingly important role in modern society."

The key is using complex structures ACCURATELY, not just frequently.`,
      examples: [
        { sentence: 'Band 6: Technology is useful. It helps education. → Band 7: Technology, which has transformed numerous sectors, plays a crucial role in modern education.', explanation: 'Simple sentences → Complex with relative clause.' },
        { sentence: 'Band 6: The government should help. → Band 7: It could be argued that the government should provide comprehensive support.', explanation: 'Direct statement → Hedged with passive reporting.' },
        { sentence: 'Band 6: Many people think this. → Band 7: It is widely acknowledged that this perspective has considerable merit.', explanation: 'Simple reporting → Impersonal passive.' },
        { sentence: 'Band 6: If the government helps, things will improve. → Band 7: Were the government to implement comprehensive reforms, significant improvements would inevitably follow.', explanation: 'First conditional → Inverted second conditional.' },
        { sentence: 'Band 6: Technology changed communication. → Band 7: Technology has fundamentally transformed the way in which people communicate.', explanation: 'Past simple → Present perfect with elaboration.' },
        { sentence: 'Band 6: Some people agree. Some people disagree. → Band 7: While some individuals support this view, others maintain that alternative approaches would be more effective.', explanation: 'Two sentences → Complex contrast structure.' },
        { sentence: 'Band 6: Education is important because it helps jobs. → Band 7: Education is of paramount importance, primarily because it significantly enhances employment prospects.', explanation: 'Basic reason → Elaborated with emphasis.' },
        { sentence: 'Band 6: The problem is big. → Band 7: The problem is of considerable magnitude and demands immediate attention.', explanation: 'Simple adjective → Noun phrase with elaboration.' },
        { sentence: 'Band 6: Technology will change things. → Band 7: Technology is poised to fundamentally reshape numerous aspects of contemporary society.', explanation: 'Simple future → Sophisticated future expression.' },
        { sentence: 'Band 6: I think education is important. → Band 7: I firmly believe that education constitutes the cornerstone of social and economic development.', explanation: 'Simple opinion → Strengthened with formal vocabulary.' }
      ],
      commonMistakes: [
        { mistake: 'Using complex structures incorrectly', correction: 'Master structures before using them', explanation: 'Accuracy matters more than complexity. Wrong complex structures lower your score.' },
        { mistake: 'Overusing passive voice', correction: 'Use passive strategically, not everywhere', explanation: 'Too much passive makes writing unclear. Use it for emphasis and formality.' },
        { mistake: 'Adding unnecessary complexity', correction: 'Keep meaning clear while adding sophistication', explanation: 'Complex doesn\'t mean confusing. Clarity is still essential.' },
        { mistake: 'Using the same complex structure repeatedly', correction: 'Vary your structures', explanation: 'Range means using DIFFERENT complex structures, not the same one repeatedly.' },
        { mistake: 'Ignoring simple structures entirely', correction: 'Mix simple and complex for readability', explanation: 'Good writing uses a mix. Not every sentence needs to be complex.' }
      ],
      miniPractice: [
        { question: 'Upgrade: "Technology is useful. It helps people."', type: 'rewrite' },
        { question: 'Upgrade: "The government should act."', type: 'rewrite' },
        { question: 'Upgrade: "Many people think education is important."', type: 'rewrite' },
        { question: 'Upgrade: "If the government helps, things will improve."', type: 'rewrite' },
        { question: 'Upgrade: "Some agree. Some disagree."', type: 'rewrite' }
      ],
      answerKey: [
        'Technology, which has revolutionized numerous sectors, offers significant benefits to society.',
        'It could be argued that the government should implement comprehensive measures to address this issue.',
        'It is widely acknowledged that education plays a crucial role in personal and societal development.',
        'Were the government to provide adequate support, the situation would improve significantly.',
        'While some individuals support this perspective, others maintain that alternative approaches would be more effective.'
      ],
      quickRecap: 'Band 7 needs: complex sentences (relative/adverbial clauses), varied modals with hedging, passive for formality, sophisticated connectors, perfect tenses. Key: use complex structures ACCURATELY. Mix simple and complex for readability.',
      grammarForm: `**Key Band 7 structures:**
1. Relative clauses (defining and non-defining)
2. Adverbial clauses (although, while, whereas)
3. Passive voice (strategic use)
4. Perfect tenses (present perfect, past perfect)
5. Conditionals (all types, including inverted)
6. Modal verbs with hedging
7. Cleft sentences (It is X that...)
8. Participle clauses`,
      grammarUse: `**Upgrade strategies:**
- Simple → Complex sentences
- Active → Passive (where appropriate)
- Direct → Hedged statements
- Basic → Sophisticated connectors
- Present/past → Perfect tenses

**Balance:**
- Mix simple and complex
- Accuracy over complexity
- Clarity always essential`,
      sentenceUpgrade: [
        { basic: 'Technology is important.', upgraded: 'Technology, which has revolutionized virtually every aspect of modern life, plays an increasingly crucial role in contemporary society.' },
        { basic: 'The government should help.', upgraded: 'It is imperative that the government implement comprehensive measures to address this pressing issue.' },
        { basic: 'Education helps people get jobs.', upgraded: 'Education significantly enhances employment prospects, thereby contributing to both individual prosperity and broader economic development.' }
      ]
    }
  },
  {
    id: 'grammar-29',
    title: 'Band 7 to 8 Grammar Precision',
    slug: 'band-7-to-8-grammar-precision',
    type: 'grammar',
    level: 'advanced',
    topic: 'Band Upgrade',
    description: 'Achieve Band 8 grammar through precision, sophistication, and error-free writing.',
    is_premium: true,
    is_published: true,
    view_count: 1650,
    created_at: '2024-03-07T10:00:00Z',
    updated_at: '2024-03-07T10:00:00Z',
    estimated_time: 28,
    recommended_order: 2,
    content: {
      title: 'Band 7 to 8 Grammar Precision',
      targetLevel: 'Band 7.0 → 8.0',
      whatYouWillLearn: [
        'Achieve near-error-free grammar',
        'Use sophisticated structures naturally',
        'Demonstrate full grammatical control'
      ],
      coreExplanation: `Band 8 requires "a wide range of structures" with "the majority of sentences error-free" and "only very occasional errors."

**Band 8 characteristics:**
1. Wide range of complex structures used naturally
2. Very rare errors (not affecting communication)
3. Sophisticated structures feel effortless
4. Perfect control of tense, agreement, articles

**Key differences from Band 7:**
- Band 7: Good range, some errors
- Band 8: Wide range, rare errors, natural sophistication

**Focus areas:**
- Eliminate common errors (articles, prepositions, agreement)
- Use advanced structures naturally (inversion, cleft, subjunctive)
- Maintain accuracy under exam pressure`,
      examples: [
        { sentence: 'Not only does technology enhance productivity, but it also creates unprecedented opportunities for innovation.', explanation: 'Inversion with correlative - natural and accurate.' },
        { sentence: 'It is education that serves as the cornerstone of sustainable development, a fact that is increasingly recognized globally.', explanation: 'Cleft sentence with appositive - sophisticated.' },
        { sentence: 'Were governments to prioritize environmental protection, the consequences of climate change could be significantly mitigated.', explanation: 'Inverted conditional - formal and precise.' },
        { sentence: 'Having thoroughly analyzed the available evidence, researchers concluded that the correlation was statistically significant.', explanation: 'Perfect participle clause - concise and sophisticated.' },
        { sentence: 'The extent to which technology has transformed communication cannot be overstated.', explanation: 'Complex noun phrase with relative clause.' },
        { sentence: 'It is imperative that immediate action be taken to address this pressing issue.', explanation: 'Subjunctive mood - formal and accurate.' },
        { sentence: 'What distinguishes successful economies is their sustained investment in human capital.', explanation: 'What-cleft for emphasis - natural use.' },
        { sentence: 'The policy, which was implemented with considerable optimism, has nonetheless failed to achieve its intended objectives.', explanation: 'Non-defining clause with contrast - complex but clear.' },
        { sentence: 'So significant is this challenge that it demands the attention of policymakers worldwide.', explanation: 'Inverted structure for emphasis.' },
        { sentence: 'The evidence, compelling though it may be, does not conclusively prove causation.', explanation: 'Concessive inversion - highly sophisticated.' }
      ],
      commonMistakes: [
        { mistake: 'Forcing sophisticated structures unnaturally', correction: 'Let complexity arise naturally from meaning', explanation: 'Band 8 sophistication feels effortless, not forced.' },
        { mistake: 'Small errors in articles and prepositions', correction: 'Eliminate these common errors completely', explanation: 'Band 8 has "very occasional errors" - small mistakes matter.' },
        { mistake: 'Inconsistent tense use', correction: 'Maintain perfect tense consistency', explanation: 'Tense shifts without reason lower your score.' },
        { mistake: 'Subject-verb agreement errors', correction: 'Check agreement in complex sentences', explanation: 'Agreement errors are more common in complex sentences - check carefully.' },
        { mistake: 'Overcomplicating simple ideas', correction: 'Match complexity to content', explanation: 'Simple ideas can be expressed simply. Complexity should serve meaning.' }
      ],
      miniPractice: [
        { question: 'Write a sentence using inversion for emphasis about technology.', type: 'rewrite' },
        { question: 'Write a sentence using a cleft structure about education.', type: 'rewrite' },
        { question: 'Write a sentence using the subjunctive mood about government action.', type: 'rewrite' },
        { question: 'Write a sentence using a participle clause about research.', type: 'rewrite' },
        { question: 'Write a sentence using concessive inversion about evidence.', type: 'rewrite' }
      ],
      answerKey: [
        'Never before has technology had such a profound impact on human communication.',
        'It is education that holds the key to addressing social inequality.',
        'It is essential that the government take immediate action.',
        'Having examined the data thoroughly, researchers identified several significant patterns.',
        'Compelling though the evidence may be, it does not establish causation.'
      ],
      quickRecap: 'Band 8 = wide range + rare errors + natural sophistication. Eliminate small errors (articles, prepositions, agreement). Use advanced structures naturally (inversion, cleft, subjunctive, participle clauses). Complexity should serve meaning, not show off.',
      grammarForm: `**Band 8 structures:**
1. Inversion (negative adverb, conditional)
2. Cleft sentences (it-cleft, what-cleft)
3. Subjunctive mood
4. Participle clauses (present, past, perfect)
5. Complex noun phrases
6. Concessive structures
7. Ellipsis and substitution
8. Mixed conditionals`,
      grammarUse: `**Band 8 characteristics:**
- Wide range of structures
- Majority of sentences error-free
- Only very occasional errors
- Sophistication feels natural

**Focus areas:**
- Eliminate article errors
- Perfect preposition use
- Consistent tense control
- Accurate agreement
- Natural complexity`,
      sentenceUpgrade: [
        { basic: 'Technology is very important for communication.', upgraded: 'So profound has been the impact of technology on communication that it has fundamentally reshaped human interaction.' },
        { basic: 'Education helps reduce inequality.', upgraded: 'It is education that serves as the most effective mechanism for addressing entrenched social inequality.' },
        { basic: 'The government should act quickly.', upgraded: 'It is imperative that the government act with urgency to implement comprehensive reforms.' }
      ]
    }
  },
  {
    id: 'grammar-30',
    title: 'Common Grammar Errors to Avoid',
    slug: 'common-grammar-errors-avoid',
    type: 'grammar',
    level: 'intermediate',
    topic: 'Error Correction',
    description: 'Identify and eliminate the most common grammar errors in IELTS Writing.',
    is_premium: false,
    is_published: true,
    view_count: 2450,
    created_at: '2024-03-09T10:00:00Z',
    updated_at: '2024-03-09T10:00:00Z',
    estimated_time: 24,
    content: {
      title: 'Common Grammar Errors to Avoid',
      targetLevel: 'Band 5.5 - 7.0',
      whatYouWillLearn: [
        'Identify the most common grammar errors in IELTS Writing',
        'Understand why these errors occur',
        'Apply strategies to eliminate them'
      ],
      coreExplanation: `Certain grammar errors appear repeatedly in IELTS Writing. Eliminating these can significantly improve your band score.

**Top 10 error categories:**
1. Subject-verb agreement
2. Article errors (a/an/the/zero)
3. Preposition errors
4. Tense consistency
5. Run-on sentences and fragments
6. Pronoun reference
7. Word form errors
8. Parallel structure
9. Conditional errors
10. Comma splices

**Key principle:** Most errors are predictable. Learn the patterns and check for them in your writing.

Reducing errors is often easier than adding complexity - and just as effective for improving your score.`,
      examples: [
        { sentence: 'Error: The number of students are increasing. → Correct: The number of students is increasing.', explanation: 'Subject-verb agreement: "number" is singular.' },
        { sentence: 'Error: The technology is important. → Correct: Technology is important.', explanation: 'Article error: no article for general uncountable nouns.' },
        { sentence: 'Error: This depends of many factors. → Correct: This depends on many factors.', explanation: 'Preposition error: "depend on" not "depend of".' },
        { sentence: 'Error: Yesterday, I have seen the news. → Correct: Yesterday, I saw the news.', explanation: 'Tense error: specific past time needs past simple.' },
        { sentence: 'Error: Technology is useful, it helps communication. → Correct: Technology is useful; it helps communication. / Technology is useful because it helps communication.', explanation: 'Comma splice: two independent clauses need proper connection.' },
        { sentence: 'Error: Everyone should do their best. → Correct: Everyone should do his or her best. / People should do their best.', explanation: 'Pronoun agreement: "everyone" is singular (though "their" is increasingly accepted).' },
        { sentence: 'Error: This is an importantly issue. → Correct: This is an important issue.', explanation: 'Word form error: adjective needed, not adverb.' },
        { sentence: 'Error: I like reading, to write, and swimming. → Correct: I like reading, writing, and swimming.', explanation: 'Parallel structure: all items should have same form.' },
        { sentence: 'Error: If I would have time, I would study. → Correct: If I had time, I would study.', explanation: 'Conditional error: no "would" in if-clause.' },
        { sentence: 'Error: Although it is useful, but it has problems. → Correct: Although it is useful, it has problems.', explanation: 'Redundant conjunction: don\'t use "but" after "although".' }
      ],
      commonMistakes: [
        { mistake: 'Not proofreading for common errors', correction: 'Always check for the top 10 error types', explanation: 'Most errors are predictable - check for them systematically.' },
        { mistake: 'Focusing only on complexity', correction: 'Balance complexity with accuracy', explanation: 'Reducing errors is as important as adding complexity.' },
        { mistake: 'Writing too fast without checking', correction: 'Leave time for proofreading', explanation: 'Save 3-5 minutes to check your writing.' },
        { mistake: 'Not knowing your personal error patterns', correction: 'Identify and target your common mistakes', explanation: 'Everyone has patterns - learn yours and focus on them.' },
        { mistake: 'Trying to fix everything at once', correction: 'Focus on one error type at a time', explanation: 'Systematic improvement is more effective than trying to fix everything.' }
      ],
      miniPractice: [
        { question: 'Correct: "The number of problems are increasing."', type: 'rewrite' },
        { question: 'Correct: "The education is important for development."', type: 'rewrite' },
        { question: 'Correct: "This depends of many factors."', type: 'rewrite' },
        { question: 'Correct: "Technology is useful, it helps people."', type: 'rewrite' },
        { question: 'Correct: "If I would have more time, I would study."', type: 'rewrite' }
      ],
      answerKey: [
        'The number of problems is increasing.',
        'Education is important for development.',
        'This depends on many factors.',
        'Technology is useful; it helps people. / Technology is useful because it helps people.',
        'If I had more time, I would study.'
      ],
      quickRecap: 'Top errors: agreement, articles, prepositions, tenses, comma splices, word forms, parallel structure, conditionals. Check systematically. Leave time for proofreading. Know your personal error patterns. Reducing errors improves your score!',
      grammarForm: `**Error checklist:**
1. Subject-verb agreement (especially with "number of")
2. Articles (the/a/an/zero)
3. Prepositions (on/in/of/to)
4. Tense consistency
5. Sentence boundaries (no comma splices)
6. Pronoun reference
7. Word forms (noun/verb/adjective/adverb)
8. Parallel structure
9. Conditionals (no "would" in if-clause)
10. Redundant conjunctions`,
      grammarFormItems: [
        {
          name: 'Subject-Verb Agreement',
          tags: ['Writing Task 1', 'Writing Task 2'],
          definition: 'The verb must agree with its subject in number. Singular subjects need singular verbs, plural subjects need plural verbs.',
          comparison: {
            standard: 'The number of students are increasing every year.',
            band8: 'The number of students is increasing every year.'
          }
        },
        {
          name: 'Article Usage',
          tags: ['Writing Task 2'],
          definition: 'Use "the" for specific nouns, "a/an" for general singular countable nouns, and no article for general plural/uncountable nouns.',
          comparison: {
            standard: 'The technology is important for the development.',
            band8: 'Technology is important for development.'
          }
        },
        {
          name: 'Preposition Errors',
          tags: ['Writing Task 1', 'Writing Task 2'],
          definition: 'Prepositions must be used correctly with specific verbs and expressions. Common errors include "depend of" instead of "depend on".',
          comparison: {
            standard: 'This depends of many factors and results of the study.',
            band8: 'This depends on many factors and the results of the study.'
          }
        },
        {
          name: 'Tense Consistency',
          tags: ['Writing Task 1'],
          definition: 'Maintain consistent tense throughout your writing. Use past simple for specific past times, present perfect for unspecified times.',
          comparison: {
            standard: 'Yesterday, I have seen the news and I am shocked.',
            band8: 'Yesterday, I saw the news and I was shocked.'
          }
        },
        {
          name: 'Comma Splices',
          tags: ['Writing Task 2'],
          definition: 'Two independent clauses cannot be joined with just a comma. Use a semicolon, conjunction, or separate sentences.',
          comparison: {
            standard: 'Technology is useful, it helps communication.',
            band8: 'Technology is useful because it helps communication.'
          }
        },
        {
          name: 'Word Form Errors',
          tags: ['Writing Task 1', 'Writing Task 2'],
          definition: 'Use the correct word form (noun, verb, adjective, adverb) based on the grammatical context.',
          comparison: {
            standard: 'This is an importantly issue that needs immediately attention.',
            band8: 'This is an important issue that needs immediate attention.'
          }
        },
        {
          name: 'Parallel Structure',
          tags: ['Writing Task 2'],
          definition: 'Items in a list or comparison should have the same grammatical form for clarity and flow.',
          comparison: {
            standard: 'I like reading, to write, and swimming.',
            band8: 'I like reading, writing, and swimming.'
          }
        },
        {
          name: 'Conditional Errors',
          tags: ['Writing Task 2'],
          definition: 'In second conditionals, use past simple in the if-clause and would + infinitive in the main clause. Never use "would" in the if-clause.',
          comparison: {
            standard: 'If I would have more time, I would study harder.',
            band8: 'If I had more time, I would study harder.'
          }
        }
      ],
      grammarUse:`**Proofreading strategy:**
1. Read once for meaning
2. Check subject-verb agreement
3. Check articles
4. Check prepositions
5. Check tense consistency
6. Check sentence boundaries

**Time management:**
- Save 3-5 minutes for proofreading
- Focus on your known weak areas
- Check one error type at a time`,
      sentenceUpgrade: [
        { basic: 'Error-filled: The technology is important, it help people communicating better.', upgraded: 'Technology is important because it helps people communicate more effectively.' },
        { basic: 'Error-filled: If government would invest more, the situation will improve.', upgraded: 'If the government invested more, the situation would improve.' },
        { basic: 'Error-filled: The number of students are increasing, this cause problems.', upgraded: 'The number of students is increasing, which causes various problems.' }
      ]
    }
  }
];
