import { describe, expect, it } from 'vitest';
import { roundedRectPath } from '../../components/edgePath';

describe('roundedRectPath (the EdgeBeam track)', () => {
  it('traces a rounded box clockwise from the end of the top-left corner', () => {
    expect(roundedRectPath(200, 100, 16)).toBe(
      'M 16 0 H 184 A 16 16 0 0 1 200 16 V 84 A 16 16 0 0 1 184 100 H 16 A 16 16 0 0 1 0 84 V 16 A 16 16 0 0 1 16 0 Z',
    );
  });

  it('clamps the radius to half the shorter side, as a border radius is, and never goes negative', () => {
    expect(roundedRectPath(40, 20, 999)).toBe('M 10 0 H 30 A 10 10 0 0 1 40 10 V 10 A 10 10 0 0 1 30 20 H 10 A 10 10 0 0 1 0 10 V 10 A 10 10 0 0 1 10 0 Z');
    expect(roundedRectPath(0, 0, 16)).toBe('M 0 0 H 0 A 0 0 0 0 1 0 0 V 0 A 0 0 0 0 1 0 0 H 0 A 0 0 0 0 1 0 0 V 0 A 0 0 0 0 1 0 0 Z');
    expect(roundedRectPath(100.456, 50.004, 8)).toContain('H 92.46');
  });
});
