'use client';

import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ShaderButton from '../ShaderButton';
import LanguageSelector from '../LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { lockScroll, scrollToTarget, unlockScroll } from '../../lib/smoothScroll';
import ns from './Navbar.module.css';

const logoUrl = '/NeuralBI/assets/Neuralbi logo.svg';

// One face of a rolling label: its letters, each carrying its index for the 12 ms stagger.
function RollFace({ text }) {
  return (
    <span className={ns.face}>
      {[...text].map((char, index) => (
        <span key={index} className={ns.char} style={{ '--i': index }}>{char === ' ' ? '\u00a0' : char}</span>
      ))}
    </span>
  );
}

const round = (value) => Number(value.toFixed(2));

/**
 * Reading progress traced on the capsule's own outline: two Volt strokes leave the bottom centre, climb round both ends
 * and meet at the top centre as the page ends. The shape is measured (the capsule changes width on hover); the progress
 * is a CSS scroll-driven animation where the browser has one, and a passive scroll listener (one write per frame)
 * where it does not.
 */
function CapsuleOutline() {
  const svg = React.useRef(null);
  React.useEffect(() => {
    const element = svg.current;
    if (!element) return undefined;
    const paths = [...element.querySelectorAll('path')];
    const [right, left] = paths;
    const shape = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      // The 1.5px stroke is centred on the capsule's edge, over its 1px border.
      const inset = 0.75;
      const w = width - inset * 2;
      const h = height - inset * 2;
      const r = round(h / 2);
      const mid = round(inset + w / 2);
      const bottom = round(inset + h);
      const top = inset;
      const end = round(inset + w - h / 2);
      const start = round(inset + h / 2);
      right.setAttribute('d', `M${mid} ${bottom}H${end}A${r} ${r} 0 0 0 ${end} ${top}H${mid}`);
      left.setAttribute('d', `M${mid} ${bottom}H${start}A${r} ${r} 0 0 1 ${start} ${top}H${mid}`);
    };
    shape();
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(shape);
    resize?.observe(element);

    let frame = 0;
    let onScroll = null;
    if (!window.CSS?.supports?.('animation-timeline: scroll()')) {
      const paint = () => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const read = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        paths.forEach((path) => { path.style.strokeDashoffset = String(round(1 - read)); });
      };
      onScroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
      paint();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      resize?.disconnect();
      if (onScroll) window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <svg ref={svg} className={ns.outline} aria-hidden="true" focusable="false">
      <path pathLength="1" />
      <path pathLength="1" />
    </svg>
  );
}

// ─── SECTION 11: PREMIUM STYLE-SPECIFIC NAVBARS (SUI, RAYCAST & NEBULA DNA) ───
function Navbar() {
  const { t } = useLanguage();
  const nav = t?.nav || {};

  const [isNavHovered, setIsNavHovered] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const menuButtonRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  const menuWasOpen = React.useRef(false);
  // The portal target exists only in the browser; the server's render and hydration carry no menu.
  const [portalReady, setPortalReady] = React.useState(false);
  React.useEffect(() => { setPortalReady(true); }, []);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      menuWasOpen.current = true;
      closeButtonRef.current?.focus({ preventScroll: true });
    } else if (menuWasOpen.current) {
      menuWasOpen.current = false;
      menuButtonRef.current?.focus({ preventScroll: true });
    }
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lockScroll();
    } else {
      document.body.style.overflow = 'unset';
      unlockScroll();
    }
    return () => { document.body.style.overflow = 'unset'; unlockScroll(); };
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = 8;

      if (currentScrollY <= 80) {
        setScrolled(false);
        setIsVisible(true);
      } else {
        setScrolled(true);
        if (currentScrollY > lastScrollY.current + delta) {
          // Scrolling down: hide floating capsule
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current - delta) {
          // Scrolling up: reveal floating capsule
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: nav.manifesto || 'Manifesto', href: '#manifesto' },
    { label: nav.arsenal || 'Arsenal', href: '#arsenal' },
    { label: nav.integrations || 'Integrations', href: '#integrations' },
    { label: nav.verticals || 'Verticals', href: '#verticals' },
    { label: nav.protocol || 'Protocol', href: '#protocol' }
  ];

  const scrollToAudit = (e) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
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


  // 5. REMIX / SUI FORK NAVBAR: Un-invasive Hero Header + Scroll Morphing Glass Pill Dock
  const isCapsule = scrolled;
  const showLinks = !scrolled || isNavHovered;
  const showCta = scrolled && isNavHovered;
  const isDockHidden = isCapsule && !isVisible && !isNavHovered && !isMobileMenuOpen;

  return (
    <div
      data-testid="navbar-wrapper"
      data-dock-hidden={isDockHidden ? "true" : "false"}
      style={{
        position: 'fixed',
        top: isCapsule ? '1.5rem' : '0',
        left: '50%',
        transform: `translateX(-50%) ${isDockHidden ? 'translateY(-150%)' : 'translateY(0)'}`,
        opacity: isDockHidden ? 0 : 1,
        pointerEvents: isDockHidden ? 'none' : 'auto',
        width: isCapsule ? 'auto' : '100%',
        maxWidth: '1200px',
        zIndex: 1000,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, top 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
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
            ? (isNavHovered ? '1px solid rgba(255, 255, 255, 0.24)' : '1px solid rgba(255, 255, 255, 0.12)')
            : '1px solid transparent',
          borderRadius: isCapsule ? '9999px' : '0px',
          backdropFilter: isCapsule ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isCapsule ? 'blur(24px) saturate(180%)' : 'none',
          boxShadow: isCapsule
            ? (isNavHovered
              ? '0 20px 48px rgba(0, 0, 0, 0.8), 0 0 28px rgba(198, 255, 52, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.22)'
              : '0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)')
            : 'none',
          transition: 'height 0.35s var(--ease-out), padding 0.35s var(--ease-out), gap 0.35s var(--ease-out), border-radius 0.35s var(--ease-out), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.35s var(--ease-out)',
          gap: isCapsule ? (showLinks ? '2rem' : '0rem') : '0rem',
          position: 'relative'
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', display: 'block', cursor: 'pointer' }} />
        </div>

        {/* Links */}
        <div className={`desktop-only ${ns.links}`} style={{ display: "flex", alignItems: "center", gap: isCapsule ? "2rem" : "3rem",
          margin: isCapsule ? '0' : '0 auto',
          maxWidth: showLinks ? '650px' : '0px',
          opacity: showLinks ? 1 : 0,
          overflow: 'hidden',
          pointerEvents: showLinks ? 'auto' : 'none',
          transition: 'max-width 0.35s var(--ease-out), opacity 0.2s ease, gap 0.35s var(--ease-out), margin 0.35s var(--ease-out)',
          whiteSpace: 'nowrap'
        }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={ns.link}>
              <span className={ns.srOnly}>{link.label}</span>
              <span className={ns.roll} aria-hidden="true">
                <RollFace text={link.label} />
                <RollFace text={link.label} />
              </span>
            </a>
          ))}
        </div>

        {/* Desktop Controls: Language Selector + CTA Button */}
        <div data-testid="nav-desktop-controls" className="desktop-only" style={{
          display: 'flex',
          alignItems: 'center',
          gap: isCapsule ? (showCta ? '0.75rem' : '0rem') : '0.75rem',
          flexShrink: 0,
          maxWidth: showLinks ? '350px' : '0px',
          opacity: showLinks ? 1 : 0,
          overflow: showLinks ? 'visible' : 'hidden',
          pointerEvents: showLinks ? 'auto' : 'none',
          transition: 'max-width 0.35s var(--ease-out), opacity 0.2s ease, gap 0.35s var(--ease-out)',
          whiteSpace: 'nowrap'
        }}>
          <LanguageSelector />
          <div style={{ maxWidth: showCta ? "200px" : "0px",
            opacity: showCta ? 1 : 0,
            overflow: 'hidden',
            pointerEvents: showCta ? 'auto' : 'none',
            transition: 'max-width 0.35s var(--ease-out), opacity 0.2s ease',
            whiteSpace: 'nowrap',
            display: isCapsule ? 'block' : 'none'
          }}>
            <ShaderButton
              type="button"
              onClick={scrollToAudit}
              aria-label={nav.bookAudit || "Book an Architecture Audit"}
              style={{
                padding: '0.5rem 1.3rem',
                fontSize: '0.85rem',
                fontWeight: 700
              }}
            >
              {nav.bookAudit || 'Book Audit'} <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--span-color, rgba(255,255,255,0.5))', marginLeft: '6px', borderLeft: '1px solid var(--span-border, rgba(255,255,255,0.2))', paddingLeft: '6px', height: '12px', lineHeight: 1 }}>↗</span>
            </ShaderButton>
          </div>
        </div>
      
        {isCapsule && <CapsuleOutline />}

        {/* Mobile Hamburger Menu */}
        <div className="mobile-only" style={{ display: 'none', alignItems: 'center' }}>
          <button
            ref={menuButtonRef}
            type="button"
            className={ns.menuButton}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={nav.openMenu || "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu: an editorial index of the page. Each label rises out of its own mask, 45 ms after the one above;
          the language and the call to action sit at the bottom, within reach of the thumb. It is portalled to <body>:
          the navbar's wrapper is transformed, and a transformed ancestor would pin a fixed overlay to the capsule
          instead of the screen. */}
      {portalReady && createPortal(<AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={ns.menu}
            role="dialog"
            aria-modal="true"
            aria-label={nav.menuLabel || 'Navigation'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
            onKeyDown={(event) => { if (event.key === 'Escape') setIsMobileMenuOpen(false); }}
          >
            <div className={ns.menuHead}>
              <img src={logoUrl} alt="NeuralBI Logo" className={ns.menuLogo} />
              <button
                ref={closeButtonRef}
                type="button"
                className={ns.menuClose}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={nav.closeMenu || "Close navigation menu"}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>

            <nav className={ns.menuNav} aria-label={nav.menuLabel || 'Navigation'}>
              <ol className={ns.menuList}>
                {navLinks.map((link, index) => (
                  <li key={link.href} className={ns.menuItem} style={{ '--i': index }}>
                    <a href={link.href} className={ns.menuLink} onClick={() => setIsMobileMenuOpen(false)}>
                      <span className={ns.menuIndex} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <span className={ns.menuLabel}>{link.label}</span>
                      <svg className={ns.menuArrow} viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={ns.menuFoot} style={{ '--i': navLinks.length }}>
              <LanguageSelector variant="segmented" className={ns.menuLanguage} />
              <ShaderButton
                type="button"
                onClick={scrollToAudit}
                aria-label={nav.bookCall || "Book a Call"}
                className={ns.menuCta}
              >
                {nav.bookCall || 'Book a Call'}
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </ShaderButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}

    </div>
  );
}

export default memo(Navbar);
