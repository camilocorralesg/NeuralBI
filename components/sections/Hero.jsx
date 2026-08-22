'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingLines from '../FloatingLines';
import Magnetic from '../Magnetic';
import SuiHeroTitle from '../SuiHeroTitle';

function Hero({ activeHero = 'remix' }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.92]);
  const bgY = useTransform(scrollY, [0, 700], [0, -120]);
  const bgScale = useTransform(scrollY, [0, 700], [1, 1.12]);

  const currentContent = {
    h1: <>Intelligence<br />That Executes</>,
    sub: "We engineer enterprise data architectures, pro/low-code apps, and autonomous AI agents. We transform complex data into beautiful, actionable business intelligence.",
    cta: <>Book a Technical Audit <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', height: '14px', lineHeight: 1, transition: 'all 0.5s' }}>↵</span></>,
    align: "center",
    textAlign: "center",
    btnClass: "btn-glow-border",
    h1Font: "var(--font-display)",
    h1Class: "",
    h1Color: "#ffffff"
  };

  const scrollToAudit = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('audit') || document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const firstInput = el.querySelector('input');
      if (firstInput) {
        setTimeout(() => {
          firstInput.focus({ preventScroll: true });
        }, 600);
      }
    }
  };

  const renderBackground = () => (
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

  return (
    <section style={{
      position: 'relative',
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'var(--color-paper)',
      overflow: 'hidden'
    }}>
      <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, y: bgY, scale: bgScale, willChange: 'transform' }}>
        {renderBackground()}
        <style>{`.bg-fallback { position: absolute; inset: 0; background-color: var(--color-paper); } .bg-video { width: 100%; height: 100%; object-fit: cover; }`}</style>
      </motion.div>

      <div className="grain-overlay" />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

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
        <div style={{
          maxWidth: '850px',
          pointerEvents: 'auto',
          textAlign: currentContent.textAlign,
          display: 'flex',
          flexDirection: 'column',
          alignItems: currentContent.align
        }}>
          <SuiHeroTitle text={currentContent.h1} font={currentContent.h1Font} />

          <p className="animate-blur-reveal delay-200" style={{
            fontFamily: 'var(--font-sans)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 'clamp(0.85rem, 1.5vw, 1.25rem)',
            fontWeight: 400,
            marginBottom: 'var(--space-12)',
            lineHeight: 1.6,
            maxWidth: '650px',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)'
          }}>
            {currentContent.sub}
          </p>

          <div className="animate-blur-reveal delay-300" style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <Magnetic>
              <button
                onClick={scrollToAudit}
                aria-label="Book a Technical Audit"
                className={currentContent.btnClass}
                style={{
                  fontFamily: 'var(--font-button)',
                  fontSize: 'clamp(0.8rem, 1.5vw, 1.125rem)',
                  cursor: 'pointer'
                }}
              >
                {currentContent.cta}
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.div>

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
  );

}

export default memo(Hero);
