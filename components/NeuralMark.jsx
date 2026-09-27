'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { SYMBOL } from './intro/logoGeometry';
import { BRANCHES, NODES } from './intro/choreography';
import s from './NeuralMark.module.css';

/*
 * While it is assembled, a wave of light runs the network: a pulse through each branch, the main diagonal first, then
 * the two uprights, then the two Vs, and every node flashes as the pulse reaches it. `wave` is when a branch's pulse
 * sets off after the hold begins (s); its head enters the branch HEAD_IN later and crosses it in HEAD_CROSS (from the
 * pulse keyframes: 14% of the 6 s loop to travel 1.9 dash lengths). `at` is where each node sits along its branch.
 */
const WAVES = [0, 0.6, 0.6, 1.05, 1.05];
const HEAD_IN = 0.15;
const HEAD_CROSS = 0.442;
const NODE_TIMING = [
  [0, 0], [0, 0.317], [0, 0.674], [0, 1],
  [1, 0], [1, 1], [2, 0], [2, 1],
  [3, 0], [3, 0.5], [3, 1],
  [4, 0], [4, 0.5], [4, 1],
];

const reducedMotion = () => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

/**
 * The NeuralBI symbol as a living network, on a 6 s loop: it assembles like the intro (the nodes light in order, the
 * branches trace out between them), holds while a wave of light runs through it, then comes apart (the branches erase
 * in the direction they flow, the nodes go out) and gathers again. The loop starts the first time the mark is seen and
 * rests while it is off screen. The server's HTML, no JS and reduced motion keep the finished mark, still. The artwork
 * is the logo's exact path data.
 */
export default function NeuralMark({ className = '' }) {
  const id = useId().replace(/:/g, '');
  const ref = useRef(null);
  const [state, setState] = useState(undefined);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === 'undefined' || reducedMotion()) return undefined;
    const observer = new IntersectionObserver(records => {
      // The last record of a batch is the current state.
      const entry = records[records.length - 1];
      setLive(entry.isIntersecting);
      if (entry.intersectionRatio >= 0.5) setState('loop');
    }, { threshold: [0, 0.5] });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} className={`${s.mark} ${className}`} data-state={state} data-live={live} aria-hidden="true">
    <svg className={s.svg} viewBox="-6 -6 173 182" focusable="false">
      <defs>
        <g id={`${id}-symbol`}>{SYMBOL.map(({ d, fill }, i) => <path key={i} d={d} fill={fill} />)}</g>
        <mask id={`${id}-edges`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="210" height="215" style={{ maskType: 'luminance' }}>
          {BRANCHES.map((d, i) => (
            <path key={d} className={s.edge} style={{ '--i': i }} d={d} fill="none" stroke="white" strokeWidth="34.1" pathLength="1" />
          ))}
          {NODES.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="16.19" fill="black" />)}
        </mask>
        {NODES.map(([cx, cy], i) => (
          <clipPath key={i} id={`${id}-node-${i}`}><circle cx={cx} cy={cy} r="16.25" /></clipPath>
        ))}
        {/* The pulses only light what is inside the symbol. */}
        <clipPath id={`${id}-inside`}>{SYMBOL.map(({ d }, i) => <path key={i} d={d} />)}</clipPath>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#c6ff34" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#c6ff34" stopOpacity="0.3" />
          <stop offset="1" stopColor="#c6ff34" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className={s.assembly}>
        <use href={`#${id}-symbol`} mask={`url(#${id}-edges)`} />
        {NODES.map((_, i) => (
          <g key={i} className={s.node} style={{ '--n': i % 4 }}>
            <use href={`#${id}-symbol`} clipPath={`url(#${id}-node-${i})`} />
          </g>
        ))}
      </g>
      <use className={s.complete} href={`#${id}-symbol`} />

      <g className={s.loop} data-loop="">
        <g clipPath={`url(#${id}-inside)`}>
          {BRANCHES.map((d, i) => (
            <g key={d} className={s.pulse} style={{ '--wave': `${WAVES[i]}s` }} data-branch={i}>
              <path className={s.pulseHalo} d={d} pathLength="1" />
              <path className={s.pulseCore} d={d} pathLength="1" />
            </g>
          ))}
        </g>
        {NODES.map(([cx, cy], i) => {
          const [branch, at] = NODE_TIMING[i];
          return <circle key={i} className={s.flash} style={{ '--wave': `${(WAVES[branch] + HEAD_IN + at * HEAD_CROSS).toFixed(3)}s` }}
            cx={cx} cy={cy} r="24.8" fill={`url(#${id}-glow)`} data-node={i} />;
        })}
      </g>
    </svg>
  </span>;
}
