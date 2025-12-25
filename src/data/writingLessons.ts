import { Lesson } from '@/types';

// Writing Practice Lessons with Band Upgrade Ladder Approach
// Each lesson includes: Model Answer, Band Upgrade Ladder (6→7→8→9), Examiner Perspective, Common Mistakes

export const WRITING_LESSONS: Lesson[] = [
  // ============================================
  // TASK 2: Opinion Essays
  // ============================================
  {
    id: 'writing-task2-opinion-1',
    title: 'Opinion Essay: Technology in Education',
    slug: 'opinion-essay-technology-education',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 2 Opinion',
    description: 'Master the opinion essay structure with a Band 9 model answer on technology in education. Includes Band Upgrade Ladder showing exactly how to improve from Band 6 to Band 9.',
    is_premium: false,
    is_published: true,
    view_count: 2500,
    created_at: '2025-06-01T10:00:00Z',
    updated_at: '2025-06-01T10:00:00Z',
    estimated_time: 45,
    content: {
      title: 'Opinion Essay: Technology in Education',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure a Band 9 opinion essay in 4 paragraphs',
        'See exactly what changes between Band 6, 7, 8, and 9 answers',
        'Use examiner-approved phrases for expressing opinions',
        'Avoid the top 5 mistakes that drop your band score'
      ],
      coreExplanation: `**IELTS Task 2 Question:**
"Some people believe that technology has made education more accessible and effective. Others argue that traditional teaching methods are still superior. Discuss both views and give your own opinion."

**Planning (5 minutes):**
1. Identify the question type: Discussion + Opinion
2. Brainstorm 2 ideas for each view
3. Decide your opinion (you can agree with one side or take a balanced view)
4. Plan your structure: Introduction → View 1 → View 2 + Your Opinion → Conclusion

**Band 9 Structure Map:**
- Introduction: Paraphrase topic + Thesis statement (your opinion)
- Body 1: First view with 2 supporting points + examples
- Body 2: Second view + YOUR opinion with strong reasoning
- Conclusion: Summarize + Restate opinion (different words)

**Time Management:**
- Planning: 5 minutes
- Introduction: 5 minutes
- Body paragraphs: 25 minutes (12-13 each)
- Conclusion: 5 minutes
- Review: 5 minutes`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Introduction):**\n\n"The integration of technology into educational settings has sparked considerable debate regarding its impact on learning outcomes. While some advocate for digital tools as transformative educational resources, others maintain that conventional pedagogical approaches remain more effective. This essay will examine both perspectives before presenting my view that a balanced integration of technology enhances rather than replaces traditional teaching."', explanation: '**Why Band 9:** Clear paraphrase (no copying), sophisticated vocabulary (integration, pedagogical, transformative), complex sentence structure, clear thesis statement showing the essay direction.' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 1 - Technology View):**\n\n"Proponents of educational technology argue that digital platforms democratize access to knowledge. Online courses from prestigious institutions, for instance, enable students in remote areas to receive instruction that would otherwise be geographically inaccessible. Furthermore, interactive learning applications can adapt to individual learning paces, providing personalized feedback that traditional classroom settings cannot offer at scale. A study by MIT demonstrated that students using adaptive learning software showed 30% improvement in retention compared to traditional methods."', explanation: '**Why Band 9:** Topic sentence + 2 developed points + specific example with data. Uses "for instance", "furthermore" for cohesion. Academic vocabulary: democratize, prestigious, adaptive, retention.' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 2 - Traditional + Opinion):**\n\n"Conversely, advocates of traditional education emphasize the irreplaceable value of human interaction in learning. Face-to-face instruction allows teachers to respond to non-verbal cues, adjust explanations in real-time, and foster critical thinking through Socratic dialogue. However, I believe this argument presents a false dichotomy. The most effective educational approach integrates technological tools within a framework of human-led instruction, leveraging the strengths of both methodologies. For example, flipped classrooms use video lectures for content delivery while reserving classroom time for discussion and problem-solving."', explanation: '**Why Band 9:** Presents opposing view fairly, then pivots to own opinion with "However, I believe". Uses sophisticated argument (false dichotomy). Provides concrete example (flipped classrooms). Complex grammar: relative clauses, gerunds, conditional structures.' },
        { sentence: '**BAND 9 MODEL ANSWER (Conclusion):**\n\n"In conclusion, while both technological and traditional approaches offer distinct advantages, the optimal educational strategy synthesizes these methodologies rather than treating them as mutually exclusive. As education continues to evolve, institutions that embrace this integrated approach will best prepare students for an increasingly digital world while preserving the essential human elements of learning."', explanation: '**Why Band 9:** Summarizes without repeating exact words, reinforces opinion, ends with forward-looking statement. Uses sophisticated vocabulary: synthesizes, mutually exclusive, optimal.' },
        { sentence: '**BAND UPGRADE LADDER - Introduction:**\n\n**Band 6:** "Nowadays, technology is used in education. Some people think it is good and some people think traditional teaching is better. I will discuss both sides."\n\n**Band 7:** "Technology has become increasingly common in education. While some believe digital tools improve learning, others prefer traditional methods. This essay will examine both views and present my opinion."\n\n**Band 8:** "The role of technology in education has become a subject of debate. Some argue that digital resources enhance learning accessibility, while others contend that conventional teaching remains superior. This essay will discuss both perspectives before presenting my view."\n\n**Band 9:** "The integration of technology into educational settings has sparked considerable debate regarding its impact on learning outcomes. While some advocate for digital tools as transformative educational resources, others maintain that conventional pedagogical approaches remain more effective."', explanation: '**What Changed:** Band 6→7: Added complexity, removed "nowadays". Band 7→8: More sophisticated vocabulary (contend, conventional), clearer structure. Band 8→9: Academic register (integration, pedagogical, transformative), complex sentence with embedded clause.' },
        { sentence: '**BAND UPGRADE LADDER - Body Paragraph:**\n\n**Band 6:** "Technology is good for education because students can learn online. They can watch videos and do exercises. This helps them learn better."\n\n**Band 7:** "Technology benefits education by providing online learning opportunities. Students can access video lectures and interactive exercises, which helps them understand topics more effectively. For example, Khan Academy offers free courses to millions of students."\n\n**Band 8:** "Educational technology offers significant advantages, particularly in terms of accessibility. Online platforms enable students from diverse backgrounds to access quality instruction regardless of geographical constraints. Interactive applications, moreover, can provide personalized learning experiences that adapt to individual needs."\n\n**Band 9:** "Proponents of educational technology argue that digital platforms democratize access to knowledge. Online courses from prestigious institutions, for instance, enable students in remote areas to receive instruction that would otherwise be geographically inaccessible. Furthermore, interactive learning applications can adapt to individual learning paces, providing personalized feedback that traditional classroom settings cannot offer at scale."', explanation: '**What Changed:** Band 6→7: Added specific example, better linking. Band 7→8: More sophisticated vocabulary, developed reasoning. Band 8→9: Academic argument style (Proponents argue), precise vocabulary (democratize, prestigious), complex grammar, specific evidence.' },
        { sentence: '**EXAMINER PERSPECTIVE - Task Response (Band 9):**\n\n"This response fully addresses all parts of the task. The candidate discusses both views with equal depth, clearly states their own opinion, and supports all points with relevant examples. The position is consistent throughout the essay."', explanation: 'Task Response is 25% of your score. Band 9 requires: addressing ALL parts of the question, fully developed position, relevant extended examples.' },
        { sentence: '**EXAMINER PERSPECTIVE - Coherence & Cohesion (Band 9):**\n\n"Ideas are logically organized with clear progression. Paragraphing is appropriate. A wide range of cohesive devices is used accurately (while, furthermore, however, for instance, conversely). There is no mechanical overuse of linking words."', explanation: 'Coherence is 25% of your score. Band 9 requires: logical organization, appropriate paragraphing, skillful use of cohesive devices without overuse.' },
        { sentence: '**EXAMINER PERSPECTIVE - Lexical Resource (Band 9):**\n\n"The candidate uses a wide range of vocabulary with very natural and sophisticated control. Collocations are used accurately (sparked debate, pedagogical approaches, leverage strengths). Less common vocabulary is used with precision (democratize, Socratic dialogue, false dichotomy)."', explanation: 'Vocabulary is 25% of your score. Band 9 requires: wide range, sophisticated control, natural collocations, precise use of less common words.' },
        { sentence: '**EXAMINER PERSPECTIVE - Grammatical Range & Accuracy (Band 9):**\n\n"A wide range of structures is used with full flexibility and accuracy. Complex sentences are frequent and error-free. Examples include: relative clauses, conditional structures, passive voice, gerunds, and complex noun phrases."', explanation: 'Grammar is 25% of your score. Band 9 requires: wide range of structures, full flexibility, rare errors, complex sentences used naturally.' },
        { sentence: '**USEFUL PHRASES FOR OPINION ESSAYS:**\n\n**Introducing views:**\n- Proponents of X argue that...\n- Advocates of traditional methods maintain that...\n- Those who support X contend that...\n\n**Giving your opinion:**\n- I am convinced that...\n- From my perspective...\n- I firmly believe that...\n- However, I would argue that...\n\n**Presenting a balanced view:**\n- While both approaches have merit...\n- This presents a false dichotomy...\n- The optimal approach synthesizes...\n\n**Concluding:**\n- In conclusion, while X offers advantages...\n- Ultimately, the evidence suggests...\n- Taking all factors into consideration...', explanation: 'These phrases are examiner-approved and demonstrate sophisticated language use. Memorize 2-3 from each category.' },
        { sentence: '**ALTERNATIVE VOCABULARY:**\n\n**Instead of "important":** crucial, vital, essential, paramount, significant\n**Instead of "good":** beneficial, advantageous, valuable, effective\n**Instead of "bad":** detrimental, harmful, counterproductive, problematic\n**Instead of "think":** believe, maintain, argue, contend, assert\n**Instead of "show":** demonstrate, illustrate, indicate, reveal, highlight', explanation: 'Using varied vocabulary throughout your essay demonstrates lexical resource. Never repeat the same word more than twice.' },
        { sentence: '**WORD COUNT CHECK:**\n\nThis model answer is 298 words - within the ideal range of 270-300 words for Task 2. Writing significantly more than 300 words risks:\n- Running out of time\n- Making more errors\n- Including irrelevant information\n\nWriting fewer than 250 words will be penalized for Task Response.', explanation: 'Aim for 270-300 words. Quality over quantity - a well-developed 280-word essay scores higher than a rushed 350-word essay with errors.' }
      ],
      commonMistakes: [
        { mistake: 'Starting with "In today\'s modern world" or "Nowadays"', correction: 'Start with a direct paraphrase of the topic: "The integration of technology into educational settings..."', explanation: 'These phrases are overused and add no value. Examiners see them thousands of times. Start with substance.' },
        { mistake: 'Writing "I think" repeatedly', correction: 'Use varied opinion phrases: "I am convinced that", "From my perspective", "I firmly believe"', explanation: 'Repeating "I think" shows limited vocabulary. Use each opinion phrase only once.' },
        { mistake: 'Not giving your own opinion in a discussion essay', correction: 'Always state your opinion clearly, usually in Body 2 or Conclusion', explanation: 'The question asks for YOUR opinion. Failing to give one drops your Task Response score significantly.' },
        { mistake: 'Using memorized phrases that don\'t fit the topic', correction: 'Adapt your language to the specific question. Generic phrases sound unnatural.', explanation: 'Examiners can identify memorized content. It suggests you cannot use English flexibly.' },
        { mistake: 'Writing a one-sided essay for a "discuss both views" question', correction: 'Dedicate equal space to both views, even if you strongly agree with one side', explanation: 'Task Response requires addressing ALL parts. Ignoring one view = Band 5-6 maximum for Task Response.' }
      ],
      miniPractice: [
        { question: 'What is the ideal word count for IELTS Task 2?', options: ['200-220 words', '250-270 words', '270-300 words', '350-400 words'], type: 'multiple-choice' },
        { question: 'Rewrite this Band 6 sentence at Band 8+ level: "Technology is good for students because they can learn anywhere."', type: 'rewrite' },
        { question: 'Which phrase is most appropriate for introducing an opposing view?', options: ['But some people think...', 'Conversely, advocates of X argue...', 'On the other hand...', 'However, others say...'], type: 'multiple-choice' },
        { question: 'Complete the thesis statement: "This essay will examine both perspectives before _____ my view that..."', type: 'fill-blank' }
      ],
      answerKey: [
        '270-300 words',
        'Educational technology offers significant advantages in terms of accessibility, enabling students to engage with learning materials regardless of geographical constraints.',
        'Conversely, advocates of X argue...',
        'presenting'
      ],
      quickRecap: 'Band 9 Opinion Essay Formula: 1) Paraphrase + clear thesis, 2) View 1 with examples, 3) View 2 + YOUR opinion with reasoning, 4) Conclusion restating opinion. Use sophisticated vocabulary (pedagogical, democratize), varied sentence structures, and specific examples. Avoid "nowadays", repeated "I think", and one-sided arguments.',
      collocations: [
        'spark debate', 'pedagogical approaches', 'learning outcomes', 'digital platforms',
        'democratize access', 'adaptive learning', 'critical thinking', 'Socratic dialogue',
        'false dichotomy', 'leverage strengths', 'flipped classroom', 'mutually exclusive'
      ],
      synonyms: [
        { word: 'education', synonyms: ['learning', 'instruction', 'pedagogy', 'schooling'] },
        { word: 'technology', synonyms: ['digital tools', 'technological resources', 'digital platforms', 'tech-based solutions'] },
        { word: 'effective', synonyms: ['efficient', 'productive', 'successful', 'impactful'] }
      ],
      speakingLines: [
        'I firmly believe that technology enhances rather than replaces traditional teaching.',
        'From my perspective, the most effective approach integrates both methodologies.',
        'While both views have merit, I am convinced that a balanced approach is optimal.'
      ]
    }
  },
  {
    id: 'writing-task2-opinion-2',
    title: 'Opinion Essay: Environmental Responsibility',
    slug: 'opinion-essay-environmental-responsibility',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 2 Opinion',
    description: 'Learn to write a Band 9 opinion essay on environmental topics with the Band Upgrade Ladder approach.',
    is_premium: true,
    is_published: true,
    view_count: 2100,
    created_at: '2025-06-02T10:00:00Z',
    updated_at: '2025-06-02T10:00:00Z',
    estimated_time: 45,
    content: {
      title: 'Opinion Essay: Environmental Responsibility',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Write a compelling opinion essay on environmental topics',
        'Use Band 9 environmental vocabulary accurately',
        'Structure arguments with clear cause-effect reasoning',
        'See Band 6→9 progression for environmental essays'
      ],
      coreExplanation: `**IELTS Task 2 Question:**
"Some people believe that individuals can do little to protect the environment and that governments and large corporations should take responsibility. To what extent do you agree or disagree?"

**Planning (5 minutes):**
1. Question type: Agree/Disagree (Opinion)
2. Your position: Partially agree - both have roles
3. Ideas for individuals: reduce consumption, recycle, sustainable choices
4. Ideas for governments/corporations: regulations, infrastructure, large-scale impact

**Band 9 Structure for Agree/Disagree:**
- Introduction: Paraphrase + Clear position (partially agree)
- Body 1: Why governments/corporations have primary responsibility
- Body 2: Why individuals still play a crucial role
- Conclusion: Balanced summary reinforcing position`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Full Essay - 287 words):**\n\n"Environmental degradation has become one of the most pressing challenges of our era, prompting debate about where responsibility for mitigation should lie. While I acknowledge that governmental and corporate action is essential for systemic change, I firmly believe that individual contributions remain indispensable to achieving meaningful environmental progress.\n\nAdmittedly, governments and corporations possess the resources and authority to implement large-scale environmental initiatives. Governmental bodies can enact legislation mandating emissions reductions, invest in renewable energy infrastructure, and establish protected natural areas. Similarly, corporations, particularly those in polluting industries, have the capacity to revolutionize production processes and supply chains. The transition to electric vehicles, for instance, required massive corporate investment that individual consumers could never have initiated independently.\n\nHowever, dismissing individual responsibility overlooks the cumulative impact of collective action. Consumer choices directly influence corporate behavior; the growing demand for sustainable products has compelled numerous companies to adopt environmentally conscious practices. Furthermore, individual actions such as reducing meat consumption, minimizing single-use plastics, and choosing public transportation collectively contribute to significant emissions reductions. Research indicates that if every household in developed nations adopted basic conservation measures, carbon emissions could decrease by up to 20%.\n\nIn conclusion, while governments and corporations undoubtedly bear primary responsibility for environmental protection due to their greater capacity for systemic change, individual actions remain crucial catalysts for both direct environmental benefits and influencing broader institutional behavior. The most effective approach to environmental preservation requires coordinated effort across all levels of society."', explanation: '**Why Band 9:** Addresses the question fully with a nuanced position. Uses sophisticated vocabulary (mitigation, indispensable, cumulative). Complex grammar throughout. Specific example with data. Clear logical progression.' },
        { sentence: '**BAND UPGRADE LADDER - Opening Paragraph:**\n\n**Band 6:** "Many people think that only governments and big companies can help the environment. I partly agree with this idea because both individuals and governments are important."\n\n**Band 7:** "Environmental protection is a major concern today. Some argue that governments and corporations should bear the main responsibility, while individuals can do little. I partially agree, as both levels of action are necessary."\n\n**Band 8:** "The question of environmental responsibility has become increasingly pertinent in recent years. While some contend that meaningful change can only come from governmental and corporate action, I believe that individual contributions, though smaller in scale, remain essential."\n\n**Band 9:** "Environmental degradation has become one of the most pressing challenges of our era, prompting debate about where responsibility for mitigation should lie. While I acknowledge that governmental and corporate action is essential for systemic change, I firmly believe that individual contributions remain indispensable to achieving meaningful environmental progress."', explanation: '**Key Upgrades:** Band 6→7: More formal register, clearer structure. Band 7→8: Sophisticated vocabulary (pertinent, contend), complex sentence structure. Band 8→9: Academic precision (mitigation, systemic change, indispensable), nuanced position with concession (While I acknowledge...).' },
        { sentence: '**ENVIRONMENTAL VOCABULARY - Band 9 Level:**\n\n**Problems:** environmental degradation, ecological damage, biodiversity loss, carbon emissions, deforestation, habitat destruction, pollution, resource depletion\n\n**Solutions:** mitigation strategies, sustainable practices, renewable energy, conservation efforts, emissions reduction, carbon neutrality, circular economy, environmental legislation\n\n**Actions:** implement initiatives, enact legislation, adopt practices, revolutionize processes, minimize impact, transition to, invest in, mandate reductions', explanation: 'Using precise environmental vocabulary demonstrates lexical resource. Avoid vague terms like "help the environment" - use specific terms like "mitigate environmental degradation".' },
        { sentence: '**EXAMINER NOTES:**\n\n**Task Response (Band 9):** "The candidate presents a clear, well-developed position throughout. Both sides of the argument are fully addressed with relevant, extended examples. The conclusion effectively summarizes without repetition."\n\n**Coherence (Band 9):** "Skillful paragraphing with clear topic sentences. Cohesive devices used naturally (Admittedly, However, Furthermore, Similarly). Ideas progress logically."\n\n**Vocabulary (Band 9):** "Wide range of environmental vocabulary used with precision. Collocations are natural (enact legislation, cumulative impact, systemic change). No errors."\n\n**Grammar (Band 9):** "Full range of structures used flexibly. Complex sentences with multiple clauses. Passive voice, conditionals, and relative clauses used accurately."', explanation: 'Understanding examiner criteria helps you target exactly what scores Band 9 in each category.' }
      ],
      commonMistakes: [
        { mistake: 'Taking an extreme position (100% agree or disagree)', correction: 'A nuanced position often scores higher: "While I acknowledge X, I believe Y"', explanation: 'Extreme positions are harder to support with balanced arguments. Nuanced positions show critical thinking.' },
        { mistake: 'Using vague environmental language', correction: 'Use precise terms: "mitigate climate change" not "help the environment"', explanation: 'Vague language suggests limited vocabulary. Precise terms demonstrate lexical resource.' },
        { mistake: 'Forgetting to address "to what extent"', correction: 'Clearly state your degree of agreement: partially, largely, completely', explanation: 'The question asks "to what extent" - you must indicate how much you agree/disagree.' },
        { mistake: 'No specific examples', correction: 'Include at least one specific example with details or data', explanation: 'General statements without examples score lower for Task Response.' },
        { mistake: 'Conclusion introduces new ideas', correction: 'Conclusion should only summarize and reinforce your position', explanation: 'New ideas in the conclusion suggest poor planning and hurt coherence.' }
      ],
      miniPractice: [
        { question: 'Which opening is Band 9 level?', options: ['Nowadays, pollution is a big problem.', 'Environmental degradation has become one of the most pressing challenges of our era.', 'Many people think the environment is important.', 'In this essay, I will discuss the environment.'], type: 'multiple-choice' },
        { question: 'Rewrite at Band 9: "Governments should make laws to help the environment."', type: 'rewrite' },
        { question: 'What does "to what extent" require in your answer?', options: ['A yes or no answer', 'A degree of agreement (partially, largely, etc.)', 'Only one side of the argument', 'A list of examples'], type: 'multiple-choice' },
        { question: 'Complete: "Individual actions, though smaller in scale, remain _____ to achieving environmental progress."', type: 'fill-blank' }
      ],
      answerKey: [
        'Environmental degradation has become one of the most pressing challenges of our era.',
        'Governmental bodies should enact comprehensive environmental legislation mandating emissions reductions and sustainable practices.',
        'A degree of agreement (partially, largely, etc.)',
        'indispensable/essential/crucial'
      ],
      quickRecap: 'For Agree/Disagree essays: Take a nuanced position, use precise environmental vocabulary (mitigation, systemic change, indispensable), include specific examples with data, and ensure your conclusion reinforces your position without new ideas.',
      collocations: [
        'environmental degradation', 'systemic change', 'carbon emissions', 'renewable energy',
        'enact legislation', 'cumulative impact', 'sustainable practices', 'conservation measures',
        'emissions reductions', 'collective action', 'environmental preservation', 'ecological balance'
      ],
      synonyms: [
        { word: 'environment', synonyms: ['ecosystem', 'natural world', 'ecology', 'biosphere'] },
        { word: 'protect', synonyms: ['preserve', 'conserve', 'safeguard', 'maintain'] },
        { word: 'responsibility', synonyms: ['obligation', 'duty', 'accountability', 'onus'] }
      ],
      speakingLines: [
        'While governments bear primary responsibility, individual actions remain crucial.',
        'I firmly believe that environmental protection requires coordinated effort at all levels.',
        'The cumulative impact of individual choices should not be underestimated.'
      ]
    }
  },
  {
    id: 'writing-task2-discussion-1',
    title: 'Discussion Essay: Work-Life Balance',
    slug: 'discussion-essay-work-life-balance',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 2 Discussion',
    description: 'Master the discussion essay format with a Band 9 model on work-life balance. Learn to present both views equally before giving your opinion.',
    is_premium: true,
    is_published: true,
    view_count: 1950,
    created_at: '2025-06-03T10:00:00Z',
    updated_at: '2025-06-03T10:00:00Z',
    estimated_time: 45,
    content: {
      title: 'Discussion Essay: Work-Life Balance',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure a discussion essay with balanced arguments',
        'Present opposing views fairly before stating your opinion',
        'Use sophisticated linking devices for contrasting ideas',
        'Apply the Band Upgrade Ladder to discussion essays'
      ],
      coreExplanation: `**IELTS Task 2 Question:**
"Some people believe that employees should prioritize their careers and work long hours to achieve success. Others argue that maintaining a healthy work-life balance is more important. Discuss both views and give your own opinion."

**Discussion Essay Structure:**
- Introduction: Paraphrase both views + thesis (your opinion preview)
- Body 1: First view (career priority) - present fairly with examples
- Body 2: Second view (work-life balance) - present fairly with examples
- Body 3 (optional): Your opinion with reasoning OR include in Body 2
- Conclusion: Summarize both views + clear opinion

**Key Difference from Opinion Essay:**
In discussion essays, you MUST give equal weight to both views before stating your opinion. Don't dismiss either view.`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Full Essay - 294 words):**\n\n"The debate between career dedication and work-life balance reflects fundamental questions about professional success and personal fulfillment. While compelling arguments exist on both sides, I believe that sustainable success ultimately requires a balanced approach that prioritizes well-being alongside professional achievement.\n\nAdvocates of career prioritization argue that exceptional professional success demands extraordinary commitment. In highly competitive fields such as medicine, law, or entrepreneurship, those who dedicate extensive hours often advance more rapidly and achieve greater recognition. Furthermore, the early career stage may require intensive investment to establish expertise and professional reputation, with the expectation that balance can be achieved later.\n\nConversely, proponents of work-life balance contend that sustainable productivity depends on adequate rest and personal fulfillment. Research consistently demonstrates that overworked employees experience diminished creativity, increased error rates, and higher burnout risk. Moreover, neglecting personal relationships and health for career advancement often proves counterproductive, as these factors ultimately influence professional performance. Countries with shorter working hours, such as Denmark and the Netherlands, consistently rank among the most productive globally.\n\nFrom my perspective, the dichotomy between career success and personal balance represents a false choice. The most successful professionals I have observed integrate both elements, recognizing that peak performance requires physical health, mental clarity, and supportive relationships. Rather than viewing balance as a sacrifice of ambition, it should be understood as a strategic investment in long-term career sustainability.\n\nIn conclusion, while intensive career focus may yield short-term gains, I am convinced that lasting professional success is best achieved through a balanced approach that nurtures both professional ambitions and personal well-being."', explanation: '**Why Band 9:** Both views presented with equal depth and specific examples. Clear opinion stated. Sophisticated vocabulary (sustainable, counterproductive, dichotomy). Complex grammar throughout. Logical progression with excellent cohesion.' },
        { sentence: '**LINKING DEVICES FOR DISCUSSION ESSAYS:**\n\n**Introducing first view:**\n- Advocates of X argue that...\n- Those who support X contend that...\n- Proponents of this view maintain that...\n\n**Introducing contrasting view:**\n- Conversely, proponents of Y believe...\n- On the other hand, those who favor Y argue...\n- In contrast, supporters of Y contend...\n\n**Giving your opinion:**\n- From my perspective...\n- I am inclined to believe that...\n- Having considered both arguments, I believe...\n\n**Showing concession:**\n- While X has merit, I believe Y...\n- Although X is valid, Y is more compelling...\n- Despite the strengths of X, I maintain that Y...', explanation: 'Using varied linking devices demonstrates coherence and cohesion. Avoid overusing "However" and "On the other hand".' },
        { sentence: '**BAND UPGRADE LADDER - Presenting Opposing View:**\n\n**Band 6:** "But other people think work-life balance is important. They say that people need rest and time with family. Working too much is bad for health."\n\n**Band 7:** "On the other hand, supporters of work-life balance argue that rest is essential for productivity. They believe that spending time with family and maintaining health leads to better work performance in the long run."\n\n**Band 8:** "Conversely, proponents of work-life balance contend that sustainable productivity depends on adequate rest and personal fulfillment. Research suggests that overworked employees experience diminished creativity and higher burnout rates."\n\n**Band 9:** "Conversely, proponents of work-life balance contend that sustainable productivity depends on adequate rest and personal fulfillment. Research consistently demonstrates that overworked employees experience diminished creativity, increased error rates, and higher burnout risk. Moreover, neglecting personal relationships and health for career advancement often proves counterproductive, as these factors ultimately influence professional performance."', explanation: '**Key Upgrades:** Band 6→7: Better linking, more developed reasoning. Band 7→8: Academic vocabulary (contend, sustainable, diminished), research reference. Band 8→9: Multiple supporting points, specific evidence, sophisticated cause-effect reasoning.' }
      ],
      commonMistakes: [
        { mistake: 'Giving unequal treatment to both views', correction: 'Dedicate similar word count and depth to each view', explanation: 'Discussion essays require balanced presentation. Favoring one view too heavily hurts Task Response.' },
        { mistake: 'Not stating your own opinion', correction: 'Clearly state your opinion, usually in Body 2 or a separate paragraph', explanation: 'The question asks for YOUR opinion. Omitting it significantly lowers your score.' },
        { mistake: 'Using "I think" in the body paragraphs presenting views', correction: 'Use "Advocates argue" or "Proponents contend" for presenting views objectively', explanation: 'Save "I believe" for when you state YOUR opinion, not when presenting others\' views.' },
        { mistake: 'Weak conclusion that just repeats the introduction', correction: 'Synthesize both views and reinforce your opinion with different words', explanation: 'The conclusion should add value by showing how you weighed both arguments.' },
        { mistake: 'No specific examples or evidence', correction: 'Include at least one specific example or research reference per body paragraph', explanation: 'General statements without support score lower. Specific examples demonstrate developed arguments.' }
      ],
      miniPractice: [
        { question: 'In a discussion essay, when should you state your opinion?', options: ['Only in the introduction', 'Only in the conclusion', 'After presenting both views fairly', 'You should not give an opinion'], type: 'multiple-choice' },
        { question: 'Rewrite at Band 9: "Some people think working hard is good for your career."', type: 'rewrite' },
        { question: 'Which phrase best introduces an opposing view?', options: ['But I think...', 'Conversely, proponents of X contend...', 'However, I disagree...', 'On the other hand, I believe...'], type: 'multiple-choice' },
        { question: 'Complete: "Having considered both arguments, I am _____ to believe that balance is essential."', type: 'fill-blank' }
      ],
      answerKey: [
        'After presenting both views fairly',
        'Advocates of career prioritization argue that exceptional professional success demands extraordinary commitment and intensive investment in one\'s field.',
        'Conversely, proponents of X contend...',
        'inclined'
      ],
      quickRecap: 'Discussion Essay Formula: 1) Paraphrase both views + thesis, 2) View 1 with fair presentation and examples, 3) View 2 with equal depth + your opinion, 4) Conclusion synthesizing views and reinforcing opinion. Use "Advocates argue" for views, save "I believe" for your opinion.',
      collocations: [
        'work-life balance', 'career advancement', 'professional success', 'personal fulfillment',
        'sustainable productivity', 'burnout risk', 'competitive fields', 'intensive investment',
        'peak performance', 'long-term sustainability', 'professional reputation', 'extraordinary commitment'
      ],
      synonyms: [
        { word: 'success', synonyms: ['achievement', 'accomplishment', 'attainment', 'advancement'] },
        { word: 'balance', synonyms: ['equilibrium', 'harmony', 'stability', 'moderation'] },
        { word: 'important', synonyms: ['crucial', 'essential', 'vital', 'significant'] }
      ],
      speakingLines: [
        'I believe sustainable success requires balancing professional and personal priorities.',
        'From my perspective, the dichotomy between career and balance is a false choice.',
        'Having considered both arguments, I am convinced that well-being enhances performance.'
      ]
    }
  },
  // ============================================
  // TASK 1: Academic - Data Description
  // ============================================
  {
    id: 'writing-task1-line-graph',
    title: 'Task 1: Line Graph Analysis',
    slug: 'task1-line-graph-analysis',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 Academic',
    description: 'Master line graph description with Band 9 techniques. Learn to identify trends, make comparisons, and use data-specific vocabulary.',
    is_premium: false,
    is_published: true,
    view_count: 2800,
    created_at: '2025-06-04T10:00:00Z',
    updated_at: '2025-06-04T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Task 1: Line Graph Analysis',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure a Task 1 line graph response in 4 paragraphs',
        'Use Band 9 trend vocabulary (fluctuated, peaked, plateaued)',
        'Make meaningful comparisons between data sets',
        'Avoid the common mistake of listing every data point'
      ],
      coreExplanation: `**Task 1 Line Graph Structure:**
- Introduction (1-2 sentences): Paraphrase what the graph shows
- Overview (2-3 sentences): Main trends/patterns (NO specific numbers)
- Body 1: Detailed description of first trend/group with data
- Body 2: Detailed description of second trend/group with data

**Key Principles:**
1. NEVER copy the question - paraphrase
2. Overview is ESSENTIAL - summarize main patterns
3. Select key data points - don't describe everything
4. Compare data sets - don't just list numbers
5. Use appropriate tense (past for past data, present for current)

**Time Management (20 minutes):**
- Analyze graph: 2-3 minutes
- Plan structure: 2 minutes
- Write: 12-13 minutes
- Check: 2-3 minutes`,
      examples: [
        { sentence: '**SAMPLE LINE GRAPH:**\n\nThe graph shows the percentage of households with internet access in three countries (USA, UK, Japan) from 2000 to 2020.\n\n**Data Points:**\n- USA: 2000 (40%), 2005 (60%), 2010 (75%), 2015 (85%), 2020 (92%)\n- UK: 2000 (25%), 2005 (50%), 2010 (70%), 2015 (88%), 2020 (95%)\n- Japan: 2000 (30%), 2005 (65%), 2010 (80%), 2015 (90%), 2020 (93%)', explanation: 'This is a typical IELTS line graph showing change over time for multiple categories. Your task is to describe trends and make comparisons.' },
        { sentence: '**BAND 9 MODEL ANSWER (168 words):**\n\n"The line graph illustrates the proportion of households with internet connectivity in the United States, United Kingdom, and Japan over a two-decade period from 2000 to 2020.\n\nOverall, all three nations experienced substantial growth in internet adoption, with each country reaching over 90% household connectivity by 2020. Notably, the UK demonstrated the most dramatic increase despite starting from the lowest point.\n\nIn 2000, the USA led with 40% of households connected, while Japan and the UK stood at 30% and 25% respectively. Over the following decade, all three countries showed steady upward trends, with Japan briefly overtaking the USA around 2008 before both converged at approximately 75-80% by 2010.\n\nThe period from 2010 to 2020 saw continued growth, though at a more gradual pace as markets approached saturation. By 2020, the UK had marginally surpassed both the USA and Japan, reaching 95% compared to 93% and 92% respectively."', explanation: '**Why Band 9:** Clear paraphrase, strong overview with main trends, selective data points, meaningful comparisons, sophisticated vocabulary (connectivity, substantial, converged, saturation), accurate data, appropriate length.' },
        { sentence: '**BAND UPGRADE LADDER - Overview Paragraph:**\n\n**Band 6:** "Overall, all countries increased their internet use. The UK had the biggest increase."\n\n**Band 7:** "Overall, internet access increased significantly in all three countries over the period. The UK showed the largest growth, rising from the lowest to the highest position."\n\n**Band 8:** "Overall, all three nations experienced substantial growth in internet adoption throughout the period. Notably, the UK demonstrated the most dramatic increase, ultimately surpassing both the USA and Japan."\n\n**Band 9:** "Overall, all three nations experienced substantial growth in internet adoption, with each country reaching over 90% household connectivity by 2020. Notably, the UK demonstrated the most dramatic increase despite starting from the lowest point."', explanation: '**Key Upgrades:** Band 6→7: More specific, mentions comparison. Band 7→8: Sophisticated vocabulary (substantial, dramatic), better structure. Band 8→9: Includes end data point, concession clause (despite starting), more precise language.' },
        { sentence: '**TREND VOCABULARY - Band 9 Level:**\n\n**Upward trends:**\n- increased, rose, grew, climbed, surged\n- experienced growth, showed an upward trend\n- soared (dramatic), rocketed (very dramatic)\n\n**Downward trends:**\n- decreased, fell, dropped, declined, plummeted\n- experienced a decline, showed a downward trend\n\n**No change:**\n- remained stable/constant, plateaued, leveled off\n- stayed unchanged, held steady\n\n**Fluctuation:**\n- fluctuated, varied, oscillated\n- experienced fluctuations\n\n**Degree words:**\n- dramatically, significantly, substantially, considerably\n- slightly, marginally, gradually, steadily\n- sharply, steeply (for sudden changes)', explanation: 'Using varied trend vocabulary demonstrates lexical resource. Match the intensity of the word to the data (don\'t say "soared" for a 5% increase).' },
        { sentence: '**COMPARISON LANGUAGE:**\n\n**Comparing values:**\n- X was higher/lower than Y\n- X exceeded Y by [amount]\n- X was approximately double/triple Y\n- X and Y were roughly equal\n\n**Comparing trends:**\n- X showed a similar pattern to Y\n- Unlike X, Y experienced...\n- While X increased, Y decreased\n- X and Y followed divergent paths\n\n**Comparing changes:**\n- X grew more rapidly than Y\n- The increase in X was more pronounced than in Y\n- X overtook Y in [year]\n- X and Y converged at [point]', explanation: 'Making comparisons is essential for Band 7+. Don\'t just describe each line separately - show how they relate to each other.' },
        { sentence: '**COMMON TASK 1 MISTAKES:**\n\n**Mistake 1:** No overview paragraph\n**Impact:** Maximum Band 5 for Task Achievement\n**Fix:** Always include 2-3 sentences summarizing main trends\n\n**Mistake 2:** Describing every single data point\n**Impact:** Poor coherence, wastes words\n**Fix:** Select 4-6 key points that show the main patterns\n\n**Mistake 3:** Including opinions or explanations\n**Impact:** Irrelevant content, loses marks\n**Fix:** Only describe what you see - no "because" or "I think"\n\n**Mistake 4:** Copying words from the question\n**Impact:** Lower vocabulary score\n**Fix:** Paraphrase: "shows" → "illustrates", "percentage" → "proportion"', explanation: 'Avoiding these mistakes can immediately improve your score by 0.5-1.0 bands.' }
      ],
      commonMistakes: [
        { mistake: 'No overview paragraph', correction: 'Always include an overview after the introduction summarizing 2-3 main trends', explanation: 'The overview is essential for Task Achievement. Without it, maximum Band 5.' },
        { mistake: 'Listing every data point', correction: 'Select key data points that illustrate the main trends', explanation: 'You have 150+ words, not 500. Choose data that shows patterns, not every number.' },
        { mistake: 'Using "I think" or giving reasons', correction: 'Only describe what you see. No opinions or explanations.', explanation: 'Task 1 is objective description. "The increase might be because..." is wrong.' },
        { mistake: 'Wrong tense usage', correction: 'Use past tense for past data, present for current/general statements', explanation: 'If the graph shows 2000-2020, use past tense. Overview can use present tense for general patterns.' },
        { mistake: 'No comparisons between data sets', correction: 'Compare the lines/bars: "X exceeded Y", "Unlike X, Y showed..."', explanation: 'Comparisons demonstrate analytical skill and improve coherence.' }
      ],
      miniPractice: [
        { question: 'What is the purpose of the overview paragraph?', options: ['To list all data points', 'To summarize main trends without specific numbers', 'To give your opinion on the data', 'To explain why the trends occurred'], type: 'multiple-choice' },
        { question: 'Rewrite at Band 9: "The number went up a lot from 2010 to 2015."', type: 'rewrite' },
        { question: 'Which phrase shows comparison?', options: ['The figure increased.', 'X overtook Y in 2015.', 'The data shows growth.', 'There was a change.'], type: 'multiple-choice' },
        { question: 'Complete: "The UK demonstrated the most dramatic increase _____ starting from the lowest point."', type: 'fill-blank' }
      ],
      answerKey: [
        'To summarize main trends without specific numbers',
        'The figure experienced substantial growth, rising dramatically from X to Y between 2010 and 2015.',
        'X overtook Y in 2015.',
        'despite'
      ],
      quickRecap: 'Task 1 Line Graph Formula: 1) Paraphrase introduction, 2) Overview with main trends (NO numbers), 3-4) Body paragraphs with selected data and comparisons. Use varied trend vocabulary, make comparisons, and never give opinions or reasons.',
      collocations: [
        'experienced growth', 'showed an upward trend', 'reached a peak', 'hit a low',
        'remained stable', 'fluctuated between', 'gradually increased', 'sharply declined',
        'overtook', 'converged at', 'divergent paths', 'approached saturation'
      ],
      synonyms: [
        { word: 'increase', synonyms: ['rise', 'growth', 'climb', 'surge', 'upturn'] },
        { word: 'decrease', synonyms: ['fall', 'decline', 'drop', 'reduction', 'downturn'] },
        { word: 'show', synonyms: ['illustrate', 'demonstrate', 'depict', 'present', 'indicate'] }
      ],
      speakingLines: [
        'The graph illustrates significant growth across all categories.',
        'Overall, there was a clear upward trend throughout the period.',
        'The most notable feature is the dramatic increase in X.'
      ]
    }
  },
  {
    id: 'writing-task1-bar-chart',
    title: 'Task 1: Bar Chart Comparison',
    slug: 'task1-bar-chart-comparison',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 Academic',
    description: 'Learn to describe and compare bar charts effectively with Band 9 comparison language and structure.',
    is_premium: true,
    is_published: true,
    view_count: 2400,
    created_at: '2025-06-05T10:00:00Z',
    updated_at: '2025-06-05T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Task 1: Bar Chart Comparison',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure bar chart descriptions for maximum clarity',
        'Use sophisticated comparison language',
        'Group data logically for coherent paragraphs',
        'Apply the Band Upgrade Ladder to bar charts'
      ],
      coreExplanation: `**Bar Chart Structure:**
- Introduction: Paraphrase what the chart shows
- Overview: Main patterns/comparisons (highest, lowest, notable differences)
- Body 1: First group of data with comparisons
- Body 2: Second group of data with comparisons

**Grouping Strategies:**
1. By category (e.g., all data for Country A, then Country B)
2. By value (e.g., highest values first, then lowest)
3. By time period (if comparing different years)
4. By similarity (e.g., similar patterns together)

**Key Principle:** Don't describe bars from left to right. Group logically and compare.`,
      examples: [
        { sentence: '**SAMPLE BAR CHART:**\n\nThe chart shows the percentage of people participating in different leisure activities in two countries (Australia and UK) in 2020.\n\n**Activities:** Reading, Sports, Gaming, Gardening, Cooking\n**Australia:** Reading 45%, Sports 60%, Gaming 35%, Gardening 40%, Cooking 50%\n**UK:** Reading 55%, Sports 40%, Gaming 45%, Gardening 50%, Cooking 55%', explanation: 'This bar chart compares two countries across five categories. Your task is to identify patterns and make meaningful comparisons.' },
        { sentence: '**BAND 9 MODEL ANSWER (162 words):**\n\n"The bar chart compares participation rates in five leisure activities between Australia and the United Kingdom in 2020.\n\nOverall, while both countries showed similar overall engagement in leisure pursuits, notable differences emerged in specific activities. Sports participation was considerably higher in Australia, whereas the UK demonstrated greater involvement in reading and gardening.\n\nIn Australia, sports was the most popular activity, attracting 60% of the population, followed by cooking at 50%. Reading and gardening showed moderate participation at 45% and 40% respectively, while gaming was the least popular at 35%.\n\nConversely, the UK exhibited a more balanced distribution across activities. Reading and cooking jointly led at 55%, with gardening close behind at 50%. Gaming attracted 45% participation, notably higher than in Australia. However, sports participation in the UK was markedly lower at 40%, representing a 20 percentage point difference compared to Australia."', explanation: '**Why Band 9:** Clear overview identifying key differences, logical grouping (by country), sophisticated comparisons, precise data, varied vocabulary, appropriate length.' },
        { sentence: '**COMPARISON STRUCTURES FOR BAR CHARTS:**\n\n**Comparing within a category:**\n- X was the most/least popular in both countries\n- X attracted the highest/lowest participation\n- X led/dominated in Country A\n\n**Comparing between countries:**\n- Country A showed higher rates of X than Country B\n- X was more popular in A, whereas Y dominated in B\n- The gap between A and B was most pronounced in X\n- A and B showed similar rates for X\n\n**Quantifying differences:**\n- X was approximately double Y\n- X exceeded Y by 20 percentage points\n- X was marginally/considerably higher than Y\n- The difference between X and Y was negligible/substantial', explanation: 'Strong comparisons are essential for Band 7+. Always quantify differences where possible.' },
        { sentence: '**BAND UPGRADE LADDER - Making Comparisons:**\n\n**Band 6:** "Australia had 60% for sports. UK had 40% for sports. Australia was higher."\n\n**Band 7:** "Sports participation was higher in Australia at 60% compared to 40% in the UK."\n\n**Band 8:** "Sports participation in Australia, at 60%, was considerably higher than in the UK, where only 40% engaged in this activity."\n\n**Band 9:** "Sports participation was considerably higher in Australia, attracting 60% of the population compared to just 40% in the UK, representing a 20 percentage point difference."', explanation: '**Key Upgrades:** Band 6→7: Combined into one sentence with comparison. Band 7→8: Added degree word (considerably), embedded clause. Band 8→9: Quantified the difference, more sophisticated structure.' }
      ],
      commonMistakes: [
        { mistake: 'Describing bars from left to right without grouping', correction: 'Group data logically by country, value, or pattern', explanation: 'Random ordering hurts coherence. Logical grouping shows analytical skill.' },
        { mistake: 'No comparisons between categories', correction: 'Always compare: "X was higher than Y", "Unlike A, B showed..."', explanation: 'Bar charts are about comparison. Just listing numbers misses the point.' },
        { mistake: 'Vague comparisons without numbers', correction: 'Quantify differences: "20 percentage points higher", "approximately double"', explanation: 'Precise comparisons demonstrate accuracy and data handling.' },
        { mistake: 'Describing every single bar', correction: 'Focus on significant data: highest, lowest, biggest differences', explanation: 'Select key data that illustrates patterns. Not every bar is equally important.' },
        { mistake: 'Missing overview paragraph', correction: 'Include 2-3 sentences summarizing main patterns before detailed description', explanation: 'Overview is essential for Task Achievement. Without it, maximum Band 5.' }
      ],
      miniPractice: [
        { question: 'What is the best way to organize a bar chart description?', options: ['Describe bars from left to right', 'Group data logically and compare', 'Start with the smallest values', 'Describe each country separately without comparison'], type: 'multiple-choice' },
        { question: 'Rewrite at Band 9: "Australia had more sports. UK had less sports."', type: 'rewrite' },
        { question: 'Which comparison is most precise?', options: ['X was higher than Y', 'X was much higher than Y', 'X exceeded Y by 15 percentage points', 'X was bigger'], type: 'multiple-choice' },
        { question: 'Complete: "The gap between the two countries was most _____ in sports participation."', type: 'fill-blank' }
      ],
      answerKey: [
        'Group data logically and compare',
        'Sports participation was considerably higher in Australia at 60%, compared to just 40% in the UK, representing a 20 percentage point difference.',
        'X exceeded Y by 15 percentage points',
        'pronounced/significant/notable'
      ],
      quickRecap: 'Bar Chart Formula: 1) Paraphrase introduction, 2) Overview with main comparisons, 3-4) Body paragraphs grouped logically with precise comparisons. Always quantify differences and use varied comparison language.',
      collocations: [
        'participation rates', 'percentage points', 'notable differences', 'similar patterns',
        'considerably higher', 'marginally lower', 'most popular', 'least common',
        'balanced distribution', 'pronounced difference', 'jointly led', 'close behind'
      ],
      synonyms: [
        { word: 'popular', synonyms: ['common', 'prevalent', 'widespread', 'favored'] },
        { word: 'difference', synonyms: ['gap', 'disparity', 'variation', 'discrepancy'] },
        { word: 'compare', synonyms: ['contrast', 'juxtapose', 'examine', 'analyze'] }
      ],
      speakingLines: [
        'The chart reveals notable differences between the two countries.',
        'Sports participation was considerably higher in Australia.',
        'The most striking contrast was in gaming preferences.'
      ]
    }
  },
  {
    id: 'writing-task1-pie-chart',
    title: 'Task 1: Pie Chart Description',
    slug: 'task1-pie-chart-description',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 Academic',
    description: 'Master pie chart description with proportion language and effective comparison techniques.',
    is_premium: true,
    is_published: true,
    view_count: 2200,
    created_at: '2025-06-06T10:00:00Z',
    updated_at: '2025-06-06T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Task 1: Pie Chart Description',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Use proportion vocabulary accurately (quarter, third, half)',
        'Compare segments within and between pie charts',
        'Structure descriptions for single and multiple pie charts',
        'Apply Band 9 techniques to pie chart analysis'
      ],
      coreExplanation: `**Pie Chart Structure:**
- Introduction: Paraphrase what the chart(s) show
- Overview: Main proportions and notable features
- Body 1: Largest segments and their proportions
- Body 2: Smaller segments and comparisons

**Proportion Language:**
- 50% = half, one in two
- 33% = a third, one in three
- 25% = a quarter, one in four
- 20% = a fifth, one in five
- 10% = a tenth, one in ten

**Key Principle:** Pie charts show proportions of a whole. Focus on relative sizes, not just percentages.`,
      examples: [
        { sentence: '**PROPORTION VOCABULARY:**\n\n**Exact proportions:**\n- accounted for 25% / a quarter\n- represented half of the total\n- comprised one third\n- constituted the majority/minority\n\n**Approximate proportions:**\n- approximately / roughly / around 30%\n- just under / just over a quarter\n- slightly more than half\n- nearly / almost a third\n\n**Comparing segments:**\n- X was the largest segment at 40%\n- X and Y combined accounted for over half\n- X was twice as large as Y\n- X represented the smallest proportion', explanation: 'Using varied proportion language demonstrates lexical resource. Don\'t just write percentages - describe them.' },
        { sentence: '**BAND 9 MODEL ANSWER (Single Pie Chart - 158 words):**\n\n"The pie chart illustrates the distribution of household expenditure across five categories in the UK in 2020.\n\nOverall, housing costs dominated household spending, accounting for approximately one third of total expenditure. Food and transport together comprised another third, while utilities and entertainment represented smaller proportions.\n\nHousing was by far the largest expense, representing 35% of household budgets. This was followed by food at 20% and transport at 18%, which together with housing accounted for nearly three quarters of all spending.\n\nThe remaining categories constituted a relatively small share of expenditure. Utilities represented 15% of the total, while entertainment was the smallest segment at just 12%. Notably, the combined spending on utilities and entertainment was still less than housing costs alone, highlighting the significant financial burden of accommodation in the UK."', explanation: '**Why Band 9:** Clear overview, proportion language (one third, three quarters), meaningful comparisons, sophisticated observation in final sentence, appropriate length.' },
        { sentence: '**COMPARING MULTIPLE PIE CHARTS:**\n\nWhen comparing two or more pie charts:\n\n**Structure Option 1 (by chart):**\n- Body 1: Describe Chart 1 (e.g., 2000)\n- Body 2: Describe Chart 2 (e.g., 2020) with comparisons to Chart 1\n\n**Structure Option 2 (by category):**\n- Body 1: Categories that increased\n- Body 2: Categories that decreased or stayed stable\n\n**Comparison language:**\n- The proportion of X increased from 20% to 35%\n- X grew by 15 percentage points\n- While X expanded, Y contracted\n- The share of X doubled/halved\n- X overtook Y as the largest segment', explanation: 'For multiple pie charts, always compare - don\'t just describe each chart separately.' }
      ],
      commonMistakes: [
        { mistake: 'Only using percentages, no proportion words', correction: 'Use "a quarter", "one third", "half" alongside percentages', explanation: 'Varied vocabulary demonstrates lexical resource. Don\'t just list numbers.' },
        { mistake: 'Describing segments in clockwise order', correction: 'Group by size or significance: largest first, then smaller segments', explanation: 'Logical grouping improves coherence. Start with the most important data.' },
        { mistake: 'No comparisons between segments', correction: 'Compare: "X was twice as large as Y", "X and Y combined..."', explanation: 'Pie charts are about proportions and relationships. Comparisons are essential.' },
        { mistake: 'Missing the "whole" perspective', correction: 'Show how segments relate to the total: "accounted for over half"', explanation: 'Pie charts show parts of a whole. Reference the total for context.' },
        { mistake: 'For multiple charts: describing separately without comparison', correction: 'Always compare: "X increased from 20% to 35%", "X overtook Y"', explanation: 'The purpose of multiple charts is comparison. Don\'t miss this.' }
      ],
      miniPractice: [
        { question: 'Which is the best way to express 25%?', options: ['25 percent', 'A quarter / one in four', 'Twenty-five percent', 'All of these are acceptable'], type: 'multiple-choice' },
        { question: 'Rewrite at Band 9: "Housing was 35%. Food was 20%."', type: 'rewrite' },
        { question: 'Which phrase shows proportion relationship?', options: ['Housing was 35%', 'Housing accounted for over a third of total expenditure', 'Housing is expensive', 'Housing increased'], type: 'multiple-choice' },
        { question: 'Complete: "X and Y _____ accounted for over half of total spending."', type: 'fill-blank' }
      ],
      answerKey: [
        'All of these are acceptable',
        'Housing dominated household expenditure at 35%, nearly double the proportion spent on food, which accounted for 20%.',
        'Housing accounted for over a third of total expenditure',
        'combined/together'
      ],
      quickRecap: 'Pie Chart Formula: 1) Paraphrase introduction, 2) Overview with main proportions, 3-4) Body paragraphs grouped by size with comparisons. Use proportion words (quarter, third, half), compare segments, and show relationships to the whole.',
      collocations: [
        'accounted for', 'represented', 'comprised', 'constituted',
        'the largest segment', 'the smallest proportion', 'combined total',
        'just under', 'just over', 'approximately', 'roughly'
      ],
      synonyms: [
        { word: 'proportion', synonyms: ['share', 'percentage', 'fraction', 'segment'] },
        { word: 'largest', synonyms: ['biggest', 'greatest', 'most significant', 'dominant'] },
        { word: 'account for', synonyms: ['represent', 'comprise', 'constitute', 'make up'] }
      ],
      speakingLines: [
        'Housing accounted for approximately one third of expenditure.',
        'The largest segment was X, representing over half the total.',
        'X and Y combined comprised nearly three quarters of spending.'
      ]
    }
  }
];

export const WRITING_TOPICS = [
  'Task 2 Opinion',
  'Task 2 Discussion',
  'Task 2 Problem-Solution',
  'Task 2 Advantages-Disadvantages',
  'Task 2 Two-Part Question',
  'Task 1 Academic',
  'Task 1 General'
];
