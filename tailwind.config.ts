import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Used by the legal pages only — home/quote use their own CSS files.
      ink: 'var(--color-ink)',
      surface: 'var(--color-surface)',
      line: 'var(--color-line)',
      haze: 'var(--color-haze)',
      paper: 'var(--color-paper)',
      blue: 'var(--color-blue)',
      'blue-deep': 'var(--color-blue-deep)',
      amber: 'var(--color-amber)',
    },
    fontFamily: {
      display: ['var(--font-display)', 'sans-serif'],
      body: ['var(--font-body)', 'sans-serif'],
      mono: ['var(--font-mono)', 'monospace'],
    },
    fontSize: {
      xs: ['12px', { lineHeight: '1.5' }],
      sm: ['14px', { lineHeight: '1.6' }],
      base: ['16px', { lineHeight: '1.65' }],
      lg: ['20px', { lineHeight: '1.5' }],
      xl: ['28px', { lineHeight: '1.25' }],
      '2xl': ['40px', { lineHeight: '1.15' }],
      '3xl': ['64px', { lineHeight: '1.05' }],
    },
    extend: {
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
