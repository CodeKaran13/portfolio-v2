import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  themeColor: '#171c26',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://codekarangames.dev'),
  title: 'Karan Nandkar — Senior Gameplay Engineer',
  description:
    'Senior Gameplay Engineer with 9 years shipping mobile and PC games. Multiplayer architecture, gameplay systems, and mobile performance. Open to Lead roles — remote or visa-sponsored relocation.',
  authors: [{ name: 'Karan Nandkar' }],
  robots: { index: true, follow: true },
  keywords: [
    'gameplay engineer',
    'multiplayer',
    'Unreal Engine 5',
    'Unity',
    'C++',
    'C#',
    'mobile performance',
    'game developer',
    'Mumbai',
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/og-image.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://codekarangames.dev',
    title: 'Karan Nandkar — Senior Gameplay Engineer',
    description:
      'I build systems that scale — not features that break later. Multiplayer architecture, gameplay systems, mobile performance. Open to Lead roles.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    siteName: 'Karan Nandkar · Gameplay Engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karan Nandkar — Senior Gameplay Engineer',
    description:
      'I build systems that scale — not features that break later. Multiplayer architecture, gameplay systems, mobile performance.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
