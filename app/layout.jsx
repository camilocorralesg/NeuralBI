import './globals.css';
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import CookieBanner from '../components/CookieBanner';
import NeuralBIIntro from '../components/intro/NeuralBIIntro';
import { INTRO_BOOTSTRAP } from '../components/intro/choreography';
import { LanguageProvider } from '../context/LanguageContext';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
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
        <link rel="icon" type="image/svg+xml" href="/NeuralBI/favicon.svg" />
        <link rel="icon" type="image/png" href="/NeuralBI/favicon.png" />
        <link rel="apple-touch-icon" href="/NeuralBI/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NeuralBIIntro />
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
