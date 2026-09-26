import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FieldOps from '../../components/mockups/FieldOps';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('NeuralBI Field mockup', () => {
  it('scans, keeps scanning offline into a queue, syncs it, then the driver confirms dispatch', () => {
    const { container } = render(<FieldOps live language="en" />);
    const app = container.firstChild;
    const tap = () => container.querySelector('[data-visible]');
    expect(app).toHaveAttribute('data-phase', 'scan');
    act(() => vi.advanceTimersByTime(2600));
    expect(screen.getByText('Scanned · PAL-4821-21')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(600));
    expect(app).toHaveAttribute('data-phase', 'offline');
    act(() => vi.advanceTimersByTime(2600));
    expect(screen.getByText('Offline · 3 queued')).toBeInTheDocument();
    expect(screen.getByText('Working offline · 3 changes queued')).toBeInTheDocument();
    expect(container.querySelectorAll('li[data-state="queued"]')).toHaveLength(3);

    act(() => vi.advanceTimersByTime(400));
    expect(app).toHaveAttribute('data-phase', 'sync');
    act(() => vi.advanceTimersByTime(1400));
    expect(container.querySelectorAll('li[data-state="queued"]')).toHaveLength(0);
    expect(screen.getByText('All changes synced')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(400));
    expect(app).toHaveAttribute('data-phase', 'dispatch');
    expect(screen.getByText('Confirm dispatch')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(500));
    expect(tap()).toHaveAttribute('data-visible', 'true');

    act(() => vi.advanceTimersByTime(1900));
    expect(app).toHaveAttribute('data-phase', 'hold');
    expect(tap()).toHaveAttribute('data-visible', 'false');
    expect(screen.getByText('Dispatched · ETA 3.8 d')).toHaveAttribute('data-done', 'true');
  });

  it('rests on the synced, dispatched state when not live, in Spanish too', () => {
    const { container } = render(<FieldOps live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(screen.getByText('Despachado · ETA 3.8 d')).toBeInTheDocument();
    expect(screen.getByText('Todo sincronizado')).toBeInTheDocument();
    expect(container.querySelectorAll('li[data-state="queued"]')).toHaveLength(0);
    expect(container.querySelectorAll('li[data-done="true"]')).toHaveLength(3);
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows NeuralBI apps on both devices, with the PCF manifest of PO #4821', () => {
    const { container } = render(<FieldOps live={false} language="en" />);
    expect(container.querySelectorAll('img[src*="Neuralbi"]')).toHaveLength(2);
    ['Receiving', 'Route MX-14', 'React · PCF', 'Manifest'].forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
  });
});
