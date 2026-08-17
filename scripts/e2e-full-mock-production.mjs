import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const email = process.env.IELTSTREE_QA_EMAIL;
const password = process.env.IELTSTREE_QA_PASSWORD;
const topic = process.env.IELTSTREE_QA_TOPIC || 'Restoring urban mangroves in Chattogram to reduce monsoon flooding and protect fishing communities';

if (!email || !password) throw new Error('Missing QA credentials in process environment.');

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  await page.goto('https://www.ieltstree.com/login', { waitUntil: 'networkidle' });
  await page.getByLabel(/email address/i).fill(email);
  await page.getByLabel(/^password$/i).fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 30_000 });

  await page.goto('https://www.ieltstree.com/admin?section=mock-tests', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /AI Generate Full Test/i }).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('input').first().fill(topic);
  await dialog.getByRole('button', { name: /Generate 4 Modules/i }).click();

  const deadline = Date.now() + 15 * 60_000;
  let lastProgress = '';
  while (Date.now() < deadline) {
    await page.waitForTimeout(10_000);
    if (!(await dialog.isVisible().catch(() => false))) break;
    const text = await dialog.innerText();
    const progress = text.split('\n').filter(Boolean).slice(-4).join(' | ');
    if (progress !== lastProgress) {
      console.log(`[progress] ${progress}`);
      lastProgress = progress;
    }
    const generateEnabled = await dialog.getByRole('button', { name: /Generate 4 Modules/i }).isEnabled().catch(() => false);
    const hasError = /failed|blocked|rate limit|permission denied|error/i.test(text);
    if (generateEnabled && hasError) throw new Error(text.split('\n').filter(Boolean).slice(0, 8).join(' | '));
  }

  if (await dialog.isVisible().catch(() => false)) throw new Error('Generation did not finish within 15 minutes.');
  await page.waitForTimeout(2_000);
  const body = await page.locator('body').innerText();
  const queueStart = body.indexOf('Full Mock Review Queue');
  const queueText = queueStart >= 0 ? body.slice(queueStart, queueStart + 2500) : '';
  const success = queueText.includes(topic);
  console.log(JSON.stringify({ success, topic, reviewQueuePresent: queueStart >= 0, topicInQueue: success }));
  if (!success) throw new Error('Generation dialog closed, but the linked draft bundle was not found in the review queue.');
} finally {
  await browser.close();
}
