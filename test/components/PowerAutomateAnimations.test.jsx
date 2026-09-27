import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PauSelfHealingFlowAnim, PauEventDrivenMeshAnim, PauResilientDlqMeshAnim } from '../../components/graphics/PowerAutomateAnimations';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Power Automate animations', () => {
  it('explains execution, orchestration and recovery accessibly', () => {
    render(<><PauSelfHealingFlowAnim /><PauEventDrivenMeshAnim /><PauResilientDlqMeshAnim /></>);
    expect(screen.getByRole('figure', { name: 'Autonomous Cloud & Desktop RPA Architecture' })).toHaveAccessibleDescription(/transient cloud error triggers a backoff retry/);
    expect(screen.getByRole('figure', { name: 'Real-Time Enterprise API Orchestration' })).toHaveAccessibleDescription(/Process mining then receives execution insights/);
    expect(screen.getByRole('figure', { name: 'Zero-Trust Resilient Mesh & Observability' })).toHaveAccessibleDescription(/configured replay after service recovery/);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('independently pauses scenes out of view and releases observers on modal close', () => {
    const observers = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
      observe() {}
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const { unmount } = render(<><PauSelfHealingFlowAnim /><PauEventDrivenMeshAnim /><PauResilientDlqMeshAnim /></>);
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

  it('keeps SVG and accessibility references unique when instances repeat', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<><PauResilientDlqMeshAnim /><PauResilientDlqMeshAnim /></>);
    const ids = Array.from(container.querySelectorAll('[id]'), el => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const el of container.querySelectorAll('[fill^="url("]')) expect(ids).toContain(el.getAttribute('fill').slice(5, -1));
    for (const figure of screen.getAllByRole('figure')) expect(figure).toHaveAttribute('data-running', 'true');
  });
});
