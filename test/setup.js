import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock next/font/google for Vitest environment
vi.mock('next/font/google', () => ({
  DM_Sans: () => ({ className: 'font-dm-sans', variable: '--font-sans' }),
  Inter: () => ({ className: 'font-inter', variable: '--font-body' }),
  JetBrains_Mono: () => ({ className: 'font-mono', variable: '--font-mono' }),
  Montserrat: () => ({ className: 'font-montserrat', variable: '--font-ui' }),
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
