import { useState, useEffect } from 'react';
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
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  Users,
  Target,
  Sparkles,
  Wand2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  topic: string;
  time_limit: number;
  is_published: boolean;
  created_at: string;
}

interface UserProgress {
  user_email: string;
  total_attempts: number;
  avg_score: number;
  last_activity: string;
}

export function ReadingPassageManagement() {
  const [passages, setPassages] = useState<ReadingPassage[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPassage, setEditingPassage] = useState<ReadingPassage | null>(null);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [aiGenerated, setAiGenerated] = useState(false);
  const [aiFullContent, setAiFullContent] = useState<Record<string, unknown> | null>(null);
  const [savingMockTest, setSavingMockTest] = useState(false);
  const [activeTab, setActiveTab] = useState<'passages' | 'progress'>('passages');
  const [aiTopic, setAiTopic] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    difficulty: 'medium',
    topic: '',
    time_limit: 20,
    is_published: false
  });

  useEffect(() => {
    fetchPassages();
    fetchUserProgress();
  }, []);

  const fetchPassages = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reading_passages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPassages(data || []);
    } catch (err) {
      console.error('Error fetching passages:', err);
      setError('Failed to load passages. Make sure you have run the SQL setup.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      const { data, error } = await supabase
        .from('reading_attempts')
        .select(`
          user_id,
          score,
          total_questions,
          completed_at
        `)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      const progressMap = new Map<string, { attempts: number; totalScore: number; lastActivity: string }>();
      
      (data || []).forEach((attempt: { user_id: string; score: number; total_questions: number; completed_at: string }) => {
        const existing = progressMap.get(attempt.user_id) || { attempts: 0, totalScore: 0, lastActivity: '' };
        progressMap.set(attempt.user_id, {
          attempts: existing.attempts + 1,
          totalScore: existing.totalScore + (attempt.score / attempt.total_questions) * 100,
          lastActivity: existing.lastActivity || attempt.completed_at
        });
      });

      const progressList: UserProgress[] = [];
      progressMap.forEach((value, key) => {
        progressList.push({
          user_email: key.substring(0, 8) + '...',
          total_attempts: value.attempts,
          avg_score: Math.round(value.totalScore / value.attempts),
          last_activity: value.lastActivity
        });
      });

      setUserProgress(progressList);
    } catch (err) {
      console.error('Error fetching user progress:', err);
    }
  };

  const handleNewPassage = () => {
    setEditingPassage(null);
    setFormData({
      title: '',
      content: '',
      difficulty: 'medium',
      topic: '',
      time_limit: 20,
      is_published: false
    });
    setError('');
    setSuccess('');
    setAiTopic('');
    setAiGenerated(false);
    setIsEditorOpen(true);
  };

  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) {
      setError('Please enter a topic for AI generation');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleType: 'reading',
          topic: aiTopic,
          difficulty: formData.difficulty,
          testType: 'academic',
          provider: 'openai'
        })
      });

      const responseText = await response.text();
      
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);
      
      if (data.success && data.content?.passage) {
        const passage = data.content.passage;
        // Clean HTML tags from textContent
        const plainText = passage.textContent?.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n\n').trim() || '';
        
        setFormData({
          ...formData,
          title: passage.title || `AI Generated: ${aiTopic}`,
          content: plainText,
          topic: aiTopic
        });
        // Store full content (passage + questions) for mock test saving
        setAiFullContent(data.content);
        setAiGenerated(true);
        setSuccess('✅ Content generated! Save as Practice Passage OR as Mock Test below.');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('AI Generation Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate content. Make sure OPENAI_API_KEY is configured.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveAsMockTest = async () => {
    if (!aiFullContent || !isSupabaseConfigured() || !supabase) return;

    setSavingMockTest(true);
    setError('');

    try {
      const passage = aiFullContent.passage as Record<string, unknown>;
      const questions = aiFullContent.questions as Array<Record<string, unknown>>;

      // Format for mock_tests table (ReadingTest structure)
      const testData = {
        passages: [
          {
            title: formData.title || String(passage?.title || aiTopic),
            textContent: String(passage?.textContent || formData.content || ''),
            paragraphs: Array.isArray(passage?.paragraphs) ? passage.paragraphs : [],
            questions: Array.isArray(questions) ? questions.map((q, i) => ({
              id: `q${i + 1}`,
              type: String(q.type || 'mcq'),
              questionText: String(q.questionText || ''),
              options: Array.isArray(q.options) ? q.options : [],
              correctAnswer: String(q.correctAnswer || ''),
              explanation: String(q.explanation || ''),
              passageRef: String(q.passageRef || '')
            })) : []
          }
        ]
      };

      const { error } = await supabase
        .from('mock_tests')
        .insert({
          title: formData.title || `Reading: ${aiTopic}`,
          module_type: 'reading',
          test_data: testData,
          is_published: true,
          is_premium: false
        });

      if (error) throw error;
      setSuccess('🎉 Saved as Mock Test! Students can now see it on the Mock Tests page.');
      setIsEditorOpen(false);
      setAiFullContent(null);
      setAiGenerated(false);
    } catch (err) {
      console.error('Error saving mock test:', err);
      setError(err instanceof Error ? err.message : 'Failed to save as mock test.');
    } finally {
      setSavingMockTest(false);
    }
  };

  const handleEditPassage = (passage: ReadingPassage) => {
    setEditingPassage(passage);
    setFormData({
      title: passage.title,
      content: passage.content,
      difficulty: passage.difficulty,
      topic: passage.topic,
      time_limit: passage.time_limit,
      is_published: passage.is_published
    });
    setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

  const handleSavePassage = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setError('Supabase not configured');
      return;
    }

    if (!formData.title || !formData.content || !formData.topic) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingPassage) {
        const { error } = await supabase
          .from('reading_passages')
          .update({
            title: formData.title,
            content: formData.content,
            difficulty: formData.difficulty.toLowerCase(),
            topic: formData.topic,
            time_limit: formData.time_limit,
            is_published: formData.is_published,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPassage.id);

        if (error) throw error;
        setSuccess('Passage updated successfully!');
      } else {
        const { error } = await supabase
          .from('reading_passages')
          .insert({
            title: formData.title,
            content: formData.content,
            difficulty: formData.difficulty.toLowerCase(),
            topic: formData.topic,
            time_limit: formData.time_limit,
            is_published: formData.is_published
          });

        if (error) throw error;
        setSuccess('Passage created successfully!');
      }

      fetchPassages();
      setTimeout(() => {
        setIsEditorOpen(false);
        setSuccess('');
      }, 1500);
    } catch (err) {
      console.error('Error saving passage:', err);
      setError('Failed to save passage. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePassage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this passage?')) return;
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      const { error } = await supabase
        .from('reading_passages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Passage deleted successfully!');
      fetchPassages();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting passage:', err);
      setError('Failed to delete passage');
    }
  };

  const handleTogglePublish = async (passage: ReadingPassage) => {
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      const { error } = await supabase
        .from('reading_passages')
        .update({ is_published: !passage.is_published })
        .eq('id', passage.id);

      if (error) throw error;
      fetchPassages();
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Reading Passage Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Supabase is not configured. Please run the SQL setup script in your Supabase dashboard to enable this feature.
              <br /><br />
              <strong>Steps:</strong>
              <ol className="list-decimal ml-4 mt-2">
                <li>Go to Supabase Dashboard → SQL Editor</li>
                <li>Copy the contents of <code>supabase_tables.sql</code></li>
                <li>Run the SQL query</li>
                <li>Refresh this page</li>
              </ol>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <Button
          variant={activeTab === 'passages' ? 'default' : 'outline'}
          onClick={() => setActiveTab('passages')}
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Reading Passages
        </Button>
        <Button
          variant={activeTab === 'progress' ? 'default' : 'outline'}
          onClick={() => setActiveTab('progress')}
          className="gap-2"
        >
          <Users className="h-4 w-4" />
          User Progress
        </Button>
      </div>

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {activeTab === 'passages' && (
        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  Reading Passages
                </CardTitle>
                <CardDescription className="font-medium mt-1">Manage reading practice content</CardDescription>
              </div>
              <Button onClick={handleNewPassage} className="gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 px-6 rounded-xl font-bold text-white shadow-lg shadow-indigo-100">
                <Plus className="h-4 w-4" />
                Add New Passage
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            ) : passages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest border-2 border-dashed rounded-2xl">
                No passages found
              </div>
            ) : (
              <div className="grid gap-4">
                {passages.map((passage) => (
                  <Card key={passage.id} className="hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 border-slate-100 rounded-2xl overflow-hidden group">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{passage.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 rounded-lg">{passage.topic}</Badge>
                              <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 rounded-lg">{passage.difficulty}</Badge>
                              <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 rounded-lg">{passage.time_limit}m</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("rounded-lg font-bold px-3 py-1", passage.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800')}>
                            {passage.is_published ? 'Published' : 'Draft'}
                          </Badge>
                          <div className="flex items-center gap-1 ml-2">
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600" onClick={() => handleTogglePublish(passage)}>
                              {passage.is_published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600" onClick={() => handleEditPassage(passage)}>
                              <Edit className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600" onClick={() => handleDeletePassage(passage.id)}>
                              <Trash2 className="h-5 w-5" />
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
      )}

      {activeTab === 'progress' && (
        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              User Progress Overview
            </CardTitle>
            <CardDescription className="font-medium mt-1">Track student performance on reading passages</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {userProgress.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest border-2 border-dashed rounded-2xl">
                No user activity recorded yet
              </div>
            ) : (
              <>
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-400 font-black uppercase tracking-widest text-[10px] border-b border-slate-100">
                        <th className="text-left py-4 px-4">Student</th>
                        <th className="text-left py-4 px-4">Attempts</th>
                        <th className="text-left py-4 px-4">Avg Score</th>
                        <th className="text-left py-4 px-4">Last Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userProgress.map((user, idx) => (
                        <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-bold text-slate-800">{user.user_email}</td>
                          <td className="py-4 px-4 font-bold text-slate-600">{user.total_attempts}</td>
                          <td className="py-4 px-4">
                            <Badge className={cn("rounded-lg font-bold px-3 py-1", user.avg_score >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800')}>
                              {user.avg_score}%
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {new Date(user.last_activity).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="grid gap-4 md:hidden">
                  {userProgress.map((user, idx) => (
                    <Card key={idx} className="border-slate-100 rounded-2xl shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-black">
                              {user.user_email[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{user.user_email}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last: {new Date(user.last_activity).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Badge className={cn("rounded-lg font-bold px-3 py-1", user.avg_score >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800')}>
                            {user.avg_score}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Attempts</span>
                          <span className="font-black text-slate-900">{user.total_attempts}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPassage ? 'Edit Passage' : 'Add New Passage'}
            </DialogTitle>
            <DialogDescription>
              Create or edit a reading practice passage
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* AI Generation Section */}
            {!editingPassage && (
              <Card className="border-dashed border-2 border-accent/30 bg-accent/5">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-foreground">AI Generate Passage</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter topic (e.g., Climate Change, Space Exploration)"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAIGenerate}
                      disabled={generating || !aiTopic.trim()}
                      className="gap-2"
                    >
                      {generating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    AI will generate a reading passage based on your topic. You can edit the content after generation.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="border-t pt-4">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., The Impact of Technology on Education"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., Education, Environment"
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
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
            </div>

            <div>
              <Label htmlFor="time_limit">Time Limit (minutes)</Label>
              <Input
                id="time_limit"
                type="number"
                value={formData.time_limit}
                onChange={(e) => setFormData({ ...formData, time_limit: parseInt(e.target.value) || 20 })}
              />
            </div>

            <div>
              <Label htmlFor="content">Passage Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter the reading passage text..."
                rows={10}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
              <Label>Publish immediately</Label>
            </div>

            {aiGenerated && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">AI content is ready! Choose how to save:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white rounded p-2 border border-blue-200">
                    <p className="font-bold text-blue-700">📖 Practice Passage</p>
                    <p className="text-gray-600">Adds to Reading Practice section (no questions)</p>
                  </div>
                  <div className="bg-white rounded p-2 border border-green-200">
                    <p className="font-bold text-green-700">🎯 Mock Test</p>
                    <p className="text-gray-600">Adds to Mock Tests page WITH questions</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2 flex-wrap">
              <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSavePassage}
                disabled={saving}
                variant="outline"
                className="border-blue-400 text-blue-700 hover:bg-blue-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  '📖 Save as Practice Passage'
                )}
              </Button>
              {aiGenerated && (
                <Button
                  onClick={handleSaveAsMockTest}
                  disabled={savingMockTest}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {savingMockTest ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving Mock Test...
                    </>
                  ) : (
                    '🎯 Save as Mock Test'
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
