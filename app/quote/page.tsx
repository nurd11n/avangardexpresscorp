import type { Metadata } from 'next';
import { site } from '@content/site';
import { QuoteWizard } from '@/components/QuoteWizard';

export const metadata: Metadata = {
  title: `Get A Quote | ${site.legalName}`,
};

export default function QuotePage() {
  return <QuoteWizard />;
}
