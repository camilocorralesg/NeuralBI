import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ArchitectBuildScene } from '../../components/graphics/ArchitectBuildScene';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Architect & Build scene', () => {
  it('explains the data-to-application transformation and isolates SVG references', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<><ArchitectBuildScene /><ArchitectBuildScene /></>);
    for (const figure of screen.getAllByRole('figure')) {
      expect(figure).toHaveAccessibleDescription(/semantic database, a data filter.*navigation, form, and data table/);
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

  it('pauses independently outside the viewport and cleans up document subscriptions', () => {
    const observers = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
      observe() {}
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const remove = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<><ArchitectBuildScene /><ArchitectBuildScene /></>);
    const scenes = screen.getAllByRole('figure');
    observers[0].callback([{ isIntersecting: true }]);
    expect(scenes[0]).toHaveAttribute('data-running', 'true');
    expect(scenes[1]).toHaveAttribute('data-running', 'false');
    hidden.mockReturnValue(true);
    document.dispatchEvent(new Event('visibilitychange'));
    for (const scene of scenes) expect(scene).toHaveAttribute('data-visible', 'false');
    hidden.mockReturnValue(false);
    document.dispatchEvent(new Event('visibilitychange'));
    for (const scene of scenes) expect(scene).toHaveAttribute('data-visible', 'true');
    observers[0].callback([{ isIntersecting: false }]);
    expect(scenes[0]).toHaveAttribute('data-running', 'false');
    unmount();
    for (const observer of observers) expect(observer.disconnect).toHaveBeenCalledOnce();
    expect(remove.mock.calls.filter(([event]) => event === 'visibilitychange')).toHaveLength(2);
  });
});
