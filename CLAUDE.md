# CLAUDE.md — Avangard Express Corp Website

Next.js 14 App Router site for a real FTL trucking carrier (USDOT 4229721,
MC1636213, Wheeling IL). Two pages: a dark one-pager (`/`) and a light
"ticket" quote wizard (`/quote`), plus `/privacy` and `/terms` stubs.
`pnpm dev` / `pnpm build` / `pnpm typecheck` (no ESLint configured —
`pnpm lint` prompts interactively; don't run it in automation).

Deployed via Docker (multi-stage, `output: 'standalone'`) on Render;
`docker-compose.yml` + `Caddyfile` also support a DigitalOcean droplet with
automatic Let's Encrypt SSL. English only — i18n was built once and
deliberately removed; ask before reintroducing.

## Architecture / key files

- `app/page.tsx` + `src/components/{Header,Hero,TruckGraphic,Services,Coverage,WhyUs,Contact,Footer}.tsx`
  — homepage, styled by `src/styles/home.module.css`.
- `app/quote/page.tsx` + `src/components/QuoteWizard.tsx` — 3-step wizard
  (intro → RGN vs Dry Van → type-specific form → confirmation), styled by
  `src/styles/quote.module.css`.
- `content/site.ts` — all copy/data (contact info, services, regions,
  why-us items). Edit content here, never in components.
- `app/api/quote/route.ts` + `src/lib/{form-handler,mailer,schemas,rate-limit}.ts`
  — the live form backend (below).
- `app/{icon1.svg,icon2.png,favicon.ico,apple-icon.png}` — favicon set (below).

**CSS Modules are mandatory for page styles, never plain `.css`.** The two
pages share class names (`.field`, `.wrap`, `.eyebrow`) with different
rules, and Next.js doesn't evict a page's global CSS on client navigation —
plain CSS caused real cross-page style corruption here. Module hashing
makes it impossible.

## Design system

Industrial freight aesthetic: asphalt `#14181c`, signal-amber `#f2a93b`,
concrete `#edeae3`, Oswald (display) / Inter (body) / JetBrains Mono
(labels, manifest rows) via `next/font` variables in `app/fonts.ts`.

**Light/dark mode** (user-requested): `data-theme` on `<html>`, set by an
inline pre-paint script in `app/layout.tsx` (localStorage → OS preference →
dark default). `ThemeToggle.tsx` sits in the desktop header, the mobile
menu panel, and the quote page top nav. Each stylesheet splits colors into:
- **Fixed constants** (never flip): amber fills, dark-on-amber button text
  (`--asphalt`), the truck graphic, the dark form inputs, the quote ticket.
- **Adaptive vars** (flip via `:global([data-theme='light']) .homePage`):
  `--bg, --card, --text, --text-muted, --text-faint, --line, --header-bg,
  --accent-text`.

**The amber-text rule**: raw amber is ~1.7:1 on light surfaces. Amber
*text* must use `--accent-text` (amber in dark, `#8a5a10` in light —
5.3:1/4.9:1/5.9:1 on smoke/concrete/white); amber *fills* keep
`--signal-amber`. The concrete `.light` sections pin their own
light-surface-safe `--line`/`--accent-text` since they're light in both
themes. Every new color must measure ≥4.5:1 against its actual surface —
compute it (WCAG relative luminance), don't eyeball.

## Forms & backend

Both forms POST JSON to `/api/quote` (`kind: 'rgn' | 'dryvan' | 'quick'`,
one `z.discriminatedUnion` in `schemas.ts`). Handler pipeline
(`form-handler.ts`): rate limit (5/10min/IP, in-memory) → 10KB
Content-Length shed before parsing → honeypot + submit-timing check (bots
get fake success) → zod validate → strip `<>` → send email → return
`AVG-YYMMDD-XXXX` ref shown to the user and put in the subject line.

Client error handling distinguishes **field validation errors** (shown
under the specific field — a mailto wouldn't fix bad data) from **delivery
failures** (network/500/rate-limit — these show the mailto fallback link).
Don't collapse the two.

`mailer.ts` keeps **one pooled nodemailer transporter per process**
(maxConnections 2, 10s/15s timeouts) — never create a transporter
per-request; the TLS+auth handshake was the endpoint's dominant cost.
Without `SMTP_HOST` it logs the email to stdout and reports success, so
dev/deploy work with zero config. Real delivery needs env vars
(`SMTP_HOST/PORT/USER/PASS`, `MAIL_TO` → admin1@avangardexpresscorp.com);
currently Gmail SMTP with an App Password (~500/day cap — move to
Resend/Brevo if volume grows). SMS was asked about and deferred — needs a
provider + credentials, don't stub it.

## Caching (next.config.mjs `headers()`)

- Pages (`/`, `/quote`, `/privacy`, `/terms`): `public, max-age=300,
  stale-while-revalidate=3600` — all statically prerendered, content only
  changes on redeploy.
- `/api/*`: `no-store` — caching a POST with rate-limit/honeypot side
  effects is a correctness bug.
- **Do not add headers for `/robots.txt` or `/sitemap.xml`** — Next's
  metadata handlers set their own Cache-Control, and `headers()` *appends*,
  producing an invalid double header.
- `/_next/static/*` is already `immutable` by default; don't touch.

## Favicon (Safari is the trap)

Safari doesn't support SVG favicons and chokes on PNG-compressed ICOs, then
falls back to a domain-letter monogram. The working set: `icon1.svg`
(modern browsers), `icon2.png` (numbered so it's the *last* `rel=icon`
link — Safari uses the last one), `favicon.ico` as a **classic
uncompressed BMP ICO** (16+32px), `apple-icon.png` 180px. PNG/ICO are
generated programmatically (pure-Python rasterizer, no imaging libs) from
the same geometry as the SVG. Safari also caches favicons in its own
database — "still broken" reports are usually cache, so verify by curling
the live URL before changing code.

## Deploy — lessons already paid for

- **pnpm supply-chain gate**: newer pnpm blocks native install scripts
  (`ERR_PNPM_IGNORED_BUILDS`). `sharp` hit this and broke the Docker build;
  it was only used by a deleted placeholder script, so it was removed.
  Don't add deps with install scripts without checking.
- **`public/` must exist**: the Dockerfile COPYs it, git doesn't track
  empty dirs — `public/.gitkeep` guards this. Deleting it breaks the build
  with `"/app/public": not found`.
- Render's `buildcache: not found` log line is a harmless first-build
  cache miss, not an error.
- Env vars live in Render's Environment tab (or the droplet's `.env`) —
  local `.env` is gitignored and never travels with the code.
- `req.txt` is a human-readable deploy checklist (this is Node, not
  Python — package.json is the real manifest).

## Verification workflow that caught real bugs

1. `pnpm typecheck && pnpm build`.
2. Test against the **standalone server**, not just dev: copy `public/`
   and `.next/static` into `.next/standalone/`, run `node server.js` — this
   is byte-for-byte what Docker's CMD runs, and it surfaced header/asset
   issues dev mode hides.
3. Exercise the API with curl: valid submission (expect ref), invalid
   fields (expect 400 with field map), honeypot (expect fake 200),
   oversized body (expect 413).
4. Check contrast of any new color with a WCAG luminance script.
5. JSON-LD in `layout.tsx` must stay a **single object** — a bare array
   crashes Safari's structured-data reader (`r["@context"].toLowerCase()`).

## Before launch

- [ ] Real device pass (mobile Safari + Chrome), both themes.
- [ ] SMTP env vars set in the deploy environment (else submissions only
      log to stdout while looking successful).
- [ ] `scripts/smoke.mjs` is stale (tests the pre-rebuild site) — rewrite
      or delete before trusting it.
