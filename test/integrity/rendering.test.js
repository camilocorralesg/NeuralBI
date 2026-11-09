import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const pngInfo = (file) => {
  const buffer = fs.readFileSync(path.join(root, file));
  return { signature: buffer.subarray(0, 8).toString('hex'), width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), bytes: buffer.length };
};
// A WebP's canvas size: from the VP8X header (extended: alpha), else from the VP8 / VP8L bitstream.
const webpInfo = (file) => {
  const buffer = fs.readFileSync(path.join(root, file));
  const riff = buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
  const chunk = buffer.toString('ascii', 12, 16);
  let width = 0;
  let height = 0;
  if (chunk === 'VP8X') { width = buffer.readUIntLE(24, 3) + 1; height = buffer.readUIntLE(27, 3) + 1; }
  else if (chunk === 'VP8 ') { width = buffer.readUInt16LE(26) & 0x3fff; height = buffer.readUInt16LE(28) & 0x3fff; }
  else if (chunk === 'VP8L') { const bits = buffer.readUInt32LE(21); width = (bits & 0x3fff) + 1; height = ((bits >> 14) & 0x3fff) + 1; }
  return { riff, width, height, bytes: buffer.length };
};

describe('Pre-Flight Integrity: rendering that looks the same in Safari and Chrome', () => {
  it('draws film grain from a fixed tile, never an SVG feTurbulence filter (WebKit renders it differently)', () => {
    for (const file of ['app/globals.css', 'components/sections/ArsenalExperience.module.css']) {
      // The filter itself, inline or URL-encoded in a data URI (comments may still name it).
      expect(read(file)).not.toMatch(/<feTurbulence|%3CfeTurbulence/);
    }
    expect(read('app/globals.css')).toMatch(/\.grain-overlay \{[^}]*url\('\/NeuralBI\/assets\/grain\.webp'\)/);
    expect(read('components/sections/ArsenalExperience.module.css')).toContain("--arsenal-grain: url('/NeuralBI/assets/grain.webp')");
  });

  it('lays one static dither over the page, so dark CSS gradients do not band in WebKit', () => {
    const css = read('app/globals.css');
    const rule = css.match(/body::after \{[^}]*\}/)?.[0] || '';
    expect(rule).toContain("url('/NeuralBI/assets/dither.png')");
    expect(rule).toContain('position: fixed');
    expect(rule).toContain('pointer-events: none');
    expect(rule).not.toMatch(/animation|will-change/);
  });

  it('ships both tiles small and valid: the grain as WebP (noise barely compresses as PNG), the dither as PNG', () => {
    const grain = webpInfo('public/assets/grain.webp');
    expect(grain.riff).toBe(true);
    expect([grain.width, grain.height]).toEqual([128, 128]);
    // 21 KB as PNG; PageSpeed flags anything near that on the first screen.
    expect(grain.bytes).toBeLessThan(10000);
    const dither = pngInfo('public/assets/dither.png');
    expect(dither.signature).toBe('89504e470d0a1a0a');
    expect([dither.width, dither.height]).toEqual([128, 128]);
    expect(dither.bytes).toBeLessThan(8000);
  });

  it('gates the travelling edge beam on path() motion paths, not on basic shapes some Safari versions lack', () => {
    for (const file of ['components/EdgeBeam.module.css', 'components/sections/Impact.module.css', 'components/sections/FooterCTA.module.css']) {
      expect(read(file)).not.toMatch(/@supports not \(offset-path: inset/);
      expect(read(file)).toMatch(/@supports not \(offset-path: path\('M 0 0 H 1'\)\)/);
    }
    expect(read('components/EdgeBeam.module.css')).toContain('offset-path: var(--beam-path,');
  });
});
