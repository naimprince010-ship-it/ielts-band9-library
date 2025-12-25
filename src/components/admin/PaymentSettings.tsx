import { useState, useEffect } from 'react';
import { CreditCard, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface PaymentSettingsData {
  bkash_number: string;
  bkash_account_name: string;
  monthly_price: number;
  yearly_price: number;
  payment_instructions: string;
}

const DEFAULT_SETTINGS: PaymentSettingsData = {
  bkash_number: '01681354066',
  bkash_account_name: 'IELTS Band 9',
  monthly_price: 299,
  yearly_price: 2499,
  payment_instructions: 'Send money to our bKash number and submit your transaction ID for verification.',
};

export function PaymentSettings() {
  const [settings, setSettings] = useState<PaymentSettingsData>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (data && !error) {
        setSettings({
          bkash_number: data.bkash_number || DEFAULT_SETTINGS.bkash_number,
          bkash_account_name: data.bkash_account_name || DEFAULT_SETTINGS.bkash_account_name,
          monthly_price: data.monthly_price || DEFAULT_SETTINGS.monthly_price,
          yearly_price: data.yearly_price || DEFAULT_SETTINGS.yearly_price,
          payment_instructions: data.payment_instructions || DEFAULT_SETTINGS.payment_instructions,
        });
      }
    } catch (err) {
      console.log('No existing payment settings found, using defaults');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setMessage({ type: 'error', text: 'Supabase not configured' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: 1,
          bkash_number: settings.bkash_number,
          bkash_account_name: settings.bkash_account_name,
          monthly_price: settings.monthly_price,
          yearly_price: settings.yearly_price,
          payment_instructions: settings.payment_instructions,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Payment settings saved successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Save failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert className={message.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-pink-500" />
            bKash Payment Settings
          </CardTitle>
          <CardDescription>
            Configure your bKash payment details that will be shown to users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bkash-number">bKash Number</Label>
              <Input
                id="bkash-number"
                value={settings.bkash_number}
                onChange={(e) => setSettings(prev => ({ ...prev, bkash_number: e.target.value }))}
                placeholder="01XXXXXXXXX"
              />
              <p className="text-xs text-gray-500">
                This number will be shown to users for sending payments
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bkash-name">Account Name</Label>
              <Input
                id="bkash-name"
                value={settings.bkash_account_name}
                onChange={(e) => setSettings(prev => ({ ...prev, bkash_account_name: e.target.value }))}
                placeholder="Account holder name"
              />
              <p className="text-xs text-gray-500">
                Name associated with the bKash account
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Package Pricing</CardTitle>
          <CardDescription>
            Set the prices for your subscription packages (in BDT)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-price">Monthly Price (৳)</Label>
              <Input
                id="monthly-price"
                type="number"
                value={settings.monthly_price}
                onChange={(e) => setSettings(prev => ({ ...prev, monthly_price: parseInt(e.target.value) || 0 }))}
                placeholder="299"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearly-price">Yearly Price (৳)</Label>
              <Input
                id="yearly-price"
                type="number"
                value={settings.yearly_price}
                onChange={(e) => setSettings(prev => ({ ...prev, yearly_price: parseInt(e.target.value) || 0 }))}
                placeholder="2499"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Instructions</CardTitle>
          <CardDescription>
            Custom instructions shown to users on the payment page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={settings.payment_instructions}
            onChange={(e) => setSettings(prev => ({ ...prev, payment_instructions: e.target.value }))}
            placeholder="Enter payment instructions..."
            rows={4}
          />
        </CardContent>
      </Card>

      <Card className="bg-pink-50 border-pink-200">
        <CardHeader>
          <CardTitle className="text-pink-800">Current Settings Preview</CardTitle>
        </CardHeader>
        <CardContent className="text-pink-700 space-y-2">
          <p><strong>bKash Number:</strong> {settings.bkash_number}</p>
          <p><strong>Account Name:</strong> {settings.bkash_account_name}</p>
          <p><strong>Monthly Price:</strong> ৳{settings.monthly_price}</p>
          <p><strong>Yearly Price:</strong> ৳{settings.yearly_price}</p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Payment Settings
        </Button>
      </div>
    </div>
  );
}
