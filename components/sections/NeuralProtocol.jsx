'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import { AuditBlueprintScene } from '../graphics/AuditBlueprintScene';
import { ArchitectBuildScene } from '../graphics/ArchitectBuildScene';
import { DeployScaleScene } from '../graphics/DeployScaleScene';
import SectionAtmosphere from '../SectionAtmosphere';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';
import s from './NeuralProtocol.module.css';
import useReducedMotionSafe from '../useReducedMotionSafe';
import { scrollToTarget } from '../../lib/smoothScroll';
import CharacterReveal from '../CharacterReveal';
import Reveal from '../Reveal';

const SCENES = [AuditBlueprintScene, ArchitectBuildScene, DeployScaleScene];
// The signal follows a fixed reading line: a phase lights the moment its node crosses it.
const READING_LINE = 0.58;

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const evenThresholds = (count) => Array.from({ length: count }, (_, index) => (count > 1 ? index / (count - 1) : 0));
const countLit = (progress, thresholds) => (progress <= 0 ? 0 : thresholds.filter((threshold) => threshold <= progress + 0.01).length);

export default function NeuralProtocol() {
  const { t } = useLanguage();
  const copy = t?.methodology || translations.en.methodology;
  const phases = copy.phases;
  const reducedMotion = useReducedMotionSafe();
  const sectionRef = useRef(null);
  const runRef = useRef(null);
  const nodeRefs = useRef([]);
  const measureRef = useRef(null);
  const [geometry, setGeometry] = useState(() => ({ measured: false, start: 0, length: 0, thresholds: evenThresholds(phases.length) }));
  const [lit, setLit] = useState(0);
  const fill = useMotionValue(0);
  const active = useInView(sectionRef, { margin: '200px 0px' });

  // Any scroll while the run is on screen re-evaluates the fill against the reading line.
  const { scrollYProgress } = useScroll({ target: runRef, offset: ['start end', 'end start'] });
  const update = (scrolled) => {
    let next = clamp01(scrolled);
    if (geometry.length > 0 && runRef.current) {
      const start = runRef.current.getBoundingClientRect().top + geometry.start;
      next = clamp01((window.innerHeight * READING_LINE - start) / geometry.length);
    }
    fill.set(next);
    const count = countLit(next, geometry.thresholds);
    setLit((current) => (current === count ? current : count));
  };
  const updateRef = useRef(update);
  updateRef.current = update;
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    // Late fonts or images can shift the nodes after mount; the first scroll through re-measures if needed.
    if (!geometry.measured) measureRef.current?.();
    update(value);
  });

  // The track runs from the first node to the last, so the signal meets every node exactly.
  useEffect(() => {
    const run = runRef.current;
    if (!run || typeof ResizeObserver === 'undefined') return undefined;
    const measure = () => {
      const box = run.getBoundingClientRect();
      const centers = nodeRefs.current.filter(Boolean).map((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top };
      });
      if (centers.length < 2) return;
      const first = centers[0];
      const length = centers[centers.length - 1].y - first.y;
      if (length <= 0) return;
      run.style.setProperty('--run-start', `${first.y}px`);
      run.style.setProperty('--run-length', `${length}px`);
      run.style.setProperty('--run-x', `${first.x}px`);
      setGeometry({ measured: true, start: first.y, length, thresholds: centers.map((center) => (center.y - first.y) / length) });
    };
    measureRef.current = measure;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(run);
    return () => observer.disconnect();
  }, [phases.length]);

  useEffect(() => { updateRef.current(scrollYProgress.get()); }, [geometry, scrollYProgress]);

  const litCount = reducedMotion ? phases.length : lit;
  const current = litCount - 1;

  // Land a phase's node just past the reading line, so it arrives lit.
  const goTo = (index) => {
    const node = nodeRefs.current[index];
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY - window.innerHeight * READING_LINE + 8;
    scrollToTarget(top, { immediate: reducedMotion });
  };

  return <section ref={sectionRef} className={s.section} data-active={active} aria-labelledby="protocol-heading">
    <SectionAtmosphere focus="28% 34%" secondaryFocus="84% 80%" />
    <motion.div className={s.layout} style={{ '--progress': reducedMotion ? 1 : fill }}>
      <header className={s.intro}>
        <h2 id="protocol-heading"><CharacterReveal text={copy.sectionTitle} /></h2>
        <Reveal as="p" className={s.lede} delay={200}>{copy.sectionSubtitle}</Reveal>
        <nav className={s.index} aria-label={copy.indexLabel || translations.en.methodology.indexLabel}>
          <ol>
            {phases.map((phase, index) => <li key={phase.num}>
              <button type="button" className={s.indexItem} data-lit={index < litCount} aria-current={index === current ? 'step' : undefined}
                onClick={() => goTo(index)}>
                <span className={s.indexNum} aria-hidden="true">{phase.num}</span>
                <span className={s.indexTitle}>{phase.title}</span>
              </button>
            </li>)}
          </ol>
        </nav>
      </header>

      <div ref={runRef} className={s.run} data-measured={geometry.measured}>
        <div className={s.track} aria-hidden="true">
          <span className={s.trackRun}><span className={s.trackPulse} /></span>
        </div>
        <ol className={s.phases}>
          {phases.map((phase, index) => {
            const Scene = SCENES[index];
            return <li key={phase.num} className={s.phase} data-lit={index < litCount}>
              {/* Copy leads, scene follows: a phase lights as its heading reaches the reading line, so its scene arrives lit. */}
              <div className={s.copy}>
                <span ref={(node) => { nodeRefs.current[index] = node; }} className={s.node} aria-hidden="true" />
                <p className={s.phaseLabel}>{copy.phasePrefix} <span>{phase.num}</span></p>
                <h3>{phase.title}</h3>
                <p className={s.phaseBody}>{phase.desc}</p>
              </div>
              <div className={s.stage}>
                {Scene && <Scene label={phase.sceneLabel} description={phase.sceneDescription} />}
              </div>
            </li>;
          })}
        </ol>
      </div>
    </motion.div>
  </section>;
}
