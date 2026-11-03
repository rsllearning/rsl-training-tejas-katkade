# Styling Paradigms Assignment

## Exercise 1 Verification

1. **Responsive Grid**:
   - Small screens (`< 768px`): 1 product per row.
   - Medium screens (`>= 768px`): 2 products per row (`md:grid-cols-2`).
   - Large screens (`>= 1024px`): 3 products per row (`lg:grid-cols-3`).
2. **Responsive Sidebar**:
   - Small screens: Horizontal navigation bar.
   - Medium & Large screens: Full-height vertical sidebar (`w-64`).
   - Done entirely via Tailwind responsive utilities without JavaScript window calculation.
3. **Button States**:
   - Hover appearance: `hover:bg-brandPrimary-dark`.
   - Focus styling: `focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2`.
   - Disabled appearance: `disabled:opacity-50 disabled:cursor-not-allowed` (demonstrated on "Thunderbolt 4 Docking Station" which is Out of Stock, as well as via the header action test toggle).
4. **Theme Design Tokens**:
   - Configured in `tailwind.config.js` under `theme.extend`:
     - `brandPrimary` (DEFAULT, light, dark)
     - `brandText` (primary, secondary, muted, light)
     - `brandBg` (main, card, sidebar, sidebarHover)
     - `tokenPadding`, `tokenGap`
     - `tokenCard`, `tokenBtn`, `tokenBadge`
   - Modifying any token updates all associated UI elements across the dashboard.
5. **No Custom CSS Classes**:
   - Built exclusively through composed utility classes and reusable React components (`Header`, `Sidebar`, `ProductCard`, `ProductGrid`).

---

## Exercise 2 Verification

1. **Reusable Type-Safe Components**:
   - **Button**:
     - Variants: `primary`, `secondary`, `danger`
     - Sizes: `small`, `large`
     - Interaction states: `:hover`, `:focus-visible`, `:disabled`
     - Structured recipe with TypeScript prop autocompletion.
   - **Card**:
     - Base styling with border radius, background, shadow, and responsive padding.
     - Variants: `elevated`, `outlined`, `flat`.
   - **Badge**:
     - Semantic variants: `success`, `warning`, `error`.
2. **Shared Design Tokens**:
   - Defined in `src/theme/tokens.css.ts` using Vanilla Extract's `createGlobalTheme(':root', ...)`.
   - Shared across Button, Card, and Badge (colors, spacing, radii, typography, shadows).
   - Changing any value in `tokens.css.ts` updates all components.
3. **Build-Time CSS Generation (Zero-Runtime)**:
   - Run `npm run build` in `exercise-2`.
   - Inspect `exercise-2/dist/assets/*.css` to verify that pure static CSS is emitted at compile time with zero browser runtime overhead.
