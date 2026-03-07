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

/* Change the brand lime across ALL projects: */
--ul-kobana-lime: 73 99% 66%;

/* Change the primary color: */
--ul-primary: oklch(0.205 0 0);

/* Change border radius globally: */
--ul-radius: 0.5rem;
```

## Sharing tokens across multiple Kobana products

Any Kobana product can consume the same token layer:

```bash
npm install @mikaelcarrara/underlith
```

```css
@import "@mikaelcarrara/underlith/src/underlith.tokens.css";
```

One change in Underlith propagates to every product on the next `npm update`.

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
| `web/styles/underlith.tokens.css` | Token definitions (single source of truth) |
| `web/styles/globals.css` | shadcn variables now reference Underlith tokens |
| `web/styles/globals.css` import | Added `@import` for `underlith.tokens.css` |

## Learn more

- [Underlith documentation](https://mikaelcarrara.github.io/underlith/)
- [Token reference](https://mikaelcarrara.github.io/underlith/tokens)
- [Consumption strategies](https://mikaelcarrara.github.io/underlith/consumption)
