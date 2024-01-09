import { writeFileSync } from "node:fs"
import { defu } from "defu"

import { defaultConfig } from "./config.js"
import { fluidSpace, fluidFontSize, fluidGrid } from "./fluid-calculator.js"
import { fluidLayouts } from "./layout-helpers.js"
import { fontStyles } from "./font-style-helpers.js"
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
  const { fluid, fontSize, grid, propsPrefix, rootSelector, space } =
    effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(rootSelector, [
    space && fluidSpace({ propsPrefix, ...fluid, space }),
    fontSize && fluidFontSize({ propsPrefix, ...fluid, fontSize }),
    grid && fluidGrid({ propsPrefix, ...fluid, ...grid, space }),
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
    propsPrefix,
    rootSelector,
  } = effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(rootSelector, [
    borderRadius && openProps({ propsPrefix, names: borderRadius }),
    borderSize && openProps({ propsPrefix, names: borderSize }),
    breakpoints && openProps({ propsPrefix, names: breakpoints }),
    colors && openProps({ propsPrefix, names: colors }),
    fontWeight && openProps({ propsPrefix, names: fontWeight }),
    inlineSize && openProps({ propsPrefix, names: inlineSize }),
    lineHeight && openProps({ propsPrefix, names: lineHeight }),
  ])

  return [...rulesInsideRootSelector].flat().filter(Boolean)
}

function buildObjects(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const { classPrefix, propsPrefix, layoutHelpers, fontStyleHelpers } =
    effectiveConfig
  return [
    ...fluidLayouts({ classPrefix, propsPrefix, layoutHelpers }),
    ...fontStyles({ classPrefix, propsPrefix, fontStyleHelpers }),
  ]
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
