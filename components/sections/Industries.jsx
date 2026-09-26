'use client';

/* Hallmark · pre-emit critique: P4 H5 E4 S5 R4 V5
 * Component-scope · NeuralBI tokens · architecture explorer */
import React, { memo, useId, useRef, useState } from 'react';
import { ArrowUpRight, Box, Landmark, Factory, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionAtmosphere from '../SectionAtmosphere';
import ShaderButton from '../ShaderButton';
import IndustryArchitecture from '../graphics/IndustryArchitecture';
import s from './Industries.module.css';
import CharacterReveal from '../CharacterReveal';
import Reveal from '../Reveal';
import { wordsIn } from '../revealTiming';

const icons = [Box, Landmark, Factory, ShoppingBag];
const labels = {
  en: {
    tabs: ['Supply chain', 'Financial services', 'Manufacturing', 'Retail & commerce'],
    choose: 'Explore an industry', solutions: 'Explore the architecture',
    caption: 'One connected architecture. Built around your industry.',
    cta: 'Design your architecture', note: 'Your industry. Your operating advantage.',
  },
  es: {
    tabs: ['Logística', 'Servicios financieros', 'Manufactura', 'Retail y comercio'],
    choose: 'Explora un sector', solutions: 'Explora la arquitectura',
    caption: 'Una arquitectura conectada. Diseñada para tu sector.',
    cta: 'Diseña tu arquitectura', note: 'Tu sector. Tu ventaja operativa.',
  },
};

function Industries() {
  const { t, language } = useLanguage();
  const copy = labels[language] || labels.en;
  const [active, setActive] = useState(0);
  const [solution, setSolution] = useState(0);
  const tabRefs = useRef([]);
  const uid = useId();
  const industries = t.verticals.industries;
  const industry = industries[active];
  const [before, emphasis, after] = t.verticals.sectionTitle.split(/\*([^*]+)\*/);

  function selectIndustry(index) {
    setActive(index);
    setSolution(0);
  }

  function onTabKey(event, index) {
    const moves = { ArrowRight: 1, ArrowLeft: -1 };
    let next;
    if (event.key in moves) next = (index + moves[event.key] + industries.length) % industries.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = industries.length - 1;
    else return;
    event.preventDefault();
    selectIndustry(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section className={s.section} aria-labelledby={`${uid}-heading`}>
      <SectionAtmosphere focus="76% 52%" secondaryFocus="90% 70%" strength={0.55} />
      <div className={s.container}>
        <header className={s.header}>
          <h2 id={`${uid}-heading`} className={s.title}>
            <CharacterReveal text={`${before}`.trim()} style={{ display: 'block' }} />
            <CharacterReveal text={`*${emphasis}*${after}`} delay={wordsIn(before)} style={{ display: 'block' }} />
          </h2>
        </header>

        {/* The selected look is a second copy of the tabs, drawn lit and clipped to the selected cell. The clip slides
            between cells, so the colour change travels with it instead of cross-fading two tabs. */}
        <Reveal variant="block" delay={180} className={s.tabsWrap} style={{ '--i': active, '--col': active % 2, '--row': Math.floor(active / 2) }}>
          <div className={s.tabs} role="tablist" aria-label={copy.choose}>
            {industries.map((item, index) => {
              const Icon = icons[index];
              return <button key={item.id} type="button" role="tab" id={`${uid}-tab-${index}`}
                aria-controls={`${uid}-panel-${index}`} aria-selected={active === index}
                tabIndex={active === index ? 0 : -1} ref={node => { tabRefs.current[index] = node; }}
                onClick={() => selectIndustry(index)} onKeyDown={event => onTabKey(event, index)} className={s.tab}>
                <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                <span>{copy.tabs[index]}</span><span className={s.tabDot} aria-hidden="true" />
              </button>;
            })}
          </div>
          <div className={`${s.tabs} ${s.tabsLit}`} aria-hidden="true">
            {industries.map((item, index) => {
              const Icon = icons[index];
              return <span key={item.id} className={s.tab}>
                <Icon size={19} strokeWidth={1.5} />
                <span>{copy.tabs[index]}</span><span className={s.tabDot} />
              </span>;
            })}
          </div>
        </Reveal>

        <Reveal variant="block" delay={280} amount={0.1}>
        {industries.map((item, index) => <div key={item.id} id={`${uid}-panel-${index}`} role="tabpanel"
          aria-labelledby={`${uid}-tab-${index}`} hidden={active !== index} tabIndex={0} className={s.panel}>
          {active === index && <>
            <div className={s.story} key={industry.id}>
              <p className={s.industryName}>{industry.title}</p>
              <h3 className={s.headline}>{industry.headlineTitle}</h3>
              <p className={s.description}>{industry.headlineBody}</p>
              <div className={s.solutions} role="group" aria-label={copy.solutions}>
                {industry.cards.map((card, cardIndex) => {
                  const expanded = solution === cardIndex;
                  return <div className={s.solution} data-selected={expanded} key={card.title}>
                    <h4><button type="button" className={s.solutionButton} aria-expanded={expanded}
                      aria-controls={`${uid}-solution-${index}-${cardIndex}`} id={`${uid}-trigger-${index}-${cardIndex}`}
                      onClick={() => setSolution(expanded ? null : cardIndex)}>
                      <span>{card.title}</span>
                      {expanded ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                    </button></h4>
                    <div id={`${uid}-solution-${index}-${cardIndex}`} role="region"
                      aria-labelledby={`${uid}-trigger-${index}-${cardIndex}`} hidden={!expanded} className={s.solutionBody}>
                      <span className={s.technology}>{card.tag}</span>
                      <p>{card.body}</p>
                    </div>
                  </div>;
                })}
              </div>
            </div>
            <figure className={s.visual}>
              <IndustryArchitecture industry={industry.id} solution={solution} language={language} />
              <figcaption className={s.caption}>
                <span className={s.captionMark} aria-hidden="true">↳</span>
                <span>{copy.caption}</span>
              </figcaption>
            </figure>
          </>}
        </div>)}
        </Reveal>
        <footer className={s.footer}>
          <p>{copy.note}</p>
          <ShaderButton href="#contact" className={s.cta}>{copy.cta}<ArrowUpRight size={19} aria-hidden="true" /></ShaderButton>
        </footer>
      </div>
    </section>
  );
}

export default memo(Industries);
