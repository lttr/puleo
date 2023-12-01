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

function buildScales(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const { fluid, fontSize, grid, layoutHelpers, prefix, rootSelector, space } =
    effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(rootSelector, [
    space && fluidSpace({ prefix, ...fluid, space }),
    fontSize && fluidFontSize({ prefix, ...fluid, fontSize }),
    grid && fluidGrid({ prefix, ...fluid, ...grid, space }),
  ])

  return [...rulesInsideRootSelector].flat().filter(Boolean)
}

function buildProps(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const {
    borderRadius,
    borderSize,
    breakpoints,
    colors,
    fontWeight,
    inlineSize,
    lineHeight,
    prefix,
    rootSelector,
  } = effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(rootSelector, [
    borderRadius && openProps({ prefix, names: borderRadius }),
    borderSize && openProps({ prefix, names: borderSize }),
    breakpoints && openProps({ prefix, names: breakpoints }),
    colors && openProps({ prefix, names: colors }),
    fontWeight && openProps({ prefix, names: fontWeight }),
    inlineSize && openProps({ prefix, names: inlineSize }),
    lineHeight && openProps({ prefix, names: lineHeight }),
  ])

  return [...rulesInsideRootSelector].flat().filter(Boolean)
}

function buildObjects(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const { layoutHelpers, prefix } = effectiveConfig
  return fluidLayouts({ prefix, layoutHelpers })
}

const cssScales = buildScales({}).join("\n")
const cssProps = buildProps({}).join("\n")
const cssObjects = buildObjects({}).join("\n")

const fileOutputScales = "./css/generated/scales.css"
const fileOutputProps = "./css/generated/props.css"
const fileOutputObjects = "./css/generated/objects.css"

writeFileSync(fileOutputScales, cssScales)
writeFileSync(fileOutputProps, cssProps)
writeFileSync(fileOutputObjects, cssObjects)
