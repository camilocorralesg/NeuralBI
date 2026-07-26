'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SECTION 8: METHODOLOGY (THE DEPLOYMENT PROTOCOL) ───
// Isometric CSS Diagrams for Methodology Phases
// Fully Animated, Style-Specific Isometric SVG/CSS Diagrams for all 15 variants (5 versions * 3 phases)
function MethodologyDiagram({ phase, activeHero }) {
  const colorAccent = '#c6ff34';
  const effectiveHero = activeHero === 'remix' ? (
    phase === 2 ? 'spline1' : (phase === 3 ? 'modern_v2' : 'tech_v4')
  ) : activeHero;

  const animationStyles = `
    @keyframes float-p1 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes float-p2 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes float-p3 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes pulse-ring-slow {
      0% { transform: scale(0.85); opacity: 0.6; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes pulse-node {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.4); opacity: 1; }
    }
    @keyframes rotate-radar {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes brutalist-strobe {
      0%, 100% { opacity: 0.1; }
      48%, 52% { opacity: 0.1; }
      50% { opacity: 1; }
    }
    @keyframes brutalist-slider-1 {
      0%, 100% { transform: scaleY(0.3); }
      50% { transform: scaleY(0.9); }
    }
    @keyframes brutalist-slider-2 {
      0%, 100% { transform: scaleY(0.7); }
      50% { transform: scaleY(0.2); }
    }
    @keyframes brutalist-slider-3 {
      0%, 100% { transform: scaleY(0.4); }
      50% { transform: scaleY(0.95); }
    }
    @keyframes modern-laser {
      0%, 100% { transform: translateY(-20px); opacity: 0; }
      10%, 90% { opacity: 1; }
      50% { transform: translateY(20px); }
    }
    @keyframes modern-bar-1 {
      0%, 100% { height: 25px; }
      50% { height: 70px; }
    }
    @keyframes modern-bar-2 {
      0%, 100% { height: 60px; }
      50% { height: 30px; }
    }
    @keyframes modern-bar-3 {
      0%, 100% { height: 40px; }
      50% { height: 80px; }
    }
    @keyframes tech-dash {
      to { stroke-dashoffset: -20; }
    }
    @keyframes tech-led {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
    @keyframes tech-wave {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes sui-blob-morph {
      0%, 100% { border-radius: 50% 50% 50% 50%; }
      30% { border-radius: 60% 40% 55% 45%; }
      60% { border-radius: 45% 55% 40% 60%; }
    }
    @keyframes sui-bento-assemble {
      0%, 100% { transform: translate(0px, 0px); }
      50% { transform: translate(6px, 6px); }
    }
  `;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{animationStyles}</style>

      {/* ─── NEBULA VERSION (spline1) ─── */}
      {effectiveHero === 'spline1' && phase === 1 && (
        <div style={{ position: 'relative', width: '220px', height: '160px', transform: 'rotateX(60deg) rotateZ(-45deg)', animation: 'float-p1 5s ease-in-out infinite' }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: '25px', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: '50px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%' }} />

          {/* Orbital nodes */}
          <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: colorAccent, boxShadow: `0 0 12px ${colorAccent}`, transform: 'translateX(-50%)', animation: 'pulse-node 2s infinite' }} />
          <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: colorAccent, boxShadow: `0 0 12px ${colorAccent}`, transform: 'translateY(-50%)', animation: 'pulse-node 2s infinite 1s' }} />
        </div>
      )}

      {effectiveHero === 'spline1' && phase === 2 && (
        <div style={{ position: 'relative', width: '160px', height: '180px' }}>
          {/* 3 Circular Glass Discs floating at staggered offset */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '10px', width: '140px', height: '60px',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%',
            background: 'rgba(255,255,255,0.01)', transform: 'rotateX(60deg)',
            animation: 'float-p3 4s ease-in-out infinite 0.5s'
          }} />
          <div style={{
            position: 'absolute', bottom: '60px', left: '10px', width: '140px', height: '60px',
            border: `1px solid ${colorAccent}`, borderRadius: '50%',
            background: 'rgba(198, 255, 52, 0.02)', transform: 'rotateX(60deg)',
            boxShadow: `0 0 30px rgba(198,255,52,0.05)`,
            animation: 'float-p1 4s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute', bottom: '100px', left: '10px', width: '140px', height: '60px',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)', transform: 'rotateX(60deg)',
            backdropFilter: 'blur(2px)',
            animation: 'float-p2 4s ease-in-out infinite 1s'
          }} />
        </div>
      )}

      {effectiveHero === 'spline1' && phase === 3 && (
        <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Radar Scanner Console */}
          <div style={{ position: 'relative', width: '140px', height: '140px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%', background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ position: 'absolute', inset: '20px', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: '40px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%' }} />
            {/* Center Node */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '10px', height: '10px', borderRadius: '50%', background: colorAccent, boxShadow: `0 0 10px ${colorAccent}`, transform: 'translate(-50%, -50%)' }} />

            {/* Sweeping Line */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', width: '70px', height: '2px',
              background: `linear-gradient(to right, transparent, ${colorAccent})`,
              transformOrigin: '0% 50%',
              animation: 'rotate-radar 4s linear infinite'
            }} />
          </div>
        </div>
      )}


      {/* ─── CINEMATIC VERSION (cinematic) ─── */}
      {effectiveHero === 'cinematic' && phase === 1 && (
        <div style={{ position: 'relative', width: '200px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Brutalist linear diamond grid */}
          <div style={{
            width: '120px', height: '120px', border: '1px solid #ffffff',
            transform: 'rotateX(60deg) rotateZ(45deg)', position: 'relative'
          }}>
            {/* Blinking corner nodes */}
            <div style={{ position: 'absolute', top: '-5px', left: '-5px', width: '10px', height: '10px', background: colorAccent, animation: 'brutalist-strobe 1s steps(1) infinite' }} />
            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', width: '10px', height: '10px', background: colorAccent, animation: 'brutalist-strobe 1s steps(1) infinite 0.5s' }} />
            <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '10px', height: '10px', background: '#ffffff', animation: 'brutalist-strobe 1.5s steps(1) infinite' }} />
            <div style={{ position: 'absolute', bottom: '-5px', left: '-5px', width: '10px', height: '10px', background: '#ffffff', animation: 'brutalist-strobe 1.5s steps(1) infinite 0.75s' }} />
          </div>
        </div>
      )}

      {effectiveHero === 'cinematic' && phase === 2 && (
        <div style={{ position: 'relative', width: '180px', height: '160px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px' }}>
          {/* Brutalist Rising Cubes */}
          <div style={{ width: '25px', height: '100px', background: '#ffffff', transformOrigin: 'bottom', animation: 'brutalist-slider-1 2s ease-in-out infinite' }} />
          <div style={{ width: '25px', height: '100px', background: colorAccent, transformOrigin: 'bottom', animation: 'brutalist-slider-2 2s ease-in-out infinite' }} />
          <div style={{ width: '25px', height: '100px', background: '#3f3f46', transformOrigin: 'bottom', animation: 'brutalist-slider-3 2s ease-in-out infinite' }} />
        </div>
      )}

      {effectiveHero === 'cinematic' && phase === 3 && (
        <div style={{ position: 'relative', width: '200px', height: '160px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '15px' }}>
          {/* Strobe binary cell grid */}
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} style={{
              border: '1px solid rgba(255,255,255,0.1)',
              background: i % 3 === 0 ? colorAccent : 'transparent',
              opacity: i % 2 === 0 ? 0.8 : 0.2,
              animation: i % 5 === 0 ? 'brutalist-strobe 0.8s steps(1) infinite' : i % 3 === 0 ? 'brutalist-strobe 1.2s steps(1) infinite 0.3s' : 'none'
            }} />
          ))}
        </div>
      )}


      {/* ─── MODERN V2 VERSION (modern_v2) ─── */}
      {effectiveHero === 'modern_v2' && phase === 1 && (
        <div style={{ position: 'relative', width: '240px', height: '180px' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Draw pathways */}
            <path id="p1_track" d="M 40,90 Q 120,40 200,90 Q 120,140 40,90 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

            {/* Connecting lines */}
            <line x1="40" y1="90" x2="120" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="200" y1="90" x2="120" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Nodes */}
            <circle cx="40" cy="90" r="6" fill="#c6ff34" />
            <circle cx="200" cy="90" r="6" fill="#c6ff34" />
            <circle cx="120" cy="90" r="8" fill="#ffffff" />

            {/* Traversing packet */}
            <circle r="4" fill="#ffffff">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 40,90 Q 120,40 200,90 Q 120,140 40,90 Z" />
            </circle>
          </svg>
        </div>
      )}

      {effectiveHero === 'modern_v2' && phase === 2 && (
        <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Sliding Glass Card Stacks */}
          <div style={{
            position: 'absolute', width: '120px', height: '100px',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
            background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(5px)',
            transform: 'rotateX(55deg) rotateY(-15deg)',
            animation: 'float-p1 4s ease-in-out infinite'
          }} />

          {/* Inner rotating gear element */}
          <div style={{
            position: 'absolute', width: '60px', height: '60px',
            border: `2px dashed ${colorAccent}`, borderRadius: '50%',
            transform: 'rotateX(55deg) rotateY(-15deg)',
            animation: 'rotate-radar 8s linear infinite',
            boxShadow: `0 0 15px rgba(198,255,52,0.1)`
          }} />

          <div style={{
            position: 'absolute', width: '120px', height: '100px',
            border: `1px solid ${colorAccent}`, borderRadius: '16px',
            background: 'rgba(198, 255, 52, 0.03)', backdropFilter: 'blur(5px)',
            transform: 'rotateX(55deg) rotateY(-15deg) translateZ(40px)',
            animation: 'float-p2 4s ease-in-out infinite'
          }} />
        </div>
      )}

      {effectiveHero === 'modern_v2' && phase === 3 && (
        <div style={{ position: 'relative', width: '220px', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '15px' }}>
          {/* Animated 3D chart bars with horizontal scanner */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center', height: '100px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', position: 'relative' }}>

            <div style={{ width: '25px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', animation: 'modern-bar-1 3s ease-in-out infinite' }} />
            <div style={{ width: '25px', background: colorAccent, borderRadius: '4px', boxShadow: `0 0 15px ${colorAccent}`, animation: 'modern-bar-2 3s ease-in-out infinite' }} />
            <div style={{ width: '25px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', animation: 'modern-bar-3 3s ease-in-out infinite' }} />

            {/* Horizontal sweep laser */}
            <div style={{
              position: 'absolute', left: 0, right: 0, height: '2px',
              background: `linear-gradient(90deg, transparent, ${colorAccent}, transparent)`,
              boxShadow: `0 0 10px ${colorAccent}`,
              animation: 'modern-laser 3s ease-in-out infinite'
            }} />
          </div>
        </div>
      )}


      {/* ─── TECH V4 VERSION (tech_v4) ─── */}
      {effectiveHero === 'tech_v4' && phase === 1 && (
        <div style={{ position: 'relative', width: '240px', height: '180px' }}>
          {/* Marching Tech Dash Matrix */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <rect x="20" y="20" width="200" height="140" rx="6" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M 40,40 L 200,40 L 200,140 L 40,140 Z" fill="none" stroke={colorAccent} strokeWidth="1.5" strokeDasharray="10, 5" style={{ animation: 'tech-dash 2s linear infinite' }} />
            <path d="M 80,80 L 160,80 L 160,110 L 80,110 Z" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="5, 3" style={{ animation: 'tech-dash 3s linear infinite reverse' }} />

            <circle cx="40" cy="40" r="4" fill={colorAccent} />
            <circle cx="200" cy="40" r="4" fill={colorAccent} />
            <circle cx="200" cy="140" r="4" fill={colorAccent} />
            <circle cx="40" cy="140" r="4" fill={colorAccent} />
          </svg>
        </div>
      )}

      {effectiveHero === 'tech_v4' && phase === 2 && (
        <div style={{ position: 'relative', width: '220px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Mainframe rack console with blinking LEDs */}
          <div style={{ width: '140px', height: '120px', border: '1px solid rgba(255,255,255,0.1)', background: '#09090b', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.3)' }}>SYS_UNIT_02</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: colorAccent, animation: 'tech-led 1s infinite' }}>ONLINE</span>
            </div>

            {/* Blinking LED Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: i % 4 === 0 ? colorAccent : '#27272a',
                  boxShadow: i % 4 === 0 ? `0 0 6px ${colorAccent}` : 'none',
                  animation: i % 3 === 0 ? 'tech-led 0.6s infinite' : i % 5 === 0 ? 'tech-led 1.2s infinite 0.4s' : 'none'
                }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {effectiveHero === 'tech_v4' && phase === 3 && (
        <div style={{ position: 'relative', width: '200px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Concentric expanding telemetry waves */}
          <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', animation: 'tech-wave 3s linear infinite' }} />
          <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(198,255,52,0.01)', border: `1px solid ${colorAccent}`, animation: 'tech-wave 3s linear infinite 1s' }} />
          <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', animation: 'tech-wave 3s linear infinite 2s' }} />

          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colorAccent, boxShadow: `0 0 10px ${colorAccent}`, zIndex: 2 }} />
        </div>
      )}


      {/* ─── SUI FORK VERSION (sui_fork) ─── */}
      {effectiveHero === 'sui_fork' && phase === 1 && (
        <div style={{ position: 'relative', width: '220px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Organic Morphing Liquid Blob */}
          <div style={{
            width: '100px', height: '100px', background: 'rgba(198,255,52,0.06)',
            border: `1px solid ${colorAccent}`, boxShadow: `0 0 35px rgba(198,255,52,0.15)`,
            animation: 'sui-blob-morph 4s ease-in-out infinite, float-p1 5s ease-in-out infinite',
            position: 'relative'
          }}>
            {/* Orbiting particles */}
            <div style={{ position: 'absolute', top: '20px', left: '10px', width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff' }} />
            <div style={{ position: 'absolute', bottom: '20px', right: '15px', width: '6px', height: '6px', borderRadius: '50%', background: colorAccent, boxShadow: `0 0 6px ${colorAccent}` }} />
          </div>
        </div>
      )}

      {effectiveHero === 'sui_fork' && phase === 2 && (
        <div style={{ position: 'relative', width: '200px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Assembling Bento Cards Illustration */}
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.01)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '45px', height: '45px',
              border: `1px solid ${colorAccent}`, borderRadius: '12px',
              background: 'rgba(198, 255, 52, 0.02)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 0.5s'
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.01)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 1.5s'
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 1s'
            }} />
          </div>
        </div>
      )}

      {effectiveHero === 'sui_fork' && phase === 3 && (
        <div style={{ position: 'relative', width: '220px', height: '180px' }}>
          {/* Bento loop trace with animated motion particle */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path id="infinity_loop" d="M 40,90 C 40,50 110,50 110,90 C 110,130 180,130 180,90 C 180,50 110,50 110,90 C 110,130 40,130 40,90 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <path d="M 40,90 C 40,50 110,50 110,90 C 110,130 180,130 180,90" fill="none" stroke={colorAccent} strokeWidth="1.5" strokeDasharray="15, 60" style={{ animation: 'tech-dash 4s linear infinite' }} />

            <circle r="4" fill="#ffffff" filter="drop-shadow(0 0 6px #c6ff34)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 40,90 C 40,50 110,50 110,90 C 110,130 180,130 180,90 C 180,50 110,50 110,90 C 110,130 40,130 40,90 Z" />
            </circle>
          </svg>
        </div>
      )}
    </div>
  );
}

function MethodologyDiagramStub({ phase, activeHero }) {
  return <MethodologyDiagram phase={phase} activeHero={activeHero} />;
}


// ─── SECTION 8: METHODOLOGY (THE DEPLOYMENT PROTOCOL) ───
function Methodology({ activeHero }) {
  const [activePhase, setActivePhase] = useState(0);
  const phases = [
    {
      num: "01",
      title: "Audit & Blueprint",
      desc: "We map your data infrastructure, identify latency bottlenecks, and define the strategic roadmap for maximum ROI."
    },
    {
      num: "02",
      title: "Architect & Build",
      desc: "We construct the semantic layer, clean datasets, and build custom Power Apps tailored to your exact operational reality."
    },
    {
      num: "03",
      title: "Deploy & Scale",
      desc: "We launch intuitive dashboards, train your team, and activate Copilot environments to ensure exponential growth."
    }
  ];

  const colorAccent = '#c6ff34';
  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'tech_v4' : activeHero;

  if (displayHero === 'spline1') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, color: '#ffffff', marginBottom: '1.5rem' }}>
              The Neural Protocol.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.08)' }}>
            {phases.map((p, index) => {
              const isEven = index % 2 === 0;
              const textBlock = (
                <div style={{ flex: 1, padding: '3.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    Phase {p.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: '#ffffff', marginBottom: '1.2rem', fontWeight: 400 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '1.1rem' }}>
                    {p.desc}
                  </p>
                </div>
              );

              const diagramBlock = (
                <div style={{
                  flex: 1,
                  borderLeft: isEven ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  borderRight: !isEven ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: 'center',
                  position: 'relative',
                  minHeight: '260px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                    FIG_0{p.num} // NEURAL_PROT_SPEC
                  </div>
                  <MethodologyDiagram phase={index + 1} activeHero={activeHero} />
                </div>
              );

              return (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  borderBottom: index < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                }}>
                  {textBlock}
                  {diagramBlock}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'cinematic') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', marginBottom: '6rem', alignItems: 'end' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: 'uppercase' }}>
                The Neural Protocol.
              </h2>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '550px' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid rgba(255,255,255,0.08)' }}>
            {phases.map((p, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                borderRight: index < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none'
              }}>
                {/* Diagram Cell */}
                <div style={{
                  padding: '3rem 2rem',
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                    FIG_0{p.num} // CORE_NODE
                  </div>
                  <MethodologyDiagram phase={index + 1} activeHero={activeHero} />
                </div>
                {/* Text Content Cell */}
                <div style={{ padding: '3rem 2rem', flex: 1, background: '#000000', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent, fontWeight: 700 }}>
                    PHASE {p.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', lineHeight: 1.6, fontSize: '1rem' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'modern_v2') {

    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem' }}>
              The Neural Protocol.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
            {/* Step Selection Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {phases.map((p, index) => {
                const isActive = activePhase === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActivePhase(index)}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '1.5rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 8px 30px rgba(198, 255, 52, 0.04)' : 'none'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isActive ? '#c6ff34' : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#000000' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s'
                    }}>
                      {p.num}
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                      transition: 'all 0.3s'
                    }}>
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Display Console Grid */}
            <div style={{
              background: 'rgba(255,255,255,0.01)',
              backdropFilter: 'blur(45px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '24px',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }} className="sui-card-hover">
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '250px', height: '250px', background: '#c6ff34', filter: 'blur(130px)', opacity: 0.06, pointerEvents: 'none' }} />

              <div key={activePhase} className="animate-blur-reveal" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Console Illustration Box */}
                <div style={{
                  height: '240px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                    FIG_0{phases[activePhase].num} // ACTIVE_RENDER
                  </div>
                  <MethodologyDiagram phase={activePhase + 1} activeHero={activeHero} />
                </div>

                {/* Console Metadata Text */}
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Protocol Stage {phases[activePhase].num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    {phases[activePhase].title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                    {phases[activePhase].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'tech_v4') {
    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative'
          }}>
            {/* Crosshair markers */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', transform: 'translate(-50%, -50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', transform: 'translate(50%, -50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '10px', height: '10px', transform: 'translate(-50%, 50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', transform: 'translate(50%, 50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '10px', height: '10px', transform: 'translate(-50%, -50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>

            {/* Box 1 (top-left): Header box */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0 }}
              style={{
                padding: '4rem 3rem',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1 }}>
                The Neural Protocol.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.5)', marginTop: '1.5rem', lineHeight: 1.6 }}>
                A surgically precise deployment process. Zero guesswork.
              </p>
            </motion.div>

            {/* Box 2 (top-right): Phase 01 */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.15 }}
              style={{
                padding: '3.5rem 3rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {!isRemix && (
                <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                  FIG_01 // SECURE_FLOW
                </div>
              )}
              <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                <MethodologyDiagram phase={1} activeHero={activeHero} />
              </div>
              <div>
                {!isRemix && (
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent }}>
                    STAGE_01 // BLUEPRINT_AUDIT
                  </span>
                )}
                <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                  {phases[0].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {phases[0].desc}
                </p>
              </div>
            </motion.div>

            {/* Box 3 (bottom-left): Phase 02 */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.3 }}
              style={{
                padding: '3.5rem 3rem',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {!isRemix && (
                <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                  FIG_02 // LAYER_STACK
                </div>
              )}
              <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                <MethodologyDiagram phase={2} activeHero={activeHero} />
              </div>
              <div>
                {!isRemix && (
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent }}>
                    STAGE_02 // ARCHITECT_BUILD
                  </span>
                )}
                <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                  {phases[1].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {phases[1].desc}
                </p>
              </div>
            </motion.div>

            {/* Box 4 (bottom-right): Phase 03 */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.45 }}
              style={{
                padding: '3.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {!isRemix && (
                <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                  FIG_03 // SCALE_TELEMETRY
                </div>
              )}
              <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                <MethodologyDiagram phase={3} activeHero={activeHero} />
              </div>
              <div>
                {!isRemix && (
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent }}>
                    STAGE_03 // DEPLOY_SCALE
                  </span>
                )}
                <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                  {phases[2].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {phases[2].desc}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          gridAutoFlow: 'dense'
        }}>

          {/* Title Bento Card (Span 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              gridColumn: 'span 2',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '4rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative'
            }} className="sui-card-hover"
          >
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              The Neural Protocol.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', marginTop: '1.2rem', lineHeight: 1.6, maxWidth: '500px' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </motion.div>

          {/* Phase 1 Bento Card (Span 1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(198, 255, 52, 0.3)' }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Giant Background Number */}
            <div style={{ position: 'absolute', right: '-10%', bottom: '-10%', fontFamily: 'var(--font-display)', fontSize: '12rem', color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', lineHeight: 1 }}>
              01
            </div>

            <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
              FIG_01 // AUDIT
            </div>
            <div style={{ height: '120px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MethodologyDiagram phase={1} activeHero={activeHero} />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.8rem' }}>
                {phases[0].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {phases[0].desc}
              </p>
            </div>
          </motion.div>

          {/* Phase 2 Bento Card (Span 1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(198, 255, 52, 0.3)' }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Giant Background Number */}
            <div style={{ position: 'absolute', right: '-10%', bottom: '-10%', fontFamily: 'var(--font-display)', fontSize: '12rem', color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', lineHeight: 1 }}>
              02
            </div>
            <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
              FIG_02 // BUILD
            </div>
            <div style={{ height: '120px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MethodologyDiagram phase={2} activeHero={activeHero} />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.8rem' }}>
                {phases[1].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {phases[1].desc}
              </p>
            </div>
          </motion.div>

          {/* Phase 3 Bento Card (Span 2 Columns, diagram left, text right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(198, 255, 52, 0.3)' }}
            style={{
              gridColumn: 'span 2',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '3rem',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.8fr',
              gap: '2.5rem',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Giant Background Number */}
            <div style={{ position: 'absolute', right: '-5%', bottom: '-20%', fontFamily: 'var(--font-display)', fontSize: '16rem', color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', lineHeight: 1 }}>
              03
            </div>

            <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
              FIG_03 // SCALE
            </div>
            <div style={{ height: '180px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MethodologyDiagram phase={3} activeHero={activeHero} />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.8rem' }}>
                {phases[2].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '1rem' }}>
                {phases[2].desc}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );

}

export default memo(Methodology);
