import { useState, useEffect } from 'react';
import { Save, Loader2, FileText, Eye, EyeOff, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface SitePage {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const DEFAULT_PAGES = [
  { slug: 'terms', title: 'Terms of Service', description: 'Legal terms and conditions' },
  { slug: 'privacy', title: 'Privacy Policy', description: 'Privacy and data handling policy' },
];

export function PageContentManagement() {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<SitePage | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    meta_description: '',
    is_published: true,
  });

  const fetchPages = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .order('title');

      if (error) throw error;
      setPages(data || []);
    } catch (err) {
      console.error('Failed to fetch pages:', err);
      setError('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleOpenDialog = (page?: SitePage) => {
    if (page) {
      setEditingPage(page);
      setFormData({
        slug: page.slug,
        title: page.title,
        content: page.content,
        meta_description: page.meta_description || '',
        is_published: page.is_published,
      });
    } else {
      setEditingPage(null);
      setFormData({
        slug: '',
        title: '',
        content: '',
        meta_description: '',
        is_published: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured() || !supabase) return;
    if (!formData.slug || !formData.title || !formData.content) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingPage) {
        const { error } = await supabase
          .from('site_pages')
          .update({
            title: formData.title,
            content: formData.content,
            meta_description: formData.meta_description,
            is_published: formData.is_published,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingPage.id);

        if (error) throw error;
        setSuccess('Page updated successfully!');
      } else {
        const { error } = await supabase
          .from('site_pages')
          .insert({
            slug: formData.slug,
            title: formData.title,
            content: formData.content,
            meta_description: formData.meta_description,
            is_published: formData.is_published,
          });

        if (error) throw error;
        setSuccess('Page created successfully!');
      }

      setIsDialogOpen(false);
      fetchPages();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to save page:', err);
      setError('Failed to save page. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (page: SitePage) => {
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      const { error } = await supabase
        .from('site_pages')
        .update({ is_published: !page.is_published, updated_at: new Date().toISOString() })
        .eq('id', page.id);

      if (error) throw error;
      fetchPages();
    } catch (err) {
      console.error('Failed to toggle page publish status:', err);
    }
  };

  const handleCreateDefaultPage = async (defaultPage: typeof DEFAULT_PAGES[0]) => {
    if (!isSupabaseConfigured() || !supabase) return;

    const existingPage = pages.find(p => p.slug === defaultPage.slug);
    if (existingPage) {
      handleOpenDialog(existingPage);
      return;
    }

    setFormData({
      slug: defaultPage.slug,
      title: defaultPage.title,
      content: `# ${defaultPage.title}\n\nAdd your content here...`,
      meta_description: defaultPage.description,
      is_published: true,
    });
    setEditingPage(null);
    setIsDialogOpen(true);
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
          <FileText className="h-5 w-5" />
          Page Content Management
        </CardTitle>
        <CardDescription>
          Manage content for Terms of Service, Privacy Policy, and other pages
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

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {DEFAULT_PAGES.map((defaultPage) => {
              const existingPage = pages.find(p => p.slug === defaultPage.slug);
              return (
                <Card key={defaultPage.slug} className={`border-2 ${existingPage ? 'border-green-200 bg-green-50' : 'border-dashed border-gray-300'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{defaultPage.title}</h3>
                        <p className="text-sm text-gray-500">{defaultPage.description}</p>
                        {existingPage && (
                          <p className="text-xs text-gray-400 mt-1">
                            Last updated: {new Date(existingPage.updated_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {existingPage && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublish(existingPage)}
                            title={existingPage.is_published ? 'Unpublish' : 'Publish'}
                          >
                            {existingPage.is_published ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        )}
                        <Button
                          variant={existingPage ? 'outline' : 'default'}
                          size="sm"
                          onClick={() => handleCreateDefaultPage(defaultPage)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {existingPage ? 'Edit' : 'Create'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {pages.filter(p => !DEFAULT_PAGES.some(dp => dp.slug === p.slug)).length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Other Pages</h3>
              <div className="space-y-2">
                {pages.filter(p => !DEFAULT_PAGES.some(dp => dp.slug === p.slug)).map((page) => (
                  <div
                    key={page.id}
                    className={`border rounded-lg p-4 ${page.is_published ? 'bg-white' : 'bg-gray-50 opacity-60'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{page.title}</p>
                        <p className="text-sm text-gray-500">/{page.slug}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublish(page)}
                        >
                          {page.is_published ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(page)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPage ? 'Edit Page' : 'Create Page'}</DialogTitle>
              <DialogDescription>
                {editingPage ? 'Update the page content below' : 'Fill in the details for the new page'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>URL Slug *</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="terms"
                    disabled={!!editingPage}
                  />
                  <p className="text-xs text-gray-500">URL will be: /{formData.slug}</p>
                </div>
                <div className="space-y-2">
                  <Label>Page Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Terms of Service"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Input
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="Brief description for search engines"
                />
              </div>
              <div className="space-y-2">
                <Label>Content * (Plain text with paragraph breaks)</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter the page content here..."
                  rows={15}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  Use double line breaks for paragraphs. Content will be displayed as plain text.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label>Published</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {editingPage ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
