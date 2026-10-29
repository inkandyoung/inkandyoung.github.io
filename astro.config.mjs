// @ts-check
import { defineConfig } from 'astro/config';

// Node's process, typed loosely: the project has no @types/node.
const env = /** @type {any} */ (globalThis).process.env;

export default defineConfig({
  // The GitHub Pages deploy sets both: the site's address (share cards need absolute URLs)
  // and the folder it lives under (e.g. /dergi for user.github.io/dergi/).
  site: env.SITE_URL ?? 'https://inkandyoung.github.io',
  base: env.BASE_PATH || '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'bs', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});
