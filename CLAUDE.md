# Avangard Express Inc — Landing Page

Repo root file. Claude Code reads this automatically.

## Brief

One-page marketing site for **Avangard Express Inc**, a US trucking carrier.
Production domain: `https://www.avangardexpresscorp.com` (apex `avangardexpresscorp.com` → 301 to `www`).

Two audiences: **drivers** (primary conversion — their Instagram highlights are in Russian, so the
recruiting funnel is Russian-speaking owner-operators) and **shippers/brokers** (need to verify the
carrier is real and reach dispatch in five seconds).

All copy, logo, phone, address, DOT/MC numbers and photos are **placeholders**, each tagged
`// TODO(stakeholder)`. Build the machine, not the content.

## Non-goals

No CMS, no database, no auth, no blog, no driver portal, no chat widget, no cookie banner,
no third-party embeds, no multi-page routing. `/privacy` and `/terms` stubs are the only extra routes.

## Stack (locked)

Next.js 14+ App Router · TypeScript strict · Tailwind (tokens in `tailwind.config.ts`) ·
`next/font/local` (self-hosted, no Google Fonts CDN) · `lucide-react` · React Hook Form + Zod ·
`nodemailer` · `output: 'standalone'` · `node:22-alpine` · Docker Compose + Caddy · pnpm.

No animation library. No state library.

## Content model

Everything swappable lives in `content/site.ts` — typed, so a typo is a build error.
Fields: `legalName, dot, mc, phone, dispatchPhone, email, recruitingEmail, address{street,city,state,zip},
hours, social.instagram, stats[], services[], fleet[], team[], faq[]`.

**No copy string is hardcoded in a component.** Prose fields are `{ en, ru }` pairs; phone and
address are single-valued. `README.md` gets a "Handing off to the client" section listing every TODO.

## Sections (in order, anchored)

1. **Hero `#top`** — headline says what the company does and who it wants, plainly. Not "Driving the
   future of logistics." Two CTAs: *Apply to drive* (primary), *Get a quote* (secondary). Right side:
   dark-graded photo slot, `priority`. Below: three stats in mono, odometer-style.
2. **Trust bar** — DOT #, MC #, insurance carrier, years active. Mono, hairline-separated, deliberately
   boring. This is what a broker scans before calling.
3. **Services `#services`** — 3–4 bordered cards: Dry Van, Reefer, Flatbed, Expedited. Icon, one
   sentence, 2–3 spec bullets.
4. **Why drivers stay `#drivers`** — the most important section. 2×3 grid: pay structure, home time,
   fuel card, no forced dispatch, equipment age, 24/7 dispatch. Claim + supporting number. Ends in a CTA.
5. **Fleet `#fleet`** — 4–6 lazy-loaded photos, aspect-locked, captioned `Year Make Model`.
   Placeholder images are flat brand-blue blocks with the filename printed on them.
6. **Team `#team`** — renders only if `site.team.length > 0`. Max 3 cards.
7. **FAQ `#faq`** — native `<details>/<summary>`, no JS. 6–8 questions, split driver/shipper.
8. **Apply / Contact `#contact`** — two panels. Driver form → `/api/apply`. Shipper quote → `/api/quote`.
   Address, hours, phones, static map image linking out to Google Maps (no iframe, no API key).
9. **Footer** — legal name, DOT/MC, © year, privacy, terms, Instagram. One quiet line.

## Design

Dark ground, one blue, taken from their logo. Minimal direction — it lives or dies on spacing and
alignment, so nothing may be "sort of" aligned.

```
ink       #0B0D10   surface  #14181E   line   #232A33
haze      #8B949E   paper    #F5F7F8
blue      #3E9BCB   blue-deep #1D5F82
amber     #F2A83B   RESERVED for the hiring CTA. Nowhere else.
```

- **Display: Overpass** — a Highway Gothic derivative, the letterforms on every interstate sign the
  fleet drives past. Uppercase, tight tracking, 600/700, headers only.
- **Body: Public Sans** — 400/500, line-height 1.65.
- **Utility: JetBrains Mono** — DOT#, MC#, stats, phone numbers, form labels. Anything that is *data*
  is set in mono. This one rule is what makes the page read as a carrier and not a SaaS.

Type scale: 12 / 14 / 16 / 20 / 28 / 40 / 64. Nothing between.

**Signature element — the lane rule.** Sections are separated by a 2px dashed rule in `line`, dash:gap
proportioned like a US highway skip line, full container width. On first scroll into view the dashes
translate horizontally once (~600ms, ease-out) then stop. Road passing under the truck. CSS
`repeating-linear-gradient` + an `IntersectionObserver` class toggle. This is the only flourish.

**Motion budget:** lane rules animate once; sections fade+rise 12px on reveal, 400ms, 60ms stagger;
buttons transition color only, 150ms, no scale. Nothing loops, nothing parallaxes.
`prefers-reduced-motion: reduce` disables all of it. Non-negotiable.

## Bilingual EN / RU

Ship both. `src/lib/i18n.ts` exports `type Lang = 'en'|'ru'` and a keyed `dict`. No i18n library —
a context + hook is enough for one page. Language persists in a **cookie** (so SSR renders correctly),
defaults from `Accept-Language`, falls back to `en`. `LangSwitch` is a text toggle `EN · RU` in the
header — not a flag, not a dropdown. `<html lang>` updates; `hreflang` alternates in `<head>`.
RU strings run ~20% longer — size CTAs for the longer string. Flag machine-translated RU in the README
so the stakeholder proofs it.

## API routes

`/api/apply`, `/api/quote`, `/api/health`.

Parse with the shared Zod schema (400 + field errors on failure). Honeypot field + <2s submit timestamp
→ return fake success, don't teach the bot. In-memory IP rate limit, 5 req / 10 min. Send via
`lib/mailer.ts`; **if `SMTP_HOST` is unset, log to stdout and return success** — the site must be fully
functional with an empty `.env`. Never echo user input into the response unescaped.
Return `{ ok: true } | { ok: false, errors: Record<string,string> }`.

## Docker (integrated, TLS on by default)

`Dockerfile`: three stages — `deps` (`pnpm install --frozen-lockfile`), `builder` (`pnpm build`),
`runner` (`node:22-alpine`, copy `.next/standalone` + `.next/static` + `public`, user `nextjs` uid 1001,
`EXPOSE 3000`, `CMD ["node","server.js"]`). `HEALTHCHECK` hits `/api/health`. Write `.dockerignore`.
Final image < 200 MB.

`docker-compose.yml`: two services.

- `web` — built from the Dockerfile, `env_file: .env`, `restart: unless-stopped`, no published ports.
- `caddy` — `caddy:2-alpine`, ports `80:80` and `443:443`, mounts `./Caddyfile` and named volumes
  `caddy_data` + `caddy_config` so certificates survive a rebuild.

`Caddyfile`:

```
avangardexpresscorp.com {
  redir https://www.avangardexpresscorp.com{uri} permanent
}
www.avangardexpresscorp.com {
  encode gzip zstd
  reverse_proxy web:3000
}
```

Caddy provisions and renews Let's Encrypt certs automatically once both A records point at the server.
For local work, `docker compose -f docker-compose.dev.yml up` publishes `web` on `:3000` and skips Caddy.

`.env.example` — all optional: `SMTP_HOST, SMTP_PORT=587, SMTP_USER, SMTP_PASS, MAIL_TO,
NEXT_PUBLIC_SITE_URL=https://www.avangardexpresscorp.com`.

Deploy contract, on a bare Ubuntu box with Docker and DNS pointed:

```bash
git clone … && cd avangard-express
cp .env.example .env
docker compose up -d --build
```

If it takes more than that, the build is wrong.

## SEO + local search hooks

The website's job here is to be the *citation source* that Google Business Profile and ad platforms
verify against. Build these hooks; the account setup happens outside the repo.

- **NAP consistency.** The legal name, address and phone rendered on the page must byte-match what gets
  entered in Google Business Profile. All three come from `content/site.ts` — that's why it's one file.
- **JSON-LD:** `Organization`, `LocalBusiness` (use `@type: MovingCompany`, closest schema.org fit for a
  carrier — include `address`, `telephone`, `openingHours`, `areaServed`, `sameAs: [instagram]`),
  and `FAQPage` on the FAQ section.
- **Metadata:** canonical `https://www.avangardexpresscorp.com`, title, description, OpenGraph,
  Twitter card, `public/og.jpg` at 1200×630.
- `app/sitemap.ts` and `app/robots.ts`, both absolute-URL'd off `NEXT_PUBLIC_SITE_URL`.
- **Verification slots:** support an optional `GOOGLE_SITE_VERIFICATION` env var rendered as a
  `<meta name="google-site-verification">`, and an optional `META_PIXEL_ID` that, *only when set*,
  injects the Meta pixel via `next/script` with `strategy="afterInteractive"`. Both absent by default —
  no tracking ships unless someone opts in.
- Contact section must expose `tel:` and `mailto:` links, and the address as a real `<address>` element.

## Quality floor (acceptance criteria)

Lighthouse mobile ≥ 95 / 100 / 100 / 100. LCP is the hero image, AVIF/WebP via `next/image`.
Browser JS < 120 KB gzipped; non-interactive sections are Server Components. Keyboard-reachable
everything with a visible `blue` `:focus-visible` ring. Forms: bound `<label>`s, `aria-invalid` +
`aria-describedby`, errors in a `role="alert"` region. Responsive 320 → 1920. Zero console errors,
zero TS errors under `strict`.

## Build order

Scaffold + tokens + fonts + `site.ts` → `ui/` primitives (get the lane rule right first) → header,
hero, trust bar (screenshot at 320 and 1280, critique your own spacing) → services, drivers, fleet, FAQ
→ i18n retrofit → forms + API → SEO + JSON-LD → Docker + Caddy (build the image, run it, curl it) →
Playwright smoke test + Lighthouse → README handoff.

## Definition of done

- [ ] `docker compose up -d --build` on a clean box serves `https://www.avangardexpresscorp.com` with a valid cert
- [ ] Apex redirects to `www`; certs survive `docker compose down && up`
- [ ] Site fully functional with an empty `.env`
- [ ] `grep -r "TODO(stakeholder)"` output pasted into the README handoff section
- [ ] EN and RU both render and both fit their containers
- [ ] Both forms validate client- and server-side; honeypot works
- [ ] JSON-LD passes Google's Rich Results Test
- [ ] No hardcoded copy in any component
- [ ] `prefers-reduced-motion` kills all animation