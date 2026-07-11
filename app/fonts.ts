import { Oswald, Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Oswald has no Cyrillic subset; RU headings fall back to system sans —
// same pattern this file already used for the previous display/body fonts.
export const display = Oswald({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const body = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const mono = localFont({
  src: [
    { path: '../src/fonts/jetbrains-mono-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../src/fonts/jetbrains-mono-latin-500.woff2', weight: '500', style: 'normal' },
    { path: '../src/fonts/jetbrains-mono-cyrillic-400.woff2', weight: '400', style: 'normal' },
    { path: '../src/fonts/jetbrains-mono-cyrillic-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});
