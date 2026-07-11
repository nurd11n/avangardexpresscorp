import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { TruckGraphic } from '@/components/TruckGraphic';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div>
          <div className={styles.eyebrow}>Full Truckload Carrier</div>
          <h1>
            Freight moves <span>forward</span>, on schedule, every load.
          </h1>
          <p>
            Avangard Express Corp runs dedicated full truckload freight — one shipper, one
            trailer, no detours. Dry van capacity, direct dispatch, and drivers who treat your
            freight like it&apos;s the only load on the road.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/quote" className={styles.btnPrimary}>
              Request a Rate
            </Link>
            <a href="#services" className={styles.btnGhost}>
              See Capabilities
            </a>
          </div>
        </div>
        <div>
          <TruckGraphic className={styles.heroTruck} />
          <div className={styles.manifest}>
            <div className={styles.manifestHead}>
              <span>Load Manifest</span>
              <span>FTL / Dry Van</span>
            </div>
            <div className={styles.manifestRow}>
              <span>Service</span>
              <span>Full Truckload</span>
            </div>
            <div className={styles.manifestRow}>
              <span>Equipment</span>
              <span>53&apos; Dry Van</span>
            </div>
            <div className={styles.manifestRow}>
              <span>Dispatch</span>
              <span>Direct — no relay</span>
            </div>
            <div className={styles.manifestRow}>
              <span>Coverage</span>
              <span>Continental US</span>
            </div>
            <div className={styles.manifestRow}>
              <span>Status</span>
              <span style={{ color: 'var(--signal-amber)' }}>Accepting Loads</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
