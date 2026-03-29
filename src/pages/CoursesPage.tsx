// courses page
import { 
  Video, 
  Users, 
  Calendar, 
  Star, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  PlayCircle,
  Gem
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  nextBatch: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string;
  type: 'live' | 'recorded' | 'hybrid';
  features: string[];
  isPopular?: boolean;
  accentColor: string;
  bgGradient: string;
}

const COURSES: Course[] = [
  {
    id: 'ielts-masterclass',
    title: 'IELTS Band 8+ Masterclass',
    description: 'Our most comprehensive program covering all 4 modules (Reading, Writing, Listening, Speaking) with personal feedback.',
    instructor: 'Arefin Shovo',
    nextBatch: 'April 15, 2026',
    price: 5500,
    originalPrice: 8000,
    duration: '3 Months',
    level: 'Any',
    type: 'live',
    isPopular: true,
    accentColor: 'indigo',
    bgGradient: 'from-blue-500 to-indigo-600',
    features: [
      '24 Interactive Live Classes',
      'Daily Practice Materials',
      'Personalized Writing Feedback',
      '1-on-1 Speaking Mock Tests',
      'Life-time Access to Recorded Classes'
    ]
  },
  {
    id: 'writing-intensive',
    title: 'Writing Task 1 & 2 Intensive',
    description: 'Master Task 1 and Task 2 with advanced templates and weekly scoring. Focus on high-band grammar & vocabulary.',
    instructor: 'Sharmin Alam',
    nextBatch: 'April 10, 2026',
    price: 2500,
    originalPrice: 3500,
    duration: '1 Month',
    level: 'Intermediate+',
    type: 'live',
    accentColor: 'rose',
    bgGradient: 'from-rose-500 to-pink-600',
    features: [
      '12 Special Writing Sessions',
      'Band 8+ Grammar Templates',
      'Daily Homework Tasks',
      'Weekly Essay Feedback',
      'IELTS Writing Handbook'
    ]
  },
  {
    id: 'speaking-club',
    title: 'IELTS Speaking Confidence Club',
    description: 'Overcome your speaking fear. Daily 30-minute practice sessions with peers and expert feedback.',
    instructor: 'James Rodger',
    nextBatch: 'Ongoing',
    price: 1500,
    originalPrice: 2000,
    duration: '1 Month',
    level: 'Any',
    type: 'live',
    accentColor: 'amber',
    bgGradient: 'from-amber-400 to-orange-500',
    features: [
      'Daily 1-on-1 Practice',
      'Cue-card Strategy Lessons',
      'Pronunciation Workshops',
      'Idioms and Phrasal Verbs',
      'Weekly Speaking Mocks'
    ]
  },
  {
    id: 'reading-listening-suite',
    title: 'Rapid Reading & Listening Suite',
    description: 'Speed up your reading and sharpen your ears. Focused practice on tricky question types and keywords.',
    instructor: 'Sifat Hasan',
    nextBatch: 'Self-paced',
    price: 1200,
    originalPrice: 1800,
    duration: 'Lifetime',
    level: 'Any',
    type: 'recorded',
    accentColor: 'emerald',
    bgGradient: 'from-emerald-400 to-teal-600',
    features: [
      '50+ High-quality Mock Tests',
      'Strategy Video Explanations',
      'Vocabulary for Reading',
      'Keyword Mapping Techniques',
      'Instant Result Tracking'
    ]
  }
];

export function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#FDFEFE] pb-20 overflow-hidden">
      {/* Dynamic Animated Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-transparent overflow-hidden">
        {/* Colorful Gradient Blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-indigo-500/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-pink-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[50%] bg-blue-500/10 blur-[100px] rounded-full animate-pulse"></div>

        <div className="bg-gradient-to-br from-indigo-900 via-[#1e1b4b] to-violet-950 w-full h-full absolute top-0 left-0 z-0"></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 mb-6 backdrop-blur-md animate-bounce">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">New Enrollment Open</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-pink-200 mb-6 leading-tight">
              Unlock Your <br/> Band 9 Future
            </h1>
            <p className="text-xl text-indigo-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Join thousands of successful students who mastered IELTS with our premium, AI-powered colorful courses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button size="lg" className="h-14 px-10 text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:scale-105 transition-transform shadow-[0_10px_35px_-10px_rgba(79,70,229,0.5)] border-none">
                Start Learning Now
              </Button>
              <Button size="lg" className="h-14 px-10 text-lg font-bold border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors shadow-none rounded-xl font-bold">
                View Batches
              </Button>
            </div>
        </div>
      </section>

      {/* Modern Colorful Course Grid */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {COURSES.map((course) => (
            <Card key={course.id} className="group overflow-hidden rounded-[2rem] border-none bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.15)] transition-all duration-500 relative">
              
              {/* Card Accent Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${course.accentColor}-400/10 blur-[50px] rounded-full group-hover:bg-${course.accentColor}-400/20 transition-all`}></div>
              
              {/* Left Color Strip */}
              <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${course.bgGradient}`}></div>

              <CardHeader className="pt-8 px-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                    <Badge className={`bg-gradient-to-r ${course.bgGradient} border-none text-white px-4 py-1 rounded-full shadow-lg`}>
                        {course.type === 'live' ? <Zap className="h-3 w-3 mr-1 inline" /> : <PlayCircle className="h-3 w-3 mr-1 inline" />}
                        {course.type.toUpperCase()}
                    </Badge>
                    {course.isPopular && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-tighter shadow-sm border border-amber-200">
                        <Gem className="h-3 w-3" /> Trending
                      </div>
                    )}
                </div>
                <CardTitle className="text-3xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                    {course.title}
                </CardTitle>
                <CardDescription className="text-slate-500 text-base mt-2 font-medium line-clamp-2">
                    {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 space-y-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 border border-slate-100">
                        <Users className="h-4 w-4 text-indigo-500" /> {course.instructor}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 border border-slate-100">
                        <Calendar className="h-4 w-4 text-rose-500" /> {course.nextBatch}
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Key Features</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        {course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <CheckCircle2 className={`h-4 w-4 text-emerald-500`} />
                                <span className="line-clamp-1">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
              </CardContent>

              <CardFooter className="p-8 pt-4 flex items-center justify-between mt-auto border-t border-slate-50 bg-slate-50/50">
                <div>
                   <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-slate-900">৳{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-lg text-slate-400 line-through font-bold">৳{course.originalPrice}</span>
                      )}
                   </div>
                   <p className="text-xs font-black text-emerald-600 flex items-center gap-1 mt-1">
                      <Zap className="h-3 w-3 fill-current" /> LIMITED OFFER
                   </p>
                </div>
                <Button className={`h-14 px-8 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold transition-all shadow-xl group/btn`}>
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Colorful Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-10 rounded-[2.5rem] text-white shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase">Worldwide Presence</h3>
                    <p className="text-indigo-100/80 font-medium leading-relaxed">
                        Join an elite network of global students preparing for the world's best universities.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-rose-500 to-rose-700 p-10 rounded-[2.5rem] text-white shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 md:translate-y-8">
                    <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <Video className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase">4K Live Sessions</h3>
                    <p className="text-rose-100/80 font-medium leading-relaxed">
                        Experience study like never before with crystal clear audio and ultra-high definition video classes.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-10 rounded-[2.5rem] text-white shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase">Success Stories</h3>
                    <p className="text-orange-100/80 font-medium leading-relaxed">
                        10k+ students reached Band 7 or higher last year using our colorful learning toolkit.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Final Premium CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative group p-1.5 rounded-[3rem] bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 animate-gradient-x shadow-2xl">
            <div className="bg-slate-900 rounded-[2.8rem] p-12 md:p-20 text-center relative overflow-hidden">
                {/* Decorative Shapes */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-indigo-500/10 blur-[100px] rounded-full"></div>
                
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight relative z-10">
                   Stop Dreaming. <br/> Start Achieving Band 9.
                </h2>
                <div className="flex flex-wrap justify-center gap-6 relative z-10">
                    <Button size="lg" className="h-16 px-12 text-lg font-black bg-white text-slate-900 hover:bg-slate-100 rounded-2xl border-none shadow-xl transform hover:scale-105 transition-transform">
                        Message on WhatsApp
                    </Button>
                    <Button size="lg" className="h-16 px-12 text-lg font-black border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 shadow-none rounded-2xl transition-all">
                        Schedule Call
                    </Button>
                </div>
            </div>
        </div>
      </section>
      
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
