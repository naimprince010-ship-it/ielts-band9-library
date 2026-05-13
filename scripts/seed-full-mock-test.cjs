const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...rest] = trimmed.split('=');
    const value = rest.join('=').replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.join(process.cwd(), '.env.local'));

const now = Date.now();
const theme = 'Digital Learning and Community Well-being';
const slug = `digital-learning-community-wellbeing-${now}`;

function choiceQuestion(questionNumber, questionText, options, correctAnswer, explanation) {
  return {
    id: `q-${slug}-${questionNumber}`,
    questionNumber,
    type: 'multiple-choice',
    questionText,
    options,
    correctAnswer,
    explanation,
  };
}

function inputQuestion(questionNumber, questionText, correctAnswer, explanation, type = 'short-answer') {
  return {
    id: `q-${slug}-${questionNumber}`,
    questionNumber,
    type,
    questionText,
    correctAnswer,
    acceptedAnswers: [correctAnswer],
    explanation,
  };
}

function readingPassage(passageNumber, title, textContent, start, questions) {
  return {
    id: `reading-passage-${slug}-${passageNumber}`,
    passageNumber,
    title,
    textContent,
    questions,
    questionRange: { start, end: start + questions.length - 1 },
  };
}

function listeningSection(sectionNumber, title, transcript, start, questions) {
  return {
    id: `listening-section-${slug}-${sectionNumber}`,
    sectionNumber,
    title,
    transcript,
    sectionAudioUrl: '',
    audioStartTime: 0,
    audioEndTime: 0,
    questions,
    questionRange: { start, end: start + questions.length - 1 },
  };
}

const readingPassage1 = `In the last decade, many schools and colleges have adopted blended learning, a model that combines classroom teaching with digital resources. Supporters argue that this approach gives students more control over the pace of study. A learner who finds a topic difficult can revisit recorded explanations, while a confident learner can move quickly to extension activities. Teachers also gain access to data on attendance, quiz performance and assignment completion, which can help them identify students who are falling behind before examination results reveal the problem.

However, the success of blended learning depends heavily on design. Merely placing lecture slides online does not create an effective digital course. Students need clear instructions, regular feedback and opportunities to interact with classmates. Without these features, online tasks may feel disconnected from classroom work. Research from several universities suggests that completion rates improve when digital activities are short, purposeful and directly linked to lessons held on campus.

Access is another important issue. Although many students own smartphones, not all have quiet study spaces, reliable internet or devices suitable for writing long assignments. Institutions that assume universal access may unintentionally widen existing inequalities. Some colleges have responded by lending laptops, keeping computer rooms open in the evening and designing materials that can be downloaded for offline use. These practical measures can make digital learning more inclusive.

The most convincing evidence shows that technology works best when it supports, rather than replaces, human teaching. Students still value explanations from teachers, encouragement from peers and the structure of a shared timetable. In this sense, blended learning should not be understood as a cheaper substitute for education, but as a flexible system that requires careful planning and continuous support.`;

const readingPassage2 = `Urban planners have become increasingly interested in the relationship between public spaces and community well-being. Parks, libraries, sports centres and pedestrian streets are no longer seen as decorative extras; they are now treated as social infrastructure. These places provide opportunities for informal contact between neighbours, which can reduce isolation and strengthen trust. In areas where residents often live in small apartments, shared spaces may be especially important.

The quality of a public space matters as much as its presence. A poorly lit park may be avoided after dark, and a library with limited opening hours may serve only a narrow group of users. Successful spaces usually combine safety, accessibility and a clear purpose. For example, a public square that hosts weekend markets, exercise classes and cultural events can attract people of different ages and backgrounds. This variety helps prevent the space from being dominated by a single group.

Measuring the benefits of social infrastructure is difficult because outcomes are not always immediate. A new sports centre may not reduce health costs in its first year, and a library programme may influence educational achievement only gradually. Nevertheless, long-term studies suggest that neighbourhoods with strong public facilities often experience higher civic participation and lower levels of loneliness. These effects are particularly valuable in cities where rapid growth can weaken traditional support networks.

There are also risks. Improvements to public space can raise nearby property values, making the area less affordable for existing residents. Planners therefore need to connect community investment with housing protection and local consultation. When residents are involved in decisions about design and programming, public spaces are more likely to reflect local needs rather than outside assumptions.`;

const readingPassage3 = `The growth of artificial intelligence has created new possibilities for personalised education. Adaptive learning systems can analyse a student's answers and recommend practice based on individual weaknesses. In language learning, such systems may identify recurring grammar errors, suggest vocabulary exercises and provide instant feedback on pronunciation. For students preparing for high-stakes examinations, the promise of immediate guidance is attractive.

Yet AI feedback has limitations. A system may recognise that an essay uses complex vocabulary, but fail to judge whether ideas are genuinely persuasive or relevant. It may also reward formulaic writing if the training data contains many similar examples. Teachers therefore warn that students should use automated feedback as a starting point, not as a final authority. Human judgement remains essential for evaluating argument, tone and originality.

Privacy is another concern. Educational platforms collect large amounts of data, including response times, written work and sometimes voice recordings. If this information is stored insecurely or used for purposes beyond learning, students may be exposed to unnecessary risk. Institutions adopting AI tools need transparent policies on data storage, deletion and consent. They must also explain when students are interacting with a machine rather than a human assessor.

Despite these concerns, many educators believe AI can play a constructive role if it is introduced carefully. It can reduce repetitive marking, provide extra practice outside class and help teachers spot patterns across a cohort. The challenge is to keep educational goals at the centre. Technology should make learning more thoughtful and accessible, not simply faster or more automated.`;

const readingQuestions = [
  [
    choiceQuestion(1, 'What is one claimed advantage of blended learning?', ['It removes the need for teachers', 'It lets students control study pace', 'It eliminates exams', 'It reduces all course costs'], 'It lets students control study pace', 'The passage states that students can revisit or move ahead at their own pace.'),
    inputQuestion(2, 'Which teacher resource can reveal students who may be falling behind?', 'data', 'The passage mentions data on attendance, quizzes and assignments.'),
    inputQuestion(3, 'Online activities should be short, purposeful and linked to what?', 'campus lessons', 'The passage says completion improves when digital activities connect to campus lessons.'),
    choiceQuestion(4, 'Why can digital learning widen inequality?', ['Some students lack reliable access', 'Teachers dislike technology', 'Courses become too short', 'Exams become easier'], 'Some students lack reliable access', 'The access paragraph discusses internet, devices and study space.'),
    inputQuestion(5, 'Name one practical measure colleges use to support access.', 'lending laptops', 'Laptop lending is one example given in the passage.'),
    choiceQuestion(6, 'The writer says technology works best when it:', ['replaces classroom teaching', 'supports human teaching', 'removes timetables', 'reduces interaction'], 'supports human teaching', 'The final paragraph says technology supports rather than replaces teaching.'),
    inputQuestion(7, 'Students still value explanations from whom?', 'teachers', 'The passage directly mentions explanations from teachers.'),
    choiceQuestion(8, 'Blended learning is described as requiring:', ['careful planning and support', 'less assessment', 'no classroom contact', 'only recorded lectures'], 'careful planning and support', 'The final sentence says it needs planning and continuous support.'),
    inputQuestion(9, 'What kind of materials can help students with poor internet?', 'downloaded materials', 'The passage mentions materials that can be downloaded for offline use.'),
    inputQuestion(10, 'What may online tasks feel like without interaction and feedback?', 'disconnected', 'The passage says tasks may feel disconnected from classroom work.'),
    choiceQuestion(11, 'According to the text, lecture slides online are:', ['not enough by themselves', 'always effective', 'better than seminars', 'a complete course'], 'not enough by themselves', 'The writer says simply placing slides online is insufficient.'),
    inputQuestion(12, 'What do teachers use quiz performance data to identify?', 'students falling behind', 'The first paragraph explains this use.'),
    inputQuestion(13, 'The best digital system should be flexible and supported by what?', 'human teaching', 'The final paragraph emphasises human teaching.'),
  ],
  [
    choiceQuestion(14, 'Public spaces are now often described as:', ['social infrastructure', 'private investment', 'temporary decoration', 'transport networks'], 'social infrastructure', 'The first paragraph uses this term.'),
    inputQuestion(15, 'Shared spaces can reduce what social problem?', 'isolation', 'The passage says informal contact can reduce isolation.'),
    choiceQuestion(16, 'What can make a park less usable after dark?', ['poor lighting', 'too many trees', 'free events', 'weekend markets'], 'poor lighting', 'The passage mentions a poorly lit park.'),
    inputQuestion(17, 'A public square may attract different groups by hosting markets, exercise classes and what?', 'cultural events', 'These are the three examples listed.'),
    choiceQuestion(18, 'Why is measuring social infrastructure difficult?', ['Benefits may appear slowly', 'No one uses public spaces', 'Costs are always hidden', 'Cities lack libraries'], 'Benefits may appear slowly', 'The passage says outcomes are not always immediate.'),
    inputQuestion(19, 'Long-term studies connect public facilities with higher what?', 'civic participation', 'The passage says higher civic participation is one outcome.'),
    inputQuestion(20, 'What can rapid urban growth weaken?', 'traditional support networks', 'This phrase appears in paragraph three.'),
    choiceQuestion(21, 'What risk can public-space improvement create?', ['higher nearby property values', 'lower safety standards', 'fewer cultural events', 'less consultation'], 'higher nearby property values', 'The final paragraph identifies this risk.'),
    inputQuestion(22, 'Community investment should be connected with housing protection and what?', 'local consultation', 'The final paragraph names local consultation.'),
    choiceQuestion(23, 'When residents join design decisions, spaces are more likely to:', ['reflect local needs', 'exclude older people', 'cost less automatically', 'become private'], 'reflect local needs', 'The last sentence states this.'),
    inputQuestion(24, 'What type of streets are included as public spaces?', 'pedestrian streets', 'The first paragraph lists pedestrian streets.'),
    inputQuestion(25, 'A successful public space needs safety, accessibility and a clear what?', 'purpose', 'The second paragraph states this combination.'),
    choiceQuestion(26, 'The passage mainly argues that public spaces:', ['can support community well-being', 'should be removed from cities', 'matter only for tourists', 'must always be privately managed'], 'can support community well-being', 'This is the central idea of the passage.'),
  ],
  [
    choiceQuestion(27, 'Adaptive systems recommend practice based on:', ['individual weaknesses', 'teacher salaries', 'school buildings', 'random topics'], 'individual weaknesses', 'The first paragraph explains adaptive learning.'),
    inputQuestion(28, 'AI may give instant feedback on pronunciation in what field?', 'language learning', 'The passage refers to language learning.'),
    choiceQuestion(29, 'What may AI fail to judge in an essay?', ['whether ideas are persuasive', 'the number of words', 'spelling errors', 'submission time'], 'whether ideas are persuasive', 'The second paragraph says AI may not judge persuasive relevance.'),
    inputQuestion(30, 'Teachers say automated feedback should be used as a starting point, not a final what?', 'authority', 'The phrase appears in paragraph two.'),
    inputQuestion(31, 'What remains essential for evaluating originality?', 'human judgement', 'The second paragraph states this.'),
    choiceQuestion(32, 'Which privacy issue is mentioned?', ['large amounts of student data are collected', 'students never write essays', 'teachers cannot access platforms', 'schools stop using passwords'], 'large amounts of student data are collected', 'The third paragraph discusses collected data.'),
    inputQuestion(33, 'Institutions need policies on data storage, deletion and what?', 'consent', 'The privacy paragraph lists these policies.'),
    choiceQuestion(34, 'Students should be told when they are interacting with:', ['a machine', 'a textbook', 'a parent', 'a library'], 'a machine', 'The passage says institutions must explain machine interaction.'),
    inputQuestion(35, 'AI can reduce repetitive what?', 'marking', 'The final paragraph says AI can reduce repetitive marking.'),
    inputQuestion(36, 'AI may help teachers spot patterns across a what?', 'cohort', 'The final paragraph uses this term.'),
    choiceQuestion(37, 'The main challenge is to keep what at the centre?', ['educational goals', 'software speed', 'company profits', 'device sales'], 'educational goals', 'The last paragraph states this challenge.'),
    inputQuestion(38, 'Technology should make learning thoughtful and what?', 'accessible', 'The final sentence says thoughtful and accessible.'),
    choiceQuestion(39, 'A risk of AI feedback is that it may reward:', ['formulaic writing', 'spoken discussion', 'original ideas', 'teacher comments'], 'formulaic writing', 'The second paragraph gives this concern.'),
    inputQuestion(40, 'What kind of recordings may platforms collect?', 'voice recordings', 'The privacy paragraph includes voice recordings.'),
  ],
];

const listeningTranscripts = [
  'You will hear a conversation between a student and a community centre receptionist. The student is asking about a digital skills workshop. The receptionist explains that the workshop begins on Monday 12 June at 6:30 in Room 4. Participants should bring a laptop if possible, but the centre can lend devices. The fee is fifteen pounds, reduced to ten pounds for students. The tutor is Ms Carter, and the final session includes help with online job applications.',
  'You will hear a guide talking to new volunteers at a neighbourhood library. The guide explains that volunteers first meet at the main desk, store bags in the staff room, and collect blue name badges. Morning duties include shelving returned books and helping visitors use the catalogue tablets. Volunteers must not give legal or medical advice. The cafe is closed on Tuesdays, and the emergency exit is beside the children section.',
  'You will hear two university students discussing a presentation about public spaces. They decide to focus on libraries, parks and sports centres. Maya will research health benefits, while Daniel will prepare statistics on loneliness. They agree that the presentation needs a local case study and a short graph showing park use by age group. Their tutor advised them to avoid too much theory and include interview comments from residents.',
  'You will hear part of a lecture about artificial intelligence in education. The lecturer explains that adaptive platforms can provide rapid feedback, but they depend on high-quality data. Automated systems are useful for grammar practice and vocabulary revision, yet they are weaker at assessing argument quality. The lecturer warns that privacy policies must be clear, especially when essays or voice recordings are stored. Teachers should use AI reports to guide support, not to replace professional judgement.',
];

const listeningQuestionData = [
  ['Monday 12 June', '6:30', 'Room 4', 'laptop', 'fifteen pounds', 'ten pounds', 'Ms Carter', 'online job applications', 'students', 'centre'],
  ['main desk', 'staff room', 'blue name badges', 'shelving returned books', 'catalogue tablets', 'legal', 'medical', 'Tuesdays', 'children section', 'emergency exit'],
  ['libraries', 'health benefits', 'Daniel', 'loneliness', 'local case study', 'park use', 'age group', 'too much theory', 'interview comments', 'residents'],
  ['rapid feedback', 'high-quality data', 'grammar practice', 'vocabulary revision', 'argument quality', 'privacy policies', 'voice recordings', 'AI reports', 'professional judgement', 'teachers'],
];

const listeningSections = listeningQuestionData.map((answers, sectionIndex) => {
  const sectionNumber = sectionIndex + 1;
  const start = sectionIndex * 10 + 1;
  const questions = answers.map((answer, index) => {
    const number = start + index;
    if (index === 2 || index === 5) {
      return choiceQuestion(
        number,
        `Choose the correct detail from Listening Part ${sectionNumber}.`,
        [answer, 'online survey', 'main entrance', 'printed timetable'],
        answer,
        `The transcript for Part ${sectionNumber} gives this detail.`
      );
    }
    return inputQuestion(number, `Complete the note for Listening Part ${sectionNumber}.`, answer, `The answer is stated in Part ${sectionNumber}.`);
  });
  return listeningSection(sectionNumber, `Part ${sectionNumber}: ${['Workshop Enquiry', 'Library Volunteering', 'Presentation Planning', 'AI in Education Lecture'][sectionIndex]}`, listeningTranscripts[sectionIndex], start, questions);
});

const readingTest = {
  id: `reading-${slug}`,
  title: `IELTS Academic Reading Full Test - ${theme}`,
  testType: 'academic',
  totalQuestions: 40,
  timeLimit: 3600,
  instructions: 'Read the three passages and answer questions 1-40.',
  passages: [
    readingPassage(1, 'Designing Blended Learning', readingPassage1, 1, readingQuestions[0]),
    readingPassage(2, 'Public Spaces and Community Well-being', readingPassage2, 14, readingQuestions[1]),
    readingPassage(3, 'Artificial Intelligence as a Learning Assistant', readingPassage3, 27, readingQuestions[2]),
  ],
};

const listeningTest = {
  id: `listening-${slug}`,
  title: `IELTS Listening Full Test - ${theme}`,
  totalQuestions: 40,
  audioUrl: '',
  audioDuration: 1800,
  transferTime: 600,
  instructions: 'Listen to each part and answer questions 1-40.',
  sections: listeningSections,
};

const writingTest = {
  id: `writing-${slug}`,
  title: `IELTS Academic Writing Full Test - ${theme}`,
  testType: 'academic',
  timeLimit: 3600,
  instructions: 'Complete both writing tasks.',
  tasks: [
    {
      id: `writing-task-1-${slug}`,
      taskNumber: 1,
      taskType: 'task1',
      title: 'Task 1: Participation in Online Learning',
      prompt: 'The chart shows the percentage of adults in four age groups who took part in online learning between 2018 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      chartData: {
        type: 'line',
        title: 'Adults participating in online learning',
        labels: ['2018', '2020', '2022', '2024'],
        unit: '%',
        datasets: [
          { label: '18-24', data: [48, 57, 66, 74] },
          { label: '25-34', data: [38, 46, 55, 63] },
          { label: '35-49', data: [24, 31, 39, 47] },
          { label: '50+', data: [10, 15, 21, 29] },
        ],
      },
      minWords: 150,
      recommendedTime: 20,
      sampleAnswer: 'The line chart compares participation in online learning among four adult age groups from 2018 to 2024. Overall, all groups recorded growth, and younger adults remained the most active participants throughout the period. The 18-24 group rose from 48 percent in 2018 to 74 percent in 2024, while the 25-34 group increased from 38 percent to 63 percent. Participation among adults aged 35-49 almost doubled, climbing from 24 percent to 47 percent. The oldest group started from the lowest base, at only 10 percent, but reached 29 percent by 2024. Although the gap between the youngest and oldest groups remained large, the figures suggest that online learning became more common across all age categories.',
    },
    {
      id: `writing-task-2-${slug}`,
      taskNumber: 2,
      taskType: 'task2',
      title: 'Task 2: Digital Education',
      prompt: 'Some people believe that digital learning platforms can provide education as effectively as traditional classrooms. Others think face-to-face teaching is still essential. Discuss both views and give your own opinion.',
      minWords: 250,
      recommendedTime: 40,
      sampleAnswer: 'Digital learning platforms have changed education by making lessons more flexible and widely available. Supporters argue that online systems allow students to study at their own pace, review difficult material and access courses that may not be offered locally. These advantages are especially valuable for working adults, rural learners and students who need extra practice outside school hours. Digital platforms can also provide instant quizzes and feedback, helping learners identify weaknesses quickly. However, traditional classrooms continue to offer benefits that technology cannot fully replace. Face-to-face teaching allows teachers to notice confusion, adjust explanations and build motivation through personal interaction. Classrooms also give students opportunities to cooperate, debate and develop communication skills. In my view, the strongest approach is a blended model. Technology should expand access and support independent study, while teachers should guide discussion, evaluate complex work and provide emotional support. Used together, digital platforms and classroom teaching can create a more effective and inclusive learning experience than either method alone.',
    },
  ],
};

const speakingTest = {
  id: `speaking-${slug}`,
  title: `IELTS Speaking Full Test - ${theme}`,
  instructions: 'Answer the examiner questions naturally and in detail.',
  parts: [
    {
      id: `speaking-part-1-${slug}`,
      partNumber: 1,
      partType: 'part1',
      title: 'Part 1: Study and Technology',
      instructions: 'Answer short questions about familiar topics.',
      questions: [
        'Do you prefer studying online or in a classroom?',
        'What digital device do you use most often for learning?',
        'Did you use computers much when you were a child?',
        'How do people in your country usually learn new skills?',
      ].map((text, index) => ({ id: `sp1-${slug}-${index + 1}`, questionNumber: index + 1, text, thinkTime: 5, recordTime: 30 })),
    },
    {
      id: `speaking-part-2-${slug}`,
      partNumber: 2,
      partType: 'part2',
      title: 'Part 2: A Useful Learning Experience',
      instructions: 'You have one minute to prepare. Speak for up to two minutes.',
      cueCard: {
        id: `cue-${slug}`,
        topic: 'Describe a time when technology helped you learn something useful.',
        bulletPoints: [
          'what you learned',
          'what technology you used',
          'why it was helpful',
          'and explain how this experience affected you',
        ],
        prepTime: 60,
        recordTime: 120,
      },
    },
    {
      id: `speaking-part-3-${slug}`,
      partNumber: 3,
      partType: 'part3',
      title: 'Part 3: Education and Society',
      instructions: 'Answer more abstract questions related to the topic.',
      questions: [
        'How has technology changed education in recent years?',
        'Do you think online learning can reduce inequality?',
        'What skills should teachers have in the future?',
        'Should governments invest more in public libraries and learning centres?',
      ].map((text, index) => ({ id: `sp3-${slug}-${index + 1}`, questionNumber: index + 1, text, thinkTime: 5, recordTime: 60 })),
    },
  ],
};

const rows = [
  { title: `Mock Test: ${theme} - Reading`, module_type: 'reading', test_data: readingTest, is_published: true, is_premium: false },
  { title: `Mock Test: ${theme} - Listening`, module_type: 'listening', test_data: listeningTest, is_published: true, is_premium: false },
  { title: `Mock Test: ${theme} - Writing`, module_type: 'writing', test_data: writingTest, is_published: true, is_premium: false },
  { title: `Mock Test: ${theme} - Speaking`, module_type: 'speaking', test_data: speakingTest, is_published: true, is_premium: false },
];

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL/VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY.');
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: existing, error: existingError } = await supabase
    .from('mock_tests')
    .select('id,module_type,title')
    .ilike('title', `%${theme}%`);

  if (existingError) throw existingError;
  if (existing?.length) {
    console.log(`Found ${existing.length} existing rows for "${theme}". Skipping insert.`);
    console.table(existing);
    return;
  }

  const { data, error } = await supabase
    .from('mock_tests')
    .insert(rows)
    .select('id,module_type,title,is_published');

  if (error) throw error;
  console.log(`Inserted ${data.length} full mock test rows.`);
  console.table(data);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
