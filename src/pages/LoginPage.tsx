import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff, CheckCircle, Star, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      if (error.message.toLowerCase().includes('email not confirmed')) {
        setError('Please check your email and confirm your address before signing in.');
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    const { error } = await signInWithGoogle();

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-background/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-background/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/20 rounded-full" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
              <img loading="eager" src="/icon.png" alt="IELTS Tree" className="h-full w-full object-contain" />
            </div>
            <span className="text-2xl font-bold">IELTS Tree</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Master IELTS with<br />Band 9 Materials
            </h1>
            <p className="text-background/70 text-lg">
              Access premium vocabulary and grammar lessons designed by IELTS experts to help you achieve your target score.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-background/90">
              <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span>280+ Expert-crafted lessons</span>
            </div>
            <div className="flex items-center gap-3 text-background/90">
              <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5" />
              </div>
              <span>Band 9 vocabulary & grammar</span>
            </div>
            <div className="flex items-center gap-3 text-background/90">
              <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <span>Join thousands of successful students</span>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-background/20 border-2 border-foreground overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                    alt="Student"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-background/90">
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-accent" />
                <span className="font-semibold">4.9/5</span>
              </div>
              <p className="text-sm text-background/60">from 2,000+ reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 border border-border">
                <img loading="eager" src="/icon.png" alt="IELTS Tree" className="h-full w-full object-contain" />
              </div>
              <span className="text-xl font-bold text-foreground">IELTS Tree</span>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to continue your IELTS journey</p>
          </div>

          {!isSupabaseConfigured() && (
            <Alert className="bg-muted border-border">
              <AlertCircle className="h-4 w-4 text-foreground" />
              <AlertDescription className="text-foreground">
                <strong>Demo Mode:</strong> Use these credentials:
                <br />
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border border-border">admin@ielts.com</code>
                {' / '}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border border-border">demo123</code>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isSupabaseConfigured() && (
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base border-2 border-border hover:bg-muted transition-all"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </Button>
          )}

          {isSupabaseConfigured() && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">or continue with email</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-base border-2 border-border focus:border-foreground"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 text-base border-2 border-border focus:border-foreground"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base bg-foreground hover:bg-foreground/90 text-background font-medium"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-muted-foreground">
            {"Don't have an account?"}{' '}
            <Link to="/signup" className="text-foreground hover:text-accent font-semibold transition-colors">
              Create account
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-foreground hover:text-accent transition-colors">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-foreground hover:text-accent transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
