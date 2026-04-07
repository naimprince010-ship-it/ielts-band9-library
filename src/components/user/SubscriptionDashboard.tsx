import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Calendar, Clock, CreditCard, AlertCircle, CheckCircle2, ArrowUpCircle, ArrowDownCircle, History, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaymentEvent {
  date: string;
  type: 'payment' | 'activation' | 'renewal' | 'expiry';
  description: string;
  amount?: string;
}

interface PaymentRequest {
  id: string;
  package_name: string;
  amount: number;
  transaction_id: string;
  status: string;
  created_at: string;
}

export function SubscriptionDashboard() {
  const { user, isPremium } = useAuth();
  const [payments, setPayments] = useState<PaymentRequest[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    if (!user || !isSupabaseConfigured() || !supabase) {
      setLoadingPayments(false);
      return;
    }
    
    const fetchPayments = async () => {
      try {
        const { data, error } = await supabase
          .from('payment_requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          setPayments(data);
        }
      } catch (err) {
        console.error('Failed to fetch payments:', err);
      } finally {
        setLoadingPayments(false);
      }
    };
    
    fetchPayments();
  }, [user]);

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

  const getPaymentTimeline = (): PaymentEvent[] => {
    const events: PaymentEvent[] = [];
    
    if (user.created_at) {
      events.push({
        date: new Date(user.created_at).toLocaleDateString(),
        type: 'activation',
        description: 'Account created'
      });
    }
    
    if (isPremium && premiumUntil) {
      const activationDate = new Date(premiumUntil);
      if (user.package_type === 'yearly') {
        activationDate.setFullYear(activationDate.getFullYear() - 1);
      } else if (user.package_type === 'monthly') {
        activationDate.setMonth(activationDate.getMonth() - 1);
      }
      
      events.push({
        date: activationDate.toLocaleDateString(),
        type: 'payment',
        description: `${getPackageLabel()} activated`,
        amount: user.package_type === 'yearly' ? '৳2,499' : user.package_type === 'monthly' ? '৳299' : ''
      });
      
      if (!isExpired) {
        events.push({
          date: formatDate(premiumUntil),
          type: 'renewal',
          description: 'Next renewal due'
        });
      } else {
        events.push({
          date: formatDate(premiumUntil),
          type: 'expiry',
          description: 'Subscription expired'
        });
      }
    }
    
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getEventIcon = (type: PaymentEvent['type']) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="h-4 w-4 text-green-600" />;
      case 'activation':
        return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
      case 'renewal':
        return <Calendar className="h-4 w-4 text-indigo-600" />;
      case 'expiry':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
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

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Change Plan</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.package_type === 'monthly' && (
                  <Link to="/pricing" className="block">
                    <div className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-400 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUpCircle className="h-5 w-5 text-indigo-600" />
                        <span className="font-medium">Upgrade to Yearly</span>
                      </div>
                      <p className="text-sm text-gray-600">Save ৳1,089/year (30% off)</p>
                      <p className="text-xs text-indigo-600 mt-1">৳2,499/year instead of ৳3,588</p>
                    </div>
                  </Link>
                )}
                {user.package_type === 'yearly' && (
                  <Link to="/pricing" className="block">
                    <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowDownCircle className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Switch to Monthly</span>
                      </div>
                      <p className="text-sm text-gray-600">More flexibility, pay as you go</p>
                      <p className="text-xs text-gray-500 mt-1">৳299/month</p>
                    </div>
                  </Link>
                )}
                <Link to="/pricing" className="block">
                  <div className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-5 w-5 text-green-600" />
                      <span className="font-medium">View All Plans</span>
                    </div>
                    <p className="text-sm text-gray-600">Compare features and pricing</p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Free Plan</h3>
            <p className="text-muted-foreground mb-6">
              Upgrade to Premium to unlock all vocabulary and grammar lessons, plus exclusive content.
            </p>
            <Link to="/pricing">
              <Button>
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </Link>
          </div>
        )}

        {/* Payment History Section */}
        {loadingPayments ? (
          <div className="flex justify-center py-4 border-t mt-6">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : payments.length > 0 ? (
          <div className="border-t pt-6 mt-6">
            <h4 className="font-medium flex items-center gap-2 mb-4 text-foreground">
              <History className="h-4 w-4 text-muted-foreground" />
              Recent Transactions
            </h4>
            <div className="space-y-3">
              {payments.map(payment => (
                <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted rounded-lg gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{payment.package_name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>TrxID: {payment.transaction_id}</span>
                      <span>•</span>
                      <span>{new Date(payment.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <span className="font-bold text-foreground">৳{payment.amount}</span>
                    <Badge variant={
                      payment.status === 'approved' ? 'default' : 
                      payment.status === 'rejected' ? 'destructive' : 
                      'outline'
                    } className={
                       payment.status === 'approved' ? 'bg-green-500 hover:bg-green-600' :
                       payment.status === 'pending' ? 'bg-amber-500 text-white hover:bg-amber-600 border-none' : ''
                    }>
                      {payment.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
