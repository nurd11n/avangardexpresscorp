import { site, telHref } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';
import { LangSwitch } from '@/components/LangSwitch';

export function Header({ lang }: { lang: Lang }) {
  const nav = [
    { href: '#services', label: t(dict.nav.services, lang) },
    { href: '#drivers', label: t(dict.nav.drivers, lang) },
    { href: '#fleet', label: t(dict.nav.fleet, lang) },
    { href: '#faq', label: t(dict.nav.faq, lang) },
    { href: '#contact', label: t(dict.nav.contact, lang) },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between gap-6 px-6">
        <a
          href="#top"
          className="font-display text-base font-bold uppercase tracking-tight text-paper"
        >
          {/* TODO(stakeholder): replace text mark with the real logo. */}
          Avangard <span className="text-blue">Express</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-haze transition-colors duration-150 hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={telHref(site.dispatchPhone)}
            className="hidden font-mono text-sm text-blue transition-colors duration-150 hover:text-paper sm:block"
          >
            {site.dispatchPhone}
          </a>
          <LangSwitch />
        </div>
      </div>
    </header>
  );
}
