import './globals.css';
import  Providers  from '../features/Providers'; // Assuming Providers.jsx is in this path

export const metadata = {
  title: 'Bluevest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  themeColor: '#0a1022',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  viewport: 'width=device-width, initial-scale=1',
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
    date: false,
    time: false,
    number: false,
  },
  description: 'Bluevest is a leading investment platform that offers a range of investment plans to help you grow your wealth. Our user-friendly interface and advanced analytics tools make it easy to track your investments and make informed decisions.',
  keywords: 'investment, finance, wealth management, investment plans, portfolio management',
  openGraph: {
    title: 'Bluevest',
    description: 'Bluevest is a leading investment platform that offers a range of investment plans to help you grow your wealth. Our user-friendly interface and advanced analytics tools make it easy to track your investments and make informed decisions.',
    url: 'https://bluevest.com',
    siteName: 'Bluevest',
    images: [
      {
        url: '/dashboard-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Bluevest - Investment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bluevest',
    creator: '@bluevest',
    title: 'Bluevest',
    description: 'Bluevest is a leading investment platform that offers a range of investment plans to help you grow your wealth. Our user-friendly interface and advanced analytics tools make it easy to track your investments and make informed decisions.',
    images: [
      {
        url: '/dashboard-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Bluevest - Investment Platform',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}