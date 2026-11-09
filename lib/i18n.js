import en from './translations.en';

// The site's copy by language. English ships with the page: the server renders it and every component falls back to
// it. Spanish is a chunk of its own, fetched once and kept: for a visitor who reads Spanish it is on its way while the
// page hydrates (context/LanguageContext.jsx), for everyone else when they reach for the language selector
// (components/LanguageSelector.jsx).
export const dictionaries = { en };
let spanish = null;

/** Fetches a language's copy (once; a failed fetch may be tried again); resolves when it can be shown. */
export function preloadLanguage(lang) {
  if (dictionaries[lang]) return Promise.resolve(dictionaries[lang]);
  if (lang !== 'es') return Promise.resolve(en);
  spanish ??= import('./translations.es').then(
    (module) => (dictionaries.es = module.default),
    (error) => { spanish = null; throw error; },
  );
  return spanish;
}

/** The visitor's language: a saved choice first, then the browser's; `fallback` on the server or when unknown. */
export function detectPreferredLanguage(fallback = 'en') {
  if (typeof window === 'undefined') return fallback;

  try {
    const saved = localStorage.getItem('neuralbi_lang');
    if (saved === 'es' || saved === 'en') {
      return saved;
    }

    const browserLang = (
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      ''
    ).toLowerCase();

    if (browserLang.startsWith('es')) {
      return 'es';
    }
  } catch {
    // Ignore storage/navigator access errors (e.g. restricted iframes or SSR)
  }

  return fallback;
}
