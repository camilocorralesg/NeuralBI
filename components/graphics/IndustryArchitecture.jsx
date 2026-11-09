'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import MockupStage from '../mockups/MockupStage';
import { useLazyModule, useNear, whenIdle } from '../lazyModule';
import { loadSector, mockups, preloadMockups } from './industryMockups';
import s from './IndustryArchitecture.module.css';

const ignore = () => {};

// The product of the open solution, in its stage. The products are chunks (./industryMockups.js): they arrive when the
// section comes within a screen of the viewport (the open sector first, the rest once the browser is idle); until then
// the stage and its light already stand in place, at their full size.
function IndustryArchitecture({ industry, solution, language }) {
  const root = useRef(null);
  const [running, setRunning] = useState(false);
  const live = running;
  const card = solution ?? 0;
  const item = mockups[industry]?.[card];

  useEffect(() => {
    let inView = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setRunning(inView && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(records => { inView = records[records.length - 1].isIntersecting; update(); });
    observer.observe(root.current);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  const near = useNear(root);
  // The product on screen as soon as its chunk lands (a click can get ahead of the idle preload)...
  const Mockup = useLazyModule(item?.chunk, near)?.default;
  // ...the rest of the open sector next, then the other twelve while the browser is idle.
  useEffect(() => {
    if (!near) return undefined;
    let alive = true;
    loadSector(industry).then(() => alive && whenIdle(() => { preloadMockups().catch(ignore); }), ignore);
    return () => { alive = false; };
  }, [near, industry]);

  return <div ref={root} className={s.scene} data-running={live} data-sector={industry} data-solution={solution} aria-hidden="true">
    {item && <MockupStage id={`${industry}-${card}`} frame={item.frame} live={live}>{Mockup && <Mockup live={live} language={language} />}</MockupStage>}
  </div>;
}

export default memo(IndustryArchitecture);
