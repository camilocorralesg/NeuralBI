import path from 'path';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/NeuralBI',
  reactStrictMode: true,
  // No experimental.inlineCss: Next 15 writes the CSS into the HTML twice (a <style> and again in the RSC payload), so
  // the document grew from 44 KB to 113 KB gzip and Lighthouse's mobile FCP got worse (median 2.7 s against 1.7 s with
  // the five stylesheets). See DESIGN.md, What loads, and when.
  async redirects() {
    return [
      {
        source: '/',
        destination: '/NeuralBI',
        basePath: false,
        permanent: false,
      },
      {
        source: '/favicon.ico',
        destination: '/NeuralBI/favicon.ico',
        basePath: false,
        permanent: false,
      },
      {
        source: '/favicon.png',
        destination: '/NeuralBI/favicon.png',
        basePath: false,
        permanent: false,
      },
      {
        source: '/favicon.svg',
        destination: '/NeuralBI/favicon.svg',
        basePath: false,
        permanent: false,
      },
      {
        source: '/apple-touch-icon.png',
        destination: '/NeuralBI/apple-touch-icon.png',
        basePath: false,
        permanent: false,
      },
      {
        source: '/og-image.png',
        destination: '/NeuralBI/og-image.png',
        basePath: false,
        permanent: false,
      },
      {
        source: '/assets/:path*',
        destination: '/NeuralBI/assets/:path*',
        basePath: false,
        permanent: false,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@splinetool/react-spline/next'] = path.resolve(
      __dirname,
      'node_modules/@splinetool/react-spline/dist/react-spline-next.js'
    );
    config.resolve.alias['@splinetool/react-spline'] = path.resolve(
      __dirname,
      'node_modules/@splinetool/react-spline/dist/react-spline.js'
    );
    return config;
  },
};

// Development and builds never share an output folder: `next dev` writes to .next-dev, `next build` / `next start`
// to .next. A build (a checklist, another session) can then run while the dev server is up without breaking it.
export default function config(phase) {
  return { ...nextConfig, distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next' };
}
