'use client';

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import NeuralMark from '../NeuralMark';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.css';

const logoUrl = '/NeuralBI/assets/Neuralbi logo.svg';

const reducedMotion = () => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

/**
 * The footer: it rises from the CTA on a wide horizon arc, with the NeuralBI mark seated on its apex, half over the
 * CTA, half over the footer, alive as a network. Below, the link columns and the legal row; at the very bottom the
 * NeuralBI signature, outlined in white and Volt, traced once the first time it is seen (drawn in the server's HTML).
 */
function Footer() {
  const { t } = useLanguage();
  const signatureRef = useRef(null);
  const [signature, setSignature] = useState(undefined);

  const copyrightText = t?.footer?.copyright || '© 2026 Copyright NeuralBI. All rights reserved.';

  const links = useMemo(() => {
    const footerCols = t?.footer?.columns || {};
    const footerLinks = t?.footer?.links || {};

    return {
      [footerCols.powerBi || 'Power BI']: [
        { name: footerLinks.powerBiDocs || 'Official Documentation', href: 'https://learn.microsoft.com/en-us/power-bi/', target: '_blank' },
        { name: footerLinks.directLake || 'Direct Lake Architecture', href: 'https://learn.microsoft.com/en-us/fabric/get-started/direct-lake-overview', target: '_blank' },
        { name: footerLinks.enterpriseData || 'Enterprise Data Guidance', href: 'https://learn.microsoft.com/en-us/power-bi/guidance/', target: '_blank' }
      ],
      [footerCols.powerApps || 'Power Apps']: [
        { name: footerLinks.powerAppsDocs || 'Official Documentation', href: 'https://learn.microsoft.com/en-us/power-apps/', target: '_blank' },
        { name: footerLinks.pcfReact || 'PCF Components & React', href: 'https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview', target: '_blank' },
        { name: footerLinks.modelDriven || 'Canvas & Model-Driven Apps', href: 'https://learn.microsoft.com/en-us/power-apps/maker/', target: '_blank' }
      ],
      [footerCols.powerAutomate || 'Power Automate']: [
        { name: footerLinks.powerAutomateDocs || 'Official Documentation', href: 'https://learn.microsoft.com/en-us/power-automate/', target: '_blank' },
        { name: footerLinks.headlessRpa || 'Headless RPA & Desktop', href: 'https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction', target: '_blank' },
        { name: footerLinks.cloudFlows || 'Cloud Flows Guidance', href: 'https://learn.microsoft.com/en-us/power-automate/guidance/', target: '_blank' }
      ],
      [footerCols.copilotStudio || 'Copilot Studio']: [
        { name: footerLinks.copilotDocs || 'Official Documentation', href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/', target: '_blank' },
        { name: footerLinks.genAi || 'Generative AI & GPT', href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-gpt-overview', target: '_blank' },
        { name: footerLinks.actionPlugins || 'Actions & Plug-ins', href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-plugin-actions', target: '_blank' }
      ],
      [footerCols.legal || 'Legal & Governance']: [
        { name: footerLinks.privacyPolicy || 'Privacy Policy', href: '/privacy' },
        { name: footerLinks.termsOfService || 'Terms of Service', href: '/terms' },
        { name: footerLinks.contactArchitects || 'Contact Architects', href: 'mailto:automation@aineuralnet.onmicrosoft.com' }
      ]
    };
  }, [t]);

  // The signature traces itself once, the first time it is seen, if it loaded off screen.
  useEffect(() => {
    const el = signatureRef.current;
    if (!el || typeof IntersectionObserver === 'undefined' || reducedMotion()) return undefined;
    let first = true;
    const observer = new IntersectionObserver(records => {
      const entry = records[records.length - 1];
      if (first) {
        first = false;
        if (entry.intersectionRatio > 0) { observer.disconnect(); return; }
        setSignature('armed');
        return;
      }
      if (entry.intersectionRatio < 0.35) return;
      setSignature('run');
      observer.disconnect();
    }, { threshold: [0, 0.35] });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className={styles.footer}>
      {/* The horizon the footer rises on, and the mark seated on its apex. */}
      <svg className={styles.horizon} viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="footer-horizon-rim" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".3" stopColor="#ffffff" stopOpacity=".14" />
            <stop offset=".5" stopColor="#c6ff34" stopOpacity=".75" />
            <stop offset=".7" stopColor="#ffffff" stopOpacity=".14" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className={styles.horizonFill} d="M0 140 C 360 140 520 1 720 1 C 920 1 1080 140 1440 140 L1440 141 L0 141 Z" />
        <path className={styles.horizonRim} d="M0 140 C 360 140 520 1 720 1 C 920 1 1080 140 1440 140" stroke="url(#footer-horizon-rim)" />
      </svg>
      <div className={styles.seat}>
        <span className={styles.halo} aria-hidden="true" />
        <NeuralMark className={styles.mark} />
      </div>

      <div className={styles.content}>
        <div className="footer-links-grid">
          {Object.keys(links).map(category => (
            <div key={category} className="footer-link-group">
              <h4 className={styles.heading}>{category}</h4>
              <ul className={styles.list}>
                {links[category].map(link => (
                  <li key={link.href}>
                    <a href={link.href} target={link.target || '_self'} rel="noopener noreferrer" className={styles.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`footer-lower-row ${styles.lowerRow}`}>
          <div className={`footer-brand-col ${styles.brand}`}>
            <img src={logoUrl} alt="NeuralBI Logo" className={styles.logo} />
            <span className={styles.copyright}>{copyrightText}</span>
          </div>
          <div className={styles.social}>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.link}>YouTube</a>
          </div>
        </div>
      </div>

      <div ref={signatureRef} className={styles.signatureBand} data-state={signature} aria-hidden="true">
        <svg className={styles.signature} viewBox="0 0 1000 260" focusable="false">
          <text x="500" y="252" textAnchor="middle">
            <tspan className={styles.neural}>Neural</tspan><tspan className={styles.bi}>BI</tspan>
          </text>
        </svg>
      </div>
    </footer>
  );
}

export default memo(Footer);
