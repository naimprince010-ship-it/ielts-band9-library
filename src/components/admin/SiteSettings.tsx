import { useState, useEffect } from 'react';
import { 
  Image, Globe, Save, Loader2, Upload, Plus, Trash2, Edit, 
  Phone, Mail, Clock, MapPin, MessageCircle, Settings, Shield,
  Info, AlertCircle, CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface SiteSetting {
  id?: string;
  key: string;
  value: string;
  description?: string;
  updated_at?: string;
}

const CRITICAL_KEYS = ['site_title', 'site_description', 'favicon_url', 'og_image_url'];
const CONTACT_KEYS = ['support_phone', 'support_email', 'support_hours', 'whatsapp_link', 'company_name', 'company_address'];

export function SiteSettings() {
  const [allSettings, setAllSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null); // key being saved or 'all'
  const [uploading, setUploading] = useState<'favicon' | 'og' | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Dialog state for adding/editing dynamic settings
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<SiteSetting | null>(null);
  const [dialogData, setDialogData] = useState({ key: '', value: '', description: '' });

  useEffect(() => {
    loadAllSettings();
  }, []);

  const loadAllSettings = async () => {
    if (!isSupabaseConfigured() || !supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key', { ascending: true });

      if (error) throw error;
      setAllSettings(data || []);
    } catch (err: any) {
      console.error('Failed to load settings:', err);
      setMessage({ type: 'error', text: `Failed to load settings: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const getSettingValue = (key: string, defaultValue = '') => {
    return allSettings.find(s => s.key === key)?.value || defaultValue;
  };

  const updateSettingLocal = (key: string, value: string) => {
    setAllSettings(prev => {
      const existing = prev.find(s => s.key === key);
      if (existing) {
        return prev.map(s => s.key === key ? { ...s, value } : s);
      }
      return [...prev, { key, value }];
    });
  };

  const handleFileUpload = async (file: File, type: 'favicon' | 'og') => {
    if (!isSupabaseConfigured() || !supabase) return;

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

      const key = type === 'favicon' ? 'favicon_url' : 'og_image_url';
      
      // Save to database immediately for uploads
      const { error: dbError } = await supabase
        .from('site_settings')
        .upsert({ key, value: publicUrl, updated_at: new Date().toISOString() }, { onConflict: 'key' });

      if (dbError) throw dbError;

      updateSettingLocal(key, publicUrl);
      setMessage({ type: 'success', text: `${type === 'favicon' ? 'Favicon' : 'OG Image'} uploaded and saved!` });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Upload failed: ${err.message}` });
    } finally {
      setUploading(null);
    }
  };

  const saveSetting = async (key: string, value: string, description?: string) => {
    if (!isSupabaseConfigured() || !supabase) return;
    setSaving(key);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ 
          key, 
          value, 
          description,
          updated_at: new Date().toISOString() 
        }, { onConflict: 'key' });

      if (error) throw error;
      
      if (CRITICAL_KEYS.includes(key)) {
        updateMetaTags();
      }
      
      setMessage({ type: 'success', text: `Setting "${key}" saved successfully!` });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Failed to save "${key}": ${err.message}` });
    } finally {
      setSaving(null);
      loadAllSettings(); // Refresh to get IDs for new settings
    }
  };

  const handleBulkSave = async (keys: string[]) => {
    if (!isSupabaseConfigured() || !supabase) return;
    setSaving('all');
    try {
      for (const key of keys) {
        const value = getSettingValue(key);
        const { error } = await supabase
          .from('site_settings')
          .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
        if (error) throw error;
      }
      updateMetaTags();
      setMessage({ type: 'success', text: 'All settings saved successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Bulk save failed: ${err.message}` });
    } finally {
      setSaving(null);
    }
  };

  const deleteSetting = async (key: string) => {
    if (!confirm(`Are you sure you want to delete the "${key}" setting?`)) return;
    if (!isSupabaseConfigured() || !supabase) return;
    
    setSaving(key);
    try {
      const { error } = await supabase
        .from('site_settings')
        .delete()
        .eq('key', key);

      if (error) throw error;
      setAllSettings(prev => prev.filter(s => s.key !== key));
      setMessage({ type: 'success', text: `Setting "${key}" deleted.` });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Delete failed: ${err.message}` });
    } finally {
      setSaving(null);
    }
  };

  const updateMetaTags = () => {
    const title = getSettingValue('site_title');
    const desc = getSettingValue('site_description');
    const favicon = getSettingValue('favicon_url');
    // const ogImage = getSettingValue('og_image_url');

    if (title) document.title = title;
    
    if (favicon) {
      const link = document.querySelector('link[rel="icon"]');
      if (link) link.setAttribute('href', favicon);
    }

    // This part is mostly for immediate feedback in the admin session
    console.log('Meta tags updated in memory');
  };

  const handleOpenDialog = (setting: SiteSetting | null = null) => {
    if (setting) {
      setEditingSetting(setting);
      setDialogData({ key: setting.key, value: setting.value, description: setting.description || '' });
    } else {
      setEditingSetting(null);
      setDialogData({ key: '', value: '', description: '' });
    }
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = () => {
    if (!dialogData.key || !dialogData.value) {
      alert('Key and Value are required');
      return;
    }
    saveSetting(dialogData.key, dialogData.value, dialogData.description);
    setIsDialogOpen(false);
  };

  if (loading && allSettings.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="h-8 w-8 text-indigo-600" />
            Site Settings
          </h2>
          <p className="text-slate-500 font-medium">Global configuration, SEO, and contact information</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 rounded-2xl shadow-lg shadow-indigo-100 font-bold text-white transition-all hover:scale-105 active:scale-95">
          <Plus className="h-5 w-5 mr-2" /> Add Custom Setting
        </Button>
      </div>

      {message && (
        <Alert className={cn(
          "rounded-2xl border-none shadow-sm animate-in zoom-in-95 duration-300",
          message.type === 'success' ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'
        )}>
          <div className="flex items-center gap-3">
            {message.type === 'success' ? <CheckCircle className="h-5 w-5 text-emerald-600" /> : <AlertCircle className="h-5 w-5 text-rose-600" />}
            <AlertDescription className="font-bold">{message.text}</AlertDescription>
          </div>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-slate-100 p-1.5 rounded-2xl w-full sm:w-fit">
          <TabsTrigger value="general" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
            <Globe className="h-4 w-4 mr-2" /> General & SEO
          </TabsTrigger>
          <TabsTrigger value="contact" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
            <Phone className="h-4 w-4 mr-2" /> Contact Info
          </TabsTrigger>
          <TabsTrigger value="advanced" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
            <Shield className="h-4 w-4 mr-2" /> All Settings
          </TabsTrigger>
        </TabsList>

        {/* ─── GENERAL & SEO TAB ────────────────────────────────────────────────── */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Image className="h-5 w-5 text-indigo-600" /> Appearance
                </CardTitle>
                <CardDescription className="font-medium">Favicon and branding assets</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    <img 
                      src={getSettingValue('favicon_url', '/vite.svg')} 
                      alt="Favicon" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Favicon URL</Label>
                      <Input 
                        value={getSettingValue('favicon_url')} 
                        onChange={(e) => updateSettingLocal('favicon_url', e.target.value)}
                        className="h-10 rounded-xl border-slate-200 mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Label htmlFor="favicon-upload" className="flex-1">
                        <div className="flex items-center justify-center gap-2 h-10 border-2 border-dashed rounded-xl hover:bg-white hover:border-indigo-400 cursor-pointer transition-all text-xs font-bold text-slate-500 hover:text-indigo-600">
                          {uploading === 'favicon' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          Upload New
                        </div>
                      </Label>
                      <input type="file" id="favicon-upload" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'favicon')} />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">OG Share Image</Label>
                   <div className="aspect-[1.91/1] w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative group">
                      <img 
                        src={getSettingValue('og_image_url')} 
                        alt="Social Share" 
                        className="w-full h-full object-cover"
                      />
                      <Label htmlFor="og-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                         <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-slate-900 shadow-xl">
                            {uploading === 'og' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            Change Image
                         </div>
                      </Label>
                      <input type="file" id="og-upload" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'og')} />
                   </div>
                   <Input 
                      value={getSettingValue('og_image_url')} 
                      onChange={(e) => updateSettingLocal('og_image_url', e.target.value)}
                      className="h-10 rounded-xl border-slate-200"
                      placeholder="Or enter public URL"
                   />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-600" /> Meta Information
                </CardTitle>
                <CardDescription className="font-medium">Site title and SEO description</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Site Title</Label>
                    <Input 
                      value={getSettingValue('site_title')} 
                      onChange={(e) => updateSettingLocal('site_title', e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 text-lg font-bold"
                      placeholder="e.g. IELTS Band 9 Library"
                    />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">SEO Description</Label>
                    <Textarea 
                      value={getSettingValue('site_description')} 
                      onChange={(e) => updateSettingLocal('site_description', e.target.value)}
                      className="rounded-2xl border-slate-200 min-h-[150px] font-medium"
                      placeholder="Describe your site for search engines..."
                    />
                 </div>
                 <Button 
                   onClick={() => handleBulkSave(CRITICAL_KEYS)} 
                   disabled={saving === 'all'}
                   className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold shadow-xl shadow-slate-200 transition-all active:scale-95"
                 >
                   {saving === 'all' ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                   Save Meta Settings
                 </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ─── CONTACT INFO TAB ─────────────────────────────────────────────────── */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
            <CardHeader className="p-8 pb-2">
              <CardTitle className="text-2xl font-black text-slate-900">Contact & Support Details</CardTitle>
              <CardDescription className="font-medium">The values here are shown in the footer and contact page</CardDescription>
            </CardHeader>
            <CardContent className="p-8 grid md:grid-cols-2 gap-8">
               {[
                 { key: 'support_phone', label: 'Support Phone', icon: <Phone className="h-4 w-4" />, placeholder: '+880 17xx-xxxxxx' },
                 { key: 'support_email', label: 'Support Email', icon: <Mail className="h-4 w-4" />, placeholder: 'support@ieltstree.com' },
                 { key: 'support_hours', label: 'Working Hours', icon: <Clock className="h-4 w-4" />, placeholder: '9 AM - 10 PM (BST)' },
                 { key: 'whatsapp_link', label: 'WhatsApp Link', icon: <MessageCircle className="h-4 w-4" />, placeholder: 'https://wa.me/...' },
                 { key: 'company_name', label: 'Company Name', icon: <Shield className="h-4 w-4" />, placeholder: 'IELTS Band 9 Library' },
                 { key: 'company_address', label: 'Office Address', icon: <MapPin className="h-4 w-4" />, placeholder: 'Dhaka, Bangladesh' },
               ].map((item) => (
                 <div key={item.key} className="space-y-2">
                    <Label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                       {item.icon} {item.label}
                    </Label>
                    <Input 
                      value={getSettingValue(item.key)} 
                      onChange={(e) => updateSettingLocal(item.key, e.target.value)}
                      className="h-12 rounded-xl border-slate-200 font-bold"
                      placeholder={item.placeholder}
                    />
                 </div>
               ))}
               <div className="md:col-span-2 pt-4">
                  <Button 
                    onClick={() => handleBulkSave(CONTACT_KEYS)} 
                    disabled={saving === 'all'}
                    className="w-full md:w-fit h-14 px-12 rounded-2xl bg-indigo-600 hover:bg-slate-900 text-white font-bold shadow-xl shadow-indigo-100 transition-all"
                  >
                    {saving === 'all' ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                    Update Contact Information
                  </Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── ALL SETTINGS (ADVANCED) TAB ──────────────────────────────────────── */}
        <TabsContent value="advanced" className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
            <CardHeader className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-bold">Dynamic Dictionary</CardTitle>
                  <CardDescription className="font-medium">Manage all key-value pairs in the database</CardDescription>
                </div>
                <div className="relative">
                  <Settings className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input className="h-10 rounded-xl bg-slate-50 border-none w-64 pr-10 text-xs font-bold" placeholder="Filter keys..." />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-slate-50 border-y border-slate-100">
                     <tr>
                       <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Key</th>
                       <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Value</th>
                       <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                       <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {allSettings.length === 0 ? (
                       <tr>
                         <td colSpan={4} className="px-8 py-20 text-center font-bold text-slate-300 italic">No settings found in database</td>
                       </tr>
                     ) : (
                       allSettings.map((s) => (
                         <tr key={s.key} className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-5">
                             <code className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-indigo-100">{s.key}</code>
                           </td>
                           <td className="px-8 py-5">
                             <p className="text-sm font-bold text-slate-900 truncate max-w-[250px]">{s.value}</p>
                           </td>
                           <td className="px-8 py-5">
                             <p className="text-xs font-medium text-slate-500">{s.description || '—'}</p>
                           </td>
                           <td className="px-8 py-5 text-right">
                             <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-md text-slate-400 hover:text-indigo-600" onClick={() => handleOpenDialog(s)}>
                                 <Edit className="h-4 w-4" />
                               </Button>
                               <Button 
                                 variant="ghost" 
                                 size="icon" 
                                 className="h-9 w-9 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600" 
                                 onClick={() => deleteSetting(s.key)}
                                 disabled={saving === s.key}
                               >
                                 {saving === s.key ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                               </Button>
                             </div>
                           </td>
                         </tr>
                       ))
                     )}
                   </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ─── ADD/EDIT DIALOG ──────────────────────────────────────────────────── */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden sm:max-w-md">
          <DialogHeader className="p-8 pb-4">
             <DialogTitle className="text-2xl font-black text-slate-900">
                {editingSetting ? 'Edit Setting' : 'New Setting'}
             </DialogTitle>
             <DialogDescription className="font-medium">
                Define a global variable to use across the application
             </DialogDescription>
          </DialogHeader>
          <div className="p-8 pt-0 space-y-6">
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Key Name</Label>
                <Input 
                  value={dialogData.key} 
                  onChange={(e) => setDialogData({ ...dialogData, key: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                  disabled={!!editingSetting}
                  placeholder="e.g. support_phone"
                  className="h-12 rounded-xl border-slate-200 font-mono font-bold"
                />
             </div>
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Value</Label>
                <Textarea 
                  value={dialogData.value} 
                  onChange={(e) => setDialogData({ ...dialogData, value: e.target.value })}
                  placeholder="Enter the value here..."
                  className="rounded-xl border-slate-200 font-bold"
                  rows={3}
                />
             </div>
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description (Optional)</Label>
                <Input 
                  value={dialogData.description} 
                  onChange={(e) => setDialogData({ ...dialogData, description: e.target.value })}
                  placeholder="What is this setting for?"
                  className="h-12 rounded-xl border-slate-200 font-medium text-xs"
                />
             </div>
          </div>
          <DialogFooter className="p-8 bg-slate-50 flex gap-3">
             <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold h-12">Cancel</Button>
             <Button onClick={handleDialogSubmit} className="rounded-xl font-bold h-12 px-8 bg-indigo-600 hover:bg-slate-900 text-white shadow-lg shadow-indigo-100 flex-1">
                {editingSetting ? 'Update Setting' : 'Add Setting'}
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
