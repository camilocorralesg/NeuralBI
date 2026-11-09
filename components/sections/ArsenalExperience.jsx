'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import ENGLISH from '../../lib/translations.en';
import CharacterReveal from '../CharacterReveal';
import ShaderButton from '../ShaderButton';
import ArsenalScene from '../graphics/ArsenalScene';
import s from './ArsenalExperience.module.css';
import useReducedMotionSafe from '../useReducedMotionSafe';
import useTapAnchor from '../useTapAnchor';
import Reveal from '../Reveal';
import ArsenalConsole from './ArsenalConsole';
import { lockScroll, scrollToTarget, unlockScroll } from '../../lib/smoothScroll';

const TOOL_CONFIG = [
  {
    id: 'power-bi', key: 'powerBi', color: '#f2c811',
    logo: '/NeuralBI/assets/New_Power_BI_Logo.svg',
    sceneNames: { en: ['Executive adoption', 'AI narrative', 'Semantic architecture'], es: ['Adopción ejecutiva', 'Narrativa con IA', 'Arquitectura semántica'] },
  },
  {
    id: 'power-apps', key: 'powerApps', color: '#e7a2cd',
    logo: '/NeuralBI/PowerPlatform Icons/PowerApps_scalable.svg',
    sceneNames: { en: ['Three paradigms', 'Pro-code engine', 'Dataverse mesh'], es: ['Tres paradigmas', 'Motor pro-code', 'Malla Dataverse'] },
  },
  {
    id: 'power-automate', key: 'powerAutomate', color: '#9bc5ec',
    logo: '/NeuralBI/PowerPlatform Icons/PowerAutomate_scalable.svg',
    sceneNames: { en: ['Self-healing flow', 'Event-driven mesh', 'Resilient delivery'], es: ['Flujo autocorrectivo', 'Malla de eventos', 'Entrega resiliente'] },
  },
  {
    id: 'copilot-studio', key: 'copilotStudio', color: '#a2d8c1',
    logo: '/NeuralBI/PowerPlatform Icons/CopilotStudio_scalable.svg',
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
    vision: 'The proposition', capabilities: 'Capabilities', differentiators: 'The difference',
    details: 'Explore full architecture',
    close: 'Close architecture', collapse: 'Close', included: 'Technical foundations',
    modalNav: 'Explore the architecture',
    modalCapabilities: 'Built for the way teams work', modalDifferentiators: 'Engineered to go further',
    book: 'Book a Call', bookFor: 'Discuss this architecture',
  },
  es: {
    vision: 'La propuesta', capabilities: 'Capacidades', differentiators: 'La diferencia',
    details: 'Explorar arquitectura completa',
    close: 'Cerrar arquitectura', collapse: 'Cerrar', included: 'Fundamentos técnicos',
    modalNav: 'Explorar la arquitectura',
    modalCapabilities: 'Diseñado para la forma de trabajar de su equipo', modalDifferentiators: 'Ingeniería que va más lejos',
    book: 'Agendar Llamada', bookFor: 'Conversemos sobre esta arquitectura',
  },
};

function getTools(t, language) {
  const source = t?.arsenal || ENGLISH.arsenal;
  return TOOL_CONFIG.map((config) => {
    const card = source.tools?.[config.key] || ENGLISH.arsenal.tools[config.key];
    const detail = source.modalDetails?.[config.id] || ENGLISH.arsenal.modalDetails[config.id];
    const translatedPills = source.pills?.[config.id] || [];
    const pills = EN_PILLS[config.id].map((pill, index) => {
      const label = translatedPills[index]?.label || pill.label;
      return { label: label.replace(/ 2\.0$/, '').replace(/^Más de 1\.000 /, '') };
    });
    return { ...config, ...card, detail, pills, sceneLabels: config.sceneNames[language] || config.sceneNames.en };
  });
}

// Below this width the Arsenal is an accordion of the four products; above it, the console. Keep in sync with the CSS.
const ACCORDION_QUERY = '(max-width: 1023px)';
// Where an opened product settles: just under the navbar's capsule.
const ROW_SETTLE = 88;
// This component also renders on the server, where useLayoutEffect warns.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const EASE_OUT = [0.16, 1, 0.3, 1];

function ArrowIcon({ diagonal = false }) {
  return diagonal
    ? <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    : <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Graphic({ tool, chapter }) {
  return <ArsenalScene toolId={tool.id} chapter={chapter} />;
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

/**
 * One product below 1024px: a row of an accordion: the product's face (logo, name, promise) is the trigger,
 * and the whole product (its proposition, capabilities and difference, each with its scene) unfolds under it. The CSS
 * sets both forms from the server's HTML (closed rows below 1024px), so nothing jumps when the script arrives; the
 * script only adds the button, the open state and the anchoring.
 */
function NaturalTool({ tool, toolIndex, copy, onOpen, reducedMotion, compact, open, onToggle, onCollapse, triggerRef }) {
  const chapters = [copy.vision, copy.capabilities, copy.differentiators];
  const reveal = { viewport: { once: true, amount: 0.5 }, transition: { duration: 0.8, ease: EASE_OUT } };
  // Scenes of a product that was never opened are never built; once built, they stay (so closing never jumps).
  const [visited, setVisited] = useState(false);
  useEffect(() => { if (open) setVisited(true); }, [open]);
  const scenes = !compact || visited;
  const panelId = `arsenal-natural-${tool.id}-panel`;
  const triggerId = `arsenal-natural-${tool.id}-trigger`;
  const collapsed = compact && !open;
  const heading = (chapter) => <h4>{chapters[chapter]}</h4>;
  const graphic = (chapter) => (scenes ? <LazyGraphic tool={tool} chapter={chapter} /> : <div className={s.naturalGraphic} />);
  const meta = <strong>{tool.tool}</strong>;
  const toggle = <span className={s.rowToggle} aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M8 3v10M3 8h10" /></svg></span>;

  return <Reveal as="article" variant="block" delay={compact ? toolIndex * 80 : 0} amount={0.2} id={`arsenal-natural-${tool.id}`}
    className={s.naturalTool} data-open={compact ? open : undefined} style={{ '--tool-accent': tool.color }}>
    {/* In the accordion the rule belongs to the open state (CSS); in the long article it draws itself once in view. */}
    {compact
      ? <span className={s.naturalToolRule} aria-hidden="true" />
      : <m.span className={s.naturalToolRule} aria-hidden="true" initial={reducedMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} {...reveal} />}
    {compact
      ? <h3 className={s.rowHeading}>
          <button ref={triggerRef} id={triggerId} type="button" className={`${s.naturalToolHeader} ${s.rowTrigger}`}
            aria-expanded={open} aria-controls={panelId} onClick={(event) => onToggle(event, toolIndex)}>
            <span className={s.productLogo}><img src={tool.logo} alt="" width="96" height="96" loading="lazy" decoding="async" /></span>
            <span className={s.rowText}><span className={s.naturalMeta}>{meta}</span><span className={s.rowTitle}>{tool.title}</span></span>
            {toggle}
          </button>
        </h3>
      : <m.header className={s.naturalToolHeader} initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} {...reveal}>
          <span className={s.productLogo}><img src={tool.logo} alt="" width="96" height="96" loading="lazy" decoding="async" /></span>
          <div className={s.rowText}>
            <p className={s.naturalMeta}>{meta}</p>
            <h3 className={s.rowTitle}>{tool.title}</h3>
          </div>
          {toggle}
        </m.header>}
    <div id={panelId} className={s.rowPanel} role={compact ? 'region' : undefined} aria-labelledby={compact ? triggerId : undefined}
      aria-hidden={collapsed || undefined} inert={collapsed || undefined}>
      <div className={s.rowClip}>
        <div className={s.rowInner}>
          <section className={s.naturalChapter}>
            <div className={s.naturalCopy}>{heading(0)}<p>{tool.body}</p>
              <p className={s.propositionOutcome}><strong>{tool.detail.roiMetric}</strong><span>{tool.detail.roiLabel}</span></p>
              <ul className={s.chipGrid}>{tool.pills.map((pill) => <li key={pill.label}>{pill.label}</li>)}</ul>
            </div>{graphic(0)}
          </section>
          {[1, 2].map((chapter) => <section key={chapter} className={s.naturalChapter}>
            <div className={s.naturalCopy}>{heading(chapter)}<ul className={s.naturalEntries}>
              {(chapter === 1 ? tool.detail.capabilities : tool.detail.differentiators).map((entry) => <li key={chapter === 1 ? entry.label : entry}>
                <strong>{chapter === 1 ? entry.label : entry}</strong>{chapter === 1 && <p>{entry.desc}</p>}
              </li>)}
            </ul></div>{graphic(chapter)}
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

/**
 * The Arsenal. On desktop (1024px and up) one product console (ArsenalConsole): the visitor picks a product and a
 * chapter, and the scroll passes straight through. Below 1024px the four products are an accordion (NaturalTool), whose
 * end opens the full architecture (ArsenalDetailModal). Both are in the server's HTML; the CSS shows one.
 */
export default function ArsenalExperience({ onOpenModal }) {
  const { t, language } = useLanguage();
  const tools = useMemo(() => getTools(t, language), [t, language]);
  const copy = UI[language] || UI.en;
  const reducedMotion = useReducedMotionSafe();
  const triggerRefs = useRef([]);
  // Below 1024px the Arsenal is an accordion. Known after mount; the CSS already shows closed rows before that.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const media = window.matchMedia?.(ACCORDION_QUERY);
    if (!media) return undefined;
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
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
  return <section className={s.section} aria-labelledby="arsenal-heading">
    <div className={s.container}>
      <header className={s.sectionHeader}>
        <h2 id="arsenal-heading"><CharacterReveal text={t?.arsenal?.sectionTitle || 'Power Platform services'} /></h2>
        <p>{t?.arsenal?.sectionSubtitle}</p>
      </header>
      <ArsenalConsole tools={tools} copy={copy} />
    </div>
    <div className={`${s.container} ${s.naturalExperience}`}>
      <div className={s.naturalList}>
        {tools.map((tool, index) => <NaturalTool key={tool.id} tool={tool} toolIndex={index} copy={copy} reducedMotion={reducedMotion}
          onOpen={onOpenModal} compact={compact} open={openTool === index} onToggle={toggleTool} onCollapse={collapseTool}
          triggerRef={(node) => { triggerRefs.current[index] = node; }} />)}
      </div>
    </div>
  </section>;
}

// The intro lines rise out of their own masks once the panel has begun to open.
const introVariants = { hidden: {}, shown: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } } };
const introLineVariants = { hidden: { y: '110%' }, shown: { y: '0%', transition: { duration: 0.62, ease: EASE_OUT } } };
function ModalLine({ children }) {
  return <div className={s.modalMask}><m.div variants={introLineVariants}>{children}</m.div></div>;
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
    // The modal opens from the accordion (touch layouts), which needs both <body> and <html> locked.
    document.body.style.overflow = 'hidden';
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
  return createPortal(<m.div className={s.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.32, ease: EASE_OUT } }}
    transition={{ duration: reducedMotion ? 0 : 0.32 }}>
    <m.div ref={dialogRef} className={s.modal} style={{ '--tool-accent': tool.color }} role="dialog" aria-modal="true" aria-labelledby="arsenal-modal-title" tabIndex={-1}
      initial={reducedMotion ? false : { opacity: 0, y: 32, clipPath: 'inset(6% 3% 0% 3% round 16px)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, clipPath: 'inset(4% 2% 0% 2% round 16px)', transition: { duration: 0.28, ease: EASE_OUT } }}
      transition={{ duration: reducedMotion ? 0 : 0.62, ease: EASE_OUT }}>
      <header className={s.modalHeader}>
        <div className={s.modalBrand}><span className={s.modalLogo}><img src={tool.logo} alt="" width="96" height="96" loading="lazy" decoding="async" /></span><strong>{tool.tool}</strong></div>
        <button type="button" className={s.modalClose} onClick={onClose} aria-label={copy.close}><span aria-hidden="true">×</span></button>
      </header>
      <div ref={contentRef} className={s.modalScroll} onScroll={onModalScroll} data-lenis-prevent="">
        <m.div className={s.modalIntro} variants={introVariants} initial={reducedMotion ? false : 'hidden'} animate="shown">
          <ModalLine><h2 id="arsenal-modal-title">{tool.detail.headline}</h2></ModalLine>
          <ModalLine><p className={s.modalLead}>{tool.detail.subheadline}</p></ModalLine>
          <ModalLine><p className={s.modalOutcome}><span>{tool.detail.roiMetric}</span> {tool.detail.roiLabel}</p></ModalLine>
        </m.div>
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
    </m.div>
  </m.div>, document.body);
}
