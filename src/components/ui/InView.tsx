'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  /** Stagger offset in ms, applied via --reveal-delay. */
  delay?: number;
  as?: 'div' | 'section';
  id?: string;
};

/**
 * Adds .is-inview once when the element first enters the viewport.
 * All actual motion lives in CSS so prefers-reduced-motion can kill it.
 */
export function InView({ children, className, delay, as = 'div', id }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
