import fs from 'fs';
import path from 'path';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Without a GPU, a browser draws WebGL on the CPU and a full-screen shader takes the whole main thread: PageSpeed
// Insights (whose servers have no GPU) timed out on the page with DEADLINE_EXCEEDED. The effects keep their still CSS
// fallback there; these tests hold the gate.
const root = path.resolve(__dirname, '../..');
const RENDERER = 0x1f01;
const UNMASKED = 0x9246;

// Each test takes a fresh module: the gate remembers a CPU renderer for the rest of the page.
const fresh = async () => { vi.resetModules(); return import('../../components/webglContext'); };

function fakeGL(name, { masked = true } = {}) {
  const loseContext = vi.fn();
  return {
    RENDERER,
    loseContext,
    getParameter: (parameter) => {
      if (parameter === RENDERER) return masked ? 'WebKit WebGL' : name;
      if (parameter === UNMASKED) return name;
      return null;
    },
    getExtension: (extension) => {
      if (extension === 'WEBGL_debug_renderer_info') return { UNMASKED_RENDERER_WEBGL: UNMASKED };
      if (extension === 'WEBGL_lose_context') return { loseContext };
      return null;
    },
  };
}
const canvasWith = (...contexts) => ({ getContext: vi.fn((type) => contexts.find((c) => c.type === type)?.gl ?? null) });

afterEach(() => { vi.restoreAllMocks(); });

describe('hardwareContext', () => {
  it('tells CPU renderers from GPUs', async () => {
    const { isSoftwareRenderer } = await fresh();
    [
      'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)',
      'ANGLE (Microsoft, Microsoft Basic Render Driver (0x0000008C) Direct3D11 vs_5_0 ps_5_0, D3D11)',
      'llvmpipe (LLVM 15.0.7, 256 bits)',
      'Google SwiftShader',
    ].forEach((name) => expect(isSoftwareRenderer(name), name).toBe(true));
    [
      'ANGLE (Intel, Intel(R) UHD Graphics (0x0000A7A8) Direct3D11 vs_5_0 ps_5_0, D3D11)',
      'Apple GPU',
      'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)',
      'Adreno (TM) 740',
      'Mali-G78',
    ].forEach((name) => expect(isSoftwareRenderer(name), name).toBe(false));
  });

  it('asks for a context the GPU draws, and hands it over', async () => {
    const { hardwareContext } = await fresh();
    const gl = fakeGL('ANGLE (Intel, Intel(R) UHD Graphics, D3D11)');
    const canvas = canvasWith({ type: 'webgl', gl });
    expect(hardwareContext(canvas, ['webgl'], { alpha: false })).toBe(gl);
    expect(canvas.getContext).toHaveBeenCalledWith('webgl', { alpha: false, failIfMajorPerformanceCaveat: true });
  });

  it('falls from webgl2 to webgl, and reads an unmasked renderer straight (Firefox)', async () => {
    const { hardwareContext } = await fresh();
    const gl = fakeGL('Intel(R) HD Graphics', { masked: false });
    const canvas = canvasWith({ type: 'webgl', gl });
    expect(hardwareContext(canvas, ['webgl2', 'webgl'])).toBe(gl);
    expect(canvas.getContext.mock.calls.map(([type]) => type)).toEqual(['webgl2', 'webgl']);
  });

  it('gives nothing when the browser refuses a GPU context (its own CPU fallback)', async () => {
    const { hardwareContext } = await fresh();
    expect(hardwareContext(canvasWith(), ['webgl2', 'webgl'])).toBeNull();
  });

  it('drops a CPU-drawn context, and skips the probe for every effect after it', async () => {
    const { hardwareContext } = await fresh();
    const gl = fakeGL('ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)');
    expect(hardwareContext(canvasWith({ type: 'webgl', gl }), ['webgl'])).toBeNull();
    expect(gl.loseContext).toHaveBeenCalledTimes(1);
    const next = canvasWith({ type: 'webgl', gl: fakeGL('anything') });
    expect(hardwareContext(next, ['webgl'])).toBeNull();
    expect(next.getContext).not.toHaveBeenCalled();
  });

  it('is the one way an effect gets WebGL', () => {
    ['components/linesRenderer.js', 'components/auroraRenderer.js', 'components/liquidGradientRenderer.js'].forEach((file) => {
      const source = fs.readFileSync(path.join(root, file), 'utf8');
      expect(source, file).toMatch(/hardwareContext\(canvas, \[/);
      expect(source, file).not.toMatch(/getContext\(['"]webgl/);
    });
  });
});
