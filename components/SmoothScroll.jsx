'use client';

import { useEffect } from 'react';
import { setLenis } from '../lib/smoothScroll';

/**
 * Smooth, weighted scrolling for wheel and trackpad (Lenis). It drives the page's native scroll position, so sticky
 * sections and framer-motion's useScroll keep reading real values. Touch keeps the platform's own scrolling, and
 * reduced motion keeps the browser's; in both cases nothing is installed, and Lenis is not even downloaded: it is a
 * chunk of its own, fetched after the page is up only where it will run. Until it arrives (or if it never does) the
 * browser scrolls natively and lib/smoothScroll falls back to it. Anchors (`href="#…"`) glide through it, and an
 * element marked `data-lenis-prevent` (a modal's own scroller) scrolls on its own.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia;
    if (!media || media('(prefers-reduced-motion: reduce)').matches || !media('(hover: hover) and (pointer: fine)').matches) return undefined;
    let lenis = null;
    let frame = 0;
    let gone = false;
    import('lenis').then(({ default: Lenis }) => {
      if (gone) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: { offset: -24 } });
      setLenis(lenis);
      frame = requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      });
    }, () => {});
    return () => {
      gone = true;
      cancelAnimationFrame(frame);
      if (!lenis) return;
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
