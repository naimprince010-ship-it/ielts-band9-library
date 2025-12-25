import { Link, useNavigate } from 'react-router-dom';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export function PricingPage() {
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();

  const userPackageType = user?.package_type;
  const isMonthlyUser = isPremium && userPackageType === 'monthly';
  const isYearlyUser = isPremium && userPackageType === 'yearly';

  const handleUpgrade = (packageType: 'monthly' | 'yearly') => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/payment?package=${packageType}`);
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
      cta: isMonthlyUser ? 'Current Plan' : 'Upgrade Now',
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
      cta: isYearlyUser ? 'Current Plan' : 'Get Best Value',
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
