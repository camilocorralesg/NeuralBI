'use client';

import React, { useRef, useCallback, memo } from 'react';

const SuiHeroTitle = memo(function SuiHeroTitle({ text, font }) {
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="sui-hero-title-container animate-blur-reveal delay-100"
      style={{ position: 'relative', display: 'block', width: '100%' }}
    >
      <h1 className="sui-hero-text blur-layer" style={font ? { fontFamily: font } : {}}>
        {text}
      </h1>
      <h1 className="sui-hero-text sharp-layer" style={font ? { fontFamily: font } : {}} aria-hidden="true">
        {text}
      </h1>
    </div>
  );
});

export default SuiHeroTitle;
