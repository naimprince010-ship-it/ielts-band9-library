import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Keyboard, MessageCircle, PenTool, Target, Type } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const practiceItems = [
  {
    title: 'Daily Plan',
    description: 'Complete today\'s structured IELTS study flow.',
    path: '/daily-plan',
    icon: Target,
  },
  {
    title: 'Grammar Exercises',
    description: 'Strengthen accuracy with focused grammar drills.',
    path: '/grammar-exercises',
    icon: BookOpen,
  },
  {
    title: 'Essay Bank',
    description: 'Practice writing with curated IELTS essay prompts.',
    path: '/essay-bank',
    icon: PenTool,
  },
  {
    title: 'Typing Practice',
    description: 'Improve typing speed and endurance for test tasks.',
    path: '/practice/typing',
    icon: Type,
  },
  {
    title: 'Speaking Practice',
    description: 'Build confidence with guided speaking questions.',
    path: '/speaking-practice',
    icon: MessageCircle,
  },
  {
    title: 'Mock Test',
    description: 'Take a section-level mock to evaluate readiness.',
    path: '/mock-test',
    icon: Keyboard,
  },
];

export default function PracticeHubPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Practice Hub</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Choose Your Practice Session</h1>
          <p className="mt-2 text-sm text-slate-600">Pick a focused activity and keep your IELTS preparation consistent.</p>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practiceItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.path} className="rounded-2xl border-slate-200 transition hover:border-indigo-300 hover:shadow-md">
                <CardHeader className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg text-slate-900">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={item.path}
                    className="inline-flex items-center text-sm font-semibold text-indigo-700 transition hover:text-indigo-600"
                  >
                    Start now
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
