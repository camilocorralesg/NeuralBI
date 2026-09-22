import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { McsGroundedReasoningAnim, McsMultiStepChainAnim, McsZeroHallucinationFieldAnim } from '../../components/graphics/CopilotStudioAnimations';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Copilot Studio animations', () => {
  it('describes the three concepts without exposing decorative controls', () => {
    render(<><McsGroundedReasoningAnim /><McsMultiStepChainAnim /><McsZeroHallucinationFieldAnim /></>);
    expect(screen.getByRole('figure', { name: 'Grounded Reasoning & Action Loop' })).toHaveAccessibleDescription(/retrieves context from Dataverse and SharePoint/);
    expect(screen.getByRole('figure', { name: 'Multi-Step Agentic Chain' })).toHaveAccessibleDescription(/retrieve the invoice and purchase order, validate the match and policy/);
    expect(screen.getByRole('figure', { name: 'Grounding & Enterprise Guardrails' })).toHaveAccessibleDescription(/unsupported claim is held for review/);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('pauses each scene independently and removes subscriptions when the modal closes', () => {
    const observers = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
      observe() {}
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const { unmount } = render(<><McsGroundedReasoningAnim /><McsMultiStepChainAnim /><McsZeroHallucinationFieldAnim /></>);
    const figures = screen.getAllByRole('figure');
    observers[1].callback([{ isIntersecting: true }]);
    expect(figures[0]).toHaveAttribute('data-running', 'false');
    expect(figures[1]).toHaveAttribute('data-running', 'true');
    expect(figures[2]).toHaveAttribute('data-running', 'false');
    hidden.mockReturnValue(true);
    document.dispatchEvent(new Event('visibilitychange'));
    for (const figure of figures) expect(figure).toHaveAttribute('data-visible', 'false');
    hidden.mockReturnValue(false);
    document.dispatchEvent(new Event('visibilitychange'));
    for (const figure of figures) expect(figure).toHaveAttribute('data-visible', 'true');
    observers[1].callback([{ isIntersecting: false }]);
    expect(figures[1]).toHaveAttribute('data-running', 'false');
    const remove = vi.spyOn(document, 'removeEventListener');
    unmount();
    for (const observer of observers) expect(observer.disconnect).toHaveBeenCalledOnce();
    expect(remove.mock.calls.filter(([event]) => event === 'visibilitychange')).toHaveLength(3);
  });

  it('keeps clipping and accessible references unique and supports an observer fallback', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<><McsMultiStepChainAnim /><McsMultiStepChainAnim /></>);
    const ids = Array.from(container.querySelectorAll('[id]'), el => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const el of container.querySelectorAll('[clip-path]')) expect(ids).toContain(el.getAttribute('clip-path').slice(5, -1));
    for (const figure of screen.getAllByRole('figure')) expect(figure).toHaveAttribute('data-running', 'true');
  });
});
