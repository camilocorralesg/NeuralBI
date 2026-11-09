'use client';

import { LazyMotion } from 'framer-motion';

// The page renders framer's light `m` components; what makes them move (animation, gestures, in-view, exit, layout)
// arrives as its own chunk right after hydration. Until then each one holds the state the server drew. A failed fetch
// is tried once more. `strict` makes development throw on a stray full `motion` component, which would pull every
// feature back into the first load.
const loadFeatures = () => import('./motionFeatures')
  .catch(() => import('./motionFeatures'))
  .then((module) => module.default);

export default function MotionProvider({ children }) {
  return <LazyMotion features={loadFeatures} strict>{children}</LazyMotion>;
}
