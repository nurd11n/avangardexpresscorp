import { site } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';
import { Section, SectionTitle } from '@/components/ui/Section';

function FaqGroup({
  title,
  items,
  lang,
}: {
  title: string;
  items: typeof site.faq;
  lang: Lang;
}) {
  return (
    <div>
      <h3 className="font-mono text-sm uppercase text-haze">{title}</h3>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q.en} className="group py-4">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 text-base font-medium text-paper [&::-webkit-details-marker]:hidden">
              {t(item.q, lang)}
              <span
                className="font-mono text-blue transition-colors duration-150 group-open:text-haze"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm text-haze">{t(item.a, lang)}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function Faq({ lang }: { lang: Lang }) {
  const drivers = site.faq.filter((f) => f.audience === 'driver');
  const shippers = site.faq.filter((f) => f.audience === 'shipper');

  return (
    <Section id="faq">
      <SectionTitle>{t(dict.sections.faq, lang)}</SectionTitle>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <FaqGroup title={t(dict.sections.faqDrivers, lang)} items={drivers} lang={lang} />
        <FaqGroup title={t(dict.sections.faqShippers, lang)} items={shippers} lang={lang} />
      </div>
    </Section>
  );
}
