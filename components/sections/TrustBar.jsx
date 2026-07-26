'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';

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

export default memo(TrustBar);
