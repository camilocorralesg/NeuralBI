'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ShaderButton from './ShaderButton';
import { scrollToTarget } from '../lib/smoothScroll';

export default function StickyMobileCTA() {
  const { t } = useLanguage();
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
      scrollToTarget(el);
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
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.25
              }}>
                {t.stickyCta?.question || 'Ready to transform data?'}
              </span>
            </div>

            <ShaderButton
              type="button"
              onClick={scrollToAudit}
              style={{
                padding: '0.65rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 700
              }}
            >
              {t.stickyCta?.cta || 'Book Audit'}
              <span style={{
                color: 'rgba(255, 255, 255, 0.6)',
                marginLeft: '4px',
                paddingLeft: '4px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                lineHeight: 1
              }}>
                ↵
              </span>
            </ShaderButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
