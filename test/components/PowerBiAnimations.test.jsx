import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PbiAiInsightsOverlayAnim, PbiDataStorytellingUiAnim, PbiSemanticModelGraphAnim } from '../../components/graphics/PowerBiAnimations';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Power BI animation lifecycle', () => {
  it('gives each illustration a stable accessible name and explanation', () => {
    render(<><PbiDataStorytellingUiAnim /><PbiAiInsightsOverlayAnim /><PbiSemanticModelGraphAnim /></>);
    expect(screen.getByRole('figure', { name: 'High-Adoption Executive Dashboard' })).toHaveAccessibleDescription(/98.4% adoption/);
    expect(screen.getByRole('figure', { name: 'Automated Reasoning Overlay' })).toHaveAccessibleDescription(/retention expanded 42%/);
    expect(screen.getByRole('figure', { name: 'Advanced Semantic Architecture' })).toHaveAccessibleDescription(/one-to-many relationships/);
  });

  it('pauses out of view and in background tabs, and cleans up when the modal closes', () => {
    let intersect;
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { intersect = callback; }
      observe() {}
      disconnect = disconnect;
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const remove = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<PbiAiInsightsOverlayAnim />);
    const figure = screen.getByRole('figure');
    expect(figure).toHaveAttribute('data-running', 'false');
    intersect([{ isIntersecting: true }]);
    expect(figure).toHaveAttribute('data-running', 'true');
    hidden.mockReturnValue(true);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(figure).toHaveAttribute('data-visible', 'false');
    hidden.mockReturnValue(false);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(figure).toHaveAttribute('data-visible', 'true');
    intersect([{ isIntersecting: false }]);
    expect(figure).toHaveAttribute('data-running', 'false');
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });

  it('keeps paint and accessibility references unique across multiple instances', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<><PbiAiInsightsOverlayAnim /><PbiAiInsightsOverlayAnim /><PbiDataStorytellingUiAnim /><PbiDataStorytellingUiAnim /></>);
    const ids = Array.from(container.querySelectorAll('[id]'), element => element.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const element of container.querySelectorAll('[fill^="url("]')) {
      expect(ids).toContain(element.getAttribute('fill').slice(5, -1));
    }
    for (const figure of screen.getAllByRole('figure')) expect(figure).toHaveAttribute('data-running', 'true');
  });
});
