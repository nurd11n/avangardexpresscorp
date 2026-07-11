import { services } from '@content/site';
import styles from '@/styles/home.module.css';

export function Services() {
  return (
    <section id="services" className={styles.sectionPad}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <h2>
            Built for one load
            <br />
            at a time.
          </h2>
          <p>
            Avangard runs full truckload exclusively — every trailer is dedicated to a single
            shipper from pickup to delivery.
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.title} className={styles.serviceCard}>
              <div className={styles.tag}>{service.tag}</div>
              <h3>{service.title}</h3>
              <p>{service.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
