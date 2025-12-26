import { useState, useEffect } from 'react';
import { Save, Loader2, Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string;
  updated_at: string;
}

export function ContactSettingsManagement() {
  const [settings, setSettings] = useState<Record<string, string>>({
    support_phone: '',
    support_email: '',
    support_hours: '',
    whatsapp_link: '',
    company_name: '',
    company_address: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchSettings = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      (data || []).forEach((setting: SiteSetting) => {
        settingsMap[setting.key] = setting.value;
      });

      setSettings(prev => ({ ...prev, ...settingsMap }));
    } catch (err) {
      console.error('Failed to fetch settings:', err);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!isSupabaseConfigured() || !supabase) return;

    setSaving(true);
    setError('');

    try {
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from('site_settings')
          .upsert({
            key,
            value,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'key' });

        if (error) throw error;
      }

      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      setError('Failed to save settings. Please try again.');
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Contact Settings
        </CardTitle>
        <CardDescription>
          Manage contact information displayed on the Contact Us page
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-600" />
                Support Phone / WhatsApp
              </Label>
              <Input
                value={settings.support_phone}
                onChange={(e) => setSettings({ ...settings, support_phone: e.target.value })}
                placeholder="+880 1712-345678"
              />
              <p className="text-xs text-gray-500">This number will be displayed on the Contact page</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-600" />
                Support Email
              </Label>
              <Input
                type="email"
                value={settings.support_email}
                onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                placeholder="support@ieltstree.com"
              />
              <p className="text-xs text-gray-500">Email address for support inquiries</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-600" />
                Support Hours
              </Label>
              <Input
                value={settings.support_hours}
                onChange={(e) => setSettings({ ...settings, support_hours: e.target.value })}
                placeholder="9 AM - 10 PM (BST)"
              />
              <p className="text-xs text-gray-500">Business hours for support</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-indigo-600" />
                WhatsApp Link
              </Label>
              <Input
                value={settings.whatsapp_link}
                onChange={(e) => setSettings({ ...settings, whatsapp_link: e.target.value })}
                placeholder="https://wa.me/8801712345678"
              />
              <p className="text-xs text-gray-500">Direct WhatsApp chat link</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Company Name
              </Label>
              <Input
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                placeholder="IELTS Band 9 Materials Library"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-600" />
                Company Address
              </Label>
              <Input
                value={settings.company_address}
                onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
                placeholder="Dhaka, Bangladesh"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
