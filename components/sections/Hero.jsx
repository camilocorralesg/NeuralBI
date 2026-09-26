'use client';

import React, { memo, useEffect, useState } from 'react';
import { cubicBezier, motion, useScroll, useTransform } from 'framer-motion';
import FloatingLines from '../FloatingLines';
import ShaderButton from '../ShaderButton';
import SuiHeroTitle from '../SuiHeroTitle';
import { useLanguage } from '../../context/LanguageContext';
import { scrollToTarget } from '../../lib/smoothScroll';
import useReducedMotionSafe from '../useReducedMotionSafe';

// --ease-in-out: the copy holds, then leaves decisively, instead of fading from the first pixel of scroll.
const EXIT = cubicBezier(0.77, 0, 0.175, 1);

function Hero({ activeHero: _activeHero = 'remix' }) {
  const { t } = useLanguage();
  const heroCopy = t?.hero || {};

  // The parallax stays linear so the layers feel attached to the scroll; the fade and the recede carry the curve.
  // Small screens get half the depth (a phone held in the hand should not feel the page slide); reduced motion keeps
  // only the fade. Both are known after mount, so the server's render and hydration agree.
  const reduced = useReducedMotionSafe();
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const media = window.matchMedia?.('(max-width: 768px)');
    if (!media) return undefined;
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  const depth = reduced ? 0 : compact ? 0.5 : 1;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180 * depth]);
  const heroOpacity = useTransform(scrollY, [0, 520], [1, 0], { ease: EXIT });
  const heroScale = useTransform(scrollY, [0, 700], [1, 1 - 0.08 * depth], { ease: EXIT });
  const bgY = useTransform(scrollY, [0, 700], [0, -120 * depth]);
  const bgScale = useTransform(scrollY, [0, 700], [1, 1 + 0.12 * depth]);

  const currentContent = {
    lines: [
      { text: heroCopy.h1Line1 || 'Intelligence' },
      { text: heroCopy.h1Line2 || 'That Executes', em: true }
    ],
    sub: heroCopy.sub || "We engineer enterprise data architectures, pro/low-code apps, and autonomous AI agents. We transform complex data into beautiful, actionable business intelligence.",
    cta: <>{heroCopy.cta || 'Book an Architecture Audit'} <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', height: '14px', lineHeight: 1 }}>↵</span></>,
    align: "center",
    textAlign: "center",
    h1Font: "var(--font-display)",
    h1Class: "",
    h1Color: "#ffffff"
  };

  const scrollToAudit = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('audit') || document.getElementById('contact');
    if (el) {
      scrollToTarget(el);
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

      <motion.div
        className="hero-content-wrapper"
        style={{
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
        }}
      >
        <div style={{
          maxWidth: '850px',
          pointerEvents: 'auto',
          textAlign: currentContent.textAlign,
          display: 'flex',
          flexDirection: 'column',
          alignItems: currentContent.align
        }}>
          <SuiHeroTitle lines={currentContent.lines} font={currentContent.h1Font} />

          {/* After the two headline lines (120 and 210 ms): the copy, then the action, one block step apart. */}
          <p className="hero-sub enter" style={{
            '--enter': 3,
            fontFamily: 'var(--font-body)',
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

          <div className="enter" style={{
            '--enter': 4,
            display: 'flex',
            gap: '1rem'
          }}>
            <ShaderButton
              type="button"
              onClick={scrollToAudit}
              aria-label={heroCopy.cta || "Book an Architecture Audit"}
              style={{
                padding: '1rem 2.5rem',
                fontFamily: 'var(--font-button)',
                fontSize: 'clamp(0.8rem, 1.5vw, 1.125rem)'
              }}
            >
              {currentContent.cta}
            </ShaderButton>
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
