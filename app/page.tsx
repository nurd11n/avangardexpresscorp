import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Coverage } from '@/components/Coverage';
import { WhyUs } from '@/components/WhyUs';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import styles from '@/styles/home.module.css';

export default function Page() {
  return (
    <div className={styles.homePage}>
      <div className={styles.laneLine} aria-hidden="true" />
      <Header />
      <Hero />
      <Services />
      <Coverage />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}
