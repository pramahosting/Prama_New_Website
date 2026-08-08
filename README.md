# Prama AI — Website

A full rebuild of prama-ai.com: a marketing site for Prama AI's data, analytics and AI
consultancy, covering the full Australian service line — analytics consulting, data engineering,
data science, AI/ML solutions, generative AI & agentic systems, data governance, cloud/platform
engineering and FinOps. Colour palette matches the current live site's brand blue (`#395194`).

## Stack

| Layer      | Choice                                                                 |
|------------|-------------------------------------------------------------------------|
| Frontend   | React 18 + TypeScript + Vite + Tailwind CSS v4 + React Router          |
| SEO        | Per-route meta via `react-helmet-async` (client) + server-side head injection (crawlers) + `sitemap.xml` + JSON-LD |
| Backend    | Node.js + Express 5                                                     |
| Database   | Neon (serverless Postgres) via `pg`                                     |
| AI         | "Ask Prama AI" concierge widget, calls Claude (Anthropic API) via `/api/chat`, grounded in a system prompt describing real services/products |
| Deployment | Docker (multi-stage) → Northflank                                       |

```
prama-ai-site/
├─ client/            React/Vite frontend (SPA)
│  ├─ public/img/       Real prama-ai.com image assets go here — see img/README.txt
│  ├─ src/pages/        Home, Services, About, Contact, NotFound
│  ├─ src/components/  Nav, Footer, CapabilityTicker, ServiceCard, ContactForm, ChatWidget, SEO
│  └─ src/data/        services.ts, site.ts — single source of truth for content
├─ server/            Express backend
│  ├─ index.js         Static hosting + SSR-lite SEO head injection + sitemap.xml
│  └─ src/
│     ├─ db.js         Neon Postgres pool + schema bootstrap
│     └─ routes/       contact.js (leads), chat.js (AI concierge)
├─ app.cmd             Windows launcher — installs deps, builds, and runs locally
├─ Dockerfile          Multi-stage build → single production image
└─ package.json        Root convenience scripts (dev / build / start)
```

## Why this architecture

- **SPA + SSR-lite, not full SSR.** The site is a fast, fully interactive React SPA. Because
  crawlers increasingly render JS, but you shouldn't rely on that alone, the Express server
  rewrites `<title>`, meta description, canonical URL, Open Graph and Twitter tags **per route**
  before the HTML reaches the browser — so search engines and social-media unfurls always see the
  correct page metadata, even without executing JavaScript. This gets most of the SEO benefit of
  SSR without the complexity/cost of a full SSR framework.
- **One Neon Postgres database** backs contact-form leads and (optionally) chat transcripts.
  Neon's serverless Postgres is a natural fit for Northflank — no server to manage, scales to
  zero, and connects over standard `pg`/TLS.
- **The AI concierge is grounded, not freeform.** `/api/chat` sends a system prompt listing your
  actual services and products, so it won't invent pricing, clients, or features — and it politely
  defers to the contact form for anything outside that scope.

## Local development

Requires Node.js 20+.

```bash
npm run install:all   # installs client + server dependencies
cp server/.env.example server/.env   # then fill in DATABASE_URL / ANTHROPIC_API_KEY
npm run dev            # runs Vite dev server (client) + Express (server) together
```

The Vite dev server proxies `/api/*` to the Express server (see `client/vite.config.ts`), so you
can develop against `http://localhost:5173` with working forms and chat.

To build and run the production bundle locally:

```bash
npm run build           # builds client/dist
npm run start --prefix server
# → serves the built site + API on http://localhost:8787
```

## Setting up Neon Postgres

1. Create a free project at [neon.tech](https://neon.tech).
2. Copy the pooled connection string from the Neon console (**Connection Details** →
   **Pooled connection**). It looks like:
   ```
   postgresql://user:password@ep-xxxx-pooler.ap-southeast-2.aws.neon.tech/prama_ai?sslmode=require
   ```
3. Set it as `DATABASE_URL` in `server/.env` (local) or as a Northflank secret (production).
4. That's it — the server creates its own tables (`leads`, `newsletter_subscribers`, `chat_logs`)
   on startup if they don't already exist (see `server/src/db.js`). No manual migration step.

If `DATABASE_URL` is not set, the site still runs — form submissions are logged to the console
instead of persisted, so you can deploy the site before the database is wired up.

## Setting up the AI concierge

1. Get an API key from the [Anthropic Console](https://console.anthropic.com).
2. Set `ANTHROPIC_API_KEY` in `server/.env` (local) or as a Northflank secret (production).
3. Optional: override the model with `ANTHROPIC_MODEL` (defaults to `claude-sonnet-5`).

If unset, the chat widget stays visible but returns a friendly "not configured yet" message
instead of erroring — it won't break the rest of the site.

## Deploying to Northflank

This repo ships a single multi-stage `Dockerfile` that builds the client and runs the server —
Northflank just needs to build and run it.

1. **Push this repository to GitHub** (or your Git provider of choice).
2. In Northflank, **create a new Service** → **Deploy from Git repository** → select this repo.
3. Northflank will detect the `Dockerfile` at the repo root automatically. Leave build context as
   the repo root.
4. **Set the port**: `8787` (matches `EXPOSE 8787` / `PORT` in the Dockerfile). Northflank injects
   its own `PORT` env var at runtime, which the server already reads via `process.env.PORT`.
5. **Add environment variables / secrets** under the service's *Environment* tab:
   - `DATABASE_URL` — your Neon pooled connection string
   - `ANTHROPIC_API_KEY` — your Anthropic API key
   - `ANTHROPIC_MODEL` — optional, defaults to `claude-sonnet-5`
6. **Enable HTTPS + attach your domain**: under *Networking* → *Ports*, expose port 8787
   publicly, then add `www.prama-ai.com` (and `prama-ai.com` with a redirect) as a custom domain
   and point your DNS `CNAME`/`ALIAS` record at the hostname Northflank provides.
7. Deploy. Northflank builds the Docker image from the repo on every push (or on demand), runs
   `node server/index.js`, and serves the built React app + API from that one container.

No separate static hosting or CDN step is required — the Express server serves the built
`client/dist` assets directly with far-future cache headers, and API routes live alongside it on
the same origin (avoids CORS complexity and keeps everything on one Northflank service).

## SEO checklist covered

- Unique `<title>` / meta description / canonical URL per route (server-injected + client-synced)
- Open Graph + Twitter Card tags with a generated 1200×630 OG image (`client/public/og-image.png`)
- `robots.txt` pointing at `/sitemap.xml`
- `/sitemap.xml` generated from the same route list used for meta tags (stays in sync)
- JSON-LD structured data: `Organization` (home), `Service` (services page, listing every
  service category)
- Semantic headings, descriptive link text, keyboard-visible focus states, and
  `prefers-reduced-motion` support throughout

## Content model

All service copy lives in one file, so updates don't require touching any component:

- `client/src/data/services.ts` — one entry per service category (data engineering, data
  science, AI/ML solutions, data visualisation, generative AI & agentic systems, analytics
  consulting, data governance, cloud & platform engineering, FinOps), each with a summary and a
  list of sub-items. Add or edit an entry here and the services page, homepage preview grid, and
  footer links all update automatically.
- `client/src/data/site.ts` — company name, tagline, address, email, and nav links.

## Visual system — logo only, everything else generated

Only one external image is used anywhere on the site: `client/public/img/company_logo_tr.png`
(nav + footer logo). Every other visual — hero backgrounds, service/product tile icons, the
About page's stat panel — is generated in code via CSS gradients and `lucide-react` icons. This
keeps the whole design self-contained, licence-free, fast to load, and easy to re-theme.

Key pieces, all in `client/src/index.css`:
- `.hero-vibrant` — the animated gradient-mesh hero background (violet/cyan/coral blobs over a
  deep navy base, with a faint dot-grid overlay), used on the Home, Services, Products and About
  page heroes.
- `.tile-0` through `.tile-5` — a rotating palette of vivid gradient tiles (violet, cyan, coral,
  emerald, brand blue, pink) used behind every service/value icon, in the colourful "tile" style
  of prama.ai.
- `.gradient-panel` — a violet→blue→cyan gradient panel used for stat call-outs (About page,
  Home's About teaser).

## Colour palette

Matches the live prama-ai.com brand:

| Token         | Hex       | Use                                   |
|---------------|-----------|----------------------------------------|
| Brand blue    | `#395194` | Primary CTAs, links, active nav state |
| Blue (hover)  | `#4d68ad` | Hover state for brand-blue buttons     |
| Navy text     | `#16223f` | Headings and body copy                 |
| Slate         | `#57628a` | Secondary/muted text                   |
| Light panel   | `#f3f5fb` | Alternating section backgrounds        |
| White         | `#ffffff` | Page background                        |
