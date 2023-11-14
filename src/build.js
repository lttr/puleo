import { writeFileSync } from "node:fs"
import { defu } from "defu"

import { defaultConfig } from "./config.js"
import { fluidSpace, fluidFontSize, fluidGrid } from "./fluid-calculator.js"
import { fluidLayouts } from "./layout-helpers.js"
import { openProps } from "./open-props.js"

function insideRootSelector(rootSelector, groups) {
  const lines = groups.map((group) => [
    ...group.map((rule) => `  ${rule}`),
    " ",
  ])
  return [`${rootSelector} {`, ...lines, "}\n"]
}

function build(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const {
    borderRadius,
    borderSize,
    fluid,
    fontSize,
    grid,
    inlineSize,
    layoutHelpers,
    prefix,
    rootSelector,
    space,
  } = effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(rootSelector, [
    space && fluidSpace({ prefix, ...fluid, space }),
    fontSize && fluidFontSize({ prefix, ...fluid, fontSize }),
    grid && fluidGrid({ prefix, ...fluid, ...grid, space }),
    inlineSize && openProps({ prefix, names: inlineSize }),
    borderRadius && openProps({ prefix, names: borderRadius }),
    borderSize && openProps({ prefix, names: borderSize }),
  ])

  const helperClasses = [fluidLayouts({ prefix, layoutHelpers })]

  return [...rulesInsideRootSelector, ...helperClasses].flat().filter(Boolean)
}

const result = build({})

const css = result.join("\n")

const fileOutput = "./puleo.css"
writeFileSync(fileOutput, css)
