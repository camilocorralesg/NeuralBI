'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import TiltCard from '../TiltCard';
import FloatingLines from '../FloatingLines';
import CharacterReveal from '../CharacterReveal';
import { McsGroundedReasoningAnim, McsMultiStepChainAnim, McsZeroHallucinationFieldAnim } from '../graphics/CopilotStudioAnimations';
import { PauSelfHealingFlowAnim, PauEventDrivenMeshAnim, PauResilientDlqMeshAnim } from '../graphics/PowerAutomateAnimations';
import { PbaThreeParadigmsAnim, PbaProCodeApiEngineAnim, PbaEnterpriseDataverseMeshAnim } from '../graphics/PowerAppsAnimations';
import { PbiAiInsightsOverlayAnim, PbiDataStorytellingUiAnim, PbiSemanticModelGraphAnim } from '../graphics/PowerBiAnimations';

const powerBiLogo = '/NeuralBI/assets/New_Power_BI_Logo.svg';
const powerAppsLogo = '/NeuralBI/assets/Powerapps-logo.svg.svg';
const copilotStudioLogo = '/NeuralBI/assets/Copilot Studio.svg';
const powerAutomateLogo = '/NeuralBI/assets/Power Automate logo.svg';


const arsenalData = [
  {
    id: "power-bi",
    tool: "Power BI",
    title: "Data Experiences People Actually Use.",
    body: "Stop staring at dead metrics. We elevate enterprise Power BI into immersive, multimedia reporting experiences. Insights that explain why trends happen, not just what happened.",
    logo: powerBiLogo,
    color: "#F2C811",
    metric: "Enterprise Data Storytelling",
    specs: ["Beautiful Reports", "Semantic Modelling", "AI Storytelling"],
    architecture: "Enterprise Data Storytelling",
    cta: "Explore Dashboards 2.0 →"
  },
  {
    id: "power-apps",
    tool: "Power Apps",
    title: "Enterprise Apps Without Low-Code Limits.",
    body: "We eliminate the rigid boundaries of standard low-code. By pairing the speed and native security of Power Apps with custom React and TypeScript components, we engineer high-performance tools tailored to your exact operational workflows.",
    logo: powerAppsLogo,
    color: "#C73590",
    metric: "Canvas & Pro-Code Engineering",
    specs: ["React & PCF Code", "Model-Driven Flows", "Enterprise API"],
    architecture: "CANVAS & PRO-CODE ENGINEERING",
    cta: "Explore App Stack →"
  },
  {
    id: "power-automate",
    tool: "Power Automate",
    title: "Cognitive Automation & Migration.",
    body: "Eradicate manual data entry and spreadsheet handoffs. We orchestrate end-to-end background workflows that sync legacy ERPs, trigger instant alerts, and eliminate human bottlenecks.",
    logo: powerAutomateLogo,
    color: "#0066FF",
    metric: "Zero Manual Effort",
    specs: ["Legacy Migration", "Advanced Logic", "Data Sync"],
    architecture: "Neural Pathways"
  },
  {
    id: "copilot-studio",
    tool: "Copilot Studio",
    title: "ROI-Focused Autonomous Agents.",
    body: "Deploy AI agents that execute tasks, query internal databases, and make strategic operational decisions. We build results-driven systems, not basic Q&A chatbots.",
    logo: copilotStudioLogo,
    color: "#107C41",
    metric: "AI Decisions",
    specs: ["Task Execution", "Local Analysis", "Strategic Focus"],
    architecture: "Cognitive Engine"
  }
];


// ─── STRIPE-GRADE TOOL DETAIL MODAL COMPONENT (PARALLAX REVEAL ARCHITECTURE) ───
export function ToolDetailModal({ tool, onClose }) {
  useEffect(() => {
    if (!tool) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Lock page background scroll while modal is open
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [tool, onClose]);

  if (!tool) return null;

  const getToolDetails = (id) => {
    switch (id) {
      case 'power-bi':
        return {
          badge: "Semantic Data Storytelling",
          headline: "The Architecture Behind the Story.",
          subheadline: "Enterprise Power BI fails when it's just a report. We build semantic decision-support models that integrate interactive AI narratives, multimedia insights, and pixel-perfect clarity, ensuring your data experiences are actually used.",
          roiMetric: "100%",
          roiLabel: "Team Adoption & Zero Excel Chaos",
          capabilities: [
            { label: "AI Narrative Engine", desc: "Automated natural language insights explaining trend drivers instantly" },
            { label: "Persona-Based UX", desc: "Role-adaptive executive views tailored for CEO, CFO, and Ops leads" },
            { label: "Direct Lake Speed", desc: "Zero-copy OneLake Direct Lake engine for sub-second query latency" },
            { label: "Multimedia BI", desc: "Immersive reporting experiences with integrated video and interactive loops" }
          ],
          differentiators: [
            "Semantic decision-support models eliminating static dead metrics",
            "Executive-first persona drill-downs with role-based security",
            "Direct Lake lakehouse architecture over Microsoft Fabric",
            "White-label pixel-perfect dashboards team members actually use"
          ],
          color: "#F2C811",
          isPbiModal: true
        };
      case 'power-apps':
        return {
          badge: "CANVAS & PRO-CODE ENGINEERING",
          headline: "Enterprise Apps Without Low-Code Limits.",
          subheadline: "We eliminate the rigid boundaries of standard low-code. By pairing the speed and native security of Power Apps with custom React and TypeScript components, we engineer high-performance tools tailored to your exact operational workflows.",
          roiMetric: "-70%",
          roiLabel: "Faster Than Custom Web Dev",
          capabilities: [
            { label: "Canvas & Model Workflows", desc: "Pixel-perfect Canvas UIs paired with Dataverse business rules and security roles" },
            { label: "React & PCF Controls", desc: "Custom React/TypeScript components compiled to native PCF controls — zero low-code limits" },
            { label: "Dataverse & API Engine", desc: "Relational Dataverse schemas integrated with enterprise APIs and row-level security" },
            { label: "Tailored UI/UX", desc: "Enterprise-grade user experiences designed to ensure 100% operational uptake" }
          ],
          differentiators: [
            "Custom React & PCF components eliminating low-code UX limits",
            "Dataverse & enterprise API connectors for real-time data sync",
            "Automated ALM pipelines layering solutions from Dev → UAT → Prod",
            "Offline-capable mobile apps with background sync and conflict resolution"
          ],
          color: "#C73590",
          isPbaModal: true
        };
      case 'power-automate':
        return {
          badge: "Process Neural Mesh",
          headline: "Self-Healing Autonomous Workflows",
          subheadline: "We don't chain actions — we engineer resilient process architectures. Our flows handle thousands of concurrent transactions with automated retry logic, dead-letter queues, and real-time observability that catches failures before users notice.",
          roiMetric: "99.9%",
          roiLabel: "Transaction Success Rate",
          capabilities: [
            { label: "Cloud Flows", desc: "Event-driven orchestrations with parallel branching, scoping, and custom error handling" },
            { label: "Desktop RPA", desc: "Headless bot pools automating legacy systems — SAP, AS400, mainframe screen scraping" },
            { label: "Custom Connectors", desc: "OpenAPI-spec connectors bridging proprietary REST/GraphQL/SOAP endpoints" },
            { label: "Process Mining", desc: "AI-powered bottleneck discovery analyzing millions of event logs automatically" }
          ],
          differentiators: [
            "Exponential retry with jitter preventing cascading API failures",
            "Dead-letter queues capturing and auto-reprocessing failed transactions",
            "Concurrency throttling processing 10,000+ daily events without drops",
            "PagerDuty + Teams alerting with SLA breach prediction"
          ],
          color: "#00BCF2",
          isPauModal: true,
          svg: (
            <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="pa-flow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00BCF2" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#00BCF2" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#c6ff34" stopOpacity="0.8" />
                </linearGradient>
                <filter id="pa-glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect width="480" height="300" rx="16" fill="#08080A" />
              {/* Radial glow */}
              <circle cx="240" cy="150" r="120" fill="#00BCF2" opacity="0.06" />
              {/* Flow connections */}
              <path d="M60 150 C100 150 100 80 140 80" stroke="rgba(0,188,242,0.3)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M60 150 C100 150 100 220 140 220" stroke="rgba(0,188,242,0.3)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M200 80 C240 80 240 150 280 150" stroke="url(#pa-flow)" strokeWidth="2.5" />
              <path d="M200 220 C240 220 240 150 280 150" stroke="url(#pa-flow)" strokeWidth="2.5" />
              <path d="M340 150 L420 150" stroke="url(#pa-flow)" strokeWidth="3" filter="url(#pa-glow)" />
              {/* Retry loop */}
              <path d="M170 55 Q210 35 200 70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              {/* Nodes */}
              {/* Trigger */}
              <rect x="30" y="128" width="60" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#00BCF2" strokeWidth="2" />
              <text x="42" y="146" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">TRIGGER</text>
              <text x="42" y="161" fill="#00BCF2" fontSize="9" fontWeight="bold" fontFamily="monospace">EVENT</text>
              {/* Process A */}
              <rect x="120" y="58" width="80" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#00BCF2" strokeWidth="1.5" />
              <text x="134" y="76" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">VALIDATE</text>
              <text x="134" y="91" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">TRANSFORM</text>
              {/* Process B */}
              <rect x="120" y="198" width="80" height="44" rx="10" fill="rgba(12,12,16,0.9)" stroke="#00BCF2" strokeWidth="1.5" />
              <text x="134" y="216" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">WEBHOOK</text>
              <text x="134" y="231" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">API BRIDGE</text>
              {/* Merge node */}
              <circle cx="310" cy="150" r="30" fill="rgba(12,12,16,0.9)" stroke="#c6ff34" strokeWidth="2.5" />
              <text x="293" y="147" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">MERGE</text>
              <text x="295" y="160" fill="#c6ff34" fontSize="10" fontWeight="bold" fontFamily="monospace">EXEC</text>
              {/* Success */}
              <circle cx="420" cy="150" r="20" fill="rgba(198,255,52,0.15)" stroke="#c6ff34" strokeWidth="2" filter="url(#pa-glow)" />
              <text x="413" y="154" fill="#c6ff34" fontSize="14" fontWeight="bold">✓</text>
              {/* Status bar */}
              <rect x="30" y="268" width="420" height="12" rx="6" fill="rgba(255,255,255,0.03)" />
              <rect x="30" y="268" width="416" height="12" rx="6" fill="rgba(0,188,242,0.2)" />
              <text x="240" y="278" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">99.97% SUCCESS — 12,847 TRANSACTIONS / 24H</text>
            </svg>
          )
        };
      case 'copilot-studio':
        return {
          badge: "Cognitive Agent Framework",
          headline: "Enterprise AI That Acts, Not Just Answers",
          subheadline: "We build AI agents that don't hallucinate. Every response is grounded in your enterprise data — SharePoint, Dataverse, SQL — with multi-step reasoning chains, plugin actions, and strict security boundaries that make autonomous decisions safely.",
          roiMetric: "10x",
          roiLabel: "Faster Knowledge Resolution",
          capabilities: [
            { label: "Grounded RAG", desc: "Retrieval-augmented generation pulling verified answers from internal knowledge bases" },
            { label: "Plugin Actions", desc: "Agents that trigger Power Automate flows, update Dataverse records, and send emails autonomously" },
            { label: "Multi-Agent", desc: "Specialized agent orchestration — each agent handles a domain, a coordinator routes intent" },
            { label: "Guardrails", desc: "Content moderation, topic blocking, and response validation preventing off-topic drift" }
          ],
          differentiators: [
            "Zero-hallucination architecture with citation-backed responses",
            "Dynamic knowledge ingestion from SharePoint, Dataverse, and custom APIs",
            "Conversation analytics dashboard tracking resolution rates and CSAT",
            "Enterprise SSO with conditional access and DLP policy enforcement"
          ],
          color: "#10B981",
          isMcsModal: true,
          svg: (
            <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="cs-rad" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#107C41" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#107C41" stopOpacity="0" />
                </linearGradient>
                <filter id="cs-glow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect width="480" height="300" rx="16" fill="#08080A" />
              {/* Central brain */}
              <circle cx="240" cy="140" r="90" fill="url(#cs-rad)" />
              <circle cx="240" cy="140" r="50" fill="rgba(16,124,65,0.1)" stroke="#107C41" strokeWidth="2" />
              <circle cx="240" cy="140" r="20" fill="rgba(198,255,52,0.2)" stroke="#c6ff34" strokeWidth="2" filter="url(#cs-glow)" />
              <text x="233" y="145" fill="#c6ff34" fontSize="14" fontWeight="bold">AI</text>
              {/* Orbiting rings */}
              <ellipse cx="240" cy="140" rx="110" ry="55" fill="none" stroke="rgba(16,124,65,0.2)" strokeWidth="1" strokeDasharray="3 6" />
              <ellipse cx="240" cy="140" rx="75" ry="37" fill="none" stroke="rgba(16,124,65,0.15)" strokeWidth="1" strokeDasharray="2 4" />
              {/* Satellite nodes */}
              {/* RAG */}
              <g>
                <line x1="170" y1="95" x2="215" y2="125" stroke="rgba(16,124,65,0.4)" strokeWidth="1.5" />
                <rect x="100" y="72" width="72" height="44" rx="10" fill="rgba(12,12,16,0.95)" stroke="#107C41" strokeWidth="1.5" />
                <text x="115" y="90" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">RETRIEVAL</text>
                <text x="120" y="105" fill="#107C41" fontSize="11" fontWeight="bold">RAG</text>
              </g>
              {/* LLM */}
              <g>
                <line x1="310" y1="95" x2="265" y2="125" stroke="rgba(16,124,65,0.4)" strokeWidth="1.5" />
                <rect x="308" y="72" width="72" height="44" rx="10" fill="rgba(12,12,16,0.95)" stroke="#107C41" strokeWidth="1.5" />
                <text x="322" y="90" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">REASONING</text>
                <text x="327" y="105" fill="#107C41" fontSize="11" fontWeight="bold">LLM</text>
              </g>
              {/* Data */}
              <g>
                <line x1="170" y1="185" x2="215" y2="160" stroke="rgba(16,124,65,0.4)" strokeWidth="1.5" />
                <rect x="90" y="174" width="82" height="44" rx="10" fill="rgba(12,12,16,0.95)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <text x="106" y="192" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">DATAVERSE</text>
                <text x="106" y="207" fill="#ffffff" fontSize="10" fontWeight="bold">DATA</text>
              </g>
              {/* Actions */}
              <g>
                <line x1="310" y1="185" x2="265" y2="160" stroke="rgba(16,124,65,0.4)" strokeWidth="1.5" />
                <rect x="308" y="174" width="82" height="44" rx="10" fill="rgba(12,12,16,0.95)" stroke="rgba(198,255,52,0.3)" strokeWidth="1.5" />
                <text x="322" y="192" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">PLUGINS</text>
                <text x="322" y="207" fill="#c6ff34" fontSize="10" fontWeight="bold">ACTIONS</text>
              </g>
              {/* Guardrails bar */}
              <rect x="120" y="248" width="240" height="28" rx="8" fill="rgba(16,124,65,0.08)" stroke="rgba(16,124,65,0.25)" strokeWidth="1" />
              <text x="240" y="266" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">🛡 GUARDRAILS · GROUNDING · ZERO HALLUCINATION</text>
            </svg>
          )
        };
      default:
        return null;
    }
  };

  const details = getToolDetails(tool.id);

  return (
    <AnimatePresence>
      <div
        className={details?.isPbiModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pbi' : details?.isPbaModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pba' : details?.isPauModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pau' : details?.isMcsModal ? 'custom-modal-scrollbar custom-modal-scrollbar-mcs' : 'custom-modal-scrollbar'}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '3rem 1rem',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
        {/* NeuralBI Ambient Mesh Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 10, 0.92)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            zIndex: 1,
            overflow: 'hidden',
            willChange: 'opacity'
          }}
        >
          {/* Noise Texture Layer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* Mesh Orb 1 (Bottom Left: Vibrant Neon Lime) */}
          <div className="arsenal-desktop-only-flex" style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-100px',
            width: '520px',
            height: '520px',
            background: 'radial-gradient(circle, rgba(198, 255, 52, 0.16) 0%, rgba(198, 255, 52, 0) 70%)',
            filter: 'blur(140px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

          {/* Mesh Orb 2 (Bottom Right: Sophisticated Emerald Green) */}
          <div className="arsenal-desktop-only-flex" style={{
            position: 'absolute',
            bottom: '-140px',
            right: '-120px',
            width: '560px',
            height: '560px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0) 70%)',
            filter: 'blur(150px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

          {/* Mesh Orb 3 (Center Top: Cool Tech Cyan) */}
          <div className="arsenal-desktop-only-flex" style={{
            position: 'absolute',
            top: '-160px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '620px',
            height: '620px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.13) 0%, rgba(6, 182, 212, 0) 70%)',
            filter: 'blur(150px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

          {/* Mesh Orb 4 (Side Accent: Warm Amber Gold) */}
          <div className="arsenal-desktop-only-flex" style={{
            position: 'absolute',
            top: '30%',
            right: '4%',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(242, 200, 17, 0.08) 0%, rgba(242, 200, 17, 0) 70%)',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />
        </motion.div>

        {/* Floating Pop-up Glassmorphism Card */}
        <motion.div
          className={details?.isPbiModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pbi' : details?.isPbaModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pba' : details?.isPauModal ? 'custom-modal-scrollbar custom-modal-scrollbar-pau' : details?.isMcsModal ? 'custom-modal-scrollbar custom-modal-scrollbar-mcs' : 'custom-modal-scrollbar'}
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '1080px',
            maxHeight: '86vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            scrollBehavior: 'smooth',
            margin: 'auto',
            background: 'linear-gradient(145deg, rgba(8, 10, 15, 0.97) 0%, rgba(4, 5, 8, 0.99) 100%)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: details?.isPbiModal
              ? '1px solid rgba(242, 200, 17, 0.4)'
              : details?.isPbaModal
                ? '1px solid rgba(199, 53, 144, 0.5)'
                : details?.isPauModal
                  ? '1px solid rgba(0, 188, 242, 0.5)'
                  : details?.isMcsModal
                    ? '1px solid rgba(16, 185, 129, 0.5)'
                    : '1px solid rgba(198, 255, 52, 0.25)',
            borderRadius: '16px',
            padding: '3rem',
            boxShadow: details?.isPbiModal
              ? `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(242,200,17,0.18), inset 0 1px 0 rgba(255,255,255,0.18)`
              : details?.isPbaModal
                ? `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(199,53,144,0.25), inset 0 1px 0 rgba(255,255,255,0.18)`
                : details?.isPauModal
                  ? `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(0,188,242,0.22), inset 0 1px 0 rgba(255,255,255,0.18)`
                  : details?.isMcsModal
                    ? `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(16,185,129,0.22), inset 0 1px 0 rgba(255,255,255,0.18)`
                    : `0 50px 120px -20px rgba(0,0,0,0.95), 0 0 60px rgba(198,255,52,0.12), inset 0 1px 0 rgba(255,255,255,0.18)`,
            willChange: 'transform, opacity'
          }}
        >
          {/* Top-right brand glow */}
          <div className="arsenal-desktop-only-flex" style={{ position: 'absolute', top: -40, right: -40,
            width: '400px',
            height: '400px',
            background: details?.color,
            filter: 'blur(160px)',
            opacity: details?.isPbaModal || details?.isPauModal || details?.isMcsModal ? 0.15 : 0.1,
            pointerEvents: 'none',
            borderRadius: '50%'
          }} />

          {/* Sticky Glass Top Header Bar */}
          <div className="arsenal-mobile-hidden" style={{
            position: 'sticky',
            top: '-3rem',
            marginTop: '-3rem',
            marginLeft: '-3rem',
            marginRight: '-3rem',
            padding: '1.4rem 2.5rem 1.2rem 2.5rem',
            background: 'linear-gradient(180deg, rgba(6, 8, 12, 0.96) 0%, rgba(6, 8, 12, 0.85) 75%, transparent 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '24px 24px 0 0',
            zIndex: 40,
            marginBottom: '2rem'
          }}>
            {/* Logo + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', minWidth: 0, overflow: 'hidden' }}>
              <div style={{
                width: '48px',
                height: '48px',
                padding: '0.55rem',
                background: `linear-gradient(135deg, ${details?.color}18, transparent)`,
                borderRadius: '999px',
                border: `1px solid ${details?.color}35`,
                boxShadow: `0 4px 16px ${details?.color}15`
              }}>
                <img src={tool.logo} alt={tool.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
                      {/* Mobile Title (Visible only on small screens) */}
                      <div className="arsenal-mobile-only-flex" style={{ marginTop: '1rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', textAlign: 'center' }}>
                        {tool.tool}
                      </div>
              <div>
                {!details?.isPbiModal && !details?.isPbaModal && !details?.isPauModal && !details?.isMcsModal && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: details?.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      background: `${details?.color}12`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      border: `1px solid ${details?.color}25`
                    }}>
                      {details?.badge}
                    </span>
                  </div>
                )}
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textShadow: details?.isPbiModal
                    ? '0 0 24px rgba(242, 200, 17, 0.3)'
                    : details?.isPbaModal
                      ? '0 0 24px rgba(199, 53, 144, 0.35)'
                      : details?.isPauModal
                        ? '0 0 24px rgba(0, 188, 242, 0.35)'
                        : details?.isMcsModal
                          ? '0 0 24px rgba(16, 185, 129, 0.35)'
                          : 'none'
                }}>
                  {tool.tool}
                </h2>
              </div>
            </div>

            {/* Premium Interactive Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: '38px',
                height: '38px',
                flexShrink: 0,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${details?.color}40`,
                color: details?.color || '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = details?.isPbiModal
                  ? 'rgba(242, 200, 17, 0.18)'
                  : details?.isPbaModal
                    ? 'rgba(199, 53, 144, 0.22)'
                    : details?.isPauModal
                      ? 'rgba(0, 188, 242, 0.22)'
                      : details?.isMcsModal
                        ? 'rgba(16, 185, 129, 0.22)'
                        : 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = details?.isPbiModal
                  ? 'rgba(242, 200, 17, 0.5)'
                  : details?.isPbaModal
                    ? 'rgba(199, 53, 144, 0.55)'
                    : details?.isPauModal
                      ? 'rgba(0, 188, 242, 0.55)'
                      : details?.isMcsModal
                        ? 'rgba(16, 185, 129, 0.55)'
                        : 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              ✕
            </button>
          </div>

          {/* Section Snap Focus Reveal Layout (For Power BI Modal) vs Single View */}
          {details?.isPbiModal ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '2rem', paddingTop: '1rem' }}>

              {/* Section Snap Row 01: Executive Adoption Narrative */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {details?.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem'
                  }}>
                    {details?.subheadline}
                  </p>

                  <div style={{
                    background: 'rgba(242, 200, 17, 0.05)',
                    border: '1px solid rgba(242, 200, 17, 0.22)',
                    borderRadius: '999px',
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: 'fit-content'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#F2C811',
                      lineHeight: 1
                    }}>
                      {details?.roiMetric}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.35
                    }}>
                      {details?.roiLabel}
                    </span>
                  </div>
                </div>

                {/* Right Visual 01 (Executive Dashboard) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbiDataStorytellingUiAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 02: Automated Reasoning & UX */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.35rem',
                    letterSpacing: '-0.015em'
                  }}>
                    High-Adoption Capabilities
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.85rem'
                  }}>
                    {details?.capabilities.map((cap, idx) => (
                      <div key={idx} style={{
                        padding: '1rem 1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#F2C811',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          {cap.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.45
                        }}>
                          {cap.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual 02 (AI Insights Overlay) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbiAiInsightsOverlayAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 03: Semantic Mesh Architecture */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.15rem',
                    letterSpacing: '-0.015em'
                  }}>
                    NeuralBI Differentiators
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {details?.differentiators.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
                        <span style={{ color: '#F2C811', fontSize: '0.75rem', marginTop: '0.15rem' }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  
                </div>

                {/* Right Visual 03 (Semantic Model Graph) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbiSemanticModelGraphAnim />
                </div>
              </motion.div>

            
              
            
              
            </div>
          ) : details?.isPbaModal ? (
            /* Section Snap Focus Reveal Layout (For Power Apps Modal) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '2rem', paddingTop: '1rem' }}>

              {/* Section Snap Row 01: Three Paradigms High-Level Overview & Zoom Drill-Down */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {details?.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem'
                  }}>
                    {details?.subheadline}
                  </p>

                  <div style={{
                    background: 'rgba(199, 53, 144, 0.08)',
                    border: '1px solid rgba(199, 53, 144, 0.3)',
                    borderRadius: '999px',
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: 'fit-content'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#E24AA8',
                      lineHeight: 1
                    }}>
                      {details?.roiMetric}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.35
                    }}>
                      {details?.roiLabel}
                    </span>
                  </div>
                </div>

                {/* Right Visual 01 (High-Level Paradigms Zoom Matrix) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbaThreeParadigmsAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 02: Pro-Code & Dataverse Integration Engine */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.35rem',
                    letterSpacing: '-0.015em'
                  }}>
                    Pro-Code & Dataverse Capabilities
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.85rem'
                  }}>
                    {details?.capabilities.map((cap, idx) => (
                      <div key={idx} style={{
                        padding: '1rem 1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#E24AA8',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          {cap.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.45
                        }}>
                          {cap.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual 02 (Real-Time PCF Streaming Engine) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbaProCodeApiEngineAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 03: Unified Dataverse Relational Mesh */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.15rem',
                    letterSpacing: '-0.015em'
                  }}>
                    NeuralBI Pro-Code Differentiators
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {details?.differentiators.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
                        <span style={{ color: '#E24AA8', fontSize: '0.75rem', marginTop: '0.15rem' }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  
                </div>

                {/* Right Visual 03 (Dataverse Relational Mesh) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PbaEnterpriseDataverseMeshAnim />
                </div>
              </motion.div>

            
              
            
              
            </div>
          ) : details?.isPauModal ? (
            /* Section Snap Focus Reveal Layout (For Power Automate Modal) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '2rem', paddingTop: '1rem' }}>

              {/* Section Snap Row 01: Autonomous Workflows & Process Mesh */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {details?.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem'
                  }}>
                    {details?.subheadline}
                  </p>

                  <div style={{
                    background: 'rgba(0, 188, 242, 0.05)',
                    border: '1px solid rgba(0, 188, 242, 0.25)',
                    borderRadius: '999px',
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: 'fit-content'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#00BCF2',
                      lineHeight: 1
                    }}>
                      {details?.roiMetric}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.35
                    }}>
                      {details?.roiLabel}
                    </span>
                  </div>
                </div>

                {/* Right Visual 01 (Self-Healing Autonomous Process Engine) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PauSelfHealingFlowAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 02: Resilient Capabilities */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.35rem',
                    letterSpacing: '-0.015em'
                  }}>
                    Neural Automation Capabilities
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.85rem'
                  }}>
                    {details?.capabilities.map((cap, idx) => (
                      <div key={idx} style={{
                        padding: '1rem 1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#00BCF2',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          {cap.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.45
                        }}>
                          {cap.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual 02 (The Event-Driven Automation Mesh) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PauEventDrivenMeshAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 03: NeuralBI Differentiators */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.15rem',
                    letterSpacing: '-0.015em'
                  }}>
                    NeuralBI Process Differentiators
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {details?.differentiators.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
                        <span style={{ color: '#00BCF2', fontSize: '0.75rem', marginTop: '0.15rem' }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  
                </div>

                {/* Right Visual 03 (Zero-Trust Resilient Mesh & DLQ Auto-Recovery) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <PauResilientDlqMeshAnim />
                </div>
              </motion.div>

            
              
            
              
            </div>
          ) : details?.isMcsModal ? (
            /* Section Snap Focus Reveal Layout (For Copilot Studio Modal) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '2rem', paddingTop: '1rem' }}>

              {/* Section Snap Row 01: Cognitive Agent Framework */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {details?.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem'
                  }}>
                    {details?.subheadline}
                  </p>

                  <div style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '999px',
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: 'fit-content'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#10B981',
                      lineHeight: 1
                    }}>
                      {details?.roiMetric}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.35
                    }}>
                      {details?.roiLabel}
                    </span>
                  </div>
                </div>

                {/* Right Visual 01 (The Grounded Reasoning & Action Loop) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <McsGroundedReasoningAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 02: Enterprise Agent Capabilities */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.35rem',
                    letterSpacing: '-0.015em'
                  }}>
                    Autonomous Multi-Agent Capabilities
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.85rem'
                  }}>
                    {details?.capabilities.map((cap, idx) => (
                      <div key={idx} style={{
                        padding: '1rem 1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#10B981',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          {cap.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.45
                        }}>
                          {cap.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual 02 (Multi-Step Agentic Chain) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <McsMultiStepChainAnim />
                </div>
              </motion.div>

              {/* Section Snap Row 03: NeuralBI Differentiators */}
              <motion.div className="arsenal-modal-grid" initial={{ opacity: 0.1, y: 50, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: 'transform, opacity',
                  display: 'grid',
                  
                  gap: '3.5rem',
                  alignItems: 'center',
                  minHeight: '58vh',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                {/* Left Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginBottom: '0.85rem'
                  }}>
                    NeuralBI Agent Differentiators
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 2rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}>
                    {details?.differentiators.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.5
                      }}>
                        <span style={{ color: '#10B981', fontSize: '0.75rem', marginTop: '0.2rem' }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  
                </div>

                {/* Right Visual 03 (The Zero-Hallucination Containment Field) */}
                <div className="arsenal-desktop-only-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <McsZeroHallucinationFieldAnim />
                </div>
              </motion.div>

            
              
            
              
            </div>
          ) : (
            /* General Single Column Modal for non-PBI Tools */
            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, marginBottom: '1rem' }}>
                  {details?.headline}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {details?.subheadline}
                </p>
                <div style={{ background: details?.isMcsModal ? 'rgba(16, 185, 129, 0.05)' : 'rgba(198, 255, 52, 0.04)', border: details?.isMcsModal ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(198, 255, 52, 0.15)', borderRadius: '999px', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: details?.color || '#c6ff34', lineHeight: 1 }}>{details?.roiMetric}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>{details?.roiLabel}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                  {details?.capabilities.map((cap, idx) => (
                    <div key={idx} style={{ padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '999px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, color: details?.color, display: 'block', marginBottom: '0.3rem' }}>{cap.label}</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{cap.desc}</span>
                    </div>
                  ))}
                </div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>NeuralBI Differentiators</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {details?.differentiators.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                      <span style={{ color: details?.color || '#c6ff34', fontSize: '0.7rem', marginTop: '0.15rem' }}>◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '2rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.015)', border: details?.isMcsModal ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1rem', boxShadow: details?.isMcsModal ? '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(16,185,129,0.12)' : '0 20px 50px rgba(0,0,0,0.5)' }}>
                  {details?.svg}
                </div>
                <button
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: details?.isMcsModal ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.12) 100%)' : 'linear-gradient(135deg, rgba(198, 255, 52, 0.2) 0%, rgba(198, 255, 52, 0.05) 100%)',
                    border: details?.isMcsModal ? '1px solid rgba(16, 185, 129, 0.55)' : '1px solid rgba(198, 255, 52, 0.4)',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: details?.isMcsModal ? '0 8px 25px rgba(16, 185, 129, 0.25)' : '0 8px 25px rgba(198, 255, 52, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (details?.isMcsModal) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.55) 0%, rgba(5, 150, 105, 0.25) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.85)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (details?.isMcsModal) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.12) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.55)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
                    }
                  }}
                >
                  Book {tool.tool} Architecture Review →
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── SUB-COMPONENTS FOR REDESIGNED ARSENAL ───

function SuiForkArsenal({ activeIndex, isRemix, onOpenModal }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--color-paper)', display: 'flex', alignItems: 'center', color: 'var(--color-ink)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '100px 100px', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'flex', gap: '6rem', alignItems: 'center', zIndex: 10 }}>
        <div style={{ flex: 1, position: 'relative', height: '550px', overflow: 'hidden' }}>
          {arsenalData.map((item, idx) => {
            const isActive = activeIndex === idx;
            const isPast = activeIndex > idx;
            const yOffset = isActive ? '0%' : isPast ? '-100%' : '100%';

            return (
              <div key={item.id} style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transform: `translateY(${yOffset})`,
                transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
                opacity: isActive ? 1 : 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', color: 'var(--color-accent)', fontSize: '1rem' }}>[{idx + 1}/4]</span>
                  <span style={{ height: '1px', width: '40px', background: 'var(--color-accent)' }} />
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>{item.architecture}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 6vw, 6.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2rem', textTransform: 'uppercase', color: '#ffffff' }}>
                  {item.tool}
                </h2>

                <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-ui)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '1.5rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'var(--color-ink-2)', lineHeight: 1.6, maxWidth: '85%', marginBottom: '2.5rem' }}>{item.body}</p>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {item.specs.map((spec, i) => (
                    <div key={i} style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-ink-2)' }}>
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ width: '450px', height: '550px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }} />
          {arsenalData.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={item.id} style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
                transition: 'all 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
                filter: isActive ? 'drop-shadow(0 0 40px rgba(198,255,52,0.15))' : 'none'
              }}>
                <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            );
          })}

          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '4px' }}>
            {[1, 2, 3].map(i => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.5 }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CinematicArsenal() {
  const [slide, setSlide] = React.useState(0);
  const nextSlide = () => setSlide((prev) => (prev + 1) % arsenalData.length);
  const prevSlide = () => setSlide((prev) => (prev - 1 + arsenalData.length) % arsenalData.length);
  const currentItem = arsenalData[slide];

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', padding: '8rem 0' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '4rem', minHeight: '350px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>
              System Architecture // 04
            </span>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.05em', lineHeight: 0.8, opacity: 0.05 }}>
              0{slide + 1}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
            <button
              onClick={prevSlide}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0px',
                color: '#fff',
                padding: '1rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              PREV
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
              0{slide + 1} / 0{arsenalData.length}
            </span>
            <button
              onClick={nextSlide}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0px',
                color: '#fff',
                padding: '1rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              NEXT
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', height: '400px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                willChange: 'transform, opacity',
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ width: '56px', height: '56px', filter: 'grayscale(100%) contrast(1.5)' }}>
                  <img src={currentItem.logo} alt={currentItem.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0, lineHeight: 1 }}>
                  {currentItem.tool}
                </h2>
              </div>
              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '2rem', color: '#a1a1aa', fontWeight: 400, marginBottom: '1.5rem' }}>{currentItem.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: '#71717a', lineHeight: 1.5, maxWidth: '90%' }}>{currentItem.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ModernV2Arsenal() {
  const [slide, setSlide] = React.useState(0);
  const nextSlide = () => setSlide((prev) => (prev + 1) % arsenalData.length);
  const prevSlide = () => setSlide((prev) => (prev - 1 + arsenalData.length) % arsenalData.length);
  const currentItem = arsenalData[slide];

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 10 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 800, color: '#fff' }}>The Arsenal</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)' }}>Layered intelligence. Unprecedented scale.</p>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                willChange: 'transform, opacity',
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: '#0c0c0e',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                <div style={{ width: '64px', height: '64px' }}>
                  <img src={currentItem.logo} alt={currentItem.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '0.5rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#c6ff34', border: '1px solid rgba(198,255,52,0.1)' }}>
                  {currentItem.metric}
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.2rem' }}>{currentItem.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{currentItem.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 10 }}>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {arsenalData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={slide === idx ? 'true' : undefined}
                style={{
                  minWidth: '36px',
                  minHeight: '36px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: slide === idx ? '#c6ff34' : 'rgba(255,255,255,0.2)',
                    display: 'block',
                    transition: 'background 0.3s'
                  }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function TechV4Arsenal({ isRemix }) {
  const fontHeader = isRemix ? 'var(--font-display)' : 'var(--font-mono)';
  const fontLabel = isRemix ? 'var(--font-display)' : 'var(--font-mono)';
  const fontLabelSmall = isRemix ? 'var(--font-sans)' : 'var(--font-mono)';

  return (
    <section style={{ position: 'relative', width: '100%', background: '#020202', padding: '8rem 0' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        <div style={{ borderBottom: '1px dashed rgba(198,255,52,0.3)', paddingBottom: '2rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: fontLabelSmall, fontSize: '0.85rem', color: '#c6ff34' }}>
            [SYSTEM_CAPABILITIES_MANIFEST]
          </span>
          <h2 style={{ fontFamily: fontHeader, fontSize: '3rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            THE ARSENAL
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {arsenalData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              style={{
                willChange: 'transform, opacity',
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '4rem',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '3rem',
                background: '#050505',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '4px', left: '4px', fontSize: '0.5rem', color: 'rgba(198,255,52,0.3)' }}>+</div>
              <div style={{ position: 'absolute', top: '4px', right: '4px', fontSize: '0.5rem', color: 'rgba(198,255,52,0.3)' }}>+</div>
              <div style={{ position: 'absolute', bottom: '4px', left: '4px', fontSize: '0.5rem', color: 'rgba(198,255,52,0.3)' }}>+</div>
              <div style={{ position: 'absolute', bottom: '4px', right: '4px', fontSize: '0.5rem', color: 'rgba(198,255,52,0.3)' }}>+</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRight: '1px dashed rgba(255,255,255,0.1)', paddingRight: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', filter: 'sepia(1) hue-rotate(50deg) saturate(5)' }}>
                    <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: fontLabel, fontSize: '1.25rem', color: '#fff', fontWeight: 'bold', display: 'block' }}>
                      {item.tool}
                    </span>
                    <span style={{ fontFamily: fontLabelSmall, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                      0{idx + 1} // SYS_VAL
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <span style={{ fontFamily: fontLabel, fontSize: '0.8rem', color: '#c6ff34', display: 'block' }}>
                    {item.metric}
                  </span>
                  <span style={{ fontFamily: fontLabelSmall, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                    {item.architecture}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: fontHeader, fontSize: '2rem', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                  {item.body}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  {item.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontFamily: fontLabelSmall,
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '0.4rem 0.8rem',
                        background: 'rgba(255,255,255,0.02)'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AWWWARDS-LEVEL DATA NARRATIVE ARSENAL CARD ───
function ArsenalCard({ item, effect, onOpenModal }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);
  const isPbi = item.id === 'power-bi';
  const isPba = item.id === 'power-apps';
  const isPau = item.id === 'power-automate';
  const isMcs = item.id === 'copilot-studio';

  // Power BI Pills vs Power Apps Pills vs Power Automate Pills vs Copilot Studio Pills
  const pbiPills = [
    {
      label: 'Interactive Executive Dashboards 2.0',
      badge: '60 FPS',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(242,200,17,0.8))' : 'none', transition: 'all 0.3s ease' }}>
          <rect x="2" y="2" width="5" height="5" rx="1" />
          <rect x="9" y="2" width="5" height="5" rx="1" />
          <rect x="2" y="9" width="12" height="5" rx="1" />
        </svg>
      )
    },
    {
      label: 'Fabric Direct Lake Semantic Model',
      badge: '0.04ms',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(242,200,17,0.8))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M9 1.5L2.5 9H8.5L7 14.5L13.5 7H7.5L9 1.5Z" fill={hovered ? 'rgba(242,200,17,0.25)' : 'none'} />
        </svg>
      )
    },
    {
      label: 'Automated AI Reasoning & UX Storytelling',
      badge: 'AI-Native',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(242,200,17,0.8))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 2C8 4.5 9.5 6 12 6C9.5 6 8 7.5 8 10C8 7.5 6.5 6 4 6C6.5 6 8 4.5 8 2Z" fill={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} />
          <path d="M12.5 10.5C12.5 11.5 13 12 14 12C13 12 12.5 12.5 12.5 13.5C12.5 12.5 12 12 11 12C12 12 12.5 11.5 12.5 10.5Z" fill={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} />
        </svg>
      )
    },
    {
      label: 'Role-Based Persona Security Architecture',
      badge: 'RLS Pro',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#F2C811' : 'rgba(242, 200, 17, 0.75)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(242,200,17,0.8))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 1.5L13.5 4V7.5C13.5 11 11 13.5 8 14.5C5 13.5 2.5 11 2.5 7.5V4L8 1.5Z" fill={hovered ? 'rgba(242,200,17,0.2)' : 'none'} />
          <path d="M8 6.5V9.5M6.5 8H9.5" strokeWidth="1.2" />
        </svg>
      )
    }
  ];

  const pbaPills = [
    {
      label: 'Custom React & PCF Code Components',
      badge: 'React 18',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(199,53,144,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <circle cx="8" cy="8" r="2" fill={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.6)'} />
          <ellipse cx="8" cy="8" rx="6.5" ry="2.5" transform="rotate(30 8 8)" />
          <ellipse cx="8" cy="8" rx="6.5" ry="2.5" transform="rotate(150 8 8)" />
        </svg>
      )
    },
    {
      label: 'Canvas & Model-Driven Workflows',
      badge: 'Model-Driven',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(199,53,144,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M9 1.5L2.5 9H8.5L7 14.5L13.5 7H7.5L9 1.5Z" fill={hovered ? 'rgba(199,53,144,0.3)' : 'none'} />
        </svg>
      )
    },
    {
      label: 'Dataverse & Enterprise API Integration',
      badge: '0.04ms API',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(199,53,144,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M6 3.5V6.5M10 3.5V6.5M4 6.5H12V8.5C12 10.7 10.2 12.5 8 12.5C5.8 12.5 4 10.7 4 8.5V6.5ZM8 12.5V14.5" fill={hovered ? 'rgba(199,53,144,0.3)' : 'none'} />
        </svg>
      )
    },
    {
      label: 'Tailored Canvas App Interfaces',
      badge: 'UX 2.0',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#E24AA8' : 'rgba(226, 74, 168, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(199,53,144,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <rect x="3.5" y="1.5" width="9" height="13" rx="2" fill={hovered ? 'rgba(199,53,144,0.25)' : 'none'} />
          <path d="M6.5 11.5H9.5" />
        </svg>
      )
    }
  ];

  const pauPills = [
    {
      label: 'Autonomous Event-Driven Cloud & Desktop RPA Flows',
      badge: 'RPA 2.0',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(0,188,242,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M9 1.5L2.5 9H8.5L7 14.5L13.5 7H7.5L9 1.5Z" fill={hovered ? 'rgba(0,188,242,0.3)' : 'none'} />
        </svg>
      )
    },
    {
      label: '1,000+ Enterprise API Connectors & Neural Pipelines',
      badge: 'REST & GraphQL',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(0,188,242,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <circle cx="4" cy="8" r="2" fill={hovered ? '#00BCF2' : 'none'} />
          <circle cx="12" cy="4" r="2" fill={hovered ? '#00BCF2' : 'none'} />
          <circle cx="12" cy="12" r="2" fill={hovered ? '#00BCF2' : 'none'} />
          <path d="M6 8H9C10.1 8 11 7.1 11 6V6M9 8C10.1 8 11 8.9 11 10V10" />
        </svg>
      )
    },
    {
      label: 'AI Builder Intelligent Document & Unstructured Mining',
      badge: 'AI-Native',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(0,188,242,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 2C8 4.5 9.5 6 12 6C9.5 6 8 7.5 8 10C8 7.5 6.5 6 4 6C6.5 6 8 4.5 8 2Z" fill={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.75)'} />
          <path d="M12.5 10.5C12.5 11.5 13 12 14 12C13 12 12.5 12.5 12.5 13.5C12.5 12.5 12 12 11 12C12 12 12.5 11.5 12.5 10.5Z" fill={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.75)'} />
        </svg>
      )
    },
    {
      label: 'Zero-Trust Resilient Error Throttling & Observability',
      badge: '99.99% SLA',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#00BCF2' : 'rgba(0, 188, 242, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(0,188,242,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 1.5L13.5 4V7.5C13.5 11 11 13.5 8 14.5C5 13.5 2.5 11 2.5 7.5V4L8 1.5Z" fill={hovered ? 'rgba(0,188,242,0.2)' : 'none'} />
          <path d="M8 6.5V9.5M6.5 8H9.5" strokeWidth="1.2" />
        </svg>
      )
    }
  ];

  const mcsPills = [
    {
      label: 'Autonomous Multi-Agent Copilot Orchestration',
      badge: 'Copilot Studio',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(16,185,129,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 2C8 4.5 9.5 6 12 6C9.5 6 8 7.5 8 10C8 7.5 6.5 6 4 6C6.5 6 8 4.5 8 2Z" fill={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.75)'} />
          <path d="M12.5 10.5C12.5 11.5 13 12 14 12C13 12 12.5 12.5 12.5 13.5C12.5 12.5 12 12 11 12C12 12 12.5 11.5 12.5 10.5Z" fill={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.75)'} />
        </svg>
      )
    },
    {
      label: 'Generative Action Plugins & Pro-Code APIs',
      badge: 'Pro-Code Plugins',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(16,185,129,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M9 1.5L2.5 9H8.5L7 14.5L13.5 7H7.5L9 1.5Z" fill={hovered ? 'rgba(16,185,129,0.3)' : 'none'} />
        </svg>
      )
    },
    {
      label: 'Dataverse Vector RAG & Enterprise Knowledge Retrieval',
      badge: 'Vector RAG',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(16,185,129,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <ellipse cx="8" cy="4" rx="6" ry="2.5" fill={hovered ? 'rgba(16,185,129,0.3)' : 'none'} />
          <path d="M2 4V8C2 9.4 4.7 10.5 8 10.5C11.3 10.5 14 9.4 14 8V4M2 8V12C2 13.4 4.7 14.5 8 14.5C11.3 14.5 14 13.4 14 12V8" />
        </svg>
      )
    },
    {
      label: 'Zero-Trust Agent Observability & SLA Compliance',
      badge: 'Zero-Trust',
      icon: (hovered) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={hovered ? '#10B981' : 'rgba(16, 185, 129, 0.8)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(16,185,129,0.85))' : 'none', transition: 'all 0.3s ease' }}>
          <path d="M8 1.5L13.5 4V7.5C13.5 11 11 13.5 8 14.5C5 13.5 2.5 11 2.5 7.5V4L8 1.5Z" fill={hovered ? 'rgba(16,185,129,0.2)' : 'none'} />
          <path d="M8 6.5V9.5M6.5 8H9.5" strokeWidth="1.2" />
        </svg>
      )
    }
  ];

  const activePills = isPbi ? pbiPills : (isPba ? pbaPills : (isPau ? pauPills : (isMcs ? mcsPills : null)));

  return (
    <motion.div
      className="arsenal-horizontal-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setHoveredPill(null); }}
      onClick={() => onOpenModal && onOpenModal(item)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        background: isPbi
          ? (isHovered
            ? 'radial-gradient(ellipse at 75% 25%, rgba(245, 158, 11, 0.16) 0%, rgba(14, 18, 28, 0.88) 55%, rgba(6, 8, 14, 0.96) 100%)'
            : 'radial-gradient(ellipse at 75% 25%, rgba(245, 158, 11, 0.08) 0%, rgba(11, 14, 22, 0.85) 55%, rgba(5, 7, 12, 0.94) 100%)')
          : isPba
            ? (isHovered
              ? 'radial-gradient(ellipse at 25% 25%, rgba(199, 53, 144, 0.18) 0%, rgba(20, 14, 28, 0.88) 55%, rgba(10, 6, 14, 0.96) 100%)'
              : 'radial-gradient(ellipse at 25% 25%, rgba(199, 53, 144, 0.09) 0%, rgba(16, 11, 22, 0.85) 55%, rgba(8, 5, 12, 0.94) 100%)')
            : isPau
              ? (isHovered
                ? 'radial-gradient(ellipse at 75% 80%, rgba(0, 188, 242, 0.18) 0%, rgba(10, 20, 32, 0.88) 55%, rgba(4, 8, 16, 0.96) 100%)'
                : 'radial-gradient(ellipse at 75% 80%, rgba(0, 188, 242, 0.09) 0%, rgba(8, 16, 26, 0.85) 55%, rgba(4, 7, 14, 0.94) 100%)')
              : isMcs
                ? (isHovered
                  ? 'radial-gradient(ellipse at 25% 80%, rgba(16, 185, 129, 0.18) 0%, rgba(10, 26, 20, 0.88) 55%, rgba(4, 14, 10, 0.96) 100%)'
                  : 'radial-gradient(ellipse at 25% 80%, rgba(16, 185, 129, 0.09) 0%, rgba(8, 20, 15, 0.85) 55%, rgba(4, 12, 8, 0.94) 100%)')
                : (isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)'),
        border: isPbi
          ? (isHovered ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)')
          : isPba
            ? (isHovered ? '1px solid rgba(199, 53, 144, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)')
            : isPau
              ? (isHovered ? '1px solid rgba(0, 188, 242, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)')
              : isMcs
                ? (isHovered ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)')
                : '1px solid rgba(255,255,255,0.04)',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: isPbi
          ? (isHovered
            ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 32px 90px rgba(0,0,0,0.95), 0 0 70px rgba(245, 158, 11, 0.18)'
            : 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 20px 50px rgba(0,0,0,0.6)')
          : isPba
            ? (isHovered
              ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 32px 90px rgba(0,0,0,0.95), 0 0 70px rgba(199, 53, 144, 0.18)'
              : 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 20px 50px rgba(0,0,0,0.6)')
            : isPau
              ? (isHovered
                ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 32px 90px rgba(0,0,0,0.95), 0 0 70px rgba(0, 188, 242, 0.18)'
                : 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 20px 50px rgba(0,0,0,0.6)')
              : isMcs
                ? (isHovered
                  ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), 0 32px 90px rgba(0,0,0,0.95), 0 0 70px rgba(16, 185, 129, 0.18)'
                  : 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 20px 50px rgba(0,0,0,0.6)')
                : '0 30px 60px rgba(0,0,0,0.35)',
        width: '760px',
        flexShrink: 0,
        rotateY: effect?.rotateY || 0,
        scale: effect?.scale || 1,
        opacity: effect?.opacity || 1,
        transformStyle: 'preserve-3d',
        backdropFilter: 'blur(36px) saturate(210%)',
        WebkitBackdropFilter: 'blur(36px) saturate(210%)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        willChange: 'transform, opacity'
      }}
    >
      {/* Top Specular Edge Highlight Line for Power BI (Originating Top-Right) */}
      {isPbi && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent 30%, rgba(245, 158, 11, 0.85) 75%, rgba(242, 200, 17, 0.4) 100%)',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          zIndex: 2
        }} />
      )}

      {/* Top Specular Edge Highlight Line for Power Apps (Originating Top-Left) */}
      {isPba && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, rgba(199, 53, 144, 0.85) 0%, rgba(226, 74, 168, 0.4) 40%, transparent 80%)',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          zIndex: 2
        }} />
      )}

      {/* Bottom Specular Edge Highlight Line for Power Automate (Originating Bottom-Right) */}
      {isPau && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent 25%, rgba(0, 188, 242, 0.85) 75%, rgba(0, 120, 212, 0.4) 100%)',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          zIndex: 2
        }} />
      )}

      {/* Bottom Specular Edge Highlight Line for Copilot Studio (Originating Bottom-Left) */}
      {isMcs && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.85) 0%, rgba(0, 235, 136, 0.4) 45%, transparent 75%)',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          zIndex: 2
        }} />
      )}

      {/* Atmospheric Ambient Mesh Radial Glow for Power BI (Top-Right) */}
      {isPbi && (
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle at 65% 35%, rgba(245, 158, 11, 0.14) 0%, rgba(242, 200, 17, 0.04) 55%, transparent 75%)',
          filter: 'blur(130px)',
          opacity: isHovered ? 1 : 0.65,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          animation: 'pbi-pulse 5s ease-in-out infinite alternate',
          zIndex: 0
        }} />
      )}

      {/* Atmospheric Ambient Mesh Radial Glow for Power Apps (Top-Left Background) */}
      {isPba && (
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle at 35% 35%, rgba(199, 53, 144, 0.16) 0%, rgba(165, 42, 116, 0.04) 55%, transparent 75%)',
          filter: 'blur(130px)',
          opacity: isHovered ? 1 : 0.65,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          animation: 'pbi-pulse 5s ease-in-out infinite alternate',
          zIndex: 0
        }} />
      )}

      {/* Atmospheric Ambient Mesh Radial Glow for Power Automate (Bottom-Right Background) */}
      {isPau && (
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle at 65% 65%, rgba(0, 188, 242, 0.16) 0%, rgba(0, 120, 212, 0.04) 55%, transparent 75%)',
          filter: 'blur(130px)',
          opacity: isHovered ? 1 : 0.65,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          animation: 'pbi-pulse 5s ease-in-out infinite alternate',
          zIndex: 0
        }} />
      )}

      {/* Atmospheric Ambient Mesh Radial Glow for Copilot Studio (Bottom-Left Background) */}
      {isMcs && (
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle at 35% 65%, rgba(16, 185, 129, 0.16) 0%, rgba(10, 120, 80, 0.04) 55%, transparent 75%)',
          filter: 'blur(130px)',
          opacity: isHovered ? 1 : 0.65,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          animation: 'pbi-pulse 5s ease-in-out infinite alternate',
          zIndex: 0
        }} />
      )}

            {/* Impeccable Halftone Texture Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        opacity: isHovered ? 0.8 : 0.3,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
        zIndex: 1
      }} />

{/* Raycast Header Row (App Icon + Title + Expand Action Pill Button) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Left: App Icon + App Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Raycast Squircle Glass Pedestal Icon */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '13px',
            background: isPbi
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(10, 14, 22, 0.9) 100%)'
              : isPba
                ? 'linear-gradient(135deg, rgba(199, 53, 144, 0.18) 0%, rgba(14, 10, 20, 0.9) 100%)'
                : isPau
                  ? 'linear-gradient(135deg, rgba(0, 188, 242, 0.18) 0%, rgba(8, 16, 26, 0.9) 100%)'
                  : isMcs
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(8, 20, 15, 0.9) 100%)'
                    : 'rgba(255,255,255,0.05)',
            border: isPbi
              ? '1px solid rgba(245, 158, 11, 0.35)'
              : isPba
                ? '1px solid rgba(199, 53, 144, 0.35)'
                : isPau
                  ? '1px solid rgba(0, 188, 242, 0.35)'
                  : isMcs
                    ? '1px solid rgba(16, 185, 129, 0.35)'
                    : '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.55rem',
            boxShadow: isPbi
              ? '0 4px 20px rgba(245, 158, 11, 0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
              : isPba
                ? '0 4px 20px rgba(199, 53, 144, 0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
                : isPau
                  ? '0 4px 20px rgba(0, 188, 242, 0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
                  : isMcs
                    ? '0 4px 20px rgba(16, 185, 129, 0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : 'none',
            transition: 'all 0.4s ease'
          }}>
            <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.01em'
            }}>
              {item.tool}
            </h4>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: isPbi ? '#F2C811' : isPba ? '#E24AA8' : isPau ? '#00BCF2' : isMcs ? '#10B981' : '#c6ff34',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              opacity: 0.9
            }}>
              {item.architecture}
            </span>
          </div>
        </div>

        {/* Right: Raycast Action Pill inviting user to Expand Card */}
        <div className="arsenal-expand-btn" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          padding: '0.5rem 0.95rem',
          borderRadius: '999px',
          background: isHovered
            ? (isPbi ? 'rgba(245, 158, 11, 0.14)' : isPba ? 'rgba(199, 53, 144, 0.16)' : isPau ? 'rgba(0, 188, 242, 0.16)' : isMcs ? 'rgba(16, 185, 129, 0.16)' : 'rgba(255, 255, 255, 0.08)')
            : 'rgba(255, 255, 255, 0.04)',
          border: isHovered
            ? (isPbi ? '1px solid rgba(245, 158, 11, 0.45)' : isPba ? '1px solid rgba(199, 53, 144, 0.45)' : isPau ? '1px solid rgba(0, 188, 242, 0.45)' : isMcs ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)')
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered
            ? (isPbi ? '0 0 20px rgba(245, 158, 11, 0.2)' : isPba ? '0 0 20px rgba(199, 53, 144, 0.2)' : isPau ? '0 0 20px rgba(0, 188, 242, 0.2)' : isMcs ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none')
            : 'none',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer'
        }}>
          <span className="arsenal-expand-text" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
            transition: 'color 0.3s ease'
          }}>
            Expand Architecture
          </span>
          <svg style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease',
            color: isPbi ? '#F2C811' : isPba ? '#E24AA8' : isPau ? '#00BCF2' : isMcs ? '#10B981' : '#c6ff34'
          }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>

      {/* Description Text Section */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.65rem',
          color: '#ffffff',
          fontWeight: 800,
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.25
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.925rem',
          color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.6,
          margin: 0
        }}>
          {item.body}
        </p>
      </div>

      {/* Clean Raycast Command Stack (Micro SVG Icons + Hover Lighting) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        position: 'relative',
        zIndex: 2,
        marginTop: '0.25rem'
      }}>
        {activePills
          ? activePills.map((pill, pIdx) => {
            const isThisPillHovered = hoveredPill === pIdx;

            return (
              <div
                key={pIdx}
                onMouseEnter={(e) => { e.stopPropagation(); setHoveredPill(pIdx); }}
                onMouseLeave={(e) => { e.stopPropagation(); setHoveredPill(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.15rem',
                  background: isThisPillHovered
                    ? (isPbi ? 'rgba(245, 158, 11, 0.08)' : isPba ? 'rgba(199, 53, 144, 0.1)' : isPau ? 'rgba(0, 188, 242, 0.1)' : isMcs ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.08)')
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isThisPillHovered
                    ? (isPbi ? '1px solid rgba(245, 158, 11, 0.45)' : isPba ? '1px solid rgba(199, 53, 144, 0.45)' : isPau ? '1px solid rgba(0, 188, 242, 0.45)' : isMcs ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)')
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '999px',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: isThisPillHovered
                    ? (isPbi ? '0 4px 20px rgba(245, 158, 11, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : isPba ? '0 4px 20px rgba(199, 53, 144, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : isPau ? '0 4px 20px rgba(0, 188, 242, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : isMcs ? '0 4px 20px rgba(16, 185, 129, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : 'none')
                    : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isThisPillHovered ? 'translateX(4px)' : 'translateX(0)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px' }}>
                    {pill.icon(isThisPillHovered)}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isThisPillHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                    transition: 'color 0.3s ease'
                  }}>
                    {pill.label}
                  </span>
                </div>
              </div>
            );
          })
          : item.specs.map((spec, sIdx) => (
            <div
              key={sIdx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1.15rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '999px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              <span style={{ color: '#c6ff34' }}>◆</span>
              <span>{spec}</span>
            </div>
          ))}
      </div>
    </motion.div>
  );
}

function Spline1Arsenal({ isRemix, onOpenModal }) {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Set up vertical scroll timeline mapping perfectly aligned to sticky bounds
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate exact pixel overflow range for 1-to-1 horizontal scroll
  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth + 120);
      }
    };
    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  // Direct 1-to-1 unlagged horizontal track shift across all cards
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // 3D rotations, scales, and opacity fades for each bento card mapped to scroll progress
  const card0RotateY = useTransform(scrollYProgress, [0.0, 0.20, 0.35], [-12, 0, 0]);
  const card0Scale = useTransform(scrollYProgress, [0.0, 0.20, 0.35], [0.93, 1, 1]);
  const card0Opacity = useTransform(scrollYProgress, [0.0, 0.20, 0.35], [0.35, 1, 1]);

  const card1RotateY = useTransform(scrollYProgress, [0.20, 0.45, 0.60], [-12, 0, 0]);
  const card1Scale = useTransform(scrollYProgress, [0.20, 0.45, 0.60], [0.93, 1, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.45, 0.60], [0.35, 1, 1]);

  const card2RotateY = useTransform(scrollYProgress, [0.45, 0.70, 0.85], [-12, 0, 0]);
  const card2Scale = useTransform(scrollYProgress, [0.45, 0.70, 0.85], [0.93, 1, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.45, 0.70, 0.85], [0.35, 1, 1]);

  const card3RotateY = useTransform(scrollYProgress, [0.70, 0.90, 1.0], [-12, 0, 0]);
  const card3Scale = useTransform(scrollYProgress, [0.70, 0.90, 1.0], [0.93, 1, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.70, 0.90, 1.0], [0.35, 1, 1]);

  const cardEffects = [
    { rotateY: card0RotateY, scale: card0Scale, opacity: card0Opacity },
    { rotateY: card1RotateY, scale: card1Scale, opacity: card1Opacity },
    { rotateY: card2RotateY, scale: card2Scale, opacity: card2Opacity },
    { rotateY: card3RotateY, scale: card3Scale, opacity: card3Opacity }
  ];

  if (!isRemix) {
    return (
      <section style={{ position: 'relative', width: '100%', padding: '8rem 0' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'rgba(198,255,52,0.02)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.01)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#fff', fontWeight: 400 }}>
              The Arsenal
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {arsenalData.map((item, idx) => (
              <ArsenalCard key={item.id} item={item} onOpenModal={onOpenModal} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Remix horizontal bento-slide showcase
  return (
    <>
      {/* DESKTOP BLOCK */}
      <div className="arsenal-desktop-only">
        <section ref={targetRef} style={{ position: 'relative', width: '100%', height: '400vh', background: '#020202', zIndex: 10 }}>
          {/* Background radial glows for aesthetic depth */}
          <div style={{ position: 'absolute', top: '15%', left: '20%', width: '400px', height: '400px', background: 'rgba(198,255,52,0.015)', filter: 'blur(120px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '15%', right: '20%', width: '500px', height: '500px', background: 'rgba(255,255,255,0.01)', filter: 'blur(150px)', pointerEvents: 'none' }} />

          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            background: 'transparent'
          }}>
            <motion.div ref={trackRef} style={{
              display: 'flex',
              gap: '5rem',
              paddingLeft: '10%',
              paddingRight: '20%',
              x,
              width: 'max-content',
              perspective: '1200px',
              willChange: 'transform'
            }}>
              {/* Header Panel */}
              <div style={{ width: '450px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
                <h2 style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
                  <CharacterReveal
                    text="The"
                    className="text-gradient-premium"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}
                  />
                  <CharacterReveal
                    text="Arsenal"
                    className="text-gradient-premium"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}
                  />
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                  <CharacterReveal text="Pro-code applications, autonomous AI workflows, and modern Fabric-driven intelligence architectures. Engineered to eliminate operational debt across your entire ecosystem." stagger={0.008} />
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>Scroll down to slide</span>
                  <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#c6ff34' }}>→</span>
                </div>
              </div>

              {/* Cards Panels */}
              {arsenalData.map((item, idx) => {
                const effect = cardEffects[idx];
                return (
                  <ArsenalCard key={item.id} item={item} effect={effect} onOpenModal={onOpenModal} />
                );
              })}
            </motion.div>
          </div>
        </section>
      </div>

      {/* MOBILE BLOCK */}
      <div className="arsenal-mobile-only">
        <section style={{ position: 'relative', width: '100%', padding: '6rem 0', background: '#020202', zIndex: 10 }}>
           {/* Header Panel (Static, Top) */}
           <div className="arsenal-mobile-title" style={{ padding: '0 2rem', marginBottom: '4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CharacterReveal
                  text="The"
                  className="text-gradient-premium"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}
                />
                <CharacterReveal
                  text="Arsenal"
                  className="text-gradient-premium"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}
                />
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '1.5rem 0 0 0' }}>
                <CharacterReveal text="Pro-code applications, autonomous AI workflows, and modern Fabric-driven intelligence architectures." stagger={0.008} />
              </p>
           </div>
           
           {/* Mobile Track (Vertical Stack) */}
           <div style={{
             display: 'flex',
             flexDirection: 'column',
             gap: '3rem',
             padding: '0 1.5rem 4rem 1.5rem',
           }}>
             {arsenalData.map((item, idx) => (
                <div key={item.id} style={{ width: '100%' }}>
                  {/* Note: NO effect prop passed here so opacity stays 1! */}
                  <ArsenalCard item={item} onOpenModal={onOpenModal} />
                </div>
             ))}
           </div>
        </section>
      </div>
    </>
  );
}

// ─── MAIN ARSENAL CONTAINER COMPONENT ───
function Arsenal({ activeHero, onOpenModal }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeHero !== 'sui_fork') return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = rect.height - windowHeight;
      const scrolled = -rect.top;

      let p = scrolled / scrollableDistance;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeHero]);

  // Calculate active index (0 to 3) for scrollable theme
  const activeIndex = Math.min(3, Math.floor(progress * 4));

  if (activeHero === 'sui_fork') {
    return (
      <section style={{ position: 'relative' }}>
        <div style={{ height: '400vh', position: 'relative' }} ref={containerRef}>
          <div style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            zIndex: 20
          }}>
            <SuiForkArsenal activeIndex={activeIndex} isRemix={false} onOpenModal={onOpenModal} />
          </div>
        </div>
      </section>
    );
  }

  if (activeHero === 'remix') {
    return <Spline1Arsenal isRemix={true} onOpenModal={onOpenModal} />;
  }

  if (activeHero === 'cinematic') {
    return <CinematicArsenal onOpenModal={onOpenModal} />;
  }

  if (activeHero === 'modern_v2') {
    return <ModernV2Arsenal onOpenModal={onOpenModal} />;
  }

  if (activeHero === 'tech_v4') {
    return <TechV4Arsenal isRemix={false} onOpenModal={onOpenModal} />;
  }

  if (activeHero === 'spline1') {
    return <Spline1Arsenal isRemix={false} onOpenModal={onOpenModal} />;
  }

  return null;

}

export default memo(Arsenal);
