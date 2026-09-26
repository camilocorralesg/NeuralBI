import { useEffect, useState } from 'react';

/**
 * Walks a product mockup through its beats (`[{ id, duration }]`, milliseconds) while `live`, looping forever.
 * CSS transitions do the motion; React only changes beat a handful of times per loop.
 * When not live (offscreen, paused, reduced motion) it rests on the last beat: the resolved state.
 */
export function useStoryline(beats, live) {
  const last = beats.length - 1;
  const [index, setIndex] = useState(live ? 0 : last);

  useEffect(() => {
    if (!live) {
      setIndex(last);
      return undefined;
    }
    let current = 0;
    let timer;
    setIndex(0);
    const next = () => {
      timer = setTimeout(() => {
        current = (current + 1) % beats.length;
        setIndex(current);
        next();
      }, beats[current].duration);
    };
    next();
    return () => clearTimeout(timer);
  }, [beats, last, live]);

  return beats[index].id;
}

/**
 * Counts the pieces of work that land within the current beat (words, form fields, tool replies): 0 when the beat
 * starts, up to `limit`, one every `every` ms. The count belongs to its beat, so a new beat never renders with the
 * previous beat's count. When not live everything has landed.
 */
export function useBeatSteps(phase, live, limit, every) {
  const [progress, setProgress] = useState({ phase: null, step: 0 });
  useEffect(() => {
    if (!live) return undefined;
    setProgress({ phase, step: 0 });
    const timer = setInterval(() => setProgress(current => ({
      phase,
      step: Math.min((current.phase === phase ? current.step : 0) + 1, limit),
    })), every);
    return () => clearInterval(timer);
  }, [live, phase, limit, every]);
  if (!live) return Infinity;
  return progress.phase === phase ? progress.step : 0;
}
