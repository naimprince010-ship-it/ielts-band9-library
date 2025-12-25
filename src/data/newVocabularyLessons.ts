import { Lesson } from '@/types';

// New vocabulary lessons to be added to SAMPLE_LESSONS
export const NEW_VOCABULARY_LESSONS: Lesson[] = [
  // Topic-based: Health (2 lessons)
  {
    id: 'vocab-health-1',
    title: 'Health & Wellbeing: Medical Vocabulary',
    slug: 'health-wellbeing-medical-vocabulary',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Health',
    description: 'Essential medical and health vocabulary for discussing healthcare systems, diseases, and treatments in IELTS.',
    is_premium: false,
    is_published: true,
    view_count: 980,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
    content: {
      title: 'Health & Wellbeing: Medical Vocabulary',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Master 25 essential health and medical terms for IELTS',
        'Discuss healthcare systems and public health issues',
        'Use medical vocabulary naturally in Writing Task 2 and Speaking'
      ],
      coreExplanation: `Health topics frequently appear in IELTS, especially in Writing Task 2 and Speaking Part 3. To achieve Band 7+, you need vocabulary that goes beyond basic words like "sick" and "doctor."

This lesson introduces precise medical and health vocabulary that demonstrates your ability to discuss complex health issues. The key is using these terms accurately and naturally - avoid overusing technical jargon that sounds unnatural.`,
      examples: [
        { sentence: 'Preventive healthcare is more cost-effective than treating diseases after they develop.', explanation: '"Preventive" means designed to prevent disease - key concept in health discussions.' },
        { sentence: 'The pandemic exposed vulnerabilities in many healthcare systems worldwide.', explanation: '"Vulnerabilities" means weaknesses; "pandemic" is a disease outbreak affecting multiple countries.' },
        { sentence: 'Chronic diseases such as diabetes require long-term management.', explanation: '"Chronic" means persistent or long-lasting, opposite of "acute".' },
        { sentence: 'Mental health awareness has increased significantly in recent years.', explanation: '"Mental health" relates to psychological wellbeing - increasingly important topic.' },
        { sentence: 'The government allocated additional funding to improve healthcare infrastructure.', explanation: '"Allocated" means distributed resources; "infrastructure" is the basic facilities.' },
        { sentence: 'Early diagnosis can significantly improve treatment outcomes.', explanation: '"Diagnosis" is identifying a disease; "outcomes" are results of treatment.' },
        { sentence: 'Vaccination programs have successfully eradicated several diseases.', explanation: '"Eradicated" means completely eliminated - stronger than "reduced".' },
        { sentence: 'Access to quality healthcare remains unequal across different regions.', explanation: '"Access to" is a key collocation meaning the ability to obtain.' },
        { sentence: 'Lifestyle factors such as diet and exercise influence overall health.', explanation: '"Lifestyle factors" are daily habits that affect health.' },
        { sentence: 'The aging population poses challenges for healthcare provision.', explanation: '"Aging population" refers to increasing proportion of elderly people.' },
        { sentence: 'Telemedicine has emerged as a viable alternative to traditional consultations.', explanation: '"Telemedicine" is remote healthcare using technology; "viable" means practical.' },
        { sentence: 'Public health campaigns aim to raise awareness about disease prevention.', explanation: '"Public health campaigns" are organized efforts to improve community health.' },
        { sentence: 'The mortality rate has declined due to medical advancements.', explanation: '"Mortality rate" is the death rate; "advancements" are improvements.' },
        { sentence: 'Healthcare professionals face increasing workload and burnout.', explanation: '"Healthcare professionals" is more formal than "doctors"; "burnout" is exhaustion.' },
        { sentence: 'Pharmaceutical companies invest heavily in research and development.', explanation: '"Pharmaceutical" relates to drugs and medicines; "R&D" is research and development.' },
        { sentence: 'Obesity has reached epidemic proportions in many developed countries.', explanation: '"Epidemic proportions" means widespread occurrence affecting many people.' },
        { sentence: 'Palliative care focuses on improving quality of life for terminally ill patients.', explanation: '"Palliative care" is treatment to relieve symptoms, not cure disease.' },
        { sentence: 'Health insurance coverage varies significantly between countries.', explanation: '"Coverage" means the extent of protection provided by insurance.' },
        { sentence: 'Antimicrobial resistance threatens the effectiveness of existing treatments.', explanation: '"Antimicrobial resistance" is when bacteria become resistant to antibiotics.' },
        { sentence: 'Holistic approaches consider physical, mental, and social wellbeing.', explanation: '"Holistic" means considering the whole person, not just symptoms.' }
      ],
      commonMistakes: [
        { mistake: 'People should go to hospital when they are sick.', correction: 'People should seek medical attention when they experience symptoms.', explanation: 'Use "seek medical attention" for formal writing; "experience symptoms" is more precise.' },
        { mistake: 'Doctors should cure all diseases.', correction: 'Healthcare professionals should focus on both treatment and prevention.', explanation: '"Cure" is too absolute; "treatment and prevention" is more realistic.' },
        { mistake: 'Many people die from sickness.', correction: 'Many people succumb to chronic diseases / preventable illnesses.', explanation: '"Die from sickness" is too vague; be specific about disease types.' },
        { mistake: 'The health system is bad.', correction: 'The healthcare system faces significant challenges / has notable deficiencies.', explanation: 'Avoid "bad" - use specific, academic language.' },
        { mistake: 'Medicine is very expensive.', correction: 'Healthcare costs / Medical treatment can be prohibitively expensive.', explanation: '"Medicine" is ambiguous; specify "healthcare costs" or "medical treatment".' }
      ],
      miniPractice: [
        { question: 'The government should invest more in _____ healthcare to reduce long-term costs.', type: 'fill-blank' },
        { question: 'Which term describes diseases that persist over a long period?', options: ['chronic', 'acute', 'terminal', 'infectious'], type: 'multiple-choice' },
        { question: 'Rewrite: "Many people are getting fat and it\'s a big problem."', type: 'rewrite' },
        { question: 'Early _____ of diseases can significantly improve survival rates.', type: 'fill-blank' },
        { question: 'Which collocation is correct?', options: ['mental health awareness', 'mental health consciousness', 'mental health knowledge', 'mental health understanding'], type: 'multiple-choice' }
      ],
      answerKey: [
        'preventive',
        'chronic',
        'Obesity has reached epidemic proportions and poses significant public health challenges.',
        'diagnosis / detection',
        'mental health awareness'
      ],
      quickRecap: 'Key terms: "preventive healthcare", "chronic diseases", "mental health", "healthcare infrastructure", "diagnosis", "mortality rate". Remember: "seek medical attention" not "go to hospital", "healthcare system" not "health system". Use these to discuss health issues sophisticatedly!',
      collocations: [
        'preventive healthcare', 'chronic diseases', 'mental health awareness', 'healthcare infrastructure',
        'early diagnosis', 'treatment outcomes', 'access to healthcare', 'public health campaigns',
        'mortality rate', 'healthcare professionals', 'epidemic proportions', 'quality of life'
      ],
      synonyms: [
        { word: 'sick', synonyms: ['ill', 'unwell', 'afflicted', 'suffering from'] },
        { word: 'doctor', synonyms: ['physician', 'healthcare professional', 'medical practitioner', 'clinician'] },
        { word: 'cure', synonyms: ['treat', 'remedy', 'heal', 'alleviate'] }
      ],
      speakingLines: [
        'I believe that preventive healthcare should be prioritized over treating diseases after they develop.',
        'Mental health awareness has improved significantly, but stigma still remains a barrier.',
        'Access to quality healthcare should be considered a fundamental human right, not a privilege.'
      ]
    }
  },
  {
    id: 'vocab-health-2',
    title: 'Lifestyle & Fitness Vocabulary',
    slug: 'lifestyle-fitness-vocabulary',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Health',
    description: 'Vocabulary for discussing healthy lifestyles, fitness, nutrition, and wellbeing in IELTS.',
    is_premium: true,
    is_published: true,
    view_count: 750,
    created_at: '2024-02-05T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z',
    content: {
      title: 'Lifestyle & Fitness Vocabulary',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Use 20 lifestyle and fitness terms accurately',
        'Discuss healthy living and wellness trends',
        'Express balanced views on diet and exercise'
      ],
      coreExplanation: `Lifestyle and fitness topics are common in IELTS Speaking Part 1 and Part 3. To score Band 7+, you need vocabulary that allows you to discuss health habits, nutrition, and wellness beyond basic terms.

This lesson focuses on words that help you express nuanced views about healthy living - not just "exercise is good" but sophisticated analysis of lifestyle choices and their impact on wellbeing.`,
      examples: [
        { sentence: 'A balanced diet is essential for maintaining optimal health.', explanation: '"Balanced diet" means eating varied foods in appropriate proportions.' },
        { sentence: 'Regular physical activity reduces the risk of cardiovascular disease.', explanation: '"Physical activity" is more formal than "exercise"; "cardiovascular" relates to heart and blood vessels.' },
        { sentence: 'Sedentary lifestyles contribute to numerous health problems.', explanation: '"Sedentary" means involving little physical activity - sitting for long periods.' },
        { sentence: 'Nutritional deficiencies can lead to serious health complications.', explanation: '"Nutritional deficiencies" means lacking essential nutrients.' },
        { sentence: 'Stress management techniques include meditation and mindfulness.', explanation: '"Stress management" is controlling stress; "mindfulness" is being present and aware.' },
        { sentence: 'Adequate sleep is crucial for physical and mental recovery.', explanation: '"Adequate" means sufficient; "recovery" is the process of returning to normal.' },
        { sentence: 'Processed foods often contain excessive amounts of sugar and salt.', explanation: '"Processed foods" are manufactured foods; "excessive" means too much.' },
        { sentence: 'Maintaining a healthy weight requires consistent effort and discipline.', explanation: '"Maintaining" means keeping at a certain level; "discipline" is self-control.' },
        { sentence: 'Hydration plays a vital role in bodily functions.', explanation: '"Hydration" is maintaining adequate water levels in the body.' },
        { sentence: 'Wellness programs in workplaces can boost employee productivity.', explanation: '"Wellness programs" promote health; "boost" means increase.' },
        { sentence: 'Portion control is an effective strategy for weight management.', explanation: '"Portion control" means limiting serving sizes.' },
        { sentence: 'Organic produce has gained popularity among health-conscious consumers.', explanation: '"Organic" means grown without synthetic chemicals; "health-conscious" means aware of health.' },
        { sentence: 'Flexibility and strength training complement cardiovascular exercise.', explanation: '"Complement" means to enhance or complete; different types of exercise work together.' },
        { sentence: 'Chronic stress can compromise the immune system.', explanation: '"Compromise" means weaken or impair; "immune system" defends against disease.' },
        { sentence: 'Dietary supplements should not replace a nutritious diet.', explanation: '"Dietary supplements" are vitamins/minerals; "nutritious" means providing nourishment.' },
        { sentence: 'Work-life balance is increasingly recognized as important for wellbeing.', explanation: '"Work-life balance" is equilibrium between professional and personal life.' },
        { sentence: 'Intermittent fasting has become a popular dietary approach.', explanation: '"Intermittent fasting" is alternating periods of eating and fasting.' },
        { sentence: 'Mental wellbeing is as important as physical fitness.', explanation: '"Wellbeing" is the state of being comfortable, healthy, and happy.' },
        { sentence: 'Preventive measures such as regular check-ups can detect issues early.', explanation: '"Preventive measures" are actions taken to prevent problems.' },
        { sentence: 'Sustainable lifestyle changes are more effective than crash diets.', explanation: '"Sustainable" means able to be maintained long-term; "crash diets" are extreme short-term diets.' }
      ],
      commonMistakes: [
        { mistake: 'People should eat healthy food.', correction: 'People should maintain a balanced diet / consume nutritious foods.', explanation: '"Eat healthy food" is too simple; use more specific terms.' },
        { mistake: 'Exercise is good for your body.', correction: 'Regular physical activity enhances cardiovascular health and overall fitness.', explanation: 'Be specific about benefits rather than using vague "good for".' },
        { mistake: 'Many people are too fat.', correction: 'Obesity rates have increased / Many people struggle with weight management.', explanation: '"Too fat" is informal and insensitive; use medical or neutral terms.' },
        { mistake: 'Sitting all day is bad.', correction: 'Sedentary lifestyles pose significant health risks / contribute to various health issues.', explanation: 'Use "sedentary lifestyles" and explain specific consequences.' },
        { mistake: 'People need to sleep more.', correction: 'Adequate sleep is essential for optimal health / Many people suffer from sleep deprivation.', explanation: 'Use "adequate sleep" and be more specific about the issue.' }
      ],
      miniPractice: [
        { question: 'A _____ diet includes a variety of foods from all food groups.', type: 'fill-blank' },
        { question: 'Which term describes lifestyles involving little physical activity?', options: ['sedentary', 'active', 'dynamic', 'mobile'], type: 'multiple-choice' },
        { question: 'Rewrite: "Eating junk food is bad for you."', type: 'rewrite' },
        { question: '_____ foods often contain high levels of additives and preservatives.', type: 'fill-blank' },
        { question: 'Which collocation is most natural?', options: ['physical activity', 'physical exercise', 'body activity', 'body exercise'], type: 'multiple-choice' }
      ],
      answerKey: [
        'balanced',
        'sedentary',
        'Consuming processed foods / junk food can lead to various health problems / adversely affect overall health.',
        'Processed',
        'physical activity'
      ],
      quickRecap: 'Key terms: "balanced diet", "physical activity", "sedentary lifestyles", "nutritional deficiencies", "stress management", "adequate sleep", "portion control". Remember: "maintain a balanced diet" not "eat healthy food", "physical activity" not just "exercise". Use these for sophisticated health discussions!',
      collocations: [
        'balanced diet', 'physical activity', 'sedentary lifestyle', 'nutritional deficiencies',
        'stress management', 'adequate sleep', 'processed foods', 'healthy weight',
        'portion control', 'work-life balance', 'mental wellbeing', 'preventive measures'
      ],
      synonyms: [
        { word: 'healthy', synonyms: ['nutritious', 'wholesome', 'beneficial', 'nourishing'] },
        { word: 'exercise', synonyms: ['physical activity', 'workout', 'training', 'fitness routine'] },
        { word: 'tired', synonyms: ['fatigued', 'exhausted', 'depleted', 'drained'] }
      ],
      speakingLines: [
        'I believe that maintaining a balanced diet is more important than following restrictive diets.',
        'Regular physical activity not only improves physical health but also enhances mental wellbeing.',
        'In my opinion, work-life balance is crucial for preventing burnout and maintaining overall health.'
      ]
    }
  },
  // Topic-based: Economy
  {
    id: 'vocab-economy-1',
    title: 'Economic Systems & Global Trade',
    slug: 'economic-systems-global-trade',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Economy',
    description: 'Advanced vocabulary for discussing economic systems, international trade, and financial markets in IELTS.',
    is_premium: true,
    is_published: true,
    view_count: 820,
    created_at: '2024-02-08T10:00:00Z',
    updated_at: '2024-02-08T10:00:00Z',
    content: {
      title: 'Economic Systems & Global Trade',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 advanced economic terms for Band 8+ writing',
        'Discuss global trade and economic policies confidently',
        'Use financial vocabulary accurately in essays and speaking'
      ],
      coreExplanation: `Economic topics frequently appear in IELTS Writing Task 2 and Speaking Part 3. To achieve Band 7+, you need vocabulary that allows you to discuss complex economic issues beyond basic terms like "money" and "business."

This lesson introduces precise economic vocabulary that demonstrates your ability to analyze economic systems, trade policies, and financial trends. The key is using these terms accurately - examiners can tell when candidates use sophisticated words incorrectly.`,
      examples: [
        { sentence: 'Globalization has facilitated unprecedented levels of international trade.', explanation: '"Globalization" is the integration of economies; "unprecedented" means never seen before.' },
        { sentence: 'The recession led to widespread unemployment and economic stagnation.', explanation: '"Recession" is economic decline; "stagnation" is lack of growth.' },
        { sentence: 'Fiscal policies can stimulate economic growth during downturns.', explanation: '"Fiscal policies" relate to government spending and taxation.' },
        { sentence: 'Inflation erodes purchasing power and affects living standards.', explanation: '"Inflation" is rising prices; "purchasing power" is what money can buy.' },
        { sentence: 'Foreign direct investment contributes to economic development.', explanation: '"Foreign direct investment" (FDI) is investment from overseas companies.' },
        { sentence: 'Trade deficits occur when imports exceed exports.', explanation: '"Trade deficit" is negative balance of trade.' },
        { sentence: 'Monetary policy influences interest rates and money supply.', explanation: '"Monetary policy" is central bank actions to control money.' },
        { sentence: 'Economic diversification reduces dependence on single industries.', explanation: '"Diversification" means developing multiple sectors.' },
        { sentence: 'Supply chain disruptions have caused significant price volatility.', explanation: '"Supply chain" is the production and distribution network; "volatility" is instability.' },
        { sentence: 'Sustainable economic growth balances prosperity with environmental protection.', explanation: '"Sustainable growth" can be maintained long-term without depleting resources.' },
        { sentence: 'Market liberalization has opened economies to foreign competition.', explanation: '"Liberalization" is removing restrictions on trade and business.' },
        { sentence: 'Income inequality has widened in many developed economies.', explanation: '"Income inequality" is the gap between rich and poor.' },
        { sentence: 'The gig economy has transformed traditional employment patterns.', explanation: '"Gig economy" is short-term, flexible work arrangements.' },
        { sentence: 'Protectionist measures such as tariffs can spark trade wars.', explanation: '"Protectionist" policies protect domestic industries; "tariffs" are import taxes.' },
        { sentence: 'Economic sanctions are used as diplomatic tools.', explanation: '"Sanctions" are penalties imposed on countries.' },
        { sentence: 'Consumer confidence drives spending and economic activity.', explanation: '"Consumer confidence" is optimism about the economy.' },
        { sentence: 'Emerging markets offer significant growth potential.', explanation: '"Emerging markets" are developing economies with rapid growth.' },
        { sentence: 'The informal economy accounts for a substantial portion of employment.', explanation: '"Informal economy" is unregistered economic activity.' },
        { sentence: 'Currency fluctuations affect international competitiveness.', explanation: '"Fluctuations" are variations; affects export/import prices.' },
        { sentence: 'Austerity measures aim to reduce government debt.', explanation: '"Austerity" is cutting spending to reduce deficits.' }
      ],
      commonMistakes: [
        { mistake: 'The economy is bad.', correction: 'The economy is experiencing a downturn / facing significant challenges.', explanation: 'Avoid "bad" - use specific economic terms.' },
        { mistake: 'Many people lost their jobs.', correction: 'Unemployment rates have risen significantly / Many workers have been made redundant.', explanation: 'Use "unemployment rates" or "made redundant" for formal writing.' },
        { mistake: 'Things are getting more expensive.', correction: 'Inflation has increased / The cost of living has risen substantially.', explanation: 'Use "inflation" or "cost of living" instead of vague descriptions.' },
        { mistake: 'Countries should trade with each other.', correction: 'International trade facilitates economic growth and development.', explanation: 'Explain the benefits rather than stating the obvious.' },
        { mistake: 'The government should spend more money.', correction: 'Expansionary fiscal policies could stimulate economic recovery.', explanation: 'Use technical terms like "fiscal policies" and "stimulate".' }
      ],
      miniPractice: [
        { question: '_____ has led to increased interconnection between national economies.', type: 'fill-blank' },
        { question: 'Which term describes a period of economic decline?', options: ['recession', 'inflation', 'deflation', 'stagnation'], type: 'multiple-choice' },
        { question: 'Rewrite: "Prices are going up and people can\'t afford things."', type: 'rewrite' },
        { question: 'Trade _____ occur when a country imports more than it exports.', type: 'fill-blank' },
        { question: 'Which collocation is correct?', options: ['fiscal policy', 'fiscal politics', 'fiscal strategy', 'fiscal plan'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Globalization',
        'recession',
        'Rising inflation has eroded purchasing power, making goods increasingly unaffordable for many consumers.',
        'deficits',
        'fiscal policy'
      ],
      quickRecap: 'Key terms: "globalization", "recession", "fiscal/monetary policy", "inflation", "trade deficit", "economic diversification", "income inequality". Remember: "economic downturn" not "bad economy", "unemployment rates" not "people lost jobs". Use these for sophisticated economic analysis!',
      collocations: [
        'economic growth', 'fiscal policy', 'monetary policy', 'trade deficit',
        'foreign investment', 'income inequality', 'market liberalization', 'consumer confidence',
        'emerging markets', 'supply chain', 'purchasing power', 'economic diversification'
      ],
      synonyms: [
        { word: 'grow', synonyms: ['expand', 'develop', 'flourish', 'prosper'] },
        { word: 'decrease', synonyms: ['decline', 'contract', 'diminish', 'shrink'] },
        { word: 'expensive', synonyms: ['costly', 'prohibitive', 'unaffordable', 'exorbitant'] }
      ],
      speakingLines: [
        'Globalization has undoubtedly brought both benefits and challenges to national economies.',
        'I believe that sustainable economic growth should prioritize environmental protection.',
        'Income inequality remains one of the most pressing economic issues of our time.'
      ]
    }
  },
  // Topic-based: Society & Culture
  {
    id: 'vocab-society-1',
    title: 'Social Issues & Community',
    slug: 'social-issues-community',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Society',
    description: 'Essential vocabulary for discussing social issues, community development, and societal changes in IELTS.',
    is_premium: false,
    is_published: true,
    view_count: 1120,
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z',
    content: {
      title: 'Social Issues & Community',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Master 25 social vocabulary terms for IELTS',
        'Discuss community issues and social changes confidently',
        'Express balanced views on societal topics'
      ],
      coreExplanation: `Social topics are extremely common in IELTS Writing Task 2 and Speaking Part 3. Questions about community, social problems, and societal changes require specific vocabulary to express nuanced views.

This lesson focuses on words that help you discuss social issues academically - not just "society has problems" but sophisticated analysis of social dynamics, community development, and cultural changes.`,
      examples: [
        { sentence: 'Social cohesion is essential for community wellbeing.', explanation: '"Social cohesion" is the bonds that unite members of a society.' },
        { sentence: 'Urbanization has transformed traditional community structures.', explanation: '"Urbanization" is the movement of people to cities.' },
        { sentence: 'Demographic changes are reshaping social policies.', explanation: '"Demographic" relates to population characteristics.' },
        { sentence: 'Social mobility enables individuals to improve their circumstances.', explanation: '"Social mobility" is the ability to move between social classes.' },
        { sentence: 'Community engagement fosters a sense of belonging.', explanation: '"Community engagement" is active participation in local activities.' },
        { sentence: 'Social exclusion affects marginalized groups disproportionately.', explanation: '"Social exclusion" is being shut out from society; "marginalized" means pushed to the edges.' },
        { sentence: 'Civic responsibility includes voting and community participation.', explanation: '"Civic responsibility" is duties as a citizen.' },
        { sentence: 'Intergenerational conflict arises from differing values and expectations.', explanation: '"Intergenerational" means between different age groups.' },
        { sentence: 'Social welfare programs support vulnerable populations.', explanation: '"Social welfare" is government assistance for those in need.' },
        { sentence: 'Cultural diversity enriches communities but can also create challenges.', explanation: '"Cultural diversity" is variety of cultures in a society.' },
        { sentence: 'Grassroots movements can drive significant social change.', explanation: '"Grassroots" means organized by ordinary people, not leaders.' },
        { sentence: 'Social norms evolve over time in response to changing values.', explanation: '"Social norms" are accepted behaviors in society.' },
        { sentence: 'Inequality perpetuates cycles of poverty and disadvantage.', explanation: '"Perpetuates" means causes to continue; "cycles" are repeating patterns.' },
        { sentence: 'Volunteerism strengthens community bonds and social capital.', explanation: '"Social capital" is networks and relationships that benefit society.' },
        { sentence: 'Gentrification can displace long-term residents from neighborhoods.', explanation: '"Gentrification" is when wealthier people move into poorer areas.' },
        { sentence: 'Social integration helps immigrants adapt to new communities.', explanation: '"Social integration" is becoming part of a society.' },
        { sentence: 'Public discourse shapes attitudes toward social issues.', explanation: '"Public discourse" is discussion and debate in society.' },
        { sentence: 'Stigma prevents many people from seeking help for mental health issues.', explanation: '"Stigma" is negative attitudes and discrimination.' },
        { sentence: 'Collective action can address issues that individuals cannot solve alone.', explanation: '"Collective action" is people working together for common goals.' },
        { sentence: 'Social stratification creates distinct layers within society.', explanation: '"Stratification" is division into hierarchical groups.' }
      ],
      commonMistakes: [
        { mistake: 'Society has many problems.', correction: 'Contemporary society faces numerous challenges / Social issues persist in modern communities.', explanation: 'Be specific about which problems and use academic language.' },
        { mistake: 'Old people and young people don\'t understand each other.', correction: 'Intergenerational conflict arises from differing values and perspectives.', explanation: 'Use "intergenerational conflict" and explain the cause.' },
        { mistake: 'Poor people can\'t get good jobs.', correction: 'Limited social mobility restricts opportunities for disadvantaged groups.', explanation: 'Use "social mobility" and "disadvantaged groups" for formal writing.' },
        { mistake: 'People should help their community.', correction: 'Community engagement and civic participation strengthen social bonds.', explanation: 'Use specific terms like "community engagement" and "civic participation".' },
        { mistake: 'Different cultures living together is difficult.', correction: 'Cultural diversity presents both opportunities and challenges for social cohesion.', explanation: 'Present a balanced view using appropriate vocabulary.' }
      ],
      miniPractice: [
        { question: 'Social _____ refers to the ability to move between different social classes.', type: 'fill-blank' },
        { question: 'Which term describes the bonds that unite members of a society?', options: ['social cohesion', 'social capital', 'social mobility', 'social welfare'], type: 'multiple-choice' },
        { question: 'Rewrite: "Rich people moving into poor areas pushes out the original residents."', type: 'rewrite' },
        { question: '_____ groups often face discrimination and limited opportunities.', type: 'fill-blank' },
        { question: 'Which collocation is most natural?', options: ['community engagement', 'community involvement', 'community participation', 'All are correct'], type: 'multiple-choice' }
      ],
      answerKey: [
        'mobility',
        'social cohesion',
        'Gentrification can displace long-term residents from their neighborhoods.',
        'Marginalized',
        'All are correct'
      ],
      quickRecap: 'Key terms: "social cohesion", "urbanization", "social mobility", "community engagement", "social exclusion", "civic responsibility", "cultural diversity". Remember: "intergenerational conflict" not "old and young don\'t understand", "marginalized groups" not "poor people". Use these for sophisticated social analysis!',
      collocations: [
        'social cohesion', 'social mobility', 'community engagement', 'social exclusion',
        'civic responsibility', 'cultural diversity', 'social welfare', 'grassroots movements',
        'social norms', 'social capital', 'public discourse', 'collective action'
      ],
      synonyms: [
        { word: 'community', synonyms: ['society', 'neighborhood', 'locality', 'population'] },
        { word: 'problem', synonyms: ['issue', 'challenge', 'concern', 'difficulty'] },
        { word: 'help', synonyms: ['support', 'assist', 'aid', 'contribute to'] }
      ],
      speakingLines: [
        'I believe that community engagement is essential for addressing local issues effectively.',
        'Social mobility should be a priority for governments seeking to reduce inequality.',
        'Cultural diversity, while challenging, ultimately enriches our communities.'
      ]
    }
  },
  // Topic-based: Work & Career
  {
    id: 'vocab-work-1',
    title: 'Employment & Career Development',
    slug: 'employment-career-development',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Work',
    description: 'Essential vocabulary for discussing employment, careers, and workplace issues in IELTS.',
    is_premium: false,
    is_published: true,
    view_count: 1350,
    created_at: '2024-02-12T10:00:00Z',
    updated_at: '2024-02-12T10:00:00Z',
    content: {
      title: 'Employment & Career Development',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Master 25 employment and career terms for IELTS',
        'Discuss workplace issues and career development confidently',
        'Use professional vocabulary in Writing and Speaking'
      ],
      coreExplanation: `Work and employment topics are extremely common in IELTS, appearing in Writing Task 2 and Speaking Parts 1-3. To achieve Band 7+, you need vocabulary that goes beyond basic terms like "job" and "work."

This lesson introduces precise employment vocabulary that demonstrates your ability to discuss workplace dynamics, career development, and labor market trends. The key is using these terms naturally and accurately.`,
      examples: [
        { sentence: 'Job satisfaction is influenced by various factors including salary and work environment.', explanation: '"Job satisfaction" is contentment with one\'s work.' },
        { sentence: 'Remote work has become increasingly prevalent since the pandemic.', explanation: '"Remote work" is working from outside the office; "prevalent" means widespread.' },
        { sentence: 'Professional development opportunities enhance employee retention.', explanation: '"Professional development" is improving skills; "retention" is keeping employees.' },
        { sentence: 'The labor market has become increasingly competitive.', explanation: '"Labor market" is the supply and demand for workers.' },
        { sentence: 'Work-life balance is a priority for many employees today.', explanation: '"Work-life balance" is equilibrium between professional and personal life.' },
        { sentence: 'Career progression often requires continuous skill development.', explanation: '"Career progression" is advancement in one\'s career.' },
        { sentence: 'Workplace diversity promotes innovation and creativity.', explanation: '"Workplace diversity" is variety of people in a workplace.' },
        { sentence: 'Automation threatens to displace workers in certain industries.', explanation: '"Displace" means to force out of position or job.' },
        { sentence: 'Entrepreneurship offers an alternative to traditional employment.', explanation: '"Entrepreneurship" is starting and running businesses.' },
        { sentence: 'Employee engagement correlates with productivity and performance.', explanation: '"Employee engagement" is emotional commitment to work.' },
        { sentence: 'Flexible working arrangements accommodate diverse needs.', explanation: '"Flexible working" allows varied schedules or locations.' },
        { sentence: 'Upskilling is essential in a rapidly changing job market.', explanation: '"Upskilling" is learning new skills to stay relevant.' },
        { sentence: 'Occupational stress can lead to burnout and health problems.', explanation: '"Occupational stress" is work-related stress; "burnout" is exhaustion.' },
        { sentence: 'Networking plays a crucial role in career advancement.', explanation: '"Networking" is building professional relationships.' },
        { sentence: 'The gig economy offers flexibility but lacks job security.', explanation: '"Gig economy" is short-term, freelance work arrangements.' },
        { sentence: 'Mentorship programs support professional growth.', explanation: '"Mentorship" is guidance from experienced professionals.' },
        { sentence: 'Redundancy can result from economic downturns or restructuring.', explanation: '"Redundancy" is job loss due to position elimination.' },
        { sentence: 'Transferable skills are valuable across different industries.', explanation: '"Transferable skills" can be applied in various contexts.' },
        { sentence: 'Corporate culture significantly impacts employee wellbeing.', explanation: '"Corporate culture" is the values and behaviors in a company.' },
        { sentence: 'Performance appraisals provide feedback for improvement.', explanation: '"Performance appraisals" are formal evaluations of work.' }
      ],
      commonMistakes: [
        { mistake: 'I want to find a good job.', correction: 'I am seeking employment that offers career progression and job satisfaction.', explanation: 'Be specific about what makes a job "good" using appropriate vocabulary.' },
        { mistake: 'Many people work from home now.', correction: 'Remote work has become increasingly prevalent in recent years.', explanation: 'Use "remote work" and "prevalent" for formal writing.' },
        { mistake: 'People should learn new things for their job.', correction: 'Continuous professional development is essential for career advancement.', explanation: 'Use "professional development" and "career advancement".' },
        { mistake: 'The boss should treat workers well.', correction: 'Employers should prioritize employee wellbeing and engagement.', explanation: 'Use "employers", "employee wellbeing", and "engagement".' },
        { mistake: 'Robots will take people\'s jobs.', correction: 'Automation threatens to displace workers in certain sectors.', explanation: 'Use "automation", "displace", and "sectors" for precision.' }
      ],
      miniPractice: [
        { question: 'Job _____ is influenced by factors such as salary, work environment, and career opportunities.', type: 'fill-blank' },
        { question: 'Which term describes working from outside the traditional office?', options: ['remote work', 'flexible work', 'freelance work', 'part-time work'], type: 'multiple-choice' },
        { question: 'Rewrite: "People need to keep learning new skills to keep their jobs."', type: 'rewrite' },
        { question: 'Employee _____ correlates strongly with productivity and performance.', type: 'fill-blank' },
        { question: 'Which collocation is most natural?', options: ['career progression', 'career advancement', 'career development', 'All are correct'], type: 'multiple-choice' }
      ],
      answerKey: [
        'satisfaction',
        'remote work',
        'Continuous upskilling is essential for maintaining employability in a rapidly evolving job market.',
        'engagement',
        'All are correct'
      ],
      quickRecap: 'Key terms: "job satisfaction", "remote work", "professional development", "labor market", "work-life balance", "career progression", "employee engagement", "upskilling". Remember: "remote work" not "work from home", "professional development" not "learn new things". Use these for sophisticated employment discussions!',
      collocations: [
        'job satisfaction', 'remote work', 'professional development', 'labor market',
        'work-life balance', 'career progression', 'workplace diversity', 'employee engagement',
        'flexible working', 'occupational stress', 'transferable skills', 'corporate culture'
      ],
      synonyms: [
        { word: 'job', synonyms: ['position', 'role', 'occupation', 'employment'] },
        { word: 'boss', synonyms: ['employer', 'manager', 'supervisor', 'line manager'] },
        { word: 'fired', synonyms: ['dismissed', 'made redundant', 'let go', 'terminated'] }
      ],
      speakingLines: [
        'I believe that work-life balance is essential for long-term career success and personal wellbeing.',
        'Remote work offers flexibility, but it can also blur the boundaries between professional and personal life.',
        'In my opinion, continuous professional development is crucial in today\'s rapidly changing job market.'
      ]
    }
  },
  // Topic-based: Government & Law
  {
    id: 'vocab-government-1',
    title: 'Government & Public Policy',
    slug: 'government-public-policy',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Government',
    description: 'Advanced vocabulary for discussing government, politics, and public policy in IELTS.',
    is_premium: true,
    is_published: true,
    view_count: 680,
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z',
    content: {
      title: 'Government & Public Policy',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 government and policy terms for Band 8+ writing',
        'Discuss political systems and public policies confidently',
        'Use formal vocabulary for government-related topics'
      ],
      coreExplanation: `Government and policy topics frequently appear in IELTS Writing Task 2. Questions about government responsibility, public spending, and policy effectiveness require specific vocabulary to express sophisticated views.

This lesson introduces precise political and policy vocabulary that demonstrates your ability to discuss governance, legislation, and public administration. The key is using these terms accurately and maintaining a neutral, academic tone.`,
      examples: [
        { sentence: 'The government implemented comprehensive reforms to address the crisis.', explanation: '"Implemented" means put into action; "comprehensive" means thorough.' },
        { sentence: 'Public policy should be evidence-based and transparent.', explanation: '"Evidence-based" means supported by research; "transparent" means open.' },
        { sentence: 'Legislation was enacted to protect consumer rights.', explanation: '"Legislation" is laws; "enacted" means officially made into law.' },
        { sentence: 'Bureaucratic inefficiency can hinder policy implementation.', explanation: '"Bureaucratic" relates to government administration; "hinder" means obstruct.' },
        { sentence: 'Democratic participation is essential for legitimate governance.', explanation: '"Democratic participation" is citizen involvement; "legitimate" means rightful.' },
        { sentence: 'Regulatory frameworks ensure compliance with standards.', explanation: '"Regulatory frameworks" are systems of rules; "compliance" is following rules.' },
        { sentence: 'Decentralization transfers power from central to local authorities.', explanation: '"Decentralization" is distributing power away from the center.' },
        { sentence: 'Accountability mechanisms hold officials responsible for their actions.', explanation: '"Accountability" is being answerable for actions.' },
        { sentence: 'Public consultation informs policy development.', explanation: '"Public consultation" is seeking citizens\' views on policies.' },
        { sentence: 'Subsidies support industries deemed essential for national interests.', explanation: '"Subsidies" are financial assistance from government.' },
        { sentence: 'Constitutional rights protect citizens from government overreach.', explanation: '"Constitutional rights" are guaranteed by the constitution.' },
        { sentence: 'Bipartisan support is necessary for major legislative changes.', explanation: '"Bipartisan" means supported by two political parties.' },
        { sentence: 'Welfare provisions ensure a basic standard of living.', explanation: '"Welfare provisions" are government support for those in need.' },
        { sentence: 'Taxation policies influence economic behavior and distribution.', explanation: '"Taxation policies" are rules about collecting taxes.' },
        { sentence: 'Civic engagement strengthens democratic institutions.', explanation: '"Civic engagement" is participation in community and political life.' },
        { sentence: 'Policy evaluation assesses the effectiveness of interventions.', explanation: '"Policy evaluation" is analyzing whether policies work.' },
        { sentence: 'Sovereignty refers to a nation\'s right to self-governance.', explanation: '"Sovereignty" is supreme authority over a territory.' },
        { sentence: 'Lobbying influences legislative decisions on behalf of interest groups.', explanation: '"Lobbying" is attempting to influence politicians.' },
        { sentence: 'Electoral reform aims to improve the fairness of voting systems.', explanation: '"Electoral reform" is changing how elections work.' },
        { sentence: 'Governance structures determine how decisions are made and implemented.', explanation: '"Governance structures" are systems for managing organizations or countries.' }
      ],
      commonMistakes: [
        { mistake: 'The government should do something about this problem.', correction: 'The government should implement policies to address this issue.', explanation: 'Be specific about what action using "implement policies" and "address".' },
        { mistake: 'The government made a new law.', correction: 'The government enacted legislation / passed a bill.', explanation: 'Use "enacted legislation" or "passed a bill" for formal writing.' },
        { mistake: 'Politicians should listen to people.', correction: 'Public consultation should inform policy development.', explanation: 'Use "public consultation" and "policy development".' },
        { mistake: 'The government gives money to poor people.', correction: 'Welfare provisions / Social security programs support disadvantaged citizens.', explanation: 'Use "welfare provisions" or "social security" and "disadvantaged citizens".' },
        { mistake: 'The government should be honest.', correction: 'Transparency and accountability are essential for good governance.', explanation: 'Use "transparency", "accountability", and "governance".' }
      ],
      miniPractice: [
        { question: 'The government _____ new regulations to protect the environment.', type: 'fill-blank' },
        { question: 'Which term describes the transfer of power from central to local authorities?', options: ['decentralization', 'democratization', 'deregulation', 'delegation'], type: 'multiple-choice' },
        { question: 'Rewrite: "The government should ask people what they think before making decisions."', type: 'rewrite' },
        { question: '_____ mechanisms ensure that officials are answerable for their actions.', type: 'fill-blank' },
        { question: 'Which collocation is most natural?', options: ['implement policies', 'do policies', 'make policies', 'create policies'], type: 'multiple-choice' }
      ],
      answerKey: [
        'implemented / enacted',
        'decentralization',
        'Public consultation should inform policy development / Governments should engage in public consultation before implementing policies.',
        'Accountability',
        'implement policies'
      ],
      quickRecap: 'Key terms: "implement policies", "enact legislation", "public consultation", "regulatory frameworks", "accountability", "decentralization", "welfare provisions", "civic engagement". Remember: "implement policies" not "do something", "enact legislation" not "make a law". Use these for sophisticated policy discussions!',
      collocations: [
        'implement policies', 'enact legislation', 'public consultation', 'regulatory frameworks',
        'democratic participation', 'accountability mechanisms', 'welfare provisions', 'taxation policies',
        'civic engagement', 'policy evaluation', 'electoral reform', 'governance structures'
      ],
      synonyms: [
        { word: 'government', synonyms: ['authorities', 'administration', 'state', 'regime'] },
        { word: 'law', synonyms: ['legislation', 'regulation', 'statute', 'act'] },
        { word: 'rule', synonyms: ['govern', 'administer', 'regulate', 'oversee'] }
      ],
      speakingLines: [
        'I believe that transparency and accountability are fundamental to effective governance.',
        'Public consultation should be an integral part of the policy-making process.',
        'In my view, decentralization can improve the responsiveness of government to local needs.'
      ]
    }
  },
  // Topic-based: Media & Communication
  {
    id: 'vocab-media-1',
    title: 'Media & Digital Communication',
    slug: 'media-digital-communication',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Media',
    description: 'Essential vocabulary for discussing media, journalism, and digital communication in IELTS.',
    is_premium: false,
    is_published: true,
    view_count: 920,
    created_at: '2024-02-18T10:00:00Z',
    updated_at: '2024-02-18T10:00:00Z',
    content: {
      title: 'Media & Digital Communication',
      targetLevel: 'Band 6.5 - 7.5',
      whatYouWillLearn: [
        'Master 25 media and communication terms for IELTS',
        'Discuss journalism, social media, and information issues',
        'Express balanced views on media influence'
      ],
      coreExplanation: `Media topics are increasingly common in IELTS, especially questions about social media, news, and information. To achieve Band 7+, you need vocabulary that allows you to discuss media influence, digital communication, and information reliability.

This lesson introduces precise media vocabulary that demonstrates your ability to analyze media effects, discuss journalism ethics, and evaluate information sources. The key is presenting balanced, nuanced views.`,
      examples: [
        { sentence: 'Social media platforms have transformed how information is disseminated.', explanation: '"Disseminated" means spread or distributed widely.' },
        { sentence: 'Media literacy is essential for evaluating information critically.', explanation: '"Media literacy" is the ability to analyze and evaluate media.' },
        { sentence: 'Misinformation spreads rapidly through digital channels.', explanation: '"Misinformation" is false information; "digital channels" are online platforms.' },
        { sentence: 'Traditional journalism faces challenges from citizen reporting.', explanation: '"Citizen reporting" is news gathering by ordinary people.' },
        { sentence: 'Algorithms curate content based on user preferences.', explanation: '"Algorithms" are computer processes; "curate" means select and organize.' },
        { sentence: 'Media bias can influence public perception of events.', explanation: '"Media bias" is prejudice in reporting; "perception" is how things are viewed.' },
        { sentence: 'The proliferation of fake news undermines trust in media.', explanation: '"Proliferation" is rapid spread; "undermines" means weakens.' },
        { sentence: 'Digital platforms have democratized content creation.', explanation: '"Democratized" means made accessible to everyone.' },
        { sentence: 'Echo chambers reinforce existing beliefs and opinions.', explanation: '"Echo chambers" are environments where only similar views are heard.' },
        { sentence: 'Press freedom is fundamental to democratic societies.', explanation: '"Press freedom" is the right of media to report without censorship.' },
        { sentence: 'Viral content can reach millions within hours.', explanation: '"Viral" means spreading rapidly online.' },
        { sentence: 'Sensationalism prioritizes attention over accuracy.', explanation: '"Sensationalism" is exaggerating news for impact.' },
        { sentence: 'Data privacy concerns have intensified with social media use.', explanation: '"Data privacy" is protection of personal information.' },
        { sentence: 'Influencer marketing has become a significant advertising channel.', explanation: '"Influencer marketing" uses social media personalities to promote products.' },
        { sentence: 'Fact-checking organizations verify the accuracy of claims.', explanation: '"Fact-checking" is verifying whether information is true.' },
        { sentence: 'Media consolidation reduces diversity of viewpoints.', explanation: '"Consolidation" is combining; fewer owners means less diversity.' },
        { sentence: 'Online harassment has become a serious concern on social platforms.', explanation: '"Online harassment" is abusive behavior on the internet.' },
        { sentence: 'Clickbait headlines prioritize engagement over substance.', explanation: '"Clickbait" is content designed to attract clicks, often misleading.' },
        { sentence: 'Digital detox involves temporarily disconnecting from technology.', explanation: '"Digital detox" is taking a break from digital devices.' },
        { sentence: 'Broadcast media still reaches significant audiences despite digital competition.', explanation: '"Broadcast media" is TV and radio; contrasted with digital media.' }
      ],
      commonMistakes: [
        { mistake: 'Social media is bad for society.', correction: 'Social media has both positive and negative implications for society.', explanation: 'Present a balanced view rather than absolute statements.' },
        { mistake: 'People believe everything they read online.', correction: 'Misinformation can spread rapidly due to insufficient media literacy.', explanation: 'Use "misinformation" and "media literacy" for precision.' },
        { mistake: 'The news is biased.', correction: 'Media bias can influence public perception of events.', explanation: 'Use "media bias" and explain its effects.' },
        { mistake: 'Everyone uses social media now.', correction: 'Social media usage has become increasingly prevalent across demographics.', explanation: 'Use "prevalent" and "demographics" for formal writing.' },
        { mistake: 'Fake news is a big problem.', correction: 'The proliferation of misinformation poses significant challenges for informed citizenship.', explanation: 'Use "proliferation", "misinformation", and explain consequences.' }
      ],
      miniPractice: [
        { question: 'Media _____ is essential for critically evaluating information sources.', type: 'fill-blank' },
        { question: 'Which term describes environments where only similar views are heard?', options: ['echo chambers', 'filter bubbles', 'information silos', 'All of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Fake news spreads quickly on the internet."', type: 'rewrite' },
        { question: 'Social media _____ curate content based on user behavior and preferences.', type: 'fill-blank' },
        { question: 'Which collocation is most natural?', options: ['media literacy', 'media knowledge', 'media understanding', 'media awareness'], type: 'multiple-choice' }
      ],
      answerKey: [
        'literacy',
        'All of the above',
        'Misinformation proliferates rapidly through digital channels / online platforms.',
        'algorithms',
        'media literacy'
      ],
      quickRecap: 'Key terms: "media literacy", "misinformation", "algorithms", "media bias", "echo chambers", "press freedom", "sensationalism", "fact-checking". Remember: "misinformation" not "fake news", "media literacy" not "knowing about media". Use these for sophisticated media analysis!',
      collocations: [
        'media literacy', 'social media platforms', 'digital channels', 'media bias',
        'echo chambers', 'press freedom', 'viral content', 'data privacy',
        'fact-checking', 'online harassment', 'broadcast media', 'content creation'
      ],
      synonyms: [
        { word: 'news', synonyms: ['information', 'reports', 'coverage', 'journalism'] },
        { word: 'spread', synonyms: ['disseminate', 'circulate', 'propagate', 'distribute'] },
        { word: 'fake', synonyms: ['false', 'misleading', 'fabricated', 'inaccurate'] }
      ],
      speakingLines: [
        'I believe that media literacy should be taught in schools to help people evaluate information critically.',
        'While social media has democratized content creation, it has also facilitated the spread of misinformation.',
        'In my opinion, press freedom is essential for holding those in power accountable.'
      ]
    }
  },
  // Academic Collocations: Verb + Noun
  {
    id: 'vocab-colloc-1',
    title: 'Academic Collocations: Verb + Noun',
    slug: 'academic-collocations-verb-noun',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Collocations',
    description: 'Master essential verb + noun collocations for academic writing and IELTS Band 8+.',
    is_premium: true,
    is_published: true,
    view_count: 1580,
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-02-20T10:00:00Z',
    content: {
      title: 'Academic Collocations: Verb + Noun',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Master 30 essential verb + noun collocations for academic writing',
        'Replace basic verbs with sophisticated collocations',
        'Sound more natural and academic in IELTS Writing'
      ],
      coreExplanation: `Collocations are words that naturally go together. Using correct collocations is one of the key differences between Band 6 and Band 8 writing. Native speakers instantly recognize when collocations are wrong, even if the meaning is clear.

This lesson focuses on verb + noun collocations that are essential for academic writing. Instead of "do research," you should say "conduct research." Instead of "make a decision," you can say "reach a decision." These small changes significantly improve your lexical resource score.`,
      examples: [
        { sentence: 'Researchers conduct experiments to test their hypotheses.', explanation: '"Conduct experiments" - not "do experiments" or "make experiments".' },
        { sentence: 'The government should implement policies to address inequality.', explanation: '"Implement policies" - not "do policies" or "make policies".' },
        { sentence: 'Scientists draw conclusions based on empirical evidence.', explanation: '"Draw conclusions" - not "make conclusions" or "get conclusions".' },
        { sentence: 'The study raises questions about the effectiveness of the treatment.', explanation: '"Raise questions" - not "make questions" or "bring questions".' },
        { sentence: 'Experts express concerns about the environmental impact.', explanation: '"Express concerns" - not "say concerns" or "tell concerns".' },
        { sentence: 'The data provides evidence to support the hypothesis.', explanation: '"Provide evidence" - not "give evidence" (though "give evidence" is used in legal contexts).' },
        { sentence: 'Governments should take measures to reduce pollution.', explanation: '"Take measures" - not "do measures" or "make measures".' },
        { sentence: 'The findings pose challenges for existing theories.', explanation: '"Pose challenges" - not "make challenges" or "give challenges".' },
        { sentence: 'Researchers have made significant progress in this field.', explanation: '"Make progress" - one of the few cases where "make" is correct.' },
        { sentence: 'The report highlights the need for urgent action.', explanation: '"Highlight the need" - not "show the need" (though acceptable).' },
        { sentence: 'The study examines the relationship between diet and health.', explanation: '"Examine the relationship" - more academic than "look at".' },
        { sentence: 'The results demonstrate a clear correlation.', explanation: '"Demonstrate a correlation" - not "show a correlation" (though acceptable).' },
        { sentence: 'Policymakers should address the root causes of poverty.', explanation: '"Address the causes" - not "solve the causes".' },
        { sentence: 'The research fills a gap in the existing literature.', explanation: '"Fill a gap" - not "close a gap" or "complete a gap".' },
        { sentence: 'The findings have significant implications for future research.', explanation: '"Have implications" - not "make implications" or "give implications".' },
        { sentence: 'The study sheds light on previously unknown factors.', explanation: '"Shed light on" - means to clarify or explain.' },
        { sentence: 'Experts have reached a consensus on this issue.', explanation: '"Reach a consensus" - not "make a consensus" or "get a consensus".' },
        { sentence: 'The government has allocated resources to education.', explanation: '"Allocate resources" - not "give resources" (though acceptable).' },
        { sentence: 'The policy aims to achieve sustainable development.', explanation: '"Achieve development" - not "get development" or "make development".' },
        { sentence: 'The study yields interesting results.', explanation: '"Yield results" - more academic than "give results" or "produce results".' },
        { sentence: 'Researchers have identified several key factors.', explanation: '"Identify factors" - not "find factors" (though acceptable).' },
        { sentence: 'The evidence supports the claim that education improves outcomes.', explanation: '"Support a claim" - not "help a claim" or "back a claim".' },
        { sentence: 'The study establishes a link between smoking and cancer.', explanation: '"Establish a link" - not "make a link" or "create a link".' },
        { sentence: 'The report outlines recommendations for improvement.', explanation: '"Outline recommendations" - not "say recommendations".' },
        { sentence: 'The research contributes to our understanding of the issue.', explanation: '"Contribute to understanding" - not "add to understanding" (though acceptable).' }
      ],
      commonMistakes: [
        { mistake: 'Scientists do research on climate change.', correction: 'Scientists conduct research on climate change.', explanation: '"Conduct research" is the academic collocation, not "do research".' },
        { mistake: 'The government made a new policy.', correction: 'The government implemented a new policy.', explanation: '"Implement a policy" is correct; "make a policy" sounds unnatural.' },
        { mistake: 'The study makes conclusions about the results.', correction: 'The study draws conclusions from the results.', explanation: '"Draw conclusions" is the correct collocation.' },
        { mistake: 'This brings questions about the method.', correction: 'This raises questions about the method.', explanation: '"Raise questions" is the correct collocation.' },
        { mistake: 'The report gives evidence that...', correction: 'The report provides evidence that...', explanation: '"Provide evidence" is more academic than "give evidence".' }
      ],
      miniPractice: [
        { question: 'Researchers _____ experiments to test their theories.', type: 'fill-blank' },
        { question: 'Which verb collocates correctly with "conclusions"?', options: ['draw', 'make', 'get', 'take'], type: 'multiple-choice' },
        { question: 'Rewrite using better collocations: "The study does research and makes conclusions."', type: 'rewrite' },
        { question: 'The findings _____ questions about the validity of previous research.', type: 'fill-blank' },
        { question: 'Which collocation is correct?', options: ['implement policies', 'do policies', 'make policies', 'create policies'], type: 'multiple-choice' }
      ],
      answerKey: [
        'conduct',
        'draw',
        'The study conducts research and draws conclusions.',
        'raise',
        'implement policies'
      ],
      quickRecap: 'Key collocations: conduct research, implement policies, draw conclusions, raise questions, express concerns, provide evidence, take measures, pose challenges, make progress, reach a consensus. These collocations instantly make your writing more academic!',
      collocations: [
        'conduct research', 'implement policies', 'draw conclusions', 'raise questions',
        'express concerns', 'provide evidence', 'take measures', 'pose challenges',
        'make progress', 'reach a consensus', 'allocate resources', 'achieve goals',
        'yield results', 'establish a link', 'shed light on', 'fill a gap'
      ],
      synonyms: [
        { word: 'do (research)', synonyms: ['conduct', 'carry out', 'undertake', 'perform'] },
        { word: 'make (decision)', synonyms: ['reach', 'arrive at', 'come to'] },
        { word: 'show (results)', synonyms: ['demonstrate', 'reveal', 'indicate', 'suggest'] }
      ],
      speakingLines: [
        'Research conducted in this area has drawn some interesting conclusions.',
        'The government should implement policies that address the root causes of the problem.',
        'These findings raise important questions about current practices.'
      ]
    }
  },
  // Speaking-friendly: Opinion Expressions
  {
    id: 'vocab-speaking-1',
    title: 'Opinion Expressions for Speaking',
    slug: 'opinion-expressions-speaking',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Speaking',
    description: 'Essential phrases for expressing opinions, agreeing, disagreeing, and giving reasons in IELTS Speaking.',
    is_premium: false,
    is_published: true,
    view_count: 2100,
    created_at: '2024-02-22T10:00:00Z',
    updated_at: '2024-02-22T10:00:00Z',
    content: {
      title: 'Opinion Expressions for Speaking',
      targetLevel: 'Band 6.0 - 8.0',
      whatYouWillLearn: [
        'Master 30 phrases for expressing opinions naturally',
        'Learn varied ways to agree and disagree',
        'Use sophisticated language for giving reasons and examples'
      ],
      coreExplanation: `IELTS Speaking Part 3 requires you to express opinions, agree/disagree, and support your views with reasons. Using varied expressions demonstrates lexical resource and helps you sound more natural.

This lesson provides a toolkit of phrases for different functions. Instead of always saying "I think," you can use "From my perspective," "I would argue that," or "It seems to me that." Variety is key to achieving Band 7+.`,
      examples: [
        { sentence: 'From my perspective, education is the key to reducing inequality.', explanation: '"From my perspective" is a sophisticated alternative to "I think".' },
        { sentence: 'I would argue that technology has more benefits than drawbacks.', explanation: '"I would argue that" shows you\'re presenting a reasoned opinion.' },
        { sentence: 'It seems to me that the situation is more complex than it appears.', explanation: '"It seems to me that" is a tentative way to express an opinion.' },
        { sentence: 'I firmly believe that governments should prioritize healthcare.', explanation: '"I firmly believe" shows strong conviction.' },
        { sentence: 'In my view, this approach is unlikely to succeed.', explanation: '"In my view" is a formal way to express an opinion.' },
        { sentence: 'I tend to think that traditional methods are still valuable.', explanation: '"I tend to think" shows a leaning toward an opinion.' },
        { sentence: 'I absolutely agree with the idea that education should be free.', explanation: '"I absolutely agree" shows strong agreement.' },
        { sentence: 'I see your point, but I would have to disagree.', explanation: '"I see your point, but" acknowledges the other view before disagreeing.' },
        { sentence: 'That\'s a valid point, however, I believe there are other factors to consider.', explanation: 'Acknowledging validity before presenting a different view.' },
        { sentence: 'I\'m not entirely convinced that this is the best approach.', explanation: '"I\'m not entirely convinced" is a polite way to express doubt.' },
        { sentence: 'The main reason for this is that resources are limited.', explanation: '"The main reason for this is" introduces a key explanation.' },
        { sentence: 'This is primarily because of economic factors.', explanation: '"This is primarily because" gives the main cause.' },
        { sentence: 'For instance, many countries have successfully implemented this policy.', explanation: '"For instance" introduces an example.' },
        { sentence: 'To illustrate this point, consider the case of Singapore.', explanation: '"To illustrate this point" introduces a specific example.' },
        { sentence: 'On the one hand, technology improves efficiency; on the other hand, it can cause job losses.', explanation: 'Presenting both sides of an argument.' },
        { sentence: 'While I understand the argument for stricter laws, I believe education is more effective.', explanation: '"While I understand" acknowledges the opposing view.' },
        { sentence: 'Having said that, there are some valid counterarguments.', explanation: '"Having said that" introduces a contrasting point.' },
        { sentence: 'It\'s worth noting that not everyone shares this view.', explanation: '"It\'s worth noting" adds an important consideration.' },
        { sentence: 'All things considered, I believe the benefits outweigh the drawbacks.', explanation: '"All things considered" introduces a balanced conclusion.' },
        { sentence: 'To sum up, I would say that a balanced approach is necessary.', explanation: '"To sum up" introduces a conclusion.' }
      ],
      commonMistakes: [
        { mistake: 'I think technology is good.', correction: 'From my perspective, technology offers significant benefits to society.', explanation: 'Use varied opinion phrases and be more specific.' },
        { mistake: 'I agree.', correction: 'I absolutely agree with that point. / That\'s a valid observation.', explanation: 'Expand on your agreement with more detail.' },
        { mistake: 'I disagree.', correction: 'I see your point, but I would have to respectfully disagree.', explanation: 'Acknowledge the other view before disagreeing.' },
        { mistake: 'Because it\'s important.', correction: 'The main reason for this is that it directly affects people\'s quality of life.', explanation: 'Give specific reasons, not vague statements.' },
        { mistake: 'For example, many things.', correction: 'For instance, countries like Finland have successfully implemented this approach.', explanation: 'Give specific, concrete examples.' }
      ],
      miniPractice: [
        { question: 'Complete: "_____ my perspective, education should be accessible to everyone."', type: 'fill-blank' },
        { question: 'Which phrase is best for politely disagreeing?', options: ['I see your point, but...', 'You\'re wrong because...', 'I disagree completely.', 'That\'s not true.'], type: 'multiple-choice' },
        { question: 'Rewrite: "I think this is good because of many reasons."', type: 'rewrite' },
        { question: 'Complete: "_____ things considered, I believe the advantages outweigh the disadvantages."', type: 'fill-blank' },
        { question: 'Which phrase introduces an example?', options: ['For instance', 'However', 'Therefore', 'Moreover'], type: 'multiple-choice' }
      ],
      answerKey: [
        'From',
        'I see your point, but...',
        'From my perspective, this approach offers significant benefits for several reasons. / I would argue that this is beneficial, primarily because...',
        'All',
        'For instance'
      ],
      quickRecap: 'Opinion phrases: "From my perspective", "I would argue that", "I firmly believe". Agreement: "I absolutely agree", "That\'s a valid point". Disagreement: "I see your point, but", "I\'m not entirely convinced". Reasons: "The main reason is", "This is primarily because". Examples: "For instance", "To illustrate". Use variety!',
      collocations: [
        'from my perspective', 'I would argue', 'it seems to me', 'I firmly believe',
        'in my view', 'I tend to think', 'I see your point', 'that\'s a valid point',
        'the main reason', 'for instance', 'to illustrate', 'all things considered'
      ],
      synonyms: [
        { word: 'I think', synonyms: ['I believe', 'In my opinion', 'From my perspective', 'I would argue'] },
        { word: 'I agree', synonyms: ['I concur', 'Absolutely', 'That\'s a valid point', 'I share that view'] },
        { word: 'because', synonyms: ['due to', 'owing to', 'as a result of', 'on account of'] }
      ],
      speakingLines: [
        'From my perspective, this is a complex issue that requires careful consideration.',
        'I would argue that the benefits significantly outweigh the potential drawbacks.',
        'While I understand the opposing viewpoint, I firmly believe that education is the key solution.'
      ]
    }
  },
  // Band Upgrade: 6 to 7
  {
    id: 'vocab-upgrade-6to7',
    title: 'Band 6 to 7 Vocabulary Upgrade',
    slug: 'band-6-to-7-vocabulary-upgrade',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Band Upgrade',
    description: 'Transform your Band 6 vocabulary into Band 7 expressions with these essential upgrades.',
    is_premium: true,
    is_published: true,
    view_count: 2450,
    created_at: '2024-02-25T10:00:00Z',
    updated_at: '2024-02-25T10:00:00Z',
    estimated_time: 20,
    recommended_order: 1,
    content: {
      title: 'Band 6 to 7 Vocabulary Upgrade',
      targetLevel: 'Band 6.0 - 7.0',
      whatYouWillLearn: [
        'Replace 30 common Band 6 words with Band 7 alternatives',
        'Understand why certain words score higher',
        'Apply upgrades naturally in Writing and Speaking'
      ],
      coreExplanation: `The difference between Band 6 and Band 7 often comes down to vocabulary precision and sophistication. Band 6 candidates use correct but basic vocabulary, while Band 7 candidates use less common words and show awareness of style and collocation.

This lesson provides direct upgrades from common Band 6 words to Band 7 alternatives. The key is not just memorizing fancy words, but understanding when and how to use them naturally. Overusing sophisticated vocabulary can actually lower your score if it sounds unnatural.`,
      examples: [
        { sentence: 'Band 6: "This is a big problem." → Band 7: "This is a significant/substantial issue."', explanation: '"Significant" and "substantial" are more precise than "big".' },
        { sentence: 'Band 6: "Many people think..." → Band 7: "It is widely believed that..."', explanation: 'Impersonal constructions sound more academic.' },
        { sentence: 'Band 6: "This is very important." → Band 7: "This is crucial/essential/vital."', explanation: 'Avoid "very + adjective" - use stronger single words.' },
        { sentence: 'Band 6: "Things have changed a lot." → Band 7: "Significant changes have occurred."', explanation: 'Avoid vague "things" - be specific.' },
        { sentence: 'Band 6: "More and more people..." → Band 7: "An increasing number of people..."', explanation: '"An increasing number" is more formal.' },
        { sentence: 'Band 6: "This is good for..." → Band 7: "This is beneficial for... / This enhances..."', explanation: '"Beneficial" and "enhances" are more sophisticated.' },
        { sentence: 'Band 6: "This is bad for..." → Band 7: "This is detrimental to... / This adversely affects..."', explanation: '"Detrimental" and "adversely affects" are more academic.' },
        { sentence: 'Band 6: "People should..." → Band 7: "Individuals should... / It is advisable to..."', explanation: '"Individuals" is more formal; impersonal structures are academic.' },
        { sentence: 'Band 6: "This shows that..." → Band 7: "This demonstrates/indicates/suggests that..."', explanation: '"Demonstrates", "indicates", "suggests" show different levels of certainty.' },
        { sentence: 'Band 6: "Because of this..." → Band 7: "Consequently... / As a result... / Therefore..."', explanation: 'Formal linking words improve cohesion.' },
        { sentence: 'Band 6: "Also..." → Band 7: "Furthermore... / Moreover... / Additionally..."', explanation: 'Formal additive linkers are more academic.' },
        { sentence: 'Band 6: "But..." → Band 7: "However... / Nevertheless... / Nonetheless..."', explanation: 'Formal contrastive linkers improve your score.' },
        { sentence: 'Band 6: "A lot of..." → Band 7: "A considerable amount of... / Numerous..."', explanation: '"A lot of" is too informal for academic writing.' },
        { sentence: 'Band 6: "Get better" → Band 7: "Improve / Enhance / Ameliorate"', explanation: 'Phrasal verbs are often too informal.' },
        { sentence: 'Band 6: "Get worse" → Band 7: "Deteriorate / Decline / Worsen"', explanation: 'Single verbs are often more academic than phrasal verbs.' },
        { sentence: 'Band 6: "Help" → Band 7: "Assist / Facilitate / Support"', explanation: '"Help" is basic; alternatives show range.' },
        { sentence: 'Band 6: "Use" → Band 7: "Utilize / Employ / Implement"', explanation: '"Use" is acceptable but alternatives show sophistication.' },
        { sentence: 'Band 6: "Need" → Band 7: "Require / Necessitate"', explanation: '"Require" is more formal than "need".' },
        { sentence: 'Band 6: "Give" → Band 7: "Provide / Offer / Supply"', explanation: '"Give" is basic; context determines the best alternative.' },
        { sentence: 'Band 6: "Make" → Band 7: "Create / Produce / Generate / Develop"', explanation: '"Make" is overused; choose precise alternatives.' }
      ],
      commonMistakes: [
        { mistake: 'Overusing sophisticated words unnaturally.', correction: 'Use upgrades only when they fit naturally in context.', explanation: 'Forcing fancy words sounds unnatural and can lower your score.' },
        { mistake: 'Using "very" + adjective repeatedly.', correction: 'Replace with stronger single words: very big → substantial, very important → crucial.', explanation: '"Very" + adjective is a Band 6 pattern.' },
        { mistake: 'Starting sentences with "And" or "But".', correction: 'Use "Furthermore/Moreover" for addition, "However/Nevertheless" for contrast.', explanation: 'Formal linkers are expected in academic writing.' },
        { mistake: 'Using "things" as a noun.', correction: 'Be specific: "factors", "aspects", "elements", "issues".', explanation: '"Things" is too vague for academic writing.' },
        { mistake: 'Using "get" in formal writing.', correction: 'Replace with specific verbs: get better → improve, get worse → deteriorate.', explanation: '"Get" is too informal for academic contexts.' }
      ],
      miniPractice: [
        { question: 'Upgrade: "This is a very big problem."', type: 'rewrite' },
        { question: 'Which is the Band 7 alternative to "many people think"?', options: ['It is widely believed that', 'Lots of people think', 'Many persons think', 'People mostly think'], type: 'multiple-choice' },
        { question: 'Upgrade: "Things have got worse."', type: 'rewrite' },
        { question: 'Upgrade: "Also, this helps the economy."', type: 'rewrite' },
        { question: 'Which word should replace "very important"?', options: ['crucial', 'very crucial', 'more important', 'most important'], type: 'multiple-choice' }
      ],
      answerKey: [
        'This is a significant/substantial issue. / This poses a considerable challenge.',
        'It is widely believed that',
        'The situation has deteriorated. / Conditions have worsened considerably.',
        'Furthermore/Moreover, this benefits/enhances the economy.',
        'crucial'
      ],
      quickRecap: 'Key upgrades: big → significant/substantial, important → crucial/vital, good → beneficial, bad → detrimental, many → numerous, also → furthermore/moreover, but → however/nevertheless, get better → improve, get worse → deteriorate. Avoid "very + adjective" and vague words like "things"!',
      collocations: [
        'significant impact', 'substantial evidence', 'crucial role', 'detrimental effects',
        'beneficial outcomes', 'considerable amount', 'increasing number', 'widely believed',
        'adversely affect', 'demonstrate clearly', 'indicate strongly', 'suggest strongly'
      ],
      synonyms: [
        { word: 'big', synonyms: ['significant', 'substantial', 'considerable', 'major'] },
        { word: 'important', synonyms: ['crucial', 'vital', 'essential', 'critical'] },
        { word: 'good', synonyms: ['beneficial', 'advantageous', 'favorable', 'positive'] }
      ],
      speakingLines: [
        'This is a significant issue that requires immediate attention.',
        'It is widely believed that education plays a crucial role in economic development.',
        'Furthermore, this approach has proven beneficial in numerous countries.'
      ]
    }
  },
  // Band Upgrade: 7 to 8
  {
    id: 'vocab-upgrade-7to8',
    title: 'Band 7 to 8 Precision Vocabulary',
    slug: 'band-7-to-8-precision-vocabulary',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Band Upgrade',
    description: 'Achieve Band 8 with precise, nuanced vocabulary that demonstrates sophisticated language control.',
    is_premium: true,
    is_published: true,
    view_count: 1890,
    created_at: '2024-02-28T10:00:00Z',
    updated_at: '2024-02-28T10:00:00Z',
    estimated_time: 25,
    recommended_order: 2,
    content: {
      title: 'Band 7 to 8 Precision Vocabulary',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 precise, nuanced words for Band 8+ writing',
        'Understand subtle differences between similar words',
        'Use hedging and boosting language appropriately'
      ],
      coreExplanation: `The difference between Band 7 and Band 8 is precision and nuance. Band 7 candidates use sophisticated vocabulary correctly, but Band 8 candidates choose exactly the right word for the context and show awareness of subtle differences in meaning.

This lesson focuses on precision - choosing between similar words based on context, using hedging language to show academic caution, and demonstrating sophisticated control of register. Band 8 writing sounds natural and precise, never forced or overwritten.`,
      examples: [
        { sentence: 'The evidence suggests (not proves) a correlation between the variables.', explanation: '"Suggests" is appropriately cautious; "proves" is too strong for most research.' },
        { sentence: 'This phenomenon is prevalent (not common) in urban areas.', explanation: '"Prevalent" implies widespread occurrence; "common" is less precise.' },
        { sentence: 'The policy has exacerbated (not worsened) existing inequalities.', explanation: '"Exacerbated" specifically means made worse; more precise than "worsened".' },
        { sentence: 'The findings corroborate (not support) previous research.', explanation: '"Corroborate" means to confirm with evidence; stronger than "support".' },
        { sentence: 'This approach may mitigate (not reduce) the negative effects.', explanation: '"Mitigate" means to make less severe; more precise than "reduce".' },
        { sentence: 'The data indicates a discernible (not clear) trend.', explanation: '"Discernible" means able to be perceived; more nuanced than "clear".' },
        { sentence: 'These factors are inextricably (not closely) linked.', explanation: '"Inextricably" means impossible to separate; stronger than "closely".' },
        { sentence: 'The situation has deteriorated precipitously (not quickly).', explanation: '"Precipitously" implies sudden, steep decline; more vivid than "quickly".' },
        { sentence: 'This represents a paradigm shift (not big change) in thinking.', explanation: '"Paradigm shift" is a fundamental change in approach or assumptions.' },
        { sentence: 'The evidence is compelling (not strong) but not conclusive.', explanation: '"Compelling" means convincing; "conclusive" means definitive.' },
        { sentence: 'These measures are ostensibly (not apparently) designed to help.', explanation: '"Ostensibly" implies doubt about the stated purpose.' },
        { sentence: 'The policy has had unintended (not unexpected) consequences.', explanation: '"Unintended" means not planned; "unexpected" means not anticipated.' },
        { sentence: 'This is a nuanced (not complex) issue requiring careful analysis.', explanation: '"Nuanced" implies subtle distinctions; "complex" implies difficulty.' },
        { sentence: 'The argument is predicated on (not based on) several assumptions.', explanation: '"Predicated on" is more formal and precise than "based on".' },
        { sentence: 'These findings have far-reaching (not big) implications.', explanation: '"Far-reaching" implies wide-ranging effects; more precise than "big".' },
        { sentence: 'The trend appears to be inexorable (not unstoppable).', explanation: '"Inexorable" means impossible to stop or prevent; more sophisticated.' },
        { sentence: 'This constitutes (not is) a significant departure from tradition.', explanation: '"Constitutes" is more formal and precise than "is".' },
        { sentence: 'The evidence is equivocal (not unclear) on this point.', explanation: '"Equivocal" means open to multiple interpretations; more precise.' },
        { sentence: 'These factors are mutually reinforcing (not connected).', explanation: '"Mutually reinforcing" means each strengthens the other.' },
        { sentence: 'The proposal merits (not deserves) serious consideration.', explanation: '"Merits" is more formal than "deserves" in academic contexts.' }
      ],
      commonMistakes: [
        { mistake: 'Using "prove" for research findings.', correction: 'Use "suggest", "indicate", or "demonstrate" - research rarely "proves" anything.', explanation: 'Academic writing requires appropriate hedging.' },
        { mistake: 'Using "very unique" or "most optimal".', correction: '"Unique" and "optimal" are absolute - they cannot be modified.', explanation: 'Some words are absolute and cannot take degree modifiers.' },
        { mistake: 'Confusing "affect" and "effect".', correction: '"Affect" is usually a verb; "effect" is usually a noun (but can be a verb meaning "to bring about").', explanation: 'Precision requires correct word choice.' },
        { mistake: 'Using "literally" for emphasis.', correction: 'Use "literally" only for actual, non-figurative meaning.', explanation: 'Misusing "literally" undermines precision.' },
        { mistake: 'Overusing hedging language.', correction: 'Balance hedging with assertive statements where evidence is strong.', explanation: 'Too much hedging makes writing weak and uncertain.' }
      ],
      miniPractice: [
        { question: 'Choose the more precise word: "The evidence (suggests/proves) a link between the factors."', type: 'fill-blank' },
        { question: 'Which word means "to make worse"?', options: ['exacerbate', 'ameliorate', 'mitigate', 'alleviate'], type: 'multiple-choice' },
        { question: 'Rewrite with more precision: "This is a very big change in how people think."', type: 'rewrite' },
        { question: 'Choose the more precise word: "These factors are (closely/inextricably) linked."', type: 'fill-blank' },
        { question: 'Which word implies doubt about a stated purpose?', options: ['ostensibly', 'apparently', 'evidently', 'clearly'], type: 'multiple-choice' }
      ],
      answerKey: [
        'suggests',
        'exacerbate',
        'This represents a paradigm shift in thinking. / This constitutes a fundamental change in perspective.',
        'inextricably',
        'ostensibly'
      ],
      quickRecap: 'Band 8 precision: suggests (not proves), prevalent (not common), exacerbate (not worsen), corroborate (not support), mitigate (not reduce), discernible (not clear), inextricably (not closely), paradigm shift (not big change). Use hedging appropriately and choose words for their precise meaning!',
      collocations: [
        'compelling evidence', 'paradigm shift', 'far-reaching implications', 'nuanced understanding',
        'predicated on', 'mutually reinforcing', 'inextricably linked', 'discernible trend',
        'precipitous decline', 'unintended consequences', 'equivocal evidence', 'merits consideration'
      ],
      synonyms: [
        { word: 'suggest', synonyms: ['indicate', 'imply', 'point to', 'hint at'] },
        { word: 'worsen', synonyms: ['exacerbate', 'aggravate', 'compound', 'intensify'] },
        { word: 'reduce', synonyms: ['mitigate', 'alleviate', 'diminish', 'lessen'] }
      ],
      speakingLines: [
        'The evidence suggests, though does not conclusively prove, a correlation between these factors.',
        'This represents a paradigm shift in how we approach environmental policy.',
        'These issues are inextricably linked and cannot be addressed in isolation.'
      ]
    }
  },
  // Science & Research
  {
    id: 'vocab-science-1',
    title: 'Science & Research Vocabulary',
    slug: 'science-research-vocabulary',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Science',
    description: 'Essential vocabulary for discussing scientific research, discoveries, and methodology in IELTS.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
    content: {
      title: 'Science & Research Vocabulary',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 scientific and research terms for IELTS',
        'Discuss research methodology and findings accurately',
        'Use appropriate hedging language for scientific claims'
      ],
      coreExplanation: `Science and research topics appear frequently in IELTS Reading and Writing. To achieve Band 7+, you need vocabulary that allows you to discuss scientific methodology, research findings, and technological developments accurately.

This lesson introduces precise scientific vocabulary that demonstrates your ability to discuss research processes, evaluate evidence, and present findings appropriately. The key is using hedging language correctly - science rarely "proves" things definitively.`,
      examples: [
        { sentence: 'The hypothesis was tested through rigorous experimentation.', explanation: '"Hypothesis" is a proposed explanation; "rigorous" means thorough and careful.' },
        { sentence: 'Empirical evidence supports the theoretical framework.', explanation: '"Empirical" means based on observation; "theoretical framework" is the underlying theory.' },
        { sentence: 'The findings have been replicated in subsequent studies.', explanation: '"Replicated" means reproduced; essential for scientific validity.' },
        { sentence: 'The methodology employed ensures reliable results.', explanation: '"Methodology" is the system of methods used in research.' },
        { sentence: 'A correlation was observed between the two variables.', explanation: '"Correlation" is a relationship; does not imply causation.' },
        { sentence: 'The data was analyzed using quantitative methods.', explanation: '"Quantitative" involves numerical data; contrasts with "qualitative".' },
        { sentence: 'The sample size was sufficient for statistical significance.', explanation: '"Sample size" is the number of subjects; "statistical significance" means results are unlikely due to chance.' },
        { sentence: 'The study controlled for confounding variables.', explanation: '"Confounding variables" are factors that might affect results.' },
        { sentence: 'Peer review ensures the quality of published research.', explanation: '"Peer review" is evaluation by other experts in the field.' },
        { sentence: 'The findings challenge prevailing assumptions in the field.', explanation: '"Prevailing assumptions" are currently accepted beliefs.' },
        { sentence: 'Longitudinal studies track changes over extended periods.', explanation: '"Longitudinal" means over a long time period.' },
        { sentence: 'The research yielded unexpected insights.', explanation: '"Yielded" means produced; "insights" are deep understandings.' },
        { sentence: 'Causation cannot be inferred from correlation alone.', explanation: '"Causation" is cause-and-effect; "inferred" means concluded.' },
        { sentence: 'The experiment was conducted under controlled conditions.', explanation: '"Controlled conditions" minimize external influences.' },
        { sentence: 'Preliminary findings suggest further investigation is warranted.', explanation: '"Preliminary" means initial; "warranted" means justified.' },
        { sentence: 'The theory has been substantiated by multiple studies.', explanation: '"Substantiated" means supported with evidence.' },
        { sentence: 'Anomalies in the data require further explanation.', explanation: '"Anomalies" are irregularities or unexpected results.' },
        { sentence: 'The research has practical applications in medicine.', explanation: '"Practical applications" are real-world uses.' },
        { sentence: 'Scientific consensus supports the theory of climate change.', explanation: '"Scientific consensus" is general agreement among scientists.' },
        { sentence: 'The breakthrough has revolutionized the field.', explanation: '"Breakthrough" is a major discovery or achievement.' }
      ],
      commonMistakes: [
        { mistake: 'The study proves that X causes Y.', correction: 'The study suggests/indicates that X may contribute to Y.', explanation: 'Research rarely "proves" causation; use hedging language.' },
        { mistake: 'Scientists found that...', correction: 'Research indicates that... / Studies suggest that...', explanation: 'Impersonal constructions are more academic.' },
        { mistake: 'The experiment showed clear results.', correction: 'The experiment yielded statistically significant results.', explanation: 'Be specific about what "clear" means.' },
        { mistake: 'This is a fact.', correction: 'This is supported by substantial evidence. / This is widely accepted.', explanation: 'Scientific knowledge is provisional; avoid absolute claims.' },
        { mistake: 'Correlation means causation.', correction: 'Correlation does not imply causation; further research is needed.', explanation: 'A fundamental distinction in scientific reasoning.' }
      ],
      miniPractice: [
        { question: 'The _____ was tested through controlled experiments.', type: 'fill-blank' },
        { question: 'Which term describes evidence based on observation rather than theory?', options: ['empirical', 'theoretical', 'hypothetical', 'speculative'], type: 'multiple-choice' },
        { question: 'Rewrite: "The study proves that exercise makes people healthier."', type: 'rewrite' },
        { question: '_____ cannot be inferred from correlation alone.', type: 'fill-blank' },
        { question: 'Which process ensures quality of published research?', options: ['peer review', 'data analysis', 'hypothesis testing', 'sample selection'], type: 'multiple-choice' }
      ],
      answerKey: [
        'hypothesis',
        'empirical',
        'The study suggests that exercise may contribute to improved health outcomes. / Research indicates a correlation between exercise and health.',
        'Causation',
        'peer review'
      ],
      quickRecap: 'Key terms: "hypothesis", "empirical evidence", "methodology", "correlation vs causation", "statistical significance", "peer review", "longitudinal study", "scientific consensus". Remember: use hedging language - research "suggests" or "indicates", rarely "proves"!',
      collocations: [
        'empirical evidence', 'theoretical framework', 'research methodology', 'statistical significance',
        'peer review', 'longitudinal study', 'controlled experiment', 'scientific consensus',
        'preliminary findings', 'practical applications', 'confounding variables', 'sample size'
      ],
      synonyms: [
        { word: 'prove', synonyms: ['demonstrate', 'indicate', 'suggest', 'support'] },
        { word: 'find', synonyms: ['discover', 'observe', 'identify', 'detect'] },
        { word: 'study', synonyms: ['research', 'investigation', 'analysis', 'examination'] }
      ],
      speakingLines: [
        'The empirical evidence suggests a strong correlation, though causation cannot be definitively established.',
        'Peer-reviewed research indicates that this approach may be effective.',
        'While preliminary findings are promising, further investigation is warranted.'
      ]
    }
  },
  // Academic Collocations: Adjective + Noun
  {
    id: 'vocab-colloc-2',
    title: 'Academic Collocations: Adjective + Noun',
    slug: 'academic-collocations-adjective-noun',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Collocations',
    description: 'Master essential adjective + noun collocations for sophisticated academic writing.',
    is_premium: true,
    is_published: true,
    view_count: 1320,
    created_at: '2024-03-05T10:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
    content: {
      title: 'Academic Collocations: Adjective + Noun',
      targetLevel: 'Band 7.0 - 9.0',
      whatYouWillLearn: [
        'Master 30 essential adjective + noun collocations',
        'Replace basic adjectives with academic alternatives',
        'Sound more sophisticated in IELTS Writing'
      ],
      coreExplanation: `Adjective + noun collocations are crucial for academic writing. Using the right adjective with a noun shows lexical sophistication and natural language use. Band 8+ candidates use these collocations effortlessly.

This lesson focuses on common academic collocations that instantly upgrade your writing. Instead of "big impact," use "significant impact." Instead of "main reason," use "primary reason." These combinations sound natural to native speakers and demonstrate advanced vocabulary.`,
      examples: [
        { sentence: 'This has significant implications for future research.', explanation: '"Significant implications" - not "big implications" or "important implications".' },
        { sentence: 'There is compelling evidence to support this claim.', explanation: '"Compelling evidence" - stronger than "strong evidence".' },
        { sentence: 'The primary objective is to improve efficiency.', explanation: '"Primary objective" - more formal than "main goal".' },
        { sentence: 'This represents a fundamental shift in approach.', explanation: '"Fundamental shift" - not "basic shift" or "big shift".' },
        { sentence: 'The underlying causes are complex and interconnected.', explanation: '"Underlying causes" - the root or hidden causes.' },
        { sentence: 'This is a crucial factor in determining success.', explanation: '"Crucial factor" - not "important factor" (though acceptable).' },
        { sentence: 'The inherent limitations of this approach must be acknowledged.', explanation: '"Inherent limitations" - limitations that are built-in or natural.' },
        { sentence: 'There has been a marked increase in demand.', explanation: '"Marked increase" - noticeable, significant increase.' },
        { sentence: 'This requires a comprehensive analysis of the data.', explanation: '"Comprehensive analysis" - thorough, complete analysis.' },
        { sentence: 'The adverse effects have been well documented.', explanation: '"Adverse effects" - negative effects (formal).' },
        { sentence: 'This is a contentious issue with no easy solutions.', explanation: '"Contentious issue" - controversial, disputed issue.' },
        { sentence: 'The empirical evidence supports this theory.', explanation: '"Empirical evidence" - evidence from observation/experiment.' },
        { sentence: 'This has profound implications for society.', explanation: '"Profound implications" - deep, far-reaching implications.' },
        { sentence: 'The prevailing view is that intervention is necessary.', explanation: '"Prevailing view" - the dominant or most common view.' },
        { sentence: 'This poses a formidable challenge for policymakers.', explanation: '"Formidable challenge" - difficult, intimidating challenge.' },
        { sentence: 'There is a growing consensus on this issue.', explanation: '"Growing consensus" - increasing agreement.' },
        { sentence: 'The tangible benefits are clear to see.', explanation: '"Tangible benefits" - concrete, measurable benefits.' },
        { sentence: 'This requires a nuanced understanding of the context.', explanation: '"Nuanced understanding" - subtle, sophisticated understanding.' },
        { sentence: 'The pivotal role of education cannot be overstated.', explanation: '"Pivotal role" - central, crucial role.' },
        { sentence: 'This is an unprecedented situation requiring urgent action.', explanation: '"Unprecedented situation" - never happened before.' }
      ],
      commonMistakes: [
        { mistake: 'This has big implications.', correction: 'This has significant/profound implications.', explanation: '"Big" is too informal; use "significant" or "profound".' },
        { mistake: 'The main reason is...', correction: 'The primary/principal reason is...', explanation: '"Primary" or "principal" are more formal than "main".' },
        { mistake: 'There is strong evidence.', correction: 'There is compelling/substantial evidence.', explanation: '"Compelling" or "substantial" are more sophisticated.' },
        { mistake: 'This is an important factor.', correction: 'This is a crucial/critical factor.', explanation: '"Crucial" or "critical" are stronger than "important".' },
        { mistake: 'The bad effects are clear.', correction: 'The adverse/detrimental effects are evident.', explanation: '"Adverse" or "detrimental" are academic; "evident" is better than "clear".' }
      ],
      miniPractice: [
        { question: 'This has _____ implications for future policy. (significant/big)', type: 'fill-blank' },
        { question: 'Which adjective best collocates with "evidence"?', options: ['compelling', 'strong', 'big', 'good'], type: 'multiple-choice' },
        { question: 'Rewrite: "The main problem is the bad effects on health."', type: 'rewrite' },
        { question: 'There has been a _____ increase in awareness. (marked/big)', type: 'fill-blank' },
        { question: 'Which collocation is most academic?', options: ['fundamental shift', 'big change', 'main shift', 'large change'], type: 'multiple-choice' }
      ],
      answerKey: [
        'significant',
        'compelling',
        'The primary concern is the adverse/detrimental effects on health.',
        'marked',
        'fundamental shift'
      ],
      quickRecap: 'Key collocations: significant implications, compelling evidence, primary objective, fundamental shift, underlying causes, crucial factor, inherent limitations, marked increase, comprehensive analysis, adverse effects, contentious issue, profound implications. Replace "big/main/important" with these sophisticated alternatives!',
      collocations: [
        'significant implications', 'compelling evidence', 'primary objective', 'fundamental shift',
        'underlying causes', 'crucial factor', 'inherent limitations', 'marked increase',
        'comprehensive analysis', 'adverse effects', 'contentious issue', 'profound implications',
        'prevailing view', 'formidable challenge', 'tangible benefits', 'pivotal role'
      ],
      synonyms: [
        { word: 'big', synonyms: ['significant', 'substantial', 'considerable', 'marked'] },
        { word: 'main', synonyms: ['primary', 'principal', 'fundamental', 'key'] },
        { word: 'bad', synonyms: ['adverse', 'detrimental', 'negative', 'harmful'] }
      ],
      speakingLines: [
        'This has significant implications for how we approach the problem.',
        'The compelling evidence suggests that immediate action is necessary.',
        'Understanding the underlying causes is crucial for developing effective solutions.'
      ]
    }
  },
  // Education Topic Expansion - Band 6.5-7.0
  {
    id: 'vocab-education-2',
    title: 'Education Systems & School Life',
    slug: 'education-systems-school-life',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Education',
    description: 'Essential vocabulary for discussing education systems, school environments, and student experiences in IELTS.',
    is_premium: false,
    is_published: true,
    view_count: 0,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
    content: {
      title: 'Education Systems & School Life',
      targetLevel: 'Band 6.5 - 7.0',
      whatYouWillLearn: [
        'Use 25 essential education vocabulary for IELTS',
        'Discuss school systems and student experiences confidently',
        'Apply education vocabulary in Writing Task 2 and Speaking'
      ],
      coreExplanation: `Education is one of the most common IELTS topics. To score Band 6.5-7.0, you need vocabulary that goes beyond basic words like "school" and "teacher."

This lesson introduces foundational education vocabulary that helps you discuss school systems, learning environments, and student experiences. Focus on using these words naturally - don't force complex vocabulary where simple words work better.`,
      examples: [
        { sentence: 'Compulsory education ensures all children receive basic schooling.', explanation: '"Compulsory" means required by law - key term for education discussions.' },
        { sentence: 'The enrollment rate has increased significantly in developing countries.', explanation: '"Enrollment" is the process of registering for school or courses.' },
        { sentence: 'Students face considerable pressure to achieve high grades.', explanation: '"Considerable pressure" is a natural collocation for academic stress.' },
        { sentence: 'The school provides extracurricular activities to develop students holistically.', explanation: '"Extracurricular" means activities outside the regular curriculum.' },
        { sentence: 'Tuition fees have risen dramatically in recent years.', explanation: '"Tuition fees" are charges for instruction, especially at universities.' },
        { sentence: 'The literacy rate reflects the quality of basic education.', explanation: '"Literacy rate" is the percentage of people who can read and write.' },
        { sentence: 'Vocational training prepares students for specific careers.', explanation: '"Vocational" relates to practical job skills rather than academic study.' },
        { sentence: 'The dropout rate remains a concern in many regions.', explanation: '"Dropout rate" is the percentage of students who leave school early.' },
        { sentence: 'Inclusive education accommodates students with diverse needs.', explanation: '"Inclusive education" means education that includes all students regardless of ability.' },
        { sentence: 'The syllabus outlines the topics covered in each subject.', explanation: '"Syllabus" is the detailed plan of what will be taught in a course.' },
        { sentence: 'Academic pressure can negatively affect student wellbeing.', explanation: '"Academic pressure" refers to stress from educational demands.' },
        { sentence: 'The grading system varies between different countries.', explanation: '"Grading system" is the method used to evaluate student performance.' },
        { sentence: 'Scholarships enable talented students from low-income families to pursue higher education.', explanation: '"Scholarships" are financial awards for students based on merit or need.' },
        { sentence: 'The teacher-student ratio affects the quality of instruction.', explanation: '"Teacher-student ratio" is the number of students per teacher.' },
        { sentence: 'Distance learning has become more prevalent since the pandemic.', explanation: '"Distance learning" is education conducted remotely, not in a classroom.' },
        { sentence: 'The examination system determines university admissions.', explanation: '"Examination system" refers to the structure of tests and assessments.' },
        { sentence: 'Primary education lays the foundation for future learning.', explanation: '"Primary education" is elementary/basic schooling for young children.' },
        { sentence: 'Secondary education prepares students for higher education or employment.', explanation: '"Secondary education" is middle and high school level education.' },
        { sentence: 'Tertiary education includes universities and colleges.', explanation: '"Tertiary education" is post-secondary education at universities/colleges.' },
        { sentence: 'The school facilities include a library, laboratory, and sports complex.', explanation: '"Facilities" are buildings and equipment provided for a particular purpose.' },
        { sentence: 'Peer learning encourages students to learn from each other.', explanation: '"Peer learning" is learning with and from fellow students.' },
        { sentence: 'The attendance rate indicates student engagement with school.', explanation: '"Attendance rate" is the percentage of students present at school.' },
        { sentence: 'Homework assignments reinforce classroom learning.', explanation: '"Assignments" are tasks given to students to complete.' },
        { sentence: 'The academic year is divided into two semesters.', explanation: '"Academic year" is the annual period of instruction at schools.' },
        { sentence: 'Student performance is assessed through various methods.', explanation: '"Performance" refers to how well students do in their studies.' }
      ],
      commonMistakes: [
        { mistake: 'Children must go to school.', correction: 'Compulsory education requires children to attend school.', explanation: 'Use "compulsory education" for formal discussions about mandatory schooling.' },
        { mistake: 'Many students stop studying.', correction: 'The dropout rate remains high in certain regions.', explanation: 'Use "dropout rate" when discussing students leaving school early.' },
        { mistake: 'School costs a lot of money.', correction: 'Tuition fees have increased substantially.', explanation: 'Use "tuition fees" specifically for education costs.' },
        { mistake: 'Students do activities after school.', correction: 'Students participate in extracurricular activities.', explanation: '"Extracurricular activities" is the proper term for after-school programs.' },
        { mistake: 'The school has good things.', correction: 'The school has excellent facilities / is well-equipped.', explanation: 'Use "facilities" or "well-equipped" instead of vague "good things".' }
      ],
      miniPractice: [
        { question: '_____ education is mandatory for all children in most countries.', type: 'fill-blank' },
        { question: 'Which term describes education at universities and colleges?', options: ['primary', 'secondary', 'tertiary', 'vocational'], type: 'multiple-choice' },
        { question: 'Rewrite: "Many students leave school before finishing."', type: 'rewrite' },
        { question: 'The _____ rate measures the percentage of people who can read and write.', type: 'fill-blank' },
        { question: 'Which collocation is most natural?', options: ['tuition fees', 'tuition costs', 'tuition money', 'tuition price'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Compulsory',
        'tertiary',
        'The dropout rate remains a significant concern. / Many students fail to complete their education.',
        'literacy',
        'tuition fees'
      ],
      quickRecap: 'Key terms: "compulsory education", "enrollment", "tuition fees", "extracurricular activities", "vocational training", "dropout rate", "literacy rate". Remember: "tertiary" for university level, "primary" for elementary, "secondary" for high school. Use these for clear education discussions!',
      collocations: [
        'compulsory education', 'enrollment rate', 'tuition fees', 'extracurricular activities',
        'vocational training', 'dropout rate', 'literacy rate', 'academic pressure',
        'grading system', 'teacher-student ratio', 'distance learning', 'peer learning'
      ],
      synonyms: [
        { word: 'school', synonyms: ['educational institution', 'academy', 'establishment'] },
        { word: 'student', synonyms: ['learner', 'pupil', 'scholar'] },
        { word: 'teacher', synonyms: ['educator', 'instructor', 'tutor'] }
      ],
      speakingLines: [
        'In my country, compulsory education covers ages 6 to 16.',
        'I think extracurricular activities are essential for developing well-rounded students.',
        'The rising tuition fees make higher education inaccessible for many families.'
      ]
    }
  },
  // Education Topic Expansion - Band 7.0-8.0
  {
    id: 'vocab-education-3',
    title: 'Educational Philosophy & Teaching Methods',
    slug: 'educational-philosophy-teaching-methods',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Education',
    description: 'Advanced vocabulary for discussing educational theories, teaching methodologies, and learning approaches in IELTS.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
    content: {
      title: 'Educational Philosophy & Teaching Methods',
      targetLevel: 'Band 7.0 - 8.0',
      whatYouWillLearn: [
        'Master 25 advanced education terms for Band 7-8 writing',
        'Discuss teaching methodologies and learning theories confidently',
        'Analyze educational approaches with sophisticated vocabulary'
      ],
      coreExplanation: `To achieve Band 7-8 in IELTS, you need vocabulary that allows you to discuss education at a deeper level - not just describing systems, but analyzing teaching methods, learning theories, and educational philosophies.

This lesson introduces vocabulary for discussing how education works, why certain approaches are effective, and how learning can be optimized. These terms demonstrate analytical thinking and academic sophistication.`,
      examples: [
        { sentence: 'Student-centered learning shifts focus from teacher instruction to learner engagement.', explanation: '"Student-centered" means focusing on student needs rather than teacher-led instruction.' },
        { sentence: 'Constructivist approaches encourage students to build knowledge through experience.', explanation: '"Constructivist" is a learning theory where learners construct understanding actively.' },
        { sentence: 'Differentiated instruction addresses diverse learning needs within a classroom.', explanation: '"Differentiated instruction" means adapting teaching to different student abilities.' },
        { sentence: 'Formative assessment provides ongoing feedback during the learning process.', explanation: '"Formative assessment" is continuous evaluation to guide learning, not just final grades.' },
        { sentence: 'Summative assessment evaluates learning at the end of an instructional period.', explanation: '"Summative assessment" is final evaluation like exams or projects.' },
        { sentence: 'Scaffolding provides temporary support to help students master new concepts.', explanation: '"Scaffolding" is structured support that is gradually removed as students progress.' },
        { sentence: 'Inquiry-based learning encourages students to ask questions and investigate.', explanation: '"Inquiry-based" means learning through questioning and exploration.' },
        { sentence: 'Experiential learning emphasizes learning through direct experience.', explanation: '"Experiential learning" is hands-on learning by doing.' },
        { sentence: 'Blended learning combines traditional classroom instruction with online components.', explanation: '"Blended learning" mixes face-to-face and digital learning.' },
        { sentence: 'The flipped classroom model reverses traditional teaching by delivering content online.', explanation: '"Flipped classroom" means students learn content at home and practice in class.' },
        { sentence: 'Metacognition involves thinking about one\'s own learning processes.', explanation: '"Metacognition" is awareness and understanding of one\'s own thought processes.' },
        { sentence: 'Intrinsic motivation drives learning through internal satisfaction.', explanation: '"Intrinsic motivation" comes from within, not external rewards.' },
        { sentence: 'Extrinsic motivation relies on external rewards such as grades or praise.', explanation: '"Extrinsic motivation" comes from outside factors like rewards or recognition.' },
        { sentence: 'Collaborative learning fosters teamwork and shared knowledge construction.', explanation: '"Collaborative learning" involves students working together to learn.' },
        { sentence: 'Project-based learning engages students in real-world problem solving.', explanation: '"Project-based learning" uses projects as the main vehicle for learning.' },
        { sentence: 'Learning outcomes define what students should know after instruction.', explanation: '"Learning outcomes" are specific goals for what students will achieve.' },
        { sentence: 'Pedagogical approaches vary significantly across different cultures.', explanation: '"Pedagogical" relates to teaching methods and practices.' },
        { sentence: 'Autonomous learning develops students\' ability to direct their own education.', explanation: '"Autonomous learning" is self-directed, independent learning.' },
        { sentence: 'Cognitive development theories inform how curricula are designed.', explanation: '"Cognitive development" relates to how thinking abilities grow over time.' },
        { sentence: 'Holistic education addresses intellectual, emotional, and social development.', explanation: '"Holistic education" considers the whole person, not just academics.' },
        { sentence: 'Competency-based education focuses on mastering specific skills.', explanation: '"Competency-based" means progressing by demonstrating skills, not time spent.' },
        { sentence: 'Reflective practice encourages educators to analyze their teaching methods.', explanation: '"Reflective practice" is thoughtful consideration of one\'s professional actions.' },
        { sentence: 'Personalized learning tailors education to individual student needs.', explanation: '"Personalized learning" customizes pace, approach, and content for each student.' },
        { sentence: 'Active learning requires students to engage meaningfully with material.', explanation: '"Active learning" involves participation rather than passive listening.' },
        { sentence: 'The zone of proximal development describes what learners can achieve with guidance.', explanation: '"Zone of proximal development" is the gap between independent and assisted ability.' }
      ],
      commonMistakes: [
        { mistake: 'Teachers should use different teaching ways.', correction: 'Educators should employ differentiated instruction / varied pedagogical approaches.', explanation: 'Use "differentiated instruction" or "pedagogical approaches" for teaching methods.' },
        { mistake: 'Students learn better when they do things.', correction: 'Experiential learning enhances knowledge retention and engagement.', explanation: 'Use "experiential learning" for hands-on learning approaches.' },
        { mistake: 'Tests at the end show what students learned.', correction: 'Summative assessments evaluate student achievement at the conclusion of instruction.', explanation: 'Use "summative assessment" for final evaluations.' },
        { mistake: 'Students should think about how they learn.', correction: 'Developing metacognitive skills enables students to monitor their own learning.', explanation: 'Use "metacognition" or "metacognitive skills" for thinking about thinking.' },
        { mistake: 'Students work together to learn.', correction: 'Collaborative learning fosters peer interaction and shared knowledge construction.', explanation: 'Use "collaborative learning" and explain its benefits specifically.' }
      ],
      miniPractice: [
        { question: '_____ assessment provides ongoing feedback during the learning process.', type: 'fill-blank' },
        { question: 'Which term describes learning that focuses on student needs rather than teacher instruction?', options: ['teacher-centered', 'student-centered', 'content-centered', 'exam-centered'], type: 'multiple-choice' },
        { question: 'Rewrite: "Students learn by doing things themselves."', type: 'rewrite' },
        { question: '_____ motivation comes from internal satisfaction rather than external rewards.', type: 'fill-blank' },
        { question: 'Which approach combines online and face-to-face instruction?', options: ['distance learning', 'blended learning', 'traditional learning', 'autonomous learning'], type: 'multiple-choice' }
      ],
      answerKey: [
        'Formative',
        'student-centered',
        'Experiential learning enables students to construct knowledge through direct experience.',
        'Intrinsic',
        'blended learning'
      ],
      quickRecap: 'Key terms: "student-centered learning", "differentiated instruction", "formative/summative assessment", "scaffolding", "metacognition", "intrinsic/extrinsic motivation", "blended learning". These terms show you can analyze HOW education works, not just describe it!',
      collocations: [
        'student-centered learning', 'differentiated instruction', 'formative assessment', 'summative assessment',
        'inquiry-based learning', 'experiential learning', 'blended learning', 'flipped classroom',
        'intrinsic motivation', 'collaborative learning', 'learning outcomes', 'autonomous learning'
      ],
      synonyms: [
        { word: 'teaching', synonyms: ['instruction', 'pedagogy', 'education', 'tutoring'] },
        { word: 'method', synonyms: ['approach', 'methodology', 'technique', 'strategy'] },
        { word: 'test', synonyms: ['assessment', 'evaluation', 'examination', 'appraisal'] }
      ],
      speakingLines: [
        'I believe student-centered learning is more effective than traditional lecture-based instruction.',
        'Formative assessment helps teachers identify gaps in understanding before final exams.',
        'Developing metacognitive skills enables students to become more effective, independent learners.'
      ]
    }
  },
  // Education Topic Expansion - Band 8.0-9.0
  {
    id: 'vocab-education-4',
    title: 'Education Policy & Systemic Reform',
    slug: 'education-policy-systemic-reform',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Education',
    description: 'Sophisticated vocabulary for analyzing education policy, systemic reform, and global educational challenges at Band 8-9 level.',
    is_premium: true,
    is_published: true,
    view_count: 0,
    created_at: '2024-03-03T10:00:00Z',
    updated_at: '2024-03-03T10:00:00Z',
    content: {
      title: 'Education Policy & Systemic Reform',
      targetLevel: 'Band 8.0 - 9.0',
      whatYouWillLearn: [
        'Master 25 sophisticated education policy terms for Band 8-9',
        'Analyze systemic educational challenges with precision',
        'Discuss global education trends and reforms authoritatively'
      ],
      coreExplanation: `Band 8-9 candidates demonstrate the ability to discuss education at a systemic and policy level. This requires vocabulary for analyzing how education systems function, why reforms succeed or fail, and how global trends shape educational outcomes.

This lesson introduces terms used by education researchers, policymakers, and analysts. Using these accurately shows you can engage with complex educational debates at the highest level.`,
      examples: [
        { sentence: 'Educational equity ensures all students have access to quality learning opportunities.', explanation: '"Educational equity" means fairness in education, addressing systemic barriers.' },
        { sentence: 'The achievement gap between socioeconomic groups persists despite interventions.', explanation: '"Achievement gap" is the disparity in academic performance between different groups.' },
        { sentence: 'Standardized testing has been criticized for narrowing the curriculum.', explanation: '"Narrowing the curriculum" means focusing only on tested subjects at the expense of others.' },
        { sentence: 'Accountability measures hold schools responsible for student outcomes.', explanation: '"Accountability measures" are systems to ensure schools meet performance standards.' },
        { sentence: 'Decentralization of education gives local authorities more decision-making power.', explanation: '"Decentralization" means transferring control from central to local government.' },
        { sentence: 'The privatization of education raises concerns about accessibility.', explanation: '"Privatization" is the transfer of education from public to private sector.' },
        { sentence: 'Meritocracy assumes that success is based purely on individual ability and effort.', explanation: '"Meritocracy" is a system where advancement is based on talent and achievement.' },
        { sentence: 'Social mobility is often linked to educational attainment.', explanation: '"Social mobility" is the ability to move between social classes, often through education.' },
        { sentence: 'Human capital theory views education as an investment in economic productivity.', explanation: '"Human capital" treats education as developing skills that increase economic value.' },
        { sentence: 'The commodification of education treats learning as a marketable product.', explanation: '"Commodification" means turning education into something bought and sold.' },
        { sentence: 'Credentialism emphasizes formal qualifications over actual competence.', explanation: '"Credentialism" is excessive reliance on academic credentials for employment.' },
        { sentence: 'Educational stratification reproduces social inequalities across generations.', explanation: '"Stratification" is the division of society into hierarchical layers through education.' },
        { sentence: 'Lifelong learning has become essential in the knowledge economy.', explanation: '"Lifelong learning" is continuous education throughout one\'s life.' },
        { sentence: 'The hidden curriculum transmits implicit values and norms.', explanation: '"Hidden curriculum" is the unwritten lessons students learn about behavior and values.' },
        { sentence: 'Grade inflation undermines the validity of academic credentials.', explanation: '"Grade inflation" is the trend of awarding higher grades for the same quality of work.' },
        { sentence: 'Brain drain depletes developing countries of educated professionals.', explanation: '"Brain drain" is the emigration of educated people to other countries.' },
        { sentence: 'Universal access to education remains an elusive goal in many regions.', explanation: '"Universal access" means education available to all, regardless of background.' },
        { sentence: 'Evidence-based policy relies on research to inform educational decisions.', explanation: '"Evidence-based" means decisions grounded in empirical research.' },
        { sentence: 'Stakeholder engagement involves parents, teachers, and communities in reform.', explanation: '"Stakeholders" are all parties with an interest in education outcomes.' },
        { sentence: 'The digital divide creates disparities in access to technology-enhanced learning.', explanation: '"Digital divide" is the gap between those with and without technology access.' },
        { sentence: 'Curriculum standardization ensures consistency but may limit local relevance.', explanation: '"Standardization" means making curricula uniform across different schools.' },
        { sentence: 'Educational attainment correlates strongly with lifetime earnings.', explanation: '"Educational attainment" is the highest level of education completed.' },
        { sentence: 'Systemic reform requires addressing structural barriers to educational success.', explanation: '"Systemic reform" means changing the fundamental structure of education systems.' },
        { sentence: 'The reproduction of inequality occurs when education reinforces existing social hierarchies.', explanation: '"Reproduction of inequality" is when education perpetuates rather than reduces disparities.' },
        { sentence: 'Quality assurance mechanisms maintain educational standards across institutions.', explanation: '"Quality assurance" is the systematic process of ensuring educational standards.' }
      ],
      commonMistakes: [
        { mistake: 'Poor students don\'t do as well as rich students.', correction: 'The achievement gap between students from different socioeconomic backgrounds remains significant.', explanation: 'Use "achievement gap" and "socioeconomic backgrounds" for precise academic discussion.' },
        { mistake: 'Education should be fair for everyone.', correction: 'Educational equity requires addressing systemic barriers that disadvantage certain groups.', explanation: 'Use "educational equity" and explain what fairness actually requires.' },
        { mistake: 'Smart people get better jobs.', correction: 'Meritocratic systems assume that advancement is based on individual ability and effort.', explanation: 'Use "meritocracy" and note it\'s an assumption, not necessarily reality.' },
        { mistake: 'Education helps people earn more money.', correction: 'Human capital theory posits that educational attainment correlates with economic productivity.', explanation: 'Use "human capital theory" and "educational attainment" for sophisticated analysis.' },
        { mistake: 'Schools should be responsible for results.', correction: 'Accountability measures hold educational institutions responsible for student outcomes.', explanation: 'Use "accountability measures" and "student outcomes" for policy discussions.' }
      ],
      miniPractice: [
        { question: 'The _____ gap refers to disparities in academic performance between different student groups.', type: 'fill-blank' },
        { question: 'Which term describes the emigration of educated professionals from developing countries?', options: ['brain drain', 'social mobility', 'credentialism', 'stratification'], type: 'multiple-choice' },
        { question: 'Rewrite: "Education makes society more unequal."', type: 'rewrite' },
        { question: 'Educational _____ ensures all students have fair access to quality learning opportunities.', type: 'fill-blank' },
        { question: 'Which concept treats education as an investment in economic productivity?', options: ['human capital', 'social capital', 'cultural capital', 'financial capital'], type: 'multiple-choice' }
      ],
      answerKey: [
        'achievement',
        'brain drain',
        'Educational stratification can reproduce and perpetuate social inequalities across generations.',
        'equity',
        'human capital'
      ],
      quickRecap: 'Key terms: "educational equity", "achievement gap", "accountability measures", "meritocracy", "social mobility", "human capital", "credentialism", "stratification", "brain drain", "digital divide". These terms enable sophisticated analysis of education as a social and political system!',
      collocations: [
        'educational equity', 'achievement gap', 'accountability measures', 'social mobility',
        'human capital', 'lifelong learning', 'hidden curriculum', 'grade inflation',
        'brain drain', 'digital divide', 'systemic reform', 'quality assurance'
      ],
      synonyms: [
        { word: 'fair', synonyms: ['equitable', 'just', 'impartial', 'unbiased'] },
        { word: 'gap', synonyms: ['disparity', 'divide', 'discrepancy', 'inequality'] },
        { word: 'change', synonyms: ['reform', 'transformation', 'restructuring', 'overhaul'] }
      ],
      speakingLines: [
        'Educational equity requires more than equal resources - it demands addressing systemic barriers.',
        'The achievement gap reflects broader socioeconomic inequalities that schools alone cannot solve.',
        'While meritocracy is an appealing ideal, educational stratification often reproduces existing hierarchies.'
      ]
    }
  },
  // ============================================
  // BATCH 2: Environment & Climate (7 lessons)
  // ============================================
  {
    id: 'vocab-environment-2',
    title: 'Climate Change: Causes & Effects',
    slug: 'climate-change-causes-effects',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Environment',
    description: 'Advanced vocabulary for discussing climate change causes, effects, and scientific evidence in IELTS.',
    is_premium: true,
    is_published: true,
    view_count: 890,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
    content: {
      title: 'Climate Change: Causes & Effects',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 climate change terms for sophisticated discussions',
        'Discuss causes and effects of global warming accurately',
        'Use scientific vocabulary naturally in essays'
      ],
      coreExplanation: `Climate change is one of the most common IELTS topics. To achieve Band 8+, you need vocabulary that demonstrates understanding of the science, causes, and consequences of climate change.

This lesson focuses on precise terminology that allows you to discuss climate issues with scientific accuracy while remaining accessible. Avoid oversimplification while ensuring your language is clear and natural.`,
      examples: [
        { sentence: 'Greenhouse gas emissions are the primary driver of anthropogenic climate change.', explanation: '"Anthropogenic" means caused by humans; "driver" means main cause.' },
        { sentence: 'Rising sea levels threaten coastal communities and low-lying island nations.', explanation: '"Rising sea levels" is a key consequence of global warming.' },
        { sentence: 'Extreme weather events have become more frequent and intense.', explanation: '"Extreme weather events" include hurricanes, floods, droughts.' },
        { sentence: 'The carbon footprint of developed nations far exceeds that of developing countries.', explanation: '"Carbon footprint" is total greenhouse gas emissions.' },
        { sentence: 'Deforestation contributes significantly to carbon dioxide levels in the atmosphere.', explanation: '"Deforestation" is clearing forests; trees absorb CO2.' },
        { sentence: 'Global temperatures have risen by approximately 1.1°C since pre-industrial times.', explanation: '"Pre-industrial times" refers to before widespread industrialization.' },
        { sentence: 'Melting ice caps are accelerating the rate of sea level rise.', explanation: '"Ice caps" are polar ice; "accelerating" means speeding up.' },
        { sentence: 'Ocean acidification poses a severe threat to marine ecosystems.', explanation: '"Ocean acidification" is decreasing pH due to CO2 absorption.' },
        { sentence: 'Climate refugees are displaced by environmental degradation and natural disasters.', explanation: '"Climate refugees" are people forced to migrate due to climate impacts.' },
        { sentence: 'The Paris Agreement aims to limit global warming to 1.5°C above pre-industrial levels.', explanation: '"Paris Agreement" is the 2015 international climate accord.' },
        { sentence: 'Feedback loops can amplify the effects of initial warming.', explanation: '"Feedback loops" are cycles that intensify or reduce effects.' },
        { sentence: 'Biodiversity loss is accelerating due to habitat destruction and climate change.', explanation: '"Biodiversity loss" is decline in species variety.' },
        { sentence: 'Permafrost thawing releases methane, a potent greenhouse gas.', explanation: '"Permafrost" is permanently frozen ground; "potent" means powerful.' },
        { sentence: 'Climate models predict increasingly severe impacts without intervention.', explanation: '"Climate models" are computer simulations of climate systems.' },
        { sentence: 'The scientific consensus on human-caused climate change is overwhelming.', explanation: '"Scientific consensus" is agreement among experts.' }
      ],
      commonMistakes: [
        { mistake: 'The weather is changing because of pollution.', correction: 'Climate patterns are shifting due to greenhouse gas emissions.', explanation: 'Distinguish "weather" (short-term) from "climate" (long-term patterns).' },
        { mistake: 'Global warming makes everywhere hotter.', correction: 'Climate change causes varied regional impacts, including both warming and cooling in different areas.', explanation: 'Climate change effects are complex and varied.' },
        { mistake: 'We need to stop climate change.', correction: 'We need to mitigate climate change and adapt to its inevitable impacts.', explanation: '"Mitigate" (reduce) and "adapt" (adjust) are key terms.' },
        { mistake: 'Carbon dioxide is bad for the environment.', correction: 'Excessive carbon dioxide emissions contribute to the greenhouse effect.', explanation: 'CO2 is natural; the problem is excessive human-caused emissions.' }
      ],
      miniPractice: [
        { question: '_____ gas emissions are the primary cause of global warming.', type: 'fill-blank' },
        { question: 'Which term describes climate change caused by human activities?', options: ['anthropogenic', 'natural', 'cyclical', 'geological'], type: 'multiple-choice' },
        { question: 'Rewrite: "Pollution is making the Earth hotter."', type: 'rewrite' },
        { question: 'The melting of polar _____ contributes to rising sea levels.', type: 'fill-blank' }
      ],
      answerKey: [
        'Greenhouse',
        'anthropogenic',
        'Greenhouse gas emissions are driving global temperature increases / contributing to climate change.',
        'ice caps'
      ],
      quickRecap: 'Key terms: "greenhouse gas emissions", "anthropogenic", "carbon footprint", "sea level rise", "extreme weather events", "climate refugees", "feedback loops", "scientific consensus". Use "mitigate" and "adapt" when discussing solutions!',
      collocations: [
        'greenhouse gas emissions', 'carbon footprint', 'sea level rise', 'extreme weather events',
        'climate refugees', 'feedback loops', 'scientific consensus', 'biodiversity loss',
        'ocean acidification', 'permafrost thawing', 'climate models', 'Paris Agreement'
      ],
      synonyms: [
        { word: 'cause', synonyms: ['driver', 'contributor', 'factor', 'catalyst'] },
        { word: 'effect', synonyms: ['impact', 'consequence', 'outcome', 'result'] },
        { word: 'increase', synonyms: ['rise', 'escalate', 'accelerate', 'intensify'] }
      ],
      speakingLines: [
        'The scientific consensus on anthropogenic climate change is now overwhelming.',
        'Rising sea levels pose an existential threat to low-lying island nations.',
        'We need both mitigation strategies to reduce emissions and adaptation measures to cope with inevitable changes.'
      ]
    }
  },
  {
    id: 'vocab-environment-3',
    title: 'Sustainability & Green Solutions',
    slug: 'sustainability-green-solutions',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Environment',
    description: 'Vocabulary for discussing sustainable development, renewable energy, and environmental solutions.',
    is_premium: true,
    is_published: true,
    view_count: 920,
    created_at: '2024-03-05T10:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
    content: {
      title: 'Sustainability & Green Solutions',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 sustainability and green technology terms',
        'Discuss environmental solutions confidently',
        'Use renewable energy vocabulary accurately'
      ],
      coreExplanation: `Sustainability topics are increasingly common in IELTS as environmental awareness grows. To achieve Band 7+, you need vocabulary that allows you to discuss solutions, not just problems.

This lesson focuses on positive environmental vocabulary - renewable energy, sustainable practices, and green technologies. Being able to discuss solutions demonstrates sophisticated thinking and balanced argumentation.`,
      examples: [
        { sentence: 'Renewable energy sources such as solar and wind power are becoming increasingly cost-effective.', explanation: '"Renewable" means naturally replenished; "cost-effective" means economically viable.' },
        { sentence: 'Sustainable development meets present needs without compromising future generations.', explanation: '"Sustainable development" is the key concept from the UN definition.' },
        { sentence: 'The circular economy aims to eliminate waste through recycling and reuse.', explanation: '"Circular economy" contrasts with linear "take-make-dispose" model.' },
        { sentence: 'Carbon neutrality requires balancing emissions with carbon removal.', explanation: '"Carbon neutrality" means net-zero carbon emissions.' },
        { sentence: 'Green infrastructure includes parks, green roofs, and urban forests.', explanation: '"Green infrastructure" is nature-based solutions in urban areas.' },
        { sentence: 'Electric vehicles are essential for decarbonizing the transport sector.', explanation: '"Decarbonizing" means reducing carbon emissions from a sector.' },
        { sentence: 'Energy efficiency measures can significantly reduce consumption.', explanation: '"Energy efficiency" means using less energy for the same output.' },
        { sentence: 'Biodegradable materials break down naturally without harming the environment.', explanation: '"Biodegradable" means decomposable by natural processes.' },
        { sentence: 'Corporate sustainability initiatives are driven by both ethics and economics.', explanation: '"Corporate sustainability" is business environmental responsibility.' },
        { sentence: 'The green economy creates jobs while protecting the environment.', explanation: '"Green economy" is economic development that is environmentally sustainable.' },
        { sentence: 'Zero-waste lifestyles aim to minimize landfill contributions.', explanation: '"Zero-waste" is reducing waste to absolute minimum.' },
        { sentence: 'Sustainable agriculture practices preserve soil health and biodiversity.', explanation: '"Sustainable agriculture" is farming that maintains long-term productivity.' },
        { sentence: 'Carbon capture technology removes CO2 directly from the atmosphere.', explanation: '"Carbon capture" is technology to remove and store carbon.' },
        { sentence: 'Eco-friendly products have minimal environmental impact.', explanation: '"Eco-friendly" means not harmful to the environment.' },
        { sentence: 'The transition to clean energy requires significant investment.', explanation: '"Clean energy" produces minimal pollution; "transition" is the shift.' }
      ],
      commonMistakes: [
        { mistake: 'We should use green energy.', correction: 'We should transition to renewable energy sources / invest in clean energy infrastructure.', explanation: '"Green energy" is vague; be specific about types and actions.' },
        { mistake: 'Recycling will solve pollution.', correction: 'Recycling is one component of a circular economy approach to waste reduction.', explanation: 'Recycling alone is insufficient; discuss broader strategies.' },
        { mistake: 'Solar power is the best solution.', correction: 'A diverse mix of renewable energy sources is needed for a sustainable energy system.', explanation: 'Avoid oversimplification; acknowledge complexity.' }
      ],
      miniPractice: [
        { question: '_____ energy sources include solar, wind, and hydroelectric power.', type: 'fill-blank' },
        { question: 'Which term describes an economy that eliminates waste through recycling?', options: ['circular economy', 'green economy', 'sustainable economy', 'renewable economy'], type: 'multiple-choice' },
        { question: 'Rewrite: "We should use less electricity."', type: 'rewrite' },
        { question: 'Carbon _____ means achieving net-zero emissions.', type: 'fill-blank' }
      ],
      answerKey: [
        'Renewable',
        'circular economy',
        'We should implement energy efficiency measures / reduce energy consumption through sustainable practices.',
        'neutrality'
      ],
      quickRecap: 'Key terms: "renewable energy", "sustainable development", "circular economy", "carbon neutrality", "green infrastructure", "decarbonizing", "energy efficiency", "biodegradable". Use these to discuss environmental solutions sophisticatedly!',
      collocations: [
        'renewable energy', 'sustainable development', 'circular economy', 'carbon neutrality',
        'green infrastructure', 'energy efficiency', 'electric vehicles', 'biodegradable materials',
        'corporate sustainability', 'green economy', 'zero-waste', 'clean energy'
      ],
      synonyms: [
        { word: 'green', synonyms: ['sustainable', 'eco-friendly', 'environmentally friendly', 'clean'] },
        { word: 'reduce', synonyms: ['minimize', 'decrease', 'cut', 'lower'] },
        { word: 'protect', synonyms: ['preserve', 'conserve', 'safeguard', 'maintain'] }
      ],
      speakingLines: [
        'The transition to renewable energy is not just environmentally necessary but economically beneficial.',
        'A circular economy approach could significantly reduce waste and resource consumption.',
        'Sustainable development requires balancing economic growth with environmental protection.'
      ]
    }
  },
  {
    id: 'vocab-environment-4',
    title: 'Pollution & Environmental Degradation',
    slug: 'pollution-environmental-degradation',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Environment',
    description: 'Vocabulary for discussing various types of pollution and environmental damage.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-03-08T10:00:00Z',
    updated_at: '2024-03-08T10:00:00Z',
    content: {
      title: 'Pollution & Environmental Degradation',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 pollution and degradation terms',
        'Discuss environmental problems precisely',
        'Differentiate between pollution types'
      ],
      coreExplanation: `Understanding different types of pollution and environmental damage is essential for IELTS environmental topics. To achieve Band 7+, you need precise vocabulary that distinguishes between various environmental problems.

This lesson covers air, water, soil, and noise pollution, as well as broader environmental degradation. Being specific about environmental problems demonstrates sophisticated understanding.`,
      examples: [
        { sentence: 'Air pollution from vehicle emissions contributes to respiratory diseases.', explanation: '"Emissions" are substances released; "respiratory" relates to breathing.' },
        { sentence: 'Industrial effluent contaminates waterways and harms aquatic life.', explanation: '"Effluent" is liquid waste; "aquatic" means water-related.' },
        { sentence: 'Plastic pollution has reached crisis levels in the world\'s oceans.', explanation: '"Plastic pollution" is a major environmental concern.' },
        { sentence: 'Soil degradation reduces agricultural productivity and food security.', explanation: '"Soil degradation" is decline in soil quality.' },
        { sentence: 'Light pollution disrupts wildlife behavior and human sleep patterns.', explanation: '"Light pollution" is excessive artificial light.' },
        { sentence: 'Noise pollution in urban areas affects mental health and wellbeing.', explanation: '"Noise pollution" is harmful or annoying levels of noise.' },
        { sentence: 'Toxic waste disposal requires strict regulatory oversight.', explanation: '"Toxic waste" is hazardous materials; "regulatory oversight" is government control.' },
        { sentence: 'Eutrophication occurs when excess nutrients cause algal blooms.', explanation: '"Eutrophication" is nutrient pollution in water bodies.' },
        { sentence: 'Smog is a combination of smoke and fog caused by air pollution.', explanation: '"Smog" is visible air pollution common in cities.' },
        { sentence: 'Microplastics have been found in drinking water and food chains.', explanation: '"Microplastics" are tiny plastic particles.' },
        { sentence: 'Habitat fragmentation isolates wildlife populations.', explanation: '"Habitat fragmentation" is breaking up of natural habitats.' },
        { sentence: 'Desertification threatens agricultural land in arid regions.', explanation: '"Desertification" is land becoming desert-like.' },
        { sentence: 'E-waste contains hazardous materials requiring specialized recycling.', explanation: '"E-waste" is electronic waste.' },
        { sentence: 'Groundwater contamination affects drinking water supplies.', explanation: '"Groundwater" is underground water; "contamination" is pollution.' },
        { sentence: 'Particulate matter in the air causes serious health problems.', explanation: '"Particulate matter" is tiny particles suspended in air.' }
      ],
      commonMistakes: [
        { mistake: 'Pollution is bad for the environment.', correction: 'Various forms of pollution - air, water, and soil - cause distinct environmental and health impacts.', explanation: 'Be specific about pollution types and effects.' },
        { mistake: 'Factories cause pollution.', correction: 'Industrial facilities emit pollutants that contaminate air and water systems.', explanation: 'Use precise terms like "emit" and "contaminate".' },
        { mistake: 'We need to stop pollution.', correction: 'We need to implement stricter emission controls and pollution prevention measures.', explanation: 'Discuss specific actions rather than vague goals.' }
      ],
      miniPractice: [
        { question: 'Industrial _____ contaminates rivers and lakes.', type: 'fill-blank' },
        { question: 'Which term describes tiny plastic particles found in oceans?', options: ['microplastics', 'nanoplastics', 'macroplastics', 'bioplastics'], type: 'multiple-choice' },
        { question: 'Rewrite: "Cars make the air dirty."', type: 'rewrite' },
        { question: '_____ matter in the air causes respiratory problems.', type: 'fill-blank' }
      ],
      answerKey: [
        'effluent',
        'microplastics',
        'Vehicle emissions contribute to air pollution and degrade air quality.',
        'Particulate'
      ],
      quickRecap: 'Key terms: "emissions", "effluent", "contamination", "degradation", "microplastics", "eutrophication", "smog", "particulate matter", "habitat fragmentation", "desertification". Be specific about pollution types!',
      collocations: [
        'air pollution', 'water contamination', 'soil degradation', 'plastic pollution',
        'toxic waste', 'industrial effluent', 'particulate matter', 'habitat fragmentation',
        'groundwater contamination', 'emission controls', 'environmental degradation', 'noise pollution'
      ],
      synonyms: [
        { word: 'pollution', synonyms: ['contamination', 'degradation', 'damage', 'harm'] },
        { word: 'dirty', synonyms: ['polluted', 'contaminated', 'degraded', 'toxic'] },
        { word: 'harm', synonyms: ['damage', 'degrade', 'impair', 'adversely affect'] }
      ],
      speakingLines: [
        'Air pollution from vehicle emissions is a major public health concern in urban areas.',
        'Plastic pollution has reached alarming levels, with microplastics now found throughout the food chain.',
        'Industrial effluent continues to contaminate waterways despite environmental regulations.'
      ]
    }
  },
  {
    id: 'vocab-environment-5',
    title: 'Conservation & Wildlife Protection',
    slug: 'conservation-wildlife-protection',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Environment',
    description: 'Vocabulary for discussing wildlife conservation, endangered species, and habitat protection.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-03-12T10:00:00Z',
    updated_at: '2024-03-12T10:00:00Z',
    content: {
      title: 'Conservation & Wildlife Protection',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 conservation and wildlife terms',
        'Discuss endangered species and protection efforts',
        'Use ecological vocabulary accurately'
      ],
      coreExplanation: `Conservation topics appear frequently in IELTS, especially in discussions about biodiversity and environmental protection. To achieve Band 7+, you need vocabulary that allows you to discuss wildlife issues with precision.

This lesson covers endangered species, habitat protection, and conservation strategies. Understanding ecological concepts helps you discuss the interconnections between species and environments.`,
      examples: [
        { sentence: 'Endangered species face extinction without immediate conservation efforts.', explanation: '"Endangered" means at risk of extinction; "conservation" is protection.' },
        { sentence: 'Protected areas such as national parks preserve critical habitats.', explanation: '"Protected areas" are legally designated conservation zones.' },
        { sentence: 'Poaching remains a significant threat to wildlife populations.', explanation: '"Poaching" is illegal hunting or capturing of animals.' },
        { sentence: 'Ecosystem services include pollination, water purification, and carbon storage.', explanation: '"Ecosystem services" are benefits nature provides to humans.' },
        { sentence: 'Captive breeding programs help recover endangered species populations.', explanation: '"Captive breeding" is breeding animals in controlled environments.' },
        { sentence: 'Wildlife corridors connect fragmented habitats for animal migration.', explanation: '"Wildlife corridors" are strips of habitat connecting larger areas.' },
        { sentence: 'Invasive species threaten native biodiversity.', explanation: '"Invasive species" are non-native species that cause harm.' },
        { sentence: 'The IUCN Red List classifies species by extinction risk.', explanation: '"IUCN Red List" is the global standard for species conservation status.' },
        { sentence: 'Habitat restoration aims to return degraded ecosystems to natural states.', explanation: '"Habitat restoration" is repairing damaged ecosystems.' },
        { sentence: 'Keystone species play crucial roles in maintaining ecosystem balance.', explanation: '"Keystone species" have disproportionate effects on their environments.' },
        { sentence: 'Ecotourism can fund conservation while raising awareness.', explanation: '"Ecotourism" is responsible travel to natural areas.' },
        { sentence: 'Wildlife trafficking is a multi-billion dollar illegal industry.', explanation: '"Wildlife trafficking" is illegal trade in animals and plants.' },
        { sentence: 'Marine protected areas safeguard ocean biodiversity.', explanation: '"Marine protected areas" are ocean conservation zones.' },
        { sentence: 'Rewilding involves reintroducing species to restore ecosystems.', explanation: '"Rewilding" is large-scale conservation to restore natural processes.' },
        { sentence: 'Biodiversity hotspots contain exceptional concentrations of endemic species.', explanation: '"Biodiversity hotspots" are areas with high species diversity; "endemic" means found only in that area.' }
      ],
      commonMistakes: [
        { mistake: 'Animals are dying because of humans.', correction: 'Human activities such as habitat destruction and poaching threaten wildlife populations.', explanation: 'Be specific about which human activities cause harm.' },
        { mistake: 'We should save animals.', correction: 'We should implement comprehensive conservation strategies to protect endangered species and their habitats.', explanation: 'Use specific conservation terminology.' },
        { mistake: 'Zoos help animals.', correction: 'Accredited zoos contribute to conservation through captive breeding programs and public education.', explanation: 'Be specific about how zoos contribute to conservation.' }
      ],
      miniPractice: [
        { question: '_____ species face the risk of extinction.', type: 'fill-blank' },
        { question: 'Which term describes illegal hunting of wildlife?', options: ['poaching', 'hunting', 'trapping', 'capturing'], type: 'multiple-choice' },
        { question: 'Rewrite: "We need to protect animals."', type: 'rewrite' },
        { question: 'Wildlife _____ connect fragmented habitats.', type: 'fill-blank' }
      ],
      answerKey: [
        'Endangered',
        'poaching',
        'We need to implement conservation measures to protect endangered species and preserve biodiversity.',
        'corridors'
      ],
      quickRecap: 'Key terms: "endangered species", "conservation", "poaching", "ecosystem services", "captive breeding", "wildlife corridors", "invasive species", "habitat restoration", "keystone species", "biodiversity hotspots". Use these for sophisticated wildlife discussions!',
      collocations: [
        'endangered species', 'protected areas', 'conservation efforts', 'ecosystem services',
        'captive breeding', 'wildlife corridors', 'invasive species', 'habitat restoration',
        'keystone species', 'biodiversity hotspots', 'wildlife trafficking', 'marine protected areas'
      ],
      synonyms: [
        { word: 'protect', synonyms: ['conserve', 'preserve', 'safeguard', 'defend'] },
        { word: 'animal', synonyms: ['species', 'wildlife', 'fauna', 'creature'] },
        { word: 'home', synonyms: ['habitat', 'ecosystem', 'environment', 'territory'] }
      ],
      speakingLines: [
        'Endangered species require comprehensive conservation strategies that address both habitat protection and anti-poaching measures.',
        'Ecosystem services provided by biodiversity are essential for human wellbeing and economic prosperity.',
        'Wildlife corridors are crucial for maintaining genetic diversity among fragmented populations.'
      ]
    }
  },
  {
    id: 'vocab-environment-6',
    title: 'Environmental Policy & Governance',
    slug: 'environmental-policy-governance',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Environment',
    description: 'Advanced vocabulary for discussing environmental laws, international agreements, and policy measures.',
    is_premium: true,
    is_published: true,
    view_count: 650,
    created_at: '2024-03-15T10:00:00Z',
    updated_at: '2024-03-15T10:00:00Z',
    content: {
      title: 'Environmental Policy & Governance',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 environmental policy terms',
        'Discuss international agreements and regulations',
        'Analyze government environmental measures'
      ],
      coreExplanation: `Environmental policy discussions are common in IELTS Writing Task 2, especially questions about government responsibility. To achieve Band 8+, you need vocabulary that allows you to discuss policy measures, regulations, and international cooperation.

This lesson covers environmental governance at local, national, and international levels. Understanding policy terminology helps you discuss the role of governments and institutions in addressing environmental challenges.`,
      examples: [
        { sentence: 'Environmental regulations impose limits on industrial emissions.', explanation: '"Regulations" are official rules; "impose limits" means set restrictions.' },
        { sentence: 'Carbon pricing mechanisms include carbon taxes and cap-and-trade systems.', explanation: '"Carbon pricing" makes polluters pay for emissions.' },
        { sentence: 'The polluter pays principle holds companies accountable for environmental damage.', explanation: '"Polluter pays principle" is a key environmental policy concept.' },
        { sentence: 'Environmental impact assessments evaluate proposed projects.', explanation: '"Environmental impact assessments" (EIAs) analyze potential effects.' },
        { sentence: 'Multilateral environmental agreements require international cooperation.', explanation: '"Multilateral" means involving multiple countries.' },
        { sentence: 'Subsidies for renewable energy accelerate the clean energy transition.', explanation: '"Subsidies" are government financial support.' },
        { sentence: 'Emission standards set maximum allowable pollution levels.', explanation: '"Emission standards" are legal limits on pollutants.' },
        { sentence: 'Environmental enforcement ensures compliance with regulations.', explanation: '"Enforcement" is ensuring rules are followed.' },
        { sentence: 'Green taxation discourages environmentally harmful activities.', explanation: '"Green taxation" uses taxes to promote environmental goals.' },
        { sentence: 'The precautionary principle advocates action despite scientific uncertainty.', explanation: '"Precautionary principle" means acting to prevent harm even without full proof.' },
        { sentence: 'Environmental governance involves multiple stakeholders.', explanation: '"Governance" is the system of rules and decision-making.' },
        { sentence: 'Regulatory frameworks provide the legal basis for environmental protection.', explanation: '"Regulatory frameworks" are systems of rules and regulations.' },
        { sentence: 'International environmental law addresses transboundary issues.', explanation: '"Transboundary" means crossing national borders.' },
        { sentence: 'Policy instruments include regulations, incentives, and voluntary agreements.', explanation: '"Policy instruments" are tools governments use to achieve goals.' },
        { sentence: 'Environmental compliance monitoring tracks adherence to regulations.', explanation: '"Compliance monitoring" is checking if rules are followed.' }
      ],
      commonMistakes: [
        { mistake: 'The government should make laws to protect the environment.', correction: 'Governments should implement comprehensive environmental regulations and enforcement mechanisms.', explanation: 'Use specific policy terminology.' },
        { mistake: 'Countries should work together on climate change.', correction: 'International cooperation through multilateral environmental agreements is essential for addressing global challenges.', explanation: 'Use formal diplomatic and policy language.' },
        { mistake: 'Companies should pay for pollution.', correction: 'The polluter pays principle should be enforced through carbon pricing mechanisms and environmental liability laws.', explanation: 'Reference specific policy concepts.' }
      ],
      miniPractice: [
        { question: 'Carbon _____ mechanisms make polluters pay for emissions.', type: 'fill-blank' },
        { question: 'Which principle holds companies responsible for environmental damage?', options: ['polluter pays', 'precautionary', 'sustainability', 'conservation'], type: 'multiple-choice' },
        { question: 'Rewrite: "The government should make companies stop polluting."', type: 'rewrite' },
        { question: 'Environmental impact _____ evaluate proposed development projects.', type: 'fill-blank' }
      ],
      answerKey: [
        'pricing',
        'polluter pays',
        'Governments should implement stricter emission standards and enforce the polluter pays principle.',
        'assessments'
      ],
      quickRecap: 'Key terms: "environmental regulations", "carbon pricing", "polluter pays principle", "environmental impact assessments", "multilateral agreements", "emission standards", "green taxation", "precautionary principle", "regulatory frameworks". Use these for policy discussions!',
      collocations: [
        'environmental regulations', 'carbon pricing', 'polluter pays principle', 'impact assessments',
        'multilateral agreements', 'emission standards', 'green taxation', 'precautionary principle',
        'regulatory frameworks', 'policy instruments', 'compliance monitoring', 'environmental governance'
      ],
      synonyms: [
        { word: 'law', synonyms: ['regulation', 'legislation', 'statute', 'ordinance'] },
        { word: 'rule', synonyms: ['regulation', 'standard', 'requirement', 'guideline'] },
        { word: 'agreement', synonyms: ['accord', 'treaty', 'convention', 'protocol'] }
      ],
      speakingLines: [
        'Effective environmental governance requires both strong regulations and robust enforcement mechanisms.',
        'Carbon pricing mechanisms are essential for internalizing the environmental costs of pollution.',
        'The precautionary principle should guide policy decisions when scientific uncertainty exists.'
      ]
    }
  },
  {
    id: 'vocab-environment-7',
    title: 'Urban Environment & Smart Cities',
    slug: 'urban-environment-smart-cities',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Environment',
    description: 'Vocabulary for discussing urban environmental challenges and sustainable city solutions.',
    is_premium: true,
    is_published: true,
    view_count: 580,
    created_at: '2024-03-18T10:00:00Z',
    updated_at: '2024-03-18T10:00:00Z',
    content: {
      title: 'Urban Environment & Smart Cities',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 urban environment terms',
        'Discuss sustainable city planning',
        'Use smart city vocabulary accurately'
      ],
      coreExplanation: `Urban environmental issues are increasingly relevant as more people live in cities. To achieve Band 7+, you need vocabulary that allows you to discuss urban challenges and solutions.

This lesson covers urban planning, sustainable transportation, and smart city technologies. Understanding how cities can become more sustainable is essential for discussing modern environmental challenges.`,
      examples: [
        { sentence: 'Urban sprawl contributes to increased car dependency and emissions.', explanation: '"Urban sprawl" is uncontrolled city expansion.' },
        { sentence: 'Public transportation reduces traffic congestion and air pollution.', explanation: '"Traffic congestion" is overcrowding of roads.' },
        { sentence: 'Green spaces in cities improve air quality and mental health.', explanation: '"Green spaces" are parks and natural areas in urban settings.' },
        { sentence: 'Smart cities use technology to optimize resource management.', explanation: '"Smart cities" use digital technology for efficiency.' },
        { sentence: 'Sustainable urban planning prioritizes walkability and mixed-use development.', explanation: '"Walkability" is how easy it is to walk around; "mixed-use" combines residential and commercial.' },
        { sentence: 'Urban heat islands cause cities to be warmer than surrounding areas.', explanation: '"Urban heat islands" are temperature increases due to urban development.' },
        { sentence: 'Cycling infrastructure encourages sustainable commuting.', explanation: '"Cycling infrastructure" includes bike lanes and parking.' },
        { sentence: 'Waste management systems are crucial for urban sustainability.', explanation: '"Waste management" is collection and disposal of waste.' },
        { sentence: 'High-density housing reduces land consumption and commuting distances.', explanation: '"High-density housing" is compact residential development.' },
        { sentence: 'Urban greening initiatives combat pollution and improve livability.', explanation: '"Urban greening" is adding plants and trees to cities.' },
        { sentence: 'Pedestrian zones create car-free areas in city centers.', explanation: '"Pedestrian zones" are areas restricted to foot traffic.' },
        { sentence: 'Sustainable drainage systems manage stormwater naturally.', explanation: '"Sustainable drainage" uses natural processes for water management.' },
        { sentence: 'Transit-oriented development concentrates housing near public transport.', explanation: '"Transit-oriented development" is building around transport hubs.' },
        { sentence: 'Air quality monitoring tracks pollution levels in real-time.', explanation: '"Air quality monitoring" measures pollutants in the atmosphere.' },
        { sentence: 'Carbon-neutral buildings minimize environmental impact.', explanation: '"Carbon-neutral" means producing no net carbon emissions.' }
      ],
      commonMistakes: [
        { mistake: 'Cities have too many cars.', correction: 'Urban areas face significant traffic congestion and car dependency issues.', explanation: 'Use formal urban planning terminology.' },
        { mistake: 'Cities should have more parks.', correction: 'Urban greening initiatives and green space development improve city livability and air quality.', explanation: 'Use specific planning terms.' },
        { mistake: 'Public transport is good for the environment.', correction: 'Efficient public transportation systems reduce emissions and traffic congestion while improving urban mobility.', explanation: 'Be specific about benefits.' }
      ],
      miniPractice: [
        { question: 'Urban _____ refers to uncontrolled city expansion.', type: 'fill-blank' },
        { question: 'Which term describes cities that use technology for efficiency?', options: ['smart cities', 'green cities', 'eco cities', 'digital cities'], type: 'multiple-choice' },
        { question: 'Rewrite: "Cities should have more buses and trains."', type: 'rewrite' },
        { question: 'Urban heat _____ cause cities to be warmer than rural areas.', type: 'fill-blank' }
      ],
      answerKey: [
        'sprawl',
        'smart cities',
        'Cities should invest in public transportation infrastructure to reduce car dependency and emissions.',
        'islands'
      ],
      quickRecap: 'Key terms: "urban sprawl", "traffic congestion", "green spaces", "smart cities", "walkability", "urban heat islands", "cycling infrastructure", "high-density housing", "urban greening", "transit-oriented development". Use these for urban environment discussions!',
      collocations: [
        'urban sprawl', 'traffic congestion', 'green spaces', 'smart cities',
        'sustainable urban planning', 'urban heat islands', 'cycling infrastructure', 'waste management',
        'high-density housing', 'urban greening', 'pedestrian zones', 'transit-oriented development'
      ],
      synonyms: [
        { word: 'city', synonyms: ['urban area', 'metropolitan area', 'municipality', 'urban center'] },
        { word: 'traffic', synonyms: ['congestion', 'gridlock', 'vehicle flow', 'road traffic'] },
        { word: 'park', synonyms: ['green space', 'public garden', 'urban forest', 'recreational area'] }
      ],
      speakingLines: [
        'Smart city technologies can significantly improve urban sustainability and quality of life.',
        'Transit-oriented development is essential for reducing car dependency in growing cities.',
        'Urban greening initiatives provide multiple benefits including improved air quality and mental health.'
      ]
    }
  },
  {
    id: 'vocab-environment-8',
    title: 'Water Resources & Ocean Conservation',
    slug: 'water-resources-ocean-conservation',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Environment',
    description: 'Advanced vocabulary for discussing water scarcity, ocean health, and marine conservation.',
    is_premium: true,
    is_published: true,
    view_count: 620,
    created_at: '2024-03-22T10:00:00Z',
    updated_at: '2024-03-22T10:00:00Z',
    content: {
      title: 'Water Resources & Ocean Conservation',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 water and ocean terms',
        'Discuss water scarcity and management',
        'Use marine conservation vocabulary'
      ],
      coreExplanation: `Water-related environmental issues are increasingly important as climate change affects water availability. To achieve Band 8+, you need vocabulary that allows you to discuss both freshwater and marine issues.

This lesson covers water scarcity, ocean health, and conservation strategies. Understanding water issues is essential as they connect to climate change, food security, and biodiversity.`,
      examples: [
        { sentence: 'Water scarcity affects billions of people worldwide.', explanation: '"Water scarcity" is insufficient water to meet demands.' },
        { sentence: 'Desalination plants convert seawater into freshwater.', explanation: '"Desalination" is removing salt from seawater.' },
        { sentence: 'Overfishing has depleted fish stocks in many regions.', explanation: '"Overfishing" is catching fish faster than they reproduce.' },
        { sentence: 'Coral bleaching occurs when ocean temperatures rise.', explanation: '"Coral bleaching" is corals expelling algae due to stress.' },
        { sentence: 'Watershed management protects freshwater sources.', explanation: '"Watershed" is an area draining into a water body.' },
        { sentence: 'Marine debris accumulates in ocean gyres.', explanation: '"Marine debris" is human-made waste in oceans; "gyres" are circular currents.' },
        { sentence: 'Aquifer depletion threatens groundwater supplies.', explanation: '"Aquifer" is underground water-bearing rock; "depletion" is using up.' },
        { sentence: 'Sustainable fisheries management ensures long-term fish populations.', explanation: '"Sustainable fisheries" balance fishing with conservation.' },
        { sentence: 'Water stress occurs when demand exceeds available supply.', explanation: '"Water stress" is insufficient water for all uses.' },
        { sentence: 'Ocean dead zones result from nutrient pollution.', explanation: '"Dead zones" are areas with too little oxygen for marine life.' },
        { sentence: 'Rainwater harvesting captures precipitation for later use.', explanation: '"Rainwater harvesting" is collecting and storing rainwater.' },
        { sentence: 'Illegal, unreported, and unregulated fishing threatens marine ecosystems.', explanation: '"IUU fishing" is fishing that violates laws or regulations.' },
        { sentence: 'Water recycling and reuse reduce freshwater consumption.', explanation: '"Water recycling" is treating wastewater for reuse.' },
        { sentence: 'Mangrove forests protect coastlines and support marine biodiversity.', explanation: '"Mangroves" are coastal trees with important ecological functions.' },
        { sentence: 'Transboundary water management requires international cooperation.', explanation: '"Transboundary" means crossing national borders.' }
      ],
      commonMistakes: [
        { mistake: 'There is not enough water.', correction: 'Water scarcity and stress affect regions with insufficient freshwater resources.', explanation: 'Use specific water management terminology.' },
        { mistake: 'The ocean is polluted.', correction: 'Marine pollution, including plastic debris and nutrient runoff, threatens ocean ecosystems.', explanation: 'Be specific about pollution types.' },
        { mistake: 'We are catching too many fish.', correction: 'Overfishing has depleted fish stocks, threatening marine biodiversity and food security.', explanation: 'Use formal fisheries terminology.' }
      ],
      miniPractice: [
        { question: 'Water _____ occurs when demand exceeds available supply.', type: 'fill-blank' },
        { question: 'Which process converts seawater into freshwater?', options: ['desalination', 'purification', 'filtration', 'distillation'], type: 'multiple-choice' },
        { question: 'Rewrite: "The ocean is getting too warm for coral."', type: 'rewrite' },
        { question: 'Coral _____ occurs when ocean temperatures rise.', type: 'fill-blank' }
      ],
      answerKey: [
        'scarcity / stress',
        'desalination',
        'Rising ocean temperatures are causing widespread coral bleaching events.',
        'bleaching'
      ],
      quickRecap: 'Key terms: "water scarcity", "desalination", "overfishing", "coral bleaching", "watershed management", "marine debris", "aquifer depletion", "sustainable fisheries", "ocean dead zones", "mangrove forests". Use these for water and ocean discussions!',
      collocations: [
        'water scarcity', 'desalination plants', 'overfishing', 'coral bleaching',
        'watershed management', 'marine debris', 'aquifer depletion', 'sustainable fisheries',
        'water stress', 'ocean dead zones', 'rainwater harvesting', 'mangrove forests'
      ],
      synonyms: [
        { word: 'ocean', synonyms: ['sea', 'marine environment', 'maritime', 'oceanic'] },
        { word: 'water', synonyms: ['freshwater', 'aquatic resources', 'water resources', 'hydro'] },
        { word: 'fish', synonyms: ['marine life', 'fish stocks', 'fisheries', 'aquatic species'] }
      ],
      speakingLines: [
        'Water scarcity is becoming a critical issue as climate change affects precipitation patterns.',
        'Sustainable fisheries management is essential for maintaining marine biodiversity and food security.',
        'Coral bleaching events are increasing in frequency and severity due to rising ocean temperatures.'
      ]
    }
  },
  // ============================================
  // BATCH 3: Technology & Innovation (7 lessons)
  // ============================================
  {
    id: 'vocab-technology-2',
    title: 'Artificial Intelligence & Automation',
    slug: 'artificial-intelligence-automation',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Technology',
    description: 'Advanced vocabulary for discussing AI, machine learning, and automation in IELTS.',
    is_premium: true,
    is_published: true,
    view_count: 1050,
    created_at: '2024-03-25T10:00:00Z',
    updated_at: '2024-03-25T10:00:00Z',
    content: {
      title: 'Artificial Intelligence & Automation',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 AI and automation terms',
        'Discuss technological impacts on society',
        'Use technical vocabulary accurately'
      ],
      coreExplanation: `AI and automation are increasingly common IELTS topics. To achieve Band 8+, you need vocabulary that allows you to discuss both the benefits and concerns surrounding these technologies.

This lesson covers artificial intelligence, machine learning, and automation. Understanding these concepts helps you discuss technological change, employment, and ethical considerations.`,
      examples: [
        { sentence: 'Artificial intelligence systems can process vast amounts of data.', explanation: '"Artificial intelligence" (AI) is computer systems performing human-like tasks.' },
        { sentence: 'Machine learning algorithms improve through experience.', explanation: '"Machine learning" is AI that learns from data without explicit programming.' },
        { sentence: 'Automation threatens to displace workers in routine occupations.', explanation: '"Automation" is using technology to perform tasks without human intervention.' },
        { sentence: 'Deep learning enables advanced pattern recognition.', explanation: '"Deep learning" is a type of machine learning using neural networks.' },
        { sentence: 'Autonomous vehicles could revolutionize transportation.', explanation: '"Autonomous" means self-governing; self-driving vehicles.' },
        { sentence: 'Natural language processing allows computers to understand human speech.', explanation: '"Natural language processing" (NLP) is AI understanding human language.' },
        { sentence: 'Algorithmic bias can perpetuate discrimination.', explanation: '"Algorithmic bias" is unfair outcomes from AI systems.' },
        { sentence: 'Robotics is transforming manufacturing and logistics.', explanation: '"Robotics" is the design and use of robots.' },
        { sentence: 'Predictive analytics uses data to forecast future trends.', explanation: '"Predictive analytics" is using data to make predictions.' },
        { sentence: 'The digital divide separates those with and without technology access.', explanation: '"Digital divide" is inequality in technology access.' },
        { sentence: 'Technological unemployment occurs when automation replaces human workers.', explanation: '"Technological unemployment" is job loss due to technology.' },
        { sentence: 'Human-machine collaboration combines human and AI capabilities.', explanation: '"Human-machine collaboration" is people and AI working together.' },
        { sentence: 'Data privacy concerns arise from AI systems collecting personal information.', explanation: '"Data privacy" is protecting personal information.' },
        { sentence: 'Ethical AI development requires addressing bias and transparency.', explanation: '"Ethical AI" is developing AI responsibly.' },
        { sentence: 'The Fourth Industrial Revolution is characterized by digital transformation.', explanation: '"Fourth Industrial Revolution" is the current era of technological change.' }
      ],
      commonMistakes: [
        { mistake: 'Robots will take all jobs.', correction: 'Automation may displace workers in routine occupations while creating new roles requiring different skills.', explanation: 'Avoid oversimplification; discuss nuanced impacts.' },
        { mistake: 'AI is dangerous.', correction: 'AI development raises important ethical considerations regarding bias, privacy, and accountability.', explanation: 'Discuss specific concerns rather than general fear.' },
        { mistake: 'Computers are getting smarter.', correction: 'Advances in machine learning and artificial intelligence are enabling increasingly sophisticated computational capabilities.', explanation: 'Use technical terminology accurately.' }
      ],
      miniPractice: [
        { question: 'Machine _____ algorithms improve through experience with data.', type: 'fill-blank' },
        { question: 'Which term describes AI systems that can drive without human input?', options: ['autonomous vehicles', 'smart cars', 'robot cars', 'AI cars'], type: 'multiple-choice' },
        { question: 'Rewrite: "Robots are taking people\'s jobs."', type: 'rewrite' },
        { question: 'Algorithmic _____ can lead to unfair outcomes in AI systems.', type: 'fill-blank' }
      ],
      answerKey: [
        'learning',
        'autonomous vehicles',
        'Automation is displacing workers in routine occupations, leading to technological unemployment.',
        'bias'
      ],
      quickRecap: 'Key terms: "artificial intelligence", "machine learning", "automation", "deep learning", "autonomous", "natural language processing", "algorithmic bias", "technological unemployment", "human-machine collaboration", "ethical AI". Use these for technology discussions!',
      collocations: [
        'artificial intelligence', 'machine learning', 'deep learning', 'autonomous vehicles',
        'natural language processing', 'algorithmic bias', 'predictive analytics', 'digital divide',
        'technological unemployment', 'human-machine collaboration', 'data privacy', 'ethical AI'
      ],
      synonyms: [
        { word: 'robot', synonyms: ['automated system', 'machine', 'bot', 'automaton'] },
        { word: 'smart', synonyms: ['intelligent', 'automated', 'AI-powered', 'algorithmic'] },
        { word: 'replace', synonyms: ['displace', 'substitute', 'automate', 'supersede'] }
      ],
      speakingLines: [
        'Artificial intelligence is transforming industries, but we must address algorithmic bias and ethical concerns.',
        'Automation may displace some workers, but it also creates opportunities for human-machine collaboration.',
        'The digital divide must be addressed to ensure equitable access to technological benefits.'
      ]
    }
  },
  {
    id: 'vocab-technology-3',
    title: 'Digital Communication & Social Media',
    slug: 'digital-communication-social-media',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Technology',
    description: 'Vocabulary for discussing social media, online communication, and digital culture.',
    is_premium: true,
    is_published: true,
    view_count: 980,
    created_at: '2024-03-28T10:00:00Z',
    updated_at: '2024-03-28T10:00:00Z',
    content: {
      title: 'Digital Communication & Social Media',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 digital communication terms',
        'Discuss social media impacts',
        'Use online culture vocabulary'
      ],
      coreExplanation: `Social media and digital communication are common IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss both benefits and drawbacks of online communication.

This lesson covers social media platforms, digital communication, and online culture. Understanding these concepts helps you discuss how technology affects relationships, information, and society.`,
      examples: [
        { sentence: 'Social media platforms have transformed how people communicate.', explanation: '"Social media platforms" are websites/apps for social networking.' },
        { sentence: 'Digital literacy is essential for navigating online information.', explanation: '"Digital literacy" is the ability to use digital technology effectively.' },
        { sentence: 'Misinformation spreads rapidly through social networks.', explanation: '"Misinformation" is false information spread unintentionally.' },
        { sentence: 'Online communities connect people with shared interests.', explanation: '"Online communities" are groups interacting through the internet.' },
        { sentence: 'Cyberbullying has become a serious concern for young people.', explanation: '"Cyberbullying" is bullying through digital devices.' },
        { sentence: 'Viral content can reach millions of users within hours.', explanation: '"Viral" means spreading rapidly online.' },
        { sentence: 'Echo chambers reinforce existing beliefs and limit exposure to diverse views.', explanation: '"Echo chambers" are environments where beliefs are amplified.' },
        { sentence: 'Influencer marketing has become a major advertising strategy.', explanation: '"Influencer marketing" uses social media personalities to promote products.' },
        { sentence: 'Screen time affects attention spans and sleep patterns.', explanation: '"Screen time" is time spent using digital devices.' },
        { sentence: 'Digital detox involves taking breaks from technology.', explanation: '"Digital detox" is abstaining from electronic devices.' },
        { sentence: 'User-generated content has democratized media production.', explanation: '"User-generated content" is content created by users rather than professionals.' },
        { sentence: 'Online privacy is increasingly difficult to maintain.', explanation: '"Online privacy" is protecting personal information on the internet.' },
        { sentence: 'Social media addiction affects mental health and productivity.', explanation: '"Social media addiction" is compulsive use of social platforms.' },
        { sentence: 'Fake news undermines trust in traditional media.', explanation: '"Fake news" is deliberately false information presented as news.' },
        { sentence: 'Digital footprints are permanent records of online activity.', explanation: '"Digital footprint" is the trail of data left by online activity.' }
      ],
      commonMistakes: [
        { mistake: 'Social media is bad for people.', correction: 'Social media has both benefits and drawbacks, affecting communication, mental health, and information access.', explanation: 'Present balanced views rather than absolute statements.' },
        { mistake: 'Young people spend too much time on their phones.', correction: 'Excessive screen time and social media use can affect attention spans and mental wellbeing.', explanation: 'Use specific terminology and avoid generalizations.' },
        { mistake: 'Fake news is a big problem.', correction: 'The spread of misinformation and disinformation through social media undermines public discourse.', explanation: 'Use precise terms and explain the impact.' }
      ],
      miniPractice: [
        { question: 'Digital _____ is the ability to use technology effectively.', type: 'fill-blank' },
        { question: 'Which term describes environments that reinforce existing beliefs?', options: ['echo chambers', 'filter bubbles', 'information silos', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "People believe fake things they see online."', type: 'rewrite' },
        { question: '_____ content can reach millions of users within hours.', type: 'fill-blank' }
      ],
      answerKey: [
        'literacy',
        'all of the above',
        'Misinformation spreads rapidly through social media, influencing public opinion.',
        'Viral'
      ],
      quickRecap: 'Key terms: "social media platforms", "digital literacy", "misinformation", "online communities", "cyberbullying", "viral content", "echo chambers", "influencer marketing", "screen time", "digital footprint". Use these for digital communication discussions!',
      collocations: [
        'social media platforms', 'digital literacy', 'online communities', 'cyberbullying',
        'viral content', 'echo chambers', 'influencer marketing', 'screen time',
        'digital detox', 'user-generated content', 'online privacy', 'fake news'
      ],
      synonyms: [
        { word: 'online', synonyms: ['digital', 'virtual', 'internet-based', 'web-based'] },
        { word: 'share', synonyms: ['post', 'distribute', 'disseminate', 'circulate'] },
        { word: 'connect', synonyms: ['network', 'interact', 'communicate', 'engage'] }
      ],
      speakingLines: [
        'Social media has transformed communication, but echo chambers can limit exposure to diverse perspectives.',
        'Digital literacy is essential for distinguishing reliable information from misinformation.',
        'While social media connects people globally, excessive screen time can negatively affect mental health.'
      ]
    }
  },
  {
    id: 'vocab-technology-4',
    title: 'Cybersecurity & Data Protection',
    slug: 'cybersecurity-data-protection',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Technology',
    description: 'Advanced vocabulary for discussing online security, privacy, and data protection.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-04-01T10:00:00Z',
    updated_at: '2024-04-01T10:00:00Z',
    content: {
      title: 'Cybersecurity & Data Protection',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 cybersecurity terms',
        'Discuss data privacy and protection',
        'Use security vocabulary accurately'
      ],
      coreExplanation: `Cybersecurity and data protection are increasingly important topics as digital technology expands. To achieve Band 8+, you need vocabulary that allows you to discuss online threats and protective measures.

This lesson covers cyber threats, data protection, and privacy regulations. Understanding these concepts helps you discuss the challenges of maintaining security in the digital age.`,
      examples: [
        { sentence: 'Cybersecurity measures protect systems from digital attacks.', explanation: '"Cybersecurity" is protection of computer systems from threats.' },
        { sentence: 'Data breaches expose sensitive personal information.', explanation: '"Data breach" is unauthorized access to confidential data.' },
        { sentence: 'Encryption protects data by converting it into unreadable code.', explanation: '"Encryption" is encoding information for security.' },
        { sentence: 'Phishing attacks trick users into revealing personal information.', explanation: '"Phishing" is fraudulent attempts to obtain sensitive data.' },
        { sentence: 'Two-factor authentication adds an extra layer of security.', explanation: '"Two-factor authentication" requires two verification methods.' },
        { sentence: 'Malware includes viruses, ransomware, and spyware.', explanation: '"Malware" is malicious software designed to cause harm.' },
        { sentence: 'Privacy regulations such as GDPR protect personal data.', explanation: '"GDPR" is the EU\'s General Data Protection Regulation.' },
        { sentence: 'Identity theft occurs when criminals use stolen personal information.', explanation: '"Identity theft" is fraudulent use of someone\'s identity.' },
        { sentence: 'Firewalls monitor and control network traffic.', explanation: '"Firewall" is a security system controlling network access.' },
        { sentence: 'Cyber attacks can target critical infrastructure.', explanation: '"Critical infrastructure" includes essential systems like power grids.' },
        { sentence: 'Data sovereignty concerns where data is stored and processed.', explanation: '"Data sovereignty" is the concept that data is subject to local laws.' },
        { sentence: 'Biometric authentication uses physical characteristics for verification.', explanation: '"Biometric" means using biological data like fingerprints.' },
        { sentence: 'Ransomware encrypts data and demands payment for release.', explanation: '"Ransomware" is malware that holds data hostage.' },
        { sentence: 'Vulnerability assessments identify security weaknesses.', explanation: '"Vulnerability assessment" is evaluating security gaps.' },
        { sentence: 'Cyber hygiene involves practices to maintain online security.', explanation: '"Cyber hygiene" is routine security practices.' }
      ],
      commonMistakes: [
        { mistake: 'Hackers steal information.', correction: 'Cyber criminals exploit vulnerabilities to conduct data breaches and identity theft.', explanation: 'Use specific cybersecurity terminology.' },
        { mistake: 'We need stronger passwords.', correction: 'Robust authentication measures, including strong passwords and two-factor authentication, enhance security.', explanation: 'Discuss comprehensive security measures.' },
        { mistake: 'The internet is not safe.', correction: 'Online activities carry inherent risks that can be mitigated through proper cybersecurity practices.', explanation: 'Discuss specific risks and solutions.' }
      ],
      miniPractice: [
        { question: 'Data _____ occur when unauthorized parties access confidential information.', type: 'fill-blank' },
        { question: 'Which term describes malicious software?', options: ['malware', 'hardware', 'software', 'firmware'], type: 'multiple-choice' },
        { question: 'Rewrite: "Hackers can steal your information online."', type: 'rewrite' },
        { question: '_____ attacks trick users into revealing personal information.', type: 'fill-blank' }
      ],
      answerKey: [
        'breaches',
        'malware',
        'Cyber criminals can exploit vulnerabilities to access personal data through various attack vectors.',
        'Phishing'
      ],
      quickRecap: 'Key terms: "cybersecurity", "data breach", "encryption", "phishing", "two-factor authentication", "malware", "privacy regulations", "identity theft", "ransomware", "cyber hygiene". Use these for security discussions!',
      collocations: [
        'cybersecurity measures', 'data breach', 'encryption', 'phishing attacks',
        'two-factor authentication', 'malware', 'privacy regulations', 'identity theft',
        'critical infrastructure', 'data sovereignty', 'biometric authentication', 'ransomware'
      ],
      synonyms: [
        { word: 'hack', synonyms: ['breach', 'compromise', 'infiltrate', 'exploit'] },
        { word: 'protect', synonyms: ['secure', 'safeguard', 'defend', 'shield'] },
        { word: 'steal', synonyms: ['exfiltrate', 'compromise', 'access illegally', 'extract'] }
      ],
      speakingLines: [
        'Cybersecurity is essential as data breaches can expose sensitive personal and financial information.',
        'Privacy regulations like GDPR represent important steps toward protecting personal data.',
        'Two-factor authentication and encryption are fundamental cybersecurity measures everyone should adopt.'
      ]
    }
  },
  {
    id: 'vocab-technology-5',
    title: 'Biotechnology & Medical Innovation',
    slug: 'biotechnology-medical-innovation',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Technology',
    description: 'Advanced vocabulary for discussing genetic engineering, medical technology, and bioethics.',
    is_premium: true,
    is_published: true,
    view_count: 680,
    created_at: '2024-04-05T10:00:00Z',
    updated_at: '2024-04-05T10:00:00Z',
    content: {
      title: 'Biotechnology & Medical Innovation',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 biotechnology terms',
        'Discuss genetic engineering and ethics',
        'Use medical technology vocabulary'
      ],
      coreExplanation: `Biotechnology and medical innovation are important IELTS topics that often involve ethical considerations. To achieve Band 8+, you need vocabulary that allows you to discuss scientific advances and their implications.

This lesson covers genetic engineering, medical technologies, and bioethical debates. Understanding these concepts helps you discuss the benefits and concerns surrounding biological sciences.`,
      examples: [
        { sentence: 'Genetic engineering allows modification of organisms\' DNA.', explanation: '"Genetic engineering" is directly manipulating an organism\'s genes.' },
        { sentence: 'CRISPR technology enables precise gene editing.', explanation: '"CRISPR" is a revolutionary gene-editing tool.' },
        { sentence: 'Stem cell research offers potential treatments for diseases.', explanation: '"Stem cells" can develop into different cell types.' },
        { sentence: 'Personalized medicine tailors treatments to individual genetics.', explanation: '"Personalized medicine" is customized treatment based on genetic profile.' },
        { sentence: 'Bioethics examines moral issues in biological sciences.', explanation: '"Bioethics" is the study of ethical issues in biology and medicine.' },
        { sentence: 'Genetically modified organisms (GMOs) are controversial in agriculture.', explanation: '"GMOs" are organisms with altered genetic material.' },
        { sentence: 'Clinical trials test the safety and efficacy of new treatments.', explanation: '"Clinical trials" are research studies testing medical interventions.' },
        { sentence: 'Gene therapy aims to treat diseases by modifying genes.', explanation: '"Gene therapy" is treating disease by altering genetic material.' },
        { sentence: 'Cloning raises ethical concerns about genetic manipulation.', explanation: '"Cloning" is creating genetically identical copies.' },
        { sentence: 'Pharmaceutical research develops new drugs and treatments.', explanation: '"Pharmaceutical" relates to medicinal drugs.' },
        { sentence: 'Telemedicine enables remote medical consultations.', explanation: '"Telemedicine" is healthcare delivered remotely via technology.' },
        { sentence: 'Organ transplantation saves lives but faces donor shortages.', explanation: '"Organ transplantation" is surgically replacing failing organs.' },
        { sentence: 'Vaccine development has accelerated through new technologies.', explanation: '"Vaccine development" is creating immunizations against diseases.' },
        { sentence: 'Biomedical engineering combines engineering with medical sciences.', explanation: '"Biomedical engineering" applies engineering to healthcare.' },
        { sentence: 'Ethical oversight ensures responsible scientific research.', explanation: '"Ethical oversight" is monitoring research for ethical compliance.' }
      ],
      commonMistakes: [
        { mistake: 'Genetic engineering is dangerous.', correction: 'Genetic engineering raises important bioethical questions regarding safety, consent, and unintended consequences.', explanation: 'Discuss specific concerns rather than general fear.' },
        { mistake: 'GMO food is bad for health.', correction: 'The safety and environmental impact of genetically modified organisms remain subjects of scientific debate.', explanation: 'Present balanced, evidence-based views.' },
        { mistake: 'Scientists should not play God.', correction: 'Biotechnology advances require careful ethical oversight to balance potential benefits with moral considerations.', explanation: 'Use academic language rather than emotional phrases.' }
      ],
      miniPractice: [
        { question: 'CRISPR technology enables precise gene _____.', type: 'fill-blank' },
        { question: 'Which field examines moral issues in biological sciences?', options: ['bioethics', 'biology', 'biochemistry', 'biophysics'], type: 'multiple-choice' },
        { question: 'Rewrite: "Changing genes is wrong."', type: 'rewrite' },
        { question: '_____ medicine tailors treatments to individual genetic profiles.', type: 'fill-blank' }
      ],
      answerKey: [
        'editing',
        'bioethics',
        'Genetic modification raises complex bioethical questions that require careful consideration.',
        'Personalized'
      ],
      quickRecap: 'Key terms: "genetic engineering", "CRISPR", "stem cell research", "personalized medicine", "bioethics", "GMOs", "clinical trials", "gene therapy", "cloning", "telemedicine". Use these for biotechnology discussions!',
      collocations: [
        'genetic engineering', 'gene editing', 'stem cell research', 'personalized medicine',
        'bioethics', 'genetically modified', 'clinical trials', 'gene therapy',
        'pharmaceutical research', 'telemedicine', 'organ transplantation', 'ethical oversight'
      ],
      synonyms: [
        { word: 'modify', synonyms: ['alter', 'engineer', 'manipulate', 'edit'] },
        { word: 'treatment', synonyms: ['therapy', 'intervention', 'cure', 'remedy'] },
        { word: 'research', synonyms: ['study', 'investigation', 'experimentation', 'inquiry'] }
      ],
      speakingLines: [
        'Genetic engineering offers tremendous potential but requires robust bioethical oversight.',
        'Personalized medicine represents a paradigm shift from one-size-fits-all treatments.',
        'The rapid development of CRISPR technology has outpaced the ethical frameworks needed to govern its use.'
      ]
    }
  },
  {
    id: 'vocab-technology-6',
    title: 'Space Technology & Exploration',
    slug: 'space-technology-exploration',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Technology',
    description: 'Vocabulary for discussing space exploration, satellites, and astronomical discoveries.',
    is_premium: true,
    is_published: true,
    view_count: 590,
    created_at: '2024-04-08T10:00:00Z',
    updated_at: '2024-04-08T10:00:00Z',
    content: {
      title: 'Space Technology & Exploration',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 space technology terms',
        'Discuss space exploration benefits',
        'Use astronomical vocabulary'
      ],
      coreExplanation: `Space exploration topics occasionally appear in IELTS, often in discussions about scientific priorities and government spending. To achieve Band 7+, you need vocabulary that allows you to discuss space technology and its benefits.

This lesson covers space exploration, satellite technology, and astronomical discoveries. Understanding these concepts helps you discuss the value of space research and its practical applications.`,
      examples: [
        { sentence: 'Space exploration has yielded numerous technological spin-offs.', explanation: '"Spin-offs" are secondary benefits from research.' },
        { sentence: 'Satellites enable global communication and navigation systems.', explanation: '"Satellites" are objects orbiting Earth for various purposes.' },
        { sentence: 'The International Space Station facilitates scientific research.', explanation: '"International Space Station" (ISS) is a habitable satellite.' },
        { sentence: 'Mars colonization is a long-term goal of space agencies.', explanation: '"Colonization" is establishing permanent settlements.' },
        { sentence: 'Rocket technology has advanced significantly in recent decades.', explanation: '"Rocket technology" is propulsion systems for space travel.' },
        { sentence: 'Space debris poses risks to operational satellites.', explanation: '"Space debris" is defunct human-made objects in orbit.' },
        { sentence: 'Astronomical observations reveal the universe\'s origins.', explanation: '"Astronomical" relates to the study of celestial objects.' },
        { sentence: 'Space tourism is becoming commercially viable.', explanation: '"Space tourism" is recreational space travel.' },
        { sentence: 'Reusable rockets have reduced launch costs dramatically.', explanation: '"Reusable rockets" can be used for multiple missions.' },
        { sentence: 'Extraterrestrial life remains a subject of scientific inquiry.', explanation: '"Extraterrestrial" means originating outside Earth.' },
        { sentence: 'GPS technology relies on satellite networks.', explanation: '"GPS" (Global Positioning System) uses satellites for location.' },
        { sentence: 'Space agencies collaborate on international missions.', explanation: '"Space agencies" are organizations conducting space programs.' },
        { sentence: 'Asteroid mining could provide valuable resources.', explanation: '"Asteroid mining" is extracting materials from asteroids.' },
        { sentence: 'Telescopes detect electromagnetic radiation from distant objects.', explanation: '"Telescopes" are instruments for observing distant objects.' },
        { sentence: 'Microgravity research enables unique scientific experiments.', explanation: '"Microgravity" is very weak gravity, as in orbit.' }
      ],
      commonMistakes: [
        { mistake: 'Space exploration wastes money.', correction: 'Space exploration generates technological innovations and scientific knowledge with practical applications.', explanation: 'Discuss specific benefits rather than dismissing the field.' },
        { mistake: 'We should fix Earth before going to space.', correction: 'Space research and addressing terrestrial challenges are not mutually exclusive; both can be pursued simultaneously.', explanation: 'Avoid false dichotomies.' },
        { mistake: 'Space travel is only for rich countries.', correction: 'International collaboration in space exploration enables participation by nations with varying resources.', explanation: 'Acknowledge international cooperation.' }
      ],
      miniPractice: [
        { question: 'Space exploration has yielded numerous technological _____.', type: 'fill-blank' },
        { question: 'Which term describes defunct objects orbiting Earth?', options: ['space debris', 'satellites', 'asteroids', 'meteors'], type: 'multiple-choice' },
        { question: 'Rewrite: "Going to space costs too much money."', type: 'rewrite' },
        { question: '_____ rockets can be used for multiple missions.', type: 'fill-blank' }
      ],
      answerKey: [
        'spin-offs',
        'space debris',
        'Space exploration requires significant investment but generates valuable technological innovations and scientific knowledge.',
        'Reusable'
      ],
      quickRecap: 'Key terms: "space exploration", "satellites", "International Space Station", "colonization", "space debris", "astronomical", "space tourism", "reusable rockets", "extraterrestrial", "microgravity". Use these for space discussions!',
      collocations: [
        'space exploration', 'satellite technology', 'International Space Station', 'Mars colonization',
        'rocket technology', 'space debris', 'astronomical observations', 'space tourism',
        'reusable rockets', 'extraterrestrial life', 'space agencies', 'asteroid mining'
      ],
      synonyms: [
        { word: 'space', synonyms: ['outer space', 'cosmos', 'universe', 'celestial'] },
        { word: 'explore', synonyms: ['investigate', 'discover', 'research', 'probe'] },
        { word: 'launch', synonyms: ['deploy', 'send', 'propel', 'blast off'] }
      ],
      speakingLines: [
        'Space exploration has generated numerous technological spin-offs that benefit everyday life.',
        'International collaboration on space missions demonstrates the potential for global scientific cooperation.',
        'Reusable rocket technology has dramatically reduced the cost of space access.'
      ]
    }
  },
  {
    id: 'vocab-technology-7',
    title: 'Digital Economy & E-commerce',
    slug: 'digital-economy-ecommerce',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Technology',
    description: 'Vocabulary for discussing online business, digital payments, and the gig economy.',
    is_premium: true,
    is_published: true,
    view_count: 850,
    created_at: '2024-04-12T10:00:00Z',
    updated_at: '2024-04-12T10:00:00Z',
    content: {
      title: 'Digital Economy & E-commerce',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 digital economy terms',
        'Discuss e-commerce and online business',
        'Use gig economy vocabulary'
      ],
      coreExplanation: `The digital economy is transforming how we work and do business. To achieve Band 7+, you need vocabulary that allows you to discuss online commerce, digital payments, and new work arrangements.

This lesson covers e-commerce, digital payments, and the gig economy. Understanding these concepts helps you discuss how technology is changing economic activities and employment.`,
      examples: [
        { sentence: 'E-commerce has transformed retail and consumer behavior.', explanation: '"E-commerce" is buying and selling online.' },
        { sentence: 'Digital payments are replacing cash transactions.', explanation: '"Digital payments" are electronic money transfers.' },
        { sentence: 'The gig economy offers flexibility but lacks job security.', explanation: '"Gig economy" is short-term, freelance work arrangements.' },
        { sentence: 'Platform businesses connect buyers and sellers digitally.', explanation: '"Platform businesses" are companies like Uber and Airbnb.' },
        { sentence: 'Cryptocurrency operates independently of central banks.', explanation: '"Cryptocurrency" is digital currency using cryptography.' },
        { sentence: 'Online marketplaces aggregate products from multiple sellers.', explanation: '"Online marketplaces" are platforms like Amazon and eBay.' },
        { sentence: 'Fintech innovations are disrupting traditional banking.', explanation: '"Fintech" is technology applied to financial services.' },
        { sentence: 'Remote work has become normalized since the pandemic.', explanation: '"Remote work" is working outside traditional offices.' },
        { sentence: 'Digital transformation is essential for business competitiveness.', explanation: '"Digital transformation" is integrating technology into business.' },
        { sentence: 'Subscription models provide recurring revenue streams.', explanation: '"Subscription models" charge regular fees for ongoing access.' },
        { sentence: 'Contactless payments have accelerated during the pandemic.', explanation: '"Contactless payments" don\'t require physical contact.' },
        { sentence: 'Freelance workers lack traditional employment benefits.', explanation: '"Freelance" is self-employed, working for multiple clients.' },
        { sentence: 'Data monetization generates revenue from user information.', explanation: '"Data monetization" is making money from data.' },
        { sentence: 'Supply chain digitization improves efficiency and transparency.', explanation: '"Supply chain digitization" is using technology in logistics.' },
        { sentence: 'The sharing economy enables peer-to-peer resource sharing.', explanation: '"Sharing economy" is economic systems based on sharing resources.' }
      ],
      commonMistakes: [
        { mistake: 'Online shopping is convenient.', correction: 'E-commerce offers convenience and accessibility while transforming traditional retail models.', explanation: 'Use specific e-commerce terminology.' },
        { mistake: 'Gig workers have freedom.', correction: 'The gig economy offers flexibility but raises concerns about job security and worker protections.', explanation: 'Present balanced views on gig work.' },
        { mistake: 'Everyone uses digital money now.', correction: 'Digital payment adoption varies significantly across demographics and regions.', explanation: 'Avoid overgeneralizations.' }
      ],
      miniPractice: [
        { question: 'The _____ economy involves short-term, freelance work arrangements.', type: 'fill-blank' },
        { question: 'Which term describes technology applied to financial services?', options: ['fintech', 'biotech', 'edtech', 'medtech'], type: 'multiple-choice' },
        { question: 'Rewrite: "People buy things online now."', type: 'rewrite' },
        { question: 'Digital _____ is integrating technology into all business areas.', type: 'fill-blank' }
      ],
      answerKey: [
        'gig',
        'fintech',
        'E-commerce has transformed consumer behavior, with online retail experiencing significant growth.',
        'transformation'
      ],
      quickRecap: 'Key terms: "e-commerce", "digital payments", "gig economy", "platform businesses", "cryptocurrency", "fintech", "remote work", "digital transformation", "subscription models", "sharing economy". Use these for digital economy discussions!',
      collocations: [
        'e-commerce', 'digital payments', 'gig economy', 'platform businesses',
        'cryptocurrency', 'online marketplaces', 'fintech', 'remote work',
        'digital transformation', 'subscription models', 'contactless payments', 'sharing economy'
      ],
      synonyms: [
        { word: 'online', synonyms: ['digital', 'electronic', 'virtual', 'internet-based'] },
        { word: 'buy', synonyms: ['purchase', 'acquire', 'procure', 'order'] },
        { word: 'work', synonyms: ['employment', 'labor', 'occupation', 'job'] }
      ],
      speakingLines: [
        'E-commerce has fundamentally transformed retail, offering convenience while challenging traditional stores.',
        'The gig economy provides flexibility but raises important questions about worker protections.',
        'Digital transformation is no longer optional for businesses seeking to remain competitive.'
      ]
    }
  },
  {
    id: 'vocab-technology-8',
    title: 'Internet of Things & Smart Devices',
    slug: 'internet-of-things-smart-devices',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Technology',
    description: 'Vocabulary for discussing connected devices, smart homes, and IoT applications.',
    is_premium: true,
    is_published: true,
    view_count: 620,
    created_at: '2024-04-15T10:00:00Z',
    updated_at: '2024-04-15T10:00:00Z',
    content: {
      title: 'Internet of Things & Smart Devices',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 IoT and smart device terms',
        'Discuss connected technology benefits and risks',
        'Use smart home vocabulary'
      ],
      coreExplanation: `The Internet of Things (IoT) is connecting everyday objects to the internet. To achieve Band 7+, you need vocabulary that allows you to discuss smart devices, their benefits, and potential concerns.

This lesson covers IoT technology, smart homes, and connected devices. Understanding these concepts helps you discuss how technology is integrating into daily life and its implications.`,
      examples: [
        { sentence: 'The Internet of Things connects everyday objects to the internet.', explanation: '"Internet of Things" (IoT) is the network of connected devices.' },
        { sentence: 'Smart home devices automate household functions.', explanation: '"Smart home" uses technology for automated control.' },
        { sentence: 'Wearable technology monitors health and fitness metrics.', explanation: '"Wearable technology" includes smartwatches and fitness trackers.' },
        { sentence: 'Connected devices generate vast amounts of data.', explanation: '"Connected devices" are objects linked to the internet.' },
        { sentence: 'Voice assistants respond to spoken commands.', explanation: '"Voice assistants" are AI systems like Alexa and Siri.' },
        { sentence: 'Smart sensors detect environmental changes automatically.', explanation: '"Smart sensors" are devices that collect and transmit data.' },
        { sentence: 'Home automation improves energy efficiency.', explanation: '"Home automation" is automatic control of household systems.' },
        { sentence: 'IoT security vulnerabilities pose privacy risks.', explanation: '"Security vulnerabilities" are weaknesses that can be exploited.' },
        { sentence: 'Smart grids optimize electricity distribution.', explanation: '"Smart grids" are modernized electrical networks.' },
        { sentence: 'Connected cars communicate with infrastructure and other vehicles.', explanation: '"Connected cars" have internet connectivity.' },
        { sentence: 'Edge computing processes data closer to its source.', explanation: '"Edge computing" is processing data near where it\'s generated.' },
        { sentence: 'Smart cities use IoT for urban management.', explanation: '"Smart cities" integrate technology into urban infrastructure.' },
        { sentence: 'Device interoperability enables seamless communication.', explanation: '"Interoperability" is the ability of systems to work together.' },
        { sentence: 'Ambient intelligence creates responsive environments.', explanation: '"Ambient intelligence" is technology that responds to human presence.' },
        { sentence: 'IoT platforms manage connected device networks.', explanation: '"IoT platforms" are software for managing IoT devices.' }
      ],
      commonMistakes: [
        { mistake: 'Smart devices are convenient.', correction: 'IoT devices offer convenience and efficiency but raise concerns about privacy and security.', explanation: 'Present balanced views including risks.' },
        { mistake: 'Everything will be connected to the internet.', correction: 'IoT adoption is expanding, though concerns about security and privacy may limit certain applications.', explanation: 'Avoid absolute predictions.' },
        { mistake: 'Smart homes save energy.', correction: 'Home automation can optimize energy consumption, though actual savings depend on usage patterns.', explanation: 'Qualify claims appropriately.' }
      ],
      miniPractice: [
        { question: 'The Internet of _____ connects everyday objects to the internet.', type: 'fill-blank' },
        { question: 'Which term describes AI systems that respond to voice commands?', options: ['voice assistants', 'smart speakers', 'audio bots', 'sound AI'], type: 'multiple-choice' },
        { question: 'Rewrite: "Smart devices can be hacked."', type: 'rewrite' },
        { question: 'Smart _____ optimize electricity distribution.', type: 'fill-blank' }
      ],
      answerKey: [
        'Things',
        'voice assistants',
        'IoT devices have security vulnerabilities that can be exploited by malicious actors.',
        'grids'
      ],
      quickRecap: 'Key terms: "Internet of Things", "smart home", "wearable technology", "connected devices", "voice assistants", "smart sensors", "home automation", "smart grids", "edge computing", "interoperability". Use these for IoT discussions!',
      collocations: [
        'Internet of Things', 'smart home', 'wearable technology', 'connected devices',
        'voice assistants', 'smart sensors', 'home automation', 'security vulnerabilities',
        'smart grids', 'connected cars', 'edge computing', 'smart cities'
      ],
      synonyms: [
        { word: 'smart', synonyms: ['intelligent', 'connected', 'automated', 'digital'] },
        { word: 'device', synonyms: ['gadget', 'appliance', 'equipment', 'technology'] },
        { word: 'connect', synonyms: ['link', 'network', 'integrate', 'interface'] }
      ],
      speakingLines: [
        'The Internet of Things is transforming how we interact with everyday objects.',
        'Smart home technology offers convenience but raises legitimate privacy concerns.',
        'IoT security must be prioritized as connected devices become more prevalent.'
      ]
    }
  },
  // ============================================
  // BATCH 4: Health & Wellbeing (6 more lessons)
  // ============================================
  {
    id: 'vocab-health-3',
    title: 'Mental Health & Psychology',
    slug: 'mental-health-psychology',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Health',
    description: 'Vocabulary for discussing mental health issues, psychological wellbeing, and therapy.',
    is_premium: true,
    is_published: true,
    view_count: 920,
    created_at: '2024-04-18T10:00:00Z',
    updated_at: '2024-04-18T10:00:00Z',
    content: {
      title: 'Mental Health & Psychology',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 mental health terms',
        'Discuss psychological wellbeing sensitively',
        'Use therapy and treatment vocabulary'
      ],
      coreExplanation: `Mental health topics are increasingly common in IELTS as awareness grows. To achieve Band 7+, you need vocabulary that allows you to discuss psychological issues sensitively and accurately.

This lesson covers mental health conditions, treatments, and wellbeing concepts. Understanding these terms helps you discuss the importance of mental health in modern society.`,
      examples: [
        { sentence: 'Mental health awareness has increased significantly in recent years.', explanation: '"Mental health awareness" is understanding of psychological wellbeing.' },
        { sentence: 'Depression and anxiety are the most common mental health conditions.', explanation: '"Depression" and "anxiety" are prevalent psychological disorders.' },
        { sentence: 'Stigma surrounding mental illness prevents many from seeking help.', explanation: '"Stigma" is negative attitudes and discrimination.' },
        { sentence: 'Cognitive behavioral therapy is an effective treatment approach.', explanation: '"Cognitive behavioral therapy" (CBT) is a common psychological treatment.' },
        { sentence: 'Psychological resilience helps people cope with adversity.', explanation: '"Resilience" is the ability to recover from difficulties.' },
        { sentence: 'Work-related stress contributes to burnout and mental health issues.', explanation: '"Burnout" is exhaustion from prolonged stress.' },
        { sentence: 'Early intervention improves outcomes for mental health conditions.', explanation: '"Early intervention" is treatment at the onset of problems.' },
        { sentence: 'Mindfulness practices reduce stress and improve wellbeing.', explanation: '"Mindfulness" is awareness of the present moment.' },
        { sentence: 'Social isolation negatively impacts mental health.', explanation: '"Social isolation" is lack of social contact.' },
        { sentence: 'Trauma can have lasting psychological effects.', explanation: '"Trauma" is deeply distressing experiences.' },
        { sentence: 'Self-care practices support mental wellbeing.', explanation: '"Self-care" is activities that maintain health.' },
        { sentence: 'Mental health services are often underfunded.', explanation: '"Mental health services" are professional psychological support.' },
        { sentence: 'Emotional intelligence involves understanding and managing emotions.', explanation: '"Emotional intelligence" is awareness of emotions.' },
        { sentence: 'Substance abuse often co-occurs with mental health disorders.', explanation: '"Substance abuse" is harmful use of drugs or alcohol.' },
        { sentence: 'Destigmatization encourages people to seek mental health support.', explanation: '"Destigmatization" is reducing negative attitudes.' }
      ],
      commonMistakes: [
        { mistake: 'He is crazy.', correction: 'He is experiencing mental health challenges / living with a mental health condition.', explanation: 'Avoid stigmatizing language; use respectful terms.' },
        { mistake: 'Depression is just sadness.', correction: 'Depression is a clinical condition distinct from normal sadness, affecting mood, energy, and functioning.', explanation: 'Distinguish clinical conditions from normal emotions.' },
        { mistake: 'People with mental illness are dangerous.', correction: 'People with mental health conditions are more likely to be victims than perpetrators of violence.', explanation: 'Challenge harmful stereotypes.' }
      ],
      miniPractice: [
        { question: '_____ surrounding mental illness prevents many from seeking help.', type: 'fill-blank' },
        { question: 'Which therapy focuses on changing thought patterns?', options: ['cognitive behavioral therapy', 'psychoanalysis', 'group therapy', 'art therapy'], type: 'multiple-choice' },
        { question: 'Rewrite: "He went crazy from stress."', type: 'rewrite' },
        { question: 'Psychological _____ helps people cope with adversity.', type: 'fill-blank' }
      ],
      answerKey: [
        'Stigma',
        'cognitive behavioral therapy',
        'He experienced burnout / mental health challenges due to prolonged work-related stress.',
        'resilience'
      ],
      quickRecap: 'Key terms: "mental health awareness", "depression", "anxiety", "stigma", "cognitive behavioral therapy", "resilience", "burnout", "mindfulness", "trauma", "emotional intelligence". Use respectful, person-first language!',
      collocations: [
        'mental health awareness', 'mental health conditions', 'cognitive behavioral therapy', 'psychological resilience',
        'work-related stress', 'early intervention', 'mindfulness practices', 'social isolation',
        'self-care practices', 'emotional intelligence', 'substance abuse', 'mental health services'
      ],
      synonyms: [
        { word: 'crazy', synonyms: ['experiencing mental health challenges', 'living with a condition', 'struggling with', 'affected by'] },
        { word: 'sad', synonyms: ['depressed', 'low mood', 'melancholic', 'despondent'] },
        { word: 'stressed', synonyms: ['overwhelmed', 'anxious', 'burnt out', 'under pressure'] }
      ],
      speakingLines: [
        'Mental health awareness has improved, but stigma still prevents many from seeking help.',
        'Work-related stress and burnout have become significant public health concerns.',
        'Early intervention and accessible mental health services are crucial for positive outcomes.'
      ]
    }
  },
  {
    id: 'vocab-health-4',
    title: 'Healthcare Systems & Access',
    slug: 'healthcare-systems-access',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Health',
    description: 'Advanced vocabulary for discussing healthcare systems, insurance, and access to medical care.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-04-22T10:00:00Z',
    updated_at: '2024-04-22T10:00:00Z',
    content: {
      title: 'Healthcare Systems & Access',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 healthcare system terms',
        'Discuss healthcare policy and access',
        'Compare different healthcare models'
      ],
      coreExplanation: `Healthcare systems are a common IELTS Writing Task 2 topic. To achieve Band 8+, you need vocabulary that allows you to discuss different healthcare models, funding mechanisms, and access issues.

This lesson covers healthcare policy, insurance systems, and access to care. Understanding these concepts helps you discuss the role of government in healthcare provision.`,
      examples: [
        { sentence: 'Universal healthcare provides coverage for all citizens.', explanation: '"Universal healthcare" is a system covering everyone.' },
        { sentence: 'Healthcare expenditure varies significantly between countries.', explanation: '"Healthcare expenditure" is spending on health services.' },
        { sentence: 'Private insurance supplements public healthcare in many countries.', explanation: '"Private insurance" is non-government health coverage.' },
        { sentence: 'Healthcare disparities exist between different socioeconomic groups.', explanation: '"Healthcare disparities" are differences in health outcomes.' },
        { sentence: 'Primary care physicians serve as the first point of contact.', explanation: '"Primary care" is initial, general medical care.' },
        { sentence: 'Out-of-pocket expenses can be a barrier to healthcare access.', explanation: '"Out-of-pocket expenses" are costs paid directly by patients.' },
        { sentence: 'Healthcare rationing involves allocating limited resources.', explanation: '"Rationing" is distributing scarce resources.' },
        { sentence: 'Preventive care reduces long-term healthcare costs.', explanation: '"Preventive care" is healthcare to prevent illness.' },
        { sentence: 'Healthcare workforce shortages affect service delivery.', explanation: '"Workforce shortages" are insufficient healthcare workers.' },
        { sentence: 'Single-payer systems are funded through taxation.', explanation: '"Single-payer" is government-funded healthcare.' },
        { sentence: 'Healthcare privatization has both supporters and critics.', explanation: '"Privatization" is transferring to private ownership.' },
        { sentence: 'Medical tourism involves traveling abroad for treatment.', explanation: '"Medical tourism" is seeking healthcare in other countries.' },
        { sentence: 'Healthcare infrastructure includes hospitals and clinics.', explanation: '"Healthcare infrastructure" is physical facilities.' },
        { sentence: 'Copayments require patients to share treatment costs.', explanation: '"Copayments" are patient contributions to costs.' },
        { sentence: 'Healthcare reform aims to improve system efficiency.', explanation: '"Healthcare reform" is changing healthcare systems.' }
      ],
      commonMistakes: [
        { mistake: 'Free healthcare is better.', correction: 'Universal healthcare systems, while publicly funded, involve trade-offs between access, quality, and cost.', explanation: 'Avoid oversimplification; discuss nuances.' },
        { mistake: 'Private healthcare is only for rich people.', correction: 'Private healthcare access varies based on insurance coverage, employer benefits, and individual circumstances.', explanation: 'Acknowledge complexity in healthcare access.' },
        { mistake: 'The government should pay for all healthcare.', correction: 'Healthcare funding models involve complex trade-offs between public provision, private insurance, and individual responsibility.', explanation: 'Present balanced policy discussions.' }
      ],
      miniPractice: [
        { question: '_____ healthcare provides coverage for all citizens.', type: 'fill-blank' },
        { question: 'Which term describes differences in health outcomes between groups?', options: ['healthcare disparities', 'health gaps', 'medical differences', 'care variations'], type: 'multiple-choice' },
        { question: 'Rewrite: "Poor people cannot afford doctors."', type: 'rewrite' },
        { question: 'Out-of-pocket _____ can be a barrier to healthcare access.', type: 'fill-blank' }
      ],
      answerKey: [
        'Universal',
        'healthcare disparities',
        'Socioeconomic factors create healthcare disparities, limiting access to medical services for lower-income populations.',
        'expenses'
      ],
      quickRecap: 'Key terms: "universal healthcare", "healthcare expenditure", "healthcare disparities", "primary care", "out-of-pocket expenses", "preventive care", "single-payer", "healthcare privatization", "medical tourism", "healthcare reform". Use these for policy discussions!',
      collocations: [
        'universal healthcare', 'healthcare expenditure', 'private insurance', 'healthcare disparities',
        'primary care', 'out-of-pocket expenses', 'preventive care', 'workforce shortages',
        'single-payer system', 'healthcare privatization', 'medical tourism', 'healthcare reform'
      ],
      synonyms: [
        { word: 'free', synonyms: ['publicly funded', 'universal', 'government-provided', 'tax-funded'] },
        { word: 'expensive', synonyms: ['costly', 'unaffordable', 'prohibitive', 'high-cost'] },
        { word: 'doctor', synonyms: ['physician', 'healthcare provider', 'medical practitioner', 'clinician'] }
      ],
      speakingLines: [
        'Universal healthcare systems aim to provide equitable access regardless of socioeconomic status.',
        'Healthcare disparities reflect broader social inequalities that require systemic solutions.',
        'Preventive care investment can reduce long-term healthcare expenditure significantly.'
      ]
    }
  },
  {
    id: 'vocab-health-5',
    title: 'Aging & Elderly Care',
    slug: 'aging-elderly-care',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Health',
    description: 'Vocabulary for discussing aging populations, elderly care, and age-related health issues.',
    is_premium: true,
    is_published: true,
    view_count: 680,
    created_at: '2024-04-25T10:00:00Z',
    updated_at: '2024-04-25T10:00:00Z',
    content: {
      title: 'Aging & Elderly Care',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 aging and elderly care terms',
        'Discuss demographic changes and challenges',
        'Use age-related vocabulary sensitively'
      ],
      coreExplanation: `Aging populations are a significant global trend and common IELTS topic. To achieve Band 7+, you need vocabulary that allows you to discuss demographic changes and their implications.

This lesson covers aging demographics, elderly care, and age-related issues. Understanding these concepts helps you discuss the challenges and opportunities of aging societies.`,
      examples: [
        { sentence: 'Aging populations pose challenges for healthcare and pension systems.', explanation: '"Aging populations" have increasing proportions of elderly people.' },
        { sentence: 'Life expectancy has increased dramatically over the past century.', explanation: '"Life expectancy" is average lifespan.' },
        { sentence: 'Elderly care facilities provide residential support for seniors.', explanation: '"Elderly care facilities" are nursing homes and care centers.' },
        { sentence: 'Dementia affects millions of older adults worldwide.', explanation: '"Dementia" is cognitive decline affecting memory and thinking.' },
        { sentence: 'Intergenerational solidarity involves support between age groups.', explanation: '"Intergenerational solidarity" is cooperation across generations.' },
        { sentence: 'Age discrimination in employment affects older workers.', explanation: '"Age discrimination" is unfair treatment based on age.' },
        { sentence: 'Retirement planning is essential for financial security.', explanation: '"Retirement planning" is preparing for post-work life.' },
        { sentence: 'Active aging promotes continued participation in society.', explanation: '"Active aging" is staying engaged in later life.' },
        { sentence: 'Geriatric medicine specializes in elderly healthcare.', explanation: '"Geriatric" relates to elderly health.' },
        { sentence: 'Pension systems face sustainability challenges.', explanation: '"Pension systems" provide retirement income.' },
        { sentence: 'Home care allows elderly people to age in place.', explanation: '"Age in place" is remaining in one\'s home while aging.' },
        { sentence: 'Chronic conditions are more prevalent among older adults.', explanation: '"Chronic conditions" are long-term health issues.' },
        { sentence: 'Social isolation affects many elderly people.', explanation: '"Social isolation" is lack of social connections.' },
        { sentence: 'Dependency ratios measure working-age to elderly populations.', explanation: '"Dependency ratio" is ratio of dependents to workers.' },
        { sentence: 'End-of-life care focuses on comfort and dignity.', explanation: '"End-of-life care" is care for terminally ill patients.' }
      ],
      commonMistakes: [
        { mistake: 'Old people are a burden on society.', correction: 'Aging populations present both challenges and opportunities, with older adults contributing valuable experience and wisdom.', explanation: 'Avoid ageist language; present balanced views.' },
        { mistake: 'Elderly people should live in nursing homes.', correction: 'Care options for older adults range from home care to assisted living, depending on individual needs and preferences.', explanation: 'Acknowledge diverse care options.' },
        { mistake: 'Old people cannot work.', correction: 'Many older adults remain productive and engaged, with age discrimination being a barrier to continued employment.', explanation: 'Challenge stereotypes about aging.' }
      ],
      miniPractice: [
        { question: 'Life _____ has increased dramatically over the past century.', type: 'fill-blank' },
        { question: 'Which term describes cognitive decline in older adults?', options: ['dementia', 'amnesia', 'confusion', 'forgetfulness'], type: 'multiple-choice' },
        { question: 'Rewrite: "Old people are a problem for the economy."', type: 'rewrite' },
        { question: 'Active _____ promotes continued participation in society.', type: 'fill-blank' }
      ],
      answerKey: [
        'expectancy',
        'dementia',
        'Aging populations present economic challenges that require policy adaptations in healthcare and pension systems.',
        'aging'
      ],
      quickRecap: 'Key terms: "aging populations", "life expectancy", "elderly care", "dementia", "intergenerational solidarity", "age discrimination", "active aging", "geriatric", "pension systems", "dependency ratio". Use respectful, non-ageist language!',
      collocations: [
        'aging populations', 'life expectancy', 'elderly care', 'dementia',
        'intergenerational solidarity', 'age discrimination', 'retirement planning', 'active aging',
        'geriatric medicine', 'pension systems', 'home care', 'end-of-life care'
      ],
      synonyms: [
        { word: 'old', synonyms: ['elderly', 'senior', 'older adult', 'aged'] },
        { word: 'nursing home', synonyms: ['care facility', 'residential care', 'assisted living', 'care home'] },
        { word: 'retire', synonyms: ['stop working', 'leave employment', 'exit the workforce', 'step down'] }
      ],
      speakingLines: [
        'Aging populations require policy adaptations in healthcare, pensions, and social services.',
        'Active aging initiatives help older adults remain engaged and contribute to society.',
        'Intergenerational solidarity is essential for addressing the challenges of demographic change.'
      ]
    }
  },
  {
    id: 'vocab-health-6',
    title: 'Public Health & Epidemiology',
    slug: 'public-health-epidemiology',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Health',
    description: 'Advanced vocabulary for discussing disease outbreaks, public health measures, and epidemiology.',
    is_premium: true,
    is_published: true,
    view_count: 850,
    created_at: '2024-04-28T10:00:00Z',
    updated_at: '2024-04-28T10:00:00Z',
    content: {
      title: 'Public Health & Epidemiology',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 public health terms',
        'Discuss disease outbreaks and responses',
        'Use epidemiological vocabulary'
      ],
      coreExplanation: `Public health topics have become more prominent following recent global health events. To achieve Band 8+, you need vocabulary that allows you to discuss disease outbreaks, prevention measures, and health policy.

This lesson covers epidemiology, disease control, and public health interventions. Understanding these concepts helps you discuss how societies respond to health threats.`,
      examples: [
        { sentence: 'Epidemiology studies the distribution and determinants of disease.', explanation: '"Epidemiology" is the study of disease patterns.' },
        { sentence: 'Pandemic preparedness requires coordinated international efforts.', explanation: '"Pandemic preparedness" is planning for disease outbreaks.' },
        { sentence: 'Contact tracing identifies people exposed to infectious diseases.', explanation: '"Contact tracing" is tracking disease transmission.' },
        { sentence: 'Herd immunity occurs when enough people are immune to a disease.', explanation: '"Herd immunity" is community-level protection.' },
        { sentence: 'Quarantine measures isolate potentially infected individuals.', explanation: '"Quarantine" is separating exposed people.' },
        { sentence: 'Disease surveillance monitors health trends in populations.', explanation: '"Disease surveillance" is tracking disease occurrence.' },
        { sentence: 'Vaccination campaigns aim to achieve widespread immunity.', explanation: '"Vaccination campaigns" are organized immunization efforts.' },
        { sentence: 'Infectious disease transmission occurs through various pathways.', explanation: '"Transmission" is how diseases spread.' },
        { sentence: 'Public health interventions target population-level health.', explanation: '"Public health interventions" are measures to improve community health.' },
        { sentence: 'Mortality rates indicate the frequency of death in a population.', explanation: '"Mortality rates" measure death frequency.' },
        { sentence: 'Morbidity refers to the incidence of disease.', explanation: '"Morbidity" is disease occurrence.' },
        { sentence: 'Health literacy enables people to make informed decisions.', explanation: '"Health literacy" is understanding health information.' },
        { sentence: 'Social determinants of health include income and education.', explanation: '"Social determinants" are non-medical factors affecting health.' },
        { sentence: 'Outbreak investigation identifies disease sources.', explanation: '"Outbreak investigation" is studying disease clusters.' },
        { sentence: 'Health promotion encourages healthy behaviors.', explanation: '"Health promotion" is activities to improve health.' }
      ],
      commonMistakes: [
        { mistake: 'The virus spread everywhere.', correction: 'The pathogen exhibited rapid transmission, reaching pandemic proportions.', explanation: 'Use precise epidemiological terminology.' },
        { mistake: 'Everyone should get vaccinated.', correction: 'Vaccination campaigns aim to achieve herd immunity through widespread immunization.', explanation: 'Frame vaccination in public health terms.' },
        { mistake: 'The disease killed many people.', correction: 'The outbreak resulted in significant mortality, with elevated case fatality rates.', explanation: 'Use epidemiological measures.' }
      ],
      miniPractice: [
        { question: '_____ studies the distribution and determinants of disease.', type: 'fill-blank' },
        { question: 'Which term describes community-level disease protection?', options: ['herd immunity', 'group protection', 'mass immunity', 'collective resistance'], type: 'multiple-choice' },
        { question: 'Rewrite: "The disease spread to many countries."', type: 'rewrite' },
        { question: 'Contact _____ identifies people exposed to infectious diseases.', type: 'fill-blank' }
      ],
      answerKey: [
        'Epidemiology',
        'herd immunity',
        'The pathogen exhibited rapid international transmission, reaching pandemic proportions.',
        'tracing'
      ],
      quickRecap: 'Key terms: "epidemiology", "pandemic preparedness", "contact tracing", "herd immunity", "quarantine", "disease surveillance", "vaccination campaigns", "transmission", "mortality rates", "social determinants". Use these for public health discussions!',
      collocations: [
        'epidemiology', 'pandemic preparedness', 'contact tracing', 'herd immunity',
        'quarantine measures', 'disease surveillance', 'vaccination campaigns', 'infectious disease',
        'public health interventions', 'mortality rates', 'health literacy', 'outbreak investigation'
      ],
      synonyms: [
        { word: 'spread', synonyms: ['transmit', 'propagate', 'disseminate', 'circulate'] },
        { word: 'disease', synonyms: ['illness', 'condition', 'pathology', 'infection'] },
        { word: 'prevent', synonyms: ['control', 'contain', 'mitigate', 'curb'] }
      ],
      speakingLines: [
        'Pandemic preparedness requires investment in disease surveillance and healthcare infrastructure.',
        'Herd immunity through vaccination is essential for protecting vulnerable populations.',
        'Social determinants of health significantly influence disease outcomes across populations.'
      ]
    }
  },
  {
    id: 'vocab-health-7',
    title: 'Nutrition & Diet Science',
    slug: 'nutrition-diet-science',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Health',
    description: 'Vocabulary for discussing nutrition science, dietary guidelines, and food-related health issues.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-05-01T10:00:00Z',
    updated_at: '2024-05-01T10:00:00Z',
    content: {
      title: 'Nutrition & Diet Science',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 nutrition and diet terms',
        'Discuss dietary guidelines and health',
        'Use food science vocabulary'
      ],
      coreExplanation: `Nutrition and diet topics appear frequently in IELTS, especially in discussions about health and lifestyle. To achieve Band 7+, you need vocabulary that allows you to discuss dietary science accurately.

This lesson covers nutrition concepts, dietary patterns, and food-related health issues. Understanding these terms helps you discuss the relationship between diet and health.`,
      examples: [
        { sentence: 'Macronutrients include carbohydrates, proteins, and fats.', explanation: '"Macronutrients" are nutrients needed in large amounts.' },
        { sentence: 'Micronutrient deficiencies affect billions worldwide.', explanation: '"Micronutrients" are vitamins and minerals needed in small amounts.' },
        { sentence: 'Dietary guidelines recommend balanced nutrient intake.', explanation: '"Dietary guidelines" are official nutrition recommendations.' },
        { sentence: 'Food security ensures access to sufficient, nutritious food.', explanation: '"Food security" is reliable access to adequate food.' },
        { sentence: 'Malnutrition encompasses both undernutrition and overnutrition.', explanation: '"Malnutrition" is inadequate or excessive nutrition.' },
        { sentence: 'Plant-based diets have gained popularity for health and environmental reasons.', explanation: '"Plant-based diets" emphasize foods from plants.' },
        { sentence: 'Caloric intake should match energy expenditure.', explanation: '"Caloric intake" is energy consumed from food.' },
        { sentence: 'Ultra-processed foods are linked to various health problems.', explanation: '"Ultra-processed foods" are heavily manufactured products.' },
        { sentence: 'Nutritional labeling helps consumers make informed choices.', explanation: '"Nutritional labeling" is food package information.' },
        { sentence: 'Dietary fiber promotes digestive health.', explanation: '"Dietary fiber" is indigestible plant material.' },
        { sentence: 'Food additives include preservatives and colorings.', explanation: '"Food additives" are substances added to food.' },
        { sentence: 'Metabolic disorders affect how the body processes nutrients.', explanation: '"Metabolic disorders" are conditions affecting metabolism.' },
        { sentence: 'Sustainable diets consider both health and environmental impact.', explanation: '"Sustainable diets" are nutritious and environmentally friendly.' },
        { sentence: 'Portion sizes have increased significantly over decades.', explanation: '"Portion sizes" are amounts of food served.' },
        { sentence: 'Nutritional epidemiology studies diet-disease relationships.', explanation: '"Nutritional epidemiology" is research on diet and health.' }
      ],
      commonMistakes: [
        { mistake: 'Carbs are bad for you.', correction: 'Carbohydrates are essential macronutrients, though the type and quantity consumed affect health outcomes.', explanation: 'Avoid oversimplified nutrition claims.' },
        { mistake: 'You should eat less to be healthy.', correction: 'Optimal nutrition involves balanced macronutrient and micronutrient intake appropriate for individual needs.', explanation: 'Discuss nutrition comprehensively.' },
        { mistake: 'Organic food is healthier.', correction: 'The health benefits of organic versus conventional foods remain a subject of ongoing research and debate.', explanation: 'Present evidence-based views.' }
      ],
      miniPractice: [
        { question: '_____ include carbohydrates, proteins, and fats.', type: 'fill-blank' },
        { question: 'Which term describes reliable access to adequate food?', options: ['food security', 'food safety', 'food access', 'food availability'], type: 'multiple-choice' },
        { question: 'Rewrite: "Junk food is bad for health."', type: 'rewrite' },
        { question: 'Ultra-_____ foods are linked to various health problems.', type: 'fill-blank' }
      ],
      answerKey: [
        'Macronutrients',
        'food security',
        'Ultra-processed foods are associated with increased risk of various health conditions.',
        'processed'
      ],
      quickRecap: 'Key terms: "macronutrients", "micronutrients", "dietary guidelines", "food security", "malnutrition", "plant-based diets", "caloric intake", "ultra-processed foods", "dietary fiber", "sustainable diets". Use these for nutrition discussions!',
      collocations: [
        'macronutrients', 'micronutrient deficiencies', 'dietary guidelines', 'food security',
        'malnutrition', 'plant-based diets', 'caloric intake', 'ultra-processed foods',
        'nutritional labeling', 'dietary fiber', 'metabolic disorders', 'sustainable diets'
      ],
      synonyms: [
        { word: 'healthy', synonyms: ['nutritious', 'wholesome', 'nourishing', 'beneficial'] },
        { word: 'diet', synonyms: ['nutrition', 'eating habits', 'food intake', 'dietary pattern'] },
        { word: 'food', synonyms: ['nutrition', 'nourishment', 'sustenance', 'dietary intake'] }
      ],
      speakingLines: [
        'Balanced macronutrient intake is more important than following restrictive diets.',
        'Ultra-processed foods have been linked to various health problems in nutritional research.',
        'Sustainable diets consider both nutritional adequacy and environmental impact.'
      ]
    }
  },
  {
    id: 'vocab-health-8',
    title: 'Global Health Challenges',
    slug: 'global-health-challenges',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Health',
    description: 'Advanced vocabulary for discussing international health issues, disease burden, and global health initiatives.',
    is_premium: true,
    is_published: true,
    view_count: 620,
    created_at: '2024-05-05T10:00:00Z',
    updated_at: '2024-05-05T10:00:00Z',
    content: {
      title: 'Global Health Challenges',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 global health terms',
        'Discuss international health issues',
        'Use development health vocabulary'
      ],
      coreExplanation: `Global health topics connect health to international development and inequality. To achieve Band 8+, you need vocabulary that allows you to discuss health challenges across different countries and contexts.

This lesson covers global health challenges, international initiatives, and health equity. Understanding these concepts helps you discuss health in a global context.`,
      examples: [
        { sentence: 'The global disease burden falls disproportionately on developing countries.', explanation: '"Disease burden" is the impact of health problems.' },
        { sentence: 'Neglected tropical diseases affect the world\'s poorest populations.', explanation: '"Neglected tropical diseases" are conditions affecting poor regions.' },
        { sentence: 'Health equity requires addressing social determinants of health.', explanation: '"Health equity" is fair distribution of health outcomes.' },
        { sentence: 'International health organizations coordinate global responses.', explanation: '"International health organizations" include WHO and others.' },
        { sentence: 'Maternal mortality remains high in many developing regions.', explanation: '"Maternal mortality" is death during pregnancy or childbirth.' },
        { sentence: 'Child vaccination rates have improved globally.', explanation: '"Vaccination rates" measure immunization coverage.' },
        { sentence: 'Antimicrobial resistance threatens global health security.', explanation: '"Antimicrobial resistance" is when pathogens resist treatments.' },
        { sentence: 'Health systems strengthening improves service delivery.', explanation: '"Health systems strengthening" is improving healthcare capacity.' },
        { sentence: 'Non-communicable diseases are rising in developing countries.', explanation: '"Non-communicable diseases" are not spread between people.' },
        { sentence: 'Global health governance involves multiple stakeholders.', explanation: '"Global health governance" is international health decision-making.' },
        { sentence: 'Health aid flows from developed to developing countries.', explanation: '"Health aid" is international assistance for health.' },
        { sentence: 'Sustainable Development Goals include health targets.', explanation: '"Sustainable Development Goals" are UN development objectives.' },
        { sentence: 'Health workforce migration affects developing countries.', explanation: '"Health workforce migration" is healthcare workers moving abroad.' },
        { sentence: 'Essential medicines should be accessible to all.', explanation: '"Essential medicines" are basic necessary drugs.' },
        { sentence: 'Health diplomacy addresses health through international relations.', explanation: '"Health diplomacy" is using health for diplomatic purposes.' }
      ],
      commonMistakes: [
        { mistake: 'Poor countries have bad healthcare.', correction: 'Developing countries face healthcare challenges including limited resources, infrastructure gaps, and workforce shortages.', explanation: 'Discuss specific challenges rather than generalizing.' },
        { mistake: 'Rich countries should help poor countries.', correction: 'International health cooperation and aid can support health systems strengthening in resource-limited settings.', explanation: 'Use development terminology.' },
        { mistake: 'Diseases only affect poor people.', correction: 'While disease burden is higher in lower-income populations, health challenges affect all socioeconomic groups globally.', explanation: 'Acknowledge complexity in global health.' }
      ],
      miniPractice: [
        { question: 'The global disease _____ falls disproportionately on developing countries.', type: 'fill-blank' },
        { question: 'Which term describes fair distribution of health outcomes?', options: ['health equity', 'health equality', 'health justice', 'health fairness'], type: 'multiple-choice' },
        { question: 'Rewrite: "Poor countries have more diseases."', type: 'rewrite' },
        { question: 'Antimicrobial _____ threatens global health security.', type: 'fill-blank' }
      ],
      answerKey: [
        'burden',
        'health equity',
        'Developing countries bear a disproportionate share of the global disease burden.',
        'resistance'
      ],
      quickRecap: 'Key terms: "disease burden", "neglected tropical diseases", "health equity", "maternal mortality", "antimicrobial resistance", "health systems strengthening", "non-communicable diseases", "global health governance", "Sustainable Development Goals", "health diplomacy". Use these for global health discussions!',
      collocations: [
        'disease burden', 'neglected tropical diseases', 'health equity', 'international health organizations',
        'maternal mortality', 'vaccination rates', 'antimicrobial resistance', 'health systems strengthening',
        'non-communicable diseases', 'global health governance', 'Sustainable Development Goals', 'essential medicines'
      ],
      synonyms: [
        { word: 'poor', synonyms: ['developing', 'low-income', 'resource-limited', 'underserved'] },
        { word: 'help', synonyms: ['aid', 'assistance', 'support', 'cooperation'] },
        { word: 'disease', synonyms: ['illness', 'condition', 'health challenge', 'morbidity'] }
      ],
      speakingLines: [
        'Global health equity requires addressing the social determinants that drive health disparities.',
        'Antimicrobial resistance is an emerging threat that requires coordinated international action.',
        'Health systems strengthening is essential for achieving the Sustainable Development Goals.'
      ]
    }
  },
  // ============================================
  // BATCH 5: Economy & Business (7 more lessons)
  // ============================================
  {
    id: 'vocab-economy-2',
    title: 'Employment & Labor Markets',
    slug: 'employment-labor-markets',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Economy',
    description: 'Vocabulary for discussing employment, unemployment, and labor market dynamics.',
    is_premium: true,
    is_published: true,
    view_count: 880,
    created_at: '2024-05-08T10:00:00Z',
    updated_at: '2024-05-08T10:00:00Z',
    content: {
      title: 'Employment & Labor Markets',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 employment and labor terms',
        'Discuss unemployment and job markets',
        'Use workforce vocabulary accurately'
      ],
      coreExplanation: `Employment topics are common in IELTS, especially in discussions about economic policy and social issues. To achieve Band 7+, you need vocabulary that allows you to discuss labor markets and employment trends.

This lesson covers employment, unemployment, and workforce dynamics. Understanding these concepts helps you discuss economic and social aspects of work.`,
      examples: [
        { sentence: 'The unemployment rate measures the percentage of jobless workers.', explanation: '"Unemployment rate" is the proportion of unemployed people.' },
        { sentence: 'Labor force participation has changed significantly over decades.', explanation: '"Labor force participation" is the proportion of working-age people employed or seeking work.' },
        { sentence: 'Job creation is essential for economic growth.', explanation: '"Job creation" is generating new employment opportunities.' },
        { sentence: 'Underemployment occurs when workers have insufficient work.', explanation: '"Underemployment" is working less than desired or below skill level.' },
        { sentence: 'Minimum wage policies aim to ensure fair compensation.', explanation: '"Minimum wage" is the lowest legal hourly pay.' },
        { sentence: 'Labor unions advocate for workers\' rights.', explanation: '"Labor unions" are organizations representing workers.' },
        { sentence: 'Structural unemployment results from economic changes.', explanation: '"Structural unemployment" is joblessness from economic shifts.' },
        { sentence: 'The gig economy has transformed traditional employment.', explanation: '"Gig economy" is short-term, freelance work arrangements.' },
        { sentence: 'Workforce development programs improve employability.', explanation: '"Workforce development" is training to improve job skills.' },
        { sentence: 'Job security has declined in many sectors.', explanation: '"Job security" is stability of employment.' },
        { sentence: 'Labor market flexibility affects hiring and firing practices.', explanation: '"Labor market flexibility" is ease of employment changes.' },
        { sentence: 'Youth unemployment is particularly high in many countries.', explanation: '"Youth unemployment" is joblessness among young people.' },
        { sentence: 'Wage stagnation has affected living standards.', explanation: '"Wage stagnation" is lack of salary growth.' },
        { sentence: 'Employment contracts define working conditions.', explanation: '"Employment contracts" are formal work agreements.' },
        { sentence: 'Labor shortages affect certain industries.', explanation: '"Labor shortages" are insufficient workers for available jobs.' }
      ],
      commonMistakes: [
        { mistake: 'Many people don\'t have jobs.', correction: 'The unemployment rate has risen / Many workers face joblessness due to economic conditions.', explanation: 'Use specific employment terminology.' },
        { mistake: 'Workers should be paid more.', correction: 'Wage policies should ensure fair compensation that reflects productivity and living costs.', explanation: 'Discuss wages in economic context.' },
        { mistake: 'Jobs are disappearing.', correction: 'Structural changes in the economy are transforming employment patterns across sectors.', explanation: 'Discuss employment changes precisely.' }
      ],
      miniPractice: [
        { question: 'The _____ rate measures the percentage of jobless workers.', type: 'fill-blank' },
        { question: 'Which term describes working less than desired?', options: ['underemployment', 'unemployment', 'part-time work', 'casual work'], type: 'multiple-choice' },
        { question: 'Rewrite: "Young people can\'t find jobs."', type: 'rewrite' },
        { question: 'Labor _____ advocate for workers\' rights.', type: 'fill-blank' }
      ],
      answerKey: [
        'unemployment',
        'underemployment',
        'Youth unemployment remains elevated, with young people facing significant barriers to entering the labor market.',
        'unions'
      ],
      quickRecap: 'Key terms: "unemployment rate", "labor force participation", "job creation", "underemployment", "minimum wage", "labor unions", "structural unemployment", "gig economy", "job security", "wage stagnation". Use these for employment discussions!',
      collocations: [
        'unemployment rate', 'labor force participation', 'job creation', 'underemployment',
        'minimum wage', 'labor unions', 'structural unemployment', 'gig economy',
        'workforce development', 'job security', 'labor market flexibility', 'youth unemployment'
      ],
      synonyms: [
        { word: 'job', synonyms: ['employment', 'position', 'occupation', 'work'] },
        { word: 'worker', synonyms: ['employee', 'laborer', 'staff member', 'workforce'] },
        { word: 'pay', synonyms: ['wages', 'salary', 'compensation', 'remuneration'] }
      ],
      speakingLines: [
        'Structural unemployment requires workforce development programs to help workers transition to new sectors.',
        'The gig economy offers flexibility but raises concerns about job security and worker protections.',
        'Youth unemployment has long-term consequences for both individuals and the broader economy.'
      ]
    }
  },
  {
    id: 'vocab-economy-3',
    title: 'International Trade & Globalization',
    slug: 'international-trade-globalization',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Economy',
    description: 'Advanced vocabulary for discussing global trade, tariffs, and economic integration.',
    is_premium: true,
    is_published: true,
    view_count: 760,
    created_at: '2024-05-12T10:00:00Z',
    updated_at: '2024-05-12T10:00:00Z',
    content: {
      title: 'International Trade & Globalization',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 international trade terms',
        'Discuss globalization and trade policy',
        'Use economic integration vocabulary'
      ],
      coreExplanation: `International trade and globalization are common IELTS topics. To achieve Band 8+, you need vocabulary that allows you to discuss trade relationships, policies, and their effects.

This lesson covers trade policy, economic integration, and globalization debates. Understanding these concepts helps you discuss how countries interact economically.`,
      examples: [
        { sentence: 'Free trade agreements reduce barriers between countries.', explanation: '"Free trade agreements" are treaties reducing trade restrictions.' },
        { sentence: 'Tariffs are taxes imposed on imported goods.', explanation: '"Tariffs" are import taxes.' },
        { sentence: 'Trade deficits occur when imports exceed exports.', explanation: '"Trade deficit" is negative balance of trade.' },
        { sentence: 'Protectionism shields domestic industries from foreign competition.', explanation: '"Protectionism" is restricting imports to protect local businesses.' },
        { sentence: 'Supply chains have become increasingly globalized.', explanation: '"Supply chains" are networks producing and distributing goods.' },
        { sentence: 'Economic sanctions restrict trade with certain countries.', explanation: '"Economic sanctions" are trade penalties.' },
        { sentence: 'Comparative advantage explains why countries specialize.', explanation: '"Comparative advantage" is producing goods more efficiently than others.' },
        { sentence: 'Trade liberalization removes barriers to international commerce.', explanation: '"Trade liberalization" is reducing trade restrictions.' },
        { sentence: 'Multinational corporations operate across national borders.', explanation: '"Multinational corporations" are companies in multiple countries.' },
        { sentence: 'Export-oriented economies depend on foreign markets.', explanation: '"Export-oriented" means focused on selling abroad.' },
        { sentence: 'Trade wars involve retaliatory tariffs between countries.', explanation: '"Trade wars" are escalating trade restrictions.' },
        { sentence: 'Economic integration deepens ties between nations.', explanation: '"Economic integration" is combining economies.' },
        { sentence: 'Outsourcing moves production to lower-cost locations.', explanation: '"Outsourcing" is contracting work to external providers.' },
        { sentence: 'Balance of payments records international transactions.', explanation: '"Balance of payments" is a country\'s financial transactions with others.' },
        { sentence: 'Trade negotiations aim to reach mutually beneficial agreements.', explanation: '"Trade negotiations" are discussions to establish trade terms.' }
      ],
      commonMistakes: [
        { mistake: 'Free trade is good for everyone.', correction: 'Free trade creates both winners and losers, with benefits and costs distributed unevenly across sectors and populations.', explanation: 'Present balanced views on trade.' },
        { mistake: 'Countries should make everything themselves.', correction: 'Comparative advantage suggests countries benefit from specializing in goods they produce most efficiently.', explanation: 'Discuss economic theory.' },
        { mistake: 'Globalization only helps rich countries.', correction: 'Globalization has complex effects, with both developed and developing countries experiencing benefits and challenges.', explanation: 'Acknowledge complexity.' }
      ],
      miniPractice: [
        { question: 'Free trade _____ reduce barriers between countries.', type: 'fill-blank' },
        { question: 'Which term describes taxes on imported goods?', options: ['tariffs', 'duties', 'levies', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Countries should protect their own businesses."', type: 'rewrite' },
        { question: 'Trade _____ occur when imports exceed exports.', type: 'fill-blank' }
      ],
      answerKey: [
        'agreements',
        'all of the above',
        'Protectionist policies aim to shield domestic industries from foreign competition.',
        'deficits'
      ],
      quickRecap: 'Key terms: "free trade agreements", "tariffs", "trade deficits", "protectionism", "supply chains", "comparative advantage", "trade liberalization", "multinational corporations", "outsourcing", "balance of payments". Use these for trade discussions!',
      collocations: [
        'free trade agreements', 'tariffs', 'trade deficits', 'protectionism',
        'supply chains', 'economic sanctions', 'comparative advantage', 'trade liberalization',
        'multinational corporations', 'export-oriented', 'trade wars', 'economic integration'
      ],
      synonyms: [
        { word: 'trade', synonyms: ['commerce', 'exchange', 'business', 'transactions'] },
        { word: 'import', synonyms: ['bring in', 'purchase from abroad', 'foreign goods', 'inbound trade'] },
        { word: 'export', synonyms: ['sell abroad', 'ship overseas', 'foreign sales', 'outbound trade'] }
      ],
      speakingLines: [
        'Free trade agreements can boost economic growth but may disadvantage certain domestic industries.',
        'Globalized supply chains have increased efficiency but also created vulnerabilities.',
        'Trade policy involves balancing economic benefits with domestic political considerations.'
      ]
    }
  },
  {
    id: 'vocab-economy-4',
    title: 'Financial Markets & Investment',
    slug: 'financial-markets-investment',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Economy',
    description: 'Advanced vocabulary for discussing stock markets, investment, and financial systems.',
    is_premium: true,
    is_published: true,
    view_count: 690,
    created_at: '2024-05-15T10:00:00Z',
    updated_at: '2024-05-15T10:00:00Z',
    content: {
      title: 'Financial Markets & Investment',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 financial market terms',
        'Discuss investment and markets',
        'Use financial vocabulary accurately'
      ],
      coreExplanation: `Financial markets and investment topics occasionally appear in IELTS. To achieve Band 8+, you need vocabulary that allows you to discuss financial systems and their role in the economy.

This lesson covers stock markets, investment, and financial instruments. Understanding these concepts helps you discuss how capital flows through economies.`,
      examples: [
        { sentence: 'Stock markets facilitate the buying and selling of company shares.', explanation: '"Stock markets" are exchanges for trading company ownership.' },
        { sentence: 'Investment portfolios should be diversified to manage risk.', explanation: '"Diversified" means spread across different assets.' },
        { sentence: 'Interest rates influence borrowing and saving behavior.', explanation: '"Interest rates" are the cost of borrowing money.' },
        { sentence: 'Financial regulation aims to ensure market stability.', explanation: '"Financial regulation" is government oversight of financial systems.' },
        { sentence: 'Capital markets connect savers with borrowers.', explanation: '"Capital markets" are markets for long-term securities.' },
        { sentence: 'Bonds are debt instruments issued by governments and corporations.', explanation: '"Bonds" are loans to issuers that pay interest.' },
        { sentence: 'Market volatility creates both risks and opportunities.', explanation: '"Volatility" is the degree of price variation.' },
        { sentence: 'Venture capital funds early-stage companies.', explanation: '"Venture capital" is investment in startups.' },
        { sentence: 'Financial literacy helps individuals make informed decisions.', explanation: '"Financial literacy" is understanding financial concepts.' },
        { sentence: 'Asset bubbles occur when prices exceed fundamental values.', explanation: '"Asset bubbles" are unsustainable price increases.' },
        { sentence: 'Derivatives are financial instruments based on underlying assets.', explanation: '"Derivatives" are contracts deriving value from other assets.' },
        { sentence: 'Institutional investors manage large pools of capital.', explanation: '"Institutional investors" are organizations investing money.' },
        { sentence: 'Market liquidity enables easy buying and selling.', explanation: '"Liquidity" is the ease of converting assets to cash.' },
        { sentence: 'Financial crises can have devastating economic effects.', explanation: '"Financial crises" are severe disruptions to financial systems.' },
        { sentence: 'Return on investment measures profitability.', explanation: '"Return on investment" (ROI) is profit relative to cost.' }
      ],
      commonMistakes: [
        { mistake: 'The stock market crashed.', correction: 'Financial markets experienced significant volatility / a sharp correction.', explanation: 'Use precise financial terminology.' },
        { mistake: 'Investing is gambling.', correction: 'Investment involves calculated risk management based on analysis and diversification strategies.', explanation: 'Distinguish investment from speculation.' },
        { mistake: 'Banks just keep people\'s money.', correction: 'Financial institutions intermediate between savers and borrowers, allocating capital throughout the economy.', explanation: 'Explain financial system functions.' }
      ],
      miniPractice: [
        { question: 'Stock _____ facilitate the buying and selling of company shares.', type: 'fill-blank' },
        { question: 'Which term describes the degree of price variation?', options: ['volatility', 'liquidity', 'stability', 'flexibility'], type: 'multiple-choice' },
        { question: 'Rewrite: "The stock market went down a lot."', type: 'rewrite' },
        { question: 'Investment portfolios should be _____ to manage risk.', type: 'fill-blank' }
      ],
      answerKey: [
        'markets',
        'volatility',
        'Financial markets experienced significant volatility / a sharp correction in equity prices.',
        'diversified'
      ],
      quickRecap: 'Key terms: "stock markets", "diversified", "interest rates", "financial regulation", "capital markets", "bonds", "volatility", "venture capital", "financial literacy", "asset bubbles". Use these for financial discussions!',
      collocations: [
        'stock markets', 'investment portfolios', 'interest rates', 'financial regulation',
        'capital markets', 'bonds', 'market volatility', 'venture capital',
        'financial literacy', 'asset bubbles', 'institutional investors', 'return on investment'
      ],
      synonyms: [
        { word: 'invest', synonyms: ['allocate capital', 'put money into', 'fund', 'finance'] },
        { word: 'profit', synonyms: ['return', 'gain', 'yield', 'earnings'] },
        { word: 'risk', synonyms: ['exposure', 'uncertainty', 'volatility', 'downside'] }
      ],
      speakingLines: [
        'Financial literacy is essential for individuals to make informed investment decisions.',
        'Market volatility creates both risks and opportunities for investors.',
        'Financial regulation aims to balance market efficiency with systemic stability.'
      ]
    }
  },
  {
    id: 'vocab-economy-5',
    title: 'Economic Development & Poverty',
    slug: 'economic-development-poverty',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Economy',
    description: 'Vocabulary for discussing economic development, poverty reduction, and inequality.',
    is_premium: true,
    is_published: true,
    view_count: 820,
    created_at: '2024-05-18T10:00:00Z',
    updated_at: '2024-05-18T10:00:00Z',
    content: {
      title: 'Economic Development & Poverty',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 development and poverty terms',
        'Discuss inequality and development',
        'Use development economics vocabulary'
      ],
      coreExplanation: `Economic development and poverty are important IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss development challenges and solutions.

This lesson covers poverty, inequality, and development strategies. Understanding these concepts helps you discuss global economic disparities and efforts to address them.`,
      examples: [
        { sentence: 'Extreme poverty affects billions of people worldwide.', explanation: '"Extreme poverty" is living on less than $2.15 per day.' },
        { sentence: 'Income inequality has widened in many countries.', explanation: '"Income inequality" is uneven distribution of earnings.' },
        { sentence: 'Economic development improves living standards.', explanation: '"Economic development" is progress in economic wellbeing.' },
        { sentence: 'Foreign aid supports development in poorer countries.', explanation: '"Foreign aid" is assistance from other countries.' },
        { sentence: 'Microfinance provides small loans to entrepreneurs.', explanation: '"Microfinance" is financial services for low-income people.' },
        { sentence: 'Human development encompasses health, education, and income.', explanation: '"Human development" is broader than economic growth.' },
        { sentence: 'The poverty line defines the minimum income for basic needs.', explanation: '"Poverty line" is the threshold below which people are considered poor.' },
        { sentence: 'Social mobility allows people to improve their economic status.', explanation: '"Social mobility" is movement between economic classes.' },
        { sentence: 'Developing countries face unique economic challenges.', explanation: '"Developing countries" are nations with lower incomes.' },
        { sentence: 'Wealth redistribution aims to reduce inequality.', explanation: '"Wealth redistribution" is transferring resources from rich to poor.' },
        { sentence: 'Infrastructure investment supports economic growth.', explanation: '"Infrastructure investment" is spending on basic facilities.' },
        { sentence: 'The middle class is expanding in many emerging economies.', explanation: '"Middle class" is the economic group between rich and poor.' },
        { sentence: 'Subsistence farming provides only basic survival needs.', explanation: '"Subsistence farming" is growing food only for family consumption.' },
        { sentence: 'Economic empowerment enables people to improve their lives.', explanation: '"Economic empowerment" is gaining economic independence.' },
        { sentence: 'The Gini coefficient measures income inequality.', explanation: '"Gini coefficient" is a statistical measure of inequality.' }
      ],
      commonMistakes: [
        { mistake: 'Poor countries need more money.', correction: 'Developing countries require sustainable development strategies addressing infrastructure, education, and governance.', explanation: 'Discuss comprehensive development approaches.' },
        { mistake: 'Rich people should give money to poor people.', correction: 'Wealth redistribution policies and social safety nets can help reduce inequality.', explanation: 'Use policy terminology.' },
        { mistake: 'Poverty is caused by laziness.', correction: 'Poverty results from complex factors including structural barriers, limited opportunities, and systemic inequalities.', explanation: 'Avoid oversimplified explanations.' }
      ],
      miniPractice: [
        { question: 'Income _____ has widened in many countries.', type: 'fill-blank' },
        { question: 'Which term describes living on less than $2.15 per day?', options: ['extreme poverty', 'relative poverty', 'absolute poverty', 'deep poverty'], type: 'multiple-choice' },
        { question: 'Rewrite: "Poor countries need help from rich countries."', type: 'rewrite' },
        { question: 'Social _____ allows people to improve their economic status.', type: 'fill-blank' }
      ],
      answerKey: [
        'inequality',
        'extreme poverty',
        'Developing countries benefit from international cooperation and sustainable development assistance.',
        'mobility'
      ],
      quickRecap: 'Key terms: "extreme poverty", "income inequality", "economic development", "foreign aid", "microfinance", "human development", "poverty line", "social mobility", "wealth redistribution", "Gini coefficient". Use these for development discussions!',
      collocations: [
        'extreme poverty', 'income inequality', 'economic development', 'foreign aid',
        'microfinance', 'human development', 'poverty line', 'social mobility',
        'developing countries', 'wealth redistribution', 'infrastructure investment', 'economic empowerment'
      ],
      synonyms: [
        { word: 'poor', synonyms: ['impoverished', 'low-income', 'disadvantaged', 'underprivileged'] },
        { word: 'rich', synonyms: ['wealthy', 'affluent', 'high-income', 'prosperous'] },
        { word: 'help', synonyms: ['aid', 'assistance', 'support', 'development cooperation'] }
      ],
      speakingLines: [
        'Income inequality has significant social and economic consequences that require policy attention.',
        'Sustainable economic development requires investment in human capital and infrastructure.',
        'Social mobility is essential for ensuring that economic growth benefits all segments of society.'
      ]
    }
  },
  {
    id: 'vocab-economy-6',
    title: 'Entrepreneurship & Startups',
    slug: 'entrepreneurship-startups',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Economy',
    description: 'Vocabulary for discussing business creation, innovation, and the startup ecosystem.',
    is_premium: true,
    is_published: true,
    view_count: 750,
    created_at: '2024-05-22T10:00:00Z',
    updated_at: '2024-05-22T10:00:00Z',
    content: {
      title: 'Entrepreneurship & Startups',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 entrepreneurship terms',
        'Discuss business creation and innovation',
        'Use startup vocabulary accurately'
      ],
      coreExplanation: `Entrepreneurship and startups are increasingly relevant topics in IELTS. To achieve Band 7+, you need vocabulary that allows you to discuss business creation and innovation.

This lesson covers entrepreneurship, startup culture, and business development. Understanding these concepts helps you discuss economic innovation and job creation.`,
      examples: [
        { sentence: 'Entrepreneurs identify opportunities and create new businesses.', explanation: '"Entrepreneurs" are people who start businesses.' },
        { sentence: 'Startups often disrupt established industries.', explanation: '"Startups" are newly established businesses.' },
        { sentence: 'Venture capital provides funding for high-growth companies.', explanation: '"Venture capital" is investment in early-stage companies.' },
        { sentence: 'Business incubators support early-stage companies.', explanation: '"Business incubators" are programs helping new businesses.' },
        { sentence: 'Scalability determines a startup\'s growth potential.', explanation: '"Scalability" is the ability to grow efficiently.' },
        { sentence: 'Innovation drives competitive advantage.', explanation: '"Innovation" is introducing new ideas or methods.' },
        { sentence: 'Market research identifies customer needs.', explanation: '"Market research" is gathering information about markets.' },
        { sentence: 'Business models define how companies create value.', explanation: '"Business models" are frameworks for generating revenue.' },
        { sentence: 'Seed funding supports the earliest stages of development.', explanation: '"Seed funding" is initial investment in startups.' },
        { sentence: 'Pivoting involves changing business strategy.', explanation: '"Pivoting" is fundamentally changing direction.' },
        { sentence: 'Intellectual property protects innovations.', explanation: '"Intellectual property" includes patents and trademarks.' },
        { sentence: 'Bootstrapping means self-funding a business.', explanation: '"Bootstrapping" is starting without external investment.' },
        { sentence: 'Unicorns are startups valued at over $1 billion.', explanation: '"Unicorns" are rare, highly valued startups.' },
        { sentence: 'Accelerators provide intensive support for startups.', explanation: '"Accelerators" are programs that speed up startup growth.' },
        { sentence: 'Exit strategies include acquisition or IPO.', explanation: '"Exit strategies" are plans for investors to realize returns.' }
      ],
      commonMistakes: [
        { mistake: 'Starting a business is easy.', correction: 'Entrepreneurship involves significant risk, requiring careful planning, market research, and often multiple iterations.', explanation: 'Acknowledge entrepreneurship challenges.' },
        { mistake: 'All startups become successful.', correction: 'Most startups fail, with success depending on factors including market timing, execution, and funding.', explanation: 'Present realistic views on startups.' },
        { mistake: 'You need a lot of money to start a business.', correction: 'Bootstrapping and lean startup methodologies enable entrepreneurs to launch with minimal initial capital.', explanation: 'Discuss various funding approaches.' }
      ],
      miniPractice: [
        { question: '_____ identify opportunities and create new businesses.', type: 'fill-blank' },
        { question: 'Which term describes startups valued at over $1 billion?', options: ['unicorns', 'gazelles', 'dragons', 'phoenixes'], type: 'multiple-choice' },
        { question: 'Rewrite: "He started a new company."', type: 'rewrite' },
        { question: 'Business _____ support early-stage companies.', type: 'fill-blank' }
      ],
      answerKey: [
        'Entrepreneurs',
        'unicorns',
        'He launched a startup / founded an entrepreneurial venture.',
        'incubators'
      ],
      quickRecap: 'Key terms: "entrepreneurs", "startups", "venture capital", "business incubators", "scalability", "innovation", "business models", "seed funding", "pivoting", "intellectual property". Use these for entrepreneurship discussions!',
      collocations: [
        'entrepreneurs', 'startups', 'venture capital', 'business incubators',
        'scalability', 'innovation', 'market research', 'business models',
        'seed funding', 'pivoting', 'intellectual property', 'exit strategies'
      ],
      synonyms: [
        { word: 'start', synonyms: ['launch', 'found', 'establish', 'create'] },
        { word: 'business', synonyms: ['company', 'venture', 'enterprise', 'firm'] },
        { word: 'idea', synonyms: ['concept', 'innovation', 'proposition', 'solution'] }
      ],
      speakingLines: [
        'Entrepreneurship drives economic innovation and job creation.',
        'Startups often disrupt established industries through technological innovation.',
        'The startup ecosystem requires supportive infrastructure including incubators and access to capital.'
      ]
    }
  },
  {
    id: 'vocab-economy-7',
    title: 'Taxation & Government Finance',
    slug: 'taxation-government-finance',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Economy',
    description: 'Advanced vocabulary for discussing tax systems, government spending, and fiscal policy.',
    is_premium: true,
    is_published: true,
    view_count: 620,
    created_at: '2024-05-25T10:00:00Z',
    updated_at: '2024-05-25T10:00:00Z',
    content: {
      title: 'Taxation & Government Finance',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 taxation and fiscal terms',
        'Discuss government finance and spending',
        'Use fiscal policy vocabulary'
      ],
      coreExplanation: `Taxation and government finance are important topics for discussing economic policy. To achieve Band 8+, you need vocabulary that allows you to discuss how governments raise and spend money.

This lesson covers tax systems, government budgets, and fiscal policy. Understanding these concepts helps you discuss the role of government in the economy.`,
      examples: [
        { sentence: 'Progressive taxation imposes higher rates on higher incomes.', explanation: '"Progressive taxation" means tax rates increase with income.' },
        { sentence: 'Government expenditure funds public services.', explanation: '"Government expenditure" is public spending.' },
        { sentence: 'Budget deficits occur when spending exceeds revenue.', explanation: '"Budget deficits" are shortfalls in government finances.' },
        { sentence: 'Tax evasion is illegal avoidance of tax obligations.', explanation: '"Tax evasion" is illegally not paying taxes.' },
        { sentence: 'Fiscal policy uses taxation and spending to influence the economy.', explanation: '"Fiscal policy" is government economic policy through budgets.' },
        { sentence: 'Public debt accumulates from persistent deficits.', explanation: '"Public debt" is total government borrowing.' },
        { sentence: 'Tax incentives encourage certain economic behaviors.', explanation: '"Tax incentives" are tax benefits for specific activities.' },
        { sentence: 'Austerity measures reduce government spending.', explanation: '"Austerity measures" are spending cuts to reduce deficits.' },
        { sentence: 'Value-added tax is applied at each production stage.', explanation: '"Value-added tax" (VAT) is a consumption tax.' },
        { sentence: 'Tax havens offer low tax rates to attract capital.', explanation: '"Tax havens" are jurisdictions with minimal taxes.' },
        { sentence: 'Fiscal stimulus increases government spending during recessions.', explanation: '"Fiscal stimulus" is expansionary government spending.' },
        { sentence: 'Corporate taxation affects business investment decisions.', explanation: '"Corporate taxation" is taxes on company profits.' },
        { sentence: 'Tax compliance requires accurate reporting and payment.', explanation: '"Tax compliance" is following tax laws.' },
        { sentence: 'Sovereign debt is government borrowing from markets.', explanation: '"Sovereign debt" is national government debt.' },
        { sentence: 'Tax reform aims to improve system efficiency and fairness.', explanation: '"Tax reform" is changing tax systems.' }
      ],
      commonMistakes: [
        { mistake: 'Taxes are too high.', correction: 'Tax policy involves trade-offs between revenue generation, economic efficiency, and distributional fairness.', explanation: 'Discuss taxation analytically.' },
        { mistake: 'The government should spend less.', correction: 'Fiscal policy decisions involve balancing public service provision with fiscal sustainability.', explanation: 'Present balanced fiscal views.' },
        { mistake: 'Rich people don\'t pay taxes.', correction: 'Tax systems vary in progressivity, with debates about appropriate rates for different income levels.', explanation: 'Discuss tax policy objectively.' }
      ],
      miniPractice: [
        { question: '_____ taxation imposes higher rates on higher incomes.', type: 'fill-blank' },
        { question: 'Which term describes illegal avoidance of tax obligations?', options: ['tax evasion', 'tax avoidance', 'tax planning', 'tax minimization'], type: 'multiple-choice' },
        { question: 'Rewrite: "The government spends too much money."', type: 'rewrite' },
        { question: 'Budget _____ occur when spending exceeds revenue.', type: 'fill-blank' }
      ],
      answerKey: [
        'Progressive',
        'tax evasion',
        'Government expenditure levels and fiscal sustainability are subjects of ongoing policy debate.',
        'deficits'
      ],
      quickRecap: 'Key terms: "progressive taxation", "government expenditure", "budget deficits", "tax evasion", "fiscal policy", "public debt", "tax incentives", "austerity measures", "fiscal stimulus", "tax reform". Use these for fiscal policy discussions!',
      collocations: [
        'progressive taxation', 'government expenditure', 'budget deficits', 'tax evasion',
        'fiscal policy', 'public debt', 'tax incentives', 'austerity measures',
        'value-added tax', 'tax havens', 'fiscal stimulus', 'corporate taxation'
      ],
      synonyms: [
        { word: 'tax', synonyms: ['levy', 'duty', 'tariff', 'contribution'] },
        { word: 'spend', synonyms: ['expenditure', 'outlay', 'disbursement', 'allocation'] },
        { word: 'debt', synonyms: ['borrowing', 'liability', 'deficit', 'obligation'] }
      ],
      speakingLines: [
        'Progressive taxation aims to distribute the tax burden according to ability to pay.',
        'Fiscal policy must balance economic stimulus with long-term fiscal sustainability.',
        'Tax reform debates involve trade-offs between efficiency, simplicity, and fairness.'
      ]
    }
  },
  {
    id: 'vocab-economy-8',
    title: 'Consumer Behavior & Marketing',
    slug: 'consumer-behavior-marketing',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Economy',
    description: 'Vocabulary for discussing consumer psychology, advertising, and marketing strategies.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-05-28T10:00:00Z',
    updated_at: '2024-05-28T10:00:00Z',
    content: {
      title: 'Consumer Behavior & Marketing',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 consumer and marketing terms',
        'Discuss advertising and consumer psychology',
        'Use marketing vocabulary accurately'
      ],
      coreExplanation: `Consumer behavior and marketing are relevant to many IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss how businesses influence consumers and how people make purchasing decisions.

This lesson covers consumer psychology, advertising, and marketing strategies. Understanding these concepts helps you discuss the relationship between businesses and consumers.`,
      examples: [
        { sentence: 'Consumer behavior is influenced by psychological and social factors.', explanation: '"Consumer behavior" is how people make purchasing decisions.' },
        { sentence: 'Brand loyalty keeps customers returning to familiar products.', explanation: '"Brand loyalty" is consistent preference for a brand.' },
        { sentence: 'Targeted advertising reaches specific demographic groups.', explanation: '"Targeted advertising" is ads aimed at particular audiences.' },
        { sentence: 'Market segmentation divides consumers into distinct groups.', explanation: '"Market segmentation" is categorizing consumers.' },
        { sentence: 'Impulse buying occurs without prior planning.', explanation: '"Impulse buying" is unplanned purchasing.' },
        { sentence: 'Consumer protection laws safeguard buyer rights.', explanation: '"Consumer protection" is legal safeguards for buyers.' },
        { sentence: 'Advertising campaigns shape brand perception.', explanation: '"Advertising campaigns" are coordinated marketing efforts.' },
        { sentence: 'Price sensitivity varies among consumer segments.', explanation: '"Price sensitivity" is how price affects purchasing.' },
        { sentence: 'Product placement integrates brands into media content.', explanation: '"Product placement" is featuring products in entertainment.' },
        { sentence: 'Consumer confidence affects spending patterns.', explanation: '"Consumer confidence" is optimism about the economy.' },
        { sentence: 'Ethical consumerism considers social and environmental impact.', explanation: '"Ethical consumerism" is values-based purchasing.' },
        { sentence: 'Marketing strategies aim to influence purchasing decisions.', explanation: '"Marketing strategies" are plans to promote products.' },
        { sentence: 'Brand awareness measures consumer recognition.', explanation: '"Brand awareness" is how well consumers know a brand.' },
        { sentence: 'Consumer rights include safety and information.', explanation: '"Consumer rights" are legal protections for buyers.' },
        { sentence: 'Persuasive techniques influence consumer choices.', explanation: '"Persuasive techniques" are methods to convince consumers.' }
      ],
      commonMistakes: [
        { mistake: 'Advertising makes people buy things.', correction: 'Advertising influences consumer behavior through various persuasive techniques and brand messaging.', explanation: 'Discuss advertising effects precisely.' },
        { mistake: 'Companies trick customers.', correction: 'Marketing strategies employ psychological principles to influence purchasing decisions.', explanation: 'Use neutral, analytical language.' },
        { mistake: 'People buy what they need.', correction: 'Consumer behavior is influenced by both rational needs and emotional, social, and psychological factors.', explanation: 'Acknowledge complexity in consumer decisions.' }
      ],
      miniPractice: [
        { question: 'Brand _____ keeps customers returning to familiar products.', type: 'fill-blank' },
        { question: 'Which term describes unplanned purchasing?', options: ['impulse buying', 'spontaneous shopping', 'random purchasing', 'quick buying'], type: 'multiple-choice' },
        { question: 'Rewrite: "Ads make people buy things they don\'t need."', type: 'rewrite' },
        { question: 'Market _____ divides consumers into distinct groups.', type: 'fill-blank' }
      ],
      answerKey: [
        'loyalty',
        'impulse buying',
        'Advertising can influence consumer behavior, sometimes encouraging purchases beyond immediate needs.',
        'segmentation'
      ],
      quickRecap: 'Key terms: "consumer behavior", "brand loyalty", "targeted advertising", "market segmentation", "impulse buying", "consumer protection", "price sensitivity", "consumer confidence", "ethical consumerism", "brand awareness". Use these for marketing discussions!',
      collocations: [
        'consumer behavior', 'brand loyalty', 'targeted advertising', 'market segmentation',
        'impulse buying', 'consumer protection', 'advertising campaigns', 'price sensitivity',
        'product placement', 'consumer confidence', 'ethical consumerism', 'brand awareness'
      ],
      synonyms: [
        { word: 'buy', synonyms: ['purchase', 'acquire', 'consume', 'procure'] },
        { word: 'sell', synonyms: ['market', 'promote', 'advertise', 'merchandise'] },
        { word: 'customer', synonyms: ['consumer', 'buyer', 'client', 'shopper'] }
      ],
      speakingLines: [
        'Consumer behavior is influenced by a complex mix of psychological, social, and economic factors.',
        'Targeted advertising raises questions about privacy and manipulation.',
        'Ethical consumerism reflects growing awareness of the social and environmental impact of purchasing decisions.'
      ]
    }
  },
  // ============================================
  // BATCH 6: Society & Culture (7 lessons)
  // ============================================
  {
    id: 'vocab-society-2',
    title: 'Social Issues & Inequality',
    slug: 'social-issues-inequality',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Society',
    description: 'Vocabulary for discussing social problems, discrimination, and inequality.',
    is_premium: true,
    is_published: true,
    view_count: 890,
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-01T10:00:00Z',
    content: {
      title: 'Social Issues & Inequality',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 social issues terms',
        'Discuss inequality and discrimination',
        'Use social justice vocabulary'
      ],
      coreExplanation: `Social issues are common IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss social problems sensitively and analytically.

This lesson covers social inequality, discrimination, and related issues. Understanding these concepts helps you discuss challenges facing modern societies.`,
      examples: [
        { sentence: 'Social inequality manifests in various forms across societies.', explanation: '"Social inequality" is uneven distribution of resources and opportunities.' },
        { sentence: 'Discrimination based on race, gender, or religion persists globally.', explanation: '"Discrimination" is unfair treatment based on characteristics.' },
        { sentence: 'Marginalized communities face systemic barriers to opportunity.', explanation: '"Marginalized" means pushed to the edges of society.' },
        { sentence: 'Social exclusion prevents full participation in society.', explanation: '"Social exclusion" is being shut out from social activities.' },
        { sentence: 'Prejudice involves preconceived opinions not based on reason.', explanation: '"Prejudice" is biased attitudes toward groups.' },
        { sentence: 'Socioeconomic status influences life outcomes significantly.', explanation: '"Socioeconomic status" is social and economic position.' },
        { sentence: 'Systemic racism is embedded in institutional structures.', explanation: '"Systemic racism" is racism built into systems.' },
        { sentence: 'Gender inequality affects women\'s opportunities worldwide.', explanation: '"Gender inequality" is unequal treatment based on gender.' },
        { sentence: 'Social cohesion promotes harmony within communities.', explanation: '"Social cohesion" is unity and solidarity in society.' },
        { sentence: 'Vulnerable populations require targeted support.', explanation: '"Vulnerable populations" are groups at higher risk.' },
        { sentence: 'Social justice advocates for fair treatment of all people.', explanation: '"Social justice" is fairness in society.' },
        { sentence: 'Intersectionality examines overlapping forms of discrimination.', explanation: '"Intersectionality" is how different identities combine.' },
        { sentence: 'Affirmative action aims to address historical discrimination.', explanation: '"Affirmative action" is policies favoring disadvantaged groups.' },
        { sentence: 'Social stratification creates hierarchical divisions.', explanation: '"Social stratification" is society divided into layers.' },
        { sentence: 'Inclusive policies promote equal participation.', explanation: '"Inclusive" means welcoming to all.' }
      ],
      commonMistakes: [
        { mistake: 'Poor people are lazy.', correction: 'Poverty results from complex structural factors including limited opportunities and systemic barriers.', explanation: 'Avoid blaming individuals for systemic issues.' },
        { mistake: 'Discrimination doesn\'t exist anymore.', correction: 'Discrimination persists in various forms, though its manifestations have evolved over time.', explanation: 'Acknowledge ongoing challenges.' },
        { mistake: 'Everyone has equal opportunities.', correction: 'Opportunities vary significantly based on socioeconomic background, location, and other factors.', explanation: 'Recognize structural inequalities.' }
      ],
      miniPractice: [
        { question: 'Social _____ manifests in various forms across societies.', type: 'fill-blank' },
        { question: 'Which term describes unfair treatment based on characteristics?', options: ['discrimination', 'prejudice', 'bias', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Some people are treated unfairly because of their skin color."', type: 'rewrite' },
        { question: '_____ communities face systemic barriers to opportunity.', type: 'fill-blank' }
      ],
      answerKey: [
        'inequality',
        'all of the above',
        'Racial discrimination and systemic racism create barriers to equal opportunity.',
        'Marginalized'
      ],
      quickRecap: 'Key terms: "social inequality", "discrimination", "marginalized", "social exclusion", "prejudice", "socioeconomic status", "systemic racism", "gender inequality", "social cohesion", "intersectionality". Use sensitive, analytical language!',
      collocations: [
        'social inequality', 'discrimination', 'marginalized communities', 'social exclusion',
        'prejudice', 'socioeconomic status', 'systemic racism', 'gender inequality',
        'social cohesion', 'vulnerable populations', 'social justice', 'affirmative action'
      ],
      synonyms: [
        { word: 'unfair', synonyms: ['inequitable', 'unjust', 'discriminatory', 'biased'] },
        { word: 'poor', synonyms: ['disadvantaged', 'underprivileged', 'marginalized', 'vulnerable'] },
        { word: 'equal', synonyms: ['equitable', 'fair', 'just', 'impartial'] }
      ],
      speakingLines: [
        'Social inequality has deep structural roots that require systemic solutions.',
        'Discrimination persists in various forms despite legal protections.',
        'Inclusive policies are essential for promoting social cohesion and equal opportunity.'
      ]
    }
  },
  {
    id: 'vocab-society-3',
    title: 'Family & Relationships',
    slug: 'family-relationships',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Society',
    description: 'Vocabulary for discussing family structures, relationships, and social bonds.',
    is_premium: false,
    is_published: true,
    view_count: 1020,
    created_at: '2024-06-05T10:00:00Z',
    updated_at: '2024-06-05T10:00:00Z',
    content: {
      title: 'Family & Relationships',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 family and relationship terms',
        'Discuss changing family structures',
        'Use relationship vocabulary accurately'
      ],
      coreExplanation: `Family and relationships are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss family structures and social relationships.

This lesson covers family types, relationships, and social bonds. Understanding these concepts helps you discuss how families and relationships are changing in modern society.`,
      examples: [
        { sentence: 'Nuclear families consist of parents and their children.', explanation: '"Nuclear family" is parents and children living together.' },
        { sentence: 'Extended families include grandparents, aunts, and uncles.', explanation: '"Extended family" is relatives beyond the nuclear family.' },
        { sentence: 'Single-parent households have increased significantly.', explanation: '"Single-parent households" have one parent raising children.' },
        { sentence: 'Blended families combine children from previous relationships.', explanation: '"Blended families" are stepfamilies.' },
        { sentence: 'Cohabitation has become more common before marriage.', explanation: '"Cohabitation" is living together without marriage.' },
        { sentence: 'Divorce rates have risen in many countries.', explanation: '"Divorce rates" measure marriage dissolution.' },
        { sentence: 'Intergenerational relationships connect different age groups.', explanation: '"Intergenerational" means between generations.' },
        { sentence: 'Parenting styles influence child development.', explanation: '"Parenting styles" are approaches to raising children.' },
        { sentence: 'Work-life balance affects family relationships.', explanation: '"Work-life balance" is managing work and personal life.' },
        { sentence: 'Domestic responsibilities are increasingly shared.', explanation: '"Domestic responsibilities" are household duties.' },
        { sentence: 'Childcare arrangements vary across cultures.', explanation: '"Childcare arrangements" are systems for caring for children.' },
        { sentence: 'Marriage patterns have evolved over time.', explanation: '"Marriage patterns" are trends in marriage.' },
        { sentence: 'Family values differ across cultures and generations.', explanation: '"Family values" are beliefs about family importance.' },
        { sentence: 'Kinship networks provide social support.', explanation: '"Kinship networks" are family connections.' },
        { sentence: 'Eldercare responsibilities fall on family members.', explanation: '"Eldercare" is caring for elderly relatives.' }
      ],
      commonMistakes: [
        { mistake: 'Traditional families are better.', correction: 'Different family structures can provide supportive environments for children and adults.', explanation: 'Avoid value judgments about family types.' },
        { mistake: 'Divorce is bad for children.', correction: 'The impact of divorce on children depends on various factors including parental conflict and support systems.', explanation: 'Present nuanced views on family changes.' },
        { mistake: 'Women should stay home with children.', correction: 'Childcare arrangements vary based on family circumstances, preferences, and available support.', explanation: 'Avoid prescriptive statements about gender roles.' }
      ],
      miniPractice: [
        { question: '_____ families consist of parents and their children.', type: 'fill-blank' },
        { question: 'Which term describes living together without marriage?', options: ['cohabitation', 'partnership', 'companionship', 'union'], type: 'multiple-choice' },
        { question: 'Rewrite: "More people are getting divorced now."', type: 'rewrite' },
        { question: 'Single-parent _____ have increased significantly.', type: 'fill-blank' }
      ],
      answerKey: [
        'Nuclear',
        'cohabitation',
        'Divorce rates have risen significantly in recent decades.',
        'households'
      ],
      quickRecap: 'Key terms: "nuclear family", "extended family", "single-parent households", "blended families", "cohabitation", "divorce rates", "intergenerational", "parenting styles", "work-life balance", "eldercare". Use neutral, non-judgmental language!',
      collocations: [
        'nuclear family', 'extended family', 'single-parent households', 'blended families',
        'cohabitation', 'divorce rates', 'intergenerational relationships', 'parenting styles',
        'work-life balance', 'domestic responsibilities', 'childcare arrangements', 'family values'
      ],
      synonyms: [
        { word: 'family', synonyms: ['household', 'relatives', 'kin', 'loved ones'] },
        { word: 'marriage', synonyms: ['matrimony', 'union', 'partnership', 'wedlock'] },
        { word: 'children', synonyms: ['offspring', 'kids', 'dependents', 'minors'] }
      ],
      speakingLines: [
        'Family structures have diversified significantly in recent decades.',
        'Work-life balance is increasingly important for maintaining healthy family relationships.',
        'Intergenerational relationships provide valuable support and cultural transmission.'
      ]
    }
  },
  {
    id: 'vocab-society-4',
    title: 'Immigration & Multiculturalism',
    slug: 'immigration-multiculturalism',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Society',
    description: 'Advanced vocabulary for discussing migration, cultural diversity, and integration.',
    is_premium: true,
    is_published: true,
    view_count: 820,
    created_at: '2024-06-08T10:00:00Z',
    updated_at: '2024-06-08T10:00:00Z',
    content: {
      title: 'Immigration & Multiculturalism',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 immigration and diversity terms',
        'Discuss migration and integration',
        'Use multicultural vocabulary'
      ],
      coreExplanation: `Immigration and multiculturalism are important IELTS topics. To achieve Band 8+, you need vocabulary that allows you to discuss migration patterns and cultural diversity.

This lesson covers immigration, integration, and multicultural societies. Understanding these concepts helps you discuss how societies manage diversity.`,
      examples: [
        { sentence: 'Immigration policies regulate the movement of people across borders.', explanation: '"Immigration policies" are rules governing entry to countries.' },
        { sentence: 'Refugees flee persecution and seek asylum in other countries.', explanation: '"Refugees" are people forced to leave their countries.' },
        { sentence: 'Cultural integration involves adapting to a new society.', explanation: '"Cultural integration" is becoming part of a new culture.' },
        { sentence: 'Multiculturalism celebrates diversity within societies.', explanation: '"Multiculturalism" is the coexistence of diverse cultures.' },
        { sentence: 'Diaspora communities maintain connections to their homelands.', explanation: '"Diaspora" is people dispersed from their homeland.' },
        { sentence: 'Assimilation involves adopting the dominant culture.', explanation: '"Assimilation" is fully adopting the host culture.' },
        { sentence: 'Xenophobia is fear or hatred of foreigners.', explanation: '"Xenophobia" is hostility toward outsiders.' },
        { sentence: 'Brain drain occurs when skilled workers emigrate.', explanation: '"Brain drain" is loss of educated people to other countries.' },
        { sentence: 'Remittances are money sent by migrants to their home countries.', explanation: '"Remittances" are financial transfers from migrants.' },
        { sentence: 'Cultural heritage preservation maintains traditional practices.', explanation: '"Cultural heritage" is traditions passed down through generations.' },
        { sentence: 'Second-generation immigrants often navigate dual identities.', explanation: '"Second-generation" are children of immigrants.' },
        { sentence: 'Undocumented migrants lack legal immigration status.', explanation: '"Undocumented migrants" are people without legal residency.' },
        { sentence: 'Social integration promotes participation in host societies.', explanation: '"Social integration" is becoming part of society.' },
        { sentence: 'Cultural exchange enriches both host and immigrant communities.', explanation: '"Cultural exchange" is sharing between cultures.' },
        { sentence: 'Migration patterns have shifted due to economic and political factors.', explanation: '"Migration patterns" are trends in population movement.' }
      ],
      commonMistakes: [
        { mistake: 'Immigrants take jobs from locals.', correction: 'Immigration\'s economic effects are complex, with research showing both job creation and labor market competition.', explanation: 'Present evidence-based views on immigration.' },
        { mistake: 'Immigrants should adopt local culture completely.', correction: 'Integration approaches vary, with some societies favoring multiculturalism and others emphasizing assimilation.', explanation: 'Acknowledge different integration models.' },
        { mistake: 'Refugees are the same as economic migrants.', correction: 'Refugees flee persecution and have legal protections, while economic migrants move for better opportunities.', explanation: 'Distinguish between migrant categories.' }
      ],
      miniPractice: [
        { question: 'Immigration _____ regulate the movement of people across borders.', type: 'fill-blank' },
        { question: 'Which term describes people forced to flee their countries?', options: ['refugees', 'migrants', 'immigrants', 'expatriates'], type: 'multiple-choice' },
        { question: 'Rewrite: "Foreigners should learn our language."', type: 'rewrite' },
        { question: '_____ is fear or hatred of foreigners.', type: 'fill-blank' }
      ],
      answerKey: [
        'policies',
        'refugees',
        'Language acquisition is an important aspect of cultural integration for immigrants.',
        'Xenophobia'
      ],
      quickRecap: 'Key terms: "immigration policies", "refugees", "cultural integration", "multiculturalism", "diaspora", "assimilation", "xenophobia", "brain drain", "remittances", "second-generation". Use neutral, respectful language!',
      collocations: [
        'immigration policies', 'refugees', 'cultural integration', 'multiculturalism',
        'diaspora communities', 'assimilation', 'xenophobia', 'brain drain',
        'remittances', 'cultural heritage', 'second-generation immigrants', 'migration patterns'
      ],
      synonyms: [
        { word: 'immigrant', synonyms: ['migrant', 'newcomer', 'settler', 'foreign-born'] },
        { word: 'foreigner', synonyms: ['non-native', 'outsider', 'immigrant', 'expatriate'] },
        { word: 'culture', synonyms: ['heritage', 'traditions', 'customs', 'way of life'] }
      ],
      speakingLines: [
        'Immigration policies must balance economic needs with humanitarian obligations.',
        'Multiculturalism enriches societies through cultural exchange and diversity.',
        'Successful integration requires efforts from both immigrants and host communities.'
      ]
    }
  },
  {
    id: 'vocab-society-5',
    title: 'Urban & Rural Life',
    slug: 'urban-rural-life',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Society',
    description: 'Vocabulary for discussing urbanization, rural communities, and lifestyle differences.',
    is_premium: true,
    is_published: true,
    view_count: 750,
    created_at: '2024-06-12T10:00:00Z',
    updated_at: '2024-06-12T10:00:00Z',
    content: {
      title: 'Urban & Rural Life',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 urban and rural terms',
        'Discuss urbanization and rural issues',
        'Compare urban and rural lifestyles'
      ],
      coreExplanation: `Urban and rural life comparisons are common IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss urbanization trends and lifestyle differences.

This lesson covers urban development, rural communities, and the urban-rural divide. Understanding these concepts helps you discuss how living environments affect quality of life.`,
      examples: [
        { sentence: 'Urbanization has accelerated globally over recent decades.', explanation: '"Urbanization" is the growth of cities and urban populations.' },
        { sentence: 'Rural depopulation threatens agricultural communities.', explanation: '"Rural depopulation" is people leaving rural areas.' },
        { sentence: 'Metropolitan areas offer diverse employment opportunities.', explanation: '"Metropolitan areas" are large urban regions.' },
        { sentence: 'Rural livelihoods often depend on agriculture.', explanation: '"Rural livelihoods" are ways of earning income in rural areas.' },
        { sentence: 'Urban infrastructure includes transportation and utilities.', explanation: '"Urban infrastructure" is city facilities and systems.' },
        { sentence: 'Quality of life varies between urban and rural settings.', explanation: '"Quality of life" is overall wellbeing.' },
        { sentence: 'Suburban areas combine urban and rural characteristics.', explanation: '"Suburban" is residential areas outside city centers.' },
        { sentence: 'Rural isolation can affect access to services.', explanation: '"Rural isolation" is remoteness from services.' },
        { sentence: 'Urban density creates both opportunities and challenges.', explanation: '"Urban density" is concentration of people in cities.' },
        { sentence: 'Agricultural communities face economic pressures.', explanation: '"Agricultural communities" depend on farming.' },
        { sentence: 'Commuting patterns reflect urban-suburban relationships.', explanation: '"Commuting patterns" are travel habits for work.' },
        { sentence: 'Rural development aims to improve countryside living standards.', explanation: '"Rural development" is improving rural areas.' },
        { sentence: 'Urban amenities attract people to cities.', explanation: '"Urban amenities" are city facilities and services.' },
        { sentence: 'Rural traditions preserve cultural heritage.', explanation: '"Rural traditions" are countryside customs.' },
        { sentence: 'Megacities face unique governance challenges.', explanation: '"Megacities" are cities with over 10 million people.' }
      ],
      commonMistakes: [
        { mistake: 'City life is better than rural life.', correction: 'Urban and rural environments offer different advantages and challenges depending on individual priorities.', explanation: 'Avoid value judgments about lifestyles.' },
        { mistake: 'Rural areas are backward.', correction: 'Rural communities maintain important traditions and contribute significantly to food production and cultural heritage.', explanation: 'Respect rural communities.' },
        { mistake: 'Everyone wants to live in cities.', correction: 'Migration patterns reflect complex factors including economic opportunities, family ties, and lifestyle preferences.', explanation: 'Acknowledge diverse preferences.' }
      ],
      miniPractice: [
        { question: '_____ has accelerated globally over recent decades.', type: 'fill-blank' },
        { question: 'Which term describes people leaving rural areas?', options: ['rural depopulation', 'rural exodus', 'rural decline', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Cities are crowded and stressful."', type: 'rewrite' },
        { question: 'Urban _____ creates both opportunities and challenges.', type: 'fill-blank' }
      ],
      answerKey: [
        'Urbanization',
        'all of the above',
        'Urban density can create challenges including congestion and stress, alongside opportunities.',
        'density'
      ],
      quickRecap: 'Key terms: "urbanization", "rural depopulation", "metropolitan areas", "rural livelihoods", "urban infrastructure", "suburban", "rural isolation", "urban density", "rural development", "megacities". Use balanced comparisons!',
      collocations: [
        'urbanization', 'rural depopulation', 'metropolitan areas', 'rural livelihoods',
        'urban infrastructure', 'quality of life', 'suburban areas', 'rural isolation',
        'urban density', 'agricultural communities', 'rural development', 'megacities'
      ],
      synonyms: [
        { word: 'city', synonyms: ['urban area', 'metropolis', 'municipality', 'urban center'] },
        { word: 'countryside', synonyms: ['rural area', 'rural region', 'hinterland', 'provinces'] },
        { word: 'move', synonyms: ['migrate', 'relocate', 'settle', 'transfer'] }
      ],
      speakingLines: [
        'Urbanization offers economic opportunities but creates challenges including congestion and housing costs.',
        'Rural communities face depopulation as young people seek opportunities in cities.',
        'Quality of life depends on individual priorities rather than simply urban or rural location.'
      ]
    }
  },
  {
    id: 'vocab-society-6',
    title: 'Crime & Justice',
    slug: 'crime-justice',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Society',
    description: 'Advanced vocabulary for discussing crime, punishment, and the justice system.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-06-15T10:00:00Z',
    updated_at: '2024-06-15T10:00:00Z',
    content: {
      title: 'Crime & Justice',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 crime and justice terms',
        'Discuss criminal justice systems',
        'Use legal vocabulary accurately'
      ],
      coreExplanation: `Crime and justice topics appear frequently in IELTS Writing Task 2. To achieve Band 8+, you need vocabulary that allows you to discuss crime causes, prevention, and punishment.

This lesson covers crime, punishment, and justice systems. Understanding these concepts helps you discuss how societies address criminal behavior.`,
      examples: [
        { sentence: 'Crime rates vary significantly across different regions.', explanation: '"Crime rates" measure the frequency of criminal activity.' },
        { sentence: 'Rehabilitation aims to reform offenders and reduce recidivism.', explanation: '"Rehabilitation" is helping criminals become law-abiding.' },
        { sentence: 'Deterrence theory suggests punishment prevents crime.', explanation: '"Deterrence" is discouraging crime through punishment.' },
        { sentence: 'Incarceration rates have increased in many countries.', explanation: '"Incarceration" is imprisonment.' },
        { sentence: 'Restorative justice focuses on repairing harm.', explanation: '"Restorative justice" involves offenders making amends.' },
        { sentence: 'White-collar crime includes fraud and embezzlement.', explanation: '"White-collar crime" is non-violent financial crime.' },
        { sentence: 'Juvenile offenders require different approaches than adults.', explanation: '"Juvenile offenders" are young criminals.' },
        { sentence: 'Criminal justice reform addresses systemic issues.', explanation: '"Criminal justice reform" is changing the justice system.' },
        { sentence: 'Recidivism rates indicate reoffending frequency.', explanation: '"Recidivism" is returning to criminal behavior.' },
        { sentence: 'Community policing builds trust between police and residents.', explanation: '"Community policing" is collaborative law enforcement.' },
        { sentence: 'Capital punishment remains controversial globally.', explanation: '"Capital punishment" is the death penalty.' },
        { sentence: 'Crime prevention strategies address root causes.', explanation: '"Crime prevention" is stopping crime before it occurs.' },
        { sentence: 'Cybercrime has emerged as a significant threat.', explanation: '"Cybercrime" is criminal activity using computers.' },
        { sentence: 'Sentencing guidelines aim for consistency in punishment.', explanation: '"Sentencing guidelines" are rules for determining punishment.' },
        { sentence: 'Wrongful convictions undermine justice system credibility.', explanation: '"Wrongful convictions" are incorrect guilty verdicts.' }
      ],
      commonMistakes: [
        { mistake: 'Criminals should be punished harshly.', correction: 'Effective criminal justice balances punishment, deterrence, rehabilitation, and public safety.', explanation: 'Discuss multiple justice objectives.' },
        { mistake: 'Prison doesn\'t work.', correction: 'Incarceration serves multiple purposes including punishment, deterrence, and public protection, though rehabilitation outcomes vary.', explanation: 'Present nuanced views on imprisonment.' },
        { mistake: 'Crime is caused by poverty.', correction: 'Crime has multiple causes including socioeconomic factors, individual circumstances, and environmental influences.', explanation: 'Acknowledge complexity in crime causation.' }
      ],
      miniPractice: [
        { question: '_____ aims to reform offenders and reduce recidivism.', type: 'fill-blank' },
        { question: 'Which term describes returning to criminal behavior?', options: ['recidivism', 'relapse', 'regression', 'reversion'], type: 'multiple-choice' },
        { question: 'Rewrite: "Criminals should go to jail for a long time."', type: 'rewrite' },
        { question: 'Crime _____ strategies address root causes.', type: 'fill-blank' }
      ],
      answerKey: [
        'Rehabilitation',
        'recidivism',
        'Sentencing should balance punishment, deterrence, and rehabilitation to reduce recidivism.',
        'prevention'
      ],
      quickRecap: 'Key terms: "crime rates", "rehabilitation", "deterrence", "incarceration", "restorative justice", "white-collar crime", "juvenile offenders", "recidivism", "community policing", "crime prevention". Use balanced, analytical language!',
      collocations: [
        'crime rates', 'rehabilitation', 'deterrence', 'incarceration',
        'restorative justice', 'white-collar crime', 'juvenile offenders', 'criminal justice reform',
        'recidivism rates', 'community policing', 'capital punishment', 'crime prevention'
      ],
      synonyms: [
        { word: 'crime', synonyms: ['offense', 'criminal activity', 'wrongdoing', 'violation'] },
        { word: 'criminal', synonyms: ['offender', 'perpetrator', 'lawbreaker', 'convict'] },
        { word: 'punishment', synonyms: ['penalty', 'sentence', 'sanction', 'consequence'] }
      ],
      speakingLines: [
        'Effective criminal justice systems balance punishment with rehabilitation.',
        'Crime prevention strategies that address root causes may be more effective than harsh sentencing.',
        'Restorative justice approaches can help repair harm while reducing recidivism.'
      ]
    }
  },
  {
    id: 'vocab-society-7',
    title: 'Religion & Beliefs',
    slug: 'religion-beliefs',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Society',
    description: 'Vocabulary for discussing religion, spirituality, and belief systems.',
    is_premium: true,
    is_published: true,
    view_count: 680,
    created_at: '2024-06-18T10:00:00Z',
    updated_at: '2024-06-18T10:00:00Z',
    content: {
      title: 'Religion & Beliefs',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 religion and belief terms',
        'Discuss religious diversity respectfully',
        'Use spiritual vocabulary accurately'
      ],
      coreExplanation: `Religion and beliefs occasionally appear in IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss religious diversity and spirituality respectfully.

This lesson covers religion, spirituality, and belief systems. Understanding these concepts helps you discuss the role of religion in society.`,
      examples: [
        { sentence: 'Religious diversity characterizes many modern societies.', explanation: '"Religious diversity" is the presence of multiple religions.' },
        { sentence: 'Secularism separates religion from government.', explanation: '"Secularism" is keeping religion out of public affairs.' },
        { sentence: 'Spiritual practices provide meaning and purpose.', explanation: '"Spiritual practices" are activities for spiritual growth.' },
        { sentence: 'Religious tolerance promotes peaceful coexistence.', explanation: '"Religious tolerance" is accepting different religions.' },
        { sentence: 'Faith communities provide social support networks.', explanation: '"Faith communities" are religious groups.' },
        { sentence: 'Interfaith dialogue promotes understanding between religions.', explanation: '"Interfaith dialogue" is communication between religions.' },
        { sentence: 'Religious freedom is a fundamental human right.', explanation: '"Religious freedom" is the right to practice any religion.' },
        { sentence: 'Atheism is the absence of belief in deities.', explanation: '"Atheism" is not believing in gods.' },
        { sentence: 'Religious observance varies in intensity.', explanation: '"Religious observance" is practicing religious duties.' },
        { sentence: 'Sacred texts guide believers\' moral decisions.', explanation: '"Sacred texts" are holy scriptures.' },
        { sentence: 'Religious institutions play social and cultural roles.', explanation: '"Religious institutions" are organized religious bodies.' },
        { sentence: 'Spirituality can exist independently of organized religion.', explanation: '"Spirituality" is connection to something greater.' },
        { sentence: 'Religious extremism threatens social harmony.', explanation: '"Religious extremism" is radical religious beliefs.' },
        { sentence: 'Moral values often derive from religious teachings.', explanation: '"Moral values" are principles of right and wrong.' },
        { sentence: 'Religious holidays mark important spiritual events.', explanation: '"Religious holidays" are sacred celebrations.' }
      ],
      commonMistakes: [
        { mistake: 'My religion is the best.', correction: 'Different religious traditions offer various perspectives on meaning, morality, and spirituality.', explanation: 'Avoid religious superiority claims.' },
        { mistake: 'Religion causes conflict.', correction: 'While religion has been involved in conflicts, it also promotes peace, charity, and community.', explanation: 'Present balanced views on religion.' },
        { mistake: 'Religious people are old-fashioned.', correction: 'Religious belief and practice remain significant for billions of people across all demographics.', explanation: 'Avoid stereotyping religious people.' }
      ],
      miniPractice: [
        { question: 'Religious _____ characterizes many modern societies.', type: 'fill-blank' },
        { question: 'Which term describes separating religion from government?', options: ['secularism', 'atheism', 'agnosticism', 'humanism'], type: 'multiple-choice' },
        { question: 'Rewrite: "People should believe in God."', type: 'rewrite' },
        { question: 'Religious _____ is a fundamental human right.', type: 'fill-blank' }
      ],
      answerKey: [
        'diversity',
        'secularism',
        'Religious freedom allows individuals to hold and practice their own beliefs.',
        'freedom'
      ],
      quickRecap: 'Key terms: "religious diversity", "secularism", "spiritual practices", "religious tolerance", "faith communities", "interfaith dialogue", "religious freedom", "atheism", "sacred texts", "spirituality". Use respectful, neutral language!',
      collocations: [
        'religious diversity', 'secularism', 'spiritual practices', 'religious tolerance',
        'faith communities', 'interfaith dialogue', 'religious freedom', 'atheism',
        'religious observance', 'sacred texts', 'religious institutions', 'moral values'
      ],
      synonyms: [
        { word: 'religion', synonyms: ['faith', 'belief system', 'creed', 'denomination'] },
        { word: 'believe', synonyms: ['have faith', 'hold beliefs', 'practice', 'follow'] },
        { word: 'god', synonyms: ['deity', 'divine being', 'higher power', 'supreme being'] }
      ],
      speakingLines: [
        'Religious diversity enriches societies through different perspectives on meaning and morality.',
        'Secularism allows for religious freedom while maintaining neutral public institutions.',
        'Interfaith dialogue promotes understanding and reduces religious tensions.'
      ]
    }
  },
  {
    id: 'vocab-society-8',
    title: 'Generations & Social Change',
    slug: 'generations-social-change',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Society',
    description: 'Vocabulary for discussing generational differences and social transformation.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-06-22T10:00:00Z',
    updated_at: '2024-06-22T10:00:00Z',
    content: {
      title: 'Generations & Social Change',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 generation and change terms',
        'Discuss generational differences',
        'Use social change vocabulary'
      ],
      coreExplanation: `Generational differences and social change are common IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss how societies evolve across generations.

This lesson covers generational characteristics, social transformation, and changing values. Understanding these concepts helps you discuss how societies change over time.`,
      examples: [
        { sentence: 'Generational differences reflect changing social contexts.', explanation: '"Generational differences" are variations between age groups.' },
        { sentence: 'Social norms evolve over time.', explanation: '"Social norms" are accepted behaviors in society.' },
        { sentence: 'Baby boomers experienced post-war economic growth.', explanation: '"Baby boomers" are people born 1946-1964.' },
        { sentence: 'Millennials are often characterized as tech-savvy.', explanation: '"Millennials" are people born approximately 1981-1996.' },
        { sentence: 'Generation Z has grown up with social media.', explanation: '"Generation Z" are people born approximately 1997-2012.' },
        { sentence: 'Social attitudes toward gender have shifted significantly.', explanation: '"Social attitudes" are collective opinions.' },
        { sentence: 'Cultural shifts reflect changing values.', explanation: '"Cultural shifts" are changes in cultural norms.' },
        { sentence: 'Intergenerational conflict arises from different perspectives.', explanation: '"Intergenerational conflict" is tension between generations.' },
        { sentence: 'Social progress involves expanding rights and opportunities.', explanation: '"Social progress" is improvement in social conditions.' },
        { sentence: 'Traditional values are challenged by modernization.', explanation: '"Traditional values" are long-held beliefs.' },
        { sentence: 'Youth culture influences broader social trends.', explanation: '"Youth culture" is culture created by young people.' },
        { sentence: 'Social movements drive change in society.', explanation: '"Social movements" are organized efforts for change.' },
        { sentence: 'Generational wealth affects economic opportunities.', explanation: '"Generational wealth" is assets passed between generations.' },
        { sentence: 'Changing demographics reshape societies.', explanation: '"Demographics" are population characteristics.' },
        { sentence: 'Social transformation occurs through multiple factors.', explanation: '"Social transformation" is fundamental social change.' }
      ],
      commonMistakes: [
        { mistake: 'Young people are lazy.', correction: 'Different generations face different economic and social circumstances that shape their behaviors and opportunities.', explanation: 'Avoid generational stereotypes.' },
        { mistake: 'Things were better in the past.', correction: 'Social change brings both benefits and challenges, with progress in some areas and new problems in others.', explanation: 'Present balanced views on change.' },
        { mistake: 'Old people don\'t understand technology.', correction: 'Technology adoption varies by individual rather than strictly by generation.', explanation: 'Avoid age-based generalizations.' }
      ],
      miniPractice: [
        { question: 'Generational _____ reflect changing social contexts.', type: 'fill-blank' },
        { question: 'Which generation grew up with social media?', options: ['Generation Z', 'Millennials', 'Generation X', 'Baby Boomers'], type: 'multiple-choice' },
        { question: 'Rewrite: "Young people today are different from before."', type: 'rewrite' },
        { question: 'Social _____ evolve over time.', type: 'fill-blank' }
      ],
      answerKey: [
        'differences',
        'Generation Z',
        'Generational differences reflect the distinct social and technological contexts in which each generation came of age.',
        'norms'
      ],
      quickRecap: 'Key terms: "generational differences", "social norms", "baby boomers", "millennials", "Generation Z", "cultural shifts", "intergenerational conflict", "social progress", "social movements", "social transformation". Avoid stereotypes!',
      collocations: [
        'generational differences', 'social norms', 'baby boomers', 'millennials',
        'Generation Z', 'social attitudes', 'cultural shifts', 'intergenerational conflict',
        'social progress', 'traditional values', 'youth culture', 'social movements'
      ],
      synonyms: [
        { word: 'generation', synonyms: ['age group', 'cohort', 'demographic', 'age bracket'] },
        { word: 'change', synonyms: ['transformation', 'shift', 'evolution', 'transition'] },
        { word: 'old', synonyms: ['traditional', 'established', 'conventional', 'long-standing'] }
      ],
      speakingLines: [
        'Generational differences reflect the distinct contexts in which each generation came of age.',
        'Social norms evolve as societies adapt to new technologies and changing values.',
        'Intergenerational dialogue is essential for understanding different perspectives on social change.'
      ]
    }
  },
  // ============================================
  // BATCH 7: Government & Law (5 lessons)
  // ============================================
  {
    id: 'vocab-government-2',
    title: 'Democracy & Political Systems',
    slug: 'democracy-political-systems',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Government',
    description: 'Advanced vocabulary for discussing democratic governance and political structures.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z',
    content: {
      title: 'Democracy & Political Systems',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 democracy and governance terms',
        'Discuss political systems analytically',
        'Use political vocabulary accurately'
      ],
      coreExplanation: `Political systems and democracy are important IELTS topics. To achieve Band 8+, you need vocabulary that allows you to discuss governance and political structures.

This lesson covers democratic principles, political systems, and governance. Understanding these concepts helps you discuss how societies organize political power.`,
      examples: [
        { sentence: 'Democracy involves citizen participation in governance.', explanation: '"Democracy" is government by the people.' },
        { sentence: 'Electoral systems determine how votes translate to seats.', explanation: '"Electoral systems" are methods of conducting elections.' },
        { sentence: 'Civil liberties protect individual freedoms.', explanation: '"Civil liberties" are fundamental rights.' },
        { sentence: 'Separation of powers prevents concentration of authority.', explanation: '"Separation of powers" divides government functions.' },
        { sentence: 'Political accountability holds leaders responsible.', explanation: '"Political accountability" is answering for decisions.' },
        { sentence: 'Voter turnout indicates democratic engagement.', explanation: '"Voter turnout" is the proportion of eligible voters who vote.' },
        { sentence: 'Constitutional rights are protected by law.', explanation: '"Constitutional rights" are rights guaranteed by constitutions.' },
        { sentence: 'Political polarization divides societies.', explanation: '"Political polarization" is extreme political division.' },
        { sentence: 'Transparency in government builds public trust.', explanation: '"Transparency" is openness in government operations.' },
        { sentence: 'Authoritarian regimes restrict political freedoms.', explanation: '"Authoritarian" means concentrating power without accountability.' },
        { sentence: 'Civic engagement strengthens democratic institutions.', explanation: '"Civic engagement" is participation in community affairs.' },
        { sentence: 'Political representation ensures diverse voices are heard.', explanation: '"Political representation" is acting on behalf of citizens.' },
        { sentence: 'Rule of law applies equally to all citizens.', explanation: '"Rule of law" is governance by established laws.' },
        { sentence: 'Democratic institutions require ongoing maintenance.', explanation: '"Democratic institutions" are organizations supporting democracy.' },
        { sentence: 'Political participation extends beyond voting.', explanation: '"Political participation" is involvement in political processes.' }
      ],
      commonMistakes: [
        { mistake: 'Democracy is the best system.', correction: 'Democratic systems have various strengths and challenges, with different models suited to different contexts.', explanation: 'Discuss democracy analytically.' },
        { mistake: 'Politicians are all corrupt.', correction: 'Political systems vary in accountability and transparency, with corruption being a challenge in many contexts.', explanation: 'Avoid sweeping generalizations.' },
        { mistake: 'Voting doesn\'t matter.', correction: 'Electoral participation is one of several ways citizens can influence political outcomes.', explanation: 'Discuss political engagement constructively.' }
      ],
      miniPractice: [
        { question: '_____ involves citizen participation in governance.', type: 'fill-blank' },
        { question: 'Which term describes dividing government functions?', options: ['separation of powers', 'division of labor', 'power sharing', 'decentralization'], type: 'multiple-choice' },
        { question: 'Rewrite: "The government should listen to people."', type: 'rewrite' },
        { question: 'Civil _____ protect individual freedoms.', type: 'fill-blank' }
      ],
      answerKey: [
        'Democracy',
        'separation of powers',
        'Democratic governance requires political accountability and responsiveness to citizen concerns.',
        'liberties'
      ],
      quickRecap: 'Key terms: "democracy", "electoral systems", "civil liberties", "separation of powers", "political accountability", "voter turnout", "constitutional rights", "political polarization", "transparency", "rule of law". Use analytical language!',
      collocations: [
        'democracy', 'electoral systems', 'civil liberties', 'separation of powers',
        'political accountability', 'voter turnout', 'constitutional rights', 'political polarization',
        'transparency', 'authoritarian regimes', 'civic engagement', 'rule of law'
      ],
      synonyms: [
        { word: 'government', synonyms: ['administration', 'regime', 'authorities', 'state'] },
        { word: 'vote', synonyms: ['ballot', 'elect', 'cast a vote', 'go to the polls'] },
        { word: 'law', synonyms: ['legislation', 'statute', 'regulation', 'ordinance'] }
      ],
      speakingLines: [
        'Democratic governance requires ongoing civic engagement and institutional maintenance.',
        'Separation of powers helps prevent the concentration of authority.',
        'Political polarization poses challenges for democratic deliberation and compromise.'
      ]
    }
  },
  {
    id: 'vocab-government-3',
    title: 'Human Rights & Civil Society',
    slug: 'human-rights-civil-society',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Government',
    description: 'Advanced vocabulary for discussing human rights, activism, and civil society organizations.',
    is_premium: true,
    is_published: true,
    view_count: 680,
    created_at: '2024-06-28T10:00:00Z',
    updated_at: '2024-06-28T10:00:00Z',
    content: {
      title: 'Human Rights & Civil Society',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 human rights terms',
        'Discuss civil society and activism',
        'Use rights-based vocabulary'
      ],
      coreExplanation: `Human rights and civil society are important IELTS topics. To achieve Band 8+, you need vocabulary that allows you to discuss rights, freedoms, and civic activism.

This lesson covers human rights, civil society organizations, and activism. Understanding these concepts helps you discuss how societies protect individual rights.`,
      examples: [
        { sentence: 'Human rights are universal and inalienable.', explanation: '"Human rights" are fundamental rights belonging to all people.' },
        { sentence: 'Civil society organizations advocate for various causes.', explanation: '"Civil society organizations" are non-governmental groups.' },
        { sentence: 'Freedom of expression is a fundamental right.', explanation: '"Freedom of expression" is the right to speak freely.' },
        { sentence: 'Human rights violations require international attention.', explanation: '"Human rights violations" are breaches of fundamental rights.' },
        { sentence: 'Activism promotes social and political change.', explanation: '"Activism" is campaigning for change.' },
        { sentence: 'Non-governmental organizations (NGOs) address social issues.', explanation: '"NGOs" are independent organizations.' },
        { sentence: 'Humanitarian intervention responds to crises.', explanation: '"Humanitarian intervention" is action to protect people.' },
        { sentence: 'Press freedom enables independent journalism.', explanation: '"Press freedom" is media operating without government control.' },
        { sentence: 'Advocacy campaigns raise awareness of issues.', explanation: '"Advocacy" is public support for causes.' },
        { sentence: 'Due process protects individuals from arbitrary treatment.', explanation: '"Due process" is fair legal procedures.' },
        { sentence: 'Grassroots movements emerge from local communities.', explanation: '"Grassroots movements" are community-based initiatives.' },
        { sentence: 'International law establishes human rights standards.', explanation: '"International law" governs relations between nations.' },
        { sentence: 'Whistleblowers expose wrongdoing at personal risk.', explanation: '"Whistleblowers" reveal illegal or unethical activities.' },
        { sentence: 'Peaceful protest is a form of political expression.', explanation: '"Peaceful protest" is non-violent demonstration.' },
        { sentence: 'Human dignity underlies all human rights.', explanation: '"Human dignity" is inherent worth of all people.' }
      ],
      commonMistakes: [
        { mistake: 'Human rights are Western values.', correction: 'Human rights are recognized as universal, though their implementation varies across cultural and political contexts.', explanation: 'Discuss universality of rights.' },
        { mistake: 'Activists are troublemakers.', correction: 'Civil society activism plays an important role in democratic societies by advocating for change and holding power accountable.', explanation: 'Recognize legitimate activism.' },
        { mistake: 'NGOs are always good.', correction: 'Civil society organizations vary in effectiveness, accountability, and alignment with local needs.', explanation: 'Present nuanced views on NGOs.' }
      ],
      miniPractice: [
        { question: 'Human rights are universal and _____.', type: 'fill-blank' },
        { question: 'Which term describes non-governmental groups?', options: ['civil society organizations', 'government agencies', 'political parties', 'corporations'], type: 'multiple-choice' },
        { question: 'Rewrite: "People should be allowed to say what they want."', type: 'rewrite' },
        { question: 'Freedom of _____ is a fundamental right.', type: 'fill-blank' }
      ],
      answerKey: [
        'inalienable',
        'civil society organizations',
        'Freedom of expression is a fundamental human right that should be protected.',
        'expression'
      ],
      quickRecap: 'Key terms: "human rights", "civil society organizations", "freedom of expression", "human rights violations", "activism", "NGOs", "press freedom", "advocacy", "due process", "grassroots movements". Use rights-based language!',
      collocations: [
        'human rights', 'civil society organizations', 'freedom of expression', 'human rights violations',
        'activism', 'non-governmental organizations', 'humanitarian intervention', 'press freedom',
        'advocacy campaigns', 'due process', 'grassroots movements', 'international law'
      ],
      synonyms: [
        { word: 'right', synonyms: ['freedom', 'liberty', 'entitlement', 'privilege'] },
        { word: 'protest', synonyms: ['demonstration', 'rally', 'march', 'activism'] },
        { word: 'advocate', synonyms: ['campaign', 'champion', 'support', 'promote'] }
      ],
      speakingLines: [
        'Human rights are universal principles that transcend cultural and political boundaries.',
        'Civil society organizations play a crucial role in holding governments accountable.',
        'Freedom of expression is essential for democratic discourse and social progress.'
      ]
    }
  },
  {
    id: 'vocab-government-4',
    title: 'Public Policy & Administration',
    slug: 'public-policy-administration',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Government',
    description: 'Advanced vocabulary for discussing government policy-making and public administration.',
    is_premium: true,
    is_published: true,
    view_count: 620,
    created_at: '2024-07-01T10:00:00Z',
    updated_at: '2024-07-01T10:00:00Z',
    content: {
      title: 'Public Policy & Administration',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 policy and administration terms',
        'Discuss government decision-making',
        'Use policy vocabulary accurately'
      ],
      coreExplanation: `Public policy and administration are important for discussing government actions. To achieve Band 8+, you need vocabulary that allows you to discuss how governments make and implement decisions.

This lesson covers policy-making, public administration, and governance. Understanding these concepts helps you discuss how governments address social issues.`,
      examples: [
        { sentence: 'Public policy addresses societal problems through government action.', explanation: '"Public policy" is government decisions and actions.' },
        { sentence: 'Policy implementation requires effective administration.', explanation: '"Policy implementation" is putting policies into practice.' },
        { sentence: 'Bureaucracy manages government operations.', explanation: '"Bureaucracy" is the administrative system of government.' },
        { sentence: 'Stakeholder consultation informs policy development.', explanation: '"Stakeholder consultation" is seeking input from affected parties.' },
        { sentence: 'Evidence-based policy uses research to guide decisions.', explanation: '"Evidence-based policy" is policy informed by data.' },
        { sentence: 'Regulatory frameworks establish rules for activities.', explanation: '"Regulatory frameworks" are systems of rules.' },
        { sentence: 'Public services are provided by government agencies.', explanation: '"Public services" are government-provided services.' },
        { sentence: 'Policy evaluation assesses effectiveness.', explanation: '"Policy evaluation" is measuring policy outcomes.' },
        { sentence: 'Decentralization transfers power to local governments.', explanation: '"Decentralization" is distributing authority.' },
        { sentence: 'Governance involves multiple actors and institutions.', explanation: '"Governance" is the process of governing.' },
        { sentence: 'Public consultation gathers citizen input.', explanation: '"Public consultation" is seeking public opinion.' },
        { sentence: 'Administrative efficiency improves service delivery.', explanation: '"Administrative efficiency" is effective government operations.' },
        { sentence: 'Policy reform addresses shortcomings in existing approaches.', explanation: '"Policy reform" is changing policies.' },
        { sentence: 'Intergovernmental relations coordinate different levels.', explanation: '"Intergovernmental relations" are between government levels.' },
        { sentence: 'Public accountability ensures responsible governance.', explanation: '"Public accountability" is answering to citizens.' }
      ],
      commonMistakes: [
        { mistake: 'The government should do something.', correction: 'Effective policy responses require careful analysis, stakeholder consultation, and evidence-based approaches.', explanation: 'Discuss policy-making processes.' },
        { mistake: 'Bureaucracy is bad.', correction: 'Administrative systems are necessary for implementing policies, though they can be improved for efficiency.', explanation: 'Present balanced views on administration.' },
        { mistake: 'Policies always work as intended.', correction: 'Policy implementation often faces challenges, requiring ongoing evaluation and adjustment.', explanation: 'Acknowledge implementation challenges.' }
      ],
      miniPractice: [
        { question: 'Public _____ addresses societal problems through government action.', type: 'fill-blank' },
        { question: 'Which term describes policy informed by research?', options: ['evidence-based policy', 'data-driven policy', 'research policy', 'scientific policy'], type: 'multiple-choice' },
        { question: 'Rewrite: "The government should fix this problem."', type: 'rewrite' },
        { question: 'Policy _____ assesses effectiveness.', type: 'fill-blank' }
      ],
      answerKey: [
        'policy',
        'evidence-based policy',
        'Effective policy responses require careful analysis and stakeholder consultation.',
        'evaluation'
      ],
      quickRecap: 'Key terms: "public policy", "policy implementation", "bureaucracy", "stakeholder consultation", "evidence-based policy", "regulatory frameworks", "public services", "policy evaluation", "decentralization", "governance". Use policy language!',
      collocations: [
        'public policy', 'policy implementation', 'bureaucracy', 'stakeholder consultation',
        'evidence-based policy', 'regulatory frameworks', 'public services', 'policy evaluation',
        'decentralization', 'governance', 'public consultation', 'policy reform'
      ],
      synonyms: [
        { word: 'policy', synonyms: ['approach', 'strategy', 'plan', 'program'] },
        { word: 'government', synonyms: ['administration', 'authorities', 'state', 'public sector'] },
        { word: 'implement', synonyms: ['execute', 'carry out', 'put into practice', 'enact'] }
      ],
      speakingLines: [
        'Evidence-based policy-making leads to more effective government interventions.',
        'Stakeholder consultation ensures policies address the needs of affected communities.',
        'Policy evaluation is essential for improving government programs over time.'
      ]
    }
  },
  {
    id: 'vocab-government-5',
    title: 'International Relations & Diplomacy',
    slug: 'international-relations-diplomacy',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Government',
    description: 'Advanced vocabulary for discussing foreign policy, diplomacy, and international cooperation.',
    is_premium: true,
    is_published: true,
    view_count: 650,
    created_at: '2024-07-05T10:00:00Z',
    updated_at: '2024-07-05T10:00:00Z',
    content: {
      title: 'International Relations & Diplomacy',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 international relations terms',
        'Discuss foreign policy and diplomacy',
        'Use diplomatic vocabulary'
      ],
      coreExplanation: `International relations and diplomacy are important for discussing global issues. To achieve Band 8+, you need vocabulary that allows you to discuss how countries interact.

This lesson covers foreign policy, diplomacy, and international organizations. Understanding these concepts helps you discuss global cooperation and conflict.`,
      examples: [
        { sentence: 'Diplomacy resolves disputes through negotiation.', explanation: '"Diplomacy" is managing international relations.' },
        { sentence: 'Foreign policy guides a country\'s international actions.', explanation: '"Foreign policy" is a nation\'s approach to other countries.' },
        { sentence: 'International organizations facilitate global cooperation.', explanation: '"International organizations" are bodies like the UN.' },
        { sentence: 'Bilateral agreements involve two countries.', explanation: '"Bilateral" means between two parties.' },
        { sentence: 'Multilateral cooperation addresses global challenges.', explanation: '"Multilateral" involves multiple countries.' },
        { sentence: 'Geopolitical tensions affect regional stability.', explanation: '"Geopolitical" relates to politics and geography.' },
        { sentence: 'Diplomatic relations enable communication between nations.', explanation: '"Diplomatic relations" are formal connections between countries.' },
        { sentence: 'International treaties establish binding agreements.', explanation: '"International treaties" are formal agreements between nations.' },
        { sentence: 'Soft power influences through culture and values.', explanation: '"Soft power" is influence without force.' },
        { sentence: 'Sovereignty is a nation\'s right to self-governance.', explanation: '"Sovereignty" is supreme authority over territory.' },
        { sentence: 'Peacekeeping missions maintain stability in conflict zones.', explanation: '"Peacekeeping" is military operations to maintain peace.' },
        { sentence: 'Economic sanctions pressure countries to change behavior.', explanation: '"Economic sanctions" are trade restrictions.' },
        { sentence: 'Diplomatic immunity protects foreign officials.', explanation: '"Diplomatic immunity" exempts diplomats from local law.' },
        { sentence: 'International summits bring leaders together.', explanation: '"International summits" are high-level meetings.' },
        { sentence: 'Global governance addresses transnational issues.', explanation: '"Global governance" is international decision-making.' }
      ],
      commonMistakes: [
        { mistake: 'Countries should mind their own business.', correction: 'International cooperation is necessary for addressing transnational challenges like climate change and pandemics.', explanation: 'Discuss interdependence.' },
        { mistake: 'The UN doesn\'t do anything.', correction: 'International organizations face limitations but provide important forums for dialogue and coordination.', explanation: 'Present balanced views on international bodies.' },
        { mistake: 'War is the only solution to conflicts.', correction: 'Diplomatic approaches and multilateral cooperation can resolve many international disputes peacefully.', explanation: 'Discuss peaceful conflict resolution.' }
      ],
      miniPractice: [
        { question: '_____ resolves disputes through negotiation.', type: 'fill-blank' },
        { question: 'Which term describes influence without force?', options: ['soft power', 'hard power', 'smart power', 'economic power'], type: 'multiple-choice' },
        { question: 'Rewrite: "Countries should work together on big problems."', type: 'rewrite' },
        { question: 'Foreign _____ guides a country\'s international actions.', type: 'fill-blank' }
      ],
      answerKey: [
        'Diplomacy',
        'soft power',
        'Multilateral cooperation is essential for addressing transnational challenges.',
        'policy'
      ],
      quickRecap: 'Key terms: "diplomacy", "foreign policy", "international organizations", "bilateral", "multilateral", "geopolitical", "diplomatic relations", "international treaties", "soft power", "sovereignty". Use diplomatic language!',
      collocations: [
        'diplomacy', 'foreign policy', 'international organizations', 'bilateral agreements',
        'multilateral cooperation', 'geopolitical tensions', 'diplomatic relations', 'international treaties',
        'soft power', 'sovereignty', 'peacekeeping missions', 'economic sanctions'
      ],
      synonyms: [
        { word: 'country', synonyms: ['nation', 'state', 'sovereign state', 'nation-state'] },
        { word: 'agreement', synonyms: ['treaty', 'accord', 'pact', 'convention'] },
        { word: 'conflict', synonyms: ['dispute', 'tension', 'confrontation', 'disagreement'] }
      ],
      speakingLines: [
        'Diplomacy remains the most effective means of resolving international disputes.',
        'Multilateral cooperation is essential for addressing global challenges like climate change.',
        'Soft power can be as influential as military or economic pressure in international relations.'
      ]
    }
  },
  {
    id: 'vocab-government-6',
    title: 'Legal Systems & Justice',
    slug: 'legal-systems-justice',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Government',
    description: 'Advanced vocabulary for discussing legal frameworks, courts, and the justice system.',
    is_premium: true,
    is_published: true,
    view_count: 690,
    created_at: '2024-07-08T10:00:00Z',
    updated_at: '2024-07-08T10:00:00Z',
    content: {
      title: 'Legal Systems & Justice',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 legal system terms',
        'Discuss courts and legal processes',
        'Use legal vocabulary accurately'
      ],
      coreExplanation: `Legal systems and justice are important for discussing how societies maintain order. To achieve Band 8+, you need vocabulary that allows you to discuss legal frameworks and processes.

This lesson covers legal systems, courts, and justice processes. Understanding these concepts helps you discuss how laws are made and enforced.`,
      examples: [
        { sentence: 'The judiciary interprets and applies the law.', explanation: '"Judiciary" is the court system.' },
        { sentence: 'Legislation is created by elected representatives.', explanation: '"Legislation" is laws passed by legislatures.' },
        { sentence: 'Legal precedent guides future court decisions.', explanation: '"Legal precedent" is past decisions that guide future cases.' },
        { sentence: 'Civil law governs disputes between individuals.', explanation: '"Civil law" is non-criminal legal matters.' },
        { sentence: 'Criminal law addresses offenses against society.', explanation: '"Criminal law" is law dealing with crimes.' },
        { sentence: 'Due process ensures fair legal procedures.', explanation: '"Due process" is proper legal procedures.' },
        { sentence: 'Legal representation protects defendants\' rights.', explanation: '"Legal representation" is having a lawyer.' },
        { sentence: 'Judicial independence prevents political interference.', explanation: '"Judicial independence" is courts free from political control.' },
        { sentence: 'Constitutional law interprets fundamental principles.', explanation: '"Constitutional law" relates to constitutions.' },
        { sentence: 'Legal aid provides assistance to those who cannot afford lawyers.', explanation: '"Legal aid" is free legal help.' },
        { sentence: 'Appellate courts review lower court decisions.', explanation: '"Appellate courts" hear appeals.' },
        { sentence: 'Litigation involves resolving disputes through courts.', explanation: '"Litigation" is the legal process of suing.' },
        { sentence: 'Arbitration provides alternative dispute resolution.', explanation: '"Arbitration" is settling disputes outside courts.' },
        { sentence: 'Legal liability determines responsibility for harm.', explanation: '"Legal liability" is legal responsibility.' },
        { sentence: 'Jurisprudence is the philosophy of law.', explanation: '"Jurisprudence" is legal theory.' }
      ],
      commonMistakes: [
        { mistake: 'The law is always fair.', correction: 'Legal systems aim for justice but may contain biases or gaps that require ongoing reform.', explanation: 'Acknowledge legal system limitations.' },
        { mistake: 'Lawyers just help criminals.', correction: 'Legal representation is a fundamental right that ensures fair trials for all accused persons.', explanation: 'Explain the role of legal representation.' },
        { mistake: 'Courts always get it right.', correction: 'Judicial systems include appeals processes to correct errors and ensure justice.', explanation: 'Discuss judicial review mechanisms.' }
      ],
      miniPractice: [
        { question: 'The _____ interprets and applies the law.', type: 'fill-blank' },
        { question: 'Which term describes past decisions guiding future cases?', options: ['legal precedent', 'case law', 'common law', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Everyone should have a lawyer."', type: 'rewrite' },
        { question: 'Due _____ ensures fair legal procedures.', type: 'fill-blank' }
      ],
      answerKey: [
        'judiciary',
        'all of the above',
        'Legal representation is a fundamental right that ensures fair trials.',
        'process'
      ],
      quickRecap: 'Key terms: "judiciary", "legislation", "legal precedent", "civil law", "criminal law", "due process", "legal representation", "judicial independence", "constitutional law", "litigation". Use legal terminology accurately!',
      collocations: [
        'judiciary', 'legislation', 'legal precedent', 'civil law',
        'criminal law', 'due process', 'legal representation', 'judicial independence',
        'constitutional law', 'legal aid', 'appellate courts', 'arbitration'
      ],
      synonyms: [
        { word: 'law', synonyms: ['legislation', 'statute', 'regulation', 'ordinance'] },
        { word: 'court', synonyms: ['tribunal', 'judiciary', 'bench', 'bar'] },
        { word: 'judge', synonyms: ['magistrate', 'justice', 'adjudicator', 'arbiter'] }
      ],
      speakingLines: [
        'Judicial independence is essential for maintaining the rule of law.',
        'Due process protects individuals from arbitrary government action.',
        'Legal aid ensures that access to justice is not limited by financial means.'
      ]
    }
  },
  // ============================================
  // BATCH 8: Media & Communication (5 lessons)
  // ============================================
  {
    id: 'vocab-media-2',
    title: 'News Media & Journalism',
    slug: 'news-media-journalism',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Media',
    description: 'Vocabulary for discussing news reporting, journalism ethics, and media coverage.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-07-12T10:00:00Z',
    updated_at: '2024-07-12T10:00:00Z',
    content: {
      title: 'News Media & Journalism',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 journalism and news terms',
        'Discuss media coverage and ethics',
        'Use news vocabulary accurately'
      ],
      coreExplanation: `News media and journalism are important topics for discussing information and democracy. To achieve Band 7+, you need vocabulary that allows you to discuss how news is produced and consumed.

This lesson covers journalism, news media, and media ethics. Understanding these concepts helps you discuss the role of media in society.`,
      examples: [
        { sentence: 'Investigative journalism uncovers hidden information.', explanation: '"Investigative journalism" is in-depth reporting.' },
        { sentence: 'Media bias affects how news is presented.', explanation: '"Media bias" is slanted reporting.' },
        { sentence: 'Press freedom enables independent reporting.', explanation: '"Press freedom" is media operating without government control.' },
        { sentence: 'Fact-checking verifies the accuracy of claims.', explanation: '"Fact-checking" is verifying information.' },
        { sentence: 'Breaking news reports events as they happen.', explanation: '"Breaking news" is immediate reporting of events.' },
        { sentence: 'Editorial content expresses opinions.', explanation: '"Editorial" is opinion-based content.' },
        { sentence: 'News sources provide information to journalists.', explanation: '"News sources" are people or documents providing information.' },
        { sentence: 'Media literacy helps people evaluate information.', explanation: '"Media literacy" is understanding media messages.' },
        { sentence: 'Sensationalism exaggerates news for attention.', explanation: '"Sensationalism" is dramatic, exaggerated reporting.' },
        { sentence: 'Journalistic ethics guide responsible reporting.', explanation: '"Journalistic ethics" are professional standards.' },
        { sentence: 'News coverage shapes public perception.', explanation: '"News coverage" is how events are reported.' },
        { sentence: 'Citizen journalism involves non-professionals reporting news.', explanation: '"Citizen journalism" is amateur news reporting.' },
        { sentence: 'Media ownership affects editorial independence.', explanation: '"Media ownership" is who controls media outlets.' },
        { sentence: 'Headlines summarize news stories.', explanation: '"Headlines" are titles of news articles.' },
        { sentence: 'News consumption patterns have changed dramatically.', explanation: '"News consumption" is how people access news.' }
      ],
      commonMistakes: [
        { mistake: 'The news is always true.', correction: 'News accuracy varies by source, and media literacy helps evaluate reliability.', explanation: 'Encourage critical evaluation of news.' },
        { mistake: 'All journalists are biased.', correction: 'Professional journalism follows ethical standards, though bias can exist in varying degrees.', explanation: 'Distinguish professional journalism from opinion.' },
        { mistake: 'Social media is better than traditional news.', correction: 'Different news sources have different strengths and limitations.', explanation: 'Compare media types objectively.' }
      ],
      miniPractice: [
        { question: '_____ journalism uncovers hidden information.', type: 'fill-blank' },
        { question: 'Which term describes slanted reporting?', options: ['media bias', 'fake news', 'propaganda', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "The news lies to people."', type: 'rewrite' },
        { question: 'Media _____ helps people evaluate information.', type: 'fill-blank' }
      ],
      answerKey: [
        'Investigative',
        'all of the above',
        'Media bias and misinformation can affect the accuracy of news reporting.',
        'literacy'
      ],
      quickRecap: 'Key terms: "investigative journalism", "media bias", "press freedom", "fact-checking", "editorial", "media literacy", "sensationalism", "journalistic ethics", "citizen journalism", "news consumption". Use media vocabulary accurately!',
      collocations: [
        'investigative journalism', 'media bias', 'press freedom', 'fact-checking',
        'breaking news', 'editorial content', 'news sources', 'media literacy',
        'sensationalism', 'journalistic ethics', 'news coverage', 'citizen journalism'
      ],
      synonyms: [
        { word: 'news', synonyms: ['reporting', 'coverage', 'journalism', 'media'] },
        { word: 'journalist', synonyms: ['reporter', 'correspondent', 'newsperson', 'media professional'] },
        { word: 'report', synonyms: ['cover', 'document', 'chronicle', 'publish'] }
      ],
      speakingLines: [
        'Media literacy is essential for evaluating the reliability of news sources.',
        'Press freedom is fundamental to democratic accountability.',
        'Investigative journalism plays a crucial role in exposing wrongdoing.'
      ]
    }
  },
  {
    id: 'vocab-media-3',
    title: 'Social Media & Digital Communication',
    slug: 'social-media-digital-communication',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Media',
    description: 'Vocabulary for discussing social media platforms, online communication, and digital culture.',
    is_premium: true,
    is_published: true,
    view_count: 920,
    created_at: '2024-07-15T10:00:00Z',
    updated_at: '2024-07-15T10:00:00Z',
    content: {
      title: 'Social Media & Digital Communication',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 social media terms',
        'Discuss digital communication',
        'Use online culture vocabulary'
      ],
      coreExplanation: `Social media and digital communication are highly relevant IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss online platforms and their effects.

This lesson covers social media, digital communication, and online culture. Understanding these concepts helps you discuss how technology has transformed communication.`,
      examples: [
        { sentence: 'Social media platforms connect billions of users globally.', explanation: '"Social media platforms" are online networking sites.' },
        { sentence: 'Viral content spreads rapidly across networks.', explanation: '"Viral content" is widely shared material.' },
        { sentence: 'Online engagement measures user interaction.', explanation: '"Online engagement" is user participation.' },
        { sentence: 'Digital footprints record online activities.', explanation: '"Digital footprints" are traces of online activity.' },
        { sentence: 'Influencers shape opinions through social media.', explanation: '"Influencers" are people with large online followings.' },
        { sentence: 'Cyberbullying is harassment conducted online.', explanation: '"Cyberbullying" is online harassment.' },
        { sentence: 'Content moderation removes harmful material.', explanation: '"Content moderation" is reviewing and removing content.' },
        { sentence: 'Echo chambers reinforce existing beliefs.', explanation: '"Echo chambers" are environments where views are amplified.' },
        { sentence: 'Online privacy concerns have increased.', explanation: '"Online privacy" is protection of personal information.' },
        { sentence: 'User-generated content is created by platform users.', explanation: '"User-generated content" is content made by users.' },
        { sentence: 'Algorithm-driven feeds personalize content.', explanation: '"Algorithm-driven" means determined by computer programs.' },
        { sentence: 'Digital detox involves reducing screen time.', explanation: '"Digital detox" is taking breaks from technology.' },
        { sentence: 'Online communities form around shared interests.', explanation: '"Online communities" are internet-based groups.' },
        { sentence: 'Misinformation spreads easily on social media.', explanation: '"Misinformation" is false information.' },
        { sentence: 'Social media addiction affects mental health.', explanation: '"Social media addiction" is compulsive platform use.' }
      ],
      commonMistakes: [
        { mistake: 'Social media is bad.', correction: 'Social media has both benefits and drawbacks, including connection and information alongside risks like misinformation.', explanation: 'Present balanced views on social media.' },
        { mistake: 'Everyone uses social media the same way.', correction: 'Social media usage patterns vary significantly by age, culture, and individual preferences.', explanation: 'Acknowledge diverse usage patterns.' },
        { mistake: 'Online friends aren\'t real friends.', correction: 'Online relationships can be meaningful, though they differ from in-person connections.', explanation: 'Recognize value of online connections.' }
      ],
      miniPractice: [
        { question: '_____ content spreads rapidly across networks.', type: 'fill-blank' },
        { question: 'Which term describes environments where views are amplified?', options: ['echo chambers', 'filter bubbles', 'information silos', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "People waste time on social media."', type: 'rewrite' },
        { question: 'Digital _____ record online activities.', type: 'fill-blank' }
      ],
      answerKey: [
        'Viral',
        'all of the above',
        'Social media usage patterns vary, with some users spending significant time on platforms.',
        'footprints'
      ],
      quickRecap: 'Key terms: "social media platforms", "viral content", "online engagement", "digital footprints", "influencers", "cyberbullying", "content moderation", "echo chambers", "misinformation", "digital detox". Use balanced social media vocabulary!',
      collocations: [
        'social media platforms', 'viral content', 'online engagement', 'digital footprints',
        'influencers', 'cyberbullying', 'content moderation', 'echo chambers',
        'online privacy', 'user-generated content', 'algorithm-driven', 'online communities'
      ],
      synonyms: [
        { word: 'post', synonyms: ['share', 'publish', 'upload', 'put online'] },
        { word: 'like', synonyms: ['engage with', 'react to', 'interact with', 'respond to'] },
        { word: 'follow', synonyms: ['subscribe to', 'connect with', 'track', 'keep up with'] }
      ],
      speakingLines: [
        'Social media has transformed how people communicate and access information.',
        'Echo chambers can reinforce existing beliefs and limit exposure to diverse perspectives.',
        'Digital literacy is essential for navigating social media responsibly.'
      ]
    }
  },
  {
    id: 'vocab-media-4',
    title: 'Advertising & Persuasion',
    slug: 'advertising-persuasion',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Media',
    description: 'Vocabulary for discussing advertising techniques, marketing messages, and persuasion.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-07-18T10:00:00Z',
    updated_at: '2024-07-18T10:00:00Z',
    content: {
      title: 'Advertising & Persuasion',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 advertising terms',
        'Discuss marketing and persuasion',
        'Use advertising vocabulary'
      ],
      coreExplanation: `Advertising and persuasion are relevant to many IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss how advertising influences people.

This lesson covers advertising techniques, marketing strategies, and persuasion. Understanding these concepts helps you discuss the role of advertising in society.`,
      examples: [
        { sentence: 'Advertising campaigns promote products and services.', explanation: '"Advertising campaigns" are coordinated marketing efforts.' },
        { sentence: 'Target audiences are specific consumer groups.', explanation: '"Target audiences" are intended recipients of messages.' },
        { sentence: 'Brand recognition increases through repeated exposure.', explanation: '"Brand recognition" is consumer awareness of brands.' },
        { sentence: 'Persuasive techniques influence consumer decisions.', explanation: '"Persuasive techniques" are methods to convince people.' },
        { sentence: 'Celebrity endorsements associate products with famous people.', explanation: '"Celebrity endorsements" are famous people promoting products.' },
        { sentence: 'Subliminal messaging operates below conscious awareness.', explanation: '"Subliminal messaging" is hidden persuasion.' },
        { sentence: 'Advertising regulations protect consumers.', explanation: '"Advertising regulations" are rules governing ads.' },
        { sentence: 'Product placement integrates brands into content.', explanation: '"Product placement" is featuring products in media.' },
        { sentence: 'Emotional appeals connect with consumers\' feelings.', explanation: '"Emotional appeals" are persuasion through emotions.' },
        { sentence: 'Advertising revenue funds media content.', explanation: '"Advertising revenue" is income from ads.' },
        { sentence: 'Digital advertising targets users based on data.', explanation: '"Digital advertising" is online marketing.' },
        { sentence: 'Advertising ethics address responsible marketing.', explanation: '"Advertising ethics" are moral standards in advertising.' },
        { sentence: 'Call to action prompts immediate response.', explanation: '"Call to action" is a prompt to act.' },
        { sentence: 'Advertising saturation overwhelms consumers.', explanation: '"Advertising saturation" is excessive advertising.' },
        { sentence: 'Native advertising blends with editorial content.', explanation: '"Native advertising" is ads resembling content.' }
      ],
      commonMistakes: [
        { mistake: 'Advertising is manipulation.', correction: 'Advertising uses persuasive techniques, though ethical standards distinguish legitimate marketing from manipulation.', explanation: 'Discuss advertising analytically.' },
        { mistake: 'Ads don\'t affect me.', correction: 'Advertising influences consumer behavior in various ways, often below conscious awareness.', explanation: 'Acknowledge advertising effects.' },
        { mistake: 'All advertising is bad.', correction: 'Advertising serves economic functions and can inform consumers, though it raises ethical concerns.', explanation: 'Present balanced views on advertising.' }
      ],
      miniPractice: [
        { question: 'Advertising _____ promote products and services.', type: 'fill-blank' },
        { question: 'Which term describes famous people promoting products?', options: ['celebrity endorsements', 'influencer marketing', 'brand ambassadors', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Ads trick people into buying things."', type: 'rewrite' },
        { question: 'Target _____ are specific consumer groups.', type: 'fill-blank' }
      ],
      answerKey: [
        'campaigns',
        'all of the above',
        'Advertising uses persuasive techniques to influence consumer purchasing decisions.',
        'audiences'
      ],
      quickRecap: 'Key terms: "advertising campaigns", "target audiences", "brand recognition", "persuasive techniques", "celebrity endorsements", "product placement", "emotional appeals", "digital advertising", "advertising ethics", "native advertising". Use advertising vocabulary accurately!',
      collocations: [
        'advertising campaigns', 'target audiences', 'brand recognition', 'persuasive techniques',
        'celebrity endorsements', 'subliminal messaging', 'advertising regulations', 'product placement',
        'emotional appeals', 'advertising revenue', 'digital advertising', 'native advertising'
      ],
      synonyms: [
        { word: 'advertise', synonyms: ['promote', 'market', 'publicize', 'sell'] },
        { word: 'ad', synonyms: ['advertisement', 'commercial', 'promotion', 'marketing'] },
        { word: 'buy', synonyms: ['purchase', 'acquire', 'consume', 'obtain'] }
      ],
      speakingLines: [
        'Advertising uses various persuasive techniques to influence consumer behavior.',
        'Digital advertising raises concerns about privacy and data collection.',
        'Advertising ethics require balancing commercial interests with consumer protection.'
      ]
    }
  },
  {
    id: 'vocab-media-5',
    title: 'Entertainment & Popular Culture',
    slug: 'entertainment-popular-culture',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Media',
    description: 'Vocabulary for discussing entertainment media, popular culture, and cultural trends.',
    is_premium: true,
    is_published: true,
    view_count: 850,
    created_at: '2024-07-22T10:00:00Z',
    updated_at: '2024-07-22T10:00:00Z',
    content: {
      title: 'Entertainment & Popular Culture',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 entertainment terms',
        'Discuss popular culture trends',
        'Use entertainment vocabulary'
      ],
      coreExplanation: `Entertainment and popular culture are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss entertainment media and cultural trends.

This lesson covers entertainment, popular culture, and media consumption. Understanding these concepts helps you discuss how entertainment shapes and reflects society.`,
      examples: [
        { sentence: 'Streaming services have transformed entertainment consumption.', explanation: '"Streaming services" are online content platforms.' },
        { sentence: 'Popular culture reflects and shapes social values.', explanation: '"Popular culture" is mainstream cultural products.' },
        { sentence: 'Binge-watching involves viewing multiple episodes consecutively.', explanation: '"Binge-watching" is watching many episodes at once.' },
        { sentence: 'Cultural phenomena capture widespread attention.', explanation: '"Cultural phenomena" are widely noticed cultural events.' },
        { sentence: 'Entertainment industry generates significant revenue.', explanation: '"Entertainment industry" is the business of entertainment.' },
        { sentence: 'Fan communities form around entertainment properties.', explanation: '"Fan communities" are groups of enthusiastic followers.' },
        { sentence: 'Media franchises extend across multiple platforms.', explanation: '"Media franchises" are entertainment properties across media.' },
        { sentence: 'Celebrity culture influences public behavior.', explanation: '"Celebrity culture" is fascination with famous people.' },
        { sentence: 'Content creators produce original material.', explanation: '"Content creators" are people making media content.' },
        { sentence: 'Entertainment preferences vary by demographic.', explanation: '"Entertainment preferences" are what people like to watch.' },
        { sentence: 'Cultural exports spread national culture globally.', explanation: '"Cultural exports" are culture shared internationally.' },
        { sentence: 'Nostalgia drives interest in retro entertainment.', explanation: '"Nostalgia" is longing for the past.' },
        { sentence: 'Reality television depicts unscripted situations.', explanation: '"Reality television" is unscripted TV shows.' },
        { sentence: 'Entertainment escapism provides relief from daily life.', explanation: '"Escapism" is seeking distraction from reality.' },
        { sentence: 'Mainstream entertainment appeals to broad audiences.', explanation: '"Mainstream" is widely popular.' }
      ],
      commonMistakes: [
        { mistake: 'Entertainment is just a waste of time.', correction: 'Entertainment serves various functions including relaxation, social bonding, and cultural expression.', explanation: 'Recognize entertainment value.' },
        { mistake: 'Popular culture is shallow.', correction: 'Popular culture can reflect and influence social values, providing insight into contemporary society.', explanation: 'Acknowledge cultural significance.' },
        { mistake: 'Old entertainment was better.', correction: 'Entertainment quality is subjective, with different eras producing valuable cultural products.', explanation: 'Avoid nostalgia bias.' }
      ],
      miniPractice: [
        { question: '_____ services have transformed entertainment consumption.', type: 'fill-blank' },
        { question: 'Which term describes watching many episodes at once?', options: ['binge-watching', 'marathon viewing', 'continuous watching', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "People watch too much TV."', type: 'rewrite' },
        { question: 'Popular _____ reflects and shapes social values.', type: 'fill-blank' }
      ],
      answerKey: [
        'Streaming',
        'all of the above',
        'Entertainment consumption patterns have changed significantly with the rise of streaming services.',
        'culture'
      ],
      quickRecap: 'Key terms: "streaming services", "popular culture", "binge-watching", "cultural phenomena", "entertainment industry", "fan communities", "media franchises", "celebrity culture", "content creators", "escapism". Use entertainment vocabulary accurately!',
      collocations: [
        'streaming services', 'popular culture', 'binge-watching', 'cultural phenomena',
        'entertainment industry', 'fan communities', 'media franchises', 'celebrity culture',
        'content creators', 'entertainment preferences', 'cultural exports', 'reality television'
      ],
      synonyms: [
        { word: 'entertainment', synonyms: ['amusement', 'recreation', 'leisure', 'diversion'] },
        { word: 'watch', synonyms: ['view', 'consume', 'stream', 'tune in'] },
        { word: 'popular', synonyms: ['mainstream', 'widely-liked', 'trendy', 'fashionable'] }
      ],
      speakingLines: [
        'Streaming services have fundamentally changed how people consume entertainment.',
        'Popular culture both reflects and influences broader social values.',
        'Entertainment serves important functions including relaxation and social connection.'
      ]
    }
  },
  {
    id: 'vocab-media-6',
    title: 'Misinformation & Media Criticism',
    slug: 'misinformation-media-criticism',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Media',
    description: 'Advanced vocabulary for discussing fake news, propaganda, and critical media analysis.',
    is_premium: true,
    is_published: true,
    view_count: 680,
    created_at: '2024-07-25T10:00:00Z',
    updated_at: '2024-07-25T10:00:00Z',
    content: {
      title: 'Misinformation & Media Criticism',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 misinformation terms',
        'Discuss media criticism',
        'Use critical analysis vocabulary'
      ],
      coreExplanation: `Misinformation and media criticism are increasingly important topics. To achieve Band 8+, you need vocabulary that allows you to discuss false information and media analysis.

This lesson covers misinformation, propaganda, and critical media analysis. Understanding these concepts helps you discuss challenges to information quality.`,
      examples: [
        { sentence: 'Misinformation is false information spread unintentionally.', explanation: '"Misinformation" is incorrect information shared without intent to deceive.' },
        { sentence: 'Disinformation is deliberately false information.', explanation: '"Disinformation" is intentionally deceptive content.' },
        { sentence: 'Propaganda promotes particular political views.', explanation: '"Propaganda" is biased information to promote a cause.' },
        { sentence: 'Fact-checking organizations verify claims.', explanation: '"Fact-checking organizations" are groups that verify information.' },
        { sentence: 'Deepfakes use AI to create fake videos.', explanation: '"Deepfakes" are AI-generated fake media.' },
        { sentence: 'Information warfare uses media to influence adversaries.', explanation: '"Information warfare" is using information as a weapon.' },
        { sentence: 'Conspiracy theories propose secret explanations.', explanation: '"Conspiracy theories" are beliefs in secret plots.' },
        { sentence: 'Source credibility affects information trustworthiness.', explanation: '"Source credibility" is how trustworthy a source is.' },
        { sentence: 'Media manipulation distorts public perception.', explanation: '"Media manipulation" is controlling media to deceive.' },
        { sentence: 'Critical thinking evaluates information quality.', explanation: '"Critical thinking" is careful analysis of information.' },
        { sentence: 'Information literacy enables evaluation of sources.', explanation: '"Information literacy" is ability to find and evaluate information.' },
        { sentence: 'Clickbait uses sensational headlines to attract clicks.', explanation: '"Clickbait" is content designed to attract clicks.' },
        { sentence: 'Filter bubbles limit exposure to diverse information.', explanation: '"Filter bubbles" are personalized information environments.' },
        { sentence: 'Verification processes confirm information accuracy.', explanation: '"Verification" is confirming something is true.' },
        { sentence: 'Media skepticism questions information sources.', explanation: '"Media skepticism" is doubting media claims.' }
      ],
      commonMistakes: [
        { mistake: 'Everything online is fake.', correction: 'Information quality varies, and critical evaluation helps distinguish reliable from unreliable sources.', explanation: 'Encourage nuanced evaluation.' },
        { mistake: 'Only certain groups spread misinformation.', correction: 'Misinformation can come from various sources and affect people across the political spectrum.', explanation: 'Avoid partisan framing.' },
        { mistake: 'I can always tell what\'s fake.', correction: 'Sophisticated misinformation can be difficult to identify, requiring careful verification.', explanation: 'Acknowledge detection challenges.' }
      ],
      miniPractice: [
        { question: '_____ is false information spread unintentionally.', type: 'fill-blank' },
        { question: 'Which term describes AI-generated fake videos?', options: ['deepfakes', 'synthetic media', 'fake videos', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Everything on the internet is lies."', type: 'rewrite' },
        { question: '_____ is deliberately false information.', type: 'fill-blank' }
      ],
      answerKey: [
        'Misinformation',
        'all of the above',
        'Information quality varies online, requiring critical evaluation of sources.',
        'Disinformation'
      ],
      quickRecap: 'Key terms: "misinformation", "disinformation", "propaganda", "fact-checking", "deepfakes", "information warfare", "conspiracy theories", "source credibility", "critical thinking", "information literacy". Use critical analysis vocabulary!',
      collocations: [
        'misinformation', 'disinformation', 'propaganda', 'fact-checking organizations',
        'deepfakes', 'information warfare', 'conspiracy theories', 'source credibility',
        'media manipulation', 'critical thinking', 'information literacy', 'filter bubbles'
      ],
      synonyms: [
        { word: 'fake', synonyms: ['false', 'fabricated', 'misleading', 'deceptive'] },
        { word: 'true', synonyms: ['accurate', 'verified', 'factual', 'reliable'] },
        { word: 'check', synonyms: ['verify', 'confirm', 'validate', 'authenticate'] }
      ],
      speakingLines: [
        'Information literacy is essential for navigating the modern media environment.',
        'Distinguishing misinformation from disinformation helps understand intent.',
        'Critical thinking skills are crucial for evaluating source credibility.'
      ]
    }
  },
  // ============================================
  // BATCH 9: Science & Research (5 lessons)
  // ============================================
  {
    id: 'vocab-science-2',
    title: 'Scientific Method & Research',
    slug: 'scientific-method-research',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Science',
    description: 'Advanced vocabulary for discussing scientific methodology, research processes, and evidence.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-07-28T10:00:00Z',
    updated_at: '2024-07-28T10:00:00Z',
    content: {
      title: 'Scientific Method & Research',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 scientific method terms',
        'Discuss research processes',
        'Use scientific vocabulary'
      ],
      coreExplanation: `Scientific methodology is important for discussing research and evidence. To achieve Band 8+, you need vocabulary that allows you to discuss how scientific knowledge is produced.

This lesson covers the scientific method, research processes, and evidence evaluation. Understanding these concepts helps you discuss science and research accurately.`,
      examples: [
        { sentence: 'The scientific method involves systematic observation and experimentation.', explanation: '"Scientific method" is the process of scientific inquiry.' },
        { sentence: 'Hypotheses are testable predictions.', explanation: '"Hypotheses" are proposed explanations to be tested.' },
        { sentence: 'Empirical evidence is based on observation.', explanation: '"Empirical evidence" is evidence from observation or experiment.' },
        { sentence: 'Peer review evaluates research quality.', explanation: '"Peer review" is expert evaluation of research.' },
        { sentence: 'Controlled experiments isolate variables.', explanation: '"Controlled experiments" test one variable at a time.' },
        { sentence: 'Data analysis reveals patterns and relationships.', explanation: '"Data analysis" is examining data systematically.' },
        { sentence: 'Replication confirms research findings.', explanation: '"Replication" is repeating experiments to verify results.' },
        { sentence: 'Scientific consensus represents expert agreement.', explanation: '"Scientific consensus" is widespread agreement among scientists.' },
        { sentence: 'Research methodology determines study design.', explanation: '"Research methodology" is the approach to conducting research.' },
        { sentence: 'Variables are factors that can change.', explanation: '"Variables" are changeable elements in experiments.' },
        { sentence: 'Sample sizes affect statistical reliability.', explanation: '"Sample sizes" are the number of subjects studied.' },
        { sentence: 'Correlation does not imply causation.', explanation: '"Correlation" is a relationship between variables.' },
        { sentence: 'Bias can affect research outcomes.', explanation: '"Bias" is systematic error in research.' },
        { sentence: 'Longitudinal studies track subjects over time.', explanation: '"Longitudinal studies" follow subjects for extended periods.' },
        { sentence: 'Quantitative research uses numerical data.', explanation: '"Quantitative research" involves measurable data.' }
      ],
      commonMistakes: [
        { mistake: 'Scientists prove things.', correction: 'Science provides evidence supporting or refuting hypotheses, with findings subject to revision.', explanation: 'Explain scientific uncertainty.' },
        { mistake: 'One study proves something.', correction: 'Scientific knowledge builds through multiple studies, replication, and peer review.', explanation: 'Discuss cumulative evidence.' },
        { mistake: 'Correlation means causation.', correction: 'Correlation indicates a relationship but does not establish that one factor causes another.', explanation: 'Distinguish correlation from causation.' }
      ],
      miniPractice: [
        { question: 'The scientific _____ involves systematic observation and experimentation.', type: 'fill-blank' },
        { question: 'Which term describes expert evaluation of research?', options: ['peer review', 'editorial review', 'quality control', 'expert assessment'], type: 'multiple-choice' },
        { question: 'Rewrite: "Scientists proved this is true."', type: 'rewrite' },
        { question: '_____ evidence is based on observation.', type: 'fill-blank' }
      ],
      answerKey: [
        'method',
        'peer review',
        'Scientific research provides strong evidence supporting this conclusion.',
        'Empirical'
      ],
      quickRecap: 'Key terms: "scientific method", "hypotheses", "empirical evidence", "peer review", "controlled experiments", "data analysis", "replication", "scientific consensus", "variables", "correlation". Use scientific vocabulary accurately!',
      collocations: [
        'scientific method', 'hypotheses', 'empirical evidence', 'peer review',
        'controlled experiments', 'data analysis', 'replication', 'scientific consensus',
        'research methodology', 'variables', 'sample sizes', 'longitudinal studies'
      ],
      synonyms: [
        { word: 'study', synonyms: ['research', 'investigation', 'experiment', 'analysis'] },
        { word: 'prove', synonyms: ['demonstrate', 'show', 'provide evidence', 'support'] },
        { word: 'test', synonyms: ['examine', 'investigate', 'evaluate', 'assess'] }
      ],
      speakingLines: [
        'The scientific method provides a systematic approach to understanding the natural world.',
        'Peer review is essential for maintaining research quality and credibility.',
        'Scientific consensus emerges from accumulated evidence across multiple studies.'
      ]
    }
  },
  {
    id: 'vocab-science-3',
    title: 'Space & Astronomy',
    slug: 'space-astronomy',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Science',
    description: 'Vocabulary for discussing space exploration, astronomy, and the universe.',
    is_premium: true,
    is_published: true,
    view_count: 850,
    created_at: '2024-08-01T10:00:00Z',
    updated_at: '2024-08-01T10:00:00Z',
    content: {
      title: 'Space & Astronomy',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 space and astronomy terms',
        'Discuss space exploration',
        'Use astronomical vocabulary'
      ],
      coreExplanation: `Space and astronomy are fascinating topics that appear in IELTS. To achieve Band 7+, you need vocabulary that allows you to discuss space exploration and astronomical concepts.

This lesson covers space exploration, astronomy, and the universe. Understanding these concepts helps you discuss humanity's exploration of space.`,
      examples: [
        { sentence: 'Space exploration has expanded human knowledge.', explanation: '"Space exploration" is investigating outer space.' },
        { sentence: 'Satellites orbit Earth for various purposes.', explanation: '"Satellites" are objects orbiting planets.' },
        { sentence: 'The solar system includes eight planets.', explanation: '"Solar system" is the sun and objects orbiting it.' },
        { sentence: 'Galaxies contain billions of stars.', explanation: '"Galaxies" are vast systems of stars.' },
        { sentence: 'Astronauts conduct research in space.', explanation: '"Astronauts" are people trained for space travel.' },
        { sentence: 'Space missions achieve scientific objectives.', explanation: '"Space missions" are organized space expeditions.' },
        { sentence: 'Telescopes observe distant celestial objects.', explanation: '"Telescopes" are instruments for viewing distant objects.' },
        { sentence: 'The universe is constantly expanding.', explanation: '"Universe" is all of space and everything in it.' },
        { sentence: 'Black holes have extreme gravitational pull.', explanation: '"Black holes" are regions of intense gravity.' },
        { sentence: 'Mars exploration seeks signs of past life.', explanation: '"Mars exploration" is investigating the red planet.' },
        { sentence: 'Space agencies coordinate international efforts.', explanation: '"Space agencies" are organizations managing space programs.' },
        { sentence: 'Cosmic phenomena include supernovae and quasars.', explanation: '"Cosmic phenomena" are events in space.' },
        { sentence: 'Orbital mechanics govern spacecraft movement.', explanation: '"Orbital mechanics" is the physics of orbits.' },
        { sentence: 'Extraterrestrial life remains unconfirmed.', explanation: '"Extraterrestrial life" is life beyond Earth.' },
        { sentence: 'Space tourism is becoming commercially viable.', explanation: '"Space tourism" is recreational space travel.' }
      ],
      commonMistakes: [
        { mistake: 'Space exploration is a waste of money.', correction: 'Space exploration provides scientific knowledge, technological innovation, and potential long-term benefits.', explanation: 'Discuss space exploration value.' },
        { mistake: 'We know everything about space.', correction: 'Much of the universe remains unexplored and poorly understood.', explanation: 'Acknowledge scientific uncertainty.' },
        { mistake: 'Aliens definitely exist.', correction: 'While conditions for life may exist elsewhere, extraterrestrial life has not been confirmed.', explanation: 'Present evidence-based views.' }
      ],
      miniPractice: [
        { question: 'Space _____ has expanded human knowledge.', type: 'fill-blank' },
        { question: 'Which term describes regions of intense gravity?', options: ['black holes', 'neutron stars', 'dark matter', 'singularities'], type: 'multiple-choice' },
        { question: 'Rewrite: "Going to space is pointless."', type: 'rewrite' },
        { question: '_____ orbit Earth for various purposes.', type: 'fill-blank' }
      ],
      answerKey: [
        'exploration',
        'black holes',
        'Space exploration provides scientific knowledge and technological benefits.',
        'Satellites'
      ],
      quickRecap: 'Key terms: "space exploration", "satellites", "solar system", "galaxies", "astronauts", "space missions", "telescopes", "universe", "black holes", "space tourism". Use astronomical vocabulary accurately!',
      collocations: [
        'space exploration', 'satellites', 'solar system', 'galaxies',
        'astronauts', 'space missions', 'telescopes', 'universe',
        'black holes', 'Mars exploration', 'space agencies', 'space tourism'
      ],
      synonyms: [
        { word: 'space', synonyms: ['outer space', 'cosmos', 'universe', 'heavens'] },
        { word: 'planet', synonyms: ['world', 'celestial body', 'heavenly body', 'orb'] },
        { word: 'star', synonyms: ['sun', 'celestial body', 'stellar object', 'luminary'] }
      ],
      speakingLines: [
        'Space exploration has yielded significant scientific discoveries and technological innovations.',
        'International cooperation in space programs demonstrates the potential for global collaboration.',
        'The search for extraterrestrial life continues to drive space exploration efforts.'
      ]
    }
  },
  {
    id: 'vocab-science-4',
    title: 'Genetics & Biology',
    slug: 'genetics-biology',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Science',
    description: 'Advanced vocabulary for discussing genetics, evolution, and biological sciences.',
    is_premium: true,
    is_published: true,
    view_count: 680,
    created_at: '2024-08-05T10:00:00Z',
    updated_at: '2024-08-05T10:00:00Z',
    content: {
      title: 'Genetics & Biology',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 genetics and biology terms',
        'Discuss biological concepts',
        'Use scientific vocabulary'
      ],
      coreExplanation: `Genetics and biology are important scientific topics. To achieve Band 8+, you need vocabulary that allows you to discuss biological concepts and genetic science.

This lesson covers genetics, evolution, and biological sciences. Understanding these concepts helps you discuss life sciences accurately.`,
      examples: [
        { sentence: 'DNA contains genetic information.', explanation: '"DNA" is the molecule carrying genetic instructions.' },
        { sentence: 'Genetic engineering modifies organisms.', explanation: '"Genetic engineering" is altering genetic material.' },
        { sentence: 'Evolution explains species development.', explanation: '"Evolution" is change in species over time.' },
        { sentence: 'Biodiversity encompasses all living species.', explanation: '"Biodiversity" is the variety of life.' },
        { sentence: 'Ecosystems include organisms and their environment.', explanation: '"Ecosystems" are communities of organisms.' },
        { sentence: 'Mutations are changes in genetic material.', explanation: '"Mutations" are alterations in DNA.' },
        { sentence: 'Natural selection drives evolutionary change.', explanation: '"Natural selection" is survival of the fittest.' },
        { sentence: 'Cells are the basic units of life.', explanation: '"Cells" are fundamental biological units.' },
        { sentence: 'Heredity transmits traits between generations.', explanation: '"Heredity" is passing traits to offspring.' },
        { sentence: 'Cloning creates genetically identical organisms.', explanation: '"Cloning" is producing genetic copies.' },
        { sentence: 'Stem cells can develop into various cell types.', explanation: '"Stem cells" are undifferentiated cells.' },
        { sentence: 'Gene therapy treats diseases by modifying genes.', explanation: '"Gene therapy" is treating disease through genetics.' },
        { sentence: 'Microorganisms include bacteria and viruses.', explanation: '"Microorganisms" are microscopic living things.' },
        { sentence: 'Photosynthesis converts sunlight to energy.', explanation: '"Photosynthesis" is how plants make food.' },
        { sentence: 'Extinction eliminates species permanently.', explanation: '"Extinction" is the end of a species.' }
      ],
      commonMistakes: [
        { mistake: 'Evolution is just a theory.', correction: 'In science, "theory" means a well-supported explanation; evolution is supported by extensive evidence.', explanation: 'Explain scientific terminology.' },
        { mistake: 'Genetic engineering is unnatural.', correction: 'Humans have modified organisms through selective breeding for millennia; genetic engineering is a more precise method.', explanation: 'Provide context for genetic modification.' },
        { mistake: 'Cloning creates identical people.', correction: 'Even genetic clones would develop differently due to environmental factors and experiences.', explanation: 'Distinguish genetics from identity.' }
      ],
      miniPractice: [
        { question: '_____ contains genetic information.', type: 'fill-blank' },
        { question: 'Which term describes the variety of life?', options: ['biodiversity', 'ecology', 'biology', 'genetics'], type: 'multiple-choice' },
        { question: 'Rewrite: "Evolution is not real."', type: 'rewrite' },
        { question: 'Genetic _____ modifies organisms.', type: 'fill-blank' }
      ],
      answerKey: [
        'DNA',
        'biodiversity',
        'Evolution is a well-supported scientific theory explaining species development.',
        'engineering'
      ],
      quickRecap: 'Key terms: "DNA", "genetic engineering", "evolution", "biodiversity", "ecosystems", "mutations", "natural selection", "heredity", "cloning", "stem cells". Use biological vocabulary accurately!',
      collocations: [
        'DNA', 'genetic engineering', 'evolution', 'biodiversity',
        'ecosystems', 'mutations', 'natural selection', 'cells',
        'heredity', 'cloning', 'stem cells', 'gene therapy'
      ],
      synonyms: [
        { word: 'gene', synonyms: ['genetic material', 'hereditary unit', 'DNA segment', 'genetic code'] },
        { word: 'species', synonyms: ['organism', 'life form', 'creature', 'living thing'] },
        { word: 'change', synonyms: ['evolve', 'mutate', 'adapt', 'develop'] }
      ],
      speakingLines: [
        'Genetic engineering raises both exciting possibilities and ethical concerns.',
        'Biodiversity loss threatens ecosystem stability and human wellbeing.',
        'Evolution through natural selection explains the diversity of life on Earth.'
      ]
    }
  },
  {
    id: 'vocab-science-5',
    title: 'Physics & Chemistry Basics',
    slug: 'physics-chemistry-basics',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Science',
    description: 'Vocabulary for discussing fundamental physics and chemistry concepts.',
    is_premium: true,
    is_published: true,
    view_count: 620,
    created_at: '2024-08-08T10:00:00Z',
    updated_at: '2024-08-08T10:00:00Z',
    content: {
      title: 'Physics & Chemistry Basics',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 physics and chemistry terms',
        'Discuss scientific concepts',
        'Use physical science vocabulary'
      ],
      coreExplanation: `Physics and chemistry concepts appear in various IELTS contexts. To achieve Band 7+, you need vocabulary that allows you to discuss fundamental scientific concepts.

This lesson covers basic physics and chemistry concepts. Understanding these terms helps you discuss scientific topics accurately.`,
      examples: [
        { sentence: 'Energy cannot be created or destroyed.', explanation: '"Energy" is the capacity to do work.' },
        { sentence: 'Atoms are the building blocks of matter.', explanation: '"Atoms" are the smallest units of elements.' },
        { sentence: 'Chemical reactions transform substances.', explanation: '"Chemical reactions" are processes changing substances.' },
        { sentence: 'Gravity attracts objects toward each other.', explanation: '"Gravity" is the force of attraction between masses.' },
        { sentence: 'Molecules consist of bonded atoms.', explanation: '"Molecules" are groups of atoms bonded together.' },
        { sentence: 'Temperature measures thermal energy.', explanation: '"Temperature" is a measure of heat.' },
        { sentence: 'Electricity powers modern technology.', explanation: '"Electricity" is the flow of electric charge.' },
        { sentence: 'Elements are pure chemical substances.', explanation: '"Elements" are substances with one type of atom.' },
        { sentence: 'Force causes objects to accelerate.', explanation: '"Force" is a push or pull on objects.' },
        { sentence: 'Compounds combine different elements.', explanation: '"Compounds" are substances with multiple elements.' },
        { sentence: 'Radiation includes various energy forms.', explanation: '"Radiation" is energy transmitted as waves or particles.' },
        { sentence: 'Pressure is force per unit area.', explanation: '"Pressure" is force applied over an area.' },
        { sentence: 'Velocity describes speed and direction.', explanation: '"Velocity" is speed in a specific direction.' },
        { sentence: 'Solutions dissolve substances in liquids.', explanation: '"Solutions" are mixtures with dissolved substances.' },
        { sentence: 'Magnetism attracts certain materials.', explanation: '"Magnetism" is the force from magnets.' }
      ],
      commonMistakes: [
        { mistake: 'Heat and temperature are the same.', correction: 'Heat is energy transfer, while temperature measures thermal energy.', explanation: 'Distinguish related concepts.' },
        { mistake: 'Chemicals are always dangerous.', correction: 'Everything is made of chemicals; the term refers to substances, not just hazardous ones.', explanation: 'Clarify chemical terminology.' },
        { mistake: 'Radiation is always harmful.', correction: 'Radiation includes many forms, some beneficial (like visible light) and some potentially harmful.', explanation: 'Explain radiation types.' }
      ],
      miniPractice: [
        { question: '_____ cannot be created or destroyed.', type: 'fill-blank' },
        { question: 'Which term describes the smallest units of elements?', options: ['atoms', 'molecules', 'particles', 'cells'], type: 'multiple-choice' },
        { question: 'Rewrite: "Chemicals are bad for you."', type: 'rewrite' },
        { question: 'Chemical _____ transform substances.', type: 'fill-blank' }
      ],
      answerKey: [
        'Energy',
        'atoms',
        'Some chemical substances can be harmful, while others are essential for life.',
        'reactions'
      ],
      quickRecap: 'Key terms: "energy", "atoms", "chemical reactions", "gravity", "molecules", "temperature", "electricity", "elements", "force", "radiation". Use scientific vocabulary accurately!',
      collocations: [
        'energy', 'atoms', 'chemical reactions', 'gravity',
        'molecules', 'temperature', 'electricity', 'elements',
        'force', 'compounds', 'radiation', 'pressure'
      ],
      synonyms: [
        { word: 'energy', synonyms: ['power', 'force', 'strength', 'capacity'] },
        { word: 'substance', synonyms: ['material', 'matter', 'compound', 'element'] },
        { word: 'change', synonyms: ['transform', 'convert', 'alter', 'modify'] }
      ],
      speakingLines: [
        'Understanding basic physics and chemistry helps explain everyday phenomena.',
        'Energy conservation is a fundamental principle in physics.',
        'Chemical reactions are essential for both industrial processes and biological life.'
      ]
    }
  },
  {
    id: 'vocab-science-6',
    title: 'Scientific Ethics & Responsibility',
    slug: 'scientific-ethics-responsibility',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Science',
    description: 'Advanced vocabulary for discussing ethical issues in science and research responsibility.',
    is_premium: true,
    is_published: true,
    view_count: 580,
    created_at: '2024-08-12T10:00:00Z',
    updated_at: '2024-08-12T10:00:00Z',
    content: {
      title: 'Scientific Ethics & Responsibility',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 scientific ethics terms',
        'Discuss research responsibility',
        'Use ethics vocabulary'
      ],
      coreExplanation: `Scientific ethics and responsibility are important for discussing research conduct. To achieve Band 8+, you need vocabulary that allows you to discuss ethical issues in science.

This lesson covers research ethics, scientific responsibility, and ethical debates. Understanding these concepts helps you discuss the moral dimensions of science.`,
      examples: [
        { sentence: 'Research ethics govern scientific conduct.', explanation: '"Research ethics" are moral principles for research.' },
        { sentence: 'Informed consent protects research participants.', explanation: '"Informed consent" is agreement based on understanding.' },
        { sentence: 'Scientific integrity requires honest reporting.', explanation: '"Scientific integrity" is honesty in research.' },
        { sentence: 'Animal testing raises ethical concerns.', explanation: '"Animal testing" is using animals in research.' },
        { sentence: 'Bioethics addresses moral issues in biology.', explanation: '"Bioethics" is ethics related to life sciences.' },
        { sentence: 'Research misconduct includes fabrication and plagiarism.', explanation: '"Research misconduct" is unethical research behavior.' },
        { sentence: 'Dual-use research has both beneficial and harmful potential.', explanation: '"Dual-use research" can be used for good or harm.' },
        { sentence: 'Ethical review boards evaluate research proposals.', explanation: '"Ethical review boards" assess research ethics.' },
        { sentence: 'Scientific responsibility extends beyond the laboratory.', explanation: '"Scientific responsibility" is accountability for research impacts.' },
        { sentence: 'Conflicts of interest can bias research.', explanation: '"Conflicts of interest" are competing loyalties.' },
        { sentence: 'Data transparency enables verification.', explanation: '"Data transparency" is openness about research data.' },
        { sentence: 'Human subjects research requires special protections.', explanation: '"Human subjects research" involves people as participants.' },
        { sentence: 'Intellectual property protects innovations.', explanation: '"Intellectual property" is legal protection for ideas.' },
        { sentence: 'Science communication informs the public.', explanation: '"Science communication" is explaining science to non-experts.' },
        { sentence: 'Ethical guidelines evolve with scientific advances.', explanation: '"Ethical guidelines" are rules for ethical conduct.' }
      ],
      commonMistakes: [
        { mistake: 'Scientists should do whatever advances knowledge.', correction: 'Scientific research must balance knowledge advancement with ethical considerations and potential harms.', explanation: 'Discuss ethical limits on research.' },
        { mistake: 'Ethics slow down scientific progress.', correction: 'Ethical guidelines protect research participants and maintain public trust in science.', explanation: 'Explain ethics value.' },
        { mistake: 'Animal testing is always wrong.', correction: 'Animal research involves ethical trade-offs between scientific benefits and animal welfare.', explanation: 'Present balanced views on animal research.' }
      ],
      miniPractice: [
        { question: 'Research _____ govern scientific conduct.', type: 'fill-blank' },
        { question: 'Which term describes agreement based on understanding?', options: ['informed consent', 'voluntary participation', 'ethical approval', 'research agreement'], type: 'multiple-choice' },
        { question: 'Rewrite: "Scientists can do whatever they want."', type: 'rewrite' },
        { question: 'Scientific _____ requires honest reporting.', type: 'fill-blank' }
      ],
      answerKey: [
        'ethics',
        'informed consent',
        'Scientific research must adhere to ethical guidelines and consider potential impacts.',
        'integrity'
      ],
      quickRecap: 'Key terms: "research ethics", "informed consent", "scientific integrity", "animal testing", "bioethics", "research misconduct", "dual-use research", "ethical review boards", "conflicts of interest", "data transparency". Use ethics vocabulary accurately!',
      collocations: [
        'research ethics', 'informed consent', 'scientific integrity', 'animal testing',
        'bioethics', 'research misconduct', 'dual-use research', 'ethical review boards',
        'scientific responsibility', 'conflicts of interest', 'data transparency', 'human subjects research'
      ],
      synonyms: [
        { word: 'ethical', synonyms: ['moral', 'principled', 'responsible', 'conscientious'] },
        { word: 'honest', synonyms: ['truthful', 'transparent', 'forthright', 'candid'] },
        { word: 'responsible', synonyms: ['accountable', 'answerable', 'liable', 'duty-bound'] }
      ],
      speakingLines: [
        'Research ethics are essential for maintaining public trust in science.',
        'Informed consent ensures that research participants understand and agree to their involvement.',
        'Scientific integrity requires transparent reporting of methods and results.'
      ]
    }
  },
  // ============================================
  // BATCH 10: Work & Career (5 lessons)
  // ============================================
  {
    id: 'vocab-work-2',
    title: 'Workplace Skills & Competencies',
    slug: 'workplace-skills-competencies',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Work',
    description: 'Vocabulary for discussing professional skills, competencies, and workplace abilities.',
    is_premium: true,
    is_published: true,
    view_count: 880,
    created_at: '2024-08-15T10:00:00Z',
    updated_at: '2024-08-15T10:00:00Z',
    content: {
      title: 'Workplace Skills & Competencies',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 workplace skills terms',
        'Discuss professional competencies',
        'Use career vocabulary'
      ],
      coreExplanation: `Workplace skills and competencies are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss professional abilities and career development.

This lesson covers workplace skills, competencies, and professional development. Understanding these concepts helps you discuss career-related topics effectively.`,
      examples: [
        { sentence: 'Soft skills include communication and teamwork.', explanation: '"Soft skills" are interpersonal abilities.' },
        { sentence: 'Technical skills are job-specific abilities.', explanation: '"Technical skills" are specialized knowledge.' },
        { sentence: 'Problem-solving is valued across industries.', explanation: '"Problem-solving" is finding solutions to challenges.' },
        { sentence: 'Leadership involves guiding and motivating others.', explanation: '"Leadership" is directing and inspiring people.' },
        { sentence: 'Time management improves productivity.', explanation: '"Time management" is using time effectively.' },
        { sentence: 'Critical thinking analyzes information objectively.', explanation: '"Critical thinking" is careful analysis.' },
        { sentence: 'Adaptability helps workers handle change.', explanation: '"Adaptability" is adjusting to new situations.' },
        { sentence: 'Communication skills enable effective interaction.', explanation: '"Communication skills" are abilities to convey information.' },
        { sentence: 'Teamwork involves collaborating with colleagues.', explanation: '"Teamwork" is working together effectively.' },
        { sentence: 'Initiative means taking action without being asked.', explanation: '"Initiative" is self-motivated action.' },
        { sentence: 'Creativity generates innovative solutions.', explanation: '"Creativity" is producing original ideas.' },
        { sentence: 'Attention to detail ensures accuracy.', explanation: '"Attention to detail" is careful focus on specifics.' },
        { sentence: 'Emotional intelligence manages interpersonal dynamics.', explanation: '"Emotional intelligence" is understanding emotions.' },
        { sentence: 'Multitasking handles multiple responsibilities.', explanation: '"Multitasking" is doing several things at once.' },
        { sentence: 'Professional development enhances career skills.', explanation: '"Professional development" is improving work abilities.' }
      ],
      commonMistakes: [
        { mistake: 'Technical skills are more important than soft skills.', correction: 'Both technical and soft skills are essential for career success, with their relative importance varying by role.', explanation: 'Balance skill types.' },
        { mistake: 'You either have skills or you don\'t.', correction: 'Most skills can be developed through practice, training, and experience.', explanation: 'Emphasize skill development.' },
        { mistake: 'Multitasking is always good.', correction: 'While multitasking can be useful, focused attention often produces better results for complex tasks.', explanation: 'Present nuanced views on multitasking.' }
      ],
      miniPractice: [
        { question: '_____ skills include communication and teamwork.', type: 'fill-blank' },
        { question: 'Which term describes adjusting to new situations?', options: ['adaptability', 'flexibility', 'versatility', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "He is good at his job."', type: 'rewrite' },
        { question: 'Time _____ improves productivity.', type: 'fill-blank' }
      ],
      answerKey: [
        'Soft',
        'all of the above',
        'He demonstrates strong technical competencies and professional skills.',
        'management'
      ],
      quickRecap: 'Key terms: "soft skills", "technical skills", "problem-solving", "leadership", "time management", "critical thinking", "adaptability", "communication skills", "teamwork", "emotional intelligence". Use workplace vocabulary accurately!',
      collocations: [
        'soft skills', 'technical skills', 'problem-solving', 'leadership',
        'time management', 'critical thinking', 'adaptability', 'communication skills',
        'teamwork', 'initiative', 'creativity', 'professional development'
      ],
      synonyms: [
        { word: 'skill', synonyms: ['ability', 'competency', 'capability', 'expertise'] },
        { word: 'good at', synonyms: ['proficient in', 'skilled at', 'competent in', 'adept at'] },
        { word: 'work', synonyms: ['collaborate', 'cooperate', 'contribute', 'participate'] }
      ],
      speakingLines: [
        'Soft skills like communication and teamwork are increasingly valued in the modern workplace.',
        'Adaptability is essential in rapidly changing work environments.',
        'Professional development helps workers maintain relevant skills throughout their careers.'
      ]
    }
  },
  {
    id: 'vocab-work-3',
    title: 'Job Search & Recruitment',
    slug: 'job-search-recruitment',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Work',
    description: 'Vocabulary for discussing job applications, interviews, and the hiring process.',
    is_premium: true,
    is_published: true,
    view_count: 920,
    created_at: '2024-08-18T10:00:00Z',
    updated_at: '2024-08-18T10:00:00Z',
    content: {
      title: 'Job Search & Recruitment',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 job search terms',
        'Discuss recruitment processes',
        'Use hiring vocabulary'
      ],
      coreExplanation: `Job search and recruitment are practical topics for IELTS. To achieve Band 7+, you need vocabulary that allows you to discuss the hiring process and job applications.

This lesson covers job searching, recruitment, and the hiring process. Understanding these concepts helps you discuss employment-related topics effectively.`,
      examples: [
        { sentence: 'Job applications include resumes and cover letters.', explanation: '"Job applications" are requests for employment.' },
        { sentence: 'Recruitment processes identify suitable candidates.', explanation: '"Recruitment" is finding and hiring employees.' },
        { sentence: 'Interviews assess candidate suitability.', explanation: '"Interviews" are formal meetings to evaluate candidates.' },
        { sentence: 'Qualifications include education and certifications.', explanation: '"Qualifications" are credentials for jobs.' },
        { sentence: 'Job postings advertise available positions.', explanation: '"Job postings" are advertisements for jobs.' },
        { sentence: 'Networking helps discover job opportunities.', explanation: '"Networking" is building professional connections.' },
        { sentence: 'References provide information about candidates.', explanation: '"References" are people who vouch for candidates.' },
        { sentence: 'Shortlisting narrows down applicants.', explanation: '"Shortlisting" is selecting top candidates.' },
        { sentence: 'Background checks verify candidate information.', explanation: '"Background checks" are investigations of candidates.' },
        { sentence: 'Job offers specify employment terms.', explanation: '"Job offers" are formal employment proposals.' },
        { sentence: 'Salary negotiations determine compensation.', explanation: '"Salary negotiations" are discussions about pay.' },
        { sentence: 'Onboarding integrates new employees.', explanation: '"Onboarding" is introducing new hires to the organization.' },
        { sentence: 'Headhunters recruit for specialized positions.', explanation: '"Headhunters" are recruiters for executive roles.' },
        { sentence: 'Applicant tracking systems manage applications.', explanation: '"Applicant tracking systems" are software for recruitment.' },
        { sentence: 'Probationary periods evaluate new employees.', explanation: '"Probationary periods" are trial employment periods.' }
      ],
      commonMistakes: [
        { mistake: 'I need a job.', correction: 'I am seeking employment / exploring career opportunities in [field].', explanation: 'Use professional job search language.' },
        { mistake: 'The interview went well.', correction: 'The interview provided an opportunity to demonstrate my qualifications and discuss the role.', explanation: 'Describe interviews professionally.' },
        { mistake: 'They didn\'t hire me.', correction: 'I was not selected for the position / The role was offered to another candidate.', explanation: 'Use professional rejection language.' }
      ],
      miniPractice: [
        { question: 'Job _____ include resumes and cover letters.', type: 'fill-blank' },
        { question: 'Which term describes building professional connections?', options: ['networking', 'connecting', 'socializing', 'meeting'], type: 'multiple-choice' },
        { question: 'Rewrite: "I want to get this job."', type: 'rewrite' },
        { question: '_____ processes identify suitable candidates.', type: 'fill-blank' }
      ],
      answerKey: [
        'applications',
        'networking',
        'I am interested in this position and believe my qualifications align well with the requirements.',
        'Recruitment'
      ],
      quickRecap: 'Key terms: "job applications", "recruitment", "interviews", "qualifications", "job postings", "networking", "references", "shortlisting", "job offers", "onboarding". Use professional job search vocabulary!',
      collocations: [
        'job applications', 'recruitment processes', 'interviews', 'qualifications',
        'job postings', 'networking', 'references', 'shortlisting',
        'background checks', 'job offers', 'salary negotiations', 'onboarding'
      ],
      synonyms: [
        { word: 'job', synonyms: ['position', 'role', 'opportunity', 'employment'] },
        { word: 'hire', synonyms: ['recruit', 'employ', 'engage', 'appoint'] },
        { word: 'apply', synonyms: ['submit application', 'express interest', 'seek', 'pursue'] }
      ],
      speakingLines: [
        'Networking is often as important as formal applications in finding job opportunities.',
        'Interview preparation should include researching the company and practicing responses.',
        'Salary negotiations require understanding market rates and articulating your value.'
      ]
    }
  },
  {
    id: 'vocab-work-4',
    title: 'Workplace Culture & Environment',
    slug: 'workplace-culture-environment',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Work',
    description: 'Vocabulary for discussing organizational culture, work environments, and office dynamics.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-08-22T10:00:00Z',
    updated_at: '2024-08-22T10:00:00Z',
    content: {
      title: 'Workplace Culture & Environment',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 workplace culture terms',
        'Discuss organizational environments',
        'Use office vocabulary'
      ],
      coreExplanation: `Workplace culture and environment are important topics for discussing work life. To achieve Band 7+, you need vocabulary that allows you to discuss organizational dynamics and office environments.

This lesson covers workplace culture, organizational environments, and office dynamics. Understanding these concepts helps you discuss work-related topics effectively.`,
      examples: [
        { sentence: 'Corporate culture shapes employee behavior.', explanation: '"Corporate culture" is the values and practices of an organization.' },
        { sentence: 'Work-life balance affects employee wellbeing.', explanation: '"Work-life balance" is managing work and personal life.' },
        { sentence: 'Remote work has become more common.', explanation: '"Remote work" is working from outside the office.' },
        { sentence: 'Workplace diversity includes various backgrounds.', explanation: '"Workplace diversity" is variety in employee characteristics.' },
        { sentence: 'Employee engagement measures commitment.', explanation: '"Employee engagement" is worker involvement and enthusiasm.' },
        { sentence: 'Organizational hierarchy defines reporting structures.', explanation: '"Organizational hierarchy" is the chain of command.' },
        { sentence: 'Workplace harassment is unacceptable behavior.', explanation: '"Workplace harassment" is unwanted conduct at work.' },
        { sentence: 'Team dynamics affect collaboration.', explanation: '"Team dynamics" are interactions within groups.' },
        { sentence: 'Open-plan offices encourage interaction.', explanation: '"Open-plan offices" are workspaces without walls.' },
        { sentence: 'Flexible working allows schedule adjustments.', explanation: '"Flexible working" is adaptable work arrangements.' },
        { sentence: 'Performance reviews evaluate employee work.', explanation: '"Performance reviews" are formal assessments.' },
        { sentence: 'Workplace wellness programs support health.', explanation: '"Workplace wellness" is health promotion at work.' },
        { sentence: 'Organizational values guide company behavior.', explanation: '"Organizational values" are company principles.' },
        { sentence: 'Workplace conflict requires resolution.', explanation: '"Workplace conflict" is disagreement at work.' },
        { sentence: 'Employee retention keeps workers at companies.', explanation: '"Employee retention" is keeping employees.' }
      ],
      commonMistakes: [
        { mistake: 'My workplace is bad.', correction: 'My workplace has challenges including [specific issues] that affect employee satisfaction.', explanation: 'Be specific about workplace issues.' },
        { mistake: 'Remote work is better than office work.', correction: 'Remote and office work each have advantages and disadvantages depending on individual and organizational needs.', explanation: 'Present balanced views on work arrangements.' },
        { mistake: 'Hierarchy is outdated.', correction: 'Organizational structures vary, with different approaches suited to different contexts and industries.', explanation: 'Acknowledge diverse organizational models.' }
      ],
      miniPractice: [
        { question: 'Corporate _____ shapes employee behavior.', type: 'fill-blank' },
        { question: 'Which term describes working from outside the office?', options: ['remote work', 'telecommuting', 'working from home', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "My job is stressful."', type: 'rewrite' },
        { question: 'Work-life _____ affects employee wellbeing.', type: 'fill-blank' }
      ],
      answerKey: [
        'culture',
        'all of the above',
        'My role involves significant demands that can affect work-life balance.',
        'balance'
      ],
      quickRecap: 'Key terms: "corporate culture", "work-life balance", "remote work", "workplace diversity", "employee engagement", "organizational hierarchy", "team dynamics", "flexible working", "performance reviews", "employee retention". Use workplace vocabulary accurately!',
      collocations: [
        'corporate culture', 'work-life balance', 'remote work', 'workplace diversity',
        'employee engagement', 'organizational hierarchy', 'workplace harassment', 'team dynamics',
        'open-plan offices', 'flexible working', 'performance reviews', 'employee retention'
      ],
      synonyms: [
        { word: 'workplace', synonyms: ['office', 'work environment', 'organization', 'company'] },
        { word: 'colleague', synonyms: ['coworker', 'team member', 'associate', 'peer'] },
        { word: 'boss', synonyms: ['manager', 'supervisor', 'superior', 'line manager'] }
      ],
      speakingLines: [
        'Corporate culture significantly influences employee satisfaction and retention.',
        'Work-life balance has become increasingly important for employee wellbeing.',
        'Remote work offers flexibility but requires effective communication and self-discipline.'
      ]
    }
  },
  {
    id: 'vocab-work-5',
    title: 'Career Development & Advancement',
    slug: 'career-development-advancement',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Work',
    description: 'Vocabulary for discussing career progression, professional growth, and advancement.',
    is_premium: true,
    is_published: true,
    view_count: 820,
    created_at: '2024-08-25T10:00:00Z',
    updated_at: '2024-08-25T10:00:00Z',
    content: {
      title: 'Career Development & Advancement',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 career development terms',
        'Discuss professional advancement',
        'Use career vocabulary'
      ],
      coreExplanation: `Career development and advancement are important topics for discussing professional growth. To achieve Band 7+, you need vocabulary that allows you to discuss career progression and professional development.

This lesson covers career development, advancement, and professional growth. Understanding these concepts helps you discuss career-related topics effectively.`,
      examples: [
        { sentence: 'Career progression involves advancing through positions.', explanation: '"Career progression" is moving up in one\'s career.' },
        { sentence: 'Promotions recognize employee contributions.', explanation: '"Promotions" are advancements to higher positions.' },
        { sentence: 'Mentorship guides professional development.', explanation: '"Mentorship" is guidance from experienced professionals.' },
        { sentence: 'Career goals provide direction for development.', explanation: '"Career goals" are professional objectives.' },
        { sentence: 'Skill development enhances employability.', explanation: '"Skill development" is improving abilities.' },
        { sentence: 'Career transitions involve changing fields.', explanation: '"Career transitions" are moves between careers.' },
        { sentence: 'Professional certifications validate expertise.', explanation: '"Professional certifications" are credentials demonstrating competence.' },
        { sentence: 'Career plateaus occur when advancement stalls.', explanation: '"Career plateaus" are periods without advancement.' },
        { sentence: 'Continuous learning maintains relevance.', explanation: '"Continuous learning" is ongoing education.' },
        { sentence: 'Career counseling provides guidance.', explanation: '"Career counseling" is professional career advice.' },
        { sentence: 'Upskilling adds new capabilities.', explanation: '"Upskilling" is learning new skills.' },
        { sentence: 'Career paths outline progression routes.', explanation: '"Career paths" are typical advancement trajectories.' },
        { sentence: 'Professional networks support advancement.', explanation: '"Professional networks" are career connections.' },
        { sentence: 'Career satisfaction affects overall wellbeing.', explanation: '"Career satisfaction" is contentment with one\'s career.' },
        { sentence: 'Lateral moves provide new experiences.', explanation: '"Lateral moves" are transfers at the same level.' }
      ],
      commonMistakes: [
        { mistake: 'I want to be promoted.', correction: 'I am seeking opportunities for career advancement and increased responsibility.', explanation: 'Use professional advancement language.' },
        { mistake: 'My career is stuck.', correction: 'I am experiencing a career plateau and exploring options for professional growth.', explanation: 'Describe career challenges professionally.' },
        { mistake: 'I need to change jobs.', correction: 'I am considering a career transition to align with my evolving professional goals.', explanation: 'Frame career changes positively.' }
      ],
      miniPractice: [
        { question: 'Career _____ involves advancing through positions.', type: 'fill-blank' },
        { question: 'Which term describes guidance from experienced professionals?', options: ['mentorship', 'coaching', 'advising', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I want a better job."', type: 'rewrite' },
        { question: '_____ recognize employee contributions.', type: 'fill-blank' }
      ],
      answerKey: [
        'progression',
        'all of the above',
        'I am seeking career advancement opportunities that align with my professional goals.',
        'Promotions'
      ],
      quickRecap: 'Key terms: "career progression", "promotions", "mentorship", "career goals", "skill development", "career transitions", "professional certifications", "continuous learning", "upskilling", "career satisfaction". Use career development vocabulary!',
      collocations: [
        'career progression', 'promotions', 'mentorship', 'career goals',
        'skill development', 'career transitions', 'professional certifications', 'career plateaus',
        'continuous learning', 'career counseling', 'upskilling', 'career paths'
      ],
      synonyms: [
        { word: 'advance', synonyms: ['progress', 'move up', 'climb', 'rise'] },
        { word: 'develop', synonyms: ['grow', 'improve', 'enhance', 'build'] },
        { word: 'career', synonyms: ['profession', 'occupation', 'vocation', 'field'] }
      ],
      speakingLines: [
        'Career progression requires both skill development and strategic networking.',
        'Mentorship can accelerate professional development and provide valuable guidance.',
        'Continuous learning is essential for maintaining relevance in evolving industries.'
      ]
    }
  },
  {
    id: 'vocab-work-6',
    title: 'Future of Work & Automation',
    slug: 'future-of-work-automation',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Work',
    description: 'Advanced vocabulary for discussing workplace automation, AI impact, and future employment trends.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-08-28T10:00:00Z',
    updated_at: '2024-08-28T10:00:00Z',
    content: {
      title: 'Future of Work & Automation',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 future of work terms',
        'Discuss automation and AI impact',
        'Use technology-work vocabulary'
      ],
      coreExplanation: `The future of work and automation are important topics for discussing employment trends. To achieve Band 8+, you need vocabulary that allows you to discuss how technology is changing work.

This lesson covers automation, AI impact, and future employment trends. Understanding these concepts helps you discuss the evolving nature of work.`,
      examples: [
        { sentence: 'Automation replaces repetitive tasks with machines.', explanation: '"Automation" is using technology to perform tasks.' },
        { sentence: 'Artificial intelligence transforms many industries.', explanation: '"Artificial intelligence" is machine intelligence.' },
        { sentence: 'Job displacement occurs when technology replaces workers.', explanation: '"Job displacement" is losing jobs to technology.' },
        { sentence: 'Reskilling prepares workers for new roles.', explanation: '"Reskilling" is learning new skills for different jobs.' },
        { sentence: 'The gig economy offers flexible work arrangements.', explanation: '"Gig economy" is short-term, freelance work.' },
        { sentence: 'Digital transformation changes business operations.', explanation: '"Digital transformation" is adopting digital technology.' },
        { sentence: 'Human-machine collaboration combines strengths.', explanation: '"Human-machine collaboration" is people and technology working together.' },
        { sentence: 'Technological unemployment results from automation.', explanation: '"Technological unemployment" is joblessness from technology.' },
        { sentence: 'Future-proof skills remain valuable despite change.', explanation: '"Future-proof skills" are abilities that stay relevant.' },
        { sentence: 'Remote collaboration tools enable distributed work.', explanation: '"Remote collaboration tools" are technology for working together remotely.' },
        { sentence: 'Algorithmic management uses software to supervise.', explanation: '"Algorithmic management" is computer-based supervision.' },
        { sentence: 'Platform work connects workers with tasks online.', explanation: '"Platform work" is work arranged through digital platforms.' },
        { sentence: 'Workforce transformation adapts to technological change.', explanation: '"Workforce transformation" is changing how people work.' },
        { sentence: 'Universal basic income addresses automation concerns.', explanation: '"Universal basic income" is guaranteed income for all.' },
        { sentence: 'Lifelong learning adapts to changing requirements.', explanation: '"Lifelong learning" is continuous education throughout life.' }
      ],
      commonMistakes: [
        { mistake: 'Robots will take all jobs.', correction: 'Automation will transform many jobs while creating new roles, though the transition requires adaptation.', explanation: 'Present nuanced views on automation.' },
        { mistake: 'AI is smarter than humans.', correction: 'AI excels at specific tasks but lacks human capabilities like creativity, empathy, and general reasoning.', explanation: 'Distinguish AI capabilities.' },
        { mistake: 'Technology always improves work.', correction: 'Technological change brings both benefits and challenges for workers and organizations.', explanation: 'Acknowledge technology trade-offs.' }
      ],
      miniPractice: [
        { question: '_____ replaces repetitive tasks with machines.', type: 'fill-blank' },
        { question: 'Which term describes learning new skills for different jobs?', options: ['reskilling', 'upskilling', 'retraining', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Machines will replace all workers."', type: 'rewrite' },
        { question: 'Job _____ occurs when technology replaces workers.', type: 'fill-blank' }
      ],
      answerKey: [
        'Automation',
        'all of the above',
        'Automation will transform many jobs, requiring workers to adapt through reskilling.',
        'displacement'
      ],
      quickRecap: 'Key terms: "automation", "artificial intelligence", "job displacement", "reskilling", "gig economy", "digital transformation", "human-machine collaboration", "future-proof skills", "platform work", "lifelong learning". Use future of work vocabulary!',
      collocations: [
        'automation', 'artificial intelligence', 'job displacement', 'reskilling',
        'gig economy', 'digital transformation', 'human-machine collaboration', 'technological unemployment',
        'future-proof skills', 'remote collaboration', 'platform work', 'lifelong learning'
      ],
      synonyms: [
        { word: 'automate', synonyms: ['mechanize', 'computerize', 'digitize', 'streamline'] },
        { word: 'replace', synonyms: ['displace', 'substitute', 'supersede', 'supplant'] },
        { word: 'adapt', synonyms: ['adjust', 'evolve', 'transform', 'transition'] }
      ],
      speakingLines: [
        'Automation will transform many jobs, requiring workers to develop new skills.',
        'Human-machine collaboration can enhance productivity while preserving human roles.',
        'Lifelong learning is essential for adapting to the changing nature of work.'
      ]
    }
  },
  // ============================================
  // BATCH 11: Travel & Tourism (4 lessons)
  // ============================================
  {
    id: 'vocab-travel-2',
    title: 'Tourism Industry & Hospitality',
    slug: 'tourism-industry-hospitality',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Travel',
    description: 'Vocabulary for discussing the tourism industry, hospitality services, and travel business.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-09-01T10:00:00Z',
    updated_at: '2024-09-01T10:00:00Z',
    content: {
      title: 'Tourism Industry & Hospitality',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 tourism industry terms',
        'Discuss hospitality services',
        'Use travel business vocabulary'
      ],
      coreExplanation: `Tourism and hospitality are common IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss the travel industry and its impacts.

This lesson covers tourism industry, hospitality services, and travel business. Understanding these concepts helps you discuss travel-related topics effectively.`,
      examples: [
        { sentence: 'The tourism industry contributes significantly to many economies.', explanation: '"Tourism industry" is the business of travel and hospitality.' },
        { sentence: 'Hospitality services include accommodation and dining.', explanation: '"Hospitality services" are services for travelers.' },
        { sentence: 'Tourist destinations attract visitors from around the world.', explanation: '"Tourist destinations" are places people visit.' },
        { sentence: 'Sustainable tourism minimizes environmental impact.', explanation: '"Sustainable tourism" is environmentally responsible travel.' },
        { sentence: 'Ecotourism focuses on natural environments.', explanation: '"Ecotourism" is nature-based tourism.' },
        { sentence: 'Cultural tourism explores heritage and traditions.', explanation: '"Cultural tourism" is travel for cultural experiences.' },
        { sentence: 'Mass tourism involves large numbers of visitors.', explanation: '"Mass tourism" is high-volume tourism.' },
        { sentence: 'Tourism revenue supports local economies.', explanation: '"Tourism revenue" is income from tourism.' },
        { sentence: 'Travel agencies arrange trips for customers.', explanation: '"Travel agencies" are businesses organizing travel.' },
        { sentence: 'Accommodation options range from hotels to hostels.', explanation: '"Accommodation" is places to stay.' },
        { sentence: 'Tourist attractions draw visitors to destinations.', explanation: '"Tourist attractions" are places of interest.' },
        { sentence: 'Overtourism damages popular destinations.', explanation: '"Overtourism" is excessive tourism.' },
        { sentence: 'Heritage sites preserve historical significance.', explanation: '"Heritage sites" are historically important places.' },
        { sentence: 'Tourism infrastructure includes transportation and facilities.', explanation: '"Tourism infrastructure" is facilities supporting tourism.' },
        { sentence: 'Seasonal tourism fluctuates throughout the year.', explanation: '"Seasonal tourism" varies by time of year.' }
      ],
      commonMistakes: [
        { mistake: 'Tourism is always good for local communities.', correction: 'Tourism brings both benefits and challenges, including economic opportunities and potential environmental or cultural impacts.', explanation: 'Present balanced views on tourism.' },
        { mistake: 'All tourists are the same.', correction: 'Tourism encompasses diverse types including cultural, adventure, eco, and mass tourism, each with different impacts.', explanation: 'Distinguish tourism types.' },
        { mistake: 'More tourists is always better.', correction: 'Overtourism can damage destinations, requiring sustainable approaches to visitor management.', explanation: 'Discuss tourism sustainability.' }
      ],
      miniPractice: [
        { question: 'The tourism _____ contributes significantly to many economies.', type: 'fill-blank' },
        { question: 'Which term describes environmentally responsible travel?', options: ['sustainable tourism', 'ecotourism', 'green tourism', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Too many tourists ruin places."', type: 'rewrite' },
        { question: '_____ services include accommodation and dining.', type: 'fill-blank' }
      ],
      answerKey: [
        'industry',
        'all of the above',
        'Overtourism can negatively impact popular destinations, requiring sustainable visitor management.',
        'Hospitality'
      ],
      quickRecap: 'Key terms: "tourism industry", "hospitality services", "tourist destinations", "sustainable tourism", "ecotourism", "cultural tourism", "mass tourism", "tourism revenue", "overtourism", "heritage sites". Use tourism vocabulary accurately!',
      collocations: [
        'tourism industry', 'hospitality services', 'tourist destinations', 'sustainable tourism',
        'ecotourism', 'cultural tourism', 'mass tourism', 'tourism revenue',
        'travel agencies', 'accommodation options', 'tourist attractions', 'heritage sites'
      ],
      synonyms: [
        { word: 'tourist', synonyms: ['visitor', 'traveler', 'vacationer', 'holidaymaker'] },
        { word: 'trip', synonyms: ['journey', 'vacation', 'holiday', 'excursion'] },
        { word: 'visit', synonyms: ['tour', 'explore', 'see', 'experience'] }
      ],
      speakingLines: [
        'The tourism industry is a major contributor to many national economies.',
        'Sustainable tourism aims to minimize environmental and cultural impacts.',
        'Overtourism has become a significant challenge for popular destinations.'
      ]
    }
  },
  {
    id: 'vocab-travel-3',
    title: 'Transportation & Getting Around',
    slug: 'transportation-getting-around',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Travel',
    description: 'Vocabulary for discussing transportation modes, travel logistics, and getting around.',
    is_premium: false,
    is_published: true,
    view_count: 920,
    created_at: '2024-09-05T10:00:00Z',
    updated_at: '2024-09-05T10:00:00Z',
    content: {
      title: 'Transportation & Getting Around',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 transportation terms',
        'Discuss travel logistics',
        'Use transport vocabulary'
      ],
      coreExplanation: `Transportation is essential for discussing travel and urban life. To achieve Band 7+, you need vocabulary that allows you to discuss various modes of transport and travel logistics.

This lesson covers transportation modes, travel logistics, and getting around. Understanding these concepts helps you discuss travel and mobility effectively.`,
      examples: [
        { sentence: 'Public transportation includes buses, trains, and metros.', explanation: '"Public transportation" is shared transport services.' },
        { sentence: 'Air travel has made international journeys accessible.', explanation: '"Air travel" is traveling by airplane.' },
        { sentence: 'Commuting involves regular travel to work.', explanation: '"Commuting" is traveling between home and work.' },
        { sentence: 'Traffic congestion affects urban mobility.', explanation: '"Traffic congestion" is crowded roads.' },
        { sentence: 'Sustainable transport reduces environmental impact.', explanation: '"Sustainable transport" is eco-friendly transportation.' },
        { sentence: 'High-speed rail connects major cities efficiently.', explanation: '"High-speed rail" is fast train services.' },
        { sentence: 'Ride-sharing services offer flexible transportation.', explanation: '"Ride-sharing" is shared vehicle services.' },
        { sentence: 'Cycling infrastructure supports bike travel.', explanation: '"Cycling infrastructure" is facilities for bicycles.' },
        { sentence: 'Flight delays disrupt travel plans.', explanation: '"Flight delays" are late departures.' },
        { sentence: 'Border crossings require documentation.', explanation: '"Border crossings" are passages between countries.' },
        { sentence: 'Luggage allowances vary by airline.', explanation: '"Luggage allowances" are baggage limits.' },
        { sentence: 'Transit hubs connect different transport modes.', explanation: '"Transit hubs" are transportation connection points.' },
        { sentence: 'Electric vehicles reduce transport emissions.', explanation: '"Electric vehicles" are battery-powered cars.' },
        { sentence: 'Navigation apps guide travelers.', explanation: '"Navigation apps" are direction-finding software.' },
        { sentence: 'Travel itineraries plan trip details.', explanation: '"Travel itineraries" are trip schedules.' }
      ],
      commonMistakes: [
        { mistake: 'Cars are the best way to travel.', correction: 'Different transportation modes suit different contexts, with trade-offs between convenience, cost, and environmental impact.', explanation: 'Compare transport modes objectively.' },
        { mistake: 'Public transport is inconvenient.', correction: 'Public transportation effectiveness varies by location, with well-designed systems offering efficient alternatives to private vehicles.', explanation: 'Acknowledge transport system variation.' },
        { mistake: 'Flying is always faster.', correction: 'For shorter distances, high-speed rail or driving may be faster when accounting for airport procedures.', explanation: 'Consider total travel time.' }
      ],
      miniPractice: [
        { question: 'Public _____ includes buses, trains, and metros.', type: 'fill-blank' },
        { question: 'Which term describes crowded roads?', options: ['traffic congestion', 'traffic jam', 'gridlock', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I take the bus to work every day."', type: 'rewrite' },
        { question: 'High-speed _____ connects major cities efficiently.', type: 'fill-blank' }
      ],
      answerKey: [
        'transportation',
        'all of the above',
        'I commute to work daily using public transportation.',
        'rail'
      ],
      quickRecap: 'Key terms: "public transportation", "air travel", "commuting", "traffic congestion", "sustainable transport", "high-speed rail", "ride-sharing", "cycling infrastructure", "transit hubs", "electric vehicles". Use transport vocabulary accurately!',
      collocations: [
        'public transportation', 'air travel', 'commuting', 'traffic congestion',
        'sustainable transport', 'high-speed rail', 'ride-sharing', 'cycling infrastructure',
        'flight delays', 'border crossings', 'transit hubs', 'electric vehicles'
      ],
      synonyms: [
        { word: 'transport', synonyms: ['transportation', 'travel', 'transit', 'conveyance'] },
        { word: 'car', synonyms: ['vehicle', 'automobile', 'motor vehicle', 'private transport'] },
        { word: 'travel', synonyms: ['journey', 'commute', 'transit', 'move'] }
      ],
      speakingLines: [
        'Public transportation is essential for sustainable urban mobility.',
        'Traffic congestion is a major challenge in growing cities.',
        'Sustainable transport options are increasingly important for reducing emissions.'
      ]
    }
  },
  {
    id: 'vocab-travel-4',
    title: 'Travel Experiences & Adventures',
    slug: 'travel-experiences-adventures',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Travel',
    description: 'Vocabulary for discussing travel experiences, adventures, and memorable journeys.',
    is_premium: true,
    is_published: true,
    view_count: 850,
    created_at: '2024-09-08T10:00:00Z',
    updated_at: '2024-09-08T10:00:00Z',
    content: {
      title: 'Travel Experiences & Adventures',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 travel experience terms',
        'Discuss adventures and journeys',
        'Use experiential vocabulary'
      ],
      coreExplanation: `Travel experiences are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to describe journeys and adventures vividly.

This lesson covers travel experiences, adventures, and memorable journeys. Understanding these concepts helps you discuss personal travel stories effectively.`,
      examples: [
        { sentence: 'Adventure travel involves exciting and challenging activities.', explanation: '"Adventure travel" is travel for thrilling experiences.' },
        { sentence: 'Backpacking offers budget-friendly exploration.', explanation: '"Backpacking" is low-cost independent travel.' },
        { sentence: 'Cultural immersion deepens travel experiences.', explanation: '"Cultural immersion" is engaging deeply with local culture.' },
        { sentence: 'Scenic routes offer beautiful landscapes.', explanation: '"Scenic routes" are roads with attractive views.' },
        { sentence: 'Off-the-beaten-path destinations avoid crowds.', explanation: '"Off-the-beaten-path" means less visited places.' },
        { sentence: 'Travel photography captures memorable moments.', explanation: '"Travel photography" is taking pictures while traveling.' },
        { sentence: 'Local cuisine enhances travel experiences.', explanation: '"Local cuisine" is regional food.' },
        { sentence: 'Guided tours provide expert information.', explanation: '"Guided tours" are tours led by knowledgeable guides.' },
        { sentence: 'Solo travel offers independence and self-discovery.', explanation: '"Solo travel" is traveling alone.' },
        { sentence: 'Travel companions share experiences.', explanation: '"Travel companions" are people you travel with.' },
        { sentence: 'Bucket list destinations are must-visit places.', explanation: '"Bucket list" is a list of desired experiences.' },
        { sentence: 'Travel memoirs document journeys.', explanation: '"Travel memoirs" are written accounts of travels.' },
        { sentence: 'Wanderlust drives the desire to travel.', explanation: '"Wanderlust" is a strong desire to travel.' },
        { sentence: 'Jet lag affects travelers crossing time zones.', explanation: '"Jet lag" is fatigue from time zone changes.' },
        { sentence: 'Travel insurance protects against unexpected events.', explanation: '"Travel insurance" is coverage for travel problems.' }
      ],
      commonMistakes: [
        { mistake: 'I went to many places.', correction: 'I explored diverse destinations / experienced various cultures during my travels.', explanation: 'Use more descriptive travel language.' },
        { mistake: 'The trip was nice.', correction: 'The journey was enriching / memorable / transformative.', explanation: 'Use more specific descriptive vocabulary.' },
        { mistake: 'I took pictures.', correction: 'I captured memorable moments through travel photography.', explanation: 'Elevate simple descriptions.' }
      ],
      miniPractice: [
        { question: '_____ travel involves exciting and challenging activities.', type: 'fill-blank' },
        { question: 'Which term describes a strong desire to travel?', options: ['wanderlust', 'travel bug', 'itchy feet', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I visited a beautiful place."', type: 'rewrite' },
        { question: 'Cultural _____ deepens travel experiences.', type: 'fill-blank' }
      ],
      answerKey: [
        'Adventure',
        'all of the above',
        'I explored a breathtaking destination with stunning natural scenery.',
        'immersion'
      ],
      quickRecap: 'Key terms: "adventure travel", "backpacking", "cultural immersion", "scenic routes", "off-the-beaten-path", "local cuisine", "guided tours", "solo travel", "bucket list", "wanderlust". Use vivid travel vocabulary!',
      collocations: [
        'adventure travel', 'backpacking', 'cultural immersion', 'scenic routes',
        'off-the-beaten-path', 'travel photography', 'local cuisine', 'guided tours',
        'solo travel', 'travel companions', 'bucket list', 'wanderlust'
      ],
      synonyms: [
        { word: 'beautiful', synonyms: ['stunning', 'breathtaking', 'picturesque', 'spectacular'] },
        { word: 'interesting', synonyms: ['fascinating', 'captivating', 'intriguing', 'compelling'] },
        { word: 'fun', synonyms: ['enjoyable', 'exciting', 'thrilling', 'exhilarating'] }
      ],
      speakingLines: [
        'Cultural immersion transforms travel from sightseeing into meaningful experience.',
        'Adventure travel offers opportunities for personal growth and challenge.',
        'Off-the-beaten-path destinations often provide more authentic cultural experiences.'
      ]
    }
  },
  {
    id: 'vocab-travel-5',
    title: 'Global Travel & Cross-Cultural Communication',
    slug: 'global-travel-cross-cultural',
    type: 'vocabulary',
    level: 'advanced',
    topic: 'Travel',
    description: 'Advanced vocabulary for discussing international travel, cultural differences, and global communication.',
    is_premium: true,
    is_published: true,
    view_count: 680,
    created_at: '2024-09-12T10:00:00Z',
    updated_at: '2024-09-12T10:00:00Z',
    content: {
      title: 'Global Travel & Cross-Cultural Communication',
      targetLevel: 'Band 7.0 - 8.5',
      whatYouWillLearn: [
        'Master 25 cross-cultural terms',
        'Discuss international travel',
        'Use cultural communication vocabulary'
      ],
      coreExplanation: `Cross-cultural communication is important for discussing international travel. To achieve Band 8+, you need vocabulary that allows you to discuss cultural differences and global communication.

This lesson covers international travel, cultural differences, and cross-cultural communication. Understanding these concepts helps you discuss global travel experiences effectively.`,
      examples: [
        { sentence: 'Cross-cultural communication bridges cultural differences.', explanation: '"Cross-cultural communication" is interaction between cultures.' },
        { sentence: 'Cultural sensitivity respects different customs.', explanation: '"Cultural sensitivity" is awareness of cultural differences.' },
        { sentence: 'Language barriers can complicate travel.', explanation: '"Language barriers" are communication difficulties due to language.' },
        { sentence: 'Cultural etiquette varies between countries.', explanation: '"Cultural etiquette" is appropriate behavior in different cultures.' },
        { sentence: 'Global citizenship embraces international perspectives.', explanation: '"Global citizenship" is identifying with the world community.' },
        { sentence: 'Cultural stereotypes oversimplify complex societies.', explanation: '"Cultural stereotypes" are oversimplified cultural beliefs.' },
        { sentence: 'Intercultural competence enables effective communication.', explanation: '"Intercultural competence" is ability to communicate across cultures.' },
        { sentence: 'Cultural shock affects travelers in unfamiliar environments.', explanation: '"Cultural shock" is disorientation in new cultures.' },
        { sentence: 'Local customs should be respected by visitors.', explanation: '"Local customs" are traditional practices.' },
        { sentence: 'Cultural exchange benefits both visitors and hosts.', explanation: '"Cultural exchange" is sharing between cultures.' },
        { sentence: 'Travel broadens perspectives and understanding.', explanation: '"Broadens perspectives" means expanding viewpoints.' },
        { sentence: 'Cultural adaptation involves adjusting to new environments.', explanation: '"Cultural adaptation" is adjusting to different cultures.' },
        { sentence: 'International etiquette guides appropriate behavior.', explanation: '"International etiquette" is proper conduct globally.' },
        { sentence: 'Cultural awareness prevents misunderstandings.', explanation: '"Cultural awareness" is understanding cultural differences.' },
        { sentence: 'Respectful tourism honors local traditions.', explanation: '"Respectful tourism" is culturally sensitive travel.' }
      ],
      commonMistakes: [
        { mistake: 'All people from [country] are the same.', correction: 'Cultural generalizations oversimplify diverse societies with significant internal variation.', explanation: 'Avoid cultural stereotypes.' },
        { mistake: 'My culture is normal; others are strange.', correction: 'Cultural practices vary globally, with different approaches to social norms and customs.', explanation: 'Recognize cultural relativity.' },
        { mistake: 'Everyone should speak English.', correction: 'Language diversity is valuable, and travelers benefit from learning basic local phrases.', explanation: 'Respect linguistic diversity.' }
      ],
      miniPractice: [
        { question: 'Cross-cultural _____ bridges cultural differences.', type: 'fill-blank' },
        { question: 'Which term describes disorientation in new cultures?', options: ['cultural shock', 'culture shock', 'cultural disorientation', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Their customs are weird."', type: 'rewrite' },
        { question: 'Cultural _____ respects different customs.', type: 'fill-blank' }
      ],
      answerKey: [
        'communication',
        'all of the above',
        'Their cultural practices differ from what I am accustomed to.',
        'sensitivity'
      ],
      quickRecap: 'Key terms: "cross-cultural communication", "cultural sensitivity", "language barriers", "cultural etiquette", "global citizenship", "intercultural competence", "cultural shock", "cultural exchange", "cultural adaptation", "cultural awareness". Use respectful cross-cultural vocabulary!',
      collocations: [
        'cross-cultural communication', 'cultural sensitivity', 'language barriers', 'cultural etiquette',
        'global citizenship', 'cultural stereotypes', 'intercultural competence', 'cultural shock',
        'local customs', 'cultural exchange', 'cultural adaptation', 'cultural awareness'
      ],
      synonyms: [
        { word: 'different', synonyms: ['diverse', 'varied', 'distinct', 'unique'] },
        { word: 'strange', synonyms: ['unfamiliar', 'different', 'foreign', 'novel'] },
        { word: 'respect', synonyms: ['honor', 'appreciate', 'value', 'acknowledge'] }
      ],
      speakingLines: [
        'Cross-cultural communication skills are essential for meaningful international travel.',
        'Cultural sensitivity helps travelers avoid misunderstandings and show respect.',
        'Travel broadens perspectives by exposing us to different ways of life.'
      ]
    }
  },
  // ============================================
  // BATCH 12: Arts & Entertainment (4 lessons)
  // ============================================
  {
    id: 'vocab-arts-2',
    title: 'Visual Arts & Museums',
    slug: 'visual-arts-museums',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Arts',
    description: 'Vocabulary for discussing painting, sculpture, museums, and visual art forms.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-09-15T10:00:00Z',
    updated_at: '2024-09-15T10:00:00Z',
    content: {
      title: 'Visual Arts & Museums',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 visual arts terms',
        'Discuss art and museums',
        'Use artistic vocabulary'
      ],
      coreExplanation: `Visual arts and museums are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss art forms and cultural institutions.

This lesson covers visual arts, museums, and artistic expression. Understanding these concepts helps you discuss art-related topics effectively.`,
      examples: [
        { sentence: 'Contemporary art reflects modern society.', explanation: '"Contemporary art" is art from the present era.' },
        { sentence: 'Art galleries display works for public viewing.', explanation: '"Art galleries" are spaces exhibiting art.' },
        { sentence: 'Abstract art does not represent reality directly.', explanation: '"Abstract art" is non-representational art.' },
        { sentence: 'Art exhibitions showcase collections.', explanation: '"Art exhibitions" are organized displays of art.' },
        { sentence: 'Sculpture creates three-dimensional forms.', explanation: '"Sculpture" is 3D artistic work.' },
        { sentence: 'Art appreciation develops through exposure.', explanation: '"Art appreciation" is understanding and enjoying art.' },
        { sentence: 'Museums preserve cultural heritage.', explanation: '"Museums" are institutions housing collections.' },
        { sentence: 'Artistic expression conveys emotions and ideas.', explanation: '"Artistic expression" is communicating through art.' },
        { sentence: 'Art movements share common characteristics.', explanation: '"Art movements" are styles shared by artists.' },
        { sentence: 'Curators organize museum collections.', explanation: '"Curators" are people managing collections.' },
        { sentence: 'Art criticism analyzes and evaluates works.', explanation: '"Art criticism" is professional art analysis.' },
        { sentence: 'Visual aesthetics concern beauty and appearance.', explanation: '"Visual aesthetics" is the study of visual beauty.' },
        { sentence: 'Art restoration preserves damaged works.', explanation: '"Art restoration" is repairing artworks.' },
        { sentence: 'Installation art creates immersive environments.', explanation: '"Installation art" is art designed for specific spaces.' },
        { sentence: 'Art patronage supports artists financially.', explanation: '"Art patronage" is financial support for artists.' }
      ],
      commonMistakes: [
        { mistake: 'I don\'t understand modern art.', correction: 'Contemporary art often challenges traditional aesthetics, inviting viewers to engage with new perspectives.', explanation: 'Discuss art openly.' },
        { mistake: 'Art is just decoration.', correction: 'Art serves multiple functions including cultural expression, social commentary, and aesthetic experience.', explanation: 'Recognize art\'s diverse purposes.' },
        { mistake: 'Good art is realistic.', correction: 'Artistic value encompasses various styles and approaches, from realism to abstraction.', explanation: 'Acknowledge diverse artistic styles.' }
      ],
      miniPractice: [
        { question: '_____ art reflects modern society.', type: 'fill-blank' },
        { question: 'Which term describes non-representational art?', options: ['abstract art', 'modern art', 'conceptual art', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I saw some nice paintings."', type: 'rewrite' },
        { question: 'Art _____ display works for public viewing.', type: 'fill-blank' }
      ],
      answerKey: [
        'Contemporary',
        'abstract art',
        'I viewed an impressive collection of paintings at the gallery.',
        'galleries'
      ],
      quickRecap: 'Key terms: "contemporary art", "art galleries", "abstract art", "art exhibitions", "sculpture", "art appreciation", "museums", "artistic expression", "art movements", "curators". Use artistic vocabulary accurately!',
      collocations: [
        'contemporary art', 'art galleries', 'abstract art', 'art exhibitions',
        'sculpture', 'art appreciation', 'museums', 'artistic expression',
        'art movements', 'curators', 'art criticism', 'installation art'
      ],
      synonyms: [
        { word: 'art', synonyms: ['artwork', 'piece', 'creation', 'work'] },
        { word: 'beautiful', synonyms: ['aesthetic', 'striking', 'visually appealing', 'captivating'] },
        { word: 'display', synonyms: ['exhibit', 'showcase', 'present', 'feature'] }
      ],
      speakingLines: [
        'Museums play a vital role in preserving and sharing cultural heritage.',
        'Contemporary art often challenges viewers to engage with new perspectives.',
        'Art appreciation develops through exposure to diverse artistic styles and movements.'
      ]
    }
  },
  {
    id: 'vocab-arts-3',
    title: 'Music & Performance',
    slug: 'music-performance',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Arts',
    description: 'Vocabulary for discussing music genres, performances, and the music industry.',
    is_premium: true,
    is_published: true,
    view_count: 880,
    created_at: '2024-09-18T10:00:00Z',
    updated_at: '2024-09-18T10:00:00Z',
    content: {
      title: 'Music & Performance',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 music and performance terms',
        'Discuss music genres and concerts',
        'Use musical vocabulary'
      ],
      coreExplanation: `Music and performance are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss music, concerts, and the music industry.

This lesson covers music genres, performances, and the music industry. Understanding these concepts helps you discuss music-related topics effectively.`,
      examples: [
        { sentence: 'Music genres include classical, jazz, and pop.', explanation: '"Music genres" are categories of music.' },
        { sentence: 'Live performances create unique experiences.', explanation: '"Live performances" are real-time musical events.' },
        { sentence: 'Concert venues host musical events.', explanation: '"Concert venues" are places for performances.' },
        { sentence: 'Musical instruments produce different sounds.', explanation: '"Musical instruments" are devices for making music.' },
        { sentence: 'Composers create original musical works.', explanation: '"Composers" are people who write music.' },
        { sentence: 'Music streaming has transformed consumption.', explanation: '"Music streaming" is online music access.' },
        { sentence: 'Orchestras perform classical compositions.', explanation: '"Orchestras" are large musical ensembles.' },
        { sentence: 'Music festivals attract large audiences.', explanation: '"Music festivals" are multi-day musical events.' },
        { sentence: 'Acoustic performances use non-electric instruments.', explanation: '"Acoustic" means without electronic amplification.' },
        { sentence: 'Music therapy uses music for healing.', explanation: '"Music therapy" is therapeutic use of music.' },
        { sentence: 'Record labels produce and distribute music.', explanation: '"Record labels" are music companies.' },
        { sentence: 'Musical talent develops through practice.', explanation: '"Musical talent" is ability in music.' },
        { sentence: 'Lyrics convey meaning through words.', explanation: '"Lyrics" are the words of songs.' },
        { sentence: 'Music appreciation involves understanding styles.', explanation: '"Music appreciation" is understanding and enjoying music.' },
        { sentence: 'Sound quality affects listening experience.', explanation: '"Sound quality" is audio fidelity.' }
      ],
      commonMistakes: [
        { mistake: 'I like good music.', correction: 'I enjoy various genres including [specific types] / I appreciate music that [specific qualities].', explanation: 'Be specific about musical preferences.' },
        { mistake: 'Classical music is boring.', correction: 'Classical music offers complex compositions that reward attentive listening.', explanation: 'Discuss music genres respectfully.' },
        { mistake: 'Pop music is not real music.', correction: 'Different genres serve different purposes and appeal to different audiences.', explanation: 'Acknowledge diverse musical value.' }
      ],
      miniPractice: [
        { question: 'Music _____ include classical, jazz, and pop.', type: 'fill-blank' },
        { question: 'Which term describes real-time musical events?', options: ['live performances', 'concerts', 'gigs', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I like listening to music."', type: 'rewrite' },
        { question: 'Music _____ has transformed consumption.', type: 'fill-blank' }
      ],
      answerKey: [
        'genres',
        'all of the above',
        'I enjoy listening to various music genres, particularly [specific type].',
        'streaming'
      ],
      quickRecap: 'Key terms: "music genres", "live performances", "concert venues", "musical instruments", "composers", "music streaming", "orchestras", "music festivals", "acoustic", "music therapy". Use musical vocabulary accurately!',
      collocations: [
        'music genres', 'live performances', 'concert venues', 'musical instruments',
        'composers', 'music streaming', 'orchestras', 'music festivals',
        'acoustic performances', 'music therapy', 'record labels', 'music appreciation'
      ],
      synonyms: [
        { word: 'music', synonyms: ['melody', 'tune', 'composition', 'piece'] },
        { word: 'sing', synonyms: ['perform', 'vocalize', 'render', 'interpret'] },
        { word: 'play', synonyms: ['perform', 'execute', 'render', 'interpret'] }
      ],
      speakingLines: [
        'Live performances create unique experiences that recordings cannot replicate.',
        'Music streaming has fundamentally changed how people discover and consume music.',
        'Music appreciation develops through exposure to diverse genres and styles.'
      ]
    }
  },
  {
    id: 'vocab-arts-4',
    title: 'Literature & Writing',
    slug: 'literature-writing',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Arts',
    description: 'Vocabulary for discussing books, literature, and creative writing.',
    is_premium: true,
    is_published: true,
    view_count: 750,
    created_at: '2024-09-22T10:00:00Z',
    updated_at: '2024-09-22T10:00:00Z',
    content: {
      title: 'Literature & Writing',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 literature terms',
        'Discuss books and writing',
        'Use literary vocabulary'
      ],
      coreExplanation: `Literature and writing are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss books, authors, and literary works.

This lesson covers literature, creative writing, and reading. Understanding these concepts helps you discuss literary topics effectively.`,
      examples: [
        { sentence: 'Literary genres include fiction, poetry, and drama.', explanation: '"Literary genres" are categories of literature.' },
        { sentence: 'Novels tell extended fictional stories.', explanation: '"Novels" are long fictional narratives.' },
        { sentence: 'Authors create written works.', explanation: '"Authors" are writers of books.' },
        { sentence: 'Plot development drives narrative forward.', explanation: '"Plot development" is story progression.' },
        { sentence: 'Character development reveals personalities.', explanation: '"Character development" is how characters evolve.' },
        { sentence: 'Literary analysis examines texts critically.', explanation: '"Literary analysis" is critical examination of literature.' },
        { sentence: 'Poetry uses language artistically.', explanation: '"Poetry" is artistic literary expression.' },
        { sentence: 'Bestsellers achieve high sales.', explanation: '"Bestsellers" are popular books.' },
        { sentence: 'Book reviews evaluate literary works.', explanation: '"Book reviews" are assessments of books.' },
        { sentence: 'Creative writing expresses imagination.', explanation: '"Creative writing" is imaginative writing.' },
        { sentence: 'Literary themes explore universal ideas.', explanation: '"Literary themes" are central ideas in works.' },
        { sentence: 'Publishing industry produces books.', explanation: '"Publishing industry" is the book business.' },
        { sentence: 'Reading habits vary by individual.', explanation: '"Reading habits" are patterns of reading.' },
        { sentence: 'Classic literature endures over time.', explanation: '"Classic literature" is enduring literary works.' },
        { sentence: 'Narrative techniques shape storytelling.', explanation: '"Narrative techniques" are storytelling methods.' }
      ],
      commonMistakes: [
        { mistake: 'I don\'t read books.', correction: 'While I don\'t read extensively, I engage with written content through [alternatives like articles, blogs, etc.].', explanation: 'Discuss reading habits constructively.' },
        { mistake: 'The book was good.', correction: 'The novel featured compelling characters / an engaging plot / thought-provoking themes.', explanation: 'Use specific literary vocabulary.' },
        { mistake: 'Old books are boring.', correction: 'Classic literature offers insights into different eras and enduring human themes.', explanation: 'Discuss classics respectfully.' }
      ],
      miniPractice: [
        { question: 'Literary _____ include fiction, poetry, and drama.', type: 'fill-blank' },
        { question: 'Which term describes long fictional narratives?', options: ['novels', 'stories', 'tales', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I read a good book."', type: 'rewrite' },
        { question: 'Plot _____ drives narrative forward.', type: 'fill-blank' }
      ],
      answerKey: [
        'genres',
        'novels',
        'I read an engaging novel with compelling characters and a thought-provoking plot.',
        'development'
      ],
      quickRecap: 'Key terms: "literary genres", "novels", "authors", "plot development", "character development", "literary analysis", "poetry", "bestsellers", "creative writing", "literary themes". Use literary vocabulary accurately!',
      collocations: [
        'literary genres', 'novels', 'authors', 'plot development',
        'character development', 'literary analysis', 'poetry', 'bestsellers',
        'book reviews', 'creative writing', 'literary themes', 'classic literature'
      ],
      synonyms: [
        { word: 'book', synonyms: ['novel', 'work', 'publication', 'volume'] },
        { word: 'write', synonyms: ['compose', 'author', 'pen', 'craft'] },
        { word: 'read', synonyms: ['peruse', 'study', 'engage with', 'consume'] }
      ],
      speakingLines: [
        'Literature offers insights into human experience across different cultures and eras.',
        'Character development is essential for creating engaging and memorable stories.',
        'Reading habits have evolved with digital technology and changing lifestyles.'
      ]
    }
  },
  {
    id: 'vocab-arts-5',
    title: 'Film & Cinema',
    slug: 'film-cinema',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Arts',
    description: 'Vocabulary for discussing movies, filmmaking, and the cinema industry.',
    is_premium: true,
    is_published: true,
    view_count: 920,
    created_at: '2024-09-25T10:00:00Z',
    updated_at: '2024-09-25T10:00:00Z',
    content: {
      title: 'Film & Cinema',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 film and cinema terms',
        'Discuss movies and filmmaking',
        'Use cinematic vocabulary'
      ],
      coreExplanation: `Film and cinema are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss movies, directors, and the film industry.

This lesson covers film, cinema, and the movie industry. Understanding these concepts helps you discuss film-related topics effectively.`,
      examples: [
        { sentence: 'Film genres include drama, comedy, and thriller.', explanation: '"Film genres" are categories of movies.' },
        { sentence: 'Directors guide the creative vision of films.', explanation: '"Directors" are people who direct movies.' },
        { sentence: 'Cinematography creates visual storytelling.', explanation: '"Cinematography" is the art of filming.' },
        { sentence: 'Box office success measures commercial performance.', explanation: '"Box office" is ticket sales revenue.' },
        { sentence: 'Film critics review and analyze movies.', explanation: '"Film critics" are professional movie reviewers.' },
        { sentence: 'Special effects enhance visual experiences.', explanation: '"Special effects" are visual or audio enhancements.' },
        { sentence: 'Screenplays provide the written basis for films.', explanation: '"Screenplays" are scripts for movies.' },
        { sentence: 'Film festivals showcase new works.', explanation: '"Film festivals" are events featuring movies.' },
        { sentence: 'Acting performances bring characters to life.', explanation: '"Acting performances" are actors\' portrayals.' },
        { sentence: 'Film soundtracks enhance emotional impact.', explanation: '"Soundtracks" are music accompanying films.' },
        { sentence: 'Documentary films present factual content.', explanation: '"Documentary films" are non-fiction movies.' },
        { sentence: 'Film production involves many stages.', explanation: '"Film production" is the process of making movies.' },
        { sentence: 'Movie theaters provide communal viewing.', explanation: '"Movie theaters" are cinemas.' },
        { sentence: 'Film adaptations transform books into movies.', explanation: '"Film adaptations" are movies based on other works.' },
        { sentence: 'Independent films operate outside major studios.', explanation: '"Independent films" are non-studio productions.' }
      ],
      commonMistakes: [
        { mistake: 'The movie was good.', correction: 'The film featured compelling performances / stunning cinematography / an engaging narrative.', explanation: 'Use specific film vocabulary.' },
        { mistake: 'I like action movies.', correction: 'I enjoy action films for their dynamic pacing and visual spectacle.', explanation: 'Explain preferences with detail.' },
        { mistake: 'Old movies are boring.', correction: 'Classic films offer insights into different eras of filmmaking and storytelling.', explanation: 'Discuss film history respectfully.' }
      ],
      miniPractice: [
        { question: 'Film _____ include drama, comedy, and thriller.', type: 'fill-blank' },
        { question: 'Which term describes the art of filming?', options: ['cinematography', 'photography', 'videography', 'filmography'], type: 'multiple-choice' },
        { question: 'Rewrite: "I watched a good movie."', type: 'rewrite' },
        { question: '_____ guide the creative vision of films.', type: 'fill-blank' }
      ],
      answerKey: [
        'genres',
        'cinematography',
        'I viewed an engaging film with compelling performances and stunning cinematography.',
        'Directors'
      ],
      quickRecap: 'Key terms: "film genres", "directors", "cinematography", "box office", "film critics", "special effects", "screenplays", "film festivals", "soundtracks", "documentary films". Use cinematic vocabulary accurately!',
      collocations: [
        'film genres', 'directors', 'cinematography', 'box office',
        'film critics', 'special effects', 'screenplays', 'film festivals',
        'acting performances', 'soundtracks', 'documentary films', 'independent films'
      ],
      synonyms: [
        { word: 'movie', synonyms: ['film', 'picture', 'motion picture', 'feature'] },
        { word: 'watch', synonyms: ['view', 'see', 'screen', 'catch'] },
        { word: 'actor', synonyms: ['performer', 'star', 'lead', 'cast member'] }
      ],
      speakingLines: [
        'Cinematography is essential for creating the visual language of a film.',
        'Film festivals provide platforms for independent and international cinema.',
        'Documentary films offer powerful ways to explore real-world issues.'
      ]
    }
  },
  // ============================================
  // BATCH 13: Sports & Recreation (4 lessons)
  // ============================================
  {
    id: 'vocab-sports-2',
    title: 'Team Sports & Competition',
    slug: 'team-sports-competition',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Sports',
    description: 'Vocabulary for discussing team sports, competitions, and athletic events.',
    is_premium: true,
    is_published: true,
    view_count: 850,
    created_at: '2024-09-28T10:00:00Z',
    updated_at: '2024-09-28T10:00:00Z',
    content: {
      title: 'Team Sports & Competition',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 team sports terms',
        'Discuss competitions and events',
        'Use sports vocabulary'
      ],
      coreExplanation: `Team sports and competition are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss sports events and athletic competition.

This lesson covers team sports, competitions, and athletic events. Understanding these concepts helps you discuss sports-related topics effectively.`,
      examples: [
        { sentence: 'Team sports require collaboration and coordination.', explanation: '"Team sports" are sports played by groups.' },
        { sentence: 'Athletic competitions test physical abilities.', explanation: '"Athletic competitions" are sporting contests.' },
        { sentence: 'Professional athletes train intensively.', explanation: '"Professional athletes" are paid sports players.' },
        { sentence: 'Sports leagues organize competitive seasons.', explanation: '"Sports leagues" are organized competition systems.' },
        { sentence: 'Championship tournaments determine winners.', explanation: '"Championship tournaments" are competitions for titles.' },
        { sentence: 'Teamwork is essential for success.', explanation: '"Teamwork" is collaborative effort.' },
        { sentence: 'Coaching develops athletic skills.', explanation: '"Coaching" is training and guidance.' },
        { sentence: 'Sports fans support their teams.', explanation: '"Sports fans" are enthusiastic supporters.' },
        { sentence: 'Athletic performance depends on training.', explanation: '"Athletic performance" is sports achievement.' },
        { sentence: 'Sports venues host competitions.', explanation: '"Sports venues" are places for sporting events.' },
        { sentence: 'Sportsmanship involves fair play.', explanation: '"Sportsmanship" is ethical behavior in sports.' },
        { sentence: 'Sports injuries require proper treatment.', explanation: '"Sports injuries" are injuries from athletics.' },
        { sentence: 'Spectator sports attract large audiences.', explanation: '"Spectator sports" are sports watched by audiences.' },
        { sentence: 'Athletic scholarships support student athletes.', explanation: '"Athletic scholarships" are sports-based financial aid.' },
        { sentence: 'Sports broadcasting reaches global audiences.', explanation: '"Sports broadcasting" is media coverage of sports.' }
      ],
      commonMistakes: [
        { mistake: 'My team won.', correction: 'My team secured victory / achieved a decisive win in the championship.', explanation: 'Use more descriptive sports language.' },
        { mistake: 'Sports are just games.', correction: 'Sports serve multiple functions including physical fitness, social bonding, and cultural expression.', explanation: 'Recognize sports\' broader significance.' },
        { mistake: 'Professional athletes are overpaid.', correction: 'Professional athlete compensation reflects market dynamics in the sports entertainment industry.', explanation: 'Discuss sports economics analytically.' }
      ],
      miniPractice: [
        { question: 'Team _____ require collaboration and coordination.', type: 'fill-blank' },
        { question: 'Which term describes ethical behavior in sports?', options: ['sportsmanship', 'fair play', 'good conduct', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "The game was exciting."', type: 'rewrite' },
        { question: 'Athletic _____ test physical abilities.', type: 'fill-blank' }
      ],
      answerKey: [
        'sports',
        'all of the above',
        'The match featured intense competition and dramatic moments.',
        'competitions'
      ],
      quickRecap: 'Key terms: "team sports", "athletic competitions", "professional athletes", "sports leagues", "championship tournaments", "teamwork", "coaching", "sportsmanship", "spectator sports", "sports broadcasting". Use sports vocabulary accurately!',
      collocations: [
        'team sports', 'athletic competitions', 'professional athletes', 'sports leagues',
        'championship tournaments', 'teamwork', 'coaching', 'sports fans',
        'athletic performance', 'sports venues', 'sportsmanship', 'sports broadcasting'
      ],
      synonyms: [
        { word: 'win', synonyms: ['victory', 'triumph', 'success', 'achievement'] },
        { word: 'lose', synonyms: ['defeat', 'loss', 'setback', 'failure'] },
        { word: 'play', synonyms: ['compete', 'participate', 'perform', 'engage'] }
      ],
      speakingLines: [
        'Team sports develop valuable skills including collaboration and communication.',
        'Sportsmanship is essential for maintaining the integrity of athletic competition.',
        'Professional sports have become a significant part of the global entertainment industry.'
      ]
    }
  },
  {
    id: 'vocab-sports-3',
    title: 'Fitness & Exercise',
    slug: 'fitness-exercise',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Sports',
    description: 'Vocabulary for discussing physical fitness, exercise routines, and health activities.',
    is_premium: false,
    is_published: true,
    view_count: 920,
    created_at: '2024-10-01T10:00:00Z',
    updated_at: '2024-10-01T10:00:00Z',
    content: {
      title: 'Fitness & Exercise',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 fitness terms',
        'Discuss exercise and health',
        'Use fitness vocabulary'
      ],
      coreExplanation: `Fitness and exercise are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss physical activity and health routines.

This lesson covers fitness, exercise, and physical health. Understanding these concepts helps you discuss health-related topics effectively.`,
      examples: [
        { sentence: 'Physical fitness improves overall health.', explanation: '"Physical fitness" is bodily health and capability.' },
        { sentence: 'Exercise routines provide structured activity.', explanation: '"Exercise routines" are planned physical activities.' },
        { sentence: 'Cardiovascular exercise strengthens the heart.', explanation: '"Cardiovascular exercise" is heart-strengthening activity.' },
        { sentence: 'Strength training builds muscle.', explanation: '"Strength training" is resistance exercise.' },
        { sentence: 'Flexibility exercises improve range of motion.', explanation: '"Flexibility exercises" are stretching activities.' },
        { sentence: 'Gym memberships provide access to equipment.', explanation: '"Gym memberships" are fitness facility subscriptions.' },
        { sentence: 'Personal trainers guide fitness programs.', explanation: '"Personal trainers" are fitness professionals.' },
        { sentence: 'Workout intensity affects results.', explanation: '"Workout intensity" is exercise difficulty level.' },
        { sentence: 'Fitness goals motivate exercise.', explanation: '"Fitness goals" are health objectives.' },
        { sentence: 'Active lifestyles promote wellbeing.', explanation: '"Active lifestyles" involve regular physical activity.' },
        { sentence: 'Recovery time allows muscles to repair.', explanation: '"Recovery time" is rest between workouts.' },
        { sentence: 'Fitness tracking monitors progress.', explanation: '"Fitness tracking" is measuring exercise data.' },
        { sentence: 'Group fitness classes provide motivation.', explanation: '"Group fitness classes" are communal exercise sessions.' },
        { sentence: 'Sedentary behavior increases health risks.', explanation: '"Sedentary behavior" is inactive lifestyle.' },
        { sentence: 'Endurance training improves stamina.', explanation: '"Endurance training" is building lasting energy.' }
      ],
      commonMistakes: [
        { mistake: 'I go to the gym.', correction: 'I maintain a regular fitness routine / engage in strength training and cardiovascular exercise.', explanation: 'Be specific about fitness activities.' },
        { mistake: 'Exercise is boring.', correction: 'Finding enjoyable forms of physical activity makes maintaining fitness more sustainable.', explanation: 'Discuss fitness positively.' },
        { mistake: 'You need a gym to exercise.', correction: 'Physical activity can be incorporated through various means including outdoor activities and home workouts.', explanation: 'Acknowledge diverse exercise options.' }
      ],
      miniPractice: [
        { question: 'Physical _____ improves overall health.', type: 'fill-blank' },
        { question: 'Which term describes heart-strengthening activity?', options: ['cardiovascular exercise', 'cardio', 'aerobic exercise', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I exercise every day."', type: 'rewrite' },
        { question: 'Strength _____ builds muscle.', type: 'fill-blank' }
      ],
      answerKey: [
        'fitness',
        'all of the above',
        'I maintain a daily fitness routine that includes cardiovascular and strength training.',
        'training'
      ],
      quickRecap: 'Key terms: "physical fitness", "exercise routines", "cardiovascular exercise", "strength training", "flexibility exercises", "personal trainers", "workout intensity", "fitness goals", "active lifestyles", "endurance training". Use fitness vocabulary accurately!',
      collocations: [
        'physical fitness', 'exercise routines', 'cardiovascular exercise', 'strength training',
        'flexibility exercises', 'gym memberships', 'personal trainers', 'workout intensity',
        'fitness goals', 'active lifestyles', 'recovery time', 'fitness tracking'
      ],
      synonyms: [
        { word: 'exercise', synonyms: ['workout', 'physical activity', 'training', 'fitness'] },
        { word: 'healthy', synonyms: ['fit', 'well', 'in shape', 'active'] },
        { word: 'gym', synonyms: ['fitness center', 'health club', 'workout facility', 'training center'] }
      ],
      speakingLines: [
        'Regular physical fitness activities contribute significantly to overall health and wellbeing.',
        'Combining cardiovascular exercise with strength training provides comprehensive fitness benefits.',
        'Active lifestyles help prevent many chronic health conditions.'
      ]
    }
  },
  {
    id: 'vocab-sports-4',
    title: 'Olympic Games & International Sports',
    slug: 'olympic-games-international-sports',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Sports',
    description: 'Vocabulary for discussing the Olympics, international competitions, and global sporting events.',
    is_premium: true,
    is_published: true,
    view_count: 780,
    created_at: '2024-10-05T10:00:00Z',
    updated_at: '2024-10-05T10:00:00Z',
    content: {
      title: 'Olympic Games & International Sports',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 international sports terms',
        'Discuss Olympics and global events',
        'Use international sports vocabulary'
      ],
      coreExplanation: `International sports and the Olympics are common IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss global sporting events and international competition.

This lesson covers the Olympics, international sports, and global athletic events. Understanding these concepts helps you discuss international sports effectively.`,
      examples: [
        { sentence: 'The Olympic Games bring together athletes worldwide.', explanation: '"Olympic Games" are the premier international sporting event.' },
        { sentence: 'Medal ceremonies honor top performers.', explanation: '"Medal ceremonies" are award presentations.' },
        { sentence: 'Olympic athletes represent their countries.', explanation: '"Olympic athletes" are competitors in the Olympics.' },
        { sentence: 'World championships determine global rankings.', explanation: '"World championships" are international title competitions.' },
        { sentence: 'Host cities prepare extensive infrastructure.', explanation: '"Host cities" are locations for major events.' },
        { sentence: 'Paralympic Games showcase adaptive sports.', explanation: '"Paralympic Games" are Olympics for athletes with disabilities.' },
        { sentence: 'Olympic records mark exceptional achievements.', explanation: '"Olympic records" are best performances at Olympics.' },
        { sentence: 'International federations govern sports globally.', explanation: '"International federations" are global sports organizations.' },
        { sentence: 'Doping scandals undermine sports integrity.', explanation: '"Doping scandals" are drug-related controversies.' },
        { sentence: 'Opening ceremonies celebrate international unity.', explanation: '"Opening ceremonies" are event inaugurations.' },
        { sentence: 'National pride motivates Olympic participation.', explanation: '"National pride" is patriotic feeling.' },
        { sentence: 'Sports diplomacy uses athletics for international relations.', explanation: '"Sports diplomacy" is using sports for diplomacy.' },
        { sentence: 'Olympic legacy includes lasting infrastructure.', explanation: '"Olympic legacy" is long-term event impacts.' },
        { sentence: 'Qualifying rounds determine Olympic participants.', explanation: '"Qualifying rounds" are selection competitions.' },
        { sentence: 'Olympic values include excellence and friendship.', explanation: '"Olympic values" are principles of the Olympics.' }
      ],
      commonMistakes: [
        { mistake: 'The Olympics are just sports.', correction: 'The Olympic Games represent international cooperation, cultural exchange, and athletic excellence.', explanation: 'Recognize Olympics\' broader significance.' },
        { mistake: 'My country should win more medals.', correction: 'Olympic success depends on various factors including sports infrastructure, funding, and athlete development programs.', explanation: 'Discuss Olympic performance analytically.' },
        { mistake: 'The Olympics are too expensive.', correction: 'Olympic hosting involves significant costs and potential benefits, with debates about long-term legacy.', explanation: 'Present balanced views on Olympic economics.' }
      ],
      miniPractice: [
        { question: 'The Olympic _____ bring together athletes worldwide.', type: 'fill-blank' },
        { question: 'Which term describes Olympics for athletes with disabilities?', options: ['Paralympic Games', 'Special Olympics', 'Adaptive Olympics', 'Disability Games'], type: 'multiple-choice' },
        { question: 'Rewrite: "My country won many medals."', type: 'rewrite' },
        { question: 'Medal _____ honor top performers.', type: 'fill-blank' }
      ],
      answerKey: [
        'Games',
        'Paralympic Games',
        'My country achieved significant success in the medal standings.',
        'ceremonies'
      ],
      quickRecap: 'Key terms: "Olympic Games", "medal ceremonies", "Olympic athletes", "world championships", "host cities", "Paralympic Games", "Olympic records", "doping scandals", "opening ceremonies", "Olympic legacy". Use international sports vocabulary!',
      collocations: [
        'Olympic Games', 'medal ceremonies', 'Olympic athletes', 'world championships',
        'host cities', 'Paralympic Games', 'Olympic records', 'international federations',
        'doping scandals', 'opening ceremonies', 'national pride', 'Olympic legacy'
      ],
      synonyms: [
        { word: 'compete', synonyms: ['participate', 'contend', 'vie', 'contest'] },
        { word: 'win', synonyms: ['triumph', 'succeed', 'prevail', 'achieve victory'] },
        { word: 'represent', synonyms: ['stand for', 'embody', 'symbolize', 'act for'] }
      ],
      speakingLines: [
        'The Olympic Games represent the pinnacle of international athletic competition.',
        'Paralympic Games showcase the remarkable achievements of athletes with disabilities.',
        'Olympic legacy includes both infrastructure development and inspiration for future athletes.'
      ]
    }
  },
  {
    id: 'vocab-sports-5',
    title: 'Outdoor Activities & Adventure Sports',
    slug: 'outdoor-activities-adventure-sports',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Sports',
    description: 'Vocabulary for discussing outdoor recreation, adventure sports, and nature activities.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-10-08T10:00:00Z',
    updated_at: '2024-10-08T10:00:00Z',
    content: {
      title: 'Outdoor Activities & Adventure Sports',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 outdoor activity terms',
        'Discuss adventure sports',
        'Use recreation vocabulary'
      ],
      coreExplanation: `Outdoor activities and adventure sports are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss outdoor recreation and adventure activities.

This lesson covers outdoor activities, adventure sports, and nature recreation. Understanding these concepts helps you discuss leisure activities effectively.`,
      examples: [
        { sentence: 'Outdoor activities connect people with nature.', explanation: '"Outdoor activities" are recreation in natural settings.' },
        { sentence: 'Adventure sports involve risk and excitement.', explanation: '"Adventure sports" are thrilling physical activities.' },
        { sentence: 'Hiking trails offer varying difficulty levels.', explanation: '"Hiking trails" are paths for walking in nature.' },
        { sentence: 'Rock climbing requires strength and technique.', explanation: '"Rock climbing" is ascending rock faces.' },
        { sentence: 'Water sports include surfing and kayaking.', explanation: '"Water sports" are aquatic activities.' },
        { sentence: 'Camping provides immersive nature experiences.', explanation: '"Camping" is staying outdoors overnight.' },
        { sentence: 'Extreme sports push physical limits.', explanation: '"Extreme sports" are high-risk activities.' },
        { sentence: 'Mountain biking combines cycling with terrain.', explanation: '"Mountain biking" is off-road cycling.' },
        { sentence: 'Skiing and snowboarding are winter sports.', explanation: '"Skiing" and "snowboarding" are snow sports.' },
        { sentence: 'Scuba diving explores underwater environments.', explanation: '"Scuba diving" is underwater swimming with equipment.' },
        { sentence: 'Safety equipment protects adventure participants.', explanation: '"Safety equipment" is protective gear.' },
        { sentence: 'Outdoor recreation promotes physical and mental health.', explanation: '"Outdoor recreation" is leisure in nature.' },
        { sentence: 'Wildlife observation connects people with animals.', explanation: '"Wildlife observation" is watching animals in nature.' },
        { sentence: 'Adventure tourism combines travel with activities.', explanation: '"Adventure tourism" is travel for adventure activities.' },
        { sentence: 'Environmental awareness guides responsible recreation.', explanation: '"Environmental awareness" is understanding nature impact.' }
      ],
      commonMistakes: [
        { mistake: 'Adventure sports are dangerous.', correction: 'Adventure sports involve managed risk, with proper training and equipment significantly reducing dangers.', explanation: 'Discuss risk management.' },
        { mistake: 'I went hiking.', correction: 'I explored a challenging trail / enjoyed a scenic hike through [specific terrain].', explanation: 'Be descriptive about outdoor activities.' },
        { mistake: 'Outdoor activities are only for fit people.', correction: 'Outdoor recreation offers activities for various fitness levels and abilities.', explanation: 'Acknowledge accessibility.' }
      ],
      miniPractice: [
        { question: 'Outdoor _____ connect people with nature.', type: 'fill-blank' },
        { question: 'Which term describes high-risk activities?', options: ['extreme sports', 'adventure sports', 'action sports', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I like being outside."', type: 'rewrite' },
        { question: 'Adventure _____ involve risk and excitement.', type: 'fill-blank' }
      ],
      answerKey: [
        'activities',
        'all of the above',
        'I enjoy outdoor recreation and connecting with natural environments.',
        'sports'
      ],
      quickRecap: 'Key terms: "outdoor activities", "adventure sports", "hiking trails", "rock climbing", "water sports", "camping", "extreme sports", "mountain biking", "scuba diving", "adventure tourism". Use outdoor activity vocabulary!',
      collocations: [
        'outdoor activities', 'adventure sports', 'hiking trails', 'rock climbing',
        'water sports', 'camping', 'extreme sports', 'mountain biking',
        'skiing', 'scuba diving', 'safety equipment', 'adventure tourism'
      ],
      synonyms: [
        { word: 'outdoor', synonyms: ['outside', 'open-air', 'al fresco', 'nature-based'] },
        { word: 'adventure', synonyms: ['excitement', 'thrill', 'challenge', 'expedition'] },
        { word: 'nature', synonyms: ['outdoors', 'wilderness', 'natural environment', 'countryside'] }
      ],
      speakingLines: [
        'Outdoor activities provide valuable opportunities to connect with nature and improve wellbeing.',
        'Adventure sports offer excitement while developing physical skills and mental resilience.',
        'Environmental awareness is essential for responsible outdoor recreation.'
      ]
    }
  },
  // ============================================
  // BATCH 14: Food & Agriculture (4 lessons)
  // ============================================
  {
    id: 'vocab-food-2',
    title: 'Food Production & Agriculture',
    slug: 'food-production-agriculture',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Food',
    description: 'Vocabulary for discussing farming, food production, and agricultural systems.',
    is_premium: true,
    is_published: true,
    view_count: 720,
    created_at: '2024-10-12T10:00:00Z',
    updated_at: '2024-10-12T10:00:00Z',
    content: {
      title: 'Food Production & Agriculture',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 agriculture terms',
        'Discuss food production',
        'Use farming vocabulary'
      ],
      coreExplanation: `Food production and agriculture are important IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss farming, food systems, and agricultural practices.

This lesson covers agriculture, food production, and farming systems. Understanding these concepts helps you discuss food-related topics effectively.`,
      examples: [
        { sentence: 'Agriculture provides food for global populations.', explanation: '"Agriculture" is farming and food production.' },
        { sentence: 'Sustainable farming protects environmental resources.', explanation: '"Sustainable farming" is environmentally responsible agriculture.' },
        { sentence: 'Crop yields determine food availability.', explanation: '"Crop yields" are amounts of food produced.' },
        { sentence: 'Organic farming avoids synthetic chemicals.', explanation: '"Organic farming" is chemical-free agriculture.' },
        { sentence: 'Food supply chains connect producers to consumers.', explanation: '"Food supply chains" are distribution networks.' },
        { sentence: 'Agricultural technology improves efficiency.', explanation: '"Agricultural technology" is farming innovation.' },
        { sentence: 'Livestock farming raises animals for food.', explanation: '"Livestock farming" is animal agriculture.' },
        { sentence: 'Irrigation systems provide water for crops.', explanation: '"Irrigation systems" are water delivery for farming.' },
        { sentence: 'Food processing transforms raw ingredients.', explanation: '"Food processing" is preparing food for consumption.' },
        { sentence: 'Agricultural subsidies support farmers.', explanation: '"Agricultural subsidies" are government farming support.' },
        { sentence: 'Genetically modified crops have altered genetics.', explanation: '"Genetically modified crops" are GMO plants.' },
        { sentence: 'Food waste occurs throughout supply chains.', explanation: '"Food waste" is discarded food.' },
        { sentence: 'Arable land is suitable for growing crops.', explanation: '"Arable land" is farmable land.' },
        { sentence: 'Pesticides control agricultural pests.', explanation: '"Pesticides" are chemicals killing pests.' },
        { sentence: 'Food sovereignty emphasizes local control.', explanation: '"Food sovereignty" is communities controlling food systems.' }
      ],
      commonMistakes: [
        { mistake: 'Organic food is always better.', correction: 'Organic and conventional farming each have advantages and trade-offs regarding yield, cost, and environmental impact.', explanation: 'Present balanced views on farming methods.' },
        { mistake: 'GMOs are dangerous.', correction: 'Genetically modified crops are subject to scientific debate, with research examining both benefits and concerns.', explanation: 'Discuss GMOs objectively.' },
        { mistake: 'Farming is simple.', correction: 'Modern agriculture involves complex decisions about technology, sustainability, and market dynamics.', explanation: 'Acknowledge agricultural complexity.' }
      ],
      miniPractice: [
        { question: '_____ provides food for global populations.', type: 'fill-blank' },
        { question: 'Which term describes chemical-free agriculture?', options: ['organic farming', 'natural farming', 'sustainable farming', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Farmers grow food."', type: 'rewrite' },
        { question: 'Crop _____ determine food availability.', type: 'fill-blank' }
      ],
      answerKey: [
        'Agriculture',
        'organic farming',
        'Agricultural producers cultivate crops and raise livestock to supply food systems.',
        'yields'
      ],
      quickRecap: 'Key terms: "agriculture", "sustainable farming", "crop yields", "organic farming", "food supply chains", "agricultural technology", "livestock farming", "irrigation systems", "genetically modified crops", "food sovereignty". Use agricultural vocabulary!',
      collocations: [
        'agriculture', 'sustainable farming', 'crop yields', 'organic farming',
        'food supply chains', 'agricultural technology', 'livestock farming', 'irrigation systems',
        'food processing', 'agricultural subsidies', 'genetically modified crops', 'arable land'
      ],
      synonyms: [
        { word: 'farm', synonyms: ['cultivate', 'grow', 'produce', 'raise'] },
        { word: 'food', synonyms: ['produce', 'crops', 'harvest', 'yield'] },
        { word: 'farmer', synonyms: ['agriculturalist', 'grower', 'producer', 'cultivator'] }
      ],
      speakingLines: [
        'Sustainable farming practices are essential for long-term food security.',
        'Agricultural technology has significantly increased crop yields over recent decades.',
        'Food supply chains connect producers with consumers across global markets.'
      ]
    }
  },
  {
    id: 'vocab-food-3',
    title: 'Cuisine & Culinary Arts',
    slug: 'cuisine-culinary-arts',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Food',
    description: 'Vocabulary for discussing cooking, cuisine types, and culinary traditions.',
    is_premium: true,
    is_published: true,
    view_count: 880,
    created_at: '2024-10-15T10:00:00Z',
    updated_at: '2024-10-15T10:00:00Z',
    content: {
      title: 'Cuisine & Culinary Arts',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 culinary terms',
        'Discuss cooking and cuisine',
        'Use food vocabulary'
      ],
      coreExplanation: `Cuisine and cooking are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss food, cooking, and culinary traditions.

This lesson covers cuisine, cooking, and culinary arts. Understanding these concepts helps you discuss food-related topics effectively.`,
      examples: [
        { sentence: 'Culinary traditions reflect cultural heritage.', explanation: '"Culinary traditions" are food customs.' },
        { sentence: 'Regional cuisines feature local ingredients.', explanation: '"Regional cuisines" are area-specific food styles.' },
        { sentence: 'Cooking techniques vary across cultures.', explanation: '"Cooking techniques" are food preparation methods.' },
        { sentence: 'Gourmet dining offers refined experiences.', explanation: '"Gourmet dining" is high-quality food service.' },
        { sentence: 'Recipe development creates new dishes.', explanation: '"Recipe development" is creating food instructions.' },
        { sentence: 'Flavor profiles combine taste elements.', explanation: '"Flavor profiles" are taste combinations.' },
        { sentence: 'Culinary schools train professional chefs.', explanation: '"Culinary schools" are cooking education institutions.' },
        { sentence: 'Food presentation enhances dining experiences.', explanation: '"Food presentation" is how food looks.' },
        { sentence: 'Seasonal ingredients vary by time of year.', explanation: '"Seasonal ingredients" are foods available in certain seasons.' },
        { sentence: 'Fusion cuisine combines culinary traditions.', explanation: '"Fusion cuisine" is mixed cultural cooking.' },
        { sentence: 'Traditional recipes preserve cultural knowledge.', explanation: '"Traditional recipes" are inherited cooking instructions.' },
        { sentence: 'Gastronomy studies food and culture.', explanation: '"Gastronomy" is the study of food and cooking.' },
        { sentence: 'Culinary innovation creates new approaches.', explanation: '"Culinary innovation" is cooking creativity.' },
        { sentence: 'Dietary restrictions limit food choices.', explanation: '"Dietary restrictions" are food limitations.' },
        { sentence: 'Food pairing matches complementary flavors.', explanation: '"Food pairing" is combining compatible foods.' }
      ],
      commonMistakes: [
        { mistake: 'I like good food.', correction: 'I appreciate cuisine that features fresh ingredients / bold flavors / traditional techniques.', explanation: 'Be specific about food preferences.' },
        { mistake: 'Foreign food is strange.', correction: 'Different cuisines reflect diverse culinary traditions and cultural approaches to food.', explanation: 'Discuss cuisines respectfully.' },
        { mistake: 'Cooking is easy.', correction: 'Culinary skills develop through practice, with professional cooking requiring extensive training.', explanation: 'Acknowledge culinary complexity.' }
      ],
      miniPractice: [
        { question: 'Culinary _____ reflect cultural heritage.', type: 'fill-blank' },
        { question: 'Which term describes mixed cultural cooking?', options: ['fusion cuisine', 'cross-cultural cuisine', 'hybrid cuisine', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "The food was delicious."', type: 'rewrite' },
        { question: 'Cooking _____ vary across cultures.', type: 'fill-blank' }
      ],
      answerKey: [
        'traditions',
        'all of the above',
        'The cuisine featured exceptional flavor profiles and expert preparation.',
        'techniques'
      ],
      quickRecap: 'Key terms: "culinary traditions", "regional cuisines", "cooking techniques", "gourmet dining", "flavor profiles", "culinary schools", "food presentation", "fusion cuisine", "gastronomy", "food pairing". Use culinary vocabulary!',
      collocations: [
        'culinary traditions', 'regional cuisines', 'cooking techniques', 'gourmet dining',
        'recipe development', 'flavor profiles', 'culinary schools', 'food presentation',
        'seasonal ingredients', 'fusion cuisine', 'traditional recipes', 'gastronomy'
      ],
      synonyms: [
        { word: 'cook', synonyms: ['prepare', 'make', 'create', 'craft'] },
        { word: 'delicious', synonyms: ['flavorful', 'tasty', 'appetizing', 'savory'] },
        { word: 'food', synonyms: ['cuisine', 'dishes', 'fare', 'meals'] }
      ],
      speakingLines: [
        'Culinary traditions reflect the cultural heritage and history of different regions.',
        'Fusion cuisine demonstrates how culinary innovation can combine diverse food traditions.',
        'Food presentation is an important aspect of the overall dining experience.'
      ]
    }
  },
  {
    id: 'vocab-food-4',
    title: 'Food Safety & Nutrition',
    slug: 'food-safety-nutrition',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Food',
    description: 'Vocabulary for discussing food safety, nutrition science, and healthy eating.',
    is_premium: true,
    is_published: true,
    view_count: 750,
    created_at: '2024-10-18T10:00:00Z',
    updated_at: '2024-10-18T10:00:00Z',
    content: {
      title: 'Food Safety & Nutrition',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 food safety terms',
        'Discuss nutrition and health',
        'Use food science vocabulary'
      ],
      coreExplanation: `Food safety and nutrition are important IELTS topics. To achieve Band 7+, you need vocabulary that allows you to discuss food safety, nutrition, and healthy eating.

This lesson covers food safety, nutrition science, and healthy eating. Understanding these concepts helps you discuss health-related food topics effectively.`,
      examples: [
        { sentence: 'Food safety regulations protect consumers.', explanation: '"Food safety regulations" are rules ensuring safe food.' },
        { sentence: 'Nutritional value indicates food healthfulness.', explanation: '"Nutritional value" is food\'s health benefits.' },
        { sentence: 'Food contamination poses health risks.', explanation: '"Food contamination" is harmful substances in food.' },
        { sentence: 'Balanced diets include various food groups.', explanation: '"Balanced diets" are nutritionally complete eating patterns.' },
        { sentence: 'Food allergies require careful management.', explanation: '"Food allergies" are immune reactions to foods.' },
        { sentence: 'Preservatives extend food shelf life.', explanation: '"Preservatives" are substances preventing spoilage.' },
        { sentence: 'Calorie counting monitors energy intake.', explanation: '"Calorie counting" is tracking food energy.' },
        { sentence: 'Food labeling provides nutritional information.', explanation: '"Food labeling" is information on food packages.' },
        { sentence: 'Foodborne illnesses result from contaminated food.', explanation: '"Foodborne illnesses" are diseases from food.' },
        { sentence: 'Dietary supplements provide additional nutrients.', explanation: '"Dietary supplements" are nutrient additions.' },
        { sentence: 'Food hygiene prevents contamination.', explanation: '"Food hygiene" is cleanliness in food handling.' },
        { sentence: 'Nutrient density measures nutrition per calorie.', explanation: '"Nutrient density" is nutrition relative to energy.' },
        { sentence: 'Food additives modify food properties.', explanation: '"Food additives" are substances added to food.' },
        { sentence: 'Healthy eating habits support wellbeing.', explanation: '"Healthy eating habits" are beneficial food patterns.' },
        { sentence: 'Food quality standards ensure safety.', explanation: '"Food quality standards" are safety requirements.' }
      ],
      commonMistakes: [
        { mistake: 'All processed food is unhealthy.', correction: 'Food processing varies widely, with some methods preserving nutrition while others may reduce it.', explanation: 'Discuss food processing nuancedly.' },
        { mistake: 'Supplements replace healthy eating.', correction: 'Dietary supplements complement but cannot replace the benefits of a balanced diet.', explanation: 'Explain supplement limitations.' },
        { mistake: 'Calories are bad.', correction: 'Calories provide essential energy, with the quality and quantity of food intake affecting health.', explanation: 'Discuss calories objectively.' }
      ],
      miniPractice: [
        { question: 'Food safety _____ protect consumers.', type: 'fill-blank' },
        { question: 'Which term describes diseases from contaminated food?', options: ['foodborne illnesses', 'food poisoning', 'food-related diseases', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "Junk food is bad for you."', type: 'rewrite' },
        { question: 'Nutritional _____ indicates food healthfulness.', type: 'fill-blank' }
      ],
      answerKey: [
        'regulations',
        'all of the above',
        'Highly processed foods with low nutritional value may negatively impact health when consumed regularly.',
        'value'
      ],
      quickRecap: 'Key terms: "food safety regulations", "nutritional value", "food contamination", "balanced diets", "food allergies", "preservatives", "food labeling", "foodborne illnesses", "dietary supplements", "food hygiene". Use food safety vocabulary!',
      collocations: [
        'food safety regulations', 'nutritional value', 'food contamination', 'balanced diets',
        'food allergies', 'preservatives', 'calorie counting', 'food labeling',
        'foodborne illnesses', 'dietary supplements', 'food hygiene', 'healthy eating habits'
      ],
      synonyms: [
        { word: 'healthy', synonyms: ['nutritious', 'wholesome', 'beneficial', 'nourishing'] },
        { word: 'safe', synonyms: ['uncontaminated', 'clean', 'hygienic', 'pure'] },
        { word: 'unhealthy', synonyms: ['harmful', 'detrimental', 'unwholesome', 'nutritionally poor'] }
      ],
      speakingLines: [
        'Food safety regulations are essential for protecting public health.',
        'Balanced diets provide the nutritional foundation for overall wellbeing.',
        'Food labeling helps consumers make informed choices about their nutrition.'
      ]
    }
  },
  {
    id: 'vocab-food-5',
    title: 'Food Culture & Dining',
    slug: 'food-culture-dining',
    type: 'vocabulary',
    level: 'intermediate',
    topic: 'Food',
    description: 'Vocabulary for discussing food culture, dining experiences, and eating customs.',
    is_premium: true,
    is_published: true,
    view_count: 820,
    created_at: '2024-10-22T10:00:00Z',
    updated_at: '2024-10-22T10:00:00Z',
    content: {
      title: 'Food Culture & Dining',
      targetLevel: 'Band 6.5 - 8.0',
      whatYouWillLearn: [
        'Master 25 food culture terms',
        'Discuss dining experiences',
        'Use food culture vocabulary'
      ],
      coreExplanation: `Food culture and dining are common IELTS Speaking topics. To achieve Band 7+, you need vocabulary that allows you to discuss eating customs, dining experiences, and food culture.

This lesson covers food culture, dining experiences, and eating customs. Understanding these concepts helps you discuss food-related social topics effectively.`,
      examples: [
        { sentence: 'Food culture reflects social values.', explanation: '"Food culture" is the role of food in society.' },
        { sentence: 'Dining etiquette varies between cultures.', explanation: '"Dining etiquette" is proper eating behavior.' },
        { sentence: 'Restaurant experiences combine food and service.', explanation: '"Restaurant experiences" are dining at restaurants.' },
        { sentence: 'Street food offers affordable local cuisine.', explanation: '"Street food" is food sold by vendors.' },
        { sentence: 'Food festivals celebrate culinary traditions.', explanation: '"Food festivals" are events featuring food.' },
        { sentence: 'Communal dining brings people together.', explanation: '"Communal dining" is eating together.' },
        { sentence: 'Food trends influence eating habits.', explanation: '"Food trends" are popular food movements.' },
        { sentence: 'Culinary tourism explores food destinations.', explanation: '"Culinary tourism" is travel for food experiences.' },
        { sentence: 'Home cooking provides personal meals.', explanation: '"Home cooking" is preparing food at home.' },
        { sentence: 'Fast food offers quick, convenient meals.', explanation: '"Fast food" is quickly prepared food.' },
        { sentence: 'Fine dining provides luxury experiences.', explanation: '"Fine dining" is upscale restaurant service.' },
        { sentence: 'Food rituals mark special occasions.', explanation: '"Food rituals" are ceremonial eating practices.' },
        { sentence: 'Eating habits develop over time.', explanation: '"Eating habits" are patterns of food consumption.' },
        { sentence: 'Food memories connect to experiences.', explanation: '"Food memories" are recollections associated with food.' },
        { sentence: 'Meal preparation involves planning and cooking.', explanation: '"Meal preparation" is getting food ready.' }
      ],
      commonMistakes: [
        { mistake: 'I like eating out.', correction: 'I enjoy dining at restaurants / exploring different culinary experiences.', explanation: 'Use more descriptive dining language.' },
        { mistake: 'Fast food is bad.', correction: 'Fast food offers convenience, though regular consumption may have health implications.', explanation: 'Discuss fast food objectively.' },
        { mistake: 'Home cooking is always better.', correction: 'Both home cooking and restaurant dining offer different advantages and experiences.', explanation: 'Compare dining options fairly.' }
      ],
      miniPractice: [
        { question: 'Food _____ reflects social values.', type: 'fill-blank' },
        { question: 'Which term describes travel for food experiences?', options: ['culinary tourism', 'food tourism', 'gastronomic tourism', 'all of the above'], type: 'multiple-choice' },
        { question: 'Rewrite: "I like eating at restaurants."', type: 'rewrite' },
        { question: 'Dining _____ varies between cultures.', type: 'fill-blank' }
      ],
      answerKey: [
        'culture',
        'all of the above',
        'I enjoy dining out and exploring diverse culinary experiences.',
        'etiquette'
      ],
      quickRecap: 'Key terms: "food culture", "dining etiquette", "restaurant experiences", "street food", "food festivals", "communal dining", "food trends", "culinary tourism", "fine dining", "food rituals". Use food culture vocabulary!',
      collocations: [
        'food culture', 'dining etiquette', 'restaurant experiences', 'street food',
        'food festivals', 'communal dining', 'food trends', 'culinary tourism',
        'home cooking', 'fast food', 'fine dining', 'eating habits'
      ],
      synonyms: [
        { word: 'eat', synonyms: ['dine', 'consume', 'have a meal', 'partake'] },
        { word: 'restaurant', synonyms: ['eatery', 'dining establishment', 'café', 'bistro'] },
        { word: 'meal', synonyms: ['dish', 'course', 'fare', 'repast'] }
      ],
      speakingLines: [
        'Food culture reflects the values and traditions of different societies.',
        'Culinary tourism has become an important part of the travel industry.',
        'Communal dining strengthens social bonds and cultural connections.'
      ]
    }
  }
];
