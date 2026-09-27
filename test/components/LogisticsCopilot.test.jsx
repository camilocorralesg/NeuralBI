import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LogisticsCopilot from '../../components/mockups/LogisticsCopilot';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const bars = (container, state) => container.querySelectorAll(`[data-state="${state}"][style]`);
const tool = (container, name) => [...container.querySelectorAll('li[data-state]')].find(item => item.textContent.includes(name));

describe('NeuralBI Logistics Copilot mockup', () => {
  it('reasons in the open from a port-closure event to grounded tool calls, a policy check, the actions and its answer', () => {
    const { container } = render(<LogisticsCopilot live language="en" />);
    const app = container.firstChild;
    const map = () => container.querySelector('[data-route]');
    expect(app).toHaveAttribute('data-phase', 'event');
    expect(screen.getByText('Veracruz port closed for 48 h · weather advisory')).toBeInTheDocument();
    expect(container.querySelector('[data-open]')).toBeNull();
    expect(map()).toHaveAttribute('data-route', 'planned');
    act(() => vi.advanceTimersByTime(1000));
    expect(map()).toHaveAttribute('data-route', 'blocked');

    act(() => vi.advanceTimersByTime(600));
    expect(app).toHaveAttribute('data-phase', 'think');
    expect(container.querySelector('[data-open]')).toHaveAttribute('data-open', 'true');
    act(() => vi.advanceTimersByTime(1800));
    expect(container.textContent).toContain('every in-transit shipment that depends on that port.');

    expect(app).toHaveAttribute('data-phase', 'query');
    expect(tool(container, 'query_warehouse')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(1000));
    expect(tool(container, 'query_warehouse')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText('3 rows · 64 ms')).toBeInTheDocument();
    expect(bars(container, 'affected')).toHaveLength(3);

    act(() => vi.advanceTimersByTime(3000));
    expect(app).toHaveAttribute('data-phase', 'apis');
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.getByText('2 slots · 180 ms')).toBeInTheDocument();
    expect(screen.getByText('06:00 · 95 ms')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(500));
    expect(app).toHaveAttribute('data-phase', 'policy');
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getAllByText('Policy ok · $3.2k ≤ $5k').find(chip => chip.dataset.shown)).toHaveAttribute('data-shown', 'true');

    act(() => vi.advanceTimersByTime(600));
    expect(app).toHaveAttribute('data-phase', 'act');
    expect(map()).toHaveAttribute('data-route', 'rerouted');
    expect(bars(container, 'moved')).toHaveLength(0);
    act(() => vi.advanceTimersByTime(1100));
    expect(bars(container, 'moved')).toHaveLength(3);
    act(() => vi.advanceTimersByTime(1000));
    expect(tool(container, 'update_fleet_plan')).toHaveAttribute('data-state', 'done');

    act(() => vi.advanceTimersByTime(300));
    expect(app).toHaveAttribute('data-phase', 'answer');
    expect(container.querySelector('[data-open]')).toHaveAttribute('data-open', 'false');
    expect(screen.getByText('Reasoned for 14 s · 5 tool calls')).toBeInTheDocument();
    expect(container.querySelector('[data-complete]')).toHaveAttribute('data-complete', 'false');
    act(() => vi.advanceTimersByTime(2000));
    expect(container.querySelector('[data-complete]')).toHaveAttribute('data-complete', 'true');
    expect(screen.getByText('0 manual steps')).toBeInTheDocument();
    expect(screen.getByText('wh.shipments')).toBeInTheDocument();
  });

  it('rests on the answered run when not live, in Spanish too', () => {
    const { container } = render(<LogisticsCopilot live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'answer');
    expect(screen.getByText('Razonó durante 14 s · 5 herramientas')).toBeInTheDocument();
    expect(container.querySelector('[data-route]')).toHaveAttribute('data-route', 'rerouted');
    expect(bars(container, 'moved')).toHaveLength(3);
    expect(container.querySelector('[data-complete]')).toHaveAttribute('data-complete', 'true');
    expect(screen.getByText('0 pasos manuales')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'answer');
  });

  it('shows the NeuralBI agent, grounded and autonomous, with its composer and live context', () => {
    const { container } = render(<LogisticsCopilot live={false} language="en" />);
    expect(container.querySelectorAll('img[src*="Neuralbi"]').length).toBeGreaterThan(1);
    ['Grounded · wh.fabric', 'Autonomous · ≤ $5k', 'Ask Logistics Copilot…', 'Lanes', 'Fleet allocation']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    ['Logistics Copilot', 'query_warehouse', 'update_fleet_plan'].forEach(text => expect(screen.getAllByText(text).length).toBeGreaterThan(0));
  });
});
