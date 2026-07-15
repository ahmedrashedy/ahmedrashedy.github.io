# armmr-eg.com

Freelance services site for **Ahmed Rashedy Mohammed** — Odoo Project Manager & ERP Delivery Consultant.

Live: **https://armmr-eg.com**

## Architecture

```
                User browser
                       │
                       │ HTML / CSS / JS
                       ▼
           GitHub Pages (static site)
              https://armmr-eg.com
                       │
                       │ POST /api/contact  (CORS)
                       ▼
        Cloudflare Worker (Resend handler)
       https://api.armmr-eg.workers.dev
                       │
                       │ HTTPS API call (server-to-server, API key never exposed)
                       ▼
                  Resend API
                       │
                       ▼
          ahmedrashedy001@gmail.com
```

- **Static site** lives on GitHub Pages at `armmr-eg.com`
- **Form backend** lives on Cloudflare Workers at `*.workers.dev` (or `api.armmr-eg.com` via custom domain)
- **Email service** is Resend (free tier: 100/day, 3,000/month)
- **Static site never sees the Resend API key** — it lives only as a Cloudflare secret

## What's on the site

1. **Hero** — service-led promise + booking CTA
2. **Stats bar** — credibility numbers
3. **Services** — 4 clickable engagement packages → each scrolls to contact + pre-selects the service
4. **Process** — 4-step delivery loop (Discovery → Design → Build → Go-Live)
5. **Portfolio** — 3 case studies with metrics
6. **Industries** — 6 verticals served
7. **About** — freelance bio + differentiators (AI-augmented delivery highlighted)
8. **Testimonials** — anonymised client quotes
9. **FAQ** — 6 expandable questions
10. **Contact** — form posts to worker → email via Resend
11. **Footer** + **floating back-to-top** + **floating "Let's Talk" CTA**

## Tech stack

- [Astro](https://astro.build/) 4 — static output, zero JS framework on the page
- [Tailwind CSS](https://tailwindcss.com/) 3 — utility-first, custom design tokens
- Vanilla TypeScript — scroll reveal, mobile menu, form submit, service pre-select
- Inline SVG icons (no icon-library bloat)
- [Cloudflare Workers](https://workers.cloudflare.com/) — serverless form backend (free tier)
- [Resend](https://resend.com) — transactional email
- GitHub Actions + GitHub Pages — CI/CD for the static site

## Design system

- **Primary (navy/ink):** `#0B2545`
- **Accent (sky):** `#3DA5D9`
- **Soft background:** `#F6F9FC`
- **Borders:** `#E2E8F0`
- **Body text (slatey):** `#64748B`
- **Fonts:** Inter (body) + Inter Tight (headings), loaded from Google Fonts

Tokens live in [`tailwind.config.cjs`](./tailwind.config.cjs).

## Repository layout

```
.
├── .github/workflows/deploy.yml   # GH Actions: build + publish static site
├── public/                          # Static assets (favicon, robots, sitemap, OG image)
├── src/
│   ├── components/                  # One Astro component per section
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── Stats.astro
│   │   ├── Services.astro         # Clickable service cards
│   │   ├── Process.astro
│   │   ├── Portfolio.astro
│   │   ├── Industries.astro
│   │   ├── About.astro
│   │   ├── Testimonials.astro
│   │   ├── FAQ.astro
│   │   ├── Contact.astro          # Form posts to worker
│   │   ├── Footer.astro
│   │   └── FloatingActions.astro  # Back-to-top + Let's Talk
│   ├── data/cv.ts                  # Single source of truth for content + contactApiUrl
│   ├── layouts/BaseLayout.astro    # <head>, meta, JSON-LD schemas, scroll observer
│   ├── pages/index.astro           # Composition root
│   └── styles/global.css           # Tailwind layers + utilities
├── worker/                          # SEPARATE Cloudflare Worker (Resend backend)
│   ├── src/index.ts                # Worker handler (TypeScript)
│   ├── wrangler.toml               # Cloudflare config
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md                   # Deploy + secret setup instructions
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
├── package.json
└── README.md                       # You are here
```

The `worker/` directory is **independent** — it has its own `package.json` and deploys separately via Wrangler. The two pieces are linked at runtime only by the `PUBLIC_CONTACT_API_URL` env var.

## Local development

### Static site

```bash
npm install
npm run dev
```

Dev server: http://localhost:4321

To point the contact form at a locally-running worker during dev, set `PUBLIC_CONTACT_API_URL`:

```bash
PUBLIC_CONTACT_API_URL=http://localhost:8787 npm run dev
```

### Worker

```bash
cd worker
npm install
cp .dev.vars.example .dev.vars   # edit with your real Resend key
npm run dev                      # http://localhost:8787
```

See [`worker/README.md`](./worker/README.md) for full details.

## Production build

```bash
npm run build
npm run preview                  # serves dist/ locally for testing
```

Output goes to `dist/` — pure HTML + CSS + one JS bundle.

## Deployment

### Static site (GitHub Pages)

Pushes to `main` trigger [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) which builds and publishes to GitHub Pages at `armmr-eg.com`.

**One-time setup:**

1. Create the GitHub repo under your account.
2. Add as remote + push:
   ```bash
   git remote add origin https://github.com/<user>/armmr-eg.com.git
   git push -u origin main
   ```
3. **Settings → Pages → Source:** `GitHub Actions`.
4. **Settings → Pages → Custom domain:** `armmr-eg.com`. Wait for DNS check. Enable **Enforce HTTPS** once cert is issued.
5. **DNS** (wherever the domain is registered — Namecheap, Cloudflare, etc.):
   - `armmr-eg.com` → Apex alias / A records to GitHub Pages IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`)
   - `www.armmr-eg.com` → CNAME to `<user>.github.io`

   If your DNS is on Cloudflare (recommended when using Workers), proxy through Cloudflare for free and skip the apex A records (Cloudflare handles it automatically).

6. **Optional:** Add `PUBLIC_CONTACT_API_URL` as a GitHub Actions secret (Settings → Secrets and variables → Actions) and reference it in the workflow file. Otherwise the form posts to the placeholder URL in `src/data/cv.ts`.

### Worker (Cloudflare Workers + Resend)

See [`worker/README.md`](./worker/README.md) for full step-by-step.

TL;DR:

```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put RESEND_API_KEY   # paste your re_xxx key
npm run deploy
```

After deploy, take the printed URL (e.g. `https://armmr-eg-contact-form.<account>.workers.dev`) and either:
- Paste it as the value of `PUBLIC_CONTACT_API_URL` in your GitHub Actions secret, OR
- Edit `src/data/cv.ts` `contactApiUrl` directly and push again.

Optionally attach a custom subdomain (`api.armmr-eg.com`) in Cloudflare dashboard.

## Customizing content

Everything — copy, services, FAQs, testimonials, contact details — lives in [`src/data/cv.ts`](./src/data/cv.ts). Edit that one file, run `npm run dev`, and you'll see your changes live.

## Performance notes

- Astro inlines critical CSS into the HTML
- One small async bundle handles all interactivity (4 KB gzipped)
- Fonts loaded with `preconnect` and `display=swap`
- Inline SVG icons, no icon-library requests
- No client-side framework runtime
- Worker is sub-50ms globally on Cloudflare's edge

## Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`)
- All interactive elements have focus styles
- Form inputs have associated `<label>` elements
- Skip-friendly mobile menu with `aria-expanded` / `aria-controls`
- `prefers-reduced-motion` honored on scroll behavior and entrance animations
- Color contrast ratios meet WCAG AA

## What's intentionally not here

- **No pricing tables.** Engagements are scoped per-project; pricing lives in the proposal.
- **No blog.** Every section directly supports the enquiry flow.
- **No contact-form spam protection.** Add Cloudflare Turnstile or simple IP rate limiting if abuse becomes an issue — see `worker/README.md`.

## License

Source code: MIT.
Site content (copy, testimonials, case study framing): All rights reserved by Ahmed Rashedy Mohammed.
