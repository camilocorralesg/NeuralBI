import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Hero from '../../components/sections/Hero';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

vi.mock('../../components/FloatingLines', () => ({ default: () => <div data-testid="lines" /> }));

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button type="button" onClick={() => setLanguage('es')}>Español</button>;
}

describe('Hero (first screen)', () => {
  beforeEach(() => localStorage.clear());

  it('names the category in the headline, states one hard fact and offers the one main action, in both languages', () => {
    render(<LanguageProvider><LanguageSwitch /><Hero /></LanguageProvider>);
    const check = (locale) => {
      const copy = translations[locale].hero;
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBe(`${copy.h1Line1} ${copy.h1Line2}`);
      // The promise is the Volt-free italic second line.
      expect(heading.querySelector('em').textContent).toBe(copy.h1Line2);
      expect(screen.getByText(copy.fact)).toBeTruthy();
      expect(screen.getByRole('button', { name: copy.cta })).toBeTruthy();
    };

    check('en');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Microsoft data & AI consulting in production in weeks.');
    expect(screen.getByText(/5 business days/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    check('es');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Consultoría de datos e IA Microsoft en producción en semanas.');
    expect(screen.getByText(/5 días hábiles/)).toBeTruthy();
  });
});
