// The page's one smooth-scroll instance (Lenis), when it runs, and the helpers every programmatic scroll goes through.
// Lenis runs only for a fine pointer without reduced motion (see components/SmoothScroll.jsx); everywhere else these
// helpers fall back to the browser's own scrolling, so callers never need to know which is active.
let lenis = null;

export const setLenis = instance => { lenis = instance; };
export const getLenis = () => lenis;

/**
 * Scrolls the page to an element or a y position. `offset` is added to the element's top; `immediate` jumps.
 * Through Lenis when it runs (so its own easing and state stay in charge), natively otherwise.
 */
export function scrollToTarget(target, { offset = 0, immediate = false } = {}) {
  if (typeof window === 'undefined' || target == null) return;
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, force: true });
    return;
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
}

/** Holds the page still (a modal or a menu is open), and lets it go again. */
export const lockScroll = () => lenis?.stop();
export const unlockScroll = () => lenis?.start();
