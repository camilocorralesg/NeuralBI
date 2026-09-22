import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuditBlueprintScene } from '../../components/graphics/AuditBlueprintScene';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Audit & Blueprint scene', () => {
  it('describes the inspection and blueprint, with independent SVG references', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<><AuditBlueprintScene /><AuditBlueprintScene /></>);
    for (const figure of screen.getAllByRole('figure')) {
      expect(figure).toHaveAccessibleDescription(/magnifying lens inspects the schema.*completed engineering blueprint/);
      expect(figure).toHaveAttribute('data-running', 'true');
      const ids = Array.from(figure.querySelectorAll('[id]'), node => node.id);
      for (const node of figure.querySelectorAll('[fill], [filter]')) {
        for (const attribute of ['fill', 'filter']) {
          const reference = node.getAttribute(attribute);
          if (reference?.startsWith('url(#')) expect(ids).toContain(reference.slice(5, -1));
        }
      }
    }
    const ids = Array.from(container.querySelectorAll('[id]'), node => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('pauses outside the viewport or in a hidden document and cleans up', () => {
    let onIntersection;
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { onIntersection = callback; }
      observe() {}
      disconnect = disconnect;
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const remove = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<AuditBlueprintScene />);
    const scene = screen.getByRole('figure');
    expect(scene).toHaveAttribute('data-running', 'false');
    onIntersection([{ isIntersecting: true }]);
    expect(scene).toHaveAttribute('data-running', 'true');
    hidden.mockReturnValue(true);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(scene).toHaveAttribute('data-visible', 'false');
    hidden.mockReturnValue(false);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(scene).toHaveAttribute('data-visible', 'true');
    onIntersection([{ isIntersecting: false }]);
    expect(scene).toHaveAttribute('data-running', 'false');
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });
});
