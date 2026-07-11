'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'dark' | 'light';

/**
 * Flips data-theme on <html> and persists the choice. The attribute is set
 * pre-hydration by the inline script in layout.tsx (localStorage, falling
 * back to prefers-color-scheme), so there's no flash of the wrong theme.
 * The icon renders empty until mounted — the server can't know the stored
 * theme, and guessing would cause a hydration mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage unavailable (private browsing) — theme still applies for this page load.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mounted ? (
        theme === 'dark' ? (
          <Sun size={18} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Moon size={18} strokeWidth={1.5} aria-hidden="true" />
        )
      ) : (
        <span style={{ width: 18, height: 18, display: 'block' }} aria-hidden="true" />
      )}
    </button>
  );
}
