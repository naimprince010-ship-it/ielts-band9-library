import { useState, useEffect } from 'react';
import { Loader2, Plus, Sparkles, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface GeneratedWord {
  word: string;
  definition: string;
  part_of_speech: string;
}

interface GenerationResult {
  success: boolean;
  generated: number;
  inserted: number;
  totalWords: number;
  words: GeneratedWord[];
}

const TOPICS = [
  'Academic Writing',
  'Scientific Research',
  'Business & Economics',
  'Technology & Innovation',
  'Environment & Sustainability',
  'Health & Medicine',
  'Education & Learning',
  'Social Issues',
  'Politics & Government',
  'Arts & Culture',
  'Psychology & Behavior',
  'Law & Justice',
  'Media & Communication',
  'Urban Development',
  'Philosophy & Ethics',
  'History & Civilization',
  'Sports & Recreation',
  'Travel & Tourism',
  'Food & Nutrition',
  'Architecture & Design',
];

const DIFFICULTY_LEVELS = [
  { value: 'intermediate', label: 'Intermediate (B2)' },
  { value: 'advanced', label: 'Advanced (C1)' },
  { value: 'expert', label: 'Expert (C2)' },
];

export function VocabularyGenerator() {
  const [topic, setTopic] = useState('Academic Writing');
  const [count, setCount] = useState(50);
  const [difficulty, setDifficulty] = useState('advanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState('');
  const [totalWords, setTotalWords] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);

  useEffect(() => {
    fetchTotalWordCount();
  }, []);

  const fetchTotalWordCount = async () => {
    if (!isSupabaseConfigured() || !supabase) return;

    setLoadingCount(true);
    try {
      const { count, error } = await supabase
        .from('vocabulary')
        .select('*', { count: 'exact', head: true });

      if (!error && count !== null) {
        setTotalWords(count);
      }
    } catch (err) {
      console.error('Failed to fetch word count:', err);
    } finally {
      setLoadingCount(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate-vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          count,
          difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate vocabulary');
      }

      setResult(data);
      setTotalWords(data.totalWords);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Vocabulary Generator
          </CardTitle>
          <CardDescription>
            Generate IELTS-appropriate vocabulary words using OpenAI and add them directly to the database.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Total Words in Database</p>
              <p className="text-3xl font-bold text-indigo-600">
                {loadingCount ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  totalWords?.toLocaleString() || '0'
                )}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchTotalWordCount}
              disabled={loadingCount}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loadingCount ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {TOPICS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Number of Words</Label>
              <Input
                id="count"
                type="number"
                min={10}
                max={100}
                value={count}
                onChange={(e) => setCount(Math.min(100, Math.max(10, parseInt(e.target.value) || 10)))}
              />
              <p className="text-xs text-gray-500">Max 100 words per request</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_LEVELS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Generate & Add Words
              </>
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Generated {result.generated} words, inserted {result.inserted} new words.
                Total words in database: {result.totalWords?.toLocaleString()}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {result && result.words.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Words</CardTitle>
            <CardDescription>
              {result.words.length} new words added to the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium">Word</th>
                    <th className="text-left py-2 px-3 font-medium">Part of Speech</th>
                    <th className="text-left py-2 px-3 font-medium">Definition</th>
                  </tr>
                </thead>
                <tbody>
                  {result.words.map((word, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-indigo-600">{word.word}</td>
                      <td className="py-2 px-3 text-gray-500">{word.part_of_speech}</td>
                      <td className="py-2 px-3">{word.definition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
