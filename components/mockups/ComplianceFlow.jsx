'use client';

import React from 'react';
import {
  ArrowLeftRight, BookLock, Check, CirclePause, Fingerprint, GitBranch, Landmark, Link2, MessageSquare, Minus, ShieldAlert,
  TriangleAlert, Zap,
} from 'lucide-react';
import { LiveNumber, Pill, ProductBar } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import m from './ComplianceFlow.module.css';

/* NeuralBI Flows · AML & KYC screening — the product behind "Automated Compliance Flows": an event-driven Power Automate
 * flow. Transfers stream in and are released; one from Oriente Trading hits a sanctions list while its beneficial owner
 * can't be verified, so the condition holds it and opens a Teams case, and the audit ledger chains the decision in 38 ms.
 * The flow never stops: the next transfer is released behind it. */
const BEATS = [
  { id: 'stream', duration: 3000 },
  { id: 'screen', duration: 2400 },
  { id: 'decide', duration: 2000 },
  { id: 'log', duration: 2400 },
  { id: 'resume', duration: 2600 },
];
// Per beat: how many things land (released transfers, checks, branch actions, the ledger write), and how often.
const STEPS = { stream: [3, 800], screen: [3, 650], decide: [2, 650], log: [1, 900], resume: [1, 1200] };
const THROUGHPUT = { stream: 412, screen: 415, decide: 415, log: 418, resume: 412 };

const words = {
  en: {
    flows: 'Flows', flowName: 'AML & KYC screening', designer: 'Designer', monitor: 'Monitor', perMinute: 'events/min',
    stream: 'Event stream',
    status: { running: 'Screening', released: 'Released', held: 'Held' },
    nodes: {
      trigger: ['When a transfer lands', 'Dataverse · event'],
      aml: ['AML screening', 'Sanctions · PEP · media'],
      kyc: ['KYC verification', 'ID · UBO · risk score'],
      condition: ['Condition', 'Risk score < 60'],
      release: ['Release payment', 'Payments API'],
      hold: ['Hold · open case', 'Teams · Compliance'],
      audit: ['Append to audit ledger', 'Immutable · SHA-256'],
    },
    results: {
      trigger: 'TX-88417', aml: 'Sanctions · 92%', kyc: 'UBO unverified', condition: 'Risk 86 · no', hold: 'CASE-2291', audit: '38 ms',
      streamAml: '0 hits', streamKyc: 'Verified', streamCondition: 'Risk 7 · yes', released: 'Released', skipped: 'Skipped',
    },
    today: 'today',
    ledger: 'Audit ledger', appendOnly: 'Append-only · hash-chained', logged: 'Logged in 38 ms',
    decisions: { released: 'Released', held: 'Held' },
    heldEvidence: 'Sanctions 92% · UBO unverified · CASE-2291',
    risk: 'risk',
    teamsTitle: 'AML case CASE-2291 opened', teamsBody: 'TX-88417 · $186,000 · held for review', teamsMeta: 'Compliance · SLA 4 h',
  },
  es: {
    flows: 'Flujos', flowName: 'Screening AML y KYC', designer: 'Diseñador', monitor: 'Monitor', perMinute: 'eventos/min',
    stream: 'Flujo de eventos',
    status: { running: 'Verificando', released: 'Liberada', held: 'Retenida' },
    nodes: {
      trigger: ['Al llegar una transferencia', 'Dataverse · evento'],
      aml: ['Screening AML', 'Sanciones · PEP · medios'],
      kyc: ['Verificación KYC', 'ID · UBO · score de riesgo'],
      condition: ['Condición', 'Score de riesgo < 60'],
      release: ['Liberar pago', 'API de pagos'],
      hold: ['Retener · abrir caso', 'Teams · Cumplimiento'],
      audit: ['Registrar en auditoría', 'Inmutable · SHA-256'],
    },
    results: {
      trigger: 'TX-88417', aml: 'Sanciones · 92%', kyc: 'UBO sin verificar', condition: 'Riesgo 86 · no', hold: 'CASE-2291', audit: '38 ms',
      streamAml: '0 coincidencias', streamKyc: 'Verificado', streamCondition: 'Riesgo 7 · sí', released: 'Liberado', skipped: 'Omitido',
    },
    today: 'hoy',
    ledger: 'Registro de auditoría', appendOnly: 'Solo anexar · encadenado por hash', logged: 'Registrado en 38 ms',
    decisions: { released: 'Liberada', held: 'Retenida' },
    heldEvidence: 'Sanciones 92% · UBO sin verificar · CASE-2291',
    risk: 'riesgo',
    teamsTitle: 'Caso AML CASE-2291 abierto', teamsBody: 'TX-88417 · $186,000 · retenida para revisión', teamsMeta: 'Cumplimiento · SLA 4 h',
  },
};

// Transfers, oldest first; TX-88417 is the one that stops.
const TRANSFERS = [
  { id: 'TX-88412', amount: '$9,800', lane: 'USD → COP' },
  { id: 'TX-88413', amount: '$31,500', lane: 'EUR → MXN' },
  { id: 'TX-88414', amount: '$12,400', lane: 'USD → MXN' },
  { id: 'TX-88415', amount: '$48,900', lane: 'EUR → COP' },
  { id: 'TX-88416', amount: '$7,250', lane: 'USD → BRL' },
  { id: 'TX-88417', amount: '$186,000', lane: 'AED → MXN', party: 'Oriente Trading FZE' },
  { id: 'TX-88418', amount: '$22,300', lane: 'USD → MXN' },
];
// The ledger: one row per decided transfer, each carrying the hash of the row before it.
const LEDGER = [
  { seq: 48209, time: '14:02:05.204', risk: 9, hash: '0x4d1e…a07', prev: '0x0b93…e5c' },
  { seq: 48210, time: '14:02:05.871', risk: 14, hash: '0x91c2…0be', prev: '0x4d1e…a07' },
  { seq: 48211, time: '14:02:06.530', risk: 11, hash: '0x7f3a…c21', prev: '0x91c2…0be' },
  { seq: 48212, time: '14:02:07.412', risk: 18, hash: '0x5ce0…9d4', prev: '0x7f3a…c21' },
  { seq: 48213, time: '14:02:08.066', risk: 7, hash: '0xa39b…112', prev: '0x5ce0…9d4' },
  { seq: 48214, time: '14:02:09.118', held: true, hash: '0x2b8e…f61', prev: '0xa39b…112' },
  { seq: 48215, time: '14:02:10.240', risk: 13, hash: '0xd604…7ac', prev: '0x2b8e…f61' },
];
const ICONS = { trigger: Zap, aml: ShieldAlert, kyc: Fingerprint, condition: GitBranch, release: Landmark, hold: CirclePause, audit: BookLock };
const fmt = value => value.toLocaleString('en-US');

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const stream = through('stream'), screen = through('screen'), decide = through('decide'), log = through('log'), resume = through('resume');
  const hero = screen >= 0;
  const state = (active, done) => (done ? 'done' : active ? 'running' : 'idle');
  const nodes = hero
    ? {
      trigger: state(screen >= 0, screen >= 1),
      aml: state(screen >= 1, screen >= 3),
      kyc: state(screen >= 1, screen >= 2),
      condition: state(decide >= 0, decide >= 1),
      release: decide >= 1 ? 'skipped' : 'idle',
      hold: state(decide >= 1, decide >= 2),
      audit: state(log >= 0, log >= 1),
    }
    // While transfers stream through, the canvas shows the last run: everything released, nothing held.
    : { trigger: 'done', aml: 'done', kyc: 'done', condition: 'done', release: 'done', hold: 'idle', audit: 'done' };
  // Stream: two earlier transfers, then one per streaming step, the held one, and the one released behind it.
  const arrived = 2 + Math.min(Math.max(stream, 0), 3) + hero + (resume >= 0);
  const status = i => {
    if (i === 5) return log >= 1 ? 'held' : 'running';
    if (i === 6) return resume >= 1 ? 'released' : 'running';
    return 'released';
  };
  const rows = 2 + Math.min(Math.max(stream, 0), 3) + (log >= 1) + (resume >= 1);
  return {
    hero,
    nodes,
    transfers: TRANSFERS.slice(0, arrived).map((transfer, i) => ({ ...transfer, status: status(i) })).reverse(),
    rows: LEDGER.slice(0, rows),
    releases: 18201 + Math.min(Math.max(stream, 0), 3) + (resume >= 1),
    holds: decide >= 2 ? 3 : 2,
    logged: log >= 1,
    teams: decide >= 2,
    throughput: THROUGHPUT[phase],
  };
}

export default function ComplianceFlow({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const result = id => {
    const state = data.nodes[id];
    if (state === 'skipped') return t.results.skipped;
    if (state !== 'done') return '';
    if (!data.hero) return { aml: t.results.streamAml, kyc: t.results.streamKyc, condition: t.results.streamCondition, release: t.results.released, trigger: 'TX-88416', audit: '31 ms' }[id];
    return t.results[id];
  };
  const tone = id => (data.hero && data.nodes[id] === 'done' ? { aml: 'red', kyc: 'warn', condition: 'warn', hold: 'warn' }[id] : undefined) || 'ok';
  const node = id => <Node key={id} id={id} t={t} state={data.nodes[id]} result={result(id)} tone={tone(id)}
    count={id === 'release' ? fmt(data.releases) : id === 'hold' ? data.holds : null} />;
  const link = (id, kind, targets) => {
    const states = targets.map(target => data.nodes[target]);
    return <Connector key={id} area={id} kind={kind} states={states} />;
  };

  return <div className={m.app} data-phase={phase} data-hero={data.hero}>
    <ProductBar section={t.flows} title={t.flowName}>
      <span className={m.modes}><span data-active="true">{t.designer}</span><span>{t.monitor}</span></span>
      <Pill icon={Zap} tone="ok"><LiveNumber value={data.throughput} decimals={0} /> {t.perMinute}</Pill>
    </ProductBar>

    <div className={m.body}>
      <section className={m.stream}>
        <header className={m.sectionHead}><b>{t.stream}</b></header>
        <ul className={m.events}>
          {data.transfers.map(({ id, amount, lane, status }) => <li key={id} data-status={status}>
            <span className={m.eventIcon}><ArrowLeftRight strokeWidth={2} /></span>
            <span className={m.eventText}><b>{id}</b><span>{amount}</span><span>{lane}</span></span>
            <span className={m.eventStatus}>{t.status[status]}</span>
          </li>)}
        </ul>
      </section>

      <section className={m.canvas}>
        <span className={m.runLabel}><b>{data.hero ? 'Run · TX-88417' : 'Run · TX-88416'}</b>{data.hero ? ' · Oriente Trading FZE · $186,000' : ''}</span>
        <div className={m.flow}>
          {node('trigger')}
          {link('f1', 'fork', ['aml', 'kyc'])}
          {node('aml')}
          {node('kyc')}
          {link('j1', 'join', ['aml', 'kyc'])}
          {node('condition')}
          {link('f2', 'fork', ['release', 'hold'])}
          {node('release')}
          {node('hold')}
          {link('j2', 'join', ['release', 'hold'])}
          {node('audit')}
        </div>
        <div className={m.teams} data-shown={data.teams}>
          <span className={m.teamsHead}><MessageSquare strokeWidth={2} />{t.nodes.hold[1]}</span>
          <b>{t.teamsTitle}</b>
          <span>{t.teamsBody}</span>
          <small>{t.teamsMeta}</small>
        </div>
      </section>

      <section className={m.ledger}>
        <header className={m.sectionHead}>
          <b>{t.ledger}</b>
          <span data-logged={data.logged}>{data.logged ? t.logged : t.appendOnly}</span>
        </header>
        <div className={m.ledgerBox}>
          <ol className={m.rows}>
            {data.rows.map((row, i) => {
              const newest = i === data.rows.length - 1;
              const linked = i === data.rows.length - 2;
              const transfer = TRANSFERS[i];
              return <li key={row.seq} data-decision={row.held ? 'held' : 'released'} data-newest={newest}>
                <span className={m.seq}>#{row.seq}</span>
                <time>{row.time}</time>
                <b>{transfer.id}</b>
                <span className={m.decision}>{row.held ? t.decisions.held : t.decisions.released}</span>
                <span className={m.evidence}>{row.held ? t.heldEvidence : `AML ✓ · KYC ✓ · ${t.risk} ${row.risk}`}</span>
                <span className={m.hash} data-linked={linked}>{row.hash}</span>
                <span className={m.prev} data-link={newest}><Link2 strokeWidth={2} />{row.prev}</span>
              </li>;
            })}
          </ol>
        </div>
      </section>
    </div>
  </div>;
}

/** A flow action on the canvas: connector icon, name and detail, then its run result (and a branch's count today). */
function Node({ id, t, state, result, tone, count }) {
  const Icon = ICONS[id];
  return <div className={m.node} data-node={id} data-state={state} data-tone={tone} style={{ gridArea: id }}>
    <span className={m.nodeIcon}><Icon strokeWidth={1.9} /></span>
    <span className={m.nodeText}><b>{t.nodes[id][0]}</b><span>{t.nodes[id][1]}</span></span>
    <span className={m.nodeFoot}>
      <span className={m.nodeResult}>
        {state === 'done' && (tone === 'ok' ? <Check strokeWidth={3} /> : <TriangleAlert strokeWidth={2.4} />)}
        {state === 'skipped' && <Minus strokeWidth={3} />}
        {result}
      </span>
      {count !== null && <span className={m.count}>{count} {t.today}</span>}
    </span>
    {state === 'running' && <span className={m.nodeBar} />}
  </div>;
}

/** A parallel fork or join between a single action and a pair of actions (top and bottom rows of the canvas).
 * A fork lights as its branch starts; a join once its branch has finished. */
function Connector({ area, kind, states }) {
  const lit = state => (kind === 'fork' ? state === 'running' || state === 'done' : state === 'done');
  const edge = state => (state === 'skipped' ? 'skipped' : lit(state) ? 'lit' : 'idle');
  // Row centres of the two 5.2em rows with a .8em gap: 23% and 77% of the pair's height.
  const paths = kind === 'fork' ? ['M0 50H50V23H100', 'M50 50V77H100'] : ['M0 23H50V50H100', 'M0 77H50V50'];
  return <svg className={m.connector} style={{ gridArea: area }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    {paths.map((d, i) => <path key={d} d={d} data-state={edge(states[i])} pathLength="100" />)}
  </svg>;
}
