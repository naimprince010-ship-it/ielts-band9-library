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
  PenTool
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
  { value: "5,000+", label: "Lessons Completed" },
  { value: "2,000+", label: "Active Students" },
  { value: "4.9/5", label: "Student Rating" },
  { value: "150+", label: "Live Batches" }
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

  const featuredLessons = SAMPLE_LESSONS.filter(l => l.is_published).slice(0, 3);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10 selection:text-foreground">
      {user && <ContinueLearning />}
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <Badge 
                variant="secondary" 
                className="mb-6 px-4 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground border-0"
              >
                Trusted by 2,000+ students worldwide
              </Badge>
              
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6 text-balance">
                Master IELTS with expert-crafted lessons
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
                Premium vocabulary, advanced grammar, and proven strategies designed by experts to help you reach Band 7.0 to 9.0.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="What do you want to learn today?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 bg-card border-border text-foreground text-base placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all"
                  >
                    Find Lessons
                  </Button>
                </div>
              </form>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                    >
                      <img 
                        src={`https://i.pravatar.cc/150?u=${i}`} 
                        alt="Student" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Join our learning community</span>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => (
                <Card 
                  key={index}
                  className={`border-border bg-card p-6 ${
                    index === 0 ? 'bg-primary text-primary-foreground' : ''
                  }`}
                >
                  <div className={`text-3xl font-bold mb-1 ${
                    index === 0 ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${
                    index === 0 ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                Explore Library
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
                Master every aspect of IELTS
              </h2>
              <p className="text-muted-foreground">
                Choose from thousands of curated lessons and practice exercises.
              </p>
            </div>
            <Link to="/vocabulary">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-foreground hover:bg-muted font-medium group"
              >
                View All Resources 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Vocabulary Card */}
            <Link to="/vocabulary" className="group">
              <Card className="h-full border-border bg-background transition-all duration-300 hover:shadow-lg hover:border-border/80">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Vocabulary</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Band 8.0+ academic words, collocations, and idiomatic expressions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2.5 mb-6">
                    {['Topic-based Lessons', 'Smart Flashcards', 'Speaking Phrases'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    Start Learning 
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Grammar Card */}
            <Link to="/grammar" className="group">
              <Card className="h-full border-border bg-background transition-all duration-300 hover:shadow-lg hover:border-border/80">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-background" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Grammar</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complex structures for Band 7.5+ with clear explanations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2.5 mb-6">
                    {['Sentence Upgrades', 'Common Mistakes', 'Interactive Quizzes'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    Start Learning 
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Writing Card */}
            <Link to="/writing" className="group">
              <Card className="h-full border-border bg-background transition-all duration-300 hover:shadow-lg hover:border-border/80">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                    <PenTool className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Writing</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Task 1 & 2 strategies with model answers and feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2.5 mb-6">
                    {['Essay Templates', 'Model Answers', 'Band Descriptors'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    Start Learning 
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Speaking Card */}
            <Link to="/speaking" className="group">
              <Card className="h-full border-border bg-background transition-all duration-300 hover:shadow-lg hover:border-border/80">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4">
                    <Mic className="h-6 w-6 text-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Speaking</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Practice all parts with sample answers and tips.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2.5 mb-6">
                    {['Part 1-3 Topics', 'Cue Cards', 'Fluency Tips'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    Start Learning 
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Popular Content
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Start with the best
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our top-performing lessons that have helped hundreds of students reach their target scores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredLessons.map((lesson) => (
              <Link key={lesson.id} to={`/lesson/${lesson.slug}`} className="group">
                <Card className="h-full border-border bg-card transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
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
                  <CardContent className="pt-0">
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
          
          <div className="text-center mt-10">
            <Link to="/vocabulary">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-lg px-8 border-border text-foreground hover:bg-muted font-medium group"
              >
                View Full Library 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Stats Section */}
      <section className="py-16 bg-primary lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center">
            {STATS.map((stat, index) => (
              <div key={index}>
                <div className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Success Stories
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Hear from our students
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from students who achieved their dreams with our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="flex gap-1 text-accent mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-muted-foreground/30 mb-3" />
                  
                  <p className="text-foreground mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
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
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground mb-6">
            <Target className="h-7 w-7" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Ready to achieve your target score?
          </h2>
          
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of successful candidates who used our resources to ace the IELTS exam.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="h-14 px-10 bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold rounded-lg"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold rounded-lg"
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
