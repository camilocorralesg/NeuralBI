import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PbaThreeParadigmsAnim, PbaProCodeApiEngineAnim, PbaEnterpriseDataverseMeshAnim } from '../../components/graphics/PowerAppsAnimations';
import { LanguageProvider } from '../../context/LanguageContext';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Power Apps animation lifecycle', () => {
  it('explains the three concepts without creating fake interactive controls', () => {
    render(<><PbaThreeParadigmsAnim /><PbaProCodeApiEngineAnim /><PbaEnterpriseDataverseMeshAnim /></>);
    expect(screen.getByRole('figure', { name: 'Canvas App → Pro-Code Hybrid Architecture' })).toHaveAccessibleDescription(/packaged as a PCF control/);
    expect(screen.getByRole('figure', { name: 'The Dataverse Schema & PCF Fusion' })).toHaveAccessibleDescription(/Accounts, Contacts and Security Roles/);
    expect(screen.getByRole('figure', { name: 'The Secure Custom Architecture Grid' })).toHaveAccessibleDescription(/Identity, scoped access and row permissions/);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('pauses out of view or in background tabs and cleans up on modal close', () => {
    let intersect;
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { intersect = callback; }
      observe() {}
      disconnect = disconnect;
    });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const remove = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<PbaThreeParadigmsAnim />);
    const figure = screen.getByRole('figure');
    expect(figure).toHaveAttribute('data-running', 'false');
    intersect([{ isIntersecting: true }]);
    expect(figure).toHaveAttribute('data-running', 'true');
    hidden.mockReturnValue(true);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(figure).toHaveAttribute('data-visible', 'false');
    hidden.mockReturnValue(false);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(figure).toHaveAttribute('data-visible', 'true');
    intersect([{ isIntersecting: false }]);
    expect(figure).toHaveAttribute('data-running', 'false');
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });

  it('keeps clipping and accessible references unique and supports browsers without an observer', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<><PbaThreeParadigmsAnim /><PbaThreeParadigmsAnim /></>);
    const ids = Array.from(container.querySelectorAll('[id]'), el => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const el of container.querySelectorAll('[clip-path]')) expect(ids).toContain(el.getAttribute('clip-path').slice(5, -1));
    for (const figure of screen.getAllByRole('figure')) expect(figure).toHaveAttribute('data-running', 'true');
  });

  it('translates titles, descriptions and node labels when language is spanish', () => {
    render(
      <LanguageProvider defaultLang="es">
        <PbaThreeParadigmsAnim />
        <PbaProCodeApiEngineAnim />
        <PbaEnterpriseDataverseMeshAnim />
      </LanguageProvider>
    );
    expect(screen.getByRole('figure', { name: 'Canvas App → Arquitectura híbrida Pro-Code' })).toHaveAccessibleDescription(/Un componente React se empaqueta como control PCF/);
    expect(screen.getByRole('figure', { name: 'Fusión de esquema Dataverse y PCF' })).toHaveAccessibleDescription(/Cuentas, Contactos y Roles de seguridad convergen/);
    expect(screen.getByRole('figure', { name: 'Malla de arquitectura empresarial segura' })).toHaveAccessibleDescription(/Dentro del perímetro del tenant/);
  });
});
