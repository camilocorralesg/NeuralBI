'use client';

import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../Magnetic';

const logoUrl = '/assets/Neuralbi logo.svg';

// ─── SECTION 11: PREMIUM STYLE-SPECIFIC NAVBARS (SUI, RAYCAST & NEBULA DNA) ───
function Navbar({ activeHero }) {
  const [hoveredLink, setHoveredLink] = React.useState(null);
  const [hoveredIdx, setHoveredIdx] = React.useState(null);
  const [isNavHovered, setIsNavHovered] = React.useState(false);
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

  // 5. REMIX / SUI FORK NAVBAR: Un-invasive Hero Header + Scroll Morphing Glass Pill Dock
  const isCapsule = scrolled;
  const showLinks = !scrolled || isNavHovered;
  const showCta = scrolled && isNavHovered;

  return (
    <div style={{
      position: 'fixed',
      top: isCapsule ? '1.5rem' : '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: isCapsule ? 'auto' : '100%',
      maxWidth: '1200px',
      zIndex: 1000,
      pointerEvents: 'auto',
      transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <nav
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCapsule ? 'space-between' : 'flex-start',
          height: isCapsule ? '54px' : '80px',
          padding: isCapsule
            ? (showLinks ? '0 1.25rem 0 1.5rem' : '0 1.25rem')
            : '0 2rem',
          background: isCapsule
            ? (isNavHovered ? 'rgba(10, 14, 24, 0.65)' : 'rgba(255, 255, 255, 0.04)')
            : 'transparent',
          border: isCapsule
            ? (isNavHovered ? '1px solid rgba(198, 255, 52, 0.4)' : '1px solid rgba(255, 255, 255, 0.16)')
            : '1px solid transparent',
          borderRadius: isCapsule ? '9999px' : '0px',
          backdropFilter: isCapsule ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isCapsule ? 'blur(24px) saturate(180%)' : 'none',
          boxShadow: isCapsule
            ? (isNavHovered
              ? '0 20px 48px rgba(0, 0, 0, 0.8), 0 0 24px rgba(198, 255, 52, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
              : '0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)')
            : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          gap: isCapsule ? (showLinks ? '2rem' : '0rem') : '0rem'
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Magnetic range={30} actionScale={0.15}>
            <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', display: 'block', cursor: 'pointer' }} />
          </Magnetic>
        </div>

        {/* Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isCapsule ? '2rem' : '3rem',
          margin: isCapsule ? '0' : '0 auto',
          maxWidth: showLinks ? '650px' : '0px',
          opacity: showLinks ? 1 : 0,
          overflow: 'hidden',
          pointerEvents: showLinks ? 'auto' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          whiteSpace: 'nowrap'
        }}>
          {navLinks.map((link, idx) => (
            <Magnetic key={idx} range={40} actionScale={0.2}>
              <a
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: hoveredLink === link.label ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'inline-block',
                  padding: '0.25rem 0'
                }}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="navbar-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
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

        {/* CTA Button (Hidden on Hero, Unfolds when Scrolled + Hovered) */}
        <div style={{
          maxWidth: showCta ? '200px' : '0px',
          opacity: showCta ? 1 : 0,
          overflow: 'hidden',
          pointerEvents: showCta ? 'auto' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          whiteSpace: 'nowrap',
          display: isCapsule ? 'block' : 'none'
        }}>
          <Magnetic range={60} actionScale={0.2}>
            <button
              className="btn-glow-border"
              style={{
                padding: '0.45rem 1.25rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                borderRadius: '9999px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Book a Call <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '6px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', paddingLeft: '6px', height: '12px', lineHeight: 1 }}>↗</span>
            </button>
          </Magnetic>
        </div>
      </nav>
    </div>
  );

}

export default memo(Navbar);
