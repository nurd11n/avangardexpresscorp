import { site } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';

/** Deliberately boring. This is what a broker scans before calling. */
export function TrustBar({ lang }: { lang: Lang }) {
  const items = [
    { label: t(dict.trust.dot, lang), value: site.dot },
    { label: t(dict.trust.mc, lang), value: site.mc },
    { label: t(dict.trust.insurance, lang), value: site.insurance },
    { label: t(dict.trust.active, lang), value: String(site.activeSince) },
  ];

  return (
    <section aria-label="Carrier credentials" className="border-y border-line bg-surface">
      <div className="mx-auto grid w-full max-w-site grid-cols-2 divide-line px-6 sm:grid-cols-4 sm:divide-x">
        {items.map((item) => (
          <div key={item.label} className="px-4 py-5 first:pl-0 last:pr-0">
            <p className="font-mono text-xs uppercase text-haze">{item.label}</p>
            <p className="mt-1 font-mono text-sm text-paper">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
