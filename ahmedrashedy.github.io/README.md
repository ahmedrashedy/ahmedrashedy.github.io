# ahmedrashedy.github.io

Freelance services site for **Ahmed Rashedy Mohammed** — Odoo Project Manager & ERP Delivery Consultant.

> Deployed via GitHub Actions on every push to `main`. Live at https://ahmedrashedy.github.io

A static, single-page portfolio built to convert visitors into qualified project enquiries — not a CV dump. Every section is structured around the services I offer, how I deliver them, and where I have shipped them.

Live: **https://ahmedrashedy.github.io**

## What's on the site

1. **Hero** — service-led promise + booking CTA
2. **Stats bar** — credibility numbers (years, projects, industries, on-time rate)
3. **Services** — 4 clickable engagement packages:
   - Pre-Sales & Scoping
   - End-to-End Implementation (featured)
   - Post-Go-Live Optimization
   - Fractional ERP Leadership
   - Clicking any card scrolls to the contact form and **pre-selects the service** in the dropdown
4. **Process** — 4-step delivery loop (Discovery → Design → Build → Go-Live)
5. **Portfolio** — 3 case studies with metrics (E-Boutiques Group, Gromaan & Keem, Hatem & Charcoal)
6. **Industries** — 6 verticals served (Manufacturing, Retail & POS, eCommerce, Distribution, Professional Services, F&B)
7. **About** — freelance bio + differentiators
8. **Testimonials** — anonymised client quotes (names redacted per client request)
9. **FAQ** — 6 common questions with expandable answers
10. **Contact** — service-aware form, plus mailto / WhatsApp / LinkedIn channels as fallbacks

## Tech stack

- [Astro](https://astro.build/) 4 — static output, zero JS framework on the page
- [Tailwind CSS](https://tailwindcss.com/) 3 — utility-first, custom design tokens
- Vanilla TypeScript — for scroll reveal, mobile menu, form submission, and service pre-selection
- Inline SVG icons (no icon-library bloat)
- [Formspree](https://formspree.io) for the contact form (with a `mailto:` fallback that works out of the box)
- GitHub Actions + GitHub Pages for CI/CD

## Design system

- **Primary (ink):** `#0B2545` — deep navy
- **Accent (sky):** `#3DA5D9` — light blue
- **Soft background:** `#F6F9FC`
- **Borders:** `#E2E8F0`
- **Body text:** `#64748B` (slatey)
- **Fonts:** Inter (body) + Inter Tight (headings), loaded from Google Fonts

Tokens live in [`tailwind.config.cjs`](./tailwind.config.cjs) — change them once and the whole site re-themes.

## Local development

Prerequisites: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Dev server starts on http://localhost:4321 with hot reload.

## Production build

```bash
npm run build
npm run preview
```

Static output goes to `dist/` (single HTML file + inlined critical CSS + one CSS asset + favicon + robots.txt).

## Project structure

```
ahmedrashedy.github.io/
├── .github/workflows/deploy.yml   # GitHub Actions: build + deploy to Pages
├── public/
│   ├── favicon.svg                # Navy "AR" mark
│   └── robots.txt
├── src/
│   ├── components/                # One Astro component per section
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── Stats.astro
│   │   ├── Services.astro         # Clickable service cards → contact
│   │   ├── Process.astro
│   │   ├── Portfolio.astro
│   │   ├── Industries.astro
│   │   ├── About.astro
│   │   ├── Testimonials.astro
│   │   ├── FAQ.astro
│   │   ├── Contact.astro          # Form + URL-driven service pre-select
│   │   └── Footer.astro
│   ├── data/
│   │   └── cv.ts                  # Single source of truth for ALL content
│   ├── layouts/
│   │   └── BaseLayout.astro       # <head>, meta, JSON-LD, scroll observer
│   ├── pages/
│   │   └── index.astro            # Composition root for all sections
│   └── styles/
│       └── global.css             # Tailwind layers + component utilities
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
├── package.json
└── README.md
```

## How to update content

Everything — copy, services, FAQs, testimonials, contact details — lives in **one file**: [`src/data/cv.ts`](./src/data/cv.ts).

Edit that file, run `npm run dev`, and you'll see your changes live. The data shape is plain TypeScript so it's safe and predictable to edit.

## Email delivery (read this before going live)

This site is **static** (GitHub Pages has no backend), so the contact form needs a third-party sender. The current setup is **belt-and-braces**:

| Path | Status | Setup | Notes |
|---|---|---|---|
| `mailto:` fallback | ✅ Always works | None | If Formspree isn't configured, the form opens the user's mail client with a pre-filled message. No submissions lost on mobile or desktop. |
| Formspree | ⏳ Configure to enable | 5 min | Sign up at formspree.io, create a form, replace `YOUR_FORMSPREE_ID` in `src/components/Contact.astro` line 4. Free tier = 50 submissions/month. |

To enable Formspree:

1. Create an account at https://formspree.io
2. Create a new form, copy the form ID (looks like `xkgjabcd`)
3. In [`src/components/Contact.astro`](./src/components/Contact.astro), replace the placeholder:

   ```ts
   const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';
   // becomes
   const FORMSPREE_ID = 'xkgjabcd';
   ```

4. Push. Submissions will start arriving in your Formspree inbox (which can forward to any email).

Until you do this, **the site is still useful** — every form submission degrades to a `mailto:` link so leads never bounce.

## Service card → contact pre-select (how the UX works)

Each service card is an anchor with a query-string hash:

```html
<a href="#contact?service=implementation" data-service="implementation">
  ...
</a>
```

On page load (and on `hashchange`), a script in `Contact.astro`:

1. Reads the `service` query param from `window.location.hash`
2. Matches it against `<select id="interest">` options
3. Sets the dropdown value
4. Scrolls into view (browser-native smooth scroll from `global.css`)
5. Focuses the message textarea after a short delay

The dropdown `<option value="...">` values are the canonical service keys: `presales`, `implementation`, `optimization`, `consulting`, `unsure`.

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which runs `npm ci && npm run build` and deploys `dist/` to GitHub Pages.

One-time setup:

1. Create the GitHub repo at `github.com/ahmedrashedy/ahmedrashedy.github.io` (must match exactly for a user Pages site).
2. Add it as a remote and push:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin git@github.com:ahmedrashedy/ahmedrashedy.github.io.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Source: GitHub Actions**.
4. The next push (or this one) will build and deploy. Future pushes auto-deploy.

If you ever want a custom domain, add a `CNAME` file at the repo root and point your DNS at GitHub.

## Performance notes

- Astro inlines critical CSS into the HTML
- One small async script handles all interactivity (scroll reveal, mobile menu, form submit, service pre-select)
- Fonts loaded with `preconnect` and `display=swap`
- Inline SVG icons, no icon-library requests
- No client-side framework runtime

Lighthouse scores in the high 90s for Performance, Accessibility, SEO, and Best Practices are expected out of the box.

## Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`)
- All interactive elements have focus styles
- Form inputs have associated `<label>` elements
- Skip-friendly mobile menu with `aria-expanded` / `aria-controls`
- Color contrast ratios meet WCAG AA for body text on white and on accent backgrounds
- `prefers-reduced-motion` is not yet opted into — easy to add if needed

## What's intentionally not here

- **No image gallery / case-study detail pages.** Portfolio cards summarise the work; full case studies live on request or on LinkedIn.
- **No blog.** Deliberate trade-off — every section on this site earns its place by directly supporting the enquiry flow.
- **No pricing tables.** Engagements are scoped per-project; pricing lives in the proposal, not the website.

## License

Source code: MIT.
Site content (copy, testimonials, case study framing): All rights reserved by Ahmed Rashedy Mohammed.