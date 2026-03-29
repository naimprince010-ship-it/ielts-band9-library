import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, User, LogOut, Settings, Bookmark, Crown, Brain, Trophy, BarChart3, Target, Award, PenTool, FileText, Calendar, Sparkles, Keyboard, ChevronDown, GraduationCap, Mic, PenLine } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navLinkClass = (path: string) => {
    return `relative px-1 py-2 text-sm font-medium transition-colors ${
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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img src="/icon.png" alt="IELTS Tree Logo" className="h-8 w-8 object-contain" />
              <span className="text-lg font-semibold text-foreground tracking-tight">IELTS Tree</span>
            </Link>

            {/* Desktop Navigation - Simplified */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Learn Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted ${
                  isActive('/vocabulary') || isActive('/grammar') || isActive('/writing') || isActive('/speaking')
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                  Learn
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/vocabulary')} className="gap-3 py-2.5">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Vocabulary</div>
                      <div className="text-xs text-muted-foreground">Build your word bank</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/grammar')} className="gap-3 py-2.5">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Grammar</div>
                      <div className="text-xs text-muted-foreground">Master grammar rules</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/writing')} className="gap-3 py-2.5">
                    <PenLine className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Writing</div>
                      <div className="text-xs text-muted-foreground">Essay techniques</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/speaking')} className="gap-3 py-2.5">
                    <Mic className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Speaking</div>
                      <div className="text-xs text-muted-foreground">Fluency practice</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/courses" className={navLinkClass('/courses')}>
                <span className="px-3 py-2 rounded-lg hover:bg-muted transition-colors inline-block">Courses</span>
              </Link>
              
              <Link to="/quiz" className={navLinkClass('/quiz')}>
                <span className="px-3 py-2 rounded-lg hover:bg-muted transition-colors inline-block">Quiz</span>
              </Link>
              
              {/* Practice Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted ${
                  isActive('/grammar-exercises') || isActive('/essay-bank') || isActive('/daily-plan') || isActive('/collections')
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                  Practice
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  <DropdownMenuItem onClick={() => navigate('/daily-plan')} className="gap-2.5 py-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Daily Study Plan
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/grammar-exercises')} className="gap-2.5 py-2">
                    <PenTool className="h-4 w-4 text-muted-foreground" />
                    Grammar Exercises
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/essay-bank')} className="gap-2.5 py-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Essay Bank
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/collections')} className="gap-2.5 py-2">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                    Collections
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/practice/typing')} className="gap-2.5 py-2">
                    <Keyboard className="h-4 w-4 text-muted-foreground" />
                    Typing Practice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link to="/pricing" className={navLinkClass('/pricing')}>
                <span className="px-3 py-2 rounded-lg hover:bg-muted transition-colors inline-block">Pricing</span>
              </Link>
            </div>

            {/* Right Side - Auth */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 h-10 px-3">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="font-medium max-w-24 truncate">{user.name}</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-2 border-b border-border mb-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    
                    <DropdownMenuItem onClick={() => navigate('/diagnostic')} className="gap-2.5 py-2">
                      <Brain className="h-4 w-4 text-muted-foreground" />
                      Diagnostic Test
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/flashcards')} className="gap-2.5 py-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Flashcards
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/progress')} className="gap-2.5 py-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/achievements')} className="gap-2.5 py-2">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      Achievements
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/mock-test')} className="gap-2.5 py-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      Mock Test
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/certificate')} className="gap-2.5 py-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      Certificate
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="gap-2.5 py-2">
                      <Crown className="h-4 w-4 text-muted-foreground" />
                      My Subscription
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/bookmarks')} className="gap-2.5 py-2">
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                      My Bookmarks
                    </DropdownMenuItem>
                    
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/admin')} className="gap-2.5 py-2">
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          Admin Panel
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={handleSignOut} className="gap-2.5 py-2 text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="h-10 px-4 font-medium">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="h-10 px-5 bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted transition-colors touch-target"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-16 left-0 right-0 bottom-0 bg-background overflow-y-auto transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="px-4 py-6 space-y-1 max-w-lg mx-auto">
            {/* Learn Section */}
            <div className="pb-4">
              <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Learn
              </p>
              <Link
                to="/vocabulary"
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                  isActive('/vocabulary') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <BookOpen className="h-5 w-5" />
                Vocabulary
              </Link>
              <Link
                to="/grammar"
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                  isActive('/grammar') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <GraduationCap className="h-5 w-5" />
                Grammar
              </Link>
              <Link
                to="/writing"
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                  isActive('/writing') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <PenLine className="h-5 w-5" />
                Writing
              </Link>
              <Link
                to="/speaking"
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                  isActive('/speaking') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Mic className="h-5 w-5" />
                Speaking
              </Link>
            </div>

            {/* Main Links */}
            <div className="border-t border-border pt-4 pb-4">
              <Link
                to="/courses"
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                  isActive('/courses') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Target className="h-5 w-5" />
                Courses
              </Link>
              <Link
                to="/quiz"
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                  isActive('/quiz') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Target className="h-5 w-5" />
                Quiz
              </Link>
              <Link
                to="/pricing"
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                  isActive('/pricing') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Crown className="h-5 w-5" />
                Pricing
              </Link>
            </div>
            
            {/* Practice Section */}
            <div className="border-t border-border pt-4 pb-4">
              <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Practice
              </p>
              <Link
                to="/daily-plan"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
              >
                <Calendar className="h-5 w-5" />
                Daily Study Plan
              </Link>
              <Link
                to="/grammar-exercises"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
              >
                <PenTool className="h-5 w-5" />
                Grammar Exercises
              </Link>
              <Link
                to="/essay-bank"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
              >
                <FileText className="h-5 w-5" />
                Essay Bank
              </Link>
              <Link
                to="/collections"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
              >
                <Sparkles className="h-5 w-5" />
                Collections
              </Link>
            </div>

            {/* Auth Section */}
            <div className="border-t border-border pt-4">
              {user ? (
                <>
                  <div className="px-3 py-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-medium text-foreground truncate">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
                  >
                    <Crown className="h-5 w-5" />
                    My Profile
                  </Link>
                  <Link
                    to="/progress"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
                  >
                    <BarChart3 className="h-5 w-5" />
                    Progress
                  </Link>
                  <Link
                    to="/bookmarks"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
                  >
                    <Bookmark className="h-5 w-5" />
                    Bookmarks
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
                    >
                      <Settings className="h-5 w-5" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-destructive hover:bg-destructive/10 transition-colors touch-target mt-2"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-3 py-2">
                  <Link to="/signup" className="w-full">
                    <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-medium">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full h-12 text-base font-medium">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
