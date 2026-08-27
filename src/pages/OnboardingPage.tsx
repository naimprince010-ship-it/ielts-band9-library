import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { readNextPath, trackFunnelEvent } from '@/lib/funnel';

const SKILLS = ['listening', 'reading', 'writing', 'speaking', 'not_sure'] as const;

export default function OnboardingPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = readNextPath(location.search, '/dashboard?welcome=1');
  const [targetBand, setTargetBand] = useState('7.0');
  const [examDate, setExamDate] = useState('');
  const [weakSkill, setWeakSkill] = useState<(typeof SKILLS)[number]>('not_sure');
  const [dailyMinutes, setDailyMinutes] = useState('30');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const finish = async (event: FormEvent) => {
    event.preventDefault();
    if (!user || !supabase) return;
    setSaving(true);
    setError('');
    const { error: saveError } = await supabase
      .from('users')
      .update({
        target_band: Number(targetBand),
        exam_date: examDate || null,
        weak_skill: weakSkill,
        daily_study_minutes: Number(dailyMinutes),
      })
      .eq('id', user.id);

    if (saveError) {
      setError('We could not save your study plan. Please try again.');
      setSaving(false);
      return;
    }
    trackFunnelEvent('onboarding_goals_saved', { targetBand, weakSkill, dailyMinutes: Number(dailyMinutes) });
    navigate(`/diagnostic?onboarding=1&next=${encodeURIComponent(destination)}`, { replace: true });
  };

  return (
    <main className="min-h-[80vh] bg-slate-50 px-4 py-10 sm:py-16">
      <Card className="mx-auto max-w-2xl border-slate-200 shadow-sm">
        <CardHeader className="text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-indigo-700"><Target className="h-6 w-6" /></span>
          <CardTitle className="mt-3 text-3xl">Build your first IELTS study plan</CardTitle>
          <CardDescription>Four quick answers help us recommend where you should start.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={finish} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="targetBand">Target band</Label>
                <select id="targetBand" value={targetBand} onChange={(event) => setTargetBand(event.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm">
                  {['5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map((band) => <option key={band}>{band}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examDate" className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />Exam date (optional)</Label>
                <Input id="examDate" type="date" value={examDate} onChange={(event) => setExamDate(event.target.value)} min={new Date().toISOString().slice(0, 10)} />
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium">Which skill needs the most help?</legend>
              <div className="grid gap-2 sm:grid-cols-5">
                {SKILLS.map((skill) => (
                  <button key={skill} type="button" onClick={() => setWeakSkill(skill)} className={`rounded-lg border px-3 py-3 text-sm font-medium capitalize transition ${weakSkill === skill ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
                    {skill === 'not_sure' ? 'Not sure' : skill}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="dailyMinutes" className="flex items-center gap-2"><Clock3 className="h-4 w-4" />Daily study time</Label>
              <select id="dailyMinutes" value={dailyMinutes} onChange={(event) => setDailyMinutes(event.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="15">15 minutes</option><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">1 hour</option><option value="90">90 minutes</option>
              </select>
            </div>

            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" disabled={saving} className="flex-1 bg-indigo-700 hover:bg-indigo-800">{saving ? 'Saving goals...' : 'Continue to diagnostic'}<ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button type="button" variant="ghost" onClick={() => navigate(destination, { replace: true })}>Skip for now</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
