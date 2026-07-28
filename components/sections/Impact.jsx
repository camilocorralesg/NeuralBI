'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import CharacterReveal from '../CharacterReveal';
import TiltCard from '../TiltCard';
import Counter from '../Counter';
import ColorBends from '../ColorBends';



function Impact({ activeHero }) {
  const metrics = [
    { number: "7x", label: "Faster deployment cycles vs. traditional development." },
    { number: "-65%", label: "Reduction in operational costs and manual reporting." },
    { number: "25M+", label: "Data rows orchestrated and centralized daily." }
  ];

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'tech_v4' : activeHero;

  if (isRemix) {
    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
        {/* Full Section Fluid Background */ }
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity: 0.7 }}>
            <ColorBends 
               colors={['#c6ff34', '#8bcc18', '#e3ff80', '#0a0a0a']} 
               speed={0.4} 
               intensity={1.2}
               mouseInfluence={0}
               parallax={0}
               style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            opacity: 0.5,
            pointerEvents: 'none',
            zIndex: 1
          }} />
        </div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}>
          
          {/* Raycast-style Card Container */}
          <div style={{ 
            background: 'rgba(8, 10, 12, 0.65)', 
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}>
            
            {/* Left Column (Text) */}
            <div style={{ padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1, position: 'relative' }}>
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
              <p style={{ marginTop: '1.5rem', fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '90%' }}>
                Transform your architecture with intelligent orchestration. Unparalleled speed, absolute precision, and radical efficiency.
              </p>
            </div>
            
            {/* Right Column (Metrics) */}
            <div style={{ padding: '4rem 4rem 4rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem', zIndex: 1, position: 'relative' }}>
              {metrics.map((m, index) => (
                <TiltCard key={index} className="sui-card-hover" style={{
                  borderRadius: '16px',
                  padding: '2rem 3rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  background: 'linear-gradient(135deg, rgba(20, 25, 30, 0.6) 0%, rgba(10, 12, 15, 0.8) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  borderLeft: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.4s ease',
                  width: '100%'
                }}>
                  <div style={{ width: '100%', flexShrink: 0 }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                      color: '#ffffff',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      textShadow: '0 0 40px rgba(255, 255, 255, 0.4)'
                    }}>
                      <Counter value={m.number} />
                    </span>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.5,
                    marginTop: '0.5rem',
                    maxWidth: '85%'
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

export default memo(Impact);
