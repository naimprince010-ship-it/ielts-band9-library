import { Link } from 'react-router-dom';
import { 
  Video, 
  Users, 
  Calendar, 
  Star, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  PlayCircle,
  Clock,
  BookOpen,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COURSES } from '@/data/courses';

export function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--muted))_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              Enrollment Open for April 2026
            </Badge>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 leading-tight text-balance">
              Master IELTS with expert guidance
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto text-pretty">
              Join thousands of successful students who achieved their target band scores with our structured courses and personalized feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-12 px-8">
                Browse Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Our Programs
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                Courses designed for success
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              From comprehensive masterclasses to focused skill-building programs, find the perfect course for your IELTS journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {COURSES.map((course, index) => (
              <Card 
                key={course.id} 
                className={`group overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={course.type === 'live' ? 'default' : 'secondary'}
                        className="font-medium"
                      >
                        {course.type === 'live' ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-current rounded-full mr-1.5 animate-pulse" />
                            Live
                          </>
                        ) : (
                          <>
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Recorded
                          </>
                        )}
                      </Badge>
                      {course.isPopular && (
                        <Badge variant="outline" className="font-medium text-accent border-accent/30 bg-accent/5">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                    {course.title}
                  </h3>
                  
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{course.nextBatch}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      What&apos;s included
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {course.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {course.features.length > 4 && (
                      <p className="text-sm text-muted-foreground">
                        +{course.features.length - 4} more features
                      </p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border bg-muted/30">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-foreground">
                        ৳{course.price.toLocaleString()}
                      </span>
                      {course.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ৳{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {course.originalPrice && (
                      <p className="text-xs font-medium text-accent mt-1">
                        Save ৳{(course.originalPrice - course.price).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <Button className="w-full sm:w-auto group/btn">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Why Choose Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Learning experience designed for results
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="text-center p-8 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-background mb-6">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                Global Community
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Join students from 50+ countries preparing for top universities worldwide.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-background mb-6">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                HD Live Sessions
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Crystal clear video and audio for an immersive classroom experience.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-background mb-6">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                Proven Results
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                10,000+ students achieved Band 7+ with our structured methodology.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-foreground text-background p-8 md:p-12 lg:p-16 text-center overflow-hidden relative">
            {/* Subtle decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-background/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-background/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <BookOpen className="h-12 w-12 mx-auto mb-6 opacity-80" />
              
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
                Ready to achieve your target band score?
              </h2>
              
              <p className="text-background/70 text-lg max-w-2xl mx-auto mb-8">
                Get personalized guidance from our expert instructors and join a supportive community of learners.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="h-12 px-8 bg-background text-foreground hover:bg-background/90"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message on WhatsApp
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-12 px-8 border-background/20 text-background hover:bg-background/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
