'use client';
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import CharacterReveal from '../CharacterReveal';
import Magnetic from '../Magnetic';

function FooterCTA({ activeHero }) {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const isEmailValid = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const isFormValid = formData.name.trim() !== '' && isEmailValid(formData.email) && formData.message.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'sui_fork' : activeHero;

  // 1. NEBULA (spline1) - Elegant Glass & Organic Curves
  if (displayHero === 'spline1') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden', zIndex: 10 }}>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'var(--color-accent)', filter: 'blur(180px)', opacity: 0.08, zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              You already have the data.<br />
              <span style={{ color: 'var(--color-accent)' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '480px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '1rem' }}>Thank you.</h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)' }}>Our architects will reach out shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="name-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Name</label>
                  <input id="name-spline" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label htmlFor="email-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Email</label>
                  <input id="email-spline" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label htmlFor="msg-spline" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                  <textarea id="msg-spline" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <button type="submit" className="btn-raycast btn-radius-8" style={{ fontFamily: 'var(--font-button)', fontSize: '1rem', padding: '0.9rem', width: '100%' }}>
                  Submit Inquiry
                </button>
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
      <section style={{ padding: '10rem 0', position: 'relative', zIndex: 10, background: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1.05, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              You already have the data.<br />
              <span style={{ color: '#c6ff34' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '500px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '3rem', borderRadius: '0px' }}>
            {submitted ? (
              <div style={{ textAlign: 'left', padding: '2rem 0' }}>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '2rem', color: '#fff', textTransform: 'uppercase', marginBottom: '1rem' }}>SUBMISSION RECEIVED</h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a' }}>Our engineering team will connect with you via email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <label htmlFor="name-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Name</label>
                  <input id="name-cinematic" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                <div>
                  <label htmlFor="email-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Email</label>
                  <input id="email-cinematic" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                <div>
                  <label htmlFor="msg-cinematic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                  <textarea id="msg-cinematic" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'transparent', border: '1px solid #333', borderRadius: '0px', padding: '0.8rem 1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none', resize: 'none' }} onFocus={(e) => e.target.style.borderColor = '#fff'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                </div>
                <button type="submit" style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: '1rem', padding: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: '0', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.3s' }}>
                  Deploy Intelligence
                </button>
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
      <section style={{ padding: '10rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(45px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px',
            padding: '5rem 4rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(198, 255, 52, 0.05)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '350px', height: '350px', background: '#c6ff34', filter: 'blur(140px)', opacity: 0.08, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
                You already have the data.
              </h2>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900, color: '#c6ff34', lineHeight: 1.1, marginBottom: '2.5rem' }}>
                Now, make it think.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.65)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '480px' }}>
                Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#fff', marginBottom: '1rem' }}>Lead Captured.</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)' }}>We will reach out to schedule an exploration session.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label htmlFor="name-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Name</label>
                    <input id="name-modern" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label htmlFor="email-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Email</label>
                    <input id="email-modern" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label htmlFor="msg-modern" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                    <textarea id="msg-modern" name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(198,255,52,0.5)'; e.target.style.boxShadow = '0 0 10px rgba(198,255,52,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <button type="submit" className="btn-glow-border" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', padding: '0.9rem', width: '100%' }}>
                    Schedule Discovery
                  </button>
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
      <section style={{ padding: '10rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          opacity: 0.5, pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2rem, 4vw, 4.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem', textTransform: 'uppercase' }}>
              You already have the data.<br />
              <span style={{ color: '#c6ff34' }}>Now, make it think.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '480px' }}>
              Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.
            </p>
          </div>

          <div style={{ border: '1px solid rgba(198,255,52,0.3)', padding: '2.5rem', background: '#050505', position: 'relative', borderRadius: isRemix ? '12px' : '0px' }}>
            <div style={{ position: 'absolute', top: '2px', left: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', top: '2px', right: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', bottom: '2px', left: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>
            <div style={{ position: 'absolute', bottom: '2px', right: '2px', fontSize: '0.5rem', color: '#c6ff34' }}>+</div>

            {submitted ? (
              <div style={{ textAlign: 'left', padding: '2rem 0', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#c6ff34', textTransform: 'uppercase', marginBottom: '1rem' }}>[TRANSMISSION_SUCCESS]</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontFamily: 'var(--font-sans)' }}>Lead packet successfully queued. Ready for sync.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px dashed rgba(198,255,52,0.2)', paddingBottom: '0.5rem' }}>
                  <label htmlFor="name-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', width: '90px' }}>[NAME]:</label>
                  <input id="name-tech" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.95rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px dashed rgba(198,255,52,0.2)', paddingBottom: '0.5rem' }}>
                  <label htmlFor="email-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', width: '90px' }}>[EMAIL]:</label>
                  <input id="email-tech" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.95rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="msg-tech" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34' }}>[DISCOVERY_GOAL]:</label>
                  <textarea id="msg-tech" name="message" value={formData.message} onChange={handleChange} rows="2" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(198,255,52,0.2)', color: '#fff', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', padding: '0.5rem', outline: 'none', resize: 'none', borderRadius: isRemix ? '6px' : '0px' }} />
                </div>
                <button type="submit" className="btn-glow-border" style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem', padding: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid #c6ff34', background: 'transparent', color: '#c6ff34', cursor: 'pointer', borderRadius: isRemix ? '6px' : '0px' }}>
                  [INIT_TRANSMISSION]
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 5. SUI FORK (Default) - Brutalist Premium Dark Split Layout
  return (
    <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <CharacterReveal text="You already have the data." />
            <CharacterReveal text="Now, make it think." className="text-accent" style={{ color: '#c6ff34' }} />
          </h2>
          <CharacterReveal
            text="Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today."
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '480px' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'rgba(255, 255, 255, 0.01)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: isRemix ? '12px' : '16px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '1.75rem', color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>Inquiry Registered</h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)' }}>An architect will contact you shortly to begin mapping.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Name</label>
                <input id="name-sui" type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <div>
                <label htmlFor="email-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Email</label>
                <input id="email-sui" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <div>
                <label htmlFor="msg-sui" style={{ display: 'block', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>What do you want to explore?</label>
                <textarea id="msg-sui" name="message" value={formData.message} onChange={handleChange} required rows="3" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: isRemix ? '6px' : '8px', padding: '0.75rem 1rem', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#c6ff34'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <Magnetic range={150} actionScale={0.1}>
                <button type="submit" className="sui-btn-outline-pill" disabled={!isFormValid} style={{ padding: '0.9rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', width: '100%' }}>
                  Submit Inquiry
                  <div className="sui-btn-icon-wrapper" style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="sui-btn-arrow">
                      <path d="M10.5417 3.26746L9.00599 3.2675L7.92491 5.7266L9.46066 5.72656L10.5417 3.26746Z" fill="currentColor"></path>
                      <path d="M5.30933 3.26746L6.84508 3.2675L7.92617 5.7266L6.39041 5.72656L5.30933 3.26746Z" fill="currentColor"></path>
                      <path d="M10.5417 12.5849L9.00599 12.5849L7.92491 10.1258L9.46066 10.1258L10.5417 12.5849Z" fill="currentColor"></path>
                      <path d="M5.30933 12.5849L6.84508 12.5849L7.92617 10.1258L6.39041 10.1258L5.30933 12.5849Z" fill="currentColor"></path>
                      <path d="M3.26929 5.30914L3.26933 6.8449L5.72843 7.92598L5.72839 6.39023L3.26929 5.30914Z" fill="currentColor"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="sui-btn-arrow">
                      <path d="M10.5417 3.26746L9.00599 3.2675L7.92491 5.7266L9.46066 5.72656L10.5417 3.26746Z" fill="currentColor"></path>
                      <path d="M5.30933 3.26746L6.84508 3.2675L7.92491 5.7266L6.39041 5.72656L5.30933 3.26746Z" fill="currentColor"></path>
                      <path d="M10.5417 12.5849L9.00599 12.5849L7.92491 10.1258L9.46066 10.1258L10.5417 12.5849Z" fill="currentColor"></path>
                      <path d="M5.30933 12.5849L6.84508 12.5849L7.92617 10.1258L6.39041 10.1258L5.30933 12.5849Z" fill="currentColor"></path>
                      <path d="M3.26929 5.30914L3.26933 6.8449L5.72843 7.92598L5.72839 6.39023L3.26929 5.30914Z" fill="currentColor"></path>
                    </svg>
                  </div>
                </button>
              </Magnetic>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );

}

export default memo(FooterCTA);
