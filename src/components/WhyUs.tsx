import { whyItems } from '@content/site';
import styles from '@/styles/home.module.css';

export function WhyUs() {
  return (
    <section id="why" className={styles.sectionPad}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <h2>
            Why shippers stay
            <br />
            with Avangard.
          </h2>
        </div>
        <div className={styles.whyGrid}>
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={styles.whyItem}>
                <Icon className={styles.num} size={28} strokeWidth={1.5} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.blurb}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
