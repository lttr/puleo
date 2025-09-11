import { createRootSelector, css } from "./utils.js"

export function generateTheme(config) {
  const { useWhere, rootSelector: rootSelectorConfig, mediaDark } = config
  const rootSelector = createRootSelector(useWhere, rootSelectorConfig)

  return css`
    /*
    * Based on Open Props: theme.css and theme.light.css
    */

    ${rootSelector} {
      color-scheme: light;
    }

    ${mediaDark} {
      ${rootSelector} {
        color-scheme: dark;
      }
    }
  `
}
