import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Pause, Play, RotateCcw, Timer as TimerIcon, Type } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WritingPracticeStudioProps {
  topic: string;
}

type PhaseKey = 'plan' | 'draft' | 'review';

const PHASES: { key: PhaseKey; label: string; minutes: number; hint: string }[] = [
  { key: 'plan', label: 'Plan', minutes: 5, hint: 'Note your thesis, reasons, and examples.' },
  { key: 'draft', label: 'Draft', minutes: 30, hint: 'Write with flow — don’t stop to search for words.' },
  { key: 'review', label: 'Review', minutes: 5, hint: 'Fix the small, repeated slips before you submit.' },
];

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * "Practice Studio" — a self-contained, client-only scratch pad so a
 * student can apply the lesson immediately instead of only reading about
 * it: a live word-count textarea plus a Plan → Draft → Review timer
 * matching the "5-30-5 Rule" already described in the writing lesson
 * copy. Nothing here is persisted (no Supabase read/write) — it is purely
 * local `useState`, reset on navigation, by design: this is a scratch
 * space, not a saved submission, so it can't interact with progress
 * tracking, bookmarking, or any backend state the rest of the page owns.
 *
 * The word-count target is derived from `topic` (e.g. "Task 1 Academic"
 * vs "Task 2 Opinion") rather than a new data field, since every writing
 * lesson's `topic` already encodes which IELTS task it covers.
 */
export function WritingPracticeStudio({ topic }: WritingPracticeStudioProps) {
  const [draftText, setDraftText] = useState('');
  const [activePhase, setActivePhase] = useState<PhaseKey | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) return undefined;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const wordCount = useMemo(() => {
    const trimmed = draftText.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [draftText]);

  const wordTarget = useMemo(() => {
    const t = topic.toLowerCase();
    if (t.includes('task 1')) return 150;
    if (t.includes('task 2')) return 250;
    return null;
  }, [topic]);

  const meetsTarget = wordTarget !== null && wordCount >= wordTarget;

  const startPhase = (phase: PhaseKey) => {
    const config = PHASES.find((p) => p.key === phase)!;
    setActivePhase(phase);
    setSecondsLeft(config.minutes * 60);
    setIsRunning(true);
  };

  const togglePause = () => {
    if (!activePhase) return;
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setActivePhase(null);
    setIsRunning(false);
    setSecondsLeft(0);
  };

  const activeConfig = PHASES.find((p) => p.key === activePhase) ?? null;
  const timeIsUp = activePhase !== null && !isRunning && secondsLeft === 0;

  return (
    <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="practice-studio">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-white via-blue-50/50 to-violet-50/70">
        <CardTitle className="flex items-center gap-2 text-slate-950">
          <Type className="h-5 w-5 text-blue-600" />
          Practice Studio
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">Apply the lesson now — write your own response with the 5-30-5 timer running.</p>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
          <TimerIcon className="h-4 w-4 flex-shrink-0 text-slate-500" />
          <div className="flex flex-wrap gap-2">
            {PHASES.map((phase) => (
              <Button
                key={phase.key}
                type="button"
                size="sm"
                variant={activePhase === phase.key ? 'default' : 'outline'}
                className={activePhase === phase.key ? 'bg-blue-600 hover:bg-blue-700' : ''}
                onClick={() => startPhase(phase.key)}
              >
                {phase.label} · {phase.minutes}m
              </Button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {activePhase && (
              <>
                <span className={`min-w-[3.5rem] text-center font-mono text-lg font-black ${timeIsUp ? 'text-rose-600' : 'text-slate-900'}`}>
                  {formatTime(secondsLeft)}
                </span>
                <Button type="button" size="icon" variant="outline" onClick={togglePause} aria-label={isRunning ? 'Pause timer' : 'Resume timer'}>
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button type="button" size="icon" variant="outline" onClick={resetTimer} aria-label="Reset timer">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {activeConfig && (
          <p className="text-xs font-medium text-slate-500">
            {timeIsUp ? "Time's up — move to the next phase, or reset." : activeConfig.hint}
          </p>
        )}

        <textarea
          value={draftText}
          onChange={(event) => setDraftText(event.target.value)}
          placeholder="Write your response here. This is a scratch pad — nothing is saved, so feel free to experiment."
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            {meetsTarget ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
            ) : (
              <span className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-slate-300" />
            )}
            <span className={meetsTarget ? 'text-emerald-700' : 'text-slate-600'}>
              {wordCount} word{wordCount === 1 ? '' : 's'}
              {wordTarget !== null && ` · target ${wordTarget}+`}
            </span>
          </div>
          {draftText.length > 0 && (
            <Button type="button" size="sm" variant="ghost" onClick={() => setDraftText('')}>
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
