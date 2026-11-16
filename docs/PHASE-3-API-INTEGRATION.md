# Phase 3 — Storefront API integration foundation

## Purpose
The public Next.js storefront must consume only explicitly published product data from the private store backend. It must never receive supplier costs, margins, internal notes, customer records, order records, credentials, or admin metadata.

## Configuration
Set `STORE_API_URL` only in the deployment environment after the private API has been deployed and its origin/CORS policy is verified. Do not commit secrets or production URLs.

## Current behavior
- `src/lib/store-api.ts` provides a server-only typed fetch boundary.
- If the API is not configured, unavailable, or returns an invalid response, the storefront receives an empty product list.
- No sample products, prices, stock counts, or reviews are fabricated.
- Product pages should render explicit empty/loading/error states until verified catalogue data exists.

## Contract
`GET /api/public/products` returns only published, customer-safe product fields:
`id, slug, title, brand, model, condition, price_pkr, currency, short_description, specifications, images, availability`.

## Security rules
- Never call private admin endpoints from browser components.
- Never expose API secrets through `NEXT_PUBLIC_*` variables.
- Validate image URLs and all product fields at the backend before publication.
- Public availability is a coarse state, not internal stock ledger data.
- Keep checkout disabled until order validation, idempotency, payment reconciliation, and abuse controls exist.

## Not yet implemented
The backend Worker, D1 database, authentication, admin authorization, product management API, order lifecycle, payment, courier integration, and production deployment are separate milestones. This file is an integration boundary, not a claim that those systems are live.
