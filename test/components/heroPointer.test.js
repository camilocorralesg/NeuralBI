import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { answersPointer } from '../../components/heroPointer';

describe('Hero lines and the pointer', () => {
  it('answer a mouse and a pen', () => {
    expect(answersPointer({ pointerType: 'mouse' })).toBe(true);
    expect(answersPointer({ pointerType: 'pen' })).toBe(true);
  });

  it('never answer a finger: on touch screens the lines keep their own motion only', () => {
    expect(answersPointer({ pointerType: 'touch' })).toBe(false);
    expect(answersPointer(undefined)).toBe(false);
  });

  it('gate both the bend and parallax (pointermove) and the ripple (pointerdown) behind it', () => {
    const source = readFileSync(resolve(__dirname, '../../components/FloatingLines.jsx'), 'utf8');
    for (const handler of ['handlePointerMove', 'handlePointerDown']) {
      const body = source.slice(source.indexOf(`const ${handler} = event => {`), source.indexOf(`const ${handler} = event => {`) + 160);
      // The guard may also check that a canvas exists (the context is freed far from the screen).
      expect(body).toMatch(/if \((?:!canvas \|\| )?!answersPointer\(event\)\) return;/);
    }
  });
});
