'use client';

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowRight, Boxes, Database, FileText, LayoutDashboard, PackageCheck, Route, Settings, Timer, TrendingUp,
  TriangleAlert, Truck, Waypoints,
} from 'lucide-react';
import { AppShell, Card, Cursor, KpiCard, LiveNumber, StatusChip } from './ui/primitives';
import { useStoryline } from './ui/useStoryline';
import m from './SupplyControlTower.module.css';

/* NeuralBI · Supply Control Tower: the product behind "Advanced Analytics & Real-Time Telemetry".
 * Multi-country inventory over Direct Lake: a COL stockout is forecast, a faster MEX lane is proposed and
 * applied by the operator, and lead time and risk recover. */
const BEATS = [
  { id: 'live', duration: 3000 },
  { id: 'detect', duration: 2200 },
  { id: 'propose', duration: 2600 },
  { id: 'resolve', duration: 2800 },
  { id: 'hold', duration: 1800 },
];
const NAV = [LayoutDashboard, Boxes, Route, Truck, FileText, Settings];

const words = {
  en: {
    month: 'May', title: 'Supply Control Tower', context: 'Inventory across COL, MEX and USA · Direct Lake', search: 'Search SKUs, lanes…', period: 'May 10 – 16',
    inventory: 'Inventory value', risk: 'Stockout risk', lead: 'Avg lead time', fill: 'Fill rate', vs: 'vs last wk',
    chart: 'Inventory & forecast', week: 'This week', stockout: 'Stockout · COL', safety: 'Safety stock',
    share: 'Stock by node', units: 'units',
    signals: 'Signals', viewAll: 'View all',
    refresh: 'Direct Lake sync', refreshSub: '2.4M rows · 3 nodes', rows: 'rows',
    restock: 'USA DC restocked', restockSub: 'Laredo · 14:12',
    onTimeLane: 'MEX lane on time', onTimeLaneSub: 'Monterrey → Bogotá',
    forecast: 'Forecast updated', forecastSub: 'Demand model · 14:05',
    predicted: 'Stockout predicted', predictedSub: 'COL DC · 3.1 d cover',
    reroute: 'Reroute via MEX', rerouteSub: 'Lead time −2.3 d', apply: 'Apply', applied: 'Applied',
    po: 'PO #4821 dispatched', poSub: 'MEX → COL · ETA 3.8 d',
    mitigated: 'Risk mitigated', mitigatedSub: 'COL DC · 8.6 d cover', mitigatedChip: 'Mitigated',
    lake: 'Direct Lake', dataset: 'supply_telemetry', latency: 'latency', refreshed: 'Refreshed 14:31',
    lanes: 'Lanes', onTime: 'On time', delayed: 'Delayed', standby: 'Standby', active: 'Active',
    flow: 'Inbound vs outbound', inbound: 'Inbound', outbound: 'Outbound', net: 'net this week',
  },
  es: {
    month: 'may', title: 'Torre de Control Logística', context: 'Inventario en COL, MEX y USA · Direct Lake', search: 'Buscar SKUs, rutas…', period: '10 – 16 may',
    inventory: 'Valor de inventario', risk: 'Riesgo de quiebre', lead: 'Lead time prom.', fill: 'Nivel de servicio', vs: 'vs sem. ant.',
    chart: 'Inventario y pronóstico', week: 'Esta semana', stockout: 'Quiebre · COL', safety: 'Stock de seguridad',
    share: 'Stock por nodo', units: 'unidades',
    signals: 'Alertas', viewAll: 'Ver todo',
    refresh: 'Sync Direct Lake', refreshSub: '2.4M filas · 3 nodos', rows: 'filas',
    restock: 'CD USA reabastecido', restockSub: 'Laredo · 14:12',
    onTimeLane: 'Ruta MEX a tiempo', onTimeLaneSub: 'Monterrey → Bogotá',
    forecast: 'Pronóstico actualizado', forecastSub: 'Modelo de demanda · 14:05',
    predicted: 'Quiebre previsto', predictedSub: 'CD COL · 3.1 d cobertura',
    reroute: 'Reruteo vía MEX', rerouteSub: 'Lead time −2.3 d', apply: 'Aplicar', applied: 'Aplicado',
    po: 'OC #4821 despachada', poSub: 'MEX → COL · llega en 3.8 d',
    mitigated: 'Riesgo mitigado', mitigatedSub: 'CD COL · 8.6 d cobertura', mitigatedChip: 'Mitigado',
    lake: 'Direct Lake', dataset: 'supply_telemetry', latency: 'latencia', refreshed: 'Actualizado 14:31',
    lanes: 'Rutas', onTime: 'A tiempo', delayed: 'Retrasada', standby: 'En espera', active: 'Activa',
    flow: 'Entradas vs salidas', inbound: 'Entradas', outbound: 'Salidas', net: 'neto esta semana',
  },
};

// Inventory ($M) from May 10 to May 16 ("today"), then two possible weeks ahead. One day = 25 units of the 300-wide chart.
const history = [45.1, 45.9, 45.4, 46.6, 46.1, 47.3, 48.2];
const safeWeek = [48.2, 48.6, 49, 49.1, 49.4, 49.6, 49.9];
const riskWeek = [48.2, 47.4, 46.4, 45.3, 44.1, 43, 42];
const SAFETY = 43;
const toY = value => 110 - (value - 40) * 10;
const points = (values, from) => values.map((value, i) => [(from + i) * 25, toY(value)]);
// Smooth curve through the points, with horizontal control handles (no overshoot).
const smooth = pts => pts.reduce((d, [x, y], i, all) => {
  if (!i) return `M${x} ${y}`;
  const [px, py] = all[i - 1], handle = (x - px) / 2;
  return `${d}C${px + handle} ${py} ${x - handle} ${y} ${x} ${y}`;
}, '');
const actualPath = smooth(points(history, 0));
const safePath = smooth(points(safeWeek, 6));
const riskPath = smooth(points(riskWeek, 6));
// Calendar day for a chart position (day 0 = May 10), in the reader's order: 'May 16' / '16 may'.
const day = (t, offset) => (t.month === 'May' ? `May ${10 + offset}` : `${10 + offset} may`);
const flows = [[62, 48], [70, 55], [58, 60], [74, 52], [66, 64], [80, 58], [72, 61]];

function readings(phase) {
  const risky = phase === 'detect' || phase === 'propose';
  const resolved = phase === 'resolve' || phase === 'hold';
  return {
    risky,
    resolved,
    risk: risky ? 12 : resolved ? 3.1 : 4.2,
    lead: resolved ? 3.8 : 6.1,
    fill: resolved ? 97.4 : risky ? 95.8 : 96.9,
    shares: risky ? [51, 40, 9] : resolved ? [45, 31, 24] : [46, 32, 22],
    units: risky ? 1.17 : resolved ? 1.26 : 1.24,
  };
}

function signals(phase, t) {
  const item = (id, Icon, tone, title, sub, value) => ({ id, Icon, tone, title, sub, value });
  const refresh = item('refresh', Database, 'quiet', t.refresh, t.refreshSub, '14:31');
  const restock = item('restock', PackageCheck, 'good', t.restock, t.restockSub, '+12k u');
  const lane = item('lane', Route, 'good', t.onTimeLane, t.onTimeLaneSub, '2.9 d');
  const forecast = item('forecast', TrendingUp, 'quiet', t.forecast, t.forecastSub, '±2.1%');
  const predicted = item('predicted', TriangleAlert, 'risk', t.predicted, t.predictedSub, 'D+5');
  const reroute = { ...item('reroute', Waypoints, 'good', t.reroute, t.rerouteSub), action: true };
  const po = item('po', Truck, 'good', t.po, t.poSub, '14:33');
  const mitigated = { ...item('mitigated', PackageCheck, 'good', t.mitigated, t.mitigatedSub), chip: t.mitigatedChip };
  if (phase === 'live') return [refresh, restock, lane, forecast];
  if (phase === 'detect') return [predicted, refresh, restock, lane];
  if (phase === 'propose') return [reroute, predicted, refresh, restock];
  return [po, { ...reroute, applied: true }, mitigated, refresh];
}

function lanes(phase, t) {
  const risky = phase === 'detect' || phase === 'propose';
  const resolved = phase === 'resolve' || phase === 'hold';
  return [
    { from: 'USA', to: 'COL', lead: 6.1, state: risky ? 'risk' : resolved ? 'idle' : 'healthy', label: risky ? t.delayed : resolved ? t.standby : t.onTime },
    { from: 'MEX', to: 'COL', lead: 3.8, state: resolved ? 'healthy' : 'idle', label: resolved ? t.active : t.standby },
    { from: 'USA', to: 'MEX', lead: 2.9, state: 'healthy', label: t.onTime },
  ];
}

function Donut({ shares, units, t, risky }) {
  const nodes = [['USA', 'Laredo'], ['MEX', 'Monterrey'], ['COL', 'Bogotá']];
  let offset = 25;
  return <div className={m.donutWrap}>
    <div className={m.donut}>
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <circle cx="21" cy="21" r="15.915" className={m.ring} />
        {shares.map((share, i) => {
          const dash = `${Math.max(share - 1.6, 0)} ${100 - Math.max(share - 1.6, 0)}`;
          const segment = <circle key={nodes[i][0]} cx="21" cy="21" r="15.915" className={m.segment} data-node={nodes[i][0]}
            data-risk={risky && i === 2} style={{ strokeDasharray: dash, strokeDashoffset: offset }} />;
          offset -= share;
          return segment;
        })}
      </svg>
      <span className={m.donutCenter}><LiveNumber value={units} decimals={2} suffix="M" className={m.donutValue} /><span>{t.units}</span></span>
    </div>
    <ul className={m.legend}>
      {nodes.map(([code, city], i) => <li key={code} data-node={code} data-risk={risky && i === 2}>
        <span className={m.swatch} /><span className={m.legendName}><b>{code}</b> {city}</span><LiveNumber value={shares[i]} decimals={0} suffix="%" className={m.legendValue} />
      </li>)}
    </ul>
  </div>;
}

export default function SupplyControlTower({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const data = readings(phase);
  const gradient = useId();
  const root = useRef(null);
  const button = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, pressed: false });
  const [scan, setScan] = useState(history.length - 1);

  // While telemetry streams in, the chart's readout glides across the last few days.
  useEffect(() => {
    if (!live || phase !== 'live') return undefined;
    setScan(3);
    const timer = setInterval(() => setScan(day => Math.min(day + 1, history.length - 1)), 700);
    return () => clearInterval(timer);
  }, [live, phase]);

  // The operator's pointer travels to "Apply" and presses it; the next beat shows it applied.
  useLayoutEffect(() => {
    if (!live || phase !== 'propose') {
      setCursor(current => ({ ...current, visible: false, pressed: false }));
      return undefined;
    }
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    at(350, () => {
      const box = root.current?.getBoundingClientRect();
      if (box) setCursor({ x: box.width * .86, y: box.height * .98, visible: false, pressed: false });
    });
    at(430, () => {
      const box = root.current?.getBoundingClientRect(), target = button.current?.getBoundingClientRect();
      if (box && target) setCursor(current => ({ ...current, visible: true, x: target.left - box.left + target.width * .55, y: target.top - box.top + target.height * .55 }));
    });
    at(1650, () => setCursor(current => ({ ...current, pressed: true })));
    at(2000, () => setCursor(current => ({ ...current, pressed: false })));
    return () => timers.forEach(clearTimeout);
  }, [live, phase]);

  // Readout: a day of history while live, the stockout crossing while at risk, the recovered forecast once resolved.
  const readout = phase === 'live'
    ? { x: scan * 25, y: toY(history[scan]), label: day(t, scan), value: `$${history[scan].toFixed(1)}M`, tone: 'good' }
    : data.risky
      ? { x: 275, y: toY(SAFETY), label: day(t, 11), value: t.stockout, tone: 'risk' }
      : { x: 275, y: toY(safeWeek[5]), label: day(t, 11), value: `$${safeWeek[5].toFixed(1)}M`, tone: 'good' };
  // The probe layer spans the chart, so translating it by a percentage lands on the reading (no layout animation).
  const at = { '--x': `${readout.x / 3}%`, '--y': `${readout.y / 1.1}%` };
  const toneOf = risky => (risky ? 'risk' : 'good');

  return <div ref={root} className={m.app} data-phase={phase} data-risk={data.risky} data-resolved={data.resolved}>
    <AppShell nav={NAV} active={0} title={t.title} context={t.context} search={t.search} period={t.period}>
      <section className={m.kpis}>
        <KpiCard icon={Boxes} label={t.inventory} delta={<><b>↑ 1.8%</b> {t.vs}</>}><LiveNumber value={48.2} prefix="$" suffix="M" /></KpiCard>
        <KpiCard icon={TriangleAlert} label={t.risk} tone={toneOf(data.risky)}
          delta={<><b>{data.risky ? '↑ 7.8 pts' : data.resolved ? '↓ 8.9 pts' : '↓ 0.4 pts'}</b> {t.vs}</>}>
          <LiveNumber value={data.risk} suffix="%" />
        </KpiCard>
        <KpiCard icon={Timer} label={t.lead} tone={toneOf(data.risky)} delta={<><b>{data.resolved ? '↓ 2.3 d' : '↑ 0.4 d'}</b> {t.vs}</>}>
          <LiveNumber value={data.lead} suffix=" d" />
        </KpiCard>
        <KpiCard icon={PackageCheck} label={t.fill} delta={<><b>↑ 0.6 pts</b> {t.vs}</>}><LiveNumber value={data.fill} suffix="%" /></KpiCard>
      </section>

      <div className={m.middle}>
        <Card title={t.chart} action={t.week} className={m.chartCard}>
          <div className={m.chartValue}>
            <LiveNumber value={48.2} prefix="$" suffix="M" className={m.bigNumber} />
            <span className={m.chartDelta}><b>↑ 6.9%</b> {t.vs}</span>
          </div>
          <div className={m.plot}>
            <span className={m.yAxis}><span>$50M</span><span>$45M</span><span>$40M</span></span>
            <div className={m.chart}>
              <svg viewBox="0 0 300 110" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c6ff34" stopOpacity=".26" /><stop offset="1" stopColor="#c6ff34" stopOpacity="0" /></linearGradient>
                </defs>
                {[10, 60].map(y => <path key={y} d={`M0 ${y}H300`} className={m.grid} vectorEffect="non-scaling-stroke" />)}
                <rect x="0" y={toY(SAFETY)} width="300" height={110 - toY(SAFETY)} className={m.safetyBand} />
                <path d={`M0 ${toY(SAFETY)}H300`} className={m.safetyLine} vectorEffect="non-scaling-stroke" />
                <path d={`${actualPath}L150 110L0 110Z`} fill={`url(#${gradient})`} />
                <path d={actualPath} className={m.actual} vectorEffect="non-scaling-stroke" />
                <path d={riskPath} className={m.forecastRisk} vectorEffect="non-scaling-stroke" />
                <path d={safePath} className={m.forecastSafe} vectorEffect="non-scaling-stroke" />
              </svg>
              <span className={m.probe} style={at}>
                <span className={m.guide} />
                <span className={m.point} data-tone={readout.tone} />
                <span className={m.readout} data-tone={readout.tone} data-edge={readout.x > 200}>
                  <span>{readout.label}</span><b>{readout.value}</b>
                </span>
              </span>
              <span className={m.safetyLabel}>{t.safety}</span>
            </div>
          </div>
          <div className={m.xAxis}>{[0, 2, 4, 6, 8, 10, 12].map(offset => <span key={offset}>{day(t, offset)}</span>)}</div>
        </Card>

        <Card title={t.share} action={t.week} className={m.shareCard}>
          <Donut shares={data.shares} units={data.units} t={t} risky={data.risky} />
        </Card>

        <Card title={t.signals} action={t.viewAll} className={m.signalsCard}>
          <ul className={m.feed}>
            {signals(phase, t).map(({ id, Icon, tone, title, sub, value, action, applied, chip }) => <li key={id} className={m.signal} data-tone={tone}>
              <span className={m.signalIcon}><Icon strokeWidth={1.9} /></span>
              <span className={m.signalText}><span className={m.signalTitle}>{title}</span><span className={m.signalSub}>{sub}</span></span>
              {action
                ? <span ref={button} className={m.action} data-applied={Boolean(applied)} data-pressed={cursor.pressed}>{applied ? t.applied : t.apply}</span>
                : chip ? <StatusChip state="mitigated" label={chip} /> : <span className={m.signalValue}>{value}</span>}
            </li>)}
          </ul>
        </Card>
      </div>

      <div className={m.bottom}>
        <section className={m.lake}>
          <span className={m.lakeIcon}><Database strokeWidth={1.8} /></span>
          <span className={m.lakeName}>{t.lake}</span>
          <span className={m.lakeDataset}>{t.dataset}</span>
          <span className={m.lakeStats}>
            <span><b>2.4M</b>{t.rows}</span>
            <span><b>12 ms</b>{t.latency}</span>
          </span>
          <span className={m.lakeFoot}>{t.refreshed}<span>Fabric</span></span>
        </section>

        <Card title={t.lanes} action={t.viewAll} className={m.lanesCard}>
          <ul className={m.lanes}>
            {lanes(phase, t).map(lane => <li key={`${lane.from}-${lane.to}`} data-state={lane.state}>
              <span className={m.route}><b>{lane.from}</b><ArrowRight strokeWidth={2} /><b>{lane.to}</b></span>
              <LiveNumber value={lane.lead} suffix=" d" className={m.laneLead} />
              <StatusChip state={lane.state} label={lane.label} />
            </li>)}
          </ul>
        </Card>

        <Card title={t.flow} action={t.week} className={m.flowCard}>
          <div className={m.flowHead}>
            <span className={m.flowValue}>+86k u<small>{t.net}</small></span>
            <span className={m.flowLegend}><span data-kind="in">{t.inbound}</span><span data-kind="out">{t.outbound}</span></span>
          </div>
          <div className={m.bars}>
            {flows.map(([inbound, outbound], i) => <span key={i} className={m.day} style={{ '--in': inbound / 80, '--out': outbound / 80, '--i': i }}>
              <span className={m.barIn} /><span className={m.barOut} />
            </span>)}
          </div>
        </Card>
      </div>
    </AppShell>
    <Cursor {...cursor} />
  </div>;
}
