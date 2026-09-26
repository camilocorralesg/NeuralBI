'use client';

import React, { useMemo, useRef } from 'react';
import useReveal from './useReveal';
import { WORD_STEP, tokenize } from './revealTiming';
import s from './CharacterReveal.module.css';

const ITALIC_STYLE = {
  fontFamily: 'var(--font-display)',
  fontStyle: 'italic',
  fontWeight: 300,
  color: 'var(--color-accent)',
  WebkitTextFillColor: 'var(--color-accent)',
  background: 'none',
  letterSpacing: '-0.03em',
};
const WORD_DURATION = 720;

/**
 * A headline that rises into place word by word the first time it is seen, each word out of its own mask: the word
 * lifts from its baseline while the window it rises through stays put (the clip travels with it), one
 * --stagger-words step after the word before (32 ms; 24 ms on small screens), on the site's ease-out. The hero's
 * line reveal, one step quieter. Pure CSS transitions keyed to `data-reveal` (useReveal): the server's HTML is the
 * finished line, a title already on screen at load stays put, and under reduced motion the words simply appear. The
 * full text is read once by assistive technology; the words are decorative.
 *
 * `delay` (seconds) places the line in its section's sequence; `stagger` (seconds) overrides the word step.
 */
const CharacterReveal = React.memo(function CharacterReveal({ text, className = '', style = {}, delay = 0, stagger }) {
  const ref = useRef(null);
  const isString = typeof text === 'string' && text.length > 0;
  const tokens = useMemo(() => (isString ? tokenize(text) : []), [text, isString]);
  const step = stagger ? Math.max(stagger * 1000, 8) : WORD_STEP;
  const settle = WORD_DURATION + delay * 1000 + step * tokens.length + 100;
  const state = useReveal(ref, { amount: 0.2, settle });

  if (!text) return null;
  if (!isString) return <span className={className} style={style}>{text}</span>;

  return (
    <span
      ref={ref}
      className={`${s.reveal} ${className}`}
      data-reveal={state}
      style={{
        display: style.display || 'inline-block',
        '--base': `${Math.round(delay * 1000)}ms`,
        ...(stagger ? { '--word-step': `${Math.round(step)}ms` } : {}),
        ...style,
      }}
    >
      <span className={s.srOnly}>{text.replace(/\*/g, '')}</span>
      <span aria-hidden="true">
        {tokens.map((token, index) => (
          <span
            key={`${token.word}-${index}`}
            className={s.word}
            style={{ '--n': index, marginRight: index < tokens.length - 1 ? '0.28em' : 0 }}
          >
            <span className={s.inner}>
              {token.italic
                ? <><em className="title-italic" style={ITALIC_STYLE}>{token.word}</em>{token.tail}</>
                : token.word}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
});

export default CharacterReveal;
