'use client';

import React from 'react';
import { CloudLightning, Database, PlugZap, Route, ShieldCheck, Truck } from 'lucide-react';
import { Card, LiveNumber, Pill, ProductBar } from './ui/primitives';
import { AgentChat, AgentTurn, Answer, Composer, EventBubble, PolicyChip, Reasoning, Thought, ToolCall, TrailItem } from './ui/agent';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import c from './LogisticsCopilot.module.css';

/* NeuralBI · Logistics Copilot: the product behind "Autonomous Agents & Fleet Coordination": a Copilot Studio agent
 * seen the way an agent works. A port closure arrives as an event; the agent reasons in the open, grounds itself in the
 * warehouse data, asks the carrier and supplier APIs, checks its autonomy policy, reroutes and reassigns the fleet, then
 * answers with its sources. The live context beside it shows what each call touches in the business. */
const BEATS = [
  { id: 'event', duration: 1600 },
  { id: 'think', duration: 1800 },
  { id: 'query', duration: 2200 },
  { id: 'weigh', duration: 1800 },
  { id: 'apis', duration: 2000 },
  { id: 'policy', duration: 1600 },
  { id: 'act', duration: 2400 },
  { id: 'answer', duration: 2800 },
];
// Reasoning clock by beat, in seconds.
const CLOCK = { event: 0, think: 2, query: 4, weigh: 6, apis: 8, policy: 10, act: 12, answer: 14 };

const words = {
  en: {
    agents: 'Agents', title: 'Logistics Copilot', grounded: 'Grounded · wh.fabric', autonomy: 'Autonomous · ≤ $5k',
    event: 'Event · Port authority feed · 14:18', eventText: 'Veracruz port closed for 48 h · weather advisory',
    reasoning: 'Reasoning', reasoned: 'Reasoned for 14 s · 5 tool calls',
    thoughts: {
      think: 'Veracruz is closed for 48 h. First I need every in-transit shipment that depends on that port.',
      weigh: 'Waiting for the port adds 2.1 d. Manzanillo → Buenaventura avoids the gulf if a carrier has space and the supplier can load early.',
      policy: 'The reroute costs $3.2k more, under the $5k autonomy policy, so I can act without approval.',
    },
    policyOk: 'Policy ok · $3.2k ≤ $5k',
    results: { query: '3 rows · 64 ms', carrier: '2 slots · 180 ms', supplier: '06:00 · 95 ms', reroute: 'ETA +0.4 d', fleet: '3 trucks' },
    po: 'PO',
    answer: 'Veracruz is closed for 48 h, so I moved PO #4821, #4833 and #4840 to Manzanillo → Buenaventura and reassigned trucks T-07, T-12 and T-19. Delivery lands 0.4 d later, still within SLA.',
    sources: ['wh.shipments', 'Carrier API', 'Fleet plan'],
    actions: ['3 shipments rerouted', '3 trucks reassigned', '0 manual steps'],
    ask: 'Ask Logistics Copilot…', autonomous: 'Autonomous',
    lanes: 'Lanes', closed: 'Closed · 48 h', eta: 'ETA', sla: 'within SLA',
    fleet: 'Fleet allocation', week: 'This week', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], today: 'Today', local: 'Local',
  },
  es: {
    agents: 'Agentes', title: 'Copiloto Logístico', grounded: 'Conectado · wh.fabric', autonomy: 'Autónomo · ≤ $5k',
    event: 'Evento · Feed de la autoridad portuaria · 14:18', eventText: 'Puerto de Veracruz cerrado 48 h · alerta climática',
    reasoning: 'Razonamiento', reasoned: 'Razonó durante 14 s · 5 herramientas',
    thoughts: {
      think: 'Veracruz está cerrado 48 h. Primero necesito cada envío en tránsito que dependa de ese puerto.',
      weigh: 'Esperar al puerto suma 2.1 d. Manzanillo → Buenaventura evita el golfo si un transportista tiene cupo y el proveedor puede cargar antes.',
      policy: 'El desvío cuesta $3.2k más, por debajo de la política de autonomía de $5k, así que puedo actuar sin aprobación.',
    },
    policyOk: 'Política ok · $3.2k ≤ $5k',
    results: { query: '3 filas · 64 ms', carrier: '2 cupos · 180 ms', supplier: '06:00 · 95 ms', reroute: 'ETA +0.4 d', fleet: '3 camiones' },
    po: 'OC',
    answer: 'Veracruz está cerrado 48 h, así que moví las OC #4821, #4833 y #4840 a Manzanillo → Buenaventura y reasigné los camiones T-07, T-12 y T-19. La entrega llega 0.4 d después, dentro del SLA.',
    sources: ['wh.shipments', 'API transportista', 'Plan de flota'],
    actions: ['3 envíos redirigidos', '3 camiones reasignados', '0 pasos manuales'],
    ask: 'Pregúntale al Copiloto Logístico…', autonomous: 'Autónomo',
    lanes: 'Rutas', closed: 'Cerrado · 48 h', eta: 'ETA', sla: 'dentro del SLA',
    fleet: 'Asignación de flota', week: 'Esta semana', days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], today: 'Hoy', local: 'Local',
  },
};
// The agent's tool calls, as it names them, with the arguments it passes.
const TOOLS = {
  query: { icon: Database, name: 'query_warehouse', args: "SELECT po, truck FROM wh.shipments WHERE port = 'VER'" },
  carrier: { icon: PlugZap, name: 'carrier.capacity', args: '{ port: "MZO", week: 21 }' },
  supplier: { icon: PlugZap, name: 'supplier.ready', args: '{ supplier: "polimeros" }' },
  reroute: { icon: Route, name: 'reroute_shipments', args: '{ shipments: 3, via: "MZO→BUN" }' },
  fleet: { icon: Truck, name: 'update_fleet_plan', args: '["T-07", "T-12", "T-19"]' },
};
const ROWS = [['#4821', 'T-12'], ['#4833', 'T-07'], ['#4840', 'T-19']];
const PORTS = { MTY: [100, 26], VER: [137, 70], MZO: [44, 86], CTG: [262, 105], BUN: [225, 146], BOG: [272, 138] };
const PLANNED = 'M100 26C118 38 130 52 137 70C180 60 230 78 262 105C270 116 274 126 272 138';
const REROUTED = 'M100 26C82 44 58 66 44 86C90 130 170 150 225 146C240 138 256 136 272 138';
// Fleet bars: [left %, width %] before and after the agent's reallocation (same width: a moved pickup keeps its length);
// `po` marks the shipments it moved.
const FLEET = [
  { truck: 'T-07', driver: 'LO', bars: [{ po: '#4833', from: [6, 30], to: [24, 30] }] },
  { truck: 'T-12', driver: 'JR', bars: [{ po: '#4821', from: [30, 32], to: [40, 32] }] },
  { truck: 'T-19', driver: 'MA', bars: [{ po: '#4840', from: [54, 28], to: [62, 28] }] },
  { truck: 'T-23', driver: 'DV', bars: [{ from: [8, 24], place: 'MTY' }, { from: [58, 30], place: 'SAL' }] },
];
const count = text => text.split(' ').length;

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const tool = (beat, from, to) => through(beat) >= to ? 'done' : through(beat) >= from ? 'running' : null;
  return {
    index,
    thoughts: { think: through('think'), weigh: through('weigh'), policy: through('policy') },
    tools: {
      query: tool('query', 0, 1), carrier: tool('apis', 0, 1), supplier: tool('apis', 1, 2),
      reroute: tool('act', 0, 1), fleet: tool('act', 1, 2),
    },
    answer: through('answer'),
    clock: CLOCK[phase],
    route: through('act') >= 0 ? 'rerouted' : through('event') >= 1 ? 'blocked' : 'planned',
    affected: through('query') >= 1,
    moved: through('act') >= 1,
    focus: phase === 'apis' ? 'MZO' : null,
    eta: through('act') >= 0 ? 4.2 : 3.8,
  };
}

export default function LogisticsCopilot({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  // Per beat: how many pieces of work land (words, or tool replies), and how often.
  const [limit, every] = {
    event: [1, 700], think: [count(t.thoughts.think), 45], query: [1, 900], weigh: [count(t.thoughts.weigh), 45],
    apis: [2, 700], policy: [count(t.thoughts.policy), 45], act: [2, 1000], answer: [count(t.answer), 55],
  }[phase];
  const step = useBeatSteps(phase, live, limit, every);

  const data = readings(phase, step);
  const answering = data.answer >= 0;
  const answered = data.answer >= count(t.answer);
  const thought = id => data.thoughts[id] >= 0 && <Thought key={`thought-${id}`} text={t.thoughts[id]} shown={data.thoughts[id]}>
    {id === 'policy' && <PolicyChip shown={data.thoughts.policy >= count(t.thoughts.policy)}>{t.policyOk}</PolicyChip>}
  </Thought>;
  const call = id => data.tools[id] && <ToolCall key={`tool-${id}`} {...TOOLS[id]} state={data.tools[id]} result={t.results[id]}
    rows={id === 'query' ? ROWS.map(([po, truck]) => `${t.po} ${po} · ${truck}`) : undefined} />;

  return <div className={c.app} data-phase={phase}>
    <ProductBar section={t.agents} title={t.title}>
      <span className={c.grounded}><Pill icon={Database}>{t.grounded}</Pill></span>
      <Pill icon={ShieldCheck} tone="ok">{t.autonomy}</Pill>
    </ProductBar>

    <div className={c.body}>
      <AgentChat composer={<Composer placeholder={t.ask} toggle={t.autonomous} />}>
        <EventBubble icon={CloudLightning} head={t.event}>{t.eventText}</EventBubble>
        {data.index >= 1 && <AgentTurn name={t.title}>
          <Reasoning open={!answering} label={t.reasoning} clock={data.clock} closed={t.reasoned}
            trail={<>{Object.values(TOOLS).map(({ name }) => <TrailItem key={name}>{name}</TrailItem>)}<TrailItem policy>{t.policyOk}</TrailItem></>}>
            {thought('think')}
            {call('query')}
            {thought('weigh')}
            {call('carrier')}
            {call('supplier')}
            {thought('policy')}
            {call('reroute')}
            {call('fleet')}
          </Reasoning>
          {answering && <Answer text={t.answer} shown={data.answer} complete={answered} sources={t.sources} actions={t.actions} />}
        </AgentTurn>}
      </AgentChat>

      <aside className={c.context}>
        <Card title={t.lanes} action="MEX → COL" className={c.mapCard}>
          <LaneMap t={t} data={data} />
        </Card>
        <Card title={t.fleet} action={t.week} className={c.fleetCard}>
          <FleetPlan t={t} data={data} />
        </Card>
      </aside>
    </div>
  </div>;
}

/** Lanes MEX → COL: the planned sea route through Veracruz, closed, and the agent's route through the Pacific. */
function LaneMap({ t, data }) {
  return <div className={c.map} data-route={data.route}>
    <svg viewBox="0 0 320 160" aria-hidden="true">
      <defs>
        <pattern id="copilot-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" className={c.dot} /></pattern>
      </defs>
      <rect width="320" height="160" fill="url(#copilot-dots)" />
      <path d="M0 0H178C170 18 150 32 142 52C136 66 140 80 130 90C114 104 84 102 62 94C40 86 22 72 0 66Z" className={c.land} />
      <path d="M122 96C142 104 162 112 180 116S214 122 232 122" className={c.isthmus} />
      <path d="M320 94C298 92 276 98 260 104C246 110 236 122 228 134C222 144 219 154 220 160H320Z" className={c.land} />
      <path d={PLANNED} className={c.planned} />
      <path d={REROUTED} pathLength="100" className={c.rerouted} />
      {Object.entries(PORTS).map(([name, [x, y]]) => <g key={name} className={c.port}
        data-on={name === data.focus || (data.route === 'rerouted' && ['MZO', 'BUN'].includes(name))} data-closed={name === 'VER' && data.route !== 'planned'}>
        <circle cx={x} cy={y} r="3.4" />
        <text x={x + (name === 'MZO' ? -6 : 6)} y={y - 5} textAnchor={name === 'MZO' ? 'end' : 'start'}>{name}</text>
      </g>)}
      <g className={c.closure} data-shown={data.route !== 'planned'} transform="translate(137 70)">
        <path d="M-2.2-2.2 2.2 2.2M2.2-2.2-2.2 2.2" />
        <text x="8" y="13">{t.closed}</text>
      </g>
    </svg>
    <span className={c.eta}>
      <small>{t.eta} {t.po} #4821</small>
      <b><LiveNumber value={data.eta} suffix=" d" /></b>
      <span data-on={data.route === 'rerouted'}>{data.route === 'rerouted' ? `+0.4 d · ${t.sla}` : 'VER → CTG'}</span>
    </span>
  </div>;
}

/** The week's fleet plan: the shipments the agent found light up, then slide to their new pickups at Manzanillo. */
function FleetPlan({ t, data }) {
  return <div className={c.gantt}>
    <span className={c.days}><span />{t.days.map(day => <span key={day}>{day}</span>)}</span>
    {FLEET.map(({ truck, driver, bars }) => <span key={truck} className={c.lane}>
      <span className={c.truck}><b>{truck}</b><span>{driver}</span></span>
      <span className={c.track}>
        {bars.map(({ po, from, to, place }) => {
          const [left, width] = po && data.moved ? to : from;
          const state = !po ? 'idle' : data.moved ? 'moved' : data.affected ? 'affected' : 'idle';
          return <span key={po || place} className={c.bar} data-state={state} style={{ '--left': left, width: `${width}%` }}>
            {po ? `${t.po} ${po} · ${data.moved ? 'MZO' : 'VER'}` : `${t.local} · ${place}`}
          </span>;
        })}
      </span>
    </span>)}
    <span className={c.today}><span>{t.today}</span></span>
  </div>;
}
