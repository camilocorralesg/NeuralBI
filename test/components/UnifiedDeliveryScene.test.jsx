import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { UnifiedDeliveryScene } from '../../components/graphics/UnifiedDeliveryScene';

const names = ['SAP ERP', 'Salesforce CRM', 'Azure SQL Database', 'Oracle Database', 'HubSpot CRM', 'Microsoft Fabric', 'Power BI Reports', 'Power Apps', 'AI Copilot Agents'];
const nodes = names.map((name, i) => ({ id: `node-${i}`, name, iconKey: 'data', desc: `Description for ${name}.` }));
const props = { nodes, mobileInputNodes: nodes.slice(0, 3), icons: { data: <svg /> }, inputsHeader: '[ Data Inputs ]', deliverablesHeader: '[ Business Deliverables ]' };

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Unified delivery', () => {
  it('supports keyboard inspection, pinned details and dismissal without navigating', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<UnifiedDeliveryScene {...props} />);
    const desktop = screen.getAllByRole('figure')[0];
    const source = within(desktop).getByRole('button', { name: 'SAP ERP' });
    fireEvent.focus(source);
    expect(source).toHaveAccessibleDescription('SAP ERP Description for SAP ERP.');
    fireEvent.click(source);
    fireEvent.blur(source);
    expect(source).toHaveAttribute('aria-pressed', 'true');
    expect(within(desktop).getByText('Description for SAP ERP.')).toBeInTheDocument();
    fireEvent.keyDown(source, { key: 'Escape' });
    expect(source).toHaveAttribute('aria-pressed', 'false');
    expect(within(desktop).queryByText('Description for SAP ERP.')).not.toBeInTheDocument();
    const product = within(desktop).getByRole('button', { name: 'Power Apps' });
    fireEvent.mouseEnter(product);
    expect(product).toHaveAccessibleDescription('Power Apps Description for Power Apps.');
    fireEvent.mouseLeave(product);
    expect(product).not.toHaveAttribute('aria-describedby');
  });

  it('localizes the narrative and keeps SVG references unique across responsive and repeated instances', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<><UnifiedDeliveryScene {...props} language="es" /><UnifiedDeliveryScene {...props} language="es" /></>);
    const ids = [...container.querySelectorAll('[id]')].map(n => n.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const figure of screen.getAllByRole('figure')) {
      expect(figure).toHaveAccessibleName(/Entrega unificada/);
      expect(figure).toHaveAccessibleDescription(/registros y documentos convergen/);
      expect(figure).toHaveAttribute('data-running', 'true');
      for (const element of figure.querySelectorAll('[fill]')) {
        const value = element.getAttribute('fill');
        if (value.startsWith('url(#')) expect(ids).toContain(value.slice(5, -1));
      }
    }
    expect(screen.getAllByText('Respuesta basada en tus datos')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Sistemas CRM y ERP' })).toHaveLength(2);
  });

  it('keeps the phone\'s cards solid while they wait, so the spine never shows through their text', () => {
    const css = readFileSync(resolve(__dirname, '../../components/graphics/UnifiedDeliveryScene.module.css'), 'utf8');
    const phone = css.slice(css.indexOf('@media (max-width: 768px)'), css.indexOf('@media (prefers-reduced-motion'));
    // On the phone a card's contents dim, never the card: its own animations only light its edge.
    ['sourceA', 'sourceB', 'sourceC'].forEach((name, i) => expect(phone).toContain(`.source${i} .source > * { animation: ${name} `));
    ['frameA', 'frameB', 'frameC'].forEach((name, i) => expect(phone).toContain(`.output${i} .productHeader > * { animation: ${name} `));
    ['A', 'B', 'C'].forEach((step, i) => {
      expect(phone).toContain(`.source${i} .source { animation: emit${step} `);
      expect(phone).toContain(`.output${i} .product { animation: arrive${step} `);
      for (const name of [`emit${step}`, `arrive${step}`]) {
        const frames = css.match(new RegExp(`@keyframes ${name} \\{.*\\}`))?.[0] || '';
        expect(frames).toMatch(/border-color/);
        expect(frames).not.toMatch(/opacity/);
      }
    });
  });

  it('runs the phone\'s spine as stretches between cards that never overlap, each lit once its packet crosses it', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<UnifiedDeliveryScene {...props} />);
    const phone = screen.getAllByRole('figure')[1];
    const stretches = [...phone.querySelectorAll('svg path[class*="route"]')].map((path) => path.getAttribute('d'))
      .map((d) => d.match(/^M170 (\d+)V(\d+)$/).slice(1).map(Number));
    expect(stretches).toHaveLength(6);
    stretches.sort((a, b) => a[0] - b[0]).forEach(([from, to], i, all) => {
      expect(to).toBeGreaterThan(from);
      if (i) expect(from).toBeGreaterThanOrEqual(all[i - 1][1]);
    });
  });

  it('names each phase where it happens on the phone, and keeps the sequence under the desktop picture', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<UnifiedDeliveryScene {...props} />);
    const [desktop, phone] = screen.getAllByRole('figure');
    expect([...phone.querySelectorAll('[class*="phaseTag"]')].map((tag) => tag.textContent)).toEqual(['01Connect', '02Unify', '03Deliver']);
    expect(phone.querySelector('[class*="sequence"]')).toBeNull();
    expect(desktop.querySelector('[class*="sequence"]')).not.toBeNull();
    expect(desktop.querySelector('[class*="phaseTag"]')).toBeNull();
  });

  it('opens a phone node\'s detail right under it, and closes it with a tap elsewhere or Escape', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<UnifiedDeliveryScene {...props} />);
    const phone = screen.getAllByRole('figure')[1];
    // The phone groups its sources (CRM & ERP systems stands for SAP ERP and Salesforce CRM).
    const source = within(phone).getByRole('button', { name: 'CRM & ERP systems' });
    // A tap fires a mouse enter on a phone: it opens nothing by itself.
    fireEvent.mouseEnter(source);
    expect(source).not.toHaveAttribute('aria-describedby');
    fireEvent.click(source);
    const detail = within(phone).getByText('Description for SAP ERP.').parentElement;
    expect(detail.closest('[data-node]')).toBe(source.closest('[data-node]'));
    expect(source).toHaveAttribute('aria-describedby', detail.id);
    expect(phone.querySelector('figcaption')).toBeNull();
    fireEvent.pointerDown(document.body);
    expect(within(phone).queryByText('Description for SAP ERP.')).not.toBeInTheDocument();

    const product = within(phone).getByRole('button', { name: 'Power Apps' });
    fireEvent.click(product);
    expect(within(phone).getByText('Description for Power Apps.')).toBeInTheDocument();
    fireEvent.pointerDown(product);
    fireEvent.click(product);
    expect(within(phone).queryByText('Description for Power Apps.')).not.toBeInTheDocument();
    fireEvent.click(product);
    fireEvent.keyDown(product, { key: 'Escape' });
    expect(within(phone).queryByText('Description for Power Apps.')).not.toBeInTheDocument();
  });

  it('pauses hidden layouts and offscreen scenes and cleans up every observer', () => {
    const callbacks = [];
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { callbacks.push(callback); }
      observe() {}
      disconnect = disconnect;
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const remove = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<UnifiedDeliveryScene {...props} />);
    const [desktop, mobile] = screen.getAllByRole('figure');
    callbacks[0]([{ isIntersecting: true, intersectionRatio: .1 }]);
    expect(desktop).toHaveAttribute('data-running', 'false');
    callbacks[0]([{ isIntersecting: true, intersectionRatio: .8 }]);
    expect(desktop).toHaveAttribute('data-running', 'true');
    expect(mobile).toHaveAttribute('data-running', 'false');
    hidden.mockReturnValue(true);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(desktop).toHaveAttribute('data-visible', 'false');
    hidden.mockReturnValue(false);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(desktop).toHaveAttribute('data-visible', 'true');
    callbacks[0]([{ isIntersecting: false, intersectionRatio: 0 }]);
    expect(desktop).toHaveAttribute('data-running', 'false');
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(2);
    expect(remove.mock.calls.filter(([name]) => name === 'visibilitychange')).toHaveLength(2);
  });
});
