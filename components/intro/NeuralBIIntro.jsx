'use client';

import { useId, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { animate } from 'framer-motion';
import { SYMBOL, WORDMARK, REGISTRATION } from './logoGeometry';
import {
  BRANCHES, NODES, INTRO_DURATION, REDUCED_DURATION, SESSION_KEY,
  SIGNAL_ARRIVALS, progress, easeOut, easeInOut, signalPosition,
} from './choreography';
import styles from './NeuralBIIntro.module.css';

function SymbolPaths() {
  return (
    <>
      {SYMBOL.map(({ d, fill }, i) => (
        <path key={i} d={d} fill={fill} />
      ))}
    </>
  );
}

export default function NeuralBIIntro() {
  const id = useId().replace(/:/g, '');
  const pathname = usePathname();
  const rootRef = useRef(null);
  const dismissRef = useRef(null);
  const [dismissed, setDismissed] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    const started = Number(html.dataset.neuralbiIntroStart || Date.now());
    if (!root || html.dataset.neuralbiIntro !== 'pending' || Date.now() - started > 2000) {
      html.dataset.neuralbiIntro = 'done';
      delete html.dataset.neuralbiIntroStart;
      setDismissed(true);
      return;
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const select = (selector) => root.querySelector(selector);
    const stage = select('[data-intro-stage]');
    const lockup = select('[data-intro-lockup]');
    const assembly = select('[data-intro-assembly]');
    const complete = select('[data-intro-complete]');
    const wordmark = select('[data-intro-wordmark-mask]');
    const registration = select('[data-intro-registration]');
    const signal = select('[data-intro-signal]');
    const aperture = select('[data-intro-aperture]');
    const nodes = [...root.querySelectorAll('[data-intro-node]')];
    const edges = [...root.querySelectorAll('[data-intro-edge]')];
    const glows = [...root.querySelectorAll('[data-intro-glow]')];
    let width = 0, height = 0, scale = 1, radius = 1, originX = 0, originY = 0;
    let ended = false;
    let controls;
    let removeListeners = () => {};

    const measure = () => {
      // One viewport read, only at setup/resize; the timeline never reads layout.
      width = window.innerWidth;
      height = window.innerHeight;
      scale = Math.min(540, width * 0.82) / 810.48;
      originX = width / 2 + (102.21 - 405.24) * scale;
      originY = height / 2 + (102.54 - 85.03) * scale;
      radius = Math.hypot(Math.max(originX, width - originX), Math.max(originY, height - originY)) + 8;
      stage.setAttribute('transform', `translate(${width / 2} ${height / 2}) scale(${scale}) translate(-405.24 -85.03)`);
    };

    const finish = (successful) => {
      if (ended) return;
      ended = true;
      controls?.stop();
      removeListeners();
      html.dataset.neuralbiIntro = 'done';
      delete html.dataset.neuralbiIntroStart;
      if (successful) {
        try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch { /* Storage may be blocked. */ }
      }
      setDismissed(true);
    };

    const dismiss = () => finish(false);
    dismissRef.current = dismiss;

    const paint = (time) => {
      const align = easeInOut(progress(time, 0.68, 0.4));
      lockup.setAttribute('transform', `translate(${323.54 * (1 - align)} 0)`);
      nodes.forEach((node, index) => {
        const p = easeOut(progress(time, 0.025 + (index % 4) * 0.028, 0.27));
        node.setAttribute('opacity', String(p));
        node.setAttribute('transform', `translate(${(index % 2 ? 3.5 : -3.5) * (1 - p)} ${(index % 3 - 1) * 4.5 * (1 - p)})`);
      });
      edges.forEach((edge, index) => edge.setAttribute('stroke-dashoffset',
        String(1 - easeOut(progress(time, 0.24 + index * 0.032, 0.26)))));
      const assembled = time >= 0.63;
      assembly.setAttribute('opacity', assembled ? '0' : '1');
      complete.setAttribute('opacity', assembled ? '1' : '0');
      const [x, y] = signalPosition(time);
      signal.setAttribute('transform', `translate(${x} ${y})`);
      signal.setAttribute('opacity', time >= 0.58 && time < 1.025
        ? String(Math.min(progress(time, 0.58, 0.025), 1 - progress(time, 0.98, 0.045))) : '0');
      glows.forEach((glow, index) => {
        const arrival = index < 4 ? SIGNAL_ARRIVALS[index] : 0.48 + (index - 4) * 0.022;
        const p = progress(time, arrival, 0.16);
        glow.setAttribute('opacity', String(Math.sin(p * Math.PI) * 0.32));
      });
      wordmark.setAttribute('transform', `translate(0 ${175 * (1 - easeOut(progress(time, 0.92, 0.27)))})`);
      registration.setAttribute('opacity', String(progress(time, 1.02, 0.13)));
      const opening = easeInOut(progress(time, 1.29, 0.46));
      aperture.setAttribute('opacity', time >= 1.29 ? '1' : '0');
      aperture.setAttribute('transform', `translate(${originX} ${originY}) scale(${16.19 * scale + radius * opening})`);
    };

    const reducedPaint = (time) => {
      lockup.setAttribute('transform', 'translate(0 0)');
      assembly.setAttribute('opacity', '0');
      complete.setAttribute('opacity', '1');
      wordmark.setAttribute('transform', 'translate(0 0)');
      registration.setAttribute('opacity', '1');
      signal.setAttribute('opacity', '0');
      glows.forEach(glow => glow.setAttribute('opacity', '0'));
      aperture.setAttribute('opacity', '0');
      root.style.opacity = String(1 - progress(time, 0.055, REDUCED_DURATION - 0.055));
    };

    const run = (reduced) => {
      controls?.stop();
      const duration = reduced ? REDUCED_DURATION : INTRO_DURATION;
      const update = reduced ? reducedPaint : paint;
      update(0);
      controls = animate(0, duration, { duration, ease: 'linear', onUpdate: update, onComplete: () => finish(true) });
    };

    const onPreference = () => { if (media.matches && !ended) run(true); };
    const onVisibility = () => { if (document.hidden) dismiss(); };
    const onKey = (event) => {
      if (['Tab', 'Escape', 'Enter', ' '].includes(event.key)) dismiss();
    };

    measure();
    html.dataset.neuralbiIntro = 'active';

    window.addEventListener('resize', measure);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pointerdown', dismiss, true);
    window.addEventListener('wheel', dismiss, { passive: true });
    window.addEventListener('touchstart', dismiss, { passive: true });
    window.addEventListener('pagehide', dismiss);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('neuralbi:intro-timeout', dismiss);
    media.addEventListener('change', onPreference);

    removeListeners = () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('pointerdown', dismiss, true);
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchstart', dismiss);
      window.removeEventListener('pagehide', dismiss);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('neuralbi:intro-timeout', dismiss);
      media.removeEventListener('change', onPreference);
    };

    if (document.hidden) dismiss();
    else run(media.matches);

    return () => {
      controls?.stop();
      removeListeners();
      dismissRef.current = null;
      // Leave the pre-paint gate armed for React Strict Mode's effect replay.
      if (!ended) html.dataset.neuralbiIntro = 'pending';
    };
  }, []);

  useLayoutEffect(() => {
    if (pathname !== '/' && pathname !== '' && pathname !== '/NeuralBI' && pathname !== '/NeuralBI/') {
      dismissRef.current?.();
    }
  }, [pathname]);

  if (dismissed) return null;

  return (
    <svg ref={rootRef} className={styles.overlay} aria-hidden="true" focusable="false" data-neuralbi-intro-overlay="">
      <defs>
        <g id={`${id}-symbol`}><SymbolPaths /></g>
        <mask id={`${id}-aperture`} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%" style={{ maskType: 'luminance' }}>
          <rect width="100%" height="100%" fill="white" />
          <circle data-intro-aperture="" r="1" fill="black" opacity="0" />
        </mask>
        <mask id={`${id}-edges`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="210" height="215" style={{ maskType: 'luminance' }}>
          {BRANCHES.map(d => (
            <path
              key={d}
              data-intro-edge=""
              d={d}
              fill="none"
              stroke="white"
              strokeWidth="34.1"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          ))}
          {NODES.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="16.19" fill="black" />
          ))}
        </mask>
        <clipPath id={`${id}-wordmark`}>
          <rect data-intro-wordmark-mask="" x="240" y="0" width="580" height="175" transform="translate(0 175)" />
        </clipPath>
        {NODES.map(([cx, cy], i) => (
          <clipPath key={i} id={`${id}-node-${i}`}>
            <circle cx={cx} cy={cy} r="16.25" />
          </clipPath>
        ))}
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#c6ff34" stopOpacity="0.8" />
          <stop offset="0.55" stopColor="#c6ff34" stopOpacity="0.28" />
          <stop offset="1" stopColor="#c6ff34" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g mask={`url(#${id}-aperture)`}>
        <rect width="100%" height="100%" className={styles.background} />
        <g data-intro-stage="">
          <g data-intro-lockup="">
            <g data-intro-assembly="">
              <use href={`#${id}-symbol`} mask={`url(#${id}-edges)`} />
              {NODES.map((_, i) => (
                <g key={i} data-intro-node="" opacity="0">
                  <use href={`#${id}-symbol`} clipPath={`url(#${id}-node-${i})`} />
                </g>
              ))}
            </g>
            <g data-intro-complete="" opacity="0"><use href={`#${id}-symbol`} /></g>
            {NODES.map(([cx, cy], i) => (
              <circle key={i} data-intro-glow="" cx={cx} cy={cy} r="24.8" fill={`url(#${id}-glow)`} opacity="0" />
            ))}
            <g data-intro-signal="" opacity="0">
              <circle r="8.26" fill={`url(#${id}-glow)`} />
              <circle r="2.64" fill="#f4ffe0" />
            </g>
            <g clipPath={`url(#${id}-wordmark)`}>
              {WORDMARK.map(({ d, fill }, idx) => (
                <path key={idx} d={d} fill={fill} />
              ))}
            </g>
            <path data-intro-registration="" d={REGISTRATION.d} fill={REGISTRATION.fill} opacity="0" />
          </g>
        </g>
      </g>
    </svg>
  );
}
