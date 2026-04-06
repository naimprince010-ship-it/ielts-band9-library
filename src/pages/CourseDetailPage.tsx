import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Zap, 
  Calendar, 
  Users, 
  Clock, 
  Globe, 
  Star, 
  PlayCircle,
  Gem,
  LayoutList,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { courseService } from '@/services/courseService';
import { Course } from '@/types';
import { Loader2 } from 'lucide-react';

export function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await courseService.getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error(`Error fetching course ${courseId}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-8">The course you are looking for does not exist or has been moved.</p>
          <Link to="/courses">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center bg-foreground overflow-hidden text-white">
        <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l ${course.bgGradient} opacity-20 blur-[100px]`}></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/courses" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 font-bold">
            <ArrowLeft className="mr-2 h-4 w-4" /> All Courses
          </Link>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className={`bg-gradient-to-r ${course.bgGradient} border-none text-white px-4 py-1 rounded-full shadow-lg`}>
                {course.type === 'live' ? <Zap className="h-3 w-3 mr-1 inline" /> : <PlayCircle className="h-3 w-3 mr-1 inline" />}
                {course.type.toUpperCase()}
              </Badge>
              {course.isPopular && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-tighter shadow-sm">
                  <Gem className="h-3 w-3" /> Trending
                </div>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-sm border border-white/20">
                <Star className="h-3 w-3 text-amber-400" /> 4.9/5 Rating
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed font-medium mb-8">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="font-bold text-lg">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-rose-400" />
                <span className="font-bold text-lg">{course.nextBatch}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-400" />
                <span className="font-bold text-lg">{course.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Curriculum & Features */}
          <div className="lg:col-span-8 space-y-10">
            {/* Features Card */}
            <div className="bg-card rounded-[2rem] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border-t-4 border-accent">
              <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-accent" /> What you'll get
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-muted border border-border transition-all hover:bg-muted/80">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="font-bold text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Card */}
            {course.curriculum && (
              <div className="bg-card rounded-[3rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
                <h2 className="text-3xl font-black text-foreground mb-10 flex items-center gap-4">
                  <LayoutList className="h-8 w-8 text-accent" /> Course Curriculum
                </h2>
                <div className="space-y-6">
                  {course.curriculum.map((mod, i) => (
                    <div key={i} className="group overflow-hidden rounded-[2rem] border border-border bg-muted/50 hover:bg-card hover:shadow-xl transition-all duration-300">
                      <div className="p-6 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <span className="h-10 w-10 bg-accent text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                                {i+1}
                            </span>
                            <h3 className="text-xl font-black text-foreground tracking-tight">
                                {mod.module}
                            </h3>
                         </div>
                         <Badge variant="outline" className="border-accent/30 text-accent font-bold uppercase tracking-wider px-3">
                            {mod.lessons.length} Lessons
                         </Badge>
                      </div>
                      <div className="px-10 pb-8 pl-[4.5rem]">
                        <ul className="space-y-4">
                          {mod.lessons.map((lesson, j) => (
                            <li key={j} className="flex items-center gap-3 text-muted-foreground font-bold group/lesson">
                              <span className="h-2 w-2 rounded-full bg-accent/50 group-hover/lesson:bg-accent transition-colors"></span>
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* About the Instructor */}
            <div className="bg-foreground rounded-[3rem] p-12 text-white overflow-hidden relative">
               <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[100%] bg-accent/10 blur-[80px] rounded-full"></div>
               <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="h-32 w-32 rounded-3xl bg-white/10 p-1 backdrop-blur-xl flex-shrink-0">
                    <div className="w-full h-full rounded-2xl bg-accent/20 flex items-center justify-center font-black text-3xl">
                       {course.instructor.split(' ')[0][0]}{course.instructor.split(' ')[1]?.[0] || ''}
                    </div>
                  </div>
                  <div>
                     <h3 className="text-3xl font-black mb-2 uppercase tracking-wide">Meet Your Mentor</h3>
                     <h4 className="text-xl font-bold text-accent mb-4">{course.instructor}</h4>
                     <p className="text-white/70 font-medium leading-relaxed max-w-xl">
                        A highly experienced IELTS instructor with a proven track record of helping thousands of students achieve Band 8 or higher. Expert in simplified structures and psychological test-taking strategies.
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Enrollment Sidebar (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-card rounded-[2.5rem] p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border-none text-center relative overflow-hidden group">
               <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${course.bgGradient}`}></div>
               
               <div className="mb-6">
                 <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-5xl font-black text-foreground tracking-tighter">৳{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through font-bold">৳{course.originalPrice}</span>
                    )}
                 </div>
                 <p className="text-emerald-600 font-extrabold flex items-center justify-center gap-1 uppercase tracking-tighter">
                   <Zap className="h-4 w-4 fill-current animate-pulse" /> Limited Offer - 30% Off
                 </p>
               </div>
               
               <div className="space-y-4 mb-8">
                 <Link to={`/payment?package=course&courseId=${course.id}&name=${encodeURIComponent(course.title)}&price=${course.price}`} className="block w-full">
                   <Button className="w-full h-16 rounded-2xl bg-accent hover:bg-foreground text-white font-black text-lg transition-all shadow-[0_15px_30px_-5px_rgba(220,38,38,0.3)] transform hover:-translate-y-1">
                     Get Full Access Now
                   </Button>
                 </Link>
                 <Link to="/contact" className="block w-full">
                   <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-border font-black text-lg text-foreground hover:bg-muted transition-all">
                     Contact Admissions
                   </Button>
                 </Link>
               </div>
               
               <div className="space-y-4 text-left border-t border-border pt-8">
                  <div className="flex items-center gap-3 text-muted-foreground font-bold text-sm uppercase tracking-widest leading-none">
                     <Globe className="h-4 w-4 text-accent" /> All Materials Included
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground font-bold text-sm uppercase tracking-widest leading-none">
                     <Zap className="h-4 w-4 text-accent" /> Certificate on Completion
                  </div>
               </div>
            </div>
            
            <div className="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100">
               <h4 className="font-black text-emerald-800 text-lg mb-2 flex items-center gap-2">
                 <Star className="h-5 w-5 fill-emerald-500 text-emerald-500" /> Money-Back Guarantee
               </h4>
               <p className="text-emerald-700/80 font-bold text-sm leading-relaxed">
                 Not satisfied after the first class? we offer a 100% no-questions-asked refund policy.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
