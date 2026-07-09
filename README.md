# Avangard Express Inc — Landing Page

One-page marketing site for a US trucking carrier. Next.js 14 App Router, TypeScript strict,
Tailwind, self-hosted fonts, bilingual EN/RU, Dockerized behind Caddy with automatic TLS.

Production domain: `https://www.avangardexpresscorp.com` (apex 301s to `www`).

## Deploy (bare Ubuntu box with Docker, DNS pointed)

```bash
git clone <repo> && cd avangard-express
cp .env.example .env
docker compose up -d --build
```

Caddy provisions and renews Let's Encrypt certificates automatically once both A records
(`avangardexpresscorp.com` and `www.avangardexpresscorp.com`) point at the server. Certificates
live in the `caddy_data` volume and survive `docker compose down && up`.

The site is **fully functional with an empty `.env`** — form submissions are logged to the `web`
container's stdout instead of emailed. Set the `SMTP_*` vars to enable real delivery.

## Local development

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Or containerized, without Caddy/TLS:

```bash
docker compose -f docker-compose.dev.yml up   # http://localhost:3000
```

Useful scripts:

```bash
pnpm typecheck      # tsc --noEmit, strict
pnpm build          # production build (output: standalone)
pnpm smoke          # BASE_URL=http://localhost:3000 — hits pages, APIs, honeypot
pnpm placeholders   # regenerate placeholder images in /public
```

## Where everything lives

| Thing | Place |
| --- | --- |
| **All copy, contacts, numbers** | `content/site.ts` — typed; a typo is a build error |
| UI chrome strings (nav, form labels) | `src/lib/i18n.ts` |
| Design tokens | `tailwind.config.ts` |
| Forms + API validation (shared Zod) | `src/lib/schemas.ts` |
| Mail delivery / stdout fallback | `src/lib/mailer.ts` |
| Rate limit (5 req / 10 min / IP) | `src/lib/rate-limit.ts` |

No copy string is hardcoded in a component. Prose is `{ en, ru }` pairs; the language persists in
a `lang` cookie, defaults from `Accept-Language`, falls back to `en`.

## Environment variables (all optional)

| Var | Purpose |
| --- | --- |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | SMTP relay; unset → log to stdout |
| `MAIL_TO` | Recipient for form submissions |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap/robots |
| `GOOGLE_SITE_VERIFICATION` | Renders the Search Console `<meta>` tag when set |
| `META_PIXEL_ID` | Injects the Meta pixel **only when set** — no tracking by default |

---

## Handing off to the client

Everything below is placeholder content and **must be replaced before the site is treated as
authoritative**. All of it is swappable in `content/site.ts` plus a handful of images in `public/`.

### ⚠️ Russian copy is machine-translated

All RU strings in `content/site.ts` and `src/lib/i18n.ts` were written by the developer, not a
professional translator. **A native speaker must proof every Russian string before launch** —
especially the driver-recruiting section, which is the primary conversion funnel.

### NAP consistency (SEO-critical)

The legal name, address and phone in `content/site.ts` must **byte-match** what is entered in
Google Business Profile. Change them in one place only.

### Image swap list

| File | Replace with |
| --- | --- |
| `public/hero.jpg` | Truck photo, front three-quarter, dusk (≥1600×1200) |
| `public/og.jpg` | Social share card, exactly 1200×630 |
| `public/map.jpg` | Static map tile of the office (no API key needed — it links out) |
| `public/fleet/fleet-0[1-6].jpg` | Real fleet photos, 4:3, captions in `site.ts` must match |

### Open TODOs (`grep -rn "TODO(stakeholder)"`)

```
content/site.ts:62:  // TODO(stakeholder): confirm exact legal name as registered with FMCSA.
content/site.ts:65:  // TODO(stakeholder): real DOT number.
content/site.ts:67:  // TODO(stakeholder): real MC number.
content/site.ts:69:  // TODO(stakeholder): insurance carrier name shown in the trust bar.
content/site.ts:71:  // TODO(stakeholder): year the authority became active.
content/site.ts:74:  // TODO(stakeholder): main office phone.
content/site.ts:76:  // TODO(stakeholder): 24/7 dispatch phone.
content/site.ts:78:  // TODO(stakeholder): office email.
content/site.ts:80:  // TODO(stakeholder): recruiting email.
content/site.ts:83:  // TODO(stakeholder): verified street address — must byte-match Google Business Profile.
content/site.ts:91:  // TODO(stakeholder): confirm office hours.
content/site.ts:98:    // TODO(stakeholder): real Instagram handle.
content/site.ts:102:  // TODO(stakeholder): verify all three stats.
content/site.ts:168:  // TODO(stakeholder): verify every figure in this section — it is the recruiting pitch.
content/site.ts:232:  // TODO(stakeholder): replace placeholder blocks with real fleet photos, keep captions accurate.
content/site.ts:242:  // TODO(stakeholder): confirm team members and whether this section ships at all.
src/components/Hero.tsx:34:          {/* TODO(stakeholder): real hero photo — a truck, front three-quarter, dusk. */}
src/components/Contact.tsx:100:          {/* TODO(stakeholder): replace with a real static map tile of the office. */}
src/components/Header.tsx:21:          {/* TODO(stakeholder): replace text mark with the real logo. */}
app/privacy/page.tsx:10:// TODO(stakeholder): replace stub with counsel-approved privacy policy.
app/terms/page.tsx:10:// TODO(stakeholder): replace stub with counsel-approved terms of use.
```

### Known notes

- **Public Sans has no Cyrillic subset** — Russian body text falls back to the system sans-serif.
  Headers (Overpass) and mono (JetBrains Mono) do ship Cyrillic. If pixel-perfect RU body type
  matters, swap the body font for one with Cyrillic coverage in `app/fonts.ts`.
- The Docker image was authored to the standard Next.js standalone pattern but was **not built on
  the development machine (no Docker daemon)** — run `docker compose -f docker-compose.dev.yml up`
  once on the target box and hit `http://<host>:3000/api/health` before pointing DNS.
- JSON-LD ships `Organization`, `MovingCompany` (closest schema.org type for a carrier) and
  `FAQPage`. Validate at <https://search.google.com/test/rich-results> after the real NAP lands.
- The in-memory rate limit resets on container restart and is per-instance — fine for one box
  behind Caddy, revisit if the site is ever load-balanced.
