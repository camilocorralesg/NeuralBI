import '@testing-library/jest-dom/vitest';
import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { preloadLanguage } from '../lib/i18n';

// The Spanish copy is a chunk of its own in the app; here it is in place, the way it is once a visitor who reads
// Spanish arrives, so a switch shows at once. test/context/LanguageLoading.test.jsx covers the chunk itself.
beforeAll(() => preloadLanguage('es'));

// Mock next/font/google for Vitest environment
vi.mock('next/font/google', () => ({
  DM_Sans: () => ({ className: 'font-dm-sans', variable: '--font-dm-sans' }),
  Inter: () => ({ className: 'font-inter', variable: '--font-inter' }),
  JetBrains_Mono: () => ({ className: 'font-mono', variable: '--font-jetbrains-mono' }),
}));

// Cleanup DOM after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Polyfill window.scrollTo and Element.prototype.scrollIntoView if missing in happy-dom
if (typeof window !== 'undefined') {
  if (!window.scrollTo) {
    window.scrollTo = vi.fn();
  }
}

if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}
