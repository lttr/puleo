---
status: complete
references:
  - /home/lukas/code/chrono-albums-2
  - /home/lukas/code/jedlik-nejedlik/web
---

# Consumer overrides analysis

Analysis of CSS overrides and workarounds in projects consuming Puleo CSS.
Goal: identify what Puleo should handle so consuming projects need minimal overrides.

Projects analyzed:
- **chrono-albums-2** - `@lttr/puleo@^0.8.1` + `@lttr/nuxt-puleo@^0.0.8`
- **jedlik-nejedlik/web** - `@lttr/puleo@^0.8.1`

## Issues Puleo should fix

### 1. Anchor tag global styling

**Source:** chrono-albums-2 `app/assets/css/main.css:73-88`

`:where(a)` applies padding/margin to ALL anchors, breaking button-styled links.

Workaround in project:

```css
/* TODO: Temporary fix until puleo uses CSS layers.
   Problem: puleo's :where(a) applies padding/margin for inline text links,
   but this affects ALL anchors. Without CSS layers, we can't use revert-layer
   to selectively undo these styles. So we reset all anchors to initial,
   then manually re-apply button styles that got clobbered.
   Alt fix: puleo could avoid applying negative margins/padding to all <a> tags.
   Remove once @lttr/puleo implements @layer or removes the :where(a) styles. */
a {
  margin: initial;
  padding: initial;
}

a.p-button {
  padding-block: 0.75ch;
  padding-inline: var(--space-3);
}
```

### 2. Dark mode form controls missing

**Source:** chrono-albums-2 `app/assets/css/main.css:112-128`

No dark mode styles for `input`, `textarea`, `select` - they become invisible on dark backgrounds.

Workaround:

```css
@media (--OSdark) {
  input:not([type="checkbox"]):not([type="radio"]):not([type="file"]),
  textarea,
  select {
    background-color: var(--surface-1);
    border: 1px solid var(--surface-3);
  }

  input:not([type="checkbox"]):not([type="radio"]):not([type="file"]):focus,
  textarea:focus,
  select:focus {
    border-color: var(--brand-color);
    outline: none;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--brand-color) 25%, transparent);
  }
}
```

### 3. Form input width/max-width

**Source:** jedlik-nejedlik `app/assets/css/main.css:84-88`

Inputs need `width: 100%` and `max-width: initial` override to fill their containers. Puleo's defaults constrain form elements too much.

### 4. `<br>` inside `.p-prose`

**Source:** jedlik-nejedlik `app/assets/css/main.css:60-62`

Puleo's reset removes expected `<br>` behavior. Workaround:

```css
p-prose br {
  margin-block-start: revert;
}
```

### 5. Border system incomplete

**Source:** jedlik-nejedlik `app/assets/css/main.css:79` (with TODO comment)

Textarea needs manual border styling. Comment says: "general border, needs for more elements probably".

```css
textarea {
  border-radius: var(--radius-3);
  border-width: 1px;
  border-color: var(--surface-0);
}
```

### 6. Secondary button border visibility

**Source:** chrono-albums-2 `app/assets/css/main.css:134-143`

Secondary buttons need explicit border color for visibility in both modes:

```css
.p-button-secondary {
  border-color: var(--surface-3);
}

@media (--OSdark) {
  .p-button-secondary {
    border-color: var(--text-color-2);
  }
}
```

## Missing variables

Variables that projects had to define themselves:

| Variable | Used in | Purpose |
|---|---|---|
| `--text-color-3` | chrono-albums-2 (10+ files) | Tertiary/muted text |
| `--negative-color` | chrono-albums-2 (8+ files) | Error/invalid states |
| `--positive-color` | chrono-albums-2 | Success states |
| `--brand-color-light` | chrono-albums-2 | Lighter brand variant |
| `--button-height-default` | jedlik-nejedlik | Button height control |
| `--radius-4` | jedlik-nejedlik | Larger radius token (2rem) |
| `--input-radius` | jedlik-nejedlik | Form element border-radius |
| `--input-padding-inline` | jedlik-nejedlik | Form element padding |
| `--line-height-body` | jedlik-nejedlik | Body line-height |
| `--line-height-headings` | jedlik-nejedlik | Heading line-height |

Related: chrono-albums-2 also uses alert-specific vars (`--error-alert-bg-color`, `--error-alert-color`, `--positive-alert-bg-color`, `--positive-alert-color`) - unclear if these come from Puleo or are custom.

## Naming inconsistency

chrono-albums-2's `ColorModeSwitch.vue` uses `--color-text-1` / `--color-surface-2` instead of `--text-color-1` / `--surface-2`. The naming convention isn't obvious to consumers.

## What's working well

No changes needed for:

- **Layout primitives** (`p-stack`, `p-cluster`, `p-switcher`, `p-flow`, `p-center`) - heavily used, configured via CSS custom properties as intended
- **Custom media queries** (`--sm-n-below`, `--md-n-below`, `--lg-n-below`, `--OSdark`) - used correctly in both projects
- **Brand/surface/shadow variable architecture** - projects customize comfortably via `:root` overrides
- **Button classes** (`p-button`, `p-button-brand`, `p-button-secondary`) - work well apart from the anchor conflict
- **Typography classes** (`p-heading-*`, `p-prose`, `p-base-text-bold`, `p-secondary-text-regular`) - solid
- **Puleo component configuration** via `--cluster-space`, `--stack-space`, `--switcher-treshold` - intuitive pattern
- **`:where()` selectors** in Puleo classes - both projects use low-specificity patterns themselves, showing the approach is understood
