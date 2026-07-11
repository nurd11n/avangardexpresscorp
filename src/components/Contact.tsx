'use client';

import { useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { site } from '@content/site';
import type { ApiResponse } from '@/lib/schemas';
import styles from '@/styles/home.module.css';

export function Contact() {
  const renderedAt = useMemo(() => Date.now(), []);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error' | 'invalid'>('idle');
  const [ref, setRef] = useState('');
  const [mailtoHref, setMailtoHref] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const company = (form.elements.namedItem('company') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const lane = (form.elements.namedItem('lane') as HTMLInputElement).value;
    const details = (form.elements.namedItem('details') as HTMLTextAreaElement).value;
    const website = (form.elements.namedItem('website') as HTMLInputElement).value;

    const subject = encodeURIComponent('Rate Quote Request' + (lane ? ' — ' + lane : ''));
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nLane: ${lane}\n\nLoad Details:\n${details}`,
    );
    const fallbackHref = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setStatus('sending');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'quick',
          name,
          company,
          email,
          lane,
          details,
          website,
          ts: renderedAt,
        }),
      });
      const json = (await res.json()) as ApiResponse;
      if (json.ok) {
        setRef(json.ref);
        setStatus('ok');
      } else if (json.errors.form) {
        // Rate-limited / send failed / bad JSON — a delivery problem, not a
        // data problem, so the mailto fallback is a genuine remedy here.
        setMailtoHref(fallbackHref);
        setStatus('error');
      } else {
        // Field-specific validation error (e.g. malformed email) — mailto
        // would just carry the same bad data, so tell the user to fix it
        // instead of offering a fallback that wouldn't help.
        const bad = Object.keys(json.errors).join(', ');
        setInvalidMessage(`Please check: ${bad}`);
        setStatus('invalid');
      }
    } catch {
      setMailtoHref(fallbackHref);
      setStatus('error');
    }
  }

  return (
    <section id="contact" className={`${styles.sectionPad} ${styles.light}`}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <h2>Get a rate quote.</h2>
          <p>
            Tell us the lane and load details — we&apos;ll get back with a rate. Prefer a guided
            form?{' '}
            <Link href="/quote" style={{ color: 'var(--route-green)', textDecoration: 'underline' }}>
              Use the full quote request
            </Link>
            .
          </p>
        </div>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.row}>
              <span>Email</span>
              <span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </div>
            <div className={styles.row}>
              <span>Phone</span>
              <span>{site.phone}</span>
            </div>
            <div className={styles.row}>
              <span>Office</span>
              <span>{site.office}</span>
            </div>
            <div className={styles.row}>
              <span>Authority</span>
              <span>{site.authority}</span>
            </div>
            <div className={styles.row}>
              <span>Hours</span>
              <span>{site.hours}</span>
            </div>
          </div>
          <form className={styles.homeForm} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="lane">Lane (Origin → Destination)</label>
              <input id="lane" name="lane" type="text" placeholder="e.g. Columbus, OH → Dallas, TX" />
            </div>
            <div className={styles.field}>
              <label htmlFor="details">Load Details</label>
              <textarea
                id="details"
                name="details"
                placeholder="Weight, pallet count, pickup date, equipment needs..."
              />
            </div>
            {/* Honeypot — hidden from humans, tempting to bots. */}
            <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div className={styles.submitRow}>
              <button
                type="submit"
                className={styles.btnPrimary}
                style={{ border: 'none', cursor: 'pointer' }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Request'}
              </button>
              {status === 'idle' && (
                <span className={styles.formNote}>We&apos;ll reply to the email you provide</span>
              )}
              {status === 'ok' && (
                <span className={styles.formNote} style={{ color: 'var(--route-green)' }}>
                  Sent — reference #{ref}. We&apos;ll be in touch.
                </span>
              )}
              {status === 'error' && (
                <span className={styles.formNote}>
                  Couldn&apos;t send automatically —{' '}
                  <a href={mailtoHref} style={{ textDecoration: 'underline' }}>
                    email us directly
                  </a>
                  .
                </span>
              )}
              {status === 'invalid' && (
                <span className={styles.formNote} style={{ color: 'var(--rust)' }}>
                  {invalidMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
