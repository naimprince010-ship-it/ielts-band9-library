import { useMemo } from 'react';
import { 
  BookOpen, AlertTriangle, CheckCircle, 
  Layers, MessageSquare, Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLessons } from '@/contexts/LessonContext';
import { Lesson } from '@/types';

interface CategoryTarget {
  id: string;
  name: string;
  description: string;
  targetLessons: number;
  topics: string[];
  type: 'topic' | 'collocation' | 'speaking' | 'band-upgrade';
}

const VOCABULARY_TARGETS: CategoryTarget[] = [
  { id: 'topic-education', name: 'Education & Learning', description: 'Academic vocabulary, learning processes', targetLessons: 8, topics: ['Education'], type: 'topic' },
  { id: 'topic-environment', name: 'Environment & Climate', description: 'Environmental issues, sustainability', targetLessons: 8, topics: ['Environment'], type: 'topic' },
  { id: 'topic-technology', name: 'Technology & Innovation', description: 'Digital transformation, AI, social media', targetLessons: 8, topics: ['Technology'], type: 'topic' },
  { id: 'topic-health', name: 'Health & Wellbeing', description: 'Medical vocabulary, healthcare, fitness', targetLessons: 8, topics: ['Health'], type: 'topic' },
  { id: 'topic-economy', name: 'Economy & Business', description: 'Economic systems, trade, finance', targetLessons: 8, topics: ['Economy'], type: 'topic' },
  { id: 'topic-society', name: 'Society & Culture', description: 'Social issues, cultural diversity', targetLessons: 8, topics: ['Society', 'Culture'], type: 'topic' },
  { id: 'topic-government', name: 'Government & Law', description: 'Politics, public policy, legislation', targetLessons: 6, topics: ['Government'], type: 'topic' },
  { id: 'topic-media', name: 'Media & Communication', description: 'Journalism, social media', targetLessons: 6, topics: ['Media'], type: 'topic' },
  { id: 'topic-science', name: 'Science & Research', description: 'Scientific methodology, discoveries', targetLessons: 6, topics: ['Science'], type: 'topic' },
  { id: 'topic-work', name: 'Work & Career', description: 'Employment, career development', targetLessons: 6, topics: ['Work'], type: 'topic' },
  { id: 'topic-travel', name: 'Travel & Tourism', description: 'Travel vocabulary, tourism', targetLessons: 4, topics: ['Travel'], type: 'topic' },
  { id: 'topic-crime', name: 'Crime & Justice', description: 'Crime vocabulary, legal system', targetLessons: 4, topics: ['Crime'], type: 'topic' },
  { id: 'topic-transport', name: 'Transport & Infrastructure', description: 'Transportation, urban planning', targetLessons: 4, topics: ['Transport'], type: 'topic' },
  
  { id: 'colloc-general', name: 'General Collocations', description: 'Verb+Noun, Adj+Noun collocations', targetLessons: 10, topics: ['Collocations'], type: 'collocation' },
  
  { id: 'speaking-functions', name: 'Speaking Functions', description: 'Opinion, agree/disagree, examples', targetLessons: 8, topics: ['Speaking'], type: 'speaking' },
  
  { id: 'band-upgrade', name: 'Band Upgrade Packs', description: 'Band 5→6, 6→7, 7→8, 8→9', targetLessons: 10, topics: ['Band Upgrade'], type: 'band-upgrade' },
  
  { id: 'word-families', name: 'Word Families', description: 'Word formation patterns', targetLessons: 6, topics: ['Word Families'], type: 'topic' },
];

interface CategoryProgress {
  category: CategoryTarget;
  currentLessons: number;
  lessons: Lesson[];
  progress: number;
  remaining: number;
  status: 'complete' | 'in_progress' | 'not_started';
}

export function VocabularyCoverageDashboard() {
  const { lessons } = useLessons();
  
  const vocabularyLessons = useMemo(() => 
    lessons.filter(l => l.type === 'vocabulary' && l.is_published),
    [lessons]
  );

  const categoryProgress = useMemo((): CategoryProgress[] => {
    return VOCABULARY_TARGETS.map(category => {
      const matchingLessons = vocabularyLessons.filter(lesson => 
        category.topics.some(topic => 
          lesson.topic.toLowerCase().includes(topic.toLowerCase()) ||
          topic.toLowerCase().includes(lesson.topic.toLowerCase())
        )
      );
      
      const currentLessons = matchingLessons.length;
      const progress = Math.min(100, Math.round((currentLessons / category.targetLessons) * 100));
      const remaining = Math.max(0, category.targetLessons - currentLessons);
      
      let status: 'complete' | 'in_progress' | 'not_started' = 'not_started';
      if (currentLessons >= category.targetLessons) {
        status = 'complete';
      } else if (currentLessons > 0) {
        status = 'in_progress';
      }
      
      return {
        category,
        currentLessons,
        lessons: matchingLessons,
        progress,
        remaining,
        status
      };
    });
  }, [vocabularyLessons]);

  const topicCategories = categoryProgress.filter(c => c.category.type === 'topic');
  const collocationCategories = categoryProgress.filter(c => c.category.type === 'collocation');
  const speakingCategories = categoryProgress.filter(c => c.category.type === 'speaking');
  const bandUpgradeCategories = categoryProgress.filter(c => c.category.type === 'band-upgrade');

  const totalTarget = VOCABULARY_TARGETS.reduce((sum, c) => sum + c.targetLessons, 0);
  const totalCurrent = categoryProgress.reduce((sum, c) => sum + c.currentLessons, 0);
  const overallProgress = Math.round((totalCurrent / totalTarget) * 100);
  
  const gapsHighPriority = categoryProgress.filter(c => 
    c.status !== 'complete' && c.remaining > 0
  ).sort((a, b) => b.remaining - a.remaining);

  const renderCategoryCard = (cp: CategoryProgress) => (
    <div key={cp.category.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{cp.category.name}</h4>
          <p className="text-xs text-gray-500">{cp.category.description}</p>
        </div>
        <Badge 
          className={
            cp.status === 'complete' ? 'bg-green-100 text-green-800' :
            cp.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-600'
          }
        >
          {cp.currentLessons}/{cp.category.targetLessons}
        </Badge>
      </div>
      <Progress value={cp.progress} className="h-2 mb-2" />
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{cp.progress}% complete</span>
        {cp.remaining > 0 && (
          <span className="text-amber-600 font-medium">
            {cp.remaining} lessons needed
          </span>
        )}
        {cp.status === 'complete' && (
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Complete
          </span>
        )}
      </div>
    </div>
  );

  const renderCategorySection = (
    title: string, 
    icon: React.ReactNode, 
    categories: CategoryProgress[],
    color: string
  ) => {
    const sectionTotal = categories.reduce((sum, c) => sum + c.category.targetLessons, 0);
    const sectionCurrent = categories.reduce((sum, c) => sum + c.currentLessons, 0);
    const sectionProgress = Math.round((sectionCurrent / sectionTotal) * 100);
    
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {icon}
              {title}
            </CardTitle>
            <div className="text-right">
              <span className={`text-2xl font-bold ${color}`}>{sectionCurrent}</span>
              <span className="text-gray-400">/{sectionTotal}</span>
              <p className="text-xs text-gray-500">{sectionProgress}% coverage</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {categories.map(renderCategoryCard)}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Vocabulary Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-600">{vocabularyLessons.length}</p>
            <p className="text-xs text-gray-500">published lessons</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Overall Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{overallProgress}%</p>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Categories Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {categoryProgress.filter(c => c.status === 'complete').length}
              <span className="text-lg text-gray-400">/{VOCABULARY_TARGETS.length}</span>
            </p>
            <p className="text-xs text-gray-500">categories at 100%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Lessons Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">
              {categoryProgress.reduce((sum, c) => sum + c.remaining, 0)}
            </p>
            <p className="text-xs text-gray-500">to reach all targets</p>
          </CardContent>
        </Card>
      </div>

      {gapsHighPriority.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Content Gaps - Priority Areas
            </CardTitle>
            <CardDescription className="text-amber-700">
              Categories that need the most attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {gapsHighPriority.slice(0, 6).map(cp => (
                <div key={cp.category.id} className="bg-white rounded-lg p-3 border border-amber-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{cp.category.name}</span>
                    <Badge variant="outline" className="text-amber-700 border-amber-300">
                      -{cp.remaining}
                    </Badge>
                  </div>
                  <Progress value={cp.progress} className="h-1.5 mb-1" />
                  <p className="text-xs text-gray-600">
                    {cp.currentLessons} of {cp.category.targetLessons} lessons ({cp.progress}%)
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderCategorySection(
          'Topic-Based Vocabulary',
          <BookOpen className="h-5 w-5 text-indigo-600" />,
          topicCategories,
          'text-indigo-600'
        )}
        
        <div className="space-y-6">
          {renderCategorySection(
            'Collocations',
            <Layers className="h-5 w-5 text-purple-600" />,
            collocationCategories,
            'text-purple-600'
          )}
          
          {renderCategorySection(
            'Speaking Functions',
            <MessageSquare className="h-5 w-5 text-green-600" />,
            speakingCategories,
            'text-green-600'
          )}
          
          {renderCategorySection(
            'Band Upgrade Packs',
            <Award className="h-5 w-5 text-amber-600" />,
            bandUpgradeCategories,
            'text-amber-600'
          )}
        </div>
      </div>
    </div>
  );
}
