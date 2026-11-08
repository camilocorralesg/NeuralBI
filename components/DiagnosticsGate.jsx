'use client';

import React, { lazy, Suspense, useEffect, useState } from 'react';

// The render diagnostics panel, loaded on demand: only when the URL carries `?diag`, so visitors never download it.
const RenderDiagnostics = lazy(() => import('./RenderDiagnostics'));

export default function DiagnosticsGate() {
  const [requested, setRequested] = useState(false);
  // Read after mount: the server cannot see the query, and the first client render must match its HTML.
  useEffect(() => { setRequested(new URLSearchParams(window.location.search).has('diag')); }, []);
  return requested ? <Suspense fallback={null}><RenderDiagnostics /></Suspense> : null;
}
