import React from 'react';
import { render } from '@testing-library/react';
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
afterEach(() => { vi.unstubAllGlobals(); });

const TITLE = 'Frequently Asked *Questions.*';

describe('CharacterReveal (a section headline with the Volt italic)', () => {
  it('serves the finished line once: plain text, the italic in Volt, no reveal state', () => {
    const html = renderToString(<CharacterReveal text={TITLE} />);
    expect(html).not.toContain('data-reveal');
    expect(html).not.toContain('aria-hidden');
    expect(html).toMatch(/<em class="title-italic"[^>]*>Questions\.<\/em>/);
  });

  it('reads as one sentence, with no hidden copy, and never watches the title scroll in', () => {
    const { container } = render(<CharacterReveal text={TITLE} delay={0.12} stagger={0.022} />);
    const title = container.firstChild;
    expect(title.textContent).toBe('Frequently Asked Questions.');
    expect(title.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
    expect(title.hasAttribute('data-reveal')).toBe(false);
    expect(title.style.getPropertyValue('--base')).toBe('');
    expect(title.style.getPropertyValue('--word-step')).toBe('');
    expect(observers).toHaveLength(0);
  });

  it('keeps punctuation after the italic upright, right after the italic word', () => {
    const { container } = render(<CharacterReveal text="The New Enterprise *Blueprint*." />);
    const title = container.firstChild;
    expect(title.textContent).toBe('The New Enterprise Blueprint.');
    expect(title.querySelector('em').textContent).toBe('Blueprint');
    expect(title.lastChild.textContent).toBe('.');
  });

  it('renders a non-string title as it is, and nothing for an empty one', () => {
    const { container, rerender } = render(<CharacterReveal text={<b>Node</b>} />);
    expect(container.querySelector('b').textContent).toBe('Node');
    rerender(<CharacterReveal text="" />);
    expect(container.firstChild).toBeNull();
  });
});
