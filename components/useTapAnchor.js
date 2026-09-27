'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { scrollToTarget } from '../lib/smoothScroll';

// The components that use this also render on the server, where useLayoutEffect warns.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Keeps a tapped row under the finger while the content around it reflows (an accordion answer folding away above it).
 * Call the returned `hold(node)` in the tap handler, before the state change; once `key` changes and the DOM commits,
 * before the frame is painted, the page moves by exactly the row's shift. Done by hand because Safari has no scroll
 * anchoring; the caller's container opts out of Chrome's (`overflow-anchor: none`) so it is not corrected twice.
 */
export default function useTapAnchor(key) {
  const held = useRef(null);
  useIsoLayoutEffect(() => {
    const anchor = held.current;
    held.current = null;
    if (!anchor || !anchor.node.isConnected) return;
    const shift = anchor.node.getBoundingClientRect().top - anchor.top;
    if (Math.abs(shift) > 1) scrollToTarget(window.scrollY + shift, { immediate: true });
  }, [key]);
  return (node) => { held.current = node ? { node, top: node.getBoundingClientRect().top } : null; };
}
