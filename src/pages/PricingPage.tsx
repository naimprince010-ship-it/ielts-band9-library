import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Star, Zap, Crown, Users, Copy, CheckCircle2, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { buildAuthPath, captureFunnelAttribution, trackFunnelEvent } from '@/lib/funnel';
import { COUPON_CODES } from '@/lib/pricing';

const REFERRAL_STORAGE_KEY = 'ielts_referral_code';

export function PricingPage() {
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [trialTimeLeft, setTrialTimeLeft] = useState<{ value: number, unit: 'days' | 'hours' } | null>(null);

  const userPackageType = user?.package_type;
  const isMonthlyUser = isPremium && userPackageType === 'monthly';
  const isYearlyUser = isPremium && userPackageType === 'yearly';

  useEffect(() => {
    captureFunnelAttribution(window.location.search, window.location.pathname);
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem(REFERRAL_STORAGE_KEY, ref);
    }
    
    if (user) {
      setReferralCode(`IELTS${user.id.slice(0, 6).toUpperCase()}`);
    }
    
    if (isPremium && user?.premium_until) {
      const end = new Date(user.premium_until);
      const now = new Date();
      if (end > now) {
        const msLeft = end.getTime() - now.getTime();
        const hoursLeft = Math.floor(msLeft / (1000 * 60 * 60));
        if (hoursLeft < 48) {
          setTrialTimeLeft({ value: hoursLeft, unit: 'hours' });
        } else {
          setTrialTimeLeft({ value: Math.floor(hoursLeft / 24), unit: 'days' });
        }
      }
    }
  }, [user, searchParams, isPremium]);

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (COUPON_CODES[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const copyReferralLink = () => {
    const link = `https://www.ieltstree.com/pricing?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpgrade = (packageType: 'monthly' | 'yearly') => {
    const couponParam = appliedCoupon ? `&coupon=${appliedCoupon}` : '';
    const paymentPath = `/payment?package=${packageType}${couponParam}`;
    trackFunnelEvent('plan_selected', { package: packageType, offer: searchParams.get('offer') });
    if (!user) {
      navigate(buildAuthPath('/signup', paymentPath, {
        offer: searchParams.get('offer') || undefined,
        plan: packageType,
      }));
      return;
    }
    navigate(paymentPath);
  };

  const plans = [
    {
      name: 'Premium Monthly',
      price: '299',
      currency: '৳',
      period: '/month',
      description: 'Full access to all materials',
      features: [
        'All free features included',
        'Access to ALL premium lessons',
        'Advanced vocabulary & grammar',
        'Band 8-9 level content',
        'Detailed answer explanations',
        'Speaking phrases & collocations',
        'Sentence upgrade examples',
        'Priority support',
      ],
      limitations: [],
      cta: isMonthlyUser ? 'Current Plan' : isYearlyUser ? 'Switch to Monthly' : 'Upgrade Now',
      ctaLink: '#',
      popular: false,
      disabled: isMonthlyUser,
      isCurrent: isMonthlyUser,
    },
    {
      name: 'Premium Yearly',
      price: '2,499',
      currency: '৳',
      period: '/year',
      description: 'Best value - Save 30%',
      features: [
        'Everything in Premium Monthly',
        '2 months FREE',
        'Early access to new content',
        'Exclusive study guides',
        'Priority email support',
      ],
      limitations: [],
      cta: isYearlyUser ? 'Current Plan' : isMonthlyUser ? 'Upgrade to Yearly' : 'Get Best Value',
      ctaLink: '#',
      popular: true,
      disabled: isYearlyUser,
      badge: 'Recommended',
      isCurrent: isYearlyUser,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-background/10 text-background border-0">
            Simple & Transparent
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Choose your plan
          </h1>
          <p className="text-lg lg:text-xl text-background/70 max-w-2xl mx-auto">
            Unlock your IELTS potential with our comprehensive learning materials. 
            Upgrade anytime to access all premium content.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Active Custom Premium Pass / Trial Banner */}
        {trialTimeLeft !== null && (
          <Card className="mb-8 border-2 border-foreground/10 bg-muted">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-foreground/10 rounded-xl">
                    <CheckCircle2 className="h-7 w-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Your Premium Access is Active!</h3>
                    <p className="text-muted-foreground">{trialTimeLeft.value} {trialTimeLeft.unit} remaining. Upgrade now to keep lifetime access.</p>
                  </div>
                </div>
                <Badge className="bg-foreground text-background text-base px-4 py-2">{trialTimeLeft.value} {trialTimeLeft.unit} Left</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Coupon Code Section */}
        <Card className="mb-10 border-border">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Have a coupon?</span>
              </div>
              <div className="flex gap-2 flex-1 w-full md:max-w-sm">
                <Input
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-11"
                />
                <Button onClick={applyCoupon} variant="outline" className="h-11 px-6">
                  Apply
                </Button>
              </div>
              {appliedCoupon && (
                <Badge className="bg-accent/10 text-accent border-accent/20">
                  <CheckCircle2 className="h-3 w-3 mr-1.5" />
                  {COUPON_CODES[appliedCoupon].description}
                </Badge>
              )}
              {couponError && (
                <span className="text-destructive text-sm">{couponError}</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-4xl md:grid-cols-2 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all duration-300 ${
                plan.popular 
                  ? 'border-2 border-foreground shadow-xl scale-[1.02]' 
                  : 'border-border hover:border-foreground/20 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-foreground text-background px-4 py-1.5 shadow-md">
                    <Star className="h-3 w-3 mr-1.5 fill-current" /> Most Popular
                  </Badge>
                </div>
              )}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground px-4 py-1.5 shadow-md">
                    <Zap className="h-3 w-3 mr-1.5" /> {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pt-10 pb-4">
                <CardTitle className="text-xl font-bold text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-foreground">{plan.currency}{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-8">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="h-5 w-5 text-accent" />
                      </div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full h-12 font-medium ${
                    plan.popular
                      ? 'bg-foreground hover:bg-foreground/90 text-background'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  disabled={plan.isCurrent}
                  onClick={() => !plan.isCurrent && handleUpgrade(plan.name === 'Premium Monthly' ? 'monthly' : 'yearly')}
                >
                  {plan.isCurrent ? (
                    <>
                      <Crown className="h-4 w-4 mr-2" />
                      Current Plan
                    </>
                  ) : (
                    plan.cta
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-muted/30 p-5 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-semibold text-foreground">Only need one focused course?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Browse individual IELTS courses available as a one-time purchase.</p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/courses">Browse courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        {/* Referral Program Section */}
        {user && (
          <Card className="mt-12 border-2 border-muted bg-muted/30">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-foreground/5 rounded-xl">
                    <Users className="h-7 w-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Refer Friends & Earn Rewards!</h3>
                    <p className="text-muted-foreground">Get 1 month free for every friend who subscribes</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-muted-foreground">Your referral link:</p>
                  <div className="flex items-center gap-2 bg-background rounded-xl border border-border px-4 py-2.5">
                    <code className="text-sm text-foreground font-mono">ieltstree.com/pricing?ref={referralCode}</code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyReferralLink}
                      className="h-8 w-8 p-0 hover:bg-muted"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* FAQ Section */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our plans</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <Card className="border-border bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We currently accept bKash payments. Simply send money to our bKash merchant number 
                  and submit your transaction ID for verification.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  {"Yes! You can cancel your subscription at any time. You'll continue to have"} 
                  {" access until the end of your billing period."}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">Is there a refund policy?</h3>
                <p className="text-muted-foreground">
                  {"We offer a 7-day money-back guarantee. If you're not satisfied,"} 
                  {" contact us within 7 days for a full refund."}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">How often is content updated?</h3>
                <p className="text-muted-foreground">
                  We add new lessons weekly and update existing content regularly 
                  to ensure accuracy and relevance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Questions? Contact us at{' '}
            <a href="mailto:support@ieltstree.com" className="text-foreground hover:text-accent transition-colors">
              support@ieltstree.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
