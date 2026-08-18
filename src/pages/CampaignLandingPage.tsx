import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, CheckCircle2, Headphones, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { buildAuthPath, captureFunnelAttribution, trackFunnelEvent } from '@/lib/funnel';

const OFFERS = {
  'full-mock-test': {
    eyebrow: 'REAL IELTS EXAM PRACTICE',
    title: 'Know your IELTS level before exam day',
    description: 'Take a complete Listening, Reading, Writing and Speaking mock test, then use your result to focus on the skills that need work.',
    destination: '/full-mock-test',
    primary: 'Create account and start',
  },
  'vocabulary-mastery': {
    eyebrow: 'BAND 7+ VOCABULARY',
    title: 'Use the right academic words with confidence',
    description: 'Learn vocabulary through comparisons, IELTS examples, quick checks and guided writing practice.',
    destination: '/vocabulary',
    primary: 'Start a free lesson',
  },
  'grammar-upgrade': {
    eyebrow: 'GRAMMAR PRECISION',
    title: 'Turn correct sentences into controlled Band 7+ writing',
    description: 'Diagnose common grammar gaps, learn the control rules and practise upgrading your own IELTS sentences.',
    destination: '/grammar',
    primary: 'Start grammar training',
  },
  'ielts-band-7': {
    eyebrow: 'YOUR COMPLETE IELTS STUDY SYSTEM',
    title: 'Build a clear path to your target band',
    description: 'Combine guided lessons, skill practice, full mock tests and progress tracking in one focused IELTS workspace.',
    destination: '/dashboard?welcome=1',
    primary: 'Start free',
  },
} as const;

type OfferKey = keyof typeof OFFERS;

export default function CampaignLandingPage() {
  const { campaign = 'ielts-band-7' } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const offerKey: OfferKey = campaign in OFFERS ? campaign as OfferKey : 'ielts-band-7';
  const offer = OFFERS[offerKey];
  const onboardingPath = `/onboarding?next=${encodeURIComponent(offer.destination)}`;
  const primaryHref = user
    ? onboardingPath
    : buildAuthPath('/signup', onboardingPath, { offer: offerKey });
  const pricingHref = `/pricing?offer=${encodeURIComponent(offerKey)}`;

  useEffect(() => {
    captureFunnelAttribution(location.search, location.pathname);
    trackFunnelEvent('ad_landing_view', { offer: offerKey, path: location.pathname });
  }, [location.pathname, location.search, offerKey]);

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-slate-50 text-slate-950">
      <section className="overflow-hidden border-b border-indigo-100 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div className="min-w-0">
            <p className="mb-4 text-sm font-bold tracking-[0.18em] text-indigo-200">{offer.eyebrow}</p>
            <h1 className="max-w-3xl break-words text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{offer.title}</h1>
            <p className="mt-6 max-w-2xl break-words text-lg leading-8 text-indigo-100">{offer.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-white px-6 text-indigo-950 hover:bg-indigo-50">
                <Link to={primaryHref} onClick={() => trackFunnelEvent('signup_started', { offer: offerKey })}>
                  {offer.primary}<ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/40 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
                <Link to={pricingHref}>View premium plans</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-indigo-200">No card required to create your free account.</p>
          </div>

          <div className="min-w-0 rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur sm:p-7">
            <div className="rounded-2xl bg-white p-6 text-slate-900">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">FREE START</span>
                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Your first study session</h2>
              <div className="mt-5 space-y-4">
                {[
                  ['Set your target band', Target],
                  ['Complete a diagnostic or mock', BookOpenCheck],
                  ['Follow your recommended study path', CheckCircle2],
                ].map(([label, Icon]) => (
                  <div key={label as string} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-100 text-indigo-700"><Icon className="h-5 w-5" /></span>
                    <span className="font-medium">{label as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Four IELTS skills', 'Practise Listening, Reading, Writing and Speaking in one account.', Headphones],
            ['Actionable feedback', 'See what to improve next instead of studying without direction.', BookOpenCheck],
            ['Secure progress', 'Save attempts, lessons and progress after signing in.', ShieldCheck],
          ].map(([title, description, Icon]) => (
            <article key={title as string} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="h-7 w-7 text-indigo-600" />
              <h2 className="mt-4 text-xl font-bold">{title as string}</h2>
              <p className="mt-2 leading-7 text-slate-600">{description as string}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8">
          <h2 className="text-3xl font-black">Start with a free account. Upgrade only when you need more.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">Explore the platform first, then choose monthly or yearly Premium for complete access.</p>
          <Button asChild size="lg" className="mt-7 h-12 bg-indigo-700 px-7 hover:bg-indigo-800">
            <Link to={primaryHref}>{offer.primary}<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
