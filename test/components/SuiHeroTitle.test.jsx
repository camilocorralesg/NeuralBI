import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SuiHeroTitle from '../../components/SuiHeroTitle';

const LINES = [{ text: 'Intelligence' }, { text: 'That Executes', em: true }];

describe('SuiHeroTitle (hero headline)', () => {
  it('reads as one sentence, once', () => {
    render(<SuiHeroTitle lines={LINES} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Intelligence That Executes');
    expect(heading.textContent).toBe('Intelligence That Executes');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('is drawn once and sharp: no blurred base layer and no pointer spotlight copy', () => {
    const { container } = render(<SuiHeroTitle lines={LINES} />);
    const layers = container.querySelectorAll('h1');
    expect(layers).toHaveLength(1);
    expect(layers[0].className).toBe('sui-hero-text');
    expect(container.querySelector('.blur-layer, .sharp-layer, [aria-hidden="true"]')).toBeNull();
  });

  it('gives the headline its masked lines, indexed for the 90 ms stagger, the second in the italic', () => {
    const { container } = render(<SuiHeroTitle lines={LINES} />);
    const lines = [...container.querySelectorAll('h1 .sui-hero-line > .sui-hero-line-inner')];
    expect(lines.map((line) => line.textContent)).toEqual(['Intelligence', 'That Executes']);
    expect(lines.map((line) => line.style.getPropertyValue('--line'))).toEqual(['0', '1']);
    expect(lines.map((line) => line.tagName)).toEqual(['SPAN', 'EM']);
  });

  it('applies the font chosen for the language to the headline', () => {
    const { container } = render(<SuiHeroTitle lines={LINES} font="var(--font-display)" />);
    expect(container.querySelector('h1').style.fontFamily).toBe('var(--font-display)');
  });
});
