import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SupplyControlTower from '../../components/mockups/SupplyControlTower';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('Supply Control Tower mockup', () => {
  it('walks its storyline while live: forecasts the stockout, the pointer applies the reroute, then it resolves and loops', () => {
    const { container } = render(<SupplyControlTower live language="en" />);
    const app = container.firstChild;
    const pointer = () => container.querySelector('[data-visible]');
    expect(app).toHaveAttribute('data-phase', 'live');
    expect(screen.getByText('Direct Lake sync')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(3000));
    expect(app).toHaveAttribute('data-phase', 'detect');
    expect(app).toHaveAttribute('data-risk', 'true');
    expect(screen.getByText('Stockout predicted')).toBeInTheDocument();
    expect(screen.getByText('Delayed')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(2200));
    expect(app).toHaveAttribute('data-phase', 'propose');
    expect(screen.getByText('Apply')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(500));
    expect(pointer()).toHaveAttribute('data-visible', 'true');

    act(() => vi.advanceTimersByTime(2100));
    expect(app).toHaveAttribute('data-phase', 'resolve');
    expect(app).toHaveAttribute('data-resolved', 'true');
    expect(pointer()).toHaveAttribute('data-visible', 'false');
    expect(screen.getByText('Applied')).toBeInTheDocument();
    expect(screen.getByText('PO #4821 dispatched')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(2800 + 1800));
    expect(app).toHaveAttribute('data-phase', 'live');
  });

  it('rests on the resolved state without a pointer, and stops advancing, when not live', () => {
    const { container } = render(<SupplyControlTower live={false} language="es" />);
    const app = container.firstChild;
    expect(app).toHaveAttribute('data-phase', 'hold');
    expect(screen.getByText('Mitigado')).toBeInTheDocument();
    expect(screen.getByText('Aplicado')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(20000));
    expect(app).toHaveAttribute('data-phase', 'hold');
    expect(container.querySelector('[data-visible]')).toHaveAttribute('data-visible', 'false');
  });

  it('carries the NeuralBI mark and the card\'s multi-country, Direct Lake content', () => {
    const { container } = render(<SupplyControlTower live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['Inventory value', 'Stockout risk', 'Avg lead time', 'Fill rate', 'Stock by node', 'supply_telemetry'].forEach(text =>
      expect(screen.getByText(text)).toBeInTheDocument());
    ['USA', 'MEX', 'COL'].forEach(code => expect(screen.getAllByText(code).length).toBeGreaterThan(0));
  });
});
