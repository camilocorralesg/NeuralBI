'use client';

import React, { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ACCEPTED, DECLINED, readConsent, saveConsent } from '../lib/consent';
import ShaderButton from './ShaderButton';
import s from './CookieBanner.module.css';

/**
 * The cookie notice. It says what the site measures, in one sentence, and the choice is honoured: declining stops the
 * anonymous analytics at once (components/ConsentAnalytics.jsx). Closing it with the × counts as declining.
 *
 * The server draws it for everyone and CSS shows it only on `html[data-consent='pending']`, which CONSENT_BOOTSTRAP
 * (lib/consent.js) sets before the first paint for a visitor who has not chosen. So it is on screen from the first
 * frame, rising in through CSS, instead of popping in after hydration; once hydrated, a visitor who already chose
 * drops it from the page.
 */
export default function CookieBanner() {
  const { t } = useLanguage();
  const copy = t?.cookieBanner || {};
  const reduced = useReducedMotion();
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (readConsent()) setIsOpen(false);
  }, []);

  const choose = (value) => {
    saveConsent(value);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.section
          className={s.banner}
          aria-labelledby={titleId}
          // The entrance is CSS (it plays before hydration); framer only takes the notice away.
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={s.head}>
            <p id={titleId} className={s.title}>{copy.title || 'Cookie-free analytics'}</p>
            <button type="button" className={s.close} onClick={() => choose(DECLINED)} aria-label={copy.closeAria || 'Close the cookie notice'}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <p className={s.text}>
            {copy.text || 'We measure, anonymously, which sections get read so we can improve the site. No advertising, no cross-site tracking. See the'}{' '}
            <Link href="/privacy">{copy.privacyLink || 'privacy policy'}</Link>.
          </p>
          <div className={s.actions}>
            <ShaderButton type="button" className={s.accept} onClick={() => choose(ACCEPTED)}>{copy.accept || 'Accept'}</ShaderButton>
            <button type="button" className={s.decline} onClick={() => choose(DECLINED)}>{copy.decline || 'Decline'}</button>
          </div>
        </m.section>
      )}
    </AnimatePresence>
  );
}
