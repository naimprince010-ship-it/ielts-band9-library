import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff, Star, Users, Award, BookOpen, ShieldCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { buildAuthPath, captureFunnelAttribution, readNextPath, sanitizeInternalPath, trackFunnelEvent } from '@/lib/funnel';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectAfterLogin = (() => {
    const queryNext = new URLSearchParams(location.search).get('next');
    if (queryNext) return readNextPath(location.search, '/dashboard');
    const state = location.state as { from?: { pathname?: string; search?: string; hash?: string } } | null;
    const path = state?.from?.pathname;
    if (!path) return '/';
    const search = state?.from?.search || '';
    const hash = state?.from?.hash || '';
    return `${path}${search}${hash}`;
  })();
  const offer = new URLSearchParams(location.search).get('offer') || undefined;

  useEffect(() => {
    captureFunnelAttribution(location.search, location.pathname);
  }, [location.pathname, location.search]);

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
      trackFunnelEvent('login_completed', { offer, destination: redirectAfterLogin, method: 'email' });
      navigate(redirectAfterLogin, { replace: true });
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    const { error } = await signInWithGoogle(redirectAfterLogin);

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  const stats = [
    { icon: BookOpen, value: '280+', label: 'Expert Lessons' },
    { icon: Award, value: 'Band 9', label: 'Strategies' },
    { icon: Users, value: '10K+', label: 'Active Students' },
    { icon: Star, value: '4.9/5', label: 'Student Rating' },
  ];

  return (
    <main className="min-h-[100svh] bg-[#f7f7fb] lg:grid lg:h-[100svh] lg:min-h-[620px] lg:grid-cols-[minmax(0,1.04fr)_minmax(520px,0.96fr)] lg:overflow-hidden">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#080b24] via-[#171044] to-[#090d2b] text-white lg:flex lg:min-h-0 lg:flex-col">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(129,140,248,.35)_1px,transparent_0)] [background-size:30px_30px]" />
        <BookOpen className="pointer-events-none absolute right-[10%] top-[11%] h-36 w-36 -rotate-12 text-violet-300/[0.045]" />
        <Award className="pointer-events-none absolute right-[6%] top-[43%] h-24 w-24 text-indigo-300/[0.045]" />

        <div className="relative z-10 flex flex-1 flex-col px-[clamp(2rem,4vw,4rem)] pt-[clamp(1.5rem,4vh,3rem)]">
          <Link to="/" className="flex w-fit items-center gap-3 transition-opacity hover:opacity-90">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2 shadow-xl shadow-violet-950/30">
              <img loading="eager" src="/icon.png" alt="IELTS Tree" className="h-full w-full object-contain" />
            </span>
            <span className="text-2xl font-black tracking-tight">IELTS Tree</span>
          </Link>

          <div className="mt-[clamp(1rem,3vh,2rem)] max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-100">
              <Star className="h-3.5 w-3.5" /> #1 IELTS Prep Platform
            </div>
            <h1 className="text-[clamp(2.5rem,4.3vw,4.5rem)] font-black leading-[0.98] tracking-[-0.04em]">
              Study Smarter.<br />
              Score <span className="bg-gradient-to-r from-indigo-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Band 9.</span>
            </h1>
            <p className="mt-4 max-w-xl text-[clamp(.9rem,1.2vw,1.1rem)] leading-relaxed text-indigo-100/75">
              Real exam materials, expert strategies and proven techniques designed to help you achieve your target band.
            </p>
          </div>

          <div className="mt-[clamp(1rem,2.5vh,1.75rem)] grid max-w-2xl grid-cols-4 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-xl shadow-slate-950/15">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="px-3 first:pl-1 last:pr-1">
                <Icon className="mb-1.5 h-5 w-5 text-violet-300" />
                <div className="text-xl font-black leading-none">{value}</div>
                <div className="mt-1 text-[11px] leading-tight text-indigo-100/65">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-auto h-[clamp(250px,34vh,360px)] w-full overflow-hidden">
          <img
            src="/images/ielts-study-desk-login.png"
            alt="IELTS Tree study books, Band 9 notebook, pen, mug and desk plant"
            className="h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111039] to-transparent" />
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,.08),transparent_28%),linear-gradient(180deg,#fbfbfe_0%,#f5f3ff_100%)] px-4 py-5 sm:px-8 lg:min-h-0 lg:py-4">
        <div className="w-full max-w-[560px] rounded-[28px] border border-slate-200/80 bg-white/95 p-5 shadow-[0_30px_80px_-38px_rgba(30,41,59,.35)] sm:p-7 lg:p-[clamp(1.5rem,3vh,2.25rem)]">
          <Link to="/" className="mb-4 flex items-center justify-center gap-2 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-100 bg-white p-1.5 shadow-sm">
              <img loading="eager" src="/icon.png" alt="IELTS Tree" className="h-full w-full object-contain" />
            </span>
            <span className="text-xl font-black text-slate-950">IELTS Tree</span>
          </Link>

          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Welcome back!</h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">Sign in to continue your IELTS journey</p>
          </div>

          {!isSupabaseConfigured() && (
            <Alert className="mt-4 border-amber-200 bg-amber-50 py-2">
              <AlertCircle className="h-4 w-4 text-amber-700" />
              <AlertDescription className="text-xs text-amber-900">
                Demo: <strong>admin@ielts.com</strong> / <strong>demo123</strong>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4 py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-5 space-y-4">
            {isSupabaseConfigured() && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full rounded-xl border-slate-200 bg-white text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                >
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 0 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  {googleLoading ? 'Connecting...' : 'Continue with Google'}
                </Button>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" /> or continue with email <span className="h-px flex-1 bg-slate-200" />
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-800">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-10 text-sm focus-visible:ring-violet-500" required autoFocus />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-800">Password</Label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-violet-600 hover:text-violet-700">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-10 pr-10 text-sm focus-visible:ring-violet-500" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              <label className="flex w-fit cursor-pointer items-center gap-2 text-xs font-medium text-slate-600">
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-violet-600" />
                Remember me
              </label>

              <Button type="submit" className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:from-indigo-700 hover:to-violet-700" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link to={buildAuthPath('/signup', sanitizeInternalPath(redirectAfterLogin, '/dashboard'), { offer })} className="font-bold text-violet-600 hover:text-violet-700">Create account</Link>
            </p>

            <div className="grid grid-cols-3 divide-x divide-violet-100 rounded-2xl border border-violet-100 bg-violet-50/60 px-2 py-3">
              <div className="flex items-center justify-center gap-2 px-1 text-center text-[10px] font-bold leading-tight text-slate-700 sm:text-xs"><BookOpen className="h-4 w-4 shrink-0 text-violet-600" /> Real IELTS<br />Materials</div>
              <div className="flex items-center justify-center gap-2 px-1 text-center text-[10px] font-bold leading-tight text-slate-700 sm:text-xs"><ShieldCheck className="h-4 w-4 shrink-0 text-violet-600" /> Expert<br />Curated</div>
              <div className="flex items-center justify-center gap-2 px-1 text-center text-[10px] font-bold leading-tight text-slate-700 sm:text-xs"><TrendingUp className="h-4 w-4 shrink-0 text-violet-600" /> Results<br />Driven</div>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              By signing in, you agree to our <Link to="/terms" className="font-semibold text-violet-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="font-semibold text-violet-600 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
