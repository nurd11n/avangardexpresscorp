import { site } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-3 px-6 py-8 font-mono text-xs text-haze sm:flex-row sm:items-center">
        <p>
          {site.legalName} · USDOT {site.dot} · {site.mc} · © {new Date().getFullYear()}
        </p>
        <nav aria-label="Legal" className="flex items-center gap-5">
          <a href="/privacy" className="transition-colors duration-150 hover:text-paper">
            {t(dict.footer.privacy, lang)}
          </a>
          <a href="/terms" className="transition-colors duration-150 hover:text-paper">
            {t(dict.footer.terms, lang)}
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-paper"
          >
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
