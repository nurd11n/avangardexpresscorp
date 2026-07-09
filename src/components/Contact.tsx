import Image from 'next/image';
import { site, fullAddress, telHref } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';
import { Section, SectionTitle } from '@/components/ui/Section';
import { DeferredApplyForm, DeferredQuoteForm } from '@/components/forms/DeferredForms';

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase text-haze">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function Contact({ lang }: { lang: Lang }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.legalName}, ${fullAddress()}`,
  )}`;

  return (
    <Section id="contact">
      <SectionTitle>{t(dict.sections.contact, lang)}</SectionTitle>

      <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
        <div className="bg-ink p-6 md:p-8">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight text-paper">
            {t(dict.forms.applyTitle, lang)}
          </h3>
          <p className="mt-2 text-sm text-haze">{t(dict.forms.applySub, lang)}</p>
          <div className="mt-6">
            <DeferredApplyForm />
          </div>
        </div>

        <div id="contact-quote" className="scroll-mt-20 bg-ink p-6 md:p-8">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight text-paper">
            {t(dict.forms.quoteTitle, lang)}
          </h3>
          <p className="mt-2 text-sm text-haze">{t(dict.forms.quoteSub, lang)}</p>
          <div className="mt-6">
            <DeferredQuoteForm />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="grid content-start gap-6 sm:grid-cols-2">
          <InfoRow label={t(dict.contact.office, lang)}>
            <a
              href={telHref(site.phone)}
              className="font-mono text-sm text-blue transition-colors duration-150 hover:text-paper"
            >
              {site.phone}
            </a>
          </InfoRow>
          <InfoRow label={t(dict.contact.dispatch, lang)}>
            <a
              href={telHref(site.dispatchPhone)}
              className="font-mono text-sm text-blue transition-colors duration-150 hover:text-paper"
            >
              {site.dispatchPhone}
            </a>
          </InfoRow>
          <InfoRow label={t(dict.forms.email, lang)}>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-sm text-blue transition-colors duration-150 hover:text-paper"
            >
              {site.email}
            </a>
          </InfoRow>
          <InfoRow label={t(dict.contact.recruiting, lang)}>
            <a
              href={`mailto:${site.recruitingEmail}`}
              className="font-mono text-sm text-blue transition-colors duration-150 hover:text-paper"
            >
              {site.recruitingEmail}
            </a>
          </InfoRow>
          <InfoRow label={t(dict.contact.address, lang)}>
            <address className="text-sm not-italic text-paper">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>
          </InfoRow>
          <InfoRow label={t(dict.contact.hours, lang)}>
            <p className="text-sm text-paper">{t(site.hours, lang)}</p>
          </InfoRow>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-[2/1] overflow-hidden border border-line"
          aria-label={t(dict.contact.openMap, lang)}
        >
          {/* TODO(stakeholder): replace with a real static map tile of the office. */}
          <Image
            src="/map.jpg"
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-ink/90 px-3 py-1.5 font-mono text-xs text-blue transition-colors duration-150 group-hover:text-paper">
            {t(dict.contact.openMap, lang)} ↗
          </span>
        </a>
      </div>
    </Section>
  );
}
