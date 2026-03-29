import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Search, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';
import { useAuth } from '@/contexts/AuthContext';

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
    <div>
      {user && <ContinueLearning />}
      
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Master Your Path to Success with <span className="text-indigo-200">IELTS Tree</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Master vocabulary and grammar with our curated, AI-enhanced lessons. 
              Self-study resources designed for Band 7+ success.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search lessons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-white text-gray-900"
                  />
                </div>
                <Button type="submit" size="lg" variant="secondary">
                  Search
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/vocabulary">
                <Button size="lg" variant="secondary" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  Browse Vocabulary
                </Button>
              </Link>
              <Link to="/grammar">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-white text-white hover:bg-white hover:text-indigo-700">
                  <GraduationCap className="h-5 w-5" />
                  Browse Grammar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">Choose your focus area and start learning</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/vocabulary">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-indigo-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-2xl">Vocabulary Library</CardTitle>
                  <CardDescription>
                    Academic words, collocations, synonyms, and speaking phrases for Band 7+
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Topic-based vocabulary lessons
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Collocations and synonyms
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Speaking phrases included
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium">
                    Explore Vocabulary <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/grammar">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-indigo-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Grammar Library</CardTitle>
                  <CardDescription>
                    30 core grammar lessons with form, use, and sentence upgrades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Clear explanations with examples
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Common mistakes to avoid
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Practice exercises with answers
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center text-purple-600 font-medium">
                    Explore Grammar <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Lessons</h2>
            <p className="text-gray-600">Start with our most popular lessons</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredLessons.map((lesson) => (
              <Link key={lesson.id} to={`/lesson/${lesson.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={lesson.type === 'vocabulary' ? 'default' : 'secondary'}>
                        {lesson.type}
                      </Badge>
                      {lesson.is_premium ? (
                        <Badge variant="outline" className="text-amber-600 border-amber-600">
                          <Star className="h-3 w-3 mr-1" /> Premium
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Free
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">{lesson.level}</span>
                      <span>{lesson.view_count.toLocaleString()} views</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/vocabulary">
              <Button variant="outline" size="lg">
                View All Lessons <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple steps to improve your IELTS score</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Focus</h3>
              <p className="text-gray-600">
                Select vocabulary or grammar lessons based on your needs and target band score.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Study & Practice</h3>
              <p className="text-gray-600">
                Learn with structured lessons including examples, common mistakes, and mini exercises.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Bookmark lessons, review answers, and build your vocabulary systematically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Achieve Band 9?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of IELTS learners who have improved their scores with our curated materials.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Get Started Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
