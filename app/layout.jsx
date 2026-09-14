import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import CookieBanner from '../components/CookieBanner';

export const metadata = {
  metadataBase: new URL('https://neuralbi.com'),
  title: {
    default: 'NeuralBI - Make your data think.',
    template: '%s | NeuralBI',
  },
  description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems. Turn static data into a living, cognitive asset for your enterprise.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'NeuralBI - Make your data think.',
    description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems. Turn static data into a living, cognitive asset for your enterprise.',
    url: 'https://neuralbi.com',
    siteName: 'NeuralBI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NeuralBI - High-Performance BI, Power Platform & AI Ecosystems',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralBI - Make your data think.',
    description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Sora:wght@400;500;600;700;800&family=Schibsted+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
