'use client';

import React from 'react';
import s from './SectionAtmosphere.module.css';

/**
 * Ambient backdrop for dark sections: a tinted obsidian band lit by a soft accent focus and a cooler
 * secondary glow. Both ends dissolve into the page black, so any two sections can sit back to back
 * without a visible seam. Render it as the first child of a `position: relative; isolation: isolate` section.
 *
 * - `accent` / `secondary`: any CSS colour (tokens welcome).
 * - `focus` / `secondaryFocus`: where each glow sits, as a CSS position ("50% 45%").
 * - `strength`: 0–1 multiplier for the whole field.
 *
 * The field is deliberately static: it costs one paint, then nothing while the page scrolls.
 */
export default function SectionAtmosphere({
  accent = 'var(--color-accent)',
  secondary = 'var(--color-telemetry, #38bdf8)',
  focus = '50% 45%',
  secondaryFocus = '82% 70%',
  strength = 1,
  className = '',
}) {
  return <div aria-hidden="true" className={`${s.atmosphere} ${className}`} style={{
    '--atmo-accent': accent,
    '--atmo-secondary': secondary,
    '--atmo-focus': focus,
    '--atmo-secondary-focus': secondaryFocus,
    '--atmo-strength': strength,
  }}>
    <span className={s.field} />
  </div>;
}
