// The outline of a rounded box as an SVG path, clockwise from the end of the top-left corner: the track EdgeBeam's comet
// runs on. Measured in CSS pixels of the box; the radius is clamped to half the shorter side, as a border radius is.
// A measured path() works wherever CSS motion paths do (Safari 16+), where `offset-path: inset(… round …)` needs an
// engine that supports basic shapes in motion paths, which some Safari versions in use still do not.
export function roundedRectPath(width, height, radius) {
  const w = Math.max(0, width);
  const h = Math.max(0, height);
  const r = Math.max(0, Math.min(radius || 0, w / 2, h / 2));
  const n = (value) => Math.round(value * 100) / 100;
  return `M ${n(r)} 0 H ${n(w - r)} A ${n(r)} ${n(r)} 0 0 1 ${n(w)} ${n(r)} V ${n(h - r)} A ${n(r)} ${n(r)} 0 0 1 ${n(w - r)} ${n(h)} H ${n(r)} A ${n(r)} ${n(r)} 0 0 1 0 ${n(h - r)} V ${n(r)} A ${n(r)} ${n(r)} 0 0 1 ${n(r)} 0 Z`;
}
