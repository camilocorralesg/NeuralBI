// Both languages in one object, for the tests and tooling. The app never imports this file: it would put the Spanish
// copy back into the first load. Components read the copy through context/LanguageContext.jsx, and a fallback comes
// from lib/translations.en.js (a test guards both).
import en from './translations.en';
import es from './translations.es';

export const translations = { en, es };
