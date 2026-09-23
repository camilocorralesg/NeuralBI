import React, { useState } from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { motionValue } from 'framer-motion';
import { LanguageProvider } from '../../context/LanguageContext';
import ArsenalExperience, { ArsenalDetailModal } from '../../components/sections/ArsenalExperience';
import { translations } from '../../lib/translations';

const scroll = vi.hoisted(() => ({ value: null }));
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useScroll: () => ({ scrollYProgress: scroll.value }) };
});

let scrollMoment = 0;
beforeEach(() => {
  scroll.value = motionValue(0);
  scrollMoment = 0;
  vi.stubGlobal('matchMedia', (query) => ({ matches: query.includes('min-width: 1100px'), addEventListener: vi.fn(), removeEventListener: vi.fn() }));
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

describe('The Arsenal experience', () => {
  it('jumps to tools and chapters while scroll remains the source of the active state', async () => {
    const onOpenModal = vi.fn();
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={onOpenModal} /></LanguageProvider>);
    const toolNav = screen.getByRole('navigation', { name: 'Arsenal' });
    const marker = (index) => container.querySelector(`[data-moment="${index}"]`);
    expect(container.querySelectorAll('[data-moment]')).toHaveLength(36);
    expect(marker(0)).toHaveStyle({ height: '60svh' });
    expect(marker(1)).toHaveStyle({ height: '30svh' });
    expect(marker(5)).toHaveStyle({ height: '22svh' });
    // The moments around each tool boundary carry the extra scroll the curtain needs.
    expect(marker(8)).toHaveStyle({ height: '56svh' });
    expect(marker(9)).toHaveStyle({ height: '94svh' });

    // Crossing tools closes a single curtain, then lands just past the incoming tool's curtain window.
    const apps = within(toolNav).getByRole('button', { name: 'Power Apps' });
    fireEvent.click(apps);
    const curtain = container.querySelector('[data-tool]');
    expect(curtain).toHaveAttribute('data-tool', 'power-apps');
    expect(curtain).toHaveAttribute('data-visible', 'true');
    expect(marker(9).scrollIntoView).not.toHaveBeenCalled();
    const landing = 9 * 300 - Math.min(120, window.innerHeight * 0.2) + window.innerHeight * 34 / 100 + 2;
    await vi.waitFor(() => expect(scrollTo).toHaveBeenCalledWith({ top: landing, behavior: 'instant' }), { timeout: 3000 });
    expect(apps).not.toHaveAttribute('aria-current');
    advanceTo(9);
    expect(apps).toHaveAttribute('aria-current', 'step');

    const chapterNav = screen.getByRole('navigation', { name: 'Power Apps: Explore the architecture' });
    fireEvent.click(within(chapterNav).getByRole('button', { name: 'Capabilities' }));
    expect(marker(10).scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    advanceTo(10);
    expect(within(chapterNav).getByRole('button', { name: 'Capabilities' })).toHaveAttribute('aria-current', 'step');
    const pinned = container.querySelector('[class*="stickyScreen"]');
    expect(within(pinned).getByText('React & PCF Controls')).toBeInTheDocument();
    fireEvent.click(within(pinned).getByRole('button', { name: /Dataverse & API Engine/i }));
    expect(marker(12).scrollIntoView).toHaveBeenCalled();
    fireEvent.click(within(pinned).getByRole('button', { name: 'Explore full architecture' }));
    expect(onOpenModal).toHaveBeenCalledWith('power-apps', 1);
  });

  it('reveals successive features, reverses on upward scroll, and changes the scene only at chapter boundaries', () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const pinned = container.querySelector('[class*="stickyScreen"]');
    advanceTo(1);
    expect(within(pinned).getByRole('button', { name: /AI Narrative Engine/i })).toHaveAttribute('aria-current', 'step');
    expect(within(pinned).getByText('AI narrative')).toBeInTheDocument();
    advanceTo(3);
    expect(within(pinned).getByRole('button', { name: /Direct Lake Speed/i })).toHaveAttribute('aria-current', 'step');
    advanceTo(2);
    expect(within(pinned).getByRole('button', { name: /Persona-Based UX/i })).toHaveAttribute('aria-current', 'step');
    advanceTo(5);
    expect(within(pinned).getByText('Semantic architecture')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Pause tour|Resume tour/i })).not.toBeInTheDocument();
  });

  it('covers the stage with the incoming tool while scrolling across a boundary and clears it on either side', () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const curtain = container.querySelector('[data-tool]');
    expect(curtain).toHaveAttribute('aria-hidden', 'true');
    expect(curtain).toHaveAttribute('data-visible', 'false');
    advanceTo(8.8);
    expect(curtain).toHaveAttribute('data-tool', 'power-apps');
    expect(curtain).toHaveAttribute('data-visible', 'true');
    expect(within(curtain).getByText('02 / 04')).toBeInTheDocument();
    expect(within(curtain).getByText('Power Apps')).toBeInTheDocument();
    advanceTo(11);
    expect(curtain).toHaveAttribute('data-visible', 'false');
    advanceTo(17.8);
    expect(curtain).toHaveAttribute('data-tool', 'power-automate');
    expect(within(curtain).getByText('03 / 04')).toBeInTheDocument();
    advanceTo(4);
    expect(curtain).toHaveAttribute('data-visible', 'false');
  });

  it('announces the active tool to assistive technology', () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toHaveTextContent('Power BI');
    advanceTo(9);
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

  it('locks document scrolling while the modal is open and restores it on close', () => {
    const { unmount } = render(<LanguageProvider><ArsenalDetailModal toolId="power-bi" onClose={() => {}} /></LanguageProvider>);
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.documentElement.style.overflow).not.toBe('hidden');
  });
});
