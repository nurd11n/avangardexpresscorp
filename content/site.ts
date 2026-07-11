import type { LucideIcon } from 'lucide-react';
import { Truck, Headset, Clock, Tag } from 'lucide-react';

// Content ported verbatim from the reference index.html / quote.html files.
// Placeholders in brackets are literal — the source files show them as
// visible on-page text (not fabricated stakeholder data), so they stay
// until a stakeholder supplies real values.

export const site = {
  legalName: 'Avangard Express Corp',
  email: 'admin1@avangardexpresscorp.com',
  phone: '+1 845 587-4897',
  office: 'Wheeling, IL',
  authority: 'USDOT 4229721 · MC1636213',
  hours: 'Dispatch available 24/7',
};

export type Service = {
  tag: string;
  title: string;
  blurb: string;
};

export const services: Service[] = [
  {
    tag: '01 — Equipment',
    title: 'Dry Van FTL',
    blurb: "53' dry van trailers for palletized, boxed, and general commercial freight requiring a full trailer.",
  },
  {
    tag: '02 — Dispatch',
    title: 'Direct Dispatch',
    blurb: 'No load boards, no relay handoffs. Your freight is assigned to one driver and tracked start to finish.',
  },
  {
    tag: '03 — Planning',
    title: 'Route Planning',
    blurb: 'Lane-by-lane routing built around delivery windows, drive-time limits, and dock appointment times.',
  },
];

export const regions: string[] = [
  'Northeast',
  'Midwest',
  'Southeast',
  'South Central',
  'Mountain West',
  'West Coast',
];

export type WhyItem = {
  icon: LucideIcon;
  title: string;
  blurb: string;
};

export const whyItems: WhyItem[] = [
  {
    icon: Truck,
    title: 'One driver, one load',
    blurb: 'No consolidation, no shared trailer space. Your freight rides alone.',
  },
  {
    icon: Headset,
    title: 'Direct communication',
    blurb: 'Talk straight to dispatch — no ticket queues, no middle layers.',
  },
  {
    icon: Clock,
    title: 'On-time focus',
    blurb: 'Routes are planned around your delivery appointment, not ours.',
  },
  {
    icon: Tag,
    title: 'Straightforward rates',
    blurb: 'Clear, lane-based pricing with no surprise accessorials.',
  },
];

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}
