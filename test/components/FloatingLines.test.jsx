import React from 'react';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FloatingLines from '../../components/FloatingLines';

// The lines make their context on the near observer's first report, which a browser sends right after the first layout
// (the hero is near at load); measuring the box at mount instead forced a layout of the whole page during hydration.
beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options = {}) { Object.assign(this, { callback, options }); }
    observe(target) { if (this.options.rootMargin === '100% 0px') this.callback([{ target, isIntersecting: true }]); }
    disconnect() {}
  });
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('FloatingLines without WebGL', () => {
  it('gives way to the still CSS light instead of throwing when the browser has no WebGL', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    const { container } = render(<FloatingLines />);
    const lines = container.querySelector('.floating-lines-container');
    expect(lines).toHaveAttribute('data-webgl', 'false');
    expect(lines.querySelector('canvas')).toBeNull();
    expect(warn).toHaveBeenCalled();
  });

  it('falls back the same way when a context exists but the renderer cannot start', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // A context that answers the probe but cannot run three.js (blocked, lost or a broken driver).
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({});
    let result;
    expect(() => { result = render(<FloatingLines />); }).not.toThrow();
    expect(result.container.querySelector('.floating-lines-container')).toHaveAttribute('data-webgl', 'false');
  });
});
