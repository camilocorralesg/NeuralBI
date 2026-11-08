'use client';

import React from 'react';

/**
 * A block below a headline (supporting copy, a panel, a form, a scene), rendered in its finished place. Since
 * 2026-11-06 nothing on the page fades, rises or wipes in as it scrolls into view: only motion that carries
 * information remains (the hero's lines, the ROI roll and proofs, the Protocol's reading line, the delivery clock, the
 * Arsenal's transitions, the NeuralMark). The component keeps its old props (`variant`, `delay`, `amount`) so callers
 * did not change; they no longer do anything.
 */
export default function Reveal(props) {
  const { ref, as: Tag = 'div', className, style, children, ...rest } = props;
  delete rest.variant;
  delete rest.delay;
  delete rest.amount;
  return (
    <Tag ref={ref} className={className || undefined} style={style} {...rest}>
      {children}
    </Tag>
  );
}
