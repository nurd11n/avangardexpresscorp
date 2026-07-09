'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/*
 * The forms carry the react-hook-form + zod chunk. Deferring them until the
 * contact section approaches the viewport keeps first-load JS inside the
 * 120 KB budget.
 */

const ApplyForm = dynamic(
  () => import('./ApplyForm').then((m) => ({ default: m.ApplyForm })),
  { loading: () => <FormSkeleton />, ssr: false },
);

const QuoteForm = dynamic(
  () => import('./QuoteForm').then((m) => ({ default: m.QuoteForm })),
  { loading: () => <FormSkeleton />, ssr: false },
);

function FormSkeleton() {
  return <div className="min-h-[32rem] border border-line bg-surface/40" aria-hidden="true" />;
}

function Deferred({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{near ? children : <FormSkeleton />}</div>;
}

export function DeferredApplyForm() {
  return (
    <Deferred>
      <ApplyForm />
    </Deferred>
  );
}

export function DeferredQuoteForm() {
  return (
    <Deferred>
      <QuoteForm />
    </Deferred>
  );
}
