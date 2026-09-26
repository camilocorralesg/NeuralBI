import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { MotionGlobalConfig, motionValue } from 'framer-motion';
import { LanguageProvider } from '../../context/LanguageContext';
import NeuralProtocol from '../../components/sections/NeuralProtocol';
import { translations } from '../../lib/translations';

const motion = vi.hoisted(() => ({ progress: null, reduced: false }));
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useScroll: () => ({ scrollYProgress: motion.progress }), useReducedMotion: () => motion.reduced };
});

beforeAll(() => { MotionGlobalConfig.skipAnimations = true; });
afterAll(() => { MotionGlobalConfig.skipAnimations = false; });
beforeEach(() => {
  motion.progress = motionValue(0);
  motion.reduced = false;
  localStorage.clear();
});
afterEach(() => { vi.restoreAllMocks(); });

const renderProtocol = () => render(<LanguageProvider><NeuralProtocol /></LanguageProvider>);
const phaseList = (container) => container.querySelector('ol[class*="phases"]');
const litStates = (container) => [...phaseList(container).children].map((item) => item.dataset.lit);
const scrollTo = (value) => act(() => { motion.progress.set(value); });

describe('The Neural Protocol', () => {
  it('presents the protocol as an ordered sequence with every phase, its copy and its scene', () => {
    const { container } = renderProtocol();
    const copy = translations.en.methodology;
    const heading = screen.getByRole('heading', { level: 2, name: 'The Neural Protocol.' });
    expect(heading.querySelector('em')).toHaveTextContent('Protocol.');
    expect(screen.getByText(copy.sectionSubtitle)).toBeInTheDocument();

    const items = within(phaseList(container)).getAllByRole('listitem');
    expect(items).toHaveLength(3);
    copy.phases.forEach((phase, index) => {
      expect(within(items[index]).getByRole('heading', { level: 3, name: phase.title })).toBeInTheDocument();
      expect(within(items[index]).getByText(phase.desc)).toBeInTheDocument();
      expect(within(items[index]).getByText(phase.num)).toBeInTheDocument();
      expect(within(items[index]).getByRole('figure', { name: phase.sceneLabel })).toHaveAccessibleDescription(phase.sceneDescription);
    });
    expect(document.body.textContent).not.toContain('*');
  });

  it('lights each phase as the scroll signal reaches it and dims them again on the way back', async () => {
    const { container } = renderProtocol();
    expect(litStates(container)).toEqual(['false', 'false', 'false']);
    scrollTo(0.1);
    await vi.waitFor(() => expect(litStates(container)).toEqual(['true', 'false', 'false']));
    scrollTo(0.55);
    await vi.waitFor(() => expect(litStates(container)).toEqual(['true', 'true', 'false']));
    scrollTo(1);
    await vi.waitFor(() => expect(litStates(container)).toEqual(['true', 'true', 'true']));
    scrollTo(0.2);
    await vi.waitFor(() => expect(litStates(container)).toEqual(['true', 'false', 'false']));
  });

  it('keeps an index that marks the current phase and jumps to any phase', async () => {
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    renderProtocol();
    const index = screen.getByRole('navigation', { name: 'Protocol phases' });
    const [audit, build, deploy] = within(index).getAllByRole('button');
    expect(audit).toHaveAccessibleName('Audit & Blueprint');
    expect(index.querySelector('[aria-current]')).toBeNull();

    scrollTo(0.6);
    await vi.waitFor(() => expect(build).toHaveAttribute('aria-current', 'step'));
    expect(audit).not.toHaveAttribute('aria-current');
    expect(audit).toHaveAttribute('data-lit', 'true');
    expect(deploy).toHaveAttribute('data-lit', 'false');

    fireEvent.click(deploy);
    expect(scroll).toHaveBeenCalledWith({ top: expect.any(Number), behavior: 'smooth' });
  });

  it('shows the whole protocol lit when the visitor prefers reduced motion', () => {
    motion.reduced = true;
    const { container } = renderProtocol();
    expect(litStates(container)).toEqual(['true', 'true', 'true']);
    expect(screen.getByRole('button', { name: 'Deploy & Scale' })).toHaveAttribute('aria-current', 'step');
  });

  it('follows the selected language, including what the scenes announce', async () => {
    localStorage.setItem('neuralbi_lang', 'es');
    renderProtocol();
    const copy = translations.es.methodology;
    expect(await screen.findByRole('heading', { level: 2, name: 'El Protocolo Neural.' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: copy.indexLabel })).toBeInTheDocument();
    for (const phase of copy.phases) {
      expect(screen.getByRole('heading', { level: 3, name: phase.title })).toBeInTheDocument();
      expect(screen.getByRole('figure', { name: phase.sceneLabel })).toHaveAccessibleDescription(phase.sceneDescription);
    }
  });
});
