'use client';

import React, { memo, useId, useMemo, useRef, useState } from 'react';
import CharacterReveal from '../CharacterReveal';
import useReveal from '../useReveal';
import useEdgeSpotlight from '../useEdgeSpotlight';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Faq.module.css';

const FALLBACK_ITEMS = [
  {
    q: 'What is Microsoft Power Platform?',
    a: 'A suite of low-code tools (Power Apps, Automate, BI, Copilot Studio) that allows businesses to build apps, automate workflows, analyze data, and build agentic chatbots rapidly.',
  },
  {
    q: 'How does NeuralBI differ from traditional IT consultancies?',
    a: "Traditional firms deliver static reports and rigid code. NeuralBI operates on 'Applied Intelligence', orchestrating cognitive layers directly into your Microsoft environment for real-time automation and zero-friction deployments.",
  },
  {
    q: 'What is the average timeline for the Neural Protocol?',
    a: 'Our precise three-phase protocol (Audit, Build, Scale) ranges from 2 weeks for targeted automation pilots to 8 weeks for full enterprise cognitive data engines.',
  },
  {
    q: 'Is our enterprise data secure with NeuralBI solutions?',
    a: 'Absolutely. All workflows are built directly within your tenant boundary, utilizing Microsoft Azure enterprise-grade security protocols, end-to-end data encryption, and strict governance policies.',
  },
];

// One question: a glass card whose edge follows a fine pointer; its answer opens on grid rows, so it is interruptible.
function FaqCard({ item, index, isOpen, onToggle, baseId }) {
  const card = useRef(null);
  useEdgeSpotlight(card);
  const triggerId = `${baseId}-question-${index}`;
  const panelId = `${baseId}-answer-${index}`;
  return (
    <div ref={card} className={styles.card} data-open={isOpen} style={{ '--i': index }}>
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
 * The FAQ: a title that rises into place, then the questions as glass cards that arrive one after another the first
 * time the list is seen. One answer open at a time; each opens on grid rows (interruptible, 280 ms), the chevron turns,
 * and the card's edge follows a fine pointer.
 */
function Faq() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(null);
  const baseId = useId();
  const list = useRef(null);
  const reveal = useReveal(list, { amount: 0.15, settle: 1400 });

  const title = t?.faq?.sectionTitle || 'Frequently Asked *Questions.*';
  const items = useMemo(() => t?.faq?.items || FALLBACK_ITEMS, [t]);

  return (
    <section className={styles.section} aria-labelledby={`${baseId}-heading`}>
      <div className={styles.inner}>
        <h2 id={`${baseId}-heading`} className={styles.title}><CharacterReveal text={title} /></h2>
        <div ref={list} className={styles.items} data-reveal={reveal}>
          {items.map((item, index) => (
            <FaqCard key={index} item={item} index={index} baseId={baseId} isOpen={activeIdx === index} onToggle={setActiveIdx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Faq);
