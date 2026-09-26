'use client';

import React, { memo, useRef, useState } from 'react';
import { AiNativeScene, WarpSpeedScene, ZeroFrictionScene } from '../graphics/ManifestoScenes';
import { useLanguage } from '../../context/LanguageContext';
import useEdgeSpotlight from '../useEdgeSpotlight';
import useReveal from '../useReveal';
import premium from './ManifestoPremium.module.css';
import CharacterReveal from '../CharacterReveal';
import Reveal from '../Reveal';

const cardVisuals = {
  'ai-native': {
    Graphic: AiNativeScene,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  'warp-speed': {
    Graphic: WarpSpeedScene,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  'zero-friction': {
    Graphic: ZeroFrictionScene,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    ),
  },
};

function Manifesto() {
  const { t } = useLanguage();
  const copy = t.manifesto;

  return (
    <section className={premium.section}>
      <div className={premium.container}>
        <header className={premium.sectionHeader}>
          <h2 className={premium.sectionTitle}><CharacterReveal text={copy.sectionTitle} /></h2>
          <Reveal as="p" className={premium.sectionSubtitle} delay={220}>{copy.sectionSubtitle}</Reveal>
        </header>

        <div className={premium.grid}>
          {copy.cards.map((item, index) => {
            const visual = cardVisuals[item.id];
            return visual ? <ManifestoCard key={item.id} item={item} visual={visual} index={index} /> : null;
          })}
        </div>
      </div>
    </section>
  );
}

function formatCardBody(text) {
  if (!text) return null;
  const parts = text.split(/\*([^*]+)\*/);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className={premium.strongText}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

// Each card arrives once, one block step after its neighbour: the frame, then its title, its body and its scene.
// Its edge then lights where a fine pointer is.
function ManifestoCard({ item, visual, index }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const card = useRef(null);
  useEdgeSpotlight(card);
  const reveal = useReveal(card, { amount: 0.25, settle: 1500 });
  const { Graphic, icon } = visual;
  const headingId = `manifesto-${item.id}-title`;

  return (
    <article
      ref={card}
      className={`${premium.card} ${premium[item.id.replaceAll('-', '')]}`}
      data-reveal={reveal}
      style={{ '--i': index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={premium.cardContent}
        role="group"
        aria-labelledby={headingId}
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div className={premium.graphicStage}>
          <Graphic hovered={hovered || focused} />
        </div>
        <div className={premium.editorial}>
          <div className={premium.headlineSlot}>
            <span className={premium.cardIcon} aria-hidden="true">{icon}</span>
            <h3 id={headingId} className={premium.cardTitle}>{item.title}</h3>
          </div>
          <p className={premium.cardBody}>{formatCardBody(item.body)}</p>
        </div>
      </div>
    </article>
  );
}

export default memo(Manifesto);
