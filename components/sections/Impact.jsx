'use client';

import React, { useMemo, memo } from 'react';
import CharacterReveal from '../CharacterReveal';
import TiltCard from '../TiltCard';
import ColorBends from '../ColorBends';
import Counter from '../Counter';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Impact.module.css';

function Impact({ activeHero }) {
  const { t } = useLanguage();
  const metrics = useMemo(() => {
    return t?.impact?.metrics || [
      { number: "7x", label: "Faster deployment cycles vs. traditional development." },
      { number: "-65%", label: "Reduction in operational costs and manual reporting." },
      { number: "25M+", label: "Data rows orchestrated and centralized daily." }
    ];
  }, [t]);

  const titleLine1 = t?.impact?.titleLine1 || "The Math Speaks";
  const titleLine2 = t?.impact?.titleLine2 || "For Itself.";
  const fullTitle = t?.impact?.fullTitle || "The math speaks for itself.";
  const subtitle = t?.impact?.subtitle || "Transform your architecture with intelligent orchestration. Unparalleled speed, absolute precision, and radical efficiency.";

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'tech_v4' : activeHero;

  if (isRemix) {
    return (
      <section className={styles.section} aria-labelledby="impact-heading">
        <div className={styles.background} aria-hidden="true">
          <div className={styles.colorField}>
            <ColorBends
              colors={['#c6ff34', '#8bcc18', '#e3ff80', '#0a0a0a']}
              speed={0.4}
              intensity={1.2}
              mouseInfluence={0}
              parallax={0}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className={styles.texture} />
        </div>
        <div className={styles.inner}>
          <div className={styles.panel}>
            <div className={styles.intro}>
              <h2 id="impact-heading" className={styles.title}>
                <CharacterReveal text={titleLine1} />
                {' '}
                <CharacterReveal text={titleLine2} />
              </h2>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.metrics}>
              {metrics.map((metric) => (
                <TiltCard key={metric.number} className={`sui-card-hover ${styles.card}`}>
                  <div className={styles.cardContent}>
                    <strong className={styles.value}>
                      <Counter value={metric.number} />
                    </strong>
                    <p className={styles.label}>{metric.label}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'spline1') {
    return (
      <section style={{ padding: 'clamp(4rem, 7vw, 8rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="impact-glass-container" style={{ gap: '2.5rem', alignItems: 'center' }}>
            <div className="impact-left-col">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.15rem, 4vw, 4rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15 }}>
                {fullTitle}
              </h2>
            </div>
            <div className="impact-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {metrics.map((m, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem'
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--color-accent)', fontWeight: 700 }}>
                    <Counter value={m.number} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'cinematic') {
    return (
      <section style={{ padding: 'clamp(4rem, 7vw, 8rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 6rem)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.85rem, 3.5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              {fullTitle}
            </h2>
          </div>
          <div className="impact-metrics-grid" style={{ gap: '1px', background: 'rgba(255,255,255,0.1)' }}>
            {metrics.map((m, index) => (
              <div key={index} style={{ background: '#000000', padding: '3rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                  <Counter value={m.number} />
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#71717a', maxWidth: '240px', margin: '0 auto', lineHeight: 1.5 }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'modern_v2') {
    return (
      <section style={{ padding: 'clamp(4rem, 7vw, 9rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 6rem)' }}>
            <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.15rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
              {fullTitle}
            </h2>
          </div>
          <div className="impact-metrics-grid">
            {metrics.map((m, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '24px',
                padding: '2.5rem 1.75rem',
                textAlign: 'center',
                boxShadow: '0 12px 40px rgba(198, 255, 52, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }} className="sui-card-hover">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                  <Counter value={m.number} />
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'tech_v4') {
    return (
      <section style={{ padding: 'clamp(4rem, 7vw, 9rem) 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 6rem)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.15rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              {fullTitle}
            </h2>
          </div>
          <div className="impact-metrics-grid" style={{ border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            {metrics.map((m, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.01)',
                padding: '3rem 2rem',
                borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                  Metric 0{index + 1}
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 6.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
                  <Counter value={m.number} />
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: 'clamp(4rem, 7vw, 8rem) 0', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 5rem)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {fullTitle}
          </h2>
        </div>
        <div className="impact-metrics-grid">
          {metrics.map((m, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              padding: '2.5rem 1.75rem',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }} className="sui-card-hover">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                {m.number}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}

export default memo(Impact);
