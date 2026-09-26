import React, { createRef } from 'react';
import { act, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Reveal from '../../components/Reveal';
import { tokenize, wordsIn } from '../../components/revealTiming';

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

describe('Reveal (blocks below a headline)', () => {
  it('serves the finished block: no reveal state in the server HTML, its tag, class and delay kept', () => {
    const html = renderToString(<Reveal as="p" className="lede" delay={280}>Supporting copy</Reveal>);
    expect(html).toMatch(/^<p class="[^"]*lede"/);
    expect(html).not.toContain('data-reveal');
    expect(html).toContain('--reveal-delay:280ms');
    expect(html).toContain('Supporting copy');
  });

  it('arms off screen, runs once when seen, then clears after its own duration and delay', () => {
    vi.useFakeTimers();
    const { container } = render(<Reveal variant="block" delay={200}>Panel</Reveal>);
    const block = container.firstChild;
    expect(block.className).toMatch(/block/);
    act(() => observers[0].callback([{ isIntersecting: false, intersectionRatio: 0 }]));
    expect(block).toHaveAttribute('data-reveal', 'armed');
    act(() => observers[0].callback([{ isIntersecting: true, intersectionRatio: 0.5 }]));
    expect(block).toHaveAttribute('data-reveal', 'run');
    expect(observers[0].disconnect).toHaveBeenCalled();
    // A block lands in 700 ms after its 200 ms delay, plus slack.
    act(() => vi.advanceTimersByTime(699 + 200));
    expect(block).toHaveAttribute('data-reveal', 'run');
    act(() => vi.advanceTimersByTime(101));
    expect(block.hasAttribute('data-reveal')).toBe(false);
  });

  it('leaves a block already on screen at load where it is, and shares its element with the caller', () => {
    const ref = createRef();
    const { container } = render(<Reveal ref={ref} variant="visual">Stage</Reveal>);
    expect(ref.current).toBe(container.firstChild);
    act(() => observers[0].callback([{ isIntersecting: true, intersectionRatio: 1 }]));
    expect(container.firstChild.hasAttribute('data-reveal')).toBe(false);
  });
});

describe('Headline timing (revealTiming)', () => {
  it('splits words and the Volt italic, keeping punctuation on the italic word', () => {
    expect(tokenize('The Neural *Protocol.*')).toEqual([
      { word: 'The', italic: false, tail: '' },
      { word: 'Neural', italic: false, tail: '' },
      { word: 'Protocol.', italic: true, tail: '' },
    ]);
    expect(tokenize('The New Enterprise *Blueprint*.').at(-1)).toEqual({ word: 'Blueprint', italic: true, tail: '.' });
  });

  it('gives the delay after which a second line continues the first', () => {
    expect(wordsIn('The Math Speaks')).toBeCloseTo(0.096, 5);
    expect(wordsIn(undefined)).toBe(0);
  });
});
