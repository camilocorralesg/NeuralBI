// One WebGL context for every Shader Button on the page. The engine draws each visible button's liquid into a corner of
// its own offscreen GL canvas and copies it straight into that button's 2D canvas, 30 times a second. Browsers cap live
// WebGL contexts (about sixteen), so one per button would not scale; this way the page costs one context and a few small
// draws per frame. It rests when no button is visible or the tab is hidden, draws still frames under reduced motion,
// and rebuilds itself if the browser takes the context back.
import { createLiquidRenderer } from './liquidGradientRenderer';

// The GL canvas: large enough for the widest button at the capped pixel ratio.
export const MAX_WIDTH = 720;
export const MAX_HEIGHT = 200;
export const MAX_DPR = 1.5;
const FRAME_INTERVAL = 1000 / 30;
// The liquid's pace, in shader time per second.
const SPEED = 0.62;
// How fast a button's palette follows a new tone (share of the way per second): about half a second to settle.
const TONE_RATE = 7;

let glCanvas = null;
let renderer = null;
let unsupported = false;
let frame = 0;
let last = 0;
let clock = 3;
let listening = false;
const entries = new Set();

const reducedMotion = () => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
const hidden = () => typeof document !== 'undefined' && document.hidden;

/**
 * The four steps of a button's liquid, from its tone (sRGB 0–1): a deep olive, a dark, a mid, the tone itself. For Volt
 * this is #101404 → #32400d → #77991f → #c6ff34, the original's lime ramp in NeuralBI's own green, a step darker than
 * the reference so the tone never saturates the pill.
 */
export function paletteFor([r, g, b]) {
  const towardBlack = amount => [r * (1 - amount), g * (1 - amount), b * (1 - amount)];
  return [towardBlack(0.92), towardBlack(0.75), towardBlack(0.4), [r, g, b]];
}

// Computed colours already turned into channels. A button re-tints each time it comes into view (the capsule's CTA on
// every hover), and reading a pixel back from a canvas stalls the GPU, so each distinct colour is read at most once.
const channelsByColor = new Map();
const RGB = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/;

/** Resolves any CSS colour (custom properties included, as `element` sees them) to sRGB channels in 0–1. */
export function resolveColor(element, color) {
  const fallback = [198 / 255, 1, 52 / 255];
  if (!element || typeof document === 'undefined') return fallback;
  const probe = document.createElement('span');
  probe.style.color = color;
  element.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  if (!resolved) return fallback;
  if (channelsByColor.has(resolved)) return channelsByColor.get(resolved);
  // Most colours compute to rgb(); anything else (oklch, color(), color-mix) is rasterised once to read its sRGB value.
  const rgb = resolved.match(RGB);
  let channels;
  if (rgb) {
    channels = [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255];
  } else {
    const context = document.createElement('canvas').getContext?.('2d');
    if (!context) return fallback;
    context.fillStyle = resolved;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
    channels = [red / 255, green / 255, blue / 255];
  }
  channelsByColor.set(resolved, channels);
  return channels;
}

/** The pixel size a button of `width` × `height` CSS pixels is drawn at: capped DPR, and never beyond the GL canvas. */
export function drawingSize(width, height, dpr = 1) {
  const ratio = Math.min(dpr || 1, MAX_DPR);
  let w = Math.max(1, Math.round(width * ratio));
  let h = Math.max(1, Math.round(height * ratio));
  const fit = Math.min(1, MAX_WIDTH / w, MAX_HEIGHT / h);
  if (fit < 1) {
    w = Math.max(1, Math.floor(w * fit));
    h = Math.max(1, Math.floor(h * fit));
  }
  return [w, h];
}

function onLost(event) {
  event.preventDefault();
  glCanvas?.removeEventListener('webglcontextlost', onLost);
  renderer = null;
  glCanvas = null;
  entries.forEach(entry => { entry.dirty = true; });
}

function ensure() {
  if (renderer) return true;
  if (unsupported || typeof document === 'undefined') return false;
  glCanvas = document.createElement('canvas');
  glCanvas.width = MAX_WIDTH;
  glCanvas.height = MAX_HEIGHT;
  try {
    renderer = createLiquidRenderer(glCanvas);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.warn(error);
    renderer = null;
  }
  if (!renderer) {
    unsupported = true;
    glCanvas = null;
    return false;
  }
  glCanvas.addEventListener('webglcontextlost', onLost);
  return true;
}

/** Eases `entry.palette` towards `entry.goal`; returns whether it is still on its way. */
function follow(entry, seconds) {
  if (!entry.goal) return false;
  if (!entry.palette || seconds === Infinity) {
    entry.palette = entry.goal.map(color => [...color]);
    return false;
  }
  const share = Math.min(1, seconds * TONE_RATE);
  let moving = false;
  entry.palette = entry.palette.map((color, i) => color.map((channel, c) => {
    const next = channel + (entry.goal[i][c] - channel) * share;
    if (Math.abs(entry.goal[i][c] - next) > 0.002) moving = true;
    return next;
  }));
  if (!moving) entry.palette = entry.goal.map(color => [...color]);
  return moving;
}

function draw(entry) {
  const { target, width, height, palette } = entry;
  if (!renderer || !width || !height || !palette) return;
  renderer.draw({ width, height, time: clock, seed: entry.seed, palette });
  entry.context ||= target.getContext('2d');
  // WebGL's origin is bottom-left: the button's pixels sit at the bottom of the canvas image.
  entry.context?.drawImage(glCanvas, 0, MAX_HEIGHT - height, width, height, 0, 0, width, height);
  entry.dirty = false;
  entry.onDrawn?.();
}

const flowing = () => !reducedMotion() && !hidden() && [...entries].some(entry => entry.visible && !entry.still);

// Out of the loop a palette jumps to its goal; inside it, the loop eases it there frame by frame.
function drawPending(snap = true) {
  entries.forEach(entry => {
    if (!entry.visible || !entry.dirty) return;
    follow(entry, snap ? Infinity : 0);
    draw(entry);
  });
}

function tick(now) {
  frame = 0;
  if (!renderer) return;
  if (!flowing()) {
    drawPending();
    last = 0;
    return;
  }
  frame = requestAnimationFrame(tick);
  if (last && now - last < FRAME_INTERVAL) return;
  const seconds = last ? Math.min(now - last, 100) / 1000 : 0;
  clock += seconds * SPEED;
  last = now;
  entries.forEach(entry => {
    if (!entry.visible) return;
    const morphing = follow(entry, seconds);
    if (!entry.still || entry.dirty || morphing) draw(entry);
  });
}

/** Draws what is pending and starts or stops the loop to match the visible buttons. */
export function refreshLiquid() {
  if (!entries.size || !ensure()) return;
  drawPending(!flowing());
  if (flowing() && !frame) {
    last = 0;
    frame = requestAnimationFrame(tick);
  }
}

/**
 * Adds a button: `{ target, seed, goal, width, height, visible, still, onDrawn }`, where `target` is its 2D canvas and
 * `goal` its palette (paletteFor its tone); set a new `goal` and the drawn palette eases to it.
 * Returns the function that removes it. Returns null when the browser has no WebGL (the button keeps its CSS liquid).
 */
export function registerLiquid(entry) {
  if (!ensure()) return null;
  entry.dirty = true;
  entries.add(entry);
  if (!listening && typeof document !== 'undefined') {
    listening = true;
    document.addEventListener('visibilitychange', refreshLiquid);
  }
  refreshLiquid();
  return () => {
    entries.delete(entry);
    if (!entries.size && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/** Releases the context and forgets every button (tests, teardown). */
export function destroyLiquidEngine() {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  last = 0;
  entries.clear();
  glCanvas?.removeEventListener('webglcontextlost', onLost);
  renderer?.destroy();
  renderer = null;
  glCanvas = null;
  unsupported = false;
  if (listening) document.removeEventListener('visibilitychange', refreshLiquid);
  listening = false;
}
