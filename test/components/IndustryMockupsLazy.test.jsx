import React from 'react';
import fs from 'fs';
import path from 'path';
import { act, render, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import IndustryArchitecture from '../../components/graphics/IndustryArchitecture';

// The Industries products load on approach. This file runs in its own module registry, so nothing is preloaded.
const observers = [];
beforeEach(() => {
  observers.length = 0;
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options = {}) { this.callback = callback; this.options = options; this.disconnect = vi.fn(); observers.push(this); }
    observe(target) { this.target = target; }
  });
});
afterEach(() => vi.unstubAllGlobals());
// The first import of a mockup is transformed on the spot; under a full parallel run that can take seconds.
const LOADING = { timeout: 20000 };
// The scene's approach watcher (the light field inside the stage watches its own approach too).
const approach = () => observers.find((observer) => observer.options.rootMargin && observer.target?.dataset?.sector);

describe('Industries products, one chunk each', () => {
  it('keeps the sixteen products out of the first load: each is a dynamic import', () => {
    const read = (file) => fs.readFileSync(path.resolve(__dirname, '../../components/graphics', file), 'utf8');
    expect(read('IndustryArchitecture.jsx')).not.toMatch(/^import \w+ from '\.\.\/mockups\/(?!MockupStage)/m);
    const registry = read('industryMockups.js');
    expect(registry).not.toMatch(/^import \w+ from '\.\.\/mockups\//m);
    const imports = [...registry.matchAll(/import\(\/\* webpackChunkName: "([\w-]+)" \*\/ '\.\.\/mockups\/\w+'\)/g)];
    expect(imports).toHaveLength(16);
    // One chunk per sector: four products each, so their shared UI code ships four times, not sixteen.
    expect(new Set(imports.map((match) => match[1]))).toEqual(new Set(['mockups-supply-chain', 'mockups-fintech', 'mockups-manufacturing', 'mockups-retail']));
  });

  it('stands the stage in place at once and brings the product when the section comes within a screen', async () => {
    const { container } = render(<IndustryArchitecture industry="supply-chain" solution={0} language="en" />);
    const stage = container.querySelector('[data-mockup]');
    // Never an empty ground: the stage, its frame and its light are there before the product.
    expect(stage).not.toBeNull();
    expect(stage).toHaveAttribute('data-frame', 'window');
    expect(stage.querySelector('[data-webgl]')).not.toBeNull();
    expect(within(stage).queryByText('Supply Control Tower')).toBeNull();

    // Still far away: nothing loads.
    expect(approach().options.rootMargin).toBe('100% 0px');
    act(() => approach().callback([{ isIntersecting: false }]));
    expect(within(stage).queryByText('Supply Control Tower')).toBeNull();

    act(() => approach().callback([{ isIntersecting: true }]));
    await waitFor(() => expect(within(container.querySelector('[data-mockup]')).getByText('Supply Control Tower')).toBeInTheDocument(), LOADING);
    expect(approach().disconnect).toHaveBeenCalled();
  }, 30000);

  it('loads a product chosen before the idle preload reaches it', async () => {
    const { container, rerender } = render(<IndustryArchitecture industry="retail" solution={0} language="en" />);
    act(() => approach().callback([{ isIntersecting: true }]));
    rerender(<IndustryArchitecture industry="manufacturing" solution={3} language="en" />);
    await waitFor(() => expect(within(container.querySelector('[data-mockup]')).getAllByText('Floor Assistant').length).toBeGreaterThan(0), LOADING);
  }, 30000);
});
