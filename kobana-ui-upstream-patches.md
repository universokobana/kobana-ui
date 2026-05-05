# Kobana UI — Token Audit & Migration Log

**Audience:** maintainers of the Kobana UI registry (this repo) and downstream consumers (FinanceFlow, Kobana Finance).
**Last audit:** 2026-05-05 — against branch `kobana-ui-improvements`.
**Goal:** stop hardcoding Tailwind palette utilities (`text-green-600`, `bg-yellow-600`, …) inside registry composites and route everything through Underlith status tokens.

This file replaces the original "upstream patches needed" doc — most of those patches have now been applied directly in this repo, and the doc was inaccurate in several places.

### How to read this doc

- **File paths** refer to this repo's layout: composites at `src/components/composites/<name>/<name>.tsx`, registry tokens at `src/tokens/colors.ts`, consumer tokens at `web/styles/underlith.tokens.css` and `web/styles/globals.css`.
- **Class names** like `text-status-success`, `bg-status-warning-bg` assume Tailwind v4 with the `@theme inline` bridge in `web/styles/globals.css` — now wired up explicitly (see §Architecture below).

---

## Architecture: how status tokens flow

Three layers, one per file:

```
underlith.tokens.css           globals.css                           Tailwind utilities
─────────────────────          ─────────────                         ────────────────
:root {                        :root {                               @theme inline {
  --ul-status-success: …  ──→    --ul-color-status-success: …   ──→    --color-status-success: …
}                              }                                     }
.dark {                                                              ↓
  --ul-status-success: …  (overrides cascade)                        bg-status-success
}                                                                    text-status-success
                                                                     hover:bg-status-success/90
```

- **Canonical** (`--ul-status-*`): defined in `web/styles/underlith.tokens.css`. Light values in `:root`, dark overrides in `.dark`. Edit here to change brand values.
- **Consumption alias** (`--ul-color-status-*`): defined in `web/styles/globals.css :root`. The single alias components are allowed to consume per `UNDERLITH.md` Consumption Policy.
- **Tailwind utility** (`--color-status-*`): defined in `globals.css @theme inline`. This is what makes `bg-status-warning` / `text-status-info` actually exist as Tailwind utilities.

Composites consume **either** Tailwind utility classes (`text-status-success`) **or** raw CSS `var(--color-status-*)` in inline styles when Tailwind classes are not viable (e.g. chart libs, dynamic config maps).

For consumers outside this monorepo who install only the standalone `tokens` registry: `src/tokens/colors.ts` ships a self-contained `tokensCss` template that defines `--color-status-*` directly in `:root`/`.dark`, so no Underlith bridge is required.

---

## Status token families

| Token | Semantic intent | Light fg / bg | Dark fg / bg |
|---|---|---|---|
| `success` | positive outcome, completed, conciliated | `oklch(0.30 0.13 145)` / `oklch(0.98 0.03 145)` | `oklch(0.78 0.18 145)` / `oklch(0.22 0.06 145)` |
| `warning` | caution, partial, completed-with-errors | `oklch(0.40 0.12 75)` / `oklch(0.97 0.04 75)` | `oklch(0.82 0.16 75)` / `oklch(0.25 0.06 75)` |
| `error` | failure, rejected, destructive intent | `oklch(0.40 0.16 25)` / `oklch(0.97 0.04 25)` | `oklch(0.72 0.20 25)` / `oklch(0.22 0.07 25)` |
| `info` | neutral information, processing | `oklch(0.40 0.13 240)` / `oklch(0.97 0.04 240)` | `oklch(0.78 0.15 240)` / `oklch(0.22 0.06 240)` |
| `active` | brand-aligned "on", live, enabled (lime fill) | `oklch(0.20 0.10 130)` / `hsl(--ul-kobana-lime)` | same fg / same lime bg |
| `inactive` | neutral "off", paused, disabled (grey fill) | `oklch(0.50 0 0)` / `oklch(0.95 0 0)` | `oklch(0.65 0 0)` / `oklch(0.25 0 0)` |

`active` is intentionally brand-aligned (lime) rather than another shade of `success` — "ativo" is on-brand, not just "another positive outcome". `inactive` is neutral grey, not muted text.

---

## What the previous version of this doc claimed vs. reality

### Patch 1 — `confirm-dialog` warning variant — **APPLIED**

Was: `bg-yellow-600 text-white hover:bg-yellow-600/90`.
Now: `bg-status-warning text-status-warning-bg hover:bg-status-warning/90`.
Also wired the `info` variant (was empty `actionClass`) to `bg-status-info text-status-info-bg hover:bg-status-info/90` for symmetry.

### Patch 2 — `entity-combobox-creatable` check icon — **NOT APPLICABLE**

The original doc referenced `entity-combobox-creatable.tsx` "around line 313" with a hardcoded `text-green-600` check icon. That file does not exist in this repo. Only `entity-combobox.tsx` exists (148 lines) and it uses an opacity-toggled check (`isSelected ? 'opacity-100' : 'opacity-0'`) — no hardcoded color to fix.

If FinanceFlow has a `Creatable` variant locally, that's a downstream-only concern; nothing to upstream until/unless the variant is contributed back.

### Patch 3 — `data-table-bulk-actions` light-only override — **ALREADY CORRECT**

The doc claimed a hardcoded `border-zinc-200 bg-white text-zinc-900` className wrapping the non-destructive button. That override is **not present** in the current code — the component already uses `variant === 'destructive' ? 'destructive' : 'outline'` cleanly with no override className. The "even cleaner fix" the doc suggested at the end of the patch is what's already shipped.

### Patch 4 — `status-active` / `status-inactive` tokens — **APPLIED**

Added to all three layers: `web/styles/underlith.tokens.css` (canonical, light + dark), `web/styles/globals.css` (alias + Tailwind theme), and `src/tokens/colors.ts` (registry export + `tokensCss` template). The `status-badge` composite was using `active → success` and `inactive → error`, which is a semantic mismatch — corrected to use the new `active` / `inactive` tokens directly.

### Patch 5 — `.dark` overrides for status colors — **APPLIED IN BOTH LAYERS**

The doc claimed `.dark` "never touches status" and that this affected every consumer. In the registry `src/tokens/colors.ts`, the `.dark` block already had status overrides at the time of audit — the doc was wrong about that file.

But `web/styles/underlith.tokens.css` (the consumer-side canonical file used by this monorepo's docs site) **was** missing dark overrides for status. Those have now been added — values tuned to flip lightness so foreground text pops on dark surfaces and `-bg` variants become tinted dark fills rather than near-white blocks.

### Newly identified gaps — **APPLIED**

These were not in the previous doc but were caught during the 2026-05-05 audit:

- `export-modal/export-modal.tsx`: `text-green-500` → `text-status-success` (success state SVG).
- `import-modal/import-modal.tsx`: `text-green-500` → `text-status-success`, `text-yellow-500` → `text-status-warning`.
- `header-notifications/header-notifications.tsx`: severity dot map flipped from `bg-blue-500` / `bg-yellow-500` / `bg-red-500` / `bg-red-600` to `bg-status-info` / `bg-status-warning` / `bg-status-error` / `bg-destructive`.

### Tailwind `@theme` bridge for status — **APPLIED (was the root cause)**

The original doc assumed `bg-status-warning` etc. were already valid Tailwind utilities in this monorepo's `web/`. They were not — `globals.css @theme inline` mapped background, foreground, primary, …, but never status. Composites had no choice but to hardcode palette utilities. The bridge is now wired explicitly for all six status families and their `-bg` variants.

---

## Known gap — `web/examples/*` demos are mockups, not real composites

The docs site under `web/` does not import the registry composites from `src/components/composites/*`. Its `tsconfig.json` aliases `@/* → web/*` only — there is no path back to the monorepo root. As a result, every file under `web/examples/<name>-demo.tsx` is a hand-rolled mockup using raw `<span>` / `<button>` markup with hardcoded Tailwind palette utilities (`bg-green-100`, `bg-red-600`, …) that **imitate** the composite visually without ever rendering it.

Practical consequences:

- Token / composite changes (like the ones in this audit) ship correctly in the registry but **do not render in the docs site preview**. The preview keeps showing the mockup's hardcoded colors regardless.
- Anyone testing visual changes against `localhost:4000` will see the *mockup*, not the real component, and may incorrectly conclude that a change "didn't work".
- The mockups themselves silently violate the same hardcoded-palette pattern this audit is trying to eliminate from composites — they are a parallel surface that needs its own pass.

Resolution is out of scope for this audit. Two viable shapes for a follow-up:

1. **Add a path alias** in `web/tsconfig.json` (`"@registry/*": ["../src/*"]`) and rewrite each `<name>-demo.tsx` to import the real composite. Highest fidelity, but requires that every composite's transitive deps (`@/components/ui/*`, `@/lib/utils`, …) resolve from the docs site — likely needs additional aliases or a small barrel package.
2. **Keep the mockup approach but use semantic tokens** in the demos (`bg-status-active-bg text-status-active` instead of `bg-green-100 text-green-800`). Cheaper, but the previews remain decoupled from the real components.

---

## Pattern to enforce going forward

When adding or reviewing a composite, any of the following should be a code-review block:

| Hardcoded class | Replace with |
|---|---|
| `text-green-*`, `text-emerald-*` (success/positive intent) | `text-status-success` |
| `bg-green-*` (light success bg) | `bg-status-success` (saturated) or `bg-status-success-bg` (tinted) |
| `text-red-*`, `text-rose-*` (error intent — note: destructive button has its own token) | `text-status-error` or `text-destructive` |
| `text-yellow-*`, `text-amber-*` (warning) | `text-status-warning` |
| `bg-yellow-*` (warning fill) | `bg-status-warning` + `text-status-warning-bg` for foreground |
| `text-blue-*`, `text-sky-*`, `text-cyan-*` (info) | `text-status-info` |
| `text-zinc-*`, `text-gray-*`, `text-slate-*`, `text-neutral-*` | `text-foreground` / `text-muted-foreground` |
| `bg-white` (forces light) | `bg-background` |
| `bg-zinc-*`, `bg-gray-*` | `bg-muted` / `bg-secondary` / `bg-card` (depending on intent) |
| `border-zinc-*`, `border-gray-*` | `border-border` / `border-input` |
| Inline `style={{ background: '#hex' }}` for static UI | `style={{ background: 'var(--color-status-*)' }}` — comes up in chart libs (Recharts, Visx) |

Recommended (not yet wired): a CI grep that fails the build if any composite contains `text-(green\|red\|yellow\|blue\|zinc\|gray\|slate\|neutral)-\d+`, `bg-(white\|zinc\|gray)-\d*`, or `border-(zinc\|gray)-\d+`.

---

## Validation checklist

After the 2026-05-05 changes, to verify in `web/` (docs site):

1. `npm run dev` in `web/` — render a page that uses each affected composite.
2. `ConfirmDialog variant="warning"` and `variant="info"` in light + dark + a custom `--ul-kobana-lime` override; all should re-skin.
3. `DataTableBulkActions` non-destructive in dark mode — verify the button follows the theme.
4. `StatusBadge status="active"` and `status="inactive"` — `active` should show the brand lime fill; `inactive` should read as a muted neutral.
5. `StatusBadge` for `success` / `warning` / `error` / `info` in dark mode — foreground must pop against the tinted fill (no muddy "dark on dark").
6. `HeaderNotifications` with each severity — dots should follow theme.
7. `ExportModal` completed state and `ImportModal` completed / completed_with_errors states — icons should follow theme.

---

## For downstream consumers (FinanceFlow, Kobana Finance)

If you previously forked any of these composites locally to apply the patches yourselves: re-install from the registry on next sync. Local diffs should reconcile cleanly. If they don't, the upstream change went further than the local fork (e.g. consumer added `info` symmetry, or the `active`/`inactive` tokens) — adopt the upstream shape.

If you previously extended the bridge in your consumer `globals.css` to add `--ul-status-active*` / `--ul-status-inactive*` or to add dark overrides for status: that block is now redundant. Keep it for one release cycle for safety, then remove on the sync after.
