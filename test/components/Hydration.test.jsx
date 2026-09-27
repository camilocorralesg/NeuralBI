import React from 'react';
import { act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { MotionGlobalConfig } from 'framer-motion';
import App from '../../components/App';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
}));
vi.mock('../../components/FloatingLines', () => ({
  default: () => <div data-testid="mock-floating-lines" />,
}));

// A media query list whose answer can change after the page was served, the way a visitor's setting reaches the
// client but never the server.
const media = { reduce: false, listeners: new Set() };
function stubMatchMedia() {
  vi.stubGlobal('matchMedia', (query) => ({
    media: query,
    get matches() { return media.reduce && query.includes('prefers-reduced-motion'); },
    addEventListener: (_type, listener) => media.listeners.add(listener),
    removeEventListener: (_type, listener) => media.listeners.delete(listener),
    addListener: (listener) => media.listeners.add(listener),
    removeListener: (listener) => media.listeners.delete(listener),
  }));
}
function setReducedMotion(reduce) {
  media.reduce = reduce;
  media.listeners.forEach((listener) => listener({ matches: reduce }));
}

// Animations resolve instantly: this asserts markup, and happy-dom rejects interrupted WAAPI animations.
beforeAll(() => { MotionGlobalConfig.skipAnimations = true; });
afterAll(() => { MotionGlobalConfig.skipAnimations = false; });
// framer-motion subscribes to the query once per module, so its listener is kept across tests.
afterEach(() => {
  vi.unstubAllGlobals();
  media.reduce = false;
});

describe('Hydration of the home page', () => {
  it.each([
    ['without a motion preference', false],
    ['for a visitor who asks for reduced motion', true],
  ])('matches the server HTML %s', async (_label, reduce) => {
    stubMatchMedia();
    // The server cannot know the setting: it renders the default.
    const html = renderToString(<App />);
    setReducedMotion(reduce);

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
    const errors = [];
    // React reports a structural mismatch as a recoverable error (it then re-renders the tree on the client) and a
    // mismatched attribute through console.error (it then leaves the server's value in place).
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    let root;
    await act(async () => {
      root = hydrateRoot(container, <App />, { onRecoverableError: (error) => errors.push(error.message) });
    });
    const warnings = consoleError.mock.calls.map((call) => String(call[0])).filter((message) => /hydrat/i.test(message));
    consoleError.mockRestore();
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
    expect(container.querySelector('#manifesto')).not.toBeNull();
    act(() => root.unmount());
    container.remove();
  });
});
