import React, { createRef } from 'react';
import { render } from '@testing-library/react';
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
afterEach(() => { vi.unstubAllGlobals(); });

describe('Reveal (blocks below a headline)', () => {
  it('serves the finished block with its tag, class and children, and nothing of the old arrival', () => {
    const html = renderToString(<Reveal as="p" className="lede" variant="text" delay={280} amount={0.3}>Supporting copy</Reveal>);
    expect(html).toBe('<p class="lede">Supporting copy</p>');
  });

  it('stays in place once mounted: no reveal state, no delay, and no observer watching it scroll in', () => {
    const { container } = render(<Reveal variant="block" delay={200}>Panel</Reveal>);
    const block = container.firstChild;
    expect(block.hasAttribute('data-reveal')).toBe(false);
    expect(block.getAttribute('style')).toBeNull();
    expect(observers).toHaveLength(0);
  });

  it('shares its element with the caller and passes other attributes through', () => {
    const ref = createRef();
    const { container } = render(<Reveal ref={ref} variant="visual" id="stage" aria-label="Stage">Stage</Reveal>);
    expect(ref.current).toBe(container.firstChild);
    expect(container.firstChild).toHaveAttribute('id', 'stage');
    expect(container.firstChild).toHaveAttribute('aria-label', 'Stage');
    expect(container.firstChild.hasAttribute('variant')).toBe(false);
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
