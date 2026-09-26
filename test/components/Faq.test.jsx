import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import Faq from '../../components/sections/Faq';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

// The test decides what each IntersectionObserver sees.
let observers = [];
class Observer {
  constructor(callback, options = {}) { Object.assign(this, { callback, options, targets: [] }); observers.push(this); }
  observe(target) { this.targets.push(target); }
  unobserve() {}
  disconnect() { this.disconnected = true; }
}
vi.mock('../../components/CharacterReveal', () => ({ default: ({ text }) => <span data-testid="title-reveal">{text.replaceAll('*', '')}</span> }));

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

describe('FAQ remix', () => {
  beforeEach(() => { localStorage.clear(); observers = []; vi.stubGlobal('IntersectionObserver', Observer); });
  afterEach(() => vi.unstubAllGlobals());

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

  it('opens answers on grid rows, marking the open card, and brings the list in once when it is first seen', () => {
    const { container } = render(<LanguageProvider><Faq activeHero="remix" /></LanguageProvider>);
    const list = container.querySelector('[data-reveal], [class*="items"]');
    const cards = [...list.children];
    expect(cards).toHaveLength(4);
    cards.forEach((card, index) => expect(card.style.getPropertyValue('--i')).toBe(String(index)));

    fireEvent.click(screen.getByRole('button', { name: translations.en.faq.items[0].q }));
    expect(cards[0]).toHaveAttribute('data-open', 'true');
    expect(cards[1]).toHaveAttribute('data-open', 'false');

    // Off screen at load: armed; well in view: it runs, once.
    const listObserver = observers.find(observer => observer.targets.includes(list));
    act(() => listObserver.callback([{ target: list, isIntersecting: false, intersectionRatio: 0 }]));
    expect(list).toHaveAttribute('data-reveal', 'armed');
    act(() => listObserver.callback([{ target: list, isIntersecting: true, intersectionRatio: 0.5 }]));
    expect(list).toHaveAttribute('data-reveal', 'run');
    expect(listObserver.disconnected).toBe(true);
  });
});
