import type { LucideIcon } from 'lucide-react';
import {
  Box,
  Snowflake,
  Layers,
  Zap,
  DollarSign,
  Home,
  Fuel,
  Route,
  Truck,
  Headset,
} from 'lucide-react';

/** A prose field rendered in the visitor's language. */
export type Localized = { en: string; ru: string };

export type Stat = {
  /** Rendered odometer-style in mono. Keep it a number-ish string. */
  value: string;
  label: Localized;
};

export type Service = {
  id: string;
  icon: LucideIcon;
  name: Localized;
  blurb: Localized;
  specs: Localized[];
};

export type DriverBenefit = {
  id: string;
  icon: LucideIcon;
  claim: Localized;
  detail: Localized;
  /** The supporting number, set in mono. */
  figure: string;
};

export type FleetPhoto = {
  /** Path under /public. */
  src: string;
  /** "Year Make Model" — used as the caption and alt text. */
  caption: string;
};

export type TeamMember = {
  name: string;
  role: Localized;
  phone?: string;
  email?: string;
};

export type FaqItem = {
  audience: 'driver' | 'shipper';
  q: Localized;
  a: Localized;
};

export const site = {
  // TODO(stakeholder): confirm exact legal name as registered with FMCSA.
  legalName: 'Avangard Express Inc',

  // TODO(stakeholder): real DOT number.
  dot: '3421876',
  // TODO(stakeholder): real MC number.
  mc: 'MC-1109432',
  // TODO(stakeholder): insurance carrier name shown in the trust bar.
  insurance: 'Progressive Commercial',
  // TODO(stakeholder): year the authority became active.
  activeSince: 2016,

  // TODO(stakeholder): main office phone.
  phone: '+1 (872) 555-0114',
  // TODO(stakeholder): 24/7 dispatch phone.
  dispatchPhone: '+1 (872) 555-0163',
  // TODO(stakeholder): office email.
  email: 'office@avangardexpresscorp.com',
  // TODO(stakeholder): recruiting email.
  recruitingEmail: 'drive@avangardexpresscorp.com',

  // TODO(stakeholder): verified street address — must byte-match Google Business Profile.
  address: {
    street: '2400 E Devon Ave, Suite 218',
    city: 'Des Plaines',
    state: 'IL',
    zip: '60018',
  },

  // TODO(stakeholder): confirm office hours.
  hours: {
    en: 'Mon–Fri 8:00–18:00 CT · Dispatch 24/7',
    ru: 'Пн–Пт 8:00–18:00 CT · Диспетчер 24/7',
  } satisfies Localized,

  social: {
    // TODO(stakeholder): real Instagram handle.
    instagram: 'https://www.instagram.com/avangardexpress',
  },

  // TODO(stakeholder): verify all three stats.
  stats: [
    { value: '48', label: { en: 'trucks on the road', ru: 'грузовиков в работе' } },
    { value: '6.2M', label: { en: 'miles driven in 2025', ru: 'миль пройдено в 2025' } },
    { value: '98.4%', label: { en: 'on-time delivery', ru: 'доставка в срок' } },
  ] as Stat[],

  services: [
    {
      id: 'dry-van',
      icon: Box,
      name: { en: 'Dry Van', ru: 'Сухой фургон' },
      blurb: {
        en: 'General freight across the lower 48, palletized or floor-loaded.',
        ru: 'Генеральные грузы по 48 штатам, на паллетах или навалом.',
      },
      specs: [
        { en: '53′ air-ride trailers', ru: 'Трейлеры 53′ на пневмоподвеске' },
        { en: 'Up to 45,000 lbs', ru: 'До 45 000 фунтов' },
        { en: 'Drop & hook available', ru: 'Возможен drop & hook' },
      ],
    },
    {
      id: 'reefer',
      icon: Snowflake,
      name: { en: 'Reefer', ru: 'Рефрижератор' },
      blurb: {
        en: 'Temperature-controlled freight with continuous monitoring.',
        ru: 'Грузы с температурным режимом и непрерывным контролем.',
      },
      specs: [
        { en: '−20°F to +70°F range', ru: 'Диапазон от −20°F до +70°F' },
        { en: 'FSMA compliant', ru: 'Соответствие FSMA' },
        { en: 'Real-time temp tracking', ru: 'Мониторинг температуры в реальном времени' },
      ],
    },
    {
      id: 'flatbed',
      icon: Layers,
      name: { en: 'Flatbed', ru: 'Платформа' },
      blurb: {
        en: 'Machinery, steel and building materials, tarped and secured.',
        ru: 'Оборудование, металл и стройматериалы — с укрытием и креплением.',
      },
      specs: [
        { en: '48′–53′ decks', ru: 'Платформы 48′–53′' },
        { en: 'Tarps, chains, straps on board', ru: 'Тенты, цепи и стяжки в комплекте' },
        { en: 'Oversize permits arranged', ru: 'Оформляем негабаритные разрешения' },
      ],
    },
    {
      id: 'expedited',
      icon: Zap,
      name: { en: 'Expedited', ru: 'Срочная доставка' },
      blurb: {
        en: 'Team drivers for time-critical loads. Door to door, no relays.',
        ru: 'Экипажи из двух водителей для срочных грузов. От двери до двери.',
      },
      specs: [
        { en: 'Team drivers on request', ru: 'Экипажи по запросу' },
        { en: 'Live GPS updates', ru: 'GPS-трекинг в реальном времени' },
        { en: 'Direct dispatch line', ru: 'Прямая линия с диспетчером' },
      ],
    },
  ] as Service[],

  // TODO(stakeholder): verify every figure in this section — it is the recruiting pitch.
  driverBenefits: [
    {
      id: 'pay',
      icon: DollarSign,
      claim: { en: 'Pay that clears on Friday', ru: 'Оплата — каждую пятницу' },
      detail: {
        en: 'Owner-operators keep 88% of gross. Direct deposit every week, settlement statements you can actually read.',
        ru: 'Владельцы грузовиков получают 88% от гросса. Прямой депозит каждую неделю, понятные расчётные листы.',
      },
      figure: '88% gross',
    },
    {
      id: 'home-time',
      icon: Home,
      claim: { en: 'Home when you planned to be', ru: 'Дома — когда планировали' },
      detail: {
        en: 'Tell dispatch your home date and it holds. Midwest lanes get you back weekly.',
        ru: 'Назовите диспетчеру дату — она не сдвинется. Рейсы по Среднему Западу возвращают домой каждую неделю.',
      },
      figure: '34h reset at home',
    },
    {
      id: 'fuel',
      icon: Fuel,
      claim: { en: 'Fuel card that actually saves', ru: 'Топливная карта, которая экономит' },
      detail: {
        en: 'Fleet discounts at Pilot, TA and Loves passed to you at cost. No markup, no games.',
        ru: 'Скидки сети Pilot, TA и Loves передаём вам по себестоимости. Без наценок.',
      },
      figure: '−$0.55/gal avg',
    },
    {
      id: 'no-forced',
      icon: Route,
      claim: { en: 'No forced dispatch', ru: 'Без принудительных рейсов' },
      detail: {
        en: 'You see the rate and the lane before you commit. Decline without penalty.',
        ru: 'Вы видите ставку и маршрут до подтверждения. Отказ — без штрафов.',
      },
      figure: '100% choice',
    },
    {
      id: 'equipment',
      icon: Truck,
      claim: { en: 'Equipment that passes inspection', ru: 'Техника, которая проходит инспекции' },
      detail: {
        en: 'Average tractor age under three years. Company trailers maintained on schedule, not on failure.',
        ru: 'Средний возраст тягачей — до трёх лет. Трейлеры обслуживаются по графику, а не после поломки.',
      },
      figure: '2.6y avg age',
    },
    {
      id: 'dispatch',
      icon: Headset,
      claim: { en: 'Dispatch that answers', ru: 'Диспетчер, который отвечает' },
      detail: {
        en: '24/7, English and Russian. One call reaches a person who knows your load.',
        ru: 'Круглосуточно, на русском и английском. Один звонок — и вы говорите с человеком, который знает ваш груз.',
      },
      figure: '24/7 · EN/RU',
    },
  ] as DriverBenefit[],

  // TODO(stakeholder): replace placeholder blocks with real fleet photos, keep captions accurate.
  fleet: [
    { src: '/fleet/fleet-01.jpg', caption: '2023 Freightliner Cascadia' },
    { src: '/fleet/fleet-02.jpg', caption: '2024 Volvo VNL 860' },
    { src: '/fleet/fleet-03.jpg', caption: '2022 Kenworth T680' },
    { src: '/fleet/fleet-04.jpg', caption: '2023 Peterbilt 579' },
    { src: '/fleet/fleet-05.jpg', caption: '2024 Great Dane Everest Reefer' },
    { src: '/fleet/fleet-06.jpg', caption: '2023 Utility 3000R Dry Van' },
  ] as FleetPhoto[],

  // TODO(stakeholder): confirm team members and whether this section ships at all.
  // Leave the array empty to hide the section.
  team: [
    {
      name: 'Aleksandr Petrov',
      role: { en: 'Operations Manager', ru: 'Операционный директор' },
      phone: '+1 (872) 555-0114',
      email: 'office@avangardexpresscorp.com',
    },
    {
      name: 'Dmitriy Volkov',
      role: { en: 'Head of Dispatch', ru: 'Руководитель диспетчерской' },
      phone: '+1 (872) 555-0163',
    },
    {
      name: 'Elena Sokolova',
      role: { en: 'Driver Recruiting', ru: 'Найм водителей' },
      email: 'drive@avangardexpresscorp.com',
    },
  ] as TeamMember[],

  faq: [
    {
      audience: 'driver',
      q: { en: 'What are the pay terms for owner-operators?', ru: 'Какие условия оплаты для владельцев грузовиков?' },
      a: {
        en: 'You keep 88% of gross. Settlements pay out weekly by direct deposit, every Friday, with itemized statements.',
        ru: 'Вы получаете 88% от гросса. Выплаты — каждую пятницу прямым депозитом, с детальным расчётным листом.',
      },
    },
    {
      audience: 'driver',
      q: { en: 'Do you force dispatch?', ru: 'Есть ли принудительные рейсы?' },
      a: {
        en: 'No. You see the rate, the lane and the dates before you accept. Declining a load carries no penalty.',
        ru: 'Нет. Вы видите ставку, маршрут и даты до подтверждения. За отказ от рейса нет никаких штрафов.',
      },
    },
    {
      audience: 'driver',
      q: { en: 'What do I need to apply?', ru: 'Что нужно, чтобы подать заявку?' },
      a: {
        en: 'A valid CDL-A, at least 2 years of verifiable OTR experience, and a clean recent record. We reply within one business day.',
        ru: 'Действующая CDL-A, минимум 2 года подтверждённого опыта OTR и чистая недавняя история. Отвечаем в течение одного рабочего дня.',
      },
    },
    {
      audience: 'driver',
      q: { en: 'Does dispatch speak Russian?', ru: 'Говорит ли диспетчер по-русски?' },
      a: {
        en: 'Yes. Dispatch runs 24/7 in both English and Russian.',
        ru: 'Да. Диспетчерская работает круглосуточно на русском и английском языках.',
      },
    },
    {
      audience: 'shipper',
      q: { en: 'Are you a carrier or a broker?', ru: 'Вы перевозчик или брокер?' },
      a: {
        en: 'An asset-based carrier. Our own trucks, our own drivers, our own DOT and MC authority — verifiable on FMCSA SAFER.',
        ru: 'Перевозчик с собственным парком. Наши грузовики, наши водители, собственные номера DOT и MC — проверяются в FMCSA SAFER.',
      },
    },
    {
      audience: 'shipper',
      q: { en: 'What insurance do you carry?', ru: 'Какая у вас страховка?' },
      a: {
        en: '$1M auto liability and $100K cargo. Certificates of insurance issued same day on request.',
        ru: 'Автогражданская ответственность $1M и страхование груза $100K. Сертификаты выдаём в день запроса.',
      },
    },
    {
      audience: 'shipper',
      q: { en: 'How fast can you cover a load?', ru: 'Как быстро вы можете взять груз?' },
      a: {
        en: 'Dispatch answers 24/7. For lanes out of the Midwest we can usually confirm a truck within the hour.',
        ru: 'Диспетчерская отвечает 24/7. По маршрутам из Среднего Запада обычно подтверждаем грузовик в течение часа.',
      },
    },
  ] as FaqItem[],
} as const;

export type Site = typeof site;

export function fullAddress(): string {
  const a = site.address;
  return `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}
