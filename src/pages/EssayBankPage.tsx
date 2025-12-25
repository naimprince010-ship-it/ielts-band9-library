import { useState } from 'react';
import { 
  BookOpen, 
  Star, 
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Essay {
  id: string;
  type: 'task1' | 'task2';
  topic: string;
  question: string;
  bandScore: number;
  essay: string;
  wordCount: number;
  analysis: {
    taskAchievement: { score: number; comments: string[] };
    coherenceCohesion: { score: number; comments: string[] };
    lexicalResource: { score: number; comments: string[] };
    grammaticalRange: { score: number; comments: string[] };
  };
  strengths: string[];
  improvements: string[];
  keyVocabulary: string[];
  usefulPhrases: string[];
}

const SAMPLE_ESSAYS: Essay[] = [
  {
    id: 'essay-1',
    type: 'task2',
    topic: 'Education',
    question: 'Some people believe that children should be taught to compete, while others think they should be taught to cooperate. Discuss both views and give your own opinion.',
    bandScore: 9,
    essay: `In contemporary education, there is ongoing debate about whether children should be encouraged to compete or cooperate with their peers. While both approaches have their merits, I believe that a balanced combination of competition and cooperation yields the most beneficial outcomes for child development.

Proponents of competitive education argue that it prepares children for the realities of adult life. In the professional world, individuals must compete for jobs, promotions, and recognition. By fostering a competitive spirit from an early age, children develop resilience, determination, and the drive to excel. Furthermore, healthy competition can motivate students to push their boundaries and achieve their full potential. For instance, academic competitions and sports events often inspire participants to work harder and develop their skills more rigorously than they might otherwise.

On the other hand, advocates of cooperative learning emphasize the importance of teamwork and social skills. In an increasingly interconnected world, the ability to collaborate effectively with others is invaluable. Cooperative activities teach children to communicate, share ideas, and work towards common goals. These skills are essential not only in the workplace but also in personal relationships and community involvement. Moreover, cooperative learning environments tend to be more inclusive, allowing students of varying abilities to contribute meaningfully and learn from one another.

In my view, the most effective educational approach incorporates elements of both competition and cooperation. Children benefit from learning to strive for personal excellence while also understanding the value of working together. Schools can achieve this balance by offering both individual assessments and group projects, competitive sports alongside team-building activities. This dual approach equips students with a comprehensive skill set that prepares them for the multifaceted challenges of modern life.

In conclusion, rather than viewing competition and cooperation as mutually exclusive, educators should recognize their complementary nature. By thoughtfully integrating both approaches, we can nurture well-rounded individuals who are capable of both independent achievement and collaborative success.`,
    wordCount: 298,
    analysis: {
      taskAchievement: {
        score: 9,
        comments: [
          'Fully addresses all parts of the task',
          'Presents a fully developed position with relevant, extended ideas',
          'Clear opinion stated and supported throughout'
        ]
      },
      coherenceCohesion: {
        score: 9,
        comments: [
          'Skillful paragraphing with clear progression',
          'Cohesive devices used appropriately without being mechanical',
          'Each paragraph has a clear central topic'
        ]
      },
      lexicalResource: {
        score: 9,
        comments: [
          'Wide range of vocabulary used with full flexibility',
          'Sophisticated lexical items: "multifaceted", "complementary nature"',
          'Natural and sophisticated control of lexical features'
        ]
      },
      grammaticalRange: {
        score: 9,
        comments: [
          'Wide range of structures with full flexibility',
          'Error-free sentences throughout',
          'Complex structures used naturally: conditionals, relative clauses'
        ]
      }
    },
    strengths: [
      'Balanced discussion of both views before giving opinion',
      'Clear topic sentences for each paragraph',
      'Sophisticated vocabulary used naturally',
      'Logical flow with smooth transitions',
      'Specific examples to support arguments'
    ],
    improvements: [
      'Could include more specific real-world examples',
      'Statistics or research findings could strengthen arguments'
    ],
    keyVocabulary: [
      'contemporary education',
      'foster a competitive spirit',
      'resilience and determination',
      'cooperative learning',
      'interconnected world',
      'multifaceted challenges',
      'complementary nature',
      'well-rounded individuals'
    ],
    usefulPhrases: [
      'While both approaches have their merits',
      'Proponents of... argue that',
      'On the other hand, advocates of... emphasize',
      'In my view, the most effective approach',
      'Rather than viewing X and Y as mutually exclusive'
    ]
  },
  {
    id: 'essay-2',
    type: 'task2',
    topic: 'Technology',
    question: 'Many people believe that social media has a negative impact on both individuals and society. To what extent do you agree or disagree?',
    bandScore: 8,
    essay: `Social media has become an integral part of modern life, with billions of users worldwide. While some argue that these platforms have detrimental effects on individuals and society, I partially agree with this view, as I believe social media has both positive and negative impacts.

On the negative side, social media can indeed harm mental health and social relationships. Studies have shown that excessive use of platforms like Instagram and Facebook is associated with increased rates of anxiety, depression, and low self-esteem, particularly among young people. The constant comparison with others' curated lives can lead to feelings of inadequacy. Additionally, social media has been criticized for spreading misinformation and creating echo chambers that polarize society.

However, it would be unfair to overlook the significant benefits that social media provides. These platforms have revolutionized communication, allowing people to maintain relationships across vast distances and connect with like-minded individuals globally. Social media has also democratized information sharing, giving voice to marginalized communities and facilitating social movements. During the COVID-19 pandemic, social media proved invaluable for maintaining social connections during lockdowns.

Furthermore, social media offers substantial economic opportunities. Small businesses can reach customers worldwide without significant marketing budgets, and individuals can build careers as content creators. Educational content on platforms like YouTube has made learning accessible to millions who might otherwise lack such opportunities.

In conclusion, while I acknowledge that social media poses genuine risks to mental health and social cohesion, I believe its impact is not wholly negative. The key lies in responsible use and appropriate regulation. Rather than condemning social media entirely, we should focus on maximizing its benefits while mitigating its harms through digital literacy education and thoughtful platform design.`,
    wordCount: 276,
    analysis: {
      taskAchievement: {
        score: 8,
        comments: [
          'Addresses all parts of the task sufficiently',
          'Presents a clear position throughout',
          'Ideas are relevant and well-developed'
        ]
      },
      coherenceCohesion: {
        score: 8,
        comments: [
          'Logical organization with clear progression',
          'Good use of cohesive devices',
          'Clear paragraphing with central topics'
        ]
      },
      lexicalResource: {
        score: 8,
        comments: [
          'Wide range of vocabulary',
          'Good use of less common items: "democratized", "echo chambers"',
          'Minor imprecision does not impede communication'
        ]
      },
      grammaticalRange: {
        score: 8,
        comments: [
          'Wide range of structures',
          'Majority of sentences are error-free',
          'Good control of complex structures'
        ]
      }
    },
    strengths: [
      'Clear partial agreement position',
      'Good balance of negative and positive points',
      'Relevant contemporary examples (COVID-19)',
      'Strong conclusion with practical suggestions'
    ],
    improvements: [
      'Could develop some points more fully',
      'More specific statistics would strengthen arguments',
      'Some vocabulary could be more sophisticated'
    ],
    keyVocabulary: [
      'integral part of modern life',
      'detrimental effects',
      'curated lives',
      'echo chambers',
      'democratized information',
      'marginalized communities',
      'digital literacy',
      'mitigating harms'
    ],
    usefulPhrases: [
      'I partially agree with this view',
      'On the negative side',
      'However, it would be unfair to overlook',
      'Furthermore, X offers substantial',
      'The key lies in'
    ]
  },
  {
    id: 'essay-3',
    type: 'task2',
    topic: 'Environment',
    question: 'Some people think that environmental problems are too big for individuals to solve, while others believe that individuals can make a real difference. Discuss both views and give your opinion.',
    bandScore: 7.5,
    essay: `Environmental issues such as climate change and pollution have become pressing global concerns. There is debate about whether individuals can meaningfully address these problems or whether they are too large for personal action to matter. In my opinion, while systemic change is essential, individual actions remain important.

Those who believe environmental problems are too big for individuals point to the scale of the crisis. Climate change, for example, is driven primarily by industrial emissions, deforestation, and large-scale agriculture. An individual's carbon footprint is minuscule compared to that of major corporations. Critics argue that focusing on personal responsibility distracts from the need for government regulation and corporate accountability.

Conversely, supporters of individual action argue that collective behavior can drive significant change. When millions of people adopt sustainable practices, the cumulative effect is substantial. Consumer choices influence market trends, pushing companies to offer more eco-friendly products. Moreover, individuals who practice environmental responsibility often become advocates for broader change, influencing their communities and voting for environmentally conscious policies.

I believe both perspectives have merit, but they are not mutually exclusive. Individual actions, while insufficient alone, contribute to a culture of environmental awareness that supports larger systemic changes. Personal choices like reducing meat consumption, using public transport, and minimizing waste are meaningful both for their direct impact and for the message they send.

In conclusion, environmental problems require action at all levels. Individuals should not feel their efforts are futile, nor should they believe personal action alone is sufficient. The most effective approach combines individual responsibility with advocacy for systemic change.`,
    wordCount: 254,
    analysis: {
      taskAchievement: {
        score: 7,
        comments: [
          'Addresses all parts of the task',
          'Presents a clear position',
          'Main ideas are relevant but could be more extended'
        ]
      },
      coherenceCohesion: {
        score: 8,
        comments: [
          'Logically organized with clear progression',
          'Good use of cohesive devices',
          'Clear central topic in each paragraph'
        ]
      },
      lexicalResource: {
        score: 7,
        comments: [
          'Sufficient range of vocabulary',
          'Some less common items used appropriately',
          'Occasional awkwardness in word choice'
        ]
      },
      grammaticalRange: {
        score: 8,
        comments: [
          'Good range of complex structures',
          'Most sentences are error-free',
          'Good control of grammar'
        ]
      }
    },
    strengths: [
      'Clear structure with both views discussed',
      'Good use of examples',
      'Balanced conclusion',
      'Appropriate academic register'
    ],
    improvements: [
      'Could develop arguments more fully',
      'More sophisticated vocabulary would help',
      'Specific statistics or examples would strengthen points',
      'Some ideas feel slightly underdeveloped'
    ],
    keyVocabulary: [
      'pressing global concerns',
      'systemic change',
      'carbon footprint',
      'corporate accountability',
      'sustainable practices',
      'cumulative effect',
      'eco-friendly products',
      'environmental awareness'
    ],
    usefulPhrases: [
      'There is debate about whether',
      'In my opinion, while X is essential, Y remains important',
      'Those who believe... point to',
      'Conversely, supporters of... argue that',
      'I believe both perspectives have merit'
    ]
  },
  {
    id: 'essay-4',
    type: 'task2',
    topic: 'Health',
    question: 'In many countries, the proportion of older people is steadily increasing. Does this trend have more positive or negative effects on society?',
    bandScore: 7,
    essay: `In recent decades, many countries have experienced a significant increase in the proportion of elderly citizens. This demographic shift brings both challenges and opportunities for society. In my view, while there are notable benefits, the negative effects tend to outweigh the positive ones.

On the positive side, older people contribute valuable experience and wisdom to society. Many seniors continue working past retirement age, sharing their expertise with younger generations. Grandparents often play crucial roles in childcare, allowing parents to pursue careers. Additionally, the growing elderly population has stimulated economic growth in sectors such as healthcare, pharmaceuticals, and leisure activities tailored to seniors.

However, the challenges posed by an aging population are substantial. Healthcare systems face increasing pressure as older people typically require more medical attention. This strains public resources and can lead to longer waiting times and reduced quality of care for all citizens. Furthermore, pension systems in many countries are struggling to support growing numbers of retirees, potentially leading to reduced benefits or increased taxes on the working population.

The economic implications extend beyond healthcare and pensions. A shrinking workforce relative to the retired population can slow economic growth and reduce productivity. Countries may need to rely more heavily on immigration or automation to fill labor gaps, which brings its own set of challenges.

In conclusion, while the increasing proportion of older people brings some benefits to society, I believe the strain on healthcare, pension systems, and the economy represents more significant challenges. Governments must plan carefully to address these issues while respecting and valuing their elderly citizens.`,
    wordCount: 258,
    analysis: {
      taskAchievement: {
        score: 7,
        comments: [
          'Addresses the task appropriately',
          'Clear position maintained',
          'Main ideas are relevant and supported'
        ]
      },
      coherenceCohesion: {
        score: 7,
        comments: [
          'Information organized logically',
          'Clear progression throughout',
          'Some mechanical use of cohesive devices'
        ]
      },
      lexicalResource: {
        score: 7,
        comments: [
          'Sufficient vocabulary for the task',
          'Attempts less common vocabulary',
          'Some repetition of ideas'
        ]
      },
      grammaticalRange: {
        score: 7,
        comments: [
          'Variety of complex structures',
          'Good control with few errors',
          'Some sentences could be more sophisticated'
        ]
      }
    },
    strengths: [
      'Clear opinion stated',
      'Good paragraph structure',
      'Relevant examples provided',
      'Logical argument development'
    ],
    improvements: [
      'Vocabulary could be more varied',
      'Some points need more development',
      'Could use more specific data/examples',
      'Transitions could be smoother'
    ],
    keyVocabulary: [
      'demographic shift',
      'retirement age',
      'healthcare systems',
      'pension systems',
      'shrinking workforce',
      'economic implications',
      'labor gaps',
      'public resources'
    ],
    usefulPhrases: [
      'In recent decades',
      'This demographic shift brings both challenges and opportunities',
      'In my view, while there are notable benefits',
      'The challenges posed by... are substantial',
      'The economic implications extend beyond'
    ]
  },
  {
    id: 'essay-5',
    type: 'task2',
    topic: 'Work',
    question: 'Some people think that it is better to work for a large company, while others prefer to work for a small company. Discuss both views and give your opinion.',
    bandScore: 6.5,
    essay: `Nowadays, people have different opinions about whether it is better to work for a large company or a small one. Both options have advantages and disadvantages. In this essay, I will discuss both views and give my opinion.

Working for a large company has many benefits. Firstly, large companies usually offer better salaries and benefits like health insurance and retirement plans. They also provide more opportunities for career advancement because they have many departments and positions. Additionally, working for a well-known company looks good on your resume and can help you find jobs in the future.

On the other hand, small companies also have their advantages. Employees in small companies often have more responsibilities and can learn different skills. The work environment is usually more friendly and personal. Workers can communicate directly with managers and owners, which makes them feel more valued. Also, small companies can be more flexible with working hours and conditions.

However, there are also disadvantages to both. Large companies can be very bureaucratic and employees may feel like just a number. It can be hard to get noticed or promoted. Small companies may not be as stable financially and may not offer the same level of benefits.

In my opinion, the best choice depends on what you want from your career. If you value stability and benefits, a large company might be better. But if you want more personal growth and a friendly environment, a small company could be the right choice.

In conclusion, both large and small companies have their pros and cons. People should consider their own priorities when making this decision.`,
    wordCount: 268,
    analysis: {
      taskAchievement: {
        score: 6,
        comments: [
          'Addresses the task but some parts more fully than others',
          'Position is clear but conclusion is weak',
          'Main ideas are relevant but lack depth'
        ]
      },
      coherenceCohesion: {
        score: 7,
        comments: [
          'Information is organized logically',
          'Uses cohesive devices but sometimes mechanically',
          'Clear paragraphing'
        ]
      },
      lexicalResource: {
        score: 6,
        comments: [
          'Adequate vocabulary for the task',
          'Some repetition of words',
          'Limited range of less common vocabulary'
        ]
      },
      grammaticalRange: {
        score: 7,
        comments: [
          'Mix of simple and complex sentences',
          'Generally good control',
          'Some errors but meaning is clear'
        ]
      }
    },
    strengths: [
      'Clear structure',
      'Both views discussed',
      'Easy to follow',
      'Personal opinion included'
    ],
    improvements: [
      'Vocabulary is too simple - needs more academic words',
      'Arguments need more specific examples',
      'Conclusion is too brief and generic',
      'Needs more sophisticated sentence structures',
      'Avoid phrases like "In this essay, I will discuss"'
    ],
    keyVocabulary: [
      'career advancement',
      'work environment',
      'bureaucratic',
      'financially stable',
      'personal growth',
      'priorities'
    ],
    usefulPhrases: [
      'Both options have advantages and disadvantages',
      'On the other hand',
      'In my opinion, the best choice depends on',
      'People should consider their own priorities'
    ]
  },
  {
    id: 'essay-6',
    type: 'task1',
    topic: 'Process',
    question: 'The diagram below shows the process of recycling plastic bottles. Summarize the information by selecting and reporting the main features.',
    bandScore: 8,
    essay: `The diagram illustrates the various stages involved in recycling plastic bottles, from collection to the production of new products.

The process begins with the collection of used plastic bottles, which are gathered from households and deposited at recycling centers. Once collected, the bottles are transported to a sorting facility where they are separated by color and type of plastic. This sorting stage is crucial as different plastics require different recycling processes.

Following sorting, the bottles undergo a cleaning process to remove labels, caps, and any residual contents. The cleaned bottles are then shredded into small flakes using industrial machinery. These plastic flakes are subsequently washed again to ensure all contaminants are removed.

In the next stage, the clean plastic flakes are melted down and formed into small pellets. This transformation is essential as pellets are the standard form in which recycled plastic is sold to manufacturers. The pellets are then quality tested to ensure they meet industry standards.

Finally, the recycled plastic pellets are sold to various manufacturers who use them to produce new products. These can include new bottles, clothing fibers, furniture, and numerous other plastic items. This completes the recycling cycle, as these new products will eventually be collected for recycling again.

Overall, the plastic bottle recycling process involves seven main stages: collection, sorting, cleaning, shredding, melting, pelletizing, and manufacturing. The process transforms waste materials into valuable resources, demonstrating an effective approach to reducing plastic waste.`,
    wordCount: 241,
    analysis: {
      taskAchievement: {
        score: 8,
        comments: [
          'Covers all key stages of the process',
          'Clear overview provided',
          'Appropriate level of detail'
        ]
      },
      coherenceCohesion: {
        score: 8,
        comments: [
          'Logical sequencing of stages',
          'Effective use of sequencing language',
          'Clear paragraphing'
        ]
      },
      lexicalResource: {
        score: 8,
        comments: [
          'Good range of vocabulary for describing processes',
          'Appropriate technical vocabulary',
          'Paraphrasing used effectively'
        ]
      },
      grammaticalRange: {
        score: 8,
        comments: [
          'Good use of passive voice',
          'Variety of sentence structures',
          'Accurate grammar throughout'
        ]
      }
    },
    strengths: [
      'Clear overview at beginning and end',
      'Logical progression through stages',
      'Good use of sequencing words',
      'Appropriate passive voice usage',
      'Technical vocabulary used accurately'
    ],
    improvements: [
      'Could include more specific details if provided in diagram',
      'Some stages could be combined for efficiency'
    ],
    keyVocabulary: [
      'recycling centers',
      'sorting facility',
      'industrial machinery',
      'plastic flakes',
      'pellets',
      'contaminants',
      'quality tested',
      'recycling cycle'
    ],
    usefulPhrases: [
      'The diagram illustrates',
      'The process begins with',
      'Following sorting',
      'In the next stage',
      'Finally',
      'Overall, the process involves'
    ]
  }
];

const TOPICS = ['All', 'Education', 'Technology', 'Environment', 'Health', 'Work', 'Process'];
const BAND_SCORES = ['All', '9', '8', '7.5', '7', '6.5'];
const TASK_TYPES = ['All', 'Task 1', 'Task 2'];

export default function EssayBankPage() {
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('essay');
  const [topicFilter, setTopicFilter] = useState('All');
  const [bandFilter, setBandFilter] = useState('All');
  const [taskFilter, setTaskFilter] = useState('All');

  const filteredEssays = SAMPLE_ESSAYS.filter(essay => {
    if (topicFilter !== 'All' && essay.topic !== topicFilter) return false;
    if (bandFilter !== 'All' && essay.bandScore.toString() !== bandFilter) return false;
    if (taskFilter !== 'All') {
      if (taskFilter === 'Task 1' && essay.type !== 'task1') return false;
      if (taskFilter === 'Task 2' && essay.type !== 'task2') return false;
    }
    return true;
  });

  const getBandColor = (band: number) => {
    if (band >= 8.5) return 'bg-green-100 text-green-800 border-green-300';
    if (band >= 7.5) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (band >= 6.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (selectedEssay) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Button variant="ghost" onClick={() => setSelectedEssay(null)} className="mb-4">
            ← Back to Essay Bank
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{selectedEssay.type === 'task1' ? 'Task 1' : 'Task 2'}</Badge>
                <Badge className={getBandColor(selectedEssay.bandScore)}>
                  Band {selectedEssay.bandScore}
                </Badge>
              </div>
              <Badge variant="secondary" className="w-fit mb-2">{selectedEssay.topic}</Badge>
              <CardTitle className="text-xl">{selectedEssay.question}</CardTitle>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            <Card>
              <button
                onClick={() => toggleSection('essay')}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  <span className="font-semibold">Model Essay</span>
                  <Badge variant="outline">{selectedEssay.wordCount} words</Badge>
                </div>
                {expandedSection === 'essay' ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSection === 'essay' && (
                <CardContent className="pt-0">
                  <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700 leading-relaxed">
                    {selectedEssay.essay}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <button
                onClick={() => toggleSection('analysis')}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold">Band Score Analysis</span>
                </div>
                {expandedSection === 'analysis' ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSection === 'analysis' && (
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(selectedEssay.analysis).map(([criterion, data]) => (
                      <div key={criterion} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">
                            {criterion.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <Badge className={getBandColor(data.score)}>{data.score}</Badge>
                        </div>
                        <ul className="space-y-1">
                          {data.comments.map((comment, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {comment}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <button
                onClick={() => toggleSection('strengths')}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">Strengths & Areas for Improvement</span>
                </div>
                {expandedSection === 'strengths' ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSection === 'strengths' && (
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {selectedEssay.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                            <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {selectedEssay.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <button
                onClick={() => toggleSection('vocabulary')}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Key Vocabulary & Useful Phrases</span>
                </div>
                {expandedSection === 'vocabulary' ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSection === 'vocabulary' && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Key Vocabulary</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEssay.keyVocabulary.map((vocab, idx) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50">
                            {vocab}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Useful Phrases</h4>
                      <ul className="space-y-2">
                        {selectedEssay.usefulPhrases.map((phrase, idx) => (
                          <li key={idx} className="text-sm bg-indigo-50 text-indigo-700 px-3 py-2 rounded">
                            "{phrase}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-10 w-10" />
            <h1 className="text-3xl font-bold">Essay Bank</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            Study model essays with band scores and detailed analysis. Learn what makes a Band 9 essay!
          </p>
          
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{SAMPLE_ESSAYS.length}</div>
              <div className="text-sm opacity-80">Essays</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">6-9</div>
              <div className="text-sm opacity-80">Band Range</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{TOPICS.length - 1}</div>
              <div className="text-sm opacity-80">Topics</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  {TOPICS.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={bandFilter} onValueChange={setBandFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Band Score" />
                </SelectTrigger>
                <SelectContent>
                  {BAND_SCORES.map(band => (
                    <SelectItem key={band} value={band}>
                      {band === 'All' ? 'All Bands' : `Band ${band}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={taskFilter} onValueChange={setTaskFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Task Type" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_TYPES.map(task => (
                    <SelectItem key={task} value={task}>{task}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEssays.map(essay => (
            <Card 
              key={essay.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedEssay(essay)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">
                    {essay.type === 'task1' ? 'Task 1' : 'Task 2'}
                  </Badge>
                  <Badge className={getBandColor(essay.bandScore)}>
                    Band {essay.bandScore}
                  </Badge>
                </div>
                <Badge variant="secondary" className="w-fit mb-2">{essay.topic}</Badge>
                <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {essay.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {essay.essay.substring(0, 150)}...
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{essay.wordCount} words</span>
                  <span className="flex items-center gap-1 text-emerald-600 group-hover:translate-x-1 transition-transform">
                    Read Analysis
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEssays.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No essays found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more essays.</p>
          </div>
        )}
      </div>
    </div>
  );
}
