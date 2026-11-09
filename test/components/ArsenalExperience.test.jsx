import React, { useState } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { MotionGlobalConfig } from 'framer-motion';
import { LanguageProvider } from '../../context/LanguageContext';
import ArsenalExperience, { ArsenalDetailModal } from '../../components/sections/ArsenalExperience';
import { translations } from '../../lib/translations';
import { arsenalScenes } from '../../components/graphics/arsenalScenes';

// The scenes are a chunk of their own (test/components/SceneChunks.test.jsx covers that); here they are in place, the
// way they are once the reader reaches the section.
beforeAll(() => arsenalScenes.load());
// Animations resolve instantly: these tests assert state, and happy-dom rejects interrupted WAAPI animations.
beforeAll(() => { MotionGlobalConfig.skipAnimations = true; });
afterAll(() => { MotionGlobalConfig.skipAnimations = false; });
beforeEach(() => {
  vi.stubGlobal('matchMedia', (query) => ({ matches: query.includes('min-width: 1024px'), addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
  const original = Element.prototype.getBoundingClientRect;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function rect() { return original.call(this); });
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

const EN = translations.en.arsenal;
const tool = (id, key, name, color) => ({ id, name, color, ...EN.tools[key], detail: EN.modalDetails[id] });
const TOOLS = [
  tool('power-bi', 'powerBi', 'Power BI', '#f2c811'),
  tool('power-apps', 'powerApps', 'Power Apps', '#e7a2cd'),
  tool('power-automate', 'powerAutomate', 'Power Automate', '#9bc5ec'),
  tool('copilot-studio', 'copilotStudio', 'Copilot Studio', '#a2d8c1'),
];

describe('The Arsenal on desktop: one product console', () => {
  const mount = () => render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
  const rail = () => screen.getByRole('tablist', { name: 'Arsenal' });
  const productTab = (name) => within(rail()).getByRole('tab', { name });
  const chapterList = () => screen.getByRole('tablist', { name: /: Explore the architecture$/ });
  const chapterTab = (name) => within(chapterList()).getByRole('tab', { name });
  const consolePanel = () => document.getElementById('arsenal-console-panel');
  const activeCopy = () => consolePanel().querySelector('#arsenal-chapter-panel > :not([aria-hidden])');

  it('reveals the section title without changing its accessible name', () => {
    mount();
    // Named after what it holds, with no italic flourish.
    const heading = screen.getByRole('heading', { level: 2, name: 'Power Platform services' });
    expect(heading.querySelector('em')).toBeNull();
  });

  it('lists the four products in a rail and opens on the first: its title, its proposition and one scene', () => {
    mount();
    const tabs = within(rail()).getAllByRole('tab');
    expect(tabs.map((tab) => tab.textContent)).toEqual(TOOLS.map((entry) => entry.name));
    expect(tabs.map((tab) => tab.getAttribute('aria-selected'))).toEqual(['true', 'false', 'false', 'false']);
    // Roving focus: only the selected tab is in the tab order.
    expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1]);
    expect(screen.getByRole('tabpanel', { name: 'Power BI' })).toBe(consolePanel());
    // Only the active product's title is read.
    expect(within(consolePanel()).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual([TOOLS[0].title]);
    expect(within(chapterList()).getAllByRole('tab').map((tab) => tab.textContent)).toEqual(['The proposition', 'Capabilities', 'The difference']);
    expect(activeCopy()).toHaveTextContent(TOOLS[0].body);
    expect(activeCopy()).toHaveTextContent(TOOLS[0].detail.roiMetric);
    expect(consolePanel().querySelector('[data-scene]')).toHaveAttribute('data-scene', 'power-bi-0');
    expect(consolePanel().querySelectorAll('[data-scene] figure')).toHaveLength(1);
  });

  it('carries no full-architecture button, no counters and no scroll machinery', () => {
    const { container } = mount();
    expect(within(consolePanel()).queryByRole('button', { name: /Explore full architecture/i })).toBeNull();
    expect(consolePanel().textContent).not.toMatch(/\b\d{2} \/ \d{2}\b/);
    expect(container.querySelector('[data-moment]')).toBeNull();
    expect(screen.queryByText(/Scroll to continue/i)).toBeNull();
    // The rail and the chapter control name things; no index digits in them.
    expect(rail().textContent).not.toMatch(/\d/);
    expect(chapterList().textContent).not.toMatch(/\d/);
  });

  it('switches products and keeps the chapter, so they can be compared', () => {
    mount();
    fireEvent.click(chapterTab('Capabilities'));
    expect(chapterTab('Capabilities')).toHaveAttribute('aria-selected', 'true');
    for (const capability of TOOLS[0].detail.capabilities) expect(activeCopy()).toHaveTextContent(capability.label);
    fireEvent.click(productTab('Power Apps'));
    expect(productTab('Power Apps')).toHaveAttribute('aria-selected', 'true');
    expect(productTab('Power BI')).toHaveAttribute('aria-selected', 'false');
    expect(within(consolePanel()).getByRole('heading', { level: 3 })).toHaveTextContent(TOOLS[1].title);
    expect(chapterTab('Capabilities')).toHaveAttribute('aria-selected', 'true');
    for (const capability of TOOLS[1].detail.capabilities) {
      expect(activeCopy()).toHaveTextContent(capability.label);
      expect(activeCopy()).toHaveTextContent(capability.desc);
    }
    expect(consolePanel().querySelector('[data-scene]')).toHaveAttribute('data-scene', 'power-apps-1');
    fireEvent.click(chapterTab('The difference'));
    for (const claim of TOOLS[1].detail.differentiators) expect(activeCopy()).toHaveTextContent(claim);
  });

  it('takes the active product colour', () => {
    mount();
    const panel = rail().parentElement;
    expect(panel.style.getPropertyValue('--tool-accent')).toBe(TOOLS[0].color);
    fireEvent.click(productTab('Copilot Studio'));
    expect(panel.style.getPropertyValue('--tool-accent')).toBe(TOOLS[3].color);
  });

  it('moves through products and chapters with the keyboard, focus following the selection', () => {
    mount();
    productTab('Power BI').focus();
    fireEvent.keyDown(productTab('Power BI'), { key: 'ArrowDown' });
    expect(productTab('Power Apps')).toHaveAttribute('aria-selected', 'true');
    expect(productTab('Power Apps')).toHaveFocus();
    fireEvent.keyDown(productTab('Power Apps'), { key: 'ArrowRight' });
    expect(productTab('Power Automate')).toHaveFocus();
    fireEvent.keyDown(productTab('Power Automate'), { key: 'End' });
    expect(productTab('Copilot Studio')).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(productTab('Copilot Studio'), { key: 'ArrowDown' });
    expect(productTab('Power BI')).toHaveFocus();

    chapterTab('The proposition').focus();
    fireEvent.keyDown(chapterTab('The proposition'), { key: 'ArrowRight' });
    expect(chapterTab('Capabilities')).toHaveAttribute('aria-selected', 'true');
    expect(chapterTab('Capabilities')).toHaveFocus();
    fireEvent.keyDown(chapterTab('Capabilities'), { key: 'Home' });
    expect(chapterTab('The proposition')).toHaveFocus();
    fireEvent.keyDown(chapterTab('The proposition'), { key: 'ArrowLeft' });
    expect(chapterTab('The difference')).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps every inactive panel and title out of reach: hidden from assistive technology and inert', () => {
    mount();
    const panels = [...document.getElementById('arsenal-chapter-panel').children];
    expect(panels).toHaveLength(12);
    const hidden = panels.filter((panel) => panel.getAttribute('aria-hidden') === 'true');
    expect(hidden).toHaveLength(11);
    hidden.forEach((panel) => expect(panel).toHaveAttribute('inert'));
    expect(consolePanel().querySelectorAll('h3[aria-hidden="true"]')).toHaveLength(3);
  });

  it('keeps all four tools and their three chapters readable in the accordion markup', () => {
    const { container } = mount();
    const natural = container.querySelector('[class*="naturalExperience"]');
    expect(within(natural).getAllByRole('article')).toHaveLength(4);
    expect(within(natural).getAllByRole('heading', { name: 'Capabilities' })).toHaveLength(4);
    expect(within(natural).getAllByRole('heading', { name: 'The difference' })).toHaveLength(4);
    expect(natural.textContent).not.toMatch(/60 FPS|0\.04ms|AI-Native|React 18|RPA 2\.0/);
  });

  it('carries no eyebrows, counters, indexes or specs lines in the accordion: a product is its name, promise and chapters', () => {
    const { container } = mount();
    const natural = container.querySelector('[class*="naturalExperience"]');
    expect(natural.textContent).not.toMatch(/\d{2} \/ \d{2}/);
    // Each row's face is the product's name and its promise, nothing above them.
    const faces = [...natural.querySelectorAll('[class*="rowText"]')].map((face) => face.textContent);
    expect(faces).toEqual(TOOLS.map((entry) => `${entry.name}${entry.title}`));
    TOOLS.forEach((entry) => {
      expect(natural.textContent).not.toContain(entry.specs.join(' · '));
      // The proposition says the promise once, as on the console; the long version stays in the modal.
      expect(natural.textContent).not.toContain(entry.detail.subheadline);
    });
    // Chapter titles and list entries read without numbers.
    within(natural).getAllByRole('heading', { level: 4 }).forEach((heading) => expect(heading.textContent).not.toMatch(/^\d/));
    expect(natural.querySelectorAll('ol')).toHaveLength(0);
  });

  it('speaks Spanish', () => {
    window.localStorage.setItem('neuralbi_lang', 'es');
    mount();
    const chapters = screen.getByRole('tablist', { name: /: Explorar la arquitectura$/ });
    expect(within(chapters).getAllByRole('tab').map((tab) => tab.textContent)).toEqual(['La propuesta', 'Capacidades', 'La diferencia']);
    expect(within(consolePanel()).getByRole('heading', { level: 3 })).toHaveTextContent(translations.es.arsenal.tools.powerBi.title);
    window.localStorage.removeItem('neuralbi_lang');
  });
});

describe('The full-architecture modal (opened from the accordion)', () => {
  it.each(['power-bi', 'power-apps', 'power-automate', 'copilot-studio'])('preserves all detail content and three graphics for %s', (toolId) => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const details = translations.en.arsenal.modalDetails[toolId];
    const { unmount } = render(<LanguageProvider><ArsenalDetailModal toolId={toolId} onClose={() => {}} /></LanguageProvider>);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: details.headline })).toBeInTheDocument();
    expect(within(dialog).getAllByText(details.subheadline).length).toBeGreaterThan(0);
    expect(within(dialog).getByText(details.roiMetric)).toBeInTheDocument();
    for (const capability of details.capabilities) {
      expect(within(dialog).getByRole('heading', { name: capability.label })).toBeInTheDocument();
      expect(within(dialog).getByText(capability.desc)).toBeInTheDocument();
    }
    for (const differentiator of details.differentiators) {
      expect(within(dialog).getByRole('heading', { name: differentiator })).toBeInTheDocument();
    }
    expect(within(dialog).getAllByRole('figure')).toHaveLength(3);
    unmount();
  });

  it('closes the modal with Escape', () => {
    const onClose = vi.fn();
    render(<LanguageProvider><ArsenalDetailModal toolId="power-bi" onClose={onClose} /></LanguageProvider>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('opens at the visible chapter and restores focus after closing', () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return <LanguageProvider><button type="button" onClick={() => setOpen(true)}>Open architecture</button>
        {open && <ArsenalDetailModal toolId="power-bi" initialChapter={2} onClose={() => setOpen(false)} />}</LanguageProvider>;
    }
    render(<Harness />);
    const opener = screen.getByRole('button', { name: 'Open architecture' });
    opener.focus();
    fireEvent.click(opener);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('button', { name: 'The difference' })).toHaveClass(/modalNavActive/);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('locks the body and the document while open (it opens from the accordion) and restores both on close', () => {
    const { unmount } = render(<LanguageProvider><ArsenalDetailModal toolId="power-bi" onClose={() => {}} /></LanguageProvider>);
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.documentElement.style.overflow).not.toBe('hidden');
  });
});

describe('The Arsenal below 1024px: an accordion of the four products', () => {
  // Phones and tablets: the accordion query matches. Everything observed is in view, so a product's scenes build as
  // soon as it is opened.
  beforeEach(() => {
    vi.stubGlobal('matchMedia', (query) => ({ matches: query.includes('max-width: 1023px'), addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { this.callback = callback; }
      observe(target) { this.callback([{ isIntersecting: true, intersectionRatio: 1, target }], this); }
      unobserve() {}
      disconnect() {}
    });
  });
  const mount = () => render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
  const natural = (container) => container.querySelector('[class*="naturalExperience"]');
  const trigger = (container, index) => natural(container).querySelectorAll('button[aria-expanded]')[index];
  const panel = (container, index) => document.getElementById(trigger(container, index).getAttribute('aria-controls'));

  it('arrives as four closed rows, without the jump pills, and builds no scene until a product is opened', () => {
    const { container } = mount();
    const rows = [...natural(container).querySelectorAll('button[aria-expanded]')];
    expect(rows).toHaveLength(4);
    expect(rows.map((button) => button.getAttribute('aria-expanded'))).toEqual(['false', 'false', 'false', 'false']);
    expect(rows.map((button) => button.textContent)).toEqual([
      expect.stringContaining('Power BI'), expect.stringContaining('Power Apps'),
      expect.stringContaining('Power Automate'), expect.stringContaining('Copilot Studio'),
    ]);
    expect(within(natural(container)).queryByRole('navigation')).toBeNull();
    rows.forEach((_, index) => {
      expect(panel(container, index)).toHaveAttribute('inert');
      expect(panel(container, index)).toHaveAttribute('aria-hidden', 'true');
    });
    expect(natural(container).querySelectorAll('figure')).toHaveLength(0);
  });

  it('opens one product at a time and unfolds all of it: proposition, capabilities, difference and three scenes', () => {
    const { container } = mount();
    fireEvent.click(trigger(container, 1));
    expect(trigger(container, 1)).toHaveAttribute('aria-expanded', 'true');
    const open = within(natural(container)).getByRole('region', { name: /Power Apps/ });
    expect(open).not.toHaveAttribute('inert');
    for (const heading of ['The proposition', 'Capabilities', 'The difference']) {
      expect(within(open).getByRole('heading', { name: heading })).toBeInTheDocument();
    }
    expect(open.querySelectorAll('figure')).toHaveLength(3);

    fireEvent.click(trigger(container, 2));
    expect(trigger(container, 1)).toHaveAttribute('aria-expanded', 'false');
    expect(panel(container, 1)).toHaveAttribute('inert');
    expect(trigger(container, 2)).toHaveAttribute('aria-expanded', 'true');
    // A product once opened keeps its scenes, so folding it never jumps.
    expect(panel(container, 1).querySelectorAll('figure')).toHaveLength(3);
  });

  it('holds the tapped row under the finger while the product above folds away', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { container } = mount();
    fireEvent.click(trigger(container, 0));
    const tapped = trigger(container, 2);
    let measured = 0;
    // The suite already spies on getBoundingClientRect (a pass-through); chain onto that implementation.
    const spy = vi.spyOn(Element.prototype, 'getBoundingClientRect');
    const outer = spy.getMockImplementation();
    spy.mockImplementation(function rect() {
      if (this === tapped) { measured += 1; return { top: measured === 1 ? 600 : 140, bottom: 0, left: 0, right: 0, width: 0, height: 0 }; }
      return outer.call(this);
    });
    fireEvent.click(tapped);
    expect(scrollTo).toHaveBeenCalledWith({ top: window.scrollY - 460, behavior: 'instant' });
  });

  it('closes from the end of a product: back to its row, under the navbar, with focus on it', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { container } = mount();
    fireEvent.click(trigger(container, 0));
    fireEvent.click(within(panel(container, 0)).getByRole('button', { name: 'Close Power BI' }));
    expect(trigger(container, 0)).toHaveAttribute('aria-expanded', 'false');
    expect(trigger(container, 0)).toHaveFocus();
    const top = trigger(container, 0).getBoundingClientRect().top + window.scrollY - 88;
    expect(scrollTo).toHaveBeenLastCalledWith({ top, behavior: 'instant' });
  });

  it('speaks Spanish, closing included', () => {
    window.localStorage.setItem('neuralbi_lang', 'es');
    const { container } = mount();
    fireEvent.click(trigger(container, 3));
    expect(within(panel(container, 3)).getByRole('button', { name: 'Cerrar Copilot Studio' })).toBeInTheDocument();
    expect(within(panel(container, 3)).getByRole('heading', { name: 'Capacidades' })).toBeInTheDocument();
    window.localStorage.removeItem('neuralbi_lang');
  });
});
