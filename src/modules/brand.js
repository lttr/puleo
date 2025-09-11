import { createRootSelector, css } from "../utils.js"

export function generateBrand(config) {
  const { useWhere, rootSelector: rootSelectorConfig } = config
  const rootSelector = createRootSelector(useWhere, rootSelectorConfig)

  return css`
    /*
    * Based on Open Props: brand.css
    *
    * Default values for brand specific props.
    */
    ${rootSelector} {
      --font-family-body: sans-serif;

      --brand-color: var(--blue-7);
      --brand-color-dim: var(--blue-8);
      --brand-color-bright: var(--blue-5);

      scrollbar-color: var(--scrollthumb-color) transparent;
      accent-color: var(--brand-color, var(--link-color));
      caret-color: var(--brand-color, var(--link-color));
      color: var(--text-color-1);
      background-color: var(--bg-color-body);
    }
  `
}
