import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Calendar, Clock, CreditCard, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SubscriptionDashboard() {
  const { user, isPremium } = useAuth();

  if (!user) return null;

  const premiumUntil = user.premium_until ? new Date(user.premium_until) : null;
  const now = new Date();
  const daysRemaining = premiumUntil 
    ? Math.ceil((premiumUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 7;
  const isExpired = premiumUntil && premiumUntil < now;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNextPaymentDate = () => {
    if (!premiumUntil) return null;
    return formatDate(premiumUntil);
  };

  const getPackageLabel = () => {
    if (user.package_type === 'yearly') return 'Yearly Premium';
    if (user.package_type === 'monthly') return 'Monthly Premium';
    return 'Premium';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Subscription Status
        </CardTitle>
        <CardDescription>
          Manage your subscription and view billing details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isPremium ? (
          <>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Crown className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{getPackageLabel()}</h3>
                  <p className="text-sm text-gray-600">Full access to all premium content</p>
                </div>
              </div>
              <Badge className="bg-yellow-500 text-white">Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm">Package Type</span>
                </div>
                <p className="font-semibold">
                  {user.package_type === 'yearly' ? 'Yearly (৳2,499/year)' : 
                   user.package_type === 'monthly' ? 'Monthly (৳299/month)' : 
                   'Premium'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Valid Until</span>
                </div>
                <p className="font-semibold">
                  {premiumUntil ? formatDate(premiumUntil) : 'Lifetime'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Days Remaining</span>
                </div>
                <p className={`font-semibold ${isExpiringSoon ? 'text-orange-600' : isExpired ? 'text-red-600' : 'text-green-600'}`}>
                  {isExpired ? 'Expired' : daysRemaining > 0 ? `${daysRemaining} days` : 'Lifetime'}
                </p>
              </div>
            </div>

            {isExpiringSoon && !isExpired && (
              <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <p className="font-medium text-orange-800">Your subscription expires soon!</p>
                  <p className="text-sm text-orange-600">Renew before {getNextPaymentDate()} to continue accessing premium content.</p>
                </div>
                <Link to="/pricing">
                  <Button className="bg-orange-600 hover:bg-orange-700">Renew Now</Button>
                </Link>
              </div>
            )}

            {isExpired && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium text-red-800">Your subscription has expired!</p>
                  <p className="text-sm text-red-600">Renew now to regain access to premium content.</p>
                </div>
                <Link to="/pricing">
                  <Button className="bg-red-600 hover:bg-red-700">Renew Now</Button>
                </Link>
              </div>
            )}

            {premiumUntil && !isExpired && (
              <div className="text-sm text-gray-500">
                <p>Next payment due: <span className="font-medium">{getNextPaymentDate()}</span></p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Free Plan</h3>
            <p className="text-gray-600 mb-6">
              Upgrade to Premium to unlock all vocabulary and grammar lessons, plus exclusive content.
            </p>
            <Link to="/pricing">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
