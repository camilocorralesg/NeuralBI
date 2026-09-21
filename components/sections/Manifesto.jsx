'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import CharacterReveal from '../CharacterReveal';
import TiltCard from '../TiltCard';
import { AiNativeGraphic, WarpSpeedGraphic, ZeroFrictionGraphic } from '../graphics/BlueprintGraphics';

function Manifesto({ activeHero }) {
  const data = [
    {
      id: "ai-native",
      title: "Results-Driven Autonomous AI",
      body: "Deploy Copilot Studio agents grounded in your internal databases. Automate complex operational logic—from invoice reconciliation to dynamic supplier routing—without exposing data to public LLMs.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      ),
      glow: "radial-gradient(circle at 50% 0%, rgba(198, 255, 52, 0.12) 0%, rgba(198, 255, 52, 0) 70%)",
      glowColor: "rgba(198, 255, 52, 0.3)",
      accentColor: "#c6ff34",
      graphic: (hovered) => <AiNativeGraphic hovered={hovered} />
    },
    {
      id: "warp-speed",
      title: "Delivered in Weeks, Not Quarters",
      body: "Stop waiting months for critical software. We combine Microsoft Power Platform foundations with pro-code React components to put functional, high-impact systems in production in weeks.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      glow: "radial-gradient(circle at 50% 0%, rgba(198, 255, 52, 0.14) 0%, rgba(198, 255, 52, 0) 70%)",
      glowColor: "rgba(198, 255, 52, 0.3)",
      accentColor: "#c6ff34",
      graphic: (hovered) => <WarpSpeedGraphic hovered={hovered} />
    },
    {
      id: "zero-friction",
      title: "Guaranteed Team Adoption",
      body: "Enterprise power shouldn't mean clunky interfaces. We design custom app experiences with consumer-grade UX, ensuring immediate operational uptake and zero training friction.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      ),
      glow: "radial-gradient(circle at 50% 0%, rgba(198, 255, 52, 0.12) 0%, rgba(198, 255, 52, 0) 70%)",
      glowColor: "rgba(198, 255, 52, 0.3)",
      accentColor: "#c6ff34",
      graphic: (hovered) => <ZeroFrictionGraphic hovered={hovered} />
    }
  ];

  const isRemix = activeHero === 'remix';

  // ── Render 4 completely different architectural structures per activeHero ──

  // 1. NEBULA (spline1): Editorial, Asymmetric, pure glass, organic flowing curves.
  if (activeHero === 'spline1') {
    return (
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem', alignItems: 'end' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 400, lineHeight: 1.1 }}>
              The New Enterprise Blueprint.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', lineHeight: 1.6, maxWidth: '480px' }}>
              Why modern enterprises choose the NeuralBI blueprint over traditional IT consulting.
            </p>
          </div>

          <div className="grid-3-col">
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
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              The New Enterprise Blueprint.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Why forward-thinking companies choose NeuralBI over rigid, legacy IT consulting.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.05 }}>
              The New Enterprise Blueprint.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Why forward-thinking companies choose NeuralBI over rigid, legacy IT consulting.
            </p>
          </div>

          <div className="grid-3-col">
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
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform, opacity', padding: 'clamp(4rem, 8vw, 8rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(1.75rem, 3vw, 3rem)', fontWeight: 600, color: '#ffffff' }}>
              The New Enterprise Blueprint.
            </h2>
          </div>
          <div className="grid-3-col">
            {data.map((item) => (
              <div key={item.id} style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(30px)',
                borderRadius: '24px',
                padding: '2.5rem 1.5rem',
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity', padding: 'clamp(4rem, 8vw, 9rem) 0', position: 'relative', zIndex: 10 }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 6rem)' }}>
          <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0 }}>
            <CharacterReveal
              text="The New Enterprise Blueprint."
              className="text-gradient-premium"
              style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: isRemix ? 'none' : 'uppercase', textAlign: 'center' }}
            />
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '600px', margin: '1.5rem auto 0', lineHeight: 1.6, padding: '0 1rem', textAlign: 'center' }}>
            <CharacterReveal text="Why forward-thinking companies choose NeuralBI over rigid, legacy IT consulting." stagger={0.01} />
          </p>
        </div>

        <motion.div style={{ willChange: 'transform, opacity' }}
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
          viewport={{ once: true, amount: 0.05 }}
          className="grid-3-col"
        >
          {data.map((item, index) => (
            <ManifestoTiltCard key={item.id} item={item} isRemix={isRemix} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function ManifestoTiltCard({ item, isRemix, index = 0 }) {
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(max-width: 768px)');
    let timeout;
    let interval;

    const runMobileAnimation = () => {
      timeout = setTimeout(() => {
        setHovered(true);
        interval = setInterval(() => {
          setHovered(prev => !prev);
        }, 2000);
      }, index * 1000);
    };

    const handleMatch = (e) => {
      if (e.matches) {
        runMobileAnimation();
      } else {
        clearTimeout(timeout);
        clearInterval(interval);
        setHovered(false);
      }
    };

    handleMatch(mql);
    mql.addEventListener('change', handleMatch);
    
    return () => {
      mql.removeEventListener('change', handleMatch);
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [index]);

  return (
    <TiltCard
      className="hover-glass-soft"
      style={{
        background: hovered
          ? 'radial-gradient(ellipse at 50% 0%, rgba(198, 255, 52, 0.08) 0%, rgba(12, 16, 26, 0.94) 55%, rgba(4, 6, 10, 0.98) 100%)'
          : 'radial-gradient(ellipse at 50% 0%, rgba(198, 255, 52, 0.04) 0%, rgba(10, 13, 20, 0.88) 55%, rgba(3, 5, 8, 0.96) 100%)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderRadius: isRemix ? '16px' : '32px',
        padding: 'clamp(1.5rem, 4vw, 2.25rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        minHeight: 'clamp(380px, 50vh, 610px)',
        border: hovered ? '1px solid rgba(198, 255, 52, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: hovered
          ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 30px 70px rgba(0, 0, 0, 0.85), 0 0 45px rgba(198, 255, 52, 0.12)'
          : 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 14px 45px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer' }}
      />

      {/* Refined Ambient Radial Glow Backdrop */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(198, 255, 52, 0.12) 0%, rgba(198, 255, 52, 0.02) 45%, transparent 70%)',
        filter: 'blur(70px)',
        opacity: hovered ? 1 : 0.65,
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease',
        zIndex: 0
      }} />

      {/* Top Header Area (Icon, Title, Body) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 1 }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'rgba(198, 255, 52, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c6ff34',
          marginBottom: '1.5rem',
          border: '1px solid rgba(198, 255, 52, 0.3)',
          boxShadow: hovered ? '0 0 25px rgba(198, 255, 52, 0.35)' : '0 8px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.4s ease'
        }}>
          {item.icon}
        </div>

        {/* Fixed Height Slot for Title for 100% Horizontal Alignment */}
        <div style={{ minHeight: '5.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '0.75rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, letterSpacing: '-0.02em', margin: 0 }}>
            <CharacterReveal text={item.title} stagger={0.015} />
          </h3>
        </div>

        {/* Fixed Height Slot for Description Body + Generous Spacing to Match Card 3's Height */}
        <div style={{ minHeight: '9.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.6, margin: 0 }}>
            <CharacterReveal text={item.body} stagger={0.005} />
          </p>
        </div>
      </div>

      {/* Bottom Animation Graphic Area (Locked to Bottom for 100% Horizontal Alignment) */}
      <div style={{
        width: '100%',
        height: '190px',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '18px',
        marginTop: 'auto',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
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

export default memo(Manifesto);
