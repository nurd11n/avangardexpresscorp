import { z } from 'zod';

const name = z.string().trim().min(2, 'required').max(120);
const phone = z
  .string()
  .trim()
  .regex(/^[+()\d\s.-]{7,20}$/, 'invalid_phone');
const email = z.string().trim().email('invalid_email').max(200);
const freeText = z.string().trim().max(2000).optional().or(z.literal(''));
const required = (max: number) => z.string().trim().min(1, 'required').max(max);
const yesNoUnsure = z.enum(['yes', 'no', 'unsure']);

/** Anti-spam fields shared by every form. `website` is the honeypot. */
const antiSpam = {
  website: z.string().max(0).optional().or(z.literal('')),
  ts: z.coerce.number(),
};

const rgnQuoteSchema = z.object({
  kind: z.literal('rgn'),
  fullName: name,
  companyName: required(200),
  phone,
  email,
  pickup: required(200),
  delivery: required(200),
  pickupDate: required(20),
  cargoType: required(200),
  length: z.coerce.number().positive('required'),
  width: z.coerce.number().positive('required'),
  height: z.coerce.number().positive('required'),
  weight: z.coerce.number().positive('required'),
  pieces: z.coerce.number().int().min(1, 'required'),
  permits: yesNoUnsure,
  escort: yesNoUnsure,
  notes: freeText,
  ...antiSpam,
});

const dryVanQuoteSchema = z.object({
  kind: z.literal('dryvan'),
  fullName: name,
  companyName: required(200),
  phone,
  email,
  pickup: required(200),
  delivery: required(200),
  pickupDate: required(20),
  freightType: required(200),
  weight: z.coerce.number().positive('required'),
  units: z.coerce.number().int().min(1, 'required'),
  loadSize: z.enum(['full', 'partial', 'unsure']),
  notes: freeText,
  ...antiSpam,
});

/** The lightweight home-page contact form — no phone collected, by design. */
const quickQuoteSchema = z.object({
  kind: z.literal('quick'),
  name,
  company: z.string().trim().max(200).optional().or(z.literal('')),
  email,
  lane: z.string().trim().max(200).optional().or(z.literal('')),
  details: freeText,
  ...antiSpam,
});

export const quoteRequestSchema = z.discriminatedUnion('kind', [
  rgnQuoteSchema,
  dryVanQuoteSchema,
  quickQuoteSchema,
]);

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export type ApiResponse =
  | { ok: true; ref: string }
  | { ok: false; errors: Record<string, string> };

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
