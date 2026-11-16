# Phase 4 — Storefront Checkout Readiness

## Current state
The storefront has a server-side, customer-safe catalogue API boundary. It does not yet create real orders or accept payments. Do not display a successful order confirmation until the backend has durably created an order.

## Checkout contract to implement after backend readiness
- Collect only the minimum customer details required to fulfill an order.
- Validate Pakistani phone numbers, required address fields, and cart quantities on the server.
- Re-read product prices and availability from D1; never trust client-submitted totals.
- Create order and order items in one database transaction/batch with an idempotency key.
- Keep payment status as unverified until an owner verifies a bank transfer; COD remains a distinct payment method.
- Do not collect card data or imply an online payment gateway is configured.
- Return an opaque order reference; do not expose sequential database IDs or private operational fields.
- Customer-facing order status must use a restricted, non-guessable lookup token and rate limiting.
- WhatsApp may be offered as a contact channel, but no message should be sent automatically without explicit customer action.

## Business information still required before live checkout
- Verified business phone/WhatsApp number and email.
- Courier provider, rates, serviceability, and delivery estimates.
- Final checking warranty, return/refund, privacy, and terms policies.
- Actual product photos, condition details, and confirmed stock.

## Deployment
No checkout endpoint, payment processing, or live order storage is enabled by this document. Domain and deployment remain deferred.
