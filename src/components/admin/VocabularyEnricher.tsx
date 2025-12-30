import { useState, useEffect } from 'react';
import { Loader2, Sparkles, RefreshCw, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface EnrichmentResult {
  success: boolean;
  enriched: number;
  totalWords: number;
  enrichedWords: number;
  remainingWords: number;
  words: string[];
  errors?: string[];
  message?: string;
}

export function VocabularyEnricher() {
  const [batchSize, setBatchSize] = useState(15);
  const [isEnriching, setIsEnriching] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [result, setResult] = useState<EnrichmentResult | null>(null);
  const [error, setError] = useState('');
  const [totalWords, setTotalWords] = useState<number | null>(null);
  const [enrichedWords, setEnrichedWords] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);
  const [batchHistory, setBatchHistory] = useState<string[]>([]);

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

      const { count: enriched } = await supabase
        .from('vocabulary')
        .select('*', { count: 'exact', head: true })
        .eq('is_enriched', true);

      if (total !== null) setTotalWords(total);
      if (enriched !== null) setEnrichedWords(enriched);
    } catch (err) {
      console.error('Failed to fetch word counts:', err);
    } finally {
      setLoadingCount(false);
    }
  };

  const handleEnrichBatch = async () => {
    setIsEnriching(true);
    setError('');

    try {
      const response = await fetch('/api/enrich-vocabulary', {
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
        throw new Error(data.error || 'Failed to enrich vocabulary');
      }

      setResult(data);
      setTotalWords(data.totalWords);
      setEnrichedWords(data.enrichedWords);
      
      if (data.words && data.words.length > 0) {
        setBatchHistory(prev => [...data.words, ...prev].slice(0, 100));
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsEnriching(false);
    }
  };

  const handleAutoEnrich = async () => {
    setIsAutoMode(true);
    setError('');
    setBatchHistory([]);

    while (true) {
      const data = await handleEnrichBatch();
      
      if (!data || data.remainingWords === 0) {
        break;
      }

      // Wait 3 seconds between batches
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Check if auto mode was stopped
      if (!isAutoMode) break;
    }

    setIsAutoMode(false);
  };

  const stopAutoEnrich = () => {
    setIsAutoMode(false);
  };

  const progressPercentage = totalWords && enrichedWords !== null 
    ? Math.round((enrichedWords / totalWords) * 100) 
    : 0;

  const remainingWords = totalWords && enrichedWords !== null 
    ? totalWords - enrichedWords 
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Enrich Vocabulary
        </CardTitle>
        <CardDescription>
          Add Bangla meanings, synonyms, antonyms, collocations, word families, and example sentences to vocabulary words using AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Enrichment Progress</p>
              <p className="text-2xl font-bold text-amber-600">
                {loadingCount ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    {enrichedWords?.toLocaleString() || '0'} / {totalWords?.toLocaleString() || '0'}
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

        {/* Batch Size Control */}
        <div className="space-y-2">
          <Label htmlFor="batchSize">Batch Size (words per request)</Label>
          <Input
            id="batchSize"
            type="number"
            min={1}
            max={20}
            value={batchSize}
            onChange={(e) => setBatchSize(Math.min(20, Math.max(1, parseInt(e.target.value) || 15)))}
            disabled={isEnriching || isAutoMode}
          />
          <p className="text-xs text-gray-500">
            Recommended: 15 words per batch. Max: 20.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleEnrichBatch}
            disabled={isEnriching || isAutoMode || remainingWords === 0}
            className="flex-1"
          >
            {isEnriching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enriching...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Enrich One Batch
              </>
            )}
          </Button>
          
          {!isAutoMode ? (
            <Button
              onClick={handleAutoEnrich}
              disabled={isEnriching || remainingWords === 0}
              variant="secondary"
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Auto Enrich All
            </Button>
          ) : (
            <Button
              onClick={stopAutoEnrich}
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
              Auto-enriching in progress... Processing batches with 3-second delays. Click "Stop Auto" to pause.
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
          <Alert className={result.enriched > 0 ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}>
            <CheckCircle className={`h-4 w-4 ${result.enriched > 0 ? 'text-green-600' : 'text-blue-600'}`} />
            <AlertDescription>
              {result.message || (
                result.enriched > 0 
                  ? `Successfully enriched ${result.enriched} words!`
                  : 'All words are already enriched!'
              )}
              {result.errors && result.errors.length > 0 && (
                <span className="text-amber-600 ml-2">
                  ({result.errors.length} errors)
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Recently Enriched Words */}
        {batchHistory.length > 0 && (
          <div className="space-y-2">
            <Label>Recently Enriched Words</Label>
            <div className="max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {batchHistory.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* What Gets Added */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">What gets added to each word:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>- <strong>Bangla Meaning:</strong> Bengali translation and meaning</li>
            <li>- <strong>Synonyms:</strong> ALL possible English synonyms</li>
            <li>- <strong>Antonyms:</strong> ALL possible English antonyms</li>
            <li>- <strong>Collocations:</strong> Common word combinations</li>
            <li>- <strong>Word Family:</strong> Noun, verb, adjective, adverb forms</li>
            <li>- <strong>Example Sentence:</strong> IELTS-appropriate usage example</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
