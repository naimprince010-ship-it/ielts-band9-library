import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Plus, Edit, Trash2, Eye, EyeOff, BookOpen, GraduationCap,
  Sparkles, Save, X, AlertCircle, CheckCircle, ShieldCheck, Square, CheckSquare,
  CreditCard, Clock, CheckCircle2, XCircle, Loader2, BarChart3, Tag, ExternalLink,
  LayoutDashboard, FileText, Users, MessageSquare, Phone, Palette, Menu, ChevronDown, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useLessons } from '@/contexts/LessonContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { VocabularyCoverageDashboard } from '@/components/admin/VocabularyCoverageDashboard';
import { SiteSettings } from '@/components/admin/SiteSettings';
import { UserManagement } from '@/components/admin/UserManagement';
import { CouponManagement } from '@/components/admin/CouponManagement';
import { ReadingPassageManagement } from '@/components/admin/ReadingPassageManagement';
import { PaymentSettings } from '@/components/admin/PaymentSettings';
import { FAQManagement } from '@/components/admin/FAQManagement';
import { ContactSettingsManagement } from '@/components/admin/ContactSettingsManagement';
import { PageContentManagement } from '@/components/admin/PageContentManagement';
import { MockTestManagement } from '@/components/admin/MockTestManagement';
import { DesignAudit } from '@/components/admin/DesignAudit';
import { VocabularyGenerator } from '@/components/admin/VocabularyGenerator';
import { VocabularyEnricher } from '@/components/admin/VocabularyEnricher';
import { VocabularyCategorizer } from '@/components/admin/VocabularyCategorizer';
import { Lesson, LessonType, LessonLevel, LessonContent } from '@/types';
import { GRAMMAR_TOPICS, VOCABULARY_TOPICS } from '@/data/sampleLessons';
import { generateLessonWithAI } from '@/services/aiLessonGenerator';
import { cn } from '@/lib/utils';

interface QualityChecklist {
  naturalCollocations: boolean;
  ieltsSafeUsage: boolean;
  noRareWords: boolean;
  examplesReviewed: boolean;
  mistakesAccurate: boolean;
}

interface PaymentRequest {
  id: string;
  user_id: string;
  user_email: string;
  package_type: string;
  package_name: string;
  amount: number;
  transaction_id: string;
  sender_number: string;
  status: string;
  created_at: string;
  verified_at: string | null;
  verified_by: string | null;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: 'Dashboard',
    items: [
      { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Vocabulary',
    items: [
      { id: 'vocab-generator', label: 'Add Words', icon: <Plus className="h-4 w-4" /> },
      { id: 'vocab-enricher', label: 'Enrich Words', icon: <Sparkles className="h-4 w-4" /> },
      { id: 'vocab-categorizer', label: 'Categorize', icon: <Tag className="h-4 w-4" /> },
      { id: 'vocab-coverage', label: 'Coverage', icon: <BarChart3 className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Content',
    items: [
      { id: 'lessons', label: 'Lessons', icon: <BookOpen className="h-4 w-4" /> },
      { id: 'reading', label: 'Reading', icon: <FileText className="h-4 w-4" /> },
      { id: 'mock-tests', label: 'Mock Tests', icon: <GraduationCap className="h-4 w-4" /> },
      { id: 'page-content', label: 'Pages', icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Users & Payments',
    items: [
      { id: 'payments', label: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
      { id: 'user-management', label: 'Users', icon: <Users className="h-4 w-4" /> },
      { id: 'coupons', label: 'Coupons', icon: <Tag className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Settings',
    items: [
      { id: 'site-settings', label: 'Site Settings', icon: <Settings className="h-4 w-4" /> },
      { id: 'payment-settings', label: 'Payment', icon: <CreditCard className="h-4 w-4" /> },
      { id: 'faq-management', label: 'FAQ', icon: <MessageSquare className="h-4 w-4" /> },
      { id: 'contact-settings', label: 'Contact', icon: <Phone className="h-4 w-4" /> },
      { id: 'design-audit', label: 'Design Audit', icon: <Palette className="h-4 w-4" /> },
    ],
  },
];

export function AdminPage() {
  const { user, isAdmin, loading, supabaseUser } = useAuth();
  const { lessons, createLesson, updateLesson, deleteLesson } = useLessons();
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(menuGroups.map(g => g.title));
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [qualityChecklist, setQualityChecklist] = useState<QualityChecklist>({
    naturalCollocations: false,
    ieltsSafeUsage: false,
    noRareWords: false,
    examplesReviewed: false,
    mistakesAccurate: false,
  });

    const [formData, setFormData] = useState({
      title: '',
      type: 'vocabulary' as LessonType,
      level: 'intermediate' as LessonLevel,
      topic: '',
      description: '',
      is_premium: false,
      is_published: false,
      content: null as LessonContent | null,
    });

    const [payments, setPayments] = useState<PaymentRequest[]>([]);
    const [loadingPayments, setLoadingPayments] = useState(false);
    const [processingPayment, setProcessingPayment] = useState<string | null>(null);

    useEffect(() => {
      // Don't redirect while loading
      if (loading) return;
      
      // If there's a Supabase session but user profile hasn't loaded yet, wait
      // This prevents redirect during the brief moment between session load and profile fetch
      if (supabaseUser && !user) return;
      
      // Only redirect if we're sure there's no valid admin user
      if (!user || !isAdmin) {
        navigate('/');
      }
    }, [user, isAdmin, loading, supabaseUser, navigate]);

    const fetchPayments = async () => {
      if (!isSupabaseConfigured() || !supabase) return;
    
      setLoadingPayments(true);
      try {
        const { data, error } = await supabase
          .from('payment_requests')
          .select('*')
          .order('created_at', { ascending: false });
      
        if (error) throw error;
        setPayments(data || []);
      } catch (err) {
        console.error('Failed to fetch payments:', err);
      } finally {
        setLoadingPayments(false);
      }
    };

    useEffect(() => {
      if (user && isAdmin) {
        fetchPayments();
      }
    }, [user, isAdmin]);

    const handleApprovePayment = async (payment: PaymentRequest) => {
      if (!isSupabaseConfigured() || !supabase) return;
    
      setProcessingPayment(payment.id);
      try {
        const { error: updateError } = await supabase
          .from('payment_requests')
          .update({
            status: 'approved',
            verified_at: new Date().toISOString(),
            verified_by: user?.email || 'admin',
          })
          .eq('id', payment.id);

        if (updateError) throw updateError;

                const { error: userError } = await supabase
                  .from('users')
                  .update({
                    subscription_status: 'premium',
                    premium_until: payment.package_type === 'yearly' 
                      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                  })
                  .eq('id', payment.user_id);

        if (userError) {
          console.error('Failed to update user premium status:', userError);
        }

        setSuccess('Payment approved successfully!');
        fetchPayments();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Failed to approve payment:', err);
        setError('Failed to approve payment. Please try again.');
      } finally {
        setProcessingPayment(null);
      }
    };

    const handleRejectPayment = async (payment: PaymentRequest) => {
      if (!isSupabaseConfigured() || !supabase) return;
    
      if (!confirm('Are you sure you want to reject this payment?')) return;
    
      setProcessingPayment(payment.id);
      try {
        const { error } = await supabase
          .from('payment_requests')
          .update({
            status: 'rejected',
            verified_at: new Date().toISOString(),
            verified_by: user?.email || 'admin',
          })
          .eq('id', payment.id);

        if (error) throw error;

        setSuccess('Payment rejected.');
        fetchPayments();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Failed to reject payment:', err);
        setError('Failed to reject payment. Please try again.');
      } finally {
        setProcessingPayment(null);
      }
    };

    const pendingPayments = payments.filter(p => p.status === 'pending');
    const processedPayments = payments.filter(p => p.status !== 'pending');

  // Show loading spinner while:
  // 1. Auth is still loading
  // 2. There's a Supabase session but user profile hasn't loaded yet
  if (loading || (supabaseUser && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const topics = formData.type === 'vocabulary' ? VOCABULARY_TOPICS : GRAMMAR_TOPICS;

  const handleNewLesson = () => {
    setEditingLesson(null);
    setFormData({
      title: '',
      type: 'vocabulary',
      level: 'intermediate',
      topic: '',
      description: '',
      is_premium: false,
      is_published: false,
      content: null,
    });
    setQualityChecklist({
      naturalCollocations: false,
      ieltsSafeUsage: false,
      noRareWords: false,
      examplesReviewed: false,
      mistakesAccurate: false,
    });
    setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormData({
      title: lesson.title,
      type: lesson.type,
      level: lesson.level,
      topic: lesson.topic,
      description: lesson.description,
      is_premium: lesson.is_premium,
      is_published: lesson.is_published,
      content: lesson.content,
    });
    setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

  const handleDeleteLesson = async (id: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      await deleteLesson(id);
      setSuccess('Lesson deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleTogglePublish = async (lesson: Lesson) => {
    await updateLesson(lesson.id, { is_published: !lesson.is_published });
  };

  const handleGenerateWithAI = async () => {
    if (!formData.topic) {
      setError('Please select a topic first');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const generatedContent = await generateLessonWithAI(
        formData.type,
        formData.level,
        formData.topic
      );

      setFormData(prev => ({
        ...prev,
        title: generatedContent.title,
        description: `Master ${formData.topic.toLowerCase()} ${formData.type} for IELTS Band ${formData.level === 'beginner' ? '5-6' : formData.level === 'intermediate' ? '6.5-7.5' : '7.5-9'}.`,
        content: generatedContent,
      }));

      setSuccess('Lesson generated successfully! Review and edit before publishing.');
    } catch (err) {
      setError('Failed to generate lesson. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveLesson = async () => {
    if (!formData.title || !formData.topic || !formData.content) {
      setError('Please fill in all required fields and generate content');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const lessonData = {
        title: formData.title,
        slug: editingLesson ? editingLesson.slug : `${slug}-${Date.now()}`,
        type: formData.type,
        level: formData.level,
        topic: formData.topic,
        description: formData.description,
        content: formData.content,
        is_premium: formData.is_premium,
        is_published: formData.is_published,
      };

      if (editingLesson) {
        await updateLesson(editingLesson.id, lessonData);
        setSuccess('Lesson updated successfully!');
      } else {
        await createLesson(lessonData);
        setSuccess('Lesson created successfully!');
      }

      setTimeout(() => {
        setIsEditorOpen(false);
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError('Failed to save lesson. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const allLessons = lessons;
  const vocabularyLessons = lessons.filter(l => l.type === 'vocabulary');
  const grammarLessons = lessons.filter(l => l.type === 'grammar');

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  const getMenuItemBadge = (id: string): number | undefined => {
    if (id === 'payments' && pendingPayments.length > 0) {
      return pendingPayments.length;
    }
    return undefined;
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-500 mt-1">Welcome to the admin panel</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{allLessons.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    Vocabulary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{vocabularyLessons.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    Grammar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{grammarLessons.length}</p>
                </CardContent>
              </Card>
            </div>
            {pendingPayments.length > 0 && (
              <Alert className="bg-amber-50 border-amber-200">
                <Clock className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  You have {pendingPayments.length} pending payment(s) to review.
                  <Button 
                    variant="link" 
                    className="text-amber-700 p-0 h-auto ml-2"
                    onClick={() => setActiveSection('payments')}
                  >
                    View Payments
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 'vocab-generator':
        return <VocabularyGenerator />;

      case 'vocab-enricher':
        return <VocabularyEnricher />;

      case 'vocab-categorizer':
        return <VocabularyCategorizer />;

      case 'vocab-coverage':
        return <VocabularyCoverageDashboard />;

      case 'lessons':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Lessons</h2>
                <p className="text-gray-500 mt-1">Manage vocabulary and grammar lessons</p>
              </div>
              <Button onClick={handleNewLesson} className="gap-2">
                <Plus className="h-4 w-4" />
                New Lesson
              </Button>
            </div>
            <div className="grid gap-4">
              {allLessons.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    No lessons yet. Create your first lesson!
                  </CardContent>
                </Card>
              ) : (
                allLessons.map((lesson) => (
                  <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {lesson.type === 'vocabulary' ? (
                            <BookOpen className="h-5 w-5 text-indigo-600" />
                          ) : (
                            <GraduationCap className="h-5 w-5 text-purple-600" />
                          )}
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-gray-500">
                              {lesson.type} - {lesson.level} - {lesson.topic}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.is_premium && (
                            <Badge className="bg-amber-100 text-amber-800">Premium</Badge>
                          )}
                          <Badge className={lesson.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {lesson.is_published ? 'Published' : 'Draft'}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublish(lesson)}
                          >
                            {lesson.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditLesson(lesson)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        );

      case 'reading':
        return <ReadingPassageManagement />;

      case 'mock-tests':
        return <MockTestManagement />;

      case 'page-content':
        return <PageContentManagement />;

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Payment Verification</h2>
              <p className="text-gray-500 mt-1">Review and approve bKash payment submissions</p>
            </div>
            {loadingPayments ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : payments.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  No payment requests yet
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {pendingPayments.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-500" />
                      Pending Payments ({pendingPayments.length})
                    </h3>
                    <div className="space-y-4">
                      {pendingPayments.map((payment) => (
                        <Card key={payment.id} className="border-amber-200 bg-amber-50">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <p className="font-medium">{payment.user_email}</p>
                                <p className="text-sm text-gray-600">
                                  <strong>Package:</strong> {payment.package_name} - ৳{payment.amount}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>TrxID:</strong> <code className="bg-white px-2 py-0.5 rounded">{payment.transaction_id}</code>
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>bKash:</strong> {payment.sender_number}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Submitted: {new Date(payment.created_at).toLocaleString()}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleApprovePayment(payment)}
                                  disabled={processingPayment === payment.id}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  {processingPayment === payment.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <>
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Approve
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleRejectPayment(payment)}
                                  disabled={processingPayment === payment.id}
                                  className="text-red-600 border-red-300 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {processedPayments.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                      Processed Payments ({processedPayments.length})
                    </h3>
                    <div className="space-y-2">
                      {processedPayments.slice(0, 10).map((payment) => (
                        <Card key={payment.id} className={payment.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{payment.user_email}</p>
                                <p className="text-xs text-gray-600">
                                  {payment.package_name} - ৳{payment.amount} | TrxID: {payment.transaction_id}
                                </p>
                              </div>
                              <Badge className={payment.status === 'approved' ? 'bg-green-600' : 'bg-red-600'}>
                                {payment.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'user-management':
        return <UserManagement />;

      case 'coupons':
        return <CouponManagement />;

      case 'site-settings':
        return <SiteSettings />;

      case 'payment-settings':
        return <PaymentSettings />;

      case 'faq-management':
        return <FAQManagement />;

      case 'contact-settings':
        return <ContactSettingsManagement />;

      case 'design-audit':
        return <DesignAudit />;

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Select a section from the sidebar
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <div className="bg-gray-900 text-white py-4 px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Settings className="h-6 w-6" />
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-gray-400 text-sm hidden sm:block">IELTS Band 9 Library</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('/', '_blank')}
              className="gap-2 bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Visit Site</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "top-[65px] lg:top-0 h-[calc(100vh-65px)] lg:h-[calc(100vh-65px)]"
        )}>
          <div className="h-full overflow-y-auto py-4">
            <nav className="px-3 space-y-1">
              {menuGroups.map((group) => (
                <div key={group.title} className="mb-4">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    {group.title}
                    {expandedGroups.includes(group.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedGroups.includes(group.title) && (
                    <div className="mt-1 space-y-1">
                      {group.items.map((item) => {
                        const badge = getMenuItemBadge(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveSection(item.id);
                              if (window.innerWidth < 1024) {
                                setSidebarOpen(false);
                              }
                            }}
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors",
                              activeSection === item.id
                                ? "bg-indigo-50 text-indigo-700 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {item.icon}
                              {item.label}
                            </div>
                            {badge && (
                              <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                                {badge}
                              </Badge>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden top-[65px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-65px)] overflow-auto">
          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {renderContent()}
        </main>
      </div>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? 'Edit Lesson' : 'Create New Lesson'}
            </DialogTitle>
            <DialogDescription>
              Use AI to generate lesson content or create manually
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  AI Lesson Generator
                </CardTitle>
                <CardDescription>
                  Select type, level, and topic, then click generate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Lesson Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, type: v as LessonType, topic: '' }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vocabulary">Vocabulary</SelectItem>
                        <SelectItem value="grammar">Grammar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, level: v as LessonLevel }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (Band 5-6)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Band 6.5-7.5)</SelectItem>
                        <SelectItem value="advanced">Advanced (Band 7.5-9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Topic</Label>
                    <Select
                      value={formData.topic}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, topic: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleGenerateWithAI}
                  disabled={isGenerating || !formData.topic}
                  className="w-full gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Generate Draft with AI'}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Lesson title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the lesson"
                  rows={2}
                />
              </div>

              {formData.content && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Generated Content Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <strong>Target Level:</strong> {formData.content.targetLevel}
                    </div>
                    <div>
                      <strong>What You Will Learn:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {formData.content.whatYouWillLearn.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>Examples:</strong> {formData.content.examples.length} examples
                    </div>
                    <div>
                      <strong>Common Mistakes:</strong> {formData.content.commonMistakes.length} mistakes
                    </div>
                    <div>
                      <strong>Practice Questions:</strong> {formData.content.miniPractice.length} questions
                    </div>
                  </CardContent>
                </Card>
              )}

              {formData.content && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
                      <ShieldCheck className="h-5 w-5" />
                      Content Quality Guard
                    </CardTitle>
                    <CardDescription className="text-amber-700">
                      Review and confirm before publishing. This prevents AI over-generation issues.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:bg-amber-100 p-2 rounded"
                      onClick={() => setQualityChecklist(prev => ({ ...prev, naturalCollocations: !prev.naturalCollocations }))}
                    >
                      {qualityChecklist.naturalCollocations ? (
                        <CheckSquare className="h-5 w-5 text-green-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">Collocations are natural and commonly used</span>
                    </div>
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:bg-amber-100 p-2 rounded"
                      onClick={() => setQualityChecklist(prev => ({ ...prev, ieltsSafeUsage: !prev.ieltsSafeUsage }))}
                    >
                      {qualityChecklist.ieltsSafeUsage ? (
                        <CheckSquare className="h-5 w-5 text-green-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">Vocabulary is IELTS-safe and appropriate for the target band</span>
                    </div>
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:bg-amber-100 p-2 rounded"
                      onClick={() => setQualityChecklist(prev => ({ ...prev, noRareWords: !prev.noRareWords }))}
                    >
                      {qualityChecklist.noRareWords ? (
                        <CheckSquare className="h-5 w-5 text-green-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">No over-advanced or rare words that sound unnatural</span>
                    </div>
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:bg-amber-100 p-2 rounded"
                      onClick={() => setQualityChecklist(prev => ({ ...prev, examplesReviewed: !prev.examplesReviewed }))}
                    >
                      {qualityChecklist.examplesReviewed ? (
                        <CheckSquare className="h-5 w-5 text-green-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">Example sentences are natural and IELTS-style</span>
                    </div>
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:bg-amber-100 p-2 rounded"
                      onClick={() => setQualityChecklist(prev => ({ ...prev, mistakesAccurate: !prev.mistakesAccurate }))}
                    >
                      {qualityChecklist.mistakesAccurate ? (
                        <CheckSquare className="h-5 w-5 text-green-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">Common mistakes and corrections are accurate</span>
                    </div>
                    
                    {Object.values(qualityChecklist).every(v => v) ? (
                      <div className="mt-4 p-3 bg-green-100 rounded-lg flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">All quality checks passed - ready to publish!</span>
                      </div>
                    ) : (
                      <div className="mt-4 p-3 bg-amber-100 rounded-lg flex items-center gap-2 text-amber-800">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm">Complete all checks before publishing</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_premium"
                      checked={formData.is_premium}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_premium: checked }))}
                    />
                    <Label htmlFor="is_premium">Premium Content</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                    />
                    <Label htmlFor="is_published">Published</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveLesson} disabled={isSaving || !formData.content}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Lesson'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
