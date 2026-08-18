import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Clock3, Loader2, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { trackFunnelEvent } from '@/lib/funnel';

interface PaymentRequestStatus {
  id: string;
  package_name: string;
  amount: number;
  transaction_id: string;
  status: 'pending' | 'approved' | 'rejected';
  return_path?: string | null;
  created_at: string;
}

export default function PaymentStatusPage() {
  const { requestId } = useParams();
  const [payment, setPayment] = useState<PaymentRequestStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPayment = useCallback(async (quiet = false) => {
    if (!requestId || !supabase) {
      setError('Payment request is unavailable.');
      setLoading(false);
      return;
    }
    if (!quiet) setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('payment_requests')
      .select('id, package_name, amount, transaction_id, status, return_path, created_at')
      .eq('id', requestId)
      .single();

    if (fetchError || !data) setError('Payment request was not found or you do not have access.');
    else {
      setPayment(data as PaymentRequestStatus);
      setError('');
    }
    setLoading(false);
  }, [requestId]);

  useEffect(() => {
    loadPayment();
    const timer = window.setInterval(() => loadPayment(true), 15_000);
    return () => window.clearInterval(timer);
  }, [loadPayment]);

  useEffect(() => {
    if (payment?.status === 'approved') {
      trackFunnelEvent('payment_approved', { requestId: payment.id, amount: payment.amount });
    }
  }, [payment?.id, payment?.status, payment?.amount]);

  if (loading) return <div className="grid min-h-[70vh] place-items-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>;

  const state = payment?.status || 'pending';
  const Icon = state === 'approved' ? CheckCircle2 : state === 'rejected' ? XCircle : Clock3;
  const title = state === 'approved' ? 'Payment approved' : state === 'rejected' ? 'Payment needs attention' : 'Verification in progress';
  const description = state === 'approved'
    ? 'Your Premium access is active. You can continue to your learning workspace.'
    : state === 'rejected'
      ? 'The payment could not be verified. Check the details or contact support before submitting again.'
      : 'Our team will verify your bKash transaction. This normally takes up to 24 hours.';

  return (
    <main className="min-h-[75vh] bg-slate-50 px-4 py-12">
      <Card className="mx-auto max-w-xl border-slate-200 shadow-sm">
        <CardHeader className="text-center">
          <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${state === 'approved' ? 'bg-emerald-100 text-emerald-700' : state === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
            <Icon className="h-8 w-8" />
          </span>
          <CardTitle className="mt-3 text-2xl">{error || title}</CardTitle>
          <CardDescription>{error || description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {payment && (
            <div className="space-y-3 rounded-xl bg-slate-100 p-4 text-sm">
              <div className="flex justify-between gap-4"><span className="text-slate-500">Package</span><strong>{payment.package_name}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Amount</span><strong>৳{payment.amount}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">TrxID</span><strong className="font-mono">{payment.transaction_id}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Status</span><Badge>{payment.status.toUpperCase()}</Badge></div>
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            {state === 'approved' && payment ? (
              <Button asChild className="flex-1 bg-indigo-700 hover:bg-indigo-800"><a href={payment.return_path || '/dashboard'}>Continue learning</a></Button>
            ) : state === 'rejected' ? (
              <Button asChild className="flex-1"><Link to="/pricing">Choose a plan</Link></Button>
            ) : (
              <Button className="flex-1" variant="outline" onClick={() => loadPayment()}><RefreshCw className="mr-2 h-4 w-4" />Refresh status</Button>
            )}
            <Button asChild variant="outline" className="flex-1"><Link to="/dashboard">Go to dashboard</Link></Button>
          </div>
          {state === 'pending' && <p className="flex items-start gap-2 text-sm text-slate-500"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />Keep this page bookmarked. It automatically checks for updates every 15 seconds.</p>}
        </CardContent>
      </Card>
    </main>
  );
}
