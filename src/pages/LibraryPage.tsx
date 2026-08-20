import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, GraduationCap, Star, Bookmark, BookmarkCheck, Clock, CheckCircle2, Circle, TrendingUp, PenTool, Mic, ArrowUp, X, Sparkles, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLessons } from '@/contexts/LessonContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { LessonType, LessonLevel } from '@/types';
import { GRAMMAR_TOPICS, VOCABULARY_TOPICS, WRITING_TOPICS, SPEAKING_TOPICS, SAMPLE_LESSONS } from '@/data/sampleLessons';
import { hasDeepVocabularyLesson } from '@/data/deepVocabularyLessons';
import { LessonGridSkeleton } from '@/components/ui/PageSkeleton';

interface LibraryPageProps {
  type: LessonType;
}

const getEstimatedTime = (lesson: { content: { examples: unknown[] } }): number => {
  const exampleCount = lesson.content?.examples?.length || 0;
  return Math.max(10, Math.round(exampleCount * 1.5 + 5));
};

const isBandUpgradeLesson = (topic: string): boolean => {
  return topic.toLowerCase().includes('band upgrade') || topic.toLowerCase().includes('upgrade');
};

type SortOption = 'newest' | 'oldest' | 'popular' | 'az' | 'za';
type VocabularyPathTab = 'all' | 'deep' | 'band-upgrade' | 'collocations' | 'writing' | 'speaking';
const ITEMS_PER_PAGE = 12;

const VOCABULARY_PATH_TABS: Array<{ value: VocabularyPathTab; label: string }> = [
  { value: 'all', label: 'All Lessons' },
  { value: 'deep', label: 'Interactive Deep' },
  { value: 'band-upgrade', label: 'Band Upgrade' },
  { value: 'collocations', label: 'Collocations' },
  { value: 'writing', label: 'Writing Vocabulary' },
  { value: 'speaking', label: 'Speaking Vocabulary' },
];

const getVocabularyTabMatch = (lesson: { slug: string; title: string; description: string; topic: string }, tab: VocabularyPathTab): boolean => {
  const haystack = `${lesson.slug} ${lesson.title} ${lesson.description} ${lesson.topic}`.toLowerCase();

  switch (tab) {
    case 'all':
      return true;
    case 'deep':
      return hasDeepVocabularyLesson(lesson.slug);
    case 'band-upgrade':
      return haystack.includes('band') || haystack.includes('upgrade');
    case 'collocations':
      return haystack.includes('collocation');
    case 'writing':
      return haystack.includes('academic writing') || haystack.includes('writing');
    case 'speaking':
      return haystack.includes('speaking') || haystack.includes('phrase') || haystack.includes('phrases');
    default:
      return true;
  }
};

export function LibraryPage({ type }: LibraryPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [levelFilter, setLevelFilter] = useState<LessonLevel | 'all'>('all');
    const [topicFilter, setTopicFilter] = useState<string>(searchParams.get('topic') || 'all');
  const [vocabularyTab, setVocabularyTab] = useState<VocabularyPathTab>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  
  const { lessons, loading, fetchLessons, addBookmark, removeBookmark, isBookmarked, getLessonProgress, getCompletionPercentage, getCompletedCount } = useLessons();
  const { user } = useAuth();
  useProgress();
  const isVocabulary = type === 'vocabulary';
  const isGrammar = type === 'grammar';
  const isWriting = type === 'writing';

  const topics = type === 'vocabulary' ? VOCABULARY_TOPICS : type === 'writing' ? WRITING_TOPICS : type === 'speaking' ? SPEAKING_TOPICS : GRAMMAR_TOPICS;
  const filteredLessons = lessons.filter(l => l.type === type);
  const vocabularyTabCounts = useMemo(() => {
    if (type !== 'vocabulary') return null;

    const vocabularyLessons = SAMPLE_LESSONS.filter((lesson) => lesson.type === 'vocabulary');
    const counts = VOCABULARY_PATH_TABS.reduce((acc, tab) => {
      acc[tab.value] = tab.value === 'all'
        ? vocabularyLessons.length
        : vocabularyLessons.filter((lesson) => getVocabularyTabMatch(lesson, tab.value)).length;
      return acc;
    }, {} as Record<VocabularyPathTab, number>);

    return counts;
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      if (filterRef.current) {
        const rect = filterRef.current.getBoundingClientRect();
        setIsFilterSticky(rect.top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setHeroReady(false);
    const rafId = window.requestAnimationFrame(() => setHeroReady(true));
    return () => window.cancelAnimationFrame(rafId);
  }, [type]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setLevelFilter('all');
    setTopicFilter('all');
    setVocabularyTab('all');
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  }, [setSearchParams]);

  const hasActiveFilters = searchQuery || levelFilter !== 'all' || topicFilter !== 'all' || sortBy !== 'newest' || vocabularyTab !== 'all';

  const topicCounts = useMemo(() => {
    const allLessonsOfType = SAMPLE_LESSONS.filter(l => l.type === type);
    const counts: Record<string, number> = {};
    topics.forEach(topic => {
      counts[topic.toLowerCase()] = allLessonsOfType.filter(
        l => l.topic.toLowerCase() === topic.toLowerCase()
      ).length;
    });
    return counts;
  }, [type, topics]);

  const completionPercent = getCompletionPercentage(type);
  const completedCount = getCompletedCount(type);
  const totalLessons = SAMPLE_LESSONS.filter(l => l.type === type).length;
  const featuredDeepVocabularyLessons = useMemo(
    () =>
      type === 'vocabulary'
        ? filteredLessons.filter((lesson) => hasDeepVocabularyLesson(lesson.slug))
        : [],
    [type, filteredLessons]
  );

  useEffect(() => {
    const level = levelFilter === 'all' ? undefined : levelFilter;
    fetchLessons(type, level, searchQuery || undefined);
  }, [type, levelFilter, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  const handleBookmarkToggle = async (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    
    if (isBookmarked(lessonId)) {
      await removeBookmark(lessonId);
    } else {
      await addBookmark(lessonId);
    }
  };

  const sortedAndFilteredLessons = useMemo(() => {
    let result = filteredLessons;

    if (type === 'vocabulary') {
      result = result.filter((lesson) => getVocabularyTabMatch(lesson, vocabularyTab));
    }

    result = topicFilter === 'all'
      ? result
      : result.filter(l => l.topic.toLowerCase() === topicFilter.toLowerCase());
    
    switch (sortBy) {
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        result = [...result].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'popular':
        result = [...result].sort((a, b) => b.view_count - a.view_count);
        break;
      case 'az':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
    return result;
  }, [filteredLessons, topicFilter, sortBy, type, vocabularyTab]);

  const totalPages = Math.ceil(sortedAndFilteredLessons.length / ITEMS_PER_PAGE);
  const displayLessons = sortedAndFilteredLessons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, levelFilter, topicFilter, sortBy, vocabularyTab]);

  return (
    <div className={`min-h-screen ${isVocabulary ? 'bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_42%,_#f8fafc_100%)]' : isGrammar ? 'bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_30%),linear-gradient(180deg,_#f8faff_0%,_#ffffff_42%,_#f8fafc_100%)]' : isWriting ? 'bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.16),_transparent_32%),linear-gradient(180deg,_#fffaf8_0%,_#ffffff_42%,_#fdf7f4_100%)]' : 'bg-background'}`}>
      <div className={`${isVocabulary ? 'border-b border-indigo-200/70 bg-[linear-gradient(135deg,#0f1b3d_0%,#1d2d64_55%,#1f4e7a_100%)] py-9 text-white sm:py-11' : isGrammar ? 'border-b border-indigo-200/70 bg-[linear-gradient(135deg,#0d1437_0%,#1b1d54_52%,#36228d_100%)] py-9 text-white sm:py-11' : isWriting ? 'border-b border-rose-200/70 bg-[linear-gradient(135deg,#311225_0%,#5a213f_52%,#7c2f4b_100%)] py-9 text-white sm:py-11' : 'bg-foreground py-12 text-background'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-4 shadow-[0_28px_65px_-30px_rgba(15,23,42,0.75)] backdrop-blur-sm sm:p-5">
            <div className={`mb-4 flex items-center gap-3 transition-all duration-500 ease-out ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isVocabulary ? 'bg-cyan-400/15 text-cyan-100' : isGrammar ? 'bg-indigo-400/15 text-indigo-100' : isWriting ? 'bg-rose-400/15 text-rose-100' : 'bg-white/10 text-white'} ring-1 ring-white/15`}>
                {type === 'vocabulary' ? (
                  <BookOpen className="h-5 w-5" />
                ) : type === 'writing' ? (
                  <PenTool className="h-5 w-5" />
                ) : type === 'speaking' ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <GraduationCap className="h-5 w-5" />
                )}
              </div>
              <h1 className="text-3xl font-black capitalize tracking-tight sm:text-4xl">{type} Library</h1>
            </div>
            <p className={`max-w-2xl text-base transition-all delay-75 duration-500 ease-out sm:text-lg ${isVocabulary ? 'text-blue-100' : isGrammar ? 'text-indigo-100' : isWriting ? 'text-rose-100' : 'opacity-90'} ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
              {type === 'vocabulary' 
                ? 'Master academic vocabulary, collocations, and speaking phrases for IELTS Band 7+.'
                : type === 'writing'
                ? 'Master IELTS Writing with Band 9 model answers, Band Upgrade Ladder, and examiner insights.'
                : type === 'speaking'
                ? 'Master IELTS Speaking with Band 9 model answers, fluency techniques, and Part 1-2-3 strategies.'
                : 'Learn essential grammar structures with clear explanations, examples, and practice exercises.'}
            </p>

          {isVocabulary && (
            <div className={`mt-5 flex flex-wrap items-center gap-2 transition-all delay-100 duration-500 ease-out ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
              <Badge className="border border-white/20 bg-white/10 text-white hover:bg-white/15">{totalLessons} total lessons</Badge>
              <Badge className="border border-cyan-300/40 bg-cyan-400/15 text-cyan-100 hover:bg-cyan-400/20">Band 7+ roadmap</Badge>
              <Badge className="border border-emerald-300/40 bg-emerald-400/15 text-emerald-100 hover:bg-emerald-400/20">Collocations + speaking focus</Badge>
            </div>
          )}

          {isGrammar && (
            <div className={`mt-5 flex flex-wrap items-center gap-2 transition-all delay-100 duration-500 ease-out ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
              <Badge className="border border-white/20 bg-white/10 text-white hover:bg-white/15">{totalLessons} grammar lessons</Badge>
              <Badge className="border border-indigo-300/40 bg-indigo-400/15 text-indigo-100 hover:bg-indigo-400/20">Band 8 control</Badge>
              <Badge className="border border-emerald-300/40 bg-emerald-400/15 text-emerald-100 hover:bg-emerald-400/20">Upgrade ladder</Badge>
            </div>
          )}

          {isWriting && (
            <div className={`mt-5 flex flex-wrap items-center gap-2 transition-all delay-100 duration-500 ease-out ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
              <Badge className="border border-white/20 bg-white/10 text-white hover:bg-white/15">{totalLessons} writing lessons</Badge>
              <Badge className="border border-rose-300/40 bg-rose-400/15 text-rose-100 hover:bg-rose-400/20">Band 8+ structure</Badge>
              <Badge className="border border-amber-300/40 bg-amber-400/15 text-amber-100 hover:bg-amber-400/20">Exam-ready argument flow</Badge>
            </div>
          )}
          
                    {user && (
                      <div className={`mt-6 max-w-md rounded-xl p-4 transition-all delay-150 duration-500 ease-out ${isVocabulary || isWriting ? 'border border-white/20 bg-white/10 shadow-lg shadow-slate-950/20 backdrop-blur-sm' : 'bg-white/10'} ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Your Progress</span>
                          <span className="text-sm">{completedCount} / {totalLessons} lessons completed</span>
                        </div>
                        <Progress value={completionPercent} className="h-2 bg-white/20" />
                        <p className="text-xs mt-2 opacity-80">
                          {completionPercent}% complete - {totalLessons - completedCount} lessons remaining
                        </p>
                      </div>
                    )}
          
                    {type === 'grammar' && (
                      <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-slate-950/10 backdrop-blur-sm">
                        <p className="mb-3 text-sm font-medium text-indigo-100">Choose your learning style:</p>
                        <div className="flex flex-wrap gap-3">
                          <Link to="/grammar-exercises">
                            <Button className="gap-2 bg-white text-slate-950 hover:bg-indigo-50">
                              <ListChecks className="h-4 w-4" />
                              Traditional Exercises
                            </Button>
                          </Link>
                          <Link to="/grammar/natural">
                            <Button variant="outline" className="gap-2 border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                              <Sparkles className="h-4 w-4" />
                              Natural Approach
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {type === 'vocabulary' && (
          <div className="mb-3 rounded-2xl border border-indigo-200/70 bg-gradient-to-r from-white via-indigo-50/60 to-cyan-50/45 p-2.5 shadow-sm shadow-slate-200/70 sm:mb-4 sm:p-4">
            <div className="overflow-x-visible pb-1">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {VOCABULARY_PATH_TABS.map((tab) => {
                  const active = vocabularyTab === tab.value;
                  const count = vocabularyTabCounts?.[tab.value] ?? 0;

                  return (
                    <Button
                      key={tab.value}
                      type="button"
                      variant={active ? 'default' : 'outline'}
                      onClick={() => setVocabularyTab(tab.value)}
                      className={`shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                        active
                          ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700'
                      }`}
                      aria-pressed={active}
                    >
                      <span>{tab.label}</span>
                      <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] sm:ml-2 sm:px-2 sm:text-xs ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {count}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
              Choose a path, then use search or topic filters to narrow your lessons.
            </p>
          </div>
        )}

        <div 
          ref={filterRef}
          className={`mb-5 rounded-[1.35rem] border p-3 transition-all sm:mb-6 sm:p-4 ${isVocabulary ? 'border-indigo-200/80 bg-white/85 shadow-[0_18px_40px_-28px_rgba(59,130,246,0.45)] backdrop-blur' : isGrammar ? 'border-indigo-200/80 bg-white/85 shadow-[0_18px_40px_-28px_rgba(99,102,241,0.45)] backdrop-blur' : isWriting ? 'border-rose-200/80 bg-white/85 shadow-[0_18px_40px_-28px_rgba(244,114,182,0.42)] backdrop-blur' : 'bg-card shadow-sm'} ${isFilterSticky ? 'sticky top-3 z-40 shadow-lg' : ''}`}
        >
          {/* Mobile: Search + Filter Toggle */}
          <div className="flex gap-2 md:hidden">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder={`Search...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`h-10 pl-9 ${isGrammar ? 'border-indigo-200 focus-visible:ring-indigo-200' : isWriting ? 'border-rose-200 focus-visible:ring-rose-200' : ''}`}
              />
            </form>
            <Button 
              type="button" 
              variant={showMobileFilters || hasActiveFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="gap-1.5 h-10 px-3"
            >
              <Filter className="h-4 w-4" />
              {hasActiveFilters && <span className="w-2 h-2 bg-white rounded-full" />}
            </Button>
          </div>

          {/* Mobile: Collapsible Filters */}
          {showMobileFilters && (
            <div className="mt-2.5 space-y-2.5 border-t border-border pt-2.5 md:hidden">
              <div className="grid grid-cols-2 gap-1.5">
                <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as LessonLevel | 'all')}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics ({totalLessons})</SelectItem>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic.toLowerCase()}>
                      {topic} ({topicCounts[topic.toLowerCase()] || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button type="button" size="sm" onClick={() => setShowMobileFilters(false)} className="flex-1 h-9">
                  Apply
                </Button>
                {hasActiveFilters && (
                  <Button type="button" variant="outline" size="sm" onClick={resetFilters} className="h-9 px-3">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Desktop: Full Filter Row */}
          <form onSubmit={handleSearch} className="hidden md:flex md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder={`Search ${type} lessons...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${isGrammar ? 'border-indigo-200 focus-visible:ring-indigo-200' : isWriting ? 'border-rose-200 focus-visible:ring-rose-200' : ''}`}
              />
            </div>
            
            <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as LessonLevel | 'all')}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics ({totalLessons})</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic.toLowerCase()}>
                    {topic} ({topicCounts[topic.toLowerCase()] || 0})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="az">A to Z</SelectItem>
                <SelectItem value="za">Z to A</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>

            {hasActiveFilters && (
              <Button type="button" variant="outline" onClick={resetFilters} className="gap-2">
                <X className="h-4 w-4" />
                Reset
              </Button>
            )}
          </form>
        </div>

        {loading ? (
          <LessonGridSkeleton count={6} />
        ) : displayLessons.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              {type === 'vocabulary' ? (
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              ) : (
                <GraduationCap className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No lessons found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            {type === 'vocabulary' && featuredDeepVocabularyLessons.length > 0 && (
              <section className={`mb-6 rounded-2xl border p-4 sm:p-5 ${isGrammar ? 'border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-violet-50 shadow-sm shadow-indigo-100/60' : 'border-indigo-200 bg-gradient-to-r from-indigo-50 via-blue-50 to-violet-50'}`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-foreground">Featured Interactive Vocabulary Lessons</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">4-word mastery lessons with deeper comparisons and guided checks.</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 border-indigo-300 bg-indigo-50 text-indigo-700">Featured</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {featuredDeepVocabularyLessons.map((lesson) => (
                    <Link key={`featured-${lesson.id}`} to={`/lesson/${lesson.slug}`} className="group">
                      <Card className="h-full border-indigo-200 bg-background/90 transition-colors group-hover:border-violet-400">
                        <CardHeader className="pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="bg-indigo-100 text-xs text-indigo-700">Interactive</Badge>
                            <Badge variant="outline" className="border-violet-300 bg-violet-50 text-xs text-violet-700">4-word Mastery</Badge>
                          </div>
                          <CardTitle className="text-sm sm:text-base leading-snug transition-colors group-hover:text-indigo-700">{lesson.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <span className="inline-flex items-center text-sm font-medium text-indigo-700 transition-colors group-hover:text-violet-700">Start Interactive Lesson</span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <p className="mb-4 text-sm font-medium text-slate-600">{sortedAndFilteredLessons.length} lessons found</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayLessons.map((lesson) => {
                const estimatedTime = lesson.estimated_time || getEstimatedTime(lesson);
                const lessonProgress = getLessonProgress(lesson.id);
                const isCompleted = lessonProgress === 'completed';
                const isBandUpgrade = isBandUpgradeLesson(lesson.topic);
                const isDeepVocabularyLesson = type === 'vocabulary' && hasDeepVocabularyLesson(lesson.slug);
                
                return (
                  <Link key={lesson.id} to={`/lesson/${lesson.slug}`}>
                    <Card className={`group h-full cursor-pointer overflow-hidden border transition-all ${isVocabulary ? 'border-indigo-200/70 bg-gradient-to-br from-white via-white to-indigo-50/45 shadow-[0_18px_40px_-28px_rgba(99,102,241,0.55)] hover:-translate-y-1 hover:border-indigo-300 hover:shadow-[0_22px_50px_-24px_rgba(99,102,241,0.64)]' : isGrammar ? 'border-indigo-200/70 bg-gradient-to-br from-white via-white to-indigo-50/50 shadow-[0_18px_40px_-28px_rgba(79,70,229,0.55)] hover:-translate-y-1 hover:border-indigo-300 hover:shadow-[0_22px_50px_-24px_rgba(79,70,229,0.64)]' : isWriting ? 'border-rose-200/70 bg-gradient-to-br from-white via-white to-rose-50/45 shadow-[0_18px_40px_-28px_rgba(244,114,182,0.52)] hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_22px_50px_-24px_rgba(244,114,182,0.62)]' : 'hover:shadow-lg'} ${isCompleted ? 'ring-2 ring-green-500 ring-opacity-50' : ''}`}>
                      <CardHeader className="space-y-3 pb-3">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={`px-2 py-0.5 text-[11px] uppercase tracking-wide ${
                                lesson.level === 'beginner' ? 'border-emerald-600 text-emerald-700 bg-emerald-50' :
                                lesson.level === 'intermediate' ? 'border-slate-700 text-slate-700 bg-slate-100' :
                                'border-violet-600 text-violet-700 bg-violet-50'
                              }`}
                            >
                              {lesson.level}
                            </Badge>
                            {isBandUpgrade && lesson.recommended_order && (
                              <Badge variant="outline" className="border-orange-500 bg-orange-50 px-2 py-0.5 text-[11px] text-orange-700">
                                <TrendingUp className="h-3 w-3 mr-1" /> Step {lesson.recommended_order}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {lesson.is_premium ? (
                              <Badge variant="outline" className="border-amber-500 bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
                                <Star className="h-3 w-3 mr-1" /> Premium
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-emerald-500 bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                                Free
                              </Badge>
                            )}
                            {user && (
                              <button
                                onClick={(e) => handleBookmarkToggle(lesson.id, e)}
                                className="rounded-full p-1.5 transition hover:bg-slate-100"
                              >
                                {isBookmarked(lesson.id) ? (
                                  <BookmarkCheck className="h-4 w-4 text-rose-600" />
                                ) : (
                                  <Bookmark className="h-4 w-4 text-slate-500 group-hover:text-slate-700" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          {user && (
                            isCompleted ? (
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                            ) : (
                              <Circle className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground/50" />
                            )
                          )}
                          <CardTitle className="text-base leading-snug transition-colors group-hover:text-accent sm:text-lg">
                            {lesson.title}
                          </CardTitle>
                        </div>
                        {isDeepVocabularyLesson && (
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <Badge variant="secondary" className="bg-indigo-100 text-[11px] text-indigo-700 sm:text-xs">Interactive</Badge>
                            <Badge variant="outline" className="border-violet-300 bg-violet-50 text-[11px] text-violet-700 sm:text-xs">Deep Lesson</Badge>
                          </div>
                        )}
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                          {lesson.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground sm:text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={`h-6 capitalize text-[11px] ${isVocabulary ? 'bg-indigo-100 text-indigo-700' : isGrammar ? 'bg-indigo-100 text-indigo-700' : isWriting ? 'bg-rose-100 text-rose-700' : ''}`}>
                              {lesson.topic}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {estimatedTime} min
                            </span>
                          </div>
                          <span>{lesson.view_count.toLocaleString()} views</span>
                        </div>
                        {isDeepVocabularyLesson && (
                          <div className="mt-3">
                            <span className="inline-flex items-center text-sm font-medium text-indigo-700">Start Interactive Lesson</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center gap-3 px-2">
                <div className="rounded-full border border-slate-200 bg-white/90 p-1.5 shadow-sm shadow-slate-200/70 backdrop-blur">
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      size="sm"
                      className="rounded-full px-3 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 sm:px-4 sm:text-sm"
                    >
                      Previous
                    </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 rounded-full px-0 text-xs sm:w-10 sm:text-sm ${
                          currentPage === pageNum
                            ? 'bg-indigo-600 text-white hover:bg-indigo-600'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      size="sm"
                      className="rounded-full px-3 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 sm:px-4 sm:text-sm"
                    >
                      Next
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 sm:text-sm">Page {currentPage} of {totalPages}</p>
              </div>
            )}
          </>
        )}
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent/90 transition-colors z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
