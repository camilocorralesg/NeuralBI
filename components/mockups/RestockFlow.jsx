'use client';

import React from 'react';
import {
  ArrowLeftRight, Calculator, Check, CheckCheck, CircleCheck, Clock3, CloudRain, FileText, Mail, PackageMinus, Repeat,
  ShoppingCart, TrendingUp, Workflow,
} from 'lucide-react';
import { LiveNumber, Pill, ProductBar } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import r from './RestockFlow.module.css';

/* NeuralBI Flows · Automated restocking: the product behind "Automated Restocking Pipelines": a Power Automate flow
 * over Andina Chapinero's stock, Sunday at 07:02. A rain alert lifts the forecast for rainwear, so the dynamic safety
 * stock of three SKUs rises past what is on the shelf; the flow sizes the orders, creates one purchase order per
 * supplier and sends each through that supplier's channel (EDI or email). The documents travel out, the confirmations
 * come back, and the incoming stock clears the new thresholds. */
const BEATS = [
  { id: 'forecast', duration: 2600 },
  { id: 'plan', duration: 2200 },
  { id: 'order', duration: 3200 },
  { id: 'confirm', duration: 2400 },
  { id: 'hold', duration: 2200 },
];
// Per beat: how many things land (the forecast and the crossing, two actions, each supplier's PO and notice, the
// confirmations), and how often.
const STEPS = { forecast: [2, 900], plan: [2, 900], order: [4, 700], confirm: [2, 900], hold: [0, 1000] };
const ELAPSED = { forecast: 1, plan: 6, order: 14, confirm: 29 };

const words = {
  en: {
    flows: 'Flows', flowName: 'Automated restocking · Chapinero', designer: 'Designer', history: 'Run history',
    run: 'Run #5127', running: 'Running', succeeded: 'Succeeded',
    chart: 'Stock vs dynamic safety stock', store: 'Chapinero · 10 SKUs', forecastChip: 'Forecast · rainwear +58% · rain alert',
    legend: ['On hand', 'Below safety', 'On order', 'Safety stock'],
    skus: ['Jacket M', 'Jacket L', 'Umbrella', 'Boots 38', 'Hoodie', 'Jeans', 'Sneakers', 'Tee', 'Cap', 'Socks'],
    nodes: {
      trigger: ['Stock below dynamic threshold', 'Dataverse · every 5 min', '3 SKUs'],
      forecast: ['Get demand forecast', 'Fabric · ML model', '+58% · 14 d'],
      quantities: ['Calculate order quantities', '14-day cover', '94 u · 3 lines'],
      order: ['Create purchase order', 'Dynamics 365'],
      notify: ['Notify supplier'],
    },
    loop: 'Apply to each supplier', external: 'Suppliers · external',
    suppliers: [
      { name: 'Textiles Pacífico', channel: 'EDI', notify: 'EDI 850', po: 'PO-9120', lines: 'Rain jacket M ×36 · Rain boots 38 ×18', out: '850', back: '855', ack: '855 · Accepted · ships Tue 17 Jun' },
      { name: 'Paraguas Andes', channel: 'Email', notify: 'Email + PDF', po: 'PO-9121', lines: 'Compact umbrella ×40', out: 'PDF', back: 'Re:', ack: 'Reply · Confirmed · ships Mon 16 Jun' },
    ],
    poLines: ['2 lines', '1 line'], sent: 'Sent 07:03', waiting: 'Waiting for PO', received: 'received · 07:03',
  },
  es: {
    flows: 'Flujos', flowName: 'Reabastecimiento automático · Chapinero', designer: 'Diseñador', history: 'Historial',
    run: 'Ejecución #5127', running: 'En curso', succeeded: 'Correcto',
    chart: 'Stock vs stock de seguridad dinámico', store: 'Chapinero · 10 SKUs', forecastChip: 'Pronóstico · lluvia +58% · alerta de lluvias',
    legend: ['En tienda', 'Bajo el umbral', 'En camino', 'Stock de seguridad'],
    skus: ['Chaqueta M', 'Chaqueta L', 'Paraguas', 'Botas 38', 'Buzo', 'Jean', 'Tenis', 'Camiseta', 'Gorra', 'Medias'],
    nodes: {
      trigger: ['Stock bajo el umbral dinámico', 'Dataverse · cada 5 min', '3 SKUs'],
      forecast: ['Obtener pronóstico de demanda', 'Fabric · modelo ML', '+58% · 14 d'],
      quantities: ['Calcular cantidades a pedir', 'Cobertura de 14 días', '94 u · 3 líneas'],
      order: ['Crear orden de compra', 'Dynamics 365'],
      notify: ['Avisar al proveedor'],
    },
    loop: 'Aplicar a cada proveedor', external: 'Proveedores · externos',
    suppliers: [
      { name: 'Textiles Pacífico', channel: 'EDI', notify: 'EDI 850', po: 'PO-9120', lines: 'Chaqueta imp. M ×36 · Botas 38 ×18', out: '850', back: '855', ack: '855 · Aceptada · despacha mar 17 jun' },
      { name: 'Paraguas Andes', channel: 'Email', notify: 'Email + PDF', po: 'PO-9121', lines: 'Paraguas compacto ×40', out: 'PDF', back: 'Re:', ack: 'Respuesta · Confirmada · despacha lun 16 jun' },
    ],
    poLines: ['2 líneas', '1 línea'], sent: 'Enviada 07:03', waiting: 'Esperando la OC', received: 'recibida · 07:03',
  },
};

// The store's SKUs (units): what is on the shelf, the safety stock before and after the forecast, and what gets ordered
// from which supplier. Jacket L's threshold rises too, but its stock still clears it.
const SKUS = [
  { id: 'jacketM', onHand: 8, safety: [6, 14], order: 36, supplier: 0 },
  { id: 'jacketL', onHand: 19, safety: [5, 12] },
  { id: 'umbrella', onHand: 11, safety: [8, 18], order: 40, supplier: 1 },
  { id: 'boots', onHand: 6, safety: [4, 9], order: 18, supplier: 0 },
  { id: 'hoodie', onHand: 22, safety: [10, 10] },
  { id: 'jeans', onHand: 17, safety: [8, 8] },
  { id: 'sneakers', onHand: 9, safety: [6, 6] },
  { id: 'tee', onHand: 31, safety: [12, 12] },
  { id: 'cap', onHand: 14, safety: [6, 6] },
  { id: 'socks', onHand: 26, safety: [10, 10] },
];
const SCALE = 40;

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const forecast = through('forecast'), plan = through('plan'), order = through('order'), confirm = through('confirm');
  const state = (started, done) => (done ? 'done' : started ? 'running' : 'idle');
  const raised = forecast >= 1, fired = forecast >= 2;
  const lanes = [0, 1].map(i => ({
    order: state(order >= i * 2, order >= i * 2 + 1),
    notify: state(order >= i * 2 + 1, order >= i * 2 + 2),
    sent: order >= i * 2 + 2,
    acknowledged: confirm >= i + 1,
  }));
  return {
    raised,
    nodes: { trigger: state(forecast >= 0, fired), forecast: state(plan >= 0, plan >= 1), quantities: state(plan >= 1, plan >= 2) },
    loop: state(order >= 0, order >= 4),
    iteration: order >= 2 ? 2 : order >= 0 ? 1 : 0,
    lanes,
    skus: SKUS.map(sku => {
      const safety = sku.safety[raised ? 1 : 0];
      const ordered = sku.order && lanes[sku.supplier].acknowledged;
      return { ...sku, safety, ordered, state: ordered ? 'ordered' : fired && sku.onHand < safety ? 'below' : 'ok' };
    }),
    done: confirm >= 2,
    elapsed: ELAPSED[phase],
  };
}

export default function RestockFlow({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const node = (id, Icon, state, tone) => {
    const [name, detail, result] = t.nodes[id];
    return <Node icon={Icon} name={name} detail={detail} result={result} state={state} tone={tone} />;
  };

  return <div className={r.app} data-phase={phase}>
    <ProductBar section={t.flows} title={t.flowName}>
      <span className={r.modes}><span data-active="true">{t.designer}</span><span>{t.history}</span></span>
      <Pill icon={data.done ? CircleCheck : Workflow} tone={data.done ? 'ok' : 'idle'}>
        {t.run} · {data.done ? `${t.succeeded} · 38 s` : <>{t.running} · <LiveNumber value={data.elapsed} decimals={0} suffix=" s" /></>}
      </Pill>
    </ProductBar>

    <div className={r.body}>
      <section className={r.chart}>
        <header className={r.chartHead}>
          <span className={r.chartTitle}><b>{t.chart}</b><span>{t.store}</span></span>
          <span className={r.forecast} data-shown={data.raised}><CloudRain strokeWidth={2} />{t.forecastChip}</span>
        </header>
        <ol className={r.skus}>
          {data.skus.map((sku, i) => <li key={sku.id} data-sku={sku.id} data-state={sku.state} data-dynamic={sku.safety !== SKUS[i].safety[0]}>
            <span className={r.column}>
              <i className={r.stock} style={{ transform: `scaleY(${sku.onHand / SCALE})` }} />
              {sku.order && <i className={r.incoming}
                style={{ transform: `translateY(${-sku.onHand / SCALE * 100}%) scaleY(${sku.ordered ? Math.min(sku.order, SCALE - sku.onHand) / SCALE : 0})` }} />}
              <i className={r.tick} data-tick={sku.safety} style={{ transform: `translateY(${(1 - sku.safety / SCALE) * 100}%)` }} />
            </span>
            <span className={r.skuName}>{t.skus[i]}</span>
          </li>)}
        </ol>
        <span className={r.legend}>
          {t.legend.map((label, i) => <span key={label} data-key={['stock', 'below', 'incoming', 'tick'][i]}><i />{label}</span>)}
        </span>
      </section>

      <div className={r.canvas}>
        <div className={r.pipeline}>
          <div className={r.cluster}>
            {node('trigger', PackageMinus, data.nodes.trigger, 'warn')}
            <span className={r.link} data-state={data.nodes.forecast} />
            {node('forecast', TrendingUp, data.nodes.forecast)}
            <span className={r.link} data-state={data.nodes.quantities} />
            {node('quantities', Calculator, data.nodes.quantities)}
          </div>
          <svg className={r.join} viewBox="0 0 10 10" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 5H10" data-state={data.loop === 'idle' ? 'idle' : 'lit'} />
          </svg>

          <section className={r.loop} data-state={data.loop}>
            <span className={r.loopHead}>
              <Repeat strokeWidth={2} /><b>{t.loop}</b><em>{data.iteration}/2</em>
            </span>
            {t.suppliers.map((supplier, i) => {
              const lane = data.lanes[i];
              return <div key={supplier.po} className={r.lane} data-active={data.iteration === i + 1 && data.loop === 'running'}>
                <span className={r.laneName}>{supplier.name}</span>
                <span className={r.laneNodes}>
                  <Node icon={ShoppingCart} name={t.nodes.order[0]} detail={t.nodes.order[1]} result={`${supplier.po} · ${t.poLines[i]}`} state={lane.order} />
                  <span className={r.link} data-state={lane.notify} data-dir="row" />
                  <Node icon={supplier.channel === 'EDI' ? ArrowLeftRight : Mail} name={t.nodes.notify[0]} detail={supplier.notify} result={t.sent} state={lane.notify} />
                </span>
              </div>;
            })}
          </section>

          <div className={r.wires}>
            <span className={r.wiresHead} />
            {t.suppliers.map((supplier, i) => <span key={supplier.po} className={r.wire} data-sent={data.lanes[i].sent} data-acknowledged={data.lanes[i].acknowledged}>
              <small data-end="out">{supplier.out}</small>
              <i className={r.doc}><FileText strokeWidth={2} /></i>
              <i className={r.ackDoc}><CheckCheck strokeWidth={2.4} /></i>
              <small data-end="back">{supplier.back}</small>
            </span>)}
          </div>

          <div className={r.suppliers}>
            <span className={r.suppliersHead}>{t.external}</span>
            {t.suppliers.map((supplier, i) => {
              const lane = data.lanes[i];
              const status = lane.acknowledged ? 'acknowledged' : lane.sent ? 'received' : 'waiting';
              return <div key={supplier.po} className={r.supplier} data-status={status}>
                <span className={r.supplierHead}><b>{supplier.name}</b><em>{supplier.channel}</em></span>
                <span className={r.supplierPo}>{supplier.lines}</span>
                <span className={r.supplierStatus}>
                  {status === 'acknowledged' ? <CircleCheck strokeWidth={2.2} /> : status === 'received' ? <FileText strokeWidth={2.2} /> : <Clock3 strokeWidth={2.2} />}
                  {status === 'acknowledged' ? supplier.ack : status === 'received' ? `${supplier.po} ${t.received}` : t.waiting}
                </span>
              </div>;
            })}
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/** A flow action: connector icon, name and connector, then its result once it has run. */
function Node({ icon: Icon, name, detail, result, state, tone = 'ok' }) {
  return <div className={r.node} data-state={state} data-tone={tone}>
    <span className={r.nodeIcon}><Icon strokeWidth={1.9} /></span>
    <span className={r.nodeText}>
      <b>{name}</b><span>{detail}</span>
      <em>{state === 'done' ? result : ''}</em>
    </span>
    <span className={r.nodeMark}>{state === 'done' && <Check strokeWidth={3} />}</span>
    {state === 'running' && <span className={r.nodeBar} />}
  </div>;
}
