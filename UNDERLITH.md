# Underlith Integration

This project uses [Underlith](https://mikaelcarrara.github.io/underlith/) as the 
single source of truth for design tokens.

## How it works

Underlith tokens are defined in `src/styles/underlith.tokens.css`.  
shadcn/ui CSS variables in `globals.css` point to these tokens.  
All components continue to work without any changes.

```
Underlith tokens  →  shadcn variables  →  components
(edit here)           (auto-updated)       (unchanged)
```

## Token mapping

| shadcn variable | Underlith token |
|----------------|-----------------|
| `--color-background` | `var(--ul-color-background)` |
| `--color-foreground` | `var(--ul-color-foreground)` |
| `--color-card` | `var(--ul-color-card)` |
| `--color-card-foreground` | `var(--ul-color-card-foreground)` |
| `--color-popover` | `var(--ul-color-popover)` |
| `--color-popover-foreground` | `var(--ul-color-popover-foreground)` |
| `--color-primary` | `var(--ul-color-primary)` |
| `--color-primary-foreground` | `var(--ul-color-primary-foreground)` |
| `--color-secondary` | `var(--ul-color-secondary)` |
| `--color-secondary-foreground` | `var(--ul-color-secondary-foreground)` |
| `--color-muted` | `var(--ul-color-muted)` |
| `--color-muted-foreground` | `var(--ul-color-muted-foreground)` |
| `--color-accent` | `var(--ul-color-accent)` |
| `--color-accent-foreground` | `var(--ul-color-accent-foreground)` |
| `--color-destructive` | `var(--ul-color-destructive)` |
| `--color-destructive-foreground` | `var(--ul-color-destructive-foreground)` |
| `--color-border` | `var(--ul-color-border)` |
| `--color-input` | `var(--ul-color-input)` |
| `--color-ring` | `var(--ul-color-ring)` |
| `--color-sidebar-background` | `var(--ul-color-sidebar-background)` |
| `--color-sidebar-foreground` | `var(--ul-color-sidebar-foreground)` |
| `--color-sidebar-primary` | `var(--ul-color-sidebar-primary)` |
| `--color-sidebar-primary-foreground` | `var(--ul-color-sidebar-primary-foreground)` |
| `--color-sidebar-accent` | `var(--ul-color-sidebar-accent)` |
| `--color-sidebar-accent-foreground` | `var(--ul-color-sidebar-accent-foreground)` |
| `--color-sidebar-border` | `var(--ul-color-sidebar-border)` |
| `--color-sidebar-ring` | `var(--ul-color-sidebar-ring)` |
| `--color-kobana-lime` | `var(--ul-color-kobana-lime)` |
| `--color-kobana-black` | `var(--ul-color-kobana-black)` |
| `--color-kobana-white` | `var(--ul-color-kobana-white)` |
| `--color-kobana-gray` | `var(--ul-color-kobana-gray)` |
| `--color-kobana-purple` | `var(--ul-color-kobana-purple)` |
| `--font-sans` | `var(--ul-font-sans)` |
| `--font-display` | `var(--ul-font-display)` |
| `--radius-sm` | `var(--ul-radius-sm)` |
| `--radius-md` | `var(--ul-radius-md)` |
| `--radius-lg` | `var(--ul-radius-lg)` |
| `--radius-xl` | `var(--ul-radius-xl)` |
| `--radius` | `var(--ul-radius)` |
| `--kobana-lime` | `var(--ul-kobana-lime)` |
| `--kobana-black` | `var(--ul-kobana-black)` |
| `--kobana-white` | `var(--ul-kobana-white)` |
| `--kobana-gray` | `var(--ul-kobana-gray)` |
| `--kobana-purple` | `var(--ul-kobana-purple)` |
| `--background` | `var(--ul-background)` |
| `--foreground` | `var(--ul-foreground)` |
| `--card` | `var(--ul-card)` |
| `--card-foreground` | `var(--ul-card-foreground)` |
| `--popover` | `var(--ul-popover)` |
| `--popover-foreground` | `var(--ul-popover-foreground)` |
| `--primary` | `var(--ul-primary)` |
| `--primary-foreground` | `var(--ul-primary-foreground)` |
| `--secondary` | `var(--ul-secondary)` |
| `--secondary-foreground` | `var(--ul-secondary-foreground)` |
| `--muted` | `var(--ul-muted)` |
| `--muted-foreground` | `var(--ul-muted-foreground)` |
| `--accent` | `var(--ul-accent)` |
| `--accent-foreground` | `var(--ul-accent-foreground)` |
| `--destructive` | `var(--ul-destructive)` |
| `--destructive-foreground` | `var(--ul-destructive-foreground)` |
| `--border` | `var(--ul-border)` |
| `--input` | `var(--ul-input)` |
| `--ring` | `var(--ul-ring)` |
| `--sidebar-background` | `var(--ul-sidebar-background)` |
| `--sidebar-foreground` | `var(--ul-sidebar-foreground)` |
| `--sidebar-primary` | `var(--ul-sidebar-primary)` |
| `--sidebar-primary-foreground` | `var(--ul-sidebar-primary-foreground)` |
| `--sidebar-accent` | `var(--ul-sidebar-accent)` |
| `--sidebar-accent-foreground` | `var(--ul-sidebar-accent-foreground)` |
| `--sidebar-border` | `var(--ul-sidebar-border)` |
| `--sidebar-ring` | `var(--ul-sidebar-ring)` |

## Updating design values

Edit `underlith.tokens.css` — never edit shadcn variables directly.

```css
/* Change the primary color across ALL projects: */
--color-brand-primary: 217 91% 60%;
```

## Sharing tokens across projects

```bash
npm install @mikaelcarrara/underlith
```

```css
@import "@mikaelcarrara/underlith/src/underlith.tokens.css";
```
