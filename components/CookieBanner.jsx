'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem('neuralbi_cookie_consent');
      if (!consent) {
        // Show after a subtle 1s delay for optimal first impression
        const timer = setTimeout(() => setIsOpen(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access restricted (e.g. private mode)
    }
  }, []);

  const handleConsent = (level) => {
    try {
      localStorage.setItem('neuralbi_cookie_consent', level);
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            zIndex: 900,
            maxWidth: '440px',
            width: 'calc(100vw - 3rem)',
            background: 'rgba(5, 7, 3, 0.92)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(198, 255, 52, 0.25)',
            borderRadius: '16px',
            padding: '1.25rem 1.35rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(198, 255, 52, 0.08)',
            fontFamily: 'var(--font-sans)',
            color: '#ffffff'
          }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#c6ff34',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#c6ff34',
                boxShadow: '0 0 8px #c6ff34'
              }} />
              Privacy & Telemetry
            </div>

            <button
              onClick={() => handleConsent('essential')}
              aria-label="Close cookie banner"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                lineHeight: 1,
                padding: '0.2rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              &times;
            </button>
          </div>

          <p style={{
            fontSize: '0.85rem',
            lineHeight: 1.55,
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '0 0 1.15rem 0'
          }}>
            We deploy privacy-preserving telemetry to optimize our enterprise architecture services. No cross-site ad tracking. Review our{' '}
            <Link
              href="/privacy"
              style={{
                color: '#c6ff34',
                textDecoration: 'underline',
                textUnderlineOffset: '3px'
              }}
            >
              Privacy Policy
            </Link>.
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleConsent('accepted')}
              className="btn-glow-border"
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                cursor: 'pointer',
                borderRadius: '9999px',
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              Accept All
            </button>

            <button
              onClick={() => handleConsent('essential')}
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(255, 255, 255, 0.7)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                cursor: 'pointer',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              Essential Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
