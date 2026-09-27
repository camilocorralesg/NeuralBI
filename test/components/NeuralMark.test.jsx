import React from 'react';
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NeuralMark from '../../components/NeuralMark';
import { SYMBOL } from '../../components/intro/logoGeometry';
import { BRANCHES, NODES } from '../../components/intro/choreography';

let observers = [];
class Observer {
  constructor(callback, options = {}) { Object.assign(this, { callback, options }); observers.push(this); }
  observe(target) { this.target = target; }
  disconnect() { this.disconnected = true; }
}
const see = ratio => act(() => observers[0].callback([{ target: observers[0].target, intersectionRatio: ratio, isIntersecting: ratio > 0 }]));
const stubReducedMotion = reduce => vi.stubGlobal('matchMedia', query => ({ matches: reduce && query.includes('reduce'), media: query }));

beforeEach(() => {
  observers = [];
  vi.stubGlobal('IntersectionObserver', Observer);
  stubReducedMotion(false);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('NeuralMark', () => {
  it('is the finished symbol in the markup, built from the logo’s own paths, and decorative', () => {
    const { container } = render(<NeuralMark />);
    const mark = container.firstElementChild;
    expect(mark).toHaveAttribute('aria-hidden', 'true');
    expect(mark).not.toHaveAttribute('data-state');
    expect(mark.querySelectorAll('defs g > path')).toHaveLength(SYMBOL.length);
    // Every branch is a drawable stroke; every node has its own clip.
    const edges = [...mark.querySelectorAll('mask path')];
    expect(edges).toHaveLength(BRANCHES.length);
    edges.forEach(edge => expect(edge).toHaveAttribute('pathLength', '1'));
    expect(mark.querySelectorAll('clipPath[id*="-node-"]')).toHaveLength(NODES.length);
  });

  it('starts its assemble-and-disassemble loop the first time half of it is seen, and keeps it', () => {
    const { container } = render(<NeuralMark />);
    const mark = container.firstElementChild;
    expect(observers[0].options.threshold).toEqual([0, 0.5]);
    see(0);
    expect(mark).not.toHaveAttribute('data-state');
    see(0.3);
    expect(mark).not.toHaveAttribute('data-state');
    see(0.6);
    expect(mark).toHaveAttribute('data-state', 'loop');
    // Leaving the screen pauses the loop; it does not restart it.
    see(0);
    expect(mark).toHaveAttribute('data-state', 'loop');
  });

  it('runs a wave through the assembled network: a pulse per branch, a flash per node in the order the pulse reaches it', () => {
    const { container } = render(<NeuralMark />);
    const pulses = [...container.querySelectorAll('[data-branch]')];
    expect(pulses).toHaveLength(BRANCHES.length);
    // The main diagonal fires first, the uprights next, the two Vs last.
    const wave = el => parseFloat(el.style.getPropertyValue('--wave'));
    expect(pulses.map(wave)).toEqual([0, 0.6, 0.6, 1.05, 1.05]);
    const flashes = [...container.querySelectorAll('[data-node]')];
    expect(flashes).toHaveLength(NODES.length);
    // Along the main diagonal, each node flashes after the one before it.
    const main = flashes.slice(0, 4).map(wave);
    expect([...main].sort((x, y) => x - y)).toEqual(main);
    expect(new Set(main).size).toBe(4);
  });

  it('keeps the loop running only while the mark is on screen', () => {
    const { container } = render(<NeuralMark />);
    const mark = container.firstElementChild;
    expect(mark).toHaveAttribute('data-live', 'false');
    see(0.8);
    expect(mark).toHaveAttribute('data-live', 'true');
    see(0);
    expect(mark).toHaveAttribute('data-live', 'false');
  });

  it('keeps the finished mark, still, under reduced motion', () => {
    stubReducedMotion(true);
    const { container } = render(<NeuralMark />);
    expect(observers).toHaveLength(0);
    expect(container.firstElementChild).not.toHaveAttribute('data-state');
  });
});
