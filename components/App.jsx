'use client';

import React, { Suspense, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';

const powerBiLogo = '/assets/New_Power_BI_Logo.svg';
const powerAppsLogo = '/assets/Powerapps-logo.svg.svg';
const copilotStudioLogo = '/assets/Copilot Studio.svg';
const powerAutomateLogo = '/assets/Power Automate logo.svg';
const logoUrl = '/assets/Neuralbi logo.svg';
const logoSoloUrl = '/assets/Neuralbi logo solo.svg';

import FloatingLines from './FloatingLines';
import Magnetic from './Magnetic';
import TiltCard from './TiltCard';
import CharacterReveal from './CharacterReveal';
import Counter from './Counter';

import Spline from '@splinetool/react-spline/next';

const SuiHeroTitle = ({ text, font }) => {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="sui-hero-title-container animate-blur-reveal delay-100"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <h1 className="sui-hero-text blur-layer" style={font ? { fontFamily: font } : {}}>
        {text}
      </h1>
      <h1 className="sui-hero-text sharp-layer" style={font ? { fontFamily: font } : {}}>
        {text}
      </h1>
    </div>
  );
};


// ─── PREMIUM SECTION DIVIDER ───
function SectionDivider() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 0', position: 'relative', zIndex: 15 }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(198,255,52,0.8) 50%, transparent 100%)',
        boxShadow: '0 0 15px rgba(198,255,52,0.5), 0 0 5px rgba(198,255,52,1)',
        opacity: 0.7
      }} />
    </div>
  );
}

export default function App() {
  const activeHero = 'remix';
  const [selectedTool, setSelectedTool] = useState(null);

  // ─── AWWWARDS HERO PARALLAX SCROLL TRANSFORMS ───
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.92]);
  const bgY = useTransform(scrollY, [0, 700], [0, -120]);
  const bgScale = useTransform(scrollY, [0, 700], [1, 1.12]);

  const currentContent = {
    h1: "Beyond Analytics.",
    sub: "We synthesize structured intelligence from your chaotic data streams. Scalable, autonomous, and beautiful.",
    cta: <>Book a Call <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', height: '14px', lineHeight: 1, transition: 'all 0.5s' }}>↵</span></>,
    align: "center",
    textAlign: "center",
    btnClass: "btn-glow-border",
    h1Font: "var(--font-display)", // Absolut typography (from Video 2 / Modern)
    h1Class: "",
    h1Color: "#ffffff"
  };

  const renderBackground = () => {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: 'none' }}>
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={20}
          lineDistance={51.5}
          bendRadius={16}
          bendStrength={1}
          interactive={true}
          parallax={true}
          animationSpeed={2.2}
          gradientStart="#c6ff34"
          gradientMid="#000000"
          gradientEnd="#000000"
        />
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)', backgroundColor: 'var(--color-paper)' }}>
      {/* Style-Specific Creative Navbar */}
      <Navbar activeHero={activeHero} />

      <main>
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--color-paper)',
          overflow: 'hidden'
        }}>

          {/* Universal Background Layer with Parallax */}
          <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, y: bgY, scale: bgScale, willChange: 'transform' }}>
            {renderBackground()}
            <style>{`.bg-fallback { position: absolute; inset: 0; background-color: var(--color-paper); } .bg-video { width: 100%; height: 100%; object-fit: cover; }`}</style>
          </motion.div>

          {/* Advanced Film Grain (Always present) */}
          <div className="grain-overlay" />

          {/* Specific Opacity Layer for readability. Stronger to ensure text is always visible. */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: activeHero === 'spline1'
              ? 'radial-gradient(circle at 20% 50%, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0) 100%)'
              : activeHero === 'sui_fork'
                ? 'transparent'
                : 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          {/* Text Content Block with Parallax */}
          <motion.div style={{
            position: 'relative',
            zIndex: 10,
            pointerEvents: 'none',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: currentContent.align,
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
            willChange: 'transform, opacity'
          }}>
            {activeHero === 'sui_fork' && (
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '900px',
                height: '450px',
                background: 'radial-gradient(circle, rgba(198, 255, 52, 0.3) 0%, rgba(198, 255, 52, 0.05) 50%, transparent 80%)',
                filter: 'blur(90px)',
                zIndex: -1,
                pointerEvents: 'none'
              }} />
            )}

            <div style={{
              maxWidth: '850px',
              pointerEvents: 'auto',
              textAlign: currentContent.textAlign,
              display: 'flex',
              flexDirection: 'column',
              alignItems: currentContent.align
            }}>


              {/* H1 Headline */}
              {activeHero === 'sui_fork' || activeHero === 'remix' ? (
                <SuiHeroTitle text={currentContent.h1} font={currentContent.h1Font} />
              ) : (
                <h1 className={`animate-blur-reveal delay-100 ${currentContent.h1Class}`} style={{
                  fontFamily: currentContent.h1Font,
                  fontSize: 'clamp(3.5rem, 6vw, 6.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  /* Impeccable polish: Use -0.04em for display headlines to prevent letters touching */
                  letterSpacing: currentContent.h1Font === 'var(--font-serif)' ? '0' : '-0.04em',
                  marginBottom: 'var(--space-6)',
                  color: currentContent.h1Color,
                  textShadow: currentContent.h1Class.includes('gradient') ? 'none' : '0 4px 24px rgba(0,0,0,0.6)'
                }}>
                  {currentContent.h1}
                </h1>
              )}

              {/* Sub-headline */}
              <p className="animate-blur-reveal delay-200" style={{
                fontFamily: 'var(--font-sans)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                fontWeight: 400,
                marginBottom: 'var(--space-12)',
                lineHeight: 1.6,
                maxWidth: '650px',
                textShadow: '0 2px 12px rgba(0,0,0,0.8)'
              }}>
                {currentContent.sub}
              </p>

              {/* CTA (Raycast DNA applied) */}
              <div className="animate-blur-reveal delay-300" style={{
                display: 'flex',
                gap: '1rem'
              }}>
                <Magnetic>
                  <button className={currentContent.btnClass} style={{
                    fontFamily: 'var(--font-button)',
                    fontSize: '1.125rem'
                  }}>
                    {currentContent.cta}
                  </button>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          {/* Smooth Fade to Background to avoid image cutoffs */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '25vh',
            background: 'linear-gradient(to bottom, transparent, #030303)',
            zIndex: 10,
            pointerEvents: 'none'
          }} />
        </section>

        {/* Unified Continuous Background Wrapper for Content Sections */}
        <div style={{ position: 'relative' }}>
          {/* Fixed Background Layer */}
          <div className="bg-fallback" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -2,
            pointerEvents: 'none'
          }} />

          {/* Content Layer (Transparent) */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div id="manifesto">
              <Manifesto activeHero={activeHero} />
            </div>
            <SectionDivider activeHero={activeHero} />
            <div>
              <TrustBar activeHero={activeHero} />
            </div>
            <SectionDivider activeHero={activeHero} />
            <div id="arsenal">
              <Arsenal activeHero={activeHero} onOpenModal={(tool) => setSelectedTool(tool)} />
            </div>
            <SectionDivider activeHero={activeHero} />
            <div id="protocol">
              <Methodology activeHero={activeHero} />
            </div>
            <SectionDivider activeHero={activeHero} />
            <div id="integrations">
              <IntegrationsHub activeHero={activeHero} />
            </div>
            <SectionDivider activeHero={activeHero} />
            <div id="verticals">
              <Industries activeHero={activeHero} />
            </div>
            <SectionDivider activeHero={activeHero} />
            <div>
              <Impact activeHero={activeHero} />
            </div>
            <SectionDivider activeHero={activeHero} />
            <div>
              <Faq activeHero={activeHero} />
            </div>
            <SectionDivider activeHero={activeHero} />
            <div>
              <FooterCTA activeHero={activeHero} />
            </div>
            <Footer activeHero={activeHero} />
          </div>
        </div>
        <ToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
      </main>
    </div>
  );
}

// =========================================================
// SECTION: THE ARSENAL (Scroll-Driven Premium Experience)
// =========================================================

const arsenalData = [
  {
    id: "power-bi",
    tool: "Power BI",
    title: "Cognitive Analytics.",
    body: "Transform dormant databases into real-time, interactive visual models. See the absolute truth behind your numbers instantly, with zero latency.",
    logo: powerBiLogo,
    color: "#F2C811",
    metric: "0ms Latency",
    specs: ["DAX Engine", "DirectQuery", "Real-time Telemetry"],
    architecture: "Semantic Model"
  },
  {
    id: "power-apps",
    tool: "Power Apps",
    title: "Custom Engineering.",
    body: "Tailor-made applications built flawlessly. From field operations to executive suites, we digitize your most complex workflows securely.",
    logo: powerAppsLogo,
    color: "#0078D4",
    metric: "Native Code",
    specs: ["Canvas UI", "Model-Driven", "Dataverse Core"],
    architecture: "Zero-Trust Mesh"
  },
  {
    id: "power-automate",
    tool: "Power Automate",
    title: "Silent Orchestration.",
    body: "Connect APIs and sync databases. We engineer invisible neural pathways that automate the mundane and eliminate human error quietly in the background.",
    logo: powerAutomateLogo,
    color: "#0066FF",
    metric: "API Bridges",
    specs: ["Webhooks", "RPA Bots", "Event Triggers"],
    architecture: "Neural Pathways"
  },
  {
    id: "copilot-studio",
    tool: "Copilot Studio",
    title: "Agentic Automation.",
    body: "Deploy autonomous cognitive agents that reason, act, and resolve hyper-complex workflows natively. The era of static bots is over; welcome to true systemic intelligence.",
    logo: copilotStudioLogo,
    color: "#107C41",
    metric: "AI Reasoning",
    specs: ["LLM Grounding", "Plugin Actions", "Autonomous"],
    architecture: "Cognitive Engine"
  }
];


// ─── STRIPE-GRADE TOOL DETAIL MODAL COMPONENT ───
function ToolDetailModal({ tool, onClose }) {
  useEffect(() => {
    if (!tool) return; // Don't lock scroll when no modal is open

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
          badge: "Intelligence Engine",
          headline: "Real-Time Decision Architecture",
          subheadline: "We don't build dashboards — we engineer living intelligence systems. Every model is hand-tuned with advanced DAX optimization, Direct Lake streaming, and semantic layers that transform raw data into sub-second executive decisions.",
          roiMetric: "3.8x",
          roiLabel: "Faster Query Execution",
          capabilities: [
            { label: "Direct Lake", desc: "Zero-copy lakehouse streaming with sub-second refresh on billion-row datasets" },
            { label: "Semantic Modeling", desc: "Enterprise-grade Tabular models with calculation groups and composite models" },
            { label: "Embedded Analytics", desc: "White-label BI portals with row-level security and custom themes" },
            { label: "AI Visuals", desc: "Smart narratives, anomaly detection, and Q&A natural language querying" }
          ],
          differentiators: [
            "DAX Studio profiling eliminating 90% of recalculation overhead",
            "Composite models bridging Import + DirectQuery in a single dataset",
            "Paginated reports for pixel-perfect regulatory document generation",
            "Deployment pipelines with CI/CD across Dev → Test → Prod workspaces"
          ],
          color: "#F2C811",
          svg: (
            <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="pbi-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F2C811" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F2C811" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="pbi-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F2C811" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#F2C811" />
                  <stop offset="100%" stopColor="#c6ff34" />
                </linearGradient>
                <filter id="pbi-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect width="480" height="300" rx="16" fill="#08080A" />
              {/* Grid */}
              {[60, 110, 160, 210, 260].map(y => <line key={y} x1="40" y1={y} x2="440" y2={y} stroke="rgba(255,255,255,0.04)" strokeDasharray="2 6" />)}
              {[40, 120, 200, 280, 360, 440].map(x => <line key={x} x1={x} y1="40" x2={x} y2="270" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 6" />)}
              {/* Area fill */}
              <path d="M40 230 Q80 200 120 210 T200 160 T280 170 T360 100 T440 70 L440 270 L40 270Z" fill="url(#pbi-area)" />
              {/* Primary line */}
              <path d="M40 230 Q80 200 120 210 T200 160 T280 170 T360 100 T440 70" fill="none" stroke="url(#pbi-line)" strokeWidth="3" strokeLinecap="round" filter="url(#pbi-glow)" />
              {/* Secondary line */}
              <path d="M40 240 Q80 230 120 235 T200 200 T280 210 T360 170 T440 140" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Data points */}
              {[[120,210],[200,160],[280,170],[360,100],[440,70]].map(([cx,cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="8" fill="#F2C811" opacity="0.15" />
                  <circle cx={cx} cy={cy} r="4" fill="#F2C811" stroke="#08080A" strokeWidth="2" />
                </g>
              ))}
              {/* Floating card */}
              <rect x="300" y="30" width="160" height="60" rx="10" fill="rgba(12,12,16,0.95)" stroke="rgba(242,200,17,0.3)" strokeWidth="1" />
              <text x="316" y="50" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">QUERY LATENCY</text>
              <text x="316" y="72" fill="#c6ff34" fontSize="20" fontWeight="bold" fontFamily="sans-serif">0.04ms</text>
              {/* Y-axis labels */}
              <text x="20" y="65" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace" textAnchor="end">100%</text>
              <text x="20" y="170" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace" textAnchor="end">50%</text>
              <text x="20" y="268" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace" textAnchor="end">0%</text>
            </svg>
          )
        };
      case 'power-apps':
        return {
          badge: "Application Forge",
          headline: "Three Paradigms. One Ecosystem.",
          subheadline: "We master every surface of the Power Apps platform — from pixel-perfect Canvas apps to complex Model-Driven architectures and cutting-edge Code Components. Each paradigm is purpose-selected for the use case, never forced into a template.",
          roiMetric: "-70%",
          roiLabel: "Faster Than Custom Web Dev",
          capabilities: [
            { label: "Canvas Apps", desc: "Pixel-perfect UIs with responsive containers, component libraries, and offline-first patterns" },
            { label: "Model-Driven", desc: "Enterprise CRUD with business rules, BPF workflows, and Dataverse security roles" },
            { label: "Code Apps (PCF)", desc: "React/TypeScript components compiled to PCF controls — native code performance, zero low-code limitations" },
            { label: "Dataverse Engine", desc: "Relational schemas with calculated columns, rollups, elastic tables, and row-level security" }
          ],
          differentiators: [
            "Component libraries shared across 50+ apps reducing dev time by 60%",
            "ALM pipelines with solution layering across Dev → UAT → Prod",
            "Custom PCF controls for maps, signatures, barcode scanners, and rich grids",
            "Offline-capable apps with conflict resolution and background sync"
          ],
          color: "#742774",
          svg: (
            <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="pa-grad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#742774" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#742774" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect width="480" height="300" rx="16" fill="#08080A" />
              <circle cx="240" cy="150" r="130" fill="#742774" opacity="0.06" />
              {/* Three paradigm cards */}
              {/* Canvas */}
              <rect x="30" y="30" width="130" height="240" rx="12" fill="url(#pa-grad1)" stroke="rgba(116,39,116,0.4)" strokeWidth="1.5" />
              <rect x="40" y="42" width="110" height="16" rx="4" fill="rgba(116,39,116,0.3)" />
              <text x="52" y="54" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">CANVAS</text>
              <rect x="40" y="68" width="110" height="55" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
              <rect x="48" y="76" width="40" height="6" rx="3" fill="rgba(198,255,52,0.3)" />
              <rect x="48" y="88" width="94" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="48" y="97" width="70" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
              <rect x="48" y="106" width="82" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
              <rect x="40" y="132" width="52" height="24" rx="6" fill="rgba(198,255,52,0.15)" stroke="rgba(198,255,52,0.3)" />
              <text x="48" y="148" fill="#c6ff34" fontSize="8" fontWeight="bold">Submit</text>
              <rect x="40" y="168" width="110" height="90" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
              <rect x="48" y="178" width="94" height="30" rx="4" fill="rgba(116,39,116,0.15)" />
              <rect x="48" y="216" width="45" height="30" rx="4" fill="rgba(255,255,255,0.04)" />
              <rect x="100" y="216" width="45" height="30" rx="4" fill="rgba(255,255,255,0.04)" />
              {/* Model-Driven */}
              <rect x="175" y="30" width="130" height="240" rx="12" fill="url(#pa-grad1)" stroke="rgba(116,39,116,0.4)" strokeWidth="1.5" />
              <rect x="185" y="42" width="110" height="16" rx="4" fill="rgba(0,120,212,0.3)" />
              <text x="190" y="54" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">MODEL-DRIVEN</text>
              <rect x="185" y="68" width="110" height="20" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
              <text x="193" y="82" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Business Process</text>
              {[0,1,2,3].map(i => (
                <g key={i}>
                  <circle cx={200 + i * 26} cy="104" r="8" fill={i < 2 ? "rgba(0,120,212,0.4)" : "rgba(255,255,255,0.06)"} stroke={i < 2 ? "#0078D4" : "rgba(255,255,255,0.15)"} strokeWidth="1" />
                  {i < 3 && <line x1={208 + i * 26} y1="104" x2={218 + i * 26} y2="104" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />}
                </g>
              ))}
              <rect x="185" y="122" width="110" height="140" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
              {[0,1,2,3,4].map(i => (
                <g key={i}>
                  <rect x="193" y={132 + i * 26} width="94" height="18" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)" />
                  <rect x="199" y={138 + i * 26} width={30 + Math.random() * 40} height="6" rx="3" fill={`rgba(255,255,255,${0.08 + i * 0.02})`} />
                </g>
              ))}
              {/* Code Apps */}
              <rect x="320" y="30" width="130" height="240" rx="12" fill="url(#pa-grad1)" stroke="rgba(198,255,52,0.3)" strokeWidth="1.5" />
              <rect x="330" y="42" width="110" height="16" rx="4" fill="rgba(198,255,52,0.15)" />
              <text x="342" y="54" fill="#c6ff34" fontSize="9" fontWeight="bold" fontFamily="sans-serif">CODE APPS</text>
              <rect x="330" y="68" width="110" height="190" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.06)" />
              {/* Code lines */}
              {[0,1,2,3,4,5,6,7,8].map(i => (
                <g key={i}>
                  <text x="338" y={86 + i * 20} fill="rgba(255,255,255,0.15)" fontSize="7" fontFamily="monospace">{i + 1}</text>
                  <rect x="352" y={79 + i * 20} width={20 + (i % 3) * 15} height="8" rx="2" fill={i === 2 ? "rgba(198,255,52,0.2)" : i === 5 ? "rgba(116,39,116,0.3)" : "rgba(255,255,255,0.06)"} />
                  <rect x={378 + (i % 3) * 15} y={79 + i * 20} width={15 + (i % 2) * 20} height="8" rx="2" fill="rgba(255,255,255,0.04)" />
                </g>
              ))}
              {/* Connecting lines */}
              <path d="M160 150 L175 150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M305 150 L320 150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
              {/* Bottom label */}
              <text x="240" y="292" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace" textAnchor="middle">UNIFIED DATAVERSE LAYER</text>
            </svg>
          )
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
          color: "#0066FF",
          svg: (
            <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="pa-flow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#0066FF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#c6ff34" stopOpacity="0.8" />
                </linearGradient>
                <filter id="pa-glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect width="480" height="300" rx="16" fill="#08080A" />
              {/* Radial glow */}
              <circle cx="240" cy="150" r="120" fill="#0066FF" opacity="0.06" />
              {/* Flow connections */}
              <path d="M60 150 C100 150 100 80 140 80" stroke="rgba(0,102,255,0.3)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M60 150 C100 150 100 220 140 220" stroke="rgba(0,102,255,0.3)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M200 80 C240 80 240 150 280 150" stroke="url(#pa-flow)" strokeWidth="2.5" />
              <path d="M200 220 C240 220 240 150 280 150" stroke="url(#pa-flow)" strokeWidth="2.5" />
              <path d="M340 150 L420 150" stroke="url(#pa-flow)" strokeWidth="3" filter="url(#pa-glow)" />
              {/* Retry loop */}
              <path d="M170 55 Q210 35 200 70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              {/* Nodes */}
              {/* Trigger */}
              <rect x="30" y="128" width="60" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#0066FF" strokeWidth="2" />
              <text x="42" y="146" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">TRIGGER</text>
              <text x="42" y="161" fill="#0066FF" fontSize="9" fontWeight="bold" fontFamily="monospace">EVENT</text>
              {/* Process A */}
              <rect x="120" y="58" width="80" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#0066FF" strokeWidth="1.5" />
              <text x="134" y="76" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">VALIDATE</text>
              <text x="134" y="91" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">TRANSFORM</text>
              {/* Process B */}
              <rect x="120" y="198" width="80" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#0066FF" strokeWidth="1.5" />
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
              <rect x="30" y="268" width="416" height="12" rx="6" fill="rgba(0,102,255,0.2)" />
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
          color: "#107C41",
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
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '3rem 1rem',
        overflowY: 'auto'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 2, 4, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 1,
            willChange: 'opacity'
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '1020px',
            margin: 'auto',
            background: 'linear-gradient(145deg, #0C0C10 0%, #08080A 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '3.5rem',
            boxShadow: `0 60px 120px rgba(0,0,0,0.9), 0 0 80px ${details?.color}15`,
            willChange: 'transform, opacity'
          }}
        >
          {/* Top-right glow */}
          <div style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: '400px',
            height: '400px',
            background: details?.color,
            filter: 'blur(160px)',
            opacity: 0.1,
            pointerEvents: 'none',
            borderRadius: '50%'
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              zIndex: 10
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              padding: '0.65rem',
              background: `linear-gradient(135deg, ${details?.color}15, transparent)`,
              borderRadius: '14px',
              border: `1px solid ${details?.color}30`
            }}>
              <img src={tool.logo} alt={tool.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: details?.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  background: `${details?.color}12`,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  border: `1px solid ${details?.color}25`
                }}>
                  {details?.badge}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                {tool.tool}
              </h2>
            </div>
          </div>

          {/* Two-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3rem', alignItems: 'start' }}>
            {/* Left column — copy */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.3,
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>
                {details?.headline}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                marginBottom: '1.75rem'
              }}>
                {details?.subheadline}
              </p>

              {/* ROI badge */}
              <div style={{
                background: 'rgba(198, 255, 52, 0.04)',
                border: '1px solid rgba(198, 255, 52, 0.15)',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: '#c6ff34',
                  lineHeight: 1
                }}>
                  {details?.roiMetric}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.3
                }}>
                  {details?.roiLabel}
                </span>
              </div>

              {/* Capabilities grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '2rem'
              }}>
                {details?.capabilities.map((cap, idx) => (
                  <div key={idx} style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    transition: 'all 0.2s'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: details?.color,
                      display: 'block',
                      marginBottom: '0.3rem'
                    }}>
                      {cap.label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.4
                    }}>
                      {cap.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Differentiators */}
              <h4 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '0.75rem'
              }}>
                NeuralBI Differentiators
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {details?.differentiators.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                    <span style={{ color: '#c6ff34', fontSize: '0.7rem', marginTop: '0.15rem' }}>◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — SVG + CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '2rem' }}>
              <div style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '1rem',
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`
              }}>
                {details?.svg}
              </div>

              <button
                className="btn-glow-border"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em'
                }}
              >
                Book {tool.tool} Architecture Review →
              </button>
            </div>
          </div>
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
            {arsenalData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1.8fr',
                    gap: '4rem',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '4rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    direction: isEven ? 'ltr' : 'rtl'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '250px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.03)',
                    direction: 'ltr'
                  }}>
                    <div style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))' }}>
                      <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left', direction: 'ltr' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#c6ff34', fontStyle: 'italic', fontWeight: 400 }}>
                      {item.tool} — {item.architecture}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', fontWeight: 400, margin: 0 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
                      {item.body}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem', alignItems: 'center' }}>
                      {item.specs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.5)',
                            background: 'rgba(255,255,255,0.04)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px'
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onOpenModal && onOpenModal(item)}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.75rem 1.25rem',
                        background: 'rgba(198, 255, 52, 0.08)',
                        border: '1px solid rgba(198, 255, 52, 0.3)',
                        borderRadius: '8px',
                        color: '#c6ff34',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        width: 'fit-content'
                      }}
                    >
                      Deep Dive Architecture →
                    </button>
                  </div>
                </div>
              );
            })}
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
              <CharacterReveal text="We orchestrate complex enterprise data flows, custom-engineered UI meshes, and autonomous agentic workflows." stagger={0.008} />
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
              <motion.div
                key={item.id}
                className="arsenal-horizontal-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1.8fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '16px',
                  padding: '4rem',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.35)',
                  width: '720px',
                  flexShrink: 0,
                  rotateY: effect.rotateY,
                  scale: effect.scale,
                  opacity: effect.opacity,
                  transformStyle: 'preserve-3d',
                  backdropFilter: 'blur(20px)',
                  willChange: 'transform, opacity'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '250px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.03)'
                }}>
                  <div style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))' }}>
                    <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#c6ff34', fontWeight: 700 }}>
                    {item.tool} — {item.architecture}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
                    {item.body}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem', alignItems: 'center' }}>
                    {item.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          color: 'rgba(255,255,255,0.5)',
                          background: 'rgba(255,255,255,0.04)',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px'
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onOpenModal && onOpenModal(item)}
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem 1.25rem',
                      background: 'rgba(198, 255, 52, 0.08)',
                      border: '1px solid rgba(198, 255, 52, 0.3)',
                      borderRadius: '8px',
                      color: '#c6ff34',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      width: 'fit-content'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(198, 255, 52, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(198, 255, 52, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    Deep Dive Architecture →
                  </button>
                </div>
              </motion.div>
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

function Manifesto({ activeHero }) {
  const data = [
    {
      id: "ai-native",
      title: "AI-Native Blueprint",
      body: "We don’t bolt on AI as an afterthought. We architect your data foundation from day zero to seamlessly integrate with Copilot and advanced LLMs.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      ),
      glow: "radial-gradient(circle at 50% 120%, rgba(198, 255, 52, 0.18) 0%, rgba(198, 255, 52, 0) 70%)",
      glowColor: "rgba(198, 255, 52, 0.25)",
      accentColor: "var(--color-accent)",
      graphic: (hovered) => <AiNativeGraphic hovered={hovered} />
    },
    {
      id: "warp-speed",
      title: "Warp-Speed Velocity",
      body: "Weeks, not quarters. We leverage the full Microsoft Power Platform ecosystem to ship enterprise-grade solutions at startup speed.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      glow: "radial-gradient(circle at 50% 120%, rgba(198, 255, 52, 0.12) 0%, rgba(198, 255, 52, 0) 70%)",
      glowColor: "rgba(198, 255, 52, 0.2)",
      accentColor: "var(--color-accent)",
      graphic: (hovered) => <WarpSpeedGraphic hovered={hovered} />
    },
    {
      id: "zero-friction",
      title: "Zero-Friction Adoption",
      body: "Data is useless if nobody uses it. We build intuitive Canvas & Code Apps your team will actually love to operate, eradicating spreadsheet chaos.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      ),
      glow: "radial-gradient(circle at 50% 120%, rgba(198, 255, 52, 0.18) 0%, rgba(198, 255, 52, 0) 70%)",
      glowColor: "rgba(198, 255, 52, 0.25)",
      accentColor: "var(--color-accent)",
      graphic: (hovered) => <ZeroFrictionGraphic hovered={hovered} />
    }
  ];

  const isRemix = activeHero === 'remix';

  // ── Render 4 completely different architectural structures per activeHero ──

  // 1. NEBULA (spline1): Editorial, Asymmetric, pure glass, organic flowing curves.
  if (activeHero === 'spline1') {
    return (
      <section style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '5rem', alignItems: 'end' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, lineHeight: 1.1 }}>
              Built for the AI era. Unbound by legacy.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', lineHeight: 1.6, maxWidth: '480px' }}>
              Why modern enterprises choose the NeuralBI blueprint over traditional IT consulting.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {data.map((item) => (
              <NebulaManifestoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. CINEMATIC: Clean, ultra-minimal, horizontal, razor-sharp alignment.
  if (activeHero === 'cinematic') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Built for the AI era. Unbound by legacy.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Why modern enterprises choose the NeuralBI blueprint over traditional IT consulting.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {data.map((item, index) => (
              <CinematicManifestoRow key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 3. MODERN V2 (Video 2): 3D Brand Cards with premium colored glows matching the provided image.
  if (activeHero === 'modern_v2') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.05 }}>
              Built for the AI era.<br />Unbound by legacy.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Why modern enterprises choose the NeuralBI blueprint over traditional IT consulting.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {data.map((item) => (
              <ModernManifestoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 5. SUI_FORK: Dark, highly tactile Bento glass grids
  if (activeHero === 'sui_fork') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 600, color: '#ffffff' }}>
              Built for the AI era.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {data.map((item) => (
              <div key={item.id} style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(30px)',
                borderRadius: '24px',
                padding: '3rem 2rem',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                overflow: 'hidden',
                position: 'relative'
              }} className="sui-card-hover">
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(198,255,52,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c6ff34',
                  border: '1px solid rgba(198,255,52,0.2)'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 600, color: '#ffffff' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  // 4. TECH V4 (Video 0627): Smooth Premium Mesh (Glassmorphism)
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0 }}>
            <CharacterReveal
              text="Built for the AI era."
              className="text-gradient-premium"
              style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: isRemix ? 'none' : 'uppercase' }}
            />
            <CharacterReveal
              text="Unbound by legacy."
              className="text-gradient-premium"
              style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: isRemix ? 'none' : 'uppercase' }}
            />
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '1.5rem auto 0', lineHeight: 1.6 }}>
            <CharacterReveal text="Why modern enterprises choose the NeuralBI blueprint over traditional IT consulting." stagger={0.01} />
          </p>
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
        >
          {data.map((item) => (
            <ManifestoTiltCard key={item.id} item={item} isRemix={isRemix} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function ManifestoTiltCard({ item, isRemix }) {
  const [hovered, setHovered] = React.useState(false);
  
  return (
    <TiltCard 
      className="hover-glass-soft" 
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: isRemix ? '16px' : '40px',
        padding: '3.5rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: hovered ? '0 20px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)' : '0 10px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'all 0.5s',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: item.glow, opacity: hovered ? 0.8 : 0.5, zIndex: 0, pointerEvents: 'none', transition: 'opacity 0.4s ease' }} />
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff',
        marginBottom: '2rem', zIndex: 1, border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: hovered ? `0 0 30px ${item.glowColor}` : `0 0 20px ${item.glowColor}`,
        transition: 'box-shadow 0.4s ease'
      }}>
        {item.icon}
      </div>
      <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', zIndex: 1, textTransform: isRemix ? 'none' : 'uppercase' }}>
        <CharacterReveal text={item.title} stagger={0.015} />
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, zIndex: 1 }}>
        <CharacterReveal text={item.body} stagger={0.005} />
      </p>
      
      {/* High-fidelity Visual Graphic Area Restored */}
      <div style={{
        width: '100%',
        height: '180px',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '16px',
        marginTop: '2rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.05)',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        {item.graphic && item.graphic(hovered)}
      </div>
    </TiltCard>
  );
}

// ────────────────────────────────────────────────────────
// 1. Nebula (spline1) Card Style (frosted glass, organic)
// ────────────────────────────────────────────────────────
function NebulaManifestoCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '3rem var(--space-8)',
        borderRadius: '24px',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
        border: hovered ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hovered ? 'var(--color-accent)' : '#ffffff',
        transition: 'all 0.4s'
      }}>
        {item.icon}
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.75rem', color: '#ffffff' }}>
          {item.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>
          {item.body}
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// 2. Cinematic Card Style (minimalist rows)
// ────────────────────────────────────────────────────────
function CinematicManifestoRow({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 2fr',
        gap: '3rem',
        padding: '3rem 2rem',
        borderBottom: '1px solid #1c1c1e',
        background: hovered ? 'rgba(255,255,255,0.01)' : 'transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        alignItems: 'center'
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#444446' }}>
        0{index + 1}
      </span>
      <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: hovered ? '#ffffff' : '#d1d1d6', transition: 'color 0.3s' }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', lineHeight: 1.6, color: hovered ? '#a1a1aa' : '#71717a', transition: 'color 0.3s' }}>
        {item.body}
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// 3. Modern V2 Card Style (Glow backgrounds like the Arc/TinyPNG image)
// ────────────────────────────────────────────────────────
function ModernManifestoCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: hovered ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? '0 20px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        overflow: 'hidden',
        minHeight: '480px',
      }}
    >
      {/* Background radial brand colored glow - matching the referenced image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: item.glow,
        opacity: hovered ? 1 : 0.4,
        zIndex: 0,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none'
      }} />

      {/* Card Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.75rem 2rem', zIndex: 1, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: item.accentColor,
            boxShadow: `0 0 12px ${item.glowColor}`
          }}>
            {item.icon}
          </div>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>
            {item.title}
          </span>
        </div>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.4)',
          transform: hovered ? 'rotate(-45deg)' : 'rotate(0)',
          transition: 'all 0.4s'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', zIndex: 1, flex: 1 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>
          {item.body}
        </p>

        {/* High-fidelity Visual Graphic Area (Matches the referenced image) */}
        <div style={{
          height: '180px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '16px',
          marginTop: '2rem',
          border: '1px solid rgba(255,255,255,0.04)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {item.graphic(hovered)}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// 4. Tech V4 Card Style (cyber, neon green)
// ────────────────────────────────────────────────────────
function TechManifestoCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '3rem 2rem',
        borderRadius: '4px',
        background: 'rgba(0,0,0,0.4)',
        border: hovered ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: hovered ? '0 0 24px rgba(198, 255, 52, 0.15)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}
    >
      {/* Corner crosshairs for technical look */}
      {hovered && (
        <>
          <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '8px', height: '8px', borderTop: '2px solid var(--color-accent)', borderLeft: '2px solid var(--color-accent)' }} />
          <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '8px', height: '8px', borderTop: '2px solid var(--color-accent)', borderRight: '2px solid var(--color-accent)' }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-accent)', borderLeft: '2px solid var(--color-accent)' }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-accent)', borderRight: '2px solid var(--color-accent)' }} />
        </>
      )}

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
        [ {item.title.toUpperCase().replace(' ', '_')} ]
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-tech)', fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
          {item.body}
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// High-Fidelity SVG/CSS Graphics for Modern V2 (Matches Spotify/Arc/TinyPNG styles)
// ────────────────────────────────────────────────────────

// AI-Native Graphic: A floating neural chat UI with glowing model nodes
function AiNativeGraphic({ hovered }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="220" height="150" viewBox="0 0 220 150">
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        <g stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1.5">
          <line x1="40" y1="75" x2="100" y2="40" style={{ strokeDasharray: '4', strokeDashoffset: hovered ? -20 : 0, transition: 'stroke-dashoffset 2s linear infinite' }} />
          <line x1="40" y1="75" x2="100" y2="110" style={{ strokeDasharray: '4', strokeDashoffset: hovered ? -20 : 0, transition: 'stroke-dashoffset 2s linear infinite' }} />
          <line x1="100" y1="40" x2="160" y2="75" />
          <line x1="100" y1="110" x2="160" y2="75" />
          <line x1="160" y1="75" x2="200" y2="75" />
        </g>

        {/* Glow circles behind nodes */}
        <circle cx="40" cy="75" r="25" fill="url(#node-glow)" />
        <circle cx="100" cy="40" r="25" fill="url(#node-glow)" />
        <circle cx="100" cy="110" r="25" fill="url(#node-glow)" />
        <circle cx="160" cy="75" r="25" fill="url(#node-glow)" />

        {/* Interactive nodes */}
        <circle cx="40" cy="75" r="5" fill="#ffffff" />
        <circle cx="100" cy="40" r="5" fill="#6366f1" />
        <circle cx="100" cy="110" r="5" fill="#6366f1" />
        <circle cx="160" cy="75" r="7" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />

        {/* Mini Chat UI overlay */}
        <foreignObject x="50" y="55" width="130" height="40" style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '8px',
            padding: '4px 8px',
            fontSize: '8px',
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(4px)',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'transform 0.4s ease'
          }}>
            <span style={{ color: '#818cf8' }}>&gt; copilot-init</span>
            <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>AI-Native Schema Loaded.</div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

// Warp-Speed Graphic: A speedometer / chart graphic with massive growth spike
function WarpSpeedGraphic({ hovered }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="220" height="150" viewBox="0 0 220 150">
        <defs>
          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
          <line x1="20" y1="20" x2="200" y2="20" />
          <line x1="20" y1="50" x2="200" y2="50" />
          <line x1="20" y1="80" x2="200" y2="80" />
          <line x1="20" y1="110" x2="200" y2="110" />
        </g>

        {/* Chart fill path */}
        <path
          d={hovered
            ? "M 20 110 Q 50 100 80 85 T 140 40 T 200 20 L 200 110 Z"
            : "M 20 110 Q 50 110 80 105 T 140 95 T 200 90 L 200 110 Z"
          }
          fill="url(#chart-grad)"
          style={{ transition: 'd 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        {/* Chart stroke line */}
        <path
          d={hovered
            ? "M 20 110 Q 50 100 80 85 T 140 40 T 200 20"
            : "M 20 110 Q 50 110 80 105 T 140 95 T 200 90"
          }
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          style={{ transition: 'd 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        {/* Glowing node at current speed point */}
        <circle
          cx={200}
          cy={hovered ? 20 : 90}
          r="6"
          fill="#ffffff"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          style={{ transition: 'cy 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        {/* Floating badge */}
        <g transform={hovered ? "translate(125, 45)" : "translate(125, 75)"} style={{ transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <rect width="60" height="22" rx="6" fill="#000000" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="30" y="14" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            {hovered ? "DELIVERED" : "DESIGNING"}
          </text>
        </g>
      </svg>
    </div>
  );
}

// Zero-Friction Graphic: Overlapping frosted glass layout window elements (like TinyPNG in image)
function ZeroFrictionGraphic({ hovered }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Grid background representing spreadsheet cells */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.15,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      {/* Glass card element 1 - Behind */}
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '80px',
        left: '20px',
        top: '50px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        padding: '10px',
        transform: hovered ? 'translate(8px, -8px)' : 'none',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ width: '20px', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', marginBottom: '8px' }} />
        <div style={{ width: '70px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '4px' }} />
        <div style={{ width: '50px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px' }} />
      </div>

      {/* Glass card element 2 - Front overlapping (TinyPNG style) */}
      <div style={{
        position: 'absolute',
        width: '130px',
        height: '90px',
        right: '25px',
        bottom: hovered ? '35px' : '20px',
        background: 'rgba(14, 165, 233, 0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: hovered ? '1px solid rgba(14, 165, 233, 0.25)' : '1px solid rgba(14, 165, 233, 0.1)',
        borderRadius: '14px',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.6), 0 0 16px rgba(14, 165, 233, 0.1)'
          : '0 8px 32px rgba(0,0,0,0.5)',
        padding: '12px',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0ea5e9' }} />
          <div style={{ fontSize: '8px', color: '#0ea5e9', fontWeight: 'bold', fontFamily: 'monospace' }}>ACTIVE</div>
        </div>
        <div style={{ fontSize: '11px', color: '#ffffff', fontWeight: 'bold', fontFamily: 'var(--font-sans)', marginBottom: '4px' }}>
          BI Portal
        </div>
        <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
          100% Team Adoption.
        </div>
      </div>
    </div>
  );
}

// =========================================================
// Industries: Applied Intelligence (Interactive Side Menu)
// Four premium treatments for switching industries context.
// =========================================================

const industriesData = [
  {
    id: "supply-chain",
    title: "Supply Chain & Logistics",
    body: "Predictive inventory routing and bottleneck detection. Turn fragmented supply networks into autonomous, self-correcting ecosystems.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    ),
    accent: "#6366f1"
  },
  {
    id: "fintech",
    title: "Fintech & Banking",
    body: "Real-time liquidity tracking, fraud anomaly detection, and automated compliance reporting flows. Millisecond latency on financial dashboards.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    ),
    accent: "#10b981"
  },
  {
    id: "manufacturing",
    title: "Manufacturing 4.0",
    body: "IoT sensor data transformed into actionable maintenance alerts. Monitor machine health and predict downtime before it halts your production line.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
    ),
    accent: "#f59e0b"
  },
  {
    id: "retail",
    title: "Retail & E-Commerce",
    body: "Hyper-personalized customer journey mapping, dynamic pricing engines, and unified cross-channel inventory synchronization.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
    ),
    accent: "#ec4899"
  }
];

function Industries({ activeHero }) {
  const [activeTab, setActiveTab] = useState(0);
  const currentIndustry = industriesData[activeTab];

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'sui_fork' : activeHero;

  // ─── NEBULA: Floating Horizontal Pills & Big Glass Detail ───
  if (displayHero === 'spline1') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', fontWeight: 400, color: '#ffffff', marginBottom: '1rem' }}>
              Applied intelligence across verticals.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
              Tailored architectures for complex industry challenges.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {industriesData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                style={{
                  background: activeTab === index ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: activeTab === index ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.05)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  color: activeTab === index ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div style={{ color: activeTab === index ? item.accent : 'inherit', display: 'flex' }}>{item.icon}</div>
                {item.title}
              </button>
            ))}
          </div>

          <div key={currentIndustry.id} className="animate-blur-reveal" style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(32px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '32px',
            padding: '5rem',
            textAlign: 'center',
            boxShadow: '0 24px 64px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '300px', height: '150px', background: currentIndustry.accent, filter: 'blur(100px)', opacity: 0.15, pointerEvents: 'none' }} />

            <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', color: currentIndustry.accent, marginBottom: '2rem' }}>
              <div style={{ transform: 'scale(1.5)' }}>{currentIndustry.icon}</div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 400, color: '#ffffff', marginBottom: '1.5rem' }}>
              {currentIndustry.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto' }}>
              {currentIndustry.body}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ─── CINEMATIC: Brutalist Interactive Accordion ───
  if (displayHero === 'cinematic') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '1rem' }}>
              Applied intelligence<br />across verticals.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', color: '#71717a' }}>
              Tailored architectures for complex industry challenges.
            </p>
          </div>

          <div style={{ borderTop: '1px solid #1c1c1e' }}>
            {industriesData.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <div key={item.id} style={{ borderBottom: '1px solid #1c1c1e' }}>
                  <button
                    onClick={() => setActiveTab(isActive ? -1 : index)}
                    style={{
                      width: '100%',
                      background: isActive ? 'rgba(255,255,255,0.02)' : 'transparent',
                      padding: '2.5rem 0',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.3s'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: isActive ? '#ffffff' : '#3f3f46', paddingLeft: '2rem', transition: 'color 0.3s' }}>
                      0{index + 1}
                    </span>
                    <h3 style={{ flex: 1, fontFamily: 'var(--font-ui)', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', color: isActive ? '#ffffff' : '#a1a1aa', transition: 'color 0.3s' }}>
                      {item.title}
                    </h3>
                    <div style={{ paddingRight: '2rem', color: isActive ? '#ffffff' : '#3f3f46', transform: isActive ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.4s' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </button>

                  {isActive && (
                    <div className="animate-blur-reveal" style={{ padding: '0 2rem 3rem 6.5rem' }}>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', color: '#a1a1aa', lineHeight: 1.6, maxWidth: '600px' }}>
                        {item.body}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ─── MODERN V2: The Official Raycast Interactive Side Menu ───
  if (displayHero === 'modern_v2') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CharacterReveal
                text="Applied intelligence"
                className="text-gradient-premium"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}
              />
              <CharacterReveal
                text="across verticals."
                className="text-gradient-premium"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}
              />
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto' }}>
              <CharacterReveal text="Tailored architectures for complex industry challenges." stagger={0.008} />
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            background: 'rgba(20, 20, 22, 0.4)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '1.5rem',
            minHeight: '500px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)'
          }}>

            {/* Sidebar Navigation */}
            <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
              {industriesData.map((item, index) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(index)}
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                      border: '1px solid',
                      borderColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                      padding: '1.25rem',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isActive && (
                      <div style={{ position: 'absolute', left: 0, top: '25%', height: '50%', width: '4px', background: item.accent, borderRadius: '0 4px 4px 0', boxShadow: `0 0 12px ${item.accent}` }} />
                    )}
                    <div style={{ color: isActive ? item.accent : 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}>
                      {item.icon}
                    </div>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: isActive ? 600 : 400, color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 0.5rem' }} />

            {/* Detail Pane */}
            <div style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
              <div key={currentIndustry.id} className="animate-blur-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '20px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentIndustry.accent,
                    boxShadow: `0 0 32px ${currentIndustry.accent}33, inset 0 2px 4px rgba(255,255,255,0.1)`
                  }}>
                    <div style={{ transform: 'scale(1.2)' }}>{currentIndustry.icon}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: currentIndustry.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      Industry Blueprint
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                      {currentIndustry.title}
                    </h3>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '600px' }}>
                  {currentIndustry.body}
                </p>

                {/* Visual Data Placeholder corresponding to Raycast's detailed previews */}
                <div style={{
                  marginTop: '1rem', height: '120px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.0) 100%)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: `linear-gradient(0deg, ${currentIndustry.accent}11 0%, transparent 100%)` }} />
                  <svg width="100%" height="100%" preserveAspectRatio="none">
                    <path d="M0,80 Q50,60 150,100 T300,50 T450,90 T600,40" fill="none" stroke={currentIndustry.accent} strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                    <circle cx="600" cy="40" r="4" fill={currentIndustry.accent} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── SUI_FORK: Minimal tabs, extreme glass detail pane ───
  if (displayHero === 'sui_fork') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ textAlign: 'center', margin: 0 }}>
              <CharacterReveal
                text="Applied Across Verticals"
                className={isRemix ? 'text-gradient-premium' : ''}
                style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: isRemix ? 800 : 600, letterSpacing: isRemix ? '0.02em' : '-0.02em', textTransform: 'none', ...(!isRemix ? { color: '#ffffff' } : {}) }}
              />
            </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: isRemix ? '16px' : '32px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>

            {/* Sidebar Navigation (Slides in from Left) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', stiffness: 60, damping: 15, mass: 1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}
            >
              {industriesData.map((item, index) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(index)}
                    style={{
                      background: isActive ? 'rgba(198, 255, 52, 0.1)' : 'transparent',
                      padding: '1.2rem',
                      borderRadius: isRemix ? '6px' : '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      border: isActive ? '1px solid rgba(198, 255, 52, 0.2)' : '1px solid transparent',
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div style={{ color: isActive ? '#c6ff34' : 'inherit' }}>{item.icon}</div>
                    <span style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-sans)', fontSize: '1rem', fontWeight: isActive ? 600 : 400, textTransform: 'none' }}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Detail Pane (Slides in from Right) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', stiffness: 60, damping: 15, mass: 1 }}
              style={{ width: '100%', height: '100%' }}
            >
              <TiltCard style={{ background: 'rgba(0,0,0,0.4)', borderRadius: isRemix ? '12px' : '24px', padding: '4rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(198, 255, 52, 0.1) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

                <div key={currentIndustry.id} className="animate-blur-reveal" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: isRemix ? '8px' : '16px', background: 'rgba(198,255,52,0.1)', color: '#c6ff34', width: 'fit-content', border: '1px solid rgba(198,255,52,0.2)' }}>
                    <div style={{ transform: 'scale(1.5)' }}>{currentIndustry.icon}</div>
                  </div>
                  <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '2.5rem', fontWeight: isRemix ? 800 : 600, color: '#ffffff', letterSpacing: isRemix ? '0.02em' : '-0.02em', lineHeight: 1.2, textTransform: 'none' }}>
                    {currentIndustry.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '600px' }}>
                    {currentIndustry.body}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  // ─── TECH V4: Smooth Premium Glassmorphism (Video 0627) ───
  return (
    <section style={{ padding: '9rem 0', position: 'relative', zIndex: 20 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Applied intelligence across verticals.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '1rem auto 0' }}>
            Tailored architectures for complex industry challenges.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', padding: '1rem', borderRadius: isRemix ? '16px' : '40px', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>

          {/* Sidebar Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
            {industriesData.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    padding: '1.5rem',
                    borderRadius: isRemix ? '6px' : '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    border: 'none',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)'
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: isActive ? 600 : 400 }}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail Pane */}
          <div style={{ position: 'relative', background: 'rgba(0,0,0,0.2)', borderRadius: isRemix ? '12px' : '32px', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Soft colored glow representing the industry, forced to lime for tech_v4 */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'rgba(198,255,52,1)', filter: 'blur(120px)', opacity: 0.15, zIndex: 0, pointerEvents: 'none' }} />

            <div key={currentIndustry.id} className="animate-blur-reveal" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '24px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', width: 'fit-content', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ transform: 'scale(1.5)' }}>{currentIndustry.icon}</div>
              </div>
              <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase' }}>
                {currentIndustry.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: '600px' }}>
                {currentIndustry.body}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── SECTION 7: IMPACT (EMPIRICAL PROOF) ───
function Impact({ activeHero }) {
  const metrics = [
    { number: "7x", label: "Faster deployment cycles vs. traditional dev." },
    { number: "-65%", label: "Reduction in manual reporting hours." },
    { number: "25M+", label: "Data rows securely orchestrated daily." }
  ];

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'tech_v4' : activeHero;

  if (isRemix) {
    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ display: 'flex', flexDirection: 'column', margin: 0 }}>
                <CharacterReveal
                  text="The Math Speaks"
                  className="text-gradient-premium"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: '0.02em'
                  }}
                />
                <CharacterReveal
                  text="For Itself."
                  className="text-gradient-premium"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: '0.02em'
                  }}
                />
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {metrics.map((m, index) => (
                <TiltCard key={index} className="sui-card-hover" style={{
                  borderRadius: '16px',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: index === 1 ? '3rem' : '0',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)'
                }}>
                  <div style={{ width: '180px', flexShrink: 0, marginRight: '1.5rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3.5rem, 5.5vw, 5.5rem)',
                      color: 'var(--color-accent)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      lineHeight: 1
                    }}>
                      <Counter value={m.number} />
                    </span>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.15rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.5,
                    flex: 1
                  }}>
                    {m.label}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'spline1') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.1 }}>
                The math speaks for itself.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {metrics.map((m, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2.5rem',
                  marginLeft: index === 1 ? '2rem' : '0'
                }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--color-accent)', fontWeight: 400 }}>
                    <Counter value={m.number} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'cinematic') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>
              The math speaks for itself.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.1)' }}>
            {metrics.map((m, index) => (
              <div key={index} style={{ background: '#000000', padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(4rem, 6vw, 6rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em' }}>
                  <Counter value={m.number} />
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#71717a', maxWidth: '240px', margin: '0 auto', lineHeight: 1.5 }}>
                  {m.label}
                </span>
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
            <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
              The math speaks for itself.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {metrics.map((m, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '24px',
                padding: '3.5rem 2.5rem',
                textAlign: 'center',
                boxShadow: '0 12px 40px rgba(198, 255, 52, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }} className="sui-card-hover">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 5vw, 5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                  <Counter value={m.number} />
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'tech_v4') {
    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              The math speaks for itself.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            {metrics.map((m, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.01)',
                padding: '4rem 3rem',
                borderRight: index < 2 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                  Metric 0{index + 1}
                </div>
                <span style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(4rem, 6vw, 6.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
                  <Counter value={m.number} />
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            The math speaks for itself.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {metrics.map((m, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              padding: '3.5rem 2.5rem',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }} className="sui-card-hover">
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(3.5rem, 5vw, 5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                {m.number}
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

// ─── SECTION 9: FOOTER CTA (THE BLACK HOLE) ───

function FooterCTA({ activeHero }) {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const isEmailValid = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const isFormValid = formData.name.trim() !== '' && isEmailValid(formData.email) && formData.message.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'sui_fork' : activeHero;

  // 1. NEBULA (spline1) - Elegant Glass & Organic Curves
  if (displayHero === 'spline1') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden', zIndex: 10 }}>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'var(--color-accent)', filter: 'blur(180px)', opacity: 0.08, zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              You already have the data.<br />
              <span style={{ color: 'var(--color-accent)' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '480px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '1rem' }}>Thank you.</h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)' }}>Our architects will reach out shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="name-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Name</label>
                  <input id="name-spline" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label htmlFor="email-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Email</label>
                  <input id="email-spline" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label htmlFor="msg-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                  <textarea id="msg-spline" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <button type="submit" className="btn-raycast btn-radius-8" style={{ fontFamily: 'var(--font-button)', fontSize: '1rem', padding: '0.9rem', width: '100%' }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 2. CINEMATIC - Brutalist, Raw Contrast, Split Grid
  if (displayHero === 'cinematic') {
    return (
      <section style={{ padding: '10rem 0', position: 'relative', zIndex: 10, background: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1.05, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              You already have the data.<br />
              <span style={{ color: '#c6ff34' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '500px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '3rem', borderRadius: '0px' }}>
            {submitted ? (
              <div style={{ textAlign: 'left', padding: '2rem 0' }}>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '2rem', color: '#fff', textTransform: 'uppercase', marginBottom: '1rem' }}>SUBMISSION RECEIVED</h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a' }}>Our engineering team will connect with you via email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <label htmlFor="name-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Name</label>
                  <input id="name-cinematic" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                <div>
                  <label htmlFor="email-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Email</label>
                  <input id="email-cinematic" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                <div>
                  <label htmlFor="msg-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                  <textarea id="msg-cinematic" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none', resize: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                <button type="submit" style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: '1rem', padding: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: '0', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.3s' }}>
                  Deploy Intelligence
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 3. MODERN V2 - Glassmorphic Card Split Layout
  if (displayHero === 'modern_v2') {
    return (
      <section style={{ padding: '10rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(45px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px',
            padding: '5rem 4rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(198, 255, 52, 0.05)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '350px', height: '350px', background: '#c6ff34', filter: 'blur(140px)', opacity: 0.08, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
                You already have the data.
              </h2>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900, color: '#c6ff34', lineHeight: 1.1, marginBottom: '2.5rem' }}>
                Now, make it think.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.65)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '480px' }}>
                Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#fff', marginBottom: '1rem' }}>Lead Captured.</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)' }}>We will reach out to schedule an exploration session.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label htmlFor="name-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Name</label>
                    <input id="name-modern" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label htmlFor="email-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Email</label>
                    <input id="email-modern" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label htmlFor="msg-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                    <textarea id="msg-modern" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <button type="submit" className="btn-glow-border" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', padding: '0.9rem', width: '100%' }}>
                    Schedule Discovery
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. TECH V4 - Command Terminal Inputs
  if (displayHero === 'tech_v4') {
    return (
      <section style={{ padding: '10rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          opacity: 0.5, pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2rem, 4vw, 4.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem', textTransform: 'uppercase' }}>
              You already have the data.<br />
              <span style={{ color: '#c6ff34' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '480px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div style={{ border: '1px solid rgba(198,255,52,0.3)', padding: '2.5rem', background: '#050505', position: 'relative', borderRadius: isRemix ? '12px' : '0px' }}>
            <div style={{ position: 'absolute', top: '2px', left: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', top: '2px', right: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', bottom: '2px', left: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', bottom: '2px', right: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>

            {submitted ? (
              <div style={{ textAlign: 'left', padding: '2rem 0', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#c6ff34', textTransform: 'uppercase', marginBottom: '1rem' }}>[TRANSMISSION_SUCCESS]</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontFamily: 'var(--font-sans)' }}>Lead packet successfully queued. Ready for sync.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px dashed rgba(198,255,52,0.2)', paddingBottom: '0.5rem' }}>
                  <label htmlFor="name-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', width: '90px' }}>[NAME]:</label>
                  <input id="name-tech" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.95rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px dashed rgba(198,255,52,0.2)', paddingBottom: '0.5rem' }}>
                  <label htmlFor="email-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', width: '90px' }}>[EMAIL]:</label>
                  <input id="email-tech" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.95rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="msg-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34' }}>[DISCOVERY_GOAL]:</label>
                  <textarea id="msg-tech" name="message" value={formData.message} onChange={handleChange} rows="2" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(198,255,52,0.2)', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', padding: '0.5rem', outline: 'none', resize: 'none', borderRadius: isRemix ? '6px' : '0px' }} />
                </div>
                <button type="submit" className="btn-glow-border" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem', padding: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid #c6ff34', background: 'transparent', color: '#c6ff34', cursor: 'pointer', borderRadius: isRemix ? '6px' : '0px' }}>
                  [INIT_TRANSMISSION]
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 5. SUI FORK (Default) - Brutalist Premium Dark Split Layout
  return (
    <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(198, 255, 52, 0.12) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <CharacterReveal text="You already have the data." />
            <CharacterReveal text="Now, make it think." className="text-accent" style={{ color: '#c6ff34' }} />
          </h2>
          <CharacterReveal
            text="Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today."
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '480px' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'rgba(255, 255, 255, 0.01)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: isRemix ? '12px' : '16px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '1.75rem', color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>Inquiry Registered</h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)' }}>An architect will contact you shortly to begin mapping.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Name</label>
                <input id="name-sui" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <div>
                <label htmlFor="email-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Email</label>
                <input id="email-sui" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <div>
                <label htmlFor="msg-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                <textarea id="msg-sui" name="message" value={formData.message} onChange={handleChange} required rows="3" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <Magnetic range={150} actionScale={0.1}>
                <button type="submit" className="sui-btn-outline-pill" disabled={!isFormValid} style={{ padding: '0.9rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', width: '100%' }}>
                  Submit Inquiry
                  <div className="sui-btn-icon-wrapper" style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="sui-btn-arrow">
                      <path d="M10.5417 3.26746L9.00599 3.2675L7.92491 5.7266L9.46066 5.72656L10.5417 3.26746Z" fill="currentColor"></path>
                      <path d="M5.30933 3.26746L6.84508 3.2675L7.92617 5.7266L6.39041 5.72656L5.30933 3.26746Z" fill="currentColor"></path>
                      <path d="M10.5417 12.5849L9.00599 12.5849L7.92491 10.1258L9.46066 10.1258L10.5417 12.5849Z" fill="currentColor"></path>
                      <path d="M5.30933 12.5849L6.84508 12.5849L7.92617 10.1258L6.39041 10.1258L5.30933 12.5849Z" fill="currentColor"></path>
                      <path d="M3.26929 5.30914L3.26933 6.8449L5.72843 7.92598L5.72839 6.39023L3.26929 5.30914Z" fill="currentColor"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="sui-btn-arrow">
                      <path d="M10.5417 3.26746L9.00599 3.2675L7.92491 5.7266L9.46066 5.72656L10.5417 3.26746Z" fill="currentColor"></path>
                      <path d="M5.30933 3.26746L6.84508 3.2675L7.92491 5.7266L6.39041 5.72656L5.30933 3.26746Z" fill="currentColor"></path>
                      <path d="M10.5417 12.5849L9.00599 12.5849L7.92491 10.1258L9.46066 10.1258L10.5417 12.5849Z" fill="currentColor"></path>
                      <path d="M5.30933 12.5849L6.84508 12.5849L7.92617 10.1258L6.39041 10.1258L5.30933 12.5849Z" fill="currentColor"></path>
                      <path d="M3.26929 5.30914L3.26933 6.8449L5.72843 7.92598L5.72839 6.39023L3.26929 5.30914Z" fill="currentColor"></path>
                    </svg>
                  </div>
                </button>
              </Magnetic>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar({ activeHero }) {
  const brands = [
    "NEXUS FINTECH", "AURA RETAIL", "VALO HEALTH", "CORE DYNAMICS", "APEX CORP",
    "NEXUS FINTECH", "AURA RETAIL", "VALO HEALTH", "CORE DYNAMICS", "APEX CORP"
  ];

  const getStyle = () => {
    switch (activeHero) {
      case 'spline1':
        return {
          font: 'var(--font-serif)',
          color: 'rgba(255, 255, 255, 0.45)',
          background: 'linear-gradient(to right, transparent, rgba(198,255,52,0.01) 50%, transparent)',
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
          padding: '2rem 0'
        };
      case 'cinematic':
        return {
          font: 'var(--font-ui)',
          color: 'rgba(255, 255, 255, 0.35)',
          background: '#020202',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1.75rem 0'
        };
      case 'modern_v2':
        return {
          font: 'var(--font-display)',
          color: 'rgba(255, 255, 255, 0.5)',
          background: 'rgba(255, 255, 255, 0.01)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '2.5rem 0'
        };
      case 'tech_v4':
        return {
          font: 'var(--font-mono)',
          color: 'rgba(198, 255, 52, 0.5)',
          background: '#010200',
          borderTop: '1px dashed rgba(198, 255, 52, 0.2)',
          borderBottom: '1px dashed rgba(198, 255, 52, 0.2)',
          padding: '2rem 0'
        };
      case 'remix':
        return {
          font: 'var(--font-display)',
          color: 'rgba(255, 255, 255, 0.4)',
          background: 'rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '2rem 0'
        };
      case 'sui_fork':
      default:
        return {
          font: 'var(--font-ui)',
          color: 'rgba(255, 255, 255, 0.4)',
          background: 'rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '2rem 0'
        };
    }
  };

  const current = getStyle();

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      background: current.background,
      backdropFilter: current.backdropFilter || 'none',
      borderTop: current.borderTop,
      borderBottom: current.borderBottom,
      padding: current.padding,
      zIndex: 10
    }}>
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        width: 'max-content',
        animation: 'marquee 30s linear infinite'
      }}>
        {brands.map((b, idx) => (
          <div key={idx} style={{
            fontFamily: current.font,
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            color: current.color,
            marginRight: '6rem',
            display: 'inline-flex',
            alignItems: 'center'
          }}>
            {activeHero === 'tech_v4' && <span style={{ color: 'rgba(198, 255, 52, 0.3)', marginRight: '8px' }}>[SYS_PARTNER]</span>}
            {b}
            {activeHero === 'cinematic' && <span style={{ color: 'rgba(255, 255, 255, 0.15)', marginLeft: '3rem' }}>|</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION 9.2: INTEGRATIONS HUB (STRIPE-INSPIRED SVG BEZIER DATA CONNECTIONS) ───
function IntegrationsHub({ activeHero }) {
  const [hoveredNode, setHoveredNode] = React.useState(null);

  // SVG Icons for the integration nodes
  const icons = {
    SAP: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    Salesforce: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.47 0-.89.09-1.3.27A5 5 0 0 0 5 14c0 .12.01.24.02.36A4 4 0 0 0 8 22h8a4 4 0 0 0 1.5-3Z" />
      </svg>
    ),
    SQL: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    ),
    Oracle: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v12" />
        <path d="M6 12h12" />
      </svg>
    ),
    HubSpot: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.5" y1="10.5" x2="15.5" y2="6.5" />
        <line x1="8.5" y1="13.5" x2="15.5" y2="17.5" />
      </svg>
    ),
    SharePoint: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    PowerBI: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    PowerApps: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    Copilot: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 7.54 16.59l-1.42-1.42A8 8 0 1 0 5.88 17.5l-1.42 1.42A10 10 0 0 1 12 2z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 7v2" />
        <path d="M12 15v2" />
        <path d="M7 12h2" />
        <path d="M15 12h2" />
      </svg>
    )
  };

  const nodes = [
    // --- INPUTS (Left Side) ---
    {
      id: "SAP",
      name: "SAP ERP",
      left: '18%',
      top: '20%',
      align: 'left',
      desc: "Automated sync of inventory, procurement, and financial ledgers.",
      status: "STABLE",
      latency: "12ms",
      type: "ERP Native",
      iconKey: "SAP"
    },
    {
      id: "Salesforce",
      name: "Salesforce CRM",
      left: '12%',
      top: '40%',
      align: 'left',
      desc: "Bi-directional sync of sales pipelines, accounts, and contact records.",
      status: "CONNECTED",
      latency: "8ms",
      type: "REST Pipeline",
      iconKey: "Salesforce"
    },
    {
      id: "SQL",
      name: "Azure SQL Database",
      left: '18%',
      top: '60%',
      align: 'left',
      desc: "High-speed query engine orchestrating structured enterprise databases.",
      status: "SYNC_OK",
      latency: "4ms",
      type: "ODBC Pipeline",
      iconKey: "SQL"
    },
    // --- INPUTS (Right Side) ---
    {
      id: "Oracle",
      name: "Oracle Database",
      left: '82%',
      top: '20%',
      align: 'right',
      desc: "Enterprise ledger mapping and relational table ingestion.",
      status: "STABLE",
      latency: "14ms",
      type: "OCI Native",
      iconKey: "Oracle"
    },
    {
      id: "HubSpot",
      name: "HubSpot CRM",
      left: '88%',
      top: '40%',
      align: 'right',
      desc: "Automated sync of marketing campaigns and lead attribution.",
      status: "CONNECTED",
      latency: "7ms",
      type: "Web API",
      iconKey: "HubSpot"
    },
    {
      id: "SharePoint",
      name: "SharePoint Portal",
      left: '82%',
      top: '60%',
      align: 'right',
      desc: "Unified document index mapping and file metadata syncing.",
      status: "SYNC_OK",
      latency: "9ms",
      type: "Graph Native",
      iconKey: "SharePoint"
    },
    // --- OUTPUTS (Bottom Side) ---
    {
      id: "PowerBI",
      name: "Power BI Reports",
      left: '26%',
      top: '80%',
      align: 'bottom-left',
      desc: "Executive analytics dashboards with real-time predictive insights.",
      status: "RENDERED",
      latency: "Live",
      type: "Visualization",
      iconKey: "PowerBI"
    },
    {
      id: "PowerApps",
      name: "Power Apps",
      left: '50%',
      top: '84%',
      align: 'bottom-center',
      desc: "Mobile and web business interfaces automating operations.",
      status: "ACTIVE",
      latency: "<10ms",
      type: "Low-Code UI",
      iconKey: "PowerApps"
    },
    {
      id: "Copilot",
      name: "AI Copilot Agents",
      left: '74%',
      top: '80%',
      align: 'bottom-right',
      desc: "Custom AI reasoning agents automating complex user chats.",
      status: "ONLINE",
      latency: "Cognitive",
      type: "Copilot Studio",
      iconKey: "Copilot"
    }
  ];

  const getStyle = () => {
    switch (activeHero) {
      case 'spline1':
        return {
          font: 'var(--font-serif)',
          fontBody: 'var(--font-sans)',
          title: "Unified Cognitive Ecosystem",
          subtitle: "Cognitive bridges built over your current enterprise tech stack.",
          connectorColor: 'rgba(198, 255, 52, 0.15)',
          nodeBg: 'rgba(10, 18, 1, 0.75)',
          nodeBorder: 'rgba(198, 255, 52, 0.25)',
          bgGradient: 'linear-gradient(to bottom, #040900 0%, #000000 100%)',
          cardRadius: '9999px',
          borderColor: 'rgba(255,255,255,0.04)'
        };
      case 'cinematic':
        return {
          font: 'var(--font-ui)',
          fontBody: 'var(--font-sans)',
          title: "COGNITIVE ROUTING DATA HUB",
          subtitle: "HARDWARE ADAPTER CONSOLE TO CENTRAL COGNITIVE ENGINE.",
          connectorColor: 'rgba(255, 255, 255, 0.12)',
          nodeBg: '#020202',
          nodeBorder: 'rgba(255,255,255,0.18)',
          bgGradient: 'linear-gradient(to bottom, #08080c 0%, #000000 100%)',
          cardRadius: '0px',
          borderColor: 'rgba(255,255,255,0.08)'
        };
      case 'modern_v2':
        return {
          font: 'var(--font-display)',
          fontBody: 'var(--font-sans)',
          title: "Seamless Data Synthesis",
          subtitle: "Connect to existing systems. Orchestrate data flows across multiple processors, build custom analytical schemas, and sync third-party sources using pre-built integrations.",
          connectorColor: 'rgba(198, 255, 52, 0.22)',
          nodeBg: 'rgba(255, 255, 255, 0.02)',
          nodeBorder: 'rgba(255,255,255,0.06)',
          bgGradient: 'linear-gradient(to bottom, #071501 0%, #000000 100%)',
          cardRadius: '16px',
          borderColor: 'rgba(255,255,255,0.05)'
        };
      case 'tech_v4':
        return {
          font: 'var(--font-mono)',
          fontBody: 'var(--font-mono)',
          title: "COGNITIVE_INTEGRATIONS_MATRIX",
          subtitle: "ROUTING COGNITIVE CHANNELS OVER DATA SOURCES.",
          connectorColor: 'rgba(198, 255, 52, 0.4)',
          nodeBg: '#010200',
          nodeBorder: 'rgba(198, 255, 52, 0.45)',
          bgGradient: 'linear-gradient(to bottom, #050505 0%, #000000 100%)',
          cardRadius: '0px',
          borderColor: 'rgba(198,255,52,0.2)'
        };
      case 'remix':
        return {
          font: 'var(--font-display)',
          fontBody: 'var(--font-sans)',
          title: "Cognitive Integration Matrix",
          subtitle: "Connect to existing enterprise databases, cloud storage, and CRM platforms. Unify raw data streams under NeuralBI's orchestration engine to dynamically generate real-time reports, low-code business applications, and cognitive AI reasoning agents.",
          connectorColor: 'rgba(198, 255, 52, 0.4)',
          nodeBg: '#010200',
          nodeBorder: 'rgba(198, 255, 52, 0.45)',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #000000 100%)',
          cardRadius: '6px',
          borderColor: 'rgba(198,255,52,0.2)'
        };
      case 'sui_fork':
      default:
        return {
          font: 'var(--font-ui)',
          fontBody: 'var(--font-sans)',
          title: "Unified Intelligence Network",
          subtitle: "Leverage standard Microsoft connectors to drive efficiency.",
          connectorColor: 'rgba(198, 255, 52, 0.18)',
          nodeBg: 'rgba(255, 255, 255, 0.01)',
          nodeBorder: 'rgba(255,255,255,0.05)',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #000000 100%)',
          cardRadius: '24px',
          borderColor: 'rgba(255,255,255,0.04)'
        };
    }
  };

  const s = getStyle();

  return (
    <section style={{
      background: s.bgGradient,
      padding: '8rem 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ textAlign: 'center', margin: 0 }}>
            <CharacterReveal
              text={s.title}
              className={activeHero === 'remix' ? 'text-gradient-premium' : ''}
              style={{
                fontFamily: s.font,
                fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)',
                fontWeight: 800,
                textTransform: activeHero === 'cinematic' || activeHero === 'tech_v4' ? 'uppercase' : 'none',
                letterSpacing: '-0.02em',
                ...(activeHero !== 'remix' ? { color: '#ffffff' } : {})
              }}
            />
          </h2>
          <p style={{
            fontFamily: s.fontBody,
            fontSize: '1.05rem',
            color: 'rgba(255, 255, 255, 0.45)',
            marginTop: '1rem',
            maxWidth: '580px',
            margin: '1rem auto 0 auto',
            lineHeight: 1.6
          }}>
            <CharacterReveal text={s.subtitle} stagger={0.008} />
          </p>
        </div>

        {/* Stripe-Inspired Interactive Network Map Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.01)',
          backdropFilter: 'blur(20px)',
          borderRadius: s.cardRadius === '9999px' ? '32px' : s.cardRadius === '24px' ? '28px' : s.cardRadius === '16px' ? '20px' : '0px',
          border: '1px solid ' + s.borderColor,
          overflow: 'hidden',
          padding: '3rem 0',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
        }}>
          {/* Background Grid Accent */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
            backgroundSize: '25px 25px',
            opacity: 0.3,
            zIndex: 0
          }} />

          <div style={{ position: 'relative', width: '100%', height: '500px', zIndex: 1 }}>

            {/* SVG Connections Paths with viewBox and preserveAspectRatio for absolute alignment */}
            <svg preserveAspectRatio="none" viewBox="0 0 900 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <filter id="glow" filterUnits="userSpaceOnUse" x="-50" y="-50" width="1000" height="600">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ─────────────────────────────────────────────────────────
                  DIFFERENT FLOW PATH ITERATIONS PER VERSION
                  ───────────────────────────────────────────────────────── */}
              {(activeHero === 'cinematic' || activeHero === 'tech_v4') ? (
                <>
                  {/* SAP (162, 100) */}
                  <path d="M 162 100 L 300 100 L 300 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 162 100 L 300 100 L 300 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 18s linear infinite' }} />

                  {/* Salesforce (108, 200) */}
                  <path d="M 108 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 108 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 14s linear infinite' }} />

                  {/* Azure SQL (162, 300) */}
                  <path d="M 162 300 L 300 300 L 300 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 162 300 L 300 300 L 300 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 15s linear infinite' }} />

                  {/* Oracle DB (738, 100) */}
                  <path d="M 738 100 L 600 100 L 600 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 738 100 L 600 100 L 600 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 18s linear infinite' }} />

                  {/* HubSpot CRM (792, 200) */}
                  <path d="M 792 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 792 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 14s linear infinite' }} />

                  {/* SharePoint (738, 300) */}
                  <path d="M 738 300 L 600 300 L 600 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 738 300 L 600 300 L 600 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 15s linear infinite' }} />

                  {/* Outputs: Center to Deliverables */}
                  {/* Reports (234, 400) */}
                  <path d="M 450 200 L 450 300 L 234 300 L 234 400" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 450 200 L 450 300 L 234 300 L 234 400" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 17s linear infinite' }} />

                  {/* Apps (450, 420) */}
                  <path d="M 450 200 L 450 420" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 450 200 L 450 420" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 12s linear infinite' }} />

                  {/* Agents (666, 400) */}
                  <path d="M 450 200 L 450 300 L 666 300 L 666 400" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 450 200 L 450 300 L 666 300 L 666 400" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 20s linear infinite' }} />
                </>
              ) : (
                <>
                  {/* Inputs: left curved */}
                  {/* SAP (162, 100) */}
                  <path d="M 162 100 C 300 100, 370 170, 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 162 100 C 300 100, 370 170, 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 18s linear infinite' }} />

                  {/* Salesforce (108, 200) */}
                  <path d="M 108 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 108 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 14s linear infinite' }} />

                  {/* Azure SQL (162, 300) */}
                  <path d="M 162 300 C 300 300, 370 230, 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 162 300 C 300 300, 370 230, 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 15s linear infinite' }} />

                  {/* Inputs: right curved */}
                  {/* Oracle DB (738, 100) */}
                  <path d="M 738 100 C 600 100, 530 170, 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 738 100 C 600 100, 530 170, 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 18s linear infinite' }} />

                  {/* HubSpot CRM (792, 200) */}
                  <path d="M 792 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 792 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 14s linear infinite' }} />

                  {/* SharePoint (738, 300) */}
                  <path d="M 738 300 C 600 300, 530 230, 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 738 300 C 600 300, 530 230, 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 15s linear infinite' }} />

                  {/* Outputs: bottom curved */}
                  {/* Reports (234, 400) */}
                  <path d="M 450 200 C 450 310, 234 310, 234 400" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 450 200 C 450 310, 234 310, 234 400" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 17s linear infinite' }} />

                  {/* Apps (450, 420) */}
                  <path d="M 450 200 L 450 420" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 450 200 L 450 420" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 12s linear infinite' }} />

                  {/* Agents (666, 400) */}
                  <path d="M 450 200 C 450 310, 666 310, 666 400" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 450 200 C 450 310, 666 310, 666 400" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 20s linear infinite' }} />
                </>
              )}
            </svg>

            {/* Semantic Layout Labels */}
            <div style={{ position: 'absolute', top: '20px', left: '35px', fontFamily: s.font, fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              [ Data Inputs ]
            </div>
            <div style={{ position: 'absolute', top: '20px', right: '35px', fontFamily: s.font, fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              [ Data Inputs ]
            </div>
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', fontFamily: s.font, fontSize: '0.65rem', color: '#c6ff34', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', zIndex: 10 }}>
              [ Business Deliverables ]
            </div>

            {/* Central Hub Node (Centered mathematically inside the 50%/50% parent grid) */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90px',
              height: '90px',
              zIndex: 3
            }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: 'spring', stiffness: 85, damping: 15 }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#000000',
                  border: '2.5px solid #c6ff34',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 35px rgba(198, 255, 52, 0.4)',
                  position: 'relative'
                }}
              >
                {/* Spinning technical dash ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-8px',
                  border: '1.5px dashed rgba(198, 255, 52, 0.4)',
                  borderRadius: '50%',
                  animation: 'rotate-gradient 25s linear infinite'
                }} />

                {/* Absolute mathematical logo centering */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none'
                }}>
                  <img
                    src={logoSoloUrl}
                    alt="NeuralBI Hub"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      height: '44px', /* Slightly larger for improved visual weight */
                      width: 'auto',
                      opacity: 0.95,
                      display: 'block'
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Outer System Nodes with SVG icons */}
            {nodes.map((node, idx) => {
              const isHovered = hoveredNode === node.id;
              const leftVal = parseFloat(node.left) || 0;
              const topVal = parseFloat(node.top) || 0;
              const dx = leftVal - 50;
              const dy = topVal - 40;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const delay = distance * 0.007; // Synaptic radial ripple effect

              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: node.top,
                    left: node.left,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isHovered ? 10 : 4
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', stiffness: 90, damping: 14, delay: delay }}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                  >
                    {/* Floating tooltip overlay (Safely aligned inward to avoid screen clipping) */}
                    <div style={{
                      position: 'absolute',
                      width: '280px', /* Increased width to prevent tight text wrapping */
                      background: '#040405',
                      border: '1px solid ' + (isHovered ? '#c6ff34' : 'rgba(255,255,255,0.08)'),
                      borderRadius: s.cardRadius === '9999px' ? '20px' : s.cardRadius === '0px' ? '0px' : '12px',
                      padding: '1.25rem',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      textAlign: 'left',
                      pointerEvents: 'none',
                      opacity: isHovered ? 1 : 0,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                      zIndex: 10,

                      // Tooltips point inward or upward depending on alignment
                      ...(node.align === 'left' ? {
                        left: 'calc(100% + 15px)',
                        top: '50%',
                        transform: 'translateY(-50%) scale(' + (isHovered ? 1 : 0.8) + ')',
                        transformOrigin: 'left center'
                      } : node.align === 'right' ? {
                        right: 'calc(100% + 15px)',
                        top: '50%',
                        transform: 'translateY(-50%) scale(' + (isHovered ? 1 : 0.8) + ')',
                        transformOrigin: 'right center'
                      } : {
                        // Bottom nodes: Tooltips point UPWARD
                        bottom: 'calc(100% + 15px)',
                        left: '50%',
                        transform: 'translateX(-50%) scale(' + (isHovered ? 1 : 0.8) + ')',
                        transformOrigin: 'bottom center'
                      })
                    }}>
                      <strong style={{ fontFamily: s.font, display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#c6ff34' }}>
                        {node.name}
                      </strong>
                      <span style={{ fontFamily: s.fontBody, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45, display: 'block', marginBottom: '8px' }}>
                        {node.desc}
                      </span>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        borderTop: '1px dashed rgba(255,255,255,0.1)',
                        paddingTop: '8px',
                        color: 'rgba(255,255,255,0.4)'
                      }}>
                        <span>{node.type}</span>
                        <span style={{ color: '#c6ff34' }}>{node.latency}</span>
                      </div>
                    </div>

                    {/* Premium Integrated Node Card */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      height: '44px',
                      padding: '0 16px 0 12px',
                      background: isHovered ? '#0c0f05' : '#040405',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid ' + (isHovered ? '#c6ff34' : 'rgba(255, 255, 255, 0.08)'),
                      borderRadius: s.cardRadius === '9999px' ? '22px' : s.cardRadius === '0px' ? '0px' : '8px',
                      boxShadow: isHovered
                        ? '0 0 20px rgba(198, 255, 52, 0.12), inset 0 0 10px rgba(198, 255, 52, 0.02)'
                        : '0 4px 12px rgba(0, 0, 0, 0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                      {/* Icon Container */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isHovered ? '#c6ff34' : 'rgba(255, 255, 255, 0.8)',
                        transition: 'color 0.3s'
                      }}>
                        {icons[node.iconKey]}
                      </div>

                      {/* Divider Line */}
                      <div style={{
                        width: '1px',
                        height: '16px',
                        background: isHovered ? 'rgba(198, 255, 52, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s'
                      }} />

                      {/* Text Label */}
                      <span style={{
                        fontFamily: s.fontBody,
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: isHovered ? '#c6ff34' : 'rgba(255, 255, 255, 0.9)',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.01em',
                        transition: 'color 0.3s'
                      }}>
                        {node.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9.4: CASE STUDY SPOTLIGHT (SUCCESS STORY PULL QUOTE) ───
function CaseStudy({ activeHero }) {
  const isPremium = activeHero === 'sui_fork' || activeHero === 'tech_v4' || activeHero === 'remix';

  const getStyle = () => {
    switch (activeHero) {
      case 'spline1':
        return {
          font: 'var(--font-serif)',
          cardBg: 'linear-gradient(to right, rgba(10,18,1,0.5), rgba(0,0,0,0.8))',
          borderColor: 'rgba(198, 255, 52, 0.12)',
          avatarRadius: '9999px',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #040900 100%)'
        };
      case 'cinematic':
        return {
          font: 'var(--font-ui)',
          cardBg: '#020202',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          avatarRadius: '0px',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #08080c 100%)'
        };
      case 'modern_v2':
        return {
          font: 'var(--font-display)',
          cardBg: 'rgba(255, 255, 255, 0.01)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          avatarRadius: '12px',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #071501 100%)'
        };
      case 'tech_v4':
        return {
          font: 'var(--font-mono)',
          cardBg: '#010200',
          borderColor: 'rgba(198, 255, 52, 0.3)',
          avatarRadius: '0px',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #050505 100%)'
        };
      case 'remix':
        return {
          font: 'var(--font-display)',
          cardBg: '#010200',
          borderColor: 'rgba(198, 255, 52, 0.3)',
          avatarRadius: '6px',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #050505 100%)'
        };
      case 'sui_fork':
      default:
        return {
          font: 'var(--font-ui)',
          cardBg: 'rgba(255, 255, 255, 0.01)',
          borderColor: 'rgba(255, 255, 255, 0.04)',
          avatarRadius: '50%',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #000000 100%)'
        };
    }
  };

  const style = getStyle();

  return (
    <section style={{
      background: style.bgGradient,
      padding: '8rem 0',
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid ' + style.borderColor
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: style.cardBg,
            backdropFilter: 'blur(28px)',
            border: '1px solid ' + style.borderColor,
            borderRadius: style.avatarRadius === '9999px' ? '32px' : style.avatarRadius === '50%' ? '24px' : style.avatarRadius === '12px' ? '20px' : '0px',
            padding: isPremium ? '0' : '4.5rem',
            position: 'relative',
            overflow: 'hidden',
            display: isPremium ? 'grid' : 'block',
            gridTemplateColumns: isPremium ? '1fr 1fr' : '1fr'
          }}>

          <div style={{ padding: isPremium ? '4.5rem' : '0', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{
                fontFamily: style.font,
                fontSize: '0.8rem',
                color: '#c6ff34',
                letterSpacing: '0.15em',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                Case Study // Nexus Fintech
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.3)'
              }}>
                IMPACT: +80% EFFICIENCY
              </span>
            </div>

            <blockquote style={{ margin: 0 }}>
              <p style={{
                fontFamily: style.font,
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                color: '#ffffff',
                fontWeight: 400,
                lineHeight: 1.35,
                letterSpacing: '-0.01em'
              }}>
                "NeuralBI transformed our manual spreadsheet reporting operations into a fully containerized, real-time predictive dashboard. Our workload fell by 80% overnight."
              </p>
            </blockquote>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '2rem',
              marginTop: 'auto'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: style.avatarRadius,
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(198, 255, 52, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: style.font,
                fontSize: '0.85rem',
                color: '#c6ff34',
                fontWeight: 800
              }}>
                ML
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <cite style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', fontStyle: 'normal' }}>
                  Marcus Lindqvist
                </cite>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                  Director of Operations, Nexus Fintech
                </span>
              </div>
            </div>
          </div>

          {isPremium && (
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderLeft: '1px solid rgba(255,255,255,0.05)',
              padding: '3rem',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Abstract UI Mockup */}
              <div style={{
                width: '100%',
                height: '100%',
                background: 'rgba(10,10,10,0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                transformOrigin: 'right center'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#c6ff34' }}>LIVE_TELEMETRY</div>
                </div>

                {/* Simulated Chart */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingTop: '2rem' }}>
                  {[40, 70, 45, 90, 60, 100, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        flex: 1,
                        background: i === 5 ? '#c6ff34' : 'rgba(255,255,255,0.1)',
                        borderRadius: '4px 4px 0 0',
                        position: 'relative'
                      }}
                    >
                      {i === 5 && (
                        <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: '#c6ff34', color: '#000', padding: '4px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 'bold' }}>
                          +80%
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </motion.div>

      </div>
    </section>
  );
}


// ─── SECTION 10: PREMIUM STYLE-SPECIFIC FAQ (ACCORDIONS, GRID & COMMAND CONSOLE) ───
function Faq({ activeHero }) {
  const [activeIdx, setActiveIdx] = React.useState(null);

  const faqData = [
    {
      q: "What is Microsoft Power Platform?",
      a: "A suite of low-code tools (Power Apps, Automate, BI, Copilot Studio) that allows businesses to build apps, automate workflows, analyze data, and build agentic chatbots rapidly."
    },
    {
      q: "How does NeuralBI differ from traditional IT consultancies?",
      a: "Traditional firms deliver static reports and rigid code. NeuralBI operates on 'Applied Intelligence'—orchestrating cognitive layers directly into your Microsoft environment for real-time automation and zero-friction deployments."
    },
    {
      q: "What is the average timeline for the Neural Protocol?",
      a: "Our precise three-phase protocol (Audit, Build, Scale) ranges from 2 weeks for targeted automation pilots to 8 weeks for full enterprise cognitive data engines."
    },
    {
      q: "Is our enterprise data secure with NeuralBI solutions?",
      a: "Absolutely. All workflows are built directly within your tenant boundary, utilizing Microsoft Azure enterprise-grade security protocols, end-to-end data encryption, and strict governance policies."
    }
  ];

  // Pick theme fonts and colors
  const getTheme = () => {
    switch (activeHero) {
      case 'spline1':
        return {
          fontTitle: 'var(--font-serif)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #040900)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          glowColor: 'rgba(198, 255, 52, 0.03)'
        };
      case 'cinematic':
        return {
          fontTitle: 'var(--font-ui)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #08080c)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          glowColor: 'transparent'
        };
      case 'modern_v2':
        return {
          fontTitle: 'var(--font-display)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #071501)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
          glowColor: 'rgba(198, 255, 52, 0.04)'
        };
      case 'tech_v4':
        return {
          fontTitle: 'var(--font-tech)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #050505)',
          borderColor: 'rgba(198, 255, 52, 0.2)',
          glowColor: 'rgba(198, 255, 52, 0.02)'
        };
      case 'remix':
        return {
          fontTitle: 'var(--font-display)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #050505)',
          borderColor: 'rgba(198, 255, 52, 0.2)',
          glowColor: 'rgba(198, 255, 52, 0.02)'
        };
      case 'sui_fork':
      default:
        return {
          fontTitle: 'var(--font-ui)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #000000)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          glowColor: 'rgba(198, 255, 52, 0.04)'
        };
    }
  };

  const theme = getTheme();

  // 1. NEBULA FAQ (Split-Screen Serif Accordion)
  if (activeHero === 'spline1') {
    return (
      <section style={{
        background: theme.bgGradient,
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid ' + theme.borderColor
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }} className="raycast-footer-grid">
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#ffffff', fontWeight: 400, lineHeight: 1.15 }}>
              Frequently Asked Queries
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '1.5rem', lineHeight: 1.6 }}>
              A curated overview of Power Platform capabilities, NeuralBI orchestrations, data sovereignty, and deployment timelines.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqData.map((item, idx) => {
              const isOpen = activeIdx === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '1.5rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      color: isOpen ? '#c6ff34' : '#ffffff',
                      transition: 'color 0.3s'
                    }}>
                      {item.q}
                    </h3>
                    <span style={{
                      color: '#c6ff34',
                      fontSize: '1.25rem',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }}>
                      +
                    </span>
                  </div>
                  <div style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isOpen ? 1 : 0
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      color: 'rgba(255, 255, 255, 0.55)',
                      lineHeight: 1.6,
                      marginTop: '1rem',
                      maxWidth: '620px'
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 2. CINEMATIC FAQ (2x2 Brutalist Grid Console)
  if (activeHero === 'cinematic') {
    return (
      <section style={{
        background: theme.bgGradient,
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid ' + theme.borderColor
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#ffffff',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            SYSTEM FAQ // CONSOLE
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }} className="raycast-footer-grid">
            {faqData.map((item, idx) => {
              const isOpen = activeIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  style={{
                    background: '#020202',
                    padding: '3rem 2.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s',
                    outline: isOpen ? '1px solid #c6ff34' : '1px solid transparent',
                    zIndex: isOpen ? 2 : 1
                  }}
                >
                  {isOpen && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#c6ff34', letterSpacing: '0.1em' }}>
                      [ACTIVE_CELL]
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: isOpen ? '#c6ff34' : 'rgba(255,255,255,0.35)', marginTop: '3px' }}>
                      0{idx + 1} //
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: isOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3
                    }}>
                      {item.q}
                    </h3>
                  </div>

                  <div style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isOpen ? 1 : 0
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.6,
                      marginTop: '1.5rem',
                      borderLeft: '2px solid #c6ff34',
                      paddingLeft: '1rem'
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 3. MODERN V2 FAQ (Stripe-style Interactive Tab Panel)
  if (activeHero === 'modern_v2') {
    const selectedIdx = activeIdx !== null ? activeIdx : 0;
    return (
      <section style={{
        background: theme.bgGradient,
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid ' + theme.borderColor
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#ffffff',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            Questions and Answers
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: '4rem',
            alignItems: 'stretch'
          }} className="raycast-footer-grid">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
              {faqData.map((item, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      background: isSelected ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                      border: isSelected ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
                      borderRadius: '16px',
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: isSelected ? '#c6ff34' : 'rgba(255,255,255,0.15)',
                      boxShadow: isSelected ? '0 0 8px #c6ff34' : 'none',
                      transition: 'all 0.3s'
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                      transition: 'color 0.3s'
                    }}>
                      {item.q}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.01)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              padding: '4rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(198, 255, 52, 0.03)'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(198, 255, 52, 0.08) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#c6ff34',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  Response Panel
                </span>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginTop: '1rem',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em'
                }}>
                  {faqData[selectedIdx].q}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: 1.7,
                  marginTop: '2rem'
                }}>
                  {faqData[selectedIdx].a}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. TECH V4 FAQ (Cyberpunk Command Terminal Console)
  if (activeHero === 'tech_v4') {
    const selectedIdx = activeIdx !== null ? activeIdx : 0;
    return (
      <section style={{
        background: theme.bgGradient,
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid ' + theme.borderColor
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{
            border: '1px solid rgba(198, 255, 52, 0.3)',
            background: 'rgba(5, 8, 1, 0.9)',
            padding: '1.25rem 2rem',
            borderBottom: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c6ff34', boxShadow: '0 0 6px #c6ff34' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#c6ff34', letterSpacing: '0.1em' }}>
                FAQ
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.3)' }}>

            </span>
          </div>

          <div style={{
            border: '1px solid rgba(198, 255, 52, 0.3)',
            background: '#010200',
            padding: '3rem',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '3rem',
            position: 'relative'
          }} className="raycast-footer-grid">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.3)', marginBottom: '0.5rem' }}>
                Select a topic:
              </span>

              {faqData.map((item, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: isSelected ? '#c6ff34' : 'rgba(255, 255, 255, 0.65)',
                      cursor: 'pointer',
                      padding: '0.75rem 1rem',
                      border: '1px dashed ' + (isSelected ? 'rgba(198, 255, 52, 0.4)' : 'rgba(255, 255, 255, 0.08)'),
                      background: isSelected ? 'rgba(198, 255, 52, 0.03)' : 'transparent',
                      transition: 'all 0.25s'
                    }}
                  >
                    <span>{isSelected ? '' : ''}</span>
                    <span>{item.q}</span>
                  </div>
                );
              })}
            </div>

            <div style={{
              borderLeft: '1px solid rgba(198, 255, 52, 0.2)',
              paddingLeft: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px'
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.3)' }}>
                  Answer
                </span>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  lineHeight: 1.6,
                  marginTop: '1.5rem',
                  letterSpacing: '-0.02em'
                }}>
                  {faqData[selectedIdx].a}
                </p>
              </div>


            </div>
          </div>
        </div>
      </section>
    );
  }

  // 5. SUI FORK FAQ (Bento glass accordion cards)
  return (
    <section style={{
      background: theme.bgGradient,
      padding: '8rem 0',
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid ' + theme.borderColor
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <CharacterReveal
            text="Frequently Asked Questions"
            className={activeHero === 'remix' ? 'text-gradient-premium' : ''}
            style={{
              fontFamily: activeHero === 'remix' ? 'var(--font-display)' : 'var(--font-ui)',
              fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              ...(activeHero !== 'remix' ? { color: '#ffffff' } : {})
            }}
          />
        </h2>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {faqData.map((item, idx) => {
            const isOpen = activeIdx === idx;
            const itemVariants = {
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 20
                }
              }
            };
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onClick={() => setActiveIdx(isOpen ? null : idx)}
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid ' + (isOpen ? 'rgba(198, 255, 52, 0.25)' : 'rgba(255, 255, 255, 0.05)'),
                  borderRadius: '20px',
                  padding: '2rem 2.25rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isOpen ? '0 15px 35px rgba(198, 255, 52, 0.03)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="sui-card-hover"
              >
                {isOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(198, 255, 52, 0.06) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: isOpen ? '#c6ff34' : '#ffffff',
                    transition: 'color 0.3s'
                  }}>
                    {item.q}
                  </h3>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isOpen ? 'rgba(198, 255, 52, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid ' + (isOpen ? '#c6ff34' : 'rgba(255, 255, 255, 0.08)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? '#c6ff34' : '#ffffff',
                    transition: 'all 0.3s'
                  }}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s'
                      }}
                    >
                      <path d="M2 5L8 11L14 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div style={{
                  maxHeight: isOpen ? '200px' : '0px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isOpen ? 1 : 0
                }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6,
                    marginTop: '1.5rem'
                  }}>
                    {item.a}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


// ─── SECTION 10: PREMIUM STYLE-SPECIFIC FOOTER (SUI & RAYCAST DNA) ───
function Footer({ activeHero }) {
  const [lang, setLang] = React.useState('English');

  const links = {
    platform: [
      { name: "About Power Platform", href: "#" },
      { name: "Enterprise Blueprint", href: "#" },
      { name: "AI Integration", href: "#" }
    ],
    solutions: [
      { name: "Fintech Engine", href: "#" },
      { name: "Retail Pipeline", href: "#" },
      { name: "Health Telemetry", href: "#" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Manifesto", href: "#" }
    ],
    developers: [
      { name: "PowerApps SDK", href: "#" },
      { name: "Developer APIs", href: "#" },
      { name: "Copilot Studio", href: "#" }
    ],
    resources: [
      { name: "Incident History", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" }
    ]
  };

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'tech_v4' : activeHero;

  // 1. NEBULA FOOTER (Organic Floating Orbs)
  if (displayHero === 'spline1') {
    return (
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(to top, #040900 0%, #000000 100%)',
        padding: '7rem 0 4rem 0',
        overflow: 'hidden',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Soft, drifting, organic background blobs */}
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '20%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'rgba(198, 255, 52, 0.04)',
          filter: 'blur(120px)',
          zIndex: 1,
          animation: 'float-blob-1 16s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          right: '25%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(198, 255, 52, 0.03)',
          filter: 'blur(140px)',
          zIndex: 1,
          animation: 'float-blob-2 20s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
          {/* Link columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '3rem',
            marginBottom: '6rem'
          }}>
            {Object.keys(links).map((category) => (
              <div key={category} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  color: '#ffffff',
                  textTransform: 'capitalize',
                  opacity: 0.8
                }}>
                  {category}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {links[category].map((l, idx) => (
                    <li key={idx}>
                      <a href={l.href} style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.45)',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}>
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Lower Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', alignSelf: 'flex-start', opacity: 0.95 }} />

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['Youtube', 'Discord', 'LinkedIn', 'X'].map((social, idx) => (
                  <a key={idx} href="#" className="sui-social-box" style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '9999px', // round pill style
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {social[0]}
                  </a>
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.05em' }}>
                © 2026 Copyright NeuralBI. All rights reserved.
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLang(lang === 'English' ? 'Español' : 'English')}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.5rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(198, 255, 52, 0.3)'; e.currentTarget.style.background = 'rgba(198, 255, 52, 0.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
              >
                <span>{lang}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>▼</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 2. CINEMATIC FOOTER (Sweep Sheen & Film Grid)
  if (activeHero === 'cinematic') {
    return (
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(to top, #08080c 0%, #000000 100%)',
        padding: '6rem 0 5rem 0',
        overflow: 'hidden',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Retro cinematic grid pattern background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.45,
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        {/* Sweeping film scanner line */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(198, 255, 52, 0.25), transparent)',
          boxShadow: '0 0 10px rgba(198, 255, 52, 0.2)',
          zIndex: 2,
          animation: 'sweep 10s linear infinite',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 3 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '3rem',
            marginBottom: '6rem'
          }} className="raycast-footer-grid">
            {Object.keys(links).map((category, index) => (
              <div key={index} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {category}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {links[category].map((l, idx) => (
                    <li key={idx}>
                      <a href={l.href} style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        color: '#71717a',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}>
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '22px', opacity: 0.8, filter: 'grayscale(1)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#3f3f46' }}>
                © 2026 Copyright NeuralBI. All rights reserved.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {['TW', 'LN', 'DS', 'YT'].map((soc, idx) => (
                <a key={idx} href="#" style={{
                  width: '34px',
                  height: '34px',
                  border: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#71717a',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)'
                }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#71717a'; }}>
                  {soc}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 3. MODERN V2 FOOTER (Fully Degradado Mesh Gradient & Glassmorphism Panel)
  if (activeHero === 'modern_v2') {
    return (
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(to bottom, #000000 0%, #071501 50%, #0f2c02 100%)', // Wide, fully cover gradient
        padding: '8rem 0 4rem 0',
        overflow: 'hidden',
        zIndex: 10,
        borderTop: '1px solid rgba(198, 255, 52, 0.08)'
      }}>
        {/* Pulsing smooth mesh glow covering the entire section */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 100%, rgba(198, 255, 52, 0.15) 0%, rgba(198, 255, 52, 0.03) 60%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 3 }}>
          {/* Glass layout wrapper */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: '4rem 3rem',
            marginBottom: '4rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '2.5rem'
            }} className="raycast-footer-grid">
              {Object.keys(links).map((category, index) => (
                <div key={index} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.02em'
                  }}>
                    {category.toUpperCase()}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {links[category].map((l, idx) => (
                      <li key={idx}>
                        <a href={l.href} style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}>
                          {l.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingTop: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', opacity: 0.95 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                © 2026 Copyright NeuralBI. All rights reserved.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Twitter', 'LinkedIn', 'Discord', 'YouTube'].map((social, idx) => (
                <a key={idx} href="#" style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s'
                }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c6ff34'; e.currentTarget.style.color = '#c6ff34'; e.currentTarget.style.background = 'rgba(198,255,52,0.04)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 4. TECH V4 FOOTER (Screen-Wide Slanted Floating Glass Slats)
  if (displayHero === 'tech_v4') {
    return (
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(to top, #050505 0%, #000000 100%)',
        padding: '0 0 5rem 0',
        overflow: 'hidden',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {isRemix && (
          <>
            {/* Upward glowing lime gradient (Stronger pop & wide screen-wide spread) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '420px',
              background: 'linear-gradient(to top, rgba(198, 255, 52, 0.12) 0%, rgba(198, 255, 52, 0.03) 60%, transparent 100%)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '350px',
              background: 'radial-gradient(circle at 50% 100%, rgba(198, 255, 52, 0.22) 0%, rgba(198, 255, 52, 0.05) 50%, transparent 80%)',
              filter: 'blur(50px)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
          </>
        )}
        {/* Angled slats header block expanded over the entire screen width */}
        <div style={{
          height: '140px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          position: 'relative',
          marginBottom: '5rem',
          borderBottom: '2px solid rgba(198, 255, 52, 0.25)', // glowing slot line
          boxShadow: '0 5px 25px rgba(198, 255, 52, 0.08)',
          overflow: 'hidden',
          width: '100%'
        }}>
          {/* Subtle bottom fade */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #030303)', zIndex: 2, pointerEvents: 'none' }} />

          {/* 28 Slats rendering dynamically across the screen width */}
          <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: '-25px',
            left: 0,
            zIndex: 1,
            padding: '0 1rem',
            overflow: 'hidden'
          }}>
            {Array.from({ length: 28 }).map((_, idx) => {
              const animType = (idx % 3) + 1; // Alternating keys: float-slat-1, float-slat-2, float-slat-3
              const delay = (idx * 0.12).toFixed(2) + 's';
              const customHeight = 110 + (idx % 5) * 10; // varying heights for organic ripple look
              return (
                <div
                  key={idx}
                  className="raycast-slat"
                  style={{
                    animation: 'float-slat-' + animType + ' 5s ease-in-out infinite ' + delay,
                    height: customHeight + 'px',
                    opacity: 0.25 + (idx % 4) * 0.1,
                    flexShrink: 0
                  }}

                />
              );
            })}
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 3 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '2rem',
            marginBottom: '6rem'
          }} className="raycast-footer-grid">
            {Object.keys(links).concat(["community"]).map((category, index) => {
              const catName = category === "platform" ? "Product" : category === "solutions" ? "Core Features" : category === "company" ? "Company" : category === "developers" ? "Developers" : category === "resources" ? "Resources" : "Community";
              const catLinks = links[category] || [
                { name: "Community Stories", href: "#" },
                { name: "Ambassadors", href: "#" },
                { name: "Slack", href: "#" }
              ];

              return (
                <div key={index} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h4 style={{
                    fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.01em'
                  }}>
                    {catName}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {catLinks.map((l, idx) => (
                      <li key={idx}>
                        <a href={l.href} style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          color: '#8e8e93',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}>
                          {l.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '22px', opacity: 0.8 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#636366' }}>
                © 2026 Copyright NeuralBI. All rights reserved.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: '#8e8e93', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#8e8e93'}>X / Twitter</a>
              <a href="#" style={{ color: '#8e8e93', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#8e8e93'}>LinkedIn</a>
              <a href="#" style={{ color: '#8e8e93', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#8e8e93'}>Discord</a>
              <a href="#" style={{ color: '#8e8e93', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#8e8e93'}>YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 5. SUI FORK FOOTER (Upward Dotted Particles Waterfall & Full Soft Glow)
  return (
    <footer style={{
      position: 'relative',
      background: '#000000',
      padding: '6rem 0 4rem 0',
      overflow: 'hidden',
      zIndex: 10,
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Upward glowing lime gradient (Stronger pop & wide screen-wide spread) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '420px', // taller spread covering the full footer height
        background: 'linear-gradient(to top, rgba(198, 255, 52, 0.12) 0%, rgba(198, 255, 52, 0.03) 60%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '350px',
        background: 'radial-gradient(circle at 50% 100%, rgba(198, 255, 52, 0.22) 0%, rgba(198, 255, 52, 0.05) 50%, transparent 80%)',
        filter: 'blur(50px)',
        zIndex: 1,
        pointerEvents: 'none',
        animation: 'pulse-glow 7s ease-in-out infinite alternate'
      }} />

      {/* Dotted grid SVG overlay with rising particle animation */}
      <svg style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <line x1="16.6%" y1="0" x2="16.6%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 6s linear infinite' }} />
        <line x1="33.3%" y1="0" x2="33.3%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 4.5s linear infinite' }} />
        <line x1="50.0%" y1="0" x2="50.0%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 5s linear infinite' }} />
        <line x1="66.6%" y1="0" x2="66.6%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 4s linear infinite' }} />
        <line x1="83.3%" y1="0" x2="83.3%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 5.5s linear infinite' }} />
      </svg>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
        {/* Link columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '3rem',
          marginBottom: '6rem'
        }}>
          {Object.keys(links).map((category) => (
            <div key={category} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.15em'
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links[category].map((l, idx) => (
                  <li key={idx}>
                    <a href={l.href} style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.45)',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}>
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lower Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {/* Left: Logo, Social boxes & Copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', alignSelf: 'flex-start', opacity: 0.95 }} />

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="#" className="sui-social-box" style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.45)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href="#" className="sui-social-box" style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.45)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" /></svg>
              </a>
              <a href="#" className="sui-social-box" style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.45)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="#" className="sui-social-box" style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.45)' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" /></svg>
              </a>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.05em' }}>
              © 2026 Copyright NeuralBI. All rights reserved.
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLang(lang === 'English' ? 'Español' : 'English')}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '0.5rem 1.25rem',
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(198, 255, 52, 0.3)'; e.currentTarget.style.background = 'rgba(198, 255, 52, 0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
            >
              <span>{lang}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>▼</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── SECTION 11: PREMIUM STYLE-SPECIFIC NAVBARS (SUI, RAYCAST & NEBULA DNA) ───
function Navbar({ activeHero }) {
  const [hoveredLink, setHoveredLink] = React.useState(null);
  const [hoveredIdx, setHoveredIdx] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'Arsenal', href: '#arsenal' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Verticals', href: '#verticals' },
    { label: 'Protocol', href: '#protocol' }
  ];

  // 1. NEBULA NAVBAR (var(--font-serif))
  if (activeHero === 'spline1') {
    return (
      <nav className="nav-nebula">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
          <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="nav-nebula-link"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {/* Dot above on hover */}
              <span style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: hoveredLink === link.label ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)',
                opacity: hoveredLink === link.label ? 1 : 0,
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#c6ff34',
                boxShadow: '0 0 8px #c6ff34',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
              {link.label}
            </a>
          ))}
        </div>

        <button className="btn-raycast btn-radius-8" style={{ padding: '0.375rem 1.25rem', fontSize: '0.85rem', fontFamily: 'var(--font-serif)' }}>
          Get Quote
        </button>
      </nav>
    );
  }

  // 2. CINEMATIC NAVBAR (var(--font-ui), brutalist flat square)
  if (activeHero === 'cinematic') {
    return (
      <nav className="nav-cinematic">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
          <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', filter: 'grayscale(1)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="nav-cinematic-link"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{ position: 'relative' }}
            >
              <span style={{
                color: '#c6ff34',
                marginRight: '3px',
                opacity: hoveredLink === link.label ? 1 : 0,
                transform: hoveredLink === link.label ? 'translateX(0)' : 'translateX(-4px)',
                display: 'inline-block',
                transition: 'all 0.25s'
              }}>&gt;</span>
              {link.label}
            </a>
          ))}
        </div>

        <button style={{
          padding: '0.5rem 1.5rem',
          fontSize: '0.8rem',
          fontWeight: 900,
          fontFamily: 'var(--font-ui)',
          textTransform: 'uppercase',
          border: 'none',
          borderRadius: 0,
          background: '#ffffff',
          color: '#000000',
          cursor: 'pointer',
          letterSpacing: '0.05em'
        }}>
          Get Quote
        </button>
      </nav>
    );
  }

  // 3. MODERN V2 NAVBAR (var(--font-display), sliding background capsule)
  if (activeHero === 'modern_v2') {
    return (
      <nav className="nav-modern">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontFamily: 'var(--font-display)', zIndex: 3 }}>
          <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          {/* Sliding capsule background */}
          <div style={{
            position: 'absolute',
            top: '2px',
            bottom: '2px',
            left: '2px',
            width: hoveredIdx === 0 ? '92px' : hoveredIdx === 1 ? '96px' : hoveredIdx === 2 ? '102px' : '0px',
            transform: 'translateX(' + (hoveredIdx === 0 ? '0px' : hoveredIdx === 1 ? '98px' : hoveredIdx === 2 ? '200px' : '0px') + ')',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            opacity: hoveredIdx !== null ? 1 : 0,
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="nav-modern-link"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button className="btn-glow-border" style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-display)', zIndex: 3 }}>
          Get Quote
        </button>
      </nav>
    );
  }

  // 4. TECH V4 NAVBAR (var(--font-mono), bracket console HUD)
  if (activeHero === 'tech_v4') {
    return (
      <nav className="nav-tech">
        {/* Corner tech indicators */}
        <div style={{ position: 'absolute', top: '2px', left: '2px', fontSize: '0.5rem', color: 'rgba(198, 255, 52, 0.4)' }}>+</div>
        <div style={{ position: 'absolute', top: '2px', right: '2px', fontSize: '0.5rem', color: 'rgba(198, 255, 52, 0.4)' }}>+</div>
        <div style={{ position: 'absolute', bottom: '2px', left: '2px', fontSize: '0.5rem', color: 'rgba(198, 255, 52, 0.4)' }}>+</div>
        <div style={{ position: 'absolute', bottom: '2px', right: '2px', fontSize: '0.5rem', color: 'rgba(198, 255, 52, 0.4)' }}>+</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
          <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '22px' }} />
          <span style={{ fontSize: '0.65rem', color: 'rgba(198, 255, 52, 0.5)', marginLeft: '4px' }}>[V4]</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="nav-tech-link"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{ position: 'relative' }}
            >
              {/* Fade in brackets outside the text so layout doesn't shift */}
              <span style={{ position: 'absolute', left: '-10px', opacity: hoveredLink === link.label ? 1 : 0, color: '#c6ff34', transition: 'all 0.25s' }}>[</span>
              {link.label}
              <span style={{ position: 'absolute', right: '-10px', opacity: hoveredLink === link.label ? 1 : 0, color: '#c6ff34', transition: 'all 0.25s' }}>]</span>
            </a>
          ))}
        </div>

        <button className="btn-glow-border" style={{
          padding: '0.4rem 1.25rem',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          borderRadius: '0px',
          border: '1px solid #c6ff34',
          background: 'transparent',
          color: '#c6ff34',
          boxShadow: '0 0 10px rgba(198, 255, 52, 0.2)',
          cursor: 'pointer'
        }}>
          GET_QUOTE
        </button>
      </nav>
    );
  }

  // Remix Navbar: Sui.io (V5) dock glass layout, links in var(--font-display) (Absolut), CTA with V4 styles (accent border-glow) adapted with var(--font-display) and 6px border-radius
  if (activeHero === 'remix') {
    return (
      <nav
        style={{
          position: 'fixed',
          top: scrolled ? '1.5rem' : '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: scrolled ? '90%' : '100%',
          maxWidth: scrolled ? '1200px' : '100%',
          height: scrolled ? '64px' : '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0 1.5rem 0 2rem' : '0 4rem',
          zIndex: 1000,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform, top, width, height, padding, background, border-color, border-radius, box-shadow',
          background: scrolled ? 'rgba(4, 4, 5, 0.75)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          borderLeft: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          borderRight: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          borderTop: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          borderRadius: scrolled ? '9999px' : '0px',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.6)' : 'none'
        }}
      >
        {/* Logo (Clean logomark without redundant text) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Magnetic range={40} actionScale={0.2}>
            <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', display: 'block', cursor: 'pointer' }} />
          </Magnetic>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map((link, idx) => (
            <Magnetic key={idx} range={50} actionScale={0.3}>
              <a
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: hoveredLink === link.label ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'inline-block'
                }}
              >
                {link.label}
                {/* Sliding line bottom (Awwwards elastic liquid transition) */}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="navbar-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: '0',
                      right: '0',
                      height: '2px',
                      background: '#c6ff34',
                      boxShadow: '0 0 8px #c6ff34',
                      borderRadius: '1px'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 28
                    }}
                  />
                )}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Book a Call CTA (Only visible once hero is passed, uses Video 2 Modern btn-glow-border style) */}
        <div style={{
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          transform: scrolled ? 'none' : 'translateX(10px)'
        }}>
          <Magnetic range={80} actionScale={0.25}>
            <button
              className="btn-glow-border"
              style={{
                padding: '0.5rem 1.75rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                borderRadius: '9999px',
                cursor: 'pointer',
                zIndex: 3,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Book a Call <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', height: '14px', lineHeight: 1, transition: 'all 0.5s' }}>↗</span>
            </button>
          </Magnetic>
        </div>
      </nav>
    );
  }

  // 5. SUI FORK NAVBAR (var(--font-ui), dock glass bar)
  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? '1.5rem' : '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: scrolled ? '90%' : '100%',
        maxWidth: scrolled ? '1200px' : '100%',
        height: scrolled ? '64px' : '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '0 1.5rem 0 2rem' : '0 4rem',
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(4, 4, 5, 0.75)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        borderLeft: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        borderRight: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        borderTop: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        borderRadius: scrolled ? '9999px' : '0px',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.6)' : 'none'
      }}
    >
      {/* Logo (Clean logomark without redundant text) */}
      <div style={{ display: 'flex', alignItems: 'center', height: '24px' }}>
        <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              position: 'relative',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: hoveredLink === link.label ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
          >
            {link.label}
            {/* Sliding line bottom */}
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              left: '0',
              right: '0',
              height: '2px',
              background: '#c6ff34',
              boxShadow: '0 0 8px #c6ff34',
              transform: hoveredLink === link.label ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </a>
        ))}
      </div>

      {/* Book a Call CTA (Only visible once hero is passed, uses Video 2 Modern btn-glow-border style) */}
      <div style={{
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        transform: scrolled ? 'none' : 'translateX(10px)'
      }}>
        <button
          className="btn-glow-border"
          style={{
            padding: '0.5rem 1.75rem',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            borderRadius: '9999px',
            cursor: 'pointer',
            zIndex: 3,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Book a Call <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', height: '14px', lineHeight: 1, transition: 'all 0.5s' }}>↗</span>
        </button>
      </div>
    </nav>
  );
}

