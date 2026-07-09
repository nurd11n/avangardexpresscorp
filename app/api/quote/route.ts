import { quoteSchema } from '@/lib/schemas';
import { handleFormPost } from '@/lib/form-handler';
import { site } from '@content/site';

export async function POST(req: Request) {
  return handleFormPost(req, quoteSchema, (d) => ({
    subject: `Quote request — ${d.origin} → ${d.destination}`,
    text: [
      `New quote request (${site.legalName})`,
      '',
      `Name:        ${d.name}`,
      `Company:     ${d.company || '—'}`,
      `Phone:       ${d.phone}`,
      `Email:       ${d.email}`,
      `Origin:      ${d.origin}`,
      `Destination: ${d.destination}`,
      `Freight:     ${d.freight}`,
      `Message:     ${d.message || '—'}`,
    ].join('\n'),
  }));
}
