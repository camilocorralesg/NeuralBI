import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MerchCopilot from '../../components/mockups/MerchCopilot';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const section = (container, id) => container.querySelector(`[data-section="${id}"]`);
const tool = name => screen.getAllByText(name)[0].closest('li');

describe('NeuralBI Merchandising Copilot mockup', () => {
  it('takes the planner’s request, reasons through baskets, markdowns and terms, and drafts the season plan for review', () => {
    const { container } = render(<MerchCopilot live language="en" />);
    const app = container.firstChild;
    expect(app).toHaveAttribute('data-phase', 'ask');
    expect(screen.getByText(/Plan the end of season for rainwear and summer/)).toBeInTheDocument();
    expect(container.querySelector('[data-open]')).toBeNull();
    expect(section(container, 'clusters')).toHaveAttribute('data-ready', 'false');

    act(() => vi.advanceTimersByTime(1400));
    expect(app).toHaveAttribute('data-phase', 'affinity');
    act(() => vi.advanceTimersByTime(1000));
    expect(tool('basket_affinity')).toHaveAttribute('data-state', 'running');
    act(() => vi.advanceTimersByTime(600));
    expect(tool('basket_affinity')).toHaveAttribute('data-state', 'done');
    expect(screen.getByText('Rain kit · jacket + umbrella + boots')).toBeInTheDocument();
    expect(section(container, 'clusters')).toHaveAttribute('data-ready', 'true');

    act(() => vi.advanceTimersByTime(1000));
    expect(app).toHaveAttribute('data-phase', 'markdown');
    act(() => vi.advanceTimersByTime(1700));
    expect(tool('markdown_optimizer')).toHaveAttribute('data-state', 'done');
    expect(section(container, 'markdown')).toHaveAttribute('data-ready', 'true');
    expect(section(container, 'terms')).toHaveAttribute('data-ready', 'false');

    act(() => vi.advanceTimersByTime(900));
    expect(app).toHaveAttribute('data-phase', 'terms');
    act(() => vi.advanceTimersByTime(1100));
    expect(screen.getAllByText('Policy · margin ≥ 38% · buyer signs').find(chip => chip.hasAttribute('data-shown'))).toHaveAttribute('data-shown', 'true');
    act(() => vi.advanceTimersByTime(600));
    expect(tool('draft_terms')).toHaveAttribute('data-state', 'done');
    expect(section(container, 'terms')).toHaveAttribute('data-ready', 'true');

    act(() => vi.advanceTimersByTime(900));
    expect(app).toHaveAttribute('data-phase', 'answer');
    expect(screen.getByText('Reasoned for 14 s · 3 tools')).toBeInTheDocument();
    expect(screen.getByText('Drafting')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByText('Ready for review')).toBeInTheDocument();
    ['POS + online baskets', 'Contract TP-2023', 'Markdowns staged · pending approval', 'Draft sent to Valentina']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
  });

  it('rests on the answered request and the plan ready for review when not live, in Spanish too', () => {
    const { container } = render(<MerchCopilot live={false} language="es" />);
    expect(container.firstChild).toHaveAttribute('data-phase', 'answer');
    expect(container.querySelectorAll('[data-section][data-ready="true"]')).toHaveLength(3);
    ['Listo para revisión', 'Enmienda al contrato TP-2023', 'Firma del comprador · pendiente', 'Razonó durante 14 s · 3 herramientas']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    act(() => vi.advanceTimersByTime(20000));
    expect(container.firstChild).toHaveAttribute('data-phase', 'answer');
  });

  it('shows a NeuralBI Copilot Studio agent writing a season plan: clusters, markdown steps and redlined supplier terms', () => {
    const { container } = render(<MerchCopilot live={false} language="en" />);
    expect(container.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['Season plan · W25', 'Affinity clusters', 'Markdown schedule', 'Amendment to contract TP-2023', 'Drafts only · buyer signs']
      .forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
    ['basket_affinity', 'markdown_optimizer', 'draft_terms'].forEach(name => expect(container.textContent).toContain(name));
    expect(section(container, 'clusters').querySelectorAll('circle')).toHaveLength(15);
    expect(container.querySelectorAll('i[data-cut]')).toHaveLength(5);
    expect(container.querySelectorAll('ol li del')).toHaveLength(2);
    expect(container.querySelectorAll('ol li ins')).toHaveLength(4);
  });
});
