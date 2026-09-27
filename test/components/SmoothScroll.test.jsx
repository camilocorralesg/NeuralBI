import React from 'react';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SmoothScroll from '../../components/SmoothScroll';
import { getLenis, lockScroll, scrollToTarget, unlockScroll } from '../../lib/smoothScroll';

const lenis = vi.hoisted(() => ({ instances: [] }));
vi.mock('lenis', () => ({
  default: class MockLenis {
    constructor(options) {
      this.options = options;
      this.raf = vi.fn();
      this.destroy = vi.fn();
      this.scrollTo = vi.fn();
      this.stop = vi.fn();
      this.start = vi.fn();
      lenis.instances.push(this);
    }
  },
}));

function stubPointer({ fine = true, reduce = false } = {}) {
  vi.stubGlobal('matchMedia', (query) => ({
    media: query,
    matches: query.includes('prefers-reduced-motion') ? reduce : query.includes('pointer: fine') ? fine : false,
    addEventListener() {}, removeEventListener() {},
  }));
}
const section = (top) => {
  const element = document.createElement('section');
  element.getBoundingClientRect = () => ({ top, bottom: top + 400, left: 0, right: 0, width: 0, height: 400 });
  return element;
};

let scrollTo;
beforeEach(() => {
  lenis.instances.length = 0;
  scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Programmatic scrolling (lib/smoothScroll)', () => {
  it('scrolls natively when Lenis is not running: to an element with an offset, or to a position at once', () => {
    expect(getLenis()).toBeNull();
    scrollToTarget(section(500), { offset: -24 });
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 500 + window.scrollY - 24, behavior: 'smooth' });
    scrollToTarget(1200, { immediate: true });
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 1200, behavior: 'instant' });
    scrollToTarget(null);
    expect(scrollTo).toHaveBeenCalledTimes(2);
    expect(() => { lockScroll(); unlockScroll(); }).not.toThrow();
  });
});

describe('SmoothScroll (Lenis)', () => {
  it('runs for a fine pointer and carries every programmatic scroll, lock and release', () => {
    stubPointer();
    const { unmount } = render(<SmoothScroll />);
    expect(lenis.instances).toHaveLength(1);
    const instance = lenis.instances[0];
    expect(instance.options).toMatchObject({ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: { offset: -24 } });
    expect(getLenis()).toBe(instance);

    const target = section(800);
    scrollToTarget(target);
    expect(instance.scrollTo).toHaveBeenCalledWith(target, { offset: 0, immediate: false, force: true });
    expect(scrollTo).not.toHaveBeenCalled();
    lockScroll();
    expect(instance.stop).toHaveBeenCalled();
    unlockScroll();
    expect(instance.start).toHaveBeenCalled();

    unmount();
    expect(instance.destroy).toHaveBeenCalled();
    expect(getLenis()).toBeNull();
  });

  it.each([
    ['touch', { fine: false }],
    ['reduced motion', { reduce: true }],
  ])('leaves the browser its own scrolling under %s', (_label, pointer) => {
    stubPointer(pointer);
    render(<SmoothScroll />);
    expect(lenis.instances).toHaveLength(0);
    expect(getLenis()).toBeNull();
  });
});
