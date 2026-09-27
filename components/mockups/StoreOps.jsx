'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Check, CircleCheck, CreditCard, MessageSquare, PackageCheck, Send, TriangleAlert, Undo2, UserX } from 'lucide-react';
import { LiveNumber, Mark, Phone, Tap } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import s from './StoreOps.module.css';

/* NeuralBI Store Ops: the product behind "Store Manager Operations Apps": three Power Apps with PCF controls on the
 * store manager's phones at Andina Chapinero, each one standing in front of the paper form it replaces. A delivery is
 * received against its ASN and the missing carton files its own claim; a sick call's shift is offered and accepted;
 * an online order is returned in store and refunded after its policy checks. As each is done, its form slides away. */
const BEATS = [
  { id: 'intake', duration: 3400 },
  { id: 'shifts', duration: 3400 },
  { id: 'returns', duration: 3400 },
  { id: 'hold', duration: 2600 },
];
// Per beat: how many things land (cartons and the claim, the offer and its answer, checks and the refund), and how often.
const STEPS = { intake: [4, 700], shifts: [2, 1200], returns: [4, 600], hold: [0, 1000] };
const APPS = ['intake', 'shifts', 'returns'];

const words = {
  en: {
    store: 'Chapinero', papers: [['Receiving log', 'Form SO-12 · rev. 2019'], ['Shift swap form', 'Form HR-07 · rev. 2018'], ['Return slip', 'Form RA · rev. 2020']],
    paperFields: ['Date', 'Store', 'Signature'],
    intake: 'Intake', dock: 'Chapinero · dock', asn: 'ASN-7731 · Textiles Pacífico', asnSub: '12 cartons · 264 u expected',
    cartons: 'cartons', received: 'Received', missing: 'Missing', pending: 'Pending',
    claim: 'Claim DC-318 filed · photo · supplier notified', stocked: '+242 u in stock · Dynamics 365',
    shifts: 'Shifts', date: 'Sat 14 Jun', sick: 'Camila T. called in sick · 16:05', sickSub: 'Cashier · 18:00–22:00',
    coverage: 'Cashier coverage', best: 'Best match',
    people: [['SR', 'Sofía R.', '22 h this week · available'], ['AP', 'Andrés P.', '38 h · overtime']],
    offer: 'Offer shift to Sofía', sent: 'Offer sent · Teams', accepted: 'Sofía accepted · 16:09',
    teamsOffer: 'Open shift · Cashier 18:00–22:00 today', awaiting: 'Waiting for Sofía', reply: 'Yes, I can cover it.',
    returns: 'Returns', desk: 'Service desk', item: 'Rain jacket · M', order: 'Online order #W-58213 · 12 days ago',
    checks: ['Within 30 days · 12 d', 'Receipt · loyalty ID', 'Condition · new with tags'],
    authorize: 'Authorize refund · $86', refunded: 'Refunded to card · restocked',
    card: 'Visa ··4417 · original card', restock: 'Floor A-12 · online stock', restocked: 'Restocked · online +1',
  },
  es: {
    store: 'Chapinero', papers: [['Registro de recepción', 'Formato SO-12 · rev. 2019'], ['Cambio de turno', 'Formato HR-07 · rev. 2018'], ['Boleta de devolución', 'Formato RA · rev. 2020']],
    paperFields: ['Fecha', 'Tienda', 'Firma'],
    intake: 'Recepción', dock: 'Chapinero · muelle', asn: 'ASN-7731 · Textiles Pacífico', asnSub: '12 cajas · 264 u esperadas',
    cartons: 'cajas', received: 'Recibida', missing: 'Faltante', pending: 'Pendiente',
    claim: 'Reclamo DC-318 · foto · proveedor avisado', stocked: '+242 u en stock · Dynamics 365',
    shifts: 'Turnos', date: 'sáb 14 jun', sick: 'Camila T. reportó incapacidad · 16:05', sickSub: 'Caja · 18:00–22:00',
    coverage: 'Cobertura de caja', best: 'Mejor opción',
    people: [['SR', 'Sofía R.', '22 h esta semana · disponible'], ['AP', 'Andrés P.', '38 h · horas extra']],
    offer: 'Ofrecer turno a Sofía', sent: 'Oferta enviada · Teams', accepted: 'Sofía aceptó · 16:09',
    teamsOffer: 'Turno abierto · Caja 18:00–22:00 hoy', awaiting: 'Esperando a Sofía', reply: 'Sí, yo lo cubro.',
    returns: 'Devoluciones', desk: 'Servicio al cliente', item: 'Chaqueta impermeable · M', order: 'Pedido online #W-58213 · hace 12 días',
    checks: ['Dentro de 30 días · 12 d', 'Recibo · ID de lealtad', 'Estado · nueva con etiquetas'],
    authorize: 'Autorizar reembolso · $86', refunded: 'Reembolsado a la tarjeta · reintegrado',
    card: 'Visa ··4417 · tarjeta original', restock: 'Piso A-12 · stock online', restocked: 'Reintegrado · online +1',
  },
};
const TIMES = ['15:32', '16:09', '18:12'];
// Cashier coverage from 10:00 to 22:00 (12 h); Camila's 18:00–22:00 is the gap.
const GAP = { left: `${(18 - 10) / 12 * 100}%`, width: `${4 / 12 * 100}%` };

function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const intake = through('intake'), shifts = through('shifts'), returns = through('returns');
  const claimed = intake >= 4;
  return {
    focus: phase === 'hold' ? null : phase,
    received: 8 + Math.min(Math.max(intake, 0), 3),
    claimed,
    offer: shifts >= 2 ? 'accepted' : shifts >= 1 ? 'sent' : 'idle',
    checks: Math.max(0, Math.min(returns, 3)),
    refunded: returns >= 4,
    gone: [claimed, shifts >= 2, returns >= 4],
  };
}

export default function StoreOps({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const step = useBeatSteps(phase, live, ...STEPS[phase]);
  const data = readings(phase, step);
  const root = useRef(null);
  const offer = useRef(null);
  const authorize = useRef(null);
  const [tap, setTap] = useState({ x: 0, y: 0, visible: false, pressed: false });

  // The manager's fingertip: on "Offer shift" in Shifts, on "Authorize refund" in Returns.
  useLayoutEffect(() => {
    if (!live || (phase !== 'shifts' && phase !== 'returns')) {
      setTap(current => ({ ...current, visible: false, pressed: false }));
      return undefined;
    }
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const button = phase === 'shifts' ? offer : authorize;
    const target = () => {
      const box = root.current?.getBoundingClientRect(), cta = button.current?.getBoundingClientRect();
      // A button the narrow layout hides has no size: the fingertip stays away rather than aiming at nothing.
      if (!box || !cta || (box.width && !cta.width)) return null;
      return { x: cta.left - box.left + cta.width * .5, y: cta.top - box.top + cta.height * .5 };
    };
    // The fingertip travels about a second to its button, so it appears a second before it presses.
    const [start, press, release, hide] = phase === 'shifts' ? [100, 1150, 1400, 1900] : [1150, 2250, 2550, 3100];
    at(start, () => { const point = target(); if (point) setTap({ x: point.x + 30, y: point.y + 60, visible: false, pressed: false }); });
    at(start + 80, () => { const point = target(); if (point) setTap(current => ({ ...current, ...point, visible: true })); });
    at(press, () => setTap(current => ({ ...current, pressed: true })));
    at(release, () => setTap(current => ({ ...current, pressed: false })));
    at(hide, () => setTap(current => ({ ...current, visible: false })));
    return () => timers.forEach(clearTimeout);
  }, [live, phase]);

  const slot = (app, i, children) => <div key={app} className={s.slot} data-app={app}
    data-focus={data.focus ? data.focus === app : 'all'} data-last={i === 2}>
    <Paper t={t} i={i} gone={data.gone[i]} />
    <Phone className={s.phone} time={TIMES[i]}>
      <header className={s.head}>
        <Mark className={s.logo} />
        <span className={s.title}><b>{t[app]}</b><span>{[t.dock, t.date, t.desk][i]}</span></span>
        <span className={s.avatar}>LM</span>
      </header>
      <div className={s.screen}>{children}</div>
    </Phone>
  </div>;

  return <div ref={root} className={s.root} data-phase={phase}>
    <div className={s.row}>
      {slot('intake', 0, <>
        <section className={s.card}>
          <b>{t.asn}</b><span>{t.asnSub}</span>
        </section>
        <div className={s.scanner}>
          <span className={s.label}>
            <span className={s.barcode} />
            <b>CTN-7731-{String(Math.min(data.received, 11)).padStart(2, '0')}</b>
          </span>
          {['tl', 'tr', 'bl', 'br'].map(corner => <span key={corner} className={s.corner} data-corner={corner} />)}
        </div>
        <div className={s.progress}>
          <span className={s.progressHead}>
            <span><b><LiveNumber value={data.received} decimals={0} /></b> / 12 {t.cartons}</span><span className={s.pcf}>React · PCF</span>
          </span>
          <span className={s.track}><i style={{ transform: `scaleX(${data.received / 12})` }} /></span>
        </div>
        <ul className={s.cartons}>
          {[12, 11, 10, 9].map(n => {
            const state = n <= data.received ? 'ok' : n === 12 && data.claimed ? 'missing' : 'pending';
            return <li key={n} data-state={state}>
              <span className={s.mark}>{state === 'ok' ? <Check strokeWidth={3} /> : state === 'missing' ? <TriangleAlert strokeWidth={2.4} /> : null}</span>
              <b>CTN-7731-{String(n).padStart(2, '0')}</b><em>{t[state === 'ok' ? 'received' : state]}</em>
            </li>;
          })}
        </ul>
        <span className={s.note} data-tone="warn" data-shown={data.claimed}><TriangleAlert strokeWidth={2.2} />{t.claim}</span>
        <span className={s.note} data-tone="ok" data-shown={data.claimed}><PackageCheck strokeWidth={2.2} />{t.stocked}</span>
      </>)}

      {slot('shifts', 1, <>
        <section className={s.alert}><UserX strokeWidth={2.1} /><span><b>{t.sick}</b><span>{t.sickSub}</span></span></section>
        <div className={s.coverage}>
          <span className={s.coverageHead}><span>{t.coverage}</span><span className={s.pcf}>PCF</span></span>
          <span className={s.timeline}>
            <i className={s.covered} />
            <i className={s.gap} data-filled={data.offer === 'accepted'} style={GAP} />
          </span>
          <span className={s.hours}><span>10:00</span><span>14:00</span><span>18:00</span><span>22:00</span></span>
        </div>
        <ul className={s.people}>
          {t.people.map(([initials, name, detail], i) => <li key={initials} data-best={i === 0}>
            <span className={s.avatar}>{initials}</span>
            <span className={s.person}><b>{name}</b><span>{detail}</span></span>
            {i === 0 && <em>{t.best}</em>}
          </li>)}
        </ul>
        <section className={s.teams} data-state={data.offer}>
          <span className={s.teamsHead}><MessageSquare strokeWidth={2.1} />Teams<em>{data.offer === 'accepted' ? '16:09' : '16:07'}</em></span>
          <span className={s.teamsOffer}>{t.teamsOffer}</span>
          <span className={s.reply}>{data.offer === 'accepted' ? <><b>Sofía R.</b> {t.reply}</> : t.awaiting}</span>
        </section>
        <span ref={offer} className={s.cta} data-state={data.offer} data-pressed={tap.pressed && phase === 'shifts'}>
          {data.offer === 'accepted' ? <CircleCheck strokeWidth={2.2} /> : <Send strokeWidth={2.2} />}
          {data.offer === 'accepted' ? t.accepted : data.offer === 'sent' ? t.sent : t.offer}
        </span>
      </>)}

      {slot('returns', 2, <>
        <section className={s.item}>
          <span className={s.thumb}>
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M15 6h10l3 4 7 4-3 9-4-2v14H12V21l-4 2-3-9 7-4z" />
              <path d="M20 10v27M15 6l5 5 5-5" />
            </svg>
          </span>
          <span className={s.itemText}><b>{t.item}</b><span>{t.order}</span></span>
          <b className={s.price}>$86</b>
        </section>
        <ul className={s.policy}>
          {t.checks.map((check, i) => <li key={check} data-done={data.checks > i}>
            <span className={s.box}>{data.checks > i && <Check strokeWidth={3} />}</span>{check}
          </li>)}
        </ul>
        <section className={s.refund} data-done={data.refunded}>
          <span><CreditCard strokeWidth={2} /><span>{t.card}</span><b>$86.00</b></span>
          <span><PackageCheck strokeWidth={2} /><span>{data.refunded ? t.restocked : t.restock}</span>{data.refunded && <Check strokeWidth={3} />}</span>
        </section>
        <span ref={authorize} className={s.cta} data-state={data.refunded ? 'accepted' : 'idle'} data-pressed={tap.pressed && phase === 'returns'}>
          {data.refunded ? <CircleCheck strokeWidth={2.2} /> : <Undo2 strokeWidth={2.2} />}
          {data.refunded ? t.refunded : t.authorize}
        </span>
      </>)}
    </div>
    <Tap {...tap} />
  </div>;
}

/** The paper form an app replaces: ruled, boxed and signed by hand, until the app is done with it. */
function Paper({ t, i, gone }) {
  const [title, code] = t.papers[i];
  return <div className={s.paper} data-paper={APPS[i]} data-gone={gone} aria-hidden="true">
    <b>{title}</b><span className={s.code}>{code}</span>
    <span className={s.fields}>{t.paperFields.slice(0, 2).map(field => <span key={field}>{field}</span>)}</span>
    {[0, 1, 2, 3, 4].map(line => <i key={line} className={s.rule} />)}
    <svg viewBox="0 0 60 14" className={s.scrawl}><path d="M2 10c6-8 9 4 14-2s6-5 9 1 7-6 11 0 6 3 10-2 5 1 12-1" /></svg>
    <span className={s.sign}>{t.paperFields[2]}</span>
  </div>;
}
