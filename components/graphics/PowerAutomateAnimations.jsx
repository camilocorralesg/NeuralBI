'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import s from './PowerAutomateAnimations.module.css';

function Frame({ title, description, children }) {
  const ref = useRef(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    const visibility = () => { element.dataset.visible = String(!document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => { element.dataset.running = String(entry.isIntersecting); },
      { threshold: 0.15 },
    );
    visibility();
    if (observer) observer.observe(element);
    else element.dataset.running = 'true';
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return <figure ref={ref} className={s.frame} data-running="false" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`}>
    <figcaption id={`${id}-title`} className={s.title}>{title}</figcaption>
    <svg className={s.canvas} viewBox="0 0 360 220" fill="none" aria-hidden="true">{children}</svg>
    <span id={`${id}-desc`} className={s.srOnly}>{description}</span>
  </figure>;
}

function Footer({ children }) {
  return <g><path d="M18 191H342" className={s.rule} /><circle cx="23" cy="204" r="2.5" className={s.successDot} /><text x="33" y="207" className={s.micro}>{children}</text><text x="341" y="207" textAnchor="end" className={s.micro}>POWER AUTOMATE</text></g>;
}

function Flow({ d, phase = 'incoming', delay = '0s' }) {
  return <g style={{ '--delay': delay }}><path d={d} className={s.connection} /><path d={d} pathLength="100" className={`${s.packet} ${s[phase]}`} /></g>;
}

function Check({ x, y }) { return <path d={`M${x} ${y}l3 3 6-6`} className={s.check} />; }

export const PauSelfHealingFlowAnim = memo(function PauSelfHealingFlowAnim() {
  return <Frame title="Autonomous Cloud & Desktop RPA Architecture" description="An event branches into cloud and desktop flows. A transient cloud error triggers a backoff retry while the desktop branch continues. Both branches then converge into a completed run. Illustrative workflow.">
    <text x="18" y="24" className={s.label}>One event. Coordinated execution.</text>
    <Flow d="M92 103H106Q117 103 117 92V70Q117 59 130 59H138" />
    <Flow d="M92 103H106Q117 103 117 114V134Q117 145 130 145H138" delay=".15s" />
    <Flow d="M230 59H246Q258 59 258 72V91Q258 103 270 103H282" phase="cloudExit" />
    <Flow d="M230 145H246Q258 145 258 132V115Q258 103 270 103H282" phase="desktopExit" />
    <rect x="16" y="82" width="76" height="42" rx="6" className={s.surface} />
    <path d="M30 93l-4 8h5l-3 8 10-12h-6l3-4" className={s.eventIcon} />
    <text x="43" y="100" className={s.nodeTitle}>Event</text><text x="43" y="114" className={s.micro}>Received</text>
    <rect x="138" y="38" width="92" height="42" rx="6" className={s.cloudSurface} />
    <text x="150" y="55" className={s.nodeTitle}>Cloud flow</text>
    <text x="150" y="70" className={`${s.micro} ${s.cloudReady}`}>API connected</text>
    <text x="150" y="70" className={s.retryLabel}>Backoff retry</text>
    <g className={s.retryLoop}><path d="M151 38V34Q151 30 157 30H211Q217 30 217 36" pathLength="100" className={s.retryPath} /><path d="M214 33l3 4 3-4" className={s.retryArrow} /></g>
    <rect x="138" y="124" width="92" height="42" rx="6" className={s.surface} /><text x="150" y="141" className={s.nodeTitle}>Desktop RPA</text><text x="150" y="156" className={s.micro}>Legacy systems</text>
    <g className={s.completed}><rect x="282" y="82" width="62" height="42" rx="6" className={s.successSurface} /><Check x={308} y={97} /><text x="313" y="114" textAnchor="middle" className={s.successLabel}>Complete</text></g>
    <circle cx="117" cy="103" r="2.5" className={s.junction} /><circle cx="258" cy="103" r="2.5" className={s.junction} />
    <text x="184" y="183" textAnchor="middle" className={s.micro}>Cloud logic + desktop execution</text>
    <Footer>Recover, converge, continue</Footer>
  </Frame>;
});

const lanes = [
  { title: 'Cloud flows', detail: 'Parallel actions', y: 39, icon: 'M136 48h10v7h-10zM132 52h4m10 0h4' },
  { title: 'API connectors', detail: 'REST / GraphQL', y: 77, icon: 'M138 85l-4 5 4 5m7-10 4 5-4 5' },
  { title: 'Desktop RPA', detail: 'SAP / legacy', y: 115, icon: 'M133 123h16v10h-16zM137 136h8m-4-3v3' },
  { title: 'Process mining', detail: 'Execution insights', y: 153, icon: 'M134 171v-7m6 7v-13m6 13v-10' },
];

export const PauEventDrivenMeshAnim = memo(function PauEventDrivenMeshAnim() {
  return <Frame title="Real-Time Enterprise API Orchestration" description="A business event dispatches work to cloud flows, API connectors and desktop RPA. Process mining then receives execution insights. The diagram shows coordinated capabilities, not live transaction data.">
    <text x="18" y="24" className={s.label}>An event becomes action.</text><text x="340" y="24" textAnchor="end" className={s.micro}>ORCHESTRATION</text>
    <rect x="16" y="80" width="74" height="57" rx="7" className={s.surface} />
    <path d="M47 90l-5 9h7l-3 8 13-13h-8l3-4" className={s.eventIcon} />
    <text x="53" y="119" textAnchor="middle" className={s.nodeTitle}>Business event</text><text x="53" y="131" textAnchor="middle" className={s.micro}>Trigger received</text>
    {lanes.map((lane, i) => <g key={lane.title} style={{ '--delay': `${i === 3 ? 2.5 : i * .25}s` }}>
      <Flow d={`M90 108H103Q112 108 112 ${lane.y < 108 ? 99 : 117}V${lane.y + (lane.y < 108 ? 22 : 4)}Q112 ${lane.y + 13} 121 ${lane.y + 13}H127`} delay={`${i === 3 ? 2.5 : i * .25}s`} />
      <rect x="127" y={lane.y - 4} width="217" height="34" rx="4" className={s.laneHighlight} />
      <path d={lane.icon} className={s.laneIcon} /><text x="160" y={lane.y + 10} className={s.nodeTitle}>{lane.title}</text><text x="160" y={lane.y + 23} className={s.micro}>{lane.detail}</text>
      <path d={`M128 ${lane.y + 31}H342`} className={s.rule} />
      <g className={s.laneCheck}><circle cx="329" cy={lane.y + 12} r="7" className={s.checkRing} /><Check x={325} y={lane.y + 12} /></g>
    </g>)}
    <Footer>Connected systems, coordinated work</Footer>
  </Frame>;
});

const trace = [
  { title: 'Service unavailable', detail: '503 response', y: 49, className: 'traceError' },
  { title: 'Dead-letter queue', detail: 'Retry limit reached', y: 83, className: 'traceQueued' },
  { title: 'Replay scheduled', detail: 'Service recovered', y: 117, className: 'traceReplay' },
  { title: 'Delivery confirmed', detail: 'Acknowledgement received', y: 151, className: 'traceDelivered' },
];

export const PauResilientDlqMeshAnim = memo(function PauResilientDlqMeshAnim() {
  const id = useId();
  return <Frame title="Zero-Trust Resilient Mesh & Observability" description="An illustrative delivery trace records a service error, exhausted retries, dead-letter queue capture, a configured replay after service recovery, and confirmed delivery. Backoff intervals increase between retry attempts. The flow stays within a tenant boundary.">
    <defs><linearGradient id={`${id}-wait`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7b9fbd" stopOpacity=".4" /><stop offset="1" stopColor="#9bc5ec" /></linearGradient></defs>
    <path d="M23 21v-3a3 3 0 0 1 6 0v3m-7 0h8v6h-8z" className={s.lock} /><text x="37" y="26" className={s.label}>Delivery trace</text><text x="339" y="26" textAnchor="end" className={s.micro}>TENANT BOUNDARY</text>
    <path d="M26 55V157" className={s.traceRail} /><path d="M203 42V173" className={s.rule} />
    {trace.map((step, i) => <g key={step.title} className={s[step.className]}>
      <circle cx="26" cy={step.y + 6} r="5" className={i === 3 ? s.traceSuccess : s.traceDot} />
      {i === 0 ? <path d={`M26 ${step.y + 3}v3m0 2v1`} className={s.warningMark} /> : i === 3 ? <path d={`M23 ${step.y + 6}l2 2 3-4`} className={s.smallCheck} /> : <circle cx="26" cy={step.y + 6} r="1.5" className={s.junction} />}
      <text x="39" y={step.y + 5} className={s.traceTitle}>{step.title}</text><text x="39" y={step.y + 18} className={s.micro}>{step.detail}</text>
    </g>)}
    <text x="219" y="53" className={s.nodeTitle}>Retry backoff</text><text x="219" y="69" className={s.micro}>Increasing wait intervals</text>
    {[24, 45, 82].map((width, i) => <g key={width}>
      <text x="219" y={89 + i * 20} className={s.attempt}>{i + 1}</text><path d={`M235 ${86 + i * 20}H337`} className={s.grid} />
      <rect x="235" y={82 + i * 20} width={width} height="8" rx="2" fill={`url(#${id}-wait)`} className={s.waitBar} style={{ '--delay': `${i * .55}s` }} />
    </g>)}
    <g className={s.recovered}><rect x="219" y="146" width="121" height="25" rx="5" className={s.successSurface} /><Check x={229} y={158} /><text x="245" y="162" className={s.successLabel}>Replay delivered</text></g>
    <Footer>Every exception, accounted for</Footer>
  </Frame>;
});
