# Phase 1 — Storefront foundation

## Business scope
SK LAPTOP STORE serves customers across Pakistan. The catalogue will include new and used laptops first, with chargers, bags, SSDs, RAM and accessories added in later phases. Sales channels are the website and WhatsApp. Payment methods planned: cash on delivery (COD) and bank transfer. Courier integration remains pending provider, account, rates, serviceability and API verification.

## Customer experience
- Homepage with clear laptop categories and trust information.
- Separate new and used listings.
- Search, filters, sorting and product comparison (up to three items).
- Product detail pages with genuine photos and accurate specifications.
- Cart, checkout, order confirmation and order tracking.
- WhatsApp inquiry/support, contact and about pages.
- Shipping, checking, return/refund, privacy and terms policies.

## Product data requirements
Every product needs a unique SKU, brand/model, CPU, RAM, storage, display, condition (new/used), price, availability, genuine photos and publish status. Used products additionally require an individual condition grade and honest battery, body, keyboard, screen and repair-history notes where known. Never invent stock, reviews, warranty coverage or delivery promises.

## Architecture and boundaries
- Next.js App Router, React, strict TypeScript and Tailwind CSS.
- Cloudflare Workers with the OpenNext Cloudflare adapter; D1 for structured data and R2 for product media, subject to compatibility validation.
- The private admin/backend repository is the source of truth for products, prices, stock, orders and privileged operations.
- Storefront exposes only allowlisted public fields. Never expose purchase cost, margin, profit, supplier details, private customer notes, credentials or admin data.
- Recalculate prices, discounts, shipping and stock on the server at checkout. Never trust browser-submitted totals. Protect order creation against duplicate submissions.
- WhatsApp and courier integrations must use server-side secrets and be enabled only after credentials and provider terms are verified.

## Proposed structure
```
src/app/(store)/
  page.tsx
  products/
  categories/
  cart/
  checkout/
  order/
  track/
  about/
  contact/
  policies/
src/components/{layout,product,cart,forms,ui}/
src/lib/{api,formatting,validation}/
src/types/
src/styles/
public/
docs/
```

## UX and quality bar
Mobile-first responsive design; keyboard accessibility; clear focus states; reduced-motion support; meaningful loading, empty, error and unavailable states; optimized genuine product imagery; consistent design tokens; and tested checkout validation.

## Phase 1 exit criteria
- Scope, data requirements, system boundary and security rules documented.
- Design/animation standards and brand asset requirements documented.
- Deployment assumptions and third-party dependencies clearly marked as unverified until tested.
- No secrets, fake content or unverified business claims committed.
