'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import styles from './BlueprintGraphics.module.css';

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
  return (
    <GraphicFrame
      kind="ai"
      hovered={hovered}
      title="Autonomous reasoning"
      before="Enterprise data ingress"
      after="Actionable business impact"
      description="Data from two sources converges in an autonomous AI reasoning node and becomes business impact, represented by a dollar symbol."
    >
      <defs>
        {/* Atmospheric Ambient Glows */}
        <radialGradient id={`${id}-coreGlow`} cx="50%" cy="50%" r="50%">
          <stop stopColor="var(--graphic-accent)" stopOpacity="0.25" />
          <stop offset="55%" stopColor="#6366f1" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-impactGlow`} cx="50%" cy="50%" r="50%">
          <stop stopColor="var(--graphic-accent)" stopOpacity="0.32" />
          <stop offset="55%" stopColor="var(--graphic-accent)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--graphic-accent)" stopOpacity="0" />
        </radialGradient>

        {/* Tactile Hardware Gradients */}
        <linearGradient id={`${id}-nodeSurface`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#131926" />
          <stop offset="100%" stopColor="#070b13" />
        </linearGradient>
        <linearGradient id={`${id}-sealSurface`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#151f30" />
          <stop offset="100%" stopColor="#070b13" />
        </linearGradient>
      </defs>

      {/* Swiss Architectural Registration Marks */}
      <g className={styles.cornerMarks}>
        <path d="M12 16h6M15 13v6" />
        <path d="M262 16h6M265 13v6" />
        <path d="M12 124h6M15 121v6" />
        <path d="M262 124h6M265 121v6" />
      </g>

      {/* Discrete Architectural Telemetry Grid */}
      <path d="M16 38H264M16 70H264M16 102H264" className={styles.grid} />

      {/* Tenant Boundary Line */}
      <path d="M84 20V120" className={styles.shieldLine} />

      {/* High-Precision Hermite Connection Tracks */}
      <Connection d="M54 38C88 38 106 70 140 70" />
      <Connection d="M54 102C88 102 106 70 140 70" />
      <Connection d="M160 70H206" outgoing />

      {/* ─── LEFT: MINIMALIST TRANSCEIVERS ─── */}
      {/* Source 1 (ERP Stream) */}
      <g className={styles.sourceGroup}>
        <rect x="20" y="27" width="34" height="22" rx="5" fill={`url(#${id}-nodeSurface)`} className={styles.sourceCapsule} />
        <circle cx="27" cy="38" r="1.5" className={styles.capsuleLed} />
        <path d="M33 35h12M33 41h8" className={styles.capsuleLines} />
        <circle cx="54" cy="38" r="1.5" className={styles.portDot} />
        <text x="37" y="59" textAnchor="middle" className={styles.nodeLabel}>ERP</text>
      </g>

      {/* Source 2 (CRM Stream) */}
      <g className={styles.sourceGroup}>
        <rect x="20" y="91" width="34" height="22" rx="5" fill={`url(#${id}-nodeSurface)`} className={styles.sourceCapsule} />
        <circle cx="27" cy="102" r="1.5" className={styles.capsuleLed} />
        <path d="M33 99h12M33 105h8" className={styles.capsuleLines} />
        <circle cx="54" cy="102" r="1.5" className={styles.portDot} />
        <text x="37" y="123" textAnchor="middle" className={styles.nodeLabel}>CRM</text>
      </g>

      {/* ─── CENTER: AUTONOMOUS REASONING APERTURE ─── */}
      <g className={styles.coreGroup}>
        {/* Ambient Breathing Core Aura */}
        <circle cx="140" cy="70" r="38" fill={`url(#${id}-coreGlow)`} className={styles.coreHalo} />

        {/* Precision Dial Ticks (Swiss Watch Aesthetic) */}
        <g className={styles.dialTicks}>
          <line x1="140" y1="38" x2="140" y2="42" />
          <line x1="140" y1="98" x2="140" y2="102" />
          <line x1="108" y1="70" x2="112" y2="70" />
          <line x1="168" y1="70" x2="172" y2="70" />
          <line x1="118" y1="48" x2="121" y2="51" />
          <line x1="159" y1="89" x2="162" y2="92" />
          <line x1="118" y1="92" x2="121" y2="89" />
          <line x1="159" y1="51" x2="162" y2="48" />
        </g>

        {/* Rotating Telemetry Orbit Ring */}
        <circle cx="140" cy="70" r="26" className={styles.coreOrbit} />

        {/* Structural Core Chassis */}
        <circle cx="140" cy="70" r="20" className={styles.coreChassis} />

        {/* Crystalline Causal Aperture Hex */}
        <polygon points="140,55 153,62.5 153,77.5 140,85 127,77.5 127,62.5" className={styles.reasoningHex} />
        <circle cx="140" cy="70" r="11" className={styles.innerAperture} />

        {/* Fine Optical Crosshair Reticle */}
        <path d="M136 70h8M140 66v8" className={styles.coreCrosshair} />

        {/* Coherent Core Photon */}
        <circle cx="140" cy="70" r="3" className={styles.coreDot} />
      </g>

      {/* ─── RIGHT: SCULPTED IMPACT DISC SEAL ─── */}
      <g className={styles.impactSealGroup}>
        {/* Dynamic Dual Shockwave Flares */}
        <circle cx="230" cy="70" r="44" fill={`url(#${id}-impactGlow)`} className={styles.impactHalo} />
        <circle cx="230" cy="70" r="24" className={styles.impactShockwave} />
        <circle cx="230" cy="70" r="24" className={styles.impactShockwaveSecond} />

        {/* Tactile Beveled Seal Medallion */}
        <circle cx="230" cy="70" r="24" className={styles.sealOuterRing} />

        {/* Precision Indexing Notches */}
        <g className={styles.sealNotches}>
          <line x1="230" y1="46" x2="230" y2="49" />
          <line x1="230" y1="91" x2="230" y2="94" />
          <line x1="206" y1="70" x2="209" y2="70" />
          <line x1="251" y1="70" x2="254" y2="70" />
        </g>

        <circle cx="230" cy="70" r="21" fill={`url(#${id}-sealSurface)`} className={styles.sealBody} />
        <circle cx="230" cy="70" r="18" className={styles.sealInnerRim} />

        {/* High-Impact Dollar Glyph */}
        <text x="230" y="78" textAnchor="middle" className={styles.impactDollar}>$</text>
      </g>
    </GraphicFrame>
  );
});

export const WarpSpeedGraphic = memo(function WarpSpeedGraphic({ hovered = false }) {
  const id = useId();
  const curve = 'M22 108C100 108 152 80 235 24';
  return (
    <GraphicFrame kind="speed" hovered={hovered} title="Time to value" before="Traditional delivery · quarters" after="Accelerated delivery · weeks" description="A slow delivery baseline gives way to an accelerating curve. Quarter markers become week markers as the curve reaches deployment.">
      <defs>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--graphic-accent)" stopOpacity="0.19" /><stop offset="1" stopColor="var(--graphic-accent)" stopOpacity="0" /></linearGradient>
        <radialGradient id={`${id}-finish`}><stop stopColor="var(--graphic-accent)" stopOpacity="0.23" /><stop offset="1" stopColor="var(--graphic-accent)" stopOpacity="0" /></radialGradient>
      </defs>
      <path d="M22 28H258M22 68H258M22 108H258" className={styles.grid} />
      {[55, 110, 165, 235].map((x, index) => (
        <g key={x} className={styles.timeColumn} style={{ '--shift': `${index === 3 ? 0 : -(index + 1) * 5}px` }}>
          <path d={`M${x} 24V110`} className={styles.timeGuide} />
          <text x={x} y="131" textAnchor="middle" className={`${styles.microLabel} ${styles.quarterLabel}`}>Q{index + 1}</text>
          <text x={x} y="131" textAnchor="middle" className={`${styles.microLabel} ${styles.weekLabel}`}>{index === 3 ? 'LIVE' : `WK ${index + 1}`}</text>
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
  return (
    <GraphicFrame kind="adoption" hovered={hovered} title="Designed for adoption" before="Scattered components" after="One intuitive experience" description="Four scattered interface modules align into a clear dashboard: an efficiency indicator, a chart, a data table, and a synchronized action.">
      <defs>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="0.8" y2="1"><stop stopColor="var(--graphic-surface-light)" /><stop offset="1" stopColor="var(--graphic-surface)" /></linearGradient>
      </defs>
      <rect x="31" y="14" width="218" height="112" rx="12" className={styles.assemblyGuide} />
      <path d="M140 23V117M40 70H240" className={styles.assemblyCross} />
      <g className={styles.tile} style={{ '--dx': '-8px', '--dy': '-6px', '--angle': '-3deg', '--order': 0 }}>
        <rect x="39" y="22" width="95" height="43" rx="7" fill={`url(#${id}-tile)`} className={styles.tileSurface} />
        <text x="49" y="35" className={styles.tileLabel}>EFFICIENCY</text>
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
        <text x="191.5" y="99.5" textAnchor="middle" className={`${styles.syncText} ${styles.unbound}`}>UNBOUND</text>
        <g className={styles.synced}>
          <path d="m166 96 3 3 5-5" className={styles.syncCheck} />
          <text x="198" y="99.5" textAnchor="middle" className={styles.syncText}>SYNCED</text>
        </g>
      </g>
    </GraphicFrame>
  );
});
