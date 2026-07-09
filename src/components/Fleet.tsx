import Image from 'next/image';
import { site } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';
import { Section, SectionTitle } from '@/components/ui/Section';

export function Fleet({ lang }: { lang: Lang }) {
  return (
    <Section id="fleet">
      <SectionTitle>{t(dict.sections.fleet, lang)}</SectionTitle>
      <p className="mt-3 text-base text-haze">{t(dict.fleetCta, lang)}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.fleet.map((photo) => (
          <figure key={photo.src}>
            <div className="relative aspect-[4/3] overflow-hidden border border-line">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 font-mono text-xs text-haze">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
