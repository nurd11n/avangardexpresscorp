import { site } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';
import { Section, SectionTitle } from '@/components/ui/Section';

/** The most important section on the page — the recruiting pitch. */
export function Drivers({ lang }: { lang: Lang }) {
  return (
    <Section id="drivers">
      <SectionTitle>{t(dict.sections.drivers, lang)}</SectionTitle>
      <p className="mt-3 max-w-xl text-base text-haze">{t(dict.sections.driversSub, lang)}</p>

      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {site.driverBenefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <article key={benefit.id} className="bg-ink p-6">
              <div className="flex items-center justify-between gap-4">
                <Icon className="h-6 w-6 text-blue" aria-hidden="true" strokeWidth={1.5} />
                <span className="font-mono text-xs text-blue">{benefit.figure}</span>
              </div>
              <h3 className="mt-4 font-display text-base font-bold uppercase tracking-tight text-paper">
                {t(benefit.claim, lang)}
              </h3>
              <p className="mt-2 text-sm text-haze">{t(benefit.detail, lang)}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-10">
        <a
          href="#contact"
          className="inline-flex items-center justify-center bg-amber px-8 py-4 font-display text-sm font-bold uppercase tracking-tight text-ink transition-colors duration-150 hover:bg-paper"
        >
          {t(dict.drivers.cta, lang)}
        </a>
      </div>
    </Section>
  );
}
