// WebGL renderer for AuroraField: one full-screen triangle and a fragment shader that paints a
// domain-warped light mass. Kept free of React so the component only owns lifecycle and pacing.

const VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * .5 + .5;
  gl_Position = vec4(position, 0., 1.);
}
`;

/*
 * The light, in section space (y up):
 * - a streak on the hero's diagonal, high on the left and falling to the right;
 * - two blooms rising from the lower corners.
 * They breathe against each other on an 18s swell, so the field floods and recedes instead of looping.
 * Everything rides a slow fbm warp, then maps through one ramp built from the accent:
 * black → forest → olive → accent → pale accent. Both section edges fade to pure black.
 */
const FRAGMENT = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uAccent;
uniform float uIntensity;
// The content's box in uv (x0, y0, x1, y1, y up); the light thins out inside it. Zero area disables it.
uniform vec4 uClear;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p) {
  float value = 0.;
  float amplitude = .5;
  mat2 turn = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = turn * p;
    amplitude *= .5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  // Geometry lives in units of the shorter side, so the diagonal keeps the hero's slope and the
  // blooms keep their size on a wide desktop band and on a tall phone column alike.
  float unit = min(uResolution.x, uResolution.y);
  vec2 P = (uv - .5) * uResolution / unit;
  vec2 p = P * 1.6;
  float t = uTime;

  vec2 q = vec2(fbm(p + vec2(0., t * .045)), fbm(p + vec2(5.2, -t * .038)));
  vec2 warp = (q - .5);
  float grain = fbm(p * 1.3 + warp * 2.2 + vec2(t * .025, -t * .02));
  float swell = .5 + .5 * sin(t * .35);

  // The streak: the hero's light, liquefied. It crosses the middle of the band, falling left to right.
  float d = P.y - (-.1 - .3 * P.x + warp.y * .2);
  float width = .055 + .035 * grain;
  float streak = exp(-d * d / (2. * width * width));
  float core = exp(-d * d / (2. * .012 * .012 + .02 * grain * grain));

  // The blooms: light welling up from the lower corners, pushed around by the warp.
  // Horizontally they hug the edges; vertically they sit at fixed heights of the band, clear of the seam fade.
  vec2 extent = .5 * uResolution / unit;
  vec2 left = (P - vec2(-extent.x - .1, (.22 - .5) * 2. * extent.y) - warp * .2) * vec2(1., 1.9);
  vec2 right = (P - vec2(extent.x + .1, (.3 - .5) * 2. * extent.y) - warp * .2) * vec2(1., 1.7);
  float blooms = exp(-dot(left, left) * 4.2) + .85 * exp(-dot(right, right) * 4.6);

  float light = streak * (.34 + .26 * swell) + core * .3 * (.3 + .7 * swell) + blooms * (.3 + .42 * (1. - swell));
  light *= .62 + .6 * grain;
  light *= smoothstep(0., .16, uv.y) * smoothstep(1., .84, uv.y) * uIntensity;

  // The clearing: a soft rounded box around the content, so the light flows around it, not across it.
  vec2 clearCenter = (uClear.xy + uClear.zw) * .5 * uResolution / unit - .5 * uResolution / unit;
  vec2 clearHalf = abs(uClear.zw - uClear.xy) * .5 * uResolution / unit;
  vec2 outside = abs(P - clearCenter) - clearHalf + .1;
  float boxDistance = length(max(outside, 0.)) + min(max(outside.x, outside.y), 0.) - .1;
  float clearing = (clearHalf.x > 0.) ? mix(.5, 1., smoothstep(-.1, .14, boxDistance + warp.x * .06)) : 1.;
  light *= clearing;

  vec3 forest = uAccent * vec3(.1, .2, .04);
  vec3 olive = uAccent * .52;
  vec3 pale = mix(uAccent, vec3(1.), .62);
  vec3 color = mix(vec3(0.), forest, smoothstep(.02, .3, light));
  color = mix(color, olive, smoothstep(.24, .62, light));
  color = mix(color, uAccent, smoothstep(.58, .95, light));
  color = mix(color, pale, smoothstep(.95, 1.35, light));

  // Dither so the long dark ramps never band.
  color += (hash(gl_FragCoord.xy + fract(t)) - .5) / 128.;
  gl_FragColor = vec4(max(color, 0.), 1.);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`AuroraField shader: ${log}`);
  }
  return shader;
}

/** Returns a renderer bound to `canvas`, or null when WebGL is unavailable. */
export function createAuroraRenderer(canvas) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(`AuroraField program: ${gl.getProgramInfoLog(program)}`);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name) => gl.getUniformLocation(program, name);
  const uResolution = uniform('uResolution');
  const uTime = uniform('uTime');
  const uAccent = uniform('uAccent');
  const uIntensity = uniform('uIntensity');
  const uClear = uniform('uClear');
  gl.uniform4f(uClear, 0, 0, 0, 0);

  return {
    resize(width, height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolution, width, height);
    },
    setColor([r, g, b], intensity) {
      gl.uniform3f(uAccent, r, g, b);
      gl.uniform1f(uIntensity, intensity);
    },
    /** The box to keep clear, in uv of the canvas (y up). */
    setClearing(x0, y0, x1, y1) {
      gl.uniform4f(uClear, x0, y0, x1, y1);
    },
    render(seconds) {
      gl.uniform1f(uTime, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
