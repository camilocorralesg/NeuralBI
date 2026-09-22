'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import s from './AuditBlueprintScene.module.css';

// Orthographic projection shared by the solid layers and their printed diagrams.
const project = (x, y, z = 0) => [280 + (x - y) * .8660254, 65 + (x + y) * .5 - z];
const point = (...coordinates) => project(...coordinates).join(',');
const plane = (x, y, width, depth, z = 0) => [point(x, y, z), point(x + width, y, z), point(x + width, y + depth, z), point(x, y + depth, z)].join(' ');
const line = coordinates => coordinates.map((p, i) => `${i ? 'L' : 'M'}${point(...p)}`).join(' ');
const matrix = z => `matrix(.8660254 .5 -.8660254 .5 280 ${65 - z})`;
const connections = ['M57 35H91', 'M36 49V88H65', 'M111 49V88H105'];
const tables = [{ x: 19, y: 20, w: 38, h: 29 }, { x: 91, y: 20, w: 38, h: 29 }, { x: 65, y: 74, w: 40, h: 28 }];

function Slab({ z, thickness = 5, fill, light = false }) {
  return <g strokeLinejoin="round">
    <polygon points={[point(0, 120, z), point(160, 120, z), point(160, 120, z - thickness), point(0, 120, z - thickness)].join(' ')} className={light ? s.paperLeft : s.slabLeft} />
    <polygon points={[point(160, 0, z), point(160, 120, z), point(160, 120, z - thickness), point(160, 0, z - thickness)].join(' ')} className={light ? s.paperRight : s.slabRight} />
    <polygon points={plane(0, 0, 160, 120, z)} fill={fill} className={light ? s.paperEdge : s.slabEdge} />
  </g>;
}

function SchemaTable({ x, y, w, h }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="1.5" className={s.table} />
    <path d={`M0 9H${w}`} className={s.tableRule} />
    <rect x="4" y="3" width="4" height="3" rx=".5" className={s.key} />
    <path d={`M12 4.5H${w - 5}`} className={s.tableHeader} />
    {[15, 21].map(y => <g key={y}><circle cx="5" cy={y} r="1" className={s.key} /><path d={`M10 ${y}H${w - 6}`} className={s.field} /></g>)}
  </g>;
}

export const AuditBlueprintScene = memo(function AuditBlueprintScene() {
  const ref = useRef(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    const visibility = () => { element.dataset.visible = String(!document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => { element.dataset.running = String(entry.isIntersecting); }, { threshold: .15 },
    );
    visibility();
    if (observer) observer.observe(element);
    else element.dataset.running = 'true';
    document.addEventListener('visibilitychange', visibility);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  return <figure ref={ref} className={s.scene} data-running="false" aria-label="Audit & Blueprint: isometric architecture" aria-describedby={`${id}-desc`}>
    <svg viewBox="115 -31 365 270" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#edf4dd" /><stop offset=".5" stopColor="#c5d6ae" /><stop offset="1" stopColor="#94ad79" /></linearGradient>
        <linearGradient id={`${id}-graphite`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#30392e" /><stop offset="1" stopColor="#111b14" /></linearGradient>
        <linearGradient id={`${id}-lens`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c6ff34" stopOpacity=".35" /><stop offset="1" stopColor="#111b14" stopOpacity=".9" /></linearGradient>
        <radialGradient id={`${id}-shadow`}><stop stopColor="#63733c" stopOpacity=".16" /><stop offset="1" stopColor="#63733c" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="298" cy="182" rx="167" ry="58" fill={`url(#${id}-shadow)`} />
      <g className={s.survey}>
        <path d={line([[-17, 127, -13], [167, 127, -13], [167, -8, -13]])} />
        {[-10, 22, 54, 86, 118, 150].map(x => <path key={x} d={line([[x, 124, -13], [x, 131, -13]])} />)}
        {[0, 30, 60, 90, 120].map(y => <path key={y} d={line([[164, y, -13], [171, y, -13]])} />)}
      </g>
      <Slab z={0} thickness={9} fill={`url(#${id}-graphite)`} />
      <g transform={matrix(.2)}>
        <rect x="9" y="9" width="142" height="102" rx="2" className={s.baseInset} />
        {[26, 48, 70, 92].map(y => <path key={y} d={`M17 ${y}H143`} className={s.baseRule} />)}
        <path d="M17 18H34M17 18V35M143 18H126M143 18V35M17 102H34M17 102V85M143 102H126M143 102V85" className={s.corner} />
      </g>
      <g className={s.alignment}>
        {[[7, 7], [153, 7], [7, 113], [153, 113]].map(([x, y]) => <path key={`${x}-${y}`} d={line([[x, y, 1], [x, y, 59]])} />)}
      </g>
      <g className={s.middleLayer}>
        <Slab z={27} thickness={3} fill="#17271d" />
        <g transform={matrix(27.2)}>
          <rect x="10" y="10" width="140" height="100" className={s.circuitFrame} />
          <path d="M20 30H62V59H111V94H141M21 96H43V69H87V29H140M19 57H34M125 60H142" className={s.circuit} />
          {[[20, 30], [141, 94], [21, 96], [140, 29], [87, 69]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" className={s.contact} />)}
        </g>
        <path d={line([[0, 120, 25], [160, 120, 25], [160, 0, 25]])} className={s.litEdge} />
      </g>
      <g className={s.topLayer}>
        <Slab z={60} thickness={3} fill={`url(#${id}-paper)`} light />
        <g transform={matrix(60.3)}>
          <g className={s.paperGrid}>{[16, 32, 48, 64, 80, 96, 112, 128, 144].map(x => <path key={x} d={`M${x} 10V110`} />)}{[16, 32, 48, 64, 80, 96].map(y => <path key={y} d={`M10 ${y}H150`} />)}</g>
          <path d="M9 21V9H21M139 9H151V21M9 99V111H21M139 111H151V99" className={s.printCorner} />
          {connections.map(d => <path key={d} d={d} className={s.routeGuide} />)}
          {connections.map((d, i) => <path key={d} d={d} pathLength="100" className={s.planRoute} style={{ '--delay': `${i * .12}s` }} />)}
          {tables.map(table => <SchemaTable key={table.x} {...table} />)}
          <g className={s.approval}><circle cx="137" cy="94" r="9" className={s.seal} /><path d="m133 94 3 3 5-6" className={s.check} /></g>
          <path d="M20 109H43m3 0h7" className={s.printCorner} />
        </g>
        <g className={s.lensTravel}>
          <g transform="translate(283 41)">
            <ellipse cy="9" rx="34" ry="19" fill="#0b1309" opacity=".2" />
            <path d="M23 14 50 30" stroke="#102019" strokeWidth="10" strokeLinecap="round" />
            <path d="M24 13 50 28" stroke="#cee5a8" strokeWidth="2" strokeLinecap="round" />
            <path d="M-32 0a32 18 0 0 0 64 0v5a32 18 0 0 1-64 0z" fill="#1b2c20" stroke="#4d6743" strokeWidth="1" />
            <ellipse rx="32" ry="18" fill={`url(#${id}-lens)`} stroke="#1b2b1c" strokeWidth="4" />
            <ellipse rx="32" ry="18" stroke="#d8f2ae" strokeWidth="1" />
            <ellipse rx="26" ry="14" stroke="#c6ff34" strokeWidth=".8" opacity=".7" />
            <path d="M-19-6Q-5-17 15-9" stroke="#f2ffe0" strokeWidth="2" strokeLinecap="round" opacity=".8" />
            <path d="M-7 0H7M0-4V4" className={s.crosshair} />
          </g>
        </g>
      </g>
    </svg>
    <span id={`${id}-desc`} className={s.srOnly}>An isometric audit table separates into data, connections, and blueprint layers. A magnifying lens inspects the schema, relationships are traced, and the layers align into a completed engineering blueprint.</span>
  </figure>;
});
