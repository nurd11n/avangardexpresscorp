import { applySchema } from '@/lib/schemas';
import { handleFormPost } from '@/lib/form-handler';
import { site } from '@content/site';

export async function POST(req: Request) {
  return handleFormPost(req, applySchema, (d) => ({
    subject: `Driver application — ${d.name}`,
    text: [
      `New driver application (${site.legalName})`,
      '',
      `Name:       ${d.name}`,
      `Phone:      ${d.phone}`,
      `Email:      ${d.email}`,
      `Type:       ${d.driverType}`,
      `Experience: ${d.experience} years`,
      `Message:    ${d.message || '—'}`,
    ].join('\n'),
  }));
}
