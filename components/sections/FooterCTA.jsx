'use client';
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import CharacterReveal from '../CharacterReveal';
import Magnetic from '../Magnetic';

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: 'center',
        padding: '2.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        willChange: 'transform, opacity'
      }}
    >
      {/* Precision Checkmark Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198, 255, 52, 0.18) 0%, rgba(198, 255, 52, 0.04) 70%)',
          border: '1px solid rgba(198, 255, 52, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 35px rgba(198, 255, 52, 0.25)',
          color: '#c6ff34'
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M20 6L9 17L4 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          Ball is in our court.
        </h3>

        <p style={{
          fontFamily: 'var(--font-sans)',
          color: 'rgba(255, 255, 255, 0.65)',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          lineHeight: 1.6,
          maxWidth: '460px',
          margin: '0 auto'
        }}>
          We got your message and we’re on it. Someone from the team will review the details and reach out shortly to talk next steps.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="btn-glow-border"
        style={{
          marginTop: '1rem',
          padding: '0.85rem 2.25rem',
          fontSize: '0.95rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          cursor: 'pointer',
          borderRadius: '9999px',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        Send another inquiry
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--span-color, rgba(255, 255, 255, 0.5))',
            marginLeft: '8px',
            paddingLeft: '8px',
            borderLeft: '1px solid var(--span-border, rgba(255, 255, 255, 0.2))',
            height: '14px',
            lineHeight: 1,
            transition: 'all 0.4s ease'
          }}
        >
          ↵
        </span>
      </button>
    </motion.div>
  );
}

function FooterCTA({ activeHero }) {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const isEmailValid = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const isFormValid = formData.name.trim() !== '' && isEmailValid(formData.email) && formData.message.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
    setErrorMessage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'sui_fork' : activeHero;

  // Render unified Action Button matching Hero aesthetics
  const renderSubmitButton = () => (
    <div style={{ width: '100%' }}>
      {errorMessage && (
        <div style={{ color: '#ff4d4f', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', textAlign: 'center' }}>
          {errorMessage}
        </div>
      )}
      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`btn-glow-border ${isFormValid ? 'btn-active-ready' : ''}`}
        style={{
          width: '100%',
          padding: '0.95rem 1.75rem',
          fontSize: '1rem',
          fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)',
          fontWeight: 700,
          cursor: !isFormValid ? 'not-allowed' : isSubmitting ? 'wait' : 'pointer',
          opacity: (!isFormValid || isSubmitting) ? 0.7 : 1,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease'
        }}
      >
        {isSubmitting ? (
          <span>Transmitting...</span>
        ) : (
          <>
            Book a Technical Audit
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isFormValid ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                marginLeft: '8px',
                paddingLeft: '8px',
                borderLeft: isFormValid ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.15)',
                height: '14px',
                lineHeight: 1,
                transition: 'all 0.4s ease'
              }}
            >
              ↵
            </span>
          </>
        )}
      </button>
    </div>
  );

  // 1. NEBULA (spline1) - Elegant Glass & Organic Curves
  if (displayHero === 'spline1') {
    return (
      <section id="audit" style={{ padding: 'clamp(4rem, 7vw, 9rem) 0', position: 'relative', overflow: 'hidden', zIndex: 10 }}>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'var(--color-accent)', filter: 'blur(180px)', opacity: 0.08, zIndex: 0, pointerEvents: 'none' }} />

        <div className="footer-cta-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <div className="footer-cta-text-col">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.15rem, 5vw, 4rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.15, marginBottom: '1.25rem' }}>
              You already have the data.<br />
              <span style={{ color: 'var(--color-accent)' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: 1.65, maxWidth: '480px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div className="footer-cta-form-card" style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
            {submitted ? (
              <SuccessState onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="name-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Name</label>
                  <input id="name-spline" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label htmlFor="email-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Email</label>
                  <input id="email-spline" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label htmlFor="msg-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                  <textarea id="msg-spline" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                {renderSubmitButton()}
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 2. CINEMATIC - Brutalist, Raw Contrast, Split Grid
  if (displayHero === 'cinematic') {
    return (
      <section id="audit" style={{ padding: 'clamp(4rem, 7vw, 9rem) 0', position: 'relative', zIndex: 10, background: '#000' }}>
        <div className="footer-cta-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="footer-cta-text-col">
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.15rem, 5vw, 4.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1.05, textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              You already have the data.<br />
              <span style={{ color: '#c6ff34' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: 1.6, maxWidth: '500px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div className="footer-cta-form-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '0px' }}>
            {submitted ? (
              <SuccessState onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="name-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Name</label>
                  <input id="name-cinematic" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                <div>
                  <label htmlFor="email-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Email</label>
                  <input id="email-cinematic" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                <div>
                  <label htmlFor="msg-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                  <textarea id="msg-cinematic" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none', resize: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                {renderSubmitButton()}
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 3. MODERN V2 - Glassmorphic Card Split Layout
  if (displayHero === 'modern_v2') {
    return (
      <section id="audit" style={{ padding: 'clamp(4rem, 7vw, 9rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="footer-cta-card-box" style={{
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(45px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(198, 255, 52, 0.05)'
          }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '350px', height: '350px', background: '#c6ff34', filter: 'blur(140px)', opacity: 0.08, pointerEvents: 'none' }} />

            <div className="footer-cta-text-col" style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.15rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                You already have the data.
              </h2>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.15rem, 5vw, 4rem)', fontWeight: 900, color: '#c6ff34', lineHeight: 1.1, marginBottom: '1.75rem' }}>
                Now, make it think.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: 1.65, maxWidth: '480px' }}>
                Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
              </p>
            </div>

            <div className="footer-cta-form-card" style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              {submitted ? (
                <SuccessState onReset={handleReset} />
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label htmlFor="name-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Name</label>
                    <input id="name-modern" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label htmlFor="email-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Email</label>
                    <input id="email-modern" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label htmlFor="msg-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                    <textarea id="msg-modern" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  {renderSubmitButton()}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. TECH V4 - Command Terminal Inputs
  if (displayHero === 'tech_v4') {
    return (
      <section id="audit" style={{ padding: 'clamp(4rem, 7vw, 9rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          opacity: 0.5, pointerEvents: 'none'
        }} />

        <div className="footer-cta-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <div className="footer-cta-text-col">
            <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem', textTransform: 'uppercase' }}>
              You already have the data.<br />
              <span style={{ color: '#c6ff34' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.6, maxWidth: '480px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div className="footer-cta-form-card" style={{ border: '1px solid rgba(198,255,52,0.3)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', background: '#050505', position: 'relative', borderRadius: isRemix ? '12px' : '0px' }}>
            <div style={{ position: 'absolute', top: '2px', left: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', top: '2px', right: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', bottom: '2px', left: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', bottom: '2px', right: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>

            {submitted ? (
              <SuccessState onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="footer-cta-tech-row" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px dashed rgba(198,255,52,0.2)', paddingBottom: '0.5rem' }}>
                  <label htmlFor="name-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', width: '90px' }}>[NAME]:</label>
                  <input id="name-tech" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required style={{ flex: 1, width: '100%', background: 'transparent', border: 'none', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div className="footer-cta-tech-row" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px dashed rgba(198,255,52,0.2)', paddingBottom: '0.5rem' }}>
                  <label htmlFor="email-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', width: '90px' }}>[EMAIL]:</label>
                  <input id="email-tech" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required style={{ flex: 1, width: '100%', background: 'transparent', border: 'none', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="msg-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34' }}>[DISCOVERY_GOAL]:</label>
                  <textarea id="msg-tech" name="message" value={formData.message} onChange={handleChange} rows="2" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(198,255,52,0.2)', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', padding: '0.5rem', fontSize: '1rem', outline: 'none', resize: 'none', borderRadius: isRemix ? '6px' : '0px' }} />
                </div>
                {renderSubmitButton()}
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 5. SUI FORK (Default / Remix) - Brutalist Premium Dark Split Layout
  return (
    <section id="audit" style={{ padding: 'clamp(4rem, 7vw, 9rem) 0', position: 'relative', zIndex: 10 }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(198, 255, 52, 0.12) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="footer-cta-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <div className="footer-cta-text-col">
          <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: 'clamp(2.15rem, 5vw, 4.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            <CharacterReveal text="You already have the data." />
            <CharacterReveal text="Now, make it think." className="text-accent" style={{ color: '#c6ff34' }} />
          </h2>
          <CharacterReveal
            text="Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today."
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: 1.65, maxWidth: '480px' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="footer-cta-form-card"
          style={{ willChange: 'transform, opacity', background: 'rgba(255, 255, 255, 0.01)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: isRemix ? '12px' : '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}
        >
          {submitted ? (
            <SuccessState onReset={handleReset} />
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label htmlFor="name-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Name</label>
                <input id="name-sui" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <div>
                <label htmlFor="email-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Email</label>
                <input id="email-sui" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <div>
                <label htmlFor="msg-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                <textarea id="msg-sui" name="message" value={formData.message} onChange={handleChange} required rows="3" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <Magnetic range={120} actionScale={0.08}>
                {renderSubmitButton()}
              </Magnetic>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(FooterCTA);

