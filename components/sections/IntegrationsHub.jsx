'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import CharacterReveal from '../CharacterReveal';

function IntegrationsHub({ activeHero }) {
  const [hoveredNode, setHoveredNode] = React.useState(null);

  // SVG Icons for the integration nodes
  const icons = {
    SAP: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    Salesforce: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.47 0-.89.09-1.3.27A5 5 0 0 0 5 14c0 .12.01.24.02.36A4 4 0 0 0 8 22h8a4 4 0 0 0 1.5-3Z" />
      </svg>
    ),
    SQL: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    ),
    Oracle: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v12" />
        <path d="M6 12h12" />
      </svg>
    ),
    HubSpot: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.5" y1="10.5" x2="15.5" y2="6.5" />
        <line x1="8.5" y1="13.5" x2="15.5" y2="17.5" />
      </svg>
    ),
    SharePoint: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    PowerBI: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    PowerApps: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    Copilot: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 7.54 16.59l-1.42-1.42A8 8 0 1 0 5.88 17.5l-1.42 1.42A10 10 0 0 1 12 2z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 7v2" />
        <path d="M12 15v2" />
        <path d="M7 12h2" />
        <path d="M15 12h2" />
      </svg>
    )
  };

  const nodes = [
    // --- INPUTS (Left Side) ---
    {
      id: "SAP",
      name: "SAP ERP",
      left: '18%',
      top: '20%',
      align: 'left',
      desc: "Automated sync of inventory, procurement, and financial ledgers.",
      status: "STABLE",
      latency: "12ms",
      type: "ERP Native",
      iconKey: "SAP"
    },
    {
      id: "Salesforce",
      name: "Salesforce CRM",
      left: '12%',
      top: '40%',
      align: 'left',
      desc: "Bi-directional sync of sales pipelines, accounts, and contact records.",
      status: "CONNECTED",
      latency: "8ms",
      type: "REST Pipeline",
      iconKey: "Salesforce"
    },
    {
      id: "SQL",
      name: "Azure SQL Database",
      left: '18%',
      top: '60%',
      align: 'left',
      desc: "High-speed query engine orchestrating structured enterprise databases.",
      status: "SYNC_OK",
      latency: "4ms",
      type: "ODBC Pipeline",
      iconKey: "SQL"
    },
    // --- INPUTS (Right Side) ---
    {
      id: "Oracle",
      name: "Oracle Database",
      left: '82%',
      top: '20%',
      align: 'right',
      desc: "Enterprise ledger mapping and relational table ingestion.",
      status: "STABLE",
      latency: "14ms",
      type: "OCI Native",
      iconKey: "Oracle"
    },
    {
      id: "HubSpot",
      name: "HubSpot CRM",
      left: '88%',
      top: '40%',
      align: 'right',
      desc: "Automated sync of marketing campaigns and lead attribution.",
      status: "CONNECTED",
      latency: "7ms",
      type: "Web API",
      iconKey: "HubSpot"
    },
    {
      id: "SharePoint",
      name: "SharePoint Portal",
      left: '82%',
      top: '60%',
      align: 'right',
      desc: "Unified document index mapping and file metadata syncing.",
      status: "SYNC_OK",
      latency: "9ms",
      type: "Graph Native",
      iconKey: "SharePoint"
    },
    // --- OUTPUTS (Bottom Side) ---
    {
      id: "PowerBI",
      name: "Power BI Reports",
      left: '26%',
      top: '80%',
      align: 'bottom-left',
      desc: "Executive analytics dashboards with real-time predictive insights.",
      status: "RENDERED",
      latency: "Live",
      type: "Visualization",
      iconKey: "PowerBI"
    },
    {
      id: "PowerApps",
      name: "Power Apps",
      left: '50%',
      top: '84%',
      align: 'bottom-center',
      desc: "Mobile and web business interfaces automating operations.",
      status: "ACTIVE",
      latency: "<10ms",
      type: "Low-Code UI",
      iconKey: "PowerApps"
    },
    {
      id: "Copilot",
      name: "AI Copilot Agents",
      left: '74%',
      top: '80%',
      align: 'bottom-right',
      desc: "Custom AI reasoning agents automating complex user chats.",
      status: "ONLINE",
      latency: "Cognitive",
      type: "Copilot Studio",
      iconKey: "Copilot"
    }
  ];

  const getStyle = () => {
    switch (activeHero) {
      case 'spline1':
        return {
          font: 'var(--font-serif)',
          fontBody: 'var(--font-sans)',
          title: "Seamless Connectivity. Unified Delivery.",
          subtitle: "From databases to modern cloud architectures. We pipe proprietary enterprise data directly into high-throughput semantic layers, beautiful reports, custom React applications, and cognitive AI workflows with zero processing friction.",
          connectorColor: 'rgba(198, 255, 52, 0.15)',
          nodeBg: 'rgba(10, 18, 1, 0.75)',
          nodeBorder: 'rgba(198, 255, 52, 0.25)',
          bgGradient: 'linear-gradient(to bottom, #040900 0%, #000000 100%)',
          cardRadius: '9999px',
          borderColor: 'rgba(255,255,255,0.04)'
        };
      case 'cinematic':
        return {
          font: 'var(--font-ui)',
          fontBody: 'var(--font-sans)',
          title: "SEAMLESS CONNECTIVITY. UNIFIED DELIVERY.",
          subtitle: "From databases to modern cloud architectures. We pipe proprietary enterprise data directly into high-throughput semantic layers, beautiful reports, custom React applications, and cognitive AI workflows with zero processing friction.",
          connectorColor: 'rgba(255, 255, 255, 0.12)',
          nodeBg: '#020202',
          nodeBorder: 'rgba(255,255,255,0.18)',
          bgGradient: 'linear-gradient(to bottom, #08080c 0%, #000000 100%)',
          cardRadius: '0px',
          borderColor: 'rgba(255,255,255,0.08)'
        };
      case 'modern_v2':
        return {
          font: 'var(--font-display)',
          fontBody: 'var(--font-sans)',
          title: "Seamless Connectivity. Unified Delivery.",
          subtitle: "From databases to modern cloud architectures. We pipe proprietary enterprise data directly into high-throughput semantic layers, beautiful reports, custom React applications, and cognitive AI workflows with zero processing friction.",
          connectorColor: 'rgba(198, 255, 52, 0.22)',
          nodeBg: 'rgba(255, 255, 255, 0.02)',
          nodeBorder: 'rgba(255,255,255,0.06)',
          bgGradient: 'linear-gradient(to bottom, #071501 0%, #000000 100%)',
          cardRadius: '16px',
          borderColor: 'rgba(255,255,255,0.05)'
        };
      case 'tech_v4':
        return {
          font: 'var(--font-mono)',
          fontBody: 'var(--font-mono)',
          title: "SEAMLESS_CONNECTIVITY // UNIFIED_DELIVERY",
          subtitle: "From databases to modern cloud architectures. We pipe proprietary enterprise data directly into high-throughput semantic layers, beautiful reports, custom React applications, and cognitive AI workflows with zero processing friction.",
          connectorColor: 'rgba(198, 255, 52, 0.4)',
          nodeBg: '#010200',
          nodeBorder: 'rgba(198, 255, 52, 0.45)',
          bgGradient: 'linear-gradient(to bottom, #050505 0%, #000000 100%)',
          cardRadius: '0px',
          borderColor: 'rgba(198,255,52,0.2)'
        };
      case 'remix':
        return {
          font: 'var(--font-display)',
          fontBody: 'var(--font-sans)',
          title: "Seamless Connectivity. Unified Delivery.",
          subtitle: "From databases to modern cloud architectures. We pipe proprietary enterprise data directly into high-throughput semantic layers, beautiful reports, custom React applications, and cognitive AI workflows with zero processing friction.",
          connectorColor: 'rgba(198, 255, 52, 0.4)',
          nodeBg: '#010200',
          nodeBorder: 'rgba(198, 255, 52, 0.45)',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #000000 100%)',
          cardRadius: '6px',
          borderColor: 'rgba(198,255,52,0.2)'
        };
      case 'sui_fork':
      default:
        return {
          font: 'var(--font-ui)',
          fontBody: 'var(--font-sans)',
          title: "Seamless Connectivity. Unified Delivery.",
          subtitle: "From databases to modern cloud architectures. We pipe proprietary enterprise data directly into high-throughput semantic layers, beautiful reports, custom React applications, and cognitive AI workflows with zero processing friction.",
          connectorColor: 'rgba(198, 255, 52, 0.18)',
          nodeBg: 'rgba(255, 255, 255, 0.01)',
          nodeBorder: 'rgba(255,255,255,0.05)',
          bgGradient: 'linear-gradient(to bottom, #000000 0%, #000000 100%)',
          cardRadius: '24px',
          borderColor: 'rgba(255,255,255,0.04)'
        };
    }
  };

  const s = getStyle();

  return (
    <section style={{
      background: s.bgGradient,
      padding: '8rem 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ textAlign: 'center', margin: 0 }}>
            <CharacterReveal
              text={s.title}
              className={activeHero === 'remix' ? 'text-gradient-premium' : ''}
              style={{
                fontFamily: s.font,
                fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)',
                fontWeight: 800,
                textTransform: activeHero === 'cinematic' || activeHero === 'tech_v4' ? 'uppercase' : 'none',
                letterSpacing: '-0.02em',
                ...(activeHero !== 'remix' ? { color: '#ffffff' } : {})
              }}
            />
          </h2>
          <p style={{
            fontFamily: s.fontBody,
            fontSize: '1.05rem',
            color: 'rgba(255, 255, 255, 0.55)',
            marginTop: '1rem',
            maxWidth: '720px',
            margin: '1rem auto 0 auto',
            lineHeight: 1.6
          }}>
            <CharacterReveal text={s.subtitle} stagger={0.008} />
          </p>
        </div>

        {/* Stripe-Inspired Interactive Network Map Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.01)',
          backdropFilter: 'blur(20px)',
          borderRadius: s.cardRadius === '9999px' ? '32px' : s.cardRadius === '24px' ? '28px' : s.cardRadius === '16px' ? '20px' : '0px',
          border: '1px solid ' + s.borderColor,
          overflow: 'hidden',
          padding: '3rem 0',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
        }}>
          {/* Background Grid Accent */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
            backgroundSize: '25px 25px',
            opacity: 0.3,
            zIndex: 0
          }} />

          <div style={{ position: 'relative', width: '100%', height: '500px', zIndex: 1 }}>

            {/* SVG Connections Paths with viewBox and preserveAspectRatio for absolute alignment */}
            <svg preserveAspectRatio="none" viewBox="0 0 900 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <filter id="glow" filterUnits="userSpaceOnUse" x="-50" y="-50" width="1000" height="600">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ─────────────────────────────────────────────────────────
                  DIFFERENT FLOW PATH ITERATIONS PER VERSION
                  ───────────────────────────────────────────────────────── */}
              {(activeHero === 'cinematic' || activeHero === 'tech_v4') ? (
                <>
                  {/* SAP (162, 100) */}
                  <path d="M 162 100 L 300 100 L 300 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 162 100 L 300 100 L 300 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 18s linear infinite' }} />

                  {/* Salesforce (108, 200) */}
                  <path d="M 108 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 108 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 14s linear infinite' }} />

                  {/* Azure SQL (162, 300) */}
                  <path d="M 162 300 L 300 300 L 300 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 162 300 L 300 300 L 300 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 15s linear infinite' }} />

                  {/* Oracle DB (738, 100) */}
                  <path d="M 738 100 L 600 100 L 600 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 738 100 L 600 100 L 600 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 18s linear infinite' }} />

                  {/* HubSpot CRM (792, 200) */}
                  <path d="M 792 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 792 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 14s linear infinite' }} />

                  {/* SharePoint (738, 300) */}
                  <path d="M 738 300 L 600 300 L 600 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 738 300 L 600 300 L 600 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 15s linear infinite' }} />

                  {/* Outputs: Center to Deliverables */}
                  {/* Reports (234, 400) */}
                  <path d="M 450 200 L 450 300 L 234 300 L 234 400" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 450 200 L 450 300 L 234 300 L 234 400" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 17s linear infinite' }} />

                  {/* Apps (450, 420) */}
                  <path d="M 450 200 L 450 420" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 450 200 L 450 420" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 12s linear infinite' }} />

                  {/* Agents (666, 400) */}
                  <path d="M 450 200 L 450 300 L 666 300 L 666 400" fill="none" stroke={s.connectorColor} strokeWidth="1.5" />
                  <path d="M 450 200 L 450 300 L 666 300 L 666 400" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 20s linear infinite' }} />
                </>
              ) : (
                <>
                  {/* Inputs: left curved */}
                  {/* SAP (162, 100) */}
                  <path d="M 162 100 C 300 100, 370 170, 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 162 100 C 300 100, 370 170, 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 18s linear infinite' }} />

                  {/* Salesforce (108, 200) */}
                  <path d="M 108 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 108 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 14s linear infinite' }} />

                  {/* Azure SQL (162, 300) */}
                  <path d="M 162 300 C 300 300, 370 230, 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 162 300 C 300 300, 370 230, 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 15s linear infinite' }} />

                  {/* Inputs: right curved */}
                  {/* Oracle DB (738, 100) */}
                  <path d="M 738 100 C 600 100, 530 170, 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 738 100 C 600 100, 530 170, 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 18s linear infinite' }} />

                  {/* HubSpot CRM (792, 200) */}
                  <path d="M 792 200 L 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 792 200 L 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 14s linear infinite' }} />

                  {/* SharePoint (738, 300) */}
                  <path d="M 738 300 C 600 300, 530 230, 450 200" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 738 300 C 600 300, 530 230, 450 200" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 15s linear infinite' }} />

                  {/* Outputs: bottom curved */}
                  {/* Reports (234, 400) */}
                  <path d="M 450 200 C 450 310, 234 310, 234 400" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 450 200 C 450 310, 234 310, 234 400" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 17s linear infinite' }} />

                  {/* Apps (450, 420) */}
                  <path d="M 450 200 L 450 420" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 450 200 L 450 420" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 12s linear infinite' }} />

                  {/* Agents (666, 400) */}
                  <path d="M 450 200 C 450 310, 666 310, 666 400" fill="none" stroke={s.connectorColor} strokeWidth="2" />
                  <path d="M 450 200 C 450 310, 666 310, 666 400" fill="none" stroke="#c6ff34" strokeWidth="2.5" strokeDasharray="10, 20" filter="url(#glow)" style={{ animation: 'dash-flow 20s linear infinite' }} />
                </>
              )}
            </svg>

            {/* Semantic Layout Labels */}
            <div style={{ position: 'absolute', top: '20px', left: '35px', fontFamily: s.font, fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              [ Data Inputs ]
            </div>
            <div style={{ position: 'absolute', top: '20px', right: '35px', fontFamily: s.font, fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              [ Data Inputs ]
            </div>
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', fontFamily: s.font, fontSize: '0.65rem', color: '#c6ff34', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', zIndex: 10 }}>
              [ Business Deliverables ]
            </div>

            {/* Central Hub Node (Centered mathematically inside the 50%/50% parent grid) */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90px',
              height: '90px',
              zIndex: 3
            }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: 'spring', stiffness: 85, damping: 15 }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#000000',
                  border: '2.5px solid #c6ff34',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 35px rgba(198, 255, 52, 0.4)',
                  position: 'relative'
                }}
              >
                {/* Spinning technical dash ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-8px',
                  border: '1.5px dashed rgba(198, 255, 52, 0.4)',
                  borderRadius: '50%',
                  animation: 'rotate-gradient 25s linear infinite'
                }} />

                {/* Absolute mathematical logo centering */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none'
                }}>
                  <img
                    src={logoSoloUrl}
                    alt="NeuralBI Hub"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      height: '44px', /* Slightly larger for improved visual weight */
                      width: 'auto',
                      opacity: 0.95,
                      display: 'block'
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Outer System Nodes with SVG icons */}
            {nodes.map((node, idx) => {
              const isHovered = hoveredNode === node.id;
              const leftVal = parseFloat(node.left) || 0;
              const topVal = parseFloat(node.top) || 0;
              const dx = leftVal - 50;
              const dy = topVal - 40;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const delay = distance * 0.007; // Synaptic radial ripple effect

              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: node.top,
                    left: node.left,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isHovered ? 10 : 4
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', stiffness: 90, damping: 14, delay: delay }}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                  >
                    {/* Floating tooltip overlay (Safely aligned inward to avoid screen clipping) */}
                    <div style={{
                      position: 'absolute',
                      width: '280px', /* Increased width to prevent tight text wrapping */
                      background: '#040405',
                      border: '1px solid ' + (isHovered ? '#c6ff34' : 'rgba(255,255,255,0.08)'),
                      borderRadius: s.cardRadius === '9999px' ? '20px' : s.cardRadius === '0px' ? '0px' : '12px',
                      padding: '1.25rem',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      textAlign: 'left',
                      pointerEvents: 'none',
                      opacity: isHovered ? 1 : 0,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                      zIndex: 10,

                      // Tooltips point inward or upward depending on alignment
                      ...(node.align === 'left' ? {
                        left: 'calc(100% + 15px)',
                        top: '50%',
                        transform: 'translateY(-50%) scale(' + (isHovered ? 1 : 0.8) + ')',
                        transformOrigin: 'left center'
                      } : node.align === 'right' ? {
                        right: 'calc(100% + 15px)',
                        top: '50%',
                        transform: 'translateY(-50%) scale(' + (isHovered ? 1 : 0.8) + ')',
                        transformOrigin: 'right center'
                      } : {
                        // Bottom nodes: Tooltips point UPWARD
                        bottom: 'calc(100% + 15px)',
                        left: '50%',
                        transform: 'translateX(-50%) scale(' + (isHovered ? 1 : 0.8) + ')',
                        transformOrigin: 'bottom center'
                      })
                    }}>
                      <strong style={{ fontFamily: s.font, display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#c6ff34' }}>
                        {node.name}
                      </strong>
                      <span style={{ fontFamily: s.fontBody, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45, display: 'block', marginBottom: '8px' }}>
                        {node.desc}
                      </span>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        borderTop: '1px dashed rgba(255,255,255,0.1)',
                        paddingTop: '8px',
                        color: 'rgba(255,255,255,0.4)'
                      }}>
                        <span>{node.type}</span>
                        <span style={{ color: '#c6ff34' }}>{node.latency}</span>
                      </div>
                    </div>

                    {/* Premium Integrated Node Card */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      height: '44px',
                      padding: '0 16px 0 12px',
                      background: isHovered ? '#0c0f05' : '#040405',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid ' + (isHovered ? '#c6ff34' : 'rgba(255, 255, 255, 0.08)'),
                      borderRadius: s.cardRadius === '9999px' ? '22px' : s.cardRadius === '0px' ? '0px' : '8px',
                      boxShadow: isHovered
                        ? '0 0 20px rgba(198, 255, 52, 0.12), inset 0 0 10px rgba(198, 255, 52, 0.02)'
                        : '0 4px 12px rgba(0, 0, 0, 0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                      {/* Icon Container */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isHovered ? '#c6ff34' : 'rgba(255, 255, 255, 0.8)',
                        transition: 'color 0.3s'
                      }}>
                        {icons[node.iconKey]}
                      </div>

                      {/* Divider Line */}
                      <div style={{
                        width: '1px',
                        height: '16px',
                        background: isHovered ? 'rgba(198, 255, 52, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s'
                      }} />

                      {/* Text Label */}
                      <span style={{
                        fontFamily: s.fontBody,
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: isHovered ? '#c6ff34' : 'rgba(255, 255, 255, 0.9)',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.01em',
                        transition: 'color 0.3s'
                      }}>
                        {node.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9.4: CASE STUDY SPOTLIGHT (SUCCESS STORY PULL QUOTE) ───

export default memo(IntegrationsHub);
