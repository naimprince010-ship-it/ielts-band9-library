import { Lesson } from '@/types';

// Speaking Practice Lessons with Band 9 Model Answers
// Each lesson includes: Questions, Model Answers, Band Comparison, Fluency Toolkit, Expansion Techniques

export const SPEAKING_LESSONS: Lesson[] = [
  // ============================================
  // PART 1: Introduction & Interview
  // ============================================
  // ============================================
  // MASTERCLASS CURRICULUM LESSONS
  // ============================================
  {
    id: 'speaking-part1-fluency-confidence',
    title: 'Class 1: Part 1 Fluency & Confidence Building',
    slug: 'speaking-part1-fluency-confidence',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Fluency',
    description: 'Master the fundamentals of IELTS Speaking Part 1. Focus on building confidence, increasing fluency, and using natural fillers.',
    is_premium: true,
    is_published: true,
    view_count: 1200,
    created_at: '2026-04-06T10:00:00Z',
    updated_at: '2026-04-06T10:00:00Z',
    estimated_time: 30,
    content: {
      title: 'Speaking Class 1: Part 1 Fluency & Confidence Building',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'How to maintain eye contact and natural body language',
        'Techniques for eliminating "Umms" and "Errs"',
        'Natural fillers (opening phrases) for thinking time',
        'Standard structure for successful Part 1 answers',
        'The "3-Second Rule" for quick responses'
      ],
      coreExplanation: `**Part 1: Fundamentals of Fluency**
      
In your first class, we focus on the **Triangle of Confidence**:
1. **Eye Contact**: This indicates transparency and naturally keeps you calm.
2. **Breath Control**: Speaking from your diaphragm, not your throat, produces a more stable voice.
3. **The 3-Second Rule**: Train yourself to start speaking within 3 seconds of a question.

**Natural Fillers (Thinking Time):**
Instead of saying "Umm...", use these:
- "That's a very interesting question, actually..."
- "I've never really thought about that before, but I'd say..."
- "Well, to be honest..."
- "Actually, if I had to choose, I'd say..."

**Key Strategy: Don't Think, Just Speak**
Part 1 asks familiar questions (hometown, childhood, etc.). You don't need to "invent" deep facts—just focus on a continuous flow of natural language.`,
      examples: [
        { 
          sentence: '**Question: Do you enjoy your hometown?**\n\n**Typical Answer:** "Yes, I like it. It is very nice. Many buildings."\n\n**Band 9 Answer:** "Absolutely! What I love most is the incredible sense of community there. Even though it\'s a fairly busy city, everyone still seems to know their neighbors, which is quite rare these days."', 
          explanation: 'Note the use of "What I love most is..." as a complex starting structure, and the extension using "Even though..."' 
        },
        { 
          sentence: '**FLUNECY TOOLKIT - Confident Openers:**\n\n- "I\'m quite an avid reader..."\n- "To be honest, I\'ve always been interested in..."\n- "It really depends on the situation, but generally speaking..."\n- "Looking back, I\'d say that my interest started when..."', 
          explanation: 'These phrases give you 2-3 seconds of "free speaking time" while you think of your main point.' 
        }
      ],
      commonMistakes: [
        { mistake: 'Looking at the floor while speaking', correction: 'Maintain soft, natural eye contact with the examiner', explanation: 'Speaking confidence is 50% body language. Looking down reflects nervousness and lowers the "Fluency and Coherence" score.' },
        { mistake: 'Correcting yourself mid-sentence', correction: 'If you make a mistake, just keep going or correct it immediately and move on.', explanation: 'Frequent self-correction breaks your fluency. Keep the flow as the #1 priority.' }
      ],
      miniPractice: [
        { question: 'What is the "3-Second Rule" in IELTS Speaking?', options: ['Speak for only 3 seconds', 'Start your answer within 3 seconds', 'Think for 3 seconds before each word'], type: 'multiple-choice' },
        { question: 'Fill in the blank: "To be _____, I haven\'t thought much about it..."', type: 'fill-blank' }
      ],
      answerKey: [
        'Start your answer within 3 seconds',
        'honest'
      ],
      quickRecap: 'In Class 1, focus on Flow over Accuracy. Use fillers to kill silences. Maintain eye contact. Remember: your goal is to show the examiner you can hold a natural conversation without stopping.',
      speakingLines: [
        "That's a very interesting question, let me see...",
        "Actually, I'd say I'm quite a morning person.",
        "Well, to be honest, I haven't really considered that before."
      ]
    }
  },
  {
    id: 'speaking-part1-work-study',
    title: 'Part 1: Work & Study Questions',
    slug: 'speaking-part1-work-study',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Work & Study',
    description: 'Master IELTS Speaking Part 1 questions about work and study with Band 9 model answers and expansion techniques.',
    is_premium: false,
    is_published: true,
    view_count: 3200,
    created_at: '2025-06-10T10:00:00Z',
    updated_at: '2025-06-10T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Part 1: Work & Study Questions',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Answer Part 1 questions with appropriate length (2-3 sentences)',
        'Use the E-E-E technique: Extend + Example + Explain',
        'See Band 6 vs Band 9 answer comparisons',
        'Build a toolkit of natural fluency phrases'
      ],
      coreExplanation: `**IELTS Speaking Part 1 Overview:**
- Duration: 4-5 minutes
- Questions: 10-12 questions on 3 familiar topics
- Answer length: 2-4 sentences (not too short, not too long)
- Topics: Work, study, hometown, hobbies, daily routine, etc.

**The E-E-E Technique for Part 1:**
1. **Extend**: Give a direct answer + add information
2. **Example**: Provide a specific example or detail
3. **Explain**: Give a reason or explain why

**Key Principles:**
- Be natural, not robotic
- Don't memorize scripts (examiners can tell)
- Show personality and genuine opinions
- Use a range of vocabulary and grammar naturally`,
      examples: [
        { sentence: '**Question 1: Do you work or are you a student?**\n\n**Band 6 Answer:** "I\'m a student. I study at university. I study business."\n\n**Band 9 Answer:** "I\'m currently in my final year at university, studying international business. It\'s been quite an intensive program, but I\'ve really enjoyed the practical aspects, especially the internship I completed last summer at a marketing firm."', explanation: '**What Changed:** Band 9 adds specific details (final year, international business), shows personality (enjoyed practical aspects), and includes a relevant example (internship). The answer flows naturally without sounding rehearsed.' },
        { sentence: '**Question 2: What do you like about your job/studies?**\n\n**Band 6 Answer:** "I like my studies because they are interesting. I learn many things. The teachers are good."\n\n**Band 9 Answer:** "What I find most rewarding is the opportunity to apply theoretical concepts to real-world scenarios. For instance, in our recent marketing module, we developed an actual campaign for a local business, which gave me invaluable hands-on experience. It\'s this practical application that really motivates me."', explanation: '**What Changed:** Band 9 uses sophisticated vocabulary (rewarding, theoretical concepts, invaluable), provides a specific example (marketing campaign), and explains the reason (practical application motivates). The answer demonstrates critical thinking.' },
        { sentence: '**Question 3: Would you like to change your job/field of study?**\n\n**Band 6 Answer:** "No, I don\'t want to change. I like what I study. Maybe in the future I will think about it."\n\n**Band 9 Answer:** "Not at this stage, no. I\'m genuinely passionate about business strategy, and I can see myself building a career in this field. That said, I\'m quite open to exploring different industries once I graduate – perhaps consulting or tech startups, as they seem to offer diverse challenges."', explanation: '**What Changed:** Band 9 shows nuanced thinking (not at this stage), expresses genuine interest (passionate about), and demonstrates forward thinking with specific options (consulting, tech startups). Uses natural hedging (That said, perhaps).' },
        { sentence: '**Question 4: Do you prefer working alone or with others?**\n\n**Band 6 Answer:** "I prefer working with others. It is more fun. We can share ideas."\n\n**Band 9 Answer:** "It really depends on the task, to be honest. For creative brainstorming, I thrive in collaborative environments where ideas can bounce around. But when it comes to focused analytical work, I tend to be more productive on my own. I suppose I appreciate having a balance of both."', explanation: '**What Changed:** Band 9 shows sophisticated thinking by not giving a simple answer (It depends), provides context for both preferences, and uses natural expressions (to be honest, I suppose, thrive in). This demonstrates flexibility and self-awareness.' },
        { sentence: '**FLUENCY TOOLKIT - Natural Phrases:**\n\n**Starting your answer:**\n- "Well, to be honest..."\n- "Actually, I\'d say..."\n- "That\'s an interesting question..."\n- "I suppose..."\n\n**Extending your answer:**\n- "What I mean is..."\n- "For instance..."\n- "The thing is..."\n- "I\'d say the main reason is..."\n\n**Showing you\'re thinking:**\n- "Let me think..."\n- "That\'s a good question..."\n- "I haven\'t really thought about that before, but..."\n\n**Hedging (showing uncertainty naturally):**\n- "I\'d say..."\n- "Perhaps..."\n- "It depends on..."\n- "In most cases..."', explanation: 'These phrases make your speech sound natural and fluent. Use them sparingly - 1-2 per answer maximum. Don\'t overuse or it sounds rehearsed.' },
        { sentence: '**COMMON PART 1 MISTAKES:**\n\n**Mistake 1:** One-word or very short answers\n"Do you like your job?" → "Yes." ❌\n**Fix:** Always extend with at least one more sentence.\n\n**Mistake 2:** Over-long answers (treating Part 1 like Part 2)\n**Fix:** Keep answers to 2-4 sentences. Save detailed stories for Part 2.\n\n**Mistake 3:** Using memorized phrases unnaturally\n"In this day and age, work is very important..." ❌\n**Fix:** Speak naturally as you would to a friend.\n\n**Mistake 4:** Saying "I don\'t know" without trying\n**Fix:** Even if unsure, give an opinion: "I haven\'t really thought about that, but I suppose..."', explanation: 'Part 1 tests your ability to communicate naturally on familiar topics. The examiner wants to see you can hold a conversation, not recite memorized answers.' },
        { sentence: '**BAND COMPARISON - Question: "What do you do in your free time?"**\n\n**Band 5:** "I watch TV. I also play games. Sometimes I go out."\n\n**Band 6:** "In my free time, I usually watch TV or play video games. Sometimes I go out with my friends to eat or watch movies."\n\n**Band 7:** "I\'m quite into fitness, so I try to hit the gym three or four times a week. Apart from that, I enjoy catching up with friends over coffee or exploring new restaurants in the city."\n\n**Band 8-9:** "I\'d say I\'m quite active in my downtime. I\'ve recently taken up rock climbing, which has been both challenging and incredibly rewarding. Beyond that, I\'m a bit of a foodie, so I love discovering hidden gem restaurants with friends – it\'s become something of a weekend ritual for us."', explanation: '**Progression:** Band 5 = basic vocabulary, simple sentences. Band 6 = more detail, some linking. Band 7 = idiomatic language (quite into, hit the gym), specific details. Band 8-9 = sophisticated vocabulary (downtime, rewarding), personality, natural expressions (something of a ritual).' }
      ],
      commonMistakes: [
        { mistake: 'Giving one-word answers', correction: 'Always extend with 2-4 sentences using the E-E-E technique', explanation: 'One-word answers don\'t demonstrate your English ability. The examiner needs to hear you speak.' },
        { mistake: 'Speaking for too long in Part 1', correction: 'Keep answers to 2-4 sentences (15-30 seconds)', explanation: 'Part 1 is a warm-up. Save your detailed answers for Part 2. Long Part 1 answers suggest poor understanding of the test format.' },
        { mistake: 'Using obviously memorized phrases', correction: 'Speak naturally and adapt your language to each question', explanation: 'Examiners are trained to detect memorized content. It lowers your score for fluency and coherence.' },
        { mistake: 'Starting every answer with "Well..."', correction: 'Vary your opening phrases: "Actually...", "To be honest...", "I\'d say..."', explanation: 'Repetitive openings suggest limited vocabulary and sound unnatural.' },
        { mistake: 'Not showing personality', correction: 'Include genuine opinions, preferences, and personal examples', explanation: 'Band 9 speakers sound like real people with real opinions, not robots reciting answers.' }
      ],
      miniPractice: [
        { question: 'What is the ideal length for a Part 1 answer?', options: ['1 sentence', '2-4 sentences', '1-2 minutes', 'As long as possible'], type: 'multiple-choice' },
        { question: 'Practice: Answer this Part 1 question in 2-4 sentences: "Do you enjoy your work/studies?"', type: 'rewrite' },
        { question: 'Which opening phrase is most natural?', options: ['"In this modern era..."', '"Well, to be honest..."', '"As we all know..."', '"It is widely believed..."'], type: 'multiple-choice' },
        { question: 'What does E-E-E stand for in the extension technique?', type: 'fill-blank' }
      ],
      answerKey: [
        '2-4 sentences',
        'Sample: "Yes, I really enjoy my studies, particularly the practical projects we work on. Last semester, for example, we designed a marketing campaign for a real client, which was incredibly rewarding. It\'s this hands-on experience that makes the course worthwhile."',
        '"Well, to be honest..."',
        'Extend + Example + Explain'
      ],
      quickRecap: 'Part 1 Formula: Answer directly + Extend with detail + Give example or reason. Keep answers 2-4 sentences. Use natural phrases (Well, Actually, To be honest). Show personality with genuine opinions. Avoid memorized scripts.',
      collocations: [
        'quite into', 'hit the gym', 'catch up with friends', 'in my downtime',
        'taken up', 'hidden gem', 'something of a ritual', 'hands-on experience',
        'to be honest', 'I\'d say', 'the thing is', 'for instance'
      ],
      synonyms: [
        { word: 'like', synonyms: ['enjoy', 'be into', 'be fond of', 'be passionate about'] },
        { word: 'interesting', synonyms: ['fascinating', 'rewarding', 'engaging', 'stimulating'] },
        { word: 'good', synonyms: ['excellent', 'fantastic', 'wonderful', 'incredible'] }
      ],
      speakingLines: [
        'Well, to be honest, I\'m quite passionate about my field of study.',
        'I\'d say the most rewarding aspect is the practical experience I\'ve gained.',
        'It really depends on the situation, but generally speaking, I prefer...'
      ]
    }
  },
  {
    id: 'speaking-part1-hometown',
    title: 'Part 1: Hometown & Living',
    slug: 'speaking-part1-hometown',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Hometown',
    description: 'Master hometown and accommodation questions with natural, Band 9 level responses.',
    is_premium: true,
    is_published: true,
    view_count: 2800,
    created_at: '2025-06-11T10:00:00Z',
    updated_at: '2025-06-11T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Part 1: Hometown & Living',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Describe your hometown naturally without sounding rehearsed',
        'Use descriptive vocabulary for places and atmospheres',
        'Compare past and present effectively',
        'Express preferences about living situations'
      ],
      coreExplanation: `**Common Hometown Questions:**
- Where are you from? / Where is your hometown?
- What do you like about your hometown?
- Has your hometown changed much?
- Would you like to live there in the future?
- Do you live in a house or apartment?

**Strategy for Hometown Questions:**
1. Be specific - mention actual places, features, or characteristics
2. Show emotion - express genuine feelings about your hometown
3. Compare - past vs present, your hometown vs other places
4. Be balanced - you can mention both positives and negatives`,
      examples: [
        { sentence: '**Question: Where is your hometown?**\n\n**Band 6:** "My hometown is Shanghai. It is a big city in China. It has many people."\n\n**Band 9:** "I\'m originally from Shanghai, which is on the eastern coast of China. It\'s a sprawling metropolis – actually one of the largest cities in the world – known for its stunning skyline and vibrant mix of traditional and modern culture."', explanation: '**What Changed:** Band 9 uses precise geography (eastern coast), sophisticated vocabulary (sprawling metropolis, vibrant mix), and adds interesting details (stunning skyline, traditional and modern). Shows knowledge and genuine connection.' },
        { sentence: '**Question: What do you like about your hometown?**\n\n**Band 6:** "I like my hometown because it has good food and nice people. The weather is also good."\n\n**Band 9:** "What I appreciate most is the incredible food scene – you can find everything from street food stalls serving authentic local dishes to high-end restaurants with international cuisine. There\'s also this wonderful sense of energy in the city; it\'s constantly evolving, which keeps things exciting."', explanation: '**What Changed:** Band 9 is specific (street food stalls, high-end restaurants), uses sophisticated expressions (food scene, sense of energy, constantly evolving), and shows genuine enthusiasm. The answer paints a vivid picture.' },
        { sentence: '**Question: Has your hometown changed much?**\n\n**Band 6:** "Yes, it has changed a lot. There are more buildings now. The transportation is better."\n\n**Band 9:** "Dramatically, yes. When I was growing up, the area where I lived was quite residential and quiet. Now it\'s been completely transformed – there are shopping malls, a new metro line, and the whole neighborhood has become much more commercialized. It\'s a bit of a double-edged sword, really; more convenient, but some of the old charm has been lost."', explanation: '**What Changed:** Band 9 provides personal perspective (when I was growing up), specific changes (shopping malls, metro line), and shows critical thinking (double-edged sword, old charm lost). Demonstrates ability to discuss complex ideas.' },
        { sentence: '**Question: Do you live in a house or an apartment?**\n\n**Band 6:** "I live in an apartment. It is on the 10th floor. It has two bedrooms."\n\n**Band 9:** "I\'m currently renting a compact apartment in the city center. It\'s nothing fancy – just a one-bedroom place – but the location is unbeatable. I can walk to work in ten minutes, and there are plenty of cafes and restaurants right on my doorstep."', explanation: '**What Changed:** Band 9 uses natural expressions (nothing fancy, unbeatable location, on my doorstep), provides context (renting, city center), and explains why it works for them. Shows personality and practical thinking.' },
        { sentence: '**DESCRIPTIVE VOCABULARY FOR PLACES:**\n\n**Size & Atmosphere:**\n- sprawling, compact, bustling, tranquil, vibrant\n- cosmopolitan, picturesque, charming, lively\n\n**Development:**\n- rapidly developing, well-established, up-and-coming\n- modernized, transformed, gentrified\n\n**Character:**\n- has a lot of character, rich in history\n- known for its..., famous for...\n- a mix of... and...\n\n**Location:**\n- nestled in, situated on, located in the heart of\n- on the outskirts, in the suburbs, in the city center', explanation: 'Using varied descriptive vocabulary demonstrates lexical resource. Choose words that genuinely describe your hometown rather than using impressive words that don\'t fit.' }
      ],
      commonMistakes: [
        { mistake: 'Giving generic descriptions that could apply to any city', correction: 'Include specific details unique to your hometown', explanation: 'Generic answers like "it has good food and nice people" don\'t demonstrate vocabulary or genuine knowledge.' },
        { mistake: 'Only mentioning positives', correction: 'A balanced view with some negatives shows critical thinking', explanation: 'Band 9 speakers can discuss both advantages and disadvantages naturally.' },
        { mistake: 'Using overly formal or written language', correction: 'Use conversational expressions: "nothing fancy", "on my doorstep"', explanation: 'Speaking should sound natural, not like reading an essay.' },
        { mistake: 'Not showing personal connection', correction: 'Include personal experiences and feelings about your hometown', explanation: 'Personal stories and genuine emotions make answers more engaging and authentic.' },
        { mistake: 'Memorizing a description and reciting it', correction: 'Adapt your answer to the specific question asked', explanation: 'Examiners ask different questions about hometowns. A memorized description won\'t fit all questions.' }
      ],
      miniPractice: [
        { question: 'Which description is more Band 9?', options: ['"My hometown is big and has many people"', '"My hometown is a sprawling metropolis known for its vibrant culture"', '"My hometown is very good and beautiful"', '"My hometown is nice to live in"'], type: 'multiple-choice' },
        { question: 'Practice: Describe what you like about your hometown in 2-3 sentences.', type: 'rewrite' },
        { question: 'What does "double-edged sword" mean?', options: ['A very sharp weapon', 'Something with both advantages and disadvantages', 'A difficult decision', 'An old tradition'], type: 'multiple-choice' },
        { question: 'Complete: "The location is _____ - I can walk to work in ten minutes."', type: 'fill-blank' }
      ],
      answerKey: [
        '"My hometown is a sprawling metropolis known for its vibrant culture"',
        'Sample: "What I love most about my hometown is the incredible food scene – there\'s this amazing night market where you can find authentic local dishes at really affordable prices. Beyond that, I appreciate the sense of community; despite being a large city, my neighborhood still has that small-town feel where everyone knows each other."',
        'Something with both advantages and disadvantages',
        'unbeatable'
      ],
      quickRecap: 'Hometown answers should be specific (actual places/features), show genuine emotion, include personal experiences, and demonstrate balanced thinking. Use descriptive vocabulary (sprawling, vibrant, picturesque) and natural expressions (nothing fancy, on my doorstep).',
      collocations: [
        'sprawling metropolis', 'vibrant culture', 'food scene', 'sense of community',
        'double-edged sword', 'old charm', 'on my doorstep', 'nothing fancy',
        'unbeatable location', 'rich in history', 'up-and-coming area', 'city center'
      ],
      synonyms: [
        { word: 'big', synonyms: ['sprawling', 'vast', 'extensive', 'sizeable'] },
        { word: 'nice', synonyms: ['charming', 'pleasant', 'delightful', 'lovely'] },
        { word: 'changed', synonyms: ['transformed', 'evolved', 'developed', 'modernized'] }
      ],
      speakingLines: [
        'I\'m originally from Shanghai, which is on the eastern coast of China.',
        'What I appreciate most is the incredible food scene.',
        'It\'s a bit of a double-edged sword, really.'
      ]
    }
  },
  // ============================================
  // PART 2: Long Turn (Cue Card)
  // ============================================
  {
    id: 'speaking-part2-person',
    title: 'Part 2: Describe a Person',
    slug: 'speaking-part2-describe-person',
    type: 'speaking',
    level: 'intermediate',
    topic: 'Part 2 Cue Card',
    description: 'Master Part 2 cue cards about people with structured responses, vivid descriptions, and Band 9 storytelling techniques.',
    is_premium: false,
    is_published: true,
    view_count: 3500,
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Part 2: Describe a Person',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure a 2-minute response using the cue card points',
        'Use the 1-minute preparation time effectively',
        'Describe people vividly with personality and appearance vocabulary',
        'Tell engaging stories that demonstrate language range'
      ],
      coreExplanation: `**IELTS Speaking Part 2 Overview:**
- Preparation time: 1 minute
- Speaking time: 1-2 minutes
- You MUST speak until the examiner stops you
- Cover ALL points on the cue card

**Sample Cue Card:**
Describe a person who has influenced you.
You should say:
- who this person is
- how you know this person
- what this person does
- and explain why this person has influenced you

**1-Minute Preparation Strategy:**
1. Read ALL bullet points (10 seconds)
2. Choose a person you can talk about easily (10 seconds)
3. Note 1-2 keywords for each bullet point (30 seconds)
4. Think of a specific story or example (10 seconds)

**Structure Your Response:**
- Introduction: Who + How you know them (30 seconds)
- Description: What they do + Personality (45 seconds)
- Story/Example: Specific incident showing their influence (30 seconds)
- Conclusion: Why they influenced you + Impact (15 seconds)`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER (Full 2-minute response):**\n\n"I\'d like to talk about my grandfather, who has been probably the most influential figure in my life. He passed away a few years ago, but his impact on me remains profound.\n\nI grew up spending summers at his house in the countryside, so I got to know him quite intimately. He was a retired teacher – actually, he taught mathematics for over forty years at the local high school. Even in retirement, he had this incredible thirst for knowledge; I remember him always reading, whether it was history books, scientific journals, or even poetry.\n\nWhat struck me most about him was his patience and his ability to explain complex ideas in simple terms. I was never particularly good at math as a child, and I remember feeling quite frustrated with it. But he would sit with me for hours, using everyday objects – like fruit or coins – to help me visualize mathematical concepts. He never once lost his temper or made me feel stupid.\n\nThe reason he\'s influenced me so deeply is that he taught me the value of patience and persistence. Whenever I face a challenge now, I think of how he approached problems – methodically, calmly, and with genuine curiosity rather than frustration. He showed me that learning is a lifelong journey, not a destination, and that\'s a philosophy I try to live by every day."', explanation: '**Why Band 9:** Covers all cue card points naturally. Uses sophisticated vocabulary (profound, intimately, thirst for knowledge, methodically). Includes specific examples (fruit, coins for math). Shows genuine emotion and reflection. Flows naturally without sounding rehearsed. Concludes with meaningful insight.' },
        { sentence: '**1-MINUTE PREPARATION NOTES:**\n\n**Topic:** Person who influenced me\n\n**Notes (what to write in 1 minute):**\n- Who: Grandfather, teacher\n- How know: Summers, countryside\n- What does: Math teacher, always reading\n- Why influence: Patience, math help, fruit/coins example\n- Impact: Patience in challenges, lifelong learning\n\n**Key:** Don\'t write sentences! Just keywords to trigger your memory.', explanation: 'Your notes should be brief triggers, not full sentences. You don\'t have time to write sentences, and reading from notes sounds unnatural.' },
        { sentence: '**BAND COMPARISON - Opening:**\n\n**Band 5:** "I want to talk about my grandfather. He is old. He was a teacher."\n\n**Band 6:** "I\'d like to describe my grandfather, who was a very important person in my life. He was a teacher and he taught me many things."\n\n**Band 7:** "I\'d like to talk about my grandfather, who has been a significant influence on me. He was a mathematics teacher for over forty years, and even after retiring, he maintained his passion for learning."\n\n**Band 9:** "I\'d like to talk about my grandfather, who has been probably the most influential figure in my life. He passed away a few years ago, but his impact on me remains profound."', explanation: '**Progression:** Band 5 = basic vocabulary, choppy sentences. Band 6 = some development, still generic. Band 7 = specific details, better vocabulary. Band 9 = emotional depth, sophisticated language (profound impact), natural flow.' },
        { sentence: '**VOCABULARY FOR DESCRIBING PEOPLE:**\n\n**Personality (Positive):**\n- patient, compassionate, inspiring, dedicated\n- warm-hearted, down-to-earth, open-minded\n- charismatic, resilient, thoughtful\n\n**Personality (Balanced):**\n- reserved but kind, strict but fair\n- quiet yet determined, serious but caring\n\n**Appearance:**\n- distinguished, youthful for their age\n- has a warm smile, kind eyes\n- carries themselves with confidence\n\n**Impact words:**\n- influenced, shaped, inspired, motivated\n- taught me the value of...\n- showed me that...\n- opened my eyes to...', explanation: 'Use personality vocabulary that you can support with examples. Don\'t just list adjectives – show them through stories.' },
        { sentence: '**STORYTELLING TECHNIQUES:**\n\n**1. Set the scene:**\n"I remember one summer when I was about ten years old..."\n"There was this one incident that really stands out..."\n\n**2. Use sensory details:**\n"I can still picture him sitting at the kitchen table..."\n"I remember the smell of his old books..."\n\n**3. Show, don\'t tell:**\nInstead of: "He was patient."\nSay: "He would sit with me for hours, never once losing his temper."\n\n**4. Reflect on meaning:**\n"Looking back, I realize that..."\n"What I didn\'t understand then was..."\n"That experience taught me..."', explanation: 'Stories make your answer memorable and demonstrate advanced language use. A specific story is more impressive than general statements.' },
        { sentence: '**TIMING YOUR RESPONSE:**\n\n**0:00-0:30 - Introduction (Who + How you know them)**\n"I\'d like to talk about my grandfather, who has been probably the most influential figure in my life..."\n\n**0:30-1:15 - Description (What they do + Personality)**\n"He was a retired teacher... What struck me most about him was his patience..."\n\n**1:15-1:45 - Story/Example**\n"I remember he would sit with me for hours, using everyday objects..."\n\n**1:45-2:00 - Conclusion (Why influenced + Impact)**\n"The reason he\'s influenced me so deeply is that he taught me the value of patience..."', explanation: 'Practice with a timer. You MUST speak for at least 1 minute 30 seconds. Aim for the full 2 minutes.' }
      ],
      commonMistakes: [
        { mistake: 'Stopping before 1 minute 30 seconds', correction: 'Practice extending your answers. Include more details, examples, and reflections.', explanation: 'Speaking for less than 1:30 significantly lowers your score. The examiner will prompt you to continue, which looks bad.' },
        { mistake: 'Not covering all cue card points', correction: 'Check each bullet point during preparation and make sure you address all of them', explanation: 'Missing points affects your Task Achievement score. The cue card is your guide.' },
        { mistake: 'Listing adjectives without examples', correction: 'Show personality through stories: "He was patient" → "He would sit with me for hours..."', explanation: 'Anyone can list adjectives. Band 9 speakers demonstrate qualities through specific examples.' },
        { mistake: 'Speaking in a monotone voice', correction: 'Vary your intonation, especially when telling stories or expressing emotions', explanation: 'Pronunciation includes intonation. A flat delivery suggests lack of engagement.' },
        { mistake: 'Memorizing a generic answer', correction: 'Prepare flexible content that can be adapted to different cue cards', explanation: 'Examiners can tell when answers are memorized. It affects fluency and coherence scores.' }
      ],
      miniPractice: [
        { question: 'How long should you speak in Part 2?', options: ['30 seconds to 1 minute', '1 to 2 minutes', '2 to 3 minutes', '3 to 4 minutes'], type: 'multiple-choice' },
        { question: 'Practice: Write 5 keywords you would note for "Describe a teacher who influenced you"', type: 'rewrite' },
        { question: 'Which is better storytelling?', options: ['"He was very patient"', '"He would sit with me for hours, never once losing his temper"', '"He had good patience"', '"His patience was good"'], type: 'multiple-choice' },
        { question: 'Complete: "Looking back, I _____ that his patience shaped who I am today."', type: 'fill-blank' }
      ],
      answerKey: [
        '1 to 2 minutes',
        'Sample keywords: Math teacher, Mr. Chen, high school, explained clearly, inspired career, patient with mistakes',
        '"He would sit with me for hours, never once losing his temper"',
        'realize'
      ],
      quickRecap: 'Part 2 Formula: 1 minute prep (keywords only), 2 minutes speaking. Cover ALL cue card points. Use the structure: Introduction → Description → Story → Conclusion. Show personality through specific examples, not adjective lists. Practice timing yourself.',
      collocations: [
        'influential figure', 'profound impact', 'thirst for knowledge', 'struck me most',
        'lost his temper', 'lifelong journey', 'stands out', 'looking back',
        'shaped who I am', 'opened my eyes', 'taught me the value of', 'live by'
      ],
      synonyms: [
        { word: 'influenced', synonyms: ['shaped', 'impacted', 'affected', 'inspired'] },
        { word: 'important', synonyms: ['significant', 'influential', 'meaningful', 'profound'] },
        { word: 'remember', synonyms: ['recall', 'recollect', 'can still picture', 'it stands out'] }
      ],
      speakingLines: [
        'I\'d like to talk about my grandfather, who has been probably the most influential figure in my life.',
        'What struck me most about him was his patience and his ability to explain complex ideas.',
        'Looking back, I realize that he taught me the value of patience and persistence.'
      ]
    }
  },
  {
    id: 'speaking-part2-experience',
    title: 'Part 2: Describe an Experience',
    slug: 'speaking-part2-describe-experience',
    type: 'speaking',
    level: 'intermediate',
    topic: 'Part 2 Cue Card',
    description: 'Master experience-based cue cards with vivid storytelling, emotional vocabulary, and Band 9 narrative techniques.',
    is_premium: true,
    is_published: true,
    view_count: 3100,
    created_at: '2025-06-13T10:00:00Z',
    updated_at: '2025-06-13T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Part 2: Describe an Experience',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Structure narratives with clear beginning, middle, and end',
        'Use past tenses accurately and naturally',
        'Express emotions and reactions vividly',
        'Create engaging stories that demonstrate language range'
      ],
      coreExplanation: `**Sample Cue Card:**
Describe a memorable journey you have taken.
You should say:
- where you went
- when you went there
- who you went with
- and explain why this journey was memorable

**Narrative Structure for Experiences:**
1. **Setting** (Where, When, Who): Set the scene
2. **Build-up**: What led to the main event
3. **Main event**: The key moment or experience
4. **Reaction**: How you felt, what you thought
5. **Reflection**: Why it was significant, what you learned

**Tense Usage:**
- Past simple for main events: "We arrived at..."
- Past continuous for background: "The sun was setting..."
- Past perfect for earlier events: "I had never seen..."
- Present for current feelings: "I still remember..."`,
      examples: [
        { sentence: '**BAND 9 MODEL ANSWER:**\n\n"I\'d like to describe a trip I took to Japan about three years ago, which remains one of the most memorable experiences of my life.\n\nI went with two close friends from university during our spring break. We\'d been planning this trip for months, saving up and researching destinations, so there was already a sense of anticipation before we even left.\n\nWe spent two weeks traveling from Tokyo to Kyoto, and what made it truly special was the contrast between the ultra-modern and the traditional. I remember arriving in Tokyo and being completely overwhelmed by the sheer scale of the city – the neon lights, the crowds, the energy. It was like nothing I\'d ever experienced.\n\nBut the moment that really stands out was visiting a small temple in Kyoto early one morning. We\'d woken up at dawn to avoid the crowds, and when we arrived, we had the entire place to ourselves. There was this incredible sense of peace – just the sound of birds and a gentle breeze. I remember thinking that despite all the technology and modernity we\'d seen, this ancient tranquility was the real heart of Japan.\n\nThe journey was memorable because it completely shifted my perspective. I went expecting to be impressed by the technology and efficiency, but I came back with a deep appreciation for how a culture can embrace modernity while preserving its traditions. It\'s something I think about often, actually."', explanation: '**Why Band 9:** Clear narrative structure, sophisticated vocabulary (anticipation, overwhelming, tranquility), accurate tense usage, sensory details (neon lights, sound of birds), genuine reflection, natural flow.' },
        { sentence: '**EMOTIONAL VOCABULARY:**\n\n**Positive emotions:**\n- overwhelmed (with joy/beauty)\n- awestruck, mesmerized, captivated\n- exhilarated, thrilled, elated\n- moved, touched, inspired\n\n**Describing impact:**\n- It took my breath away\n- I was blown away by...\n- It exceeded all my expectations\n- I\'ll never forget the moment when...\n\n**Negative emotions (for challenges):**\n- anxious, apprehensive, nervous\n- frustrated, disappointed, exhausted\n- out of my comfort zone\n\n**Reflection:**\n- It shifted my perspective\n- It opened my eyes to...\n- I gained a new appreciation for...\n- Looking back, I realize...', explanation: 'Emotional vocabulary shows range and makes your story engaging. Don\'t just say "happy" or "good" – be specific about your feelings.' },
        { sentence: '**SENSORY DETAILS:**\n\n**Sight:**\n- "The neon lights illuminated the streets..."\n- "I can still picture the snow-capped mountains..."\n\n**Sound:**\n- "The only sound was the gentle breeze..."\n- "I could hear the waves crashing..."\n\n**Smell:**\n- "The aroma of street food filled the air..."\n- "I remember the scent of cherry blossoms..."\n\n**Touch/Feel:**\n- "The cool morning air..."\n- "I felt the sand between my toes..."\n\n**Taste:**\n- "We sampled the local cuisine..."\n- "The food was unlike anything I\'d tasted..."', explanation: 'Sensory details make your story vivid and memorable. Include 2-3 sensory details in your Part 2 answer.' },
        { sentence: '**BAND COMPARISON - Describing a moment:**\n\n**Band 5:** "The temple was beautiful. It was quiet. I liked it very much."\n\n**Band 6:** "The temple was really beautiful and peaceful. There were no tourists, so it was very quiet. I enjoyed the experience a lot."\n\n**Band 7:** "The temple was absolutely stunning, and because we arrived early, we had it to ourselves. The atmosphere was incredibly peaceful, and I remember feeling a real sense of calm."\n\n**Band 9:** "When we arrived, we had the entire place to ourselves. There was this incredible sense of peace – just the sound of birds and a gentle breeze. I remember thinking that despite all the technology and modernity we\'d seen, this ancient tranquility was the real heart of Japan."', explanation: '**Progression:** Band 5 = basic adjectives, simple sentences. Band 6 = more detail, some linking. Band 7 = sophisticated adjectives, emotional vocabulary. Band 9 = sensory details, reflection, contrast, natural flow.' }
      ],
      commonMistakes: [
        { mistake: 'Telling events without emotion or reflection', correction: 'Include how you felt and what you learned from the experience', explanation: 'A list of events is boring. Your emotional journey and insights make the story engaging.' },
        { mistake: 'Using only past simple tense', correction: 'Mix tenses: past continuous for background, past perfect for earlier events', explanation: 'Varied tense usage demonstrates grammatical range. "The sun was setting when we arrived..."' },
        { mistake: 'Vague descriptions: "It was nice/beautiful/good"', correction: 'Use specific sensory details and precise adjectives', explanation: 'Vague words don\'t demonstrate vocabulary. Be specific: "stunning", "tranquil", "overwhelming".' },
        { mistake: 'No clear structure - jumping between events', correction: 'Follow a clear narrative: Setting → Build-up → Main event → Reaction → Reflection', explanation: 'A clear structure helps coherence and makes your story easy to follow.' },
        { mistake: 'Ending abruptly without reflection', correction: 'Always conclude with why the experience was significant or what you learned', explanation: 'The reflection shows critical thinking and gives your story meaning.' }
      ],
      miniPractice: [
        { question: 'Which sentence uses past continuous correctly?', options: ['"I walked when the sun set"', '"The sun was setting when we arrived"', '"The sun setted when we arrived"', '"We were arrive when the sun set"'], type: 'multiple-choice' },
        { question: 'Practice: Describe a memorable moment using at least 2 sensory details.', type: 'rewrite' },
        { question: 'Which emotional vocabulary is most sophisticated?', options: ['"I was happy"', '"I felt good"', '"I was awestruck"', '"It was nice"'], type: 'multiple-choice' },
        { question: 'Complete: "The experience completely _____ my perspective on traditional culture."', type: 'fill-blank' }
      ],
      answerKey: [
        '"The sun was setting when we arrived"',
        'Sample: "I remember standing at the edge of the cliff as the sun was setting, painting the sky in shades of orange and pink. The cool evening breeze carried the scent of pine trees, and in that moment, I felt completely at peace with the world."',
        '"I was awestruck"',
        'shifted/changed/transformed'
      ],
      quickRecap: 'Experience stories need: Clear structure (Setting → Event → Reflection), emotional vocabulary (awestruck, overwhelmed), sensory details (sights, sounds, smells), varied tenses (past simple, continuous, perfect), and meaningful conclusion (what you learned/why significant).',
      collocations: [
        'sense of anticipation', 'took my breath away', 'stands out', 'shifted my perspective',
        'out of my comfort zone', 'exceeded expectations', 'gained appreciation', 'looking back',
        'incredible sense of peace', 'unlike anything I\'d experienced', 'real heart of', 'think about often'
      ],
      synonyms: [
        { word: 'beautiful', synonyms: ['stunning', 'breathtaking', 'picturesque', 'magnificent'] },
        { word: 'memorable', synonyms: ['unforgettable', 'remarkable', 'significant', 'life-changing'] },
        { word: 'surprised', synonyms: ['amazed', 'astonished', 'awestruck', 'blown away'] }
      ],
      speakingLines: [
        'I\'d like to describe a trip I took to Japan about three years ago.',
        'The moment that really stands out was visiting a small temple in Kyoto.',
        'The journey was memorable because it completely shifted my perspective.'
      ]
    }
  },
  // ============================================
  // PART 3: Discussion
  // ============================================
  {
    id: 'speaking-part3-society',
    title: 'Part 3: Society & Social Issues',
    slug: 'speaking-part3-society-issues',
    type: 'speaking',
    level: 'advanced',
    topic: 'Part 3 Discussion',
    description: 'Master Part 3 abstract discussions on society and social issues with sophisticated arguments and Band 9 discussion techniques.',
    is_premium: true,
    is_published: true,
    view_count: 2900,
    created_at: '2025-06-14T10:00:00Z',
    updated_at: '2025-06-14T10:00:00Z',
    estimated_time: 40,
    content: {
      title: 'Part 3: Society & Social Issues',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Discuss abstract topics with depth and sophistication',
        'Structure extended responses with clear arguments',
        'Use hedging language to express uncertainty appropriately',
        'Provide balanced perspectives on complex issues'
      ],
      coreExplanation: `**IELTS Speaking Part 3 Overview:**
- Duration: 4-5 minutes
- Questions: Abstract, opinion-based, related to Part 2 topic
- Answer length: 30-60 seconds per question (longer than Part 1)
- Purpose: Test ability to discuss complex ideas

**Part 3 Question Types:**
1. Opinion: "Do you think...?" "What\'s your view on...?"
2. Comparison: "How has X changed?" "What are the differences between...?"
3. Speculation: "What might happen if...?" "How do you think X will change?"
4. Evaluation: "What are the advantages/disadvantages of...?"

**Response Structure (P-E-E-L):**
- **Point**: State your main idea
- **Explain**: Develop your point
- **Example**: Give evidence or illustration
- **Link**: Connect back or add nuance`,
      examples: [
        { sentence: '**Question: Do you think social media has changed how people communicate?**\n\n**Band 6:** "Yes, I think social media has changed communication a lot. Now people use phones more than talking face to face. This can be good and bad."\n\n**Band 9:** "Absolutely, and I\'d say the transformation has been quite profound. On one level, social media has democratized communication – anyone can now share their voice globally, which was unthinkable a generation ago. However, I think there\'s a legitimate concern that the quality of our interactions has suffered. We\'ve perhaps traded depth for breadth; we have hundreds of online connections but potentially fewer meaningful relationships. That said, I don\'t think it\'s entirely negative – for maintaining long-distance relationships, for instance, social media has been invaluable."', explanation: '**Why Band 9:** Sophisticated vocabulary (democratized, profound, legitimate concern), balanced view (positive and negative), specific examples (long-distance relationships), hedging language (I\'d say, perhaps, potentially), clear structure.' },
        { sentence: '**Question: What are the main challenges facing young people today?**\n\n**Band 6:** "Young people have many challenges today. They need to find jobs and the economy is not good. Also, there is a lot of pressure from society."\n\n**Band 9:** "I think the challenges are multifaceted, but if I had to identify the most pressing ones, I\'d point to economic uncertainty and mental health. The job market has become increasingly competitive, and many young people are graduating with significant debt but limited prospects – that\'s a stark contrast to previous generations. Coupled with that, there\'s the constant pressure of social media, which I believe has contributed to rising anxiety and depression rates among young people. They\'re essentially navigating a world that\'s fundamentally different from what their parents experienced, often without adequate support systems in place."', explanation: '**Why Band 9:** Uses sophisticated framing (multifaceted, if I had to identify), specific issues with development (debt, limited prospects), cause-effect reasoning (social media → anxiety), generational comparison, empathetic conclusion.' },
        { sentence: '**HEDGING LANGUAGE (Essential for Part 3):**\n\n**Expressing opinion with appropriate uncertainty:**\n- "I\'d say..." / "I\'d argue that..."\n- "It seems to me that..."\n- "I\'m inclined to think..."\n- "From my perspective..."\n\n**Showing you\'re generalizing:**\n- "Generally speaking..."\n- "By and large..."\n- "For the most part..."\n- "In most cases..."\n\n**Acknowledging other views:**\n- "That said..."\n- "Having said that..."\n- "On the other hand..."\n- "Although some might argue..."\n\n**Expressing uncertainty:**\n- "Perhaps..." / "Possibly..."\n- "It\'s difficult to say for certain, but..."\n- "I\'m not entirely sure, but I think..."', explanation: 'Hedging shows sophistication. Absolute statements like "Social media is bad" sound simplistic. "I\'d argue that social media has had some negative effects" sounds more nuanced.' },
        { sentence: '**DEVELOPING ARGUMENTS:**\n\n**Adding depth:**\n- "What I mean by that is..."\n- "To elaborate on that point..."\n- "The reason I say this is..."\n\n**Giving examples:**\n- "A case in point would be..."\n- "To give you a concrete example..."\n- "This is evident in..."\n\n**Showing cause and effect:**\n- "This has led to..."\n- "As a consequence..."\n- "The result of this is..."\n\n**Making comparisons:**\n- "In contrast to previous generations..."\n- "Unlike in the past..."\n- "Compared to..."\n\n**Concluding thoughts:**\n- "So ultimately..."\n- "All things considered..."\n- "Taking everything into account..."', explanation: 'Part 3 requires extended responses. These phrases help you develop your ideas fully rather than giving short answers.' },
        { sentence: '**BAND COMPARISON - Abstract question:**\n\n**Question: "How important is it for people to help others in their community?"**\n\n**Band 5:** "It is very important to help others. If we help others, they will help us. Community is important."\n\n**Band 6:** "I think it\'s quite important to help others in the community. When people help each other, the community becomes stronger. Also, helping others makes us feel good."\n\n**Band 7:** "I believe community support is essential for social cohesion. When individuals contribute to their community, it creates a sense of belonging and mutual responsibility. This is particularly important in times of crisis, when community networks can provide crucial support."\n\n**Band 9:** "I\'d argue it\'s fundamental to a functioning society, actually. There\'s a growing body of research suggesting that communities with strong social bonds are more resilient – not just emotionally, but economically as well. What\'s interesting is that helping others often benefits the helper as much as the recipient; there\'s a well-documented phenomenon where volunteering improves mental health and life satisfaction. That said, I think we need to be careful about placing too much burden on community goodwill when structural support systems are inadequate."', explanation: '**Progression:** Band 5 = simple ideas, basic vocabulary. Band 6 = some development, still general. Band 7 = sophisticated vocabulary, specific context. Band 9 = references evidence, nuanced view, critical thinking, balanced conclusion.' }
      ],
      commonMistakes: [
        { mistake: 'Giving short Part 1-style answers', correction: 'Develop your responses with explanations, examples, and nuance (30-60 seconds)', explanation: 'Part 3 tests your ability to discuss complex ideas. Short answers don\'t demonstrate this ability.' },
        { mistake: 'Making absolute statements without hedging', correction: 'Use hedging: "I\'d argue that..." instead of "Social media is bad"', explanation: 'Absolute statements sound simplistic. Hedging shows you understand complexity.' },
        { mistake: 'Only giving one perspective', correction: 'Acknowledge other viewpoints: "That said..." "Although some might argue..."', explanation: 'Balanced responses demonstrate critical thinking and sophistication.' },
        { mistake: 'Using only personal examples', correction: 'Include broader examples, trends, or research references', explanation: 'Part 3 is about abstract discussion, not just personal experience. Show you can think beyond yourself.' },
        { mistake: 'Not connecting ideas logically', correction: 'Use linking phrases: "As a consequence...", "This has led to...", "The result is..."', explanation: 'Clear logical connections demonstrate coherence and help the examiner follow your argument.' }
      ],
      miniPractice: [
        { question: 'How long should Part 3 answers typically be?', options: ['5-10 seconds', '15-20 seconds', '30-60 seconds', '2-3 minutes'], type: 'multiple-choice' },
        { question: 'Practice: Answer this Part 3 question in 3-4 sentences: "Do you think technology has made life easier or more complicated?"', type: 'rewrite' },
        { question: 'Which hedging phrase is most appropriate?', options: ['"Technology is definitely bad"', '"I\'d argue that technology has had mixed effects"', '"Everyone knows technology is good"', '"Technology is the best thing ever"'], type: 'multiple-choice' },
        { question: 'Complete: "_____ some might argue that social media connects people, I believe it can also isolate them."', type: 'fill-blank' }
      ],
      answerKey: [
        '30-60 seconds',
        'Sample: "I\'d say it\'s done both, actually. On one hand, technology has streamlined countless daily tasks – things like banking, communication, and accessing information are infinitely easier now. However, I think there\'s a case to be made that it\'s also added complexity; we\'re now expected to be constantly available, and the sheer volume of information we process daily can be overwhelming. So ultimately, I believe the answer depends largely on how we choose to use technology."',
        '"I\'d argue that technology has had mixed effects"',
        'Although/While'
      ],
      quickRecap: 'Part 3 Formula: Extended responses (30-60 seconds), hedging language (I\'d argue, perhaps), balanced views (That said...), specific examples or evidence, logical connections (As a consequence...). Show you can discuss abstract ideas with depth and nuance.',
      collocations: [
        'legitimate concern', 'stark contrast', 'multifaceted issue', 'pressing challenge',
        'social cohesion', 'mutual responsibility', 'growing body of research', 'well-documented phenomenon',
        'structural support', 'by and large', 'all things considered', 'taking everything into account'
      ],
      synonyms: [
        { word: 'important', synonyms: ['crucial', 'essential', 'fundamental', 'vital'] },
        { word: 'problem', synonyms: ['challenge', 'issue', 'concern', 'difficulty'] },
        { word: 'change', synonyms: ['transformation', 'shift', 'evolution', 'development'] }
      ],
      speakingLines: [
        'I\'d argue that the transformation has been quite profound.',
        'That said, I don\'t think it\'s entirely negative.',
        'All things considered, I believe the benefits outweigh the drawbacks.'
      ]
    }
  },
  {
    id: 'speaking-part3-future',
    title: 'Part 3: Future & Predictions',
    slug: 'speaking-part3-future-predictions',
    type: 'speaking',
    level: 'advanced',
    topic: 'Part 3 Discussion',
    description: 'Master speculation and prediction questions with appropriate future language and Band 9 analytical techniques.',
    is_premium: true,
    is_published: true,
    view_count: 2600,
    created_at: '2025-06-15T10:00:00Z',
    updated_at: '2025-06-15T10:00:00Z',
    estimated_time: 40,
    content: {
      title: 'Part 3: Future & Predictions',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Speculate about the future with appropriate language',
        'Use modal verbs for different degrees of certainty',
        'Discuss trends and their potential consequences',
        'Structure predictions with reasoning and evidence'
      ],
      coreExplanation: `**Common Future/Prediction Questions:**
- "How do you think X will change in the future?"
- "What might happen if...?"
- "Do you think X will still exist in 50 years?"
- "What changes do you predict in...?"

**Modal Verbs for Predictions:**
- **Will** (certain): "Technology will continue to advance"
- **Is likely to** (probable): "Remote work is likely to become more common"
- **May/Might** (possible): "AI might replace some jobs"
- **Could** (speculative): "We could see major changes"

**Structure for Prediction Answers:**
1. Current trend or situation
2. Your prediction
3. Reasoning (why you think this)
4. Potential consequences or implications`,
      examples: [
        { sentence: '**Question: How do you think education will change in the next 20 years?**\n\n**Band 6:** "I think education will change a lot. There will be more technology. Students will learn online more. Teachers might not be needed as much."\n\n**Band 9:** "I think we\'re likely to see a fundamental shift in how education is delivered. The pandemic has already accelerated the adoption of online learning, and I suspect this trend will continue, though perhaps in a hybrid form rather than fully replacing traditional classrooms. What\'s particularly interesting is the potential for AI to personalize learning – we might see systems that adapt in real-time to each student\'s pace and learning style. That said, I don\'t think the role of teachers will diminish; if anything, it may evolve toward more mentorship and guidance rather than pure content delivery."', explanation: '**Why Band 9:** Uses varied modal verbs (likely to, might, may), references current trends (pandemic, AI), shows nuanced thinking (hybrid form, evolving role), hedges appropriately (I suspect, perhaps), provides reasoning throughout.' },
        { sentence: '**Question: What might happen if everyone worked from home?**\n\n**Band 6:** "If everyone worked from home, there would be less traffic. People would save time. But maybe they would feel lonely."\n\n**Band 9:** "That\'s a fascinating hypothetical. On the positive side, we\'d likely see significant environmental benefits – reduced commuting would mean lower carbon emissions and less congestion. There could also be economic shifts, with less demand for commercial real estate but potentially more investment in residential areas and local communities. However, I think we\'d need to consider the social implications carefully. Humans are inherently social creatures, and the spontaneous interactions that happen in physical workplaces – the water cooler conversations, if you will – often spark creativity and build relationships in ways that virtual meetings simply can\'t replicate. So while it might work for some industries, I\'d be cautious about assuming it\'s universally beneficial."', explanation: '**Why Band 9:** Acknowledges the hypothetical nature, considers multiple dimensions (environmental, economic, social), uses sophisticated vocabulary (inherently, spontaneous, replicate), provides balanced analysis, concludes with nuanced position.' },
        { sentence: '**LANGUAGE FOR PREDICTIONS:**\n\n**High certainty:**\n- "X will undoubtedly/certainly..."\n- "It\'s inevitable that..."\n- "There\'s no question that..."\n\n**Medium certainty:**\n- "X is likely to..."\n- "I expect/anticipate that..."\n- "In all probability..."\n- "The chances are that..."\n\n**Low certainty:**\n- "X might/may/could..."\n- "It\'s possible that..."\n- "There\'s a chance that..."\n- "X could potentially..."\n\n**Speculation:**\n- "I suspect that..."\n- "My guess would be..."\n- "If current trends continue..."\n- "Assuming X continues, we might see..."', explanation: 'Varying your certainty level shows sophistication. Don\'t say "will" for everything – match your language to how confident you actually are.' },
        { sentence: '**DISCUSSING TRENDS:**\n\n**Identifying trends:**\n- "We\'re already seeing..."\n- "There\'s a growing trend toward..."\n- "X has been gaining momentum..."\n- "The shift toward X has accelerated..."\n\n**Projecting trends:**\n- "If this trend continues..."\n- "This is likely to intensify..."\n- "We can expect this to..."\n- "The trajectory suggests..."\n\n**Consequences:**\n- "This could lead to..."\n- "The implications of this are..."\n- "As a result, we might see..."\n- "This would have knock-on effects on..."', explanation: 'Connecting current trends to future predictions shows analytical thinking. Don\'t just make random predictions – base them on observable patterns.' },
        { sentence: '**BAND COMPARISON - Prediction question:**\n\n**Question: "Do you think cash will disappear in the future?"**\n\n**Band 5:** "Yes, I think cash will disappear. Everyone uses cards now. It is more convenient."\n\n**Band 6:** "I think cash might disappear in the future because more people are using digital payments. It\'s more convenient and safer. But some people still prefer cash."\n\n**Band 7:** "I believe we\'re moving toward a cashless society, though I don\'t think cash will disappear entirely. Digital payments are certainly becoming more prevalent, particularly among younger generations. However, there will likely always be situations where cash is preferred or necessary."\n\n**Band 9:** "I think we\'re certainly heading in that direction, though I\'d hesitate to say cash will disappear completely. The trend toward digital payments has accelerated dramatically – in some countries like Sweden, cash transactions have become almost negligible. However, I suspect there will always be a segment of the population, particularly older generations and those in rural areas, who rely on physical currency. There are also privacy concerns with fully traceable digital transactions that might keep cash relevant. So while I expect cash to become increasingly marginal, I doubt it will vanish entirely within our lifetimes."', explanation: '**Progression:** Band 5 = simple prediction, basic reasoning. Band 6 = some hedging, acknowledges alternatives. Band 7 = nuanced view, varied vocabulary. Band 9 = specific examples (Sweden), multiple perspectives (generations, privacy), appropriate hedging, sophisticated conclusion.' }
      ],
      commonMistakes: [
        { mistake: 'Using only "will" for all predictions', correction: 'Vary modal verbs based on certainty: will, is likely to, might, could', explanation: 'Using only "will" suggests you see everything as certain, which sounds simplistic.' },
        { mistake: 'Making predictions without reasoning', correction: 'Always explain WHY you think something will happen', explanation: 'Unsupported predictions don\'t demonstrate analytical thinking. Connect to current trends or logic.' },
        { mistake: 'Ignoring potential downsides or complications', correction: 'Consider multiple perspectives and potential problems', explanation: 'One-sided predictions sound naive. Acknowledge complexity.' },
        { mistake: 'Being too vague: "Things will change"', correction: 'Be specific about WHAT will change and HOW', explanation: 'Vague predictions don\'t demonstrate vocabulary or analytical ability.' },
        { mistake: 'Not connecting to current trends', correction: 'Reference current situations: "We\'re already seeing...", "The pandemic has shown..."', explanation: 'Grounding predictions in current reality makes them more credible and shows awareness.' }
      ],
      miniPractice: [
        { question: 'Which modal verb shows the LEAST certainty?', options: ['will', 'is likely to', 'might', 'is certain to'], type: 'multiple-choice' },
        { question: 'Practice: Make a prediction about transportation in 20 years with reasoning.', type: 'rewrite' },
        { question: 'Which phrase best introduces a trend?', options: ['"I think..."', '"We\'re already seeing a shift toward..."', '"In my opinion..."', '"Maybe..."'], type: 'multiple-choice' },
        { question: 'Complete: "If current trends _____, we might see significant changes in how people work."', type: 'fill-blank' }
      ],
      answerKey: [
        'might',
        'Sample: "I think we\'re likely to see a significant shift toward electric and autonomous vehicles. We\'re already seeing major car manufacturers phasing out combustion engines, and the technology for self-driving cars is advancing rapidly. If this trend continues, I suspect that within 20 years, most urban transportation could be electric and at least partially automated. This would have knock-on effects on everything from urban planning to the insurance industry."',
        '"We\'re already seeing a shift toward..."',
        'continue'
      ],
      quickRecap: 'Prediction Formula: Current trend → Your prediction (with appropriate modal verb) → Reasoning → Consequences. Vary certainty (will, likely to, might, could). Reference current situations. Consider multiple perspectives. Be specific, not vague.',
      collocations: [
        'fundamental shift', 'accelerated adoption', 'hybrid form', 'evolving role',
        'knock-on effects', 'gaining momentum', 'trajectory suggests', 'increasingly marginal',
        'within our lifetimes', 'if current trends continue', 'the implications are', 'heading in that direction'
      ],
      synonyms: [
        { word: 'change', synonyms: ['shift', 'transformation', 'evolution', 'transition'] },
        { word: 'increase', synonyms: ['grow', 'rise', 'expand', 'accelerate'] },
        { word: 'disappear', synonyms: ['vanish', 'become obsolete', 'phase out', 'decline'] }
      ],
      speakingLines: [
        'I think we\'re likely to see a fundamental shift in how education is delivered.',
        'If current trends continue, we might see significant changes.',
        'I\'d hesitate to say it will disappear completely, but it will certainly become less common.'
      ]
    }
  },
  // ============================================
  // PART 1: Additional Topics (Hobbies, Daily Routine, Food, Weather, Technology, Music)
  // ============================================
  {
    id: 'speaking-part1-hobbies',
    title: 'Part 1: Hobbies & Interests',
    slug: 'speaking-part1-hobbies',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Hobbies',
    description: 'Master hobby and interest questions with natural Band 9 responses and enthusiasm.',
    is_premium: true,
    is_published: true,
    view_count: 2600,
    created_at: '2025-06-29T10:00:00Z',
    updated_at: '2025-06-29T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Part 1: Hobbies & Interests',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Talk about hobbies with genuine enthusiasm',
        'Use varied vocabulary for activities and interests',
        'Explain why you enjoy certain activities',
        'Discuss how often you do activities naturally'
      ],
      coreExplanation: `**Common Hobby Questions:**
- What do you do in your free time?
- Do you have any hobbies?
- How often do you [activity]?
- When did you start [hobby]?
- Would you like to try any new hobbies?

**Strategy:**
1. Show genuine interest - enthusiasm is engaging
2. Be specific - mention actual activities, not generic "sports"
3. Explain the appeal - why you enjoy it
4. Mention frequency naturally - "most weekends", "whenever I can"`,
      examples: [
        { sentence: '**Question: What do you do in your free time?**\n\n**Band 6:** "I like reading books and watching movies. Sometimes I play sports with friends."\n\n**Band 9:** "I\'m quite an avid reader, actually. I tend to gravitate towards historical fiction – there\'s something fascinating about experiencing different time periods through stories. When I need something more active, I enjoy hiking. There\'s a great trail network near my place that I try to explore most weekends."', explanation: '**What Changed:** Band 9 uses sophisticated expressions (avid reader, gravitate towards), explains the appeal (experiencing different time periods), and provides specific details (historical fiction, trail network). Shows genuine interest.' },
        { sentence: '**Question: How did you become interested in [hobby]?**\n\n**Band 6:** "I started photography two years ago. My friend taught me. Now I like it very much."\n\n**Band 9:** "I actually stumbled into photography quite by accident. A few years back, I borrowed my friend\'s camera for a trip, and I was amazed by how differently you see the world when you\'re looking for interesting shots. Since then, I\'ve been hooked – I\'ve even invested in my own equipment and taken a few online courses to improve my technique."', explanation: '**What Changed:** Band 9 tells a story (stumbled into, borrowed camera), explains the transformation (see the world differently), and shows progression (invested in equipment, taken courses). Natural storytelling.' },
        { sentence: '**VOCABULARY FOR HOBBIES:**\n\n**Expressing interest:**\n- I\'m quite into...\n- I\'m passionate about...\n- I\'m an avid [reader/gamer/etc.]\n- I\'ve recently taken up...\n- I\'ve been hooked on... since...\n\n**Frequency:**\n- whenever I get the chance\n- most weekends\n- a couple of times a week\n- as often as I can\n- on and off (= irregularly)\n\n**Explaining appeal:**\n- What I love about it is...\n- The thing that draws me to it is...\n- I find it really [relaxing/challenging/rewarding]\n- It\'s a great way to [unwind/stay active/be creative]', explanation: 'These expressions make your answers sound natural and enthusiastic. Choose phrases that genuinely reflect your feelings.' },
        { sentence: '**BAND COMPARISON - Question: "Do you enjoy cooking?"**\n\n**Band 5:** "Yes, I like cooking. I cook every day. It is good."\n\n**Band 6:** "Yes, I enjoy cooking. I usually cook dinner for my family. I like trying new recipes from the internet."\n\n**Band 7:** "I\'d say I\'m quite into cooking, actually. I find it really therapeutic after a long day at work. I particularly enjoy experimenting with different cuisines – lately I\'ve been trying my hand at Thai food."\n\n**Band 8-9:** "Absolutely! Cooking has become something of a creative outlet for me. What I love most is the experimentation – taking a basic recipe and tweaking it to suit my taste. I\'ve been particularly drawn to Asian cuisines recently; there\'s such a wonderful complexity of flavors. Plus, there\'s something incredibly satisfying about serving a meal you\'ve made from scratch to friends and family."', explanation: '**Progression:** Band 5 = basic, repetitive. Band 6 = more detail, specific example. Band 7 = idiomatic language (quite into, trying my hand at), explains appeal. Band 8-9 = sophisticated vocabulary (creative outlet, complexity of flavors), multiple developed reasons, natural enthusiasm.' }
      ],
      commonMistakes: [
        { mistake: 'Saying "I don\'t have any hobbies"', correction: 'Everyone does something in free time. Mention reading, watching shows, cooking, walking, etc.', explanation: 'Saying you have no hobbies gives the examiner nothing to work with and suggests limited vocabulary.' },
        { mistake: 'Just listing hobbies without explanation', correction: 'Explain why you enjoy each activity or what you get from it', explanation: 'Lists don\'t demonstrate language ability. Develop your answers with reasons and examples.' },
        { mistake: 'Using "very" repeatedly', correction: 'Use varied intensifiers: really, incredibly, particularly, quite, absolutely', explanation: 'Overusing "very" suggests limited vocabulary range.' },
        { mistake: 'Sounding unenthusiastic about your own hobbies', correction: 'Show genuine interest through your tone and word choice', explanation: 'Enthusiasm makes answers more engaging and demonstrates natural communication.' },
        { mistake: 'Claiming hobbies you don\'t actually have', correction: 'Be honest. Examiners can tell when you\'re making things up.', explanation: 'Fake hobbies lead to vague, unconvincing answers. Speak about what you genuinely do.' }
      ],
      miniPractice: [
        { question: 'Which phrase shows enthusiasm naturally?', options: ['"I like it very much"', '"I\'m quite into it, actually"', '"It is good"', '"I do it sometimes"'], type: 'multiple-choice' },
        { question: 'Answer: "What do you do in your free time?" (2-4 sentences)', type: 'rewrite' },
        { question: 'Which is the most natural way to describe frequency?', options: ['"I do it three point five times per week"', '"I do it regularly"', '"Most weekends, whenever I get the chance"', '"Always"'], type: 'multiple-choice' },
        { question: 'Complete: "I\'ve been _____ on photography since I borrowed my friend\'s camera."', type: 'fill-blank' }
      ],
      answerKey: [
        '"I\'m quite into it, actually"',
        'Sample: "I\'m quite an avid reader, actually. I tend to gravitate towards mystery novels – there\'s something thrilling about trying to solve the puzzle before the detective does. I usually read for an hour or so before bed most nights."',
        '"Most weekends, whenever I get the chance"',
        'hooked'
      ],
      quickRecap: 'Hobby Questions Formula: Show genuine enthusiasm + Be specific about activities + Explain the appeal + Mention frequency naturally. Use varied vocabulary (avid, passionate about, hooked on). Avoid just listing hobbies. Tell mini-stories about how you got interested.',
      collocations: [
        'avid reader', 'quite into', 'taken up', 'hooked on', 'creative outlet',
        'trying my hand at', 'drawn to', 'from scratch', 'whenever I get the chance',
        'most weekends', 'stumbled into', 'gravitate towards'
      ],
      synonyms: [
        { word: 'like', synonyms: ['enjoy', 'be into', 'be passionate about', 'be fond of'] },
        { word: 'relaxing', synonyms: ['therapeutic', 'calming', 'unwinding', 'stress-relieving'] },
        { word: 'interesting', synonyms: ['fascinating', 'engaging', 'captivating', 'intriguing'] }
      ],
      speakingLines: [
        'I\'m quite an avid reader, actually. I tend to gravitate towards historical fiction.',
        'What I love most about it is the experimentation and creativity involved.',
        'I\'ve been hooked on photography since I borrowed my friend\'s camera a few years ago.'
      ]
    }
  },
  {
    id: 'speaking-part1-daily-routine',
    title: 'Part 1: Daily Routine',
    slug: 'speaking-part1-daily-routine',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Daily Routine',
    description: 'Master daily routine questions with natural time expressions and varied vocabulary.',
    is_premium: true,
    is_published: true,
    view_count: 2400,
    created_at: '2025-06-30T10:00:00Z',
    updated_at: '2025-06-30T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Part 1: Daily Routine',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Describe daily activities with varied vocabulary',
        'Use natural time expressions',
        'Talk about habits and preferences',
        'Avoid repetitive sentence structures'
      ],
      coreExplanation: `**Common Daily Routine Questions:**
- What time do you usually wake up?
- What do you do in the morning?
- Do you have a fixed routine?
- What is your favorite part of the day?
- Are you a morning person or night owl?

**Strategy:**
1. Use varied time expressions (around, roughly, usually, tend to)
2. Add reasons or feelings about your routine
3. Mention variations (weekdays vs weekends)
4. Show personality through preferences`,
      examples: [
        { sentence: '**Question: What time do you usually wake up?**\n\n**Band 6:** "I wake up at 7 o\'clock. Then I eat breakfast. Then I go to work."\n\n**Band 9:** "On weekdays, I\'m usually up around 6:30 – I\'m definitely more of a morning person, so I like to have a bit of time to myself before the day gets hectic. Weekends are a different story though; I tend to sleep in until 9 or so."', explanation: '**What Changed:** Band 9 uses natural time expressions (around, or so), shows personality (morning person), contrasts weekdays/weekends, and uses idiomatic language (gets hectic, sleep in).' },
        { sentence: '**Question: Are you a morning person or a night owl?**\n\n**Band 6:** "I am a morning person. I like to wake up early. I feel good in the morning."\n\n**Band 9:** "I\'d say I\'m definitely more of a morning person. There\'s something really satisfying about getting things done before most people are even awake. I find I\'m at my most productive in the early hours, whereas by evening I tend to wind down and prefer more relaxing activities."', explanation: '**What Changed:** Band 9 explains the preference (satisfying, productive), uses sophisticated expressions (at my most productive, wind down), and provides contrast (morning vs evening).' },
        { sentence: '**TIME EXPRESSIONS:**\n\n**Approximate times:**\n- around / roughly / about 7 o\'clock\n- 7-ish / sevenish\n- sometime between 6 and 7\n\n**Frequency:**\n- I tend to... / I usually...\n- More often than not...\n- On a typical day...\n- Nine times out of ten...\n\n**Contrast:**\n- On weekdays... but on weekends...\n- During the week... whereas at weekends...\n- In the morning... but by evening...', explanation: 'Natural speakers rarely give exact times. Using approximate expressions sounds more authentic.' }
      ],
      commonMistakes: [
        { mistake: 'Giving exact times robotically', correction: 'Use approximate expressions: "around 7", "roughly 6:30", "7-ish"', explanation: 'Exact times sound rehearsed. Natural speakers use approximations.' },
        { mistake: 'Using "then" repeatedly', correction: 'Vary connectors: "After that", "Once I\'ve done that", "Following breakfast"', explanation: 'Repetitive connectors suggest limited vocabulary.' },
        { mistake: 'Not explaining preferences', correction: 'Add reasons: "I prefer mornings because I\'m more productive then"', explanation: 'Explaining why shows critical thinking and extends your answer naturally.' },
        { mistake: 'Describing every single activity', correction: 'Focus on highlights or interesting aspects of your routine', explanation: 'A complete list is boring. Highlight what makes your routine unique.' },
        { mistake: 'No variation between weekdays and weekends', correction: 'Mention how your routine differs: "Weekdays are quite structured, but weekends..."', explanation: 'Showing variation demonstrates flexibility in your language.' }
      ],
      miniPractice: [
        { question: 'Which time expression sounds most natural?', options: ['"I wake up at exactly 7:00 AM"', '"I\'m usually up around 7-ish"', '"I wake up at 7 o\'clock sharp"', '"My alarm is set for 7:00"'], type: 'multiple-choice' },
        { question: 'Answer: "What do you do first thing in the morning?" (2-4 sentences)', type: 'rewrite' },
        { question: 'Which phrase best describes being a morning person?', options: ['"I like morning"', '"I\'m definitely more of a morning person"', '"Morning is good"', '"I wake up early"'], type: 'multiple-choice' },
        { question: 'Complete: "I tend to _____ down in the evenings and prefer more relaxing activities."', type: 'fill-blank' }
      ],
      answerKey: [
        '"I\'m usually up around 7-ish"',
        'Sample: "First thing I do is make myself a strong coffee – I\'m not really functional until I\'ve had my caffeine fix! After that, I usually spend about twenty minutes catching up on the news before getting ready for work."',
        '"I\'m definitely more of a morning person"',
        'wind'
      ],
      quickRecap: 'Daily Routine Formula: Use approximate times (around, roughly) + Show personality (morning person, night owl) + Contrast weekdays/weekends + Explain preferences. Avoid listing every activity. Focus on interesting aspects.',
      collocations: [
        'morning person', 'night owl', 'sleep in', 'wind down', 'get things done',
        'at my most productive', 'first thing', 'caffeine fix', 'catch up on',
        'gets hectic', 'tend to', 'more often than not'
      ],
      synonyms: [
        { word: 'wake up', synonyms: ['get up', 'rise', 'be up', 'start the day'] },
        { word: 'busy', synonyms: ['hectic', 'packed', 'full-on', 'non-stop'] },
        { word: 'relax', synonyms: ['wind down', 'unwind', 'take it easy', 'chill out'] }
      ],
      speakingLines: [
        'I\'m usually up around 6:30 – I\'m definitely more of a morning person.',
        'I tend to wind down in the evenings and prefer more relaxing activities.',
        'Weekends are a different story though; I tend to sleep in until 9 or so.'
      ]
    }
  },
  {
    id: 'speaking-part1-food',
    title: 'Part 1: Food & Eating',
    slug: 'speaking-part1-food',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Food',
    description: 'Master food-related questions with rich vocabulary for tastes, cuisines, and eating habits.',
    is_premium: true,
    is_published: true,
    view_count: 2500,
    created_at: '2025-07-01T10:00:00Z',
    updated_at: '2025-07-01T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Part 1: Food & Eating',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Describe food preferences with rich vocabulary',
        'Talk about cuisines and cooking naturally',
        'Express likes and dislikes with nuance',
        'Discuss eating habits and changes'
      ],
      coreExplanation: `**Common Food Questions:**
- What kind of food do you like?
- Do you prefer eating at home or in restaurants?
- Can you cook?
- What food is popular in your country?
- Has your diet changed over the years?

**Strategy:**
1. Be specific about cuisines and dishes
2. Use descriptive vocabulary for taste and texture
3. Explain your preferences with reasons
4. Share personal stories or experiences`,
      examples: [
        { sentence: '**Question: What kind of food do you like?**\n\n**Band 6:** "I like Chinese food. It is delicious. I also like pizza and pasta."\n\n**Band 9:** "I\'d say I\'m quite adventurous when it comes to food. I particularly enjoy Asian cuisines – there\'s such a wonderful complexity of flavors in dishes like Thai curries or Japanese ramen. That said, I\'m also a sucker for comfort food like a good homemade pasta or a proper Sunday roast."', explanation: '**What Changed:** Band 9 shows personality (adventurous), uses sophisticated food vocabulary (complexity of flavors), mentions specific dishes, and uses idiomatic expressions (a sucker for, proper Sunday roast).' },
        { sentence: '**Question: Do you prefer eating at home or in restaurants?**\n\n**Band 6:** "I prefer eating at home. It is cheaper. Restaurant food is expensive."\n\n**Band 9:** "It really depends on the occasion. For everyday meals, I much prefer cooking at home – it\'s healthier, more economical, and I actually find the process quite therapeutic. But for special occasions or when I want to try something new, I love exploring local restaurants. There\'s something exciting about discovering a hidden gem."', explanation: '**What Changed:** Band 9 shows nuanced thinking (depends on occasion), gives multiple reasons (healthier, economical, therapeutic), and uses natural expressions (hidden gem, exploring).' },
        { sentence: '**FOOD VOCABULARY:**\n\n**Describing taste:**\n- savory, sweet, tangy, spicy, mild\n- rich, light, refreshing, hearty\n- mouthwatering, delectable, scrumptious\n\n**Describing texture:**\n- crispy, crunchy, tender, chewy\n- creamy, smooth, fluffy\n\n**Expressing preferences:**\n- I\'m a big fan of...\n- I\'m quite partial to...\n- I\'m a sucker for...\n- I can\'t resist...\n- I\'m not keen on... / I\'m not a fan of...', explanation: 'Rich food vocabulary demonstrates lexical resource. Use specific descriptors rather than just "delicious" or "good".' }
      ],
      commonMistakes: [
        { mistake: 'Only saying "delicious" to describe food', correction: 'Use varied vocabulary: savory, mouthwatering, flavorful, scrumptious', explanation: 'Overusing "delicious" suggests limited vocabulary.' },
        { mistake: 'Not being specific about cuisines or dishes', correction: 'Mention specific cuisines (Thai, Italian) and dishes (pad thai, risotto)', explanation: 'Specific examples demonstrate vocabulary and make answers more interesting.' },
        { mistake: 'Giving one-sided answers', correction: 'Show nuance: "I generally prefer X, but sometimes Y"', explanation: 'Nuanced answers demonstrate sophisticated thinking.' },
        { mistake: 'Not explaining preferences', correction: 'Add reasons: "I love spicy food because it adds excitement to meals"', explanation: 'Explaining why extends your answer and shows critical thinking.' },
        { mistake: 'Using childish expressions', correction: 'Use mature expressions: "I\'m quite partial to" instead of "I really really like"', explanation: 'Sophisticated expressions demonstrate language maturity.' }
      ],
      miniPractice: [
        { question: 'Which phrase sounds most sophisticated?', options: ['"I really like pizza"', '"I\'m quite partial to Italian cuisine"', '"Pizza is my favorite"', '"I love pizza very much"'], type: 'multiple-choice' },
        { question: 'Answer: "What\'s your favorite dish?" (2-4 sentences)', type: 'rewrite' },
        { question: 'Which word best describes a rich, satisfying meal?', options: ['Good', 'Nice', 'Hearty', 'Okay'], type: 'multiple-choice' },
        { question: 'Complete: "I\'m a _____ for comfort food like homemade pasta."', type: 'fill-blank' }
      ],
      answerKey: [
        '"I\'m quite partial to Italian cuisine"',
        'Sample: "I\'d have to say my grandmother\'s chicken curry – it\'s this incredibly aromatic dish with a perfect balance of spices. She\'s been making it for decades, and there\'s something wonderfully nostalgic about it. No restaurant version has ever come close."',
        'Hearty',
        'sucker'
      ],
      quickRecap: 'Food Questions Formula: Be specific about cuisines and dishes + Use rich vocabulary (savory, mouthwatering, hearty) + Explain preferences with reasons + Share personal stories. Avoid just saying "delicious" – describe flavors and textures.',
      collocations: [
        'complexity of flavors', 'comfort food', 'hidden gem', 'home-cooked meal',
        'quite partial to', 'a sucker for', 'can\'t resist', 'acquired taste',
        'food scene', 'culinary adventure', 'mouthwatering', 'hearty meal'
      ],
      synonyms: [
        { word: 'delicious', synonyms: ['mouthwatering', 'scrumptious', 'delectable', 'divine'] },
        { word: 'like', synonyms: ['be partial to', 'be fond of', 'have a weakness for', 'be a fan of'] },
        { word: 'tasty', synonyms: ['flavorful', 'savory', 'appetizing', 'palatable'] }
      ],
      speakingLines: [
        'I\'d say I\'m quite adventurous when it comes to food.',
        'I\'m quite partial to Asian cuisines – there\'s such a wonderful complexity of flavors.',
        'I\'m a sucker for comfort food like a good homemade pasta.'
      ]
    }
  },
  {
    id: 'speaking-part1-technology',
    title: 'Part 1: Technology & Gadgets',
    slug: 'speaking-part1-technology',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Technology',
    description: 'Master technology questions with modern vocabulary and balanced perspectives.',
    is_premium: true,
    is_published: true,
    view_count: 2300,
    created_at: '2025-07-02T10:00:00Z',
    updated_at: '2025-07-02T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Part 1: Technology & Gadgets',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Discuss technology use naturally',
        'Express balanced views on tech',
        'Use modern tech vocabulary',
        'Talk about digital habits'
      ],
      coreExplanation: `**Common Technology Questions:**
- How often do you use your phone?
- What apps do you use most?
- Do you think technology has improved our lives?
- Are you good with technology?
- What technology could you not live without?

**Strategy:**
1. Be honest about your tech habits
2. Show awareness of both benefits and drawbacks
3. Use current, relevant examples
4. Avoid extreme positions (all good or all bad)`,
      examples: [
        { sentence: '**Question: How often do you use your phone?**\n\n**Band 6:** "I use my phone every day. I use it for calling and messaging. I also use social media."\n\n**Band 9:** "Probably more than I should, to be honest! It\'s become such an integral part of daily life – from checking emails first thing in the morning to using it for navigation, banking, and staying connected with friends. I\'ve been trying to be more mindful about screen time lately, though."', explanation: '**What Changed:** Band 9 shows self-awareness (more than I should), lists specific uses naturally, and demonstrates critical thinking (trying to be more mindful). Uses sophisticated vocabulary (integral, mindful).' },
        { sentence: '**Question: Do you think technology has improved our lives?**\n\n**Band 6:** "Yes, technology has improved our lives. We can communicate easily. We can find information quickly."\n\n**Band 9:** "On balance, I\'d say yes, but it\'s a bit of a double-edged sword. On one hand, technology has revolutionized how we access information and connect with people globally. On the other hand, there are legitimate concerns about screen addiction and the impact on face-to-face relationships. I think it comes down to how we use it."', explanation: '**What Changed:** Band 9 shows nuanced thinking (double-edged sword), presents both sides, and uses sophisticated expressions (on balance, legitimate concerns, comes down to). Demonstrates critical analysis.' },
        { sentence: '**TECHNOLOGY VOCABULARY:**\n\n**Describing use:**\n- integral part of daily life\n- couldn\'t live without\n- heavily reliant on\n- constantly connected\n\n**Benefits:**\n- revolutionized, transformed\n- streamlined, simplified\n- enhanced, improved\n\n**Concerns:**\n- screen addiction, digital detox\n- privacy concerns, data security\n- over-reliance, dependency\n\n**Balanced expressions:**\n- double-edged sword\n- on balance\n- it comes down to how we use it', explanation: 'Technology questions often require balanced answers. Having vocabulary for both benefits and drawbacks is essential.' }
      ],
      commonMistakes: [
        { mistake: 'Being extremely positive or negative about technology', correction: 'Show balanced perspective: "It has benefits, but also some drawbacks"', explanation: 'Extreme positions suggest inability to think critically.' },
        { mistake: 'Using outdated examples', correction: 'Use current, relevant examples: apps, streaming, social media', explanation: 'Outdated examples suggest you\'re not engaged with the topic.' },
        { mistake: 'Not showing self-awareness', correction: 'Acknowledge your own habits: "Probably more than I should"', explanation: 'Self-awareness makes answers more authentic and engaging.' },
        { mistake: 'Being vague about technology use', correction: 'Be specific: "I use it for navigation, banking, and staying connected"', explanation: 'Specific examples demonstrate vocabulary and genuine engagement.' },
        { mistake: 'Ignoring the downsides', correction: 'Mention concerns: "There are legitimate concerns about screen time"', explanation: 'Acknowledging downsides shows critical thinking.' }
      ],
      miniPractice: [
        { question: 'Which phrase shows balanced thinking?', options: ['"Technology is amazing"', '"Technology is terrible"', '"It\'s a bit of a double-edged sword"', '"I don\'t know"'], type: 'multiple-choice' },
        { question: 'Answer: "What technology could you not live without?" (2-4 sentences)', type: 'rewrite' },
        { question: 'Which expression means "essential"?', options: ['Nice to have', 'Integral part of daily life', 'Sometimes useful', 'Occasionally helpful'], type: 'multiple-choice' },
        { question: 'Complete: "I\'ve been trying to be more _____ about my screen time lately."', type: 'fill-blank' }
      ],
      answerKey: [
        '"It\'s a bit of a double-edged sword"',
        'Sample: "Definitely my smartphone – it\'s become such an integral part of how I navigate daily life. From managing my schedule to staying connected with family abroad, it\'s essentially my portable office and social hub rolled into one. That said, I do sometimes wonder if I\'ve become a bit too dependent on it."',
        'Integral part of daily life',
        'mindful'
      ],
      quickRecap: 'Technology Questions Formula: Show self-awareness about habits + Present balanced views (benefits AND concerns) + Use specific, current examples + Demonstrate critical thinking. Avoid extreme positions. Use expressions like "double-edged sword" and "on balance".',
      collocations: [
        'integral part', 'double-edged sword', 'screen time', 'digital detox',
        'constantly connected', 'over-reliant', 'revolutionized', 'streamlined',
        'privacy concerns', 'on balance', 'comes down to', 'mindful about'
      ],
      synonyms: [
        { word: 'important', synonyms: ['integral', 'essential', 'indispensable', 'vital'] },
        { word: 'improve', synonyms: ['revolutionize', 'transform', 'enhance', 'streamline'] },
        { word: 'problem', synonyms: ['concern', 'drawback', 'downside', 'issue'] }
      ],
      speakingLines: [
        'It\'s become such an integral part of daily life.',
        'On balance, I\'d say technology has improved our lives, but it\'s a double-edged sword.',
        'I\'ve been trying to be more mindful about screen time lately.'
      ]
    }
  },
  {
    id: 'speaking-part1-music',
    title: 'Part 1: Music & Entertainment',
    slug: 'speaking-part1-music',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Music',
    description: 'Master music questions with vocabulary for genres, preferences, and listening habits.',
    is_premium: true,
    is_published: true,
    view_count: 2200,
    created_at: '2025-07-03T10:00:00Z',
    updated_at: '2025-07-03T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Part 1: Music & Entertainment',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Discuss music preferences naturally',
        'Use vocabulary for genres and styles',
        'Explain emotional connections to music',
        'Talk about listening habits'
      ],
      coreExplanation: `**Common Music Questions:**
- What kind of music do you like?
- Do you play any instruments?
- When do you usually listen to music?
- Has your taste in music changed?
- Do you prefer live music or recorded music?

**Strategy:**
1. Be specific about genres and artists
2. Explain why you like certain music
3. Connect music to emotions or memories
4. Mention when/how you listen`,
      examples: [
        { sentence: '**Question: What kind of music do you like?**\n\n**Band 6:** "I like pop music. I also like rock music. My favorite singer is Taylor Swift."\n\n**Band 9:** "My taste is quite eclectic, actually. I tend to gravitate towards indie rock and alternative music – there\'s something about the raw, authentic sound that really resonates with me. But I also have a soft spot for jazz when I\'m in the mood to unwind. It really depends on my mood and what I\'m doing."', explanation: '**What Changed:** Band 9 uses sophisticated vocabulary (eclectic, gravitate towards, resonates), explains the appeal (raw, authentic sound), and shows flexibility (depends on mood). More nuanced than just listing genres.' },
        { sentence: '**Question: When do you usually listen to music?**\n\n**Band 6:** "I listen to music every day. I listen when I go to work. I also listen at home."\n\n**Band 9:** "Music is pretty much the soundtrack to my daily life. I always have something playing during my commute – it makes the journey fly by. And when I\'m working on something creative, I find instrumental music helps me focus. In the evenings, I might put on something more mellow to wind down."', explanation: '**What Changed:** Band 9 uses creative expression (soundtrack to my life), explains the purpose of music in different contexts (commute, creative work, winding down), and uses idiomatic language (fly by, mellow).' },
        { sentence: '**MUSIC VOCABULARY:**\n\n**Describing taste:**\n- eclectic, diverse, varied\n- I gravitate towards...\n- I have a soft spot for...\n- I\'m really into...\n\n**Describing music:**\n- upbeat, mellow, soothing\n- raw, authentic, polished\n- catchy, haunting, powerful\n\n**Emotional connection:**\n- resonates with me\n- speaks to me\n- takes me back to...\n- lifts my mood', explanation: 'Music vocabulary should include both genre terms and emotional descriptors. Connecting music to feelings demonstrates sophisticated language use.' }
      ],
      commonMistakes: [
        { mistake: 'Just listing genres without explanation', correction: 'Explain why you like certain music: "I love jazz because it helps me relax"', explanation: 'Explaining preferences shows critical thinking and extends your answer.' },
        { mistake: 'Using "good" to describe music', correction: 'Use specific descriptors: upbeat, mellow, haunting, powerful, catchy', explanation: '"Good" is vague. Specific descriptors demonstrate vocabulary range.' },
        { mistake: 'Not connecting music to emotions or situations', correction: 'Explain when/why you listen: "I put on jazz when I need to unwind"', explanation: 'Connecting music to life situations makes answers more engaging.' },
        { mistake: 'Claiming to like everything', correction: 'Show genuine preferences with some specificity', explanation: '"I like all music" suggests you can\'t express preferences. Be specific.' },
        { mistake: 'Not mentioning how taste has evolved', correction: 'Show development: "I used to only listen to pop, but now I appreciate..."', explanation: 'Showing evolution demonstrates ability to discuss change over time.' }
      ],
      miniPractice: [
        { question: 'Which phrase best describes varied music taste?', options: ['"I like many types"', '"My taste is quite eclectic"', '"I listen to everything"', '"Music is good"'], type: 'multiple-choice' },
        { question: 'Answer: "Has your taste in music changed over the years?" (2-4 sentences)', type: 'rewrite' },
        { question: 'Which word describes calm, relaxing music?', options: ['Loud', 'Mellow', 'Fast', 'Heavy'], type: 'multiple-choice' },
        { question: 'Complete: "There\'s something about indie rock that really _____ with me."', type: 'fill-blank' }
      ],
      answerKey: [
        '"My taste is quite eclectic"',
        'Sample: "Definitely! When I was younger, I was really into mainstream pop – whatever was on the charts. But as I\'ve gotten older, I\'ve developed more of an appreciation for artists who write their own music and have a distinctive sound. I suppose my taste has become more refined over time."',
        'Mellow',
        'resonates'
      ],
      quickRecap: 'Music Questions Formula: Be specific about genres + Explain why you like certain music + Connect to emotions and situations + Show how taste has evolved. Use descriptive vocabulary (eclectic, mellow, resonates). Avoid just listing genres.',
      collocations: [
        'eclectic taste', 'gravitate towards', 'soft spot for', 'resonates with',
        'soundtrack to my life', 'wind down', 'lifts my mood', 'takes me back',
        'raw and authentic', 'catchy tune', 'mellow music', 'fly by'
      ],
      synonyms: [
        { word: 'like', synonyms: ['be into', 'be fond of', 'have a soft spot for', 'gravitate towards'] },
        { word: 'relaxing', synonyms: ['mellow', 'soothing', 'calming', 'laid-back'] },
        { word: 'exciting', synonyms: ['upbeat', 'energetic', 'lively', 'dynamic'] }
      ],
      speakingLines: [
        'My taste is quite eclectic, actually. I tend to gravitate towards indie rock.',
        'Music is pretty much the soundtrack to my daily life.',
        'There\'s something about the raw, authentic sound that really resonates with me.'
      ]
    }
  },
  // ============================================
  // PART 2: Additional Cue Cards (Place, Object, Event)
  // ============================================
  {
    id: 'speaking-part2-describe-place',
    title: 'Part 2: Describe a Place',
    slug: 'speaking-part2-describe-place',
    type: 'speaking',
    level: 'intermediate',
    topic: 'Part 2 Place',
    description: 'Master place descriptions with vivid vocabulary and structured responses.',
    is_premium: true,
    is_published: true,
    view_count: 3000,
    created_at: '2025-07-04T10:00:00Z',
    updated_at: '2025-07-04T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Part 2: Describe a Place',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Structure a 2-minute place description',
        'Use vivid descriptive vocabulary',
        'Create atmosphere through language',
        'Connect places to personal feelings'
      ],
      coreExplanation: `**Common Place Cue Cards:**
- Describe a place you would like to visit
- Describe a place where you feel relaxed
- Describe a city you have visited
- Describe your favorite room/building

**Part 2 Structure (1 min prep, 2 min talk):**
1. Introduction: What and where is the place
2. Description: Physical features, atmosphere
3. Experience: What you do/did there
4. Feelings: Why it\'s special to you

**Key: Paint a picture with words!**`,
      examples: [
        { sentence: '**Cue Card: Describe a place where you feel relaxed**\n\n**Band 9 Opening:** "I\'d like to talk about a small beach I discovered on the southern coast of my country. It\'s this hidden gem that very few tourists know about, tucked away behind some cliffs about an hour\'s drive from the city."', explanation: '**Why Band 9:** Specific location (southern coast), creates intrigue (hidden gem, few tourists), uses descriptive language (tucked away), provides context (hour\'s drive).' },
        { sentence: '**Band 9 Description:** "What makes it so special is the untouched natural beauty. The sand is this pristine white, and the water is crystal clear – you can see right down to the seabed. There\'s a backdrop of dramatic cliffs covered in lush vegetation, and the whole place has this incredibly serene atmosphere. You can hear nothing but the gentle lapping of waves and the occasional call of seabirds."', explanation: '**Why Band 9:** Vivid sensory details (pristine white, crystal clear, gentle lapping), sophisticated vocabulary (untouched, dramatic, serene, lush), creates atmosphere through description.' },
        { sentence: '**PLACE DESCRIPTION VOCABULARY:**\n\n**Location:**\n- tucked away, nestled, perched on\n- in the heart of, on the outskirts of\n- off the beaten track, hidden gem\n\n**Atmosphere:**\n- serene, tranquil, peaceful\n- bustling, vibrant, lively\n- charming, picturesque, breathtaking\n\n**Sensory details:**\n- the sound of..., the smell of...\n- you can see/hear/feel...\n- there\'s this wonderful sense of...', explanation: 'Great place descriptions engage multiple senses and create atmosphere. Don\'t just list features – make the examiner feel like they\'re there.' }
      ],
      commonMistakes: [
        { mistake: 'Just listing features without atmosphere', correction: 'Create mood: "There\'s this incredibly serene atmosphere"', explanation: 'Lists are boring. Atmosphere makes descriptions come alive.' },
        { mistake: 'Not using sensory details', correction: 'Engage senses: "You can hear the gentle lapping of waves"', explanation: 'Sensory details make descriptions vivid and memorable.' },
        { mistake: 'Forgetting to explain why it\'s special', correction: 'Connect to feelings: "What makes it special to me is..."', explanation: 'Personal connection shows genuine engagement with the topic.' },
        { mistake: 'Running out of things to say', correction: 'Use the structure: Location → Description → Experience → Feelings', explanation: 'Following a structure ensures you have enough content for 2 minutes.' },
        { mistake: 'Using basic adjectives (nice, good, beautiful)', correction: 'Use vivid adjectives: pristine, breathtaking, serene, dramatic', explanation: 'Sophisticated vocabulary demonstrates lexical resource.' }
      ],
      miniPractice: [
        { question: 'Which phrase creates the best atmosphere?', options: ['"It\'s a nice beach"', '"There\'s this incredibly serene atmosphere"', '"The beach is good"', '"I like the beach"'], type: 'multiple-choice' },
        { question: 'Describe a place using sensory details (2-3 sentences)', type: 'rewrite' },
        { question: 'Which phrase means "hidden and hard to find"?', options: ['In the center', 'Off the beaten track', 'Very popular', 'Well-known'], type: 'multiple-choice' },
        { question: 'Complete: "The beach is this hidden _____ that very few tourists know about."', type: 'fill-blank' }
      ],
      answerKey: [
        '"There\'s this incredibly serene atmosphere"',
        'Sample: "You can hear nothing but the gentle lapping of waves against the shore and the occasional call of seabirds overhead. The air carries this wonderful salty freshness, and the warmth of the sun on your skin is incredibly soothing."',
        'Off the beaten track',
        'gem'
      ],
      quickRecap: 'Place Description Formula: Location + Physical description + Atmosphere + Personal feelings. Use vivid vocabulary (pristine, serene, breathtaking). Engage multiple senses (sight, sound, smell). Create mood, don\'t just list features. Connect to personal emotions.',
      collocations: [
        'hidden gem', 'off the beaten track', 'tucked away', 'nestled in',
        'pristine white', 'crystal clear', 'serene atmosphere', 'breathtaking views',
        'lush vegetation', 'gentle lapping', 'dramatic cliffs', 'untouched beauty'
      ],
      synonyms: [
        { word: 'beautiful', synonyms: ['stunning', 'breathtaking', 'picturesque', 'gorgeous'] },
        { word: 'quiet', synonyms: ['serene', 'tranquil', 'peaceful', 'calm'] },
        { word: 'hidden', synonyms: ['tucked away', 'secluded', 'off the beaten track', 'remote'] }
      ],
      speakingLines: [
        'It\'s this hidden gem that very few tourists know about.',
        'The whole place has this incredibly serene atmosphere.',
        'What makes it so special is the untouched natural beauty.'
      ]
    }
  },
  {
    id: 'speaking-part2-describe-object',
    title: 'Part 2: Describe an Object',
    slug: 'speaking-part2-describe-object',
    type: 'speaking',
    level: 'intermediate',
    topic: 'Part 2 Object',
    description: 'Master object descriptions with vocabulary for appearance, function, and sentimental value.',
    is_premium: true,
    is_published: true,
    view_count: 2700,
    created_at: '2025-07-05T10:00:00Z',
    updated_at: '2025-07-05T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Part 2: Describe an Object',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Describe objects with rich vocabulary',
        'Explain function and significance',
        'Connect objects to memories and emotions',
        'Structure a complete 2-minute response'
      ],
      coreExplanation: `**Common Object Cue Cards:**
- Describe something you own that is important to you
- Describe a gift you received
- Describe a piece of technology you use often
- Describe something you would like to buy

**Part 2 Structure:**
1. What it is: Name and basic description
2. Appearance: Physical details
3. Function: What it does/how you use it
4. Significance: Why it matters to you

**Key: Objects often have stories – tell them!**`,
      examples: [
        { sentence: '**Cue Card: Describe something you own that is important to you**\n\n**Band 9 Opening:** "I\'d like to talk about my grandfather\'s vintage watch, which has become one of my most treasured possessions. It\'s a classic mechanical timepiece from the 1960s that he wore throughout his career as a journalist."', explanation: '**Why Band 9:** Specific details (vintage, 1960s, mechanical), emotional connection (treasured possessions), context (grandfather\'s career). Sets up a story.' },
        { sentence: '**Band 9 Description:** "It\'s a beautifully crafted piece with a silver case that\'s developed this wonderful patina over the decades. The face is cream-colored with elegant Roman numerals, and there\'s a small seconds dial at the bottom. What I love is that it\'s entirely mechanical – you have to wind it every day, which feels like a ritual connecting me to the past."', explanation: '**Why Band 9:** Rich descriptive vocabulary (patina, elegant, crafted), specific details (Roman numerals, seconds dial), emotional connection (ritual, connecting to the past).' },
        { sentence: '**OBJECT DESCRIPTION VOCABULARY:**\n\n**Appearance:**\n- sleek, elegant, vintage, modern\n- beautifully crafted, well-worn\n- intricate details, distinctive features\n\n**Materials:**\n- leather, metal, wood, fabric\n- polished, matte, textured\n\n**Significance:**\n- treasured possession, sentimental value\n- irreplaceable, priceless (emotionally)\n- reminds me of, connects me to\n- passed down through generations', explanation: 'Object descriptions should balance physical details with emotional significance. The story behind an object is often more interesting than its appearance.' }
      ],
      commonMistakes: [
        { mistake: 'Only describing appearance without significance', correction: 'Explain why it matters: "What makes it special is the memories attached to it"', explanation: 'Significance makes descriptions personal and engaging.' },
        { mistake: 'Using basic vocabulary (nice, good, pretty)', correction: 'Use specific descriptors: elegant, sleek, vintage, intricate', explanation: 'Sophisticated vocabulary demonstrates lexical resource.' },
        { mistake: 'Not telling the story behind the object', correction: 'Share the history: "My grandfather wore this throughout his career..."', explanation: 'Stories make descriptions memorable and show narrative ability.' },
        { mistake: 'Forgetting to mention how you use it', correction: 'Explain function: "I wind it every morning, which feels like a ritual"', explanation: 'Function adds practical detail and extends your response.' },
        { mistake: 'Running out of content before 2 minutes', correction: 'Use the structure: What → Appearance → Function → Significance', explanation: 'Following a structure ensures comprehensive coverage.' }
      ],
      miniPractice: [
        { question: 'Which phrase best expresses emotional value?', options: ['"It\'s expensive"', '"It has great sentimental value"', '"It costs a lot"', '"It\'s valuable"'], type: 'multiple-choice' },
        { question: 'Describe an object\'s appearance (2-3 sentences)', type: 'rewrite' },
        { question: 'Which word describes something passed down in a family?', options: ['New', 'Modern', 'Heirloom', 'Recent'], type: 'multiple-choice' },
        { question: 'Complete: "It\'s become one of my most _____ possessions."', type: 'fill-blank' }
      ],
      answerKey: [
        '"It has great sentimental value"',
        'Sample: "It\'s a beautifully crafted leather journal with a worn cover that\'s developed this wonderful character over the years. The pages are thick and cream-colored, perfect for fountain pen ink, and there\'s an intricate embossed pattern on the front."',
        'Heirloom',
        'treasured/cherished/prized'
      ],
      quickRecap: 'Object Description Formula: What it is + Appearance (specific details) + Function (how you use it) + Significance (why it matters). Tell the story behind the object. Use rich vocabulary (elegant, vintage, intricate). Connect to emotions and memories.',
      collocations: [
        'treasured possession', 'sentimental value', 'beautifully crafted', 'passed down',
        'family heirloom', 'intricate details', 'distinctive features', 'well-worn',
        'developed character', 'irreplaceable', 'priceless', 'connects me to'
      ],
      synonyms: [
        { word: 'important', synonyms: ['treasured', 'cherished', 'prized', 'valued'] },
        { word: 'old', synonyms: ['vintage', 'antique', 'classic', 'timeless'] },
        { word: 'beautiful', synonyms: ['elegant', 'exquisite', 'stunning', 'gorgeous'] }
      ],
      speakingLines: [
        'It\'s become one of my most treasured possessions.',
        'What I love is that it connects me to my family history.',
        'It\'s beautifully crafted with intricate details that show real craftsmanship.'
      ]
    }
  },
  {
    id: 'speaking-part2-describe-event',
    title: 'Part 2: Describe an Event',
    slug: 'speaking-part2-describe-event',
    type: 'speaking',
    level: 'intermediate',
    topic: 'Part 2 Event',
    description: 'Master event descriptions with narrative techniques and emotional vocabulary.',
    is_premium: true,
    is_published: true,
    view_count: 2800,
    created_at: '2025-07-06T10:00:00Z',
    updated_at: '2025-07-06T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Part 2: Describe an Event',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Structure event narratives effectively',
        'Use past tenses accurately',
        'Create atmosphere and build tension',
        'Express emotions about experiences'
      ],
      coreExplanation: `**Common Event Cue Cards:**
- Describe a memorable celebration
- Describe a sporting event you attended
- Describe a concert or performance you enjoyed
- Describe an important event in your life

**Part 2 Structure:**
1. Setting: When, where, who was there
2. Build-up: What led to the main moment
3. Main event: What happened (details!)
4. Aftermath: How you felt, why it was memorable

**Key: Tell a story with a beginning, middle, and end!**`,
      examples: [
        { sentence: '**Cue Card: Describe a memorable celebration**\n\n**Band 9 Opening:** "I\'d like to talk about my sister\'s surprise 30th birthday party, which we organized last summer. It was held at this beautiful rooftop restaurant overlooking the city, and we\'d been planning it in secret for months."', explanation: '**Why Band 9:** Specific details (30th, rooftop restaurant, last summer), creates intrigue (surprise, secret planning), sets the scene effectively.' },
        { sentence: '**Band 9 Build-up:** "The tricky part was getting her there without raising suspicion. We told her we were just having a quiet family dinner, so when she walked in and saw about fifty of her closest friends and family, the look on her face was absolutely priceless. She was completely overwhelmed – I think she was speechless for a good thirty seconds!"', explanation: '**Why Band 9:** Narrative tension (tricky part, without raising suspicion), vivid description (look on her face, priceless), emotional vocabulary (overwhelmed, speechless), specific details (fifty friends, thirty seconds).' },
        { sentence: '**EVENT NARRATIVE VOCABULARY:**\n\n**Setting the scene:**\n- It took place at / was held at\n- We\'d been planning for months\n- The atmosphere was electric / intimate / festive\n\n**Building tension:**\n- The tricky part was...\n- Little did she know...\n- We were all on edge / holding our breath\n\n**Describing reactions:**\n- The look on her face was priceless\n- She was completely overwhelmed / speechless\n- There wasn\'t a dry eye in the room\n\n**Reflecting:**\n- It\'s a moment I\'ll never forget\n- Looking back, it was...\n- What made it special was...', explanation: 'Good event descriptions have narrative arc. Use vocabulary that creates atmosphere and conveys emotion.' }
      ],
      commonMistakes: [
        { mistake: 'Just listing what happened without atmosphere', correction: 'Create mood: "The atmosphere was electric with anticipation"', explanation: 'Atmosphere makes stories engaging. Don\'t just report facts.' },
        { mistake: 'Not building to a climax', correction: 'Create tension: "Little did she know what was waiting..."', explanation: 'Good stories have build-up. Create anticipation before the main moment.' },
        { mistake: 'Forgetting to describe reactions and emotions', correction: 'Include feelings: "She was completely overwhelmed"', explanation: 'Emotional reactions make stories relatable and memorable.' },
        { mistake: 'Using only simple past tense', correction: 'Mix tenses: "We\'d been planning" (past perfect), "was waiting" (past continuous)', explanation: 'Varied tenses show grammatical range and create better narrative flow.' },
        { mistake: 'Not explaining why it was memorable', correction: 'Reflect: "What made it special was seeing everyone come together"', explanation: 'Reflection shows critical thinking and gives closure to your story.' }
      ],
      miniPractice: [
        { question: 'Which phrase best creates anticipation?', options: ['"Then she arrived"', '"Little did she know what was waiting"', '"She came to the party"', '"The party started"'], type: 'multiple-choice' },
        { question: 'Describe someone\'s reaction to a surprise (2-3 sentences)', type: 'rewrite' },
        { question: 'Which phrase describes an unforgettable moment?', options: ['"It was okay"', '"It\'s a moment I\'ll never forget"', '"It was nice"', '"I remember it"'], type: 'multiple-choice' },
        { question: 'Complete: "The look on her face was absolutely _____."', type: 'fill-blank' }
      ],
      answerKey: [
        '"Little did she know what was waiting"',
        'Sample: "The moment she walked through the door and saw everyone, her jaw literally dropped. She stood frozen for what felt like an eternity, and then burst into tears of joy. I don\'t think I\'ve ever seen her so genuinely surprised and touched."',
        '"It\'s a moment I\'ll never forget"',
        'priceless'
      ],
      quickRecap: 'Event Description Formula: Setting (when, where, who) + Build-up (tension, anticipation) + Main event (details, reactions) + Reflection (why memorable). Use narrative vocabulary (little did she know, priceless). Mix past tenses for variety. Create atmosphere and emotion.',
      collocations: [
        'atmosphere was electric', 'little did she know', 'holding our breath', 'on edge',
        'look on her face', 'absolutely priceless', 'completely overwhelmed', 'burst into tears',
        'moment I\'ll never forget', 'looking back', 'what made it special', 'dry eye in the room'
      ],
      synonyms: [
        { word: 'surprised', synonyms: ['stunned', 'speechless', 'taken aback', 'blown away'] },
        { word: 'happy', synonyms: ['overjoyed', 'thrilled', 'elated', 'ecstatic'] },
        { word: 'memorable', synonyms: ['unforgettable', 'remarkable', 'special', 'significant'] }
      ],
      speakingLines: [
        'The look on her face was absolutely priceless.',
        'It\'s a moment I\'ll never forget.',
        'What made it special was seeing everyone come together for her.'
      ]
    }
  },
  // ============================================
  // PART 3: Additional Discussion Topics
  // ============================================
  {
    id: 'speaking-part3-education',
    title: 'Part 3: Education & Learning',
    slug: 'speaking-part3-education',
    type: 'speaking',
    level: 'advanced',
    topic: 'Part 3 Education',
    description: 'Master education discussions with analytical vocabulary and balanced arguments.',
    is_premium: true,
    is_published: true,
    view_count: 2500,
    created_at: '2025-07-07T10:00:00Z',
    updated_at: '2025-07-07T10:00:00Z',
    estimated_time: 40,
    content: {
      title: 'Part 3: Education & Learning',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Discuss education issues analytically',
        'Compare traditional and modern approaches',
        'Present balanced arguments',
        'Use academic vocabulary naturally'
      ],
      coreExplanation: `**Common Education Questions:**
- How has education changed in recent years?
- What are the advantages of online learning?
- Should education focus more on practical skills?
- How important is higher education for success?

**Part 3 Strategy:**
1. Give your opinion with reasoning
2. Consider multiple perspectives
3. Use specific examples
4. Show awareness of complexity`,
      examples: [
        { sentence: '**Question: How has education changed in recent years?**\n\n**Band 9:** "I think we\'ve witnessed quite a fundamental shift in educational approaches over the past decade or so. There\'s been a move away from rote learning towards more critical thinking and problem-solving skills. Technology has also transformed the landscape – online resources and digital tools have made learning more accessible and personalized. That said, I think there\'s still an ongoing debate about whether these changes have actually improved educational outcomes."', explanation: '**Why Band 9:** Shows awareness of change (fundamental shift), specific examples (rote learning, critical thinking, technology), balanced view (ongoing debate), sophisticated vocabulary (transformed the landscape, educational outcomes).' },
        { sentence: '**Question: Should education focus more on practical skills?**\n\n**Band 9:** "That\'s a nuanced question. On one hand, there\'s a compelling argument that education should better prepare students for the workforce – many graduates struggle to apply theoretical knowledge in practical settings. However, I\'d argue that we shouldn\'t undervalue the importance of foundational academic knowledge. Perhaps the ideal approach is a more integrated curriculum that combines both. Countries like Germany, with their dual education system, seem to have found a good balance."', explanation: '**Why Band 9:** Acknowledges complexity (nuanced question), presents both sides, gives specific example (Germany\'s dual system), proposes solution (integrated curriculum), uses sophisticated language (compelling argument, foundational knowledge).' },
        { sentence: '**EDUCATION VOCABULARY:**\n\n**Approaches:**\n- rote learning vs critical thinking\n- traditional vs progressive education\n- theoretical vs practical knowledge\n- formal vs informal learning\n\n**Changes:**\n- fundamental shift, transformation\n- paradigm change, evolution\n- modernization, digitalization\n\n**Evaluation:**\n- educational outcomes, learning objectives\n- academic achievement, skill development\n- employability, workforce readiness', explanation: 'Education discussions require vocabulary for both traditional and modern approaches, plus terms for evaluating effectiveness.' }
      ],
      commonMistakes: [
        { mistake: 'Taking an extreme position', correction: 'Show nuance: "It\'s a complex issue with valid points on both sides"', explanation: 'Extreme positions suggest inability to think critically.' },
        { mistake: 'Not providing examples', correction: 'Use specific examples: "Countries like Finland have shown that..."', explanation: 'Examples support your arguments and demonstrate knowledge.' },
        { mistake: 'Using only personal experience', correction: 'Discuss broader trends: "Research suggests that..." or "Many experts argue..."', explanation: 'Part 3 requires discussing issues at a societal level, not just personal.' },
        { mistake: 'Repeating the same vocabulary', correction: 'Vary: education → learning, schooling, instruction, pedagogy', explanation: 'Vocabulary range is essential for Band 8-9.' },
        { mistake: 'Not acknowledging counterarguments', correction: 'Show awareness: "Critics might argue that... however..."', explanation: 'Acknowledging other views demonstrates sophisticated thinking.' }
      ],
      miniPractice: [
        { question: 'Which phrase shows nuanced thinking?', options: ['"Education is definitely better now"', '"It\'s a nuanced question with valid points on both sides"', '"Old education was bad"', '"I don\'t know"'], type: 'multiple-choice' },
        { question: 'Answer: "Is online learning as effective as traditional classroom learning?" (3-4 sentences)', type: 'rewrite' },
        { question: 'Which term means "learning by memorization"?', options: ['Critical thinking', 'Rote learning', 'Problem-solving', 'Creative learning'], type: 'multiple-choice' },
        { question: 'Complete: "There\'s been a fundamental _____ in educational approaches."', type: 'fill-blank' }
      ],
      answerKey: [
        '"It\'s a nuanced question with valid points on both sides"',
        'Sample: "I think it depends on the context and the learner. Online learning offers unprecedented flexibility and access to resources from anywhere in the world. However, it may lack the social interaction and immediate feedback that traditional classrooms provide. Perhaps a hybrid model that combines the best of both approaches would be most effective."',
        'Rote learning',
        'shift'
      ],
      quickRecap: 'Education Discussion Formula: Acknowledge complexity + Present multiple perspectives + Use specific examples (countries, research) + Show balanced view. Use academic vocabulary (paradigm shift, educational outcomes). Avoid extreme positions. Discuss at societal level, not just personal.',
      collocations: [
        'fundamental shift', 'rote learning', 'critical thinking', 'educational outcomes',
        'paradigm change', 'workforce readiness', 'skill development', 'integrated curriculum',
        'dual education system', 'foundational knowledge', 'learning objectives', 'academic achievement'
      ],
      synonyms: [
        { word: 'education', synonyms: ['learning', 'schooling', 'instruction', 'pedagogy'] },
        { word: 'change', synonyms: ['shift', 'transformation', 'evolution', 'transition'] },
        { word: 'important', synonyms: ['crucial', 'essential', 'fundamental', 'vital'] }
      ],
      speakingLines: [
        'I think we\'ve witnessed quite a fundamental shift in educational approaches.',
        'It\'s a nuanced question with valid points on both sides.',
        'Perhaps the ideal approach is a more integrated curriculum.'
      ]
    }
  },
  {
    id: 'speaking-part3-environment',
    title: 'Part 3: Environment & Sustainability',
    slug: 'speaking-part3-environment',
    type: 'speaking',
    level: 'advanced',
    topic: 'Part 3 Environment',
    description: 'Master environmental discussions with vocabulary for climate, sustainability, and responsibility.',
    is_premium: true,
    is_published: true,
    view_count: 2400,
    created_at: '2025-07-08T10:00:00Z',
    updated_at: '2025-07-08T10:00:00Z',
    estimated_time: 40,
    content: {
      title: 'Part 3: Environment & Sustainability',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Discuss environmental issues analytically',
        'Use sustainability vocabulary',
        'Balance individual and collective responsibility',
        'Propose realistic solutions'
      ],
      coreExplanation: `**Common Environment Questions:**
- What can individuals do to protect the environment?
- Should governments do more to address climate change?
- Why do some people not care about environmental issues?
- How has awareness of environmental issues changed?

**Part 3 Strategy:**
1. Acknowledge the complexity of environmental issues
2. Discuss both individual and systemic solutions
3. Use specific examples and data where possible
4. Show awareness of different perspectives`,
      examples: [
        { sentence: '**Question: What can individuals do to protect the environment?**\n\n**Band 9:** "While I believe individual actions matter, I think we need to be realistic about their impact. Things like reducing plastic use, choosing sustainable products, and being mindful of energy consumption are all positive steps. However, I\'d argue that the most impactful thing individuals can do is advocate for systemic change – voting for environmentally conscious policies and holding corporations accountable. Individual lifestyle changes alone won\'t solve the climate crisis; we need structural transformation."', explanation: '**Why Band 9:** Balanced view (individual actions matter BUT systemic change needed), specific examples, sophisticated vocabulary (advocate, systemic, structural transformation), shows critical thinking about scale of impact.' },
        { sentence: '**Question: Why do some people not care about environmental issues?**\n\n**Band 9:** "I think there are several factors at play. For some, it\'s a matter of immediacy – environmental degradation often feels like a distant, abstract threat compared to more pressing daily concerns like paying bills. There\'s also the issue of information overload and sometimes conflicting messages, which can lead to apathy or confusion. Additionally, making sustainable choices often requires financial privilege – organic products and electric vehicles aren\'t accessible to everyone. So I think we need to be careful about placing blame on individuals without addressing these systemic barriers."', explanation: '**Why Band 9:** Multiple explanations (immediacy, information overload, financial barriers), empathetic perspective, sophisticated vocabulary (degradation, apathy, systemic barriers), avoids judgmental tone.' },
        { sentence: '**ENVIRONMENT VOCABULARY:**\n\n**Problems:**\n- climate change, global warming\n- environmental degradation, pollution\n- carbon footprint, emissions\n- biodiversity loss, deforestation\n\n**Solutions:**\n- sustainable, renewable, eco-friendly\n- carbon neutral, net zero\n- conservation, preservation\n- systemic change, policy intervention\n\n**Responsibility:**\n- individual vs collective action\n- corporate accountability\n- governmental regulation\n- intergenerational responsibility', explanation: 'Environmental discussions require vocabulary for problems, solutions, and different levels of responsibility.' }
      ],
      commonMistakes: [
        { mistake: 'Being preachy or judgmental', correction: 'Show understanding: "I can see why some people struggle with this..."', explanation: 'Judgmental tone suggests inability to see other perspectives.' },
        { mistake: 'Only discussing individual actions', correction: 'Include systemic solutions: "We also need policy changes and corporate accountability"', explanation: 'Focusing only on individuals ignores the bigger picture.' },
        { mistake: 'Being overly pessimistic or optimistic', correction: 'Be realistic: "While progress has been made, significant challenges remain"', explanation: 'Balanced realism shows mature thinking.' },
        { mistake: 'Using vague language', correction: 'Be specific: "reducing single-use plastics" not just "helping the environment"', explanation: 'Specific examples demonstrate knowledge and vocabulary.' },
        { mistake: 'Ignoring economic considerations', correction: 'Acknowledge trade-offs: "Sustainable options aren\'t always affordable for everyone"', explanation: 'Acknowledging complexity shows sophisticated thinking.' }
      ],
      miniPractice: [
        { question: 'Which answer shows balanced thinking?', options: ['"Everyone should just recycle more"', '"Individual actions matter, but we also need systemic change"', '"It\'s all the government\'s fault"', '"Nothing we do matters"'], type: 'multiple-choice' },
        { question: 'Answer: "Should companies be required to be more environmentally responsible?" (3-4 sentences)', type: 'rewrite' },
        { question: 'Which term means "producing no net carbon emissions"?', options: ['Eco-friendly', 'Carbon neutral', 'Sustainable', 'Green'], type: 'multiple-choice' },
        { question: 'Complete: "We need structural _____ to address the climate crisis."', type: 'fill-blank' }
      ],
      answerKey: [
        '"Individual actions matter, but we also need systemic change"',
        'Sample: "I believe there\'s a strong case for greater corporate environmental responsibility. Companies have a disproportionate impact on emissions and resource use, so it makes sense to hold them accountable. However, regulations need to be carefully designed to avoid simply pushing production to countries with weaker standards. Perhaps a combination of incentives for sustainable practices and penalties for environmental damage would be most effective."',
        'Carbon neutral',
        'transformation/change'
      ],
      quickRecap: 'Environment Discussion Formula: Acknowledge complexity + Balance individual and systemic perspectives + Use specific examples + Show empathy for different viewpoints. Use environmental vocabulary (sustainability, carbon footprint, systemic change). Avoid being preachy. Acknowledge economic realities.',
      collocations: [
        'climate change', 'carbon footprint', 'sustainable development', 'renewable energy',
        'environmental degradation', 'systemic change', 'corporate accountability', 'policy intervention',
        'carbon neutral', 'net zero', 'biodiversity loss', 'intergenerational responsibility'
      ],
      synonyms: [
        { word: 'environment', synonyms: ['natural world', 'ecosystem', 'planet', 'nature'] },
        { word: 'damage', synonyms: ['degradation', 'destruction', 'harm', 'deterioration'] },
        { word: 'protect', synonyms: ['preserve', 'conserve', 'safeguard', 'sustain'] }
      ],
      speakingLines: [
        'Individual actions matter, but we also need systemic change.',
        'We need to be careful about placing blame on individuals without addressing systemic barriers.',
        'The most impactful thing individuals can do is advocate for policy change.'
      ]
    }
  },
  {
    id: 'speaking-part3-technology-impact',
    title: 'Part 3: Technology & Society',
    slug: 'speaking-part3-technology-impact',
    type: 'speaking',
    level: 'advanced',
    topic: 'Part 3 Technology',
    description: 'Master technology discussions with vocabulary for innovation, impact, and ethical considerations.',
    is_premium: true,
    is_published: true,
    view_count: 2600,
    created_at: '2025-07-09T10:00:00Z',
    updated_at: '2025-07-09T10:00:00Z',
    estimated_time: 40,
    content: {
      title: 'Part 3: Technology & Society',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Discuss technology\'s societal impact',
        'Balance benefits and concerns',
        'Use vocabulary for innovation and ethics',
        'Speculate about future developments'
      ],
      coreExplanation: `**Common Technology Questions:**
- How has technology changed the way we communicate?
- What are the dangers of too much technology use?
- Will artificial intelligence replace human workers?
- Should there be more regulation of technology companies?

**Part 3 Strategy:**
1. Acknowledge both benefits and drawbacks
2. Consider different groups affected
3. Use specific examples of technologies
4. Discuss ethical implications`,
      examples: [
        { sentence: '**Question: How has technology changed the way we communicate?**\n\n**Band 9:** "Technology has fundamentally transformed communication in ways that would have seemed like science fiction just a few decades ago. We can now connect instantly with anyone across the globe, share experiences in real-time, and maintain relationships that distance would have made impossible before. However, there\'s a growing concern that this constant connectivity has come at the cost of deeper, more meaningful face-to-face interactions. Many people feel that while we\'re more connected than ever, we\'re paradoxically more isolated."', explanation: '**Why Band 9:** Historical perspective (science fiction, few decades ago), specific benefits (instant connection, real-time sharing), acknowledges concerns (cost of deeper interactions), uses sophisticated vocabulary (fundamentally transformed, paradoxically).' },
        { sentence: '**Question: Will artificial intelligence replace human workers?**\n\n**Band 9:** "This is one of the defining questions of our time. I think the reality will be more nuanced than a simple yes or no. AI will certainly automate many routine tasks, and some jobs will inevitably become obsolete. However, history suggests that technological revolutions also create new types of employment we can\'t yet imagine. The key challenge will be managing the transition – ensuring workers have opportunities to reskill and that the benefits of AI are distributed equitably rather than concentrated among a few."', explanation: '**Why Band 9:** Acknowledges complexity (more nuanced), historical perspective (technological revolutions), specific concerns (reskilling, equitable distribution), sophisticated vocabulary (defining question, obsolete, equitably).' },
        { sentence: '**TECHNOLOGY IMPACT VOCABULARY:**\n\n**Positive impacts:**\n- revolutionized, transformed\n- unprecedented access, democratized\n- enhanced efficiency, streamlined\n\n**Concerns:**\n- digital divide, inequality\n- privacy concerns, data security\n- screen addiction, social isolation\n- job displacement, automation\n\n**Future considerations:**\n- artificial intelligence, machine learning\n- ethical implications, regulation\n- digital literacy, reskilling\n- equitable distribution', explanation: 'Technology discussions require vocabulary for both positive impacts and concerns, plus terms for discussing future implications.' }
      ],
      commonMistakes: [
        { mistake: 'Being entirely positive or negative about technology', correction: 'Show balance: "While technology has brought tremendous benefits, we must also address..."', explanation: 'One-sided views suggest inability to think critically.' },
        { mistake: 'Not considering different groups', correction: 'Discuss varied impacts: "For younger generations... but for older people..."', explanation: 'Technology affects different groups differently. Acknowledge this.' },
        { mistake: 'Ignoring ethical considerations', correction: 'Raise ethical points: "This raises important questions about privacy and consent"', explanation: 'Ethical awareness demonstrates sophisticated thinking.' },
        { mistake: 'Making definitive predictions', correction: 'Use hedging: "It\'s likely that..." or "We might see..."', explanation: 'The future is uncertain. Hedging shows intellectual humility.' },
        { mistake: 'Using outdated examples', correction: 'Use current examples: AI, social media, smartphones, streaming', explanation: 'Current examples show engagement with the topic.' }
      ],
      miniPractice: [
        { question: 'Which phrase shows balanced thinking about technology?', options: ['"Technology is amazing"', '"Technology is destroying society"', '"While technology has brought benefits, we must also address concerns"', '"I love my phone"'], type: 'multiple-choice' },
        { question: 'Answer: "Should social media be more regulated?" (3-4 sentences)', type: 'rewrite' },
        { question: 'Which term describes the gap between those with and without technology access?', options: ['Tech gap', 'Digital divide', 'Internet problem', 'Computer issue'], type: 'multiple-choice' },
        { question: 'Complete: "Technology has _____ transformed how we communicate."', type: 'fill-blank' }
      ],
      answerKey: [
        '"While technology has brought benefits, we must also address concerns"',
        'Sample: "I think there\'s a compelling case for some form of regulation, particularly around data privacy and the spread of misinformation. Social media platforms have enormous influence over public discourse, and with that comes responsibility. However, regulation needs to be carefully balanced to avoid stifling innovation or infringing on free speech. Perhaps a combination of industry self-regulation and government oversight would be most effective."',
        'Digital divide',
        'fundamentally'
      ],
      quickRecap: 'Technology Discussion Formula: Acknowledge both benefits and concerns + Consider different groups affected + Discuss ethical implications + Use hedging for predictions. Use current examples (AI, social media). Avoid extreme positions. Show awareness of complexity.',
      collocations: [
        'fundamentally transformed', 'digital divide', 'privacy concerns', 'data security',
        'artificial intelligence', 'machine learning', 'job displacement', 'reskilling',
        'ethical implications', 'equitable distribution', 'constant connectivity', 'social isolation'
      ],
      synonyms: [
        { word: 'change', synonyms: ['transform', 'revolutionize', 'reshape', 'alter'] },
        { word: 'problem', synonyms: ['concern', 'challenge', 'issue', 'drawback'] },
        { word: 'benefit', synonyms: ['advantage', 'positive impact', 'upside', 'merit'] }
      ],
      speakingLines: [
        'Technology has fundamentally transformed communication.',
        'While we\'re more connected than ever, we\'re paradoxically more isolated.',
        'The key challenge will be ensuring the benefits are distributed equitably.'
      ]
    }
  },
  {
    id: 'speaking-part3-health-lifestyle',
    title: 'Part 3: Health & Lifestyle',
    slug: 'speaking-part3-health-lifestyle',
    type: 'speaking',
    level: 'advanced',
    topic: 'Part 3 Society',
    description: 'Master health discussions with vocabulary for wellbeing, lifestyle choices, and public health.',
    is_premium: true,
    is_published: true,
    view_count: 2300,
    created_at: '2025-07-10T10:00:00Z',
    updated_at: '2025-07-10T10:00:00Z',
    estimated_time: 40,
    content: {
      title: 'Part 3: Health & Lifestyle',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Discuss health issues at societal level',
        'Balance individual and public health perspectives',
        'Use vocabulary for wellbeing and lifestyle',
        'Consider economic and social factors'
      ],
      coreExplanation: `**Common Health Questions:**
- Why are lifestyle diseases increasing?
- Should governments do more to promote healthy living?
- How has awareness of mental health changed?
- Is it the individual\'s responsibility to stay healthy?

**Part 3 Strategy:**
1. Consider both individual and societal factors
2. Acknowledge socioeconomic influences
3. Discuss prevention vs treatment
4. Show awareness of mental as well as physical health`,
      examples: [
        { sentence: '**Question: Why are lifestyle diseases increasing?**\n\n**Band 9:** "I think it\'s a combination of factors that have converged in modern society. Our increasingly sedentary lifestyles, driven by desk jobs and screen-based entertainment, have reduced physical activity dramatically. At the same time, the food industry has made processed, high-calorie foods more accessible and affordable than healthier alternatives. There\'s also the stress factor – modern life can be incredibly demanding, which affects both eating habits and overall wellbeing. It\'s worth noting that these issues disproportionately affect lower-income communities, where healthy options may be less accessible."', explanation: '**Why Band 9:** Multiple factors identified (sedentary lifestyle, food industry, stress), sophisticated vocabulary (converged, disproportionately), acknowledges socioeconomic dimension, shows systemic thinking.' },
        { sentence: '**Question: Is it the individual\'s responsibility to stay healthy?**\n\n**Band 9:** "While personal responsibility certainly plays a role, I think framing health purely as an individual choice overlooks significant structural factors. Yes, people make decisions about diet and exercise, but those choices are heavily influenced by their environment – the availability of healthy food, safe spaces for exercise, working hours, and financial constraints. A single parent working multiple jobs may not have the time or resources to prioritize health in the same way someone with more privilege can. So I\'d argue for a shared responsibility model where governments create conditions that make healthy choices easier."', explanation: '**Why Band 9:** Nuanced view (personal responsibility BUT structural factors), specific examples (single parent, working hours), sophisticated vocabulary (structural factors, shared responsibility model), empathetic perspective.' },
        { sentence: '**HEALTH VOCABULARY:**\n\n**Lifestyle factors:**\n- sedentary lifestyle, physical activity\n- dietary habits, nutrition\n- work-life balance, stress management\n- sleep quality, mental wellbeing\n\n**Health issues:**\n- lifestyle diseases, chronic conditions\n- obesity epidemic, diabetes\n- mental health, anxiety, depression\n- burnout, stress-related illness\n\n**Solutions:**\n- preventive healthcare, early intervention\n- public health campaigns, awareness\n- accessible healthcare, health equity\n- holistic approach, wellbeing', explanation: 'Health discussions require vocabulary for causes, conditions, and solutions, plus awareness of both physical and mental health.' }
      ],
      commonMistakes: [
        { mistake: 'Blaming individuals without acknowledging systemic factors', correction: 'Show awareness: "While personal choices matter, we must also consider structural barriers"', explanation: 'Purely individual blame ignores socioeconomic realities.' },
        { mistake: 'Focusing only on physical health', correction: 'Include mental health: "This affects both physical and mental wellbeing"', explanation: 'Modern health discussions must include mental health.' },
        { mistake: 'Ignoring socioeconomic factors', correction: 'Acknowledge inequality: "These issues disproportionately affect lower-income communities"', explanation: 'Health outcomes are strongly linked to socioeconomic status.' },
        { mistake: 'Being preachy about healthy lifestyle', correction: 'Show empathy: "Not everyone has the same opportunities to make healthy choices"', explanation: 'Preachy tone suggests lack of understanding of real-world constraints.' },
        { mistake: 'Oversimplifying solutions', correction: 'Acknowledge complexity: "There\'s no single solution; we need a multi-faceted approach"', explanation: 'Health issues are complex and require nuanced solutions.' }
      ],
      miniPractice: [
        { question: 'Which answer shows awareness of structural factors?', options: ['"People should just eat better"', '"Health choices are influenced by environment, income, and access to resources"', '"It\'s everyone\'s own fault"', '"Exercise more"'], type: 'multiple-choice' },
        { question: 'Answer: "Should governments tax unhealthy foods?" (3-4 sentences)', type: 'rewrite' },
        { question: 'Which term describes diseases caused by lifestyle choices?', options: ['Infectious diseases', 'Lifestyle diseases', 'Genetic diseases', 'Acute diseases'], type: 'multiple-choice' },
        { question: 'Complete: "These issues _____ affect lower-income communities."', type: 'fill-blank' }
      ],
      answerKey: [
        '"Health choices are influenced by environment, income, and access to resources"',
        'Sample: "There\'s certainly an argument for using taxation to discourage unhealthy consumption, similar to tobacco taxes. However, such measures can be regressive, disproportionately affecting lower-income families. Perhaps a more effective approach would be combining modest taxes with subsidies for healthy foods, making nutritious options more affordable rather than just making unhealthy ones more expensive."',
        'Lifestyle diseases',
        'disproportionately'
      ],
      quickRecap: 'Health Discussion Formula: Balance individual and structural factors + Include both physical and mental health + Acknowledge socioeconomic influences + Show empathy for different circumstances. Use health vocabulary (sedentary, preventive, holistic). Avoid blaming individuals. Discuss systemic solutions.',
      collocations: [
        'sedentary lifestyle', 'lifestyle diseases', 'mental wellbeing', 'work-life balance',
        'preventive healthcare', 'public health', 'health equity', 'holistic approach',
        'chronic conditions', 'stress management', 'dietary habits', 'disproportionately affect'
      ],
      synonyms: [
        { word: 'health', synonyms: ['wellbeing', 'wellness', 'fitness', 'condition'] },
        { word: 'unhealthy', synonyms: ['detrimental', 'harmful', 'damaging', 'adverse'] },
        { word: 'improve', synonyms: ['enhance', 'promote', 'boost', 'strengthen'] }
      ],
      speakingLines: [
        'I think it\'s a combination of factors that have converged in modern society.',
        'Framing health purely as an individual choice overlooks significant structural factors.',
        'I\'d argue for a shared responsibility model.'
      ]
    }
  },
  {
    id: 'speaking-part3-culture-traditions',
    title: 'Part 3: Culture & Traditions',
    slug: 'speaking-part3-culture-traditions',
    type: 'speaking',
    level: 'advanced',
    topic: 'Part 3 Society',
    description: 'Master cultural discussions with vocabulary for traditions, globalization, and identity.',
    is_premium: true,
    is_published: true,
    view_count: 2200,
    created_at: '2025-07-11T10:00:00Z',
    updated_at: '2025-07-11T10:00:00Z',
    estimated_time: 40,
    content: {
      title: 'Part 3: Culture & Traditions',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Discuss cultural change and preservation',
        'Balance tradition and modernization',
        'Use vocabulary for identity and heritage',
        'Consider globalization\'s impact'
      ],
      coreExplanation: `**Common Culture Questions:**
- Are traditional customs disappearing?
- How has globalization affected local cultures?
- Should traditions be preserved even if outdated?
- What role does culture play in identity?

**Part 3 Strategy:**
1. Acknowledge both preservation and evolution
2. Consider generational perspectives
3. Discuss globalization\'s dual impact
4. Show respect for different viewpoints`,
      examples: [
        { sentence: '**Question: Are traditional customs disappearing?**\n\n**Band 9:** "I think it\'s more accurate to say that traditions are evolving rather than simply disappearing. Some customs have certainly declined as lifestyles have changed – fewer people may observe traditional festivals in the same way their grandparents did. However, I\'ve also noticed a growing interest among younger generations in reconnecting with their cultural heritage, often in adapted forms. For instance, traditional crafts are being revived through social media, reaching audiences that wouldn\'t have encountered them otherwise. So it\'s a more complex picture than simple decline."', explanation: '**Why Band 9:** Nuanced view (evolving not disappearing), specific examples (festivals, social media crafts), generational perspective, sophisticated vocabulary (reconnecting with heritage, adapted forms).' },
        { sentence: '**Question: How has globalization affected local cultures?**\n\n**Band 9:** "Globalization has had a dual impact on local cultures. On one hand, there\'s legitimate concern about cultural homogenization – the spread of global brands and Western media can overshadow local traditions and languages. On the other hand, globalization has also created platforms for cultural exchange and preservation. Indigenous artists can now share their work globally, and diaspora communities can maintain connections to their heritage more easily. I think the key is finding a balance – embracing beneficial exchanges while actively protecting what makes each culture unique."', explanation: '**Why Band 9:** Balanced view (dual impact), specific concerns (homogenization, Western media), positive aspects (platforms for exchange), sophisticated vocabulary (cultural homogenization, diaspora), proposes balanced approach.' },
        { sentence: '**CULTURE VOCABULARY:**\n\n**Traditions:**\n- cultural heritage, ancestral customs\n- traditional practices, rituals\n- passed down through generations\n- deeply rooted in history\n\n**Change:**\n- cultural evolution, adaptation\n- modernization, westernization\n- cultural homogenization, globalization\n- erosion of traditions\n\n**Preservation:**\n- cultural preservation, heritage protection\n- reviving traditions, cultural renaissance\n- maintaining identity, roots\n- intangible cultural heritage', explanation: 'Cultural discussions require vocabulary for both change and preservation, plus terms for discussing identity and globalization.' }
      ],
      commonMistakes: [
        { mistake: 'Romanticizing the past', correction: 'Be balanced: "While some traditions are valuable, others may need to evolve"', explanation: 'Not all traditions are positive. Some may be outdated or harmful.' },
        { mistake: 'Dismissing traditions as irrelevant', correction: 'Show respect: "Traditions often carry important cultural meaning and identity"', explanation: 'Dismissing traditions shows lack of cultural sensitivity.' },
        { mistake: 'Seeing globalization as purely negative', correction: 'Acknowledge benefits: "Globalization also enables cultural exchange and preservation"', explanation: 'Globalization has both positive and negative cultural impacts.' },
        { mistake: 'Ignoring generational differences', correction: 'Consider perspectives: "Younger generations may engage with traditions differently"', explanation: 'Different generations have different relationships with tradition.' },
        { mistake: 'Making sweeping generalizations', correction: 'Be specific: "In my country..." or "Some communities..."', explanation: 'Cultural experiences vary widely. Avoid overgeneralizing.' }
      ],
      miniPractice: [
        { question: 'Which view shows nuanced thinking about traditions?', options: ['"All traditions should be preserved"', '"Traditions are outdated"', '"Traditions are evolving rather than simply disappearing"', '"I don\'t care about traditions"'], type: 'multiple-choice' },
        { question: 'Answer: "Should schools teach traditional culture?" (3-4 sentences)', type: 'rewrite' },
        { question: 'Which term describes cultures becoming more similar globally?', options: ['Cultural diversity', 'Cultural homogenization', 'Cultural preservation', 'Cultural identity'], type: 'multiple-choice' },
        { question: 'Complete: "Globalization has had a _____ impact on local cultures."', type: 'fill-blank' }
      ],
      answerKey: [
        '"Traditions are evolving rather than simply disappearing"',
        'Sample: "I believe schools have an important role in transmitting cultural knowledge to younger generations. Understanding one\'s cultural heritage can provide a sense of identity and belonging. However, this should be done in a way that encourages critical thinking rather than blind adherence – students should learn about traditions while also understanding how cultures evolve. Perhaps the focus should be on cultural literacy rather than just preservation."',
        'Cultural homogenization',
        'dual'
      ],
      quickRecap: 'Culture Discussion Formula: Acknowledge both preservation and evolution + Consider generational perspectives + Discuss globalization\'s dual impact + Show respect for different viewpoints. Use cultural vocabulary (heritage, homogenization, diaspora). Avoid romanticizing or dismissing traditions. Be specific about examples.',
      collocations: [
        'cultural heritage', 'ancestral customs', 'passed down', 'deeply rooted',
        'cultural homogenization', 'cultural exchange', 'diaspora communities', 'cultural identity',
        'intangible heritage', 'cultural renaissance', 'erosion of traditions', 'maintaining roots'
      ],
      synonyms: [
        { word: 'tradition', synonyms: ['custom', 'practice', 'heritage', 'ritual'] },
        { word: 'preserve', synonyms: ['maintain', 'protect', 'safeguard', 'conserve'] },
        { word: 'change', synonyms: ['evolve', 'adapt', 'transform', 'shift'] }
      ],
      speakingLines: [
        'I think traditions are evolving rather than simply disappearing.',
        'Globalization has had a dual impact on local cultures.',
        'The key is finding a balance between embracing change and protecting what makes each culture unique.'
      ]
    }
  },
  {
    id: 'speaking-part1-weather',
    title: 'Part 1: Weather & Seasons',
    slug: 'speaking-part1-weather',
    type: 'speaking',
    level: 'beginner',
    topic: 'Part 1 Weather',
    description: 'Master weather questions with vocabulary for climate, seasons, and preferences.',
    is_premium: true,
    is_published: true,
    view_count: 2100,
    created_at: '2025-07-12T10:00:00Z',
    updated_at: '2025-07-12T10:00:00Z',
    estimated_time: 25,
    content: {
      title: 'Part 1: Weather & Seasons',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Describe weather with varied vocabulary',
        'Express preferences about seasons',
        'Discuss how weather affects activities',
        'Use natural expressions for weather talk'
      ],
      coreExplanation: `**Common Weather Questions:**
- What's the weather like in your country?
- What's your favorite season?
- Does weather affect your mood?
- Do you prefer hot or cold weather?
- Has the weather in your country changed?

**Strategy:**
1. Use descriptive vocabulary beyond "hot" and "cold"
2. Connect weather to activities and feelings
3. Show awareness of climate patterns
4. Express genuine preferences with reasons`,
      examples: [
        { sentence: '**Question: What\'s the weather like in your country?**\n\n**Band 6:** "In my country, the weather is hot in summer and cold in winter. Sometimes it rains."\n\n**Band 9:** "We have quite a varied climate, actually. Summers can be scorching – temperatures often hit 35 degrees or more – while winters are relatively mild but quite damp. Spring is probably the most pleasant time, with comfortable temperatures and everything coming into bloom. The weather can be quite unpredictable though; you might get all four seasons in a single day!"', explanation: '**What Changed:** Band 9 uses specific vocabulary (scorching, mild, damp), provides details (35 degrees), adds personality (unpredictable, four seasons in a day), and shows genuine knowledge of local climate.' },
        { sentence: '**Question: What\'s your favorite season?**\n\n**Band 6:** "My favorite season is autumn. The weather is nice. I like the colors."\n\n**Band 9:** "I\'d have to say autumn is my favorite. There\'s something magical about watching the leaves change color – all those golden and russet tones. The temperature is perfect too – crisp but not cold, ideal for long walks. Plus, I love the cozy atmosphere as the evenings draw in earlier."', explanation: '**What Changed:** Band 9 uses evocative vocabulary (magical, golden, russet, crisp, cozy), explains multiple reasons, and creates atmosphere (evenings draw in). Shows genuine enthusiasm.' },
        { sentence: '**WEATHER VOCABULARY:**\n\n**Temperature:**\n- scorching, sweltering, humid (hot)\n- mild, pleasant, comfortable\n- chilly, crisp, freezing, bitter (cold)\n\n**Conditions:**\n- overcast, gloomy, drizzly\n- bright, sunny, clear\n- unpredictable, changeable\n\n**Expressions:**\n- the weather\'s been lovely/awful lately\n- we\'ve been having a heatwave/cold snap\n- it\'s absolutely pouring / bucketing down\n- the sun\'s finally come out', explanation: 'Weather is a common conversation topic. Having varied vocabulary makes you sound natural and fluent.' }
      ],
      commonMistakes: [
        { mistake: 'Only using "hot" and "cold"', correction: 'Use varied vocabulary: scorching, mild, chilly, crisp, humid', explanation: 'Limited vocabulary suggests low lexical resource.' },
        { mistake: 'Not connecting weather to feelings or activities', correction: 'Explain impact: "I love autumn because it\'s perfect for hiking"', explanation: 'Connecting weather to life makes answers more personal and developed.' },
        { mistake: 'Giving very short answers', correction: 'Develop with details: describe what makes the season special', explanation: 'Weather questions are opportunities to show descriptive vocabulary.' },
        { mistake: 'Being too literal about weather', correction: 'Add personality: "You might get all four seasons in a single day!"', explanation: 'Humor and personality make answers engaging.' },
        { mistake: 'Not mentioning seasonal changes', correction: 'Describe transitions: "As autumn approaches, the leaves start to turn..."', explanation: 'Discussing change shows ability to describe processes.' }
      ],
      miniPractice: [
        { question: 'Which word best describes extremely hot weather?', options: ['Hot', 'Warm', 'Scorching', 'Nice'], type: 'multiple-choice' },
        { question: 'Answer: "Does weather affect your mood?" (2-4 sentences)', type: 'rewrite' },
        { question: 'Which expression describes heavy rain?', options: ['"It\'s raining"', '"It\'s absolutely pouring"', '"There is rain"', '"Rain is falling"'], type: 'multiple-choice' },
        { question: 'Complete: "The temperature is _____ but not cold, ideal for long walks."', type: 'fill-blank' }
      ],
      answerKey: [
        'Scorching',
        'Sample: "Definitely! I find I\'m much more energetic and motivated when the sun\'s out. Grey, overcast days can make me feel a bit sluggish, to be honest. That\'s probably why I love spring so much – the longer days and brighter weather really lift my spirits."',
        '"It\'s absolutely pouring"',
        'crisp'
      ],
      quickRecap: 'Weather Questions Formula: Use varied vocabulary (scorching, crisp, mild) + Connect to feelings and activities + Show personality and humor + Describe seasonal changes. Avoid just "hot" and "cold". Make weather talk interesting with specific details.',
      collocations: [
        'scorching heat', 'bitter cold', 'crisp autumn', 'mild weather',
        'overcast skies', 'pouring rain', 'heatwave', 'cold snap',
        'draw in', 'come into bloom', 'change color', 'lift my spirits'
      ],
      synonyms: [
        { word: 'hot', synonyms: ['scorching', 'sweltering', 'boiling', 'humid'] },
        { word: 'cold', synonyms: ['chilly', 'freezing', 'bitter', 'crisp'] },
        { word: 'rainy', synonyms: ['wet', 'drizzly', 'damp', 'showery'] }
      ],
      speakingLines: [
        'We have quite a varied climate, actually.',
        'There\'s something magical about watching the leaves change color.',
        'The weather can be quite unpredictable – you might get all four seasons in a single day!'
      ]
    }
  },
  {
    id: 'speaking-part2-describe-book-movie',
    title: 'Part 2: Describe a Book or Movie',
    slug: 'speaking-part2-describe-book-movie',
    type: 'speaking',
    level: 'intermediate',
    topic: 'Part 2 Experience',
    description: 'Master book and movie descriptions with vocabulary for plot, characters, and impact.',
    is_premium: true,
    is_published: true,
    view_count: 2900,
    created_at: '2025-07-13T10:00:00Z',
    updated_at: '2025-07-13T10:00:00Z',
    estimated_time: 35,
    content: {
      title: 'Part 2: Describe a Book or Movie',
      targetLevel: 'Band 6.0 - 9.0',
      whatYouWillLearn: [
        'Structure book/movie descriptions effectively',
        'Describe plot without spoilers',
        'Discuss themes and characters',
        'Explain personal impact and recommendations'
      ],
      coreExplanation: `**Common Book/Movie Cue Cards:**
- Describe a book you enjoyed reading
- Describe a movie that made you think
- Describe a film you would recommend
- Describe a book that influenced you

**Part 2 Structure:**
1. Introduction: Title, genre, when you read/watched it
2. Plot overview: Brief summary (no spoilers!)
3. What made it special: Characters, themes, style
4. Personal impact: Why it affected you

**Key: Show genuine engagement, not just plot summary!**`,
      examples: [
        { sentence: '**Cue Card: Describe a book you enjoyed reading**\n\n**Band 9 Opening:** "I\'d like to talk about \'The Kite Runner\' by Khaled Hosseini, which I read a few years ago and has stayed with me ever since. It\'s a literary fiction novel set primarily in Afghanistan, spanning several decades from the 1970s to the early 2000s."', explanation: '**Why Band 9:** Specific details (author, setting, time period), shows lasting impact (stayed with me), uses appropriate genre terminology (literary fiction).' },
        { sentence: '**Band 9 Plot Overview:** "Without giving too much away, it follows the story of Amir, a young boy from Kabul, and his complex relationship with Hassan, the son of his family\'s servant. A traumatic event in their childhood sets off a chain of events that spans decades and continents. It\'s essentially a story about guilt, redemption, and the bonds of friendship."', explanation: '**Why Band 9:** Avoids spoilers (without giving too much away), identifies themes (guilt, redemption, friendship), provides enough context without retelling the whole plot.' },
        { sentence: '**Band 9 Personal Impact:** "What really struck me was how the author weaves together personal drama with historical events – you learn so much about Afghan history and culture while being completely absorbed in the characters\' lives. The writing is incredibly evocative; I could almost feel the dust of Kabul\'s streets. It made me reflect on my own relationships and the importance of facing up to past mistakes. I\'ve recommended it to countless friends since."', explanation: '**Why Band 9:** Explains specific appeal (personal drama with history), uses sophisticated vocabulary (evocative, absorbed), connects to personal reflection, shows genuine enthusiasm (recommended to friends).' },
        { sentence: '**BOOK/MOVIE VOCABULARY:**\n\n**Genre & Style:**\n- literary fiction, thriller, documentary\n- thought-provoking, gripping, heartwarming\n- beautifully written, visually stunning\n\n**Plot & Characters:**\n- protagonist, antagonist, supporting characters\n- plot twist, climax, resolution\n- character development, narrative arc\n\n**Impact:**\n- stayed with me, left a lasting impression\n- made me reflect on, changed my perspective\n- couldn\'t put it down, was completely absorbed', explanation: 'Book/movie descriptions require vocabulary for both technical aspects (plot, characters) and personal response (impact, emotions).' }
      ],
      commonMistakes: [
        { mistake: 'Retelling the entire plot', correction: 'Give a brief overview and focus on themes and impact', explanation: 'Plot summaries are boring. Focus on what made it special.' },
        { mistake: 'Giving away spoilers', correction: 'Use phrases like "without giving too much away" and focus on setup, not resolution', explanation: 'Spoilers show poor judgment. Describe the premise, not the ending.' },
        { mistake: 'Not explaining personal connection', correction: 'Explain why it affected you: "It made me reflect on..."', explanation: 'Personal connection shows genuine engagement and extends your answer.' },
        { mistake: 'Using basic vocabulary', correction: 'Use sophisticated terms: "thought-provoking" not "interesting", "gripping" not "exciting"', explanation: 'Sophisticated vocabulary demonstrates lexical resource.' },
        { mistake: 'Forgetting to mention themes', correction: 'Identify themes: "It\'s essentially a story about redemption and forgiveness"', explanation: 'Discussing themes shows analytical thinking.' }
      ],
      miniPractice: [
        { question: 'Which phrase avoids spoilers?', options: ['"In the end, the hero dies"', '"Without giving too much away, it\'s about redemption"', '"The twist is that..."', '"The ending is..."'], type: 'multiple-choice' },
        { question: 'Describe a movie\'s impact on you (2-3 sentences)', type: 'rewrite' },
        { question: 'Which word describes a book you can\'t stop reading?', options: ['Nice', 'Good', 'Gripping', 'Okay'], type: 'multiple-choice' },
        { question: 'Complete: "The story has _____ with me ever since I read it."', type: 'fill-blank' }
      ],
      answerKey: [
        '"Without giving too much away, it\'s about redemption"',
        'Sample: "What really struck me was how the film challenged my assumptions about success and happiness. It made me reflect on what truly matters in life – relationships and experiences rather than material possessions. I found myself thinking about it for days afterward."',
        'Gripping',
        'stayed'
      ],
      quickRecap: 'Book/Movie Description Formula: Introduction (title, genre, when) + Brief plot overview (no spoilers!) + What made it special (themes, style, characters) + Personal impact (how it affected you). Use sophisticated vocabulary (gripping, thought-provoking, evocative). Focus on impact, not plot summary.',
      collocations: [
        'stayed with me', 'left a lasting impression', 'couldn\'t put it down', 'completely absorbed',
        'thought-provoking', 'beautifully written', 'visually stunning', 'character development',
        'plot twist', 'narrative arc', 'made me reflect', 'changed my perspective'
      ],
      synonyms: [
        { word: 'interesting', synonyms: ['thought-provoking', 'compelling', 'engaging', 'fascinating'] },
        { word: 'exciting', synonyms: ['gripping', 'thrilling', 'riveting', 'edge-of-your-seat'] },
        { word: 'good', synonyms: ['outstanding', 'exceptional', 'remarkable', 'brilliant'] }
      ],
      speakingLines: [
        'It\'s stayed with me ever since I read it.',
        'Without giving too much away, it\'s essentially a story about redemption.',
        'What really struck me was how the author weaves together personal drama with historical events.'
      ]
    }
  }
];

export const SPEAKING_TOPICS = [
  'Part 1 Work & Study',
  'Part 1 Hometown',
  'Part 1 Hobbies',
  'Part 1 Daily Routine',
  'Part 1 Food',
  'Part 1 Weather',
  'Part 1 Technology',
  'Part 1 Music',
  'Part 2 Cue Card',
  'Part 2 Person',
  'Part 2 Place',
  'Part 2 Object',
  'Part 2 Experience',
  'Part 2 Event',
  'Part 3 Discussion',
  'Part 3 Society',
  'Part 3 Education',
  'Part 3 Technology',
  'Part 3 Environment',
  'Part 3 Future'
];
