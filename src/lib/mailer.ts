import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

type Mail = {
  subject: string;
  /** Plain-text body. Never interpolate user input into HTML. */
  text: string;
};

/**
 * One shared, pooled transporter per process instead of a new one per
 * request. Building a transporter per submission meant a fresh TCP + TLS +
 * SMTP auth handshake for every form send — the dominant per-request cost
 * of this endpoint. The pool keeps up to `maxConnections` sockets open and
 * reuses them; idle sockets close on their own, and nodemailer transparently
 * reconnects if the server has dropped one.
 */
let transporter: Transporter | null = null;

function getTransporter(host: string): Transporter {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
      pool: true,
      maxConnections: 2, // form traffic is low; 2 covers bursts without hogging Gmail's session limits
      maxMessages: 100, // recycle a connection after 100 sends
      // Fail fast instead of holding the request (and the visitor) hostage
      // when the SMTP host is unreachable.
      connectionTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }
  return transporter;
}

/**
 * Sends mail via SMTP when configured. With no SMTP_HOST the site must still
 * be fully functional: log to stdout and report success.
 */
export async function sendMail({ subject, text }: Mail): Promise<void> {
  const host = process.env.SMTP_HOST;

  if (!host) {
    console.log(`[mailer] SMTP_HOST not set — logging instead of sending\n--- ${subject} ---\n${text}\n---`);
    return;
  }

  await getTransporter(host).sendMail({
    from: process.env.SMTP_USER ?? 'noreply@avangardexpresscorp.com',
    to: process.env.MAIL_TO ?? 'admin1@avangardexpresscorp.com',
    subject,
    text,
  });
}
