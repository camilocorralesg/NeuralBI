'use client';

import React, { useState } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import TrustBar from './sections/TrustBar';
import Arsenal, { ToolDetailModal } from './sections/Arsenal';
import Methodology from './sections/Methodology';
import IntegrationsHub from './sections/IntegrationsHub';
import Industries from './sections/Industries';
import Impact from './sections/Impact';
import CaseStudy from './sections/CaseStudy';
import Faq from './sections/Faq';
import FooterCTA from './sections/FooterCTA';
import Footer from './sections/Footer';



export default function App() {
  const activeHero = 'remix';
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)', backgroundColor: 'var(--color-paper)' }}>
      {/* Style-Specific Creative Navbar */}
      <Navbar activeHero={activeHero} />

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
              <Manifesto activeHero={activeHero} />
            </div>
            
            <div>
              <TrustBar activeHero={activeHero} />
            </div>
            
            <div id="arsenal">
              <Arsenal activeHero={activeHero} onOpenModal={(tool) => setSelectedTool(tool)} />
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
        {selectedTool && (
          <ToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
        )}
      </main>
    </div>
  );
}
