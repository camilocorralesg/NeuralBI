// WebGL renderer for the Shader Button's liquid (after Framer's LiquidGradient): one full-screen triangle and a fragment
// shader that domain-warps the plane, bands it and maps it through a four-step palette. Kept free of React and of the
// engine's pacing: liquidEngine.js owns the one context every button shares.

const VERTEX = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0., 1.);
}
`;

/*
 * The liquid, after the reference: a soft glow of the tone moving slowly through a dark pill, with film grain.
 * - The plane is normalised to the button's width (so a wide button and a short one show the same amount of light) and
 *   turned by the button's seed, so no two buttons flow alike.
 * - A gentle turbulence loop warps it (each step pushes x by a sine of y and y by a sine of x, at rising frequency and
 *   falling amplitude); time drifts every step.
 * - The warped length sets a value that changes by well under one band across the button, so it reads as one light
 *   swelling and sliding, never as stripes.
 * - One soft window of light (about a third of the pill) drifts along the button; outside it the value settles low in
 *   the olive body of the ramp, so the tone never floods the pill.
 * - Grain fixed to the pixel grid is added to the value before it walks the palette (near-black, deep, mid, the tone),
 *   mixed in linear light: the texture lives in the light, the dark stays calm.
 * - Under the label the light is capped at the olive middle of the ramp (and lightly shaded), so white text holds its
 *   contrast in every frame while the light gathers at the ends and along the edges.
 */
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uScrim;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }

void main() {
  vec2 p = (gl_FragCoord.xy * 2. - uResolution) / uResolution.y;
  float aspect = uResolution.x / uResolution.y;
  vec2 unit = vec2(p.x / aspect * 1.8, p.y * .55);

  float angle = uSeed * 2.39996;
  mat2 turn = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 q = turn * (unit * .55) + vec2(cos(uSeed), sin(uSeed)) * 1.7;
  float t = uTime;

  for (int j = 1; j < 5; j++) {
    float f = float(j);
    q.x += .3 / f * sin(f * 1.25 * q.y + t + uSeed);
    q.y += .3 / f * cos(f * 1.25 * q.x + t * .83 + uSeed * 1.7);
  }

  float v = .5 + .5 * sin(length(q) * 2.4 + uSeed * 3.1);
  // The clearing under the label: there the light never climbs past the olive middle of the ramp, so white text holds
  // its contrast in every frame, while the ends and the edges keep the whole glow.
  float middle = exp(-p.y * p.y * 1.6) * (1. - smoothstep(.62, 1.04, abs(p.x) / aspect));
  v = mix(v, min(v, .4), middle);
  // The light window: the glow lives in one soft region, about a third of the pill, that slides along it and leans to
  // the lower edge. Outside it the liquid settles low in the olive body of the ramp, so the tone never floods the pill.
  vec2 across = vec2(p.x / aspect, p.y);
  vec2 windowCenter = vec2(sin(t * .42 + uSeed * 1.3) * .62, -.3 + .22 * sin(t * .31 + uSeed));
  float lit = 1. - smoothstep(.28, 1., length((across - windowCenter) / vec2(.42, 1.2)));
  v = mix(min(v, .14), v, lit);
  v = clamp(v + (hash(gl_FragCoord.xy) - .5) * .2, 0., 1.);

  vec3 color = mix(toLinear(uColor0), toLinear(uColor1), smoothstep(0., .42, v));
  color = mix(color, toLinear(uColor2), smoothstep(.32, .76, v));
  color = mix(color, toLinear(uColor3), smoothstep(.62, 1., v));

  // Exposure and a touch of contrast, as the original grades it.
  color *= 1.1;
  color = mix(vec3(dot(color, vec3(.2126, .7152, .0722))), color, 1.05);

  // A little shade over the clearing, for depth.
  color *= 1. - uScrim * middle;

  gl_FragColor = vec4(pow(max(color, 0.), vec3(1. / 2.2)), 1.);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`LiquidGradient shader: ${log}`);
  }
  return shader;
}

export const LIQUID_FRAGMENT = FRAGMENT;

/** Returns a renderer bound to `canvas`, or null when WebGL is unavailable. */
export function createLiquidRenderer(canvas) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(`LiquidGradient program: ${gl.getProgramInfoLog(program)}`);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = name => gl.getUniformLocation(program, name);
  const u = {
    resolution: uniform('uResolution'), time: uniform('uTime'), seed: uniform('uSeed'), scrim: uniform('uScrim'),
    colors: [uniform('uColor0'), uniform('uColor1'), uniform('uColor2'), uniform('uColor3')],
  };

  return {
    /** Draws one button's liquid into the bottom-left `width` × `height` pixels of the canvas. */
    draw({ width, height, time, seed, palette, scrim = .35 }) {
      gl.viewport(0, 0, width, height);
      gl.uniform2f(u.resolution, width, height);
      gl.uniform1f(u.time, time);
      gl.uniform1f(u.seed, seed);
      gl.uniform1f(u.scrim, scrim);
      palette.forEach((color, index) => gl.uniform3f(u.colors[index], color[0], color[1], color[2]));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
