import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, User, LogOut, Settings, Bookmark, Crown, Brain, Trophy, BarChart3, Target, Award, PenTool, FileText, Calendar, Sparkles, Keyboard, ChevronDown } from 'lucide-react';
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
    return `text-sm font-medium transition-colors ${
      isActive(path)
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'
    }`;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/icon.png" alt="IELTS Tree Logo" className="h-8 w-8 object-contain" />
              <span className="text-lg font-semibold text-foreground tracking-tight">IELTS Tree</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
            <Link to="/courses" className={navLinkClass('/courses')}>
              Courses
            </Link>
            <Link to="/quiz" className={navLinkClass('/quiz')}>
              Quiz
            </Link>
            
            {/* Practice Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                isActive('/grammar-exercises') || isActive('/essay-bank') || isActive('/daily-plan')
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}>
                Practice
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => navigate('/daily-plan')}>
                  <Calendar className="h-4 w-4 mr-2.5" />
                  Daily Study Plan
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/grammar-exercises')}>
                  <PenTool className="h-4 w-4 mr-2.5" />
                  Grammar Exercises
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/essay-bank')}>
                  <FileText className="h-4 w-4 mr-2.5" />
                  Essay Bank
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/collections')}>
                  <Sparkles className="h-4 w-4 mr-2.5" />
                  Collections
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/practice/typing')}>
                  <Keyboard className="h-4 w-4 mr-2.5" />
                  Typing Practice
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/pricing" className={navLinkClass('/pricing')}>
              Pricing
            </Link>
          </div>

          {/* Right Side - Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem onClick={() => navigate('/diagnostic')}>
                    <Brain className="h-4 w-4 mr-2.5" />
                    Diagnostic Test
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/flashcards')}>
                    <BookOpen className="h-4 w-4 mr-2.5" />
                    Flashcards
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/achievements')}>
                    <Trophy className="h-4 w-4 mr-2.5" />
                    Achievements
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/progress')}>
                    <BarChart3 className="h-4 w-4 mr-2.5" />
                    Progress Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/reading-practice')}>
                    <BookOpen className="h-4 w-4 mr-2.5" />
                    Reading Practice
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/mock-test')}>
                    <Target className="h-4 w-4 mr-2.5" />
                    Mock Test
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/certificate')}>
                    <Award className="h-4 w-4 mr-2.5" />
                    Certificate
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Crown className="h-4 w-4 mr-2.5" />
                    My Subscription
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/bookmarks')}>
                    <Bookmark className="h-4 w-4 mr-2.5" />
                    My Bookmarks
                  </DropdownMenuItem>
                  
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Settings className="h-4 w-4 mr-2.5" />
                        Admin Panel
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2.5" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/vocabulary"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive('/vocabulary') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Vocabulary
            </Link>
            <Link
              to="/grammar"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive('/grammar') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Grammar
            </Link>
            <Link
              to="/writing"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive('/writing') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Writing
            </Link>
            <Link
              to="/speaking"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive('/speaking') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Speaking
            </Link>
            <Link
              to="/courses"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive('/courses') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/quiz"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive('/quiz') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Quiz
            </Link>
            <Link
              to="/pricing"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive('/pricing') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            {/* Practice Section */}
            <div className="pt-2 border-t border-border mt-2">
              <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Practice
              </p>
              <Link
                to="/daily-plan"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Daily Study Plan
              </Link>
              <Link
                to="/grammar-exercises"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Grammar Exercises
              </Link>
              <Link
                to="/essay-bank"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Essay Bank
              </Link>
              <Link
                to="/collections"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
            </div>

            {/* Auth Section */}
            <div className="pt-2 border-t border-border mt-2">
              {user ? (
                <>
                  <div className="px-3 py-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/bookmarks"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bookmarks
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-3 px-3 py-2">
                  <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
