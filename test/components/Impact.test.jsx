import React from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Impact from '../../components/sections/Impact';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

vi.mock('../../components/auroraRenderer', () => ({ createAuroraRenderer: vi.fn(() => null) }));
vi.mock('../../components/CharacterReveal', () => ({ default: ({ text }) => <span data-testid="reveal">{text.replaceAll('*', '')}</span> }));

// The test decides what every observer sees: the rows' observer (two thresholds), the beam's and the Aurora's.
let observers = [];
class Observer {
  constructor(callback, options = {}) { Object.assign(this, { callback, options, targets: [], unobserved: [] }); observers.push(this); }
  observe(target) { this.targets.push(target); }
  unobserve(target) { this.unobserved.push(target); }
  disconnect() { this.disconnected = true; }
}
// The ledger's own observer watches the rows (the lede and the link have their own reveal observers).
const rowsObserver = () => observers.find(observer => observer.targets.some(target => target.tagName === 'LI'));
const beamObserver = () => observers.find(observer => observer.targets[0]?.hasAttribute('data-live'));
const see = (observer, reports) => act(() => observer.callback(reports.map(([target, ratio]) => ({ target, intersectionRatio: ratio, isIntersecting: ratio > 0 }))));
const stubReducedMotion = reduce => vi.stubGlobal('matchMedia', query => ({
  matches: reduce && query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {},
}));

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}
const tree = () => <LanguageProvider><LanguageSwitch /><Impact activeHero="remix" /></LanguageProvider>;
const mount = () => render(tree());
// What each figure reads at rest: the faces of its digits.
const faces = container => [...container.querySelectorAll('[data-value]')].map(figure => [...figure.querySelectorAll('[data-face]')].map(face => face.textContent).join(''));

beforeEach(() => {
  localStorage.clear();
  observers = [];
  vi.stubGlobal('IntersectionObserver', Observer);
  stubReducedMotion(false);
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Impact: the ROI instrument', () => {
  it('states each figure in full for screen readers, with its lanes, notes and a CTA to talk to an architect, in both languages', () => {
    const { container } = mount();
    const assertContent = locale => {
      const copy = translations[locale].impact;
      const { speed, cost, rows } = copy.metrics;
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(`${copy.titleLine1} ${copy.titleLine2.replaceAll('*', '')}`);
      expect(screen.getByText(copy.subtitle)).toBeInTheDocument();
      [speed, cost, rows].forEach(metric => {
        expect(screen.getByText(metric.spoken)).toBeInTheDocument();
        expect(screen.getByText(metric.label)).toBeInTheDocument();
      });
      [...speed.bars, speed.caption, cost.before, cost.after, cost.saved, rows.hours, rows.rate]
        .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
      expect(screen.getByRole('link', { name: copy.cta })).toHaveAttribute('href', '#contact');
    };
    assertContent('en');
    // Typographic signs, not keyboard stand-ins.
    expect(container.textContent).toContain('×');
    expect(container.textContent).toContain('−');
    expect(container.textContent).not.toMatch(/\b7x\b|-65/);
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    assertContent('es');
  });

  it('gives the three figures one size and shows them resolved before anything rolls', () => {
    const { container } = mount();
    const figures = [...container.querySelectorAll('[data-value]')];
    expect(figures.map(figure => figure.getAttribute('data-value'))).toEqual(['7', '65', '25']);
    expect(new Set(figures.map(figure => figure.parentElement.className)).size).toBe(1);
    expect(container.querySelector('[class*="hero"]')).toBeNull();
    expect(faces(container)).toEqual(['7', '65', '25']);
    // Nothing but the digits until a row rolls.
    expect(figures.map(figure => figure.textContent)).toEqual(['7', '65', '25']);
    expect(container.querySelectorAll('[data-count]')).toHaveLength(0);
  });

  it('arms the rows that load off screen and rolls each once it is well in view; a row already on screen stays resolved', () => {
    mount();
    const observer = rowsObserver();
    const [speedRow, costRow, rowsRow] = observer.targets;
    expect(observer.options.threshold).toEqual([0, .6]);

    // The first report: the first row is on screen already, the other two are below the fold.
    see(observer, [[speedRow, .4], [costRow, 0], [rowsRow, 0]]);
    expect(speedRow).not.toHaveAttribute('data-count');
    expect(observer.unobserved).toContain(speedRow);
    expect(costRow).toHaveAttribute('data-count', 'armed');
    expect(rowsRow).toHaveAttribute('data-count', 'armed');
    // Only the rows that will roll mount their reels, one per digit.
    const reels = row => row.querySelectorAll('[data-face] + span').length;
    expect([speedRow, costRow, rowsRow].map(reels)).toEqual([0, 2, 2]);

    // A sliver is not enough; well in view, a row rolls, once.
    see(observer, [[costRow, .3]]);
    expect(costRow).toHaveAttribute('data-count', 'armed');
    see(observer, [[costRow, .7]]);
    expect(costRow).toHaveAttribute('data-count', 'run');
    expect(observer.unobserved).toContain(costRow);
    see(observer, [[rowsRow, .65]]);
    expect(rowsRow).toHaveAttribute('data-count', 'run');

    // Rows that arrive together keep the ledger's order: each starts 140 ms after the one above.
    expect([speedRow, costRow, rowsRow].map(row => row.style.getPropertyValue('--delay'))).toEqual(['0ms', '140ms', '280ms']);
  });

  it('never arms a row under reduced motion: the instrument stays resolved', () => {
    stubReducedMotion(true);
    const { container } = mount();
    expect(rowsObserver()).toBeUndefined();
    expect(container.querySelectorAll('[data-count]')).toHaveLength(0);
    expect(faces(container)).toEqual(['7', '65', '25']);
  });

  it('hydrates the server HTML without a mismatch, with or without reduced motion', async () => {
    for (const reduce of [false, true]) {
      const host = document.createElement('div');
      host.innerHTML = renderToString(tree());
      document.body.appendChild(host);
      const recoverable = [];
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      stubReducedMotion(reduce);
      let root;
      try {
        await act(async () => {
          root = hydrateRoot(host, tree(), { onRecoverableError: error => recoverable.push(error) });
        });
        expect(recoverable).toEqual([]);
        expect(consoleError.mock.calls.filter(call => /hydrat|didn't match/i.test(call.join(' ')))).toEqual([]);
        expect(faces(host)).toEqual(['7', '65', '25']);
      } finally {
        consoleError.mockRestore();
        act(() => root?.unmount());
        host.remove();
      }
    }
  });

  it('lays the Aurora under the panel and clears the light beneath the glass', () => {
    const observed = [];
    vi.stubGlobal('ResizeObserver', class { observe(element) { observed.push(element); } disconnect() {} });
    const { container } = mount();
    const section = container.querySelector('section');
    const aurora = section.firstElementChild;
    expect(aurora).toHaveAttribute('aria-hidden', 'true');
    expect(aurora.querySelector('canvas')).toBeInTheDocument();
    // The Aurora sizes its clearing to the panel (the one that carries the beam).
    expect(observed).toContain(container.querySelector('[data-live]').parentElement);
  });

  it('runs one beam round the edge while the panel is on screen, hidden from assistive technology', () => {
    const { container } = mount();
    const beam = container.querySelector('[data-live]');
    expect(beam).toHaveAttribute('aria-hidden', 'true');
    expect(beam).toHaveAttribute('data-live', 'false');
    // The crisp comet on the ring and its soft glow inside the glass.
    expect(beam.querySelectorAll(':scope > span > i')).toHaveLength(2);
    see(beamObserver(), [[beam, 1]]);
    expect(beam).toHaveAttribute('data-live', 'true');
    see(beamObserver(), [[beam, 0]]);
    expect(beam).toHaveAttribute('data-live', 'false');
  });

  it('draws the proofs as line instruments: one cycle against seven releases, the cost falling to what is kept, a 24-hour dial', () => {
    const { container } = mount();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    const instruments = [...container.querySelectorAll('ul svg')];
    expect(instruments).toHaveLength(3);
    instruments.forEach(svg => expect(svg).toHaveAttribute('aria-hidden', 'true'));
    // Every drawn stroke is measured in one unit, so it can be drawn from start to end.
    container.querySelectorAll('ul svg [pathLength]').forEach(stroke => expect(stroke.getAttribute('pathLength')).toBe('1'));
    // 7×: one traditional arc over seven NeuralBI releases.
    expect(container.querySelectorAll('[data-arc="traditional"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-cycle]')).toHaveLength(7);
    // −65%: the curve keeps 35%, and the measure is labelled.
    expect(container.querySelector('[data-kept]')).toHaveAttribute('data-kept', '0.35');
    expect(container.querySelector('[data-dimension]')).toHaveTextContent(translations.en.impact.metrics.cost.saved);
    // 25M+: a mark for every hour, taller every six.
    expect(container.querySelectorAll('[data-hour]')).toHaveLength(24);
    expect([...container.querySelectorAll('[data-major]')].map(tick => tick.dataset.hour)).toEqual(['0', '6', '12', '18']);
    expect(screen.getAllByTestId('reveal')).toHaveLength(2);
  });
});
