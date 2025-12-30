import { useState, useEffect } from 'react';
import { Loader2, Plus, Sparkles, RefreshCw, CheckCircle, AlertCircle, Lightbulb, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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

interface TopicCount {
  topic: string;
  count: number;
}

interface TopicRecommendation {
  recommendedTopic: string;
  rationale: string;
  isCustomTopic: boolean;
  topicCounts: TopicCount[];
  missingTopics: string[];
  totalWords: number;
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
  const [topic, setTopic] = useState('auto');
  const [customTopic, setCustomTopic] = useState('');
  const [count, setCount] = useState(50);
  const [difficulty, setDifficulty] = useState('advanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState('');
  const [totalWords, setTotalWords] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);
  const [recommendation, setRecommendation] = useState<TopicRecommendation | null>(null);
  const [showCoverage, setShowCoverage] = useState(false);

  useEffect(() => {
    fetchTotalWordCount();
  }, []);

  useEffect(() => {
    if (topic === 'auto') {
      fetchRecommendation();
    } else {
      setRecommendation(null);
    }
  }, [topic]);

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

    const fetchRecommendation = async () => {
      setIsLoadingRecommendation(true);
      setError('');
      try {
        const response = await fetch('/api/recommend-vocabulary-topic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get recommendation');
        }

        setRecommendation(data);
        setTotalWords(data.totalWords);
      } catch (err) {
        console.error('Failed to fetch recommendation:', err);
      } finally {
        setIsLoadingRecommendation(false);
      }
    };

    const getEffectiveTopic = (): string => {
      if (topic === 'auto' && recommendation) {
        return recommendation.recommendedTopic;
      }
      if (topic === 'custom') {
        return customTopic || 'Academic Writing';
      }
      return topic;
    };

    const handleGenerate = async () => {
      const effectiveTopic = getEffectiveTopic();
    
      if (topic === 'custom' && !customTopic.trim()) {
        setError('Please enter a custom topic');
        return;
      }

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
            topic: effectiveTopic,
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
      
        // Refresh recommendation after generating
        if (topic === 'auto') {
          fetchRecommendation();
        }
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
                        <p className="text-xs text-gray-500">Target: 7,000 words</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowCoverage(!showCoverage)}
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          {showCoverage ? 'Hide' : 'Show'} Coverage
                        </Button>
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
                    </div>

                    {showCoverage && recommendation && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-3">Topic Coverage</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          {recommendation.topicCounts.map((tc) => (
                            <div key={tc.topic} className="flex justify-between items-center p-2 bg-white rounded border">
                              <span className="truncate text-xs">{tc.topic}</span>
                              <Badge variant="secondary" className="ml-1">{tc.count}</Badge>
                            </div>
                          ))}
                        </div>
                        {recommendation.missingTopics.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-red-600 font-medium">Missing Topics:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {recommendation.missingTopics.map((t) => (
                                <Badge key={t} variant="destructive" className="text-xs">{t}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {topic === 'auto' && (
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-purple-900">AI Recommendation</h4>
                            {isLoadingRecommendation ? (
                              <div className="flex items-center gap-2 mt-2">
                                <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                                <span className="text-sm text-purple-700">Analyzing database coverage...</span>
                              </div>
                            ) : recommendation ? (
                              <div className="mt-2">
                                <p className="text-sm text-purple-800">
                                  <strong>Recommended Topic:</strong>{' '}
                                  <Badge className="bg-purple-600">{recommendation.recommendedTopic}</Badge>
                                </p>
                                <p className="text-sm text-purple-700 mt-1">{recommendation.rationale}</p>
                              </div>
                            ) : (
                              <p className="text-sm text-purple-700 mt-1">Click refresh to get AI recommendation</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={fetchRecommendation}
                            disabled={isLoadingRecommendation}
                          >
                            <RefreshCw className={`h-4 w-4 ${isLoadingRecommendation ? 'animate-spin' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="topic">Topic</Label>
                          <Select value={topic} onValueChange={setTopic}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">
                                <span className="flex items-center gap-2">
                                  <Sparkles className="h-4 w-4 text-purple-600" />
                                  Auto (AI Recommended)
                                </span>
                              </SelectItem>
                              <SelectItem value="custom">
                                <span className="flex items-center gap-2">
                                  <Plus className="h-4 w-4" />
                                  Custom Topic
                                </span>
                              </SelectItem>
                              {TOPICS.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {topic === 'custom' && (
                            <Input
                              placeholder="Enter custom topic..."
                              value={customTopic}
                              onChange={(e) => setCustomTopic(e.target.value)}
                              className="mt-2"
                            />
                          )}
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
                      disabled={isGenerating || (topic === 'auto' && isLoadingRecommendation)}
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
                          {topic === 'auto' && recommendation && (
                            <span className="ml-2 text-xs opacity-75">({recommendation.recommendedTopic})</span>
                          )}
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
