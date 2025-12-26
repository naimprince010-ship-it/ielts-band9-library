import { useState, useEffect } from 'react';
import { Image, Globe, Save, Loader2, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface SiteSettingsData {
  favicon_url: string;
  og_image_url: string;
  site_title: string;
  site_description: string;
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  favicon_url: '/vite.svg',
  og_image_url: '',
  site_title: 'IELTS Band 9 Materials Library',
  site_description: 'Master IELTS with our comprehensive vocabulary and grammar lessons. Achieve Band 9 with expert-crafted materials.'
};

export function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsData>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<'favicon' | 'og' | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

    const loadSettings = async () => {
      if (!isSupabaseConfigured() || !supabase) return;
    
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*');
      
      if (data && !error && data.length > 0) {
        const settingsMap: Record<string, string> = {};
        data.forEach((item: { key: string; value: string }) => {
          settingsMap[item.key] = item.value;
        });
        setSettings({
          favicon_url: settingsMap.favicon_url || DEFAULT_SETTINGS.favicon_url,
          og_image_url: settingsMap.og_image_url || DEFAULT_SETTINGS.og_image_url,
          site_title: settingsMap.site_title || DEFAULT_SETTINGS.site_title,
          site_description: settingsMap.site_description || DEFAULT_SETTINGS.site_description
        });
      }
    } catch (err) {
      console.log('No existing settings found, using defaults');
    }
  };

    const handleFileUpload = async (file: File, type: 'favicon' | 'og') => {
      if (!isSupabaseConfigured() || !supabase) {
        setMessage({ type: 'error', text: 'Supabase not configured' });
        return;
      }

      setUploading(type);
      setMessage(null);

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${type}-${Date.now()}.${fileExt}`;
        const filePath = `site-assets/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('site-assets')
          .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('site-assets')
          .getPublicUrl(filePath);

      if (type === 'favicon') {
        setSettings(prev => ({ ...prev, favicon_url: publicUrl }));
      } else {
        setSettings(prev => ({ ...prev, og_image_url: publicUrl }));
      }

      setMessage({ type: 'success', text: `${type === 'favicon' ? 'Favicon' : 'OG Image'} uploaded successfully!` });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Upload failed: ${err.message}` });
    } finally {
      setUploading(null);
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
        // Save each setting as a key-value pair
        const settingsToSave = [
          { key: 'favicon_url', value: settings.favicon_url },
          { key: 'og_image_url', value: settings.og_image_url },
          { key: 'site_title', value: settings.site_title },
          { key: 'site_description', value: settings.site_description },
        ];

        for (const setting of settingsToSave) {
          const { error } = await supabase
            .from('site_settings')
            .upsert({
              key: setting.key,
              value: setting.value,
              updated_at: new Date().toISOString()
            }, { onConflict: 'key' });

          if (error) throw error;
        }

      updateMetaTags(settings);
      setMessage({ type: 'success', text: 'Settings saved successfully! Changes will apply on next page load.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Save failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const updateMetaTags = (settings: SiteSettingsData) => {
    document.title = settings.site_title;
    
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.setAttribute('href', settings.favicon_url);
    }

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage && settings.og_image_url) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    if (ogImage && settings.og_image_url) {
      ogImage.setAttribute('content', settings.og_image_url);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', settings.site_title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', settings.site_description);
  };

  return (
    <div className="space-y-6">
      {message && (
        <Alert className={message.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-indigo-600" />
              Favicon
            </CardTitle>
            <CardDescription>
              The small icon shown in browser tabs (recommended: 32x32 or 64x64 PNG/ICO)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-gray-50">
                {settings.favicon_url ? (
                  <img 
                    src={settings.favicon_url} 
                    alt="Favicon preview" 
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/vite.svg';
                    }}
                  />
                ) : (
                  <Image className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="favicon-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    {uploading === 'favicon' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    <span>Upload Favicon</span>
                  </div>
                </Label>
                <input
                  id="favicon-upload"
                  type="file"
                  accept="image/*,.ico"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'favicon');
                  }}
                  disabled={uploading !== null}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="favicon-url">Or enter URL directly</Label>
              <Input
                id="favicon-url"
                value={settings.favicon_url}
                onChange={(e) => setSettings(prev => ({ ...prev, favicon_url: e.target.value }))}
                placeholder="https://example.com/favicon.ico"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Social Share Image (OG Image)
            </CardTitle>
            <CardDescription>
              Image shown when sharing on Facebook, Twitter, etc. (recommended: 1200x630)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 h-16 border rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                {settings.og_image_url ? (
                  <img 
                    src={settings.og_image_url} 
                    alt="OG Image preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <Globe className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="og-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    {uploading === 'og' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    <span>Upload OG Image</span>
                  </div>
                </Label>
                <input
                  id="og-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'og');
                  }}
                  disabled={uploading !== null}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="og-url">Or enter URL directly</Label>
              <Input
                id="og-url"
                value={settings.og_image_url}
                onChange={(e) => setSettings(prev => ({ ...prev, og_image_url: e.target.value }))}
                placeholder="https://example.com/og-image.png"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site Meta Information</CardTitle>
          <CardDescription>
            Title and description shown in search results and social shares
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site-title">Site Title</Label>
            <Input
              id="site-title"
              value={settings.site_title}
              onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
              placeholder="IELTS Band 9 Materials Library"
            />
          </div>
          <div>
            <Label htmlFor="site-description">Site Description</Label>
            <Input
              id="site-description"
              value={settings.site_description}
              onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
              placeholder="Master IELTS with our comprehensive vocabulary and grammar lessons."
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 space-y-2">
          <p>1. <strong>Favicon:</strong> Upload a square image (32x32 or 64x64 pixels) in PNG or ICO format.</p>
          <p>2. <strong>OG Image:</strong> Upload a landscape image (1200x630 pixels) for best social media display.</p>
          <p>3. <strong>Storage:</strong> Images are stored in Supabase storage. Make sure you have created a "site-assets" bucket (public).</p>
          <p>4. <strong>Apply Changes:</strong> After saving, refresh the page to see favicon changes. OG image changes will appear when sharing links.</p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
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
  );
}
