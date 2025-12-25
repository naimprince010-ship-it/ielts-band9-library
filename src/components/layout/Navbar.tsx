import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, User, LogOut, Settings, Bookmark, Crown, Brain, Trophy, BarChart3, Target, Award, PenTool, FileText } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navLinkClass = (path: string) => {
    return `font-medium transition-colors ${
      isActive(path)
        ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
        : 'text-gray-600 hover:text-indigo-600'
    }`;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">IELTS Band 9</span>
            </Link>
          </div>

                    <div className="hidden md:flex items-center space-x-8">
                      <Link to="/vocabulary" className={navLinkClass('/vocabulary')}>
                        Vocabulary
                      </Link>
                      <Link to="/grammar" className={navLinkClass('/grammar')}>
                        Grammar
                      </Link>
                      <Link to="/writing" className={navLinkClass('/writing')}>
                        Writing
                      </Link>
                                            <Link to="/speaking" className={navLinkClass('/speaking')}>
                                              Speaking
                                            </Link>
                                            <Link to="/quiz" className={navLinkClass('/quiz')}>
                                              Quiz
                                            </Link>
                                                        <Link to="/pricing" className={navLinkClass('/pricing')}>
                                                          Pricing
                                                        </Link>
                                                        <DropdownMenu>
                                                          <DropdownMenuTrigger className={`font-medium transition-colors ${isActive('/grammar-exercises') || isActive('/essay-bank') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'} flex items-center gap-1`}>
                                                            Practice
                                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                          </DropdownMenuTrigger>
                                                          <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => navigate('/grammar-exercises')}>
                                                              <PenTool className="h-4 w-4 mr-2" />
                                                              Grammar Exercises
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => navigate('/essay-bank')}>
                                                              <FileText className="h-4 w-4 mr-2" />
                                                              Essay Bank
                                                            </DropdownMenuItem>
                                                          </DropdownMenuContent>
                                                        </DropdownMenu>
            
                        {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={() => navigate('/diagnostic')}>
                                    <Brain className="h-4 w-4 mr-2" />
                                    Diagnostic Test
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => navigate('/flashcards')}>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Flashcards
                                  </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => navigate('/achievements')}>
                                                                      <Trophy className="h-4 w-4 mr-2" />
                                                                      Achievements
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => navigate('/progress')}>
                                                                      <BarChart3 className="h-4 w-4 mr-2" />
                                                                      Progress Dashboard
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => navigate('/reading-practice')}>
                                                                      <BookOpen className="h-4 w-4 mr-2" />
                                                                      Reading Practice
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => navigate('/mock-test')}>
                                                                      <Target className="h-4 w-4 mr-2" />
                                                                      Mock Test
                                                                    </DropdownMenuItem>
                                                                                                                                        <DropdownMenuItem onClick={() => navigate('/certificate')}>
                                                                                                                                          <Award className="h-4 w-4 mr-2" />
                                                                                                                                          Certificate
                                                                                                                                        </DropdownMenuItem>
                                                                                                                                        <DropdownMenuItem onClick={() => navigate('/grammar-exercises')}>
                                                                                                                                          <PenTool className="h-4 w-4 mr-2" />
                                                                                                                                          Grammar Exercises
                                                                                                                                        </DropdownMenuItem>
                                                                                                                                        <DropdownMenuItem onClick={() => navigate('/essay-bank')}>
                                                                                                                                          <FileText className="h-4 w-4 mr-2" />
                                                                                                                                          Essay Bank
                                                                                                                                        </DropdownMenuItem>
                                                                                                                                        <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                                    <Crown className="h-4 w-4 mr-2" />
                                    My Subscription
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => navigate('/bookmarks')}>
                                    <Bookmark className="h-4 w-4 mr-2" />
                                    My Bookmarks
                                  </DropdownMenuItem>
                                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-4 space-y-4">
                        <Link
                          to="/vocabulary"
                          className={`block ${navLinkClass('/vocabulary')}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Vocabulary
                        </Link>
                        <Link
                          to="/grammar"
                          className={`block ${navLinkClass('/grammar')}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Grammar
                        </Link>
                        <Link
                          to="/writing"
                          className={`block ${navLinkClass('/writing')}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Writing
                        </Link>
                                                <Link
                                                  to="/speaking"
                                                  className={`block ${navLinkClass('/speaking')}`}
                                                  onClick={() => setMobileMenuOpen(false)}
                                                >
                                                  Speaking
                                                </Link>
                                                <Link
                                                  to="/quiz"
                                                  className={`block ${navLinkClass('/quiz')}`}
                                                  onClick={() => setMobileMenuOpen(false)}
                                                >
                                                  Quiz
                                                </Link>
                                                                        <Link
                                                                          to="/pricing"
                                                                          className={`block ${navLinkClass('/pricing')}`}
                                                                          onClick={() => setMobileMenuOpen(false)}
                                                                        >
                                                                          Pricing
                                                                        </Link>
                                                                        <Link
                                                                          to="/grammar-exercises"
                                                                          className={`block ${navLinkClass('/grammar-exercises')}`}
                                                                          onClick={() => setMobileMenuOpen(false)}
                                                                        >
                                                                          Grammar Exercises
                                                                        </Link>
                                                                        <Link
                                                                          to="/essay-bank"
                                                                          className={`block ${navLinkClass('/essay-bank')}`}
                                                                          onClick={() => setMobileMenuOpen(false)}
                                                                        >
                                                                          Essay Bank
                                                                        </Link>
                                                {user ? (
                          <>
                            <Link
                              to="/profile"
                              className="block text-gray-600 hover:text-indigo-600 font-medium"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              My Subscription
                            </Link>
                                                        <Link
                                                          to="/bookmarks"
                                                          className="block text-gray-600 hover:text-indigo-600 font-medium"
                                                          onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                          My Bookmarks
                                                        </Link>
                                                        <Link
                                                          to="/grammar-exercises"
                                                          className="block text-gray-600 hover:text-indigo-600 font-medium"
                                                          onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                          Grammar Exercises
                                                        </Link>
                                                        <Link
                                                          to="/essay-bank"
                                                          className="block text-gray-600 hover:text-indigo-600 font-medium"
                                                          onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                          Essay Bank
                                                        </Link>
                                                        {isAdmin && (
                  <Link
                    to="/admin"
                    className="block text-gray-600 hover:text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-gray-600 hover:text-indigo-600 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
