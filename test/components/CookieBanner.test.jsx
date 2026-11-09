import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CookieBanner from '../../components/CookieBanner';
import ConsentAnalytics from '../../components/ConsentAnalytics';
import { LanguageProvider } from '../../context/LanguageContext';
import { analyticsAllowed, CONSENT_KEY } from '../../lib/consent';
import { translations } from '../../lib/translations';

// The analytics component, stubbed to hand over the filter it is given.
let beforeSend;
vi.mock('@vercel/analytics/next', () => ({ Analytics: (props) => { beforeSend = props.beforeSend; return null; } }));

const open = (language) => {
  if (language) localStorage.setItem('neuralbi_lang', language);
  const result = render(<LanguageProvider><CookieBanner /></LanguageProvider>);
  act(() => { vi.advanceTimersByTime(1100); });
  return result;
};

describe('Component: CookieBanner', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stays away once the visitor has chosen', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    open();
    expect(screen.queryByText('Cookie-free analytics')).not.toBeInTheDocument();
  });

  it('appears a second into a first visit and says what it measures, plainly', () => {
    render(<LanguageProvider><CookieBanner /></LanguageProvider>);
    expect(screen.queryByText('Cookie-free analytics')).not.toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1100); });

    const notice = screen.getByRole('region', { name: 'Cookie-free analytics' });
    expect(notice).toHaveTextContent(translations.en.cookieBanner.text);
    expect(screen.getByRole('link', { name: 'privacy policy' })).toHaveAttribute('href', '/privacy');
    // No eyebrow, no jargon, no title-case buttons.
    expect(notice.textContent).not.toMatch(/Telemetry|enterprise architecture|Accept All|Essential Only/i);
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
  });

  it('speaks Spanish with the site', () => {
    open('es');
    expect(screen.getByRole('region', { name: 'Analítica sin cookies' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aceptar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rechazar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'política de privacidad' })).toBeInTheDocument();
  });

  it('remembers an acceptance', () => {
    open();
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(localStorage.getItem(CONSENT_KEY)).toBe('accepted');
  });

  it('remembers a refusal, from the button or the ×', () => {
    open();
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));
    expect(localStorage.getItem(CONSENT_KEY)).toBe('essential');

    localStorage.clear();
    open();
    fireEvent.click(screen.getAllByRole('button', { name: 'Close the cookie notice' }).pop());
    expect(localStorage.getItem(CONSENT_KEY)).toBe('essential');
  });
});

describe('Analytics honour the choice', () => {
  beforeEach(() => { localStorage.clear(); });

  it('sends events until the visitor declines, and none after', () => {
    render(<ConsentAnalytics />);
    const event = { type: 'pageview', url: 'https://neuralnet.com.co/NeuralBI' };
    expect(analyticsAllowed()).toBe(true);
    expect(beforeSend(event)).toBe(event);
    localStorage.setItem(CONSENT_KEY, 'accepted');
    expect(beforeSend(event)).toBe(event);
    localStorage.setItem(CONSENT_KEY, 'essential');
    expect(analyticsAllowed()).toBe(false);
    expect(beforeSend(event)).toBeNull();
  });
});
