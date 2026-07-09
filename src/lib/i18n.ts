export type Lang = 'en' | 'ru';

export const LANG_COOKIE = 'lang';

export function isLang(v: unknown): v is Lang {
  return v === 'en' || v === 'ru';
}

/** Pick a language from an Accept-Language header, falling back to en. */
export function langFromAcceptLanguage(header: string | null): Lang {
  if (!header) return 'en';
  return /(^|,|;|\s)ru\b/i.test(header) ? 'ru' : 'en';
}

/** UI chrome strings. Page prose lives in content/site.ts as { en, ru } pairs. */
export const dict = {
  nav: {
    services: { en: 'Services', ru: 'Услуги' },
    drivers: { en: 'Drivers', ru: 'Водителям' },
    fleet: { en: 'Fleet', ru: 'Парк' },
    faq: { en: 'FAQ', ru: 'Вопросы' },
    contact: { en: 'Contact', ru: 'Контакты' },
  },
  hero: {
    kicker: { en: 'US freight carrier · Chicago, IL', ru: 'Американский грузоперевозчик · Чикаго, IL' },
    headline: {
      en: 'We move freight across 48 states. We are hiring owner-operators.',
      ru: 'Возим грузы по 48 штатам. Набираем владельцев грузовиков.',
    },
    sub: {
      en: 'Asset-based carrier out of Chicago. Dry van, reefer, flatbed. Dispatch answers in English and Russian, 24/7.',
      ru: 'Собственный парк, база в Чикаго. Сухие фургоны, рефрижераторы, платформы. Диспетчер отвечает на русском и английском, 24/7.',
    },
    ctaApply: { en: 'Apply to drive', ru: 'Заявка водителя' },
    ctaQuote: { en: 'Get a quote', ru: 'Рассчитать перевозку' },
  },
  trust: {
    dot: { en: 'USDOT', ru: 'USDOT' },
    mc: { en: 'MC', ru: 'MC' },
    insurance: { en: 'Insured by', ru: 'Страховщик' },
    active: { en: 'Authority active since', ru: 'Лицензия действует с' },
  },
  sections: {
    services: { en: 'What we haul', ru: 'Что мы возим' },
    drivers: { en: 'Why drivers stay', ru: 'Почему водители остаются' },
    driversSub: {
      en: 'Six reasons our turnover is half the industry average.',
      ru: 'Шесть причин, почему наша текучка вдвое ниже средней по отрасли.',
    },
    fleet: { en: 'The fleet', ru: 'Наш парк' },
    team: { en: 'Who picks up the phone', ru: 'Кто берёт трубку' },
    faq: { en: 'Questions', ru: 'Вопросы' },
    faqDrivers: { en: 'For drivers', ru: 'Водителям' },
    faqShippers: { en: 'For shippers & brokers', ru: 'Грузоотправителям и брокерам' },
    contact: { en: 'Get in touch', ru: 'Свяжитесь с нами' },
  },
  drivers: {
    cta: { en: 'Apply — takes 2 minutes', ru: 'Подать заявку — 2 минуты' },
  },
  forms: {
    applyTitle: { en: 'Drive for us', ru: 'Работайте с нами' },
    applySub: {
      en: 'CDL-A holders and owner-operators. We reply within one business day.',
      ru: 'Для водителей с CDL-A и владельцев грузовиков. Ответим в течение рабочего дня.',
    },
    quoteTitle: { en: 'Ship with us', ru: 'Отправьте груз' },
    quoteSub: {
      en: 'Shippers and brokers — send the lane, we send the rate.',
      ru: 'Грузоотправители и брокеры — пришлите маршрут, мы пришлём ставку.',
    },
    name: { en: 'Full name', ru: 'Имя и фамилия' },
    phone: { en: 'Phone', ru: 'Телефон' },
    email: { en: 'Email', ru: 'Email' },
    experience: { en: 'Years of CDL experience', ru: 'Стаж с CDL, лет' },
    driverType: { en: 'I am a…', ru: 'Я —' },
    ownerOperator: { en: 'Owner-operator', ru: 'Владелец грузовика' },
    companyDriver: { en: 'Company driver', ru: 'Наёмный водитель' },
    company: { en: 'Company', ru: 'Компания' },
    origin: { en: 'Pickup city, state', ru: 'Откуда (город, штат)' },
    destination: { en: 'Delivery city, state', ru: 'Куда (город, штат)' },
    freight: { en: 'Freight & weight', ru: 'Груз и вес' },
    message: { en: 'Anything else', ru: 'Комментарий' },
    optional: { en: 'optional', ru: 'необязательно' },
    submitApply: { en: 'Send application', ru: 'Отправить заявку' },
    submitQuote: { en: 'Request quote', ru: 'Запросить ставку' },
    sending: { en: 'Sending…', ru: 'Отправка…' },
    successApply: {
      en: 'Application received. Recruiting will call you within one business day.',
      ru: 'Заявка получена. Рекрутер позвонит вам в течение рабочего дня.',
    },
    successQuote: {
      en: 'Request received. Dispatch will reply with a rate shortly.',
      ru: 'Запрос получен. Диспетчер скоро пришлёт ставку.',
    },
    errorGeneric: {
      en: 'Something went wrong. Call us instead.',
      ru: 'Что-то пошло не так. Позвоните нам напрямую.',
    },
    required: { en: 'Required', ru: 'Обязательное поле' },
    invalidEmail: { en: 'Enter a valid email', ru: 'Введите корректный email' },
    invalidPhone: { en: 'Enter a valid phone number', ru: 'Введите корректный номер телефона' },
  },
  contact: {
    office: { en: 'Office', ru: 'Офис' },
    dispatch: { en: 'Dispatch 24/7', ru: 'Диспетчер 24/7' },
    recruiting: { en: 'Recruiting', ru: 'Отдел найма' },
    address: { en: 'Address', ru: 'Адрес' },
    hours: { en: 'Hours', ru: 'Часы работы' },
    openMap: { en: 'Open in Google Maps', ru: 'Открыть в Google Maps' },
  },
  footer: {
    privacy: { en: 'Privacy', ru: 'Конфиденциальность' },
    terms: { en: 'Terms', ru: 'Условия' },
  },
  fleetCta: { en: 'Every truck on this page is ours.', ru: 'Каждый грузовик на этой странице — наш.' },
} as const;

type Leaf = { en: string; ru: string };

/** t(dict.hero.headline, lang) — trivially typed lookup. */
export function t(leaf: Leaf, lang: Lang): string {
  return leaf[lang];
}
