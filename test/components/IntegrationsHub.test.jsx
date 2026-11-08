import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import IntegrationsHub from '../../components/sections/IntegrationsHub';
import AuroraField from '../../components/AuroraField';
import { createAuroraRenderer } from '../../components/auroraRenderer';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

vi.mock('../../components/auroraRenderer', () => ({ createAuroraRenderer: vi.fn(() => null) }));

afterEach(() => { vi.unstubAllGlobals(); window.localStorage.removeItem('neuralbi_lang'); });

describe('IntegrationsHub', () => {
  it('names the section plainly, lists the real sources in its line, and localizes it with the scene', () => {
    const { container } = render(<LanguageProvider><LanguageSwitch /><IntegrationsHub /></LanguageProvider>);

    const heading = screen.getByRole('heading', { level: 2, name: 'Integrations with your systems' });
    expect(heading.querySelector('em')).toBeNull();
    expect(container.querySelector('.text-gradient-premium')).toBeNull();
    expect(screen.getByText(/We connect SAP, Salesforce, Oracle, Azure SQL, HubSpot and Microsoft Fabric/)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/zero (processing )?friction|cognitive|high-throughput/i);
    expect(screen.getAllByRole('figure', { name: /Unified delivery/ })).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Integraciones con sus sistemas' })).toBeInTheDocument();
    expect(screen.getAllByRole('figure', { name: /Entrega unificada/ })).toHaveLength(2);
  });

  it('names each source with its real brand mark, and keeps plain glyphs for the grouped phone nodes', () => {
    const { container } = render(<LanguageProvider><IntegrationsHub /></LanguageProvider>);
    const desktop = container.querySelectorAll('figure')[0];
    const source = (name) => [...desktop.querySelectorAll('button')].find((button) => button.textContent.replace(/\s+/g, ' ').trim() === name
      || button.querySelector('img[alt]') && `${button.querySelector('img[alt]').alt} ${button.textContent.trim()}` === name);

    // Icon marks: decorative, beside the full name.
    for (const [name, file] of [['Salesforce CRM', 'salesforce.svg'], ['Azure SQL Database', 'azure.svg'], ['HubSpot CRM', 'hubspot.svg'], ['Microsoft Fabric', 'fabric.svg']]) {
      const img = source(name).querySelector('img');
      expect(img.getAttribute('src')).toBe(`/NeuralBI/assets/integrations/${file}`);
      expect(img.getAttribute('alt')).toBe('');
    }
    // Wordmarks stand in for the brand's name, which their alt text keeps: "SAP ERP", "Oracle Database".
    for (const [brand, rest, file] of [['SAP', 'ERP', 'sap.svg'], ['Oracle', 'Database', 'oracle.svg']]) {
      const img = desktop.querySelector(`img[alt="${brand}"]`);
      expect(img.getAttribute('src')).toBe(`/NeuralBI/assets/integrations/${file}`);
      expect(img.closest('button').textContent.trim()).toBe(rest);
    }
    // No source is left on a generic glyph.
    [...desktop.querySelectorAll('button')].slice(0, 6).forEach((button) => expect(button.querySelector('img')).not.toBeNull());
    // The phone layout's grouped nodes stand for several systems at once: glyphs, never one brand's mark.
    const phone = container.querySelectorAll('figure')[1];
    [...phone.querySelectorAll('button')].slice(0, 3).forEach((button) => expect(button.querySelector('img')).toBeNull());
  });

  it('ships every brand mark it names as a local, script-free file', () => {
    for (const file of ['sap.svg', 'salesforce.svg', 'oracle.svg', 'hubspot.svg', 'azure.svg', 'fabric.svg']) {
      const svg = readFileSync(resolve(__dirname, '../../public/assets/integrations', file), 'utf8');
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg).not.toMatch(/<script|foreignObject|javascript:|href="http/i);
    }
    // HubSpot's sprocket is drawn on Simple Icons' full 24-unit canvas, never a crop that cuts its arms off.
    expect(readFileSync(resolve(__dirname, '../../public/assets/integrations/hubspot.svg'), 'utf8')).toContain('viewBox="0 0 24 24"');
  });

  it('draws the light field behind the content, hidden from assistive technology', () => {
    const { container } = render(<LanguageProvider><IntegrationsHub /></LanguageProvider>);
    const aurora = container.querySelector('section').firstElementChild;
    expect(aurora).toHaveAttribute('aria-hidden', 'true');
    expect(aurora.querySelector('canvas')).toBeInTheDocument();
    expect(aurora.querySelector('button, a, [tabindex]')).toBeNull();
  });
});

describe('AuroraField', () => {
  const observers = [];
  const renderer = { resize: vi.fn(), setColor: vi.fn(), setClearing: vi.fn(), render: vi.fn(), destroy: vi.fn() };
  const stubObserver = () => vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
    observe(element) { this.element = element; }
  });
  const stubMotion = (reduce) => vi.stubGlobal('matchMedia', (query) => ({ matches: reduce && query.includes('reduce'), media: query }));

  beforeEach(() => {
    observers.length = 0;
    Object.values(renderer).forEach((fn) => fn.mockClear());
    createAuroraRenderer.mockReset();
  });

  it('runs only while on screen and visible, never listens to the pointer, and releases everything', () => {
    createAuroraRenderer.mockReturnValue(renderer);
    stubObserver();
    stubMotion(false);
    const frames = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(7);
    const cancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    const listen = vi.spyOn(window, 'addEventListener');
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const { container, unmount } = render(<AuroraField intensity={0.6} />);
    const aurora = container.firstElementChild;

    expect(aurora).toHaveAttribute('data-webgl', 'true');
    expect(renderer.setColor).toHaveBeenCalledWith(expect.any(Array), 0.6);
    expect(aurora).toHaveAttribute('data-running', 'false');
    act(() => observers[0].callback([{ isIntersecting: true }]));
    expect(aurora).toHaveAttribute('data-running', 'true');
    expect(frames).toHaveBeenCalled();

    hidden.mockReturnValue(true);
    act(() => { document.dispatchEvent(new Event('visibilitychange')); });
    expect(aurora).toHaveAttribute('data-running', 'false');
    expect(cancel).toHaveBeenCalledWith(7);
    hidden.mockReturnValue(false);
    act(() => { document.dispatchEvent(new Event('visibilitychange')); });
    act(() => observers[0].callback([{ isIntersecting: false }]));
    expect(aurora).toHaveAttribute('data-running', 'false');
    expect(listen.mock.calls.filter(([name]) => /pointer|mouse/.test(name))).toHaveLength(0);

    unmount();
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    expect(renderer.destroy).toHaveBeenCalledOnce();
    [frames, cancel, listen, hidden].forEach((spy) => spy.mockRestore());
  });

  it('hands the shader the content box to flow around, in uv with y pointing up', () => {
    createAuroraRenderer.mockReturnValue(renderer);
    stubObserver();
    stubMotion(false);
    const rect = (left, top, width, height) => ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top });
    const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function measure() {
      if (this.dataset.testid === 'stage') return rect(100, 200, 800, 400);
      return rect(0, 0, 1000, 800);
    });
    function Stage() {
      const stage = React.useRef(null);
      return <div><AuroraField clearRef={stage} /><div ref={stage} data-testid="stage" /></div>;
    }
    render(<Stage />);
    expect(renderer.setClearing).toHaveBeenCalledWith(0.1, 0.25, 0.9, 0.75);
    geometry.mockRestore();
  });

  it('paints a single still frame under reduced motion', () => {
    createAuroraRenderer.mockReturnValue(renderer);
    stubObserver();
    stubMotion(true);
    const frames = vi.spyOn(window, 'requestAnimationFrame');
    const { container } = render(<AuroraField />);
    act(() => observers[0].callback([{ isIntersecting: true }]));
    expect(container.firstElementChild).toHaveAttribute('data-running', 'false');
    expect(renderer.render).toHaveBeenCalled();
    expect(frames).not.toHaveBeenCalled();
    frames.mockRestore();
  });

  it('survives StrictMode remounts on a fresh canvas instead of reusing a lost context', () => {
    createAuroraRenderer.mockReturnValue(renderer);
    stubObserver();
    stubMotion(false);
    const { container } = render(<React.StrictMode><AuroraField /></React.StrictMode>);
    const aurora = container.firstElementChild;
    const [[first], [second]] = createAuroraRenderer.mock.calls;
    expect(first).not.toBe(second);
    expect(renderer.destroy).toHaveBeenCalledOnce();
    expect(aurora.querySelectorAll('canvas')).toHaveLength(1);
    expect(aurora.querySelector('canvas')).toBe(second);
    expect(aurora).toHaveAttribute('data-webgl', 'true');
  });

  it('rebuilds on a new canvas when the browser takes the context back', () => {
    createAuroraRenderer.mockReturnValue(renderer);
    stubObserver();
    stubMotion(false);
    const { container } = render(<AuroraField />);
    const aurora = container.firstElementChild;
    const lostCanvas = aurora.querySelector('canvas');
    act(() => { lostCanvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true })); });
    expect(aurora).toHaveAttribute('data-webgl', 'false');
    act(() => observers[0].callback([{ isIntersecting: true }]));
    expect(aurora).toHaveAttribute('data-webgl', 'true');
    expect(aurora.querySelector('canvas')).not.toBe(lostCanvas);
  });

  it('keeps the static gradient when WebGL is unavailable', () => {
    createAuroraRenderer.mockReturnValue(null);
    stubObserver();
    stubMotion(false);
    const { container } = render(<AuroraField />);
    act(() => observers[0].callback([{ isIntersecting: true }]));
    expect(container.firstElementChild).toHaveAttribute('data-webgl', 'false');
    expect(container.firstElementChild).toHaveAttribute('data-running', 'false');
  });

  it('never names a shader variable with a word GLSL ES reserves, which would silently fall back to CSS', () => {
    const source = readFileSync(resolve(__dirname, '../../components/auroraRenderer.js'), 'utf8');
    const reserved = 'asm|class|union|enum|typedef|template|this|packed|goto|switch|default|inline|noinline|volatile|public|static|extern|external|interface|flat|long|short|double|half|fixed|unsigned|superp|input|output|sizeof|cast|namespace|using|sample|filter';
    expect(source).not.toMatch(new RegExp(`\\b(?:float|int|bool|vec[234]|mat[234])\\s+(?:${reserved})\\b`));
  });

  it('names its keyframes literally, so CSS Modules can hash them together with their rules', () => {
    const css = readFileSync(resolve(__dirname, '../../components/AuroraField.module.css'), 'utf8');
    const keyframes = [...css.matchAll(/@keyframes (\w+)/g)].map(([, name]) => name);
    expect(keyframes.length).toBeGreaterThan(0);
    for (const name of keyframes) expect(css).toMatch(new RegExp(`animation(-name)?: ${name}[ ;]`));
    expect(css).not.toMatch(/animation(-name)?:\s*var\(/);
  });
});
