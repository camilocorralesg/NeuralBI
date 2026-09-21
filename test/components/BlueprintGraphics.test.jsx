import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AiNativeGraphic, WarpSpeedGraphic, ZeroFrictionGraphic } from '../../components/graphics/BlueprintGraphics';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Blueprint 2D graphics', () => {
  it('describes each original concept accessibly without exposing decorative controls', () => {
    render(<><AiNativeGraphic /><WarpSpeedGraphic /><ZeroFrictionGraphic /></>);
    expect(screen.getAllByRole('figure')).toHaveLength(3);
    expect(screen.getByText(/two sources converges/)).toBeInTheDocument();
    expect(screen.getByText(/Quarter markers become week markers/)).toBeInTheDocument();
    expect(screen.getByText(/Four scattered interface modules/)).toBeInTheDocument();
    expect(screen.getByText('SYNCED').closest('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('pauses outside the viewport and when hidden, then releases its subscriptions', () => {
    let intersect;
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { intersect = callback; }
      observe() {}
      disconnect = disconnect;
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const removeListener = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<AiNativeGraphic />);
    const figure = screen.getByRole('figure');
    expect(figure).toHaveAttribute('data-running', 'false');
    intersect([{ isIntersecting: true }]);
    expect(figure).toHaveAttribute('data-running', 'true');
    hidden.mockReturnValue(true);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(figure).toHaveAttribute('data-page-visible', 'false');
    hidden.mockReturnValue(false);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(figure).toHaveAttribute('data-page-visible', 'true');
    intersect([{ isIntersecting: false }]);
    expect(figure).toHaveAttribute('data-running', 'false');
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(removeListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });

  it('uses unique SVG paint references even when graphics are repeated', () => {
    const { container } = render(<><AiNativeGraphic /><AiNativeGraphic /><WarpSpeedGraphic /><WarpSpeedGraphic /><ZeroFrictionGraphic /></>);
    const ids = Array.from(container.querySelectorAll('defs [id]'), element => element.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const element of container.querySelectorAll('[fill^="url("]')) {
      const target = element.getAttribute('fill').slice(5, -1);
      expect(ids).toContain(target);
    }
  });

  it('renders without an IntersectionObserver implementation', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { unmount } = render(<ZeroFrictionGraphic />);
    expect(screen.getByRole('figure')).toHaveAttribute('data-running', 'true');
    expect(unmount).not.toThrow();
  });
});
