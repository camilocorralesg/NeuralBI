'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import s from './ArchitectBuildScene.module.css';

// All horizontal surfaces share the same 30-degree isometric camera.
const diamond = (x, y, radius) => `${x},${y - radius * .57735} ${x + radius},${y} ${x},${y + radius * .57735} ${x - radius},${y}`;
const lanes = ['M149 178l12 7 12-7', 'M277 178l10 6 10-6'];

function Platform({ x, radius = 52, fill }) {
  const front = 178 + radius * .57735;
  return <g strokeLinejoin="round">
    <polygon points={diamond(x, 188, radius + 5)} fill="#000" opacity=".5" />
    <path d={`M${x - radius} 178 ${x} ${front}v8l-${radius}-${radius * .57735}z`} className={s.leftFace} />
    <path d={`M${x} ${front} ${x + radius} 178v8l-${radius} ${radius * .57735}z`} className={s.rightFace} />
    <polygon points={diamond(x, 178, radius)} fill={fill} className={s.platformEdge} />
    <polygon points={diamond(x, 178, radius - 8)} className={s.platformInset} />
    <path d={`M${x - radius} 182 ${x} ${front + 4} ${x + radius} 182`} className={s.seam} />
  </g>;
}

function DatabaseSlice({ y, className, fill }) {
  return <g className={className}>
    <path d={`M70 ${y}v13a27 15 0 0 0 54 0v-13z`} fill={fill} className={s.dbEdge} />
    <ellipse cx="97" cy={y} rx="27" ry="15" className={s.dbTop} />
    <path d={`M76 ${y + 15}q21 12 42 0`} className={s.dbSeam} />
    <path d={`M112 ${y + 12}l5-2`} className={s.dbLed} />
  </g>;
}

function AppPiece({ index, children }) {
  return <g className={s.appPiece} style={{ '--delay': `${index * .55}s` }}>{children}</g>;
}

const DEFAULT_LABEL = 'Architect & Build: from data to application';
const DEFAULT_DESCRIPTION = "An isometric software workshop connects a semantic database, a data filter, and a custom application. Records align, irregular inputs become three structured modules, and those modules assemble the application's navigation, form, and data table before activation.";

// `label` and `description` let the host localise what assistive technology announces.
export const ArchitectBuildScene = memo(function ArchitectBuildScene({ label = DEFAULT_LABEL, description = DEFAULT_DESCRIPTION }) {
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

  return <figure ref={ref} className={s.scene} data-running="false" aria-label={label} aria-describedby={`${id}-desc`}>
    <svg viewBox="18 22 430 222" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-graphite`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#354031" /><stop offset="1" stopColor="#101b15" /></linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#91a77f" /><stop offset=".3" stopColor="#516b43" /><stop offset="1" stopColor="#243c28" /></linearGradient>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#edf4dd" /><stop offset="1" stopColor="#a9c08c" /></linearGradient>
        <radialGradient id={`${id}-ground`}><stop stopColor="#859b4e" stopOpacity=".12" /><stop offset="1" stopColor="#859b4e" stopOpacity="0" /></radialGradient>
        <clipPath id={`${id}-screen`}><rect x="4" y="4" width="90" height="105" rx="2" /></clipPath>
      </defs>
      <ellipse cx="237" cy="193" rx="214" ry="46" fill={`url(#${id}-ground)`} />
      <g className={s.survey}><path d="m38 191 59 34 64-37M167 191l58 34 58-34M291 195l72 41 72-41" />{[65, 97, 129, 193, 225, 257, 327, 363, 399].map(x => <path key={x} d={`m${x} 221 4-2.3`} />)}</g>
      {lanes.map((d, i) => <g key={d}><path d={d} className={s.lane} /><path d={d} pathLength="100" className={i === 0 ? s.sourceFlow : s.buildFlow} /></g>)}
      <Platform x={97} fill={`url(#${id}-graphite)`} />
      <Platform x={225} fill={`url(#${id}-graphite)`} />
      <Platform x={363} radius={66} fill={`url(#${id}-graphite)`} />

      {/* Semantic layer: separated records settle into a single data source. */}
      <ellipse cx="97" cy="167" rx="32" ry="17" fill="#050b06" opacity=".7" />
      <DatabaseSlice y={150} fill={`url(#${id}-metal)`} />
      <DatabaseSlice y={131} fill={`url(#${id}-metal)`} className={s.dbMiddle} />
      <DatabaseSlice y={112} fill={`url(#${id}-metal)`} className={s.dbUpper} />
      <g className={s.dbUpper}><ellipse cx="97" cy="112" rx="21" ry="11.5" className={s.dbCap} /><path d="m84 112 13-7 13 7-13 7z" className={s.dbGlyph} /><path d="M97 105v14m-13-7h26" className={s.dbGlyph} /></g>

      {/* Refinement: uneven inputs converge through a physical filter. */}
      <ellipse cx="225" cy="174" rx="30" ry="15" fill="#050b06" opacity=".65" />
      <path d="M199 113 217 149v8q8 7 16 0v-8l18-36z" fill={`url(#${id}-metal)`} className={s.filterEdge} />
      <path d="m225 127-8 22v8q8 7 16 0v-8l18-36" className={s.filterShade} />
      <ellipse cx="225" cy="113" rx="26" ry="15" fill={`url(#${id}-paper)`} className={s.filterLip} />
      <ellipse cx="225" cy="113" rx="19" ry="10.5" className={s.filterWell} />
      <path d="m211 112 14-8 14 8m-22 5 8-5 8 5" className={s.filterMesh} />
      <path d="M219 156q6 4 12 0" className={s.filterExit} />
      {[{ x: 210, y: 81, dx: 15, dy: 32, angle: -12 }, { x: 228, y: 66, dx: -3, dy: 47, angle: 9 }, { x: 240, y: 90, dx: -15, dy: 23, angle: -6 }].map((p, i) => <g key={i} transform={`translate(${p.x} ${p.y})`}><g className={s.rawInput} style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--delay': `${i * .18}s` }}><path d="m0-4 7 4-7 4-7-4zM-7 0v5l7 4 7-4V0M0 4v5" transform={`rotate(${p.angle})`} className={s.rawChip} /></g></g>)}

      {/* Screen and foot are on one vertical isometric plane. */}
      <path d="m337 172 26-15 26 15-26 15z" className={s.standFoot} />
      <path d="m357 146 11 6v25l-11-6z" className={s.standStem} />
      <g className={s.application}>
        <path d="m310 50 5-3 85 49v114l-5 3-85-49z" className={s.screenBack} />
        <g transform="matrix(.8660254 .5 0 1 310 50)">
          <rect width="98" height="114" rx="3" fill={`url(#${id}-paper)`} className={s.screenEdge} />
          <g clipPath={`url(#${id}-screen)`}>
            <path d="M4 18H94" className={s.uiRule} /><rect x="8" y="8" width="6" height="5" rx="1" className={s.uiLogo} /><path d="M19 10.5H48" className={s.uiTitle} /><circle cx="86" cy="10" r="2" className={s.uiLogo} />
            <g className={s.wireframe}><rect x="8" y="24" width="16" height="76" rx="1" /><rect x="30" y="24" width="58" height="31" rx="1" /><rect x="30" y="62" width="58" height="38" rx="1" /></g>
            <AppPiece index={0}><rect x="8" y="24" width="16" height="76" rx="1" className={s.navigation} /><rect x="11" y="30" width="10" height="5" rx=".5" className={s.selectedNav} /><path d="M12 43h8m-8 8h5m-5 8h8m-8 8h6" className={s.navLines} /></AppPiece>
            <AppPiece index={1}><rect x="30" y="24" width="58" height="31" rx="1" className={s.uiPanel} /><path d="M35 30H58" className={s.uiTitle} /><rect x="35" y="36" width="32" height="6" rx=".6" className={s.inputField} /><rect x="71" y="36" width="11" height="6" rx=".6" className={s.action} /><path d="M35 48H75" className={s.uiRule} /></AppPiece>
            <AppPiece index={2}><rect x="30" y="62" width="58" height="38" rx="1" className={s.uiPanel} /><path d="M31 70H87" className={s.uiRule} /><path d="M35 66H48m8 0h9m7 0h10" className={s.tableHeader} />{[77, 85, 93].map(y => <g key={y}><path d={`M35 ${y}H48m8 0h9`} className={s.tableRow} /><rect x="73" y={y - 2} width="8" height="3" rx=".7" className={s.status} /></g>)}</AppPiece>
            <g className={s.live}><circle cx="11" cy="107" r="1.5" className={s.liveDot} /><path d="M16 107H38m45-1 2 2 4-5" className={s.liveMark} /></g>
          </g>
        </g>
      </g>
      {/* The same three refined pieces arrive just before each UI module resolves. */}
      {[{ x: 99, y: -38 }, { x: 136, y: -38 }, { x: 136, y: 2 }].map((destination, i) => <g key={i} transform="translate(225 158)"><g className={s.transfer} style={{ '--delay': `${i * .55}s`, '--end-x': `${destination.x}px`, '--end-y': `${destination.y}px` }}><path d="m0-4 9 5v4l-9 5-9-5v-4z" className={s.cleanSide} /><path d="m0-4 9 5-9 5-9-5z" className={s.cleanTop} /><path d="m-3 1 3 1.8L4 .5" className={s.cleanMark} /></g></g>)}
    </svg>
    <span id={`${id}-desc`} className={s.srOnly}>{description}</span>
  </figure>;
});
