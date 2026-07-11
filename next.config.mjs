/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        // Never cache the form-submission API — it's a POST endpoint with
        // side effects (rate limiting, honeypot timing, real email sends).
        // A cached response here would be a correctness bug, not a
        // performance win.
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
      // The rest of the site is statically generated at build time —
      // content only changes on redeploy, so a short cache with
      // stale-while-revalidate is safe and speeds up repeat visits. Listed
      // explicitly (rather than one clever regex) so each route's caching
      // is easy to read and change independently.
      //
      // robots.txt/sitemap.xml are deliberately NOT here — Next.js's
      // built-in metadata route handlers already send their own
      // Cache-Control (public, max-age=0, must-revalidate), and adding a
      // second one here doesn't replace it, it appends it — two
      // Cache-Control headers in one response, which is invalid HTTP.
      ...['/', '/quote', '/privacy', '/terms'].map((source) => ({
        source,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=3600' },
        ],
      })),
    ];
  },
};

export default nextConfig;
