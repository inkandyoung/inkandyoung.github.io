/**
 * Smoke and regression checks for the built site, run in a real browser.
 *
 *   npm run build
 *   npm run test:e2e
 *
 * Uses the preview server if one is already running on port 4321 (Astro 7 keeps
 * `astro preview` running in the background), otherwise starts one and stops it
 * afterwards. Set BASE_URL to test another server. Screenshots go to
 * .playwright-mcp/smoke/ (ignored by git). Uses Playwright's own Chromium if
 * it is installed, otherwise the Chrome or Edge already on the machine.
 */
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';

const PORT = 4321;
const BASE = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;
const SHOTS = '.playwright-mcp/smoke';
mkdirSync(SHOTS, { recursive: true });

const viewports = { phone: [390, 844], tablet: [820, 1180], desktop: [1440, 900] };
const homes = { tr: 'Sınır ve Su', bs: 'Granica i voda', en: 'Border and Water' };
const poemPaths = { tr: '/tr/yazilar/vapur-dudugu/', bs: '/bs/tekstovi/vapur-dudugu/', en: '/en/writing/vapur-dudugu/' };

// The poem exactly as written, line by line. Astro's typographer turns ' into ’.
const source = readFileSync('src/content/yazilar/tr/vapur-dudugu.md', 'utf8').split(/^---$/m)[2];
const poemLines = source
  .split('\n')
  .map((l) => l.trim().replaceAll("'", '’'))
  .filter(Boolean);

let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${label}`);
  if (!ok) failures++;
};

async function launch() {
  for (const opts of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
    try {
      return await chromium.launch(opts);
    } catch {}
  }
  throw new Error('No browser found. Run `npx playwright install chromium` once.');
}

const up = () => fetch(BASE + '/tr/').then((r) => r.ok, () => false);
const astro = (...args) => spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', ...args], { stdio: 'ignore' });

/** Returns a function that stops the server, if this script started it. */
async function startServer() {
  if (process.env.BASE_URL || (await up())) return undefined;
  const child = astro('preview', '--port', String(PORT), '--host', '127.0.0.1');
  for (let i = 0; i < 80; i++) {
    if (await up()) {
      return () => {
        child.kill();
        astro('preview', 'stop');
      };
    }
    await sleep(250);
  }
  child.kill();
  throw new Error('Preview server did not start. Did you run `npm run build`?');
}

const stopServer = await startServer();
const browser = await launch();

try {
  for (const [vpName, [width, height]] of Object.entries(viewports)) {
    for (const reduced of [false, true]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      const tag = `${vpName}${reduced ? ' reduced-motion' : ''}`;

      for (const [lang, title] of Object.entries(homes)) {
        // Home: the magazine, laid out like the PDF issue.
        await page.goto(`${BASE}/${lang}/`, { waitUntil: 'networkidle' });
        const h1 = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
        check(h1 === title, `[${tag}] /${lang}/ cover title "${h1}"`);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        check(overflow <= 0, `[${tag}] /${lang}/ no horizontal scroll (${overflow}px)`);
        const pieces = JSON.parse(readFileSync(`src/data/magazine/${lang}.json`, 'utf8')).pieces;
        const tocTitles = await page.locator('.toc a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
        check(tocTitles.length === pieces.length && (await page.locator('article.piece').count()) === pieces.length, `[${tag}] /${lang}/ contents and pages list ${pieces.length} pieces`);
        const h2s = await page.locator('article.piece h2').allInnerTexts();
        check(JSON.stringify(h2s.map((t) => t.replace(/\s+/g, ' ').trim())) === JSON.stringify(pieces.map((p) => p.title)), `[${tag}] /${lang}/ titles match the PDF text`);
        const og = await page.locator('meta[property="og:image"]').getAttribute('content');
        check(og.endsWith(`/og-${lang}.jpg`) && (await fetch(`${BASE}/og-${lang}.jpg`)).ok, `[${tag}] /${lang}/ share image ${og}`);
        await page.locator('.start').click();
        await page.waitForTimeout(900);
        const contentsVisible = await page.evaluate(() => {
          const r = document.getElementById('s02').getBoundingClientRect();
          return r.top < innerHeight / 2 && r.bottom > 0;
        });
        check(contentsVisible, `[${tag}] /${lang}/ "start reading" scrolls to the contents`);
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(900);
        check((await page.locator('[data-current]').innerText()).startsWith('03'), `[${tag}] /${lang}/ arrow key turns to page 03`);
        if (lang === 'tr' && !reduced) await page.screenshot({ path: `${SHOTS}/magazine-${lang}-${vpName}.png` });

        // Prototype 2: Vapur Düdüğü under each interface language.
        await page.goto(BASE + poemPaths[lang], { waitUntil: 'networkidle' });
        const lines = await page.locator('.verses .line').allInnerTexts();
        check(JSON.stringify(lines.map((l) => l.trim())) === JSON.stringify(poemLines), `[${tag}] ${poemPaths[lang]} poem text matches the source, ${lines.length} lines`);
        check((await page.locator('.vapur h1').innerText()) === 'Vapur Düdüğü', `[${tag}] ${poemPaths[lang]} title intact`);
        check((await page.locator('.vapur .byline a').innerText()) === 'Işıl Güçlü', `[${tag}] ${poemPaths[lang]} author intact`);
        check((await page.locator('.vapur').getAttribute('lang')) === 'tr', `[${tag}] ${poemPaths[lang]} poem keeps lang="tr"`);
        check((await page.locator('.vapur .note').count()) === (lang === 'tr' ? 0 : 1), `[${tag}] ${poemPaths[lang]} language note only when interface differs`);
        const ofl = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        check(ofl <= 0, `[${tag}] ${poemPaths[lang]} no horizontal scroll (${ofl}px)`);
      }

      // Stanza navigation and stages, by mouse and by keyboard.
      await page.goto(BASE + poemPaths.tr, { waitUntil: 'networkidle' });
      if (!reduced) await page.screenshot({ path: `${SHOTS}/vapur-0-${vpName}.png` });
      await page.locator('#kita-1').scrollIntoViewIfNeeded();
      await page.evaluate(() => document.getElementById('kita-1').scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(600);
      const stage = () => page.locator('.vapur').getAttribute('data-stage');
      check((await stage()) === '1', `[${tag}] stage follows scroll (1)`);
      const next = page.locator('.stanza-nav button[data-step="1"]');
      for (const n of ['2', '3', '4']) {
        await next.click();
        await page.waitForTimeout(reduced ? 400 : 1400);
        check((await stage()) === n, `[${tag}] next-stanza button → stage ${n}`);
        if (!reduced) await page.screenshot({ path: `${SHOTS}/vapur-${n}-${vpName}.png` });
      }
      check(await next.isDisabled(), `[${tag}] next disabled on the last stanza`);
      await page.locator('.stanza-nav a').first().focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(reduced ? 400 : 1400);
      check((await stage()) === '1', `[${tag}] keyboard: Enter on "I" returns to stanza 1`);
      check(await page.evaluate(() => document.activeElement?.id === 'kita-1'), `[${tag}] focus moves to the stanza`);
      await page.locator('[data-horn]').click();
      check(await page.locator('.vapur.blowing').count() === 1, `[${tag}] horn button plays`);
      const pager = await page.locator('.pager a').evaluateAll((as) => as.map((a) => a.getAttribute('rel')));
      check(pager.join() === 'prev,next', `[${tag}] previous/next piece links present`);
      await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(400);
      const covered = await page.evaluate(() => {
        const end = document.querySelector('.after .bio').getBoundingClientRect();
        const el = document.elementFromPoint(end.left + 5, Math.max(end.top + 5, 5));
        return !!el?.closest('.after');
      });
      check(covered, `[${tag}] scene does not cover the end matter`);

      check(errors.length === 0, `[${tag}] no console errors ${errors.join(' | ')}`);
      await context.close();
    }
  }

  // The standard reading page still works for every other piece.
  const page = await browser.newPage();
  await page.goto(`${BASE}/tr/yazilar/leylekler-gec-kaldi/`, { waitUntil: 'networkidle' });
  check((await page.locator('article.article .prose p').count()) > 0, 'standard page: leylekler-gec-kaldi renders prose');
  check((await page.locator('.pager a').count()) === 2, 'standard page: previous/next links');
  await page.setViewportSize({ width: 1440, height: 900 });
  const [coverBottom, dateTop] = await page.evaluate(() => [
    document.querySelector('.side-issue .cover').getBoundingClientRect().bottom,
    document.querySelector('.side time').getBoundingClientRect().top,
  ]);
  check(dateTop >= coverBottom, 'standard page: side cover does not cover the date (desktop)');
} finally {
  await browser.close();
  stopServer?.();
}

console.log(failures ? `\n${failures} check(s) failed` : '\nall checks passed');
process.exit(failures ? 1 : 0);
