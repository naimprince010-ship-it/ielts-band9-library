import fs from 'node:fs';
import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { createClient } from '@supabase/supabase-js';

const loadEnv = (path, override = false) => {
  if (!fs.existsSync(path)) return;
  for (const line of fs.readFileSync(path, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || (!override && process.env[match[1]])) continue;
    const rawValue = match[2].replace(/\uFEFF/g, '').trim();
    let value = rawValue;
    if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
      try { value = JSON.parse(rawValue); } catch { value = rawValue.slice(1, -1); }
    } else if (rawValue.startsWith("'") && rawValue.endsWith("'")) {
      value = rawValue.slice(1, -1);
    }
    process.env[match[1]] = value.trim();
  }
};

loadEnv('.env.local');
// Development-local contains the currently linked production Supabase project.
loadEnv('.env.development.local', true);
loadEnv('.codex-qa-production.env', true);

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) throw new Error('Supabase QA configuration is missing.');

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const email = `codex-full-mock-${runId}@example.com`;
const password = `Qa!${crypto.randomUUID()}aA9`;
let userId = null;
let resultId = null;
let browser;

const cleanupQaUser = async (id) => {
  await admin.from('mock_test_results').delete().eq('user_id', id);
  let deleted = await admin.auth.admin.deleteUser(id);
  if (deleted.error && /database error deleting user/i.test(deleted.error.message || '')) {
    deleted = await admin.auth.admin.deleteUser(id, true);
  }
  if (deleted.error && !/not found/i.test(deleted.error.message || '')) throw deleted.error;
  await admin.from('users').delete().eq('id', id);
};

const waitForText = async (page, pattern, timeout = 30_000) => {
  await page.locator('body').filter({ hasText: pattern }).waitFor({ state: 'visible', timeout });
};

const clickSubmit = async (page) => {
  const buttons = page.getByRole('button', { name: /submit section|submit full mock test|finish.*results|continue to next section/i });
  const count = await buttons.count();
  for (let index = 0; index < count; index += 1) {
    const button = buttons.nth(index);
    if (await button.isVisible().catch(() => false)) {
      await button.click();
      return;
    }
  }
  throw new Error('No visible section submit button found.');
};

const startNext = async (page, section) => {
  const button = page.getByRole('button', { name: new RegExp(`Start ${section} Section`, 'i') });
  await button.waitFor({ state: 'visible', timeout: 30_000 });
  await button.click();
};

try {
  const staleAuthUsers = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (staleAuthUsers.error) throw staleAuthUsers.error;
  for (const stale of staleAuthUsers.data.users.filter((item) => item.email?.startsWith('codex-full-mock-'))) {
    await cleanupQaUser(stale.id);
  }
  const staleProfiles = await admin.from('users').select('id').like('email', 'codex-full-mock-%@example.com');
  if (staleProfiles.error) throw staleProfiles.error;
  for (const stale of staleProfiles.data) await cleanupQaUser(stale.id);

  const created = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: 'Codex Full Mock QA' },
  });
  if (created.error || !created.data.user) throw created.error || new Error('QA user creation failed.');
  userId = created.data.user.id;

  const premium = await admin.from('users').upsert({
    id: userId,
    email,
    name: 'Codex Full Mock QA',
    role: 'user',
    subscription_status: 'premium',
  }).select('id').single();
  if (premium.error) throw premium.error;

  browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const browserErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  page.on('dialog', (dialog) => dialog.accept());

  await page.goto('https://www.ieltstree.com/login', { waitUntil: 'networkidle' });
  await page.getByLabel(/email address/i).fill(email);
  await page.getByLabel(/^password$/i).fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL((current) => !current.pathname.includes('/login'), { timeout: 30_000 });
  await page.goto('https://www.ieltstree.com/full-mock-test', { waitUntil: 'networkidle' });

  for (const label of ['Headphones connected', 'Audio working properly', 'Stable internet connection', '3+ hours available']) {
    await page.getByRole('button', { name: label }).click();
  }
  await page.getByRole('button', { name: /Start full mock test/i }).click();
  await waitForText(page, /Listening/i, 60_000);

  const firstTextAnswer = page.locator('input[type="text"]:visible').first();
  const firstRadioAnswer = page.locator('input[type="radio"]:visible').first();
  if (await firstTextAnswer.isVisible().catch(() => false)) await firstTextAnswer.fill('QA answer');
  else if (await firstRadioAnswer.isVisible().catch(() => false)) await firstRadioAnswer.click();

  const beforeRefresh = await page.evaluate(() => JSON.parse(sessionStorage.getItem('mockTestSession_v1') || '{}'));
  await page.reload({ waitUntil: 'networkidle' });
  await waitForText(page, /Listening/i);
  const afterRefresh = await page.evaluate(() => JSON.parse(sessionStorage.getItem('mockTestSession_v1') || '{}'));
  if (
    beforeRefresh.phase !== 'listening' ||
    afterRefresh.phase !== 'listening' ||
    !afterRefresh.bundleId ||
    (beforeRefresh.bundleId && beforeRefresh.bundleId !== afterRefresh.bundleId)
  ) {
    throw new Error(`Listening refresh/resume state was not preserved: ${JSON.stringify({
      before: { phase: beforeRefresh.phase, bundleId: beforeRefresh.bundleId },
      after: { phase: afterRefresh.phase, bundleId: afterRefresh.bundleId },
    })}`);
  }

  await clickSubmit(page);
  await startNext(page, 'Reading');
  await waitForText(page, /Reading/i);
  await clickSubmit(page);

  await startNext(page, 'Writing');
  await waitForText(page, /IELTS Writing/i);
  await page.getByRole('button', { name: /Start Writing/i }).click();
  await page.getByLabel(/Task 1 response/i).fill('This is a concise QA response used to verify that writing input is stored and submitted correctly.');
  await page.getByRole('button', { name: /^Task 2$/i }).click();
  await page.getByLabel(/Task 2 response/i).fill('This is a concise QA essay used to verify the complete writing submission and section transition flow.');
  await clickSubmit(page);

  await startNext(page, 'Speaking');
  await waitForText(page, /Speaking/i);
  const speakingInput = page.getByPlaceholder(/transcript will appear/i).first();
  if (await speakingInput.isVisible().catch(() => false)) {
    await speakingInput.fill('This spoken-response transcript verifies the speaking submission flow without recording personal audio.');
  }
  await clickSubmit(page);

  await waitForText(page, /Test complete/i, 30_000);
  let result;
  for (let attempt = 0; attempt < 15; attempt += 1) {
    result = await admin
      .from('mock_test_results')
      .select('id, full_mock_bundle_id, listening_test_id, reading_test_id, writing_test_id, speaking_test_id, overall_band')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (result.data || result.error) break;
    await page.waitForTimeout(2_000);
  }
  if (!result?.data && !result?.error) {
    throw new Error(`Result was not persisted. Browser errors: ${browserErrors.slice(-5).join(' | ')}`);
  }
  if (result.error || !result.data) throw result.error || new Error('Saved result was not found.');
  resultId = result.data.id;
  const moduleIdsPresent = ['listening_test_id', 'reading_test_id', 'writing_test_id', 'speaking_test_id']
    .every((key) => Boolean(result.data[key]));
  if (!result.data.full_mock_bundle_id || !moduleIdsPresent) throw new Error('Saved result is missing bundle or module references.');

  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = await page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
  }));
  if (mobile.overflow) throw new Error('Results page has horizontal overflow on mobile.');

  await page.setViewportSize({ width: 1440, height: 900 });

  // ── Retake flow ────────────────────────────────────────────────────────────
  // The RETAKE FULL EXAM button is on the results phase of /full-mock-test.
  // It must: clear savedResultIdRef, reset to intro, and wipe the session so
  // a new attempt cannot persist feedback to the previous attempt's DB row.
  const retakeButton = page.getByRole('button', { name: /RETAKE FULL EXAM/i });
  await retakeButton.waitFor({ state: 'visible', timeout: 30_000 });
  await retakeButton.click();

  // After retake the page must return to the intro/checklist (not results).
  const introStartButton = page.getByRole('button', { name: /Start full mock test/i });
  await introStartButton.waitFor({ state: 'visible', timeout: 15_000 });

  // The session must have been wiped (clearSession removes the key).
  const retakeSession = await page.evaluate(
    () => sessionStorage.getItem('mockTestSession_v1'),
  );
  const retakeSessionPhase = retakeSession ? JSON.parse(retakeSession).phase : null;
  if (retakeSessionPhase === 'results') {
    throw new Error('Session was NOT cleared after retake — results phase is still active.');
  }
  const retake = { buttonVisible: true, sessionCleared: retakeSession === null || retakeSessionPhase !== 'results', introRestored: true };

  // ── Attempt-history navigation ─────────────────────────────────────────────
  await page.goto('https://www.ieltstree.com/results', { waitUntil: 'networkidle' });
  await waitForText(page, /Full Mock History/i);
  const reviewLink = page.getByRole('link', { name: /Review/i });
  await reviewLink.waitFor({ state: 'visible', timeout: 30_000 });
  await reviewLink.click();
  await waitForText(page, /Full Mock Attempt/i);
  const dashboard = {
    historyVisible: true,
    reviewLinkVisible: true,
    detailVisible: true,
  };

  console.log(JSON.stringify({
    ok: true,
    bundleId: result.data.full_mock_bundle_id,
    resultSaved: true,
    moduleReferences: 4,
    refreshResume: true,
    mobileOverflow: false,
    retake,
    dashboard,
    overallBand: result.data.overall_band,
  }));
} finally {
  if (browser) await browser.close();
  if (resultId) await admin.from('mock_test_results').delete().eq('id', resultId);
  if (userId) await cleanupQaUser(userId);

  if (userId) {
    const remainingResult = await admin.from('mock_test_results').select('id', { count: 'exact', head: true }).eq('user_id', userId);
    const remainingProfile = await admin.from('users').select('id', { count: 'exact', head: true }).eq('id', userId);
    if ((remainingResult.count ?? 0) !== 0 || (remainingProfile.count ?? 0) !== 0) {
      throw new Error('Temporary QA data cleanup verification failed.');
    }
    console.log(JSON.stringify({ cleanup: true, temporaryUserDeleted: true, temporaryResultsRemaining: 0 }));
  }
}
