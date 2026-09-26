'use client';

import React from 'react';
import AuroraField from '../AuroraField';
import s from './MockupStage.module.css';

/**
 * Stage for Industries product mockups: the Unified Delivery light field behind a NeuralBI product.
 * `frame` 'window' sets the product in a graphite app window; 'devices' leaves the composition bare (phones, tablets).
 * The stage stays mounted while the reader moves between mockup cards, so the light keeps its WebGL context;
 * only the product (keyed by `id`) re-enters. UI is sized in em from the stage's width and height, so it scales crisply
 * and always fits. With `live` false the mockup rests on its resolved state.
 */
export default function MockupStage({ id, frame = 'window', live, children }) {
  return <div className={s.stage} data-live={live} data-frame={frame} data-mockup="true">
    <AuroraField intensity={.95} />
    <div className={s.float}>
      <div key={id} className={frame === 'window' ? s.window : s.bare}>{children}</div>
    </div>
  </div>;
}
