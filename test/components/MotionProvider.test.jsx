import React from 'react';
import fs from 'fs';
import path from 'path';
import { render, screen, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { m, MotionGlobalConfig } from 'framer-motion';
import MotionProvider from '../../components/MotionProvider';

const root = path.resolve(__dirname, '../..');
// The first import of the features chunk is transformed on the spot; under a full parallel run that can take seconds.
const LOADING = { timeout: 20000 };

beforeAll(() => { MotionGlobalConfig.skipAnimations = true; });
afterAll(() => { MotionGlobalConfig.skipAnimations = false; });

describe('framer-motion, light first load', () => {
  it('renders only `m` components: no app file imports the full `motion` component', () => {
    const files = [];
    const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(jsx?|mjs)$/.test(entry.name)) files.push(full);
    });
    ['app', 'components', 'context', 'lib'].forEach((dir) => walk(path.join(root, dir)));
    const offenders = files.filter((file) => {
      const found = fs.readFileSync(file, 'utf8').match(/import \{([^}]*)\} from 'framer-motion'/);
      return found && found[1].split(',').some((name) => name.trim() === 'motion');
    });
    expect(offenders.map((file) => path.relative(root, file))).toEqual([]);
    // The features are their own chunk, loaded by the provider the layout wraps the page in.
    expect(fs.readFileSync(path.join(root, 'components/MotionProvider.jsx'), 'utf8')).toMatch(/import\('\.\/motionFeatures'\)/);
    expect(fs.readFileSync(path.join(root, 'app/layout.jsx'), 'utf8')).toMatch(/<MotionProvider>/);
  });

  it('holds the drawn state until the features arrive, then animates', async () => {
    render(<MotionProvider><m.div data-testid="box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} /></MotionProvider>);
    // As the server drew it.
    expect(screen.getByTestId('box').style.opacity).toBe('0');
    await waitFor(() => expect(screen.getByTestId('box').style.opacity).toBe('1'), LOADING);
  }, 30000);
});
