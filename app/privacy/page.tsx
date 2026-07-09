import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@content/site';

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.legalName}`,
  robots: { index: false },
};

// TODO(stakeholder): replace stub with counsel-approved privacy policy.
export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-site px-6 py-20">
      <h1 className="font-display text-xl font-bold uppercase tracking-tight text-paper">
        Privacy Policy
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-base text-haze">
        <p>
          {site.legalName} collects only the information you submit through the forms on this site
          — name, contact details and the content of your message — and uses it solely to respond
          to your application or quote request.
        </p>
        <p>
          We do not sell or share your information with third parties, and we do not use tracking
          cookies unless analytics are explicitly enabled.
        </p>
        <p>
          Questions: <a className="text-blue" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
      <p className="mt-10">
        <Link href="/" className="font-mono text-sm text-blue">
          ← Back to site
        </Link>
      </p>
    </main>
  );
}
