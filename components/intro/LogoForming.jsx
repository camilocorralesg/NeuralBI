import { SYMBOL, WORDMARK, REGISTRATION } from './logoGeometry';
import { BRANCHES, NODES } from './choreography';
import s from './LogoForming.module.css';

// One loading screen at a time, so the ids can be fixed (this also renders on the server, before any JS).
const ID = 'neuralbi-loading';

/**
 * The NeuralBI logo forming, for every wait (app/loading.jsx): the intro's own geometry and order of events, in CSS
 * alone so it plays before hydration. The nodes land, the branches draw between them, the symbol slides left and the
 * wordmark rises beside it; the lockup holds, fades and forms again for as long as the wait lasts. Under reduced
 * motion the finished logo rests.
 */
export default function LogoForming({ label = 'Loading NeuralBI' }) {
  return (
    <div className={s.screen} role="status" aria-label={label}>
      <svg className={s.logo} viewBox="0 0 810.48 175" aria-hidden="true" focusable="false">
        <defs>
          <g id={`${ID}-symbol`}>{SYMBOL.map(({ d, fill }, i) => <path key={i} d={d} fill={fill} />)}</g>
          <mask id={`${ID}-edges`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="210" height="215" style={{ maskType: 'luminance' }}>
            {BRANCHES.map((d, i) => (
              <path key={d} className={s.edge} style={{ '--delay': `${i * 32}ms` }} d={d} fill="none" stroke="white" strokeWidth="34.1" pathLength="1" strokeDasharray="1" />
            ))}
            {NODES.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="16.19" fill="black" />)}
          </mask>
          {NODES.map(([cx, cy], i) => (
            <clipPath key={i} id={`${ID}-node-${i}`}><circle cx={cx} cy={cy} r="16.25" /></clipPath>
          ))}
          <clipPath id={`${ID}-wordmark`}><rect className={s.wordmarkMask} x="240" y="0" width="580" height="175" /></clipPath>
        </defs>
        <g className={s.lockup}>
          <g className={s.assembly}>
            <use href={`#${ID}-symbol`} mask={`url(#${ID}-edges)`} />
            {NODES.map((_, i) => (
              <g key={i} className={s.node} style={{ '--delay': `${(i % 4) * 28}ms` }}>
                <use href={`#${ID}-symbol`} clipPath={`url(#${ID}-node-${i})`} />
              </g>
            ))}
          </g>
          <g clipPath={`url(#${ID}-wordmark)`}>{WORDMARK.map(({ d, fill }, i) => <path key={i} d={d} fill={fill} />)}</g>
          <path className={s.registration} d={REGISTRATION.d} fill={REGISTRATION.fill} />
        </g>
      </svg>
    </div>
  );
}
