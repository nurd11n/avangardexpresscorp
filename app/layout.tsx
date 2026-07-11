import type { Metadata } from 'next';
import Script from 'next/script';
import { site } from '@content/site';
import { display, body, mono } from './fonts';
import './globals.css';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.avangardexpresscorp.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${site.legalName} | Full Truckload Freight`,
  description:
    'Dedicated full truckload freight — one shipper, one trailer, no detours. Dry van capacity, direct dispatch, nationwide continental US coverage.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: site.legalName,
    title: `${site.legalName} | Full Truckload Freight`,
    description: 'Dedicated full truckload freight across the continental United States.',
  },
  twitter: {
    card: 'summary',
    title: `${site.legalName} | Full Truckload Freight`,
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// A single JSON-LD object per <script> tag — some structured-data readers
// (Safari's built-in one included) choke on a bare top-level array with no
// "@context", throwing on `r["@context"].toLowerCase()`.
function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    url: SITE_URL,
    email: site.email,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = process.env.META_PIXEL_ID;

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
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
