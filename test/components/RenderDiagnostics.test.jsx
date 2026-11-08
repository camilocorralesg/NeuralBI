import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RenderDiagnostics from '../../components/RenderDiagnostics';

describe('RenderDiagnostics (?diag)', () => {
  it('reports the browser, motion settings, frame rate, WebGL, CSS support and the live effects, ready to copy', async () => {
    document.body.innerHTML = '<div class="floating-lines-container" data-webgl="true"></div>';
    render(<RenderDiagnostics />);
    expect(screen.getByLabelText('Diagnóstico de render')).toHaveTextContent('Midiendo');
    const report = await screen.findByText(/"reducedMotion"/, {}, { timeout: 8000 });
    const json = JSON.parse(report.textContent);
    expect(Object.keys(json)).toEqual(['browser', 'reducedMotion', 'reducedTransparency', 'devicePixelRatio', 'displayP3', 'fps', 'webgl', 'css', 'registerProperty', 'effects']);
    expect(Object.keys(json.css)).toEqual(expect.arrayContaining(['offset-path: path()', 'offset-path: inset() round', 'animation-timeline: scroll()', 'gradient "in oklab"', '-webkit-backdrop-filter']));
    expect(json.effects.heroLines).toBe('webgl=true');
    expect(screen.getByRole('button', { name: 'Copiar' })).toBeTruthy();
  }, 15000);
});
