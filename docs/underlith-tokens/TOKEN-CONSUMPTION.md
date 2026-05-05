# Token Consumption Guidelines — Kobana UI

## Single Consumption Path

- Always consume colors via `var(--ul-color-*)` aliases or the Tailwind v4 utilities (`bg-*`, `text-*`, `border-*`) generated from them.
- Do not use literal color values (`#hex`, `rgb()`, `hsl()`, `oklch()`) in components.
- Do not consume raw `--ul-*` canonical tokens directly in components; the alias layer in `globals.css` is the seam between canonical values and consumption.

```css
/* ✅ correct */
.btn-primary {
  background-color: var(--ul-color-primary);
  color: var(--ul-color-primary-foreground);
}

/* ❌ avoid */
.btn-primary { background-color: oklch(0.205 0 0); }
```

The flow:

```
canonical (--ul-*)  →  consumption alias (--ul-color-*)  →  Tailwind utility (bg-*, text-*)
```

---

## Scope Rules

- **Light mode**: `:root` defines the default (light) tokens.
- **Dark mode**: `.dark` on the `<html>` element switches to the dark scope, managed by `next-themes`.
- **Dashboard overrides**: `.dashboard-theme` can be applied to a page or root container to switch brand primary to Kobana Lime. Works in both light and dark.

| Scope | Applies |
|---|---|
| `:root` | Light mode default |
| `.dark` | Dark mode |
| `.dashboard-theme` | Dashboard brand override (light) |
| `.dark .dashboard-theme` | Dashboard brand override (dark) |

---

## Fixed-dark Surfaces

Some surfaces are intentionally always-dark regardless of the user's theme — login pages, hero sections, the site footer. Apply `dark` on the subtree root so themed tokens (`text-muted-foreground`, `text-status-error`, etc.) resolve to their dark variants for descendants:

```tsx
<div className="dark bg-black text-white">
  <p className="text-muted-foreground">Subtitle</p>
</div>
```

Without the local `dark`, a user in light mode would get the light variants and the content would wash out against the fixed-dark background.

---

## Brand Color Utilities

The Kobana brand palette (`--ul-kobana-lime`, `-black`, `-white`, `-gray`, `-purple`) is canonical as raw HSL components for shadcn-style alpha modulation. The consumption alias wraps with `hsl()` so Tailwind utilities work directly:

```tsx
<button className="bg-kobana-lime text-kobana-black hover:bg-kobana-lime/90">
  CTA principal
</button>
```

When to use which:

- `bg-primary`/`text-primary` — components that should adapt to the user's theme.
- `bg-kobana-*` — when you want the brand color regardless of theme (typically on fixed-dark surfaces).

---

## Status Color Tokens

Six families: `success`, `warning`, `error`, `info`, `active`, `inactive`. Each has a foreground (`--ul-color-status-X`) and a tinted background (`--ul-color-status-X-bg`). Canonical values live in [`web/styles/underlith.tokens.css`](../../web/styles/underlith.tokens.css).

- `active` is brand-aligned (Kobana lime).
- `inactive` is neutral grey.
- The other four are calibrated for accessible contrast in both themes.

```tsx
// ✅ Tailwind utility (preferred)
<span className="bg-status-success-bg text-status-success">Pago</span>

// ✅ CSS alias (for non-utility contexts)
<span style={{
  color: 'var(--ul-color-status-success)',
  backgroundColor: 'var(--ul-color-status-success-bg)',
}}>Pago</span>
```

### Mapping domain status to tokens

| Domain meaning | Token |
|---|---|
| Entity is on / live | `status-active` (lime) |
| Transaction succeeded (paid, delivered) | `status-success` (green) |
| Pending / draft / waiting | `status-warning` (amber) |
| Informational / processing | `status-info` (blue) |
| Hard failure (overdue, suspended, blocked) | `status-error` (red) |
| Entity off / archived / closed / cancelled | `status-inactive` (grey) |

`active` and `success` are intentionally distinct: `active` is a brand moment (lime); `success` is a generic semantic green. Don't collapse them.

---

## Destructive

For destructive **action buttons** (delete, cancel, suspend), use the `destructive` pair:

```tsx
// Solid
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Excluir
</button>

// Outline
<button className="border border-destructive/50 text-destructive hover:bg-destructive/10">
  Pausar
</button>
```

`bg-destructive` is for action buttons that destroy. For state indicators that something failed, use `bg-status-error-bg text-status-error` instead.

---

## Typography with Tailwind `@theme inline`

Canonical tokens: `--ul-font-sans`, `--ul-font-display`. Wired in `globals.css`:

```css
@theme inline {
  --font-sans:    var(--ul-font-sans);
  --font-display: var(--ul-font-display);
}
```

Usage:

```html
<h1 class="font-display">Page Title</h1>
<p class="font-sans">Body text</p>
```
