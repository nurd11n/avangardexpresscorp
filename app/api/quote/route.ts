import { quoteRequestSchema } from '@/lib/schemas';
import { handleFormPost } from '@/lib/form-handler';
import { site } from '@content/site';

export async function POST(req: Request) {
  return handleFormPost(req, quoteRequestSchema, (d, ref) => {
    if (d.kind === 'rgn') {
      return {
        subject: `RGN quote request [${ref}] — ${d.pickup} → ${d.delivery}`,
        text: [
          `New RGN quote request (${site.legalName})`,
          `Ref:          ${ref}`,
          '',
          `Name:         ${d.fullName}`,
          `Company:      ${d.companyName}`,
          `Phone:        ${d.phone}`,
          `Email:        ${d.email}`,
          `Pickup:       ${d.pickup}`,
          `Delivery:     ${d.delivery}`,
          `Pickup date:  ${d.pickupDate}`,
          `Equipment:    ${d.cargoType}`,
          `Dimensions:   ${d.length} x ${d.width} x ${d.height} ft`,
          `Weight:       ${d.weight} lbs`,
          `Pieces:       ${d.pieces}`,
          `Permits:      ${d.permits}`,
          `Escort:       ${d.escort}`,
          `Notes:        ${d.notes || '—'}`,
        ].join('\n'),
      };
    }

    if (d.kind === 'dryvan') {
      return {
        subject: `Dry Van quote request [${ref}] — ${d.pickup} → ${d.delivery}`,
        text: [
          `New Dry Van quote request (${site.legalName})`,
          `Ref:          ${ref}`,
          '',
          `Name:         ${d.fullName}`,
          `Company:      ${d.companyName}`,
          `Phone:        ${d.phone}`,
          `Email:        ${d.email}`,
          `Pickup:       ${d.pickup}`,
          `Delivery:     ${d.delivery}`,
          `Pickup date:  ${d.pickupDate}`,
          `Freight type: ${d.freightType}`,
          `Weight:       ${d.weight} lbs`,
          `Units:        ${d.units}`,
          `Load size:    ${d.loadSize}`,
          `Notes:        ${d.notes || '—'}`,
        ].join('\n'),
      };
    }

    return {
      subject: `Quick quote request [${ref}]${d.lane ? ' — ' + d.lane : ''}`,
      text: [
        `New quick quote request (${site.legalName})`,
        `Ref:     ${ref}`,
        '',
        `Name:    ${d.name}`,
        `Company: ${d.company || '—'}`,
        `Email:   ${d.email}`,
        `Lane:    ${d.lane || '—'}`,
        `Details: ${d.details || '—'}`,
      ].join('\n'),
    };
  });
}
