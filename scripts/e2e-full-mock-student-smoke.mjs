import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const email = process.env.IELTSTREE_QA_EMAIL;
const password = process.env.IELTSTREE_QA_PASSWORD;
const expectedBundleId = process.env.IELTSTREE_QA_BUNDLE_ID || '7d4752fd-8903-447f-b3e4-69d89024ca5a';
if (!email || !password) throw new Error('Missing QA credentials in process environment.');

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

try {
  await page.goto('https://www.ieltstree.com/login', { waitUntil: 'networkidle' });
  await page.getByLabel(/email address/i).fill(email);
  await page.getByLabel(/^password$/i).fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 30_000 });
  await page.goto('https://www.ieltstree.com/full-mock-test', { waitUntil: 'networkidle' });

  const start = page.getByRole('button', { name: /Start full mock test/i });
  if (await start.isVisible().catch(() => false)) {
    for (const label of ['Headphones connected', 'Audio working properly', 'Stable internet connection', '3+ hours available']) {
      await page.getByRole('button', { name: label }).click();
    }
    await start.waitFor({ state: 'visible' });
    await start.click();
  }
  await page.waitForTimeout(5_000);
  const firstText = await page.locator('body').innerText();
  const firstSession = await page.evaluate(() => JSON.parse(sessionStorage.getItem('mockTestSession_v1') || '{}'));
  const initial = {
    url: page.url(),
    listeningVisible: /Listening/i.test(firstText),
    questionVisible: /Question|Q1|1\s*of\s*40/i.test(firstText),
    phase: firstSession.phase,
    bundleId: firstSession.bundleId,
  };

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2_000);
  const refreshedText = await page.locator('body').innerText();
  const refreshedSession = await page.evaluate(() => JSON.parse(sessionStorage.getItem('mockTestSession_v1') || '{}'));
  const refreshed = {
    listeningVisible: /Listening/i.test(refreshedText),
    returnedToIntro: /Start full mock test/i.test(refreshedText),
    phase: refreshedSession.phase,
    bundleId: refreshedSession.bundleId,
  };

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1_500);
  const mobile = await page.evaluate(() => ({
    viewport: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
    horizontalOverflow: document.body.scrollWidth > window.innerWidth + 2,
    interactiveButtons: [...document.querySelectorAll('button')].filter(button => button.getBoundingClientRect().width > 0).length,
  }));

  console.log(JSON.stringify({ initial, refreshed, mobile }));
  if (!initial.listeningVisible || initial.bundleId !== expectedBundleId || initial.phase !== 'listening') throw new Error('Published bundle did not load its Listening content.');
  if (!refreshed.listeningVisible || refreshed.bundleId !== expectedBundleId || refreshed.phase !== 'listening' || refreshed.returnedToIntro) throw new Error('Refresh/resume did not preserve the active module.');
  if (mobile.horizontalOverflow || mobile.interactiveButtons === 0) throw new Error('Mobile smoke test failed.');
} finally {
  await browser.close();
}
