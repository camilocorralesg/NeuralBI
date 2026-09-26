'use client';

import React, { useEffect, useRef, useState } from 'react';
import s from './EdgeBeam.module.css';

/**
 * A comet of Volt light that runs a panel's edge at a constant speed, 12 s a lap, clockwise from the top left: crisp on
 * the 1px ring, echoed by a small soft glow in a 16px band just inside the glass. Render it as a child of a
 * `position: relative` panel with a border radius; it fills the panel and inherits the radius. It travels only while
 * the panel is on screen, and is absent under reduced motion or without motion-path support.
 */
export default function EdgeBeam({ className = '' }) {
  const ref = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(records => setLive(records[records.length - 1].isIntersecting), { rootMargin: '120px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} className={`${s.beam} ${className}`} aria-hidden="true" data-live={live}>
    <span className={s.edge}><i className={s.comet} /></span>
    <span className={s.halo}><i className={s.glow} /></span>
  </span>;
}
