import React from 'react';
import fs from 'fs';
import path from 'path';
import { act, render, waitFor, within } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { MotionGlobalConfig } from 'framer-motion';
import { LanguageProvider } from '../../context/LanguageContext';
import ArsenalExperience from '../../components/sections/ArsenalExperience';
import NeuralProtocol from '../../components/sections/NeuralProtocol';
import { translations } from '../../lib/translations';

// The Arsenal and Protocol scenes load on approach. This file runs in its own module registry, so nothing is
// preloaded: what the reader gets before and after the section comes within a screen.
const read = (file) => fs.readFileSync(path.resolve(__dirname, '../..', file), 'utf8');
const observers = [];
// The first import of a scene is transformed on the spot; under a full parallel run that can take seconds.
const LOADING = { timeout: 20000 };

beforeAll(() => { MotionGlobalConfig.skipAnimations = true; });
afterAll(() => { MotionGlobalConfig.skipAnimations = false; });
beforeEach(() => {
  observers.length = 0;
  vi.stubGlobal('matchMedia', (query) => ({ matches: query.includes('min-width: 1024px'), addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options = {}) { this.callback = callback; this.options = options; this.disconnect = vi.fn(); this.unobserve = vi.fn(); observers.push(this); }
    observe(target) { this.target = target; }
    takeRecords() { return []; }
  });
});
afterEach(() => vi.unstubAllGlobals());
const approach = (match) => observers.find((observer) => observer.options.rootMargin === '100% 0px' && match(observer.target));

describe('Scenes, out of the first load', () => {
  it('imports no scene statically: each scene module is a dynamic import', () => {
    const static12 = /^import .* from '\.\.\/graphics\/(PowerBi|PowerApps|PowerAutomate|CopilotStudio)Animations'/m;
    expect(read('components/sections/ArsenalExperience.jsx')).not.toMatch(static12);
    expect(read('components/sections/ArsenalConsole.jsx')).not.toMatch(static12);
    // Each set loads together, so each is one chunk.
    expect(read('components/graphics/arsenalScenes.js').match(/import\(\/\* webpackChunkName: "arsenal-scenes" \*\/ '\.\/\w+Animations'\)/g)).toHaveLength(4);
    expect(read('components/sections/NeuralProtocol.jsx')).not.toMatch(/^import .* from '\.\.\/graphics\/(AuditBlueprint|ArchitectBuild|DeployScale)Scene'/m);
    expect(read('components/graphics/protocolScenes.js').match(/import\(\/\* webpackChunkName: "protocol-scenes" \*\/ '\.\/\w+Scene'\)/g)).toHaveLength(3);
  });

  it('brings the Arsenal console its scene when the console comes within a screen', async () => {
    const { container } = render(<LanguageProvider><ArsenalExperience onOpenModal={() => {}} /></LanguageProvider>);
    const stage = () => container.querySelector('[data-scene]');
    expect(stage()).toHaveAttribute('data-scene', 'power-bi-0');
    expect(stage().querySelector('figure')).toBeNull();
    const consoleNear = approach((target) => target?.dataset?.tool);
    act(() => consoleNear.callback([{ isIntersecting: false }]));
    expect(stage().querySelector('figure')).toBeNull();
    act(() => consoleNear.callback([{ isIntersecting: true }]));
    await waitFor(() => expect(stage().querySelectorAll('figure')).toHaveLength(1), LOADING);
    expect(consoleNear.disconnect).toHaveBeenCalled();
  }, 30000);

  it('brings the Protocol its three scenes when the section comes within a screen', async () => {
    const { container } = render(<LanguageProvider><NeuralProtocol /></LanguageProvider>);
    const phases = () => within(container.querySelector('ol[class*="phases"]')).getAllByRole('listitem');
    expect(phases()).toHaveLength(3);
    const copy = translations.en.methodology;
    // Before the drawing arrives, each figure already carries its name and description for a screen reader.
    phases().forEach((phase, index) => {
      expect(within(phase).getByRole('figure', { name: copy.phases[index].sceneLabel })).toHaveAccessibleDescription(copy.phases[index].sceneDescription);
      expect(phase.querySelector('figure svg')).toBeNull();
    });
    act(() => approach((target) => target?.tagName === 'SECTION').callback([{ isIntersecting: true }]));
    await waitFor(() => phases().forEach((phase) => expect(phase.querySelector('figure svg')).not.toBeNull()), LOADING);
    phases().forEach((phase, index) => expect(within(phase).getByRole('figure', { name: copy.phases[index].sceneLabel })).toHaveAccessibleDescription(copy.phases[index].sceneDescription));
  }, 30000);
});
