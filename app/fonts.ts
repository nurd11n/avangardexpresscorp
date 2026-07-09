import localFont from 'next/font/local';

export const display = localFont({
  src: [
    { path: '../src/fonts/overpass-latin-600.woff2', weight: '600', style: 'normal' },
    { path: '../src/fonts/overpass-latin-700.woff2', weight: '700', style: 'normal' },
    { path: '../src/fonts/overpass-cyrillic-600.woff2', weight: '600', style: 'normal' },
    { path: '../src/fonts/overpass-cyrillic-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});

// Public Sans has no Cyrillic subset; RU body text falls back to system sans.
export const body = localFont({
  src: [
    { path: '../src/fonts/public-sans-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../src/fonts/public-sans-latin-500.woff2', weight: '500', style: 'normal' },
  ],
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
