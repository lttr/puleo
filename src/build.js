import { writeFileSync } from "node:fs"
import { defu } from "defu"

import { defaultConfig } from "./config.js"
import { fluidSpace, fluidFontSize, fluidGrid } from "./fluid-calculator.js"
import { fluidLayouts } from "./layout-helpers.js"
import { fontStyles } from "./font-style-helpers.js"
import { openProps } from "./open-props.js"
import { handleShadows } from "./shadows.js"

const MEDIA_DARK_MARKER = "-@media:dark"

function constructRootSelector(useWhere, rootSelector) {
  return useWhere ? `:where(${rootSelector})` : rootSelector;
}
function insideRootSelector(groups, { useWhere, rootSelector, mediaDark }) {
  const linesMediaDark = []
  const lines = groups.map((group) => [
    ...group
      .filter((rule) => {
        const isRuleForMediaDark = rule.includes(MEDIA_DARK_MARKER)
        if (isRuleForMediaDark) {
          linesMediaDark.push(`    ${rule.replace(MEDIA_DARK_MARKER, "")}`)
        }
        return !isRuleForMediaDark
      })
      .map((rule) => {
        return `  ${rule}`
      }),
    " ",
  ])
  const selector = constructRootSelector(useWhere, rootSelector);
  const linesCSS = [`${selector} {`, ...lines, "}\n"]
  const linesMediaDarkCSS = linesMediaDark.length
    ? [`${mediaDark} {`, `  ${selector} {`, ...linesMediaDark, "  }", "}\n"]
    : []
  return linesCSS.concat(linesMediaDarkCSS)
}

function buildScales(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const { fluid, fontSize, grid, propsPrefix, useWhere, rootSelector, mediaDark, space } =
    effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(
    [
      space && fluidSpace({ propsPrefix, ...fluid, space }),
      fontSize && fluidFontSize({ propsPrefix, ...fluid, fontSize }),
      grid && fluidGrid({ propsPrefix, ...fluid, ...grid, space }),
    ],
    { useWhere, rootSelector, mediaDark },
  )

  return [...rulesInsideRootSelector].flat().filter(Boolean)
}

function buildProps(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const {
    borderRadius,
    borderSize,
    breakpoints,
    colors,
    easing,
    fontWeight,
    inlineSize,
    lineHeight,
    shadow,
    propsPrefix,
    useWhere,
    rootSelector,
    mediaDark,
  } = effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(
    [
      borderRadius && openProps({ propsPrefix, names: borderRadius }),
      borderSize && openProps({ propsPrefix, names: borderSize }),
      breakpoints && openProps({ propsPrefix, names: breakpoints }),
      colors && openProps({ propsPrefix, names: colors }),
      easing && openProps({ propsPrefix, names: easing }),
      fontWeight && openProps({ propsPrefix, names: fontWeight }),
      inlineSize && openProps({ propsPrefix, names: inlineSize }),
      lineHeight && openProps({ propsPrefix, names: lineHeight }),
      shadow && handleShadows(shadow, propsPrefix),
    ],
    { useWhere, rootSelector, mediaDark },
  )

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
const cssObjects = buildObjects({}).join("\n\n")

const fileOutputScales = "./css/generated/scales.css"
const fileOutputProps = "./css/generated/props.css"
const fileOutputObjects = "./css/generated/objects.css"

writeFileSync(fileOutputScales, cssScales)
writeFileSync(fileOutputProps, cssProps)
writeFileSync(fileOutputObjects, cssObjects)
