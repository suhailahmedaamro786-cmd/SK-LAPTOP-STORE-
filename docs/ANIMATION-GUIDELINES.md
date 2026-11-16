# Animation skill — storefront

## Principles
Motion should explain hierarchy, state and navigation, not slow shopping. Keep transitions subtle, purposeful, performant and consistent. Prefer CSS transforms and opacity; avoid layout-thrashing animation and heavy scroll effects.

## Approved patterns
- Short page/section entrance with opacity and small vertical offset.
- Product-card hover/focus elevation and image zoom kept restrained.
- Cart count and add-to-cart confirmation feedback.
- Skeleton loading that does not flash after fast responses.
- Drawer/dialog transitions with clear focus management.
- Progress indication for checkout steps and order status.

## Accessibility and performance
- Respect `prefers-reduced-motion`; provide an instant/no-motion alternative.
- Never rely on animation alone to communicate success, errors or availability.
- Avoid autoplaying video, parallax on mobile, bouncing CTAs and infinite decorative loops.
- Keep interaction responsive on low-end Android devices.
- Test keyboard, touch, reduced-motion and slow-network behavior.

## Suggested implementation
Use CSS transitions/keyframes for simple motion. Add Motion/Framer Motion only if the project demonstrates a real need and bundle/performance impact is reviewed. Do not install dependencies blindly; confirm package compatibility and lockfile first.
