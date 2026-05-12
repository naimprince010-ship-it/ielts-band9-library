import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  Headphones,
  Mic,
  PenTool,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatBandScore } from '@/utils/scoring';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type ModuleKey = 'listening' | 'reading' | 'writing' | 'speaking';

interface FullMockAttempt {
  id: string;
  overall_band: number;
  listening_band: number | null;
  reading_band: number | null;
  writing_band: number | null;
  speaking_band: number | null;
  completed_at: string;
  review_data?: unknown;
  writing_feedback?: unknown;
  speaking_feedback?: unknown;
}

interface ReviewItem {
  questionNumber: number;
  questionText?: string;
  userAnswer?: string;
  acceptedAnswers?: string[];
  correct?: boolean;
  isCorrect?: boolean;
  explanation?: string;
}

interface SectionReview {
  correct?: number;
  total?: number;
  items?: ReviewItem[];
}

interface WritingFeedbackCriterion {
  name: string;
  band: number;
  feedback: string;
}

interface WritingFeedback {
  estimatedBand?: number;
  summary?: string;
  criteria?: WritingFeedbackCriterion[];
  strengths?: string[];
  improvements?: string[];
  task1Notes?: string;
  task2Notes?: string;
  actionPlan?: string[];
}

interface SpeakingFeedback extends WritingFeedback {
  partNotes?: string[];
}

const MODULES: Array<{ key: ModuleKey; label: string; icon: typeof Headphones; color: string; bg: string }> = [
  { key: 'listening', label: 'Listening', icon: Headphones, color: 'text-violet-600', bg: 'bg-violet-50' },
  { key: 'reading', label: 'Reading', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'writing', label: 'Writing', icon: PenTool, color: 'text-amber-600', bg: 'bg-amber-50' },
  { key: 'speaking', label: 'Speaking', icon: Mic, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const plainText = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const getBandClass = (value: number | null | undefined): string => {
  if (value == null) return 'text-slate-400';
  if (value >= 8) return 'text-emerald-600';
  if (value >= 7) return 'text-blue-600';
  if (value >= 6) return 'text-amber-600';
  return 'text-rose-600';
};

const parseReviewData = (value: unknown): Partial<Record<ModuleKey, SectionReview>> => {
  if (!isRecord(value)) return {};
  return MODULES.reduce<Partial<Record<ModuleKey, SectionReview>>>((acc, module) => {
    const section = value[module.key];
    if (isRecord(section)) {
      acc[module.key] = {
        correct: typeof section.correct === 'number' ? section.correct : undefined,
        total: typeof section.total === 'number' ? section.total : undefined,
        items: Array.isArray(section.items) ? (section.items as ReviewItem[]) : [],
      };
    }
    return acc;
  }, {});
};

const parseWritingFeedback = (value: unknown): WritingFeedback | null => {
  if (!isRecord(value)) return null;
  return {
    estimatedBand: typeof value.estimatedBand === 'number' ? value.estimatedBand : undefined,
    summary: typeof value.summary === 'string' ? value.summary : undefined,
    criteria: Array.isArray(value.criteria) ? (value.criteria as WritingFeedbackCriterion[]) : [],
    strengths: Array.isArray(value.strengths) ? (value.strengths as string[]) : [],
    improvements: Array.isArray(value.improvements) ? (value.improvements as string[]) : [],
    task1Notes: typeof value.task1Notes === 'string' ? value.task1Notes : undefined,
    task2Notes: typeof value.task2Notes === 'string' ? value.task2Notes : undefined,
    actionPlan: Array.isArray(value.actionPlan) ? (value.actionPlan as string[]) : [],
  };
};

const parseSpeakingFeedback = (value: unknown): SpeakingFeedback | null => {
  const feedback = parseWritingFeedback(value);
  if (!feedback || !isRecord(value)) return feedback;
  return {
    ...feedback,
    partNotes: Array.isArray(value.partNotes) ? (value.partNotes as string[]) : [],
  };
};

export default function FullMockAttemptDetailPage() {
  const { attemptId } = useParams();
  const { user } = useAuth();
  const [attempt, setAttempt] = useState<FullMockAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAttempt = useCallback(async () => {
    if (!attemptId || !user || !isSupabaseConfigured() || !supabase) {
      setError('This attempt cannot be loaded right now.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let { data, error: fetchError } = await supabase
        .from('mock_test_results')
        .select('id, overall_band, listening_band, reading_band, writing_band, speaking_band, completed_at, review_data, writing_feedback, speaking_feedback')
        .eq('id', attemptId)
        .eq('user_id', user.id)
        .single();

      if (fetchError && /review_data|writing_feedback|speaking_feedback|column/i.test(fetchError.message || '')) {
        const legacy = await supabase
          .from('mock_test_results')
          .select('id, overall_band, listening_band, reading_band, writing_band, speaking_band, completed_at')
          .eq('id', attemptId)
          .eq('user_id', user.id)
          .single();
        data = legacy.data;
        fetchError = legacy.error;
      }

      if (fetchError) throw fetchError;
      setAttempt(data as FullMockAttempt);
      setError(null);
    } catch (err) {
      console.error('Failed to load full mock attempt:', err);
      setAttempt(null);
      setError('We could not find this saved attempt.');
    } finally {
      setLoading(false);
    }
  }, [attemptId, user]);

  useEffect(() => {
    loadAttempt();
  }, [loadAttempt]);

  const reviewData = parseReviewData(attempt?.review_data);
  const writingFeedback = parseWritingFeedback(attempt?.writing_feedback);
  const speakingFeedback = parseSpeakingFeedback(attempt?.speaking_feedback);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="h-40 animate-pulse rounded-xl bg-white" />
        </div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-xl">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="mx-auto mb-4 h-10 w-10 text-rose-500" />
              <h1 className="text-xl font-bold text-slate-900">Attempt not available</h1>
              <p className="mt-2 text-slate-600">{error}</p>
              <Link to="/results">
                <Button className="mt-6 gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to results
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/results" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              <ArrowLeft className="h-4 w-4" />
              Results dashboard
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">Full Mock Attempt</h1>
            <p className="mt-1 text-slate-600">{new Date(attempt.completed_at).toLocaleString()}</p>
          </div>
          <Link to="/full-mock-test">
            <Button className="gap-2">
              <Award className="h-4 w-4" />
              New Mock
            </Button>
          </Link>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-[1.2fr_3fr]">
          <Card className="border-indigo-100 bg-indigo-600 text-white">
            <CardContent className="p-6">
              <p className="text-sm font-semibold text-indigo-100">Overall Band</p>
              <p className="mt-4 text-6xl font-bold">{formatBandScore(Number(attempt.overall_band))}</p>
              <p className="mt-3 text-sm text-indigo-100">Saved full mock result</p>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((module) => {
              const Icon = module.icon;
              const value = attempt[`${module.key}_band` as keyof FullMockAttempt] as number | null;
              return (
                <Card key={module.key}>
                  <CardContent className="p-5">
                    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${module.bg}`}>
                      <Icon className={`h-5 w-5 ${module.color}`} />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">{module.label}</p>
                    <p className={`mt-2 text-3xl font-bold ${getBandClass(value)}`}>
                      {value != null ? formatBandScore(Number(value)) : '--'}
                    </p>
                    <Progress value={value != null ? (Number(value) / 9) * 100 : 0} className="mt-4 h-2" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-emerald-600" />
                Listening and Reading Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {(['listening', 'reading'] as ModuleKey[]).map((moduleKey) => {
                const section = reviewData[moduleKey];
                const module = MODULES.find(item => item.key === moduleKey);
                const items = section?.items || [];
                return (
                  <div key={moduleKey} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="font-bold capitalize text-slate-900">{module?.label}</h2>
                      {section?.total ? (
                        <Badge variant="outline">{section.correct || 0}/{section.total} correct</Badge>
                      ) : (
                        <Badge variant="outline">No saved review</Badge>
                      )}
                    </div>
                    {items.length > 0 ? (
                      <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                        {items.map((item, index) => {
                          const correct = Boolean(item.correct ?? item.isCorrect);
                          const accepted = item.acceptedAnswers?.join(', ') || 'Not saved';
                          return (
                            <div key={`${moduleKey}-${item.questionNumber || index}`} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                              <div className="mb-2 flex items-start justify-between gap-3">
                                <p className="font-semibold text-slate-900">Question {item.questionNumber || index + 1}</p>
                                {correct ? (
                                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                                ) : (
                                  <XCircle className="h-5 w-5 shrink-0 text-rose-600" />
                                )}
                              </div>
                              {plainText(item.questionText) && (
                                <p className="mb-2 text-sm text-slate-700">{plainText(item.questionText)}</p>
                              )}
                              <div className="grid gap-2 text-sm sm:grid-cols-2">
                                <div className="rounded-md bg-white p-2">
                                  <span className="font-semibold text-slate-500">Your answer: </span>
                                  <span>{item.userAnswer || 'Blank'}</span>
                                </div>
                                <div className="rounded-md bg-white p-2">
                                  <span className="font-semibold text-slate-500">Accepted: </span>
                                  <span>{accepted}</span>
                                </div>
                              </div>
                              {item.explanation && <p className="mt-2 text-sm text-slate-600">{item.explanation}</p>}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                        This attempt was saved before detailed question review was available, or the section was not completed.
                      </p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                AI Writing Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              {writingFeedback ? (
                <div className="space-y-5">
                  <div className="rounded-xl bg-indigo-50 p-4">
                    <p className="text-sm font-semibold text-indigo-700">Estimated writing band</p>
                    <p className="mt-2 text-4xl font-bold text-indigo-900">
                      {writingFeedback.estimatedBand != null ? formatBandScore(writingFeedback.estimatedBand) : '--'}
                    </p>
                    {writingFeedback.summary && <p className="mt-3 text-sm text-indigo-800">{writingFeedback.summary}</p>}
                  </div>

                  {(writingFeedback.criteria || []).length > 0 && (
                    <div className="space-y-3">
                      {writingFeedback.criteria?.map((criterion) => (
                        <div key={criterion.name} className="rounded-lg border border-slate-200 p-3">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-slate-900">{criterion.name}</p>
                            <Badge>{formatBandScore(Number(criterion.band))}</Badge>
                          </div>
                          <p className="mt-2 text-sm text-slate-600">{criterion.feedback}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {writingFeedback.task1Notes && (
                    <div>
                      <p className="font-semibold text-slate-900">Task 1 Notes</p>
                      <p className="mt-1 text-sm text-slate-600">{writingFeedback.task1Notes}</p>
                    </div>
                  )}
                  {writingFeedback.task2Notes && (
                    <div>
                      <p className="font-semibold text-slate-900">Task 2 Notes</p>
                      <p className="mt-1 text-sm text-slate-600">{writingFeedback.task2Notes}</p>
                    </div>
                  )}

                  {(['strengths', 'improvements', 'actionPlan'] as const).map((key) => {
                    const values = writingFeedback[key] || [];
                    if (values.length === 0) return null;
                    const title = key === 'actionPlan' ? 'Action Plan' : key === 'strengths' ? 'Strengths' : 'Improvements';
                    return (
                      <div key={key}>
                        <p className="font-semibold text-slate-900">{title}</p>
                        <ul className="mt-2 space-y-2">
                          {values.map((item, index) => (
                            <li key={`${key}-${index}`} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 p-6 text-center">
                  <Sparkles className="mx-auto mb-3 h-8 w-8 text-slate-400" />
                  <p className="font-semibold text-slate-900">No AI writing feedback saved</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Complete a new full mock with writing enabled to store detailed criteria feedback.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-orange-600" />
                AI Speaking Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              {speakingFeedback ? (
                <div className="space-y-5">
                  <div className="rounded-xl bg-orange-50 p-4">
                    <p className="text-sm font-semibold text-orange-700">Estimated speaking band</p>
                    <p className="mt-2 text-4xl font-bold text-orange-900">
                      {speakingFeedback.estimatedBand != null ? formatBandScore(speakingFeedback.estimatedBand) : '--'}
                    </p>
                    {speakingFeedback.summary && <p className="mt-3 text-sm text-orange-800">{speakingFeedback.summary}</p>}
                  </div>
                  {(speakingFeedback.criteria || []).map((criterion) => (
                    <div key={criterion.name} className="rounded-lg border border-slate-200 p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{criterion.name}</p>
                        <Badge>{formatBandScore(Number(criterion.band))}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{criterion.feedback}</p>
                    </div>
                  ))}
                  {(speakingFeedback.partNotes || []).length > 0 && (
                    <div>
                      <p className="font-semibold text-slate-900">Part Notes</p>
                      <ul className="mt-2 space-y-2">
                        {speakingFeedback.partNotes?.map((item, index) => (
                          <li key={index} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 p-6 text-center">
                  <Mic className="mx-auto mb-3 h-8 w-8 text-slate-400" />
                  <p className="font-semibold text-slate-900">No AI speaking feedback saved</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Generate speaking feedback from the full mock result screen to store it here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
