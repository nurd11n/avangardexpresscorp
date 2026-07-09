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
      ink: '#0B0D10',
      surface: '#14181E',
      line: '#232A33',
      haze: '#8B949E',
      paper: '#F5F7F8',
      blue: '#3E9BCB',
      'blue-deep': '#1D5F82',
      amber: '#F2A83B',
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
