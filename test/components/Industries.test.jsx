import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Industries from '../../components/sections/Industries';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

const observers = [];
let motion;
function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}
function mount() { return render(<LanguageProvider><LanguageSwitch /><Industries /></LanguageProvider>); }

beforeEach(() => {
  localStorage.removeItem('neuralbi_lang');
  observers.length = 0;
  motion = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', vi.fn(() => motion));
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); observers.push(this); }
    observe() {}
  });
});
afterEach(() => { vi.unstubAllGlobals(); localStorage.removeItem('neuralbi_lang'); });

describe('Industries architecture explorer', () => {
  it.each([0, 1, 2, 3])('exposes sector %i and its solutions with correct panel relationships', (i) => {
    const { container } = mount();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);
    const tab = tabs[i];
      fireEvent.click(tab);
      const panel = screen.getByRole('tabpanel');
      expect(tab).toHaveAttribute('aria-selected', 'true');
      expect(panel.id).toBe(tab.getAttribute('aria-controls'));
      expect(panel).toHaveAttribute('aria-labelledby', tab.id);
      const sector = translations.en.verticals.industries[i];
      expect(within(panel).getByRole('heading', { name: sector.headlineTitle })).toBeInTheDocument();
      sector.cards.forEach((card, n) => {
        const trigger = within(panel).getByRole('button', { name: card.title });
        if (trigger.getAttribute('aria-expanded') !== 'true') fireEvent.click(trigger);
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(within(panel).getByText(card.body)).toBeVisible();
        expect(within(panel).getAllByRole('region')).toHaveLength(1);
        expect(container.querySelector('[data-sector]')).toHaveAttribute('data-solution', String(n));
      });
      fireEvent.click(within(panel).getByRole('button', { name: sector.cards[3].title }));
      expect(within(panel).queryByRole('region')).toBeNull();
  });

  it('supports roving keyboard navigation, wrapping, Home and End, and resets the solution', () => {
    mount();
    const tabs = screen.getAllByRole('tab');
    fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });
    expect(tabs[3]).toHaveFocus();
    expect(tabs[3]).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(tabs[3], { key: 'ArrowRight' });
    expect(tabs[0]).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: translations.en.verticals.industries[0].cards[3].title }));
    fireEvent.keyDown(tabs[0], { key: 'End' });
    expect(tabs[3]).toHaveFocus();
    fireEvent.keyDown(tabs[3], { key: 'Home' });
    expect(tabs[0]).toHaveFocus();
    expect(screen.getByRole('button', { name: translations.en.verticals.industries[0].cards[0].title })).toHaveAttribute('aria-expanded', 'true');
    expect(tabs.filter(tab => tab.tabIndex === 0)).toHaveLength(1);
  });

  it('localizes every industry and solution without resetting the chosen industry', () => {
    mount();
    fireEvent.click(screen.getAllByRole('tab')[2]);
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    expect(screen.getAllByRole('tab')[2]).toHaveAttribute('aria-selected', 'true');
    screen.getAllByRole('tab').forEach((tab, i) => {
      fireEvent.click(tab);
      const sector = translations.es.verticals.industries[i];
      expect(screen.getByRole('heading', { name: sector.headlineTitle })).toBeInTheDocument();
      expect(screen.getByText(sector.headlineBody)).toBeVisible();
      sector.cards.forEach(card => expect(screen.getByRole('button', { name: card.title })).toBeInTheDocument());
    });
    expect(screen.getByRole('link', { name: 'Diseña tu arquitectura' })).toHaveAttribute('href', '#contact');
  });

  it('pauses on request, offscreen, in hidden tabs and under reduced motion; cleans up listeners', () => {
    const { container, unmount } = mount();
    const scene = container.querySelector('[data-sector]');
    expect(scene).toHaveAttribute('data-running', 'false');
    act(() => observers[0].callback([{ isIntersecting: true }]));
    expect(scene).toHaveAttribute('data-running', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Pause animation' }));
    expect(scene).toHaveAttribute('data-running', 'false');
    fireEvent.click(screen.getByRole('button', { name: 'Play animation' }));
    expect(scene).toHaveAttribute('data-running', 'true');
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(scene).toHaveAttribute('data-running', 'false');
    hidden.mockRestore();
    motion.matches = true;
    act(() => motion.addEventListener.mock.calls[0][1]());
    expect(scene).toHaveAttribute('data-running', 'false');
    motion.matches = false;
    act(() => observers[0].callback([{ isIntersecting: false }]));
    expect(scene).toHaveAttribute('data-running', 'false');
    unmount();
    expect(observers[0].disconnect).toHaveBeenCalled();
    expect(motion.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
