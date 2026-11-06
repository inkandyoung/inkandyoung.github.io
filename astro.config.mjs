// @ts-check
import { defineConfig } from 'astro/config';

// Node's process, typed loosely: the project has no @types/node.
const env = /** @type {any} */ (globalThis).process.env;

export default defineConfig({
  // The site's address (share cards need absolute URLs): SITE_URL from the GitHub Pages
  // deploy, URL from Netlify. BASE_PATH is the folder it lives under (e.g. /dergi), if any.
  site: env.SITE_URL || env.URL || 'https://inkandyoung.github.io',
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
