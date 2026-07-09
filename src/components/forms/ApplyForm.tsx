'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applySchema, type ApplyInput, type ApiResponse } from '@/lib/schemas';
import { dict, t } from '@/lib/i18n';
import { useLang } from '@/lib/lang-context';
import { Field, errorText, fieldAria, inputClass } from '@/components/forms/fields';

export function ApplyForm() {
  const lang = useLang();
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const renderedAt = useMemo(() => Date.now(), []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyInput>({
    resolver: zodResolver(applySchema),
    defaultValues: { driverType: 'owner-operator', website: '', ts: renderedAt },
  });

  async function onSubmit(data: ApplyInput) {
    setStatus('idle');
    try {
      const res = await fetch('/api/apply', {
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
      <Field id="apply-name" label={t(dict.forms.name, lang)} error={errorText(errors.name?.message, lang)}>
        <input
          {...register('name')}
          {...fieldAria('apply-name', !!errors.name)}
          className={inputClass}
          autoComplete="name"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="apply-phone" label={t(dict.forms.phone, lang)} error={errorText(errors.phone?.message, lang)}>
          <input
            {...register('phone')}
            {...fieldAria('apply-phone', !!errors.phone)}
            type="tel"
            className={inputClass}
            autoComplete="tel"
          />
        </Field>
        <Field id="apply-email" label={t(dict.forms.email, lang)} error={errorText(errors.email?.message, lang)}>
          <input
            {...register('email')}
            {...fieldAria('apply-email', !!errors.email)}
            type="email"
            className={inputClass}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="apply-experience"
          label={t(dict.forms.experience, lang)}
          error={errorText(errors.experience?.message, lang)}
        >
          <input
            {...register('experience')}
            {...fieldAria('apply-experience', !!errors.experience)}
            type="number"
            min={0}
            max={60}
            className={inputClass}
          />
        </Field>
        <Field id="apply-type" label={t(dict.forms.driverType, lang)}>
          <select {...register('driverType')} id="apply-type" className={inputClass}>
            <option value="owner-operator">{t(dict.forms.ownerOperator, lang)}</option>
            <option value="company-driver">{t(dict.forms.companyDriver, lang)}</option>
          </select>
        </Field>
      </div>

      <Field
        id="apply-message"
        label={t(dict.forms.message, lang)}
        optional={t(dict.forms.optional, lang)}
      >
        <textarea {...register('message')} id="apply-message" rows={3} className={inputClass} />
      </Field>

      {/* Honeypot — hidden from humans, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="apply-website">Website</label>
        <input {...register('website')} id="apply-website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber px-6 py-3.5 font-display text-sm font-bold uppercase tracking-tight text-ink transition-colors duration-150 hover:bg-paper disabled:opacity-60"
      >
        {isSubmitting ? t(dict.forms.sending, lang) : t(dict.forms.submitApply, lang)}
      </button>

      <div role="alert" aria-live="polite">
        {status === 'ok' && <p className="text-sm text-blue">{t(dict.forms.successApply, lang)}</p>}
        {status === 'error' && (
          <p className="text-sm text-amber">{t(dict.forms.errorGeneric, lang)}</p>
        )}
      </div>
    </form>
  );
}
