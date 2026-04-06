import { Lesson } from '@/types';

export const READING_LESSONS: Lesson[] = [
  {
    id: 'reading-class15-skimming-scanning',
    title: 'Class 15: Skimming & Scanning: The FOUNDATION',
    slug: 'reading-class15-skimming-scanning',
    type: 'reading',
    level: 'beginner',
    topic: 'Reading Foundations',
    description: 'Learn the two most critical skills for IELTS Reading: Skimming for the main idea and Scanning for specific keywords without reading every word.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T12:00:00Z',
    updated_at: '2026-04-06T12:00:00Z',
    estimated_time: 40,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 3: Reading Speed & Strategy (5 Classes)',
    content: {
      title: 'Class 15: Skimming & Scanning: The FOUNDATION',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'The difference between Skimming and Scanning',
        'How to "read" a passage in 3 minutes',
        'Identifying "Anchor Words" (dates, names, capital letters)',
        'Speed reading drills',
        'Managing your 60-minute timer'
      ],
      coreExplanation: `**The Foundation of Speed**
      
In IELTS Reading, time is your biggest enemy. You have 60 minutes for 3 passages (roughly 2,500 words). You cannot read it like a novel.

**1. Skimming (Reading for the Gist):**
- Run your eyes quickly over the title, headings, and the **first & last sentence** of each paragraph.
- Your goal: Understand the "Architecture" of the passage. (Paragraph A is about history, Paragraph B is about a new study, etc.).

**2. Scanning (Hunting for Answers):**
- Once you see a keyword in a question (e.g., "Methane"), move your eyes in a Z-shape or back-to-front over the text until the word "jumps out" at you.
- Don't read for meaning while scanning—only search for the **shape** of the word.

**3. The 20-20-20 Rule:**
Spend exactly 20 minutes on each passage. If you get stuck on a question for more than 1 minute, **SKIP IT** and move on. You can always come back.`,
      examples: [
        { 
          sentence: '**Scanning Example:**\nQuestion: "How many species of birds were found in the Amazon in 1994?"\n\n**Strategy:** Do NOT read. Scan for the number "1994" and the word "Amazon".', 
          explanation: 'Numbers and Capital Letters are the easiest "Anchors" to find in a sea of text.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Reading the whole passage first', correction: 'Skim for 2-3 minutes, then go straight to the questions.', explanation: 'Reading purely for pleasure wastes precious time you need for answering.' },
        { mistake: 'Ignoring the title and subheadings', correction: 'These are your "Map". Always read them first.', explanation: 'They tell you the topic and tone before you even start.' }
      ],
      miniPractice: [
        { question: 'Which technique is used to find a specific date?', options: ['Skimming', 'Scanning', 'Intensive Reading', 'Guessing'], type: 'multiple-choice' },
        { question: 'How much time should you spend skimming a passage?', options: ['10 mins', '5 mins', '2-3 mins', 'None'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Scanning',
        '2-3 mins'
      ],
      quickRecap: 'Reading is a search-and-destroy mission. Skim to find the map, Scan to find the target, and Read carefully ONLY once you are in the right spot.',
      speakingLines: [
        "The primary objective of skimming is to...",
        "Scanning allows us to locate specific data points quickly by...",
        "Time management is critical, which is why we follow the..."
      ]
    }
  },
  {
    id: 'reading-class16-tfng',
    title: 'Class 16: Solving True/False/Not Given & Yes/No/Not Given',
    slug: 'reading-class16-tfng',
    type: 'reading',
    level: 'intermediate',
    topic: 'Question Types',
    description: 'Master the most difficult question type in IELTS Reading. Learn the "Logic Trap" method to distinguish between False and Not Given.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T12:00:00Z',
    updated_at: '2026-04-06T12:00:00Z',
    estimated_time: 45,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 3: Reading Speed & Strategy (5 Classes)',
    content: {
      title: 'Class 16: Solving True/False/Not Given & Yes/No/Not Given',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'The definition of Not Given (The empty space)',
        'True vs. Yes / False vs. No (What is the difference?)',
        'Modals of probability (Always, often, sometimes, never)',
        'The "Contradiction Test" for False answers',
        'Order-based strategy (These questions follow the text order)'
      ],
      coreExplanation: `**The "Contradiction Test"**
      
The biggest mistake is choosing "False" when the answer is "Not Given".

- **TRUE/YES**: The text says exactly the same thing (even if the words are different).
- **FALSE/NO**: The text says the **OPPOSITE** or **CONTRADICTS** the question. 
- **NOT GIVEN**: The text talks about the topic, but doesn't give information about that *specific* detail.

**The Test:**
If you think it's False, ask yourself: *"Can I find a sentence that proves the opposite?"* 
If you can't find a sentence that says it's wrong, but you also can't find a sentence that says it's right—it's **NOT GIVEN**.

**Watch out for Modifiers:**
Words like *mainly, occasionally, all, some* change the meaning. 
Question: "All students passed."
Text: "Most students passed."
Answer: **FALSE** (because 'most' contradicts 'all').`,
      examples: [
        { 
          sentence: '**Text:** "The hotel was built in 1920 using local stone."\n**Question:** "The hotel is the oldest building in the city." ', 
          explanation: 'Answer: **NOT GIVEN**. We know when it was built, but we don\'t know if others are older.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Overthinking or bringing in outside knowledge', correction: 'Only use what is written in the text.', explanation: 'If you know a fact is true in real life, but the text doesn\'t say it, it is NOT GIVEN.' },
        { mistake: 'Confusing False and Not Given', correction: 'Use the "Contradiction Test".', explanation: 'False means there is proof of the opposite. Not Given means there is no proof either way.' }
      ],
      miniPractice: [
        { question: 'If the text says "People sometimes like apples" and the question says "People always like apples", the answer is:', options: ['True', 'False', 'Not Given'], type: 'multiple-choice' },
        { question: 'True/False: True/False/Not Given questions follow the order of the text.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        'False',
        'True'
      ],
      quickRecap: 'TFNG is a test of logic. Use the Contradiction Test to identify False answers. If there is no mention of the specific relationship in the question, pick Not Given. Stay within the text!',
      speakingLines: [
        "The distinction between False and Not Given lies in...",
        "We must be wary of modifying adverbs such as...",
        "The contradiction test confirms that..."
      ]
    }
  },
  {
    id: 'reading-class17-headings-summary',
    title: 'Class 17: Heading Matching & Summary Completion Secrets',
    slug: 'reading-class17-headings-summary',
    type: 'reading',
    level: 'intermediate',
    topic: 'Question Types',
    description: 'Learn the "Summary Mapping" technique and how to pick the perfect heading without falling for distractors.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T12:00:00Z',
    updated_at: '2026-04-06T12:00:00Z',
    estimated_time: 45,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 3: Reading Speed & Strategy (5 Classes)',
    content: {
      title: 'Class 17: Heading Matching & Summary Completion Secrets',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Why you should do Headings LAST',
        'Finding the "Topic Sentence" of a paragraph',
        'Eliminating "Trap" headings that use the same words',
        'Grammar clues in Summary Completion',
        'Mapping question order to text order'
      ],
      coreExplanation: `**Mastering Paragraph Headings**
      
Heading Matching is the only common question type that **does not follow the order of the text**. 

**1. The "Do it Last" Strategy:**
Solve other questions (TFNG, Completion, etc.) first. As you do those, you will naturally read parts of every paragraph. By the time you get to headings, you already know the text!

**2. Finding the "Kernel":**
A heading represents the **Main Idea**, not a detail. 
- Read the first two sentences and the last sentence. 
- Ignore specific examples (if it mentions "1994", it's probably not the main idea).

**3. Summary Completion Grammar:**
Always check the grammar around the gap.
- "A ______ of people..." (Needs a noun)
- "They were ______ by the news..." (Needs a verb/adjective)
This helps you eliminate 50% of the words immediately.`,
      examples: [
        { 
          sentence: '**Heading Trap:**\nParagraph A mentions "The cost of building was high." Heading 1: "The high price of labor." Handling: Don\'t pick it! Labor is just one part of the cost. Look for a broader heading like "Financial Challenges".', 
          explanation: 'Headings must cover the WHOLE paragraph, not just one sentence.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Matching words, not meanings', correction: 'Look for synonyms. The answer is rarely the exact same word as the text.', explanation: 'Headings that use the exact words from the text are often traps.' },
        { mistake: 'Spending too much time on one paragraph', correction: 'Move on. If you solve others, the difficult one becomes obvious by elimination.', explanation: 'Elimination is a powerful tool for Heading Matching.' }
      ],
      miniPractice: [
        { question: 'Where is the main idea of a paragraph usually found?', options: ['The middle', 'The end', 'The first/second sentence', 'In the examples'], type: 'multiple-choice' },
        { question: 'True/False: Summary completion questions follow the order of the text.', options: ['True', 'False'], type: 'multiple-choice' }
      ],
      answerKey: [
        'The first/second sentence',
        'True'
      ],
      quickRecap: 'Headings = Big Picture. Summary = Grammar + Ordering. Do headings last, find the topic sentence, and use grammar to guide your summary completions.',
      speakingLines: [
        "The primary function of a topic sentence is to...",
        "By utilizing the process of elimination, we can...",
        "Grammatical cues are instrumental in narrowing down..."
      ]
    }
  },
  {
    id: 'reading-class18-keyword-mapping',
    title: 'Class 18: Keyword Mapping & Eliminate Distractors',
    slug: 'reading-class18-keyword-mapping',
    type: 'reading',
    level: 'intermediate',
    topic: 'Strategies',
    description: 'Learn the "Synonym Substitution" method to find answers and the top 10 most common distractors used by examiners.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T12:00:00Z',
    updated_at: '2026-04-06T12:00:00Z',
    estimated_time: 40,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 3: Reading Speed & Strategy (5 Classes)',
    content: {
      title: 'Class 18: Keyword Mapping & Eliminate Distractors',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Mapping Synonyms (The key to Band 8)',
        'How to anticipate word changes',
        'Distractor 1: The "Same Word Trap"',
        'Distractor 2: The "Extreme Word" (Always/Never)',
        'Distractor 3: The "Opposite Location"'
      ],
      coreExplanation: `**Synonym Mapping**
      
IELTS doesn't test your vision; it tests your vocabulary. You will almost **never** find the same word in the question and the text.

**1. Create a "Synonym Table":**
Before you look for an answer, think:
- "Study" → Research, investigation, analysis.
- "Decrease" → Drop, decline, fall, reduction.
- "Modern" → Contemporary, current, recent.

**2. Identifying Traps (Distractors):**
The examiners want to trick you. 
- **The "Matchy" Trap**: If a Multiple Choice option uses the exact same 3 words from the text, it is likely WRONG. The right answer will use synonyms.
- **The "Over-generalization" Trap**: If the text says "Some people", and the question says "People in general", it is a mismatch.`,
      examples: [
        { 
          sentence: '**Text:** "The project was abandoned due to a lack of funding."\n**Question:** "Why did the scheme stop?"\n**Mapping:** Scheme = Project, Lack of funding = abandoned due to money issues.', 
          explanation: 'Mapping the question to the text is the only way to be 100% sure.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Looking for the exact word from the question', correction: 'Look for the MEANING, not the letters.', explanation: 'Searching only for "study" will make you miss the answer that uses the word "experiment".' },
        { mistake: 'Falling for "Extreme" words', correction: 'Be careful with words like "Only", "Never", "All".', explanation: 'If the text is not 100% certain, the answer cannot be an extreme word.' }
      ],
      miniPractice: [
        { question: 'What is another word for "Increase"?', options: ['Diminish', 'Escalate', 'Plummet', 'Stabilize'], type: 'multiple-choice' },
        { question: 'If an option uses the exact same words as the text, is it likely right or wrong?', options: ['Right', 'Wrong'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Escalate',
        'Wrong (Likely a distractor)'
      ],
      quickRecap: 'Keywords are synonyms. Map your vocabulary before you search. Be suspicious of exact word matches and extreme modifiers.',
      speakingLines: [
        "Synonym substitution is a cornerstone of the Reading test.",
        "Distractors are specifically designed to penalize...",
        "We must be cognizant of the nuances between..."
      ]
    }
  },
  {
    id: 'reading-class19-full-passage',
    title: 'Class 19: Full Passage Solve - Time Management Under Pressure',
    slug: 'reading-class19-full-passage',
    type: 'reading',
    level: 'advanced',
    topic: 'Mock Test',
    description: 'The final reading rehearsal. Solve a full Passage 3 under a strict 20-minute timer with live strategy breakdowns.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2026-04-06T12:00:00Z',
    updated_at: '2026-04-06T12:00:00Z',
    estimated_time: 60,
    courseId: 'ielts-masterclass',
    moduleName: 'Module 3: Reading Speed & Strategy (5 Classes)',
    content: {
      title: 'Class 19: Full Passage Solve - Time Management Under Pressure',
      targetLevel: 'Band 7.5 - 9.0',
      whatYouWillLearn: [
        'The "Reverse Reading" technique for Passage 3',
        'Batching questions for efficiency',
        'Final minute triage (guessing correctly)',
        'Managing the Answer Sheet (Don\'t wait!)',
        'Staying calm when the text is complex'
      ],
      coreExplanation: `**The "Triage" Method**
      
Passage 3 is always the most "Academic" and "Abstract". 

**1. Batching Questions:**
Don't solve Question 27, then 28. Solve the whole "Set" (e.g., all 5 Matching Headings together). This saves your brain from switching strategies constantly.

**2. The 13-14-13 Target:**
Passage 1 should take 17 mins.
Passage 2 should take 20 mins.
Passage 3 should take 23 mins.
Total: 60 Minutes. 

**3. Answer Sheet Transfer:**
In Reading, you get NO extra time to move answers to the sheet. 
**Strategy**: Transfer your answers *after every passage*. Do NOT wait until the last 2 minutes, or you will panic and make mistakes.`,
      examples: [
        { 
          sentence: '**Passage 3 Strategy:** "When the text is scientific or difficult, focus on the Structure words (However, Moreover, Consequently) to understand the logic even if you don\'t understand every technical word."', 
          explanation: 'Understanding the relationship between ideas is more important than knowing every word.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Waiting until the end to transfer answers', correction: 'Transfer after every set or every passage.', explanation: 'Every year, students lose 10+ marks because they ran out of time to write on the sheet.' },
        { mistake: 'Spending 5 mins on one "Matching" question', correction: 'Guess and move on. All questions are worth 1 mark.', explanation: 'A difficult matching question is worth the same as a simple True/False.' }
      ],
      miniPractice: [
        { question: 'Do you get extra time to transfer answers in Reading?', options: ['Yes, 10 mins', 'Yes, 5 mins', 'No', 'Yes, 2 mins'], type: 'multiple-choice' },
        { question: 'Which passage is usually the hardest?', options: ['Passage 1', 'Passage 2', 'Passage 3', 'They are all equal'], type: 'multiple-choice' }
      ],
      answerKey: [
        'No',
        'Passage 3'
      ],
      quickRecap: 'Reading success = 70% Strategy + 30% English. Manage your time like a clock, transfer answers early, and triage your questions—don’t die on the hill of a single difficult mark.',
      speakingLines: [
        "We are now entering the final phase of our reading training.",
        "The triage method involves prioritizing high-probability marks.",
        "Efficiency is maximized when we batch similar question types."
      ]
    }
  }
];
