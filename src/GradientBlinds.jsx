import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './GradientBlinds.css';

const MAX_COLORS = 8;
const hexToRGB = hex => {
  const c = hex.replace('#', '').padEnd(6, '0');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b];
};
const prepStops = stops => {
  const base = (stops && stops.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS);
  if (base.length === 1) base.push(base[0]);
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);
  const arr = [];
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2));
  return { arr, count };
};

const ctxMap = new WeakMap();

const GradientBlinds = ({
  className = '',
  dpr,
  paused = false,
  gradientColors,
  angle = 0,
  noise = 0.3,
  blindCount = 16,
  blindMinWidth = 60,
  mouseDampening = 0.15,
  mirrorGradient = false,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  distortAmount = 0,
  shineDirection = 'left',
  mixBlendMode = 'lighten'
}) => {
  const containerRef = useRef(null);
  const mouseTargetRef = useRef([0, 0]);
  const lastTimeRef = useRef(0);
  const firstResizeRef = useRef(true);

  // Keep latest config in refs to avoid stale closures in RAF and resize loops
  const configRef = useRef({
    blindCount,
    blindMinWidth,
    mouseDampening,
    paused
  });

  useEffect(() => {
    configRef.current = {
      blindCount,
      blindMinWidth,
      mouseDampening,
      paused
    };
  }, [blindCount, blindMinWidth, mouseDampening, paused]);

  // Effect 1: Initialize WebGL and start render loop ONCE
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),
      alpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

    const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

varying vec2 vUv;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a){
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec3 getGradientColor(float t){
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);

  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv0 = fragCoord.xy / iResolution.xy;

    float aspect = iResolution.x / iResolution.y;
    vec2 p = uv0 * 2.0 - 1.0;
    p.x *= aspect;
    vec2 pr = rotate2D(p, uAngle);
    pr.x /= aspect;
    vec2 pr_offset = pr * 0.5 + 0.5;
    vec2 uv = pr_offset;

    vec2 uvMod = uv;
    if (uDistort > 0.0) {
      float a = uvMod.y * 6.0;
      float b = uvMod.x * 6.0;
      float w = 0.01 * uDistort;
      uvMod.x += sin(a) * w;
      uvMod.y += cos(b) * w;
    }
    float t = uvMod.x;
    if (uMirror > 0.5) {
      t = 1.0 - abs(1.0 - 2.0 * fract(t));
    }
    vec3 base = getGradientColor(t);

    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float dn = d / r;
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  vec3 cir = vec3(spot);
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;
    vec3 ran = vec3(stripe);

    vec3 col = cir + base - ran;
    col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;

    fragColor = vec4(col, 1.0);
}

void main() {
    vec4 color;
    mainImage(color, vUv * iResolution.xy);
    gl_FragColor = color;
}
`;

    const uniforms = {
      iResolution: { value: new Float32Array([1, 1, 1]) },
      iMouse: { value: new Float32Array([0, 0]) },
      iTime: { value: 0 },
      uAngle: { value: 0 },
      uNoise: { value: 0.3 },
      uBlindCount: { value: 16 },
      uSpotlightRadius: { value: 0.5 },
      uSpotlightSoftness: { value: 1.0 },
      uSpotlightOpacity: { value: 1.0 },
      uMirror: { value: 0 },
      uDistort: { value: 0 },
      uShineFlip: { value: 0 },
      uColor0: { value: new Float32Array([1, 1, 1]) },
      uColor1: { value: new Float32Array([1, 1, 1]) },
      uColor2: { value: new Float32Array([1, 1, 1]) },
      uColor3: { value: new Float32Array([1, 1, 1]) },
      uColor4: { value: new Float32Array([1, 1, 1]) },
      uColor5: { value: new Float32Array([1, 1, 1]) },
      uColor6: { value: new Float32Array([1, 1, 1]) },
      uColor7: { value: new Float32Array([1, 1, 1]) },
      uColorCount: { value: 2 }
    };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    ctxMap.set(container, { renderer, program, mesh });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];

      const { blindMinWidth: bmw, blindCount: bc } = configRef.current;
      if (bmw && bmw > 0) {
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / bmw));
        const effective = bc ? Math.min(bc, maxByMinWidth) : maxByMinWidth;
        uniforms.uBlindCount.value = Math.max(1, effective);
      } else {
        uniforms.uBlindCount.value = Math.max(1, bc);
      }

      if (firstResizeRef.current) {
        firstResizeRef.current = false;
        const cx = gl.drawingBufferWidth / 2;
        const cy = gl.drawingBufferHeight / 2;
        uniforms.iMouse.value = [cx, cy];
        mouseTargetRef.current = [cx, cy];
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = e => {
      const rect = canvas.getBoundingClientRect();
      const scale = renderer.dpr || 1;
      const x = (e.clientX - rect.left) * scale;
      const y = (rect.height - (e.clientY - rect.top)) * scale;
      mouseTargetRef.current = [x, y];
      if (configRef.current.mouseDampening <= 0) {
        uniforms.iMouse.value = [x, y];
      }
    };
    window.addEventListener('pointermove', onPointerMove);

    let raf = 0;
    const loop = t => {
      raf = requestAnimationFrame(loop);
      uniforms.iTime.value = t * 0.001;

      const damp = configRef.current.mouseDampening;
      if (damp > 0) {
        if (!lastTimeRef.current) lastTimeRef.current = t;
        const dt = (t - lastTimeRef.current) / 1000;
        lastTimeRef.current = t;
        const tau = Math.max(1e-4, damp);
        let factor = 1 - Math.exp(-dt / tau);
        if (factor > 1) factor = 1;
        const target = mouseTargetRef.current;
        const cur = uniforms.iMouse.value;
        cur[0] += (target[0] - cur[0]) * factor;
        cur[1] += (target[1] - cur[1]) * factor;
      } else {
        lastTimeRef.current = t;
      }

      if (!configRef.current.paused) {
        try {
          renderer.render({ scene: mesh });
        } catch (e) {
          console.error(e);
        }
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      ctxMap.delete(container);
      try {
        container.removeChild(canvas);
      } catch { /* ignore */ }
    };
  }, []); // Only run once

  // Effect 2: sync config & color props to uniforms (GPU only, no context teardown)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = ctxMap.get(container);
    if (!ctx) return;
    const { program } = ctx;
    const u = program.uniforms;

    u.uAngle.value = (angle * Math.PI) / 180;
    u.uNoise.value = noise;
    u.uSpotlightRadius.value = spotlightRadius;
    u.uSpotlightSoftness.value = spotlightSoftness;
    u.uSpotlightOpacity.value = spotlightOpacity;
    u.uMirror.value = mirrorGradient ? 1 : 0;
    u.uDistort.value = distortAmount;
    u.uShineFlip.value = shineDirection === 'right' ? 1 : 0;

    const { arr: colorArr, count: colorCount } = prepStops(gradientColors);
    u.uColor0.value = new Float32Array(colorArr[0]);
    u.uColor1.value = new Float32Array(colorArr[1]);
    u.uColor2.value = new Float32Array(colorArr[2]);
    u.uColor3.value = new Float32Array(colorArr[3]);
    u.uColor4.value = new Float32Array(colorArr[4]);
    u.uColor5.value = new Float32Array(colorArr[5]);
    u.uColor6.value = new Float32Array(colorArr[6]);
    u.uColor7.value = new Float32Array(colorArr[7]);
    u.uColorCount.value = colorCount;
  }, [
    angle, noise, spotlightRadius, spotlightSoftness, spotlightOpacity,
    mirrorGradient, distortAmount, shineDirection, gradientColors
  ]);

  return (
    <div
      ref={containerRef}
      className={`gradient-blinds-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        ...(mixBlendMode && {
          mixBlendMode: mixBlendMode
        })
      }}
    />
  );
};

export default GradientBlinds;
