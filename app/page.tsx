import { cookies, headers } from 'next/headers';
import { LANG_COOKIE, isLang, langFromAcceptLanguage, type Lang } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { Drivers } from '@/components/Drivers';
import { Fleet } from '@/components/Fleet';
import { Team } from '@/components/Team';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { LaneRule } from '@/components/ui/LaneRule';

function resolveLang(): Lang {
  const cookie = cookies().get(LANG_COOKIE)?.value;
  if (isLang(cookie)) return cookie;
  return langFromAcceptLanguage(headers().get('accept-language'));
}

export default function Page() {
  const lang = resolveLang();

  return (
    <>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <TrustBar lang={lang} />
        <Services lang={lang} />
        <LaneRule />
        <Drivers lang={lang} />
        <LaneRule />
        <Fleet lang={lang} />
        <LaneRule />
        <Team lang={lang} />
        <LaneRule />
        <Faq lang={lang} />
        <LaneRule />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
