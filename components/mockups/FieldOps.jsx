'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, CircleCheck, Clock3, CloudOff, MapPin, RefreshCw, Wifi } from 'lucide-react';
import { LiveNumber, Mark, Phone, Tablet, Tap } from './ui/primitives';
import { useStoryline } from './ui/useStoryline';
import f from './FieldOps.module.css';

/* NeuralBI Field: the product behind "Custom Apps & Field Operations". Offline-first Power Apps with React/PCF
 * components: a receiving tablet scans the pallets of PO #4821 (the order dispatched in the control tower), keeps
 * scanning through a dropped connection, syncs, and the driver confirms dispatch on the phone. */
const BEATS = [
  { id: 'scan', duration: 3200 },
  { id: 'offline', duration: 3000 },
  { id: 'sync', duration: 1800 },
  { id: 'dispatch', duration: 2400 },
  { id: 'hold', duration: 2200 },
];
const TOTAL = 24;

const words = {
  en: {
    receiving: 'Receiving', dock: 'Dock 3 · Monterrey DC',
    online: 'Online', offline: 'Offline', queued: 'queued', syncing: 'Syncing', synced: 'Synced', dispatched: 'Dispatched',
    scanned: 'Scanned', savedOffline: 'Saved offline', manifest: 'Manifest', pallets: 'pallets',
    items: ['Resin · 25 kg', 'PET preforms', 'Caps · 38 mm', 'Label rolls', 'Shrink film', 'Stretch wrap'],
    route: 'Route MX-14', routeSub: 'Monterrey → Bogotá',
    connected: 'Connected · synced 14:31', workingOffline: 'Working offline', changesQueued: 'changes queued',
    syncingChanges: 'Syncing changes', allSynced: 'All changes synced',
    stop: 'Dock 3 · Monterrey DC', load: '24 pallets · PO #4821', seal: 'Seal verified', photos: 'Load photos · 2', signature: 'Driver signature',
    confirm: 'Confirm dispatch', done: 'Dispatched', eta: 'ETA 3.8 d', next: 'Next stop', nextStop: 'Bogotá DC · Dock 1',
  },
  es: {
    receiving: 'Recepción', dock: 'Muelle 3 · CD Monterrey',
    online: 'En línea', offline: 'Sin conexión', queued: 'en cola', syncing: 'Sincronizando', synced: 'Sincronizado', dispatched: 'Despachado',
    scanned: 'Escaneado', savedOffline: 'Guardado offline', manifest: 'Manifiesto', pallets: 'pallets',
    items: ['Resina · 25 kg', 'Preformas PET', 'Tapas · 38 mm', 'Rollos de etiqueta', 'Film retráctil', 'Film estirable'],
    route: 'Ruta MX-14', routeSub: 'Monterrey → Bogotá',
    connected: 'Conectado · sincronizado 14:31', workingOffline: 'Trabajando sin conexión', changesQueued: 'cambios en cola',
    syncingChanges: 'Sincronizando cambios', allSynced: 'Todo sincronizado',
    stop: 'Muelle 3 · CD Monterrey', load: '24 pallets · OC #4821', seal: 'Sello verificado', photos: 'Fotos de carga · 2', signature: 'Firma del conductor',
    confirm: 'Confirmar despacho', done: 'Despachado', eta: 'ETA 3.8 d', next: 'Próxima parada', nextStop: 'CD Bogotá · Muelle 1',
  },
};
const pallet = n => `PAL-4821-${String(n).padStart(2, '0')}`;

function readings(phase, step) {
  const scanned = phase === 'scan' ? 18 + step : phase === 'offline' ? 21 + step : TOTAL;
  const queued = phase === 'offline' ? step : phase === 'sync' ? 3 - step : 0;
  const connection = phase === 'scan' ? 'online' : phase === 'offline' ? 'offline'
    : phase === 'sync' && queued > 0 ? 'syncing' : phase === 'hold' ? 'dispatched' : 'synced';
  const synced = (phase === 'sync' && step >= 3) || phase === 'dispatch' || phase === 'hold';
  return {
    scanned,
    queued,
    connection,
    scanning: phase === 'scan' || phase === 'offline',
    dispatched: phase === 'hold',
    checks: [true, (phase === 'sync' && step >= 1) || synced, synced],
  };
}

export default function FieldOps({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  const [step, setStep] = useState(3);
  const root = useRef(null);
  const button = useRef(null);
  const [tap, setTap] = useState({ x: 0, y: 0, visible: false, pressed: false });

  // Scans land one by one, online or offline, then the queue drains as the sync runs.
  useEffect(() => {
    if (!live || !['scan', 'offline', 'sync'].includes(phase)) return undefined;
    setStep(0);
    const timer = setInterval(() => setStep(value => Math.min(value + 1, 3)), phase === 'sync' ? 450 : 850);
    return () => clearInterval(timer);
  }, [live, phase]);

  // The driver's fingertip lands on "Confirm dispatch".
  useLayoutEffect(() => {
    if (!live || phase !== 'dispatch') {
      setTap(current => ({ ...current, visible: false, pressed: false }));
      return undefined;
    }
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const target = () => {
      const box = root.current?.getBoundingClientRect(), cta = button.current?.getBoundingClientRect();
      return box && cta ? { x: cta.left - box.left + cta.width * .5, y: cta.top - box.top + cta.height * .5 } : null;
    };
    at(300, () => { const point = target(); if (point) setTap({ x: point.x + 40, y: point.y + 70, visible: false, pressed: false }); });
    at(380, () => { const point = target(); if (point) setTap(current => ({ ...current, ...point, visible: true })); });
    at(1350, () => setTap(current => ({ ...current, pressed: true })));
    at(1700, () => setTap(current => ({ ...current, pressed: false })));
    return () => timers.forEach(clearTimeout);
  }, [live, phase]);

  const data = readings(phase, step);
  const rows = Array.from({ length: 5 }, (_, i) => data.scanned - i);
  const offline = data.connection === 'offline';
  const connection = {
    online: [Wifi, t.online],
    offline: [CloudOff, `${t.offline} · ${data.queued} ${t.queued}`],
    syncing: [RefreshCw, `${t.syncing} · ${data.queued}`],
    synced: [Check, t.synced],
    dispatched: [CircleCheck, t.dispatched],
  }[data.connection];
  const ConnectionIcon = connection[0];
  const banner = offline ? ['offline', CloudOff, `${t.workingOffline} · ${data.queued} ${t.changesQueued}`]
    : data.connection === 'syncing' ? ['syncing', RefreshCw, t.syncingChanges]
      : phase === 'scan' ? ['quiet', Wifi, t.connected] : ['synced', Check, t.allSynced];
  const BannerIcon = banner[1];

  return <div ref={root} className={f.root} data-phase={phase}>
    <Tablet className={f.tablet}>
      <header className={f.tBar}>
        <Mark className={f.tLogo} />
        <span className={f.tTitle}><b>{t.receiving}</b><span>{t.dock}</span></span>
        <span className={f.conn} data-state={data.connection}><ConnectionIcon strokeWidth={2.2} />{connection[1]}</span>
        <span className={f.avatar}>MR</span>
      </header>
      <div className={f.tBody}>
        <section className={f.scanner} data-scanning={data.scanning}>
          <div className={f.viewfinder}>
            <span className={f.label}>
              <span className={f.labelHead}><b>MEX DC</b><span>PO #4821</span></span>
              <span className={f.barcode} />
              <span className={f.labelId}>{pallet(data.scanned)}</span>
              <span className={f.labelMeta}>{t.items[data.scanned % t.items.length]} · {data.scanned}/{TOTAL}</span>
            </span>
            {['tl', 'tr', 'bl', 'br'].map(corner => <span key={corner} className={f.corner} data-corner={corner} />)}
            <span className={f.scanLine} />
          </div>
          <div key={data.scanned} className={f.toast} data-tone={offline ? 'queued' : 'ok'}>
            {offline ? <Clock3 strokeWidth={2.2} /> : <Check strokeWidth={2.4} />}
            <span>{offline ? t.savedOffline : t.scanned} · {pallet(data.scanned)}</span>
          </div>
        </section>
        <section className={f.manifest}>
          <header className={f.manifestHead}><span><b>{t.manifest}</b> PO #4821</span><span className={f.pcf}>React · PCF</span></header>
          <div className={f.progress}>
            <span><LiveNumber value={data.scanned} decimals={0} /> / {TOTAL} {t.pallets}</span>
            <span className={f.track}><span style={{ transform: `scaleX(${data.scanned / TOTAL})` }} /></span>
          </div>
          <ul className={f.rows}>
            {rows.map(n => {
              const state = n > data.scanned - data.queued ? 'queued' : 'synced';
              return <li key={n} data-state={state}>
                <span className={f.rowIcon}>{state === 'queued' ? <Clock3 strokeWidth={2.2} /> : <Check strokeWidth={2.4} />}</span>
                <span className={f.rowText}><b>{pallet(n)}</b><span>{t.items[n % t.items.length]}</span></span>
                <span className={f.rowQty}>{40 + (n * 7) % 30} u</span>
              </li>;
            })}
          </ul>
        </section>
      </div>
    </Tablet>

    <Phone className={f.phone} offline={offline}>
      <header className={f.pHead}>
        <Mark className={f.pLogo} />
        <span className={f.pTitle}><b>{t.route}</b><span>{t.routeSub}</span></span>
        <span className={f.avatar}>JR</span>
      </header>
      <div className={f.banner} data-state={banner[0]}><BannerIcon strokeWidth={2.2} /><span>{banner[2]}</span></div>
      <div className={f.map} data-dispatched={data.dispatched}>
        <svg viewBox="0 0 160 88" aria-hidden="true">
          <path d="M0 30H160M0 62H160M44 0V88M108 0V88M0 12Q60 30 160 8" className={f.road} />
          <path d="M-4 80Q40 60 70 74T164 60" className={f.river} />
          <path d="M28 24C58 20 66 58 98 56S124 64 132 70" className={f.routeBase} />
          <path d="M28 24C58 20 66 58 98 56S124 64 132 70" pathLength="100" className={f.routeLive} />
          <circle cx="28" cy="24" r="4.2" className={f.origin} />
          <circle cx="132" cy="70" r="3.4" className={f.destination} />
          <text x="34" y="19" className={f.city}>MTY</text>
          <text x="112" y="82" className={f.city}>BOG</text>
        </svg>
        <span className={f.eta}>{t.eta}</span>
      </div>
      <section className={f.stop}>
        <header><b>{t.stop}</b><span>{t.load}</span></header>
        <ul className={f.checklist}>
          {[t.seal, t.photos, t.signature].map((label, i) => <li key={label} data-done={data.checks[i]}>
            <span className={f.box}>{data.checks[i] && <Check strokeWidth={3} />}</span>{label}
          </li>)}
        </ul>
      </section>
      <div className={f.next}>
        <span className={f.nextIcon}><MapPin strokeWidth={2} /></span>
        <span className={f.nextText}><span>{t.next}</span><b>{t.nextStop}</b></span>
        <span className={f.nextEta}>3.8 d</span>
      </div>
      <span ref={button} className={f.cta} data-done={data.dispatched} data-pressed={tap.pressed}>
        {data.dispatched ? <><CircleCheck strokeWidth={2.2} />{t.done} · {t.eta}</> : t.confirm}
      </span>
    </Phone>
    <Tap {...tap} />
  </div>;
}
