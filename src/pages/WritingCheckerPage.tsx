import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  PenTool, 
  Clock, 
  CheckCircle2, 
  FileText,
  Target,
  Lightbulb,
  RotateCcw,
  Save,
  ChevronRight,
  ChevronDown,
  BookOpen
} from 'lucide-react';

interface WritingPrompt {
  id: string;
  type: 'task1' | 'task2';
  topic: string;
  question: string;
  wordLimit: { min: number; max: number };
  timeLimit: number;
}

const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: 'w2-1',
    type: 'task2',
    topic: 'Education',
    question: 'Some people believe that children should be taught to be competitive, while others think they should learn to cooperate with others. Discuss both views and give your own opinion.',
    wordLimit: { min: 250, max: 300 },
    timeLimit: 40 * 60
  },
  {
    id: 'w2-2',
    type: 'task2',
    topic: 'Technology',
    question: 'Many people believe that social media has a negative impact on both individuals and society. To what extent do you agree or disagree?',
    wordLimit: { min: 250, max: 300 },
    timeLimit: 40 * 60
  },
  {
    id: 'w2-3',
    type: 'task2',
    topic: 'Environment',
    question: 'Some people think that the best way to solve environmental problems is to increase the cost of fuel. To what extent do you agree or disagree?',
    wordLimit: { min: 250, max: 300 },
    timeLimit: 40 * 60
  },
  {
    id: 'w2-4',
    type: 'task2',
    topic: 'Health',
    question: 'In many countries, people are becoming less healthy. What are the causes of this problem? What measures can be taken to solve it?',
    wordLimit: { min: 250, max: 300 },
    timeLimit: 40 * 60
  },
  {
    id: 'w2-5',
    type: 'task2',
    topic: 'Work',
    question: 'Some people think that it is better to work for a large company, while others prefer to work for a small company. Discuss both views and give your own opinion.',
    wordLimit: { min: 250, max: 300 },
    timeLimit: 40 * 60
  },
];

interface BandDescriptor {
  band: number;
  taskResponse: string;
  coherence: string;
  lexical: string;
  grammar: string;
}

const BAND_DESCRIPTORS: BandDescriptor[] = [
  {
    band: 9,
    taskResponse: 'Fully addresses all parts of the task with a fully developed position',
    coherence: 'Uses cohesion in such a way that it attracts no attention',
    lexical: 'Uses a wide range of vocabulary with very natural and sophisticated control',
    grammar: 'Uses a wide range of structures with full flexibility and accuracy'
  },
  {
    band: 8,
    taskResponse: 'Sufficiently addresses all parts of the task with a well-developed response',
    coherence: 'Sequences information and ideas logically with skillful use of cohesive devices',
    lexical: 'Uses a wide range of vocabulary fluently and flexibly',
    grammar: 'Uses a wide range of structures with majority of sentences error-free'
  },
  {
    band: 7,
    taskResponse: 'Addresses all parts of the task with a clear position throughout',
    coherence: 'Logically organizes information with clear progression throughout',
    lexical: 'Uses sufficient range of vocabulary with some flexibility and precision',
    grammar: 'Uses a variety of complex structures with good control'
  },
  {
    band: 6,
    taskResponse: 'Addresses all parts of the task though some parts may be more fully covered',
    coherence: 'Arranges information coherently with clear overall progression',
    lexical: 'Uses adequate range of vocabulary for the task with some errors',
    grammar: 'Uses mix of simple and complex sentences with some errors'
  },
];

const ESSAY_TEMPLATES = {
  discussBoth: {
    name: 'Discuss Both Views',
    structure: [
      { part: 'Introduction', description: 'Paraphrase question + thesis statement', words: '40-50' },
      { part: 'Body 1', description: 'First view + examples/reasons', words: '80-100' },
      { part: 'Body 2', description: 'Second view + examples/reasons', words: '80-100' },
      { part: 'Conclusion', description: 'Your opinion + summary', words: '30-40' },
    ]
  },
  agreeDisagree: {
    name: 'Agree/Disagree',
    structure: [
      { part: 'Introduction', description: 'Paraphrase + clear position', words: '40-50' },
      { part: 'Body 1', description: 'Main argument + support', words: '80-100' },
      { part: 'Body 2', description: 'Second argument + support', words: '80-100' },
      { part: 'Conclusion', description: 'Restate position + final thought', words: '30-40' },
    ]
  },
  problemSolution: {
    name: 'Problem/Solution',
    structure: [
      { part: 'Introduction', description: 'Introduce topic + outline', words: '40-50' },
      { part: 'Body 1', description: 'Problems/Causes', words: '80-100' },
      { part: 'Body 2', description: 'Solutions/Measures', words: '80-100' },
      { part: 'Conclusion', description: 'Summary + recommendation', words: '30-40' },
    ]
  },
};

const CHECKLIST_ITEMS = [
  { id: 'intro', category: 'Task Response', text: 'Introduction paraphrases the question' },
  { id: 'thesis', category: 'Task Response', text: 'Clear thesis/position statement' },
  { id: 'allParts', category: 'Task Response', text: 'All parts of the question addressed' },
  { id: 'examples', category: 'Task Response', text: 'Relevant examples and explanations' },
  { id: 'conclusion', category: 'Task Response', text: 'Conclusion summarizes main points' },
  { id: 'paragraphs', category: 'Coherence', text: 'Clear paragraph structure' },
  { id: 'linking', category: 'Coherence', text: 'Appropriate linking words used' },
  { id: 'progression', category: 'Coherence', text: 'Logical progression of ideas' },
  { id: 'vocab', category: 'Lexical Resource', text: 'Topic-specific vocabulary used' },
  { id: 'synonyms', category: 'Lexical Resource', text: 'Variety of vocabulary (no repetition)' },
  { id: 'collocations', category: 'Lexical Resource', text: 'Correct collocations' },
  { id: 'complex', category: 'Grammar', text: 'Mix of simple and complex sentences' },
  { id: 'tenses', category: 'Grammar', text: 'Correct tense usage' },
  { id: 'punctuation', category: 'Grammar', text: 'Correct punctuation' },
];

const STORAGE_KEY = 'ielts_writing_drafts';

export default function WritingCheckerPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [stage, setStage] = useState<'select' | 'plan' | 'write' | 'check'>('select');
  const [essay, setEssay] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof ESSAY_TEMPLATES>('discussBoth');
  const [showDescriptors, setShowDescriptors] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  const startWriting = () => {
    if (!selectedPrompt) return;
    setTimeLeft(selectedPrompt.timeLimit);
    setIsTimerRunning(true);
    setStage('write');
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);
  };

  const resumeTimer = () => {
    setIsTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const submitForCheck = () => {
    pauseTimer();
    setStage('check');
  };

  const toggleCheckItem = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const saveDraft = () => {
    if (!selectedPrompt) return;
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    drafts[selectedPrompt.id] = {
      essay,
      savedAt: new Date().toISOString(),
      wordCount
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    alert('Draft saved!');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    const total = CHECKLIST_ITEMS.length;
    const checked = checkedItems.size;
    const percentage = (checked / total) * 100;
    
    if (percentage >= 90) return { band: '7.5-8.0', color: 'text-green-600' };
    if (percentage >= 75) return { band: '7.0', color: 'text-green-600' };
    if (percentage >= 60) return { band: '6.5', color: 'text-blue-600' };
    if (percentage >= 45) return { band: '6.0', color: 'text-amber-600' };
    return { band: '5.5 or below', color: 'text-red-600' };
  };

  const getWordCountStatus = () => {
    if (!selectedPrompt) return { status: 'neutral', message: '' };
    const { min, max } = selectedPrompt.wordLimit;
    
    if (wordCount < min) {
      return { status: 'warning', message: `${min - wordCount} more words needed` };
    }
    if (wordCount > max) {
      return { status: 'warning', message: `${wordCount - max} words over limit` };
    }
    return { status: 'success', message: 'Good length!' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {stage === 'select' && (
          <div className="space-y-6">
            <Card className="border-2 border-emerald-100">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <PenTool className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl">Writing Task 2 Checker</CardTitle>
                <CardDescription>
                  Practice essay writing with timer, templates, and self-assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium">40 Minutes</p>
                    <p className="text-sm text-gray-500">Timed practice</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="font-medium">250+ Words</p>
                    <p className="text-sm text-gray-500">Word count tracker</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="font-medium">Band Checklist</p>
                    <p className="text-sm text-gray-500">Self-assessment</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Select a Topic</h3>
                  <div className="space-y-3">
                    {WRITING_PROMPTS.map(prompt => (
                      <Card 
                        key={prompt.id}
                        className={`cursor-pointer transition-colors ${
                          selectedPrompt?.id === prompt.id 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'hover:border-emerald-300'
                        }`}
                        onClick={() => setSelectedPrompt(prompt)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPrompt?.id === prompt.id 
                                ? 'border-emerald-500 bg-emerald-500' 
                                : 'border-gray-300'
                            }`}>
                              {selectedPrompt?.id === prompt.id && (
                                <CheckCircle2 className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <Badge variant="outline" className="mb-2">{prompt.topic}</Badge>
                              <p className="text-sm">{prompt.question}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setStage('plan')}
                  disabled={!selectedPrompt}
                  className="w-full"
                  size="lg"
                >
                  Continue to Planning
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {stage === 'plan' && selectedPrompt && (
          <div className="space-y-6">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Plan Your Essay
                </CardTitle>
                <CardDescription>Choose a template and review the structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Badge variant="outline" className="mb-2">{selectedPrompt.topic}</Badge>
                  <p className="font-medium">{selectedPrompt.question}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Select Essay Template</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.entries(ESSAY_TEMPLATES).map(([key, template]) => (
                      <Card 
                        key={key}
                        className={`cursor-pointer transition-colors ${
                          selectedTemplate === key 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedTemplate(key as keyof typeof ESSAY_TEMPLATES)}
                      >
                        <CardContent className="p-4 text-center">
                          <p className="font-medium">{template.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 font-medium">
                    Essay Structure: {ESSAY_TEMPLATES[selectedTemplate].name}
                  </div>
                  <div className="divide-y">
                    {ESSAY_TEMPLATES[selectedTemplate].structure.map((part, index) => (
                      <div key={index} className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">{part.part}</p>
                          <p className="text-sm text-gray-500">{part.description}</p>
                        </div>
                        <Badge variant="outline">{part.words} words</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setStage('select')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={startWriting}
                    className="flex-1"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Start Writing (40 min)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {stage === 'write' && selectedPrompt && (
          <div className="space-y-4">
            <Card className="border-2 border-emerald-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-600' : ''}`}>
                      <Clock className="inline h-5 w-5 mr-1" />
                      {formatTime(timeLeft)}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isTimerRunning ? pauseTimer : resumeTimer}
                    >
                      {isTimerRunning ? 'Pause' : 'Resume'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`font-medium ${
                      getWordCountStatus().status === 'success' ? 'text-green-600' :
                      getWordCountStatus().status === 'warning' ? 'text-amber-600' : ''
                    }`}>
                      {wordCount} / {selectedPrompt.wordLimit.min}+ words
                    </div>
                    <Button variant="outline" size="sm" onClick={saveDraft}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-2">
                    <Badge variant="outline">{selectedPrompt.topic}</Badge>
                    <p className="text-sm mt-2">{selectedPrompt.question}</p>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={essay}
                      onChange={(e) => setEssay(e.target.value)}
                      placeholder="Start writing your essay here..."
                      className="min-h-[400px] text-base leading-relaxed"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Essay Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {ESSAY_TEMPLATES[selectedTemplate].structure.map((part, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>{part.part}</span>
                        <span className="text-gray-500">{part.words}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>• Paraphrase the question in intro</p>
                    <p>• One main idea per paragraph</p>
                    <p>• Use linking words</p>
                    <p>• Give specific examples</p>
                    <p>• Summarize in conclusion</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  pauseTimer();
                  setStage('select');
                }}
              >
                Exit
              </Button>
              <Button 
                onClick={submitForCheck}
                className="flex-1"
                disabled={wordCount < 200}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Submit for Self-Check
              </Button>
            </div>
          </div>
        )}

        {stage === 'check' && selectedPrompt && (
          <div className="space-y-6">
            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Self-Assessment Checklist
                </CardTitle>
                <CardDescription>
                  Check each item that applies to your essay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{wordCount}</p>
                    <p className="text-sm text-gray-500">Words</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{formatTime(selectedPrompt.timeLimit - timeLeft)}</p>
                    <p className="text-sm text-gray-500">Time Used</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{checkedItems.size}/{CHECKLIST_ITEMS.length}</p>
                    <p className="text-sm text-gray-500">Criteria Met</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className={`text-2xl font-bold ${calculateScore().color}`}>
                      {calculateScore().band}
                    </p>
                    <p className="text-sm text-gray-500">Est. Band</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Your Essay</h3>
                    <div className="p-4 bg-gray-50 rounded-lg max-h-[300px] overflow-y-auto">
                      <p className="whitespace-pre-wrap text-sm">{essay}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Checklist</h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                      {['Task Response', 'Coherence', 'Lexical Resource', 'Grammar'].map(category => (
                        <div key={category}>
                          <p className="text-sm font-medium text-gray-500 mb-2">{category}</p>
                          <div className="space-y-2">
                            {CHECKLIST_ITEMS.filter(item => item.category === category).map(item => (
                              <label 
                                key={item.id}
                                className="flex items-center gap-3 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                              >
                                <input
                                  type="checkbox"
                                  checked={checkedItems.has(item.id)}
                                  onChange={() => toggleCheckItem(item.id)}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">{item.text}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <button
                    onClick={() => setShowDescriptors(!showDescriptors)}
                    className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    <BookOpen className="h-4 w-4" />
                    {showDescriptors ? 'Hide' : 'Show'} Band Descriptors
                    {showDescriptors ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                  
                  {showDescriptors && (
                    <div className="mt-4 border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 text-left">Band</th>
                            <th className="p-2 text-left">Task Response</th>
                            <th className="p-2 text-left">Coherence</th>
                            <th className="p-2 text-left">Lexical</th>
                            <th className="p-2 text-left">Grammar</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {BAND_DESCRIPTORS.map(desc => (
                            <tr key={desc.band}>
                              <td className="p-2 font-bold">{desc.band}</td>
                              <td className="p-2 text-xs">{desc.taskResponse}</td>
                              <td className="p-2 text-xs">{desc.coherence}</td>
                              <td className="p-2 text-xs">{desc.lexical}</td>
                              <td className="p-2 text-xs">{desc.grammar}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setStage('write');
                      resumeTimer();
                    }}
                    className="flex-1"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Continue Editing
                  </Button>
                  <Button 
                    onClick={() => {
                      setSelectedPrompt(null);
                      setEssay('');
                      setCheckedItems(new Set());
                      setStage('select');
                    }}
                    className="flex-1"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    New Essay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
