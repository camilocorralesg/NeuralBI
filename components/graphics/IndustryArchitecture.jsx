'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import { BarChart3, Cpu, Workflow, Layers3 } from 'lucide-react';
import s from './IndustryArchitecture.module.css';

const symbols = [BarChart3, Layers3, Workflow, Cpu];
const vocabulary = {
  en: {
    layers: ['Intelligence', 'Operations', 'Automation', 'AI agents'],
    'supply-chain': ['Suppliers', 'Warehouses', 'Distribution', 'Delivery'],
    fintech: ['Transactions', 'Treasury', 'Compliance', 'Risk'],
    manufacturing: ['Sensors', 'Production', 'Maintenance', 'Quality'],
    retail: ['Commerce', 'Inventory', 'Fulfillment', 'Customers'],
    core: 'Unified data',
  },
  es: {
    layers: ['Inteligencia', 'Operaciones', 'Automatización', 'Agentes IA'],
    'supply-chain': ['Proveedores', 'Almacenes', 'Distribución', 'Entregas'],
    fintech: ['Transacciones', 'Tesorería', 'Cumplimiento', 'Riesgo'],
    manufacturing: ['Sensores', 'Producción', 'Mantenimiento', 'Calidad'],
    retail: ['Comercio', 'Inventario', 'Despachos', 'Clientes'],
    core: 'Datos unificados',
  },
};

// Topologies represent the sector's operating model, not measured customer data.
const routes = {
  'supply-chain': 'M80 80H200V200H320V320 M80 320H200V200H320V80',
  fintech: 'M80 80H320V320H80Z M80 80L320 320 M320 80L80 320',
  manufacturing: 'M80 80H320V320H80Z M80 200H320 M200 80V320',
  retail: 'M80 80L200 200L320 80 M80 320L200 200L320 320',
};
const positions = [[20, 20], [80, 20], [80, 80], [20, 80]];

function IndustryArchitecture({ industry, solution, language, paused }) {
  const root = useRef(null);
  const [running, setRunning] = useState(false);
  const words = vocabulary[language] || vocabulary.en;

  useEffect(() => {
    let inView = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setRunning(inView && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(root.current);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  return <div ref={root} className={s.scene} data-running={running && !paused} data-sector={industry}
    data-solution={solution} aria-hidden="true">
    <div className={s.halo} />
    <div className={s.sculpture}>
      <div className={s.foundation}><span /><span /><span /><span /></div>
      <div className={s.substrate} />
      <div className={s.circuit}>
        <svg className={s.traces} viewBox="0 0 400 400" fill="none">
          <path d={routes[industry]} className={s.route} />
          <path d={routes[industry]} className={s.signal} />
          {[80, 200, 320].map(x => [80, 200, 320].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" className={s.junction} />))}
        </svg>
        {positions.map(([x, y], i) => {
          const Icon = symbols[i];
          return <div key={i} className={s.node} data-active={solution === i}
            style={{ '--node-x': `${x}%`, '--node-y': `${y}%`, '--node-order': i }}>
            <div className={s.nodeBase} />
            <div className={s.nodeTop}><Icon strokeWidth={1.25} /><span className={s.nodeLines} /></div>
          </div>;
        })}
        <div className={s.core}>
          <div className={s.coreBase} />
          <div className={s.coreMiddle} />
          <div className={s.coreTop}><span className={s.coreGlyph}>N<span>↗</span></span></div>
        </div>
      </div>
    </div>
    <div className={s.coreLabel}><span />{words.core}</div>
    <div className={s.legend}>
      {words[industry].map((label, i) => <div key={label} className={s.legendItem} data-active={solution === i}>
        <span className={s.legendDot} /><span>{label}<small>{words.layers[i]}</small></span>
      </div>)}
    </div>
  </div>;
}

export default memo(IndustryArchitecture);
