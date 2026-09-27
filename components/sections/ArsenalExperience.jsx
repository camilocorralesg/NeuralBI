'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, cubicBezier, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';
import CharacterReveal from '../CharacterReveal';
import ShaderButton from '../ShaderButton';
import { PbiDataStorytellingUiAnim, PbiAiInsightsOverlayAnim, PbiSemanticModelGraphAnim } from '../graphics/PowerBiAnimations';
import { PbaThreeParadigmsAnim, PbaProCodeApiEngineAnim, PbaEnterpriseDataverseMeshAnim } from '../graphics/PowerAppsAnimations';
import { PauSelfHealingFlowAnim, PauEventDrivenMeshAnim, PauResilientDlqMeshAnim } from '../graphics/PowerAutomateAnimations';
import { McsGroundedReasoningAnim, McsMultiStepChainAnim, McsZeroHallucinationFieldAnim } from '../graphics/CopilotStudioAnimations';
import s from './ArsenalExperience.module.css';
import useReducedMotionSafe from '../useReducedMotionSafe';
import useTapAnchor from '../useTapAnchor';
import Reveal from '../Reveal';
import { lockScroll, scrollToTarget, unlockScroll } from '../../lib/smoothScroll';

const TOOL_CONFIG = [
  {
    id: 'power-bi', key: 'powerBi', color: '#f2c811',
    logo: '/NeuralBI/assets/New_Power_BI_Logo.svg',
    scenes: [PbiDataStorytellingUiAnim, PbiAiInsightsOverlayAnim, PbiSemanticModelGraphAnim],
    sceneNames: { en: ['Executive adoption', 'AI narrative', 'Semantic architecture'], es: ['Adopción ejecutiva', 'Narrativa con IA', 'Arquitectura semántica'] },
  },
  {
    id: 'power-apps', key: 'powerApps', color: '#e7a2cd',
    logo: '/NeuralBI/PowerPlatform Icons/PowerApps_scalable.svg',
    scenes: [PbaThreeParadigmsAnim, PbaProCodeApiEngineAnim, PbaEnterpriseDataverseMeshAnim],
    sceneNames: { en: ['Three paradigms', 'Pro-code engine', 'Dataverse mesh'], es: ['Tres paradigmas', 'Motor pro-code', 'Malla Dataverse'] },
  },
  {
    id: 'power-automate', key: 'powerAutomate', color: '#9bc5ec',
    logo: '/NeuralBI/PowerPlatform Icons/PowerAutomate_scalable.svg',
    scenes: [PauSelfHealingFlowAnim, PauEventDrivenMeshAnim, PauResilientDlqMeshAnim],
    sceneNames: { en: ['Self-healing flow', 'Event-driven mesh', 'Resilient delivery'], es: ['Flujo autocorrectivo', 'Malla de eventos', 'Entrega resiliente'] },
  },
  {
    id: 'copilot-studio', key: 'copilotStudio', color: '#a2d8c1',
    logo: '/NeuralBI/PowerPlatform Icons/CopilotStudio_scalable.svg',
    scenes: [McsGroundedReasoningAnim, McsMultiStepChainAnim, McsZeroHallucinationFieldAnim],
    sceneNames: { en: ['Grounded reasoning', 'Multi-step action', 'Verified response'], es: ['Razonamiento fundamentado', 'Acción multipaso', 'Respuesta verificada'] },
  },
];

const EN_PILLS = {
  'power-bi': [
    { label: 'Interactive Executive Dashboards' },
    { label: 'Fabric Direct Lake Semantic Model' },
    { label: 'Automated AI Reasoning & UX Storytelling' },
    { label: 'Role-Based Persona Security Architecture' },
  ],
  'power-apps': [
    { label: 'Custom React & PCF Code Components' },
    { label: 'Canvas & Model-Driven Workflows' },
    { label: 'Dataverse & Enterprise API Integration' },
    { label: 'Tailored Canvas App Interfaces' },
  ],
  'power-automate': [
    { label: 'Autonomous Event-Driven Cloud & Desktop RPA Flows' },
    { label: 'Enterprise API Connectors & Neural Pipelines' },
    { label: 'AI Builder Intelligent Document & Unstructured Mining' },
    { label: 'Zero-Trust Resilient Error Throttling & Observability' },
  ],
  'copilot-studio': [
    { label: 'Autonomous Multi-Agent Copilot Orchestration' },
    { label: 'Generative Action Plugins & Pro-Code APIs' },
    { label: 'Dataverse Vector RAG & Enterprise Knowledge Retrieval' },
    { label: 'Zero-Trust Agent Observability & SLA Compliance' },
  ],
};

const UI = {
  en: {
    select: 'Select a system to explore its architecture',
    vision: 'The proposition', capabilities: 'Capabilities', differentiators: 'The difference',
    details: 'Explore full architecture',
    close: 'Close architecture', collapse: 'Close', included: 'Technical foundations',
    modalNav: 'Explore the architecture',
    modalCapabilities: 'Built for the way teams work', modalDifferentiators: 'Engineered to go further',
    book: 'Book an architecture review', bookFor: 'Discuss this architecture',
    scrollCue: 'Scroll to continue',
  },
  es: {
    select: 'Seleccione un sistema y explore su arquitectura',
    vision: 'La propuesta', capabilities: 'Capacidades', differentiators: 'La diferencia',
    details: 'Explorar arquitectura completa',
    close: 'Cerrar arquitectura', collapse: 'Cerrar', included: 'Fundamentos técnicos',
    modalNav: 'Explorar la arquitectura',
    modalCapabilities: 'Diseñado para la forma de trabajar de su equipo', modalDifferentiators: 'Ingeniería que va más lejos',
    book: 'Agendar revisión de arquitectura', bookFor: 'Conversemos sobre esta arquitectura',
    scrollCue: 'Desplácese para continuar',
  },
};

function getTools(t, language) {
  const source = t?.arsenal || translations.en.arsenal;
  return TOOL_CONFIG.map((config) => {
    const card = source.tools?.[config.key] || translations.en.arsenal.tools[config.key];
    const detail = source.modalDetails?.[config.id] || translations.en.arsenal.modalDetails[config.id];
    const translatedPills = source.pills?.[config.id] || [];
    const pills = EN_PILLS[config.id].map((pill, index) => {
      const label = translatedPills[index]?.label || pill.label;
      return { label: label.replace(/ 2\.0$/, '').replace(/^Más de 1\.000 /, '') };
    });
    return { ...config, ...card, detail, pills, sceneLabels: config.sceneNames[language] || config.sceneNames.en };
  });
}

// Scroll only walks tools and their chapters; the entries inside a chapter are picked by hand.
const TOUR = [{ chapter: 0 }, { chapter: 1 }, { chapter: 2 }];
// Scroll window (svh) each chapter holds the stage.
const CHAPTER_LENGTH = 60;
// Half of the scroll window (svh) spent covering and uncovering the stage between two tools.
const CURTAIN_HALF = 34;
const STORY_STEPS = TOOL_CONFIG.flatMap((tool, toolIndex) => TOUR.map((moment, step) => {
  const bordersCurtain = (step === TOUR.length - 1 && toolIndex < TOOL_CONFIG.length - 1) || (step === 0 && toolIndex > 0);
  return { ...moment, toolId: tool.id, toolIndex, step, length: CHAPTER_LENGTH + (bordersCurtain ? CURTAIN_HALF : 0) };
}));
const momentIndex = (toolIndex, chapter) => toolIndex * TOUR.length + chapter;
// Keep in sync with the pinned-story media query in ArsenalExperience.module.css.
const STORY_QUERY = '(min-width: 1024px) and (min-height: 540px) and (prefers-reduced-motion: no-preference)';
// Below this width the natural flow becomes an accordion of the four products. Keep in sync with the CSS.
const ACCORDION_QUERY = '(max-width: 1023px)';
// Where an opened product settles: just under the navbar's capsule.
const ROW_SETTLE = 88;
// This component also renders on the server, where useLayoutEffect warns.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const storyThreshold = () => Math.min(120, window.innerHeight * 0.2);
const curtainSpan = () => window.innerHeight * CURTAIN_HALF / 100;
const pad = (value) => String(value).padStart(2, '0');

const EASE_OUT = [0.16, 1, 0.3, 1];
const CURTAIN_BEZIER = [0.76, 0, 0.24, 1];
const curtainEase = cubicBezier(...CURTAIN_BEZIER);
const easeOut = cubicBezier(...EASE_OUT);
// Scroll-scrubbed ranges ease out more gently, so the change spreads across the scroll instead of its first pixels.
const scrubEase = cubicBezier(0.33, 1, 0.68, 1);
const linear = (value) => value;
// Motion tokens. Exits run shorter than entrances; every spring keeps a damping ratio above .9 (no overshoot).
const ENTER = 0.42;
const EXIT = 0.24;
const INDICATOR_SPRING = { type: 'spring', stiffness: 440, damping: 40 };
const LAYOUT_TRANSITION = { duration: ENTER, ease: EASE_OUT };
// Content follows the reader: scrolling down, the next chapter rises from below; scrolling up, it drops in from above.
// Direction 0 is a tool change, which the curtain already covers, so it only cross-fades.
// While two contents overlap, a 2px blur on both melts them into one change instead of two stacked layers. Full
// `transform` strings (not x/y) and filter/opacity keep these on the compositor.
const shift = (y, scale = 1) => `translateY(${y}px) scale(${scale})`;
const chapterVariants = {
  enter: (direction) => ({ opacity: 0, transform: shift(14 * direction), filter: 'blur(2px)' }),
  center: { opacity: 1, transform: shift(0), filter: 'blur(0px)', transition: { duration: ENTER, delay: 0.05, ease: EASE_OUT } },
  exit: (direction) => ({ opacity: 0, transform: shift(-10 * direction), filter: 'blur(2px)', transition: { duration: EXIT, ease: EASE_OUT } }),
};
const sceneVariants = {
  enter: (direction) => ({ opacity: 0, transform: shift(16 * direction, 0.975), filter: 'blur(2px)' }),
  center: { opacity: 1, transform: shift(0), filter: 'blur(0px)', transition: { duration: ENTER, ease: EASE_OUT } },
  exit: (direction) => ({ opacity: 0, transform: shift(-12 * direction, 0.985), filter: 'blur(2px)', transition: { duration: 0.3, ease: EASE_OUT } }),
};
const rollVariants = {
  enter: (direction) => (direction ? { y: `${100 * direction}%` } : { opacity: 0 }),
  center: { y: '0%', opacity: 1, transition: { duration: 0.36, ease: EASE_OUT } },
  exit: (direction) => (direction ? { y: `${-100 * direction}%`, transition: { duration: 0.3, ease: EASE_OUT } } : { opacity: 0, transition: { duration: EXIT } }),
};
// The stage opens like a window as the story arrives, then rests unclipped so scenes are never cropped.
function wellClip(progress) {
  const open = scrubEase(Math.min(1, Math.max(0, (progress - 0.2) / 0.7)));
  if (open >= 1) return 'none';
  const closed = 1 - open;
  return `inset(${(8 * closed).toFixed(2)}% ${(6 * closed).toFixed(2)}% ${(8 * closed).toFixed(2)}% ${(6 * closed).toFixed(2)}% round ${(24 * closed).toFixed(1)}px)`;
}
// 0 → .42 the curtain rises, .42 → .58 it holds (the tool swaps at .5), .58 → 1 it leaves through the top.
const CURTAIN_KEYS = [0, 0.42, 0.58, 1];
const RISE_END = 0.42;
const EXIT_START = 0.58;
const EDGE_XS = Array.from({ length: 17 }, (_, index) => index * 100 / 16);
// The moving edge bows upward mid-travel and flattens at rest, like fabric pulled from its centre.
const EDGE_BOW = 9;
// Offset of the accent layer that runs ahead of the panel on the way in and lingers behind it on the way out.
const LEAD_OFFSET = 0.035;

function curtainShape(progress) {
  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped > RISE_END && clamped < EXIT_START) return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const rising = clamped <= RISE_END;
  const eased = curtainEase(rising ? clamped / RISE_END : (clamped - EXIT_START) / (1 - EXIT_START));
  const line = 100 * (1 - eased);
  const bow = EDGE_BOW * Math.sin(Math.PI * eased);
  const edge = EDGE_XS.slice().reverse().map((x) => `${x.toFixed(2)}% ${(line - bow * Math.sin(Math.PI * x / 100)).toFixed(2)}%`);
  // Rising: the panel is anchored to the bottom. Leaving: it is anchored to the top and its bottom edge climbs.
  return `polygon(${rising ? '0% 100%, 100% 100%' : '0% 0%, 100% 0%'}, ${edge.join(', ')})`;
}
const leadShape = (progress) => curtainShape(progress <= 0.5 ? progress + LEAD_OFFSET : progress - LEAD_OFFSET);

function ArrowIcon({ diagonal = false }) {
  return diagonal
    ? <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    : <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Graphic({ tool, chapter }) {
  const Scene = tool.scenes[chapter];
  return <Scene />;
}

function LazyGraphic({ tool, chapter }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!ref.current) return undefined;
    // Decided after mount so server and client render the same empty frame first.
    if (typeof IntersectionObserver === 'undefined') { setNear(true); return undefined; }
    const observer = new IntersectionObserver(records => setNear(records[records.length - 1].isIntersecting), { rootMargin: '300px 0px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={s.naturalGraphic}>{near && <Graphic tool={tool} chapter={chapter} />}</div>;
}

// Each rail entry slides in on its own beat as the story arrives. The wrapper carries the entrance so the
// button keeps its own hover and press transforms.
function RailEntrance({ entry, index, children }) {
  const range = [0.1 + index * 0.08, 0.5 + index * 0.08];
  const x = useTransform(entry, range, [-18, 0], { ease: scrubEase });
  const opacity = useTransform(entry, range, [0, 1]);
  return <motion.div style={{ x, opacity }}>{children}</motion.div>;
}

function StoryNavigation({ tools, activeMoment, onJump, style, entry }) {
  return <motion.nav className={s.toolNav} aria-label="Arsenal" style={style}>
    {tools.map((tool, index) => <RailEntrance key={tool.id} entry={entry} index={index}>
      <button type="button" data-label={tool.tool}
        className={`${s.glowControl} ${s.toolButton}`} style={{ '--tool-accent': tool.color }}
        data-active={activeMoment.toolIndex === index} aria-current={activeMoment.toolIndex === index ? 'step' : undefined}
        onClick={() => onJump(momentIndex(index, 0))}>
        {activeMoment.toolIndex === index && <motion.span layoutId="arsenal-rail-indicator" className={s.railIndicator}
          transition={INDICATOR_SPRING} aria-hidden="true" />}
        <span className={s.productLogo}><img src={tool.logo} alt="" /></span><span className={s.toolLabel}>{tool.tool}</span>
      </button>
    </RailEntrance>)}
  </motion.nav>;
}

function CurtainLine({ progress, order, className, children }) {
  const lag = order * 0.03;
  const y = useTransform(progress, [0.14 + order * 0.05, 0.4 + lag, 0.58 + lag, 0.8 + lag], ['110%', '0%', '0%', '-110%'],
    { ease: [easeOut, linear, curtainEase] });
  return <span className={s.curtainMask}><motion.span className={className} style={{ y }}>{children}</motion.span></span>;
}

function ToolCurtain({ progress, tool, index, total, visible }) {
  const clipPath = useTransform(progress, curtainShape);
  const leadClipPath = useTransform(progress, leadShape);
  const markScale = useTransform(progress, [0, 1], [1.16, 0.92]);
  const markRotate = useTransform(progress, [0, 1], [-8, 6]);
  const markY = useTransform(progress, [0, 1], ['-38%', '-62%']);
  const titleScale = useTransform(progress, [0.14, 0.45, 0.58, 0.85], [1.06, 1, 1, 0.97]);
  return <div className={s.curtain} data-tool={tool.id} data-visible={visible} aria-hidden="true" style={{ '--curtain-accent': tool.color }}>
    <motion.div className={s.curtainLead} style={{ clipPath: leadClipPath }} />
    <motion.div className={s.curtainPanel} style={{ clipPath }}>
      <motion.img className={s.curtainMark} src={tool.logo} alt="" style={{ y: markY, scale: markScale, rotate: markRotate }} />
      <motion.div className={s.curtainContent} style={{ scale: titleScale }}>
        <CurtainLine progress={progress} order={0} className={s.curtainCount}>{`${pad(index + 1)} / ${pad(total)}`}</CurtainLine>
        <CurtainLine progress={progress} order={1} className={s.curtainTitle}>{tool.tool}</CurtainLine>
        <CurtainLine progress={progress} order={2} className={s.curtainMeta}>{tool.architecture}</CurtainLine>
      </motion.div>
    </motion.div>
  </div>;
}

// Lives inside the keyed chapter frame, so the selection starts over whenever the tool or chapter changes.
// One indicator glides between entries; siblings reflow through transforms, never an animated height.
function StoryEntries({ entries, withDetail, layoutKey }) {
  const [item, setItem] = useState(0);
  return <ol className={s.storyEntries}>
    {entries.map((entry, index) => <motion.li key={withDetail ? entry.label : entry} layout="position" transition={LAYOUT_TRANSITION}>
      <button type="button" className={s.storyEntry} data-state={index === item ? 'active' : undefined}
        aria-current={index === item ? 'true' : undefined} aria-expanded={withDetail ? index === item : undefined}
        onClick={() => setItem(index)}>
        {index === item && <motion.span layoutId={`${layoutKey}-entry`} className={s.entryIndicator}
          transition={INDICATOR_SPRING} aria-hidden="true" />}
        <span className={s.entryIndex} aria-hidden="true">{pad(index + 1)}</span>
        <span className={s.entryText}>
          <strong>{withDetail ? entry.label : entry}</strong>
          {withDetail && <AnimatePresence mode="popLayout" initial={false}>
            {index === item && <motion.span key="detail" className={s.entryDetail} initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.06, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.15, ease: EASE_OUT } }}>{entry.desc}</motion.span>}
          </AnimatePresence>}
        </span>
      </button>
    </motion.li>)}
  </ol>;
}

function StoryNarrative({ tool, moment, direction, copy, onJump, onOpen, style, cueProgress }) {
  const { toolIndex, chapter } = moment;
  const chapters = [copy.vision, copy.capabilities, copy.differentiators];
  return <motion.div className={s.narrative} style={{ '--tool-accent': tool.color, ...style }}>
    <div className={s.narrativeIntro}>
      <h3>{tool.title}</h3>
      {chapter === 0 && <motion.p className={s.narrativeBody} initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: ENTER, delay: 0.05, ease: EASE_OUT } }}>{tool.body}</motion.p>}
    </div>
    {/* Segmented control: one track, one sliding thumb. The index digits stay out of the accessible name.
        It glides to its new place when the proposition body comes or goes instead of jumping. */}
    <motion.nav layout="position" transition={LAYOUT_TRANSITION} className={s.chapterNav} aria-label={`${tool.tool}: ${copy.modalNav}`}>
      {chapters.map((label, index) => <button key={label} type="button" className={s.chapterTab}
        data-active={chapter === index} aria-current={chapter === index ? 'step' : undefined}
        onClick={() => onJump(momentIndex(toolIndex, index))}>
        {chapter === index && <motion.span layoutId="arsenal-chapter-thumb" className={s.chapterThumb}
          transition={INDICATOR_SPRING} aria-hidden="true" />}
        <span className={s.chapterIndex} aria-hidden="true">{pad(index + 1)}</span>{label}
      </button>)}
    </motion.nav>
    {/* popLayout lifts the outgoing chapter out of flow, so the incoming one takes its place at once. */}
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <motion.div key={`${tool.id}-${chapter}`} className={s.narrativeFrame} custom={direction}
        variants={chapterVariants} initial="enter" animate="center" exit="exit">
        {chapter === 0 ? <div className={s.proposition}>
          {tool.detail.subheadline !== tool.body && <p className={s.propositionLead}>{tool.detail.subheadline}</p>}
          <p className={s.propositionOutcome}><strong>{tool.detail.roiMetric}</strong><span>{tool.detail.roiLabel}</span></p>
          <p className={s.specsLine}>{tool.specs?.join(' · ')}</p>
          <ul className={s.chipGrid}>{tool.pills.map((pill) => <li key={pill.label}>{pill.label}</li>)}</ul>
        </div> : <StoryEntries entries={chapter === 1 ? tool.detail.capabilities : tool.detail.differentiators}
          withDetail={chapter === 1} layoutKey={`${tool.id}-${chapter}`} />}
      </motion.div>
    </AnimatePresence>
    <motion.div layout="position" transition={LAYOUT_TRANSITION} className={s.narrativeActions}>
      <ShaderButton type="button" tone={tool.color} className={s.detailLink} onClick={onOpen}>{copy.details}<ArrowIcon diagonal /></ShaderButton>
      {/* The cue's line is a meter: it fills as the reader nears the next chapter and empties when it lands. */}
      <span className={s.scrollCue} aria-hidden="true">
        <span className={s.cueTrack}><motion.span className={s.cueFill} style={{ scaleY: cueProgress }} /></span>
        <span className={s.cueLabel}>{copy.scrollCue}</span>
      </span>
    </motion.div>
  </motion.div>;
}

/**
 * One product in the natural flow. On desktop with reduced motion it is the long, open article it always was. Below
 * 1024px it is a row of an accordion: the product's face (logo, number, name, architecture, promise) is the trigger,
 * and the whole product (its proposition, capabilities and difference, each with its scene) unfolds under it. The CSS
 * sets both forms from the server's HTML (closed rows below 1024px), so nothing jumps when the script arrives; the
 * script only adds the button, the open state and the anchoring.
 */
function NaturalTool({ tool, toolIndex, total, copy, onOpen, registerMoment, reducedMotion, compact, open, onToggle, onCollapse, triggerRef }) {
  const chapters = [copy.vision, copy.capabilities, copy.differentiators];
  const reveal = { viewport: { once: true, amount: 0.5 }, transition: { duration: 0.8, ease: EASE_OUT } };
  // Scenes of a product that was never opened are never built; once built, they stay (so closing never jumps).
  const [visited, setVisited] = useState(false);
  useEffect(() => { if (open) setVisited(true); }, [open]);
  const scenes = !compact || visited;
  const panelId = `arsenal-natural-${tool.id}-panel`;
  const triggerId = `arsenal-natural-${tool.id}-trigger`;
  const collapsed = compact && !open;
  const heading = (chapter) => <h4><span className={s.naturalIndex} aria-hidden="true">{pad(chapter + 1)}</span>{chapters[chapter]}</h4>;
  const graphic = (chapter) => (scenes ? <LazyGraphic tool={tool} chapter={chapter} /> : <div className={s.naturalGraphic} />);
  const meta = <><span aria-hidden="true">{`${pad(toolIndex + 1)} / ${pad(total)}`}</span><strong>{tool.tool}</strong><small>{tool.architecture}</small></>;
  const toggle = <span className={s.rowToggle} aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M8 3v10M3 8h10" /></svg></span>;

  return <Reveal as="article" variant="block" delay={compact ? toolIndex * 80 : 0} amount={0.2} id={`arsenal-natural-${tool.id}`}
    className={s.naturalTool} data-open={compact ? open : undefined} style={{ '--tool-accent': tool.color }}>
    {/* In the accordion the rule belongs to the open state (CSS); in the long article it draws itself once in view. */}
    {compact
      ? <span className={s.naturalToolRule} aria-hidden="true" />
      : <motion.span className={s.naturalToolRule} aria-hidden="true" initial={reducedMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} {...reveal} />}
    {compact
      ? <h3 className={s.rowHeading}>
          <button ref={triggerRef} id={triggerId} type="button" className={`${s.naturalToolHeader} ${s.rowTrigger}`}
            aria-expanded={open} aria-controls={panelId} onClick={(event) => onToggle(event, toolIndex)}>
            <span className={s.productLogo}><img src={tool.logo} alt="" /></span>
            <span className={s.rowText}><span className={s.naturalMeta}>{meta}</span><span className={s.rowTitle}>{tool.title}</span></span>
            {toggle}
          </button>
        </h3>
      : <motion.header className={s.naturalToolHeader} initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} {...reveal}>
          <span className={s.productLogo}><img src={tool.logo} alt="" /></span>
          <div className={s.rowText}>
            <p className={s.naturalMeta}>{meta}</p>
            <h3 className={s.rowTitle}>{tool.title}</h3>
          </div>
          {toggle}
        </motion.header>}
    <div id={panelId} className={s.rowPanel} role={compact ? 'region' : undefined} aria-labelledby={compact ? triggerId : undefined}
      aria-hidden={collapsed || undefined} inert={collapsed || undefined}>
      <div className={s.rowClip}>
        <div className={s.rowInner}>
          <section ref={(node) => { registerMoment(momentIndex(toolIndex, 0), node); }} className={s.naturalChapter}>
            <div className={s.naturalCopy}>{heading(0)}<p>{tool.body}</p>{tool.detail.subheadline !== tool.body && <p>{tool.detail.subheadline}</p>}
              <p className={s.propositionOutcome}><strong>{tool.detail.roiMetric}</strong><span>{tool.detail.roiLabel}</span></p>
              <p className={s.specsLine}>{tool.specs?.join(' · ')}</p>
              <ul className={s.chipGrid}>{tool.pills.map((pill) => <li key={pill.label}>{pill.label}</li>)}</ul>
            </div>{graphic(0)}
          </section>
          {[1, 2].map((chapter) => <section key={chapter} ref={(node) => { registerMoment(momentIndex(toolIndex, chapter), node); }} className={s.naturalChapter}>
            <div className={s.naturalCopy}>{heading(chapter)}<ol className={s.naturalEntries}>
              {(chapter === 1 ? tool.detail.capabilities : tool.detail.differentiators).map((entry, item) => <li key={chapter === 1 ? entry.label : entry}>
                <span className={s.entryIndex} aria-hidden="true">{pad(item + 1)}</span>
                <div><strong>{chapter === 1 ? entry.label : entry}</strong>{chapter === 1 && <p>{entry.desc}</p>}</div>
              </li>)}
            </ol></div>{graphic(chapter)}
          </section>)}
          <div className={s.rowFoot}>
            {compact && <button type="button" className={s.rowClose} onClick={() => onCollapse(toolIndex)}>
              {`${copy.collapse} ${tool.tool}`}<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 10l4-4 4 4" /></svg>
            </button>}
            <ShaderButton type="button" tone={tool.color} className={`${s.detailLink} ${s.naturalCta}`} onClick={() => onOpen(tool.id, 0)}>{copy.details}<ArrowIcon diagonal /></ShaderButton>
          </div>
        </div>
      </div>
    </div>
  </Reveal>;
}

// A short label that rolls to its next value inside a mask, the way the curtain's lines move.
function RollText({ id, direction, className = '', children }) {
  return <span className={`${s.rollMask} ${className}`}>
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <motion.span key={id} className={s.rollLine} custom={direction} variants={rollVariants} initial="enter" animate="center" exit="exit">
        {children}
      </motion.span>
    </AnimatePresence>
  </span>;
}

function StagePanel({ tool, chapter, direction, caption, clipPath }) {
  const scene = `${tool.id}-${chapter}`;
  return <div className={s.stage} style={{ '--tool-accent': tool.color }}>
    <motion.div className={s.stageWell} style={{ clipPath }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div key={scene} className={s.graphic} custom={direction} variants={sceneVariants} initial="enter" animate="center" exit="exit">
          <Graphic tool={tool} chapter={chapter} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
    <div className={s.stageCaption}>
      <div className={s.sceneMeta}>
        <RollText id={scene} direction={direction} className={s.sceneLabel}>{tool.sceneLabels[chapter]}</RollText>
        <small aria-hidden="true"><RollText id={scene} direction={direction}>{`${pad(chapter + 1)} / ${pad(tool.scenes.length)}`}</RollText></small>
      </div>
      {/* Lifted out of flow as it leaves, so the stage resizes together with the scene swap rather than after it. */}
      <AnimatePresence mode="popLayout" initial={false}>
        {caption && <motion.p key={tool.id} initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, transition: { duration: ENTER, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE_OUT } }}>{caption}</motion.p>}
      </AnimatePresence>
    </div>
  </div>;
}

function ProgressSegment({ progress, index, color }) {
  const scaleX = useTransform(progress, [index, index + 1], [0, 1]);
  return <span className={s.progressSegment} style={{ '--segment-accent': color }}><motion.i style={{ scaleX }} /></span>;
}

export default function ArsenalExperience({ onOpenModal, isModalOpen = false }) {
  const { t, language } = useLanguage();
  const tools = useMemo(() => getTools(t, language), [t, language]);
  const copy = UI[language] || UI.en;
  const reducedMotion = useReducedMotionSafe();
  const [{ index: activeIndex, direction }, setActive] = useState({ index: 0, direction: 0 });
  const activeIndexRef = useRef(0);
  const storyRef = useRef(null);
  const screenRef = useRef(null);
  const markerRefs = useRef([]);
  const naturalRefs = useRef([]);
  const triggerRefs = useRef([]);
  // Below 1024px the natural flow is an accordion. Known after mount; the CSS already shows closed rows before that.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const media = window.matchMedia?.(ACCORDION_QUERY);
    if (!media) return undefined;
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] });
  // Arrival runs while the story climbs from the bottom of the viewport to its pin; departure while it scrolls away.
  const { scrollYProgress: arrival } = useScroll({ target: storyRef, offset: ['start end', 'start start'] });
  const { scrollYProgress: departure } = useScroll({ target: storyRef, offset: ['end end', 'end start'] });
  const curtain = useMotionValue(0);
  // Distance travelled towards the next moment (0 → 1), and the whole story as tool index plus fraction.
  const momentProgress = useMotionValue(0);
  const storyProgress = useMotionValue(0);
  const [curtainState, setCurtainState] = useState({ toolIndex: 1, visible: false });
  const curtainStateRef = useRef(curtainState);
  const jumpingRef = useRef(false);
  const jumpAnimation = useRef(null);
  const activeMoment = STORY_STEPS[activeIndex];
  const activeTool = tools[activeMoment.toolIndex];
  const { chapter } = activeMoment;
  // Outgoing content recedes while the curtain rises; incoming content settles as it leaves.
  const curtainY = useTransform(curtain, [0, 0.45, 0.55, 1], [0, -48, 48, 0]);
  const curtainScale = useTransform(curtain, [0, 0.45, 0.55, 1], [1, 0.965, 0.965, 1]);
  const curtainOpacity = useTransform(curtain, CURTAIN_KEYS, [1, 0.2, 0.2, 1]);
  const arrivalY = useTransform(arrival, [0.35, 0.85], [24, 0], { ease: scrubEase });
  const arrivalOpacity = useTransform(arrival, [0.35, 0.85], [0, 1]);
  const departureY = useTransform(departure, [0, 0.7], [0, -24]);
  const departureOpacity = useTransform(departure, [0, 0.7], [1, 0.5]);
  const departureStageScale = useTransform(departure, [0, 0.7], [1, 0.96]);
  const departureStageOpacity = useTransform(departure, [0, 0.7], [1, 0.35]);
  const narrativeStyle = {
    y: useTransform(() => curtainY.get() + arrivalY.get() + departureY.get()),
    scale: curtainScale,
    opacity: useTransform(() => curtainOpacity.get() * arrivalOpacity.get() * departureOpacity.get()),
  };
  const stageStyle = {
    y: curtainY,
    scale: useTransform(() => curtainScale.get() * departureStageScale.get()),
    opacity: useTransform(() => curtainOpacity.get() * departureStageOpacity.get()),
  };
  const stageClip = useTransform(arrival, wellClip);
  const progressTrack = useTransform(arrival, [0.5, 0.9], [0, 1], { ease: scrubEase });
  // The rail steps aside while a curtain is on screen so the chapter card owns the whole stage.
  const railStyle = {
    opacity: useTransform(curtain, [0, 0.1, 0.9, 1], [1, 0, 0, 1]),
    x: useTransform(curtain, [0, 0.1, 0.9, 1], [0, -16, -16, 0]),
  };

  const showCurtain = (toolIndex, visible) => {
    const current = curtainStateRef.current;
    if (current.toolIndex === toolIndex && current.visible === visible) return;
    curtainStateRef.current = { toolIndex, visible };
    setCurtainState(curtainStateRef.current);
  };

  useEffect(() => () => jumpAnimation.current?.stop(), []);

  // The stage glow only breathes while the story is on screen.
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen || !storyRef.current || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(records => { screen.dataset.running = String(records[records.length - 1].isIntersecting); });
    observer.observe(storyRef.current);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', () => {
    if (isModalOpen || !window.matchMedia?.(STORY_QUERY).matches) return;
    const previous = activeIndexRef.current;
    let next = previous;
    const threshold = storyThreshold();
    const top = (index) => markerRefs.current[index]?.getBoundingClientRect().top;
    while (next < STORY_STEPS.length - 1 && top(next + 1) <= threshold) next += 1;
    while (next > 0 && top(next) > threshold) next -= 1;
    if (next !== previous) {
      activeIndexRef.current = next;
      const sameTool = STORY_STEPS[next].toolIndex === STORY_STEPS[previous].toolIndex;
      setActive({ index: next, direction: sameTool ? Math.sign(next - previous) : 0 });
    }
    const start = top(next);
    const end = next < STORY_STEPS.length - 1 ? top(next + 1) : markerRefs.current[next]?.getBoundingClientRect().bottom;
    const travelled = end > start ? Math.min(1, Math.max(0, (threshold - start) / (end - start))) : 0;
    momentProgress.set(travelled);
    storyProgress.set(STORY_STEPS[next].toolIndex + (STORY_STEPS[next].step + travelled) / TOUR.length);
    if (jumpingRef.current) return;
    // Each tool's first marker is the swap line: the curtain is fully closed exactly when it crosses the threshold.
    const span = curtainSpan();
    for (let toolIndex = 1; toolIndex < TOOL_CONFIG.length; toolIndex += 1) {
      const top = markerRefs.current[momentIndex(toolIndex, 0)]?.getBoundingClientRect().top;
      const distance = threshold - top;
      if (Math.abs(distance) < span) {
        curtain.set((distance + span) / (2 * span));
        showCurtain(toolIndex, true);
        return;
      }
    }
    curtain.set(0);
    showCurtain(curtainStateRef.current.toolIndex, false);
  });

  const jump = (index) => {
    const target = markerRefs.current[index];
    if (!target) return;
    const toolIndex = STORY_STEPS[index].toolIndex;
    if (reducedMotion || toolIndex === STORY_STEPS[activeIndexRef.current].toolIndex) {
      scrollToTarget(target, { immediate: reducedMotion });
      return;
    }
    // Crossing tools: close one curtain, teleport behind it, then reveal, instead of scrubbing through every boundary.
    jumpingRef.current = true;
    jumpAnimation.current?.stop();
    if (curtain.get() >= 0.5) curtain.set(0);
    showCurtain(toolIndex, true);
    jumpAnimation.current = animate(curtain, 0.5, { duration: 0.55, ease: CURTAIN_BEZIER });
    jumpAnimation.current.then(() => {
      const landing = target.getBoundingClientRect().top - storyThreshold() + (STORY_STEPS[index].step === 0 ? curtainSpan() + 2 : 1);
      scrollToTarget(window.scrollY + landing, { immediate: true });
      jumpAnimation.current = animate(curtain, 1, {
        duration: 0.75, ease: CURTAIN_BEZIER,
        onComplete: () => { curtain.set(0); jumpingRef.current = false; showCurtain(toolIndex, false); },
      });
    });
  };
  const jumpNatural = (index) => scrollToTarget(naturalRefs.current[index], { immediate: reducedMotion });
  // One product open at a time; the tapped row stays under the finger while the one above folds away, then an opened
  // product settles just under the navbar if it opened in the lower half of the screen.
  const [openTool, setOpenTool] = useState(null);
  const holdRow = useTapAnchor(openTool);
  const settle = useRef(null);
  const toggleTool = (event, index) => {
    holdRow(event.currentTarget);
    settle.current = openTool === index ? null : index;
    setOpenTool((current) => (current === index ? null : index));
  };
  // Closing from the end of a product brings its row back under the navbar instead of leaving the reader in the space
  // where the product was. The content being read is gone, so the page moves in the same frame the product folds.
  const returnTo = useRef(null);
  const collapseTool = (index) => {
    returnTo.current = index;
    setOpenTool(null);
  };
  useIsoLayoutEffect(() => {
    const index = returnTo.current;
    returnTo.current = null;
    const row = index === null ? null : triggerRefs.current[index];
    if (!row) return;
    scrollToTarget(row, { offset: -ROW_SETTLE, immediate: true });
    // The button that was pressed is gone with the product; focus returns to the row that opens it.
    row.focus({ preventScroll: true });
  }, [openTool]);
  useEffect(() => {
    const index = settle.current;
    settle.current = null;
    const row = index === null ? null : triggerRefs.current[index];
    if (row && row.getBoundingClientRect().top > window.innerHeight * 0.5) scrollToTarget(row, { offset: -ROW_SETTLE, immediate: reducedMotion });
  }, [openTool, reducedMotion]);
  // The narrative column already carries each capability and differentiator; the stage caption only adds
  // the proposition headline, and only when it says something the title does not.
  const sceneCaption = chapter === 0 && activeTool.detail.headline !== activeTool.title ? activeTool.detail.headline : null;
  return <section className={s.section} aria-labelledby="arsenal-heading">
    <div className={s.container}>
      <header className={s.sectionHeader}>
        <h2 id="arsenal-heading"><CharacterReveal text={`${t?.arsenal?.sectionTitlePre || 'The'} ${t?.arsenal?.sectionTitleMain || '*Arsenal*'}`} /></h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}>{t?.arsenal?.sectionSubtitle}</motion.p>
      </header>
    </div>
    <div ref={storyRef} className={s.scrollStory}>
      <div ref={screenRef} className={s.stickyScreen} data-curtain={curtainState.visible} style={{ '--tool-accent': activeTool.color }}>
        <div className={s.storyLeft}>
          <StoryNavigation tools={tools} activeMoment={activeMoment} onJump={jump} style={railStyle} entry={arrival} />
          <StoryNarrative tool={activeTool} moment={activeMoment} direction={direction} copy={copy} onJump={jump} style={narrativeStyle}
            cueProgress={momentProgress} onOpen={() => onOpenModal?.(activeTool.id, chapter)} />
        </div>
        <motion.div className={s.storyRight} style={stageStyle}>
          <StagePanel tool={activeTool} chapter={chapter} direction={direction} caption={sceneCaption} clipPath={stageClip} />
          <motion.div className={s.scrollProgress} style={{ scaleX: progressTrack }} aria-hidden="true">
            {tools.map((tool, index) => <ProgressSegment key={tool.id} progress={storyProgress} index={index} color={tool.color} />)}
          </motion.div>
        </motion.div>
        <ToolCurtain progress={curtain} tool={tools[curtainState.toolIndex]} index={curtainState.toolIndex}
          total={tools.length} visible={curtainState.visible} />
        <p className={s.srOnly} aria-live="polite">{activeTool.tool}</p>
      </div>
      <div className={s.scrollMarkers} aria-hidden="true">
        {STORY_STEPS.map((moment, index) => <div key={`${moment.toolId}-${moment.step}`}
          ref={(node) => { markerRefs.current[index] = node; }} className={s.scrollMarker}
          style={{ height: `${moment.length}svh` }} data-moment={index} />)}
      </div>
    </div>
    <div className={`${s.container} ${s.naturalExperience}`}>
      {!compact && <nav className={s.naturalToolNav} aria-label={copy.select}>{tools.map((tool, index) => <button key={tool.id} type="button"
        className={`${s.glowControl} ${s.naturalToolButton}`} style={{ '--tool-accent': tool.color }}
        onClick={() => jumpNatural(momentIndex(index, 0))}><span className={s.naturalNavLogo}><img src={tool.logo} alt="" /></span>{tool.tool}<ArrowIcon /></button>)}</nav>}
      <div className={s.naturalList}>
        {tools.map((tool, index) => <NaturalTool key={tool.id} tool={tool} toolIndex={index} total={tools.length} copy={copy} reducedMotion={reducedMotion}
          registerMoment={(moment, node) => { naturalRefs.current[moment] = node; }} onOpen={onOpenModal}
          compact={compact} open={openTool === index} onToggle={toggleTool} onCollapse={collapseTool}
          triggerRef={(node) => { triggerRefs.current[index] = node; }} />)}
      </div>
    </div>
  </section>;
}

// The intro lines rise out of their own masks once the panel has begun to open, like the curtain's lines.
const introVariants = { hidden: {}, shown: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } } };
const introLineVariants = { hidden: { y: '110%' }, shown: { y: '0%', transition: { duration: 0.62, ease: EASE_OUT } } };
function ModalLine({ children }) {
  return <div className={s.modalMask}><motion.div variants={introLineVariants}>{children}</motion.div></div>;
}

export function ArsenalDetailModal({ toolId, initialChapter = 0, onClose }) {
  const { t, language } = useLanguage();
  const tools = useMemo(() => getTools(t, language), [t, language]);
  const tool = tools.find((entry) => entry.id === toolId);
  const copy = UI[language] || UI.en;
  const dialogRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRefs = useRef([]);
  const returnFocusRef = useRef(null);
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotionSafe();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!tool || !mounted) return undefined;
    returnFocusRef.current = document.activeElement;
    const previous = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    // Locking <body> makes it a scroll container, which un-pins the Arsenal story behind the backdrop and shows
    // through as the modal fades. On the pinned layout the <html> lock alone stops scrolling; touch layouts need both.
    if (!window.matchMedia?.(STORY_QUERY).matches) document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    lockScroll();
    dialogRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const nodes = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    const raf = window.requestAnimationFrame(() => {
      const section = sectionRefs.current[initialChapter];
      const scroller = contentRef.current;
      if (section && scroller && initialChapter > 0) scroller.scrollTop += section.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 24;
    });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previous;
      document.documentElement.style.overflow = previousHtml;
      unlockScroll();
      returnFocusRef.current?.focus?.();
    };
  }, [toolId, mounted, onClose, initialChapter, tool]);

  if (!tool || !mounted) return null;
  const chapters = [copy.vision, copy.capabilities, copy.differentiators];
  const jumpTo = (index) => {
    setCurrentChapter(index);
    const section = sectionRefs.current[index];
    const scroller = contentRef.current;
    if (section && scroller) scroller.scrollTo({ top: scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 24, behavior: reducedMotion ? 'auto' : 'smooth' });
  };
  const onModalScroll = () => {
    const scroller = contentRef.current;
    if (!scroller) return;
    let nearest = 0;
    for (let index = 0; index < 3; index += 1) {
      const section = sectionRefs.current[index];
      if (section && section.getBoundingClientRect().top <= scroller.getBoundingClientRect().top + 170) nearest = index;
    }
    setCurrentChapter(nearest);
  };

  // The modal wraps the backdrop's fade: the panel closes the way it opened, a beat ahead of the backdrop.
  return createPortal(<motion.div className={s.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.32, ease: EASE_OUT } }}
    transition={{ duration: reducedMotion ? 0 : 0.32 }}>
    <motion.div ref={dialogRef} className={s.modal} style={{ '--tool-accent': tool.color }} role="dialog" aria-modal="true" aria-labelledby="arsenal-modal-title" tabIndex={-1}
      initial={reducedMotion ? false : { opacity: 0, y: 32, clipPath: 'inset(6% 3% 0% 3% round 16px)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, clipPath: 'inset(4% 2% 0% 2% round 16px)', transition: { duration: 0.28, ease: EASE_OUT } }}
      transition={{ duration: reducedMotion ? 0 : 0.62, ease: EASE_OUT }}>
      <header className={s.modalHeader}>
        <div className={s.modalBrand}><span className={s.modalLogo}><img src={tool.logo} alt="" /></span><strong>{tool.tool}</strong></div>
        <button type="button" className={s.modalClose} onClick={onClose} aria-label={copy.close}><span aria-hidden="true">×</span></button>
      </header>
      <div ref={contentRef} className={s.modalScroll} onScroll={onModalScroll} data-lenis-prevent="">
        <motion.div className={s.modalIntro} variants={introVariants} initial={reducedMotion ? false : 'hidden'} animate="shown">
          <ModalLine><h2 id="arsenal-modal-title">{tool.detail.headline}</h2></ModalLine>
          <ModalLine><p className={s.modalLead}>{tool.detail.subheadline}</p></ModalLine>
          <ModalLine><p className={s.modalArchitecture}>{tool.architecture}</p></ModalLine>
          <ModalLine><p className={s.modalOutcome}><span>{tool.detail.roiMetric}</span> {tool.detail.roiLabel}</p></ModalLine>
        </motion.div>
        <div className={s.modalBody}>
          <nav className={s.modalNav} aria-label={copy.modalNav}>
            {chapters.map((label, index) => <button key={label} type="button" className={currentChapter === index ? s.modalNavActive : ''} onClick={() => jumpTo(index)}>{label}</button>)}
          </nav>
          <div className={s.modalChapters}>
            <section ref={(node) => { sectionRefs.current[0] = node; }} className={s.modalChapter} aria-labelledby="arsenal-modal-vision">
              <div className={s.modalChapterHeading}><h3 id="arsenal-modal-vision">{copy.vision}</h3><p>{tool.title}</p></div>
              <p className={s.modalChapterText}>{tool.body}</p>
              <div className={s.modalGraphic}><Graphic tool={tool} chapter={0} /></div>
              <div className={s.modalPills}>{tool.pills.map((pill) => <div key={pill.label}><span>{pill.label}</span></div>)}</div>
            </section>
            <section ref={(node) => { sectionRefs.current[1] = node; }} className={s.modalChapter} aria-labelledby="arsenal-modal-capabilities">
              <div className={s.modalChapterHeading}><h3 id="arsenal-modal-capabilities">{copy.modalCapabilities}</h3></div>
              <div className={s.modalGraphic}><Graphic tool={tool} chapter={1} /></div>
              <div className={s.modalFeatureList}>{tool.detail.capabilities.map((entry) => <div key={entry.label}><h4>{entry.label}</h4><p>{entry.desc}</p></div>)}</div>
            </section>
            <section ref={(node) => { sectionRefs.current[2] = node; }} className={s.modalChapter} aria-labelledby="arsenal-modal-differentiators">
              <div className={s.modalChapterHeading}><h3 id="arsenal-modal-differentiators">{copy.modalDifferentiators}</h3></div>
              <div className={s.modalGraphic}><Graphic tool={tool} chapter={2} /></div>
              <div className={s.modalFeatureList}>{tool.detail.differentiators.map((entry) => <div key={entry}><h4>{entry}</h4></div>)}</div>
            </section>
            <div className={s.modalEnd}><p>{copy.bookFor}</p><ShaderButton href="#contact" tone={tool.color} onClick={onClose}>{copy.book}<ArrowIcon diagonal /></ShaderButton></div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>, document.body);
}
