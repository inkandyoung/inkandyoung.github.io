/**
 * Renders the link-preview cards (public/og-tr.jpg, og-bs.jpg, og-en.jpg, 1200×630)
 * from each language's built magazine cover. JPEG, because WhatsApp drops
 * preview images much over 300 kB.
 *
 *   npm run build && npm run og && npm run build
 *
 * Uses the preview server on port 4321 if one is running, otherwise starts one.
 */
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const up = () => fetch(BASE + '/tr/').then((r) => r.ok, () => false);

let child;
if (!(await up())) {
  child = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--port', '4321', '--host', '127.0.0.1'], { stdio: 'ignore' });
  for (let i = 0; i < 80 && !(await up()); i++) await sleep(250);
}

let browser;
for (const opts of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
  try {
    browser = await chromium.launch(opts);
    break;
  } catch {}
}
if (!browser) throw new Error('No browser found. Run `npx playwright install chromium` once.');

const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
for (const lang of ['tr', 'bs', 'en']) {
  await page.goto(`${BASE}/${lang}/`, { waitUntil: 'networkidle' });
  // The card shows the cover alone, without site navigation, page controls or the scroll button.
  await page.addStyleTag({
    content: '.cover { min-height: 100svh !important; } .site-header, .controls, .start, .note { display: none !important; }',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og-${lang}.jpg`, type: 'jpeg', quality: 82 });
  console.log(`public/og-${lang}.jpg written`);
}
await browser.close();
child?.kill();
