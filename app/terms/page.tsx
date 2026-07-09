import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@content/site';

export const metadata: Metadata = {
  title: `Terms of Use — ${site.legalName}`,
  robots: { index: false },
};

// TODO(stakeholder): replace stub with counsel-approved terms of use.
export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-site px-6 py-20">
      <h1 className="font-display text-xl font-bold uppercase tracking-tight text-paper">
        Terms of Use
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-base text-haze">
        <p>
          This website is provided by {site.legalName} for informational purposes. Rates, lanes and
          availability quoted through this site are estimates until confirmed in a signed rate
          agreement.
        </p>
        <p>
          Submitting a driver application does not constitute an offer of employment or contract.
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
