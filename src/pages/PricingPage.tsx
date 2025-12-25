import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Star, Zap, Crown, Gift, Users, Copy, CheckCircle2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const COUPON_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; description: string }> = {
  'WELCOME20': { discount: 20, type: 'percent', description: '20% off your first purchase' },
  'IELTS50': { discount: 50, type: 'fixed', description: '৳50 off any plan' },
  'STUDENT15': { discount: 15, type: 'percent', description: '15% student discount' },
  'NEWYEAR25': { discount: 25, type: 'percent', description: '25% New Year special' },
};

const REFERRAL_STORAGE_KEY = 'ielts_referral_code';
const TRIAL_STORAGE_KEY = 'ielts_trial_status';

export function PricingPage() {
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);

  const userPackageType = user?.package_type;
  const isMonthlyUser = isPremium && userPackageType === 'monthly';
  const isYearlyUser = isPremium && userPackageType === 'yearly';

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem(REFERRAL_STORAGE_KEY, ref);
    }
    
    if (user) {
      setReferralCode(`IELTS${user.id.slice(0, 6).toUpperCase()}`);
    }
    
    const trialData = localStorage.getItem(TRIAL_STORAGE_KEY);
    if (trialData) {
      const { startDate } = JSON.parse(trialData);
      const start = new Date(startDate);
      const now = new Date();
      const daysPassed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const daysLeft = Math.max(0, 7 - daysPassed);
      setTrialDaysLeft(daysLeft);
    }
  }, [user, searchParams]);

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

  const startFreeTrial = () => {
    if (!user) {
      navigate('/signup?trial=true');
      return;
    }
    localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify({
      startDate: new Date().toISOString(),
      userId: user.id
    }));
    setTrialDaysLeft(7);
    alert('Your 7-day free trial has started! Enjoy full access to all premium content.');
  };

  const handleUpgrade = (packageType: 'monthly' | 'yearly') => {
    if (!user) {
      navigate('/login');
      return;
    }
    const couponParam = appliedCoupon ? `&coupon=${appliedCoupon}` : '';
    navigate(`/payment?package=${packageType}${couponParam}`);
  };

  const plans = [
    {
      name: 'Free',
      price: '0',
      currency: '৳',
      period: 'forever',
      description: 'Get started with basic materials',
      features: [
        'Access to 20+ free lessons',
        'Basic vocabulary & grammar',
        'View examples and explanations',
        'Mini practice exercises',
        'Bookmark lessons',
      ],
      limitations: [
        'No premium content',
        'No advanced lessons',
      ],
      cta: user && !isPremium ? 'Current Plan' : user ? 'Free Plan' : 'Get Started',
      ctaLink: user ? '#' : '/signup',
      popular: false,
      disabled: !!user,
      isCurrent: !!user && !isPremium,
    },
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
      popular: true,
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
      popular: false,
      disabled: isYearlyUser,
      badge: 'Best Value',
      isCurrent: isYearlyUser,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Choose the plan that fits your IELTS preparation needs. 
            Upgrade anytime to unlock all premium content.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Free Trial Banner */}
        {!isPremium && trialDaysLeft === null && (
          <Card className="mb-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Gift className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800">Try Premium Free for 7 Days!</h3>
                    <p className="text-green-600">Full access to all content. No credit card required.</p>
                  </div>
                </div>
                <Button onClick={startFreeTrial} className="bg-green-600 hover:bg-green-700">
                  <Gift className="h-4 w-4 mr-2" />
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Trial Banner */}
        {trialDaysLeft !== null && trialDaysLeft > 0 && (
          <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">Your Free Trial is Active!</h3>
                    <p className="text-blue-600">{trialDaysLeft} days remaining. Upgrade now to keep access.</p>
                  </div>
                </div>
                <Badge className="bg-blue-600 text-lg px-4 py-2">{trialDaysLeft} Days Left</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Coupon Code Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">Have a coupon code?</span>
              </div>
              <div className="flex gap-2 flex-1 max-w-md">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={applyCoupon} variant="outline">
                  Apply
                </Button>
              </div>
              {appliedCoupon && (
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {COUPON_CODES[appliedCoupon].description}
                </Badge>
              )}
              {couponError && (
                <span className="text-red-500 text-sm">{couponError}</span>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-2 border-indigo-500 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-indigo-500 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" /> Most Popular
                  </Badge>
                </div>
              )}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    <Zap className="h-3 w-3 mr-1" /> {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.currency}{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-400">
                      <span className="h-5 w-5 flex items-center justify-center">-</span>
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
                
                                                                {plan.name === 'Free' ? (
                                                                  plan.ctaLink === '#' ? (
                                                                    <Button 
                                                                      className="w-full" 
                                                                      variant="outline"
                                                                      disabled={plan.isCurrent}
                                                                    >
                                                                      {plan.cta}
                                                                    </Button>
                                                                  ) : (
                                                                    <Link to={plan.ctaLink}>
                                                                      <Button className="w-full" variant="outline">
                                                                        {plan.cta}
                                                                      </Button>
                                                                    </Link>
                                                                  )
                                                                ) : (
                                                                  <Button 
                                                                    className="w-full" 
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
                                                                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Referral Program Section */}
        {user && (
          <Card className="mt-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800">Refer Friends & Earn Rewards!</h3>
                    <p className="text-purple-600">Get 1 month free for every friend who subscribes</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-gray-500">Your referral link:</p>
                  <div className="flex items-center gap-2 bg-white rounded-lg border px-4 py-2">
                    <code className="text-sm text-purple-700">ieltstree.com/pricing?ref={referralCode}</code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyReferralLink}
                      className="h-8 w-8 p-0"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
                            <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-600">
                              We currently accept bKash payments. Simply send money to our bKash merchant number 
                              and submit your transaction ID for verification.
                            </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. You'll continue to have 
                access until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Is there a refund policy?</h3>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee. If you're not satisfied, 
                contact us within 7 days for a full refund.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">How often is content updated?</h3>
              <p className="text-gray-600">
                We add new lessons weekly and update existing content regularly 
                to ensure accuracy and relevance.
              </p>
            </div>
          </div>
        </div>

                <div className="mt-12 text-center">
                  <p className="text-sm text-gray-400">
                    Questions? Contact us at support@ieltstree.com
                  </p>
                </div>
      </div>
    </div>
  );
}
