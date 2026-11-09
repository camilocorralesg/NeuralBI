import './globals.css';
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import ConsentAnalytics from '../components/ConsentAnalytics';
import CookieBanner from '../components/CookieBanner';
import MotionProvider from '../components/MotionProvider';
import NeuralBIIntro from '../components/intro/NeuralBIIntro';
import { INTRO_BOOTSTRAP } from '../components/intro/choreography';
import { CONSENT_BOOTSTRAP } from '../lib/consent';
import { LanguageProvider } from '../context/LanguageContext';

// The three families, self-hosted by next/font (no third-party stylesheet, no render-blocking request). Variable
// files: DM Sans keeps its optical-size axis and its italic, so a 5rem headline draws the 40pt cut and body copy the
// 14pt cut, exactly as before. app/globals.css maps these variables onto the --font-* tokens.
const dmSans = DM_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// The mono only labels drawings below the hero, so it is not preloaded: its 40 KB would compete with the first
// screen's CSS and faces on a slow connection.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
});

export const metadata = {
  metadataBase: new URL('https://neuralbi.com'),
  title: {
    default: 'NeuralBI | Microsoft data & AI consulting: Power BI, Power Platform and Fabric',
    template: '%s | NeuralBI',
  },
  description: 'Microsoft data and AI consulting: Business Intelligence with Power BI, business apps and AI agents on Power Platform and Microsoft Fabric, in production in weeks.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'NeuralBI | Microsoft data & AI consulting',
    description: 'Data platforms, business apps and AI agents on Power Platform and Microsoft Fabric, in production in weeks.',
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
    title: 'NeuralBI | Microsoft data & AI consulting',
    description: 'Data platforms, business apps and AI agents on Power Platform and Microsoft Fabric.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP }} />
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }} />
        <link rel="icon" type="image/svg+xml" href="/NeuralBI/favicon.svg" />
        <link rel="icon" type="image/png" href="/NeuralBI/favicon.png" />
        <link rel="apple-touch-icon" href="/NeuralBI/apple-touch-icon.png" />
      </head>
      <body>
        <NeuralBIIntro />
        <LanguageProvider>
          <MotionProvider>
            {children}
            <CookieBanner />
          </MotionProvider>
        </LanguageProvider>
        <ConsentAnalytics />
      </body>
    </html>
  );
}
