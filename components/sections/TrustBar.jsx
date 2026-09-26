'use client';

import React, { memo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import s from './TrustBar.module.css';

const DEFAULT_ITEMS = [
  'MICROSOFT FABRIC DIRECT LAKE',
  'POWER BI SEMANTIC MODELING',
  'POWER APPS PRO-CODE (PCF & REACT)',
  'COPILOT STUDIO AGENTIC WORKFLOWS',
  'AZURE TENANT BOUNDARY SECURITY',
  'ENTERPRISE DATAVERSE ARCHITECTURES',
];

/**
 * The capabilities band under the hero: one slow marquee of what NeuralBI builds on, fading in and out at both edges.
 * It pauses under a fine pointer (so a name can be read) and stands still under reduced motion. The list is read once
 * by assistive technology; the second copy that closes the loop is decorative.
 */
function TrustBar() {
  const { t } = useLanguage();
  const items = t.trustBar?.items || DEFAULT_ITEMS;
  const row = hidden => (
    <ul className={s.row} aria-hidden={hidden || undefined}>
      {items.map(item => <li key={item} className={s.item}>{item}</li>)}
    </ul>
  );

  return (
    <div className={s.band}>
      <div className={s.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export default memo(TrustBar);
