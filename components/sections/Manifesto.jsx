'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import CharacterReveal from '../CharacterReveal';
import TiltCard from '../TiltCard';

function Manifesto({ activeHero }) {
  const data = [
    {
      id: "ai-native",
      title: "Results-Driven Autonomous AI",
      body: "We deploy AI agents that directly impact your bottom line. Cognitive automation engineered for processes that require true reasoning, not just automated clicks.",
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
      body: "Stop waiting months for critical software. We combine Power Platform architecture with rapid framework iteration to put functional, high-impact systems in production fast.",
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
      body: "Enterprise power shouldn't mean clunky interfaces. We design custom app experiences with high UX standards, ensuring immediate operational uptake and zero training friction.",
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
      <section style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '5rem', alignItems: 'end' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, lineHeight: 1.1 }}>
              The New Enterprise Blueprint.
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
              The New Enterprise Blueprint.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Why forward-thinking companies choose NeuralBI over rigid, legacy IT consulting.
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
              The New Enterprise Blueprint.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Why forward-thinking companies choose NeuralBI over rigid, legacy IT consulting.
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
              The New Enterprise Blueprint.
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
              text="The New Enterprise Blueprint."
              className="text-gradient-premium"
              style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: isRemix ? 'none' : 'uppercase' }}
            />
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '1.5rem auto 0', lineHeight: 1.6 }}>
            <CharacterReveal text="Why forward-thinking companies choose NeuralBI over rigid, legacy IT consulting." stagger={0.01} />
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
        background: hovered
          ? 'radial-gradient(ellipse at 50% 0%, rgba(198, 255, 52, 0.08) 0%, rgba(12, 16, 26, 0.94) 55%, rgba(4, 6, 10, 0.98) 100%)'
          : 'radial-gradient(ellipse at 50% 0%, rgba(198, 255, 52, 0.04) 0%, rgba(10, 13, 20, 0.88) 55%, rgba(3, 5, 8, 0.96) 100%)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderRadius: isRemix ? '16px' : '32px',
        padding: '2.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        minHeight: '610px',
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

// ────────────────────────────────────────────────────────
// High-Fidelity SVG/CSS Graphics for Modern V2 (Matches Spotify/Arc/TinyPNG styles)
// ────────────────────────────────────────────────────────

// AI-Native Graphic: Autonomous data reasoning flow with ROI transformation on hover
function AiNativeGraphic({ hovered }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <svg width="240" height="150" viewBox="0 0 240 150">
        <defs>
          <radialGradient id="node-glow-base" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="node-glow-roi" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c6ff34" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c6ff34" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c6ff34" stopOpacity="1" />
          </linearGradient>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Neural Grid */}
        <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
          <line x1="20" y1="30" x2="220" y2="30" />
          <line x1="20" y1="75" x2="220" y2="75" />
          <line x1="20" y1="120" x2="220" y2="120" />
        </g>

        {/* Connection Paths */}
        <g fill="none" strokeWidth="2">
          {/* Static Background Lines */}
          <path d="M 35 45 Q 85 75 120 75" stroke="rgba(99, 102, 241, 0.25)" />
          <path d="M 35 105 Q 85 75 120 75" stroke="rgba(99, 102, 241, 0.25)" />
          <path d="M 120 75 Q 165 75 195 75" stroke="rgba(99, 102, 241, 0.25)" />

          {/* Animated Data Stream Lines on Hover */}
          <path
            d="M 35 45 Q 85 75 120 75"
            stroke={hovered ? "url(#stream-gradient)" : "transparent"}
            strokeDasharray="6 8"
            style={{
              strokeDashoffset: hovered ? -60 : 0,
              transition: 'stroke-dashoffset 1.5s linear infinite, stroke 0.4s ease',
              filter: hovered ? 'url(#neon-glow)' : 'none'
            }}
          />
          <path
            d="M 35 105 Q 85 75 120 75"
            stroke={hovered ? "url(#stream-gradient)" : "transparent"}
            strokeDasharray="6 8"
            style={{
              strokeDashoffset: hovered ? -60 : 0,
              transition: 'stroke-dashoffset 1.5s linear infinite, stroke 0.4s ease',
              filter: hovered ? 'url(#neon-glow)' : 'none'
            }}
          />
          <path
            d="M 120 75 Q 165 75 195 75"
            stroke={hovered ? "#c6ff34" : "transparent"}
            strokeDasharray="8 6"
            style={{
              strokeDashoffset: hovered ? -60 : 0,
              transition: 'stroke-dashoffset 1.2s linear infinite, stroke 0.4s ease',
              filter: hovered ? 'url(#neon-glow)' : 'none'
            }}
          />
        </g>

        {/* Ambient Glows behind Nodes */}
        <circle cx="35" cy="45" r="18" fill="url(#node-glow-base)" opacity={hovered ? 0.4 : 0.2} />
        <circle cx="35" cy="105" r="18" fill="url(#node-glow-base)" opacity={hovered ? 0.4 : 0.2} />
        <circle cx="120" cy="75" r="28" fill="url(#node-glow-base)" opacity={hovered ? 0.9 : 0.3} />
        <circle cx="195" cy="75" r="30" fill={hovered ? "url(#node-glow-roi)" : "url(#node-glow-base)"} opacity={hovered ? 1 : 0.2} style={{ transition: 'all 0.5s ease' }} />

        {/* Outer Node Rings */}
        <circle cx="35" cy="45" r="6" fill="#0c0d12" stroke="#6366f1" strokeWidth="1.5" />
        <circle cx="35" cy="105" r="6" fill="#0c0d12" stroke="#6366f1" strokeWidth="1.5" />

        {/* Central Core Reasoning Node */}
        <g style={{ transformOrigin: '120px 75px', transform: hovered ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.4s ease' }}>
          <circle cx="120" cy="75" r="10" fill="#0d0e15" stroke={hovered ? "#818cf8" : "#6366f1"} strokeWidth="2" />
          <circle cx="120" cy="75" r="4" fill={hovered ? "#c6ff34" : "#6366f1"} style={{ transition: 'fill 0.4s ease' }} />
        </g>

        {/* Final Output Node (Transforms to $ Growth Icon on Hover) */}
        <g style={{ transformOrigin: '195px 75px', transform: hovered ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <circle cx="195" cy="75" r="14" fill={hovered ? "#162306" : "#0d0e15"} stroke={hovered ? "#c6ff34" : "#6366f1"} strokeWidth={hovered ? "2.5" : "1.5"} style={{ transition: 'all 0.4s ease' }} />
          {hovered ? (
            <text x="195" y="80" textAnchor="middle" fill="#c6ff34" fontSize="13" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 0 4px #c6ff34)' }}>
              $
            </text>
          ) : (
            <circle cx="195" cy="75" r="5" fill="#6366f1" />
          )}
        </g>

        {/* Particle Light Dots Flowing on Hover */}
        {hovered && (
          <>
            <circle cx="35" cy="45" r="3" fill="#c6ff34" style={{ filter: 'url(#neon-glow)' }}>
              <animate attributeName="cx" values="35;80;120" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="45;65;75" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0.8" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="35" cy="105" r="3" fill="#c6ff34" style={{ filter: 'url(#neon-glow)' }}>
              <animate attributeName="cx" values="35;80;120" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="105;85;75" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0.8" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="120" cy="75" r="4" fill="#c6ff34" style={{ filter: 'url(#neon-glow)' }}>
              <animate attributeName="cx" values="120;160;195" dur="0.9s" begin="0.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;1;0" dur="0.9s" begin="0.2s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>

      {/* Floating Tag Overlays */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Base State Tag: copilot-init (Displaces up and fades out on hover) */}
        <div style={{
          position: 'absolute',
          top: '20px',
          background: 'rgba(15, 17, 26, 0.85)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '8px',
          padding: '5px 10px',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          opacity: hovered ? 0 : 1,
          transform: hovered ? 'translateY(-14px) scale(0.95)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <span style={{ color: '#818cf8', fontWeight: 'bold' }}>&gt; copilot-init</span>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>AI-Native Schema Loaded</div>
        </div>

        {/* Hover State Tag: Direct Impact ROI Generated (Slides up & fades in) */}
        <div style={{
          position: 'absolute',
          top: '20px',
          background: 'rgba(15, 26, 10, 0.9)',
          border: '1px solid rgba(198, 255, 52, 0.4)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 6px 20px rgba(198, 255, 52, 0.15), 0 0 1px rgba(198, 255, 52, 0.5)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#c6ff34', fontWeight: 'bold' }}>&gt; autonomous-impact</span>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#c6ff34', boxShadow: '0 0 6px #c6ff34' }} />
          </div>
          <div style={{ fontSize: '8px', color: '#c6ff34', fontWeight: '600', marginTop: '2px', letterSpacing: '0.02em' }}>
            +45% ROI / Autonomous Flow Active
          </div>
        </div>
      </div>
    </div>
  );
}

// Warp-Speed Graphic: The Time-Compressor Grid (Weeks vs Quarters Time-Warp & Lens Flare)
function WarpSpeedGraphic({ hovered }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <svg width="240" height="150" viewBox="0 0 240 150">
        <defs>
          <radialGradient id="warp-glow-base" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c6ff34" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c6ff34" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flare-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#c6ff34" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c6ff34" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="speed-trail" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(198, 255, 52, 0)" />
            <stop offset="50%" stopColor="rgba(198, 255, 52, 0.3)" />
            <stop offset="100%" stopColor="rgba(198, 255, 52, 0.9)" />
          </linearGradient>
          <filter id="speed-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={hovered ? "3" : "0.5"} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Grid Lines */}
        <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
          <line x1="20" y1="35" x2="220" y2="35" />
          <line x1="20" y1="70" x2="220" y2="70" />
          <line x1="20" y1="105" x2="220" y2="105" />
        </g>

        {/* Time Quarters / Weeks Columns (Contracting Spatial Warp on Hover) */}
        <g style={{ transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {/* Quarter / Week Labels & Dividers */}
          {[
            { label: hovered ? "WK 1" : "Q1", xBase: 65, xWarp: 45 },
            { label: hovered ? "WK 2" : "Q2", xBase: 110, xWarp: 80 },
            { label: hovered ? "WK 3" : "Q3", xBase: 155, xWarp: 115 },
            { label: hovered ? "DEPLOYED" : "Q4", xBase: 200, xWarp: 180 }
          ].map((col, i) => {
            const x = hovered ? col.xWarp : col.xBase;
            return (
              <g key={i} style={{ transform: `translateX(${x - col.xBase}px)`, transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <line x1={col.xBase} y1="30" x2={col.xBase} y2="110" stroke={hovered && i === 3 ? "rgba(198, 255, 52, 0.4)" : "rgba(255,255,255,0.06)"} strokeDasharray={hovered ? "none" : "3 3"} />
                <text
                  x={col.xBase}
                  y="124"
                  fill={hovered && i === 3 ? "#c6ff34" : "rgba(255,255,255,0.4)"}
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fontWeight={hovered && i === 3 ? "bold" : "normal"}
                >
                  {col.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* Slow Progress Fill (Base) / Velocity Area (Hover) */}
        <path
          d={hovered
            ? "M 20 110 C 60 110, 100 75, 180 25 L 180 110 Z"
            : "M 20 110 L 65 105 L 200 105 L 200 110 Z"
          }
          fill="url(#speed-trail)"
          style={{ transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        {/* Speed Curve Stroke with Motion Blur & Acceleration */}
        <path
          d={hovered
            ? "M 20 110 C 60 110, 100 75, 180 25"
            : "M 20 110 L 65 105 L 200 105"
          }
          fill="none"
          stroke={hovered ? "#c6ff34" : "rgba(255,255,255,0.3)"}
          strokeWidth={hovered ? "3.5" : "2"}
          style={{
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: hovered ? 'url(#speed-blur)' : 'none'
          }}
        />

        {/* Dynamic Speed Particles along the line on Hover */}
        {hovered && (
          <>
            <circle cx="20" cy="110" r="3.5" fill="#ffffff" style={{ filter: 'url(#speed-blur)' }}>
              <animate attributeName="cx" values="20;100;180" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="cy" values="110;75;25" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0.9" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Lens Flare & Burst at Deployment Peak (Hover State) */}
        {hovered ? (
          <g transform="translate(180, 25)" style={{ transformOrigin: '180px 25px' }}>
            {/* Ambient Flare Glow */}
            <circle cx="0" cy="0" r="30" fill="url(#warp-glow-base)" opacity="0.9">
              <animate attributeName="r" values="25;34;25" dur="1.5s" repeatCount="indefinite" />
            </circle>

            {/* Radiant Lens Flare Rays */}
            <g stroke="#c6ff34" strokeWidth="1.5" opacity="0.8">
              <line x1="-18" y1="0" x2="18" y2="0" />
              <line x1="0" y1="-18" x2="0" y2="18" />
              <line x1="-12" y1="-12" x2="12" y2="12" />
              <line x1="-12" y1="12" x2="12" y2="-12" />
            </g>

            {/* Core Lens Flare Starburst */}
            <circle cx="0" cy="0" r="8" fill="url(#flare-core)" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        ) : (
          /* Slow Base Progress Node */
          <circle cx="65" cy="105" r="4" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        )}
      </svg>

      {/* Floating Tag Overlays */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Base State Tag: Legacy Quarters */}
        <div style={{
          position: 'absolute',
          top: '18px',
          background: 'rgba(15, 17, 26, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '8px',
          padding: '5px 10px',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          opacity: hovered ? 0 : 1,
          transform: hovered ? 'translateY(-14px) scale(0.95)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 'bold' }}>&gt; timeline: legacy_quarters</span>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>9-Month Delivery Horizon / High Friction</div>
        </div>

        {/* Hover State Tag: Time To Value Accelerated */}
        <div style={{
          position: 'absolute',
          top: '18px',
          background: 'rgba(15, 26, 10, 0.92)',
          border: '1px solid rgba(198, 255, 52, 0.4)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 6px 20px rgba(198, 255, 52, 0.2), 0 0 1px rgba(198, 255, 52, 0.5)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#c6ff34', fontWeight: 'bold' }}>&gt; time-to-value: accelerated</span>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#c6ff34', boxShadow: '0 0 6px #c6ff34' }} />
          </div>
          <div style={{ fontSize: '8px', color: '#c6ff34', fontWeight: '600', marginTop: '2px', letterSpacing: '0.02em' }}>
            3-Week Production Release / Zero Latency
          </div>
        </div>
      </div>
    </div>
  );
}

// Zero-Friction Graphic: Modular Component Assembly with Magnetic Grid Snap & Ambient Glow
function ZeroFrictionGraphic({ hovered }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Blueprint Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: hovered ? 0.25 : 0.1,
        backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        transition: 'opacity 0.6s ease'
      }} />

      {/* Ambient Lighting Backdrop Glow on Hover */}
      <div style={{
        position: 'absolute',
        width: '180px',
        height: '110px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, rgba(198, 255, 52, 0.1) 50%, transparent 80%)',
        filter: 'blur(30px)',
        opacity: hovered ? 1 : 0.2,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none'
      }} />

      {/* Main Assembly Viewport */}
      <div style={{
        position: 'relative',
        width: '210px',
        height: '125px',
        background: 'rgba(10, 14, 23, 0.7)',
        borderRadius: '16px',
        border: hovered ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.8), 0 0 20px rgba(14, 165, 233, 0.15)' : '0 8px 30px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(16px)',
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '8px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>

        {/* Component 1: KPI Metric Block (Top-Left) */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '10px',
          border: hovered ? '1px solid rgba(198, 255, 52, 0.4)' : '1px solid rgba(255,255,255,0.06)',
          padding: '8px 10px',
          boxShadow: hovered ? '0 4px 14px rgba(198,255,52,0.1)' : 'none',
          transform: hovered ? 'translate(0, 0) rotate(0deg)' : 'translate(-10px, -12px) rotate(-4deg)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{ fontSize: '7px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: '3px' }}>OPERATIONAL_EFFICIENCY</div>
          <div style={{ fontSize: '12px', fontWeight: '800', fontFamily: 'var(--font-sans)', color: hovered ? '#c6ff34' : '#ffffff', transition: 'color 0.4s ease' }}>
            +98.4%
          </div>
          <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
            <div style={{ width: hovered ? '92%' : '40%', height: '100%', background: '#c6ff34', transition: 'width 0.8s ease' }} />
          </div>
        </div>

        {/* Component 2: Sparkline Data Module (Top-Right) */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '10px',
          border: hovered ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255,255,255,0.06)',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transform: hovered ? 'translate(0, 0) rotate(0deg)' : 'translate(12px, -8px) rotate(3deg)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '22px' }}>
            {[40, 65, 50, 85, 100].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: hovered ? `${h}%` : `${h * 0.5}%`,
                  background: hovered ? (i === 4 ? '#c6ff34' : '#38bdf8') : 'rgba(255,255,255,0.2)',
                  borderRadius: '2px',
                  transition: 'all 0.5s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Component 3: Data Table Stream (Bottom-Left) */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '10px',
          border: hovered ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255,255,255,0.06)',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          transform: hovered ? 'translate(0, 0) rotate(0deg)' : 'translate(-8px, 10px) rotate(3deg)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{ width: '70%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
          <div style={{ width: '90%', height: '4px', background: hovered ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
          <div style={{ width: '50%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
        </div>

        {/* Component 4: Action Button & Status Pill (Bottom-Right) */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '10px',
          border: hovered ? '1px solid rgba(198, 255, 52, 0.4)' : '1px solid rgba(255,255,255,0.06)',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: hovered ? 'translate(0, 0) rotate(0deg)' : 'translate(10px, 12px) rotate(-4deg)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{
            background: hovered ? '#c6ff34' : 'rgba(255,255,255,0.1)',
            color: hovered ? '#000000' : 'rgba(255,255,255,0.5)',
            fontSize: '8px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            padding: '4px 10px',
            borderRadius: '6px',
            transition: 'all 0.4s ease',
            boxShadow: hovered ? '0 2px 10px rgba(198,255,52,0.3)' : 'none'
          }}>
            {hovered ? "SYNCED" : "UNBOUND"}
          </div>
        </div>
      </div>

      {/* Floating Tag Overlays */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Base State Tag: BI Portal */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          background: 'rgba(15, 17, 26, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '5px 10px',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          opacity: hovered ? 0 : 1,
          transform: hovered ? 'translateY(14px) scale(0.95)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 'bold' }}>&gt; ui-schema: floating</span>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>BI Portal / Unstructured Layout</div>
        </div>

        {/* Hover State Tag: Design System Active */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          background: 'rgba(10, 20, 30, 0.92)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 6px 20px rgba(56, 189, 248, 0.2), 0 0 1px rgba(56, 189, 248, 0.5)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.95)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>&gt; design-system: active</span>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 6px #38bdf8' }} />
          </div>
          <div style={{ fontSize: '8px', color: '#c6ff34', fontWeight: '600', marginTop: '2px', letterSpacing: '0.02em' }}>
            High-Adoption UI / 100% Team Intake
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// Industries: Applied Intelligence (Interactive Side Menu)
// Four premium treatments for switching industries context.
// =========================================================

export default memo(Manifesto);
