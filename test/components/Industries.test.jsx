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
    observe(target) { this.target = target; }
  });
});
// The scene's own observer (the mockup's light field observes too).
const sceneObserver = () => observers.find(observer => observer.target?.dataset?.sector);
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
        expect(within(panel).getByText(card.tag)).toBeVisible();
        expect(within(panel).getAllByRole('region')).toHaveLength(1);
        expect(container.querySelector('[data-sector]')).toHaveAttribute('data-solution', String(n));
      });
      fireEvent.click(within(panel).getByRole('button', { name: sector.cards[3].title }));
      expect(within(panel).queryByRole('region')).toBeNull();
  });

  it('keeps the title alone with its emphasis in italics, in both languages', () => {
    mount();
    const italics = () => [...screen.getByRole('heading', { level: 2 }).querySelectorAll('em')].map(em => em.textContent).join(' ');
    expect(screen.getByRole('heading', { level: 2, name: 'Applied Intelligence Across Verticals' })).toBeInTheDocument();
    expect(italics()).toBe('Across Verticals');
    expect(screen.queryByText(/Tailored enterprise architectures/)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    expect(italics()).toBe('por Sectores');
    expect(screen.queryByText(/Arquitecturas empresariales a medida/)).toBeNull();
  });

  it('shows every solution of every sector as a NeuralBI product mockup, without a legend underneath', () => {
    const { container } = mount();
    screen.getAllByRole('tab').forEach((tab, sector) => {
      fireEvent.click(tab);
      const cards = translations.en.verticals.industries[sector].cards;
      cards.forEach(card => {
        const trigger = screen.getByRole('button', { name: card.title });
        if (trigger.getAttribute('aria-expanded') !== 'true') fireEvent.click(trigger);
        expect(container.querySelector('[data-mockup]')).not.toBeNull();
      });
      // With every card collapsed, the sector still shows its first product.
      fireEvent.click(screen.getByRole('button', { name: cards[3].title }));
      expect(container.querySelector('[data-mockup]')).not.toBeNull();
    });
    expect(within(screen.getByRole('figure')).queryByText(/Suppliers|Transactions|Intelligence|AI agents/)).toBeNull();
  });

  it.each([
    [0, ['Supply Control Tower', 'Receiving', 'Customs document ingestion', 'Logistics Copilot']],
    [1, ['Liquidity Monitor', 'Credit Desk', 'AML & KYC screening', 'Fraud Copilot']],
    [2, ['Line 2 · PET preforms', 'NeuralBI Inspect', 'Autonomous maintenance · IMM-02', 'Floor Assistant']],
    [3, ['Omnichannel Sales', 'Intake', 'Automated restocking · Chapinero', 'Merchandising Copilot']],
  ])('shows sector %i as one NeuralBI Power Platform product per card', (sector, products) => {
    const { container } = mount();
    fireEvent.click(screen.getAllByRole('tab')[sector]);
    translations.en.verticals.industries[sector].cards.forEach((card, n) => {
      const trigger = screen.getByRole('button', { name: card.title });
      if (trigger.getAttribute('aria-expanded') !== 'true') fireEvent.click(trigger);
      expect(within(container.querySelector('[data-mockup]')).getAllByText(products[n]).length).toBeGreaterThan(0);
    });
  });

  it('shows supply chain analytics as a NeuralBI product mockup, localised and resting on its resolved readings', () => {
    const { container } = mount();
    const mockup = container.querySelector('[data-mockup]');
    expect(mockup.querySelector('img[src*="Neuralbi"]')).not.toBeNull();
    ['COL', 'MEX', 'USA'].forEach(code => expect(within(mockup).getAllByText(code).length).toBeGreaterThan(0));
    expect(within(mockup).getByText('Supply Control Tower')).toBeInTheDocument();
    expect(within(mockup).getByText('Stockout risk')).toBeInTheDocument();
    expect(mockup.querySelector('[data-value="3.1%"]')).not.toBeNull();
    expect(mockup.querySelectorAll('[data-value="3.8 d"]').length).toBeGreaterThan(0);
    expect(within(mockup).getByText('Mitigated')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    expect(within(container.querySelector('[data-mockup]')).getByText('Riesgo de quiebre')).toBeInTheDocument();
    expect(within(container.querySelector('[data-mockup]')).getByText('Mitigado')).toBeInTheDocument();
  });

  it('keeps one light field while moving between mockup cards, and only the product re-enters', () => {
    const { container } = mount();
    const light = container.querySelector('[data-mockup] [data-webgl]');
    const cards = translations.en.verticals.industries[0].cards;
    fireEvent.click(screen.getByRole('button', { name: cards[1].title }));
    expect(container.querySelector('[data-mockup]')).toHaveAttribute('data-frame', 'devices');
    expect(container.querySelector('[data-mockup] [data-webgl]')).toBe(light);
    expect(within(container.querySelector('[data-mockup]')).getByText('Dispatched · ETA 3.8 d')).toHaveAttribute('data-done', 'true');
  });

  it('shows the visual without a title bar or pause control, and gives every sector its own visual', () => {
    const { container } = mount();
    const visual = () => container.querySelector('[data-mockup]');
    expect(visual()).toHaveAttribute('data-live', 'false');
    act(() => sceneObserver().callback([{ isIntersecting: true }]));
    expect(visual()).toHaveAttribute('data-live', 'true');
    expect(screen.queryByText('Illustrative architecture')).toBeNull();
    expect(screen.queryByRole('button', { name: /animation/i })).toBeNull();
    screen.getAllByRole('tab').forEach((tab, i) => {
      fireEvent.click(tab);
      expect(container.querySelector('[data-sector]')).toHaveAttribute('data-sector', translations.en.verticals.industries[i].id);
      expect(visual()).not.toBeNull();
    });
    expect(screen.queryByText('Unified data')).toBeNull();
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

  it('pauses offscreen, in hidden tabs and under reduced motion; cleans up listeners', () => {
    const { container, unmount } = mount();
    const scene = container.querySelector('[data-sector]');
    expect(scene).toHaveAttribute('data-running', 'false');
    act(() => sceneObserver().callback([{ isIntersecting: true }]));
    expect(scene).toHaveAttribute('data-running', 'true');
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(scene).toHaveAttribute('data-running', 'false');
    hidden.mockRestore();
    motion.matches = true;
    act(() => motion.addEventListener.mock.calls[0][1]());
    expect(scene).toHaveAttribute('data-running', 'false');
    motion.matches = false;
    act(() => sceneObserver().callback([{ isIntersecting: false }]));
    expect(scene).toHaveAttribute('data-running', 'false');
    const observer = sceneObserver();
    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
    expect(motion.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('draws the selected look as a lit copy of the tabs, clipped to the selected cell', () => {
    const { container } = mount();
    const lit = container.querySelector('[class*="tabsLit"]');
    expect(lit).toHaveAttribute('aria-hidden', 'true');
    // Decorative: nothing in it can be focused or clicked, and the real tabs stay the only tabs.
    expect(lit.querySelectorAll('button, [tabindex]')).toHaveLength(0);
    expect(screen.getAllByRole('tab')).toHaveLength(4);
    expect([...lit.children].map(cell => cell.textContent)).toEqual(['Supply chain', 'Financial services', 'Manufacturing', 'Retail & commerce']);

    const wrap = lit.parentElement;
    const clip = () => ['--i', '--col', '--row'].map(name => wrap.style.getPropertyValue(name));
    expect(clip()).toEqual(['0', '0', '0']);
    fireEvent.click(screen.getAllByRole('tab')[3]);
    // One column of four on wide screens; the bottom-right cell of the 2 × 2 grid on narrow ones.
    expect(clip()).toEqual(['3', '1', '1']);
    fireEvent.click(screen.getAllByRole('tab')[2]);
    expect(clip()).toEqual(['2', '0', '1']);
  });
});
