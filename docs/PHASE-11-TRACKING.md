# Phase 11 — Customer order tracking

## Implemented in this draft
- Checkout success returns a private tracking link using the order's idempotency secret.
- Customer tracking page loads the secure token through a same-origin Next.js proxy.
- Proxy forwards the token to the Worker tracking endpoint without exposing STORE_API_URL to the browser.
- Tracking view displays order reference, current status, courier and tracking number when available, and the order status timeline.
- Tracking endpoint returns no customer contact or delivery address fields.

## Runtime requirements
- Configure STORE_API_URL and Worker STOREFRONT_ORIGIN.
- Apply admin/backend D1 migrations through 0007_order_fulfilment_tracking.sql.
- Verify checkout and tracking in staging with real test orders.

## Not included
- Courier API integration, automated notifications, customer login, order search by phone/order number, deployment or production database changes.
