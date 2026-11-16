# Phase 6 — Customer checkout

## Implemented in this draft
- Product cards show an Order now action only for products marked in stock.
- Server-rendered checkout page resolves a published product from the live catalogue by slug.
- Customer form collects name, Pakistani mobile number, optional email, delivery address, city/province, optional postal code and notes.
- COD and bank-transfer preference options; no card details or gateway claim.
- Same-origin Next.js server route proxies checkout to the Worker without exposing API configuration to the browser.
- Idempotency key is generated per submission and reused for retry after a failed response.
- Customer sees an order reference only after the backend confirms durable order creation.
- Shipping is explicitly not included in the displayed laptop price; store confirms delivery charges before fulfilment.

## Runtime requirements
- Set `STORE_API_URL` on the storefront server.
- Configure Worker `STOREFRONT_ORIGIN` to the exact deployed storefront origin.
- Provision D1 and apply admin migrations through `0006_checkout_idempotency.sql`.
- Seed real products and available inventory units; no fake listings or orders are included.

## Not included
- Shopping cart / multi-item browser UI (backend supports up to eight distinct units).
- Online payment gateway, customer accounts, order tracking, courier integration or deployment.
