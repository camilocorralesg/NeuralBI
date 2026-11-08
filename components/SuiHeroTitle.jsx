'use client';

import React, { memo } from 'react';

// Each line rises out of its own mask, 90 ms after the one above it. A space between the line blocks keeps the
// heading's text a sentence ("Intelligence That Executes") for search and assistive technology; it collapses on screen.
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

// The headline is drawn once and sharp at every width: no blurred base layer, no pointer spotlight.
const SuiHeroTitle = memo(function SuiHeroTitle({ lines, font }) {
  const fontStyle = font ? { fontFamily: font } : {};
  return (
    <div className="sui-hero-title-container">
      <h1 className="sui-hero-text" style={fontStyle}>
        <Lines lines={lines} />
      </h1>
    </div>
  );
});

export default SuiHeroTitle;
