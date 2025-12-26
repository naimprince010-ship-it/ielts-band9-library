import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  GraduationCap, 
  PenTool, 
  Target,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  Globe,
  Heart,
  Lightbulb,
  Sparkles
} from 'lucide-react';

interface CollectionLesson {
  title: string;
  link: string;
  type: string;
}

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
  lessons: CollectionLesson[];
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
    lessons: [
      { title: 'Task 2 Essay Structure', link: '/writing', type: 'writing' },
      { title: 'Opinion Essay Mastery', link: '/writing', type: 'writing' },
      { title: 'Discussion Essay Format', link: '/writing', type: 'writing' },
      { title: 'Problem-Solution Essays', link: '/writing', type: 'writing' },
      { title: 'Advantages-Disadvantages', link: '/writing', type: 'writing' },
      { title: 'Linking Words & Cohesion', link: '/grammar', type: 'grammar' },
      { title: 'Complex Sentence Structures', link: '/grammar', type: 'grammar' },
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
    lessons: [
      { title: 'Subject-Verb Agreement', link: '/grammar', type: 'grammar' },
      { title: 'Article Usage (a/an/the)', link: '/grammar', type: 'grammar' },
      { title: 'Tense Consistency', link: '/grammar', type: 'grammar' },
      { title: 'Preposition Errors', link: '/grammar', type: 'grammar' },
      { title: 'Run-on Sentences', link: '/grammar', type: 'grammar' },
      { title: 'Comma Splices', link: '/grammar', type: 'grammar' },
      { title: 'Pronoun Reference', link: '/grammar', type: 'grammar' },
      { title: 'Parallel Structure', link: '/grammar', type: 'grammar' },
      { title: 'Word Form Errors', link: '/grammar', type: 'grammar' },
      { title: 'Conditional Mistakes', link: '/grammar', type: 'grammar' }
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
    lessons: [
      { title: 'Academic Vocabulary: Education', link: '/vocabulary', type: 'vocabulary' },
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
      { title: 'Environment & Climate Change', link: '/vocabulary', type: 'vocabulary' },
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
      { title: 'Health & Medicine Vocabulary', link: '/vocabulary', type: 'vocabulary' },
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
      { title: 'Work & Employment Vocabulary', link: '/vocabulary', type: 'vocabulary' },
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
      { title: 'Mixed Conditionals', link: '/grammar', type: 'grammar' },
      { title: 'Subjunctive Mood', link: '/grammar', type: 'grammar' },
      { title: 'Ellipsis & Substitution', link: '/grammar', type: 'grammar' },
      { title: 'Nominalization', link: '/grammar', type: 'grammar' },
      { title: 'Advanced Relative Clauses', link: '/grammar', type: 'grammar' }
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
    lessons: [
      { title: 'IELTS Overview & Format', link: '/diagnostic', type: 'diagnostic' },
      { title: 'Basic Vocabulary Building', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Essential Grammar Review', link: '/grammar', type: 'grammar' },
      { title: 'Simple Sentence Structures', link: '/grammar', type: 'grammar' },
      { title: 'Common Collocations', link: '/vocabulary', type: 'vocabulary' },
      { title: 'Reading Basics', link: '/reading-practice', type: 'reading' },
      { title: 'Writing Task 2 Introduction', link: '/writing', type: 'writing' },
      { title: 'Speaking Part 1 Basics', link: '/speaking', type: 'speaking' },
      { title: 'Practice Quiz', link: '/quiz', type: 'quiz' },
      { title: 'Flashcard Review', link: '/flashcards', type: 'review' }
    ]
  }
];

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'vocabulary':
      return <BookOpen className="h-4 w-4 text-blue-600" />;
    case 'grammar':
      return <GraduationCap className="h-4 w-4 text-green-600" />;
    case 'writing':
      return <PenTool className="h-4 w-4 text-purple-600" />;
    case 'speaking':
      return <Target className="h-4 w-4 text-orange-600" />;
    case 'reading':
      return <BookOpen className="h-4 w-4 text-indigo-600" />;
    case 'quiz':
      return <Target className="h-4 w-4 text-pink-600" />;
    case 'review':
      return <CheckCircle2 className="h-4 w-4 text-cyan-600" />;
    default:
      return <BookOpen className="h-4 w-4 text-gray-600" />;
  }
};

export default function CollectionDetailPage() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();

  const collection = CURATED_COLLECTIONS.find(c => c.id === collectionId);

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The collection you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/collections')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collections
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = collection.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/collections')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Collections
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 ${collection.bgColor} rounded-xl flex items-center justify-center`}>
                <IconComponent className={`h-8 w-8 ${collection.color}`} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{collection.title}</CardTitle>
                <CardDescription className="text-base">{collection.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="outline" className="text-sm">
                <Target className="h-3 w-3 mr-1" />
                Band {collection.targetBand}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <BookOpen className="h-3 w-3 mr-1" />
                {collection.lessonCount} lessons
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Clock className="h-3 w-3 mr-1" />
                {collection.estimatedTime}
              </Badge>
              <Badge variant="secondary" className="text-sm capitalize">
                {collection.difficulty}
              </Badge>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Your Progress</span>
                <span className="font-medium">0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Lessons in this Collection</h2>
        
        <div className="space-y-3">
          {collection.lessons.map((lesson, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      {getLessonIcon(lesson.type)}
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {lesson.type}
                    </Badge>
                  </div>
                  <Link to={lesson.link}>
                    <Button size="sm">
                      Start
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-indigo-50 rounded-xl text-center">
          <h3 className="font-semibold mb-2">Ready to start learning?</h3>
          <p className="text-gray-600 mb-4">Begin with the first lesson and work your way through the collection.</p>
          <Link to={collection.lessons[0]?.link || '/vocabulary'}>
            <Button size="lg">
              Start First Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
