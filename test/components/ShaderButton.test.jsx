import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ShaderButton from '../../components/ShaderButton';
import { refreshLiquid, registerLiquid } from '../../components/liquidEngine';

// Tones resolve to known channels: Volt, and Power BI's yellow for the product tone.
const VOLT = [198 / 255, 1, 52 / 255];
const POWER_BI = [242 / 255, 200 / 255, 17 / 255];
vi.mock('../../components/liquidEngine', async importOriginal => ({
  ...(await importOriginal()),
  registerLiquid: vi.fn(),
  refreshLiquid: vi.fn(),
  resolveColor: vi.fn((element, color) => (color === '#f2c811' ? POWER_BI : VOLT)),
}));

let observers = [];
class Observer {
  constructor(callback) { this.callback = callback; observers.push(this); }
  observe(target) { this.target = target; }
  unobserve() {}
  disconnect() { this.disconnected = true; }
}
const see = visible => act(() => observers.forEach(observer => observer.callback([{ isIntersecting: visible, target: observer.target }])));
const lastEntry = () => registerLiquid.mock.calls.at(-1)[0];

beforeEach(() => {
  observers = [];
  registerLiquid.mockReset();
  refreshLiquid.mockReset();
  vi.stubGlobal('IntersectionObserver', Observer);
});
afterEach(() => vi.unstubAllGlobals());

describe('ShaderButton', () => {
  it('is a real button named by its label; the liquid is a decorative canvas in the Volt tone', () => {
    registerLiquid.mockReturnValue(vi.fn());
    render(<ShaderButton>Book an Architecture Audit</ShaderButton>);
    const button = screen.getByRole('button', { name: 'Book an Architecture Audit' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button.querySelector('canvas').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(button.style.getPropertyValue('--tone')).toBe('var(--color-accent)');
  });

  it('renders an anchor for page anchors and external links, and a Next link for internal paths', () => {
    registerLiquid.mockReturnValue(vi.fn());
    const { rerender } = render(<ShaderButton href="#contact">Design your architecture</ShaderButton>);
    expect(screen.getByRole('link', { name: 'Design your architecture' })).toHaveAttribute('href', '#contact');
    rerender(<ShaderButton href="/">Return to Home</ShaderButton>);
    expect(screen.getByRole('link', { name: 'Return to Home' }).getAttribute('href')).toMatch(/\/$/);
  });

  it('passes its states through: submit, disabled, ready, and a product tone', () => {
    registerLiquid.mockReturnValue(vi.fn());
    const { rerender } = render(<ShaderButton type="submit" disabled>Send</ShaderButton>);
    const button = screen.getByRole('button', { name: 'Send' });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute('data-ready');
    rerender(<ShaderButton type="submit" ready tone="var(--tool-accent)">Send</ShaderButton>);
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('data-ready', 'true');
    expect(button.style.getPropertyValue('--tone')).toBe('var(--tool-accent)');
  });

  it('joins the shared engine with its canvas, flows only while on screen, and leaves on unmount', () => {
    const leave = vi.fn();
    registerLiquid.mockReturnValue(leave);
    const { unmount } = render(<ShaderButton>Send</ShaderButton>);
    const entry = lastEntry();
    expect(entry.target.tagName).toBe('CANVAS');
    expect(entry.goal).toHaveLength(4);
    expect(entry.visible).toBe(false);
    see(true);
    expect(entry.visible).toBe(true);
    expect(refreshLiquid).toHaveBeenCalled();
    see(false);
    expect(entry.visible).toBe(false);
    unmount();
    expect(leave).toHaveBeenCalledTimes(1);
  });

  it('gives every button its own seed, so no two flow alike, and rests a disabled one', () => {
    registerLiquid.mockReturnValue(vi.fn());
    render(<><ShaderButton>One</ShaderButton><ShaderButton disabled>Two</ShaderButton></>);
    const [first, second] = registerLiquid.mock.calls.map(([entry]) => entry);
    expect(first.seed).not.toBe(second.seed);
    expect(first.still).toBe(false);
    expect(second.still).toBe(true);
  });

  it('keeps its CSS liquid when the engine declines (no WebGL)', () => {
    registerLiquid.mockReturnValue(null);
    render(<ShaderButton>Send</ShaderButton>);
    const button = screen.getByRole('button', { name: 'Send' });
    expect(button).not.toHaveAttribute('data-liquid');
    expect(observers).toHaveLength(0);
  });
  it('re-tints when its tone changes (The Arsenal switching products), without leaving the engine', () => {
    const leave = vi.fn();
    registerLiquid.mockReturnValue(leave);
    const { rerender } = render(<ShaderButton tone="#c6ff34">Explore full architecture</ShaderButton>);
    const entry = lastEntry();
    expect(entry.goal[3]).toEqual(VOLT);
    refreshLiquid.mockClear();
    rerender(<ShaderButton tone="#f2c811">Explore full architecture</ShaderButton>);
    // Same registration, new goal: the liquid eases to the product's colour.
    expect(registerLiquid).toHaveBeenCalledTimes(1);
    expect(leave).not.toHaveBeenCalled();
    expect(lastEntry()).toBe(entry);
    expect(entry.goal[3]).toEqual(POWER_BI);
    expect(refreshLiquid).toHaveBeenCalled();
  });
});
