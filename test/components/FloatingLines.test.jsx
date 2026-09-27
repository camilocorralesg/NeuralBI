import React from 'react';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import FloatingLines from '../../components/FloatingLines';

afterEach(() => { vi.restoreAllMocks(); });

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
