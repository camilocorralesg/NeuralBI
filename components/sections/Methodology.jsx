'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuditBlueprintScene } from '../graphics/AuditBlueprintScene';
import { ArchitectBuildScene } from '../graphics/ArchitectBuildScene';
import { DeployScaleScene } from '../graphics/DeployScaleScene';

// ─── SECTION 8: METHODOLOGY (THE DEPLOYMENT PROTOCOL) ───
// Isometric CSS Diagrams for Methodology Phases
// Fully Animated, Style-Specific Isometric SVG/CSS Diagrams for all 15 variants (5 versions * 3 phases)
function MethodologyDiagram({ phase, activeHero }) {
  const colorAccent = '#c6ff34';
  const effectiveHero = activeHero === 'remix' ? (
    phase === 2 ? 'spline1' : (phase === 3 ? 'modern_v2' : 'tech_v4')
  ) : activeHero;

  const animationStyles = `
    @keyframes float-p1 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes float-p2 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes float-p3 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes pulse-ring-slow {
      0% { transform: scale(0.85); opacity: 0.6; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes pulse-node {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.4); opacity: 1; }
    }
    @keyframes rotate-radar {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes brutalist-strobe {
      0%, 100% { opacity: 0.1; }
      48%, 52% { opacity: 0.1; }
      50% { opacity: 1; }
    }
    @keyframes brutalist-slider-1 {
      0%, 100% { transform: scaleY(0.3); }
      50% { transform: scaleY(0.9); }
    }
    @keyframes brutalist-slider-2 {
      0%, 100% { transform: scaleY(0.7); }
      50% { transform: scaleY(0.2); }
    }
    @keyframes brutalist-slider-3 {
      0%, 100% { transform: scaleY(0.4); }
      50% { transform: scaleY(0.95); }
    }
    @keyframes modern-laser {
      0%, 100% { transform: translateY(-20px); opacity: 0; }
      10%, 90% { opacity: 1; }
      50% { transform: translateY(20px); }
    }
    @keyframes modern-bar-1 {
      0%, 100% { height: 25px; }
      50% { height: 70px; }
    }
    @keyframes modern-bar-2 {
      0%, 100% { height: 60px; }
      50% { height: 30px; }
    }
    @keyframes modern-bar-3 {
      0%, 100% { height: 40px; }
      50% { height: 80px; }
    }
    @keyframes tech-dash {
      to { stroke-dashoffset: -20; }
    }
    @keyframes tech-led {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
    @keyframes tech-wave {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes sui-blob-morph {
      0%, 100% { border-radius: 50% 50% 50% 50%; }
      30% { border-radius: 60% 40% 55% 45%; }
      60% { border-radius: 45% 55% 40% 60%; }
    }
    @keyframes sui-bento-assemble {
      0%, 100% { transform: translate(0px, 0px); }
      50% { transform: translate(6px, 6px); }
    }
  `;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{animationStyles}</style>

      {/* ─── NEBULA VERSION (spline1) ─── */}
      {effectiveHero === 'spline1' && phase === 1 && (
        <div style={{ position: 'relative', width: '220px', height: '160px', transform: 'rotateX(60deg) rotateZ(-45deg)', animation: 'float-p1 5s ease-in-out infinite' }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: '25px', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: '50px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%' }} />

          {/* Orbital nodes */}
          <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: colorAccent, boxShadow: `0 0 12px ${colorAccent}`, transform: 'translateX(-50%)', animation: 'pulse-node 2s infinite' }} />
          <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: colorAccent, boxShadow: `0 0 12px ${colorAccent}`, transform: 'translateY(-50%)', animation: 'pulse-node 2s infinite 1s' }} />
        </div>
      )}

      {effectiveHero === 'spline1' && phase === 2 && <ArchitectBuildScene />}

      {effectiveHero === 'spline1' && phase === 3 && (
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -250 1800 1400" preserveAspectRatio="xMidYMid meet" style="background-color: transparent; width: 100%; height: 100%; overflow: hidden;">
  <defs>
    <!-- Paleta y Variables Globales -->
    <style>
      :root {
        --neon: #CCFF00;
        --bg: #030503;
        --fill: rgba(204, 255, 0, 0.08);
      }

      /* Base y Trazado */
      .draw-path {
        fill: transparent;
        stroke: var(--neon);
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        filter: url(#neon-subtle-p3);
      }
      .draw-mask {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        fill: transparent;
      }

      /* Levitación Holográfica */
      .float-1 { animation: float-1 6s ease-in-out infinite; }
      .float-2 { animation: float-2 7s ease-in-out infinite; }
      .float-3 { animation: float-3 5s ease-in-out infinite; }
      @keyframes float-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes float-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes float-3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

      /* =======================================
         LÍNEA DE TIEMPO SECUENCIAL (18 Segundos)
         ======================================= */

      /* 1. NÚCLEO SERVIDOR */
      .anim-server { animation: kf-server 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-server {
        0% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        8.3% { stroke-dashoffset: 0; fill: transparent; }
        11.1%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-server-lights { animation: kf-server-lights 18s infinite; }
      @keyframes kf-server-lights { 0%, 11.0% { opacity: 0; } 11.1%, 94.4% { opacity: 1; } 100% { opacity: 0; } }
      .blink { animation: kf-blink 2s infinite; }
      @keyframes kf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

      /* 2. CONEXIÓN A EQUIPO (TRAIN TEAM) */
      .anim-mask-team { animation: kf-mask-team 18s ease-in-out infinite; }
      @keyframes kf-mask-team { 0%, 8.2% { stroke-dashoffset: 100; } 8.3% { stroke-dashoffset: 100; } 13.8%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-team { animation: fade-in-team 18s infinite; }
      @keyframes fade-in-team { 0%, 13.7% { opacity: 0; } 13.8%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 3. EQUIPO DE ENTRENAMIENTO */
      .anim-team { animation: kf-team 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-team {
        0%, 13.7% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        13.8% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        22.2% { stroke-dashoffset: 0; fill: transparent; }
        25.0%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }

      /* 4. CONEXIÓN A DASHBOARDS */
      .anim-mask-dash { animation: kf-mask-dash 18s ease-in-out infinite; }
      @keyframes kf-mask-dash { 0%, 22.1% { stroke-dashoffset: 100; } 22.2% { stroke-dashoffset: 100; } 27.7%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-dash { animation: fade-in-dash 18s infinite; }
      @keyframes fade-in-dash { 0%, 27.6% { opacity: 0; } 27.7%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 5. DASHBOARDS INTUITIVOS */
      .anim-dash { animation: kf-dash 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-dash {
        0%, 27.6% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        27.7% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        36.1% { stroke-dashoffset: 0; fill: transparent; }
        38.8%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-dash-line { animation: kf-dash-line 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-dash-line {
        0%, 27.6% { stroke-dashoffset: 100; opacity: 0; }
        27.7% { stroke-dashoffset: 100; opacity: 1; }
        36.1%, 94.4% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      /* 6. CONEXIÓN A COPILOT IA */
      .anim-mask-cop { animation: kf-mask-cop 18s ease-in-out infinite; }
      @keyframes kf-mask-cop { 0%, 36.0% { stroke-dashoffset: 100; } 36.1% { stroke-dashoffset: 100; } 41.6%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-cop { animation: fade-in-cop 18s infinite; }
      @keyframes fade-in-cop { 0%, 41.5% { opacity: 0; } 41.6%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 7. COPILOT (NUBE NEURAL) */
      .anim-copilot { animation: kf-copilot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-copilot {
        0%, 41.5% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        41.6% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        50.0% { stroke-dashoffset: 0; fill: transparent; }
        52.7%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-copilot-line { animation: kf-copilot-line 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-copilot-line {
        0%, 41.5% { stroke-dashoffset: 100; opacity: 0; }
        41.6% { stroke-dashoffset: 100; opacity: 1; }
        50.0%, 94.4% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      /* Flujo Constante de Datos */
      .flow-line { stroke-dasharray: 2 3 !important; animation: flow 1s linear infinite; }
      @keyframes flow { to { stroke-dashoffset: -5; } }
    </style>

    <!-- SISTEMA DE FILTROS NEÓN -->
    <filter id="neon-subtle-p3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="neon-p3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur1" />
      <feGaussianBlur stdDeviation="12" result="blur2" />
      <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>

    <!-- MÁSCARAS DE DIBUJO PARA RUTAS HOLOGRÁFICAS -->
    <mask id="mask-team"><path d="M 700 650 L 450 780" class="draw-mask anim-mask-team" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
    <mask id="mask-dash"><path d="M 650 450 L 450 350" class="draw-mask anim-mask-dash" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
    <mask id="mask-cop"><path d="M 900 650 L 1150 780" class="draw-mask anim-mask-cop" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
  </defs>

  <!-- ================= FONDOS Y ATMÓSFERA ================= -->
  <g class="float-3">
    <circle cx="200" cy="200" r="1.5" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="infinite" /></circle>
    <circle cx="900" cy="150" r="2" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="infinite" begin="1s" /></circle>
    <circle cx="1400" cy="800" r="1.5" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="infinite" begin="2s" /></circle>
    <circle cx="100" cy="900" r="2" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.9;0" dur="6s" repeatCount="infinite" begin="0.5s" /></circle>
  </g>

  <!-- ================= RUTAS DE FIBRA ÓPTICA ================= -->
  <path d="M 700 650 L 450 780" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-team)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(450, 780) rotate(153)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-team" filter="url(#neon-p3)"/></g>

  <path d="M 650 450 L 450 350" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-dash)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(450, 350) rotate(206)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-dash" filter="url(#neon-p3)"/></g>

  <path d="M 900 650 L 1150 780" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-cop)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(1150, 780) rotate(27)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-cop" filter="url(#neon-p3)"/></g>


  <!-- ================= 1. NÚCLEO SERVIDOR ================= -->
  <g class="float-1">
    <g transform="translate(800, 450)">
      <g opacity="0.3"><path d="M 0,160 L 120,220 L 0,280 L -120,220 Z" class="draw-path anim-server" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <!-- Hoja 3 (Base) -->
      <g transform="translate(0, 100)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-43.3" cy="87.5" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
        <circle cx="-25" cy="98" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
      </g>
      <!-- Hoja 2 (Media) -->
      <g transform="translate(0, 50)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-43.3" cy="87.5" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
        <circle cx="-61.6" cy="77" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
      </g>
      <!-- Hoja 1 (Cima) -->
      <g transform="translate(0, 0)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-25" cy="98" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
        <circle cx="-61.6" cy="77" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
      </g>
    </g>
  </g>


  <!-- ================= 2. EQUIPO (TRAIN TEAM) ================= -->
  <g class="float-2">
    <g transform="translate(350, 780)">
      <g opacity="0.3"><path d="M 0,20 L 100,70 L 0,120 L -100,70 Z" class="draw-path anim-team" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <!-- Miembro Izquierdo -->
      <g transform="translate(-40, 40)">
        <circle cx="0" cy="0" r="15" class="draw-path anim-team" pathLength="100" />
        <path d="M -25,40 C -25,10 25,10 25,40" class="draw-path anim-team" pathLength="100" />
      </g>
      <!-- Miembro Derecho -->
      <g transform="translate(40, 40)">
        <circle cx="0" cy="0" r="15" class="draw-path anim-team" pathLength="100" />
        <path d="M -25,40 C -25,10 25,10 25,40" class="draw-path anim-team" pathLength="100" />
      </g>
      <!-- Líder IA -->
      <g transform="translate(0, 70)">
        <circle cx="0" cy="0" r="20" class="draw-path anim-team" pathLength="100" stroke-width="3" />
        <path d="M -35,50 C -35,10 35,10 35,50" class="draw-path anim-team" pathLength="100" stroke-width="3" />
      </g>
    </g>
  </g>


  <!-- ================= 3. DASHBOARDS (MATRIZ ISOMÉTRICA) ================= -->
  <g class="float-3">
    <g transform="translate(350, 250)">
      <g opacity="0.3"><path d="M 0,60 L 120,120 L 0,180 L -120,120 Z" class="draw-path anim-dash" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <path d="M -30,105 L 0,120 L -10,130 Z" class="draw-path anim-dash" pathLength="100" />
      
      <!-- Pantalla mapeada proyectada en la cara Izquierda (Mirando hacia abajo a la derecha) -->
      <g transform="translate(-100, 120) matrix(0.866, -0.5, 0, 1, 0, 0)">
        <rect x="0" y="-120" width="160" height="110" rx="8" class="draw-path anim-dash" pathLength="100" stroke-width="4" />
        <rect x="5" y="-115" width="150" height="100" rx="4" class="draw-path anim-dash" pathLength="100" stroke-width="2" style="fill: #010201;" />
        
        <!-- Elementos UI Internos -->
        <rect x="15" y="-105" width="130" height="15" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <circle cx="25" cy="-97.5" r="3" fill="var(--neon)" class="anim-dash-line" />
        <circle cx="40" cy="-97.5" r="3" fill="var(--neon)" class="anim-dash-line" />
        
        <!-- Panel Gráficos -->
        <rect x="15" y="-80" width="70" height="55" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <path d="M 20 -40 Q 35 -70 50 -50 T 80 -60" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
        <circle cx="80" cy="-60" r="3" fill="var(--neon)" class="anim-dash-line" filter="url(#neon-p3)" />
        
        <!-- Panel Analítica -->
        <rect x="95" y="-80" width="50" height="22" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <rect x="95" y="-47" width="50" height="22" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <line x1="105" y1="-69" x2="135" y2="-69" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
        <line x1="105" y1="-36" x2="125" y2="-36" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
      </g>
    </g>
  </g>


  <!-- ================= 4. COPILOT (IA EN LA NUBE) ================= -->
  <g class="float-2">
    <g transform="translate(1250, 750)">
      <g opacity="0.3"><path d="M 0,40 L 120,100 L 0,160 L -120,100 Z" class="draw-path anim-copilot" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      
      <!-- Nube mapeada proyectada en la cara Derecha (Mirando hacia abajo a la izquierda) -->
      <g transform="translate(-80, -45) matrix(0.866, 0.5, 0, 1, 0, 0)">
        <path d="M 40,70 a 25,25 0 0,1 0,-50 a 40,40 0 0,1 80,0 a 25,25 0 0,1 0,50 z" class="draw-path anim-copilot" pathLength="100" stroke-width="4" />
        
        <circle cx="80" cy="45" r="30" class="draw-path anim-copilot-line" pathLength="100" stroke-width="3" style="stroke-dasharray: 5 5;" />
        <circle cx="80" cy="45" r="22" class="draw-path anim-copilot" pathLength="100" stroke-width="2" />
        
        <rect x="65" y="35" width="30" height="20" rx="4" class="draw-path anim-copilot" pathLength="100" stroke-width="2" style="fill: var(--fill);" />
        <circle cx="73" cy="45" r="3" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)"/>
        <circle cx="87" cy="45" r="3" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)"/>
        
        <line x1="80" y1="35" x2="80" y2="18" class="draw-path anim-copilot-line" pathLength="100" stroke-width="2" />
        <circle cx="80" cy="15" r="4" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)" />
      </g>
    </g>
  </g>
</svg>
` }} />
      )}


      {/* ─── CINEMATIC VERSION (cinematic) ─── */}
      {effectiveHero === 'cinematic' && phase === 1 && (
        <div style={{ position: 'relative', width: '200px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Brutalist linear diamond grid */}
          <div style={{
            width: '120px', height: '120px', border: '1px solid #ffffff',
            transform: 'rotateX(60deg) rotateZ(45deg)', position: 'relative'
          }}>
            {/* Blinking corner nodes */}
            <div style={{ position: 'absolute', top: '-5px', left: '-5px', width: '10px', height: '10px', background: colorAccent, animation: 'brutalist-strobe 1s steps(1) infinite' }} />
            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', width: '10px', height: '10px', background: colorAccent, animation: 'brutalist-strobe 1s steps(1) infinite 0.5s' }} />
            <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '10px', height: '10px', background: '#ffffff', animation: 'brutalist-strobe 1.5s steps(1) infinite' }} />
            <div style={{ position: 'absolute', bottom: '-5px', left: '-5px', width: '10px', height: '10px', background: '#ffffff', animation: 'brutalist-strobe 1.5s steps(1) infinite 0.75s' }} />
          </div>
        </div>
      )}

      {effectiveHero === 'cinematic' && phase === 2 && (
        <div style={{ position: 'relative', width: '180px', height: '160px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px' }}>
          {/* Brutalist Rising Cubes */}
          <div style={{ width: '25px', height: '100px', background: '#ffffff', transformOrigin: 'bottom', animation: 'brutalist-slider-1 2s ease-in-out infinite' }} />
          <div style={{ width: '25px', height: '100px', background: colorAccent, transformOrigin: 'bottom', animation: 'brutalist-slider-2 2s ease-in-out infinite' }} />
          <div style={{ width: '25px', height: '100px', background: '#3f3f46', transformOrigin: 'bottom', animation: 'brutalist-slider-3 2s ease-in-out infinite' }} />
        </div>
      )}

      {effectiveHero === 'cinematic' && phase === 3 && (
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1700 -1085 5000 3200" style="background-color: transparent; width: 100%; height: 100%; overflow: hidden;">
  <defs>
    <!-- Paleta y Variables Globales -->
    <style>
      :root {
        --neon: #CCFF00;
        --bg: #030503;
        --fill: rgba(204, 255, 0, 0.08);
      }

      /* Base y Trazado */
      .draw-path {
        fill: transparent;
        stroke: var(--neon);
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        filter: url(#neon-subtle-p3);
      }
      .draw-mask {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        fill: transparent;
      }

      /* Levitación Holográfica */
      .float-1 { animation: float-1 6s ease-in-out infinite; }
      .float-2 { animation: float-2 7s ease-in-out infinite; }
      .float-3 { animation: float-3 5s ease-in-out infinite; }
      @keyframes float-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes float-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes float-3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

      /* =======================================
         LÍNEA DE TIEMPO SECUENCIAL (18 Segundos)
         ======================================= */

      /* 1. NÚCLEO SERVIDOR */
      .anim-server { animation: kf-server 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-server {
        0% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        8.3% { stroke-dashoffset: 0; fill: transparent; }
        11.1%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-server-lights { animation: kf-server-lights 18s infinite; }
      @keyframes kf-server-lights { 0%, 11.0% { opacity: 0; } 11.1%, 94.4% { opacity: 1; } 100% { opacity: 0; } }
      .blink { animation: kf-blink 2s infinite; }
      @keyframes kf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

      /* 2. CONEXIÓN A EQUIPO (TRAIN TEAM) */
      .anim-mask-team { animation: kf-mask-team 18s ease-in-out infinite; }
      @keyframes kf-mask-team { 0%, 8.2% { stroke-dashoffset: 100; } 8.3% { stroke-dashoffset: 100; } 13.8%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-team { animation: fade-in-team 18s infinite; }
      @keyframes fade-in-team { 0%, 13.7% { opacity: 0; } 13.8%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 3. EQUIPO DE ENTRENAMIENTO */
      .anim-team { animation: kf-team 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-team {
        0%, 13.7% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        13.8% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        22.2% { stroke-dashoffset: 0; fill: transparent; }
        25.0%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }

      /* 4. CONEXIÓN A DASHBOARDS */
      .anim-mask-dash { animation: kf-mask-dash 18s ease-in-out infinite; }
      @keyframes kf-mask-dash { 0%, 22.1% { stroke-dashoffset: 100; } 22.2% { stroke-dashoffset: 100; } 27.7%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-dash { animation: fade-in-dash 18s infinite; }
      @keyframes fade-in-dash { 0%, 27.6% { opacity: 0; } 27.7%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 5. DASHBOARDS INTUITIVOS */
      .anim-dash { animation: kf-dash 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-dash {
        0%, 27.6% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        27.7% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        36.1% { stroke-dashoffset: 0; fill: transparent; }
        38.8%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-dash-line { animation: kf-dash-line 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-dash-line {
        0%, 27.6% { stroke-dashoffset: 100; opacity: 0; }
        27.7% { stroke-dashoffset: 100; opacity: 1; }
        36.1%, 94.4% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      /* 6. CONEXIÓN A COPILOT IA */
      .anim-mask-cop { animation: kf-mask-cop 18s ease-in-out infinite; }
      @keyframes kf-mask-cop { 0%, 36.0% { stroke-dashoffset: 100; } 36.1% { stroke-dashoffset: 100; } 41.6%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-cop { animation: fade-in-cop 18s infinite; }
      @keyframes fade-in-cop { 0%, 41.5% { opacity: 0; } 41.6%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 7. COPILOT (NUBE NEURAL) */
      .anim-copilot { animation: kf-copilot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-copilot {
        0%, 41.5% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        41.6% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        50.0% { stroke-dashoffset: 0; fill: transparent; }
        52.7%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-copilot-line { animation: kf-copilot-line 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-copilot-line {
        0%, 41.5% { stroke-dashoffset: 100; opacity: 0; }
        41.6% { stroke-dashoffset: 100; opacity: 1; }
        50.0%, 94.4% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      /* Flujo Constante de Datos */
      .flow-line { stroke-dasharray: 2 3 !important; animation: flow 1s linear infinite; }
      @keyframes flow { to { stroke-dashoffset: -5; } }
    </style>

    <!-- SISTEMA DE FILTROS NEÓN -->
    <filter id="neon-subtle-p3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="neon-p3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur1" />
      <feGaussianBlur stdDeviation="12" result="blur2" />
      <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>

    <!-- MÁSCARAS DE DIBUJO PARA RUTAS HOLOGRÁFICAS -->
    <mask id="mask-team"><path d="M 700 650 L 450 780" class="draw-mask anim-mask-team" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
    <mask id="mask-dash"><path d="M 650 450 L 450 350" class="draw-mask anim-mask-dash" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
    <mask id="mask-cop"><path d="M 900 650 L 1150 780" class="draw-mask anim-mask-cop" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
  </defs>

  <!-- ================= FONDOS Y ATMÓSFERA ================= -->
  <g class="float-3">
    <circle cx="200" cy="200" r="1.5" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="infinite" /></circle>
    <circle cx="900" cy="150" r="2" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="infinite" begin="1s" /></circle>
    <circle cx="1400" cy="800" r="1.5" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="infinite" begin="2s" /></circle>
    <circle cx="100" cy="900" r="2" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.9;0" dur="6s" repeatCount="infinite" begin="0.5s" /></circle>
  </g>

  <!-- ================= RUTAS DE FIBRA ÓPTICA ================= -->
  <path d="M 700 650 L 450 780" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-team)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(450, 780) rotate(153)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-team" filter="url(#neon-p3)"/></g>

  <path d="M 650 450 L 450 350" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-dash)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(450, 350) rotate(206)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-dash" filter="url(#neon-p3)"/></g>

  <path d="M 900 650 L 1150 780" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-cop)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(1150, 780) rotate(27)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-cop" filter="url(#neon-p3)"/></g>


  <!-- ================= 1. NÚCLEO SERVIDOR ================= -->
  <g class="float-1">
    <g transform="translate(800, 450)">
      <g opacity="0.3"><path d="M 0,160 L 120,220 L 0,280 L -120,220 Z" class="draw-path anim-server" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <!-- Hoja 3 (Base) -->
      <g transform="translate(0, 100)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-43.3" cy="87.5" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
        <circle cx="-25" cy="98" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
      </g>
      <!-- Hoja 2 (Media) -->
      <g transform="translate(0, 50)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-43.3" cy="87.5" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
        <circle cx="-61.6" cy="77" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
      </g>
      <!-- Hoja 1 (Cima) -->
      <g transform="translate(0, 0)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-25" cy="98" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
        <circle cx="-61.6" cy="77" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
      </g>
    </g>
  </g>


  <!-- ================= 2. EQUIPO (TRAIN TEAM) ================= -->
  <g class="float-2">
    <g transform="translate(350, 780)">
      <g opacity="0.3"><path d="M 0,20 L 100,70 L 0,120 L -100,70 Z" class="draw-path anim-team" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <!-- Miembro Izquierdo -->
      <g transform="translate(-40, 40)">
        <circle cx="0" cy="0" r="15" class="draw-path anim-team" pathLength="100" />
        <path d="M -25,40 C -25,10 25,10 25,40" class="draw-path anim-team" pathLength="100" />
      </g>
      <!-- Miembro Derecho -->
      <g transform="translate(40, 40)">
        <circle cx="0" cy="0" r="15" class="draw-path anim-team" pathLength="100" />
        <path d="M -25,40 C -25,10 25,10 25,40" class="draw-path anim-team" pathLength="100" />
      </g>
      <!-- Líder IA -->
      <g transform="translate(0, 70)">
        <circle cx="0" cy="0" r="20" class="draw-path anim-team" pathLength="100" stroke-width="3" />
        <path d="M -35,50 C -35,10 35,10 35,50" class="draw-path anim-team" pathLength="100" stroke-width="3" />
      </g>
    </g>
  </g>


  <!-- ================= 3. DASHBOARDS (MATRIZ ISOMÉTRICA) ================= -->
  <g class="float-3">
    <g transform="translate(350, 250)">
      <g opacity="0.3"><path d="M 0,60 L 120,120 L 0,180 L -120,120 Z" class="draw-path anim-dash" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <path d="M -30,105 L 0,120 L -10,130 Z" class="draw-path anim-dash" pathLength="100" />
      
      <!-- Pantalla mapeada proyectada en la cara Izquierda (Mirando hacia abajo a la derecha) -->
      <g transform="translate(-100, 120) matrix(0.866, -0.5, 0, 1, 0, 0)">
        <rect x="0" y="-120" width="160" height="110" rx="8" class="draw-path anim-dash" pathLength="100" stroke-width="4" />
        <rect x="5" y="-115" width="150" height="100" rx="4" class="draw-path anim-dash" pathLength="100" stroke-width="2" style="fill: #010201;" />
        
        <!-- Elementos UI Internos -->
        <rect x="15" y="-105" width="130" height="15" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <circle cx="25" cy="-97.5" r="3" fill="var(--neon)" class="anim-dash-line" />
        <circle cx="40" cy="-97.5" r="3" fill="var(--neon)" class="anim-dash-line" />
        
        <!-- Panel Gráficos -->
        <rect x="15" y="-80" width="70" height="55" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <path d="M 20 -40 Q 35 -70 50 -50 T 80 -60" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
        <circle cx="80" cy="-60" r="3" fill="var(--neon)" class="anim-dash-line" filter="url(#neon-p3)" />
        
        <!-- Panel Analítica -->
        <rect x="95" y="-80" width="50" height="22" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <rect x="95" y="-47" width="50" height="22" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <line x1="105" y1="-69" x2="135" y2="-69" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
        <line x1="105" y1="-36" x2="125" y2="-36" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
      </g>
    </g>
  </g>


  <!-- ================= 4. COPILOT (IA EN LA NUBE) ================= -->
  <g class="float-2">
    <g transform="translate(1250, 750)">
      <g opacity="0.3"><path d="M 0,40 L 120,100 L 0,160 L -120,100 Z" class="draw-path anim-copilot" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      
      <!-- Nube mapeada proyectada en la cara Derecha (Mirando hacia abajo a la izquierda) -->
      <g transform="translate(-80, -45) matrix(0.866, 0.5, 0, 1, 0, 0)">
        <path d="M 40,70 a 25,25 0 0,1 0,-50 a 40,40 0 0,1 80,0 a 25,25 0 0,1 0,50 z" class="draw-path anim-copilot" pathLength="100" stroke-width="4" />
        
        <circle cx="80" cy="45" r="30" class="draw-path anim-copilot-line" pathLength="100" stroke-width="3" style="stroke-dasharray: 5 5;" />
        <circle cx="80" cy="45" r="22" class="draw-path anim-copilot" pathLength="100" stroke-width="2" />
        
        <rect x="65" y="35" width="30" height="20" rx="4" class="draw-path anim-copilot" pathLength="100" stroke-width="2" style="fill: var(--fill);" />
        <circle cx="73" cy="45" r="3" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)"/>
        <circle cx="87" cy="45" r="3" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)"/>
        
        <line x1="80" y1="35" x2="80" y2="18" class="draw-path anim-copilot-line" pathLength="100" stroke-width="2" />
        <circle cx="80" cy="15" r="4" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)" />
      </g>
    </g>
  </g>
</svg>
` }} />
      )}


      {/* ─── MODERN V2 VERSION (modern_v2) ─── */}
      {effectiveHero === 'modern_v2' && phase === 1 && (
        <div style={{ position: 'relative', width: '240px', height: '180px' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Draw pathways */}
            <path id="p1_track" d="M 40,90 Q 120,40 200,90 Q 120,140 40,90 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

            {/* Connecting lines */}
            <line x1="40" y1="90" x2="120" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="200" y1="90" x2="120" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Nodes */}
            <circle cx="40" cy="90" r="6" fill="#c6ff34" />
            <circle cx="200" cy="90" r="6" fill="#c6ff34" />
            <circle cx="120" cy="90" r="8" fill="#ffffff" />

            {/* Traversing packet */}
            <circle r="4" fill="#ffffff">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 40,90 Q 120,40 200,90 Q 120,140 40,90 Z" />
            </circle>
          </svg>
        </div>
      )}

      {effectiveHero === 'modern_v2' && phase === 2 && (
        <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Sliding Glass Card Stacks */}
          <div style={{
            position: 'absolute', width: '120px', height: '100px',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
            background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(5px)',
            transform: 'rotateX(55deg) rotateY(-15deg)',
            animation: 'float-p1 4s ease-in-out infinite'
          }} />

          {/* Inner rotating gear element */}
          <div style={{
            position: 'absolute', width: '60px', height: '60px',
            border: `2px dashed ${colorAccent}`, borderRadius: '50%',
            transform: 'rotateX(55deg) rotateY(-15deg)',
            animation: 'rotate-radar 8s linear infinite',
            boxShadow: `0 0 15px rgba(198,255,52,0.1)`
          }} />

          <div style={{
            position: 'absolute', width: '120px', height: '100px',
            border: `1px solid ${colorAccent}`, borderRadius: '16px',
            background: 'rgba(198, 255, 52, 0.03)', backdropFilter: 'blur(5px)',
            transform: 'rotateX(55deg) rotateY(-15deg) translateZ(40px)',
            animation: 'float-p2 4s ease-in-out infinite'
          }} />
        </div>
      )}

      {effectiveHero === 'modern_v2' && phase === 3 && <DeployScaleScene />}

      {/* ─── TECH V4 VERSION (tech_v4) ─── */}
      {effectiveHero === 'tech_v4' && phase === 1 && <AuditBlueprintScene />}

      {effectiveHero === 'tech_v4' && phase === 2 && (
        <div style={{ position: 'relative', width: '220px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Mainframe rack console with blinking LEDs */}
          <div style={{ width: '140px', height: '120px', border: '1px solid rgba(255,255,255,0.1)', background: '#09090b', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.3)' }}>SYS_UNIT_02</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: colorAccent, animation: 'tech-led 1s infinite' }}>ONLINE</span>
            </div>

            {/* Blinking LED Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: i % 4 === 0 ? colorAccent : '#27272a',
                  boxShadow: i % 4 === 0 ? `0 0 6px ${colorAccent}` : 'none',
                  animation: i % 3 === 0 ? 'tech-led 0.6s infinite' : i % 5 === 0 ? 'tech-led 1.2s infinite 0.4s' : 'none'
                }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {effectiveHero === 'tech_v4' && phase === 3 && (
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1700 -1085 5000 3200" style="background-color: transparent; width: 100%; height: 100%; overflow: hidden;">
  <defs>
    <!-- Paleta y Variables Globales -->
    <style>
      :root {
        --neon: #CCFF00;
        --bg: #030503;
        --fill: rgba(204, 255, 0, 0.08);
      }

      /* Base y Trazado */
      .draw-path {
        fill: transparent;
        stroke: var(--neon);
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        filter: url(#neon-subtle-p3);
      }
      .draw-mask {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        fill: transparent;
      }

      /* Levitación Holográfica */
      .float-1 { animation: float-1 6s ease-in-out infinite; }
      .float-2 { animation: float-2 7s ease-in-out infinite; }
      .float-3 { animation: float-3 5s ease-in-out infinite; }
      @keyframes float-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes float-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes float-3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

      /* =======================================
         LÍNEA DE TIEMPO SECUENCIAL (18 Segundos)
         ======================================= */

      /* 1. NÚCLEO SERVIDOR */
      .anim-server { animation: kf-server 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-server {
        0% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        8.3% { stroke-dashoffset: 0; fill: transparent; }
        11.1%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-server-lights { animation: kf-server-lights 18s infinite; }
      @keyframes kf-server-lights { 0%, 11.0% { opacity: 0; } 11.1%, 94.4% { opacity: 1; } 100% { opacity: 0; } }
      .blink { animation: kf-blink 2s infinite; }
      @keyframes kf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

      /* 2. CONEXIÓN A EQUIPO (TRAIN TEAM) */
      .anim-mask-team { animation: kf-mask-team 18s ease-in-out infinite; }
      @keyframes kf-mask-team { 0%, 8.2% { stroke-dashoffset: 100; } 8.3% { stroke-dashoffset: 100; } 13.8%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-team { animation: fade-in-team 18s infinite; }
      @keyframes fade-in-team { 0%, 13.7% { opacity: 0; } 13.8%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 3. EQUIPO DE ENTRENAMIENTO */
      .anim-team { animation: kf-team 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-team {
        0%, 13.7% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        13.8% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        22.2% { stroke-dashoffset: 0; fill: transparent; }
        25.0%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }

      /* 4. CONEXIÓN A DASHBOARDS */
      .anim-mask-dash { animation: kf-mask-dash 18s ease-in-out infinite; }
      @keyframes kf-mask-dash { 0%, 22.1% { stroke-dashoffset: 100; } 22.2% { stroke-dashoffset: 100; } 27.7%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-dash { animation: fade-in-dash 18s infinite; }
      @keyframes fade-in-dash { 0%, 27.6% { opacity: 0; } 27.7%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 5. DASHBOARDS INTUITIVOS */
      .anim-dash { animation: kf-dash 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-dash {
        0%, 27.6% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        27.7% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        36.1% { stroke-dashoffset: 0; fill: transparent; }
        38.8%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-dash-line { animation: kf-dash-line 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-dash-line {
        0%, 27.6% { stroke-dashoffset: 100; opacity: 0; }
        27.7% { stroke-dashoffset: 100; opacity: 1; }
        36.1%, 94.4% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      /* 6. CONEXIÓN A COPILOT IA */
      .anim-mask-cop { animation: kf-mask-cop 18s ease-in-out infinite; }
      @keyframes kf-mask-cop { 0%, 36.0% { stroke-dashoffset: 100; } 36.1% { stroke-dashoffset: 100; } 41.6%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-cop { animation: fade-in-cop 18s infinite; }
      @keyframes fade-in-cop { 0%, 41.5% { opacity: 0; } 41.6%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 7. COPILOT (NUBE NEURAL) */
      .anim-copilot { animation: kf-copilot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-copilot {
        0%, 41.5% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        41.6% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        50.0% { stroke-dashoffset: 0; fill: transparent; }
        52.7%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-copilot-line { animation: kf-copilot-line 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-copilot-line {
        0%, 41.5% { stroke-dashoffset: 100; opacity: 0; }
        41.6% { stroke-dashoffset: 100; opacity: 1; }
        50.0%, 94.4% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      /* Flujo Constante de Datos */
      .flow-line { stroke-dasharray: 2 3 !important; animation: flow 1s linear infinite; }
      @keyframes flow { to { stroke-dashoffset: -5; } }
    </style>

    <!-- SISTEMA DE FILTROS NEÓN -->
    <filter id="neon-subtle-p3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="neon-p3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur1" />
      <feGaussianBlur stdDeviation="12" result="blur2" />
      <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>

    <!-- MÁSCARAS DE DIBUJO PARA RUTAS HOLOGRÁFICAS -->
    <mask id="mask-team"><path d="M 700 650 L 450 780" class="draw-mask anim-mask-team" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
    <mask id="mask-dash"><path d="M 650 450 L 450 350" class="draw-mask anim-mask-dash" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
    <mask id="mask-cop"><path d="M 900 650 L 1150 780" class="draw-mask anim-mask-cop" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
  </defs>

  <!-- ================= FONDOS Y ATMÓSFERA ================= -->
  <g class="float-3">
    <circle cx="200" cy="200" r="1.5" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="infinite" /></circle>
    <circle cx="900" cy="150" r="2" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="infinite" begin="1s" /></circle>
    <circle cx="1400" cy="800" r="1.5" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="infinite" begin="2s" /></circle>
    <circle cx="100" cy="900" r="2" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.9;0" dur="6s" repeatCount="infinite" begin="0.5s" /></circle>
  </g>

  <!-- ================= RUTAS DE FIBRA ÓPTICA ================= -->
  <path d="M 700 650 L 450 780" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-team)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(450, 780) rotate(153)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-team" filter="url(#neon-p3)"/></g>

  <path d="M 650 450 L 450 350" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-dash)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(450, 350) rotate(206)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-dash" filter="url(#neon-p3)"/></g>

  <path d="M 900 650 L 1150 780" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-cop)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(1150, 780) rotate(27)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-cop" filter="url(#neon-p3)"/></g>


  <!-- ================= 1. NÚCLEO SERVIDOR ================= -->
  <g class="float-1">
    <g transform="translate(800, 450)">
      <g opacity="0.3"><path d="M 0,160 L 120,220 L 0,280 L -120,220 Z" class="draw-path anim-server" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <!-- Hoja 3 (Base) -->
      <g transform="translate(0, 100)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-43.3" cy="87.5" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
        <circle cx="-25" cy="98" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
      </g>
      <!-- Hoja 2 (Media) -->
      <g transform="translate(0, 50)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-43.3" cy="87.5" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
        <circle cx="-61.6" cy="77" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
      </g>
      <!-- Hoja 1 (Cima) -->
      <g transform="translate(0, 0)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-25" cy="98" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
        <circle cx="-61.6" cy="77" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
      </g>
    </g>
  </g>


  <!-- ================= 2. EQUIPO (TRAIN TEAM) ================= -->
  <g class="float-2">
    <g transform="translate(350, 780)">
      <g opacity="0.3"><path d="M 0,20 L 100,70 L 0,120 L -100,70 Z" class="draw-path anim-team" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <!-- Miembro Izquierdo -->
      <g transform="translate(-40, 40)">
        <circle cx="0" cy="0" r="15" class="draw-path anim-team" pathLength="100" />
        <path d="M -25,40 C -25,10 25,10 25,40" class="draw-path anim-team" pathLength="100" />
      </g>
      <!-- Miembro Derecho -->
      <g transform="translate(40, 40)">
        <circle cx="0" cy="0" r="15" class="draw-path anim-team" pathLength="100" />
        <path d="M -25,40 C -25,10 25,10 25,40" class="draw-path anim-team" pathLength="100" />
      </g>
      <!-- Líder IA -->
      <g transform="translate(0, 70)">
        <circle cx="0" cy="0" r="20" class="draw-path anim-team" pathLength="100" stroke-width="3" />
        <path d="M -35,50 C -35,10 35,10 35,50" class="draw-path anim-team" pathLength="100" stroke-width="3" />
      </g>
    </g>
  </g>


  <!-- ================= 3. DASHBOARDS (MATRIZ ISOMÉTRICA) ================= -->
  <g class="float-3">
    <g transform="translate(350, 250)">
      <g opacity="0.3"><path d="M 0,60 L 120,120 L 0,180 L -120,120 Z" class="draw-path anim-dash" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <path d="M -30,105 L 0,120 L -10,130 Z" class="draw-path anim-dash" pathLength="100" />
      
      <!-- Pantalla mapeada proyectada en la cara Izquierda (Mirando hacia abajo a la derecha) -->
      <g transform="translate(-100, 120) matrix(0.866, -0.5, 0, 1, 0, 0)">
        <rect x="0" y="-120" width="160" height="110" rx="8" class="draw-path anim-dash" pathLength="100" stroke-width="4" />
        <rect x="5" y="-115" width="150" height="100" rx="4" class="draw-path anim-dash" pathLength="100" stroke-width="2" style="fill: #010201;" />
        
        <!-- Elementos UI Internos -->
        <rect x="15" y="-105" width="130" height="15" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <circle cx="25" cy="-97.5" r="3" fill="var(--neon)" class="anim-dash-line" />
        <circle cx="40" cy="-97.5" r="3" fill="var(--neon)" class="anim-dash-line" />
        
        <!-- Panel Gráficos -->
        <rect x="15" y="-80" width="70" height="55" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <path d="M 20 -40 Q 35 -70 50 -50 T 80 -60" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
        <circle cx="80" cy="-60" r="3" fill="var(--neon)" class="anim-dash-line" filter="url(#neon-p3)" />
        
        <!-- Panel Analítica -->
        <rect x="95" y="-80" width="50" height="22" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <rect x="95" y="-47" width="50" height="22" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <line x1="105" y1="-69" x2="135" y2="-69" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
        <line x1="105" y1="-36" x2="125" y2="-36" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
      </g>
    </g>
  </g>


  <!-- ================= 4. COPILOT (IA EN LA NUBE) ================= -->
  <g class="float-2">
    <g transform="translate(1250, 750)">
      <g opacity="0.3"><path d="M 0,40 L 120,100 L 0,160 L -120,100 Z" class="draw-path anim-copilot" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      
      <!-- Nube mapeada proyectada en la cara Derecha (Mirando hacia abajo a la izquierda) -->
      <g transform="translate(-80, -45) matrix(0.866, 0.5, 0, 1, 0, 0)">
        <path d="M 40,70 a 25,25 0 0,1 0,-50 a 40,40 0 0,1 80,0 a 25,25 0 0,1 0,50 z" class="draw-path anim-copilot" pathLength="100" stroke-width="4" />
        
        <circle cx="80" cy="45" r="30" class="draw-path anim-copilot-line" pathLength="100" stroke-width="3" style="stroke-dasharray: 5 5;" />
        <circle cx="80" cy="45" r="22" class="draw-path anim-copilot" pathLength="100" stroke-width="2" />
        
        <rect x="65" y="35" width="30" height="20" rx="4" class="draw-path anim-copilot" pathLength="100" stroke-width="2" style="fill: var(--fill);" />
        <circle cx="73" cy="45" r="3" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)"/>
        <circle cx="87" cy="45" r="3" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)"/>
        
        <line x1="80" y1="35" x2="80" y2="18" class="draw-path anim-copilot-line" pathLength="100" stroke-width="2" />
        <circle cx="80" cy="15" r="4" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)" />
      </g>
    </g>
  </g>
</svg>
` }} />
      )}


      {/* ─── SUI FORK VERSION (sui_fork) ─── */}
      {effectiveHero === 'sui_fork' && phase === 1 && (
        <div style={{ position: 'relative', width: '220px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Organic Morphing Liquid Blob */}
          <div style={{
            width: '100px', height: '100px', background: 'rgba(198,255,52,0.06)',
            border: `1px solid ${colorAccent}`, boxShadow: `0 0 35px rgba(198,255,52,0.15)`,
            animation: 'sui-blob-morph 4s ease-in-out infinite, float-p1 5s ease-in-out infinite',
            position: 'relative'
          }}>
            {/* Orbiting particles */}
            <div style={{ position: 'absolute', top: '20px', left: '10px', width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff' }} />
            <div style={{ position: 'absolute', bottom: '20px', right: '15px', width: '6px', height: '6px', borderRadius: '50%', background: colorAccent, boxShadow: `0 0 6px ${colorAccent}` }} />
          </div>
        </div>
      )}

      {effectiveHero === 'sui_fork' && phase === 2 && (
        <div style={{ position: 'relative', width: '200px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Assembling Bento Cards Illustration */}
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.01)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '45px', height: '45px',
              border: `1px solid ${colorAccent}`, borderRadius: '12px',
              background: 'rgba(198, 255, 52, 0.02)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 0.5s'
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.01)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 1.5s'
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 1s'
            }} />
          </div>
        </div>
      )}

      {effectiveHero === 'sui_fork' && phase === 3 && (
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1700 -1085 5000 3200" style="background-color: transparent; width: 100%; height: 100%; overflow: hidden;">
  <defs>
    <!-- Paleta y Variables Globales -->
    <style>
      :root {
        --neon: #CCFF00;
        --bg: #030503;
        --fill: rgba(204, 255, 0, 0.08);
      }

      /* Base y Trazado */
      .draw-path {
        fill: transparent;
        stroke: var(--neon);
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        filter: url(#neon-subtle-p3);
      }
      .draw-mask {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        fill: transparent;
      }

      /* Levitación Holográfica */
      .float-1 { animation: float-1 6s ease-in-out infinite; }
      .float-2 { animation: float-2 7s ease-in-out infinite; }
      .float-3 { animation: float-3 5s ease-in-out infinite; }
      @keyframes float-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes float-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes float-3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

      /* =======================================
         LÍNEA DE TIEMPO SECUENCIAL (18 Segundos)
         ======================================= */

      /* 1. NÚCLEO SERVIDOR */
      .anim-server { animation: kf-server 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-server {
        0% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        8.3% { stroke-dashoffset: 0; fill: transparent; }
        11.1%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-server-lights { animation: kf-server-lights 18s infinite; }
      @keyframes kf-server-lights { 0%, 11.0% { opacity: 0; } 11.1%, 94.4% { opacity: 1; } 100% { opacity: 0; } }
      .blink { animation: kf-blink 2s infinite; }
      @keyframes kf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

      /* 2. CONEXIÓN A EQUIPO (TRAIN TEAM) */
      .anim-mask-team { animation: kf-mask-team 18s ease-in-out infinite; }
      @keyframes kf-mask-team { 0%, 8.2% { stroke-dashoffset: 100; } 8.3% { stroke-dashoffset: 100; } 13.8%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-team { animation: fade-in-team 18s infinite; }
      @keyframes fade-in-team { 0%, 13.7% { opacity: 0; } 13.8%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 3. EQUIPO DE ENTRENAMIENTO */
      .anim-team { animation: kf-team 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-team {
        0%, 13.7% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        13.8% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        22.2% { stroke-dashoffset: 0; fill: transparent; }
        25.0%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }

      /* 4. CONEXIÓN A DASHBOARDS */
      .anim-mask-dash { animation: kf-mask-dash 18s ease-in-out infinite; }
      @keyframes kf-mask-dash { 0%, 22.1% { stroke-dashoffset: 100; } 22.2% { stroke-dashoffset: 100; } 27.7%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-dash { animation: fade-in-dash 18s infinite; }
      @keyframes fade-in-dash { 0%, 27.6% { opacity: 0; } 27.7%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 5. DASHBOARDS INTUITIVOS */
      .anim-dash { animation: kf-dash 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-dash {
        0%, 27.6% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        27.7% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        36.1% { stroke-dashoffset: 0; fill: transparent; }
        38.8%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-dash-line { animation: kf-dash-line 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-dash-line {
        0%, 27.6% { stroke-dashoffset: 100; opacity: 0; }
        27.7% { stroke-dashoffset: 100; opacity: 1; }
        36.1%, 94.4% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      /* 6. CONEXIÓN A COPILOT IA */
      .anim-mask-cop { animation: kf-mask-cop 18s ease-in-out infinite; }
      @keyframes kf-mask-cop { 0%, 36.0% { stroke-dashoffset: 100; } 36.1% { stroke-dashoffset: 100; } 41.6%, 100% { stroke-dashoffset: 0; } }
      .anim-arrow-cop { animation: fade-in-cop 18s infinite; }
      @keyframes fade-in-cop { 0%, 41.5% { opacity: 0; } 41.6%, 94.4% { opacity: 1; } 100% { opacity: 0; } }

      /* 7. COPILOT (NUBE NEURAL) */
      .anim-copilot { animation: kf-copilot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-copilot {
        0%, 41.5% { stroke-dashoffset: 100; fill: transparent; opacity: 0; }
        41.6% { stroke-dashoffset: 100; fill: transparent; opacity: 1; }
        50.0% { stroke-dashoffset: 0; fill: transparent; }
        52.7%, 94.4% { stroke-dashoffset: 0; fill: var(--fill); opacity: 1; }
        100% { stroke-dashoffset: 0; fill: var(--fill); opacity: 0; }
      }
      .anim-copilot-line { animation: kf-copilot-line 18s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes kf-copilot-line {
        0%, 41.5% { stroke-dashoffset: 100; opacity: 0; }
        41.6% { stroke-dashoffset: 100; opacity: 1; }
        50.0%, 94.4% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      /* Flujo Constante de Datos */
      .flow-line { stroke-dasharray: 2 3 !important; animation: flow 1s linear infinite; }
      @keyframes flow { to { stroke-dashoffset: -5; } }
    </style>

    <!-- SISTEMA DE FILTROS NEÓN -->
    <filter id="neon-subtle-p3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="neon-p3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur1" />
      <feGaussianBlur stdDeviation="12" result="blur2" />
      <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>

    <!-- MÁSCARAS DE DIBUJO PARA RUTAS HOLOGRÁFICAS -->
    <mask id="mask-team"><path d="M 700 650 L 450 780" class="draw-mask anim-mask-team" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
    <mask id="mask-dash"><path d="M 650 450 L 450 350" class="draw-mask anim-mask-dash" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
    <mask id="mask-cop"><path d="M 900 650 L 1150 780" class="draw-mask anim-mask-cop" pathLength="100" stroke="#fff" stroke-width="15" /></mask>
  </defs>

  <!-- ================= FONDOS Y ATMÓSFERA ================= -->
  <g class="float-3">
    <circle cx="200" cy="200" r="1.5" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="infinite" /></circle>
    <circle cx="900" cy="150" r="2" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="infinite" begin="1s" /></circle>
    <circle cx="1400" cy="800" r="1.5" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="infinite" begin="2s" /></circle>
    <circle cx="100" cy="900" r="2" fill="var(--neon)" filter="url(#neon-p3)" opacity="0"><animate attributeName="opacity" values="0;0.9;0" dur="6s" repeatCount="infinite" begin="0.5s" /></circle>
  </g>

  <!-- ================= RUTAS DE FIBRA ÓPTICA ================= -->
  <path d="M 700 650 L 450 780" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-team)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(450, 780) rotate(153)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-team" filter="url(#neon-p3)"/></g>

  <path d="M 650 450 L 450 350" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-dash)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(450, 350) rotate(206)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-dash" filter="url(#neon-p3)"/></g>

  <path d="M 900 650 L 1150 780" stroke="var(--neon)" stroke-width="2.5" pathLength="100" mask="url(#mask-cop)" class="flow-line" filter="url(#neon-p3)" />
  <g transform="translate(1150, 780) rotate(27)"><path d="M -10 -8 L 5 0 L -10 8 Z" fill="var(--neon)" class="anim-arrow-cop" filter="url(#neon-p3)"/></g>


  <!-- ================= 1. NÚCLEO SERVIDOR ================= -->
  <g class="float-1">
    <g transform="translate(800, 450)">
      <g opacity="0.3"><path d="M 0,160 L 120,220 L 0,280 L -120,220 Z" class="draw-path anim-server" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <!-- Hoja 3 (Base) -->
      <g transform="translate(0, 100)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-43.3" cy="87.5" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
        <circle cx="-25" cy="98" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
      </g>
      <!-- Hoja 2 (Media) -->
      <g transform="translate(0, 50)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-43.3" cy="87.5" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
        <circle cx="-61.6" cy="77" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
      </g>
      <!-- Hoja 1 (Cima) -->
      <g transform="translate(0, 0)">
        <path d="M 0,0 L 86.6,50 L 0,100 L -86.6,50 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M 86.6,50 L 0,100 L 0,125 L 86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <path d="M -86.6,50 L 0,100 L 0,125 L -86.6,75 Z" class="draw-path anim-server" pathLength="100" />
        <circle cx="-25" cy="98" r="4" fill="var(--neon)" class="anim-server-lights blink" filter="url(#neon-p3)"/>
        <circle cx="-61.6" cy="77" r="4" fill="var(--neon)" class="anim-server-lights" filter="url(#neon-p3)"/>
      </g>
    </g>
  </g>


  <!-- ================= 2. EQUIPO (TRAIN TEAM) ================= -->
  <g class="float-2">
    <g transform="translate(350, 780)">
      <g opacity="0.3"><path d="M 0,20 L 100,70 L 0,120 L -100,70 Z" class="draw-path anim-team" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <!-- Miembro Izquierdo -->
      <g transform="translate(-40, 40)">
        <circle cx="0" cy="0" r="15" class="draw-path anim-team" pathLength="100" />
        <path d="M -25,40 C -25,10 25,10 25,40" class="draw-path anim-team" pathLength="100" />
      </g>
      <!-- Miembro Derecho -->
      <g transform="translate(40, 40)">
        <circle cx="0" cy="0" r="15" class="draw-path anim-team" pathLength="100" />
        <path d="M -25,40 C -25,10 25,10 25,40" class="draw-path anim-team" pathLength="100" />
      </g>
      <!-- Líder IA -->
      <g transform="translate(0, 70)">
        <circle cx="0" cy="0" r="20" class="draw-path anim-team" pathLength="100" stroke-width="3" />
        <path d="M -35,50 C -35,10 35,10 35,50" class="draw-path anim-team" pathLength="100" stroke-width="3" />
      </g>
    </g>
  </g>


  <!-- ================= 3. DASHBOARDS (MATRIZ ISOMÉTRICA) ================= -->
  <g class="float-3">
    <g transform="translate(350, 250)">
      <g opacity="0.3"><path d="M 0,60 L 120,120 L 0,180 L -120,120 Z" class="draw-path anim-dash" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      <path d="M -30,105 L 0,120 L -10,130 Z" class="draw-path anim-dash" pathLength="100" />
      
      <!-- Pantalla mapeada proyectada en la cara Izquierda (Mirando hacia abajo a la derecha) -->
      <g transform="translate(-100, 120) matrix(0.866, -0.5, 0, 1, 0, 0)">
        <rect x="0" y="-120" width="160" height="110" rx="8" class="draw-path anim-dash" pathLength="100" stroke-width="4" />
        <rect x="5" y="-115" width="150" height="100" rx="4" class="draw-path anim-dash" pathLength="100" stroke-width="2" style="fill: #010201;" />
        
        <!-- Elementos UI Internos -->
        <rect x="15" y="-105" width="130" height="15" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <circle cx="25" cy="-97.5" r="3" fill="var(--neon)" class="anim-dash-line" />
        <circle cx="40" cy="-97.5" r="3" fill="var(--neon)" class="anim-dash-line" />
        
        <!-- Panel Gráficos -->
        <rect x="15" y="-80" width="70" height="55" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <path d="M 20 -40 Q 35 -70 50 -50 T 80 -60" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
        <circle cx="80" cy="-60" r="3" fill="var(--neon)" class="anim-dash-line" filter="url(#neon-p3)" />
        
        <!-- Panel Analítica -->
        <rect x="95" y="-80" width="50" height="22" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <rect x="95" y="-47" width="50" height="22" rx="3" class="draw-path anim-dash-line" pathLength="100" style="fill: var(--fill);" />
        <line x1="105" y1="-69" x2="135" y2="-69" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
        <line x1="105" y1="-36" x2="125" y2="-36" class="draw-path anim-dash-line" pathLength="100" stroke-width="2" />
      </g>
    </g>
  </g>


  <!-- ================= 4. COPILOT (IA EN LA NUBE) ================= -->
  <g class="float-2">
    <g transform="translate(1250, 750)">
      <g opacity="0.3"><path d="M 0,40 L 120,100 L 0,160 L -120,100 Z" class="draw-path anim-copilot" pathLength="100" style="fill: none; stroke-dasharray: 10 10;" /></g>
      
      <!-- Nube mapeada proyectada en la cara Derecha (Mirando hacia abajo a la izquierda) -->
      <g transform="translate(-80, -45) matrix(0.866, 0.5, 0, 1, 0, 0)">
        <path d="M 40,70 a 25,25 0 0,1 0,-50 a 40,40 0 0,1 80,0 a 25,25 0 0,1 0,50 z" class="draw-path anim-copilot" pathLength="100" stroke-width="4" />
        
        <circle cx="80" cy="45" r="30" class="draw-path anim-copilot-line" pathLength="100" stroke-width="3" style="stroke-dasharray: 5 5;" />
        <circle cx="80" cy="45" r="22" class="draw-path anim-copilot" pathLength="100" stroke-width="2" />
        
        <rect x="65" y="35" width="30" height="20" rx="4" class="draw-path anim-copilot" pathLength="100" stroke-width="2" style="fill: var(--fill);" />
        <circle cx="73" cy="45" r="3" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)"/>
        <circle cx="87" cy="45" r="3" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)"/>
        
        <line x1="80" y1="35" x2="80" y2="18" class="draw-path anim-copilot-line" pathLength="100" stroke-width="2" />
        <circle cx="80" cy="15" r="4" fill="var(--neon)" class="anim-copilot-line" filter="url(#neon-p3)" />
      </g>
    </g>
  </g>
</svg>
` }} />
      )}
    </div>
  );
}

function MethodologyDiagramStub({ phase, activeHero }) {
  return <MethodologyDiagram phase={phase} activeHero={activeHero} />;
}


// ─── SECTION 8: METHODOLOGY (THE DEPLOYMENT PROTOCOL) ───
function Methodology({ activeHero }) {
  const [activePhase, setActivePhase] = useState(0);
  const phases = [
    {
      num: "01",
      title: "Audit & Blueprint",
      desc: "We inspect your database schemas, tenant governance, and reporting bottlenecks. You receive a clear, fixed-scope engineering blueprint with zero technical fluff."
    },
    {
      num: "02",
      title: "Architect & Build",
      desc: "We construct the semantic layer, clean datasets, and build custom Power Apps tailored to your exact operational reality."
    },
    {
      num: "03",
      title: "Deploy & Scale",
      desc: "We deploy to production, train your team hands-on, and activate AI copilots with strict tenant boundaries. Measurable business impact on Day 1."
    }
  ];

  const colorAccent = '#c6ff34';
  const isRemix = activeHero === 'remix';
  const displayHero = isRemix ? 'tech_v4' : activeHero;

  if (displayHero === 'spline1') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, color: '#ffffff', marginBottom: '1.5rem' }}>
              The Neural Protocol.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.08)' }}>
            {phases.map((p, index) => {
              const isEven = index % 2 === 0;
              const textBlock = (
                <div style={{ flex: 1, padding: '3.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    Phase {p.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: '#ffffff', marginBottom: '1.2rem', fontWeight: 400 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '1.1rem' }}>
                    {p.desc}
                  </p>
                </div>
              );

              const diagramBlock = (
                <div style={{
                  flex: 1,
                  borderLeft: isEven ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  borderRight: !isEven ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: 'center',
                  position: 'relative',
                  minHeight: '260px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>
                    FIG_0{p.num} // NEURAL_PROT_SPEC
                  </div>
                  <MethodologyDiagram phase={index + 1} activeHero={activeHero} />
                </div>
              );

              return (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  borderBottom: index < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                }}>
                  {textBlock}
                  {diagramBlock}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'cinematic') {
    return (
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', marginBottom: '6rem', alignItems: 'end' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: 'uppercase' }}>
                The Neural Protocol.
              </h2>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '550px' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid rgba(255,255,255,0.08)' }}>
            {phases.map((p, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                borderRight: index < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none'
              }}>
                {/* Diagram Cell */}
                <div style={{
                  padding: '3rem 2rem',
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>
                    FIG_0{p.num} // CORE_NODE
                  </div>
                  <MethodologyDiagram phase={index + 1} activeHero={activeHero} />
                </div>
                {/* Text Content Cell */}
                <div style={{ padding: '3rem 2rem', flex: 1, background: '#000000', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent, fontWeight: 700 }}>
                    PHASE {p.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', color: '#71717a', lineHeight: 1.6, fontSize: '1rem' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'modern_v2') {

    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem' }}>
              The Neural Protocol.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
            {/* Step Selection Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {phases.map((p, index) => {
                const isActive = activePhase === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActivePhase(index)}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '1.5rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 8px 30px rgba(198, 255, 52, 0.04)' : 'none'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isActive ? '#c6ff34' : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#000000' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s'
                    }}>
                      {p.num}
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                      transition: 'all 0.3s'
                    }}>
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Display Console Grid */}
            <div style={{
              background: 'rgba(255,255,255,0.01)',
              backdropFilter: 'blur(45px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '24px',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }} className="sui-card-hover">
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '250px', height: '250px', background: '#c6ff34', filter: 'blur(130px)', opacity: 0.06, pointerEvents: 'none' }} />

              <div key={activePhase} className="animate-blur-reveal" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Console Illustration Box */}
                <div style={{
                  height: '240px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>
                    FIG_0{phases[activePhase].num} // ACTIVE_RENDER
                  </div>
                  <MethodologyDiagram phase={activePhase + 1} activeHero={activeHero} />
                </div>

                {/* Console Metadata Text */}
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#c6ff34', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Protocol Stage {phases[activePhase].num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    {phases[activePhase].title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                    {phases[activePhase].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (displayHero === 'tech_v4') {
    return (
      <section style={{ padding: '9rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="protocol-bento-grid">
            {/* Crosshair markers */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', transform: 'translate(-50%, -50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', transform: 'translate(50%, -50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '10px', height: '10px', transform: 'translate(-50%, 50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', transform: 'translate(50%, 50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '10px', height: '10px', transform: 'translate(-50%, -50%)', color: colorAccent, fontFamily: 'var(--font-mono)', fontSize: '12px', pointerEvents: 'none', zIndex: 5 }}>+</div>

            {/* Box 1 (top-left): Header box */}
            <motion.div className="protocol-bento-box"
              initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0 }}
              style={{
                willChange: 'transform, opacity',
                padding: '4rem 3rem',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <h2 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1 }}>
                The Neural Protocol.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.5)', marginTop: '1.5rem', lineHeight: 1.6 }}>
                A surgically precise deployment process. Zero guesswork.
              </p>
            </motion.div>

            {/* Box 2 (top-right): Phase 01 */}
            <motion.div className="protocol-bento-box"
              initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.15 }}
              style={{
                willChange: 'transform, opacity',
                padding: '3.5rem 3rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {!isRemix && (
                <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>
                  FIG_01 // SECURE_FLOW
                </div>
              )}
              <div className="protocol-bento-diagram" style={{ height: '140px', width: '100%', position: 'relative' }}>
                <MethodologyDiagram phase={1} activeHero={activeHero} />
              </div>
              <div>
                {!isRemix && (
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent }}>
                    STAGE_01 // BLUEPRINT_AUDIT
                  </span>
                )}
                <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                  {phases[0].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {phases[0].desc}
                </p>
              </div>
            </motion.div>

            {/* Box 3 (bottom-left): Phase 02 */}
            <motion.div className="protocol-bento-box"
              initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.3 }}
              style={{
                willChange: 'transform, opacity',
                padding: '3.5rem 3rem',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {!isRemix && (
                <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>
                  FIG_02 // LAYER_STACK
                </div>
              )}
              <div className="protocol-bento-diagram" style={{ height: '140px', width: '100%', position: 'relative' }}>
                <MethodologyDiagram phase={2} activeHero={activeHero} />
              </div>
              <div>
                {!isRemix && (
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent }}>
                    STAGE_02 // ARCHITECT_BUILD
                  </span>
                )}
                <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                  {phases[1].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {phases[1].desc}
                </p>
              </div>
            </motion.div>

            {/* Box 4 (bottom-right): Phase 03 */}
            <motion.div className="protocol-bento-box"
              initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.45 }}
              style={{
                willChange: 'transform, opacity',
                padding: '3.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {!isRemix && (
                <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>
                  FIG_03 // SCALE_TELEMETRY
                </div>
              )}
              <div className="protocol-bento-diagram" style={{ height: '140px', width: '100%', position: 'relative' }}>
                <MethodologyDiagram phase={3} activeHero={activeHero} />
              </div>
              <div>
                {!isRemix && (
                  <span style={{ fontFamily: isRemix ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: '0.75rem', color: colorAccent }}>
                    STAGE_03 // DEPLOY_SCALE
                  </span>
                )}
                <h3 style={{ fontFamily: isRemix ? 'var(--font-display)' : 'var(--font-tech)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                  {phases[2].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {phases[2].desc}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          gridAutoFlow: 'dense'
        }}>

          {/* Title Bento Card (Span 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              willChange: 'transform, opacity',
              gridColumn: 'span 2',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '4rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative'
            }} className="sui-card-hover"
          >
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              The Neural Protocol.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', marginTop: '1.2rem', lineHeight: 1.6, maxWidth: '500px' }}>
              A surgically precise deployment process. Zero guesswork.
            </p>
          </motion.div>

          {/* Phase 1 Bento Card (Span 1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(198, 255, 52, 0.3)' }}
            style={{
              willChange: 'transform, opacity',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Giant Background Number */}
            <div style={{ position: 'absolute', right: '-10%', bottom: '-10%', fontFamily: 'var(--font-display)', fontSize: '12rem', color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', lineHeight: 1 }}>
              01
            </div>

            <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>
              FIG_01 // AUDIT
            </div>
            <div style={{ height: '120px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MethodologyDiagram phase={1} activeHero={activeHero} />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.8rem' }}>
                {phases[0].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {phases[0].desc}
              </p>
            </div>
          </motion.div>

          {/* Phase 2 Bento Card (Span 1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(198, 255, 52, 0.3)' }}
            style={{
              willChange: 'transform, opacity',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Giant Background Number */}
            <div style={{ position: 'absolute', right: '-10%', bottom: '-10%', fontFamily: 'var(--font-display)', fontSize: '12rem', color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', lineHeight: 1 }}>
              02
            </div>
            <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>
              FIG_02 // BUILD
            </div>
            <div style={{ height: '120px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MethodologyDiagram phase={2} activeHero={activeHero} />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.8rem' }}>
                {phases[1].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {phases[1].desc}
              </p>
            </div>
          </motion.div>

          {/* Phase 3 Bento Card (Span 2 Columns, diagram left, text right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(198, 255, 52, 0.3)' }}
            style={{
              willChange: 'transform, opacity',
              gridColumn: 'span 2',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '3rem',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.8fr',
              gap: '2.5rem',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Giant Background Number */}
            <div style={{ position: 'absolute', right: '-5%', bottom: '-20%', fontFamily: 'var(--font-display)', fontSize: '16rem', color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', lineHeight: 1 }}>
              03
            </div>

            <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>
              FIG_03 // SCALE
            </div>
            <div style={{ height: '180px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MethodologyDiagram phase={3} activeHero={activeHero} />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.8rem' }}>
                {phases[2].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '1rem' }}>
                {phases[2].desc}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );

}

export default memo(Methodology);
