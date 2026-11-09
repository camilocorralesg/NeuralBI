'use client';

import { useEffect, useRef } from 'react';
import { answersPointer } from './heroPointer';
import { createLinesRenderer } from './linesRenderer';

// Shader time of the still frame drawn under reduced motion.
const STILL_TIME = 6;

const fragmentShader = `
precision highp float;

// GLSL ES 1.00 (WebGL 1) loops need a constant bound: each wave counts to MAX_LINES and stops at its own count.
#define MAX_LINES 32

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

uniform float u_rippleProgress;
uniform vec2 u_rippleCenter;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int last = lineGradientCount - 1;
    int idx2 = idx + 1 < last ? idx + 1 : last;

    // GLSL ES 1.00 reads a uniform array only at a constant or loop index: walk the stops and keep the two needed.
    vec3 c1 = lineGradient[0];
    vec3 c2 = lineGradient[0];
    for (int i = 0; i < 8; ++i) {
      if (i == idx) c1 = lineGradient[i];
      if (i == idx2) c2 = lineGradient[i];
    }
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  // Ripple effect calculations
  vec2 rippleUv = (2.0 * u_rippleCenter - iResolution.xy) / iResolution.y;
  rippleUv.y *= -1.0;
  
  float dist = length(baseUv - rippleUv);
  float rippleGlow = 0.0;
  if (u_rippleProgress > 0.0 && u_rippleProgress < 1.5) {
    float rippleRadius = u_rippleProgress * 1.5;
    float width = 0.15;
    float rippleIntensity = smoothstep(width, 0.0, abs(dist - rippleRadius));
    vec2 dir = dist > 0.0001 ? normalize(baseUv - rippleUv) : vec2(1.0, 0.0);
    
    // Distort coordinates along shockwave front
    baseUv += dir * rippleIntensity * 0.08 * (1.0 - (u_rippleProgress / 1.5));
    // Apply extra glow mapping on top of lines
    rippleGlow = rippleIntensity * 1.8 * (1.0 - (u_rippleProgress / 1.5));
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < MAX_LINES; ++i) {
      if (i >= bottomLineCount) break;
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < MAX_LINES; ++i) {
      if (i >= middleLineCount) break;
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < MAX_LINES; ++i) {
      if (i >= topLineCount) break;
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col + col * rippleGlow, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

const MAX_GRADIENT_STOPS = 8;
// The shader's own bound on lines per wave (MAX_LINES).
const MAX_LINES = 32;
// The context is made when the lines come within a screen of the viewport and freed when they go further, so the hero
// holds no WebGL context while the visitor reads the rest of the page.
const NEAR = '100% 0px';

function hexToVec3(hex) {
  let value = hex.trim();

  if (value.startsWith('#')) {
    value = value.slice(1);
  }

  let r = 255;
  let g = 255;
  let b = 255;

  if (value.length === 3) {
    r = parseInt(value[0] + value[0], 16);
    g = parseInt(value[1] + value[1], 16);
    b = parseInt(value[2] + value[2], 16);
  } else if (value.length === 6) {
    r = parseInt(value.slice(0, 2), 16);
    g = parseInt(value.slice(2, 4), 16);
    b = parseInt(value.slice(4, 6), 16);
  }

  return [r / 255, g / 255, b / 255];
}

export default function FloatingLines({
  linesGradient,
  gradientStart,
  gradientMid,
  gradientEnd,
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [6],
  lineDistance = [5],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = 'screen'
}) {
  const containerRef = useRef(null);
  const targetMouseRef = useRef([-1000, -1000]);
  const currentMouseRef = useRef([-1000, -1000]);
  const targetInfluenceRef = useRef(0);
  const currentInfluenceRef = useRef(0);
  const targetParallaxRef = useRef([0, 0]);
  const currentParallaxRef = useRef([0, 0]);
  const rippleCenterRef = useRef([-1000, -1000]);
  const rippleProgressRef = useRef(-1.0);

  const getLineCount = waveType => {
    if (typeof lineCount === 'number') return lineCount;
    if (!enabledWaves.includes(waveType)) return 0;
    const index = enabledWaves.indexOf(waveType);
    return lineCount[index] ?? 6;
  };

  const getLineDistance = waveType => {
    if (typeof lineDistance === 'number') return lineDistance;
    if (!enabledWaves.includes(waveType)) return 0.1;
    const index = enabledWaves.indexOf(waveType);
    return lineDistance[index] ?? 0.1;
  };

  const topLineCount = enabledWaves.includes('top') ? Math.min(getLineCount('top'), MAX_LINES) : 0;
  const middleLineCount = enabledWaves.includes('middle') ? Math.min(getLineCount('middle'), MAX_LINES) : 0;
  const bottomLineCount = enabledWaves.includes('bottom') ? Math.min(getLineCount('bottom'), MAX_LINES) : 0;

  const topLineDistance = enabledWaves.includes('top') ? getLineDistance('top') * 0.01 : 0.01;
  const middleLineDistance = enabledWaves.includes('middle') ? getLineDistance('middle') * 0.01 : 0.01;
  const bottomLineDistance = enabledWaves.includes('bottom') ? getLineDistance('bottom') * 0.01 : 0.01;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let active = true;
    let isIntersecting = true;
    // Reduced motion: one still frame of the lines, redrawn only when the canvas resizes; the pointer moves nothing.
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ratio = () => Math.min(window.devicePixelRatio || 1, 1.5);
    const lerp = (current, target, amount) => { current[0] += (target[0] - current[0]) * amount; current[1] += (target[1] - current[1]) * amount; };

    // The fixed uniforms: the waves, their lines and the gradient.
    const stops = (linesGradient || [gradientStart, gradientMid, gradientEnd].filter(Boolean)).slice(0, MAX_GRADIENT_STOPS);
    const gradient = new Float32Array(MAX_GRADIENT_STOPS * 3).fill(1);
    stops.forEach((hex, i) => gradient.set(hexToVec3(hex), i * 3));
    const fixed = {
      animationSpeed,
      enableTop: enabledWaves.includes('top'), enableMiddle: enabledWaves.includes('middle'), enableBottom: enabledWaves.includes('bottom'),
      topLineCount, middleLineCount, bottomLineCount,
      topLineDistance, middleLineDistance, bottomLineDistance,
      topWavePosition: [topWavePosition?.x ?? 10.0, topWavePosition?.y ?? 0.5, topWavePosition?.rotate ?? -0.4],
      middleWavePosition: [middleWavePosition?.x ?? 5.0, middleWavePosition?.y ?? 0.0, middleWavePosition?.rotate ?? 0.2],
      bottomWavePosition: [bottomWavePosition?.x ?? 2.0, bottomWavePosition?.y ?? -0.7, bottomWavePosition?.rotate ?? 0.4],
      interactive, bendRadius, bendStrength, parallax, parallaxStrength,
      lineGradient: gradient, lineGradientCount: stops.length,
    };

    let canvas = null;
    let renderer = null;
    let raf = 0;
    // Shader time carries across a freed and remade context, so the lines resume where they were.
    let elapsed = 0;
    let last = 0;
    // Without WebGL the still CSS light stays; the lines do not retry on every approach.
    let unavailable = false;

    const setSize = () => {
      if (!renderer) return;
      const width = Math.max(1, Math.round((container.clientWidth || 1) * ratio()));
      const height = Math.max(1, Math.round((container.clientHeight || 1) * ratio()));
      renderer.resize(width, height);
      renderer.set('iResolution', [width, height, 1]);
      if (still) draw();
    };

    const draw = () => {
      renderer.set('iTime', still ? STILL_TIME : elapsed);
      renderer.set('iMouse', currentMouseRef.current);
      renderer.set('bendInfluence', currentInfluenceRef.current);
      renderer.set('parallaxOffset', currentParallaxRef.current);
      renderer.set('u_rippleProgress', rippleProgressRef.current);
      renderer.set('u_rippleCenter', rippleCenterRef.current);
      renderer.render();
    };

    const renderLoop = (now) => {
      raf = 0;
      if (!active || !renderer) return;
      raf = requestAnimationFrame(renderLoop);
      const step = last ? Math.min(now - last, 100) / 1000 : 0;
      last = now;
      if (!isIntersecting) return;
      elapsed += step;

      if (interactive) {
        lerp(currentMouseRef.current, targetMouseRef.current, mouseDamping);
        currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
      }
      if (parallax) lerp(currentParallaxRef.current, targetParallaxRef.current, mouseDamping);
      if (rippleProgressRef.current >= 0.0 && rippleProgressRef.current < 1.5) rippleProgressRef.current += 0.025 * animationSpeed;
      else rippleProgressRef.current = -1.0;
      draw();
    };

    const onLost = (event) => { event.preventDefault(); teardown(); container.dataset.webgl = 'false'; };

    // Without WebGL (disabled, blocked or lost) the lines give way to a still CSS light instead of taking the page down.
    const boot = () => {
      if (renderer || !active || unavailable) return;
      canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.addEventListener('webglcontextlost', onLost);
      try {
        renderer = createLinesRenderer(canvas, fragmentShader);
        if (!renderer) throw new Error('FloatingLines: WebGL unavailable');
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.warn(error);
        renderer = null;
        canvas = null;
        unavailable = true;
        container.dataset.webgl = 'false';
        return;
      }
      container.appendChild(canvas);
      container.dataset.webgl = 'true';
      Object.entries(fixed).forEach(([name, value]) => renderer.set(name, value));
      setSize();
      last = 0;
      if (still) draw();
      else raf = requestAnimationFrame(renderLoop);
    };

    function teardown() {
      cancelAnimationFrame(raf);
      raf = 0;
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', onLost);
        canvas.remove();
      }
      renderer?.destroy();
      renderer = null;
      canvas = null;
    }

    // Two distances: drawing pauses as soon as the lines leave the screen; the context goes when they are a screen away.
    const visible = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(records => { isIntersecting = records[records.length - 1].isIntersecting; }, { threshold: 0 })
      : null;
    const near = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(records => { if (records[records.length - 1].isIntersecting) boot(); else teardown(); }, { rootMargin: NEAR })
      : null;
    // Already near (the hero at load): make the context now rather than on the observer's first report.
    const box = container.getBoundingClientRect();
    if (!near || (box.bottom >= -window.innerHeight && box.top <= window.innerHeight * 2)) boot();
    visible?.observe(container);
    near?.observe(container);

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { if (active) setSize(); }) : null;
    ro?.observe(container);

    // Touch never bends, ripples or shifts the lines (see heroPointer.js); a mouse or a pen still does.
    const handlePointerMove = event => {
      if (!canvas || !answersPointer(event)) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dpr = ratio();

      targetMouseRef.current = [x * dpr, (rect.height - y) * dpr];
      targetInfluenceRef.current = 1.0;

      if (parallax) {
        const offsetX = (x - rect.width / 2) / rect.width;
        const offsetY = -(y - rect.height / 2) / rect.height;
        targetParallaxRef.current = [offsetX * parallaxStrength, offsetY * parallaxStrength];
      }
    };

    const handlePointerLeave = () => {
      targetInfluenceRef.current = 0.0;
    };

    const handlePointerDown = event => {
      if (!canvas || !answersPointer(event)) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = ratio();
      rippleCenterRef.current = [(event.clientX - rect.left) * dpr, (rect.height - (event.clientY - rect.top)) * dpr];
      rippleProgressRef.current = 0.0;
    };

    // Window listeners, so overlays above the canvas never block the pointer.
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    if (interactive) container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      active = false;
      visible?.disconnect();
      near?.disconnect();
      ro?.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (interactive) container.removeEventListener('pointerleave', handlePointerLeave);
      teardown();
    };
  }, [
    topLineCount,
    middleLineCount,
    bottomLineCount,
    topLineDistance,
    middleLineDistance,
    bottomLineDistance,
    linesGradient,
    gradientStart,
    gradientMid,
    gradientEnd,
    enabledWaves,
    lineCount,
    lineDistance,
    topWavePosition,
    middleWavePosition,
    bottomWavePosition,
    animationSpeed,
    interactive,
    bendRadius,
    bendStrength,
    mouseDamping,
    parallax,
    parallaxStrength
  ]);

  return (
    <div
      ref={containerRef}
      className="floating-lines-container"
      style={{
        mixBlendMode: mixBlendMode
      }}
    />
  );
}
