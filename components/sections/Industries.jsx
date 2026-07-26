'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import CharacterReveal from '../CharacterReveal';

const industriesData = [
  {
    id: "supply-chain",
    title: "Supply Chain & Logistics",
    headlineTitle: "Autonomous Supply Networks & Predictive Routing.",
    headlineBody: "Complex supply chains rarely fail from a lack of data—they fail because that data is trapped across disconnected ERPs, legacy terminals, and manual spreadsheets. We engineer unified data architectures and custom web apps that turn reactive logistics into predictive, self-correcting supply networks.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    ),
    accent: "#c6ff34",
    bentoCards: [
      {
        title: "Advanced Analytics & Real-Time Telemetry",
        tag: "Fabric + Power BI",
        body: "Multi-country inventory tracking featuring real-time bottleneck prediction, dynamic lead-time analysis, and stockout forecasting built over high-speed Direct Lake layers.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      },
      {
        title: "Custom Apps & Field Operations",
        tag: "Power Apps + React/PCF",
        body: "Offline-first mobile and warehouse applications built with custom React/PCF components. Enables floor operators and drivers to manage dispatch, scan inventory, and update manifests in real time without paper.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        )
      },
      {
        title: "Cognitive Automation & Documents",
        tag: "Power Automate",
        body: "Headless RPA bots that automate cross-border document ingestion (invoices, customs declarations, bills of lading), integrated with AI-driven discrepancy matching engines.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )
      },
      {
        title: "Autonomous Agents & Fleet Coordination",
        tag: "Copilot Studio",
        body: "AI Logistics Co-pilots grounded directly in warehouse databases, capable of rerouting shipments, querying supplier APIs, and updating fleet allocation schedules without manual intervention.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 7.54 16.59l-1.42-1.42A8 8 0 1 0 5.88 17.5l-1.42 1.42A10 10 0 0 1 12 2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      }
    ]
  },
  {
    id: "fintech",
    title: "Fintech & Banking",
    headlineTitle: "High-Throughput Liquidity & Automated Compliance.",
    headlineBody: "Financial platforms require zero-latency data synthesis and strict audit enforcement. We build real-time ledger sync, fraud detection algorithms, and automated regulatory reporting suites.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    ),
    accent: "#c6ff34",
    bentoCards: [
      {
        title: "Real-Time Liquidity Telemetry",
        tag: "Power BI + Direct Lake",
        body: "Sub-second financial analytics monitoring cross-border currency flows, treasury reserves, and intra-day risk metrics.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      },
      {
        title: "Institutional Trader Apps",
        tag: "Power Apps + React/PCF",
        body: "Custom pro-code trading interfaces for rapid order processing, client onboarding, and secure portfolio management.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        )
      },
      {
        title: "Automated Compliance Flows",
        tag: "Power Automate",
        body: "Event-driven flows enforcing Anti-Money Laundering (AML) checks, automated KYC verification, and instant audit trail logging.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )
      },
      {
        title: "Cognitive Fraud Copilots",
        tag: "Copilot Studio",
        body: "Autonomous AI agents detecting transaction anomalies, generating compliance risk digests, and flagging high-risk transfers.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 7.54 16.59l-1.42-1.42A8 8 0 1 0 5.88 17.5l-1.42 1.42A10 10 0 0 1 12 2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      }
    ]
  },
  {
    id: "manufacturing",
    title: "Manufacturing 4.0",
    headlineTitle: "Predictive Maintenance & Smart Factory Intelligence.",
    headlineBody: "Unplanned downtime costs millions. We convert raw IoT telemetry into predictive machine maintenance schedules, automated shop floor workflows, and real-time OEE dashboards.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
    ),
    accent: "#c6ff34",
    bentoCards: [
      {
        title: "IoT Telemetry & OEE Analytics",
        tag: "Fabric + Power BI",
        body: "Live sensor data streaming into real-time Overall Equipment Effectiveness (OEE) telemetry, thermal monitoring, and vibration alerts.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      },
      {
        title: "Floor Inspector Mobile Apps",
        tag: "Power Apps + React",
        body: "Ruggedized mobile interfaces for line operators to record quality control checks, trigger work orders, and inspect parts.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        )
      },
      {
        title: "Autonomous Maintenance Flows",
        tag: "Power Automate",
        body: "Automated spare parts re-ordering and technician dispatch triggered instantly when sensor thresholds detect wear.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )
      },
      {
        title: "Factory Floor AI Assistant",
        tag: "Copilot Studio",
        body: "Voice & chat Copilots providing engineers with instant access to machine repair manuals, schematics, and historical repair logs.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 7.54 16.59l-1.42-1.42A8 8 0 1 0 5.88 17.5l-1.42 1.42A10 10 0 0 1 12 2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      }
    ]
  },
  {
    id: "retail",
    title: "Retail & E-Commerce",
    headlineTitle: "Omnichannel Demand Forecasting & Customer Intelligence.",
    headlineBody: "Modern retail demands real-time inventory visibility and personalized customer journeys. We integrate point-of-sale data, e-commerce platforms, and marketing channels into unified business engines.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
    ),
    accent: "#c6ff34",
    bentoCards: [
      {
        title: "Omnichannel Sales Dashboards",
        tag: "Power BI + Direct Lake",
        body: "Unified analytics merging online store orders, physical POS transactions, and customer lifetime value (LTV) cohort metrics.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      },
      {
        title: "Store Manager Operations Apps",
        tag: "Power Apps + PCF",
        body: "Custom mobile apps for in-store staff to manage click-and-collect fulfillment, inventory counts, and floor replenishment.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        )
      },
      {
        title: "Dynamic Pricing & Reorder Automations",
        tag: "Power Automate",
        body: "Automated workflows adjusting product pricing based on competitor feeds and triggering purchase orders for low-stock SKUs.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )
      },
      {
        title: "AI Merchant Assistant",
        tag: "Copilot Studio",
        body: "Generative Copilots assisting category managers with trend analysis, supplier negotiation prep, and automated campaign drafting.",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c6ff34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 7.54 16.59l-1.42-1.42A8 8 0 1 0 5.88 17.5l-1.42 1.42A10 10 0 0 1 12 2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      }
    ]
  }
];

function IndustrySubCard({ card, accent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        position: 'relative'
      }}
    >
      {/* Icon */}
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '12px',
        background: hovered
          ? 'rgba(198, 255, 52, 0.15)'
          : 'rgba(198, 255, 52, 0.07)',
        border: `1px solid ${hovered ? 'rgba(198, 255, 52, 0.4)' : 'rgba(198, 255, 52, 0.18)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c6ff34',
        flexShrink: 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hovered ? '0 0 16px rgba(198, 255, 52, 0.25)' : 'none'
      }}>
        {card.icon}
      </div>

      {/* Title */}
      <h4 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        fontWeight: 700,
        color: '#ffffff',
        margin: 0,
        lineHeight: 1.3,
        letterSpacing: '-0.01em'
      }}>
        {card.title}
      </h4>

      {/* Body */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.88rem',
        color: 'rgba(255, 255, 255, 0.6)',
        lineHeight: 1.6,
        margin: 0
      }}>
        {card.body}
      </p>
    </div>
  );
}

function SupplyChainDigitalTwinLoop({ tick }) {
  return (
    <svg x="-450" y="-430" width="860" height="860" viewBox="0 0 1000 1000" style={{ backgroundColor: 'transparent', overflow: 'visible' }}>
      <defs>
        {/* Paleta de Colores y Variables */}
        <style>{`
:root {
            --bg: #101623;
          --base-grid: rgba(255, 255, 255, 0.03);

          --cube-stroke: #c6ff34;
          --cube-top: rgba(198, 255, 52, 0.15);
          --cube-left: rgba(198, 255, 52, 0.08);
          --cube-right: rgba(198, 255, 52, 0.03);
          --cube-highlight: rgba(198, 255, 52, 0.6);

          --plat-top: #c6ff34;
          --plat-left: #a3e635;
          --plat-right: #84cc16;
          --plat-glow: rgba(198, 255, 52, 0.4);

          --map-bg: #0f172a;
          --map-land: #1e293b;
          --map-stroke: #334155;

          --ui-bg: #141c2b;
          --ui-screen: #0b1121;
          --ui-border: #1e293b;
          --ui-cyan: #c6ff34;
          --ui-green: #4ade80;
          --ui-blue: #a3e635;
          --ui-text: #94a3b8;

          --data-line: #c6ff34;
          --data-node: #ffffff;
            }

          /* Animaciones */
          @keyframes dataFlow {
            to { stroke-dashoffset: -24; }
            }
          @keyframes dataFlowRev {
            to { stroke-dashoffset: 24; }
            }
          @keyframes pulseNode {
            0%, 100% { transform: scale(1); opacity: 0.8; filter: drop-shadow(0 0 4px var(--data-line)); }
          50% {transform: scale(1.3); opacity: 1; filter: drop-shadow(0 0 8px var(--ui-cyan)); }
            }
          @keyframes floatPlatform {
            0%, 100% { transform: translateY(0px); }
                50% {transform: translateY(-12px); }
            }

          .flow-path {
            stroke-dasharray: 6 6;
          animation: dataFlow 1.5s linear infinite;
            }
          .flow-path-fast {
            stroke-dasharray: 4 8;
          animation: dataFlowRev 1s linear infinite;
            }
          .node {
            transform-box: fill-box;
          transformOrigin: center;
          animation: pulseNode 2s ease-in-out infinite;
            }
          .node-delay {
            animation-delay: 1s;
            }
          .hover-group {
            animation: floatPlatform 6s ease-in-out infinite;
            }
`}</style>

        {/* Filtros */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-strong" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComponentTransfer in="blur" result="glow">
            <feFuncA type="linear" slope="1.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Componente Reutilizable: Cubo Isométrico Preciso */}
        <g id="iso-cube">
          {/* Aristas Traseras (Wireframe interno) */}
          <path d="M 0,0 L -52,30 L -52,90" fill="none" stroke="var(--cube-stroke)" strokeWidth="0.5" opacity="0.3" />
          <path d="M 0,0 L 52,30 L 52,90" fill="none" stroke="var(--cube-stroke)" strokeWidth="0.5" opacity="0.3" />
          <path d="M 0,0 L 0,60" fill="none" stroke="var(--cube-stroke)" strokeWidth="0.5" opacity="0.3" />

          {/* Caras Sólidas Traslúcidas */}
          <path d="M 0,-30 L 52,0 L 0,30 L -52,0 Z" fill="var(--cube-top)" stroke="var(--cube-stroke)" strokeWidth="1" strokeLinejoin="round" />
          <path d="M -52,0 L 0,30 L 0,90 L -52,60 Z" fill="var(--cube-left)" stroke="var(--cube-stroke)" strokeWidth="1" strokeLinejoin="round" />
          <path d="M 0,30 L 52,0 L 52,60 L 0,90 Z" fill="var(--cube-right)" stroke="var(--cube-stroke)" strokeWidth="1" strokeLinejoin="round" />

          {/* Highlight/Brillo */}
          <path d="M -52,0 L 0,30" fill="none" stroke="var(--cube-highlight)" strokeWidth="1.5" />
          <path d="M 0,-30 L -52,0" fill="none" stroke="var(--cube-highlight)" strokeWidth="1.5" opacity="0.5" />
        </g>
      </defs>

      {/* CAPA 0: FONDO Y GRID ISOMÉTRICO */}
      <g transform="matrix(0.866, 0.5, -0.866, 0.5, 500, 600)" stroke="var(--base-grid)" strokeWidth="1" fill="none">
        <path d="M -400,-400 L 400,-400 L 400,400 L -400,400 Z" />
        <path d="M -200,-400 L -200,400 M 0,-400 L 0,400 M 200,-400 L 200,400" />
        <path d="M -400,-200 L 400,-200 M -400,0 L 400,0 M -400,200 L 400,200" />
      </g>

      {/* CAPA 1: MATRIZ DE CUBOS DE DATOS (3x3) */}
      <g id="storage-cluster">
        <use href="#iso-cube" x="500" y="570" />
        <use href="#iso-cube" x="448" y="600" />
        <use href="#iso-cube" x="552" y="600" />
        <use href="#iso-cube" x="396" y="630" />
        <use href="#iso-cube" x="500" y="630" />
        <use href="#iso-cube" x="604" y="630" />
        <use href="#iso-cube" x="448" y="660" />
        <use href="#iso-cube" x="552" y="660" />
        <use href="#iso-cube" x="500" y="690" />

        <circle cx="500" cy="540" r="3" fill="var(--ui-cyan)" filter="url(#glow)" />
        <circle cx="448" cy="570" r="2.5" fill="var(--data-node)" filter="url(#glow)" />
        <circle cx="552" cy="570" r="2.5" fill="var(--data-node)" filter="url(#glow)" />
        <circle cx="500" cy="600" r="3" fill="var(--ui-cyan)" filter="url(#glow)" />
        <circle cx="396" cy="600" r="2" fill="var(--data-node)" opacity="0.6" />
        <circle cx="604" cy="600" r="2" fill="var(--data-node)" opacity="0.6" />
      </g>

      {/* CAPA 2: LÍNEAS DE CONEXIÓN VERTICALES */}
      <g fill="none" stroke="var(--data-line)" strokeWidth="1.5" filter="url(#glow)">
        <path d="M 500,455 C 500,480 500,510 500,540" className="flow-path" strokeWidth="2" opacity="0.9" />
        <path d="M 450,430 C 420,470 430,530 448,570" className="flow-path-fast" opacity="0.7" />
        <path d="M 550,430 C 580,470 570,530 552,570" className="flow-path" opacity="0.7" />
        <path d="M 400,400 C 350,460 370,530 396,600" className="flow-path-fast" opacity="0.5" strokeWidth="1" />
        <path d="M 600,400 C 650,460 630,530 604,600" className="flow-path" opacity="0.5" strokeWidth="1" />
        <path d="M 480,480 C 470,520 490,560 500,600" className="flow-path-fast" opacity="0.8" />
      </g>

      {/* CAPA 3: PLATAFORMA SUPERIOR (Animada) */}
      <g className="hover-group">

        {/* 3.1 BASE 3D DE LA PLATAFORMA */}
        <g id="platform-base">
          <path d="M 500,285 L 682,390 L 500,495 L 318,390 Z" fill="rgba(0,0,0,0.5)" filter="url(#glow-strong)" transform="translate(0, 30)" />
          <path d="M 318,350 L 500,455 L 500,490 L 318,385 Z" fill="var(--plat-left)" stroke="rgba(198, 255, 52, 0.4)" strokeWidth="0.5" />
          <path d="M 500,455 L 682,350 L 682,385 L 500,490 Z" fill="var(--plat-right)" stroke="rgba(198, 255, 52, 0.4)" strokeWidth="0.5" />
          <path d="M 500,245 L 682,350 L 500,455 L 318,350 Z" fill="var(--plat-top)" stroke="var(--cube-highlight)" strokeWidth="1" strokeLinejoin="round" />
        </g>

        {/* 3.2 MAPA MUNDIAL E INTERFAZ TOP */}
        <g transform="matrix(0.866, 0.5, -0.866, 0.5, 500, 245)">
          <rect x="5" y="5" width="200" height="200" fill="var(--map-bg)" stroke="var(--cube-highlight)" strokeWidth="0.5" rx="4" />

          {/* NUEVO MAPA DETALLADO (Proyectado perfectamente al espacio isométrico) */}
          <svg x="5" y="5" width="200" height="200" viewBox="9 3 940 530" preserveAspectRatio="xMidYMid meet">
            <g fill="var(--map-land)" stroke="var(--map-stroke)" strokeWidth="2" strokeLinejoin="round">
              <g cc="tr"><path d="M558.7,209.19l-2.23,2.36l-8.2-0.24l-4.92-2.95l-4.8-0.12l-5.51,3.9l-5.16,0.24l-0.47,2.95h-5.86l-2.34,2.13v1.18l1.41,1.18v1.3l-0.59,1.54l0.59,1.3l1.88-0.94l1.88,2.01l-0.47,1.42l-0.7,0.95l1.05,1.18l5.16,1.06l3.63-1.54v-2.24l1.76,0.35l4.22,2.48l4.57-0.71l1.99-1.89l1.29,0.47v2.13h1.76l1.52-2.95l13.36-1.42l5.83-0.71l-1.54-2.02l-0.03-2.73l1.17-1.4l-4.26-3.42l0.23-2.95h-2.34L558.7,209.19L558.7,209.19z" /><path d="M523.02,209.7l-0.16,3.55l3.1-0.95l1.42-0.95l-0.42-1.54l-1.47-1.17L523.02,209.7L523.02,209.7z" /></g><g cc="gr"><path d="M506.71,217.6l-0.11,1.33l4.63,2.33l2.21,0.85l-1.16,1.22l-2.58,0.26l-0.37,1.17l0.89,2.01l2.89,1.54l1.26,0.11l0.16-3.45l1.89-2.28l-5.16-6.1l0.68-2.07l1.21-0.05l1.84,1.48l1.16-0.58l0.37-2.07l5.42,0.05l0.21-3.18l-2.26,1.59l-6.63-0.16l-4.31,2.23L506.71,217.6L506.71,217.6z" /><path d="M516.76,230.59l1.63,0.05l0.68,1.01h2.37l1.58-0.58l0.53,0.64l-1.05,1.38l-4.63,0.16l-0.84-1.11l-0.89-0.53L516.76,230.59L516.76,230.59z" /></g><g cc="id"><path d="M781.68,324.4l-2.31,8.68l-12.53,4.23l-3.75-4.4l-1.82,0.5l3.4,13.12l5.09,0.57l6.79,2.57v2.57l3.11-0.57l4.53-6.27v-5.13l2.55-5.13l2.83,0.57l-3.4-7.13l-0.52-4.59L781.68,324.4L781.68,324.4z" /><path d="M831.93,339.34l-4.17,0.47l-2.68,1.96l1.11,2.24l4.54,0.84v0.84l-2.87,2.33l1.39,4.85l1.39,0.09l1.2-4.76h2.22l0.93,4.66l10.83,8.96l0.28,7l3.7,4.01l1.67-0.09l0.37-24.72l-6.29-4.38l-5.93,4.01l-2.13,1.31l-3.52-2.24l-0.09-7.09L831.93,339.34L831.93,339.34z" /><path d="M789.53,349.11l2.26,2.77l-1.47,4.16v0.79h3.34l1.18-10.4l1.08,0.3l1.96,9.5l1.87,0.5l1.77-4.06l-1.77-6.14l-1.47-2.67l4.62-3.37l-1.08-1.49l-4.42,2.87h-1.18l-2.16-3.17l0.69-1.39l3.64-1.78l5.5,1.68l1.67-0.1l4.13-3.86l-1.67-1.68l-3.83,2.97h-2.46l-3.73-1.78l-2.65,0.1l-2.95,4.75l-1.87,8.22L789.53,349.11L789.53,349.11z" /><path d="M814.19,330.5l-1.87,4.55l2.95,3.86h0.98l1.28-2.57l0.69-0.89l-1.28-1.39l-1.87-0.69L814.19,330.5L814.19,330.5z" /><path d="M819.99,345.45l-4.03,0.89l-1.18,1.29l0.98,1.68l2.65-0.99l1.67-0.99l2.46,1.98l1.08-0.89l-1.96-2.38L819.99,345.45L819.99,345.45z" /><path d="M722.48,317.57l-0.28,2.28l6.79,11.41h1.98l14.15,23.67l5.66,0.57l2.83-8.27l-4.53-2.85l-0.85-4.56L722.48,317.57L722.48,317.57z" /><path d="M753.17,358.32l-2.75,1.88l0.59,1.58l8.75,1.98l4.42,0.79l1.87,1.98l5.01,0.4l2.36,1.98l2.16-0.5l1.97-1.78l-3.64-1.68l-3.14-2.67l-8.16-1.98L753.17,358.32L753.17,358.32z" /><path d="M806.14,368.42l-5.11,4.26l0.49,1.09l2.16-0.4l2.55-2.38l5.01-0.69l-0.98-1.68L806.14,368.42L806.14,368.42z" /><path d="M791.69,367.72l-0.59,1.19l4.42,0.69l3.44-1.98l-1.96-0.59l-3.14,0.89l-1.18-0.99L791.69,367.72L791.69,367.72z" /><path d="M781.77,366.93l-2.16,1.19l1.28,1.39l3.14-1.19L781.77,366.93L781.77,366.93z" /><path d="M785.5,366.04l0.39,1.88l2.26,0.59l0.88-1.09l-0.98-1.49L785.5,366.04L785.5,366.04z" /><path d="M790.91,370.99l-2.75,0.4l2.46,2.08h1.96L790.91,370.99L790.91,370.99z" /></g><g cc="sb"><path d="M895.43,364.65l0.15,2.28l1.39,1.32l1.31-0.81l-1.17-2.43L895.43,364.65L895.43,364.65z" /><path d="M897.18,370.31l-1.17,1.25l1.24,2.28l1.46,0.44l-0.07-1.54L897.18,370.31L897.18,370.31z" /><path d="M900.03,368.99l1.02,2.5l1.97,2.35l1.09-1.76l-1.46-2.5L900.03,368.99L900.03,368.99z" /><path d="M905.14,372.74l0.58,3.09l1.39,1.91l1.17-2.42L905.14,372.74L905.14,372.74z" /><path d="M906.74,379.65l-0.51,0.88l1.68,2.21l1.17,0.07l-0.73-2.87L906.74,379.65L906.74,379.65z" /><path d="M903.02,384.05l-1.75,0.81l1.53,2.13l1.31-0.74L903.02,384.05L903.02,384.05z" /></g><g cc="pg"><path d="M852.76,348.29l-0.37,24.44l3.52-0.19l4.63-5.41l3.89,0.19l2.5,2.24l0.83,6.9l7.96,4.2l2.04-0.75v-2.52l-6.39-5.32l-3.15-7.28l2.5-1.21l-1.85-4.01l-3.7-0.09l-0.93-4.29l-9.81-6.62L852.76,348.29L852.76,348.29z" /><path d="M882.89,355.03l-0.95,0.22l-0.58,2.57l-1.82,1.18l-5.47,0.96l0.22,2.06l5.76-0.29l3.65-2.28l-0.22-3.97L882.89,355.03L882.89,355.03z" /><path d="M880.48,349l-0.88,1.25l4.81,4.26l0.66,2.5l1.31-0.15l0.15-2.57l-1.46-1.32L880.48,349L880.48,349z" /><path d="M889.38,359.51l1.24,3.45l2.19,2.13l0.66-0.59l-0.22-2.28l-2.48-3.01L889.38,359.51L889.38,359.51z" /></g><g cc="sj"><path d="M488.26,53.96l-1.65-1.66l-3.66,1.78h-6.72L475.17,58l3.77,3.33l1.65-0.24l2.36-4.04l2,1.43l-1.42,2.85l-0.71,4.16l1.65,2.61l3.54-5.94l4.6-5.59l-1.77-1.54L488.26,53.96L488.26,53.96z" /><path d="M490.26,46.83l-2.95,2.73l1.77,2.73h3.18l1.3,1.78l3.89,2.02l4.48-2.61l3.07-2.61l-1.06-2.14l-3.07-1.78l-2.24,2.02l-1.53-1.9l-1.18,0.12l-1.53,3.33l-2.24-2.26l-0.24-1.54L490.26,46.83L490.26,46.83z" /><path d="M496.98,59.07l-2.36,2.14l-2,1.54l0.94,1.66l1.89,0.59l3.07-1.43l1.42-1.78l-1.3-2.14L496.98,59.07L496.98,59.07z" /></g><g cc="jp"><path d="M808.2,206.98l-4.88,5.59l0.86,1.35l2.39,0.29l4.49-3.47l3.16-0.58l2.87,3.37l2.2-0.77l0.86-3.28l4.11-0.1l4.02-4.82l-2.1-8l-0.96-4.24l2.1-1.73l-4.78-7.22l-1.24,0.1l-2.58,2.89v2.41l1.15,1.35l0.38,6.36l-2.96,3.66l-1.72-1.06l-1.34,2.99l-0.29,2.79l1.05,1.64l-0.67,1.25l-2.2-1.83h-1.53l-1.34,0.77L808.2,206.98L808.2,206.98z" /><path d="M816.43,163.44l-1.53,1.35l0.77,2.89l1.34,1.35l-0.1,4.43l-1.72,0.67l-1.34,2.99l3.92,5.39l2.58-0.87l0.48-1.35l-2.77-2.5l1.72-2.22l1.82,0.29l1.43,1.54l0.1-3.18l3.92-3.18l2.2-0.58l-1.82-3.08l-0.86-1.35l-1.43,0.96l-1.24,1.54l-2.68-0.58l-2.77-1.83L816.43,163.44L816.43,163.44z" /><path d="M830.86,160.45l-2.68,3.76l0.19,1.83l1.34-0.58l3.15-3.95L830.86,160.45L830.86,160.45z" /><path d="M834.4,154.96l-0.96,2.6l0.1,1.73l1.63-1.06l1.53-3.08V154L834.4,154.96L834.4,154.96z" /><path d="M803.23,216.42l-1.63,1.64l0.67,2.31l1.43,0.1l0.96,5.01l1.15,1.25l2.01-1.83l0.86-3.28l-2.49-3.56L803.23,216.42L803.23,216.42z" /><path d="M812.03,213.15l-2.77,2.6l-0.1,2.99l0.67,0.87l3.73-3.18l-0.29-3.18L812.03,213.15L812.03,213.15z" /></g><path cc="tw" d="M787.46,248.31l-3.54,2.7l-0.19,5.2l3.06,3.56l0.76-0.67L787.46,248.31L787.46,248.31z" /><path cc="kp" d="M778.28,194.27l1.84,0.77l0.56,6.44l3.65,0.21l3.44-4.03l-1.19-1.06l0.14-4.32l3.16-3.82l-1.61-2.9l1.05-1.2l0.58-3l-1.83-0.83l-1.56,0.79l-1.93,5.86l-3.12-0.27l-3.61,4.26L778.28,194.27L778.28,194.27z" /><path cc="kr" d="M788.34,198.2l6.18,5.04l1.05,4.88l-0.21,2.62l-3.02,3.4l-2.6,0.14l-2.95-6.37l-1.12-3.04l1.19-0.92l-0.28-1.27l-1.47-0.66L788.34,198.2L788.34,198.2z" /><path cc="mm" d="M729.44,303.65l-2.77-4.44l2.01-2.82l-1.9-3.49l-1.79-0.34l-0.34-5.86l-2.68-5.19l-0.78,1.24l-1.79,3.04l-2.24,0.34l-1.12-1.47l-0.56-3.95l-1.68-3.16l-6.84-6.45l1.68-1.11l0.31-4.67l2.5-4.2l1.08-10.45l3.62-2.47l0.12-3.81l2.17,0.72l3.42,4.95l-2.54,5.44l1.71,4.27l4.23,1.66l0.77,4.65l5.68,0.88l-1.57,2.71l-7.16,2.82l-0.78,4.62l5.26,6.76l0.22,3.61l-1.23,1.24l0.11,1.13l3.92,5.75l0.11,5.97L729.44,303.65L729.44,303.65z" /><path cc="th" d="M730.03,270.47l3.24,4.17v5.07l1.12,0.56l5.15-2.48l1.01,0.34l6.15,7.1l-0.22,4.85l-2.01-0.34l-1.79-1.13l-1.34,0.11l-2.35,3.94l0.45,2.14l1.9,1.01l-0.11,2.37l-1.34,0.68l-4.59-3.16v-2.82l-1.9-0.11l-0.78,1.24l-0.4,12.62l2.97,5.42l5.26,5.07l-0.22,1.47l-2.8-0.11l-2.57-3.83h-2.69l-3.36-2.71l-1.01-2.82l1.45-2.37l0.5-2.14l1.58-2.8l-0.07-6.44l-3.86-5.58l-0.16-0.68l1.25-1.26l-0.29-4.43l-5.14-6.51l0.6-3.75L730.03,270.47L730.03,270.47z" /><g cc="ru"><path d="M739.76,12.8l2.69,2.26l1.91-0.79l0.56-3.17L741,8.39l-2.58,1.7l-6.28,0.57v2.83l-6.62,0.11v4.63l7.74,5.76l2.02-1.47l-0.45-4.07l4.94-1.24l-1.01-1.92l-1.79-1.81L739.76,12.8L739.76,12.8z" /><path d="M817.97,72.93l1.76,6.08l3.52,1.01l3.52-5.57l-2.01-3.8l0.75-3.29h5.28l-1.26,2.53l0.5,9.12l-7.54,18.74l0.75,4.05l-0.25,6.84l14.07,20.51l2.76,0.76l0.25-16.71l2.76-2.53l-3.02-6.58l2.51-2.79l-5.53-7.34l-3.02,0.25l-1-12.15l7.79-2.03l0.5-3.55l4.02-1.01l2.26,2.03l2.76-11.14l4.77-8.1l3.77-2.03l3.27,0.25v-3.8l-5.28-1.01l-7.29-6.08l3.52-4.05l-3.02-6.84l2.51-2.53l3.02,4.05l7.54,2.79l8.29,0.76l1.01-3.54l-4.27-4.3l4.77-6.58l-10.81-3.8l-2.76,5.57l-3.52-4.56l-19.85-6.84l-18.85,3.29l-2.76,1.52v1.52l4.02,2.03l-0.5,4.81l-7.29-3.04l-16.08,6.33l-2.76-5.82h-11.06l-5.03,5.32l-17.84-4.05l-16.33,3.29l-2.01,5.06l2.51,0.76l-0.25,3.8l-15.83,1.77l1.01,5.06l-14.58-2.53l3.52-6.58l-14.83-0.76l1.26,6.84l-4.77,2.28l-4.02-3.8l-16.33,2.79l-6.28,5.82l-0.25,3.54l-4.02,0.25l-0.5-4.05l12.82-11.14v-7.6l-8.29-2.28l-10.81,3.54l-4.52-4.56h-2.01l-2.51,5.06l2.01,2.28l-14.33,7.85l-12.31,9.37l-7.54,10.38v4.3l8.04,3.29l-4.02,3.04l-8.54-3.04l-3.52,3.04l-5.28-6.08l-1.01,2.28l5.78,18.23l1.51,0.51l4.02-2.03l2.01,1.52v3.29l-3.77-1.52l-2.26,1.77l1.51,3.29l-1.26,8.61l-7.79,0.76l-0.5-2.79l4.52-2.79l1.01-7.6l-5.03-6.58l-1.76-11.39l-8.04-1.27l-0.75,4.05l1.51,2.03l-3.27,2.79l1.26,7.6l4.77,2.03l1.01,5.57l-4.78-3.04l-12.31-2.28l-1.51,4.05l-9.8,3.54l-1.51-2.53l-12.82,7.09l-0.25,4.81l-5.03,0.76l1.51-3.54v-3.54l-5.03-1.77l-3.27,1.27l2.76,5.32l2.01,3.54v2.79l-3.77-0.76l-0.75-0.76l-3.77,4.05l2.01,3.54l-8.54-0.25l2.76,3.55l-0.75,1.52h-4.52l-3.27-2.28l-0.75-6.33l-5.28-2.03v-2.53l11.06,2.28l6.03,0.51l2.51-3.8l-2.26-4.05l-16.08-6.33l-5.55,1.38l-1.9,1.63l0.59,3.75l2.36,0.41l-0.55,5.9l7.28,17.1l-5.26,8.34l-0.36,1.88l2.67,1.88l-2.41,1.59l-1.6,0.03l0.3,7.35l2.21,3.13l0.03,3.04l2.83,0.26l4.33,1.65l4.58,6.3l0.05,1.66l-1.49,2.55l3.42-0.19l3.33,0.96l4.5,6.37l11.08,1.01l-0.48,7.58l-3.82,3.27l0.79,1.28l-3.77,4.05l-1,3.8l2.26,3.29l7.29,2.53l3.02-1.77l19.35,7.34l0.75-2.03l-4.02-3.8v-4.81l-2.51-0.76l0.5-4.05l4.02-4.81l-7.21-5.4l0.5-7.51l7.71-5.07l9.05,0.51l1.51,2.79l9.3,0.51l6.79-3.8l-3.52-3.8l0.75-7.09l17.59-8.61l13.53,6.1l4.52-4.05l13.32,12.66l10.05-1.01l3.52,3.54l9.55,1.01l6.28-8.61l8.04,3.55l4.27,0.76l4.27-3.8l-3.77-2.53l3.27-5.06l9.3,3.04l2.01,4.05l4.02,0.25l2.51-1.77l6.79-0.25l0.75,1.77l7.79,0.51l5.28-5.57l10.81,1.27l3.27-1.27l1-6.08l-3.27-7.34l3.27-2.79h10.3l9.8,11.65l12.56,7.09h3.77l0.5-3.04l4.52-2.79l0.5,16.46l-4.02,0.25v4.05l2.26,2.79l-0.42,3.62l1.67,0.69l1.01-2.53l1.51,0.51l1,1.01l4.52-1.01l4.52-13.17l0.5-16.46l-5.78-13.17l-7.29-8.86l-3.52,0.51v2.79l-8.54-3.29l3.27-7.09l2.76-18.74l11.56-3.54l5.53-3.54h6.03L805.86,96l1.51,2.53l5.28-5.57l3.02,0.25l-0.5-3.29l-4.78-1.01l3.27-11.9L817.97,72.93L817.97,72.93z" /><path d="M798.64,122.59l-0.09,6.17l7.74,11.95l2.77,10.4l4.88,9.25l1.91,0.67l1.63-1.35l0.76-2.22l-6.98-7.61l0.19-3.95l1.53-0.67l0.38-2.31l-13.67-19.36L798.64,122.59L798.64,122.59z" /><path d="M746.49,23.31l-3.48-0.9L741,24.56l-0.9,2.94l4.71-0.45l3.59-1.81L746.49,23.31L746.49,23.31z" /><path d="M746.94,10.09l1.79,3.39l6.96-0.79l1.91-2.49l-0.45-2.15l-1.91-0.79l-1.79,1.36l-5.16,1.13L746.94,10.09L746.94,10.09z" /><path d="M547.82,38.79l1.72,0.69l-1.21,2.08v2.95l-2.58,1.56H543l-1.55-1.91l0.17-2.08l1.21-1.56h2.41L547.82,38.79L547.82,38.79z" /><path d="M584.49,51.98l-0.52,2.43l-3.96,3.47l-8.44,1.91l-6.89,11.45l-1.21,3.3l6.89,1.74l1.03-4.16l2.07-6.42l5.34-2.78l4.48-3.47l3.27-1.39h1.72v-4.68L584.49,51.98L584.49,51.98z" /><path d="M562.28,77.31l4.65,0.52l1.55,5.38l3.96,4.16l-1.38,2.78h-2.41l-2.24-2.6l-4.99-0.17l-2.07-2.78v-1.91l3.1-0.87L562.28,77.31L562.28,77.31z" /><path d="M554.36,36.88v2.08l1.72,1.39l2.41-0.17l2.07-1.91v-1.39h-1.89l-1.55,0.52l-1.21-1.39L554.36,36.88L554.36,36.88z" /><path d="M564.18,37.06l1.21,2.6l2.41,0.17l1.72-0.69l-0.86-2.43l-2.24-0.52L564.18,37.06L564.18,37.06z" /><path d="M573.99,33.59l-1.89-0.35l-1.72,1.74l0.86,1.56l0.52,2.43l2.24-1.73l0.52-1.91L573.99,33.59L573.99,33.59z" /><path d="M634.95,18.15l-2.24-1.39h-2.58l-0.52,1.56l-2.75,1.56l-2.07,0.69l-0.34,2.08l4.82,0.35L634.95,18.15L634.95,18.15z" /><path d="M640.28,18.67l-1.21,2.6l-2.41-0.17l-3.79,2.78l-1.03,3.47h2.41l1.38-2.26l3.27,2.43l3.1-1.39l2.24-1.91l-0.86-2.95l-1.21-2.08L640.28,18.67L640.28,18.67z" /><path d="M645.28,20.58l1.21,4.86l1.89,4.51l2.07-3.64l3.96-0.87v-2.6l-2.58-1.91L645.28,20.58L645.28,20.58z" /><path d="M836.68,3.76l-2.92-0.9L830.4,4.1l-1.68,2.49l2.13,2.83l5.61-2.49l1.12-1.24L836.68,3.76L836.68,3.76z" /><path d="M840.04,132.03l-1.24,1.54l0.1,2.41l1.15-0.1l1.91-3.37L840.04,132.03L840.04,132.03z" /><path d="M837.75,137.91v4.24l1.34,0.48l0.96-1.54v-3.27L837.75,137.91L837.75,137.91z" /><path d="M506.61,151.72l-1.5-0.15l-2.7,3.23v1.51l0.9,0.35l1.75,0.05l2.9-2.37l0.4-0.81L506.61,151.72L506.61,151.72z" /></g><path cc="lk" d="M680.54,308.05l0.25,2.72l0.25,1.98l-1.47,0.25l0.74,4.45l2.21,1.24l3.43-1.98l-0.98-4.69l0.25-1.73l-3.19-2.96L680.54,308.05L680.54,308.05z" /><path cc="in" d="M670.98,313.01l4.58-2.24l2.72-9.84l-0.12-12.08l15.58-16.82v-3.99l3.21-1.25l-0.12-4.61l-3.46-6.73l1.98-3.61l4.33,3.99l5.56,0.25v2.24l-1.73,1.87l0.37,1l2.97,0.12l0.62,3.36h0.87l2.23-3.99l1.11-10.46l3.71-2.62l0.12-3.61l-1.48-2.87l-2.35-0.12l-9.2,6.08l0.58,3.91l-6.46-0.02l-2.28-2.79l-1.24,0.16l0.42,3.88l-13.97-1l-8.66-3.86l-0.46-4.75l-5.77-3.58l-0.07-7.37l-3.96-4.53l-9.1,0.87l0.99,3.96l4.46,3.61l-7.71,15.78l-5.16,0.39l-0.85,1.9l5.08,4.7l-0.25,4.75l-5.19-0.08l-0.56,2.36l4.31-0.19l0.12,1.87l-3.09,1.62l1.98,3.74l3.83,1.25l2.35-1.74l1.11-3.11l1.36-0.62l1.61,1.62l-0.49,3.99l-1.11,1.87l0.25,3.24L670.98,313.01L670.98,313.01z" /><g cc="it"><path d="M477.56,213.38l-2.65,1.34l0.35,5.17l2.12,0.36l1.59-1.52v-4.9L477.56,213.38L477.56,213.38z" /><path d="M472.27,196.98l-0.62,1.57l0.17,1.71l2.39,2.79l3.76-0.13l8.3,9.64l5.18,1.5l3.06,2.89l0.73,6.59l1.64-0.96l1.42-3.59l-0.35-2.58l2.43-0.22l0.35-1.46l-6.85-3.28l-6.5-6.39l-2.59-3.82l-0.63-3.63l3.31-0.79l-0.85-2.39l-2.03-1.71l-1.75-0.08l-2.44,0.67l-2.3,3.22l-1.39,0.92l-2.15-1.32L472.27,196.98L472.27,196.98z" /><path d="M492.44,223.02l-1.45-0.78l-4.95,0.78l0.17,1.34l4.45,2.24l0.67,0.73l1.17,0.17L492.44,223.02L492.44,223.02z" /></g><path cc="mt" d="M492.61,230.47l-1.67,0.34l0.06,1.85l1.5,0.5l0.67-0.56L492.61,230.47L492.61,230.47z" /><path cc="rw" d="M537.82,339.9l2.81,2.59l-0.12,2.77l-4.36,0.09v-3.06L537.82,339.9L537.82,339.9z" /><path cc="ug" d="M538.3,339.09l3.03,2.84l1.9-1.21l5.14-0.84l0.88,0.09l0.33-1.95l2.9-6.1l-2.44-5.08l-7.91,0.05l-0.05,2.09l1.06,1.02l-0.16,2.09L538.3,339.09L538.3,339.09z" /><path cc="ke" d="M550.83,326.52l2.66,5.19l-3.19,6.69l-0.42,2.03l15.93,9.85l4.94-7.76l-2.5-2.03l-0.05-10.22l3.13-3.42l-4.99,1.66l-3.77,0.05l-5.9-4.98l-1.86-0.8l-3.45,0.32l-0.61,1.02L550.83,326.52L550.83,326.52z" /><path cc="mw" d="M547.16,379.4l3.11,3.25l-0.06,4.16l0.6,1.75l4.13-4.46l-0.48-5.67l-2.21-1.69l-1.97-9.95l-3.41-0.12l1.55,7.17L547.16,379.4L547.16,379.4z" /><path cc="mz" d="M541.17,413.28l2.69,2.23l6.34-3.86l1.02-5.73v-9.46l10.17-8.32l1.74,0.06l6.16-5.91l-0.96-12.18L552,372.17l0.48,3.68l2.81,2.17l0.66,6.63l-5.5,5.37l-1.32-3.01l0.24-3.98l-3.17-3.44l-7.78,3.62l7.24,3.68l0.24,10.73l-4.79,7.11L541.17,413.28L541.17,413.28z" /><path cc="zw" d="M524.66,392.3l8.97,10.13l6.88,1.75l4.61-7.23l-0.36-9.58l-7.48-3.86l-2.81,1.27l-4.19,6.39l-5.8-0.06L524.66,392.3L524.66,392.3z" /><path cc="na" d="M496.55,421.96l3.35,0.24l1.97,1.99l4.67,0.06l1.14-13.26v-8.68l2.99-0.6l1.14-9.1l7.6-0.24l2.69-2.23l-4.55-0.18l-6.16,0.84l-6.64-2.41h-18.66l0.48,5.3l6.22,9.16l-1.08,4.7l0.06,2.47L496.55,421.96L496.55,421.96z" /><path cc="bw" d="M508.51,411.23l2.15,0.66l-0.3,6.15l2.21,0.3l5.08-4.58l6.1,0.66l1.62-4.1l7.72-7.05l-9.27-10.67l-0.12-1.75l-1.02-0.3l-2.81,2.59l-7.3,0.18l-1.02,9.1l-2.87,0.66L508.51,411.23L508.51,411.23z" /><path cc="sz" d="M540.87,414l-2.51,0.42l-1.08,2.95l1.92,1.75h2.33l1.97-2.83L540.87,414L540.87,414z" /><path cc="ls" d="M527.41,425.39l3.05-2.35l1.44,0.06l1.74,2.17l-0.18,2.17l-2.93,1.08v0.84l-3.23-0.18l-0.78-2.35L527.41,425.39L527.41,425.39z" /><path cc="za" d="M534.16,403.63l-7.9,7.3l-1.88,4.51l-6.26-0.78l-5.21,4.63l-3.46-0.34l0.28-6.4l-1.23-0.43l-0.86,13.09l-6.14-0.06l-1.85-2.18l-2.71-0.03l2.47,7.09l4.41,4.17l-3.15,3.67l2.04,4.6l4.72,1.8l3.76-3.2l10.77,0.06l0.77-0.96l4.78-0.84l16.17-16.1l-0.06-5.07l-1.73,2.24h-2.59l-3.15-2.64l1.6-3.98l2.75-0.56l-0.25-8.18L534.16,403.63L534.16,403.63z M530.37,422.13l1.51-0.06l2.45,2.66l-0.07,3.08l-2.87,1.45l-0.18,1.02l-4.38,0.05l-1.37-3.3l1.25-2.42L530.37,422.13L530.37,422.13z" /><path cc="eg" d="M521.93,243.06l2.67,0.07l5.2,1.44l2.47,0.07l3.06-2.56h1.43l2.6,1.44h3.29l0.59-0.04l2.08,5.98l0.59,1.93l0.55,2.89l-0.98,0.72l-1.69-0.85l-1.95-6.36l-1.76-0.13l-0.13,2.16l1.17,3.74l9.37,11.6l0.2,4.98l-2.73,3.15L522.32,273L521.93,243.06L521.93,243.06z" /><path cc="tn" d="M474.91,227.33l5.53-2.23l1.82,1.18l0.07,1.44l-0.85,1.11l0.13,1.97l0.85,0.46v3.54l-0.98,1.64l0.13,1.05l3.71,1.31l-2.99,4.65l-1.17-0.07l-0.2,3.74l-1.3,0.2l-1.11-0.98l0.26-3.8l-3.64-3.54l-0.46-3.08l1.76-1.38L474.91,227.33L474.91,227.33z" /><path cc="ly" d="M480.05,248.03l1.56-0.26l0.46-3.6h0.78l3.19-5.24l7.87,2.29l2.15,3.34l7.74,3.54l4.03-1.7l-0.39-1.7l-1.76-1.7l0.2-1.18l2.86-2.42h5.66l2.15,2.88l4.55,0.66l0.59,36.89l-3.38-0.13l-20.42-10.62l-2.21,1.25l-8.39-2.1l-2.28-3.01l-3.32-0.46l-1.69-3.01L480.05,248.03L480.05,248.03z" /><path cc="dz" d="M473.88,227.49l-4.08-1.37l-16.98,3.19l-3.7,2.81l2.26,11.67l-6.75,0.27l-4.06,6.53l-9.67,2.32l0.03,4.75l31.85,24.35l5.43,0.46l18.11-14.15l-1.81-2.28l-3.4-0.46l-2.04-3.42v-14.15l-1.36-1.37l0.23-3.65l-3.62-3.65l-0.45-3.88l1.58-1.14l-0.68-4.11L473.88,227.49L473.88,227.49z" /><path cc="bi" d="M536.21,346.21l4.27-0.09l-1.11,3.74l-1.08,0.94h-1.32l-0.94-2.53L536.21,346.21L536.21,346.21z" /><path cc="tz" d="M550.57,371.42l17.47-2.14l-3.93-7.6l-0.21-7.28l1.27-3.48l-16.62-10.44l-5.21,0.86l-1.81,1.34l-0.16,3.05l-1.17,4.23l-1.22,1.45l-1.75,0.16l3.35,11.61l5.47,2.57l3.77,0.11L550.57,371.42L550.57,371.42z" /><path cc="cf" d="M495.66,324.05l4.66,5.04l1.84-2.38l2.93,0.12l0.63-2.32l2.88-1.8l5.98,4.12l3.45-3.42l13.39,0.59L519,311.18l1.67-1.04l0.23-2.26l-2.82-1.33h-4.14l-6.67,6.61l-0.23,2.72l-5.29-0.17l-0.17,1.16l-3.45-0.35l-3.11,5.91L495.66,324.05L495.66,324.05z" /><path cc="cd" d="M489.38,355.71l10.31-0.18l2.09,2.97l-0.08,2.19l0.77,0.7h5.12l1.47-2.89h2.09l0.85,0.86l2.87-0.08l0.85,10.08l4.96,0.16v0.78l13.33,6.01l0.62,1.17h2.79l-0.31-4.22l-5.04-2.42l0.31-3.2l2.17-5.08l4.96-0.16l-4.26-14.14l0.08-6.01l6.74-10.54l0.08-1.48l-1.01-0.55l0.04-2.86l-1.23-0.11l-1.24-1.58l-20.35-0.92l-3.73,3.63l-6.11-4.02l-2.15,1.32l-1.56,13.13l-3.86,2.98l-1.16,2.64l0.21,3.91l-6.96,5.69l-1.85-0.84l0.25,1.09L489.38,355.71L489.38,355.71z" /><path cc="zm" d="M514.55,384.7l3.17,4.4l4.91,0.3l1.74,0.96l5.14,0.06l4.43-6.21l12.38-5.54l1.08-4.88l-1.44-6.99l-6.46-3.68l-4.31,0.3l-2.15,4.76l0.06,2.17l5.08,2.47l0.3,5.37l-4.37,0.24l-1.08-1.81l-12.14-5.18l-0.36,3.98l-5.74,0.18L514.55,384.7L514.55,384.7z" /><g cc="ye"><path d="M571.99,289.23l1.44,4.28v4.18l3.46,3.14l24.38-9.93l0.23-2.73l-3.91-7.02l-9.81,3.13l-5.63,5.54l-6.53-3.86L571.99,289.23L571.99,289.23z" /><path d="M599.62,299.65l2.13,2.38l2.88-1.74l1.04-0.35l-1.32-1.28l-2.53,0.75L599.62,299.65L599.62,299.65z" /></g><g cc="ao"><path d="M486.55,353.23l1.74,2.26l2.25-2.13l-0.66-2.21l-0.56-0.04L486.55,353.23L486.55,353.23z" /><path d="M488.62,356.71l3.41,12.73l-0.08,4.02l-4.99,5.36l-0.75,8.71l19.2,0.17l6.24,2.26l5.15-0.67l-3-3.76l0.01-10.74l5.9-0.25v-4.19l-4.79-0.2l-0.96-9.92l-2.02,0.03l-1.09-0.98l-1.19,0.06l-1.58,3.06H502l-1.41-1.42l0.42-2.01l-1.66-2.43L488.62,356.71L488.62,356.71z" /></g><path cc="es" d="M448.36,205h-12.74l-2.57-1.16l-1.24,0.09l-1.5,3.12l0.53,3.21l4.87,0.45l0.62,2.05l-2.12,11.95l0.09,2.14l3.45,1.87l3.98,0.27l7.96-1.96l3.89-4.9l0.09-4.99l6.9-6.24l0.35-2.76l-6.28-0.09L448.36,205L448.36,205z" /><path cc="pt" d="M430.93,211.24l-0.62,8.65l-1.77,1.6l0.18,0.98l1.24,2.05l-0.8,2.5l1.33,0.45l3.1-0.36l-0.18-2.5l2.03-11.59l-0.44-1.6L430.93,211.24L430.93,211.24z" /><path cc="mg" d="M592.3,372.92l-2.13,5.06l-3.65,6.44l-6.39,0.46l-2.74,3.22l0.46,9.82l-3.96,4.6l0.46,7.82l3.35,3.83l3.96-0.46l3.96-2.92l-0.91-4.6l9.13-15.8l-1.83-1.99l1.83-3.83l1.98,0.61l0.61-1.53l-1.83-7.82l-1.07-3.22L592.3,372.92L592.3,372.92z" /><path cc="mn" d="M673.8,170.17l5.82-7.72l6.99,3.23l4.75,1.27l5.82-5.34l-3.95-2.91l2.6-3.67l7.76,2.74l2.69,4.41l4.86,0.13l2.54-1.89l5.23-0.21l1.14,1.94l8.69,0.44l5.5-5.61l7.61,0.8l-0.44,7.64l3.33,0.76l4.09-1.86l4.33,2.14l-0.1,1.08l-3.14,0.09l-3.27,6.86l-2.54,0.25l-9.88,12.91l-10.09,4.45l-6.31,0.49l-5.24-3.38l-6.7,3.58l-6.6-2.05l-1.87-4.79l-12.5-0.88l-6.4-10.85l-3.11-0.2L673.8,170.17L673.8,170.17z" /><g cc="cn"><path d="M670.4,170.07l-3.46,8.7l-4.77-0.25l-5.03,11.01l4.27,5.44l-8.8,12.15l-4.52-0.76l-3.02,3.8l0.75,2.28l3.52,0.25l1.76,4.05l3.52,0.76l10.81,13.93v7.09l5.28,3.29l5.78-1.01l7.29,4.3l8.8,2.53l4.27-0.51l4.78-0.51l10.05-6.58l3.27,0.51l1.25,2.97l2.77,0.83l3.77,5.57l-2.51,5.57l1.51,3.8l4.27,1.52l0.75,4.56l5.03,0.51l0.75-2.28l7.29-3.8l4.52,0.25l5.28,5.82l3.52-1.52l2.26,0.25l1.01,2.79l1.76,0.25l2.51-3.54l10.05-3.8l9.05-10.89l3.02-10.38l-0.25-6.84l-3.77-0.76l2.26-2.53l-0.5-4.05l-9.55-9.62v-4.81l2.76-3.54l2.76-1.27l0.25-2.79h-7.04l-1.26,3.8l-3.27-0.76l-4.02-4.3l2.51-6.58l3.52-3.8l3.27,0.25l-0.5,5.82l1.76,1.52l4.27-4.3l1.51-0.25l-0.5-3.29l4.02-4.81l3.02,0.25l1.76-5.57l2.06-1.09l0.21-3.47l-2-2.1l-0.17-5.48l3.85-0.25l-0.25-14.13l-2.7,1.62l-1.01,3.62l-4.51-0.01l-13.07-7.35l-9.44-11.38l-9.58-0.1l-2.44,2.12l3.1,7.1l-1.08,6.66l-3.86,1.6l-2.17-0.17l-0.16,6.59l2.26,0.51l4.02-1.77l5.28,2.53v2.53l-3.77,0.25l-3.02,6.58l-2.76,0.25l-9.8,12.91l-10.3,4.56l-7.04,0.51l-4.77-3.29l-6.79,3.55l-7.29-2.28l-1.76-4.81l-12.31-0.76l-6.53-10.63h-2.76l-2.22-4.93L670.4,170.07z" /><path d="M759.83,270.17l-2.39,0.67l-1.72,2.12l1.43,2.79l2.1,0.19l2.39-2.12l0.57-2.79L759.83,270.17L759.83,270.17z" /></g><g cc="fr"><path d="M460.4,178.7l-2.21,0.54l-4.42,4.81l-1.33,0.09l-1.77-1.25l-1.15,0.27l-0.88,2.76l-6.46,0.18l0.18,1.43l4.42,2.94l5.13,4.1l-0.09,4.9l-2.74,4.81l5.93,2.85l6.02,0.18l1.86-2.14l3.8,0.09l1.06,0.98l3.8-0.27l1.95-2.5l-2.48-2.94l-0.18-1.87l0.53-2.05l-1.24-1.78l-2.12,0.62l-0.27-1.6l4.69-5.17v-3.12l-3.1-1.78l-1.59-0.27L460.4,178.7L460.4,178.7z" /><path d="M477.83,206.96l-1.95,1.96l-0.18,1.78l1.59,0.98l0.62-0.09l0.35-2.59L477.83,206.96L477.83,206.96z" /></g><g cc="nz"><path d="M913.02,481.96l1.06,11.8l-1.42,5.36l-5.32,3.93l0.35,4.65v5l1.42,1.79l14.55-12.51v-2.86h-3.55l-4.97-16.8L913.02,481.96L913.02,481.96z" /><path d="M902.38,507.7l2.84,5.36l-7.81,7.51l-0.71,3.93l-5.32,0.71l-8.87,8.22l-8.16-3.93l-0.71-2.86l14.9-6.43L902.38,507.7L902.38,507.7z" /></g><g cc="au"><path d="M761.17,427.98l-0.35,25.38l-3.9,2.86l-0.35,2.5l5.32,3.57l13.13-2.5h6.74l2.48-3.58l14.9-2.86l10.64,3.22l-0.71,4.29l1.42,4.29l8.16-1.43l0.35,2.14l-5.32,3.93l1.77,1.43l3.9-1.43l-1.06,11.8l7.45,5.72l4.26-1.43l2.13,2.14l12.42-1.79l11.71-18.95l4.26-1.07l8.51-15.73l2.13-13.58l-5.32-6.79l2.13-1.43l-4.26-13.23l-4.61-3.22l0.71-17.87l-4.26-3.22l-1.06-10.01h-2.13l-7.1,23.59l-3.9,0.36l-8.87-8.94l4.97-13.23l-9.22-1.79l-10.29,2.86l-2.84,8.22l-4.61,1.07l-0.35-5.72l-18.8,11.44l0.35,4.29l-2.84,3.93h-7.1l-15.26,6.43L761.17,427.98L761.17,427.98z" /><path d="M825.74,496.26l-1.77,7.15l0.35,5l5.32-0.36l6.03-9.29L825.74,496.26L825.74,496.26z" /></g><g cc="fk"><path d="M307.95,508.18l-2.63-0.29l-2.62,1.76l1.9,2.06L307.95,508.18L307.95,508.18z" /><path d="M310.57,506.86l-0.87,2.79l-2.48,2.2l0.15,0.73l4.23-1.62l1.75-2.2L310.57,506.86L310.57,506.86z" /></g><g cc="cl"><path d="M285.04,514.1l-4.27,9.38l7.37,0.78l0.13-6.25L285.04,514.1L285.04,514.1z" /><path d="M283.59,512.63l-3.21,3.55l-0.39,4.17l-6.21-3.52l-6.6-9.51l-1.94-3.39l2.72-3.52l-0.26-4.43l-3.1-1.3l-2.46-1.82l0.52-2.48l3.23-0.91l0.65-14.33l-5.04-2.87l-3.29-74.59l0.85-1.48l6.44,14.85l2.06,0.04l0.67,2.37l-2.74,3.32l-3.15,17.87l4.48,13.76l-2.07,10.42l7.3,30.64l0.77,17.92l5.23,6.05L283.59,512.63L283.59,512.63z" /><path d="M262.28,475.14l-1.29,1.95l0.65,3.39l1.29,0.13l0.65-4.3L262.28,475.14L262.28,475.14z" /></g><g cc="ar"><path d="M305.47,418.2l1.94,1.82l-7.37,10.95l-2.59,2.87l0.9,12.51l5.69,6.91l-4.78,8.34l-3.62,1.56h-4.14l1.16,6.51l-6.47,2.22l1.55,5.47l-3.88,12.38l4.79,3.91l-2.59,6.38l-4.4,6.91l2.33,4.82l-5.69,0.91l-4.66-5.73l-0.78-17.85l-7.24-30.32l2.19-10.6l-4.66-13.55l3.1-17.59l2.85-3.39l-0.7-2.57l3.66-3.34l8.16,0.56l4.56,4.87l5.27,0.09l5.4,3.3l-1.59,3.72l0.38,3.76l7.65-0.36L305.47,418.2L305.47,418.2z" /><path d="M288.92,518.79l0.26,5.73l4.4-0.39l3.75-2.48l-6.34-1.3L288.92,518.79L288.92,518.79z" /></g><path cc="uy" d="M300.36,431.93l-2.05,2.19l0.85,11.78l6.44,1.87l8.19-8.21L300.36,431.93L300.36,431.93z" /><path cc="py" d="M291.76,399.51l2.2,2.4l-0.26,5.08l6.34-0.39l4.79,6.13l-0.39,5.47l-3.1,4.69l-6.34,0.26l-0.26-2.61l1.81-4.3l-6.21-3.91h-5.17l-3.88-4.17l2.82-8.06L291.76,399.51L291.76,399.51z" /><path cc="bo" d="M258.71,372.79l8.23-3.59l2.72,0.26l1.81,7.56l12.54,4.17l2.07,6.39l5.17,0.65l2.2,5.47l-1.55,4.95l-8.41,0.65l-3.1,7.95l-6.6-0.13l-2.07-0.39l-3.81,3.7l-1.88-0.18l-6.47-14.99l1.79-2.68l0.63-10.6l-1.6-6.31L258.71,372.79L258.71,372.79z" /><path cc="pe" d="M225.03,349.52l-1.94,1.96l0.13,3.13l16.94,30.88l17.59,11.34l2.72-4.56l0.65-10.03l-1.42-6.25l-4.79-8.08l-2.85,0.91l-1.29,1.43l-5.69-6.52l1.42-7.69l6.6-4.3l-0.52-4.04l-6.72-0.26l-3.49-5.86l-1.94-0.65l0.13,3.52l-8.66,10.29l-6.47-1.56L225.03,349.52L225.03,349.52z" /><path cc="ec" d="M230.2,335.85l-4.73,2.94l-0.34,4.36l-0.95,1.43l2.98,2.86l-1.29,1.41l0.3,3.6l5.33,1.27l8.07-9.55l-0.02-3.33l-3.87-0.25L230.2,335.85L230.2,335.85z" /><path cc="gf" d="M302.13,321.8l5.85,3.65l-3.06,6.08l-1.11,1.4l-3.25-1.87l0.09-6.55L302.13,321.8L302.13,321.8z" /><path cc="sr" d="M293.13,321.14l2.04,1.87l3.16-1.96l2.88,0.09l-0.37,1.12l-1.21,2.52l-0.19,6.27l-5.75,2.34l0.28-4.02l-3.71-3.46l0.19-1.78L293.13,321.14L293.13,321.14z" /><path cc="gy" d="M285.05,314.13l7.22,6.54l-2.87,3.32l-0.23,1.97l3.77,3.89l-0.09,3.74l-6.56,2.5l-3.93-5.31l0.84-6.38l-1.68-4.75L285.05,314.13L285.05,314.13z" /><path cc="br" d="M314.24,438.85l6.25-12.02l0.23-10.1l11.66-7.52h6.53l5.13-8.69l0.93-16.68l-2.1-4.46l12.36-11.28l0.47-12.45l-16.79-8.22l-20.28-6.34l-9.56-0.94l2.57-5.4l-0.7-8.22l-2.09-0.69l-3.09,6.14l-1.62,2.03l-4.16-1.84l-13.99,4.93l-4.66-5.87l0.75-6.13l-4.4,4.48l-4.86-2.62l-0.49,0.69l0.01,2.13l4.19,2.25l-6.29,6.63l-3.97-0.04l-4.02-4.09l-4.55,0.14l-0.56,4.86l2.61,3.17l-3.08,9.87l-3.6,0.28l-5.73,3.62l-1.4,7.11l4.97,5.32l0.91-1.03l3.49-0.94l2.98,5.02l8.53-3.66l3.31,0.19l2.28,8.07l12.17,3.86l2.1,6.44l5.18,0.62l2.47,6.15l-1.67,5.47l2.18,2.86l-0.32,4.26l5.84-0.55l5.35,6.76l-0.42,4.75l3.17,2.68l-7.6,11.51L314.24,438.85L314.24,438.85z" /><path cc="ve" d="M250.46,305.92l0.44,2.59l3.25,1.03l0.74-4.77l3.43-3.55l3.43,4.02l7.89,2.15l6.68-1.4l4.55,5.61l3.43,2.15l-3.76,5.73l1.26,4.34l-2.15,2.66l-2.23,1.87l-4.83-2.43l-1.11,1.12v3.46l3.53,1.68l-2.6,2.81l-2.6,2.81l-3.43-0.28l-3.45-3.79l-0.73-14.26l-11.78-4.02l-2.14-6.27L250.46,305.92L250.46,305.92z" /><path cc="co" d="M253.73,299.78l-2.06-0.21l-13.62,11.23l-1.44,3.95l-1.86,0.21l0.83,8.73l-4.75,11.65l5.16,4.37l6.61,0.42l4.54,6.66l6.6,0.21l-0.21,4.99H256l2.68-9.15l-2.48-3.12l0.62-5.82l5.16-0.42l-0.62-13.52l-11.56-3.74l-2.68-7.28L253.73,299.78L253.73,299.78z" /><path cc="pa" d="M220.59,309.61l-1.46,4.56l4.82,1.25l2.99,0.59l0.51-3.53l3.21-1.62l2.85,1.47l1.12,1.79l1.36-0.16l1.07-3.25l-3.56-1.47l-2.7-1.47l-2.7,1.84l-3.21,1.62l-3.28-1.32L220.59,309.61L220.59,309.61z" /><path cc="cr" d="M217.38,304.98l1.39,2.72l1.13,1.5l-1.52,4.51l-2.9-2.04l-4.74-4.34v-2.87L217.38,304.98L217.38,304.98z" /><path cc="ni" d="M217.74,292.11l2.19,0.44l0.07,4.49l-2.55,7.28l-6.87-0.68l-1.53-3.51l2.04-4.26l3.87-3.6L217.74,292.11L217.74,292.11z" /><path cc="hn" d="M207.55,288.78l9.24-0.35l2.74,3.26l-1.71-0.39l-3.29,0.14l-4.3,4.04l-1.84,4.09l-1.21-0.64l-0.01-4.48l-2.66-1.78L207.55,288.78L207.55,288.78z" /><path cc="sv" d="M201.65,296.27l4.7,2.34l-0.07-3.71l-2.41-1.47L201.65,296.27L201.65,296.27z" /><path cc="ie" d="M439.51,166.55l-0.91,6l-8.07,2.96h-2.57l-1.83-1.29v-1.11l4.04-2.59l-1.1-2.22l0.18-3.14l3.49,0.18l1.6-3.76l-0.21,3.34l2.71,2.15L439.51,166.55L439.51,166.55z" /><path cc="is" d="M406.36,117.31l-1.96-1.11l-2.64,1.67l-2.27,2.1l0.06,1.17l2.94,0.37l-0.18,2.1l-1.04,1.05l0.25,0.68l2.94,0.19v3.4l4.23,0.74l2.51,1.42l2.82,0.12l4.84-2.41l3.74-4.94l0.06-3.34l-2.27-1.92l-1.9-1.61l-0.86,0.62l-1.29,1.67l-1.47-0.19l-1.47-1.61l-1.9,0.18l-2.76,2.29l-1.66,1.79l-0.92-0.8l-0.06-1.98l0.92-0.62L406.36,117.31L406.36,117.31z" /><path cc="gl" d="M321.13,50.07l-1.36,2.17l2.45,2.45l-1.09,2.45l3.54,4.62l4.35-1.36l5.71-0.54l6.53,7.07l4.35,11.69l-3.53,7.34l4.89-0.82l2.72,1.63l0.27,3.54l-5.98,0.27l3.26,3.26l4.08,0.82l-8.97,11.96l-1.09,7.34l1.9,5.98l-1.36,3.54l2.45,7.61l4.62,5.17l1.36-0.27l2.99-0.82l0.27,4.35l1.9,2.72l3.53-0.27l2.72-10.06l8.16-10.06l12.24-4.89l7.61-9.52l3.53,1.63h7.34l5.98-5.98l7.34-2.99l0.82-4.62l-4.62-4.08l-4.08-1.36l-2.18-5.71l5.17-2.99l8.16,4.35l2.72-2.99l-4.35-2.45l9.25-12.51l-1.63-5.44l-4.35-0.27l1.63-4.89l5.44-2.45l11.15-9.79l-3.26-3.53l-12.51,1.09l-6.53,6.53l3.81-8.43l-4.35-1.09l-2.45,4.35l-3.53-2.99l-9.79,1.09l2.72-4.35l16.04-0.54l-4.08-5.44l-17.4-3.26l-7.07,1.09l0.27,3.54l-7.34-2.45l0.27-2.45l-5.17,1.09l-1.09,2.72l5.44,1.9l-5.71,4.08l-4.08-4.62l-5.71-1.63l-0.82,4.35h-5.71l-2.18-4.62l-8.97-1.36l-4.89,2.45l-0.27,3.26l-6.25-0.82l-3.81,1.63l0.27,3.81v1.9l-7.07,1.36l-3.26-2.17l-2.18,3.53l3.26,3.54l6.8-0.82l0.54,2.18l-5.17,2.45L321.13,50.07L321.13,50.07z" /><g cc="ca"><path d="M158.22,48.66l1.99,3.01l1,4.02l4.98,1.25l3.49-3.76l2.99,1.51l8.47,0.75l5.98-2.51l1,8.28h3.49V57.7l3.49,0.25l8.72,10.29l5.73,3.51l-2.99,4.77l1.25,1.25L219,80.03l0.25,5.02l2.99,0.5l0.75-7.53l4.73-1.25l3.49,5.27l7.47,3.51l3.74,0.75l2.49-3.01l0.25-4.77l4.48-2.76l1.49,4.02l-3.99,7.03l0.5,3.51l2.24-3.51l4.48-4.02l0.25-5.27l-2.49-4.02l0.75-3.26l5.98-3.01l2.74,2.01l0.5,17.57l4.23-3.76l2.49,1.51l-3.49,6.02l4.48,1l6.48-10.04l5.48,5.77l-2.24,10.29l-5.48,3.01l-5.23-2.51l-9.46,2.01l1,3.26l-2.49,4.02l-7.72,1.76l-8.72,6.78l-7.72,10.29l-1,3.26l5.23,2.01l1.99,5.02l7.22,7.28l11.46,5.02l-2.49,11.54l-0.25,3.26l2.99,2.01l3.99-5.27l0.5-10.04l6.23-0.25l2.99-5.77l0.5-8.78l7.97-15.56l9.96,3.51l5.23,7.28l-2.24,7.28l3.99,2.26l9.71-6.53l2.74,17.82l8.97,10.79l0.25,5.52l-9.96,2.51l-4.73,5.02l-9.96-2.26l-4.98-0.25l-8.72,6.78l5.23-1.25l6.48-1.25l1.25,1.51l-1.74,5.52l0.25,5.02l2.99,2.01l2.99-0.75l1.5-2.26h1.99l-3.24,6.02l-6.23,0.25l-2.74,4.02h-3.49l-1-3.01l4.98-5.02l-5.98,2.01l-0.27-8.53l-1.72-1l-5.23,2.26l-0.5,4.27h-11.96l-10.21,7.03l-13.7,4.52l-1.49-2.01l6.9-10.3l-3.92-3.77l-2.49-4.78l-5.07-3.87l-5.44-0.45l-9.75-6.83l-70.71-11.62l-1.17-4.79l-6.48-6.02v-5.02l1-4.52l-0.5-2.51l-2.49-2.51l-0.5-4.02l6.48-4.52l-3.99-21.58l-5.48-0.25l-4.98-6.53L158.22,48.66L158.22,48.66z" /><path d="M133.83,128.41l-1.7,3.26l0.59,2.31l1.11,0.69l-0.26,0.94l-1.19,0.34l0.34,3.43l1.28,1.29l1.02-1.11l-1.28-3.34l0.76-2.66l1.87-2.49l-1.36-2.31L133.83,128.41L133.83,128.41z" /><path d="M139.45,147.95l-1.53,0.6l2.81,3.26l0.68,3.86l2.81,3l2.38-0.43v-3.94l-2.89-1.8L139.45,147.95L139.45,147.95z" /><path d="M222.58,47.96l-8.42,2.23l-4.88,4.25l0.44,4.69l8.87,2.68l-2,4.47l-6.43-4.02l-1.77,3.35l4.21,2.9l-0.22,4.69l6.43,1.79l7.76-0.45l1.33-2.46l5.76,6.48l3.99-1.34l0.67-4.47l2.88,2.01l0.44-4.47l-3.55-2.23l0.22-14.07l-3.1-2.46L231.89,56L222.58,47.96L222.58,47.96z" /><path d="M266.01,101.85l-4.23,5.32l-0.26,5.86l3.7-2.13h4.49l3.17,2.93l2.91-2.4L266.01,101.85L266.01,101.85z" /><path d="M203.73,35.89l0.22,4.02l-7.98,8.27l2,6.7l5.76-1.56l3.33-4.92l8.42-3.13l6.87-0.45l-5.32-5.81l-2.66,2.01l-2-0.67l-1.11-2.46l-2.44-2.46L203.73,35.89L203.73,35.89z" /><path d="M214.15,24.05l-1.77,3.13l8.65,3.13l3.1-4.69l1.33,3.13h2.22l4.21-4.69l-5.1-1.34l-2-1.56l-2.66,2.68L214.15,24.05L214.15,24.05z" /><path d="M282.88,61.59L278,61.14l-5.76,2.23l-3.1,4.24l0.89,11.62l9.53,0.45l9.09,4.47l6.43,7.37l4.88-0.22l-1.33,6.92l-4.43,7.37l-4.88,2.23l-3.55-0.67l-1.77-1.56l-2.66,3.57l1.11,3.57l3.77,0.22l4.66-2.23l3.99,10.28l9.98,6.48l6.87-8.71l-5.76-9.38l3.33-3.8l4.66,7.82l8.42-7.37l-1.55-3.35l-5.76,1.79l-3.99-10.95l3.77-6.25l-7.54-8.04l-4.21,2.9l-3.99-8.71l-8.42,1.12l-2.22-10.5l-6.87,4.69l-0.67,5.81h-3.77l0.44-5.14L282.88,61.59L282.88,61.59z" /><path d="M292.86,65.61l-1.77,1.79l1.55,2.46l7.32,0.89l-4.66-4.92L292.86,65.61L292.86,65.61z" /><path d="M268.92,38.35l-2.66,0.89l0.44,3.57l4.43,2.9l0.22,2.23l-1.33,1.34l0.67,4.47l17.07,5.58l4.66,1.56l4.66-4.02l-5.54-4.47l-5.1,1.34l-7.09-0.67l-2.66-2.68l-0.67-7.37l-4.43-2.23L268.92,38.35L268.92,38.35z" /><path d="M285.77,40.36v2.01l-4.88,1.12l1.33,2.23l5.54,2.23l6.21,0.67l4.43,3.13l4.43-2.46l-3.1-3.13h3.99l2.44-2.68l5.99-0.89v-1.34l-3.33-2.23l0.44-2.46l9.31,1.56l13.75-5.36l-5.1-1.56l1.33-1.79h10.64l1.77-1.79l-21.51-7.6l-5.1-1.79l-5.54,4.02l-6.21-5.14l-3.33-0.22l-0.67,4.25l-4.21-3.8l-4.88,1.56l0.89,2.46l7.32,1.56l-0.44,3.57l3.99,2.46l9.76-2.46l0.22,3.35l-7.98,3.8l-4.88-3.8l-4.43,0.45l4.43,6.26l-2.22,1.12l-3.33-2.9l-2.44,1.56l2.22,4.24h3.77l-0.89,4.02l-3.1-0.45l-3.99-4.25L285.77,40.36L285.77,40.36z" /><path d="M317.52,171.05l-10.57,10.12l1.06,2.4l12.94,4.79l1.85-3.19l-1.06-5.32l-4.23,0.53l-2.38-2.66l3.96-3.99L317.52,171.05L317.52,171.05z" /><path d="M263.82,55.78l-4.66,3.8l1.11,4.69h2.88l1.33-2.46l2,2.01l2-0.22l5.32-4.47L263.82,55.78L263.82,55.78z" /><path d="M274.24,22.71l0.22,3.57h5.99l1.55,1.34l-0.22,1.56l-5.32,0.67l3.77,5.14l5.1,0.89l7.09-3.13l-10.2-15.42l-3.1,2.01l0.22,2.68l-3.55-1.34L274.24,22.71L274.24,22.71z" /><path d="M267.81,27.85l1.77,2.01l-1.55,2.68l1.11,2.9l4.88-2.68v-2.01l-2.88-3.35L267.81,27.85L267.81,27.85z" /><path d="M229.23,30.31l-6.87,2.9v2.23l8.87,3.35l-2,2.23l1.33,2.9l5.54-2.46h4.66l2.22,3.57l3.77-3.8l-0.89-3.58l-3.1,1.12l-0.44-4.47l1.55-2.68h-1.55l-2.44,1.56l-1.11,0.89l0.67,3.13l-1.77,1.34l-2.66-0.22l-0.67-4.02L229.23,30.31L229.23,30.31z" /><path d="M260.49,39.91l-4.88,0.67l-2.88,2.68l5.32,0.22l-1.55,4.02l1.11,1.79l1.55-0.22l3.77-6.03L260.49,39.91L260.49,39.91z" /><path d="M249.63,57.79l-2.88-1.34l-1.55,2.01l3.1,4.92l0.22,4.69l6.65-4.02v-5.81l2.44-2.46l-2.44-1.79h-3.99L249.63,57.79L249.63,57.79z" /></g><g cc="us"><path d="M93.11,44.89l-8.39,1.99l1.73,9.45l9.13,2.49l0.49,1.99L82.5,65.04l-7.65,12.68l2.71,13.43L82,94.13l3.46-3.23l0.99,1.99l-4.2,4.97l-16.29,7.46l-10.37,2.49l-0.25,3.73l23.94-6.96l9.87-2.74l9.13-11.19l10.12-6.71l-5.18,8.7l5.68,0.75l9.63-4.23l1.73,6.96l6.66,1.49l6.91,6.71l0.49,4.97l-0.99,1.24l1.23,4.72h1.73l0.25-7.96h1.97l0.49,19.64l4.94-4.23l-3.46-20.39h-5.18l-5.68-7.21l27.89-47.25l-27.64-21.63l-30.85,5.97l-1.23,9.45l6.66,3.98l-2.47,6.47L93.11,44.89L93.11,44.89z" /><path d="M148.76,158.34l-1,4.02l-3.49-2.26h-1.74l-1,4.27l-12.21,27.36l3.24,23.84l3.99,2.01l0.75,6.53h8.22l7.97,6.02l15.69,1.51l1.74,8.03l2.49,1.76l3.49-3.51l2.74,1.25l2.49,11.54l4.23,2.76l3.49-6.53l10.71-7.78l6.97,3.26l5.98,0.5l0.25-3.76l12.45,0.25l2.49,2.76l0.5,6.27l-1.49,3.51l1.74,6.02h3.74l3.74-5.77l-1.49-2.76l-1.49-6.02l2.24-6.78l10.21-8.78l7.72-2.26l-1-7.28l10.71-11.55l10.71-1.76L272.8,199l10.46-6.02v-8.03l-1-0.5l-3.74,1.25l-0.5,4.92l-12.43,0.15l-9.74,6.47l-15.29,5l-2.44-2.99l6.94-10.5l-3.43-3.27l-2.33-4.44l-4.83-3.88l-5.25-0.44l-9.92-6.77L148.76,158.34L148.76,158.34z" /><path d="M21.81,259.65l-0.95,5.47l0.95,2.05l3.12-0.96l1.63-2.74l-3.4-3.15L21.81,259.65L21.81,259.65z" /><path d="M69.17,53.35l3.46,6.47l2.22-0.5v-2.24L69.17,53.35L69.17,53.35z" /><path d="M49.66,110.26l-0.17,3.01l2.16-0.5v-1.34L49.66,110.26L49.66,110.26z" /><path d="M46.34,111.6l-4.32,2.18l0.67,2.34l1.66-1.34l3.32-1.51L46.34,111.6L46.34,111.6z" /><path d="M28.39,114.44l-2.99-0.67l-0.5,1.34l0.33,2.51L28.39,114.44L28.39,114.44z" /><path d="M22.07,114.28l-2.83-1.17l-1,1.84l1.83,1.84L22.07,114.28L22.07,114.28z" /><path d="M12.27,111.6l-1.33-1.84l-1.33,0.5v2.51l1.5,1L12.27,111.6L12.27,111.6z" /><path d="M10,248.7l-0.14,2.33l2.04,1.37l1.22-1.09L10,248.7L10,248.7z" /><path d="M15.29,252.13l-1.9,1.37l1.63,2.05l1.9-1.64L15.29,252.13L15.29,252.13z" /><path d="M19.1,255.41l-1.63,2.19l0.54,1.37l2.31-1.09L19.1,255.41L19.1,255.41z" /></g><g cc="gb"><path d="M438.42,161.47l-3.3,0.37l-0.18,2.96l2.2,1.48l2.38-0.55l0.92-1.66L438.42,161.47L438.42,161.47z" /><path d="M446.12,149.08l-1.83,2.77l0.73,1.11h4.22v1.85l-1.1,1.48l0.73,3.88l2.38,4.62l1.83,4.25l2.93,1.11l1.28,2.22l-0.18,2.03l-1.83,1.11l-0.18,0.92l1.28,0.74l-1.1,1.48l-2.57,1.11l-4.95-0.55l-7.71,3.51l-2.57-1.29l7.34-4.25l-0.92-0.55l-3.85-0.37l2.38-3.51l0.37-2.96l3.12-0.37l-0.55-5.73l-3.67-0.18l-1.1-1.29l0.18-4.25l-2.2,0.18l2.2-7.39l4.04-2.96L446.12,149.08L446.12,149.08z" /></g><path cc="mx" d="M137.49,225.43l4.83,15.21l-2.25,1.26l0.25,3.02l4.25,3.27v6.05l5.25,5.04l-2.25-14.86l-3-9.83l0.75-6.8l2.5,0.25l1,2.27l-1,5.79l13,25.44v9.07l10.5,12.34l11.5,5.29l4.75-2.77l6.75,5.54l4-4.03l-1.75-4.54l5.75-1.76l1.75,1.01l1.75-1.76h2.75l5-8.82l-2.5-2.27l-9.75,2.27l-2.25,6.55l-5.75,1.01l-6.75-2.77l-3-9.57l2.27-12.07l-4.64-2.89l-2.21-11.59l-1.85-0.79l-3.38,3.43l-3.88-2.07l-1.52-7.73l-15.37-1.61l-7.94-5.97L137.49,225.43L137.49,225.43z" /><path cc="bz" d="M204.56,282.4l-0.05,3.65h0.84l2.86-5.34h-1.94L204.56,282.4L204.56,282.4z" /><path cc="gt" d="M194.88,291.52l5.93,4.34l5.98-7.43l-1.02-1.54l-2.04-0.07v-4.35l-1.53-0.93l-4.63,1.38l1.77,4.08L194.88,291.52L194.88,291.52z" /><path cc="ma" d="M448.29,232.28h-11.55l-2.26,5.02l-5.21,2.51l-4.3,11.64l-8.38,5.02l-11.77,19.39l11.55-0.23l0.45-5.7h2.94v-7.76h10.19l0.23-10.04l9.74-2.28l4.08-6.62l6.34-0.23L448.29,232.28L448.29,232.28z" /><path cc="mr" d="M404.9,276.66l2.18,2.85l-0.45,12.32l3.17-2.28l2.26-0.46l3.17,1.14l3.62,5.02l3.4-2.28l16.53-0.23l-4.08-27.61l4.38-0.02l-8.16-6.25l0.01,4.06l-10.33,0.01l-0.05,7.75l-2.97-0.01l-0.38,5.72L404.9,276.66L404.9,276.66z" /><g cc="ee"><path d="M517.77,143.66l-5.6-0.2l-3.55,2.17l-0.05,1.61l2.3,2.17l7.15,1.21L517.77,143.66L517.77,143.66z" /><path d="M506.76,147.64l-1.55-0.05l-0.9,0.91l0.65,0.96l1.55,0.1l0.8-1.16L506.76,147.64L506.76,147.64z" /></g><g cc="sn"><path d="M410.12,290.32l-3.94,2.86l-0.9,1.6l-0.28,1.6l1.45,1.04l4.84-0.07l3.11-0.84l0.35,1.53l-0.28,2.02l2.97,1.46l0.62,0.7l3.94,0.14l0.14-1.74l-3.6-4.32l-4.01-5.43l-2.49-1.04L410.12,290.32L410.12,290.32z" /><path d="M406.79,300.22l1.24,3.01l0.69-1.86l8.41,0.88l-3.64-1.87L406.79,300.22L406.79,300.22z" /></g><path cc="gm" d="M406.89,298.34l-0.13,1.11l6.92-0.1l0.35-1.03l-0.15-1.04l-1.99,0.81L406.89,298.34L406.89,298.34z" /><path cc="gw" d="M408.6,304.53l1.4,2.77l3.93-3.38l0.04-1.04l-4.63-0.67L408.6,304.53L408.6,304.53z" /><path cc="gn" d="M410.42,307.94l3.04,4.68l3.96-3.44l4.06-0.18l3.38,4.49l2.87,1.89l1.08-2.1l0.96-0.54l-0.07-4.62l-1.91-5.48l-5.86,0.65l-7.25-0.58l-0.04,1.86L410.42,307.94L410.42,307.94z" /><path cc="sl" d="M413.93,313.13l5.65,5.46l4.03-4.89l-2.52-3.95l-3.47,0.35L413.93,313.13L413.93,313.13z" /><path cc="lr" d="M420.17,319.19l10.98,7.34l-0.26-5.56l-3.32-3.91l-3.24-2.87L420.17,319.19L420.17,319.19z" /><path cc="ci" d="M432.07,326.75l4.28-3.03l5.32-0.93l5.43,1.17l-2.77-4.19l-0.81-2.56l0.81-7.57l-4.85,0.23l-2.2-2.1l-4.62,0.12l-2.2,0.35l0.23,5.12l-1.16,0.47l-1.39,2.56l3.58,4.19L432.07,326.75L432.07,326.75z" /><path cc="ml" d="M419.46,295.84l3.08-2.11l17.12-0.1l-3.96-27.54l4.52-0.13l21.87,16.69l2.94,0.42l-1.11,9.28l-13.75,1.25l-10.61,7.92l-1.93,5.42l-7.37,0.31l-1.88-5.41l-5.65,0.4l0.22-1.77L419.46,295.84L419.46,295.84z" /><path cc="bf" d="M450.59,294.28l3.64-0.29l5.97,8.44l-5.54,4.18l-4.01-1.03l-5.39,0.07l-0.87,3.16l-4.52,0.22l-1.24-1.69l1.6-5.14L450.59,294.28L450.59,294.28z" /><path cc="ne" d="M460.89,302l2.55-0.06l2.3-3.45l3.86-0.69l4.11,2.51l8.77,0.25l6.78-2.76l2.55-2.19l0.19-2.88l4.73-4.77l1.25-10.53l-3.11-6.52l-7.96-1.94l-18.42,14.36l-2.61-0.25l-1.12,9.97l-9.4,0.94L460.89,302L460.89,302z" /><path cc="gh" d="M444.34,317.05l1.12,2.63l2.92,4.58l1.62-0.06l4.42-2.51l-0.31-14.29l-3.42-1l-4.79,0.13L444.34,317.05L444.34,317.05z" /><path cc="tg" d="M455.22,321.25l2.68-1.57l-0.06-10.35l-1.74-2.82l-1.12,0.94L455.22,321.25L455.22,321.25z" /><path cc="bj" d="M458.71,319.49h2.12l0.12-6.02l2.68-3.89l-0.12-6.77l-2.43-0.06l-4.17,3.26l1.74,3.32L458.71,319.49L458.71,319.49z" /><path cc="ng" d="M461.57,319.37l3.92,0.19l4.73,5.27l2.3,0.63l1.8-0.88l2.74-0.38l0.93-3.82l3.73-2.45l4.04-0.19l7.4-13.61l-0.12-3.07l-3.42-2.63l-6.84,3.01l-9.15-0.13l-4.36-2.76l-3.11,0.69l-1.62,2.82l-0.12,7.96l-2.61,3.7L461.57,319.37L461.57,319.37z" /><path cc="td" d="M492.79,296l0.13-2.95l4.74-4.61l1.27-11.32l-3.16-6.04l2.21-1.13l21.4,11.15l-0.13,10.94l-3.77,3.21v5.64l2.47,4.78h-4.36l-7.22,7.14l-0.19,2.16l-5.33-0.07l-0.07,0.98l-3.04-0.4l-2.08-3.93l-1.56-0.77l0.2-1.2l1.96-1.5v-7.02l-2.71-0.42l-3.27-2.43L492.79,296L492.79,296L492.79,296z" /><path cc="sd" d="M520.15,292.43l0.18-11.83l2.46,0.07l-0.28-6.57l25.8,0.23l3.69-3.72l7.96,12.73l-4.36,5.14v7.85l-6.86,14.75l-2.36,1.04l0.75,4.11h2.94l3.99,5.79l-3.2,0.41l-0.82,1.49l-0.08,2.15l-9.6-0.17l-0.98-1.49l-6.71-0.38l-12.32-12.68l1.23-0.74l0.33-2.98l-2.95-1.74l-2.69-5.31l0.15-4.94L520.15,292.43L520.15,292.43z" /><path cc="cm" d="M477.82,324.28l3.22,2.96l-0.23,4.58l17.66-0.41l1.44-1.62l-5.06-5.45l-0.75-1.97l3.22-6.03l-2.19-4l-1.84-0.99v-2.03l2.13-1.39l0.12-6.32l-1.69-0.19l-0.03,3.32l-7.42,13.85l-4.54,0.23l-3.11,2.14L477.82,324.28L477.82,324.28z" /><path cc="er" d="M556.71,294.7l-0.25-5.89l3.96-4.62l1.07,0.82l1.95,6.52l9.36,6.97l-1.7,2.09l-6.85-5.89H556.71L556.71,294.7z" /><path cc="dj" d="M571.48,301.54l-0.57,3.36l3.96-0.06l0.06-4.94l-1.45-0.89L571.48,301.54L571.48,301.54z" /><path cc="et" d="M549.49,311.76l7.28-16.2l7.23,0.04l6.41,5.57l-0.45,4.59h4.97l0.51,2.76l8.04,4.81l4.96,0.25l-9.43,10.13l-12.95,3.99h-3.21l-5.72-4.88l-2.26-0.95l-4.38-6.45l-2.89,0.04l-0.34-2.96L549.49,311.76L549.49,311.76z" /><g cc="so"><path d="M591.97,304.05l4.37-1.68l1.55,0.93l-0.17,3.88l-4.03,11.48l-21.81,23.36l-2.53-1.74l-0.17-9.86l3.28-3.77l6.96-2.15l10.21-10.78l2.67-2.38l0.75-3.48L591.97,304.05L591.97,304.05z" /><path d="M575.74,305.04l4.08,2.78l1.21-0.06l10.13-3.48l1.15,3.71l-0.81,3.13l-2.19,1.74l-5.47-0.35l-7.83-4.81L575.74,305.04L575.74,305.04z" /></g><path cc="ga" d="M486.39,332.63l-0.12,2.49l-5.64-0.12l-3.45,6.67l8.11,8.87l2.01-1.68l-0.06-1.74l-1.38-0.64v-1.22l3.11-1.97l2.76,2.09l3.05,0.06l-0.06-10.49l-4.83-0.23l-0.06-2.2L486.39,332.63L486.39,332.63z" /><path cc="gq" d="M480.99,332.69l-0.06,1.39l4.54,0.23l-0.06-1.57L480.99,332.69L480.99,332.69z" /><path cc="cg" d="M491,332.52l-0.06,1.45l4.78,0.12l0.17,12.41l-4.37-0.12l-2.53-1.97l-1.96,1.1l-0.09,0.55l1.01,0.49l0.29,2.55l-2.7,2.32l0.58,1.22l2.99-2.32h1.44l0.46,1.39l1.9,0.81l6.1-5.16l-0.12-3.77l1.27-3.07l3.91-2.9l1.05-9.81l-2.78,0.01l-3.22,4.41L491,332.52L491,332.52z" /><path cc="nc" d="M906.64,420.47l-0.35,1.79l4.61,6.43l2.48,1.07l0.35-2.5L906.64,420.47L906.64,420.47z" /><g cc="my"><path d="M732.71,315.45l2.01,4.51l0.45,5.86l2.69,4.17l6.49,3.94l2.46,0.23l-0.45-4.06l-2.13-5.18l-3.12-6.63l-0.26,1.16l-3.76-0.17l-2.7-3.88L732.71,315.45L732.71,315.45z" /><path d="M764.14,332.92l3.02,3.49l11.58-4.01l2.29-8.84l5.16-0.37l4.72-3.42l-6.12-4.46l-1.4-2.45l-3.02,5.57l1.11,3.2l-1.84,2.67l-3.47-0.89l-8.41,6.17l0.22,3.57L764.14,332.92L764.14,332.92z" /></g><path cc="bn" d="M779.77,319.25l-2.88,3.49l2.36,0.74l1.33-1.86L779.77,319.25L779.77,319.25z" /><path cc="fj" d="M948.62,412.29l-1.24,1.66l-0.1,1.87l1.44,1.46L948.62,412.29L948.62,412.29z" /><g cc="ph"><path d="M791.38,272.97l-2.58,1.83l-0.29,5.78l4.02,7.8l1.34,1.06l1.72-1.16l2.96,0.48l0.57,2.6l2.2,0.19l1.05-1.44l-1.34-1.83l-1.63-1.54l-3.44-0.38l-1.82-2.99l2.1-3.18l0.19-2.79l-1.43-3.56L791.38,272.97L791.38,272.97z" /><path d="M789.37,297.53l-0.86,1.64l-0.48,2.02l-4.78,6.07l0.29,1.25l2.01-0.29l6.21-6.94L789.37,297.53L789.37,297.53z" /><path d="M797.11,295.22l-0.1,5.01l1.82,1.83l0.67,3.56l1.82,0.39l0.86-2.22l-1.43-1.06l-0.38-6.26L797.11,295.22L797.11,295.22z" /><path d="M802.28,297.15l-0.1,4.43l1.05,1.73l1.82-2.12l-0.48-3.85L802.28,297.15L802.28,297.15z" /><path d="M803.42,293.29l1.82,2.41l0.86,2.31h1.63l-0.29-3.95l-1.82-1.25L803.42,293.29L803.42,293.29z" /><path d="M806.96,302.35l0.38,2.89l-3.35,2.7l-2.77,0.29l-2.96,3.18l0.1,1.45l2.77-0.87l1.91-1.25l1.63,4.14l2.87,2.02l1.15-0.39l1.05-1.25l-2.29-2.31l1.34-1.06l1.53,1.25l1.05-1.73l-1.05-2.12l-0.19-4.72L806.96,302.35L806.96,302.35z" /><path d="M792.72,290.21l0.76,2.7l1.34,0.87l0.96-1.25l-1.53-2.12L792.72,290.21L792.72,290.21z" /></g><path cc="ag" d="M276.6,283.37l-1.5,0.62l0.53,1.33l1.76-1.15l-0.35-0.36L276.6,283.37L276.6,283.37z" /><path cc="gp" d="M279.07,284.88l-0.88,1.87l1.06,1.42l1.32-1.15L279.07,284.88L279.07,284.88z" /><path cc="dm" d="M282.07,290.03l-1.06,0.98l0.79,1.6l1.5-0.44L282.07,290.03L282.07,290.03z" /><path cc="mq" d="M281.98,294.03l-0.71,1.51l1.15,1.24l1.5-0.8L281.98,294.03L281.98,294.03z" /><path cc="lc" d="M282.07,297.85l-1.23,0.89l0.97,1.78l1.59-0.89L282.07,297.85L282.07,297.85z" /><path cc="gd" d="M280.57,301.31l-1.15,1.15l0.44,0.71h1.41l0.44-1.16L280.57,301.31L280.57,301.31z" /><path cc="tt" d="M282.24,304.78l-1.06,0.98l-1.15,0.18v1.42l2.12,1.95l0.88-1.42l0.53-1.6l-0.18-1.33L282.24,304.78L282.24,304.78z" /><path cc="pr" d="M271.05,281.06l-2.64-0.89l-2.12,1.33l1.06,1.24l3.61,0.53L271.05,281.06L271.05,281.06z" /><path cc="do" d="M263.11,280.44l-5.29-3.46l-2.5-0.85l-0.84,6l0.88,1.69l1.15-1.33l3.35-0.89l2.91,0.62L263.11,280.44L263.11,280.44z" /><path cc="ht" d="M250.86,275.38l3.44,0.36l-0.41,4.22l-0.34,2.22l-4.01-0.22l-0.71,1.07l-1.23-0.09l-0.44-2.31l4.23-0.35l-0.26-2.4l-1.94-0.8L250.86,275.38L250.86,275.38z" /><path cc="cu" d="M220.85,266.92v1.27l5.32,0.1l2.51-1.46l0.39,1.07l5.22,1.27l4.64,4.19l-1.06,1.46l0.19,1.66l3.87,0.97l3.87-1.75l1.74-1.75l-2.51-1.27l-12.95-7.6l-4.54-0.49L220.85,266.92L220.85,266.92z" /><g cc="bs"><path d="M239.61,259.13l-1.26-0.39l-0.1,2.43l1.55,1.56l1.06-1.56L239.61,259.13L239.61,259.13z" /><path d="M242.12,262.93l-1.74,0.97l1.64,2.34l0.87-1.17L242.12,262.93L242.12,262.93z" /><path d="M247.73,264.68l-1.84-0.1l0.19,1.17l1.35,1.95l1.16-1.27L247.73,264.68L247.73,264.68z" /><path d="M246.86,262.35l-3-1.27l-0.58-3.02l1.16-0.49l1.16,2.34l1.16,0.88L246.86,262.35L246.86,262.35z" /><path d="M243.96,256.21l-1.55-0.39l-0.29-1.95l-1.64-0.58l1.06-1.07l1.93,0.68l1.45,0.88L243.96,256.21L243.96,256.21z" /></g><path cc="jm" d="M238.93,279.59l-3.48,0.88v0.97l2.03,1.17h2.13l1.35-1.56L238.93,279.59L238.93,279.59z" /><path cc="kz" d="M576.69,188.62l4.1-1.75l4.58-0.16l0.32,7h-2.68l-2.05,3.34l2.68,4.45l3.95,2.23l0.36,2.55l1.45-0.48l1.34-1.59l2.21,0.48l1.11,2.23h2.84v-2.86l-1.74-5.09l-0.79-4.13l5.05-2.23l6.79,1.11l4.26,4.29l9.63-0.95l5.37,7.63l6.31,0.32l1.74-2.86l2.21-0.48l0.32-3.18l3.31-0.16l1.74,2.07l1.74-4.13l14.99,2.07l2.52-3.34l-4.26-5.25l5.68-12.4l4.58,0.32l3.16-7.63l-6.31-0.64l-3.63-3.5l-10,1.16l-12.88-12.45l-4.54,4.03l-13.77-6.25l-16.89,8.27l-0.47,5.88l3.95,4.61l-7.7,4.35l-9.99-0.22l-2.09-3.07l-7.83-0.43l-7.42,4.77l-0.16,6.52L576.69,188.62L576.69,188.62z" /><path cc="tm" d="M593.85,207.59l-0.62,2.63h-4.15v3.56l4.46,2.94l-1.38,4.03v1.86l1.85,0.31l2.46-3.25l5.54-1.24l11.84,4.49l0.15,3.25l6.61,0.62l7.38-7.75l-0.92-2.48l-4.92-1.08l-13.84-8.99l-0.62-3.25h-5.23l-2.31,4.34h-2.31L593.85,207.59L593.85,207.59z" /><path cc="uz" d="M628.92,219.06l3.08,0.16v-5.27l-2.92-1.7l4.92-6.2h2l2,2.33l5.23-2.01l-7.23-2.48l-0.28-1.5l-1.72,0.42l-1.69,2.94l-7.29-0.24l-5.35-7.57l-9.4,0.93l-4.48-4.44l-6.2-1.05l-4.5,1.83l2.61,8.68l0.03,2.92l1.9,0.04l2.33-4.44l6.2,0.08l0.92,3.41l13.29,8.82l5.14,1.18L628.92,219.06L628.92,219.06z" /><path cc="tj" d="M630.19,211.84l4.11-5.1h1.55l0.54,1.14l-1.9,1.38v1.14l1.25,0.9l6.01,0.36l1.96-0.84l0.89,0.18l0.6,1.92l3.57,0.36l1.79,3.78l-0.54,1.14l-0.71,0.06l-0.71-1.44l-1.55-0.12l-2.68,0.36l-0.18,2.52l-2.68-0.18l0.12-3.18l-1.96-1.92l-2.98,2.46l0.06,1.62l-2.62,0.9h-1.55l0.12-5.58L630.19,211.84L630.19,211.84z" /><path cc="kg" d="M636.81,199.21l-0.31,2.53l0.25,1.56l8.7,2.92l-7.64,3.08l-0.87-0.72l-1.65,1.06l0.08,0.58l0.88,0.4l5.36,0.14l2.72-0.82l3.49-4.4l4.37,0.76l5.27-7.3l-14.1-1.92l-1.95,4.73l-2.46-2.64L636.81,199.21L636.81,199.21z" /><path cc="af" d="M614.12,227.05l1.59,12.46l3.96,0.87l0.37,2.24l-2.84,2.37l5.29,4.27l10.28-3.7l0.82-4.38l6.47-4.04l2.48-9.36l1.85-1.99l-1.92-3.34l6.26-3.87l-0.8-1.12l-2.89,0.18l-0.26,2.66l-3.88-0.04l-0.07-3.55l-1.25-1.49l-2.1,1.91l0.06,1.75l-3.17,1.2l-5.85-0.37l-7.6,7.96L614.12,227.05L614.12,227.05z" /><path cc="pk" d="M623.13,249.84l2.6,3.86l-0.25,1.99l-3.46,1.37l-0.25,3.24h3.96l1.36-1.12h7.54l6.8,5.98l0.87-2.87h5.07l0.12-3.61l-5.19-4.98l1.11-2.74l5.32-0.37l7.17-14.95l-3.96-3.11l-1.48-5.23l9.64-0.87l-5.69-8.1l-3.03-0.82l-1.24,1.5l-0.93,0.07l-5.69,3.61l1.86,3.12l-2.1,2.24l-2.6,9.59l-6.43,4.11l-0.87,4.49L623.13,249.84L623.13,249.84z" /><path cc="np" d="M671.19,242.56l0.46,4.27l8.08,3.66l12.95,0.96l-0.49-3.13l-8.65-2.38l-7.34-4.37L671.19,242.56L671.19,242.56z" /><path cc="bt" d="M695.4,248.08l1.55,2.12l5.24,0.04l-0.53-2.9L695.4,248.08L695.4,248.08z" /><path cc="bd" d="M695.57,253.11l-1.31,2.37l3.4,6.46l0.1,5.04l0.62,1.35l3.99,0.07l2.26-2.17l1.64,0.99l0.33,3.07l1.31-0.82l0.08-3.92l-1.1-0.13l-0.69-3.33l-2.78-0.1l-0.69-1.85l1.7-2.27l0.03-1.12h-4.94L695.57,253.11L695.57,253.11z" /><path cc="kh" d="M740.48,299.47l4.09,4.37l7.61-5.64l0.67-8.9l-3.93,2.71l-2.04-1.14l-2.77-0.37l-1.55-1.09l-0.75,0.04l-2.03,3.33l0.33,1.54l2.06,1.15l-0.25,3.13L740.48,299.47L740.48,299.47z" /><path cc="la" d="M735.47,262.93l-2.42,1.23l-2.01,5.86l3.36,4.28l-0.56,4.73l0.56,0.23l5.59-2.71l7.5,8.38l-0.18,5.28l1.63,0.88l4.03-3.27l-0.33-2.59l-11.63-11.05l0.11-1.69l1.45-1.01l-1.01-2.82l-4.81-0.79L735.47,262.93L735.47,262.93z" /><path cc="vn" d="M745.06,304.45l1.19,1.87l0.22,2.14l3.13,0.34l3.8-5.07l3.58-1.01l1.9-5.18l-0.89-8.34l-3.69-5.07l-3.89-3.11l-4.95-8.5l3.55-5.94l-5.08-5.83l-4.07-0.18l-3.66,1.97l1.09,4.71l4.88,0.86l1.31,3.63l-1.72,1.12l0.11,0.9l11.45,11.2l0.45,3.29l-0.69,10.4L745.06,304.45L745.06,304.45z" /><path cc="ge" d="M555.46,204.16l3.27,4.27l4.08,1.88l2.51-0.01l4.31-1.17l1.08-1.69l-12.75-4.77L555.46,204.16L555.46,204.16z" /><path cc="am" d="M569.72,209.89l4.8,6.26l-1.41,1.65l-3.4-0.59l-4.22-3.78l0.23-2.48L569.72,209.89L569.72,209.89z" /><path cc="az" d="M571.41,207.72l-1.01,1.72l4.71,6.18l1.64-0.53l2.7,2.83l1.17-4.96l2.93,0.47l-0.12-1.42l-4.82-4.22l-0.92,2.48L571.41,207.72L571.41,207.72z" /><path cc="ir" d="M569.65,217.95l-1.22,1.27l0.12,2.01l1.52,2.13l5.39,5.9l-0.82,2.36h-0.94l-0.47,2.36l3.05,3.9l2.81,0.24l5.63,7.79l3.16,0.24l2.46,1.77l0.12,3.54l9.73,5.67h3.63l2.23-1.89l2.81-0.12l1.64,3.78l10.51,1.46l0.31-3.86l3.48-1.26l0.16-1.38l-2.77-3.78l-6.17-4.96l3.24-2.95l-0.23-1.3l-4.06-0.63l-1.72-13.7l-0.2-3.15l-11.01-4.21l-4.88,1.1l-2.73,3.35l-2.42-0.16l-0.7,0.59l-5.39-0.35l-6.8-4.96l-2.53-2.77l-1.16,0.28l-2.09,2.39L569.65,217.95L569.65,217.95z" /><path cc="om" d="M598.38,280.84l7.39-4.26l1.31-6.25l-1.62-0.93l0.67-6.7l1.41-0.82l1.51,2.37l8.99,4.7v2.61l-10.89,16.03l-5.01,0.17L598.38,280.84L598.38,280.84z" /><path cc="ae" d="M594.01,264.94l0.87,3.48l9.86,0.87l0.69-7.14l1.9-1.04l0.52-2.61l-3.11,0.87l-3.46,5.23L594.01,264.94L594.01,264.94z" /><path cc="qa" d="M592.63,259.02l-0.52,4.01l1.54,1.17l1.4-0.13l0.52-5.05l-1.21-0.87L592.63,259.02L592.63,259.02z" /><path cc="kw" d="M583.29,247.17l-2.25-1.22l-1.56,1.57l0.17,3.14l3.63,1.39L583.29,247.17L583.29,247.17z" /><path cc="sa" d="M584,253.24l7.01,9.77l2.26,1.8l1.01,4.38l10.79,0.85l1.22,0.64l-1.21,5.4l-7.09,4.18l-10.37,3.14l-5.53,5.4l-6.57-3.83l-3.98,3.48L566,279.4l-3.8-1.74l-1.38-2.09v-4.53l-13.83-16.72l-0.52-2.96h3.98l4.84-4.18l0.17-2.09l-1.38-1.39l2.77-2.26l5.88,0.35l10.03,8.36l5.92-0.27l0.38,1.46L584,253.24L584,253.24z" /><path cc="sy" d="M546.67,229.13l-0.35,2.54l2.82,1.18l-0.12,7.04l2.82-0.06l2.82-2.13l1.06-0.18l6.4-5.09l1.29-7.39l-12.79,1.3l-1.35,2.96L546.67,229.13L546.67,229.13z" /><path cc="iq" d="M564.31,225.03l-1.56,7.71l-6.46,5.38l0.41,2.54l6.31,0.43l10.05,8.18l5.62-0.16l0.15-1.89l2.06-2.21l2.88,1.63l0.38-0.36l-5.57-7.41l-2.64-0.16l-3.51-4.51l0.7-3.32l1.07-0.14l0.37-1.47l-4.78-5.03L564.31,225.03L564.31,225.03z" /><path cc="jo" d="M548.9,240.78l-2.46,8.58l-0.11,1.31h3.87l4.33-3.82l0.11-1.45l-1.77-1.81l3.17-2.63l-0.46-2.44l-0.87,0.2l-2.64,1.89L548.9,240.78L548.9,240.78z" /><path cc="lb" d="M546.2,232.44l0.06,1.95l-0.82,2.96l2.82,0.24l0.18-4.2L546.2,232.44L546.2,232.44z" /><path cc="il" d="M545.32,238.06l-1.58,5.03l2.05,6.03l2.35-8.81v-1.89L545.32,238.06L545.32,238.06z" /><path cc="cy" d="M543.21,229.84l1.23,0.89l-3.81,3.61l-1.82-0.06l-1.35-0.95l0.18-1.77l2.76-0.18L543.21,229.84L543.21,229.84z" /><path cc="no" d="M515.46,102.14l2.02-1.48L517.3,99l-1.28-0.74l0.18-2.03h1.1v-1.11l-4.77-1.29l-7.15,0.74l-0.73,3.14L503,97.16l-1.1-1.85l-3.49,0.18L498.04,99l-1.65,0.74l-0.92-1.85l-7.34,5.91l1.47,1.66l-2.75,1.29l-6.24,12.38l-2.2,1.48l0.18,1.11l2.2,1.11l-0.55,2.4l-3.67-0.19l-1.1-1.29l-2.38,2.77l-1.47,1.11l-0.37,2.59l-1.28,0.74l-3.3,0.74l-1.65,5.18l1.1,8.5l1.28,3.88l1.47,1.48l3.3-0.18l4.77-4.62l1.83-3.14l0.55,4.62l3.12-5.54l0.18-15.53l2.54-1.6l0.76-8.57l7.7-11.09l3.67-1.29l1.65-2.03l5.5,1.29l2.75,1.66l0.92-4.62l4.59-2.77L515.46,102.14L515.46,102.14z" /><g cc="se"><path d="M497.72,104.58l1.96,1.81h3.67l2.02,3.88l0.55,6.65l-4.95,3.51v3.51l-3.49,4.81l-2.02,0.18l-2.75,4.62l0.18,4.44l4.77,3.51l-0.37,2.03l-1.83,2.77l-2.75,2.4l0.18,7.95l-4.22,1.48l-1.47,3.14h-2.02l-1.1-5.54l-4.59-7.04l3.77-6.31l0.26-15.59l2.6-1.43l0.63-8.92l7.41-10.61L497.72,104.58L497.72,104.58z" /><path d="M498.49,150.17l-2.11,1.67l1.06,2.45l1.87-1.82L498.49,150.17L498.49,150.17z" /></g><path cc="fi" d="M506.79,116.94l2.07,0.91l1.28,2.4l-1.28,1.66l-6.42,7.02l-1.1,3.7l1.47,5.36l4.95,3.7l6.6-3.14l5.32-0.74l4.95-7.95l-3.67-8.69l-3.49-8.32l0.55-5.36l-2.2-0.37l-0.57-3.91l-2.96-4.83l-3.28,2.27l-1.29,5.27l-3.48-2.09l-4.84-1.18l-1.08,1.26l1.86,1.68l3.39-0.06l2.73,4.41L506.79,116.94L506.79,116.94z" /><path cc="lv" d="M518.07,151.37l-6.85-1.11l0.15,3.83l6.35,3.88l2.6-0.76l-0.15-2.92L518.07,151.37L518.07,151.37z" /><path cc="lt" d="M510.81,154.7l-2.15-0.05l-2.95,2.82h-2.5l0.15,3.53l-1.5,2.77l5.4,0.05l1.55-0.2l1.55,1.87l3.55-0.15l3.4-4.33l-0.2-2.57L510.81,154.7L510.81,154.7z" /><path cc="by" d="M510.66,166.29l1.5,2.47l-0.6,1.97l0.1,1.56l0.55,1.87l3.1-1.76l3.85,0.1l2.7,1.11h6.85l2-4.79l1.2-1.81v-1.21l-4.3-6.05l-3.8-1.51l-3.1-0.35l-2.7,0.86l0.1,2.72l-3.75,4.74L510.66,166.29L510.66,166.29z" /><path cc="pl" d="M511.46,174.76l0.85,1.56l0.2,1.66l-0.7,1.61l-1.6,3.08l-1.35,0.61l-1.75-0.76l-1.05,0.05l-2.55,0.96l-2.9-0.86l-4.7-3.33l-4.6-2.47l-1.85-2.82l-0.35-6.65l3.6-3.13l4.7-1.56l1.75-0.2l-0.7,1.41l0.45,0.55l7.91,0.15l1.7-0.05l2.8,4.29l-0.7,1.76l0.3,2.07L511.46,174.76L511.46,174.76z" /><path cc="nl" d="M470.09,168.27l-4.53,2.23l0.96,0.87l0.1,2.23l-0.96-0.19l-1.06-1.65l-2.53,4.01l3.89,0.81l1.45,1.53l0.77,0.02l0.51-3.46l2.45-1.03L470.09,168.27L470.09,168.27z" /><path cc="be" d="M461.61,176.52l-0.64,1.6l6.88,4.54l1.98,0.47l0.07-2.15l-1.73-1.94h-1.06l-1.45-1.65L461.61,176.52L461.61,176.52z" /><path cc="de" d="M471.14,167.88l3.57-0.58v-2.52l2.99-0.49l1.64,1.65l1.73,0.19l2.7-1.17l2.41,0.68l2.12,1.84l0.29,6.89l2.12,2.82l-2.79,0.39l-4.63,2.91l0.39,0.97l4.14,3.88l-0.29,1.94l-3.85,1.94l-3.57,0.1l-0.87,1.84h-1.83l-0.87-1.94l-3.18-0.78l-0.1-3.2l-2.7-1.84l0.29-2.33l-1.83-2.52l0.48-3.3l2.5-1.17L471.14,167.88L471.14,167.88z" /><g cc="dk"><path d="M476.77,151.5l-4.15,4.59l-0.15,2.99l1.89,4.93l2.96-0.56l-0.37-4.03l2.04-2.28l-0.04-1.79l-1.44-3.73L476.77,151.5L476.77,151.5z" /><path d="M481.44,159.64l-0.93-0.04l-1.22,1.12l0.15,1.75l2.89,0.08l0.15-1.98L481.44,159.64L481.44,159.64z" /></g><path cc="ch" d="M472.91,189.38l-4.36,4.64l0.09,0.47l1.79-0.56l1.61,2.24l2.72-0.96l1.88,1.46l0.77-0.44l2.32-3.64l-0.59-0.56l-2.29-0.06l-1.11-2.27L472.91,189.38L472.91,189.38z" /><path cc="cz" d="M488.43,184.87h2.97h1.46l2.37,1.69l4.39-3.65l-4.26-3.04l-4.22-2.04l-2.89,0.52l-3.92,2.52L488.43,184.87L488.43,184.87z" /><path cc="sk" d="M495.84,187.13l0.69,0.61l0.09,1.04l7.63-0.17l5.64-2.43l-0.09-2.47l-1.08,0.48l-1.55-0.83l-0.95-0.04l-2.5,1l-3.4-0.82L495.84,187.13L495.84,187.13z" /><path cc="at" d="M480.63,190.12l-0.65,1.35l0.56,0.96l2.33-0.48h1.98l2.15,1.82l4.57-0.83l3.36-2l0.86-1.35l-0.13-1.74l-3.02-2.26l-4.05,0.04l-0.34,2.3l-4.26,2.08L480.63,190.12L480.63,190.12z" /><path cc="hu" d="M496.74,189.6l-1.16,1.82l0.09,2.78l1.85,0.95l5.69,0.17l7.93-6.68l0.04-1.48l-0.86-0.43l-5.73,2.6L496.74,189.6L496.74,189.6z" /><path cc="si" d="M494.8,191.99l-2.54,1.52l-4.74,1.04l0.95,2.74l3.32,0.04l3.06-2.56L494.8,191.99L494.8,191.99z" /><path cc="hr" d="M495.62,195.16l-3.53,2.91h-3.58l-0.43,2.52l1.64,0.43l0.82-1.22l1.29,1.13l1.03,3.6l7.07,3.3l0.7-0.8l-7.17-7.4l0.73-1.35l6.81-0.26l0.69-2.17l-4.44,0.13L495.62,195.16L495.62,195.16z" /><path cc="ba" d="M494.8,198.94l-0.37,0.61l6.71,6.92l2.46-3.62l-0.09-1.43l-2.15-2.61L494.8,198.94L494.8,198.94z" /><path cc="ua" d="M515.57,173.15l-2.9,1.63l0.72,3.08l-2.68,5.65l0.02,2.49l1.26,0.8l8.08,0.4l2.26-1.87l2.42,0.81l3.47,4.63l-2.54,4.56l3.02,0.88l3.95-4.55l2.26,0.41l2.1,1.46l-1.85,2.44l2.5,3.9h2.66l1.37-2.6l2.82-0.57l0.08-2.11l-5.24-0.81l0.16-2.27h5.08l5.48-4.39l2.42-2.11l0.4-6.66l-10.8-0.97l-4.43-6.25l-3.06-1.05l-3.71,0.16l-1.67,4.13l-7.6,0.1l-2.47-1.14L515.57,173.15L515.57,173.15z" /><path cc="md" d="M520.75,187.71l3.1,4.77l-0.26,2.7l1.11,0.05l2.63-4.45l-3.16-3.92l-1.79-0.74L520.75,187.71L520.75,187.71z" /><path cc="ro" d="M512.18,187.6l-0.26,1.48l-5.79,4.82l4.84,7.1l3.1,2.17h5.58l1.84-1.54l2.47-0.32l1.84,1.11l3.26-3.71l-0.63-1.86l-3.31-0.85l-2.26-0.11l0.11-3.18l-3-4.72L512.18,187.6L512.18,187.6z" /><path cc="rs" d="M505.55,194.54l-2.05,1.54h-1l-0.68,2.12l2.42,2.81l0.16,2.23l-3,4.24l0.42,1.27l1.74,0.32l1.37-1.86l0.74-0.05l1.26,1.22l3.84-1.17l-0.32-5.46L505.55,194.54L505.55,194.54z" /><path cc="bg" d="M511.44,202.39l0.16,4.98l1.68,3.5l6.31,0.11l2.84-2.01l2.79-1.11l-0.68-3.18l0.63-1.7l-1.42-0.74l-1.95,0.16l-1.53,1.54l-6.42,0.05L511.44,202.39L511.44,202.39z" /><path cc="al" d="M504.02,209.76v4.61l1.32,2.49l0.95-0.11l1.63-2.97l-0.95-1.33l-0.37-3.29l-1.26-1.17L504.02,209.76L504.02,209.76z" /><path cc="mk" d="M510.92,208.01l-3.37,1.11l0.16,2.86l0.79,1.01l4-1.86L510.92,208.01L510.92,208.01z" />
            </g>
          </svg>

          {/* Rutas de Red Globales (Arcos) y Nodos recálculados a la nueva proporción 940x530 */}
          <g fill="none" stroke="var(--data-line)" strokeWidth="1" filter="url(#glow)">
            <path d="M 45,76 Q 73,50 102,76" className="flow-path" />
            <path d="M 102,76 Q 129,60 156,87" className="flow-path-fast" />
            <path d="M 65,127 Q 83,101 102,76" className="flow-path" />
            <path d="M 65,127 Q 85,140 106,113" className="flow-path" opacity="0.6" />
            <path d="M 106,113 Q 131,100 156,87" className="flow-path-fast" />
            <path d="M 156,87 Q 161,112 166,137" className="flow-path" />
          </g>

          {/* Nodos Globales (Puntos en Continentes) */}
          <circle cx="45" cy="76" r="2.5" fill="var(--data-node)" className="node" /> {/* NA */}
          <circle cx="65" cy="127" r="3" fill="var(--ui-cyan)" className="node node-delay" /> {/* SA */}
          <circle cx="102" cy="76" r="3" fill="var(--ui-cyan)" className="node" /> {/* EU */}
          <circle cx="106" cy="113" r="2" fill="var(--data-node)" className="node node-delay" /> {/* AF */}
          <circle cx="156" cy="87" r="2.5" fill="var(--data-node)" className="node" /> {/* AS */}
          <circle cx="166" cy="137" r="2" fill="var(--data-node)" className="node node-delay" /> {/* AU */}

          {/* TEXTO LATERAL IZQUIERDO (Real-time Data) */}
          <g transform="translate(-15, 140) rotate(-90)">
            <text x="0" y="0" fill="var(--ui-text)" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="700" letterSpacing="3" opacity="0.9">REAL-TIME DATA</text>
            <line x1="0" y1="6" x2="100" y2="6" stroke="var(--data-line)" strokeWidth="1" opacity="0.6" />
          </g>
        </g>

        {/* 3.3 UI DASHBOARD FLOTANTE (Lateral Derecho) */}
        <g transform="matrix(0.866, 0.5, 0, 1, 570, 240)">
          <g>
            <path d="M 0,0 L -5,-3 L -5,-73 L 0,-70 Z" fill="var(--plat-left)" />
            <path d="M 0,-70 L -5,-73 L 155,-73 L 160,-70 Z" fill="var(--plat-top)" />
            <rect x="0" y="-70" width="160" height="70" fill="var(--ui-bg)" stroke="var(--ui-border)" strokeWidth="1.5" rx="2" />
          </g>
          <g transform="translate(5, -65)">
            <rect x="0" y="0" width="150" height="60" fill="var(--ui-screen)" rx="1" />
            <text x="8" y="15" fill="var(--ui-text)" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1">GLOBAL STATUS</text>
            <circle cx="135" cy="12" r="2" fill="#ef4444" className="node" />
            <path d="M 140,9 L 144,15 L 140,15 Z" fill="#ef4444" opacity="0.8" />
            <g transform="translate(8, 25)">
              <line x1="0" y1="10" x2="80" y2="10" stroke="var(--ui-border)" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="0" y1="25" x2="80" y2="25" stroke="var(--ui-border)" strokeWidth="0.5" strokeDasharray="2 2" />
              <path d="M 0,25 C 15,25 25,5 40,15 S 60,30 80,10" fill="none" stroke="var(--ui-cyan)" strokeWidth="1.5" filter="url(#glow)" />
              <path d="M 0,25 C 15,25 25,5 40,15 S 60,30 80,10 L 80,30 L 0,30 Z" fill="rgba(34, 211, 238, 0.15)" />
              <circle cx="40" cy="15" r="1.5" fill="#fff" />
              <circle cx="80" cy="10" r="1.5" fill="#fff" />
            </g>
            <g transform="translate(100, 55)">
              <rect x="0" y="-15" width="6" height="15" fill="var(--ui-green)" rx="1" />
              <rect x="12" y="-30" width="6" height="30" fill="var(--ui-blue)" rx="1" />
              <rect x="24" y="-10" width="6" height="10" fill="var(--ui-green)" rx="1" />
              <rect x="36" y="-35" width="6" height="35" fill="var(--ui-cyan)" rx="1" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}


function TelemetryDirectLakeLoop({ tick }) {
  return (
    <svg x="-300" y="-220" width="600" height="437.5" viewBox="0 0 960 700" preserveAspectRatio="xMidYMid meet" role="img" ariaLabelledby="ttl dsc" style={{ backgroundColor: 'transparent', overflow: 'visible' }}>
      <title id="ttl">Custom Apps &amp; Field Operations</title>
      <desc id="dsc">Isometric supply chain scene: a Power Apps control plane over a modular component core, wired to a warehouse scanner, pallet staging, an offline sync queue, a delivery truck and a digital manifest.</desc>

      <defs>
        <radialGradient id="gBg" cx="50%" cy="32%" r="80%">
          <stop offset="0" stopColor="#0d1406" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#050804" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="gPanel" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#c6ff34" stopOpacity=".17" />
          <stop offset="48%" stopColor="#a3e635" stopOpacity=".07" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".13" />
        </linearGradient>
        <linearGradient id="gSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c6ff34" stopOpacity="0" />
          <stop offset="42%" stopColor="#c6ff34" stopOpacity=".10" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity=".17" />
          <stop offset="70%" stopColor="#c6ff34" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gBeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c6ff34" stopOpacity=".13" />
          <stop offset="60%" stopColor="#a3e635" stopOpacity=".05" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="gCore" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#c6ff34" stopOpacity=".55" />
          <stop offset="45%" stopColor="#a3e635" stopOpacity=".20" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gFloor" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#c6ff34" stopOpacity=".17" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gSlab" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#c6ff34" stopOpacity=".16" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".06" />
        </linearGradient>
        <linearGradient id="gGlass" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#c6ff34" stopOpacity=".30" />
          <stop offset="100%" stopColor="#080c0a" stopOpacity=".10" />
        </linearGradient>
        <linearGradient id="gQueue" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#c6ff34" stopOpacity=".34" />
          <stop offset="100%" stopColor="#c6ff34" stopOpacity=".10" />
        </linearGradient>

        <filter id="glow" x="-140%" y="-140%" width="380%" height="380%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glowS" x="-140%" y="-140%" width="380%" height="380%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        <clipPath id="panelClip"><path d="M480,32 L715,168 L480,304 L245,168 Z" /></clipPath>
        <clipPath id="phoneClip"><rect x="5" y="8" width="64" height="114" rx="4" /></clipPath>
        <clipPath id="vfClip"><rect x="21" y="60" width="32" height="26" /></clipPath>

        <g id="cube">
          <path className="fTop" d="M0,0 L28,16 L0,32 L-28,16 Z" />
          <path className="fLeft" d="M-28,16 L0,32 L0,64 L-28,48 Z" />
          <path className="fRight" d="M28,16 L0,32 L0,64 L28,48 Z" />
          <path className="edge" d="M0,0 L28,16 L28,48 L0,64 L-28,48 L-28,16 Z M-28,16 L0,32 L28,16 M0,32 L0,64" />
        </g>
      </defs>

      <style>{`
      svg { --line: rgba(198, 255, 52, 0.35); --aqua: #c6ff34; --amber: #a3e635;
            --txt: #ffffff; --muted: rgba(255, 255, 255, 0.7);
            --eio: cubic-bezier(0.65,0,0.35,1); --eout: cubic-bezier(0.22,1,0.36,1) }
    
      .fTop   { fill: #c6ff34; fill-opacity:.085 }
      .fLeft  { fill: #000000; fill-opacity:.16 }
      .fRight { fill: #142008; fill-opacity:.10 }
      .edge   { fill:none; stroke: var(--line); stroke-width:.85; stroke-opacity:.5;
                stroke-linejoin:round; stroke-linecap:round }
    
      .cell { animation: ripple 4.2s var(--eio) infinite; animation-delay: calc(var(--i) * .17s) }
      @keyframes ripple { 0%,100% { opacity:.58 } 42% { opacity:1 } }
    
      .coreTop   { fill: var(--aqua); fill-opacity:.34 }
      .coreLeft  { fill: #84cc16; fill-opacity:.42 }
      .coreRight { fill: #a3e635; fill-opacity:.34 }
      .coreEdge  { fill:none; stroke: var(--aqua); stroke-width:1.1; stroke-opacity:.95;
                   stroke-linejoin:round; filter:url(#glowS) }
      .coreGrp { animation: breathe 4.2s var(--eio) infinite }
      @keyframes breathe { 0%,100% { opacity:.72 } 42% { opacity:1 } }
      .coreHalo { animation: halo 4.2s var(--eio) infinite; transform-box: view-box; transform-origin: 480px 448px }
      @keyframes halo { 0%,100% { opacity:.5; transform:scale(.9) } 42% { opacity:1; transform:scale(1.06) } }
    
      .hair  { fill:none; stroke: var(--line); stroke-width:.9; stroke-opacity:.55;
               stroke-linejoin:round; stroke-linecap:round; vector-effect:non-scaling-stroke }
      .hair2 { fill:none; stroke: var(--line); stroke-width:.9; stroke-opacity:.3;
               stroke-linejoin:round; stroke-linecap:round; vector-effect:non-scaling-stroke }
      .hair3 { fill:none; stroke: var(--line); stroke-width:.9; stroke-opacity:.17;
               stroke-linejoin:round; stroke-linecap:round; vector-effect:non-scaling-stroke }
      .tTop  { fill: #c6ff34; fill-opacity:.10 }
      .tSide { fill: #142008; fill-opacity:.14 }
      .tEnd  { fill: #000000; fill-opacity:.24 }
      .tDark { fill: #000000; fill-opacity:.7 }
    
      .wire  { fill:none; stroke: rgba(198, 255, 52, 0.42); stroke-width:1.05; stroke-opacity:.42; stroke-linecap:round }
      .flow  { fill:none; stroke: var(--aqua); stroke-width:1.3; stroke-opacity:.5; stroke-linecap:round;
               stroke-dasharray: 26 460; animation: dash 3.6s linear infinite }
      @keyframes dash { to { stroke-dashoffset: -486 } }
      .orbit { fill:none; stroke: rgba(198, 255, 52, 0.3); stroke-width:1; stroke-opacity:.3;
               stroke-dasharray: 2 13; animation: orbit 22s linear infinite }
      @keyframes orbit { to { stroke-dashoffset: -300 } }
      .pulse { fill:none; stroke: var(--aqua); stroke-width:1; transform-box: view-box;
               transform-origin: 480px 496px; animation: sonar 5s var(--eout) infinite }
      .pulse.b { animation-delay: 2.5s }
      @keyframes sonar { 0% { transform:scale(.3); stroke-opacity:.5 } 100% { transform:scale(1.25); stroke-opacity:0 } }
    
      .pkt { fill: var(--aqua); filter:url(#glow) }
      .pkt.amber { fill: var(--amber) }
      .node { fill: #080c0a; stroke: var(--aqua); stroke-width:1; stroke-opacity:.85 }
      .nodeRing { fill:none; stroke: var(--aqua); stroke-width:1; animation: ping 3.2s var(--eout) infinite }
      @keyframes ping { 0% { r:3.5; stroke-opacity:.7 } 100% { r:11; stroke-opacity:0 } }
    
      .sheen { animation: sweep 7s var(--eio) infinite }
      @keyframes sweep { 0% { transform:translateX(-420px) } 65%,100% { transform:translateX(950px) } }
      .beam { animation: beam 5.4s var(--eio) infinite }
      @keyframes beam { 0%,100% { opacity:.6 } 45% { opacity:1 } }
      .float { animation: float 9s var(--eio) infinite }
      @keyframes float { 0%,100% { transform:translateY(-50px) } 50% { transform:translateY(-38px) } }
    
      .rise { fill: var(--aqua); animation: rise 4.6s var(--eio) infinite; animation-delay: calc(var(--i) * 1.15s) }
      @keyframes rise { 0% { transform:translateY(0); opacity:0 } 18% { opacity:.9 } 80% { opacity:.5 }
                        100% { transform:translateY(-186px); opacity:0 } }
    
      .sync { fill:none; stroke: var(--amber); stroke-width:1.1; stroke-opacity:.65;
              stroke-dasharray: 3 5; animation: syncdash 1.6s linear infinite }
      @keyframes syncdash { to { stroke-dashoffset: -16 } }
      .qFill { fill: url(#gQueue); animation: qbreathe 4s var(--eio) infinite }
      @keyframes qbreathe { 0%,100% { opacity:.75 } 50% { opacity:1 } }
      .cnt { opacity:0; animation: cyc 8s steps(1,end) infinite; animation-delay: calc(var(--i) * 2s) }
      @keyframes cyc { 0%,24.9% { opacity:1 } 25%,100% { opacity:0 } }
    
      .led { fill: var(--aqua); animation: led 2.4s var(--eio) infinite; animation-delay: calc(var(--i) * .3s) }
      @keyframes led { 0%,100% { opacity:.2 } 45% { opacity:1 } }
      .chk { opacity:0; animation: chk 5.4s var(--eio) infinite; animation-delay: calc(var(--i) * 1.1s) }
      @keyframes chk { 0%,6% { opacity:0 } 16%,88% { opacity:1 } 100% { opacity:0 } }
      .beacon { animation: beacon 3.4s var(--eout) infinite }
      @keyframes beacon { 0% { r:2; opacity:.85 } 100% { r:14; opacity:0 } }
      .scanline { animation: sl 3.4s var(--eio) infinite }
      @keyframes sl { 0%,100% { transform:translateY(1px) } 50% { transform:translateY(23px) } }
      .scanBeam { fill:none; stroke: var(--aqua); stroke-width:1; stroke-opacity:.45;
                  stroke-dasharray: 4 7; animation: syncdash 1.4s linear infinite }
    
      .st { fill: rgba(198, 255, 52, 0.6); animation: tw 5.5s var(--eio) infinite; animation-delay: calc(var(--i) * .43s) }
      @keyframes tw { 0%,100% { opacity:.14 } 50% { opacity:.7 } }
    
      .t    { font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif; fill: var(--txt) }
      .h1   { font-size:20px; font-weight:640; letter-spacing:1.4px }
      .kick { font-size:8.5px; font-weight:560; letter-spacing:3.6px; fill: var(--aqua); fill-opacity:.85 }
      .chip { font-size:8px; font-weight:560; letter-spacing:1.4px; fill: var(--muted) }
      .micro{ font-size:8px; font-weight:500; letter-spacing:1.4px; fill: var(--muted); opacity:.75 }
      .lbl  { font-size:9.5px; font-weight:560; letter-spacing:2.8px; fill: var(--muted); opacity:.9 }
      .num  { font-size:9px; font-weight:600; letter-spacing:1.6px; fill: var(--amber);
              font-variant-numeric: tabular-nums }
      .numOk{ fill: var(--aqua) }
    
      @media (prefers-reduced-motion: reduce) { * { animation:none !important } .flow { stroke-dashoffset:-120 } }
    `}</style>

      <g>
        <circle className="st" style={{ '--i': '0' }} cx="118" cy="96" r="1.3" />
        <circle className="st" style={{ '--i': '3' }} cx="212" cy="188" r="1" />
        <circle className="st" style={{ '--i': '6' }} cx="316" cy="72" r="1.1" />
        <circle className="st" style={{ '--i': '1' }} cx="640" cy="60" r="1.2" />
        <circle className="st" style={{ '--i': '4' }} cx="762" cy="128" r="1" />
        <circle className="st" style={{ '--i': '7' }} cx="878" cy="88" r="1.4" />
        <circle className="st" style={{ '--i': '2' }} cx="906" cy="264" r="1" />
        <circle className="st" style={{ '--i': '5' }} cx="72" cy="292" r="1.1" />
        <circle className="st" style={{ '--i': '8' }} cx="120" cy="648" r="1" />
        <circle className="st" style={{ '--i': '2' }} cx="436" cy="662" r="1.2" />
        <circle className="st" style={{ '--i': '9' }} cx="612" cy="668" r="1" />
        <circle className="st" style={{ '--i': '6' }} cx="918" cy="470" r="1.1" />
        <circle className="st" style={{ '--i': '3' }} cx="44" cy="418" r="1" />
        <circle className="st" style={{ '--i': '7' }} cx="900" cy="616" r="1.3" />
      </g>

      <g className="beam"><path d="M359,118 L480,188 L601,118 L564,400 L480,448 L396,400 Z" fill="url(#gBeam)" /></g>

      {/* floor */}
      <g>
        <ellipse cx="480" cy="500" rx="230" ry="132" fill="url(#gFloor)" />
        <ellipse className="pulse" cx="480" cy="496" rx="150" ry="87" />
        <ellipse className="pulse b" cx="480" cy="496" rx="150" ry="87" />
        <ellipse className="orbit" cx="480" cy="496" rx="162" ry="94" />
        <path d="M480,415 L620,496 L480,577 L340,496 Z" fill="url(#gSlab)" />
        <path className="hair" d="M480,415 L620,496 L480,577 L340,496 Z" />
        <path className="hair2" d="M340,496 L340,508 L480,589 L620,508 L620,496 M480,577 L480,589" />
        <path className="hair3" d="M410,455 L550,536 M550,455 L410,536" strokeDasharray="2 7" />
      </g>

      {/* component lattice */}
      <g transform="translate(480,352)">
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(0,0)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(-28,16)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(28,16)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(-56,32)" />
        <use className="cell" style={{ '--i': '2' }} xlinkHref="#cube" href="#cube" transform="translate(0,32)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(56,32)" />
        <use className="cell" style={{ '--i': '2' }} xlinkHref="#cube" href="#cube" transform="translate(-28,48)" />
        <use className="cell" style={{ '--i': '2' }} xlinkHref="#cube" href="#cube" transform="translate(28,48)" />
        <use className="cell" style={{ '--i': '2' }} xlinkHref="#cube" href="#cube" transform="translate(-56,64)" />
        <use className="cell" style={{ '--i': '2' }} xlinkHref="#cube" href="#cube" transform="translate(56,64)" />
        <use className="cell" style={{ '--i': '2' }} xlinkHref="#cube" href="#cube" transform="translate(-28,80)" />
        <use className="cell" style={{ '--i': '2' }} xlinkHref="#cube" href="#cube" transform="translate(28,80)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(-56,96)" />
        <use className="cell" style={{ '--i': '2' }} xlinkHref="#cube" href="#cube" transform="translate(0,96)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(56,96)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(-28,112)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(28,112)" />
        <use className="cell" style={{ '--i': '4' }} xlinkHref="#cube" href="#cube" transform="translate(0,128)" />
      </g>
      <circle className="coreHalo" cx="480" cy="448" r="96" fill="url(#gCore)" />
      <g className="coreGrp" transform="translate(480,416)">
        <path className="coreTop" d="M0,0 L28,16 L0,32 L-28,16 Z" />
        <path className="coreLeft" d="M-28,16 L0,32 L0,64 L-28,48 Z" />
        <path className="coreRight" d="M28,16 L0,32 L0,64 L28,48 Z" />
        <path className="coreEdge" d="M0,0 L28,16 L28,48 L0,64 L-28,48 L-28,16 Z M-28,16 L0,32 L28,16 M0,32 L0,64" />
      </g>
      <circle className="rise" style={{ '--i': '0' }} cx="462" cy="404" r="1.8" />
      <circle className="rise" style={{ '--i': '1' }} cx="486" cy="416" r="2.1" />
      <circle className="rise" style={{ '--i': '2' }} cx="504" cy="398" r="1.6" />

      {/* ============ WAREHOUSE: pallet + crates ============ */}
      <g>
        <ellipse cx="270" cy="626" rx="86" ry="34" fill="url(#gFloor)" opacity=".5" />
        <path className="tTop" d="M228,610 L270,585.8 L312,610 L270,634.2 Z" />
        <path className="hair" d="M228,610 L270,585.8 L312,610 L270,634.2 Z" />
        <path className="tEnd" d="M228,610 L270,634.2 L270,643.2 L228,619 Z" />
        <path className="tSide" d="M312,610 L270,634.2 L270,643.2 L312,619 Z" />
        <path className="hair2" d="M228,610 L228,619 L270,643.2 L312,619 L312,610 M270,634.2 L270,643.2" />
        <path className="hair3" d="M242,602 L284,626 M256,594 L298,618" />

        <g>
          <path className="tEnd" d="M240,558 L270,575.3 L270,601.3 L240,584 Z" />
          <path className="tSide" d="M300,558 L270,575.3 L270,601.3 L300,584 Z" />
          <path className="tTop" d="M270,540.7 L300,558 L270,575.3 L240,558 Z" />
          <path className="hair" d="M270,540.7 L300,558 L300,584 L270,601.3 L240,584 L240,558 Z M240,558 L270,575.3 L300,558 M270,575.3 L270,601.3" />
          <path className="hair3" d="M246,565 L264,575.5 M276,575.5 L294,565" strokeDasharray="2 4" />
        </g>
        <g>
          <path className="tEnd" d="M240,584 L270,601.3 L270,627.3 L240,610 Z" />
          <path className="tSide" d="M300,584 L270,601.3 L270,627.3 L300,610 Z" />
          <path className="hair" d="M240,584 L270,601.3 L300,584 M270,601.3 L270,627.3 M240,584 V610 L270,627.3 L300,610 V584" />
          <rect x="247" y="596" width="16" height="11" rx="1.5" fill="#c6ff34" fillOpacity=".16" transform="skewY(30)" style={{ transformOrigin: "247px 596px" }} />
          <g className="hair2" transform="translate(247,596) skewY(30)">
            <path d="M2,2 V9 M5,2 V9 M7,2 V9 M10,2 V9 M12,2 V9" strokeOpacity=".55" />
          </g>
        </g>
        <g>
          <path className="hair2" stroke="#c6ff34" strokeOpacity=".7" d="M243,568 v-5 l7,-4 M291,563 l7,4 v5 M243,586 v5 l7,4 M298,591 v-5 l-7,-4" />
          <circle className="beacon" cx="270" cy="577" r="2" fill="none" stroke="var(--aqua)" strokeWidth="1" />
        </g>
      </g>
      {/* ============ SCANNER / MOBILE ============ */}
      <g transform="matrix(.866,.5,0,-1,110,540)">
        <path className="tSide" d="M0,0 H74 V136 H0 Z" />
        <path className="hair" d="M0,4 a4,4 0 0 1 4,-4 H70 a4,4 0 0 1 4,4 V132 a4,4 0 0 1 -4,4 H4 a4,4 0 0 1 -4,-4 Z" />
        <path className="hair2" d="M5,8 H69 V122 H5 Z" />
        <g clipPath="url(#phoneClip)">
          <path className="hair3" d="M5,104 H69" />
          <rect x="10" y="110" width="26" height="4" rx="2" fill="rgba(198, 255, 52, 0.4)" fillOpacity=".45" />
          <rect x="60" y="109" width="6" height="6" rx="1" fill="#c6ff34" fillOpacity=".55" />
          <g clipPath="url(#vfClip)">
            <rect x="21" y="60" width="32" height="26" fill="#c6ff34" fillOpacity=".07" />
            <g className="scanline"><rect x="21" y="60" width="32" height="3" fill="#c6ff34" fillOpacity=".55" /></g>
          </g>
          <path className="hair" stroke="#c6ff34" strokeOpacity=".8" d="M21,68 V60 H29 M45,60 H53 V68 M53,78 V86 H45 M29,86 H21 V78" />
          <path className="hair3" d="M10,50 H64 M10,42 H52 M10,26 H64 M10,18 H44" />
          <rect x="10" y="30" width="54" height="8" rx="2" fill="#c6ff34" fillOpacity=".24" />
          <rect x="10" y="30" width="54" height="8" rx="2" className="hair2" stroke="#c6ff34" strokeOpacity=".4" />
          <circle className="led" style={{ '--i': '0' }} cx="14" cy="34" r="1.6" />
        </g>
        <path className="hair3" d="M28,128 H46" />
        <g className="hair2" transform="translate(-52,44)">
          <path d="M0,0 H7 M0,0 V6 M32,0 H39 M39,0 V6 M0,32 V26 M0,32 H7 M39,32 V26 M39,32 H32" />
          <g stroke="rgba(198, 255, 52, 0.4)" strokeOpacity=".5">
            <path d="M11,7 V25" strokeWidth="1.6" /><path d="M15,7 V25" strokeWidth=".8" />
            <path d="M18,7 V25" strokeWidth="2" /><path d="M22.5,7 V25" strokeWidth=".8" />
            <path d="M25.5,7 V25" strokeWidth="1.2" /><path d="M29,7 V25" strokeWidth="2" />
          </g>
        </g>
      </g>
      <path className="scanBeam" d="M176,522 C204,532 226,552 246,570" />
      {/* ============ OFFLINE QUEUE ============ */}
      <g>
        <path id="syncLine" className="sync" d="M636,222 L636,242" />
        <path d="M636,248 L631.6,238 L640.4,238 Z" fill="#a3e635" fillOpacity=".8" />
        <path className="qFill" d="M610,294 a26,10 0 0 0 52,0 V316 a26,10 0 0 1 -52,0 Z" />
        <path className="tSide" d="M610,250 V316 a26,10 0 0 0 52,0 V250 a26,10 0 0 0 -52,0 Z" />
        <ellipse cx="636" cy="250" rx="26" ry="10" fill="rgba(198, 255, 52, 0.13)" fillOpacity=".13" />
        <path className="hair" d="M610,250 V316 a26,10 0 0 0 52,0 V250" />
        <ellipse className="hair" cx="636" cy="250" rx="26" ry="10" />
        <path className="hair2" d="M610,272 a26,10 0 0 0 52,0" />
        <path className="hair2" d="M610,294 a26,10 0 0 0 52,0" />
        <circle className="led" style={{ '--i': '0' }} cx="620" cy="262" r="1.5" fill="var(--amber)" />
        <circle className="led" style={{ '--i': '1' }} cx="620" cy="284" r="1.5" fill="var(--amber)" />
        <circle className="led" style={{ '--i': '2' }} cx="620" cy="306" r="1.5" fill="var(--aqua)" />
      </g>
      {/* ============ TRUCK ============ */}
      <g transform="translate(766,445) scale(1.12) translate(-766,-445)">
        <ellipse cx="768" cy="484" rx="108" ry="50" fill="url(#gFloor)" opacity=".55" />
        <path className="hair3" d="M722.3,421 L862.6,502 L810.6,532 L670.3,452 Z" strokeDasharray="3 6" />

        <g transform="matrix(.866,.5,0,-1,685.9,452)">
          <circle className="tDark" cx="26" cy="11" r="11" /><circle className="hair2" cx="26" cy="11" r="11" fill="none" />
          <circle className="tDark" cx="118" cy="11" r="11" /><circle className="hair2" cx="118" cy="11" r="11" fill="none" />
        </g>

        <g transform="matrix(-.866,.5,0,-1,724,430)">
          <path className="tEnd" d="M0,12 H44 V64 H0 Z" />
          <path className="hair" d="M0,12 H44 V64 H0 Z" />
          <path className="hair2" d="M3,15 H41 V61 H3 Z M22,15 V61" />
          <path className="hair3" d="M3,21 H8 M3,38 H8 M3,55 H8 M41,21 H36 M41,38 H36 M41,55 H36" />
          <path className="hair2" d="M19.5,34 V42 M24.5,34 V42" strokeOpacity=".55" />
          <rect x="28" y="20" width="10" height="7" rx="1" fill="#c6ff34" fillOpacity=".2" />
          <path className="hair3" d="M8,20 H16 M8,24 H14" />
        </g>

        <g transform="matrix(.866,.5,-.866,.5,724,366)">
          <path className="tTop" d="M0,0 H96 V44 H0 Z" />
          <path className="hair" d="M0,0 H96 V44 H0 Z" />
          <path className="hair3" d="M0,10 H96 M0,22 H96 M0,34 H96" />
        </g>

        <g transform="matrix(.866,.5,0,-1,724,430)">
          <path className="tDark" d="M2,6 H140 V12 H2 Z" />
          <path className="tSide" d="M0,12 H96 V64 H0 Z" />
          <path className="hair" d="M0,12 H96 V64 H0 Z" />
          <path className="hair3" d="M12,15 V61 M24,15 V61 M36,15 V61 M48,15 V61 M60,15 V61 M72,15 V61 M84,15 V61" />
          <path className="hair2" d="M0,58 H96 M0,18 H96" />
          <rect x="6" y="46" width="34" height="8" rx="2" fill="#c6ff34" fillOpacity=".14" />
          <g>
            <rect className="led" style={{ '--i': '0' }} x="9" y="49" width="6" height="2.5" rx="1.2" />
            <rect className="led" style={{ '--i': '1' }} x="18" y="49" width="6" height="2.5" rx="1.2" />
            <rect className="led" style={{ '--i': '2' }} x="27" y="49" width="6" height="2.5" rx="1.2" />
          </g>
          <path className="hair2" d="M0,12 H96" strokeOpacity=".45" />
        </g>

        <g transform="matrix(.866,.5,-.866,.5,724,378)">
          <path className="tTop" d="M96,0 H130 V44 H96 Z" />
          <path className="hair" d="M96,0 H130 V44 H96 Z" />
          <path className="hair3" d="M96,14 H130 M96,30 H130" />
        </g>

        <g transform="matrix(.866,.5,0,-1,724,430)">
          <path className="tSide" d="M96,12 H130 V52 H96 Z" />
          <path className="hair" d="M96,12 H130 V52 H96 Z" />
          <path className="hair2" d="M100,14 V50" />
          <path className="tDark" d="M104,30 H126 V46 H104 Z" fillOpacity=".35" />
          <rect x="104" y="30" width="22" height="16" rx="2" fill="url(#gGlass)" />
          <path className="hair2" d="M104,30 H126 V46 H104 Z" />
          <path className="hair3" d="M108,46 L118,30 M116,46 L126,32" />
          <path className="hair2" d="M104,24 H112" />
          <path className="hair2" d="M108,14 h-4 a10,10 0 0 1 20,0 h-4" strokeOpacity=".35" />
          <path className="hair2" d="M130,40 h7 v8" />
        </g>

        <g transform="matrix(-.866,.5,0,-1,836.58,495)">
          <path className="tEnd" d="M0,32 H44 V52 H0 Z" fillOpacity=".18" />
          <rect x="3" y="34" width="38" height="17" rx="2" fill="url(#gGlass)" />
          <path className="hair" d="M0,32 H44 V52 H0 Z" />
          <path className="hair2" d="M3,34 H41 V51 H3 Z" />
          <path className="hair3" d="M8,51 L20,34 M18,51 L30,34" />
        </g>

        <g transform="matrix(-.866,.5,0,-1,846.97,501)">
          <path className="tEnd" d="M0,12 H44 V32 H0 Z" />
          <path className="hair" d="M0,12 H44 V32 H0 Z" />
          <path className="hair2" d="M0,15 H44" />
          <path className="hair3" d="M12,20 H32 M12,23 H32 M12,26 H32" />
          <rect x="4" y="19" width="7" height="5" rx="1.6" fill="#c6ff34" fillOpacity=".5" />
          <rect x="33" y="19" width="7" height="5" rx="1.6" fill="#c6ff34" fillOpacity=".5" />
        </g>

        <g transform="matrix(.866,.5,0,-1,724,430)">
          <path className="tSide" d="M130,12 H142 V32 H130 Z" />
          <path className="hair" d="M130,12 H142 V32 H130 Z" />
          <path className="hair3" d="M130,20 H142" />
          <circle className="tDark" cx="26" cy="11" r="11" />
          <circle className="hair" cx="26" cy="11" r="11" fill="none" />
          <circle className="hair2" cx="26" cy="11" r="4.5" fill="none" />
          <circle className="tDark" cx="118" cy="11" r="11" />
          <circle className="hair" cx="118" cy="11" r="11" fill="none" />
          <circle className="hair2" cx="118" cy="11" r="4.5" fill="none" />
          <path className="hair2" d="M15,12 a11,11 0 0 1 22,0" strokeOpacity=".4" />
          <path className="hair2" d="M107,12 a11,11 0 0 1 22,0" strokeOpacity=".4" />
        </g>

        <g>
          <path className="hair2" d="M826.2,445 V424" stroke="var(--aqua)" strokeOpacity=".6" />
          <circle cx="826.2" cy="422" r="2" fill="var(--aqua)" filter="url(#glowS)" />
          <circle className="beacon" cx="826.2" cy="422" r="2" fill="none" stroke="var(--aqua)" strokeWidth="1" />
        </g>
      </g>
      {/* ============ DIGITAL MANIFEST ============ */}
      <g transform="matrix(.866,.5,0,-1,786,636)">
        <path className="tSide" d="M0,0 H48 V64 H0 Z" />
        <path className="hair" d="M0,0 H48 V64 H0 Z" />
        <path className="hair2" d="M0,54 H48" />
        <rect x="5" y="57" width="18" height="3" rx="1.5" fill="#c6ff34" fillOpacity=".5" />
        <g className="hair3"><path d="M14,46 H43 M14,36 H43 M14,26 H38" /></g>
        <g className="hair2">
          <path d="M5,43 h6 v6 h-6 Z M5,33 h6 v6 h-6 Z M5,23 h6 v6 h-6 Z" />
        </g>
        <g stroke="var(--aqua)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
          <path className="chk" style={{ '--i': '0' }} d="M6,46 l2.2,-2.4 l3.4,3.8" />
          <path className="chk" style={{ '--i': '1' }} d="M6,36 l2.2,-2.4 l3.4,3.8" />
          <path className="chk" style={{ '--i': '2' }} d="M6,26 l2.2,-2.4 l3.4,3.8" />
        </g>
        <path className="hair2" d="M6,10 c4,6 7,-6 11,0 c3,4 6,-5 9,1 c2,3 4,-2 6,1" strokeOpacity=".45" />
        <path className="hair3" d="M5,5 H43" />
      </g>
      <path className="hair3" d="M844,540 C842,562 828,566 818,578" strokeDasharray="3 6" />
      {/* ============ WIRES ============ */}
      <g>
        <path id="cableA" className="wire" d="M175,505 C226,505 232,538 284,532 C336,526 352,482 398,464" />
        <path className="flow" d="M175,505 C226,505 232,538 284,532 C336,526 352,482 398,464" />

        <path id="cableB" className="wire" d="M562,462 C598,458 606,428 612,398 C618,366 620,340 628,320" />
        <path className="flow" style={{ animationDelay: "-1.8s" }} d="M562,462 C598,458 606,428 612,398 C618,366 620,340 628,320" />

        <path id="cableC" className="wire" d="M660,308 C698,318 706,352 700,382 C696,398 690,402 683,408" />
        <path className="sync" d="M660,308 C698,318 706,352 700,382 C696,398 690,402 683,408" strokeOpacity=".4" />

        <circle className="node" cx="398" cy="464" r="3.2" />
        <circle className="nodeRing" cx="398" cy="464" r="3.5" />
        <circle className="node" cx="562" cy="462" r="3.2" />
        <circle className="nodeRing" cx="562" cy="462" r="3.5" style={{ animationDelay: "-1.6s" }} />
        <circle className="node" cx="683" cy="408" r="3" stroke="var(--amber)" />
        <circle className="nodeRing" cx="683" cy="408" r="3.2" stroke="var(--amber)" style={{ animationDelay: "-.8s" }} />
      </g>

      {/* ============ CONTROL PLANE ============ */}
      <g className="float">
        <path d="M245,168 L480,304 L480,311 L245,175 Z" fill="rgba(0, 0, 0, 0.6)" fillOpacity=".5" />
        <path d="M715,168 L480,304 L480,311 L715,175 Z" fill="rgba(20, 32, 8, 0.4)" fillOpacity=".38" />
        <path className="hair3" d="M245,175 L480,311 L715,175" />
        <path d="M480,32 L715,168 L480,304 L245,168 Z" fill="url(#gPanel)" />
        <g clipPath="url(#panelClip)">
          <g transform="matrix(.866,.5,-.866,.5,480,168)">
            <g stroke="rgba(198, 255, 52, 0.3)" strokeOpacity=".07" strokeWidth="1">
              <path d="M-136,-102 H136 M-136,-68 H136 M-136,-34 H136 M-136,0 H136 M-136,34 H136 M-136,68 H136 M-136,102 H136" />
              <path d="M-102,-136 V136 M-68,-136 V136 M-34,-136 V136 M0,-136 V136 M34,-136 V136 M68,-136 V136 M102,-136 V136" />
            </g>
          </g>
          <rect className="sheen" x="-160" y="10" width="240" height="320" fill="url(#gSheen)" />
        </g>
        <path className="hair" d="M480,32 L715,168 L480,304 L245,168 Z" />
        <path className="hair3" d="M480,44 L703,173 M480,44 L257,173" strokeDasharray="1 6" />
        <g stroke="#c6ff34" strokeOpacity=".7" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M480,44 L468,37 M480,44 L492,37" />
          <path d="M703,168 L691,175 M703,168 L691,161" />
          <path d="M257,168 L269,175 M257,168 L269,161" />
          <path d="M480,292 L468,299 M480,292 L492,299" />
        </g>

        <g transform="matrix(.866,.5,-.866,.5,480,168)">
          <text className="t kick" x="-128" y="-64">POWER APPS · CODE APPS</text>
          <text className="t h1" x="-128" y="-38">CUSTOM APPS &amp;</text>
          <text className="t h1" x="-128" y="-14">FIELD OPERATIONS</text>
          <path d="M-128,4 H122" stroke="rgba(198, 255, 52, 0.3)" strokeOpacity=".22" strokeWidth="1" />
          <g>
            <rect x="-128" y="14" width="104" height="19" rx="9.5" fill="rgba(198, 255, 52, 0.1)" fillOpacity=".08" stroke="rgba(198, 255, 52, 0.4)" strokeOpacity=".22" strokeWidth="1" />
            <text className="t chip" x="-76" y="27" textAnchor="middle">OFFLINE-FIRST</text>
            <rect x="-16" y="14" width="92" height="19" rx="9.5" fill="rgba(198, 255, 52, 0.1)" fillOpacity=".08" stroke="rgba(198, 255, 52, 0.4)" strokeOpacity=".22" strokeWidth="1" />
            <text className="t chip" x="30" y="27" textAnchor="middle">REACT / PCF</text>
          </g>
          <text className="t micro" x="-128" y="52">DISPATCH · SCAN · MANIFESTS · NO PAPER</text>
          <g className="hair2" transform="translate(86,-78)" strokeOpacity=".7">
            <path d="M6,14 a7,7 0 0 1 1.6,-13.8 a9,9 0 0 1 16.6,2.4 a6,6 0 0 1 -1.2,11.4 Z" />
            <path d="M11,8.5 h8 M11,8.5 l2.4,-2.4 M19,11 h-8 M19,11 l-2.4,2.4" />
          </g>
        </g>
      </g>

      {/* ============ PACKETS ============ */}
      <g>
        <circle className="pkt" r="2.6">
          <animateMotion dur="3.6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
            <mpath xlinkHref="#cableA" href="#cableA" /></animateMotion>
          <animate attributeName="opacity" dur="3.6s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.1;0.86;1" />
        </circle>
        <circle className="pkt" r="2.4">
          <animateMotion dur="3.6s" begin="-0.9s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
            <mpath xlinkHref="#uplink" href="#uplink" /></animateMotion>
          <animate attributeName="opacity" dur="3.6s" begin="-0.9s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.1;0.86;1" />
        </circle>
        <circle className="pkt" r="2.6">
          <animateMotion dur="3.6s" begin="-1.8s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
            <mpath xlinkHref="#cableB" href="#cableB" /></animateMotion>
          <animate attributeName="opacity" dur="3.6s" begin="-1.8s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.1;0.86;1" />
        </circle>
        <circle className="pkt amber" r="2.4">
          <animateMotion dur="3.2s" begin="-1.2s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
            <mpath xlinkHref="#cableC" href="#cableC" /></animateMotion>
          <animate attributeName="opacity" dur="3.2s" begin="-1.2s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.12;0.84;1" />
        </circle>
        <circle className="pkt amber" r="2.2">
          <animateMotion dur="1.9s" repeatCount="indefinite" calcMode="linear">
            <mpath xlinkHref="#syncLine" href="#syncLine" /></animateMotion>
          <animate attributeName="opacity" dur="1.9s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.15;0.8;1" />
        </circle>
      </g>
    </svg>
  );
}
function DocumentOcrAiMatchingLoop({ tick }) {
  return (
    <svg x="-305" y="-170" width="610" height="332" viewBox="0 0 680 370" preserveAspectRatio="xMidYMid meet" role="img" aria-label="AI Matching Engine & Document Ingestion" style={{ backgroundColor: 'transparent', overflow: 'visible' }}>
      <defs>
        {/* Glow Filters */}
        <filter id="glowBrainExtreme" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur1" />
          <feGaussianBlur stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowLime" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <linearGradient id="brainHologramGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#c6ff34" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#c6ff34" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c6ff34" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="redAlertGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(239, 68, 68, 0.35)" />
          <stop offset="100%" stopColor="rgba(15, 23, 42, 0.95)" />
        </linearGradient>

        <style>{`
          @keyframes rotateRpaClock {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes rotateRpaCounter {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          @keyframes flowDash {
            to { stroke-dashoffset: -36; }
          }
          @keyframes synapseFlashes {
            0%, 100% { opacity: 0.35; transform: scale(0.85); }
            50% { opacity: 1; transform: scale(1.25); }
          }
          @keyframes laserScanLine {
            0% { transform: translateY(-8px); opacity: 0.2; }
            50% { opacity: 0.9; }
            100% { transform: translateY(32px); opacity: 0.2; }
          }
          @keyframes alertPulseGlow {
            0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.6)); }
            50% { opacity: 1; filter: drop-shadow(0 0 14px rgba(239, 68, 68, 0.95)); }
          }

          .gear-clock { transform-box: fill-box; transform-origin: center; animation: rotateRpaClock 8s linear infinite; }
          .gear-counter { transform-box: fill-box; transform-origin: center; animation: rotateRpaCounter 8s linear infinite; }
          .flow-green { stroke-dasharray: 6 6; animation: flowDash 1.5s linear infinite; }
          .flow-red { stroke-dasharray: 6 6; animation: flowDash 1.8s linear infinite; }
          .synapse { transform-box: fill-box; transform-origin: center; animation: synapseFlashes 2s ease-in-out infinite; }
          .alert-badge-glow { animation: alertPulseGlow 2.5s ease-in-out infinite; }
          .document-scan-line { animation: laserScanLine 2.5s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* ─── FLOW PATHS (BEZIER CONNECTIONS PERFECTLY ANCHORED) ─── */}
      {/* 1. Global Ingestion Docs -> Headless RPA */}
      <path id="pathIngestToRpa" d="M 150 160 C 180 160, 190 200, 215 210" fill="none" stroke="rgba(198, 255, 52, 0.35)" strokeWidth="1.5" />
      <path d="M 150 160 C 180 160, 190 200, 215 210" fill="none" stroke="#c6ff34" strokeWidth="1.5" className="flow-green" opacity="0.65" />

      {/* 2. Headless RPA -> Central Chip (AI Matching Engine) */}
      <path id="pathRpaToChip" d="M 260 215 C 280 215, 290 220, 305 220" fill="none" stroke="rgba(198, 255, 52, 0.4)" strokeWidth="1.75" />
      <path d="M 260 215 C 280 215, 290 220, 305 220" fill="none" stroke="#c6ff34" strokeWidth="1.75" className="flow-green" opacity="0.85" />

      {/* 3. Central Chip -> Matched Documents (Top Right - Green Flow) */}
      <path id="pathChipToMatched" d="M 405 205 C 445 185, 480 160, 525 145" fill="none" stroke="rgba(16, 185, 129, 0.45)" strokeWidth="1.75" />
      <path d="M 405 205 C 445 185, 480 160, 525 145" fill="none" stroke="#10b981" strokeWidth="1.75" className="flow-green" opacity="0.85" />

      {/* Return Flow: Matched Docs -> Verification Node */}
      {/* 4. Central Chip -> Discrepancies Detected (Bottom Right - Red Flow) */}
      <path id="pathChipToAlert" d="M 400 240 C 440 260, 470 280, 505 285" fill="none" stroke="rgba(239, 68, 68, 0.45)" strokeWidth="1.75" />
      <path d="M 400 240 C 440 260, 470 280, 505 285" fill="none" stroke="#ef4444" strokeWidth="1.75" className="flow-red" opacity="0.85" />

      {/* ─── ANIMATED DATA PACKETS ─── */}
      <circle r="3" fill="#c6ff34" filter="url(#glowLime)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 150 160 C 180 160, 190 200, 215 210" />
      </circle>
      <circle r="3.2" fill="#c6ff34" filter="url(#glowLime)">
        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 260 215 C 280 215, 290 220, 305 220" />
      </circle>
      <circle r="3.2" fill="#10b981" filter="url(#glowLime)">
        <animateMotion dur="2.0s" repeatCount="indefinite" path="M 405 205 C 445 185, 480 160, 525 145" />
      </circle>
      <circle r="3" fill="#ef4444" filter="url(#glowRed)">
        <animateMotion dur="1.9s" repeatCount="indefinite" path="M 400 240 C 440 260, 470 280, 505 285" />
      </circle>

      {/* ─── FAR LEFT: GLOBAL INGESTION DOCUMENTS STACK ─── */}
      <g transform="translate(90, 110)">
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const yOff = -idx * 6.5;
          const isTop = idx === 5;
          return (
            <g key={idx} transform={`translate(0, ${yOff})`}>
              <polygon points="38,0 76,19 38,38 0,19" fill={isTop ? 'rgba(15, 23, 42, 0.95)' : 'rgba(8, 12, 10, 0.9)'} stroke={isTop ? '#c6ff34' : 'rgba(198, 255, 52, 0.3)'} strokeWidth={isTop ? '1.5' : '1'} />
              <polygon points="0,19 38,38 38,43 0,24" fill="rgba(5, 8, 6, 0.95)" stroke={isTop ? '#c6ff34' : 'rgba(198, 255, 52, 0.2)'} strokeWidth="0.75" />
              <polygon points="38,38 76,19 76,24 38,43" fill="rgba(12, 18, 14, 0.9)" stroke={isTop ? '#c6ff34' : 'rgba(198, 255, 52, 0.2)'} strokeWidth="0.75" />

              {isTop && (
                <g stroke="#c6ff34" strokeWidth="1" strokeLinecap="round" opacity="0.8">
                  <line x1="18" y1="17" x2="42" y2="29" />
                  <line x1="20" y1="13" x2="50" y2="28" />
                  <line x1="28" y1="12" x2="56" y2="26" />
                  <line x1="36" y1="11" x2="60" y2="23" />

                  <g className="document-scan-line">
                    <line x1="6" y1="15" x2="70" y2="23" stroke="#ffffff" strokeWidth="1.5" filter="url(#glowLime)" opacity="0.9" />
                  </g>
                </g>
              )}
            </g>
          );
        })}

        <text x="38" y="66" fill="#ffffff" fontSize="8" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.1">GLOBAL INGESTION</text>
        <text x="38" y="76" fill="#c6ff34" fontSize="7.5" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.9">DOCUMENTS</text>
      </g>

      {/* ─── MID-LEFT: HEADLESS RPA (3 INTERLOCKING GEARS + Sleek Robot Badge) ─── */}
      <g transform="translate(230, 215)">
        <g className="gear-clock" transform="translate(0, 0)">
          <circle cx="0" cy="0" r="16" fill="rgba(8, 12, 10, 0.9)" stroke="#c6ff34" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="6" fill="rgba(198, 255, 52, 0.2)" stroke="#c6ff34" strokeWidth="1" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <rect key={i} x="-2.5" y="-19" width="5" height="5" rx="1" fill="#c6ff34" transform={`rotate(${deg})`} />
          ))}
        </g>

        <g className="gear-counter" transform="translate(18, -14)">
          <circle cx="0" cy="0" r="11" fill="rgba(8, 12, 10, 0.9)" stroke="#a3e635" strokeWidth="1.25" />
          <circle cx="0" cy="0" r="4" fill="rgba(163, 230, 53, 0.2)" stroke="#a3e635" strokeWidth="0.8" />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <rect key={i} x="-2" y="-13.5" width="4" height="4" rx="1" fill="#a3e635" transform={`rotate(${deg})`} />
          ))}
        </g>

        <g className="gear-counter" transform="translate(16, 15)">
          <circle cx="0" cy="0" r="9" fill="rgba(8, 12, 10, 0.9)" stroke="#84cc16" strokeWidth="1.25" />
          <circle cx="0" cy="0" r="3" fill="rgba(132, 204, 22, 0.2)" stroke="#84cc16" strokeWidth="0.8" />
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <rect key={i} x="-1.5" y="-11" width="3" height="3" rx="0.75" fill="#84cc16" transform={`rotate(${deg})`} />
          ))}
        </g>

        <g transform="translate(0, 0)">
          <rect x="-8" y="-7" width="16" height="12" rx="3" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1" />
          <rect x="-5" y="-4" width="10" height="4" rx="1" fill="#c6ff34" filter="url(#glowLime)" />
          <line x1="0" y1="-7" x2="0" y2="-11" stroke="#c6ff34" strokeWidth="1" />
          <circle cx="0" cy="-12" r="1.5" fill="#c6ff34" />
        </g>

        <text x="6" y="32" fill="#ffffff" fontSize="8" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">HEADLESS RPA</text>
      </g>

      {/* ─── CENTER HERO: AI MATCHING ENGINE (11 ISOMETRIC PATHS + HIGH-FIDELITY 2.5D ISOMETRIC BRAIN) ─── */}
      <g transform="translate(227, 182)">
        {/* Vertical Holographic Light Beam Cylinder */}
        <polygon points="133,52 178,28 223,52 178,76" fill="url(#brainHologramGrad)" transform="translate(-45, -75) scale(1, 1.85)" />
        <line x1="133" y1="10" x2="133" y2="-45" stroke="#c6ff34" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.8" />
        <line x1="118" y1="18" x2="118" y2="-32" stroke="#c6ff34" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
        <line x1="148" y1="18" x2="148" y2="-32" stroke="#c6ff34" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />

        {/* 11 3D Isometric Base Slab Paths (Exact User Snippet Geometry) */}
        <g transform="translate(0, 0)">
          <path fillRule="evenodd" clipRule="evenodd" d="M117.978 4.83624L84.9297 23.9169C80.6622 26.3808 78.4503 29.5821 78.2941 32.8104L78.2965 33.5934C78.4101 35.6761 79.3795 37.7462 81.2047 39.6128C82.1947 40.6252 83.4363 41.5777 84.9297 42.4399L115.865 60.3002L115.91 60.3261C124.773 65.4151 139.103 65.4065 147.947 60.3002L180.996 41.2195C182.512 40.3441 183.769 39.3757 184.766 38.3461C186.615 36.4367 187.572 34.3167 187.637 32.1893V31.7267C187.538 28.4522 185.324 25.1952 180.996 22.6965L150.061 4.83624C141.202 -0.278746 126.838 -0.278745 117.978 4.83624ZM142.971 6.66605L177.735 26.7362C182.243 29.339 182.756 33.375 179.274 36.3041C178.827 36.6803 178.314 37.0383 177.735 37.3726L142.237 57.8674C141.621 58.2231 140.957 58.4973 140.268 58.6731C133.97 60.2796 130.776 60.5303 123.852 58.6698C123.211 58.4976 122.595 58.2355 122.02 57.9037L88.2395 38.4004C87.6089 38.0363 87.0565 37.6442 86.5822 37.231C83.2303 34.3107 83.7827 30.337 88.2395 27.7639L124.548 6.80124C130.363 4.40358 136.724 4.30672 142.971 6.66605Z" fill="rgba(15, 23, 42, 0.98)" stroke="#c6ff34" strokeWidth="1" />
          <path d="M124.548 15.1318C129.635 12.1946 137.883 12.1946 142.971 15.1318V6.66605C136.724 4.30672 130.363 4.40358 124.548 6.80124V15.1318Z" fill="rgba(198, 255, 52, 0.2)" />
          <path d="M177.735 26.7362L142.971 6.66605V15.1318L177.617 35.1347C178.248 35.4988 178.8 35.8909 179.274 36.3041C182.756 33.375 182.243 29.339 177.735 26.7362Z" fill="rgba(198, 255, 52, 0.15)" />
          <path d="M88.1217 36.1625L124.548 15.1318V6.80124L88.2395 27.7639C83.7827 30.337 83.2303 34.3107 86.5822 37.231C87.0294 36.8548 87.5426 36.4968 88.1217 36.1625Z" fill="rgba(198, 255, 52, 0.15)" />
          <path d="M84.9747 55.2625L115.91 73.1227V60.3261L115.865 60.3002L84.9297 42.4399V55.2364L84.9747 55.2625Z" fill="rgba(8, 12, 10, 0.98)" />
          <path d="M84.9297 42.4399C83.4363 41.5777 82.1947 40.6252 81.2047 39.6128C79.3795 37.7462 78.4101 35.6761 78.2965 33.5934L78.334 45.7608C78.226 49.1811 80.4246 52.6211 84.9297 55.2364V42.4399Z" fill="rgba(5, 8, 6, 0.98)" />
          <path d="M115.91 73.1227C124.754 78.229 139.084 78.2377 147.947 73.1486V60.3002C139.103 65.4065 124.773 65.4151 115.91 60.3261V73.1227Z" fill="rgba(12, 18, 14, 0.98)" />
          <path d="M180.996 41.2195L147.947 60.3002V73.1486L147.992 73.1227L180.996 54.068V41.2195Z" fill="rgba(10, 16, 26, 0.98)" />
          <path d="M184.766 38.3461C183.769 39.3757 182.512 40.3441 180.996 41.2195V54.068L181.041 54.042C185.088 51.7054 187.288 48.7057 187.637 45.6486V32.1893C187.572 34.3167 186.615 36.4367 184.766 38.3461Z" fill="rgba(10, 16, 26, 0.98)" />
          <path d="M140.268 58.6731C140.957 58.4973 141.621 58.2231 142.237 57.8674L177.735 37.3726C178.314 37.0383 178.827 36.6803 179.274 36.3041C178.8 35.8909 178.248 35.4988 177.617 35.1347L142.971 15.1318C137.883 12.1946 129.635 12.1946 124.548 15.1318L88.1217 36.1625C87.5426 36.4968 87.0294 36.8548 86.5822 37.231C87.0565 37.6442 87.6089 38.0363 88.2395 38.4004L122.02 57.9037C122.595 58.2355 123.211 58.4976 123.852 58.6698C130.776 60.5303 133.97 60.2796 140.268 58.6731Z" fill="rgba(198, 255, 52, 0.22)" />
          <path d="M147.992 73.1227L180.996 54.068M147.992 73.1227C147.977 73.1314 147.962 73.14 147.947 73.1486M147.992 73.1227L147.947 73.1486M115.91 73.1227L84.9747 55.2625M115.91 73.1227C124.754 78.229 139.084 78.2377 147.947 73.1486M115.91 73.1227V60.3261M84.9747 55.2625C84.9597 55.2538 84.9447 55.2451 84.9297 55.2364M84.9747 55.2625L84.9297 55.2364M147.947 60.3002L180.996 41.2195M147.947 60.3002V73.1486M147.947 60.3002C139.103 65.4065 124.773 65.4151 115.91 60.3261M115.865 60.3002L84.9297 42.4399M115.865 60.3002C115.88 60.3088 115.895 60.3175 115.91 60.3261M115.865 60.3002L115.91 60.3261M180.996 41.2195C182.512 40.3441 183.769 39.3757 184.766 38.3461C186.615 36.4367 187.572 34.3167 187.637 32.1893M180.996 41.2195V54.068M84.9297 42.4399C83.4363 41.5777 82.1947 40.6252 81.2047 39.6128C79.3795 37.7462 78.4101 35.6761 78.2965 33.5934M84.9297 42.4399V55.2364L124.548 6.80124L88.2395 27.7639C83.7827 30.337 83.2303 34.3107 86.5822 37.231M124.548 6.80124V15.1318M124.548 6.80124C130.363 4.40358 136.724 4.30672 142.971 6.66605M142.971 6.66605L177.735 26.7362C182.243 29.339 182.756 33.375 179.274 36.3041M142.971 6.66605C143.01 6.68827 142.932 6.64349 142.971 6.66605ZM142.971 6.66605V15.1318M124.548 15.1318L88.1217 36.1625C87.5426 36.4968 87.0294 36.8548 86.5822 37.231M124.548 15.1318C129.635 12.1946 137.883 12.1946 142.971 15.1318M142.971 15.1318L177.617 35.1347C178.248 35.4988 178.8 35.8909 179.274 36.3041M86.5822 37.231C87.0565 37.6442 87.6089 38.0363 88.2395 38.4004L122.02 57.9037C122.595 58.2355 123.211 58.4976 123.852 58.6698C130.776 60.5303 133.97 60.2796 140.268 58.6731C140.957 58.4973 141.621 58.2231 142.237 57.8674L177.735 37.3726C178.314 37.0383 178.827 36.6803 179.274 36.3041M78.2941 32.8104C78.4503 29.5821 80.6622 26.3808 84.9297 23.9169L117.978 4.83624C126.838 -0.278745 141.202 -0.278746 150.061 4.83624L180.996 22.6965C185.324 25.1952 187.538 28.4522 187.637 31.7267M78.2941 32.8104L78.2965 33.5934M78.2941 32.8104C78.2814 33.0713 78.2822 33.3324 78.2965 33.5934M187.637 31.7267V32.1893M187.637 31.7267C187.642 31.8809 187.642 32.0351 187.637 32.1893M180.996 54.068L181.041 54.042C185.088 51.7054 187.288 48.7057 187.637 45.6486V32.1893M84.9297 55.2364C80.4246 52.6211 78.226 49.1811 78.334 45.7608L78.2965 33.5934" stroke="rgba(198, 255, 52, 0.75)" strokeWidth="0.85" />
        </g>

        {/* ── HIGH-FIDELITY 2.5D ISOMETRIC BRAIN DIAGRAM (MATCHING REFERENCE IMAGE) ── */}
        <g transform="translate(133, 31)">
          {/* Intense Outer Glow Aura */}
          <ellipse cx="0" cy="0" rx="34" ry="19" fill="rgba(198, 255, 52, 0.4)" filter="url(#glowBrainExtreme)" />

          {/* Isometric Brain Base Platform */}
          <ellipse cx="0" cy="2" rx="28" ry="15" fill="rgba(8, 12, 10, 0.95)" stroke="#c6ff34" strokeWidth="1.5" filter="url(#glowLime)" />

          {/* Left Hemisphere (Isometric 2.5D Fold Structure) */}
          <path d="M-22, -2 C-26, -12 -16, -20 -2, -18 C-4, -10 -16, -10 -14, -2 C-18, 4 -8, 10 -2, 12 C-14, 14 -24, 6 -22, -2 Z" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1.5" />
          <path d="M -18, -6 C -12, -14 -6, -10 -8, -4 C -10, 2 -16, 2 -14, 6" fill="none" stroke="#a3e635" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M -12, -12 C -6, -16 -2, -8 -6, -2" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.9" />

          {/* Right Hemisphere (Isometric 2.5D Fold Structure) */}
          <path d="M 22, -2 C 26, -12 16, -20 2, -18 C 4, -10 16, -10 14, -2 C 18, 4 8, 10 2, 12 C 14, 14 24, 6 22, -2 Z" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1.5" />
          <path d="M 18, -6 C 12, -14 6, -10 8, -4 C 10, 2 16, 2 14, 6" fill="none" stroke="#a3e635" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M 12, -12 C 6, -16 2, -8 6, -2" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.9" />

          {/* Longitudinal Fissure / Center Line */}
          <path d="M 0, -18 C -1.5, -9 1.5, 4 0, 14" fill="none" stroke="#c6ff34" strokeWidth="1.75" strokeDasharray="3 2" />

          {/* Dynamic Firing Synapses Nodes */}
          <g className="synapse">
            <circle cx="-16" cy="-10" r="2.2" fill="#ffffff" filter="url(#glowLime)" />
            <circle cx="-8" cy="-5" r="2.4" fill="#c6ff34" filter="url(#glowLime)" />
            <circle cx="-13" cy="6" r="2" fill="#ffffff" filter="url(#glowLime)" />
            <circle cx="16" cy="-10" r="2.2" fill="#ffffff" filter="url(#glowLime)" />
            <circle cx="8" cy="-5" r="2.4" fill="#c6ff34" filter="url(#glowLime)" />
            <circle cx="13" cy="6" r="2" fill="#ffffff" filter="url(#glowLime)" />
            <circle cx="0" cy="-13" r="2.8" fill="#ffffff" filter="url(#glowLime)" />
            <circle cx="0" cy="5" r="2.8" fill="#c6ff34" filter="url(#glowLime)" />
          </g>
        </g>

        {/* Title */}
        <text x="133" y="-55" fill="#ffffff" fontSize="9" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.2">AI MATCHING</text>
        <text x="133" y="-44" fill="#c6ff34" fontSize="8" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">ENGINE</text>
      </g>

      {/* ─── TOP RIGHT: MATCHED DOCUMENTS STACK ─── */}
      <g transform="translate(525, 100)">
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const yOff = -idx * 6;
          const isTop = idx === 5;
          return (
            <g key={idx} transform={`translate(0, ${yOff})`}>
              <polygon points="34,0 68,17 34,34 0,17" fill={isTop ? 'rgba(16, 185, 129, 0.25)' : 'rgba(8, 12, 10, 0.9)'} stroke={isTop ? '#10b981' : 'rgba(16, 185, 129, 0.35)'} strokeWidth={isTop ? '1.5' : '1'} />
              <polygon points="0,17 34,34 34,38 0,21" fill="rgba(5, 8, 6, 0.9)" stroke={isTop ? '#10b981' : 'rgba(16, 185, 129, 0.2)'} strokeWidth="0.75" />
              <polygon points="34,34 68,17 68,21 34,38" fill="rgba(12, 18, 14, 0.85)" stroke={isTop ? '#10b981' : 'rgba(16, 185, 129, 0.2)'} strokeWidth="0.75" />

              {isTop && (
                <g transform="translate(34, 17)">
                  <circle cx="0" cy="0" r="8" fill="#10b981" filter="url(#glowLime)" opacity="0.9" />
                  <path d="M-4, 0 L-1, 3 L4, -3" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}
            </g>
          );
        })}

        <text x="34" y="64" fill="#ffffff" fontSize="8" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">MATCHED</text>
        <text x="34" y="74" fill="#10b981" fontSize="7.5" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.8">DOCUMENTS</text>
      </g>

      {/* ─── BOTTOM RIGHT: DISCREPANCIES DETECTED BADGE (PERFECTLY POSITIONED) ─── */}
      <g transform="translate(485, 265)">
        <g className="alert-badge-glow">
          <rect x="0" y="0" width="105" height="48" rx="7" fill="url(#redAlertGrad)" stroke="#ef4444" strokeWidth="1.5" />

          <g transform="translate(82, -7)">
            <circle cx="0" cy="0" r="13" fill="#ef4444" filter="url(#glowRed)" />
            <text x="0" y="4.5" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">!</text>
          </g>

          <text x="48" y="22" fill="#ffffff" fontSize="7.5" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.9">DISCREPANCIES</text>
          <text x="48" y="33" fill="#f43f5e" fontSize="7.5" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.9">DETECTED</text>
        </g>
      </g>
    </svg>
  );
}


function CopilotAgentFleetCoordinationLoop({ tick }) {
  return (
    <svg x="-290" y="-170" width="580" height="340" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Autonomous Agents & Fleet Coordination" style={{ backgroundColor: 'transparent', overflow: 'visible' }}>
      <defs>
        {/* Glow Filters */}
        <filter id="glowLimeCard4" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <linearGradient id="gCoreTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(198, 255, 52, 0.3)" />
          <stop offset="100%" stopColor="rgba(15, 23, 42, 0.95)" />
        </linearGradient>

        <style>{`
          @keyframes spinPropeller {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes flowDash4 {
            to { stroke-dashoffset: -36; }
          }
          @keyframes droneHover {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes ledPulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }

          .drone-prop { transform-box: fill-box; transform-origin: center; animation: spinPropeller 0.3s linear infinite; }
          .drone-unit { animation: droneHover 3.5s ease-in-out infinite; }
          .flow-line-dash { stroke-dasharray: 6 6; animation: flowDash4 1.5s linear infinite; }
          .screen-led { animation: ledPulse 2s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* ─── CONNECTION LINES & FLOW TRAJECTORIES ─── */}
      {/* 1. Central Block <-> Top Left (AUTONOMOUS FLEET) */}
      {/* Solid Line: Update Allocation */}
      <path id="pathUpdateAllocation" d="M 340 182 L 250 142" fill="none" stroke="rgba(198, 255, 52, 0.5)" strokeWidth="1.5" />
      {/* Arrow Head at Fleet end */}
      <path d="M 250 142 L 258 147 L 257 139 Z" fill="#c6ff34" />

      {/* Dashed Line: Reroute Shipment */}
      <path id="pathRerouteShipment" d="M 330 170 L 240 130" fill="none" stroke="#c6ff34" strokeWidth="1.5" className="flow-line-dash" opacity="0.85" />
      {/* Arrow Head at Fleet end */}
      <path d="M 240 130 L 248 135 L 247 127 Z" fill="#c6ff34" />

      {/* 2. Central Block <-> Bottom Left (WAREHOUSE DATABASES) */}
      <path id="pathWarehouseDb" d="M 340 240 L 240 290" fill="none" stroke="#c6ff34" strokeWidth="1.5" className="flow-line-dash" opacity="0.8" />

      {/* 3. Central Block <-> Top Right (SUPPLIER APIs) */}
      {/* Solid Line: Query */}
      <path id="pathQuery" d="M 460 180 L 520 145" fill="none" stroke="rgba(198, 255, 52, 0.6)" strokeWidth="1.5" />
      {/* Arrow Head at Supplier APIs end */}
      <path d="M 520 145 L 512 149 L 513 141 Z" fill="#c6ff34" />

      {/* Dashed Line: Return Flow into Central Block */}
      <path id="pathSupplierReturn" d="M 520 158 L 460 193" fill="none" stroke="#c6ff34" strokeWidth="1.5" className="flow-line-dash" opacity="0.85" />
      {/* Arrow Head at Central Block end */}
      <path d="M 460 193 L 468 188 L 467 197 Z" fill="#c6ff34" />

      {/* Connection Text Labels along lines */}
      <g fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="sans-serif">
        <text x="295" y="174" transform="rotate(23 295 174)" textAnchor="middle">Update Allocation</text>
        <text x="285" y="142" transform="rotate(23 285 142)" fill="#c6ff34" textAnchor="middle">Reroute Shipment</text>
        <text x="480" y="156" transform="rotate(-30 480 156)" fill="#c6ff34" textAnchor="middle">Query</text>
      </g>

      {/* Animated Flow Data Packets */}
      <circle r="3" fill="#c6ff34" filter="url(#glowLimeCard4)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 330 170 L 240 130" />
      </circle>
      <circle r="3" fill="#c6ff34" filter="url(#glowLimeCard4)">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 240 290 L 340 240" />
      </circle>
      <circle r="3" fill="#c6ff34" filter="url(#glowLimeCard4)">
        <animateMotion dur="2.0s" repeatCount="indefinite" path="M 520 158 L 460 193" />
      </circle>

      {/* ─── TOP LEFT NODE: AUTONOMOUS FLEET PLATFORM ─── */}
      <g transform="translate(180, 130)">
        {/* 3D Platform Slab */}
        <polygon points="0,-35 70,0 0,35 -70,0" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1.5" />
        <polygon points="-70,0 0,35 0,65 -70,30" fill="rgba(8, 12, 10, 0.95)" stroke="#c6ff34" strokeWidth="1" />
        <polygon points="0,35 70,0 70,30 0,65" fill="rgba(12, 18, 14, 0.9)" stroke="#c6ff34" strokeWidth="1" />

        {/* Isometric Text on Front Left Face */}
        <g transform="translate(-60, 22) rotate(-26.5) skewX(30)">
          <text x="0" y="0" fill="#c6ff34" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">AUTONOMOUS</text>
          <text x="0" y="9" fill="#ffffff" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">FLEET</text>
        </g>

        {/* 3D Isometric Delivery Truck 1 (Large Truck) */}
        <g transform="translate(15, -15)">
          {/* Cargo Body */}
          <polygon points="0,-10 16,-2 0,6 -16,-2" fill="rgba(30, 41, 59, 0.95)" stroke="#c6ff34" strokeWidth="1" />
          <polygon points="-16,-2 0,6 0,16 -16,8" fill="rgba(10, 16, 26, 0.95)" stroke="#c6ff34" strokeWidth="0.75" />
          <polygon points="0,6 16,-2 16,6 0,14" fill="rgba(15, 23, 42, 0.9)" stroke="#c6ff34" strokeWidth="0.75" />
          {/* Cab */}
          <polygon points="8,-4 18,1 8,6 -2,1" fill="#c6ff34" opacity="0.85" />
          {/* Wheels */}
          <circle cx="-10" cy="11" r="2.5" fill="#c6ff34" />
          <circle cx="6" cy="13" r="2.5" fill="#c6ff34" />
        </g>

        {/* 3D Isometric Delivery Truck 2 (Smaller Truck) */}
        <g transform="translate(-20, 0)">
          <polygon points="0,-7 12,-1 0,5 -12,-1" fill="rgba(30, 41, 59, 0.95)" stroke="#c6ff34" strokeWidth="1" />
          <polygon points="-12,-1 0,5 0,12 -12,6" fill="rgba(10, 16, 26, 0.95)" stroke="#c6ff34" strokeWidth="0.75" />
          <polygon points="0,5 12,-1 12,5 0,11" fill="rgba(15, 23, 42, 0.9)" stroke="#c6ff34" strokeWidth="0.75" />
          <polygon points="5,-2 12,1.5 5,5 -2,1.5" fill="#a3e635" opacity="0.85" />
          <circle cx="-7" cy="8" r="2" fill="#c6ff34" />
          <circle cx="4" cy="9.5" r="2" fill="#c6ff34" />
        </g>

        {/* Cargo Package Box */}
        <g transform="translate(-38, -12)">
          <polygon points="0,-5 8,-1 0,3 -8,-1" fill="rgba(198, 255, 52, 0.35)" stroke="#c6ff34" strokeWidth="0.8" />
          <polygon points="-8,-1 0,3 0,8 -8,4" fill="rgba(8, 12, 10, 0.9)" stroke="#c6ff34" strokeWidth="0.6" />
          <polygon points="0,3 8,-1 8,4 0,8" fill="rgba(12, 18, 14, 0.85)" stroke="#c6ff34" strokeWidth="0.6" />
          <line x1="0" y1="-5" x2="0" y2="3" stroke="#c6ff34" strokeWidth="0.6" />
        </g>

        {/* Autonomous Delivery Drone (Flying Above to Left) */}
        <g className="drone-unit" transform="translate(-55, -45)">
          <ellipse cx="0" cy="0" rx="7" ry="4" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1.25" />
          <circle cx="0" cy="0" r="2.5" fill="#c6ff34" filter="url(#glowLimeCard4)" />
          <line x1="-12" y1="-6" x2="12" y2="6" stroke="#c6ff34" strokeWidth="1" />
          <line x1="-12" y1="6" x2="12" y2="-6" stroke="#c6ff34" strokeWidth="1" />
          {/* 4 Rotating Propellers */}
          <ellipse className="drone-prop" cx="-12" cy="-6" rx="4.5" ry="1.8" fill="none" stroke="#c6ff34" strokeWidth="1" />
          <ellipse className="drone-prop" cx="12" cy="-6" rx="4.5" ry="1.8" fill="none" stroke="#c6ff34" strokeWidth="1" />
          <ellipse className="drone-prop" cx="-12" cy="6" rx="4.5" ry="1.8" fill="none" stroke="#c6ff34" strokeWidth="1" />
          <ellipse className="drone-prop" cx="12" cy="6" rx="4.5" ry="1.8" fill="none" stroke="#c6ff34" strokeWidth="1" />
        </g>
      </g>

      {/* ─── BOTTOM LEFT NODE: WAREHOUSE DATABASES ─── */}
      <g transform="translate(190, 310)">
        {/* Base Platform Slab */}
        <polygon points="0,-25 50,0 0,25 -50,0" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1.5" />
        <polygon points="-50,0 0,25 0,40 -50,15" fill="rgba(8, 12, 10, 0.95)" stroke="#c6ff34" strokeWidth="1" />
        <polygon points="0,25 50,0 50,15 0,40" fill="rgba(12, 18, 14, 0.9)" stroke="#c6ff34" strokeWidth="1" />

        {/* 3D Tiered Database Cylinder */}
        <g transform="translate(0, -10)">
          {/* Bottom Tier */}
          <path d="M-18,10 C-18,18 18,18 18,10 L18,22 C18,30 -18,30 -18,22 Z" fill="rgba(8, 12, 10, 0.95)" stroke="#c6ff34" strokeWidth="1.25" />
          {/* Middle Tier */}
          <path d="M-18,-4 C-18,4 18,4 18,-4 L18,8 C18,16 -18,16 -18,8 Z" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1.25" />
          {/* Top Tier */}
          <path d="M-18,-18 C-18,-10 18,-10 18,-18 L18,-6 C18,2 -18,2 -18,-6 Z" fill="rgba(30, 41, 59, 0.9)" stroke="#c6ff34" strokeWidth="1.25" />
          <ellipse cx="0" cy="-18" rx="18" ry="8" fill="rgba(198, 255, 52, 0.25)" stroke="#c6ff34" strokeWidth="1.5" />

          {/* LED indicators */}
          <circle cx="-10" cy="-4" r="1.5" fill="#c6ff34" className="screen-led" />
          <circle cx="-10" cy="10" r="1.5" fill="#c6ff34" className="screen-led" />
          <line x1="-12" y1="-10" x2="12" y2="-10" stroke="#c6ff34" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
          <line x1="-12" y1="4" x2="12" y2="4" stroke="#c6ff34" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
        </g>

        {/* Text Label Below Platform */}
        <text x="0" y="55" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">WAREHOUSE</text>
        <text x="0" y="66" fill="#c6ff34" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">DATABASES</text>
      </g>

      {/* ─── CENTER HERO NODE: AI LOGISTICS CO-PILOTS ─── */}
      <g transform="translate(400, 210)">
        {/* Base Platform Slab */}
        <polygon points="0,20 65,52 0,84 -65,52" fill="rgba(198, 255, 52, 0.15)" stroke="#c6ff34" strokeWidth="1" />

        {/* 3D Core Block */}
        {/* Top Face */}
        <polygon points="0,-32 60,-2 0,28 -60,-2" fill="url(#gCoreTop)" stroke="#c6ff34" strokeWidth="1.75" />

        {/* Front Left Face */}
        <polygon points="-60,-2 0,28 0,78 -60,48" fill="rgba(8, 12, 10, 0.98)" stroke="#c6ff34" strokeWidth="1.5" />

        {/* Front Right Face (with Screen UI Dashboards) */}
        <polygon points="0,28 60,-2 60,48 0,78" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1.5" />

        {/* Dashboard Screen UI Windows on Front Right Face */}
        <g transform="translate(10, 18) skewY(-26.5)">
          <rect x="5" y="0" width="16" height="22" rx="2" fill="rgba(8, 12, 10, 0.95)" stroke="#c6ff34" strokeWidth="1" />
          <rect x="25" y="0" width="22" height="22" rx="2" fill="rgba(8, 12, 10, 0.95)" stroke="#c6ff34" strokeWidth="1" />
          <line x1="27" y1="5" x2="43" y2="5" stroke="#c6ff34" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="27" y1="10" x2="40" y2="10" stroke="#a3e635" strokeWidth="1" />
          <line x1="27" y1="15" x2="36" y2="15" stroke="#c6ff34" strokeWidth="1" />
          <circle cx="13" cy="11" r="3" fill="#c6ff34" className="screen-led" />
        </g>

        {/* Clean 3D Isometric Text on Top Face */}
        <g transform="translate(-32, -14) rotate(-26.5) skewX(30)">
          <text x="0" y="0" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">AI</text>
          <text x="0" y="10" fill="#c6ff34" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">LOGISTICS</text>
          <text x="0" y="19" fill="#c6ff34" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">CO-PILOTS</text>
        </g>
      </g>

      {/* ─── TOP RIGHT NODE: SUPPLIER APIs ─── */}
      <g transform="translate(580, 140)">
        {/* Base Platform Slab */}
        <polygon points="0,-30 60,0 0,30 -60,0" fill="rgba(15, 23, 42, 0.95)" stroke="#c6ff34" strokeWidth="1.5" />
        <polygon points="-60,0 0,30 0,50 -60,20" fill="rgba(8, 12, 10, 0.95)" stroke="#c6ff34" strokeWidth="1" />
        <polygon points="0,30 60,0 60,20 0,50" fill="rgba(12, 18, 14, 0.9)" stroke="#c6ff34" strokeWidth="1" />

        {/* 3D Isometric Cloud Emblem */}
        <g transform="translate(0, -18)">
          <path d="M-16,4 C-24,4 -26,-6 -16,-8 C-15,-16 0,-18 7,-9 C15,-13 24,-2 16,4 Z" fill="rgba(198, 255, 52, 0.2)" stroke="#c6ff34" strokeWidth="1.5" filter="url(#glowLimeCard4)" />
        </g>

        {/* Text on Front Left Face */}
        <g transform="translate(-50, 14) rotate(-26.5) skewX(30)">
          <text x="0" y="0" fill="#c6ff34" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">SUPPLIER</text>
          <text x="0" y="9.5" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">APIs</text>
        </g>
      </g>

      {/* ─── BOTTOM RIGHT TITLE BANNER: AUTONOMOUS AGENTS & FLEET COORDINATION ─── */}
      <g transform="translate(720, 335)">
        <text x="0" y="0" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="end" letterSpacing="1.1">AUTONOMOUS AGENTS</text>
        <text x="0" y="16" fill="#c6ff34" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="end" letterSpacing="1.1">&amp; FLEET COORDINATION</text>
      </g>
    </svg>
  );
}


function IsometricVerticalStage({ activeTab, activeSubCard, currentIndustry }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => (prev + 1) % 360);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const accent = '#c6ff34';
  const cardData = currentIndustry.bentoCards?.[activeSubCard] || currentIndustry.bentoCards?.[0];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '520px',
      borderRadius: '24px',
      background: 'radial-gradient(circle at 50% 30%, rgba(198, 255, 52, 0.06) 0%, rgba(8, 12, 10, 0.97) 100%)',
      border: '1px solid rgba(198, 255, 52, 0.15)',
      boxShadow: '0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)'
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '340px',
        height: '340px',
        background: 'radial-gradient(circle, rgba(198, 255, 52, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* 3D Isometric Viewport Container */}
      <div style={{
        width: '100%',
        height: '340px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg width="480" height="320" viewBox="0 0 480 320" fill="none" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="glowIso" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 3D Isometric Base Grid Plane */}
          <g transform="translate(240, 180)">

            {/* ─── SUPPLY CHAIN SUB-CARDS ANIMATIONS (activeTab === 0) ─── */}
            {activeTab === 0 && activeSubCard === 0 && (
              <SupplyChainDigitalTwinLoop tick={tick} />
            )}

            {activeTab === 0 && activeSubCard === 1 && (
              <TelemetryDirectLakeLoop tick={tick} />
            )}

            {activeTab === 0 && activeSubCard === 2 && (
              <DocumentOcrAiMatchingLoop tick={tick} />
            )}

            {activeTab === 0 && activeSubCard === 3 && (
              <CopilotAgentFleetCoordinationLoop tick={tick} />
            )}

            {/* Default fallback animation for other tabs */}
            {(activeTab !== 0 || activeSubCard > 3) && (
              <g className="animate-blur-reveal">
                <g transform="translate(0, -50)">
                  <polygon points="0,-40 50,-15 0,10 -50,-15" fill="rgba(198, 255, 52, 0.4)" stroke={accent} strokeWidth="2" filter="url(#glowIso)" />
                  <polygon points="-50,-15 0,10 0,70 -50,45" fill="rgba(25, 35, 10, 0.9)" stroke={accent} strokeWidth="1" />
                  <polygon points="0,10 50,-15 50,45 0,70" fill="rgba(40, 55, 15, 0.8)" stroke={accent} strokeWidth="1" />
                </g>
                <ellipse cx="0" cy="0" rx={85 + Math.sin(tick * 0.1) * 12} ry={42 + Math.sin(tick * 0.1) * 6} fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6" />
              </g>
            )}

          </g>
        </svg>
      </div>

      {/* Minimal label - solution title only */}
      <div style={{
        position: 'absolute',
        bottom: '1.25rem',
        left: '1.5rem',
        right: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '-0.01em'
        }}>
          {cardData?.title || currentIndustry.title}
        </span>
      </div>
    </div>
  );
}

function Industries({ activeHero }) {
  const [activeTab, setActiveTab] = useState(0);

  const currentIndustry = industriesData[activeTab] || industriesData[0];
  const isRemix = activeHero === 'remix';

  return (
    <section style={{ padding: '8rem 0', position: 'relative', zIndex: 20 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <h2 style={{ textAlign: 'center', margin: 0 }}>
            <CharacterReveal
              text="Applied Intelligence Across Verticals"
              className={isRemix ? 'text-gradient-premium' : ''}
              style={{
                fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: isRemix ? 800 : 700,
                letterSpacing: '-0.02em',
                color: '#ffffff'
              }}
            />
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.15rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: '1rem',
            maxWidth: '620px',
            margin: '1rem auto 0 auto',
            lineHeight: 1.6
          }}>
            Tailored enterprise architectures engineered for complex industry challenges.
          </p>

          {/* Industry Switcher Glass Tab Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '2.5rem',
            flexWrap: 'wrap'
          }}>
            {industriesData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                style={{
                  background: activeTab === index ? 'rgba(198, 255, 52, 0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeTab === index ? 'rgba(198, 255, 52, 0.45)' : 'rgba(255,255,255,0.06)'}`,
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                  color: activeTab === index ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: activeTab === index ? '0 0 20px rgba(198, 255, 52, 0.22)' : 'none'
                }}
              >
                <div style={{ color: activeTab === index ? item.accent : 'inherit', display: 'flex' }}>{item.icon}</div>
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Header (Full Width Bento Item) */}
        <div style={{
          background: 'rgba(20, 24, 18, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(198, 255, 52, 0.12)',
          borderRadius: '24px',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.25rem',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          marginBottom: '3rem'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(198, 255, 52, 0.08)',
            border: '1px solid rgba(198, 255, 52, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c6ff34',
            boxShadow: '0 0 30px rgba(198, 255, 52, 0.2)'
          }}>
            <div style={{ transform: 'scale(1.5)' }}>{currentIndustry.icon}</div>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {currentIndustry.headlineTitle || currentIndustry.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0, maxWidth: '800px' }}>
            {currentIndustry.headlineBody || currentIndustry.body}
          </p>
        </div>

        {/* Sub-Solutions Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {currentIndustry.bentoCards?.map((card, idx) => {
            return (
              <div
                key={idx}
                className="sui-card-hover"
                style={{
                  background: 'rgba(20, 24, 18, 0.35)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(198, 255, 52, 0.35)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(198, 255, 52, 0.2), inset 0 1px 0 rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(20, 24, 18, 0.65)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)';
                  e.currentTarget.style.background = 'rgba(20, 24, 18, 0.35)';
                }}
              >
                {/* Tech tag */}
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#c6ff34',
                  border: '1px solid rgba(198, 255, 52, 0.25)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '8px',
                  letterSpacing: '0.02em',
                  background: 'rgba(198, 255, 52, 0.06)',
                  boxShadow: '0 0 12px rgba(198, 255, 52, 0.08)'
                }}>
                  {card.tag}
                </div>

                <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
                  <IndustrySubCard card={card} accent={'#c6ff34'} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ─── SECTION 7: IMPACT (EMPIRICAL PROOF) ───

export default memo(Industries);
