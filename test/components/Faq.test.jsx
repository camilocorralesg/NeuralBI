import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Faq from '../../components/sections/Faq';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

const motionPreference = vi.hoisted(() => ({ reduced: false }));
vi.mock('framer-motion', () => ({
  useReducedMotion: () => motionPreference.reduced,
  motion: { div: ({ children, initial: _initial, animate: _animate, transition, variants: _variants, whileInView: _whileInView, viewport: _viewport, ...props }) => (
    <div {...props} data-motion-duration={transition?.duration}>{children}</div>
  ) },
}));
vi.mock('../../components/CharacterReveal', () => ({ default: ({ text }) => <span data-testid="title-reveal">{text.replaceAll('*', '')}</span> }));

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

describe('FAQ remix', () => {
  beforeEach(() => { localStorage.clear(); motionPreference.reduced = false; });

  it('starts closed, connects each question to its answer, and opens only one answer', () => {
    render(<LanguageProvider><Faq activeHero="remix" /></LanguageProvider>);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    buttons.forEach((button, index) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      expect(panel).toHaveAttribute('aria-labelledby', button.id);
      expect(panel).toHaveAttribute('aria-hidden', 'true');
      expect(panel).toHaveAttribute('inert');
      expect(panel).toHaveTextContent(translations.en.faq.items[index].a);
    });
    expect(screen.queryByRole('region', { name: translations.en.faq.items[0].q })).not.toBeInTheDocument();

    fireEvent.click(buttons[0]);
    const firstAnswer = screen.getByRole('region', { name: translations.en.faq.items[0].q });
    expect(firstAnswer).not.toHaveAttribute('inert');
    fireEvent.click(within(firstAnswer).getByText(translations.en.faq.items[0].a));
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('preserves every question and complete answer in English and Spanish when switching while open', () => {
    render(<LanguageProvider><LanguageSwitch /><Faq activeHero="remix" /></LanguageProvider>);
    for (const item of translations.en.faq.items) expect(screen.getByRole('button', { name: item.q })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: translations.en.faq.items[2].q }));
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(translations.es.faq.sectionTitle.replaceAll('*', ''));
    translations.es.faq.items.forEach((item, index) => {
      const button = screen.getByRole('button', { name: item.q });
      expect(button).toHaveAttribute('aria-expanded', String(index === 2));
      expect(document.getElementById(button.getAttribute('aria-controls'))).toHaveTextContent(item.a);
    });
  });

  it('uses static title and instant answer transitions for reduced motion', () => {
    motionPreference.reduced = true;
    render(<LanguageProvider><Faq activeHero="remix" /></LanguageProvider>);
    expect(screen.queryByTestId('title-reveal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: translations.en.faq.items[0].q }));
    expect(screen.getByRole('region', { name: translations.en.faq.items[0].q })).toHaveAttribute('data-motion-duration', '0');
  });
});
