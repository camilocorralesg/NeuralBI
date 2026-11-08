// A minimal WebGL renderer for one full-screen fragment shader (the hero's FloatingLines). It replaced three.js, which
// the hero loaded only to draw this one quad: a WebGLRenderer, a scene, a camera and a mesh for two triangles.

const VERTEX = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`FloatingLines shader: ${log}`);
  }
  return shader;
}

/**
 * Binds `fragment` (GLSL ES 1.00, so it runs in WebGL 1 and 2) to `canvas`. Returns null without WebGL; throws when the
 * shader does not compile, so the caller can fall back to its still CSS light.
 *
 * - `set(name, value)`: a number (float, int or bool by the uniform's own type), [x, y], [x, y, z], or a flat array for
 *   a vec3[] uniform.
 * - `resize(width, height)`: the drawing buffer, in device pixels.
 */
export function createLinesRenderer(canvas, fragment) {
  const options = { antialias: true, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' };
  const gl = canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);
  if (!gl) return null;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(`FloatingLines program: ${gl.getProgramInfoLog(program)}`);
  gl.useProgram(program);

  // One triangle that covers the clip space.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  // Every active uniform, by name, with its type, so callers pass plain values.
  const uniforms = new Map();
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    const name = info.name.replace(/\[0\]$/, '');
    uniforms.set(name, { location: gl.getUniformLocation(program, info.name), type: info.type });
  }

  const set = (name, value) => {
    const uniform = uniforms.get(name);
    if (!uniform) return;
    const { location, type } = uniform;
    if (type === gl.FLOAT) gl.uniform1f(location, value);
    else if (type === gl.INT || type === gl.BOOL) gl.uniform1i(location, Number(value));
    else if (type === gl.FLOAT_VEC2) gl.uniform2f(location, value[0], value[1]);
    else if (type === gl.FLOAT_VEC3) gl.uniform3fv(location, value);
  };

  return {
    set,
    resize(width, height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    },
    render() {
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
