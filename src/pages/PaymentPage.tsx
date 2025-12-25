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
  const packageType = searchParams.get('package') as 'monthly' | 'yearly' || 'monthly';

  const [settings, setSettings] = useState<PaymentSettings>(DEFAULT_SETTINGS);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { user } = useAuth();
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
    } catch (err) {
      console.log('Using default payment settings');
    } finally {
      setLoadingSettings(false);
    }
  };

  const selectedPackage = {
    name: packageType === 'yearly' ? 'Premium Yearly' : 'Premium Monthly',
    price: packageType === 'yearly' ? settings.yearly_price : settings.monthly_price,
    duration: packageType === 'yearly' ? '1 Year' : '1 Month',
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(settings.bkash_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!transactionId.trim()) {
      setError('Please enter your bKash Transaction ID');
      setLoading(false);
      return;
    }

    if (!senderNumber.trim()) {
      setError('Please enter your bKash number');
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured() || !supabase) {
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
      const { error: insertError } = await supabase
        .from('payment_requests')
        .insert({
          user_id: user.id,
          user_email: user.email,
          package_type: packageType,
          package_name: selectedPackage.name,
          amount: selectedPackage.price,
          transaction_id: transactionId.trim(),
          sender_number: senderNumber.trim(),
          status: 'pending',
        });

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This Transaction ID has already been submitted. Please check your payment status or contact support.');
        } else {
          setError('Failed to submit payment. Please try again or contact support.');
        }
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

    if (loadingSettings) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      );
    }

    if (!user) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Login Required</CardTitle>
              <CardDescription>Please login to make a payment</CardDescription>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-green-600">Payment Submitted!</CardTitle>
            <CardDescription>
              Your payment is being verified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Clock className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Your payment will be verified within <strong>1-24 hours</strong>. 
                Once verified, your premium access will be activated automatically.
              </AlertDescription>
            </Alert>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Package:</span>
                <span className="font-medium">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">৳{selectedPackage.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{transactionId}</span>
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/pricing')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pricing
        </Button>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-pink-500" />
                Pay with bKash
              </CardTitle>
              <CardDescription>
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
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Payment Instructions:</h4>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                    <span>Open your <strong>bKash app</strong> or dial <strong>*247#</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                    <span>Select <strong>"Send Money"</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                    <div>
                      <span>Enter this bKash number:</span>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="bg-gray-100 px-4 py-2 rounded-lg text-lg font-mono font-bold">
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
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                    <span>Enter amount: <strong>৳{selectedPackage.price}</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">5</span>
                    <span>Add reference: <strong>IELTS Premium</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">6</span>
                    <span>Enter your bKash PIN and confirm</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">7</span>
                    <span>Note down the <strong>Transaction ID (TrxID)</strong> from the confirmation message</span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submit Payment Details</CardTitle>
              <CardDescription>
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
                  <Label htmlFor="transactionId">bKash Transaction ID (TrxID)</Label>
                  <Input
                    id="transactionId"
                    placeholder="e.g., 9K7F5H3D2A"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                    className="font-mono"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    You'll find this in your bKash confirmation SMS
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderNumber">Your bKash Number</Label>
                  <Input
                    id="senderNumber"
                    placeholder="e.g., 01712345678"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    The bKash number you sent the payment from
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Payment'}
                </Button>
              </form>

              <div className="mt-6 flex items-start gap-2 text-sm text-gray-500">
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
