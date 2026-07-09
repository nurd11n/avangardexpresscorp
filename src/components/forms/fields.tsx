'use client';

import type { ReactNode } from 'react';
import { dict, t, type Lang } from '@/lib/i18n';

/** Maps Zod message codes (shared with the server) to localized strings. */
export function errorText(code: string | undefined, lang: Lang): string | undefined {
  if (!code) return undefined;
  switch (code) {
    case 'invalid_email':
      return t(dict.forms.invalidEmail, lang);
    case 'invalid_phone':
      return t(dict.forms.invalidPhone, lang);
    default:
      return t(dict.forms.required, lang);
  }
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  children: ReactNode;
};

export function Field({ id, label, error, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs uppercase text-haze">
        {label}
        {optional && <span className="normal-case"> · {optional}</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-mono text-xs text-amber">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  'w-full border border-line bg-surface px-3.5 py-2.5 text-base text-paper placeholder:text-haze/60 transition-colors duration-150 focus:border-blue focus:outline-none aria-[invalid=true]:border-amber';

export function fieldAria(id: string, hasError: boolean) {
  return {
    id,
    'aria-invalid': hasError || undefined,
    'aria-describedby': hasError ? `${id}-error` : undefined,
  } as const;
}
