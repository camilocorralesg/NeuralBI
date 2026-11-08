// The hero's lines answer a mouse or a pen, never a finger. On a phone or a tablet a touch is a scroll or a tap on the
// action, and lines that bend, ripple or shift under it read as a glitch; there the lines keep their own motion only.
export function answersPointer(event) {
  return Boolean(event) && event.pointerType !== 'touch';
}
