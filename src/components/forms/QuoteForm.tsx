'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quoteSchema, type QuoteInput, type ApiResponse } from '@/lib/schemas';
import { dict, t } from '@/lib/i18n';
import { useLang } from '@/lib/lang-context';
import { Field, errorText, fieldAria, inputClass } from '@/components/forms/fields';

export function QuoteForm() {
  const lang = useLang();
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const renderedAt = useMemo(() => Date.now(), []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { website: '', ts: renderedAt },
  });

  async function onSubmit(data: QuoteInput) {
    setStatus('idle');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ts: renderedAt }),
      });
      const json = (await res.json()) as ApiResponse;
      setStatus(json.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="quote-name" label={t(dict.forms.name, lang)} error={errorText(errors.name?.message, lang)}>
          <input
            {...register('name')}
            {...fieldAria('quote-name', !!errors.name)}
            className={inputClass}
            autoComplete="name"
          />
        </Field>
        <Field
          id="quote-company"
          label={t(dict.forms.company, lang)}
          optional={t(dict.forms.optional, lang)}
        >
          <input
            {...register('company')}
            id="quote-company"
            className={inputClass}
            autoComplete="organization"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="quote-phone" label={t(dict.forms.phone, lang)} error={errorText(errors.phone?.message, lang)}>
          <input
            {...register('phone')}
            {...fieldAria('quote-phone', !!errors.phone)}
            type="tel"
            className={inputClass}
            autoComplete="tel"
          />
        </Field>
        <Field id="quote-email" label={t(dict.forms.email, lang)} error={errorText(errors.email?.message, lang)}>
          <input
            {...register('email')}
            {...fieldAria('quote-email', !!errors.email)}
            type="email"
            className={inputClass}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="quote-origin" label={t(dict.forms.origin, lang)} error={errorText(errors.origin?.message, lang)}>
          <input
            {...register('origin')}
            {...fieldAria('quote-origin', !!errors.origin)}
            className={inputClass}
          />
        </Field>
        <Field
          id="quote-destination"
          label={t(dict.forms.destination, lang)}
          error={errorText(errors.destination?.message, lang)}
        >
          <input
            {...register('destination')}
            {...fieldAria('quote-destination', !!errors.destination)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="quote-freight" label={t(dict.forms.freight, lang)} error={errorText(errors.freight?.message, lang)}>
        <input
          {...register('freight')}
          {...fieldAria('quote-freight', !!errors.freight)}
          className={inputClass}
        />
      </Field>

      <Field
        id="quote-message"
        label={t(dict.forms.message, lang)}
        optional={t(dict.forms.optional, lang)}
      >
        <textarea {...register('message')} id="quote-message" rows={3} className={inputClass} />
      </Field>

      {/* Honeypot — hidden from humans, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-website">Website</label>
        <input {...register('website')} id="quote-website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border border-blue px-6 py-3.5 font-display text-sm font-bold uppercase tracking-tight text-blue transition-colors duration-150 hover:bg-blue hover:text-ink disabled:opacity-60"
      >
        {isSubmitting ? t(dict.forms.sending, lang) : t(dict.forms.submitQuote, lang)}
      </button>

      <div role="alert" aria-live="polite">
        {status === 'ok' && <p className="text-sm text-blue">{t(dict.forms.successQuote, lang)}</p>}
        {status === 'error' && (
          <p className="text-sm text-amber">{t(dict.forms.errorGeneric, lang)}</p>
        )}
      </div>
    </form>
  );
}
