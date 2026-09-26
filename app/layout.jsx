import './globals.css';
import { DM_Sans, Inter, JetBrains_Mono, Montserrat } from 'next/font/google';
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

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://neuralbi.com'),
  title: {
    default: 'NeuralBI - Make your data think. | Business Intelligence & Power Platform Architecture',
    template: '%s | NeuralBI',
  },
  description: 'We architect high-performance Business Intelligence, Power Platform, and Microsoft Fabric ecosystems. Turn static enterprise data into real-time dashboards and autonomous AI workflows.',
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
    <html lang="en" className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP }} />
        <link rel="icon" type="image/svg+xml" href="/NeuralBI/favicon.svg" />
        <link rel="icon" type="image/png" href="/NeuralBI/favicon.png" />
        <link rel="apple-touch-icon" href="/NeuralBI/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet" />
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
