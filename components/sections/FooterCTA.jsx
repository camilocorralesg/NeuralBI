'use client';
import React, { memo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import CharacterReveal from '../CharacterReveal';
import EdgeBeam from '../EdgeBeam';
import useEdgeSpotlight from '../useEdgeSpotlight';
import ShaderButton from '../ShaderButton';
import SectionAtmosphere from '../SectionAtmosphere';
import { useLanguage } from '../../context/LanguageContext';
import s from './FooterCTA.module.css';
import Reveal from '../Reveal';
import { wordsIn } from '../revealTiming';

const isEmailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

function SuccessState({ onReset }) {
  const { t } = useLanguage();
  const successData = t?.footerCta?.success || {
    headline: 'Ball is in our court.',
    body: 'We got your message and we’re on it. Someone from the team will review the details and reach out shortly to talk next steps.',
    resetBtn: 'Send another inquiry'
  };

  return (
    <motion.div
      className={s.success}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={s.check} aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M20 6L9 17L4 12" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
        </svg>
      </span>
      <h3 className={s.successTitle}>{successData.headline}</h3>
      <p className={s.successBody}>{successData.body}</p>
      <ShaderButton type="button" onClick={onReset}>{successData.resetBtn}</ShaderButton>
    </motion.div>
  );
}

/**
 * The closing call to action ("You already have the data. Now, make it think."): one glass panel whose edge carries
 * the travelling beam, over a still Volt atmosphere. On the left the promise; on the right the lead form, sent to
 * /api/lead, with its Fluid Glass submit lit once the form can be sent.
 */
function FooterCTA() {
  const router = useRouter();
  const { t } = useLanguage();
  const cta = t?.footerCta || {};
  const ctaErrors = cta.errors || {};
  const panel = useRef(null);
  useEdgeSpotlight(panel);

  const headlinePart1 = cta.headlinePart1 || 'You already have the data.';
  const headlinePart2 = cta.headlinePart2 || '*Now, make it think.*';
  const subtitleText = cta.subtitle || 'Stop relying on gut feelings and legacy IT. Partner with NeuralBI and transform your Microsoft ecosystem into a cognitive engine today.';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const getFieldError = (field, value) => {
    if (field === 'name' && !value.trim()) return ctaErrors.nameRequired || 'Please enter your full name.';
    if (field === 'email') {
      if (!value.trim()) return ctaErrors.emailRequired || 'Work email address is required.';
      if (!isEmailValid(value)) return ctaErrors.emailInvalid || 'Please enter a valid work email (e.g. name@company.com).';
    }
    if (field === 'message' && !value.trim()) return ctaErrors.messageRequired || 'Please tell us what you would like to explore or optimize.';
    return '';
  };

  const errors = {
    name: touched.name ? getFieldError('name', formData.name) : '',
    email: touched.email ? getFieldError('email', formData.email) : '',
    message: touched.message ? getFieldError('message', formData.message) : '',
  };
  const isFormValid = formData.name.trim() !== '' && isEmailValid(formData.email) && formData.message.trim() !== '';

  const handleBlur = field => setTouched(prev => ({ ...prev, [field]: true }));
  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        router.push('/thank-you');
      } else {
        setErrorMessage(data.error || ctaErrors.submitFailed || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      setErrorMessage(ctaErrors.networkError || 'Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
    setTouched({ name: false, email: false, message: false });
    setErrorMessage(null);
  };

  const fields = [
    { name: 'name', id: 'name-sui', type: 'text', autoComplete: 'name', label: cta.nameLabel || 'Name', placeholder: cta.namePlaceholder || 'e.g. Alex Morgan' },
    { name: 'email', id: 'email-sui', type: 'email', autoComplete: 'email', label: cta.emailLabel || 'Work Email', placeholder: cta.emailPlaceholder || 'e.g. alex@company.com' },
    { name: 'message', id: 'msg-sui', label: cta.messageLabel || 'What do you want to explore?', placeholder: cta.messagePlaceholder || 'e.g. Migrating legacy reporting to Power BI Direct Lake or building an autonomous Copilot agent...' },
  ];

  return (
    <section id="audit" className={s.section} aria-labelledby="audit-heading">
      <SectionAtmosphere focus="28% 52%" secondaryFocus="84% 72%" />
      <div className={s.light} aria-hidden="true" />
      <div className={s.inner}>
        <div ref={panel} className={s.panel}>
          <EdgeBeam />

          <div className={s.intro}>
            <h2 id="audit-heading" className={s.title}>
              <CharacterReveal text={headlinePart1} style={{ display: 'block' }} />
              <CharacterReveal text={headlinePart2} delay={wordsIn(headlinePart1)} style={{ display: 'block' }} />
            </h2>
            <Reveal as="p" className={s.subtitle} delay={280}>{subtitleText}</Reveal>
          </div>

          <Reveal variant="block" delay={200} amount={0.15} className={s.formSide}>
            {submitted ? (
              <SuccessState onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate className={s.form}>
                {fields.map(field => {
                  const error = errors[field.name];
                  const errorId = `${field.id}-error`;
                  const shared = {
                    id: field.id,
                    name: field.name,
                    value: formData[field.name],
                    onChange: handleChange,
                    onBlur: () => handleBlur(field.name),
                    placeholder: field.placeholder,
                    required: true,
                    'aria-invalid': Boolean(error),
                    'aria-describedby': error ? errorId : undefined,
                    className: s.input,
                  };
                  return (
                    <div key={field.name} className={s.field}>
                      <label htmlFor={field.id} className={s.label}>{field.label}</label>
                      {field.name === 'message'
                        ? <textarea {...shared} rows={3} />
                        : <input {...shared} type={field.type} autoComplete={field.autoComplete} />}
                      {error && <span id={errorId} className={s.error}>{error}</span>}
                    </div>
                  );
                })}

                {errorMessage && <div className={s.formError} role="alert">{errorMessage}</div>}
                <ShaderButton
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  ready={isFormValid && !isSubmitting}
                  className={s.submit}
                >
                  {isSubmitting ? (cta.submittingBtn || 'Transmitting...') : (
                    <>
                      {cta.submitBtn || 'Book an Architecture Audit'}
                      <span className={s.enter} aria-hidden="true">↵</span>
                    </>
                  )}
                </ShaderButton>
                {cta.confidentialNote && (
                  <p className={s.note}><Lock size={13} strokeWidth={2} aria-hidden="true" />{cta.confidentialNote}</p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default memo(FooterCTA);
