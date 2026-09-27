'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import s from './CopilotStudioAnimations.module.css';
import { useLanguage } from '../../context/LanguageContext';

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
  return <g><path d="M18 191H342" className={s.rule} /><circle cx="23" cy="204" r="2.5" className={s.dot} /><text x="33" y="207" className={s.micro}>{children}</text><text x="341" y="207" textAnchor="end" className={s.micro}>COPILOT STUDIO</text></g>;
}

function Flow({ d, phase = 'retrieve', delay = '0s' }) {
  return <g style={{ '--delay': delay }}><path d={d} className={s.connection} /><path d={d} pathLength="100" className={`${s.packet} ${s[phase]}`} /></g>;
}

function Check({ x, y, className = s.check }) { return <path d={`M${x} ${y}l3 3 6-6`} className={className} />; }
function Lock({ x, y }) { return <path d={`M${x + 2} ${y + 6}V${y + 3}a3 3 0 0 1 6 0v3m-7 0h8v7h-8z`} className={s.lock} />; }

export const McsGroundedReasoningAnim = memo(function McsGroundedReasoningAnim() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  return <Frame title="Grounded Reasoning & Action Loop" description="An illustrative agent retrieves context from Dataverse and SharePoint, checks the context, and calls an approved API action. A receipt confirms the record update; access policies apply throughout.">
    <text x="18" y="24" className={s.label}>{isEs ? 'Contexto empresarial. Acción autónoma.' : 'Enterprise context. Purposeful action.'}</text>
    <Flow d="M112 66H125Q135 66 135 76V92H146" /><Flow d="M112 134H125Q135 134 135 124V111H146" delay=".35s" />
    <Flow d="M214 102H245" phase="execute" />
    <g className={s.source}>
      <rect x="16" y="45" width="96" height="42" rx="6" className={s.surface} /><path d="M27 55h13v10H27zM27 59h13M31 55v10" className={s.icon} /><text x="47" y="64" className={s.nodeTitle}>Dataverse</text><text x="27" y="78" className={s.micro}>{isEs ? 'Registros corporativos' : 'Business records'}</text>
      <rect x="16" y="113" width="96" height="42" rx="6" className={s.surface} /><path d="M28 122h9l4 4v11H28zM37 122v4h4M31 130h7m-7 3h5" className={s.icon} /><text x="47" y="133" className={s.nodeTitle}>SharePoint</text><text x="27" y="147" className={s.micro}>{isEs ? 'Conocimiento interno' : 'Internal knowledge'}</text>
    </g>
    <rect x="142" y="69" width="76" height="65" rx="11" className={s.coreRim} /><rect x="146" y="73" width="68" height="57" rx="7" className={s.core} />
    <path d="M173 83h14l7 12-7 12h-14l-7-12zM173 83l14 24m0-24-14 24" className={s.agentGlyph} /><circle cx="180" cy="95" r="2" className={s.dot} />
    <text x="180" y="120" textAnchor="middle" className={s.nodeTitle}>{isEs ? 'Agente' : 'Agent'}</text><text x="180" y="147" textAnchor="middle" className={s.micro}>{isEs ? 'Contexto → decisión' : 'Context → decision'}</text>
    <rect x="245" y="45" width="99" height="110" rx="7" className={s.receiptSurface} />
    <text x="256" y="63" className={s.nodeTitle}>{isEs ? 'Confirmación' : 'Action receipt'}</text><path d="M255 73H334" className={s.rule} />
    <g className={s.receipt}><circle cx="264" cy="93" r="8" className={s.checkRing} /><Check x={260} y={93} /><text x="256" y="118" className={s.resultText}>{isEs ? 'Registro actualizado' : 'Record updated'}</text><text x="256" y="137" className={s.micro}>{isEs ? 'Acción API aprobada' : 'Approved API action'}</text></g>
    <Lock x={108} y={166} /><text x="124" y="177" className={s.micro}>{isEs ? 'Políticas de acceso aplicadas' : 'Access policies applied'}</text>
    <Footer>{isEs ? 'Recuperar, razonar y actuar' : 'Retrieve, reason, act'}</Footer>
  </Frame>;
});

const stepDefs = [
  { en: { name: 'Retrieve', detail: 'Invoice + PO' }, es: { name: 'Recuperar', detail: 'Factura + OC' }, x: 18, icon: 'M38 82h13v16H38zM42 87h5m-5 4h5' },
  { en: { name: 'Validate', detail: 'Match + policy' }, es: { name: 'Validar', detail: 'Cotejo y reglas' }, x: 133, icon: 'M159 82l8 3v6c0 5-8 8-8 8s-8-3-8-8v-6zM155 90l3 3 5-6' },
  { en: { name: 'Execute', detail: 'ERP connector' }, es: { name: 'Ejecutar', detail: 'Conector ERP' }, x: 248, icon: 'M266 87h17m-5-5 5 5-5 5M283 96h-17m5-5-5 5 5 5' },
];

export const McsMultiStepChainAnim = memo(function McsMultiStepChainAnim() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const id = useId();
  return <Frame title="Multi-Step Agentic Chain" description="An illustrative request to reconcile invoice INV-2048 moves through three ordered steps: retrieve the invoice and purchase order, validate the match and policy, then update the ERP using a connector. The final receipt shows a matched invoice and updated record.">
    <defs><clipPath id={`${id}-receipt`}><rect x="18" y="153" width="324" height="28" rx="5" /></clipPath></defs>
    <text x="18" y="24" className={s.label}>{isEs ? 'Una solicitud. Flujo integral.' : 'One request. A complete workflow.'}</text>
    <path d="M19 42h13v10h-8l-4 3v-3h-1z" className={s.icon} /><text x="41" y="51" className={s.intent}>{isEs ? 'Conciliar factura ' : 'Reconcile invoice '}<tspan className={s.invoice}>INV-2048</tspan></text>
    <Flow d="M112 104H133" phase="validate" /><Flow d="M227 104H248" phase="execute" />
    {stepDefs.map((step, i) => {
      const copy = isEs ? step.es : step.en;
      return <g key={step.en.name} className={s.step} style={{ '--delay': `${i * 2.1}s` }}>
        <rect x={step.x} y="70" width="94" height="70" rx="6" className={s.stepSurface} /><path d={step.icon} className={s.icon} />
        <text x={step.x + 78} y="90" textAnchor="end" className={s.stepNumber}>0{i + 1}</text>
        <text x={step.x + 12} y="117" className={s.nodeTitle}>{copy.name}</text><text x={step.x + 12} y="131" className={s.micro}>{copy.detail}</text>
      </g>;
    })}
    <g clipPath={`url(#${id}-receipt)`}><g className={s.chainReceipt}><rect x="18" y="153" width="324" height="28" rx="5" className={s.receiptSurface} /><Check x={30} y={167} /><text x="47" y="171" className={s.resultText}>{isEs ? 'Factura conciliada' : 'Invoice matched'}</text><path d="M218 167h10m-3-3 3 3-3 3" className={s.icon} /><text x="330" y="171" textAnchor="end" className={s.resultText}>{isEs ? 'ERP actualizado' : 'ERP updated'}</text></g></g>
    <Footer>{isEs ? 'El contexto se convierte en acción' : 'Context becomes completed work'}</Footer>
  </Frame>;
});

export const McsZeroHallucinationFieldAnim = memo(function McsZeroHallucinationFieldAnim() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  return <Frame title="Grounding & Enterprise Guardrails" description="Two illustrative candidate responses pass through a source check. An unsupported claim is held for review; source-linked context can proceed. A separate DLP policy check restricts connectors. Grounding and access controls are distinct safeguards, not a guarantee of error-free answers.">
    <text x="18" y="24" className={s.label}>{isEs ? 'Evidencia antes de ejecutar.' : 'Evidence before execution.'}</text>
    <text x="18" y="47" className={s.micro}>{isEs ? 'CONTEXTO DE RESPUESTA' : 'RESPONSE CONTEXT'}</text><text x="342" y="47" textAnchor="end" className={s.micro}>{isEs ? 'VALIDACIÓN DE FUENTE' : 'SOURCE CHECK'}</text>
    <rect x="16" y="59" width="123" height="41" rx="5" className={s.surface} /><text x="28" y="76" className={s.nodeTitle}>{isEs ? 'Dato sin respaldo' : 'Unsupported claim'}</text><text x="28" y="91" className={s.micro}>{isEs ? 'Sin evidencia vinculada' : 'No linked evidence'}</text>
    <rect x="16" y="113" width="123" height="41" rx="5" className={s.surface} /><text x="28" y="130" className={s.nodeTitle}>{isEs ? 'Contexto referenciado' : 'Source-linked context'}</text><text x="28" y="145" className={s.micro}>{isEs ? 'Referencia interna adjunta' : 'Internal reference attached'}</text>
    <Flow d="M139 79H178" phase="reviewInput" /><Flow d="M139 133H178" phase="verifiedInput" />
    <rect x="179" y="60" width="26" height="94" rx="6" className={s.gate} /><path d="M192 73v68" className={s.gateRule} /><circle cx="192" cy="79" r="6" className={s.gateStop} /><path d="M189 79h6" className={s.stopMark} /><circle cx="192" cy="133" r="6" className={s.checkRing} /><path d="M189 133l2 2 4-4" className={s.check} />
    <Flow d="M206 79H233" phase="reviewOutput" /><Flow d="M206 133H233" phase="verifiedOutput" />
    <g className={s.reviewResult}><rect x="234" y="59" width="110" height="41" rx="5" className={s.reviewSurface} /><text x="247" y="77" className={s.reviewText}>{isEs ? 'Revisión requerida' : 'Review needed'}</text><text x="247" y="92" className={s.micro}>{isEs ? 'Acción pausada' : 'Action held'}</text></g>
    <g className={s.verifiedResult}><rect x="234" y="113" width="110" height="41" rx="5" className={s.receiptSurface} /><text x="247" y="131" className={s.resultText}>{isEs ? 'Fuente validada' : 'Source linked'}</text><text x="247" y="146" className={s.micro}>{isEs ? 'Avanzar a directiva' : 'Continue to policy'}</text></g>
    <Lock x={18} y={166} /><text x="35" y="177" className={s.micro}>{isEs ? 'Directiva DLP' : 'DLP policy'}</text><path d="M88 173H110" className={s.connection} /><text x="121" y="177" className={s.micro}>{isEs ? 'Conectores aprobados' : 'Approved connectors'}</text><Check x={328} y={173} />
    <Footer>{isEs ? 'Fuentes validadas + acceso acotado' : 'Source checks + scoped access'}</Footer>
  </Frame>;
});
