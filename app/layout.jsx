import './globals.css';

export const metadata = {
  metadataBase: new URL('https://neuralbi.com'),
  title: 'NeuralBI - Make your data think.',
  description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems. Turn static data into a living, cognitive asset for your enterprise.',
  icons: {
    icon: [
      { url: '/assets/Neuralbi%20logo%20solo.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/assets/Neuralbi%20logo%20solo.png',
    apple: '/assets/Neuralbi%20logo%20solo.png',
  },
  openGraph: {
    title: 'NeuralBI - Make your data think.',
    description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems. Turn static data into a living, cognitive asset for your enterprise.',
    url: 'https://neuralbi.com',
    siteName: 'NeuralBI',
    images: [
      {
        url: '/assets/Neuralbi%20logo%20solo.png',
        width: 709,
        height: 709,
        alt: 'NeuralBI Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralBI - Make your data think.',
    description: 'We architect high-performance Business Intelligence, Power Platform, and AI ecosystems.',
    images: ['/assets/Neuralbi%20logo%20solo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/Neuralbi%20logo%20solo.png" />
        <link rel="apple-touch-icon" href="/assets/Neuralbi%20logo%20solo.png" />
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
