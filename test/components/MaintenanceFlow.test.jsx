import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MaintenanceFlow from '../../components/mockups/MaintenanceFlow';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const node = (container, id) => container.querySelector(`[data-node="${id}"]`);
const cells = (container, kind) => container.querySelectorAll(`[data-cell="${kind}"]`);
const lanes = container => [...container.querySelectorAll('li[data-lane]')].map(lane => lane.dataset.status);

describe('NeuralBI Flows autonomous maintenance mockup', () => {
  it('fires on the wear threshold, reserves and re-orders the bearing while it books the one qualified technician', () => {
    const { container } = render(<MaintenanceFlow live language="en" />);
    const app = container.firstChild;
    const booking = () => container.querySelector('[data-booking]');
    expect(app).toHaveAttribute('data-phase', 'trigger');
    expect(node(container, 'trigger')).toHaveAttribute('data-state', 'running');
    expect(node(container, 'parts')).toHaveAttribute('data-state', 'idle');
    act(() => vi.advanceTimersByTime(2000));
    expect(node(container, 'trigger')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText('Fired · 14:07:32')).toBeInTheDocument();
    expect(container.querySelector('[data-value="7.4 mm/s"]')).not.toBeNull();

    act(() => vi.advanceTimersByTime(400));
    expect(app).toHaveAttribute('data-phase', 'lookup');
    act(() => vi.advanceTimersByTime(900));
    expect(screen.getByText('2 parts')).toBeInTheDocument();
    expect(container.querySelectorAll('li[data-needed="true"]')).toHaveLength(2);

    act(() => vi.advanceTimersByTime(900));
    expect(app).toHaveAttribute('data-phase', 'branches');
    expect(node(container, 'stock')).toHaveAttribute('data-state', 'running');
    expect(node(container, 'find')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(800));
    expect(screen.getByText('2 reserved')).toBeInTheDocument();
    expect(cells(container, 'reserved')).toHaveLength(2);
    expect(container.querySelector('li[data-low="true"]')).toHaveTextContent('Bearing 6310-2RS');
    act(() => vi.advanceTimersByTime(750));
    expect(node(container, 'find')).toHaveTextContent('Ana Ríos');
    expect(lanes(container)).toEqual(['match', 'noSkill', 'off']);
    act(() => vi.advanceTimersByTime(750));
    expect(node(container, 'order')).toHaveAttribute('data-state', 'done');
    expect(container.querySelector('[data-po]')).toHaveAttribute('data-po', 'true');
    expect(cells(container, 'incoming')).toHaveLength(4);
    act(() => vi.advanceTimersByTime(750));
    expect(booking()).toHaveAttribute('data-shown', 'true');
    expect(booking()).toHaveAttribute('data-accepted', 'false');
    expect(screen.getByText('22:00 · awaiting')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(550));
    expect(app).toHaveAttribute('data-phase', 'confirm');
    act(() => vi.advanceTimersByTime(950));
    expect(booking()).toHaveAttribute('data-accepted', 'true');
    expect(screen.getByText('Accepted · 14:08:04')).toBeInTheDocument();
    expect(lanes(container)[0]).toBe('accepted');
    act(() => vi.advanceTimersByTime(900));
    expect(node(container, 'update')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText('Ready · 22:00')).toBeInTheDocument();
    expect(screen.getByText(/Succeeded · 32 s/)).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(550));
    expect(app).toHaveAttribute('data-phase', 'hold');
  });

  it('rests on the finished run when not live, in Spanish too', () => {
    const { container } = render(<MaintenanceFlow live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(container.querySelectorAll('[data-node][data-state="done"]')).toHaveLength(7);
    expect(screen.getByText('Disparado · 14:07:32')).toBeInTheDocument();
    expect(screen.getByText('Aceptada · 14:08:04')).toBeInTheDocument();
    expect(screen.getByText('Lista · 22:00')).toBeInTheDocument();
    expect(screen.getByText(/Correcto · 32 s/)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows a NeuralBI Power Automate flow with parallel branches above the storeroom and the schedule board', () => {
    const { container } = render(<MaintenanceFlow live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['Autonomous maintenance · IMM-02', 'Spare parts', 'Technician', 'Storeroom · MTY', 'Schedule board · today', 'PO-7712']
      .forEach(text => expect(screen.getAllByText(text).length).toBeGreaterThan(0));
    ['Activator', 'Dataverse', 'Dynamics 365', 'Field Service', 'Teams']
      .forEach(connector => expect(container.textContent).toContain(connector));
    expect(container.querySelectorAll('[data-node]')).toHaveLength(7);
    expect(container.querySelectorAll('li[data-lane]')).toHaveLength(3);
  });
});
