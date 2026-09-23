'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import TrustBar from './sections/TrustBar';
import ArsenalExperience, { ArsenalDetailModal } from './sections/ArsenalExperience';
import Methodology from './sections/Methodology';
import IntegrationsHub from './sections/IntegrationsHub';
import Industries from './sections/Industries';
import Impact from './sections/Impact';
import CaseStudy from './sections/CaseStudy';
import Faq from './sections/Faq';
import FooterCTA from './sections/FooterCTA';
import Footer from './sections/Footer';
import StickyMobileCTA from './StickyMobileCTA';

export default function App() {
  const activeHero = 'remix';
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink)', backgroundColor: 'var(--color-paper)' }}>
      {/* Style-Specific Creative Navbar */}
      <Navbar activeHero={activeHero} />

      {/* Sticky Mobile CTA for high conversion */}
      <StickyMobileCTA />

      <main>
        {/* Hero Section */}
        <Hero activeHero={activeHero} />

        {/* Unified Continuous Background Wrapper for Content Sections */}
        <div style={{ position: 'relative' }}>
          {/* Fixed Background Layer */}
          <div className="bg-fallback" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -2,
            pointerEvents: 'none'
          }} />

          {/* Content Layer (Transparent) */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div id="manifesto">
              <Manifesto />
            </div>
            
            <div>
              <TrustBar activeHero={activeHero} />
            </div>
            
            <div id="arsenal">
              <ArsenalExperience isModalOpen={Boolean(selectedTool)} onOpenModal={(toolId, chapter) => setSelectedTool({ toolId, chapter })} />
            </div>
            
            <div id="protocol">
              <Methodology activeHero={activeHero} />
            </div>
            
            <div id="integrations">
              <IntegrationsHub activeHero={activeHero} />
            </div>
            
            <div id="verticals">
              <Industries activeHero={activeHero} />
            </div>
            <div>
              <Impact activeHero={activeHero} />
            </div>
            {/* 
            <div>
              <CaseStudy activeHero={activeHero} />
            </div> */}
            <div>
              <Faq activeHero={activeHero} />
            </div>
            
            <div id="contact">
              <FooterCTA activeHero={activeHero} />
            </div>
            <Footer activeHero={activeHero} />
          </div>
        </div>
        <AnimatePresence>
          {selectedTool && (
            <ArsenalDetailModal key={selectedTool.toolId} toolId={selectedTool.toolId} initialChapter={selectedTool.chapter} onClose={() => setSelectedTool(null)} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
