'use client';

import React, { useEffect, useRef, useState } from 'react';
import { roundedRectPath } from './edgePath';
import s from './EdgeBeam.module.css';

/**
 * A comet of Volt light that runs a panel's edge at a constant speed, 12 s a lap, clockwise from the top left: crisp on
 * the 1px ring, echoed by a small soft glow in a 16px band just inside the glass. Render it as a child of a
 * `position: relative` panel with a border radius; it fills the panel and inherits the radius. It travels only while
 * the panel is on screen, and is absent under reduced motion or without motion-path support.
 *
 * The track is the panel's measured outline as a `path()` (kept current by a ResizeObserver), so the beam runs in every
 * engine with CSS motion paths, Safari 16 and later included; `inset(0 round …)` stays only as the first-paint fallback.
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      // Layout size, not the transformed box: the track belongs to the panel, whatever moves it.
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      el.style.setProperty('--beam-path', `path('${roundedRectPath(el.offsetWidth, el.offsetHeight, radius)}')`);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    return () => resize.disconnect();
  }, []);

  return <span ref={ref} className={`${s.beam} ${className}`} aria-hidden="true" data-live={live}>
    <span className={s.edge}><i className={s.comet} /></span>
    <span className={s.halo}><i className={s.glow} /></span>
  </span>;
}
