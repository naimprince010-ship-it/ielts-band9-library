import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, HelpCircle, Eye, EyeOff } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const FAQ_CATEGORIES = [
  'Getting Started',
  'Account & Subscription',
  'Payment & Billing',
  'Features & Content',
  'Technical Support',
];

export function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [formData, setFormData] = useState({
    category: 'Getting Started',
    question: '',
    answer: '',
    sort_order: 0,
    is_published: true,
  });

  const fetchFaqs = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .order('category')
        .order('sort_order');

      if (error) throw error;
      setFaqs(data || []);
    } catch (err) {
      console.error('Failed to fetch FAQs:', err);
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenDialog = (faq?: FAQItem) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        category: faq.category,
        question: faq.question,
        answer: faq.answer,
        sort_order: faq.sort_order,
        is_published: faq.is_published,
      });
    } else {
      setEditingFaq(null);
      setFormData({
        category: 'Getting Started',
        question: '',
        answer: '',
        sort_order: faqs.length + 1,
        is_published: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured() || !supabase) return;
    if (!formData.question || !formData.answer) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingFaq) {
        const { error } = await supabase
          .from('faq_items')
          .update({
            category: formData.category,
            question: formData.question,
            answer: formData.answer,
            sort_order: formData.sort_order,
            is_published: formData.is_published,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingFaq.id);

        if (error) throw error;
        setSuccess('FAQ updated successfully!');
      } else {
        const { error } = await supabase
          .from('faq_items')
          .insert({
            category: formData.category,
            question: formData.question,
            answer: formData.answer,
            sort_order: formData.sort_order,
            is_published: formData.is_published,
          });

        if (error) throw error;
        setSuccess('FAQ created successfully!');
      }

      setIsDialogOpen(false);
      fetchFaqs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to save FAQ:', err);
      setError('Failed to save FAQ. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured() || !supabase) return;
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const { error } = await supabase
        .from('faq_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('FAQ deleted successfully!');
      fetchFaqs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to delete FAQ:', err);
      setError('Failed to delete FAQ. Please try again.');
    }
  };

  const handleTogglePublish = async (faq: FAQItem) => {
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      const { error } = await supabase
        .from('faq_items')
        .update({ is_published: !faq.is_published, updated_at: new Date().toISOString() })
        .eq('id', faq.id);

      if (error) throw error;
      fetchFaqs();
    } catch (err) {
      console.error('Failed to toggle FAQ publish status:', err);
    }
  };

  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQItem[]>);

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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              FAQ Management
            </CardTitle>
            <CardDescription>
              Add, edit, and manage frequently asked questions
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="h-4 w-4" />
            Add FAQ
          </Button>
        </div>
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

        {faqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <HelpCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No FAQs yet. Click "Add FAQ" to create your first one.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-3 text-indigo-600">{category}</h3>
                <div className="space-y-2">
                  {categoryFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className={`border rounded-lg p-4 ${faq.is_published ? 'bg-white' : 'bg-gray-50 opacity-60'}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium">{faq.question}</p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublish(faq)}
                            title={faq.is_published ? 'Unpublish' : 'Publish'}
                          >
                            {faq.is_published ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(faq)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(faq.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
              <DialogDescription>
                {editingFaq ? 'Update the FAQ details below' : 'Fill in the details for the new FAQ'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FAQ_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Question *</Label>
                <Input
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter the question"
                />
              </div>
              <div className="space-y-2">
                <Label>Answer *</Label>
                <Textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Enter the answer"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label>Published</Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {editingFaq ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
