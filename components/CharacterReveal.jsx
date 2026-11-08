'use client';

import React, { useMemo } from 'react';
import { tokenize } from './revealTiming';
import s from './CharacterReveal.module.css';

const ITALIC_STYLE = {
  // Inline, as an <em> is by default: said explicitly so every accessible-name engine reads "Blueprint." as one word.
  display: 'inline',
  fontFamily: 'var(--font-display)',
  fontStyle: 'italic',
  fontWeight: 300,
  color: 'var(--color-accent)',
  WebkitTextFillColor: 'var(--color-accent)',
  background: 'none',
  letterSpacing: '-0.03em',
};

/**
 * A section headline with the Volt italic: `*phrase*` renders as `<em class="title-italic">`, and punctuation right
 * after it stays upright (`*Blueprint*.`). Since 2026-11-06 section titles no longer rise word by word as they scroll
 * into view (only the hero's headline enters); the text is plain, read once, and wraps like any heading. `delay` and
 * `stagger` are kept so callers did not change; they no longer do anything.
 */
const CharacterReveal = React.memo(function CharacterReveal({ text, className = '', style = {} }) {
  const isString = typeof text === 'string' && text.length > 0;
  const tokens = useMemo(() => (isString ? tokenize(text) : []), [text, isString]);

  if (!text) return null;
  if (!isString) return <span className={className} style={style}>{text}</span>;

  return (
    <span className={`${s.title} ${className}`.trim()} style={{ display: style.display || 'inline-block', ...style }}>
      {tokens.map((token, index) => (
        <React.Fragment key={`${token.word}-${index}`}>
          {index > 0 && ' '}
          {token.italic
            ? <><em className="title-italic" style={ITALIC_STYLE}>{token.word}</em>{token.tail}</>
            : token.word}
        </React.Fragment>
      ))}
    </span>
  );
});

export default CharacterReveal;
