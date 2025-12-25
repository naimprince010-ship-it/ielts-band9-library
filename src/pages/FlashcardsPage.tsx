import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/contexts/ProgressContext';
import { 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Brain,
  Flame,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
}

const STORAGE_KEY = 'ielts_flashcards';
const REVIEW_HISTORY_KEY = 'ielts_flashcard_history';

function getFlashcardsFromStorage(): Flashcard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFlashcardsToStorage(cards: Flashcard[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (e) {
    console.error('Failed to save flashcards:', e);
  }
}

function calculateNextReview(card: Flashcard, quality: number): Flashcard {
  let { interval, easeFactor, repetitions } = card;
  
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }
  
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);
  
  return {
    ...card,
    interval,
    easeFactor,
    repetitions,
    nextReview: nextReview.toISOString(),
    difficulty: quality >= 4 ? 'easy' : quality >= 3 ? 'medium' : 'hard'
  };
}

function getDueCards(cards: Flashcard[]): Flashcard[] {
  const now = new Date();
  return cards.filter(card => new Date(card.nextReview) <= now);
}

const SAMPLE_FLASHCARDS: Omit<Flashcard, 'nextReview' | 'interval' | 'easeFactor' | 'repetitions'>[] = [
  { id: 'f1', front: 'Ubiquitous', back: 'Present, appearing, or found everywhere', hint: 'Think: "everywhere"', category: 'vocabulary', difficulty: 'medium' },
  { id: 'f2', front: 'Ephemeral', back: 'Lasting for a very short time', hint: 'Think: "temporary"', category: 'vocabulary', difficulty: 'hard' },
  { id: 'f3', front: 'Stringent', back: 'Strict, precise, and exacting', hint: 'Think: "strict rules"', category: 'vocabulary', difficulty: 'medium' },
  { id: 'f4', front: 'Mitigate', back: 'Make less severe, serious, or painful', hint: 'Think: "reduce harm"', category: 'vocabulary', difficulty: 'medium' },
  { id: 'f5', front: 'Proliferate', back: 'Increase rapidly in number; multiply', hint: 'Think: "spread quickly"', category: 'vocabulary', difficulty: 'hard' },
  { id: 'f6', front: 'Conducive', back: 'Making a certain situation or outcome likely or possible', hint: 'Think: "helpful for"', category: 'vocabulary', difficulty: 'medium' },
  { id: 'f7', front: 'Detrimental', back: 'Tending to cause harm', hint: 'Think: "harmful"', category: 'vocabulary', difficulty: 'easy' },
  { id: 'f8', front: 'Exacerbate', back: 'Make (a problem, bad situation) worse', hint: 'Think: "worsen"', category: 'vocabulary', difficulty: 'hard' },
  { id: 'f9', front: 'Paradigm', back: 'A typical example or pattern of something; a model', hint: 'Think: "framework"', category: 'vocabulary', difficulty: 'hard' },
  { id: 'f10', front: 'Pragmatic', back: 'Dealing with things sensibly and realistically', hint: 'Think: "practical"', category: 'vocabulary', difficulty: 'medium' },
];

export default function FlashcardsPage() {
  const { getAllWrongQuestions, streakData } = useProgress();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dueCards, setDueCards] = useState<Flashcard[]>([]);
  const [reviewedToday, setReviewedToday] = useState(0);
  const [mode, setMode] = useState<'menu' | 'review' | 'complete'>('menu');
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = () => {
    let cards = getFlashcardsFromStorage();
    
    if (cards.length === 0) {
      const wrongQuestions = getAllWrongQuestions();
      const wrongCards: Flashcard[] = wrongQuestions.slice(0, 20).map((wq, index) => ({
        id: `wrong-${index}`,
        front: wq.question,
        back: wq.correctAnswer,
        hint: wq.hint,
        category: 'quiz-mistakes',
        difficulty: 'medium' as const,
        nextReview: new Date().toISOString(),
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0
      }));
      
      const sampleCards: Flashcard[] = SAMPLE_FLASHCARDS.map(card => ({
        ...card,
        nextReview: new Date().toISOString(),
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0
      }));
      
      cards = [...wrongCards, ...sampleCards];
      saveFlashcardsToStorage(cards);
    }
    
    setFlashcards(cards);
    setDueCards(getDueCards(cards));
    
    const today = new Date().toISOString().split('T')[0];
    const historyStr = localStorage.getItem(REVIEW_HISTORY_KEY);
    const history = historyStr ? JSON.parse(historyStr) : {};
    setReviewedToday(history[today] || 0);
  };

  const startReview = () => {
    const due = getDueCards(flashcards);
    if (due.length === 0) {
      setMode('complete');
      return;
    }
    setDueCards(due);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
    setMode('review');
  };

  const handleResponse = useCallback((quality: number) => {
    const currentCard = dueCards[currentIndex];
    const updatedCard = calculateNextReview(currentCard, quality);
    
    const updatedCards = flashcards.map(c => 
      c.id === currentCard.id ? updatedCard : c
    );
    setFlashcards(updatedCards);
    saveFlashcardsToStorage(updatedCards);
    
    setSessionStats(prev => ({
      correct: quality >= 3 ? prev.correct + 1 : prev.correct,
      incorrect: quality < 3 ? prev.incorrect + 1 : prev.incorrect,
      total: prev.total + 1
    }));
    
    const today = new Date().toISOString().split('T')[0];
    const historyStr = localStorage.getItem(REVIEW_HISTORY_KEY);
    const history = historyStr ? JSON.parse(historyStr) : {};
    history[today] = (history[today] || 0) + 1;
    localStorage.setItem(REVIEW_HISTORY_KEY, JSON.stringify(history));
    setReviewedToday(history[today]);
    
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setMode('complete');
    }
  }, [currentIndex, dueCards, flashcards]);

  const addWrongQuestionsAsFlashcards = () => {
    const wrongQuestions = getAllWrongQuestions();
    const existingIds = new Set(flashcards.map(f => f.id));
    
    const newCards: Flashcard[] = wrongQuestions
      .filter((_, index) => !existingIds.has(`wrong-${index}`))
      .slice(0, 10)
      .map((wq, index) => ({
        id: `wrong-new-${Date.now()}-${index}`,
        front: wq.question,
        back: wq.correctAnswer,
        hint: wq.hint,
        category: 'quiz-mistakes',
        difficulty: 'medium' as const,
        nextReview: new Date().toISOString(),
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0
      }));
    
    if (newCards.length > 0) {
      const updatedCards = [...flashcards, ...newCards];
      setFlashcards(updatedCards);
      saveFlashcardsToStorage(updatedCards);
      setDueCards(getDueCards(updatedCards));
    }
  };

  const currentCard = dueCards[currentIndex];
  const progress = dueCards.length > 0 ? ((currentIndex + 1) / dueCards.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {mode === 'menu' && (
          <div className="space-y-6">
            <Card className="border-2 border-amber-100">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-2xl">Spaced Repetition Flashcards</CardTitle>
                <CardDescription>
                  Review vocabulary with scientifically-proven spaced repetition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-blue-600">{dueCards.length}</p>
                    <p className="text-sm text-gray-600">Cards Due Today</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-600">{reviewedToday}</p>
                    <p className="text-sm text-gray-600">Reviewed Today</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 p-3 bg-orange-50 rounded-lg">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">{streakData.currentStreak} day streak</span>
                  {streakData.longestStreak > 0 && (
                    <span className="text-sm text-gray-500">
                      (Best: {streakData.longestStreak})
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={startReview} 
                    className="w-full" 
                    size="lg"
                    disabled={dueCards.length === 0}
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    {dueCards.length > 0 
                      ? `Start Review (${dueCards.length} cards)`
                      : 'No Cards Due'}
                  </Button>
                  
                  <Button 
                    onClick={addWrongQuestionsAsFlashcards} 
                    variant="outline"
                    className="w-full"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Add Quiz Mistakes as Flashcards
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Your Flashcard Stats</h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xl font-bold">{flashcards.length}</p>
                      <p className="text-xs text-gray-500">Total Cards</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xl font-bold text-green-600">
                        {flashcards.filter(c => c.difficulty === 'easy').length}
                      </p>
                      <p className="text-xs text-gray-500">Mastered</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-xl font-bold text-red-600">
                        {flashcards.filter(c => c.difficulty === 'hard').length}
                      </p>
                      <p className="text-xs text-gray-500">Needs Work</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">How Spaced Repetition Works</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Cards you know well appear less frequently</li>
                    <li>• Difficult cards appear more often</li>
                    <li>• Review daily for best results</li>
                    <li>• Your quiz mistakes are automatically added</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {mode === 'review' && currentCard && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{currentCard.category}</Badge>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {currentIndex + 1} / {dueCards.length}
                </span>
              </div>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <div 
              className="perspective-1000 cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`relative transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <Card className={`min-h-[300px] ${isFlipped ? 'hidden' : ''}`}>
                  <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] p-8">
                    <Badge className="mb-4" variant={
                      currentCard.difficulty === 'easy' ? 'default' :
                      currentCard.difficulty === 'medium' ? 'secondary' : 'destructive'
                    }>
                      {currentCard.difficulty}
                    </Badge>
                    <h2 className="text-2xl font-bold text-center mb-4">{currentCard.front}</h2>
                    {currentCard.hint && (
                      <p className="text-sm text-gray-500 italic">Hint: {currentCard.hint}</p>
                    )}
                    <p className="text-sm text-gray-400 mt-6">Tap to reveal answer</p>
                  </CardContent>
                </Card>
                
                <Card className={`min-h-[300px] ${!isFlipped ? 'hidden' : ''}`}>
                  <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] p-8">
                    <CheckCircle2 className="h-8 w-8 text-green-500 mb-4" />
                    <h2 className="text-xl font-medium text-center text-green-700">{currentCard.back}</h2>
                    <p className="text-sm text-gray-400 mt-6">How well did you know this?</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {isFlipped && (
              <div className="space-y-3">
                <p className="text-center text-sm text-gray-600">Rate your recall:</p>
                <div className="grid grid-cols-4 gap-2">
                  <Button 
                    variant="outline" 
                    className="flex flex-col py-4 border-red-200 hover:bg-red-50 hover:border-red-300"
                    onClick={() => handleResponse(1)}
                  >
                    <ThumbsDown className="h-5 w-5 text-red-500 mb-1" />
                    <span className="text-xs">Again</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex flex-col py-4 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                    onClick={() => handleResponse(2)}
                  >
                    <span className="text-lg mb-1">😕</span>
                    <span className="text-xs">Hard</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex flex-col py-4 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => handleResponse(3)}
                  >
                    <span className="text-lg mb-1">🙂</span>
                    <span className="text-xs">Good</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex flex-col py-4 border-green-200 hover:bg-green-50 hover:border-green-300"
                    onClick={() => handleResponse(5)}
                  >
                    <ThumbsUp className="h-5 w-5 text-green-500 mb-1" />
                    <span className="text-xs">Easy</span>
                  </Button>
                </div>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setMode('menu')}
            >
              Exit Review
            </Button>
          </div>
        )}

        {mode === 'complete' && (
          <Card className="border-2 border-green-100">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Review Complete!</CardTitle>
              <CardDescription>Great job on your flashcard review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{sessionStats.correct}</p>
                  <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</p>
                  <p className="text-sm text-gray-600">Needs Review</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{sessionStats.total}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
              
              {sessionStats.total > 0 && (
                <div className="p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Accuracy</span>
                    <span className="text-lg font-bold">
                      {Math.round((sessionStats.correct / sessionStats.total) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(sessionStats.correct / sessionStats.total) * 100} 
                    className="h-2"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 p-3 bg-orange-50 rounded-lg">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-medium">
                  {reviewedToday} cards reviewed today
                </span>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    loadFlashcards();
                    setMode('menu');
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Back to Menu
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    loadFlashcards();
                    startReview();
                  }}
                  disabled={getDueCards(flashcards).length === 0}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
