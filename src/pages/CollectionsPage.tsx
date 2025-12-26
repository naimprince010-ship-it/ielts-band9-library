import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  GraduationCap, 
  PenTool, 
  Target,
  Search,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  Globe,
  Heart,
  Lightbulb
} from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  description: string;
  category: 'vocabulary' | 'grammar' | 'writing' | 'mixed';
  targetBand: string;
  lessonCount: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: typeof BookOpen;
  color: string;
  bgColor: string;
  lessons: { title: string; link: string; type: string }[];
  popular?: boolean;
  new?: boolean;
}

const CURATED_COLLECTIONS: Collection[] = [
  {
    id: 'band7-writing-toolkit',
    title: 'Band 7 Writing Toolkit',
    description: 'Essential writing skills and templates to achieve Band 7 in IELTS Writing Task 2',
    category: 'writing',
    targetBand: '7.0+',
    lessonCount: 8,
    estimatedTime: '4 hours',
    difficulty: 'intermediate',
    icon: PenTool,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    popular: true,
    lessons: [
      { title: 'Task 2 Essay Structure', link: '/lesson/task2-essay-structure', type: 'writing' },
      { title: 'Opinion Essay Mastery', link: '/lesson/opinion-essay-technology', type: 'writing' },
      { title: 'Discussion Essay Format', link: '/lesson/discussion-essay-education', type: 'writing' },
      { title: 'Problem-Solution Essays', link: '/lesson/problem-solution-urban-traffic', type: 'writing' },
      { title: 'Advantages-Disadvantages', link: '/lesson/advantages-disadvantages-remote-work', type: 'writing' },
      { title: 'Linking Words & Cohesion', link: '/grammar', type: 'grammar' },
      { title: 'Complex Sentence Structures', link: '/lesson/mastering-conditional-sentences', type: 'grammar' },
      { title: 'Academic Vocabulary for Writing', link: '/vocabulary', type: 'vocabulary' }
    ]
  },
  {
    id: 'common-grammar-mistakes',
    title: 'Most Common Grammar Mistakes',
    description: 'Fix the top 10 grammar errors that cost IELTS candidates band scores',
    category: 'grammar',
    targetBand: '6.5+',
    lessonCount: 10,
    estimatedTime: '3 hours',
    difficulty: 'intermediate',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    popular: true,
    lessons: [
      { title: 'Subject-Verb Agreement', link: '/grammar', type: 'grammar' },
      { title: 'Article Usage (a/an/the)', link: '/lesson/articles-determiners', type: 'grammar' },
      { title: 'Tense Consistency', link: '/lesson/verb-tenses-overview', type: 'grammar' },
      { title: 'Preposition Errors', link: '/grammar', type: 'grammar' },
      { title: 'Run-on Sentences', link: '/grammar', type: 'grammar' },
      { title: 'Comma Splices', link: '/grammar', type: 'grammar' },
      { title: 'Pronoun Reference', link: '/grammar', type: 'grammar' },
      { title: 'Parallel Structure', link: '/grammar', type: 'grammar' },
      { title: 'Word Form Errors', link: '/grammar', type: 'grammar' },
      { title: 'Conditional Mistakes', link: '/lesson/mastering-conditional-sentences', type: 'grammar' }
    ]
  },
  {
    id: 'education-vocabulary-pack',
    title: 'Education Vocabulary Pack',
    description: 'Complete vocabulary set for education topics - one of the most common IELTS themes',
    category: 'vocabulary',
    targetBand: '7.0+',
    lessonCount: 6,
    estimatedTime: '2.5 hours',
    difficulty: 'intermediate',
    icon: GraduationCap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    new: true,
    lessons: [
      { title: 'Academic Vocabulary: Education', link: '/lesson/academic-vocabulary-education-learning', type: 'vocabulary' },
      { title: 'Education Collocations', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Learning Process Words', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Academic Achievement Terms', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Education System Vocabulary', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Education Essay Practice', link: '/writing-checker', type: 'writing' }
    ]
  },
  {
    id: 'environment-vocabulary-pack',
    title: 'Environment & Climate Pack',
    description: 'Master vocabulary for environmental topics - frequently tested in IELTS',
    category: 'vocabulary',
    targetBand: '7.0+',
    lessonCount: 5,
    estimatedTime: '2 hours',
    difficulty: 'intermediate',
    icon: Globe,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    lessons: [
      { title: 'Environment & Climate Change', link: '/lesson/environment-climate-change-vocabulary', type: 'vocabulary' },
      { title: 'Sustainability Terms', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Pollution & Solutions', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Nature & Wildlife', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Environment Essay Practice', link: '/writing-checker', type: 'writing' }
    ]
  },
  {
    id: 'health-vocabulary-pack',
    title: 'Health & Wellbeing Pack',
    description: 'Essential vocabulary for health-related IELTS topics',
    category: 'vocabulary',
    targetBand: '7.0+',
    lessonCount: 5,
    estimatedTime: '2 hours',
    difficulty: 'intermediate',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    lessons: [
      { title: 'Health & Medicine Vocabulary', link: '/lesson/health-medicine-vocabulary', type: 'vocabulary' },
      { title: 'Mental Health Terms', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Fitness & Lifestyle', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Healthcare Systems', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Health Essay Practice', link: '/writing-checker', type: 'writing' }
    ]
  },
  {
    id: 'work-career-pack',
    title: 'Work & Career Pack',
    description: 'Vocabulary for employment, career, and workplace topics',
    category: 'vocabulary',
    targetBand: '7.0+',
    lessonCount: 5,
    estimatedTime: '2 hours',
    difficulty: 'intermediate',
    icon: Briefcase,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    lessons: [
      { title: 'Work & Employment Vocabulary', link: '/lesson/work-employment-vocabulary', type: 'vocabulary' },
      { title: 'Career Development Terms', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Workplace Communication', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Job Interview Phrases', link: '/speaking', type: 'speaking' },
      { title: 'Work Essay Practice', link: '/writing-checker', type: 'writing' }
    ]
  },
  {
    id: 'band8-advanced-grammar',
    title: 'Band 8+ Advanced Grammar',
    description: 'Complex grammar structures that distinguish Band 8+ candidates',
    category: 'grammar',
    targetBand: '8.0+',
    lessonCount: 8,
    estimatedTime: '4 hours',
    difficulty: 'advanced',
    icon: TrendingUp,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    lessons: [
      { title: 'Inversion for Emphasis', link: '/grammar', type: 'grammar' },
      { title: 'Cleft Sentences', link: '/grammar', type: 'grammar' },
      { title: 'Participle Clauses', link: '/grammar', type: 'grammar' },
      { title: 'Mixed Conditionals', link: '/lesson/mastering-conditional-sentences', type: 'grammar' },
      { title: 'Subjunctive Mood', link: '/grammar', type: 'grammar' },
      { title: 'Ellipsis & Substitution', link: '/grammar', type: 'grammar' },
      { title: 'Nominalization', link: '/grammar', type: 'grammar' },
      { title: 'Advanced Relative Clauses', link: '/lesson/relative-clauses-mastery', type: 'grammar' }
    ]
  },
  {
    id: 'quick-start-beginners',
    title: 'Quick Start for Beginners',
    description: 'Essential foundations for IELTS newcomers - start your journey here',
    category: 'mixed',
    targetBand: '5.5-6.0',
    lessonCount: 10,
    estimatedTime: '5 hours',
    difficulty: 'beginner',
    icon: Lightbulb,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    new: true,
    lessons: [
      { title: 'IELTS Overview & Format', link: '/diagnostic', type: 'diagnostic' },
      { title: 'Basic Vocabulary Building', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Essential Grammar Review', link: '/grammar', type: 'grammar' },
      { title: 'Simple Sentence Structures', link: '/grammar', type: 'grammar' },
      { title: 'Common Collocations', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Reading Basics', link: '/reading', type: 'reading' },
      { title: 'Writing Task 2 Introduction', link: '/writing', type: 'writing' },
      { title: 'Speaking Part 1 Basics', link: '/speaking', type: 'speaking' },
      { title: 'Practice Quiz', link: '/quiz', type: 'quiz' },
      { title: 'Flashcard Review', link: '/flashcards', type: 'review' }
    ]
  }
];

export default function CollectionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredCollections = CURATED_COLLECTIONS.filter(collection => {
    const matchesSearch = collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || collection.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || collection.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = [
    { value: 'all', label: 'All Collections' },
    { value: 'vocabulary', label: 'Vocabulary' },
    { value: 'grammar', label: 'Grammar' },
    { value: 'writing', label: 'Writing' },
    { value: 'mixed', label: 'Mixed' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Curated Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hand-picked learning paths designed by IELTS experts. Each collection focuses on specific skills 
            to help you reach your target band score efficiently.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            {difficulties.map(diff => (
              <Button
                key={diff.value}
                variant={selectedDifficulty === diff.value ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedDifficulty(diff.value)}
              >
                {diff.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCollections.map(collection => (
            <Card 
              key={collection.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(`/collections/${collection.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 ${collection.bgColor} rounded-lg flex items-center justify-center`}>
                    <collection.icon className={`h-6 w-6 ${collection.color}`} />
                  </div>
                  <div className="flex gap-2">
                    {collection.popular && (
                      <Badge variant="default" className="bg-amber-500">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {collection.new && (
                      <Badge variant="default" className="bg-green-500">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg mt-3 group-hover:text-indigo-600 transition-colors">
                  {collection.title}
                </CardTitle>
                <CardDescription>{collection.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">
                    <Target className="h-3 w-3 mr-1" />
                    Band {collection.targetBand}
                  </Badge>
                  <Badge variant="outline">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {collection.lessonCount} lessons
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    {collection.estimatedTime}
                  </Badge>
                  <Badge variant="secondary">
                    {collection.difficulty}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <Button 
                  className="w-full mt-4 group-hover:bg-indigo-600"
                  variant="outline"
                >
                  Start Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No collections found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Not sure where to start?</h2>
          <p className="mb-6 opacity-90">Take our diagnostic test to get personalized recommendations</p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/diagnostic')}
          >
            Take Diagnostic Test
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
