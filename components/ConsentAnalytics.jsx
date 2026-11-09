'use client';

import { Analytics } from '@vercel/analytics/next';
import { analyticsAllowed } from '../lib/consent';

// Vercel Web Analytics, honouring the cookie notice: every event is dropped once the visitor declines. The choice is
// read at send time, so declining takes effect at once, without a reload.
export default function ConsentAnalytics() {
  return <Analytics beforeSend={(event) => (analyticsAllowed() ? event : null)} />;
}
