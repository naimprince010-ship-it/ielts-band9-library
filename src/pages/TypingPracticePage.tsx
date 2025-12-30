import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Keyboard, 
  RotateCcw, 
  Target, 
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

interface WordStatus {
  text: string;
  status: 'pending' | 'current' | 'correct' | 'incorrect';
}

export default function TypingPracticePage() {
  const [words, setWords] = useState<WordStatus[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const hasFetchedMoreRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchWords = useCallback(async (append = false) => {
    if (append) {
      if (isFetchingMore || hasFetchedMoreRef.current) return;
      setIsFetchingMore(true);
      hasFetchedMoreRef.current = true;
    } else {
      setIsLoading(true);
    }

    try {
      const response = await fetch('/api/typing-words');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch words');
      }

      if (data.words && data.words.length > 0) {
        const newWords: WordStatus[] = data.words.map((word: string) => ({
          text: word,
          status: 'pending' as const
        }));

        if (append) {
          setWords(prev => [...prev, ...newWords]);
        } else {
          newWords[0].status = 'current';
          setWords(newWords);
        }
        setError(null);
      } else if (!append) {
        setError('No vocabulary words available. Please add words in the Admin Panel first.');
      }
    } catch (err) {
      console.error('Error fetching words:', err);
      if (!append) {
        setError(err instanceof Error ? err.message : 'Failed to fetch words');
      }
    } finally {
      if (append) {
        setIsFetchingMore(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [isFetchingMore]);

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (isStarted && startTime) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, startTime]);

  useEffect(() => {
    const remainingWords = words.length - currentIndex;
    if (remainingWords <= 10 && remainingWords > 0 && !hasFetchedMoreRef.current && isStarted) {
      fetchWords(true);
    }
  }, [currentIndex, words.length, isStarted, fetchWords]);

  useEffect(() => {
    if (wordsContainerRef.current && currentIndex > 0) {
      const currentWordElement = wordsContainerRef.current.querySelector('[data-current="true"]');
      if (currentWordElement) {
        currentWordElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }
  }, [currentIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      
      if (!isStarted) {
        setIsStarted(true);
        setStartTime(Date.now());
      }

      const trimmedInput = inputValue.trim().toLowerCase();
      const currentWord = words[currentIndex]?.text.toLowerCase();

      if (trimmedInput === '') return;

      const isCorrect = trimmedInput === currentWord;

      setWords(prev => {
        const updated = [...prev];
        updated[currentIndex] = {
          ...updated[currentIndex],
          status: isCorrect ? 'correct' : 'incorrect'
        };
        if (currentIndex + 1 < updated.length) {
          updated[currentIndex + 1] = {
            ...updated[currentIndex + 1],
            status: 'current'
          };
        }
        return updated;
      });

      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
      } else {
        setIncorrectCount(prev => prev + 1);
      }

      setCurrentIndex(prev => prev + 1);
      setInputValue('');

      if (currentIndex + 1 >= words.length - 10) {
        hasFetchedMoreRef.current = false;
      }
    }
  };

  const resetPractice = () => {
    setWords([]);
    setCurrentIndex(0);
    setInputValue('');
    setCorrectCount(0);
    setIncorrectCount(0);
    setStartTime(null);
    setIsStarted(false);
    setElapsedTime(0);
    hasFetchedMoreRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    fetchWords();
    inputRef.current?.focus();
  };

  const calculateWPM = () => {
    if (!startTime || elapsedTime === 0) return 0;
    const minutes = elapsedTime / 60;
    return Math.round(correctCount / minutes) || 0;
  };

  const calculateAccuracy = () => {
    const total = correctCount + incorrectCount;
    if (total === 0) return 100;
    return Math.round((correctCount / total) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading vocabulary words...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Words</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => fetchWords()} className="bg-indigo-600 hover:bg-indigo-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Keyboard className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Typing Practice</h1>
          </div>
          <p className="text-gray-600">
            Improve your typing speed while learning IELTS vocabulary
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-500">WPM</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{calculateWPM()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Target className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-500">Accuracy</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{calculateAccuracy()}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-500">Correct</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{correctCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-500">Time</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatTime(elapsedTime)}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Words</CardTitle>
              <div className="flex items-center gap-2">
                {isFetchingMore && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Loading more...
                  </Badge>
                )}
                <Badge variant="outline">
                  {currentIndex} / {words.length} words
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              ref={wordsContainerRef}
              className="bg-gray-50 rounded-lg p-6 min-h-[120px] max-h-[200px] overflow-y-auto mb-4"
            >
              <div className="flex flex-wrap gap-2 leading-relaxed">
                {words.map((word, index) => {
                  const isCurrent = index === currentIndex;
                  let className = 'px-2 py-1 rounded text-lg font-mono transition-all duration-200 ';
                  
                  if (word.status === 'correct') {
                    className += 'bg-green-100 text-green-700';
                  } else if (word.status === 'incorrect') {
                    className += 'bg-red-100 text-red-700 line-through';
                  } else if (isCurrent) {
                    className += 'bg-blue-500 text-white font-bold scale-110';
                  } else {
                    className += 'text-gray-400';
                  }

                  return (
                    <span 
                      key={`${word.text}-${index}`}
                      className={className}
                      data-current={isCurrent}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isStarted ? "Type the highlighted word..." : "Start typing to begin..."}
                className="flex-1 text-lg font-mono h-12"
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <Button 
                onClick={resetPractice}
                variant="outline"
                className="h-12 px-6"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-3 text-center">
              Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Space</kbd> or <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Enter</kbd> after typing each word
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">How to Practice</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">1.</span>
                <span>Focus on the <span className="bg-blue-500 text-white px-1 rounded text-xs">highlighted word</span> in the word stream</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">2.</span>
                <span>Type the word in the input box below</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">3.</span>
                <span>Press Space or Enter to submit and move to the next word</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">4.</span>
                <span>Words turn <span className="text-green-600 font-medium">green</span> if correct, <span className="text-red-600 font-medium">red</span> if incorrect</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">5.</span>
                <span>New words load automatically as you progress - practice infinitely!</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
