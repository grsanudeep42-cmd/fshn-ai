# fshn-ai — VTON Operator Platform

> Virtual Try-On SaaS for Indian fashion retail. Shop owners manage their VTON experience, daily access codes, credits, and inventory — all from one dashboard.

---

## What is this?

**fshn-ai** is the operator-side platform for a Virtual Try-On (VTON) service built for Indian fashion retailers — saree shops, boutiques, ethnic wear stores. Shop owners use this to:

- 📊 Track try-on sessions, credits, and revenue in real time
- 🔑 Generate and share daily access codes with staff via WhatsApp
- 💳 Purchase and manage credits (Normal & Premium)
- 🧥 Maintain their garment inventory
- 📈 Analyse customer try-on behaviour and conversion
- 🧾 Handle billing, plan upgrades, and invoices

---

## Monorepo Structure

```
fshn-ai/
└── app/
    ├── apps/
    │   ├── dashboard/     # Operator dashboard — Next.js 14 + Mantine v7
    │   ├── web/           # Customer-facing VTON experience
    │   └── worker/        # Cloudflare Worker — REST API backend
    ├── packages/          # Shared types, utilities, UI tokens
    └── package.json       # npm workspaces root
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Operator Dashboard | Next.js 14 (App Router), Mantine v7, Recharts |
| Customer Web App | Next.js 14 |
| Backend API | Cloudflare Workers (Hono), Hyperdrive → Supabase PostgreSQL |
| Asset Storage | Cloudflare R2 |
| Styling | Vanilla CSS — cream/gold design system (`#C9A84C`, `#FAF8F5`) |
| Fonts | Bodoni Moda (serif headings), Inter (UI) |

---

## Dashboard Pages

| Page | Purpose |
|---|---|
| **Overview** | KPI cards, try-on volume chart, credit breakdown, activity feed |
| **Daily Code** | Generate & WhatsApp-share the 6-char daily staff access code |
| **Credits** | Balance meter, 14-day usage chart, buy credit packs |
| **Inventory** | Garment SKU management — add, search, filter, toggle active |
| **Analytics** | Session funnel, category breakdown, revenue vs cost |
| **Billing** | Current plan, invoice history, monthly spend chart |
| **Settings** | Shop profile, notifications, credit routing rules |

---

## Design System

- **Mobile-first** — bottom tab bar on mobile, slide-in drawer with blur backdrop on tablet, icon rail on desktop
- **Light theme** — cream `#FAF8F5` background, gold `#C9A84C` accents, white cards
- **Sidebar** — Discord/Supabase style: collapses to 72px icon-only rail on desktop, expands on hover with smooth animation

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone
git clone https://github.com/grsanudeep42-cmd/fshn-ai.git
cd fshn-ai/app

# Install all workspaces
npm install

# Run the operator dashboard
npm run dev:dashboard
# → http://localhost:3001
```

---

## Deployment

### Dashboard → Vercel

1. Import `grsanudeep42-cmd/fshn-ai` on [vercel.com/new](https://vercel.com/new)
2. Set **Root Directory** to `app`
3. **Build Command**: `npm run build --workspace=dashboard`
4. **Output Directory**: `apps/dashboard/.next`
5. Deploy ✅

### Backend API → Cloudflare Workers

> ⚠️ The dashboard currently runs on mock data. The Worker is needed only when connecting live APIs.

```bash
cd app/apps/worker
wrangler secret put SUPABASE_DB_URL
wrangler secret put VTON_API_KEY
wrangler deploy
```

---

## Roadmap

- [ ] Connect dashboard to live Cloudflare Worker APIs
- [ ] Replace mock data with real Supabase queries
- [ ] Add garment image upload to R2
- [ ] Customer-facing VTON web app
- [ ] Push notifications for low credit balance
- [ ] Multi-shop support for franchise owners

---

## License

Private — all rights reserved. © 2026 fshn-ai.
