'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ManifestoScenes.module.css';

// One orthographic camera, shared by every physical surface and its printed detail.
const project = (x, y, z = 0) => [210 + (x - y) * .8660254, 159 + (x + y) * .5 - z];
const point = (...coordinates) => project(...coordinates).join(',');
const plane = (x, y, width, depth, z = 0) => [point(x, y, z), point(x + width, y, z), point(x + width, y + depth, z), point(x, y + depth, z)].join(' ');
const route = (coordinates) => coordinates.map((p, i) => `${i ? 'L' : 'M'}${point(...p)}`).join(' ');
const surface = (x, y, z) => { const [px, py] = project(x, y, z); return `matrix(.8660254 .5 -.8660254 .5 ${px} ${py})`; };
const upright = (x, y, z) => { const [px, py] = project(x, y, z); return `matrix(.8660254 .5 0 1 ${px} ${py})`; };

function Slab({ x, y, width, depth, z = 0, thickness = 6, material = 'dark', id }) {
  return <g className={styles.slab}>
    <polygon points={[point(x, y + depth, z), point(x + width, y + depth, z), point(x + width, y + depth, z - thickness), point(x, y + depth, z - thickness)].join(' ')} className={styles.frontFace} />
    <polygon points={[point(x + width, y, z), point(x + width, y + depth, z), point(x + width, y + depth, z - thickness), point(x + width, y, z - thickness)].join(' ')} className={styles.sideFace} />
    <polygon points={plane(x, y, width, depth, z)} fill={`url(#${id}-${material})`} className={styles.topFace} />
  </g>;
}

function Track({ coordinates, delay = 0 }) {
  return <g>
    <path d={route(coordinates)} className={styles.track} />
    <path d={route(coordinates)} pathLength="100" className={styles.packet} style={{ animationDelay: `${delay}s` }} />
  </g>;
}

function Scene({ kind, hovered, children }) {
  const id = useId().replaceAll(':', '');
  const ref = useRef(null);
  const { t } = useLanguage();
  const copy = t.graphics[kind];
  // The isometric scenes can carry their own description; the 2D blueprint graphics keep `desc`.
  const description = copy.sceneDesc || copy.desc;
  useEffect(() => {
    const element = ref.current;
    const visibility = () => { element.dataset.pageVisible = String(!document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      records => { element.dataset.running = String(records[records.length - 1].isIntersecting); }, { threshold: .15 },
    );
    visibility();
    if (observer) observer.observe(element);
    else element.dataset.running = 'true';
    document.addEventListener('visibilitychange', visibility);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  return <figure ref={ref} className={styles.scene} data-kind={kind} data-running="false" data-emphasis={String(hovered)} aria-label={`${copy.title}: ${copy.before} → ${copy.after}`}
    aria-describedby={description ? `${id}-desc` : undefined}>
    <div className={styles.sceneTitle}>{copy.title}</div>
    <svg viewBox="0 0 420 300" fill="none" aria-hidden="true" className={styles.canvas}>
      <defs>
        <linearGradient id={`${id}-dark`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--scene-metal)" /><stop offset="1" stopColor="var(--color-paper-2)" />
        </linearGradient>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="var(--color-ink)" /><stop offset="1" stopColor="var(--scene-paper)" />
        </linearGradient>
        <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--scene-paper)" /><stop offset="1" stopColor="var(--scene-accent)" />
        </linearGradient>
        <linearGradient id={`${id}-result`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--color-ink)" /><stop offset="1" stopColor="var(--scene-result)" />
        </linearGradient>
        <radialGradient id={`${id}-light`}>
          <stop stopColor="var(--scene-accent)" stopOpacity=".14" /><stop offset="1" stopColor="var(--scene-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="198" rx="190" ry="89" fill={`url(#${id}-light)`} />
      <g className={styles.world}>
        <polygon points={plane(-102, -88, 204, 176, -15)} className={styles.ground} />
        {[-68, -34, 0, 34, 68].map((n) => <g key={n} className={styles.grid}>
          <path d={route([[-102, n, -15], [102, n, -15]])} /><path d={route([[n, -88, -15], [n, 88, -15]])} />
        </g>)}
        {children(id, copy)}
      </g>
    </svg>
    <figcaption className={styles.caption}><span>{copy.before}</span><span className={styles.captionArrow} aria-hidden="true">↗</span><span>{copy.after}</span></figcaption>
    {description && <span id={`${id}-desc`} className={styles.srOnly}>{description}</span>}
  </figure>;
}

// Screen offset of a world point, without the camera origin: used to draw objects around (0, 0) and move them.
const iso = (x, y, z = 0) => [(x - y) * .8660254, (x + y) * .5 - z];
const face = (...corners) => corners.map((corner) => iso(...corner).join(',')).join(' ');

// A ground route, drawn once; the cargo that travels it is a DataCube.
function Route({ coordinates }) {
  return <path d={route(coordinates)} className={styles.track} />;
}

// A small isometric cube that rides a route on its own beat of the shared clock. Waypoints are screen positions
// handed to the keyframes as custom properties, so every cube shares one set of beats.
function DataCube({ coordinates, beat, tone = 'reason', delay = 0, size = 7 }) {
  const ground = coordinates.map(([x, y, z]) => project(x, y, z));
  const middle = coordinates.length > 2 ? ground[1] : [(ground[0][0] + ground[1][0]) / 2, (ground[0][1] + ground[1][1]) / 2];
  const [start, end] = [ground[0], ground[ground.length - 1]];
  const h = size / 2;
  return <g className={`${styles.cube} ${beat} ${tone === 'act' ? styles.cubeAct : ''}`} style={{
    '--x0': `${start[0]}px`, '--y0': `${start[1]}px`, '--x1': `${middle[0]}px`, '--y1': `${middle[1]}px`,
    '--x2': `${end[0]}px`, '--y2': `${end[1]}px`, animationDelay: `${delay}s`,
  }}>
    <polygon points={face([-h, h, size], [h, h, size], [h, h, 0], [-h, h, 0])} className={styles.cubeFront} />
    <polygon points={face([h, -h, size], [h, h, size], [h, h, 0], [h, -h, 0])} className={styles.cubeSide} />
    <polygon points={face([-h, -h, size], [h, -h, size], [h, h, size], [-h, h, size])} className={styles.cubeTop} />
  </g>;
}

// Upright cylinder in the same orthographic camera: an isometric circle of radius r spans 1.2247r × 0.7071r.
function Disk({ x, y, z, height, r }) {
  const [cx, top] = project(x, y, z);
  const bottom = top + height;
  const rx = r * 1.2247;
  const ry = r * .7071;
  return <g>
    <path d={`M${cx - rx} ${top}V${bottom}A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom}V${top}Z`} className={styles.diskSide} />
    <ellipse cx={cx} cy={top} rx={rx} ry={ry} className={styles.diskTop} />
    <path d={`M${cx - rx} ${bottom - 3}A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom - 3}`} className={styles.diskRecord} />
  </g>;
}

const ROUTES = {
  documents: [[-76, 0, -6], [-30, 0, -6]],
  records: [[-40, 60, -6], [-12, 60, -6], [-12, 30, -6]],
  leak: [[-22, -30, -6], [-22, -83, -6]],
  invoice: [[10, 30, -6], [10, 54, -6]],
  supplier: [[30, 16, -6], [62, 16, -6]],
  impact: [[80, 12, -6], [80, -27, -6]],
};

/*
 * Results-driven autonomous AI: one causal chain on a 12s clock, narrated by the caption.
 *  8–24  ingress   internal records and documents travel into the agent as indigo data
 * 24–40  reason    the core lifts, its circuit traces draw and a scan crosses the chip
 * 40–56  contain   a cube heading for the public model breaks on the tenant wall; the lock closes
 * 54–68  execute   the agent emits volt work: the invoice is stamped, a supplier route is chosen
 * 68–92  impact    the chosen route feeds the KPI tower, bars rise and the trend draws
 */
export const AiNativeScene = memo(function AiNativeScene({ hovered = false }) {
  return <Scene kind="ai" hovered={hovered}>{(id) => <>
    {Object.values(ROUTES).map((coordinates) => <Route key={coordinates.flat().join()} coordinates={coordinates} />)}

    {/* Beyond the tenant wall: the public model the data never reaches, and the path it would have taken. */}
    <path d={route([[-22, -86, 18], [-22, -114, 30]])} className={styles.leakPath} />
    <g className={styles.publicModel} transform={`translate(${project(-22, -130, 36).join(' ')})`}>
      <circle r="14" /><ellipse rx="6" ry="14" /><path d="M-14 0H14M-11.8-7H11.8M-11.8 7H11.8" />
    </g>

    {/* Cargo rides under the objects, so pedestals and plinths occlude it where they should. */}
    <DataCube coordinates={ROUTES.documents} beat={styles.ingest} />
    <DataCube coordinates={ROUTES.records} beat={styles.ingest} delay={.3} />
    <DataCube coordinates={ROUTES.leak} beat={styles.leakBeat} />
    <DataCube coordinates={ROUTES.invoice} beat={styles.dispatch} tone="act" />
    <DataCube coordinates={ROUTES.supplier} beat={styles.dispatch} tone="act" delay={.25} />
    <DataCube coordinates={ROUTES.impact} beat={styles.feed} tone="act" />

    <g className={styles.tenantWall}>
      <polygon points={[point(-54, -84, -15), point(10, -84, -15), point(10, -84, 26), point(-54, -84, 26)].join(' ')} className={styles.wallPane} />
      <polygon points={[point(-54, -84, -15), point(10, -84, -15), point(10, -84, 26), point(-54, -84, 26)].join(' ')} className={styles.wallFlash} />
      <path d={route([[-54, -84, 26], [10, -84, 26]])} className={styles.wallEdge} />
      <g transform={upright(-22, -84, 12)} className={styles.lock}>
        <path d="M-4.5 -1V-5A4.5 4.5 0 0 1 4.5 -5V-1" className={styles.shackle} /><rect x="-7" y="-1" width="14" height="11" rx="2" /><circle cx="0" cy="4" r="1.4" />
      </g>
    </g>

    {/* Ingress: a document set and a record store. */}
    <g>
      {[0, 1, 2].map((sheet) => <Slab key={sheet} id={id} x={-101 + sheet * 2} y={-12 - sheet * 2} width={24} depth={28} z={4 + sheet * 5} thickness={3} material="paper" />)}
      <g transform={surface(-97, -16, 14)} className={styles.docPrint}><path d="M4 5H16M4 10H18M4 15H13M4 20H17" /></g>
    </g>
    <g>
      {[0, 1, 2].map((disk) => <Disk key={disk} x={-56} y={60} z={10 + disk * 11} height={9} r={14} />)}
    </g>

    {/* The agent: pedestal, reasoning layer whose traces draw in, and a core that lifts inside its orbit. */}
    <Slab id={id} x={-30} y={-30} width={60} depth={60} z={2} thickness={9} />
    <g>
      <Slab id={id} x={-25} y={-25} width={50} depth={50} z={26} thickness={5} />
      <g transform={surface(-21, -21, 26)} className={styles.circuit}>
        <path d="M0 9H12L21 21H42M8 42V29L21 21V0M21 21L34 34H42M21 21L33 8H42" className={styles.circuitBase} />
        <path d="M0 9H12L21 21H42M8 42V29L21 21V0M21 21L34 34H42M21 21L33 8H42" pathLength="100" className={styles.trace} />
        {[[0, 9], [8, 42], [21, 0], [34, 34], [33, 8]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />)}
      </g>
      <path d={route([[-17, 17, 45], [-17, 17, 26]])} className={styles.guide} />
      <path d={route([[17, -17, 45], [17, -17, 26]])} className={styles.guide} />
    </g>
    <g className={styles.coreChip}>
      <Slab id={id} x={-17} y={-17} width={34} depth={34} z={52} thickness={7} material="accent" />
      <g transform={surface(-17, -17, 52)}>
        <path d="M17 5C18 13 21 16 29 17C21 18 18 21 17 29C16 21 13 18 5 17C13 16 16 13 17 5Z" className={styles.spark} />
        <path d="M9 -3V1M17 -3V1M25 -3V1M-3 9H1M-3 17H1M-3 25H1" className={styles.pins} />
        <path d="M1 0H33" className={styles.scan} />
      </g>
      <g transform={surface(-34, -34, 40)}><circle cx="34" cy="34" r="34" pathLength="100" className={styles.orbit} /></g>
    </g>
    {/* The decision: a volt ring leaves the core the moment it commits to work. */}
    <g transform={surface(-34, -34, 46)}><circle cx="34" cy="34" r="34" className={styles.decision} /></g>

    {/* Impact: KPI tower with a rising trend. */}
    <g>
      <Slab id={id} x={52} y={-63} width={36} depth={36} z={6} thickness={7} />
      {[16, 28, 42].map((height, index) => <g key={height} className={styles.bar} style={{ '--order': index }}>
        <Slab id={id} x={56 + index * 10} y={-56} width={8} depth={20} z={6 + height} thickness={height} material={index === 2 ? 'result' : 'paper'} />
      </g>)}
      <path d={route([[54, -58, 32], [64, -58, 42], [74, -58, 48], [86, -58, 62]])} pathLength="100" className={styles.trend} />
    </g>

    {/* Execute: a supplier route is chosen and an invoice is reconciled. */}
    <g className={styles.action}>
      <Slab id={id} x={64} y={14} width={32} depth={32} z={2} thickness={6} />
      <g transform={surface(64, 14, 2)}>
        <path d="M16 16V2M16 16H30M16 16V30" className={styles.routeIdle} />
        <path d="M16 16V2" pathLength="100" className={styles.routeChosen} />
        <circle cx="16" cy="16" r="3" className={styles.routeHub} />
      </g>
    </g>
    <g className={styles.action}>
      <Slab id={id} x={-2} y={54} width={36} depth={34} z={2} thickness={6} />
      <Slab id={id} x={3} y={58} width={26} depth={26} z={6} thickness={2} material="paper" />
      <g transform={surface(3, 58, 6)}>
        <path d="M4 5H14M4 10H20M4 15H17" className={styles.darkLine} />
        <g className={styles.stamp}><circle cx="18" cy="19" r="5.5" /><path d="M15.5 19L17.4 21L21 17" /></g>
      </g>
    </g>
  </>}</Scene>;
});

export const WarpSpeedScene = memo(function WarpSpeedScene({ hovered = false }) {
  return <Scene kind="speed" hovered={hovered}>{(id, copy) => <>
    <g transform={surface(-88, 65, -7)} className={styles.timeline}>
      <path d="M0 0H170" />
      {copy.quarters.map((label, i) => <g key={label}><path d={`M${i * 54} -3V3`} /><text x={i * 54} y="15">{label}</text></g>)}
    </g>
    <Track coordinates={[[-69, 26, -6], [-20, 26, -6], [-20, -1, -6], [55, -1, -6], [55, -36, -6]]} />
    <Slab id={id} x={-92} y={4} width={49} depth={46} z={3} thickness={8} />
    <g className={styles.parts}>
      {[[0, 0], [22, 0], [0, 21], [22, 21]].map(([x, y], index) => <g key={index} className={styles.module} style={{ '--delay': `${index * .23}s` }}>
        <Slab id={id} x={-88 + x} y={8 + y} width={18} depth={17} z={21} material={index === 3 ? 'accent' : 'paper'} thickness={5} />
        <path d={route([[-85 + x, 13 + y, 21], [-74 + x, 13 + y, 21]])} className={styles.darkLine} />
      </g>)}
    </g>
    <Slab id={id} x={-29} y={-25} width={57} depth={54} z={12} thickness={10} />
    <g className={styles.assembly}>
      <Slab id={id} x={-25} y={-21} width={49} depth={46} z={34} thickness={4} />
      <g transform={surface(-25, -21, 34)}><rect x="7" y="7" width="35" height="32" rx="3" className={styles.wire} /><path d="M7 16H42M18 16V39" className={styles.wire} /></g>
      <Slab id={id} x={-21} y={-17} width={41} depth={38} z={57} thickness={5} material="paper" />
      <g transform={surface(-21, -17, 57)}><rect x="5" y="5" width="31" height="6" rx="2" className={styles.printMuted} /><rect x="5" y="15" width="10" height="18" rx="2" className={styles.printAccent} /><path d="M20 18H32M20 24H32M20 30H28" className={styles.darkLine} /></g>
    </g>
    <Slab id={id} x={40} y={-70} width={59} depth={55} z={8} thickness={9} />
    <g className={styles.deployment}>
      <g transform={upright(42, -62, 110)}>
        <rect x="3" y="-3" width="59" height="92" rx="5" className={styles.screenBack} />
        <rect width="59" height="92" rx="5" fill={`url(#${id}-paper)`} />
        <path d="M0 15H59" className={styles.darkLine} />
        <circle cx="7" cy="7" r="1.6" className={styles.printMuted} /><path d="M13 7H29" className={styles.darkLine} />
        <rect x="7" y="23" width="45" height="24" rx="3" className={styles.printAccent} />
        <path d="M13 40L23 33L31 36L45 28" className={styles.darkLine} />
        <rect x="7" y="54" width="19" height="25" rx="2" className={styles.printMuted} /><path d="M32 57H50M32 64H50M32 71H45" className={styles.darkLine} />
        <circle cx="48" cy="85" r="13" className={styles.coin} /><path d="M42 85L46 89L54 80" className={styles.darkLine} />
      </g>
    </g>
    <g transform={surface(-88, 52, 0)} className={styles.fastTimeline}>
      <path d="M0 0H170" pathLength="100" />
      {copy.weeks.map((label, i) => <g key={label}><circle cx={i * 54} cy="0" r="2.5" /><text x={i * 54} y="-9">{label}</text></g>)}
    </g>
  </>}</Scene>;
});

export const ZeroFrictionScene = memo(function ZeroFrictionScene({ hovered = false }) {
  return <Scene kind="adoption" hovered={hovered}>{(id) => <>
    <Slab id={id} x={-48} y={-64} width={116} depth={74} z={2} thickness={9} />
    <Track coordinates={[[0, 9, -5], [0, 39, -5], [-64, 39, -5], [-64, 61, -5]]} delay={2.5} />
    <Track coordinates={[[0, 9, -5], [0, 77, -5]]} delay={2.7} />
    <Track coordinates={[[0, 9, -5], [0, 39, -5], [66, 39, -5], [66, 61, -5]]} delay={2.9} />
    <g transform={upright(-44, -51, 112)}>
      <rect x="4" y="-4" width="106" height="100" rx="5" className={styles.screenBack} />
      <rect width="106" height="100" rx="5" fill={`url(#${id}-paper)`} />
      <path d="M0 17H106" className={styles.darkLine} />
      <circle cx="9" cy="8" r="2" className={styles.printAccent} /><path d="M17 8H42M83 8H97" className={styles.darkLine} />
      <rect x="7" y="24" width="16" height="68" rx="2" className={styles.printMuted} />
      <path d="M11 32H19M11 40H19M11 48H19" className={styles.darkLine} />
      <g className={`${styles.interfaceModule} ${styles.metric}`}><rect x="29" y="24" width="30" height="27" rx="3" className={styles.panel} /><circle cx="44" cy="37" r="8" className={styles.progressRing} /><path d="M40 37L43 40L48 34" className={styles.darkLine} /></g>
      <g className={`${styles.interfaceModule} ${styles.chart}`}><rect x="64" y="24" width="34" height="27" rx="3" className={styles.panel} />{[9, 17, 22].map((h, i) => <rect key={h} x={70 + i * 8} y={47 - h} width="5" height={h} rx="1" className={styles.printAccent} />)}</g>
      <g className={`${styles.interfaceModule} ${styles.table}`}><rect x="29" y="57" width="69" height="21" rx="3" className={styles.panel} /><path d="M35 63H91M35 70H91M53 60V74" className={styles.darkLine} /></g>
      <g className={`${styles.interfaceModule} ${styles.action}`}><rect x="65" y="83" width="33" height="10" rx="3" className={styles.printAccent} /><path d="M75 88L78 91L84 85" className={styles.darkLine} /></g>
      <path d="M92 72L92 89L97 84L103 84Z" className={styles.cursor} />
    </g>
    {[[-64, 61], [0, 77], [66, 61]].map(([x, y], index) => <g key={x} className={styles.teammate} style={{ '--delay': `${index * .5}s` }}>
      <Slab id={id} x={x - 16} y={y - 14} width={32} depth={28} z={2} thickness={5} />
      <g transform={`translate(${project(x, y, 26).join(' ')})`}>
        <circle cy="-7" r="6" className={styles.person} /><path d="M-11 13V7A11 11 0 0 1 11 7V13Z" className={styles.person} />
        <circle cx="13" cy="9" r="7" className={styles.coin} /><path d="M10 9L12 11L16 7" className={styles.darkLine} />
      </g>
    </g>)}
  </>}</Scene>;
});
