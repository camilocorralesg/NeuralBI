'use client';

import React, { forwardRef, useEffect, useId, useMemo, useRef } from 'react';
import Link from 'next/link';
import { drawingSize, paletteFor, refreshLiquid, registerLiquid, resolveColor } from './liquidEngine';
import s from './ShaderButton.module.css';

// A stable seed per button, from its React id, so no two buttons flow alike (and server and client agree).
function seedFrom(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 9973;
  return 1 + (hash % 997) / 83;
}

/**
 * NeuralBI's action button, after Framer's Shader Button: a pill filled with a slow liquid gradient in its tone (Volt by
 * default, a product's accent in The Arsenal), a 2px white edge, a soft inner glow and a white label. Under the pointer
 * the liquid recedes into the dark glass and the arrow slips out and back; a press dips the pill.
 *
 * The liquid is drawn by the shared engine (liquidEngine.js, one WebGL context for the page) into this button's canvas
 * while it is on screen; the server's HTML and browsers without WebGL show a still CSS liquid in the same tone. A
 * disabled button's liquid is dimmed and still; `ready` marks a form that can be sent.
 *
 * Renders a Next.js `Link` for internal paths (`/…`), an `<a>` for other `href`s, otherwise a `<button>`.
 */
const ShaderButton = forwardRef(function ShaderButton({
  href, children, className = '', tone = 'var(--color-accent)', ready = false, disabled, type, style, ...rest
}, forwarded) {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const entryRef = useRef(null);
  const toneRef = useRef(tone);
  const id = useId();
  const seed = useMemo(() => seedFrom(id), [id]);

  useEffect(() => {
    const element = ref.current;
    const target = canvasRef.current;
    if (!element || !target) return undefined;
    const entry = {
      target,
      seed,
      goal: null,
      width: 0,
      height: 0,
      visible: typeof IntersectionObserver === 'undefined',
      still: Boolean(element.disabled),
      onDrawn: () => { element.dataset.liquid = 'true'; },
    };
    const tint = () => { entry.goal = paletteFor(resolveColor(element, toneRef.current)); entry.dirty = true; };
    const size = () => {
      const box = element.getBoundingClientRect();
      const [width, height] = drawingSize(box.width, box.height, window.devicePixelRatio);
      if (width === entry.width && height === entry.height) return;
      entry.width = width;
      entry.height = height;
      target.width = width;
      target.height = height;
      entry.dirty = true;
    };
    tint();
    size();
    const unregister = registerLiquid(entry);
    if (!unregister) return undefined;
    entryRef.current = entry;
    entry.tint = tint;

    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => { size(); refreshLiquid(); });
    resize?.observe(element);
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(records => {
      // A batch can hold several records for the button (a fast scroll): the last one is the current state.
      entry.visible = records[records.length - 1].isIntersecting;
      // A tone from a custom property may have changed while the button was away.
      if (entry.visible) tint();
      refreshLiquid();
    }, { rootMargin: '80px 0px' });
    observer?.observe(element);

    return () => {
      unregister();
      resize?.disconnect();
      observer?.disconnect();
      entryRef.current = null;
      delete element.dataset.liquid;
    };
  }, [seed]);

  // A new tone (The Arsenal switching products) is re-resolved and the liquid eases to it, without leaving the engine.
  useEffect(() => {
    toneRef.current = tone;
    const entry = entryRef.current;
    if (!entry?.tint) return;
    entry.tint();
    refreshLiquid();
  }, [tone]);

  // A disabled button's liquid rests; enabling it lets it flow again.
  useEffect(() => {
    const entry = entryRef.current;
    if (!entry) return;
    entry.still = Boolean(disabled);
    entry.dirty = true;
    refreshLiquid();
  }, [disabled]);

  const setRef = node => {
    ref.current = node;
    if (typeof forwarded === 'function') forwarded(node);
    else if (forwarded) forwarded.current = node;
  };

  const shared = {
    ref: setRef,
    className: `${s.button} ${className}`,
    'data-ready': ready || undefined,
    style: { '--tone': tone, ...style },
    ...rest,
  };
  const content = <>
    <span className={s.liquid} aria-hidden="true"><canvas ref={canvasRef} className={s.canvas} /></span>
    {children}
  </>;

  if (href && href.startsWith('/')) return <Link href={href} {...shared}>{content}</Link>;
  if (href) return <a href={href} {...shared}>{content}</a>;
  return <button type={type || 'button'} disabled={disabled} {...shared}>{content}</button>;
});

export default ShaderButton;
