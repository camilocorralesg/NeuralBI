import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FraudCopilot from '../../components/mockups/FraudCopilot';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const block = (container, title) => [...container.querySelectorAll('section[data-ready]')].find(section => section.textContent.startsWith(title));
const tool = (container, name) => [...container.querySelectorAll('li[data-state]')].find(item => item.textContent.includes(name));

describe('NeuralBI Fraud Copilot mockup', () => {
  it('reasons from a velocity alert to a flagged mule ring, stops at its autonomy line and publishes the digest', () => {
    const { container } = render(<FraudCopilot live language="en" />);
    const app = container.firstChild;
    const digest = () => container.querySelector('article[data-status]');
    expect(app).toHaveAttribute('data-phase', 'alert');
    expect(screen.getByText('14 transfers deviate from baseline · velocity 6.2σ')).toBeInTheDocument();
    expect(container.querySelector('[data-open]')).toBeNull();

    act(() => vi.advanceTimersByTime(1400));
    expect(app).toHaveAttribute('data-phase', 'query');
    expect(container.querySelector('[data-open]')).toHaveAttribute('data-open', 'true');
    act(() => vi.advanceTimersByTime(1400));
    expect(tool(container, 'query_transactions')).toHaveAttribute('data-state', 'done');
    expect(block(container, 'Amount vs time')).toHaveAttribute('data-ready', 'true');
    expect(container.querySelectorAll('circle[data-cluster]')).toHaveLength(14);

    act(() => vi.advanceTimersByTime(800));
    expect(app).toHaveAttribute('data-phase', 'link');
    act(() => vi.advanceTimersByTime(2200));
    expect(app).toHaveAttribute('data-phase', 'score');
    expect(container.querySelectorAll('path[data-drawn="true"]')).toHaveLength(9);
    expect(container.querySelector('[data-risk]')).toHaveAttribute('data-risk', 'true');
    expect(screen.getByText('Ring of 6 · 1 beneficiary')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1700));
    expect(tool(container, 'risk.score')).toHaveAttribute('data-state', 'done');
    expect(block(container, 'Flagged transfers')).toHaveAttribute('data-ready', 'true');
    expect(digest()).toHaveAttribute('data-status', 'drafting');

    act(() => vi.advanceTimersByTime(500));
    expect(app).toHaveAttribute('data-phase', 'policy');
    act(() => vi.advanceTimersByTime(900));
    expect(screen.getAllByText('Policy · flag only').find(chip => chip.dataset.shown)).toHaveAttribute('data-shown', 'true');

    act(() => vi.advanceTimersByTime(900));
    expect(app).toHaveAttribute('data-phase', 'act');
    act(() => vi.advanceTimersByTime(1300));
    expect(digest()).toHaveAttribute('data-status', 'published');
    expect(screen.getByText('Needs approval')).toBeInTheDocument();
    expect(tool(container, 'request_approval')).toHaveAttribute('data-state', 'running');

    act(() => vi.advanceTimersByTime(900));
    expect(app).toHaveAttribute('data-phase', 'answer');
    expect(container.querySelector('[data-open]')).toHaveAttribute('data-open', 'false');
    expect(screen.getByText('Reasoned for 16 s · 6 tool calls')).toBeInTheDocument();
    expect(container.querySelector('section[data-ready] p')).not.toBeNull();
    act(() => vi.advanceTimersByTime(2300));
    expect(container.querySelector('[data-complete]')).toHaveAttribute('data-complete', 'true');
    expect(screen.getByText('Freeze pending approval')).toBeInTheDocument();
  });

  it('rests on the published digest and the folded reasoning when not live, in Spanish too', () => {
    const { container } = render(<FraudCopilot live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'answer');
    expect(screen.getByText('Publicado · #compliance')).toBeInTheDocument();
    expect(screen.getByText('Razonó durante 16 s · 6 herramientas')).toBeInTheDocument();
    expect(container.querySelector('[data-complete]')).toHaveAttribute('data-complete', 'true');
    expect(screen.getByText('Requiere aprobación')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'answer');
  });

  it('shows the NeuralBI agent beside the compliance risk digest it writes', () => {
    const { container } = render(<FraudCopilot live={false} language="en" />);
    expect(container.querySelectorAll('img[src*="Neuralbi"]').length).toBeGreaterThan(1);
    ['Compliance risk digest', 'Mule network', 'Flagged transfers', 'Recommended actions', 'Brisa Import SAS', 'TX-90211', '$28,700']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    ['Fraud Copilot', 'query_transactions', 'graph.link_analysis', 'request_approval'].forEach(text => expect(screen.getAllByText(text).length).toBeGreaterThan(0));
  });
});
