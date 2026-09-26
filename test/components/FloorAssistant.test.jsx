import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FloorAssistant from '../../components/mockups/FloorAssistant';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const source = (container, id) => container.querySelector(`[data-source="${id}"]`);
const marks = container => [...container.querySelectorAll('li[data-mark]')].map(step => step.dataset.mark);

describe('NeuralBI Floor Assistant mockup', () => {
  it('hears the question, grounds itself in the manual, the schematic and the repair log, puts safety first and answers aloud', () => {
    const { container } = render(<FloorAssistant live language="en" />);
    const app = container.firstChild;
    const wave = () => container.querySelector('[data-heard]');
    expect(app).toHaveAttribute('data-phase', 'ask');
    expect(screen.getByText('Ana Ríos · voice · 22:04')).toBeInTheDocument();
    expect(wave()).toHaveAttribute('data-heard', 'false');
    act(() => vi.advanceTimersByTime(2400));
    expect(wave()).toHaveAttribute('data-heard', 'true');
    expect(wave().style.clipPath).toBe('inset(0 0% 0 0)');
    expect(container.querySelector('[data-open]')).toBeNull();

    act(() => vi.advanceTimersByTime(200));
    expect(app).toHaveAttribute('data-phase', 'ground');
    act(() => vi.advanceTimersByTime(1700));
    expect(app).toHaveAttribute('data-phase', 'search');
    expect(screen.getAllByText('search_manuals')[0].closest('li')).toHaveAttribute('data-state', 'running');
    expect(source(container, 'manual')).toHaveAttribute('data-state', 'loading');
    expect(source(container, 'schematic')).toHaveAttribute('data-state', 'idle');
    act(() => vi.advanceTimersByTime(900));
    expect(source(container, 'manual')).toHaveAttribute('data-state', 'ready');
    expect(source(container, 'schematic')).toHaveAttribute('data-state', 'loading');
    act(() => vi.advanceTimersByTime(1700));
    expect(source(container, 'schematic')).toHaveAttribute('data-state', 'ready');
    expect(source(container, 'log')).toHaveAttribute('data-state', 'ready');
    expect(screen.getByText('WO-4127 · coupling 0.3 mm out')).toBeInTheDocument();
    expect(marks(container)).toEqual(['none', 'none', 'none', 'none']);

    act(() => vi.advanceTimersByTime(100));
    expect(app).toHaveAttribute('data-phase', 'safety');
    act(() => vi.advanceTimersByTime(1650));
    expect(screen.getAllByText('Safety · lockout first').find(chip => chip.hasAttribute('data-shown'))).toHaveAttribute('data-shown', 'true');
    expect(marks(container)[0]).toBe('safety');
    expect(container.querySelector('li[data-note="true"]')).toHaveTextContent('WO-4127');

    act(() => vi.advanceTimersByTime(50));
    expect(app).toHaveAttribute('data-phase', 'answer');
    expect(screen.getByText('Reasoned for 6 s · 3 sources')).toBeInTheDocument();
    expect(marks(container)).toEqual(['safety', 'none', 'cited', 'cited']);
    expect(screen.getByText('Reading aloud')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByText('Read aloud · 0:21')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-lit="true"]').length).toBe(container.querySelectorAll('[data-lit]').length);
    ['Manual §7.4', 'Schematic rev C', 'Steps pinned to WO-5531', 'Schematic sent to tablet']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
  });

  it('rests on the answered question when not live, in Spanish too', () => {
    const { container } = render(<FloorAssistant live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'answer');
    expect(screen.getByText('Leído en voz alta · 0:21')).toBeInTheDocument();
    expect(screen.getAllByText('Seguridad · bloqueo primero').length).toBeGreaterThan(0);
    expect(screen.getByText('Razonó durante 6 s · 3 fuentes')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-source][data-state="ready"]')).toHaveLength(3);
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'answer');
  });

  it('shows a NeuralBI Copilot Studio agent asked aloud, with the manual, the schematic and the repair log it cites', () => {
    const { container } = render(<FloorAssistant live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['Sources', 'Service manual · §7.4 Pump bearing', 'Schematic · HP-40 pump', 'Repair log · IMM-02 pump', 'Voice · hands-free', '6310-2RS · A-14']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    ['search_manuals', 'open_schematic', 'repair_history'].forEach(tool => expect(container.textContent).toContain(tool));
    expect(container.querySelectorAll('[data-item]')).toHaveLength(5);
    expect(container.querySelectorAll('li[data-mark]')).toHaveLength(4);
  });
});
