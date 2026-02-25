# Questions & Decisions

> Decisions made during automated implementation. Review after development is complete.

---

## [Phase 6 — Storybook + Documentação]

**Q:** Should Storybook be set up now, or deferred to when React/Tailwind are available in the project?
**Decision:** Deferred. Storybook setup requires interactive configuration (`npx storybook@latest init`) and a full React + Tailwind environment. The kobana-ui repo currently has no React dependency (it's a CLI + component source code repo). Storybook should be set up manually when the team is ready.
**Impact:** Medium — stories and visual documentation are deferred but all component source code is complete.

**Q:** Should story files be created as placeholder templates or skipped entirely?
**Decision:** Skipped. Creating story files without Storybook configured would just add dead code. Better to create them when Storybook is actually set up and they can be validated.
**Impact:** Low — stories are documentation-only, not functional code.

---

## [Phase 7 — Adoção]

**Q:** Should the ESLint plugin be created in this repo or as a separate package?
**Decision:** Deferred to separate package. The ESLint plugin (`@kobana/eslint-plugin-ui`) should be its own npm package with its own tests. Creating it inside kobana-ui would mix concerns.
**Impact:** Low — ESLint rules are an adoption tool, not core functionality.

**Q:** Should NPM publishing be attempted now?
**Decision:** No. Publishing requires npm credentials, org access, and team review. The package.json is configured correctly for publishing (name, bin, engines, prepublishOnly).
**Impact:** Low — the CLI works locally via `node dist/index.js` for development.

**Q:** Should the kobana-billing migration POC be done?
**Decision:** Deferred. This requires access to the kobana-billing repo and involves refactoring existing pages. Should be done as a separate task with the team.
**Impact:** Medium — POC is important for adoption but is not part of the core design system implementation.
