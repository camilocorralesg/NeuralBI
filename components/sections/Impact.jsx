'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import AuroraField from '../AuroraField';
import CharacterReveal from '../CharacterReveal';
import Counter from '../Counter';
import EdgeBeam from '../EdgeBeam';
import useEdgeSpotlight from '../useEdgeSpotlight';
import { useLanguage } from '../../context/LanguageContext';
import s from './Impact.module.css';
import Reveal from '../Reveal';
import { wordsIn } from '../revealTiming';

// Rows that arrive together roll this far apart, so the ledger reads top to bottom.
const STAGGER = 140;
// A row rolls once this much of it is on screen.
const ROLL_AT = .6;
// The 7× proof: in the span of one traditional delivery cycle, NeuralBI ships seven.
const CYCLES = 7;
// The 25M+ proof: a day on a 24-hour dial.
const HOURS = 24;

const reducedMotion = () => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
const at = value => Number(value.toFixed(2));

/*
 * The proofs: minimal line instruments in fixed-ratio boxes, drawn once (every drawn stroke has pathLength 1). Their
 * labels are HTML beside or over them, so they stay legible and translated at every width.
 */

// 7×, in 360×76: one traditional cycle arches over the timeline while seven NeuralBI releases hop under it, each
// landing on a release dot.
function ReleaseArcs() {
  const [start, end, base] = [2, 358, 38];
  const step = (end - start) / CYCLES;
  return <svg className={s.instrument} viewBox="0 0 360 76" aria-hidden="true" focusable="false">
    <path className={s.axis} d={`M${start} ${base}H${end}`} />
    <path className={`${s.draw} ${s.traditional}`} pathLength="1" data-arc="traditional" d={`M${start} ${base}C${start + 20} -10 ${end - 20} -10 ${end} ${base}`} />
    <circle className={`${s.dot} ${s.traditionalEnd}`} cx={end} cy={base} r="2.5" />
    {Array.from({ length: CYCLES }, (_, i) => {
      const from = at(start + i * step);
      const to = at(start + (i + 1) * step);
      return <g key={i} style={{ '--i': i }}>
        <path className={`${s.draw} ${s.release}`} pathLength="1" data-cycle={i + 1} d={`M${from} ${base}C${from} 62 ${to} 62 ${to} ${base}`} />
        <circle className={`${s.dot} ${s.releaseEnd}`} cx={to} cy={base} r="2.5" />
      </g>;
    })}
  </svg>;
}

// −65%, in 360×80: cost on a vertical scale (24 = before, 78 = nothing). It runs level, falls to what is kept and runs
// on; a faint line carries the old level over the new stretch, and a measure at the end spans the saving.
function CostCurve({ kept, saved }) {
  const [top, zero] = [24, 78];
  const after = at(zero - kept * (zero - top));
  return <span className={s.proof} aria-hidden="true" data-dimension="">
    <svg className={s.instrument} viewBox="0 0 360 80" aria-hidden="true" focusable="false" data-kept={kept}>
      <path className={s.axis} d={`M2 ${zero}H358`} />
      <path className={s.ghost} d={`M128 ${top}H322`} />
      <path className={`${s.draw} ${s.before}`} pathLength="1" d={`M2 ${top}H128`} />
      <path className={`${s.draw} ${s.drop}`} pathLength="1" d={`M128 ${top}C170 ${top} 186 ${after} 228 ${after}H322`} />
      <path className={`${s.draw} ${s.measure}`} pathLength="1" d={`M340 ${top}V${after}`} />
      <path className={s.ends} d={`M334 ${top}H346M334 ${after}H346`} />
    </svg>
    <span className={s.saved} style={{ top: `${at(((top + after) / 2 / 80) * 100)}%` }}>{saved}</span>
  </span>;
}

// 25M+, in 80×80: a 24-hour dial, taller marks every six hours, the day drawn round clockwise from 00 h at the top.
function DayDial({ label }) {
  return <span className={s.dial}>
    <svg className={s.instrument} viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      <circle className={s.axis} cx="40" cy="40" r="30" />
      {Array.from({ length: HOURS }, (_, hour) => {
        const major = hour % 6 === 0;
        const angle = (hour / HOURS) * 2 * Math.PI;
        const [inner, outer] = major ? [33, 38.5] : [34.5, 37.5];
        return <line key={hour} className={s.tick} data-hour={hour} data-major={major || undefined}
          x1={at(40 + inner * Math.sin(angle))} y1={at(40 - inner * Math.cos(angle))}
          x2={at(40 + outer * Math.sin(angle))} y2={at(40 - outer * Math.cos(angle))} />;
      })}
      <circle className={`${s.draw} ${s.day}`} pathLength="1" cx="40" cy="40" r="30" transform="rotate(-90 40 40)" />
    </svg>
    <span className={s.dialLabel}>{label}</span>
  </span>;
}

/**
 * The ROI instrument ("The Math Speaks For Itself."): three figures of equal weight, each set beside the line instrument
 * that makes it true (seven releases in the time of one cycle, a cost that falls to 35%, a full day of throughput), in a
 * glass panel over the Aurora. The light flows around the panel and dims beneath it; one beam travels the panel's edge.
 *
 * The server's HTML is the resolved instrument. A row that is off screen when the page hydrates is armed (wheels on 0,
 * proofs at their start) and rolls home the first time it is seen; a row already on screen, or any row under reduced
 * motion, simply stays resolved.
 */
function Impact() {
  const { t } = useLanguage();
  const copy = t.impact;
  const { speed, cost, rows } = copy.metrics;
  // The arrow travels with the CTA's last word, so a wrap never leaves it alone on a line.
  const ctaSplit = copy.cta.lastIndexOf(' ') + 1;
  const ctaHead = copy.cta.slice(0, ctaSplit);
  const ctaTail = copy.cta.slice(ctaSplit);
  const panel = useRef(null);
  const rowRefs = useRef([]);
  const [counts, setCounts] = useState({});
  useEdgeSpotlight(panel);

  // Arm the rows that start off screen, then roll each one the first time enough of it is seen.
  useEffect(() => {
    const items = rowRefs.current.filter(Boolean);
    if (!items.length || typeof IntersectionObserver === 'undefined' || reducedMotion()) return undefined;
    const settled = new Set();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      const index = items.indexOf(entry.target);
      if (!settled.has(index)) {
        settled.add(index);
        if (entry.intersectionRatio > 0) observer.unobserve(entry.target);
        else setCounts(current => ({ ...current, [index]: 'armed' }));
        return;
      }
      if (entry.intersectionRatio < ROLL_AT) return;
      setCounts(current => ({ ...current, [index]: 'run' }));
      observer.unobserve(entry.target);
    }), { threshold: [0, ROLL_AT] });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const row = (index, style) => ({
    ref: el => { rowRefs.current[index] = el; },
    className: s.row,
    'data-count': counts[index],
    style: { '--delay': `${index * STAGGER}ms`, ...style },
  });

  return <section className={s.section} aria-labelledby="impact-heading">
    <AuroraField clearRef={panel} className={s.aurora} />
    <div className={s.inner}>
      <div ref={panel} className={s.panel}>
        <EdgeBeam />

        <div className={s.intro}>
          <h2 id="impact-heading" className={s.title}>
            <CharacterReveal text={copy.titleLine1} />
            {' '}
            <CharacterReveal text={copy.titleLine2} delay={wordsIn(copy.titleLine1)} />
          </h2>
          <Reveal as="p" className={s.subtitle} delay={280}>{copy.subtitle}</Reveal>
          <Reveal as="a" href="#contact" className={s.cta} delay={360}>
            {ctaHead}<span className={s.ctaTail}>{ctaTail}<ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" /></span>
          </Reveal>
        </div>

        {/* The spaces between a row's parts are for reading without CSS (reader modes, text extraction); the grid ignores them. */}
        <ul className={s.metrics}>
          <li {...row(0, { '--parts': 3 })}>
            <span className={s.srOnly}>{speed.spoken}</span>{' '}
            <span className={s.figure} aria-hidden="true"><Counter value={speed.value} rolling={Boolean(counts[0])} /><span className={s.unit}>{speed.unit}</span></span>{' '}
            <span className={s.label} aria-hidden="true">{speed.label}</span>{' '}
            <span className={s.proof} aria-hidden="true"><ReleaseArcs /></span>{' '}
            <span className={s.legend} aria-hidden="true">
              <span className={s.key}>{speed.bars[0]}</span>{' '}
              <span className={s.key} data-tone="volt">{speed.bars[1]}</span>{' '}
              <span className={s.caption}>{speed.caption}</span>
            </span>
          </li>

          <li {...row(1, { '--parts': 3 })}>
            <span className={s.srOnly}>{cost.spoken}</span>{' '}
            <span className={s.figure} aria-hidden="true">
              {cost.sign}<Counter value={cost.value} rolling={Boolean(counts[1])} delay={STAGGER} /><span className={s.unit}>{cost.unit}</span>
            </span>{' '}
            <span className={s.label} aria-hidden="true">{cost.label}</span>{' '}
            <CostCurve kept={(100 - cost.value) / 100} saved={cost.saved} />{' '}
            <span className={s.legend} aria-hidden="true">
              <span className={s.key}>{cost.before}</span>{' '}
              <span className={s.key} data-tone="volt">{cost.after}</span>
            </span>
          </li>

          <li {...row(2, { '--parts': 2 })}>
            <span className={s.srOnly}>{rows.spoken}</span>{' '}
            <span className={s.figure} aria-hidden="true"><Counter value={rows.value} rolling={Boolean(counts[2])} delay={STAGGER * 2} /><span className={s.unit}>{rows.unit}</span></span>{' '}
            <span className={s.label} aria-hidden="true">{rows.label}</span>{' '}
            <span className={`${s.proof} ${s.dayProof}`} aria-hidden="true">
              <DayDial label={rows.hours} />{' '}
              <span className={s.rate}>{rows.rate}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>;
}

export default memo(Impact);
