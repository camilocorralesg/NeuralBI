import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DiagnosticsGate from '../../components/DiagnosticsGate';

vi.mock('../../components/RenderDiagnostics', () => ({
  default: () => <aside aria-label="Diagnóstico de render">Render diagnostics</aside>,
}));

afterEach(() => window.history.replaceState(null, '', '/'));

describe('DiagnosticsGate', () => {
  it('renders nothing without ?diag in the URL', () => {
    const { container } = render(<DiagnosticsGate />);
    expect(container).toBeEmptyDOMElement();
  });

  it('loads the render diagnostics when the URL carries ?diag', async () => {
    window.history.replaceState(null, '', '/NeuralBI?diag');
    render(<DiagnosticsGate />);
    expect(await screen.findByLabelText('Diagnóstico de render')).toHaveTextContent('Render diagnostics');
  });
});
