'use client';

import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { site } from '@content/site';
import type { ApiResponse } from '@/lib/schemas';
import { ThemeToggle } from '@/components/ThemeToggle';
import styles from '@/styles/quote.module.css';

type StepKey = '1' | '2' | 'rgn' | 'dryvan' | 'confirm';

type SubmitOutcome =
  | { type: 'validation'; fields: Record<string, string> }
  | { type: 'failure'; message: string; mailtoHref: string };

const STEP_META: Record<StepKey, { eyebrow: string; num: string; title: string; sub: string }> = {
  '1': {
    eyebrow: 'Freight Quote Request',
    num: '1',
    title: 'Get A Quote',
    sub: "Tell us where it's going and what you're hauling. We'll get back to you with pricing.",
  },
  '2': {
    eyebrow: 'Freight Quote Request',
    num: '2',
    title: 'What type of load are you shipping?',
    sub: 'Select an option below to get a quote tailored to your freight.',
  },
  rgn: {
    eyebrow: 'RGN Quote Request',
    num: '3',
    title: 'Request your RGN quote',
    sub: "Tell us about your equipment and we'll get you an accurate quote fast.",
  },
  dryvan: {
    eyebrow: 'Dry Van Quote Request',
    num: '3',
    title: 'Request your Dry Van quote',
    sub: "Fill out the details below and we'll get back to you with pricing.",
  },
  confirm: { eyebrow: 'Freight Quote Request', num: '3', title: 'Request submitted', sub: '' },
};

/** Maps the Zod message codes returned by the API to readable text. */
function errorText(code: string | undefined): string | undefined {
  if (!code) return undefined;
  switch (code) {
    case 'invalid_email':
      return 'Enter a valid email';
    case 'invalid_phone':
      return 'Enter a valid phone number';
    default:
      return 'Required';
  }
}

function RadioPair({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.radioPair}>
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`${styles.radioOpt}${value === opt.value ? ` ${styles.radioOptChecked}` : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function Field({
  label,
  fieldError,
  children,
}: {
  label: string;
  fieldError?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      {children}
      {fieldError && (
        <p style={{ color: 'var(--rust)', fontSize: '12px', marginTop: '4px' }}>{fieldError}</p>
      )}
    </div>
  );
}

function Honeypot() {
  return (
    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
      <label htmlFor="wizard-website">Website</label>
      <input id="wizard-website" name="website" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function QuoteWizard() {
  const [step, setStep] = useState<StepKey>('1');
  const [submitting, setSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<SubmitOutcome | null>(null);
  const [confirmType, setConfirmType] = useState('');
  const [confirmRef, setConfirmRef] = useState('');

  const [rgnPermits, setRgnPermits] = useState('unsure');
  const [rgnEscort, setRgnEscort] = useState('unsure');
  const [dvSize, setDvSize] = useState('full');

  const renderedAt = useMemo(() => Date.now(), []);
  const meta = STEP_META[step];
  const fieldErrors = outcome?.type === 'validation' ? outcome.fields : {};

  async function submitRgn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '');

    const payload = {
      kind: 'rgn' as const,
      fullName: get('fullName'),
      companyName: get('companyName'),
      phone: get('phone'),
      email: get('email'),
      pickup: get('pickup'),
      delivery: get('delivery'),
      pickupDate: get('pickupDate'),
      cargoType: get('cargoType'),
      length: get('length'),
      width: get('width'),
      height: get('height'),
      weight: get('weight'),
      pieces: get('pieces'),
      permits: rgnPermits,
      escort: rgnEscort,
      notes: get('notes'),
      website: get('website'),
      ts: renderedAt,
    };

    const mailLines = [
      'Load Type: RGN',
      `Name: ${payload.fullName}`,
      `Company: ${payload.companyName}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Pickup: ${payload.pickup}`,
      `Delivery: ${payload.delivery}`,
      `Pickup date: ${payload.pickupDate}`,
      `Equipment/cargo: ${payload.cargoType}`,
      `Dimensions (L x W x H ft): ${payload.length} x ${payload.width} x ${payload.height}`,
      `Weight (lbs): ${payload.weight}`,
      `Pieces: ${payload.pieces}`,
      `Permits required: ${payload.permits}`,
      `Escort required: ${payload.escort}`,
      `Notes: ${payload.notes}`,
    ];

    await submit(payload, 'RGN', mailLines);
  }

  async function submitDryVan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '');

    const payload = {
      kind: 'dryvan' as const,
      fullName: get('fullName'),
      companyName: get('companyName'),
      phone: get('phone'),
      email: get('email'),
      pickup: get('pickup'),
      delivery: get('delivery'),
      pickupDate: get('pickupDate'),
      freightType: get('freightType'),
      weight: get('weight'),
      units: get('units'),
      loadSize: dvSize,
      notes: get('notes'),
      website: get('website'),
      ts: renderedAt,
    };

    const mailLines = [
      'Load Type: Dry Van',
      `Name: ${payload.fullName}`,
      `Company: ${payload.companyName}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Pickup: ${payload.pickup}`,
      `Delivery: ${payload.delivery}`,
      `Pickup date: ${payload.pickupDate}`,
      `Freight type: ${payload.freightType}`,
      `Weight (lbs): ${payload.weight}`,
      `Pallets/units: ${payload.units}`,
      `Load size: ${payload.loadSize}`,
      `Notes: ${payload.notes}`,
    ];

    await submit(payload, 'Dry Van', mailLines);
  }

  async function submit(payload: Record<string, unknown>, typeLabel: string, mailLines: string[]) {
    setSubmitting(true);
    setOutcome(null);

    const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
      `${typeLabel} Quote Request`,
    )}&body=${encodeURIComponent(mailLines.join('\n'))}`;

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as ApiResponse;

      if (json.ok) {
        setConfirmType(`Load type: ${typeLabel}`);
        setConfirmRef(`Reference #${json.ref}`);
        setStep('confirm');
        return;
      }

      // Field-specific validation errors (bad phone/email/etc.) are a
      // different problem than a delivery failure — mailto wouldn't fix a
      // genuinely invalid phone number, so don't offer it as the remedy.
      if (json.errors.form === 'send_failed' || json.errors.form === 'invalid_json') {
        setOutcome({
          type: 'failure',
          message: "Couldn't send automatically — email us directly, or try again.",
          mailtoHref,
        });
      } else if (json.errors.form === 'rate_limited') {
        setOutcome({
          type: 'failure',
          message: 'Too many requests — please wait a few minutes and try again, or email us directly.',
          mailtoHref,
        });
      } else {
        setOutcome({ type: 'validation', fields: json.errors });
      }
    } catch {
      setOutcome({
        type: 'failure',
        message: "Couldn't reach the server — email us directly, or try again.",
        mailtoHref,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.quotePage}>
      <div className={styles.topNav}>
        <Link href="/">&larr; Back to Avangard Express</Link>
        <ThemeToggle className={styles.topNavTheme} />
      </div>
      <div className={styles.wrap}>
        <div className={styles.ticket}>
          <div className={styles.ticketTop}>
            <p className={styles.eyebrow}>
              {meta.eyebrow} <span className={styles.dash}>/</span> Step {meta.num} of 3
            </p>
            <h1>{meta.title}</h1>
            <p className={styles.sub}>{meta.sub}</p>
          </div>
          <div className={styles.perf} />
          <div className={styles.bodyPad}>
            {step === '1' && (
              <div className={styles.stepActive}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
                  <button
                    type="button"
                    className={styles.submitBtn}
                    style={{ width: 'auto', padding: '16px 40px' }}
                    onClick={() => setStep('2')}
                  >
                    Get A Quote
                  </button>
                </div>
              </div>
            )}

            {step === '2' && (
              <div className={styles.stepActive}>
                <div className={styles.routeGrid}>
                  <button
                    type="button"
                    className={styles.routeCard}
                    onClick={() => {
                      setOutcome(null);
                      setStep('rgn');
                    }}
                  >
                    <span className={styles.routeTag}>RGN</span>
                    <p className={styles.routeTitle}>RGN / Heavy Equipment</p>
                    <p className={styles.routeDesc}>
                      Oversized, heavy, or specialized equipment requiring a removable gooseneck
                      trailer.
                    </p>
                  </button>
                  <button
                    type="button"
                    className={styles.routeCard}
                    onClick={() => {
                      setOutcome(null);
                      setStep('dryvan');
                    }}
                  >
                    <span className={styles.routeTag}>Dry Van</span>
                    <p className={styles.routeTitle}>Dry Van</p>
                    <p className={styles.routeDesc}>
                      Standard palletized or boxed freight in an enclosed trailer.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {step === 'rgn' && (
              <div className={styles.stepActive}>
                <button type="button" className={styles.backLink} onClick={() => setStep('2')}>
                  &larr; Back to load type
                </button>
                <form onSubmit={submitRgn} noValidate>
                  <div className={styles.row2}>
                    <Field label="Full name" fieldError={errorText(fieldErrors.fullName)}>
                      <input type="text" name="fullName" required />
                    </Field>
                    <Field label="Company name" fieldError={errorText(fieldErrors.companyName)}>
                      <input type="text" name="companyName" required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Phone number" fieldError={errorText(fieldErrors.phone)}>
                      <input type="tel" name="phone" required />
                    </Field>
                    <Field label="Email address" fieldError={errorText(fieldErrors.email)}>
                      <input type="email" name="email" required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Pickup location" fieldError={errorText(fieldErrors.pickup)}>
                      <input type="text" name="pickup" placeholder="City, State / ZIP" required />
                    </Field>
                    <Field label="Delivery location" fieldError={errorText(fieldErrors.delivery)}>
                      <input type="text" name="delivery" placeholder="City, State / ZIP" required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Preferred pickup date" fieldError={errorText(fieldErrors.pickupDate)}>
                      <input type="date" name="pickupDate" required />
                    </Field>
                    <Field label="Equipment / cargo type" fieldError={errorText(fieldErrors.cargoType)}>
                      <input type="text" name="cargoType" placeholder="e.g. excavator, crane" required />
                    </Field>
                  </div>
                  <div className={styles.row3}>
                    <Field label="Length (ft)" fieldError={errorText(fieldErrors.length)}>
                      <input type="number" name="length" min={0} step={0.1} required />
                    </Field>
                    <Field label="Width (ft)" fieldError={errorText(fieldErrors.width)}>
                      <input type="number" name="width" min={0} step={0.1} required />
                    </Field>
                    <Field label="Height (ft)" fieldError={errorText(fieldErrors.height)}>
                      <input type="number" name="height" min={0} step={0.1} required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Weight (lbs)" fieldError={errorText(fieldErrors.weight)}>
                      <input type="number" name="weight" min={0} required />
                    </Field>
                    <Field label="Number of pieces" fieldError={errorText(fieldErrors.pieces)}>
                      <input type="number" name="pieces" min={1} defaultValue={1} required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Permits required?">
                      <RadioPair
                        name="rgn-permits"
                        value={rgnPermits}
                        onChange={setRgnPermits}
                        options={[
                          { value: 'yes', label: 'Yes' },
                          { value: 'no', label: 'No' },
                          { value: 'unsure', label: 'Not sure' },
                        ]}
                      />
                    </Field>
                    <Field label="Escort required?">
                      <RadioPair
                        name="rgn-escort"
                        value={rgnEscort}
                        onChange={setRgnEscort}
                        options={[
                          { value: 'yes', label: 'Yes' },
                          { value: 'no', label: 'No' },
                          { value: 'unsure', label: 'Not sure' },
                        ]}
                      />
                    </Field>
                  </div>
                  <Field label="Additional notes">
                    <textarea name="notes" placeholder="Loading/unloading access, special instructions" />
                  </Field>
                  <Honeypot />
                  {outcome?.type === 'validation' && (
                    <p role="alert" style={{ color: 'var(--rust)', fontSize: '13px', marginBottom: '12px' }}>
                      Please fix the highlighted fields above.
                    </p>
                  )}
                  {outcome?.type === 'failure' && (
                    <p role="alert" style={{ color: 'var(--rust)', fontSize: '13px', marginBottom: '12px' }}>
                      {outcome.message}{' '}
                      <a href={outcome.mailtoHref} style={{ textDecoration: 'underline' }}>
                        Email us directly
                      </a>
                    </p>
                  )}
                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? 'Sending…' : 'Get My RGN Quote'}
                  </button>
                </form>
              </div>
            )}

            {step === 'dryvan' && (
              <div className={styles.stepActive}>
                <button type="button" className={styles.backLink} onClick={() => setStep('2')}>
                  &larr; Back to load type
                </button>
                <form onSubmit={submitDryVan} noValidate>
                  <div className={styles.row2}>
                    <Field label="Full name" fieldError={errorText(fieldErrors.fullName)}>
                      <input type="text" name="fullName" required />
                    </Field>
                    <Field label="Company name" fieldError={errorText(fieldErrors.companyName)}>
                      <input type="text" name="companyName" required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Phone number" fieldError={errorText(fieldErrors.phone)}>
                      <input type="tel" name="phone" required />
                    </Field>
                    <Field label="Email address" fieldError={errorText(fieldErrors.email)}>
                      <input type="email" name="email" required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Pickup location" fieldError={errorText(fieldErrors.pickup)}>
                      <input type="text" name="pickup" placeholder="City, State / ZIP" required />
                    </Field>
                    <Field label="Delivery location" fieldError={errorText(fieldErrors.delivery)}>
                      <input type="text" name="delivery" placeholder="City, State / ZIP" required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Preferred pickup date" fieldError={errorText(fieldErrors.pickupDate)}>
                      <input type="date" name="pickupDate" required />
                    </Field>
                    <Field label="Freight type" fieldError={errorText(fieldErrors.freightType)}>
                      <input type="text" name="freightType" placeholder="e.g. palletized, boxed" required />
                    </Field>
                  </div>
                  <div className={styles.row2}>
                    <Field label="Weight (lbs)" fieldError={errorText(fieldErrors.weight)}>
                      <input type="number" name="weight" min={0} required />
                    </Field>
                    <Field label="Number of pallets / units" fieldError={errorText(fieldErrors.units)}>
                      <input type="number" name="units" min={1} required />
                    </Field>
                  </div>
                  <Field label="Load size">
                    <RadioPair
                      name="dv-size"
                      value={dvSize}
                      onChange={setDvSize}
                      options={[
                        { value: 'full', label: 'Full truckload' },
                        { value: 'partial', label: 'Partial' },
                        { value: 'unsure', label: 'Not sure' },
                      ]}
                    />
                  </Field>
                  <Field label="Additional notes">
                    <textarea name="notes" placeholder="Stackable, temperature-sensitive, etc." />
                  </Field>
                  <Honeypot />
                  {outcome?.type === 'validation' && (
                    <p role="alert" style={{ color: 'var(--rust)', fontSize: '13px', marginBottom: '12px' }}>
                      Please fix the highlighted fields above.
                    </p>
                  )}
                  {outcome?.type === 'failure' && (
                    <p role="alert" style={{ color: 'var(--rust)', fontSize: '13px', marginBottom: '12px' }}>
                      {outcome.message}{' '}
                      <a href={outcome.mailtoHref} style={{ textDecoration: 'underline' }}>
                        Email us directly
                      </a>
                    </p>
                  )}
                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? 'Sending…' : 'Get My Dry Van Quote'}
                  </button>
                </form>
              </div>
            )}

            {step === 'confirm' && (
              <div className={styles.stepActive}>
                <div className={styles.confirmIcon}>&#10003;</div>
                <p className={styles.confirmTitle}>Request received</p>
                <p className={styles.confirmSub}>
                  Avangard Express dispatch has been notified by email — we&apos;ll follow up with
                  pricing.
                </p>
                <p className={styles.confirmSub}>{confirmType}</p>
                <p className={styles.confirmRef}>{confirmRef}</p>
                <p className={styles.confirmNote}>
                  Questions in the meantime? Email {site.email} directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
