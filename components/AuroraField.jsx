'use client';

import React, { useEffect, useRef } from 'react';
import { createAuroraRenderer } from './auroraRenderer';
import s from './AuroraField.module.css';

// The field is soft by nature, so it renders at a fraction of the CSS size and the browser's
// upscale does the blurring for free. 30 fps is plenty for a drift this slow.
const RENDER_SCALE = 0.5;
const MAX_RENDER_WIDTH = 760;
const FRAME_INTERVAL = 1000 / 30;
// Where the reduced-motion still frame rests: the streak lit, the blooms half raised.
const STILL_TIME = 6.5;

let grainTile;
// A 160px film-grain tile, made once per page and blended as `overlay`, so black stays black.
function getGrainTile() {
  if (grainTile !== undefined) return grainTile;
  grainTile = null;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 160;
  const context = canvas.getContext?.('2d');
  if (!context) return grainTile;
  const image = context.createImageData(160, 160);
  for (let i = 0; i < image.data.length; i += 4) {
    const value = 128 + (Math.random() - .5) * 120;
    image.data[i] = image.data[i + 1] = image.data[i + 2] = value;
    image.data[i + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  grainTile = `url(${canvas.toDataURL('image/png')})`;
  return grainTile;
}

// Resolves any CSS colour (custom properties included) to sRGB channels in 0–1.
function resolveColor(element, color) {
  const probe = document.createElement('span');
  probe.style.color = color;
  element.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  const context = document.createElement('canvas').getContext?.('2d');
  if (!context) return [198 / 255, 1, 52 / 255];
  context.fillStyle = resolved;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

/**
 * Animated light field for dark sections: the hero's volt light reprised as a slow, liquid
 * gradient with film grain. Render it as the first child of a `position: relative; isolation: isolate`
 * section; both ends fade to the page black.
 *
 * A WebGL shader paints a domain-warped streak on the hero's diagonal and two blooms that rise
 * from the lower corners, breathing against each other. It renders at half resolution and 30 fps,
 * pauses offscreen and in hidden tabs, never reacts to the pointer, draws a single still frame
 * under reduced motion, and falls back to a static CSS gradient without WebGL.
 *
 * - `accent`: the light's colour (any CSS colour; tokens welcome). Every tone is derived from it.
 * - `intensity`: 0–1 multiplier for the whole field.
 * - `clearRef`: a ref to the content the light should flow around (an illustration, a stage). Inside
 *   its box the field dims to a faint glow, with a soft, warped edge.
 */
export default function AuroraField({ accent = 'var(--color-accent)', intensity = 1, clearRef, className = '' }) {
  const ref = useRef(null);
  const grainRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const tile = getGrainTile();
    if (tile && grainRef.current) grainRef.current.style.backgroundImage = tile;

    const still = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    let canvas = null;
    let renderer = null;
    let lost = false;
    let inView = typeof IntersectionObserver === 'undefined';
    let frame = 0;
    let last = 0;
    let clock = STILL_TIME;

    const draw = () => renderer?.render(clock);
    const running = () => Boolean(renderer) && !still && inView && !document.hidden;
    const size = () => {
      if (!renderer) return;
      const box = element.getBoundingClientRect();
      const scale = Math.min(RENDER_SCALE, MAX_RENDER_WIDTH / Math.max(box.width, 1));
      renderer.resize(Math.max(1, Math.round(box.width * scale)), Math.max(1, Math.round(box.height * scale)));
      const clear = clearRef?.current?.getBoundingClientRect();
      if (clear && box.width && box.height) {
        renderer.setClearing(
          (clear.left - box.left) / box.width, 1 - (clear.bottom - box.top) / box.height,
          (clear.right - box.left) / box.width, 1 - (clear.top - box.top) / box.height,
        );
      }
      draw();
    };
    const onLost = (event) => { event.preventDefault(); renderer = null; lost = true; element.dataset.webgl = 'false'; update(); };

    // Every run gets a fresh canvas: a context lost on unmount (StrictMode remounts, card switches) or evicted by the
    // browser is never reused, which would otherwise leave the field stuck on its static fallback.
    const boot = () => {
      renderer?.destroy();
      canvas?.removeEventListener('webglcontextlost', onLost);
      canvas?.remove();
      canvas = document.createElement('canvas');
      canvas.className = s.canvas;
      canvas.addEventListener('webglcontextlost', onLost);
      element.insertBefore(canvas, grainRef.current);
      renderer = null;
      try {
        renderer = createAuroraRenderer(canvas);
      } catch (error) {
        // The static fallback takes over; say why while developing.
        if (process.env.NODE_ENV !== 'production') console.warn(error);
      }
      element.dataset.webgl = String(Boolean(renderer));
      if (renderer) {
        renderer.setColor(resolveColor(element, accent), intensity);
        size();
      }
    };

    const tick = (now) => {
      frame = 0;
      if (!running()) return;
      frame = requestAnimationFrame(tick);
      if (last && now - last < FRAME_INTERVAL) return;
      clock += last ? Math.min(now - last, 100) / 1000 : 0;
      last = now;
      draw();
    };
    function update() {
      // A context the browser took back is rebuilt on a new canvas the next time the field is seen.
      if (lost && inView && !document.hidden) { lost = false; boot(); }
      element.dataset.running = String(running());
      if (running() && !frame) { last = 0; frame = requestAnimationFrame(tick); }
      if (!running() && frame) { cancelAnimationFrame(frame); frame = 0; }
    }

    boot();
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(size);
    resize?.observe(element);
    if (clearRef?.current) resize?.observe(clearRef.current);
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(records => {
      // The last record of a batch is the current state (a fast scroll delivers several).
      inView = records[records.length - 1].isIntersecting;
      update();
    }, { rootMargin: '120px 0px' });
    observer?.observe(element);
    document.addEventListener('visibilitychange', update);
    update();

    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      observer?.disconnect();
      document.removeEventListener('visibilitychange', update);
      canvas?.removeEventListener('webglcontextlost', onLost);
      renderer?.destroy();
      canvas?.remove();
    };
  }, [accent, intensity, clearRef]);

  return <div ref={ref} aria-hidden="true" data-running="false" data-webgl="false" className={`${s.aurora} ${className}`} style={{ '--aurora-accent': accent, '--aurora-intensity': intensity }}>
    <span className={s.fallback} />
    <span ref={grainRef} className={s.grain} />
  </div>;
}
