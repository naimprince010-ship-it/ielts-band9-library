import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { 
  FileText, 
  Headphones, 
  PenTool, 
  Mic,
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  GripVertical,
  Sparkles,
  Volume2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  extractTask1Visuals,
  normalizeMockTestRow,
  normalizeWritingTestFromDb,
  findWritingTask1,
  writingTask1HasAcademicVisual,
} from '@/lib/writingVisualNormalize';
import { cn } from '@/lib/utils';
import { WritingTask1Renderer } from '@/components/test/WritingTask1Renderer';
import {
  ReadingTest,
  ReadingPassage,
  ReadingQuestion,
  ReadingQuestionType,
  ListeningTest,
  ListeningSection,
  ListeningQuestion,
  ListeningQuestionType,
  WritingTest,
  WritingTask,
  WritingTableData,
  SpeakingTest,
  SpeakingPart,
  SpeakingQuestion,
  SpeakingCueCard
} from '@/types';

type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking';

interface MockTest {
  id: string;
  title: string;
  module_type: ModuleType;
  test_data: ReadingTest | ListeningTest | WritingTest | SpeakingTest;
  is_published: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

const READING_QUESTION_TYPES: { value: ReadingQuestionType; label: string }[] = [
  { value: 'mcq', label: 'Multiple Choice' },
  { value: 'fill-blank', label: 'Fill in the Blank' },
  { value: 'true-false-not-given', label: 'True/False/Not Given' },
  { value: 'yes-no-not-given', label: 'Yes/No/Not Given' },
  { value: 'matching-headings', label: 'Matching Headings' },
  { value: 'matching-information', label: 'Matching Information' },
  { value: 'matching-features', label: 'Matching Features' },
  { value: 'sentence-completion', label: 'Sentence Completion' },
  { value: 'summary-completion', label: 'Summary Completion' },
  { value: 'diagram-labeling', label: 'Diagram Labeling' },
  { value: 'short-answer', label: 'Short Answer' },
];

const LISTENING_QUESTION_TYPES: { value: ListeningQuestionType; label: string }[] = [
  { value: 'mcq', label: 'Multiple Choice' },
  { value: 'fill-blank', label: 'Fill in the Blank' },
  { value: 'matching', label: 'Matching' },
  { value: 'map-labeling', label: 'Map/Plan Labeling' },
  { value: 'sentence-completion', label: 'Sentence Completion' },
  { value: 'short-answer', label: 'Short Answer' },
];

/** Ensures test_data is JSON-serializable for PostgREST (drops undefined, non-finite numbers → null). */
function jsonbSafe<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_k, v) => {
      if (typeof v === 'number' && !Number.isFinite(v)) return null;
      return v;
    })
  ) as T;
}

function formatSupabaseError(err: unknown): string {
  if (err && typeof err === 'object') {
    const o = err as { message?: string; details?: string; hint?: string; code?: string };
    const parts = [o.message, o.details, o.hint].filter(Boolean);
    if (parts.length) return parts.join(' — ');
  }
  return '';
}

export function MockTestManagement() {
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isFullTestModalOpen, setIsFullTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<MockTest | null>(null);
  const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState<{
    title: string;
    module_type: ModuleType;
    is_published: boolean;
    is_premium: boolean;
    reading_data: Partial<ReadingTest>;
    listening_data: Partial<ListeningTest>;
    writing_data: Partial<WritingTest>;
    speaking_data: Partial<SpeakingTest>;
  }>({
    title: '',
    module_type: 'reading',
    is_published: false,
    is_premium: false,
    reading_data: getDefaultReadingData(),
    listening_data: getDefaultListeningData(),
    writing_data: getDefaultWritingData(),
    speaking_data: getDefaultSpeakingData(),
  });

  useEffect(() => {
    fetchMockTests();
  }, []);

  const fetchMockTests = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMockTests((data || []).map((row) => normalizeMockTestRow(row as MockTest)));
    } catch (err) {
      console.error('Error fetching mock tests:', err);
      setError('Failed to load mock tests. Make sure you have run the SQL setup.');
    } finally {
      setLoading(false);
    }
  };

  const getNextTestNumber = (moduleType: ModuleType): number => {
    const moduleTests = mockTests.filter(t => t.module_type === moduleType);
    if (moduleTests.length === 0) return 1;
    
    const numbers = moduleTests
      .map(t => {
        const match = t.title.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(n => !isNaN(n));
    
    return numbers.length > 0 ? Math.max(...numbers) + 1 : moduleTests.length + 1;
  };

  const getModuleDisplayName = (moduleType: ModuleType): string => {
    switch (moduleType) {
      case 'reading': return 'Reading Test';
      case 'listening': return 'Listening Test';
      case 'writing': return 'Writing Test';
      case 'speaking': return 'Speaking Test';
    }
  };

  const handleNewTest = (moduleType: ModuleType) => {
    setEditingTest(null);
    const nextNumber = getNextTestNumber(moduleType);
    const suggestedTitle = `${getModuleDisplayName(moduleType)} ${nextNumber}`;
    
    setFormData({
      title: suggestedTitle,
      module_type: moduleType,
      is_published: false,
      is_premium: false,
      reading_data: getDefaultReadingData(),
      listening_data: getDefaultListeningData(),
      writing_data: getDefaultWritingData(),
      speaking_data: getDefaultSpeakingData(),
    });
    setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

    const handleEditTest = (test: MockTest) => {
      setEditingTest(test);
      setFormData({
        title: test.title,
        module_type: test.module_type,
        is_published: test.is_published,
        is_premium: test.is_premium,
        reading_data: test.module_type === 'reading' ? test.test_data as ReadingTest : getDefaultReadingData(),
        listening_data: test.module_type === 'listening' ? test.test_data as ListeningTest : getDefaultListeningData(),
        writing_data:
          test.module_type === 'writing'
            ? (normalizeWritingTestFromDb(test.test_data) as WritingTest)
            : getDefaultWritingData(),
        speaking_data: test.module_type === 'speaking' ? test.test_data as SpeakingTest : getDefaultSpeakingData(),
      });
      setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

  const handleSaveTest = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setError('Supabase not configured');
      return;
    }

    if (!formData.title) {
      setError('Please enter a test title');
      return;
    }

    setSaving(true);
    setError('');

    try {
      let testData: ReadingTest | ListeningTest | WritingTest | SpeakingTest;
      
      switch (formData.module_type) {
        case 'reading':
          testData = jsonbSafe(buildReadingTest());
          break;
        case 'listening':
          testData = jsonbSafe(buildListeningTest());
          break;
        case 'writing':
          // Save form payload as-is; normalizeWritingTestFromDb is for DB → UI load only (avoids edge-case drops on save).
          testData = jsonbSafe(buildWritingTest());
          break;
        case 'speaking':
          testData = jsonbSafe(buildSpeakingTest());
          break;
      }

      if (editingTest) {
        const { error } = await supabase
          .from('mock_tests')
          .update({
            title: formData.title,
            module_type: formData.module_type,
            test_data: testData,
            is_published: formData.is_published,
            is_premium: formData.is_premium,
          })
          .eq('id', editingTest.id);

        if (error) throw error;
        setMockTests((prev) =>
          prev.map((t) =>
            t.id === editingTest.id
              ? normalizeMockTestRow({
                  ...t,
                  title: formData.title,
                  test_data: testData as WritingTest,
                  is_published: formData.is_published,
                  is_premium: formData.is_premium,
                } as MockTest)
              : t
          )
        );
        setSuccess('Mock test updated successfully!');
      } else {
        const { error } = await supabase
          .from('mock_tests')
          .insert({
            title: formData.title,
            module_type: formData.module_type,
            test_data: testData,
            is_published: formData.is_published,
            is_premium: formData.is_premium,
          });

        if (error) throw error;
        setSuccess('Mock test created successfully!');
      }

      fetchMockTests();
      setTimeout(() => {
        setIsEditorOpen(false);
        setSuccess('');
      }, 1500);
    } catch (err) {
      console.error('Error saving mock test:', err);
      const detail = formatSupabaseError(err);
      setError(
        detail
          ? `Failed to save mock test: ${detail}`
          : 'Failed to save mock test. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this mock test?')) return;
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      const { error } = await supabase
        .from('mock_tests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Mock test deleted successfully!');
      fetchMockTests();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting mock test:', err);
      setError('Failed to delete mock test');
    }
  };

  const handleTogglePublish = async (test: MockTest) => {
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      const { error } = await supabase
        .from('mock_tests')
        .update({ is_published: !test.is_published })
        .eq('id', test.id);

      if (error) throw error;
      fetchMockTests();
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  const buildReadingTest = (): ReadingTest => {
    const data = formData.reading_data;
    return {
      id: editingTest?.id || `reading-${Date.now()}`,
      title: formData.title,
      testType: data.testType || 'academic',
      totalQuestions: data.passages?.reduce((sum, p) => sum + (p.questions?.length || 0), 0) || 0,
      timeLimit: data.timeLimit || 3600,
      passages: data.passages || [],
      instructions: data.instructions,
      is_premium: formData.is_premium,
      created_at: new Date().toISOString()
    };
  };

  const buildListeningTest = (): ListeningTest => {
    const data = formData.listening_data;
    return {
      id: editingTest?.id || `listening-${Date.now()}`,
      title: formData.title,
      totalQuestions: data.sections?.reduce((sum, s) => sum + (s.questions?.length || 0), 0) || 0,
      audioUrl: data.audioUrl || '',
      audioDuration: data.audioDuration || 0,
      transferTime: data.transferTime || 600,
      sections: data.sections || [],
      instructions: data.instructions,
      is_premium: formData.is_premium,
      created_at: new Date().toISOString()
    };
  };

  const buildWritingTest = (): WritingTest => {
    const data = formData.writing_data;
    const prior = editingTest?.test_data as WritingTest | undefined;
    const innerId =
      (typeof data.id === 'string' && data.id.trim() ? data.id : null) ||
      (prior?.id && String(prior.id)) ||
      `writing-${Date.now()}`;
    const tasks = data.tasks || [getDefaultWritingTask(1), getDefaultWritingTask(2)];
    return {
      id: innerId,
      title: formData.title,
      testType: data.testType || 'academic',
      timeLimit: data.timeLimit || 3600,
      tasks,
      instructions: data.instructions,
      is_premium: formData.is_premium,
      created_at: prior?.created_at || new Date().toISOString(),
    };
  };

  const buildSpeakingTest = (): SpeakingTest => {
    const data = formData.speaking_data;
    return {
      id: editingTest?.id || `speaking-${Date.now()}`,
      title: formData.title,
      parts: data.parts || [getDefaultSpeakingPart(1), getDefaultSpeakingPart(2), getDefaultSpeakingPart(3)],
      instructions: data.instructions,
      is_premium: formData.is_premium,
      created_at: new Date().toISOString()
    };
  };

  const getModuleIcon = (type: ModuleType) => {
    switch (type) {
      case 'reading': return <FileText className="h-4 w-4" />;
      case 'listening': return <Headphones className="h-4 w-4" />;
      case 'writing': return <PenTool className="h-4 w-4" />;
      case 'speaking': return <Mic className="h-4 w-4" />;
    }
  };

  const getModuleColor = (type: ModuleType) => {
    switch (type) {
      case 'reading': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'listening': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'writing': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'speaking': return 'bg-orange-50 text-orange-700 border-orange-100';
    }
  };

  const checkTestIntegrity = (test: MockTest): { status: 'complete' | 'incomplete'; message?: string } => {
    const data = test.test_data;
    if (test.module_type === 'listening') {
      const lData = data as ListeningTest;
      const hasPerSectionAudio = Array.isArray(lData.sections) && lData.sections.some(s => s.sectionAudioUrl);
      if (!lData.audioUrl && !hasPerSectionAudio) return { status: 'incomplete', message: 'Missing Audio' };
    }
    if (test.module_type === 'writing') {
      const wData = normalizeWritingTestFromDb(data);
      const task1 = findWritingTask1(wData);
      if (wData.testType === 'academic' && task1) {
        if (!writingTask1HasAcademicVisual(task1)) {
          return { status: 'incomplete', message: 'Missing Task 1 Visual' };
        }
      }
    }
    return { status: 'complete' };
  };

  if (!isSupabaseConfigured()) {
    return (
      <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            Mock Test Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <Alert className="bg-amber-50 border-amber-200 rounded-2xl">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-900 font-medium">
              Supabase is not configured. Please run the SQL setup script in your Supabase dashboard to enable this feature.
              <br /><br />
              <strong>Steps:</strong>
              <ol className="list-decimal ml-4 mt-2 space-y-1">
                <li>Go to Supabase Dashboard → SQL Editor</li>
                <li>Run the mock_tests table creation SQL</li>
                <li>Refresh this page</li>
              </ol>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {success && (
        <Alert className="bg-emerald-50 border-emerald-200 text-emerald-900 rounded-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="font-bold">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="bg-rose-50 border-rose-200 text-rose-900 rounded-2xl animate-in fade-in slide-in-from-top-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-bold">{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
        <CardHeader className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FileText className="h-6 w-6 text-indigo-600" />
                Mock Test Management
              </CardTitle>
              <CardDescription className="font-medium mt-1">
                Create and manage IELTS mock tests for all modules
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setIsFullTestModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-11 rounded-xl font-bold">
                <Sparkles className="h-4 w-4" />
                AI Generate Full Test
              </Button>
              <div className="w-px h-10 bg-slate-200 mx-2 hidden lg:block"></div>
              <Button onClick={() => handleNewTest('reading')} variant="outline" className="h-11 rounded-xl font-bold border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all">
                <FileText className="h-4 w-4 mr-2" /> Reading
              </Button>
              <Button onClick={() => handleNewTest('listening')} variant="outline" className="h-11 rounded-xl font-bold border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-all">
                <Headphones className="h-4 w-4 mr-2" /> Listening
              </Button>
              <Button onClick={() => handleNewTest('writing')} variant="outline" className="h-11 rounded-xl font-bold border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all">
                <PenTool className="h-4 w-4 mr-2" /> Writing
              </Button>
              <Button onClick={() => handleNewTest('speaking')} variant="outline" className="h-11 rounded-xl font-bold border-slate-200 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 transition-all">
                <Mic className="h-4 w-4 mr-2" /> Speaking
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
          ) : mockTests.length === 0 ? (
            <div className="text-center py-16 text-slate-400 font-bold uppercase tracking-widest border-2 border-dashed rounded-[2rem]">
              No mock tests found
            </div>
          ) : (
            <div className="grid gap-4">
              {mockTests.map((test) => (
                <Card key={test.id} className="hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 border-slate-100 rounded-2xl overflow-hidden group">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300",
                          test.module_type === 'reading' ? 'bg-blue-50 text-blue-600' :
                          test.module_type === 'listening' ? 'bg-purple-50 text-purple-600' :
                          test.module_type === 'writing' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-orange-50 text-orange-600'
                        )}>
                          {getModuleIcon(test.module_type)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{test.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={cn("text-[10px] uppercase font-bold rounded-lg", getModuleColor(test.module_type))}>
                              {test.module_type}
                            </Badge>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              Created: {new Date(test.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {test.is_premium && (
                          <Badge className="bg-amber-100 text-amber-800 rounded-lg font-bold">Premium</Badge>
                        )}
                        {checkTestIntegrity(test).status === 'incomplete' && (
                          <Badge variant="destructive" className="bg-rose-50 text-rose-600 border border-rose-100 gap-1.5 font-bold animate-pulse rounded-lg">
                            <AlertCircle className="h-3 w-3" />
                            {checkTestIntegrity(test).message}
                          </Badge>
                        )}
                        <Badge className={cn("rounded-lg font-bold px-3 py-1", test.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800')}>
                          {test.is_published ? 'Published' : 'Draft'}
                        </Badge>
                        <div className="flex items-center gap-1 ml-2">
                          <Button variant="ghost" size="icon" aria-label={test.is_published ? 'Unpublish test' : 'Publish test'} className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600" onClick={() => handleTogglePublish(test)}>
                            {test.is_published ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                          </Button>
                          <Button variant="ghost" size="icon" aria-label={`Edit ${test.title}`} className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600" onClick={() => handleEditTest(test)}>
                            <Edit className="h-5 w-5" aria-hidden="true" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label={`Delete ${test.title}`} className="rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600" onClick={() => handleDeleteTest(test.id)}>
                            <Trash2 className="h-5 w-5" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getModuleIcon(formData.module_type)}
              {editingTest ? 'Edit Mock Test' : 'Create New Mock Test'}
            </DialogTitle>
            <DialogDescription>
              Build a {formData.module_type} mock test for IELTS practice
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Test Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={`e.g., ${formData.module_type.charAt(0).toUpperCase() + formData.module_type.slice(1)} Test 1`}
                />
              </div>
              <div className="flex items-end gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_premium}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_premium: checked }))}
                  />
                  <Label>Premium</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                  />
                  <Label>Published</Label>
                </div>
              </div>
            </div>

                        {formData.module_type === 'reading' && (
                          <ReadingTestBuilder
                            data={formData.reading_data}
                            onChange={(data) => setFormData(prev => ({ ...prev, reading_data: data }))}
                            onTitleSuggested={(title) => setFormData(prev => prev.title ? prev : { ...prev, title })}
                          />
                        )}

                        {formData.module_type === 'listening' && (
                          <ListeningTestBuilder
                            data={formData.listening_data}
                            onChange={(data) => setFormData(prev => ({ ...prev, listening_data: data }))}
                            onTitleSuggested={(title) => setFormData(prev => prev.title ? prev : { ...prev, title })}
                          />
                        )}

                        {formData.module_type === 'writing' && (
                          <WritingTestBuilder
                            data={formData.writing_data}
                            onChange={(data) => setFormData(prev => ({ ...prev, writing_data: data }))}
                            onTitleSuggested={(title) => setFormData(prev => prev.title ? prev : { ...prev, title })}
                          />
                        )}

                        {formData.module_type === 'speaking' && (
                          <SpeakingTestBuilder
                            data={formData.speaking_data}
                            onChange={(data) => setFormData(prev => ({ ...prev, speaking_data: data }))}
                            onTitleSuggested={(title) => setFormData(prev => prev.title ? prev : { ...prev, title })}
                          />
                        )}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTest} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Mock Test'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <FullTestGeneratorDialog open={isFullTestModalOpen} onOpenChange={setIsFullTestModalOpen} onComplete={fetchMockTests} />
    </div>
  );
}

function getDefaultReadingData(): Partial<ReadingTest> {
  return {
    testType: 'academic',
    timeLimit: 3600,
    passages: [],
    instructions: 'Read the passages carefully and answer the questions.'
  };
}

function getDefaultListeningData(): Partial<ListeningTest> {
  return {
    audioUrl: '',
    audioDuration: 0,
    transferTime: 600,
    sections: [],
    instructions: 'Listen to the audio and answer the questions.'
  };
}

function getDefaultWritingData(): Partial<WritingTest> {
  return {
    testType: 'academic',
    timeLimit: 3600,
    tasks: [getDefaultWritingTask(1), getDefaultWritingTask(2)],
    instructions: 'Complete both writing tasks within the time limit.'
  };
}

function getDefaultWritingTask(taskNumber: 1 | 2): WritingTask {
  return {
    id: `task-${taskNumber}-${Date.now()}`,
    taskNumber,
    taskType: taskNumber === 1 ? 'task1' : 'task2',
    title: taskNumber === 1 ? 'Task 1: Report Writing' : 'Task 2: Essay Writing',
    prompt: '',
    minWords: taskNumber === 1 ? 150 : 250,
    recommendedTime: taskNumber === 1 ? 20 : 40,
    tips: []
  };
}

function getDefaultSpeakingData(): Partial<SpeakingTest> {
  return {
    parts: [getDefaultSpeakingPart(1), getDefaultSpeakingPart(2), getDefaultSpeakingPart(3)],
    instructions: 'Answer the questions naturally and speak clearly.'
  };
}

function getDefaultSpeakingPart(partNumber: 1 | 2 | 3): SpeakingPart {
  const titles = {
    1: 'Part 1: Introduction & Interview',
    2: 'Part 2: Individual Long Turn',
    3: 'Part 3: Two-way Discussion'
  };
  
  const instructions = {
    1: 'The examiner will ask you general questions about yourself and familiar topics.',
    2: 'You will be given a topic card. You have 1 minute to prepare and 2 minutes to speak.',
    3: 'The examiner will ask you more abstract questions related to the Part 2 topic.'
  };

  return {
    id: `part-${partNumber}-${Date.now()}`,
    partNumber,
    partType: `part${partNumber}` as 'part1' | 'part2' | 'part3',
    title: titles[partNumber],
    instructions: instructions[partNumber],
    questions: partNumber !== 2 ? [] : undefined,
    cueCard: partNumber === 2 ? {
      id: `cue-${Date.now()}`,
      topic: '',
      bulletPoints: ['', '', '', ''],
      prepTime: 60,
      recordTime: 120
    } : undefined
  };
}

interface AIGeneratorProps {
  moduleType: 'reading' | 'listening' | 'writing' | 'speaking';
  testType?: 'academic' | 'general';
  onGenerated: (content: unknown, topic?: string) => void;
}

interface TopicSuggestion {
  topic: string;
  category: string;
  difficulty: string;
}

function AIContentGenerator({ moduleType, testType = 'academic', onGenerated }: AIGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [provider, setProvider] = useState<'openai' | 'gemini'>('openai');
  const [error, setError] = useState('');
  const [suggestedTopics, setSuggestedTopics] = useState<TopicSuggestion[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);

  const handleSuggestTopics = async () => {
    setLoadingTopics(true);
    setError('');

    try {
      const response = await fetch('/api/suggest-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleType,
          testType,
          count: 8
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('API endpoint not found. Please redeploy the application.');
        }
        const data = await response.json().catch(() => ({}));
        const errorMsg = data.error || data.details || `Server error: ${response.status}`;
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (data.success && data.topics) {
        setSuggestedTopics(data.topics);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error('Topic Suggestion Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to suggest topics';
      setError(errorMessage);
    } finally {
      setLoadingTopics(false);
    }
  };

  const handleSelectTopic = (selectedTopic: TopicSuggestion) => {
    setTopic(selectedTopic.topic);
    if (selectedTopic.difficulty === 'easy' || selectedTopic.difficulty === 'medium' || selectedTopic.difficulty === 'hard') {
      setDifficulty(selectedTopic.difficulty);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleType,
          topic: topic.trim(),
          difficulty,
          testType,
          provider
        })
      });

      const rawText = await response.text();
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        console.error('Failed to parse response:', rawText.substring(0, 200));
        throw new Error(`Server returned invalid response. Please check if ${provider === 'gemini' ? 'GEMINI_API_KEY' : 'OPENAI_API_KEY'} is configured in Vercel.`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      if (data.success && data.content) {
        onGenerated(data.content, topic.trim());
        setTopic('');
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (err) {
      console.error('AI Generation Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Content Generator
        </CardTitle>
        <CardDescription>
          Generate {moduleType} test content using AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Topic</Label>
            <div className="flex gap-2">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Climate change, Technology..."
                disabled={generating}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSuggestTopics}
                disabled={loadingTopics || generating}
                aria-label="Suggest topics with AI"
                className="shrink-0"
              >
                {loadingTopics ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
          <div>
            <Label>Difficulty</Label>
            <Select
              value={difficulty}
              onValueChange={(v) => setDifficulty(v as 'easy' | 'medium' | 'hard')}
              disabled={generating}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>AI Provider</Label>
            <Select
              value={provider}
              onValueChange={(v) => setProvider(v as 'openai' | 'gemini')}
              disabled={generating}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                <SelectItem value="gemini">Google Gemini</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {suggestedTopics.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs text-gray-500">Suggested Topics (click to select)</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`cursor-pointer hover:bg-purple-100 transition-colors ${
                    topic === suggestion.topic ? 'bg-purple-100 border-purple-400' : ''
                  }`}
                  onClick={() => handleSelectTopic(suggestion)}
                >
                  <span className="mr-1">{suggestion.topic}</span>
                  <span className="text-xs text-gray-400">({suggestion.category})</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleGenerate}
          disabled={generating || !topic.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

function ReadingTestBuilder({ 
  data, 
  onChange,
  onTitleSuggested
}: { 
  data: Partial<ReadingTest>; 
  onChange: (data: Partial<ReadingTest>) => void;
  onTitleSuggested?: (title: string) => void;
}){
  const [activePassage, setActivePassage] = useState(0);

  const handleAIGenerated = (content: unknown, topic?: string) => {
    const aiContent = content as { passage: { title: string; textContent: string; paragraphs?: Array<{ label: string; content: string }> }; questions: Array<{ type: string; questionText: string; options?: string[]; correctAnswer: string; acceptedAnswers?: string[]; explanation?: string; passageRef?: string }> };
    
    if (topic && onTitleSuggested && !data.passages?.length) {
      onTitleSuggested(`Reading Test: ${topic}`);
    }
    
    const newPassage: ReadingPassage = {
      id: `passage-${Date.now()}`,
      passageNumber: (data.passages?.length || 0) + 1,
      title: aiContent.passage.title,
      textContent: aiContent.passage.textContent,
      paragraphs: aiContent.passage.paragraphs,
      questions: aiContent.questions.map((q, i) => ({
        id: `q-${Date.now()}-${i}`,
        questionNumber: (data.passages?.flatMap(p => p.questions).length || 0) + i + 1,
        type: q.type as ReadingQuestionType,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        acceptedAnswers: q.acceptedAnswers,
        explanation: q.explanation,
        passageRef: q.passageRef
      })),
      questionRange: { start: 1, end: aiContent.questions.length }
    };

    const passages = [...(data.passages || []), newPassage];
    let qNum = 1;
    passages.forEach(p => {
      const startNum = qNum;
      p.questions.forEach(q => {
        q.questionNumber = qNum++;
      });
      p.questionRange = { start: startNum, end: qNum - 1 };
    });

    onChange({ ...data, passages });
    setActivePassage(passages.length - 1);
  };

  const addPassage = () => {
    const newPassage: ReadingPassage = {
      id: `passage-${Date.now()}`,
      passageNumber: (data.passages?.length || 0) + 1,
      title: '',
      textContent: '',
      questions: [],
      questionRange: { start: 1, end: 0 }
    };
    onChange({
      ...data,
      passages: [...(data.passages || []), newPassage]
    });
    setActivePassage((data.passages?.length || 0));
  };

  const updatePassage = (index: number, updates: Partial<ReadingPassage>) => {
    const passages = [...(data.passages || [])];
    passages[index] = { ...passages[index], ...updates };
    onChange({ ...data, passages });
  };

  const removePassage = (index: number) => {
    const passages = [...(data.passages || [])];
    passages.splice(index, 1);
    passages.forEach((p, i) => p.passageNumber = i + 1);
    onChange({ ...data, passages });
    if (activePassage >= passages.length) {
      setActivePassage(Math.max(0, passages.length - 1));
    }
  };

  const addQuestion = (passageIndex: number) => {
    const passages = [...(data.passages || [])];
    const passage = passages[passageIndex];
    const allQuestions = passages.flatMap(p => p.questions);
    const nextNumber = allQuestions.length + 1;
    
    const newQuestion: ReadingQuestion = {
      id: `q-${Date.now()}`,
      questionNumber: nextNumber,
      type: 'mcq',
      questionText: '',
      correctAnswer: '',
      options: ['', '', '', '']
    };
    
    passage.questions = [...passage.questions, newQuestion];
    passage.questionRange = {
      start: passage.questions[0]?.questionNumber || nextNumber,
      end: nextNumber
    };
    
    onChange({ ...data, passages });
  };

  const updateQuestion = (passageIndex: number, questionIndex: number, updates: Partial<ReadingQuestion>) => {
    const passages = [...(data.passages || [])];
    const questions = [...passages[passageIndex].questions];
    questions[questionIndex] = { ...questions[questionIndex], ...updates };
    passages[passageIndex].questions = questions;
    onChange({ ...data, passages });
  };

  const removeQuestion = (passageIndex: number, questionIndex: number) => {
    const passages = [...(data.passages || [])];
    passages[passageIndex].questions.splice(questionIndex, 1);
    let qNum = 1;
    passages.forEach(p => {
      p.questions.forEach(q => {
        q.questionNumber = qNum++;
      });
      if (p.questions.length > 0) {
        p.questionRange = {
          start: p.questions[0].questionNumber,
          end: p.questions[p.questions.length - 1].questionNumber
        };
      }
    });
    onChange({ ...data, passages });
  };

  return (
    <div className="space-y-4">
      <AIContentGenerator
        moduleType="reading"
        testType={data.testType || 'academic'}
        onGenerated={handleAIGenerated}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Test Type</Label>
          <Select
            value={data.testType || 'academic'}
            onValueChange={(value) => onChange({ ...data, testType: value as 'academic' | 'general' })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="general">General Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Time Limit (seconds)</Label>
          <Input
            type="number"
            value={data.timeLimit || 3600}
            onChange={(e) => onChange({ ...data, timeLimit: parseInt(e.target.value) || 3600 })}
          />
        </div>
      </div>

      <div>
        <Label>Instructions</Label>
        <Textarea
          value={data.instructions || ''}
          onChange={(e) => onChange({ ...data, instructions: e.target.value })}
          placeholder="Enter test instructions..."
          rows={2}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Passages ({data.passages?.length || 0})</CardTitle>
            <Button onClick={addPassage} size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Passage
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {(data.passages?.length || 0) === 0 ? (
            <p className="text-gray-500 text-center py-4">No passages yet. Click "Add Passage" to start.</p>
          ) : (
            <Tabs value={String(activePassage)} onValueChange={(v) => setActivePassage(parseInt(v))}>
              <TabsList>
                {data.passages?.map((_, i) => (
                  <TabsTrigger key={i} value={String(i)}>
                    Passage {i + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {data.passages?.map((passage, pIndex) => (
                <TabsContent key={pIndex} value={String(pIndex)} className="space-y-4">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePassage(pIndex)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove Passage
                    </Button>
                  </div>
                  
                  <div>
                    <Label>Passage Title</Label>
                    <Input
                      value={passage.title}
                      onChange={(e) => updatePassage(pIndex, { title: e.target.value })}
                      placeholder="e.g., The History of Coffee"
                    />
                  </div>

                  <div>
                    <Label>Passage Content (HTML supported)</Label>
                    <Textarea
                      value={passage.textContent}
                      onChange={(e) => updatePassage(pIndex, { textContent: e.target.value })}
                      placeholder="Enter the passage text... You can use HTML tags like <p>, <strong>, etc."
                      rows={8}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Questions ({passage.questions.length})</h4>
                      <Button onClick={() => addQuestion(pIndex)} size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Question
                      </Button>
                    </div>

                    {passage.questions.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No questions yet.</p>
                    ) : (
                      <div className="space-y-4">
                                                {passage.questions.map((question, qIndex) => (
                                                  <QuestionBuilder
                                                    key={question.id}
                                                    question={question}
                                                    questionTypes={READING_QUESTION_TYPES}
                                                    onChange={(updates) => updateQuestion(pIndex, qIndex, updates as Partial<ReadingQuestion>)}
                                                    onRemove={() => removeQuestion(pIndex, qIndex)}
                                                  />
                                                ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ListeningTestBuilder({ 
  data, 
  onChange,
  onTitleSuggested
}: { 
  data: Partial<ListeningTest>; 
  onChange: (data: Partial<ListeningTest>) => void;
  onTitleSuggested?: (title: string) => void;
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  // Per-section error map: sectionNumber → error message
  const [sectionErrors, setSectionErrors] = useState<Record<number, string>>({});

  const handleGenerateAudio = async () => {
    const sectionsWithTranscript = data.sections?.filter(s => s.transcript?.trim()) || [];
    if (sectionsWithTranscript.length === 0) {
      setAudioError('No transcript available. Please add section transcripts first.');
      return;
    }

    // Check individual section lengths (OpenAI TTS hard limit is 4096 chars per request)
    const tooLong = sectionsWithTranscript.filter(s => (s.transcript?.length ?? 0) > 4000);
    if (tooLong.length > 0) {
      setAudioError(
        `Section(s) ${tooLong.map(s => s.sectionNumber).join(', ')} transcript exceeds 4000 chars ` +
        `(${tooLong.map(s => s.transcript!.length).join(', ')} chars). Please shorten them.`
      );
      return;
    }

    setIsGeneratingAudio(true);
    setAudioError(null);
    setSectionErrors({});

    const updatedSections = (data.sections || []).map(s => ({ ...s }));
    const failedSections: number[] = [];

    // Process every section independently — one failure does not abort the others
    for (let i = 0; i < sectionsWithTranscript.length; i++) {
      const section = sectionsWithTranscript[i];
      const text = section.transcript!.trim();

      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voice: 'alloy', provider: 'openai' }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.details || errorData.error || 'TTS failed');
        }

        const result = await response.json();
        const idx = updatedSections.findIndex(s => s.id === section.id);
        if (idx !== -1) {
          if (result.audioUrl) {
            updatedSections[idx].sectionAudioUrl = result.audioUrl;
          } else if (result.audioContent) {
            const blob = new Blob(
              [Uint8Array.from(atob(result.audioContent), c => c.charCodeAt(0))],
              { type: 'audio/mpeg' }
            );
            updatedSections[idx].sectionAudioUrl = URL.createObjectURL(blob);
          }
        }
        // Clear any previous error for this section on success
        setSectionErrors(prev => { const s = { ...prev }; delete s[section.sectionNumber]; return s; });
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'TTS failed';
        console.error(`TTS Error Section ${section.sectionNumber}:`, err);
        failedSections.push(section.sectionNumber);
        setSectionErrors(prev => ({ ...prev, [section.sectionNumber]: msg }));
      }
    }

    // Update form data with whatever succeeded
    onChange({
      ...data,
      audioUrl: data.audioUrl || '',
      audioDuration: sectionsWithTranscript.reduce((sum, s) => sum + Math.ceil((s.transcript?.length ?? 0) / 15), 0),
      sections: updatedSections,
    });

    if (failedSections.length > 0) {
      setAudioError(`Section(s) ${failedSections.join(', ')} failed. Click Generate Audio again to retry them.`);
    }

    setIsGeneratingAudio(false);
  };

  const handleAIGenerated = (content: unknown, topic?: string) => {
    if (topic && onTitleSuggested && !data.sections?.length) {
      onTitleSuggested(`Listening Test: ${topic}`);
    }
    const aiContent = content as { transcript: string; sections: Array<{ sectionNumber: number; title: string; questions: Array<{ type: string; questionText: string; options?: string[]; correctAnswer: string; acceptedAnswers?: string[] }> }> };
    
    const newSections: ListeningSection[] = aiContent.sections.map((s, sIndex) => {
      const existingQCount = data.sections?.flatMap(sec => sec.questions).length || 0;
      return {
        id: `section-${Date.now()}-${sIndex}`,
        sectionNumber: (data.sections?.length || 0) + sIndex + 1,
        title: s.title,
        audioStartTime: 0,
        audioEndTime: 0,
        transcript: aiContent.transcript,
        questions: s.questions.map((q, qIndex) => ({
          id: `q-${Date.now()}-${sIndex}-${qIndex}`,
          questionNumber: existingQCount + qIndex + 1,
          type: q.type as ListeningQuestionType,
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          acceptedAnswers: q.acceptedAnswers
        })),
        questionRange: { start: 1, end: s.questions.length }
      };
    });

    const sections = [...(data.sections || []), ...newSections];
    let qNum = 1;
    sections.forEach(s => {
      const startNum = qNum;
      s.questions.forEach(q => {
        q.questionNumber = qNum++;
      });
      s.questionRange = { start: startNum, end: qNum - 1 };
    });

    onChange({ ...data, sections });
    setActiveSection(sections.length - 1);
  };

  const addSection = () => {
    const newSection: ListeningSection = {
      id: `section-${Date.now()}`,
      sectionNumber: (data.sections?.length || 0) + 1,
      title: `Section ${(data.sections?.length || 0) + 1}`,
      audioStartTime: 0,
      audioEndTime: 0,
      questions: [],
      questionRange: { start: 1, end: 0 }
    };
    onChange({
      ...data,
      sections: [...(data.sections || []), newSection]
    });
    setActiveSection((data.sections?.length || 0));
  };

  const updateSection = (index: number, updates: Partial<ListeningSection>) => {
    const sections = [...(data.sections || [])];
    sections[index] = { ...sections[index], ...updates };
    onChange({ ...data, sections });
  };

  const removeSection = (index: number) => {
    const sections = [...(data.sections || [])];
    sections.splice(index, 1);
    sections.forEach((s, i) => s.sectionNumber = i + 1);
    onChange({ ...data, sections });
    if (activeSection >= sections.length) {
      setActiveSection(Math.max(0, sections.length - 1));
    }
  };

  const addQuestion = (sectionIndex: number) => {
    const sections = [...(data.sections || [])];
    const section = sections[sectionIndex];
    const allQuestions = sections.flatMap(s => s.questions);
    const nextNumber = allQuestions.length + 1;
    
    const newQuestion: ListeningQuestion = {
      id: `q-${Date.now()}`,
      questionNumber: nextNumber,
      type: 'fill-blank',
      questionText: '',
      correctAnswer: ''
    };
    
    section.questions = [...section.questions, newQuestion];
    section.questionRange = {
      start: section.questions[0]?.questionNumber || nextNumber,
      end: nextNumber
    };
    
    onChange({ ...data, sections });
  };

  const updateQuestion = (sectionIndex: number, questionIndex: number, updates: Partial<ListeningQuestion>) => {
    const sections = [...(data.sections || [])];
    const questions = [...sections[sectionIndex].questions];
    questions[questionIndex] = { ...questions[questionIndex], ...updates };
    sections[sectionIndex].questions = questions;
    onChange({ ...data, sections });
  };

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const sections = [...(data.sections || [])];
    sections[sectionIndex].questions.splice(questionIndex, 1);
    let qNum = 1;
    sections.forEach(s => {
      s.questions.forEach(q => {
        q.questionNumber = qNum++;
      });
      if (s.questions.length > 0) {
        s.questionRange = {
          start: s.questions[0].questionNumber,
          end: s.questions[s.questions.length - 1].questionNumber
        };
      }
    });
    onChange({ ...data, sections });
  };

  return (
    <div className="space-y-4">
      <AIContentGenerator
        moduleType="listening"
        onGenerated={handleAIGenerated}
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Label>Audio URL</Label>
          <div className="flex gap-2">
            <Input
              value={data.audioUrl || ''}
              onChange={(e) => onChange({ ...data, audioUrl: e.target.value })}
              placeholder="https://example.com/audio.mp3"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateAudio}
              disabled={isGeneratingAudio || !data.sections?.some(s => s.transcript)}
              className="gap-1"
            >
              {isGeneratingAudio ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
              {isGeneratingAudio ? 'Generating...' : 'Generate Audio'}
            </Button>
          </div>
          {audioError && (
            <p className="text-red-500 text-sm mt-1">{audioError}</p>
          )}
          {(() => {
            const sections = data.sections?.filter(s => s.transcript?.trim()) || [];
            if (sections.length === 0) return null;
            const overLimit = sections.filter(s => (s.transcript?.length ?? 0) > 4000);
            const allHaveAudio = sections.length > 0 && sections.every(s => s.sectionAudioUrl);
            return (
              <div className="mt-1 space-y-0.5">
                {sections.map(s => {
                  const len = s.transcript?.length ?? 0;
                  const over = len > 4000;
                  const err = sectionErrors[s.sectionNumber];
                  return (
                    <p key={s.id} className={`text-xs ${over ? 'text-red-500 font-semibold' : err ? 'text-red-500' : s.sectionAudioUrl ? 'text-emerald-600' : 'text-slate-400'}`}>
                      Section {s.sectionNumber}: {len.toLocaleString()} / 4 000 chars
                      {err ? ` ✗ ${err}` : s.sectionAudioUrl ? ' ✓ audio ready' : over ? ' — too long!' : ''}
                    </p>
                  );
                })}
                {overLimit.length > 0 && (
                  <p className="text-xs text-red-500 font-semibold">⚠ Shorten sections above 4000 chars before generating audio</p>
                )}
                {allHaveAudio && overLimit.length === 0 && (
                  <p className="text-xs text-emerald-600 font-medium">All sections have audio — ready to save!</p>
                )}
              </div>
            );
          })()}
          {data.audioUrl && (
            <div className="mt-2">
              <audio controls src={data.audioUrl} className="w-full h-8" />
            </div>
          )}
        </div>
        <div>
          <Label>Transfer Time (seconds)</Label>
          <Input
            type="number"
            value={data.transferTime || 600}
            onChange={(e) => onChange({ ...data, transferTime: parseInt(e.target.value) || 600 })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Audio Duration (seconds)</Label>
          <Input
            type="number"
            value={data.audioDuration || 0}
            onChange={(e) => onChange({ ...data, audioDuration: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div>
        <Label>Instructions</Label>
        <Textarea
          value={data.instructions || ''}
          onChange={(e) => onChange({ ...data, instructions: e.target.value })}
          placeholder="Enter test instructions..."
          rows={2}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Sections ({data.sections?.length || 0})</CardTitle>
            <Button onClick={addSection} size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {(data.sections?.length || 0) === 0 ? (
            <p className="text-gray-500 text-center py-4">No sections yet. Click "Add Section" to start.</p>
          ) : (
            <Tabs value={String(activeSection)} onValueChange={(v) => setActiveSection(parseInt(v))}>
              <TabsList>
                {data.sections?.map((_, i) => (
                  <TabsTrigger key={i} value={String(i)}>
                    Section {i + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {data.sections?.map((section, sIndex) => (
                <TabsContent key={sIndex} value={String(sIndex)} className="space-y-4">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSection(sIndex)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove Section
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(sIndex, { title: e.target.value })}
                        placeholder="e.g., Conversation about booking"
                      />
                    </div>
                    <div>
                      <Label>Audio Start Time (sec)</Label>
                      <Input
                        type="number"
                        value={section.audioStartTime}
                        onChange={(e) => updateSection(sIndex, { audioStartTime: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label>Audio End Time (sec)</Label>
                      <Input
                        type="number"
                        value={section.audioEndTime}
                        onChange={(e) => updateSection(sIndex, { audioEndTime: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={section.description || ''}
                      onChange={(e) => updateSection(sIndex, { description: e.target.value })}
                      placeholder="Brief description of the audio context..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Transcript (for TTS audio generation)</Label>
                    <Textarea
                      value={section.transcript || ''}
                      onChange={(e) => updateSection(sIndex, { transcript: e.target.value })}
                      placeholder="Enter the audio transcript for this section. This will be used to generate audio using Text-to-Speech..."
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Add transcript text here, then use "Generate Audio" button above to create audio from all section transcripts.
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Questions ({section.questions.length})</h4>
                      <Button onClick={() => addQuestion(sIndex)} size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Question
                      </Button>
                    </div>

                    {section.questions.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No questions yet.</p>
                    ) : (
                      <div className="space-y-4">
                                                {section.questions.map((question, qIndex) => (
                                                  <QuestionBuilder
                                                    key={question.id}
                                                    question={question}
                                                    questionTypes={LISTENING_QUESTION_TYPES}
                                                    onChange={(updates) => updateQuestion(sIndex, qIndex, updates as Partial<ListeningQuestion>)}
                                                    onRemove={() => removeQuestion(sIndex, qIndex)}
                                                    showWordLimit
                                                  />
                                                ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function WritingTestBuilder({ 
  data, 
  onChange,
  onTitleSuggested
}: { 
  data: Partial<WritingTest>; 
  onChange: (data: Partial<WritingTest>) => void;
  onTitleSuggested?: (title: string) => void;
}) {
  const handleAIGenerated = (content: unknown, topic?: string) => {
    if (topic && onTitleSuggested && !data.tasks?.length) {
      onTitleSuggested(`Writing Test: ${topic}`);
    }
    const aiContent = content as {
      task1: {
        title: string;
        prompt: string;
        chartData?: import('@/types').WritingChartData;
        tableData?: import('@/types').WritingTableData;
        processData?: import('@/types').WritingProcessData;
        mapData?: import('@/types').WritingMapData;
        sampleAnswer?: string;
        tips?: string[];
      };
      task2: { title: string; prompt: string; sampleAnswer?: string; tips?: string[] };
    };

    const task1Visuals = extractTask1Visuals(aiContent.task1) || {};

    const newTasks: [WritingTask, WritingTask] = [
      {
        id: `task-1-${Date.now()}`,
        taskNumber: 1,
        taskType: 'task1',
        title: aiContent.task1.title || 'Task 1',
        prompt: aiContent.task1.prompt,
        chartData: task1Visuals.chartData,
        tableData: task1Visuals.tableData,
        processData: task1Visuals.processData,
        mapData: task1Visuals.mapData,
        minWords: 150,
        recommendedTime: 20,
        tips: aiContent.task1.tips,
        sampleAnswer: aiContent.task1.sampleAnswer
      },
      {
        id: `task-2-${Date.now()}`,
        taskNumber: 2,
        taskType: 'task2',
        title: aiContent.task2.title || 'Task 2',
        prompt: aiContent.task2.prompt,
        minWords: 250,
        recommendedTime: 40,
        tips: aiContent.task2.tips,
        sampleAnswer: aiContent.task2.sampleAnswer
      }
    ];

    onChange({ ...data, tasks: newTasks });
  };

  const updateTask = (taskIndex: number, updates: Partial<WritingTask>) => {
    const tasks = [...(data.tasks || [getDefaultWritingTask(1), getDefaultWritingTask(2)])];
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    onChange({ ...data, tasks: tasks as [WritingTask, WritingTask] });
  };

  // State for visual-only generation
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
  const [visualTopicOverride, setVisualTopicOverride] = useState('');
  const [visualGenError, setVisualGenError] = useState<string | null>(null);

  // Strip HTML tags to get plain text context from the existing prompt
  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  const handleGenerateVisualOnly = async (contextText: string) => {
    if (!contextText.trim()) return;
    setIsGeneratingVisual(true);
    setVisualGenError(null);
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleType: 'writing',
          topic: contextText.substring(0, 400), // use prompt text as rich context
          testType: data.testType || 'academic',
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          typeof result?.error === 'string'
            ? result.error
            : typeof result?.details === 'string'
              ? result.details
              : `Request failed (${response.status})`
        );
      }
      if (!result.success) throw new Error(result.error || 'AI generation failed');
      const task1 = result.content?.task1;
      if (!task1) throw new Error('No task1 content in AI response');
      const patch = extractTask1Visuals(task1);
      if (!patch) {
        throw new Error(
          'AI did not return a usable Task 1 visual. Try again, or paste JSON under "Edit visual data".'
        );
      }
      updateTask(0, {
        chartData: undefined,
        tableData: undefined,
        processData: undefined,
        mapData: undefined,
        ...patch,
      });
      setVisualTopicOverride('');
    } catch (err) {
      setVisualGenError(err instanceof Error ? err.message : 'Failed to generate visual');
    } finally {
      setIsGeneratingVisual(false);
    }
  };

  return (
    <div className="space-y-4">
      <AIContentGenerator
        moduleType="writing"
        testType={data.testType || 'academic'}
        onGenerated={handleAIGenerated}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Test Type</Label>
          <Select
            value={data.testType || 'academic'}
            onValueChange={(value) => onChange({ ...data, testType: value as 'academic' | 'general' })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="general">General Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Time Limit (seconds)</Label>
          <Input
            type="number"
            value={data.timeLimit || 3600}
            onChange={(e) => onChange({ ...data, timeLimit: parseInt(e.target.value) || 3600 })}
          />
        </div>
      </div>

      <div>
        <Label>Instructions</Label>
        <Textarea
          value={data.instructions || ''}
          onChange={(e) => onChange({ ...data, instructions: e.target.value })}
          placeholder="Enter test instructions..."
          rows={2}
        />
      </div>

      <Tabs defaultValue="task1">
        <TabsList>
          <TabsTrigger value="task1">Task 1</TabsTrigger>
          <TabsTrigger value="task2">Task 2</TabsTrigger>
        </TabsList>

        {[0, 1].map((taskIndex) => {
          const task = data.tasks?.[taskIndex] || getDefaultWritingTask((taskIndex + 1) as 1 | 2);
          const hasStructuredVisual = !!(
            task.chartData ||
            task.tableData ||
            task.processData ||
            task.mapData
          );
          const hasImageUrl = !!(typeof task.imageUrl === 'string' && task.imageUrl.trim());
          const hasTask1Visual = hasStructuredVisual || hasImageUrl;

          const starterTableData: WritingTableData = {
            type: 'table',
            title: 'Employment status (example — edit or replace)',
            headers: ['Category', '2019', '2023'],
            rows: [
              ['Full-time employed', '62%', '58%'],
              ['Part-time employed', '22%', '25%'],
              ['Self-employed', '16%', '17%'],
            ],
          };

          return (
            <TabsContent key={taskIndex} value={`task${taskIndex + 1}`} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Task {taskIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Task Title</Label>
                    <Input
                      value={task.title}
                      onChange={(e) => updateTask(taskIndex, { title: e.target.value })}
                      placeholder={taskIndex === 0 ? "Task 1: Report Writing" : "Task 2: Essay Writing"}
                    />
                  </div>

                  <div>
                    <Label>Prompt / Question *</Label>
                    <Textarea
                      value={task.prompt}
                      onChange={(e) => updateTask(taskIndex, { prompt: e.target.value })}
                      placeholder={taskIndex === 0 
                        ? "The chart below shows... Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
                        : "Some people believe that... To what extent do you agree or disagree?"
                      }
                      rows={6}
                    />
                  </div>

                  {/* Task 1 Visual section */}
                  {taskIndex === 0 && (
                    <div className="space-y-3">
                      <Label className="font-semibold">Task 1 Visual</Label>
                      <p className="text-xs text-slate-500">
                        Academic Task 1 needs a chart, table, diagram, map, or image. Without it, the admin list shows &quot;Missing Task 1 Visual&quot;.
                      </p>

                      {hasTask1Visual ? (
                        <div className="space-y-3">
                          <WritingTask1Renderer task={task} compact />
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-emerald-100 text-emerald-700 font-bold">
                              ✓ Visual set
                            </Badge>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-rose-500 hover:text-rose-700 text-xs"
                              onClick={() =>
                                updateTask(taskIndex, {
                                  chartData: undefined,
                                  tableData: undefined,
                                  processData: undefined,
                                  mapData: undefined,
                                  imageUrl: undefined,
                                })
                              }
                            >
                              Remove all visuals
                            </Button>
                          </div>
                          {hasImageUrl && !hasStructuredVisual && (
                            <div>
                              <Label className="text-xs text-slate-500">Image URL</Label>
                              <Input
                                value={task.imageUrl || ''}
                                onChange={(e) => updateTask(taskIndex, { imageUrl: e.target.value })}
                                placeholder="https://..."
                                className="mt-1"
                              />
                            </div>
                          )}
                          {hasStructuredVisual && (
                            <details>
                              <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 select-none">
                                Edit visual data (JSON)
                              </summary>
                              <Textarea
                                className="mt-2 font-mono text-xs"
                                rows={10}
                                value={JSON.stringify(
                                  task.chartData || task.tableData || task.processData || task.mapData,
                                  null,
                                  2
                                )}
                                onChange={(e) => {
                                  try {
                                    const parsed = JSON.parse(e.target.value);
                                    const t = parsed?.type;
                                    if (t === 'line' || t === 'bar' || t === 'pie') {
                                      updateTask(taskIndex, {
                                        chartData: parsed,
                                        tableData: undefined,
                                        processData: undefined,
                                        mapData: undefined,
                                      });
                                    } else if (t === 'table') {
                                      updateTask(taskIndex, {
                                        tableData: parsed,
                                        chartData: undefined,
                                        processData: undefined,
                                        mapData: undefined,
                                      });
                                    } else if (t === 'process') {
                                      updateTask(taskIndex, {
                                        processData: parsed,
                                        chartData: undefined,
                                        tableData: undefined,
                                        mapData: undefined,
                                      });
                                    } else if (t === 'map') {
                                      updateTask(taskIndex, {
                                        mapData: parsed,
                                        chartData: undefined,
                                        tableData: undefined,
                                        processData: undefined,
                                      });
                                    }
                                  } catch {
                                    // ignore parse errors while typing
                                  }
                                }}
                              />
                            </details>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-indigo-500" />
                              <span className="text-sm font-semibold text-indigo-700">Generate Visual with AI</span>
                            </div>

                            {task.prompt ? (
                              <>
                                <div className="bg-white border border-indigo-100 rounded-lg px-3 py-2 text-xs text-slate-600 line-clamp-3">
                                  <span className="font-semibold text-indigo-600">Context detected: </span>
                                  {stripHtml(task.prompt).substring(0, 160)}...
                                </div>
                                <p className="text-xs text-slate-500">AI will read the existing prompt and auto-select the most appropriate visual (chart, table, process, or map).</p>
                                <Button
                                  type="button"
                                  onClick={() => handleGenerateVisualOnly(stripHtml(task.prompt))}
                                  disabled={isGeneratingVisual}
                                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                                  size="sm"
                                >
                                  {isGeneratingVisual ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Sparkles className="h-4 w-4" />
                                  )}
                                  {isGeneratingVisual ? 'Generating Visual...' : '✨ Generate Visual from Prompt'}
                                </Button>
                              </>
                            ) : (
                              <>
                                <p className="text-xs text-slate-500">Enter a topic and AI will auto-select the best visual type.</p>
                                <div className="flex gap-2">
                                  <Input
                                    value={visualTopicOverride}
                                    onChange={(e) => setVisualTopicOverride(e.target.value)}
                                    placeholder="e.g. Work and Employment, Climate Change..."
                                    className="flex-1 text-sm bg-white"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleGenerateVisualOnly(visualTopicOverride);
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    onClick={() => handleGenerateVisualOnly(visualTopicOverride)}
                                    disabled={isGeneratingVisual || !visualTopicOverride.trim()}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 shrink-0"
                                    size="sm"
                                  >
                                    {isGeneratingVisual ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Sparkles className="h-4 w-4" />
                                    )}
                                    {isGeneratingVisual ? 'Generating...' : 'Generate'}
                                  </Button>
                                </div>
                              </>
                            )}

                            {visualGenError && (
                              <p className="text-xs text-rose-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {visualGenError}
                              </p>
                            )}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                            onClick={() =>
                              updateTask(0, {
                                tableData: starterTableData,
                                chartData: undefined,
                                processData: undefined,
                                mapData: undefined,
                              })
                            }
                          >
                            Add sample table (edit numbers in JSON after)
                          </Button>

                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-px bg-slate-200" />
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-slate-200" />
                          </div>

                          <div>
                            <Label className="text-xs text-slate-500">Image URL (chart/graph photo)</Label>
                            <Input
                              value={task.imageUrl || ''}
                              onChange={(e) => updateTask(taskIndex, { imageUrl: e.target.value })}
                              placeholder="https://example.com/chart.png"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Minimum Words</Label>
                      <Input
                        type="number"
                        value={task.minWords}
                        onChange={(e) => updateTask(taskIndex, { minWords: parseInt(e.target.value) || 150 })}
                      />
                    </div>
                    <div>
                      <Label>Recommended Time (minutes)</Label>
                      <Input
                        type="number"
                        value={task.recommendedTime}
                        onChange={(e) => updateTask(taskIndex, { recommendedTime: parseInt(e.target.value) || 20 })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Sample Answer (optional, shown after submission)</Label>
                    <Textarea
                      value={task.sampleAnswer || ''}
                      onChange={(e) => updateTask(taskIndex, { sampleAnswer: e.target.value })}
                      placeholder="Enter a sample answer..."
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

function SpeakingTestBuilder({ 
  data, 
  onChange,
  onTitleSuggested
}: { 
  data: Partial<SpeakingTest>; 
  onChange: (data: Partial<SpeakingTest>) => void;
  onTitleSuggested?: (title: string) => void;
}) {
  const handleAIGenerated = (content: unknown, topic?: string) => {
    if (topic && onTitleSuggested && !data.parts?.length) {
      onTitleSuggested(`Speaking Test: ${topic}`);
    }
    const aiContent = content as { 
      part1: { questions: Array<{ text: string; thinkTime: number; recordTime: number }> };
      part2: { topic: string; bulletPoints: string[]; prepTime: number; recordTime: number };
      part3: { questions: Array<{ text: string; thinkTime: number; recordTime: number }> };
    };
    
    const newParts: [SpeakingPart, SpeakingPart, SpeakingPart] = [
      {
        id: `part-1-${Date.now()}`,
        partNumber: 1,
        partType: 'part1',
        title: 'Part 1: Introduction & Interview',
        instructions: 'The examiner will ask you general questions about yourself and familiar topics.',
        questions: aiContent.part1.questions.map((q, i) => ({
          id: `sq-1-${Date.now()}-${i}`,
          questionNumber: i + 1,
          text: q.text,
          thinkTime: q.thinkTime || 3,
          recordTime: q.recordTime || 30
        }))
      },
      {
        id: `part-2-${Date.now()}`,
        partNumber: 2,
        partType: 'part2',
        title: 'Part 2: Individual Long Turn',
        instructions: 'You will be given a topic card. You have 1 minute to prepare and 2 minutes to speak.',
        cueCard: {
          id: `cue-${Date.now()}`,
          topic: aiContent.part2.topic,
          bulletPoints: aiContent.part2.bulletPoints,
          prepTime: aiContent.part2.prepTime || 60,
          recordTime: aiContent.part2.recordTime || 120
        }
      },
      {
        id: `part-3-${Date.now()}`,
        partNumber: 3,
        partType: 'part3',
        title: 'Part 3: Two-way Discussion',
        instructions: 'The examiner will ask you more abstract questions related to the Part 2 topic.',
        questions: aiContent.part3.questions.map((q, i) => ({
          id: `sq-3-${Date.now()}-${i}`,
          questionNumber: i + 1,
          text: q.text,
          thinkTime: q.thinkTime || 5,
          recordTime: q.recordTime || 45
        }))
      }
    ];

    onChange({ ...data, parts: newParts });
  };

  const addQuestion = (partIndex: number) => {
    const parts = [...(data.parts || [])];
    const part = parts[partIndex];
    const newQuestion: SpeakingQuestion = {
      id: `sq-${Date.now()}`,
      questionNumber: (part.questions?.length || 0) + 1,
      text: '',
      thinkTime: partIndex === 0 ? 3 : 5,
      recordTime: partIndex === 0 ? 30 : 45
    };
    part.questions = [...(part.questions || []), newQuestion];
    onChange({ ...data, parts: parts as [SpeakingPart, SpeakingPart, SpeakingPart] });
  };

  const updateQuestion = (partIndex: number, questionIndex: number, updates: Partial<SpeakingQuestion>) => {
    const parts = [...(data.parts || [])];
    const questions = [...(parts[partIndex].questions || [])];
    questions[questionIndex] = { ...questions[questionIndex], ...updates };
    parts[partIndex].questions = questions;
    onChange({ ...data, parts: parts as [SpeakingPart, SpeakingPart, SpeakingPart] });
  };

  const removeQuestion = (partIndex: number, questionIndex: number) => {
    const parts = [...(data.parts || [])];
    parts[partIndex].questions?.splice(questionIndex, 1);
    parts[partIndex].questions?.forEach((q, i) => q.questionNumber = i + 1);
    onChange({ ...data, parts: parts as [SpeakingPart, SpeakingPart, SpeakingPart] });
  };

  const updateCueCard = (updates: Partial<SpeakingCueCard>) => {
    const parts = [...(data.parts || [])];
    parts[1].cueCard = { ...parts[1].cueCard!, ...updates };
    onChange({ ...data, parts: parts as [SpeakingPart, SpeakingPart, SpeakingPart] });
  };

  return (
    <div className="space-y-4">
      <AIContentGenerator
        moduleType="speaking"
        onGenerated={handleAIGenerated}
      />

      <div>
        <Label>Instructions</Label>
        <Textarea
          value={data.instructions || ''}
          onChange={(e) => onChange({ ...data, instructions: e.target.value })}
          placeholder="Enter test instructions..."
          rows={2}
        />
      </div>

      <Tabs defaultValue="part1">
        <TabsList>
          <TabsTrigger value="part1">Part 1: Interview</TabsTrigger>
          <TabsTrigger value="part2">Part 2: Cue Card</TabsTrigger>
          <TabsTrigger value="part3">Part 3: Discussion</TabsTrigger>
        </TabsList>

        <TabsContent value="part1" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Part 1: Introduction & Interview</CardTitle>
                  <CardDescription>General questions about familiar topics (4-5 minutes)</CardDescription>
                </div>
                <Button onClick={() => addQuestion(0)} size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(data.parts?.[0]?.questions?.length || 0) === 0 ? (
                <p className="text-gray-500 text-center py-4">No questions yet. Add questions for Part 1.</p>
              ) : (
                data.parts?.[0]?.questions?.map((question, qIndex) => (
                  <div key={question.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge>Q{question.questionNumber}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(0, qIndex)}
                        className="text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Question Text</Label>
                      <Input
                        value={question.text}
                        onChange={(e) => updateQuestion(0, qIndex, { text: e.target.value })}
                        placeholder="e.g., What do you do for a living?"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Think Time (seconds)</Label>
                        <Input
                          type="number"
                          value={question.thinkTime}
                          onChange={(e) => updateQuestion(0, qIndex, { thinkTime: parseInt(e.target.value) || 3 })}
                        />
                      </div>
                      <div>
                        <Label>Record Time (seconds)</Label>
                        <Input
                          type="number"
                          value={question.recordTime}
                          onChange={(e) => updateQuestion(0, qIndex, { recordTime: parseInt(e.target.value) || 30 })}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="part2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Part 2: Individual Long Turn (Cue Card)</CardTitle>
              <CardDescription>1 minute preparation, 1-2 minutes speaking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Topic *</Label>
                <Input
                  value={data.parts?.[1]?.cueCard?.topic || ''}
                  onChange={(e) => updateCueCard({ topic: e.target.value })}
                  placeholder="e.g., Describe a book you have recently read"
                />
              </div>

              <div>
                <Label>Bullet Points (things to cover)</Label>
                {[0, 1, 2, 3].map((i) => (
                  <Input
                    key={i}
                    className="mt-2"
                    value={data.parts?.[1]?.cueCard?.bulletPoints?.[i] || ''}
                    onChange={(e) => {
                      const bulletPoints = [...(data.parts?.[1]?.cueCard?.bulletPoints || ['', '', '', ''])];
                      bulletPoints[i] = e.target.value;
                      updateCueCard({ bulletPoints });
                    }}
                    placeholder={`Point ${i + 1}: e.g., ${['what the book was about', 'when you read it', 'why you chose it', 'how you felt about it'][i]}`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Preparation Time (seconds)</Label>
                  <Input
                    type="number"
                    value={data.parts?.[1]?.cueCard?.prepTime || 60}
                    onChange={(e) => updateCueCard({ prepTime: parseInt(e.target.value) || 60 })}
                  />
                </div>
                <div>
                  <Label>Record Time (seconds)</Label>
                  <Input
                    type="number"
                    value={data.parts?.[1]?.cueCard?.recordTime || 120}
                    onChange={(e) => updateCueCard({ recordTime: parseInt(e.target.value) || 120 })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="part3" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Part 3: Two-way Discussion</CardTitle>
                  <CardDescription>Abstract questions related to Part 2 topic (4-5 minutes)</CardDescription>
                </div>
                <Button onClick={() => addQuestion(2)} size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(data.parts?.[2]?.questions?.length || 0) === 0 ? (
                <p className="text-gray-500 text-center py-4">No questions yet. Add questions for Part 3.</p>
              ) : (
                data.parts?.[2]?.questions?.map((question, qIndex) => (
                  <div key={question.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge>Q{question.questionNumber}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(2, qIndex)}
                        className="text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Question Text</Label>
                      <Input
                        value={question.text}
                        onChange={(e) => updateQuestion(2, qIndex, { text: e.target.value })}
                        placeholder="e.g., Do you think reading habits have changed over time?"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Think Time (seconds)</Label>
                        <Input
                          type="number"
                          value={question.thinkTime}
                          onChange={(e) => updateQuestion(2, qIndex, { thinkTime: parseInt(e.target.value) || 5 })}
                        />
                      </div>
                      <div>
                        <Label>Record Time (seconds)</Label>
                        <Input
                          type="number"
                          value={question.recordTime}
                          onChange={(e) => updateQuestion(2, qIndex, { recordTime: parseInt(e.target.value) || 45 })}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function QuestionBuilder({
  question,
  questionTypes,
  onChange,
  onRemove,
  showWordLimit = false
}: {
  question: ReadingQuestion | ListeningQuestion;
  questionTypes: { value: string; label: string }[];
  onChange: (updates: Partial<ReadingQuestion | ListeningQuestion>) => void;
  onRemove: () => void;
  showWordLimit?: boolean;
}) {
  const needsOptions = ['mcq', 'true-false-not-given', 'yes-no-not-given', 'matching-headings', 'matching-information', 'matching-features', 'matching'].includes(question.type);

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-400" />
          <Badge variant="outline">Q{question.questionNumber}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Question Type</Label>
          <Select
            value={question.type}
            onValueChange={(value) => {
              const updates: Partial<ReadingQuestion | ListeningQuestion> = { type: value as ReadingQuestionType };
              if (['true-false-not-given'].includes(value)) {
                updates.options = ['TRUE', 'FALSE', 'NOT GIVEN'];
              } else if (['yes-no-not-given'].includes(value)) {
                updates.options = ['YES', 'NO', 'NOT GIVEN'];
              } else if (value === 'mcq' && (!question.options || question.options.length === 0)) {
                updates.options = ['', '', '', ''];
              }
              onChange(updates);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {questionTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {showWordLimit && (
          <div>
            <Label>Word Limit</Label>
            <Input
              type="number"
              value={(question as ListeningQuestion).wordLimit || ''}
              onChange={(e) => onChange({ wordLimit: parseInt(e.target.value) || undefined } as Partial<ListeningQuestion>)}
              placeholder="e.g., 2 for 'NO MORE THAN TWO WORDS'"
            />
          </div>
        )}
      </div>

      <div>
        <Label>Question Text *</Label>
        <Textarea
          value={question.questionText}
          onChange={(e) => onChange({ questionText: e.target.value })}
          placeholder="Enter the question..."
          rows={2}
        />
      </div>

      {needsOptions && (
        <div>
          <Label>Options</Label>
          {(question.options || []).map((option, i) => (
            <div key={i} className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-500 w-6">{String.fromCharCode(65 + i)}.</span>
              <Input
                value={option}
                onChange={(e) => {
                  const options = [...(question.options || [])];
                  options[i] = e.target.value;
                  onChange({ options });
                }}
                placeholder={`Option ${String.fromCharCode(65 + i)}`}
              />
              {question.type === 'mcq' && i >= 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const options = [...(question.options || [])];
                    options.splice(i, 1);
                    onChange({ options });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {question.type === 'mcq' && (question.options?.length || 0) < 6 && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                const options = [...(question.options || []), ''];
                onChange({ options });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Option
            </Button>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Correct Answer *</Label>
          <Input
            value={question.correctAnswer}
            onChange={(e) => onChange({ correctAnswer: e.target.value })}
            placeholder="Enter the correct answer"
          />
        </div>
        <div>
          <Label>Accepted Answers (comma-separated)</Label>
          <Input
            value={question.acceptedAnswers?.join(', ') || ''}
            onChange={(e) => onChange({ acceptedAnswers: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
            placeholder="e.g., answer1, answer2"
          />
        </div>
      </div>

      <div>
        <Label>Explanation (optional)</Label>
        <Textarea
          value={question.explanation || ''}
          onChange={(e) => onChange({ explanation: e.target.value })}
          placeholder="Explain why this is the correct answer..."
          rows={2}
        />
      </div>
    </div>
  );
}

function FullTestGeneratorDialog({ open, onOpenChange, onComplete }: { open: boolean, onOpenChange: (open: boolean) => void, onComplete: () => void }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy'|'medium'|'hard'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const generateModule = async (moduleType: string, index?: number) => {
    let label = moduleType;
    if (index) {
      if (moduleType === 'reading') label = `reading (Passage ${index})`;
      else if (moduleType === 'listening') label = `listening (Section ${index})`;
      else if (moduleType === 'writing') label = `writing (Task ${index})`;
      else if (moduleType === 'speaking') label = `speaking (Part ${index})`;
    }
    
    setProgress(`Generating ${label} module... \n(This may take 15-30 seconds)`);
    const response = await fetch('/api/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        moduleType, 
        topic: topic.trim(), 
        difficulty, 
        testType: 'academic', 
        provider: 'openai',
        passageNumber: moduleType === 'reading' ? index : undefined,
        sectionNumber: moduleType === 'listening' ? index : undefined,
        taskNumber: moduleType === 'writing' ? index : undefined,
        partNumber: moduleType === 'speaking' ? index : undefined
      })
    });
    const rawText = await response.text();
    let data;
    try { 
      data = JSON.parse(rawText); 
    } catch (e) { 
      console.error(`Raw response for ${label}:`, rawText);
      if (rawText.includes('<!DOCTYPE html>')) {
        throw new Error(`Server error (504/500) during ${label} generation. This usually means the AI took too long to respond. Try again or use a simpler topic.`);
      }
      throw new Error(`Invalid AI response for ${label}. The AI output was not valid JSON.`); 
    }
    if (!response.ok || !data.success || !data.content) throw new Error(data.error || `Failed to generate ${label}`);
    return data.content;
  };

  const handleGenerate = async () => {
    if (!topic.trim()) { setError('Please enter a topic'); return; }
    setIsGenerating(true); setError('');
    try {
      const now = Date.now();
      // 1. Reading (Generate 3 passages one by one)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const readingPassagesData: any[] = [];
      for (let i = 1; i <= 3; i++) {
        const pData = await generateModule('reading', i);
        readingPassagesData.push(pData);
      }
      
      const totalReadingQuestions = readingPassagesData.reduce((acc, p) => acc + (p.questions?.length || 0), 0);
      
      const readingTest = {
        id: `reading-${now}`, 
        title: `Mock Test: ${topic} - Reading`, 
        testType: 'academic', 
        timeLimit: 3600,
        instructions: 'Read the passages carefully and answer the questions.',
        passages: readingPassagesData.map((p, pIndex) => {
          const startNum = (pIndex === 0 ? 0 : readingPassagesData.slice(0, pIndex).reduce((acc, prevP) => acc + (prevP.questions?.length || 0), 0)) + 1;
          const endNum = startNum + (p.questions?.length || 0) - 1;
          
          return {
            id: `passage-${now}-${pIndex}`,
            passageNumber: p.passageNumber || (pIndex + 1),
            title: p.title || `Passage ${pIndex + 1}`,
            textContent: p.textContent || p.content || '', 
            questions: (p.questions || []).map((q: any, qIndex: number) => ({
              id: `q-${now}-${pIndex}-${qIndex}`,
              questionNumber: startNum + qIndex,
              type: q.type,
              questionText: q.questionText,
              options: q.options,
              correctAnswer: q.correctAnswer,
              acceptedAnswers: q.acceptedAnswers,
              explanation: q.explanation
            })),
            questionRange: { start: startNum, end: endNum }
          };
        }),
        totalQuestions: totalReadingQuestions
      };

      // 2. Listening (Generate 4 sections one by one)
      const listeningSectionsData = [];
      for (let i = 1; i <= 4; i++) {
        const sData = await generateModule('listening', i);
        listeningSectionsData.push(sData);
      }
      
      let currentQNum = 1;
      const listeningSections = listeningSectionsData.map((s, sIndex) => {
        const startNum = currentQNum;
        const mappedQuestions = s.questions.map((q: any, qIndex: number) => {
          const num = currentQNum++;
          return {
            id: `lq-${now}-${sIndex}-${qIndex}`, 
            questionNumber: num, 
            type: q.type, 
            questionText: q.questionText,
            options: q.options, 
            correctAnswer: q.correctAnswer, 
            acceptedAnswers: q.acceptedAnswers,
            explanation: q.explanation
          };
        });
        return {
          id: `section-${now}-${sIndex}`, 
          sectionNumber: s.sectionNumber || (sIndex + 1), 
          title: s.title || `Section ${sIndex + 1}`, 
          audioStartTime: 0, 
          audioEndTime: 0,
          transcript: s.transcript || '', 
          questions: mappedQuestions, 
          questionRange: { start: startNum, end: currentQNum - 1 }
        };
      });
      const listeningTest = {
        id: `listening-${now}`, title: `Mock Test: ${topic} - Listening`, totalQuestions: currentQNum - 1,
        audioUrl: '', audioDuration: 0, transferTime: 600, sections: listeningSections, instructions: 'Listen to the audio and answer.'
      };

      // 3. Writing (Generate 2 tasks one by one)
      const writingTasksData = [];
      for (let i = 1; i <= 2; i++) {
        const tData = await generateModule('writing', i);
        writingTasksData.push(tData);
      }
      
      const writingTest = normalizeWritingTestFromDb({
        id: `writing-${now}`,
        title: `Mock Test: ${topic} - Writing`,
        testType: 'academic',
        timeLimit: 3600,
        instructions: 'Complete both writing tasks within the time limit.',
        tasks: writingTasksData.map((t, tIndex) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tr = t as Record<string, any>;
          const base = {
            id: `task-${tIndex + 1}-${now}`,
            taskNumber: tIndex + 1,
            taskType: tIndex === 0 ? ('task1' as const) : ('task2' as const),
            title: tr.title || `Task ${tIndex + 1}`,
            prompt: tr.prompt,
            minWords: tIndex === 0 ? 150 : 250,
            recommendedTime: tIndex === 0 ? 20 : 40,
            sampleAnswer: tr.sampleAnswer,
          };
          if (tIndex === 0) {
            const patch = extractTask1Visuals(tr) || {};
            const imageUrl =
              typeof tr.imageUrl === 'string' && tr.imageUrl.trim()
                ? tr.imageUrl.trim()
                : typeof tr.image_url === 'string' && tr.image_url.trim()
                  ? tr.image_url.trim()
                  : undefined;
            return { ...base, ...patch, ...(imageUrl ? { imageUrl } : {}) };
          }
          return base;
        }),
      });

      // 4. Speaking (Generate 3 parts one by one)
      const speakingPartsData = [];
      for (let i = 1; i <= 3; i++) {
        const spData = await generateModule('speaking', i);
        speakingPartsData.push(spData);
      }

      const speakingTest = {
        id: `speaking-${now}`, title: `Mock Test: ${topic} - Speaking`, instructions: 'Answer the questions naturally.',
        parts: speakingPartsData.map((sp, spIndex) => {
          const pNum = spIndex + 1;
          if (pNum === 1) {
            return {
              id: `part-1-${now}`, 
              partNumber: 1, 
              partType: 'part1', 
              title: sp.title || 'Part 1: Introduction', 
              instructions: sp.instructions || 'General questions.',
              questions: sp.questions?.map((q: any, i: number) => ({ 
                id: `sq-1-${i}`, 
                questionNumber: i + 1, 
                text: q.text, 
                thinkTime: q.thinkTime || 3, 
                recordTime: q.recordTime || 30 
              }))
            };
          } else if (pNum === 2) {
            return {
              id: `part-2-${now}`, 
              partNumber: 2, 
              partType: 'part2', 
              title: sp.title || 'Part 2: Individual Long Turn', 
              instructions: sp.instructions || 'You have 1 minute to prepare.',
              cueCard: { 
                id: `cue-${now}`, 
                topic: sp.cueCard?.topic || sp.topic, 
                bulletPoints: sp.cueCard?.bulletPoints || sp.bulletPoints || [], 
                prepTime: sp.cueCard?.prepTime || 60, 
                recordTime: sp.cueCard?.recordTime || 120 
              } 
            };
          } else {
            return {
              id: `part-3-${now}`, 
              partNumber: 3, 
              partType: 'part3', 
              title: sp.title || 'Part 3: Discussion', 
              instructions: sp.instructions || 'Follow-up questions.',
              questions: sp.questions?.map((q: any, i: number) => ({ 
                id: `sq-3-${i}`, 
                questionNumber: i + 1, 
                text: q.text, 
                thinkTime: q.thinkTime || 5, 
                recordTime: q.recordTime || 60 
              }))
            };
          }
        })
      };

      setProgress('Saving to database...');
      if (!isSupabaseConfigured() || !supabase) throw new Error("Supabase is not configured");
      const insertData = [
        { title: readingTest.title, module_type: 'reading', test_data: jsonbSafe(readingTest), is_published: true, is_premium: false },
        { title: listeningTest.title, module_type: 'listening', test_data: jsonbSafe(listeningTest), is_published: true, is_premium: false },
        { title: writingTest.title, module_type: 'writing', test_data: jsonbSafe(writingTest), is_published: true, is_premium: false },
        { title: speakingTest.title, module_type: 'speaking', test_data: jsonbSafe(speakingTest), is_published: true, is_premium: false }
      ];
      const { error: insertError } = await supabase.from('mock_tests').insert(insertData);
      if (insertError) throw insertError;
      
      setProgress('Done! Refreshing list...');
      setTimeout(() => { onComplete(); onOpenChange(false); setTopic(''); setProgress(''); }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred during generation');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl"><Sparkles className="h-5 w-5 text-indigo-500" /> AI Full Test Generator</DialogTitle>
          <DialogDescription>Generates **Reading, Listening, Writing, and Speaking** completely from scratch on any topic, instantly publishing them together for a full mock test run.</DialogDescription>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          {error && <Alert className="bg-red-50 text-red-800 border-red-200"><AlertCircle className="h-4 w-4 text-red-600"/><AlertDescription>{error}</AlertDescription></Alert>}
          <div>
            <Label className="font-semibold text-slate-800">Test Topic / Theme</Label>
            <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Environment, Space Exploration, Architecture" disabled={isGenerating} className="mt-1.5 focus-visible:ring-indigo-600" />
            <p className="text-[11px] text-slate-500 mt-1">All 4 modules will follow this theme</p>
          </div>
          <div>
            <Label className="font-semibold text-slate-800">Target Difficulty</Label>
            <Select value={difficulty} onValueChange={(val: any) => setDifficulty(val)} disabled={isGenerating}>
              <SelectTrigger className="mt-1.5 focus-visible:ring-indigo-600"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy (Band 4.0 - 5.5)</SelectItem>
                <SelectItem value="medium">Medium (Band 6.0 - 7.5)</SelectItem>
                <SelectItem value="hard">Hard (Band 8.0 - 9.0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {progress && (
            <div className="flex flex-col items-center justify-center p-4 bg-indigo-50/80 border border-indigo-100 text-indigo-700 rounded-xl mt-4">
              {isGenerating && <Loader2 className="h-6 w-6 animate-spin mb-3 text-indigo-600" />}
              <span className="text-sm font-bold text-center whitespace-pre-line leading-relaxed">{progress}</span>
            </div>
          )}
          <Button onClick={handleGenerate} className="w-full h-12 text-base font-bold bg-indigo-600 hover:bg-indigo-700 mt-2" disabled={isGenerating || !topic.trim()}>
            {isGenerating ? 'Please wait...' : 'Generate 4 Modules Instantly'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
