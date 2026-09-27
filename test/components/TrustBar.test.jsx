import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import TrustBar from '../../components/sections/TrustBar';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

beforeEach(() => { window.localStorage.removeItem('neuralbi_lang'); });

describe('TrustBar marquee', () => {
  it('is read once: the copy that closes the loop is hidden from assistive technology', () => {
    const { container } = render(<LanguageProvider><TrustBar /></LanguageProvider>);
    const rows = container.querySelectorAll('ul');
    expect(rows).toHaveLength(2);
    expect(rows[0].hasAttribute('aria-hidden')).toBe(false);
    expect(rows[1]).toHaveAttribute('aria-hidden', 'true');
    expect(rows[1].textContent).toBe(rows[0].textContent);
    const items = translations.en.trustBar.items;
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(items);
  });

  it('switches its capabilities to Spanish', () => {
    render(<LanguageProvider><LanguageSwitch /><TrustBar /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(translations.es.trustBar.items);
  });
});
