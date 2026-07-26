'use client';

import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SECTION 10: PREMIUM STYLE-SPECIFIC FAQ (ACCORDIONS, GRID & COMMAND CONSOLE) ───
function Faq({ activeHero }) {
  const [activeIdx, setActiveIdx] = React.useState(null);

  const faqData = [
    {
      q: "What is Microsoft Power Platform?",
      a: "A suite of low-code tools (Power Apps, Automate, BI, Copilot Studio) that allows businesses to build apps, automate workflows, analyze data, and build agentic chatbots rapidly."
    },
    {
      q: "How does NeuralBI differ from traditional IT consultancies?",
      a: "Traditional firms deliver static reports and rigid code. NeuralBI operates on 'Applied Intelligence'—orchestrating cognitive layers directly into your Microsoft environment for real-time automation and zero-friction deployments."
    },
    {
      q: "What is the average timeline for the Neural Protocol?",
      a: "Our precise three-phase protocol (Audit, Build, Scale) ranges from 2 weeks for targeted automation pilots to 8 weeks for full enterprise cognitive data engines."
    },
    {
      q: "Is our enterprise data secure with NeuralBI solutions?",
      a: "Absolutely. All workflows are built directly within your tenant boundary, utilizing Microsoft Azure enterprise-grade security protocols, end-to-end data encryption, and strict governance policies."
    }
  ];

  // Pick theme fonts and colors
  const getTheme = () => {
    switch (activeHero) {
      case 'spline1':
        return {
          fontTitle: 'var(--font-serif)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #040900)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          glowColor: 'rgba(198, 255, 52, 0.03)'
        };
      case 'cinematic':
        return {
          fontTitle: 'var(--font-ui)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #08080c)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          glowColor: 'transparent'
        };
      case 'modern_v2':
        return {
          fontTitle: 'var(--font-display)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #071501)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
          glowColor: 'rgba(198, 255, 52, 0.04)'
        };
      case 'tech_v4':
        return {
          fontTitle: 'var(--font-tech)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #050505)',
          borderColor: 'rgba(198, 255, 52, 0.2)',
          glowColor: 'rgba(198, 255, 52, 0.02)'
        };
      case 'remix':
        return {
          fontTitle: 'var(--font-display)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #050505)',
          borderColor: 'rgba(198, 255, 52, 0.2)',
          glowColor: 'rgba(198, 255, 52, 0.02)'
        };
      case 'sui_fork':
      default:
        return {
          fontTitle: 'var(--font-ui)',
          fontSans: 'var(--font-sans)',
          colorAccent: '#c6ff34',
          bgGradient: 'linear-gradient(to bottom, #000000, #000000)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          glowColor: 'rgba(198, 255, 52, 0.04)'
        };
    }
  };

  const theme = getTheme();

  // 1. NEBULA FAQ (Split-Screen Serif Accordion)
  if (activeHero === 'spline1') {
    return (
      <section style={{
        background: theme.bgGradient,
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid ' + theme.borderColor
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }} className="raycast-footer-grid">
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#ffffff', fontWeight: 400, lineHeight: 1.15 }}>
              Frequently Asked Queries
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '1.5rem', lineHeight: 1.6 }}>
              A curated overview of Power Platform capabilities, NeuralBI orchestrations, data sovereignty, and deployment timelines.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqData.map((item, idx) => {
              const isOpen = activeIdx === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '1.5rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      color: isOpen ? '#c6ff34' : '#ffffff',
                      transition: 'color 0.3s'
                    }}>
                      {item.q}
                    </h3>
                    <span style={{
                      color: '#c6ff34',
                      fontSize: '1.25rem',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }}>
                      +
                    </span>
                  </div>
                  <div style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isOpen ? 1 : 0
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      color: 'rgba(255, 255, 255, 0.55)',
                      lineHeight: 1.6,
                      marginTop: '1rem',
                      maxWidth: '620px'
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 2. CINEMATIC FAQ (2x2 Brutalist Grid Console)
  if (activeHero === 'cinematic') {
    return (
      <section style={{
        background: theme.bgGradient,
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid ' + theme.borderColor
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#ffffff',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            SYSTEM FAQ // CONSOLE
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }} className="raycast-footer-grid">
            {faqData.map((item, idx) => {
              const isOpen = activeIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  style={{
                    background: '#020202',
                    padding: '3rem 2.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s',
                    outline: isOpen ? '1px solid #c6ff34' : '1px solid transparent',
                    zIndex: isOpen ? 2 : 1
                  }}
                >
                  {isOpen && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#c6ff34', letterSpacing: '0.1em' }}>
                      [ACTIVE_CELL]
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: isOpen ? '#c6ff34' : 'rgba(255,255,255,0.35)', marginTop: '3px' }}>
                      0{idx + 1} //
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: isOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3
                    }}>
                      {item.q}
                    </h3>
                  </div>

                  <div style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isOpen ? 1 : 0
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.6,
                      marginTop: '1.5rem',
                      borderLeft: '2px solid #c6ff34',
                      paddingLeft: '1rem'
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 3. MODERN V2 FAQ (Stripe-style Interactive Tab Panel)
  if (activeHero === 'modern_v2') {
    const selectedIdx = activeIdx !== null ? activeIdx : 0;
    return (
      <section style={{
        background: theme.bgGradient,
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid ' + theme.borderColor
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#ffffff',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            Questions and Answers
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: '4rem',
            alignItems: 'stretch'
          }} className="raycast-footer-grid">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
              {faqData.map((item, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      background: isSelected ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                      border: isSelected ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
                      borderRadius: '16px',
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: isSelected ? '#c6ff34' : 'rgba(255,255,255,0.15)',
                      boxShadow: isSelected ? '0 0 8px #c6ff34' : 'none',
                      transition: 'all 0.3s'
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                      transition: 'color 0.3s'
                    }}>
                      {item.q}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.01)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              padding: '4rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(198, 255, 52, 0.03)'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(198, 255, 52, 0.08) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#c6ff34',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  Response Panel
                </span>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginTop: '1rem',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em'
                }}>
                  {faqData[selectedIdx].q}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: 1.7,
                  marginTop: '2rem'
                }}>
                  {faqData[selectedIdx].a}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. TECH V4 FAQ (Cyberpunk Command Terminal Console)
  if (activeHero === 'tech_v4') {
    const selectedIdx = activeIdx !== null ? activeIdx : 0;
    return (
      <section style={{
        background: theme.bgGradient,
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid ' + theme.borderColor
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{
            border: '1px solid rgba(198, 255, 52, 0.3)',
            background: 'rgba(5, 8, 1, 0.9)',
            padding: '1.25rem 2rem',
            borderBottom: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c6ff34', boxShadow: '0 0 6px #c6ff34' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#c6ff34', letterSpacing: '0.1em' }}>
                FAQ
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.3)' }}>

            </span>
          </div>

          <div style={{
            border: '1px solid rgba(198, 255, 52, 0.3)',
            background: '#010200',
            padding: '3rem',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '3rem',
            position: 'relative'
          }} className="raycast-footer-grid">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.3)', marginBottom: '0.5rem' }}>
                Select a topic:
              </span>

              {faqData.map((item, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: isSelected ? '#c6ff34' : 'rgba(255, 255, 255, 0.65)',
                      cursor: 'pointer',
                      padding: '0.75rem 1rem',
                      border: '1px dashed ' + (isSelected ? 'rgba(198, 255, 52, 0.4)' : 'rgba(255, 255, 255, 0.08)'),
                      background: isSelected ? 'rgba(198, 255, 52, 0.03)' : 'transparent',
                      transition: 'all 0.25s'
                    }}
                  >
                    <span>{isSelected ? '' : ''}</span>
                    <span>{item.q}</span>
                  </div>
                );
              })}
            </div>

            <div style={{
              borderLeft: '1px solid rgba(198, 255, 52, 0.2)',
              paddingLeft: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px'
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.3)' }}>
                  Answer
                </span>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  lineHeight: 1.6,
                  marginTop: '1.5rem',
                  letterSpacing: '-0.02em'
                }}>
                  {faqData[selectedIdx].a}
                </p>
              </div>


            </div>
          </div>
        </div>
      </section>
    );
  }

  // 5. SUI FORK FAQ (Bento glass accordion cards)
  return (
    <section style={{
      background: theme.bgGradient,
      padding: '8rem 0',
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid ' + theme.borderColor
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <CharacterReveal
            text="Frequently Asked Questions"
            className={activeHero === 'remix' ? 'text-gradient-premium' : ''}
            style={{
              fontFamily: activeHero === 'remix' ? 'var(--font-display)' : 'var(--font-ui)',
              fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              ...(activeHero !== 'remix' ? { color: '#ffffff' } : {})
            }}
          />
        </h2>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {faqData.map((item, idx) => {
            const isOpen = activeIdx === idx;
            const itemVariants = {
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 20
                }
              }
            };
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onClick={() => setActiveIdx(isOpen ? null : idx)}
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid ' + (isOpen ? 'rgba(198, 255, 52, 0.25)' : 'rgba(255, 255, 255, 0.05)'),
                  borderRadius: '20px',
                  padding: '2rem 2.25rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isOpen ? '0 15px 35px rgba(198, 255, 52, 0.03)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="sui-card-hover"
              >
                {isOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(198, 255, 52, 0.06) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: isOpen ? '#c6ff34' : '#ffffff',
                    transition: 'color 0.3s'
                  }}>
                    {item.q}
                  </h3>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isOpen ? 'rgba(198, 255, 52, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid ' + (isOpen ? '#c6ff34' : 'rgba(255, 255, 255, 0.08)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? '#c6ff34' : '#ffffff',
                    transition: 'all 0.3s'
                  }}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s'
                      }}
                    >
                      <path d="M2 5L8 11L14 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div style={{
                  maxHeight: isOpen ? '200px' : '0px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isOpen ? 1 : 0
                }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6,
                    marginTop: '1.5rem'
                  }}>
                    {item.a}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );

}

export default memo(Faq);
