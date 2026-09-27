'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../lib/smoothScroll';

/**
 * Smooth, weighted scrolling for wheel and trackpad (Lenis). It drives the page's native scroll position, so sticky
 * sections and framer-motion's useScroll keep reading real values. Touch keeps the platform's own scrolling, and
 * reduced motion keeps the browser's; in both cases nothing is installed. Anchors (`href="#…"`) glide through it, and
 * an element marked `data-lenis-prevent` (a modal's own scroller) scrolls on its own.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia;
    if (!media || media('(prefers-reduced-motion: reduce)').matches || !media('(hover: hover) and (pointer: fine)').matches) return undefined;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: { offset: -24 } });
    setLenis(lenis);
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
