import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useNavConfig } from '@/contexts/NavContext';
import {
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Brain,
  Flame,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Cloud,
  CloudOff,
  Shuffle,
  FlipHorizontal,
  Calendar,
  TrendingUp,
  Settings,
  Layers,
  Target,
  Star,
  RefreshCw,
  ClipboardList,
  Lightbulb,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  MousePointerClick
} from 'lucide-react';

/**
 * The Shuffle/Flip/Reset buttons this page publishes into NavContext as
 * `actions` while a review session is active. Styled for the light Navbar
 * background (unlike LessonHeaderActions, which is styled for the navy
 * LessonWorkspaceHeader) — same idea, different skin, because this page
 * renders through the plain Navbar, not a lesson template.
 */
function FlashcardsHeaderActions({
  onShuffle,
  onFlip,
  onReset,
}: {
  onShuffle: () => void;
  onFlip: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onShuffle}
        aria-label="Shuffle remaining cards"
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/70 transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <Shuffle className="h-4 w-4" />
        <span className="hidden sm:inline">Shuffle</span>
      </button>
      <button
        type="button"
        onClick={onFlip}
        aria-label="Flip the current card"
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/70 transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <FlipHorizontal className="h-4 w-4" />
        <span className="hidden sm:inline">Flip</span>
      </button>
      <button
        type="button"
        onClick={onReset}
        aria-label="Restart this review session"
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/70 transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <RotateCcw className="h-4 w-4" />
        <span className="hidden sm:inline">Reset</span>
      </button>
    </div>
  );
}

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
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dueCards, setDueCards] = useState<Flashcard[]>([]);
  const [reviewedToday, setReviewedToday] = useState(0);
  const [mode, setMode] = useState<'menu' | 'review' | 'complete'>('menu');
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [isSynced, setIsSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [bookmarkAdded, setBookmarkAdded] = useState(false);

  useEffect(() => {
    loadFlashcards();
  }, [user]);

    const loadFlashcards = async () => {
      if (user && isSupabaseConfigured() && supabase) {
        setSyncing(true);
        try {
          const today = new Date();
          const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
          const { data: srsItems, error } = await supabase
            .from('srs_items')
            .select('*')
            .eq('user_id', user.id)
            .eq('suspended', false);

          if (!error && srsItems && srsItems.length > 0) {
            const cards: Flashcard[] = srsItems.map(item => ({
              id: item.id,
              front: item.front,
              back: item.back,
              hint: item.hint || undefined,
              category: item.category || 'vocabulary',
              difficulty: item.level >= 4 ? 'easy' as const : item.level >= 2 ? 'medium' as const : 'hard' as const,
              nextReview: item.due_date,
              interval: item.interval_days,
              easeFactor: parseFloat(item.ease_factor) || 2.5,
              repetitions: item.repetitions
            }));
          
            setFlashcards(cards);
            setDueCards(cards.filter(c => c.nextReview <= todayStr));
            setIsSynced(true);
            setSyncing(false);
          
            const historyStr = localStorage.getItem(REVIEW_HISTORY_KEY);
            const history = historyStr ? JSON.parse(historyStr) : {};
            setReviewedToday(history[todayStr] || 0);
            return;
          }
        } catch (err) {
          console.log('Error loading from Supabase, falling back to localStorage:', err);
        }
        setSyncing(false);
      }
    
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
      
        if (user && isSupabaseConfigured() && supabase) {
          syncCardsToSupabase(cards);
        }
      }
    
      setFlashcards(cards);
      setDueCards(getDueCards(cards));
    
      const today = new Date().toISOString().split('T')[0];
      const historyStr = localStorage.getItem(REVIEW_HISTORY_KEY);
      const history = historyStr ? JSON.parse(historyStr) : {};
      setReviewedToday(history[today] || 0);
    };

    const syncCardsToSupabase = async (cards: Flashcard[]) => {
      if (!user || !isSupabaseConfigured() || !supabase) return;
    
      try {
        const srsItems = cards.map(card => ({
          user_id: user.id,
          content_type: 'custom',
          content_id: card.id,
          front: card.front,
          back: card.back,
          hint: card.hint || null,
          category: card.category,
          level: card.difficulty === 'easy' ? 4 : card.difficulty === 'medium' ? 2 : 0,
          due_date: card.nextReview.split('T')[0],
          ease_factor: card.easeFactor,
          interval_days: card.interval,
          repetitions: card.repetitions,
        }));

        await supabase.from('srs_items').upsert(srsItems, { 
          onConflict: 'user_id,content_type,content_id' 
        });
        setIsSynced(true);
      } catch (err) {
        console.log('Error syncing to Supabase:', err);
      }
    };

  // Wrapped in useCallback (it wasn't before) so it has a stable identity —
  // it's now also used as the Reset action published into NavContext, and
  // an identity that changes every render would republish that action (and
  // re-render whichever header renders it) on every unrelated re-render.
  const startReview = useCallback(() => {
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
  }, [flashcards]);

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

      // Sync to Supabase in the background
      if (user && isSupabaseConfigured() && supabase) {
        (async () => {
          try {
            const newLevel = quality >= 3 ? Math.min((currentCard.repetitions || 0) + 1, 5) : 0;
            const intervals = [0, 1, 3, 7, 14, 30];
            const newDueDate = new Date();
            newDueDate.setDate(newDueDate.getDate() + intervals[newLevel]);
            const dueDateStr = `${newDueDate.getFullYear()}-${String(newDueDate.getMonth() + 1).padStart(2, '0')}-${String(newDueDate.getDate()).padStart(2, '0')}`;
          
            await supabase.from('srs_items').update({
              level: newLevel,
              due_date: dueDateStr,
              ease_factor: updatedCard.easeFactor,
              interval_days: updatedCard.interval,
              repetitions: updatedCard.repetitions,
              last_reviewed_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }).eq('id', currentCard.id);
          
            await supabase.from('srs_reviews').insert({
              srs_item_id: currentCard.id,
              user_id: user.id,
              quality: quality,
              prev_level: currentCard.repetitions || 0,
              next_level: newLevel,
              prev_interval: currentCard.interval,
              next_interval: updatedCard.interval
            });
          } catch (err) {
            console.log('Error syncing review to Supabase:', err);
          }
        })();
      }
    }, [currentIndex, dueCards, flashcards, user]);

  const addWrongQuestionsAsFlashcards = async () => {
    const wrongQuestions = getAllWrongQuestions();

    if (wrongQuestions.length === 0) {
      toast.info('No quiz mistakes found yet', {
        description: 'Complete some quizzes first — wrong answers will automatically appear here.',
      });
      return;
    }

    // Use questionId as the flashcard ID to reliably detect duplicates
    const existingIds = new Set(flashcards.map(f => f.id));

    const newCards: Flashcard[] = wrongQuestions
      .filter(wq => !existingIds.has(wq.questionId))
      .slice(0, 20)
      .map(wq => ({
        id: wq.questionId,
        front: wq.question,
        back: wq.correctAnswer,
        hint: wq.hint,
        category: 'quiz-mistakes',
        difficulty: 'medium' as const,
        nextReview: new Date().toISOString(),
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
      }));

    if (newCards.length === 0) {
      toast.success('All quiz mistakes already added!', {
        description: `You have ${wrongQuestions.length} mistake(s) — all are already in your flashcard deck.`,
      });
      return;
    }

    const updatedCards = [...flashcards, ...newCards];
    setFlashcards(updatedCards);
    saveFlashcardsToStorage(updatedCards);
    setDueCards(getDueCards(updatedCards));

    // Sync to Supabase if logged in
    if (user && isSupabaseConfigured() && supabase) {
      try {
        const srsItems = newCards.map(card => ({
          user_id: user.id,
          content_type: 'quiz-mistake',
          content_id: card.id,
          front: card.front,
          back: card.back,
          hint: card.hint || null,
          category: card.category,
          level: 0,
          due_date: new Date().toISOString().split('T')[0],
          ease_factor: card.easeFactor,
          interval_days: card.interval,
          repetitions: card.repetitions,
        }));
        await supabase.from('srs_items').upsert(srsItems, {
          onConflict: 'user_id,content_type,content_id',
        });
      } catch (err) {
        console.log('Error syncing quiz mistakes to Supabase:', err);
      }
    }

    toast.success(`${newCards.length} flashcard${newCards.length > 1 ? 's' : ''} added!`, {
      description: `Quiz mistakes added to your deck. ${getDueCards(updatedCards).length} cards due today.`,
    });
  };

  const currentCard = dueCards[currentIndex];
  const progress = dueCards.length > 0 ? ((currentIndex + 1) / dueCards.length) * 100 : 0;

  const goToPreviousCard = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev === 0) return 0;
      return prev - 1;
    });
    setIsFlipped(false);
  }, []);

  const goToNextCard = useCallback(() => {
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      return;
    }
    setMode('complete');
  }, [currentIndex, dueCards.length]);

  // ── Nav context — 'tool' mode ─────────────────────────────────────────────
  // Shuffle re-orders the remaining due cards in place (Fisher–Yates) and
  // jumps back to the first one, unflipped. Flip toggles the current card —
  // named "Flip", not "Flip All", since only one card is ever on screen at
  // a time here; "All" would misdescribe what actually happens. Reset reuses
  // startReview() itself, so it's the same "start a fresh session" logic the
  // menu's Start Review button already uses — no separate reset code path.
  const shuffleDueCards = useCallback(() => {
    setDueCards(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const flipCurrentCard = useCallback(() => setIsFlipped(f => !f), []);

  const navActions = useMemo(
    () =>
      mode === 'review' ? (
        <FlashcardsHeaderActions onShuffle={shuffleDueCards} onFlip={flipCurrentCard} onReset={startReview} />
      ) : undefined,
    [mode, shuffleDueCards, flipCurrentCard, startReview]
  );

  useNavConfig({ mode: 'tool', title: 'Flashcards', actions: navActions });

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-4 sm:py-8 font-sans">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 max-w-[1100px]">
        {mode === 'menu' && (
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 lg:p-8">
            
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 mb-8">
              <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="h-8 w-8 text-indigo-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                  Spaced Repetition<br className="hidden sm:block" /> Flashcards
                </h1>
                <p className="text-slate-500 text-base sm:text-lg mb-6 max-w-md">
                  Review vocabulary with scientifically-proven spaced repetition
                </p>
                
                {/* Actions moved up */}
                <div className="w-full max-w-sm space-y-3 mb-6">
                  <Button 
                    onClick={startReview} 
                    className="w-full bg-[#5b21b6] hover:bg-[#4c1d95] text-white rounded-full h-12 sm:h-14 text-base sm:text-lg font-medium shadow-lg shadow-purple-900/20" 
                    disabled={dueCards.length === 0}
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    {dueCards.length > 0 ? `Start Review (${dueCards.length})` : 'No Cards Due'}
                    {dueCards.length > 0 && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    onClick={addWrongQuestionsAsFlashcards} 
                    variant="outline"
                    className="w-full rounded-full h-12 sm:h-12 text-indigo-600 border-indigo-200 hover:bg-indigo-50 text-sm font-medium"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Add Quiz Mistakes
                  </Button>
                </div>

                {user && (
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    {syncing ? (
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                        <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> Syncing...
                      </div>
                    ) : isSynced ? (
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                        <Cloud className="h-3 w-3 sm:h-4 sm:w-4" /> Synced
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                        <CloudOff className="h-3 w-3 sm:h-4 sm:w-4" /> Local only
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Stacked Cards Graphic */}
              <div className="lg:w-1/2 relative h-48 sm:h-56 w-full max-w-[280px] sm:max-w-[320px] mx-auto flex items-center justify-center mt-4 lg:mt-0 transform scale-75 sm:scale-90 lg:scale-100 lg:origin-right">
                {/* Decorative dots background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                {/* Bottom Card (Yellowish) */}
                <div className="absolute w-40 sm:w-48 h-48 sm:h-56 bg-[#fde68a] rounded-2xl shadow-sm rotate-[15deg] translate-x-8 sm:translate-x-12 translate-y-4"></div>
                
                {/* Middle Card (Greenish) */}
                <div className="absolute w-40 sm:w-48 h-48 sm:h-56 bg-[#bbf7d0] rounded-2xl shadow-md rotate-[5deg] translate-x-4 sm:translate-x-6 translate-y-2"></div>
                
                {/* Top Card (White) */}
                <div className="absolute w-40 sm:w-48 h-48 sm:h-56 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-4 sm:p-6 -rotate-[-5deg] -translate-x-2 border border-slate-100 z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-indigo-600" />
                  </div>
                  <div className="font-semibold text-slate-800 text-sm sm:text-base mb-3 sm:mb-4">Vocabulary</div>
                  <div className="w-full space-y-1.5 sm:space-y-2">
                    <div className="w-full h-1.5 sm:h-2 bg-slate-100 rounded-full"></div>
                    <div className="w-4/5 h-1.5 sm:h-2 bg-slate-100 rounded-full"></div>
                    <div className="w-2/3 h-1.5 sm:h-2 bg-slate-100 rounded-full"></div>
                  </div>
                </div>

                <div className="absolute -right-2 sm:-right-4 bottom-4 sm:bottom-8 w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 z-20">
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#f0f4ff] rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 mb-2 shadow-sm">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{dueCards.length}</div>
                <div className="text-sm font-medium text-slate-700">Cards Due</div>
              </div>
              <div className="bg-[#f0fdf4] rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-500 mb-2 shadow-sm">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">{reviewedToday}</div>
                <div className="text-sm font-medium text-slate-700">Reviewed Today</div>
              </div>
              <div className="bg-[#fff7ed] rounded-2xl p-5 flex flex-col items-center justify-center text-center border border-orange-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500 mb-2 shadow-sm">
                  <Flame className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">{streakData.currentStreak}</div>
                <div className="text-sm font-medium text-slate-700">Day Streak</div>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">Your Flashcard Stats</h3>
                <Link to="/profile" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> View All Stats
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                    <Layers className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">{flashcards.length}</div>
                    <div className="text-sm font-medium text-slate-700">Total Cards</div>
                    <div className="text-xs text-slate-500 mt-0.5">All flashcards created</div>
                  </div>
                </div>
                <div className="bg-[#f0fdf4] rounded-2xl p-5 border border-green-50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100/50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{flashcards.filter(c => c.difficulty === 'easy').length}</div>
                    <div className="text-sm font-medium text-slate-700">Mastered</div>
                    <div className="text-xs text-slate-500 mt-0.5">Cards you know well</div>
                  </div>
                </div>
                <div className="bg-[#fff1f2] rounded-2xl p-5 border border-rose-50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100/50 rounded-xl flex items-center justify-center text-rose-500 shrink-0">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-600">{flashcards.filter(c => c.difficulty === 'hard').length}</div>
                    <div className="text-sm font-medium text-slate-700">Needs Work</div>
                    <div className="text-xs text-slate-500 mt-0.5">Keep reviewing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-6">How Spaced Repetition Works</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-500 shadow-sm mb-4">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2">Smart Scheduling</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Cards you know well appear less frequently</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm mb-4">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2">Focus on Difficult</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Hard cards appear more often</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 shadow-sm mb-4">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2">Daily Review</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Quick daily reviews give the best results</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm mb-4">
                    <Settings className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2">Automatic Learning</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Your quiz mistakes are automatically added</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {mode === 'review' && currentCard && (
          <div className="mx-auto w-full max-w-[1100px] px-0 sm:px-2">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700 sm:text-[11px]">
                {currentCard.category}
              </span>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
                <Clock className="h-4 w-4" />
                <span>{currentIndex + 1} / {dueCards.length}</span>
              </div>
            </div>

            <div className="mb-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 sm:mb-6">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600 transition-all duration-250 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mx-auto max-w-[1000px] rounded-[22px] border border-violet-200/90 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.12),_transparent_40%)] p-2 shadow-[0_30px_80px_rgba(106,93,154,0.12)] sm:rounded-[30px] sm:p-3 lg:p-5">
              <div className="rounded-[18px] border border-violet-200/80 bg-white p-4 shadow-[0_18px_40px_rgba(124,92,255,0.08)] sm:rounded-[28px] sm:p-5 lg:p-6">
                {!isFlipped ? (
                  <>
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 shadow-inner shadow-violet-200/60 sm:mb-4 sm:h-14 sm:w-14">
                      <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <div className="flex justify-center">
                      <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-600 sm:text-[11px]">
                        {currentCard.difficulty.toUpperCase()}
                      </span>
                    </div>

                    <h2 className="mt-3 text-center text-[clamp(1.5rem,4vw,3.2rem)] font-black tracking-[-0.06em] text-slate-900 leading-[1.05] sm:mt-5">
                      Complete the collocation:
                    </h2>

                    <div className="mt-4 flex items-center justify-center gap-2 text-[clamp(1.8rem,6vw,3.6rem)] font-black tracking-[-0.05em] text-slate-800 leading-none sm:mt-5 sm:gap-3">
                      <span className="text-slate-900">“</span>
                      <span className="inline-block min-w-[72px] border-b-[3px] border-violet-300 bg-violet-50/80 px-2 py-1 text-violet-600 shadow-[inset_0_-2px_0_rgba(139,92,246,0.18)] sm:min-w-[120px]">
                        &nbsp;
                      </span>
                      <span className="text-slate-900">diet”</span>
                    </div>

                    {currentCard.hint && (
                      <div className="mt-5 flex justify-center sm:mt-6">
                        <div className="inline-flex max-w-2xl items-center justify-center gap-2 rounded-full bg-violet-50 px-3 py-2 text-center text-[11px] text-slate-600 sm:px-4 sm:text-sm md:text-base">
                          <Lightbulb className="h-4 w-4 flex-shrink-0 text-violet-500" />
                          <span>
                            Hint: This is a common IELTS collocation related to{' '}
                            <span className="font-semibold text-violet-600">Health</span>
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsFlipped(true)}
                      className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-violet-200 bg-violet-50/60 px-4 py-3 text-violet-700 transition-all duration-200 hover:border-violet-300 hover:bg-violet-100/80 hover:shadow-[0_8px_20px_rgba(139,92,246,0.08)] focus:outline-none focus:ring-2 focus:ring-violet-300 sm:mt-6 sm:py-4"
                    >
                      <MousePointerClick className="h-5 w-5" />
                      <span className="flex flex-col items-center text-left">
                        <span className="text-base font-semibold sm:text-lg sm:text-xl">Tap to reveal answer</span>
                        <span className="text-xs text-violet-600/80 sm:text-sm">Test your knowledge first!</span>
                      </span>
                    </button>
                  </>
                ) : (
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center sm:min-h-[280px] md:min-h-[320px]">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner shadow-emerald-200/60 sm:h-14 sm:w-14">
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 sm:text-[11px]">
                      Answer
                    </p>
                    <h3 className="text-[clamp(1.6rem,5vw,3.6rem)] font-black tracking-[-0.05em] text-slate-900 leading-none">
                      {currentCard.back}
                    </h3>
                    <p className="mt-3 text-sm text-slate-500 sm:mt-4 sm:text-base">How well did you know this?</p>
                  </div>
                )}

                <div className="mt-5 flex flex-col gap-3 lg:mt-6 lg:flex-row lg:items-center lg:justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 transition-all duration-200 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    Need a hint?
                  </button>

                  <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-[560px]">
                    <Button
                      variant="outline"
                      className="h-12 border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-100 hover:border-emerald-300 sm:text-sm"
                      onClick={() => handleResponse(5)}
                    >
                      <span className="mr-2 text-base">✓</span>
                      I knew this
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 border-amber-200 bg-amber-50 text-xs font-semibold text-amber-700 transition-all duration-200 hover:bg-amber-100 hover:border-amber-300 sm:text-sm"
                      onClick={() => handleResponse(3)}
                    >
                      <span className="mr-2 text-base">−</span>
                      Not sure
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 transition-all duration-200 hover:bg-rose-100 hover:border-rose-300 sm:text-sm"
                      onClick={() => handleResponse(1)}
                    >
                      <span className="mr-2 text-base">✕</span>
                      I didn't know
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 rounded-[20px] border border-violet-100 bg-white/70 px-3 py-2.5 shadow-[0_12px_35px_rgba(107,93,160,0.06)] backdrop-blur-sm sm:gap-3 sm:rounded-[26px] sm:px-6 sm:py-3.5">
              <button
                type="button"
                onClick={goToPreviousCard}
                className="inline-flex items-center gap-1 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-sm font-semibold text-violet-700 transition-all duration-200 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300 sm:gap-2 sm:px-4 sm:text-base"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <button
                type="button"
                onClick={() => setBookmarkAdded(prev => !prev)}
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300 sm:gap-2 sm:px-4 sm:text-base ${
                  bookmarkAdded
                    ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${bookmarkAdded ? 'fill-violet-600 text-violet-600' : ''}`} />
                Bookmark
              </button>

              <button
                type="button"
                onClick={goToNextCard}
                className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(124,92,255,0.28)] transition-all duration-200 hover:from-violet-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300 sm:gap-2 sm:px-5 sm:text-base"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-slate-600"
                onClick={() => setMode('menu')}
              >
                Exit Review
              </button>
            </div>
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
