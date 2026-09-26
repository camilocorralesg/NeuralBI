import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CreditDesk from '../../components/mockups/CreditDesk';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const stage = (container, name) => [...container.querySelectorAll('ol li[data-state]')].find(item => item.textContent === name);
const checks = (container, state) => container.querySelectorAll(`ul li[data-state="${state}"]`);

describe('NeuralBI Credit Desk mockup', () => {
  it('spreads, rates and routes the facility, then the CFO approves it on her phone after an Entra ID MFA check', () => {
    const { container } = render(<CreditDesk live language="en" />);
    const root = container.firstChild;
    const tap = () => container.querySelector('[data-visible]');
    expect(root).toHaveAttribute('data-phase', 'spread');
    expect(stage(container, 'Spreading')).toHaveAttribute('data-state', 'active');
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(0);
    act(() => vi.advanceTimersByTime(2300));
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(4);
    expect(screen.getByText('2.8x').closest('[data-shown]')).toHaveAttribute('data-shown', 'true');
    expect(screen.getByText('Spread verified')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(500));
    expect(root).toHaveAttribute('data-phase', 'rate');
    expect(stage(container, 'Risk rating')).toHaveAttribute('data-state', 'active');
    act(() => vi.advanceTimersByTime(2000));
    expect(container.querySelector('[data-rated]')).toHaveAttribute('data-rated', 'true');
    expect(checks(container, 'pass')).toHaveLength(2);
    expect(checks(container, 'exception')).toHaveLength(1);
    expect(screen.getByText('Exception · committee')).toBeInTheDocument();
    expect(screen.getByText('Exception logged')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(400));
    expect(root).toHaveAttribute('data-phase', 'route');
    expect(stage(container, 'Committee')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Committee review')).toBeInTheDocument();
    expect(screen.getByText('Pending · mobile')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1700));
    expect(screen.getByText('Approved · condition')).toBeInTheDocument();
    expect(container.querySelector('[data-value="2/3"]')).not.toBeNull();

    act(() => vi.advanceTimersByTime(500));
    expect(root).toHaveAttribute('data-phase', 'approve');
    expect(screen.getByText('Approve')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(900));
    expect(screen.getByText('Verified with Entra ID · MFA')).toBeInTheDocument();
    expect(tap()).toHaveAttribute('data-visible', 'true');
    act(() => vi.advanceTimersByTime(900));
    expect(root).toHaveAttribute('data-approved', 'true');
    expect(screen.getByText('Approved · 10:26')).toBeInTheDocument();
    expect(screen.getByText('Approved · 1 condition')).toBeInTheDocument();
    expect(stage(container, 'Approved')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText(/D\. Vega · Mobile · MFA/)).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1000));
    expect(root).toHaveAttribute('data-phase', 'hold');
    expect(tap()).toHaveAttribute('data-visible', 'false');
  });

  it('rests on the approved facility when not live, in Spanish too', () => {
    const { container } = render(<CreditDesk live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
    expect(container.firstChild).toHaveAttribute('data-approved', 'true');
    expect(screen.getByText('Aprobado · 1 condición')).toBeInTheDocument();
    expect(screen.getByText('Aprobado · 10:26')).toBeInTheDocument();
    expect(screen.getByText('Verificado con Entra ID · MFA')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'hold');
  });

  it('shows a NeuralBI Power Apps app: process stages, PCF controls, Microsoft 365 security and a Dataverse audit trail', () => {
    const { container } = render(<CreditDesk live={false} language="en" />);
    expect(container.querySelectorAll('img[src*="Neuralbi"]').length).toBeGreaterThan(1);
    ['Intake', 'Spreading', 'Risk rating', 'Committee', 'Approved'].forEach(name => expect(stage(container, name)).toBeDefined());
    ['Confidential · Finance', 'Deal committee', 'Audit trail', 'Dataverse'].forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    expect(screen.getAllByText('React · PCF')).toHaveLength(2);
    expect(screen.getAllByText('BB+').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Andina Retail S.A.S.').length).toBeGreaterThan(0);
  });
});
