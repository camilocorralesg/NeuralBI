import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from '@testing-library/react';
import Manifesto from '../../components/sections/Manifesto';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

describe('Manifesto', () => {
  beforeEach(() => {
    window.localStorage.removeItem('neuralbi_lang');
  });

  it('preserves the lime editorial accent and switches all card copy to Spanish', () => {
    render(
      <LanguageProvider>
        <LanguageSwitch />
        <Manifesto />
      </LanguageProvider>,
    );

    const heading = screen.getByRole('heading', { level: 2, name: 'The New Enterprise Blueprint.' });
    expect(heading.querySelector('em')?.textContent).toBe('Blueprint');
    expect(screen.getByText('Why forward-thinking companies choose NeuralBI over rigid, legacy IT consulting.')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Español' }));

    expect(screen.getByRole('heading', { level: 2, name: 'El Nuevo Estándar Empresarial.' }).querySelector('em')?.textContent).toBe('Empresarial');
    expect(screen.getByText('Por qué las organizaciones líderes eligen la arquitectura de NeuralBI frente a la consultoría tradicional de TI.')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 3, name: 'IA Autónoma Orientada a Resultados' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 3, name: 'En Producción en Semanas, no Trimestres' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 3, name: 'Adopción Garantizada en sus Equipos' })).toBeTruthy();
  });

  it('renders semantic strong highlights in card body copy for executive scannability', () => {
    render(
      <LanguageProvider>
        <Manifesto />
      </LanguageProvider>,
    );

    const strongEl = screen.getByText('Copilot Studio agents grounded in your internal databases');
    expect(strongEl.tagName).toBe('STRONG');
  });

  it('describes what each scene shows to assistive technology, in the selected language', () => {
    render(
      <LanguageProvider>
        <LanguageSwitch />
        <Manifesto />
      </LanguageProvider>,
    );

    const ai = screen.getByRole('figure', { name: 'Autonomous reasoning: Enterprise data ingress → Actionable business impact' });
    expect(ai).toHaveAccessibleDescription(/stopped at the tenant boundary.*invoice is reconciled.*supplier route/);
    expect(screen.getAllByRole('figure').every((figure) => figure.getAttribute('aria-describedby'))).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    expect(screen.getByRole('figure', { name: /^Razonamiento autónomo/ })).toHaveAccessibleDescription(/límite del tenant.*concilia una factura/);
  });

  it('emphasizes a graphic when its card receives keyboard focus', () => {
    render(
      <LanguageProvider>
        <Manifesto />
      </LanguageProvider>,
    );

    const card = screen.getByRole('group', { name: 'Results-Driven Autonomous AI' });
    const graphic = card.querySelector('figure');
    expect(card.getAttribute('tabindex')).toBe('0');
    expect(graphic?.getAttribute('data-emphasis')).toBe('false');

    fireEvent.focus(card);
    expect(graphic?.getAttribute('data-emphasis')).toBe('true');

    fireEvent.blur(card);
    expect(graphic?.getAttribute('data-emphasis')).toBe('false');
  });

  it('pauses offscreen scenes and cleans up visibility observers', () => {
    const observers = [];
    const OriginalObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class {
      constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
      observe(element) { this.element = element; }
    };
    try {
      const { unmount } = render(<LanguageProvider><Manifesto /></LanguageProvider>);
      // The header and the cards also observe for their arrival; the scenes are the figures.
      const scenes = observers.filter((observer) => observer.element?.tagName === 'FIGURE');
      expect(scenes).toHaveLength(3);
      const first = scenes[0];
      expect(first.element.dataset.running).toBe('false');
      act(() => first.callback([{ isIntersecting: true }]));
      expect(first.element.dataset.running).toBe('true');
      act(() => first.callback([{ isIntersecting: false }]));
      expect(first.element.dataset.running).toBe('false');
      // A fast scroll batches records: the last one is the current state.
      act(() => first.callback([{ isIntersecting: false }, { isIntersecting: true }]));
      expect(first.element.dataset.running).toBe('true');
      unmount();
      observers.forEach((observer) => expect(observer.disconnect).toHaveBeenCalledOnce());
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it('brings the title, the subtitle and each card in once, staged, and leaves no reveal state behind', () => {
    vi.useFakeTimers();
    const observers = [];
    const OriginalObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class {
      constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
      observe(element) { this.element = element; }
    };
    try {
      render(<LanguageProvider><Manifesto /></LanguageProvider>);
      const cards = screen.getAllByRole('article');
      const title = screen.getByRole('heading', { level: 2, name: 'The New Enterprise Blueprint.' }).firstElementChild;
      const subtitle = screen.getByText('Why forward-thinking companies choose NeuralBI over rigid, legacy IT consulting.');
      // The period after the italic stays on its word, upright.
      expect(title.querySelector('em').parentElement.textContent).toBe('Blueprint.');
      expect(subtitle.style.getPropertyValue('--reveal-delay')).toBe('220ms');
      expect(cards.map((card) => card.style.getPropertyValue('--i'))).toEqual(['0', '1', '2']);
      // The server's HTML (and anything already on screen) is the finished layout.
      expect(cards.every((card) => !card.hasAttribute('data-reveal'))).toBe(true);

      const watching = (element) => observers.find((observer) => observer.element === element);
      act(() => {
        watching(title).callback([{ isIntersecting: false, intersectionRatio: 0 }]);
        watching(subtitle).callback([{ isIntersecting: false, intersectionRatio: 0 }]);
        cards.forEach((card) => watching(card).callback([{ isIntersecting: false, intersectionRatio: 0 }]));
      });
      expect(title.dataset.reveal).toBe('armed');
      expect(subtitle.dataset.reveal).toBe('armed');
      expect(cards.map((card) => card.dataset.reveal)).toEqual(['armed', 'armed', 'armed']);

      act(() => watching(cards[0]).callback([{ isIntersecting: true, intersectionRatio: 0.6 }]));
      expect(cards[0].dataset.reveal).toBe('run');
      expect(cards[1].dataset.reveal).toBe('armed');
      expect(watching(cards[0]).disconnect).toHaveBeenCalled();

      act(() => vi.advanceTimersByTime(1500));
      expect(cards[0].hasAttribute('data-reveal')).toBe(false);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
      vi.useRealTimers();
    }
  });
});
