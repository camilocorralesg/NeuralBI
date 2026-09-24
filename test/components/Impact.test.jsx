import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Impact from '../../components/sections/Impact';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

const animationProps = vi.hoisted(() => ({ background: vi.fn(), counter: vi.fn() }));
vi.mock('../../components/ColorBends', () => ({ default: (props) => {
  animationProps.background(props);
  return <div data-testid="animated-background" />;
} }));
vi.mock('../../components/Counter', () => ({ default: (props) => {
  animationProps.counter(props);
  return <span>{props.value}</span>;
} }));
vi.mock('../../components/CharacterReveal', () => ({ default: ({ text }) => <span data-testid="reveal">{text.replaceAll('*', '')}</span> }));
vi.mock('../../components/TiltCard', () => ({ default: ({ children }) => <div data-testid="tilt-card">{children}</div> }));

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage('es')}>Español</button>;
}

describe('Impact animation and content preservation', () => {
  beforeEach(() => { localStorage.clear(); vi.clearAllMocks(); });

  it('keeps the original animated background, reveals, tilt cards and counters in both languages', () => {
    render(<LanguageProvider><LanguageSwitch /><Impact activeHero="remix" /></LanguageProvider>);
    const assertContent = (locale) => {
      const copy = translations[locale].impact;
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(`${copy.titleLine1} ${copy.titleLine2.replaceAll('*', '')}`);
      expect(screen.getByText(copy.subtitle)).toBeInTheDocument();
      for (const metric of copy.metrics) {
        expect(screen.getByText(metric.number)).toBeInTheDocument();
        expect(screen.getByText(metric.label)).toBeInTheDocument();
        expect(animationProps.counter).toHaveBeenCalledWith({ value: metric.number });
      }
      expect(screen.getAllByTestId('tilt-card')).toHaveLength(3);
      expect(screen.getAllByTestId('reveal')).toHaveLength(2);
      expect(animationProps.background).toHaveBeenLastCalledWith({
        colors: ['#c6ff34', '#8bcc18', '#e3ff80', '#0a0a0a'],
        speed: 0.4, intensity: 1.2, mouseInfluence: 0, parallax: 0,
        style: { width: '100%', height: '100%' },
      });
    };
    assertContent('en');
    fireEvent.click(screen.getByRole('button', { name: 'Español' }));
    assertContent('es');
  });

  it.each(['spline1', 'cinematic', 'modern_v2', 'tech_v4', 'default'])('preserves %s content without applying the remix animation', (activeHero) => {
    render(<LanguageProvider><Impact activeHero={activeHero} /></LanguageProvider>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('The math speaks for itself.');
    for (const metric of translations.en.impact.metrics) {
      expect(screen.getByText(metric.number)).toBeInTheDocument();
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }
    expect(animationProps.background).not.toHaveBeenCalled();
  });
});
