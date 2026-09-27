'use client';

import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowLeftRight, Building2, CalendarDays, ChevronDown, Coins, Database, Gauge, Landmark, RefreshCw, ShieldCheck,
  TriangleAlert, Workflow, X,
} from 'lucide-react';
import { Card, Cursor, KpiCard, LiveNumber, Pill, ProductBar, StatusChip } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import m from './LiquidityMonitor.module.css';

/* NeuralBI · Liquidity Monitor: the product behind "Real-Time Liquidity Telemetry": a Power BI report over Direct Lake.
 * A LatAm treasury watches cross-border flows, reserves and intraday risk; a EUR → MXN settlement spike eats the
 * headroom, the treasurer cross-filters the report to MXN from the flows visual and runs a USD → MXN sweep from it. */
const BEATS = [
  { id: 'stream', duration: 3000 },
  { id: 'spike', duration: 2200 },
  { id: 'focus', duration: 2400 },
  { id: 'act', duration: 2800 },
  { id: 'hold', duration: 2000 },
];
// Per beat: how many things land (probe readings, the cross-filter, the sweep), and how often.
const STEPS = { stream: [4, 650], spike: [0, 1000], focus: [1, 1250], act: [1, 1750], hold: [0, 1000] };

const words = {
  en: {
    reports: 'Reports', title: 'Liquidity Monitor', refreshed: 'Refreshed',
    entity: 'Entity', allEntities: 'All entities', currency: 'Currency', all: 'All', date: 'Date', today: 'Today · intra-day',
    position: 'Liquidity position', headroom: 'Headroom to limit', flows: 'Net FX flows', lcr: 'LCR',
    vsOpen: 'vs open', limit: 'limit $1.70B', corridors: '14 corridors', floor: 'floor 125%',
    intraday: 'Intraday liquidity', todayShort: 'Today', limitLine: 'Intraday limit', now: 'Now',
    sankey: 'Cross-border flows', reserves: 'Treasury reserves', vsTarget: 'vs target',
    risk: 'Intraday risk', var: 'VaR 99%', exposure: 'FX exposure', ofLimit: 'of limit', queue: 'Settlement queue', payments: 'payments',
    alerts: 'Alerts', viewAll: 'View all',
    refresh: 'Direct Lake refresh', refreshSub: '2.1M rows', settled: 'USD → COP settled', settledSub: 'Bogotá · 14:18',
    lcrOk: 'LCR above floor', lcrOkSub: 'Group · 14:00',
    spikeTitle: 'Settlement spike', spikeSub: 'EUR → MXN · 14:32',
    sweep: 'Sweep USD → MXN', sweepSub: 'Restores the MXN pool', run: 'Run', done: 'Done',
    executed: 'Sweep executed', executedSub: '14:32:14 · Power Automate',
    restored: 'Headroom restored', restoredSub: '$118M over limit', restoredChip: 'Resolved',
    pages: ['Overview', 'FX corridors', 'Reserves', 'Risk'],
  },
  es: {
    reports: 'Reportes', title: 'Monitor de Liquidez', refreshed: 'Actualizado',
    entity: 'Entidad', allEntities: 'Todas', currency: 'Divisa', all: 'Todas', date: 'Fecha', today: 'Hoy · intradía',
    position: 'Posición de liquidez', headroom: 'Margen sobre el límite', flows: 'Flujos FX netos', lcr: 'LCR',
    vsOpen: 'vs apertura', limit: 'límite $1.70B', corridors: '14 corredores', floor: 'mínimo 125%',
    intraday: 'Liquidez intradía', todayShort: 'Hoy', limitLine: 'Límite intradía', now: 'Ahora',
    sankey: 'Flujos transfronterizos', reserves: 'Reservas de tesorería', vsTarget: 'vs objetivo',
    risk: 'Riesgo intradía', var: 'VaR 99%', exposure: 'Exposición FX', ofLimit: 'del límite', queue: 'Cola de liquidación', payments: 'pagos',
    alerts: 'Alertas', viewAll: 'Ver todo',
    refresh: 'Actualización Direct Lake', refreshSub: '2.1M filas', settled: 'USD → COP liquidado', settledSub: 'Bogotá · 14:18',
    lcrOk: 'LCR sobre el mínimo', lcrOkSub: 'Grupo · 14:00',
    spikeTitle: 'Pico de liquidación', spikeSub: 'EUR → MXN · 14:32',
    sweep: 'Barrido USD → MXN', sweepSub: 'Repone el pool MXN', run: 'Ejecutar', done: 'Hecho',
    executed: 'Barrido ejecutado', executedSub: '14:32:14 · Power Automate',
    restored: 'Margen restablecido', restoredSub: '$118M sobre el límite', restoredChip: 'Resuelto',
    pages: ['Resumen', 'Corredores FX', 'Reservas', 'Riesgo'],
  },
};

// Intraday liquidity ($B), every half hour from 09:00 to 14:00; "now" is 14:30. The day spans 09:00–17:00 on a 300-wide chart.
const HISTORY = [1.79, 1.8, 1.82, 1.81, 1.83, 1.82, 1.85, 1.84, 1.86, 1.85, 1.84];
const LIMIT = 1.7;
const atHour = hours => (hours - 9) * 37.5;
const NOW_X = atHour(14.5);
const toY = value => 105 - (value - 1.65) * 380;
const time = i => `${String(9 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`;
// Smooth curve through the points, with horizontal control handles (no overshoot).
const smooth = pts => pts.reduce((d, [x, y], i, all) => {
  if (!i) return `M${x} ${y}`;
  const [px, py] = all[i - 1], handle = (x - px) / 2;
  return `${d}C${px + handle} ${py} ${x - handle} ${y} ${x} ${y}`;
}, '');
const historyPoints = HISTORY.map((value, i) => [i * 18.75, toY(value)]);
const HISTORY_PATH = smooth(historyPoints);
const LAST = historyPoints[historyPoints.length - 1];
// Where the day goes from now, by state: the tail to 14:30, then the projection to 17:00 (dashed).
const POSITION = { steady: 1.84, risk: 1.778, swept: 1.818 };
const PROJECTION = { steady: [1.85, 1.86, 1.88], risk: [1.76, 1.73, 1.72], swept: [1.83, 1.85, 1.86] };
const tail = state => smooth([LAST, [NOW_X, toY(POSITION[state])]]);
const projection = state => smooth([[NOW_X, toY(POSITION[state])], ...PROJECTION[state].map((value, i) => [atHour(15.5 + i * .75), toY(value)])]);

// Cross-border flows today ($M): sources on the left, destinations on the right, corridors between them.
const SOURCES = [['USD', 84], ['EUR', 80], ['GBP', 22]];
const TARGETS = [['MXN', 102], ['COP', 24], ['BRL', 28], ['USD', 32]];
const LINKS = [['USD', 'MXN', 40], ['USD', 'COP', 24], ['USD', 'BRL', 20], ['EUR', 'MXN', 62], ['EUR', 'USD', 18], ['GBP', 'BRL', 8], ['GBP', 'USD', 14]];
const K = .62;
const stack = (list, gap) => {
  let y = 5;
  return list.map(([id, value]) => { const node = { id, value, y, h: value * K }; y += node.h + gap; return node; });
};
const SRC = stack(SOURCES, 12);
const DST = stack(TARGETS, 8);
const RIBBONS = (() => {
  const out = Object.fromEntries(SRC.map(node => [node.id, node.y]));
  const into = Object.fromEntries(DST.map(node => [node.id, node.y]));
  const order = id => TARGETS.findIndex(([target]) => target === id);
  const bySource = [...LINKS].sort((a, b) => SOURCES.findIndex(([s]) => s === a[0]) - SOURCES.findIndex(([s]) => s === b[0]) || order(a[1]) - order(b[1]));
  const ribbons = bySource.map(([from, to, value]) => {
    const w = value * K, y0 = out[from] + w / 2;
    out[from] += w;
    return { id: `${from}-${to}`, from, to, value, w, y0 };
  });
  [...ribbons].sort((a, b) => order(a.to) - order(b.to) || SOURCES.findIndex(([s]) => s === a.from) - SOURCES.findIndex(([s]) => s === b.from))
    .forEach(ribbon => { ribbon.y1 = into[ribbon.to] + ribbon.w / 2; into[ribbon.to] += ribbon.w; });
  return ribbons.map(ribbon => ({ ...ribbon, d: `M8 ${ribbon.y0}C150 ${ribbon.y0} 150 ${ribbon.y1} 292 ${ribbon.y1}`, mid: (ribbon.y0 + ribbon.y1) / 2 }));
})();

const POOLS = ['USD', 'EUR', 'MXN', 'COP', 'BRL'];
const TARGET = [700, 420, 250, 80, 100];
const POOL_MAX = 900;

function readings(phase, step) {
  const swept = (phase === 'act' && step >= 1) || phase === 'hold';
  const risky = !swept && phase !== 'stream';
  const filtered = (phase === 'focus' && step >= 1) || phase === 'act' || phase === 'hold';
  const state = swept ? 'swept' : risky ? 'risk' : 'steady';
  const pick = (steady, risk, done) => (swept ? done : risky ? risk : steady);
  return {
    state, risky, swept, filtered,
    position: POSITION[state],
    headroom: pick(140, 78, 118),
    flows: pick(212, 150, 190),
    lcr: pick(134, 121, 129),
    reserves: [pick(820, 820, 780), 460, pick(290, 228, 268), 96, 118],
    exposure: filtered ? (swept ? 58 : 71) : risky ? 52 : 46,
    queue: pick(14, 23, 12),
    var: pick(8.4, 9.6, 8.9),
    latency: { stream: 142, spike: 131, focus: filtered ? 118 : 131, act: 96, hold: 104 }[phase],
    second: { stream: 5 + Math.min(step, 4), spike: 11, focus: 12 + Math.min(step, 1), act: 14 + Math.min(step, 1), hold: 16 }[phase],
  };
}

function alerts(phase, data, t) {
  const item = (id, Icon, tone, title, sub, value) => ({ id, Icon, tone, title, sub, value });
  const refresh = item('refresh', Database, 'quiet', t.refresh, `${t.refreshSub} · ${data.latency} ms`, `14:32:${String(data.second).padStart(2, '0')}`);
  const settled = item('settled', ArrowLeftRight, 'good', t.settled, t.settledSub, '$24M');
  const lcr = item('lcr', ShieldCheck, 'good', t.lcrOk, t.lcrOkSub, '134%');
  const spike = item('spike', TriangleAlert, 'risk', t.spikeTitle, t.spikeSub, '$62M');
  const sweep = { ...item('sweep', Workflow, 'good', t.sweep, `${t.sweepSub} · $40M`), action: true };
  const executed = item('executed', Workflow, 'good', t.executed, t.executedSub, '$40M');
  const restored = { ...item('restored', ShieldCheck, 'good', t.restored, t.restoredSub), chip: t.restoredChip };
  if (phase === 'stream') return [refresh, settled, lcr];
  if (!data.filtered) return [spike, refresh, settled];
  if (!data.swept) return [sweep, spike, refresh];
  if (phase === 'act') return [executed, { ...sweep, applied: true }, spike];
  return [executed, restored, { ...spike, tone: 'quiet' }];
}

export default function LiquidityMonitor({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const gradient = useId();
  const root = useRef(null);
  const corridor = useRef(null);
  const button = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, pressed: false });

  // The treasurer's pointer: onto the MXN corridor to cross-filter the report, then onto the sweep to run it.
  useLayoutEffect(() => {
    if (!live || (phase !== 'focus' && phase !== 'act')) {
      setCursor(current => ({ ...current, visible: false, pressed: false }));
      return undefined;
    }
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const aim = (ref, start) => {
      const box = root.current?.getBoundingClientRect(), target = ref.current?.getBoundingClientRect();
      // A target the narrow layout hides has no size: the pointer stays away rather than aiming at nothing.
      if (!box || !target || (box.width && !target.width)) return;
      const point = { x: target.left - box.left + target.width * .5, y: target.top - box.top + target.height * .55 };
      setCursor(current => (start ? { x: box.width * .5, y: box.height * .98, visible: false, pressed: false } : { ...current, ...point, visible: true }));
    };
    if (phase === 'focus') {
      at(250, () => aim(corridor, true));
      at(330, () => aim(corridor));
      at(1050, () => setCursor(current => ({ ...current, pressed: true })));
      at(1300, () => setCursor(current => ({ ...current, pressed: false })));
    } else {
      at(200, () => aim(button));
      at(1500, () => setCursor(current => ({ ...current, pressed: true })));
      at(1800, () => setCursor(current => ({ ...current, pressed: false })));
      at(2300, () => setCursor(current => ({ ...current, visible: false })));
    }
    return () => timers.forEach(clearTimeout);
  }, [live, phase]);

  // Readout: the morning while data streams in, then "now" as the spike lands and as the sweep restores it.
  const scan = Math.min(6 + step, HISTORY.length - 1);
  const readout = phase === 'stream'
    ? { x: historyPoints[scan][0], y: historyPoints[scan][1], label: time(scan), value: `$${HISTORY[scan].toFixed(2)}B`, tone: 'good' }
    : { x: NOW_X, y: toY(data.position), label: '14:30', value: `$${data.position.toFixed(2)}B`, tone: data.risky ? 'risk' : 'good' };
  const probe = { '--x': `${readout.x / 3}%`, '--y': `${readout.y / 1.1}%` };
  const tone = risky => (risky ? 'risk' : 'good');

  return <div ref={root} className={m.app} data-phase={phase} data-state={data.state} data-filtered={data.filtered}>
    <ProductBar section={t.reports} title={t.title}>
      <Pill icon={Database} tone="ok">Direct Lake · <LiveNumber value={data.latency} decimals={0} suffix=" ms" /></Pill>
      <span className={m.clock}><Pill icon={RefreshCw}>{t.refreshed} 14:32:{String(data.second).padStart(2, '0')}</Pill></span>
    </ProductBar>

    <div className={m.body}>
      <div className={m.slicers}>
        <span className={m.slicer}><Building2 strokeWidth={2} /><small>{t.entity}</small><b>{t.allEntities}</b><ChevronDown strokeWidth={2} /></span>
        <span className={m.slicer} data-active={data.filtered}>
          <Coins strokeWidth={2} /><small>{t.currency}</small><b>{data.filtered ? 'MXN' : t.all}</b>
          {data.filtered ? <X strokeWidth={2.2} /> : <ChevronDown strokeWidth={2} />}
        </span>
        <span className={m.slicer}><CalendarDays strokeWidth={2} /><small>{t.date}</small><b>{t.today}</b><ChevronDown strokeWidth={2} /></span>
      </div>

      <section className={m.kpis}>
        <KpiCard icon={Landmark} label={t.position} tone={tone(data.risky)} delta={<><b>{data.risky ? '↓ 3.4%' : '↑ 0.6%'}</b> {t.vsOpen}</>}>
          <LiveNumber value={data.position} decimals={2} prefix="$" suffix="B" />
        </KpiCard>
        <KpiCard icon={Gauge} label={t.headroom} tone={tone(data.risky)} delta={<><b>{t.limit}</b></>}>
          <LiveNumber value={data.headroom} decimals={0} prefix="$" suffix="M" />
        </KpiCard>
        <KpiCard icon={ArrowLeftRight} label={t.flows} delta={<><b>{t.corridors}</b></>}>
          <LiveNumber value={data.flows} decimals={0} prefix="+$" suffix="M" />
        </KpiCard>
        <KpiCard icon={ShieldCheck} label={t.lcr} tone={tone(data.risky)} delta={<><b>{t.floor}</b></>}>
          <LiveNumber value={data.lcr} decimals={0} suffix="%" />
        </KpiCard>
      </section>

      <div className={m.middle}>
        <Card title={t.intraday} action={t.todayShort} className={m.chartCard}>
          <div className={m.plot}>
            <span className={m.yAxis}><span>$1.9B</span><span>$1.8B</span><span>$1.7B</span></span>
            <div className={m.chart}>
              <svg viewBox="0 0 300 110" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c6ff34" stopOpacity=".24" /><stop offset="1" stopColor="#c6ff34" stopOpacity="0" /></linearGradient>
                </defs>
                {[10, 48].map(y => <path key={y} d={`M0 ${y}H300`} className={m.grid} vectorEffect="non-scaling-stroke" />)}
                <rect x="0" y={toY(LIMIT)} width="300" height={110 - toY(LIMIT)} className={m.limitBand} />
                <path d={`M0 ${toY(LIMIT)}H300`} className={m.limitLine} vectorEffect="non-scaling-stroke" />
                <path d={`M${NOW_X} 4V110`} className={m.nowLine} vectorEffect="non-scaling-stroke" />
                <path d={`${HISTORY_PATH}L${LAST[0]} 110L0 110Z`} fill={`url(#${gradient})`} />
                <path d={HISTORY_PATH} className={m.line} vectorEffect="non-scaling-stroke" />
                {['steady', 'risk', 'swept'].map(kind => <g key={kind} className={m.future} data-kind={kind} data-on={data.state === kind}>
                  <path d={`${tail(kind)}L${NOW_X} 110L${LAST[0]} 110Z`} fill={`url(#${gradient})`} />
                  <path d={tail(kind)} className={m.tail} vectorEffect="non-scaling-stroke" />
                  <path d={projection(kind)} className={m.projection} vectorEffect="non-scaling-stroke" />
                </g>)}
              </svg>
              <span className={m.probe} style={probe}>
                <span className={m.guide} />
                <span className={m.point} data-tone={readout.tone} />
                <span className={m.readout} data-tone={readout.tone}><span>{readout.label}</span><b>{readout.value}</b></span>
              </span>
              <span className={m.limitLabel}>{t.limitLine} · $1.70B</span>
              <span className={m.nowLabel}>{t.now}</span>
            </div>
          </div>
          <div className={m.xAxis}>{['09:00', '11:00', '13:00', '15:00', '17:00'].map(label => <span key={label}>{label}</span>)}</div>
        </Card>

        <Card title={t.sankey} action="$186M" className={m.sankeyCard}>
          <div className={m.sankey}>
            <svg viewBox="0 0 300 150" aria-hidden="true">
              {RIBBONS.map(ribbon => {
                const mxn = ribbon.to === 'MXN';
                const state = ribbon.id === 'EUR-MXN' && data.risky ? 'risk' : ribbon.id === 'USD-MXN' && data.swept ? 'swept' : 'base';
                return <path key={ribbon.id} d={ribbon.d} className={m.ribbon} data-from={ribbon.from} data-state={state}
                  data-dim={data.filtered && !mxn} data-corridor={ribbon.id} style={{ strokeWidth: ribbon.w }} />;
              })}
              {SRC.map(node => <g key={node.id} className={m.node} data-dim={data.filtered}>
                <rect x="0" y={node.y} width="8" height={node.h} rx="1.5" data-from={node.id} />
                <text x="13" y={node.y + node.h / 2}><tspan className={m.nodeCode}>{node.id}</tspan> ${node.value}M</text>
              </g>)}
              {DST.map(node => {
                const mxn = node.id === 'MXN';
                return <g key={node.id} ref={mxn ? corridor : undefined} className={m.node} data-target="true" data-dim={data.filtered && !mxn}
                  data-state={mxn ? data.state : 'base'}>
                  <rect x="292" y={node.y} width="8" height={node.h} rx="1.5" />
                  <text x="287" y={node.y + node.h / 2} textAnchor="end">${node.value}M <tspan className={m.nodeCode}>{node.id}</tspan></text>
                </g>;
              })}
              <text x="150" y={RIBBONS.find(ribbon => ribbon.id === 'EUR-MXN').mid + 3} className={m.tag} data-tone="risk" data-shown={data.risky}>+$62M · 14:32</text>
              <text x="150" y={RIBBONS.find(ribbon => ribbon.id === 'USD-MXN').mid + 3} className={m.tag} data-tone="good" data-shown={data.swept}>+$40M sweep</text>
            </svg>
          </div>
        </Card>
      </div>

      <div className={m.bottom}>
        <Card title={t.reserves} action={t.vsTarget} className={m.reservesCard}>
          <ul className={m.pools}>
            {POOLS.map((pool, i) => {
              const value = data.reserves[i];
              const under = value < TARGET[i];
              return <li key={pool} data-dim={data.filtered && pool !== 'MXN'} data-under={under}>
                <b>{pool}</b>
                <span className={m.track}>
                  <span className={m.fill} style={{ transform: `scaleX(${value / POOL_MAX})` }} />
                  <span className={m.target} style={{ left: `${(TARGET[i] / POOL_MAX) * 100}%` }} />
                </span>
                <LiveNumber value={value} decimals={0} prefix="$" suffix="M" className={m.poolValue} />
              </li>;
            })}
          </ul>
        </Card>

        <Card title={t.risk} action={data.filtered ? 'MXN' : t.all} className={m.riskCard}>
          <div className={m.risk}>
            <div className={m.gauge} data-tone={data.exposure > 65 ? 'risk' : 'good'}>
              <span className={m.dial}>
                <svg viewBox="0 0 100 56" aria-hidden="true">
                  <path d="M10 50A40 40 0 0 1 90 50" pathLength="100" className={m.gaugeTrack} />
                  <path d="M10 50A40 40 0 0 1 90 50" pathLength="100" className={m.gaugeValue} style={{ strokeDashoffset: 100 - data.exposure }} />
                </svg>
                <LiveNumber value={data.exposure} decimals={0} suffix="%" className={m.gaugeText} />
              </span>
              <small className={m.gaugeLabel}>{t.exposure}<br />{t.ofLimit}</small>
            </div>
            <dl className={m.riskStats}>
              <div><dt>{t.var}</dt><dd><LiveNumber value={data.var} prefix="$" suffix="M" /></dd></div>
              <div data-tone={data.risky ? 'risk' : 'good'}><dt>{t.queue}</dt><dd><LiveNumber value={data.queue} decimals={0} /> <small>{t.payments}</small></dd></div>
            </dl>
          </div>
        </Card>

        <Card title={t.alerts} action={t.viewAll} className={m.alertsCard}>
          <ul className={m.feed}>
            {alerts(phase, data, t).map(({ id, Icon, tone: itemTone, title, sub, value, action, applied, chip }) => <li key={id} className={m.alert} data-tone={itemTone}>
              <span className={m.alertIcon}><Icon strokeWidth={1.9} /></span>
              <span className={m.alertText}><span className={m.alertTitle}>{title}</span><span className={m.alertSub}>{sub}</span></span>
              {action
                ? <span ref={applied ? undefined : button} className={m.action} data-applied={Boolean(applied)} data-pressed={cursor.pressed && !applied}>{applied ? t.done : t.run}</span>
                : chip ? <StatusChip state="healthy" label={chip} /> : <span className={m.alertValue}>{value}</span>}
            </li>)}
          </ul>
        </Card>
      </div>
    </div>

    <nav className={m.pages} aria-hidden="true">
      {t.pages.map((page, i) => <span key={page} data-active={i === 0}>{page}</span>)}
    </nav>
    <Cursor {...cursor} />
  </div>;
}
