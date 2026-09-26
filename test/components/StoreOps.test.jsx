import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import StoreOps from '../../components/mockups/StoreOps';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const slot = (container, app) => container.querySelector(`[data-app="${app}"]`);
const paper = (container, app) => container.querySelector(`[data-paper="${app}"]`);
const cartons = container => [...container.querySelectorAll('li[data-state]')].map(row => row.dataset.state);

describe('NeuralBI Store Ops mockup', () => {
  it('receives a delivery, fills a sick call and refunds a return, each app sending its paper form away', () => {
    const { container } = render(<StoreOps live language="en" />);
    const root = container.firstChild;
    const tap = () => container.querySelector('[data-visible]');
    expect(root).toHaveAttribute('data-phase', 'intake');
    expect(slot(container, 'intake')).toHaveAttribute('data-focus', 'true');
    expect(slot(container, 'shifts')).toHaveAttribute('data-focus', 'false');
    expect(cartons(container)).toEqual(['pending', 'pending', 'pending', 'pending']);
    expect(container.querySelectorAll('[data-gone="false"]')).toHaveLength(3);
    act(() => vi.advanceTimersByTime(2800));
    expect(cartons(container)).toEqual(['missing', 'ok', 'ok', 'ok']);
    expect(screen.getByText('Claim DC-318 filed · photo · supplier notified')).toHaveAttribute('data-shown', 'true');
    expect(paper(container, 'intake')).toHaveAttribute('data-gone', 'true');

    act(() => vi.advanceTimersByTime(600));
    expect(root).toHaveAttribute('data-phase', 'shifts');
    expect(slot(container, 'shifts')).toHaveAttribute('data-focus', 'true');
    act(() => vi.advanceTimersByTime(600));
    expect(tap()).toHaveAttribute('data-visible', 'true');
    expect(screen.getByText('Offer shift to Sofía')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(700));
    expect(screen.getByText('Offer sent · Teams')).toBeInTheDocument();
    expect(paper(container, 'shifts')).toHaveAttribute('data-gone', 'false');
    act(() => vi.advanceTimersByTime(1200));
    expect(screen.getByText('Sofía accepted · 16:09')).toBeInTheDocument();
    expect(container.querySelector('[data-filled]')).toHaveAttribute('data-filled', 'true');
    expect(paper(container, 'shifts')).toHaveAttribute('data-gone', 'true');

    act(() => vi.advanceTimersByTime(900));
    expect(root).toHaveAttribute('data-phase', 'returns');
    act(() => vi.advanceTimersByTime(1300));
    expect(container.querySelectorAll('li[data-done="true"]')).toHaveLength(2);
    act(() => vi.advanceTimersByTime(500));
    expect(container.querySelectorAll('li[data-done="true"]')).toHaveLength(3);
    expect(tap()).toHaveAttribute('data-visible', 'true');
    act(() => vi.advanceTimersByTime(700));
    expect(screen.getByText('Refunded to card · restocked')).toBeInTheDocument();
    expect(screen.getByText('Restocked · online +1')).toBeInTheDocument();
    expect(paper(container, 'returns')).toHaveAttribute('data-gone', 'true');

    act(() => vi.advanceTimersByTime(900));
    expect(root).toHaveAttribute('data-phase', 'hold');
    expect(tap()).toHaveAttribute('data-visible', 'false');
    expect(slot(container, 'intake')).toHaveAttribute('data-focus', 'all');
  });

  it('rests with every process done and no paper left when not live, in Spanish too', () => {
    const { container } = render(<StoreOps live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(container.querySelectorAll('[data-gone="true"]')).toHaveLength(3);
    ['Reclamo DC-318 · foto · proveedor avisado', 'Sofía aceptó · 16:09', 'Reembolsado a la tarjeta · reintegrado']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows three NeuralBI Power Apps on phones, with PCF controls and the paper forms they replace', () => {
    const { container } = render(<StoreOps live={false} language="en" />);
    expect(container.querySelectorAll('img[src*="Neuralbi"]')).toHaveLength(3);
    ['Intake', 'Shifts', 'Returns', 'React · PCF', 'PCF', 'Receiving log', 'Shift swap form', 'Return slip']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    expect(container.querySelectorAll('[data-app]')).toHaveLength(3);
    expect(container.querySelectorAll('[data-paper]')).toHaveLength(3);
  });
});
