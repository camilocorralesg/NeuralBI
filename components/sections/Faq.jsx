'use client';

import React, { memo, useId, useMemo, useRef, useState } from 'react';
import CharacterReveal from '../CharacterReveal';
import useEdgeSpotlight from '../useEdgeSpotlight';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Faq.module.css';


// One question: a glass card whose edge follows a fine pointer; its answer opens on grid rows, so it is interruptible.
function FaqCard({ item, index, isOpen, onToggle, baseId }) {
  const card = useRef(null);
  useEdgeSpotlight(card);
  const triggerId = `${baseId}-question-${index}`;
  const panelId = `${baseId}-answer-${index}`;
  return (
    <div ref={card} className={styles.card} data-open={isOpen}>
      <h3 className={styles.question}>
        <button
          id={triggerId}
          className={styles.trigger}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(isOpen ? null : index)}
        >
          <span>{item.q}</span>
          <span className={styles.chevron} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" focusable="false">
              <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!isOpen} inert={!isOpen} className={styles.answer}>
        <div className={styles.answerClip}>
          <div className={styles.answerInner}><p>{item.a}</p></div>
        </div>
      </div>
    </div>
  );
}

/**
 * The FAQ: the title, then the questions as glass cards, all in place from the start (nothing arrives on scroll).
 * One answer open at a time; each opens on grid rows (interruptible, 280 ms), the chevron turns,
 * and the card's edge follows a fine pointer.
 */
function Faq() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(null);
  const baseId = useId();

  const title = t?.faq?.sectionTitle || 'Frequently asked questions';
  const items = useMemo(() => t?.faq?.items || [], [t]);

  return (
    <section className={styles.section} aria-labelledby={`${baseId}-heading`}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id={`${baseId}-heading`} className={styles.title}><CharacterReveal text={title} /></h2>
          {t?.faq?.sectionSubtitle && <p className={styles.subtitle}>{t.faq.sectionSubtitle}</p>}
        </header>
        <div className={styles.items}>
          {items.map((item, index) => (
            <FaqCard key={index} item={item} index={index} baseId={baseId} isOpen={activeIdx === index} onToggle={setActiveIdx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Faq);
