import type { ReactNode } from 'react';
import { InView } from '@/components/ui/InView';

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Standard section shell: container width, vertical rhythm, reveal on scroll. */
export function Section({ id, children, className = '' }: Props) {
  return (
    <InView as="section" id={id} className={`reveal mx-auto w-full max-w-site scroll-mt-20 px-6 py-20 md:py-28 ${className}`}>
      {children}
    </InView>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xl font-bold uppercase tracking-tight text-paper md:text-2xl">
      {children}
    </h2>
  );
}
