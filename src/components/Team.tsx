import { site, telHref } from '@content/site';
import { dict, t, type Lang } from '@/lib/i18n';
import { Section, SectionTitle } from '@/components/ui/Section';

export function Team({ lang }: { lang: Lang }) {
  if (site.team.length === 0) return null;

  return (
    <Section id="team">
      <SectionTitle>{t(dict.sections.team, lang)}</SectionTitle>

      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {site.team.slice(0, 3).map((member) => (
          <article key={member.name} className="bg-ink p-6">
            <h3 className="font-display text-base font-bold uppercase tracking-tight text-paper">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-haze">{t(member.role, lang)}</p>
            <div className="mt-4 space-y-1">
              {member.phone && (
                <a
                  href={telHref(member.phone)}
                  className="block font-mono text-sm text-blue transition-colors duration-150 hover:text-paper"
                >
                  {member.phone}
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="block font-mono text-sm text-blue transition-colors duration-150 hover:text-paper"
                >
                  {member.email}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
