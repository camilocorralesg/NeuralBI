'use client';

import React, { useEffect, useState } from 'react';

// What a browser supports and what each live effect is doing, for comparing engines (Safari against Chrome) on the real
// device. Mounted only when the URL carries `?diag` (App.jsx loads it on demand), so visitors never download it.

const CSS_FEATURES = [
  ['offset-path: path()', 'offset-path', "path('M 0 0 H 1')"],
  ['offset-path: inset() round', 'offset-path', 'inset(0 round 1px)'],
  ['animation-timeline: scroll()', 'animation-timeline', 'scroll()'],
  ['color-mix()', 'color', 'color-mix(in oklab, red, blue)'],
  ['oklch()', 'color', 'oklch(0.5 0.1 120)'],
  ['gradient "in oklab"', 'background-image', 'linear-gradient(in oklab, red, blue)'],
  ['backdrop-filter', 'backdrop-filter', 'blur(1px)'],
  ['-webkit-backdrop-filter', '-webkit-backdrop-filter', 'blur(1px)'],
  ['mask-composite', 'mask-composite', 'exclude'],
  ['mix-blend-mode: overlay', 'mix-blend-mode', 'overlay'],
  ['text-wrap: balance', 'text-wrap', 'balance'],
  ['container queries', 'container-type', 'inline-size'],
];

function webglInfo() {
  const info = { webgl: false, webgl2: false, renderer: '', maxTexture: 0 };
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    info.webgl2 = Boolean(gl2);
    const gl = gl2 || document.createElement('canvas').getContext('webgl');
    info.webgl = Boolean(gl);
    if (gl) {
      const debug = gl.getExtension('WEBGL_debug_renderer_info');
      info.renderer = String(debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
      info.maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  } catch { /* reported as unavailable */ }
  return info;
}

function measureFps() {
  return new Promise((resolve) => {
    let frames = 0;
    const start = performance.now();
    const step = (now) => {
      frames += 1;
      if (now - start < 1200) requestAnimationFrame(step);
      else resolve(Math.round((frames * 1000) / (now - start)));
    };
    requestAnimationFrame(step);
  });
}

function effects() {
  const lines = document.querySelector('.floating-lines-container');
  const auroras = [...document.querySelectorAll('[class*="AuroraField_aurora"]')];
  const buttons = [...document.querySelectorAll('[class*="ShaderButton_button"]')];
  const beams = [...document.querySelectorAll('[class*="EdgeBeam_beam"]')];
  return {
    heroLines: lines ? `webgl=${lines.dataset.webgl ?? 'pending'}` : 'absent',
    auroras: auroras.map((a) => `webgl=${a.dataset.webgl} running=${a.dataset.running}`),
    shaderButtons: `${buttons.filter((b) => b.dataset.liquid === 'true').length}/${buttons.length} drawing liquid`,
    edgeBeams: beams.map((b) => {
      const comet = b.querySelector('i');
      const path = comet ? getComputedStyle(comet).getPropertyValue('offset-path') : '';
      return `${getComputedStyle(b).display === 'none' ? 'hidden' : 'shown'} path=${path ? path.slice(0, 24) : 'none'}`;
    }),
  };
}

export default function RenderDiagnostics() {
  const [report, setReport] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const ua = navigator.userAgent;
      const safari = /Version\/([\d.]+).*Safari/.exec(ua)?.[1] || null;
      const media = (query) => window.matchMedia?.(query).matches ?? false;
      const fps = await measureFps();
      if (cancelled) return;
      setReport({
        browser: safari ? `Safari ${safari}` : ua,
        reducedMotion: media('(prefers-reduced-motion: reduce)'),
        reducedTransparency: media('(prefers-reduced-transparency: reduce)'),
        devicePixelRatio: window.devicePixelRatio,
        displayP3: media('(color-gamut: p3)'),
        fps,
        webgl: webglInfo(),
        css: Object.fromEntries(CSS_FEATURES.map(([label, property, value]) => [label, Boolean(window.CSS?.supports?.(property, value))])),
        registerProperty: typeof window.CSS?.registerProperty === 'function',
        effects: effects(),
      });
    };
    // Give the page's effects a moment to boot before reading their state.
    const timer = window.setTimeout(run, 2500);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, []);

  const text = report ? JSON.stringify(report, null, 2) : 'Midiendo…';
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); } catch { setCopied(false); }
  };

  return (
    <aside
      aria-label="Diagnóstico de render"
      style={{
        position: 'fixed', right: 12, bottom: 12, zIndex: 2147483646, width: 'min(420px, calc(100vw - 24px))',
        maxHeight: '70vh', overflow: 'auto', padding: 14, borderRadius: 12, background: 'var(--color-paper)',
        border: '1px solid var(--color-border-hover)', color: 'var(--color-ink)', font: '12px/1.45 var(--font-mono, monospace)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <strong>Render diagnostics</strong>
        <button type="button" onClick={copy} style={{ font: 'inherit', color: 'var(--color-paper)', background: 'var(--color-accent)', border: 0, borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{text}</pre>
    </aside>
  );
}
