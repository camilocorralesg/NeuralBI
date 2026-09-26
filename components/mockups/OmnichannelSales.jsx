'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { CircleDollarSign, Database, ShoppingBag, Store, TrendingUp, Users } from 'lucide-react';
import { Card, Cursor, KpiCard, LiveNumber, Pill, ProductBar } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import o from './OmnichannelSales.module.css';

/* NeuralBI · Omnichannel Sales — the product behind "Omnichannel Sales Dashboards": a Power BI report over Direct Lake
 * for Andina Retail (38 stores in Colombia and its online store), Saturday at 18:40. Orders land from both channels;
 * the unified model merges online and in-store records of the same people (368k records, 312k customers); the analyst
 * selects the customers who shop both channels, and the LTV cohorts and key influencers show why they matter. */
const BEATS = [
  { id: 'stream', duration: 3000 },
  { id: 'unify', duration: 2400 },
  { id: 'filter', duration: 2600 },
  { id: 'insight', duration: 2600 },
  { id: 'hold', duration: 2200 },
];
// Per beat: how many things land (the 18:00 orders, the match, the cross-filter, the influencers), and how often.
const STEPS = { stream: [4, 650], unify: [1, 900], filter: [1, 1300], insight: [3, 650], hold: [0, 1000] };

const words = {
  en: {
    reports: 'Reports', title: 'Omnichannel Sales', lake: 'Direct Lake · OneLake', context: 'Andina Retail · 38 stores + online',
    sales: 'Net sales · today', orders: 'Orders · today', customers: 'Customers · 6 mo', ltv: '6-mo LTV',
    vsLastSat: 'vs last Sat', ofToday: "of today's sales", ordersSplit: '4.1k online · 14.8k store', ordersBoth: '2.1k online · 3.1k store',
    records: 'online + in store records', matched: 'in both channels', shopBoth: 'of all customers',
    perCustomer: 'per customer', single: 'single-channel',
    hourly: 'Sales by hour · today', online: 'Online', inStore: 'In store',
    venn: 'Customers · online × in store', sixMonths: '6 mo',
    siloed: 'Two silos: online orders and POS tickets', unified: 'Matched on email · phone · loyalty ID',
    cohorts: '6-month LTV by cohort', all: 'All customers', both: 'Both channels', cohort: 'Cohort',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], launch: 'Click & collect launch',
    influencers: 'Key influencers', question: 'What raises 6-mo LTV',
    factors: ['Shops online and in store', 'First order is click & collect', 'Loyalty member'],
    basis: '312k customers · Jan–Jun 2025',
  },
  es: {
    reports: 'Reportes', title: 'Ventas Omnicanal', lake: 'Direct Lake · OneLake', context: 'Andina Retail · 38 tiendas + online',
    sales: 'Ventas netas · hoy', orders: 'Pedidos · hoy', customers: 'Clientes · 6 m', ltv: 'LTV a 6 meses',
    vsLastSat: 'vs sáb. pasado', ofToday: 'de las ventas de hoy', ordersSplit: '4.1k online · 14.8k tienda', ordersBoth: '2.1k online · 3.1k tienda',
    records: 'registros online + tienda', matched: 'en ambos canales', shopBoth: 'de los clientes',
    perCustomer: 'por cliente', single: 'vs un solo canal',
    hourly: 'Ventas por hora · hoy', online: 'Online', inStore: 'En tienda',
    venn: 'Clientes · online × tienda', sixMonths: '6 m',
    siloed: 'Dos silos: pedidos online y tickets POS', unified: 'Unificados por email · teléfono · ID de lealtad',
    cohorts: 'LTV a 6 meses por cohorte', all: 'Todos los clientes', both: 'Ambos canales', cohort: 'Cohorte',
    months: ['ene', 'feb', 'mar', 'abr', 'may', 'jun'], launch: 'Lanzamiento click & collect',
    influencers: 'Influenciadores clave', question: 'Qué eleva el LTV a 6 meses',
    factors: ['Compra online y en tienda', 'Primer pedido con click & collect', 'Miembro de lealtad'],
    basis: '312k clientes · ene–jun 2025',
  },
};

// Sales by hour today ($k), 09:00–21:00; 18:00 is the hour in progress, 19–21 haven't happened yet. Each hour carries
// the share that came from customers who shop both channels (the cross-highlight once they are selected).
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const ONLINE = [14, 18, 22, 26, 24, 21, 23, 27, 31];
const STORE = [22, 38, 52, 71, 64, 49, 55, 68, 83];
const NOW = { online: [16, 20, 26, 30, 34], store: [30, 36, 46, 54, 61] };
const SHARE = { online: [.42, .4, .44, .46, .43, .41, .45, .47, .48, .46], store: [.36, .35, .37, .39, .38, .36, .38, .4, .41, .39] };
const MAX = 90;
const EARLIER = ONLINE.concat(STORE).reduce((sum, value) => sum + value, 0);
// Six-month LTV ($ per customer) by acquisition cohort and month since first purchase: all customers, and the ones who
// shop both channels. March, the first cohort with click & collect, compounds fastest.
const CURVE = { all: [58, 92, 121, 147, 168, 186], both: [104, 176, 243, 305, 362, 412] };
const COHORT = { all: [1, .96, 1.07, 1.02, .98, 1.03], both: [1, .97, 1.12, 1.03, 1, 1.04] };
const LAUNCH = 2;
const ltv = (segment, row, month) => Math.round(CURVE[segment][month] * COHORT[segment][row]);
const level = value => [80, 120, 170, 230, 300].filter(step => value >= step).length;
const FACTORS = [3, 2.4, 1.6];
// Venn: circles of radius 42 whose centres sit 44 apart once merged; the lens is where they overlap.
const LENS = 'M110 20.22A42 42 0 0 1 110 91.78A42 42 0 0 1 110 20.22Z';

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const stream = Math.min(Math.max(through('stream'), 0), 4);
  const unify = through('unify'), filter = through('filter'), insight = through('insight');
  const online = NOW.online[stream], store = NOW.store[stream];
  const filtered = filter >= 1;
  const matched = unify >= 1;
  return {
    online, store,
    merged: unify >= 0,
    matched,
    filtered,
    sales: filtered ? 322 : EARLIER + online + store,
    orders: filtered ? 5.2 : [17.2, 17.6, 18.1, 18.5, 18.9][stream],
    customers: filtered ? 56 : matched ? 312 : 368,
    ltv: filtered ? 412 : 186,
    factors: Math.max(0, Math.min(insight, 3)),
    marked: insight >= 2,
  };
}

export default function OmnichannelSales({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const segment = data.filtered ? 'both' : 'all';
  const root = useRef(null);
  const lens = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, pressed: false });

  // The analyst's pointer: onto the overlap of the two channels, a click that cross-filters the report, then away.
  useLayoutEffect(() => {
    if (!live || (phase !== 'filter' && phase !== 'insight')) {
      setCursor(current => ({ ...current, visible: false, pressed: false }));
      return undefined;
    }
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const aim = start => {
      const box = root.current?.getBoundingClientRect(), target = lens.current?.getBoundingClientRect();
      if (!box || !target) return;
      // Below the lens's figures, so the 56k it selects stays readable under the pointer.
      const point = { x: target.left - box.left + target.width * .5, y: target.top - box.top + target.height * .74 };
      setCursor(current => (start ? { x: point.x + 60, y: box.height * .98, visible: false, pressed: false } : { ...current, ...point, visible: true }));
    };
    if (phase === 'filter') {
      at(250, () => aim(true));
      at(330, () => aim(false));
      at(1150, () => setCursor(current => ({ ...current, pressed: true })));
      at(1450, () => setCursor(current => ({ ...current, pressed: false })));
    } else {
      at(700, () => setCursor(current => ({ ...current, visible: false })));
    }
    return () => timers.forEach(clearTimeout);
  }, [live, phase]);

  const online = [...ONLINE, data.online, 0, 0, 0];
  const store = [...STORE, data.store, 0, 0, 0];

  return <div ref={root} className={o.app} data-phase={phase} data-filtered={data.filtered}>
    <ProductBar section={t.reports} title={t.title}>
      <Pill icon={Database} tone="ok">{t.lake}</Pill>
      <span className={o.context}><Pill icon={Store}>{t.context}</Pill></span>
    </ProductBar>

    <div className={o.body}>
      <section className={o.kpis}>
        <KpiCard icon={CircleDollarSign} label={t.sales} delta={data.filtered ? <><b>40%</b> {t.ofToday}</> : <><b>↑ 6.4%</b> {t.vsLastSat}</>}>
          <LiveNumber value={data.sales} decimals={0} prefix="$" suffix="k" />
        </KpiCard>
        <KpiCard icon={ShoppingBag} label={t.orders} delta={data.filtered ? t.ordersBoth : t.ordersSplit}>
          <LiveNumber value={data.orders} suffix="k" />
        </KpiCard>
        <KpiCard icon={Users} label={t.customers}
          delta={data.filtered ? <><b>18%</b> {t.shopBoth}</> : data.matched ? <><b>56k</b> {t.matched}</> : t.records}>
          <LiveNumber value={data.customers} decimals={0} suffix="k" />
        </KpiCard>
        <KpiCard icon={TrendingUp} label={t.ltv} delta={data.filtered ? <><b>3.0×</b> {t.single}</> : t.perCustomer}>
          <LiveNumber value={data.ltv} decimals={0} prefix="$" />
        </KpiCard>
      </section>

      <div className={o.middle}>
        <Card title={t.hourly} action="18:40" className={o.salesCard}>
          <span className={o.legend}><i data-kind="online" />{t.online}<i data-kind="store" />{t.inStore}</span>
          <div className={o.chart}>
            <span className={o.yAxis}><span>$90k</span><span>$45k</span><span>$0</span></span>
            <ol className={o.hours}>
              {HOURS.map((hour, i) => <li key={hour} data-hour={hour} data-now={hour === 18}>
                {[['online', online[i]], ['store', store[i]]].map(([kind, value]) => <span key={kind} className={o.bar} data-kind={kind}>
                  <i className={o.fill} style={{ transform: `scaleY(${value / MAX})` }} />
                  <i className={o.highlight} style={{ transform: `scaleY(${value * (SHARE[kind][i] || 0) / MAX})` }} />
                </span>)}
              </li>)}
            </ol>
          </div>
          <span className={o.xAxis}>{HOURS.map(hour => <span key={hour}>{hour % 3 === 0 ? `${String(hour).padStart(2, '0')}:00` : ''}</span>)}</span>
        </Card>

        <Card title={t.venn} action={t.sixMonths} className={o.vennCard}>
          <svg viewBox="0 0 220 112" className={o.venn} data-merged={data.merged} data-matched={data.matched} aria-hidden="true">
            <g className={o.circle} data-side="online">
              <circle cx="88" cy="56" r="42" />
              <text x="88" y="9" className={o.channel}>{t.online}</text>
              <text x="88" y="60" className={o.total}>174k</text>
            </g>
            <g className={o.circle} data-side="store">
              <circle cx="132" cy="56" r="42" />
              <text x="132" y="9" className={o.channel}>{t.inStore}</text>
              <text x="132" y="60" className={o.total}>194k</text>
            </g>
            <path ref={lens} d={LENS} className={o.lens} />
            <text x="68" y="60" className={o.only}>118k</text>
            <text x="152" y="60" className={o.only}>138k</text>
            <text x="110" y="57" className={o.both}>56k</text>
            <text x="110" y="67" className={o.bothShare}>18%</text>
          </svg>
          <span className={o.match} data-matched={data.matched}>{data.matched ? t.unified : t.siloed}</span>
        </Card>
      </div>

      <div className={o.bottom}>
        <Card title={t.cohorts} action={data.filtered ? t.both : t.all} className={o.cohortCard}>
          <ol className={o.matrix}>
            <li className={o.matrixHead}><span>{t.cohort}</span>{CURVE.all.map((_, month) => <span key={month}>M{month}</span>)}</li>
            {t.months.map((month, row) => <li key={month} data-marked={row === LAUNCH && data.marked}>
              <span className={o.rowLabel}>{month}</span>
              {CURVE.all.map((_, col) => {
                if (col > 5 - row) return row === LAUNCH && col === 4 ? <span key={col} className={o.launch}>{t.launch}</span> : row === LAUNCH ? null : <span key={col} />;
                const value = ltv(segment, row, col);
                return <span key={col} className={o.cell} data-level={level(value)} style={{ '--d': row + col }}>
                  <LiveNumber value={value} decimals={0} prefix="$" className={o.cellValue} />
                </span>;
              })}
            </li>)}
          </ol>
        </Card>

        <Card title={t.influencers} action="LTV ↑" className={o.influencersCard}>
          <span className={o.question}>{t.question}</span>
          <ul className={o.factors}>
            {t.factors.map((factor, i) => <li key={factor} data-shown={data.factors > i}>
              <span>{factor}</span><b>×{FACTORS[i].toFixed(1)}</b>
              <span className={o.track}><i style={{ '--w': FACTORS[i] / FACTORS[0] }} /></span>
            </li>)}
          </ul>
          <span className={o.basis}>{t.basis}</span>
        </Card>
      </div>
    </div>
    <Cursor {...cursor} />
  </div>;
}
