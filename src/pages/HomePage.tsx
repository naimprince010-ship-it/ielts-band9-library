import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  ArrowRight, 
  CheckCircle, 
  Trophy, 
  Target, 
  Users, 
  Quote,
  Star,
  Mic,
  PenTool,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';
import { useAuth } from '@/contexts/AuthContext';
import { courseService } from '@/services/courseService';
import { Course } from '@/types';
import { Loader2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Rahat Ahmed",
    score: "Band 8.5",
    text: "IELTS Tree changed my preparation strategy completely. The vocabulary lessons are world-class and helped me achieve my target score.",
    avatar: "RA"
  },
  {
    name: "Sumaiya Kabir",
    score: "Band 8.0",
    text: "The grammar section is remarkably clear and easy to follow. Highly recommended for anyone aiming for Band 7 or higher.",
    avatar: "SK"
  },
  {
    name: "Tanvir Hasan",
    score: "Band 7.5",
    text: "Best resource for IELTS preparation I have found. The AI-enhanced lessons are genuinely helpful and saved me months of study time.",
    avatar: "TH"
  }
];

const STATS = [
  { value: "5,000+", label: "Lessons Completed", icon: BookOpen },
  { value: "2,000+", label: "Active Students", icon: Users },
  { value: "4.9/5", label: "Student Rating", icon: Star },
  { value: "150+", label: "Live Batches", icon: Zap }
];

const FEATURES = [
  { icon: BookOpen, title: "Vocabulary", desc: "Band 8.0+ academic words", href: "/vocabulary", color: "bg-foreground" },
  { icon: GraduationCap, title: "Grammar", desc: "Complex structures explained", href: "/grammar", color: "bg-accent" },
  { icon: PenTool, title: "Writing", desc: "Task 1 & 2 strategies", href: "/writing", color: "bg-muted" },
  { icon: Mic, title: "Speaking", desc: "Fluency & pronunciation", href: "/speaking", color: "bg-foreground" },
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vocabulary?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        // Only show popular courses or first 2 on home page
        setCourses(data.filter(c => c.isPopular).slice(0, 2));
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const featuredLessons = SAMPLE_LESSONS.filter(l => l.is_published).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {user && <ContinueLearning />}
      
      {/* Hero Section - Modern Minimal */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
            <Badge 
              variant="secondary" 
              className="mb-6 px-4 py-1.5 text-sm font-medium bg-muted text-muted-foreground border-0"
            >
              Trusted by 2,000+ students worldwide
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
              Master IELTS with{' '}
              <span className="text-accent">expert-crafted</span>{' '}
              lessons
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Premium vocabulary, advanced grammar, and proven strategies designed by experts to help you reach Band 7.0 to 9.0.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="What do you want to learn today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-background border-border text-foreground text-base placeholder:text-muted-foreground rounded-xl"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 px-8 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-xl"
                >
                  Find Lessons
                </Button>
              </div>
            </form>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                      alt="Student" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span>4.9/5 from 500+ reviews</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {STATS.map((stat, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl text-center transition-all ${
                  index === 0 
                    ? 'bg-foreground text-background' 
                    : 'bg-muted'
                }`}
              >
                <div className={`text-3xl lg:text-4xl font-bold mb-1 ${
                  index === 0 ? 'text-background' : 'text-foreground'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  index === 0 ? 'text-background/70' : 'text-muted-foreground'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Features */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {FEATURES.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.href}
                className="group p-6 bg-background rounded-2xl border border-border hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 ${
                  feature.color === 'bg-foreground' ? 'text-background' : 
                  feature.color === 'bg-accent' ? 'text-accent-foreground' : 'text-foreground'
                }`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{feature.desc}</p>
                <div className="flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Detailed Cards */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                Explore Library
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Master every aspect of IELTS
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose from thousands of curated lessons and practice exercises.
              </p>
            </div>
            <Link to="/vocabulary">
              <Button 
                variant="outline" 
                className="border-border text-foreground hover:bg-muted font-medium group rounded-xl"
              >
                View All Resources 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Vocabulary Card - Large */}
            <Link to="/vocabulary" className="group md:row-span-2">
              <Card className="h-full border-border bg-foreground text-background overflow-hidden transition-all duration-300 hover:shadow-xl">
                <CardHeader className="pb-4 p-8">
                  <div className="w-14 h-14 bg-background/10 rounded-xl flex items-center justify-center mb-6">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl lg:text-3xl font-bold mb-3">Vocabulary</CardTitle>
                  <CardDescription className="text-background/70 text-base lg:text-lg">
                    Band 8.0+ academic words, collocations, and idiomatic expressions for all IELTS modules.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3 mb-8">
                    {['Topic-based Lessons', 'Smart Flashcards', 'Speaking Phrases', 'Writing Vocabulary', 'Collocations'].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-background/80">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-base font-semibold text-background group-hover:text-accent transition-colors">
                    Start Learning 
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Grammar Card */}
            <Link to="/grammar" className="group">
              <Card className="h-full border-border bg-background transition-all duration-300 hover:shadow-lg hover:border-foreground/20">
                <CardHeader className="pb-4 p-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">Popular</Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground mt-4">Grammar</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complex structures for Band 7.5+ with clear explanations and examples.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    Start Learning 
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Writing & Speaking Row */}
            <div className="grid grid-cols-2 gap-6">
              <Link to="/writing" className="group">
                <Card className="h-full border-border bg-muted/50 transition-all duration-300 hover:shadow-lg hover:border-foreground/20">
                  <CardHeader className="p-5">
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center mb-3">
                      <PenTool className="h-5 w-5 text-foreground" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">Writing</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                      Task 1 & 2 strategies
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link to="/speaking" className="group">
                <Card className="h-full border-border bg-muted/50 transition-all duration-300 hover:shadow-lg hover:border-foreground/20">
                  <CardHeader className="p-5">
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center mb-3">
                      <Mic className="h-5 w-5 text-foreground" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">Speaking</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                      Part 1-3 practice
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      {courses.length > 0 && (
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
              <div className="max-w-xl">
                <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                  Flagship Programs
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Join our upcoming live batches
                </h2>
                <p className="text-muted-foreground text-lg">
                  Structured learning with expert instructors and personalized feedback.
                </p>
              </div>
              <Link to="/courses">
                <Button 
                  variant="outline" 
                  className="border-border text-foreground hover:bg-muted font-medium group rounded-xl"
                >
                  View All Courses 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`} className="group">
                  <Card className="h-full border-0 bg-muted/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 rounded-[2.5rem]">
                    <div className={`h-2 w-full bg-gradient-to-r ${course.bgGradient}`} />
                    <CardHeader className="p-8 pb-4">
                      <div className="flex items-center justify-between mb-6">
                        <Badge className="bg-background text-foreground border-border font-bold uppercase tracking-widest text-[10px] px-3">
                          {course.type}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-accent font-black text-sm">
                          <Star className="h-4 w-4 fill-current" />
                          4.9
                        </div>
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl font-black text-foreground group-hover:text-accent transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base mt-2 line-clamp-2 font-medium">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                      <div className="flex flex-wrap gap-4 mb-8 text-sm font-bold text-muted-foreground uppercase tracking-tight">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-accent" />
                          {course.instructor}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          {course.nextBatch}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-border/50">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-foreground">৳{course.price.toLocaleString()}</span>
                          {course.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through opacity-50">৳{course.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="h-12 w-12 rounded-2xl bg-foreground text-background flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Lessons */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Popular Content
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Start with the best
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our top-performing lessons that have helped hundreds of students reach their target scores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredLessons.map((lesson) => (
              <Link key={lesson.id} to={`/lesson/${lesson.slug}`} className="group">
                <Card className="h-full border-border bg-background transition-all duration-300 hover:shadow-lg hover:border-foreground/20">
                  <CardHeader className="pb-3 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-muted text-muted-foreground border-0 text-xs font-medium uppercase tracking-wider"
                      >
                        {lesson.type}
                      </Badge>
                      {lesson.is_premium && (
                        <Badge className="bg-accent text-accent-foreground border-0 text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {lesson.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 text-muted-foreground">
                      {lesson.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span className="capitalize">{lesson.level}</span>
                      </div>
                      <div className="text-muted-foreground">
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
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-xl px-8 border-border text-foreground hover:bg-muted font-medium group h-12"
              >
                View Full Library 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Success Stories
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Hear from our students
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real results from students who achieved their dreams with our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-border bg-muted/30 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 text-accent mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-muted-foreground/20 mb-3" />
                  
                  <p className="text-foreground mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="h-11 w-11 rounded-full bg-foreground flex items-center justify-center text-background font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-accent font-medium">
                        {testimonial.score} Achieved
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background/10 text-background mb-6">
            <Target className="h-8 w-8" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-background mb-4">
            Ready to achieve your target score?
          </h2>
          
          <p className="text-lg text-background/70 mb-10 max-w-xl mx-auto">
            Join thousands of successful candidates who used our resources to ace the IELTS exam.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="h-14 px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl w-full sm:w-auto"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-10 border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 font-semibold rounded-xl w-full sm:w-auto"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
