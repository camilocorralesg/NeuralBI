'use client';

import React from 'react';
import { Ban, Database, FileText, Flag, Gauge, Network, ScrollText, ShieldCheck, Siren, Snowflake, UserCheck } from 'lucide-react';
import { Pill, ProductBar, Words } from './ui/primitives';
import { AgentChat, AgentTurn, Answer, Composer, EventBubble, PolicyChip, Reasoning, Thought, ToolCall, TrailItem } from './ui/agent';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import f from './FraudCopilot.module.css';

/* NeuralBI · Fraud Copilot — the product behind "Cognitive Fraud Copilots": a Copilot Studio agent that reasons in the
 * open and writes its compliance risk digest as it goes. A velocity alert sets it off; it pulls the hour's transactions,
 * finds a six-account mule ring structuring payments just under $10k to one new beneficiary, scores and flags the three
 * riskiest transfers, stops at its autonomy line (freezing needs a human) and publishes the digest. */
const BEATS = [
  { id: 'alert', duration: 1400 },
  { id: 'query', duration: 2200 },
  { id: 'link', duration: 2200 },
  { id: 'score', duration: 2200 },
  { id: 'policy', duration: 1800 },
  { id: 'act', duration: 2200 },
  { id: 'answer', duration: 2800 },
];
// Reasoning clock by beat, in seconds.
const CLOCK = { alert: 0, query: 3, link: 6, score: 9, policy: 12, act: 14, answer: 16 };
// A tool runs for this many steps after the thought before it has landed (45 ms steps: about half a second).
const TOOL_STEPS = 12;

const words = {
  en: {
    agents: 'Agents', title: 'Fraud Copilot', grounded: 'Grounded · Fabric transactions', autonomy: 'Autonomous · flag only',
    event: 'Alert · Transaction monitoring · 15:02', eventText: '14 transfers deviate from baseline · velocity 6.2σ',
    reasoning: 'Reasoning', reasoned: 'Reasoned for 16 s · 6 tool calls',
    thoughts: {
      query: 'Fourteen transfers in 38 minutes from accounts opened this month. I will pull the last hour of transactions.',
      score: 'Every amount sits just under the $10k reporting line and the beneficiary opened 9 days ago. That is structuring through a mule ring.',
      policy: 'Flagging transfers is within my autonomy. Freezing an account needs a human, so I will request approval.',
    },
    policyOk: 'Policy · flag only',
    results: { query: '14 rows · 42 ms', link: 'Ring of 6 · 1 beneficiary', score: '3 high · 11 medium', flag: '3 flagged', publish: 'Published', approval: 'Pending' },
    linkRows: ['Shared device · 3 accounts'],
    answer: 'I flagged 3 high-risk transfers ($28,700) sent by a ring of six new accounts to Brisa Import SAS, all just under the $10k threshold. The digest is in #compliance; freezing the beneficiary is waiting for your approval.',
    sources: ['Fabric · transactions', 'Link analysis', 'Risk model'],
    actions: ['3 transfers flagged', 'Digest published', 'Freeze pending approval'],
    ask: 'Ask Fraud Copilot…', autonomous: 'Autonomous',
    digest: 'Compliance risk digest', window: '15:00 – 16:00', drafting: 'Drafting', published: 'Published · #compliance',
    summary: 'Summary', summaryText: 'Structuring pattern: 14 sub-threshold transfers from a six-account ring to one new beneficiary. 3 flagged; freeze pending approval.',
    anomaly: 'Amount vs time · last hour', threshold: '$10k reporting threshold',
    network: 'Mule network', beneficiary: 'Brisa Import SAS', opened: 'opened 9 d ago', device: 'Shared device',
    flagged: 'Flagged transfers', score: 'Score', total: 'Total',
    recommended: 'Recommended actions',
    recs: [['Freeze beneficiary account', 'Needs approval'], ['Draft SAR', 'Ready'], ['Block device fingerprint', 'Done']],
  },
  es: {
    agents: 'Agentes', title: 'Copiloto de Fraude', grounded: 'Conectado · transacciones Fabric', autonomy: 'Autónomo · solo marcar',
    event: 'Alerta · Monitoreo transaccional · 15:02', eventText: '14 transferencias fuera de patrón · velocidad 6.2σ',
    reasoning: 'Razonamiento', reasoned: 'Razonó durante 16 s · 6 herramientas',
    thoughts: {
      query: 'Catorce transferencias en 38 minutos desde cuentas abiertas este mes. Voy a traer la última hora de transacciones.',
      score: 'Cada monto queda justo bajo el umbral de reporte de $10k y el beneficiario abrió hace 9 días. Es fraccionamiento a través de una red de mulas.',
      policy: 'Marcar transferencias está dentro de mi autonomía. Congelar una cuenta requiere a una persona, así que pediré aprobación.',
    },
    policyOk: 'Política · solo marcar',
    results: { query: '14 filas · 42 ms', link: 'Red de 6 · 1 beneficiario', score: '3 altas · 11 medias', flag: '3 marcadas', publish: 'Publicado', approval: 'Pendiente' },
    linkRows: ['Dispositivo compartido · 3 cuentas'],
    answer: 'Marqué 3 transferencias de alto riesgo ($28,700) enviadas por una red de seis cuentas nuevas a Brisa Import SAS, todas justo bajo el umbral de $10k. El digest está en #compliance; congelar al beneficiario espera tu aprobación.',
    sources: ['Fabric · transacciones', 'Análisis de vínculos', 'Modelo de riesgo'],
    actions: ['3 transferencias marcadas', 'Digest publicado', 'Congelación por aprobar'],
    ask: 'Pregúntale al Copiloto de Fraude…', autonomous: 'Autónomo',
    digest: 'Digest de riesgo de cumplimiento', window: '15:00 – 16:00', drafting: 'Redactando', published: 'Publicado · #compliance',
    summary: 'Resumen', summaryText: 'Patrón de fraccionamiento: 14 transferencias bajo el umbral desde una red de seis cuentas hacia un beneficiario nuevo. 3 marcadas; congelación por aprobar.',
    anomaly: 'Monto vs tiempo · última hora', threshold: 'Umbral de reporte $10k',
    network: 'Red de mulas', beneficiary: 'Brisa Import SAS', opened: 'abierta hace 9 d', device: 'Dispositivo compartido',
    flagged: 'Transferencias marcadas', score: 'Score', total: 'Total',
    recommended: 'Acciones recomendadas',
    recs: [['Congelar cuenta del beneficiario', 'Requiere aprobación'], ['Borrador de SAR', 'Listo'], ['Bloquear huella del dispositivo', 'Hecho']],
  },
};
// The agent's tool calls, as it names them, with the arguments it passes.
const TOOLS = {
  query: { icon: Database, name: 'query_transactions', args: '{ window: "1h", amount_lt: 10000, new_accounts: true }' },
  link: { icon: Network, name: 'graph.link_analysis', args: '{ accounts: 6, hops: 2 }' },
  score: { icon: Gauge, name: 'risk.score', args: '{ transfers: 14, model: "aml-v4" }' },
  flag: { icon: Flag, name: 'flag_transfers', args: '["TX-90211", "TX-90214", "TX-90219"]' },
  publish: { icon: FileText, name: 'publish_digest', args: '{ channel: "#compliance" }' },
  approval: { icon: UserCheck, name: 'request_approval', args: '{ action: "freeze", account: "Brisa Import SAS" }' },
};
const FLAGGED = [['TX-90211', '$9,850', 94], ['TX-90214', '$9,900', 92], ['TX-90219', '$8,950', 91]];
const REC_ICONS = [Snowflake, ScrollText, Ban];
const REC_STATES = ['approval', 'ready', 'done'];

// Transfers in the last hour ($, minutes): the hour's ordinary traffic, then the fourteen just under $10k.
const seeded = (seed => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; })(42);
const ORDINARY = Array.from({ length: 26 }, () => [300 + seeded() * 5600, seeded() * 60]);
const CLUSTER = Array.from({ length: 14 }, (_, i) => [9350 + seeded() * 600, 22 + i * 2.7 + seeded() * 1.5]);
const dotX = minute => 8 + minute * 4.75;
const dotY = amount => 78 - amount / 11000 * 70;
const THRESHOLD_Y = dotY(10000);
// Mule network: six accounts on the left, the beneficiary on the right, the device three of them share below.
const ACCOUNTS = ['…4471', '…0918', '…3306', '…7254', '…5129', '…8840'].map((id, i) => ({ id, y: 12 + i * 18 }));
const BENEFICIARY = [236, 52];
const DEVICE = [148, 112];
const SHARED = [1, 3, 4];
const count = text => text.split(' ').length;

function readings(phase, step, t) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const q = through('query'), l = through('link'), s = through('score'), p = through('policy'), a = through('act');
  const wq = count(t.thoughts.query), ws = count(t.thoughts.score), wp = count(t.thoughts.policy);
  const tool = (done, started) => (done ? 'done' : started ? 'running' : null);
  return {
    index,
    thoughts: { query: q, score: s, policy: p },
    tools: {
      query: tool(q >= wq + TOOL_STEPS, q >= wq),
      link: tool(l >= 2, l >= 0),
      score: tool(s >= ws + TOOL_STEPS, s >= ws),
      flag: tool(a >= 1, a >= 0),
      publish: tool(a >= 2, a >= 1),
      approval: tool(a >= 3, a >= 2),
    },
    policyShown: p >= wp,
    scatter: q >= wq + TOOL_STEPS,
    edges: Math.max(0, Math.min(l - 2, ACCOUNTS.length)),
    beneficiary: l >= 2,
    device: l >= ACCOUNTS.length + 2,
    flagged: s >= ws + TOOL_STEPS,
    published: a >= 2,
    recs: a >= 2,
    answer: through('answer'),
    clock: CLOCK[phase],
  };
}

export default function FraudCopilot({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  // Per beat: how many pieces of work land (words, a tool's run, graph edges), and how often.
  const [limit, every] = {
    alert: [0, 1000],
    query: [count(t.thoughts.query) + TOOL_STEPS, 45],
    link: [ACCOUNTS.length + 2, 260],
    score: [count(t.thoughts.score) + TOOL_STEPS, 45],
    policy: [count(t.thoughts.policy), 45],
    act: [3, 600],
    answer: [Math.max(count(t.answer), count(t.summaryText)), 55],
  }[phase];
  const step = useBeatSteps(phase, live, limit, every);
  const data = readings(phase, step, t);
  const answering = data.answer >= 0;
  const answered = data.answer >= count(t.answer);

  const thought = id => data.thoughts[id] >= 0 && <Thought key={id} text={t.thoughts[id]} shown={data.thoughts[id]}>
    {id === 'policy' && <PolicyChip shown={data.policyShown}>{t.policyOk}</PolicyChip>}
  </Thought>;
  const call = id => data.tools[id] && <ToolCall key={id} {...TOOLS[id]} state={data.tools[id]} result={t.results[id]}
    rows={id === 'link' ? t.linkRows : undefined} />;

  return <div className={f.app} data-phase={phase}>
    <ProductBar section={t.agents} title={t.title}>
      <span className={f.grounded}><Pill icon={Database}>{t.grounded}</Pill></span>
      <Pill icon={ShieldCheck} tone="ok">{t.autonomy}</Pill>
    </ProductBar>

    <div className={f.body}>
      <AgentChat composer={<Composer placeholder={t.ask} toggle={t.autonomous} />}>
        <EventBubble icon={Siren} head={t.event}>{t.eventText}</EventBubble>
        {data.index >= 1 && <AgentTurn name={t.title}>
          <Reasoning open={!answering} label={t.reasoning} clock={data.clock} closed={t.reasoned}
            trail={<>{Object.values(TOOLS).map(({ name }) => <TrailItem key={name}>{name}</TrailItem>)}<TrailItem policy>{t.policyOk}</TrailItem></>}>
            {thought('query')}
            {call('query')}
            {call('link')}
            {thought('score')}
            {call('score')}
            {thought('policy')}
            {call('flag')}
            {call('publish')}
            {call('approval')}
          </Reasoning>
          {answering && <Answer text={t.answer} shown={data.answer} complete={answered} sources={t.sources} actions={t.actions} />}
        </AgentTurn>}
      </AgentChat>

      <article className={f.digest} data-status={data.published ? 'published' : 'drafting'}>
        <header className={f.digestHead}>
          <span className={f.digestIcon}><FileText strokeWidth={1.9} /></span>
          <span className={f.digestTitle}><b>{t.digest}</b><span>{t.window}</span></span>
          <Pill tone={data.published ? 'ok' : 'idle'}>{data.published ? t.published : t.drafting}</Pill>
        </header>

        <section className={f.summary} data-ready={answering}>
          <small>{t.summary}</small>
          {answering
            ? <p><Words text={t.summaryText} shown={data.answer} /></p>
            : <span className={f.placeholder}><i /><i /></span>}
        </section>

        <section className={f.block} data-ready={data.scatter}>
          <small>{t.anomaly}</small>
          <svg viewBox="0 0 300 82" className={f.scatter} aria-hidden="true">
            <path d={`M0 ${THRESHOLD_Y}H300`} className={f.threshold} vectorEffect="non-scaling-stroke" />
            <text x="296" y={THRESHOLD_Y - 3} className={f.thresholdLabel}>{t.threshold}</text>
            {ORDINARY.map(([amount, minute], i) => <circle key={`o${i}`} cx={dotX(minute)} cy={dotY(amount)} r="2.2" className={f.dot} style={{ '--i': i }} />)}
            {CLUSTER.map(([amount, minute], i) => <circle key={`c${i}`} cx={dotX(minute)} cy={dotY(amount)} r="2.6" className={f.dot} data-cluster="true" style={{ '--i': i + 10 }} />)}
          </svg>
        </section>

        <section className={f.block} data-ready={data.beneficiary}>
          <small>{t.network}</small>
          <svg viewBox="0 0 300 126" className={f.network} aria-hidden="true">
            {ACCOUNTS.map(({ id, y }, i) => <path key={`e${id}`} d={`M58 ${y}C140 ${y} 150 ${BENEFICIARY[1]} ${BENEFICIARY[0] - 10} ${BENEFICIARY[1]}`} pathLength="100"
              className={f.edge} data-drawn={data.edges > i} />)}
            {SHARED.map(i => <path key={`d${i}`} d={`M58 ${ACCOUNTS[i].y}Q100 ${DEVICE[1]} ${DEVICE[0] - 9} ${DEVICE[1]}`} pathLength="100"
              className={f.deviceEdge} data-drawn={data.device} />)}
            {ACCOUNTS.map(({ id, y }) => <g key={id} className={f.account}><circle cx="52" cy={y} r="5" /><text x="42" y={y + 3}>{id}</text></g>)}
            <g className={f.device} data-shown={data.device}>
              <rect x={DEVICE[0] - 9} y={DEVICE[1] - 7} width="18" height="14" rx="3" />
              <text x={DEVICE[0] + 14} y={DEVICE[1] + 3}>{t.device}</text>
            </g>
            <g className={f.beneficiary} data-risk={data.beneficiary}>
              <circle cx={BENEFICIARY[0]} cy={BENEFICIARY[1]} r="10" />
              <text x={BENEFICIARY[0]} y={BENEFICIARY[1] + 24} textAnchor="middle" className={f.beneficiaryName}>{t.beneficiary}</text>
              <text x={BENEFICIARY[0]} y={BENEFICIARY[1] + 35} textAnchor="middle">{t.opened}</text>
            </g>
          </svg>
        </section>

        <div className={f.split}>
          <section className={f.block} data-ready={data.flagged}>
            <small>{t.flagged}</small>
            <ul className={f.flagged}>
              {FLAGGED.map(([id, amount, score], i) => <li key={id} style={{ '--i': i }}>
                <b>{id}</b><span>{amount}</span><em>{score}</em>
              </li>)}
              <li className={f.total}><span>{t.total}</span><b>$28,700</b></li>
            </ul>
          </section>
          <section className={f.block} data-ready={data.recs}>
            <small>{t.recommended}</small>
            <ul className={f.recs}>
              {t.recs.map(([action, state], i) => {
                const Icon = REC_ICONS[i];
                return <li key={action} data-state={REC_STATES[i]}><Icon strokeWidth={2} /><span>{action}</span><em>{state}</em></li>;
              })}
            </ul>
          </section>
        </div>
      </article>
    </div>
  </div>;
}
