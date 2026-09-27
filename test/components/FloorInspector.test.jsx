import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FloorInspector from '../../components/mockups/FloorInspector';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const rows = container => [...container.querySelectorAll('ul li[data-state]')].map(row => row.dataset.state);
const value = (container, reading) => container.querySelector(`[data-value="${reading}"]`);

describe('NeuralBI Inspect mockup', () => {
  it('scans the sample, reads the Bluetooth instruments, lets the AI find a short shot and raises a work order with a gloved tap', () => {
    const { container } = render(<FloorInspector live language="en" />);
    const root = container.firstChild;
    const tap = () => container.querySelector('[data-visible]');
    const sheet = () => container.querySelector('aside[data-open]');
    expect(root).toHaveAttribute('data-phase', 'scan');
    expect(rows(container)).toEqual(['pending', 'pending', 'pending', 'pending']);
    act(() => vi.advanceTimersByTime(800));
    expect(rows(container)[0]).toBe('pass');
    expect(container.querySelector('[data-locked]')).toHaveAttribute('data-locked', 'true');

    act(() => vi.advanceTimersByTime(1400));
    expect(root).toHaveAttribute('data-phase', 'measure');
    act(() => vi.advanceTimersByTime(1700));
    expect(value(container, '28.02 mm')).not.toBeNull();
    expect(value(container, '23.9 g')).not.toBeNull();
    expect(rows(container)).toEqual(['pass', 'pass', 'pass', 'pending']);

    act(() => vi.advanceTimersByTime(900));
    expect(root).toHaveAttribute('data-phase', 'detect');
    act(() => vi.advanceTimersByTime(1300));
    expect(screen.getByText('Short shot · 94%').closest('[data-shown]')).toHaveAttribute('data-shown', 'true');
    expect(rows(container)[3]).toBe('fail');
    expect(container.querySelector('[data-rejected]')).toHaveAttribute('data-rejected', 'true');
    expect(sheet()).toHaveAttribute('data-open', 'false');

    act(() => vi.advanceTimersByTime(900));
    expect(root).toHaveAttribute('data-phase', 'act');
    act(() => vi.advanceTimersByTime(500));
    expect(tap()).toHaveAttribute('data-visible', 'true');
    act(() => vi.advanceTimersByTime(1100));
    expect(sheet()).toHaveAttribute('data-open', 'true');
    expect(screen.getByText('WO-5540 created')).toBeInTheDocument();
    expect(screen.getByText('Quality hold · L2-0917')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1400));
    expect(root).toHaveAttribute('data-phase', 'hold');
    expect(tap()).toHaveAttribute('data-visible', 'false');
  });

  it('rests on the rejected sample and its work order when not live, in Spanish too', () => {
    const { container } = render(<FloorInspector live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(screen.getByText('WO-5540 creada')).toBeInTheDocument();
    expect(screen.getByText('Retención de calidad · L2-0917')).toBeInTheDocument();
    expect(screen.getByText('Modo guantes')).toBeInTheDocument();
    expect(rows(container)).toEqual(['pass', 'pass', 'pass', 'fail']);
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows a NeuralBI Power Apps app on a rugged tablet: glove mode, a PCF camera control and Bluetooth instruments', () => {
    const { container } = render(<FloorInspector live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['NeuralBI Inspect', 'QC checklist', 'Glove mode', 'React · PCF', 'IP65 · 1.8 m drop', 'Neck finish', 'Preform weight']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    expect(container.querySelectorAll('[data-corner]')).toHaveLength(4);
    expect(rows(container)).toHaveLength(4);
  });
});
