import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ComplianceFlow from '../../components/mockups/ComplianceFlow';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const node = (container, id) => container.querySelector(`[data-node="${id}"]`);
const events = (container, status) => container.querySelectorAll(`li[data-status="${status}"]`);
const rows = container => [...container.querySelectorAll('li[data-decision]')];

describe('NeuralBI Flows · AML & KYC screening mockup', () => {
  it('releases the stream, screens one transfer in parallel, holds it, opens a case and chains it into the ledger', () => {
    const { container } = render(<ComplianceFlow live language="en" />);
    const app = container.firstChild;
    expect(app).toHaveAttribute('data-phase', 'stream');
    expect(events(container, 'released')).toHaveLength(2);
    expect(rows(container)).toHaveLength(2);
    act(() => vi.advanceTimersByTime(2500));
    expect(events(container, 'released')).toHaveLength(5);
    expect(rows(container)).toHaveLength(5);
    expect(node(container, 'release')).toHaveAttribute('data-state', 'done');
    expect(node(container, 'hold')).toHaveAttribute('data-state', 'idle');

    act(() => vi.advanceTimersByTime(500));
    expect(app).toHaveAttribute('data-phase', 'screen');
    expect(app).toHaveAttribute('data-hero', 'true');
    expect(events(container, 'running')).toHaveLength(1);
    expect(node(container, 'trigger')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(700));
    expect(node(container, 'trigger')).toHaveAttribute('data-state', 'done');
    expect(node(container, 'aml')).toHaveAttribute('data-state', 'running');
    expect(node(container, 'kyc')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(1300));
    expect(node(container, 'aml')).toHaveAttribute('data-tone', 'red');
    expect(node(container, 'aml')).toHaveTextContent('Sanctions · 92%');
    expect(node(container, 'kyc')).toHaveTextContent('UBO unverified');

    act(() => vi.advanceTimersByTime(400));
    expect(app).toHaveAttribute('data-phase', 'decide');
    expect(node(container, 'condition')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(1350));
    expect(node(container, 'condition')).toHaveTextContent('Risk 86 · no');
    expect(node(container, 'release')).toHaveAttribute('data-state', 'skipped');
    expect(node(container, 'hold')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText('AML case CASE-2291 opened').closest('[data-shown]')).toHaveAttribute('data-shown', 'true');

    act(() => vi.advanceTimersByTime(650));
    expect(app).toHaveAttribute('data-phase', 'log');
    expect(node(container, 'audit')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(950));
    expect(node(container, 'audit')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText('Logged in 38 ms')).toBeInTheDocument();
    expect(events(container, 'held')).toHaveLength(1);
    const ledger = rows(container);
    const held = ledger[ledger.length - 1];
    expect(held).toHaveAttribute('data-decision', 'held');
    expect(held.querySelector('[data-link="true"]').textContent).toBe(ledger[ledger.length - 2].querySelector('[data-linked="true"]').textContent);

    act(() => vi.advanceTimersByTime(1450));
    expect(app).toHaveAttribute('data-phase', 'resume');
    act(() => vi.advanceTimersByTime(1250));
    expect(rows(container)).toHaveLength(7);
    expect(events(container, 'running')).toHaveLength(0);
    expect(node(container, 'hold')).toHaveTextContent('3 today');
  });

  it('rests on the held transfer and its case when not live, in Spanish too', () => {
    const { container } = render(<ComplianceFlow live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'resume');
    expect(events(container, 'held')).toHaveLength(1);
    expect(screen.getByText('Registrado en 38 ms')).toBeInTheDocument();
    expect(screen.getByText('Caso AML CASE-2291 abierto')).toBeInTheDocument();
    expect(node(container, 'release')).toHaveAttribute('data-state', 'skipped');
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'resume');
  });

  it('draws an event-driven Power Automate flow with parallel AML and KYC checks and a hash-chained audit ledger', () => {
    const { container } = render(<ComplianceFlow live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['AML & KYC screening', 'Event stream', 'When a transfer lands', 'AML screening', 'KYC verification', 'Condition',
      'Release payment', 'Hold · open case', 'Append to audit ledger', 'Audit ledger']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    expect(container.querySelectorAll('svg[style*="grid-area"]')).toHaveLength(4);
    expect(container.textContent).toContain('events/min');
  });
});
