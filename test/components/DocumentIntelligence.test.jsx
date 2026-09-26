import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DocumentIntelligence from '../../components/mockups/DocumentIntelligence';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const node = (container, id) => container.querySelector(`[data-node="${id}"]`);

describe('NeuralBI Flows mockup', () => {
  it('runs the flow step by step while the run details show what each action does to the business', () => {
    const { container } = render(<DocumentIntelligence live language="en" />);
    const app = container.firstChild;
    expect(app).toHaveAttribute('data-phase', 'trigger');
    expect(node(container, 'trigger')).toHaveAttribute('data-state', 'running');
    expect(node(container, 'rpa')).toHaveAttribute('data-state', 'idle');
    expect(screen.getByText('exports@polimerosnorte.mx')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    expect(node(container, 'trigger')).toHaveAttribute('data-state', 'done');

    act(() => vi.advanceTimersByTime(600));
    expect(app).toHaveAttribute('data-phase', 'rpa');
    expect(screen.getByText('broker-portal.mx/declarations/5520')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1900));
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(3);
    expect(screen.getByText('Downloaded')).toBeInTheDocument();
    expect(node(container, 'rpa')).toHaveAttribute('data-state', 'done');

    act(() => vi.advanceTimersByTime(700));
    expect(app).toHaveAttribute('data-phase', 'extract');
    expect(screen.getByText('Commercial invoice')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(2200));
    expect(container.querySelectorAll('[data-shown="true"]')).toHaveLength(5);
    expect(container.querySelectorAll('span[data-done="true"]')).toHaveLength(3);
    expect(node(container, 'extract')).toHaveAttribute('data-state', 'done');

    act(() => vi.advanceTimersByTime(400));
    expect(app).toHaveAttribute('data-phase', 'match');
    act(() => vi.advanceTimersByTime(1600));
    expect(screen.getByText('$182.4k')).toHaveAttribute('data-off', 'true');
    expect(node(container, 'match')).toHaveTextContent('1 gap');
    expect(container.querySelector('[data-state="gap"]')).toHaveTextContent('DEC-5520');

    act(() => vi.advanceTimersByTime(400));
    expect(app).toHaveAttribute('data-phase', 'branch');
    expect(node(container, 'condition')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(700));
    expect(node(container, 'condition')).toHaveAttribute('data-state', 'done');
    expect(node(container, 'approval')).toHaveAttribute('data-state', 'skipped');
    expect(node(container, 'update')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(1200));
    expect(node(container, 'notify')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText(/updated to \$184,200 to match INV-8841/).closest('[data-shown]')).toHaveAttribute('data-shown', 'true');
    expect(container.querySelector('[data-state="corrected"]')).toHaveTextContent('DEC-5520');

    act(() => vi.advanceTimersByTime(300));
    expect(app).toHaveAttribute('data-phase', 'publish');
    expect(node(container, 'erp')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(800));
    expect(node(container, 'erp')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText('201 Created')).toBeInTheDocument();
    expect(screen.getByText('Run #1287 · Succeeded · 42 s')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-state="posted"]')).toHaveLength(3);
  });

  it('rests on the succeeded run when not live, in Spanish too', () => {
    const { container } = render(<DocumentIntelligence live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'publish');
    expect(screen.getByText('Ejecución #1287 · Correcto · 42 s')).toBeInTheDocument();
    ['trigger', 'rpa', 'extract', 'match', 'condition', 'update', 'notify', 'erp']
      .forEach(id => expect(node(container, id)).toHaveAttribute('data-state', 'done'));
    expect(node(container, 'approval')).toHaveAttribute('data-state', 'skipped');
    expect(screen.getAllByText('Publicado')).toHaveLength(3);
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'publish');
  });

  it('draws the Power Automate flow of PO #4821 in a NeuralBI designer', () => {
    const { container } = render(<DocumentIntelligence live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).toBeInTheDocument();
    ['Customs document ingestion', 'Designer', 'When a new email arrives', 'Run desktop flow', 'Apply to each',
      'Extract information from documents', 'Match discrepancies', 'Condition', 'Add a new row']
      .forEach(text => expect(screen.getAllByText(text).length).toBeGreaterThan(0));
    expect(screen.getByText('Broker portal · unattended, headless')).toBeInTheDocument();
  });
});
