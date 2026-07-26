'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';

const logoUrl = '/assets/Neuralbi logo.svg';



// ─── SECTION 10: PREMIUM STYLE-SPECIFIC FOOTER (SUI & RAYCAST DNA) ───
function Footer({ activeHero }) {
  const [lang, setLang] = React.useState('English');

  const links = {
    "Power BI": [
      { name: "Official Documentation", href: "https://learn.microsoft.com/en-us/power-bi/", target: "_blank" },
      { name: "Direct Lake Architecture", href: "https://learn.microsoft.com/en-us/fabric/get-started/direct-lake-overview", target: "_blank" },
      { name: "Enterprise Data Guidance", href: "https://learn.microsoft.com/en-us/power-bi/guidance/", target: "_blank" }
    ],
    "Power Apps": [
      { name: "Official Documentation", href: "https://learn.microsoft.com/en-us/power-apps/", target: "_blank" },
      { name: "PCF Components & React", href: "https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview", target: "_blank" },
      { name: "Canvas & Model-Driven Apps", href: "https://learn.microsoft.com/en-us/power-apps/maker/", target: "_blank" }
    ],
    "Power Automate": [
      { name: "Official Documentation", href: "https://learn.microsoft.com/en-us/power-automate/", target: "_blank" },
      { name: "Headless RPA & Desktop", href: "https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction", target: "_blank" },
      { name: "Cloud Flows Guidance", href: "https://learn.microsoft.com/en-us/power-automate/guidance/", target: "_blank" }
    ],
    "Copilot Studio": [
      { name: "Official Documentation", href: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/", target: "_blank" },
      { name: "Generative AI & GPT", href: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-gpt-overview", target: "_blank" },
      { name: "Actions & Plug-ins", href: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-plugin-actions", target: "_blank" }
    ]
  };

  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'tech_v4' : activeHero;

  // 1. NEBULA FOOTER (Organic Floating Orbs)
  if (displayHero === 'spline1') {
    return (
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(to top, #040900 0%, #000000 100%)',
        padding: '7rem 0 4rem 0',
        overflow: 'hidden',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Soft, drifting, organic background blobs */}
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '20%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'rgba(198, 255, 52, 0.04)',
          filter: 'blur(120px)',
          zIndex: 1,
          animation: 'float-blob-1 16s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          right: '25%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(198, 255, 52, 0.03)',
          filter: 'blur(140px)',
          zIndex: 1,
          animation: 'float-blob-2 20s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
          {/* Link columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '3rem',
            marginBottom: '6rem'
          }}>
            {Object.keys(links).map((category) => (
              <div key={category} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  color: '#ffffff',
                  textTransform: 'capitalize',
                  opacity: 0.8
                }}>
                  {category}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {links[category].map((l, idx) => (
                    <li key={idx}>
                      <a href={l.href} style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.45)',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}>
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Lower Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', alignSelf: 'flex-start', opacity: 0.95 }} />

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['Youtube', 'Discord', 'LinkedIn', 'X'].map((social, idx) => (
                  <a key={idx} href="#" className="sui-social-box" style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '9999px', // round pill style
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {social[0]}
                  </a>
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.05em' }}>
                © 2026 Copyright NeuralBI. All rights reserved.
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLang(lang === 'English' ? 'Español' : 'English')}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.5rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(198, 255, 52, 0.3)'; e.currentTarget.style.background = 'rgba(198, 255, 52, 0.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
              >
                <span>{lang}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>▼</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 2. CINEMATIC FOOTER (Sweep Sheen & Film Grid)
  if (activeHero === 'cinematic') {
    return (
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(to top, #08080c 0%, #000000 100%)',
        padding: '6rem 0 5rem 0',
        overflow: 'hidden',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Retro cinematic grid pattern background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.45,
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        {/* Sweeping film scanner line */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(198, 255, 52, 0.25), transparent)',
          boxShadow: '0 0 10px rgba(198, 255, 52, 0.2)',
          zIndex: 2,
          animation: 'sweep 10s linear infinite',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 3 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '3rem',
            marginBottom: '6rem'
          }} className="raycast-footer-grid">
            {Object.keys(links).map((category, index) => (
              <div key={index} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {category}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {links[category].map((l, idx) => (
                    <li key={idx}>
                      <a href={l.href} style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        color: '#71717a',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}>
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '22px', opacity: 0.8, filter: 'grayscale(1)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#3f3f46' }}>
                © 2026 Copyright NeuralBI. All rights reserved.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {['TW', 'LN', 'DS', 'YT'].map((soc, idx) => (
                <a key={idx} href="#" style={{
                  width: '34px',
                  height: '34px',
                  border: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#71717a',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)'
                }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#71717a'; }}>
                  {soc}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 3. MODERN V2 FOOTER (Fully Degradado Mesh Gradient & Glassmorphism Panel)
  if (activeHero === 'modern_v2') {
    return (
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(to bottom, #000000 0%, #071501 50%, #0f2c02 100%)', // Wide, fully cover gradient
        padding: '8rem 0 4rem 0',
        overflow: 'hidden',
        zIndex: 10,
        borderTop: '1px solid rgba(198, 255, 52, 0.08)'
      }}>
        {/* Pulsing smooth mesh glow covering the entire section */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 100%, rgba(198, 255, 52, 0.15) 0%, rgba(198, 255, 52, 0.03) 60%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 3 }}>
          {/* Glass layout wrapper */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: '4rem 3rem',
            marginBottom: '4rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2.5rem'
            }} className="raycast-footer-grid">
              {Object.keys(links).map((category, index) => (
                <div key={index} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.02em'
                  }}>
                    {category.toUpperCase()}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {links[category].map((l, idx) => (
                      <li key={idx}>
                        <a href={l.href} style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}>
                          {l.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingTop: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', opacity: 0.95 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                © 2026 Copyright NeuralBI. All rights reserved.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Twitter', 'LinkedIn', 'Discord', 'YouTube'].map((social, idx) => (
                <a key={idx} href="#" style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s'
                }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c6ff34'; e.currentTarget.style.color = '#c6ff34'; e.currentTarget.style.background = 'rgba(198,255,52,0.04)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 4. TECH V4 FOOTER (Screen-Wide Slanted Floating Glass Slats)
  if (displayHero === 'tech_v4') {
    return (
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(to top, #050505 0%, #000000 100%)',
        padding: '0 0 5rem 0',
        overflow: 'hidden',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {isRemix && (
          <>
            {/* Upward glowing lime gradient (Stronger pop & wide screen-wide spread) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '420px',
              background: 'linear-gradient(to top, rgba(198, 255, 52, 0.12) 0%, rgba(198, 255, 52, 0.03) 60%, transparent 100%)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '350px',
              background: 'radial-gradient(circle at 50% 100%, rgba(198, 255, 52, 0.22) 0%, rgba(198, 255, 52, 0.05) 50%, transparent 80%)',
              filter: 'blur(50px)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
          </>
        )}
        {/* Angled slats header block expanded over the entire screen width */}
        <div style={{
          height: '140px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          position: 'relative',
          marginBottom: '5rem',
          borderBottom: '2px solid rgba(198, 255, 52, 0.25)', // glowing slot line
          boxShadow: '0 5px 25px rgba(198, 255, 52, 0.08)',
          overflow: 'hidden',
          width: '100%'
        }}>
          {/* Subtle bottom fade */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #030303)', zIndex: 2, pointerEvents: 'none' }} />

          {/* 28 Slats rendering dynamically across the screen width */}
          <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: '-25px',
            left: 0,
            zIndex: 1,
            padding: '0 1rem',
            overflow: 'hidden'
          }}>
            {Array.from({ length: 28 }).map((_, idx) => {
              const animType = (idx % 3) + 1; // Alternating keys: float-slat-1, float-slat-2, float-slat-3
              const delay = (idx * 0.12).toFixed(2) + 's';
              const customHeight = 110 + (idx % 5) * 10; // varying heights for organic ripple look
              return (
                <div
                  key={idx}
                  className="raycast-slat"
                  style={{
                    animation: 'float-slat-' + animType + ' 5s ease-in-out infinite ' + delay,
                    height: customHeight + 'px',
                    opacity: 0.25 + (idx % 4) * 0.1,
                    flexShrink: 0
                  }}

                />
              );
            })}
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 3 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            marginBottom: '6rem'
          }} className="raycast-footer-grid">
            {Object.keys(links).map((category, index) => {
              return (
                <div key={index} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h4 style={{
                    fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.01em'
                  }}>
                    {category}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {links[category].map((l, idx) => (
                      <li key={idx}>
                        <a href={l.href} target={l.target || "_self"} rel="noopener noreferrer" style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          color: '#8e8e93',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}>
                          {l.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '22px', opacity: 0.8 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#636366' }}>
                © 2026 Copyright NeuralBI. All rights reserved.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: '#8e8e93', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#8e8e93'}>LinkedIn</a>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: '#8e8e93', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#8e8e93'}>YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 5. SUI FORK FOOTER (Upward Dotted Particles Waterfall & Full Soft Glow)
  return (
    <footer style={{
      position: 'relative',
      background: '#000000',
      padding: '6rem 0 4rem 0',
      overflow: 'hidden',
      zIndex: 10,
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Upward glowing lime gradient (Stronger pop & wide screen-wide spread) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '420px', // taller spread covering the full footer height
        background: 'linear-gradient(to top, rgba(198, 255, 52, 0.12) 0%, rgba(198, 255, 52, 0.03) 60%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '350px',
        background: 'radial-gradient(circle at 50% 100%, rgba(198, 255, 52, 0.22) 0%, rgba(198, 255, 52, 0.05) 50%, transparent 80%)',
        filter: 'blur(50px)',
        zIndex: 1,
        pointerEvents: 'none',
        animation: 'pulse-glow 7s ease-in-out infinite alternate'
      }} />

      {/* Dotted grid SVG overlay with rising particle animation */}
      <svg style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <line x1="16.6%" y1="0" x2="16.6%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 6s linear infinite' }} />
        <line x1="33.3%" y1="0" x2="33.3%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 4.5s linear infinite' }} />
        <line x1="50.0%" y1="0" x2="50.0%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 5s linear infinite' }} />
        <line x1="66.6%" y1="0" x2="66.6%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 4s linear infinite' }} />
        <line x1="83.3%" y1="0" x2="83.3%" y2="100%" stroke="rgba(198, 255, 52, 0.12)" strokeWidth="1.5" strokeDasharray="4 8" style={{ animation: 'flow-dotted 5.5s linear infinite' }} />
      </svg>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
        {/* Link columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '3rem',
          marginBottom: '6rem'
        }}>
          {Object.keys(links).map((category) => (
            <div key={category} className="footer-link-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.15em'
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links[category].map((l, idx) => (
                  <li key={idx}>
                    <a href={l.href} target={l.target || "_self"} rel="noopener noreferrer" style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.45)',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}>
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lower Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {/* Left: Logo, Social boxes & Copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <img src={logoUrl} alt="NeuralBI Logo" style={{ height: '24px', alignSelf: 'flex-start', opacity: 0.95 }} />

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {/* LinkedIn */}
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="sui-social-box" style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.45)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              {/* YouTube */}
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="sui-social-box" style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.45)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.05em' }}>
              © 2026 Copyright NeuralBI. All rights reserved.
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLang(lang === 'English' ? 'Español' : 'English')}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '0.5rem 1.25rem',
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(198, 255, 52, 0.3)'; e.currentTarget.style.background = 'rgba(198, 255, 52, 0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
            >
              <span>{lang}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>▼</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );

}

export default memo(Footer);
