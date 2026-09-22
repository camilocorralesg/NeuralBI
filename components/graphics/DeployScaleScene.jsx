'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import s from './DeployScaleScene.module.css';

const diamond = (x, y, r) => `${x},${y - r * .57735} ${x + r},${y} ${x},${y + r * .57735} ${x - r},${y}`;
const routes = {
  release: 'M179 174l-20-13 10-6-14-8',
  team: 'M209 191l-29 17-10-6-16 10',
  agent: 'M299 174l16 11',
};

function Plinth({ x, y, radius, fill, boundary = false }) {
  const depth = radius * .57735;
  return <g strokeLinejoin="round">
    <polygon points={diamond(x, y + 10, radius + 5)} fill="#000" opacity=".5" />
    <path d={`M${x - radius} ${y}l${radius} ${depth}v7l-${radius}-${depth}z`} className={s.leftFace} />
    <path d={`M${x} ${y + depth}l${radius}-${depth}v7l-${radius} ${depth}z`} className={s.rightFace} />
    <polygon points={diamond(x, y, radius)} fill={fill} className={s.plinthEdge} />
    <polygon points={diamond(x, y, radius - 7)} className={boundary ? s.boundary : s.inset} />
    <path d={`M${x - radius} ${y + 4}l${radius} ${depth} ${radius}-${depth}`} className={s.seam} />
  </g>;
}

function ServerLayer({ y, fill, className }) {
  return <g className={className} strokeLinejoin="round">
    <path d={`M199 ${y}l40 23.1v11l-40-23.1z`} className={s.serverLeft} />
    <path d={`M239 ${y + 23.1}l40-23.1v11l-40 23.1z`} className={s.serverRight} />
    <polygon points={diamond(239, y, 40)} fill={fill} className={s.serverTop} />
    <path d={`m203 ${y - 2} 36-20.8 36 20.8`} className={s.serverRim} />
    <path d={`m207 ${y + 11} 17 9.8m-17-6.3 17 9.8`} className={s.vents} />
    <path d={`m252 ${y + 22} 4-2.3m4-2.3 4-2.3`} className={s.statusLights} />
    <polygon points={diamond(239, y, 20)} className={s.chipWell} />
    <path d={`m229 ${y} 10-5.8 10 5.8-10 5.8z`} className={s.chip} />
  </g>;
}

function TeamMember({ x, y, scale = 1, fill }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cy="21" rx="10" ry="5.5" fill="#080f09" opacity=".6" />
    <path d="M-9 18v-8a9 8 0 0 1 18 0v8a9 4.5 0 0 1-18 0z" fill={fill} className={s.personEdge} />
    <path d="M1 3q8 0 8 7v8q-2 3-8 4z" className={s.personShade} />
    <circle cy="-5" r="5.8" fill={fill} className={s.personEdge} />
    <path d="M-3-7q2-3 5-1" className={s.personHighlight} />
  </g>;
}

export const DeployScaleScene = memo(function DeployScaleScene() {
  const ref = useRef(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    const visibility = () => { element.dataset.visible = String(!document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => { element.dataset.running = String(entry.isIntersecting && entry.intersectionRatio >= .15); }, { threshold: .15 },
    );
    visibility();
    if (observer) observer.observe(element);
    else element.dataset.running = 'true';
    document.addEventListener('visibilitychange', visibility);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  return <figure ref={ref} className={s.scene} data-running="false" aria-label="Deploy & Scale: production, people and copilots" aria-describedby={`${id}-desc`}>
    <svg viewBox="38 15 384 251" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-graphite`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#354031" /><stop offset="1" stopColor="#101b15" /></linearGradient>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#edf4dd" /><stop offset="1" stopColor="#a9c08c" /></linearGradient>
        <linearGradient id={`${id}-people`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#dae9c2" /><stop offset="1" stopColor="#819d6a" /></linearGradient>
        <radialGradient id={`${id}-ground`}><stop stopColor="#819c4f" stopOpacity=".13" /><stop offset="1" stopColor="#819c4f" stopOpacity="0" /></radialGradient>
        <clipPath id={`${id}-display`}><rect x="4" y="4" width="76" height="70" rx="1" /></clipPath>
      </defs>
      <ellipse cx="232" cy="199" rx="187" ry="61" fill={`url(#${id}-ground)`} />
      <g className={s.survey}><path d="m48 156 61 35m64 36 66 38 66-38m7-21 51 29 53-30" /><path d="m224 257 3-2m12 10 3-2m12-7 3-2" /></g>
      {Object.entries(routes).map(([name, d]) => <g key={name}><path d={d} pathLength="100" className={`${s.route} ${s[`${name}Line`]}`} /><path d={d} pathLength="100" className={`${s.packet} ${s[name]}`} /></g>)}

      {/* The finished application becomes a live production dashboard. */}
      <g className={s.dashboardStage} data-stage="dashboard">
      <Plinth x={109} y={147} radius={46} fill={`url(#${id}-graphite)`} />
      <g className={s.dashboardPanel}>
      <path d="m61 35 4-3 73 42v78l-4 3-73-42z" className={s.panelBack} />
      <g transform="matrix(.8660254 .5 0 1 61 35)">
        <rect width="84" height="78" rx="2" fill={`url(#${id}-paper)`} className={s.panelEdge} />
        <g clipPath={`url(#${id}-display)`}>
          <rect x="8" y="8" width="5" height="4" rx=".7" className={s.inkFill} /><path d="M18 10H43M5 17H79" className={s.uiRule} />
          <rect x="8" y="23" width="43" height="39" rx="1" className={s.uiPanel} /><path d="M13 55H46M13 28v27" className={s.axis} />
          <path d="m13 48 8-5 7 3 8-11 10-5" className={s.chartGuide} />
          <path d="m13 48 8-5 7 3 8-11 10-5" pathLength="100" className={s.chart} />
          <g className={s.dashboardData}><rect x="57" y="24" width="17" height="15" rx="1" className={s.metric} /><path d="M61 29h9m-9 5h6" className={s.inkLine} /><rect x="57" y="46" width="17" height="15" rx="1" className={s.metric} /><path d="M61 51h9m-9 5h6" className={s.inkLine} /></g>
          <circle cx="10" cy="69" r="1.6" className={s.online} /><path d="M16 69H39" className={s.uiRule} />
        </g>
      </g>
      </g>
      </g>

      {/* Stable infrastructure first; another compute tier joins as demand grows. */}
      <g className={s.productionStage} data-stage="production">
      <Plinth x={239} y={174} radius={60} fill={`url(#${id}-graphite)`} boundary />
      <ellipse cx="239" cy="181" rx="39" ry="21" fill="#050b06" opacity=".65" />
      <ServerLayer y={150} fill={`url(#${id}-graphite)`} className={s.serverFoundation} />
      <ServerLayer y={126} fill={`url(#${id}-paper)`} className={s.serverCore} />
      <g className={s.capacityGuides}><path d="M203 108v22m72-22v22M239 88v21" /></g>
      <ServerLayer y={102} fill={`url(#${id}-paper)`} className={s.capacity} />
      <g className={s.deployReceipt} transform="translate(239 126)"><g className={s.receiptInner}><ellipse rx="11" ry="6.4" className={s.receiptSeal} /><path d="m-5 0 4 2.3 7-4" className={s.receiptCheck} /></g></g>
      </g>

      {/* Team activation remains a visible part of deployment. */}
      <g className={s.teamStage} data-stage="team">
      <Plinth x={105} y={212} radius={49} fill={`url(#${id}-graphite)`} />
      <g className={s.teamLeft}><TeamMember x={86} y={188} scale={.78} fill={`url(#${id}-people)`} /></g>
      <g className={s.teamRight}><TeamMember x={125} y={188} scale={.78} fill={`url(#${id}-people)`} /></g>
      <g className={s.teamFront}><TeamMember x={105} y={197} fill={`url(#${id}-people)`} /></g>
      <g className={s.teamCheck} transform="translate(132 216)"><circle r="6" className={s.checkSeal} /><path d="m-3 0 2 2 4-4" className={s.check} /></g>
      </g>

      {/* Copilot activation is grounded in the same production platform. */}
      <g className={s.copilotStage} data-stage="copilot">
      <Plinth x={363} y={185} radius={48} fill={`url(#${id}-graphite)`} boundary />
      <g className={s.copilotPanel}>
      <path d="m331 108 4-3 59 34v59l-4 3-59-34z" className={s.panelBack} />
      <g transform="matrix(.8660254 .5 0 1 331 108)">
        <path d="M0 7 7 0h51l8 8v51H0z" fill={`url(#${id}-paper)`} className={s.panelEdge} />
        <path d="M58 0v8h8" className={s.fold} />
        <path d="M18 34a8 8 0 0 1-1-16 13 13 0 0 1 25-2 9 9 0 0 1 3 18z" className={s.cloud} />
        <g className={s.agentNetwork}><path d="m23 28 9-7 10 7m-10-7v14" className={s.network} /><circle cx="23" cy="28" r="2" className={s.networkNode} /><circle cx="32" cy="21" r="2.5" className={s.networkNode} /><circle cx="42" cy="28" r="2" className={s.networkNode} /><circle cx="32" cy="35" r="2" className={s.networkNode} /></g>
        <path d="M10 43H54" className={s.uiRule} /><path d="M11 50H34" className={s.inkLine} />
        <g className={s.agentCheck}><circle cx="52" cy="50" r="5" className={s.checkSeal} /><path d="m49 50 2 2 4-4" className={s.check} /></g>
      </g>
      </g>
      </g>
    </svg>
    <span id={`${id}-desc`} className={s.srOnly}>An isometric production platform receives an application deployment, connects the team, and activates a cloud copilot. The scene builds progressively: the production base and server assemble first, connections reveal the dashboard, team members join one by one, and the copilot appears last. An additional server tier adds capacity before the completed system holds and gently resets.</span>
  </figure>;
});
