'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../lib/translations';

function detectPreferredLanguage(fallback = 'en') {
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

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
});

export function LanguageProvider({ children, defaultLang = 'en' }) {
  const [language, setLanguageState] = useState(defaultLang);

  useEffect(() => {
    const detected = detectPreferredLanguage(defaultLang);
    if (detected !== defaultLang) {
      setLanguageState(detected);
    }
    try {
      document.documentElement.lang = detected;
    } catch {
      // Ignore in non-browser environments
    }
  }, [defaultLang]);

  const setLanguage = (lang) => {
    if (lang === 'es' || lang === 'en') {
      setLanguageState(lang);
      try {
        localStorage.setItem('neuralbi_lang', lang);
        document.documentElement.lang = lang;
      } catch {
        // Ignore storage errors
      }
    }
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
