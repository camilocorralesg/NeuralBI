import React from 'react';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { translations } from '../../lib/translations';
import Loading from '../../app/loading';
import AuroraField from '../../components/AuroraField';
import FloatingLines from '../../components/FloatingLines';
import Footer from '../../components/sections/Footer';
import { LanguageProvider } from '../../context/LanguageContext';

// The hero lines' renderer, stubbed: these tests are about when a context exists, not what it draws.
const destroyLines = vi.fn();
vi.mock('../../components/linesRenderer', () => ({
  createLinesRenderer: vi.fn(() => ({ set: vi.fn(), resize: vi.fn(), render: vi.fn(), destroy: destroyLines })),
}));

const root = resolve(__dirname, '../..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

// Captures every IntersectionObserver, so a test can report "near" or "far" itself.
let observers = [];
beforeEach(() => {
  observers = [];
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options = {}) { this.callback = callback; this.options = options; this.elements = []; observers.push(this); }
    observe(element) { this.elements.push(element); }
    unobserve() {}
    disconnect() {}
  });
});
afterEach(() => { vi.unstubAllGlobals(); vi.clearAllMocks(); });
const approach = () => observers.find((observer) => observer.options.rootMargin === '100% 0px');

describe('The site audit of 2026-11-08', () => {
  it('sends the footer to its own legal pages through the base path, and to Microsoft docs in a new tab', () => {
    render(<LanguageProvider><Footer /></LanguageProvider>);
    // next/link carries the /NeuralBI base path; a bare <a href="/privacy"> did not.
    expect(read('components/sections/Footer.jsx')).toMatch(/link\.href\.startsWith\('\/'\)\s*\?\s*<Link href=\{link\.href\}/);
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).not.toHaveAttribute('target');
    expect(screen.getByRole('link', { name: 'Terms of Service' })).not.toHaveAttribute('target');
    screen.getAllByRole('link', { name: 'Official Documentation' }).forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^https:\/\/learn\.microsoft\.com\//);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('waits on the NeuralBI logo forming, never on a "neural pipeline" text', () => {
    render(<Loading />);
    const status = screen.getByRole('status', { name: 'Loading NeuralBI' });
    expect(status.querySelector('svg')).not.toBeNull();
    expect(status.querySelectorAll('path').length).toBeGreaterThan(10);
    expect(status.textContent).toBe('');
    expect(read('app/loading.jsx')).not.toMatch(/INITIALIZING|pipeline/i);
    expect(read('components/intro/LogoForming.module.css')).toMatch(/prefers-reduced-motion: reduce/);
  });

  it('says it plainly: no jargon in either language', () => {
    const jargon = /seamless|cognitiv|zero[- ](processing )?friction|surgically|applied intelligence|absolutely|high-velocity|eradicat|make it think|transmitting|cero fricci|quirúrgic|inteligencia aplicada|erradi|vías neuronales|neural pathways/i;
    const found = [];
    const walk = (value, path) => {
      if (typeof value === 'string') { if (!path.endsWith('.id') && jargon.test(value)) found.push(`${path}: ${value}`); }
      else if (value && typeof value === 'object') Object.entries(value).forEach(([key, child]) => walk(child, `${path}.${key}`));
    };
    walk(translations, 'translations');
    expect(found).toEqual([]);
  });

  it('keeps the Volt italic for the hero and the closing call; every section title is plain', () => {
    for (const language of ['en', 'es']) {
      const t = translations[language];
      const titles = [t.manifesto.sectionTitle, t.arsenal.sectionTitle, t.methodology.sectionTitle, t.verticals.sectionTitle,
        t.impact.titleLine1, t.impact.titleLine2, t.faq.sectionTitle];
      titles.forEach((title) => expect(title).not.toMatch(/\*/));
      expect(t.footerCta.headlinePart2).toMatch(/^\*.+\*$/);
    }
  });

  it('sets every section title at one size, always under the hero h1', () => {
    expect(read('app/globals.css')).toMatch(/--type-h2: clamp\(2rem, 1\.2rem \+ 2\.2vw, 3rem\);/);
    for (const file of ['ManifestoPremium', 'ArsenalExperience', 'NeuralProtocol', 'IntegrationsHub', 'Industries', 'Impact', 'Faq', 'FooterCTA']) {
      expect(read(`components/sections/${file}.module.css`), file).toMatch(/var\(--type-h2\)/);
    }
  });

  it('puts every section on one container', () => {
    expect(read('app/globals.css')).toMatch(/--container: 1320px;[\s\S]*--gutter: clamp\(20px, 3vw, 40px\);/);
    for (const file of ['ManifestoPremium', 'ArsenalExperience', 'NeuralProtocol', 'IntegrationsHub', 'Industries', 'Impact', 'Faq', 'FooterCTA', 'Footer']) {
      expect(read(`components/sections/${file}.module.css`), file).toMatch(/min\(100% - 2 \* var\(--gutter\), var\(--container\)\)/);
    }
  });

  it('ships no three.js: the hero lines run on a bare WebGL renderer with bounded GLSL ES 1.00 loops', () => {
    const pkg = JSON.parse(read('package.json'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    ['three', '@react-three/fiber', '@react-three/drei', 'ogl'].forEach((name) => expect(deps[name], name).toBeUndefined());
    const lines = read('components/FloatingLines.jsx');
    expect(lines).not.toMatch(/from 'three'/);
    expect(lines.match(/for \(int i = 0; i < MAX_LINES; \+\+i\)/g)).toHaveLength(3);
  });

  it('makes an Aurora context only near the screen and frees it a screen away', () => {
    const { container } = render(<AuroraField />);
    const field = container.firstElementChild;
    // Nothing is measured at mount (that forced a layout mid-hydration): the first "near" report makes the canvas.
    expect(field.querySelector('canvas')).toBeNull();
    act(() => approach().callback([{ isIntersecting: true }]));
    expect(field.querySelector('canvas')).not.toBeNull();
    act(() => approach().callback([{ isIntersecting: false }]));
    expect(field.querySelector('canvas')).toBeNull();
    expect(field).toHaveAttribute('data-webgl', 'false');
    act(() => approach().callback([{ isIntersecting: true }]));
    expect(field.querySelector('canvas')).not.toBeNull();
  });

  it('frees the hero lines\' context a screen away and makes a new one on the way back', () => {
    const { container } = render(<FloatingLines />);
    const lines = container.querySelector('.floating-lines-container');
    // The hero at load: its context comes with the observer's first report, right after the first layout.
    expect(lines.querySelector('canvas')).toBeNull();
    act(() => approach().callback([{ isIntersecting: true }]));
    expect(lines).toHaveAttribute('data-webgl', 'true');
    expect(lines.querySelector('canvas')).not.toBeNull();
    act(() => approach().callback([{ isIntersecting: false }]));
    expect(lines.querySelector('canvas')).toBeNull();
    expect(destroyLines).toHaveBeenCalledOnce();
    act(() => approach().callback([{ isIntersecting: true }]));
    expect(lines.querySelector('canvas')).not.toBeNull();
  });

  it('loads the signature face as a tiny WOFF2 of its letters', () => {
    const css = read('app/globals.css');
    expect(css).toMatch(/font-family: 'Absolut';\s*src: url\('\/NeuralBI\/assets\/fonts\/AbsolutMedium-signature\.woff2'\) format\('woff2'\);/);
    expect(statSync(resolve(root, 'public/assets/fonts/AbsolutMedium-signature.woff2')).size).toBeLessThan(4096);
  });

  it('gives below-the-fold logos lazy loading, and the product logos their size', () => {
    for (const file of ['components/sections/ArsenalConsole.jsx', 'components/sections/ArsenalExperience.jsx', 'components/sections/Footer.jsx', 'components/sections/IntegrationsHub.jsx', 'components/graphics/UnifiedDeliveryScene.jsx']) {
      expect(read(file), file).toMatch(/loading="lazy"/);
    }
    expect(read('components/sections/ArsenalConsole.jsx')).toMatch(/width="96" height="96"/);
  });

  it('draws no line under the Unified Delivery picture at rest', () => {
    const scene = read('components/graphics/UnifiedDeliveryScene.jsx');
    expect(scene).not.toMatch(/hint:/);
    expect(scene).toMatch(/\{activeNode && <>/);
  });

  it('carries no dead sections or graphics', () => {
    ['components/sections/CaseStudy.jsx', 'components/graphics/BlueprintGraphics.jsx'].forEach((file) => expect(existsSync(resolve(root, file)), file).toBe(false));
    expect(translations.en.caseStudy).toBeUndefined();
    expect(translations.en.integrations).toBeUndefined();
  });
});
