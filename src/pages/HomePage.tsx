import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Trophy, 
  Target, 
  Users, 
  Sparkles,
  Zap,
  Globe,
  Quote,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';
import { useAuth } from '@/contexts/AuthContext';

const TESTIMONIALS = [
  {
    name: "Rahat Ahmed",
    score: "Band 8.5",
    text: "IELTS Tree changed my preparation strategy. The vocabulary lessons are world-class!",
    avatar: "RA"
  },
  {
    name: "Sumaiya Kabir",
    score: "Band 8.0",
    text: "The grammar section is so clear and easy to follow. Highly recommended for Band 7+ aspirants.",
    avatar: "SK"
  },
  {
    name: "Tanvir Hasan",
    score: "Band 7.5",
    text: "Best resource for IELTS in Bangladesh. The AI-enhanced lessons are truly helpful.",
    avatar: "TH"
  }
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vocabulary?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredLessons = SAMPLE_LESSONS.filter(l => l.is_published).slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {user && <ContinueLearning />}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-32">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>AI-Enhanced Learning for 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
              Grow Your Success <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                with IELTS Tree
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Master premium vocabulary, advanced grammar, and proven strategies designed by experts to help you reach Band 7.0 to 9.0.
            </p>
            
            {/* Glassmorphism Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 p-2 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl transition-all hover:border-white/20">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="What do you want to learn today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-transparent border-none text-white text-lg placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 text-lg font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20">
                  Find Lessons
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="h-10 w-10 rounded-full border-2 border-slate-950 bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  +2k
                </div>
              </div>
              <p className="text-slate-400 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-400" />
                Trusted by 2,000+ students worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Glassmorphism Cards */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none font-bold uppercase tracking-wider px-3 py-1">
                Explore Library
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Master Every Aspect of IELTS</h2>
              <p className="text-lg text-slate-600">Choose from thousands of curated lessons and practice exercises.</p>
            </div>
            <Link to="/vocabulary">
              <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold group">
                View All Resources <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Vocabulary Card */}
            <Link to="/vocabulary" className="group">
              <Card className="h-full border-none bg-white shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-200/50 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <CardHeader className="relative z-10">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/30">
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Vocabulary Library</CardTitle>
                  <CardDescription className="text-slate-500 text-base">
                    Master Band 8.0+ academic words, advanced collocations, and idiomatic expressions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 flex flex-col h-[calc(100%-140px)]">
                  <div className="space-y-4 mb-8">
                    {['Topic-based Lessons', 'Smart Flashcards', 'Speaking Phrases'].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-slate-600">
                        <CheckCircle className="h-5 w-5 text-indigo-500" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center text-indigo-600 font-bold group-hover:gap-3 transition-all">
                    Start Learning <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Grammar Card */}
            <Link to="/grammar" className="group">
              <Card className="h-full border-none bg-white shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-200/50 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <CardHeader className="relative z-10">
                  <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-600/30">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Grammar Mastery</CardTitle>
                  <CardDescription className="text-slate-500 text-base">
                    Unlock complex structures and master the grammar required for Band 7.5+.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 flex flex-col h-[calc(100%-140px)]">
                  <div className="space-y-4 mb-8">
                    {['Sentence Upgrades', 'Common Mistake Fixes', 'Interactive Quizzes'].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-slate-600">
                        <CheckCircle className="h-5 w-5 text-purple-500" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center text-purple-600 font-bold group-hover:gap-3 transition-all">
                    Start Learning <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Practice Hub Card */}
            <Link to="/courses" className="group">
              <Card className="h-full border-none bg-white shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-200/50 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <CardHeader className="relative z-10">
                  <div className="w-14 h-14 bg-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-600/30">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Live Courses</CardTitle>
                  <CardDescription className="text-slate-500 text-base">
                    Join our expert-led sessions for intensive speaking and writing feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 flex flex-col h-[calc(100%-140px)]">
                  <div className="space-y-4 mb-8">
                    {['Daily Live Classes', 'One-on-One Feedback', 'Mock Test Analysis'].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-slate-600">
                        <CheckCircle className="h-5 w-5 text-pink-500" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center text-pink-600 font-bold group-hover:gap-3 transition-all">
                    Explore Batches <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Lessons section with better visuals */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Start with the Best</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Explore our top-performing lessons that have helped hundreds of students reach their target scores.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredLessons.map((lesson) => (
              <Link key={lesson.id} to={`/lesson/${lesson.slug}`} className="group">
                <Card className="h-full border-slate-100 hover:border-indigo-100 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="bg-slate-50 text-slate-600 border-none font-bold">
                        {lesson.type.toUpperCase()}
                      </Badge>
                      {lesson.is_premium && (
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs uppercase tracking-wider">
                          <Crown className="h-4 w-4" /> Premium
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">{lesson.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4 text-sm font-medium">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Trophy className="h-4 w-4" />
                        <span className="capitalize">{lesson.level}</span>
                      </div>
                      <div className="text-slate-400">
                        {lesson.view_count.toLocaleString()} views
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link to="/vocabulary">
               <Button variant="outline" size="lg" className="rounded-xl px-10 border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold group">
                 View Full Library <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
               </Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Statistics / Impact Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-extrabold mb-2">5,000+</div>
              <div className="text-indigo-200 font-medium">Lessons Completed</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">2,000+</div>
              <div className="text-indigo-200 font-medium">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">4.9/5</div>
              <div className="text-indigo-200 font-medium">Student Rating</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">150+</div>
              <div className="text-indigo-200 font-medium">Live Batches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <Quote className="absolute top-0 right-0 h-48 w-48 text-slate-200/50 -mr-24 -mt-12" />
           <div className="text-center mb-16 relative z-10">
             <h2 className="text-4xl font-bold text-slate-900 mb-4">Hearing from Our Best</h2>
             <p className="text-lg text-slate-600">Success stories from students who reached their dreams with us.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8 relative z-10">
             {TESTIMONIALS.map((t, i) => (
               <Card key={i} className="border-none shadow-lg bg-white p-6 hover:shadow-xl transition-shadow group">
                 <CardContent className="p-0">
                   <div className="flex gap-1 text-amber-500 mb-6">
                     {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                   </div>
                   <p className="text-slate-700 italic mb-8 leading-relaxed">
                     "{t.text}"
                   </p>
                   <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                     <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
                       {t.avatar}
                     </div>
                     <div>
                       <div className="font-bold text-slate-900">{t.name}</div>
                       <div className="text-indigo-600 font-bold text-sm tracking-wide">{t.score} ACHIEVED</div>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
        </div>
      </section>

      {/* CTA Section - Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-purple-600/10 blur-[80px] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 mb-8 animate-bounce">
            <Zap className="h-8 w-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
            Ready to change your future? <br />
            <span className="text-indigo-400">Get your target score now.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
            Join thousands of successful candidates who used our resources to ace the IELTS exam.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="h-16 px-12 bg-indigo-600 hover:bg-indigo-500 text-xl font-bold rounded-2xl shadow-xl shadow-indigo-600/30">
                Get Started Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="h-16 px-10 bg-transparent border-white/20 text-white hover:bg-white hover:text-indigo-900 text-xl font-bold rounded-2xl">
                Check Pricing
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-slate-500 flex items-center justify-center gap-2">
            <Globe className="h-5 w-5" /> All lessons accessible from any device.
          </p>
        </div>
      </section>
    </div>
  );
}
