import { useState, useEffect } from 'react';
import { Loader2, Tags, RefreshCw, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface CategorizationResult {
  success: boolean;
  categorized: number;
  totalWords: number;
  categorizedWords: number;
  remainingWords: number;
  words: Array<{ word: string; category: string }>;
  categoryCounts: Record<string, number>;
  errors?: string[];
  message?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  OPINION: 'bg-purple-100 text-purple-800 border-purple-200',
  EMOTION: 'bg-red-100 text-red-800 border-red-200',
  TRANSACTIONAL: 'bg-green-100 text-green-800 border-green-200',
  SOCIAL: 'bg-blue-100 text-blue-800 border-blue-200',
  DESCRIPTIVE: 'bg-amber-100 text-amber-800 border-amber-200',
  ACADEMIC: 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  OPINION: 'Words to express views, arguments, beliefs (argue, believe, agree)',
  EMOTION: 'Words expressing feelings or emotional states (happy, sad, furious)',
  TRANSACTIONAL: 'Words related to transactions, commerce (buy, cost, borrow)',
  SOCIAL: 'Words for social interactions (greet, apologize, thank)',
  DESCRIPTIVE: 'Words that describe qualities, characteristics (beautiful, large)',
  ACADEMIC: 'Words for academic/formal writing (analyze, hypothesize)',
};

export function VocabularyCategorizer() {
  const [batchSize, setBatchSize] = useState(30);
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [result, setResult] = useState<CategorizationResult | null>(null);
  const [error, setError] = useState('');
  const [totalWords, setTotalWords] = useState<number | null>(null);
  const [categorizedWords, setCategorizedWords] = useState<number | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loadingCount, setLoadingCount] = useState(false);
  const [batchHistory, setBatchHistory] = useState<Array<{ word: string; category: string }>>([]);

  useEffect(() => {
    fetchWordCounts();
  }, []);

  const fetchWordCounts = async () => {
    if (!isSupabaseConfigured() || !supabase) return;

    setLoadingCount(true);
    try {
      const { count: total } = await supabase
        .from('vocabulary')
        .select('*', { count: 'exact', head: true });

      const { count: categorized } = await supabase
        .from('vocabulary')
        .select('*', { count: 'exact', head: true })
        .not('functional_category', 'is', null);

      if (total !== null) setTotalWords(total);
      if (categorized !== null) setCategorizedWords(categorized);

      // Fetch category counts
      const categories = ['OPINION', 'EMOTION', 'TRANSACTIONAL', 'SOCIAL', 'DESCRIPTIVE', 'ACADEMIC'];
      const counts: Record<string, number> = {};
      
      for (const category of categories) {
        const { count } = await supabase
          .from('vocabulary')
          .select('*', { count: 'exact', head: true })
          .eq('functional_category', category);
        counts[category] = count || 0;
      }
      
      setCategoryCounts(counts);
    } catch (err) {
      console.error('Failed to fetch word counts:', err);
    } finally {
      setLoadingCount(false);
    }
  };

  const handleCategorizeBatch = async () => {
    setIsCategorizing(true);
    setError('');

    try {
      const response = await fetch('/api/categorize-vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchSize,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to categorize vocabulary');
      }

      setResult(data);
      setTotalWords(data.totalWords);
      setCategorizedWords(data.categorizedWords);
      setCategoryCounts(data.categoryCounts || {});
      
      if (data.words && data.words.length > 0) {
        setBatchHistory(prev => [...data.words, ...prev].slice(0, 100));
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsCategorizing(false);
    }
  };

  const handleAutoCategorize = async () => {
    setIsAutoMode(true);
    setError('');
    setBatchHistory([]);

    while (true) {
      const data = await handleCategorizeBatch();
      
      if (!data || data.remainingWords === 0) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (!isAutoMode) break;
    }

    setIsAutoMode(false);
  };

  const stopAutoCategorize = () => {
    setIsAutoMode(false);
  };

  const progressPercentage = totalWords && categorizedWords !== null 
    ? Math.round((categorizedWords / totalWords) * 100) 
    : 0;

  const remainingWords = totalWords && categorizedWords !== null 
    ? totalWords - categorizedWords 
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tags className="h-5 w-5 text-indigo-500" />
          Categorize Vocabulary
        </CardTitle>
        <CardDescription>
          Classify vocabulary words into functional categories for Speaking Module filtering using Gemini AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categorization Progress</p>
              <p className="text-2xl font-bold text-indigo-600">
                {loadingCount ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    {categorizedWords?.toLocaleString() || '0'} / {totalWords?.toLocaleString() || '0'}
                  </>
                )}
              </p>
              {remainingWords !== null && remainingWords > 0 && (
                <p className="text-xs text-gray-500">{remainingWords.toLocaleString()} words remaining</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchWordCounts}
              disabled={loadingCount}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loadingCount ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-center text-gray-500">{progressPercentage}% complete</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(CATEGORY_COLORS).map(([category, colorClass]) => (
            <div key={category} className={`p-2 rounded-lg border ${colorClass}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{category}</span>
                <span className="text-sm font-bold">{categoryCounts[category] || 0}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="batchSize">Batch Size (words per request)</Label>
          <Input
            id="batchSize"
            type="number"
            min={1}
            max={50}
            value={batchSize}
            onChange={(e) => setBatchSize(Math.min(50, Math.max(1, parseInt(e.target.value) || 30)))}
            disabled={isCategorizing || isAutoMode}
          />
          <p className="text-xs text-gray-500">
            Recommended: 30 words per batch. Max: 50.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCategorizeBatch}
            disabled={isCategorizing || isAutoMode || remainingWords === 0}
            className="flex-1"
          >
            {isCategorizing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Categorizing...
              </>
            ) : (
              <>
                <Tags className="h-4 w-4 mr-2" />
                Categorize One Batch
              </>
            )}
          </Button>
          
          {!isAutoMode ? (
            <Button
              onClick={handleAutoCategorize}
              disabled={isCategorizing || remainingWords === 0}
              variant="secondary"
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Auto Categorize All
            </Button>
          ) : (
            <Button
              onClick={stopAutoCategorize}
              variant="destructive"
              className="flex-1"
            >
              <Pause className="h-4 w-4 mr-2" />
              Stop Auto
            </Button>
          )}
        </div>

        {isAutoMode && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Auto-categorizing in progress... Processing batches with 2-second delays. Click "Stop Auto" to pause.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && !error && (
          <Alert className={result.categorized > 0 ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}>
            <CheckCircle className={`h-4 w-4 ${result.categorized > 0 ? 'text-green-600' : 'text-blue-600'}`} />
            <AlertDescription>
              {result.message || (
                result.categorized > 0 
                  ? `Successfully categorized ${result.categorized} words!`
                  : 'All words are already categorized!'
              )}
              {result.errors && result.errors.length > 0 && (
                <span className="text-amber-600 ml-2">
                  ({result.errors.length} errors)
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {batchHistory.length > 0 && (
          <div className="space-y-2">
            <Label>Recently Categorized Words</Label>
            <div className="max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {batchHistory.map((item, index) => (
                  <Badge
                    key={`${item.word}-${index}`}
                    variant="outline"
                    className={CATEGORY_COLORS[item.category] || 'bg-gray-100'}
                  >
                    {item.word}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Functional Categories:</h4>
          <div className="space-y-2 text-sm">
            {Object.entries(CATEGORY_DESCRIPTIONS).map(([category, description]) => (
              <div key={category} className="flex items-start gap-2">
                <Badge variant="outline" className={`${CATEGORY_COLORS[category]} shrink-0`}>
                  {category}
                </Badge>
                <span className="text-gray-600">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
