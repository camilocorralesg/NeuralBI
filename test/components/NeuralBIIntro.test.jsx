import React, { StrictMode } from 'react';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import NeuralBIIntro from '../../components/intro/NeuralBIIntro';
import {
  INTRO_BOOTSTRAP, SESSION_KEY, SIGNAL_ARRIVALS, signalPosition, NODES,
} from '../../components/intro/choreography';
import { WORDMARK, SYMBOL, REGISTRATION } from '../../components/intro/logoGeometry';

const mocks = vi.hoisted(() => ({ animate: vi.fn(), pathname: '/' }));
vi.mock('framer-motion', () => ({ animate: mocks.animate }));
vi.mock('next/navigation', () => ({ usePathname: () => mocks.pathname }));

let preference;
let timeline;
let stop;
const overlay = () => document.querySelector('[data-neuralbi-intro-overlay]');

beforeEach(() => {
  vi.useFakeTimers();
  mocks.pathname = '/';
  sessionStorage.clear();
  delete document.documentElement.dataset.neuralbiIntroStart;
  document.documentElement.dataset.neuralbiIntro = 'pending';
  preference = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  vi.spyOn(window, 'matchMedia').mockReturnValue(preference);
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  stop = vi.fn();
  mocks.animate.mockReset().mockImplementation((_from, _to, options) => {
    timeline = options;
    return { stop };
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
  delete document.documentElement.dataset.neuralbiIntro;
  delete document.documentElement.dataset.neuralbiIntroStart;
});

describe('NeuralBI intro lifecycle', () => {
  it('finishes in 1.75 seconds and records the session only after completion', () => {
    render(<NeuralBIIntro />);
    expect(timeline.duration).toBe(1.75);
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
    expect(overlay()?.getAttribute('aria-hidden')).toBe('true');
    act(() => timeline.onUpdate(1.4));
    expect(document.querySelector('[data-intro-aperture]')?.getAttribute('opacity')).toBe('1');
    act(() => timeline.onComplete());
    expect(sessionStorage.getItem(SESSION_KEY)).toBe('true');
    expect(overlay()).toBeNull();
    expect(document.documentElement.dataset.neuralbiIntro).toBe('done');
  });

  it('uses an 180ms static logo fade for reduced motion', () => {
    preference.matches = true;
    render(<NeuralBIIntro />);
    expect(timeline.duration).toBe(0.18);
    expect(document.querySelector('[data-intro-complete]')?.getAttribute('opacity')).toBe('1');
    expect(document.querySelector('[data-intro-aperture]')?.getAttribute('opacity')).toBe('0');
    act(() => timeline.onComplete());
    expect(overlay()).toBeNull();
  });

  it('switches to the short fade immediately when the preference changes', () => {
    render(<NeuralBIIntro />);
    preference.matches = true;
    act(() => preference.addEventListener.mock.calls[0][1]());
    expect(stop).toHaveBeenCalled();
    expect(timeline.duration).toBe(0.18);
  });

  it.each(['Tab', 'Escape', 'Enter', ' '])('dismisses on %s without suppressing the key', (key) => {
    render(<NeuralBIIntro />);
    expect(fireEvent.keyDown(window, { key })).toBe(true);
    expect(overlay()).toBeNull();
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  });

  it('dismisses when the tab is hidden and never resumes stale motion', () => {
    render(<NeuralBIIntro />);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    fireEvent(document, new Event('visibilitychange'));
    expect(overlay()).toBeNull();
    expect(stop).toHaveBeenCalled();
  });

  it('dismisses on navigation and cannot replay when returning home', () => {
    const { rerender } = render(<NeuralBIIntro />);
    mocks.pathname = '/privacy';
    rerender(<NeuralBIIntro />);
    mocks.pathname = '/';
    rerender(<NeuralBIIntro />);
    expect(overlay()).toBeNull();
    expect(mocks.animate).toHaveBeenCalledOnce();
  });

  it('skips when the pre-paint gate is not armed, including later sessions and late hydration', () => {
    delete document.documentElement.dataset.neuralbiIntro;
    render(<NeuralBIIntro />);
    expect(overlay()).toBeNull();
    expect(mocks.animate).not.toHaveBeenCalled();
  });

  it('survives Strict Mode replay', () => {
    render(
      <StrictMode>
        <NeuralBIIntro />
      </StrictMode>
    );
    expect(overlay()).not.toBeNull();
    act(() => timeline.onComplete());
    expect(sessionStorage.getItem(SESSION_KEY)).toBe('true');
  });

  it('skips a late hydration instead of making the visitor wait for another intro', () => {
    document.documentElement.dataset.neuralbiIntroStart = String(Date.now() - 2500);
    render(<NeuralBIIntro />);
    expect(overlay()).toBeNull();
    expect(mocks.animate).not.toHaveBeenCalled();
    expect(document.documentElement.dataset.neuralbiIntro).toBe('done');
  });

  it('fails open and releases its listeners if the watchdog fires during playback', () => {
    render(<NeuralBIIntro />);
    fireEvent(document, new Event('neuralbi:intro-timeout'));
    expect(overlay()).toBeNull();
    expect(preference.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  });

  it('removes the overlay even when persisting the session fails', () => {
    render(<NeuralBIIntro />);
    const spy = vi.spyOn(sessionStorage, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    act(() => timeline.onComplete());
    expect(overlay()).toBeNull();
    spy.mockRestore();
  });
});

describe('pre-paint fail-open guard', () => {
  function bootstrap(testPath = '/', hash = '', navigationType = 'navigate') {
    delete document.documentElement.dataset.neuralbiIntro;
    const run = new Function('location', 'performance', INTRO_BOOTSTRAP);
    run({ pathname: testPath, hash }, { getEntriesByType: () => [{ type: navigationType }] });
  }

  it('arms unseen homepage (root /) and fails open without hydration', () => {
    bootstrap('/');
    expect(document.documentElement.dataset.neuralbiIntro).toBe('pending');
    vi.advanceTimersByTime(3500);
    expect(document.documentElement.dataset.neuralbiIntro).toBe('done');
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  });

  it('arms unseen basePath (/NeuralBI) properly', () => {
    bootstrap('/NeuralBI');
    expect(document.documentElement.dataset.neuralbiIntro).toBe('pending');
  });

  it('does not arm a seen session', () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    bootstrap('/');
    expect(document.documentElement.dataset.neuralbiIntro).toBeUndefined();
  });

  it.each([
    ['/privacy', '', 'navigate'],
    ['/', '#contact', 'navigate'],
    ['/', '', 'back_forward'],
  ])('does not obscure direct destinations or history restoration: %s %s %s', (testPath, hash, navigation) => {
    bootstrap(testPath, hash, navigation);
    expect(document.documentElement.dataset.neuralbiIntro).toBeUndefined();
  });

  it('fails open if storage is blocked', () => {
    const spy = vi.spyOn(sessionStorage, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    bootstrap('/');
    expect(document.documentElement.dataset.neuralbiIntro).toBeUndefined();
    spy.mockRestore();
  });
});

describe('official logo fidelity', () => {
  it('preserves every original path and color, including the wordmark and registration mark', () => {
    const filePath = path.resolve(__dirname, '../../public/assets/Neuralbi logo.svg');
    const source = readFileSync(filePath, 'utf8');
    const paths = [...source.matchAll(/<path class="(cls-[12])" d="([^"]+)"/g)].map(([, cls, d]) => ({
      d,
      fill: cls === 'cls-1' ? '#ffffff' : '#c6ff34',
    }));
    expect([REGISTRATION, ...SYMBOL, ...WORDMARK]).toEqual(paths);
  });

  it('synchronizes the signal and node activations along the actual connected branch', () => {
    SIGNAL_ARRIVALS.forEach((time, index) => {
      const [x, y] = signalPosition(time);
      expect(x).toBeCloseTo(NODES[index][0], 1);
      expect(y).toBeCloseTo(NODES[index][1], 1);
    });
  });
});
