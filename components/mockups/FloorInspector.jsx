'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Ban, Bluetooth, Check, CloudCheck, Hand, Lock, Ruler, Scale, ScanBarcode, ScanEye, Wrench, X } from 'lucide-react';
import { LiveNumber, Mark, Pill, RuggedTablet, Tap } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import r from './FloorInspector.module.css';

/* NeuralBI Inspect: the product behind "Floor Inspector Mobile Apps": a Power Apps canvas app with React/PCF controls on
 * a rugged tablet at Line 2. The inspector scans a sample from IMM-01 cavity 14, the Bluetooth caliper and scale check
 * the neck and the weight, the AI vision control finds a short shot, and a gloved tap raises work order WO-5540 and puts
 * the lot on quality hold. */
const BEATS = [
  { id: 'scan', duration: 2200 },
  { id: 'measure', duration: 2600 },
  { id: 'detect', duration: 2200 },
  { id: 'act', duration: 3000 },
  { id: 'hold', duration: 2400 },
];
// Per beat: how many things land (the lock-on, caliper readings, AI boxes, the work order), and how often.
const STEPS = { scan: [1, 700], measure: [3, 520], detect: [2, 600], act: [1, 1500], hold: [0, 1000] };
const CALIPER = [27.96, 27.99, 28.02];

const words = {
  en: {
    app: 'NeuralBI Inspect', line: 'Line 2 · QC', glove: 'Glove mode', synced: 'Synced · Dataverse',
    camera: 'Camera', neck: 'Neck', body: 'Body', defect: 'Short shot · 94%',
    checklist: 'QC checklist', sample: 'Sample 3 of 5',
    rows: [
      ['Lot scanned', 'IMM-01 · cavity 14'],
      ['Neck finish', 'BT caliper · ±0.10 mm'],
      ['Preform weight', 'BT scale · ±0.3 g'],
      ['Visual inspection', 'AI vision · PCF'],
    ],
    waiting: 'Waiting', shortShot: 'Short shot',
    passing: 'Passing so far', reject: 'Reject sample',
    rejectBtn: 'Reject sample', createWo: 'Create work order', woCreated: 'WO-5540 created',
    wo: 'Work order WO-5540', high: 'High', asset: 'IMM-01 · cavity 14', defectName: 'Short shot on thread start',
    photo: 'Photo attached', assigned: 'Maintenance · shift B', hold: 'Quality hold · L2-0917',
    fields: ['Asset', 'Defect', 'Team'],
  },
  es: {
    app: 'NeuralBI Inspect', line: 'Línea 2 · Calidad', glove: 'Modo guantes', synced: 'Sincronizado · Dataverse',
    camera: 'Cámara', neck: 'Cuello', body: 'Cuerpo', defect: 'Llenado incompleto · 94%',
    checklist: 'Checklist de calidad', sample: 'Muestra 3 de 5',
    rows: [
      ['Lote escaneado', 'IMM-01 · cavidad 14'],
      ['Acabado del cuello', 'Calibre BT · ±0.10 mm'],
      ['Peso de la preforma', 'Balanza BT · ±0.3 g'],
      ['Inspección visual', 'Visión IA · PCF'],
    ],
    waiting: 'En espera', shortShot: 'Llenado incompleto',
    passing: 'Conforme hasta ahora', reject: 'Rechazar muestra',
    rejectBtn: 'Rechazar muestra', createWo: 'Crear orden de trabajo', woCreated: 'WO-5540 creada',
    wo: 'Orden de trabajo WO-5540', high: 'Alta', asset: 'IMM-01 · cavidad 14', defectName: 'Llenado incompleto al inicio de la rosca',
    photo: 'Foto adjunta', assigned: 'Mantenimiento · turno B', hold: 'Retención de calidad · L2-0917',
    fields: ['Equipo', 'Defecto', 'Responsable'],
  },
};
const ROW_ICONS = [ScanBarcode, Ruler, Scale, ScanEye];

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const scan = through('scan'), measure = through('measure'), detect = through('detect'), act = through('act');
  const rows = [
    scan >= 1 ? 'pass' : 'pending',
    measure >= 2 ? 'pass' : measure >= 0 ? 'reading' : 'pending',
    measure >= 3 ? 'pass' : 'pending',
    detect >= 2 ? 'fail' : detect >= 0 ? 'reading' : 'pending',
  ];
  return {
    locked: scan >= 1,
    caliper: CALIPER[Math.min(Math.max(measure, 0), 2)],
    measured: measure >= 2,
    rows,
    boxes: detect >= 1,
    defect: detect >= 2,
    rejected: detect >= 2,
    workOrder: act >= 1,
  };
}

export default function FloorInspector({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const root = useRef(null);
  const button = useRef(null);
  const [tap, setTap] = useState({ x: 0, y: 0, visible: false, pressed: false });

  // A gloved fingertip lands on "Create work order".
  useLayoutEffect(() => {
    if (!live || phase !== 'act') {
      setTap(current => ({ ...current, visible: false, pressed: false }));
      return undefined;
    }
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const target = () => {
      const box = root.current?.getBoundingClientRect(), cta = button.current?.getBoundingClientRect();
      return box && cta ? { x: cta.left - box.left + cta.width * .5, y: cta.top - box.top + cta.height * .5 } : null;
    };
    at(250, () => { const point = target(); if (point) setTap({ x: point.x + 40, y: point.y + 50, visible: false, pressed: false }); });
    at(330, () => { const point = target(); if (point) setTap(current => ({ ...current, ...point, visible: true })); });
    at(1200, () => setTap(current => ({ ...current, pressed: true })));
    at(1500, () => setTap(current => ({ ...current, pressed: false })));
    // The finger lifts as the sheet rises, so it never rests on the work order.
    at(1600, () => setTap(current => ({ ...current, visible: false })));
    return () => timers.forEach(clearTimeout);
  }, [live, phase]);

  const value = i => {
    if (i === 0) return data.rows[0] === 'pass' ? 'L2-0917' : '–';
    if (i === 1) return data.rows[1] === 'pending' ? '–' : <LiveNumber value={data.caliper} decimals={2} suffix=" mm" />;
    if (i === 2) return data.rows[2] === 'pass' ? <LiveNumber value={23.9} suffix=" g" /> : '–';
    return data.rows[3] === 'fail' ? t.shortShot : data.rows[3] === 'reading' ? '…' : t.waiting;
  };

  return <div ref={root} className={r.root} data-phase={phase}>
    <RuggedTablet className={r.device}>
      <header className={r.bar}>
        <Mark className={r.logo} />
        <span className={r.title}><b>{t.app}</b><span>{t.line}</span></span>
        <span className={r.pills}>
          <Pill icon={Hand} tone="ok">{t.glove}</Pill>
          <span className={r.synced}><Pill icon={CloudCheck}>{t.synced}</Pill></span>
        </span>
      </header>

      <div className={r.body}>
        <section className={r.camera} data-locked={data.locked}>
          <span className={r.cameraHead}><span>{t.camera}</span><span className={r.pcf}>React · PCF</span></span>
          <svg viewBox="0 0 200 150" className={r.view} aria-hidden="true">
            <defs>
              <linearGradient id="inspect-pet" x1="0" x2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity=".05" /><stop offset=".45" stopColor="#ffffff" stopOpacity=".16" /><stop offset="1" stopColor="#ffffff" stopOpacity=".04" />
              </linearGradient>
            </defs>
            {/* The preform: threaded neck, support ring, tapered body and closed base. */}
            <g className={r.preform}>
              <rect x="82" y="18" width="36" height="22" rx="2" fill="url(#inspect-pet)" />
              <path d="M82 23H118M82 28H118M82 33H118" className={r.thread} />
              <rect x="74" y="40" width="52" height="6" rx="2" fill="url(#inspect-pet)" />
              <path d="M84 46L86 118Q100 142 114 118L116 46Z" fill="url(#inspect-pet)" />
            </g>
            <g className={r.brackets}>
              <path d="M58 16V6H70M142 16V6H130M58 134V144H70M142 134V144H130" />
            </g>
            <g className={r.dimension} data-shown={data.measured}>
              <path d="M82 11H118M82 8V14M118 8V14" />
              <text x="100" y="6.5">28.02 mm</text>
            </g>
            <g className={r.boxes} data-shown={data.boxes}>
              <rect x="76" y="15" width="48" height="33" rx="2" />
              <text x="76" y="62" className={r.boxLabel}>{t.neck} ✓</text>
              <rect x="80" y="66" width="40" height="72" rx="2" />
              <text x="124" y="127" className={r.boxLabel}>{t.body} ✓</text>
            </g>
            <g className={r.defect} data-shown={data.defect}>
              <rect x="104" y="18" width="17" height="11" rx="1.5" />
              <path d="M121 23H146" />
              <text x="148" y="25.5">{t.defect}</text>
            </g>
          </svg>
        </section>

        <section className={r.checklist}>
          <span className={r.listHead}><b>{t.checklist}</b><span>{t.sample}</span></span>
          <ul className={r.rows}>
            {t.rows.map(([label, detail], i) => {
              const Icon = ROW_ICONS[i];
              const state = data.rows[i];
              return <li key={label} data-state={state}>
                <span className={r.rowIcon}><Icon strokeWidth={2} /></span>
                <span className={r.rowText}><b>{label}</b><span>{(i === 1 || i === 2) && <Bluetooth strokeWidth={2} />}{detail}</span></span>
                <span className={r.rowValue}>{value(i)}</span>
                <span className={r.mark}>{state === 'pass' ? <Check strokeWidth={3} /> : state === 'fail' ? <X strokeWidth={3} /> : null}</span>
              </li>;
            })}
          </ul>
          <span className={r.verdict} data-rejected={data.rejected}>{data.rejected ? <Ban strokeWidth={2.2} /> : <Check strokeWidth={2.6} />}{data.rejected ? t.reject : t.passing}</span>
        </section>
      </div>

      <div className={r.actions}>
        <span className={r.secondary}><Ban strokeWidth={2.2} />{t.rejectBtn}</span>
        <span ref={button} className={r.primary} data-done={data.workOrder} data-pressed={tap.pressed}>
          <Wrench strokeWidth={2.2} />{data.workOrder ? t.woCreated : t.createWo}
        </span>
      </div>

      <aside className={r.sheet} data-open={data.workOrder}>
        <span className={r.grabber} />
        <span className={r.sheetHead}>
          <b>{t.wo}</b><span className={r.priority}>{t.high}</span>
          <span className={r.hold}><Lock strokeWidth={2.2} />{t.hold}</span>
        </span>
        <dl className={r.fields}>
          <div><dt>{t.fields[0]}</dt><dd>{t.asset}</dd></div>
          <div><dt>{t.fields[1]}</dt><dd>{t.defectName}</dd></div>
          <div><dt>{t.photo}</dt><dd className={r.thumb}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 3h4v4h-4zM7 7h6l1 10q-4 3-8 0z" /><circle cx="12.5" cy="4.5" r="1.8" /></svg>cav14-0917.jpg</dd></div>
          <div><dt>{t.fields[2]}</dt><dd>{t.assigned}</dd></div>
        </dl>
      </aside>
    </RuggedTablet>
    <Tap {...tap} />
  </div>;
}
