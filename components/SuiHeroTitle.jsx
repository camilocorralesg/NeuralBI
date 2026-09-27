'use client';

import React, { useRef, useCallback, memo } from 'react';

// Each line rises out of its own mask, 90 ms after the one above it. Both layers (the soft one and the spotlight one)
// carry the same lines, so they rise in lockstep. A space between the line blocks keeps the heading's text a sentence
// ("Intelligence That Executes") for search and assistive technology; it collapses on screen.
function Lines({ lines }) {
  return lines.map((line, i) => {
    const Tag = line.em ? 'em' : 'span';
    return (
      <React.Fragment key={i}>
        {i > 0 && ' '}
        <span className="sui-hero-line">
          <Tag className="sui-hero-line-inner" style={{ '--line': i }}>{line.text}</Tag>
        </span>
      </React.Fragment>
    );
  });
}

const SuiHeroTitle = memo(function SuiHeroTitle({ lines, font }) {
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const fontStyle = font ? { fontFamily: font } : {};
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="sui-hero-title-container"
      style={{ position: 'relative', display: 'block', width: '100%' }}
    >
      <h1 className="sui-hero-text blur-layer" style={fontStyle}>
        <Lines lines={lines} />
      </h1>
      <h1 className="sui-hero-text sharp-layer" style={fontStyle} aria-hidden="true">
        <Lines lines={lines} />
      </h1>
    </div>
  );
});

export default SuiHeroTitle;
