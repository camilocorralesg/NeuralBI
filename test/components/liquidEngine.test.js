import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  MAX_HEIGHT, MAX_WIDTH, destroyLiquidEngine, drawingSize, paletteFor, refreshLiquid, registerLiquid, resolveColor,
} from '../../components/liquidEngine';
import { LIQUID_FRAGMENT, createLiquidRenderer } from '../../components/liquidGradientRenderer';

vi.mock('../../components/liquidGradientRenderer', async importOriginal => ({
  ...(await importOriginal()),
  createLiquidRenderer: vi.fn(),
}));

const renderer = () => ({ draw: vi.fn(), destroy: vi.fn() });
const button = (overrides = {}) => {
  const context = { drawImage: vi.fn() };
  return { target: { getContext: () => context }, context2d: context, seed: 1, goal: paletteFor([1, 1, 1]), width: 300, height: 60, visible: true, still: false, ...overrides };
};
const stubReducedMotion = reduce => vi.stubGlobal('matchMedia', query => ({ matches: reduce && query.includes('reduce'), media: query }));

let frames;
beforeEach(() => {
  createLiquidRenderer.mockReset();
  stubReducedMotion(false);
  frames = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
});
afterEach(() => {
  destroyLiquidEngine();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('liquidEngine', () => {
  it('derives a four-step palette from a tone, from a deep olive to the tone itself', () => {
    const volt = [198 / 255, 1, 52 / 255];
    const palette = paletteFor(volt);
    expect(palette).toHaveLength(4);
    expect(palette[3]).toEqual(volt);
    const lightness = palette.map(([r, g, b]) => r + g + b);
    expect([...lightness].sort((a, b) => a - b)).toEqual(lightness);
    // The body is a deep olive (#101404 for Volt), dark enough that the tone never saturates the pill.
    expect(palette[0][1]).toBeCloseTo(0.08, 2);
  });

  it('draws at a capped pixel ratio and never beyond its canvas', () => {
    expect(drawingSize(300, 56, 3)).toEqual([450, 84]);
    const [w, h] = drawingSize(900, 60, 2);
    expect(w).toBeLessThanOrEqual(MAX_WIDTH);
    expect(h).toBeLessThanOrEqual(MAX_HEIGHT);
    expect(w / h).toBeCloseTo(15, 0);
  });

  it('serves every button from one WebGL context, drawing only the visible ones into their own canvas', () => {
    const gl = renderer();
    createLiquidRenderer.mockReturnValue(gl);
    const shown = button({ seed: 2 });
    const hiddenButton = button({ seed: 3, visible: false });
    registerLiquid(shown);
    registerLiquid(hiddenButton);
    expect(createLiquidRenderer).toHaveBeenCalledTimes(1);
    expect(gl.draw).toHaveBeenCalledTimes(1);
    expect(gl.draw).toHaveBeenCalledWith(expect.objectContaining({ width: 300, height: 60, seed: 2 }));
    expect(shown.context2d.drawImage).toHaveBeenCalledWith(expect.anything(), 0, MAX_HEIGHT - 60, 300, 60, 0, 0, 300, 60);
    expect(hiddenButton.context2d.drawImage).not.toHaveBeenCalled();
    // A flowing button keeps the loop going.
    expect(frames).toHaveBeenCalled();
  });

  it('rests when nothing visible flows: hidden tabs, disabled buttons, reduced motion (one still frame each)', () => {
    createLiquidRenderer.mockReturnValue(renderer());
    registerLiquid(button({ still: true }));
    expect(frames).not.toHaveBeenCalled();

    destroyLiquidEngine();
    createLiquidRenderer.mockReturnValue(renderer());
    stubReducedMotion(true);
    const still = button();
    registerLiquid(still);
    expect(still.context2d.drawImage).toHaveBeenCalledTimes(1);
    expect(frames).not.toHaveBeenCalled();

    destroyLiquidEngine();
    stubReducedMotion(false);
    createLiquidRenderer.mockReturnValue(renderer());
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    registerLiquid(button());
    expect(frames).not.toHaveBeenCalled();
  });

  it('declines without WebGL, so the button keeps its CSS liquid', () => {
    createLiquidRenderer.mockReturnValue(null);
    expect(registerLiquid(button())).toBeNull();
  });

  it('rebuilds its context when the browser takes it back', () => {
    let glCanvas;
    createLiquidRenderer.mockImplementation(canvas => { glCanvas = canvas; return renderer(); });
    registerLiquid(button());
    expect(createLiquidRenderer).toHaveBeenCalledTimes(1);
    const lost = new Event('webglcontextlost', { cancelable: true });
    glCanvas.dispatchEvent(lost);
    expect(lost.defaultPrevented).toBe(true);
    refreshLiquid();
    expect(createLiquidRenderer).toHaveBeenCalledTimes(2);
  });

  it('keeps its shader clear of words GLSL ES reserves', () => {
    const reserved = 'asm|class|union|enum|typedef|template|this|packed|goto|switch|default|inline|noinline|volatile|public|static|extern|external|interface|flat|long|short|double|half|fixed|unsigned|superp|input|output|sizeof|cast|namespace|using|sample|filter';
    expect(LIQUID_FRAGMENT).not.toMatch(new RegExp(`\\b(?:float|int|bool|vec[234]|mat[234])\\s+(?:${reserved})\\b`));
  });
  it('eases a button to a new tone over a few frames instead of jumping', () => {
    createLiquidRenderer.mockReturnValue(renderer());
    let pending;
    frames.mockImplementation(callback => { pending = callback; return 1; });
    const entry = button({ goal: paletteFor([0, 1, 0]) });
    registerLiquid(entry);
    expect(entry.palette[3]).toEqual([0, 1, 0]);

    entry.goal = paletteFor([1, 0, 0]);
    pending(1000);
    pending(1040);
    // Part of the way after one frame…
    expect(entry.palette[3][0]).toBeGreaterThan(0);
    expect(entry.palette[3][0]).toBeLessThan(1);
    // …and there within a second.
    for (let now = 1080; now <= 2100; now += 40) pending(now);
    expect(entry.palette[3]).toEqual([1, 0, 0]);
  });
});

describe('resolveColor', () => {
  afterEach(() => { vi.restoreAllMocks(); });

  it('reads an rgb() colour straight from the computed style, with no canvas readback', () => {
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext');
    const host = document.createElement('div');
    document.body.appendChild(host);
    expect(resolveColor(host, 'rgb(242, 200, 17)')).toEqual([242 / 255, 200 / 255, 17 / 255]);
    expect(getContext).not.toHaveBeenCalled();
    // Nothing is left behind in the button.
    expect(host.childNodes).toHaveLength(0);
    host.remove();
  });

  it('rasterises any other colour space once and reuses it (a button re-tints each time it comes into view)', () => {
    const getImageData = vi.fn(() => ({ data: [10, 20, 30, 255] }));
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ fillRect: vi.fn(), getImageData });
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({ color: 'oklch(0.61 0.21 125.7)' });
    const host = document.createElement('div');
    expect(resolveColor(host, 'var(--tone)')).toEqual([10 / 255, 20 / 255, 30 / 255]);
    expect(resolveColor(host, 'var(--tone)')).toEqual([10 / 255, 20 / 255, 30 / 255]);
    expect(getImageData).toHaveBeenCalledTimes(1);
  });

  it('falls back to Volt without an element', () => {
    expect(resolveColor(null, 'red')).toEqual([198 / 255, 1, 52 / 255]);
  });
});
