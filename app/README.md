# MyFashion Monorepo

Mobile-first AI Virtual Fitting Room (VTON) platform for Indian ethnic and western retail stores.

## Architecture Overview

```
myfashion/
├── apps/
│   ├── web/                     # Next.js 14 (App Router, TypeScript, Tailwind)
│   │   ├── src/app/
│   │   │   ├── (home)/          # Customer home & Worker connection tester
│   │   │   ├── (store)/         # In-store QR landing & branch catalog (/store/[branchSlug])
│   │   │   ├── (try-on)/        # 4-Step virtual try-on flow (/try-on)
│   │   │   ├── (wallet)/        # Credit balance & tiered top-up packs (/wallet)
│   │   │   ├── (history)/       # Customer lookbook history (/history)
│   │   │   ├── (account)/       # Profile, phone OTP & DPDP privacy settings (/account)
│   │   │   └── api/ping/        # Test ping route proxy
│   │   └── assets/              # Pre-made UI exports & design references
│   └── worker/                  # Cloudflare Worker (TypeScript, Hono API)
│       ├── wrangler.toml        # Hyperdrive, R2, and secret bindings
│       ├── .dev.vars.example    # Local secrets template
│       └── src/
│           ├── index.ts         # Hono app entry point & CORS
│           ├── routes/ping.ts   # GET /api/ping test endpoint
│           └── types/env.ts     # Cloudflare Worker Env bindings interface
└── packages/
    └── shared-types/            # Shared TypeScript types & Zod schemas
        └── src/
            ├── api.ts           # PingResponse, ApiResponse, ApiErrorResponse
            ├── schemas.ts       # Zod validation schemas (PingQuery, TryOn, OTP)
            └── models.ts        # Domain models (Store, Garment, TryOnSession, etc.)
```

## Security & Secrets Model

- **No Secrets in `apps/web`**: The frontend references only public configuration (`NEXT_PUBLIC_WORKER_API_URL`). Zero database credentials, cloud storage keys, or AI provider tokens exist in the web app.
- **Secrets Isolated in `apps/worker`**:
  - `SUPABASE_DB_URL` (configured via Cloudflare Hyperdrive binding)
  - `MONGO_DATA_API_URL`
  - `MONGO_DATA_API_KEY`
  - `R2_BUCKET` (Cloudflare R2 bucket binding)
  - `VTON_API_KEY`
  - `VTON_API_URL`
  - `OTP_PROVIDER_API_KEY`

All production secrets are provisioned via `wrangler secret put <NAME>`. For local development, secrets can be defined in `apps/worker/.dev.vars`.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
To run both the Next.js frontend (port 3000) and Cloudflare Worker (port 8787) concurrently:
```bash
npm run dev
```

Or run individual workspaces:
```bash
# Cloudflare Worker only (http://localhost:8787)
npm run dev:worker

# Next.js frontend only (http://localhost:3000)
npm run dev:web
```

### 3. Verification Route
Visit `http://localhost:3000` to see the live **Worker Connection Status** card, which calls `GET /api/ping` on the Worker to confirm the frontend-to-worker connection.

Or call the Worker directly:
```bash
curl http://localhost:8787/api/ping?echo=hello
```
Response:
```json
{
  "status": "ok",
  "message": "pong: hello",
  "timestamp": "2026-09-11T14:45:00.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```
