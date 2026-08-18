import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Smartphone, Copy, CheckCircle, AlertCircle, ArrowLeft, Clock, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getFunnelAttribution, trackFunnelEvent } from '@/lib/funnel';
import { calculateDiscountedPrice } from '@/lib/pricing';

interface PaymentSettings {
  bkash_number: string;
  bkash_account_name: string;
  monthly_price: number;
  yearly_price: number;
}

const DEFAULT_SETTINGS: PaymentSettings = {
  bkash_number: '01681354066',
  bkash_account_name: 'IELTS Band 9',
  monthly_price: 299,
  yearly_price: 2499,
};

export function PaymentPage() {
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('package') as 'monthly' | 'yearly' | 'course' || 'monthly';
  const courseId = searchParams.get('courseId');
  const courseName = searchParams.get('name');
  const coursePrice = searchParams.get('price');
  const couponCode = searchParams.get('coupon');

  const [settings, setSettings] = useState<PaymentSettings>(DEFAULT_SETTINGS);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const success = false;
  const [copied, setCopied] = useState(false);
  
  const { user, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPaymentSettings();
  }, []);

  const loadPaymentSettings = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoadingSettings(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('bkash_number, bkash_account_name, monthly_price, yearly_price')
        .single();

      if (data && !error) {
        setSettings({
          bkash_number: data.bkash_number || DEFAULT_SETTINGS.bkash_number,
          bkash_account_name: data.bkash_account_name || DEFAULT_SETTINGS.bkash_account_name,
          monthly_price: data.monthly_price || DEFAULT_SETTINGS.monthly_price,
          yearly_price: data.yearly_price || DEFAULT_SETTINGS.yearly_price,
        });
      }
    } catch {
      console.log('Using default payment settings');
    } finally {
      setLoadingSettings(false);
    }
  };

  const basePackage = {
    name: packageType === 'course' ? (courseName || 'Course') : (packageType === 'yearly' ? 'Premium Yearly' : 'Premium Monthly'),
    price: packageType === 'course' ? (coursePrice ? parseInt(coursePrice) : 0) : (packageType === 'yearly' ? settings.yearly_price : settings.monthly_price),
    duration: packageType === 'course' ? 'Lifetime' : (packageType === 'yearly' ? '1 Year' : '1 Month'),
  };
  const discount = calculateDiscountedPrice(basePackage.price, couponCode);
  const selectedPackage = { ...basePackage, price: discount.finalAmount };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(settings.bkash_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  const validateTransactionId = (id: string): boolean => /^[A-Z0-9]{8,12}$/.test(id);
  const validatePhoneNumber = (num: string): boolean => /^01[3-9]\d{8}$/.test(num);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const trimmedTrxId = transactionId.trim();
    const trimmedPhone = senderNumber.trim();

    if (!trimmedTrxId) {
      setError('Please enter your bKash Transaction ID');
      setLoading(false);
      return;
    }

    if (!validateTransactionId(trimmedTrxId)) {
      setError('Invalid Transaction ID format. bKash TrxID is 8–12 uppercase letters and digits (e.g. 9K7F5H3D2A)');
      setLoading(false);
      return;
    }

    if (!trimmedPhone) {
      setError('Please enter your bKash number');
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(trimmedPhone)) {
      setError('Invalid phone number. Please enter a valid Bangladeshi mobile number (e.g. 01712345678)');
      setLoading(false);
      return;
    }

    if (basePackage.price <= 0) {
      setError('Invalid package price. Please go back and select a valid package.');
      setLoading(false);
      return;
    }

    if (!discount.isValidCoupon) {
      setError('Invalid coupon code. Please return to pricing and apply a valid coupon.');
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured() || !supabase || !session?.access_token) {
      setError('Payment system is not configured. Please contact support.');
      setLoading(false);
      return;
    }

    if (!user) {
      setError('Please login to submit payment');
      setLoading(false);
      return;
    }

    try {
      trackFunnelEvent('payment_started', { package: packageType, amount: selectedPackage.price });
      const attribution = getFunnelAttribution();
      const response = await fetch('/api/create-payment-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          packageType,
          courseId,
          transactionId: trimmedTrxId,
          senderNumber: trimmedPhone,
          offer: attribution?.offer,
          returnPath: packageType === 'course' && courseId ? `/courses/${courseId}` : '/dashboard?payment=success',
          attribution,
          couponCode,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result?.request?.id) {
        setError(result?.error || 'Could not submit payment. Please try again.');
        setLoading(false);
        return;
      }

      trackFunnelEvent('payment_submitted', { package: packageType, amount: result.request.amount, requestId: result.request.id });
      setLoading(false);
      navigate(`/payment/status/${result.request.id}`, { replace: true });
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (loadingSettings) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-foreground">Login Required</CardTitle>
            <CardDescription className="text-muted-foreground">Please login to make a payment</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/login')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-green-600 dark:text-green-400">Payment Submitted!</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your payment is being verified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-accent/10 border-accent/20">
              <Clock className="h-4 w-4 text-accent" />
              <AlertDescription className="text-foreground/80">
                Your payment will be verified within <strong>1-24 hours</strong>. 
                Once verified, your premium access will be activated automatically.
              </AlertDescription>
            </Alert>
            
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Package:</span>
                <span className="font-medium text-foreground">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium text-foreground">৳{selectedPackage.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium text-foreground">{transactionId}</span>
              </div>
            </div>

            <Button onClick={() => navigate('/')} className="w-full">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/pricing')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pricing
        </Button>

        <div className="grid gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Smartphone className="h-6 w-6 text-pink-500" />
                Pay with bKash
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Complete your payment using bKash mobile banking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg p-6">
                <div className="text-center">
                  <p className="text-pink-100 text-sm mb-1">Selected Package</p>
                  <h3 className="text-2xl font-bold">{selectedPackage.name}</h3>
                  <p className="text-4xl font-bold mt-2">৳{selectedPackage.price}</p>
                  <p className="text-pink-100 text-sm mt-1">{selectedPackage.duration} access</p>
                  {discount.couponCode && (
                    <p className="mt-2 text-sm text-white">
                      <span className="line-through opacity-75">৳{discount.baseAmount}</span>
                      <span className="ml-2 rounded-full bg-white/20 px-2 py-1">{discount.couponCode}: save ৳{discount.discountAmount}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-foreground">Payment Instructions:</h4>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                    <span>Open your <strong className="text-foreground">bKash app</strong> or dial <strong className="text-foreground">*247#</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                    <span>Select <strong className="text-foreground">&quot;Send Money&quot;</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                    <div>
                      <span>Enter this bKash number:</span>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="bg-muted px-4 py-2 rounded-lg text-lg font-mono font-bold text-foreground">
                          {settings.bkash_number}
                        </code>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={copyToClipboard}
                        >
                          {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                    <span>Enter amount: <strong className="text-foreground">৳{selectedPackage.price}</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center text-sm font-medium">5</span>
                    <span>Add reference: <strong className="text-foreground">IELTS Premium</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center text-sm font-medium">6</span>
                    <span>Enter your bKash PIN and confirm</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center text-sm font-medium">7</span>
                    <span>Note down the <strong className="text-foreground">Transaction ID (TrxID)</strong> from the confirmation message</span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Submit Payment Details</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your bKash transaction details for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transactionId" className="text-foreground">bKash Transaction ID (TrxID)</Label>
                  <Input
                    id="transactionId"
                    placeholder="e.g., 9K7F5H3D2A"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                    className="font-mono"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    You&apos;ll find this in your bKash confirmation SMS
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderNumber" className="text-foreground">Your bKash Number</Label>
                  <Input
                    id="senderNumber"
                    placeholder="e.g., 01712345678"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    The bKash number you sent the payment from
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Payment'}
                </Button>
              </form>

              <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Your payment will be verified within 1-24 hours. 
                  Once verified, your premium access will be activated automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
