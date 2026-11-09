import React from 'react';
import fs from 'fs';
import path from 'path';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// The Spanish copy is a chunk of its own. test/setup.js preloads it for every other test; here each test takes a fresh
// copy of the context module, so Spanish starts out missing, the way it does for a visitor's first page.
const root = path.resolve(__dirname, '../..');
const fresh = async () => {
  vi.resetModules();
  const [context, i18n] = await Promise.all([import('../../context/LanguageContext'), import('../../lib/i18n')]);
  return { ...context, ...i18n };
};
// The first import of the chunk is transformed on the spot; under a full parallel run that can take seconds.
const LOADING = { timeout: 20000 };

function mount({ LanguageProvider, useLanguage }) {
  function Consumer() {
    const { language, setLanguage, t } = useLanguage();
    return <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="label">{t.nav.arsenal}</span>
      <button onClick={() => setLanguage('es')}>Set ES</button>
      <button onClick={() => setLanguage('en')}>Set EN</button>
    </div>;
  }
  return render(<LanguageProvider><Consumer /></LanguageProvider>);
}

beforeEach(() => localStorage.clear());
afterEach(() => { localStorage.clear(); document.documentElement.lang = 'en'; });

describe('The language chunks', () => {
  it('keeps Spanish out of the first load: no app module imports both languages', () => {
    const files = [];
    const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(jsx?|mjs)$/.test(entry.name)) files.push(full);
    });
    ['app', 'components', 'context', 'lib', 'hooks'].forEach((dir) => fs.existsSync(path.join(root, dir)) && walk(path.join(root, dir)));
    // lib/translations.js itself is the one file that joins both languages (for tests and tooling only).
    const combined = path.join(root, 'lib/translations.js');
    const offenders = files.filter((file) => file !== combined && /from ['"][./]*(lib\/)?translations(\.es)?['"]/.test(fs.readFileSync(file, 'utf8')));
    expect(offenders.map((file) => path.relative(root, file))).toEqual([]);
    expect(fs.readFileSync(path.join(root, 'lib/i18n.js'), 'utf8')).toMatch(/import\('\.\/translations\.es'\)/);
  });

  it('switches to Spanish once its copy arrives, and stays in English until then', async () => {
    mount(await fresh());
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    fireEvent.click(screen.getByRole('button', { name: 'Set ES' }));
    // The choice is saved at once; the copy follows the chunk, never a half-translated page.
    expect(localStorage.getItem('neuralbi_lang')).toBe('es');
    expect(screen.getByTestId('label')).toHaveTextContent('Services');
    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('Servicios'), LOADING);
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(document.documentElement.lang).toBe('es');
  }, 30000);

  it('restores a saved Spanish choice through the chunk', async () => {
    localStorage.setItem('neuralbi_lang', 'es');
    mount(await fresh());
    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('Servicios'), LOADING);
  }, 30000);

  it('lets the latest choice win when English is picked back before Spanish arrives', async () => {
    const context = await fresh();
    mount(context);
    fireEvent.click(screen.getByRole('button', { name: 'Set ES' }));
    fireEvent.click(screen.getByRole('button', { name: 'Set EN' }));
    await act(() => context.preloadLanguage('es'));
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('label')).toHaveTextContent('Services');
  }, 30000);
});
