import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';

interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  part_of_speech: string;
  topic: string;
  difficulty_level: string;
  bangla_meaning?: string;
  synonyms?: string[];
  example_sentence?: string;
  is_enriched: boolean;
}

interface GeneratedQuestion {
  id: string;
  type: 'fill-blank' | 'definition-match' | 'synonym-match';
  questionText: string;
  correctAnswer: string;
  acceptedAnswers: string[];
  options?: string[];
  hint?: string;
  explanation?: string;
  vocabularyWordId: string;
  vocabularyWord: string;
}

interface VocabularyQuestionGeneratorProps {
  onQuestionsGenerated: (questions: GeneratedQuestion[]) => void;
  moduleType: 'reading' | 'listening';
}

export function VocabularyQuestionGenerator({ 
  onQuestionsGenerated,
  moduleType 
}: VocabularyQuestionGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [topics, setTopics] = useState<string[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  
  // Filters
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [enrichedOnly, setEnrichedOnly] = useState(true);
  const [questionCount, setQuestionCount] = useState(10);
  const [questionTypes, setQuestionTypes] = useState<string[]>(['fill-blank']);

  const fetchVocabulary = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (selectedTopic && selectedTopic !== 'all') {
        params.append('topic', selectedTopic);
      }
      if (selectedDifficulty && selectedDifficulty !== 'all') {
        params.append('difficulty', selectedDifficulty);
      }
      if (enrichedOnly) {
        params.append('enrichedOnly', 'true');
      }
      params.append('limit', '100');

      const response = await fetch(`/api/fetch-vocabulary?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch vocabulary');
      }

      setWords(data.words || []);
      setTopics(data.topics || []);
    } catch (err) {
      console.error('Fetch vocabulary error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch vocabulary');
    } finally {
      setLoading(false);
    }
  }, [selectedTopic, selectedDifficulty, enrichedOnly]);

  useEffect(() => {
    fetchVocabulary();
  }, [fetchVocabulary]);

  const handleSelectWord = (wordId: string) => {
    setSelectedWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(wordId)) {
        newSet.delete(wordId);
      } else {
        newSet.add(wordId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedWords.size === words.length) {
      setSelectedWords(new Set());
    } else {
      setSelectedWords(new Set(words.map(w => w.id)));
    }
  };

  const handleSelectRandom = (count: number) => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count).map(w => w.id);
    setSelectedWords(new Set(selected));
  };

  const handleGenerateQuestions = async () => {
    if (selectedWords.size === 0) {
      setError('Please select at least one word');
      return;
    }

    setGenerating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/generate-vocabulary-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wordIds: Array.from(selectedWords),
          questionTypes,
          count: questionCount
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      setGeneratedQuestions(data.questions || []);
      setSuccess(`Generated ${data.generatedCount} questions from ${data.totalWords} words`);
    } catch (err) {
      console.error('Generate questions error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate questions');
    } finally {
      setGenerating(false);
    }
  };

  const handleAddToTest = () => {
    if (generatedQuestions.length === 0) {
      setError('No questions to add. Generate questions first.');
      return;
    }
    onQuestionsGenerated(generatedQuestions);
    setSuccess(`Added ${generatedQuestions.length} questions to the test`);
    setGeneratedQuestions([]);
    setSelectedWords(new Set());
  };

  const toggleQuestionType = (type: string) => {
    setQuestionTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Vocabulary-Based Questions
        </CardTitle>
        <CardDescription>
          Generate {moduleType} questions from your vocabulary database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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

        {/* Filters */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label>Topic</Label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger>
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Difficulty</Label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Question Count</Label>
            <Input
              type="number"
              min={1}
              max={50}
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={fetchVocabulary}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="ml-2">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Question Types */}
        <div>
          <Label className="mb-2 block">Question Types</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={questionTypes.includes('fill-blank')}
                onCheckedChange={() => toggleQuestionType('fill-blank')}
              />
              <span className="text-sm">Fill in the Blank</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={questionTypes.includes('definition-match')}
                onCheckedChange={() => toggleQuestionType('definition-match')}
              />
              <span className="text-sm">Definition Match (MCQ)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={questionTypes.includes('synonym-match')}
                onCheckedChange={() => toggleQuestionType('synonym-match')}
              />
              <span className="text-sm">Synonym Match (MCQ)</span>
            </label>
          </div>
        </div>

        {/* Enriched Only Toggle */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="enrichedOnly"
            checked={enrichedOnly}
            onCheckedChange={(checked) => setEnrichedOnly(checked as boolean)}
          />
          <Label htmlFor="enrichedOnly" className="cursor-pointer">
            Only show enriched words (with synonyms, examples, etc.)
          </Label>
        </div>

        {/* Word Selection */}
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">Select Words</span>
              <Badge variant="secondary">{words.length} available</Badge>
              <Badge variant="default">{selectedWords.size} selected</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedWords.size === words.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSelectRandom(10)}>
                Random 10
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSelectRandom(20)}>
                Random 20
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : words.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No vocabulary words found. Try adjusting your filters or add words in the Vocabulary section.
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-1">
              {words.map(word => (
                <div
                  key={word.id}
                  className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 ${
                    selectedWords.has(word.id) ? 'bg-blue-50 border border-blue-200' : ''
                  }`}
                  onClick={() => handleSelectWord(word.id)}
                >
                  <Checkbox
                    checked={selectedWords.has(word.id)}
                    onCheckedChange={() => handleSelectWord(word.id)}
                  />
                  <div className="flex-1">
                    <span className="font-medium">{word.word}</span>
                    <span className="text-gray-500 text-sm ml-2">({word.part_of_speech})</span>
                    {word.bangla_meaning && (
                      <span className="text-gray-400 text-sm ml-2">- {word.bangla_meaning}</span>
                    )}
                  </div>
                  <Badge className={getDifficultyColor(word.difficulty_level)}>
                    {word.difficulty_level}
                  </Badge>
                  {word.topic && (
                    <Badge variant="outline">{word.topic}</Badge>
                  )}
                  {word.is_enriched && (
                    <Badge className="bg-purple-100 text-purple-800">Enriched</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerateQuestions}
          disabled={generating || selectedWords.size === 0 || questionTypes.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Questions...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate {questionCount} Questions from {selectedWords.size} Words
            </>
          )}
        </Button>

        {/* Generated Questions Preview */}
        {generatedQuestions.length > 0 && (
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Generated Questions</span>
              <Badge variant="default">{generatedQuestions.length} questions</Badge>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {generatedQuestions.map((q, index) => (
                <div key={q.id} className="p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{index + 1}</Badge>
                    <Badge className="bg-blue-100 text-blue-800">{q.type}</Badge>
                    <span className="text-xs text-gray-500">Word: {q.vocabularyWord}</span>
                  </div>
                  <p className="text-sm">{q.questionText}</p>
                  <p className="text-xs text-green-600 mt-1">Answer: {q.correctAnswer}</p>
                  {q.hint && (
                    <p className="text-xs text-gray-500 mt-1">Hint: {q.hint}</p>
                  )}
                </div>
              ))}
            </div>
            <Button
              onClick={handleAddToTest}
              className="w-full mt-3 bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {generatedQuestions.length} Questions to Test
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
