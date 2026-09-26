import React, { useState } from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { MotionGlobalConfig, motionValue } from 'framer-motion';
import { LanguageProvider } from '../../context/LanguageContext';
import ArsenalExperience, { ArsenalDetailModal } from '../../components/sections/ArsenalExperience';
import { translations } from '../../lib/translations';

const scroll = vi.hoisted(() => ({ value: null }));
// The story is read while pinned: its arrival has finished and its departure has not begun.
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal();
  const scrollFor = ({ offset } = {}) => {
    if (offset?.[0] === 'start end') return actual.motionValue(1);
    if (offset?.[0] === 'end end') return actual.motionValue(0);
    return scroll.value;
  };
  return { ...actual, useScroll: (options) => ({ scrollYProgress: scrollFor(options) }) };
});

let scrollMoment = 0;
// Animations resolve instantly: these tests assert state, and happy-dom rejects interrupted WAAPI animations.
beforeAll(() => { MotionGlobalConfig.skipAnimations = true; });
afterAll(() => { MotionGlobalConfig.skipAnimations = false; });
beforeEach(() => {
  scroll.value = motionValue(0);
  scrollMoment = 0;
  vi.stubGlobal('matchMedia', (query) => ({ matches: query.includes('min-width: 1024px'), addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
  const original = Element.prototype.getBoundingClientRect;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function rect() {
    if (this.dataset.moment !== undefined) return { top: (Number(this.dataset.moment) - scrollMoment) * 300, bottom: 0, left: 0, right: 0, width: 1, height: 1 };
    return original.call(this);
  });
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

function advanceTo(index) {
  scrollMoment = index;
  act(() => scroll.value.set((index + 1) / 40));
}
// Scroll-linked styles are written on the next animation frame.
const nextFrame = () => act(() => new Promise((resolve) => { requestAnimationFrame(() => resolve()); }));

describe('The Arsenal experience', () => {
  it('jumps to tools and chapters while scroll remains the source of the active state', async () => {
    const onOpenModal = vi.fn();
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={onOpenModal} /></LanguageProvider>);
    const toolNav = screen.getByRole('navigation', { name: 'Arsenal' });
    const marker = (index) => container.querySelector(`[data-moment="${index}"]`);
    // One scroll moment per chapter: the entries inside a chapter never add scroll.
    expect(container.querySelectorAll('[data-moment]')).toHaveLength(12);
    expect(marker(0)).toHaveStyle({ height: '60svh' });
    expect(marker(1)).toHaveStyle({ height: '60svh' });
    // The moments around each tool boundary carry the extra scroll the curtain needs.
    expect(marker(2)).toHaveStyle({ height: '94svh' });
    expect(marker(3)).toHaveStyle({ height: '94svh' });
    expect(marker(11)).toHaveStyle({ height: '60svh' });

    // Crossing tools closes a single curtain, then lands just past the incoming tool's curtain window.
    const apps = within(toolNav).getByRole('button', { name: 'Power Apps' });
    fireEvent.click(apps);
    const curtain = container.querySelector('[data-tool]');
    expect(curtain).toHaveAttribute('data-tool', 'power-apps');
    expect(curtain).toHaveAttribute('data-visible', 'true');
    expect(marker(3).scrollIntoView).not.toHaveBeenCalled();
    const landing = 3 * 300 - Math.min(120, window.innerHeight * 0.2) + window.innerHeight * 34 / 100 + 2;
    await vi.waitFor(() => expect(scrollTo).toHaveBeenCalledWith({ top: landing, behavior: 'instant' }), { timeout: 3000 });
    expect(apps).not.toHaveAttribute('aria-current');
    advanceTo(3);
    expect(apps).toHaveAttribute('aria-current', 'step');

    const chapterNav = screen.getByRole('navigation', { name: 'Power Apps: Explore the architecture' });
    fireEvent.click(within(chapterNav).getByRole('button', { name: 'Capabilities' }));
    // Through the shared smooth-scroll helper (natively here, as Lenis runs only for a fine pointer): to the chapter's top.
    expect(scrollTo).toHaveBeenLastCalledWith({ top: marker(4).getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
    advanceTo(4);
    expect(within(chapterNav).getByRole('button', { name: 'Capabilities' })).toHaveAttribute('aria-current', 'step');
    const pinned = container.querySelector('[class*="stickyScreen"]');
    expect(within(pinned).getByText('React & PCF Controls')).toBeInTheDocument();
    // Picking an entry opens it in place; it never moves the page.
    const scrolls = scrollTo.mock.calls.length;
    fireEvent.click(within(pinned).getByRole('button', { name: /Dataverse & API Engine/i }));
    expect(within(pinned).getByRole('button', { name: /Dataverse & API Engine/i })).toHaveAttribute('aria-expanded', 'true');
    expect(within(pinned).getByText(/Relational Dataverse schemas/)).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledTimes(scrolls);
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
    fireEvent.click(within(pinned).getByRole('button', { name: 'Explore full architecture' }));
    expect(onOpenModal).toHaveBeenCalledWith('power-apps', 1);
  });

  it('scrolls chapter by chapter while the entries inside a chapter are picked by hand', async () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const pinned = container.querySelector('[class*="stickyScreen"]');
    const chapterNav = screen.getByRole('navigation', { name: 'Power BI: Explore the architecture' });
    advanceTo(1);
    expect(within(chapterNav).getByRole('button', { name: 'Capabilities' })).toHaveAttribute('aria-current', 'step');
    expect(within(pinned).getByText('AI narrative')).toBeInTheDocument();
    // The first capability opens on arrival; the rest wait for a click.
    expect(within(pinned).getByRole('button', { name: /AI Narrative Engine/i })).toHaveAttribute('aria-expanded', 'true');
    expect(within(pinned).getByRole('button', { name: /Persona-Based UX/i })).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(within(pinned).getByRole('button', { name: /Persona-Based UX/i }));
    expect(within(pinned).getByRole('button', { name: /Persona-Based UX/i })).toHaveAttribute('aria-current', 'true');
    expect(within(pinned).getByRole('button', { name: /AI Narrative Engine/i })).toHaveAttribute('aria-expanded', 'false');
    // The active description is read once, in the narrative column, not echoed under the stage.
    expect(within(pinned).getAllByText('Role-adaptive executive views tailored for CEO, CFO, and Ops leads')).toHaveLength(1);
    expect(within(pinned).getByText('AI narrative')).toBeInTheDocument();

    // The very next scroll moment is the next chapter, not the next entry.
    advanceTo(2);
    expect(within(chapterNav).getByRole('button', { name: 'The difference' })).toHaveAttribute('aria-current', 'step');
    expect(within(pinned).getByText('Semantic architecture')).toBeInTheDocument();
    expect(within(pinned).getByRole('button', { name: /Semantic decision-support models/i })).toHaveAttribute('aria-current', 'true');
    // The outgoing chapter leaves the page once its exit has played.
    await waitFor(() => expect(within(pinned).queryByRole('button', { name: /AI Narrative Engine/i })).not.toBeInTheDocument());

    // Scrolling back up returns to the chapter with its selection reset.
    advanceTo(1);
    expect(within(pinned).getByRole('button', { name: /AI Narrative Engine/i })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.queryByRole('button', { name: /Pause tour|Resume tour/i })).not.toBeInTheDocument();
  });

  it('answers every scroll between chapters: the progress bar and the cue fill continuously', async () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const scale = (element) => Number(/scale[XY]\(([\d.]+)\)/.exec(element.style.transform)?.[1] ?? 0);
    const [powerBi, powerApps] = container.querySelectorAll('[class*="progressSegment"] i');
    const cue = container.querySelector('[class*="cueFill"]');
    // 60% of the way from the Capabilities marker to the next one.
    advanceTo(1.2);
    await nextFrame();
    expect(scale(cue)).toBeCloseTo(0.6, 2);
    expect(scale(powerBi)).toBeCloseTo(1.6 / 3, 2);
    expect(scale(powerApps)).toBe(0);
    advanceTo(1.5);
    await nextFrame();
    expect(scale(cue)).toBeCloseTo(0.9, 2);
    // Landing on the next chapter empties the cue for the next stretch.
    advanceTo(2);
    await nextFrame();
    expect(scale(cue)).toBeCloseTo(0.4, 2);
    expect(scale(powerBi)).toBeCloseTo(2.4 / 3, 2);
  });

  it('slides a single indicator to the entry that was picked', () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const pinned = container.querySelector('[class*="stickyScreen"]');
    advanceTo(1);
    const entry = (name) => within(pinned).getByRole('button', { name });
    expect(pinned.querySelectorAll('[class*="entryIndicator"]')).toHaveLength(1);
    expect(entry(/AI Narrative Engine/i).querySelector('[class*="entryIndicator"]')).not.toBeNull();
    fireEvent.click(entry(/Direct Lake Speed/i));
    expect(pinned.querySelectorAll('[class*="entryIndicator"]')).toHaveLength(1);
    expect(entry(/Direct Lake Speed/i).querySelector('[class*="entryIndicator"]')).not.toBeNull();
  });

  it('reveals the section title without changing its accessible name', () => {
    render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    expect(screen.getByRole('heading', { level: 2, name: 'The Arsenal' })).toBeInTheDocument();
  });

  it('covers the stage with the incoming tool while scrolling across a boundary and clears it on either side', () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const curtain = container.querySelector('[data-tool]');
    const pinned = container.querySelector('[class*="stickyScreen"]');
    expect(curtain).toHaveAttribute('aria-hidden', 'true');
    expect(curtain).toHaveAttribute('data-visible', 'false');
    expect(pinned).toHaveAttribute('data-curtain', 'false');
    advanceTo(2.8);
    expect(curtain).toHaveAttribute('data-tool', 'power-apps');
    expect(curtain).toHaveAttribute('data-visible', 'true');
    // The tool rail steps aside (and stops taking clicks) while the curtain owns the stage.
    expect(pinned).toHaveAttribute('data-curtain', 'true');
    expect(within(curtain).getByText('02 / 04')).toBeInTheDocument();
    expect(within(curtain).getByText('Power Apps')).toBeInTheDocument();
    advanceTo(4);
    expect(curtain).toHaveAttribute('data-visible', 'false');
    advanceTo(5.8);
    expect(curtain).toHaveAttribute('data-tool', 'power-automate');
    expect(within(curtain).getByText('03 / 04')).toBeInTheDocument();
    advanceTo(1);
    expect(curtain).toHaveAttribute('data-visible', 'false');
  });

  it('keeps the scroll cue on screen for every moment of the story', () => {
    render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    for (const moment of [0, 1, 4, 11]) {
      advanceTo(moment);
      expect(screen.getByText('Scroll to continue')).toBeVisible();
    }
  });

  it('announces the active tool to assistive technology', () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toHaveTextContent('Power BI');
    advanceTo(3);
    expect(live).toHaveTextContent('Power Apps');
  });

  it('keeps all four tools and their three chapters readable in the natural-flow fallback', () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const natural = container.querySelector('[class*="naturalExperience"]');
    expect(within(natural).getAllByRole('article')).toHaveLength(4);
    expect(within(natural).getAllByRole('heading', { name: 'Capabilities' })).toHaveLength(4);
    expect(within(natural).getAllByRole('heading', { name: 'The difference' })).toHaveLength(4);
    expect(natural.textContent).not.toMatch(/60 FPS|0\.04ms|AI-Native|React 18|RPA 2\.0/);
  });

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

  it('locks document scrolling while the modal is open without un-pinning the story behind it', () => {
    const { unmount } = render(<LanguageProvider><ArsenalDetailModal toolId="power-bi" onClose={() => {}} /></LanguageProvider>);
    expect(document.documentElement.style.overflow).toBe('hidden');
    // A locked <body> becomes a scroll container and releases the pinned story, so the pinned layout leaves it alone.
    expect(document.body.style.overflow).not.toBe('hidden');
    unmount();
    expect(document.documentElement.style.overflow).not.toBe('hidden');
  });

  it('also locks the body on touch layouts and restores both on close', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    const { unmount } = render(<LanguageProvider><ArsenalDetailModal toolId="power-bi" onClose={() => {}} /></LanguageProvider>);
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.documentElement.style.overflow).not.toBe('hidden');
  });
});
