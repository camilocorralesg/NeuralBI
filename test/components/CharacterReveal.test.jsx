import React from 'react';
import { act, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CharacterReveal from '../../components/CharacterReveal';

let observers;
beforeEach(() => {
  observers = [];
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options) { this.callback = callback; this.options = options; this.disconnect = vi.fn(); observers.push(this); }
    observe(element) { this.element = element; }
    unobserve() {}
  });
});
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

const TITLE = 'Frequently Asked *Questions.*';
const see = (records) => act(() => observers[0].callback(records));

describe('CharacterReveal and the reveal state (useReveal)', () => {
  it('serves the finished line: no reveal state, the full text once for readers, the italic in Volt', () => {
    const html = renderToString(<CharacterReveal text={TITLE} />);
    expect(html).not.toContain('data-reveal');
    expect(html).toContain('Frequently Asked Questions.');
    expect(html).toMatch(/<em class="title-italic"[^>]*>Questions\.<\/em>/);
  });

  it('leaves a title that is already on screen at load exactly where it is', () => {
    const { container } = render(<CharacterReveal text={TITLE} />);
    const reveal = container.firstChild;
    see([{ isIntersecting: true, intersectionRatio: 1 }]);
    expect(reveal.hasAttribute('data-reveal')).toBe(false);
    expect(observers[0].disconnect).toHaveBeenCalled();
  });

  it('arms a title that loads off screen and runs it once, when a fifth of it is seen', () => {
    vi.useFakeTimers();
    const { container } = render(<CharacterReveal text={TITLE} />);
    const reveal = container.firstChild;
    expect(observers[0].options.threshold).toEqual([0, 0.2]);

    see([{ isIntersecting: false, intersectionRatio: 0 }]);
    expect(reveal).toHaveAttribute('data-reveal', 'armed');
    // A sliver is not enough, and in a batch the last record is the current state.
    see([{ isIntersecting: true, intersectionRatio: 0.1 }]);
    see([{ isIntersecting: true, intersectionRatio: 0.6 }, { isIntersecting: false, intersectionRatio: 0 }]);
    expect(reveal).toHaveAttribute('data-reveal', 'armed');

    see([{ isIntersecting: true, intersectionRatio: 0.6 }]);
    expect(reveal).toHaveAttribute('data-reveal', 'run');
    expect(observers[0].disconnect).toHaveBeenCalled();

    // Three words, 32 ms apart, 720 ms each, and a little slack: then nothing is left behind.
    act(() => vi.advanceTimersByTime(720 + 3 * 32 + 100));
    expect(reveal.hasAttribute('data-reveal')).toBe(false);
  });

  it('rises each word out of its own mask, indexed for the shared word step after the delay, hidden from readers', () => {
    const { container } = render(<CharacterReveal text={TITLE} delay={0.12} />);
    expect(container.firstChild.style.getPropertyValue('--base')).toBe('120ms');
    // The step is the --stagger-words token unless a caller sets its own.
    expect(container.firstChild.style.getPropertyValue('--word-step')).toBe('');
    const words = [...container.querySelectorAll('[aria-hidden="true"] > span')];
    expect(words.map((word) => word.textContent)).toEqual(['Frequently', 'Asked', 'Questions.']);
    expect(words.map((word) => word.style.getPropertyValue('--n'))).toEqual(['0', '1', '2']);
    // Each word is a window around the part that rises.
    expect(words.every((word) => word.children.length === 1)).toBe(true);
  });

  it('keeps punctuation after the italic on the same word, upright, and lets a caller set its own step', () => {
    const { container } = render(<CharacterReveal text="The New Enterprise *Blueprint*." stagger={0.022} />);
    const words = [...container.querySelectorAll('[aria-hidden="true"] > span')];
    expect(words.map((word) => word.textContent)).toEqual(['The', 'New', 'Enterprise', 'Blueprint.']);
    const last = words[3];
    expect(last.querySelector('em').textContent).toBe('Blueprint');
    expect(container.firstChild.style.getPropertyValue('--word-step')).toBe('22ms');
  });
});
