'use client';

import { useEffect } from 'react';

/**
 * Lights a panel's edge where a fine pointer is, through `--mx` / `--my` on the panel (one rAF per move); leaving the
 * panel clears them. Touch and reduced motion keep the travelling beam alone.
 */
export default function useEdgeSpotlight(ref) {
  useEffect(() => {
    const el = ref.current;
    const media = typeof window === 'undefined' ? null : window.matchMedia;
    if (!el || !media || media('(prefers-reduced-motion: reduce)').matches || !media('(hover: hover) and (pointer: fine)').matches) return undefined;
    let frame = 0;
    const move = event => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${event.clientX - box.left}px`);
        el.style.setProperty('--my', `${event.clientY - box.top}px`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
