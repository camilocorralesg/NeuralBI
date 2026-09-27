'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { BatteryFull, CalendarDays, ChevronDown, ChevronRight, Search, Signal, Wifi, WifiOff } from 'lucide-react';
import u from './ui.module.css';

// Served through the app's basePath, like the navbar logo.
const LOGO = '/NeuralBI/assets/Neuralbi%20logo%20solo.svg';
const EASE = [.22, 1, .36, 1];

/** The NeuralBI mark, as every product shows it. */
export function Mark({ className = '' }) {
  return <img src={LOGO} alt="" className={className} />;
}

/** A NeuralBI product window: icon rail with the mark, a header (title, context, search, a period or run pill, user) and the page. */
export function AppShell({ nav, active, title, context, search, period, initials = 'CC', children }) {
  return <div className={u.shell}>
    <nav className={u.rail} aria-hidden="true">
      <Mark className={u.logo} />
      {nav.map((Icon, i) => <span key={i} className={u.navItem} data-active={i === active}><Icon strokeWidth={1.8} /></span>)}
    </nav>
    <div className={u.page}>
      <header className={u.header}>
        <div className={u.heading}>
          <span className={u.title}>{title}</span>
          <span className={u.context}>{context}</span>
        </div>
        <div className={u.tools}>
          <span className={u.search}><Search strokeWidth={2} />{search}</span>
          <span className={u.period}><CalendarDays strokeWidth={2} />{period}<ChevronDown strokeWidth={2} /></span>
          <span className={u.avatar}>{initials}</span>
        </div>
      </header>
      {children}
    </div>
  </div>;
}

/** A tool's top bar (a flow designer, an agent), not a dashboard's: the mark, where you are, and the tool's own controls. */
export function ProductBar({ section, title, children }) {
  return <header className={u.bar}>
    <Mark className={u.barLogo} />
    <span className={u.crumbs}><span>{section}</span><ChevronRight strokeWidth={2} /><b>{title}</b></span>
    <span className={u.barTools}>{children}</span>
  </header>;
}

/** A quiet status pill with an optional icon; `tone` 'ok' | 'risk' | 'idle'. */
export function Pill({ icon: Icon, tone = 'idle', children }) {
  return <span className={u.tag} data-tone={tone}>{Icon && <Icon strokeWidth={2} />}{children}</span>;
}

/** Text that lands word by word: the first `shown` words are visible, the rest hold their place. */
export function Words({ text, shown = Infinity }) {
  return text.split(' ').map((word, i) => <span key={i} className={u.word} data-shown={i < shown}>{word} </span>);
}

/** Panel with a title row; `action` renders a quiet pill (a period picker, "View all"). */
export function Card({ title, action, className = '', children }) {
  return <section className={`${u.card} ${className}`}>
    {title && <header className={u.cardHead}>
      <span className={u.cardTitle}>{title}</span>
      {action && <span className={u.pill}>{action}</span>}
    </header>}
    {children}
  </section>;
}

/** A figure that glides between readings (tabular digits, so nothing jitters). */
export function LiveNumber({ value, decimals = 1, prefix = '', suffix = '', className = '' }) {
  const [shown, setShown] = useState(value);
  const previous = useRef(value);
  useEffect(() => {
    const from = previous.current;
    previous.current = value;
    if (from === value) return undefined;
    const controls = animate(from, value, { duration: .9, ease: EASE, onUpdate: setShown });
    return () => controls.stop();
  }, [value]);
  return <span className={`${u.number} ${className}`} data-value={`${prefix}${value.toFixed(decimals)}${suffix}`}>
    {prefix}{shown.toFixed(decimals)}{suffix}
  </span>;
}

/** Headline metric: icon tile, label, value and its change against the previous period. `tone` 'good' | 'risk'. */
export function KpiCard({ icon: Icon, label, children, delta, tone = 'good' }) {
  return <div className={u.kpi} data-tone={tone}>
    <span className={u.kpiIcon}><Icon strokeWidth={1.9} /></span>
    <span className={u.kpiText}>
      <span className={u.kpiLabel}>{label}</span>
      <span className={u.kpiValue}>{children}</span>
      <span className={u.kpiDelta}>{delta}</span>
    </span>
  </div>;
}

/** Health of a node or lane: 'healthy' · 'risk' · 'mitigated' · 'idle'. */
export function StatusChip({ state, label }) {
  return <span className={u.chip} data-state={state}>{label}</span>;
}

/** Simulated pointer that travels to (`x`, `y`, px inside the window) and presses when `pressed`. */
export function Cursor({ x, y, visible, pressed }) {
  return <span className={u.cursor} data-visible={visible} data-pressed={pressed} style={{ transform: `translate(${x}px, ${y}px)` }} aria-hidden="true">
    <svg viewBox="0 0 20 22" className={u.pointer}>
      <path d="M2 1.5 17.5 12l-7.1 1.3-3.7 6.7z" />
    </svg>
  </span>;
}

/** Phone hardware: graphite frame, status bar with the island; `offline` swaps the Wi-Fi mark. */
export function Phone({ time = '14:32', offline = false, className = '', children }) {
  const Network = offline ? WifiOff : Wifi;
  return <div className={`${u.phone} ${className}`}>
    <div className={u.phoneScreen}>
      <div className={u.statusBar}>
        <span>{time}</span>
        <span className={u.island} />
        <span className={u.statusIcons} data-offline={offline}><Signal strokeWidth={2.2} /><Network strokeWidth={2.2} /><BatteryFull strokeWidth={2} /></span>
      </div>
      {children}
    </div>
  </div>;
}

/** A desktop app window inside a device composition: the stage window's graphite, light edge and sheen, without its frame. */
export function Window({ className = '', children }) {
  return <div className={`${u.appWindow} ${className}`}>{children}</div>;
}

/** Rugged tablet hardware for the plant floor: a thick graphite body, rubber corner guards, a side scan trigger and its rating. */
export function RuggedTablet({ className = '', rating = 'IP65 · 1.8 m drop', children }) {
  return <div className={`${u.rugged} ${className}`}>
    {['tl', 'tr', 'bl', 'br'].map(corner => <span key={corner} className={u.bumper} data-corner={corner} />)}
    <span className={u.trigger} />
    <div className={u.ruggedScreen}>{children}</div>
    <span className={u.rating}>{rating}</span>
  </div>;
}

/** Tablet hardware: slimmer graphite frame with a camera in the bezel. */
export function Tablet({ className = '', children }) {
  return <div className={`${u.tablet} ${className}`}>
    <div className={u.tabletScreen}>{children}</div>
  </div>;
}

/** A fingertip touch at (`x`, `y`, px inside its positioned parent); `pressed` rings once. */
export function Tap({ x, y, visible, pressed }) {
  return <span className={u.tap} data-visible={visible} data-pressed={pressed} style={{ transform: `translate(${x}px, ${y}px)` }} aria-hidden="true" />;
}
