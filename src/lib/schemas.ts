import { z } from 'zod';

const name = z.string().trim().min(2, 'required').max(120);
const phone = z
  .string()
  .trim()
  .regex(/^[+()\d\s.-]{7,20}$/, 'invalid_phone');
const email = z.string().trim().email('invalid_email').max(200);
const freeText = z.string().trim().max(2000).optional().or(z.literal(''));

/** Anti-spam fields shared by both forms. `website` is the honeypot. */
const antiSpam = {
  website: z.string().max(0).optional().or(z.literal('')),
  ts: z.coerce.number(),
};

export const applySchema = z.object({
  name,
  phone,
  email,
  experience: z.coerce.number().min(0, 'required').max(60),
  driverType: z.enum(['owner-operator', 'company-driver']),
  message: freeText,
  ...antiSpam,
});

export const quoteSchema = z.object({
  name,
  company: z.string().trim().max(200).optional().or(z.literal('')),
  phone,
  email,
  origin: z.string().trim().min(2, 'required').max(200),
  destination: z.string().trim().min(2, 'required').max(200),
  freight: z.string().trim().min(2, 'required').max(500),
  message: freeText,
  ...antiSpam,
});

export type ApplyInput = z.infer<typeof applySchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;

export type ApiResponse =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
