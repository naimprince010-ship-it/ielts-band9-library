import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { validateStudyLessonBlueprint } from '../src/lib/lessonBlueprint.ts';

function loadEnv(path: string) {
  try {
    for (const line of readFileSync(path, 'utf8').replace(/\uFEFF/g, '').split(/\r?\n/)) {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '').replace(/(?:\uFEFF|\\uFEFF)/g, '');
    }
  } catch { /* optional env file */ }
}

if (process.env.E2E_ENV_FILE) loadEnv(process.env.E2E_ENV_FILE);
loadEnv('.env.local');
loadEnv('.env.development.local');

const url = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !anonKey || !serviceKey) throw new Error('Required Supabase environment is missing');

const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const email = `codex-study-flow-${runId}@example.invalid`;
const password = `T9!${crypto.randomUUID()}aA`;
const slug = `e2e-study-blueprint-${runId}`;
const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
let userId: string | undefined;
let lessonId: string | undefined;

try {
  const { data: created, error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (createError || !created.user) throw createError ?? new Error('Test user was not created');
  userId = created.user.id;

  const { error: profileError } = await admin.from('users').upsert({
    id: userId,
    email,
    name: 'Disposable study-flow verifier',
    role: 'instructor',
    subscription_status: 'free',
  });
  if (profileError) throw profileError;

  const staff = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: signedIn, error: signInError } = await staff.auth.signInWithPassword({ email, password });
  if (signInError || !signedIn.session) throw signInError ?? new Error('Test user sign-in failed');

  const response = await fetch('http://127.0.0.1:3000/api/generate-study-lesson', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${signedIn.session.access_token}` },
    body: JSON.stringify({ type: 'speaking', topic: 'Speaking Part 1: daily routines', level: 'beginner' }),
  });
  const generated = await response.json();
  if (!response.ok) throw new Error(`Generation failed (${response.status}): ${generated.error ?? 'unknown error'}`);
  const validation = validateStudyLessonBlueprint(generated.studyBlueprint);
  if (!validation.success) throw validation.error;

  const lessonContent = {
    title: generated.title,
    targetLevel: generated.targetLevel ?? 'Beginner',
    whatYouWillLearn: validation.data.objectives,
    coreExplanation: '', examples: [], commonMistakes: [], miniPractice: [], answerKey: [], quickRecap: validation.data.outcome,
    studyBlueprint: validation.data,
  };
  const { data: draft, error: draftError } = await staff.from('lessons').insert({
    title: generated.title,
    slug,
    type: 'speaking',
    level: 'beginner',
    topic: 'Speaking Part 1: daily routines',
    description: generated.description,
    content: lessonContent,
    is_premium: false,
    is_published: false,
    blueprint_version: validation.data.schemaVersion,
    content_status: 'draft',
    quality_report: { schemaValid: true, humanReviewComplete: false },
  }).select('id').single();
  if (draftError || !draft) throw draftError ?? new Error('Draft insert failed');
  lessonId = draft.id;

  const checklist = { naturalCollocations: true, ieltsSafeUsage: true, noRareWords: true, examplesReviewed: true, mistakesAccurate: true };
  const { error: publishError } = await staff.from('lessons').update({
    is_published: true,
    content_status: 'published',
    quality_report: { schemaValid: true, humanChecklist: checklist, humanReviewComplete: true },
  }).eq('id', lessonId);
  if (publishError) throw publishError;

  const publicClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: visible, error: visibleError } = await publicClient.from('lessons').select('id, content_status').eq('id', lessonId).single();
  if (visibleError || visible?.content_status !== 'published') throw visibleError ?? new Error('Published lesson is not publicly visible');

  console.log(JSON.stringify({ apiAuth: 'passed', schemaValidation: 'passed', staffDraftInsert: 'passed', staffPublish: 'passed', publicRead: 'passed', sections: validation.data.sections.length }));
} finally {
  if (lessonId) await admin.from('lessons').delete().eq('id', lessonId);
  if (userId) {
    await admin.from('users').delete().eq('id', userId);
    await admin.auth.admin.deleteUser(userId);
  }
}
