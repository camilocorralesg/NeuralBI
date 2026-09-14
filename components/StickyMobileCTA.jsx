'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactSection = document.getElementById('contact') || document.getElementById('audit');
      
      let nearBottom = false;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // Hide when contact section is in viewport to avoid blocking the actual form
        if (rect.top <= window.innerHeight * 0.75) {
          nearBottom = true;
        }
      }

      // Show after scrolling past hero (350px) and hide when already at the contact form
      if (scrollY > 350 && !nearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAudit = () => {
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

  return (
    <div className="mobile-cta-wrapper">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 990,
              padding: '0.75rem 1rem max(0.75rem, env(safe-area-inset-bottom))',
              background: 'rgba(5, 7, 3, 0.88)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderTop: '1px solid rgba(198, 255, 52, 0.2)',
              boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(198, 255, 52, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#c6ff34',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#c6ff34',
                  boxShadow: '0 0 8px #c6ff34'
                }} />
                Live Engineering
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#ffffff'
              }}>
                Ready to transform data?
              </span>
            </div>

            <button
              onClick={scrollToAudit}
              className="btn-glow-border"
              style={{
                padding: '0.6rem 1.15rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                cursor: 'pointer',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              Book Audit
              <span style={{
                color: 'rgba(255, 255, 255, 0.6)',
                marginLeft: '4px',
                paddingLeft: '4px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                lineHeight: 1
              }}>
                ↵
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
