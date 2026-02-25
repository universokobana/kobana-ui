# Implementation Log

> Auto-updated after each implementation cycle.

---

## Fase 0 — Setup do Projeto

### Inicialização + Build + Estrutura de diretórios

- Created `package.json` with scope `@kobana/ui`, type module, bin entry for CLI
- Created `tsconfig.json` targeting ES2022, moduleResolution bundler
- Created `tsconfig.build.json` extending base config
- Created `.gitignore`, `.eslintrc.json`, `.prettierrc`, `LICENSE`
- Installed dev deps: typescript, tsup, vitest, eslint, prettier, @types/node
- Installed CLI deps: commander, chalk, ora, prompts, execa, fs-extra, diff
- Created `tsup.config.ts` (entry: CLI, format: ESM, target: node18, shebang banner)
- Created CLI entry point `src/cli/index.ts` with commander
- Created full directory structure: src/cli, components, hooks, tokens, registry, stories, __tests__
- Validated `npm run build` and `npm run test` both pass

**Commit:** `74c9347`

---

## Fase 1 — CLI + Registry

### Registry + CLI Entry + Utilitários + Comandos + Testes

- Created `registry/schemas/component.schema.json` with JSON Schema validation
- Created `registry/registry.json` with 6 initial components (status-badge, confirm-dialog, page-header, filter-bar, form-section, data-table)
- Implemented CLI entry point with commander, registering init/add/list commands
- Utils:
  - `config.ts`: loadConfig, saveConfig, findConfigPath (searches up directories)
  - `registry.ts`: fetchRegistry (local + remote), getComponent, listComponents
  - `resolver.ts`: resolveDependencies with topological ordering, circular detection, deduplication
  - `installer.ts`: installComponent, rewriteImports, installShadcnDeps, installNpmDeps, detectPackageManager
- Command `init`: detects shadcn, interactive prompts, creates kobana.json + dir structure
- Command `add`: resolves full dep tree, installs shadcn/npm/kobana components, updates kobana.json
- Command `list`: shows components grouped by category with install status
- 24 tests: resolver (8), installer (8), config (7), setup (1)
- Build produces working CLI binary (`node dist/index.js --help`)

**Commit:** `28ff278`

### Comando init — Validação + Testes CLI restantes

- Added base dependency validation (react, tailwindcss) to init command
- Created `__tests__/cli/commands/init.test.ts` (6 tests): directory creation, config generation, shadcn detection, dependency validation
- Created `__tests__/cli/commands/add.test.ts` (6 tests): simple add, transitive deps, skip installed, config update, no-overwrite, import rewriting
- Created `__tests__/cli/e2e.test.ts` (4 tests): full init+add flow with real registry
- Total: 40 tests passing

**Commit:** `14e5741`
