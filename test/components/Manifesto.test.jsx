import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Manifesto from '../../components/sections/Manifesto';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

const read = (file) => readFileSync(resolve(__dirname, '../../components', file), 'utf8');

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

const mount = (withSwitch = false) => render(
  <LanguageProvider>
    {withSwitch && <LanguageSwitch />}
    <Manifesto />
  </LanguageProvider>,
);

describe('Manifesto: three promises in one field of light', () => {
  beforeEach(() => {
    window.localStorage.removeItem('neuralbi_lang');
  });

  it('names the section plainly and switches every promise to Spanish', () => {
    mount(true);

    const heading = screen.getByRole('heading', { level: 2, name: 'Why NeuralBI' });
    expect(heading.querySelector('em')).toBeNull();
    expect(screen.getByText('What sets us apart from traditional IT consulting.')).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 3 }).map((title) => title.textContent)).toEqual([
      'Agents that act on your data', 'In production in weeks, not quarters', 'Adoption from day one',
    ]);

    fireEvent.click(screen.getByRole('button', { name: 'Español' }));

    expect(screen.getByRole('heading', { level: 2, name: 'Por qué NeuralBI' })).toBeInTheDocument();
    expect(screen.getByText('Lo que nos separa de la consultoría tradicional de TI.')).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 3 }).map((title) => title.textContent)).toEqual([
      'Agentes que actúan sobre sus datos', 'En producción en semanas, no en trimestres', 'Adopción desde el primer día',
    ]);
  });

  it('says each promise once: its scene, its title and one line, with no icon, no bold and no card around it', () => {
    mount();
    const promises = screen.getAllByRole('article');
    expect(promises).toHaveLength(3);
    promises.forEach((promise, index) => {
      const card = translations.en.manifesto.cards[index];
      expect(promise).toHaveAccessibleName(card.title);
      expect(within(promise).getAllByRole('figure')).toHaveLength(1);
      expect(within(promise).getAllByRole('paragraph').map((line) => line.textContent)).toEqual([card.body]);
      expect(promise.querySelector('strong')).toBeNull();
      // The only drawing in a promise is its scene.
      expect([...promise.querySelectorAll('svg')].every((svg) => svg.closest('figure'))).toBe(true);
      // Nothing to focus: a promise is read, not operated.
      expect(promise.hasAttribute('tabindex')).toBe(false);
    });
  });

  it('keeps the copy short in both languages: well under half of the ~150 words the cards carried', () => {
    const words = (text) => text.split(/\s+/).filter(Boolean).length;
    for (const language of ['en', 'es']) {
      const { sectionSubtitle, cards } = translations[language].manifesto;
      const total = words(sectionSubtitle) + cards.reduce((sum, card) => sum + words(card.title) + words(card.body), 0);
      expect(total).toBeLessThanOrEqual(65);
      cards.forEach((card) => expect(card.body).not.toMatch(/\*/));
    }
  });

  it('lights the three promises with one AuroraField, framed in the field, with a clearing measured for the copy', () => {
    const { container } = mount();
    const auroras = container.querySelectorAll('[data-webgl]');
    expect(auroras).toHaveLength(1);
    expect(auroras[0]).toHaveAttribute('aria-hidden', 'true');
    const field = auroras[0].parentElement;
    expect(field.querySelectorAll(':scope > article')).toHaveLength(3);
    // The measured box the light thins out in: empty and hidden from assistive technology.
    const clearing = auroras[0].nextElementSibling;
    expect(clearing.tagName).toBe('SPAN');
    expect(clearing).toHaveAttribute('aria-hidden', 'true');
    expect(clearing.textContent).toBe('');
  });

  it('tells each scene without words on screen, and still describes it to assistive technology in the selected language', () => {
    mount(true);

    const figures = screen.getAllByRole('figure');
    figures.forEach((figure) => {
      expect(figure.querySelector('figcaption')).toBeNull();
      expect(figure.getAttribute('aria-describedby')).toBeTruthy();
    });
    const ai = screen.getByRole('figure', { name: 'Autonomous reasoning: Enterprise data ingress → Actionable business impact' });
    expect(ai).toHaveAccessibleDescription(/stopped at the tenant boundary.*invoice is reconciled.*supplier route/);

    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    expect(screen.getByRole('figure', { name: /^Razonamiento autónomo/ })).toHaveAccessibleDescription(/límite del tenant.*concilia una factura/);
  });

  it('raises and lights a scene under a mouse without interrupting its story, and never under a finger', () => {
    mount();
    const promise = screen.getAllByRole('article')[1];
    const figure = within(promise).getByRole('figure');
    const animation = { currentTime: 3200 };
    figure.getAnimations = vi.fn(() => [animation]);
    expect(figure).toHaveAttribute('data-emphasis', 'false');

    fireEvent.pointerEnter(promise, { pointerType: 'touch' });
    expect(figure).toHaveAttribute('data-emphasis', 'false');

    fireEvent.pointerEnter(promise, { pointerType: 'mouse' });
    expect(figure).toHaveAttribute('data-emphasis', 'true');
    // The story keeps its place: nothing rewinds it.
    expect(figure.getAnimations).not.toHaveBeenCalled();
    expect(animation.currentTime).toBe(3200);

    fireEvent.pointerLeave(promise, { pointerType: 'mouse' });
    expect(figure).toHaveAttribute('data-emphasis', 'false');
  });

  it('lights the field edge where a fine pointer is, like the other panels on the site, and clears it on leave', () => {
    vi.stubGlobal('matchMedia', (query) => ({ matches: query.includes('hover: hover'), addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    vi.stubGlobal('requestAnimationFrame', (callback) => { callback(0); return 1; });
    try {
      const { container } = mount();
      const field = container.querySelector('[data-webgl]').parentElement;
      fireEvent.pointerMove(field, { clientX: 140, clientY: 60 });
      expect(field.style.getPropertyValue('--mx')).toMatch(/px$/);
      expect(field.style.getPropertyValue('--my')).toMatch(/px$/);
      fireEvent.pointerLeave(field);
      expect(field.style.getPropertyValue('--mx')).toBe('');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('pauses offscreen scenes and cleans up visibility observers', () => {
    const observers = [];
    const OriginalObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class {
      constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
      observe(element) { this.element = element; }
    };
    try {
      const { unmount } = mount();
      // The field's light observes too; the scenes are the figures.
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

  it('shows the title, the subtitle and every promise in place from the start, and never watches them scroll in', () => {
    const observers = [];
    const OriginalObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class {
      constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
      observe(element) { this.element = element; }
      unobserve() {}
    };
    try {
      mount();
      const promises = screen.getAllByRole('article');
      const heading = screen.getByRole('heading', { level: 2, name: 'Why NeuralBI' });
      const title = heading.firstElementChild;
      const subtitle = screen.getByText('What sets us apart from traditional IT consulting.');
      expect(title.textContent).toBe('Why NeuralBI');
      // No reveal state, no stagger and no delay anywhere.
      [title, subtitle, ...promises].forEach((element) => expect(element.hasAttribute('data-reveal')).toBe(false));
      expect(subtitle.style.getPropertyValue('--reveal-delay')).toBe('');
      expect(promises.map((promise) => promise.style.getPropertyValue('--i'))).toEqual(['', '', '']);
      const watched = new Set(observers.map((observer) => observer.element));
      expect([title, subtitle, ...promises].some((element) => watched.has(element))).toBe(false);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });
});

describe('Manifesto styles', () => {
  const section = read('sections/ManifestoPremium.module.css');
  const scenes = read('graphics/ManifestoScenes.module.css');

  it('lights every scene in Volt, with no indigo or cyan card', () => {
    expect(section).toMatch(/--scene-accent:\s*var\(--color-accent\)/);
    expect(section).not.toMatch(/#818cf8|#38bdf8|#6366f1/i);
  });

  it('tells each story in 8 s, with every offset scaled to the cycle', () => {
    expect(scenes).toMatch(/--cycle:\s*8s/);
    expect(scenes).toMatch(/--s:\s*calc\(var\(--cycle\) \/ 12\)/);
    // A delay in plain seconds would drift out of its beat when the pace changes.
    expect(scenes).not.toMatch(/animation-delay:\s*[\d.]+m?s/);
    expect(read('graphics/ManifestoScenes.jsx')).not.toMatch(/animationDelay: `\$\{[^}]+\}s`|'--delay': `\$\{[^}]+\}s`/);
  });

  it('draws no caption or title inside the scenes', () => {
    expect(scenes).not.toMatch(/\.caption|\.sceneTitle|narrate/);
  });

  it('draws the pointer-lit ring on the field and lights a raised scene from within, never with a halo', () => {
    expect(section).toMatch(/\.field::after\s*\{[^}]*radial-gradient\(280px circle at var\(--mx\) var\(--my\)/);
    expect(scenes).toMatch(/\.scene\[data-emphasis='true'\] \.world\s*\{\s*transform: translateY\(-7px\)/);
    expect(scenes).toMatch(/\.scene\[data-emphasis='true'\] \.glow\s*\{\s*opacity: 1/);
    expect(scenes).not.toMatch(/drop-shadow|box-shadow/);
  });

  it('keeps the copy in a clearing above the light', () => {
    expect(section).toMatch(/\.copy::before\s*\{[^}]*z-index:\s*-1/);
    expect(section).toMatch(/\.clearing\s*\{[^}]*position:\s*absolute[^}]*visibility:\s*hidden/);
  });
});
