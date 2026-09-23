'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, cubicBezier, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';
import { PbiDataStorytellingUiAnim, PbiAiInsightsOverlayAnim, PbiSemanticModelGraphAnim } from '../graphics/PowerBiAnimations';
import { PbaThreeParadigmsAnim, PbaProCodeApiEngineAnim, PbaEnterpriseDataverseMeshAnim } from '../graphics/PowerAppsAnimations';
import { PauSelfHealingFlowAnim, PauEventDrivenMeshAnim, PauResilientDlqMeshAnim } from '../graphics/PowerAutomateAnimations';
import { McsGroundedReasoningAnim, McsMultiStepChainAnim, McsZeroHallucinationFieldAnim } from '../graphics/CopilotStudioAnimations';
import s from './ArsenalExperience.module.css';

const TOOL_CONFIG = [
  {
    id: 'power-bi', key: 'powerBi', color: '#f2c811',
    logo: '/NeuralBI/assets/New_Power_BI_Logo.svg',
    scenes: [PbiDataStorytellingUiAnim, PbiAiInsightsOverlayAnim, PbiSemanticModelGraphAnim],
    sceneNames: { en: ['Executive adoption', 'AI narrative', 'Semantic architecture'], es: ['Adopción ejecutiva', 'Narrativa con IA', 'Arquitectura semántica'] },
  },
  {
    id: 'power-apps', key: 'powerApps', color: '#e7a2cd',
    logo: '/NeuralBI/assets/Powerapps-logo.svg.svg',
    scenes: [PbaThreeParadigmsAnim, PbaProCodeApiEngineAnim, PbaEnterpriseDataverseMeshAnim],
    sceneNames: { en: ['Three paradigms', 'Pro-code engine', 'Dataverse mesh'], es: ['Tres paradigmas', 'Motor pro-code', 'Malla Dataverse'] },
  },
  {
    id: 'power-automate', key: 'powerAutomate', color: '#9bc5ec',
    logo: '/NeuralBI/assets/Power Automate logo.svg',
    scenes: [PauSelfHealingFlowAnim, PauEventDrivenMeshAnim, PauResilientDlqMeshAnim],
    sceneNames: { en: ['Self-healing flow', 'Event-driven mesh', 'Resilient delivery'], es: ['Flujo autocorrectivo', 'Malla de eventos', 'Entrega resiliente'] },
  },
  {
    id: 'copilot-studio', key: 'copilotStudio', color: '#a2d8c1',
    logo: '/NeuralBI/assets/Copilot Studio.svg',
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
    close: 'Close architecture', included: 'Technical foundations',
    modalNav: 'Explore the architecture',
    modalCapabilities: 'Built for the way teams work', modalDifferentiators: 'Engineered to go further',
    book: 'Book an architecture review', bookFor: 'Discuss this architecture',
  },
  es: {
    select: 'Seleccione un sistema y explore su arquitectura',
    vision: 'La propuesta', capabilities: 'Capacidades', differentiators: 'La diferencia',
    details: 'Explorar arquitectura completa',
    close: 'Cerrar arquitectura', included: 'Fundamentos técnicos',
    modalNav: 'Explorar la arquitectura',
    modalCapabilities: 'Diseñado para la forma de trabajar de su equipo', modalDifferentiators: 'Ingeniería que va más lejos',
    book: 'Agendar revisión de arquitectura', bookFor: 'Conversemos sobre esta arquitectura',
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

const TOUR = [
  { chapter: 0, item: -1 },
  ...Array.from({ length: 4 }, (_, item) => ({ chapter: 1, item })),
  ...Array.from({ length: 4 }, (_, item) => ({ chapter: 2, item })),
];
const firstStep = (chapter, item = 0) => chapter === 0 ? 0 : chapter === 1 ? 1 + item : 5 + item;
// Half of the scroll window (svh) spent covering and uncovering the stage between two tools.
const CURTAIN_HALF = 34;
const STORY_STEPS = TOOL_CONFIG.flatMap((tool, toolIndex) => TOUR.map((moment, step) => {
  const base = moment.chapter === 0 ? 60 : moment.chapter === 1 ? 30 : 22;
  const bordersCurtain = (step === TOUR.length - 1 && toolIndex < TOOL_CONFIG.length - 1) || (step === 0 && toolIndex > 0);
  return { ...moment, toolId: tool.id, toolIndex, step, length: base + (bordersCurtain ? CURTAIN_HALF : 0) };
}));
const momentIndex = (toolIndex, chapter, item = 0) => toolIndex * TOUR.length + firstStep(chapter, item);
const STORY_QUERY = '(min-width: 1100px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)';
const storyThreshold = () => Math.min(120, window.innerHeight * 0.2);
const curtainSpan = () => window.innerHeight * CURTAIN_HALF / 100;
const pad = (value) => String(value).padStart(2, '0');

const EASE_OUT = [0.16, 1, 0.3, 1];
const CURTAIN_BEZIER = [0.76, 0, 0.24, 1];
const curtainEase = cubicBezier(...CURTAIN_BEZIER);
const easeOut = cubicBezier(...EASE_OUT);
const linear = (value) => value;
// 0 → .42 the curtain rises, .42 → .58 it holds (the tool swaps at .5), .58 → 1 it leaves through the top.
const CURTAIN_KEYS = [0, 0.42, 0.58, 1];
const CURTAIN_EASES = [curtainEase, linear, curtainEase];

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
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '300px 0px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={s.naturalGraphic}>{near && <Graphic tool={tool} chapter={chapter} />}</div>;
}

function StoryNavigation({ tools, activeMoment, onJump }) {
  return <nav className={s.toolNav} aria-label="Arsenal">
    {tools.map((tool, index) => <button key={tool.id} type="button"
      className={`${s.glowControl} ${s.toolButton}`} style={{ '--tool-accent': tool.color }}
      data-active={activeMoment.toolIndex === index} aria-current={activeMoment.toolIndex === index ? 'step' : undefined}
      onClick={() => onJump(momentIndex(index, 0))}>
      {activeMoment.toolIndex === index && <motion.span layoutId="arsenal-rail-indicator" className={s.railIndicator}
        transition={{ type: 'spring', stiffness: 420, damping: 38 }} aria-hidden="true" />}
      <span className={s.productLogo}><img src={tool.logo} alt="" /></span><span>{tool.tool}</span>
    </button>)}
  </nav>;
}

function CurtainLine({ progress, order, className, children }) {
  const lag = order * 0.03;
  const y = useTransform(progress, [0.14 + order * 0.05, 0.4 + lag, 0.58 + lag, 0.8 + lag], ['110%', '0%', '0%', '-110%'],
    { ease: [easeOut, linear, curtainEase] });
  return <span className={s.curtainMask}><motion.span className={className} style={{ y }}>{children}</motion.span></span>;
}

function ToolCurtain({ progress, tool, index, total, visible }) {
  const clipPath = useTransform(progress, CURTAIN_KEYS, [
    'inset(100% 0% 0% 0% round 20px)', 'inset(0% 0% 0% 0% round 20px)',
    'inset(0% 0% 0% 0% round 20px)', 'inset(0% 0% 100% 0% round 20px)',
  ], { ease: CURTAIN_EASES });
  // The glowing edge rides the clip boundary: the top edge while rising, the bottom edge while leaving.
  const edgeY = useTransform(progress, CURTAIN_KEYS, ['100%', '0%', '100%', '0%'], { ease: CURTAIN_EASES });
  const edgeOpacity = useTransform(progress, [0, 0.03, 0.36, 0.42, 0.58, 0.64, 0.97, 1], [0, 1, 1, 0, 0, 1, 1, 0]);
  const markScale = useTransform(progress, [0, 1], [1.16, 0.92]);
  const markRotate = useTransform(progress, [0, 1], [-8, 6]);
  return <div className={s.curtain} data-tool={tool.id} data-visible={visible} aria-hidden="true" style={{ '--curtain-accent': tool.color }}>
    <motion.div className={s.curtainPanel} style={{ clipPath }}>
      <motion.img className={s.curtainMark} src={tool.logo} alt="" style={{ y: '-50%', scale: markScale, rotate: markRotate }} />
      <div className={s.curtainContent}>
        <CurtainLine progress={progress} order={0} className={s.curtainCount}>{`${pad(index + 1)} / ${pad(total)}`}</CurtainLine>
        <CurtainLine progress={progress} order={1} className={s.curtainTitle}>{tool.tool}</CurtainLine>
        <CurtainLine progress={progress} order={2} className={s.curtainMeta}>{tool.architecture}</CurtainLine>
      </div>
    </motion.div>
    <motion.div className={s.curtainEdgeTrack} style={{ y: edgeY, opacity: edgeOpacity }}><span className={s.curtainEdge} /></motion.div>
  </div>;
}

function StoryNarrative({ tool, moment, copy, onJump, onOpen, depth }) {
  const { toolIndex, chapter, item } = moment;
  const chapters = [copy.vision, copy.capabilities, copy.differentiators];
  const entries = chapter === 1 ? tool.detail.capabilities : tool.detail.differentiators;
  return <motion.div className={s.narrative} style={{ '--tool-accent': tool.color, ...depth }}>
    <div className={s.narrativeIntro}>
      <h3>{tool.title}</h3>
      {chapter === 0 && <p className={s.narrativeBody}>{tool.body}</p>}
    </div>
    <nav className={s.chapterNav} aria-label={`${tool.tool}: ${copy.modalNav}`}>
      {chapters.map((label, index) => <button key={label} type="button" className={s.glowControl}
        data-active={chapter === index} aria-current={chapter === index ? 'step' : undefined}
        onClick={() => onJump(momentIndex(toolIndex, index))}>{label}</button>)}
    </nav>
    <motion.div key={`${tool.id}-${chapter}`} className={s.narrativeFrame}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE_OUT }}>
      {chapter === 0 ? <div className={s.proposition}>
        {tool.detail.subheadline !== tool.body && <p>{tool.detail.subheadline}</p>}
        <p className={s.outcome}><strong>{tool.detail.roiMetric}</strong> {tool.detail.roiLabel}</p>
        <p className={s.specsLine}>{tool.specs?.join(' · ')}</p>
        <ul className={s.pillList}>{tool.pills.map((pill) => <li key={pill.label}>{pill.label}</li>)}</ul>
      </div> : <ul className={s.storyEntries}>
        {entries.map((entry, index) => <li key={chapter === 1 ? entry.label : entry}>
          <button type="button" className={`${s.glowControl} ${s.storyEntry}`} data-state={index === item ? 'active' : index < item ? 'visited' : 'upcoming'}
            aria-current={index === item ? 'step' : undefined} onClick={() => onJump(momentIndex(toolIndex, chapter, index))}>
            <strong>{chapter === 1 ? entry.label : entry}</strong>
            {chapter === 1 && index === item && <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.36, ease: EASE_OUT }}>{entry.desc}</motion.span>}
          </button>
        </li>)}
      </ul>}
    </motion.div>
    <button type="button" className={`${s.glowControl} ${s.detailLink}`} onClick={onOpen}>{copy.details}<ArrowIcon diagonal /></button>
  </motion.div>;
}

function NaturalTool({ tool, toolIndex, copy, onOpen, registerMoment, reducedMotion }) {
  const chapters = [copy.vision, copy.capabilities, copy.differentiators];
  const reveal = { viewport: { once: true, amount: 0.5 }, transition: { duration: 0.8, ease: EASE_OUT } };
  return <article id={`arsenal-natural-${tool.id}`} className={s.naturalTool} style={{ '--tool-accent': tool.color }}>
    <motion.span className={s.naturalToolRule} aria-hidden="true" initial={reducedMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} {...reveal} />
    <motion.header className={s.naturalToolHeader} initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} {...reveal}>
      <span className={s.productLogo}><img src={tool.logo} alt="" /></span><div><p>{tool.tool} · {tool.architecture}</p><h3>{tool.title}</h3></div>
    </motion.header>
    <section ref={(node) => { registerMoment(momentIndex(toolIndex, 0), node); }} className={s.naturalChapter}>
      <div className={s.naturalCopy}><h4>{chapters[0]}</h4><p>{tool.body}</p>{tool.detail.subheadline !== tool.body && <p>{tool.detail.subheadline}</p>}
        <p className={s.outcome}><strong>{tool.detail.roiMetric}</strong> {tool.detail.roiLabel}</p>
        <p className={s.specsLine}>{tool.specs?.join(' · ')}</p><ul className={s.pillList}>{tool.pills.map((pill) => <li key={pill.label}>{pill.label}</li>)}</ul>
      </div><LazyGraphic tool={tool} chapter={0} />
      <button type="button" className={`${s.glowControl} ${s.detailLink}`} onClick={() => onOpen(tool.id, 0)}>{copy.details}<ArrowIcon diagonal /></button>
    </section>
    {[1, 2].map((chapter) => <section key={chapter} className={s.naturalChapter}>
      <div className={s.naturalCopy}><h4>{chapters[chapter]}</h4><ul className={s.naturalEntries}>
        {(chapter === 1 ? tool.detail.capabilities : tool.detail.differentiators).map((entry, item) => <li key={chapter === 1 ? entry.label : entry}
          ref={(node) => { registerMoment(momentIndex(toolIndex, chapter, item), node); }}>
          <strong>{chapter === 1 ? entry.label : entry}</strong>{chapter === 1 && <p>{entry.desc}</p>}
        </li>)}
      </ul></div><LazyGraphic tool={tool} chapter={chapter} />
      <button type="button" className={`${s.glowControl} ${s.detailLink}`} onClick={() => onOpen(tool.id, chapter)}>{copy.details}<ArrowIcon diagonal /></button>
    </section>)}
  </article>;
}

function StagePanel({ tool, chapter, step, caption, reducedMotion }) {
  return <div className={s.stage} style={{ '--tool-accent': tool.color }}>
    <div className={s.stageWell}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={`${tool.id}-${chapter}`} className={s.graphic}
          initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.975 }}
          animate={{ opacity: 1, y: 0, scale: 1 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985 }}
          transition={{ duration: reducedMotion ? 0 : 0.42, ease: EASE_OUT }}>
          <Graphic tool={tool} chapter={chapter} />
        </motion.div>
      </AnimatePresence>
    </div>
    <div className={s.stageCaption}>
      <div className={s.sceneMeta}><span>{tool.sceneLabels[chapter]}</span><small aria-hidden="true">{`${pad(chapter + 1)} / ${pad(tool.scenes.length)}`}</small></div>
      <AnimatePresence mode="wait" initial={false}><motion.p key={`${tool.id}-${step}`}
        initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}>{caption}</motion.p></AnimatePresence>
    </div>
  </div>;
}

export default function ArsenalExperience({ onOpenModal, isModalOpen = false }) {
  const { t, language } = useLanguage();
  const tools = useMemo(() => getTools(t, language), [t, language]);
  const copy = UI[language] || UI.en;
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const storyRef = useRef(null);
  const markerRefs = useRef([]);
  const naturalRefs = useRef([]);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] });
  const curtain = useMotionValue(0);
  const [curtainState, setCurtainState] = useState({ toolIndex: 1, visible: false });
  const curtainStateRef = useRef(curtainState);
  const jumpingRef = useRef(false);
  const jumpAnimation = useRef(null);
  const activeMoment = STORY_STEPS[activeIndex];
  const activeTool = tools[activeMoment.toolIndex];
  const { chapter, item } = activeMoment;
  // Outgoing content recedes while the curtain rises; incoming content settles as it leaves.
  const depth = {
    y: useTransform(curtain, [0, 0.45, 0.55, 1], [0, -48, 48, 0]),
    scale: useTransform(curtain, [0, 0.45, 0.55, 1], [1, 0.965, 0.965, 1]),
    opacity: useTransform(curtain, CURTAIN_KEYS, [1, 0.2, 0.2, 1]),
  };

  const showCurtain = (toolIndex, visible) => {
    const current = curtainStateRef.current;
    if (current.toolIndex === toolIndex && current.visible === visible) return;
    curtainStateRef.current = { toolIndex, visible };
    setCurtainState(curtainStateRef.current);
  };

  useEffect(() => () => jumpAnimation.current?.stop(), []);

  useMotionValueEvent(scrollYProgress, 'change', () => {
    if (isModalOpen || !window.matchMedia?.(STORY_QUERY).matches) return;
    let next = activeIndexRef.current;
    const threshold = storyThreshold();
    while (next < STORY_STEPS.length - 1 && markerRefs.current[next + 1]?.getBoundingClientRect().top <= threshold) next += 1;
    while (next > 0 && markerRefs.current[next]?.getBoundingClientRect().top > threshold) next -= 1;
    if (next !== activeIndexRef.current) { activeIndexRef.current = next; setActiveIndex(next); }
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
      target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
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
      window.scrollTo({ top: window.scrollY + landing, behavior: 'instant' });
      jumpAnimation.current = animate(curtain, 1, {
        duration: 0.75, ease: CURTAIN_BEZIER,
        onComplete: () => { curtain.set(0); jumpingRef.current = false; showCurtain(toolIndex, false); },
      });
    });
  };
  const jumpNatural = (index) => naturalRefs.current[index]?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  const sceneCaption = chapter === 0 ? activeTool.detail.headline
    : chapter === 1 ? activeTool.detail.capabilities[item]?.desc : activeTool.detail.differentiators[item];
  const titleMain = (t?.arsenal?.sectionTitleMain || '*Arsenal*').replaceAll('*', '');
  return <section className={s.section} aria-labelledby="arsenal-heading">
    <div className={s.container}>
      <header className={s.sectionHeader}>
        <h2 id="arsenal-heading">{t?.arsenal?.sectionTitlePre || 'The'} <em>{titleMain}</em></h2>
        <p>{t?.arsenal?.sectionSubtitle}</p>
      </header>
    </div>
    <div ref={storyRef} className={s.scrollStory}>
      <div className={s.stickyScreen} style={{ '--tool-accent': activeTool.color }}>
        <div className={s.storyLeft}>
          <StoryNavigation tools={tools} activeMoment={activeMoment} onJump={jump} />
          <StoryNarrative tool={activeTool} moment={activeMoment} copy={copy} onJump={jump} depth={depth}
            onOpen={() => onOpenModal?.(activeTool.id, chapter)} />
        </div>
        <motion.div className={s.storyRight} style={depth}>
          <StagePanel tool={activeTool} chapter={chapter} step={activeIndex} caption={sceneCaption} reducedMotion={reducedMotion} />
          <div className={s.scrollProgress} aria-hidden="true">
            {tools.map((tool, index) => {
              const fill = index < activeMoment.toolIndex ? 1 : index > activeMoment.toolIndex ? 0 : (activeMoment.step + 1) / TOUR.length;
              return <span key={tool.id} className={s.progressSegment} style={{ '--segment-accent': tool.color }}>
                <i style={{ transform: `scaleX(${fill})` }} />
              </span>;
            })}
          </div>
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
      <nav className={s.naturalToolNav} aria-label={copy.select}>{tools.map((tool, index) => <button key={tool.id} type="button"
        className={`${s.glowControl} ${s.naturalToolButton}`} style={{ '--tool-accent': tool.color }}
        onClick={() => jumpNatural(momentIndex(index, 0))}>{tool.tool}<ArrowIcon diagonal /></button>)}</nav>
      {tools.map((tool, index) => <NaturalTool key={tool.id} tool={tool} toolIndex={index} copy={copy} reducedMotion={reducedMotion}
        registerMoment={(moment, node) => { naturalRefs.current[moment] = node; }} onOpen={onOpenModal} />)}
    </div>
  </section>;
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
  const reducedMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!tool || !mounted) return undefined;
    returnFocusRef.current = document.activeElement;
    const previous = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
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

  return createPortal(<motion.div className={s.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.32 }}>
    <motion.div ref={dialogRef} className={s.modal} style={{ '--tool-accent': tool.color }} role="dialog" aria-modal="true" aria-labelledby="arsenal-modal-title" tabIndex={-1}
      initial={reducedMotion ? false : { opacity: 0, y: 32, clipPath: 'inset(6% 3% 0% 3% round 16px)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, transition: { duration: 0.24, ease: EASE_OUT } }}
      transition={{ duration: reducedMotion ? 0 : 0.62, ease: EASE_OUT }}>
      <header className={s.modalHeader}>
        <div className={s.modalBrand}><span className={s.modalLogo}><img src={tool.logo} alt="" /></span><strong>{tool.tool}</strong></div>
        <button type="button" className={s.modalClose} onClick={onClose} aria-label={copy.close}><span aria-hidden="true">×</span></button>
      </header>
      <div ref={contentRef} className={s.modalScroll} onScroll={onModalScroll}>
        <div className={s.modalIntro}>
          <h2 id="arsenal-modal-title">{tool.detail.headline}</h2>
          <p className={s.modalLead}>{tool.detail.subheadline}</p>
          <p className={s.modalArchitecture}>{tool.architecture}</p>
          <p className={s.modalOutcome}><span>{tool.detail.roiMetric}</span> {tool.detail.roiLabel}</p>
        </div>
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
            <div className={s.modalEnd}><p>{copy.bookFor}</p><a href="#contact" onClick={onClose}>{copy.book}<ArrowIcon diagonal /></a></div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>, document.body);
}
