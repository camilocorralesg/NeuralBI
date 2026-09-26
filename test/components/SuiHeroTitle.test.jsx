import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SuiHeroTitle from '../../components/SuiHeroTitle';

const LINES = [{ text: 'Intelligence' }, { text: 'That Executes', em: true }];

describe('SuiHeroTitle (hero headline)', () => {
  it('reads as one sentence, once, though it is drawn in two layers', () => {
    render(<SuiHeroTitle lines={LINES} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Intelligence That Executes');
    expect(heading.textContent).toBe('Intelligence That Executes');
    // The spotlight layer repeats the headline for the eye only.
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('gives each layer the same masked lines, indexed for the 90 ms stagger, the second in the italic', () => {
    const { container } = render(<SuiHeroTitle lines={LINES} />);
    const layers = container.querySelectorAll('h1');
    expect(layers).toHaveLength(2);
    layers.forEach((layer) => {
      const lines = [...layer.querySelectorAll('.sui-hero-line > .sui-hero-line-inner')];
      expect(lines.map((line) => line.textContent)).toEqual(['Intelligence', 'That Executes']);
      expect(lines.map((line) => line.style.getPropertyValue('--line'))).toEqual(['0', '1']);
      expect(lines.map((line) => line.tagName)).toEqual(['SPAN', 'EM']);
    });
    expect(layers[1]).toHaveAttribute('aria-hidden', 'true');
  });
});
