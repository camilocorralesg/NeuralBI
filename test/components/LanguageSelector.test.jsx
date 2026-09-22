import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import LanguageSelector from '../../components/LanguageSelector';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';

function TestConsumer() {
  const { language } = useLanguage();
  return <div data-testid="current-lang">{language}</div>;
}

describe('Component: LanguageSelector', () => {
  beforeEach(() => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
  });

  it('renders with current language badge and accessible label', () => {
    render(
      <LanguageProvider defaultLang="en">
        <LanguageSelector />
        <TestConsumer />
      </LanguageProvider>
    );

    expect(screen.getByText('EN')).toBeDefined();
    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    const trigger = screen.getByRole('button', { name: /Select language/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens dropdown on click and displays language options', () => {
    render(
      <LanguageProvider defaultLang="en">
        <LanguageSelector />
      </LanguageProvider>
    );

    const trigger = screen.getByRole('button', { name: /Select language/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByText('Español')).toBeDefined();
    expect(screen.getByText('English')).toBeDefined();
  });

  it('switches language when an option is selected', () => {
    render(
      <LanguageProvider defaultLang="en">
        <LanguageSelector />
        <TestConsumer />
      </LanguageProvider>
    );

    const trigger = screen.getByRole('button', { name: /Select language/i });
    fireEvent.click(trigger);

    const esOption = screen.getByRole('option', { name: /Español/i });
    fireEvent.click(esOption);

    expect(screen.getByTestId('current-lang').textContent).toBe('es');
    expect(screen.getByText('ES')).toBeDefined();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes dropdown when Escape key is pressed', () => {
    render(
      <LanguageProvider defaultLang="en">
        <LanguageSelector />
      </LanguageProvider>
    );

    const trigger = screen.getByRole('button', { name: /Select language/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('switches language using arrow keys while dropdown is open', () => {
    render(
      <LanguageProvider defaultLang="en">
        <LanguageSelector />
        <TestConsumer />
      </LanguageProvider>
    );

    const trigger = screen.getByRole('button', { name: /Select language/i });
    fireEvent.click(trigger);

    // Press ArrowDown to switch from 'en' to 'es'
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByTestId('current-lang').textContent).toBe('es');

    // Press ArrowUp to switch back to 'en'
    fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    expect(screen.getByTestId('current-lang').textContent).toBe('en');
  });

  it('renders segmented variant for mobile navigation with radio semantics', () => {
    render(
      <LanguageProvider defaultLang="en">
        <LanguageSelector variant="segmented" />
        <TestConsumer />
      </LanguageProvider>
    );

    const esRadio = screen.getByRole('radio', { name: /ES Español/i });
    const enRadio = screen.getByRole('radio', { name: /EN English/i });

    expect(enRadio).toHaveAttribute('aria-checked', 'true');
    expect(esRadio).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(esRadio);
    expect(screen.getByTestId('current-lang').textContent).toBe('es');
    expect(esRadio).toHaveAttribute('aria-checked', 'true');
    expect(enRadio).toHaveAttribute('aria-checked', 'false');
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <LanguageProvider defaultLang="en">
          <LanguageSelector />
        </LanguageProvider>
        <div data-testid="outside-element">Outside</div>
      </div>
    );

    const trigger = screen.getByRole('button', { name: /Select language/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.mouseDown(screen.getByTestId('outside-element'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
