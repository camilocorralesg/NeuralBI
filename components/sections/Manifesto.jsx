'use client';

import React, { memo, useRef, useState } from 'react';
import { AiNativeScene, WarpSpeedScene, ZeroFrictionScene } from '../graphics/ManifestoScenes';
import AuroraField from '../AuroraField';
import useEdgeSpotlight from '../useEdgeSpotlight';
import { useLanguage } from '../../context/LanguageContext';
import s from './ManifestoPremium.module.css';
import CharacterReveal from '../CharacterReveal';

const SCENES = {
  'ai-native': AiNativeScene,
  'warp-speed': WarpSpeedScene,
  'zero-friction': ZeroFrictionScene,
};

/**
 * The Manifesto: three promises in one field of light. No cards: a single AuroraField (the light under the Industries
 * mockups) runs behind the whole composition, framed like a stage, and each promise is its isometric scene with a
 * title and one line under it. The copy row is the field's clearing, so the light flows round the words. Like the
 * site's other panels, the field's edge lights where a fine pointer is.
 */
function Manifesto() {
  const { t } = useLanguage();
  const copy = t.manifesto;
  const clearing = useRef(null);
  const field = useRef(null);
  useEdgeSpotlight(field);

  return (
    <section className={s.section} aria-labelledby="manifesto-title">
      <div className={s.container}>
        <header className={s.header}>
          <h2 id="manifesto-title" className={s.title}><CharacterReveal text={copy.sectionTitle} /></h2>
          <p className={s.subtitle}>{copy.sectionSubtitle}</p>
        </header>

        <div ref={field} className={s.field}>
          <AuroraField intensity={0.95} clearRef={clearing} />
          {/* Measured, never seen: the box the light thins out in (the copy row on desktop). */}
          <span ref={clearing} className={s.clearing} aria-hidden="true" />
          {copy.cards.map((item) => {
            const Scene = SCENES[item.id];
            return Scene ? <ManifestoPromise key={item.id} item={item} Scene={Scene} /> : null;
          })}
        </div>
      </div>
    </section>
  );
}

// A promise: its scene, its title, one line. A mouse or a pen over it raises the scene and lights it, without
// interrupting its story; a finger never does, since a tap would leave the hover stuck.
function ManifestoPromise({ item, Scene }) {
  const [hovered, setHovered] = useState(false);
  const headingId = `manifesto-${item.id}-title`;
  const enter = (event) => { if (event.pointerType !== 'touch') setHovered(true); };

  return (
    <article className={s.promise} aria-labelledby={headingId} onPointerEnter={enter} onPointerLeave={() => setHovered(false)}>
      <div className={s.stage}><Scene hovered={hovered} /></div>
      <div className={s.copy}>
        <h3 id={headingId} className={s.promiseTitle}>{item.title}</h3>
        <p className={s.promiseLine}>{item.body}</p>
      </div>
    </article>
  );
}

export default memo(Manifesto);
