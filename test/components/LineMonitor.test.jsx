import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LineMonitor from '../../components/mockups/LineMonitor';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const value = (container, reading) => container.querySelector(`[data-value="${reading}"]`);
const machine = (container, code) => container.querySelector(`[data-code="${code}"]`);

describe('NeuralBI Line Monitor mockup', () => {
  it('streams the line, catches IMM-02 drifting into zone C, fires Activator and derates the machine to save the bearing', () => {
    const { container } = render(<LineMonitor live language="en" />);
    const app = container.firstChild;
    const rule = () => container.querySelector('[data-rule]');
    expect(app).toHaveAttribute('data-phase', 'stream');
    expect(value(container, '84.1%')).not.toBeNull();
    expect(rule()).toHaveAttribute('data-rule', 'armed');
    expect(machine(container, 'IMM-02')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(1000));
    expect(value(container, '84.2%')).not.toBeNull();

    act(() => vi.advanceTimersByTime(2000));
    expect(app).toHaveAttribute('data-phase', 'drift');
    act(() => vi.advanceTimersByTime(2300));
    expect(value(container, '7.4 mm/s')).not.toBeNull();
    expect(app).toHaveAttribute('data-zone', 'C');
    expect(machine(container, 'IMM-02')).toHaveAttribute('data-state', 'alert');

    act(() => vi.advanceTimersByTime(300));
    expect(app).toHaveAttribute('data-phase', 'alert');
    expect(rule()).toHaveAttribute('data-rule', 'fired');
    expect(screen.getByText('Fired · 14:07:32')).toBeInTheDocument();
    expect(screen.getByText('BPFO 142 Hz · outer race')).toHaveAttribute('data-shown', 'true');

    act(() => vi.advanceTimersByTime(2200));
    expect(app).toHaveAttribute('data-phase', 'act');
    act(() => vi.advanceTimersByTime(2500));
    expect(container.querySelectorAll('li[data-done="true"]')).toHaveLength(3);
    expect(machine(container, 'IMM-02')).toHaveAttribute('data-state', 'reduced');
    expect(value(container, '4.2 mm/s')).not.toBeNull();
    expect(value(container, '81.4%')).not.toBeNull();
    expect(value(container, '91.8%')).not.toBeNull();
    expect(rule()).toHaveAttribute('data-rule', 'handled');
    expect(screen.getByText('Work order WO-5531 · bearing · 22:00 shift')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(300));
    expect(app).toHaveAttribute('data-phase', 'hold');
  });

  it('rests on the derated, handled line when not live, in Spanish too', () => {
    const { container } = render(<LineMonitor live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(screen.getByText('Atendida')).toBeInTheDocument();
    expect(screen.getByText('Reducida 70%')).toBeInTheDocument();
    expect(value(container, '81.4%')).not.toBeNull();
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows a Fabric real-time dashboard: the line, OEE factors, thermal image, ISO vibration zones and Activator', () => {
    const { container } = render(<LineMonitor live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['Line 2 · PET preforms', 'OEE · shift', 'Thermal · IMM-02 pump', 'Vibration · IMM-02', 'A × P × Q', 'IMM-02 vibration > 7.1 mm/s for 30 s']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    expect(container.textContent).toContain('Eventstream');
    expect(container.textContent).toContain('Eventhouse · KQL · 0.8 s');
    expect(container.querySelectorAll('[data-code]')).toHaveLength(6);
    expect(container.querySelectorAll('span[data-heat]').length).toBeGreaterThanOrEqual(96);
    expect(container.querySelectorAll('rect[data-band]')).toHaveLength(4);
  });
});
