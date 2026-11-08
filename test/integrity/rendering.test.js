import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const pngInfo = (file) => {
  const buffer = fs.readFileSync(path.join(root, file));
  return { signature: buffer.subarray(0, 8).toString('hex'), width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), bytes: buffer.length };
};

describe('Pre-Flight Integrity: rendering that looks the same in Safari and Chrome', () => {
  it('draws film grain from a fixed tile, never an SVG feTurbulence filter (WebKit renders it differently)', () => {
    for (const file of ['app/globals.css', 'components/sections/ArsenalExperience.module.css']) {
      // The filter itself, inline or URL-encoded in a data URI (comments may still name it).
      expect(read(file)).not.toMatch(/<feTurbulence|%3CfeTurbulence/);
    }
    expect(read('app/globals.css')).toMatch(/\.grain-overlay \{[^}]*url\('\/NeuralBI\/assets\/grain\.png'\)/);
    expect(read('components/sections/ArsenalExperience.module.css')).toContain("--arsenal-grain: url('/NeuralBI/assets/grain.png')");
  });

  it('lays one static dither over the page, so dark CSS gradients do not band in WebKit', () => {
    const css = read('app/globals.css');
    const rule = css.match(/body::after \{[^}]*\}/)?.[0] || '';
    expect(rule).toContain("url('/NeuralBI/assets/dither.png')");
    expect(rule).toContain('position: fixed');
    expect(rule).toContain('pointer-events: none');
    expect(rule).not.toMatch(/animation|will-change/);
  });

  it('ships both tiles as small, valid PNGs', () => {
    for (const [file, size, maxBytes] of [['public/assets/grain.png', 128, 30000], ['public/assets/dither.png', 128, 8000]]) {
      const info = pngInfo(file);
      expect(info.signature).toBe('89504e470d0a1a0a');
      expect([info.width, info.height]).toEqual([size, size]);
      expect(info.bytes).toBeLessThan(maxBytes);
    }
  });

  it('gates the travelling edge beam on path() motion paths, not on basic shapes some Safari versions lack', () => {
    for (const file of ['components/EdgeBeam.module.css', 'components/sections/Impact.module.css', 'components/sections/FooterCTA.module.css']) {
      expect(read(file)).not.toMatch(/@supports not \(offset-path: inset/);
      expect(read(file)).toMatch(/@supports not \(offset-path: path\('M 0 0 H 1'\)\)/);
    }
    expect(read('components/EdgeBeam.module.css')).toContain('offset-path: var(--beam-path,');
  });
});
