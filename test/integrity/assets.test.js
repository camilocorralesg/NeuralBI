import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Pre-Flight Integrity: Static Assets', () => {
  const publicDir = path.resolve(__dirname, '../../public');

  const requiredAssets = [
    { name: 'favicon.ico', minBytes: 100 },
    { name: 'favicon.png', minBytes: 1000 },
    { name: 'favicon.svg', minBytes: 500 },
    { name: 'apple-touch-icon.png', minBytes: 1000 },
    { name: 'og-image.png', minBytes: 10000 },
  ];

  for (const asset of requiredAssets) {
    it(`verifies presence and minimum byte size of public/${asset.name}`, () => {
      const filePath = path.join(publicDir, asset.name);
      expect(fs.existsSync(filePath), `Missing asset: ${asset.name}`).toBe(true);

      const stats = fs.statSync(filePath);
      expect(
        stats.size,
        `Asset ${asset.name} is abnormally small (${stats.size} bytes)`
      ).toBeGreaterThanOrEqual(asset.minBytes);
    });
  }

  it('validates PNG header signature for raster image assets', () => {
    const pngFiles = ['favicon.png', 'apple-touch-icon.png', 'og-image.png'];
    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    for (const fileName of pngFiles) {
      const filePath = path.join(publicDir, fileName);
      const fd = fs.openSync(filePath, 'r');
      const buffer = Buffer.alloc(8);
      fs.readSync(fd, buffer, 0, 8, 0);
      fs.closeSync(fd);

      expect(
        buffer.equals(pngSignature),
        `${fileName} does not contain valid PNG magic bytes`
      ).toBe(true);
    }
  });

  it('validates SVG structure for public/favicon.svg', () => {
    const svgPath = path.join(publicDir, 'favicon.svg');
    const content = fs.readFileSync(svgPath, 'utf8');

    expect(content).toContain('<svg');
    expect(content).toContain('</svg>');
    expect(content).toContain('viewBox');
  });
});
