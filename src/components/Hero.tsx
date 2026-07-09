import Image from 'next/image';
import { site } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';
import { InView } from '@/components/ui/InView';

export function Hero({ lang }: { lang: Lang }) {
  return (
    <InView as="section" id="top" className="reveal mx-auto w-full max-w-site scroll-mt-20 px-6 pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-sm text-blue">{t(dict.hero.kicker, lang)}</p>
          <h1 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-paper md:text-3xl">
            {t(dict.hero.headline, lang)}
          </h1>
          <p className="mt-5 max-w-xl text-base text-haze">{t(dict.hero.sub, lang)}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex min-w-[13rem] items-center justify-center bg-amber px-6 py-3.5 font-display text-sm font-bold uppercase tracking-tight text-ink transition-colors duration-150 hover:bg-paper"
            >
              {t(dict.hero.ctaApply, lang)}
            </a>
            <a
              href="#contact-quote"
              className="inline-flex min-w-[13rem] items-center justify-center border border-line px-6 py-3.5 font-display text-sm font-bold uppercase tracking-tight text-paper transition-colors duration-150 hover:border-blue hover:text-blue"
            >
              {t(dict.hero.ctaQuote, lang)}
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden border border-line">
          {/* TODO(stakeholder): real hero photo — a truck, front three-quarter, dusk. */}
          <Image
            src="/hero.jpg"
            alt="Avangard Express truck on the highway"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-3">
        {site.stats.map((stat) => (
          <div key={stat.value}>
            <dd className="font-mono text-2xl text-paper">{stat.value}</dd>
            <dt className="mt-1 text-sm text-haze">{t(stat.label, lang)}</dt>
          </div>
        ))}
      </dl>
    </InView>
  );
}
