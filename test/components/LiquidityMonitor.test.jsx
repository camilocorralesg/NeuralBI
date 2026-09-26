import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LiquidityMonitor from '../../components/mockups/LiquidityMonitor';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const value = (container, reading) => container.querySelector(`[data-value="${reading}"]`);
const corridor = (container, id) => container.querySelector(`[data-corridor="${id}"]`);

describe('NeuralBI Liquidity Monitor mockup', () => {
  it('streams the treasury over Direct Lake, flags a settlement spike, cross-filters to MXN and runs the sweep', () => {
    const { container } = render(<LiquidityMonitor live language="en" />);
    const app = container.firstChild;
    const cursor = () => container.querySelector('[data-visible]');
    expect(app).toHaveAttribute('data-phase', 'stream');
    expect(app).toHaveAttribute('data-state', 'steady');
    expect(screen.getByText('Refreshed 14:32:05')).toBeInTheDocument();
    expect(value(container, '$140M')).not.toBeNull();
    act(() => vi.advanceTimersByTime(2600));
    expect(screen.getByText('Refreshed 14:32:09')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(400));
    expect(app).toHaveAttribute('data-phase', 'spike');
    expect(app).toHaveAttribute('data-state', 'risk');
    expect(value(container, '$78M')).not.toBeNull();
    expect(value(container, '121%')).not.toBeNull();
    expect(screen.getByText('Settlement spike')).toBeInTheDocument();
    expect(corridor(container, 'EUR-MXN')).toHaveAttribute('data-state', 'risk');

    act(() => vi.advanceTimersByTime(2200));
    expect(app).toHaveAttribute('data-phase', 'focus');
    expect(app).toHaveAttribute('data-filtered', 'false');
    act(() => vi.advanceTimersByTime(1250));
    expect(cursor()).toHaveAttribute('data-visible', 'true');
    expect(app).toHaveAttribute('data-filtered', 'true');
    expect(corridor(container, 'EUR-USD')).toHaveAttribute('data-dim', 'true');
    expect(corridor(container, 'EUR-MXN')).toHaveAttribute('data-dim', 'false');
    expect(screen.getByText('Sweep USD → MXN')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1150));
    expect(app).toHaveAttribute('data-phase', 'act');
    expect(screen.getByText('Run')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1750));
    expect(app).toHaveAttribute('data-state', 'swept');
    expect(screen.getByText('Sweep executed')).toBeInTheDocument();
    expect(screen.getByText('Done')).toHaveAttribute('data-applied', 'true');
    expect(value(container, '$118M')).not.toBeNull();
    expect(value(container, '129%')).not.toBeNull();
    expect(corridor(container, 'USD-MXN')).toHaveAttribute('data-state', 'swept');

    act(() => vi.advanceTimersByTime(1050));
    expect(app).toHaveAttribute('data-phase', 'hold');
    expect(cursor()).toHaveAttribute('data-visible', 'false');
    expect(screen.getByText('Headroom restored')).toBeInTheDocument();
  });

  it('rests on the swept, cross-filtered report when not live, in Spanish too', () => {
    const { container } = render(<LiquidityMonitor live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(container.firstChild).toHaveAttribute('data-filtered', 'true');
    expect(screen.getByText('Barrido ejecutado')).toBeInTheDocument();
    expect(screen.getByText('Margen restablecido')).toBeInTheDocument();
    expect(value(container, '$118M')).not.toBeNull();
    expect(screen.getByText('Monitor de Liquidez')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows a NeuralBI Power BI report: slicers, cross-border flows, reserves, intraday risk and page tabs', () => {
    const { container } = render(<LiquidityMonitor live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['Liquidity Monitor', 'Intraday liquidity', 'Cross-border flows', 'Treasury reserves', 'Intraday risk', 'Alerts',
      'Overview', 'FX corridors', 'Reserves', 'Risk', 'Currency']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    ['USD', 'EUR', 'GBP', 'MXN', 'COP', 'BRL'].forEach(code => expect(screen.getAllByText(code).length).toBeGreaterThan(0));
    expect(container.textContent).toContain('Direct Lake');
    expect(container.querySelectorAll('[data-corridor]')).toHaveLength(7);
  });
});
