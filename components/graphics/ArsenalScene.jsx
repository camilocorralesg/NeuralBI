'use client';

import React from 'react';
import { useLazyModule } from '../lazyModule';
import { arsenalScenes } from './arsenalScenes';

/** One Arsenal product's scene for one chapter; nothing until the scenes have arrived (fetched while `wanted`). */
export default function ArsenalScene({ toolId, chapter, wanted = true }) {
  const Scene = useLazyModule(arsenalScenes, wanted)?.[toolId]?.[chapter];
  return Scene ? <Scene /> : null;
}
