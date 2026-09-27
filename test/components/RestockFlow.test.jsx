import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RestockFlow from '../../components/mockups/RestockFlow';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const tick = (container, sku) => container.querySelector(`[data-sku="${sku}"] [data-tick]`);
const skus = (container, state) => container.querySelectorAll(`li[data-sku][data-state="${state}"]`);
const suppliers = container => [...container.querySelectorAll('[data-status]')].map(card => card.dataset.status);

describe('NeuralBI Flows automated restocking mockup', () => {
  it('lifts the safety stock with the forecast, orders from each supplier through its channel and clears the thresholds', () => {
    const { container } = render(<RestockFlow live language="en" />);
    const app = container.firstChild;
    expect(app).toHaveAttribute('data-phase', 'forecast');
    expect(tick(container, 'jacketM')).toHaveAttribute('data-tick', '6');
    expect(skus(container, 'below')).toHaveLength(0);
    act(() => vi.advanceTimersByTime(1000));
    expect(tick(container, 'jacketM')).toHaveAttribute('data-tick', '14');
    expect(tick(container, 'hoodie')).toHaveAttribute('data-tick', '10');
    expect(screen.getByText('Forecast · rainwear +58% · rain alert')).toHaveAttribute('data-shown', 'true');
    act(() => vi.advanceTimersByTime(900));
    expect([...skus(container, 'below')].map(sku => sku.dataset.sku)).toEqual(['jacketM', 'umbrella', 'boots']);
    expect(screen.getByText('3 SKUs')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(700));
    expect(app).toHaveAttribute('data-phase', 'plan');
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText('+58% · 14 d')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(900));
    expect(screen.getByText('94 u · 3 lines')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(300));
    expect(app).toHaveAttribute('data-phase', 'order');
    expect(suppliers(container)).toEqual(['waiting', 'waiting']);
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.getByText('PO-9120 · 2 lines')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-sent="true"]')).toHaveLength(1);
    expect(suppliers(container)).toEqual(['received', 'waiting']);
    expect(screen.getByText('2/2')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1400));
    expect(screen.getByText('PO-9121 · 1 line')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-sent="true"]')).toHaveLength(2);
    expect(suppliers(container)).toEqual(['received', 'received']);

    act(() => vi.advanceTimersByTime(300));
    expect(app).toHaveAttribute('data-phase', 'confirm');
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText('855 · Accepted · ships Tue 17 Jun')).toBeInTheDocument();
    expect([...skus(container, 'ordered')].map(sku => sku.dataset.sku)).toEqual(['jacketM', 'boots']);
    act(() => vi.advanceTimersByTime(900));
    expect(screen.getByText('Reply · Confirmed · ships Mon 16 Jun')).toBeInTheDocument();
    expect(skus(container, 'ordered')).toHaveLength(3);
    expect(skus(container, 'below')).toHaveLength(0);
    expect(screen.getByText(/Succeeded · 38 s/)).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(500));
    expect(app).toHaveAttribute('data-phase', 'hold');
  });

  it('rests on the confirmed orders when not live, in Spanish too', () => {
    const { container } = render(<RestockFlow live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(suppliers(container)).toEqual(['acknowledged', 'acknowledged']);
    ['855 · Aceptada · despacha mar 17 jun', 'Respuesta · Confirmada · despacha lun 16 jun', 'Aplicar a cada proveedor']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    expect(screen.getByText(/Correcto · 38 s/)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows a NeuralBI Power Automate flow from the store shelf to two external suppliers', () => {
    const { container } = render(<RestockFlow live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['Automated restocking · Chapinero', 'Stock vs dynamic safety stock', 'Suppliers · external', 'Textiles Pacífico', 'Paraguas Andes']
      .forEach(text => expect(screen.getAllByText(text).length).toBeGreaterThan(0));
    ['Dataverse', 'Fabric', 'Dynamics 365', 'EDI 850', 'Email + PDF'].forEach(connector => expect(container.textContent).toContain(connector));
    expect(container.querySelectorAll('li[data-sku]')).toHaveLength(10);
    expect(container.querySelectorAll('[data-status]')).toHaveLength(2);
  });
});
