# Phase 5 — Live Catalogue Integration

## Implemented
- Product catalogue page now requests the server-only public catalogue endpoint.
- Validates each API product before rendering; malformed entries are ignored.
- Supports search across title, brand, model, description and specification values, plus New/Used filters.
- Displays only published API listings, customer-facing PKR price, condition, product description and coarse availability.
- Uses the first verified HTTPS product image when present, with a neutral SK fallback when no image exists.
- Adds responsive product cards and mobile layout.
- Enquiry links identify the selected product slug but do not create an order or claim a reservation.
- Empty and unavailable catalogue states remain explicit; no sample products or prices are invented.

## Runtime requirements
- Set `STORE_API_URL` as a server-side environment variable after the Worker is deployed and its public origin is confirmed.
- Apply D1 migrations and create real product/inventory records before any listings appear.
- The current storefront API fetch is revalidated every 60 seconds.

## Not included
Checkout, order creation, payment processing, courier quotes, customer accounts, admin UI integration, or deployment. These remain gated on backend runtime/security verification and business-provider setup.
