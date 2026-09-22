import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { UnifiedDeliveryScene } from '../../components/graphics/UnifiedDeliveryScene';

const names = ['SAP ERP', 'Salesforce CRM', 'Azure SQL Database', 'Oracle Database', 'HubSpot CRM', 'SharePoint Portal', 'Power BI Reports', 'Power Apps', 'AI Copilot Agents'];
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
