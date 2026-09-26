'use client';

import React, { useCallback, useRef } from 'react';
import useReveal from './useReveal';
import s from './Reveal.module.css';

// How long each kind takes to land, for the reveal state to clear after.
const DURATION = { text: 600, block: 700, visual: 900 };

/**
 * Anything below a headline that arrives once, the first time it is seen (useReveal → data-reveal):
 * - `text`: supporting copy fades up a short way (--reveal-rise-text).
 * - `block`: a card, panel or form rises a little further (--reveal-rise).
 * - `visual`: a scene or mockup opens from the bottom through a clip while it settles.
 * `delay` (ms) places it in its section's sequence, usually after the title's words. The server's HTML is the finished
 * layout, anything already on screen at load stays put, and under reduced motion it simply appears.
 */
export default function Reveal({ ref: outerRef, as: Tag = 'div', variant = 'text', delay = 0, amount = 0.2, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const state = useReveal(ref, { amount, settle: DURATION[variant] + delay + 100 });
  // The caller may need the element too (React 19 passes `ref` as a prop): both refs see it.
  const setRef = useCallback((node) => {
    ref.current = node;
    if (typeof outerRef === 'function') outerRef(node);
    else if (outerRef) outerRef.current = node;
  }, [outerRef]);
  return (
    <Tag
      ref={setRef}
      className={`${s.reveal} ${s[variant]} ${className}`.trim()}
      data-reveal={state}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
