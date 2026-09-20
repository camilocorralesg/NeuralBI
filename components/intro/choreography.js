// Coordinates are reveal guides over the original artwork, not replacement geometry.
export const NODES = [
  [16.14, 35.14], [56.28, 67.30], [102.21, 102.54], [145.22, 134.87],
  [16.14, 83.82], [16.14, 129.20], [145.22, 43.40], [145.22, 88.83],
  [56.28, 16.19], [102.21, 61.68], [102.21, 16.19],
  [102.21, 153.87], [56.28, 108.44], [56.28, 153.87],
];

export const BRANCHES = [
  'M16.14 35.14 L56.28 67.30 L102.21 102.54 L145.22 134.87',
  'M16.14 83.82 L16.14 129.20',
  'M145.22 43.40 L145.22 88.83',
  'M56.28 16.19 L102.21 61.68 L102.21 16.19',
  'M102.21 153.87 L56.28 108.44 L56.28 153.87',
];

export const INTRO_DURATION = 1.75;
export const REDUCED_DURATION = 0.18;
export const SESSION_KEY = 'neuralbi-intro-seen';
export const progress = (time, start, duration) =>
  Math.max(0, Math.min(1, (time - start) / duration));
export const easeOut = (value) => 1 - Math.pow(1 - value, 4);
export const easeInOut = (value) => value < 0.5
  ? 8 * Math.pow(value, 4) : 1 - Math.pow(-2 * value + 2, 4) / 2;

const signalNodes = NODES.slice(0, 4);
const lengths = signalNodes.slice(1).map((point, i) =>
  Math.hypot(point[0] - signalNodes[i][0], point[1] - signalNodes[i][1]));
const totalLength = lengths.reduce((sum, length) => sum + length, 0);
export const SIGNAL_ARRIVALS = [0, lengths[0], lengths[0] + lengths[1], totalLength]
  .map(distance => 0.58 + distance / totalLength * 0.39);

export function signalPosition(time) {
  let distance = progress(time, 0.58, 0.39) * totalLength;
  for (let i = 0; i < lengths.length; i++) {
    if (distance <= lengths[i] || i === lengths.length - 1) {
      const ratio = distance / lengths[i];
      return [
        signalNodes[i][0] + (signalNodes[i + 1][0] - signalNodes[i][0]) * ratio,
        signalNodes[i][1] + (signalNodes[i + 1][1] - signalNodes[i][1]) * ratio,
      ];
    }
    distance -= lengths[i];
  }
  return [...signalNodes[3]];
}

// Executes before first paint. With JS disabled the homepage stays visible.
// The independent watchdog fails open even if hydration or the bundle fails.
export const INTRO_BOOTSTRAP = `(()=>{try{
  const path=location.pathname;
  const isHome=path==='/NeuralBI'||path==='/NeuralBI/'||path==='/';
  if(!isHome||location.hash||sessionStorage.getItem('${SESSION_KEY}')==='true'||
    performance.getEntriesByType('navigation')[0]?.type==='back_forward')return;
  const root=document.documentElement;
  root.dataset.neuralbiIntro='pending';
  root.dataset.neuralbiIntroStart=String(Date.now());
  window.setTimeout(()=>{if(root.dataset.neuralbiIntro==='pending'||root.dataset.neuralbiIntro==='active'){
    root.dataset.neuralbiIntro='done';
    document.dispatchEvent(new Event('neuralbi:intro-timeout'));
  }},3500);
}catch{}})();`;
