'use client';

import React from 'react';
import {
  Activity, CalendarCheck, CalendarDays, Check, CircleCheck, ClipboardList, PackageCheck, ShoppingCart, TriangleAlert,
  UserSearch, Warehouse, Workflow, Wrench, X,
} from 'lucide-react';
import { LiveNumber, Pill, ProductBar } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import m from './MaintenanceFlow.module.css';

/* NeuralBI Flows · Autonomous maintenance — the product behind "Autonomous Maintenance Flows": the Power Automate flow
 * behind work order WO-5531 of the Line Monitor. IMM-02's pump bearing crosses its wear threshold, Activator fires the
 * flow, and two parallel branches do the rest: one reserves the parts in the storeroom and re-orders the bearing that
 * drops below its minimum, the other finds the one technician qualified and free at 22:00, books her and waits for her
 * to accept. Each branch sits above the business system it changes. */
const BEATS = [
  { id: 'trigger', duration: 2400 },
  { id: 'lookup', duration: 1800 },
  { id: 'branches', duration: 3600 },
  { id: 'confirm', duration: 2400 },
  { id: 'hold', duration: 2400 },
];
// Per beat: how many things land (the climb, the parts list, the branch actions, acceptance and the work order), and how often.
const STEPS = { trigger: [3, 650], lookup: [1, 800], branches: [4, 750], confirm: [2, 900], hold: [0, 1000] };
const ELAPSED = { trigger: 1, lookup: 3, branches: 12, confirm: 27 };

const words = {
  en: {
    flows: 'Flows', flowName: 'Autonomous maintenance · IMM-02', designer: 'Designer', history: 'Run history',
    run: 'Run #3318', running: 'Running', succeeded: 'Succeeded',
    nodes: {
      trigger: ['When wear crosses a threshold', 'Activator · IMM-02 pump bearing'],
      parts: ['Get spare parts list', 'Dataverse · IMM-02 bill of materials'],
      stock: ['Check stock and reserve', 'Dynamics 365 · Storeroom MTY'],
      order: ['Create purchase order', 'Bearing below minimum'],
      find: ['Find a qualified technician', 'Field Service · skills and shift'],
      book: ['Book and wait for acceptance', 'Schedule board · Teams card'],
      update: ['Update work order', 'Dynamics 365 · WO-5531'],
    },
    results: {
      trigger: 'Fired · 14:07:32', parts: '2 parts', stock: '2 reserved', order: 'PO-7712', find: 'Ana Ríos',
      book: 'Accepted · 14:08:04', waiting: '22:00 · awaiting', update: 'Ready · 22:00',
    },
    lanes: { parts: 'Spare parts', tech: 'Technician' },
    threshold: '7.1 mm/s',
    storeroom: 'Storeroom · MTY', d365: 'Dynamics 365',
    partNames: ['Bearing 6310-2RS', 'Seal kit HP-40'], bin: 'Bin', free: 'free', min: 'min',
    po: 'PO-7712', poText: '4 × 6310-2RS · Rodamientos del Norte', eta: 'ETA 06:30',
    board: 'Schedule board · today', fieldService: 'Field Service',
    skills: ['Vibration II · bearings', 'Hydraulics', 'Electrical'],
    status: { match: 'Best match', accepted: 'Accepted', noSkill: 'Not certified', off: 'Off shift' },
  },
  es: {
    flows: 'Flujos', flowName: 'Mantenimiento autónomo · IMM-02', designer: 'Diseñador', history: 'Historial',
    run: 'Ejecución #3318', running: 'En curso', succeeded: 'Correcto',
    nodes: {
      trigger: ['Cuando el desgaste cruza un umbral', 'Activator · rodamiento bomba IMM-02'],
      parts: ['Obtener lista de repuestos', 'Dataverse · lista de materiales IMM-02'],
      stock: ['Verificar stock y reservar', 'Dynamics 365 · Almacén MTY'],
      order: ['Crear orden de compra', 'Rodamiento bajo el mínimo'],
      find: ['Buscar técnico calificado', 'Field Service · habilidad y turno'],
      book: ['Agendar y esperar aceptación', 'Tablero · tarjeta de Teams'],
      update: ['Actualizar orden de trabajo', 'Dynamics 365 · WO-5531'],
    },
    results: {
      trigger: 'Disparado · 14:07:32', parts: '2 piezas', stock: '2 reservadas', order: 'PO-7712', find: 'Ana Ríos',
      book: 'Aceptada · 14:08:04', waiting: '22:00 · en espera', update: 'Lista · 22:00',
    },
    lanes: { parts: 'Repuestos', tech: 'Técnico' },
    threshold: '7.1 mm/s',
    storeroom: 'Almacén · MTY', d365: 'Dynamics 365',
    partNames: ['Rodamiento 6310-2RS', 'Kit de sellos HP-40'], bin: 'Ubic.', free: 'disp.', min: 'mín.',
    po: 'PO-7712', poText: '4 × 6310-2RS · Rodamientos del Norte', eta: 'ETA 06:30',
    board: 'Tablero de programación · hoy', fieldService: 'Field Service',
    skills: ['Vibración II · rodamientos', 'Hidráulica', 'Eléctrica'],
    status: { match: 'Mejor opción', accepted: 'Aceptada', noSkill: 'Sin certificación', off: 'Fuera de turno' },
  },
};
const ICONS = {
  trigger: Activity, parts: ClipboardList, stock: PackageCheck, order: ShoppingCart, find: UserSearch, book: CalendarCheck,
  update: Wrench,
};

// The bearing's vibration RMS (mm/s): steady, then the climb that crosses the 7.1 mm/s wear threshold in three steps.
const sparkY = rms => 33 - rms * 3.8;
const HISTORY = [2.6, 2.7, 2.5, 2.8, 2.6, 2.7, 2.9, 2.7, 2.8];
const CLIMB = [4.4, 5.8, 7.4];
const smooth = pts => pts.reduce((d, [x, y], i, all) => {
  if (!i) return `M${x} ${y}`;
  const [px, py] = all[i - 1], handle = (x - px) / 2;
  return `${d}C${px + handle} ${py} ${x - handle} ${y} ${x} ${y}`;
}, '');
const HISTORY_PATH = smooth(HISTORY.map((rms, i) => [i * 8, sparkY(rms)]));
const CLIMB_PATH = smooth([[64, sparkY(HISTORY[HISTORY.length - 1])], ...CLIMB.map((rms, i) => [80 + i * 16, sparkY(rms)])]);

// Storeroom: eight slots per bin. Reserving one bearing leaves one free, under its minimum of two; the seal kit stays over three.
const PARTS = [
  { sku: '6310-2RS', bin: 'A-14', onHand: 2, min: 2, incoming: 4 },
  { sku: 'HP-40', bin: 'C-03', onHand: 6, min: 3, incoming: 0 },
];
const SLOTS = 8;
// Schedule board from 16:00 to 24:00; Ana is the only one with the bearing certification and free at 22:00.
const FROM = 16, HOURS = 8;
const TECHS = [
  { name: 'Ana Ríos', bookings: [[16.5, 18], [19, 20]] },
  { name: 'Luis Mena', bookings: [[16, 19.5], [20.5, 22]] },
  { name: 'Diego Paz', off: true, bookings: [] },
];
const BOOKING = [22, 23.5];
const span = ([from, to]) => ({ left: `${(from - FROM) / HOURS * 100}%`, width: `${(to - from) / HOURS * 100}%` });

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const trigger = through('trigger'), lookup = through('lookup'), branches = through('branches'), confirm = through('confirm');
  const state = (started, done) => (done ? 'done' : started ? 'running' : 'idle');
  const climb = Math.min(Math.max(trigger, 0), 3);
  return {
    nodes: {
      trigger: state(trigger >= 0, trigger >= 3),
      parts: state(lookup >= 0, lookup >= 1),
      stock: state(branches >= 0, branches >= 1),
      find: state(branches >= 0, branches >= 2),
      order: state(branches >= 1, branches >= 3),
      book: state(branches >= 2, confirm >= 1),
      update: state(confirm >= 1, confirm >= 2),
    },
    climb,
    rms: climb ? CLIMB[climb - 1] : HISTORY[HISTORY.length - 1],
    needed: lookup >= 1,
    reserved: branches >= 1,
    picked: branches >= 2,
    ordered: branches >= 3,
    booked: branches >= 4,
    accepted: confirm >= 1,
    done: confirm >= 2,
    elapsed: ELAPSED[phase],
  };
}

/** A bin's slots: 'free' | 'reserved' (for WO-5531, the last unit on hand) | 'incoming' (on the purchase order) | 'empty'. */
function slots({ onHand, incoming }, reserved, ordered) {
  return Array.from({ length: SLOTS }, (_, i) => {
    if (i < onHand) return reserved && i === onHand - 1 ? 'reserved' : 'free';
    if (i < onHand + incoming) return ordered ? 'incoming' : 'empty';
    return 'empty';
  });
}

export default function MaintenanceFlow({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const { nodes } = data;
  const result = id => {
    if (nodes[id] === 'done') return t.results[id];
    return id === 'book' && data.booked ? t.results.waiting : '';
  };
  const node = (id, children) => <Node id={id} t={t} state={nodes[id]} result={result(id)} tone={id === 'trigger' ? 'warn' : 'ok'}>{children}</Node>;
  const link = (target, className = '') => <span className={`${m.link} ${className}`} data-state={nodes[target]} />;
  const lit = on => (on ? 'lit' : 'idle');
  const lane = i => {
    if (!data.picked) return 'idle';
    if (i === 0) return data.accepted ? 'accepted' : 'match';
    return i === 1 ? 'noSkill' : 'off';
  };

  return <div className={m.app} data-phase={phase}>
    <ProductBar section={t.flows} title={t.flowName}>
      <span className={m.modes}><span data-active="true">{t.designer}</span><span>{t.history}</span></span>
      <Pill icon={data.done ? CircleCheck : Workflow} tone={data.done ? 'ok' : 'idle'}>
        {t.run} · {data.done ? `${t.succeeded} · 32 s` : <>{t.running} · <LiveNumber value={data.elapsed} decimals={0} suffix=" s" /></>}
      </Pill>
    </ProductBar>

    <div className={m.body}>
      <div className={m.canvas}>
        <div className={m.flow}>
          <div className={m.spine}>
            {node('trigger', <Spark t={t} data={data} />)}
            {link('parts')}
            {node('parts')}
          </div>
          <svg className={m.fork} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0V5H25V10" data-state={lit(nodes.stock !== 'idle')} />
            <path d="M50 5H75V10" data-state={lit(nodes.find !== 'idle')} />
          </svg>
          <div className={m.branch}>
            <span className={m.branchLabel} data-state={lit(nodes.stock !== 'idle')}>{t.lanes.parts}</span>
            {node('stock')}
            {link('order')}
            {node('order')}
          </div>
          <div className={m.branch}>
            <span className={m.branchLabel} data-state={lit(nodes.find !== 'idle')}>{t.lanes.tech}</span>
            {node('find')}
            {link('book')}
            {node('book')}
          </div>
          <svg className={m.fork} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
            <path d="M25 0V5H50V10" data-state={lit(nodes.order === 'done')} />
            <path d="M75 0V5H50" data-state={lit(nodes.book === 'done')} />
          </svg>
          <div className={m.spine}>{node('update')}</div>
        </div>
      </div>

      <div className={m.systems}>
        <section className={m.panel}>
          <header className={m.panelHead}>
            <span className={m.panelIcon}><Warehouse strokeWidth={2} /></span><b>{t.storeroom}</b><span>{t.d365}</span>
          </header>
          <ul className={m.bins}>
            {PARTS.map((part, i) => {
              const free = part.onHand - (data.reserved ? 1 : 0);
              return <li key={part.sku} data-needed={data.needed} data-low={free < part.min}>
                <span className={m.binText}><b>{t.partNames[i]}</b><span>{t.bin} {part.bin} · {t.min} {part.min}</span></span>
                <span className={m.slots} style={{ '--min': part.min }}>
                  {slots(part, data.reserved, data.ordered).map((kind, j) => <i key={j} data-cell={kind} />)}
                  <span className={m.minMark} />
                </span>
                <span className={m.binCount}><LiveNumber value={free} decimals={0} /> {t.free}</span>
              </li>;
            })}
          </ul>
          <span className={m.po} data-po={data.ordered}>
            <ShoppingCart strokeWidth={2} /><b>{t.po}</b><span>{t.poText}</span><em>{t.eta}</em>
          </span>
        </section>

        <section className={m.panel}>
          <header className={m.panelHead}>
            <span className={m.panelIcon}><CalendarDays strokeWidth={2} /></span><b>{t.board}</b><span>{t.fieldService}</span>
          </header>
          <div className={m.board}>
            <span className={m.axis}>{[16, 18, 20, 22, 24].map(hour => <span key={hour} style={{ left: `${(hour - FROM) / HOURS * 100}%` }}>{hour}:00</span>)}</span>
            <ul className={m.lanes}>
              {TECHS.map((tech, i) => {
                const status = lane(i);
                return <li key={tech.name} data-lane={i} data-status={status} data-off={!!tech.off}>
                  <span className={m.tech}><b>{tech.name}</b><span>{t.skills[i]}</span></span>
                  <span className={m.laneStatus}>
                    {(status === 'noSkill' || status === 'off') && <X strokeWidth={2.6} />}
                    {status === 'accepted' && <Check strokeWidth={3} />}
                    {status === 'idle' ? '' : t.status[status]}
                  </span>
                  <span className={m.track}>
                    {tech.bookings.map(booking => <i key={booking[0]} className={m.booking} style={span(booking)} />)}
                    {i === 0 && <span className={m.newBooking} style={span(BOOKING)} data-booking="WO-5531" data-shown={data.booked} data-accepted={data.accepted}>
                      {data.accepted && <Check strokeWidth={3} />}WO-5531
                    </span>}
                  </span>
                </li>;
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>;
}

/** A flow action: connector icon, name and detail, anything the action shows inline, then its run result. */
function Node({ id, t, state, result, tone, children }) {
  const Icon = ICONS[id];
  return <div className={m.node} data-node={id} data-state={state} data-tone={tone}>
    <span className={m.nodeIcon}><Icon strokeWidth={1.9} /></span>
    <span className={m.nodeText}><b>{t.nodes[id][0]}</b><span>{t.nodes[id][1]}</span></span>
    {children}
    <span className={m.nodeResult} data-waiting={state === 'running'}>{result}</span>
    <span className={m.nodeMark}>{state === 'done' && (tone === 'warn' ? <TriangleAlert strokeWidth={2.4} /> : <Check strokeWidth={3} />)}</span>
    {state === 'running' && id !== 'trigger' && <span className={m.nodeBar} />}
  </div>;
}

/** The trigger's own signal: the bearing's vibration climbing through the wear threshold, amber above it. */
function Spark({ t, data }) {
  const offset = 100 - data.climb / 3 * 100;
  return <span className={m.spark} data-over={data.climb >= 3}>
    <svg viewBox="0 0 112 36" aria-hidden="true">
      <defs>
        <clipPath id="maintenance-over"><rect x="0" y="0" width="112" height={sparkY(7.1)} /></clipPath>
      </defs>
      <path d={`M0 ${sparkY(7.1)}H112`} className={m.threshold} />
      <path d={HISTORY_PATH} className={m.history} />
      <path d={CLIMB_PATH} pathLength="100" className={m.climb} style={{ strokeDashoffset: offset }} />
      <path d={CLIMB_PATH} pathLength="100" className={m.over} style={{ strokeDashoffset: offset }} clipPath="url(#maintenance-over)" />
    </svg>
    <span className={m.sparkValue}><LiveNumber value={data.rms} suffix=" mm/s" /><small>&gt; {t.threshold}</small></span>
  </span>;
}
