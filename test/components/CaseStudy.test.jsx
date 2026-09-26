import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CaseStudy from '../../components/sections/CaseStudy';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

let observers;
beforeEach(() => {
  window.localStorage.removeItem('neuralbi_lang');
  observers = [];
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options) { this.callback = callback; this.options = options; this.disconnect = vi.fn(); observers.push(this); }
    observe(element) { this.element = element; }
    unobserve() {}
  });
});
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

const mount = () => render(<LanguageProvider><LanguageSwitch /><CaseStudy /></LanguageProvider>);

describe('Case study (representative scenario)', () => {
  it('tells an anonymised scenario: a label, the context and a role, never a person or a company', () => {
    mount();
    const section = screen.getByRole('region', { name: /Representative scenario/ });
    expect(section).toHaveTextContent('Regional fintech · Operations');
    const quote = section.querySelector('blockquote');
    expect(quote).toHaveTextContent('Our spreadsheet reporting became one live dashboard. The manual work fell by 80% in eight weeks.');
    expect(quote.querySelector('em')).not.toBeNull();
    expect(section.querySelector('figcaption').textContent).toBe('Director of Operations');
  });

  it('gives readers the result as one sentence and keeps the drawn figure presentational', () => {
    const { container } = mount();
    expect(screen.getByText('80% less manual reporting work in eight weeks: from 40 hours a week to 8.')).toBeInTheDocument();
    const figure = container.querySelector('[data-value="80"]').closest('p');
    expect(figure).toHaveAttribute('aria-hidden', 'true');
    expect(figure).toHaveTextContent('−80%');
    expect(container.querySelector('svg path[pathLength="1"]')).not.toBeNull();
  });

  it('rolls the figure and draws the line once, the first time the card is seen', () => {
    vi.useFakeTimers();
    const { container } = mount();
    const card = container.querySelector('[data-value="80"]').closest('div');
    const cardObserver = observers.find((observer) => observer.element === card);
    // The server's HTML is the finished chart: plain digits, no reels.
    expect(card.hasAttribute('data-count')).toBe(false);
    expect(card.querySelectorAll('[data-face]').length).toBe(2);
    expect(card.querySelector('[data-value="80"]').textContent).toBe('80');

    act(() => cardObserver.callback([{ isIntersecting: false, intersectionRatio: 0 }]));
    expect(card).toHaveAttribute('data-count', 'armed');
    act(() => cardObserver.callback([{ isIntersecting: true, intersectionRatio: 0.5 }]));
    expect(card).toHaveAttribute('data-count', 'run');
    // The reels exist only while the figure rolls.
    expect(card.querySelector('[data-value="80"]').textContent.length).toBeGreaterThan(2);

    act(() => vi.advanceTimersByTime(2200));
    expect(card.hasAttribute('data-count')).toBe(false);
    expect(card.querySelector('[data-value="80"]').textContent).toBe('80');
  });

  it('reads in Spanish', () => {
    mount();
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    const section = screen.getByRole('region', { name: /Escenario representativo/ });
    expect(section).toHaveTextContent('Fintech regional · Operaciones');
    expect(section.querySelector('blockquote')).toHaveTextContent('El trabajo manual cayó un 80%');
    expect(screen.getByText('Horas semanales de reportes manuales')).toBeInTheDocument();
  });
});
