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
  }
];
