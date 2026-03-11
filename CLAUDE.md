# CLAUDE.md — Project Instructions for AI Agents

## Security Rules

### Content Security Policy (CSP)

**NEVER use `'unsafe-inline'` or `'unsafe-eval'` in any CSP directive.**

All scripts and styles MUST be loaded using nonce-based CSP. The nonce is:
1. Generated per-request in `web/middleware.ts`
2. Passed to the layout via the `x-nonce` request header
3. Read in `web/app/layout.tsx` using `headers().get("x-nonce")`
4. Propagated to components that inject inline scripts (e.g., `next-themes` ThemeProvider)

If a library injects inline scripts, it MUST receive the nonce. If a library does not support nonce, find an alternative or open an issue upstream.

Reference: https://web.dev/articles/strict-csp

## Project Structure

- Monorepo with `web/` (Next.js documentation site) and shared packages
- Design tokens: Underlith system (`UNDERLITH.md`)
- Fonts: Loaded via `next/font/google` (self-hosted at build time, no external CSS imports needed)
- UI: shadcn/ui + fumadocs for documentation
