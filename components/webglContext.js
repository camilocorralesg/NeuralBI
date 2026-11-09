// WebGL only where a GPU draws it. Without one (a server, a virtual machine, a blocklisted driver) Chrome and Firefox
// still hand out a context, drawn on the CPU (SwiftShader, Microsoft Basic Render Driver, llvmpipe). A full-screen
// shader there takes the whole main thread: the page stops answering, and Lighthouse / PageSpeed Insights time out on
// it (DEADLINE_EXCEEDED). Every effect gets its context here, and without a GPU keeps its still CSS fallback.

const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen/i;
// Once one effect has met a CPU renderer, the others skip the probe (each would make a context only to drop it).
let software = false;

/** Whether a WebGL renderer name belongs to a CPU rasteriser. */
export function isSoftwareRenderer(name) {
  return SOFTWARE.test(String(name || ''));
}

/**
 * The first of `types` (e.g. ['webgl2', 'webgl']) that the GPU draws, or null.
 *
 * Two checks, because neither covers every case alone: `failIfMajorPerformanceCaveat` makes Chrome and Firefox refuse
 * the context when they fall back to the CPU on their own; the renderer's name catches a CPU renderer chosen up front
 * (Chrome started with `--use-angle=swiftshader`), which the attribute lets through.
 */
export function hardwareContext(canvas, types, options = {}) {
  if (software) return null;
  const attributes = { ...options, failIfMajorPerformanceCaveat: true };
  let gl = null;
  for (const type of types) {
    gl = canvas.getContext(type, attributes);
    if (gl) break;
  }
  if (!gl) return null;
  // Chrome and Safari report a masked "WebKit WebGL" here; the real name sits behind the debug extension. Firefox
  // reports its (sanitised) renderer directly and warns when that extension is used.
  let name = gl.getParameter(gl.RENDERER);
  if (/^webkit webgl$/i.test(String(name))) {
    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    if (debug) name = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
  }
  if (isSoftwareRenderer(name)) {
    software = true;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return null;
  }
  return gl;
}
