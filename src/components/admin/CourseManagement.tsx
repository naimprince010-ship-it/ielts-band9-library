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
  GraduationCap, 
  Plus, 
  Edit, 
  Trash2, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  Tag,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Palette
} from 'lucide-react';
import { courseService } from '@/services/courseService';
import { Course, CourseType, CurriculumModule } from '@/types';
import { cn } from '@/lib/utils';

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    description: string;
    instructor: string;
    nextBatch: string;
    price: string;
    originalPrice: string;
    duration: string;
    level: string;
    type: CourseType;
    features: string[];
    isPopular: boolean;
    accentColor: string;
    bgGradient: string;
    curriculum: CurriculumModule[];
  }>({
    id: '',
    title: '',
    description: '',
    instructor: '',
    nextBatch: '',
    price: '',
    originalPrice: '',
    duration: '',
    level: '',
    type: 'live',
    features: [],
    isPopular: false,
    accentColor: 'indigo',
    bgGradient: 'from-blue-500 to-indigo-600',
    curriculum: []
  });

  const [newFeature, setNewFeature] = useState('');
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await courseService.getCourses();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewCourse = () => {
    setEditingCourse(null);
    setFormData({
      id: '',
      title: '',
      description: '',
      instructor: '',
      nextBatch: '',
      price: '',
      originalPrice: '',
      duration: '',
      level: '',
      type: 'live',
      features: [],
      isPopular: false,
      accentColor: 'indigo',
      bgGradient: 'from-blue-500 to-indigo-600',
      curriculum: []
    });
    setNewFeature('');
    setExpandedModules([]);
    setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      nextBatch: course.nextBatch,
      price: course.price.toString(),
      originalPrice: course.originalPrice?.toString() || '',
      duration: course.duration,
      level: course.level,
      type: course.type,
      features: [...course.features],
      isPopular: !!course.isPopular,
      accentColor: course.accentColor,
      bgGradient: course.bgGradient,
      curriculum: course.curriculum ? JSON.parse(JSON.stringify(course.curriculum)) : []
    });
    setNewFeature('');
    setExpandedModules([]);
    setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

  const handleSaveCourse = async () => {
    if (!formData.id || !formData.title || !formData.instructor || !formData.price) {
      setError('Please fill in required fields (ID, Title, Instructor, Price)');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const courseData: Omit<Course, 'created_at' | 'updated_at'> = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        instructor: formData.instructor,
        nextBatch: formData.nextBatch,
        price: parseInt(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
        duration: formData.duration,
        level: formData.level,
        type: formData.type,
        features: formData.features,
        isPopular: formData.isPopular,
        accentColor: formData.accentColor,
        bgGradient: formData.bgGradient,
        curriculum: formData.curriculum
      };

      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, courseData);
        setSuccess('Course updated successfully!');
      } else {
        await courseService.createCourse(courseData);
        setSuccess('Course created successfully!');
      }

      fetchCourses();
      setTimeout(() => {
        setIsEditorOpen(false);
        setSuccess('');
      }, 1500);
    } catch (err: any) {
      console.error('Error saving course:', err);
      setError(err.message || 'Failed to save course. Please check if ID is unique.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await courseService.deleteCourse(id);
      setSuccess('Course deleted successfully!');
      fetchCourses();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting course:', err);
      setError('Failed to delete course');
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const updated = [...formData.features];
    updated.splice(index, 1);
    setFormData({ ...formData, features: updated });
  };

  const addModule = () => {
    setFormData({
      ...formData,
      curriculum: [...formData.curriculum, { module: 'New Module', lessons: [] }]
    });
    setExpandedModules([...expandedModules, formData.curriculum.length]);
  };

  const updateModuleTitle = (index: number, title: string) => {
    const updated = [...formData.curriculum];
    updated[index].module = title;
    setFormData({ ...formData, curriculum: updated });
  };

  const removeModule = (index: number) => {
    const updated = [...formData.curriculum];
    updated.splice(index, 1);
    setFormData({ ...formData, curriculum: updated });
  };

  const addLessonToModule = (moduleIndex: number) => {
    const updated = [...formData.curriculum];
    updated[moduleIndex].lessons = [...updated[moduleIndex].lessons, 'New Lesson'];
    setFormData({ ...formData, curriculum: updated });
  };

  const updateLessonContent = (moduleIndex: number, lessonIndex: number, text: string) => {
    const updated = [...formData.curriculum];
    const currentLesson = updated[moduleIndex].lessons[lessonIndex];
    
    if (typeof currentLesson === 'string') {
      updated[moduleIndex].lessons[lessonIndex] = text;
    } else {
      updated[moduleIndex].lessons[lessonIndex] = { ...currentLesson, title: text };
    }
    
    setFormData({ ...formData, curriculum: updated });
  };

  const removeLessonFromModule = (moduleIndex: number, lessonIndex: number) => {
    const updated = [...formData.curriculum];
    updated[moduleIndex].lessons.splice(lessonIndex, 1);
    setFormData({ ...formData, curriculum: updated });
  };

  const toggleModuleExpanded = (index: number) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter(i => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };

  return (
    <div className="space-y-6">
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

      <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
        <CardHeader className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                Course Management
              </CardTitle>
              <CardDescription className="font-medium mt-1">Manage flagship courses and their details</CardDescription>
            </div>
            <Button onClick={handleNewCourse} className="gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 px-6 rounded-xl font-bold text-white shadow-lg shadow-indigo-100">
              <Plus className="h-4 w-4" />
              Add New Course
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest border-2 border-dashed rounded-2xl">
              No courses found
            </div>
          ) : (
            <div className="grid gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 border-slate-100 rounded-2xl overflow-hidden group">
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br",
                          course.bgGradient
                        )}>
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{course.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 rounded-lg flex items-center gap-1">
                              <Tag className="h-3 w-3" /> {course.type}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 rounded-lg flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {course.nextBatch}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 rounded-lg flex items-center gap-1">
                               <Clock className="h-3 w-3" /> {course.duration}
                            </Badge>
                            <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none rounded-lg font-bold">
                               ৳{course.price.toLocaleString()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <div className="flex items-center gap-2">
                           {course.isPopular && (
                             <Badge className="bg-amber-100 text-amber-800 rounded-lg font-bold uppercase text-[9px] tracking-widest">Popular</Badge>
                           )}
                           <div className="flex items-center gap-1 ml-2">
                             <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600" onClick={() => handleEditCourse(course)}>
                               <Edit className="h-5 w-5" />
                             </Button>
                             <Button variant="ghost" size="icon" className="rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600" onClick={() => handleDeleteCourse(course.id)}>
                               <Trash2 className="h-5 w-5" />
                             </Button>
                           </div>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-0 border-none">
          <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100">
            <DialogTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                {editingCourse ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </div>
              {editingCourse ? 'Edit Course' : 'Create New Course'}
            </DialogTitle>
            <DialogDescription className="font-medium text-slate-500">
              Define the details, pricing, features, and curriculum for this course.
            </DialogDescription>
          </DialogHeader>

          <div className="p-8 space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="id" className="text-xs font-bold uppercase tracking-widest text-slate-400">Course ID (Slug) *</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g., ielts-masterclass"
                    disabled={!!editingCourse}
                    className="rounded-xl border-slate-200 h-11"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-slate-400">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., IELTS Band 8+ Masterclass"
                    className="rounded-xl border-slate-200 h-11"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</Label>
               <Textarea
                 id="description"
                 value={formData.description}
                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                 placeholder="Enter course description..."
                 rows={3}
                 className="rounded-xl border-slate-200"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="instructor" className="text-xs font-bold uppercase tracking-widest text-slate-400">Instructor *</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="e.g., Arefin Shovo"
                    className="rounded-xl border-slate-200 h-11"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="nextBatch" className="text-xs font-bold uppercase tracking-widest text-slate-400">Next Batch</Label>
                  <Input
                    id="nextBatch"
                    value={formData.nextBatch}
                    onChange={(e) => setFormData({ ...formData, nextBatch: e.target.value })}
                    placeholder="e.g., April 15, 2026"
                    className="rounded-xl border-slate-200 h-11"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="duration" className="text-xs font-bold uppercase tracking-widest text-slate-400">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 3 Months"
                    className="rounded-xl border-slate-200 h-11"
                  />
               </div>
            </div>

            {/* Pricing & type */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="space-y-2 text-indigo-600">
                  <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-slate-400">Price (৳) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="5500"
                    className="rounded-xl border-indigo-100 bg-indigo-50/30 h-11 font-black"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="originalPrice" className="text-xs font-bold uppercase tracking-widest text-slate-400">Original Price (৳)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="8000"
                    className="rounded-xl border-slate-200 h-11"
                  />
               </div>
               <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Course Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as CourseType })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="recorded">Recorded</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="level" className="text-xs font-bold uppercase tracking-widest text-slate-400">Level</Label>
                  <Input
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="e.g., Any or Intermediate+"
                    className="rounded-xl border-slate-200 h-11"
                  />
               </div>
            </div>

            {/* Appearance */}
            <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 space-y-6">
               <div className="flex items-center gap-2 mb-2">
                  <Palette className="h-4 w-4 text-slate-400" />
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Design & Promos</h4>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Accent Color</Label>
                    <Select
                      value={formData.accentColor}
                      onValueChange={(value) => setFormData({ ...formData, accentColor: value })}
                    >
                      <SelectTrigger className="rounded-xl border-slate-200 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indigo">Indigo</SelectItem>
                        <SelectItem value="rose">Rose</SelectItem>
                        <SelectItem value="amber">Amber</SelectItem>
                        <SelectItem value="emerald">Emerald</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Background Gradient</Label>
                    <Input
                      value={formData.bgGradient}
                      onChange={(e) => setFormData({ ...formData, bgGradient: e.target.value })}
                      placeholder="e.g., from-blue-500 to-indigo-600"
                      className="rounded-xl border-slate-200 h-11"
                    />
                  </div>
               </div>
               <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                  <Switch
                    id="isPopular"
                    checked={formData.isPopular}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })}
                  />
                  <Label htmlFor="isPopular" className="font-bold text-slate-700 cursor-pointer">Mark as "Popular" course</Label>
               </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Course Features</Label>
                  <Badge variant="outline" className="bg-slate-50 text-slate-400 border-none rounded-full">{formData.features.length} Items</Badge>
               </div>
               <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature (e.g., Personalized Feedback)"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    className="rounded-xl border-slate-200 h-11"
                  />
                  <Button type="button" onClick={addFeature} size="icon" className="h-11 w-11 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white shrink-0">
                    <Plus className="h-5 w-5" />
                  </Button>
               </div>
               <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="pl-3 pr-1 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 border-none flex items-center gap-2 group">
                      <span className="font-bold text-xs">{feature}</span>
                      <button onClick={() => removeFeature(idx)} className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
               </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-600" />
                    <h4 className="text-lg font-black text-slate-900">Curriculum Builder</h4>
                  </div>
                  <Button type="button" onClick={addModule} variant="outline" className="rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold h-10 px-4">
                    <Plus className="h-4 w-4 mr-2" /> Add Module
                  </Button>
               </div>

               <div className="space-y-4">
                  {formData.curriculum.map((module, mIdx) => (
                    <Card key={mIdx} className="border-slate-100 shadow-sm rounded-2xl overflow-hidden group">
                       <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                             <button onClick={() => toggleModuleExpanded(mIdx)} className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 shadow-sm">
                                {expandedModules.includes(mIdx) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                             </button>
                             <Input
                                value={module.module}
                                onChange={(e) => updateModuleTitle(mIdx, e.target.value)}
                                className="h-9 font-bold bg-transparent border-none focus-visible:ring-0 text-slate-800 p-0"
                             />
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeModule(mIdx)} className="h-8 w-8 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                       </div>
                       {expandedModules.includes(mIdx) && (
                         <CardContent className="p-4 space-y-3">
                            {module.lessons.map((lesson, lIdx) => (
                              <div key={lIdx} className="flex gap-2 items-center">
                                 <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0">
                                    {lIdx + 1}
                                 </div>
                                 <Input
                                    value={typeof lesson === 'string' ? lesson : lesson.title}
                                    onChange={(e) => updateLessonContent(mIdx, lIdx, e.target.value)}
                                    className="h-10 rounded-xl border-slate-100"
                                    placeholder="Lesson Title"
                                 />
                                 {typeof lesson !== 'string' && lesson.lessonId && (
                                   <Badge variant="secondary" className="bg-green-50 text-green-600 border-none rounded-lg text-[9px] uppercase font-black px-2">
                                     Linked: {lesson.lessonId}
                                   </Badge>
                                 )}
                                 <Button variant="ghost" size="icon" onClick={() => removeLessonFromModule(mIdx, lIdx)} className="h-8 w-8 text-slate-300 hover:text-rose-500 shrink-0">
                                    <X className="h-4 w-4" />
                                 </Button>
                              </div>
                            ))}
                            <Button type="button" onClick={() => addLessonToModule(mIdx)} variant="ghost" className="w-full h-10 border-dashed border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-200 rounded-xl text-xs font-bold uppercase tracking-widest mt-2">
                               <Plus className="h-3 w-3 mr-2" /> Add Lesson
                            </Button>
                         </CardContent>
                       )}
                    </Card>
                  ))}
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <Button variant="ghost" onClick={() => setIsEditorOpen(false)} className="rounded-xl font-bold text-slate-500 h-12 px-8">
                Cancel
              </Button>
              <Button
                onClick={handleSaveCourse}
                disabled={saving}
                className="bg-indigo-600 hover:bg-indigo-700 h-12 px-10 rounded-xl font-bold text-white shadow-xl shadow-indigo-100 transition-all duration-300"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingCourse ? 'Save Changes' : 'Publish Course'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
