import { Lesson } from '@/types';

// Writing Practice Lessons with Band Upgrade Ladder Approach
// Each lesson includes: Model Answer, Band Upgrade Ladder (6→7→8→9), Examiner Perspective, Common Mistakes

export const WRITING_LESSONS: Lesson[] = [
  {
    id: 'writing-class14-essay-review',
    title: 'Class 14: Full Essay Live Review & Personal Feedback',
    slug: 'writing-class14-essay-review',
    type: 'writing',
    level: 'advanced',
    topic: 'Review',
    description: 'The final rehearsal. Put all the pieces together in a full Band 9 essay walkthrough. Learn the "Self-Correction" checklist that can save you 1 band point in 2 minutes.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T11:00:00Z',
    updated_at: '2026-04-06T11:00:00Z',
    estimated_time: 60,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 2: Writing Task 1 & 2 Excellence (8 Classes)',
    content: {
      title: 'Class 14: Full Essay Live Review & Personal Feedback',
      targetLevel: 'Band 7.5 - 9.0',
      whatYouWillLearn: [
        'How to manage your time (5-30-5 rule)',
        'Planning like a pro in 5 minutes',
        'Self-Correction Checklist (The Top 5 Fixes)',
        'Identifying your personal grammar traps',
        'Final check for Task Achievement'
      ],
      coreExplanation: `**The "Self-Correction" Checklist**
      
It's your final class! You have the structure, the vocabulary, and the grammar. Now it’s about **Execution**. 

**1. The 5-30-5 Rule:**
- **5 Min Planning**: Note down your Thesis, Reasons, and Examples. Never skip this.
- **30 Min Writing**: Write with flow. Don't stop to search for "big" words.
- **5 Min Review**: This is where you find the missing commas and small "S" mistakes (Subject-verb agreement).

**2. The 2-Minute Fix Checklist:**
Quickly scan for:
- Did I write **250+** words?
- Is my **Thesis** clear in the Intro?
- Do my body paragraphs have **Topic Sentences**?
- Are my **Commas** in the right place after linking words?
- Did I use at least **3 complex sentences**?

**3. Planning Your Success:**
A simple table works best:
- **Idea 1**: Education
- **Support**: Online learning
- **Ex/Detail**: Khan Academy / Flexible schedules.`,
      examples: [
        { 
          sentence: '**The Power of Planning:**\n"If you don\'t plan, you start writing and realize halfway through that your argument is weak. A 5-minute plan prevents you from getting stuck in the middle of the test."', 
          explanation: 'Note the practical advice for exam pressure.' 
        },
        { 
          sentence: '**The Final Conclusion:**\n"To sum up, while X is important, Y is more effective. Ultimately, we must balance both if we want a sustainable future."', 
          explanation: 'Note how it summarizes everything naturally.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Running out of time mid-conclusion', correction: 'Practice writing your conclusion in exactly 3 minutes.', explanation: 'A missing conclusion is a Band 5 Task Achievement error.' },
        { mistake: 'Not checking "S" mistakes', correction: 'Scan every verb to ensure it matches the subject (e.g., "The teacher useS").', explanation: 'Small, repeated grammar mistakes prevent you from getting a Band 8+.' }
      ],
      miniPractice: [
        { question: 'What is the "5-30-5" rule?', options: ['Spend 5 mins per paragraph', 'Plan-Write-Review timer', 'Write 500 words', 'Read for 5 mins'], type: 'multiple-choice' },
        { question: 'True/False: You should aim to write exactly 250 words.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Plan-Write-Review timer',
        'False (Aim for 270-290 to be safe and show range)'
      ],
      quickRecap: 'Class 14 is about confidence and execution. Master the 5-30-5 timing, never skip your 5-minute plan, and use the 2-minute fix checklist to polish your work before the examiner sees it. You are officially ready!',
      speakingLines: [
        "What this essay has demonstrated is that...",
        "Taking all these points into account, I believe...",
        "I trust that this overview has clarified the situation."
      ]
    }
  },
  {
    id: 'writing-class13-grammatical-range',
    title: 'Class 13: Grammatical Range & Accuracy for Band 8+',
    slug: 'writing-class13-grammatical-range',
    type: 'writing',
    level: 'advanced',
    topic: 'Grammar',
    description: 'Master the "Mix-it-Up" system for Band 8+ Grammar. Learn where to use complex sentences, subordination, and the subtle "Punctuation Power-Ups" that impress IELTS examiners.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T11:00:00Z',
    updated_at: '2026-04-06T11:00:00Z',
    estimated_time: 50,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 2: Writing Task 1 & 2 Excellence (8 Classes)',
    content: {
      title: 'Class 13: Grammatical Range & Accuracy for Band 8+',
      targetLevel: 'Band 7.5 - 9.0',
      whatYouWillLearn: [
        'How to write a mistake-free complex sentence',
        'Mastering Subordination (While, whereas, although)',
        'Using the Passive Voice for objectivity',
        'Punctuation: Commas, Semicolons, and Colons',
        'Proofreading strategies for accuracy'
      ],
      coreExplanation: `**The "Mix-it-Up" Grammar System**
      
Grammar isn't just about avoiding mistakes—it's about showing **Range**. 

**1. The Complex Sentence Secret:**
Band 9 students use a mix of simple, compound, and complex sentences. A complex sentence uses a **subordinator**:
- *"**Although** some argue for stricter laws, I believe education is a better solution."*

**2. Punctuation Power-Ups:**
- **Comma ( , )**: Vital for separating clauses. *"Furthermore, computers are..."*
- **Semicolon ( ; )**: Joins two related independent sentences. *"The internet provides vast knowledge; however, it also poses risks."* (Note: It’s followed by a small letter).

**3. Passive Voice (Task 1 & Task 2):**
If you want to sound objective and professional, use the passive:
- Active: *"People use electricity for everything."*
- Passive: *"Electricity **is utilized** extensively for various reasons."* (This is more academic).`,
      examples: [
        { 
          sentence: '**Subordination Mastery:**\n"While many students prefer studying at night, research shows that morning study is more effective."', 
          explanation: 'Starting with "**While**" creates a high-level complex sentence immediately.' 
        },
        { 
          sentence: '**Punctuation Check:**\n"On the one hand, some believe...**; however,** I would argue..." ', 
          explanation: 'Using the semicolon before "however" is a hallmark of sophisticated punctuation.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Only using simple sentences', correction: 'Try to combine two sentences into one using words like "which" or "although".', explanation: 'A string of short, simple sentences is a Band 5/6 indicator.' },
        { mistake: 'Too many "and" / "but"', correction: 'Use more formal connectors like "In addition to" or "Conversely".', explanation: 'Overusing basic conjunctions shows limited range.' }
      ],
      miniPractice: [
        { question: 'What is a "Subordinating Conjunction"?', options: ['"And"', '"But"', '"Although"', '"So"'], type: 'multiple-choice' },
        { question: 'True/False: You should always use the passive voice in an IELTS essay.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        '"Although"',
        'False (Only use it where appropriate to show range and objectivity)'
      ],
      quickRecap: 'The "Mix-it-Up" system means you shouldn’t use the same sentence structure twice in a row. Use subordination (while, despite, because) and perfect your punctuation (semicolons are your best friend) to hit that Band 8+ mark.',
      speakingLines: [
        "What I'd like to highlight is the complexity of...",
        "Despite the clear advantages of X, it's crucial to realize...",
        "Having considered these factors, it is evident that..."
      ]
    }
  },
  {
    id: 'writing-class12-vocabulary-collocations',
    title: 'Class 12: Advanced Vocabulary & Collocations for Writing',
    slug: 'writing-class12-vocabulary-collocations',
    type: 'writing',
    level: 'intermediate',
    topic: 'Vocabulary',
    description: 'Banish common words like "good", "bad", and "people". Learn the "Vary-the-Verb" technique and master the top 100 collocations for Band 8+ writing.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T11:00:00Z',
    updated_at: '2026-04-06T11:00:00Z',
    estimated_time: 45,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 2: Writing Task 1 & 2 Excellence (8 Classes)',
    content: {
      title: 'Class 12: Advanced Vocabulary & Collocations for Writing',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'How to use "Topic Specific" vocabulary vs. "Formulaic" vocabulary',
        'Academic synonyms for common verbs and adjectives',
        'Collocations (Words that naturally go together)',
        'Precise word choice: The difference between "problem" and "crisis"',
        'Avoiding over-complicating (don’t use big words you don’t understand)'
      ],
      coreExplanation: `**The "Vary-the-Verb" Technique**
      
Vocabulary isn’t about "big" words—it's about **precise** words. Band 9 students use words that fit the *exact* context. 

**1. Topic-Specific Vocabulary:**
If the essay is about **Environment**: 
- Don't say: *"Pollution is bad."*
- Say: *"Environmental degradation is a pressing concern."* 
- Don't say: *"Protect nature."*
- Say: *"Preserve biodiversity."*

**2. Master Collocations:**
Collocations are word couples. If you say "make a crime" instead of "**commit a crime**", your score drops. 
Examples:
- **Exacerbate** a problem (make it worse).
- **Profound** effect (big impact).
- **Fundamental** right (basic law).

**3. Varying Common Adjectives:**
- **Good** → Beneficial, advantageous, instrumental.
- **Bad** → Detrimental, counterproductive, detrimental.
- **Problem** → Issue, dilemma, challenge, impediment.`,
      examples: [
        { 
          sentence: '**Vocabulary Upgrade:**\n"The **growth** of cities **makes** traffic **worse**."\n\n**Band 9:** "The **rapid urbanization** of regions **exacerbates** existing traffic **congestion**."', 
          explanation: 'Note how precise verbs (exacerbates) and nouns (urbanization, congestion) add academic weight.' 
        },
        { 
          sentence: '**Common Collocations:**\n"This will have a **huge influence** on..."\n\n**Band 9:** "This will exert a **profound influence** on..."', 
          explanation: 'The verb "**exert**" and adjective "**profound**" are high-level academic partners.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Trying to use "impressive" words incorrectly', correction: 'Use a simple word you know 100% over a complex word you know 50%.', explanation: 'Incorrect use of complex words looks worse than using simple words accurately.' },
        { mistake: 'Overusing "Nowadays" or "Every coin has two sides"', correction: 'Replace with specific, meaningful transitions.', explanation: 'These clichés scream "Band 6 student" to the examiner.' }
      ],
      miniPractice: [
        { question: 'Which word is a better synonym for "bad"?', options: ['Terrible', 'Aweful', 'Detrimental', 'Un-good'], type: 'multiple-choice' },
        { question: 'What is the best verb to use with the word "impact"?', options: ['Make', 'Do', 'Exert', 'Have'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Detrimental',
        'Exert (Have is also okay, but Exert is more advanced)'
      ],
      quickRecap: 'Lexical Resource is about precision. Build a "word bank" for common topics (Education, Technology, Health) and master the word-partners (collocations) that make you sound like a native professional.',
      speakingLines: [
        "A primary factor contributing to this phenomenon is...",
        "Such a measure would be instrumental in achieving...",
        "The long-term implications of this trend could be detrimental to..."
      ]
    }
  },
  {
    id: 'writing-class11-cohesion-coherence',
    title: 'Class 11: Cohesion & Coherence: Linking Ideas Like a Pro',
    slug: 'writing-class11-cohesion-coherence',
    type: 'writing',
    level: 'intermediate',
    topic: 'Cohesion',
    description: 'Learn the "Glue" technique that holds Band 9 essays together. Move beyond basic "Firstly, Secondly" and master professional signposting and reference words.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T11:00:00Z',
    updated_at: '2026-04-06T11:00:00Z',
    estimated_time: 45,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 2: Writing Task 1 & 2 Excellence (8 Classes)',
    content: {
      title: 'Class 11: Cohesion & Coherence: Linking Ideas Like a Pro',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'How to avoid "Mechanical" linking',
        'Mastering Substitution (it, they, this, such problems)',
        'Signposting phrases for paragraph transitions',
        'Cohesion between sentences vs. cohesion between paragraphs',
        'Advanced relative clauses for fluid writing'
      ],
      coreExplanation: `**The "Glue" of Writing**
      
Cohesion and Coherence carry 25% of your score. It’s not about how many "However" you use, but how **smoothly** your ideas flow. 

**1. Avoid Mechanical Linking:**
Band 6 students use: *"Firstly... Secondly... Moreover..."* at the start of every sentence. This is robotic.
Band 9 students use **Reference Words**: *"This trend...", "Such issues...", "Taking these factors into account..."*.

**2. The Bridge Paragraph:**
Move from one idea to the next using a **Bridge Sentence** at the end or start of a paragraph. 
- Example: *"While the economic benefits are clear, the social implications deserve equal attention."* (This "bridges" from an economics paragraph to a social one).

**3. Use Transition Phrases:**
- Contrasting: *"That said...", "Conversely...", "Having said that..."*
- Adding: *"Furthermore...", "In addition to this...", "A further point to consider is..."*
- Concluding: *"In the final analysis...", "Ultimately..."*`,
      examples: [
        { 
          sentence: '**Reference Word Cohesion:**\n"Many governments are investing in green energy. **This commitment** is essential for reducing carbon emissions." ', 
          explanation: 'Using "**This commitment**" connects to the previous sentence without repeating "green energy".' 
        },
        { 
          sentence: '**Sophisticated Transition:**\n"Instead of just saying "But", use: "**Despite these clear advantages, there remain significant hurdles to overcome.**"', 
          explanation: 'Note how it summarizes the previous point before introducing a new one.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Overusing "Firstly, Secondly, Thirdly"', correction: 'Use variations like "A primary reason is...", "Another factor involves...", "In addition to this..."', explanation: 'Robotic lists indicate limited linguistic flexibility.' },
        { mistake: 'New paragraph without a link', correction: 'Always "signpost" the transition at the start of a new paragraph.', explanation: 'Linking paragraphs shows the examiner your whole essay is one cohesive argument.' }
      ],
      miniPractice: [
        { question: 'What is a "Reference Word"?', options: ['A word like "However"', 'A word like "this", "that", "these", "those"', 'A dictionary word', 'A quote'], type: 'multiple-choice' },
        { question: 'True/False: It is okay to start every sentence with a linking word.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        'A word like "this", "that", "these", "those"',
        'False (This is mechanical and lowers your score)'
      ],
      quickRecap: 'Cohesion is about the "glue". Use reference words to point back to ideas, use bridge sentences to move between paragraphs, and avoid being a "robotic linker". Smooth flow = High score.',
      speakingLines: [
        "In light of these facts, it is clear that...",
        "Taking these various perspectives into account, I believe...",
        "Such a phenomenon could lead to long-term issues in..."
      ]
    }
  },
  {
    id: 'writing-class10-task2-problem-solution',
    title: 'Class 10: Task 2 Essay Structures (Problem/Solution & Direct)',
    slug: 'writing-class10-task2-problem-solution',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 2 Structures',
    description: 'Master Problem/Solution and Two-Part questions. Learn how to create logical "Causal Links" between your problems and your solutions.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T11:00:00Z',
    updated_at: '2026-04-06T11:00:00Z',
    estimated_time: 50,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 2: Writing Task 1 & 2 Excellence (8 Classes)',
    content: {
      title: 'Class 10: Task 2 Essay Structures (Problem/Solution & Direct)',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'How to chain a problem directly to a solution',
        'Addressing "Two-part" questions without confusion',
        'Vocabulary for cause and effect (stems from, stems for, triggers)',
        'Writing cohesive steps for a solution',
        'Balanced paragraphing'
      ],
      coreExplanation: `**The "Causal Link" Framework**
      
In these essays, the examiner is testing your **Logic**. 

**1. Problem/Solution Structure:**
- **Intro**: Paraphrase + "This essay will explore the causes and offer solutions..."
- **Body 1**: Discuss the Causes. Use the "Why?" chain (A happens because of B, which leads to C).
- **Body 2**: Discuss the Solutions. Tip: A good solution MUST solve the specific cause you mentioned in Body 1.
- **Conclusion**: Summarize + Final Prediction.

**2. Direct Question (Two-Part) Structure:**
Sometimes the prompt gives two unrelated questions. 
- **Body 1**: Answer Question 1 fully.
- **Body 2**: Answer Question 2 fully.
- **Conclusion**: Combine both answers into a single summary.

**3. Cause-Effect Vocabulary:**
- *"This phenomenon stems from..."*
- *"A primary factor contributing to this is..."*
- *"This, in turn, results in..."*
- *"Consequently, governments should..."*`,
      examples: [
        { 
          sentence: '**Problem-Solution Chain:**\n"One reason for obesity is sedentary lifestyles (Problem). This arises because children spend too much time on screens (Cause). To combat this, schools should implement mandatory daily sports sessions (Solution)."', 
          explanation: 'Note the logical flow from Problem → Cause → Solution.' 
        },
        { 
          sentence: '**Two-Part Conclusion:**\n"In conclusion, although the internet has revolutionized research (Answer 1), I believe its downsides for children outweigh its benefits (Answer 2)."', 
          explanation: 'It addresses both questions in the final summary.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Mixing problems and solutions in the same paragraph', correction: 'Keep them separate. Body 1 for Problems, Body 2 for Solutions.', explanation: 'This keeps your essay "Coherent" and easy for the examiner to follow.' },
        { mistake: 'Forgeting the second part of a 2-part question', correction: 'Treat both parts of the question with equal weight.', explanation: 'Missing a whole part costs you half your score for Task Achievement.' }
      ],
      miniPractice: [
        { question: 'A solution MUST address which part of your essay?', options: ['The Intro', 'The Conclusion', 'The Causes in Body 1', 'Your Opinion'], type: 'multiple-choice' },
        { question: 'True/False: You should use "In conclusion" at the beginning of your final paragraph.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        'The Causes in Body 1',
        'True (It is the standard, clear signal)'
      ],
      quickRecap: 'Problem/Solution essays are about the logical link between what’s wrong and how to fix it. Keep your chain tight, use cause-effect words, and never miss the second question in a two-part prompt.',
      speakingLines: [
        "In my view, the root of this problem lies in...",
        "A feasible solution to this challenge would be to...",
        "The consequences of remaining passive on this issue are..."
      ]
    }
  },
  {
    id: 'writing-class9-task2-essay-logic',
    title: 'Class 09: Task 2 Essay Structures (Agree/Disagree & Discussion)',
    slug: 'writing-class9-task2-essay-logic',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 2 Structures',
    description: 'Master the logic behind the two most common IELTS Essay types. Learn the "Thesis-Driven" structure for Opinion and Discussion essays.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T11:00:00Z',
    updated_at: '2026-04-06T11:00:00Z',
    estimated_time: 50,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 2: Writing Task 1 & 2 Excellence (8 Classes)',
    content: {
      title: 'Class 09: Task 2 Essay Structures (Agree/Disagree & Discussion)',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'How to identify Agree/Disagree vs Discussion questions',
        'Writing a Band 9 Thesis Statement',
        'Paragraphing for Opinion Essays',
        'Balanced vs. One-sided arguments',
        'Advanced templates for Conclusion'
      ],
      coreExplanation: `**The "Thesis-Driven" Structure**
      
In Task 2, your **Clear Position** is what examiners look for first. 

**1. Agree/Disagree (Opinion) Structure:**
- **Intro**: Paraphrase + "I completely agree that..." or "While I see X, I disagree that..."
- **Body 1**: Reason 1 + Explanation + Example.
- **Body 2**: Reason 2 + Explanation + Example. (Focus on YOUR side).
- **Conclusion**: Summarize reasons 1 & 2 + Restate opinion.

**2. Discussion (+ Opinion) Structure:**
- **Intro**: Paraphrase both sides + "This essay will argue that..."
- **Body 1**: View 1 (The side you DISAGREE with) - Explain fairly.
- **Body 2**: View 2 (The side you AGREE with) - Explain why it's better.
- **Conclusion**: Summarize points + Final Opinion.

**3. The Thesis Statement:**
This is the second sentence of your intro. It must tell the examiner exactly what you believe. Example: *"I firmly believe that students should have the freedom to choose their own subjects rather than following a rigid curriculum."*`,
      examples: [
        { 
          sentence: '**Agree/Disagree Thesis:**\n"I completely disagree with the idea that computers will replace teachers in the classroom."', 
          explanation: 'Note the clarity. The examiner knows your position immediately.' 
        },
        { 
          sentence: '**Discussion Opening:**\n"While some believe that formal education is the only path to success, others maintain that practical experience is more valuable. In my view, both are essential..."', 
          explanation: 'Note the balance. It addresses the "Discuss both views" part of the prompt.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Wait until the conclusion to give your opinion', correction: 'Give your opinion in the INTRO, BODY, and CONCLUSION.', explanation: 'The examiner needs to see a "clear position throughout the response".' },
        { mistake: 'Not having a clear thesis', correction: 'Explicitly state "I believe" or "I disagree" in the first paragraph.', explanation: 'Without a thesis, your essay lacks direction and lowers your score.' }
      ],
      miniPractice: [
        { question: 'A "Discuss both views" question requires how many views to be explained?', options: ['One', 'Two', 'Three', 'None'], type: 'multiple-choice' },
        { question: 'True/False: You can partially agree in an "Agree/Disagree" essay.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Two',
        'True (This is called a balanced or nuanced approach)'
      ],
      quickRecap: 'Structure is the skeleton of your essay. For Opinion essays, focus on your side. For Discussion essays, look at both but lean towards one. ALWAYS have a clear Thesis in the Intro.',
      speakingLines: [
        "In my opinion, the benefits of X far outweigh the drawbacks of...",
        "Having considered both sides of the argument, I am convinced that...",
        "This essay will demonstrate that..."
      ]
    }
  },
  {
    id: 'writing-class8-task1-general',
    title: 'Class 08: Task 1 General - Letter Writing Tone & Purpose',
    slug: 'writing-class8-task1-general',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 General',
    description: 'Master the "Tone-Matching" system for General Training Task 1. Learn how to switch between Formal, Semi-Formal, and Informal styles for perfect Task Achievement.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T11:00:00Z',
    updated_at: '2026-04-06T11:00:00Z',
    estimated_time: 40,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 2: Writing Task 1 & 2 Excellence (8 Classes)',
    content: {
      title: 'Class 08: Task 1 General - Letter Writing Tone & Purpose',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'The "Purpose-First" opening',
        'Tone identification: Formal vs. Semi-Formal vs. Informal',
        'Addressing all 3 bullet points logically',
        'Sign-off mastery (Yours faithfully vs Sincerely vs Best regards)',
        'Letter structures: Complaints, Requests, Apologies'
      ],
      coreExplanation: `**The "Tone-Matching" System**
      
In General Training Task 1, your **Tone** is the most important factor for Band 7+. 

**1. Identifying Tone:**
- **Formal**: To an official, manager, or company (someone you DON'T know). No contractions (I am, not I'm).
- **Semi-Formal**: To a neighbor, colleague, or landlord (someone you know but are not friends with). 
- **Informal**: To a friend or family member. Use contractions (I'll, I'm).

**2. The 3-Bullet Rule:**
Every letter has 3 bullet points. You MUST dedicate at least one paragraph to EACH bullet. If you miss even one detail, your score drops.

**3. Standard Structure:**
- **Dear [Salutation]**
- **Purpose Statement**: "I am writing to..."
- **P1: Detail 1**
- **P2: Detail 2**
- **P3: Detail 3**
- **Closing Statement**: "I look forward to hearing from you."
- **Sign-off**: Yours faithfully / Sincerely / Best wishes`,
      examples: [
        { 
          sentence: '**Formal Opening:**\n"I am writing to express my dissatisfaction regarding a faulty coffee machine I purchased from your store last Tuesday."\n\n**Informal Opening:**\n"Hi John, I\'m just writing to say how much I enjoyed your birthday party last weekend!"', 
          explanation: 'Note the difference in the first sentence. Immediate purpose vs. friendly opening.' 
        },
        { 
          sentence: '**Formal Sign-off:**\n"Yours faithfully," (if you started with Dear Sir/Madam)\n\n**Informal Sign-off:**\n"Best wishes," or "See you soon,"', 
          explanation: 'Getting the sign-off wrong can break your tone and lower your score.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Mixing formal and informal styles', correction: 'Stay consistent. If you start formal, do NOT use slang later.', explanation: 'Inconsistency in tone confuses the recipient and lowers your band.' },
        { mistake: 'Not addressing one bullet point', correction: 'Check off each bullet once you have written about it.', explanation: 'Missing a bullet point is the #1 reason for a Band 5 in Task Achievement.' }
      ],
      miniPractice: [
        { question: 'Which opening is better for a letter to a bank manager?', options: ['"Hi, I want a loan."', '"I am writing to enquire about a business loan."', '"Dear Manager, fix my account."', '"Hey! Can you help?"'], type: 'multiple-choice' },
        { question: 'True/False: You should use "Yours faithfully" if you know the person\'s name.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        '"I am writing to enquire about a business loan."',
        'False (Use "Yours sincerely" if you know the name)'
      ],
      quickRecap: 'General Task 1 is about getting the TONE right. Choose your style immediately, address all 3 bullet points clearly, and use the correct sign-off. Remember: P.A.S (Purpose, Action, Sign-off).',
      speakingLines: [
        "I am writing to formally request a transfer to...",
        "I'd be extremely grateful if you could look into this matter.",
        "I look forward to your prompt response."
      ]
    }
  },
  {
    id: 'writing-class7-task1-academic',
    title: 'Class 07: Task 1 Academic - Data Analysis & Report Writing',
    slug: 'writing-class7-task1-academic',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 Academic',
    description: 'Master the "Divide-and-Conquer" method for Academic Task 1. Learn how to group data, identify trends, and write clear overviews for any chart type.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T11:00:00Z',
    updated_at: '2026-04-06T11:00:00Z',
    estimated_time: 45,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 2: Writing Task 1 & 2 Excellence (8 Classes)',
    content: {
      title: 'Class 07: Task 1 Academic - Data Analysis & Report Writing',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'The 4-Paragraph "Gold Standard" Structure',
        'How to write a Band 9 Overview (The most important part!)',
        'Grouping strategies for complex data',
        'Comparison language that examiners love',
        'Data-specific vocabulary (surged, plummeted, plateaued)'
      ],
      coreExplanation: `**The "Divide-and-Conquer" Strategy**
      
In Task 1 Academic, your job isn't just to "describe" data—it's to **summarize** and **compare**. 

**1. The 4-Paragraph Structure:**
- **P1: Introduction**: Paraphrase the prompt (Change "shows" to "illustrates/depicts").
- **P2: Overview**: Highlight the 2 most significant trends. NO NUMBERS here.
- **P3: Detail Body 1**: Group the first set of related data with numbers.
- **P4: Detail Body 2**: Group the second set of data, making comparisons to Body 1.

**2. The Overview Secret:**
Without a clear overview, you cannot score above a Band 5 for Task Achievement. Start your overview with: *"Overall, it is clear that..."* or *"Notably, the most striking feature is..."*

**3. Grouping Logic:**
Don't describe every bar or every line. Group by:
- **Trends**: Things going up vs. things going down.
- **Magnitude**: Big players vs. small players.
- **Time**: Beginning of the period vs. the end.`,
      examples: [
        { 
          sentence: '**Prompt Paraphrasing:**\n"The graph shows the consumption of energy in the USA from 1980 to 2030."\n\n**Band 9 Paraphrase:** "The line graph illustrates the levels of energy usage in the United States over a fifty-year period, with actual data from 1980 to 2015 and projections until 2030."', 
          explanation: 'Note the use of "illustrates", "levels of energy usage", and "projections" to avoid repetition.' 
        },
        { 
          sentence: '**Overview Comparison:**\n"Overall, it is evident that while the consumption of fossil fuels is expected to dominate energy usage throughout the period, renewable energy sources are projected to show the most significant growth rate."', 
          explanation: 'This identifies the main trend (fossil fuels dominate) and the most interesting change (renewables grow fastest).' 
        }
      ],
      commonMistakes: [
        { mistake: 'Including your own opinion', correction: 'Never say "This is because..." or "I think this is good."', explanation: 'Task 1 is purely objective. Only describe what is on the paper.' },
        { mistake: 'Describing every single point', correction: 'Select key features and make comparisons.', explanation: 'Listing every number makes your report boring and lowers your Coherence score.' }
      ],
      miniPractice: [
        { question: 'Which paragraph is the most important for Task Achievement?', options: ['Introduction', 'Overview', 'Body 1', 'Conclusion'], type: 'multiple-choice' },
        { question: 'True/False: You should always write a conclusion in Task 1.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Overview',
        'False (An overview is needed, but a traditional "Conclusion" is for Task 2)'
      ],
      quickRecap: 'Task 1 Academic = Structure + Selectivity + Comparison. Master the Overview first! Use "Divide-and-Conquer" to group your data logically and never describe every single bar/line individually.',
      speakingLines: [
        "The graph illustrates a clear upward trend in...",
        "In stark contrast, the figures for X plummeted to...",
        "A closer look at the data reveals that..."
      ]
    }
  },
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
  },
  // ============================================
  // TASK 2: Problem-Solution Essays
  // ============================================
  {
    id: 'writing-task2-problem-solution-1',
    title: 'Problem-Solution Essay: Urban Traffic',
    slug: 'problem-solution-urban-traffic',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 2 Problem-Solution',
    description: 'Master the problem-solution essay format with Band 9 techniques for discussing urban traffic congestion.',
    is_premium: true,
    is_published: true,
    view_count: 1800,
    created_at: '2025-06-20T10:00:00Z',
    updated_at: '2025-06-20T10:00:00Z',
    estimated_time: 45,
    content: {
      title: 'Problem-Solution Essay: Urban Traffic',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure a problem-solution essay effectively',
        'Identify and explain causes clearly',
        'Propose realistic, well-developed solutions',
        'Use cause-effect language at Band 9 level'
      ],
      coreExplanation: `**IELTS Task 2 Question:**
"Traffic congestion is becoming a major problem in most cities. What are the causes of this problem and what measures could be taken to reduce traffic in big cities?"

**Planning (5 minutes):**
1. Question type: Problem-Solution (Causes + Solutions)
2. Causes: Car ownership increase, inadequate public transport, urban sprawl
3. Solutions: Improve public transport, congestion charges, remote work policies

**Band 9 Structure:**
- Introduction: Paraphrase problem + outline (causes and solutions)
- Body 1: 2-3 main causes with explanations
- Body 2: 2-3 practical solutions with reasoning
- Conclusion: Summarize key points + future outlook`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Introduction):**\n\n"Urban traffic congestion has emerged as one of the most pressing challenges facing metropolitan areas worldwide. This essay will examine the primary factors contributing to this phenomenon before proposing viable measures to alleviate the problem."', explanation: '**Why Band 9:** Sophisticated paraphrase (pressing challenges, metropolitan areas), clear essay direction, academic register, no wasted words.' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 1 - Causes):**\n\n"The escalating traffic crisis can be attributed to several interconnected factors. Foremost among these is the dramatic increase in private vehicle ownership, driven by rising incomes and the perception of cars as status symbols. Additionally, many cities suffer from inadequate public transportation infrastructure, leaving commuters with few viable alternatives to driving. Urban sprawl further exacerbates the problem, as residential areas expand outward, increasing commute distances and dependency on personal vehicles."', explanation: '**Why Band 9:** Clear topic sentence, three well-developed causes, sophisticated vocabulary (escalating, attributed to, exacerbates), logical flow with linking words (Foremost, Additionally, further).' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 2 - Solutions):**\n\n"Addressing this multifaceted issue requires a combination of policy interventions and infrastructure investment. Governments should prioritize expanding and modernizing public transit networks, making them more affordable, reliable, and extensive. Implementing congestion pricing in city centers, as successfully demonstrated in Singapore and London, can discourage unnecessary car journeys while generating revenue for transport improvements. Furthermore, promoting remote work policies and flexible hours can distribute traffic more evenly throughout the day, reducing peak-hour bottlenecks."', explanation: '**Why Band 9:** Practical solutions with real examples (Singapore, London), clear reasoning for each solution, sophisticated vocabulary (multifaceted, interventions, bottlenecks), varied sentence structures.' },
        { sentence: '**CAUSE-EFFECT LANGUAGE:**\n\n**Describing causes:**\n- X can be attributed to...\n- The primary factor contributing to X is...\n- X stems from / arises from...\n- X is driven by / fueled by...\n\n**Describing effects:**\n- This has led to / resulted in...\n- As a consequence / As a result...\n- X has given rise to...\n- The ramifications of X include...\n\n**Proposing solutions:**\n- To address this issue, governments should...\n- One effective measure would be to...\n- X could be mitigated by...\n- A viable solution involves...', explanation: 'These phrases demonstrate sophisticated cause-effect reasoning essential for Band 8-9 scores.' }
      ],
      commonMistakes: [
        { mistake: 'Listing causes without explanation', correction: 'Develop each cause with reasoning: "Car ownership has increased BECAUSE rising incomes make vehicles affordable AND cars are seen as status symbols"', explanation: 'Band 9 requires fully developed ideas, not just a list.' },
        { mistake: 'Proposing unrealistic solutions', correction: 'Suggest practical, implementable solutions with real-world examples', explanation: 'Solutions like "ban all cars" are unrealistic. Use examples from cities that have succeeded.' },
        { mistake: 'Not connecting causes to solutions', correction: 'Your solutions should directly address the causes you identified', explanation: 'If you say "inadequate public transport" is a cause, your solution should include improving public transport.' },
        { mistake: 'Using "problem" and "solution" repeatedly', correction: 'Use synonyms: issue, challenge, crisis / measure, approach, intervention, strategy', explanation: 'Vocabulary range is 25% of your score. Vary your word choice.' },
        { mistake: 'Weak conclusion that just repeats the introduction', correction: 'Summarize key points and add a forward-looking statement', explanation: 'Band 9 conclusions add value, not just repetition.' }
      ],
      miniPractice: [
        { question: 'Which phrase best introduces a cause?', options: ['"The problem is..."', '"X can be attributed to..."', '"I think the reason is..."', '"Because of..."'], type: 'multiple-choice' },
        { question: 'Rewrite: "Traffic is bad because many people have cars."', type: 'rewrite' },
        { question: 'Which is a realistic solution for traffic?', options: ['Ban all private vehicles', 'Implement congestion pricing in city centers', 'Make everyone work from home', 'Build roads everywhere'], type: 'multiple-choice' },
        { question: 'Complete: "To _____ this issue, governments should prioritize public transport investment."', type: 'fill-blank' }
      ],
      answerKey: [
        '"X can be attributed to..."',
        'The escalating traffic crisis can be attributed to the dramatic increase in private vehicle ownership, driven by rising incomes and improved affordability.',
        'Implement congestion pricing in city centers',
        'address/tackle/mitigate'
      ],
      quickRecap: 'Problem-Solution Formula: 1) Paraphrase problem + outline, 2) 2-3 causes with full development, 3) 2-3 practical solutions with examples, 4) Summary + outlook. Use cause-effect language (attributed to, stems from, has led to). Connect solutions to causes. Include real-world examples.',
      collocations: [
        'traffic congestion', 'urban sprawl', 'public transit', 'congestion pricing',
        'peak hours', 'commute distances', 'infrastructure investment', 'policy interventions',
        'viable alternatives', 'pressing challenge', 'multifaceted issue', 'bottlenecks'
      ],
      synonyms: [
        { word: 'problem', synonyms: ['issue', 'challenge', 'crisis', 'concern'] },
        { word: 'solution', synonyms: ['measure', 'approach', 'intervention', 'strategy'] },
        { word: 'cause', synonyms: ['factor', 'reason', 'contributor', 'driver'] }
      ],
      speakingLines: [
        'Traffic congestion can be attributed to several interconnected factors.',
        'To address this multifaceted issue, governments should prioritize public transport.',
        'Congestion pricing has been successfully implemented in cities like Singapore and London.'
      ]
    }
  },
  // ============================================
  // TASK 2: Advantages-Disadvantages Essays
  // ============================================
  {
    id: 'writing-task2-advdis-1',
    title: 'Advantages-Disadvantages: Remote Work',
    slug: 'advantages-disadvantages-remote-work',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 2 Advantages-Disadvantages',
    description: 'Master the advantages-disadvantages essay format with Band 9 techniques for discussing remote work.',
    is_premium: true,
    is_published: true,
    view_count: 2000,
    created_at: '2025-06-21T10:00:00Z',
    updated_at: '2025-06-21T10:00:00Z',
    estimated_time: 45,
    content: {
      title: 'Advantages-Disadvantages: Remote Work',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure an advantages-disadvantages essay effectively',
        'Present balanced arguments with equal development',
        'Use comparison and contrast language',
        'Decide when to give your opinion (if asked)'
      ],
      coreExplanation: `**IELTS Task 2 Question:**
"More and more people are working from home rather than in offices. What are the advantages and disadvantages of this trend?"

**Planning (5 minutes):**
1. Question type: Advantages-Disadvantages (NO opinion required unless asked)
2. Advantages: Flexibility, no commute, work-life balance, cost savings
3. Disadvantages: Isolation, blurred boundaries, communication challenges, career progression

**Band 9 Structure:**
- Introduction: Paraphrase trend + outline (will discuss both)
- Body 1: 2-3 advantages with development
- Body 2: 2-3 disadvantages with development
- Conclusion: Balanced summary (opinion only if question asks)`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Introduction):**\n\n"The shift toward remote work has accelerated dramatically in recent years, fundamentally transforming traditional employment patterns. This essay will examine both the benefits and drawbacks of this increasingly prevalent working arrangement."', explanation: '**Why Band 9:** Sophisticated paraphrase (shift toward, accelerated dramatically), context (recent years), clear direction, academic vocabulary (prevalent, arrangement).' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 1 - Advantages):**\n\n"Remote work offers several compelling advantages for both employees and employers. Perhaps most significantly, it eliminates commuting time, allowing workers to reclaim hours previously lost to travel while simultaneously reducing their carbon footprint. Additionally, the flexibility to structure one\'s workday around personal commitments can enhance work-life balance, particularly for parents managing childcare responsibilities. From an organizational perspective, companies can reduce overhead costs associated with maintaining physical office spaces and access a broader talent pool unrestricted by geographical limitations."', explanation: '**Why Band 9:** Multiple perspectives (employees AND employers), fully developed points with reasoning, sophisticated vocabulary (compelling, reclaim, overhead costs), varied sentence structures.' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 2 - Disadvantages):**\n\n"However, remote work is not without its drawbacks. The absence of face-to-face interaction can lead to feelings of isolation and disconnection from colleagues, potentially impacting mental health and team cohesion. Furthermore, the blurring of boundaries between professional and personal life may result in employees working longer hours, paradoxically undermining the work-life balance that remote work ostensibly promotes. Career advancement may also suffer, as remote workers often have reduced visibility and fewer opportunities for informal networking that can influence promotion decisions."', explanation: '**Why Band 9:** Clear contrast (However), balanced treatment, sophisticated vocabulary (paradoxically, ostensibly, cohesion), cause-effect reasoning, multiple developed points.' },
        { sentence: '**COMPARISON LANGUAGE:**\n\n**Introducing advantages:**\n- X offers several compelling advantages...\n- One significant benefit is...\n- Perhaps most importantly...\n- From X\'s perspective...\n\n**Introducing disadvantages:**\n- However, X is not without its drawbacks...\n- On the other hand...\n- Conversely...\n- Nevertheless, there are concerns regarding...\n\n**Balanced conclusion:**\n- While X offers clear benefits, the drawbacks cannot be overlooked...\n- On balance, both advantages and disadvantages are significant...\n- Ultimately, the impact depends on...', explanation: 'These phrases help structure a balanced argument and demonstrate sophisticated language use.' }
      ],
      commonMistakes: [
        { mistake: 'Giving opinion when not asked', correction: 'Only give your opinion if the question explicitly asks "Do you think the advantages outweigh the disadvantages?"', explanation: 'Adding unsolicited opinion can hurt Task Response if the question only asks to discuss both sides.' },
        { mistake: 'Unbalanced paragraphs (3 advantages, 1 disadvantage)', correction: 'Give roughly equal space and development to both sides', explanation: 'Unbalanced treatment suggests you cannot discuss both perspectives fairly.' },
        { mistake: 'Listing points without development', correction: 'Each point needs: statement + explanation + example/result', explanation: 'Band 9 requires fully extended and supported ideas.' },
        { mistake: 'Using "pros and cons" in academic writing', correction: 'Use "advantages and disadvantages" or "benefits and drawbacks"', explanation: '"Pros and cons" is too informal for academic writing.' },
        { mistake: 'Repeating the same linking words', correction: 'Vary: Additionally/Furthermore/Moreover, However/Nevertheless/Conversely', explanation: 'Repetitive linking words suggest limited vocabulary range.' }
      ],
      miniPractice: [
        { question: 'Should you give your opinion in an advantages-disadvantages essay?', options: ['Always', 'Never', 'Only if the question asks', 'Only in the conclusion'], type: 'multiple-choice' },
        { question: 'Rewrite informally: "The pros of working from home include flexibility."', type: 'rewrite' },
        { question: 'Which phrase introduces a disadvantage?', options: ['"Additionally..."', '"However, X is not without its drawbacks..."', '"Furthermore..."', '"One benefit is..."'], type: 'multiple-choice' },
        { question: 'Complete: "Remote work offers several _____ advantages for both employees and employers."', type: 'fill-blank' }
      ],
      answerKey: [
        'Only if the question asks',
        'Remote work offers several compelling advantages, including the flexibility to structure one\'s workday around personal commitments.',
        '"However, X is not without its drawbacks..."',
        'compelling/significant/notable'
      ],
      quickRecap: 'Advantages-Disadvantages Formula: 1) Paraphrase + outline, 2) 2-3 advantages with full development, 3) 2-3 disadvantages with equal development, 4) Balanced summary. Only give opinion if asked. Use comparison language (However, Conversely, On the other hand). Develop each point fully.',
      collocations: [
        'remote work', 'work-life balance', 'carbon footprint', 'overhead costs',
        'talent pool', 'team cohesion', 'career advancement', 'promotion decisions',
        'geographical limitations', 'working arrangement', 'face-to-face interaction', 'informal networking'
      ],
      synonyms: [
        { word: 'advantage', synonyms: ['benefit', 'merit', 'positive aspect', 'upside'] },
        { word: 'disadvantage', synonyms: ['drawback', 'downside', 'limitation', 'negative aspect'] },
        { word: 'increase', synonyms: ['rise', 'growth', 'surge', 'expansion'] }
      ],
      speakingLines: [
        'Remote work offers several compelling advantages for both employees and employers.',
        'However, remote work is not without its drawbacks.',
        'On balance, both the advantages and disadvantages are significant.'
      ]
    }
  },
  // ============================================
  // TASK 2: Two-Part Question Essays
  // ============================================
  {
    id: 'writing-task2-twopart-1',
    title: 'Two-Part Question: Youth Unemployment',
    slug: 'two-part-question-youth-unemployment',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 2 Two-Part Question',
    description: 'Master the two-part question format with Band 9 techniques for discussing youth unemployment.',
    is_premium: true,
    is_published: true,
    view_count: 1700,
    created_at: '2025-06-22T10:00:00Z',
    updated_at: '2025-06-22T10:00:00Z',
    estimated_time: 45,
    content: {
      title: 'Two-Part Question: Youth Unemployment',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Identify and address both parts of a two-part question',
        'Structure your essay to give equal weight to both questions',
        'Develop answers with specific examples and reasoning',
        'Avoid the common mistake of focusing on only one part'
      ],
      coreExplanation: `**IELTS Task 2 Question:**
"Youth unemployment is a growing problem in many countries. What are the causes of this situation? What measures can governments take to address it?"

**Planning (5 minutes):**
1. Question type: Two-Part (Causes + Measures)
2. Part 1 - Causes: Skills mismatch, economic recession, automation
3. Part 2 - Measures: Vocational training, incentives for employers, entrepreneurship support

**Band 9 Structure:**
- Introduction: Paraphrase + acknowledge both parts
- Body 1: Answer Part 1 (causes) with 2-3 developed points
- Body 2: Answer Part 2 (measures) with 2-3 developed points
- Conclusion: Summarize both parts briefly`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Introduction):**\n\n"Youth unemployment has emerged as a critical socioeconomic challenge affecting nations across the globe. This essay will explore the underlying causes of this phenomenon before examining potential governmental interventions to mitigate the problem."', explanation: '**Why Band 9:** Clear acknowledgment of both parts (causes + interventions), sophisticated vocabulary (socioeconomic, phenomenon, mitigate), academic register.' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 1 - Causes):**\n\n"Several factors contribute to the high rates of unemployment among young people. Primarily, there exists a significant mismatch between the skills acquired through formal education and those demanded by the contemporary job market. Many graduates possess theoretical knowledge but lack practical competencies valued by employers. Economic downturns further exacerbate the situation, as companies facing financial constraints often implement hiring freezes or reduce entry-level positions first. Additionally, technological advancement and automation have eliminated numerous traditional entry-level roles, particularly in manufacturing and administrative sectors."', explanation: '**Why Band 9:** Three well-developed causes, sophisticated vocabulary (mismatch, competencies, exacerbate), clear logical flow, specific examples (manufacturing, administrative).' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 2 - Measures):**\n\n"Governments can implement various strategies to address youth unemployment. Investing in vocational training programs that align curricula with industry needs would help bridge the skills gap, ensuring graduates possess market-relevant competencies. Providing tax incentives or subsidies to companies that hire young workers could encourage employers to take on inexperienced staff despite the associated training costs. Furthermore, supporting youth entrepreneurship through accessible funding, mentorship programs, and reduced bureaucratic barriers could enable young people to create their own employment opportunities rather than competing for limited positions."', explanation: '**Why Band 9:** Three practical measures with clear reasoning, sophisticated vocabulary (align curricula, bureaucratic barriers), cause-effect logic, varied sentence structures.' },
        { sentence: '**TWO-PART QUESTION STRATEGY:**\n\n**Key principle:** Both parts must receive EQUAL attention\n\n**Common structures:**\n- Body 1 = Part 1, Body 2 = Part 2 (recommended)\n- Each body paragraph addresses both parts (harder to organize)\n\n**Transition between parts:**\n- "Having examined the causes, it is now necessary to consider..."\n- "Turning to potential solutions..."\n- "With regard to governmental measures..."\n\n**Conclusion must reference BOTH parts:**\n- "In conclusion, while X causes Y, governments can address this through..."', explanation: 'Two-part questions test your ability to address multiple aspects. Missing one part significantly lowers your Task Response score.' }
      ],
      commonMistakes: [
        { mistake: 'Focusing too much on one part', correction: 'Allocate roughly equal word count to both parts (about 100-120 words each in body paragraphs)', explanation: 'Unequal treatment suggests you cannot fully address the task.' },
        { mistake: 'Not clearly separating the two parts', correction: 'Use clear transitions: "Turning to the second question..." or dedicate one body paragraph to each part', explanation: 'Clear organization helps coherence and shows you understand the task structure.' },
        { mistake: 'Forgetting one part in the conclusion', correction: 'Your conclusion must briefly reference BOTH parts of the question', explanation: 'A conclusion that only mentions one part suggests incomplete task response.' },
        { mistake: 'Treating it as a problem-solution essay', correction: 'Two-part questions may ask for causes + effects, reasons + results, or other combinations - read carefully', explanation: 'Not all two-part questions are problem-solution. Identify exactly what each part asks.' },
        { mistake: 'Mixing the two parts throughout', correction: 'Keep the two parts clearly separated for better organization', explanation: 'Mixing parts can confuse the reader and hurt coherence scores.' }
      ],
      miniPractice: [
        { question: 'How should you structure a two-part question essay?', options: ['One body paragraph for each part', 'Mix both parts in every paragraph', 'Focus on the more interesting part', 'Write about one part only'], type: 'multiple-choice' },
        { question: 'Identify the two parts: "Why do people move to cities? Is this a positive development?"', type: 'rewrite' },
        { question: 'Which transition works between parts?', options: ['"Also..."', '"Turning to potential solutions..."', '"And..."', '"Next..."'], type: 'multiple-choice' },
        { question: 'Complete: "Having examined the causes, it is now necessary to _____ potential solutions."', type: 'fill-blank' }
      ],
      answerKey: [
        'One body paragraph for each part',
        'Part 1: Reasons why people move to cities. Part 2: Whether this is positive or negative (opinion required).',
        '"Turning to potential solutions..."',
        'consider/examine/explore'
      ],
      quickRecap: 'Two-Part Question Formula: 1) Acknowledge both parts in intro, 2) Body 1 = Part 1 fully developed, 3) Body 2 = Part 2 fully developed, 4) Conclusion references both. Give EQUAL attention to both parts. Use clear transitions between parts. Read carefully to identify exactly what each part asks.',
      collocations: [
        'youth unemployment', 'skills mismatch', 'job market', 'hiring freeze',
        'entry-level positions', 'vocational training', 'tax incentives', 'entrepreneurship',
        'bureaucratic barriers', 'market-relevant', 'socioeconomic challenge', 'governmental interventions'
      ],
      synonyms: [
        { word: 'unemployment', synonyms: ['joblessness', 'lack of employment', 'worklessness'] },
        { word: 'young people', synonyms: ['youth', 'young adults', 'the younger generation', 'school leavers'] },
        { word: 'government', synonyms: ['authorities', 'policymakers', 'the state', 'administration'] }
      ],
      speakingLines: [
        'Youth unemployment has emerged as a critical socioeconomic challenge.',
        'Several factors contribute to the high rates of unemployment among young people.',
        'Governments can implement various strategies to address this issue.'
      ]
    }
  },
  // ============================================
  // TASK 1 GENERAL: Formal Letter
  // ============================================
  {
    id: 'writing-task1-formal-letter',
    title: 'Task 1 General: Formal Letter',
    slug: 'task1-formal-letter-complaint',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 General',
    description: 'Master formal letter writing for IELTS General Training with Band 9 techniques for complaints and requests.',
    is_premium: false,
    is_published: true,
    view_count: 2200,
    created_at: '2025-06-23T10:00:00Z',
    updated_at: '2025-06-23T10:00:00Z',
    estimated_time: 30,
    content: {
      title: 'Task 1 General: Formal Letter',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure a formal letter correctly',
        'Use appropriate formal register and tone',
        'Write effective complaints and requests',
        'Avoid common formality mistakes'
      ],
      coreExplanation: `**IELTS General Training Task 1:**
"You recently purchased a product online, but it arrived damaged. Write a letter to the company. In your letter:
- describe the product and when you ordered it
- explain the problem
- say what action you would like the company to take"

**Formal Letter Structure:**
- Opening: Dear Sir/Madam, (if name unknown) or Dear Mr/Ms [Name],
- Paragraph 1: State purpose clearly
- Paragraph 2: Provide details/explain situation
- Paragraph 3: State what action you want
- Closing: Yours faithfully, (if Dear Sir/Madam) or Yours sincerely, (if name used)

**Word Count:** 150+ words (aim for 170-190)`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER:**\n\nDear Sir or Madam,\n\nI am writing to express my dissatisfaction with a recent purchase from your online store and to request appropriate compensation.\n\nOn 15th November, I ordered a ceramic dinner set (Order #45892) from your website, which was delivered on 22nd November. Upon opening the package, I discovered that three of the six plates were cracked and one bowl had a large chip on the rim. The damage appears to have occurred during transit, as the packaging was inadequate – the items were wrapped only in thin paper with no protective padding.\n\nI would appreciate it if you could arrange for a full replacement of the damaged items at no additional cost. Alternatively, I would accept a partial refund equivalent to the value of the broken pieces. I have attached photographs of the damage for your reference.\n\nI look forward to your prompt response and a satisfactory resolution to this matter.\n\nYours faithfully,\nJohn Smith', explanation: '**Why Band 9:** Correct format, appropriate formal register, all bullet points addressed, clear and specific details, polite but firm tone, appropriate closing.' },
        { sentence: '**FORMAL LETTER PHRASES:**\n\n**Opening purpose:**\n- I am writing to express my concern regarding...\n- I am writing to request...\n- I am writing to complain about...\n- I wish to bring to your attention...\n\n**Explaining the situation:**\n- On [date], I [action]...\n- Upon [doing something], I discovered that...\n- Despite [expectation], [what happened]...\n\n**Requesting action:**\n- I would appreciate it if you could...\n- I would be grateful if you would...\n- I request that you...\n- I expect [action] to be taken...\n\n**Closing:**\n- I look forward to your prompt response.\n- I trust this matter will be resolved swiftly.\n- Please do not hesitate to contact me if you require further information.', explanation: 'These phrases demonstrate appropriate formal register. Memorize 2-3 from each category.' },
        { sentence: '**FORMAL vs INFORMAL COMPARISON:**\n\n**Informal:** "I bought this thing and it came broken. Can you fix it?"\n**Formal:** "I am writing to express my dissatisfaction with a recent purchase, which arrived in a damaged condition. I would appreciate it if you could arrange for a replacement."\n\n**Informal:** "Thanks for getting back to me."\n**Formal:** "Thank you for your prompt response to my enquiry."\n\n**Informal:** "Let me know what you can do."\n**Formal:** "I would be grateful if you could inform me of the available options."', explanation: 'Formal letters require: full forms (not contractions), polite phrases, passive voice where appropriate, no slang or colloquialisms.' },
        { sentence: '**COMMON FORMAL LETTER SCENARIOS:**\n\n1. **Complaint:** Product/service issues, noise complaints, billing errors\n2. **Request:** Information, permission, recommendation letter\n3. **Application:** Job application, course application\n4. **Suggestion:** Improvements to services, facilities\n\n**Key for all:** Identify the tone required (formal/semi-formal/informal) and maintain it consistently throughout.', explanation: 'The question will indicate the recipient (manager, company, council) which tells you the formality level required.' }
      ],
      commonMistakes: [
        { mistake: 'Using contractions (don\'t, can\'t, I\'m)', correction: 'Use full forms: do not, cannot, I am', explanation: 'Contractions are informal. Formal letters require full forms throughout.' },
        { mistake: 'Wrong closing (Yours sincerely with Dear Sir/Madam)', correction: 'Dear Sir/Madam → Yours faithfully; Dear Mr/Ms X → Yours sincerely', explanation: 'This is a fixed rule in British English formal letters.' },
        { mistake: 'Being too aggressive or emotional', correction: 'Maintain a polite but firm tone: "I would appreciate" not "You must"', explanation: 'Even complaints should be professional. Aggressive tone is inappropriate.' },
        { mistake: 'Not addressing all bullet points', correction: 'Check each bullet point is clearly addressed in your letter', explanation: 'Missing bullet points directly affects Task Response score.' },
        { mistake: 'Starting with "I am John Smith and I am writing..."', correction: 'Start with purpose: "I am writing to..." Your name goes at the end.', explanation: 'Your name appears in the signature, not the opening.' }
      ],
      miniPractice: [
        { question: 'What closing should you use with "Dear Sir or Madam"?', options: ['Yours sincerely', 'Yours faithfully', 'Best regards', 'Kind regards'], type: 'multiple-choice' },
        { question: 'Rewrite informally: "I\'m really angry about this broken thing you sent me!"', type: 'rewrite' },
        { question: 'Which phrase is appropriately formal?', options: ['"Can you fix this?"', '"I would appreciate it if you could..."', '"You need to sort this out"', '"Please help me ASAP"'], type: 'multiple-choice' },
        { question: 'Complete: "I am writing to express my _____ with a recent purchase."', type: 'fill-blank' }
      ],
      answerKey: [
        'Yours faithfully',
        'I am writing to express my dissatisfaction with a recent purchase, which arrived in a damaged condition.',
        '"I would appreciate it if you could..."',
        'dissatisfaction/concern/disappointment'
      ],
      quickRecap: 'Formal Letter Formula: Dear Sir/Madam → Yours faithfully; Dear Mr/Ms X → Yours sincerely. No contractions. Polite but firm tone. Address ALL bullet points. Structure: Purpose → Details → Action requested → Polite closing. Aim for 170-190 words.',
      collocations: [
        'express dissatisfaction', 'prompt response', 'satisfactory resolution', 'at your earliest convenience',
        'bring to your attention', 'further information', 'appropriate compensation', 'partial refund',
        'no additional cost', 'for your reference', 'trust this matter', 'do not hesitate'
      ],
      synonyms: [
        { word: 'complain', synonyms: ['express dissatisfaction', 'raise concerns', 'bring to attention'] },
        { word: 'want', synonyms: ['request', 'would appreciate', 'would be grateful for'] },
        { word: 'problem', synonyms: ['issue', 'matter', 'concern', 'difficulty'] }
      ],
      speakingLines: [
        'I am writing to express my dissatisfaction with a recent purchase.',
        'I would appreciate it if you could arrange for a replacement.',
        'I look forward to your prompt response.'
      ]
    }
  },
  {
    id: 'writing-task1-informal-letter',
    title: 'Task 1 General: Informal Letter',
    slug: 'task1-informal-letter-friend',
    type: 'writing',
    level: 'beginner',
    topic: 'Task 1 General',
    description: 'Master informal letter writing for IELTS General Training with natural, friendly language.',
    is_premium: true,
    is_published: true,
    view_count: 1900,
    created_at: '2025-06-24T10:00:00Z',
    updated_at: '2025-06-24T10:00:00Z',
    estimated_time: 30,
    content: {
      title: 'Task 1 General: Informal Letter',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Write naturally to friends and family',
        'Use appropriate informal register',
        'Include personal touches and warmth',
        'Avoid being too formal or too casual'
      ],
      coreExplanation: `**IELTS General Training Task 1:**
"A friend is coming to visit your city for the first time. Write a letter to your friend. In your letter:
- suggest places they should visit
- recommend where they should stay
- offer to help during their visit"

**Informal Letter Structure:**
- Opening: Dear [Name], / Hi [Name],
- Paragraph 1: Warm opening + acknowledge situation
- Paragraph 2-3: Address the bullet points naturally
- Closing: Warm sign-off + your name

**Word Count:** 150+ words (aim for 170-190)`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER:**\n\nDear Sarah,\n\nI was so excited to hear you\'re finally coming to visit! I\'ve been looking forward to showing you around my city for ages.\n\nThere are so many amazing places I want to take you to. The old town is absolutely stunning – we could spend a whole day wandering through the narrow streets and stopping at cute cafes. The art museum is also worth a visit if you\'re interested, and there\'s a fantastic viewpoint on the hill that offers breathtaking views of the whole city, especially at sunset.\n\nAs for accommodation, I\'d recommend the boutique hotel near the main square. It\'s reasonably priced and the location is perfect for exploring. Of course, you\'re more than welcome to stay at my place if you\'d prefer – I have a spare room and it would be lovely to catch up properly!\n\nI\'ve already taken some time off work, so I\'ll be free to show you around. Just let me know your dates and I\'ll plan some activities.\n\nCan\'t wait to see you!\n\nLove,\nEmma', explanation: '**Why Band 9:** Natural, warm tone; contractions used appropriately; personal touches (excitement, offering spare room); all bullet points addressed; appropriate informal closing.' },
        { sentence: '**INFORMAL LETTER PHRASES:**\n\n**Warm openings:**\n- I was so excited/delighted to hear...\n- It\'s been ages since we last spoke!\n- How are things with you?\n- Thanks so much for your letter/email.\n\n**Making suggestions:**\n- You should definitely check out...\n- I\'d highly recommend...\n- You\'ll love...\n- Make sure you don\'t miss...\n\n**Offering help:**\n- I\'d be happy to...\n- Feel free to...\n- Just let me know if you need...\n- I\'m more than willing to...\n\n**Warm closings:**\n- Can\'t wait to see you!\n- Looking forward to hearing from you.\n- Take care and see you soon!\n- Write back soon!', explanation: 'These phrases create a natural, friendly tone. Use contractions and personal expressions.' },
        { sentence: '**INFORMAL vs FORMAL COMPARISON:**\n\n**Formal:** "I am writing to inform you that I will be available to assist you during your visit."\n**Informal:** "I\'ve taken some time off work, so I\'ll be free to show you around!"\n\n**Formal:** "I would recommend the establishment located in the central district."\n**Informal:** "There\'s this amazing little hotel near the main square – you\'ll love it!"\n\n**Formal:** "Please do not hesitate to contact me."\n**Informal:** "Just give me a call if you need anything!"', explanation: 'Informal letters should sound like you\'re talking to a friend. Use contractions, exclamation marks (sparingly), and personal expressions.' },
        { sentence: '**COMMON INFORMAL LETTER SCENARIOS:**\n\n1. **Invitation:** Inviting a friend to an event/visit\n2. **Advice:** Giving suggestions to a friend\n3. **News:** Sharing personal news or updates\n4. **Thanks:** Thanking a friend for something\n5. **Apology:** Apologizing for something\n\n**Key:** Sound natural and warm, but still address all bullet points clearly.', explanation: 'Even informal letters must address all parts of the task. Don\'t sacrifice content for friendliness.' }
      ],
      commonMistakes: [
        { mistake: 'Being too formal ("I am writing to inform you...")', correction: 'Use natural, conversational language: "I was so happy to hear..."', explanation: 'Overly formal language in an informal letter sounds unnatural and affects your score.' },
        { mistake: 'Using "Dear Sir/Madam" for a friend', correction: 'Use "Dear [Name]" or "Hi [Name]"', explanation: 'The question will indicate the relationship. Friends don\'t write "Dear Sir/Madam" to each other.' },
        { mistake: 'No personal touches or warmth', correction: 'Add expressions of emotion: "I\'m so excited!", "I can\'t wait!", "It would be lovely to..."', explanation: 'Informal letters should show personality and warmth.' },
        { mistake: 'Ending with "Yours faithfully"', correction: 'Use informal closings: "Love,", "Take care,", "See you soon,", "Best wishes,"', explanation: '"Yours faithfully" is for formal letters only.' },
        { mistake: 'Not using contractions at all', correction: 'Use contractions naturally: "I\'m", "you\'ll", "can\'t", "it\'s"', explanation: 'No contractions makes informal letters sound stiff and unnatural.' }
      ],
      miniPractice: [
        { question: 'Which opening is appropriate for a letter to a friend?', options: ['Dear Sir or Madam', 'To Whom It May Concern', 'Hi Sarah!', 'Dear Customer'], type: 'multiple-choice' },
        { question: 'Rewrite formally: "I was so excited to hear you\'re coming to visit!"', type: 'rewrite' },
        { question: 'Which closing is appropriate for an informal letter?', options: ['Yours faithfully', 'Yours sincerely', 'Take care and see you soon!', 'I remain, respectfully yours'], type: 'multiple-choice' },
        { question: 'Complete: "I\'ve taken some time off work, so I\'ll be _____ to show you around!"', type: 'fill-blank' }
      ],
      answerKey: [
        'Hi Sarah!',
        'I was pleased to receive news of your upcoming visit.',
        'Take care and see you soon!',
        'free/happy/able'
      ],
      quickRecap: 'Informal Letter Formula: Dear/Hi [Name] → Warm opening → Address bullet points naturally → Warm closing + name. Use contractions, personal expressions, exclamation marks (sparingly). Sound like you\'re talking to a friend. Still address ALL bullet points clearly.',
      collocations: [
        'can\'t wait', 'looking forward to', 'it\'s been ages', 'catch up',
        'show you around', 'more than welcome', 'feel free', 'let me know',
        'take care', 'see you soon', 'write back', 'keep in touch'
      ],
      synonyms: [
        { word: 'happy', synonyms: ['excited', 'delighted', 'thrilled', 'pleased'] },
        { word: 'good', synonyms: ['amazing', 'fantastic', 'wonderful', 'lovely'] },
        { word: 'help', synonyms: ['give you a hand', 'show you around', 'be there for you'] }
      ],
      speakingLines: [
        'I was so excited to hear you\'re coming to visit!',
        'You\'re more than welcome to stay at my place.',
        'Can\'t wait to see you!'
      ]
    }
  },
  {
    id: 'writing-task1-semiformal-letter',
    title: 'Task 1 General: Semi-Formal Letter',
    slug: 'task1-semiformal-letter-landlord',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 General',
    description: 'Master semi-formal letter writing for situations like writing to a landlord, neighbor, or colleague.',
    is_premium: true,
    is_published: true,
    view_count: 1600,
    created_at: '2025-06-25T10:00:00Z',
    updated_at: '2025-06-25T10:00:00Z',
    estimated_time: 30,
    content: {
      title: 'Task 1 General: Semi-Formal Letter',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Identify when semi-formal tone is appropriate',
        'Balance politeness with friendliness',
        'Write to landlords, neighbors, and colleagues',
        'Avoid being too formal or too casual'
      ],
      coreExplanation: `**IELTS General Training Task 1:**
"You have been living in a rented apartment for a year. There is a problem with the heating system. Write a letter to your landlord. In your letter:
- describe the problem
- explain how it is affecting you
- suggest what should be done"

**Semi-Formal = You know the person but it's not a close friend**
Examples: Landlord, neighbor, colleague, teacher, club organizer

**Semi-Formal Letter Structure:**
- Opening: Dear Mr/Ms [Name],
- Paragraph 1: State purpose politely
- Paragraph 2-3: Address bullet points
- Closing: Best regards, / Kind regards,`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER:**\n\nDear Mr Thompson,\n\nI am writing to bring to your attention a problem with the heating system in my apartment at 24 Oak Street, which I have been renting for the past year.\n\nOver the past two weeks, the central heating has been functioning intermittently, often shutting off completely during the night. Given that temperatures have dropped significantly this month, this has made the apartment uncomfortably cold, particularly in the mornings. I have tried adjusting the thermostat and checking the radiators, but the problem persists.\n\nI would be grateful if you could arrange for a qualified technician to inspect and repair the system at your earliest convenience. I am generally available on weekday evenings and weekends if you need to schedule a visit. Please let me know if you require any further information.\n\nThank you for your attention to this matter. I look forward to hearing from you soon.\n\nBest regards,\nDavid Chen', explanation: '**Why Band 9:** Appropriate semi-formal tone (polite but not stiff), all bullet points addressed, specific details, reasonable request, professional closing.' },
        { sentence: '**SEMI-FORMAL TONE GUIDE:**\n\n**More formal than informal:**\n- Use "Dear Mr/Ms [Name]" not "Hi"\n- Avoid excessive exclamation marks\n- Don\'t use slang or very casual expressions\n\n**Less formal than formal:**\n- Can use some contractions (I\'ve, it\'s)\n- More personal tone than business letters\n- "Best regards" rather than "Yours faithfully"\n\n**The balance:**\n- Polite and respectful\n- Clear and direct\n- Friendly but professional', explanation: 'Semi-formal is the middle ground. Think: how would you write to a teacher you respect but have a good relationship with?' },
        { sentence: '**SEMI-FORMAL PHRASES:**\n\n**Opening purpose:**\n- I am writing to bring to your attention...\n- I am writing regarding...\n- I wanted to let you know about...\n\n**Explaining politely:**\n- I have noticed that...\n- Unfortunately, there seems to be...\n- I\'m afraid that...\n\n**Making requests:**\n- I would be grateful if you could...\n- Would it be possible to...\n- I was wondering if you could...\n\n**Closing:**\n- Thank you for your attention to this matter.\n- I look forward to hearing from you.\n- Please let me know if you need any further information.', explanation: 'These phrases strike the right balance between formal and friendly.' },
        { sentence: '**IDENTIFYING THE TONE:**\n\n**Formal:** Company, government office, unknown person\n→ Dear Sir/Madam, Yours faithfully\n\n**Semi-formal:** Landlord, neighbor, colleague, teacher\n→ Dear Mr/Ms [Name], Best regards\n\n**Informal:** Close friend, family member\n→ Hi/Dear [First name], Love/Take care\n\n**Key indicator:** Does the question give you a name? If yes, it\'s likely semi-formal or informal. Check the relationship to decide.', explanation: 'The question will indicate the recipient. Use this to determine the appropriate tone.' }
      ],
      commonMistakes: [
        { mistake: 'Being too formal ("I wish to formally notify you...")', correction: 'Use polite but natural language: "I am writing to let you know..."', explanation: 'Overly formal language sounds cold and distant for semi-formal relationships.' },
        { mistake: 'Being too casual ("Hey, the heating\'s broken!")', correction: 'Maintain politeness: "I am writing to bring to your attention a problem with the heating."', explanation: 'Too casual undermines the professional nature of the communication.' },
        { mistake: 'Using "Dear Sir/Madam" when a name is given', correction: 'Use "Dear Mr/Ms [Name]" when you know the person\'s name', explanation: 'Using the name shows appropriate familiarity for semi-formal relationships.' },
        { mistake: 'Ending with "Yours faithfully"', correction: 'Use "Best regards" or "Kind regards" for semi-formal letters', explanation: '"Yours faithfully" is too formal for someone you know.' },
        { mistake: 'Not being specific about the problem', correction: 'Include specific details: dates, locations, what you\'ve tried', explanation: 'Vague complaints are less effective. Specific details show you\'re reasonable.' }
      ],
      miniPractice: [
        { question: 'Which relationship requires semi-formal tone?', options: ['Writing to a company', 'Writing to your landlord', 'Writing to your best friend', 'Writing to a government office'], type: 'multiple-choice' },
        { question: 'Rewrite too formally: "I wish to formally lodge a complaint regarding the malfunctioning heating apparatus."', type: 'rewrite' },
        { question: 'Which closing is appropriate for a semi-formal letter?', options: ['Yours faithfully', 'Love', 'Best regards', 'Cheers'], type: 'multiple-choice' },
        { question: 'Complete: "I would be _____ if you could arrange for a technician to inspect the system."', type: 'fill-blank' }
      ],
      answerKey: [
        'Writing to your landlord',
        'I am writing to let you know about a problem with the heating system.',
        'Best regards',
        'grateful/appreciative'
      ],
      quickRecap: 'Semi-Formal Formula: Dear Mr/Ms [Name] → Polite purpose statement → Specific details → Reasonable request → Best regards. Balance politeness with friendliness. Not as stiff as formal, not as casual as informal. Use for landlords, neighbors, colleagues, teachers.',
      collocations: [
        'bring to your attention', 'at your earliest convenience', 'further information',
        'attention to this matter', 'look forward to hearing', 'please let me know',
        'would be grateful', 'was wondering if', 'I\'m afraid that', 'unfortunately'
      ],
      synonyms: [
        { word: 'problem', synonyms: ['issue', 'concern', 'difficulty', 'matter'] },
        { word: 'fix', synonyms: ['repair', 'resolve', 'address', 'rectify'] },
        { word: 'soon', synonyms: ['at your earliest convenience', 'as soon as possible', 'promptly'] }
      ],
      speakingLines: [
        'I am writing to bring to your attention a problem with the heating system.',
        'I would be grateful if you could arrange for a technician.',
        'Thank you for your attention to this matter.'
      ]
    }
  },
  // ============================================
  // TASK 1 ACADEMIC: Process Diagram
  // ============================================
  {
    id: 'writing-task1-process',
    title: 'Task 1 Academic: Process Diagram',
    slug: 'task1-process-diagram',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 Academic',
    description: 'Master process diagram description with Band 9 sequencing language and passive voice.',
    is_premium: true,
    is_published: true,
    view_count: 2100,
    created_at: '2025-06-26T10:00:00Z',
    updated_at: '2025-06-26T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Task 1 Academic: Process Diagram',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Describe processes using appropriate sequencing language',
        'Use passive voice correctly for process descriptions',
        'Organize information logically from start to finish',
        'Identify and describe key stages clearly'
      ],
      coreExplanation: `**Process Diagram Overview:**
Process diagrams show how something is made, how something works, or how something happens. They can be:
- Manufacturing processes (how chocolate is made)
- Natural processes (the water cycle)
- Abstract processes (how a law is passed)

**Band 9 Structure:**
- Introduction: Paraphrase what the process shows
- Overview: State the number of stages and start/end points
- Body 1: First half of the process
- Body 2: Second half of the process

**Key Language Features:**
- Passive voice (is harvested, are transported, is processed)
- Sequencing words (First, Then, Next, Subsequently, Finally)
- Present simple tense (for general processes)`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Introduction + Overview):**\n\n"The diagram illustrates the process by which chocolate is manufactured from cacao beans. Overall, the production involves multiple stages, beginning with the harvesting of cacao pods and culminating in the packaging of finished chocolate products. The process can be divided into two main phases: the initial processing of raw cacao and the subsequent manufacturing of chocolate."', explanation: '**Why Band 9:** Clear paraphrase, comprehensive overview stating start/end points and number of phases, sophisticated vocabulary (culminating, subsequent).' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 1):**\n\n"The process commences with the harvesting of ripe cacao pods from trees, which are then split open to extract the beans. These beans are subsequently fermented for several days in wooden containers before being spread out to dry in the sun. Once dried, the beans are transported to a processing facility where they are roasted at high temperatures. Following roasting, the outer shells are removed, leaving the inner nibs which are ground into a paste known as cacao liquor."', explanation: '**Why Band 9:** Clear sequencing (commences, subsequently, Once, Following), consistent passive voice, specific details, logical flow.' },
        { sentence: '**SEQUENCING LANGUAGE:**\n\n**Starting:**\n- The process begins/commences with...\n- Initially/First/Firstly...\n- At the first stage...\n\n**Continuing:**\n- Then/Next/Subsequently...\n- Following this/After this...\n- Once X is complete...\n- At the next stage...\n\n**Ending:**\n- Finally/Lastly...\n- The process concludes with...\n- At the final stage...\n- ...culminating in...', explanation: 'Vary your sequencing language throughout. Don\'t use "then" for every step.' },
        { sentence: '**PASSIVE VOICE FOR PROCESSES:**\n\n**Active (avoid):** "Workers harvest the beans."\n**Passive (use):** "The beans are harvested."\n\n**Why passive?** Process descriptions focus on WHAT happens, not WHO does it.\n\n**Common passive structures:**\n- is/are + past participle (is harvested, are transported)\n- is/are + past participle + by (is processed by machines)\n- can be + past participle (can be divided into)\n\n**Practice converting:**\n- "They roast the beans" → "The beans are roasted"\n- "Machines grind the nibs" → "The nibs are ground by machines"', explanation: 'Passive voice is essential for Band 7+ in process descriptions. Practice converting active to passive.' }
      ],
      commonMistakes: [
        { mistake: 'Using active voice throughout', correction: 'Use passive voice: "The beans are harvested" not "Farmers harvest the beans"', explanation: 'Process descriptions focus on the process, not the people. Passive voice is expected.' },
        { mistake: 'No overview paragraph', correction: 'Always include an overview stating the number of stages and start/end points', explanation: 'The overview is essential for Band 7+. It shows you can identify key features.' },
        { mistake: 'Using "firstly, secondly, thirdly" for every step', correction: 'Vary sequencing: "Initially... Subsequently... Following this... Finally..."', explanation: 'Repetitive sequencing suggests limited vocabulary range.' },
        { mistake: 'Describing every tiny detail', correction: 'Focus on main stages. Group minor steps together.', explanation: 'You have limited words. Focus on significant stages, not every small detail.' },
        { mistake: 'Using past tense for general processes', correction: 'Use present simple: "The beans are roasted" not "The beans were roasted"', explanation: 'General processes that happen regularly use present simple tense.' }
      ],
      miniPractice: [
        { question: 'Which voice should dominate in process descriptions?', options: ['Active voice', 'Passive voice', 'Both equally', 'Neither'], type: 'multiple-choice' },
        { question: 'Convert to passive: "Workers transport the beans to the factory."', type: 'rewrite' },
        { question: 'Which sequencing phrase is most sophisticated?', options: ['"Then..."', '"Subsequently..."', '"And then..."', '"After that..."'], type: 'multiple-choice' },
        { question: 'Complete: "The process _____ with the harvesting of raw materials."', type: 'fill-blank' }
      ],
      answerKey: [
        'Passive voice',
        'The beans are transported to the factory.',
        '"Subsequently..."',
        'begins/commences/starts'
      ],
      quickRecap: 'Process Diagram Formula: 1) Paraphrase what process shows, 2) Overview with stages and start/end, 3) Body 1 = first half, 4) Body 2 = second half. Use passive voice throughout. Vary sequencing language. Present simple for general processes. Focus on main stages.',
      collocations: [
        'the process begins', 'subsequently', 'following this', 'at the next stage',
        'the process concludes', 'culminating in', 'can be divided into', 'is transported to',
        'is processed', 'are extracted', 'is converted into', 'the final stage'
      ],
      synonyms: [
        { word: 'begin', synonyms: ['commence', 'start', 'initiate'] },
        { word: 'then', synonyms: ['subsequently', 'following this', 'next', 'afterwards'] },
        { word: 'end', synonyms: ['conclude', 'finish', 'culminate', 'complete'] }
      ],
      speakingLines: [
        'The process commences with the harvesting of raw materials.',
        'Subsequently, the materials are transported to the processing facility.',
        'The process concludes with the packaging of the finished product.'
      ]
    }
  },
  // ============================================
  // TASK 1 ACADEMIC: Map/Plan
  // ============================================
  {
    id: 'writing-task1-map',
    title: 'Task 1 Academic: Map Comparison',
    slug: 'task1-map-comparison',
    type: 'writing',
    level: 'advanced',
    topic: 'Task 1 Academic',
    description: 'Master map comparison with Band 9 techniques for describing changes over time.',
    is_premium: true,
    is_published: true,
    view_count: 1800,
    created_at: '2025-06-27T10:00:00Z',
    updated_at: '2025-06-27T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Task 1 Academic: Map Comparison',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Describe changes to places over time',
        'Use appropriate language for development and change',
        'Organize spatial information clearly',
        'Compare "before and after" effectively'
      ],
      coreExplanation: `**Map Comparison Overview:**
Map tasks show how a place has changed over time (past vs present) or compare two different plans (proposed vs existing).

**Band 9 Structure:**
- Introduction: Paraphrase what the maps show
- Overview: Summarize the main changes (development, expansion, etc.)
- Body 1: Changes in one area (e.g., north/center)
- Body 2: Changes in another area (e.g., south/east)

**Key Language Features:**
- Past tense for completed changes
- Present perfect for changes with current relevance
- Passive voice for developments
- Location language (in the north, to the east of)`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Introduction + Overview):**\n\n"The two maps illustrate the transformation of Riverside town between 1980 and the present day. Overall, the town has undergone significant development, with the most notable changes being the expansion of residential areas, the construction of new infrastructure, and the conversion of farmland into commercial zones."', explanation: '**Why Band 9:** Clear paraphrase, comprehensive overview identifying three main changes, sophisticated vocabulary (transformation, undergone, conversion).' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 1):**\n\n"In 1980, the northern part of the town was predominantly agricultural, with extensive farmland surrounding a small cluster of houses. By the present day, this area has been completely transformed. The farmland has been replaced by a large shopping center and an adjacent car park. Additionally, a new road has been constructed, connecting this commercial zone to the town center."', explanation: '**Why Band 9:** Clear location reference (northern part), specific changes described, appropriate tenses (was, has been transformed, has been replaced), good use of passive voice.' },
        { sentence: '**LANGUAGE FOR CHANGES:**\n\n**Development/Construction:**\n- X has been built/constructed/developed\n- A new X has been added\n- X has been converted into Y\n- X has been replaced by Y\n\n**Removal/Demolition:**\n- X has been demolished/removed\n- X no longer exists\n- X has disappeared\n- X has been cleared\n\n**Expansion/Reduction:**\n- X has been extended/expanded\n- X has doubled/tripled in size\n- X has been reduced/decreased\n- X has shrunk considerably', explanation: 'Use present perfect for changes that connect past to present. Use past simple for completed historical changes.' },
        { sentence: '**LOCATION LANGUAGE:**\n\n**Position:**\n- in the north/south/east/west\n- in the northern/southern part of\n- in the center/middle of\n- on the outskirts/edge of\n\n**Relative position:**\n- to the north/south of X\n- adjacent to / next to\n- opposite / across from\n- between X and Y\n- surrounding / around\n\n**Movement/Direction:**\n- from X to Y\n- towards the east\n- along the river/road', explanation: 'Clear location references are essential for coherence in map descriptions.' }
      ],
      commonMistakes: [
        { mistake: 'Not identifying the time periods clearly', correction: 'State the years clearly: "In 1980... By 2020..."', explanation: 'The reader needs to know which time period you\'re describing.' },
        { mistake: 'Describing each map separately without comparison', correction: 'Compare directly: "The farmland has been replaced by a shopping center"', explanation: 'The task is to describe CHANGES, not just describe each map.' },
        { mistake: 'Vague location references', correction: 'Be specific: "in the northeastern corner" not "somewhere in the area"', explanation: 'Precise location language demonstrates vocabulary range and clarity.' },
        { mistake: 'Using only present simple tense', correction: 'Use past simple for 1980, present perfect for changes: "was... has been transformed"', explanation: 'Appropriate tense use is essential for grammatical accuracy.' },
        { mistake: 'Missing the overview', correction: 'Always summarize the main changes before going into detail', explanation: 'The overview is essential for Band 7+ and shows you can identify key features.' }
      ],
      miniPractice: [
        { question: 'Which tense is best for describing changes from past to present?', options: ['Past simple only', 'Present simple only', 'Present perfect', 'Future tense'], type: 'multiple-choice' },
        { question: 'Describe this change: "1990: farmland → 2020: shopping center"', type: 'rewrite' },
        { question: 'Which phrase describes location most precisely?', options: ['"somewhere there"', '"in the northeastern corner of the town"', '"in that area"', '"near the place"'], type: 'multiple-choice' },
        { question: 'Complete: "The farmland has been _____ by a residential development."', type: 'fill-blank' }
      ],
      answerKey: [
        'Present perfect',
        'The farmland in the northern part of the town has been replaced by a large shopping center.',
        '"in the northeastern corner of the town"',
        'replaced/substituted'
      ],
      quickRecap: 'Map Comparison Formula: 1) Paraphrase what maps show, 2) Overview of main changes, 3) Body 1 = one area, 4) Body 2 = another area. Use present perfect for changes (has been built, has been replaced). Be specific about locations (in the northeast, adjacent to). Compare directly, don\'t just describe each map.',
      collocations: [
        'has undergone', 'has been transformed', 'has been replaced by', 'has been converted into',
        'has been constructed', 'has been demolished', 'has expanded', 'no longer exists',
        'in the northern part', 'adjacent to', 'on the outskirts', 'surrounding area'
      ],
      synonyms: [
        { word: 'change', synonyms: ['transformation', 'development', 'alteration', 'modification'] },
        { word: 'build', synonyms: ['construct', 'develop', 'erect', 'establish'] },
        { word: 'remove', synonyms: ['demolish', 'clear', 'eliminate', 'knock down'] }
      ],
      speakingLines: [
        'The town has undergone significant development over the past three decades.',
        'The farmland has been replaced by a large shopping center.',
        'A new road has been constructed connecting the residential area to the town center.'
      ]
    }
  },
  // ============================================
  // TASK 1 ACADEMIC: Table
  // ============================================
  {
    id: 'writing-task1-table',
    title: 'Task 1 Academic: Table Analysis',
    slug: 'task1-table-analysis',
    type: 'writing',
    level: 'intermediate',
    topic: 'Task 1 Academic',
    description: 'Master table description with Band 9 techniques for comparing data across categories.',
    is_premium: true,
    is_published: true,
    view_count: 1900,
    created_at: '2025-06-28T10:00:00Z',
    updated_at: '2025-06-28T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Task 1 Academic: Table Analysis',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Identify key features in tables',
        'Compare data across multiple categories',
        'Select and report significant data',
        'Avoid listing every number'
      ],
      coreExplanation: `**Table Analysis Overview:**
Tables present data in rows and columns. They can show:
- Comparisons between categories
- Changes over time
- Rankings or proportions

**Band 9 Structure:**
- Introduction: Paraphrase what the table shows
- Overview: Identify 2-3 key trends or comparisons
- Body 1: First major comparison/trend with data
- Body 2: Second major comparison/trend with data

**Key Principle:** Select and compare - don't list every number!`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Introduction + Overview):**\n\n"The table provides information about the percentage of household income spent on various categories in five different countries in 2020. Overall, housing represented the largest expenditure category across all nations, while entertainment accounted for the smallest proportion. Notable variations existed between countries, with Japan allocating the highest percentage to housing and Brazil spending the most on food."', explanation: '**Why Band 9:** Clear paraphrase, identifies highest/lowest categories, notes key variations between countries, doesn\'t list numbers yet.' },
        { sentence: '**BAND 9 MODEL ANSWER (Body 1):**\n\n"Housing costs consumed the largest share of household budgets in all five countries, ranging from 25% in Brazil to 35% in Japan. European countries fell in the middle, with the UK and Germany allocating 30% and 28% respectively. Food expenditure showed greater variation, with Brazilian households dedicating 30% of their income to food, nearly double the figure for Japan (16%)."', explanation: '**Why Band 9:** Groups similar data (European countries), uses ranges, makes comparisons (nearly double), includes specific figures to support points.' },
        { sentence: '**TABLE ANALYSIS STRATEGIES:**\n\n**1. Identify the highest and lowest:**\n- Which category/country has the highest/lowest figures?\n- Are there any extremes or outliers?\n\n**2. Look for patterns:**\n- Do certain countries/categories behave similarly?\n- Are there any surprising results?\n\n**3. Make comparisons:**\n- Compare between categories within a country\n- Compare between countries for the same category\n\n**4. Use ranges:**\n- "ranging from X to Y"\n- "between X and Y"', explanation: 'Don\'t describe row by row. Group, compare, and highlight significant data.' },
        { sentence: '**COMPARISON LANGUAGE FOR TABLES:**\n\n**Comparing figures:**\n- X was significantly higher than Y\n- X was nearly/almost double/triple Y\n- X and Y were roughly equal/similar\n- X was marginally/slightly higher than Y\n\n**Describing ranges:**\n- ranging from X to Y\n- between X and Y\n- from a low of X to a high of Y\n\n**Grouping:**\n- European countries showed similar patterns...\n- In contrast to Asian nations...\n- X and Y both allocated approximately...', explanation: 'Comparison language demonstrates vocabulary range and analytical ability.' }
      ],
      commonMistakes: [
        { mistake: 'Listing every number in the table', correction: 'Select key data that supports your comparisons and trends', explanation: 'Listing all numbers shows no analytical ability. Select and compare.' },
        { mistake: 'Describing row by row or column by column', correction: 'Group similar data and make comparisons across categories', explanation: 'Mechanical description doesn\'t demonstrate analytical skills.' },
        { mistake: 'No overview identifying key features', correction: 'Always state the main trends/comparisons before giving details', explanation: 'The overview shows you can identify significant features.' },
        { mistake: 'Using "the table shows that" repeatedly', correction: 'Vary: "According to the data...", "The figures indicate...", "It is evident that..."', explanation: 'Repetitive phrases suggest limited vocabulary.' },
        { mistake: 'Including opinions or explanations', correction: 'Only report what the data shows. Don\'t explain WHY.', explanation: 'Task 1 is descriptive, not analytical. Don\'t speculate about causes.' }
      ],
      miniPractice: [
        { question: 'What should you do first when analyzing a table?', options: ['List all the numbers', 'Identify highest and lowest values', 'Describe row by row', 'Give your opinion'], type: 'multiple-choice' },
        { question: 'Rewrite: "Japan is 35%. UK is 30%. Germany is 28%."', type: 'rewrite' },
        { question: 'Which phrase best compares two figures?', options: ['"X is 35% and Y is 18%"', '"X was nearly double Y"', '"X is bigger"', '"X and Y are different"'], type: 'multiple-choice' },
        { question: 'Complete: "Housing costs _____ from 25% in Brazil to 35% in Japan."', type: 'fill-blank' }
      ],
      answerKey: [
        'Identify highest and lowest values',
        'Japan allocated the highest percentage to housing (35%), followed by the UK (30%) and Germany (28%).',
        '"X was nearly double Y"',
        'ranged/varied'
      ],
      quickRecap: 'Table Analysis Formula: 1) Paraphrase what table shows, 2) Overview with key trends/comparisons, 3) Body paragraphs with grouped comparisons and supporting data. Don\'t list every number. Identify highest/lowest, group similar data, make comparisons. Use ranges (from X to Y) and comparison language (nearly double, significantly higher).',
      collocations: [
        'the highest percentage', 'the lowest figure', 'ranging from X to Y', 'nearly double',
        'significantly higher', 'roughly equal', 'in contrast to', 'according to the data',
        'the figures indicate', 'allocated to', 'accounted for', 'represented'
      ],
      synonyms: [
        { word: 'show', synonyms: ['indicate', 'reveal', 'demonstrate', 'illustrate'] },
        { word: 'highest', synonyms: ['greatest', 'largest', 'maximum', 'peak'] },
        { word: 'spend', synonyms: ['allocate', 'dedicate', 'devote', 'assign'] }
      ],
      speakingLines: [
        'Housing represented the largest expenditure category across all nations.',
        'The figures ranged from 25% in Brazil to 35% in Japan.',
        'Brazilian households dedicated nearly double the percentage to food compared to Japan.'
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
