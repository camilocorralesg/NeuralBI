'use client';

import { useEffect, useReducer, useState } from 'react';

/**
 * Code that stays out of the first load: a chunk fetched on demand whose exports are kept once they arrive, so every
 * later render (and every other component asking for it) has them in the same pass, without a Suspense fallback.
 * The server and the first client render never have it, so hydration always matches. A failed fetch may be retried.
 */
export function lazyModule(load) {
  let value = null;
  let promise = null;
  return {
    get current() { return value; },
    load() {
      promise ??= load().then(
        (exports) => (value = exports),
        (error) => { promise = null; throw error; },
      );
      return promise;
    },
  };
}

const ignore = () => {};

/** The chunk's exports once loaded (null until then); fetches it while `wanted`. */
export function useLazyModule(chunk, wanted = true) {
  const [, arrived] = useReducer((n) => n + 1, 0);
  const value = chunk?.current ?? null;
  useEffect(() => {
    if (!wanted || !chunk || value) return undefined;
    let alive = true;
    chunk.load().then(() => alive && arrived(), ignore);
    return () => { alive = false; };
  }, [chunk, wanted, value]);
  return value;
}

/**
 * True from the moment the element comes within `margin` of the viewport, and from then on: early enough that what it
 * loads is in place before the reader arrives. An element that is not displayed (a layout hidden at this width) never
 * comes near, so it never loads.
 */
export function useNear(ref, margin = '100% 0px') {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setNear(true); return undefined; }
    const observer = new IntersectionObserver((records) => {
      if (records.some((record) => record.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: margin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, margin]);
  return near;
}

/** Runs a task once the browser is idle (or soon, where it cannot say). */
export const whenIdle = (task) => (typeof requestIdleCallback === 'function' ? requestIdleCallback(task, { timeout: 4000 }) : setTimeout(task, 1500));
