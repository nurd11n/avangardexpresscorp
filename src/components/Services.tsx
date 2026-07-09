import { site } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';
import { Section, SectionTitle } from '@/components/ui/Section';

export function Services({ lang }: { lang: Lang }) {
  return (
    <Section id="services">
      <SectionTitle>{t(dict.sections.services, lang)}</SectionTitle>

      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {site.services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.id} className="bg-ink p-6">
              <Icon className="h-6 w-6 text-blue" aria-hidden="true" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-paper">
                {t(service.name, lang)}
              </h3>
              <p className="mt-2 text-sm text-haze">{t(service.blurb, lang)}</p>
              <ul className="mt-4 space-y-1.5">
                {service.specs.map((spec, i) => (
                  <li key={i} className="font-mono text-xs text-haze">
                    <span className="text-blue">— </span>
                    {t(spec, lang)}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
