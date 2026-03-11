---
status: draft
---

# Puleo improvements spec

Based on consumer overrides analysis. Priority ordered.

## P1 - Breaking / high-impact

1. **CSS `@layer` support** - wrap Puleo in a layer so consumers can override cleanly and use `revert-layer`
2. **Fix `:where(a)` padding/margin** - don't apply inline-text-link styles to all anchors; scope to prose or specific context
3. **Dark mode form controls** - add background, border, focus styles for inputs/textarea/select in dark mode

## P2 - Missing tokens

4. **Add `--text-color-3`** - tertiary/muted text color (used 10+ times in chrono-albums-2)
5. **Add semantic color vars** - `--negative-color`, `--positive-color` for error/success states
6. **Add `--radius-4`** - larger radius token (2rem)
7. **Add form-specific vars** - `--input-radius`, `--input-padding-inline`, `--button-height-default`
8. **Add `--line-height-body`, `--line-height-headings`** - typography line-height tokens

## P3 - Polish

9. **Fix `<br>` in prose** - don't reset `margin-block-start` on `<br>` elements
10. **Fix form input width defaults** - inputs should fill containers by default (`width: 100%`, no restrictive `max-width`)
11. **Improve border system** - provide consistent border variables for form elements
12. **Secondary button dark mode** - set visible `border-color` in dark mode
13. **Document variable naming** - prevent `--color-text-*` vs `--text-color-*` confusion

## Unresolved questions

- Should `--brand-color-light` / `--brand-color-dim` / `--brand-color-bright` be part of Puleo's token set, or left to consumers?
- Should alert color vars (`--error-alert-bg-color` etc.) be standardized?
- What's the migration path for existing consumers when adding `@layer`?
