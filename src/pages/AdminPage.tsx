import { useEffect, useRef, useState } from 'react';
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
import { authenticatedJsonHeaders } from '@/lib/authenticatedApi';
import { validateStudyLessonBlueprint } from '@/lib/lessonBlueprint';
import { listeningLessonDataSchema, type ListeningLessonData } from '@/modules/listening/listeningLesson';
import { readingLessonDataSchema, type ReadingLessonData } from '@/modules/reading/readingLesson';
import { StudyMaterialRenderer } from '@/components/lesson/StudyMaterialRenderer';

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
      { id: 'reading', label: 'Reading Practice (Legacy)', icon: <FileText className="h-4 w-4" /> },
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
  const { lessons, fetchLessons, createLesson, updateLesson, deleteLesson } = useLessons();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const loadedAdminLessonsFor = useRef<string | null>(null);

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
  const [isDraftPreviewOpen, setIsDraftPreviewOpen] = useState(false);
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
    videoUrl: '',
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

  useEffect(() => {
    if (user && (isAdmin || isInstructor) && loadedAdminLessonsFor.current !== user.id) {
      loadedAdminLessonsFor.current = user.id;
      void fetchLessons(undefined, undefined, undefined, true);
    }
  }, [user, isAdmin, isInstructor, fetchLessons]);

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
  const listeningData = formData.content?.listeningData;
  const listeningPublishReady = Boolean(
    listeningData
    && listeningData.audio.status !== 'pending'
    && listeningData.transcript.status === 'reviewed'
    && listeningData.quality.contentReviewed
    && listeningData.quality.transcriptChecked
    && listeningData.quality.answersChecked,
  );
  const readingData = formData.content?.readingData;
  const readingPublishReady = Boolean(
    readingData
    && readingData.quality.passageReviewed
    && readingData.quality.questionsReviewed
    && readingData.quality.answersChecked
    && readingData.quality.copyrightConfirmed,
  );

  const updateListeningData = (update: (current: ListeningLessonData) => ListeningLessonData) => {
    setFormData((previous) => {
      if (!previous.content?.listeningData) return previous;
      return {
        ...previous,
        content: {
          ...previous.content,
          listeningData: update(previous.content.listeningData),
        },
      };
    });
  };

  const updateReadingData = (update: (current: ReadingLessonData) => ReadingLessonData) => {
    setFormData((previous) => {
      if (!previous.content?.readingData) return previous;
      return {
        ...previous,
        content: {
          ...previous.content,
          readingData: update(previous.content.readingData),
        },
      };
    });
  };

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
      videoUrl: '',
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
    const savedChecklist = lesson.quality_report?.humanChecklist as Partial<QualityChecklist> | undefined;
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
      videoUrl: lesson.videoUrl || '',
    });
    setQualityChecklist({
      naturalCollocations: Boolean(savedChecklist?.naturalCollocations),
      ieltsSafeUsage: Boolean(savedChecklist?.ieltsSafeUsage),
      noRareWords: Boolean(savedChecklist?.noRareWords),
      examplesReviewed: Boolean(savedChecklist?.examplesReviewed),
      mistakesAccurate: Boolean(savedChecklist?.mistakesAccurate),
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
    const willPublish = !lesson.is_published;
    if (willPublish && lesson.content.studyBlueprint) {
      const savedChecklist = lesson.quality_report?.humanChecklist as Partial<QualityChecklist> | undefined;
      const reviewComplete = savedChecklist && Object.values({
        naturalCollocations: Boolean(savedChecklist.naturalCollocations),
        ieltsSafeUsage: Boolean(savedChecklist.ieltsSafeUsage),
        noRareWords: Boolean(savedChecklist.noRareWords),
        examplesReviewed: Boolean(savedChecklist.examplesReviewed),
        mistakesAccurate: Boolean(savedChecklist.mistakesAccurate),
      }).every(Boolean);

      if (!reviewComplete) {
        setError('Open this lesson in the editor and complete every Content Quality Guard check before publishing.');
        return;
      }
    }

    const updated = await updateLesson(lesson.id, {
      is_published: willPublish,
      content_status: lesson.content.studyBlueprint ? (willPublish ? 'published' : 'draft') : 'legacy',
    });
    if (!updated) {
      setError('Publishing status could not be updated. Please try again.');
    }
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

  const handleGenerateStudyLesson = async () => {
    if (!formData.topic) {
      setError('Please select a topic first');
      return;
    }
    setIsGenerating(true);
    setError('');
    setSuccess('');
    try {
      const generatorPath = formData.type === 'listening'
        ? '/api/generate-listening-lesson'
        : formData.type === 'reading'
          ? '/api/generate-reading-lesson'
          : '/api/generate-study-lesson';
      const response = await fetch(generatorPath, {
        method: 'POST',
        headers: await authenticatedJsonHeaders(),
        body: JSON.stringify({ type: formData.type, topic: formData.topic, level: formData.level }),
      });
      const responseText = await response.text();
      if (!responseText.trim()) {
        throw new Error('The AI generator did not return a response. Please try again in a moment.');
      }
      let generated: Record<string, unknown>;
      try {
        generated = JSON.parse(responseText) as Record<string, unknown>;
      } catch {
        throw new Error('The AI generator returned an invalid response. Please try again.');
      }
      if (!response.ok) {
        const message = typeof generated.error === 'string' ? generated.error : 'Failed to generate study lesson';
        const localDetail = import.meta.env.DEV && typeof generated.detail === 'string' ? ` (${generated.detail})` : '';
        throw new Error(`${message}${localDetail}`);
      }
      const validation = validateStudyLessonBlueprint(generated.studyBlueprint);
      if (!validation.success) throw new Error('Generated blueprint did not pass the lesson schema');
      const listeningData = formData.type === 'listening'
        ? listeningLessonDataSchema.safeParse(generated.listeningData)
        : null;
      if (listeningData && !listeningData.success) throw new Error('Generated Listening data did not pass the studio schema');
      const readingData = formData.type === 'reading'
        ? readingLessonDataSchema.safeParse(generated.readingData)
        : null;
      if (readingData && !readingData.success) throw new Error('Generated Reading data did not pass the studio schema');
      const content: LessonContent = {
        title: generated.title,
        targetLevel: generated.targetLevel,
        whatYouWillLearn: [validation.data.objective, validation.data.outcome],
        coreExplanation: validation.data.objective,
        examples: [],
        commonMistakes: [],
        miniPractice: [],
        answerKey: [],
        quickRecap: validation.data.outcome,
        studyBlueprint: validation.data,
        ...(listeningData?.success ? { listeningData: listeningData.data } : {}),
        ...(readingData?.success ? { readingData: readingData.data } : {}),
      };
      setFormData(prev => ({ ...prev, title: generated.title, description: generated.description, content, is_published: false }));
      setQualityChecklist({ naturalCollocations: false, ieltsSafeUsage: false, noRareWords: false, examplesReviewed: false, mistakesAccurate: false });
      setSuccess(formData.type === 'listening'
        ? 'Listening Studio draft generated. Choose Browser voice or recorded audio, then complete the transcript and answer review before publishing.'
        : formData.type === 'reading'
          ? 'Reading Studio draft generated. Review the passage, question groups, answers, and copyright confirmation before publishing.'
          : 'Validated study-material draft generated. Preview and complete the review guard before publishing.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate study lesson');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateDeepVocabulary = async () => {
    if (!formData.topic) {
      setError('Please select a topic first');
      return;
    }
    setIsGenerating(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/generate-deep-vocabulary-lesson', {
        method: 'POST',
        headers: await authenticatedJsonHeaders(),
        body: JSON.stringify({ topic: formData.topic, level: formData.level }),
      });
      const generated = await response.json();
      if (!response.ok) throw new Error(generated.error || 'Failed to generate deep vocabulary lesson');

      const content: LessonContent = {
        title: generated.title,
        targetLevel: generated.targetLevel,
        whatYouWillLearn: generated.whatYouWillLearn,
        coreExplanation: generated.description,
        examples: [],
        commonMistakes: [],
        miniPractice: [],
        answerKey: [],
        quickRecap: generated.deepVocabulary.memoryTip?.text || '',
        deepVocabulary: generated.deepVocabulary,
      };
      setFormData(prev => ({
        ...prev,
        title: generated.title,
        description: generated.description,
        content,
        is_published: false,
      }));
      setQualityChecklist({
        naturalCollocations: false,
        ieltsSafeUsage: false,
        noRareWords: false,
        examplesReviewed: false,
        mistakesAccurate: false,
      });
      setSuccess('Deep vocabulary draft generated. Review every section before publishing.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate deep vocabulary lesson');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateDeepGrammar = async () => {
    if (!formData.topic) {
      setError('Please select a topic first');
      return;
    }
    setIsGenerating(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/generate-deep-grammar-lesson', {
        method: 'POST',
        headers: await authenticatedJsonHeaders(),
        body: JSON.stringify({ topic: formData.topic, level: formData.level }),
      });
      const generated = await response.json();
      if (!response.ok) throw new Error(generated.error || 'Failed to generate deep grammar lesson');

      const content: LessonContent = { ...generated.content, deepGrammar: true };
      setFormData(prev => ({
        ...prev,
        title: generated.title,
        description: generated.description,
        content,
        is_published: false,
      }));
      setQualityChecklist({
        naturalCollocations: false,
        ieltsSafeUsage: false,
        noRareWords: false,
        examplesReviewed: false,
        mistakesAccurate: false,
      });
      setSuccess('Deep grammar draft generated. Review every rule, example and answer before publishing.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate deep grammar lesson');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveLesson = async () => {
    if (!formData.title || !formData.topic || !formData.content) {
      setError('Please fill in all required fields and generate content');
      return;
    }
    if (formData.videoUrl.trim() && !/^https:\/\/\S+$/i.test(formData.videoUrl.trim())) {
      setError('Video URL must be a valid HTTPS link.');
      return;
    }
    if (formData.content.studyBlueprint) {
      const blueprintValidation = validateStudyLessonBlueprint(formData.content.studyBlueprint);
      if (!blueprintValidation.success) {
        setError(`Lesson blueprint is incomplete: ${blueprintValidation.error.issues[0]?.message || 'schema validation failed'}`);
        return;
      }
    }
    if (formData.type === 'listening') {
      const listeningValidation = listeningLessonDataSchema.safeParse(formData.content.listeningData);
      if (!listeningValidation.success) {
        setError(`Listening Studio data is incomplete: ${listeningValidation.error.issues[0]?.message || 'schema validation failed'}`);
        return;
      }
      if (formData.is_published && !listeningPublishReady) {
        setError('Listening lessons need Browser voice or approved recorded audio, a reviewed transcript, checked answers, and content review before publishing.');
        return;
      }
    }
    if (formData.type === 'reading') {
      const readingValidation = readingLessonDataSchema.safeParse(formData.content.readingData);
      if (!readingValidation.success) {
        setError(`Reading Studio data is incomplete: ${readingValidation.error.issues[0]?.message || 'schema validation failed'}`);
        return;
      }
      const quality = readingValidation.data.quality;
      const readyForPublication = quality.passageReviewed
        && quality.questionsReviewed
        && quality.answersChecked
        && quality.copyrightConfirmed;
      if (formData.is_published && !readyForPublication) {
        setError('Reading lessons need a reviewed passage, checked questions and answers, and copyright confirmation before publishing.');
        return;
      }
    }
    const deepLessonIsApproved = Object.values(qualityChecklist).every(Boolean);
    if ((formData.content.deepVocabulary || formData.content.deepGrammar || formData.content.studyBlueprint) && formData.is_published && !deepLessonIsApproved) {
      setError('Complete every Content Quality Guard check before publishing this deep lesson.');
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
        videoUrl: formData.videoUrl.trim() || undefined,
        blueprint_version: formData.content.studyBlueprint?.schemaVersion,
        content_status: formData.content.studyBlueprint
          ? (formData.is_published ? 'published' : 'draft')
          : 'legacy',
        quality_report: formData.content.studyBlueprint ? {
          schemaValid: true,
          humanChecklist: qualityChecklist,
          reviewedForPublication: formData.is_published,
        } : undefined,
      };
      if (editingLesson) {
        const updated = await updateLesson(editingLesson.id, lessonData);
        if (!updated) throw new Error('Database update returned false');
        setSuccess('Lesson updated successfully!');
      } else {
        const created = await createLesson(lessonData);
        if (!created) throw new Error('Database insert returned no lesson');
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

      case 'reading': return (
        <div>
          <div className="mb-6 flex items-start gap-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-4 text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <p className="font-black text-sm">এই সেকশনটি শুধু Reading Practice পেজের জন্য (Legacy)</p>
              <p className="text-xs mt-1 text-amber-700">Full Mock Test তৈরি/এডিট করতে পাশের মেনু থেকে <strong>"Manage Mock Tests"</strong> ট্যাব ব্যবহার করুন। সেখানে Listening, Reading, Writing, Speaking — সব মডিউল একসাথে ম্যানেজ করা যায়।</p>
            </div>
          </div>
          <ReadingPassageManagement />
        </div>
      );
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
                    {formData.type === 'vocabulary' || formData.type === 'grammar' ? (
                      <Select value={formData.topic} onValueChange={(v) => setFormData(prev => ({ ...prev, topic: v }))}>
                        <SelectTrigger className="rounded-xl border-slate-200 bg-white"><SelectValue placeholder="Select topic" /></SelectTrigger>
                        <SelectContent>{topics.map((topic) => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}</SelectContent>
                      </Select>
                    ) : (
                      <Input value={formData.topic} onChange={(event) => setFormData(prev => ({ ...prev, topic: event.target.value }))} placeholder="e.g. Speaking Part 1 fluency" className="rounded-xl border-slate-200 bg-white" />
                    )}
                  </div>
                </div>
                <Button onClick={handleGenerateStudyLesson} disabled={isGenerating || !formData.topic} className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-100">
                  {isGenerating ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating & validating...</> : <><Sparkles className="h-5 w-5 mr-2" /> Generate Complete Study Lesson</>}
                </Button>
                <Button type="button" variant="ghost" onClick={handleGenerateWithAI} disabled={isGenerating || !formData.topic} className="mt-2 w-full text-xs text-slate-500">
                  Generate legacy basic draft
                </Button>
                {formData.type === 'vocabulary' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateDeepVocabulary}
                    disabled={isGenerating || !formData.topic}
                    className="mt-3 w-full h-12 rounded-xl border-violet-300 bg-white font-bold text-violet-700 hover:bg-violet-50"
                  >
                    {isGenerating ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-5 w-5 mr-2" /> Generate Deep Vocabulary Lesson</>}
                  </Button>
                )}
                {formData.type === 'grammar' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateDeepGrammar}
                    disabled={isGenerating || !formData.topic}
                    className="mt-3 w-full h-12 rounded-xl border-violet-300 bg-white font-bold text-violet-700 hover:bg-violet-50"
                  >
                    {isGenerating ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-5 w-5 mr-2" /> Generate Deep Grammar Lesson</>}
                  </Button>
                )}
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
              <div className="space-y-2">
                <Label htmlFor="videoUrl" className="text-xs font-black uppercase tracking-widest text-slate-400">Video URL (Optional)</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                  className="h-12 rounded-xl border-slate-200"
                />
                <p className="text-xs leading-5 text-slate-500">Supports YouTube, Vimeo, and direct HTTPS video links. Premium access rules also protect the player.</p>
              </div>

              {formData.type === 'listening' && listeningData && (
                <Card className="overflow-hidden rounded-[1.5rem] border-sky-200 bg-sky-50/40 shadow-sm">
                  <CardHeader className="border-b border-sky-100 bg-white/70">
                    <CardTitle className="flex items-center gap-2 text-lg font-black text-sky-950">
                      <Mic className="h-5 w-5 text-sky-600" /> Listening Studio
                    </CardTitle>
                    <CardDescription className="font-medium text-sky-800">Audio, transcript and answer data live only in the Listening module.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-5 sm:p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Question type</Label>
                        <Select value={listeningData.sectionType} onValueChange={(value) => updateListeningData((current) => ({ ...current, sectionType: value as ListeningLessonData['sectionType'] }))}>
                          <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="form_completion">Form completion</SelectItem>
                            <SelectItem value="note_completion">Note completion</SelectItem>
                            <SelectItem value="multiple_choice">Multiple choice</SelectItem>
                            <SelectItem value="matching">Matching</SelectItem>
                            <SelectItem value="map_labelling">Map labelling</SelectItem>
                            <SelectItem value="sentence_completion">Sentence completion</SelectItem>
                            <SelectItem value="short_answer">Short answer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Practice section</Label>
                        <Select value={listeningData.sectionNumber?.toString() ?? 'skill'} onValueChange={(value) => updateListeningData((current) => ({ ...current, sectionNumber: value === 'skill' ? null : Number(value) }))}>
                          <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="skill">Skill lesson</SelectItem>
                            <SelectItem value="1">Section 1</SelectItem>
                            <SelectItem value="2">Section 2</SelectItem>
                            <SelectItem value="3">Section 3</SelectItem>
                            <SelectItem value="4">Section 4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Audio delivery</Label>
                        <Select value={listeningData.audio.status} onValueChange={(value) => updateListeningData((current) => ({
                          ...current,
                          audio: value === 'ready'
                            ? { status: 'ready', ...(current.audio.url ? { url: current.audio.url } : {}) }
                            : { status: value as 'pending' | 'browser_tts' },
                        }))}>
                          <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="browser_tts">Browser voice (no audio URL)</SelectItem>
                            <SelectItem value="ready">Recorded audio URL</SelectItem>
                            <SelectItem value="pending">Audio pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Approved HTTPS audio URL</Label>
                      <Input
                        type="url"
                        value={listeningData.audio.url ?? ''}
                        disabled={listeningData.audio.status === 'browser_tts'}
                        onChange={(event) => updateListeningData((current) => ({
                          ...current,
                          audio: event.target.value.trim() ? { status: 'ready', url: event.target.value.trim() } : { status: 'pending' },
                        }))}
                        placeholder="https://.../listening-audio.mp3"
                        className="h-11 bg-white"
                      />
                      <p className="text-xs leading-5 text-slate-600">Choose “Browser voice” to publish without a URL; students will hear the reviewed transcript through their browser. Choose recorded audio for the final instructor-audio experience.</p>
                    </div>

                    <div className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div><p className="font-black text-slate-900">Transcript cues</p><p className="mt-1 text-xs text-slate-600">Each cue is time-coded so the student player can sync text with audio.</p></div>
                        <div className="flex items-center gap-2">
                          <Switch checked={listeningData.transcript.status === 'reviewed'} onCheckedChange={(checked) => updateListeningData((current) => ({ ...current, transcript: { ...current.transcript, status: checked ? 'reviewed' : 'draft' } }))} />
                          <span className="text-xs font-bold text-slate-700">Transcript reviewed</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {listeningData.transcript.cues.map((cue, index) => (
                          <div key={`${cue.startSeconds}-${index}`} className="grid gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 md:grid-cols-[74px_74px_120px_minmax(0,1fr)_36px]">
                            <Input type="number" min="0" value={cue.startSeconds} aria-label={`Cue ${index + 1} start`} onChange={(event) => updateListeningData((current) => ({ ...current, transcript: { ...current.transcript, cues: current.transcript.cues.map((item, itemIndex) => itemIndex === index ? { ...item, startSeconds: Number(event.target.value) } : item) } }))} />
                            <Input type="number" min="0" value={cue.endSeconds} aria-label={`Cue ${index + 1} end`} onChange={(event) => updateListeningData((current) => ({ ...current, transcript: { ...current.transcript, cues: current.transcript.cues.map((item, itemIndex) => itemIndex === index ? { ...item, endSeconds: Number(event.target.value) } : item) } }))} />
                            <Input value={cue.speaker ?? ''} placeholder="Speaker" aria-label={`Cue ${index + 1} speaker`} onChange={(event) => updateListeningData((current) => ({ ...current, transcript: { ...current.transcript, cues: current.transcript.cues.map((item, itemIndex) => itemIndex === index ? { ...item, speaker: event.target.value || undefined } : item) } }))} />
                            <Input value={cue.text} placeholder="Transcript text" aria-label={`Cue ${index + 1} text`} onChange={(event) => updateListeningData((current) => ({ ...current, transcript: { ...current.transcript, cues: current.transcript.cues.map((item, itemIndex) => itemIndex === index ? { ...item, text: event.target.value } : item) } }))} />
                            <Button type="button" variant="ghost" size="icon" disabled={listeningData.transcript.cues.length === 1} onClick={() => updateListeningData((current) => ({ ...current, transcript: { ...current.transcript, cues: current.transcript.cues.filter((_, itemIndex) => itemIndex !== index) } }))} aria-label={`Remove cue ${index + 1}`}><Trash2 className="h-4 w-4 text-rose-500" /></Button>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => updateListeningData((current) => ({ ...current, transcript: { ...current.transcript, cues: [...current.transcript.cues, { startSeconds: 0, endSeconds: 5, text: 'New transcript cue' }] } }))}><Plus className="mr-2 h-4 w-4" /> Add cue</Button>
                    </div>

                    <div className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-5">
                      <div className="mb-4 flex items-center justify-between gap-3"><div><p className="font-black text-slate-900">Practice questions</p><p className="mt-1 text-xs text-slate-600">Answers remain reviewable; student submissions will be captured separately.</p></div><Badge className="bg-sky-600">{listeningData.questions.length} questions</Badge></div>
                      <div className="space-y-4">
                        {listeningData.questions.map((question, index) => (
                          <div key={question.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                            <div className="mb-3 flex items-center justify-between"><p className="text-sm font-black text-slate-800">Question {index + 1}</p><Button type="button" variant="ghost" size="sm" disabled={listeningData.questions.length === 1} onClick={() => updateListeningData((current) => ({ ...current, questions: current.questions.filter((_, itemIndex) => itemIndex !== index) }))} className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"><Trash2 className="mr-1 h-4 w-4" /> Remove</Button></div>
                            <div className="grid gap-3"><Input value={question.prompt} onChange={(event) => updateListeningData((current) => ({ ...current, questions: current.questions.map((item, itemIndex) => itemIndex === index ? { ...item, prompt: event.target.value } : item) }))} placeholder="Question prompt" /><Input value={question.acceptedAnswers.join(', ')} onChange={(event) => updateListeningData((current) => ({ ...current, questions: current.questions.map((item, itemIndex) => itemIndex === index ? { ...item, acceptedAnswers: event.target.value.split(',').map((answer) => answer.trim()).filter(Boolean) } : item) }))} placeholder="Accepted answers, separated by commas" /><Textarea value={question.explanation} onChange={(event) => updateListeningData((current) => ({ ...current, questions: current.questions.map((item, itemIndex) => itemIndex === index ? { ...item, explanation: event.target.value } : item) }))} placeholder="Why this answer is correct" rows={2} /></div>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => updateListeningData((current) => ({ ...current, questions: [...current.questions, { id: `question-${Date.now()}`, type: current.sectionType, prompt: 'New listening question', acceptedAnswers: ['Answer'], explanation: 'Add a reviewable explanation.' }] }))}><Plus className="mr-2 h-4 w-4" /> Add question</Button>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4"><p className="text-sm font-black text-emerald-950">Listening publication review</p><div className="mt-3 grid gap-3 sm:grid-cols-3">{([
                      ['contentReviewed', 'Content reviewed'], ['transcriptChecked', 'Transcript checked'], ['answersChecked', 'Answers checked'],
                    ] as const).map(([key, label]) => <label key={key} className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-700"><Switch checked={listeningData.quality[key]} onCheckedChange={(checked) => updateListeningData((current) => ({ ...current, quality: { ...current.quality, [key]: checked } }))} />{label}</label>)}</div></div>
                  </CardContent>
                </Card>
              )}

              {formData.type === 'reading' && readingData && (
                <Card className="overflow-hidden rounded-[1.5rem] border-violet-200 bg-violet-50/40 shadow-sm">
                  <CardHeader className="border-b border-violet-100 bg-white/70">
                    <CardTitle className="flex items-center gap-2 text-lg font-black text-violet-950">
                      <FileText className="h-5 w-5 text-violet-600" /> Reading Studio
                    </CardTitle>
                    <CardDescription className="font-medium text-violet-800">Review original passage material and answer keys before this Reading lesson can be published.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-5 sm:p-6">
                    <div className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)]">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Passage format</Label>
                        <Select value={readingData.passageFormat} onValueChange={(value) => updateReadingData((current) => ({ ...current, passageFormat: value as ReadingLessonData['passageFormat'] }))}>
                          <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                          <SelectContent><SelectItem value="academic">Academic</SelectItem><SelectItem value="general_training">General Training</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Passage title</Label>
                        <Input value={readingData.passageTitle} onChange={(event) => updateReadingData((current) => ({ ...current, passageTitle: event.target.value }))} className="bg-white" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-violet-100 bg-white p-4 sm:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="font-black text-slate-900">Passage paragraphs</p><p className="mt-1 text-xs text-slate-600">Edit the labelled student-facing passage. The full reading text stays synced automatically.</p></div><Badge className="bg-violet-600">{readingData.paragraphs.length} paragraphs</Badge></div>
                      <div className="space-y-3">
                        {readingData.paragraphs.map((paragraph, index) => (
                          <div key={`${paragraph.label}-${index}`} className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 md:grid-cols-[70px_minmax(0,1fr)_36px]">
                            <Input value={paragraph.label} maxLength={1} aria-label={`Paragraph ${index + 1} label`} onChange={(event) => updateReadingData((current) => {
                              const paragraphs = current.paragraphs.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value.toUpperCase().slice(0, 1) } : item);
                              return { ...current, paragraphs, passageContent: paragraphs.map((item) => `${item.label}. ${item.content}`).join('\n\n') };
                            })} />
                            <Textarea value={paragraph.content} rows={4} aria-label={`Paragraph ${paragraph.label}`} onChange={(event) => updateReadingData((current) => {
                              const paragraphs = current.paragraphs.map((item, itemIndex) => itemIndex === index ? { ...item, content: event.target.value } : item);
                              return { ...current, paragraphs, passageContent: paragraphs.map((item) => `${item.label}. ${item.content}`).join('\n\n') };
                            })} className="bg-white" />
                            <Button type="button" variant="ghost" size="icon" disabled={readingData.paragraphs.length === 1} onClick={() => updateReadingData((current) => {
                              const paragraphs = current.paragraphs.filter((_, itemIndex) => itemIndex !== index);
                              return { ...current, paragraphs, passageContent: paragraphs.map((item) => `${item.label}. ${item.content}`).join('\n\n') };
                            })} aria-label={`Remove paragraph ${index + 1}`}><Trash2 className="h-4 w-4 text-rose-500" /></Button>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => updateReadingData((current) => {
                        const label = String.fromCharCode(65 + current.paragraphs.length);
                        const paragraphs = [...current.paragraphs, { label, content: 'Add the next original passage paragraph.' }];
                        return { ...current, paragraphs, passageContent: paragraphs.map((item) => `${item.label}. ${item.content}`).join('\n\n') };
                      })}><Plus className="mr-2 h-4 w-4" /> Add paragraph</Button>
                    </div>

                    <div className="rounded-2xl border border-violet-100 bg-white p-4 sm:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="font-black text-slate-900">Question groups and answer keys</p><p className="mt-1 text-xs text-slate-600">Every answer must be explicit and explained for student feedback.</p></div><Badge className="bg-violet-600">{readingData.questionGroups.reduce((total, group) => total + group.questions.length, 0)} questions</Badge></div>
                      <div className="space-y-5">
                        {readingData.questionGroups.map((group, groupIndex) => (
                          <div key={group.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><p className="font-black text-slate-800">Group {groupIndex + 1}</p><Badge variant="outline" className="bg-white">{group.type.replaceAll('_', ' ')}</Badge></div>
                            <Textarea value={group.instructions} rows={2} className="mb-3 bg-white" aria-label={`Group ${groupIndex + 1} instructions`} onChange={(event) => updateReadingData((current) => ({ ...current, questionGroups: current.questionGroups.map((item, itemIndex) => itemIndex === groupIndex ? { ...item, instructions: event.target.value } : item) }))} />
                            <div className="space-y-3">
                              {group.questions.map((question, questionIndex) => <div key={question.id} className="rounded-lg border border-slate-100 bg-white p-3"><p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">Question {questionIndex + 1}</p><div className="grid gap-2"><Textarea value={question.prompt} rows={2} aria-label={`Question ${questionIndex + 1} prompt`} onChange={(event) => updateReadingData((current) => ({ ...current, questionGroups: current.questionGroups.map((item, itemIndex) => itemIndex === groupIndex ? { ...item, questions: item.questions.map((entry, entryIndex) => entryIndex === questionIndex ? { ...entry, prompt: event.target.value } : entry) } : item) }))} /><Input value={question.acceptedAnswers.join(', ')} aria-label={`Question ${questionIndex + 1} answers`} placeholder="Accepted answers, separated by commas" onChange={(event) => updateReadingData((current) => ({ ...current, questionGroups: current.questionGroups.map((item, itemIndex) => itemIndex === groupIndex ? { ...item, questions: item.questions.map((entry, entryIndex) => entryIndex === questionIndex ? { ...entry, acceptedAnswers: event.target.value.split(',').map((answer) => answer.trim()).filter(Boolean) } : entry) } : item) }))} /><Textarea value={question.explanation} rows={2} aria-label={`Question ${questionIndex + 1} explanation`} placeholder="Why this answer is correct" onChange={(event) => updateReadingData((current) => ({ ...current, questionGroups: current.questionGroups.map((item, itemIndex) => itemIndex === groupIndex ? { ...item, questions: item.questions.map((entry, entryIndex) => entryIndex === questionIndex ? { ...entry, explanation: event.target.value } : entry) } : item) }))} /></div></div>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4"><p className="text-sm font-black text-emerald-950">Reading publication review</p><p className="mt-1 text-xs text-emerald-800">Confirm these only after a human has reviewed the complete material.</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{([
                      ['passageReviewed', 'Passage reviewed'], ['questionsReviewed', 'Questions reviewed'], ['answersChecked', 'Answers checked'], ['copyrightConfirmed', 'Original / copyright-safe'],
                    ] as const).map(([key, label]) => <label key={key} className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-700"><Switch checked={readingData.quality[key]} onCheckedChange={(checked) => updateReadingData((current) => ({ ...current, quality: { ...current.quality, [key]: checked } }))} />{label}</label>)}</div></div>
                  </CardContent>
                </Card>
              )}

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
                    {formData.content.studyBlueprint && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-bold text-emerald-800">Blueprint v{formData.content.studyBlueprint.schemaVersion} validated</span>
                          <Badge className="bg-emerald-600">{formData.content.studyBlueprint.sections.length} study steps</Badge>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-emerald-700">{formData.content.studyBlueprint.outcome}</p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDraftPreviewOpen(true)}
                          className="mt-4 w-full border-emerald-300 bg-white font-bold text-emerald-800 hover:bg-emerald-100"
                        >
                          <Eye className="mr-2 h-4 w-4" /> Open full draft preview
                        </Button>
                      </div>
                    )}
                    {formData.content.deepVocabulary && (
                      <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                        <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-violet-500">Deep lesson words</span>
                        <div className="flex flex-wrap gap-2">
                          {formData.content.deepVocabulary.words.map((word) => (
                            <Badge key={word.word} className="bg-violet-600">{word.word}</Badge>
                          ))}
                        </div>
                        <p className="mt-3 text-xs text-violet-700">
                          {formData.content.deepVocabulary.checks.length} checks · review examples, corrections and answer keys before publishing.
                        </p>
                      </div>
                    )}
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
                    {(formData.content.deepGrammar ? [
                      { id: 'naturalCollocations', label: 'Grammar forms and rules are accurate' },
                      { id: 'ieltsSafeUsage', label: 'IELTS usage guidance is appropriate' },
                      { id: 'noRareWords', label: 'Explanations are clear for the target level' },
                      { id: 'examplesReviewed', label: 'Examples and sentence upgrades are natural' },
                      { id: 'mistakesAccurate', label: 'Corrections and answer keys are accurate' }
                    ] : [
                      { id: 'naturalCollocations', label: 'Collocations are natural and commonly used' },
                      { id: 'ieltsSafeUsage', label: 'Vocabulary is IELTS-safe and appropriate' },
                      { id: 'noRareWords', label: 'No over-advanced or rare words' },
                      { id: 'examplesReviewed', label: 'Example sentences are natural' },
                      { id: 'mistakesAccurate', label: 'Mistakes and corrections are accurate' }
                    ]).map((check) => (
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
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      disabled={(Boolean(formData.content?.deepVocabulary || formData.content?.deepGrammar || formData.content?.studyBlueprint) && !Object.values(qualityChecklist).every(Boolean)) || (formData.type === 'listening' && !listeningPublishReady) || (formData.type === 'reading' && !readingPublishReady)}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                    />
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

      <Dialog open={isDraftPreviewOpen} onOpenChange={setIsDraftPreviewOpen}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-[2rem] p-0">
          <DialogHeader className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 p-6 backdrop-blur">
            <div className="flex items-start justify-between gap-4 pr-8">
              <div>
                <DialogTitle className="flex items-center gap-2 text-2xl font-black text-slate-900">
                  <Eye className="h-6 w-6 text-violet-600" /> Full draft preview
                </DialogTitle>
                <DialogDescription className="mt-2 font-medium text-slate-600">
                  Private admin review only. Opening this preview does not save, approve, or publish the lesson.
                </DialogDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDraftPreviewOpen(false)}
                className="shrink-0 font-bold"
              >
                Back to editor
              </Button>
            </div>
          </DialogHeader>
          <div className="bg-slate-50 p-5 sm:p-8">
            {formData.content?.studyBlueprint ? (
              <div className="mx-auto max-w-3xl">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-slate-950 to-violet-900 p-6 text-white">
                  <p className="text-xs font-black uppercase tracking-widest text-violet-200">
                    {formData.is_published ? 'Published lesson' : 'Draft lesson'}
                  </p>
                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">{formData.title || 'Untitled lesson'}</h2>
                  <p className="mt-3 max-w-2xl leading-7 text-violet-100">{formData.description}</p>
                  {formData.is_published && editingLesson?.slug && (
                    <RouterLink
                      to={`/lesson/${editingLesson.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-violet-800 transition hover:bg-violet-50"
                    >
                      <ExternalLink className="h-4 w-4" /> Open published student page
                    </RouterLink>
                  )}
                </div>
                <StudyMaterialRenderer blueprint={formData.content.studyBlueprint} />
              </div>
            ) : (
              <p className="py-12 text-center font-medium text-slate-500">A complete study blueprint is required for preview.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
