import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';

function ConsumerComponent() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang-val">{language}</span>
      <span data-testid="t-manifesto">{t.nav.manifesto}</span>
      <button data-testid="btn-to-es" onClick={() => setLanguage('es')}>Set ES</button>
      <button data-testid="btn-to-en" onClick={() => setLanguage('en')}>Set EN</button>
    </div>
  );
}

describe('Context: LanguageContext', () => {
  beforeEach(() => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides default language and translations', () => {
    render(
      <LanguageProvider defaultLang="en">
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang-val').textContent).toBe('en');
    expect(screen.getByTestId('t-manifesto').textContent).toBe('Manifesto');
  });

  it('updates language and translates strings when setLanguage is called', () => {
    render(
      <LanguageProvider defaultLang="en">
        <ConsumerComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByTestId('btn-to-es'));

    expect(screen.getByTestId('lang-val').textContent).toBe('es');
    expect(screen.getByTestId('t-manifesto').textContent).toBe('Manifiesto');
    expect(localStorage.getItem('neuralbi_lang')).toBe('es');
    expect(document.documentElement.lang).toBe('es');

    fireEvent.click(screen.getByTestId('btn-to-en'));
    expect(screen.getByTestId('lang-val').textContent).toBe('en');
    expect(screen.getByTestId('t-manifesto').textContent).toBe('Manifesto');
    expect(localStorage.getItem('neuralbi_lang')).toBe('en');
  });

  it('restores language from localStorage on initial load', () => {
    localStorage.setItem('neuralbi_lang', 'es');

    render(
      <LanguageProvider defaultLang="en">
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang-val').textContent).toBe('es');
    expect(screen.getByTestId('t-manifesto').textContent).toBe('Manifiesto');
  });

  it('detects spanish browser language when localStorage is empty', () => {
    const originalLanguage = navigator.language;
    const originalLanguages = navigator.languages;

    Object.defineProperty(navigator, 'language', {
      value: 'es-MX',
      configurable: true,
    });
    Object.defineProperty(navigator, 'languages', {
      value: ['es-MX', 'es'],
      configurable: true,
    });

    render(
      <LanguageProvider defaultLang="en">
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang-val').textContent).toBe('es');

    Object.defineProperty(navigator, 'language', {
      value: originalLanguage,
      configurable: true,
    });
    Object.defineProperty(navigator, 'languages', {
      value: originalLanguages,
      configurable: true,
    });
  });
});
