import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';
import { 
  Settings, Plus, Edit, Trash2, Eye, EyeOff, BookOpen, GraduationCap,
  Sparkles, Save, X, AlertCircle, CheckCircle, ShieldCheck, Square, CheckSquare,
  CreditCard, Clock, CheckCircle2, XCircle, Loader2, BarChart3, Tag, ExternalLink,
  LayoutDashboard, FileText, Users, Palette, Menu, ChevronDown, ChevronRight, Star,
  Search, Bell, User as UserIcon, LogOut, Home, Mic, PenTool, Link as LinkIcon, Filter
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
import { CourseManagement } from '@/components/admin/CourseManagement';
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

interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  avgRating: number;
  pendingLiveClasses: number;
  flagshipCourses: {
    title: string;
    students: number;
    income: number;
  }[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  role?: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: 'Instructor Panel',
    items: [
      { id: 'instructor-dashboard', label: 'Overview', icon: <GraduationCap className="h-4 w-4" /> },
      { id: 'course-management', label: 'Manage Courses', icon: <Plus className="h-4 w-4" /> },
      { id: 'lessons', label: 'Course Lessons', icon: <BookOpen className="h-4 w-4" /> },
      { id: 'reading', label: 'Mock Test Content', icon: <FileText className="h-4 w-4" /> },
      { id: 'mock-tests', label: 'Manage Mock Tests', icon: <CheckCircle className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Admin Tools',
    items: [
      { id: 'dashboard', label: 'Admin Overview', icon: <LayoutDashboard className="h-4 w-4" />, role: 'admin' },
      { id: 'payments', label: 'Payments', icon: <CreditCard className="h-4 w-4" />, role: 'admin' },
      { id: 'user-management', label: 'Users', icon: <Users className="h-4 w-4" />, role: 'admin' },
      { id: 'coupons', label: 'Coupons', icon: <Tag className="h-4 w-4" />, role: 'admin' },
    ],
  },
  {
    title: 'Content Engine',
    items: [
      { id: 'vocab-generator', label: 'AI Words Gen', icon: <Plus className="h-4 w-4" />, role: 'admin' },
      { id: 'vocab-enricher', label: 'AI Enricher', icon: <Sparkles className="h-4 w-4" />, role: 'admin' },
      { id: 'vocab-categorizer', label: 'Categorize', icon: <Tag className="h-4 w-4" />, role: 'admin' },
      { id: 'vocab-coverage', label: 'Coverage', icon: <BarChart3 className="h-4 w-4" />, role: 'admin' },
    ],
  },
  {
    title: 'System Settings',
    items: [
      { id: 'site-settings', label: 'Site Settings', icon: <Settings className="h-4 w-4" />, role: 'admin' },
      { id: 'payment-settings', label: 'Payment API', icon: <CreditCard className="h-4 w-4" />, role: 'admin' },
      { id: 'design-audit', label: 'Design Audit', icon: <Palette className="h-4 w-4" />, role: 'admin' },
    ],
  },
];

export function AdminPage() {
  const { user, isAdmin, isInstructor, loading, supabaseUser, signOut } = useAuth();
  const { lessons, createLesson, updateLesson, deleteLesson } = useLessons();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSection = isInstructor ? 'instructor-dashboard' : 'dashboard';
  const sectionFromUrl = searchParams.get('section');
  const [activeSection, setActiveSectionState] = useState(sectionFromUrl || defaultSection);

  const setActiveSection = (id: string) => {
    setActiveSectionState(id);
    setSearchParams({ section: id }, { replace: true });
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    courseId: '',
    moduleName: '',
  });
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [lessonSearch, setLessonSearch] = useState('');

  const [payments, setPayments] = useState<PaymentRequest[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);

  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeCourses: 0,
    avgRating: 4.9,
    pendingLiveClasses: 0,
    flagshipCourses: []
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (supabaseUser && !user) return;
    if (!user || (!isAdmin && !isInstructor)) {
      navigate('/');
    }
  }, [user, isAdmin, isInstructor, loading, supabaseUser, navigate]);

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

  const fetchDashboardStats = async () => {
    if (!isSupabaseConfigured() || !supabase) return;
    setLoadingStats(true);
    try {
      // 1. Total Students
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // 2. Total Courses
      const { data: courses, count: courseCount } = await supabase
        .from('courses')
        .select('id, title', { count: 'exact' });

      // 3. Payments & Revenue
      const { data: allPayments } = await supabase
        .from('payment_requests')
        .select('*');

      const approvedPayments = allPayments?.filter(p => p.status === 'approved') || [];
      
      // Calculate flagship courses stats
      const courseStats = (courses || []).map(course => {
        const coursePayments = approvedPayments.filter(p => p.course_id === course.id || p.package_name === course.title);
        return {
          title: course.title,
          students: coursePayments.length,
          income: coursePayments.reduce((sum, p) => sum + (p.amount || 0), 0)
        };
      }).sort((a, b) => b.income - a.income).slice(0, 5);

      setStats({
        totalStudents: userCount || 0,
        activeCourses: courseCount || 0,
        avgRating: 4.9, // This would normally come from a reviews table
        pendingLiveClasses: (courses || []).filter(c => (c as any).type === 'live').length * 2, // Placeholder logic
        flagshipCourses: courseStats
      });
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (user && (isAdmin || isInstructor)) {
      fetchPayments();
      fetchDashboardStats();
    }
  }, [user, isAdmin, isInstructor]);

  const getAuthToken = async (): Promise<string | null> => {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  };

  const handleApprovePayment = async (payment: PaymentRequest) => {
    setProcessingPayment(payment.id);
    try {
      const token = await getAuthToken();
      if (!token) throw new Error('Not authenticated');

      const res = await fetch('/api/approve-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ paymentId: payment.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Approval failed');

      setSuccess('Payment approved successfully!');
      fetchPayments();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to approve payment';
      console.error('Failed to approve payment:', err);
      setError(msg);
    } finally {
      setProcessingPayment(null);
    }
  };

  const handleRejectPayment = async (payment: PaymentRequest) => {
    if (!confirm('Are you sure you want to reject this payment?')) return;
    setProcessingPayment(payment.id);
    try {
      const token = await getAuthToken();
      if (!token) throw new Error('Not authenticated');

      const res = await fetch('/api/reject-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ paymentId: payment.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Rejection failed');

      setSuccess('Payment rejected.');
      fetchPayments();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to reject payment';
      console.error('Failed to reject payment:', err);
      setError(msg);
    } finally {
      setProcessingPayment(null);
    }
  };

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const processedPayments = payments.filter(p => p.status !== 'pending');

  if (loading || (supabaseUser && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user || (!isAdmin && !isInstructor)) return null;

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
      courseId: '',
      moduleName: '',
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
      courseId: lesson.courseId || '',
      moduleName: lesson.moduleName || '',
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
      const generatedContent = await generateLessonWithAI(formData.type, formData.level, formData.topic);
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
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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
        courseId: formData.courseId || undefined,
        moduleName: formData.moduleName || undefined,
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

  const vocabularyLessons = lessons.filter(l => l.type === 'vocabulary');
  const grammarLessons = lessons.filter(l => l.type === 'grammar');

  // Course slug → display name mapping for filter matching
  const courseSlugMap: Record<string, string> = {
    'ielts-masterclass': 'ielts band 8+ masterclass',
    'writing-intensive': 'writing task 1 & 2 intensive',
    'speaking-club': 'ielts speaking confidence club',
    'reading-listening-suite': 'rapid reading & listening suite',
  };

  const filteredLessons = lessons.filter(lesson => {
    // Search filter
    if (lessonSearch && !lesson.title.toLowerCase().includes(lessonSearch.toLowerCase())) return false;
    // Course filter
    if (filterCourse === 'all') return true;
    if (filterCourse === 'none') return !lesson.courseId;
    // Match by exact courseId OR by slug name match (for UUID-based storage)
    const expectedName = courseSlugMap[filterCourse] || filterCourse;
    return (
      lesson.courseId === filterCourse ||
      (lesson.courseId || '').toLowerCase().includes(filterCourse.replace(/-/g, ' ')) ||
      (lesson.moduleName || '').toLowerCase().includes(expectedName)
    );
  });

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => prev.includes(title) ? prev.filter(g => g !== title) : [...prev, title]);
  };

  const getMenuItemBadge = (id: string): number | undefined => {
    if (id === 'payments' && pendingPayments.length > 0) return pendingPayments.length;
    return undefined;
  };

  const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={cn("space-y-1", isMobile ? "px-2" : "px-3")}>
      {menuGroups.map((group) => {
        const visibleItems = group.items.filter(item => !item.role || (item.role === 'admin' && isAdmin));
        if (visibleItems.length === 0) return null;
        return (
          <div key={group.title} className="mb-4">
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
            >
              {group.title}
              {expandedGroups.includes(group.title) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {expandedGroups.includes(group.title) && (
              <div className="mt-1 space-y-1">
                {visibleItems.map((item) => {
                  const badge = getMenuItemBadge(item.id);
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        if (isMobile) setSidebarOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-xl transition-all duration-200 group",
                        active ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn("transition-colors", active ? "text-white" : "text-slate-400 group-hover:text-indigo-600")}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {badge && (
                        <Badge className={cn("text-[10px] px-1.5 py-0 h-4 min-w-4 flex items-center justify-center rounded-full", active ? "bg-white text-indigo-600" : "bg-red-500 text-white")}>
                          {badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  const getActiveItemLabel = () => {
    for (const group of menuGroups) {
      const item = group.items.find(i => i.id === activeSection);
      if (item) return item.label;
    }
    return 'Dashboard';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'instructor-dashboard':
        return (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Instructor Dashboard</h2>
                <p className="text-slate-500 font-medium">Manage your courses and student progress</p>
              </div>
              <Badge className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg w-fit">
                Instructor Mode
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card className="border-none shadow-sm bg-indigo-50/50 rounded-[2rem]">
                  <CardContent className="pt-6">
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                           <Users className="h-6 w-6" />
                        </div>
                         <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
                            <h3 className="text-2xl font-black text-slate-900">
                              {loadingStats ? '...' : stats.totalStudents.toLocaleString()}
                            </h3>
                         </div>
                     </div>
                  </CardContent>
               </Card>
               <Card className="border-none shadow-sm bg-rose-50/50 rounded-[2rem]">
                  <CardContent className="pt-6">
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-100">
                           <BookOpen className="h-6 w-6" />
                        </div>
                         <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Courses</p>
                            <h3 className="text-2xl font-black text-slate-900">
                              {loadingStats ? '...' : `${stats.activeCourses} Active`}
                            </h3>
                         </div>
                     </div>
                  </CardContent>
               </Card>
               <Card className="border-none shadow-sm bg-emerald-50/50 rounded-[2rem]">
                  <CardContent className="pt-6">
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                           <Star className="h-6 w-6" />
                        </div>
                         <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. Rating</p>
                            <h3 className="text-2xl font-black text-slate-900">{stats.avgRating}/5</h3>
                         </div>
                     </div>
                  </CardContent>
               </Card>
               <Card className="border-none shadow-sm bg-amber-50/50 rounded-[2rem]">
                  <CardContent className="pt-6">
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-100">
                           <Clock className="h-6 w-6" />
                        </div>
                         <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Classes</p>
                            <h3 className="text-2xl font-black text-slate-900">
                              {loadingStats ? '...' : `${stats.pendingLiveClasses} Pending`}
                            </h3>
                         </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
               <Card className="lg:col-span-2 shadow-sm border-slate-100 rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8">
                     <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
                        <Sparkles className="h-5 w-5 text-indigo-500" /> My Flagship Courses
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                      <div className="space-y-4">
                        {loadingStats ? (
                          <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
                          </div>
                        ) : stats.flagshipCourses.length === 0 ? (
                          <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-[1.5rem]">
                            <p className="text-slate-400 font-medium">No course enrollments found yet.</p>
                          </div>
                        ) : (
                          stats.flagshipCourses.map((c, i) => (
                            <div key={i} className="flex items-center justify-between p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                               <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center font-black text-indigo-600 text-lg">
                                     {c.title[0]}
                                  </div>
                                  <div>
                                     <h4 className="font-bold text-slate-800">{c.title}</h4>
                                     <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{c.students} Students Enrolled</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="font-black text-indigo-600">৳{c.income.toLocaleString()}</p>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                    onClick={() => setActiveSection('course-management')}
                                  >
                                    Manage
                                  </Button>
                               </div>
                            </div>
                          ))
                        )}
                      </div>
                  </CardContent>
               </Card>

               <Card className="shadow-sm border-slate-100 rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8">
                     <CardTitle className="text-xl font-bold text-slate-900">Upcoming Live Classes</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                     <div className="space-y-8">
                        {[
                          { time: 'Today, 8 PM', topic: 'Speaking Part 2 Secrets' },
                          { time: 'Tomorrow, 9 PM', topic: 'Task 2 Essay Templates' }
                        ].map((l, i) => (
                           <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-indigo-600 before:rounded-full group">
                              <p className="text-xs font-black text-indigo-600 uppercase mb-1 tracking-widest">{l.time}</p>
                              <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{l.topic}</h4>
                           </div>
                        ))}
                        <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-indigo-600 font-bold text-white shadow-xl shadow-slate-200 transition-all duration-300">
                           Schedule New Session
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Admin Overview</h2>
              <p className="text-slate-500 font-medium">Welcome to the central management hub</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-slate-900">{lessons.length}</p>
                </CardContent>
              </Card>
              <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-indigo-600" /> Vocabulary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-slate-900">{vocabularyLessons.length}</p>
                </CardContent>
              </Card>
              <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-purple-600" /> Grammar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-slate-900">{grammarLessons.length}</p>
                </CardContent>
              </Card>
            </div>
            {pendingPayments.length > 0 && (
              <Alert className="bg-amber-50 border-amber-200 rounded-2xl p-6">
                <Clock className="h-5 w-5 text-amber-600" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                  <AlertDescription className="text-amber-900 font-bold">
                    You have {pendingPayments.length} pending payment(s) that need your attention.
                  </AlertDescription>
                  <Button 
                    variant="outline" 
                    className="bg-white border-amber-200 text-amber-700 hover:bg-amber-100 font-bold rounded-xl"
                    onClick={() => setActiveSection('payments')}
                  >
                    Verify Now
                  </Button>
                </div>
              </Alert>
            )}
          </div>
        );

      case 'vocab-generator': return <VocabularyGenerator />;
      case 'vocab-enricher': return <VocabularyEnricher />;
      case 'vocab-categorizer': return <VocabularyCategorizer />;
      case 'vocab-coverage': return <VocabularyCoverageDashboard />;
      case 'lessons':
        return (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Lessons Library</h2>
                <p className="text-slate-500 font-medium mt-1">Manage and publish learning content</p>
              </div>
              <Button onClick={handleNewLesson} className="gap-2 bg-indigo-600 hover:bg-indigo-700 h-12 px-6 rounded-2xl shadow-lg shadow-indigo-100 font-bold text-white">
                <Plus className="h-5 w-5" /> New Lesson
              </Button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search lessons by title..."
                  className="pl-9 h-10 border-slate-100 rounded-xl"
                  value={lessonSearch}
                  onChange={e => setLessonSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-slate-400" />
                <Select value={filterCourse} onValueChange={setFilterCourse}>
                  <SelectTrigger className="w-full sm:w-[200px] rounded-xl border-slate-100 h-10 font-bold text-slate-600">
                    <SelectValue placeholder="Filter by Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="none">General Library</SelectItem>
                    <SelectItem value="ielts-masterclass">IELTS Band 8+ Masterclass</SelectItem>
                    <SelectItem value="writing-intensive">Writing Task 1 & 2 Intensive</SelectItem>
                    <SelectItem value="speaking-club">IELTS Speaking Confidence Club</SelectItem>
                    <SelectItem value="reading-listening-suite">Rapid Reading & Listening Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredLessons.length === 0 ? (
                <Card className="rounded-[2rem] border-dashed border-2">
                  <CardContent className="py-16 text-center text-slate-400 font-bold uppercase tracking-widest">
                    No lessons found matching your filters.
                  </CardContent>
                </Card>
              ) : (
                filteredLessons.map((lesson) => (
                  <Card key={lesson.id} className="hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 border-slate-100 rounded-2xl overflow-hidden group">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300",
                            lesson.type === 'vocabulary' ? "bg-indigo-50 text-indigo-600" : 
                            lesson.type === 'grammar' ? "bg-purple-50 text-purple-600" :
                            lesson.type === 'speaking' ? "bg-emerald-50 text-emerald-600" :
                            "bg-rose-50 text-rose-600"
                          )}>
                            {lesson.type === 'vocabulary' ? <BookOpen className="h-6 w-6" /> : 
                             lesson.type === 'grammar' ? <GraduationCap className="h-6 w-6" /> :
                             lesson.type === 'speaking' ? <Mic className="h-6 w-6" /> :
                             <PenTool className="h-6 w-6" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{lesson.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 rounded-lg">{lesson.type}</Badge>
                              <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 rounded-lg">{lesson.level}</Badge>
                              {lesson.courseId && (
                                <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 text-[10px] uppercase font-bold flex items-center gap-1 rounded-lg">
                                  <LinkIcon className="h-3 w-3" /> {lesson.courseId.replace(/-/g, ' ')}
                                </Badge>
                              )}
                              {lesson.moduleName && (
                                <Badge variant="secondary" className="text-[10px] font-bold rounded-lg truncate max-w-[200px]">
                                  {lesson.moduleName}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.is_premium && (
                            <Badge className="bg-amber-100 text-amber-800 rounded-lg font-bold">Premium</Badge>
                          )}
                          <Badge className={cn("rounded-lg font-bold", lesson.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800')}>
                            {lesson.is_published ? 'Published' : 'Draft'}
                          </Badge>
                          <div className="flex items-center gap-1 ml-2">
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600" onClick={() => handleTogglePublish(lesson)}>
                              {lesson.is_published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600" onClick={() => handleEditLesson(lesson)}>
                              <Edit className="h-5 w-5" />
                            </Button>
                            <RouterLink to={`/lesson/${lesson.slug}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600">
                                <ExternalLink className="h-5 w-5" />
                              </Button>
                            </RouterLink>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600" onClick={() => handleDeleteLesson(lesson.id)}>
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        );

      case 'reading': return <ReadingPassageManagement />;
      case 'course-management': return <CourseManagement />;
      case 'mock-tests': return <MockTestManagement />;
      case 'page-content': return <PageContentManagement />;
      case 'payments':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Payment Verification</h2>
              <p className="text-slate-500 font-medium">Verify bKash transactions and activate premium access</p>
            </div>
            {loadingPayments ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
              </div>
            ) : payments.length === 0 ? (
              <Card className="rounded-[2rem] border-dashed border-2 p-16 text-center text-slate-400 font-bold uppercase tracking-widest">
                No payment history found
              </Card>
            ) : (
              <div className="space-y-10">
                {pendingPayments.length > 0 && (
                  <div>
                    <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-slate-800">
                      <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse" />
                      Awaiting Action ({pendingPayments.length})
                    </h3>
                    <div className="grid gap-4">
                      {pendingPayments.map((payment) => (
                        <Card key={payment.id} className="border-amber-200 bg-amber-50/50 rounded-2xl overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">User Email</p>
                                  <p className="font-bold text-slate-800">{payment.user_email}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Package & Amount</p>
                                  <p className="font-bold text-slate-800">{payment.package_name} - <span className="text-indigo-600">৳{payment.amount}</span></p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Transaction ID</p>
                                  <code className="bg-white border border-amber-200 px-3 py-1 rounded-lg font-mono text-sm font-bold text-amber-700">{payment.transaction_id}</code>
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sender Number</p>
                                  <p className="font-bold text-slate-800">{payment.sender_number}</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <Button
                                  onClick={() => handleApprovePayment(payment)}
                                  disabled={processingPayment === payment.id}
                                  className="bg-emerald-600 hover:bg-emerald-700 h-12 px-6 rounded-xl font-bold shadow-lg shadow-emerald-100 flex-1 sm:flex-none"
                                >
                                  {processingPayment === payment.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <><CheckCircle2 className="h-5 w-5 mr-2" /> Approve</>}
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleRejectPayment(payment)}
                                  disabled={processingPayment === payment.id}
                                  className="text-rose-600 border-rose-200 hover:bg-rose-50 h-12 px-6 rounded-xl font-bold flex-1 sm:flex-none"
                                >
                                  <XCircle className="h-5 w-5 mr-2" /> Reject
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
                    <h3 className="font-bold text-xl mb-6 text-slate-800">Recent Transactions</h3>
                    <div className="grid gap-3">
                      {processedPayments.slice(0, 10).map((payment) => (
                        <Card key={payment.id} className="border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shadow-sm", payment.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>
                                  {payment.status === 'approved' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800 text-sm">{payment.user_email}</p>
                                  <p className="text-xs text-slate-400 font-medium">{payment.package_name} • ৳{payment.amount} • TrxID: {payment.transaction_id}</p>
                                </div>
                              </div>
                              <Badge className={cn("rounded-lg font-bold px-3 py-1", payment.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800')}>
                                {payment.status.toUpperCase()}
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

      case 'user-management': return <UserManagement />;
      case 'coupons': return <CouponManagement />;
      case 'site-settings': return <SiteSettings />;
      case 'payment-settings': return <PaymentSettings />;
      case 'faq-management': return <FAQManagement />;
      case 'contact-settings': return <ContactSettingsManagement />;
      case 'design-audit': return <DesignAudit />;
      default: return <div className="text-center py-16 text-slate-400 font-bold uppercase tracking-widest">Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <SheetHeader className="p-6 border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
                      <Settings className="h-5 w-5" />
                    </div>
                    <SheetTitle className="text-xl font-black tracking-tight">Admin <span className="text-indigo-600">Panel</span></SheetTitle>
                  </div>
                </SheetHeader>
                <div className="py-6 overflow-y-auto h-[calc(100vh-80px)]">
                  <NavItems isMobile />
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex items-center gap-3">
              <div className="h-9 w-9 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-slate-200 shadow-lg">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">Admin Panel</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">IELTS Band 9 Library</p>
              </div>
            </div>

            <div className="hidden md:block h-8 w-px bg-slate-200 mx-2" />

            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setActiveSection('dashboard'); }} className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" /> Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-indigo-600 uppercase text-[11px] tracking-widest">{getActiveItemLabel()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Quick search..." className="pl-9 h-9 w-64 bg-slate-100 border-none rounded-full text-xs focus-visible:ring-indigo-500 focus-visible:bg-white transition-all" />
            </div>
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-indigo-600">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-white" />
            </Button>
            <div className="h-8 w-px bg-slate-200 mx-1" />
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[120px]">{user?.email?.split('@')[0]}</p>
                <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-tighter">{isAdmin ? 'System Admin' : 'Instructor'}</p>
              </div>
              <div className="h-9 w-9 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center text-indigo-600 font-black shadow-sm overflow-hidden">
                {user?.email?.[0].toUpperCase() || <UserIcon className="h-5 w-5" />}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-72 h-[calc(100vh-64px)] sticky top-16 border-r bg-white/50 overflow-y-auto">
          <div className="py-8">
            <NavItems />
          </div>
          <div className="p-6 mt-auto">
            <Card className="bg-indigo-600 text-white border-none shadow-xl shadow-indigo-200 rounded-[1.5rem] overflow-hidden relative">
              <div className="absolute -right-4 -top-4 h-24 w-24 bg-white/10 rounded-full blur-2xl" />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Quick Action</CardTitle>
                <CardDescription className="text-indigo-100 text-xs font-medium">Create a new lesson with AI in seconds.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleNewLesson} variant="secondary" className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold h-10 rounded-xl">
                  <Plus className="h-4 w-4 mr-2" /> New Lesson
                </Button>
              </CardContent>
            </Card>
            <Button 
              variant="ghost" 
              className="w-full mt-6 justify-start gap-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 h-11 rounded-xl transition-all font-bold"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="p-4 lg:p-10 max-w-[1600px] mx-auto">
            <div className="flex lg:hidden items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{getActiveItemLabel()}</h2>
                <p className="text-slate-500 text-xs font-medium mt-1">Admin Management Dashboard</p>
              </div>
              <Button onClick={handleNewLesson} size="icon" className="h-11 w-11 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
                <Plus className="h-6 w-6" />
              </Button>
            </div>

            {success && (
              <Alert className="mb-8 bg-emerald-50 border-emerald-200 text-emerald-900 rounded-2xl animate-in fade-in slide-in-from-top-4">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="font-medium">{success}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert className="mb-8 bg-rose-50 border-rose-200 text-rose-900 rounded-2xl animate-in fade-in slide-in-from-top-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none rounded-[2rem]">
          <DialogHeader className="p-8 pb-4">
            <DialogTitle className="text-2xl font-black text-slate-900">
              {editingLesson ? 'Edit Lesson' : 'Create New Lesson'}
            </DialogTitle>
            <DialogDescription className="font-medium">
              Use AI to generate lesson content or create manually
            </DialogDescription>
          </DialogHeader>

          <div className="px-8 pb-8 space-y-8">
            <Card className="border-indigo-100 bg-indigo-50/30 rounded-[1.5rem] overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" /> AI Lesson Generator
                </CardTitle>
                <CardDescription className="font-medium">Select type, level, and topic, then click generate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Lesson Type</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData(prev => ({ ...prev, type: v as LessonType, topic: '' }))}>
                      <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vocabulary">Vocabulary</SelectItem>
                        <SelectItem value="grammar">Grammar</SelectItem>
                        <SelectItem value="speaking">Speaking</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="listening">Listening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Course Connection</Label>
                    <Select value={formData.courseId} onValueChange={(v) => setFormData(prev => ({ ...prev, courseId: v }))}>
                      <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                        <SelectValue placeholder="Select Course (Optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">General Library (None)</SelectItem>
                        <SelectItem value="ielts-masterclass">IELTS Band 8+ Masterclass</SelectItem>
                        <SelectItem value="writing-intensive">Writing Task 1 & 2 Intensive</SelectItem>
                        <SelectItem value="speaking-club">IELTS Speaking Confidence Club</SelectItem>
                        <SelectItem value="reading-listening-suite">Rapid Reading & Listening Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Module Name</Label>
                    <Input 
                      value={formData.moduleName} 
                      onChange={(e) => setFormData(prev => ({ ...prev, moduleName: e.target.value }))} 
                      placeholder="e.g. Module 1: Speaking Mastery"
                      className="rounded-xl border-slate-200 bg-white h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Level</Label>
                    <Select value={formData.level} onValueChange={(v) => setFormData(prev => ({ ...prev, level: v as LessonLevel }))}>
                      <SelectTrigger className="rounded-xl border-slate-200 bg-white">
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
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Topic</Label>
                    <Select value={formData.topic} onValueChange={(v) => setFormData(prev => ({ ...prev, topic: v }))}>
                      <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleGenerateWithAI} disabled={isGenerating || !formData.topic} className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-100">
                  {isGenerating ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-5 w-5 mr-2" /> Generate Draft with AI</>}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-slate-400">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} placeholder="Lesson title" className="h-12 rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-slate-400">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Brief description of the lesson" rows={2} className="rounded-xl border-slate-200" />
              </div>

              {formData.content && (
                <Card className="rounded-[1.5rem] border-slate-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Generated Content Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400">Target Level</span>
                      <span className="font-bold text-slate-900">{formData.content.targetLevel}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-2 uppercase text-[10px] font-black tracking-widest">What You Will Learn</span>
                      <ul className="space-y-2">
                        {formData.content.whatYouWillLearn.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {formData.content && (
                <Card className="border-amber-200 bg-amber-50/50 rounded-[1.5rem]">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-amber-800">
                      <ShieldCheck className="h-5 w-5" /> Content Quality Guard
                    </CardTitle>
                    <CardDescription className="text-amber-700 font-medium">Review and confirm before publishing.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { id: 'naturalCollocations', label: 'Collocations are natural and commonly used' },
                      { id: 'ieltsSafeUsage', label: 'Vocabulary is IELTS-safe and appropriate' },
                      { id: 'noRareWords', label: 'No over-advanced or rare words' },
                      { id: 'examplesReviewed', label: 'Example sentences are natural' },
                      { id: 'mistakesAccurate', label: 'Mistakes and corrections are accurate' }
                    ].map((check) => (
                      <div 
                        key={check.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-amber-100/50 p-3 rounded-xl transition-colors"
                        onClick={() => setQualityChecklist(prev => ({ ...prev, [check.id]: !prev[check.id as keyof QualityChecklist] }))}
                      >
                        {qualityChecklist[check.id as keyof QualityChecklist] ? <CheckSquare className="h-5 w-5 text-emerald-600" /> : <Square className="h-5 w-5 text-slate-300" />}
                        <span className="text-sm font-bold text-amber-900">{check.label}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch id="is_premium" checked={formData.is_premium} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_premium: checked }))} />
                    <Label htmlFor="is_premium" className="font-bold text-slate-700">Premium</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="is_published" checked={formData.is_published} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))} />
                    <Label htmlFor="is_published" className="font-bold text-slate-700">Published</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditorOpen(false)} className="h-12 px-6 rounded-xl font-bold">Cancel</Button>
              <Button onClick={handleSaveLesson} disabled={isSaving || !formData.content} className="h-12 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-white shadow-xl shadow-slate-200">
                {isSaving ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Saving...</> : <><Save className="h-5 w-5 mr-2" /> Save Lesson</>}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
