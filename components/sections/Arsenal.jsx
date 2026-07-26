'use client';

import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline/next';
import TiltCard from '../TiltCard';
import FloatingLines from '../FloatingLines';

const powerBiLogo = '/assets/New_Power_BI_Logo.svg';
const powerAppsLogo = '/assets/Powerapps-logo.svg.svg';
const copilotStudioLogo = '/assets/Copilot Studio.svg';
const powerAutomateLogo = '/assets/Power Automate logo.svg';


const arsenalData = [
  {
    id: "power-bi",
    tool: "Power BI",
    title: "Data Experiences People Actually Use.",
    body: "Stop staring at dead metrics. We elevate enterprise Power BI into immersive, multimedia reporting experiences. Insights that explain why trends happen, not just what happened.",
    logo: powerBiLogo,
    color: "#F2C811",
    metric: "Enterprise Data Storytelling",
    specs: ["Beautiful Reports", "Semantic Modelling", "AI Storytelling"],
    architecture: "Enterprise Data Storytelling",
    cta: "Explore Dashboards 2.0 →"
  },
  {
    id: "power-apps",
    tool: "Power Apps",
    title: "Enterprise Apps Without Low-Code Limits.",
    body: "We eliminate the rigid boundaries of standard low-code. By pairing the speed and native security of Power Apps with custom React and TypeScript components, we engineer high-performance tools tailored to your exact operational workflows.",
    logo: powerAppsLogo,
    color: "#C73590",
    metric: "Canvas & Pro-Code Engineering",
    specs: ["React & PCF Code", "Model-Driven Flows", "Enterprise API"],
    architecture: "CANVAS & PRO-CODE ENGINEERING",
    cta: "Explore App Stack →"
  },
  {
    id: "power-automate",
    tool: "Power Automate",
    title: "Cognitive Automation & Migration.",
    body: "Eradicate paper trails and chaotic spreadsheets. We automate complex workflows by integrating advanced logic and AI for critical operational decisions.",
    logo: powerAutomateLogo,
    color: "#0066FF",
    metric: "Zero Manual Effort",
    specs: ["Legacy Migration", "Advanced Logic", "Data Sync"],
    architecture: "Neural Pathways"
  },
  {
    id: "copilot-studio",
    tool: "Copilot Studio",
    title: "ROI-Focused Autonomous Agents.",
    body: "Deploy AI agents that execute tasks, analyze local databases, and make strategic decisions. We build results-driven systems, not basic Q&A chatbots.",
    logo: copilotStudioLogo,
    color: "#107C41",
    metric: "AI Decisions",
    specs: ["Task Execution", "Local Analysis", "Strategic Focus"],
    architecture: "Cognitive Engine"
  }
];


// ─── POWER BI MODAL LIVE ANIMATIONS (3 CORE VALUE PILLARS) ───

// 1. AI Insights in Built Reports Overlay (3 Escenarios Expandidos - Awwwards Refined)
function PbiAiInsightsOverlayAnim() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [phase, setPhase] = useState(0); // 0: Scan, 1: Reasoning, 2: Word Fade, 3: Ripple Glow
  const [visibleWords, setVisibleWords] = useState(0);

  const scenarios = [
    {
      label: "EXECUTIVE OPS Q3",
      words: ["Retention", "expanded", "+42%", "via", "Direct", "Lake."],
      accentWord: "+42%",
      techWord: "Direct Lake.",
      glowPos: { top: '25px', left: '115px' }
    },
    {
      label: "FINANCIAL PERFORMANCE",
      words: ["Gross", "margin", "optimized", "+18.4%", "using", "DAX", "groups."],
      accentWord: "+18.4%",
      techWord: "DAX",
      glowPos: { top: '20px', left: '180px' }
    },
    {
      label: "INFRASTRUCTURE SLA",
      words: ["Query", "latency", "sub-second", "0.04ms", "on", "OneLake."],
      accentWord: "0.04ms",
      techWord: "OneLake.",
      glowPos: { top: '25px', left: '295px' }
    }
  ];

  const currentScenario = scenarios[scenarioIdx];

  useEffect(() => {
    let timer1, timer2, timer3;

    const runScenarioCycle = () => {
      setPhase(0);
      setVisibleWords(0);

      // Phase 0 -> 1: Laser sweep completes (850ms)
      timer1 = setTimeout(() => {
        setPhase(1);
      }, 850);

      // Phase 1 -> 2: Word-by-word fade-in (1300ms)
      timer2 = setTimeout(() => {
        setPhase(2);
        let wordIdx = 0;
        const wordInterval = setInterval(() => {
          wordIdx++;
          setVisibleWords(wordIdx);
          if (wordIdx >= currentScenario.words.length) {
            clearInterval(wordInterval);
            setPhase(3);
          }
        }, 180);
      }, 1300);

      // Phase 3 -> Reset & Next Scenario (4800ms)
      timer3 = setTimeout(() => {
        setScenarioIdx(prev => (prev + 1) % scenarios.length);
      }, 4800);
    };

    runScenarioCycle();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [scenarioIdx]);

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(242, 200, 17, 0.08), transparent 70%), linear-gradient(135deg, rgba(14, 18, 28, 0.96), rgba(6, 8, 14, 0.98))',
      border: '1px solid rgba(242, 200, 17, 0.35)',
      borderRadius: '16px',
      padding: '1.25rem',
      boxShadow: '0 16px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
      overflow: 'hidden'
    }}>
      {/* Header — Ultra Clean Awwwards Typography (No light dots, no slashes, no tags) */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 3 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.825rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Automated Reasoning Overlay
        </span>
      </div>

      {/* Main Container Layered Area */}
      <div style={{ position: 'relative', minHeight: '120px', borderRadius: '12px', overflow: 'hidden' }}>
        {/* Background Layer: Faint Blurred Built Enterprise Report Chart */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.16, filter: 'blur(1.5px)', pointerEvents: 'none' }}>
          <svg viewBox="0 0 320 120" fill="none" style={{ width: '100%', height: '100%' }}>
            <line x1="0" y1="30" x2="320" y2="30" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
            <line x1="0" y1="70" x2="320" y2="70" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

            <rect x="20" y="50" width="18" height="50" fill="#ffffff" opacity="0.6" rx="2" />
            <rect x="50" y="30" width="18" height="70" fill="#ffffff" opacity="0.8" rx="2" />
            <rect x="80" y="65" width="18" height="35" fill="#ffffff" opacity="0.5" rx="2" />
            <rect x="110" y="25" width="18" height="75" fill="#c6ff34" opacity="0.9" rx="2" />

            <path d="M140 75 Q 180 20, 220 55 T 300 25" stroke="#F2C811" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Vertical Neon Green Scanner Sweep Line Across Chart */}
        {phase === 0 && (
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(180deg, transparent, #c6ff34, transparent)',
            boxShadow: '0 0 14px #c6ff34',
            animation: 'pbi-scan-sweep 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 2,
            pointerEvents: 'none'
          }} />
        )}

        {/* Concentric Glow Ripple on Anomaly Target Point */}
        {(phase === 2 || phase === 3) && (
          <div style={{
            position: 'absolute',
            top: currentScenario.glowPos.top,
            left: currentScenario.glowPos.left,
            pointerEvents: 'none',
            zIndex: 2,
            transition: 'all 0.4s ease'
          }}>
            <span style={{
              display: 'block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#c6ff34',
              boxShadow: '0 0 14px #c6ff34',
              animation: 'pbi-pulse 1.2s infinite'
            }} />
            <span style={{
              position: 'absolute',
              top: '-7px',
              left: '-7px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '1.5px solid #c6ff34',
              animation: 'pbi-pulse 1.5s infinite',
              opacity: 0.6
            }} />
          </div>
        )}

        {/* Glass Overlay Card floating directly on top of report chart */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          background: 'rgba(10, 14, 22, 0.78)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          padding: '0.9rem 1.1rem',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
          margin: '8px'
        }}>
          {/* Header Row of Glass Card */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              {currentScenario.label}
            </span>
          </div>

          {/* Smooth Word-by-Word Fade-In Text */}
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.925rem',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.4,
            minHeight: '2.4em',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            {currentScenario.words.slice(0, visibleWords).map((word, wIdx) => {
              const isAccent = word === currentScenario.accentWord;
              const isTech = word.includes(currentScenario.techWord) || word === currentScenario.techWord;

              if (isAccent) {
                return (
                  <span
                    key={wIdx}
                    style={{
                      color: '#c6ff34',
                      fontWeight: 800,
                      background: 'rgba(198, 255, 52, 0.12)',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      border: '1px solid rgba(198, 255, 52, 0.3)',
                      boxShadow: '0 0 10px rgba(198, 255, 52, 0.15)',
                      display: 'inline-block'
                    }}
                  >
                    {word}
                  </span>
                );
              }

              return (
                <span
                  key={wIdx}
                  style={{
                    color: isTech ? '#F2C811' : '#ffffff',
                    fontWeight: isTech ? 700 : 500
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. High-Adoption UI/UX & Data Storytelling (2x2 Grid Cinematic Dashboard)
function PbiDataStorytellingUiAnim() {
  const [zoomPhase, setZoomPhase] = useState(0); // 0: Overview, 1: Adoption, 2: Margin, 3: OneLake, 4: Role Pie

  // Loop through camera focus phases (3.8s per phase)
  useEffect(() => {
    const timer = setInterval(() => {
      setZoomPhase(prev => (prev + 1) % 5);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Camera transforms for 2x2 Grid using Transform-Origin Focal Lock
  const cameraTransforms = [
    { scale: 1, origin: 'center center', label: 'EXECUTIVE OVERVIEW' },
    { scale: 1.82, origin: 'top left', label: 'ADOPTION NARRATIVE' },
    { scale: 1.82, origin: 'top right', label: 'MARGIN WATERFALL' },
    { scale: 1.82, origin: 'bottom left', label: 'ONELAKE ENGINE' },
    { scale: 1.82, origin: 'bottom right', label: 'ROLE-BASED DISTRIBUTION' }
  ];

  const currentCam = cameraTransforms[zoomPhase];

  // Depth of Field Focus States (Focal Plane Blur & Opacity)
  const getFocalStyle = (widgetId) => {
    const isFocused = zoomPhase === 0 || zoomPhase === widgetId;
    return {
      filter: isFocused ? 'blur(0px)' : 'blur(2.5px)',
      opacity: isFocused ? 1 : 0.3,
      transform: isFocused ? 'scale(1)' : 'scale(0.96)',
      border: zoomPhase === widgetId ? '1px solid #c6ff34' : '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: zoomPhase === widgetId ? '0 0 20px rgba(198, 255, 52, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
      transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  };

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(242, 200, 17, 0.06), transparent 70%), linear-gradient(135deg, rgba(12, 16, 24, 0.96), rgba(6, 8, 14, 0.98))',
      border: '1px solid rgba(242, 200, 17, 0.35)',
      borderRadius: '16px',
      padding: '1.25rem',
      boxShadow: '0 16px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
      overflow: 'hidden'
    }}>
      {/* Header — Clean Awwwards Typography (Only Title on Top Left) */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.825rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          High-Adoption Executive Dashboard
        </span>
      </div>

      {/* Cinematic Viewport Container with Generous Height for Equal Bottom Padding */}
      <div style={{
        position: 'relative',
        height: '185px',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(8, 12, 18, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
      }}>
        {/* Inner Moving Camera Canvas (2x2 Grid) */}
        <div style={{
          width: '100%',
          height: '100%',
          padding: '10px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '10px',
          transform: `scale(${currentCam.scale})`,
          transformOrigin: currentCam.origin,
          transition: 'transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 1.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Widget 1: Adoption Narrative (Top Left) */}
          <div style={{
            background: 'rgba(15, 22, 34, 0.88)',
            borderRadius: '8px',
            padding: '8px',
            ...getFocalStyle(1)
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.45)' }}>ADOPTION RATE</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#c6ff34', textShadow: zoomPhase === 1 ? '0 0 10px rgba(198,255,52,0.5)' : 'none' }}>98.4%</span>
            </div>
            <div style={{ height: '32px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
              <div style={{ flex: 1, height: '60%', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
              <div style={{ flex: 1, height: '80%', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }} />
              <div style={{ flex: 1, height: '70%', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }} />
              <div style={{
                flex: 1,
                height: '100%',
                background: 'linear-gradient(180deg, #c6ff34, rgba(198,255,52,0.4))',
                borderRadius: '2px',
                boxShadow: zoomPhase === 1 ? '0 0 12px #c6ff34' : '0 0 6px rgba(198,255,52,0.3)',
                transition: 'all 0.4s ease'
              }} />
            </div>
          </div>

          {/* Widget 2: Margin Waterfall (Top Right) */}
          <div style={{
            background: 'rgba(15, 22, 34, 0.88)',
            borderRadius: '8px',
            padding: '8px',
            ...getFocalStyle(2)
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.45)' }}>NET MARGIN</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#F2C811', textShadow: zoomPhase === 2 ? '0 0 10px rgba(242,200,17,0.5)' : 'none' }}>+34.2%</span>
            </div>
            <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <svg viewBox="0 0 120 30" fill="none" style={{ width: '100%', height: '100%' }}>
                <rect x="5" y="5" width="22" height="20" fill="rgba(255,255,255,0.4)" rx="2" />
                <rect x="35" y="8" width="22" height="10" fill="#F2C811" rx="2" />
                <rect x="65" y="10" width="22" height="8" fill="#c6ff34" rx="2" />
                <rect x="95" y="2" width="22" height="24" fill="url(#marginGrad)" rx="2" />
                <defs>
                  <linearGradient id="marginGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c6ff34" />
                    <stop offset="100%" stopColor="rgba(198,255,52,0.4)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Widget 3: OneLake Engine Mesh (Bottom Left) */}
          <div style={{
            background: 'rgba(15, 22, 34, 0.88)',
            borderRadius: '8px',
            padding: '8px',
            ...getFocalStyle(3)
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.45)' }}>ONELAKE MESH</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#c6ff34', textShadow: zoomPhase === 3 ? '0 0 10px rgba(198,255,52,0.5)' : 'none' }}>0.02s</span>
            </div>
            <div style={{ height: '28px', width: '100%' }}>
              <svg viewBox="0 0 120 28" fill="none" style={{ width: '100%', height: '100%' }}>
                <path d="M 0 20 C 30 20, 50 5, 75 12 C 100 19, 110 2, 120 8" stroke="#c6ff34" strokeWidth="2" fill="none" />
                <circle cx="75" cy="12" r="3" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 6px #c6ff34)' }} />
              </svg>
            </div>
          </div>

          {/* Widget 4: Role-Based Donut Chart (Bottom Right) */}
          <div style={{
            background: 'rgba(15, 22, 34, 0.88)',
            borderRadius: '8px',
            padding: '8px',
            ...getFocalStyle(4)
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.45)' }}>ROLE ENGAGEMENT</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textShadow: zoomPhase === 4 ? '0 0 10px rgba(255,255,255,0.5)' : 'none' }}>100%</span>
            </div>
            <div style={{ height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Glowing Donut SVG */}
              <svg viewBox="0 0 36 36" style={{ width: '28px', height: '28px', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4.5" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#F2C811" strokeWidth="4.5" strokeDasharray="30 88" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#c6ff34" strokeWidth="4.5" strokeDasharray="45 88" strokeDashoffset="-32" style={{ filter: zoomPhase === 4 ? 'drop-shadow(0 0 6px #c6ff34)' : 'none' }} />
              </svg>

              {/* Legend labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#c6ff34', fontWeight: 700 }}>Execs 52%</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#F2C811', fontWeight: 700 }}>Ops 48%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Advanced Semantic Modeling & Architecture (Sequential Growing Constellation Mesh)
function PbiSemanticModelGraphAnim() {
  const [meshStep, setMeshStep] = useState(0); // 0: Fact only, 1: Dim_Customer, 2: Dim_Time, 3: Dim_Store, 4: Dim_Product

  // Sequentially grow dimension constellation over time (2.6s per stage)
  useEffect(() => {
    const timer = setInterval(() => {
      setMeshStep(prev => (prev + 1) % 5);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 100%, rgba(242, 200, 17, 0.08), transparent 75%), linear-gradient(135deg, rgba(10, 14, 22, 0.98), rgba(4, 6, 12, 0.99))',
      border: '1px solid rgba(242, 200, 17, 0.35)',
      borderRadius: '16px',
      padding: '1.25rem',
      boxShadow: '0 16px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
      overflow: 'hidden'
    }}>
      {/* Header — Clean Awwwards Typography (Yellow Border Consistency) */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.825rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Advanced Semantic Architecture
        </span>
      </div>

      {/* 2.5D Isometric Dynamic Constellation Mesh Canvas */}
      <div style={{
        position: 'relative',
        height: '185px',
        width: '100%',
        borderRadius: '12px',
        background: 'rgba(6, 9, 15, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'inset 0 0 24px rgba(0,0,0,0.85)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justify: 'center'
      }}>
        <svg viewBox="0 0 340 160" fill="none" style={{ width: '100%', height: '160px' }}>
          <defs>
            <filter id="core-glow-mesh" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dynamic Vector Lines (Appear as meshStep progresses) */}
          {meshStep >= 1 && (
            <path d="M 55 45 Q 110 45, 170 80" stroke="rgba(242,200,17,0.4)" strokeWidth="1.5" strokeDasharray="3 3" style={{ transition: 'all 0.6s ease' }} />
          )}
          {meshStep >= 2 && (
            <path d="M 285 45 Q 230 45, 170 80" stroke="rgba(198,255,52,0.4)" strokeWidth="1.5" strokeDasharray="3 3" style={{ transition: 'all 0.6s ease' }} />
          )}
          {meshStep >= 3 && (
            <path d="M 55 115 Q 110 115, 170 80" stroke="rgba(242,200,17,0.4)" strokeWidth="1.5" strokeDasharray="3 3" style={{ transition: 'all 0.6s ease' }} />
          )}
          {meshStep >= 4 && (
            <path d="M 285 115 Q 230 115, 170 80" stroke="rgba(198,255,52,0.4)" strokeWidth="1.5" strokeDasharray="3 3" style={{ transition: 'all 0.6s ease' }} />
          )}

          {/* Dynamic High-Speed Quantum Particles */}
          {meshStep >= 1 && (
            <circle cx="55" cy="45" r="3" fill="#F2C811" filter="url(#core-glow-mesh)">
              <animate attributeName="cx" values="55;110;170" dur="1.3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="45;45;80" dur="1.3s" repeatCount="indefinite" />
            </circle>
          )}
          {meshStep >= 2 && (
            <circle cx="285" cy="45" r="3" fill="#c6ff34" filter="url(#core-glow-mesh)">
              <animate attributeName="cx" values="285;230;170" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="cy" values="45;45;80" dur="1.4s" repeatCount="indefinite" />
            </circle>
          )}
          {meshStep >= 3 && (
            <circle cx="55" cy="115" r="3" fill="#F2C811" filter="url(#core-glow-mesh)">
              <animate attributeName="cx" values="55;110;170" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="cy" values="115;115;80" dur="1.5s" repeatCount="indefinite" />
            </circle>
          )}
          {meshStep >= 4 && (
            <circle cx="285" cy="115" r="3" fill="#c6ff34" filter="url(#core-glow-mesh)">
              <animate attributeName="cx" values="285;230;170" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="cy" values="115;115;80" dur="1.4s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Radial Shockwave when full constellation mesh is active */}
          {meshStep === 4 && (
            <circle cx="170" cy="80" r="26" fill="none" stroke="#c6ff34" strokeWidth="1.5">
              <animate attributeName="r" values="26;44" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="1.2s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Node 1 (Top-Left): Dim_Customer */}
          <g transform="translate(15, 30)" style={{ opacity: meshStep >= 1 ? 1 : 0.12, transition: 'opacity 0.6s ease' }}>
            <rect width="80" height="30" rx="6" fill="rgba(15, 22, 34, 0.95)" stroke={meshStep >= 1 ? '#F2C811' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
            <text x="40" y="16" fill="rgba(255,255,255,0.9)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Dim_Customer</text>
            <text x="40" y="25" fill="#F2C811" fontSize="6.5" fontFamily="monospace" textAnchor="middle">1 : N</text>
          </g>

          {/* Node 2 (Top-Right): Dim_Time */}
          <g transform="translate(245, 30)" style={{ opacity: meshStep >= 2 ? 1 : 0.12, transition: 'opacity 0.6s ease' }}>
            <rect width="80" height="30" rx="6" fill="rgba(15, 22, 34, 0.95)" stroke={meshStep >= 2 ? '#c6ff34' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
            <text x="40" y="16" fill="rgba(255,255,255,0.9)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Dim_Time</text>
            <text x="40" y="25" fill="#c6ff34" fontSize="6.5" fontFamily="monospace" textAnchor="middle">1 : N</text>
          </g>

          {/* Node 3 (Bottom-Left): Dim_Store */}
          <g transform="translate(15, 100)" style={{ opacity: meshStep >= 3 ? 1 : 0.12, transition: 'opacity 0.6s ease' }}>
            <rect width="80" height="30" rx="6" fill="rgba(15, 22, 34, 0.95)" stroke={meshStep >= 3 ? '#F2C811' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
            <text x="40" y="16" fill="rgba(255,255,255,0.9)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Dim_Store</text>
            <text x="40" y="25" fill="#F2C811" fontSize="6.5" fontFamily="monospace" textAnchor="middle">1 : N</text>
          </g>

          {/* Node 4 (Bottom-Right): Dim_Product */}
          <g transform="translate(245, 100)" style={{ opacity: meshStep >= 4 ? 1 : 0.12, transition: 'opacity 0.6s ease' }}>
            <rect width="80" height="30" rx="6" fill="rgba(15, 22, 34, 0.95)" stroke={meshStep >= 4 ? '#c6ff34' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
            <text x="40" y="16" fill="rgba(255,255,255,0.9)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Dim_Product</text>
            <text x="40" y="25" fill="#c6ff34" fontSize="6.5" fontFamily="monospace" textAnchor="middle">1 : N</text>
          </g>

          {/* Central 2.5D Isometric Hub: Fact_Sales */}
          <g transform="translate(125, 55)">
            <rect x="4" y="4" width="90" height="50" rx="10" fill="rgba(0,0,0,0.6)" />
            <rect x="0" y="0" width="90" height="50" rx="10" fill="rgba(18, 26, 40, 0.98)" stroke="#F2C811" strokeWidth="1.75" filter="url(#core-glow-mesh)" />
            <text x="45" y="22" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.05em">Fact_Sales</text>
            <rect x="15" y="29" width="60" height="14" rx="4" fill="rgba(242, 200, 17, 0.15)" stroke="rgba(242, 200, 17, 0.4)" strokeWidth="0.75" />
            <text x="45" y="39" fill="#F2C811" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DIRECT LAKE</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// ─── POWER APPS INTERACTIVE ANIMATION COMPONENTS FOR MODAL ───

// 1. Apple / Vercel Grade Split-Screen Visual Loop: "Editor React/PCF IDE ➔ Live Compiled Hybrid App" (7s Infinite Loop)
function PbaThreeParadigmsAnim() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;

    const loop = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % 7000;
      setTime(elapsed);
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const t = time / 1000; // 0.0s to 7.0s

  // Calculate compile/morph progress factor (0 = Raw Low-Code Canvas, 1 = Live Compiled Pro-Code React App)
  let morph = 0;
  if (t < 2.2) {
    morph = 0;
  } else if (t >= 2.2 && t < 4.5) {
    const p = (t - 2.2) / 2.3;
    morph = p * p * (3 - 2 * p); // smoothstep
  } else if (t >= 4.5 && t < 6.4) {
    morph = 1;
  } else {
    const p = (t - 6.4) / 0.6;
    morph = 1 - (p * p * (3 - 2 * p));
  }

  // Calculate Code Beam pulse transfer from left IDE (X: 180) to right Viewport (X: 240)
  let beamProgress = 0;
  if (t >= 2.0 && t <= 4.8) {
    beamProgress = (t - 2.0) / 2.8;
  }

  // Cursor dynamics (moving between IDE code editor and UI controls)
  let cursorX = 80;
  let cursorY = 120;
  let cursorScale = 1;

  if (t < 2.2) {
    // Phase 1: Typing / Selecting React PCF Code block on left editor
    const p1 = Math.min(1, t / 1.8);
    cursorX = 40 + Math.sin(p1 * Math.PI) * 45;
    cursorY = 80 + p1 * 50;
    if (t >= 1.5 && t <= 1.8) cursorScale = 0.85;
  } else if (t >= 2.2 && t < 4.5) {
    // Phase 2: Sweep across central split border (X: 200 -> 320)
    const p2 = (t - 2.2) / 2.3;
    cursorX = 85 + p2 * 235;
    cursorY = 130 - Math.sin(p2 * Math.PI) * 40;
  } else if (t >= 4.5 && t < 6.4) {
    // Phase 3: Glide over compiled pro-code UI sliders on right side
    const p3 = (t - 4.5) / 1.9;
    cursorX = 320 + Math.sin(p3 * Math.PI * 2) * 50;
    cursorY = 140 + Math.cos(p3 * Math.PI * 2) * 35;
  } else {
    // Phase 4: Smooth return reset
    const p4 = (t - 6.4) / 0.6;
    cursorX = 320 + (80 - 320) * p4;
    cursorY = 140 + (120 - 140) * p4;
  }

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(199, 53, 144, 0.22), transparent 75%), linear-gradient(135deg, rgba(10, 8, 16, 0.98), rgba(3, 2, 6, 0.99))',
      border: '1px solid rgba(199, 53, 144, 0.55)',
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 45px rgba(199, 53, 144, 0.22)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.825rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Canvas App ➔ Pro-Code Hybrid Architecture
        </span>
      </div>

      {/* Background NeuralBI Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '15%',
        width: '260px',
        height: '260px',
        background: `radial-gradient(circle, rgba(198, 255, 52, ${0.1 + morph * 0.2}) 0%, rgba(199, 53, 144, ${0.16 + morph * 0.26}) 50%, transparent 70%)`,
        filter: `blur(${35 + morph * 25}px)`,
        pointerEvents: 'none',
        transition: 'all 0.5s ease'
      }} />

      {/* Main Viewport Split Screen Frame */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '215px',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(6, 4, 10, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.92)'
      }}>
        <svg viewBox="0 0 420 240" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            {/* Spline Neon Gradient */}
            <linearGradient id="neon-spline" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c6ff34" />
              <stop offset="50%" stopColor="#E24AA8" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>

            {/* Code Stream Particle Beam Gradient */}
            <linearGradient id="code-stream-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c6ff34" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#E24AA8" stopOpacity="1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Power Apps Logo Gradient */}
            <linearGradient id="pa-logo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E24AA8" />
              <stop offset="100%" stopColor="#742774" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="split-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ─── LEFT HALF: REACT / PCF IDE CODE EDITOR ─── */}
          <g transform="translate(10, 10)">
            <rect x="0" y="0" width="195" height="220" rx="10" fill="rgba(12, 10, 20, 0.92)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />

            {/* IDE Window Controls */}
            <circle cx="16" cy="14" r="3.5" fill="#ff5f56" />
            <circle cx="28" cy="14" r="3.5" fill="#ffbd2e" />
            <circle cx="40" cy="14" r="3.5" fill="#27c93f" />

            {/* Power Apps x React Emblem in IDE Header */}
            <g transform="translate(142, 6) scale(0.58)" style={{ filter: 'drop-shadow(0 0 5px #E24AA8)' }}>
              <path d="M 12 2 L 22 12 L 12 22 L 2 12 Z" fill="url(#pa-logo-grad)" stroke="#E24AA8" strokeWidth="1.5" />
            </g>
            <g transform="translate(164, 6) scale(0.52)" opacity={0.4 + morph * 0.6} style={{ filter: 'drop-shadow(0 0 5px #c6ff34)' }}>
              <circle cx="12" cy="12" r="2.5" fill="#c6ff34" />
              <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#c6ff34" strokeWidth="1.2" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#c6ff34" strokeWidth="1.2" transform="rotate(90 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#c6ff34" strokeWidth="1.2" transform="rotate(150 12 12)" />
            </g>

            <line x1="0" y1="28" x2="195" y2="28" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* CODE LINES (Synthesized React PCF Component) */}
            <g transform="translate(14, 40)">
              {/* Line 1: import React */}
              <rect x="0" y="0" width="30" height="6" rx="2" fill="#E24AA8" opacity="0.9" />
              <rect x="36" y="0" width="45" height="6" rx="2" fill="#c6ff34" opacity="0.95" />

              {/* Line 2: export class PCFControl */}
              <rect x="0" y="16" width="35" height="6" rx="2" fill="#E24AA8" opacity="0.9" />
              <rect x="40" y="16" width="75" height="6" rx="2" fill="#ffffff" opacity="0.85" />

              {/* Line 3: implements ComponentFramework */}
              <rect x="12" y="32" width="60" height="6" rx="2" fill="#00F0FF" opacity="0.85" />
              <rect x="76" y="32" width="50" height="6" rx="2" fill="#c6ff34" opacity="0.9" />

              {/* Line 4: public init(context, notify) */}
              <rect x="12" y="48" width="40" height="6" rx="2" fill="#E24AA8" opacity="0.85" />
              <rect x="56" y="48" width="80" height="6" rx="2" fill="#ffffff" opacity={0.5 + morph * 0.45} />

              {/* Line 5: return <ReactHybridCanvas /> */}
              <rect x="24" y="64" width="45" height="6" rx="2" fill="#c6ff34" opacity={0.6 + morph * 0.4} />
              <rect x="74" y="64" width="70" height="6" rx="2" fill="#E24AA8" opacity={0.6 + morph * 0.4} />

              {/* Line 6: state: { latency: '0.04ms', fps: 60 } */}
              <rect x="24" y="80" width="35" height="6" rx="2" fill="#00F0FF" opacity={0.5 + morph * 0.5} />
              <rect x="64" y="80" width="85" height="6" rx="2" fill="#c6ff34" opacity={0.5 + morph * 0.5} />

              {/* Line 7: render() => DataverseStream */}
              <rect x="12" y="96" width="50" height="6" rx="2" fill="#E24AA8" opacity={morph} />
              <rect x="66" y="96" width="60" height="6" rx="2" fill="#ffffff" opacity={morph} />

              {/* Active Coding Cursor Indicator in IDE */}
              <rect x={14 + (t * 40) % 120} y={112} width="8" height="12" fill="#c6ff34" opacity="0.9" style={{ filter: 'drop-shadow(0 0 8px #c6ff34)' }} />
            </g>

            {/* IDE Terminal Status Footer Bar */}
            <rect x="0" y="195" width="195" height="25" rx="0" fill="rgba(8, 6, 14, 0.95)" />
            <circle cx="15" cy="207" r="3" fill={morph > 0.4 ? "#c6ff34" : "#ffbd2e"} style={morph > 0.4 ? { filter: 'drop-shadow(0 0 6px #c6ff34)' } : {}} />
            <rect x="24" y="204" width="60" height="6" rx="2" fill={morph > 0.4 ? "#c6ff34" : "rgba(255,255,255,0.4)"} />
            <rect x="90" y="204" width="40" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
          </g>

          {/* ─── CENTRAL SPLIT SCREEN BORDER & COMPILATION BEAM ─── */}
          <line x1="210" y1="0" x2="210" y2="240" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* CODE STREAM COMPILATION PULSE (Left IDE -> Right Viewport) */}
          {beamProgress > 0.05 && beamProgress < 0.95 && (
            <g filter="url(#split-glow)">
              {/* Primary Arc */}
              <path
                d={`M 180 ${75 + beamProgress * 80} C 210 ${75 + beamProgress * 80} 220 ${95 + beamProgress * 40} 250 ${95 + beamProgress * 40}`}
                stroke="url(#code-stream-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Secondary Arc */}
              <path
                d={`M 170 ${95 + beamProgress * 60} C 200 ${95 + beamProgress * 60} 225 ${115 + beamProgress * 30} 255 ${115 + beamProgress * 30}`}
                stroke="rgba(198, 255, 52, 0.7)"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              />
              <circle
                cx={180 + beamProgress * 70}
                cy={75 + beamProgress * 80}
                r="6"
                fill="#c6ff34"
                style={{ filter: 'drop-shadow(0 0 12px #c6ff34)' }}
              />
            </g>
          )}

          {/* ─── RIGHT HALF: LIVE COMPILED UI VIEWPORT ─── */}
          <g transform="translate(215, 10)">
            <rect
              x="0"
              y="0"
              width="195"
              height="220"
              rx="10"
              fill={morph > 0.4 ? "rgba(16, 12, 26, 0.88)" : "rgba(26, 26, 34, 0.95)"}
              stroke={morph > 0.4 ? "rgba(199, 53, 144, 0.55)" : "rgba(255, 255, 255, 0.12)"}
              strokeWidth={1 + morph * 0.5}
            />

            {/* Viewport Top Header */}
            <rect x="12" y="14" width="70" height="8" rx="3" fill={morph > 0.4 ? "#E24AA8" : "#52525b"} opacity="0.9" />

            {/* Live 60 FPS LED Status Badge */}
            <circle cx="178" cy="18" r="4" fill={morph > 0.4 ? "#c6ff34" : "#71717a"} style={morph > 0.4 ? { filter: 'drop-shadow(0 0 8px #c6ff34)' } : {}} />

            {/* UNCOMPILED CANVAS APP (Morph -> 0) */}
            <g opacity={1 - morph}>
              <rect x="12" y="32" width="170" height="175" fill="rgba(255,255,255,0.02)" stroke="#52525b" strokeWidth="1" strokeDasharray="3 3" />
              <polyline points="20,130 60,130 60,85 110,85 110,115 165,115" stroke="#71717a" strokeWidth="2" strokeLinejoin="miter" fill="none" />
              <rect x="20" y="150" width="154" height="10" rx="1" fill="#3f3f46" />
              <rect x="20" y="168" width="100" height="10" rx="1" fill="#27272a" />
              <rect x="20" y="186" width="60" height="14" rx="2" fill="#3f3f46" />
            </g>

            {/* LIVE COMPILED PRO-CODE REACT APP (Morph -> 1) */}
            <g opacity={morph}>
              {/* Glass Sub-card 1: Neon Spline Chart */}
              <rect x="12" y="32" width="171" height="95" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(199, 53, 144, 0.45)" strokeWidth="1" />

              {/* Area fill */}
              <path d="M 20 105 C 50 105 60 55 95 55 C 130 55 140 85 175 85 L 175 115 L 20 115 Z" fill="url(#neon-spline)" opacity="0.18" />
              {/* Glowing spline curve */}
              <path d="M 20 105 C 50 105 60 55 95 55 C 130 55 140 85 175 85" stroke="url(#neon-spline)" strokeWidth="3" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 10px #E24AA8)' }} />

              {/* Glowing Spline Anchors / Key Metric Nodes */}
              <circle cx="55" cy="80" r="3" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 6px #c6ff34)' }} />
              <circle cx="95" cy="55" r="3.5" fill="#E24AA8" style={{ filter: 'drop-shadow(0 0 8px #E24AA8)' }} />
              <circle cx="140" cy="85" r="3" fill="#00F0FF" style={{ filter: 'drop-shadow(0 0 6px #00F0FF)' }} />

              {/* Dynamic Traveling Pulse Particle */}
              <circle cx={20 + (t * 30) % 155} cy="75" r="4.5" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 12px #c6ff34)' }} />

              {/* Glass Sub-card 2: Micro-Sliders & Controls */}
              <rect x="12" y="135" width="171" height="72" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(198, 255, 52, 0.4)" strokeWidth="1" />

              <rect x="22" y="148" width="150" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
              <rect x="22" y="148" width={65 + Math.sin(t * 3) * 30} height="6" rx="3" fill="#E24AA8" />
              <circle cx={22 + 65 + Math.sin(t * 3) * 30} cy="151" r="5.5" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 8px #E24AA8)' }} />

              <rect x="22" y="165" width="150" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
              <rect x="22" y="165" width={95 + Math.cos(t * 2.5) * 30} height="6" rx="3" fill="#c6ff34" />
              <circle cx={22 + 95 + Math.cos(t * 2.5) * 30} cy="168" r="5.5" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 8px #c6ff34)' }} />

              {/* Action Pill Button */}
              <rect x="22" y="180" width="70" height="18" rx="9" fill="rgba(199, 53, 144, 0.45)" stroke="#c6ff34" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 10px rgba(198,255,52,0.4))' }} />
              <circle cx="34" cy="189" r="3.5" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 6px #c6ff34)' }} />
              <rect x="42" y="187" width="36" height="4" rx="2" fill="#ffffff" />
            </g>
          </g>

          {/* ─── ELASTIC MINIMALIST CURSOR WITH GLOW TRAIL ─── */}
          <g transform={`translate(${cursorX}, ${cursorY}) scale(${cursorScale})`}>
            {/* Cursor Glow Ring */}
            <circle cx="0" cy="0" r="10" fill="rgba(226,74,168,0.2)" filter="url(#split-glow)" />
            <path
              d="M0 0 L0 18 L4.5 13.5 L9 21 L12 19.5 L7.5 12 L14 12 Z"
              fill={morph > 0.4 ? "#ffffff" : "#d4d4d8"}
              stroke={morph > 0.4 ? "#E24AA8" : "#18181b"}
              strokeWidth="1.5"
              style={morph > 0.4 ? { filter: 'drop-shadow(0 0 10px rgba(226,74,168,0.9))' } : {}}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

// 2. Apple / Vercel Grade Visual Loop: "The Dataverse Schema & PCF Fusion" (7s Infinite Loop)
function PbaProCodeApiEngineAnim() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;

    const loop = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % 7000;
      setTime(elapsed);
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const t = time / 1000; // 0.0s to 7.0s

  // Phase 1: Data Consolidation (0s - 2.2s) - Photons traveling along Bezier paths to center
  let photonProgress = 0;
  if (t < 2.2) {
    const p = t / 2.2;
    photonProgress = 1 - Math.pow(1 - p, 3); // Cubic easing out
  } else if (t >= 2.2 && t < 6.4) {
    photonProgress = 1;
  } else {
    photonProgress = 0;
  }

  // Phase 2: Collision & Ambient Burst Glow (2.2s - 4.5s)
  let burstScale = 0;
  let burstOpacity = 0;
  if (t >= 2.1 && t < 4.5) {
    const p = (t - 2.1) / 2.4;
    burstScale = Math.sin(p * Math.PI) * 1.4;
    burstOpacity = Math.sin(p * Math.PI) * 0.9;
  }

  // Phase 3: Projected Floating Component emergence (4.5s - 6.4s)
  let floatY = 0;
  let floatOpacity = 0;
  let floatScale = 0.85;

  if (t < 2.2) {
    floatY = 40;
    floatOpacity = 0;
    floatScale = 0.85;
  } else if (t >= 2.2 && t < 4.5) {
    const p = (t - 2.2) / 2.3;
    floatY = 40 - p * 50; // Ascends up
    floatOpacity = p;
    floatScale = 0.85 + p * 0.15;
  } else if (t >= 4.5 && t < 6.4) {
    const p = (t - 4.5) / 1.9;
    floatY = -10 + Math.sin(p * Math.PI * 2) * 5; // Floating levitation
    floatOpacity = 1;
    floatScale = 1;
  } else {
    const p = (t - 6.4) / 0.6;
    floatY = -10 + p * 50;
    floatOpacity = 1 - p;
    floatScale = 1 - p * 0.15;
  }

  // Calculate Photon coordinates along 3 Bezier paths to Center (210, 140)
  // Node 1 (Accounts): Start (70, 45) -> Center (210, 140)
  const node1X = 70 + (210 - 70) * photonProgress;
  const node1Y = 45 + (140 - 45) * photonProgress;

  // Node 2 (Contacts): Start (350, 45) -> Center (210, 140)
  const node2X = 350 + (210 - 350) * photonProgress;
  const node2Y = 45 + (140 - 45) * photonProgress;

  // Node 3 (Security_Roles): Start (210, 210) -> Center (210, 140)
  const node3X = 210;
  const node3Y = 210 + (140 - 210) * photonProgress;

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 100%, rgba(199, 53, 144, 0.22), transparent 75%), linear-gradient(135deg, rgba(10, 8, 16, 0.98), rgba(3, 2, 6, 0.99))',
      border: '1px solid rgba(199, 53, 144, 0.45)',
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 45px rgba(199, 53, 144, 0.18)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.825rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          The Dataverse Schema & PCF Fusion
        </span>
      </div>

      {/* Central Ambient Fusion Burst Glow */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${180 * (1 + burstScale * 0.5)}px`,
        height: `${180 * (1 + burstScale * 0.5)}px`,
        background: `radial-gradient(circle, rgba(226, 74, 168, ${0.35 * burstOpacity}) 0%, rgba(198, 255, 52, ${0.2 * burstOpacity}) 45%, transparent 70%)`,
        filter: 'blur(35px)',
        pointerEvents: 'none',
        transition: 'all 0.1s linear'
      }} />

      {/* Main Viewport Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '215px',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(6, 4, 10, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)'
      }}>
        <svg viewBox="0 0 420 240" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            {/* Thread Gradients */}
            <linearGradient id="thread-grad-1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c6ff34" />
              <stop offset="100%" stopColor="#E24AA8" />
            </linearGradient>

            <linearGradient id="thread-grad-2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#E24AA8" />
            </linearGradient>

            <linearGradient id="thread-grad-3" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#E24AA8" />
              <stop offset="100%" stopColor="#c6ff34" />
            </linearGradient>

            {/* Projected Widget Glow */}
            <filter id="widget-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="fusion-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ─── DATAVERSE RELATIONAL THREADS ─── */}
          <path d="M 70 45 Q 120 110 210 140" stroke="url(#thread-grad-1)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <path d="M 350 45 Q 300 110 210 140" stroke="url(#thread-grad-2)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <path d="M 210 210 L 210 140" stroke="url(#thread-grad-3)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

          {/* ─── 3 PERIPHERAL DATAVERSE NODES ─── */}
          {/* Node 1: Accounts (Top Left) */}
          <g transform="translate(70, 45)">
            <rect x="-35" y="-20" width="70" height="40" rx="8" fill="rgba(14, 10, 24, 0.9)" stroke="#c6ff34" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 6px rgba(198,255,52,0.3))' }} />
            <circle cx="-20" cy="-6" r="3" fill="#c6ff34" />
            <rect x="-12" y="-9" width="34" height="6" rx="2" fill="#ffffff" opacity="0.9" />
            <rect x="-20" y="3" width="42" height="4" rx="1" fill="rgba(255,255,255,0.4)" />
            <rect x="-20" y="9" width="28" height="4" rx="1" fill="#c6ff34" opacity="0.8" />
          </g>

          {/* Node 2: Contacts (Top Right) */}
          <g transform="translate(350, 45)">
            <rect x="-35" y="-20" width="70" height="40" rx="8" fill="rgba(14, 10, 24, 0.9)" stroke="#00F0FF" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 6px rgba(0,240,255,0.3))' }} />
            <circle cx="-20" cy="-6" r="3" fill="#00F0FF" />
            <rect x="-12" y="-9" width="34" height="6" rx="2" fill="#ffffff" opacity="0.9" />
            <rect x="-20" y="3" width="42" height="4" rx="1" fill="rgba(255,255,255,0.4)" />
            <rect x="-20" y="9" width="28" height="4" rx="1" fill="#00F0FF" opacity="0.8" />
          </g>

          {/* Node 3: Security_Roles (Bottom Center) */}
          <g transform="translate(210, 210)">
            <rect x="-45" y="-18" width="90" height="36" rx="8" fill="rgba(14, 10, 24, 0.9)" stroke="#E24AA8" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 6px rgba(226,74,168,0.3))' }} />
            <circle cx="-30" cy="-4" r="3" fill="#E24AA8" />
            <rect x="-20" y="-7" width="44" height="6" rx="2" fill="#ffffff" opacity="0.9" />
            <rect x="-30" y="5" width="54" height="4" rx="1" fill="#E24AA8" opacity="0.8" />
          </g>

          {/* ─── SYNCHRONIZED PHOTON PARTICLES (Phase 1: Traveling to Center) ─── */}
          {photonProgress > 0 && photonProgress < 0.98 && (
            <g filter="url(#fusion-glow)">
              <circle cx={node1X} cy={node1Y} r="5" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 10px #c6ff34)' }} />
              <circle cx={node2X} cy={node2Y} r="5" fill="#00F0FF" style={{ filter: 'drop-shadow(0 0 10px #00F0FF)' }} />
              <circle cx={node3X} cy={node3Y} r="5" fill="#E24AA8" style={{ filter: 'drop-shadow(0 0 10px #E24AA8)' }} />
            </g>
          )}

          {/* ─── CENTRAL TSX ORCHESTRATION CONTAINER (Phase 2: Fusion Collision) ─── */}
          <g transform="translate(210, 140)">
            {/* Collision Shockwave Ring */}
            {burstOpacity > 0.05 && (
              <circle cx="0" cy="0" r={15 + burstScale * 25} fill="none" stroke="#E24AA8" strokeWidth="2" opacity={burstOpacity}>
                <animate attributeName="r" values="15;45" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Central TSX Code Emblem */}
            <rect x="-24" y="-24" width="48" height="48" rx="12" fill="rgba(12, 8, 20, 0.95)" stroke="#E24AA8" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 12px #E24AA8)' }} />

            {/* React PCF TSX Icon */}
            <g opacity="0.9">
              <path d="M -8 -8 L -14 0 L -8 8 M 8 -8 L 14 0 L 8 8" stroke="#c6ff34" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <line x1="4" y1="-10" x2="-4" y2="10" stroke="#E24AA8" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          </g>

          {/* ─── PROJECTED FLOATING HYBRID PCF COMPONENT (Phase 3: Emergence) ─── */}
          <g transform={`translate(210, ${90 + floatY}) scale(${floatScale})`} opacity={floatOpacity} filter="url(#widget-glow)">
            {/* Glass Container */}
            <rect
              x="-110"
              y="-40"
              width="220"
              height="80"
              rx="12"
              fill="rgba(18, 12, 28, 0.9)"
              stroke="rgba(199, 53, 144, 0.6)"
              strokeWidth="1.5"
              style={{ filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.85))' }}
            />

            {/* Floating Widget Header */}
            <rect x="-95" y="-28" width="60" height="6" rx="2" fill="#E24AA8" />
            <circle cx="95" cy="-25" r="4" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 6px #c6ff34)' }} />

            {/* Real-time Metric Spline */}
            <path d="M -95 10 C -65 10 -55 -15 -20 -15 C 15 -15 25 15 65 15" stroke="url(#thread-grad-1)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx={-95 + (t * 35) % 160} cy="-5" r="4" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 8px #c6ff34)' }} />

            {/* Micro Live Equalizer Bars */}
            {[0, 1, 2, 3, 4, 5].map(i => {
              const h = 10 + Math.sin(i * 1.5 + t * 5) * 8;
              return (
                <rect key={`ew-${i}`} x={70 + i * 5} y={25 - h} width="3" height={h} rx="1" fill={i % 2 === 0 ? "#E24AA8" : "#c6ff34"} opacity="0.85" />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

// 3. Apple / Vercel Grade Visual Loop: "The Secure Custom Architecture Grid" (6s Infinite Loop)
function PbaEnterpriseDataverseMeshAnim() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;

    const loop = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % 6000;
      setTime(elapsed);
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const t = time / 1000; // 0.0s to 6.0s

  // Thread Flow Stream progress (0.0 to 1.0 down the 3 stacked layers)
  const streamT1 = (t / 6.0) % 1;
  const streamT2 = ((t + 2.0) / 6.0) % 1;
  const streamT3 = ((t + 4.0) / 6.0) % 1;

  // Zero-Trust Perimeter Security Shield Pulse
  const shieldPulse = Math.sin(t * Math.PI * 2) * 0.4 + 0.6;

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 100%, rgba(199, 53, 144, 0.22), transparent 75%), linear-gradient(135deg, rgba(10, 8, 16, 0.98), rgba(3, 2, 6, 0.99))',
      border: '1px solid rgba(199, 53, 144, 0.45)',
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 45px rgba(199, 53, 144, 0.18)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.825rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          The Secure Custom Architecture Grid
        </span>
      </div>

      {/* Blueprint Grid Canvas Viewport */}
      <div style={{
        position: 'relative',
        height: '215px',
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(6, 4, 10, 0.94)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)'
      }}>
        <svg viewBox="0 0 420 220" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            {/* Thread Flow Gradient */}
            <linearGradient id="flow-thread-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c6ff34" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#E24AA8" stopOpacity="1" />
            </linearGradient>

            {/* Zero-Trust Shield Glow */}
            <filter id="zero-trust-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ─── BLUEPRINT GRID LINES BACKGROUND ─── */}
          <g opacity="0.08">
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <line key={`gh-${i}`} x1="0" y1={i * 35} x2="420" y2={i * 35} stroke="#E24AA8" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line key={`gv-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" stroke="#c6ff34" strokeWidth="1" />
            ))}
          </g>

          {/* ─── VERTICAL PARALLEL STREAM CONDUITS ─── */}
          <line x1="120" y1="45" x2="120" y2="185" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="210" y1="45" x2="210" y2="185" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 3" strokeDashoffset="2" />
          <line x1="300" y1="45" x2="300" y2="185" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* ─── STREAMING PHOTON THREADS (Sliding Downwards 3 Layers) ─── */}
          {[streamT1, streamT2, streamT3].map((st, idx) => {
            const threadY = 35 + st * 150;
            return (
              <g key={`thread-group-${idx}`}>
                {/* Conduit 1 (X: 120) */}
                <circle cx="120" cy={threadY} r="4" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 8px #c6ff34)' }} />
                <line x1="120" y1={Math.max(35, threadY - 25)} x2="120" y2={threadY} stroke="url(#flow-thread-grad)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Conduit 2 (X: 210) */}
                <circle cx="210" cy={(threadY + 30) % 150 + 35} r="4" fill="#00F0FF" style={{ filter: 'drop-shadow(0 0 8px #00F0FF)' }} />
                <line x1="210" y1={Math.max(35, (threadY + 30) % 150 + 10)} x2="210" y2={(threadY + 30) % 150 + 35} stroke="url(#flow-thread-grad)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Conduit 3 (X: 300) */}
                <circle cx="300" cy={(threadY + 60) % 150 + 35} r="4" fill="#E24AA8" style={{ filter: 'drop-shadow(0 0 8px #E24AA8)' }} />
                <line x1="300" y1={Math.max(35, (threadY + 60) % 150 + 10)} x2="300" y2={(threadY + 60) % 150 + 35} stroke="url(#flow-thread-grad)" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            );
          })}

          {/* ─── LAYER 1: TOP LAYER - CUSTOM REACT UI (Y: 25 - 45) ─── */}
          <g transform="translate(210, 25)">
            <rect x="-165" y="-12" width="330" height="30" rx="8" fill="rgba(18, 12, 28, 0.94)" stroke="#c6ff34" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 8px rgba(198,255,52,0.25))' }} />

            {/* Layer 1 Badge & Labels */}
            <circle cx="-150" cy="3" r="3.5" fill="#c6ff34" style={{ filter: 'drop-shadow(0 0 6px #c6ff34)' }} />
            <text x="-140" y="6" fill="#ffffff" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.05em">
              CUSTOM REACT 18 PCF LAYER
            </text>

            <rect x="65" y="-5" width="85" height="15" rx="4" fill="rgba(198, 255, 52, 0.12)" stroke="rgba(198, 255, 52, 0.3)" strokeWidth="0.8" />
            <text x="107.5" y="5.5" fill="#c6ff34" fontSize="7" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
              60 FPS NATIVE
            </text>
          </g>

          {/* ─── LAYER 2: MIDDLE LAYER - REAL-TIME API GATEWAY (Y: 105 - 125) ─── */}
          <g transform="translate(210, 110)">
            <rect x="-170" y="-14" width="340" height="32" rx="8" fill="rgba(12, 16, 28, 0.94)" stroke="#00F0FF" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.25))' }} />

            {/* Gate Active Diodes & Labels */}
            <circle cx="-155" cy="2" r="3.5" fill="#00F0FF" style={{ filter: 'drop-shadow(0 0 6px #00F0FF)' }} />
            <text x="-144" y="5" fill="#ffffff" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.05em">
              REAL-TIME API GATEWAY
            </text>

            <rect x="60" y="-6" width="90" height="15" rx="4" fill="rgba(0, 240, 255, 0.15)" stroke="#00F0FF" strokeWidth="0.8" />
            <text x="105" y="4.5" fill="#00F0FF" fontSize="7" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
              0.04ms PIPELINE
            </text>
          </g>

          {/* ─── LAYER 3: BOTTOM LAYER - SECURE DATAVERSE MESH BASE (Y: 175 - 200) ─── */}
          <g transform="translate(210, 185)">
            {/* Zero-Trust Perimeter Security Shield Ring */}
            <rect
              x="-180"
              y="-16"
              width="360"
              height="36"
              rx="10"
              fill="rgba(24, 10, 32, 0.95)"
              stroke="#E24AA8"
              strokeWidth={1.5 + shieldPulse * 0.5}
              style={{ filter: `drop-shadow(0 0 ${8 + shieldPulse * 8}px rgba(226,74,168,${shieldPulse}))` }}
            />

            {/* Zero-Trust Lock Badge & Labels */}
            <circle cx="-162" cy="2" r="4" fill="#E24AA8" style={{ filter: 'drop-shadow(0 0 6px #E24AA8)' }} />
            <text x="-150" y="5" fill="#ffffff" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.05em">
              ZERO-TRUST SECURITY PERIMETER
            </text>

            {/* Relational Table Nodes in Mesh */}
            <g transform="translate(48, -4)">
              <rect x="0" y="-4" width="55" height="15" rx="4" fill="rgba(199, 53, 144, 0.25)" stroke="#E24AA8" strokeWidth="0.8" />
              <text x="27.5" y="6.5" fill="#E24AA8" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">DATAVERSE</text>
              <rect x="60" y="-4" width="55" height="15" rx="4" fill="rgba(198, 255, 52, 0.2)" stroke="#c6ff34" strokeWidth="0.8" />
              <text x="87.5" y="6.5" fill="#c6ff34" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">ROW-LEVEL</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

// ─── POWER AUTOMATE INTERACTIVE ANIMATION COMPONENTS FOR MODAL ───

// 1. Apple / Vercel Grade Visual Loop: "The Self-Healing Autonomous Process Engine" (8s Infinite Loop)
function PauSelfHealingFlowAnim() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;

    const loop = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % 8000;
      setTime(elapsed);
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const t = time / 1000; // 0.0s to 8.0s

  // Phase Calculations (8.0s loop)
  const errorActive = t >= 2.4 && t <= 4.8;
  const retryPulse = t >= 3.0 && t <= 5.0 ? Math.sin((t - 3.0) * Math.PI * 4) * 0.5 + 0.5 : 0;
  const dlqActive = t >= 3.2 && t <= 4.6;
  const successActive = t >= 5.2 && t <= 7.6;
  const successPulse = successActive ? Math.sin((t - 5.2) * Math.PI * 2.5) * 0.4 + 0.6 : 0.2;

  // Live transaction ticker counter
  const txCount = 12847 + Math.floor(t / 1.6);

  // Particle positions along the bezier paths
  const p1 = (t / 8.0) % 1;
  const p2 = ((t + 2.5) / 8.0) % 1;
  const p3 = ((t + 5.0) / 8.0) % 1;

  // Shockwave radial pulse rings
  const triggerRingRadius = 6 + (t % 2.5) * 12;
  const triggerRingOpacity = Math.max(0, 1 - (t % 2.5) / 2.5);
  const successRingRadius = successActive ? 8 + ((t - 5.2) % 2.4) * 18 : 0;
  const successRingOpacity = successActive ? Math.max(0, 1 - ((t - 5.2) % 2.4) / 2.4) : 0;

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(0, 188, 242, 0.24), transparent 75%), linear-gradient(135deg, rgba(10, 14, 24, 0.98), rgba(3, 5, 12, 0.99))',
      border: '1px solid rgba(0, 188, 242, 0.65)',
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 50px rgba(0, 188, 242, 0.25)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Autonomous Cloud & Desktop RPA Architecture
        </span>
      </div>

      {/* Animation Viewport Canvas */}
      <div style={{
        position: 'relative',
        height: '215px',
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(6, 10, 18, 0.96)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)'
      }}>
        <svg viewBox="0 0 440 220" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            {/* Azure Flow Gradient */}
            <linearGradient id="pau-glow-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00BCF2" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00BCF2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c6ff34" stopOpacity="0.9" />
            </linearGradient>

            {/* Error Glow */}
            <filter id="error-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ─── BACKGROUND ISOMETRIC TELEMETRY MESH ─── */}
          <g opacity="0.08">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <line key={`pau-gh-${i}`} x1="0" y1={i * 30} x2="440" y2={i * 30} stroke="#00BCF2" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line key={`pau-gv-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" stroke="#00BCF2" strokeWidth="1" />
            ))}
          </g>

          {/* ─── CONNECTING BEZIER PIPELINES ─── */}
          {/* Top Branch (Cloud Flow) */}
          <path d="M 102,105 C 140,105 145,45 185,45 L 271,45 C 310,45 320,105 348,105" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 102,105 C 140,105 145,45 185,45 L 271,45 C 310,45 320,105 348,105" stroke="#00BCF2" strokeWidth="2.5" strokeDasharray="10 6" strokeDashoffset={-t * 40} fill="none" opacity="0.8" />

          {/* Bottom Branch (Desktop RPA) */}
          <path d="M 102,105 C 140,105 145,152 185,152 L 271,152 C 310,152 320,105 348,105" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 102,105 C 140,105 145,152 185,152 L 271,152 C 310,152 320,105 348,105" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10 6" strokeDashoffset={-t * 30} fill="none" opacity="0.75" />

          {/* Dead-Letter Queue Arc (Branching Down from Cloud Flow) */}
          <path d="M 228,67 C 228,90 236,98 250,98 L 265,98" stroke={dlqActive ? '#FF9500' : 'rgba(255,255,255,0.1)'} strokeWidth="1.8" strokeDasharray="3 3" fill="none" />

          {/* ─── SELF-HEALING EXPONENTIAL RETRY LOOP (Top Arc) ─── */}
          {errorActive && (
            <g transform="translate(228, 23)">
              <path d="M -24,0 A 24 24 0 1 1 24,0" fill="none" stroke="#FF3B30" strokeWidth="2.2" strokeDasharray="5 3" opacity={0.7 + retryPulse * 0.3} filter="url(#error-glow)" />
              <circle cx="0" cy="-24" r="4" fill="#FF3B30" style={{ filter: 'drop-shadow(0 0 8px #FF3B30)' }} />
              <rect x="-42" y="-36" width="84" height="13" rx="3" fill="rgba(20, 6, 8, 0.95)" stroke="#FF3B30" strokeWidth="0.8" />
              <text x="0" y="-27" fill="#FF3B30" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle">
                EXP-BACKOFF RETRY
              </text>
            </g>
          )}

          {/* ─── SHOCKWAVE PULSE RINGS ─── */}
          {/* Trigger Shockwave */}
          <circle cx="61" cy="105" r={triggerRingRadius} fill="none" stroke="#00BCF2" strokeWidth="1.2" opacity={triggerRingOpacity} />

          {/* Success Shockwave */}
          {successActive && (
            <circle cx="388" cy="105" r={successRingRadius} fill="none" stroke="#c6ff34" strokeWidth="1.8" opacity={successRingOpacity} />
          )}

          {/* ─── STREAMING PHOTON PARTICLES ON PIPELINES ─── */}
          {[p1, p2, p3].map((pos, idx) => {
            const pxTop = 102 + pos * 246;
            const pyTop = pos < 0.35 ? 105 - (pos / 0.35) * 60 : (pos > 0.65 ? 45 + ((pos - 0.65) / 0.35) * 60 : 45);
            return (
              <g key={`particle-${idx}`}>
                <circle
                  cx={pxTop}
                  cy={pyTop}
                  r={errorActive && pos > 0.4 && pos < 0.7 ? 5 : 4}
                  fill={errorActive && pos > 0.4 && pos < 0.7 ? '#FF3B30' : '#00BCF2'}
                  style={{ filter: `drop-shadow(0 0 10px ${errorActive && pos > 0.4 && pos < 0.7 ? '#FF3B30' : '#00BCF2'})` }}
                />
              </g>
            );
          })}

          {/* DLQ Packet Particle */}
          {dlqActive && (
            <circle cx={228 + ((t - 3.2) / 1.4) * 35} cy={67 + Math.sin((t - 3.2) * Math.PI) * 15} r="3.5" fill="#FF9500" style={{ filter: 'drop-shadow(0 0 8px #FF9500)' }} />
          )}

          {/* ─── NODE 1: TRIGGER EVENT (Left X: 20 - 102, Y: 83) ─── */}
          <g transform="translate(20, 83)">
            <rect x="0" y="0" width="82" height="44" rx="8" fill="rgba(10, 16, 28, 0.98)" stroke="#00BCF2" strokeWidth="1.6" style={{ filter: 'drop-shadow(0 0 10px rgba(0,188,242,0.35))' }} />
            <text x="41" y="17" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">TRIGGER</text>
            <text x="41" y="32" fill="#00BCF2" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">EVENT STREAM</text>

            {/* Micro Badge */}
            <rect x="8" y="-13" width="66" height="13" rx="3" fill="rgba(6, 16, 30, 0.95)" stroke="rgba(0,188,242,0.5)" strokeWidth="0.8" />
            <text x="41" y="-4" fill="#00BCF2" fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">LATENCY 0.04ms</text>
          </g>

          {/* ─── NODE 2A: CLOUD FLOW ORCHESTRATION (Top X: 185 - 271, Y: 23) ─── */}
          <g transform="translate(185, 23)">
            <rect
              x="0"
              y="0"
              width="86"
              height="44"
              rx="8"
              fill="rgba(10, 16, 28, 0.98)"
              stroke={errorActive ? '#FF3B30' : '#00BCF2'}
              strokeWidth={errorActive ? 2 : 1.4}
              style={{ filter: `drop-shadow(0 0 12px ${errorActive ? 'rgba(255,59,48,0.75)' : 'rgba(0,188,242,0.3)'})` }}
            />
            <text x="43" y="17" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">CLOUD FLOW</text>
            <text x="43" y="32" fill={errorActive ? '#FF3B30' : '#ffffff'} fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">
              {errorActive ? '500 RETRY' : 'PIPELINE'}
            </text>

            {/* Status 500 Badge when active */}
            {errorActive && (
              <g transform="translate(14, -13)">
                <rect x="0" y="0" width="58" height="13" rx="3" fill="rgba(24, 6, 8, 0.95)" stroke="#FF3B30" strokeWidth="0.9" />
                <text x="29" y="9" fill="#FF3B30" fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="900">AUTOCURATIVE</text>
              </g>
            )}
          </g>

          {/* ─── NODE 2B: DESKTOP RPA ENGINE (Bottom X: 185 - 271, Y: 130) ─── */}
          <g transform="translate(185, 130)">
            <rect x="0" y="0" width="86" height="44" rx="8" fill="rgba(10, 16, 28, 0.98)" stroke="#c6ff34" strokeWidth="1.4" style={{ filter: 'drop-shadow(0 0 10px rgba(198,255,52,0.3))' }} />
            <text x="43" y="17" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">DESKTOP RPA</text>
            <text x="43" y="32" fill="#c6ff34" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">BOT POOL</text>

            {/* Micro Badge Cleanly Placed Before Bottom Bar */}
            <rect x="8" y="47" width="70" height="13" rx="3" fill="rgba(8, 20, 12, 0.95)" stroke="rgba(198,255,52,0.5)" strokeWidth="0.8" />
            <text x="43" y="56" fill="#c6ff34" fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">SAP / LEGACY RPA</text>
          </g>

          {/* ─── DEAD-LETTER QUEUE SUB-NODE (X: 250, Y: 86) ─── */}
          <g transform="translate(250, 86)">
            <rect x="0" y="0" width="60" height="24" rx="5" fill="rgba(20, 12, 6, 0.98)" stroke={dlqActive ? '#FF9500' : 'rgba(255,255,255,0.15)'} strokeWidth="1" />
            <text x="30" y="15" fill={dlqActive ? '#FF9500' : 'rgba(255,255,255,0.6)'} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">DLQ BUFFER</text>
          </g>

          {/* ─── NODE 3: MERGE & EXECUTE CONFIRMATION (Right X: 348 - 428, Y: 83) ─── */}
          <g transform="translate(348, 83)">
            <rect
              x="0"
              y="0"
              width="80"
              height="44"
              rx="8"
              fill="rgba(10, 16, 28, 0.98)"
              stroke={successActive ? '#c6ff34' : '#00BCF2'}
              strokeWidth={1.6 + successPulse * 0.4}
              style={{ filter: `drop-shadow(0 0 ${10 + successPulse * 12}px ${successActive ? 'rgba(198,255,52,0.75)' : 'rgba(0,188,242,0.35)'})` }}
            />
            <text x="40" y="17" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">MERGE</text>
            <text x="40" y="32" fill={successActive ? '#c6ff34' : '#00BCF2'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">
              {successActive ? '99.9% OK' : 'EXECUTE'}
            </text>
          </g>

          {/* ─── BOTTOM LIVE STATUS TELEMETRY TICKER ─── */}
          <g transform="translate(20, 194)">
            <rect x="0" y="0" width="400" height="18" rx="5" fill="rgba(4, 6, 12, 0.98)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <rect x="0" y="0" width={errorActive ? 220 : 400} height="18" rx="5" fill={errorActive ? 'rgba(255, 59, 48, 0.28)' : 'rgba(0, 188, 242, 0.22)'} style={{ transition: 'all 0.4s ease' }} />
            <text x="200" y="12" fill={errorActive ? '#FF3B30' : '#00BCF2'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle" letterSpacing="0.04em">
              {errorActive ? '⚠ AUTO-RETRY IN PROGRESS — DLQ INTERCEPTED — ZERO DATA LOSS' : `✓ 99.9% SLA CONFIRMED — ${txCount.toLocaleString()} TRANSACTIONS / 24H`}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// 2. Apple / Vercel Grade Visual Loop: "The Event-Driven Automation Mesh" (7s Infinite Loop)
function PauEventDrivenMeshAnim() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;

    const loop = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % 7000;
      setTime(elapsed);
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const t = time / 1000; // 0.0s to 7.0s

  // Phase Calculations (7.0s loop)
  const dispatchActive = t < 2.0;
  const executionActive = t >= 2.0 && t <= 4.2;
  const rpaTerminalActive = executionActive;
  const aiScanActive = t >= 4.2 && t <= 6.0;
  const aiScanProgress = aiScanActive ? (t - 4.2) / 1.8 : 0;
  const bottleneckEliminated = t >= 5.2 && t <= 6.2;
  const purgeShockwaveR = bottleneckEliminated ? (t - 5.2) * 35 : 0;
  const purgeShockwaveOpacity = bottleneckEliminated ? Math.max(0, 1 - (t - 5.2)) : 0;

  const ambientGlowActive = t >= 6.0;
  const ambientOpacity = ambientGlowActive ? Math.sin((t - 6.0) * Math.PI) * 0.45 : 0;

  // Particle Stream Positions
  const p1 = (t / 7.0) % 1;
  const p2 = ((t + 2.33) / 7.0) % 1;
  const p3 = ((t + 4.66) / 7.0) % 1;

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(0, 188, 242, 0.24), transparent 75%), linear-gradient(135deg, rgba(10, 14, 24, 0.98), rgba(3, 5, 12, 0.99))',
      border: '1px solid rgba(0, 188, 242, 0.65)',
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 50px rgba(0, 188, 242, 0.25)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Real-Time Enterprise API Orchestration
        </span>
      </div>

      {/* Animation Viewport Canvas */}
      <div style={{
        position: 'relative',
        height: '215px',
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(6, 10, 18, 0.96)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)'
      }}>
        <svg viewBox="0 0 440 220" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            {/* Cyan Laser Gradient */}
            <linearGradient id="pau-laser-mesh" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00BCF2" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00BCF2" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
            </linearGradient>

            {/* AI Scanner Laser Beam */}
            <linearGradient id="ai-scanner-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00BCF2" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c6ff34" stopOpacity="0" />
            </linearGradient>

            {/* Glowing Filter */}
            <filter id="purple-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient Glow Overlay during reset phase */}
          {ambientGlowActive && (
            <rect x="0" y="0" width="440" height="220" fill="#00BCF2" opacity={ambientOpacity} style={{ filter: 'blur(30px)' }} />
          )}

          {/* ─── BACKGROUND ISOMETRIC TELEMETRY MESH ─── */}
          <g opacity="0.08">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <line key={`pau-m2gh-${i}`} x1="0" y1={i * 30} x2="440" y2={i * 30} stroke="#00BCF2" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line key={`pau-m2gv-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" stroke="#00BCF2" strokeWidth="1" />
            ))}
          </g>

          {/* ─── CONDUIT LIGHT PATHS ─── */}
          {/* Node 0 (Trigger: 50, 105) to Node 1 (Cloud Flows: 175, 45) */}
          <path d="M 85,105 L 135,45 L 175,45" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 85,105 L 135,45 L 175,45" stroke="#00BCF2" strokeWidth="2.5" strokeDasharray="8 5" strokeDashoffset={-t * 35} fill="none" opacity="0.85" />

          {/* Node 0 (Trigger: 50, 105) to Node 2 (Desktop RPA: 175, 165) */}
          <path d="M 85,105 L 135,165 L 175,165" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 85,105 L 135,165 L 175,165" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="8 5" strokeDashoffset={-t * 28} fill="none" opacity="0.75" />

          {/* Node 1 (Cloud Flows: 255, 45) to Node 3 (Custom Connectors: 305, 45) */}
          <path d="M 255,45 L 305,45" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 255,45 L 305,45" stroke="#00BCF2" strokeWidth="2.5" strokeDasharray="8 5" strokeDashoffset={-t * 45} fill="none" opacity="0.85" />

          {/* Node 2 (Desktop RPA: 255, 165) to Node 4 (Process Mining: 305, 165) */}
          <path d="M 255,165 L 305,165" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 255,165 L 305,165" stroke="#A855F7" strokeWidth="2.5" strokeDasharray="8 5" strokeDashoffset={-t * 32} fill="none" opacity="0.85" />

          {/* Diagonal Cross-Mesh Linking Cloud Flows & Process Mining */}
          <path d="M 255,60 C 280,85 280,125 305,150" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

          {/* ─── AI SCANNER SWEEP BEAM (Phase 3) ─── */}
          {aiScanActive && (
            <g transform={`translate(${140 + aiScanProgress * 230}, 0)`}>
              <line x1="0" y1="15" x2="0" y2="190" stroke="url(#ai-scanner-beam)" strokeWidth="3.5" style={{ filter: 'drop-shadow(0 0 10px #A855F7)' }} />
              <polygon points="-15,15 15,15 0,190" fill="rgba(168,85,247,0.12)" />
              <rect x="-42" y="10" width="84" height="13" rx="3" fill="rgba(20, 10, 30, 0.95)" stroke="#A855F7" strokeWidth="0.8" />
              <text x="0" y="19" fill="#A855F7" fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="900">AI OPTIMIZING</text>
            </g>
          )}

          {/* ─── BOTTLENECK PURGE SHOCKWAVE (Phase 3) ─── */}
          {bottleneckEliminated && (
            <g transform="translate(280, 105)">
              <circle cx="0" cy="0" r={purgeShockwaveR} fill="none" stroke="#A855F7" strokeWidth="2" opacity={purgeShockwaveOpacity} filter="url(#purple-glow)" />
              <rect x="-46" y="-10" width="92" height="14" rx="3" fill="rgba(24, 10, 34, 0.95)" stroke="#A855F7" strokeWidth="0.9" />
              <text x="0" y="-1" fill="#ffffff" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="900">BOTTLENECK PURGED</text>
            </g>
          )}

          {/* ─── PHOTON LIGHT PARTICLES STREAMING ─── */}
          {[p1, p2, p3].map((pos, idx) => {
            const xPos = 85 + pos * 240;
            const yPos = pos < 0.5 ? 45 + pos * 24 : 165 - (pos - 0.5) * 24;
            return (
              <circle key={`photon-${idx}`} cx={xPos} cy={yPos} r="4" fill="#00BCF2" style={{ filter: 'drop-shadow(0 0 8px #00BCF2)' }} />
            );
          })}

          {/* ─── NODE 0: CENTRAL EVENT TRIGGER (Left X: 15 - 85, Y: 83) ─── */}
          <g transform="translate(15, 83)">
            <rect x="0" y="0" width="72" height="44" rx="8" fill="rgba(10, 16, 28, 0.98)" stroke="#00BCF2" strokeWidth="1.6" style={{ filter: 'drop-shadow(0 0 10px rgba(0,188,242,0.35))' }} />
            <circle cx="14" cy="15" r="4" fill="#00BCF2" style={{ filter: 'drop-shadow(0 0 8px #00BCF2)' }} />
            <text x="25" y="18" fill="#ffffff" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="800">EVENT</text>
            <text x="14" y="32" fill="#00BCF2" fontSize="8" fontFamily="var(--font-mono)" fontWeight="800">TRIGGER</text>
          </g>

          {/* ─── SUB-MODULE 1: CLOUD FLOWS (Top-Center X: 175 - 255, Y: 23) ─── */}
          <g transform="translate(175, 23)">
            <rect x="0" y="0" width="82" height="44" rx="8" fill="rgba(10, 16, 28, 0.98)" stroke="#00BCF2" strokeWidth="1.4" style={{ filter: 'drop-shadow(0 0 10px rgba(0,188,242,0.3))' }} />
            <text x="41" y="16" fill="rgba(255,255,255,0.85)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">CLOUD FLOWS</text>
            <text x="41" y="31" fill="#00BCF2" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">PARALLEL</text>
          </g>

          {/* ─── SUB-MODULE 2: DESKTOP RPA / SAP TERMINAL (Bottom-Center X: 175 - 255, Y: 143) ─── */}
          <g transform="translate(175, 143)">
            <rect
              x="0"
              y="0"
              width="82"
              height="44"
              rx="8"
              fill="rgba(10, 16, 28, 0.98)"
              stroke={rpaTerminalActive ? '#c6ff34' : 'rgba(255,255,255,0.2)'}
              strokeWidth={1.4}
              style={{ filter: `drop-shadow(0 0 10px ${rpaTerminalActive ? 'rgba(198,255,52,0.4)' : 'transparent'})` }}
            />
            <text x="41" y="16" fill="rgba(255,255,255,0.85)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">DESKTOP RPA</text>
            <text x="41" y="31" fill={rpaTerminalActive ? '#c6ff34' : 'rgba(255,255,255,0.6)'} fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">
              {rpaTerminalActive ? 'SAP/AS400 BOT' : 'HEADLESS'}
            </text>

            {/* Micro Badge Execution */}
            {rpaTerminalActive && (
              <g transform="translate(10, 48)">
                <rect x="0" y="0" width="62" height="13" rx="3" fill="rgba(8, 20, 12, 0.95)" stroke="#c6ff34" strokeWidth="0.8" />
                <text x="31" y="9" fill="#c6ff34" fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="900">EXEC 0.04ms</text>
              </g>
            )}
          </g>

          {/* ─── SUB-MODULE 3: CUSTOM CONNECTORS & API GATEWAY (Top-Right X: 305 - 385, Y: 23) ─── */}
          <g transform="translate(305, 23)">
            <rect
              x="0"
              y="0"
              width="82"
              height="44"
              rx="8"
              fill="rgba(10, 16, 28, 0.98)"
              stroke={executionActive ? '#00BCF2' : 'rgba(255,255,255,0.2)'}
              strokeWidth={1.4}
              style={{ filter: `drop-shadow(0 0 10px ${executionActive ? 'rgba(0,188,242,0.4)' : 'transparent'})` }}
            />
            <text x="41" y="16" fill="rgba(255,255,255,0.85)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">CONNECTORS</text>
            <text x="41" y="31" fill="#ffffff" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">REST & GRAPHQL</text>

            {/* 200 OK Badge when active */}
            {executionActive && (
              <g transform="translate(16, -12)">
                <rect x="0" y="0" width="50" height="13" rx="3" fill="rgba(6, 24, 18, 0.95)" stroke="#c6ff34" strokeWidth="0.9" />
                <text x="25" y="-3" fill="#c6ff34" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="900">200 OK</text>
              </g>
            )}
          </g>

          {/* ─── SUB-MODULE 4: PROCESS MINING AI SCANNER (Bottom-Right X: 305 - 385, Y: 143) ─── */}
          <g transform="translate(305, 143)">
            <rect
              x="0"
              y="0"
              width="82"
              height="44"
              rx="8"
              fill="rgba(10, 16, 28, 0.98)"
              stroke={aiScanActive ? '#A855F7' : 'rgba(255,255,255,0.2)'}
              strokeWidth={aiScanActive ? 1.8 : 1.4}
              style={{ filter: `drop-shadow(0 0 12px ${aiScanActive ? 'rgba(168,85,247,0.6)' : 'transparent'})` }}
            />
            <text x="41" y="16" fill="rgba(255,255,255,0.85)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">PROCESS MINING</text>
            <text x="41" y="31" fill={aiScanActive ? '#A855F7' : '#ffffff'} fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="800">
              {aiScanActive ? 'SCANNING AI' : 'AI TELEMETRY'}
            </text>
          </g>

          {/* ─── BOTTOM LIVE STATUS TELEMETRY TICKER ─── */}
          <g transform="translate(20, 196)">
            <rect x="0" y="0" width="400" height="17" rx="4" fill="rgba(4, 6, 12, 0.98)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <rect x="0" y="0" width={aiScanActive ? 300 : 400} height="17" rx="4" fill={aiScanActive ? 'rgba(168, 85, 247, 0.25)' : 'rgba(0, 188, 242, 0.22)'} style={{ transition: 'all 0.4s ease' }} />
            <text x="200" y="12" fill={aiScanActive ? '#A855F7' : '#00BCF2'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle" letterSpacing="0.04em">
              {aiScanActive
                ? '⚡ AI PROCESS MINING — DETECTING & PURGING BOTTLENECK'
                : '✓ EVENT-DRIVEN MESH ACTIVE — 1,000+ API CONNECTORS LIVE'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// 3. Apple / Linear / Vercel Grade Visual Loop: "Zero-Trust Resilient Mesh & DLQ Auto-Recovery" (7s Infinite Loop)
function PauResilientDlqMeshAnim() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;

    const loop = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % 7000;
      setTime(elapsed);
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const t = time / 1000; // 0.0s to 7.0s

  // Phase Calculations (7.0s loop)
  const errorActive = t >= 1.2 && t <= 2.2;
  const p1X = t <= 2.0 ? 60 + (t / 2.0) * 100 : 160;

  const dlqActive = t >= 2.0 && t <= 4.0;
  const dlqPulse = dlqActive ? Math.sin((t - 2.0) * Math.PI * 4) * 0.4 + 0.6 : 0.2;

  let backoffText = "[EXP_BACKOFF: 200ms]";
  if (t >= 2.6 && t < 3.3) backoffText = "[EXP_BACKOFF: 400ms]";
  if (t >= 3.3 && t <= 4.0) backoffText = "[JITTER_APPLIED: 412ms]";

  const recoveredActive = t >= 4.0 && t <= 5.8;
  const coreImpactActive = t >= 4.7 && t <= 5.8;
  const impactR = coreImpactActive ? (t - 4.7) * 28 : 0;
  const impactOpacity = coreImpactActive ? Math.max(0, 1 - (t - 4.7) / 1.1) : 0;

  const pRecoveredX = t >= 4.0 && t <= 4.8 ? 220 + ((t - 4.0) / 0.8) * 168 : (t > 4.8 ? 388 : 60);

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.18), transparent 75%), linear-gradient(135deg, rgba(9, 9, 11, 0.98), rgba(3, 5, 8, 0.99))',
      border: `1px solid ${recoveredActive ? 'rgba(16, 185, 129, 0.65)' : errorActive ? 'rgba(245, 158, 11, 0.65)' : 'rgba(0, 240, 255, 0.55)'}`,
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: `0 25px 60px rgba(0,0,0,0.85), 0 0 50px ${recoveredActive ? 'rgba(16, 185, 129, 0.25)' : errorActive ? 'rgba(245, 158, 11, 0.25)' : 'rgba(0, 240, 255, 0.2)'}`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'border 0.5s ease, boxShadow 0.5s ease'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Zero-Trust Resilient Mesh & Observability
        </span>
      </div>

      {/* Animation Viewport Canvas */}
      <div style={{
        position: 'relative',
        height: '215px',
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        background: '#09090B',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.95)'
      }}>
        <svg viewBox="0 0 440 220" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            {/* Emerald Core Ambient Ripple Filter */}
            <filter id="emerald-ripple-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Amber Retry Filter */}
            <filter id="amber-retry-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ─── INDUSTRIAL MINIMALIST GRID BASE ─── */}
          <g opacity="0.06">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <line key={`pau-rgh-${i}`} x1="0" y1={i * 30} x2="440" y2={i * 30} stroke="#00F0FF" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line key={`pau-rgv-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" stroke="#00F0FF" strokeWidth="1" />
            ))}
          </g>

          {/* ─── BEZIER CONDUIT PIPELINES ─── */}
          {/* Main Pipeline: Gateway (60, 105) -> DLQ Retry Engine (220, 105) */}
          <path d="M 102,105 L 175,105" stroke={errorActive ? '#F59E0B' : 'rgba(255,255,255,0.15)'} strokeWidth="2" fill="none" />
          <path d="M 102,105 L 175,105" stroke={errorActive ? '#F59E0B' : '#00F0FF'} strokeWidth="2.5" strokeDasharray="8 5" strokeDashoffset={-t * 35} fill="none" opacity="0.8" />

          {/* DLQ Exit Pipeline: DLQ Retry Engine (265, 105) -> Enterprise Core (348, 105) */}
          <path d="M 265,105 L 348,105" stroke={recoveredActive ? '#10B981' : 'rgba(255,255,255,0.15)'} strokeWidth="2" fill="none" />
          <path d="M 265,105 L 348,105" stroke={recoveredActive ? '#10B981' : 'rgba(255,255,255,0.3)'} strokeWidth="2.5" strokeDasharray="8 5" strokeDashoffset={-t * 40} fill="none" opacity="0.85" />

          {/* DLQ Loop Arc inside DLQ Engine */}
          {dlqActive && (
            <path d="M 200,95 C 200,65 240,65 240,95" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" opacity={dlqPulse} filter="url(#amber-retry-glow)" />
          )}

          {/* ─── EMERALD CORE AMBIENT RIPPLE SHOCKWAVE (Phase 3 Impact) ─── */}
          {coreImpactActive && (
            <circle cx="388" cy="105" r={impactR} fill="none" stroke="#10B981" strokeWidth="2.5" opacity={impactOpacity} filter="url(#emerald-ripple-glow)" />
          )}

          {/* ─── STREAMING DATA PACKETS ─── */}
          {/* Phase 1 Cyan / Amber Packet */}
          {t < 4.0 && (
            <circle
              cx={p1X}
              cy={105}
              r="4.5"
              fill={errorActive || dlqActive ? '#F59E0B' : '#00F0FF'}
              style={{ filter: `drop-shadow(0 0 10px ${errorActive || dlqActive ? '#F59E0B' : '#00F0FF'})` }}
            />
          )}

          {/* Phase 3 Emerald Recovered Packet */}
          {recoveredActive && (
            <circle
              cx={pRecoveredX}
              cy={105}
              r="5"
              fill="#10B981"
              style={{ filter: 'drop-shadow(0 0 12px #10B981)' }}
            />
          )}

          {/* ─── MODULE 01: [01 // API_GATEWAY] (Left X: 20 - 102, Y: 83) ─── */}
          <g transform="translate(20, 83)">
            <rect
              x="0"
              y="0"
              width="82"
              height="44"
              rx="8"
              fill="rgba(14, 18, 24, 0.98)"
              stroke={errorActive ? '#F59E0B' : '#00F0FF'}
              strokeWidth="1.6"
              style={{ filter: `drop-shadow(0 0 10px ${errorActive ? 'rgba(245,158,11,0.5)' : 'rgba(0,240,255,0.3)'})` }}
            />
            <text x="41" y="17" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">01 // API_GATEWAY</text>
            <text x="41" y="32" fill={errorActive ? '#F59E0B' : '#00F0FF'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">
              {errorActive ? '503 SERVICE ERR' : 'REST / GRAPHQL'}
            </text>

            {/* Error 503 Micro Badge */}
            {errorActive && (
              <g transform="translate(4, -13)">
                <rect x="0" y="0" width="74" height="13" rx="3" fill="rgba(28, 16, 8, 0.95)" stroke="#F59E0B" strokeWidth="0.9" />
                <text x="37" y="9" fill="#F59E0B" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="900">503 SERVICE UNAVAILABLE</text>
              </g>
            )}
          </g>

          {/* ─── MODULE 02: [02 // DLQ_RETRY_ENGINE] (Center X: 175 - 265, Y: 83) ─── */}
          <g transform="translate(175, 83)">
            <rect
              x="0"
              y="0"
              width="90"
              height="44"
              rx="8"
              fill="rgba(14, 18, 24, 0.98)"
              stroke={dlqActive ? '#F59E0B' : recoveredActive ? '#10B981' : 'rgba(255,255,255,0.2)'}
              strokeWidth={dlqActive || recoveredActive ? 1.8 : 1.4}
              style={{ filter: `drop-shadow(0 0 12px ${dlqActive ? 'rgba(245,158,11,0.6)' : recoveredActive ? 'rgba(16,185,129,0.4)' : 'transparent'})` }}
            />
            <text x="45" y="17" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">02 // DLQ_RETRY</text>
            <text x="45" y="32" fill={dlqActive ? '#F59E0B' : recoveredActive ? '#10B981' : 'rgba(255,255,255,0.6)'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">
              {dlqActive ? 'BACKOFF ACTIVE' : recoveredActive ? 'PACKET RECOVERED' : 'ENGINE BUFFER'}
            </text>

            {/* Backoff Jitter Micro Badge */}
            {dlqActive && (
              <g transform="translate(5, -13)">
                <rect x="0" y="0" width="80" height="13" rx="3" fill="rgba(28, 16, 8, 0.95)" stroke="#F59E0B" strokeWidth="0.9" />
                <text x="40" y="9" fill="#F59E0B" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="900">{backoffText}</text>
              </g>
            )}
          </g>

          {/* ─── MODULE 03: [03 // ENTERPRISE_CORE] (Right X: 348 - 428, Y: 83) ─── */}
          <g transform="translate(348, 83)">
            <rect
              x="0"
              y="0"
              width="80"
              height="44"
              rx="8"
              fill="rgba(14, 18, 24, 0.98)"
              stroke={recoveredActive ? '#10B981' : '#00F0FF'}
              strokeWidth={recoveredActive ? 2 : 1.4}
              style={{ filter: `drop-shadow(0 0 ${12 + (coreImpactActive ? 10 : 0)}px ${recoveredActive ? 'rgba(16,185,129,0.7)' : 'rgba(0,240,255,0.3)'})` }}
            />
            <text x="40" y="17" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">03 // CORE</text>
            <text x="40" y="32" fill={recoveredActive ? '#10B981' : '#00F0FF'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">
              {recoveredActive ? '100% INGESTED' : 'ENTERPRISE'}
            </text>
          </g>

          {/* ─── BOTTOM STATUS TELEMETRY TICKER ─── */}
          <g transform="translate(20, 194)">
            <rect x="0" y="0" width="400" height="18" rx="5" fill="rgba(4, 6, 12, 0.98)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <rect x="0" y="0" width={recoveredActive ? 400 : dlqActive ? 230 : 400} height="18" rx="5" fill={recoveredActive ? 'rgba(16, 185, 129, 0.28)' : dlqActive ? 'rgba(245, 158, 11, 0.28)' : 'rgba(0, 240, 255, 0.22)'} style={{ transition: 'all 0.4s ease' }} />
            <text x="200" y="12" fill={recoveredActive ? '#10B981' : dlqActive ? '#F59E0B' : '#00F0FF'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle" letterSpacing="0.04em">
              {recoveredActive
                ? '[TRANSACTION_RECOVERED // ZERO_DATA_LOSS]'
                : dlqActive
                  ? `[DLQ_CAPTURED // ${backoffText}]`
                  : '[00.04ms PIPELINE // SYSTEM_HEALTHY]'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// ─── COPILOT STUDIO ANIMATION 1: THE GROUNDED REASONING & ACTION LOOP ───
function McsGroundedReasoningAnim() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId;
    let startTime = null;
    const DURATION = 7000; // 7.0s 60 FPS loop

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const p = (elapsed % DURATION) / DURATION;
      setProgress(p);
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Animation timeline phases (0.0 - 1.0)
  const isRagPhase = progress >= 0.0 && progress < 0.28;
  const isReasoningPhase = progress >= 0.28 && progress < 0.64;
  const isActionPhase = progress >= 0.64 && progress < 0.86;
  const isResetPhase = progress >= 0.86;

  // Particle positions
  // Center: (230, 100)
  // Dataverse: (90, 52)
  // Reasoning: (370, 52)
  // Plugins: (90, 148)
  // Security: (370, 148)

  // RAG particle progress (0.0 to 1.0 within phase)
  const ragProgress = isRagPhase ? (progress / 0.28) : 0;
  const ragX = 230 + (90 - 230) * Math.sin(ragProgress * Math.PI);
  const ragY = 100 + (52 - 100) * Math.sin(ragProgress * Math.PI);

  // Guardrail perimeter trace angle
  const traceAngle = isReasoningPhase ? ((progress - 0.28) / 0.36) * Math.PI * 2 : 0;
  const guardrailX = 230 + 82 * Math.cos(traceAngle);
  const guardrailY = 100 + 44 * Math.sin(traceAngle);

  // Action pulse progress
  const actionProgress = isActionPhase ? ((progress - 0.64) / 0.22) : 0;
  const actionX = 230 + (90 - 230) * actionProgress;
  const actionY = 100 + (148 - 100) * actionProgress;

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.22), transparent 75%), linear-gradient(135deg, rgba(10, 20, 16, 0.98), rgba(3, 8, 6, 0.99))',
      border: '1px solid rgba(16, 185, 129, 0.55)',
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 50px rgba(16, 185, 129, 0.25)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Grounded Reasoning & Action Loop Architecture
        </span>
      </div>

      {/* Animation Viewport Canvas */}
      <div style={{
        position: 'relative',
        height: '215px',
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(6, 14, 10, 0.94)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg viewBox="0 0 460 215" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <linearGradient id="mcs-mint-stream" x1="230" y1="100" x2="90" y2="52">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00EB88" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="mcs-action-pulse" x1="230" y1="100" x2="90" y2="148">
              <stop offset="0%" stopColor="#00EB88" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c6ff34" stopOpacity="0.95" />
            </linearGradient>
            <filter id="mcs-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="mcs-bright-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background Ambient Mesh Lines */}
          <line x1="90" y1="52" x2="230" y2="100" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="370" y1="52" x2="230" y2="100" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="90" y1="148" x2="230" y2="100" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="370" y1="148" x2="230" y2="100" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* PERIMETER GUARDRAILS & SECURITY MESH */}
          <ellipse cx="230" cy="100" rx="82" ry="44" fill="none" stroke={isReasoningPhase ? '#00EB88' : 'rgba(16, 185, 129, 0.3)'} strokeWidth={isReasoningPhase ? '2' : '1'} strokeDasharray="4 4" filter={isReasoningPhase ? 'url(#mcs-glow)' : 'none'} style={{ transition: 'all 0.3s ease' }} />

          {/* Reasoning Phase Perimeter Tracer Beam */}
          {isReasoningPhase && (
            <circle cx={guardrailX} cy={guardrailY} r="5" fill="#00EB88" filter="url(#mcs-bright-glow)" />
          )}

          {/* RAG Stream Active Curve */}
          {isRagPhase && (
            <path d="M230 100 Q160 60 90 52" stroke="url(#mcs-mint-stream)" strokeWidth="3" fill="none" filter="url(#mcs-glow)" />
          )}

          {/* Action Stream Active Pulse */}
          {isActionPhase && (
            <line x1="230" y1="100" x2="90" y2="148" stroke="url(#mcs-action-pulse)" strokeWidth="3.5" filter="url(#mcs-bright-glow)" />
          )}

          {/* Dynamic Traveling Particles */}
          {isRagPhase && (
            <circle cx={ragX} cy={ragY} r="5" fill="#00EB88" filter="url(#mcs-bright-glow)" />
          )}
          {isActionPhase && (
            <circle cx={actionX} cy={actionY} r="6" fill="#c6ff34" filter="url(#mcs-bright-glow)" />
          )}

          {/* SUB-MODULE 1: DATAVERSE / RAG (Top Left) */}
          <g transform="translate(90, 52)">
            <rect x="-50" y="-19" width="100" height="38" rx="8" fill="rgba(8, 20, 15, 0.95)" stroke={isRagPhase ? '#00EB88' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isRagPhase ? '2' : '1'} filter={isRagPhase ? 'url(#mcs-glow)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
            <text x="0" y="-4" fill={isRagPhase ? '#00EB88' : 'rgba(255,255,255,0.5)'} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">DATAVERSE / RAG</text>
            <text x="0" y="9" fill={isRagPhase ? '#ffffff' : 'rgba(16,185,129,0.8)'} fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">VECTOR INDEX</text>
          </g>

          {/* SUB-MODULE 2: REASONING LLM (Top Right) */}
          <g transform="translate(370, 52)">
            <rect x="-50" y="-19" width="100" height="38" rx="8" fill="rgba(8, 20, 15, 0.95)" stroke={isReasoningPhase ? '#00EB88' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isReasoningPhase ? '2' : '1'} filter={isReasoningPhase ? 'url(#mcs-glow)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
            <text x="0" y="-4" fill={isReasoningPhase ? '#00EB88' : 'rgba(255,255,255,0.5)'} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">REASONING LLM</text>
            <text x="0" y="9" fill={isReasoningPhase ? '#ffffff' : 'rgba(16,185,129,0.8)'} fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">VERIFIER CHAIN</text>
          </g>

          {/* SUB-MODULE 3: PLUGINS / ACTIONS (Bottom Left) */}
          <g transform="translate(90, 148)">
            <rect x="-50" y="-19" width="100" height="38" rx="8" fill="rgba(8, 20, 15, 0.95)" stroke={isActionPhase ? '#c6ff34' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isActionPhase ? '2' : '1'} filter={isActionPhase ? 'url(#mcs-bright-glow)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
            <text x="0" y="-4" fill={isActionPhase ? '#c6ff34' : 'rgba(255,255,255,0.5)'} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">PLUGINS / ACTIONS</text>
            <text x="0" y="9" fill={isActionPhase ? '#ffffff' : 'rgba(16,185,129,0.8)'} fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">API EXECUTOR</text>
          </g>

          {/* SUB-MODULE 4: SECURITY GUARDRAILS (Bottom Right) */}
          <g transform="translate(370, 148)">
            <rect x="-50" y="-19" width="100" height="38" rx="8" fill="rgba(8, 20, 15, 0.95)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
            <text x="0" y="-4" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">SECURITY MESH</text>
            <text x="0" y="9" fill="rgba(16,185,129,0.85)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">ZERO-TRUST DLP</text>
          </g>

          {/* NUCLEUS: AI CORE (Center Hub) */}
          <g transform="translate(230, 100)">
            {/* Outer Ambient Glow Ring */}
            <circle cx="0" cy="0" r={isResetPhase ? 38 : isActionPhase ? 35 : isReasoningPhase ? 33 : 30} fill="none" stroke={isActionPhase ? '#c6ff34' : '#00EB88'} strokeWidth={isActionPhase ? '2.5' : '1.5'} strokeDasharray="3 3" opacity={isResetPhase ? 0.9 : 0.6} filter="url(#mcs-bright-glow)" style={{ transition: 'all 0.4s ease' }} />

            {/* Inner Core Glass Sphere */}
            <circle cx="0" cy="0" r="24" fill={isActionPhase ? 'rgba(198, 255, 52, 0.22)' : isReasoningPhase ? 'rgba(0, 235, 136, 0.25)' : 'rgba(16, 185, 129, 0.2)'} stroke={isActionPhase ? '#c6ff34' : '#10B981'} strokeWidth="2" filter="url(#mcs-glow)" />

            <text x="0" y="-3" fill="#ffffff" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle" letterSpacing="0.04em">AI CORE</text>
            <text x="0" y="8" fill={isActionPhase ? '#c6ff34' : '#00EB88'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">
              {isActionPhase ? 'EXECUTING' : isReasoningPhase ? 'REASONING' : isRagPhase ? 'RETRIEVING' : 'READY'}
            </text>
          </g>

          {/* REAL-TIME MONOSPACE TELEMETRY TICKER BAR */}
          <g transform="translate(30, 194)">
            <rect x="0" y="0" width="400" height="18" rx="5" fill="rgba(8, 20, 15, 0.9)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" />
            <rect x="0" y="0" width={isActionPhase ? 400 : isReasoningPhase ? 280 : isRagPhase ? 140 : 400} height="18" rx="5" fill={isActionPhase ? 'rgba(198, 255, 52, 0.22)' : isReasoningPhase ? 'rgba(0, 235, 136, 0.22)' : 'rgba(16, 185, 129, 0.18)'} style={{ transition: 'all 0.4s ease' }} />
            <text x="200" y="12" fill={isActionPhase ? '#c6ff34' : isReasoningPhase ? '#00EB88' : isRagPhase ? '#10B981' : '#ffffff'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle" letterSpacing="0.04em">
              {isActionPhase
                ? '[ACTION_EXECUTED // API_CALL_SUCCESS_200_OK]'
                : isReasoningPhase
                  ? '[GROUNDING_VERIFIED // 100% ANTI_HALLUCINATION_PASS]'
                  : isRagPhase
                    ? '[RAG_FETCH // DATAVERSE_CONTEXT_INGESTED]'
                    : '[AGENT_IDLE // READY_FOR_INTENT_ORCHESTRATION]'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// ─── COPILOT STUDIO ANIMATION 2: MULTI-STEP AGENTIC CHAIN ───
function McsMultiStepChainAnim() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId;
    let startTime = null;
    const DURATION = 6000; // 6.0s 60 FPS loop

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const p = (elapsed % DURATION) / DURATION;
      setProgress(p);
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Timeline phase boundaries (0.0 - 1.0)
  const isPhase1 = progress >= 0.0 && progress < 0.33; // Station 01 Ingestion
  const isPhase2 = progress >= 0.33 && progress < 0.67; // Station 02 Reasoning & Shield Filtering
  const isPhase3 = progress >= 0.67 && progress < 0.88; // Station 03 Action Impact
  const isReset = progress >= 0.88;

  // Particle position interpolation
  // Station 01 Center: (75, 95)
  // Station 02 Center: (230, 95)
  // Station 03 Center: (385, 95)

  // Phase 1 particles (Inbound from left 20 to Station 01 at 75)
  const p1Progress = isPhase1 ? (progress / 0.33) : 0;
  const p1X = 15 + (75 - 15) * p1Progress;

  // Phase 2 particle path (Station 01 at 75 to Station 02 at 230)
  const p2Progress = isPhase2 ? ((progress - 0.33) / 0.34) : 0;
  const p2X = 75 + (230 - 75) * p2Progress;
  const hasPassedShield = p2X >= 230;

  // Phase 3 particle path (Station 02 at 230 to Station 03 at 385)
  const p3Progress = isPhase3 ? ((progress - 0.67) / 0.21) : 0;
  const p3X = 230 + (385 - 230) * p3Progress;

  // Impact ripple radius in Station 03
  const impactRippleR = isPhase3 ? p3Progress * 42 : 0;
  const impactRippleOpacity = isPhase3 ? Math.max(0, 1 - p3Progress) : 0;

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.22), transparent 75%), linear-gradient(135deg, rgba(10, 20, 16, 0.98), rgba(3, 8, 6, 0.99))',
      border: '1px solid rgba(16, 185, 129, 0.55)',
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 50px rgba(16, 185, 129, 0.25)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Multi-Step Agentic Chain Architecture
        </span>
      </div>

      {/* Animation Viewport Canvas */}
      <div style={{
        position: 'relative',
        height: '215px',
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(6, 14, 10, 0.94)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg viewBox="0 0 460 215" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <linearGradient id="mcs-chain-beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00EB88" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c6ff34" stopOpacity="0.95" />
            </linearGradient>
            <filter id="mcs-chain-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="mcs-impact-flash" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* PIPELINE CONNECTING BUS (Horizontal 2.5D Beam Lines) */}
          <line x1="25" y1="95" x2="435" y2="95" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="125" y1="95" x2="170" y2="95" stroke={isPhase2 ? '#00EB88' : 'rgba(16, 185, 129, 0.35)'} strokeWidth={isPhase2 ? '3' : '1.5'} filter={isPhase2 ? 'url(#mcs-chain-glow)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
          <line x1="290" y1="95" x2="333" y2="95" stroke={isPhase3 ? '#c6ff34' : 'rgba(16, 185, 129, 0.35)'} strokeWidth={isPhase3 ? '3.5' : '1.5'} filter={isPhase3 ? 'url(#mcs-impact-flash)' : 'none'} style={{ transition: 'all 0.3s ease' }} />

          {/* ACTIVE BEAM HIGHLIGHT */}
          {isPhase2 && (
            <line x1="125" y1="95" x2={p2X} y2="95" stroke="url(#mcs-chain-beam)" strokeWidth="3" filter="url(#mcs-chain-glow)" />
          )}
          {isPhase3 && (
            <line x1="290" y1="95" x2={p3X} y2="95" stroke="url(#mcs-chain-beam)" strokeWidth="3.5" filter="url(#mcs-impact-flash)" />
          )}

          {/* DYNAMIC PARTICLES */}
          {/* Phase 1 Inbound Stream */}
          {isPhase1 && (
            <g>
              <circle cx={p1X} cy="95" r="5" fill="#00EB88" filter="url(#mcs-chain-glow)" />
              <circle cx={Math.max(10, p1X - 12)} cy="91" r="3" fill="rgba(0, 235, 136, 0.6)" />
              <circle cx={Math.max(10, p1X - 22)} cy="99" r="2.5" fill="rgba(0, 235, 136, 0.4)" />
            </g>
          )}

          {/* Phase 2 Filtering Stream */}
          {isPhase2 && (
            <g>
              {!hasPassedShield ? (
                // Pre-Shield: Organic chaotic cluster
                <g transform={`translate(${p2X}, 95)`}>
                  <circle cx="0" cy="0" r="4.5" fill="#00EB88" filter="url(#mcs-chain-glow)" />
                  <circle cx="-6" cy="-4" r="3" fill="#34D399" />
                  <circle cx="-5" cy="5" r="2.5" fill="#10B981" />
                </g>
              ) : (
                // Post-Shield: Perfect aligned geometric diamond matrix
                <g transform={`translate(${p2X}, 95)`}>
                  <polygon points="0,-7 7,0 0,7 -7,0" fill="#00EB88" filter="url(#mcs-impact-flash)" />
                  <circle cx="-8" cy="0" r="2" fill="#00EB88" />
                  <circle cx="8" cy="0" r="2" fill="#00EB88" />
                </g>
              )}
            </g>
          )}

          {/* Phase 3 Action Particle */}
          {isPhase3 && (
            <g transform={`translate(${p3X}, 95)`}>
              <polygon points="0,-8 8,0 0,8 -8,0" fill="#c6ff34" filter="url(#mcs-impact-flash)" />
              <circle cx="0" cy="0" r="6" fill="#c6ff34" filter="url(#mcs-impact-flash)" />
            </g>
          )}

          {/* ─── STATION 01: ENTERPRISE CONTEXT (RAG) ─── */}
          <g transform="translate(75, 95)">
            <rect x="-50" y="-26" width="100" height="52" rx="10" fill="rgba(8, 20, 15, 0.96)" stroke={isPhase1 ? '#00EB88' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isPhase1 ? '2.2' : '1.2'} filter={isPhase1 ? 'url(#mcs-chain-glow)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
            <text x="0" y="-12" fill={isPhase1 ? '#00EB88' : 'rgba(255,255,255,0.45)'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">STATION 01</text>
            <text x="0" y="2" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">CONTEXT RAG</text>
            <text x="0" y="16" fill={isPhase1 ? '#00EB88' : 'rgba(16,185,129,0.75)'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">DATAVERSE / SP</text>
          </g>

          {/* ─── STATION 02: COGNITIVE REASONING & GUARDRAILS ─── */}
          <g transform="translate(230, 95)">
            <rect x="-55" y="-26" width="110" height="52" rx="10" fill="rgba(8, 20, 15, 0.96)" stroke={isPhase2 ? '#00EB88' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isPhase2 ? '2.2' : '1.2'} filter={isPhase2 ? 'url(#mcs-chain-glow)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
            <text x="0" y="-12" fill={isPhase2 ? '#00EB88' : 'rgba(255,255,255,0.45)'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">STATION 02</text>
            <text x="0" y="2" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">REASONING LLM</text>
            <text x="0" y="16" fill={isPhase2 ? '#00EB88' : 'rgba(16,185,129,0.75)'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">ZERO-HALLUCINATION</text>

            {/* Zero Hallucination Vertical Filter Shield Line */}
            <line x1="0" y1="-26" x2="0" y2="26" stroke={isPhase2 ? '#00EB88' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isPhase2 ? '2.5' : '1'} strokeDasharray="3 2" filter={isPhase2 ? 'url(#mcs-impact-flash)' : 'none'} />
          </g>

          {/* ─── STATION 03: PLUGIN ACTION ENGINE ─── */}
          <g transform="translate(385, 95)">
            <rect x="-50" y="-26" width="100" height="52" rx="10" fill="rgba(8, 20, 15, 0.96)" stroke={isPhase3 ? '#c6ff34' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isPhase3 ? '2.5' : '1.2'} filter={isPhase3 ? 'url(#mcs-impact-flash)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
            <text x="0" y="-12" fill={isPhase3 ? '#c6ff34' : 'rgba(255,255,255,0.45)'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">STATION 03</text>
            <text x="0" y="2" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">ACTION ENGINE</text>
            <text x="0" y="16" fill={isPhase3 ? '#c6ff34' : 'rgba(16,185,129,0.75)'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">PLUGIN EXECUTOR</text>

            {/* Impact Trigger Button Radial Shockwave Ripple */}
            {isPhase3 && (
              <circle cx="0" cy="0" r={impactRippleR} fill="none" stroke="#c6ff34" strokeWidth="2" opacity={impactRippleOpacity} filter="url(#mcs-impact-flash)" />
            )}
          </g>

          {/* REAL-TIME MONOSPACE TELEMETRY TICKER BAR */}
          <g transform="translate(30, 194)">
            <rect x="0" y="0" width="400" height="18" rx="5" fill="rgba(8, 20, 15, 0.9)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" />
            <rect x="0" y="0" width={isPhase3 ? 400 : isPhase2 ? 280 : isPhase1 ? 140 : 400} height="18" rx="5" fill={isPhase3 ? 'rgba(198, 255, 52, 0.25)' : isPhase2 ? 'rgba(0, 235, 136, 0.22)' : 'rgba(16, 185, 129, 0.18)'} style={{ transition: 'all 0.4s ease' }} />
            <text x="200" y="12" fill={isPhase3 ? '#c6ff34' : isPhase2 ? '#00EB88' : isPhase1 ? '#10B981' : '#ffffff'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle" letterSpacing="0.04em">
              {isPhase3
                ? '[KNOWLEDGE RESOLUTION: 10X FASTER // ACTION_EXECUTED]'
                : isPhase2
                  ? '[02 // ZERO_HALLUCINATION_SHIELD_VERIFIED // 100%_ACCURACY]'
                  : isPhase1
                    ? '[01 // INGESTING_ENTERPRISE_CONTEXT_RAG]'
                    : '[MULTISTEP_CHAIN_IDLE // PIPELINE_READY]'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// ─── COPILOT STUDIO ANIMATION 3: THE COGNITIVE PRISM & NEURAL DLP GATEKEEPER ───
function McsZeroHallucinationFieldAnim() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId;
    let startTime = null;
    const DURATION = 6000; // 6.0s 60 FPS loop

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const p = (elapsed % DURATION) / DURATION;
      setProgress(p);
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Timeline phase boundaries (0.0 - 1.0)
  const isRefractPhase = progress >= 0.0 && progress < 0.33; // Unverified prompt enters & refracts upward to dissipation vent
  const isCollimatePhase = progress >= 0.33 && progress < 0.70; // Verified RAG enters & collimates inside prism
  const isReleasePhase = progress >= 0.70 && progress < 0.88; // Collimated laser beam shoots to Secure DLP Gateway
  const isResetPhase = progress >= 0.88;

  // Unverified Probe (Phase 1)
  const p1Progress = isRefractPhase ? (progress / 0.33) : 0;
  const p1InboundX = 50 + (188 - 50) * Math.min(1, p1Progress * 1.6);
  const p1InboundY = 80 + (100 - 80) * Math.min(1, p1Progress * 1.6);
  const p1RefractProgress = Math.max(0, (p1Progress - 0.6) / 0.4);
  const p1RefractX = 188 + (230 - 188) * p1RefractProgress;
  const p1RefractY = 100 + (40 - 100) * p1RefractProgress;

  // Verified RAG Ingestion (Phase 2)
  const p2Progress = isCollimatePhase ? ((progress - 0.33) / 0.37) : 0;
  const p2X = 50 + (188 - 50) * Math.min(1, p2Progress * 1.4);
  const p2Y = 120 + (100 - 120) * Math.min(1, p2Progress * 1.4);

  // Collimated Beam Release (Phase 3)
  const p3Progress = isReleasePhase ? ((progress - 0.70) / 0.18) : 0;
  const p3X = 272 + (405 - 272) * p3Progress;

  // Gateway unlock shockwave ripple
  const unlockR = isReleasePhase ? p3Progress * 44 : 0;
  const unlockOpacity = isReleasePhase ? Math.max(0, 1 - p3Progress) : 0;

  return (
    <div style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.22), transparent 75%), linear-gradient(135deg, rgba(10, 20, 16, 0.98), rgba(3, 8, 6, 0.99))',
      border: '1px solid rgba(16, 185, 129, 0.55)',
      borderRadius: '20px',
      padding: '1.25rem',
      width: '100%',
      maxWidth: '460px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 50px rgba(16, 185, 129, 0.25)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Card Header Title */}
      <div style={{ marginBottom: '0.85rem', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
          Zero-Hallucination Containment Field Architecture
        </span>
      </div>

      {/* Animation Viewport Canvas */}
      <div style={{
        position: 'relative',
        height: '215px',
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(6, 14, 10, 0.94)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg viewBox="0 0 460 215" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <linearGradient id="mcs-prism-refract" x1="50" y1="80" x2="188" y2="100">
              <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF9500" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="mcs-prism-rag" x1="50" y1="120" x2="188" y2="100">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00EB88" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="mcs-collimated-beam" x1="272" y1="100" x2="405" y2="100">
              <stop offset="0%" stopColor="#00EB88" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c6ff34" stopOpacity="0.95" />
            </linearGradient>
            <filter id="mcs-prism-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="mcs-collimated-flash" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* INGRESS SOURCE (Left Node) */}
          <g transform="translate(50, 100)">
            <rect x="-40" y="-28" width="80" height="56" rx="8" fill="rgba(8, 20, 15, 0.96)" stroke={isRefractPhase ? '#FF3B30' : isCollimatePhase ? '#00EB88' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isRefractPhase || isCollimatePhase ? '2' : '1'} filter={isCollimatePhase ? 'url(#mcs-prism-glow)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
            <text x="0" y="-10" fill="rgba(255,255,255,0.45)" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">INGRESS</text>
            <text x="0" y="2" fill={isRefractPhase ? '#FF3B30' : 'rgba(255,255,255,0.85)'} fontSize="7" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">PROMPT / RAG</text>
            <text x="0" y="14" fill={isCollimatePhase ? '#00EB88' : 'rgba(16,185,129,0.75)'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">DATAVERSE</text>

            {/* Ingress LED indicator */}
            <circle cx="-30" cy="-18" r="2.5" fill={isRefractPhase ? '#FF3B30' : isCollimatePhase ? '#00EB88' : 'rgba(255,255,255,0.3)'} />
          </g>

          {/* SECURE DLP GATEWAY DESTINATION (Right Node) */}
          <g transform="translate(405, 100)">
            <rect x="-42" y="-22" width="84" height="44" rx="8" fill="rgba(8, 20, 15, 0.96)" stroke={isReleasePhase ? '#c6ff34' : 'rgba(16, 185, 129, 0.4)'} strokeWidth={isReleasePhase ? '2.2' : '1'} filter={isReleasePhase ? 'url(#mcs-collimated-flash)' : 'none'} style={{ transition: 'all 0.3s ease' }} />
            <text x="0" y="-5" fill={isReleasePhase ? '#c6ff34' : 'rgba(255,255,255,0.5)'} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">DLP GATEWAY</text>
            <text x="0" y="8" fill={isReleasePhase ? '#ffffff' : 'rgba(16,185,129,0.8)'} fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">CONNECTORS</text>

            {/* Hardware lock ring */}
            <circle cx="-32" cy="0" r="4" fill="none" stroke={isReleasePhase ? '#c6ff34' : 'rgba(16, 185, 129, 0.4)'} strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* DISPERSION VENT (Top Output Vent for Refracted Unverified Prompts) */}
          <g transform="translate(230, 40)">
            <circle cx="0" cy="0" r="14" fill={isRefractPhase ? 'rgba(255, 59, 48, 0.25)' : 'rgba(8, 20, 15, 0.9)'} stroke={isRefractPhase ? '#FF3B30' : 'rgba(16, 185, 129, 0.3)'} strokeWidth={isRefractPhase ? '2' : '1'} filter={isRefractPhase ? 'url(#mcs-collimated-flash)' : 'none'} />
            <text x="0" y="3" fill={isRefractPhase ? '#FF3B30' : 'rgba(255,255,255,0.4)'} fontSize="6" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">DISSIPATE</text>

            {/* Dissipation Sparks */}
            {isRefractPhase && p1Progress > 0.7 && (
              <g>
                <circle cx="-12" cy="-10" r="2" fill="#FF9500" />
                <circle cx="14" cy="-8" r="1.5" fill="#FF3B30" />
                <circle cx="0" cy="-15" r="2" fill="#FF3B30" />
              </g>
            )}
          </g>

          {/* PHASE 1: UNVERIFIED PROBE REFRACTION & DISSIPATION */}
          {isRefractPhase && (
            <g>
              {/* Inbound Red Beam */}
              <line x1="50" y1="80" x2={p1InboundX} y2={p1InboundY} stroke="url(#mcs-prism-refract)" strokeWidth="3" filter="url(#mcs-prism-glow)" />
              <circle cx={p1InboundX} cy={p1InboundY} r="4.5" fill="#FF3B30" />

              {/* Upward Refracted Dissipation Beam */}
              {p1Progress > 0.6 && (
                <g>
                  <line x1="188" y1="100" x2={p1RefractX} y2={p1RefractY} stroke="#FF3B30" strokeWidth="2.5" strokeDasharray="3 2" filter="url(#mcs-collimated-flash)" />
                  <circle cx={p1RefractX} cy={p1RefractY} r="4" fill="#FF9500" />
                </g>
              )}
            </g>
          )}

          {/* PHASE 2: VERIFIED RAG INGESTION & QUANTUM COLLIMATION */}
          {isCollimatePhase && (
            <g>
              <line x1="50" y1="120" x2={p2X} y2={p2Y} stroke="url(#mcs-prism-rag)" strokeWidth="3" filter="url(#mcs-prism-glow)" />
              <circle cx={p2X} cy={p2Y} r="5" fill="#00EB88" filter="url(#mcs-collimated-flash)" />
            </g>
          )}

          {/* PHASE 3: SECURE COLLIMATED LASER RELEASE */}
          {isReleasePhase && (
            <g>
              {/* Outer Emerald Laser Aura */}
              <line x1="272" y1="100" x2={p3X} y2="100" stroke="url(#mcs-collimated-beam)" strokeWidth="4.5" filter="url(#mcs-collimated-flash)" />
              {/* Intense Inner Core Laser Line */}
              <line x1="272" y1="100" x2={p3X} y2="100" stroke="#ffffff" strokeWidth="1.8" />
              <circle cx={p3X} cy="100" r="6" fill="#c6ff34" filter="url(#mcs-collimated-flash)" />
            </g>
          )}

          {/* ─── CENTERPIECE: THE DUAL-HULL COGNITIVE PRISM ─── */}
          <g transform="translate(230, 100)">
            {/* Outer Crystalline Shield Ring */}
            <polygon points="0,-54 48,0 0,54 -48,0" fill="none" stroke={isReleasePhase ? '#c6ff34' : isCollimatePhase ? '#00EB88' : isRefractPhase ? '#FF3B30' : 'rgba(16, 185, 129, 0.3)'} strokeWidth="1" strokeDasharray="4 4" opacity="0.75" />

            {/* Inner Core Prism Geometry */}
            <polygon points="0,-42 36,0 0,42 -36,0" fill={isReleasePhase ? 'rgba(198, 255, 52, 0.22)' : isCollimatePhase ? 'rgba(0, 235, 136, 0.25)' : isRefractPhase ? 'rgba(255, 59, 48, 0.18)' : 'rgba(16, 185, 129, 0.1)'} stroke={isReleasePhase ? '#c6ff34' : isCollimatePhase ? '#00EB88' : isRefractPhase ? '#FF3B30' : 'rgba(16, 185, 129, 0.55)'} strokeWidth={isCollimatePhase || isReleasePhase || isRefractPhase ? '2.5' : '1.4'} filter={isCollimatePhase || isReleasePhase ? 'url(#mcs-collimated-flash)' : isRefractPhase ? 'url(#mcs-prism-glow)' : 'none'} style={{ transition: 'all 0.35s ease' }} />

            {/* Internal Quantum Interferometry Light Rays */}
            <line x1="-18" y1="-10" x2="18" y2="10" stroke={isCollimatePhase ? '#00EB88' : 'rgba(255,255,255,0.15)'} strokeWidth="1" />
            <line x1="-18" y1="10" x2="18" y2="-10" stroke={isCollimatePhase ? '#00EB88' : 'rgba(255,255,255,0.15)'} strokeWidth="1" />
            <line x1="0" y1="-22" x2="0" y2="22" stroke={isRefractPhase ? '#FF3B30' : 'rgba(255,255,255,0.2)'} strokeWidth="1.2" />

            {/* Core Text Label */}
            <text x="0" y="-3" fill="#ffffff" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle">COGNITIVE</text>
            <text x="0" y="8" fill={isReleasePhase ? '#c6ff34' : isCollimatePhase ? '#00EB88' : isRefractPhase ? '#FF3B30' : '#10B981'} fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">
              {isReleasePhase ? 'RELEASE' : isCollimatePhase ? 'COLLIMATE' : isRefractPhase ? 'REFRACT' : 'PRISM'}
            </text>
          </g>

          {/* GATEWAY UNLOCK SHOCKWAVE RIPPLE */}
          {isReleasePhase && (
            <circle cx="405" cy="100" r={unlockR} fill="none" stroke="#c6ff34" strokeWidth="2" opacity={unlockOpacity} filter="url(#mcs-collimated-flash)" />
          )}

          {/* REAL-TIME MONOSPACE TELEMETRY TICKER BAR */}
          <g transform="translate(30, 194)">
            <rect x="0" y="0" width="400" height="18" rx="5" fill="rgba(8, 20, 15, 0.9)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" />
            <rect x="0" y="0" width={isReleasePhase ? 400 : isCollimatePhase ? 280 : isRefractPhase ? 140 : 400} height="18" rx="5" fill={isReleasePhase ? 'rgba(198, 255, 52, 0.25)' : isCollimatePhase ? 'rgba(0, 235, 136, 0.22)' : isRefractPhase ? 'rgba(255, 59, 48, 0.22)' : 'rgba(16, 185, 129, 0.18)'} style={{ transition: 'all 0.4s ease' }} />
            <text x="200" y="12" fill={isReleasePhase ? '#c6ff34' : isCollimatePhase ? '#00EB88' : isRefractPhase ? '#FF3B30' : '#ffffff'} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="900" textAnchor="middle" letterSpacing="0.04em">
              {isReleasePhase
                ? '[03 // SECURE_BEAM_RELEASED // ENTERPRISE_DLP_PASS]'
                : isCollimatePhase
                  ? '[02 // COGNITIVE_PRISM_COLLIMATION // GROUNDING: 100%]'
                  : isRefractPhase
                    ? '[01 // UNVERIFIED_PROBE_DEFLECTED // DLP_DISSIPATION_PASS]'
                    : '[COGNITIVE_PRISM_IDLE // ZERO_TRUST_ACTIVE]'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// ─── STRIPE-GRADE TOOL DETAIL MODAL COMPONENT (PARALLAX REVEAL ARCHITECTURE) ───
export function ToolDetailModal({ tool, onClose }) {
  useEffect(() => {
    if (!tool) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Lock page background scroll while modal is open
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [tool, onClose]);

  if (!tool) return null;

  const getToolDetails = (id) => {
    switch (id) {
      case 'power-bi':
        return {
          badge: "Semantic Data Storytelling",
          headline: "The Architecture Behind the Story.",
          subheadline: "Enterprise Power BI fails when it's just a report. We build semantic decision-support models that integrate interactive AI narratives, multimedia insights, and pixel-perfect clarity, ensuring your data experiences are actually used.",
          roiMetric: "100%",
          roiLabel: "Team Adoption & Zero Excel Chaos",
          capabilities: [
            { label: "AI Narrative Engine", desc: "Automated natural language insights explaining trend drivers instantly" },
            { label: "Persona-Based UX", desc: "Role-adaptive executive views tailored for CEO, CFO, and Ops leads" },
            { label: "Direct Lake Speed", desc: "Zero-copy OneLake Direct Lake engine for sub-second query latency" },
            { label: "Multimedia BI", desc: "Immersive reporting experiences with integrated video and interactive loops" }
          ],
          differentiators: [
            "Semantic decision-support models eliminating static dead metrics",
            "Executive-first persona drill-downs with role-based security",
            "Direct Lake lakehouse architecture over Microsoft Fabric",
            "White-label pixel-perfect dashboards team members actually use"
          ],
          color: "#F2C811",
          isPbiModal: true
        };
      case 'power-apps':
        return {
          badge: "CANVAS & PRO-CODE ENGINEERING",
          headline: "Enterprise Apps Without Low-Code Limits.",
          subheadline: "We eliminate the rigid boundaries of standard low-code. By pairing the speed and native security of Power Apps with custom React and TypeScript components, we engineer high-performance tools tailored to your exact operational workflows.",
          roiMetric: "-70%",
          roiLabel: "Faster Than Custom Web Dev",
          capabilities: [
            { label: "Canvas & Model Workflows", desc: "Pixel-perfect Canvas UIs paired with Dataverse business rules and security roles" },
            { label: "React & PCF Controls", desc: "Custom React/TypeScript components compiled to native PCF controls — zero low-code limits" },
            { label: "Dataverse & API Engine", desc: "Relational Dataverse schemas integrated with enterprise APIs and row-level security" },
            { label: "Tailored UI/UX", desc: "Enterprise-grade user experiences designed to ensure 100% operational uptake" }
          ],
          differentiators: [
            "Custom React & PCF components eliminating low-code UX limits",
            "Dataverse & enterprise API connectors for real-time data sync",
            "Automated ALM pipelines layering solutions from Dev → UAT → Prod",
            "Offline-capable mobile apps with background sync and conflict resolution"
          ],
          color: "#C73590",
          isPbaModal: true
        };
      case 'power-automate':
        return {
          badge: "Process Neural Mesh",
          headline: "Self-Healing Autonomous Workflows",
          subheadline: "We don't chain actions — we engineer resilient process architectures. Our flows handle thousands of concurrent transactions with automated retry logic, dead-letter queues, and real-time observability that catches failures before users notice.",
          roiMetric: "99.9%",
          roiLabel: "Transaction Success Rate",
          capabilities: [
            { label: "Cloud Flows", desc: "Event-driven orchestrations with parallel branching, scoping, and custom error handling" },
            { label: "Desktop RPA", desc: "Headless bot pools automating legacy systems — SAP, AS400, mainframe screen scraping" },
            { label: "Custom Connectors", desc: "OpenAPI-spec connectors bridging proprietary REST/GraphQL/SOAP endpoints" },
            { label: "Process Mining", desc: "AI-powered bottleneck discovery analyzing millions of event logs automatically" }
          ],
          differentiators: [
            "Exponential retry with jitter preventing cascading API failures",
            "Dead-letter queues capturing and auto-reprocessing failed transactions",
            "Concurrency throttling processing 10,000+ daily events without drops",
            "PagerDuty + Teams alerting with SLA breach prediction"
          ],
          color: "#00BCF2",
          isPauModal: true,
          svg: (
            <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="pa-flow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00BCF2" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#00BCF2" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#c6ff34" stopOpacity="0.8" />
                </linearGradient>
                <filter id="pa-glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect width="480" height="300" rx="16" fill="#08080A" />
              {/* Radial glow */}
              <circle cx="240" cy="150" r="120" fill="#00BCF2" opacity="0.06" />
              {/* Flow connections */}
              <path d="M60 150 C100 150 100 80 140 80" stroke="rgba(0,188,242,0.3)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M60 150 C100 150 100 220 140 220" stroke="rgba(0,188,242,0.3)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M200 80 C240 80 240 150 280 150" stroke="url(#pa-flow)" strokeWidth="2.5" />
              <path d="M200 220 C240 220 240 150 280 150" stroke="url(#pa-flow)" strokeWidth="2.5" />
              <path d="M340 150 L420 150" stroke="url(#pa-flow)" strokeWidth="3" filter="url(#pa-glow)" />
              {/* Retry loop */}
              <path d="M170 55 Q210 35 200 70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              {/* Nodes */}
              {/* Trigger */}
              <rect x="30" y="128" width="60" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#00BCF2" strokeWidth="2" />
              <text x="42" y="146" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">TRIGGER</text>
              <text x="42" y="161" fill="#00BCF2" fontSize="9" fontWeight="bold" fontFamily="monospace">EVENT</text>
              {/* Process A */}
              <rect x="120" y="58" width="80" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#00BCF2" strokeWidth="1.5" />
              <text x="134" y="76" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">VALIDATE</text>
              <text x="134" y="91" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">TRANSFORM</text>
              {/* Process B */}
              <rect x="120" y="198" width="80" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#00BCF2" strokeWidth="1.5" />
              <text x="134" y="216" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">WEBHOOK</text>
              <text x="134" y="231" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">API BRIDGE</text>
              {/* Merge node */}
              <circle cx="310" cy="150" r="30" fill="rgba(12,12,16,0.9)" stroke="#c6ff34" strokeWidth="2.5" />
              <text x="293" y="147" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">MERGE</text>
              <text x="295" y="160" fill="#c6ff34" fontSize="10" fontWeight="bold" fontFamily="monospace">EXEC</text>
              {/* Success */}
              <circle cx="420" cy="150" r="20" fill="rgba(198,255,52,0.15)" stroke="#c6ff34" strokeWidth="2" filter="url(#pa-glow)" />
              <text x="413" y="154" fill="#c6ff34" fontSize="14" fontWeight="bold">✓</text>
              {/* Status bar */}
              <rect x="30" y="268" width="420" height="12" rx="6" fill="rgba(255,255,255,0.03)" />
              <rect x="30" y="268" width="416" height="12" rx="6" fill="rgba(0,188,242,0.2)" />
              <text x="240" y="278" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">99.97% SUCCESS — 12,847 TRANSACTIONS / 24H</text>
            </svg>
          )
        };
      case 'copilot-studio':
        return {
          badge: "Cognitive Agent Framework",
          headline: "Enterprise AI That Acts, Not Just Answers",
          subheadline: "We build AI agents that don't hallucinate. Every response is grounded in your enterprise data — SharePoint, Dataverse, SQL — with multi-step reasoning chains, plugin actions, and strict security boundaries that make autonomous decisions safely.",
          roiMetric: "10x",
          roiLabel: "Faster Knowledge Resolution",
          capabilities: [
            { label: "Grounded RAG", desc: "Retrieval-augmented generation pulling verified answers from internal knowledge bases" },
            { label: "Plugin Actions", desc: "Agents that trigger Power Automate flows, update Dataverse records, and send emails autonomously" },
            { label: "Multi-Agent", desc: "Specialized agent orchestration — each agent handles a domain, a coordinator routes intent" },
            { label: "Guardrails", desc: "Content moderation, topic blocking, and response validation preventing off-topic drift" }
          ],
          differentiators: [
            "Zero-hallucination architecture with citation-backed responses",
            "Dynamic knowledge ingestion from SharePoint, Dataverse, and custom APIs",
            "Conversation analytics dashboard tracking resolution rates and CSAT",
            "Enterprise SSO with conditional access and DLP policy enforcement"
          ],
          color: "#10B981",
          isMcsModal: true,
          svg: (
            <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="cs-rad" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#107C41" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#107C41" stopOpacity="0" />
                </linearGradient>
                <filter id="cs-glow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect width="480" height="300" rx="16" fill="#08080A" />
              {/* Central brain */}
              <circle cx="240" cy="140" r="90" fill="url(#cs-rad)" />
              <circle cx="240" cy="140" r="50" fill="rgba(16,124,65,0.1)" stroke="#107C41" strokeWidth="2" />
              <circle cx="240" cy="140" r="20" fill="rgba(198,255,52,0.2)" stroke="#c6ff34" strokeWidth="2" filter="url(#cs-glow)" />
              <text x="233" y="145" fill="#c6ff34" fontSize="14" fontWeight="bold">AI</text>
              {/* Orbiting rings */}
              <ellipse cx="240" cy="140" rx="110" ry="55" fill="none" stroke="rgba(16,124,65,0.2)" strokeWidth="1" strokeDasharray="3 6" />
              <ellipse cx="240" cy="140" rx="75" ry="37" fill="none" stroke="rgba(16,124,65,0.15)" strokeWidth="1" strokeDasharray="2 4" />
              {/* Satellite nodes */}
              {/* RAG */}
              <g>
                <line x1="170" y1="95" x2="215" y2="125" stroke="rgba(16,124,65,0.4)" strokeWidth="1.5" />
                <rect x="100" y="72" width="72" height="44" rx="10" fill="rgba(12,12,16,0.95)" stroke="#107C41" strokeWidth="1.5" />
                <text x="115" y="90" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">RETRIEVAL</text>
                <text x="120" y="105" fill="#107C41" fontSize="11" fontWeight="bold">RAG</text>
              </g>
              {/* LLM */}
              <g>
                <line x1="310" y1="95" x2="265" y2="125" stroke="rgba(16,124,65,0.4)" strokeWidth="1.5" />
                <rect x="308" y="72" width="72" height="44" rx="10" fill="rgba(12,12,16,0.95)" stroke="#107C41" strokeWidth="1.5" />
                <text x="322" y="90" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">REASONING</text>
                <text x="327" y="105" fill="#107C41" fontSize="11" fontWeight="bold">LLM</text>
              </g>
              {/* Data */}
              <g>
                <line x1="170" y1="185" x2="215" y2="160" stroke="rgba(16,124,65,0.4)" strokeWidth="1.5" />
                <rect x="90" y="174" width="82" height="44" rx="10" fill="rgba(12,12,16,0.95)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <text x="106" y="192" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">DATAVERSE</text>
                <text x="106" y="207" fill="#ffffff" fontSize="10" fontWeight="bold">DATA</text>
              </g>
              {/* Actions */}
              <g>
                <line x1="310" y1="185" x2="265" y2="160" stroke="rgba(16,124,65,0.4)" strokeWidth="1.5" />
                <rect x="308" y="174" width="82" height="44" rx="10" fill="rgba(12,12,16,0.95)" stroke="rgba(198,255,52,0.3)" strokeWidth="1.5" />
                <text x="322" y="192" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">PLUGINS</text>
                <text x="322" y="207" fill="#c6ff34" fontSize="10" fontWeight="bold">ACTIONS</text>
              </g>
              {/* Guardrails bar */}
              <rect x="120" y="248" width="240" height="28" rx="8" fill="rgba(16,124,65,0.08)" stroke="rgba(16,124,65,0.25)" strokeWidth="1" />
              <text x="240" y="266" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">🛡 GUARDRAILS · GROUNDING · ZERO HALLUCINATION</text>
            </svg>
          )
        };
      default:
        return null;
    }
  };

  const details = getToolDetails(tool.id);

  return (
    <AnimatePresence>
      <div
        className={details?.isPbiModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pbi' : details?.isPbaModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pba' : details?.isPauModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pau' : details?.isMcsModal ? 'custom-modal-scrollbar custom-modal-scrollbar-mcs' : 'custom-modal-scrollbar'}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '3rem 1rem',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
        {/* NeuralBI Ambient Mesh Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 10, 0.92)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            zIndex: 1,
            overflow: 'hidden',
            willChange: 'opacity'
          }}
        >
          {/* Noise Texture Layer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* Mesh Orb 1 (Bottom Left: Vibrant Neon Lime) */}
          <div style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-100px',
            width: '520px',
            height: '520px',
            background: 'radial-gradient(circle, rgba(198, 255, 52, 0.16) 0%, rgba(198, 255, 52, 0) 70%)',
            filter: 'blur(140px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

          {/* Mesh Orb 2 (Bottom Right: Sophisticated Emerald Green) */}
          <div style={{
            position: 'absolute',
            bottom: '-140px',
            right: '-120px',
            width: '560px',
            height: '560px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0) 70%)',
            filter: 'blur(150px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

          {/* Mesh Orb 3 (Center Top: Cool Tech Cyan) */}
          <div style={{
            position: 'absolute',
            top: '-160px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '620px',
            height: '620px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.13) 0%, rgba(6, 182, 212, 0) 70%)',
            filter: 'blur(150px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

          {/* Mesh Orb 4 (Side Accent: Warm Amber Gold) */}
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '4%',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(242, 200, 17, 0.08) 0%, rgba(242, 200, 17, 0) 70%)',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />
        </motion.div>

        {/* Floating Pop-up Glassmorphism Card */}
        <motion.div
          className={details?.isPbiModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pbi' : details?.isPbaModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pba' : details?.isPauModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pau' : details?.isMcsModal ? 'custom-modal-scrollbar custom-modal-scrollbar-mcs' : 'custom-modal-scrollbar'}
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '1080px',
            maxHeight: '86vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            scrollBehavior: 'smooth',
            margin: 'auto',
            background: 'linear-gradient(145deg, rgba(8, 10, 15, 0.97) 0%, rgba(4, 5, 8, 0.99) 100%)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: details?.isPbiModal
              ? '1px solid rgba(242, 200, 17, 0.4)'
              : details?.isPbaModal
                ? '1px solid rgba(199, 53, 144, 0.5)'
                : details?.isPauModal
                  ? '1px solid rgba(0, 188, 242, 0.5)'
                  : details?.isMcsModal
                    ? '1px solid rgba(16, 185, 129, 0.5)'
                    : '1px solid rgba(198, 255, 52, 0.25)',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: details?.isPbiModal
              ? `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(242,200,17,0.18), inset 0 1px 0 rgba(255,255,255,0.18)`
              : details?.isPbaModal
                ? `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(199,53,144,0.25), inset 0 1px 0 rgba(255,255,255,0.18)`
                : details?.isPauModal
                  ? `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(0,188,242,0.22), inset 0 1px 0 rgba(255,255,255,0.18)`
                  : details?.isMcsModal
                    ? `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(16,185,129,0.22), inset 0 1px 0 rgba(255,255,255,0.18)`
                    : `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(198,255,52,0.12), inset 0 1px 0 rgba(255,255,255,0.18)`,
            willChange: 'transform, opacity'
          }}
        >
          {/* Top-right brand glow */}
          <div style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: '400px',
            height: '400px',
            background: details?.color,
            filter: 'blur(160px)',
            opacity: details?.isPbaModal || details?.isPauModal || details?.isMcsModal ? 0.15 : 0.1,
            pointerEvents: 'none',
            borderRadius: '50%'
          }} />

          {/* Sticky Glass Top Header Bar */}
          <div style={{
            position: 'sticky',
            top: '-3rem',
            marginTop: '-3rem',
            marginLeft: '-3rem',
            marginRight: '-3rem',
            padding: '1.4rem 2.5rem 1.2rem 2.5rem',
            background: 'linear-gradient(180deg, rgba(6, 8, 12, 0.96) 0%, rgba(6, 8, 12, 0.85) 75%, transparent 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '24px 24px 0 0',
            zIndex: 40,
            marginBottom: '2rem'
          }}>
            {/* Logo + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                padding: '0.55rem',
                background: `linear-gradient(135deg, ${details?.color}18, transparent)`,
                borderRadius: '12px',
                border: `1px solid ${details?.color}35`,
                boxShadow: `0 4px 16px ${details?.color}15`
              }}>
                <img src={tool.logo} alt={tool.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                {!details?.isPbiModal && !details?.isPbaModal && !details?.isPauModal && !details?.isMcsModal && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: details?.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      background: `${details?.color}12`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      border: `1px solid ${details?.color}25`
                    }}>
                      {details?.badge}
                    </span>
                  </div>
                )}
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '-0.02em',
                  textShadow: details?.isPbiModal
                    ? '0 0 24px rgba(242, 200, 17, 0.3)'
                    : details?.isPbaModal
                      ? '0 0 24px rgba(199, 53, 144, 0.35)'
                      : details?.isPauModal
                        ? '0 0 24px rgba(0, 188, 242, 0.35)'
                        : details?.isMcsModal
                          ? '0 0 24px rgba(16, 185, 129, 0.35)'
                          : 'none'
                }}>
                  {tool.tool}
                </h2>
              </div>
            </div>

            {/* Premium Interactive Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = details?.isPbiModal
                  ? 'rgba(242, 200, 17, 0.18)'
                  : details?.isPbaModal
                    ? 'rgba(199, 53, 144, 0.22)'
                    : details?.isPauModal
                      ? 'rgba(0, 188, 242, 0.22)'
                      : details?.isMcsModal
                        ? 'rgba(16, 185, 129, 0.22)'
                        : 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = details?.isPbiModal
                  ? 'rgba(242, 200, 17, 0.5)'
                  : details?.isPbaModal
                    ? 'rgba(199, 53, 144, 0.55)'
                    : details?.isPauModal
                      ? 'rgba(0, 188, 242, 0.55)'
                      : details?.isMcsModal
                        ? 'rgba(16, 185, 129, 0.55)'
                        : 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              ✕
            </button>
          </div>

          {/* Section Snap Focus Reveal Layout (For Power BI Modal) vs Single View */}
          {details?.isPbiModal ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', paddingBottom: '6rem', paddingTop: '1rem' }}>

              {/* Section Snap Row 01: Executive Adoption Narrative */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {details?.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem'
                  }}>
                    {details?.subheadline}
                  </p>

                  <div style={{
                    background: 'rgba(242, 200, 17, 0.05)',
                    border: '1px solid rgba(242, 200, 17, 0.22)',
                    borderRadius: '14px',
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: 'fit-content'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#F2C811',
                      lineHeight: 1
                    }}>
                      {details?.roiMetric}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.35
                    }}>
                      {details?.roiLabel}
                    </span>
                  </div>
                </div>

                {/* Right Visual 01 (Executive Dashboard) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbiDataStorytellingUiAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 02: Automated Reasoning & UX */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.35rem',
                    letterSpacing: '-0.015em'
                  }}>
                    High-Adoption Capabilities
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.85rem'
                  }}>
                    {details?.capabilities.map((cap, idx) => (
                      <div key={idx} style={{
                        padding: '1rem 1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#F2C811',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          {cap.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.45
                        }}>
                          {cap.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual 02 (AI Insights Overlay) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbiAiInsightsOverlayAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 03: Semantic Mesh Architecture */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.15rem',
                    letterSpacing: '-0.015em'
                  }}>
                    NeuralBI Differentiators
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {details?.differentiators.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
                        <span style={{ color: '#F2C811', fontSize: '0.75rem', marginTop: '0.15rem' }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: 'linear-gradient(135deg, rgba(242, 200, 17, 0.22) 0%, rgba(242, 200, 17, 0.08) 100%)',
                      border: '1px solid rgba(242, 200, 17, 0.45)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(242, 200, 17, 0.18)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(242, 200, 17, 0.35) 0%, rgba(242, 200, 17, 0.15) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(242, 200, 17, 0.7)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(242, 200, 17, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(242, 200, 17, 0.22) 0%, rgba(242, 200, 17, 0.08) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(242, 200, 17, 0.45)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(242, 200, 17, 0.18)';
                    }}
                  >
                    Deploy Power BI Architecture →
                  </button>
                </div>

                {/* Right Visual 03 (Semantic Model Graph) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbiSemanticModelGraphAnim />
                </div>
              </motion.div>

            </div>
          ) : details?.isPbaModal ? (
            /* Section Snap Focus Reveal Layout (For Power Apps Modal) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', paddingBottom: '6rem', paddingTop: '1rem' }}>

              {/* Section Snap Row 01: Three Paradigms High-Level Overview & Zoom Drill-Down */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {details?.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem'
                  }}>
                    {details?.subheadline}
                  </p>

                  <div style={{
                    background: 'rgba(199, 53, 144, 0.08)',
                    border: '1px solid rgba(199, 53, 144, 0.3)',
                    borderRadius: '14px',
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: 'fit-content'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#E24AA8',
                      lineHeight: 1
                    }}>
                      {details?.roiMetric}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.35
                    }}>
                      {details?.roiLabel}
                    </span>
                  </div>
                </div>

                {/* Right Visual 01 (High-Level Paradigms Zoom Matrix) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbaThreeParadigmsAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 02: Pro-Code & Dataverse Integration Engine */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.35rem',
                    letterSpacing: '-0.015em'
                  }}>
                    Pro-Code & Dataverse Capabilities
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.85rem'
                  }}>
                    {details?.capabilities.map((cap, idx) => (
                      <div key={idx} style={{
                        padding: '1rem 1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#E24AA8',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          {cap.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.45
                        }}>
                          {cap.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual 02 (Real-Time PCF Streaming Engine) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbaProCodeApiEngineAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 03: Unified Dataverse Relational Mesh */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.15rem',
                    letterSpacing: '-0.015em'
                  }}>
                    NeuralBI Pro-Code Differentiators
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {details?.differentiators.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
                        <span style={{ color: '#E24AA8', fontSize: '0.75rem', marginTop: '0.15rem' }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: 'linear-gradient(135deg, rgba(199, 53, 144, 0.35) 0%, rgba(199, 53, 144, 0.12) 100%)',
                      border: '1px solid rgba(199, 53, 144, 0.55)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(199, 53, 144, 0.25)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(199, 53, 144, 0.55) 0%, rgba(199, 53, 144, 0.25) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(199, 53, 144, 0.85)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(199, 53, 144, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(199, 53, 144, 0.35) 0%, rgba(199, 53, 144, 0.12) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(199, 53, 144, 0.55)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(199, 53, 144, 0.25)';
                    }}
                  >
                    Deploy Power Apps Architecture →
                  </button>
                </div>

                {/* Right Visual 03 (Dataverse Relational Mesh) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbaEnterpriseDataverseMeshAnim />
                </div>
              </motion.div>

            </div>
          ) : details?.isPauModal ? (
            /* Section Snap Focus Reveal Layout (For Power Automate Modal) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', paddingBottom: '6rem', paddingTop: '1rem' }}>

              {/* Section Snap Row 01: Autonomous Workflows & Process Mesh */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {details?.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem'
                  }}>
                    {details?.subheadline}
                  </p>

                  <div style={{
                    background: 'rgba(0, 188, 242, 0.05)',
                    border: '1px solid rgba(0, 188, 242, 0.25)',
                    borderRadius: '14px',
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: 'fit-content'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#00BCF2',
                      lineHeight: 1
                    }}>
                      {details?.roiMetric}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.35
                    }}>
                      {details?.roiLabel}
                    </span>
                  </div>
                </div>

                {/* Right Visual 01 (Self-Healing Autonomous Process Engine) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PauSelfHealingFlowAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 02: Resilient Capabilities */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.35rem',
                    letterSpacing: '-0.015em'
                  }}>
                    Neural Automation Capabilities
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.85rem'
                  }}>
                    {details?.capabilities.map((cap, idx) => (
                      <div key={idx} style={{
                        padding: '1rem 1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#00BCF2',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          {cap.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.45
                        }}>
                          {cap.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual 02 (The Event-Driven Automation Mesh) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PauEventDrivenMeshAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 03: NeuralBI Differentiators */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.15rem',
                    letterSpacing: '-0.015em'
                  }}>
                    NeuralBI Process Differentiators
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {details?.differentiators.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
                        <span style={{ color: '#00BCF2', fontSize: '0.75rem', marginTop: '0.15rem' }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: 'linear-gradient(135deg, rgba(0, 188, 242, 0.35) 0%, rgba(0, 120, 212, 0.12) 100%)',
                      border: '1px solid rgba(0, 188, 242, 0.55)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(0, 188, 242, 0.25)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 188, 242, 0.55) 0%, rgba(0, 120, 212, 0.25) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(0, 188, 242, 0.85)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 188, 242, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 188, 242, 0.35) 0%, rgba(0, 120, 212, 0.12) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(0, 188, 242, 0.55)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 188, 242, 0.25)';
                    }}
                  >
                    Deploy Power Automate Architecture →
                  </button>
                </div>

                {/* Right Visual 03 (Zero-Trust Resilient Mesh & DLQ Auto-Recovery) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PauResilientDlqMeshAnim />
                </div>
              </motion.div>

            </div>
          ) : details?.isMcsModal ? (
            /* Section Snap Focus Reveal Layout (For Copilot Studio Modal) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', paddingBottom: '6rem', paddingTop: '1rem' }}>

              {/* Section Snap Row 01: Cognitive Agent Framework */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {details?.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem'
                  }}>
                    {details?.subheadline}
                  </p>

                  <div style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '14px',
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: 'fit-content'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#10B981',
                      lineHeight: 1
                    }}>
                      {details?.roiMetric}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.35
                    }}>
                      {details?.roiLabel}
                    </span>
                  </div>
                </div>

                {/* Right Visual 01 (The Grounded Reasoning & Action Loop) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <McsGroundedReasoningAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 02: Enterprise Agent Capabilities */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.35rem',
                    letterSpacing: '-0.015em'
                  }}>
                    Autonomous Multi-Agent Capabilities
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.85rem'
                  }}>
                    {details?.capabilities.map((cap, idx) => (
                      <div key={idx} style={{
                        padding: '1rem 1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#10B981',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          {cap.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.45
                        }}>
                          {cap.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual 02 (Multi-Step Agentic Chain) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <McsMultiStepChainAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 03: NeuralBI Differentiators */}
              <motion.div
                initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginBottom: '0.85rem'
                  }}>
                    NeuralBI Agent Differentiators
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 2rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}>
                    {details?.differentiators.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.5
                      }}>
                        <span style={{ color: '#10B981', fontSize: '0.75rem', marginTop: '0.2rem' }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.12) 100%)',
                      border: '1px solid rgba(16, 185, 129, 0.55)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.25)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.55) 0%, rgba(5, 150, 105, 0.25) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.85)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.12) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.55)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
                    }}
                  >
                    Deploy Copilot Studio Architecture →
                  </button>
                </div>

                {/* Right Visual 03 (The Zero-Hallucination Containment Field) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <McsZeroHallucinationFieldAnim />
                </div>
              </motion.div>

            </div>
          ) : (
            /* General Single Column Modal for non-PBI Tools */
            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, marginBottom: '1rem' }}>
                  {details?.headline}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {details?.subheadline}
                </p>
                <div style={{ background: details?.isMcsModal ? 'rgba(16, 185, 129, 0.05)' : 'rgba(198, 255, 52, 0.04)', border: details?.isMcsModal ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(198, 255, 52, 0.15)', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: details?.color || '#c6ff34', lineHeight: 1 }}>{details?.roiMetric}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>{details?.roiLabel}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                  {details?.capabilities.map((cap, idx) => (
                    <div key={idx} style={{ padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, color: details?.color, display: 'block', marginBottom: '0.3rem' }}>{cap.label}</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{cap.desc}</span>
                    </div>
                  ))}
                </div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>NeuralBI Differentiators</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {details?.differentiators.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                      <span style={{ color: details?.color || '#c6ff34', fontSize: '0.7rem', marginTop: '0.15rem' }}>◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '2rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.015)', border: details?.isMcsModal ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1rem', boxShadow: details?.isMcsModal ? '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(16,185,129,0.12)' : '0 20px 50px rgba(0,0,0,0.5)' }}>
                  {details?.svg}
                </div>
                <button
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: details?.isMcsModal ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.12) 100%)' : 'linear-gradient(135deg, rgba(198, 255, 52, 0.2) 0%, rgba(198, 255, 52, 0.05) 100%)',
                    border: details?.isMcsModal ? '1px solid rgba(16, 185, 129, 0.55)' : '1px solid rgba(198, 255, 52, 0.4)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: details?.isMcsModal ? '0 8px 25px rgba(16, 185, 129, 0.25)' : '0 8px 25px rgba(198, 255, 52, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (details?.isMcsModal) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.55) 0%, rgba(5, 150, 105, 0.25) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.85)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (details?.isMcsModal) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.12) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.55)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
                    }
                  }}
                >
                  Book {tool.tool} Architecture Review →
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── SUB-COMPONENTS FOR REDESIGNED ARSENAL ───

function SuiForkArsenal({ activeIndex, isRemix, onOpenModal }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--color-paper)', display: 'flex', alignItems: 'center', color: 'var(--color-ink)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '100px 100px', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'flex', gap: '6rem', alignItems: 'center', zIndex: 10 }}>
        <div style={{ flex: 1, position: 'relative', height: '550px', overflow: 'hidden' }}>
          {arsenalData.map((item, idx) => {
            const isActive = activeIndex === idx;
            const isPast = activeIndex > idx;
            const yOffset = isActive ? '0%' : isPast ? '-100%' : '100%';

            return (
              <div key={item.id} style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transform: `translateY(${yOffset})`,
                transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
                opacity: isActive ? 1 : 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', color: 'var(--color-accent)', fontSize: '1rem' }}>[{idx + 1}/4]</span>
                  <span style={{ height: '1px', width: '40px', background: 'var(--color-accent)' }} />
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>{item.architecture}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 6vw, 6.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2rem', textTransform: 'uppercase', color: '#ffffff' }}>
                  {item.tool}
                </h2>

                <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '1.5rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'var(--color-ink-2)', lineHeight: 1.6, maxWidth: '85%', marginBottom: '2.5rem' }}>{item.body}</p>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {item.specs.map((spec, i) => (
                    <div key={i} style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-ink-2)' }}>
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ width: '450px', height: '550px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }} />
          {arsenalData.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={item.id} style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
                transition: 'all 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
                filter: isActive ? 'drop-shadow(0 0 40px rgba(198,255,52,0.15))' : 'none'
              }}>
                <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            );
          })}

          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '4px' }}>
            {[1, 2, 3].map(i => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.5 }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CinematicArsenal() {
  const [slide, setSlide] = React.useState(0);
  const nextSlide = () => setSlide((prev) => (prev + 1) % arsenalData.length);
  const prevSlide = () => setSlide((prev) => (prev - 1 + arsenalData.length) % arsenalData.length);
  const currentItem = arsenalData[slide];

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', padding: '8rem 0' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '4rem', minHeight: '350px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>
              System Architecture // 04
            </span>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.05em', lineHeight: 0.8, opacity: 0.05 }}>
              0{slide + 1}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
            <button
              onClick={prevSlide}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0px',
                color: '#fff',
                padding: '1rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              PREV
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
              0{slide + 1} / 0{arsenalData.length}
            </span>
            <button
              onClick={nextSlide}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0px',
                color: '#fff',
                padding: '1rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              NEXT
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', height: '400px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ width: '56px', height: '56px', filter: 'grayscale(100%) contrast(1.5)' }}>
                  <img src={currentItem.logo} alt={currentItem.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0, lineHeight: 1 }}>
                  {currentItem.tool}
                </h2>
              </div>
              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '2rem', color: '#a1a1aa', fontWeight: 400, marginBottom: '1.5rem' }}>{currentItem.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: '#71717a', lineHeight: 1.5, maxWidth: '90%' }}>{currentItem.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ModernV2Arsenal() {
  const [slide, setSlide] = React.useState(0);
  const nextSlide = () => setSlide((prev) => (prev + 1) % arsenalData.length);
  const prevSlide = () => setSlide((prev) => (prev - 1 + arsenalData.length) % arsenalData.length);
  const currentItem = arsenalData[slide];

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 10 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 800, color: '#fff' }}>The Arsenal</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)' }}>Layered intelligence. Unprecedented scale.</p>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: '#0c0c0e',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                <div style={{ width: '64px', height: '64px' }}>
                  <img src={currentItem.logo} alt={currentItem.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '0.5rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#c6ff34', border: '1px solid rgba(198,255,52,0.1)' }}>
                  {currentItem.metric}
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.2rem' }}>{currentItem.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{currentItem.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 10 }}>
          <button
            onClick={prevSlide}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {arsenalData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlide(idx)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: slide === idx ? '#c6ff34' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function TechV4Arsenal({ isRemix }) {
  const fontHeader = isRemix ? 'var(--font-display)' : 'var(--font-mono)';
  const fontLabel = isRemix ? 'var(--font-display)' : 'var(--font-mono)';
  const fontLabelSmall = isRemix ? 'var(--font-sans)' : 'var(--font-mono)';

  return (
    <section style={{ position: 'relative', width: '100%', background: '#020202', padding: '8rem 0' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        <div style={{ borderBottom: '1px dashed rgba(198,255,52,0.3)', paddingBottom: '2rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: fontLabelSmall, fontSize: '0.85rem', color: '#c6ff34' }}>
            [SYSTEM_CAPABILITIES_MANIFEST]
          </span>
          <h2 style={{ fontFamily: fontHeader, fontSize: '3rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            THE ARSENAL
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {arsenalData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '4rem',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '3rem',
                background: '#050505',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '4px', left: '4px', fontSize: '0.5rem', color: 'rgba(198,255,52,0.3)' }}>+</div>
              <div style={{ position: 'absolute', top: '4px', right: '4px', fontSize: '0.5rem', color: 'rgba(198,255,52,0.3)' }}>+</div>
              <div style={{ position: 'absolute', bottom: '4px', left: '4px', fontSize: '0.5rem', color: 'rgba(198,255,52,0.3)' }}>+</div>
              <div style={{ position: 'absolute', bottom: '4px', right: '4px', fontSize: '0.5rem', color: 'rgba(198,255,52,0.3)' }}>+</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRight: '1px dashed rgba(255,255,255,0.1)', paddingRight: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', filter: 'sepia(1) hue-rotate(50deg) saturate(5)' }}>
                    <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: fontLabel, fontSize: '1.25rem', color: '#fff', fontWeight: 'bold', display: 'block' }}>
                      {item.tool}
                    </span>
                    <span style={{ fontFamily: fontLabelSmall, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                      0{idx + 1} // SYS_VAL
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <span style={{ fontFamily: fontLabel, fontSize: '0.8rem', color: '#c6ff34', display: 'block' }}>
                    {item.metric}
                  </span>
                  <span style={{ fontFamily: fontLabelSmall, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                    {item.architecture}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: fontHeader, fontSize: '2rem', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                  {item.body}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  {item.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontFamily: fontLabelSmall,
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '0.4rem 0.8rem',
                        background: 'rgba(255,255,255,0.02)'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AWWWARDS-LEVEL DATA NARRATIVE ARSENAL CARD ───
function ArsenalCard({ item, effect, onOpenModal }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);
  const isPbi = item.id === 'power-bi';
  const isPba = item.id === 'power-apps';
  const isPau = item.id === 'power-automate';
  const isMcs = item.id === 'copilot-studio';

  // Power BI Pills vs Power Apps Pills vs Power Automate Pills vs Copilot Studio Pills
  const pbiPills = [
    {
      label: 'Interactive Executive Dashboards 2.0',
      badge: '60 FPS',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(242,200,17,0.8))' : 'none', transition: 'all 0.3s ease' }}>
          <rect x="2" y="2" width="5" height="5" rx="1" />
          <rect x="9" y="2" width="5" height="5" rx="1" />
          <rect x="2" y="9" width="12" height="5" rx="1" />
        </svg>
      )
    },
    {
      label: 'Fabric Direct Lake Semantic Model',
      badge: '0.04ms',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(242,200,17,0.8))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M9 1.5L2.5 9H8.5L7 14.5L13.5 7H7.5L9 1.5Z" fill={hovered ? 'rgba(242,200,17,0.25)' : 'none'} />
        </svg>
      )
    },
    {
      label: 'Automated AI Reasoning & UX Storytelling',
      badge: 'AI-Native',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(242,200,17,0.8))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 2C8 4.5 9.5 6 12 6C9.5 6 8 7.5 8 10C8 7.5 6.5 6 4 6C6.5 6 8 4.5 8 2Z" fill={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} />
          <path d="M12.5 10.5C12.5 11.5 13 12 14 12C13 12 12.5 12.5 12.5 13.5C12.5 12.5 12 12 11 12C12 12 12.5 11.5 12.5 10.5Z" fill={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} />
        </svg>
      )
    },
    {
      label: 'Role-Based Persona Security Architecture',
      badge: 'RLS Pro',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(242,200,17,0.8))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 1.5L13.5 4V7.5C13.5 11 11 13.5 8 14.5C5 13.5 2.5 11 2.5 7.5V4L8 1.5Z" fill={hovered ? 'rgba(242,200,17,0.2)' : 'none'} />
          <path d="M8 6.5V9.5M6.5 8H9.5" strokeWidth="1.2" />
        </svg>
      )
    }
  ];

  const pbaPills = [
    {
      label: 'Custom React & PCF Code Components',
      badge: 'React 18',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(199,53,144,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <circle cx="8" cy="8" r="2" fill={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.6)'} />
          <ellipse cx="8" cy="8" rx="6.5" ry="2.5" transform="rotate(30 8 8)" />
          <ellipse cx="8" cy="8" rx="6.5" ry="2.5" transform="rotate(150 8 8)" />
        </svg>
      )
    },
    {
      label: 'Canvas & Model-Driven Workflows',
      badge: 'Model-Driven',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(199,53,144,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M9 1.5L2.5 9H8.5L7 14.5L13.5 7H7.5L9 1.5Z" fill={hovered ? 'rgba(199,53,144,0.3)' : 'none'} />
        </svg>
      )
    },
    {
      label: 'Dataverse & Enterprise API Integration',
      badge: '0.04ms API',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(199,53,144,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M6 3.5V6.5M10 3.5V6.5M4 6.5H12V8.5C12 10.7 10.2 12.5 8 12.5C5.8 12.5 4 10.7 4 8.5V6.5ZM8 12.5V14.5" fill={hovered ? 'rgba(199,53,144,0.3)' : 'none'} />
        </svg>
      )
    },
    {
      label: 'Tailored Canvas App Interfaces',
      badge: 'UX 2.0',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(199,53,144,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <rect x="3.5" y="1.5" width="9" height="13" rx="2" fill={hovered ? 'rgba(199,53,144,0.25)' : 'none'} />
          <path d="M6.5 11.5H9.5" />
        </svg>
      )
    }
  ];

  const pauPills = [
    {
      label: 'Autonomous Event-Driven Cloud & Desktop RPA Flows',
      badge: 'RPA 2.0',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(0,188,242,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M9 1.5L2.5 9H8.5L7 14.5L13.5 7H7.5L9 1.5Z" fill={hovered ? 'rgba(0,188,242,0.3)' : 'none'} />
        </svg>
      )
    },
    {
      label: '1,000+ Enterprise API Connectors & Neural Pipelines',
      badge: 'REST & GraphQL',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(0,188,242,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <circle cx="4" cy="8" r="2" fill={hovered ? '#00BCF2' : 'none'} />
          <circle cx="12" cy="4" r="2" fill={hovered ? '#00BCF2' : 'none'} />
          <circle cx="12" cy="12" r="2" fill={hovered ? '#00BCF2' : 'none'} />
          <path d="M6 8H9C10.1 8 11 7.1 11 6V6M9 8C10.1 8 11 8.9 11 10V10" />
        </svg>
      )
    },
    {
      label: 'AI Builder Intelligent Document & Unstructured Mining',
      badge: 'AI-Native',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(0,188,242,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 2C8 4.5 9.5 6 12 6C9.5 6 8 7.5 8 10C8 7.5 6.5 6 4 6C6.5 6 8 4.5 8 2Z" fill={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.75)'} />
          <path d="M12.5 10.5C12.5 11.5 13 12 14 12C13 12 12.5 12.5 12.5 13.5C12.5 12.5 12 12 11 12C12 12 12.5 11.5 12.5 10.5Z" fill={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.75)'} />
        </svg>
      )
    },
    {
      label: 'Zero-Trust Resilient Error Throttling & Observability',
      badge: '99.99% SLA',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(0,188,242,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 1.5L13.5 4V7.5C13.5 11 11 13.5 8 14.5C5 13.5 2.5 11 2.5 7.5V4L8 1.5Z" fill={hovered ? 'rgba(0,188,242,0.2)' : 'none'} />
          <path d="M8 6.5V9.5M6.5 8H9.5" strokeWidth="1.2" />
        </svg>
      )
    }
  ];

  const mcsPills = [
    {
      label: 'Autonomous Multi-Agent Copilot Orchestration',
      badge: 'Copilot Studio',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(16,185,129,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 2C8 4.5 9.5 6 12 6C9.5 6 8 7.5 8 10C8 7.5 6.5 6 4 6C6.5 6 8 4.5 8 2Z" fill={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.75)'} />
          <path d="M12.5 10.5C12.5 11.5 13 12 14 12C13 12 12.5 12.5 12.5 13.5C12.5 12.5 12 12 11 12C12 12 12.5 11.5 12.5 10.5Z" fill={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.75)'} />
        </svg>
      )
    },
    {
      label: 'Generative Action Plugins & Pro-Code APIs',
      badge: 'Pro-Code Plugins',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(16,185,129,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M9 1.5L2.5 9H8.5L7 14.5L13.5 7H7.5L9 1.5Z" fill={hovered ? 'rgba(16,185,129,0.3)' : 'none'} />
        </svg>
      )
    },
    {
      label: 'Dataverse Vector RAG & Enterprise Knowledge Retrieval',
      badge: 'Vector RAG',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(16,185,129,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <ellipse cx="8" cy="4" rx="6" ry="2.5" fill={hovered ? 'rgba(16,185,129,0.3)' : 'none'} />
          <path d="M2 4V8C2 9.4 4.7 10.5 8 10.5C11.3 10.5 14 9.4 14 8V4M2 8V12C2 13.4 4.7 14.5 8 14.5C11.3 14.5 14 13.4 14 12V8" />
        </svg>
      )
    },
    {
      label: 'Zero-Trust Agent Observability & SLA Compliance',
      badge: 'Zero-Trust',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(16,185,129,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 1.5L13.5 4V7.5C13.5 11 11 13.5 8 14.5C5 13.5 2.5 11 2.5 7.5V4L8 1.5Z" fill={hovered ? 'rgba(16,185,129,0.2)' : 'none'} />
          <path d="M8 6.5V9.5M6.5 8H9.5" strokeWidth="1.2" />
        </svg>
      )
    }
  ];

  const activePills = isPbi ? pbiPills : (isPba ? pbaPills : (isPau ? pauPills : (isMcs ? mcsPills : null)));

  return (
    <motion.div
      className="arsenal-horizontal-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setHoveredPill(null); }}
      onClick={() => onOpenModal && onOpenModal(item)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        background: isPbi
          ? (isHovered
            ? 'radial-gradient(ellipse at 75% 25%, rgba(245, 158, 11, 0.16) 0%, rgba(14, 18, 28, 0.88) 55%, rgba(6, 8, 14, 0.96) 100%)'
            : 'radial-gradient(ellipse at 75% 25%, rgba(245, 158, 11, 0.08) 0%, rgba(11, 14, 22, 0.85) 55%, rgba(5, 7, 12, 0.94) 100%)')
          : isPba
            ? (isHovered
              ? 'radial-gradient(ellipse at 25% 25%, rgba(199, 53, 144, 0.18) 0%, rgba(20, 14, 28, 0.88) 55%, rgba(10, 6, 14, 0.96) 100%)'
              : 'radial-gradient(ellipse at 25% 25%, rgba(199, 53, 144, 0.09) 0%, rgba(16, 11, 22, 0.85) 55%, rgba(8, 5, 12, 0.94) 100%)')
            : isPau
              ? (isHovered
                ? 'radial-gradient(ellipse at 75% 80%, rgba(0, 188, 242, 0.18) 0%, rgba(10, 20, 32, 0.88) 55%, rgba(4, 8, 16, 0.96) 100%)'
                : 'radial-gradient(ellipse at 75% 80%, rgba(0, 188, 242, 0.09) 0%, rgba(8, 16, 26, 0.85) 55%, rgba(4, 7, 14, 0.94) 100%)')
              : isMcs
                ? (isHovered
                  ? 'radial-gradient(ellipse at 25% 80%, rgba(16, 185, 129, 0.18) 0%, rgba(10, 26, 20, 0.88) 55%, rgba(4, 14, 10, 0.96) 100%)'
                  : 'radial-gradient(ellipse at 25% 80%, rgba(16, 185, 129, 0.09) 0%, rgba(8, 20, 15, 0.85) 55%, rgba(4, 12, 8, 0.94) 100%)')
                : (isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)'),
        border: isPbi
          ? (isHovered ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)')
          : isPba
            ? (isHovered ? '1px solid rgba(199, 53, 144, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)')
            : isPau
              ? (isHovered ? '1px solid rgba(0, 188, 242, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)')
              : isMcs
                ? (isHovered ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)')
                : '1px solid rgba(255,255,255,0.04)',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: isPbi
          ? (isHovered
            ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 32px 90px rgba(0,0,0,0.95), 0 0 70px rgba(245, 158, 11, 0.18)'
            : 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 20px 50px rgba(0,0,0,0.6)')
          : isPba
            ? (isHovered
              ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 32px 90px rgba(0,0,0,0.95), 0 0 70px rgba(199, 53, 144, 0.18)'
              : 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 20px 50px rgba(0,0,0,0.6)')
            : isPau
              ? (isHovered
                ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 32px 90px rgba(0,0,0,0.95), 0 0 70px rgba(0, 188, 242, 0.18)'
                : 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 20px 50px rgba(0,0,0,0.6)')
              : isMcs
                ? (isHovered
                  ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 32px 90px rgba(0,0,0,0.95), 0 0 70px rgba(16, 185, 129, 0.18)'
                  : 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 20px 50px rgba(0,0,0,0.6)')
                : '0 30px 60px rgba(0,0,0,0.35)',
        width: '760px',
        flexShrink: 0,
        rotateY: effect?.rotateY || 0,
        scale: effect?.scale || 1,
        opacity: effect?.opacity || 1,
        transformStyle: 'preserve-3d',
        backdropFilter: 'blur(36px) saturate(210%)',
        WebkitBackdropFilter: 'blur(36px) saturate(210%)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        willChange: 'transform, opacity'
      }}
    >
      {/* Top Specular Edge Highlight Line for Power BI (Originating Top-Right) */}
      {isPbi && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent 30%, rgba(245, 158, 11, 0.85) 75%, rgba(242, 200, 17, 0.4) 100%)',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          zIndex: 2
        }} />
      )}

      {/* Top Specular Edge Highlight Line for Power Apps (Originating Top-Left) */}
      {isPba && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, rgba(199, 53, 144, 0.85) 0%, rgba(226, 74, 168, 0.4) 40%, transparent 80%)',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          zIndex: 2
        }} />
      )}

      {/* Bottom Specular Edge Highlight Line for Power Automate (Originating Bottom-Right) */}
      {isPau && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent 25%, rgba(0, 188, 242, 0.85) 75%, rgba(0, 120, 212, 0.4) 100%)',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          zIndex: 2
        }} />
      )}

      {/* Bottom Specular Edge Highlight Line for Copilot Studio (Originating Bottom-Left) */}
      {isMcs && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.85) 0%, rgba(0, 235, 136, 0.4) 45%, transparent 75%)',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          zIndex: 2
        }} />
      )}

      {/* Atmospheric Ambient Mesh Radial Glow for Power BI (Top-Right) */}
      {isPbi && (
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle at 65% 35%, rgba(245, 158, 11, 0.14) 0%, rgba(242, 200, 17, 0.04) 55%, transparent 75%)',
          filter: 'blur(130px)',
          opacity: isHovered ? 1 : 0.65,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          animation: 'pbi-pulse 5s ease-in-out infinite alternate',
          zIndex: 0
        }} />
      )}

      {/* Atmospheric Ambient Mesh Radial Glow for Power Apps (Top-Left Background) */}
      {isPba && (
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle at 35% 35%, rgba(199, 53, 144, 0.16) 0%, rgba(165, 42, 116, 0.04) 55%, transparent 75%)',
          filter: 'blur(130px)',
          opacity: isHovered ? 1 : 0.65,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          animation: 'pbi-pulse 5s ease-in-out infinite alternate',
          zIndex: 0
        }} />
      )}

      {/* Atmospheric Ambient Mesh Radial Glow for Power Automate (Bottom-Right Background) */}
      {isPau && (
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle at 65% 65%, rgba(0, 188, 242, 0.16) 0%, rgba(0, 120, 212, 0.04) 55%, transparent 75%)',
          filter: 'blur(130px)',
          opacity: isHovered ? 1 : 0.65,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          animation: 'pbi-pulse 5s ease-in-out infinite alternate',
          zIndex: 0
        }} />
      )}

      {/* Atmospheric Ambient Mesh Radial Glow for Copilot Studio (Bottom-Left Background) */}
      {isMcs && (
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle at 35% 65%, rgba(16, 185, 129, 0.16) 0%, rgba(10, 120, 80, 0.04) 55%, transparent 75%)',
          filter: 'blur(130px)',
          opacity: isHovered ? 1 : 0.65,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          animation: 'pbi-pulse 5s ease-in-out infinite alternate',
          zIndex: 0
        }} />
      )}

      {/* Raycast Header Row (App Icon + Title + Expand Action Pill Button) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Left: App Icon + App Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Raycast Squircle Glass Pedestal Icon */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '13px',
            background: isPbi
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(10, 14, 22, 0.9) 100%)'
              : isPba
                ? 'linear-gradient(135deg, rgba(199, 53, 144, 0.18) 0%, rgba(14, 10, 20, 0.9) 100%)'
                : isPau
                  ? 'linear-gradient(135deg, rgba(0, 188, 242, 0.18) 0%, rgba(8, 16, 26, 0.9) 100%)'
                  : isMcs
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(8, 20, 15, 0.9) 100%)'
                    : 'rgba(255,255,255,0.05)',
            border: isPbi
              ? '1px solid rgba(245, 158, 11, 0.35)'
              : isPba
                ? '1px solid rgba(199, 53, 144, 0.35)'
                : isPau
                  ? '1px solid rgba(0, 188, 242, 0.35)'
                  : isMcs
                    ? '1px solid rgba(16, 185, 129, 0.35)'
                    : '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.55rem',
            boxShadow: isPbi
              ? '0 4px 20px rgba(245, 158, 11, 0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
              : isPba
                ? '0 4px 20px rgba(199, 53, 144, 0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
                : isPau
                  ? '0 4px 20px rgba(0, 188, 242, 0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
                  : isMcs
                    ? '0 4px 20px rgba(16, 185, 129, 0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : 'none',
            transition: 'all 0.4s ease'
          }}>
            <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.01em'
            }}>
              {item.tool}
            </h4>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: isPbi ? '#F2C811' : isPba ? '#E24AA8' : isPau ? '#00BCF2' : isMcs ? '#10B981' : '#c6ff34',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              opacity: 0.9
            }}>
              {item.architecture}
            </span>
          </div>
        </div>

        {/* Right: Raycast Action Pill inviting user to Expand Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          padding: '0.5rem 0.95rem',
          borderRadius: '12px',
          background: isHovered
            ? (isPbi ? 'rgba(245, 158, 11, 0.14)' : isPba ? 'rgba(199, 53, 144, 0.16)' : isPau ? 'rgba(0, 188, 242, 0.16)' : isMcs ? 'rgba(16, 185, 129, 0.16)' : 'rgba(255, 255, 255, 0.08)')
            : 'rgba(255, 255, 255, 0.04)',
          border: isHovered
            ? (isPbi ? '1px solid rgba(245, 158, 11, 0.45)' : isPba ? '1px solid rgba(199, 53, 144, 0.45)' : isPau ? '1px solid rgba(0, 188, 242, 0.45)' : isMcs ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)')
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered
            ? (isPbi ? '0 0 20px rgba(245, 158, 11, 0.2)' : isPba ? '0 0 20px rgba(199, 53, 144, 0.2)' : isPau ? '0 0 20px rgba(0, 188, 242, 0.2)' : isMcs ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none')
            : 'none',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
            transition: 'color 0.3s ease'
          }}>
            Expand Architecture
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            fontWeight: 800,
            color: isPbi ? '#F2C811' : isPba ? '#E24AA8' : isPau ? '#00BCF2' : isMcs ? '#10B981' : '#c6ff34',
            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
            transition: 'transform 0.3s ease'
          }}>
            →
          </span>
        </div>
      </div>

      {/* Description Text Section */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.65rem',
          color: '#ffffff',
          fontWeight: 800,
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.25
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.925rem',
          color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.6,
          margin: 0
        }}>
          {item.body}
        </p>
      </div>

      {/* Clean Raycast Command Stack (Micro SVG Icons + Hover Lighting) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        position: 'relative',
        zIndex: 2,
        marginTop: '0.25rem'
      }}>
        {activePills
          ? activePills.map((pill, pIdx) => {
            const isThisPillHovered = hoveredPill === pIdx;

            return (
              <div
                key={pIdx}
                onMouseEnter={(e) => { e.stopPropagation(); setHoveredPill(pIdx); }}
                onMouseLeave={(e) => { e.stopPropagation(); setHoveredPill(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.15rem',
                  background: isThisPillHovered
                    ? (isPbi ? 'rgba(245, 158, 11, 0.08)' : isPba ? 'rgba(199, 53, 144, 0.1)' : isPau ? 'rgba(0, 188, 242, 0.1)' : isMcs ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.08)')
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isThisPillHovered
                    ? (isPbi ? '1px solid rgba(245, 158, 11, 0.45)' : isPba ? '1px solid rgba(199, 53, 144, 0.45)' : isPau ? '1px solid rgba(0, 188, 242, 0.45)' : isMcs ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)')
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '14px',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: isThisPillHovered
                    ? (isPbi ? '0 4px 20px rgba(245, 158, 11, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : isPba ? '0 4px 20px rgba(199, 53, 144, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : isPau ? '0 4px 20px rgba(0, 188, 242, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : isMcs ? '0 4px 20px rgba(16, 185, 129, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : 'none')
                    : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isThisPillHovered ? 'translateX(4px)' : 'translateX(0)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px' }}>
                    {pill.icon(isThisPillHovered)}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isThisPillHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                    transition: 'color 0.3s ease'
                  }}>
                    {pill.label}
                  </span>
                </div>
              </div>
            );
          })
          : item.specs.map((spec, sIdx) => (
            <div
              key={sIdx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1.15rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              <span style={{ color: '#c6ff34' }}>◆</span>
              <span>{spec}</span>
            </div>
          ))}
      </div>
    </motion.div>
  );
}

function Spline1Arsenal({ isRemix, onOpenModal }) {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Set up vertical scroll timeline mapping perfectly aligned to sticky bounds
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate exact pixel overflow range for 1-to-1 horizontal scroll
  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth + 120);
      }
    };
    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  // Direct 1-to-1 unlagged horizontal track shift across all cards
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // 3D rotations, scales, and opacity fades for each bento card mapped to scroll progress
  const card0RotateY = useTransform(scrollYProgress, [0.0, 0.20, 0.35], [-12, 0, 0]);
  const card0Scale = useTransform(scrollYProgress, [0.0, 0.20, 0.35], [0.93, 1, 1]);
  const card0Opacity = useTransform(scrollYProgress, [0.0, 0.20, 0.35], [0.35, 1, 1]);

  const card1RotateY = useTransform(scrollYProgress, [0.20, 0.45, 0.60], [-12, 0, 0]);
  const card1Scale = useTransform(scrollYProgress, [0.20, 0.45, 0.60], [0.93, 1, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.45, 0.60], [0.35, 1, 1]);

  const card2RotateY = useTransform(scrollYProgress, [0.45, 0.70, 0.85], [-12, 0, 0]);
  const card2Scale = useTransform(scrollYProgress, [0.45, 0.70, 0.85], [0.93, 1, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.45, 0.70, 0.85], [0.35, 1, 1]);

  const card3RotateY = useTransform(scrollYProgress, [0.70, 0.90, 1.0], [-12, 0, 0]);
  const card3Scale = useTransform(scrollYProgress, [0.70, 0.90, 1.0], [0.93, 1, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.70, 0.90, 1.0], [0.35, 1, 1]);

  const cardEffects = [
    { rotateY: card0RotateY, scale: card0Scale, opacity: card0Opacity },
    { rotateY: card1RotateY, scale: card1Scale, opacity: card1Opacity },
    { rotateY: card2RotateY, scale: card2Scale, opacity: card2Opacity },
    { rotateY: card3RotateY, scale: card3Scale, opacity: card3Opacity }
  ];

  if (!isRemix) {
    return (
      <section style={{ position: 'relative', width: '100%', padding: '8rem 0' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'rgba(198,255,52,0.02)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.01)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#fff', fontWeight: 400 }}>
              The Arsenal
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {arsenalData.map((item, idx) => (
              <ArsenalCard key={item.id} item={item} onOpenModal={onOpenModal} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Remix horizontal bento-slide showcase
  return (
    <section ref={targetRef} style={{ position: 'relative', width: '100%', height: '400vh', background: '#020202', zIndex: 10 }}>
      <style>{`
        @media (max-width: 768px) {
          .arsenal-horizontal-card {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 2.5rem !important;
            width: clamp(280px, 90vw, 420px) !important;
          }
        }
      `}</style>

      {/* Background radial glows for aesthetic depth */}
      <div style={{ position: 'absolute', top: '15%', left: '20%', width: '400px', height: '400px', background: 'rgba(198,255,52,0.015)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '20%', width: '500px', height: '500px', background: 'rgba(255,255,255,0.01)', filter: 'blur(150px)', pointerEvents: 'none' }} />

      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent'
      }}>
        <motion.div ref={trackRef} style={{
          display: 'flex',
          gap: '5rem',
          paddingLeft: '10%',
          paddingRight: '20%',
          x,
          width: 'max-content',
          perspective: '1200px',
          willChange: 'transform'
        }}>
          {/* Header Panel */}
          <div style={{ width: '450px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
            <h2 style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
              <CharacterReveal
                text="The"
                className="text-gradient-premium"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}
              />
              <CharacterReveal
                text="Arsenal"
                className="text-gradient-premium"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}
              />
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
              <CharacterReveal text="Pro-code applications, autonomous AI workflows, and modern Fabric-driven intelligence architectures. Engineered to eliminate operational debt across your entire ecosystem." stagger={0.008} />
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll down to slide</span>
              <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#c6ff34' }}>→</span>
            </div>
          </div>

          {/* Cards Panels */}
          {arsenalData.map((item, idx) => {
            const effect = cardEffects[idx];
            return (
              <ArsenalCard key={item.id} item={item} effect={effect} onOpenModal={onOpenModal} />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── MAIN ARSENAL CONTAINER COMPONENT ───
function Arsenal({ activeHero, onOpenModal }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeHero !== 'sui_fork') return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = rect.height - windowHeight;
      const scrolled = -rect.top;

      let p = scrolled / scrollableDistance;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeHero]);

  // Calculate active index (0 to 3) for scrollable theme
  const activeIndex = Math.min(3, Math.floor(progress * 4));

  if (activeHero === 'sui_fork') {
    return (
      <section style={{ position: 'relative' }}>
        <div style={{ height: '400vh', position: 'relative' }} ref={containerRef}>
          <div style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            zIndex: 20
          }}>
            <SuiForkArsenal activeIndex={activeIndex} isRemix={false} onOpenModal={onOpenModal} />
          </div>
        </div>
      </section>
    );
  }

  if (activeHero === 'remix') {
    return <Spline1Arsenal isRemix={true} onOpenModal={onOpenModal} />;
  }

  if (activeHero === 'cinematic') {
    return <CinematicArsenal onOpenModal={onOpenModal} />;
  }

  if (activeHero === 'modern_v2') {
    return <ModernV2Arsenal onOpenModal={onOpenModal} />;
  }

  if (activeHero === 'tech_v4') {
    return <TechV4Arsenal isRemix={false} onOpenModal={onOpenModal} />;
  }

  if (activeHero === 'spline1') {
    return <Spline1Arsenal isRemix={false} onOpenModal={onOpenModal} />;
  }

  return null;

}

export default memo(Arsenal);
