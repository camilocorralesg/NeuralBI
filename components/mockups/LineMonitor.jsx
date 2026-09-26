'use client';

import React from 'react';
import { ArrowRight, Bell, CircleCheck, Database, Gauge, MessageSquare, Radio, TriangleAlert, Wrench, Zap } from 'lucide-react';
import { Card, LiveNumber, Pill, ProductBar } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import m from './LineMonitor.module.css';

/* NeuralBI · Line Monitor — the product behind "IoT Telemetry & OEE Analytics": a Fabric Real-Time Intelligence
 * dashboard over Line 2 at Polímeros del Norte, Monterrey (the PET preforms of the supply chain story). Sensors stream
 * through Eventstream into Eventhouse; IMM-02's pump bearing starts to vibrate and heat, Data Activator fires its rule,
 * slows the machine to 70%, raises a work order and tells maintenance. OEE gives up three points to save the bearing. */
const BEATS = [
  { id: 'stream', duration: 3000 },
  { id: 'drift', duration: 2600 },
  { id: 'alert', duration: 2200 },
  { id: 'act', duration: 2800 },
  { id: 'hold', duration: 2000 },
];
// Per beat: how many things land (readings, the climb, the fault peak, Activator's actions), and how often.
const STEPS = { stream: [3, 900], drift: [4, 560], alert: [1, 700], act: [3, 800], hold: [0, 1000] };

const words = {
  en: {
    hub: 'Real-Time Hub', line: 'Line 2 · Monterrey', events: 'events/s', eventhouse: 'Eventhouse · KQL · 0.8 s',
    lineTitle: 'Line 2 · PET preforms', lineAction: 'Polímeros del Norte',
    names: ['Dryer', 'Injection', 'Injection', 'Chiller', 'Conveyor', 'Vision QA'],
    states: { running: 'Running', alert: 'Vibration', reduced: 'Derated 70%' },
    oee: 'OEE · shift', target: 'target 85%', parts: ['Availability', 'Performance', 'Quality'],
    thermal: 'Thermal · IMM-02 pump', bearing: 'Bearing',
    vibration: 'Vibration · IMM-02', rms: 'RMS', zone: 'Zone', minutes: '10 min', spectrum: 'Spectrum', peak: 'BPFO 142 Hz · outer race',
    activator: 'Activator', rule: 'IMM-02 vibration > 7.1 mm/s for 30 s',
    armed: 'Armed', fired: 'Fired · 14:07:32', handled: 'Handled',
    actions: [['Reduce IMM-02 speed to 70%', '14:07:33'], ['Work order WO-5531 · bearing · 22:00 shift', '14:07:34'], ['Notify maintenance · Teams', '14:07:34']],
  },
  es: {
    hub: 'Real-Time Hub', line: 'Línea 2 · Monterrey', events: 'eventos/s', eventhouse: 'Eventhouse · KQL · 0.8 s',
    lineTitle: 'Línea 2 · preformas PET', lineAction: 'Polímeros del Norte',
    names: ['Secadora', 'Inyectora', 'Inyectora', 'Enfriador', 'Transportador', 'Visión QA'],
    states: { running: 'En marcha', alert: 'Vibración', reduced: 'Reducida 70%' },
    oee: 'OEE · turno', target: 'meta 85%', parts: ['Disponibilidad', 'Rendimiento', 'Calidad'],
    thermal: 'Térmico · bomba IMM-02', bearing: 'Rodamiento',
    vibration: 'Vibración · IMM-02', rms: 'RMS', zone: 'Zona', minutes: '10 min', spectrum: 'Espectro', peak: 'BPFO 142 Hz · pista externa',
    activator: 'Activator', rule: 'Vibración IMM-02 > 7.1 mm/s por 30 s',
    armed: 'Armada', fired: 'Disparada · 14:07:32', handled: 'Atendida',
    actions: [['Reducir velocidad de IMM-02 al 70%', '14:07:33'], ['Orden WO-5531 · rodamiento · turno 22:00', '14:07:34'], ['Avisar a mantenimiento · Teams', '14:07:34']],
  },
};
const MACHINES = [
  { code: 'DRY-01', temp: 165, vib: 0.9 },
  { code: 'IMM-01', temp: 71, vib: 2.1 },
  { code: 'IMM-02', watched: true },
  { code: 'CHL-01', temp: 12, vib: 1.4 },
  { code: 'CNV-01', temp: 34, vib: 1.1 },
  { code: 'QA-01', temp: 29, vib: 0.4 },
];

// Vibration RMS (mm/s) every 30 s over the last 10 minutes; ISO 10816 zones A < 2.8 < B < 7.1 < C < 11 < D.
const vibY = rms => 104 - rms * 8;
const ZONES = [['A', 0, 2.8], ['B', 2.8, 7.1], ['C', 7.1, 11], ['D', 11, 12]];
const HISTORY = [2.4, 2.6, 2.3, 2.5, 2.7, 2.4, 2.6, 2.8, 2.5, 2.6, 2.7, 2.5, 2.8, 2.7];
const TAILS = {
  steady: [2.8, 2.7, 2.9, 2.8, 2.9, 2.8],
  rising: [3.3, 4.1, 5.0, 6.1, 6.9, 7.4],
  recovered: [3.6, 5.2, 7.4, 6.3, 4.9, 4.2],
};
const smooth = pts => pts.reduce((d, [x, y], i, all) => {
  if (!i) return `M${x} ${y}`;
  const [px, py] = all[i - 1], handle = (x - px) / 2;
  return `${d}C${px + handle} ${py} ${x - handle} ${y} ${x} ${y}`;
}, '');
const vibPoint = (rms, i) => [i * 15.75, vibY(rms)];
const HISTORY_PATH = smooth(HISTORY.map(vibPoint));
const tailPath = kind => smooth([vibPoint(HISTORY[HISTORY.length - 1], HISTORY.length - 1), ...TAILS[kind].map((rms, i) => vibPoint(rms, HISTORY.length + i))]);
// Spectrum: 24 bins to 500 Hz; the outer-race fault frequency (BPFO, 142 Hz) is bin 6, its harmonic bin 13.
const NOISE = [.18, .24, .2, .3, .22, .26, .2, .17, .21, .19, .23, .16, .2, .18, .15, .17, .14, .16, .12, .15, .11, .13, .1, .12];
const PEAK = 6, HARMONIC = 13;
// Thermal image of the pump housing: 16 × 6 cells, a hotspot over the bearing (column 11, row 2).
const COLS = 16, ROWS = 6;
const heat = (amplitude, col, row) => 45 + amplitude * Math.exp(-((col - 11) ** 2 / 9 + (row - 2) ** 2 / 3.2));
const bucket = temp => (temp >= 84 ? 5 : temp >= 78 ? 4 : temp >= 70 ? 3 : temp >= 60 ? 2 : temp >= 50 ? 1 : 0);

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const s = through('stream'), d = through('drift'), a = through('alert'), act = through('act');
  const reduced = act >= 1;
  const climb = Math.min(Math.max(d, 0), 4);
  const rms = reduced ? 4.2 : d >= 0 ? 2.8 + climb * 1.15 : 2.8;
  const temp = reduced ? 79 : d >= 0 ? 68 + climb * 4.5 : 68;
  return {
    rms,
    zone: rms >= 7.1 ? 'C' : rms >= 2.8 ? 'B' : 'A',
    temp,
    amplitude: temp - 45,
    tail: act >= 0 ? 'recovered' : d >= 0 ? 'rising' : 'steady',
    tailDrawn: act >= 0 ? Math.min(act + 1, 3) / 3 : d >= 0 ? climb / 4 : 1,
    peak: a >= 0 ? (reduced ? .55 : 1) : d >= 3 ? .45 : 0,
    watched: reduced ? 'reduced' : d >= 2 || a >= 0 ? 'alert' : 'running',
    speed: reduced ? 70 : 100,
    rule: act >= 3 ? 'handled' : a >= 0 ? 'fired' : 'armed',
    actions: [act >= 1, act >= 2, act >= 3],
    oee: reduced ? 81.4 : s >= 1 || d >= 0 ? 84.2 : 84.1,
    performance: reduced ? 91.8 : 95,
    eventsPerSecond: [18.4, 18.6, 18.3, 18.5][Math.min(Math.max(s, 0), 3)] || 18.5,
  };
}

export default function LineMonitor({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => bucket(heat(data.amplitude, i % COLS, Math.floor(i / COLS))));
  const bars = NOISE.map((noise, i) => (i === PEAK ? Math.max(noise, data.peak) : i === HARMONIC ? Math.max(noise, data.peak * .4) : noise));
  const parts = [92, data.performance, 96.4];

  return <div className={m.app} data-phase={phase} data-zone={data.zone}>
    <ProductBar section={t.hub} title={t.line}>
      <Pill icon={Radio} tone="ok">Eventstream · <LiveNumber value={data.eventsPerSecond} suffix="k" /> {t.events}</Pill>
      <span className={m.eventhouse}><Pill icon={Database}>{t.eventhouse}</Pill></span>
    </ProductBar>

    <div className={m.body}>
      <Card title={t.lineTitle} action={t.lineAction} className={m.lineCard}>
        <ol className={m.line}>
          {MACHINES.map(({ code, temp, vib, watched }, i) => {
            const state = watched ? data.watched : 'running';
            return <li key={code} className={m.machine} data-state={state} data-code={code}>
              <span className={m.machineHead}><b>{code}</b>{i < MACHINES.length - 1 && <ArrowRight strokeWidth={2} className={m.flow} />}</span>
              <span className={m.machineName}>{t.names[i]}</span>
              <span className={m.metrics}>
                <span><LiveNumber value={watched ? data.temp : temp} decimals={0} suffix=" °C" /></span>
                <span><LiveNumber value={watched ? data.rms : vib} suffix=" mm/s" /></span>
              </span>
              <span className={m.state}>{watched ? t.states[state] : t.states.running}</span>
            </li>;
          })}
        </ol>
      </Card>

      <div className={m.row}>
        <Card title={t.oee} className={m.oeeCard}>
          <div className={m.oee}>
            <LiveNumber value={data.oee} suffix="%" className={m.oeeValue} />
            <span className={m.target} data-below={data.oee < 85}><Gauge strokeWidth={2} />{t.target}</span>
          </div>
          <ul className={m.parts}>
            {parts.map((value, i) => <li key={t.parts[i]} data-dip={i === 1 && value < 95}>
              <span>{t.parts[i]}</span>
              <span className={m.track}><span style={{ transform: `scaleX(${value / 100})` }} /></span>
              <LiveNumber value={value} suffix="%" className={m.partValue} />
            </li>)}
          </ul>
          <span className={m.formula}>A × P × Q</span>
        </Card>

        <Card title={t.thermal} className={m.thermalCard}>
          <div className={m.thermal}>
            <div className={m.grid} style={{ '--cols': COLS }}>
              {cells.map((level, i) => <span key={i} data-heat={level} />)}
            </div>
            <span className={m.hotspot} data-heat={bucket(data.temp)}>
              <small>{t.bearing}</small>
              <LiveNumber value={data.temp} decimals={0} suffix=" °C" />
            </span>
          </div>
          <div className={m.scale}>
            <span className={m.ramp}>{[0, 1, 2, 3, 4, 5].map(level => <i key={level} data-heat={level} />)}</span>
            <span className={m.scaleLabels}><span>45 °C</span><span>70 °C</span><span>90 °C</span></span>
          </div>
        </Card>

        <Card title={t.vibration} action={t.minutes} className={m.vibCard}>
          <div className={m.vibHead}>
            <span className={m.rms} data-zone={data.zone}><small>{t.rms}</small><LiveNumber value={data.rms} suffix=" mm/s" /></span>
            <span className={m.zoneChip} data-zone={data.zone}>{t.zone} {data.zone}</span>
          </div>
          <svg viewBox="0 0 300 104" preserveAspectRatio="none" className={m.trend} aria-hidden="true">
            {ZONES.map(([zone, from, to]) => <rect key={zone} x="0" y={vibY(to)} width="300" height={vibY(from) - vibY(to)} className={m.band} data-band={zone} />)}
            <path d={HISTORY_PATH} className={m.history} vectorEffect="non-scaling-stroke" />
            {Object.keys(TAILS).map(kind => <path key={kind} d={tailPath(kind)} pathLength="100" className={m.tail} data-kind={kind}
              data-on={data.tail === kind} style={{ strokeDashoffset: data.tail === kind ? 100 - data.tailDrawn * 100 : 100 }} vectorEffect="non-scaling-stroke" />)}
          </svg>
          <div className={m.spectrum}>
            <small>{t.spectrum}</small>
            <span className={m.bins}>
              {bars.map((value, i) => <span key={i} data-peak={i === PEAK && data.peak >= .9} style={{ transform: `scaleY(${value})` }} />)}
            </span>
            <span className={m.peakLabel} data-shown={data.peak >= .9}>{t.peak}</span>
          </div>
        </Card>
      </div>

      <section className={m.activator} data-rule={data.rule}>
        <span className={m.ruleHead}>
          <span className={m.ruleIcon}><Zap strokeWidth={2} /></span>
          <span className={m.ruleText}><small>{t.activator}</small><b>{t.rule}</b></span>
          <Pill tone={data.rule === 'fired' ? 'risk' : data.rule === 'handled' ? 'ok' : 'idle'} icon={data.rule === 'fired' ? TriangleAlert : data.rule === 'handled' ? CircleCheck : Bell}>
            {t[data.rule]}
          </Pill>
        </span>
        <ol className={m.actions}>
          {t.actions.map(([label, time], i) => {
            const Icon = [Gauge, Wrench, MessageSquare][i];
            return <li key={label} data-done={data.actions[i]}>
              <Icon strokeWidth={2} /><span>{label}</span><time>{data.actions[i] ? time : '—'}</time>
            </li>;
          })}
        </ol>
      </section>
    </div>
  </div>;
}
