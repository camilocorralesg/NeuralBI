'use client';

import { useEffect, useState } from 'react';

/**
 * The reveal state of an element, for CSS to act on (`data-reveal`):
 * - undefined: resolved. The server's HTML, no JS, and anything already on screen when the page loads stay like this.
 * - 'armed': it loaded off screen, so it waits at its start, hidden.
 * - 'run': it came into view (`amount` of it visible): the CSS transitions carry it home.
 * After `settle` ms of running it returns to undefined, so no `will-change` or transition state lingers.
 */
export default function useReveal(ref, { amount = 0.2, settle = 0 } = {}) {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    let first = true;
    let timer = 0;
    const observer = new IntersectionObserver(records => {
      // The last record of a batch is the current state.
      const entry = records[records.length - 1];
      if (first) {
        first = false;
        if (entry.isIntersecting) { observer.disconnect(); return; }
        setState('armed');
        return;
      }
      if (!entry.isIntersecting || entry.intersectionRatio < amount) return;
      observer.disconnect();
      setState('run');
      if (settle) timer = window.setTimeout(() => setState(undefined), settle);
    }, { threshold: [0, amount] });
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [ref, amount, settle]);

  return state;
}
