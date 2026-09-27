import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DeployScaleScene } from '../../components/graphics/DeployScaleScene';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Deploy & Scale scene', () => {
  it('describes deployment, onboarding, monitoring and capacity without duplicate SVG references', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<><DeployScaleScene /><DeployScaleScene /></>);
    for (const figure of screen.getAllByRole('figure')) {
      expect(figure).toHaveAccessibleDescription(/receives an application deployment, connects the team.*additional server tier adds capacity/);
      expect(figure).toHaveAttribute('data-running', 'true');
      const ids = Array.from(figure.querySelectorAll('[id]'), node => node.id);
      for (const node of figure.querySelectorAll('[fill], [clip-path]')) {
        for (const attribute of ['fill', 'clip-path']) {
          const reference = node.getAttribute(attribute);
          if (reference?.startsWith('url(#')) expect(ids).toContain(reference.slice(5, -1));
        }
      }
    }
    const ids = Array.from(container.querySelectorAll('[id]'), node => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('pauses offscreen and when hidden, and removes subscriptions on unmount', () => {
    let intersect;
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { intersect = callback; }
      observe() {}
      disconnect = disconnect;
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const remove = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<DeployScaleScene />);
    const scene = screen.getByRole('figure');
    expect(scene).toHaveAttribute('data-running', 'false');
    intersect([{ isIntersecting: true, intersectionRatio: .05 }]);
    expect(scene).toHaveAttribute('data-running', 'false');
    intersect([{ isIntersecting: true, intersectionRatio: 1 }]);
    expect(scene).toHaveAttribute('data-running', 'true');
    hidden.mockReturnValue(true);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(scene).toHaveAttribute('data-visible', 'false');
    hidden.mockReturnValue(false);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(scene).toHaveAttribute('data-visible', 'true');
    intersect([{ isIntersecting: false, intersectionRatio: 0 }]);
    expect(scene).toHaveAttribute('data-running', 'false');
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });
});
