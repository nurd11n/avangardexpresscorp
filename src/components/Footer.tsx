import { site } from '@content/site';
import styles from '@/styles/home.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </span>
        <span>
          Full Truckload Freight — Continental US · <a href="/privacy">Privacy</a> ·{' '}
          <a href="/terms">Terms</a>
        </span>
      </div>
    </footer>
  );
}
