'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The visitor's reduced-motion setting, in a form the server can agree with: false through hydration (the server
 * cannot know the setting), the real value once mounted. Branching render output on framer's useReducedMotion directly
 * makes the first client render differ from the server's HTML, and React then re-renders the whole tree.
 */
export default function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted && Boolean(reduce);
}
