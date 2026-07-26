'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';

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


// ─── SECTION 10: FAQ (EXTRACTED TO ./sections/Faq.jsx) ───

// ─── SECTION 10: FOOTER (EXTRACTED TO ./sections/Footer.jsx) ───

// ─── SECTION 11: NAVBAR (EXTRACTED TO ./sections/Navbar.jsx) ───

export default memo(CaseStudy);
