import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const read = (file) => fs.readFileSync(path.resolve(__dirname, '../..', file), 'utf8');

// The custom properties a CSS block defines, as { name: value }.
const tokens = (css) => Object.fromEntries([...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

describe('Pre-Flight Integrity: the font stack', () => {
  it('self-hosts DM Sans, Inter and JetBrains Mono through next/font, and nothing from Google at run time', () => {
    const layout = read('app/layout.jsx');
    expect(layout).toMatch(/import \{ DM_Sans, Inter, JetBrains_Mono \} from 'next\/font\/google'/);
    // One font source: no render-blocking third-party stylesheet, no preconnects to it.
    expect(layout).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com/);
    expect(layout).not.toMatch(/Montserrat/);
  });

  it('keeps the DM Sans cuts the page draws: the italic and the optical-size axis', () => {
    const layout = read('app/layout.jsx');
    const dmSans = layout.match(/DM_Sans\(\{([\s\S]*?)\}\)/)[1];
    expect(dmSans).toMatch(/style: \['normal', 'italic'\]/);
    expect(dmSans).toMatch(/axes: \['opsz'\]/);
    expect(dmSans).toMatch(/variable: '--font-dm-sans'/);
  });

  it('maps the next/font variables onto the tokens, and no token refers to itself', () => {
    const root = read('app/globals.css').match(/:root\s*\{([\s\S]*?)\n\}/)[1];
    const t = tokens(root);
    expect(t['--font-sans']).toMatch(/^var\(--font-dm-sans/);
    expect(t['--font-body']).toMatch(/^var\(--font-inter/);
    expect(t['--font-mono']).toMatch(/^var\(--font-jetbrains-mono/);
    // Controls speak in the display face: no third sans.
    expect(t['--font-ui']).toBe('var(--font-sans)');
    expect(t['--font-button']).toBe('var(--font-sans)');
    expect(t['--font-display']).toBe('var(--font-sans)');
    for (const [name, value] of Object.entries(t)) {
      expect(value.includes(`var(${name},`) || value.includes(`var(${name})`), `${name} refers to itself`).toBe(false);
    }
    expect(read('app/globals.css')).not.toMatch(/Montserrat/);
    expect(read('components/LanguageSelector.module.css')).not.toMatch(/Montserrat/);
  });
});
