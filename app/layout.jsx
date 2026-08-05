import './globals.css';

export const metadata = {
  title: 'NeuralBI - Make your data think.',
  description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems. Turn static data into a living, cognitive asset for your enterprise.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'NeuralBI - Make your data think.',
    description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems. Turn static data into a living, cognitive asset for your enterprise.',
    url: 'https://neuralbi.com',
    siteName: 'NeuralBI',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'NeuralBI - Make your data think.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralBI - Make your data think.',
    description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems.',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Sora:wght@400;500;600;700;800&family=Schibsted+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
