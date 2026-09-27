'use client';

import React, { memo, useId, useRef } from 'react';
import CharacterReveal from '../CharacterReveal';
import Counter from '../Counter';
import useReveal from '../useReveal';
import { useLanguage } from '../../context/LanguageContext';
import s from './CaseStudy.module.css';

// Manual reporting hours per week across the eight weeks of the scenario: 40 h down to 8 h (−80%).
const HOURS = [40, 37, 29, 20, 14, 11, 9, 8];
const BOX = { width: 320, height: 150, left: 12, right: 308, top: 14, plot: 112, axis: 132 };
const at = value => Number(value.toFixed(2));
const POINTS = HOURS.map((hours, week) => [
  at(BOX.left + (week * (BOX.right - BOX.left)) / (HOURS.length - 1)),
  at(BOX.top + (1 - hours / 42) * BOX.plot),
]);

// A smooth line through the weeks (Catmull-Rom as cubic Béziers), so the fall reads as a curve, not a staircase.
function smoothPath(points) {
  const d = [`M${points[0][0]} ${points[0][1]}`];
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [points[i - 1] || points[i], points[i], points[i + 1], points[i + 2] || points[i + 1]];
    const c1 = [at(p1[0] + (p2[0] - p0[0]) / 6), at(p1[1] + (p2[1] - p0[1]) / 6)];
    const c2 = [at(p2[0] - (p3[0] - p1[0]) / 6), at(p2[1] - (p3[1] - p1[1]) / 6)];
    d.push(`C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`);
  }
  return d.join('');
}
const LINE = smoothPath(POINTS);
const [START, END] = [POINTS[0], POINTS[POINTS.length - 1]];
const pct = (value, of) => `${at((value / of) * 100)}%`;

/**
 * A representative scenario (no named client): an editorial quote beside the instrument that proves it. Manual reporting
 * hours fall across eight weeks as a line drawn once, the first time the card is seen, while the −80% rolls into place
 * like the ROI's figures. Same state machine as the ROI (useReveal → data-count): the server's HTML is the finished
 * chart, a card already on screen stays put, reduced motion shows it resolved.
 */
function CaseStudy() {
  const { t } = useLanguage();
  const copy = t.caseStudy;
  const id = useId();
  const card = useRef(null);
  const reveal = useReveal(card, { amount: 0.35, settle: 2200 });

  return (
    <section className={s.section} aria-labelledby={`${id}-label`}>
      <div className={s.inner}>
        <figure className={s.story}>
          <p id={`${id}-label`} className={s.label}><span className={s.dot} aria-hidden="true" />{copy.label}<span className={s.context}>{copy.context}</span></p>
          <blockquote className={s.quote}><CharacterReveal text={copy.quote} stagger={0.022} /></blockquote>
          <figcaption className={s.role}>{copy.role}</figcaption>
        </figure>

        <div ref={card} className={s.card} data-count={reveal}>
          <p className={s.chartTitle}>{copy.chartTitle}</p>
          <p className={s.srOnly}>{copy.spoken}</p>
          <p className={s.figure} aria-hidden="true">
            {copy.sign}<Counter value={copy.value} rolling={Boolean(reveal)} /><span className={s.unit}>{copy.unit}</span>
          </p>
          <div className={s.chart} aria-hidden="true">
            <svg className={s.svg} viewBox={`0 0 ${BOX.width} ${BOX.height}`} focusable="false">
              <path className={s.axis} d={`M${BOX.left} ${BOX.axis}H${BOX.right}`} />
              {POINTS.map(([x], week) => <path key={week} className={s.tick} d={`M${x} ${BOX.axis}v5`} />)}
              <path className={s.ghost} d={`M${START[0]} ${START[1]}H${END[0]}`} />
              <path className={s.line} pathLength="1" d={LINE} />
              <circle className={s.start} cx={START[0]} cy={START[1]} r="3" />
              <circle className={s.end} cx={END[0]} cy={END[1]} r="4" />
            </svg>
            <span className={s.before} style={{ left: pct(START[0], BOX.width), top: pct(START[1], BOX.height) }}>{copy.before}</span>
            <span className={s.after} style={{ left: pct(END[0], BOX.width), top: pct(END[1], BOX.height) }}>{copy.after}</span>
          </div>
          <div className={s.weeks} aria-hidden="true"><span>{copy.start}</span><span>{copy.end}</span></div>
        </div>
      </div>
    </section>
  );
}

export default memo(CaseStudy);
