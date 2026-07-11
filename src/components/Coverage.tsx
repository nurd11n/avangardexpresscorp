import { regions } from '@content/site';
import styles from '@/styles/home.module.css';

export function Coverage() {
  return (
    <section id="coverage" className={`${styles.sectionPad} ${styles.light}`}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <h2>Where we haul.</h2>
          <p>Nationwide full truckload lanes across the continental United States.</p>
        </div>
        <div className={styles.routeStrip}>
          {regions.map((region) => (
            <div key={region} className={styles.routeStop}>
              <div className={styles.mono}>Region</div>
              <div className={styles.region}>{region}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
