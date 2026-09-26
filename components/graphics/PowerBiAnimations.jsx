'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import s from './PowerBiAnimations.module.css';
import { useLanguage } from '../../context/LanguageContext';

// CSS owns the timelines. Visibility changes never trigger a React animation loop.
function Frame({ title, description, kind, children }) {
  const ref = useRef(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    const visibility = () => { element.dataset.visible = String(!document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => { element.dataset.running = String(entry.isIntersecting); },
      { threshold: 0.15 },
    );
    visibility();
    if (observer) observer.observe(element);
    else element.dataset.running = 'true';
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  return <figure ref={ref} className={`${s.frame} ${s[kind]}`} data-running="false" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`}>
    <figcaption id={`${id}-title`} className={s.title}>{title}</figcaption>
    <svg className={s.canvas} viewBox="0 0 360 220" fill="none" aria-hidden="true">{children}</svg>
    <span id={`${id}-desc`} className={s.srOnly}>{description}</span>
  </figure>;
}

function Rule({ y }) { return <path d={`M18 ${y}H342`} className={s.rule} />; }
function Status({ label }) {
  return <g><circle cx="24" cy="203" r="2.5" className={s.statusDot} /><text x="34" y="207" className={s.micro}>{label}</text><text x="340" y="207" textAnchor="end" className={s.micro}>POWER BI</text></g>;
}

export const PbiDataStorytellingUiAnim = memo(function PbiDataStorytellingUiAnim() {
  const id = useId();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const trend = 'M172 93L194 86L216 89L238 68L260 72L282 49L304 41L330 30';
  return <Frame title="High-Adoption Executive Dashboard" kind="dashboard" description="An executive dashboard reveals 98.4% adoption, a rising engagement trend, a margin waterfall, fast OneLake queries and engagement across executive and operations roles. Illustrative data.">
    <defs><linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#F2C811" stopOpacity=".17" /><stop offset="1" stopColor="#F2C811" stopOpacity="0" /></linearGradient></defs>
    <text x="18" y="25" className={s.label}>{isEs ? 'Adopción de equipo' : 'Team adoption'}</text>
    <text x="16" y="73" className={s.primary}>98.4<tspan className={s.percent}>%</tspan></text>
    <text x="19" y="97" className={s.micro}>{isEs ? 'Visión unificada y dirección compartida.' : 'A clearer view. A shared direction.'}</text>
    <path d="M172 100H332M172 68H332M172 36H332" className={s.grid} />
    <path d={`${trend}V100H172Z`} fill={`url(#${id}-area)`} className={s.trendArea} />
    <path d={trend} pathLength="100" className={s.trend} />
    <circle cx="330" cy="30" r="6" className={s.endpointRing} /><circle cx="330" cy="30" r="2.5" className={s.endpoint} />
    <Rule y="114" />
    <path d="M130 130V178M247 130V178" className={s.rule} />
    <text x="18" y="136" className={s.micro}>{isEs ? 'Margen neto' : 'Net margin'}</text>
    <text x="18" y="160" className={s.metric}>+34.2<tspan fontSize="12">%</tspan></text>
    {[{ x: 20, y: 173, h: 11 }, { x: 42, y: 168, h: 6 }, { x: 64, y: 164, h: 5 }, { x: 86, y: 163, h: 21 }].map((bar, i) => <rect key={bar.x} x={bar.x} y={bar.y} width="15" height={bar.h} rx="1" className={s.bar} style={{ '--delay': `${i * 0.16}s` }} />)}
    <path d="M35 173H42M57 168H64M79 164H86" className={s.waterfallLink} />
    <text x="146" y="136" className={s.micro}>{isEs ? 'Motor OneLake' : 'OneLake engine'}</text>
    <text x="146" y="160" className={s.metric}>0.02<tspan fontSize="12">s</tspan></text>
    <path d="M148 182H157L162 177L170 179L179 172L189 174L198 170H229" pathLength="100" className={`${s.trend} ${s.latency}`} />
    <text x="261" y="136" className={s.micro}>{isEs ? 'Uso activo' : 'Engagement'}</text>
    <circle cx="278" cy="165" r="15" className={s.donutTrack} />
    <circle cx="278" cy="165" r="15" pathLength="100" className={s.donut} />
    <text x="303" y="160" className={s.legend}>52% Exec</text><text x="303" y="177" className={s.legendMuted}>48% Ops</text>
    <Rule y="191" /><Status label={isEs ? 'Resumen ejecutivo' : 'Executive overview'} />
  </Frame>;
});

export const PbiAiInsightsOverlayAnim = memo(function PbiAiInsightsOverlayAnim() {
  const id = useId();
  const { language } = useLanguage();
  const isEs = language === 'es';
  return <Frame title="Automated Reasoning Overlay" kind="reasoning" description="AI scans a retention chart, identifies a trend change and reveals a plain-language insight: retention expanded 42%. The insight stays visible before the next scan. Illustrative data.">
    <defs><linearGradient id={`${id}-scan`}><stop stopColor="#F2C811" stopOpacity="0" /><stop offset="1" stopColor="#F2C811" stopOpacity=".12" /></linearGradient></defs>
    <text x="18" y="25" className={s.label}>{isEs ? 'Análisis de retención' : 'Retention analysis'}</text><text x="340" y="25" textAnchor="end" className={s.micro}>Q3 / EXECUTIVE OPS</text>
    <path d="M20 52H340M20 78H340M20 104H340" className={s.grid} />
    {[31, 43, 35, 51, 47, 59, 69, 78, 84, 92].map((height, i) => <rect key={i} x={25 + i * 31} y={112 - height * .67} width="15" height={height * .67} rx="2" className={i > 5 ? s.insightBar : s.contextBar} />)}
    <g className={s.scanner}><rect x="0" y="40" width="48" height="72" fill={`url(#${id}-scan)`} /><path d="M48 40V112" stroke="#F2C811" strokeOpacity=".65" /></g>
    <path d="M29 88L62 82L94 87L124 74L155 77L186 68L217 61L248 52L279 49L311 42" pathLength="100" className={s.insightLine} />
    <g className={s.finding}><circle cx="248" cy="52" r="8" className={s.endpointRing} /><circle cx="248" cy="52" r="3" className={s.endpoint} /><path d="M248 61V119" className={s.annotation} /></g>
    <g className={s.insight}>
      <rect x="16" y="120" width="328" height="63" rx="8" className={s.insightSurface} />
      <path d="M32 133L34 138L39 140L34 142L32 147L30 142L25 140L30 138Z" className={s.spark} />
      <text x="46" y="144" className={s.insightLabel}>{isEs ? 'La historia tras la tendencia' : 'The story behind the trend'}</text>
      <text x="29" y="168" className={s.insightText}>{isEs ? 'Retención expandida ' : 'Retention expanded '}<tspan className={s.insightNumber}>+42%.</tspan></text>
      <path d="M320 137l3 3 6-6" className={s.check} />
    </g>
    <Rule y="191" /><Status label={isEs ? 'De la señal a la decisión' : 'From signal to explanation'} />
  </Frame>;
});

const dimensions = [
  { name: 'Customer', nameEs: 'Cliente', field: 'customer_id', x: 16, y: 35, path: 'M112 58H132Q142 58 142 68V98H146' },
  { name: 'Time', nameEs: 'Tiempo', field: 'date_id', x: 248, y: 35, path: 'M248 58H228Q218 58 218 68V98H214' },
  { name: 'Store', nameEs: 'Tienda', field: 'store_id', x: 16, y: 128, path: 'M112 151H132Q142 151 142 141V114H146' },
  { name: 'Product', nameEs: 'Producto', field: 'product_id', x: 248, y: 128, path: 'M248 151H228Q218 151 218 141V114H214' },
];

export const PbiSemanticModelGraphAnim = memo(function PbiSemanticModelGraphAnim() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  return <Frame title="Advanced Semantic Architecture" kind="semantic" description="A star schema connects Customer, Time, Store and Product dimensions to the central Fact Sales table through one-to-many relationships, powered by Direct Lake.">
    <text x="18" y="20" className={s.micro}>{isEs ? 'Cuatro dimensiones. Una sola verdad.' : 'Four dimensions. One source of truth.'}</text>
    {dimensions.map((node, i) => <g key={node.name} style={{ '--delay': `${i * .55}s` }}>
      <path d={node.path} className={s.connection} />
      <path d={node.path} pathLength="100" className={s.packet} />
      <g className={s.dimension}>
        <rect x={node.x} y={node.y} width="96" height="46" rx="6" className={s.tableSurface} />
        <path d={`M${node.x} ${node.y + 25}h96`} className={s.rule} />
        <text x={node.x + 10} y={node.y + 17} className={s.tableName}>{isEs ? node.nameEs : node.name}</text>
        <text x={node.x + 10} y={node.y + 39} className={s.field}>{node.field}</text>
        <text x={node.x < 100 ? 119 : 237} y={node.y + 17} className={s.cardinality}>1</text>
      </g>
    </g>)}
    <rect x="142" y="72" width="76" height="68" rx="9" className={s.hubOuter} />
    <rect x="146" y="76" width="68" height="60" rx="6" className={s.hub} />
    <path d="M172 86h16v12h-16zM172 90h16M177 86v12" className={s.tableIcon} />
    <text x="180" y="113" textAnchor="middle" className={s.factName}>Fact_Sales</text>
    <text x="180" y="127" textAnchor="middle" className={s.factType}>1 : N</text>
    <path d="M180 140V164" className={s.connection} />
    <text x="180" y="178" textAnchor="middle" className={s.lakeLabel}>DIRECT LAKE</text>
    <Rule y="191" /><Status label={isEs ? 'Modelo semántico conectado' : 'Connected semantic model'} />
  </Frame>;
});
