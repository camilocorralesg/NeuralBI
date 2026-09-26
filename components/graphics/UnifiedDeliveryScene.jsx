'use client';

import React, { memo, useEffect, useId, useRef, useState } from 'react';
import s from './UnifiedDeliveryScene.module.css';

const copy = {
  en: {
    label: 'Unified delivery: from enterprise data to working products',
    description: 'Enterprise records and documents converge in NeuralBI, align into a shared model, and build a Power BI chart, a Power Apps workflow and a grounded Copilot response.',
    hint: 'Explore a source or a deliverable to see its role in the system.',
    phases: ['Connect', 'Unify', 'Deliver'],
    model: '', chart: 'Performance', app: 'Operations', agent: 'Knowledge',
    trend: 'Trend identified', record: 'New record', assigned: 'Assigned', approved: 'Approved',
    question: 'What needs attention?', answer: 'Answer grounded in your data', sources: 'Linked sources', action: 'Action prepared',
    mobile: ['CRM & ERP systems', 'Databases & warehouses', 'Microsoft ecosystem'],
  },
  es: {
    label: 'Entrega unificada: de datos empresariales a productos funcionales',
    description: 'Los registros y documentos convergen en NeuralBI, se alinean en un modelo compartido y construyen un gráfico de Power BI, un flujo de Power Apps y una respuesta de Copilot con fuentes.',
    hint: 'Explora una fuente o un entregable para conocer su función en el sistema.',
    phases: ['Conectar', 'Unificar', 'Entregar'],
    model: '', chart: 'Rendimiento', app: 'Operaciones', agent: 'Conocimiento',
    trend: 'Tendencia identificada', record: 'Nuevo registro', assigned: 'Asignado', approved: 'Aprobado',
    question: '¿Qué necesita atención?', answer: 'Respuesta basada en tus datos', sources: 'Fuentes vinculadas', action: 'Acción preparada',
    mobile: ['Sistemas CRM y ERP', 'Bases de datos y almacenes', 'Ecosistema Microsoft'],
  },
};

const desktop = {
  width: 1000, height: 610, hub: [500, 213],
  inputs: [[160, 107], [140, 213], [160, 319], [840, 107], [860, 213], [840, 319]],
  outputs: [[260, 478], [500, 497], [740, 478]],
  incoming: ['M270 107C355 107 375 157 440 183', 'M250 213H432', 'M270 319C355 319 375 269 440 243', 'M730 107C645 107 625 157 560 183', 'M750 213H568', 'M730 319C645 319 625 269 560 243'],
  outgoing: ['M472 272C472 340 260 325 260 402', 'M500 281V421', 'M528 272C528 340 740 325 740 402'],
};
const mobile = {
  width: 340, height: 1090, hub: [170, 360],
  inputs: [[170, 75], [170, 150], [170, 225]],
  outputs: [[170, 550], [170, 750], [170, 950]],
  incoming: [
    'M170 75V295',
    'M170 150V295',
    'M170 225V295',
  ],
  outgoing: [
    'M170 430V500',
    'M170 430V700',
    'M170 430V900',
  ],
};

function Check({ x = 0, y = 0 }) {
  return <path transform={`translate(${x} ${y})`} d="m0 4 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
}

function ProductPreview({ index, words }) {
  return <svg viewBox="0 0 240 112" fill="none" aria-hidden="true" className={s.preview}>
    {index === 0 && <>
      <g className={s.productStructure}>
        <text x="15" y="18" className={s.micro}>{words.chart}</text>
        <path d="M15 39H225M15 60H225M15 81H225" className={s.gridLine} />
        <path d="M15 90H225" className={s.rule} />
      </g>
      <g className={s.productContent}>
        {[19, 29, 25, 43, 37, 52, 63].map((h, i) => <rect key={i} x={24 + i * 27} y={84 - h} width="13" height={h} rx="2" className={s.bar} />)}
        <path d="M28 64L55 58 82 62 109 44 136 49 163 35 190 23" pathLength="100" className={s.chartLine} />
      </g>
      <g className={s.productResult}>
        <circle cx="190" cy="23" r="4" fill="#c6ff34" stroke="#111a13" strokeWidth="2" />
        <Check x={15} y={100} /><text x="30" y="107" className={s.resultText}>{words.trend}</text>
      </g>
    </>}
    {index === 1 && <>
      <g className={s.productStructure}>
        <path d="M40 0V90M0 90H240" className={s.rule} />
        <rect x="12" y="12" width="16" height="16" rx="4" fill="#c6ff34" fillOpacity=".14" />
        <path d="M17 17H23M17 21H21M14 41H26M14 52H23M14 63H25" className={s.ruleBright} />
        <text x="52" y="19" className={s.micro}>{words.app}</text>
      </g>
      <g className={s.productContent}>
        <rect x="51" y="29" width="173" height="25" rx="4" className={s.field} />
        <circle cx="64" cy="42" r="3" fill="#c6ff34" />
        <text x="74" y="45" className={s.micro}>{words.record}</text>
        <path d="M62 55V68H76" className={s.ruleBright} />
        <rect x="78" y="60" width="146" height="20" rx="3" className={s.field} />
        <text x="87" y="73" className={s.micro}>{words.assigned}</text>
        <circle cx="211" cy="70" r="4" fill="#b0bbaa" />
      </g>
      <g className={s.productResult}><rect x="150" y="96" width="75" height="15" rx="4" fill="#c6ff34" /><Check x={158} y={100} /><text x="174" y="107" className={s.buttonText}>{words.approved}</text><path d="M16 102H66M16 108H49" className={s.rule} /></g>
    </>}
    {index === 2 && <>
      <g className={s.productStructure}>
        <text x="15" y="18" className={s.micro}>{words.agent}</text>
        <rect x="43" y="29" width="181" height="22" rx="5" className={s.field} />
        <text x="54" y="43" className={s.micro}>{words.question}</text>
      </g>
      <g className={s.productContent}>
        <path d="m20 61 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#c6ff34" />
        <text x="35" y="65" className={s.micro}>{words.answer}</text>
        <path d="M35 74H194M35 79H165" className={s.ruleBright} />
        <rect x="35" y="85" width="15" height="12" rx="3" className={s.field} /><rect x="54" y="85" width="15" height="12" rx="3" className={s.field} />
        <text x="40" y="94" className={s.citation}>1</text><text x="59" y="94" className={s.citation}>2</text><text x="77" y="94" className={s.micro}>{words.sources}</text>
      </g>
      <g className={s.productResult}><Check x={15} y={102} /><text x="30" y="109" className={s.resultText}>{words.action}</text></g>
    </>}
  </svg>;
}

// Every animated layer shares one 14-second clock. No per-frame React updates.
function DeliveryCanvas({ compact, nodes, mobileInputNodes, icons, inputsHeader, deliverablesHeader, words }) {
  const ref = useRef(null);
  const id = useId();
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [selected, setSelected] = useState(null);
  const active = selected || focused || hovered;
  const layout = compact ? mobile : desktop;
  const sources = compact ? mobileInputNodes.map((n, i) => ({ ...n, name: words.mobile[i] })) : nodes.slice(0, 6);
  const outputs = nodes.slice(6, 9);
  const activeNode = [...sources, ...outputs].find(n => n.id === active);

  useEffect(() => {
    const element = ref.current;
    const visibility = () => { element.dataset.visible = String(!document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => { element.dataset.running = String(entry.isIntersecting && entry.intersectionRatio >= .15); }, { threshold: .15 },
    );
    visibility();
    if (observer) observer.observe(element);
    else element.dataset.running = 'true';
    document.addEventListener('visibilitychange', visibility);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  const position = ([x, y]) => ({ left: `${x / layout.width * 100}%`, top: `${y / layout.height * 100}%` });
  const events = node => ({
    onMouseEnter: () => setHovered(node.id), onMouseLeave: () => setHovered(null),
    onFocus: () => setFocused(node.id), onBlur: () => setFocused(null),
    onClick: () => setSelected(current => current === node.id ? null : node.id),
    onKeyDown: event => { if (event.key === 'Escape') { setSelected(null); setFocused(null); setHovered(null); } },
    'aria-pressed': selected === node.id, 'aria-describedby': active === node.id ? `${id}-detail` : undefined,
  });

  return <figure ref={ref} className={`${s.scene} ${compact ? s.mobile : s.desktop}`} data-running="false" aria-label={words.label} aria-describedby={`${id}-description`}>
    <p id={`${id}-description`} className={s.srOnly}>{words.description}</p>
    <div className={s.canvas} style={{ aspectRatio: `${layout.width} / ${layout.height}` }}>
      <div className={s.inputLabel}>{inputsHeader.replace(/[[\]]/g, '').trim()}</div>
      {!compact && <div className={s.inputLabelRight}>{inputsHeader.replace(/[[\]]/g, '').trim()}</div>}
      <svg viewBox={`0 0 ${layout.width} ${layout.height}`} fill="none" aria-hidden="true" className={s.connections}>
        <defs>
          <radialGradient id={`${id}-wash`}><stop stopColor="#c6ff34" stopOpacity=".07" /><stop offset="1" stopColor="#c6ff34" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx={layout.hub[0]} cy={layout.hub[1]} rx={compact ? 100 : 180} ry="135" fill={`url(#${id}-wash)`} />
        {layout.incoming.map((d, i) => <g key={d} className={`${s.inputRoute} ${s[`source${i % 3}`]}`} data-active={active === sources[i].id}>
          <path d={d} className={s.route} />
          <path d={d} pathLength="100" className={s.inputPacket} />
          <g className={s.record} style={{ offsetPath: `path('${d}')` }}>
            <rect x="-9" y="-6" width="18" height="12" rx="2" fill="#151f12" stroke="#c6ff34" strokeWidth=".8" />
            {i % 3 === 2 ? <path d="M-5-2H3M-5 1H5M-5 4H1" stroke="#e0f0c9" strokeWidth=".8" /> : <><rect x="-5" y="-2" width="3" height="4" rx=".5" fill="#c6ff34" /><path d="M0-1H5M0 2H3" stroke="#d9e4cd" strokeWidth=".8" /></>}
          </g>
        </g>)}
        {layout.outgoing.map((d, i) => <g key={d} className={`${s.outputRoute} ${s[`output${i}`]}`} data-active={active === outputs[i].id}>
          <path d={d} className={s.route} /><path d={d} pathLength="100" className={s.outputPacket} />
          <g className={s.deliveryToken} style={{ offsetPath: `path('${d}')` }}><rect x="-4" y="-4" width="8" height="8" rx="2" fill="#c6ff34" /><path d="M-1-2V2M1-2V2" stroke="#344222" strokeWidth=".7" /></g>
        </g>)}
      </svg>

      {sources.map((node, i) => <div key={node.id} className={`${s.sourcePosition} ${s[`source${i % 3}`]}`} style={position(layout.inputs[i])}>
        <button type="button" className={s.source} data-active={active === node.id} {...events(node)}>
          <span className={s.sourceIcon} aria-hidden="true">{icons[node.iconKey]}</span><span className={s.sourceName}>{node.name}</span><span className={s.status} aria-hidden="true" />
        </button>
      </div>)}

      <div className={s.hubPosition} style={position(layout.hub)} aria-hidden="true">
        <svg viewBox="0 0 160 160" className={s.hub}>
          <circle cx="80" cy="80" r="67" className={s.hubTrack} />
          <circle cx="80" cy="80" r="67" pathLength="100" className={s.hubProgress} transform="rotate(-90 80 80)" />
          <circle cx="80" cy="80" r="53" fill="#101610" stroke="#3b4930" />
          <circle cx="80" cy="80" r="48" fill="#0b100d" stroke="#202c1e" />
          {[0, 1, 2].map(i => <g key={i} className={s[`merge${i}`]}><rect x={55 + i * 18} y="118" width="14" height="7" rx="2" fill="#c6ff34" /><path d={`M${59 + i * 18} 121.5h6`} stroke="#35421c" /></g>)}
          <path d="M76 4H84M76 156H84M4 76V84M156 76V84" stroke="#566447" strokeWidth="1" />
          <image href="/NeuralBI/assets/Neuralbi logo solo.svg" x="58" y="51" width="44" height="48" />
          <path d="M66 108H94" className={s.hubSeam} />
        </svg>
        <span className={s.modelLabel}>{words.model}</span>
      </div>

      {outputs.map((node, i) => <div key={node.id} className={`${s.productPosition} ${s[`output${i}`]}`} style={position(layout.outputs[i])}>
        <button type="button" className={s.product} data-active={active === node.id} {...events(node)}>
          <span className={s.productHeader}><span aria-hidden="true">{icons[node.iconKey]}</span><span>{node.name}</span><span className={s.productLight} aria-hidden="true" /></span>
          <ProductPreview index={i} words={words} />
        </button>
      </div>)}
      <div className={s.deliverablesLabel}>{deliverablesHeader.replace(/[[\]]/g, '').trim()}</div>
    </div>
    <div className={s.sequence} aria-hidden="true">{words.phases.map((phase, i) => <span key={phase} className={s[`phase${i}`]}><i>{`0${i + 1}`}</i>{phase}</span>)}</div>
    <figcaption id={`${id}-detail`} className={s.detail}>{activeNode ? <><strong>{activeNode.name}</strong><span>{activeNode.desc}</span></> : <span>{words.hint}</span>}</figcaption>
  </figure>;
}

export const UnifiedDeliveryScene = memo(function UnifiedDeliveryScene({ language = 'en', ...props }) {
  const words = copy[language] || copy.en;
  return <div className={s.wrapper}><DeliveryCanvas {...props} words={words} /><DeliveryCanvas {...props} words={words} compact /></div>;
});
