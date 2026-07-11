import { NextResponse } from 'next/server';
import type { ZodSchema } from 'zod';
import { zodFieldErrors, type ApiResponse } from '@/lib/schemas';
import { clientIp, rateLimited } from '@/lib/rate-limit';
import { sendMail } from '@/lib/mailer';

const MIN_SUBMIT_MS = 2000;

function generateRef(): string {
  const now = new Date();
  const yy = String(now.getUTCFullYear()).slice(2);
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `AVG-${yy}${mm}${dd}-${rand}`;
}

/** Strips angle brackets from every string field so submitted data can never carry markup. */
function stripHtml<T>(data: T): T {
  if (typeof data === 'string') return data.replace(/[<>]/g, '') as unknown as T;
  if (Array.isArray(data)) return data.map(stripHtml) as unknown as T;
  if (data && typeof data === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      out[key] = stripHtml(value);
    }
    return out as T;
  }
  return data;
}

/**
 * Shared POST handler for both forms: rate limit → honeypot → validate → mail.
 * Bots get a fake success so they don't learn what tripped them.
 */
export async function handleFormPost<T extends { website?: string; ts: number }>(
  req: Request,
  schema: ZodSchema<T>,
  toMail: (data: T, ref: string) => { subject: string; text: string },
): Promise<NextResponse<ApiResponse>> {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, errors: { form: 'rate_limited' } },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: 'invalid_json' } },
      { status: 400 },
    );
  }

  // Honeypot filled or submitted suspiciously fast → pretend it worked.
  const raw = body as Record<string, unknown>;
  const tooFast =
    typeof raw?.ts === 'number' && Date.now() - raw.ts < MIN_SUBMIT_MS;
  if ((typeof raw?.website === 'string' && raw.website.length > 0) || tooFast) {
    return NextResponse.json({ ok: true, ref: generateRef() });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: zodFieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const ref = generateRef();
  try {
    await sendMail(toMail(stripHtml(parsed.data), ref));
  } catch (err) {
    console.error('[mailer] send failed:', err);
    return NextResponse.json(
      { ok: false, errors: { form: 'send_failed' } },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, ref });
}
