import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Footer from '../../components/sections/Footer';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

const expectedHrefs = [
  'https://learn.microsoft.com/en-us/power-bi/',
  'https://learn.microsoft.com/en-us/fabric/get-started/direct-lake-overview',
  'https://learn.microsoft.com/en-us/power-bi/guidance/',
  'https://learn.microsoft.com/en-us/power-apps/',
  'https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview',
  'https://learn.microsoft.com/en-us/power-apps/maker/',
  'https://learn.microsoft.com/en-us/power-automate/',
  'https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction',
  'https://learn.microsoft.com/en-us/power-automate/guidance/',
  'https://learn.microsoft.com/en-us/microsoft-copilot-studio/',
  'https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-gpt-overview',
  'https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-plugin-actions',
  '/privacy',
  '/terms',
  'mailto:automation@aineuralnet.onmicrosoft.com',
];

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

describe('Footer remix', () => {
  beforeEach(() => localStorage.clear());

  it('preserves all five link groups, URLs, logo, copyright and social links in both languages', () => {
    const { container } = render(
      <LanguageProvider>
        <LanguageSwitch />
        <Footer activeHero="remix" />
      </LanguageProvider>,
    );

    const footer = container.querySelector('footer');
    const assertContent = (locale) => {
      expect([...footer.querySelectorAll('.footer-link-group h4')].map((heading) => heading.textContent))
        .toEqual(Object.values(translations[locale].footer.columns));
      expect([...footer.querySelectorAll('.footer-link-group a')].map((link) => link.getAttribute('href')))
        .toEqual(expectedHrefs);
      expect(footer).toHaveTextContent(translations[locale].footer.copyright);
      expect(footer.querySelector('img[alt="NeuralBI Logo"]')).toHaveAttribute('src', '/NeuralBI/assets/Neuralbi logo.svg');
      expect(footer.querySelectorAll('.footer-lower-row a')).toHaveLength(2);
      expect(footer).toHaveTextContent('LinkedIn');
      expect(footer).toHaveTextContent('YouTube');
    };

    assertContent('en');
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    assertContent('es');
  });

  it('rises on a horizon with the NeuralBI mark seated on it and ends on the outlined signature, all decorative', () => {
    const { container } = render(<LanguageProvider><Footer activeHero="remix" /></LanguageProvider>);
    const footer = container.querySelector('footer');

    // The horizon arc, first thing in the footer.
    expect(footer.firstElementChild.tagName.toLowerCase()).toBe('svg');
    expect(footer.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    // The mark: the logo's own symbol, resolved (not armed) in the markup.
    const mark = footer.querySelector('[aria-hidden="true"] svg use')?.closest('[aria-hidden="true"]');
    expect(mark).toBeTruthy();
    expect(mark).not.toHaveAttribute('data-state');
    // The signature: NeuralBI in two tones, an outline in SVG text, drawn in the markup.
    const signature = footer.lastElementChild;
    expect(signature).toHaveAttribute('aria-hidden', 'true');
    expect(signature).toHaveTextContent('NeuralBI');
    expect([...signature.querySelectorAll('text tspan')].map(part => part.textContent)).toEqual(['Neural', 'BI']);
    expect(signature).not.toHaveAttribute('data-state');
    // The old slatted header is gone.
    expect(footer.querySelectorAll('.raycast-slat')).toHaveLength(0);
  });
});
