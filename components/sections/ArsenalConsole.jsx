'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import useEdgeSpotlight from '../useEdgeSpotlight';
import ArsenalScene from '../graphics/ArsenalScene';
import { useNear } from '../lazyModule';
import s from './ArsenalConsole.module.css';

const EASE_OUT = [0.16, 1, 0.3, 1];
// Damping ratio above .9: the indicators glide and settle without overshoot.
const INDICATOR_SPRING = { type: 'spring', stiffness: 440, damping: 40 };
// Scenes melt into each other through a 2px blur (the Arsenal's cross-fade), on full transform strings.
const sceneVariants = {
  enter: { opacity: 0, filter: 'blur(2px)', transform: 'scale(0.985)' },
  center: { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)', transition: { duration: 0.42, ease: EASE_OUT } },
  exit: { opacity: 0, filter: 'blur(2px)', transform: 'scale(1)', transition: { duration: 0.24, ease: EASE_OUT } },
};

function Dot() {
  return <span className={s.dot} aria-hidden="true" />;
}

// A chapter's copy. Every panel of every product is stacked in one grid cell, so the console keeps the height of the
// longest one and never jumps; only the active panel is visible, read and focusable.
function ChapterCopy({ tool, chapter }) {
  if (chapter === 0) {
    return <>
      <p className={s.lead}>{tool.body}</p>
      <p className={s.outcome}><strong>{tool.detail.roiMetric}</strong><span>{tool.detail.roiLabel}</span></p>
      <ul className={s.chips}>{tool.pills.map((pill) => <li key={pill.label}><Dot />{pill.label}</li>)}</ul>
    </>;
  }
  if (chapter === 1) {
    return <ul className={s.capabilities}>
      {tool.detail.capabilities.map((entry) => <li key={entry.label}><strong>{entry.label}</strong><span>{entry.desc}</span></li>)}
    </ul>;
  }
  return <ul className={s.claims}>{tool.detail.differentiators.map((entry) => <li key={entry}><Dot />{entry}</li>)}</ul>;
}

/**
 * The Arsenal on desktop: one product console. The rail lists the four products; the chapter control switches between
 * the proposition, the capabilities and the difference; the title, the control and the chapter's copy stack on the
 * left, and the scene holds the whole right column. Nothing moves with
 * the scroll: the visitor picks a product and a chapter, by pointer or keyboard (an ARIA tab pattern: the arrows along
 * the rail for products, ← → for chapters, Home and End), and the chapter stays put across products so they can be compared.
 * The console takes the active product's colour; a fine pointer lights its edge where it is.
 */
export default function ArsenalConsole({ tools, copy, className = '' }) {
  const [toolIndex, setToolIndex] = useState(0);
  const [chapter, setChapter] = useState(0);
  const consoleRef = useRef(null);
  const toolTabs = useRef([]);
  const chapterTabs = useRef([]);
  useEdgeSpotlight(consoleRef);
  // The scenes arrive as the console comes within a screen (never below 1024px, where the console is not displayed).
  const near = useNear(consoleRef);
  const tool = tools[toolIndex];
  const chapters = [copy.vision, copy.capabilities, copy.differentiators];

  // Arrow keys move the selection and the focus together (tabs with automatic activation).
  const keyed = (count, current, select, refs, previous, next) => (event) => {
    const step = previous.includes(event.key) ? -1 : next.includes(event.key) ? 1 : 0;
    let target = null;
    if (step) target = (current + step + count) % count;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = count - 1;
    if (target === null) return;
    event.preventDefault();
    select(target);
    refs.current[target]?.focus();
  };

  return <div ref={consoleRef} className={`${s.console} ${className}`.trim()} style={{ '--tool-accent': tool.color }} data-tool={tool.id}>
    {/* A column beside the product on wide screens, a bar above it on narrower ones: both arrow pairs move along it. */}
    <div className={s.rail} role="tablist" aria-label="Arsenal"
      onKeyDown={keyed(tools.length, toolIndex, setToolIndex, toolTabs, ['ArrowUp', 'ArrowLeft'], ['ArrowDown', 'ArrowRight'])}>
      {tools.map((entry, index) => {
        const selected = index === toolIndex;
        return <button key={entry.id} ref={(node) => { toolTabs.current[index] = node; }} type="button" role="tab"
          id={`arsenal-tool-${entry.id}`} aria-controls="arsenal-console-panel" aria-selected={selected} tabIndex={selected ? 0 : -1}
          className={s.railTab} style={{ '--own-accent': entry.color }} onClick={() => setToolIndex(index)}>
          {selected && <m.span layoutId="arsenal-console-rail" className={s.railIndicator} transition={INDICATOR_SPRING} aria-hidden="true" />}
          <span className={s.railLogo}><img src={entry.logo} alt="" width="96" height="96" loading="lazy" decoding="async" /></span>
          <span className={s.railName}>{entry.tool}</span>
        </button>;
      })}
    </div>

    <div className={s.main} role="tabpanel" id="arsenal-console-panel" aria-labelledby={`arsenal-tool-${tool.id}`}>
      <div className={s.head}>
        <div className={s.titles}>
          {tools.map((entry, index) => {
            const active = index === toolIndex;
            return <h3 key={entry.id} className={s.title} data-active={active} aria-hidden={!active || undefined}>{entry.title}</h3>;
          })}
        </div>
        <div className={s.chapters} role="tablist" aria-label={`${tool.tool}: ${copy.modalNav}`}
          onKeyDown={keyed(chapters.length, chapter, setChapter, chapterTabs, ['ArrowLeft'], ['ArrowRight'])}>
          {chapters.map((label, index) => {
            const selected = index === chapter;
            return <button key={label} ref={(node) => { chapterTabs.current[index] = node; }} type="button" role="tab"
              id={`arsenal-chapter-${index}`} aria-controls="arsenal-chapter-panel" aria-selected={selected} tabIndex={selected ? 0 : -1}
              className={s.chapterTab} onClick={() => setChapter(index)}>
              {selected && <m.span layoutId="arsenal-console-chapter" className={s.chapterThumb} transition={INDICATOR_SPRING} aria-hidden="true" />}
              {label}
            </button>;
          })}
        </div>
      </div>

      <div className={s.copy} role="tabpanel" id="arsenal-chapter-panel" aria-labelledby={`arsenal-chapter-${chapter}`}>
        {tools.map((entry, index) => [0, 1, 2].map((part) => {
          const active = index === toolIndex && part === chapter;
          return <div key={`${entry.id}-${part}`} className={s.panel} data-active={active}
            aria-hidden={!active || undefined} inert={!active || undefined}>
            <ChapterCopy tool={entry} chapter={part} />
          </div>;
        }))}
      </div>
      <div className={s.stage} data-scene={`${tool.id}-${chapter}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          <m.div key={`${tool.id}-${chapter}`} className={s.scene} variants={sceneVariants} initial="enter" animate="center" exit="exit">
            <ArsenalScene toolId={tool.id} chapter={chapter} wanted={near} />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  </div>;
}
