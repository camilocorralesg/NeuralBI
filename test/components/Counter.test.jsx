import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Counter from '../../components/Counter';

// Each digit: its face (the plain digit), the line its reel stops on, and the reel's digits top to bottom.
const wheels = container => [...container.querySelectorAll('[data-face]')].map(face => ({
  face: face.textContent,
  stop: Number(face.parentElement.style.getPropertyValue('--stop')),
  reel: face.nextElementSibling?.textContent,
}));

describe('Counter: an odometer in markup', () => {
  it('is just its digits until it rolls, hidden from assistive technology', () => {
    const { container } = render(<Counter value={65} delay={140} />);
    const counter = container.firstElementChild;
    expect(counter).toHaveAttribute('aria-hidden', 'true');
    expect(counter).toHaveAttribute('data-value', '65');
    expect(counter.style.getPropertyValue('--count-delay')).toBe('140ms');
    // No reels in the resting markup: without CSS, in reader modes or to a crawler it reads "65".
    expect(counter.textContent).toBe('65');
    expect(wheels(container).map(wheel => wheel.face)).toEqual(['6', '5']);
  });

  it('spins each digit more laps the further right it sits, and stops every reel on its digit', () => {
    const { container } = render(<Counter value={65} rolling />);
    const [tens, ones] = wheels(container);
    expect(tens).toEqual({ face: '6', stop: 26, reel: '0123456789'.repeat(2) + '0123456' });
    expect(ones).toEqual({ face: '5', stop: 35, reel: '0123456789'.repeat(3) + '012345' });
    // The ones digit rolls longest, so it locks in last.
    const rolls = [...container.querySelectorAll('[data-face]')].map(face => parseInt(face.parentElement.style.getPropertyValue('--roll'), 10));
    expect(rolls[1]).toBeGreaterThan(rolls[0]);
  });

  it('rolls a single digit as a ones digit', () => {
    const { container } = render(<Counter value={7} rolling />);
    expect(wheels(container)).toEqual([{ face: '7', stop: 37, reel: '0123456789'.repeat(3) + '01234567' }]);
  });
});
