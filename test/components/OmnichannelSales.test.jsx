import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import OmnichannelSales from '../../components/mockups/OmnichannelSales';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const value = (container, reading) => container.querySelector(`[data-value="${reading}"]`);
const venn = container => container.querySelector('svg[data-merged]');
const levels = container => [...container.querySelectorAll('[data-level]')].map(cell => Number(cell.dataset.level));

describe('NeuralBI Omnichannel Sales mockup', () => {
  it('streams both channels, merges their customers, cross-filters to the ones who shop both and explains their LTV', () => {
    const { container } = render(<OmnichannelSales live language="en" />);
    const app = container.firstChild;
    const cursor = () => container.querySelector('[data-visible]');
    expect(app).toHaveAttribute('data-phase', 'stream');
    expect(value(container, '$754k')).not.toBeNull();
    expect(venn(container)).toHaveAttribute('data-merged', 'false');
    act(() => vi.advanceTimersByTime(2600));
    expect(value(container, '$803k')).not.toBeNull();
    expect(value(container, '18.9k')).not.toBeNull();
    expect(value(container, '368k')).not.toBeNull();

    act(() => vi.advanceTimersByTime(400));
    expect(app).toHaveAttribute('data-phase', 'unify');
    expect(venn(container)).toHaveAttribute('data-merged', 'true');
    expect(venn(container)).toHaveAttribute('data-matched', 'false');
    act(() => vi.advanceTimersByTime(900));
    expect(venn(container)).toHaveAttribute('data-matched', 'true');
    expect(value(container, '312k')).not.toBeNull();
    expect(screen.getByText('Matched on email · phone · loyalty ID')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1500));
    expect(app).toHaveAttribute('data-phase', 'filter');
    const before = levels(container);
    act(() => vi.advanceTimersByTime(500));
    expect(cursor()).toHaveAttribute('data-visible', 'true');
    expect(app).toHaveAttribute('data-filtered', 'false');
    act(() => vi.advanceTimersByTime(900));
    expect(app).toHaveAttribute('data-filtered', 'true');
    expect(value(container, '$412')).not.toBeNull();
    expect(value(container, '56k')).not.toBeNull();
    expect(screen.getByText('Both channels')).toBeInTheDocument();
    const after = levels(container);
    expect(after.every((level, i) => level >= before[i])).toBe(true);
    expect(after.reduce((a, b) => a + b, 0)).toBeGreaterThan(before.reduce((a, b) => a + b, 0));

    act(() => vi.advanceTimersByTime(1200));
    expect(app).toHaveAttribute('data-phase', 'insight');
    act(() => vi.advanceTimersByTime(700));
    expect(cursor()).toHaveAttribute('data-visible', 'false');
    expect(container.querySelectorAll('li[data-shown="true"]')).toHaveLength(1);
    act(() => vi.advanceTimersByTime(650));
    expect(container.querySelectorAll('li[data-shown="true"]')).toHaveLength(2);
    expect(container.querySelector('li[data-marked="true"]')).toHaveTextContent('Click & collect launch');
    act(() => vi.advanceTimersByTime(650));
    expect(container.querySelectorAll('li[data-shown="true"]')).toHaveLength(3);

    act(() => vi.advanceTimersByTime(600));
    expect(app).toHaveAttribute('data-phase', 'hold');
  });

  it('rests on the filtered report when not live, in Spanish too', () => {
    const { container } = render(<OmnichannelSales live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(container.firstChild).toHaveAttribute('data-filtered', 'true');
    expect(screen.getByText('Ambos canales')).toBeInTheDocument();
    expect(screen.getByText('Unificados por email · teléfono · ID de lealtad')).toBeInTheDocument();
    expect(screen.getByText('Lanzamiento click & collect')).toBeInTheDocument();
    expect(value(container, '$342')).not.toBeNull();
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows a NeuralBI Power BI report over Direct Lake: channels by hour, merged customers, LTV cohorts and key influencers', () => {
    const { container } = render(<OmnichannelSales live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['Omnichannel Sales', 'Direct Lake · OneLake', 'Sales by hour · today', 'Customers · online × in store', '6-month LTV by cohort', 'Key influencers']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    expect(container.querySelectorAll('[data-level]')).toHaveLength(21);
    expect(container.querySelectorAll('li[data-hour]')).toHaveLength(13);
    expect(container.querySelectorAll('li[data-shown]')).toHaveLength(3);
  });
});
