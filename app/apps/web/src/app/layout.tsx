import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { myfashionTheme } from '@/lib/mantine-theme';
import { MobileShell } from '@/components/MobileShell';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VTON Atelier | Luxury Virtual Try-On',
  description: 'AI-powered virtual fitting room for luxury ethnic & western wear',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${inter.variable}`}>
      <head>
        <ColorSchemeScript />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: '#FAF8F5', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <MantineProvider theme={myfashionTheme} defaultColorScheme="light">
          <MobileShell>{children}</MobileShell>
        </MantineProvider>
      </body>
    </html>
  );
}
