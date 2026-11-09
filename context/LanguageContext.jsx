'use client';

import React, { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { detectPreferredLanguage, dictionaries, preloadLanguage } from '../lib/i18n';

// A visitor who reads Spanish: the copy starts downloading as this module runs, before React hydrates.
if (typeof window !== 'undefined' && detectPreferredLanguage() === 'es') preloadLanguage('es').catch(() => {});

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: dictionaries.en,
});

export function LanguageProvider({ children, defaultLang = 'en' }) {
  const [language, setLanguageState] = useState(defaultLang);
  const [, arrived] = useReducer((n) => n + 1, 0);
  const wanted = useRef(defaultLang);

  // A language shows once its copy is here: at once when it already is, when its chunk lands otherwise (lib/i18n.js).
  // Only the latest choice lands, and a failed fetch leaves the page in the language it was in.
  const show = useCallback((lang) => {
    wanted.current = lang;
    const apply = () => {
      if (wanted.current !== lang) return;
      setLanguageState(lang);
      arrived();
      try {
        document.documentElement.lang = lang;
      } catch {
        // Ignore in non-browser environments
      }
    };
    if (dictionaries[lang]) apply();
    else preloadLanguage(lang).then(apply, () => {});
  }, []);

  useEffect(() => {
    show(detectPreferredLanguage(defaultLang));
  }, [defaultLang, show]);

  const setLanguage = (lang) => {
    if (lang === 'es' || lang === 'en') {
      try {
        localStorage.setItem('neuralbi_lang', lang);
      } catch {
        // Ignore storage errors
      }
      show(lang);
    }
  };

  // Language and copy always agree: a language whose copy has not arrived yet reads as English.
  const shown = dictionaries[language] ? language : 'en';

  return (
    <LanguageContext.Provider value={{ language: shown, setLanguage, t: dictionaries[shown] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
