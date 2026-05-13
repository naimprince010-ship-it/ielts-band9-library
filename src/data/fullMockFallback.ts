type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking';

type MockTestSeed = {
  id: string;
  title: string;
  module_type: ModuleType;
  test_data: Record<string, unknown>;
};

const theme = 'Urban Green Spaces and Healthy Cities';

function inputQuestion(questionNumber: number, questionText: string, correctAnswer: string) {
  return {
    id: `q-${questionNumber}`,
    questionNumber,
    type: 'fill-blank',
    questionText,
    correctAnswer,
    wordLimit: 3,
  };
}

function choiceQuestion(questionNumber: number, questionText: string, options: string[], correctAnswer: string) {
  return {
    id: `q-${questionNumber}`,
    questionNumber,
    type: 'mcq',
    questionText,
    options,
    correctAnswer,
  };
}

function readingPassage(passageNumber: number, title: string, textContent: string, start: number, answers: string[]) {
  const questions = answers.map((answer, index) => {
    const questionNumber = start + index;
    if (index % 4 === 0) {
      return choiceQuestion(
        questionNumber,
        `According to Passage ${passageNumber}, which option best matches question ${questionNumber}?`,
        [answer, 'industrial expansion', 'private car ownership', 'short-term tourism'],
        answer
      );
    }
    if (index % 4 === 1) {
      return choiceQuestion(
        questionNumber,
        `Passage ${passageNumber} suggests this statement is true, false, or not given: item ${questionNumber}.`,
        ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer
      );
    }
    return inputQuestion(questionNumber, `Complete the note for Passage ${passageNumber}: answer ${questionNumber}.`, answer);
  });

  return {
    id: `reading-passage-${passageNumber}`,
    passageNumber,
    title,
    textContent,
    questions,
    questionRange: { start, end: start + answers.length - 1 },
  };
}

function listeningSection(sectionNumber: number, title: string, transcript: string, start: number, answers: string[]) {
  const questions = answers.map((answer, index) => {
    const questionNumber = start + index;
    if (index === 2 || index === 6) {
      return choiceQuestion(
        questionNumber,
        `Choose the correct answer for question ${questionNumber}.`,
        [answer, 'library card', 'parking permit', 'weekly ticket'],
        answer
      );
    }
    return inputQuestion(questionNumber, `Complete the listening note for question ${questionNumber}.`, answer);
  });

  return {
    id: `listening-section-${sectionNumber}`,
    sectionNumber,
    title,
    description: title,
    transcript,
    audioStartTime: (sectionNumber - 1) * 420,
    audioEndTime: sectionNumber * 420,
    questions,
    questionRange: { start, end: start + answers.length - 1 },
  };
}

const readingText = [
  `Urban planners once treated parks as pleasant extras, but recent research has shifted that view. In dense cities, green spaces now function as health infrastructure. Tree cover lowers surface temperature, filters pollutants, and gives residents a place to walk without entering traffic-heavy streets. The change is especially important in neighbourhoods where private gardens are rare and public recreation is limited. When parks are well connected to homes, schools, and transport stops, they become part of daily routines rather than occasional destinations.`,
  `The social value of green space is equally significant. Community gardens and small pocket parks create informal meeting points where people from different age groups can interact. This matters because loneliness and weak social ties are associated with poorer mental health. However, access is not simply a matter of counting hectares. A large park on the edge of a city may serve fewer people than several smaller spaces distributed through residential streets. Safety, lighting, shade, seating, and maintenance all influence whether people actually use the space.`,
  `Cities also face practical trade-offs. Land is expensive, and local authorities must balance housing, transport, business activity, and environmental goals. Some councils have adopted green roofs, schoolyard sharing, and temporary street closures as flexible solutions. These measures cannot replace major parks, but they can add greenery where permanent land conversion is difficult. The most successful programmes measure outcomes over time, including temperature reduction, physical activity, biodiversity, and residents' satisfaction.`,
  `Critics warn that attractive parks can raise nearby rents, pushing out the communities they were designed to help. This process, sometimes called green gentrification, shows why environmental planning must be linked with housing policy. Cities that protect affordable homes while improving public space are more likely to deliver fair benefits. In short, urban greenery is not just decoration. It is a public system that works best when health, climate, transport, and equity are planned together.`,
].join('\n\n');

export const FULL_MOCK_FALLBACK_TESTS: Record<ModuleType, MockTestSeed> = {
  listening: {
    id: 'fallback-listening-urban-green-spaces',
    title: `Mock Test: ${theme} - Listening`,
    module_type: 'listening',
    test_data: {
      id: 'fallback-listening-urban-green-spaces',
      title: `IELTS Listening Full Test - ${theme}`,
      totalQuestions: 40,
      audioUrl: '',
      audioDuration: 1680,
      transferTime: 600,
      instructions: 'Listen to each section and answer questions 1-40.',
      is_premium: false,
      sections: [
        listeningSection(1, 'Section 1: Park Volunteer Registration', 'A resident calls the city parks office to register for a Saturday volunteer event. The officer asks for the caller name, contact number, preferred site, equipment needs, start time, and emergency contact details.', 1, ['Mason', 'Riverside Park', 'gloves', '8:30', 'water bottle', 'north gate', 'bus 14', 'Lena', 'first aid', 'email']),
        listeningSection(2, 'Section 2: Guided Tour of a City Garden', 'A guide explains the layout of a restored city garden. Visitors hear about the entrance, native plant beds, a children area, the cafe, the pond, bird-watching points, and rules for group bookings.', 11, ['main entrance', 'native plants', 'pond', 'cafe', 'children area', 'booking desk', 'binoculars', 'southern path', 'ten pounds', 'weekends']),
        listeningSection(3, 'Section 3: Student Research Discussion', 'Two students discuss a project on urban green spaces. They compare survey methods, interview samples, temperature data, literature reviews, and how to present limitations in their report.', 21, ['survey', 'temperature', 'interviews', 'sample size', 'literature review', 'pilot study', 'shade', 'older residents', 'bar chart', 'limitations']),
        listeningSection(4, 'Section 4: Lecture on Healthy Cities', 'A lecturer describes how green infrastructure affects public health. The lecture covers air quality, heat islands, walking behaviour, biodiversity, flood control, funding models, and long-term evaluation.', 31, ['air quality', 'heat islands', 'walking', 'biodiversity', 'flood control', 'funding', 'maintenance', 'equity', 'satellite data', 'health outcomes']),
      ],
    },
  },
  reading: {
    id: 'fallback-reading-urban-green-spaces',
    title: `Mock Test: ${theme} - Reading`,
    module_type: 'reading',
    test_data: {
      id: 'fallback-reading-urban-green-spaces',
      title: `IELTS Academic Reading Full Test - ${theme}`,
      testType: 'academic',
      totalQuestions: 40,
      timeLimit: 3600,
      instructions: 'Read the three passages and answer questions 1-40.',
      is_premium: false,
      passages: [
        readingPassage(1, 'Parks as Public Health Infrastructure', readingText, 1, ['health infrastructure', 'TRUE', 'surface temperature', 'daily routines', 'public recreation', 'FALSE', 'lighting', 'maintenance', 'smaller spaces', 'social ties', 'NOT GIVEN', 'shade', 'residential streets']),
        readingPassage(2, 'Designing Green Space in Dense Districts', readingText, 14, ['green roofs', 'TRUE', 'schoolyard sharing', 'temporary closures', 'housing', 'FALSE', 'biodiversity', 'satisfaction', 'flexible solutions', 'transport', 'NOT GIVEN', 'temperature reduction', 'major parks']),
        readingPassage(3, 'Equity and the Risk of Green Gentrification', readingText, 27, ['green gentrification', 'TRUE', 'affordable homes', 'housing policy', 'public system', 'FALSE', 'climate', 'equity', 'nearby rents', 'local authorities', 'NOT GIVEN', 'fair benefits', 'planned together', 'decoration']),
      ],
    },
  },
  writing: {
    id: 'fallback-writing-urban-green-spaces',
    title: `Mock Test: ${theme} - Writing`,
    module_type: 'writing',
    test_data: {
      id: 'fallback-writing-urban-green-spaces',
      title: `IELTS Academic Writing Full Test - ${theme}`,
      testType: 'academic',
      timeLimit: 3600,
      instructions: 'Complete both writing tasks.',
      is_premium: false,
      tasks: [
        {
          id: 'fallback-writing-task-1',
          taskNumber: 1,
          taskType: 'task1',
          title: 'Task 1: Urban Park Use',
          prompt: 'The chart shows the percentage of residents using public green spaces weekly in four cities between 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
          chartData: {
            type: 'line',
            title: 'Weekly Use of Public Green Spaces',
            labels: ['2010', '2015', '2020', '2025'],
            unit: '%',
            datasets: [
              { label: 'Metro A', data: [42, 48, 56, 68] },
              { label: 'Metro B', data: [35, 39, 47, 59] },
              { label: 'Metro C', data: [28, 33, 41, 52] },
              { label: 'Metro D', data: [50, 53, 55, 61] },
            ],
          },
          minWords: 150,
          recommendedTime: 20,
          sampleAnswer: 'The line chart compares weekly use of public green spaces in four cities from 2010 to 2025. Overall, all four cities experienced growth, with Metro A showing the sharpest rise and ending with the highest figure. Metro D began as the leader at 50 percent in 2010, but its increase was gradual, reaching 61 percent by 2025. Metro A climbed from 42 percent to 68 percent, overtaking the others. Metro B and Metro C also rose steadily, although Metro C remained the lowest throughout the period. By 2025, the gap between the highest and lowest cities had narrowed slightly, suggesting broader engagement with public parks across the urban sample.',
        },
        {
          id: 'fallback-writing-task-2',
          taskNumber: 2,
          taskType: 'task2',
          title: 'Task 2: Public Spending',
          prompt: 'Some people believe city governments should spend more money on parks and green spaces, while others think housing and transport should be the priority. Discuss both views and give your own opinion.',
          minWords: 250,
          recommendedTime: 40,
          sampleAnswer: 'Urban governments must make difficult decisions about limited budgets, and both sides of this debate have strong arguments. Housing and transport are essential because they affect people every day. If rents are unaffordable or public transport is unreliable, residents may struggle to work, study, and maintain a basic standard of living. For this reason, it is understandable that many people see these services as the most urgent priorities. However, parks and green spaces should not be treated as optional luxuries. They support physical exercise, reduce heat, improve air quality, and provide social spaces for families, children, and older residents. In dense cities, these benefits can be especially important for people who do not have private gardens. My view is that city governments should integrate green space into housing and transport planning rather than treating it as a separate expense. New housing areas should include accessible parks, and transport routes should connect communities to safe public spaces. This balanced approach would improve health and quality of life without ignoring basic infrastructure needs.',
        },
      ],
    },
  },
  speaking: {
    id: 'fallback-speaking-urban-green-spaces',
    title: `Mock Test: ${theme} - Speaking`,
    module_type: 'speaking',
    test_data: {
      id: 'fallback-speaking-urban-green-spaces',
      title: `IELTS Speaking Full Test - ${theme}`,
      instructions: 'Answer the examiner questions naturally and in detail.',
      is_premium: false,
      parts: [
        {
          id: 'fallback-speaking-part-1',
          partNumber: 1,
          partType: 'part1',
          title: 'Part 1: Parks and Daily Life',
          instructions: 'Answer short questions about familiar topics.',
          questions: ['Do you often visit parks?', 'What outdoor places are popular in your city?', 'Did you spend much time outside when you were a child?', 'Do you prefer walking alone or with other people?'].map((text, index) => ({
            id: `sp-1-${index + 1}`,
            questionNumber: index + 1,
            text,
            thinkTime: 5,
            recordTime: 45,
          })),
        },
        {
          id: 'fallback-speaking-part-2',
          partNumber: 2,
          partType: 'part2',
          title: 'Part 2: Cue Card',
          instructions: 'You have one minute to prepare and up to two minutes to speak.',
          cueCard: {
            id: 'fallback-cue-card',
            topic: 'Describe a public place in your city that you enjoy visiting.',
            bulletPoints: ['where it is', 'what people do there', 'how often you go there', 'and explain why you like this place'],
            prepTime: 60,
            recordTime: 120,
          },
        },
        {
          id: 'fallback-speaking-part-3',
          partNumber: 3,
          partType: 'part3',
          title: 'Part 3: Cities and Public Space',
          instructions: 'Answer more abstract questions related to the topic.',
          questions: ['Why are public spaces important in modern cities?', 'Should private companies help maintain parks?', 'How can cities make outdoor areas safer?', 'Do you think urban life will become greener in the future?'].map((text, index) => ({
            id: `sp-3-${index + 1}`,
            questionNumber: index + 1,
            text,
            thinkTime: 5,
            recordTime: 60,
          })),
        },
      ],
    },
  },
};
