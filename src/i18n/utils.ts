import { getRelativeLocaleUrl } from 'astro:i18n';
import {
  categories,
  defaultLang,
  langs,
  locales,
  routes,
  ui,
  type CategoryKey,
  type Lang,
  type RouteKey,
  type UiKey,
} from './ui';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (langs as string[]).includes(value);
}

export function getLang(param: string | undefined): Lang {
  return isLang(param) ? param : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey, vars: Record<string, string | number> = {}) {
    const text: string = ui[lang][key] ?? ui[defaultLang][key];
    return text.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
  };
}

/** URL of a section (and optional sub path) in the given interface language. */
export function localPath(lang: Lang, route?: RouteKey, ...rest: (string | number)[]) {
  const segments = route ? [routes[route][lang], ...rest.map(String)] : [];
  return getRelativeLocaleUrl(lang, segments.join('/'));
}

export function categoryLabel(key: CategoryKey, lang: Lang) {
  return categories[key][lang];
}

export function formatMonth(date: Date, lang: Lang) {
  const text = new Intl.DateTimeFormat(locales[lang], { month: 'long', year: 'numeric' }).format(date);
  // Bosnian month names are lowercase in Intl; capitalise for headings.
  return text.charAt(0).toLocaleUpperCase(locales[lang]) + text.slice(1);
}

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

/** The same page in every interface language, for the language switcher and hreflang. */
export function alternatesFor(route?: RouteKey, ...rest: (string | number)[]) {
  return Object.fromEntries(langs.map((l) => [l, localPath(l, route, ...rest)])) as Record<Lang, string>;
}
