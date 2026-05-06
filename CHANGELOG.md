# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-05-05

Token system consolidation: wires up the missing `@theme` bridges, adds
`status-active`/`status-inactive` families and a `-on` foreground variant,
fixes three latent token bugs, and recalibrates the CLI-shipped `tokensCss`
to match the Underlith canonical.

### Added

- `status-active` (lime brand) and `status-inactive` (neutral grey) token
  families across canonical (`--ul-status-*`), alias (`--ul-color-status-*`),
  and Tailwind theme (`--color-status-*`) layers, with `.dark` overrides for
  the existing four families that previously lacked them.
- `-on` (foreground-on-color) variant for every status family — Material/HIG-
  style "on" pair, used by composites that paint the deep value as a solid
  background. Replaces the prior pattern of overloading `-bg` as both a
  surface token and a foreground.
- `@theme inline` block in the CLI-shipped `tokensCss` template registering
  `--color-kobana-*` (wrapped in `hsl()`) and `--color-status-*` so consumer
  Tailwind v4 projects get `bg-kobana-lime`, `bg-status-success`, etc. as
  utilities without extra configuration.
- Playwright contrast tests for `status-active` and `status-inactive` in both
  light and dark modes (`web/tests/status-badges.spec.ts`).

### Changed

- `tokensCss` template (shipped via `npx @kobana/ui add tokens`) now mirrors
  the Underlith canonical: solid tinted backgrounds and calibrated foregrounds
  replace the opacity-overlay approach. **Visible diff for any consumer who
  re-runs `add tokens`** — status badges shift from translucent overlays to
  calibrated tinted surfaces.
- 5 composites (`confirm-dialog`, `status-badge`, `export-modal`,
  `import-modal`, `header-notifications`) and `DangerZone` consume semantic
  status tokens instead of raw palette utilities.
- Login templates, home hero, and site footer migrate from `#D3FD54` / `#676767`
  / `bg-red-*` literals to brand and status utilities. Fixed-dark surfaces
  apply `dark` on their root so themed tokens resolve to dark variants
  regardless of the user's theme.
- Documentation reorganized: `TOKEN-CONSUMPTION.md` and `DESIGNER-GUIDE.md`
  moved to `docs/underlith-tokens/`. Status sections cover all six families;
  new sections on Fixed-dark Surfaces, Brand Color Utilities, and Destructive.
- `confirm-dialog` warning/info variants migrate from
  `text-status-X-bg` (overloaded surface token) to `text-status-X-on`.

### Fixed

- `--ul-destructive-foreground` shared the same red as `--ul-destructive`,
  rendering `bg-destructive text-destructive-foreground` as red-on-red
  (invisible). Now near-white. Removes the `text-white` literal workaround
  in the danger-zone modal.
- `--ul-color-kobana-*` aliases stored raw HSL components without the `hsl()`
  wrapping, so Tailwind v4 utilities like `bg-kobana-lime` and
  `text-kobana-gray` (advertised in the docs) generated invalid CSS.
- Tailwind v4 `@theme` bridge for status colors was missing in
  `web/styles/globals.css` — `bg-status-*` utilities did not exist. Now wired.
- Redundant `.dashboard-theme` block in `web/styles/globals.css` removed; CSS
  custom property cascade resolves through `underlith.tokens.css` without it.

### Removed

- `kobana-ui-upstream-patches.md` (migration log no longer relevant).

### Migration

This release is **additive at the contract level**: no existing tokens were
renamed or removed. Four consumer profiles to be aware of:

| Profile | Action | Effect |
|---|---|---|
| Has not re-run any CLI command | none | No change. Old snapshot keeps working. |
| Re-runs `add tokens` AND updates composites | upgrade together | Pixel-perfect with this release. |
| Re-runs only `add tokens` | tokens upgrade | Status colors visually recalibrate (see Changed). Old composites still resolve `text-status-X-bg` because `-bg` was preserved. |
| Re-runs only a composite | partial upgrade | New composites that reference `text-status-X-on` will not find the token in the consumer's old `globals.css`. Class becomes a no-op; text inherits parent color. **Visual regression, no functional break.** |

Recommended path: when bumping kobana-ui composites, also re-run
`npx @kobana/ui add tokens` to keep the token surface in sync.

### Notes

- This release assumes **Tailwind v4** in consumer projects (per the contract
  declared in `docs/underlith-tokens/TOKEN-CONSUMPTION.md`). Projects on v3
  will see the `@theme inline` directive ignored and the new utilities will
  not be generated.
- The CLI command `add tokens` continues to copy `src/tokens/colors.ts` to the
  consumer project. The CSS in the `tokensCss` export still requires manual
  inclusion in the consumer's `globals.css` (no automatic injection).

[Unreleased]: https://github.com/mikaelcarrara/kobana-ui-underlith/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/mikaelcarrara/kobana-ui-underlith/compare/v0.2.0...v0.3.0
