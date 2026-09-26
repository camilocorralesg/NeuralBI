'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { BadgeCheck, Check, CircleCheck, Clock3, FileText, Fingerprint, Lock, ShieldCheck, TriangleAlert } from 'lucide-react';
import { LiveNumber, Mark, Phone, Pill, Tap, Window } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import c from './CreditDesk.module.css';

/* NeuralBI · Credit Desk — the product behind "Credit Risk & Loan Approval Portals": a model-driven Power Apps app with
 * React/PCF controls. Andina Retail's $12.5M facility is spread, rated by the risk control, routed to the deal
 * committee with one exception, and approved by the CFO from her phone after an Entra ID MFA check; every step lands
 * in the Dataverse audit trail under a Microsoft 365 sensitivity label. */
const BEATS = [
  { id: 'spread', duration: 2800 },
  { id: 'rate', duration: 2400 },
  { id: 'route', duration: 2200 },
  { id: 'approve', duration: 2800 },
  { id: 'hold', duration: 2200 },
];
// Per beat: how many things land (statement rows, checks, votes, the MFA and the approval), and how often.
const STEPS = { spread: [5, 450], rate: [4, 480], route: [2, 800], approve: [2, 825], hold: [0, 1000] };

const words = {
  en: {
    app: 'Credit Desk', loans: 'Commercial loans', label: 'Confidential · Finance',
    applicant: 'Andina Retail S.A.S.', facility: 'Revolving facility · $12.5M · 36 mo',
    inReview: 'In review', exception: 'Exception · committee', approved: 'Approved · 1 condition', decided: 'Decided in 1.8 d · vs ~3 wks',
    stages: ['Intake', 'Spreading', 'Risk rating', 'Committee', 'Approved'],
    spreading: 'Financial spreading', rows: ['Revenue', 'EBITDA', 'Net debt', 'Debt service'], leverage: 'Leverage', dscr: 'DSCR',
    rating: 'Risk rating', pd: 'PD', lgd: 'LGD',
    checks: ['Leverage 2.8x ≤ 3.5x', 'DSCR 1.42x ≥ 1.25x', 'Sector concentration 14% > 12%'],
    committee: 'Deal committee', roles: ['Credit officer', 'Chief Risk', 'CFO'],
    votes: { idle: 'Not started', pending: 'Pending · mobile', approved: 'Approved', condition: 'Approved · condition' },
    audit: 'Audit trail', auditSource: 'Dataverse',
    events: [
      ['10:02', 'Application received', 'Client portal'],
      ['10:09', 'Statements uploaded', 'M. Ríos'],
      ['10:14', 'Spread verified', 'M. Ríos'],
      ['10:15', 'Rated BB+', 'Risk engine · PCF'],
      ['10:15', 'Exception logged', 'Risk engine'],
      ['10:19', 'Voted approve', 'M. Ríos · Teams'],
      ['10:21', 'Approved with condition', 'L. Ortiz'],
      ['10:26', 'Approved', 'D. Vega · Mobile · MFA'],
    ],
    approvals: 'Approvals', upcoming: 'Coming to committee', recent: 'Recently decided',
    history: [['CL-2198', 'Pacífico Foods', 'Approved'], ['CL-2176', 'Norte Logística', 'Approved']],
    review: 'Committee review', condition: 'Condition: quarterly DSCR ≥ 1.25x', votesSoFar: 'of 3 approved',
    mfaNeeded: 'Entra ID · MFA required', mfaDone: 'Verified with Entra ID · MFA', approve: 'Approve', approvedAt: 'Approved · 10:26',
    exceptionShort: 'Sector 14% > 12%',
    documents: [['Financial statements FY24.pdf', '2.4 MB'], ['Credit memo CL-2231.docx', '310 KB']], confidential: 'Confidential',
  },
  es: {
    app: 'Mesa de Crédito', loans: 'Créditos comerciales', label: 'Confidencial · Finanzas',
    applicant: 'Andina Retail S.A.S.', facility: 'Línea revolvente · $12.5M · 36 m',
    inReview: 'En revisión', exception: 'Excepción · comité', approved: 'Aprobado · 1 condición', decided: 'Decidido en 1.8 d · vs ~3 sem',
    stages: ['Recepción', 'Análisis', 'Rating', 'Comité', 'Aprobado'],
    spreading: 'Análisis financiero', rows: ['Ingresos', 'EBITDA', 'Deuda neta', 'Servicio de deuda'], leverage: 'Apalancamiento', dscr: 'DSCR',
    rating: 'Rating de riesgo', pd: 'PD', lgd: 'LGD',
    checks: ['Apalancamiento 2.8x ≤ 3.5x', 'DSCR 1.42x ≥ 1.25x', 'Concentración sectorial 14% > 12%'],
    committee: 'Comité de crédito', roles: ['Oficial de crédito', 'Director de Riesgo', 'CFO'],
    votes: { idle: 'Sin iniciar', pending: 'Pendiente · móvil', approved: 'Aprobado', condition: 'Aprobado · condición' },
    audit: 'Auditoría', auditSource: 'Dataverse',
    events: [
      ['10:02', 'Solicitud recibida', 'Portal de clientes'],
      ['10:09', 'Estados cargados', 'M. Ríos'],
      ['10:14', 'Análisis verificado', 'M. Ríos'],
      ['10:15', 'Rating BB+', 'Motor de riesgo · PCF'],
      ['10:15', 'Excepción registrada', 'Motor de riesgo'],
      ['10:19', 'Voto a favor', 'M. Ríos · Teams'],
      ['10:21', 'Aprobado con condición', 'L. Ortiz'],
      ['10:26', 'Aprobado', 'D. Vega · Móvil · MFA'],
    ],
    approvals: 'Aprobaciones', upcoming: 'Próximo en comité', recent: 'Decididos recientemente',
    history: [['CL-2198', 'Pacífico Foods', 'Aprobado'], ['CL-2176', 'Norte Logística', 'Aprobado']],
    review: 'Revisión del comité', condition: 'Condición: DSCR trimestral ≥ 1.25x', votesSoFar: 'de 3 aprobados',
    mfaNeeded: 'Entra ID · MFA requerido', mfaDone: 'Verificado con Entra ID · MFA', approve: 'Aprobar', approvedAt: 'Aprobado · 10:26',
    exceptionShort: 'Sector 14% > 12%',
    documents: [['Estados financieros FY24.pdf', '2.4 MB'], ['Memo de crédito CL-2231.docx', '310 KB']], confidential: 'Confidencial',
  },
};
const FIGURES = ['$84.2M', '$11.6M', '$32.5M', '$8.2M'];
const GRADES = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC'];
// BB+ sits at the top of the BB band, next to investment grade.
const BB_PLUS = 61;
const MEMBERS = [['MR', 'M. Ríos'], ['LO', 'L. Ortiz'], ['DV', 'D. Vega']];

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const spread = through('spread'), rate = through('rate'), route = through('route'), approve = through('approve');
  const approved = approve >= 2;
  const stage = approved ? 5 : index >= 2 ? 3 : index === 1 ? 2 : 1;
  return {
    rows: spread,
    ratios: spread >= 5,
    rated: rate >= 1,
    checks: rate,
    exception: rate >= 4,
    routed: route >= 0,
    mfa: approve >= 1,
    approved,
    stages: [0, 1, 2, 3, 4].map(i => (approved ? 'done' : i < stage ? 'done' : i === stage ? 'active' : 'idle')),
    votes: [
      route >= 1 ? 'approved' : 'idle',
      route >= 2 ? 'condition' : 'idle',
      approved ? 'approved' : route >= 0 ? 'pending' : 'idle',
    ],
    approvals: (route >= 1) + (route >= 2) + approved,
    // Audit entries so far: two at intake, then one per landed step.
    events: 2 + (spread >= 5) + (rate >= 1) + (rate >= 4) + (route >= 1) + (route >= 2) + approved,
  };
}

export default function CreditDesk({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const root = useRef(null);
  const button = useRef(null);
  const [tap, setTap] = useState({ x: 0, y: 0, visible: false, pressed: false });

  // The CFO's fingertip lands on "Approve" once Entra ID has verified her.
  useLayoutEffect(() => {
    if (!live || phase !== 'approve') {
      setTap(current => ({ ...current, visible: false, pressed: false }));
      return undefined;
    }
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const target = () => {
      const box = root.current?.getBoundingClientRect(), cta = button.current?.getBoundingClientRect();
      return box && cta ? { x: cta.left - box.left + cta.width * .5, y: cta.top - box.top + cta.height * .5 } : null;
    };
    at(700, () => { const point = target(); if (point) setTap({ x: point.x + 30, y: point.y + 60, visible: false, pressed: false }); });
    at(780, () => { const point = target(); if (point) setTap(current => ({ ...current, ...point, visible: true })); });
    at(1400, () => setTap(current => ({ ...current, pressed: true })));
    at(1700, () => setTap(current => ({ ...current, pressed: false })));
    at(2300, () => setTap(current => ({ ...current, visible: false })));
    return () => timers.forEach(clearTimeout);
  }, [live, phase]);

  const status = data.approved ? ['ok', t.approved] : data.exception ? ['risk', t.exception] : ['idle', t.inReview];

  return <div ref={root} className={c.root} data-phase={phase} data-approved={data.approved}>
    <Window className={c.desk}>
      <header className={c.bar}>
        <Mark className={c.logo} />
        <span className={c.crumbs}><b>{t.app}</b><span>›</span><span>{t.loans}</span><span>›</span><span className={c.record}>CL-2231</span></span>
        <span className={c.label}><Lock strokeWidth={2.2} />{t.label}</span>
        <span className={c.avatar}>MR</span>
      </header>

      <section className={c.head}>
        <span className={c.headText}><b>{t.applicant}</b><span>{t.facility}</span></span>
        <span className={c.headStatus}>
          <Pill tone={status[0]} icon={data.approved ? CircleCheck : data.exception ? TriangleAlert : Clock3}>{status[1]}</Pill>
          <small data-shown={data.approved}>{t.decided}</small>
        </span>
      </section>

      <ol className={c.bpf}>
        {t.stages.map((name, i) => <li key={name} data-state={data.stages[i]} data-final={i === 4}>
          {data.stages[i] === 'done' && <Check strokeWidth={3} />}{name}
        </li>)}
      </ol>

      <div className={c.body}>
        <section className={c.panel}>
          <header className={c.panelHead}><b>{t.spreading}</b><span className={c.pcf}>React · PCF</span></header>
          <ul className={c.sheet}>
            {t.rows.map((row, i) => <li key={row} data-filled={data.rows > i}><span>{row}</span><span className={c.fy}>FY24</span><b>{FIGURES[i]}</b></li>)}
          </ul>
          <div className={c.ratios} data-shown={data.ratios}>
            <span><small>{t.leverage}</small><b>2.8x</b></span>
            <span><small>{t.dscr}</small><b>1.42x</b></span>
          </div>
        </section>

        <section className={c.panel}>
          <header className={c.panelHead}><b>{t.rating}</b><span className={c.pcf}>React · PCF</span></header>
          <div className={c.scale} data-rated={data.rated}>
            <div className={c.grades}>{GRADES.map((grade, i) => <span key={grade} data-band={i < 4 ? 'investment' : 'speculative'}>{grade}</span>)}</div>
            <span className={c.markerLayer} style={{ '--at': `${data.rated ? BB_PLUS : 0}%` }}><span className={c.marker}>BB+</span></span>
          </div>
          <div className={c.pd} data-shown={data.rated}><span>{t.pd} <b>1.8%</b></span><span>{t.lgd} <b>35%</b></span></div>
          <ul className={c.checks}>
            {t.checks.map((check, i) => {
              const done = data.checks > i + 1;
              const state = !done ? 'pending' : i === 2 ? 'exception' : 'pass';
              return <li key={check} data-state={state}>
                <span className={c.checkIcon}>{state === 'pass' ? <Check strokeWidth={3} /> : state === 'exception' ? <TriangleAlert strokeWidth={2.4} /> : null}</span>
                {check}
              </li>;
            })}
          </ul>
        </section>

        <section className={c.panel}>
          <header className={c.panelHead}><b>{t.committee}</b><span className={c.count}><LiveNumber value={data.approvals} decimals={0} suffix="/3" /></span></header>
          <ul className={c.members}>
            {MEMBERS.map(([initials, name], i) => <li key={initials} data-vote={data.votes[i]}>
              <span className={c.avatar}>{initials}</span>
              <span className={c.memberText}><b>{name} <BadgeCheck strokeWidth={2.2} /></b><span>{t.roles[i]}</span></span>
              <span className={c.vote}>{t.votes[data.votes[i]]}</span>
            </li>)}
          </ul>
        </section>

        <section className={c.panel}>
          <header className={c.panelHead}><b>{t.audit}</b><span className={c.pcf}>{t.auditSource}</span></header>
          <div className={c.trailBox}>
            <ol className={c.trail}>
              {t.events.slice(0, data.events).map(([time, action, actor], i) => <li key={i} data-last={i === 7}>
                <time>{time}</time><span><b>{action}</b> · {actor}</span>
              </li>)}
            </ol>
          </div>
        </section>
      </div>
    </Window>

    <Phone className={c.phone} time="10:26">
      <header className={c.pHead}>
        <Mark className={c.pLogo} />
        <span className={c.pTitle}><b>{t.approvals}</b><span>{t.app}</span></span>
        <span className={c.avatar}>DV</span>
      </header>
      {data.routed
        ? <div className={c.request} key="request">
          <span className={c.reqHead}><span>{t.review}</span><b>CL-2231</b></span>
          <b className={c.reqName}>{t.applicant}</b>
          <span className={c.reqFacility}>$12.5M · 36 mo</span>
          <dl className={c.reqFacts}>
            <div><dt>Rating</dt><dd>BB+</dd></div>
            <div><dt>{t.dscr}</dt><dd>1.42x</dd></div>
            <div><dt>PD</dt><dd>1.8%</dd></div>
          </dl>
          <span className={c.reqException}><TriangleAlert strokeWidth={2.2} />{t.exceptionShort}</span>
          <span className={c.reqCondition}>{t.condition}</span>
          <ul className={c.docs}>
            {t.documents.map(([name, size]) => <li key={name}><FileText strokeWidth={1.9} /><span>{name}</span><small><Lock strokeWidth={2.2} />{t.confidential} · {size}</small></li>)}
          </ul>
          <span className={c.reqVotes}>
            <span className={c.stack}>{MEMBERS.map(([initials], i) => <span key={initials} data-vote={data.votes[i]}>{initials}</span>)}</span>
            {data.approvals} {t.votesSoFar}
          </span>
          <span className={c.mfa} data-verified={data.mfa}>{data.mfa ? <ShieldCheck strokeWidth={2.2} /> : <Fingerprint strokeWidth={2} />}{data.mfa ? t.mfaDone : t.mfaNeeded}</span>
          <span ref={button} className={c.cta} data-done={data.approved} data-pressed={tap.pressed}>
            {data.approved ? <><CircleCheck strokeWidth={2.2} />{t.approvedAt}</> : t.approve}
          </span>
        </div>
        : <div className={c.inbox} key="inbox">
          <span className={c.upcoming}>
            <span className={c.reqHead}><span>{t.upcoming}</span><b>CL-2231</b></span>
            <b className={c.reqName}>{t.applicant}</b>
            <span className={c.upStage}><Clock3 strokeWidth={2.2} />{t.stages[data.stages.indexOf('active')]}</span>
            <span className={c.upRating} data-shown={data.rated}>
              <b>BB+</b>{data.exception && <em><TriangleAlert strokeWidth={2.2} />{t.exceptionShort}</em>}
            </span>
          </span>
          <span className={c.recent}>{t.recent}</span>
          {t.history.map(([id, name, state]) => <span key={id} className={c.historyItem}><b>{id}</b><span>{name}</span><em>{state}</em></span>)}
        </div>}
    </Phone>
    <Tap {...tap} />
  </div>;
}
