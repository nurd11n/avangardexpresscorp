'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import styles from '@/styles/home.module.css';

const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#coverage', label: 'Coverage' },
  { href: '#why', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark} />
          Avangard Express
        </Link>
        <div className={styles.navLinks}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        {/* Hidden below 820px — the mobile header row is already full, so
            the toggle lives in the slide-down panel there instead. */}
        <ThemeToggle className={`${styles.themeBtn} ${styles.headerTheme}`} />
        <Link href="/quote" className={styles.navCta}>
          Get a Quote
        </Link>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>
      {open && (
        <div className={styles.mobilePanel} id="mobile-nav">
          <nav>
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <Link href="/quote" className={styles.navCta} onClick={() => setOpen(false)}>
              Get a Quote
            </Link>
            <div className={styles.panelThemeRow}>
              <span>Appearance</span>
              <ThemeToggle className={styles.themeBtn} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
