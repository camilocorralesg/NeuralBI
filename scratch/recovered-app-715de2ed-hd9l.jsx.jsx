import React, { Suspense, lazy, useState, useRef } from 'react';
import powerBiLogo from './assets/New_Power_BI_Logo.svg';
import powerAppsLogo from './assets/Powerapps-logo.svg.svg';
import copilotStudioLogo from './assets/Copilot Studio.svg';
import logoUrl from './assets/Neuralbi logo.svg';
import videoMaster from './assets/video.mp4';
import video2 from './assets/Video 2.mp4';
import video3 from './assets/0627 (2).mp4';
import './index.css';
import Grainient from './Grainient';
import GradientBlinds from './GradientBlinds';
import FloatingLines from './FloatingLines';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SuiHeroTitle = ({ text }) => {
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
      <h1 className="sui-hero-text blur-layer">
        {text}
      </h1>
      <h1 className="sui-hero-text sharp-layer">
        {text}
      </h1>
    </div>
  );
};

export default function App() {
  const [activeHero, setActiveHero] = useState('sui_fork');

  const contentMap = {
    spline1: {
      eyebrow: "// THE AI-NATIVE BI CONSULTANCY",
      h1: "Make your data think.",
      sub: "We architect high-performance Business Intelligence, Power Platform, and AI ecosystems. Turn static data into a living, cognitive asset for your enterprise.",
      cta: <>Book a Call <span style={{ color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', transition: 'all 0.5s' }}>↵</span></>,
      align: "center",
      textAlign: "center",
      btnClass: "btn-raycast btn-radius-8", // Solid Tool/Software look
      h1Font: "var(--font-serif)", // Elegant serif look
      h1Class: "", // Standard white
      h1Color: "#ffffff"
    },
    cinematic: {
      eyebrow: "// ENTERPRISE DATA ARCHITECTURE",
      h1: "Intelligence, Architected.",
      sub: "Zero-trust AI deployments and enterprise BI systems built in days, not months. We build the cognitive infrastructure that powers modern facilities.",
      cta: <>Book a Call <span style={{ color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', transition: 'all 0.5s' }}>↵</span></>,
      align: "center",
      textAlign: "center",
      btnClass: "btn-glow-border",
      h1Font: "var(--font-ui)", // Clean tech look
      h1Class: "", // Soft glowing white
      h1Color: "#f4f4f5"
    },
    modern_v2: {
      eyebrow: "// NEXT-GEN DATA INFRASTRUCTURE",
      h1: "Cognition, Delivered.",
      sub: "We engineer autonomous intelligence into your business operations. A living, breathing ecosystem built on zero-trust AI and Power Platform architecture.",
      cta: <>Book a Call <span style={{ color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', transition: 'all 0.5s' }}>↵</span></>,
      align: "center",
      textAlign: "center",
      btnClass: "btn-glow-border",
      h1Font: "var(--font-display)", // Absolut logo font
      h1Class: "text-gradient-premium", // Metallic brutal gradient
      h1Color: "transparent"
    },
    tech_v4: {
      eyebrow: "// DATA NEURAL NETWORKS",
      h1: "Beyond Analytics.",
      sub: "We synthesize structured intelligence from your chaotic data streams. Scalable, autonomous, and beautiful.",
      cta: <>Book a Call <span style={{ color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', transition: 'all 0.5s' }}>↵</span></>,
      align: "center",
      textAlign: "center",
      btnClass: "btn-glow-border",
      h1Font: "var(--font-tech)", // Space Grotesk
      h1Class: "text-gradient-accent", // White to Lime gradient
      h1Color: "transparent"
    },
    sui_fork: {
      eyebrow: "DATA & AI",
      h1: "Intelligence, Architected.",
      sub: "Zero-trust AI deployments and enterprise BI systems built in days, not months. We build the cognitive infrastructure that powers modern facilities.",
      align: "center",
      textAlign: "center",
      cta: (
        <>
          Get Started
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
              <path d="M5.30933 3.26746L6.84508 3.2675L7.92617 5.7266L6.39041 5.72656L5.30933 3.26746Z" fill="currentColor"></path>
              <path d="M10.5417 12.5849L9.00599 12.5849L7.92491 10.1258L9.46066 10.1258L10.5417 12.5849Z" fill="currentColor"></path>
              <path d="M5.30933 12.5849L6.84508 12.5849L7.92617 10.1258L6.39041 10.1258L5.30933 12.5849Z" fill="currentColor"></path>
              <path d="M3.26929 5.30914L3.26933 6.8449L5.72843 7.92598L5.72839 6.39023L3.26929 5.30914Z" fill="currentColor"></path>
            </svg>
          </div>
        </>
      ),
      align: "center",
      textAlign: "center",
      btnClass: "sui-btn",
      h1Font: "var(--font-ui)", // Clean grotesque look
      h1Class: "", // Solid white
      h1Color: "#ffffff"
    }
  };

  const currentContent = contentMap[activeHero] || contentMap.cinematic;

  const renderBackground = () => {
    switch (activeHero) {
      case 'spline1':
        return (
          <Suspense fallback={<div className="bg-fallback" />}>
            <Spline scene="/scene-clean.splinecode" style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />
          </Suspense>
        );
      case 'cinematic':
        return <video autoPlay loop muted playsInline src={videoMaster} className="bg-video" />;
      case 'modern_v2':
        return (
          <div style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: 'none' }}>
            <GradientBlinds
              gradientColors={['#445e00', '#c6ff34']}
              angle={33}
              noise={0.55}
              blindCount={12}
              blindMinWidth={60}
              spotlightRadius={0.18}
              spotlightSoftness={1}
              spotlightOpacity={1}
              mouseDampening={0.15}
              distortAmount={0}
              shineDirection="left"
              mixBlendMode="lighten"
            />
          </div>
        );
      case 'tech_v4':
        return (
          <div style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: 'none' }}>
            <FloatingLines
              enabledWaves={['top', 'middle', 'bottom']}
              lineCount={11}
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
      case 'sui_fork':
        return (
          <div style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: 'none' }}>
            <Grainient
              color1="#000000"
              color2="#c6ff34"
              color3="#000000"
              timeSpeed={0.25}
              colorBalance={0.0}
              warpStrength={1.0}
              warpFrequency={5.0}
              warpSpeed={2.0}
              warpAmplitude={50.0}
              blendAngle={0.0}
              blendSoftness={0.05}
              rotationAmount={500.0}
              noiseScale={2.0}
              grainAmount={0.1}
              grainScale={2.0}
              grainAnimated={false}
              contrast={1.5}
              gamma={1.0}
              saturation={1.0}
              centerX={0.0}
              centerY={0.0}
              zoom={0.9}
            />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)', backgroundColor: 'var(--color-paper)' }}>
      {/* Universal Nav (Raycast Glass Panel) */}
      <nav className="nav-n5 glass-raycast" style={{ border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
          <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px' }} />
        </div>

        <div className="nav-n5-links">
          <a href="#services" className="nav-n5-link" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Services</a>
          <a href="#platform" className="nav-n5-link" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Platform</a>
          <a href="#about" className="nav-n5-link" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>About Us</a>
        </div>

        <button className="btn-raycast btn-radius-8" style={{ padding: '0.375rem 1.2rem', fontSize: '0.875rem', fontFamily: 'var(--font-display)' }}>
          Get Quote
        </button>
      </nav>

      <main>
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--color-paper)',
          overflow: 'hidden'
        }}>

          {/* Universal Background Layer */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            {renderBackground()}
            <style>{`.bg-fallback { position: absolute; inset: 0; background-color: var(--color-paper); } .bg-video { width: 100%; height: 100%; object-fit: cover; }`}</style>
          </div>

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

          {/* Text Content Block */}
          <div style={{
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
            alignItems: currentContent.align
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
              {activeHero === 'sui_fork' ? (
                <SuiHeroTitle text={currentContent.h1} />
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
                <button className={currentContent.btnClass} style={{
                  fontFamily: 'var(--font-button)',
                  fontSize: '1.125rem'
                }}>
                  {currentContent.cta}
                </button>
              </div>
            </div>
          </div>          {/* Smooth Fade to Background to avoid image cutoffs */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '25vh',
            background: activeHero === 'sui_fork' ? 'transparent' : `linear-gradient(to bottom, transparent, ${activeHero === 'tech_v4' ? '#030303' :
              (activeHero === 'modern_v2' || activeHero === 'spline1') ? '#020202' : '#000000'
              })`,
            zIndex: 10,
            pointerEvents: 'none'
          }} />
        </section>

        {/* Unified Continuous Background Wrapper for Content Sections */}
        <div style={{ position: 'relative' }}>
          {/* Sticky Background Layer */}
          <div className={
            activeHero === 'tech_v4' ? 'bg-fallback' :
              activeHero === 'modern_v2' ? 'bg-fallback' :
                activeHero === 'spline1' ? 'bg-nebula-glow' :
                  activeHero === 'sui_fork' ? 'bg-fallback' :
                    'bg-shift-cinematic'
          } style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none'
          }} />

          {/* Content Layer (Transparent) */}
          <div style={{ position: 'relative', zIndex: 10, marginTop: '-100vh' }}>
            <Manifesto activeHero={activeHero} />
            <Arsenal activeHero={activeHero} />
            <Industries activeHero={activeHero} />
            <Impact activeHero={activeHero} />
            <Methodology activeHero={activeHero} />
            <FooterCTA activeHero={activeHero} />
          </div>
        </div>

        {/* Global Iteration Switcher */}
        <SwitcherUI activeHero={activeHero} setActiveHero={setActiveHero} />
      </main>
    </div>
  );
}

// Extracted Switcher Component for the Iteration Lab
function SwitcherUI({ activeHero, setActiveHero }) {
  const btnStyle = (id) => ({
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: activeHero === id ? '#000' : '#fff',
    background: activeHero === id ? 'var(--color-accent)' : 'transparent',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    whiteSpace: 'nowrap'
  });

  return (
    <div className="glass-raycast" style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px',
      borderRadius: '10px',
      border: 'none',
      maxWidth: '90vw',
      overflowX: 'auto',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }}>
      <button onClick={() => setActiveHero('spline1')} style={btnStyle('spline1')}>Nebula (Interactive)</button>
      <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
      <button onClick={() => setActiveHero('cinematic')} style={btnStyle('cinematic')}>Cinematic (Master)</button>
      <button onClick={() => setActiveHero('modern_v2')} style={btnStyle('modern_v2')}>Video 2 (Modern)</button>
      <button onClick={() => setActiveHero('tech_v4')} style={btnStyle('tech_v4')}>Video 0627 (Tech)</button>
      <button onClick={() => setActiveHero('sui_fork')} style={btnStyle('sui_fork')}>Sui.io (v5)</button>
    </div>
  );
}

// =========================================================
// Bento Box: The Arsenal (Solutions)
// Four premium treatments, one per hero iteration.
// =========================================================

const arsenalData = [
  {
    id: "power-bi",
    tool: "Power BI",
    title: "Cognitive Analytics.",
    body: "Transform dormant databases into real-time, interactive visual models. See the absolute truth behind your numbers instantly, with zero latency.",
    logo: powerBiLogo,
    type: "large" // spans more space
  },
  {
    id: "power-apps",
    tool: "Power Apps",
    title: "Custom Engineering.",
    body: "Tailor-made applications built flawlessly. From field operations to executive suites, we digitize your most complex workflows securely.",
    logo: powerAppsLogo,
    type: "medium"
  },
  {
    id: "power-automate",
    tool: "Power Automate",
    title: "Silent Orchestration.",
    body: "Connect APIs and sync databases. We engineer invisible neural pathways that automate the mundane and eliminate human error quietly in the background.",
    logo: null, // We'll use an inline SVG for Power Automate
    type: "wide"
  }
];

function Arsenal({ activeHero }) {
  // Each hero gets a completely different Arsenal layout
  switch (activeHero) {
    // ─── NEBULA: Pure glass, organic flowing, minimal ───
    case 'spline1':
      return (
        <section className="bg-nebula-glow" style={{ padding: '6rem 0', position: 'relative', zIndex: 20 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#ffffff', marginBottom: '1rem' }}>
                The Arsenal. Perfectly orchestrated.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
                End-to-end intelligence powered by the Microsoft stack.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}>
              {arsenalData.map((item, index) => (
                <div key={item.id} style={{
                  gridColumn: item.type === 'wide' ? 'span 3' : (item.type === 'large' ? 'span 2' : 'span 1'),
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '24px',
                  padding: '3rem',
                  display: 'flex',
                  flexDirection: item.type === 'wide' ? 'row' : 'column',
                  gap: '2rem',
                  alignItems: item.type === 'wide' ? 'center' : 'flex-start',
                  transition: 'all 0.5s',
                  cursor: 'default',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
                }} className="hover-glass-lift">
                  <div style={{ width: '48px', height: '48px', flexShrink: 0, opacity: 0.8 }}>
                    {item.logo ? <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <PowerAutomateIcon />}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.tool}</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, color: '#ffffff', marginBottom: '1rem' }}>{item.title}</h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`.hover-glass-lift:hover { background: rgba(255,255,255,0.05) !important; transform: translateY(-4px); }`}</style>
        </section>
      );

    // ─── CINEMATIC: Dark, brutalist, grid lines ───
    case 'cinematic':
      return (
        <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
          <div style={{ borderTop: '1px solid #1c1c1e', borderBottom: '1px solid #1c1c1e' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '1rem' }}>
                    The Arsenal.<br />Perfectly orchestrated.
                  </h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', color: '#71717a' }}>
                    End-to-end intelligence powered by the Microsoft stack.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {arsenalData.map((item, i) => (
                    <div key={item.id} style={{
                      display: 'flex',
                      gap: '3rem',
                      padding: '3rem 0',
                      borderTop: i === 0 ? 'none' : '1px solid #1c1c1e',
                      alignItems: 'center'
                    }}>
                      <div style={{ width: '40px', height: '40px', flexShrink: 0, opacity: 0.6, filter: 'grayscale(100%)' }}>
                        {item.logo ? <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <PowerAutomateIcon />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '0.5rem' }}>
                          <span style={{ color: '#52525b', marginRight: '0.75rem', fontWeight: 500 }}>{item.tool} //</span> {item.title}
                        </h3>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: '#a1a1aa', lineHeight: 1.6 }}>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    // ─── MODERN V2: Raycast Glassmorphism Bento Grid ───
    case 'modern_v2':
      return (
        <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
                The Arsenal.<br />Perfectly orchestrated.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto' }}>
                End-to-end intelligence powered by the Microsoft stack.
              </p>
            </div>

            {/* The Bento Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}>
              {arsenalData.map((item) => (
                <div key={item.id} style={{
                  gridColumn: item.type === 'wide' ? 'span 3' : (item.type === 'large' ? 'span 2' : 'span 1'),
                  background: 'rgba(20, 20, 22, 0.6)',
                  backdropFilter: 'blur(32px)',
                  WebkitBackdropFilter: 'blur(32px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '24px',
                  padding: item.type === 'wide' ? '3rem' : '3.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s',
                }} className="raycast-card">
                  {/* Subtle top glow per tool */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '150px',
                    height: '100px',
                    background: 'rgba(198, 255, 52, 0.3)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }} />

                  <div style={{ zIndex: 1, display: 'flex', flexDirection: item.type === 'wide' ? 'row' : 'column', gap: '2rem', alignItems: item.type === 'wide' ? 'center' : 'flex-start' }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '16px',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)'
                    }}>
                      {item.logo ? <img src={item.logo} alt={item.tool} style={{ width: '28px', height: '28px', objectFit: 'contain' }} /> : <PowerAutomateIcon size={28} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {item.tool}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.1 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`.raycast-card:hover { transform: translateY(-4px); box-shadow: 0 32px 64px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15); }`}</style>
        </section>
      );

    // ─── TECH V4 (Video 0627): Smooth Premium Mesh (Glassmorphism) ───
    case 'tech_v4':
      return (
        <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                The Arsenal.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '1rem auto 0' }}>
                End-to-end intelligence powered by the Microsoft stack.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {arsenalData.map((item) => (
                <div key={item.id} style={{
                  gridColumn: item.type === 'wide' ? 'span 3' : (item.type === 'large' ? 'span 2' : 'span 1'),
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  borderRadius: '32px',
                  padding: item.type === 'wide' ? '3rem' : '4rem',
                  display: 'flex',
                  flexDirection: item.type === 'wide' ? 'row' : 'column',
                  gap: '2rem',
                  alignItems: item.type === 'wide' ? 'center' : 'flex-start',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.5s'
                }} className="hover-glass-soft">
                  <div style={{
                    position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '60%',
                    background: 'rgba(198, 255, 52, 0.15)',
                    filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
                  }} />
                  <div style={{ width: '48px', height: '48px', zIndex: 1, filter: 'drop-shadow(0 4px 12px rgba(255,255,255,0.2))' }}>
                    {item.logo ? <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <PowerAutomateIcon color="#fff" />}
                  </div>
                  <div style={{ zIndex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontWeight: 500 }}>
                      {item.tool}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>{item.title}</h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`.hover-glass-soft:hover { transform: translateY(-8px); box-shadow: 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.15) !important; background: rgba(255,255,255,0.04) !important; }`}</style>
        </section>
      );

    case 'sui_fork':
      return (
        <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                The Arsenal
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)' }}>
                End-to-end intelligence powered by the Microsoft stack.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '1.5rem',
            }}>
              {arsenalData.map((item, index) => {
                // Emulate a masonry grid: Wide items span 8/4, standard items span 4.
                let colSpan = item.type === 'wide' ? (index % 2 === 0 ? 'span 8' : 'span 4') : 'span 4';
                // Adjust for mobile via simple inline logic (in a real app, use CSS classes for grid responses)
                return (
                  <div key={item.id} style={{
                    gridColumn: colSpan,
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    position: 'relative'
                  }} className="sui-card-hover">
                    <div style={{ width: '48px', height: '48px', opacity: 0.9 }}>
                      {item.logo ? <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <PowerAutomateIcon color="#c6ff34" />}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#c6ff34', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{item.tool}</div>
                      <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 600, color: '#ffffff', marginBottom: '1rem' }}>{item.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.body}</p>
                    </div>
                    <div style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', color: '#c6ff34' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}

// Simple Inline SVG for Power Automate (Blue flow arrow)
function PowerAutomateIcon({ size = 48, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" fill={color} />
      <path d="M13.5 7H16L12 3L8 7h2.5v7h3V7z" fill="#0078D4" />
      <path d="M10.5 17H8l4 4 4-4h-2.5v-7h-3v7z" fill="#0078D4" />
    </svg>
  );
}

// =========================================================
// Why NeuralBI: The Manifesto Section (Radically Different per Hero)
// =========================================================
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
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
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
      </section>
    );
  }

  // 4. TECH V4 (Video 0627): Smooth Premium Mesh (Glassmorphism)
  return (
    <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: 'uppercase' }}>
            Built for the AI era.<br />Unbound by legacy.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '1.5rem auto 0', lineHeight: 1.6 }}>
            Why modern enterprises choose the NeuralBI blueprint over traditional IT consulting.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {data.map((item) => (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '40px',
              padding: '3.5rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
              transition: 'all 0.5s',
              position: 'relative',
              overflow: 'hidden'
            }} className="hover-glass-soft">
              <div style={{ position: 'absolute', inset: 0, background: item.glow, opacity: 0.5, zIndex: 0, pointerEvents: 'none' }} />
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff',
                marginBottom: '2rem', zIndex: 1, border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: `0 0 20px ${item.glowColor}`
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', zIndex: 1, textTransform: 'uppercase' }}>{item.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, zIndex: 1 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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

  // ─── NEBULA: Floating Horizontal Pills & Big Glass Detail ───
  if (activeHero === 'spline1') {
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
  if (activeHero === 'cinematic') {
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
  if (activeHero === 'modern_v2') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
              Applied intelligence<br />across verticals.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto' }}>
              Tailored architectures for complex industry challenges.
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
  if (activeHero === 'sui_fork') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Applied across verticals
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>

            {/* Sidebar Navigation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
              {industriesData.map((item, index) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(index)}
                    style={{
                      background: isActive ? 'rgba(198, 255, 52, 0.1)' : 'transparent',
                      padding: '1.2rem',
                      borderRadius: '16px',
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
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: isActive ? 600 : 400 }}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail Pane */}
            <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '24px', padding: '4rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: '#c6ff34', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }} />

              <div key={currentIndustry.id} className="animate-blur-reveal" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '16px', background: 'rgba(198,255,52,0.1)', color: '#c6ff34', width: 'fit-content', border: '1px solid rgba(198,255,52,0.2)' }}>
                  <div style={{ transform: 'scale(1.5)' }}>{currentIndustry.icon}</div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '2.5rem', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {currentIndustry.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '600px' }}>
                  {currentIndustry.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── TECH V4: Smooth Premium Glassmorphism (Video 0627) ───
  return (
    <section style={{ padding: '9rem 0', position: 'relative', zIndex: 20 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Applied intelligence across verticals.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '1rem auto 0' }}>
            Tailored architectures for complex industry challenges.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', padding: '1rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>

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
                    borderRadius: '24px',
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
          <div style={{ position: 'relative', background: 'rgba(0,0,0,0.2)', borderRadius: '32px', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Soft colored glow representing the industry, forced to lime for tech_v4 */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'rgba(198,255,52,1)', filter: 'blur(120px)', opacity: 0.15, zIndex: 0, pointerEvents: 'none' }} />

            <div key={currentIndustry.id} className="animate-blur-reveal" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '24px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', width: 'fit-content', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ transform: 'scale(1.5)' }}>{currentIndustry.icon}</div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase' }}>
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
    { number: "10x", label: "Faster deployment cycles vs. traditional dev." },
    { number: "-85%", label: "Reduction in manual reporting hours." },
    { number: "50M+", label: "Data rows securely orchestrated daily." }
  ];

  if (activeHero === 'spline1') {
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
                    {m.number}
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

  if (activeHero === 'cinematic') {
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
                  {m.number}
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

  if (activeHero === 'modern_v2') {
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

  if (activeHero === 'tech_v4') {
    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
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
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                  METRIC_0{index + 1} // STATUS: ACTIVE
                </div>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(4rem, 6vw, 6.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
                  {m.number}
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
function Methodology({ activeHero }) {
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

  if (activeHero === 'spline1') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, color: '#ffffff', marginBottom: '1.5rem' }}>
              The Neural Protocol.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{
              position: 'absolute',
              left: '32px',
              top: '20px',
              bottom: '20px',
              width: '1px',
              background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
              opacity: 0.3
            }} />

            {phases.map((p, index) => (
              <div key={index} style={{ display: 'flex', gap: '3rem', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.8)',
                  border: '1px solid var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: 'var(--color-accent)',
                  boxShadow: '0 0 20px rgba(198, 255, 52, 0.15)'
                }}>
                  {p.num}
                </div>
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.01)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 400 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '1.1rem' }}>
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

  if (activeHero === 'cinematic') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', marginBottom: '6rem', alignItems: 'end' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                The Neural Protocol.
              </h2>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '550px' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
            {phases.map((p, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 800, color: '#c6ff34' }}>
                  {p.num}
                </span>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', lineHeight: 1.6, fontSize: '1.05rem' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activeHero === 'modern_v2') {
    const [activePhase, setActivePhase] = useState(0);

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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {phases.map((p, index) => {
                const isActive = activePhase === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActivePhase(index)}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '1.5rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 8px 30px rgba(198, 255, 52, 0.05)' : 'none'
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

            <div style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '24px',
              padding: '4rem',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }} className="sui-card-hover">
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '250px', height: '250px', background: '#c6ff34', filter: 'blur(130px)', opacity: 0.08, pointerEvents: 'none' }} />

              <div key={activePhase} className="animate-blur-reveal" style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Protocol Stage {phases[activePhase].num}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 900, color: '#ffffff', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                  {phases[activePhase].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                  {phases[activePhase].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activeHero === 'tech_v4') {
    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              The Neural Protocol.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '1rem auto 0' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative' }}>
            {phases.map((p, index) => (
              <div key={index} style={{ display: 'flex', gap: '3rem', position: 'relative' }}>
                {index < 2 && (
                  <div style={{
                    position: 'absolute',
                    left: '20px',
                    top: '40px',
                    bottom: '-4rem',
                    width: '2px',
                    borderLeft: '2px dashed rgba(198, 255, 52, 0.2)'
                  }} />
                )}

                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  position: 'relative',
                  zIndex: 2
                }}>
                  {p.num}
                </div>

                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    STAGE_0{index + 1} // STATUS: READY
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '1.1rem' }}>
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

  return (
    <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            The Neural Protocol.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', marginTop: '1rem' }}>
            A surgically precise deployment process. Zero guesswork.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {phases.map((p, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative'
            }} className="sui-card-hover">
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '2.5rem', fontWeight: 900, color: '#c6ff34' }}>
                {p.num}
              </span>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9: FOOTER CTA (THE BLACK HOLE) ───
function FooterCTA({ activeHero }) {
  if (activeHero === 'spline1') {
    return (
      <section style={{ padding: '10rem 0', position: 'relative', overflow: 'hidden', zIndex: 10 }}>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'var(--color-accent)', filter: 'blur(180px)', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            You already have the data.
          </h2>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 400, color: 'var(--color-accent)', lineHeight: 1.1, marginBottom: '2.5rem' }}>
            Now, make it think.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.25rem', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto 4rem' }}>
            Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
          </p>
          <button className="btn-raycast btn-radius-8" style={{ fontFamily: 'var(--font-button)', fontSize: '1.25rem', padding: '1rem 3rem' }}>
            Deploy Intelligence
          </button>
        </div>
      </section>
    );
  }

  if (activeHero === 'cinematic') {
    return (
      <section style={{ padding: '12rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            You already have the data.
          </h2>
          <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 900, color: '#c6ff34', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '3rem', textTransform: 'uppercase' }}>
            Now, make it think.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.2rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 4rem' }}>
            Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
          </p>
          <button style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: '1.25rem',
            padding: '1.25rem 3.5rem',
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            borderRadius: '0',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: 'pointer'
          }}>
            Deploy Intelligence
          </button>
        </div>
      </section>
    );
  }

  if (activeHero === 'modern_v2') {
    return (
      <section style={{ padding: '10rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(45px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '32px',
            padding: '6rem 4rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(198, 255, 52, 0.05)'
          }} className="sui-card-hover">
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '350px', height: '350px', background: '#c6ff34', filter: 'blur(140px)', opacity: 0.12, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4.5vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.5rem' }}>
                You already have the data.
              </h2>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4.5vw, 5rem)', fontWeight: 900, color: '#c6ff34', lineHeight: 1.1, marginBottom: '2.5rem' }}>
                Now, make it think.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.65)', fontSize: '1.25rem', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto 4rem' }}>
                Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
              </p>
              <button className="btn-glow-border" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', padding: '1rem 3rem' }}>
                Deploy Intelligence
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activeHero === 'tech_v4') {
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

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            You already have the data.
          </h2>
          <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: '#c6ff34', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '2.5rem', textTransform: 'uppercase' }}>
            Now, make it think.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 4rem' }}>
            Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
          </p>
          <button className="btn-glow-border" style={{
            fontFamily: 'var(--font-tech)',
            fontWeight: 800,
            fontSize: '1.25rem',
            padding: '1rem 3rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Deploy Intelligence
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '10rem 0', position: 'relative', zIndex: 10 }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(198, 255, 52, 0.15) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.5rem' }}>
          You already have the data.
        </h2>
        <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', fontWeight: 700, color: '#c6ff34', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '3rem' }}>
          Now, make it think.
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.25rem', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto 4rem' }}>
          Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
        </p>
        <button className="sui-btn" style={{
          padding: '1.25rem 3.5rem',
          fontSize: '1.25rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-ui)',
          cursor: 'pointer'
        }}>
          Deploy Intelligence
          <div className="sui-btn-icon-wrapper" style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none" className="sui-btn-arrow" style={{ transform: 'scale(1.2)' }}>
              <path d="M10.5417 3.26746L9.00599 3.2675L7.92491 5.7266L9.46066 5.72656L10.5417 3.26746Z" fill="currentColor"></path>
              <path d="M5.30933 3.26746L6.84508 3.2675L7.92617 5.7266L6.39041 5.72656L5.30933 3.26746Z" fill="currentColor"></path>
              <path d="M10.5417 12.5849L9.00599 12.5849L7.92491 10.1258L9.46066 10.1258L10.5417 12.5849Z" fill="currentColor"></path>
              <path d="M5.30933 12.5849L6.84508 12.5849L7.92617 10.1258L6.39041 10.1258L5.30933 12.5849Z" fill="currentColor"></path>
              <path d="M3.26929 5.30914L3.26933 6.8449L5.72843 7.92598L5.72839 6.39023L3.26929 5.30914Z" fill="currentColor"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none" className="sui-btn-arrow" style={{ transform: 'scale(1.2)' }}>
              <path d="M10.5417 3.26746L9.00599 3.2675L7.92491 5.7266L9.46066 5.72656L10.5417 3.26746Z" fill="currentColor"></path>
              <path d="M5.30933 3.26746L6.84508 3.2675L7.92617 5.7266L6.39041 5.72656L5.30933 3.26746Z" fill="currentColor"></path>
              <path d="M10.5417 12.5849L9.00599 12.5849L7.92491 10.1258L9.46066 10.1258L10.5417 12.5849Z" fill="currentColor"></path>
              <path d="M5.30933 12.5849L6.84508 12.5849L7.92617 10.1258L6.39041 10.1258L5.30933 12.5849Z" fill="currentColor"></path>
              <path d="M3.26929 5.30914L3.26933 6.8449L5.72843 7.92598L5.72839 6.39023L3.26929 5.30914Z" fill="currentColor"></path>
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────
// End of File
// ────────────────────────────────────────────────────────

