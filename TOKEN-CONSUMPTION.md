# Token Consumption Guidelines — Kobana UI

## Single Consumption Path

- Always consume colors via `var(--ul-color-*)` only.
- Do not use literal color values (`#hex`, `rgb()`, `hsl()`, `oklch()`) in components.
- Do not consume raw `--ul-*` tokens directly in components; the mapping to shadcn/Tailwind variables happens in the theme layer.

```css
/* ✅ correct */
.btn-primary {
  background-color: var(--ul-color-primary);
  color: var(--ul-color-primary-foreground);
}

/* ❌ avoid */
.btn-primary {
  background-color: oklch(0.205 0 0);
}
```

---

## Scope Rules

- **Light mode**: `:root` defines the default (light) tokens.
- **Dark mode**: `.dark` on the `html` element switches to the dark scope, managed by `next-themes`.
- **Dashboard overrides**: `.dashboard-theme` can be applied to a page or root container to switch brand primary to Kobana Lime. Works in both light and dark.

Precedence:

| Scope | Applies |
|---|---|
| `:root` | Light mode default |
| `.dark` | Dark mode |
| `.dashboard-theme` | Dashboard brand override (light) |
| `.dark .dashboard-theme` | Dashboard brand override (dark) |

---

## Status Color Tokens

> **Note:** Status tokens are not yet defined in `underlith.tokens.css`. They must be added before consuming. See definitions below.

### Canonical tokens (define in `underlith.tokens.css`)

```css
:root {
  --ul-status-success:    oklch(0.60 0.15 145);
  --ul-status-success-bg: oklch(0.15 0.04 145);

  --ul-status-warning:    oklch(0.70 0.15 75);
  --ul-status-warning-bg: oklch(0.15 0.04 75);

  --ul-status-error:      oklch(0.58 0.20 25);
  --ul-status-error-bg:   oklch(0.15 0.05 25);

  --ul-status-info:       oklch(0.60 0.15 240);
  --ul-status-info-bg:    oklch(0.15 0.04 240);
}
```

### Consumption aliases (define in `globals.css`)

```css
--ul-color-status-success:    var(--ul-status-success);
--ul-color-status-success-bg: var(--ul-status-success-bg);

--ul-color-status-warning:    var(--ul-status-warning);
--ul-color-status-warning-bg: var(--ul-status-warning-bg);

--ul-color-status-error:      var(--ul-status-error);
--ul-color-status-error-bg:   var(--ul-status-error-bg);

--ul-color-status-info:       var(--ul-status-info);
--ul-color-status-info-bg:    var(--ul-status-info-bg);
```

### Usage in components

```css
/* always use the --ul-color-* alias, never the canonical --ul-status-* directly */
.badge-success {
  color: var(--ul-color-status-success);
  background-color: var(--ul-color-status-success-bg);
}
```

---

## Typography with Tailwind @theme

Canonical tokens: `--ul-font-sans`, `--ul-font-display`

Wire to Tailwind in `globals.css`:

```css
@theme {
  --font-sans:    var(--ul-font-sans);
  --font-display: var(--ul-font-display);
}
```

Usage:

```html
<h1 class="font-display">Page Title</h1>
<p class="font-sans">Body text</p>
```

---

## Middleware → Proxy Migration Checklist (Next 16)

- [ ] Audit `middleware.ts` — identify proxying, rewrites, and header logic
- [ ] If middleware only forwards requests, replace with `proxy` in `next.config.mjs` and delete `middleware.ts`
- [ ] If middleware contains auth, geolocation, or header mutations, migrate to Route Handlers or server components
- [ ] Validate locally: `npm run dev` — no deprecation warnings
- [ ] Validate build: `npm run build` — no middleware warning
- [ ] Remove unused imports and dependencies from old middleware
- [ ] Update internal docs to reflect the `proxy` approach
