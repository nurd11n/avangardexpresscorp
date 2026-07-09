import nodemailer from 'nodemailer';

type Mail = {
  subject: string;
  /** Plain-text body. Never interpolate user input into HTML. */
  text: string;
};

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

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER ?? 'noreply@avangardexpresscorp.com',
    to: process.env.MAIL_TO ?? 'office@avangardexpresscorp.com',
    subject,
    text,
  });
}
