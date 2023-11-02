import { defu } from "defu"

import { defaultConfig } from "./config.js"
import { fluidSpace, fluidFontSize, fluidGrid } from "./fluid-calculator.js"
import { fluidLayouts } from "./layout-helpers.js"
import { openProps } from "./open-props.js"

function build(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const {
    fluid,
    fontSize,
    grid,
    inlineSize,
    layoutHelpers,
    prefix,
    selector,
    space,
  } = effectiveConfig

  return [
    `${selector} {`,
    space && fluidSpace({ prefix, ...fluid, space }),
    fontSize && fluidFontSize({ prefix, ...fluid, fontSize }),
    grid && fluidGrid({ prefix, ...fluid, ...grid }),
    inlineSize && openProps({ prefix, names: inlineSize }),
    "}\n",
    fluidLayouts({ prefix, layoutHelpers }),
  ]
    .flat()
    .filter(Boolean)
}

const result = build({})

console.log(result.join("\n"))
