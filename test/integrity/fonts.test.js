import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const read = (file) => fs.readFileSync(path.resolve(__dirname, '../..', file), 'utf8');

describe('Pre-Flight Integrity: the font stack', () => {
  it('loads DM Sans, Inter and JetBrains Mono, and no Montserrat, in both font requests', () => {
    const layout = read('app/layout.jsx');
    expect(layout).toMatch(/import \{ DM_Sans, Inter, JetBrains_Mono \} from 'next\/font\/google'/);
    const googleFonts = layout.match(/fonts\.googleapis\.com\/css2\?[^"]+/)[0];
    expect(googleFonts).toContain('family=DM+Sans');
    expect(googleFonts).toContain('family=Inter');
    expect(googleFonts).toContain('family=JetBrains+Mono');
    expect(layout).not.toMatch(/Montserrat/);
  });

  it('sets controls (--font-ui, --font-button) in the display face, DM Sans', () => {
    const css = read('app/globals.css');
    expect(css).toMatch(/--font-ui: var\(--font-sans, 'DM Sans'/);
    expect(css).toMatch(/--font-button: var\(--font-ui, 'DM Sans'/);
    expect(css).not.toMatch(/Montserrat/);
    expect(read('components/LanguageSelector.module.css')).not.toMatch(/Montserrat/);
  });
});
