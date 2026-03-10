# Underlith Integration

This project uses [Underlith](https://mikaelcarrara.github.io/underlith/) as the
single source of truth for design tokens.

## Why

Before this integration, Kobana's brand values were hardcoded inside shadcn's `globals.css`:

```css
--kobana-lime: 73 99% 66%;
--kobana-black: 0 0% 0%;
--kobana-purple: 285 75% 52%;
```

This meant every Kobana product that needed these values had to copy them manually —
with no guarantee of consistency over time.

With Underlith, brand values live in one place, outside of shadcn.
shadcn references them. It does not define them.

```
Underlith tokens  →  shadcn variables  →  components
(edit here)           (auto-updated)       (unchanged)
```

## How it works

All design token values are defined in `web/styles/underlith.tokens.css`.
The shadcn variables in `globals.css` point to those tokens.

Zero component rewrites — all 26 Kobana UI components continue to work exactly as before.

## Updating design values

**Always edit `web/styles/underlith.tokens.css` — never edit shadcn variables directly.**

```css
/* web/styles/underlith.tokens.css */

/* Change the brand lime across the project: */
--ul-kobana-lime: 73 99% 66%;

/* Change the primary color: */
--ul-primary: oklch(0.205 0 0);

/* Change border radius globally: */
--ul-radius: 0.5rem;
```

## Sharing tokens across multiple Kobana products

The tokens currently live inside this repository. To share them across other Kobana
products, the next step is extracting them into a standalone package — `@kobana/tokens`.

Any product would then install it directly, independent of stack or framework:

```bash
npm install @kobana/tokens
```

This package does not exist yet. This PR lays the groundwork.

## Who should edit tokens

Underlith is for whoever owns the design system — not for feature developers.

- ✅ Changing a brand color → edit `underlith.tokens.css`
- ✅ Adding a new brand color → add a new `--ul-*` token
- ✅ Adjusting global radius or typography → edit the relevant token
- ❌ Changing a color in one specific component → that's a component concern, not a token concern

When in doubt: if the change should affect every product, it belongs in Underlith.
If it's specific to one component, it stays in the component.

## Files changed by this integration

| File | What changed |
|------|-------------|
| `web/styles/underlith.tokens.css` | NEW — token definitions (single source of truth) |
| `web/styles/globals.css` | shadcn variables now reference Underlith tokens via `@import` |

## Learn more

- [Underlith documentation](https://mikaelcarrara.github.io/underlith/)
- [Token reference](https://mikaelcarrara.github.io/underlith/tokens)
- [Consumption strategies](https://mikaelcarrara.github.io/underlith/consumption)

---

## Consumption Policy (single alias)

- Components must consume **only** `var(--ul-color-*)`.
- The bridge between canonical tokens (`--ul-*`) and consumption aliases (`--ul-color-*`) is centralized in `web/styles/globals.css`.
- Benefits: easier audits, predictable theming, and no component dependency on canonical tokens.

Example (component consumption):

```css
.badge-success {
  color: var(--ul-color-status-success);
  background-color: var(--ul-color-status-success-bg);
}
```

---

## Status tokens (canonical + consumption)

- Canonical (defined in `web/styles/underlith.tokens.css` — `:root` scope):

```css
:root {
  --ul-status-success:    oklch(0.30 0.13 145);
  --ul-status-success-bg: oklch(0.98 0.03 145);

  --ul-status-warning:    oklch(0.40 0.12 75);
  --ul-status-warning-bg: oklch(0.97 0.04 75);

  --ul-status-error:      oklch(0.40 0.16 25);
  --ul-status-error-bg:   oklch(0.97 0.04 25);

  --ul-status-info:       oklch(0.40 0.13 240);
  --ul-status-info-bg:    oklch(0.97 0.04 240);
}
```

- Consumption aliases (exposed in `web/styles/globals.css`):

```css
:root {
  --ul-color-status-success:    var(--ul-status-success);
  --ul-color-status-success-bg: var(--ul-status-success-bg);
  --ul-color-status-warning:    var(--ul-status-warning);
  --ul-color-status-warning-bg: var(--ul-status-warning-bg);
  --ul-color-status-error:      var(--ul-status-error);
  --ul-color-status-error-bg:   var(--ul-status-error-bg);
  --ul-color-status-info:       var(--ul-status-info);
  --ul-color-status-info-bg:    var(--ul-status-info-bg);
}
```

---

## Typography with Tailwind v4 (@theme)

- Canonical tokens: `--ul-font-sans`, `--ul-font-display`.
- Bridge in `web/styles/globals.css`:

```css
@theme inline {
  --font-sans:    var(--ul-font-sans);
  --font-display: var(--ul-font-display);
}
```

- Consumption:

```html
<h1 class="font-display">Título</h1>
<p class="font-sans">Corpo</p>
```

---

## Checklist — Next 16 migration (middleware → proxy)

- [ ] Audit `middleware.ts` (rewrites, headers, forwarding).
- [ ] If it only forwards, migrate to `proxy` in `next.config.mjs` and remove `middleware.ts`.
- [ ] Move auth/geo/header logic to Route Handlers or Server Components.
- [ ] Validate locally: `npm run dev` with no warnings.
- [ ] Validate build: `npm run build` with no middleware warning.
- [ ] Remove unused imports and dependencies.
