import { Lesson } from '@/types';

// Speaking Practice Lessons with Band 9 Model Answers
// Each lesson includes: Questions, Model Answers, Band Comparison, Fluency Toolkit, Expansion Techniques

export const SPEAKING_LESSONS: Lesson[] = [
  // ============================================
  // PART 1: Introduction & Interview
  // ============================================
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
  }
];

export const SPEAKING_TOPICS = [
  'Part 1 Work & Study',
  'Part 1 Hometown',
  'Part 1 Hobbies',
  'Part 1 Daily Routine',
  'Part 2 Cue Card',
  'Part 2 Person',
  'Part 2 Place',
  'Part 2 Experience',
  'Part 3 Discussion',
  'Part 3 Society',
  'Part 3 Future'
];
