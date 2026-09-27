import React from 'react';
import s from './Counter.module.css';

// The ones digit spins the most laps and the longest, so it locks in last; each digit to its left, one lap less.
const LAPS = 3;
const ROLL_BASE = 600;
const ROLL_PER_LAP = 250;

/**
 * A figure that rolls into place like an odometer: each digit is a wheel of 0–9 that spins a few laps fast and slows
 * onto its value. The motion is CSS, keyed to an ancestor's `data-count`: 'armed' parks the wheels on 0 and 'run' rolls
 * them home. The reels only exist while `rolling`: otherwise (the server's HTML, no JS, reduced motion, no CSS, reader
 * modes) the figure is just its digits. They are presentational: the caller provides the accessible text.
 */
export default function Counter({ value, rolling = false, delay = 0, className = '' }) {
  const digits = String(value).split('');
  return <span className={`${s.counter} ${className}`} aria-hidden="true" data-value={value} style={{ '--count-delay': `${delay}ms` }}>
    {digits.map((digit, index) => {
      const laps = Math.max(1, LAPS - (digits.length - 1 - index));
      const stop = laps * 10 + Number(digit);
      return <span key={index} className={s.digit} style={{ '--stop': stop, '--roll': `${ROLL_BASE + laps * ROLL_PER_LAP}ms` }}>
        <span className={s.face} data-face="">{digit}</span>
        {rolling && <span className={s.reel}>{Array.from({ length: stop + 1 }, (_, n) => <span key={n}>{n % 10}</span>)}</span>}
      </span>;
    })}
  </span>;
}
