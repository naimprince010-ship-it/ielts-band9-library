import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Keyboard, RotateCcw, Zap, Target, Clock, CheckCircle2, XCircle, Loader2, Trophy, ChevronRight } from 'lucide-react';
import { useNavConfig } from '@/contexts/NavContext';

interface WordStatus {
  text: string;
  status: 'pending' | 'current' | 'correct' | 'incorrect';
}

const LOCAL_FALLBACK_WORDS = [
  'academic', 'accurate', 'achieve', 'adapt', 'adequate', 'affect', 'analysis', 'approach',
  'benefit', 'capacity', 'challenge', 'coherent', 'complex', 'consequence', 'considerable',
  'context', 'contrast', 'criteria', 'crucial', 'demonstrate', 'derive', 'develop', 'distinct',
  'dominate', 'effective', 'efficient', 'emphasize', 'enhance', 'evidence', 'factor', 'flexible',
  'framework', 'impact', 'implement', 'implication', 'indicate', 'influence', 'interpret',
  'maintain', 'method', 'objective', 'outcome', 'policy', 'precise', 'process', 'relevant',
  'significant', 'strategy', 'structure', 'sufficient', 'sustain', 'therefore', 'trend',
];

function shuffleWords(words: string[]) {
  return [...words].sort(() => Math.random() - 0.5);
}

/** Navbar-styled contextual action for the Typing Practice tool page — mirrors
 * FlashcardsPage's HeaderActions pattern: light-Navbar classes, icon + label.
 * The page itself renders on a dark, fully custom (inline-styled) canvas, but
 * this component is styled for the light Navbar it actually mounts into. */
function TypingPracticeHeaderActions({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onRestart}
        aria-label="Restart typing practice"
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/70 transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <RotateCcw className="h-4 w-4" />
        <span className="hidden sm:inline">Restart</span>
      </button>
    </div>
  );
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
  const [showCursor, setShowCursor] = useState(true);
  const [shake, setShake] = useState(false);
  const [lastTyped, setLastTyped] = useState<'correct' | 'incorrect' | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const hasFetchedMoreRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cursorRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      const contentType = response.headers.get('content-type') || '';

      if (!contentType.includes('application/json')) {
        throw new Error('Typing API is not available in local Vite dev mode');
      }

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
        const fallbackWords: WordStatus[] = shuffleWords(LOCAL_FALLBACK_WORDS).map((word) => ({
          text: word,
          status: 'pending' as const,
        }));
        fallbackWords[0].status = 'current';
        setWords(fallbackWords);
        setError(null);
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

  // Timer
  useEffect(() => {
    if (isStarted && startTime) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isStarted, startTime]);

  // Blinking cursor
  useEffect(() => {
    cursorRef.current = setInterval(() => setShowCursor(v => !v), 530);
    return () => { if (cursorRef.current) clearInterval(cursorRef.current); };
  }, []);

  // Fetch more words near end
  useEffect(() => {
    const remainingWords = words.length - currentIndex;
    if (remainingWords <= 10 && remainingWords > 0 && !hasFetchedMoreRef.current && isStarted) {
      fetchWords(true);
    }
  }, [currentIndex, words.length, isStarted, fetchWords]);

  // Scroll current word into view
  useEffect(() => {
    if (wordsContainerRef.current && currentIndex > 0) {
      const el = wordsContainerRef.current.querySelector('[data-current="true"]');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
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
      setLastTyped(isCorrect ? 'correct' : 'incorrect');
      setTimeout(() => setLastTyped(null), 300);

      if (!isCorrect) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }

      setWords(prev => {
        const updated = [...prev];
        updated[currentIndex] = { ...updated[currentIndex], status: isCorrect ? 'correct' : 'incorrect' };
        if (currentIndex + 1 < updated.length) {
          updated[currentIndex + 1] = { ...updated[currentIndex + 1], status: 'current' };
        }
        return updated;
      });

      if (isCorrect) setCorrectCount(prev => prev + 1);
      else setIncorrectCount(prev => prev + 1);

      setCurrentIndex(prev => prev + 1);
      setInputValue('');

      if (currentIndex + 1 >= words.length - 10) {
        hasFetchedMoreRef.current = false;
      }
    }
  };

  const resetPractice = useCallback(() => {
    setWords([]);
    setCurrentIndex(0);
    setInputValue('');
    setCorrectCount(0);
    setIncorrectCount(0);
    setStartTime(null);
    setIsStarted(false);
    setElapsedTime(0);
    hasFetchedMoreRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    fetchWords();
    inputRef.current?.focus();
  }, [fetchWords]);

  const calculateWPM = () => {
    if (!startTime || elapsedTime === 0) return 0;
    return Math.round(correctCount / (elapsedTime / 60)) || 0;
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

  const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0;
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();

  const navActions = useMemo(
    () => <TypingPracticeHeaderActions onRestart={resetPractice} />,
    [resetPractice]
  );

  useNavConfig({ mode: 'tool', title: 'Typing Practice', actions: navActions });

  if (isLoading) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.loadingCenter}>
          <div style={styles.loadingSpinner}>
            <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', color: '#a78bfa' }} />
          </div>
          <p style={styles.loadingText}>Loading vocabulary...</p>
        </div>
        <style>{globalStyles}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.errorCard}>
          <XCircle size={48} color="#f87171" style={{ marginBottom: 16 }} />
          <h2 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Unable to Load Words</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>{error}</p>
          <button onClick={() => fetchWords()} style={styles.primaryBtn}>
            Try Again <ChevronRight size={16} />
          </button>
        </div>
        <style>{globalStyles}</style>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <style>{globalStyles}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <Keyboard size={28} color="#a78bfa" />
        </div>
        <div>
          <h1 style={styles.title}>Typing Practice</h1>
          <p style={styles.subtitle}>Master IELTS vocabulary while improving your speed</p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={styles.statsGrid}>
        {[
          { icon: <Zap size={20} color="#fbbf24" />, label: 'WPM', value: wpm, accent: '#fbbf24' },
          { icon: <Target size={20} color="#34d399" />, label: 'Accuracy', value: `${accuracy}%`, accent: '#34d399' },
          { icon: <CheckCircle2 size={20} color="#60a5fa" />, label: 'Correct', value: correctCount, accent: '#60a5fa' },
          { icon: <Clock size={20} color="#c084fc" />, label: 'Time', value: formatTime(elapsedTime), accent: '#c084fc' },
        ].map((stat, i) => (
          <div key={i} style={{ ...styles.statCard, '--accent': stat.accent } as React.CSSProperties} className="stat-card">
            <div style={styles.statIcon}>{stat.icon}</div>
            <div style={{ ...styles.statValue, color: stat.accent }}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Typing Card */}
      <div style={styles.typingCard}>
        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        {/* Word Count Badge */}
        <div style={styles.wordCountRow}>
          <span style={styles.wordCountBadge}>
            {isFetchingMore && <Loader2 size={12} style={{ animation: 'spin 1s linear infinite', marginRight: 4 }} />}
            {currentIndex} / {words.length} words
          </span>
          {isStarted && wpm > 0 && (
            <span style={styles.liveBadge}>
              <span style={styles.liveDot} />
              Live
            </span>
          )}
        </div>

        {/* Words Display */}
        <div ref={wordsContainerRef} style={styles.wordsContainer}>
          <div style={styles.wordsWrap}>
            {words.map((word, index) => {
              const isCurrent = index === currentIndex;
              let wordStyle: React.CSSProperties = { ...styles.word };

              if (word.status === 'correct') {
                wordStyle = { ...wordStyle, color: '#34d399', opacity: 0.7 };
              } else if (word.status === 'incorrect') {
                wordStyle = { ...wordStyle, color: '#f87171', textDecoration: 'line-through', opacity: 0.7 };
              } else if (isCurrent) {
                wordStyle = {
                  ...wordStyle,
                  color: '#f1f5f9',
                  background: 'rgba(167, 139, 250, 0.15)',
                  borderBottom: '2px solid #a78bfa',
                  borderRadius: '4px 4px 0 0',
                  paddingBottom: 2,
                };
              } else {
                wordStyle = { ...wordStyle, color: '#475569' };
              }

              return (
                <span
                  key={`${word.text}-${index}`}
                  data-current={isCurrent}
                  style={wordStyle}
                  className={isCurrent ? 'current-word' : ''}
                >
                  {word.text}
                  {isCurrent && showCursor && (
                    <span style={styles.cursor}>|</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Input Area */}
        <div style={styles.inputRow}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isStarted ? 'Type the highlighted word...' : 'Click here and start typing...'}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              style={{
                ...styles.input,
                ...(lastTyped === 'correct' ? styles.inputCorrect : {}),
                ...(lastTyped === 'incorrect' || shake ? styles.inputIncorrect : {}),
              }}
              className="typing-input"
            />
            {!isStarted && (
              <div style={styles.inputHint}>
                <Keyboard size={14} color="#64748b" />
                <span>Press any key to start</span>
              </div>
            )}
          </div>
          <button onClick={resetPractice} style={styles.resetBtn} className="reset-btn" title="Reset">
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
        </div>

        {/* Shortcut Hint */}
        <p style={styles.hintText}>
          Press <kbd style={styles.kbd}>Space</kbd> or <kbd style={styles.kbd}>Enter</kbd> to submit each word
        </p>
      </div>

      {/* Stats Summary (visible after starting) */}
      {isStarted && (correctCount + incorrectCount) > 0 && (
        <div style={styles.summaryCard}>
          <div style={styles.summaryHeader}>
            <Trophy size={18} color="#fbbf24" />
            <span style={{ color: '#fbbf24', fontWeight: 600 }}>Session Stats</span>
          </div>
          <div style={styles.summaryGrid}>
            <div style={styles.summaryItem}>
              <div style={{ color: '#34d399', fontSize: 24, fontWeight: 700 }}>{wpm}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>Words/min</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={{ color: '#60a5fa', fontSize: 24, fontWeight: 700 }}>{accuracy}%</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>Accuracy</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={{ color: '#a78bfa', fontSize: 24, fontWeight: 700 }}>{correctCount}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>Correct</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={{ color: '#f87171', fontSize: 24, fontWeight: 700 }}>{incorrectCount}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>Incorrect</div>
            </div>
          </div>
        </div>
      )}

      {/* How to Practice */}
      <div style={styles.howToCard}>
        <h3 style={styles.howToTitle}>How to Practice</h3>
        <div style={styles.howToGrid}>
          {[
            { num: '1', text: 'Focus on the highlighted word', color: '#a78bfa' },
            { num: '2', text: 'Type it in the input below', color: '#60a5fa' },
            { num: '3', text: 'Press Space or Enter to submit', color: '#34d399' },
            { num: '4', text: 'New words load automatically', color: '#fbbf24' },
          ].map(item => (
            <div key={item.num} style={styles.howToItem}>
              <div style={{ ...styles.howToNum, background: item.color + '20', color: item.color }}>
                {item.num}
              </div>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29 0%, #1a1035 40%, #0d1b2a 100%)',
    padding: '40px 20px 80px',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  loadingCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: 16,
  },
  loadingSpinner: { display: 'flex' },
  loadingText: { color: '#94a3b8', fontSize: 16 },
  errorCard: {
    maxWidth: 420,
    margin: '10vh auto',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: '48px 32px',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    maxWidth: 780,
    margin: '0 auto 32px',
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: 'rgba(167, 139, 250, 0.12)',
    border: '1px solid rgba(167, 139, 250, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: '#f1f5f9',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    margin: '4px 0 0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
    maxWidth: 780,
    margin: '0 auto 20px',
  },
  statCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16,
    padding: '16px 12px',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    cursor: 'default',
  },
  statIcon: { marginBottom: 8, display: 'flex', justifyContent: 'center' },
  statValue: { fontSize: 26, fontWeight: 800, fontVariantNumeric: 'tabular-nums' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.5px' },
  typingCard: {
    maxWidth: 780,
    margin: '0 auto 20px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: '8px 0 24px',
    overflow: 'hidden',
  },
  progressBar: {
    height: 3,
    background: 'rgba(255,255,255,0.06)',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },
  wordCountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    marginBottom: 16,
  },
  wordCountBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    color: '#64748b',
    background: 'rgba(255,255,255,0.05)',
    padding: '4px 10px',
    borderRadius: 20,
  },
  liveBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 11,
    color: '#34d399',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#34d399',
    boxShadow: '0 0 6px #34d399',
    display: 'inline-block',
    animation: 'pulse 1.5s infinite',
  },
  wordsContainer: {
    padding: '20px 24px',
    minHeight: 130,
    maxHeight: 180,
    overflowY: 'auto',
    background: 'rgba(0,0,0,0.2)',
    margin: '0 24px',
    borderRadius: 16,
    marginBottom: 20,
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255,255,255,0.1) transparent',
  },
  wordsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px 8px',
    lineHeight: 1.8,
  },
  word: {
    fontSize: 18,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    padding: '2px 8px',
    borderRadius: 6,
    transition: 'all 0.15s ease',
    position: 'relative',
  },
  cursor: {
    position: 'absolute',
    right: -2,
    top: 0,
    color: '#a78bfa',
    fontWeight: 100,
    fontSize: 20,
    lineHeight: 1,
    animation: 'none',
  },
  inputRow: {
    display: 'flex',
    gap: 12,
    padding: '0 24px',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 14,
    padding: '14px 20px',
    fontSize: 17,
    color: '#f1f5f9',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  },
  inputCorrect: {
    borderColor: '#34d399',
    boxShadow: '0 0 0 3px rgba(52, 211, 153, 0.12)',
    background: 'rgba(52, 211, 153, 0.05)',
  },
  inputIncorrect: {
    borderColor: '#f87171',
    boxShadow: '0 0 0 3px rgba(248, 113, 113, 0.12)',
    background: 'rgba(248, 113, 113, 0.05)',
    animation: 'shake 0.3s ease',
  },
  inputHint: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: '#475569',
    fontSize: 12,
    pointerEvents: 'none',
  },
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 14,
    padding: '14px 20px',
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  hintText: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 12,
    marginTop: 16,
    marginBottom: 0,
  },
  kbd: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 5,
    padding: '2px 7px',
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#94a3b8',
  },
  summaryCard: {
    maxWidth: 780,
    margin: '0 auto 20px',
    background: 'rgba(167, 139, 250, 0.06)',
    border: '1px solid rgba(167, 139, 250, 0.2)',
    borderRadius: 20,
    padding: '20px 24px',
  },
  summaryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
    textAlign: 'center',
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  howToCard: {
    maxWidth: 780,
    margin: '0 auto',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 20,
    padding: '24px',
  },
  howToTitle: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 16,
    margin: '0 0 16px',
  },
  howToGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
  },
  howToItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  howToNum: {
    width: 28,
    height: 28,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    border: 'none',
    borderRadius: 12,
    padding: '12px 24px',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

const globalStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .stat-card:hover {
    background: rgba(255,255,255,0.07) !important;
    border-color: rgba(167, 139, 250, 0.25) !important;
    transform: translateY(-2px);
  }
  .reset-btn:hover {
    background: rgba(255,255,255,0.1) !important;
    color: #f1f5f9 !important;
    border-color: rgba(255,255,255,0.2) !important;
  }
  .typing-input:focus {
    border-color: rgba(167, 139, 250, 0.6) !important;
    box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.12) !important;
    background: rgba(167, 139, 250, 0.05) !important;
  }
  .typing-input::placeholder {
    color: #475569;
  }
  .current-word {
    animation: fadeIn 0.15s ease;
  }

  /* Scrollbar styling */
  div::-webkit-scrollbar { width: 4px; }
  div::-webkit-scrollbar-track { background: transparent; }
  div::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }

  @media (max-width: 600px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .how-to-grid { grid-template-columns: 1fr !important; }
    .summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;
