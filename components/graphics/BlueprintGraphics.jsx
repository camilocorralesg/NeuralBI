'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import styles from './BlueprintGraphics.module.css';
import { useLanguage } from '../../context/LanguageContext';

function GraphicFrame({ kind, hovered, title, before, after, description, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const visibility = () => { element.dataset.pageVisible = String(!document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => { element.dataset.running = String(entry.isIntersecting); },
      { threshold: 0.1 },
    );
    visibility();
    if (observer) observer.observe(element);
    else element.dataset.running = 'true';
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  return (
    <figure ref={ref} className={`${styles.graphic} ${styles[kind]}`} data-running="false" data-emphasis={hovered ? 'true' : 'false'}>
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.heading}><i />{title}<span className={styles.headingRule} /></div>
        <svg className={styles.canvas} viewBox="0 0 280 140" fill="none">{children}</svg>
        <div className={styles.caption}>
          <span className={styles.before}>{before}</span>
          <span className={styles.after}><i />{after}</span>
        </div>
      </div>
      <figcaption className={styles.srOnly}>{description}</figcaption>
    </figure>
  );
}

function Connection({ d, outgoing = false }) {
  return <>
    <path d={d} className={styles.connection} />
    <path d={d} pathLength="100" className={`${styles.packet} ${outgoing ? styles.outgoing : ''}`} />
  </>;
}

export const AiNativeGraphic = memo(function AiNativeGraphic({ hovered = false }) {
  const id = useId();
  const { t } = useLanguage();
  const g = t.graphics?.ai || {
    title: 'Autonomous reasoning',
    before: 'Enterprise data ingress',
    after: 'Actionable business impact',
    desc: 'Data from two sources converges in an autonomous AI reasoning node and becomes business impact, represented by a dollar symbol.',
  };
  return (
    <GraphicFrame
      kind="ai"
      hovered={hovered}
      title={g.title}
      before={g.before}
      after={g.after}
      description={g.desc}
    >
      <defs>
        <radialGradient id={`${id}-coreGlow`} cx="50%" cy="50%" r="50%">
          <stop stopColor="#6366f1" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-impactGlow`} cx="50%" cy="50%" r="50%">
          <stop stopColor="var(--graphic-accent)" stopOpacity="0.25" />
          <stop offset="65%" stopColor="var(--graphic-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-nodeFill`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#131926" />
          <stop offset="100%" stopColor="#080c14" />
        </linearGradient>
        <linearGradient id={`${id}-sealFill`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#141d2d" />
          <stop offset="100%" stopColor="#070b13" />
        </linearGradient>
      </defs>

      {/* Architectural Grid */}
      <path d="M16 38H264M16 70H264M16 102H264" className={styles.grid} />

      {/* Tenant Boundary */}
      <path d="M84 22V118" className={styles.shieldLine} />

      {/* Connection Tracks */}
      <Connection d="M52 38C84 38 104 70 140 70" />
      <Connection d="M52 102C84 102 104 70 140 70" />
      <Connection d="M160 70H210" outgoing />

      {/* ─── LEFT: SOURCE NODES ─── */}
      <g>
        <rect x="18" y="27" width="34" height="22" rx="5" fill={`url(#${id}-nodeFill)`} className={styles.sourceCapsule} />
        <circle cx="26" cy="38" r="1.5" className={styles.capsuleLed} />
        <path d="M32 34h12M32 42h8" className={styles.capsuleLines} />
        <circle cx="52" cy="38" r="1.5" className={styles.portDot} />
        <text x="35" y="58" textAnchor="middle" className={styles.nodeLabel}>ERP</text>
      </g>
      <g>
        <rect x="18" y="91" width="34" height="22" rx="5" fill={`url(#${id}-nodeFill)`} className={styles.sourceCapsule} />
        <circle cx="26" cy="102" r="1.5" className={styles.capsuleLed} />
        <path d="M32 98h12M32 106h8" className={styles.capsuleLines} />
        <circle cx="52" cy="102" r="1.5" className={styles.portDot} />
        <text x="35" y="122" textAnchor="middle" className={styles.nodeLabel}>CRM</text>
      </g>

      {/* ─── CENTER: REASONING CORE ─── */}
      <g transform="translate(140, 70)">
        <circle cx="0" cy="0" r="36" fill={`url(#${id}-coreGlow)`} className={styles.coreHalo} />

        {/* Dial Ticks */}
        <g className={styles.dialTicks}>
          <line x1="0" y1="-30" x2="0" y2="-26" />
          <line x1="0" y1="26" x2="0" y2="30" />
          <line x1="-30" y1="0" x2="-26" y2="0" />
          <line x1="26" y1="0" x2="30" y2="0" />
        </g>

        {/* Orbit Ring */}
        <circle cx="0" cy="0" r="24" className={styles.coreOrbit} />

        {/* Chassis */}
        <circle cx="0" cy="0" r="18" className={styles.coreChassis} />

        {/* Hex Aperture */}
        <polygon points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7" className={styles.reasoningHex} />

        {/* Core Photon */}
        <circle cx="0" cy="0" r="3" className={styles.coreDot} />
      </g>

      {/* ─── RIGHT: IMPACT SEAL ─── */}
      <g transform="translate(232, 70)">
        <circle cx="0" cy="0" r="38" fill={`url(#${id}-impactGlow)`} className={styles.impactHalo} />
        <circle cx="0" cy="0" r="22" className={styles.impactRipple} />
        <circle cx="0" cy="0" r="22" className={styles.sealOuterRing} />
        <circle cx="0" cy="0" r="19" fill={`url(#${id}-sealFill)`} className={styles.sealBody} />
        <circle cx="0" cy="0" r="16" className={styles.sealInnerRim} />
        <text x="0" y="7" textAnchor="middle" className={styles.impactDollar}>$</text>
      </g>
    </GraphicFrame>
  );
});

export const WarpSpeedGraphic = memo(function WarpSpeedGraphic({ hovered = false }) {
  const id = useId();
  const { t } = useLanguage();
  const g = t.graphics?.speed || {
    title: 'Time to value',
    before: 'Traditional delivery · quarters',
    after: 'Accelerated delivery · weeks',
    desc: 'A slow delivery baseline gives way to an accelerating curve. Quarter markers become week markers as the curve reaches deployment.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    weeks: ['WK 1', 'WK 2', 'WK 3', 'LIVE'],
  };
  const curve = 'M22 108C100 108 152 80 235 24';
  return (
    <GraphicFrame kind="speed" hovered={hovered} title={g.title} before={g.before} after={g.after} description={g.desc}>
      <defs>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--graphic-accent)" stopOpacity="0.19" /><stop offset="1" stopColor="var(--graphic-accent)" stopOpacity="0" /></linearGradient>
        <radialGradient id={`${id}-finish`}><stop stopColor="var(--graphic-accent)" stopOpacity="0.23" /><stop offset="1" stopColor="var(--graphic-accent)" stopOpacity="0" /></radialGradient>
      </defs>
      <path d="M22 28H258M22 68H258M22 108H258" className={styles.grid} />
      {[55, 110, 165, 235].map((x, index) => (
        <g key={x} className={styles.timeColumn} style={{ '--shift': `${index === 3 ? 0 : -(index + 1) * 5}px` }}>
          <path d={`M${x} 24V110`} className={styles.timeGuide} />
          <text x={x} y="131" textAnchor="middle" className={`${styles.microLabel} ${styles.quarterLabel}`}>{g.quarters[index]}</text>
          <text x={x} y="131" textAnchor="middle" className={`${styles.microLabel} ${styles.weekLabel}`}>{g.weeks[index]}</text>
        </g>
      ))}
      <path d="M22 108L55 101L235 99" className={styles.baseline} />
      <circle cx="55" cy="101" r="3" className={styles.slowPoint} />
      <path d={`${curve}V108H22Z`} fill={`url(#${id}-area)`} className={styles.velocityArea} />
      <path d={curve} pathLength="100" className={styles.velocityCurve} />
      <path d={curve} pathLength="100" className={styles.velocityHighlight} />
      <g className={styles.deployPoint}>
        <circle cx="235" cy="24" r="23" fill={`url(#${id}-finish)`} />
        <circle cx="235" cy="24" r="8" className={styles.finishRing} />
        <circle cx="235" cy="24" r="3" className={styles.finishDot} />
      </g>
    </GraphicFrame>
  );
});

export const ZeroFrictionGraphic = memo(function ZeroFrictionGraphic({ hovered = false }) {
  const id = useId();
  const { t } = useLanguage();
  const g = t.graphics?.adoption || {
    title: 'Designed for adoption',
    before: 'Scattered components',
    after: 'One intuitive experience',
    desc: 'Four scattered interface modules align into a clear dashboard: an efficiency indicator, a chart, a data table, and a synchronized action.',
    efficiency: 'EFFICIENCY',
    unbound: 'UNBOUND',
    synced: 'SYNCED',
  };
  return (
    <GraphicFrame kind="adoption" hovered={hovered} title={g.title} before={g.before} after={g.after} description={g.desc}>
      <defs>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="0.8" y2="1"><stop stopColor="var(--graphic-surface-light)" /><stop offset="1" stopColor="var(--graphic-surface)" /></linearGradient>
      </defs>
      <rect x="31" y="14" width="218" height="112" rx="12" className={styles.assemblyGuide} />
      <path d="M140 23V117M40 70H240" className={styles.assemblyCross} />
      <g className={styles.tile} style={{ '--dx': '-8px', '--dy': '-6px', '--angle': '-3deg', '--order': 0 }}>
        <rect x="39" y="22" width="95" height="43" rx="7" fill={`url(#${id}-tile)`} className={styles.tileSurface} />
        <text x="49" y="35" className={styles.tileLabel}>{g.efficiency}</text>
        <path d="M49 47h72" className={styles.meterTrack} />
        <path d="M49 47h72" pathLength="100" className={styles.meterFill} />
        <circle cx="120" cy="33" r="2" className={styles.tileIndicator} />
      </g>
      <g className={styles.tile} style={{ '--dx': '8px', '--dy': '-5px', '--angle': '3deg', '--order': 1 }}>
        <rect x="144" y="22" width="95" height="43" rx="7" fill={`url(#${id}-tile)`} className={styles.tileSurface} />
        {[9, 17, 13, 24, 29].map((height, index) => <rect key={index} x={158 + index * 14} y={56 - height} width="7" height={height} rx="1.5" className={styles.bar} style={{ '--order': index }} />)}
      </g>
      <g className={styles.tile} style={{ '--dx': '-7px', '--dy': '6px', '--angle': '2deg', '--order': 2 }}>
        <rect x="39" y="75" width="95" height="43" rx="7" fill={`url(#${id}-tile)`} className={styles.tileSurface} />
        {[86, 96, 106].map((y, index) => <g key={y}>
          <circle cx="51" cy={y} r="1.5" className={styles.tableDot} />
          <path d={`M59 ${y}h${[42, 56, 32][index]}`} className={styles.tableLine} />
        </g>)}
      </g>
      <g className={styles.tile} style={{ '--dx': '7px', '--dy': '6px', '--angle': '-3deg', '--order': 3 }}>
        <rect x="144" y="75" width="95" height="43" rx="7" fill={`url(#${id}-tile)`} className={styles.tileSurface} />
        <rect x="157" y="86" width="69" height="21" rx="5" className={styles.syncButton} />
        <text x="191.5" y="99.5" textAnchor="middle" className={`${styles.syncText} ${styles.unbound}`}>{g.unbound}</text>
        <g className={styles.synced}>
          <path d="m166 96 3 3 5-5" className={styles.syncCheck} />
          <text x="198" y="99.5" textAnchor="middle" className={styles.syncText}>{g.synced}</text>
        </g>
      </g>
    </GraphicFrame>
  );
});
