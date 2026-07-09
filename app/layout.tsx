import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import Script from 'next/script';
import { site } from '@content/site';
import { LANG_COOKIE, isLang, langFromAcceptLanguage, type Lang } from '@/lib/i18n';
import { LangProvider } from '@/lib/lang-context';
import { display, body, mono } from './fonts';
import './globals.css';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.avangardexpresscorp.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${site.legalName} — US Freight Carrier · Dry Van, Reefer, Flatbed`,
  description:
    `Asset-based trucking carrier out of ${site.address.city}, ${site.address.state}. ` +
    'Dry van, reefer, flatbed and expedited freight across 48 states. Hiring CDL-A owner-operators. Dispatch 24/7, EN/RU.',
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      ru: SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: site.legalName,
    title: `${site.legalName} — US Freight Carrier`,
    description:
      'Dry van, reefer, flatbed and expedited freight across 48 states. Hiring CDL-A owner-operators.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: site.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.legalName} — US Freight Carrier`,
    images: ['/og.jpg'],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

function resolveLang(): Lang {
  const cookie = cookies().get(LANG_COOKIE)?.value;
  if (isLang(cookie)) return cookie;
  return langFromAcceptLanguage(headers().get('accept-language'));
}

function jsonLd() {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'US',
  };

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.legalName,
      url: SITE_URL,
      telephone: site.phone,
      email: site.email,
      address,
      sameAs: [site.social.instagram],
    },
    {
      '@context': 'https://schema.org',
      // MovingCompany is the closest schema.org fit for a freight carrier.
      '@type': 'MovingCompany',
      name: site.legalName,
      url: SITE_URL,
      telephone: site.phone,
      email: site.email,
      address,
      openingHours: 'Mo-Fr 08:00-18:00',
      areaServed: 'US',
      sameAs: [site.social.instagram],
      image: `${SITE_URL}/og.jpg`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: site.faq.map((f) => ({
        '@type': 'Question',
        name: f.q.en,
        acceptedAnswer: { '@type': 'Answer', text: f.a.en },
      })),
    },
  ];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = resolveLang();
  const pixelId = process.env.META_PIXEL_ID;

  return (
    <html lang={lang} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <LangProvider lang={lang}>{children}</LangProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
